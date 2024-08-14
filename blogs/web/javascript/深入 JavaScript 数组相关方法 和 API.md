# 深入 JavaScript 数组相关方法 和 API

本章节

我们来学习数组相关的方法，操作数组的方法非常多，我们先学习 ES5 中的一些方法，等学习到 ES6 之后，再学习 ES6 中新增的相关方法。

数组的操作非常重要，我们后期的项目开发或面试中，对于数组的操作那是家常便饭，所以一定要掌握

> [相关方法也可参考 MDN 文档同步学习(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 一、数组的头尾操作

> 首先我们来学习，如何在数组的头部或尾部添加元素或删除元素的操作

| 实例方法  | 描述                                                   | 是否更改原数组 |
| :-------- | :----------------------------------------------------- | :------------- |
| push()    | 将一个或多个元素添加到数组的末尾，并返回该数组的新长度 | 是             |
| pop()     | 从数组中删除最后一个元素，并返回被删除元素的值         | 是             |
| unshift() | 将一个或多个元素添加到数组的头部，并返回该数组的新长度 | 是             |
| shift()   | 从数组中删除第一个元素，并返回该元素的值               | 是             |

### 1、push()方法



- 向数组的末尾添加**一个**或**多个**元素，每个元素之间用`,`**逗号**隔开
- 并返回数组的**新长度**

```js
var arr = [1, 2, 3];

// 向数组的尾部添加元素4
arr.push(4);
// 向数组的尾部添加5，'我' ,同时用变量len接受数据的新长度
var len = arr.push(5, "我");

console.log(arr);
console.log("数组的长度：" + len); // 数组的长度：6
```

> `push` 方法根据 `length` 属性来决定从哪里开始插入给定的值

### 2、pop() 方法



- 从数组中删除最后一个元素，并返回该元素（被删除元素）的值
- 当数组为空时，返回值为`undefined`

```js
var arr = [12, 23, 56, 11];
var item = arr.pop();

console.log(arr); // 输出删除最后一项后的值 [12, 23, 56]
console.log(item); // 返回被删除元素的值 11
```

> `pop` 方法根据 `length` 属性来确定最后一个元素的位置

### 3、unshift() 方法



- 一个或多个元素添加到数组的**开头**，每个元素之间用`,`逗号隔开
- 并返回该数组的**新长度**

```js
var arr = [12, 23, 56, 11];
arr.unshift(66);
var len = arr.unshift(0);
console.log(len); // 6
console.log(arr); // [0, 66, 12, 23, 56, 11]
```

### 4、shift() 方法



- 从数组中删除第一个元素，并返回该元素的值
- 当数组为空时，返回值为`undefined`

```js
var arr = [12, 23, 56, 11];
var item = arr.shift(); // 删除数组中下标为0的项

console.log(item); // 返回被删除的项 12
console.log(arr); // [23, 56, 11]
```

### 5、案例：筛选数组中所有大于等于 10 的元素

> 筛选数组中所有大于等于 10 的元素

```js
var arr = [1, 3, 68, 33, 5, 9, 34, 55];
function filter(arr) {
  var arr2 = [];
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] >= 10) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
console.log(filter(arr));
```

## 二、数组中元素的（增、删、改、查）

> 如果我们要对数组中非头尾的元素，做相关的增、删、改、查操作，就需要用到下面的这些方法

| 实例方法 | 描述                                                                                                                             | 是否更改原数组 |
| :------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| slice()  | （查询）：提取原数组的一部分并返回一个新数组                                                                                     | 否             |
| splice() | （新增）：在指定位置插入一项或多项新元素 （删除）：在指定位置删除指定项 （更新）：在指定位置删除指定项，同时在此处添加一项或多项 | 是             |

### 1、slice()方法



- 查询原数组中的一部分元素，然后将查询到的元素复制到一个新数组，并将新数组返回
- slice() 方法不会更改原数组
- slice() 中返回的元素是从原数组中**浅拷贝**过来的。

浅拷贝

- 数组中的值如果是基本类型，直接把值拷贝一份过来
- 如果是引用类型，拷贝的是引用类型的地址，当修改 slice()返回数组中的引用类型值时，原数组也会变

**语法：**

```js
slice(start, end);
```

- start 表示查找的开始索引，end 表示查找的结束索引
- start 和 end 可正可负，正数表示从左往右数，下标从 0 开始，负数表示从右往左数，下标从-1 开始
- **查找结果包含 start 部分，不包含 end 部分**
- 如果只有一个参数，如 slice(2)，表示从下标 2 开始，提取后续所有项元素
- 如果参数只一个，并且是负数，如：slice(-2) 表示提取数组最后 2 个元素

### 1.1、两个参数都为正



两个参数都为正，如 `slice(2,3)` 表示从下标 2 开始，提到到下标 3 中间所有元素，不包括下标 3 的元素

```js
var arr = [1, 2, 3, 4, 5, 6];
var arr2 = arr.slice(1, 4); // 从原数组下标 1查找到下标4，将查找到元素作为一新数组返回

console.log(arr); // [1, 2, 3, 4, 5, 6]  并不会改变原数组
console.log(arr2); // [2, 3, 4]
```

### 1.2、只有一个参数，参数为正



如果只有一个参数，如 `slice(2)`表示从下标 2 开始，提取后续所有项元素

```js
var arr = [1, 2, 3, 4, 5, 6];
var arr1 = arr.slice(2); // 从下标2开始，提取后续所有项元素

console.log(arr1); // [3, 4, 5, 6]
```

### 1.3、只有一个参数，参数为负



如果参数只一个，并且是负数，如：`slice(-2)` 表示提取数组最后 2 个元素

```js
var arr = [1, 2, 3, 4, 5, 6];

var arr1 = arr.slice(-2); // 提取最后2个元素
console.log(arr1); // [5, 6]
```

### 1.4、两个参数都为负数



- 如果两个参数都为负数，如：`slice(-3,-2)`表示提取原数组中的倒数第 3 个元素到倒数第二个元素（不包含第二个元素）
- `slice(-2,0)` 查询结果为空数组

```js
var arr = [1, 2, 3, 4, 5, 6];
var arr1 = arr.slice(-3, -2); // 提取倒数第3个元素到倒数第2个元素，不包含倒数第二个元素
var arr2 = arr.slice(-3, 0);

console.log(arr1); // [4]
console.log(arr2); // []
```

### 1.5、slice 提取原数组中数据，是以浅拷贝方式复制过来

```js
var arr = [1, ["A", "B"], 2, 3];
var arr2 = arr.slice(1, 3);
arr2[0][1] = "更"; // 更改arr2中第1项的内容

// 更改arr2中的内容，原数组arr中内容也发生了改变
console.log(arr); // [1, ["A", "更"], 2, 3]
console.log(arr2); // [["A", "更"],2]
```

记忆准则 slice(start,end) ：

- start 和 end 表示查找的起始与结束索引，其值可正可负，正索引是从左往右数，下标从 0 开始，负索引是从右往左数，下标从-1 开始
- 元素查找方向，都是从起始索引往右查找
- 查找的元素，只包含第一个参数索引值，不包含第二个参数索引
- 如果只有一个参数，表示起始位置，从这个位置提取往后所有元素。
- start 的默认值可以理解为 0，end 的默认值可以理解为数组长度-1
- `arr.slice()` 相当于把整个数组浅拷贝一份

### 2、splice()方法



- splice()方法，可以实现对数组中元素的 **删除**，**添加**，**更新**（删除并替换）操作
- 被删除的元素组成一个数组，被返回，如果没有删除元素，则返回空数组

**语法**

```js
splice(index, deleteCount, item1, item2, itemN);
```

index 表示修改的开始位置（下标）

- 如果超过数组长度，表示从数组尾部开始添加内容
- 如果是负值，表示数组尾部开始的第几位（必部第一位表示-1）

deleteCount 表示要移除的数组中元素的个数

> 如果 deleteCount 是 0 或负数，表示不移除元素

- item1,item2...可选，表示要添加进数组的元素，从 index 位置开始

### 2.1、添加元素

```js
var arr = [1, 2, 3, 4, 5];
// 从下标1位置前面插入两个数
var arr1 = arr.splice(1, 0, "A", "B");
console.log(arr); // [1, 'A', 'B', 2, 3, 4, 5]
console.log(arr1); // []
```

### 2.2、更新（删除并替换）元素

```js
var arr = [1, 2, 3, 4, 5];
// 从下标1的位置，删除2个元素（包括下标1的元素），然后再加两个元素
var arr1 = arr.splice(1, 2, "A", "B");
console.log(arr); // [1, 'A', 'B', 4, 5]
console.log(arr1); // [2, 3]
```

### 2.3、删除元素

```js
var arr = [1, 2, 3, 4, 5];
var arr1 = arr.splice(1, 2);
console.log(arr); // [1, 4, 5]
console.log(arr1); // [2, 3]

var arr = [1, 2, 3, 4, 5];
var arr1 = arr.splice(2); // 删除索引2后所有元素，包括索引2位置上元素
console.log(arr); // [1, 2]
console.log(arr1); // [3, 4, 5]
```

### 2.4、index 下标为负数时

- index 为负数，表示从后往前找元素的位置，从后往前，元素下标从-1 开始

```js
var arr = [1, 2, 3, 4, 5];
// 从倒数第三个元素开始，删除 2个元素（包括倒数第三个）
var arr1 = arr.splice(-3, 2);
console.log(arr); // [1, 2, 5]
console.log(arr1); // [3, 4]
```

记忆准则：

- index 表索引，索引可正可负，正表示从左往右数，下标从 0 开始，负表示从右往左数，下标从-1 开始
- deleteCount 表示删除长度，0 和负数不删除，如果不写，表示 index 处删除往后所有元素（包括 index 处元素）
- splice 删除元素，包含 index 索引位置元素

## 三、数组与字符串相互转换

| 实例方法   | 描述                                                                      | 是否更改原数组 |
| :--------- | :------------------------------------------------------------------------ | :------------- |
| join()     | 将一个数组的所有元素以特定的**某种字符**连接成一个字符串 并返回这个字符串 | 不会           |
| toString() | 将数组转换为字符串，然返回该 字符串                                       | 不会           |

> **以下方法为字符串的实例方法**

| 实例方法 | 描述                                             |
| :------- | :----------------------------------------------- |
| split()  | 根据指定的分隔符将一个字符串分割成一个字符串数组 |
| charAt() | 从一个字符串中返回指定的字符 `str.charAt(index)` |

### 1、join()方法



- 将一个数组的所有元素以特定的**某种字符**连接成一个字符串，并返回这个字符串
- 如果不指定连接字符，则默认以`，`逗号来分隔连接
- 这个方法不会改变原数组，会生成一个新的字符串

```js
var arr = ["a", "b", "c", "d"];
var str = arr.join();
console.log(str); // a,b,c,d
console.log(arr); // ['a','b','c','d']

var str2 = arr.join("");
console.log(str2); // abcd
var str3 = arr.join("**");
console.log(str3); // abcd a**b**c**d
```

### 2、toString()方法

- 将数组转成以`,`逗号分隔的字符串，同时返回该字符串

```js
var arr = [1, 2, 3];
var str = arr.toString();
console.log(str);
```

- `toString` 方法在内部调用 `join()`方法拼接数组中的元素并返回一个字符串，其中包含用逗号分隔的每个数组元素

```js
var arr = [1, 2, 3, 4];
var str = arr.toString();
console.log(str);

// 修改原型上join方法
Array.prototype.join = function () {
  var str = "";
  for (var i = 0; i < this.length; i++) {
    str += this[i] + "*";
  }
  return str;
};
// 也可以只修改当前实例的join方法 arr.join=function(){  }
console.log(arr.toString());
```

### 3、split()方法 字符串操作方法



- 数组的`join()`方法可以使数组转为字符串
- 字符串的`split()`方法可以使字符串转为数组

![image-20211220235249527](data:image/png;base64,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)

- `split()`可以使字符串以某种**分隔符**进行分隔，分隔后的字符串组成一个数组返回
- 分隔符为空字符串，则将原字符串中每个字符的数组形式返回

```js
var str = "a*b*c*d";
var arr1 = str.split("");
var arr2 = str.split("*");
console.log(arr1); // ['a', '*', 'b', '*', 'c', '*', 'd']
console.log(arr2); // ['a', 'b', 'c', 'd']

"a-b-c-d-e-f-g-h".split(""); // ['a', '-', 'b', '-', 'c', '-', 'd', '-', 'e', '-', 'f', '-', 'g', '-', 'h']
"a-b-c-d-e-f-g-h".split("-"); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
```

- 回顾之前讲的`rgb(2,33,55)` 颜色的分隔

```js
var rgb = "rgb(2,33,55)";
// \d 表示 0-9之间的任意数字 [^\d] 排除0-9之间的任意数字  +表示前面的字符可以出现任意次
// 只要不是[0-9]之间的单个或多个数字，其它字符都可以做为分隔符来分隔字符串
var rgbArr = rgb.split(/[^\d]+/);
console.log(rgbArr);
```

### 4、实战应用：获取 url 地址中的参数

```js
var url = "https://www.icodingedu.com/goods/show/42?targetId=71&preview=0";
var obj = {};
var str = url.split("?")[1].split("&");
console.log(str); //  ['targetId=71', 'preview=0']
for (let i = 0; i < str.length; i++) {
  var param = str[i].split("=");
  obj[param[0]] = param[1];
}
console.log(obj); // {targetId: '71', preview: '0'}
```

### 5、charAt()方法 字符串操作方法



- **charAt()** 方法从一个字符串中返回指定的字符

```js
str.charAt(index);
```

- 一个介于 0 和字符串长度减 1 之间的整数
- 如果没有提供索引，charAt() 将使用 0
- 字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 str 中）的索引值为 `str.length - 1`

```js
var str = "我爱你!";
console.log(str.charAt(0)); // 我
console.log(str.charAt(1)); // 爱
console.log(str.charAt(2)); // 你
```

### 6、字符串与数组相似点



- 字符串也可以像数组一样，使用下标进行访问
- 也可以用 charAt()方法来访问，charAt()

```js
var str = "我爱你!";
console.log(str[0]); // 我
console.log(str[1]); // 我
console.log(str[2]);
```

- 字符串可以像数组一样，利用 for 循环来遍历

```js
var str = "我爱你!";
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

## 四、判断数组中元素方法

| 实例方法      | 描述                                                                                             | 是否更改原数组 |
| :------------ | :----------------------------------------------------------------------------------------------- | :------------- |
| indexOf()     | 返回在数组中可以找到给定元素的**第一个**索引，如果不存在，则返回 -1。                            | 否             |
| lastIndexOf() | 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1 从指定位置开始逆向查找（即从后往前找） | 否             |
| includes()    | 法用来判断一个数组是否包含一个指定的值， 根据情况，如果包含则返回 `true`，否则返回 `false`       | 否             |

### 1、indexOf() 方法



- 返回在数组中可以找到给定元素的**第一个**索引，如果不存在，则返回 -1。
- 查找时，使用的是（**全等运算**`===`)

**语法**

```js
indexOf(searchElement, fromIndex);
```

- searchElement 要查找的元素

- fromIndex 开始查找的位置（索引）

  > - 如果 `fromIndex的值 >= 数组长度`，意味着不会在数组中查找，返回-1
  > - 如果 fromIndex 是一个负数，如 `indexOf('a',-2);` 表示从倒数第二个元素开始查找，向后查找到数组尾部

```js
["A", "B", "C", "D"]
  .indexOf("D") // 3 返回D的下标为3
  [("A", "B", "C", "D")].indexOf("F") // -1 F不存在返回-1
  [("A", "B", "C", "D", "B", "B")].indexOf("B"); // 1 B存在多次，则返回第一次出现位置的下标

var arr = [2, 9, 1, 1, 5];
arr.indexOf(2); // 0
arr.indexOf(1, 3); // 3
arr.indexOf(1, -3); // 2
arr.indexOf(1, -1); // -1
```

### 2、lastIndexOf()



- 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1
- 内容判断使用的 **全等**
- 从指定位置开始逆向查找（即从后往前找）

**语法**

```js
lastIndexOf(searchElement);
lastIndexOf(searchElement, fromIndex);
```

- searchElement 被查找的元素
- fromIndex 查找的的开始下标，默认值为 arr.length-1,（即从后向前查找整个数组）
- 如果 fromIndex 不写、或大于等于数组长度，则整个数组会被查找
- 如果 fromIndex 为负值，从指定位置向前查找
- 如果 fromIndex 负值的绝对值大于数组长度，则数组不会被查找，返回-1

```js
var arr = [1, 3, 4, 5, 3, 8, 1];
var _index = arr.lastIndexOf(3);
console.log(_index); // 4

var _index = arr.lastIndexOf(1);
console.log(_index); // 6
var arr = [1, 3, 4, 5, 3, 8, 1];
var _index = arr.lastIndexOf(1, -1);
console.log(_index); // 6

var _index = arr.lastIndexOf(1, -2);
console.log(_index); // 0

var _index = arr.lastIndexOf(1, -8);
console.log(_index); // -1
```

### 3、includes() 方法



- 法用来判断一个数组是否包含一个指定的值
- 根据情况，如果包含则返回 `true`，否则返回 `false`
- 查找时，使用的是（**全等运算**`===`)

**语法**

```js
includes(searchElement, fromIndex);
```

- searchElement 需要查找的元素

- fromIndex 表示查找的开始索引。

  > - 如果`fromIndex超过 >= 数组长度`，直接返回 false
  > - 如果 fromIndex 为负数，从负的索引处一直查找到数组的尾部

```js
[11, 22, 33]
  .includes("22") // false
  [(1, 2, 3, 4)].includes(3); // true
[1, 2, 3, 4].includes(2, -2); // false
[1, 2, 3, 4].includes(4, -2); // true
```

### 4、应用案例：数组去重

```js
function unique(arr) {
  // 如果传入的类型不是数组，啥也不做
  if (!Array.isArray(arr)) {
    return;
  }
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    // if(!~result.indexOf(arr[i]))
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}
var arr = [
  1,
  1,
  2,
  2,
  "true",
  "true",
  true,
  true,
  undefined,
  undefined,
  null,
  null,
  [],
  [],
  NaN,
  NaN,
  "NaN",
  {},
  {},
  function () {},
  function () {},
];
console.log(unique(arr));
//这种方式，是没有办法过滤 引用类型的,但针对基本数据类型没有问题
```

### 5、案例：查找元素在数组中所有索引（下标）



- 利用 indexOf 方法，返回查找到的元素索引
- 如果返回索引不为-1，把索引添加到新数组，
- 则继续从当前索引的下一个索引位置开始查找，找到就返回索引继续查找，找不到则停止查找。

```js
/**
 * 找到数组中指定元素的所有索引（下标）
 * @param arr 查找的数组
 * @param element 查找的元素
 */
function findIndexs(arr, element) {
  var indexArr = [];
  var _index = arr.indexOf(element);
  // 返回索引不是-1，则继续查找 _index!=-1
  while (~_index) {
    indexArr.push(_index);
    _index = arr.indexOf(element, _index + 1);
  }
  return indexArr;
}
var arr = ["a", "b", "c", "d", "e", "b", "b", "f", "b"];
console.log(findIndexs(arr, "b"));
```

- 递归方法

```js
function findIndexs(arr, el) {
    var arrIndex = []; // 返回字符下标数组
    var index = 0; // 每次查找索引
    // 立即执行函数
    (function findIndex(arr, el) {
        index = arr.indexOf(el, index);
        if (index !== -1) {
            arrIndex.push(index);
            findIndex(arr, el, ++index;);
        }
    })(arr, el);
    // findIndex(arr, el);
    return arrIndex;
}

var arr = ["a", "b", "a", "c", "c", "b", "c", "a", "a", "d"];
console.log(findIndexs(arr, "a"));
```

## 五、数组拼接与反转

| 实例方法  | 描述                                                                    | 是否更改原数组 |
| :-------- | :---------------------------------------------------------------------- | :------------- |
| concat()  | 方法用于合并两个或多个数组。 此方法不会更改现有数组，而是返回一个新数组 | 否             |
| reverse() | 方法将数组中元素的位置颠倒，并返回该数组 该方法会改变原数组。           | 是             |

### 1、concat()方法



- 法用于合并两个或多个数组
- 此方法不会更改现有数组，而是返回一个新数组
- concat 返回的新数组是元素的**浅拷贝**

```js
var arr1 = [1, 2, 3, 4];
var arr2 = [5, 6, 7, 8];
var arr3 = [9, 10, 11, 12];

var arr = arr1.concat(arr2, arr3);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [5, 6, 7, 8]
console.log(arr3); // [9, 10, 11, 12]
var arr1 = [1, 2, [4, 5]];
var arr2 = ["a", "b", "c"];
var arr3 = arr1.concat(arr2);
console.log(arr3); // [1, 2,  ['改', 5], 'a', 'b', 'c']
arr3[2][0] = "改";
console.log(arr1); // [1, 2, ['改', 5]]
console.log(arr3); // [1, 2,  ['改', 5], 'a', 'b', 'c']
```

### 2、reverse()方法



- reverse()方法可以将一个数组中的全部项顺序反过来显示。
- 他会改变原组。

```js
var arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5,4,3,2,1]
```

- 将字符串进行倒序显示

```js
var str = "清晨我上马";
var arr = str.split("");
arr.reverse();
var str2 = arr.join("");
console.log(str2); // 马上我晨清
```

## 六、筛选数组元素

| 方法     | 描述                                                                                                                                                                                 | 是否更改原数组 |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| filter() | 返回所有通过函数测试成功的元素 其返回值为测试成功的元素组成的新数组                                                                                                                  | 不会           |
| find()   | 返回数组中满足提供的测试函数的第一个元素的值 否则返回 [`undefined` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。 | 不会           |

### 1、filter()方法

> 返回所有通过函数测试成功的元素，其返回值为测试成功的元素组成的新数组

**语法：**

```js
// 回调函数
filter(callbackFn);
filter(callbackFn, thisArg);

// 内联回调函数
filter(function (element) {
  /* … */
});
filter(function (element, index) {
  /* … */
});
filter(function (element, index, array) {
  /* … */
});
filter(function (element, index, array) {
  /* … */
}, thisArg);
```

详细解读

- callbackFn 用来测试数组中每个元素的函数，返回 `true` 表示该元素通过测试，保留该元素，`false` 则不保留
- callbackFn 函数，接受以下三个参数
  - element 数组中当前正在处理的元素
  - index 正在处理的元素在数组中的索引
  - array 调用了 filter()的数组本身
- thisArg 可选，执行 callbackFn 时，用于 this 的值

### 2、找出数组中所有小于 10 的元素

```js
// 筛选出所有小于10的元素
var arr = [1, 22, 5, 12, 45, 9, 10, 33, 8];
var arr2 = arr.filter(function (value) {
  return value < 10;
});
console.log(arr2); //  [1, 5, 9, 8]

// 返回字符串长度>=6的所有元素
var arr = ["iabc", "iconaff", "bef", "afei", "aiconf"];
var arr2 = arr.filter(function (value) {
  return value.length >= 6;
});
console.log(arr2); //  ['iconaff', 'aiconf']
```

### 3、自已封装简单版 filter 方法

```js
// 大于等于10
var arr = [1, 3, 68, 33, 5, 9, 34, 55];
function filter(arr) {
  var arr2 = [];
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] >= 10) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
console.log(filter(arr));

/**
 * 找到数组中所有满足测试函数条件的元素
 * @param arr 查找的数组
 * @param fn 测试函数
 */
function filter(arr, fn) {
  var arr2 = [];
  for (var i = 0; i <= arr.length; i++) {
    // 为真，就添加
    if (fn(arr[i])) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
// 定义数组
var arr = [1, 3, 68, 33, 5, 9, 34, 55];
// 筛选出大于等于10的元素
var arr2 = filter(arr, function (value) {
  return value >= 10;
});
console.log(arr2);
// 筛选出小于等于10的元素
var arr3 = filter(arr, function (value) {
  return value < 10;
});
console.log(arr3);
```

### 4、find() 方法

> 返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`

```js
// 回调函数
find(callbackFn);
find(callbackFn, thisArg);
// 内联回调函数
find(function (element) {
  /* … */
});
find(function (element, index) {
  /* … */
});
find(function (element, index, array) {
  /* … */
});
find(function (element, index, array) {
  /* … */
}, thisArg);
```

详细解读

- callbackFn 用来测试数组中每个元素的函数
- callbackFn 有三个参数
  - element 当前数组中正在遍历到的元素
  - index 当前数组中正在遍历到的索引
  - array 当前调用 find 方法的数组
- 执行回调时用作 `this` 的对象。

```js
// 筛选出小于10的第一个元素
var arr = [1, 22, 5, 12, 45, 9, 10, 33, 8];
var arr2 = arr.find(function (value) {
  return value < 10;
});
console.log(arr2); //  [1]

// 返回数组中第一个长度大于6的元素
var arr = ["iabc", "iconaff", "bef", "afei", "aiconf"];
var arr2 = arr.find(function (value) {
  return value.length >= 6;
});
console.log(arr2); //  iconaff
```

> 可以自己手动封装一个简单版的 find 方法

## 七、数组排序

| 方法   | 描述                     | 是否更改变原数组 |
| :----- | :----------------------- | :--------------- |
| sort() | 用于对数组的元素进行排序 | 是               |

```js
// 无函数
sort();
// 内联比较函数  函数可以是匿名的
sort(function compareFn(a, b) {
  /* … */
});
```

### 1、sort()未指字函数参数



当 sort 中没有给定参数时，数组中的元素会先被转换为字符串，然后比较的时候是按 Unicode 编码来进行排序

**英文字母对应的 Unicode 编码**

- `A~Z` 对应 65~ 90 也就是`A`的`Unicode`编码是`65` 、 `Z` 的`Unicode`编码是 `90`
- `a~z` 对应 97~122
- `0~9` 对应 48~57

```js
var arr = ["A", "Z", "b", 1, 80, 9, 100, 70, "a"];
arr.sort();
console.log(arr); // [1, 100, 70, 80, 9, 'A', 'Z', 'a', 'b']
```

注：

在没有函数做为参数时，这种比较本质上是没有办法做数字数组的排序

### 2、sort()指定函数参数

```js
sort(function compareFn(a, b) {
  return a - b;
});

// sort中的函数，也可以是匿名函数
sort(function (a, b) {
  return a - b;
});
```

- compareFn 用来指定按某种顺序进行排列的函数
- a，b 是用于比较的两个元素
- 函数返回值为`a-b`，则数组按升序排序，即从小到大
- 函数返回值为`b-a`,则数组按降序排序，即从大到小

```js
var arr = [1, 4, 90, 2, 5, 80, 100, 28];
arr.sort(function (a, b) {
  return a - b;
});
console.log(arr); // [1, 2, 4, 5, 28, 80, 90, 100]
```

如何理解：a-b 即升序，b-a 即降序

在之前的数组中我们学过冒泡排序，冒泡排序的原则就是如果相邻的两个数(a,b)比较时

- 如果 a-b 大于 0，交换两者位置，即大的数 a 的放后面，小的 b 放前面，升序
- 如果 b-a 大于 0 ，交换两者位置，即大的数 b 放在前面，小的数 a 放在后面，降序

所以你可以把这里的 a 和 b 当成数组成相邻的两个比较元素

[详细参考 MDN 文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

- 如果 `compareFn(a, b)` 大于 0 ， b 会被排列到 a 之前。
- 如果 `compareFn(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 `compareFn(a, b)` 等于 0 ， a 和 b 的相对位置不变。

### 3、冒泡排序法封装成函数

```js
// 封装冒泡排序
function bubbleSort(arr, fn) {
  // 数组长度
  var len = arr.length;
  // 当前是否是有序的
  var isSorted;
  var flag = 0;
  // 有序的边界
  var sortBorder = len - 1;
  // 外层for控制交换轮数
  for (var i = 0; i < len - 1; i++) {
    // 内层for控制每一轮，元素交换次数处理
    isSorted = true; // 有序标记，每轮开始默认为有序，如果一旦发生交换，就会变成flag=false,无序

    for (var j = 0; j < sortBorder; j++) {
      if (fn(arr[j], arr[j + 1]) > 0) {
        // 交换两元素位置
        var tmp; // 用来交换两个变量的中间变量
        tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        isSorted = false;
        // 把无序列表的边界，更新为最后一次交换元素的位置
        flag = j;
      }
    }
    if (!isSorted) {
      sortBorder = flag;
    }
    // 这一轮多次交换下来，flag没有变为false,说明没有发生元素交换，此时数组已是有序的
    if (isSorted) {
      break; // 退出最外层for循环
    }
  }
}

// 排序数组
var arr = [2, 3, 4, 1, 5, 6, 7, 8, 9, 35, 76];
bubbleSort(arr, function (a, b) {
  return a - b; // 升序
});
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 35, 76]

bubbleSort(arr, function (a, b) {
  return b - a; // 降序
});
console.log(arr); // [76, 35, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

## 八、数组相关方法总结

总结：

- 有哪些可以操作数组的方法 ？
- 这些方法的作用是什么 ？
- 哪些方法会改变原组数，哪些不会 ？
- （经典面试题）

| 实例方法   | 描述                                                                                                                                                                                 | 是否改变原数组 | 返回结果                     |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- | :--------------------------- |
| push()     | 将一个或多个元素添加到数组的末尾，并返回该数组的新长度                                                                                                                               | 会             | 原数组的新长度               |
| pop()      | 从数组中删除最后一个元素，并返回该元素的值                                                                                                                                           | 会             | 返回被删除元素               |
| unshift()  | 将一个或多个元素添加到数组的头部，并返回该数组的新长度                                                                                                                               | 会             | 原数组的新长度               |
| shift()    | 从数组中删除第一个元素，并返回该元素的值                                                                                                                                             | 会             | 被删除元素                   |
| slice()    | （查询）：提取原数组的一部分并返回一个新数组                                                                                                                                         | 不会           | 将查询到元素组成的新数组返回 |
| splice()   | （新增）：在指定位置插入一项或多项新元素 （删除）：在指定位置删除指定项 （更新）：在指定位置删除指定项，同时在此处添加一项或多项                                                     | 会             | 返回被删除元素组成的数组     |
| join()     | 将一个数组的所有元素以特定的**某种字符**连接成一个字符串                                                                                                                             | 不会           | 并返回连接后的字符串         |
| indexOf()  | 返回在数组中可以找到给定元素的**第一个**索引，如果不存在，则返回 -1。                                                                                                                | 不会           | 返回元素索引或-1             |
| includes() | 法用来判断一个数组是否包含一个指定的值， 根据情况，如果包含则返回 `true`，否则返回 `false`                                                                                           | 不会           | 返回值为 true 或 false       |
| concat()   | 方法用于合并两个或多个数组。 此方法不会更改现有数组，而是返回一个新数组                                                                                                              | 不会           | 将合并成的新数组返回         |
| reverse()  | 方法将数组中元素的位置颠倒，并返回该数组 该方法会改变原数组。                                                                                                                        | 会             | 返回置返后的原数组           |
| sort()     | 对数组中的元素进行排序（降序或升序）                                                                                                                                                 | 会             | 返回排序后的原数组           |
| filter     | 返回所有通过函数测试成功的元素 其返回值为测试成功的元素组成的新数组                                                                                                                  | 不会           | 返回符合要求的所有元素       |
| find       | 返回数组中满足提供的测试函数的第一个元素的值 否则返回 [`undefined` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。 | 不会           | 返回符合要求的第一个元素     |
| forEach    | `forEach()`方法对数组的每个元素执行一次给定的函数                                                                                                                                    | 会             | 返回值为`undefined`          |

> 关于操作数组的方法还有很多，我们目前只学习到这些，还有更多的在 ES6 之后再讲

## 九、综合应用案例



结合本章节所学内容进行综合实践应用。

### 1、求数组中每一项的总和、平均数

```js
// 思路：求数组的和，先定义累加器 sum

var socreArr = [99, 96, 95, 89, 86, 88, 67, 53, 69, 36];

// 累加器
var sum = 0;
// 遍历数组，每遍历一个数字，就要把这个数字累加到累加器中
for (var i = 0; i < socreArr.length; i++) {
  sum += socreArr[i];
}

// 数组的总和
console.log(sum); // 778
// 数组的平均数：数组的总和/数组的长度
console.log(sum / socreArr.length); // 77.8
```

### 2、随机样本：请随机从原来数组中取 3 项



随机取样，你不能取完样之后，把原数组中的数组给删除了

> 下面这种方式就是动了原数组

```js
// 数组没有重复项并且不少于三个元素
var arr = [2, 1, 5, 8, 6, 9, 4, 3, 7];

// 结果数组
var result = [];

// 遍历原数组
for (var i = 0; i < 3; i++) {
  // 随机选择一项的下标，数组的下标 0 ~ arr.length - 1;
  // 之前学过一个 random的公式，[a,b] 区间的随机数是 parseInt(Math.random() * arr.length)
  var n = parseInt(Math.random() * arr.length);
  // 把这项推入结果数组
  result.push(arr[n]);
  // 删除这项，防止重复被随机到
  arr.splice(n, 1);
}

console.log(result); // [1, 2, 5] 没运行一次，结果都不一样
```

- 随机取样，不会动原数组

```js
// 不动原数组
function sample(arr, k) {
  if (Array.isArray(arr)) {
    // 取样长度不能超过数组长度  数组长3，取3，则3%3=0, 所以要3%4
    k = k % (arr.length + 1);
    // 用来放取样的数组
    var result = [];
    //
    while (result.length < k) {
      // 生成数组下标的随机数
      var n = (Math.random() * arr.length) >> 0;
      // 判断是否在取出的样本中存在
      if (!result.includes(arr[n])) {
        result.push(arr[n]);
      }
    }
    return result;
  }
}

var arr = [2, 1, 5, 8, 6, 9, 4, 3, 7];
console.log(sample(arr, 3));
```

### 3、随机抽奖



- 在我们做抽奖效果时，我们肯定是需要控制一，二，三等奖的中奖概率。
- 以下是一次活动中，规定的各种奖项的中奖概率（奖项的中奖机会占总数的百分比）

|       |  1 等奖  |  2 等奖  | 3 等奖 | 未中奖   |
| :---: | :------: | :------: | :----: | :------- |
| 概率  |    5%    |   10%    |  20%   | 65%      |
| 奖品  | 平板电脑 | 小米手机 | 电风扇 | 谢谢惠顾 |

解题思路：

- 我们可以设置一个权重数组`[5,10,20,65]`
- 然后把权重数组中的中奖概率加起来，做为生成随机数的最大范围
- 然后把生成的随机数添加到数组的尾部，然后再对数组进行升序排序
- 最后确定生成随机数在权重数组中的下标，来确定对应的中奖项
- 如果下标超过原数组长度-1，则以原数组长度-1 为准。

```js
// 随机抽奖
function randomDrawing(prizeWeight, prizes) {
  // 输入的不是数组，就直接返回
  if (!Array.isArray(prizeWeight) || !Array.isArray(prizes)) return;
  // 两数组长度不一样长，或为空时，直接返回
  if (
    prizeWeight.length == 0 ||
    prizes.length == 0 ||
    prizeWeight.length !== prizes.length
  )
    return;
  // 计算所有权重之和
  var sum = 0;
  for (var i = 0; i < prizeWeight.length; i++) {
    sum += prizeWeight[i];
  }
  // 生成0-权重之和之间的随机数(不用加1，从0开始算的)
  var random = (Math.random() * sum) >> 0;

  // 把生成的随机数合并到原数组中，返回一个新中奖数组
  var newArr = prizeWeight.concat(random);
  // 对中奖数组进行排序
  newArr.sort(function (a, b) {
    return a - b;
  });
  // 找查生成的随机数在中奖数组中的下标
  var prizesIndex = newArr.indexOf(random);

  // 随机数下标不能超过原数组的长度-1,超过就以原数组length-1为准
  randomIndex = Math.min(prizesIndex, prizeWeight.length - 1);
  // 取出对应的奖项
  return prizes[randomIndex];
}
// 奖品的权重数组
var prizeWeight = [5, 10, 20, 65];
// 对应的中奖奖品
var prizesArr = ["平板电脑", "小米手机", "电风扇", "谢谢惠顾"];

// 随机抽奖100次，看对应每种物品中奖概率
var arr = [0, 0, 0, 0];
for (var i = 0; i < 100; i++) {
  var prize = randomDrawing(prizeWeight, prizesArr);
  switch (prize) {
    case "平板电脑":
      arr[0]++;
      break;
    case "小米手机":
      arr[1]++;
      break;
    case "电风扇":
      arr[2]++;
      break;
    default:
      arr[3]++;
  }
}
console.log(arr);
```

### 4、手写 Flatten 方法，实现数组的扁平化 (面试题)

- 方法一

```js
var arr = [1, 2, 3, [4, [5], [6]], 7, 8];
function flatten(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 是数组,递归调用
      newArr = newArr.concat(flatten(arr[i])); // concat返回新的拼接好的数组
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(flatten(arr));
```

- 方法二：forEach+递归

```js
var arr = [1, 2, 3, [4, [5], [6]], 7, 8];
function flatten(arr) {
  var newArr = [];
  arr.forEach(function (el) {
    if (Array.isArray(el)) {
      // 是数组,递归调用
      newArr = newArr.concat(flatten(el)); // concat返回新的拼接好的数组
    } else {
      newArr.push(el);
    }
  });
  return newArr;
}
console.log(flatten(arr));
```

- 方法三
  - 循环遍历数组中的每个元素，如果不是数组，就添加到结果数组中
  - 如果是数组，就遍历数组中的每个元素，然后添加到结果数组中

```js
var arr = [1, 2, 3, [4, [2, 3]], [6], 7, 8];
function flatten(arr) {
  var result = [];
  function fn(arr) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]; // 重点
      if (Array.isArray(arr[i])) {
        fn(item); // 递归
      } else {
        result.push(item);
      }
    }
  }
  fn(arr);
  return result;
}

console.log(flat(arr));
```

## 十、作业

homework

- 掌握本节课学习的所有数组相关的操作方法
- 自己手动封装简单版的以下方法：

> push、pop、shift、unshift、slice、splice、join、indexOf、lastIndexOf、includes、concat、reverse、find

## 十一、总结重难点



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点



课程中讲到的所有数组相关的方法，都必需要掌握

### 2、难点



- 数组去重
- 手动封装 filter、find、forEach 方法
- 手写 flat 方法