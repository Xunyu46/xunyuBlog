# JavaScript 三大包装类 Number、String、Boolean

为了方便操作原始值，ECMAScript 提供了`Number`、`String`、`Boolean`这三个特殊的构造函数

他们的主要作用就是把基本数据类型 **包装** 成一个 **“对象”** 版本的基本类型值，所以这三个类又称为 **包装类**

| 包装类  | 说明                       |
| :------ | :------------------------- |
| Number  | 将数字包装成一个数字对象   |
| String  | 将字符串包装成一个字符对象 |
| Boolean | 将布尔值包装成一个布尔对象 |

```js
// Number 类
var n = new Number(3)
console.log(n) // Number {3}
console.log(typeof n) // object
console.log(n + 4) // 7

// String 类
var str = new String('abcd')
console.log(str) // String {'abcd'}
console.log(typeof str) // object
console.log(str + '123') // abcd123

// Boolean 类
var b = new Boolean(true)
console.log(b) // Boolean {true}
console.log(typeof b)
console.log(true + 1) // 2
```

## 一、包装类核心基础

- **包装类的主要目的**：是让基本类型值可以从它们的构造函数的 prototype 上获得方法。
- 每当用到某个原始值的方法或属性时，后台都会创建一个相应的原始包装类型的对象，从而暴露出操作原始值的各种方法

**我们来分析下，下面代码的执行流程**

```js
var str1 = '我就是我，不一样的小花朵'
var str2 = str1.charAt(2) // 是
```

- 上面代码中 str1 是一个原始值，原始值不是一对象，因此逻辑上不能调用方法。但实际上按预期输出了结果。为什么呢 ？
- 实际上代码执行到`str1.charAt(2)`时，JS 后台进行了很多处理

**具体处理步骤如下：**

- 创建一个 String 类型的实例

```js
str = new String(str1) // 创建对应String类型的实例
```

- 调用实例上的特定方法，将返回的结果赋值给到 str2

```js
str2 = str.charAt(2) // 完成赋值操作
```

- 销毁创建出来的实例

```js
str = null // 销毁创建的实例
```

### 1、包装类的生命周期

- new 关键字创建的原始值包装对象，只有在当前作用域被销毁时才销毁
- 自动创建的原始值包装对象，只存在于访问它的那一行代码执行期间。执行完就自动销毁

```js
var str1 = '我就是我，不一样的小花朵'
str1.name = '张三'
console.log(str1.name) // undefined
console.log(typeof str1) // string

var str2 = new String('我就是我')
str2.name = '清心'
console.log(str2.name) // 清心
console.log(typeof str2) // object
```

分析 str1 变量

- 当代码执行到`str1.name="张三"`时，str1 确实被包装成了对象，然后在对象上添加了 name 属性，但执行完，被包装成的对象就销毁了
- 当执行到`str1.name`时，str1 又创建了一个新的 String 对象，但是这个对象已经不是前面的那个对象，他身上没有 name 属性，访问对象身上不存在的属性不会报错，返回值为`undefined`

**分析 str2 变量**

- 执行`var str2 = new String("我就是我");`时，相当于创建了一个包装对象，然后把这个包装对象赋值级到 str2
- 当执行到`str2.name = "清心";`时，相当于给对象添加 name 属性
- 当执行到`str2.name`时，相当于读到对象身上的属性，返回结果为清心

### 2、原始值包装对象 - 转为布尔值都是 true

直接调用 Boolean 函数，可以将其它类型转换为对应的 boolean 值

```js
// 数字
console.log(Boolean(0)) // false
var n1 = new Number(0)
console.log(Boolean(n1)) // true
console.log(n1) // Number {0}

// 布尔值
var flag = new Boolean(false)
console.log(Boolean(false)) // false
console.log(Boolean(flag)) // true
console.log(flag) // Boolean {false}

// 字符串
var str = new String('')
console.log(Boolean(''))
console.log(Boolean(str))
console.log(str)
```

### 3、区分直接调用包装类与 new 调用

- 直接调用包装类函数，主要目的是实现数据类型的转换
- 使用 new 调用包装类，是为了把基本数据类型转换为对象类型

```js
var value = '20'
var number = Number(value)
console.log(number) // 20
console.log(typeof number) // number

var obj = new Number(value)
console.log(obj) // Number {20}
console.log(typeof obj) // object
```

> 接下来我们学习这些包装类身上的相关属性和方法

## 二、Number 包装类

Number 类有很多方法和属性，我们这里挑出最常用的给大家讲解

[点击，更多详细内容参考 MDN 官方(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

> 以下是常见的 Number 的静态属性，只需要了解即可

| 静态属性                  | 描述                                                                                            |
| :------------------------ | :---------------------------------------------------------------------------------------------- |
| `Number.MAX_SAFE_INTEGER` | 表示在 JavaScript 中最大的安全整数`2^53 - 1`                                                    |
| `Number.MIN_SAFE_INTEGER` | 代表在 JavaScript 中最小的安全整数 `-(2^53 - 1)`                                                |
| `Number.MAX_VALUE`        | JavaScript 里所能表示的最大数值 大于 `MAX_VALUE` 的值代表 "`Infinity`"                          |
| `Number.MIN_VALUE`        | 表示在 JavaScript 中所能表示的最小的正值 小于 `MIN_VALUE` ("underflow values") 的值将会转换为 0 |

> 以下是常用的 Number 原型上的方法，之些方法我们之前都学习过，列出来用于复习

| 实例方法（原型方法） | 描述                                                                                                                                                   |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| toFixed              | 返回结果后的小数部分保留指定小数位数，返回结果为一个字符串 保留小数位时，会采用四舍五入 如果小数位不足，则用 0 来补充 如果参数为空，则表示不保留小数位 |
| toString             | `toString()`用来将数值类型转换为字符串类型 `toString()`可以接受一个参数，用来将数字转换成对应进制的字符串                                              |
| valueOf              | valueOf 方法返回被 Number 对象包装的原始值                                                                                                             |

### 1、Number.MAX_SAFE_INTEGER 属性

- 是一个值为 9007199254740991 （即`2^53-1`）的常量。
- 表示在 JavaScript 中最大的安全整数（maxinum safe integer)（`2^53 - 1`）
- 所谓的安全，是指能够准确的区分两个不相同的值

```js
var n = Math.pow(2, 53) - 1
console.log(n) // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991

// 安全系数  以下得到结果为true，显然是不合理的
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2) // true
```

### 2、Number.MIN_SAFE_INTEGER 属性

- 是一个值为 `-9007199254740991`的常量，即 `-(2^53 -1)`
- 表示在在 JavaScript 中最小的安全整数 `-(2^53 - 1)`
- 所谓的安全，是指能够准确的区分两个不相同的值

```js
var n = -(Math.pow(2, 53) - 1)
console.log(n) // -9007199254740991
console.log(Number.MIN_SAFE_INTEGER) // -9007199254740991

// 安全系数  以下得到结果为true，显然是不合理的
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2) // true
```

### 3、Number.MAX_VALUE 与 Number.MIN_VALUE 属性

- `Number.MAX_VALUE`表示 JavaScript 里所能表示的最大数值
- `Number.MIN_VALUE` 表示在 JavaScript 中所能表示的最小的正值

```js
console.log(Number.MAX_VALUE) // 1.7976931348623157e+308
console.log(Number.MIN_VALUE) // 5e-324
```

### 4、toFixed 方法

- 返回结果后的小数部分保留指定小数位数，返回结果为一个字符串
- 如果参数为空，则表示不保留小数位
- 保留小数位时，会采用四舍五入
- 如果小数位不足，则用 0 来补充

```js
var n = 1.447
console.log(n.toFixed()) // 1
console.log(n.toFixed(1)) // 1.4
console.log(n.toFixed(2)) // 1.45
console.log(n.toFixed(5)) // 1.44700
console.log(typeof n.toFixed()) // string
```

### 5、toString 方法

- Number 类重写了原型上的 toString 方法
- `toString()`用来将数值类型转换为字符串类型
- `toString()`可以接受一个参数，用来将数字转换成对应进制的字符串

```js
var n = 16
console.log(n.toString()) // 16
console.log(typeof n.toString()) // string
console.log(n.toString(2)) // 10000
console.log(n.toString(8)) // 20
console.log(n.toString(10)) // 16
console.log(n.toString(16)) // 10
```

### 6、valueOf 方法

- Number 类重写了原型上的 valueOf 方法
- valueOf 方法返回被 Number 对象包装的原始值

> 该方法通常是由 JavaScript 引擎在内部隐式调用的，而不是由用户在代码中显式调用的

```js
var n = 16
var obj = new Number(n)
console.log(obj) // Number {16}
console.log(obj.valueOf()) // 16
console.log(obj + 3) // 19 内部自动调用了valueOf方法
```

## 三、Boolean 包装类

> 以下是 Boolean 包装类原型上的方法

| 实例方法（原型方法） | 描述                               |
| :------------------- | :--------------------------------- |
| toString             | 方法返回表示指定的布尔对象的字符串 |
| valueOf              | 返回一个原始值`true`或`false`      |

### 1、toString 方法

- Boolean 类重写了原型上的 toString 方法
- 方法返回表示指定的布尔对象的字符串
- 当一个 `Boolean`对象作为文本值或进行字符串连接时，JavaScript 会自动调用其 `toString` 方法

```js
console.log(true.toString()) // 'true'
console.log(typeof true.toString()) // string
console.log(false.toString()) // 'false'
console.log(true + 'abc') // trueabc 内部自动调用了toString()方法
```

### 2、valueOf

> 返回原始值`true`或`false`

```js
var flag = new Boolean('12')
console.log(flag) // Boolean {true}
console.log(flag.valueOf()) // true

var flag2 = new Boolean(0)
console.log(flag2) // Boolean {false}
console.log(flag2.valueOf()) // false
```

> 建议永远不要使用 `new Boolean()` 来包装一个布尔值，这里只当做了解

## 四、String 包装类

| 实例（原型）方法 | 描述                                                                         |
| :--------------- | :--------------------------------------------------------------------------- |
| `charAt()`       | 返回字符串中指下标的字符                                                     |
| `concat()`       | 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回               |
| indexOf          | 返回给定的字符串在整个字符串中第一次出现的索现                               |
| slice            | 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。       |
| substring        | 返回字符串中指定开始索引到结束索引之间的字符串，包含起始索引，不包含结束索引 |
| trim             | 清除字符串两端的空格，返回一个新的字符串                                     |
| trimEnd          | 方法会删除字符串末尾的空白字符。`trimRight()` 是这个方法的别名               |
| trimStart        | 方法会删除字符串开头的空白字符。`trimLeft()` 是此方法的别名                  |
| `toUpperCase()`  | 将字符串中字母转换为大写                                                     |
| `toLowerCase()`  | 将字符串中字母转换为小写                                                     |
| valueOf          | 返回 `String` 对象的原始值                                                   |

温馨提示

这些字符串方法（`split` 、`match`、`search`、`replace`）涉及到正则表达式的应用，则放在正则表达式那一章节来学

### 1、charAt

- 返回字符串中指定下标的字符

```js
str.charAt(index)
```

- index 值介于 0 ~ 字符串长度-1 之间的整数,如过值超出这个范围，返回空字符串
- 如果没有传入参数，则默认返回下标为 0 的字符

```js
var str = '我就是我，不一样的小花朵'
console.log(str.charAt()) // 我
console.log(str.charAt(str.length - 1)) // 朵
console.log(str.charAt(str.length)) // 超出范围 返回空字符串
console.log(str.charAt(-1)) // 超出范围 返回空字符串
```

### 2、concat

- 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
- 如果传入的参数为非字符串，会先转换成字符串，然后再拼接
- concat 方法，并不影响原字符串

> MDN 上明确强调：出于性能考虑，强烈建议使用 `+` 或 `+=` 来代替 `concat()` 方法拼接字符串

```js
str.concat(str2, [, ...strN]) // [] 里面表示可选，即concat的中的参数 >= 1个
var str = 'abc'
console.log(str.concat('c')) // abcc
console.log(str.concat('c', 4, 5)) // abcc45
console.log(str.concat(['d', 'e', 'f'])) // abcd,e,f
console.log(str.concat(true)) // abctrue
console.log(str.concat(null)) // abcnull
console.log(str.concat([])) // abc
console.log(str.concat({})) // abc[object Object]
console.log(str.concat({ a: 1, b: 2 })) // abc[object Object]
```

### 3、indexOf

- 返回指定字符串在大于或等于`position`位置的第一次出现的索引，如果没有找到则返回 `-1`
- `searchString` 要搜索的子字符串
- `position` 从指定位置开始往后查询

```js
indexOf(searchString)
indexOf(searchString, position)
```

- 如果没有传第二个参数，则默认从 0 的位置开始查找
- 给定了第二个参数，会从当前位置开始往后查找，包括当前位置

```js
var str = 'hello world'
console.log(str.indexOf('o')) // 4
console.log(str.indexOf('o', 7)) // 7
console.log(str.indexOf('o', 8)) // -1
```

- 如果 position 大于字符串长度，则搜索不到对应字符串，返回结果为 `-1`
- 如果 position 小于 0，则当成 0 来处理，从第 0 的位置往后查询

> 数组中的 indexOf 方法,如果第二个数是负数，则表示从后往前找

```js
var str = 'hello world'
console.log(str.indexOf('o', 11)) // -1
console.log(str.indexOf('o', -4)) // 4
```

- indexOf 查询内容时，是严格区分大小写的，数组中的 indexOf 方法也是一样的

```js
var str = 'hello world'
console.log(str.indexOf('W')) // -1
console.log(str.indexOf('w')) // 6
```

空字符串搜索时会产生以下奇怪的结果，所以在查询时如果查询内容有可能为空，则需要提前判断

- position 未传，返回结颗粒 0，如 `position < 字符串长度`，返回结果为 position 值
- `position >= 字符串长度`，返回结果为字符串的长度

```js
// 以下代码来自MDN
'hello world'.indexOf('') // 返回 0
'hello world'.indexOf('', 0) // 返回 0
'hello world'.indexOf('', 3) // 返回 3
'hello world'.indexOf('', 8) // 返回 8

'hello world'.indexOf('', 11) // 返回 11
'hello world'.indexOf('', 13) // 返回 11
'hello world'.indexOf('', 22) // 返回 11
```

**案例应用**： 统计某个字母或单词在字符串中出现的次数

```js
String.prototype.count = function (searchString, position) {
  var n = 0 // 统计字符串出现的次数
  if (position === undefined) position = 0 // 如果没有赋值，默认为0
  if (typeof position !== 'number') {
    // 如果不是数字类型，则抛出错误
    throw new TypeError('position只能是数字类型')
  }
  // 从当前位置往后查找，并将查询的位置结果返回
  position = this.indexOf(searchString, position)
  while (position !== -1) {
    n++
    position = this.indexOf(searchString, position + 1)
  }
  return n
}

var str = 'on test my love on top bottom test'
console.log(str.count('on'))
console.log(str.count('o', 2))
console.log(str.count('test', -2))
```

### 4、slice

- 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
- 其用法和数组的 slice 方法一样

```js
str.slice(beginIndex[, endIndex])
```

- `beginIndex`为查询的起始索引，默认为 0
- `endIndex`为结束索引，可选参数，默认不写，表示从结束位置提取到整个字符串的尾部。
- 如果`beginIndex`和`endIndex`为负数，表示从后往前数，找到对应位置，再从开始位置**向右**查询到结束位置。
- 从后往前数，下标从-1 开始，同时查询字符串包含 `beginIndex`，但不包换`endIndex`

```js
var str = 'abcdefc'
console.log(str.slice(2, 5)) // cde
console.log(str.slice(2, -2)) // cde
console.log(str.slice(-5, -2)) // cde
console.log(str.slice(-3)) // efc
```

### 5、substring

返回字符串中指定开始索引到结束索引之间的字符串，包含起始索引，不包含结束索引

```js
str.substring(startIndex[, endIndex])
```

- `startIndex`开始索引，如果小于 0 或为 NaN，则当成 0 处理，大于字符串长度，则当成字符串长度处理
- `endIndex` 结束索引，如果小于 0 或为 NaN，则当成 0 处理，大于字符串长度，则当成字符串长度处理
- 如果 `startIndex > endIndex` ，则执行效果像两个参数调换一样

```js
var str = 'abcdefc'
console.log(str.substring(2)) // cdefc
console.log(str.substring(-2)) // abcdefc
console.log(str.substring(5, 2)) //cde
console.log(str.substring(2, -3)) // ab
console.log(str.substring(2, 5)) //cde
console.log(str.substring(-2, -3)) //""
```

### 6、trim、trimEnd、trimStart

- `trim`：清除字符串两端的空格，返回一个新的字符串
- `trimEnd`： 方法会删除字符串末尾的空白字符，`trimRight()` 是这个方法的别名
- `trimStart`：方法会删除字符串开头的空白字符，`trimLeft()` 是此方法的别名

> 这里的空格是指：所有的空白字符（空格、tab、不换行空格等）以及所有行终止符字符（如 LF、CR 等）

```js
var str = '   abc   '
var newstr = str.trim()
console.log(str.trim()) // "abc"
console.log(str.trim().length) // 3

console.log(str.trimStart()) // "abc   "
console.log(str.trimStart().length) // 6

console.log(str.trimEnd()) // "   abc"
console.log(str.trimEnd().length) // 6
```

### 7、toUpperCase 与 toLowerCase

- `toLowerCase`：将字符串中字母全部转换为小写
- `toUpperCase` ： 将字符串中字母全部转换为大写

```js
var str = 'I love You 是我爱你'
console.log(str.toUpperCase())
console.log(str.toLowerCase())
```

- 以下方法可实现将 true、false 这些非字符串值转换全大写

```js
String.prototype.toUpperCase.call(true)
String.prototype.toUpperCase.call(false)
```

- 以下代码会抛出类型错误

```js
String.prototype.toUpperCase.call(null)
String.prototype.toUpperCase.call(undefined)
```

![image-20221208004420970](https://www.arryblog.com/assets/img/image-20221208004420970.6c98e414.png)

### 8、valueOf

`valueOf()` 返回 `String` 对象的原始值

```js
var obj = new String('wang')
console.log(obj) // String {'wang'}
console.log(obj.valueOf()) // wang

// 字符串拼接时，会自动调用valueOf方法，获取原始值来拼接
console.log(obj + 'abc')
```

## 五、重点总结

为什么要有三大包装类 ？

- **包装类的主要目的**：是让基本类型值可以从它们的构造函数的 prototype 上获得方法。

理解包装类的生命周期 ？

- 重点掌握 toFixed、charAt、concat、indexOf、slice、substring、trim、trimEnd、trimStart、toUpperCase、toLowerCase 用法
