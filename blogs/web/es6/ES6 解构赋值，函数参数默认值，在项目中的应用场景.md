---
title: ES6 解构赋值，函数参数默认值，在项目中的应用场景
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 解构赋值，函数参数默认值，在项目中的应用场景

TIP

本节内容我们来学习 ES6 中解构赋值，我们会从以下几个方面来展开全面讲解

- 认知解构赋值
- 两种解构模式
- 数组的解构赋值
- 对象的解构赋值
- 其它数据类型的解构赋值
- 解构赋值在实际开发中的应用场景
- 函数参数的默认值
- 函数参数的默认值与解构赋值结合使用
- 总结 - 解构赋值
- 解构赋值测试题

## 一、认知解构赋值

TIP

**解构赋值**语法是一种 JavaScript 表达式。可以将数组中的值或对象的属性值取出，赋值给其他变量。

> 我们把传统方式的取值赋值和解构赋值的方式来对比，看解构赋值的优点

- 传统方式取值赋值

> 传统方式只能把数组中的值一个一个取出来，然后分别赋值给到对应的变量

```js
// 传统方式，取出数组中的值
const arr = [1, 2, 3];
let a = arr[0];
let b = arr[1];
let c = arr[2];
console.log(a, b, c); // 1,2,3
```

- ES6 中，通过解构赋值来获取数组中元素

> 解构赋值本质是属于 **“模式匹配”** ，只要等号两边的 **结构模式** 相同，左边的变量就会被赋予对应的值。

```js
const arr = [1, 2, 3];
let [a, b, c] = arr; // 解构赋值  let [a,b,c]=[1,2,3]
console.log(a, b, c); // 1,2,3
```

> **解构的目的**：是为了简化提取数据的过程，增强代码的可读性。 把变量放在`[]`或者 `{}`中来获取目标对象上的对应的值。

## 二、两种解构模式

TIP

对于对象和数组的解构，有两种解构模式：绑定模式和赋值模式，他们的语法略有不同。

### 1、绑定模式

TIP

在绑定模式中，模式以声明关键字（`var`、`let` 或 `const`）开始。然后按照相应的**模式匹配**，只要等号两边的模式相同，左边的变量就会被赋予对应的值

```js
// 数组解构赋值，左边相当于声明了两个变量a和c 用来接受右边对应结构位置上的值
const [a, , c] = [1, 2, 3];
console.log(a, c);

// 对象解构赋值的内部机制是：先找对象中与变量名同名的属性名，然后再将对象对应的属性值赋值给到对应变量。
// 以下代码等号左边的x,y为对象属性名， _x 和 _z 才是新声明的变量，
const { x: _x, y: _y } = { x: 1, y: 2 };
console.log(_x, _y);
```

在绑定模式中，所有变量共享相同的声明，如果希望两个变量分别用 let 和 const 声明，则需要解构两次

```js
var arr = [1, 2, 3];
let [a] = arr;
console.log(a); // 1

const [, , c] = arr;
console.log(c); // 3
```

### 2、赋值模式

TIP

在赋值模式中，模式不以关键字开头，赋值语句中的变量已提前声明好了。然后按照相应的**模式匹配**，只要只要等号两边的模式相同，左边的变量就会被赋予对应的值。

注：

- 1、赋值模式中，当对对象解构赋值时，必需用`(....)`赋值语句包裹起来。否则 JS 引擎会把`{ }`理解成一个代码块，从而发生语法错误。
- 2、如果`(赋值语句)`前面的代码没有以`;`分号结尾，有可能会造成它被当前前一行的函数执行

```js
// 数组解构赋值
let a,b;
[a,b]=[1,2,3];
console.log(a,b); // 1 2

// 对象解构赋值  ，记得一定要用()将赋值语句包裹起来，否则会报错
let _x, _y;
({ x: _x, y: _y } = { x: 1, y: 2 });
console.log(_x, _y);

// 以下这种情况，如果省略括号前; 相当于执行 x(x:_x)这个函数，所以一定要在()前加上;号
let x
;(x:_x)={x:1,y:2}
```

## 三、数组的解构赋值

TIP

数组的解构赋值是，通过新建一个数组，数组内的变量和目标数组是一一对应的，按照索引的方式去获取值，然后赋值给指定索引上的变量。

### 1、模式（结构）匹配

TIP

数组解构赋值首先要遵顺 **“模式匹配”**，即 等号的左边是数组，右边只要是可迭代对象都可以，但不能是其它值

**可迭代对象有：**

- 数组
- 类数组（arguments、NodeList）
- Set
- Map
- ... 等

```js
let [] = [1, 2, 3]; // 左右两边都必需为数组类型，不过也有特殊的情况，后面会讲到

// 以下情况，模式匹配失败，则会抛出错误
let [] = 1; // 报错
let [] = {}; // 报错
```

数组解构赋值 `=` 等号右边只要是可迭代对象就行。

> 以下内容没讲，后面会讲，有基础的当复习

```js
// Set为可迭代对象
const [a, b, c] = new Set([1, 2, 3]);
console.log(a, b, c);

// Map为可跌迭对象
const [x, y] = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log(x); // ['a', 1]
console.log(y); // ['b', 2]

// arguments类数组对象
function f() {
  let [a, b, c] = arguments;
  console.log(a, b, c);
}
f(1, 2, 3); // 1 2 3

// 对象为非迭代对象，但给对象添加了迭代器后，就变成了可迭代对象，就可以用数组方式解构赋值
const obj = {
  a: "one",
  b: "two",
  c: "three",
};

// 给对象添加跌迭器
Object.prototype[Symbol.iterator] = function* () {
  for (var key in this) {
    yield this[key];
  }
};

const [x, y, z] = obj;
console.log(x, y, z); // one two three
```

### 2、索引值相同完成赋值

- 等号右边数组中的索引值和左边数组中的常量或变量一一对应就能完成赋值

```js
// 数组解构赋值遵守模式匹配，即：等号两边的模式相同。
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

let [a1, b1] = [1, 2, 3, 4, 5];
console.log(a1, b1); // 1,2

let [x, , y] = [1, 2, 3];
console.log(x, y); // 1 3

let [m, n, [l]] = [1, 2, [4, 5]];
console.log(m, n, l); // 1 2 4

let [i, [j], k] = ["A", ["a", "b"], "B"];
console.log(i, j, k); //A a B
```

- 如果不取值的，可以直接用逗号跳过

```js
// 数组解构赋值遵守模式匹配，即：等号两边的模式相同。
// 如果不取值的，可以直接用逗号跳过
const [, , a] = [1, [2, 3, 5], 6];
console.log(a); // 6

const [a, [, , b], c] = [1, [2, 3, 5], 6];
console.log(a, b, c); // 1 5 6
```

- 如果解构不成功，则默认值为 undefined

```js
let [a, b, c] = [1, 2];
console.log(a, b, c); // 1 2 undefined
// 上面的变量c没有取到值，则其默认值为undefined
```

### 3、数组解构的默认值

TIP

深入浅出数组解构赋值默认值的基本用法，默认值的生效条件，默认值为表达式的特殊性

### 3.1、默认值的基本用法

TIP

数组解构时，如果变量的取值为 undefined 时，我们想为变量采用其它值，则就可以为变量指定默认值。

```js
// 对空数组 [] 解构赋值
let [a, b] = [];
console.log(a, b); // undefined undefined

// 变量x的默认值=1，y的默认值=2
let [x = 1, y = 2] = [];
console.log(x, y); // 1,2

// 变量x的默认值=1，y的默认值=3
let [x = 1, y = 3] = [8, undefined];
console.log(x, y); // 8 3
```

注：

当解构赋值时，变量对应的值`严格等于=== undefind`时，其默认值才会生效

### 3.2、默认值为表达式

TIP

如果默认值是一个表达式，那这个表达式是**惰性求值**的。也就是变量的取值不为 undefined 时，表达式才会执行求值，否则不会执行。

```js
const fn = () => 3;
let [x = fn()] = [1];
console.log(x); // 1
// 因为x能解构成功得到值1，所以fn()函数根本就不会执行
const fn = () => 3;
let [x = fn()] = [];
console.log(x); //   3
// 因为x没有取到值，所fn()函数被执行了
```

### 3.3、默认值引用解构值的其他变量

TIP

默认值可以引用解构值的其他变量，但该变量必需要已经声明

```js
let [a = 1, b = a] = [];
console.log(a, b); // 1 1
let [x = 1, y = x] = [2];
console.log(x, y); // 2 2

let [m = 1, n = m] = [2, 3];
console.log(n, m); // 2  3

let [i = j, j = 2] = []; // 报错 ,因为当i用到j时,j还没有被声明
```

## 四、对象的解构赋值

TIP

深入浅出对象解构赋值的原理，默认值， 注意事项，在实际开发中的应用。

对象的解构赋值等号两边必需同为**对象类型**，同时对象中的属性没有次序，所以不能像数组那样通过位置来决定变量的取值。要取到对象属性中的值，变量名必需与属性名同名。

### 1、模式（结构）匹配

TIP

等号两边必需同为对象类型

```js
let {} = {};
// 或
let {} = [1, 3, 3];
// 或
let {} = new String("hello");
```

注：

很多人看到上面的代码可能会有点蒙圈，左右两边的模式在表面看来完全不匹配，但实际不是这样的。

> 后面我们再来给大家讲解上面这种形式是如何解构的,同时=号两边模式是如何完全匹配的。

### 2、属性名相同完成赋值

TIP

对象解构赋值的内部机制是：先找对象中与变量名同名的属性名，然后再将对象对应的属性值赋值给到变量。

如果找不到同名的属性名，则变量名的默认值为 undefined

```js
let { myname: _name, age: _age, sex: _sex } = { myname: "icoding", age: 3 };
console.log(_name, _age); // icoding 3 undefined
// 注意，上面并没有声明变量 name 和 age
```

- 如果变量名与属性名同名，可以采用简写形式

```js
// 简写形式
let { myname, age } = { myname: "icoding", age: 3 };
console.log(myname, age); // icoding 3

// 上面代码，等价于下面代码
let { myname: myname, age: age } = { myname: "icoding", age: 3 };
console.log(myname, age); // icoding 3
```

### 3、区分模式与变量

TIP

在对象解构赋值时，我们是通过对象的属性名来完成解构赋值的，所以对象的属性名我们可以看成是**匹配模式**的一部分。

> 用来接受对象属性值的才是新声明的**变量**。

```js
// a,b是模式,匹配的是对象的属性  _a,_b是变量,用来接受属性的值
var { a: _a, b: _b } = { a: 1, b: 2 };
console.log(_a); // 1
console.log(_b); // 2
console.log(a); // a is not defined
console.log(b); // b is not defined

//  第一个foo是变量 第二个foo是匹配模式  第一个start是变量
let {
  foo,
  foo: { start },
} = { foo: { start: 33 } };
console.log(foo, start); // {start: 33} 33
```

> 我们来看下面代码中，那些是匹配模式，那些是变量

```js
const obj = {
  arr: ["1", ["一", "二", "三"], { name: "icoding", age: 23 }],
};

let {
  arr: [a, , { name, age: _age, sex }],
} = obj;

// a  name  _age  sex是变量
// arr age 是匹配模式

console.log(a, name, _age, sex); // 1 icoding 23 undefined
const obj = {
  foo: {
    bar: {
      start: {
        number: 1,
      },
    },
  },
};

var {
  foo,
  foo: { bar },
  foo: {
    bar: {
      start: { number },
    },
  },
} = obj;
// 第一个foo，第一个bar ,number是变量，其它的都是匹配

console.log(foo);
console.log(bar);
console.log(number);
```

![image-20230105003046631](https://www.arryblog.com/assets/img/image-20230105003046631.6a57c901.png)

### 4、复杂结构的嵌套取值

TIP

取出如下结构中 z 属性值 和 z 中的 b 属性值 及 y 属性中的第 3 个值

```js
const obj = {
  x: 1,
  y: [2, 3, 4],
  z: { a: 5, b: 6 },
};

// 对象解构赋值
const {
  z,
  z: { b },
  y: [, , c],
} = obj;

console.log(z); // {a: 5, b: 6}
console.log(b); // 6
console.log(c); // 4
```

### 5、对象解构的默认值

TIP

对象解构时，如果变量的取值为 undefined 时，我们想为变量采用其它值，则就可以为变量指定默认值。

```js
let { a: _a = 0, b: _b = 0 } = { a: 1, b: 2 };
console.log(_a, _b); // 1 2

let { x: _x = 0, y: _y = 0 } = { x: 3 };
// _x 和 _y 解构取值为undefined，则会采用默认值
console.log(_x, _y); // 3 0
```

> 当解构赋值时，变量对应的值`严格等于=== undefind`时，其默认值才会生效

- 解构赋值的简写形式（为变量指定默认值）

```js
let { a = "A", b = "B", c = "C" } = { a: 2, b: 3 };
console.log(a, b, c);

//   上面代码等价于;
let { a: a = "A", b: b = "B", c: c = "C" } = { a: 2, b: 3 };
console.log(a, b, c);
```

### 6、默认值为表达式

TIP

如果默认值为表达式，那这个表达式惰性求值

```js
const fn = () => 3;
let { a = fn() } = { a: 1 };
console.log(a); // 1   a能成功赋值,所以fn()函数不会被执行

let { b = fn() } = {};
console.log(b); // 执行  3
// b求值不成功,则采用默认值,即fn()函数执行
```

### 7、解构原型链上属性

```js
// 对{}空对象进行解构赋值
const { x } = {};
console.log(x); // undefined 是取不到值的

const { valueOf, toString } = {};
console.log(valueOf); // ƒ valueOf() { [native code] }
console.log(toString); // ƒ toString() { [native code] }
```

在之前的对象解构赋值的模式匹配时，我们说等号的左右两边只要都是对象类型就可以。

> 接下来我们看下面这几种情况，他们是如何完成解构赋值。

```js
// 先找与变量名同名的属性，然后再给变量赋值
let { name, age } = { name: "icoding", age: 3 };
console.log(name, age);

// 数组本质也是一个对象，他身上有length属性，原型上有push属性（方法）等
let { length, push } = [1, 3, 3];
console.log(length, push);

// new String('hello') 得到一个包装对象，结果如下图
let { 0: x, 1: y, at } = new String("hello");
console.log(x, y, at); // h e ƒ at() { [native code] }
```

![image-20230105151123292](https://www.arryblog.com/assets/img/image-20230105151123292.5f8bc254.png)

## 五、其它数据类型解构赋值

TIP

深入浅出字符串的解构赋值，数值和布尔值的解构赋值，undefined 和 null 的解构赋值

### 1、字符串的解构赋值

TIP

字符串的解构赋值有两种形式：既可以按照对象形式解构赋值，也可以按照数组的形式解构赋值

**数组的形式解构赋值**

```js
// 把字符串icoding当做一个数组，[i,c,o,d,i,n,g]
const [x, y, , , , , z] = "icoding";
console.log(x, y, z); // i c g
```

**对象形式的解构赋值**

```js
// 解构赋值时，对象的属性名为数组的索引值（下标）
// 0 -> i , 1 -> c ...  length 表示数组的长度
const { 0: x, 1: y, length } = "icoding";
console.log(x, y, length); // i c 7
```

> 上面的`"icoding"`包装成对象后，再用对象形式解构赋值。"icoding"包装成对象如下

```js
var str = new String("icoding");
console.log(str);
```

![image-20230105152856289](https://www.arryblog.com/assets/img/image-20230105152856289.cb7e44fd.png)

### 2、数值和布尔值的解构赋值

TIP

用对象模式解构赋值时，如果等号右边是数值或布尔值，是会先转为对象，再用参于对象的解构赋值

```js
let { x = 2, toFixed } = 124;
console.log(x); // 2
console.log(toFixed); // ƒ toFixed() { [native code] }

// 上面代码  let { x = 2, toFixed } = 124   等价于下面代码
let { x = 2, toFixed } = new Number(124);
// new Number(124) 对象如下图
```

![image-20230105161109013](https://www.arryblog.com/assets/img/image-20230105161109013.1918afe3.png)

### 3、undefined 和 null 的解构赋值

TIP

由于 undefined 和 null 没有对应的包装对象，所以无法通过它们转换成相应的对象。

> 因此，对它们进行解构赋值，都会报错。

```js
const { toString } = undefined; // 报错，undefined的原型上没有toString方法
const { toString } = undefined; // 报错
```

![image-20221014015241742](data:image/png;base64,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//PuqMg7wi0FgiAIgiBwZ8c1c7hlQAbPN9+MAxgbbimkx2zptv/g23BLgSAIgiAInoZGEARBEARBxME9iwiCIAiCIIgouGdx1PHdd9+FWwQEQRAEQYYN6CyORr6w28ItAoIgCIIgwwN0FkcpcXFx4RYBQRAEQZBhwPDeszgsjnKHUchh0T4IgiAIggxlhreziCAIgiAIggQV9zL05UuXbDYr/ddiscTGxkZERHj48n33xccrlYHcvqur63pvLwBMiImJj48PpCgEQRAEQRBEcgbsWeyyWMaNjyLXn3Z1RdwVEfnDH4p9s8tivu++wbt37545feb0aU5iWnr67LT0QZc5kjCbTFar9datm729vTExMePGjVcoFAkqVbjlQhAEQRBkdME94PL4E0+QC6OhddbDD98nHu37f7//3eBu2d/f/2ptDQkoyhgmZkIMAPRe73XY7WdOn25vb19eUCCTMYMrfATQ0XG1zWC8evUKTfm0q4tcTJo0OVmrSUycFCbREARBEAQZdYThNPT/NDQQT3H69BlPLlxI0z/t6jpQt/96b++Burq1zxWHXrChQHNT49kPPiDXUVFRKTNnjh8fdfPm5+c//PDzzz+/evXK1atXZj38cFZ2TrAlefv4yQ/Ont/12990XOus3ffGrt/+Jth3RBAEQRBkCOLdWbx48YKckXsIMfrFlSvtV66005IBgPqL98XHryxaRYKOZ06fTkuXZj3aYGgzmS35yxYHXtS333772n/v46cr5Ir5CxYEXn7D0SOXL10i16Q1AODTri6NVqfR6l6trSEhxrMffHD79u28RRLUiPLqa/vf/+Ac/ffFnduemJf7xLxcfrZJ96tnpaZIeGsEQRAEQYYy3p1Fh93x1ptvTp8+Izs31/N5F1/48OxZAJidlu5w2D+6eJHjL06IiZmZOuvdM6evXGmXylmUkLFjx86cmXqw/gAn/d+fWRl44R+eO0c9xZjY2KeeevovH3/8l48/vnKlffLkpAenTn3qqadrav7Q29MDAJcvXZo48UczU1MDvy/lySfm8r1DBEEQBEFGOb4uQ1+8eKG9/a8L8vImT04K5H69vb0AkJSUNCEmBgD4/uL0GdPfPXOarFMHTnOLvrFJDwDnWw0F+Uu12mST2bKn6mXyaU52ZtacTACoqt6r0yQ3NZ+y2qwAUL55IyMX3jSZ9MADycmatjYjTflpRsaYMRK8gejDc+7AXnR09Pe+//2PPrrYee0aAFy50v7Nt988OHVqdHQ0cRZJfmmdRQ5vHz95y2pbuaKQpuys3H3lasf7H5yr2ff6izu3KRTyt4+ffOvtEwAweVLi+rJSkufh1JSafa/TFARBEARBhjV+7Fns7++vr6ubmZqakzt3cDfr7+/v7+8HAOIpLliYBzx/kR5t+bSrK/C176w5mXJGTpeh7Tb7nqqXqS9YUlomZ+RabTIA1NUfIukGQ9uel/a+sPmXYmU+Ovuxa9c6vvzySyLto4/NDlBIAOjr67OzfoIv8p5IALj5+U2aQq5JOsFut/X19UVGRkKoWF9Wyl6GPnvu/Adnz79W+woA7Kzc/fbxkyQwWbPvdZKIIAiCIMgIwI+QWERExOy09EF7iqQEcuFw2MnFgoV5P5k+HQAuXrzw1ptvAuvkL3EopaXVaMzJzqRRw4L8pSazhVzTdOI72m12sUJkMuaRRx8j1xmZmZIIFhkZyX5nkNVqBYDZ6Wk0hVyTdGdKWrq0nuJbb59YUbR6RdHq53/xK1/yf3DufNEzT5Hr+Y/nXu3oJNdPPjF4C0EQBEEQZKjha2QxPj5+QV5e4G+0iY+P7+rqunjhIt2SyIkv/h+ZDABkDBP4/kg+NptDlTDgLeJWmzOeJ2fkA9LtdrGVaADQpaRcvXplzJgxU6dNk0o2jVb710/+8vnnnwNAe/tf24yGZI1WqVRevHBx+ozpMhnTZjS0t/+VZI6KitJotVLdmuDvnsVbt6w7KtyvT5o8KZFcjFMopBUMQRAEQZAw4t1ZjIiIeHLhwunTZ0hyv0mTk7q6uj48d5ZuWwSABQvzZDLm3TOnib8IAJMnT5bkdhzkcpmNtdoLAAq5nJ/NarMqGC9ucVp6+pg7pPyxxMjIyCXL8g8frCf+4tvHjtmstikPPpiWnt7z2WeG863vv/8eyRkVFbVkWX4oF6AFGTdOUfTMU4n3q8MrBoIgCIIgQcW7u5M6a5ZUniIpLT4+nryXm75DBwDS0tPp0ZkJMTGBLHbzoeFDnUbT2KSnS8x19YfIojMANDWfIhfNLXq1WuUhrEi4994fT/zRjyQUElxe4KRJTkf5/fffe+Xl6l9t3PDKy9XUU5w0afKSZflRUVHS3tp3brmWwiclqo+9czJcYiAIgiAIEhrC8FLuBXl5r9bWOuz2+ro6mYyRMTIAcNgdZCOjjGEWLsyT8HZabXJd/aGS0jJyGrqkeM0LW7aRjwryl9JVaZ1uRklpGQAo5AoPp1uCTVRU1PLCQvIjLna77auvvrp9+/Y999xz9913M4w87D/f8nBqyo6K37319gnyIsZb1v0rilaTj1Y98zS+fxFBEARBRh53fNF3m1xdvnTpQptRmZBA/j39xz9Onz7DQ4Dt8qVLjz8xP16pFMvggf7+/jOn/8h+WQxhZmpqWvpPfd+t2HHNnHh/wiAE4EBenUOjjNIilZBS3fq77777wm6Li4sLi0gIgiAIggwvBkQWx42P+vLLPnIdO3HiN99+Q//lE68cvAMUERGRkzs3ddYsh91hsVgAICY2JiYmZjT/JDSCIAiCIMgQxO0sTnvooWkPPRTKe8tkjEzGSPVDggiCIAiCIIjkuJehkVECLkMjCIIgCOI7Ur78BUEQBEEQBBlhhOE0NDIU6O7uDrcICIIgCIIMA3AZetTx3XffhVsEBEEQBEGGDRhZHHWMGYN7DxAEQRAE8ZU7O66Zwy0DgiAIgiAIMkS5U/OD74VbBgRBEARBEGSIcse/HI5wy4AgCIIgCIIMUXD7GoIgCIIgCCIKOosIgiAIgiCIKOgsIgiCIAiCIKKgs4ggCIIgCIKIwn3P4jdf3e5+de/txsbv3e7/5p6Iu3Ny4lY+e+fd94RFOARBEARBECS8DDgN3dtywvbbyugIhp3jRr9d/ouymDlzQy4bgiAIgiAIEmbcy9Df/uMf9srdHE8RAKIjGHvl7m/+8VVoBZMWA8gKoSfcUiDSUiGDhhvhFgIJAGNluDvmDVghgxVHB19Az1GQycAYsAwyGci82vMNWCGDCkMgN3PiU98REozUN/B+13MUZJUD/w2wGX1HIqWHePAZaipDRhluZ/Gz+gNRd0YCgOyNmojcLACIyM2Svf4HAIi6M7Knvt5DKVX79n12/brIhzdgBWsUGGoG11Do0+Bb4eqB9E+acY3Vt2WBjV+SQ4aYEAkWSm9+oEFKiI+2NEKQohknxgVUbIVgfwztzDCWXwU/aSiDJD04HOBwQF60x6zRkBTo3fzAD8ECJvBmDBBj5dAafgdHKFWGjDLcexb/cerMvwEAQP/hN+/ZuO7Oh6ZG5Gbd3lZBP4WiVR4KevG//mtBdvbDWm0QhQ0j6xywDqDnKCR1g6NM4sJPOUAjcZGBYqyEjK1DUTAEITQUAujBEeCAEw2vhftXCSzHQTmU5s8UQcFiF4FjUTikkZCAlT5kG2HEqgwJP+7I4vduf00u+k82/7OxJSI365+NLf0nmzmfivHtt98ePXHijYYGX+/ccxRWHHXHBtixBHfAoNKdmR/lYgdy2NfGygEhQBp+P1c5IIWUWXQctmf6tgbEo6GQNRm9AStcJVTIwGjgVoHk5ycKIliCsRIqDAItxm8uuAErCsF4VCAuSBrHa+Tm3a1Q2yHgKQrEcgwgq3RXjbZhhQwahATgS1shA1kmwHFI8rlxSAnbWYmCbcu2BCJYQyHIEuEYQAZJd4WgiDVyasGOgnMi4pxaiNmSsImKacfAlVaMhkJoMLhi0jSKJlIsu++wteOriQoVK9iMPUcHhPQG9A4RYheBYz/Esu8upB12AJ6WaTkuUKCYLYl1KJLCjgc3FLrtVsyWBihICw7f5lTCli+D7QBFiT5ZPpBZK8s/FjYwkS4JPvcdMcHEhmvBni7YJak1JnFCDz42I6uPeO7pYggo3QAyGWRshWOrBOyBj2AjDFgj8qhH4VFlOKoMGV24ncV/jRtPLiJys+7KmfPPxpa7cuaQ9Wj2p5658PHHv37xxe7//V+fbn5sFYAeHA44tQmqXSZbIYP2GmcgncbwYhe5UhyQtMqTr9NzFDIuQ7sDHA6onQcb9K5o/HE4EQcOB7TXQNF+d5kkz+Di9nnFcOwdl7fxHhzb5C4ho8opw4atzp5vrARLsfNGp2DAeJQhtNqb8Z4zMy0BALZnwmzHgBarkDnb0OGA2susEo5DNYDDAY4OAI8tJsANaAeIE2qNdS4ttNe4VQZb4cTjA9qWUPQOtA8UQFDadQ5w6AHmOVvMc+CWXcIGV6Jw296AapclUOXm7QdHB8wHOEXSWZ7KsVUAlQK1EJSBY6J+2xJfOzdghctmHB1woszLQmpRJqwlzQhQR22JV2zPUUh6x1WsHooS3Zbgh4nyihVsxthFsOE4nLvhbPwTx2Gtn/EMYe3cgBWJMLfD3f2JYOv0Ttec/WT1YEv8DqUpc2qN27arnALQnKKjis+IWr4DNgDUdni3fP8Q6pK+9x0xwdY5nAriwO/pgsWyrbG9ZlD10rofBLWXXaoX6uliCChd6xxR57s69TqP4WrBRjDud6//DlKPI1VlyAjB7Szek5NNLiKWLLy9raJv687b2yoilizkfOqVsWPHjh071re8m5zdcmIcHOsGAAADbJ8H2/nPGNaEcjtAt88hwPZu15Wr2Ng4gMsSbWnSQi04n47n3oHaQvcntZVOL2T2JrB0AwC8u9UddsrYyhKMPhod8Bqr4rS0dazhb36Nc/KtKYPXFgHcgPZ5UOAa2uHeFroAAAUtSURBVFIfdzUjAIDrUR0Nr7Gm7GSs9DKD74ZjIp/QqWfSKta9RNrW2QjRkERU5lFanzDAdlYJFOG2jYak45Dke8DY5evHLvI43IuZqJ9wtNPzHhyj8bBEOHYcPvP49Q16pxJTHx9gS5xiP+uGDcUuh1gLG1h9xy8TFbQlPgU1cOI9AICe9wBqJNrD0D1gGjZ7k0swrcuxTvQpWC7YoQShbauc52wZDu3+2m3glu8v/C7pV9/xE25PFyn23DssaxwcrABe0XGXdvzt6UFgYhxszwxsO/5IVRkyQnDvWRz/RO7fjp2IdNgdTzmjzf0nm8kydJ+MiXsi15fi/q9Ol5frLed8//cyV2TCBr3Ts6yQecoZ+wjMXwVJJM+moO/VSH0ckvZDXiGcANjuLdgwbLYAxsF8gO4boBlYo56jUATQ7oBY1/bNoYNg25Kdpg2FIDvutp8hy/yaAbOFsBCgicY+ApAIxkXQ/Q7MDc0+vGh4zQHGSqg+GsTWC/GoEmKCNC4Fo9iGMoAaZ/s3FILFlR72nu7cF2gAmQxgHrTvD66DNYxUhowU3JHFsRF3Mc///KtxXI/nq3HRzPM/HxNxl+eCYqKifrZ8uZCnGA1JAO+6lrTqVkGSB2dRCxuOs5bVCDegHUAZBwDQc3TA1g0y++k5CkWuDUz+LgfETRvkzIwQuwg2bIWK/ZAkOP26AdVbYbYWAEA5DzIkf3xGQxKruepWwYZHvHzDpz2L0bB2ExTxVkI/6waY5qxm3SD2r3iQNg7me4ul0WznXNsBqSV4btu8/dBew9IyazLtHTLFvwEbaH0FTZRIJ2RLfBMVJDYOjq0aTGikbhXMFVf6xDjYXuXel7l9HqRyOvigTVSwGaNh7SZ4txKKpg32MCa/2DiYv5W14LhVoL7dlwfm98WW/CHQRUb/+6nv+Ghgg+s7g0aw2LhpsP09AAAwDHIDnOW46/FhEKgvt6f7g3t1KxC04HDABq/mxx9VBBnaKiOPEnx52ahhwM/9yaY/eG/tHliz9uv7H/iaifr6/gdgzdp7a/fIpj/ouZSJEyasW7PmgcRE4Y/XdUC7K77dXuNtRwgrszOqT3yXRJDJIKnbvd0kr9i5JTmpG05tciZqCllf92HPuKYQwLWveXB2P3sTbHc9binOXcaJMNd1TCRvP2zYKrwLW3DPoo/41ba+oymDU9Ncq6IuwTSFMN9VBeWg9q+IShsNaze52sGDyqJhe42zbS3FLEsQbFvW1oWkdwYsHBe4CvH8jhWyCS9JBrJEWKsXrgVbWr4tCZqoMFpop1L5YLd0wQg87p+LXeTWY9IqOMUKePhlooIINqPmEdi+NSBniFtsNLymd0ubROo78J1TJx5nhRV9tCXXngp6LMnDsQZ/RxU+QeqnfhiYX31HENLmrBNIHuacgsVqylyJVdCuF/+yOAU1LsuvglpaX/GezkdM6WTaL/N6wEWkEdxHQ2QAek/xObFRRYARoTJkpDDgF1xGAsZKqI5zPTlcW+OD+sYpYyVkwIB4Q4UMlEG+KTKaaSgES3FADkcQTdQAssyRtp4V+lEFQRBkKDHGe5bhxYAFqW44JnKqVzJuQPXWAUdbEGQ001DlPoY1Ygj1qIIgCDK0GHHOYl6leylQlin8skCpqGCviyHI6IbsYSqaFv5jOpITylEFQRBk6DHilqERBEEQBEEQ6RhxkUUEQRAEQRBEOka+s7jiP3/hNUXwIw/ZfM/puRCpviL2RU6K7xVn/3nOGaCEgZeJIAiCIEhQ+f/J0SFsfidkCgAAAABJRU5ErkJggg==)

## 六、解构赋值在实际开发中的应用场景

TIP

通过学习我们知道，解构赋值可以利用非常简洁的语法来获取对应的值。

> 但还有一些开发中的应用场景还需要了解，以备开发中使用。

### 1、交换变量的值

```js
let a = 2;
let b = 3;
let c = 4;
[a, b, c] = [b, c, a]; // a、b、c 已经声明了，这里就不用再添加 let 等关键字声明了
console.log(a, b, c); // 3 4 2
```

解构赋值实现变量交换的本质是：

`[a, b, c] = [b, c, a]` 先把`=`号右边的变量值取到，即`[a, b, c] = [3,4,2]`，然后再解构赋值给到左边对应的变量。

### 2、从函数返回多个值

TIP

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回，可以使用解构赋值，非常方便的取出这些值。

**返回一个数组**

```js
const foo = () => [5, 6, 7];
let [x, y, z] = foo(); // 函数返回结果一个数组，对该数组进行解构，获取里面的每个值
console.log(x, y, z); // 5 6 7
```

**返回一个对象**

```js
const fun = () => ({
  foo: 2,
  bar: 3,
});

let { foo, bar } = fun(); // 函数返回结果一个对象，对该对象进行解构，获取里面的每个值
console.log(foo, bar); // 2 3
```

### 3、函数参数的解构

TIP

可以方便地将一组参数与变量名对应起来

- 如果传入函数的参数是数组时，可以对参数进行解构，获取数组中每一项的值

```js
function f([a, b, c]) {
  // 相当于  let  [a, b, c]=[5, 6, 7]
  console.log(a, b, c);
}
f([5, 6, 7]); // 5 6 7
```

- 传入函数的参数是对象时，可以对参数进行解构，获取对象中对应的属性值

```js
function f({ a, b, c }) {
  // 相当于 { a, b, c }={ c: 5, a: 6, b: 7 }
  console.log(a, b, c); // 6 7 5
}
f({ c: 5, a: 6, b: 7 });
```

## 七、函数参数的默认值

TIP

认识函数参数的默认值，函数参数默认值的基本用法，注意事项，函数参数默认值在实际开发中的应用。

**提示**：

在 ES6 之前，不能直接为函数参数指定默认值，因为我们在实际开发中经常需要用到，所以在之前的课程中，我们把默认值相关内容已经讲了。

> 但并没有讲完整，所以这里我们再来完善下相关内容

### 1、函数参数的默认值写法

TIP

如果调用函数时传入了对应的参数，就用传递的参数，如果没有传，就用默认值

- 在 ES6 之间前，不能直接为函数参数指定默认值，我们通常采用以下变通方法

```js
function sum(a, b) {
  if (a === undefined) a = 0;
  if (b === undefined) b = 0;
  console.log(`${a}+${b}=${a + b}`);
}
sum(); // 0+0=0
sum(1, 3); // 1+3=4
sum("A", "B"); // A+0=A0
```

- ES6 中，函数指定默认值，非常简单，直接在形参后面赋值

```js
function sum(a = 0, b = 0) {
  console.log(`${a}+${b}=${a + b}`);
}
sum(); // 0+0=0
sum(1, 3); // 1+3=4
sum("A", "B"); // A+0=A0
```

> 上面这种写法不仅简单，也可以一眼就能意识到那些参数是可以省略不传值的。

- 默认值生效的条件：参数没有赋值，或赋值为 undefined

```js
function sum(a = 0, b = 0) {
  console.log(`${a}+${b}=${a + b}`);
}
sum(); // 0+0=0
sum(undefined, "B"); //0+B=0B
```

### 2、函数参数默认值是惰性求值的

TIP

如果默认值是表达式，默认值表达式是惰性求值的

```js
let x = 1;
function fn(a = x++) {
  console.log(x);
}
fn(2); // 1   x++不会执行
fn(); // 2   x++被执行
fn(undefined); // 3   x++被执行
```

### 3、参数默认值的位置

TIP

**通常情况下**，定义了默认值的参数应该是函数的尾参数。因为这样容易看出，那些参数是可以省略不传值的。

如果非尾部的参数设置了默认值，实际上我们是无法跳过此参数，设置其后参数的值的。除非显示传入 undefined 值

```js
function fn(a = 1, b, c) {
  console.log(a, b, c);
}
fn(); // 1 undefined undefined
fn(2); // 2 undefined undefined
fn(undefined, 4, 5); // 1 4 5
// fn(,3,3); // 报错
```

> 参数如果设置了默认值，能往后放，一定放在后面为好。

### 4、函数的 length 属性

TIP

函数的 lenght 属性用来返回**没有**指定默认值的参数个数。

> 同时，rest 参数也不会计入 length 属性

![image-20230111194918659](https://www.arryblog.com/assets/img/image-20230111194918659.1392ceb8.png)

> 如果设置了默认值的参数是不尾参数，那其后的参数也不会被计入到 length 属性中

![image-20230111195046406](https://www.arryblog.com/assets/img/image-20230111195046406.e9f16dfd.png)

### 5、默认参数形成作用域

TIP

一旦参数设置了默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束时，这个作用域就会消失。

> 不过这种语法行为在不设置参数默认值时是不会出现的。

```js
let a = 1;
const f = (a, b = a) => {
  console.log(b);
};
f(3); // 3
```

上面代码中，参数 b 的默认值等于 a。在调用函数 `f(3)` 时，参数会形成一个单独的作用域，在这个单独的作用域中，`a=3`，`b=a`，即 `b=3`

```js
let a = 1;
const f = (b = a) => {
  let a = 33;
  console.log(b);
};
// 因为没有传入对应实参，则会启用默认值b=a,此时参数会形成一个单独的作用域，在此作用域中没有变量a,所以最终沿着作用域向外查找到全局作用域中的a=1,即b=1
f(); // 1
f(2); // 2  b没有启用默认值，而是传过来的实参2
```

- 注意区分以下几种错误写法

```js
const f = (b = a) => {
  let a = 33;
  console.log(b);
};
f(); // 报错，因为没有传入对应实参，则会启用默认值b=a，因为参数设置了默认值，所以参数会形成一个单独的作用域，此时作用域中没有变量a，沿着作用域链向外找，找到全局作用域也没有找到变量a,则会报错。
```

![image-20230112145501927](https://www.arryblog.com/assets/img/image-20230112145501927.6c5a01af.png)

```js
let a = 5;
const f = (a = a) => {
  console.log(a);
};
f(4); // 4
f(); // 报错

// f() 因为没有传入对应实参，则会启用默认值a=a,因为参数设置了默认值，所以参会形成一个单独的作用域，此时作用域中相当于 let a=a, 在 let a声明前使用a,因为形成了暂时性死区，所以执行代码就会报错。
```

![image-20230112150201775](https://www.arryblog.com/assets/img/image-20230112150201775.d5d8da04.png)

- 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。

```js
let c = 4;
function f(a = 2, fn = () => c + a) {
  let c = 5;
  console.log(fn());
}
f(); // 6
// f() 没有传入对应的实参，则会启用默认值，因为参数设置了默认值，所以参数会形成一个作用域，此时作用域中相当于 let a=2,fn=()=>c+a; 函数返回值中的a为当前作用域中的2，c为全局作用域中的4，最后fn()调用，输出结果为6
let a = 1;
function fn() {
  a = 5;
}
function f(a, b = fn) {
  // let a=55; 会报错
  var a = 55;
  b();
  console.log(a);
}
f(); // 55

// b = fn 中的 fn 是在全局作用域中声明的，所以调用 b()时，修改的是全局作用域中的的a,而函数体中的 console.log(a) 访问的是当前函数作用域中的 a,所以打印结果为 55
```

### 6、函数参数的默认值与解构赋值结合使用

TIP

指定参数的默认值，就避免了在函数体内部再去判断传入的参数是否有值了。

> 不过要区分以下 3 种不同方式

```js
function foo({ a = 1, b = 3 }) {
  console.log(a, b);
}

// 相当于  let {a = 1, b = 3}=undefined
// foo(); // 报错
// 相当于 let {a = 1, b = 3}={} 没有对应值，则用默认值
foo({}); // 1 3
// 相当于 let {a = 1, b = 3}={ a: "A" } a有值，用传的值，b无值，用默认值
foo({ a: "A" }); // A 3
// 相当于 let {a = 1, b = 3}={ a: "A", b: "B" } a与b都有值，用传的值
foo({ a: "A", b: "B" }); // A B
function foo({ a = 1, b = 3 } = {}) {
  console.log(a, b);
}
// 相当于 let { a = 1, b = 3 } = {}
foo(); // 1 3
// 相当于 let { a = 1, b = 3 }={}
foo({}); // 1 3
// 相当于 let { a = 1, b = 3 }={ a: "A" }
foo({ a: "A" }); // A 3
// 相当于 let { a = 1, b = 3 }={ a: "A", b: "B" }
foo({ a: "A", b: "B" }); // A B
function foo({ a, b } = { a: 1, b: 3 }) {
  console.log(a, b);
}

// 相当于 let { a, b } = { a: 1, b: 3 }
foo(); // 1 3
// 相当于 let { a, b } = {}
foo({}); // undefined undefined
// 相当于 let { a, b } ={ a: "A" }
foo({ a: "A" }); // A  undefined
// 相当于 let { a, b }={ a: "A", b: "B" }
foo({ a: "A", b: "B" }); // A B
```

## 八、重难点总结

TIP

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了

用于故而知新，快速复习 ！

### 1、数组、对象的解构赋值相似的点

TIP

数组和对象的原理是非常相似的，我们放在一块来总结

| 相同点                      | 说明                                                                                                                                |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| 模式（结构）匹配            | 赋值等号左右模式或结构需要匹配。 如：左边是数组右边也是数组，左边是对象右边也是对象                                                 |
| 索引值/属性名相同的完成赋值 | 数组只要**索引值**相同就能完成赋值，对象是**属性名**相同完成 赋值 数组由于索引值相同，更在乎顺序 对象只要属性名相同，不在于顺序     |
| 默认值生效条件              | 数组成员、对象的属性值严格等于 `=== undefined` 时，对应的默认值才会生效                                                             |
| 默认值是表达式              | 即用得到的时候才会计算表达式的值，用不到的时候就不会计算，不浪费浏览器的计算资源 如：函数表达式用到时，才会调用，用不到时就不会调用 |

### 2、对象解构赋值注意点

TIP

- 采用赋值模式来解构赋值，整个赋值语句需用圆括号`()`包裹起来

> 因为，如果不在圆括号`()`中进行，会造成浏览器的误解，会把原本对象的 `{}` 花括号，当成代码块的花括号 `{}`

- 对象的解构赋值不仅可以取到自身属性和方法，可以取到原型链上的属性或方法

### 3、其他数据类型的解构赋值

TIP

- 字符串既可以按数组的形式解构赋值，也可以按照对象的形式解构赋值
- 数值和布尔值的解构赋值需要先将等号右边的值转换为对象。

> 注：这个转换为对象的过程跟我们没有关系，是浏览器自动完成转换的

- undefined 和 null 无法转为对象，解构赋值都会报错

### 4、函数参数的默认值

TIP

- 参数默认值的位置
- 函数的 lenght 属性
- 重点理解：默认参数形成作用域
- 重点掌握函参数默认值与解构赋值的结合

## 九、测试题

TIP

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、下列通过解构赋值，取到的值为 undefind 的为哪一项 ？

> 单选

- A、`const [a,b,c] = [1,2,3]`
- B、`const {a,c} = {a:1,c:2}`
- C、`const [,,c] = [1,[3,4]]`
- D、`const [,b] = [1,[3,4],5]`

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 2、下面这段代码的运行结果是 ？

> 单选

```js
const arr = [1, 2, 3, 4];
let [a, , , b = "a"] = arr;
console.log(b);
```

- A、4
- B、"a"
- C、undefined
- D、报错

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：A</p></details>

### 3、以下代码的输入结果 ？

```js
function fn() {
  return 1;
}
function fn2() {
  const [a, b = "A", c = fn()] = arguments;
  console.log(a, b, c);
}
fn2("A", "B");
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案： "A" "B" 1</p></details>

### 4、以下代码的输入结果

```js
const arr = [];
let d = 2;
const fn = ([a = 1, b = a, c = d] = []) => {
  let d = 4;
  console.log(a + b + c + d);
};
fn();
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：8</p></details>

### 5、以下说法错误的是 ？

```js
const {
  foo,
  bar: bar1,
  a: b1,
  f: [, , z],
} = { a: 1, b: 2, c: 3, f: ["A", "B", "C"] };
```

- A、`console.log(foo)` 打印结果为 undefined
- B、`console.log(bar)` 以下打印结果为 undefined
- C、`console.log(b1)` 以下打印结果为 1
- D、`console.log(z)` 以下打印结果为 "C"

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案： B</p></details>

### 6、以下哪一个选项的代码，可以使 arr 数组中的元素保持不变 ？

```js
let arr = [1, 2, 3];
let { test = arr.pop() } = obj;
console.log(arr);
```

- A、`const obj = {}`
- B、`const obj = {arr: arr}`
- C、`const obj = {test: []}`
- D、`const obj = {test: undefined}`

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 7、以下对已声明的变量进行对象的解构赋值错误的是 ？

A、

```js
let a;
{a}={a:1}
```

B、

```js
let a;
({ a: a } = { a: 1 });
```

C、

```js
let b;
({ a: b } = { a: 1 });
```

D、

```js
let a;
({ a } = { a: 1 });
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：A</p></details>
