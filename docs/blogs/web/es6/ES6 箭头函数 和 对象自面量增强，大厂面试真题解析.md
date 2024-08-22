---
title: ES6 箭头函数 和 对象自面量增强，大厂面试真题解析
date: 2023-10-30
sidebar: 'auto'
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 箭头函数 和 对象自面量增强，大厂面试真题解析

本节会重点学习箭头函数和对象自面量增强，箭头函数是一个非常重要的内容，在后面的开发中几乎每天都会用到，我们会从以下几个方面来展开讲解

- 什么是箭头函数 ？
- 箭头函数的注意事项
- 箭头函数中的 this 指向 （重点）
- 不适用箭头函数的场景
- 箭头函数的在实际开发中的应用

**招银、百度、知乎、字节箭头函数面试真题解析**

- 箭头函数可以用 call 或者 apply 改变 this 指向吗 ？（百度）
- 箭头函数和普通函数的区别（招银、百度、知乎、字节）

ES6 中对于对象自面量提供了更加简洁的属性和方法表示法，同时还对`[]`方括号语法做了增强等。接下来我们会从以下几个方面来展开对象自面量的增强

- 对象字面量写法（复习）
- 对象属性的简洁表示法 - 增强
- 对象方法的简洁表示法 - 增强
- 方括号语法的用法和增强

## 一、箭头函数

我们先来了解什么是箭头函数，箭头函数的结构，以及如何将一般函数改写成箭头函数

> 引入箭头函数有两个方面的作用：更简短的函数并且不绑定`this`

### 1、什么是箭头函数

- 箭头函数也是函数，与之前学过的 ES5 中的 function 关键字定义的函数写法不同
- ES6 规定了可以使用 “箭头” `=>` 来定义一个函数，语法更加简洁。不用再书写 function 关键字

**箭头函数的结构**

> const/let 函数名 = (参数 )=> 函数体

```js
// 箭头函数语法
;() => {} // 匿名的箭头函数

// ES6 中 定义一个简单的箭头函数
const sum = (a, b) => {
  return a + b
}
console.log(sum(2, 3)) // 5

// 等同于ES5中 利用function关键字定义sum函数
var sum = function (a, b) {
  return a + b
}

console.log(sum(2, 3)) // 5
```

如何将一般函数改写成箭头函数，在 ES5 中我们学习过两种函数形式（函数声明形式、函数表达式形式）

> 如下：

```js
// 声明形式
function sum() {}
// 函数表达式形式
var sum = function () {}
// 函数表达式形式 -> 箭头函数
const sum = () => {}

// 箭头函数省略了function关键字，通过箭头 => 定义函数
```

不过要特别注意

var 和 function 声明的变量和函数会存在变量和函数声明提升，而 let 和 const 声明的变量是不存在变量提升的。

> 所以用 let 和 const 声明的变量保存的箭头函数，一定要在声明后才能使用

```js
console.log(sum(1, 2)) // 3
function sum(a, b) {
  return a + b
}

console.log(sum(1, 2)) // 抛出引用错误 Uncaught ReferenceError: Cannot access 'sum' before initialization
let sum = (a, b) => {
  return a + b
}
```

### 2、箭头函数的注意事项

我们知道箭头函数比普通函数写起来更简洁，当满足一定条件的时候，箭头函数还可以写的更加简洁。

- 单个参数 ：单个参数可以省略圆括号

```js
// 单个参数
const sum = (x) => {
  return x + 1
}
console.log(sum(1)) // 2

// 单个参数可以省略圆括号
const sum = (x) => {
  return x + 1
}
console.log(sum(1)) // 2
```

- 无参数或多个参数：不能省略圆括号

```js
// 无参数，不能省略圆括号
const sum = () => {
  return 2 + 3
}
console.log(sum()) // 5

// 多参数，不能省略圆括号
const sum = (a, b) => {
  return a + b
}
console.log(sum(2, 3))
```

- 单行函数体：可以同时省略 `{}` 和 `return`

```js
const sum = (a, b) => {
  return a + b // 函数体内只有一条语句
}

// 以上单行函数体，可以同时省略 {} 和 return
const sum = (a, b) => a + b
console.log(sum(2, 3)) // 5

// 多行函数体，不能再简化了
const sum = (a, b) => {
  const add = a + b
  return add
}
console.log(sum(2, 3)) // 5
```

- 单行对象：（同属于单行函数体，会比较特殊）

> 如果箭头函数返回单行对象，可以在`{}`外面加上`()` ，让浏览器不再认为那是函数体的花括号

```js
// 单行对象
const sum = (a, b) => {
  return {
    value: a + b,
  }
}
console.log(sum(2, 3)) // {value: 5}

// 对于函数体中，返回单行对象的形式，可以再简化
// 如果箭头函数返回单行对象，可以在 {} 外面加上 () ，让浏览器不再认为那是函数体的花括号
const sum = (a, b) => ({
  value: a + b,
})
console.log(sum(2, 3)) // {value: 5}
```

- 单行数组（正常写就好）

```js
const sum = (a, b) => {
  return [a, b]
}
console.log(sum(2, 3)) // [2, 3]

// 简写
const sum = (a, b) => [a, b]
console.log(sum(2, 3)) // [2, 3]
```

- 箭头函数的嵌套简写

```js
function sum(a) {
  return function fn1(b) {
    return function fn2(c) {
      return function fn3(d) {
        return a + b + c + d
      }
    }
  }
}
console.log(sum(1)(2)(3)(4))

// 改写用箭头函数
const sum2 = (a) => (b) => (c) => (d) => a + b + c + d
console.log(sum2(1)(2)(3)(4))
```

提示：

不管箭头函数嵌套几层，只要记住，有几个`=>`就有几个箭头函数，`=>`函数左边是参数，右边是函数体

### 3、普通函数（非箭头函数）中的 this 指向

普通函数（非箭头函数）中的 this 指向把函数当成方法调用的对象，谁把函数当成方法调用，this 指向谁。

> 具体不同场景下函数（非箭头）函数中 this 指向，如下表：

| 函数的调用方式                                               | this 指向(非严格模式) | this 指向（严格模式） |
| :----------------------------------------------------------- | :-------------------- | :-------------------- |
| 全局作用域下                                                 | window                | window                |
| `函数()`                                                     | window                | undefined             |
| `对象.函数()`                                                | 对象                  | 对象                  |
| IIFE 立即执行函数                                            | window                | undefined             |
| `数组\[下标 ]()`                                             | 数组                  | 数组                  |
| `fn.call(thisArg,arg1,arg2)`                                 | thisArg               | thisArg               |
| `fn.apply(thisArg，arry)`                                    | thisArg               | thisArg               |
| `fn.bind(thisArg，arg1,arg2)`                                | thisArg               | thisArg               |
| 定时器中的回调函数                                           | window                | window                |
| DOM 事件处理函数 `element.onclick=function(){ // this指向 }` | element               | element               |
| `var obj=new 函数()`                                         | obj                   | obj                   |

- 全局作用域下

```js
// 全局作用域下
console.log(this) //windown
```

- `函数()` 自调用

```js
// 函数()
'use strict'
function sum() {
  console.log(this)
}
sum() // 严格模式下结果为 undefined  非严格模式下 window
```

- `对象.函数()`

```js
// 对象.函数()
const obj = {
  name: '清心',
  getName: function () {
    console.log(this)
  },
}
obj.getName() // {name: '清心', getName: ƒ}
```

- IIFE 立即执行函数

```js
// IIFE 立即执行函数
'use strict'
;(function () {
  console.log(this) // 严格模式下结果为 undefined  非严格模式下 window
})()
```

- `数组[下标 ]()`

```js
// 数组[下标 ](   )
function fn() {
  console.log(this)
}
const arr = [fn, 1, 2]

arr[0]() // [fn, 1, 2]
fn() // window
```

- 函数调用 call、apply、bind 方法

```js
// 函数调用call,apply,bind方法
const obj = {
  a: 1,
  b: 2,
}
function sum(a, b) {
  console.log(this.a + this.b)
  console.log(this)
}
sum.call(obj, 3, 4) // 3  obj
sum.apply(obj, [3, 4]) // 3 obj
let fn = sum.bind(obj)
fn() // 3  obj
```

- 回调函数

```js
//  回调函数
'use strict'
setTimeout(function () {
  console.log(this)
}, 1000)

const arr = [1, 0, 3, 7, 5]
let result = arr.find(function (value, index, arr) {
  console.log(this) // window
  return value > 2
})
console.log(result)
```

- 事件处理函数

```js
// 事件处理函数
const box = document.querySelector('.box')
box.onclick = function () {
  console.log(this) // <div class="box">点击我</div>
}
```

- 构造函数中

```js
// new 函数()
function Point(x, y) {
  this.x = x
  this.y = y
  console.log(this) //  {x: 2, y: 3}
}
const point = new Point(2, 3)
```

- 分析以下代码中的 this 指向

```js
// 判断以下函数中this指向谁 ？
function sum() {
  console.log(this)
}
// 声明一个 calc 计算器对象，add为对象的属性名，sum为上边的函数名
const calc = {
  add: sum,
}
calc.add() // {add: ƒ}  ，this 指向 calc 对象

// 根据我们上边学过的，谁调用就指向谁，因此 this 指向 calc 对象

// 判断以下this的指向
const adder = calc.add
adder() // undefined -> window（在非严格模式下，浏览器帮我们将this指向从 undefined 转化成了 window）
```

### 4、箭头函数中的 this 指向

箭头函数中没有自己的 this，在箭头函数中访问 this，需要沿着作用域链向外查找。

```js
const calc = {
  sum: () => {
    console.log(this)
  },
}
calc.sum() // window
```

分析以上代码，思考：

为什么`calc.sum()` 调用函数时 this 的指向为 window ？我们知道箭头函数没有自己的 this，那为什么当前的 this 会指向 window 呢 ？

> 这时，就需要结合我们前面学过的作用域链的机制来分析了 。

- 首先，箭头函数没有自己的 this，我们通过 `calc` 对象来调用 `sum()` 方法时（即：`calc.sum();`），就会执行`console.log(this);`
- 这时 ，就会先在当前的箭头函数执行形成的函数作用域中来查找 `this` ，而箭头函数又没有自己的`this` 因此，在当前作用域中就找不到 this。根据作用域链的机制，就会往外层寻找
- 它的外层是 `calc` 对象，我们知道对象没有作用域，再往外找，就是全局作用域了
- 因此，当 `console.log(this);` 就找到了全局作用域中的`this` ，全局作用域中的 this 即指向 window 了

**练习以下案例，深入分析函数中的 this 指向**

```js
// "use strict";
const calc = {
  add: function () {
    const adder = () => {
      console.log(this)
    }
    adder()
  },
}
calc.add() // {add: ƒ} this指向 calc对象

// 如：不直接调用，而是赋值给一个新的函数
const addFoo = calc.add
addFoo() // undefined -> window（在非严格模式下，浏览器帮我们将this指向从 undefined 转化成了 window）

// 严格模式下，this 指向 undefined
```

### 5、不适用箭头函数的场景

我们通过前边的学习发现，使用箭头函数用起来省时省力，非常方便 。在以后的 ES6 代码中，就可以使用箭头函数来代替一般的函数了。但并不是在所有的地方都可以使用箭头函数

> 以下几种情况不适用箭头函数：

- 作为构造函数
- 需要 this 指向调用对象的时候
- 需要使用 arguments 的时候

### 5.1、作为构造函数

```js
const Person = () => {}
new Person() // Uncaught TypeError: Person is not a constructor

// 直接报错 Person不是构造函数
```

因为

箭头函数没有 this ，而构造函数最重要的就是 this ，在实例化构造函数之后它里面的 this 指向就应该指向它实例化之后得到的实例对象，而箭头函数本身没有 this，我们肯定就不能使用箭头函数来作为构造函数

### 5.2、需要 this 指向调用对象的时候

- 事件处理函数中的 this 一般都是指向绑定事件的对象，所以事件处理函数不要写成箭头函数

```js
// 使用最原始的方式
document.onclick = function () {
  console.log(this) // document
}
// 当点击浏览器任意位置是，this指向 document

// 使用绑定监听事件的方式
document.addEventListener(
  'click',
  function () {
    console.log(this) // document
  },
  false,
)
// 当点击浏览器任意位置是，this指向 document

// 如果使用箭头函数时，箭头涵本身没有this
// 根据作用域链的机制，就会往外层作用域中找。找到全局作用域中就指向 window了
document.addEventListener(
  'click',
  () => {
    console.log(this) // window
  },
  false,
)
```

- 对象方法中的 this 是需要指向调用方法的对象，所以对象的方法不要写成箭头函数

```js
// 对象的方法使用箭头函数
const obj = {
  num: 1,
  sayHello: () => {
    console.log(this.num) // undefined
  },
}
obj.sayHello()

// 对象方法使用普通函数
const obj = {
  num: 1,
  sayHello: function () {
    console.log(this.num) // 1
  },
}
obj.sayHello()
```

因此

如果我们需要 this 指向调用对象的时候，就不能使用箭头函数，还是使用原来的方式即可。

> 因为箭头函数没有自己的 this

### 5.3、需要使用 arguments 的时候

```js
// 使用 arguments 来接受不确定实参，然后循环遍历arguments类数组
function sum() {
  console.log(arguments)
}
sum(1, 2, 3) // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

// 如果将以上函数修改成 箭头函数
const sum = () => {
  console.log(arguments) // Uncaught ReferenceError: arguments is not defined
}
sum()

// 箭头函数中没有arguments
```

注：

将以上函数修改成箭头函数后，报错 arguments 未定义。

- 因为，在 ES6 中箭头函数里没有 arguments 。那如果有不定参数的需求该怎么办呢 ？
- 既然 ES6 的箭头函数中取消了 arguments ，就可以使用其它的方式来解决

> 我们接下来会学到 剩余参数 就能解决，在一定程度上代替 arguments ，如果一定要用，还是使用传统的方式就好。

### 6、适合箭头函数的场景

箭头函数因为书写的便利，在很多场景下都可以代替原来的函数，除此之外还因为箭头函数没有自己的 this 这一特性，在实际开发中也有广泛的应用。

> 以下情况，我们**可以**把普通函数改写成简单的箭头函数

- 函数中不会用到 this，则可以将此函数改成箭头函数
- 希望在当前函数中的 this 指向外层作用域中的 this 时，可以将此函数改成箭头函数

### 6.1 函数中不会用到 this

- 以下的 IIFE 立即执行函数中，并没有用到 this，所以 this 指向什么都没关系

```js
const color = (() => {
  const arr = ['red', 'yellow', 'green', 'blue']
  const n = (Math.random() * arr.length) >> 0
  return arr[n]
})()
console.log(color)

// 注意，这种情况下，箭头函数
```

- 当`函数()`的方式自调用时，其内部也没有用到 this，所以 this 指向什么都没关系

```js
var sum = (a, b) => a + b
console.log(sum(1, 2)) // 3
```

- 常见 API 的回调函数，可以将其改写成箭头函数

```js
const arr = [1, 3, 2, 7, 4, 5, 6]
arr.sort(function (a, b) {
  console.log(this)
  return a - b
})
console.log(arr) // [1, 2, 3, 4, 5, 6, 7]

// 箭头函数
const arr2 = [1, 4, 3, 7, 8, 12, 76]
arr2.sort((a, b) => a - b)
console.log(arr2) // [1, 3, 4, 7, 8, 12, 76]
```

### 6.2、希望函数中 this 指向外层作用域 this

我们一般希望在回调函数中拿到外层作用域中的 this，因为箭头函数没有自己的 this，所以箭头函数中的 this 默认就指向了外层作用域中的 this。

**案例：点击元素，元素在几种不同颜色之间随机切换**

![GIF2023-1-416-18-04](data:image/gif;base64,R0lGODlhaQCEAAAAACH5BABQAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAaQCEAKD/AAD///8C/4yPqcvtD6OctNqLs97cgg+G4kiW5omm6aS27gu7bEzXNjrf+k7n/A80+YJE4rCI3B2TzJ6kCbUto9TTtIoVXbPcLRfr/VLDYii5zDyjkeq18en+tuO/OV0Jv1ftemm+b/YHmCY4yFZo+BaR2MTH2OL4uIIoibdYqQiBmfmwGRTpOQIaGjJK+mF6mkq6Gtrq+boZizlbWSt5+5jLuJvYa/g7GAw43Fesd3yXTLcc1+z2vBaNNl1WLXYtR3n6kt21zQ0JHj55Se5kfg7jncUONq5e4r4HHy9ab1+Kn4+6zz8/xl8+gFEIBkrHD4dAewYbLYzXkBDChEIeqouYBOOhiVMUSXT4CDKkyJEkS5o8iTKlypUsW7p8CTOmzJk0a9q8iTOnzp08e/r8CTSo0KFEixo9ijSp0qVMmzp9CjWq1KlUq1q9ijWr1q1cu3r9Cjas2JQFAAAh+QQAKACrACwDAAMAWgBaAKAAAP8AAAACZYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoeFYAACH5BAAyAKsALAMAAwBaAFoAoP8AAAAAAAJlhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCh4VgAAIfkEAIIAqwAsAwADAFoAWgCgAIAAAAAAAmWEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKHhWAAAh+QQAMgCrACwDAAMAWgBaAKD//wAAAAACZYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoeFYAACH5BAAoAKsALAMAAwBaAFoAoP8AAAAAAAJlhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCh4VgAAIfkEAFoAqwAsAwADAFoAWgCg//8AAAAAAmWEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKHhWAAAh+QQAMgCrACwDAAMAWgBaAKAAgAAAAAACZYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoeFYAACH5BAAoAKsALAMAAwBaAFoAoAAA/wAAAAJlhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCh4VgAAIfkEADIAqwAsAwADAFoAWgCg//8AAAAAAmWEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKHhWAAAh+QQAWgCrACwDAAMAWgBaAKAAAP8AAAACZYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoeFYAADs=)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<div class="box"></div>
<script>
  const box = document.querySelector('.box')
  box.onclick = function () {
    const that = this // 保存this
    setInterval(function () {
      const arr = ['red', 'blue', 'yellow', 'green']
      const len = arr.length
      // that指向 box
      that.style.backgroundColor = arr[(Math.random() * len) >> 0]
    }, 500)
  }
</script>
```

以上代码

要在定时器的回调函数中拿到外层（事件处理函数）中的 this，则需要在事件处理函数中添加变量 that 来保存 this，然后在回调函数中来使用

> 如果将定时器中的回调函数，改写成箭头函数，就不需要增加中间变量（代码如下）

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
<div class="box"></div>
<script>
  const box = document.querySelector('.box')
  box.onclick = function () {
    setInterval(() => {
      const arr = ['red', 'blue', 'yellow', 'green']
      const len = arr.length
      // 箭头函数中没有自己的this，所以沿着作用域链向外找,找到了事件处理函数中的this
      // 事件处理函数中的this指向绑定事件的对象box
      this.style.backgroundColor = arr[(Math.random() * len) >> 0]
    }, 500)
  }
</script>
```

**案例：当点击一个按钮时，从零开始计数**

```html
<style>
    body {
        padding: 200px 0 0 300px;
    }
    button {
        width: 70px;
        height: 70px;
        font-size: 20px;
        cursor: pointer;
    }
    span {
        font-size: 30px;
        padding: 30px;
    }
</style>

<button id="btn">点击开始</button>
<span id="result">0</span>

<script>
    // 获取按钮
    const btn = document.getElementById("btn");
    // 获取存放数字的容器
    const result = document.getElementById("result");

    const timer = {
        time: 0,
        start: function () {
            btn.addEventListener(
                "click",
                function () {
                    setInterval(function () {
                        console.log(this); // undefined -> window（在非严格模式下，浏览器帮我们将this指向从 undefined 转化成了 window）
                        this.time++;
                        result.innerHTML = this.time;
                    }, 1000);
                },
                false
            );
        },
    };
    timer.start();
</script>
</body>
</html>
```

![image-20221010160622967](https://www.arryblog.com/assets/img/image-20221010160622967.6c9c9f52.png)

以上代码

当我们点击开始按钮时，数字变成 NaN 了，我们看到定时器`setInterval(function(){})` 中 this 指向 window ，现在就能明白问题在哪里了，我希望这里的 this 指向是 timer 对象才对（我们需要用到 timer 对象中的 time 属性）。

> 本质就是，这里的 this 指向只要是 timer 就能正常运行了

我们通过前边的学习，可以画图分析如下就能明白 ！

![image-20221010175948142](https://www.arryblog.com/assets/img/image-20221010175948142.d9783ef0.png)

在以前，我们的做法是通过声明一个变量，在我们希望 this 指向哪里时，提前保存一下 this 的值，然后再需要对应 this 的时候，替换成我们声明的变量即可实现。

> 具体 JS 代码如下：

```html
<script>
  // 获取按钮
  const btn = document.getElementById('btn')
  // 获取存放数字的容器
  const result = document.getElementById('result')

  const timer = {
    time: 0,
    start: function () {
      // 声明一个变量，在当前作用域中提前保存 this 指向的值
      var that = this
      console.log(this) // this指向 timer
      btn.addEventListener(
        'click',
        function () {
          console.log(this) // this指向 btn
          setInterval(function () {
            console.log(this, that) // 可以看到this的值并没有变化，在非严格模式下，还是window，但that的值就是 timer对象
            that.time++ // 使用我们自己保存的this指向值，这时that的值就是我们想要的 timer 对象了
            result.innerHTML = that.time
          }, 1000)
        },
        false,
      )
    },
  }
  timer.start()
</script>
```

> 点击开始按钮，即可正常输出

![image-20221010182150409](https://www.arryblog.com/assets/img/image-20221010182150409.8704d932.png)

注：

通过上边代码的实现，我们发现真正的重点在找到我们需要的 this 指向，只要指向为 timer 对象即可

在 ES6 中，箭头函数没有自己的 this，我可以通过这个特性来实现

```html
<script>
  // 获取按钮
  const btn = document.getElementById('btn')
  // 获取存放数字的容器
  const result = document.getElementById('result')

  const timer = {
    time: 0,
    start: function () {
      console.log(this) // this指向 timer ，找到了，timer.start(); 调用start()方法，即指向 timer对象
      btn.addEventListener(
        'click',
        () => {
          console.log(this) // 箭头函数没有自己的this ，往上一层找
          setInterval(() => {
            console.log(this) // 箭头函数没有自己的this ，往上一层找
            this.time++
            result.innerHTML = this.time
          }, 1000)
        },
        false,
      )
    },
  }
  timer.start()
</script>
```

## 二、箭头函数面试题

深入浅出互联网大厂 ES6 高频面试真题解析 和 相关扩展知识
面试真题是检验自己学习成果和查缺补漏的最好方式之一，同时也是了解企业对求职者技能要求的风向标 。

### 1、箭头函数可以用 call 或者 apply 改变 this 指向吗 ？（百度）

解题思路：

- 说说箭头函数中的 this 指向，普通函数中的 this 指向。
- 为什么普通函数调用 call 和 apply 能改变 this，说下其实现原理，能否手写实现下 call 方法？
- 结合手写的 call 方法，来说明箭头函数不能改变 this 指向的本质原因。

> 注

- 箭头函数不能用 call 和 apply 改变 this 指向，因为箭头函数中没有自己的 this，箭头函数中的 this 指向箭头函数声明时所在的作用域中的 this。而普通函数内部的 this，指向把函数当成方法调用的对象。
- 普通函数调用 call 和 apply 能改变函数内部的 this 指向，其本质是把函数当成 call 或 apply 后面第一个参数的方法来调用。

- `obj.方法()` 方法为普通函数，其内部的 this 指向 obj

```js
const obj = {
  a: 1,
  b: 2,
}

function sum(a, b) {
  console.log(this.a + this.b)
}
sum.call(obj, 4, 5) // 相当于  obj.sum(4,5) ，sum为普通函数，this指向被调用的对象,即相当于

/*
obj={
    a:1,
    b:2,
    sum:function(a,b){
         console.log(this.a+this.b);  // this指向obj
    }
}
*/
```

- `obj.方法()`方法为箭头函数，其 this 指向箭头函数声明时所在作用域中的 this

```js
const obj = {
  a: 1,
  b: 2,
}

const sum = (a, b) => {
  console.log(this.a + this.b)
}
sum.call(obj, 4, 5) // 相当于  obj.sum(4,5)  但sum是箭头函数，this指向window,即相当于

/*
obj={
    a:1,
    b:2,
    sum:(a,b)=>{
         console.log(this.a+this.b);  // this指向window
    }
}
*/
```

- call 内部实现原理：把调用 call 的函数当成 call 方法的第一个参数的方法来使用
- 以下代码是根据此原理来实现手写 call 方法

```js
// 手写call方法
Function.prototype.call = function (context, ...args) {
  // ....相关判断省略
  // 创建一个唯一的值，用来当做对象的属性名
  const key = Symbol()
  // call是一个普通函数，内部的this指向调用call方法的对象
  // 把调用call方法的对象绑定成 call方法第一个参数的方法
  context[key] = this
  // 调用方法,并将返回值保存在变量中
  let result = context[key](...args)
  //删除被新增的属性
  delete context[key]
  // 返回结果
  return result
}
```

### 2、箭头函数和普通函数的区别（招银、百度、知乎、字节）

> 箭头函数和普通函数主要有以下几个方面的区别

| 区别       | 说明                                                                                 |
| :--------- | :----------------------------------------------------------------------------------- |
| this 指向  | 箭头函数中没有自己的 this，箭头函数中的 this 指向箭头函数声明时所在的作用域中的 this |
| arguments  | 箭头函数中没有 arguments，如果需要接受对应的实参列表，可以用 rest 剩余参数           |
| 构造函数   | 箭头函数不能用做构造函数，不能使用 new 调用                                          |
| prototype  | 箭头函数没有原型对象 prototype 这个属性                                              |
| super      | 因为箭头函数不能用做构造函数，也就没有自己的 super                                   |
| yield 命令 | 因为箭头函数不能用作 Generator 函数，所以不可以使用 yield 命令                       |

## 三、对象字面量增强

了解对象字面量是什么 ？属性和方法的简洁表示法，本质上我们要学习的就是如何合理合法的偷懒 `^_^`

### 1、对象字面量是什么 ？

对象字面量就是对象的一种写法，对象一般有两种写法

- 通过实例化构造函数来生成对象

```js
// 实例化构造函数生成对象
const student = new Object()
student.username = '清心'
student.age = 18
student.code = function () {}
```

- 对象字面量方式创建对象

```js
// 对象字面量
const student = {
  username: '清心',
  age: 18,
  code: function () {},
}
```

注：

我们日常开发中，很少使用实例化构造函数来生成对象，更多使用对象字面量的方式来生成对象，因为它更直观，我们用的也更多。

### 2、属性的简洁表示法 - 增强

- 当对象属性的键名和变量或常量名一样的时候，可以只写一个

```js
let username = '清心'
let age = 18
const obj = {
  username: username,
  age: age,
}
console.log(obj) // {username: '清心', age: 18}

// 以下简写形式，当属性名和变量名相同时，可以只写一个
const obj = {
  username, // 相当于 username: username
  age, // 相当于  age: age
}
console.log(obj) // {username: '清心', age: 18}
```

- 这种简写用于函数的返回值会非常方便

```js
function getCurrentDate() {
  var nowDate = new Date()
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1
  var date = nowDate.getDate()

  return { year, month, date } // 属性的简写形式
}
console.log(getCurrentDate()) // {year: 2023, month: 1, date: 5}
```

### 3、方法的简洁表示法-增强

es6 中，对象的方法可以省略冒号和 function 关键

```js
const obj = {
  say: function (a, b) {},
}

// 简写
const obj = {
  say(a, b) {},
}
const student = {
  name: '清心',
  code: function () {
    console.log(`${this.name}正在写代码`)
  },
}
student.code() // 清心正在写代码

// 以下是简写形式，可以省略方法名后面的:和function关键字
const student = {
  name: '清心',
  code() {
    console.log(`${this.name}正在写代码`)
  },
}
student.code('清心') // 清心正在写代码
```

- 方法的简法，对于 get 获取函数和 set 设置函数也适用

```js
// ES5中 get和set函数是写在Object.defineProperty方法的第三个参数中
const obj = {
  _sex: '男',
}
Object.defineProperty(obj, sex, {
  get: function () {
    return this._sex
  },
  set: function (value) {
    this._sex = value
  },
})

// 你可能认为我说的简写是下面这种写法，其实不是，当然这种写法也简写了
Object.defineProperty(obj, sex, {
  get() {
    return this._sex
  },
  set(value) {
    this._sex = value
  },
})
```

- ES6 支持的最完美的 get 和 set 函数的简写形式

```js
const obj = {
  _sex: '男',
  // get函数的简写
  get sex() {
    return this._sex
  },
  // set 函数的简写
  set sex(value) {
    this._sex = value
  },
}
console.log(obj.sex)
console.log((obj.sex = '女'))
console.log(obj)
```

### 4、方括号语法 - 增强

深入浅出方括号语法的用法，有哪些增强，方括号中可以放什么 ？对比学习模板字符串中注入什么，`[]`方括号语法和 `.`点语法有什么区别。

### 4.1、 ES5 中方括号语法的用法

在 ES5 中定义对象属性有两种方式：点符号法和方括号表示法

```js
const obj = {}
// 方式一：点符号法  obj.属性名=属性值
obj.name = '清心' // 等价于 obj['name']='清心'
// 方式二：方括号表示法  obj[变量]=属性值, 这种情况变量的值为属性名
let myage = 'age'
obj[myage] = 18 // 这种情况只能使用方括号法
```

但 ES5 中，对象字面量写法中不能使用`[]`方括号法来定义属性名

```js
const obj = {
  name: '清心',
  ['myage']: 19, // ES5中不允许这种写法
}
```

### 4.2 、ES6 中方括号语法 - 增强

- 在 ES6 中允许字面量定义对象时使用`[]`方括号的方式来定义属性名
- 方括号中可以放的内容和模板字符串中的注入`${}`中可以放的内容一样，可以放 **” 值 或 通过计算可以得到值的（表达式）“** 都可以

```js
// 语法
[值或通过计算可以得到值的（表达式）]
const property = "username";
const foo = () => "age";

// 对象字面量
const student = {
  [property]: "icoding",
  [foo()]: 18,
  // ["sex"]: "male",
  ["s" + "ex"]: "female",
};
console.log(student); // {username: 'icoding', age: 18, sex: 'female'}
```

- 在获取属性时，当属性名不是合法标识符时，就只能采用方括号表示法。
- 在获取属性时，如果使用变量或者常量保存属性名时，就只能采用方括号表示法

```js
const obj = {
  age: 18,
  '123username': 'icoding',
}
// 123username 不是合法标识符，所以只能用方括号方式来获取
console.log(obj['123username'])
// 定义一个常量property，值为age
const property = 'age'
// 当属性为变量或常量时，必须通过方括号语法，即：obj[property]，使用property保存的值age，所以等价于obj.age这种写法
console.log(obj[property]) // 18
// 当属性为变量或常量时，如果通过点语法，会将property看做字符串，表示访问obj对象下的property属性，而不是访问obj下的age属性，而obj对象中没有property属性，所以返回结果为undefined
console.log(obj.property) // undefined
```

- 使用字面量方式创建对象时，如果使用变量或者常量保存属性名时，就只能使用方括号语法

```js
let username = 'username'
const age = 'age'
const obj = {
  [username]: '清心',
  [age]: 18,
}
console.log(obj) // {username: '清心', age: 18}
```

### 4.3、方括号语法和点语法的区别

- 点语法是方括号语法的特殊形式。也就是说：如果不使用点语法，只使用方括号来给对象字面量添加属性或方法没有任何问题。
- 但，有些特殊情况我们是可以使用点语法的，而点语法用起来更简单。所以，能用点语法时，我们会优先使用点语法。

```js
// 对象字面量
const student = {}

// 使用点语法给对象字面量添加属性
student.age = 18 // 等价于 student["age"] = 18;
console.log(student) // {age: 18}

// 使用方括号给对象字面量添加属性
student['username'] = 'icoding' // 等价于 student.username='icoding'
console.log(student) // {age: 18, username: 'icoding'}
```

总结：

点语法和方括号表示法都可以实现时，优先选择点语法，因为更简单

## 四、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习 ！

### 1、箭头函数

**箭头函数是什么 ？**

- 箭头函数是函数的一种简化形式
- 箭头函数的结构：const/let 函数名 = 参数 => 函数体
- 改写成箭头函数：声明形式 -> 函数表达式形式 -> 箭头函数

**箭头函数的注意事项**

- 单个参数可以省略圆括号
- 单行函数体，可以同时省略 `{}` 和 `return`
- 函数体是单行对象，省略 `{}` 和 `return` 后，需要在对象`{}`外面加上`()`

**非箭头函数中的 this 指向**

- 全局作用域中的 this 指向 window
- 函数中的 this，只有所在函数被调用的时候，才有明确指向
- this 指向调用其所在函数的那个对象
- 没有具体调用对象，this 指向 undefined，在非严格模式下，转向 window

**箭头函数中的 this 指向**

- 箭头函数没有自己的 this
- 箭头函数中的 this 是通过作用域链查找的

**不适用箭头函数的场景**

- 不适合作为构造函数
- 不适合需要 this 指向调用对象的时候
- 不适合需要使用 arguments 的时候

### 2、对象字面量的增强

- 属性的简洁表示法 - 增强

> 键名和变量或常量名一样时，可以只写一个

```js
const username = 'icoding'
const student = {
  username,
}
console.log(student) // {username: 'icoding'}
```

- 方法的简洁表示法 - 增强

> 方法可以省略冒号和 function 关键字

```js
const person = {
  code() {
    console.log('我正在写代码 ...')
  },
}
person.code() // 我正在写代码 ...
```

- 方括号语法 - 增强

> 方括号语法可以写在对象字面量中
> 方括号中可以放值或通过计算可以得到值的（表达式）
> 属性或方法名是合法标识符时，可以使用点语法
