# JavaScript 数据类型和类型转换

系统性的学习和掌握数据类型、类型转换是学好 JavaScript 的前提。

## 一、数据类型简介和检测

本节课我们来学习数据类型的简介和检测，我们会从以下四个方面来讲解

- 为什么需要数据类型
- JS 中数据类型的分类
- JS 中变量的类型
- 如何检测变量和值的类型

### 1、为什么需要数据类型

本节课我们来讲解 JS 中的数据类型。在正式学习数据类型前，我们先来思考一个问题 。

**为什么需要把数据分成不同的类型？**

- 在现实生活中，我们为什么要把东西分类呀？因为不同的东西有不同的特性，我们需要用不同的方式来对待他。比如你会用肥皂洗衣服，但你会用他来洗苹果吗？肯定不会是吧。
- 那么在程序中也是一样，程序需要处理大量的不同数据，如果用同一种方式处理那肯定是处理不了的。所以在计算机中同样需要将数据分成不同类型，然后用不同的方式来处理和计算。

**我们来看一段 js 代码**

```html
<script>
  var a = 1 + 1 //2
  var b = '1' + '1' // 11
  console.log(a, b) // 2  11
</script>
```

注：

- 计算机他如何知道 1+1 的结果是 2，而'1'+'1'的结果是 11 呢？
- 他就是通过数据类型来判断的。上面的 1+1 是数字的 1+1,他就会按照数字运算规则来计算。
- 而下面的的'1'+'1' 是字符串的'1'+'1' 那他就会根据字符串的拼接来操作，结果就是 11。

**通过这个例子，我们知道**

数据类型背后，隐藏的是编译器或者解释器对数据处理方式的定义。把数据分成不同的数据类型，然后用不的处理的方式处理，这就显得非常有必要了。

所以我们需要了解 JS 中有那几种不同的数据类型，他们有什么特性，计算机是如何来处理这一类型的数据。

接下来我们就一起来学习下，JS 中数据类型的分类

### 2、JS 中数据类型的分类

在 Javascript 中，从大的层面来讲，分为两种数据类型

**7 种基本数据类型（值类型）**

- String 字符串类型
- Number 数字类型
- Boolean 布尔类型
- Null 类型
- Undefined 未定义
- Symbol 符号
- BigInt 任意精度的整数

**引用数据类型（对象类型）**

- 对象（Object）、数组（Array）、函数（Function）
- 还有两个特殊的对象：正则（RegExp）和日期（Date）。

### 3、变量的类型

- 在 JS 中，变量的数据类型是由变量中存储的值的数据类型来决定的。

```html
<script>
  var num = 1 // num 的类型是数字类型
  var str = '1个苹果' // str 的类型是字符串类型
</script>
```

- 同时 JS 是一种弱类型的语言，他不用提前声明变量的类型。
- 代码运行时，变量的数据类型是由`JS引擎根据=右边变量的数据类型`来判断的。
- 运行完毕之后，变量就确定了数据类型。
- 也就是说相同的变量在不同的时刻可以是不同的类型。

```html
<script>
  var a = '小明' // 此时a是 string字符串类型
  a = 23 // 此时a就是 number 数字类型
  a = true // 此时a就是 boolean布尔型
</script>
```

### 4、typeof 操作符

- JS 有很多种数据类型，我们需要有一种手段来确定变量的数据类型，那么 **typeof 运算符**就可以做到。
- 使用 typeof 运算符可以检测**值**或者**变量**的类型。
- 用法：
  - 检测值类型 `typeof 值;` 或 `typeof(值)`
  - 检测变量类型 `typeof 变量名;` 或 `typeof(变量名)`
  - 如果 typeof 标测的是一个表达式，则一定要带上括号,如 `typeof(2+'2');`

#### 4.1 、检测值的值类

如下代码，typeof 检测返回值的类型，然后 console.log 把值的类型在控制台输出。

```html
<script>
  console.log(typeof 1) // number
  console.log(typeof '艾编程') // string
  console.log(typeof '1') // string
  console.log(typeof 1) // number
  console.log(typeof (2 + '2')) // string
</script>
```

![image-20220907170026976](https://www.arryblog.com/assets/img/image-20220907170026976.a38d4b12.png)

#### 4.2 、检查变量的类型

```html
<script>
  var a = 1,
    b = '艾编程'
  console.log(typeof a) // number
  console.log(typeof b) // string
</script>
```

#### 4.3 、注意区分变量和值

变量是不能用`' '`单引号或`""` 双引号包裹的，用`''`或`“”`包裹的是字符串

```html
<script>
  var a = 1
  console.log(typeof 'a') //string
  console.log(typeof a) // number
</script>
```

#### 4.4 、typeof 返回值的类型

typeof 返回值的类型都是字符串类型

```js
console.log(typeof 1) // number
console.log(typeof typeof 1) // string
```

## 二、5 种基本数据类型

在接下的数据类型学习中，我们主要学习`Number`、`String`、`Boolean`、`null`、`undefined` 的 5 种基础数据类型

关于`BigInt`和`Symbol`在后面的 ES6 中，我们再来学习。

### 1、Number 数字类型

关于数字类型，我们会从以下 5 个方面来展开讲解

- 什么是数字类型的数据
- 不同进制的数字
- 数值中的最大值和最小值
- 数字型的三个特殊值
- isNaN()方法

#### 1.1 、什么是 Number 数字类型

- 所有数字都是 Number 类型，包括整数（正负数）和浮点数（小数）；
- 在表达小于 1 的数时，小数点前面的 0 可以去掉，比如 `0.2`可以写成`.2`

```html
<script>
  var a = 100
  var b = -219
  var c = 0.22334 // 0.22334 是浮点数（小数）
  var d = 0.22 // .22表示0.22  是浮点数（小数）
  console.log(typeof a) // number
  console.log(typeof b) // number
  console.log(typeof c) // number
  console.log(typeof d) // number
</script>
```

#### 1.2、不同进制的数字

- 最常见的进制有**二进制**、**八进制**、**十进制**、**十六进制**。
- 不过我们用的最多的就是十进制，**逢 10 进 1**
- 在 JS 中不同进制的数字是如何表示的

**1.2.1、二进制数**

- 二进制数以 `0b` 开头
- 二进制数字序列范围 `0-1`，逢 2 进 1

```html
<script>
  var a = 0b10
  var b = 0b101
  console.log(a, b) // 2 5
</script>
```

> 不同进制在线转换工具：[https://tool.lu/hexconvert/(opens new window)](https://tool.lu/hexconvert/)

**1.2.2、八进制数**

- 八进制数值以 0 开头
- 八进制数字序列范围 0-7 ,逢 8 进 1

```html
<script>
  var a = 012
  var b = 024
  var c = 09 // 这里的09是10进制，因为8进制中，最大数不能超过7
  console.log(a, b) // 10 20
</script>
```

**1.2.3、十六进制数**

- 十六进制数以 0x 开头
- 十六进制序列范围 0-9 以及 A-F

```html
<script>
  var a = 0xa
  var b = 0x14
  console.log(a, b) // 10 20
</script>
```

#### 1.3、科学记数法

- 对于非常大或非常小的数，我们可以用科学记数法来表示
- e7 表时 10 的 7 次方，小数点向右移动 7 个点的位置
- e-7 表示 0.1 的 7 次方，小数点向左移动 7 个点的位置

```html
<script>
  var a = 3.15e7
  var b = 3.2e-4
  console.log(a) // 31500000
  console.log(b) // 0.00032
</script>
```

#### 1.4、数字中最大值和最小值

- 由于内存的限制，js 中不支持表示这个世界上所有数值。js 中能表示的
- 最小数保存在 `Number.MIN_VALUE` 中
- 最大数保存在 `Number.MAX_VALUE` 中

```html
<script>
  console.log(Number.MAX_VALUE) // 最大值 1.7976931348623157e+308
  console.log(Number.MIN_VALUE) // 最小值 5e-324
</script>
```

#### 1.5、正无穷和负无穷大

- 因为计算机内存限制，js 中不支持表示这个世界上所有数值。
- 如果计算的数值超出了 js 能表示正数范围，则会以 `Infinity` 正无穷表示
- 如果计算的数值超出了 js 能表示负数范围，则以`-Infinity` 负无穷表示

```html
<script>
  console.log(Number.MAX_VALUE * 2) // Infinity
  console.log(-Number.MAX_VALUE * 2) // -Infinity
</script>
```

#### 1.6 、NaN

- `NaN(Not a number)` 不是一个数字
- NaN 用 typeof 检测，得到的结果是 number，说明 NaN 是一个数字类型
- 可以理解为 NaN 不是数字的数字类型

```html
<script>
  console.log(typeof NaN) // number
</script>
```

注：

为了帮助你理解 NaN 不是数字的数字类型这句话，我举一个生活中的例子来说明。

- 比如一个人，他特别的坏，坏到极点了，那很多人就会说，这个人压根就不是个人，人那有这么坏的。
- 但实际上是个人吗 ？他是人这个类别，但是大家都不把他当人看。

NaN 它是数字类型，但他不能代表任保数字含义，所以他不是一个数字。

**NaN 的作用**

- NaN 表示本来要返回的数值操作失败了
- 两个数值做运算，如果操作失败了，就会返回 NaN，而不是抛出错误
- 用 0 除任意数值在其他语言中通常都会导致错误，从而中止代码执行。
- 但是在 js 中，不会，而是返回 NaN

**关于 NaN 的运算**

- 0 除以 0 的结果是 NaN
- 在数学运算中，如果得不到数字的结果，其结果往往是 NaN。
- 任何数与 NaN 做运算，都会得到 NaN，除了与字符串拼接。

```html
<script>
  var a = 0 / 0
  var b = 'a' - 'b'
  var c = '我' - '你'
  var d = NaN + 1
  var str = NaN + '1'
  console.log(a, b, c, d, str) // NaN  NaN  NaN NaN 'NaN1'
</script>
```

- NaN 自己不与自己相等

```html
<script>
  console.log(NaN == NaN) // false
</script>
```

#### 1.7、isNaN()

- 这个函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”
- isNaN 会尝试把它个值转换为数值，如果转换成数值字成功，也会认为是数字，则结果也是 false
- 特别注意：isNaN 并不是用来判断这个参数是不是`NaN`这个值
- 如果参数是数值，则返回 false，否则返回 true

```html
<script>
  console.log(isNaN(1)) // false  1是一个数字，所以返回false假的
  console.log(isNaN('1')) // false '1'被转成数字1，所以返回false
  console.log(isNaN('我')) // true  '我'不是一个数字，是正确的，所以返回true
  console.log(isNaN(NaN)) // true  NaN不是一个数字，是正确的
  console.log(isNaN(Infinity)) // false  Infinity是数字
</script>
```

#### 1.8、Number 数字类型总结

| 相关知识点             | 说明                                                                      |
| :--------------------- | :------------------------------------------------------------------------ |
| 什么是数字类型的数据   | 所有数字都是 Number 类型，包括整数（正负数）和浮点数（小数）；            |
| 不同进制的数字         | 二进制数以`0b`开头 八进制数值以`0`开头 十六进制数以`0x`开头               |
| 科学记数法             | 5e4 表示 `50000` 5e-4 表示 `0.0005`                                       |
| 数字中的最大值和最小值 | 最大值 `Number.MAX_VALUE` 最小值 `Number.MIN_VALUE`                       |
| 数字型的三个特殊值     | 正无穷`Infinity` 负无穷`-Infinity` NaN 不是数字的数字类型                 |
| NaN                    | 不是数字的数字类型                                                        |
| isNAN( )               | 判断一个值或变量是否为非数字的类型 不是数值 返回 `true` 是数值返回`false` |

### 2、String 字符串类型

- 字符串就是 "人类的自然语言"
- 字符串要用引号包裹，双引号 或者 单引号均可

#### 2.1、定义字符串

用`英文`状态下的`""`双引号 或 `''`单引号 包裹起来值就是字符串类型的值

```html
<script>
  var a = '123'
  var b = '123'
  console.log(a, b) // 123  123
  console.log(typeof a, typeof b)
</script>
```

#### 2.2、分清数字和字符串

数字`11`和字符串`'11'`在语义上是不同的，前者表达一个数量，后者是一个文本

```js
typeof 11 // number
typeof '11' // string
```

#### 2.3、双引号 与 单引号嵌套

双引号里面可以嵌套`''`单引号，单引号也可以嵌套`""`双引号

```html
<script>
  var str1 = "我想对你说：'你才是我爱的人'"
  var str2 = '我想对你说："你才是我爱的人"'
  console.log(str1)
  console.log(str2)
</script>
```

> 但双引号里不能直接嵌套双引号，单引号里也不能直接嵌套单引号，以下是错误写法

![image-20220907170447886](https://www.arryblog.com/assets/img/image-20220907170447886.cbe69b6b.png)

> 单引号或双引号，在匹配的时候，都是以就近原则来进行匹配的。

#### 2.4、转义字符 \

如果需要在字符串中使用特殊字符，可以用**转义符** `\` 转义

| 转义符 | 解释说明                       |
| :----- | :----------------------------- |
| `\n`   | 换行符， `n` 是 newline 的意思 |
| `\\`   | 反斜杠 `\`                     |
| `\'`   | `'`单引号                      |
| `\"`   | `"`双引号                      |
| `\t`   | tab 缩进                       |

```html
<script>
  var str1 = '我想对你说："你才是我爱的人"'
  var str2 = "我想对你说：'你才是我爱的人'"
  var str3 = '我想对你说：\n你才是我爱的人'
  var str4 = '我想对你说：\\你才是我爱的人'
</script>
```

#### 2.5、字符串的拼接

- `+` 号，可以用来拼接两个 或 多个字符串

```html
<script>
  var x = '我' + '爱' + '你'
  console.log(x) // 我爱你
</script>
```

- 字符串与任何类型拼接，得到的都是字符串

```html
<script>
  var x = '1' + 3
  var a = NaN + '1'
  var b = Infinity + '1'
</script>
```

- 字符串与变量拼接

```html
<script>
  var a = '张三'
  var b = '小丽'
  var str = a + '对' + b + '表白了！'
  console.log(str) //张三对小丽表白了
</script>
```

> 提示：变量不能添加引号

#### 2.5、空字符串

空字符串，直按书写空的 `''`单引号 或 `""`双引号 表示空字符串

```js
var str = ''
var str2 = ''

// 要区分 var str=' ' 与 var str='' 前者是加了一个空字符，后者没有
```

**空字符串有什么用 ？**

- 可以用来转换数据类型

```html
<script>
  var a = 1
  a = a + ''
  console.log(typeof a) //string
</script>
```

- 可以**提前预设变量保存值为字符串类型**，如果不设置为`''`，有可能会出现错误的结果

```html
<script>
  // 生成任意6位数的验证码
  var result = ''
  for (var i = 0; i < 6; i++) {
    // parseInt(Math.random() *10 ) 生成 0-9 之间的正数
    result = result + parseInt(Math.random() * 10)
  }
  console.log(result) // 生成结果为 任意0-9之间的6位数   232948
</script>
<script>
  var result
  for (var i = 0; i < 6; i++) {
    result = result + parseInt(Math.random() * 10)
  }
  console.log(result) // NaN
</script>
```

#### 2.6、length 属性

通过 length 属性，可以获取整个字符串的长度

```html
<script>
  var a = '英文的I Love You 是什么意思！'
  console.log(a.length) //  20
  var str1 = ''
  var str2 = ' '
  console.log(str1.length) // 0
  console.log(str2.length) // 1
</script>
<script>
  var str = '我就是我，不一样的花朵'
  console.log(str.length) // 11
</script>
```

#### 2.7、总结：

| 内容                 | 描述                                                                                                                                                                  |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 字符串类型的定义     | 用**英文**状态下的`""`双引号或`''`单引号包裹起来值就是字符串类型的值                                                                                                  |
| 双引号与单引号的嵌套 | `" "`双引号里面可以嵌套`''`单引号，`''`单引号也可以嵌套`""`双引号 `""`双引号里不能直接嵌套`""`双引号，`''`单引号里也不能直接嵌套`''`单引号                            |
| 转义字符`\`          | 如果需要在字符串中使用特殊字符，可以用**转义符**`\`转义                                                                                                               |
| 字符串的拼接         | `+` 号可以用来拼接两个或多个字符串 字符串与**任何类型**拼接，得到的都是字符串 字符串与**变量**拼接                                                                    |
| 空字符串             | 空字符串，直按书写空的 `''`单引号或`""`双引号 **空字符串有什么用** 可以用来转换数据类型 可以**提前预设变量保存值为字符串类型**，如果不设置为'',有可能会出现错误的结果 |
| length 属性          | 通过 length 属性，可以获取整个字符串的**长度**                                                                                                                        |

### 3、Boolean 类型

![boolean](https://www.arryblog.com/assets/img/boolean.a4d5f096.jpg)

> 布尔（George-Boole）是英国 19 世纪数学家及逻辑学家。

- 布尔值主要是用来做**逻辑判断**，
- 布尔类型只有两个值： `true`(真) 和`false`（假）
- 如果给`true`和`false`加上`""`双引号或`''`单引号，那就变成了字符串了

```html
<script>
  // 检测 true 和 false 的数据类型
  console.log(typeof true) // boolean
  console.log(typeof false) // boolean

  // 区分，true和false 在布尔值中是不加引号的，加了引号就变成字符串类型的值了
  console.log(typeof 'true') // string
  console.log(typeof 'false') // string

  // 布尔值主要是用来做逻辑判断
  console.log(1 > 2) // false
  console.log(3 > 2) // true
</script>
```

### 4、null 空类型

- null 类型只有一个值，就是 null
- null 表示一个空对象指针
- 用 typeof 检测 null 的类型，得到的是`Object`

```html
<script>
  typeof null //object
</script>
```

注：

虽然 typeof null 得到值为 Object,但是 null 是基本数据类型，这是一个历史遗留问题，如果要深究，那就只能用下面这段话来解释 (以下内容来自：你不知道的 JavaScript 上卷-103 页)

- 不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判断为 object 类型
- null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回 "object"

面试中会问到这个点，问这个问题的本质不是考这个点，因为没有意义，而是想通过这个点，看你平时学习是否研究底层，会阅读相关 JS 书籍。

#### 4.1 、null 的作用

- 如果一个变量被声明后，将来是用来保存对象值的，那建议用 null 来初始化，不要使用其他值。

```html
<script>
  var obj = null // obj赋初始值为null ，表示obj示来是用来保存对象变量
  obj = {
    name: '清心',
    age: 34,
  }
</script>
```

- 当我们需要将对象、数组、事件监听进行销毁时，我们就可以把他们设置为 null，只有把他们设置为 null 时，JS 垃圾回收器才会把他们当成垃圾，进行垃圾回收

```html
<script>
  var obj = {
    name: '清心',
    age: 32,
  }
  // 当我们对其赋值为null的时候，obj与堆内存中的空间关系被斩断。
  // 由于堆内存中的空间没有人引用，所以这块空间就成了javascript中所谓的垃圾
  obj = null
</script>
```

注：

什么才称为垃圾，在我们的现实生活中，你用完后不会再用的东西，就可以当成垃圾处理掉。

在 JS 中也是一样的，如果某些数据被判断为永远不会再被应用，那就会被当成垃圾回收掉。

关于垃圾回收，目前只需要了解概念，等到后面高级，再与大家详解。

### 5、undefined

- undefined 类型，只有一个值，就是`undefined`
- 当声明一个变量，但是并不给变量赋值时，它的值就是`undefined`

```html
<script>
  console.log(typeof undefined) // undefined
</script>
<script>
  var a
  console.log(a) // a的值是undefined
  console.log(typeof a) // 变量a的类型是 undefined
</script>
```

注：

我们经常在调试中或报错中会发现有些值打印是 undefined，就说明这个变量定义了，没有赋值，或赋值不成功。

### 6、基本数据类型总结

![image-20220419175556585](https://www.arryblog.com/assets/img/image-20220419175556585-16503621588161.eb4bf17f.png)

## 三、数据类型转换

JavaScript 是一种动态类型语言 (dynamically typed language)。

这意味着你在声明变量时可以不必指定数据类型，而数据类型会在代码执行时会根据需要自动转换。

**JS 中通常会有三种方式的数据类型转换**

- 其它类型 `-->` 数值
- 其它类型 `-->` 字符串
- 其它类型 `-->` 布尔值

### 1、其它类型转换为数字型

将其它数据类型转换为数字型，有以下 4 种方法

| 函数                      | 说明                         | 实例                                                                 |
| :------------------------ | :--------------------------- | :------------------------------------------------------------------- |
| Number() 函数 强制转换    | 将**非数字类型**转换成数字   | `Number('');` // 0 `Number(' ');` // 0                               |
| paresInt() 函数           | 将**字符串**转换为数字       | `parseInt('ab123');` // NaN `parseInt('200px');` // 200              |
| parseFloat() 函数         | 将**字符串**转换为浮点数     | `parseFloat('3.14 元');` // 3.14 `parseFloat('圆周率 3.14');` // NaN |
| `（+ - * /）` JS 隐式转换 | 利用算术运算隐式转换为数字型 |                                                                      |

#### 1.1、Number 函数

Number()函数：用来将非数字类型转换成数字。

**字符串转数字**

- 只有：`''`空字符串 、字符串只有前后包含空格、纯数字类字符串、2 进制或 16 进制表示的数字、科学记数表示法能转换成数字，其它都转换成 NaN
- 以上规则，只针对基本数据类型而言
- `Number([])` 结果是 0
- `Number({})`结果是 NaN

```html
<script>
  Number('12.3') // 12.3
  Number('-12') // -12
  Number('2e3') // 2000
  Number('0b11') // 3
  Number('0110') // 110
  Number('0x14') // 20
  Number('ab') // NaN
  Number('2021年') // NaN
  Number('') // 0
  Number(' ') // 0
</script>
```

**boolean 转换为数字**

```html
<script>
  Number(true) // 1
  Number(false) // 0
</script>
```

**null 和 undefined 转换为数字**

```html
<script>
  Number(null) // 0
  Number(undefined) // NaN
</script>
```

#### 1.2、parseInt(函数)

parseInt()函数，主要是将**字符串类型**转换为**整数数字**

**转换规则**

- 从第一个非空字符开始转换，如果第一个字符不是数值，加号或减号，parseInt 立即返回 NaN
- 这就意味着空字符串也会返回 NaN。
- 如果第一个非空字符是数值，加号、减号，则继续检测，直到字符串末尾，或碰到非数值字符，就停止。

```html
<script>
  parseInt('') // NaN
  parseInt('   -12.4') // -12
  parseInt('-123.45') // -123
  parseInt('ab123') // NaN
  parseInt('2021年') // 2021
  parseInt('true') // NaN
  parseInt('200px') // 200
</script>
```

- parseInt() 函数不能识别二进制，八进制，但是他可以识别十六进制

```html
<script>
  parseInt('0b10') // 0
  parseInt('0110') // 110
  parseInt('0x14') // 20
  parseInt('0x14年') // 20
</script>
```

- parseInt() 函数，还有第二个参数，可以指定以什么进制数来进行转换

```html
<script>
  parseInt('10', 2) // 2
  parseInt('10', 8) // 8
  parseInt('10', 10) // 10
  parseInt('10', 16) // 16
  parseInt('10年', 2) // 2
  parseInt('10年', 8) // 8
  parseInt('10', 10) // 10
  parseInt('10年', 16) // 16
</script>
```

#### 1.3、parseFloat(函数)

- 他的转换原则 和 parseInt()函数一样，唯一两点区别在于
- parseFloat() 函数，主要是将**字符串类型**转换为**浮点数**

```html
<script>
  parseFloat('') // NaN
  parseFloat('3.14') // 3.14
  parseFloat('3.2.32') // 3.2
  parseFloat('3.14元') // 3.14
  parseFloat('圆周率3.14') // NaN
</script>
```

- parseFloat( )函数，他不能识别进制数

```html
<script>
  parseFloat('0b10') // 0
  parseFloat('0110') // 110
  parseFloat('0x14') // 0
</script>
```

#### 1.4、JS 隐式转换 (+ - \* /)

- 利用算术运算隐式将其它类型转换为数字
- 在**单个字符串**前面加上 +号，可以将字符串转成数字,多个字符串，是字符串拼接

```js
typeof +'1' // number
```

> 更多内容，等到后面讲表达式和操作符的时候再讲

### 2、其它类型转换为字符串

将其它数据类型转换成字符串类型，有以下 3 种方式

| 方法或函数            | 说明                                           | 实例                                                 |
| :-------------------- | :--------------------------------------------- | :--------------------------------------------------- |
| String()函数 强制转换 | 其它类型转换字符串                             | `String(0b10);` // '2' `String(NaN);` // 'NaN'       |
| toString() 方法       | `数字`和`boolean`类型转换为字符串              | `0b10.toString();` // '2' `NaN.toString();` // 'NaN' |
| + '' 空字符串拼接     | 所有类型与''空字符串拼接得到的都是字符串类型。 | `typeof (1 + "");` // 'string'                       |

注：

以上方法或函数，将任何类型转换为字符串，都会转换成`长得相同`的字符串，除了`科学记数法`和`非10进制数字`会将其转换为 10 进制值的字符串

#### 2.1、String()函数

- 数字转换字符串

```html
<script>
  String(123) // '123'
  String(2.14) // '2.14'
  String(2e4) // '20000'
  String(0b10) // '2'
  String(NaN) // 'NaN'
  String(Infinity) //' Infinity'
</script>
```

- 布尔值转换为字符串

```html
<script>
  String(true) // 'true'
  String(false) // 'false'
</script>
```

- undefined 和 null 转换为字符串

```html
<script>
  String(undefined) // 'undefined'
  String(null) // 'null'
</script>
```

#### 2.2、toString() 方法

- 数字转换为字符串

```html
<script>
  ;(123).toString() // '123'
  ;(2e4).toString() // '20000'
  ;(0b10).toString() //'2';
  NaN.toString() // 'NaN'
  Infinity.toString() // 'Infinity'
</script>
```

- boolean 类型转换为字符串

```html
<script>
  true.toString() // 'true'
  false.toString() // 'false'
</script>
```

> **注意事项：**
>
> `null`和`undefined`没有 toString()这个方法

#### 2.3、+ '' 空字符串

```html
<script>
  true + '' // 'true'
  false + '' // 'false'
  NaN + '' // 'NaN'
  0 + '' // '0'
  0b10 + '' // '2'
</script>
```

### 3、其它类型转换为 boolean 布尔类型

其它数据类型转换成 Boolean 只有一种方法，那就是通过 `Boolean()` 函数来实现

| 函数           | 说明                     | 实例                    |
| :------------- | :----------------------- | :---------------------- |
| Boolean() 函数 | 其它类型转换成布尔类型值 | `Boolean('');` // false |

#### 3.1、Boolean() 函数

转换原则：

- 代表**空**，**否定**的值会被转换为`false`。 如：`''`、`0`、`NaN`、`null`、`undefined`
- 除了上面列出的 5 个值，其它值字都转换为 true

**字符串转换为布尔类型**

```html
<script>
  Boolean('') // false
  Boolean(' ') // true
  Boolean('NaN') // true
  Boolean('false') // true
</script>
```

**数字类型转换为布尔类型值**

```html
<script>
  Boolean(NaN) // false
  Boolean(0) // false
  Boolean(Infinity) // true
</script>
```

**null 和 undefined 转换为布尔类型值**

```html
<script>
  Boolean(null) // false
  Boolean(undefined) // false
</script>
```

### 4、 数据类型转换总结

其它类型转数字

- 其它类型转换成数字，有 4 种方式：

> Number() 函数、parseInt() 函数、parseFloat() 函数、JS 隐式转换（`+-*/`)

- Number()函数，可以将所有类型转换成数字，转换原则：

> - `''`空字符串
> - 字符串只有前后包含空格
> - 纯数字类字符串
> - 2 进制或 16 进制表示的数字
> - 科学记数表示法，
>
> 以上 5 中情况能转换成数字，其它都转换成 NaN

- parseInt() 函数和 parseFloat() 函数，只能将字符串转换成数字，转换原则：

> - 从第一个非空字符开始转换，如果第一个字符不是数值，加号或减号，parseInt 立即返回 NaN
> - 如果第一个非空字符是数值，加号、减号，则继续检测，直到字符串末尾，或碰到非数值字符，就停止。
> - parseInt() 是将字符串转换成整数，而 parseFloat() 是将字符串转换成小数（浮点数）

#### 4.2 、其它类型转字符串

- 将任何类型转换为字符串，都会转换成`长得相同`的字符串，除了`科学记数法`和`非10进制数字`会将其转换为 10 进制值的字符串
- 将其它类型转换成字符串有 3 种方式：String() 函数、toString() 方法、+'' 空字符串拼接
- `null` 和`undefined`没有 toString() 这个方法

#### 4.3 、其它类型转布尔值

- 利用 Boolean() 函数来实现其它类型转换成布尔值
- 除了这 5 个值`''`、`0`、`NaN`、`null`、`undefined`转换成 Boolean 值是 false，其它值均为 true;

#### 4.4 、常见的类型转换

| 原始值    | 转换为 数字 | 转换为 字符串 | 转换为 布尔值 |
| :-------- | :---------- | :------------ | :------------ |
| false     | 0           | "false"       | false         |
| true      | 1           | "true"        | true          |
| 0         | 0           | "0"           | false         |
| "0"       | 0           | "0"           | true          |
| ''        | 0           | ''            | false         |
| ' '       | 0           | ' '           | true          |
| "30"      | 30          | "30"          | true          |
| null      | 0           | "null"        | false         |
| undefined | NaN         | "undefined"   | false         |
| NaN       | NaN         | "NaN"         | false         |
| Infinity  | Infinity    | "Infinity"    | true          |

## 四、本章重难点

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点内容

基本数据类型

- JavaScript 中有哪些基本数据类型值 ？
- 它们的 typeof 检测结果是什么 ？

| 7 种       | 类型名                | typeof 检测结果 | 事例                          |
| :--------- | :-------------------- | :-------------- | :---------------------------- |
| 基本类型值 | Number 数字类型       | number          | 6                             |
| 基本类型值 | String 字符串类型     | string          | `arry老师`                    |
| 基本类型值 | Boolean 布尔类型      | boolean         | true/false                    |
| 基本类型值 | undefined 类型        | undefined       | undefined                     |
| 基本类型值 | `null 类型`           | `object`        | null                          |
| 基本类型值 | Symbol 类型           | symbol          | **var** a = Symbol("唯一性"); |
| 基本类型值 | BigInt 任意精度的整数 | bigint          | var a=BigInt(10);             |

#### 字符串与变量拼接，如何处理？

```js
var age = 10
var str = '大家好，我今年' + age + '岁了'
```

#### 说出 NaN、null、undefined 三个值的特殊点 ？

- NaN
  - NaN 不是一个数字
  - typeof 检测 NaN，得到的是 number，也就是 NaN 是数字类型
  - 一些数字运算产生不了的结果会得到 NaN，但不会报错。如：'我' - '你' 得到 NaN
- undefined
  - 当声明一个变量，但没有被赋值时，其默认值是 undefined
  - undefined 的数据类型就是 undefined
  - undefined 类型只有一个值，就是 undefined
  - undefined 转换成数字为 NaN,转换成字符串是`'undefined'`、转换成 boolean 类型为 false
  - undefined 没有 toString() 这个方法，转字符串只能调用 String() 函数转
- null
  - null 类型只有一个值，就是 null
  - null 表示一个空对象指针
  - 用 typeof 检测值为 object
  - 它通常在编程的时候用于销毁一些数据，如：销毁数组、对象、事件监听等

#### isNaN 的用法 ?

- 这个函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”
- 特别注意：isNaN 并不是用来判断这个参数是不是`NaN`这个值
- 如果参数是数值，则返回`false`，否则返回`true`

#### 各种类型的值相互转换的方法和转换规律

答案：

参考上面的 `4、数据类型转换总结`

### 2、难点内容

> 猜猜以下表达式的结果

```js
parseInt('2.3' + '3.5')
Boolean('false')
0 / 0
2 / 0
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br><br></p></details>

## 五、测试题

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、关于 Infinity，说法错误的是 ？

> 选择两项

- A、Infinity 是无穷小
- B、非零数字除以 0 时，结果是 Infinity 或-Infinity
- C、Infinity 不是一个数字类型
- D、使用 typeof 检测 Infinity 的类型是 number

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、关于描述有误的是哪项 ？

> 选择一项

- A、NaN 是非数值
- B、isNaN(NaN) 结果是 true
- C、NaN 与 NaN 本身是相等的
- D、NaN 与任何值都不相等

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 3、以下代码输出的结果是 ？

```html
<script>
  var a
  a = a + 1
  console.log(a)
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

```html
<script>
  var age = prompt('请输入你的年龄') // 用户输入 18
  console.log(typeof age)
  var msg = '清心老师' + age + '岁了'
  console.log(msg)
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

```html
<script>
  var obj = null
  console.log(typeof typeof obj) // string
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

```html
<script>
  console.log(NaN + true + 'false')
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

## 六、综合案例

简单计算器

需求分析：

- 当用户在浏览器打开页面时，弹出一输入框，要求用户输入数字，用户确认后，再弹出一输入框，再输入一个数字，确认后，最后弹出两次输入的数字之和。

代码实现思路：

- 使用 `prompt()` 函数弹出输入框，让用户输入两个数字
- 对用户输入两个数字进行加法运算，而由于用户输入的内容是字符串类型，所以必须先转为数字类型，才能做加法运算
- 最后用 alert() 显示结果
- 程序虽小，却体现了普遍计算机程序的执行步骤：用户输入->计算机处理 -> 显示结果

```js
// 用户输入两个数字
// var a = prompt('请输入第一个数字');
// var b = prompt('请输入第二个数字');

var a = Number(prompt('请输入第一个数字'))
var b = Number(prompt('请输入第二个数字'))

// 计算两个数字的和
var sum = a + b

// 弹出结果
// alert(sum);
alert('数字 ' + a + ' 加上数字 ' + b + ' 的和是：' + sum)
```

![image-20211215194823635](https://www.arryblog.com/assets/img/image-20211215194823635.b092456d.png)

## 七、作业

- 1、把课程中上面提到的重点和难点，要全部掌握
- 2、每个知识点中，涉及的代码，都要手动敲一遍
- 3、案课的综合案例，要自己动手敲一遍，并做到完全理解

## 八、扩展知识

结合当前所学知识，拓展底层原理相关概念，逐步深入。

### 1、Javascript 为何称为弱类型的动态脚本语言

在前面我们一直说，Javascript 是一种运行在客户端的脚本语言（Script 是脚本的意思）。

本质上 Javascript 是一种弱类型的动态脚本语言。接下来我们分别来解释下，何为**弱类型**，何为**动态**，何为**脚本语言**。

![根据编程语言类型进行语言分布](https://www.arryblog.com/assets/img/image-20220917003701976.d4dd4556.png)

根据语言类型进行语言分布

### 2、何为动态语言和静态语言

- 在声明变量时，不需要确定变量类型的语言，称为动态语言。比如：`Javascript，Python、Ruby、PHP`等
- 在声明变量时，需要就需要确定变量类型的语言，称为静态语言。比如 `Java、C、C++ 、C#` 等

> 我们来看下面两段代码，一段是 JS 代码，一段是 Java 代码

```js
// js代码
var a = 2
typeof a // number
a = '艾编程'
typeof a // string
```

- JS 在声明变量声明时，并不需要确定变量的类型，其类型是在代码执行的过程中,由变量对应值的类型来动态决定的。所以 JS 在执行过程中，需要检查数据的类型。

```java
// Java中变量定义
int a = 1;
float b = 1.68;
String c = "艾编程";
boolean = true;
```

> Java 在声明变量时，就需要确定好变量的类型。

### 3、何为弱类型语言 和 强类型语言

- 支持隐式类型转换的语言，称为 **弱类型语言**

  > 弱类型语言：C、C++、Javascript、PHP、VB、Perl

- 不支持隐式类型转换的语言，称为 **强类型语言**

  > 强类型语言：C# 、Java 、Ruby、Python

```js
var a = '4'
var b = 1
console.log(a - b) //3
```

注：

- 变量`a`是字符串，`b`是数字，`a-b='4'-1`，在这个过程中会自动把字符串`'4'`转换成数字`4`，然后再做运算。
- 这种在运算过程中会悄悄把数据类型转换的操作，叫**隐式类型转换**。

在下一个章节中

我们就会讲到**隐式类型转换**和**强制类型转换**，如果暂时不理解，也没关系，明天那节课学完，回过头来就能懂了。

### 4、何为脚本语言

- 所谓的**脚本语言**：是指不需要提前编译，而是在运行的过程中边编译，边执行。
- 而 JS 本质上就是在运行过程中边编译，边执行的，JS 是由 JS 解释器（JS 引擎）来逐行进行解释并执行
- 所以 JS 也称为解释型语言。

### 5、编译型语言 和 解释性语言

编译器和解释器

之所以存在编译器和解释器，是因为机器不能直接理解我们所写的代码，所以在执行程序之前，需要将我们所写的代码“翻译”成机器能读懂的机器语言。

按语言的执行流程，可以把语言划分为编译型语言和解释型语言。

**编译型语言**

在程序执行之前，需要经过编译器的编译过程，并且编译之后会直接保留机器能读懂的二进制文件，这样每次运行程序时，都可以直接运行该二进制文件，而不需要再次重新编译了。比如 C/C++、GO 等都是编译型语言。

**解释型语言**

而由解释型语言编写的程序，在每次运行时都需要通过解释器对程序进行动态解释和执行。比如 Python、JavaScript 等都属于解释型语言。

注：

大部分后端语言，都是编译型语言，也就是要先编译，再执行。而 JS 是解释型语言，一边编译一边执行。

我们来举个例子，区分下何为编译型语言，何为解释型语言。

**比如：现在你有一个英文稿子要翻译**

- 如果是编译型，那就是找个翻译人员，把这个稿子先全部翻译完成，然后再拿着翻译稿来学习。
- 如果是解释型语言，就是找个翻译站你旁边，读一句英语，给你翻译一句。

所以编译型是一开始慢，后面快，而解释是刚开始快，但过程中是慢的。

### 6、什么是 JavaScript 解释器 ？

要理解什么是解释器，就需要我们了解浏览器的两大组成部分：**渲染引擎** 和 **JavaScript 引擎**

- **渲染引擎**：用来解析 HTML 与 CSS，俗称内核，比如 chrome 浏览器的 blink，老板本的 webkit
- **JS 引擎**： 也称为 JS 解释器，用来读取网页中的 JavaScript 代码，对其处理后运行。比如 chrome 浏览器的 V8 引擎。

> 浏览器本身并不会执行 JS 代码，而是通过内置 JavaScript 引擎（解释器）来编译和执行 Js 代码。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机去执行。

如果你理解了何为动态语言，何为弱类型语言，何为脚本语言，你就明白为什么 JS 称为**弱类型的动态脚本语言**，因为 JS 同时具备这三种特性。
