---
title: ES6 剩余参数 和 展开运算符在实际开发中的应用
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 剩余参数 和 展开运算符在实际开发中的应用

TIP

本节内容我们开始学习 ES6 中的 剩余参数、数组的展开运算符、对象的展开运算符，以及在实际开发中的注意事项和应用。

**剩余参数**

- 剩余参数是什么 ？
- 剩余参数在实际开发中的注意事项
- 剩余参数在实际开发中的应用

**数组的展开运算符**

- 数组展开运算符的基本用法
- 区分扩展运算符和剩余参数
- 数组展开运算符在实际开发中的应用

**对象的展开运算符**

- 什么是对象的扩展运算符
- 对象展开运算符在实际开发中的注意事项
- 对象扩展运算符在实际开发中的应用

## 一、剩余参数

TIP

深入浅出什么是剩余参数，剩余参数的本质。

### 1、什么是剩余参数

TIP

ES6 中引入了 rest（剩余）参数，允许将不确定部分的参数合成一个数组。其写法为 `...变量名`，变量是一个数组，用来保存不确定部分的参数。

> 简单理解：rest 参数，就是把用逗号隔开的值合成一个数组，保存在变量中。

```js
// ...args 为剩余参数，其中变量args表示一个数组,用来接受传过来的所有实参
const sum = (...args) => {
  console.log(args);
};
sum(1, 2, 3, 4); //  [1, 2, 3, 4]
sum(); // []

// ...args 为剩余参数，其中变量args表示一个数组，用于接受第3个（包含）之后的所有实参
const f = (a, b, ...args) => {
  console.log(a); // 1
  console.log(b); // 2
  console.log(args); // [3, 4, 5]
};
f(1, 2, 3, 4, 5);
```

注：

我们要确定剩余参数对应的参数，先要把确定的参数排除，剩下的不确定参数就全部归剩余参数。

### 2、剩余参数的本质

TIP

剩余参数中的变量本质是一个数组，即使没有值，也是一个空数组，所以数组所有的方法这个变量都可以用

```js
const f = (a, ...args) => {
  args.push(a);
  console.log(args);
};
f(1, 2, 3, 4, 5);
```

### 3、剩余参数的注意事项

- 剩余参数之后不能再有其它参数，即剩余参数必需是最后一个参数，否则会报错

```js
const f = (a,...args,b)=>{} // 报错
```

- 当箭头函数中只有一个剩余参数时，其圆括号也不能省略

```js
// const f = ...args => args;  错误写法
const f = (...args) => args;
console.log(f(1, 2, 3)); // [1, 2, 3]
```

- 在箭头头函数中没有 arguments，所以 rest 剩余参数可以在箭头或普通函数中替代 arguments 来接受对应的实参列表。
- arguments 是类数组对象，很多时候要把他转换为数组再用，而剩余参数本身就是数组，用起来就很方便

> 在以后的开发中，我们常会用 rest 剩余参数来代替 arguments

```js
// 普通函数与arguments
function sum() {
  let result = 0; // 累加器
  Array.prototype.forEach.call(arguments, (item) => {
    result += item;
  });
  return result;
}
console.log(sum(1, 2, 3, 4));

// 箭头函数与剩余参
const sum2 = (...args) => {
  let result = 0; // 累加器
  args.forEach((item) => {
    result += item;
  });
  return result;
};
console.log(sum2(1, 2, 3, 4));
```

- 函数的 length 属性用来保存未设置默认值参数的个数，rest 剩余参数不计入其中

```js
const f = (a, b, c = 2, ...args) => {};
console.log(f.length); // 2
```

**总结**

| 注意事项                         | 说明                                                                                                                     |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| 剩余参数的位置                   | 剩余参数必须是最后一个参数                                                                                               |
| 箭头函数中只有一个剩余参数       | 箭头函数中只有一个剩余参数，也不能省略圆括号                                                                             |
| 剩余参数与 arguments             | 箭头函数中没有 arguments，在往后的开发中，我们会利用剩余参数来替代 arguments，因为剩余参数本身就是一个数组，用起来更方便 |
| 函数 length 属性不计算 rest 参数 | 函数的 length 属性用来保存未设置默认值参数的个数，rest 剩余参数不计入其中                                                |

### 4、剩余参数在实际开发中的应用

- 根据实参传递的个数来求和

```js
// 箭头函数与剩余参
const sum = (...args) => {
  var result = 0;
  args.forEach((item) => {
    result += item;
  });
  return result;
};
console.log(sum(1, 2, 3, 4));
```

- 剩余参数与数组的解构赋值的结合应用

> 剩余参数不一定非要作为函数参数使用，解构赋值也可以使用
>
> 当剩余参数与解构赋值结合使用时，我们称他为 **剩余元素**。
>
> 同时在与解构赋值结合时，也只能是最后一个元素，之后不能再有其他参数，否则会报错

```js
// 绑定模式
let [a, b, ...c] = [1, 2, 3, 4, 5, 6];
console.log(a); // 1
console.log(b); // 2
console.log(c); //  [3, 4, 5, 6]

// 赋值模式
let a, b, c;
[a, b, ...c] = [1, 2, 3, 4, 5, 6];
console.log(a); // 1
console.log(b); // 2
console.log(c); //  [3, 4, 5, 6]
```

- 剩余参数与与对象的解构赋值结合应用

> **重点提示：** 剩余元素与对象解构赋值结合时，其不数组，而是对象。
>
> 同时解构赋值时，剩余元素不会复制原型对象上的属性

```js
// 绑定模式
const { a, b, ...c } = { a: 1, b: 2, c: 3, d: 5 };
console.log(a); // 1
console.log(b); // 2
console.log(c); // {c: 3, d: 5}

// 赋值模式
const a, b, c;
({ a, b, ...c } = { a: 1, b: 2, c: 3, d: 5 });
console.log(a); // 1
console.log(b); // 2
console.log(c); // {c: 3, d: 5}
```

- 我们来看下面这种情况，以下 args 是剩余参数还是剩余元素

```js
function fn([a, ...args1], ...args2) {
  console.log(args1); // [2, 3, 4] 剩余元素
  console.log(args2); // ['A', 'B'] 剩余参数
}
fn([1, 2, 3, 4], "A", "B");
```

总结：

- 剩余参数和剩余元素的书写格式都是使用 `…变量名` 的方式
- 不同的是：剩余参数是直接作为函数参数使用的。剩余元素是在解构赋值时，用来接收剩下的元素。

## 二、数组的扩展（展开）运算符

TIP

深入浅出展开运算符，数组展开运算符的基本用法等。

### 1、什么是数组扩展运算符

TIP

数组扩展运算符（spread）是三个点`...`,他可以将数组展开为用逗分隔的参数序列。

```js
const arr = [1, 2, 3];
// ...arr 相当于把数组展开以逗号分隔的序列 console.log(1,2,3)
console.log(...arr); // 1 2 3

console.log(1, ...["A", "B", "C"], 2); // 1 'A' 'B' 'C' 2
```

- 如果扩展运算符后面是一个空数组，则不会产生任何效果

```js
const arr = [1, 2, ...[], 3];
console.log(arr); // [1, 2, 3]
```

- 数组扩展运算符后面可以放置表达式

```js
let a = 1;
let b = 3;
const arr = [...(a > b ? [a] : [b])];
console.log(arr); // [3]
```

### 2、区分扩展运算符和剩余参数

TIP

我们上边学习的展开运算符，发现它和剩余参数在语法上是一样的，都是前边加上 `...` 这样就会导致我们经常分不清楚。

> 接下来我们来看剩余参数和展开运算符的根本区别。

- 展开运算符：展开运算符是将数组展开成一个个以逗号分隔的序列。

```js
[6,2,3] -> 6,2,3
```

- 剩余参数：将参数列表的形式转换成数组形式

```js
6,2,3 -> [6,2,3]
```

- 区分以下代码中，哪些是扩展运算符，哪些是剩余参数

```js
const sum = (...args) => {
  // ...args  剩余参数 用来接受数组传过来的所有实参
  console.log(args); // [6, 2, 3]
  // 展开运算符，...args 相当于 ...[6, 2, 3] 将数组展开成 6,2,3
  console.log(...args); // 6 2 3
};
sum(6, 2, 3);
```

### 3、测试题

TIP

以下代码中的第一个`...arg1`、`...arg2`、第二个`...arg1`，分别是表示什么 ？

```js
const f = ([...arg1], ...arg2) => {
  console.log(arg2);
  console.log(...args1);
};
f([1, 2, 3], "A", "B", ["x", "y"]);
```

说明

- 第一个`...arg1`，是在数组中，相当于 `let [...arg1] = [1,2,3]`，所以第一个`arg1`是剩余元素
- `...arg2`是写在函数的参数列表中，所以是剩余参数，用来接受除第一个参数之外的其它参数
- 第二个`...arg1`，是展开运算符，用来将第一个`arg1`对应的数组展开。

### 4、数组展开运算符在实际开发中的应用

- 复制数组

```js
// 复制数组
const arr = [1, 2, 3, 4, 5];
// 展开运算符复制数组
const arr1 = [...arr];
console.log(arr1); // [1, 2, 3, 4, 5]
```

> 复制数组本质：在原来的数组中展开数组即可，展开也是浅复制

- 合并数组

```js
// 合并数组
const x = [1];
const y = [2, 3];
const z = [5, 6, 8];

// 展开运算符合并数组
console.log([...x, ...y, ...z]); // [1, 2, 3, 5, 6, 8]
// 随意调换顺序
console.log([...y, ...x, ...z]); // [2, 3, 1, 5, 6, 8]
console.log([...z, ...x, ...y]); // [5, 6, 8, 1, 2, 3]
// 还可以根据自己的需求增加数组的值
console.log([...z, 10, ...x, 20, ...y, 30]); // [5, 6, 8, 10, 1, 20, 2, 3, 30]
```

- 字符串转为数组

字符串可以按照数组的形式展开

```js
// 字符串可以看做是一个类数组，因此字符串是可以按照数组的形式展开
const str = "icoding";
// 使用展开运算符将字符串展开
console.log(...str); // i c o d i n g

// 将字符串转为数组，只需要将展开字符串放到数组[]中即可
const arr = [...str];
console.log(arr); // ['i', 'c', 'o', 'd', 'i', 'n', 'g']
```

> 为什么要将字符串转数组呢 ？
>
> 因为，数组中有很多好用的方法，我们就可以把字符串转为数组，即可使用数组的方法。用完之后再把数组转为字符串，这样就非常方便了。

- 常见的类数组转化为数组

arguments 类数组

```js
function foo() {
  // 在数组中展开 arguments 即可 将类数组转为数组
  console.log([...arguments]);
}
foo(1, 2, 3); // [1, 2, 3]
```

NodeList 类数组

```js
// NodeList 是类数组没有数组相关方法
const p = document.querySelectorAll("p");
// 使用展开运算符转为数组
const arr = [...p];
console.log(arr); // [p, p, p]
```

> **重点提示：** 任何`Iterator`接口的对象都可以用扩展运算符转为真正的数组。

- 将数组转换为函数的参数

> 由于扩展运算符可以展开数组，所以不再需要使用 apply 方法将一个数组转为函数的参数了。可以直接用扩展运算符来实现。

案例：求数组中的最大值和最小值

```js
// 先来复习两个Math对象上的方法
let max = Math.max(1, 2, 5); // 返回参数列表中的最大值
let min = Math.min(1, 2, 5); // 返回参数列表中的最小值
console.log(max, min); // 5 1
```

没有扩展运算符之前，实现代码如下

```js
const arr = [17, 5, 1, 8, 3, 20];
let max = Math.max.apply(null, arr);
let min = Math.min.apply(null, arr);
console.log(max, min); // 20 1
```

利用扩展运算符实现，代码如下

```js
const arr = [17, 5, 1, 8, 3, 20];
let max = Math.max(...arr);
let min = Math.min(...arr);
console.log(max, min); // 20 1
```

## 三、对象的扩展（展开）运算符

TIP

深入浅出对象展开运算符的基本用法，注意事项，以及在实际开发中的应用。

### 1、什么是对象的扩展运算符

TIP

扩展运算符`...`用于取出对象的所有**可遍历属性**，并将其复制到**当前对象**之中。

> 也就是说 对象不能直接展开或在数组中展开，必需在`{}`对象中展开。

```js
const student = {
  username: "icoding",
  age: 18,
  sex: "male",
  addr: "北京",
};

console.log({ ...student }); // {username: 'icoding', age: 18, sex: 'male', addr: '北京'}
// 对象不能使用以下方式展开
console.log(...student); // 报错
console.log([...student]); // 报错
const obj = {
  a: 1,
  ...{ b: 2, c: 3 },
  d: 4,
};
console.log(obj); // {a: 1, b: 2, c: 3, d: 4}
```

### 2、对象扩展运算符的注意事项

- 空对象的展开

> 如果展开一个空对象，没有任何效果

```js
console.log({ ...{} }); // {}

// 空对象 和 属性的合并
console.log({ ...{}, x: 123 }); // {x: 123}
```

- 非对象的展开，自动转换为对象

> 如果展开的不是对象，则会自动将其转为对象，再将其属性罗列出来

```js
// 数值类型
console.log({ ...2 }); // {}
// undefined
console.log({ ...undefined }); // {}
// null
console.log({ ...null }); // {}
// boolean
console.log({ ...true }); // {}
```

> 对象扩展运算符的参数是 null 或 undefined 时，这两个值会被忽略，但不会报错

```js
// 对象中展开运算符后边是字符串
console.log({ ..."arry" }); // {0: 'a', 1: 'r', 2: 'r', 3: 'y'}
// 数组中展开运算符后边是字符串
console.log([..."arry"]); // ['a', 'r', 'r', 'y']
// 直接展开字符串
console.log(..."arry"); // a r r y

// 对象中展开运算符后边是数组
console.log({ ...[1, 2, 3] }); // {0: 1, 1: 2, 2: 3}
```

- 对象展开属于浅复制（浅拷贝）

> 对象展开的本质：就是把对象的属性复制罗列出来，用逗号分隔，放到一个`{}`中，不过在复制属性时，属于浅复制（浅拷贝）

```js
const obj = {
  a: 1,
  b: 2,
  arr: ["A", "B", "C"],
};
// 将obj在一个对象中展开
const obj2 = { ...obj };
console.log(obj2); // {a: 1, b: 2, arr: ["A", "B", "C"]}
console.log(obj === obj2); // false
obj.arr.push("D");
console.log(obj2); // {a: 1, b: 2, arr: ["A", "B", "C","D"]}
console.log(obj.arr === obj2.arr); // true

// 当我们给obj中的arr数组后面添加一个新的元素"D"时，obj2中的arr数组中的元素也更改了，本质上obj.arr与obj2.arr 是完全相等的
```

- 合并对象，同名属性会覆盖

> 如果展开的对象中有与现有对象中同名的属性，则会发生覆盖。覆盖原则以写在后面的覆盖前面。

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
};
const obj2 = {
  a: "清心",
  ...obj,
  c: "icoding",
};
console.log(obj2);

// obj中的属性a覆盖了obj2中同名的a，obj2中的属性c，覆盖了obj中同名的属性c
```

- 扩展运算符的参数对象之中如果有取值函数 get，这个函数将会被执行

```js
let obj = {
  _x: 1,
  get x() {
    return this._x;
  },
  set x(value) {
    if (value === 3) {
      this._x = "不通过";
    } else {
      this._x = value;
    }
  },
};
const obj2 = { ...obj };
console.log(obj2); // {_x: 1, x: 1}
obj2.x = 3; // 丢失了set函数的功能
console.log(obj2); // {_x: 1, x: 3}
```

**总结**

| 注意事项                                                       |
| :------------------------------------------------------------- |
| 空对象的展开，没有任何效果                                     |
| 非对象类型展开，会先转换为对象，然后再将其可遍历属性罗列出来   |
| 对象展开属于浅复制（浅拷贝）                                   |
| 合并对象，同名属性会覆盖，覆盖原则为写在后面的覆盖前面的       |
| 扩展运算符的参数对象之中如果有取值函数 get，这个函数将会被执行 |

### 3、对象展开运算符在实际开发中的应用

- 复制对象（浅复制）

```js
const x = { a: 1, b: 2 };
// 使用展开运算符复制对象
const y = { ...x };
console.log(y); // {a: 1, b: 2}
console.log(y === x); // false 只是复制对象
```

- 用户参数与默认参数合并

> 如果我们想写一个提供给用户使用的函数或方法时，就会涉及用户参数和默认参数。即：

- **用户参数：** 是用户调用方法时实际传递的参数都叫做用户参数，也就是我们之前提到的实参。
- **默认参数：** 如果函数参数有三个，用户只传递了两个，剩余的默认参数就会生效，这样可以让用户少传递不必要的参数，可以让用户使用函数变得更方便

```js
// 之前讲过的做法，给对象设置默认值 {}
const person = ({ username = "icoding", age = 0, sex = "male" } = {}) => {
  console.log(username, age, sex);
};

person(); // icoding 0 male // 默认值生效
person({ username: "arry" }); // arry 0 male
```

> 通过以上方式是可以解决用户参数和默认参数问题的。这也是其中一种方式
>
> 还可以采用如下方式：

```js
// userParam 用户参数
const person = (userParam) => {
  // 统一用一个对象的形式来设置 默认参数
  const defaultParam = {
    username: "icoding",
    age: 0,
    sex: "male",
  };

  // 最终的参数，将用户参数和默认参合并
  // 以用户参数为准，用户参数没有再使用默认参数，因此将userParam写到后边
  // const param = { ...defaultParam, ...userParam };
  // console.log(param.username, param.age, param.sex);

  // 使用对象解构赋值，变得更简单
  const { username, age, sex } = { ...defaultParam, ...userParam };
  console.log(username, age, sex);
};

person(); // icoding 0 male 默认值生效
person({ username: "arry" }); // arry 0 male
```

## 四、重难点总结

TIP

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、区分剩余参数与展开运算符

| 分类           | 说明                                                                                                                                                                              |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 剩余参数       | 用作函数的形参，用来接收函数的剩余参数。剩余参数是一个数组，如果没有值为空数数组`[]`                                                                                              |
| 剩余元素       | 用于对象和数组的解构赋值，表示接收数组的剩余元素或对象的剩余属性（不包括原型上的属性）                                                                                            |
| 数组展开运算符 | 在数组、类数组、字符串前添加`...`，可将一个其展开成用逗号分隔的序列。                                                                                                             |
| 对象展开运算符 | 在对象前添加`...`,可以将对象在另一个对象中展开。展开的本质是将对象中的可遍历属性罗列出来，用逗号分隔，放到一个`{}`对象中。 对象展开运算符只能在对象中展开，在其它地方展开会报错。 |

### 2、剩余参数的注意事项

| 注意事项                         | 说明                                                                                                                     |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| 剩余参数的位置                   | 剩余参数必须是最后一个参数                                                                                               |
| 箭头函数中只有一个剩余参数       | 箭头函数中只有一个剩余参数，也不能省略圆括号                                                                             |
| 剩余参数与 arguments             | 箭头函数中没有 arguments，在往后的开发中，我们会利用剩余参数来替代 arguments，因为剩余参数本身就是一个数组，用起来更方便 |
| 函数 length 属性不计算 rest 参数 | 函数的 length 属性用来保存未设置默认值参数的个数，rest 剩余参数不计入其中                                                |

### 3、对象展开运算符的注意事项

| 注意事项                                                       |
| :------------------------------------------------------------- |
| 空对象的展开，没有任何效果                                     |
| 非对象类型展开，会先转换为对象，然后再将其可遍历属性罗列出来   |
| 对象展开属于浅复制（浅拷贝）                                   |
| 合并对象，同名属性会覆盖，覆盖原则为写在后面的覆盖前面的       |
| 扩展运算符的参数对象之中如果有取值函数 get，这个函数将会被执行 |

注：

字符串比较特殊，它即可在对象中展开，也可以在数组织中展开，还可以在直接展开，这点与数组类似。

### 4、应用

TIP

剩余参数、数组的扩展运算符、对象的扩展运算符的应用案例，必需要掌握

## 五、测试题

TIP

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、以下关于剩余参数描述错误的选项是 ？

> 单选

- A、剩余参数本质是一个数组
- B、剩余参数的书写位置是任意的
- C、普通函数可以使用剩余参数获取所有的参数
- D、剩余参数不计入函数的 length 个数

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;">正确答案：B</p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">答案解析： 剩余参数只能是函数的最后一个参数</p></details>

### 2、下面代码中，args 表示剩余参数的选项是 ?

> 两项

A、

```js
const sum = ([a, b, ...args]) => {};
```

B、

```js
const sum = (a, b, [...args]) => {};
```

C、

```js
const sum = ({ a, ...c }, ...args) => {};
```

D、

```js
const sum = ([...args]) => {};
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;">正确答案：C</p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">答案解析： A、B、C 选项中的 args 参于数组解构赋值，args 为剩余元素。</p></details>

### 3、以下代码的输入结果是 ？

```js
const obj1 = {
  x: 1,
  y: 2,
  a: 3,
};
const obj2 = {
  a: 1,
  b: 2,
  c: 3,
};
const obj3 = {
  b: 6,
  y: 5,
  d: 4,
};
const o = { ...obj1, ...obj2, ...obj3 };
console.log(o);
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;">正确答案：<code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;">{x: 1, y: 5, a: 1, b: 6, c: 3,d:4}</code></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">答案解析：对象中相同属性名，写在后面的会覆盖前面的。</p></details>
