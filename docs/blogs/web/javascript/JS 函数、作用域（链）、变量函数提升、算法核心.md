# JS 函数、作用域（链）、变量函数提升、算法核心

本章 JavaScript 核心之一：函数相关，作用域、作用域链，变量提升与函数提升，算法核心，递归与深克隆等

## 一、函数的理解

- 函数是什么 ？
- 它有什么作用 ？

> 在理解这两个问题前，我们先来看一道题。

**计算任意两个数之间所有数之和**

比如

1-10，10-20，20-30 等，按我们之前学过的内容，我们只能以下面这种方式来书写

```js
var sum = 0
for (var i = 1; i <= 10; i++) {
  sum += i
}
console.log(sum) // 55

var sum = 0
for (var i = 10; i <= 20; i++) {
  sum += i
}
console.log(sum) // 165

var sum = 0
for (var i = 20; i <= 30; i++) {
  sum += i
}
console.log(sum) // 275
```

上面这种方式

- 每计算一次，就要写一次 for 循环，而且这些代码除了起始变量和结束条件不一样，其它都一样。
- 那有没有什么简单的办法，我们只要输入起始的两个数，自动就出来我们想要的结果

> 函数就可以做到，我们来看下函数的写法

```js
function sum(a, b) {
  var sum = 0
  for (var i = a; i <= b; i++) {
    sum += i
  }
  console.log(sum)
}
sum(1, 10) // 55
sum(10, 20) // 165
sum(20, 30) // 275
```

> 上面函数的写法，你可以理解为：你开发了一个计算器，你只要输入任意的两个数，他就会把这两个数之和给你输出来。

函数的理解

- 函数就是语句的封装，可以让封装后的代码很方便的被反复使用
- 函数具有**一次定义**，多次调用'的优点
- 使用函数，可以简化代码，让代码更具有可读性

> 接下来我们就来学习如何定义（声明）一个函数，及函数的使用（调用）

## 二、函数的声明和调用

- 和变量一样，函数必需先定义（声明）然后才能使用
- 定义一个函数，有两种方式

### 1、函数声明

> 下面是以函数声明的方式-创建一个函数

```js
// 声明函数
function 函数名() {
  // 函数体语句
}

function hello() {
  console.log('大家好！')
}
```

- 使用`function`关键字声明函数，必需全部小写，`function`是 **“功能"** 的意思
- 函数名必须符合`JS`**标识符**命名规则
- ( ) 圆括号中是形参列表，即使没有形参，也必须书写圆括号
- { } 大括号里是函数体语句

> 实际开发中，主要以这种方式来创建一个函数

### 2、函数表达式

> 以下是以函数表达式的方式创建一个函数

```js
var 变量 = function () {
  // 函数体语句
}

var hello = function () {
  console.log('大家好！')
}
```

- `function(){ }`是一个**匿名函数**，即没有函数名的函数。
- 但是我们最后要使用这个函数，所以我们把这个匿名函数赋值给了一个变量
- 后面我们通过这个**变量**来调用这个函数

> 匿名函数，经常以回调函数的形式出显

### 3、函数的调用

- 调用函数非常简单，只需在函数名字后书写圆括号对即可
- 所谓函数的调用，就是执行函数体内的所有语句。

```js
// 函数声明方式，声明函数，声明的函数是不会自动被执行的
function hello() {
  console.log('大家好！')
}
// 调用函数，函数必须要等到调用的时候才能被执行
hello()
// 函数定义一次，可以多次调用
hello()
hello()
```

![image-20220918182205000](https://www.arryblog.com/assets/img/image-20220918182205000.94946f12.png)

```js
// 函数表达式方式，声明函数 ，声明的函数是不会自动被执行的
var hello = function () {
  console.log('大家好！')
}
// 调用函数，函数必须要等到调用的时候才能被执行
hello()

// 函数定义一次，可以多次调用
hello()
hello()
```

![image-20220918182205000](https://www.arryblog.com/assets/img/image-20220918182205000.94946f12.png)

> 我们来看下面这段代码，最后在控制台的输出结果什么

```js
function fn() {
  console.log('A')
}
console.log(1)
fn()
console.log(2)
fn()
```

![image-20220918181911449](https://www.arryblog.com/assets/img/image-20220918181911449.66309708.png)

提示：

函数被声明后，是不会自动执行的，只有被调用才会被执行

### 4、函数类型判断

> 利用 typeof 来检测函数类型，得到 function

```js
function fn() {}
typeof fn
console.log(typeof fn) // 'function'
console.log(typeof fn === 'function')
```

## 三、函数的参数

深入函数的实参和形参，以及在实际开发中的注意事项

### 1、函数参数分类

> 函数的参数分为形参和实参，具体如下表：

| 参数 | 说明                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| 形参 | 在声明函数时，我们可以在函数名后面的小括号（）中添加一些参数，这些参数被称为形参 |
| 实参 | 在调用函数时，我们可以在函数名后面的小括号（）中，添加的参数，这些参数被称为形参 |

- 在函数的`()`中可以指定`>=0`个参数，参数可以是**任意类型**
- 多个参数之间用`,`**逗号**隔开

```js
// 函数声明，这里的a,b被称为形参
function sum(a, b) {
  console.log(a + b)
}

// 调用函数
sum(1, 2) // 这里的 1，2 被称为 实参
sum(2, 3) // 这里的 2，3 被称为 实参
```

### 2、形参与实参的关系

- 在函数调用时，**实参**会将其**值**，**赋值**给到函数声明时**对应**的**形参**。
- 实参与形参在赋值时，是一一对应的顺序，所以顺序不要弄错

> 我们以下面这个代码的执行过程来作为讲解

```js
// 函数声明，这里的a,b被称为 形参
function sum(a, b) {
  console.log(a + b)
}
// 调用函数，
sum(1, 2) // 这里的 1，2被称为 实参
```

> **代码从上往下执行**

- 遇到 sum(1,2) 被调用，相当于就要开始执行 sum 函数。

```js
// sum(1,2) 被调用，相当于就要执行下面代码
function sum(a, b) {
  console.log(a + b)
}
```

- 在执行代码前，还有一个预解析的过程，这个时候，会根据形参个数，来创建对应的变量，接收传过来的实参的值。相当如下代码

```js
// 在执行前，会在sum函数体内，声明两个变量，a和b，然后用来接收传过的来实参 1和2，
// 相当于如代码如下
function sum() {
  var a = 1
  var b = 2
  console.log(a + b)
}
```

> 正式执行函数体内的代码，最后输出结果 3

### 3、实参与形参个数不同时

如果传入的实参与形参的个数不同时，会怎么样呢 ？

### 3.1、当实参个数 > 形参个数时

对函数本身的功能并没有任何的影响

```js
// a，b 是形参
function sum(a, b) {
  console.log(a + b)
}

// 2，3，4 是实参
// 这里的传入的第三个实参4，并没有对应的形参接收它，所以函数体内用不到，也就不会有什么影响。
sum(2, 3, 4)
```

### 3.2、当实参个数 < 形参个数时

- 会引发报错，最终得不到想要的结果
- 以下代码的最终运行结果是 `NaN`

```js
// a,b,c 是形参
function sum(a, b, c) {
  // 这里的c没有接受任何值，则默认值是undefined，undefined 进行任何运算结果都是 NaN
  var sum = a + b + c
  console.log(sum)
}

// 2,5 是实参
sum(2, 5) // NaN
```

注意：

如果对应的形参没有接受到对应实参的值，则默认值是`undefined`

> 上面代码在执行时，其内部如下

```js
function sum() {
  var a = 2
  var b = 5
  var c // 默认值为 undefined
  var sum = a + b + c
  console.log(sum)
}
```

注意：

在实际开发中，实参和形参尽量相同，否则会引发报错或 NaN

> **总结：形参和实参**

| 参数个数    | 输出结果                                                                |
| :---------- | :---------------------------------------------------------------------- |
| 实参 = 形参 | 正常输出结果                                                            |
| 实参 > 形参 | 正常输出结果                                                            |
| 实参 < 形参 | 形参默认值为`undefined`，多出的形参没有对应实参，则最后得不到想要的结果 |

### 4、参数默认值

如果实参的个数小于形成，那函数在调用后，则会报错，或得不到想要的结果。那有没有办法可以规避这种问题呢 ？有，就是我们接下来要讲到的参数的默认值。

- 在函数声明时，我们可以给**形参赋值**，这个值我们称为**参数的默认值**
- 如果在函数调用时，没有传入对应的实参，则参数值就以默认值代替
- 如果传入了对应的实参，参数值就以实参传过来的值为准。

```js
// 形参a，b同时赋初始值
function sum(a = 0, b = 0) {
  console.log(a + b)
}
sum() // 0  没有对应实参，则 采用默认值 a=0,b=0 ,即a+b=0
sum(1) // 1 只传了第1个实参，则a=1,b=0，即a+b=1
sum(1, 2) // 3 传入2个实参，则a=1,b=2,即a+b=3
```

- 注意形参与实参在接受值时，是一一对应关系，否则处理不当，就得不到想要的结果或报错

```js
// 形参a，b同时赋初始值
function sum(a=0,b) {
    console.log(a + b);
}
sum(); // NaN  没有对应实参，则 采用默认值 a=0,b=undefined ,即a+b=NaN
sum(1); // NaN 只传了第1个实参，则a=1,b=undefined，即a+b=NaN
sum(,2); // 报错
// 形参a，b同时赋初始值
function sum(a, b = 0) {
  console.log(a + b);
}
sum(); // NaN  没有对应实参，则 采用默认值 a=0,b=undefined ,即a+b=NaN
sum(1); // 1 只传了第1个实参，则a=1,b=0,即a+b=1
```

**参数默认值的另 一种书写方式**

```js
// 形参a，b同时赋初始值
function sum(a, b) {
  // a,b 如果没有值，则默认为undefined，undefined转boolean是false
  a = a || 0 // a有值，则用a的值，没值用0代替
  b = b || 0 // b有值，则用b的值，没值用0代替
  console.log(a + b)
}
```

注意：

形参，在函数内部不需要用 var 声明，直接使用就可以

> 上面这种写法，代码在执行前，其内部结构如下

```js
// sum(1,2)调用时
function sum() {
  var a = 1
  var b = 2
  a = a || 0 // a有值，则用a的值，没值用0代替
  b = b || 0 // b有值，则用b的值，没值用0代替
  console.log(a + b)
}

// sum() 调用时
function sum() {
  var a
  var b
  a = a || 0 // a有值，则用a的值，没值用0代替
  b = b || 0 // b有值，则用b的值，没值用0代替
  console.log(a + b)
}
```

### 5、案例：计算任意两个数之间所有数之和

- 首先要判断输入的是否是数字，如果不是数字，则把参数默认值设为 0
- 然后要判断两个数的大小，for 循环遍历两个数之间的所有数，用累加器累加
- 最后输出累加器的值。

```js
function sum(a, b) {
  // 如果a是数字，则返回a，否则返回0
  a = typeof a === 'number' && !isNaN(a) ? a : 0
  // 如果b是数字，则返回b，否则返回0
  b = typeof b === 'number' && !isNaN(b) ? b : 0
  var sum = 0
  if (a >= b) {
    for (var i = b; i <= a; i++) {
      sum += i
    }
  } else {
    for (var i = a; i <= b; i++) {
      sum += i
    }
  }
  console.log(sum)
}
sum(-1, -2) // -3
sum(1, 2) // 3
sum(-1, 5) // 14
sum() // 0
sum('-1', 0) // 0
```

### 6、写一个函数，该函数对用户输入的用户名进行验证

- 当用户输入的用户名<4 位数时，弹出提示“用户名不能小于 4 位数”
- 当用户输入的用户名>=4 位并且<=8 位时，弹出提示"用户名格式正确"
- 当用户输入的用户名>8 位数时，弹出提示“用户名不能大于 8 位数”

```js
function userMatch(username) {
  if (username.length < 4) {
    alert('用户名不能小于4位')
  } else if (username.length <= 8) {
    alert('用户名格式正确')
  } else {
    alert('用户名不能大于8位')
  }
}
var username = prompt('请输入用户名')
userMatch(username)
```

### 7、arguments 实参列表

如果我们在函数声明时，不确定我们到底要几个形参数，而希望在函数调用时，传递几个实参，就接受几个实参。这个时候 arguments 就派上用场了。

- `arguments`实际上是当前函数的一个内置对象，函数调用时创建
- 函数内`arguments`表示**它接收到的实参列表**

`arguments` 是一个**类数组**对象，所谓的类数组对象，具有以下特点

- 具有 length 属性
- 可以用`[]`方括号，书写下标方式访问对象中属性值，下标从 0 开始
- 不具备数组的所有方法，如`push`,`pop`,`unshift`,`shift`等方法，arguments 都没有

```js
function fun() {
  // 全部输出类数组对象：[11, 22, 33, 44, 55, 66, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  console.log(arguments)

  // 使用arguments[下标]的形式枚举类数组对象其中每一项
  console.log(arguments[0]) // 11
  console.log(arguments[1]) // 22
}

fun(11, 22, 33, 44, 55, 66)
```

- 不管用户传入多少个实际参数，永远能够计算他们的和

```js
function sum() {
  var sum = 0
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  console.log('所有参数的和是：' + sum)
}

sum(11, 22, 33, 44, 55) // 165
sum(66) // 66
sum(-3, 9) // 6
```

### 8、arguments 的注意事项

- 函数内`arguments`表示**它接收到的实参列表**
- arguments 对象的值不反映参数的默认值

```js
function sum(a = 1, b = 2) {
  console.log(arguments)
  console.log(arguments[0])
  console.log(arguments[1])
}
sum(3, 5)
sum()
```

![image-20220918233700951](https://www.arryblog.com/assets/img/image-20220918233700951.0452908b.png)

参数的作用

- 如果函数体内的某些值不能固定，我们可以在调用函数时，通过实参的形式传递不同值进去。
- 如上面代码中，求两个数的和，这两个数 a,b 的值是不固定的，就可以通过传参来解决

**函数的封装**

- 所谓函数的封装，就是把具有一定功能的代码，通过函数的形式封装起来
- 当我们需要使用的时候，只需要调用下这个函数就可以。

### 9、类数组转换为数组

`arguments` 是一个**类数组**对象，所谓的类数组对象，具有以下特点

- 肯定是一个对象，同时具有 length 属性
- 可以用`[]`方括号，书写下标方式访问对象中属性值，下标从 0 开始
- 它并不拥有全部的 Array 对象的操作方法，如`push`,`pop`,`unshift`,`shift`等方法，arguments 都没有

> 类数组是一个对象，他是 Object 的实例，而数组是 Array 的实例，所以类数组并不具有 Array 对象的方法
> 但类数组和数组，他们的原型终点都指向 Object 的原型，所以他们都具有 Object 对象上的方法

```js
function fn() {
  var isArr = Array.isArray(arguments)
  console.log(isArr) // false  不是数组
  console.log(typeof arguments) // object  是一个对象
  console.log(arguments instanceof Object) // true 是Object的实例
}
fn()
```

我们想要类数组拥有数组的相关方法，则可以把类数组转换为数组再操作。**类数组转换为数组的几种方法：**

- for 循环遍历
- 使用数组的 slice() 和 concat() 方法
- Array.from
- Array.apply

```js
// for循环遍历
function fn() {
  var arr = []
  // 将arguments中元素取出，放到一个新数组中，后面操作的都是这个新数组
  for (var i = 0; i < arguments.length; i++) {
    arr[i] = arguments[i]
  }
  // 接下来操作arr这个数组就好
  arr.push('A')
  console.log(arr) // [1, 2, 3, 'A']
}
fn(1, 2, 3)
```

> 以下均为扩展内容，0 基础学员看不懂没关系，等后面学完面象对象，再回头复习时，即可以理解。

```js
function fn() {
  // 本质是把arguments中元素遍历后放到一个新数组中，换成后将新数组返回。
  var arr = Array.prototype.slice.call(arguments)
  // var arr = Array.prototype.concat.apply([], arguments);
  arr.push('A')
  console.log(arr)
  console.log(arguments) // arguments并没有做任何改变
}
fn(1, 2, 3)
// 创建一个类数组对象
var obj = {
  length: 2,
  0: 1,
  1: 2,
}
// var arr = Array.from(obj);
var arr = Array.apply(null, obj)
arr.push('A')
console.log(arr)
```

常见的类数组有

arguments、NodeList，HTMLCollection 、DOMTokenList 等

**特别注意**

字符串，有 length 属性，也可以`[]`括号的方式访问元素，但是他不是一个对象，所以他不是类数组。

### 10、测试题

以下关于 arguments 的说法正确的是

- A、arguments 是数组对象
- B、arguments.length 可以获得传递的实参数的个数
- C、arguments[] 可获得传递实参数的值，索引从 1 开始
- D、arguments 可以通过 for 循环来遍历其中的每个元素

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 11、案例

编写一个函数，根据输入的参数，在页面输出所有参数相加的公式

如：

- fn(1) 得到 0+1=1
- fn(1,2) 得到 1+2=3
- fn(1,2,3) 得到 1+2+3=6

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先实现，再点击查看正确答案</summary><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span></code></pre></div></details>

### 12、函数参数总结

> 函数参数分为：形参和实参

| 参数 | 说明                                                                               |
| :--- | :--------------------------------------------------------------------------------- |
| 形参 | 在声明函数时，我们可以在函数名后面的小括号`（）`中添加一些参数，这些参数被称为形参 |
| 实参 | 在调用函数时，我们可以在函数名后面的小括号`（）`中，添加的参数，这些参数被称为形参 |

总结

- 函数可以带参也可以不带参，即形参个数`>=0`
- 实参与形参在赋值时，是一一对应的顺序，所以顺序不要弄错
- 实参个数 `>=` 形参，对函数最后结果没有影响，反之，则会报错，或得不到想要的结果

**参数默认值**

- 我们可以在函数声明时，给形参赋值，这个值为参数的默认值
- 如果函数调用，传递了对应实参，则以实参值为准
- 如果函数调用，没有传递对应实参，则以默认值为准

**arguments 对象**

- `arguments`实际上是当前函数的一个内置对象，函数调用时创建
- 函数内`arguments`表示**它接收到的实参列表**

`arguments` 是一个**类数组**对象，类数组对象有下面三个特点

- 具有 length 属性
- 可以用`[]`方括号，书写下标方式访问对象中属性值，下标从 0 开始
- 不具备数组的所有方法，如`push`,`pop`,`unshift`,`shift`等方法，arguments 都没有

## 四、函数返回值

- 函数体内可以使用`return` 关键字来返回**函数的返回值**
- `return`可以返回**任意类型的值**，即函数返回值可以是任意类型
- `return`后面的值，就是函数调用执行后的返回值

```js
function sum(a, b) {
  return a + b
}
var result = sum(1, 3)
console.log(result) // 4
```

- return 后面只能返回 1 个值，如果多个值，则以最后一个为准

```js
function fn() {
  return 1, 'A', [1, 2, 3]
}
console.log(fn()) // [1, 2, 3]
```

- 函数里没有`return` 或 `return ;` ，则函数的返回值是`undefined`;

```js
function fn() {
  console.log('没有返回值')
  // return;
}
console.log(fn())
```

![image-20220918224022608](https://www.arryblog.com/assets/img/image-20220918224022608.102ad38a.png)

- 函数的返回值，可以被一个变量接收，这个变量可以参于后需的使用

```js
function sum(a, b) {
  return a + b
}
// 将函数当做一个普通值
var result = sum(3, 5) * sum(2, 6)
console.log(result) // 64
```

注意：

return 只能出现在函数中，出现在其它地方会报错

### 1、遇见 return 即退出函数

- 函数中`return`语句之后的内容，是不会被执行的
- `return`相当于立即退出函数
- `return`只能出现在函数体中

```js
function fn() {
  console.log('return前内容')
  return ''
  console.log('return后的内容')
}
fn() // return前内容
```

### 2、return 与 if 的结合

- 结合`if`语句的时候，如果`if`语句体中只有一条语句，不需要写`{ }`
- 题目：请编写一个函数，判断一个数字是否是偶数

```js
function checkEven(n) {
  // if(n % 2 == 0){
  //   return true;
  // }
  // return false;

  // 单行语句，也可以省略{} ,在实际工作中类似写法很常见
  if (n % 2 == 0) return true
  return false
}

var result = checkEven(5)
console.log(result) // false
```

### 3、return 与循环语句结合

return 可以在函数体中与 if 语句，循环语句结合使用

**题目：**

找出数组`[200,500,900,1200,1500]`中比`600`大的第一个值出现的位置，并将其返回。

> 在我们后期学到 DOM 时，需要做网站左侧的楼梯式导航滚动效果，就需要用到知识点，所以这个案例一定要掌握

```js
var arr = [200, 500, 900, 1200, 1500]
function maxIndex(n) {
  for (var i = 0; i < arr.length; i++) {
    if (n <= arr[i]) return i // 满足条件，直接将i的值返回，退出函数的体
  }
}
var _index = maxIndex(300)
console.log(_index) // 1
```

### 4、return、break、continue 三者区别

| 关键字   | 描述                                                                                                              |
| :------- | :---------------------------------------------------------------------------------------------------------------- |
| break    | 在循环语句中使用，结束当前循环体（如 for 循环，while 循环）                                                       |
| continue | 在循环语句中使用，跳出本次循环，继续执行下一次循环（如：for 循环，while 循环）                                    |
| return   | return 关键 字，只能出现在函数体中 不仅能退出循环，退出函数体，还能将 return 语句中的值返回，其返回值为函数返回值 |

- break 退出当前 for 循环

```js
function fn() {
  for (var i = 0; i < 10; i++) {
    if (i == 3) {
      break
    }
    console.log(i)
  }
  console.log('break,continue退出时，我会出来')
}
fn()
```

![image-20220918235822818](https://www.arryblog.com/assets/img/image-20220918235822818.2ab0bd5a.png)

- continue 跳出本次循环，继续执行下一次循环

```js
function fn() {
  for (var i = 0; i < 10; i++) {
    if (i == 3) {
      continue
    }
    console.log(i)
  }
  console.log('break,continue退出时，我会出来')
}
fn()
```

![image-20220918235729121](https://www.arryblog.com/assets/img/image-20220918235729121.4b9d95d1.png)

- return 不仅能退出循环，退出函数体

```js
function fn() {
  for (var i = 0; i < 10; i++) {
    if (i == 3) {
      return
    }
    console.log(i)
  }
  console.log('break,continue退出时，我会出来')
}
fn()
```

![image-20220918235922935](https://www.arryblog.com/assets/img/image-20220918235922935.a003fa36.png)

### 5、测试题

- 以下代码的运行结果是

```js
function sum(a, b) {
  return a + b
  cosole.log(a + b)
}
console.log(sum(1, 2))
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

- 以下代码的运行结果是

```js
function max(a, b) {
  if (a > b) return a
  return b
}
console.log(max(12, 5)) // 12
console.log(max(5, 6)) // 6
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br></p></details>

### 6、总结：函数是什么？

函数像一个 "小工厂"，我们输入的参数，然后调用，就能输出结果

![image-20211223201011768](data:image/png;base64,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)

## 五、函数作为参数

我们说函数的参数可以是任意的类型，那么自然也可以把一个或多个函数当成函数的参数

### 1、函数做为参数的应用

- 函数作为函数的参数，在实际的开发中经常用到，特别是我们常用的各种**API**（那些封装好的函数就叫做`API`），其参数经常是一个函数。
- 所以理解函数做为函数的参数，在内部是如何处理的，对我们学习`API`方法是非常用帮助的。

> 我们来看下面段代码

- 函数`fn2`作为函数`fn`的参数，函数`fn2`不带参数

```js
// 声明一个函数，其参数a也是一个参数
function fn(a) {
  a() // 内部执行函数a
}
// 声明一个函数
function fn2() {
  console.log('我是在fn的内部被调用')
}
// 调用fn函数，把函数fn2作为fn函数的参数
fn(fn2)
```

- 函数`fn2` 作为函数`fn`的参数，函数`fn2`带参数 （**非常重要，一定要掌握**）

```js
// 声明一个函数，其参数a是一个函数
function fn(a) {
  a(2, 4) // 调用函数
}
// 声明一个函数
function fn2(a, b) {
  console.log(a + b)
}
// 调用fn函数，把函数fn2作为fn函数的参数
fn(fn2) // 6

// fn(fn2(2,4));   错误的用法
```

初学常见错误

- 函数带参数时，常会引发这种错误的使用 `fn(fn2(2,4))`
- 这里的`fn2(2,4)` 被调用，返回值为`undefined`，相当于传过去的实参是`undefined`

**切记：** 函数做为参数，是没有办法把实参传过去，实参只能在函数调用的时候传递

> 我们先来自己尝试写一个以函数做为参数的功能函数。

### 2、手写一个函数，返回数组中最大值或最小值

写一个函数，根据用户传递参数，来决定是返回数组中的最大值还是最小值

- 我们来看下，如果我们要写一个函数，返回数组中最大值，如何写？代码如下：

```js
// 返回数组中最大值
function max(arr) {
  // 变量max用来保存数组中的最大值
  var max = arr[0]
  // 循环遍历数组中的每一项
  for (var i = 1; i < arr.length; i++) {
    // 如果max小于arr[i],把 arr[i] 保存在max中
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}
var arr = [1, 4, 5, 6, 2, 40, 39, 58]
console.log(max(arr))
```

- 如果我们要写一个函数，返回数组中最小值，如何写 ？代码如下

```js
// 返回数组中的最小值
function min(arr) {
  // 变量min用来保存数组中的最小值
  var min = arr[0]
  // 循环遍历数组中的每一项
  for (var i = 1; i < arr.length; i++) {
    // 如果min大于arr[i],就把 arr[i] 保存在min中
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min
}
var arr = [1, 4, 5, 6, 2, 40, 39, 58]
console.log(min(arr))
```

注：

- 我们对比以上两个函数，他们的实现除了`if (max < arr[i])`和`if (min > arr[i])`不一样，其它全一样

- 那我们是不是可以写一个函数，把

  ```
  max
  ```

  和

  ```
  arr[i]
  ```

  作为函数的参数，让用户来决定

  - 是`max < arr[i]`是修改`max`的值
  - 还是`min > arr[i]`时来修改`min`的值呢 ？

- 根据函数参数，来决定返回数组中最大值，还是数组中最小值

```js
// 返回两个数中的最大值或最小值
function getMaxOrMin(arr, fn) {
  // 变量max用来保存数组中的最大值
  var value = arr[0]
  // 循环遍历数组中的每一项
  for (var i = 1; i < arr.length; i++) {
    // 根据fn的返回结果来决，如果a-b大于0，则求最小值，如果b-a>0，则求最大值
    if (fn(value, arr[i]) > 0) {
      value = arr[i]
    }
  }
  return value
}

var arr = [1, 4, 5, 6, 2, 40, 39, 58]
var min = getMaxOrMin(arr, function fn(a, b) {
  return a - b // 取最小值
})
var max = getMaxOrMin(arr, function fn(a, b) {
  return b - a // 取最大值
})
console.log(max, min)
```

### 3、手写一个 filter 函数

**函数功能：** 实现返回数组中所有大于 n 的元素，返回值为所有满足条件的元素组成的数组

比如，返回数组`[1,15,6,10,12,13,9]`中所有大于 10 的元素，返回结果为`[15,12,13 ]`

```js
// 返回大于10的元素
var arr = [1, 15, 6, 10, 12, 13, 9]
var arr2 = []
for (var i = 0; i < arr.length; i++) {
  if (arr[i] > 10) {
    arr2[arr2.length] = arr[i]
  }
}
console.log(arr2)
// 封装成方法
function maxArr(arr, fn) {
  var arr2 = []
  for (var i = 0; i < arr.length; i++) {
    // 以fn中的返回值作为判断条件
    if (fn(arr[i])) {
      arr2[arr2.length] = arr[i]
    }
  }
  console.log(arr2)
}
var arr = [1, 15, 6, 10, 12, 13, 9]
maxArr(arr, function (value) {
  return value > 10
})
maxArr(arr, function (value) {
  return value < 10
})
```

总结：函数作为参数的作用 ？

函数当作参数传递，这代表我们可以抽离出一部分**容易变化的业务逻辑**。把这部分业务逻辑放到函数参数中，这样一来可以分离业务代码中变化与不变的部分。

### 4、函数作为参数的常见 API

在后期的学习中，我们经常会碰到方法的参数是一个函数，所以这个点一定要理解透。

**学好一个 API，本质就是掌握以下三点：**

- 这个 API 方法的主要功能是什么。
- 作为函数参数的函数，他的功能是什么，他的参数是什么，有什么用。
- 了解 API 方法，内部大概是如何实现的。

- 以下是数组中常见的方法，其参数是一个函数

```js
// 排序函数
sort(function(a,b){
    return a-b;
})

// 返回数组中满足条件的元素组成一个新数组（过滤数组中不满足条的）
filter(function(element, index, array) {
    return element >10;
}

// 返回满足条件的 第一个元素
find(function(element) {
    return element >10;
})
// 定义数组
var arr = [1, 3, 34, 5, 20, 68, 56];

// 返回数组中所有大于10的元素组成的新数组
var result = arr.filter(function (value) {
  return value > 10;
});
console.log(result); // [34, 20, 68, 56]

// 返回数组中第一个大于10的元素
var result2 = arr.find(function (value) {
  return value > 10;
});
console.log(result2); // 34

// 数组升序排序
arr.sort(function (a, b) {
  return a - b; // a-b 升序  b-a 降序
});
console.log(arr); //  [1, 3, 5, 20, 34, 56, 68]
```

强烈建议

在学习相关 API 时，如果 API 中的参数是一个函数，可以尝试自己去实现这个方法。

只有这样，你未来在应用这个 API 时，才能保持最大的灵活性，把优势发挥到最大。

### 5、函数作为参数总结

函数作为参数的注意点

- 该函数是在另一个函数体中被调用的
- 该函数的实参，也是在函数体内被传递的
- 如果该函数体有 return 语句，则 return 的返回值常用来作为内部判断条件，求值等，决定了最后的输出结果
- 如果该函数体中没有 return 返回值，而是正常的语句，函数一般作为回调函数等，在另一个函数内部直接调用。

**什么情况下，我们会把一个函数作为参数**

当函数体中有一部分容易变化的业务逻辑，我们可以把这部分业务逻辑放到函数参数中，这样一来可以分离业务代码中变化与不变的部分。

## 六、作用域和作用域链

以下关于作用域和作用域链，我们并不涉及底层执行原理，底层执行原理在对象讲完后再讲。

**作用域：**

可以理解为一套规则，这套规则规定了变量的作用范围。在 JS 中我们就是根据这套规则来查找变量的。

### 1、作用域的分类

JS 中有 3 种类型作用域：全局作用域、函数作用域、块级作用域（ES6 中新增）

**全局作用域：**

- 直接编写在`<script>`标签中的 JS 代码 或单独的 JS 文件中代码，都是在全局作用域
- 声明在全局作用域中的变量为**全局变量**

```html
<script>
  // 以下变量 a 和函数 fn 、fn2都是在全局作用域中，也称为全局变量
  var a = 2
  function fn() {}
  function fn2() {
    var b = 3
  }
</script>
```

函数作用域：

- 函数作用域，也称为局部作用域，所有写在函数内部的代码，就是在函数作用域中。
- 声明在函数作用域中的变量为**局部变量**

```html
<script>
  // fn2函数体中的变量 b，函数fn3 都是在函数作用域中
  var a = 2
  function fn() {}
  function fn2() {
    var b = 3
    function fn3() {
      console.log('fn3中')
    }
  }
</script>
```

> **块级作用域：** 使用 let 或 const 关键字声明的变量，会形成块级作用域，暂不做介绍，等学到 ES6 时再讲

### 2、作用域中变量访问权限

- 在全局作用域中，是没有办法访问到函数作用域中的变量（局部变量）（除闭包外）

```js
var a = 2 // 全局作用域中
function fn() {
  var b = 3 // 函数作用域中
}
// 全局作用域是不能访问函数作用域中变量
console.log(b) // Uncaught ReferenceError: b is not defined
```

- 在函数作用域中，是可以访问全局作用域中的变量（全局变量）

```js
var a = 2 // 全局作用域
function fn() {
  var b = 3 // 函数作用域
  console.log(a) // 2  函数作用域，是可以访问全局作用域中的变量
}
fn()
```

### 3、作用域链

- 当在一个函数内部嵌套一个函数时，就会发生作用域的嵌套。其内部函数可以访问到最外层函数和全作用域中的变量，其就是沿着作用域链一层一层来查找的。
- 你可以把作用域理解为，当函数发生嵌套时，内层函数会沿着嵌套的作用域一层层往外查找变量，这种查找方式就好比作用域形成了一个链条，故称为作用域链查找。

### 3.1、作用域链查找规则

- 在函数作用域中，操作一个变量时，会由当前函数作用域向外层作用域寻找变量
- 如果在当前作用域中能找到，就直接使用
- 如果找不到就向上一层作用域中寻找，找到就直接使用
- 如果一直找到全局作用域中依然找不到，则会报错。

> 我们来看下面这段代码

```js
var a = 1
function fn() {
  var b = 2
  console.log(a) // 1
  function fn2() {
    var c = 3
    console.log(b) // 2
    console.log(c) // 3
  }
  fn2()
}
fn()

// 代码从上往下执行，当fn()被执行后，就会执行fn函数体中的代码，当执行到console.log(a)时，在当前函数作用域中，没有变量a，其就会往fn函数的外层作用域，即全局作用域中去查找，找到a=1,然后在控制台打印1
// 接着执行fn2(),当执行到console.log(b)，他会先在当前作用域中找，找不到，则往外层作用域中找，最后在fn函数作用域中找到，b=2,直接使用值，在控制台输出2
// 接着执行console.log(c),首先在当前作用域找，找到了c=3，则直接在控制台输出3
```

### 3.2、遮蔽效应

所谓的遮蔽效应是指，如果函数中定义了和全局同名的变量，则函数内的变量会将全局的变量“遮蔽”

```js
var a = 2
function fn() {
  var a = 3
  console.log(a) // 3
}
fn()
```

### 3.3、形参也是局部变量

```js
var a = 12
function fn(a) {
  console.log(a) // 8
}
fn(8)

// 以上代码可以理解为如下
var a = 12
function fn(a) {
  var a = a
  console.log(a) // 8
}
fn(8)
```

### 3.4、特殊的全局变量

在函数里没有用 var 关键字声明的变量，是全局变量 (**非严格模式下，严格模式下会报错**)

```js
function fn() {
  a = 4
}
fn() // 函数调用后，a全局变量会被创建
console.log(a, window.a) // 4 4
function fn() {
  'use strict'
  a = 4
}
fn() // 函数调用后，a全局变量会被创建
console.log(a, window.a) // ncaught ReferenceError: a is not defined
```

### 4、严格模式

在 ES5 中增加了严格模式概念，在严格模式下，之前的一些不规范的写法在这种模式下会被处理掉，甚至会直接抛出错误。

**为什么使用严格模式 ？**

- 严格模式消除了 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为
- 消除代码运行一些不安全之处，保证代码运行的安全
- 提高代码编译效率，增加运行速度
- 为未来新版本的 JavaScript 做好铺垫

**对整个 JS 代码开启严格模式**

在所有 JS 代码的最前面加上`"use strict"`

```html
<script>
  // 'use strict ' 是一个预处理执令，告诉JS引擎启用严格模式
  'use strict'
  a = 6 // 在严格模式下，定义变量必需用var关键词
  console.log(a) // Uncaught ReferenceError: a is not defined
</script>
```

**单独指定一个函数在严格模式下执行**

只需要把`"use strict"`放在函数体的最前面。函数体中的代码就需要遵顺严格模式

```js
function b() {
  // 'use strict ' 是一个预处理执令，告诉JS引擎在此函数体内启用严格模式
  'use strict'
  a = 4
  console.log(a) // Uncaught ReferenceError: a is not defined
}
b()
c = 4
console.log(c) // 4

function b() {
  'use strict' // 严格模式只能函数体内有效
  a = 4
  console.log(a) // Uncaught ReferenceError: a is not defined
}
b()
```

### 5、在严格模式下，哪些行为被禁止

- 变量必需先声明，再使用（声明变量用 var、const、let）
- `函数()`调用时，其内部 this 指向 window
- 函数参数不能重名
- 禁止使用 with

- 变量必需先声明，再使用（声明变量用 var、const、let）

在非严格模式中，如果一个变量没有声明就赋值，默认是全局变量，**不会出现报错**。

```js
a = 2
```

严格模式禁止这种用法，添加`"use strict"`开启严格模式后，**会出现报错**。

```js
'use strict'
a = 2 // Uncaught ReferenceError: a is not defined
```

严格模式下变量必须添加关键字声明才可以

```js
'use strict'
let a = 2
```

- `函数()`调用时，其内部 this 指向

在非严格模式中，全局作用域中的函数内部 this 默认指向 window

```js
function foo() {
  console.log(this) // 控制台输出结果为 window 对象
}
foo()
```

在严格模式中，全局作用域中的函数内部 this 默认指向 undefined

```js
function foo() {
  'use strict'
  console.log(this) // undefined
}
foo()
```

- 函数参数不能重名

非严格模式下，允许重复变量命名

```js
function add(x, x, y) {
  return x + x + y
}
```

严格模式下，不允许重复变量重名

```js
'use strict'
function add(x, x, y) {
  return x + x + y
}
// 控制台报错 Uncaught SyntaxError: Duplicate parameter name not allowed in this context
// 语法错误：上下文中不允许重复的参数名
```

- 禁止使用 with

非严格模式下允许使用 with

```js
const obj = { a: 1, b: 2 }
with (obj) {
  console.log(a, b) // 1 2
}
```

非严格模式下不允许使用 with,抛出错误

```js
const obj = { a: 1, b: 2 }
with (obj) {
  console.log(a, b)
}
// Uncaught SyntaxError: Strict mode code may not include a with statement
```

### 6、静态作用域和动态作用域

- 静态作用域：又称词法作用域，是指作用域在词法阶段就被确定了（**函数定义的位置就决定了函数的作用域**），以后是不会改变。
- 动态作用域：函数的作用域在函数调用时才决定的。

> **特别注意**：`Javascript`采用的是词法作用域 ( **静态作用域** ）

```js
var a = 1
// fn 在全局作用中
function fn() {
  console.log(a)
}
function test() {
  var a = 2
  fn()
}
test() // 1

// 以上代码的执行过程如下
// 代码从上往下执行，调用test(),，是执行test()中代码
// 当执行到fn()时，执行其内部的 console.log(a);
// 这个时候会在自己的作用域中找a，没有找到，就会往外层作用域找，因为js中是静态作用域，其作用域
//是在函数定义时决定的，fn是在全局作用域中定义的，所以他所在的作用域是全局作用域，所以在内部找不到a时，会向外层的全局作用域中去找a，找到了a=1，则输出 1
```

- 看下面这段代码的结果

```js
var a = 3
var b = 4
function fn(a) {
  function fn2(b) {
    fn3(b)
    fn3()
  }
  function fn3(b) {
    console.log(b)
  }
  fn2(b)
}
fn(a)
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br></p></details>

### 7、测试题

- 说出以下代码的最终执行结果

```js
var a = 3
var b = 4
function fn(a) {
  // a = 3
  function fn2(b) {
    var b = 2
    console.log(a)
    fn3(b)
    fn3()
    fn4()
  }
  function fn3(b) {
    console.log(b)
  }
  function fn4() {
    console.log(b)
  }
  fn2(b)
}
fn(a)
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br><br></p></details>

- 说出以下代码的最终执行结果

```js
var a = 1
var b = 3
var c = 2
function fn(a) {
  var b = 3
  console.log(a, b)
  function fn2(b) {
    var c = 4
    console.log(a)
    console.log(b)
    console.log(c)
  }
  fn2(c)
}
fn(a)
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br><br></p></details>

### 8、总结

什么是作用域和作用域链

- **作用域**：可以理解为一套规则，这套规则规定了变量的作用范围。在 Js 中我们就是根据这套规则来查找变量的。
- **作用域链**：当函数发生嵌套时，内层函数会沿着嵌套的作用域一层层往外查找变量，这种查找方式就好比作用域形成了一个链条，故称为作用域链查找

**变量查找的规则**

首先会在当前定义的函数中查找，如果没有找到，就会沿着作用域链往外一层一层查找，找到就不找了，如果一直找到全局作用域来没有找到，则就会报错

**作用域分类**

- 在 ES5 中，作用域分类 函数作用域和全局作用域
- 直接编写在`<script>`标签中的 JS 代码 或单独的 JS 文件中代码，都是在全局作用域
- 直接写在函数体中的代码，都在函数作用域中（但函数体中，未 var 声明直接赋值的变量，是全局变量）

**变量分类**

- 变量分为全局变量和局部变量
- 写在全局作用域中的变量为全局变量
- 写在函数作用域中的变量为局部变量

**什么是静态作用域，什么是动态作用域**

- **静态作用域**：又称词法作用域，是指作用域在词法阶段就被确定了（**函数定义的位置就决定了函数的作用域**），以后是不会改变。
- **动态作用域**：函数的作用域在函数调用时才决定的。
- `Javascript`采用的是词法作用域 ( **静态作用域** ）

## 七、变量提升与函数声明提升

以下关于变量和函数提升，我们并不涉及底层执行原理，底层执行原理在对象讲完后再讲。

> 在讲解变量提升与函数声明提升前，我们先来看下面这一段代码

```js
console.log(a) // undefined
fn() // undefined
var a = 2
console.log(a) // a
function fn() {
  console.log(a)
}
fn() // a
```

![image-20220919002026019](https://www.arryblog.com/assets/img/image-20220919002026019.47e8ec06.png)

我们都知道

Javascript 代码是按顺序从上往下执行的，若按这个逻辑来理解的话

- 当执行到第 1 行时，由于`a`这个变量还没有被声明，那肯定是要报错的，但这里没有报错，而是输出了`undefined`
- 同行，当执行到第 2 行时，fn 这个函数还没有声明，那肯定也会报错，但同样没有报错，输出了`undefined`

> 通过上面的执行结果，我们应该知道函数或变量可以在声明之前使用。

**那如果使用了没有声明的变量或函数呢 ？**

> 我们看下面这段代码

```js
console.log(a)
fn()
```

![image-20220919002241467](https://www.arryblog.com/assets/img/image-20220919002241467.2d047bcd.png)

以上控制台直接就报错了

由此我们可以得出如下三个结论：

- JS 在执行过程中，若使用了未声明的变量，那 JS 执行就会报错
- 如果在一个变量声明之前使用他，不会报错，但输出值为 undefined
- 如果一个函数在声明前使用它，不会出错，可以正常执行

> 要解答变量和函数为什么能在声明前使用，就需要了解什么是变量提升，什么是函数提升

### 1、变量提升和函数提升

**变量提升**

- 是指使用 var 关键字声明的变量会被提升到**当前作用域**的最顶部
- 变量提升，提升的是变量，变量提升后，变量的默认值是`undefined`

**函数提升**

- 是指使用**函数声明**创建的函数，其也会被提升到当前作用域的最前面
- 这里要区分函数声明和函数表达式

> 我们来通过下面这个代码来理解变量提升和函数提升的过程

```js
console.log(a)
b()
var a = 2
function b() {
  console.log('要注意我喽！')
}

// 上面代码，会先把带var声明的变量和用function声明的函数，提升到当前作用域的最前面
// 提升后代码其形式如下：
var a
function b() {
  console.log('要注意我喽！')
}
console.log(a)
b()
a = 2

// 提升后，其代码执行流程如下：
// - 代码从上往下执行
// - 执行到第1行，a的默认值是undefined
// - 执行到第2行，是函数声明，啥也不做，往下继续执行
// - 执行到第5行，打印a,，结果是undefined
// - 执行到第6行，调用函数，函数体中打印  **”要注意我喽！“**
```

### 2、函数提升，区分函数声明与函数表达式

```js
console.log(a)
console.log(b)
b()
a()
var a = function () {
  console.log('我在a函数中')
}
function b() {
  console.log('我在b函数中')
}

// 首先把var和function声明的函数，提升到当前作用域最前面，提升后代码如下：
var a
function b() {
  console.log('我在b函数中')
}
console.log(a)
console.log(b)
b()
a()
a = function () {
  console.log('我在a函数中')
}

// 提升后代码，代码从上往下执行
// 执行到console.log(a); 在控制台输出 undefined,因为此时a声明了，但没有赋值,默认值为undefined
// 执行到console.log(b); 在控制台出整个 b的函数声明
// 执行到 b() ，调用函数,在控制台输出  "我在b函数中"
// 执行到a()，因为些时a还是undefined，所以没有办法调用，即报错
```

![image-20220922233925635](https://www.arryblog.com/assets/img/image-20220922233925635.f427832e.png)

### 3、函数提升优先级高于变量提升

在同一作用域下

- 如果出现同名的函数和变量，则在变量和函数提升时，会以函数为主
- 同名的函数在函数声明提升时，写在后面的会覆盖前面的

**同名的函数**

```js
a() // 2
function a() {
  console.log('1')
}
function a() {
  console.log('2')
}
a() // 2
```

**同名的变量和函数**

```js
console.log(a)
a()
function a() {
  console.log('a中')
}
var a = 3
console.log(a)
a = 4
console.log(a)

// 上面代码在执行前，变量和函数声明提升后代码如下：

function a() {
  console.log('a中')
}
console.log(a)
a()
a = 3
console.log(a)
a = 4
console.log(a)

// - 代码从上往下执行
// - 执行到console.log(a)时，打印函数a
// - 执行到a()时，调用函数，执行函数体中代码，输出 'a中'
// - a=3，给a重赋值，console.log(a)  打印出 3
// - a=4,给a重新赋值，console.log(a),打印出4
```

![image-20220919011252093](https://www.arryblog.com/assets/img/image-20220919011252093.d05cbbd1.png)

### 4、测试题

```js
console.log(a)
a()
function a() {
  console.log('a1')
}
var a = 2
function a() {
  console.log('a2')
}
var b = a
console.log(b)
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br></p></details>

```js
console.log(a)
a()
function a() {
  console.log('a1')
}
var a = 2
function a() {
  console.log('a2')
}
console.log(a)
var a = function () {
  console.log('a3')
}
console.log(a)
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br><br></p></details>

### 5、变量声明与函数声明总结

- 所有带 var 声明的变量和函数声明的函数，会被在代码执行前提升到当前作用域的最前面
- 同一作用域下出现相同的变量名，其本质没什么影响，因为变量提升只提升变量名
- 如果出现相同的变量名和函数名，则以函数为主，函数声明会被提升到当前作用域的最前面
- 在同一作用域中，如果出现相同的函数名，则以写在后面的为主。

## 八、算法的核心理论

算法有好有坏，判断算法好的重要标准就是算法的复杂度。

### 1、算法复杂度

- **算法复杂度：** 是指程序执行时需要的计算量（计算时长）和内存空间 （和代码是否简洁无关）
- **计算量：** 是指时间复杂度，也就是计算一个算法运行得到结果所花的时间
- **内存空间：** 是指空间复杂度，也就是计算一个算法运行得到结果所占用的内存空间的大小

> 提示：**时间复杂度**和**空间复杂度** 是衡量算法好环的两个非常重要的标准

**复杂度的概念**

- 不管是空间复杂度，还是时间复杂度，这个复杂度，他指的是一个**数量级**（方便 记忆和推广）
- 他不是具体的数字，因为没办法计算。因为一个算法，他到底耗时多少，占用多少内存空间，多少次 CPU 的计算，我们没法精准的计算。

> 为什么说没办法计算 ？我们来举个例子

```js
// 统计 1-n之间所有数的和
var sum = 0
for (var i = 1; i < n; i++) {
  sum += i
}
// 这里的耗时，是没法计算的，因为他会受n的大小的影响
// 如果n=10 、n=1000,n=100000等，那耗时完全不一样的。
// 而我们说的算法，指的是用这种方式来计算得到结果
```

我们不能精准的计算，那怎么办法呢 ？难道不算了吗 ？

我们说，如果不能精准的去算，但是可以粗略的去计算和判断。
这个粗略的方式就是我们提到的**数量级**的概念。

**数量级概念**

所谓的数量级，指数量的尺度或大小的级别，他是一个数的区间范围。

> 比如：我们常把人的资产分为以下几个范围，`n`表示资产

|          |  等级 4  |         等级 3          |        等级 2        |  等级 1  |
| :------- | :------: | :---------------------: | :------------------: | :------: |
| 级别名称 |   平民   |         小资本          |       千万富翁       | 亿万富翁 |
| 资产范围 | n<100 万 | n>=100 万 && n <1000 万 | n>=1000 万 && n<1 亿 |  n>1 亿  |

解读

- `< 99.9万`，看作一个等级，等级名字叫 平民
- `100万 ~ 1000万`看作一个等级 等级名字叫 小资本
- `1000万 ~ 1亿` 看作一个等级 等级名字叫 千万富翁
- `> 1亿`，看作一个等级 等级名字叫 亿万富翁

了解下复杂度和数量级的概念，我们来看下，算法复杂度的分类，他分为那几个类别（级别）

### 2、时间复杂度

我们说衡量一个算法好环的两个重要标准，就是算法的时间复杂度和空间复杂度，接下来我们先来了解时间复杂度。

- 如果代码还没有运行，我怎么能预知代码运行所花的时间呢？而且**受运行环境** 和**输入规模**的影响，代码的绝对执行时间是无法预估的，但是我们可以预估代码的基本操作执行次数
- 我们根据代码的**执行次数**，来判断算法的**时间复杂度**，他分为以下几个等级：

![image-20220919155842873](https://www.arryblog.com/assets/img/image-20220919155842873.7f168b57.png)

> O(n)：n 表示输入的规模（输入数据量），O(n)为时间复杂度函数

| 时间复杂度 | 说明                                                                                                                                                 |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| O(1)       | 表示执**行次数**是**可数的**，同时**和输入量无关** 无论执行次数是 1、1000，10000，只要是可数的，同时和输入量无关，都不影响它的级别                   |
| O(logn)    | 执行次数是输入量（输入数据量）的对数。 比如输入量是 100，计算量是 10，因为 102 是 100 当输入量是 1 亿时，计算量是 1 万 因为 100002 是 1 亿           |
| O(n)       | 执行次数和输入量（输入数据量）是**“一样”**的，这里的一样，并不是说完全相等，是指同等级别增加 比如输入量是 n，计算量是 1n,2n,100n，那都属于这个等级。 |
| O(n\*logn) | 执行次数= 数据量 _ 数据量的对数 = n _ logn                                                                                                           |
| O（n2)     | 执行次数=输入量的平方 输入 10，执行 100 次，输入 100，执行 10000 次                                                                                  |

> 上文中提到的，数据量和输入量可以理解为一个意思，就是计算的数据量大小

### 2.1、O(1) 级别-时间复杂度

- 只要是我们能够识别出来的一个计算量，同时和输入量多少没有关系，那他复杂度就是`O(1)`
- 比如，不管输入量是多少，执行次数都是固定的 1 次或 1000 次或 10000 万，都属于`O(1)`级别

```js
var arr = [1, 2, 3, 4] // arr可以是 arr=[1,2,3,4,5,6,7,8,.....1000] 等
// 时间复杂度 O(1)级别
// 不管arr 数组长度是多少，我的计算量都是1次，是可数的，不受输入量影响
function fn(arr) {
  console.log(arr[0])
}

//  时间复杂度 O(1)级别
// 不管arr 数组长度是多少，我的计算量都是2次，是可数的，不受输入量影响
function fn(arr) {
  console.log(arr[0] + arr[1])
}
// 时间复杂度 O(1)级别
// 不管arr 数组长度是多少，我的计算量都是3次，是可数的，不受输入量影响
function fn(arr) {
  console.log(arr[0] + arr[1])
  console.log(arr[3])
}
```

> 算法的时间复杂度，要达到这个级别，那真的有点痴心妄想，哈哈 ！

### 2.2 、O(logn) 级别-时间复杂度

- 执行次数是输入量（数据量）的对数
- 比如输入量是 100，计算量是 10，因为 102 是 100，
- 当输入量是 1 亿时，计算量是 1 万 因为 100002 是 1 亿

**常见的二分法：** 其时间复杂度就是这个级别，每一次执行次数都为原来的 1/2

二分法思想：小明吃面包

小明吃面包，面包总长度是 100cm，小明每次吃掉面包的一半，把面包吃得只剩下 1cm，要吃几次

- 第一次吃完剩余： 50cm
- 第二次吃完剩余：25cm
- 第三次吃完剩余：12.5cm
- 第四次吃完剩余：6.25cm
- 第五次吃完剩余：3.125cm
- 第六次吃完剩余：1.06cm
- 第七次吃完剩余：0.5

...

**二分查找-数组中的某个元素**

在升序的数组 `[1,2,4,5,7,12,15,18,30,32,45]`中，查找值为 15 的元素

**如果用二分查找，我们会如何查找**

- 我们首先会找到数组中的中间一个元素 12
- 然后拿 15 与 12 对比，如果小于 12，则在 12 左边元素中查找，如果大于 12，则在 12 的右边元素中查找
- 如果没找到，按上面查找方式，继续查找

> 具体如下图：

![image-20220930150644513](https://www.arryblog.com/assets/img/image-20220930150644513.5cfe713d.png)

二分查找：

- 每次查找，查找范围都会缩小为上一次查找范围的 1/2，其执行执数是输入量的对数
- 这个级别的时间复杂度，随着数据量的暴增，其时间消耗越来越趋向平缓。

> 算法的时间复杂度，达到 O(logn) 这个级别，那算是非常好的了，优秀

### 2.3、O(n)级别-时间复杂度

- 执行次数和输入量（数据量）是 **“一样”** 的，这里的一样，并不是说完全相等，是指同等级别增加
- 比如：输入量是 n，计算量是 1n,2n,100n，那都属于这个等级

> 常见的单层 for 循环，时间复杂度就是这个级别的

```js
// 时间复杂度 O(n)级别
// 执行次数受 输入量的影响
// 如果arr数组长度为10，执行10次，长度为100，执行100次，长度为10000，执行10000次
function fn(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

// 时间复杂度 O(n)级别
// 执行次数受 输入量的影响，同时是同等级别增加
// 如果arr数组长度为10，执行20次，长度为100，执行200次，长度为10000，执行20000次
function fn(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i])
    console.log(arr[i] + 10)
  }
}
```

> 算法的时间复杂度，达到 O(n)这个级别，算是正常范围，也不错

### 2.4、O(n\*logn)级别-时间复杂度

- 执行次数 = 数据量 _ 数据量的对数 = `n _ logn`
- 这种级别的时间复杂度，通常
  - 外层是一个 for 循环，时间复杂度为`O(n)`；
  - for 循环里面，来一个二分查找，二分查找复杂度是 `O(logn)`, 两者一组合，时间复杂度就是 `O(n*logn)`
- 我们后面算法中讲到的快速排序，其时间复杂度就是`O(n*logn)`级别，因为代码过于复杂，目前不做演示，后面学到再说

```js
// 以下代码没有任何实际的意义，只是用来简单理解O(n*logn)的时间复杂度
var arr = [1, 2, 3, 4, 5, 6, 7, 8]
for (var i = 0; i < arr.length; i++) {
  for (j = i; j > 1; j /= 2) {
    console.log('二分')
  }
}
```

> 算法的时间复杂度，达到 O(n\*logn)这个级别，只能算 ok，能接受，但肯定不是最优的

### 2.5、O(n2)级别-时间复杂度

- 执行次数（计算量）是输入量的平方
- 输入量是 10，执行 100 次，输入 100，执行 10000 次

> 常见的双层嵌套 for 循环，就是这个级别的时间复杂度

```js
// 时间复杂度 O(n^2)级别  n^2表示n的平方
// 执行次数是输入量的平方
// 如果n=10，则执行100次，如果n=100，则执行10000次
function fn(n) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      console.log(i + '-' + j)
    }
  }
}
fn(10)
```

> 算法时间复杂度，达到 O(n2)级别，几乎是没有办法用的，因为输入量越大，计算量暴增

### 2.6、总结

- 当 n 的取值足够大时，其算法耗时时间从小到大依次为：

> O(1) < O(logn) < O(n) < O(n\*logn) < O(n2)

- 当然，在编程世界中，各种各样的算法，除了上面提到的，还有许多不同形式的时间复杂度，如下

> O(n3)、O(mn)、O(2n)、O(n!)

大家在以后刷算法题时，有可能就会碰到。我们先提前知道 ！

最后我想强调

在工作中，我们很多时候的业务需求量根本就不大，所以出现时间复杂度 O(n2)，对我们程序本身也没有太大的影响，但我们要有意的去注意这些问题，不断提高自己的能力，让自己变得更有竞争力，能胜任一些更为复杂的工作。

面试考察的是你的基本功和未来的潜力，所以相对要求会更高，算法的时间复杂度在大厂面试中必问。

### 3、空间复杂度

- **空间复杂度：** 是指计算一个算法运行得到结果所占用的内存空间的大小
- 这个比时间复杂度相对要容易些，因为在**前端领域**，我们相对来说是**重时间**，**轻空间**的。
- 因为前端需要的更多的是运行的速度更快，比如我们常说的性能优化，本质就是在追求在尽可能最短的时间内来完成页面的渲染到呈现等。
- 因为前端是运行在浏览器中，相对来说内存空间是完全足够用的。只有那些做嵌入式开发的，内存相对比较少，需要节约着来用，对空间复杂度的要求会更高

> 空间复杂度的级别和时间复杂度的级别是一样的，也分为以下 5 个级别

![image-20220919155842873](https://www.arryblog.com/assets/img/image-20220919155842873.7f168b57.png)

| 等级       | 说明                                                                                                                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------------- |
| O(1)       | 输入量增大，并不会影响需要的空间 当然，输入量增大，本身输入量占的空间肯定是会变大的                                        |
| O(logn)    | 所需内存空间为输入量内存空间的的对数 输入量占内存空间为 100k，则对应增加内存空间为 10k                                     |
| O(n)       | 输入量增大，所需要的内存空间与输入量成正比 比如输入量所需空间为 n，则相应的内存空间也会增到 1n，2n，3n 等，都属于 O(n)级别 |
| O(n\*logn) | 所需内存空间 = 输入量空间 \* 输入量空间的对数                                                                              |
| O（n2)     | 输入量增大，其所需要的内存空间为原来的平方 如：输入量所占内存空间为 n，则其内存空间会增加到 n2                             |

### 3.1、O(1)级别-空间复杂度

> 输入量增大，并不会影响需要的空间

```js
// 空间复杂度为 O(1)
// 输入量增大，并不会影响所需要的空间，不管arr多在，则变量a,b对应空间相对稳定
function fn(arr) {
  var a = arr[1]
  var b = arr[2]
}
```

### 3.2、O(n)级别- 空间复杂度

- 所需内存空间为输入量内存空间的的对数

> 比如：常见的数组拷贝，输入的数组变大，那拷贝到对应的数组也就会变大

```js
// 空间复杂度为O(n)
// 数组arr的输入量变大，其对应 arr2占用的内存也就相应变大, 这里假设arr中存的都是基本数据类型
function deepClone(arr) {
  // ......
  var arr2 = [] //  占用的内存空间
  for (var i = 0; i < arr.length; i++) {
    arr2.push(arr[i])
  }
}
```

### 3.3、O(n2)级别- 空间复杂度

- 输入量增大，其所需要的内存空间为原来的平方

> 比如：常见的二维数组生成

```js
// 空间复杂度 O(n2)
// 当输入n为2时，所需要的空间为原来的4倍，当输入为7时，所需空间为原来的49倍
function fn(n) {
  var arr = []
  for (var i = 0; i < n; i++) {
    var arr2 = []
    for (var j = 0; j < n; j++) {
      arr2[j] = j
      arr[i] = arr2
    }
  }
  console.log(arr)
}
fn(7)
```

![image-20220919181709670](https://www.arryblog.com/assets/img/image-20220919181709670.32c3253f.png)

> 其它两种情况，这里没有更好的基础案例来演示，但相信大家学到这里肯定已经理解了时间复杂度和空间复杂度。

### 4、空间与时间的取舍

- 在前端这个领域，我们更注重时间复度，所以我们很多时候会牺牲一部分空间来换取时间。
- 如果实现同一个效果，有两种方法：
  - 方法一的时间复杂度 < 方法二的空间复杂度
  - 方法一的空间复杂度 > 方法二的空间复杂度

这个时候，我们会可能会选取方法一，因为前端更看重时间。当然在某些情况下，也有可能选择方法二，因为更看重空间内存的占用。具体情况以实际业务需求为主。

**重要提示：**

- 程序员是必须掌握算法复杂度
- 如果你没有复杂度的概念和敏感度，写程序是非常危险的
- 代码功能测试正常，但数量大了，程序就会崩溃

## 九、递归与深克隆

深入浅出 递归 和 深克隆

### 1、递归的定义和理解

- 所谓的递归 可以简单理解为一个函数的内部语句**调用这个函数自身**，一次一次的重复调用自身，直到函数执行到某一次时，因达到某种条件而终止了对自己的调用，然后返回最终结果。
- 递归是一种较为 **高级的编程技巧**，通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解 。

#### 我们使用 5 的阶乘来举例，了解什么是递归 ？

- 5！表示 5 的阶乘 5 的阶乘=`5*4*3*2*1` 4 的阶乘=`4*3*2*1` 3 的阶乘=`3*2*1`
- 转换思路： `5!=5*4!` `4!=4*3!` `3!=3*2!` `2!=2*1!` `1!=1`

![image-20211223222447469](https://www.arryblog.com/assets/img/image-20211223222447469.75c30cbb.png)

```js
// 书写一个函数，这个函数内部自己会调用自己，从而形成递归
// 函数的功能是计算n的阶乘，n的阶乘是 n*(n-1)的阶乘
// n! = n * (n-1)!
function factorial(n) {
  // 递归的出口，当n=1时，返回1
  if (n == 1) return 1
  // 如果询问的不是1的阶乘，就返回 n * (n-1)
  return n * factorial(n - 1)

  // 三目运算符
  // return n == 1 ? 1 : n * factorial(n - 1);
}

var result = factorial(5) // 调用函数
console.log(result) // 输出结果
```

使用递归需要满足两个条件：

- 边界条件：确定递归何时终止，找到递归的终止条件。也称之为**递归出口**
- 递归模式：大问题如何分解为小问题，子问题需与原问题同样的事，且规模更小 。也称为**递归体**

**递归的简单理解：**

- 就是函数内部调用函数自身，达到某个条件之后，停止调用

### 2、斐波那契数列

斐波那契数列是这样的数列：`1,1,2,3,5,8,13,21` 。求第 n 项的斐波那契数列

**找规律**：

- 第 1 项=1
- 第 2 项=1
- 第 3 项是=第 1 项+第 2 项
- 第 4 项= 第 2 项+第 3 项
- 依次类推，后面每一项都等于前两项之后

**求出第 n 项的值**

- 递归出口： n=1 时和 n=2 时分别返回 1 2
- 递归模式：f(n)=f(n-1) +f(n-2)

**求出 n 项的斐波那契数列**

- 利用 for 循环结合递归，把每一项的值计算得到，然后拼接成字符串

```js
// 这个函数的功能是返回斐波那契数列中下标为n的那项的值
function fibonacci(n) {
  // 数列的第1项和第2的项值是1
  if (n === 1 || n === 2) return 1

  // 斐波那契数列的本质特征就是每一项，等于前面两项的和
  return fibonacci(n - 1) + fibonacci(n - 2)
}

var result = '' // 用来拼接每一项的值
for (var i = 1; i <= 10; i++) {
  //  求出n项的斐波那契数列
  result += fibonacci(i) + ','
}
console.log(result)
```

重点强调：

如果你在面试的时候，用的递归来做这道题，那绝对是完蛋了，因为他的时间复杂度为 2n

这完全没法用，你只要把值稍微改大点，电脑直接就崩溃了。

递归版 - 时间复杂度

- 我们假设，现在我们要找的是第 8 项的等差数列，那我们内部求出第 8 项的值，计算次数达到了 2n
- 再加上要求出整个数列，还要一次 for 循环，整个的级别已经远远超过 O(n2)了

![image-20220930162236360](https://www.arryblog.com/assets/img/image-20220930162236360.10b21095.png)

### 3、斐波那契数列 - 优化版

- 我们用两个变量分别来记录当前循环的前两项
- 然后定义一个变量来计算当前项得结果，然后再更新下前两项的值，以便下一轮循环用到

> 本次优化版本用到：双指针、字符串拼接

```js
// 1,1,2,3,5,8,13,21
function fibnocci(n) {
  var n1 = 1
  var n2 = 1
  var item // 临时存储每一项值
  var str = '' // 拼接字符串
  if (n == 1) str = '1'
  if (n == 2) str = '1,1'
  if (n >= 3) str = '1,1'

  for (var i = 3; i <= n; i++) {
    item = n1 + n2 // 计算得到当前项
    n1 = n2 // n1向右移
    n2 = item // n2 向右移
    str += ',' + item // 拼接得到的 斐波那契数列
  }
  return str
}
console.log(fibnocci(15)) // 1,1,2,3,5,8,13,21,34,55,89,144,233,377,610
```

双指针版 - 时间复杂度

- 整个过程下来，只有一层 for 循环，所以时间复杂度为 O(n)
- 空间复杂度为 O(n)，内存空间的占用，多了 4 个变量，其中 str 的空间占用受输入量 n 的影响最大，n 输入越大，str 的字符串越长。

### 4、数组的深克隆

以下数组的克隆，只考虑数组中嵌套数组的情况，因为我们还没有学对象，等我们学完对象后，我们会再优化一个版本。

**深克隆函数功能**

- 用户希望在调用函数时，传入一个数组，然后就克隆一个和传入数组一模一样的数组出来。
- 这两个数组只是长得一样，但是两个完全独立的数组，互不干扰。即两个数组指向堆内存中的不同地址。

> 代码实现如下

```js
// 深克隆数组
function deepClone(arr) {
  if (!Array.isArray(arr)) return
  var result = [] // 克隆成功后的结果数组
  for (var i = 0; i < arr.length; i++) {
    // 判断，如果是基本数据类型，则直接push到数组中
    // 不是数组就如何，是数组如何
    if (Array.isArray(arr[i])) {
      // 如果是数组,返回的数组是不是要push到上一个数组中去
      result.push(deepClone(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

var arr = [1, 2, 3, ['A', 'B', ['我', '和', '你']]]
var arr2 = deepClone(arr) // 克隆数组
console.log(arr2 === arr)
arr2[3][2][0] = 1 // 更改数组中元素
console.log(arr)
console.log(arr2)
```

数组克隆 - 递归算法复杂度

- 时间复杂度为 O(n)，只有一层 for 循环，其输入量与执行次数成正比
- 空间复杂度为 O(n)，返回结果数组会受输入量的影响，输入量越大，返回结果数组越大

同时在中间会产生一些临时的数组。
