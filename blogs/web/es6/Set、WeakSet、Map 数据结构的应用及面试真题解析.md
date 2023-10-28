---
title: Set、WeakSet、Map 数据结构的应用及面试真题解析
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
publish: true
---

# Set、WeakSet、Map 数据结构的应用及面试真题解析

TIP

本节内容我们开始学习 ES6 中的 Set、WeakSet、Map、WeakMap 数据结构、实例的方法和属性，构造函数的参数，在实际开发中的注意事项和应用。

**Set**

- Set 的基本用法 ？
- Set 成员的唯一性
- Set 类型检测
- Set 实例的方法和属性
- Set 实例的遍历方法
- Set 与解构赋值
- Set 与扩展运算符
- Set 在实际开发中的应用

**WeakSet**

- WeakSet 的基本用法
- WeakSet 成员特性
- WeakSet 实例方法
- WeakSet 成员持弱引用
- Set 与 WeakSet 的区别，面试真题解析
- WeakSet 在实际开发中的应用

**Map**

- Map 是什么 ？
- Map 实例的方法和属性
- Map 构造函数的参数
- Map 在实际开发中的注意事项
- Map 在实际开发中的应用
- Map 经典面试真题解析
- Map 与 WeakMap 的区别 ？面试真题解析

## 一、Set 的核心基础

TIP

Set 是 ES6 中指供的一种新的数据结构，Set 对象允许你存储**任何类型的唯一值**。

我们常把 Set 与数组来做对比，Set 和数组在存储数据时，最大的区别就在于 Set 的成员是唯一的，而数组是可以重复的。

> Set 本身是一个构造函数，用来生成 Set 数据结构

### 1、Set 的基本用法

- 创建 Set，并初始化成员

重点提示：

- Set 函数可以接受一个数组（或者可迭代对象）作为参数，用来初始化成员
- 常见的可迭代对象有：数组、arguments、NodeList、Map、HTMLCollection、String 类型

```js
//  传入参数为数组，数组为可迭代对象
const s1 = new Set([1, 2, 3]);
console.log(s1); // Set(3) {1, 2, 3}

// 传入参数为NodeList,NodeList为可迭代对象
const list = document.querySelectorAll("ul li");
const s2 = new Set(list);
console.log(s2); // Set(4) {li, li, li, li}

// 传入参数为arguments，arguments为可迭代对象
function fn() {
  const s = new Set(arguments);
  console.log(s); // Set(3) {1, 2, 'ab'}
}
fn(1, 2, "ab");

// 对象为非迭代对象
const obj = {
  a: 1,
  b: 2,
  arr: [3, 4, 5],
};
// 但为对象添加迭代器，那对象也可以作为Set的参数
obj[Symbol.iterator] = function* () {
  for (let key in this) {
    yield this[key];
  }
};
const s3 = new Set(obj);
console.log(s3); // Set(3) {1, 2, Array(3)}
```

- 创建 Set，利用 add 方法添加成员

```js
const s = new Set();
// add方法向Set中添加成员
s.add(1);
s.add(2);
s.add(3);
console.log(s);
```

### 2、Set 成员的唯一性

TIP

Set 中的成员必需是唯一的，其内部判断两个值是否相同类传于精确相等运算符 `===` 主要的区别 Set 中认为 NaN 和 NaN 是相等的，同时 `+0`，`0`，`-0` 也是相等的。

```js
const s = new Set([1, 2, 3, 3, NaN, 4, NaN]);
// 因为Set成员必需是唯一的，所以3和NaN只保留了一个
console.log(s); // Set(5) {1, 2, 3, NaN, 4}
const s = new Set([{ a: 1 }, 1, { a: 1 }, ["A"], +0, 0, -0]);
// 对象保存的是堆内存中的地址，所以长的一样地址不一要，也是不一样的，在同值相等和精确相等中算法中，+0，0，-0 认为是同一个值
console.log(s);
```

![image-20230114161453332](https://www.arryblog.com/assets/img/image-20230114161453332.5e9475c8.png)

### 3、Set 类型检测

- 用 typeof 检测返回 object

```js
const s = new Set([1, 2, 3]);
console.log(typeof s); // object
```

- 利用 Object 原型上的 toString 方法来检测

```js
const s = new Set([1, 2, 3]);
// Object原型上的toString方法来检测
let type = Object.prototype.toString.call(s);
console.log(type); // [object Set]
// 获取数据的类型
type = type.split(" ")[1].slice(0, -1).toLowerCase();
console.log(type); // set
```

- 利用 Object 原型上的 toString 方法来判断不同的数据类型

```js
function getType(x) {
  let originType = Object.prototype.toString.call(x); // '[object type]'
  let type = originType.split(" ")[1].slice(0, -1); //用空格来分隔字符串
  return type.toLowerCase(); // 将分格出来的类型，统一转成小写字
}
console.log(getType(new Set([1])));
console.log(getType([]));
console.log(getType({}));
console.log(getType(function () {}));
console.log(getType("ss"));
```

### 4、Set 实例的属性

| 属性 | 说明                    |
| :--- | :---------------------- |
| size | 返回 Set 实例的成员总数 |

- size 返回 Set 实例的成员总数

```js
const s1 = new Set([1, 2, 3]);
console.log(s1.size); // 3
const s2 = new Set(["a", "b", "c", "d", "e"]);
console.log(s2.size); // 5
```

### 5、Set 实例的方法

| 方法名          | 说明                                                                     |
| :-------------- | :----------------------------------------------------------------------- |
| `add(value)`    | 向 Set 实例尾部添加一个成员（值），返回该 Set 实例本身（即支持链式调用） |
| `delete(value)` | 删除 Set 实例的某个成员（值），删除成功返回 true，失败返回 false         |
| `has(value)`    | 判断某个值是否为 Set 实例的成员，如果是返回 true，否则返回 false         |
| `clear()`       | 删除 Set 实例的所有成员，没有返回值                                      |

- `add(value)` 添加成员，返回值为该实例对象本身，即 add 方法支持链式调用

```js
const s = new Set([1, 2]);
s.add("a");
s.add(1); // 1成员本身有，所以添加失败
// add方法，支持链式调用
s.add("c").add("d");
console.log(s); // Set(5) {1, 2, 'a', 'c', 'd'}

// add 的返回值实例对象本身
const s = new Set(["a", "b"]);
console.log(s.add(4)); // Set(3) {'a', 'b', 4}
```

- `delete(value)` 删除成员, 删除成功返回 true，失败返回 false

```js
const s = new Set([1, 2, 3, 4]);
s.delete(1); // 删除成员1
s.delete(1); // 删除不存在的元素，不会报错
s.delete(3); // 删除成员3
console.log(s); // Set(2) {2, 4}

const s2 = new Set(["a", "b", "c"]);
// delete()方法的返回值，删除成功返回true，失败返回false
console.log(s2.delete("a")); // true
console.log(s2.delete("d")); // false
```

- `has(value)` 判断是否有某个成员，如果有，返回 true,没有返回 false

```js
const s = new Set(["a", "b", "c", 1]);
console.log(s.has("a")); // true
console.log(s.has(2)); // false
```

- clear 清除所有成员，没有返回值

```js
const s = new Set(["a", "b", "c", 1]);
s.clear();
console.log(s); // Set(0) {size: 0}
```

温馨提示：

Set 实例对象没有办法像数组一样，通过下标来访问和设置成员。只能通过以上方式添加、删除成员。

> 第次添加只能添加到最后一个成员，删除可以删除任意成员。

### 6、Set 实例的遍历方法

| 遍历方法                      | 说明                                                                                                                                  |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `keys()`                      | 返回值与 `values()` 方法的返回值一样，因为 Set 对象没有键名，所以返回成员值                                                           |
| `values()`                    | 返回一个新的遍历器（迭代器）对象，该对象包含 `Set` 对象中的按插入顺序排列的所有元素的值。                                             |
| `entries()`                   | 返回一个新的遍历器（迭代器）对象，该对象包含 Set 键值对集合的，其顺序与 Set 成员插入顺序一致                                          |
| `forEach(callBack[,thisArg])` | 按照 Set 成员的插入顺序，为 Set 对象中的每一个成员调用一次 callBack 回调函数，如果传入了 thisArg 参数，回调函数内的 this 指向 thisArg |

### 7、for ... of 循环

TIP

在学习 Set 实例的遍历方法前，我们简单了解 `for...of` 循环，它是 ES6 新增的用来遍历可迭代对象的循环语句。

只要数据是可迭代对象，就可以利用 `for...of` 循环来遍历它的成员。

> 常见的可迭代对象有：数组、arguments、NodeList、HTMLCollection、Set、Map、String 类型

```js
HTMLCollection、String  // 数组是可迭代对象
const arr = [1, 2, 3, 4];
for (let item of arr) {
    console.log(item); // 1 2 3 4
}

// Set是可迭代对象
const set = new Set([1, 22, 33, 4]);
for (let item of set) {
    console.log(item); // 1 22 33 4
}

// 关于arguments 、NodeList 、Map、HTMLCollection、String  大家自行测试
```

### 7.1、keys 和 values 方法

TIP

keys 和 values 方法返回的都是迭代对象，由于 Set 结构没有键名，只有键值（或者说键名与键值是同一个值）所以 keys 方法和 values 方法的返回值完全一致。

```js
const s = new Set(["a", "b", "c"]);
const keys = s.keys();
console.log(keys); // keys为迭代器对象
for (let key of keys) {
  console.log(key); // a b c
}

const values = s.values(); // values为迭代器对象
console.log(values);
for (let key of keys) {
  console.log(key); // a b c
}
```

迭代器对象，再次遍历是无效的

```js
const s = new Set(["a", "b", "c"]);
const keys = s.keys();
console.log(keys); // keys为迭代器对象
for (let key of keys) {
  console.log(key); // a b c
}

// 迭代器对象，再次遍历是无效的,以下代码，啥也不会执行
for (let key of keys) {
  console.log(key);
}

// 所以每次迭代都会创建一个新的迭代器对象
for (let key of s.keys()) {
  console.log(key); // a b c
}
for (let key of s.keys()) {
  console.log(key); // a b c
}
```

Set 的实例默认可遍历，本质是因为遍历器生成函数是它的 values 方法

```js
Set.prototype[Symbol.iterator] === Set.prototype.values; // true
// 当利用 for...of 来遍历set实例时，其内部会调用values方法，生成一个迭代器对象，来供 for...of 使用，所以我们遍历Set对象，可以直接遍历，不用调用他的values方法
```

### 7.2、entries()

TIP

返回一个新的遍历器（迭代器）对象，该对象包含 Set 键值对集合的，其顺序与 Set 成员插入顺序一致

```js
const s = new Set([1, 2, 3, 4]);
for (let item of s.entries()) {
  console.log(item);
}
```

![image-20230114181805434](https://www.arryblog.com/assets/img/image-20230114181805434.b0774ff6.png)

### 7.3、 forEach( )方法

TIP

按照 Set 成员的插入顺序，为 Set 对象中的每一个成员调用一次 callBack 回调函数。

> 如果传入了 thisArg 参数，回调函数内的 this 指向 thisArg

```js
forEach(callBack[,thisArg])
forEach(function(value,key,s){}[,thisArg])
// 回调函数中的三个参，value键值，key键名，s为实例对象本身
const s = new Set(["a", "b", "c"]);
s.forEach(function (value, key, s) {
  console.log(value);
  console.log(key);
  console.log(s);
});
```

![image-20230114182415236](https://www.arryblog.com/assets/img/image-20230114182415236.bbb5afb3.png)

- 如果传入了第二个参数，则回调函数内部的 this 指向第二个参数，前提是回调函数只能是普通函数。如果回调函数为箭头函数，则 this 更改会失败

```js
const s = new Set(["a"]);
const obj = { a: 1 };
s.forEach(function (value) {
  console.log(this);
}, obj);

// 回调函数为箭头函数，并不会更改this指向
s.forEach((value) => {
  console.log(this);
}, obj);
```

![image-20230114182730829](https://www.arryblog.com/assets/img/image-20230114182730829.434eff0a.png)

### 8、Set 与解构赋值

TIP

我们之前讲数组的解构赋值时提到，`=`等号的右边只要是可迭代对象都可以利用数组模式来解构赋值，那 Set 也可以。

```js
const [x, y, z] = new Set(["a", "b", "c"]);
console.log(x, y, z); // a b c
```

### 9、Set 与扩展运算符

TIP

可以利用`...`扩展运算符将 Set 实例对象在数组中展开

```js
const arr = [...new Set([1, 2, 3])];
console.log(arr);
```

### 10、Set 实例如何应用数组的方法操作成员

TIP

如果想让 Set 实例应用数组相关的方法，按以下三步来操作

- 第一步：把 Set 实例在一个空数组中展开
- 第一步：让数组调用相关方法操作其成员
- 第三步：操作后再将数组作为 Set 构造函数的参数，创建一个新的 Set 实例

```js
// 将Set中所有大于5的元素留下，其它的都删除
let s = new Set([1, 5, 2, 9, 10]);
s = new Set([...s].filter((value) => value > 5));
/*  相当于
	第一步：[...s]
	第二步： [1,5,2,9,10].filter(...)
   	第三步：  new Set([9,10])
*/
console.log(s); // Set(2) {9, 10}
```

## 二、Set 在实际开发中的应用

TIP

以下情况，我们可以考虑使用 Set

- 数组或字符串去重时
- 不需要通过下标访问，只需要遍历时
- 为了使用 Set 提供的方法和属性时（add、delete、clear、has、forEach、size 等）

### 1、数组去重

```js
let arr1 = [1, 2, 3, 3, 4, 5, 3, 2];
arr1 = [...new Set(arr1)];
console.log(arr1); // [1, 2, 3, 4, 5]
```

### 2、求并集

TIP

并集：将两个数组合并，然后去除重复项

```js
const arr1 = [2, 3, 5, 6, 5, 7, 8];
const arr2 = [1, 3, 5, 7, 7, 9, 10, 12];
// 求并集  合并arr1与arr2，同时去重
const union = new Set([...arr1, ...arr2]);
console.log(union);
```

### 3、求交集

TIP

交集：求两个数组都有的项，然后再去除重复项

![image-20230114202919790](data:image/png;base64,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)

```js
const arr1 = [2, 3, 5, 6, 5, 7, 8];
const arr2 = [1, 3, 5, 7, 7, 9, 10, 12];
// 找出arr1在arr2中有的项
let result = arr1.filter((item) => {
  return new Set(arr2).has(item);
});
// 去除重复项
result = new Set(result);
console.log(result); // Set(3) {3, 5, 7}
// 简写形式
let result = new Set(
  arr1.filter((item) => {
    return new Set(arr2).has(item);
  })
);
```

### 4、求差集

TIP

求差集：求 arr1 在 arr2 中没有的项，然后再去重

![image-20230114202956503](data:image/png;base64,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)

```js
const arr1 = [2, 3, 5, 6, 5, 7, 8];
const arr2 = [1, 3, 5, 7, 7, 9, 10, 12];
// 找出arr1在arr2中有的项
let result = new Set(
  arr1.filter((item) => {
    return !new Set(arr2).has(item);
  })
);
console.log(result); // Set(3) {3, 5, 7}
```

## 三、WeakSet 数据结构

TIP

WeakSet 结构与 Set 类似，也是不重复值的集合，但是，他与 Set 存在以下两个方面的区别

- `WeakSet` **的成员只能是对象**，而不能像 `Set`那样，可以是任何类型的任意值
- `WeakSet` **持弱引用**：集合中对象的引用为**弱引用**。如果没有其它的对 `WeakSet` 中对象的引用，那么这些对象会被当成垃圾回收掉。

> 接下来我们从最基本的 WeakSet 创建开始，然后再一步步深入了解它 !

### 1、WeakSet 的基本用法

TIP

WeakSet 是一个构造函数，可以通过 `new WeakSet()` 方式创建 WeakSet 数据结构

- 创建同时，初始化成员，其构造函数的参数必须是一个数组或可迭代对象

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const arr = [1, 2];
const ws = new WeakSet([obj1, obj2, arr]);
console.log(ws);
```

![image-20230114210750356](https://www.arryblog.com/assets/img/image-20230114210750356.ebbee7eb.png)

温馨提示

- WeakSet 成员的顺序是随机的，并不是按添加时的顺序排列显示的，这个和 Set 是有区别的。
- Set 是按添加的顺序来显示的。但这个特性对 WeakSet 没有任意影响，因为他的成员不可遍历

- 创建后，调用 add 方法添加成员

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const arr = [1, 2];
const ws = new WeakSet();
ws.add(obj1); // 添加成员
ws.add(obj2);
ws.add(arr);
console.log(ws);
```

![image-20230114210752206](https://www.arryblog.com/assets/img/image-20230114210752206.ebbee7eb.png)

### 2、WeakSet 成员特性

TIP

- WeakSet 成员只能是唯一的，同时只能是对象，不能是其它类型
- 所以在 `new WeakSet()` 的同时，初始化成员，其数组（可迭代对象）成员只能是对象类型。

```js
const obj1 = { a: 1 };
const obj2 = obj1;
const obj3 = { b: 2 };
const obj4 = { b: 2 };
// obj1和obj2 是同一个对象，所以只能添加1个，obj3和obj4只是长的一样，本质是两个不同对象
const ws = new WeakSet([obj1, obj2, obj3, obj4]);
console.log(ws);
```

![image-20230114211158482](https://www.arryblog.com/assets/img/image-20230114211158482.b0bed6ab.png)

```js
let a = 1;
const ws = new WeakSet();
ws.add(a); // 报错
```

### 3、WeakSet 实例方法

| 方法            | 说明                                                        |
| :-------------- | :---------------------------------------------------------- |
| `add(value)`    | 向 WeakSet 中添加成员，返回当前对象，即支持链式调用         |
| `delete(value)` | 删除 WeakSet 中指定的成员，删除成功返回                     |
| `has(value)`    | 判断 WeakSet 中是否有对应的成员，有返回 true,没有返回 false |

- `add(value)` 向 WeakSet 中添加成员，返回当前对象，即支持链式调用

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const ws = new WeakSet();
ws.add(obj1).add(obj2);
console.log(ws);
```

![image-20230114221648477](https://www.arryblog.com/assets/img/image-20230114221648477.7b3c19b3.png)

- `delete(value)` 删除 WeakSet 中指定的成员，删除成功返回 true，失败返回 false

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const ws = new WeakSet([obj1, obj2]);
ws.delete(obj1);
console.log(ws);
```

![image-20230114221618407](https://www.arryblog.com/assets/img/image-20230114221618407.fc13df6e.png)

- has 判断 WeakSet 中是否有对应的成员，有返回 true，没有返回 false

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const ws = new WeakSet([obj1, obj2]);
console.log(ws.has(obj1)); // true
console.log(ws.has({})); // false
```

### 4、WeakSet 成员持弱引用

TIP

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。

也就是说，如果该对象没有被其它对象引用，那么垃级回收机制就会自动回收该对象所占用的内存，不考虑该对象是否还在 WeakSet 中。

### 4.1、垃级回收

TIP

> [官方文档垃圾回收参考(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management#垃圾回收)

我们说垃圾回收机制主要有两种：引用计数和标记清除。目前浏览器主要采用的是标记清除这种算法。但垃圾回收本质还是要依赖于引用的概念，在内存管理的环境中，一个对象如果有访问另一个对象的权限（隐式或者显式），叫做一个对象引用另一个对象。

如果一个值的引用次数不为 0，垃圾回收机制就不会释放这块内存。只有当这个值的引用次数为 0 时，垃圾回收机制才会释放这块内存。

```js
let obj = { a: 1 }; // obj对对象{a:1} 引用一次，计数+1
let obj2 = obj; // obj2对对象{a:1} 引用一次，计数+1,引用次共2次
obj = null; // 解除obj对{a:1}对象的引用，计数-1，引用次数共1次
obj2 = null; // 解除obj对{a:1}对象的引用，计数-1，引用次数共0次
// 当引用次数为0时，过段时间垃圾回收机制回收垃圾时，就会把 {a:1} 所占用的内存回收
```

### 4.2、WeakSet 中的对象都是弱引用

TIP

WeakSet 中对象都是弱引用，所以在引用计数时，引用次数并不会 `+1`

```js
let obj = { a: 1 }; // obj对对象{a:1} 引用一次，计数+1
let ws = new WeakSet([obj]); // 这里对{a:1}的引用并不会被计入，计数+0
let obj2 = obj; // obj对对象{a:1} 引用一次，计数+1  共引用2次
obj2 = null; // 解除obj对{a:1}对象的引用，计数-1，引用次数共1次
obj = null; // 解除obj对{a:1}对象的引用，计数-1，引用次数共0次
// 当引用次数为0时，过段时间垃圾回收机制回收垃圾时，就会把{a:1}所占用的内存回收
console.log(ws); // 在制新时，有时ws中有内容，有时没有，是因为垃圾回收器回收垃圾的时间是不确定的
```

以下情况，WeakSet 中根本没有内容，因为 WeakSet 中的对象创建后就没有被引用过一次，所以引用计数一直是 0

```js
const ws = new WeakSet([{ a: 1 }, { b: 2 }, [1, 3]]);
console.log(ws);
```

![image-20230114220308185](https://www.arryblog.com/assets/img/image-20230114220308185.0189907b.png)

> 我们在频繁刷新浏览器时，有时能在控制台看到对应内容，是因为对象创建好后，垃圾回收器还没来的急回收。

```js
// 对比Set，其成员一直都在
const s = new Set([{ a: 1 }, { b: 2 }, [1, 3]]);
console.log(s);
```

![image-20230114220234357](https://www.arryblog.com/assets/img/image-20230114220234357.ea2fa480.png)

### 4.3、WeakSet 注意事项

TIP

- 因为 WeakSet 中的对象都是弱引用，只要外部对 WeakSet 中的对象没有引用，这个对象就会被垃圾回收掉。
- 所以 WeakSet 实例对象没有 size 属性和 forEach 方法，不允许遍历，因为无法保存成员的存在。

```js
const obj1 = { a: 1 };
const ws = new WeakSet([obj1]);
console.log(ws.size); // undefined
ws.forEach((element) => {}); // 报错
```

### 5、总结 Set 与 WeakSet 的区别（面试题）

| 相同点     | 说明                                        |
| :--------- | :------------------------------------------ |
| 成员唯一性 | Set 和 WeakSet 中的成员都是唯一的，不能重复 |
| 实例方法   | Set 和 WeakSet 都有 add、deleted、has 方法  |

| 不同点     | 说明                                                                                                                    |
| :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| 成员类型   | Set 中的成员可以是任意类型，而 WeakSet 中的成员只能是对象                                                               |
| 成员的引用 | Set 中成员的引用是强引用，而 WeakSet 中成员的引用是弱引用                                                               |
| 成员的遍历 | Set 中的成员可 forEach 或 `for ... of` 可遍历的，而 WeakSet 中的成员是不可遍历，也不可枚举的                            |
| 实例方法   | Set 成员有 keys、values、entries 方法                                                                                   |
| 解构赋值   | Set 实例对象为可迭代对象，可以用数组模式解构赋值，而 WeakSet 不是可迭代对象，所以不能解构赋值                           |
| 扩展运算符 | Set 实例对象为可迭代对象，可以用...扩展运算符在数组中展开，而 WeakSet 不是可迭代对象，不能用...扩展运算符在数组中展开。 |

## 四、WeakSet 实际应用

TIP

如果我们希望对象身上的方法在被调用时，其内部的 this 永远指向该对象，而不能是其它对象。也就是`bind、call、apply`都没有办法更改其内部的 this 指向。

那我们就需要在用构造函数创建该对象时，把创建出来的实例添加到 WeakSet 中，然后在对象的方法中验证其 this 是否在 WeakSet 中，如果不在，则表明 this 指向有问题，抛出错误，如果存在，代码正常执行

```js
const ws = new WeakSet();
function Person(name, age) {
  this.name = name;
  this.age = age;
  ws.add(this);
}
Person.prototype.sayHello = function () {
  if (!ws.has(this))
    throw new TypeError("sayHello方法只能在Person的实例上调用");
  console.log(`大家好，我是${this.name}，今年${this.age}岁了`);
};

p = new Person("清心", 23);
p.sayHello();
// p.sayHello.call({ name: "icoding", age: 33 }); // 报错
p = null; // 将p对象销毁
console.log(ws); // 其内部的引用也消失，垃圾回收将对象回收掉了
```

> 上面将实例对象保存在 WeakSet 中，WeakSet 中保持对 p 的弱引用，所以当`p = null`时，对象没有其它相关的引用，引用次数为 0，所以垃圾回收就会将其从内存中回收掉。

- 如果不用 WeakSet 而改用 Set 来存储，则有可能会引发内存泄露，因为 Set 中还保持着对对象的强引用，垃圾回收并不会将对象回收掉，需要我们手动将对象从 Set 中删除才可以。

```js
const ws = new Set(); // Set中保持的是强引用
function Person(name, age) {
  this.name = name;
  this.age = age;
  ws.add(this);
}
Person.prototype.sayHello = function () {
  if (!ws.has(this))
    throw new TypeError("sayHello方法只能在Person的实例上调用");
  console.log(`大家好，我是${this.name}，今年${this.age}岁了`);
};

p = new Person("清心", 23);
p.sayHello();
// p.sayHello.call({ name: "icoding", age: 33 }); // 报错
p = null; // 将p对象销毁
console.log(ws); // 但因为ws中保存着对对象p的引用，所以垃圾回收并没有回收p，一直在内存中存着
```

![image-20230116181814414](https://www.arryblog.com/assets/img/image-20230116181814414.b7cd9819.png)

- 所以需添加 destory 方法，手动将对象从 ws 中的删除，这样当`p = null`时，p 的引用次数为 0，垃圾回收才会将对象回收掉

```js
const ws = new Set();
function Person(name, age) {
  this.name = name;
  this.age = age;
  ws.add(this);
}
Person.prototype.sayHello = function () {
  // 判断this是否为Person构造出来的实例
  if (!ws.has(this))
    throw new TypeError("sayHello方法只能在Person的实例上调用");
  console.log(`大家好，我是${this.name}，今年${this.age}岁了`);
};

// 添加方法，手动将对象从ws中移出
Person.prototype.destory = function () {
  ws.delete(this);
};

p = new Person("清心", 23);
p.sayHello(); // 正常输出结果
p.destory(); // 在对对象p销毁前，先要将Set中对他的引用切换，即在Set中将其删除
p = null; // 将p对象销毁
console.log(ws); // 但因为ws中保存着对对象p的引用，所以垃圾回收并没有回收p，一直在内存中存着
```

![image-20230116175732578](https://www.arryblog.com/assets/img/image-20230116175732578.ef19a652.png)

## 五、Map 的核心基础

TIP

深入浅出 Map 是什么，Map 实例的属性和方法，Map 构造函数的参数，Map 在实际开发中的注意事项和应用。

### 1、为什么引入 Map

对象本身的局限性

JavaScript 的对象（Object）本质上是键值对的集合，但是其键名只能是**字符串** 和 **Symbol**类型，不能是其它数据类型，这给它的使用带来了很大的限制。

如果我想将一个 DOM 节点和节点对应的样式，以键值对的形式存到对象中，是没办法存的，因为 DOM 节点会被转换为字符串类型，转换为`[object HTMLDivElement]`

```js
const box = document.querySelector(".box");
const obj = {
  [box]: "width:100px;height:100px;background:red",
};
for (let key in obj) {
  console.log(key); // [object HTMLDivElement]
}
```

Map 的强大点

为了解决这个问题，ES6 提供了 Map 数据结构，它类似于对象，也是键值对集合，但是他的“键”可以是 **任意的数据类型**。

如果说 Object 结构提供的是 “字符串 --> 值” 的映身，那 Map 结构提供的是 “值 ---> 值" 的映射

```html
<div class="box"></div>
<script>
  const box = document.querySelector(".box");
  const map = new Map();
  map.set(box, "width:100px;height:100px;background:red");

  for (let [el, css] of map) {
    console.log(el);
    console.log(css);
    el.style.cssText = css;
  }
</script>
```

![image-20230114232155985](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAABwCAIAAACLu7L0AAABTElEQVR4nO3XIQ7DQAwAwV51//+yywOy8BJ1BhqZrCyvmfkAt76nF4AX0Ak0nUDb18FaJ9Z4J6/d33BPoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g6QSaTqDpBJpOoOkEmk6g7etg5sQa8GjuCTSdQNMJNJ1A0wk0nUDTCbQfHzgH32vuWFYAAAAASUVORK5CYII=)

![image-20230114231912538](https://www.arryblog.com/assets/img/image-20230114231912538.956c2017.png)

### 2、Map 的基本用法

TIP

Map 是一个构造函数，可以用他来创建 Map 数据结构。

### 3、new Map() 方式创建，随后用 set 方法添加成员

```js
const map = new Map();
map.set({ age: 1 }, "清心");
map.set({ age: 33 }, "icoding");
console.log(map);
```

![image-20230114233348400](https://www.arryblog.com/assets/img/image-20230114233348400.1d8f3d4d.png)

### 3.1、new Map() 方式创建，并初始化成员

TIP

Map 构造函数接受二维数组作为参数，二维数组的每一项是一个双元素数组

```js
// 以下代码创建map实例时就指定了两个键，分别是{ age: 1 } 和{ age: 33 },其对应值是"清心"和"icoding"
const map = new Map([
  [{ age: 1 }, "清心"],
  [{ age: 33 }, "icoding"],
]);
console.log(map);
```

上面代码内部实际执行过程如下

```js
const arrs = [
  ["username", "清心"],
  [{ age: 33 }, "icoding"],
];

const map = new Map();
// 遍历数组中的每个成员，利用数组的解构赋值把成员取出来，添加到map中
for (let [key, value] of arrs) {
  map.set(key, value);
}
console.log(map);
```

重点

其实任何可迭代对象，只要可迭代对象返回的每个成员都是一个类似双元素数组的数据结构，都可以作为 Map 构造函数的参数。

```js
// 用Set来作为Map构造函数的参数
const s = new Set([
  ["foo", () => "foo"],
  ["bar", () => "bar"],
]);
const m = new Map(s); // Map(2) {'foo' => ƒ, 'bar' => ƒ}

// 可以用Map来作为Map构造函数的参数
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
const m = new Map(map);
console.log(m); // Map(2) {'a' => 1, 'b' => 2}
```

为对象添加`iterator`接口，把对象变成一个可迭代对象，同时返回值为 一个双元素数组。这样所有对象都可以做为`Map()`构造函数的参数

```js
Object.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};

const obj = {
  a: 11,
  b: [1, 2, 3],
};

const m = new Map(obj);
console.log(m); // Map(2) {'a' => 11, 'b' => [1, 2, 3]}
```

### 4、Map 中键的唯一性

TIP

在 Map 中，键名是唯一的。键的比较是基于**零值相等算法** ，认为 NaN 和 NaN 是相等的，同时 `0`，`-0`，`+0` 也是相等的，其它判断和`===`严格相等一样

> JavaScript 中的相等性判断，[点击查看官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#零值相等)

```js
const map = new Map();
map.set(NaN, 1);
map.set(NaN, 2);
map.set(0, "a");
map.set(-0, "b");
map.set(+0, "c");
map.set({ a: 1 }, 1);
map.set({ a: 1 }, 2);
console.log(map); // Map(4) {NaN => 2, 0 => 'c', {…} => 1, {…} => 2}
```

### 5、Map 键的顺序

TIP

`Map` 中的键是有序的。其顺序为插入时的顺序。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值。

> 我们知道，对象的键是无序的，很多时候我们想以插入的顺序来访问对应的键时，对象就没法实现。

```js
const obj = {
  a: 1,
  b: 2,
  ["0"]: "a",
  ["1"]: "b",
};
console.log(obj);

const m = new Map([
  ["a", 1],
  ["b", 2],
  ["0", "a"],
  ["1", "b"],
]);
console.log(m);
```

![image-20230115003450864](https://www.arryblog.com/assets/img/image-20230115003450864.d0ff4081.png)

### 6、Map 类型的检测

```js
const m = new Map();
console.log(typeof m); // object

let type = Object.prototype.toString.call(m);
console.log(type); // [object Map]
```

### 7、Map 的实例属性

| 属性 | 说明                    |
| :--- | :---------------------- |
| size | 返回 Map 结构的成员总数 |

```js
const m = new Map([
  ["a", 1],
  ["b", 2],
  ["0", "a"],
  ["1", "b"],
]);
console.log(m.size); // 4
```

### 8、Map 的实例方法

| 方法             | 说明                                                                   |
| :--------------- | :--------------------------------------------------------------------- |
| `set(key,value)` | 设置`Map`对应的键值，并返回当前`Map`对象，所以`set`方法支持链式调用    |
| `get(key)`       | 返回指定键`key`对应的值，若不存在，则返回`undefined`                   |
| `has(key)`       | 判断`Map`中是否存在指定的键，有返回`true`,没有返回`false`              |
| `delete(key)`    | 根据键名，删除`Map`中指定的键值对。删除成功返回`true`，否则返回`false` |
| `clear()`        | 移除 `Map` 对象中所有的键值对。                                        |

### 9、set(key,value)

TIP

设置`Map`对应的键值，并返回当前`Map`对象，所以`set`方法支持链式调用

```js
const map = new Map();
map.set("{a:1}", "obj");
map.set("name", "清心");
console.log(map); // Map(2) {'{a:1}' => 'obj', 'name' => '清心'}
```

> 向 map 中插入相同的键时，其后插入的会覆盖先插入的

```js
const map = new Map();
map.set("{a:1}", "obj");
map.set("name", "清心");
map.set("name", "icoding"); // 相同键，后面的会覆盖前面的
console.log(map); // Map(2) {'{a:1}' => 'obj', 'name' => 'icoding'}
```

### 9.1、get(key)

TIP

返回指定键 key 对应的值，若不存在，则返回`undefined`

```js
const key1 = "{a:1}";
const key2 = "name";
const map = new Map([
  [key1, "a"],
  [key2, "清心"],
]);
const value = map.get(key1);
console.log(value); // a
```

### 9.2、has(key)

TIP

判断`Map`中是否存在指定的键，有返回`true`，没有返回`false`

```js
const key1 = "{a:1}";
const key2 = "name";
const map = new Map([
  [key1, "a"],
  [key2, "清心"],
]);
console.log(map.has(key1)); //true
```

### 9.3、delete(key)

TIP

根据键名，删除`Map`中指定的键值对。删除成功返回`true`，否则返回`false`

```js
const key1 = "{a:1}";
const key2 = "name";
const map = new Map([
  [key1, "a"],
  [key2, "清心"],
]);
map.delete(key1); //true
console.log(map); // Map(1) {'name' => '清心'}
```

### 9.4、clear()

TIP

移除 `Map` 对象中所有的键值对

```js
const key1 = "{a:1}";
const key2 = "name";
const map = new Map([
  [key1, "a"],
  [key2, "清心"],
]);
console.log(map.clear()); // undefined
console.log(map); // Map(0) {size: 0}
```

### 10、Map 的遍历方法

| 方法        | 说明                                                                                                                                |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `keys()`    | 返回一个新的迭代对象，其中包含 `Map` 对象中所有的键，其顺序为 Map 对象插入成员时的顺序排列                                          |
| `values()`  | 返回一个新的迭代对象，其中包含 `Map` 对象中所有的值，其顺序为 Map 对象插入成员时的顺序排列                                          |
| `entries()` | 返回一个新的迭代对象，其为一个包含 `Map` 对象中所有键值对的 `[key, value]` 数组，其顺序为 Map 对象插入成员时的顺序排列              |
| `forEach()` | 以插入的顺序对 `Map` 对象中存在的键值对分别调用一次 `callbackFn`。如果给定了 `thisArg` 参数，这个参数将会是回调函数中 `this` 的值。 |

重点强调

Map 中的内容是有顺序的，其遍历出来的元素顺序与插入时的顺序是一致的

### 10.1、keys() 方法

TIP

返回一个新的迭代对象，其中包含 `Map` 对象中所有的键，其顺序为`Map`对象插入成员时的顺序排列

```js
const map = new Map([
  ["name", "清心"],
  ["age", 33],
  [0, null],
  [null, "清空"],
]);
// map.keys()  返回一个新的迭代对象，可以用for...of来遍历
for (let key of map.keys()) {
  console.log(key);
}
```

![image-20230119140407168](https://www.arryblog.com/assets/img/image-20230119140407168.76f203cb.png)

### 10.2、values() 方法

TIP

返回一个新的迭代对象，其中包含 `Map` 对象中所有的值，其顺序为`Map`对象插入成员时的顺序排列

```js
const map = new Map([
  ["name", "清心"],
  ["age", 33],
  [0, null],
  [null, "清空"],
]);
// map.values()  返回一个新的迭代对象，可以用for...of来遍历
for (let value of map.values()) {
  console.log(value);
}
```

![image-20230119140233516](https://www.arryblog.com/assets/img/image-20230119140233516.d215be08.png)

### 10.3、entries() 方法

TIP

返回一个新的迭代对象，其为一个包含 `Map` 对象中所有键值对的 `[key, value]` 数组，其顺序为`Map`对象插入成员时的顺序排列

```js
const map = new Map([
  ["name", "清心"],
  ["age", 33],
  [null, "清空"],
]);
// map.keys()  返回一个新的迭代对象，可以用for...of来遍历
for (let key of map.entries()) {
  console.log(key);
}
```

![image-20230116190625593](https://www.arryblog.com/assets/img/image-20230116190625593.3e4b8523.png)

> 利用数组的解构赋值，解构出对应的 key 和 value

```js
const map = new Map([
  ["name", "清心"],
  ["age", 33],
  [null, "清空"],
]);
// [key,value]用来解构每次遍历返回的数组
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
```

![image-20230116190757330](https://www.arryblog.com/assets/img/image-20230116190757330.9aba63ce.png)

重点提示

Map 结构的默认遍历接口（`Symbol.iterator`属性）就是`entries`方法

```js
Map.prototype[Symbol.iterator] === Map.prototype.entries;
```

### 10.4、forEach() 方法

TIP

以插入的顺序对 `Map` 对象中存在的键值对分别调用一次 `callbackFn`。如果给定了 `thisArg` 参数，这个参数将会是回调函数中 `this` 的值。

```js
forEach(function (value, key, map) {}); // value 键值  key 键名   map 当前遍历的map对象
forEach(function (value, key, map) {}, thisArg); // thisArg 更改回调函数中的this指向
const map = new Map([
  ["name", "清心"],
  ["age", 33],
  [null, "清空"],
]);
map.forEach(function (value, key, map) {
  console.log(value, key, map);
});
```

![image-20230116191324417](https://www.arryblog.com/assets/img/image-20230116191324417.a397a99d.png)

重点提示：

要更改 `forEach(callBack,thisArg)` 中 callBack 回调函数中的 this 指向 thisArg，回调函数不能是箭头函数，只能是普通函数

```js
const map = new Map([["name", "清心"]]);
const obj = { a: 1 };
// 普通函数中，this指向 obj
map.forEach(function () {
  console.log(this); // obj
}, obj);

// 箭头函数中，this没有被改变，指向window
map.forEach(() => {
  console.log(this); // window
}, obj);
```

### 11、Map 与解构赋值

TIP

Map 为可迭代对象，所以 Map 可以按数组的解构赋值模式来解构

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

const [x, y] = map;
console.log(x); //  ['a', 1]
console.log(y); //  ['b', 2]

const [[a, b], [c, d]] = map;
console.log(a, b); // a 1
console.log(c, d); // b 2
```

### 12、Map 与扩展运算符

- 利用扩展运算符可以将 Map 结构转换成对应的二维数组

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

const arr = [...map];
console.log(arr); // [['a', 1],['b', 2]]
const [arr1, arr2] = [...map];
console.log(arr1); // ['a', 1]
console.log(arr2); // ['b', 2]
```

- Map 对象与 Map 或数组合并时，如果有重复的键值，则后面的会覆盖前面的。

```js
const map1 = new Map([
  ["a", 1],
  ["b", 2],
]);
const map2 = new Map([
  ["a", "{a:1}"],
  ["c", 3],
  ["d", "d"],
]);

const arr = ["c", null];
const map3 = new Map([...map1, ...map2, arr]);
console.log(map3); // Map(4) {'a' => '{a:1}', 'b' => 2, 'c' => null, 'd' => 'd'}
```

温馨提示：

```
[...map]`可以将 map 转换为数组 `new Map(二维数组)`可以将二维数组转换为`Map
```

### 13、Map 使用数组的所有方法

TIP

Map 本身没有太多的方法用来操作成员，不过我们可以利用扩展运算符将 Map 在数组中展开，然后利用数组的方法来操作其成员，操作完成后再将数组作为 Map 构造函数的参数。

> 利用数组的 filter 方法来过滤 Map 中所有价格大于 10 元的菜

```js
let arrs = [
  ["白菜", 2.0],
  ["萝卜", 3.4],
  ["西蓝花", 5.8],
  ["茄子", 7.8],
];
let map = new Map(arrs);
// 1、先将map转数组
//   arrs = [...map];
// 2、利用数组的方法
//   arrs = arrs.filter(([key, value]) => value > 5);
// 3、将数组作为map构造函数的参数
//   map = new Map(arrs);
//   console.log(map);

// 以下是简写形式
map = new Map([...map].filter(([key, value]) => value > 5));
console.log(map);
```

## 六、Map 经典面试真题解析

TIP

深入浅出互联网大厂 ES6 中 Map 高频面试真题解析 和 相关扩展知识

面试真题是检验自己学习成果和查缺补漏的最好方式之一，同时也是了解企业对求职者技能要求的风向标 。

### 1、Object 和 Map 的区别（小米、滴滴）

TIP

Object 和 Map 相似处在于，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。

不过 Map 与 Object 还是有一很重要的区别，下列情况中使有 Map 会是更好的选择。

> [点击查看，MDN 官方参考资料(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#实例方法)

| /            | Map                                                                             | Object                                                                                                                                                                                                                                  |
| :----------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 意外的键     | `Map` 默认情况不包含任何键。只包含显式插入的键。                                | 一个 `Object` 有一个原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。                                                                                                                                                    |
| 键的类型     | 一个 `Map` 的键可以是**任意值**，包括函数、对象或任意基本类型。                 | 一个 `Object` 的键必须是一个`String`或`Symbol`类型                                                                                                                                                                                      |
| 键的顺序     | `Map` 中的键是有序的。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值。 | 虽然 `Object` 的键目前是有序的，但并不总是这样，而且这个顺序是复杂的。因此，最好不要依赖属性的顺序。                                                                                                                                    |
| size         | `Map` 的键值对个数可以轻易地通过 `size` 属性获取。                              | `Object` 的键值对个数只能手动计算                                                                                                                                                                                                       |
| 迭代         | `Map` 是 可迭代的 的，所以可以直接被迭代。                                      | `Object` 没有实现迭代协议，所以使用 JavaSctipt 的 `for...of`表达式并不能直接迭代对象。 更多参考上面提供的 MDN 官方参考资 料                                                                                                             |
| 性能         | 在频繁增删键值对的场景下表现更好                                                | 在频繁添加和删除键值对的场景下未作出优化。                                                                                                                                                                                              |
| 序列化和解析 | 没有元素的序列化和解析的支持。                                                  | 原生的由 [`Object` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)到 JSON 的序列化支持，使用 `JSON.stringify()` 原生的由 JSON 到 `Object`的解析支持，使用 `JSON.parse()`。 |

- 意外的键，对象原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

```js
function Point() {}
Point.prototype.x = 3;
const point = new Point();
// 自己定义的键名和原型上的键名产生冲突
point.x = 1;
```

- 迭代，可以动为对象实现迭代协议，也可以用`Object.keys`或`Object.values`方法

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
for (let key of Object.keys(obj)) {
  console.log(key);
}

for (let key of Object.values(obj)) {
  console.log(key);
}
```

- 序列化和反序列化

> **序列化：** 把对象转化为可传输的字节序列过程称为序列化。
> \> **反序列化（解析）：** 把字节序列还原为对象的过程称为反序列化。

```js
const obj = {
  username: "清心",
  age: 33,
};
// 将对象转换为字符串 （对象序列化）
const strJson = JSON.stringify(obj);
console.log(strJson);
console.log(typeof strJson);

// 将JSON字符串转换为对象，字符串解析
const obj2 = JSON.parse(strJson);
console.log(obj2);
console.log(typeof obj2);
```

为什么要序列化 ？

- 其实序列化最终的目的是为了对象可以**跨平台存储和进行网络传输**。而我们进行跨平台存储和网络传输的方式就是 IO，而我们的 IO 支持的数据格式就是字节数组。
- 因为我们单方面的只把对象转成字节数组还不行，因为没有规则的字节数组我们是没办法把对象的本来面目还原回来的，所以我们必须在把对象转成字节数组的时候就制定一种规则 **（序列化）**，那么我们从 IO 流里面读出数据的时候再以这种规则把对象还原回来 **（反序列化）**。

> 如果我们要把一栋房子从一个地方运输到另一个地方去，**序列化** 就是我把房子拆成一个个的砖块放到车子里，然后留下一张房子原来结构的图纸，**反序列化** 就是我们把房子运输到了目的地以后，根据图纸把一块块砖头还原成房子原来面目的过程

### 2、Map 与对象之间的互转（小米、滴滴）

Map 转对象

如果 Map 的键是字符串或 Symbol 类型，可以无损的转为对象，但是如果有非字符串和 Symbol 类型的键，那这个键名会被转换成字符串，再作为对象的键名。

```js
const map = new Map()
  .set([1, 2, 3], true)
  .set(Symbol(), "符号")
  .set("username", "清心")
  .set({ a: 1 }, "对象");

// 将map转换为对象
function objToMap(map) {
  const obj = new Object();
  for (let [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
console.log(objToMap(map));

// {1,2,3: true, username: '清心', [object Object]: '对象', Symbol(): '符号'}
```

> Map 转对象除了对键名有影响，还会影响成员的顺序

对象转 Map

对象转`Map`可以通过`Object.entries()`方法。

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
// Object.entries(obj)方法，将对象转换成二维数组，数组的每个成员是一个双元素的数组
console.log(Object.entries(obj)); // [['a', 1],['b', 2],['c', 3]]
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const map = new Map(Object.entries(obj));
console.log(map); // Map(3) {'a' => 1, 'b' => 2, 'c' => 3}
```

## 七、Map 在实际开发中的应用

TIP

Map 和对象最大的区别在于其键可以是任意的类型，而对象的键只能是字符串和 Symbol 类型。

Map 常用来保存 DOM 节点和及节点相关的信息。

### 1、DOM 节点与 CSS 样式的映射关系

```html
<p>111</p>
<p>222</p>
<p>333</p>
<p>444</p>
<p>555</p>

<script>
  const [p1, p2, p3, p4, p5] = document.querySelectorAll("p");

  // 单个添加 Map 成员
  //   const map = new Map();
  //   map.set(p1, "red");
  //   map.set(p2, "yellow");
  //   map.set(p3, "blue");
  //   map.set(p4, "green");
  //   map.set(p5, "skyblue");
  //   console.log(map); // Map(5) {p => 'red', p => 'yellow', p => 'blue', p => 'green', p => 'skyblue'}

  // 通过二维数组的方式添加Map成员
  const map = new Map([
    [p1, "red"],
    [p2, "yellow"],
    [p3, "blue"],
    [p4, "green"],
    [p5, "skyblue"],
  ]);

  //   map.forEach(function (color, ele) {
  //     ele.style.color = color;
  //   });

  // 如果不需要改变this指向，可以使用箭头函数，语法会更简洁
  map.forEach((color, ele) => {
    ele.style.color = color;
  });

  console.log(map);
</script>
```

![image-20221025021028900](https://www.arryblog.com/assets/img/image-20221025021028900-16742245421011.e529b984.png)

### 2、全屏加载动画

![GIF2023-1-2022-30-52](https://www.arryblog.com/assets/img/GIF2023-1-2022-30-52.dd611c2b.gif)

> 其动画效果引用 animate.css，官方网站地址：[https://animate.style/(opens new window)](https://animate.style/)

```html
<!-- 导入animate.css库 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100%;
    height: 500px;
    background-color: rgb(233, 245, 250);
    position: relative;
    overflow: hidden;
  }
  .box {
    position: absolute;
  }
  .box1 {
    width: 200px;
    height: 100px;
    background-color: rgb(173, 252, 180);
    left: 200px;
    top: 40px;
  }
  .box2 {
    width: 400px;
    height: 200px;
    background-color: skyblue;
    left: 500px;
    top: 250px;
    left: 410px;
  }

  .box3 {
    width: 400px;
    height: 200px;
    background-color: rgb(243, 174, 191);
    left: 410px;
    top: 40px;
  }
  .box4 {
    width: 200px;
    height: 300px;
    background-color: khaki;
    left: 200px;
    top: 150px;
  }
</style>
<div class="container">
  <div class="box box1"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>
  <div class="box box4"></div>
</div>

<script>
  // 利用解构赋值，将获取的DOM元素赋值给到变量
  let [box1, box2, box3, box4] = document.querySelectorAll(".container div");
  // 利用Map来建立DOM元素与其Class样式间的映射关系
  const map = new Map([
    [
      box1,
      ["animate__animated", "animate__backInDown", "animate__backOutDown"],
    ],
    [
      box2,
      ["animate__animated", "animate__backInLeft", "animate__backOutLeft"],
    ],
    [
      box3,
      ["animate__animated", "animate__backInRight", "animate__backOutRight"],
    ],
    [box4, ["animate__animated", "animate__backInUp", "animate__backOutUp"]],
  ]);

  // 利用for...of来遍历map，给DOM元素添加对应的Class样式
  for (let [k, v] of map) {
    k.classList.add(v[0]);
    k.classList.add(v[1]);
  }

  // 定时器在5分钟后执行
  setTimeout(function () {
    // 利用for...of来遍历map，给DOM元素添加和移除对应的Class样式
    for (let [k, v] of map) {
      k.classList.remove(v[1]);
      k.classList.add(v[2]);
    }
  }, 5000);
</script>
```

## 八、WeakMap 数据结构

TIP

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

**不过 WeakMap 与 Map 还有两个重要的区别：**

- `WeakMap`只接通受对象类型作为键名，不接受其他类型的值作为键名。
- `WeakMap`中键名所指向的对象**保持弱引用**，如果键所指对象没有其他地方引用他，就会被 GC 垃圾回收掉。

### 1、WeakMap 的基本用法

TIP

WeakMap 是一个构造函数，所以可以调用构造函数来创建 WeakMap 数据结构

- 创建后，调用 set 方法添加成员

```js
const obj1 = { a: 1 };
const obj2 = [1, 2, 3];
const wm = new WeakMap();
wm.set(obj1, "对象");
wm.set(obj2, "数组");
console.log(wm);
```

- 创建同时初始化成员，其构造函数的参数必需是一个可迭代对象，可迭代对象返回的每一个成员是一个双元数组，数组的第一个元素必需是一个对象类型

```js
const obj1 = { a: 1 };
const obj2 = [1, 2, 3];
const wm = new WeakMap([
  [obj1, "对象"],
  [obj2, "数组"],
]);
console.log(wm);
```

### 2、WeakMap 中成员特性

TIP

- WeakMap 中的键名是唯一的，如果出现相同的键名，则后面的会覆盖前面的
- WeakMap 的键名只能是一个对象类型，不能是其它类型。（2021 的新提案中，建议允许 Symbol 类型，但目前还不支持）

```js
const obj1 = { a: 1 };
const obj2 = [1, 2, 3];
const arr1 = [1];
const arr2 = [1];
const wm = new WeakMap([
  [obj1, "对象"],
  [obj2, "数组"],
  [obj2, "数组2"],
  [arr1, "1"],
  [arr2, "2"],
]);
console.log(wm);
```

![image-20230120164931013](https://www.arryblog.com/assets/img/image-20230120164931013.142db465.png)

### 3、WeakMap 实例的方法

TIP

WeakMap 只有以下 4 个方法

| 方法             | 说明                                                                                   |
| :--------------- | :------------------------------------------------------------------------------------- |
| `set(key,value)` | 设置`WeakMap`对应的键值，并返回当前`WeakMap`对象，所以`set`方法支持链式调用            |
| `get(key)`       | 根据对应的键名，来获取对应的键值，没有对应的键名，返回`undefined`                      |
| `has(key)`       | 判断`WeakMap`中是否包含指定的键名，有返回`true`,没有返回`false`                        |
| `delete(key)`    | 根据指定的键名，从`WeakMap`中删除对应的键值对成员，删除成功返回`true`，否则返回`false` |

```js
const obj1 = { a: 1 };
const obj2 = [1, 2, 3];
const arr1 = [1];
const arr2 = [1];
const wm = new WeakMap();
// set添加成员
wm.set(obj1, "obj1值")
  .set(obj2, "obj2值")
  .set(arr1, "arr1值")
  .set(arr2, "arr2值");
console.log(wm); // WeakMap {Array(3) => 'obj2值', Array(1) => 'arr2值', {…} => 'obj1值', Array(1) => 'arr1值'}
// get获取成员值
console.log(wm.get(obj1)); // obj1值
console.log(wm.get({ a: 1 })); // undefined
// has判断是否有某个成员
console.log(wm.has(obj2)); // true
console.log(wm.has([1, 2, 3])); // false
// delete删除某个成员
console.log(wm.delete(obj2)); // true
console.log(wm.delete(arr2)); // true
console.log(wm); // WeakMap {{…} => 'obj1值', Array(1) => 'arr1值'}
```

### 4、WeakMap 中键名所指向的对象保持弱引用

TIP

所谓的弱引用，即垃圾回收不会将该引用考虑在内。只要该对象没有被其他引用，则垃圾回收机制就会回收该对象所占用的内存。

```js
let obj1 = { a: 1, b: 2 }; // 对象{ a: 1, b: 2 } 被obj1引用+1
const wm = new WeakMap();
wm.set(obj1, "对象"); // 对象{ a: 1, b: 2 } 为弱引用，不会计数，则引用次数+0,总引用次数为1
obj1 = null; // 切断obj1对 对象{ a: 1, b: 2 }的引用，引用次数-1，总引用次数为0，垃圾回收回收该对象占用的内存
console.log(wm);
```

![image-20230120171708726](https://www.arryblog.com/assets/img/image-20230120171708726.aa8585b7.png)

温馨提示：

WeakMap 只针对键名的引用是弱引用，值的引用依然是强引用

```js
let obj1 = { a: 1, b: 2 }; // 对象{ a: 1, b: 2 } 被obj1引用+1
let arr = [1, 2];
const wm = new WeakMap();
// arr是弱引用，垃圾回收不会将该引用计入在内，但obj1是强引用，垃圾回收会将该引用计入在内
wm.set(arr, obj1);
obj1 = null; // 切断obj2对对象{ a: 1, b: 2 }的引用，但obj1还被wm引用，所以引用次数为1，并不会被垃圾回收器回收
console.log(wm);
```

注：

因为 WeakMap 中对键名是弱引用，所以 WeakMap 没有`size`属性，也没有`keys、values、entries、forEach`方法,也不能通过 `for...of` 来遍历。

> 因为 WeakMap 中的成员随时有可能消失，被当成垃圾回收掉。

### 5、Map 与 WeakMap 的区别 ？面试真题解析

TIP

Map 和 WeakMap 是两种数据结构，用于操作键值之间的关系。

> 其都有`get、set、delete、has`方法，可以对成员做增删改查操作，不过他们存在以下不同点

| 区别     | 说明                                                                                                                                      |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 键的类型 | `Map`中的键可以是任意的当数据类型 `WeakMap`中的键只能是对象类型                                                                           |
| 键的引用 | `Map`以中键指向的对象为强引用 `WeakMap`中键指向的对象为弱引用                                                                             |
| 属性     | `Map`有`size`属性，而`WeakMap`没有                                                                                                        |
| 方法     | `Map`有`keys，values，entries，forEach`方法，可以对其成员进行遍历 `WeakMap`没有`keys，values，entries，forEach`方法，其成员也不能进行遍历 |

## 九、WeakMap 在实际开发中的应用

TIP

当我们需要保存某个对象的相关信息，但又不想干扰垃圾回收机制对该对象的回收。我们就可以把这个对象与之相关的信息以键值对的形式保存在 WeakMap 中。

> WeakMap 常用来存储一些只有当前对象存在时才有用的信息，如果对象不存在了，这些信息也就没有了，应当和对象一起被垃圾回收掉。

### 1、缓存数据

TIP

当某个**函数的计算结果**需要被记住”缓存“时，我们就可以把对象作为键，其相关信息做为值，添加到 WeakMap 中，在后续我们需要用到相关信息时，如果缓存中有，就直接读取缓存的，如果没有，则重新存一份到 WeakMap 中。

这样，只要对象被销毁，其相关的信息也就被销毁，而不会造成内存泄露。

> 以上提到的缓存，并非指浏览器的缓存，而是指对象的某个信息需要经过大量的计算才能得到，但每次计算的结果又相同，这时我们可以把这个计算的结果保存起来，后面需要用时，直接拿来用。

```js
let cache = new WeakMap(); // 用来保存对象需要缓存的信息
function getIdentity(obj) {
  // 判断缓存中是否有缓存该对象内容，没有就计算一次，然后将计算的结果缓存起来
  if (!cache.has(obj)) {
    console.log("没有走缓存");
    let identity;
    if (obj.age < 18) {
      identity = "少年";
    } else if (obj.age < 38) {
      identity = "青年";
    } else if (obj.age < 48) {
      identity = "中年";
    } else {
      identity = "老年";
    }
    // 加入到cache中缓存起来
    cache.set(obj, identity);
  }
  // 最后返回缓存中的结果
  return cache.get(obj);
}

let obj = {
  username: "清心",
  age: 33,
};
console.log(getIdentity(obj));
console.log(getIdentity(obj));
obj = null;
// obj=null,切断obj与{username: "清心",age: 33}对象的引用，obj的引用次数为0，垃圾回收会回收掉对象占用的内存
// 因为cache中对对象的引用为弱引用，垃圾回收机制不会考虑
```

注：

如果上面的结果不保存在 WeakMap 中，而保存 Map 中，那 `obj = null` 时，垃圾回收机制并不认为对象是垃圾，因为对象在 Map 还在引用着。所以不手动清除 Map 中对对象的引用，就会造成内存泄露。

你可能会说，那我可以把返回的结果保存在一个变量中，后面需要用到，直接用变量中的结果就可以，但这样我们在设置 `obj = null` 时，对象会当成垃圾回收，但变量保存的结果占用着内存，也会造成内存泄露。

### 2、模拟私有变量

TIP

把对象与当前对象的私有属性形成键值对的映射关系，存入到 WeakMap 中，这样创建出来的实例对象身上没有这个私有属性，也就能真正达到属性私有化的目的。

```js
const Stack = (function () {
  const privates = new WeakMap(); // 用来保存私有属性
  function Stack() {
    privates.set(this, []); // 模拟对象的私有属性，属性对应值为数组
  }
  // 入栈
  Stack.prototype.push = function (value) {
    privates.get(this).push(value);
    return this; // 返回值为调用当前方法的对象，支持链式调用
  };
  // 出栈
  Stack.prototype.pop = function () {
    return privates.get(this).pop();
  };
  // 查看栈元素
  Stack.prototype.view = function () {
    console.log(privates.get(this));
  };

  return Stack;
})();

// 创建一个栈
const stack = new Stack();
stack.push(1).push(2).push(3);
console.log(stack.pop()); // 3
stack.view(); //  [1, 2]
```

## 十、重难点总结

TIP

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、Set 是什么 ？

TIP

- Set 中的成员是唯一的，没有重复值，这一特点，我们可以用它来做数组或字符串的去重。
- Set 中成员的遍历顺序和成员插入时的顺序是一致的。
- Set 没有下标序号，即没有办法通过指定的序号来访问特定的成员

### 2、Map 是什么 ？

TIP

- Map 的本质是键值对的集合（和对象一样本质都是键值对的集合）
- 对象与 Map 不同的是，对象只能使用字符串和 Symbol 来当做键，而 Map 任意数据类型都可以作为键

### 3、Set 和 Map 实例的方法与属性

| 方法与属性               | Set                   | Map                                    |
| :----------------------- | :-------------------- | :------------------------------------- |
| 添加成员的方法           | `add()`               | `set()`添加成员，`get()`获取指定的成员 |
| 判断是否拥有某个成员     | `has()`               | `has()`                                |
| 删除某个值，清除所有成员 | `delete()`，`clear()` | `delete()`，`clear()`                  |
| 遍历所有成员             | `forEach()`           | `forEach()`                            |
| 成员总数                 | size 属性             | size 属性                              |

注：

我们可以看到，Set 和 Map 实例的方法和属性除了 添加成员的方法不同之外，其他都一样。

### 4、Set 和 Map 构造函数的参数

TIP

- Set：数组、字符串、arguments、NodeList、Set 等，其实参数只要是一个可迭代对象就行
- Map：数组（二维数组），其实参数只要是一个可迭代对象，同时迭代对象返回的每一个成员是一个二元数组就可以

> 注：其中我们用到最多是数组的形式，其他了解知道就行。

### 5、Set 和 Map 对相同值/键的判断

TIP

- 基本可用严格相等 `===` 判断
- 例外：对于 NaN 的判断与`===`不同，Set/Map 中 NaN 等于 NaN

### 6、什么时候使用 Set ？

TIP

- 数组 或 字符串去重时
- 不需要通过下标访问，只需要遍历时
- 为了使用 Set 提供的方法和属性时

> 以上 2、3 两条使用数组或 Set 都可以，根据实际情况而定，没有严格的标准。

### 7、什么时候使用 Map ？

TIP

- 只需要 `key -> value` 的结构时
- 需要字符串以外的值做键时
- 为了使用 Map 提供的方法和属性时

> 当然，以上第 1、3 条使用对象或 Map 都可以，根据实际情况来就 OK，如果觉得对象字面量更直观就使用对象。

### 8、关于 WeakSet 与 WeakMap

TIP

WeakSet 中的成员只能是对象，不能是其它类型。WeakMap 中的键名只能是对象类型，不能是其它类型

WeakSet 中成员的引用为弱引用，WeakMap 中键指向的对象也属于弱引用。

- 当我们需要存储一个对象，而以不希望这个对象干扰垃圾回收机制时，就可以用 WeakSet
- 当我们需要存储一个对象及对象相关的信息，而不希望这个对象干扰垃圾回收机制时，就可以用 WeakMap。

WeakSet 和 WeakMap 中的成员都是弱引用，所以都没有 size、forEach、keys、values、entries 方法，也不能通过 `for...of` 来遍历

### 9、实际应用场景

TIP

手动实现 Set、Map、WeakSet、WeakMap 在实际开发中的应用相关的案例。

## 十一、测试题

TIP

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、下列关于 Set 的描述，错误的选项是 ？

> 选择两项

- A、Set 中的值必须是唯一的
- B、可以通过下标的方法访问 Set 中的值
- C、Set 可以结合...扩展运算符，在数组中展开
- D、Set 中 NaN 与 NaN 是相等的

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、以下代码中，输入的 this 值是 ？

> 选择一项

```js
let s = new Set();
s.add(1).add(2).add(2);
const obj = {};
s.forEach(() => {
  console.log(this);
}, obj);
```

- A、window
- B、undefined
- C、obj
- D、s

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 3、以下代码中，会报错的选项是 ？

> 选择一项

- A、

```js
const s = new Set("icoding");
console.log(s);
```

- B、

```js
const s = new Set(3);
console.log(s);
```

- C、

```js
const s = new Set([1, 2]);
const s2 = new Set(s);
console.log(s2);
```

- D、

```js
function fn() {
  const s = new Set(arguments);
  console.log(s);
}
fn();
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 4、Map 和 Set 实例共有的方法和属性是 ？

> 选择二项

- A、add
- B、size
- C、forEach
- D、get

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 5、关于 Map 对象，以下说法不正确的是 ？

> 选择一项

- A、Map 是映射的意思，Set 是集合的意思
- B、Map 构造函数中的参数，可以是任意的可迭代对象
- C、通过 size 属性，可以获取 Map 成员的个数
- D、Map 可以结合 `...` 展开运算符，在数组中展开

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

## 十二、面试题

TIP

深入浅出互联网大厂 ES6 高频面试真题解析 和 相关扩展知识

面试真题是检验自己学习成果和查缺补漏的最好方式之一，同时也是了解企业对求职者技能要求的风向标 。

### 1、 实现函数的链式调用（商汤）

TIP

写一个类，其构造出来的对象打点调用自身的方法，这个方法支持链式调用。

> 方法支持链式调用的本质：该方法返回值为调用该方法的对象本身

```js
const privates = new WeakMap(); // 创建map用来保存私有属性
function Stack() {
  privates.set(this, []);
}
Stack.prototype.add = function (value) {
  privates.get(this).push(value);
  return this; // 返回值为当前实例对象本身
};
Stack.prototype.view = function () {
  console.log(privates.get(this));
};

const stack = new Stack();
stack.add(1).add(2).add(3);
console.log(stack.view());
```

### 2、 利用 map 记录字符串中每个字符出现次数（小米）

TIP

比如：字符串：“abcdaaasscccdeeesdd“ 中每个字符出现的次数，分别为

`a=>4,b=>1,c=>4，d=>4，s=>3,e=>3`次

解题思路

利用 `for...of` 遍历字符串，把字符串中的元素和元素出现的次数，以键值对的形式添加到`Map`中。 最后输出`map`

```js
let str = "abcdaaasscccdeeesdd";
// 创建Map
const map = new Map();
for (let k of str) {
  // 如果存在k，则取出k对应值然后+1，如果不存在，则其值为0+1=1
  map.set(k, (map.get(k) || 0) + 1);
}
console.log(map);
```

### 3、找数组中的主要元素

TIP

所谓的数组中的主要元素是指，数组中的某个元素有出现次数超过了数组长度的一半，那这个元素为数组中的主要元素，返回当前元素。如果没有主要元素，返回值为 `-1`

> 如：

- 数组`[1,2,4,4,4,4,5]`中主要元素为 4，返回值为 4。
- 数组`[1,2,4,4,4,5]`中没有主要元素，返回值-1。

解题思路：

- 利用用`for...of`遍历数组，把数组中的元素和元素出现的次数，以键值对的形式添加到 Map 中
- 遍历 Map，找出 Map 中键对应的值 > 数组长度 / 2 的元素
- 如果没有找到，则返回 -1，如果找到，返回对应的元素

```js
// 找出数组中的主要元素
function findMajorElement(arr) {
  // 创建Map，用来统计数组中每个元素出现的次数
  const map = new Map();
  // 遍历数组，把数组中每个元素及出现的次数以键值对形式存入map中
  for (let k of arr) {
    map.set(k, (map.get(k) || 0) + 1);
  }
  let result; // 用来保存找到的元素
  // 遍历map，找出出现次数>数组长度/2的元素
  for (let [k, v] of map) {
    if (v > arr.length / 2) result = k;
  }
  // 判断result是否有值,如果有值返回对应值，如果没有则返回-1
  return result === undefined ? -1 : result;
}

console.log(findMajorElement([1, 2, 3, 3, 3, 5])); //-1
console.log(findMajorElement([1, 2, 3, 3, 3, 5, 3])); // 3
console.log(findMajorElement([1, 2, 3, 3, 3, 2, 2, 2, 2])); // 2
```
