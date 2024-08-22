# JavaScript 错误处理、LHS 左查询、RHS 右查询

错误处理在编程中的重要性毋庸置疑，所有现代桌面浏览器都会通过控制台暴露错误。

作为开发人员，了解这些错误，并正确的处理他们是非常必要的。

接下来我们会从以下三个方面来展开讲解

- 常见的错误类型
- `try...catch` 错误捕获与处理
- `finally` 子句
- `throw` 抛出自定义错误

## 一、常见错误类型

代码执行过程中会发生各种类型的错误，每种类型的错误都对应一个**错误对象**，常见的错误类型有以上 8 种

- SyntaxError 语法错误
- ReferenceError 引用错误
- TypeError 类型错误
- RangeError 范围错误
- URIError URI 错误
- EvalError eval 错误
- InternalError 内部错误（非标准）
- Error 错误对象，用于自定义错误

> 接下来，我们就一个一个简单介绍下

### 1、SyntaxError 语法错误

JavaScript 引擎发现了不符合语法规范的代码，会出现此错误

```js
// 变量名不规范
var this = 1;
var 2a=3;

// if 少了 }
if (1) {
    console.log(2);
```

![image-20221025184448555](https://www.arryblog.com/assets/img/image-20221025184448555.4b98b667.png)

### 2、ReferenceError 引用错误

会在找不到对象时发生，比如常见的访问不存在的变量时，就会报**引用错误**

```js
console.log(a) // a变量不存在
var num = c // c变是不存在
```

![image-20221025184933070](https://www.arryblog.com/assets/img/image-20221025184933070.90bdfc0e.png)

### 3、TypeError 类型错误

- 当变量不是预期类型时，就会引发这种类型错误。
- 比如常见引发这一错误的行为：把一个基本数据类型当函数调用。

```js
var a = 1
a()

console.log('name' in true) // true不是一个对象

var arr = [1, 2, 3]
console.log(arr.call(null)) // arr 不是一个函数
```

![image-20221025185530556](https://www.arryblog.com/assets/img/image-20221025185530556.709d2839.png)

### 4、RangeError 范围错误

当数字超出允许的值范围时，将会抛出此类型的错误

```js
var arr = [1, 2, 3]
arr.length = -1 // 数组长度

var num = 1.233
num.toFixed(-1) // 参数在0-100之间
```

![image-20221025194106345](https://www.arryblog.com/assets/img/image-20221025194106345.c694c986.png)

### 5、URIError URI 错误

在了解 URIError 错误之前，我们先来了解下什么是 URI、URL、URN

- URI（Uniform Resource Identifier）：统一资源标识符 ，用来唯一标识资源，是一种语义上的抽象概念
- URL（Uniform Resource Locator）：统一资源定位符，用来定位唯一的资源， 必须提供足够的定位信息
- URN（Uniform Resource Name）：统一资源名称，定义了资源的身份（命名）

**他们三者的关系如下图**

![image-20221025201015940](https://www.arryblog.com/assets/img/image-20221025201015940.2dcdc6cd.png)

如果用一个人来做比喻的话

- URN 相当人的身份证号，唯 一标识。
- URL 相当于找到这个人的方式，如住址: x 省 xx 市 xx 区 ... xx 单元 xx 室的身份证号为 xxx 的人
- URI 相当身份证，上面有身份证号，也有地址。

**如果用一个网址来表示的话**

- URL: `https://www.arryblog.com/guide/html5/html-html5-course.htm`
- URN:`guide/html5/html-html5-course.htm`
- URI: 可以是上面的 ULR，也可以是 URN

### 6、URIError 错误

- URL 错误只会在`encodeURI()` 和 `decodeURI()` 传入了格式错误的 URI 时发生。但我们很难看到这种错误，因为前面两个函数非常稳键。
- `encodeURI()` 对传入的 URI 进行编码
- `decodeURI()` 对传入的 URI 进行解码

```js
var url = 'https://www.arryblog.com/html/文档笔记.html'
var enurl = encodeURI(url)
var deurl = decodeURI(enurl)
console.log(enurl)
console.log(deurl)
```

![image-20221025203328098](https://www.arryblog.com/assets/img/image-20221025203328098.615b3899.png)

### 7、EvalError eval 错误

在使用`eval()` 函数时发生异常时抛出错误。因为`eval`被禁用，所以了解就好。

### 8、InternalError（非标准）内部错误

该错误在 JS 引擎内部发生发生异常时会抛出。如果真发生了这种错误，很可能代码哪里弄错了或者有危险了。

### 9、Error 自定义错误

```js
throw new Error('自定义错误')
```

![image-20221025204448640](https://www.arryblog.com/assets/img/image-20221025204448640.dc5b0f56.png)

### 10、try ... catch 语句

`try...catch` 语句用来处理 JS 中的异常

> 其语法如下

```js
try {
  // 可能会出错的代码
} catch (e) {
  // 出错时要做什么
}
```

如果`try`块中的代码发生错误，则会立即退出执行，并跳到`catch`块中，`catch`块此时会接收到一个对象，这个对象包含发生错误的相关信息。

```js
var a = 1
try {
  // 可能出错的代码
  a()
  console.log(2)
} catch (e) {
  // 出错时要做的事
  console.log(e)
  console.log(e.message)
}
```

![image-20221025210450182](https://www.arryblog.com/assets/img/image-20221025210450182.2d9ecf16.png)

`try`捕获到错误后,不会再执行`try`错误后的代码，同时将错误交给`catch`来处理，然后再执行后面的代码

```js
var a = 1
try {
  // 可能出错的代码
  a()
  console.log(22) // 不执行
} catch (e) {
  // 出错时要做的事
  console.log(e) // 执行
}
console.log('try后面代码' + a) // 执行
```

![image-20221025210852010](https://www.arryblog.com/assets/img/image-20221025210852010.e4653d2b.png)

### 11、finally 子句

- `finally`子句是`try...catch`语句中的一部分，为可选的
- 不管`try`中代码是否发生错误，最终都会执行`finally`子句中的代码

```js
try {
  // 可能会出错的代码
} catch (e) {
  // 出错时要做什么
} finally {
  //永远都会执行的代码
}
var a = 1
try {
  // 可能出错的代码
  // a();
  console.log(22)
} catch (e) {
  // 出错时要做的事
  console.log(e)
} finally {
  console.log('不管try中代码是否报错，我都会执行')
}
```

![image-20221025211437695](https://www.arryblog.com/assets/img/image-20221025211437695.cd292c47.png)

`try`和`catch`中的`return` 语句也无法阻止 `finally` 代码块的执行

```js
var a = 1
function fn(a) {
  try {
    // 可能出错的代码
    a()
    return 1
  } catch (e) {
    // 出错时要做的事
    return 2
  } finally {
    return 3
  }
}
console.log(fn(a))
```

![image-20221025211905573](https://www.arryblog.com/assets/img/image-20221025211905573.a500dd8f.png)

### 12、throw 抛出自定义错误

`throw` 操作符，用于抛出自定义错误。`throw` 操作符后面必须有一个值，值可以是任意类型。

```js
throw '123'
throw 'abc'
throw true

console.log(2) // 不会被执行

// 使用 throw操作符时，代码立即停止执行，除非用try...catch捕获了抛出的错误
```

`throw` 与 `try...catch` 结合

```js
try {
  throw 123
} catch (e) {
  console.log(e.message) // undefined
}
console.log(2) // 正常执行
```

可以自定义一个错误类型的消息，浏览器会像处理自己生成的错误一样来处理这个自定义错误

```js
try {
  // throw new Error("自定义Error错误");
  // throw new TypeError("自定义TypeError错误");
  // throw new SyntaxError("自定义SyntaxError错误");
  throw new RangeError('自定义RangeError错误')
} catch (e) {
  console.log(e)
}
console.log(2) // 正常执行
function fn(arr) {
  try {
    return arr.slice(0, 1)
  } catch (e) {
    throw new TypeError('arr参数，必须是一个数组')
  }
  console.log(arr) // 上面抛出错误，这里不会执行
}
fn(1)
```

![image-20221025214614144](https://www.arryblog.com/assets/img/image-20221025214614144.786c0fc4.png)

## 二、LHS 和 RHS 查询

`LHS`字面理解是 `Left Hand Sid` 即左手边，`RHS`字面理解是 `Right Hand Side` 即右手边。

> 那谁的左边和右边呢？

### 1、LHS 和 RHS 片面的理解

一般**简单片面**的理解为 **赋值操作符的左边和右边**

- 当**变量**出现在赋值操作符的左侧时进行**LHS 查询**，出现在右侧时进行**RHS 查询**
- LHS 查询是试图找到变量的容器本身，然后对其赋值
- RHS 查询是试图找到变量的中对应的值

```js
var a
var b

a = 1
b = a
```

> 对以上代码进行解读

① 编译阶段

会在当前作用域中声明 2 个变量 a 和 b

**② 执行阶段**

- `a = 1`，这里的 a 会进行 LHS 查询，查询是否存在变量 a，并不关心 a 的值是什么。如果变量 a 存在，就给他赋值为 1
- `b = a`，首先会对 a 进行 RHS 查询，查询是否存在变量 a，存在，并把对应的值 1 拿到
- 然后再对 b 进行 LHS 查询，查询是否存在变量 b，存在，并把对应的值 1 赋值给到变量 b

### 2、LHS 和 RHS 更准确的理解

通过上面分析，我们知道

- **LHS 查询**只关心是否存在这个变量，并不关心变量对应的值是什么
- **RHS 查询**除了关心变量是否存在之外，还关心变量中对应的值，因为最终就是为了找到变量对应值。

> 所以，更准确的说
>
> - LHS 查询可以理解为**赋值操作的目标是谁 ？** 即我要把值赋值给谁
> - RHS 查询可以理解为 **赋值操作的源头是谁？** 我要用什么来内容完成赋值

```js
function fn(c) {
  console.log(c)
  console.log(b)
  console.log(a)
  a = 1
  var b = a
  b()
}
fn(2)
```

> 以上代码在执行过程中，经历了几次 LHS 查询和 RHS 查询

我们先来分析下

整个代码从编译到执行的整个过程

> **① 全局代码运行时**

**编译阶段**

声明函数 fn，fn 是 window 对象身上的属性，即`window.fn=function(){......}`

**执行阶段**

`fn(2)`在调用前，会对 fn 进行 **RHS 查询**，查询是否存在 fn，并拿到 fn 的值，然后开始执行

> **② fn 函数调用时**

**编译阶段：**

- 在当前作用域中声明 2 个变量 c 和 b，同时`c = 2`
- 这个过程 c 也会进行 **LHS 查询**，找到是否存在变量 c，然后存在将值 2 赋值给到他

**执行阶段：**

- 当执行到`console.log(c)` ，会对 c 进行 **RHS 查询**，取得 c 的值为 2，还会对 console 进行 **RHS 查询**

- 当执行到 `console.log(b)`，会对 b 进行 **RHS 查询**，取得 c 的值为 undefined，对 console 进行 RHS 查询

- 当执行到`console.log(a)`，会对 c 进行 **RHS 查询**，发现找不到变量 a，然后报出 **引用错误**，....

- 当执行到

  ```
  a = 1
  ```

  ，会对 a 进行

  LHS 查询

  ，发现找不到变量 a

  - 在非严格模式下，此时会全局作用域中创建一个同名的变量，然后将 1 赋值给 a
  - 在严格模式下，会报 **引用错误**，找不到变量 a

- 当执行到

  ```
  b = a
  ```

  - 首先对 a 进行 **RHS 查询**，找到变量 a，并取得 a 的值 1
  - 然后对 b 进行 **LHS 查询**，找到变量 b，把对应的值 1 赋值给 b

- 当执行到`b()`时，会对 b 进行 RHS 查询，找到了，但 b 的值不是一个函数，你对 b 执行函数调用，会抛出类型错误（TypeError）

### 3、总结：LHS 和 RHS

**LHS 查询**

- 只关心有没有要查找的变量，并不关心变量的值是多少
- 如果找到这个变量，就将对应值赋值给他。
- 如果找不到，在严格模式下，会报引用错误，非严格模式下，会在全局作用域中创建一个同名的变量
- LHS 查询可以理解为 **赋值操作的目标是谁 ？** 即我要把值赋值给谁

**RHS 查询**

- 他不仅关心有没有要查找的变量，还关心变量的值是多少，最终是要取到变量的值。
- 如果找不到变量，则会报引用错误，如果找到，则把对应的值拿到
- 如果对找到的变量，做不合理的操作，会抛出类型错误（TypeError）
- RHS 查询可以理解为 **赋值操作的源头是谁 ？** 我要用什么来内容完成赋值

> JS 引擎在查找某个变量时，会先判断是要 LHS 查询还是 RHS 查询，然后再根据对应规则去查询变量，做相应处理

## 三、总结重难点

总结上一章节和本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 什么是执行上下文、执行上下文的分类 ？

> 执行上下文分类：全局执行上下文，函数执行上下文，eval 执行上下文

- 什么是执行上下文栈（调用栈）？
- 什么是栈溢出 ？什么情况下会出现栈溢出
- 什么是变量对象（VO)、活动对象及创建过程 ？
  - 第一步创建一个`AO = { }`
  - 第二步处理 arguments，把 arguments 当对 AO 对象身上的属性
  - 第三步处理形参和对应实参 `AO = {a: 2}`
  - 第四步处理 函数内部的函数声明 `AO = {fn: function(){ }}`
  - 第四步处理 函数内部的 变量声明 `AO = {b: undefined}`
- 说说变量查找的整个过程 ？
- 掌握`try...catch`的用法

### 2、难点

- 什么是闭包 ？
- 什么情况下会形成闭包 ？
- 闭包主要是解决什么问题 ？
- 闭包的实际应用
- 什么是垃圾回收 ？
- 垃圾回收的两种策略 ？如何手动标记垃圾
- 什么是内存泄露，什么是内存溢出 ？
- 闭包会造成内存泄露吗 ？
- IIFE 的的作用
