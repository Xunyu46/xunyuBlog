# JavaScript 表达式、操作符、位运算符

本节课我们来学习表达式和操作符。那什么是表达式和操作符呢？

我们来看一个例子：以下**表达式**是由两个**操作数**和一个**操作符**组合而成

![image-20220907210715280](data:image/png;base64,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)

What is ?

- **操作符：** 操作符，也称为运算符，是用于实现赋值、比较值、执行算术运算等功能的符号
- **表达式：** 简单理解为是由数字、操作符、变量等组成的式子，并且这个式子能求得**值**。
- **返回值：** 表达式最终都会有一个返回结果，这个结果我们称为**返回值**

> 代码演示：

```html
<script>
  console.log(1 + 5) // 1+5 是一个表达式，表达式的返回值是 6
  var a = 1 + 3
  console.log(a) // 4;
  var num
  var num1 = 1
  var num2 = 2
  num = num1 + num2 // num1+num2 是一个表达式，表达式的返回值赋值给变量num
  console.log(num) // 3
</script>
```

表达式的分类

- 在 JS 中表达式的种类非常多，这里我们主要讲解以下 5 种表达式。
- 每种表达式就有与之相匹配的操作符。

![image-20220907215916017](https://www.arryblog.com/assets/img/image-20220907215916017.dfadecdb.png)

> 接下来，我们就来学习下这 5 种表达式

## 一、算术表达式

- 说到算术表达式就离不开算术运算符。
- 算术运算符：用于执行两个`变量`或`值`的算术操作符。

| 算术运算符 | 描述         |
| :--------- | :----------- |
| +          | 加           |
| -          | 减           |
| \*         | 乘           |
| /          | 除           |
| %          | 取余（取模） |

### 1、加减乘除

加减的符号和数学一致，乘法是 `*` 号，除法是 `/` 号

```html
<script>
  console.log(1 + 1) // 2
  console.log(2 - 1) // 1
  console.log(1 * 2) // 2
  console.log(4 / 2) // 2
</script>
```

### 2、%取余运算符

- 取余运算也叫作 "求模运算" ，用百分号`"%"`表示
- a % b 表示，求 a 除以 b 的余数，它不关心整数部分，只关心余数

```js
13 % 5 // 3，因为13除以5余数是3
23 % 3 // 2，因为23除以3余数是2
8 % 2 // 0，因为能够整除，余数是0
9 % 3 // 0，因为能够整除，余数是0
3 % 9 // 因为商0，余数是3
5 % 10 // 因为商0，余数是5
```

> 任何数%模`上大于`他自身的数，结果是就是这个数本身

### 3、算术运算符优先级

- 默认情况下，`乘除取模`的优先级要高于`加减`
- 不过我们可以使用`圆括号()`来提升优先级，改变运算符的计算顺序。
- 这里提升优先级只能用`()`，没有`｛｝`这一说

```html
<script>
  console.log(1 + 2 * 3) // 7
  console.log(1 + (2 * 3) / 2) // 4
  console.log((1 + 2) * 3) // 9
  console.log(((1 + 2) * 3) / (2 + 1) / 3) // 1
</script>
```

### 4、+号的两种作用

- 加号有 "加法" 和 "连字符" 两种作用
- 当`+号`两边的数都是数值时，做`加法`运算，否则为"连字符"（字符串的拼接）

```html
<script>
  console.log(1 + 1) // 2
  console.log(1 + '1') // '11'
  console.log(1 + 1 + '1') // '21'
</script>
```

### 5、隐式类型转换

- 如果参与`数学运算`的某操作数不是数字类型，那么 JS 会自动将其转换为数字类型，然后再说计算。这一过程称为**隐式转换**
- **隐式转换的本质**是内部自动调用了相关的函数来转换。比如我们做的是算述运算，他就会自动调用`Number()`函数，帮我们把操作数转换成数字后，再做算术计算。

```html
<script>
  console.log(1 * '2') // 2
  console.log(4 / '2') // 2
  console.log(5 % '4') // 1
  console.log('2' - 1) // 1
  console.log(true + false) // 1
  console.log(2 + null) // 2
  // 任何类型与NaN做运算得到NaN,与字符串拼接除外
  console.log(1 + undefined) // NaN
</script>
```

注意事项

`任何数`与`NaN`做算述运算，结果都是`NaN`,除与`字符串拼接外`。

`+`号参于字符串计算，他不会做隐式转换，把操作数转换为数字，而是会当成字符串拼接来处理。

```html
<script>
  console.log(1 + 'true') // '1true'  字符串拼接
  console.log(1 + '2') // '12' 字符串拼接
</script>
```

### 6、显示转换

- 我们之前讲过**强制类型转换**，其实就是**显示类型转换**。
- 也就是我们自己手动的调用相关函数或方法，比如前面讲过的`Number()`、`parseInt()`、`parseFloat()`来转换数据类型。

```html
<script>
  //隐式转换
  console.log(1 + true) // 2
  //显示转换（强制类型转换）
  console.log(1 + Number(true)) // 2
  console.log(1 + Number('2')) // 3
</script>
```

> 数学运算时隐式转换自动调用的`Number()函数`将其它类型转换成数字，那 Number()实现不了的，就得手动调用其它方法来实现

```html
<script>
  console.log(300 - '100px') // NaN
  console.log(300 - parseInt('200px')) // 100
</script>
```

### 7、+ - 的特殊用法

- 如果 Number 函数能把某个类型转换成数字，那+ 和-号也可以。
- 不过要特别注意 `-true`和 `-false` `-null`这 3 个特殊情况，他们会将其转换成负数

```html
<script>
  console.log(-true) // -1
  console.log(-false) // -0
  console.log(-null) // -0
  console.log(typeof -'2') // number
  console.log(typeof +'2') // number
  console.log(-'2') // -2
  console.log(+true) // 1
  console.log(+false) // 0
  console.log(typeof +'0b10', +'0b10') // number 2
</script>
```

### 8、浮点数（小数）丢失精度

在 Javascript 中，有些小数的数学运算不是很精准

```html
<script>
  console.log(0.1 + 0.2) // 0.30000000000000004
  console.log(0.07 * 100) // 7.000000000000001
</script>
```

> 所以不要直接判断两个浮点数是否相等

```html
<script>
  var a = 0.1 + 0.2
  console.log(a == 0.3) // false
</script>
```

注：

JavaScript 使用了 IEEE754 二进制浮点数算术标淮，这会使一些个别的小数产生"丢失精度"问题。

IEEE754 二进制浮点数算术标淮是计算机底层编译标准，了解即可。

**解决浮点数运算不精准办法**

- 小数运算时，运算后的结果,再调用`toFixed()`方法保留指定的小数位数；
- `toFixed()`方法的返回值类型，是字符串类型
- `toFixed()`在指小数位时，会采用 4 舍 5 入

```html
<script>
  var a = 3.0558
  console.log(a.toFixed(2)) // 3.06
  console.log(typeof a.toFixed(2)) // string
</script>
<script>
  var a = 0.1 + 0.2
  console.log(a) // 0.30000000000000004
  console.log(a.toFixed(2)) // '0.30'
  var c = 1 + a.toFixed(2)
  console.log(c) // '10.30'
  console.log(typeof a.toFixed(2)) // string
  // 调用Number函数来强制转换
  var d = 1 + Number(a.toFixed(2))
  console.log(d) // 1.3
</script>
```

### 9、总结

关于算述表达式，我们学了以下几个点

- 算术操作符 （`+ - * / %`）
- 算述运算符优先级 （`* / %`优先级高于`+-`，可以通过添加( ) 来提升优先级，改变计算顺序）
- +号的两种作用 （"加法"和"连字符"）
- 隐式类型转换 （参于算述运算的操作数，不是数字，JS 内部会自动调用`Number()`函数，讲其转换成数字，再计算，这个过程称为隐式转换）
- 显示类型转换 （手动调用相关的函数或方法，来实现数据类型的转换，称为显示类型转换）
- `+ -` 的特殊用法 （如果`Number()`函数，能讲某个类型转换成数字，那+-也可以，这里指的是单操作数时）
- 浮点数丢失精度问题 （JS 中的小数在参于运算时不是很精准，我们可以通过调用`toFixed()`方法来指定保留的小数位）

## 二、赋值表达式

赋值操作符：就是给变量赋值用的

| 赋值操作符          | 描述     |
| :------------------ | :------- |
| =                   | 赋值     |
| +=、-=、\*=、/=、%= | 快捷赋值 |
| ++                  | 自增运算 |
| --                  | 自减运算 |

### 1、= 赋值运算符

- 赋值运算符：会将等号右边的数值，赋值给等号左边的变量
- 如下图，将`=`等号右边的`2`赋值给左边的变量`a`

![image-20220422191654531](https://www.arryblog.com/assets/img/image-20220422191654531.bb66dc02.png)

```html
<script>
  var a = 5
  var b = 2 + 4 / 2
  console.log(a, b) // 5  4;
</script>
```

### 1.1、 赋值运算也产生值

赋值运算也产生值，将等号后面的计算结果，作为“赋值运算的值”

```html
<script>
  var a
  console.log((a = 3)) // 3
  console.log((a = 1 + 4)) // 5
</script>
```

> 这就意味着，可以连续使用赋值运算符

```html
<script>
  var a, b, c
  a = b = c = 12 + 2
  console.log(a, b, c) // 14 14 14
</script>
```

### 2、快捷赋值（+=、-=、\*=、/=、%=）

快捷赋值运算符：表示在**原数值基础**上进一步计算

```html
<script>
  var a = 1
  a += 5 // 相当于 a = a + 5;
  console.log(a) // 6
  var b = 4
  b *= 2 // 相当于 b = b * 2
  console.log(b) // 8
  b /= 2 // 相当于 b = b / 2
  console.log(b) // 4
  b %= 2 // 相当于 b = b % 2;
  console.log(b) // 0
</script>
```

> 以上快捷赋值操作符仅仅是简写语法，使用它们并不会提升性能。

### 3、++ 自增 和 -- 自减 运算符

- `++` 自增：表示在自己的基础上`+1`
- `--` 自减：表示在自己的基础上`-1`

```html
<script>
  var a = 1
  a++ // a++ 相当于 a = a + 1
  console.log(a) // 2

  var b = 2
  b-- // b-- 相当于 b = b - 1;
  console.log(b) // 1
</script>
```

- `++` 和 `--` 只能和变量搭配使用

```html
<script>
  console.log(++5); // 报错
     console.log(--5); // 报错
</script>
```

### 3.1、 ++a 和 a++ 的区别

- `++a` 是先自增再赋值
- `a++` 是先赋值再自增

```html
<script>
  var b = 3
  var c = b++ // 选赋值，再自增，所以先把b的值3 赋值给变量c，然后再自增b=4
  console.log(c) // 3
  console.log(b) // 4
</script>
<script>
  var b = 3
  var c = ++b // 先自增，再赋值，所以b先自增1，得到b=4,然后把4赋值给变量c，所以c的值也是 4
  console.log(c) // 4
  console.log(b) // 4
  console.log(c++) // 4 先赋值，再自增，所以打印是4，c自增后是5
  console.log(++c) // 6 先自增，再赋值，c上面已经是5，再自增就是6，自增后再赋值，所以打印是6
</script>
```

### 3.2、--a 和 a--的区别

- `--a` 是先自减再赋值
- `a--` 是先赋值再自减

```html
<script>
  var a = 3
  var c = a-- // 先赋值，再自减，所以a先把值3赋给c，然后自已再减1，所以c是3，a是2
  console.log(c) // 3
  console.log(a) // 2
</script>
<script>
  var a = 3
  var c = --a // 先自减，再赋值，所以a先减1，a的值是2，然后再把2赋值给变量c，所以a，c都是2
  console.log(a) // 2
  console.log(c) // 2
  console.log(a--) // 2 先赋值，再自减，所以打印是2，再自减后，a=1
  console.log(--a) // 0  先自减，再赋值，上一步计算得到a=1，a再自减得到0，然后再赋值，所以打印0
</script>
```

### 4、++ 与 -- 测试题

> 下面代码的运行结果是 ？

```html
<script>
  var num1 = 1,
    num2 = 2
  var num3 = ++num1 + num2 // ++num1先自增,得到num1=2，再赋值,则2+num2=2+2=4
  console.log(num1, num3) // 2  4
</script>
```

> 下面代码的运行结果是 ？

```html
<script>
  var num1 = 1,
    num2 = 2
  var num3 = num1 + num2++ // num2 先赋值，再自增，所以 num3 = 1+2=3 ，num2 = 3
  console.log(num2, num3) // 3  3
</script>
```

> 下面代码的运行结果是？

```html
<script>
  var num1 = 2,
    num2 = 3
  /* 
    --num1 先自减得到 num1 = 1，再赋值，则 num3 = 1+num2--; 
    num2-- 先赋值，则 num3 = 1+3=4，然后num2再自减，得到 num2=2
  */
  var num3 = --num1 + num2--
  console.log(num1, num2, num3) // 1 2 4
</script>
```

## 三、关系表达式

- 说到关系表达式，肯定就离不开关系操作符。
- **关系操作符：** 用来比较两个值之间的大小关系，如果关系成立它返回`true`，如果关系不成立则返回`false`

| 关系操作符 | 描述                                      |
| :--------- | :---------------------------------------- |
| >          | 大于                                      |
| <          | 小于                                      |
| >=         | 大于或等于                                |
| <=         | 小于或等于                                |
| ==         | 等于                                      |
| !=         | 不等于                                    |
| ===        | 全等于（值和类型都比较）                  |
| !==        | 不全等于（其结果与===比较的结果正好相反） |

### 1、> 和< 以及 >= 和<=

以上操作符主要是用来比较两个值的大小关系

- 如果操作符两边的操作数，都是字符串，则不会将操作数转换成数字进行比较，而会分别比较字符串的`Unicode`编码
- 除去操作符两边的操作数都是字符串这种情况外，其它情况在在作比较时，会先将非数字类型转换为数字 **（隐式转换）** ，然后再进行比较。 整个隐式转换过程是程序内部自动调用`Number()`函数来实现的

> 以上规则，只针对基本数据类型而言

### 1.1、操作符两边的数，不都是字符串

```js
//  数字与数字作比较，最简单
1 > 2 // false
2 > 1 // true
2 >= 1 // true

// 数字与非数字作比较
1 > true // false  等价于 1>1
1 > '2' // false 等价于 1>2
1 <= 'a' // false 等价于 1<=NaN

// 字符串与布尔值作比较
'' <= false // true  等价于 0<=0
// null 和 undefined与数字作比较
null >= 0 // true 等价于 0>=0
undefined <= 0 // false 等价于 NaN<=0

// 字符串与null 和undefined作比较
'' >= null // true 等价于 0>=0
'' <= undefined // false 等价于 0<=NaN

// null与undefined作比较
null >= undefined // false 等价于 0>=NaN
```

### 1.2、字符串与字符串做比较

- 字符串与字符串作比较时，不会将其转换成数字进行比较，而会分别比较字符串的`Unicode`编码
- 比较字符编码时，是一位一位进行比较，如果两位一样，则比校下一位

**英文字母对应的 Unicode 编码**

- `A~Z` 对应 65~ 90 也就是`A`的`Unicode`编码是`65` 、 `Z` 的`Unicode`编码是 `90`
- `a~z` 对应 97~122
- `0~9` 对应 48~57

```js
// 先把两边的第一位拿出来作比较，即 'a' < 'b' ，比较时比较的是Unicode编码，则 97<98，所以结果为 true
'abc' < 'b' // true;

// 先把两边的第一位拿出来作比较，即 '1' < '5' ，比较时比较的是Unicode编码，则49 < 53 ,所以结果为 true
'11' < '5' // true;

// 先把两边的第一位拿出来作比较，如果两位一样，则比较下一位，所以拿第二位来比较，则'b'<'c'，比较时比较的是Unicode编码，则 98 < 99 ,所以结果为 true
'abc' < 'acd' // true
```

### 2、JS 中没有连比

JS 中是没有**连比**的功能，我们来看下面的列子

```html
<script>
  /*
   *  1<3<2 为什么会得到 true ?
   *  他是从左往右开始比较，1 < 3 这个表达式返回值为true
   *  再拿true与2作比较，那 true < 2
   *  数值与其它类型做比较时，会先将其转换成数字，再比较，true转数字转成 1
   *  即 1 < 2 吗 ？那肯定小于，所以返回结果就为 true
   */
  console.log(1 < 3 < 2) // true 但是本质上是错的，3不可能小于 2
</script>
```

> 那如果要判断一个数是不是`> 1`同时`< 4`，我们可以用后面学到的`&&`与操作符和`||`或操作符来实现

### 3、`==` 和 `!=`

- `==`用来比较操作符两边值（隐式转换后）是否相等，在比较时，不会比较两边值的类型
- 如果值（隐式转换后）相等，返回`true`，不相等，则返回`false`
- 在比较时同样会做**隐式类型转换**，非数字类型会自动调用`Number()`函数，转成数字再比较
- 以上规则，只适用于基本数据类型

```js
1 == true // true
0 == '' // true
// ‘’ 转成数字是 0   false转成数字是 0 所以0==0 是true
'' == false // true
```

- `!=`是用来比较两个值（隐式转换后）是否不相等，如果相等返回 false,如果不相等，返回 true

```js
1 != true // false
0 != '' // false
'' != false // false
1 != '1' // false
```

> **特殊情况：** `null == undefined` 结果为`true`

### 4、`===`和 `!==`

- `===`用来比较两边的值是否**全等**，如果全等则为`true`,不全等则为`false`。
- **全等**：不仅在比较是会比较值大小，还会比较值的类型
- `====`只操作符两边的数长的一模一样，才会是 true，否则就是 false

> **注意区分：** 而前面讲的`==`只会比较两个值（隐式转换后）的大小，不会比较类型。

```js
1 == '1' // true 只比较值
1 === '1' // false  同时比较值和类型
1 == true // true 只比较值
1 === true // false 同时比较值和类型
```

!== 不全等

- `!==` 用来比较两边值是否不全等，如果是则返回`true`,不是返回`false`
- `!==`的结果，正好是`===`结果的反面，如果`===`返回结果是`true`，那`！==`返回结果就是`false`

```js
1!=true; // false
1!==true; // true
1！==1; // false
1!='我'; // true
```

- `!==`的结果，正好是`===`结果的反面。

```js
1 !== 1 // false
1 !== '1' // true
1 !== true // true
```

### 5、 特殊的比较

```js
undefined == null // true
undefined === null // false

NaN == NaN // false
NaN === NaN // false

NaN !== NaN // true
NaN != NaN // true
```

### 6、区分 = 、== 、=== 的区别

- `=` 是赋值
- `==` 是比较 但只比较值
- `===` 是比较 同时比较值和类型

```html
<script>
  var a = 3
  console.log((a = '3')) // "3"   a = "3" 是赋值表达式，返回结果为=右边的值
  console.log(a == 3) // true a == 3 关系表达式 比较时，只比较值（隐式转换后值）
  console.log(a === '3') // true a === "3" 关系表达式，比较时，比较值同时还比较类型
  console.log(a === 3) // false a === 3 关系表达式，比较时，比较值同时还比较类型
</script>
```

### 7、总结

| 操作符         | 重点                                                                                                                                                                                               |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `>、<、>=、<=` | 字符串与字符串之间的比较，是按位比较，比较的是字符的`Unicode`编码 其它基本数据类型之间的比较，在比较时会将非数字类型的数，自动调用`Number`函数隐式将数据类型转的为数字，再比较 注意：JS 中没有连比 |
| `== 、!=`      | `==`和`!=`在比较时，只比较值，不比较类型                                                                                                                                                           |
| `=== 、!==`    | `===`和`!===`在比较时，除了比较值，还要比较类型 特殊比较：`null==undefined`值为`true` `null===undefined` 值为`false`                                                                               |

> **重点：** 弄清`= 、==、===`三者之间的区别

## 四、逻辑表达式

逻辑运算符用来表示日常交流中的 “并且”，“或者”，“非” 等思想。

| 逻辑运算符 | 描述              |
| :--------- | :---------------- |
| !          | 逻辑非 否定的意思 |
| &&         | 逻辑与 并且的意思 |
| \|\|       | 逻辑或 或者的意思 |

### 1、！非运算符

- `!`非运算符也叫"取反运算符"
- `!`非是一个**单目运算符**，所谓单目运算符，就是这个操作符只能有一个操作数
- 操作数可以是任何类型的
- `!`运算时也会用到隐式转换，如果操作数为非布尔值，其内部会自动调用`Boolean`函数，将其隐式转换为布尔类型的值后，再取反操作，最后将值返回。
- 所以`!`非运算的结果一定是**布尔值**

```js
!true // false
!3 // false
!0 // true
!undefined // true
!'' // true
!'我' // false
!5 > 2 // false !5 转成布尔值是false，则 false > 2比较时，false 转成数字是 0,则 0 > 2，为 false
```

- 我们可以通过对一个值两次取反操作，将其变为一个 Boolean 类型的值

```js
!!3 // true;
!!undefined // false
```

总结：将基本数据类型转换为布尔值的 2 种方法

- 方法一：调用`Boolean()`函数来实现
- 方法二：在一个数值或变量前加`!!`(两次取反）操作，也可以实现

### 2、&&与操作符

- `&&`与操作符，表示**并且**的意思，可以对`&&`符号两侧的值进行与运算并返回结果
- &&与操作符是一种短路操作符，他有一个非常重要计算规则，就是 **&&与的短路计算**

### 2.1、&&与的短路计算规则

- 如果第一个操作数**转为布尔值**是`false`，则就不会看第二个操作数了。返回结果为**第一个操作数**的返回结果
- 如果第一个操作数**转为布尔值**是`true`，则会看第二个操作数。返回结果为**第二个操作数**的返回结果
- 上面提到的"**操作数**"，可以是一个表达式、值、函数、对象等任何类型

如何记忆：

- `A && B`，表示 A 和 B 两个都要满足条件（即都为真）才行。
- 所以只要 A 为假，就不满足条件了，所以就没必要再看 B 了，直接把 A 的结果返回就好
- 如果 A 为满足条件（为真），那我肯定要看下 B 是不是满足条件
- 如果 B 不满足条（为假），那最后结果只能是假了，所以将 B 的结果返回
- 如果 B 满足条件（为真），那最后结果是真，也将 B 的结果返回。

**演示代码：**

- 两操作数都是布尔值

```js
false && true // false
true && false // false
true && true // true;
```

> 只要有一个是`false`，返回值就是`false`，只有两个都为`true`，才返回`true`

- 两操作数，都非表达式

```js
1 && 2 // 2  1转换为布尔值是true，所以看第二个操作数，返回值为第二个操作数 2
0 && 3 // 0  0转换为布尔值是false，所不看第二个操作数，返回值为第1个操作数 0
'' && 1 // ''  ‘’转换为布尔值是false，所不看第二个操作数，返回值为第1个操作数 ‘’
undefined && NaN // undefined;  undefined转换为布尔值是false，所不看第二个操作数，返回值为第1个操作数 undefined
```

- 两操作数，至少有一个是表达式

```js
true && alert('我能出来喽') // 页面显示弹窗
false && alert('我是不会出来的') // false  第一个操作数为false，则不看第二个操作数，返回值为第一个操作数false
2 + 3 && 4 + 5 // 9  2+3结果为5,转换为布尔值是true,则看第二个操作数（4+5），返回值为第二个操作数，第二个操作数是表达式，所以返回值为第二个表达式的返回值 9
3 - 3 && 1 // 0  3-3结果为0,转换为布尔值是false,则不看第二个操作数，返回值为第一个操作数，第1个操作数是表达式，所以返回值为第1个表达式的返回值0
```

> 以上演示代码，直接把对应代码，在浏览器的 console 控制台输入，查看效果

### 2.2、测试题

> 以下代码的执行后的结果是多少？

```html
<script>
  var a = 1,
    b = 2,
    c
  c = a < b && a++
  console.log(c, a)
  c = a > b && --a
  console.log(c, a)
  a == b && alert('a和b相等了')
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br></p></details>

### 2.2、 如何判断一个数的范围

```js
var a = 10
console.log(a > 5 && a < 12) // true   这个逻辑表达示的含 义是： a>5 同时 a<12 ？
console.log(a > 5 && a < 8) // false
```

> 表达式都会有一个返回值，所以我们可以用一个变量来接受表达式的返回值

```html
<script>
  var a = 10
  var b
  b = a > 5 && a < 12
  console.log(b) // true
  b = a > 5 && a + 2
  console.log(b) // 12
</script>
```

### 2.3 、 如何判断一个值是不是 NaN

- NaN 是一个不是数字的，数字类型，利用这个特性来判断

```js
var a = NaN
var _isNaN = isNaN(a) && typeof a === 'number'
consloe.log(_isNaN)
```

- NaN 自己不等于自已利用 这个特性来判断（暂时看不懂代码没关系，了解即可）

```html
<script>
  function _isNaN(n) {
    if (n !== n) {
      return true
    } else {
      return false
    }
  }
  console.log(_isNaN(NaN)) // true
</script>
```

### 3、|| 或 操作符

- `||`或操作符，表示**或者**的意思，可以对`||`符号两侧的值进行或运算并返回结果
- `||`或操作符是一种短路操作符，他一个非常重要计算规则，就是`||`**或的短路计算**

### 3.1、|| 或的短路计算规则

- 第一个操作数转换为布尔值是`true`,则就不会看第二个操作数。返回结果为第一个操作数的返回结果
- 第一个操作数转换为布尔值是`false`，则就会看第二个操作数。返回结果为第二个操作数的返回结果
- 上面提到的"操作数"，可以是一个表达式、值、函数、对象等任何类型

如何记忆：

- `A || B`，表示 A 或 B 中只有一个满足条件就可以
- 所以只要 A 为真，就满足条件了，所以就没必要再看 B 了，所以就把 A 的结果返回
- 如果 A 不满足条件，那我肯定要看下 B 是否满足条件
- 如果 B 满足条件（为真），那最后肯定是真了，所以把 B 的结果返回
- 如果 B 不满足条件（为假），那最后肯定是假了，所以把 B 的结果返回。

**演示代码：**

- 两操作数都是布尔值

```js
true || true // true   第1个操作数是true，则不看第2个操作数，将第1个操作数作为结果返回 true
true || false // true  第1个操作数是true，则不看第2个操作数，将第1个操作数作为结果返回 true
false || true // true  第1个操作数是false，则看第二个操作数，将第2个操作数作为结果返回 true
false || false // false; 第1个操作数是false，则看第二个操作数，将第2个操作数作为结果返回 false
```

- 两操作数，都非表达式

```js
1 || 2 // 1  第1个操作数转boolean值是true，则不看第2个操作数，将第1个操作数作为结果返回 1
0 || 3 // 3  第1个操作数转boolean值是false，则看第2个操作数，将第2个操作数作为结果返回 3
'' || 1 // 1  第1个操作数转boolean值是false，则看第2个操作数，将第2个操作数作为结果返回 1
undefined || NaN // NaN  第1个操作数转boolean值是false，则看第2个操作数，将第2个操作数作为结果返回 NaN
true || alert('我是不会出来的') // 不会弹出弹窗
false || alert('我肯定能出来喽') // 弹出弹窗
var a = 10
a > 3 || a < 12 // true  第一个操作数a>3返回值为true,则不看第二个操作数，把第1个操作数的结果作为结果返回
a > 11 || a - 10 // 0  第一个操作数a>11返回值为false,则看第二个操作数，把第2个操作数的结果作为结果返回 0
```

### 3.2、测试题

> 以下代码，输出的结果？

```html
<script>
  var a = 1,
    b = 2,
    c
  c = a < b || a++
  console.log(c) // true
  c = a > b || a--
  console.log(a, c) // 0 1
</script>
```

### 4、逻辑操作符优先级

逻辑操作符优先级是： `！` 非 --> `&&` 与 --> `||` 或 （从左到右，优先级从高到低）

```js
/*
 * 逻辑表达式 1 && false  ||  4 && 5;  表示 1 && false 和 4 && 5中只要有一个成立，就成立
 * 由于 ||或操作符的短路特性，所以他需要先计算||或左边的值，再判断是否要看操作符右边值
 * 先算 1 && false 得到 false || 4 && 5 , ||左边是false，则要看第二个操作数，得到 false || 5
 * 再计算 false || 5   的结果，得到5
 */
;(1 && false) || (4 && 5) // 5
;(1 && 2) || (4 && 5) // 2
;(1 && true) || (!'' && 2) // true
```

## 五、综合表达式

- 综合表达式：就是 **算术操作符**、**赋值操作符**、**关系操作符**、**逻辑操作符**出现在同一个表达式中。
- 那这些操作符混在一起使用，他们的优先级就显得很重要。
- 操作符的优先级，从上往下，优先级从高到低，如下：
  - ++ 和 -- 运算符
  - 非运算符（！）
  - 算术运算符( %、/、\* 、+、-)
  - 关系运算符（>、<、>=、<=、== 、!=、===、!==)
  - 逻辑运算符（&& 、||）
  - 赋值运算符（=、+=、-=、/=、%=）

综合表达式的计算规则

- 如果操作符优先级一样，则从左往右算
- 可以用`()`来改变优先级,改变计算顺序
- 为了提高代码可读性，在实际开发中，我们都会添加`()`，这样能更直接的知道代码的执行顺序

### 1、测试题

> 以下代码，最终输出的结果是 ？

```html
<script>
  var a = 0,
    c
  c = !3 + 4 / 2 > 5 && ++a
  console.log(c, a) // false 0
</script>
```

![image-20220908171818639](https://www.arryblog.com/assets/img/image-20220908171818639.16e45ca9.png)

> 以下代码，最终的输出结果是 ？

```html
<script>
  var a = 10
  var b = (a++ && a < 11) || a++
  var c = a + 1 && a + 2
  console.log(b, c, a) // 11  14  12
</script>
```

![image-20220423154727969](https://www.arryblog.com/assets/img/image-20220423154727969.1cbe9eb5.png)

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、所有操作符优先级

- 关于每一个运算符的详细优先级，可以参考下面这张图
- 在下图中，越在最上面的，优先级越高，越优先计算。

![img](https://www.arryblog.com/assets/img/image-20211118231543611-16506252657003.850c263a.png)

## 六、三元（条件）运算符

- JavaScript 中提供了一种叫做 "三元运算" 的语法形式，让我们可以方便地实现选择
- 他更想是`if..else`语句的紧凑版

```js
条件表达式 ? 表达式1 : 表达式2
```

执行流程

- 首先对**条件表达式**进行求值，条件表达式的值会被
- 如果条件表达式的值为 true，则执行语句 1，并返回执行结果
- 如果条件表达式的值为 false，则执行语句 2，并返回执行结果

```js
2 > 1 ? 1 + 1 : 2 + 3 // 2
;<script>
  var a = 6; // 首先判断a>5为真吗？这里肯定为真，所以就会执行a--，a--是先赋值，再自减 var b = a > 5
  ? a-- : a++; console.log(a, b); // 5 6
</script>
```

注意事项

三元运算符，虽然回有返回结果，但我们并不一定要用一个变量来接受，有些时候，我们并不关心他的返回值

```js
var a = 2
// 这种情况下，我们更关心，满足条件要做什么事，不满足条件做什么事，并不关心返回结果
a > 1 ? alert(a + '大于1') : alert(a + '小于1')
// 同时这种情况，不管 a>1 是真是假，最终返回结果都是undefined,因为 alert() 方法返回值是undefined
var b = a > 1 ? alert(a + '大于1') : alert(a + '小于1')
console.log(b) // undefined
```

> 更多实际应用，在扩展知识中会讲到

**实战案例：补 0 操作**

- 当我们获取当前日期时，如果计算得到的日，月小于 10 的时候，都会以一位数的方式显示，如：`2022年8月17日`，而我们希望以两位的方式显示，如：`2022年08月17日`
- 这个时候就会涉及到补 0 的问题了。

```js
// 未补0
var date = new Date()
var year = date.getFullYear() // 获取完整的年份(4位)
var month = date.getMonth() + 1 // date.getMonth()获取当前月份(0-11,0代表1月),所以要加1
var day = date.getDate() // 获取当前日(1-31)
var currentDate = year + '年' + month + '月' + day + '日'
console.log(currentDate) // 2022年8月17日
// 完整的补0后效果
// var date = new Date("2019/1/3");
var date = new Date()
var year = date.getFullYear() // 获取完整的年份(4位)
var month = date.getMonth() + 1 // date.getMonth()获取当前月份(0-11,0代表1月),所以要加1
var day = date.getDate() // 获取当前日(1-31)
month = month < 10 ? '0' + month : month // 月份小于10，数字前补0
day = day < 10 ? '0' + day : day // 日小于10，数字前补0
var currentDate = year + '年' + month + '月' + day + '日'
console.log(currentDate) // 2022年08月17日
```

## 七、重点难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、表达式种类，每种表达式分别有哪些操作符

| 算术表达式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 赋值表达式                                                                                                           | 关系表达式                                                                                                           | 逻辑表达式                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![img](data:image/png;base64,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) | ![8f851432b55457f8c4680c0f9c823ca](https://www.arryblog.com/assets/img/8f851432b55457f8c4680c0f9c823ca.9318c4fa.png) | ![dd261545a8759c54f5bb5fd4f372356](https://www.arryblog.com/assets/img/dd261545a8759c54f5bb5fd4f372356.6f6c00c4.png) | ![aa54572457174edd5f9eb91dbdd90ad-16510356239953](data:image/png;base64,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) |

> 当然还有综合表达式，是所有上述表达式中对应的操作符的综合应用。

### 2、每种表达式中运算顺序是什么？ 综合运算顺序是什么？

![img](https://www.arryblog.com/assets/img/2022-4-27-1.2cb0ea6f.png)

注：

在做运算时，要特别注意 `&&` 和`||`的短路计算，还有`++a`、`a++`、`--a`、`a--`的特性。

可以用下面这道题再来检验下自己是否理解了。

```html
<script>
  var a = 0
  var b = 2
  var c = (!3 && false) || (--a && b++) // b++ 先赋值，再自增
  console.log(a, b, c) // -1 3 2
</script>
```

### 3、隐式转换和显示（强制）类型转换

- 如果参与`数学运算`的某操作数不是数字类型，那么 JS 会自动将其转换为数字类型，然后再计算。这一过程称为**隐式转换**
- 数学运算时，其 JS 内部自动调用的是 `Number()`来转换
- `+、-`运算符在做类型转换时，内部也是自动调用的`Number()`来实现的
- `!`非运算符在做为型转换时，其内部是自动调用的`Boolean()`函数来实现转换
- `!!`两次取返操作，把值转换成对应的 boolean 值，其内部也是调用的`Boolean()`函数来实现的

```js
// 隐式转换
'' >= true // false
// + 做数据类型转换
typeof +'1' // 'number'
// !!两次取反，可以把
!!5 // true
```

手动的调用相关函数或方法来实现数据类型转换

比如：前面讲过的`Number()`、`parseInt()`、`parseFloat()`来转换数据类型，这种方式，称为 **显示类型转换**。

### 4、什么 &&与短路计算 和 || 或短路计算 ？

&& 与 运算规则

- 如果第一个操作数**转为布尔值**是`false`,则就不会看第二个操作数了。返回结果为**第一个操作数**的返回结果
- 如果第一个操作数**转为布尔值**是`true`,则会看第二个操作数。返回结果为**第二个操作数**的返回结果
- 上面提到的"**操作数**"，可以是一个表达式、值、函数、对象等任何类型

**|| 或运算符规则**

- 第一个操作数转换为布尔值是`true`,则就不会看第二个操作数。返回结果为第一个操作数的返回结果
- 第一个操作数转换为布尔值是`false`，则就会看第二个操作数。返回结果为第二个操作数的返回结果
- 上面提到的"操作数"，可以是一个表达式、值、函数、对象等任何类型

```js
1 && 2 // 2
1 || 2 // 1
```

### 5、a++ 和 ++a 及 a-- 与 --a 的区别

- `a++`是先赋值，再自增 `++a`是先自增再赋值
- `a--`是先赋值，再自减 `--a` 是先自减，再赋值

```js
var a = 0
console.log(a++) // 0
console.log(++a) // 2
console.log(a--) // 2
console.log(--a) // 0
```

### 6、= 和 == 和 === 三者的区别

- = 赋值
- == 比较，只比较两个值的大小
- === 比较，比较值的同时还比较类型

```html
<script>
  var a
  console.log((a = 5)) // 5
  console.log(a == '5') // true
  console.log(a === '5') // false
  console.log(a === 5) // true
</script>
```

- 特殊的 null 与 undefined 与 NaN

```js
null == undefined // true
null === undefined // false
NaN == NaN // false
NaN === NaN // false
NaN != NaN // true
NaN !== NaN // true
```

## 八、综合案例

判断当前输入年份，是否是闰年 ?

需求分析：

- 公历闰年的简单计算方法（符合以下条件之一即可）
  - 能被 4 整除且不能被 100 整除
  - 能被 100 整除也能被 400 整除
- 1950-2050 年之间的闰年有: 1952、1956、1960、1964、1968、1972、1976、1980、1984、1988、1992、1996、2000、2004、2008、2012、2016、2020、2024、2028、2032、2036

**代码实现思路：**

- 利用 prompt() 弹出输入框，让用户输入年份
- 定义变量 var year 来接受，用户输入的年份
- 对接收到的值做判断，判断条件就是需求中提到的，两个条件中有一个满足就可，所以选择`||`操作符
- 判断表达式： 左边条件 1 `||`右边条件 2

```html
<script>
  var year = parseInt(prompt('请输入年份'))
  var isRun = (year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)
  alert(year + '是闰年吗？' + isRun)
</script>
```

## 九、作业

- 1、完成以下几道测试题，并写明计算的整个过程

```html
<script>
  var a = 0
  var b = 2
  ;(3 && true) || (--a && b++)
  console.log(a, b)
</script>
<script>
  var a = 0
  var b = 2
  var c = (3 && false) || (--a && b++) // b++ 先赋值，再自增
  console.log(a, b, c)
</script>
<script>
  var num1 = 1,
    num2 = 3
  var num3 = ++num1 + --num2
</script>
```

- 2、把课堂最后的综合案例，按先分析需求，再思考代码实现的方式来思考，最后把代码写出来
- 3、把课堂上老师讲的知识点，都自己手动敲一遍。
- 4、把课堂上的测试题，自己在不看答案的情况下，重做一遍

## 十、位运算符（难点-大厂必考）

- 在这里我们扩展位运算方面的知识，这些知识点相对比较底层，理解起来也有一定的难度，但很重要，是大厂面试必考知识点
- 我们很多时候在网上看大神写的代码，经常会出现位操作符，很多人看到位操作符，整个人就蒙圈了
- 但我保证，我给你讲完位操作符后，你肯定通透的很，对于位运算符，将再也不恐惧了。此处来点掌声

为了让大家能听得懂，在讲解位运算符之前，我们要把二进制相关的内容了解透彻，比如以下三点

- 正十进制数如何转二进制
- 二进制如何转十进制
- 负十进制数如何转二进制
- 如何一眼区分二进制数是正数还是负数
- 最终版，二进制如何转换成十进制

> 进制转换工具：[https://tool.lu/hexconvert/ (opens new window)](https://tool.lu/hexconvert/)可以用来校验进制转换后的效果

了解了以上三方面内容后，我们再来学习位运算。

### 1、正十进制如何转二进制

要理解 10 进制如何转二进制，我们可以来思考下面这个问题：

如何得到 153 对应 百，十，个位上的数呢 ？

![image-20211217203754752](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZEAAACpCAYAAADqfwAjAAAXKUlEQVR4nO3de1hU550H8O+ZCwMMouUmEKNiTBqV6CIaa/usGrVRY3NpKssazZrYBPNYL7k93RAx3XhNmt0SY56uN5K0PmraRp/Wdqs1opFdK25UVkTQSOSignKTSAYG5nL2j3HGuXGZl2HOMH4/z+PzZOYczvnNGM/3vJfzIsmyLIOIiEiASukCiIio/2KIEBGRMIYIEREJY4gQEZEwhggREQljiBARkTCGCBERCWOIEBGRMIYIEREJY4gQEZEwhggREQljiBARkTCGCBERCdMoXUB/d+bMGeTn56O4uBiNjY1oampCYWGh0mUREQUEQ0RQRUUFsrOzcenSJaVLISJSDENEwN69e7FhwwYAQFRUFGbOnInJkycjKSkJSUlJCldHRBQ4En8plW/KysqwcOFCAEBGRgaWLVuGqKgohasiIlIGQ8RHmZmZKC8vR0ZGBt544w2lyyEiUhRnZ/mgpKQE5eXliIyMxNKlS5Uuh4hIcQwRHxw8eBAA8MgjjyA6Olrhajohy7D891EYfvxDGGZOQvu6VUpXREQhjAPrPiguLgYATJ06VeFKvLBaYD13Fu3bPoD1qwsAeymJKAAYIj5oamoCANxzzz0KV+LK9NkemD79LeTmJqVLIaK7DLuzfNDc3Awg+ELEeqGEAUJEimCI+KCtrQ0AMGDAAIUr8U5KGIyw5a9DNSpV6VKI6C7B7qwQoH3qn6B99gWohg4HWlthPnJI6ZKI6C7BEAkBqtRxSpdARHcpdmcREZEwhggREQljiBARkTCGCBERCWOIEBGRMIYIEREJY4gQEZEwhggREQljiBARkTCGCBERCeOyJ6FGr0fEpu1KV0FEdwm2RIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIFLR48WJkZmaipqZG6VKIhDBEiBR09uxZlJeXIysri0FC/RJDhCgI1NbWMkioX2KIEAWBpKQkBgn1SwwRoiCwbds2R5AsWbKEQUL9BkOEKAgkJyc7gqSmpoZBQv0GQ4QoSLgHCbu2qD9giBAFEecg4RgJ9QcMEaIg4x4k7NqiYMYQIQpC7Nqi/kLTk51kWUZRURHefvttXL16FYsWLcKKFSu87ltUVISTJ092ebzZs2dj+PDhjtcdHR0oKirCwYMHcfHiRVRUVCA5ORkpKSl46qmn8PDDDyMsLMyHj+V/zc3NAIDo6GhF6/Cq5RY6duZBbrnV6S6qe+6FNmMBoNMFsDDqDXuQZGVlOVokW7duRXJystKlETl0GSJWqxXl5eXYvn07CgoKYDabuz1gdXU1tm/f3uU+EydOdAmRc+fOYenSpS77VFZWorKyEkePHsXUqVORk5ODmJiYbs/fV6qqqgAgKP8By+1GmP/nKOS6G53uoxozFtofZ4ZEiHR0dKChoUHpMgLCOUjss7YUDRKDAW1vvgxVfAJ0Oet7dSi5oQ5tK16A7qWXoZ4y3eefN+3cAQDQPvtCt8e1lpXAuCYb4W9thGpUaqfHtBQcgbkgX/iz9fQ89n3b3lgBGAzQTJvpcU779rB5z3h8xvZ1q6AaluLxvhI6DZFDhw4hLy8P5eXlPh3QYDAIFxMbG4vExERYrVZcvXoVLS0tAIBjx45hzJgxWLx4MSRJEj5+b3z11VcAgMTEREXO3yVjO9CDgA8VmZmZqK6uVrqMgHEPkqysLGzbtk2RIJHbDJDrb0A1YVKvj2UtLQEASAmD0frME13eBDmzX3Cl+MFo/89cqIaNEAohd3JDHdq3vA/1hO8BBgNM+/ag4zdd3xCrxoxFxIb3Ab2+033a162C+YvDXn9Wv/vPgF4PuaEOMBhcjiPX10HSR0Ez5wmPOqX4wY7aOgsS084dHvX3pF5fdRoiFy5c8DlAALjcIebm5mLs2LEe++jdPkBMTAy2bt2K8ePHQ6WyDdNcv34dq1evxpkzZwAAx48fx7x58zBw4ECfa+otk8mEPXv2AAB+8IMfBPz83ZFbvoHcbgQAqL47CuFvvA1ERLjupNECkZEKVOd/9gBJSkpSuBL/SEtL63Yf964tpYJErq+DbPgWqmEjPLZZCo7AuCbb68+FLXrR9WJnMKBj7x6oRz8E1YNjELl7f5fn9XaHr5n9OOT6GzD+xzpExCd0e+ffnY4tmyDFD4ZuyUpAr4f22Rf8dqfvraXhTIpL8HjPXJAP9eiHPLZJcQkIW7ICUmQkOj7bDfWE73X62cPf2ugIWHsLrfXF+Yj4YIfXc4rodkwkNTUVixYtwueff45Dhw75dHC9Xo9BgwZ1u19KSgpSUlJc3ktMTMScOXMcIWKxWCDLsk/n95ddu3ahqqoKMTExmD17tiI19JhGCykmzq93GsHqL3/5i9IlBFQwjJHI9XUAACne+wVIShjseoG63f3lzlpdAbnuOrQvrexVPdqn58N86iTk+jpY6l1DzFugtS3/KQDPO/L2datgra8Tvkt3v+u3nyf8rY0+HwuwhablfDHC39rYaUvG/Vx29sB2D0ApLgG6l16GcU02rKUlfmm9AV2EyGOPPYaMjAwkJiaivb0d+fn53R7MaDTixg1bk3Tw4ME9CpDOyLKMmzdvOl4PGTIE4eHhwscT9fHHH+PDDz8EADz33HOIDMK7ebn+dlMYgBQbFzItDvKkRNeW/Q7WubvJ+cJlDw5fmPbuASSp0zDqMb0eEZvuXLz1h0/6PCbSvm4VLKXnEPHBDshtBhjffBnhq9f7dKduv2h7O4+5oPtrpzvLqULH96PLWd/r8Sd31qrLUKOPQ2TkyJG9PvjFixfR0NCAyMhIDB8+HAMGDOjRz5nNZpw4cQL79u2zFanRYNq0aQENkRMnTiAvLw9FRUUAgKysLCxYsCBg5xf2TTPMx/IBiwWq4SOgGjoc0GqVror8KNAtEikuwdbd5GVQ3bRzB8ynTkKK6Pndu7WsBOYvT0DSRzne89Z/D3jpBvMzS8ERWOvrELl9D6DXw7RzB6yVX9vGI/zU3QMA5i8Od9maAJy6ngwGmE+5znC1f8+dtZTsXYndfV/WqssA4LU7UlSPpvj2lMlkcrQebty4gdWrV7tsnzZtGl5//XWvfdlXrlzBu+++i/r6elRWVjpmgsXGxuKVV17BjBkz/FkqAKC9vR23bt3CrVu30NzcjPLycpSUlKC0tBSVlZUAgEGDBuH555/HwoUL/X5+f7E21jv+23L2DCxnz9zZqNMhbP5z0GY+yzAJIYq0SG4Pqmt+Ml/8IAYD2rdsuj2IHOWyyaWLqZNuMDvn0OnNYLF6ynREOI0ZmA7sR/hrOb0eX3HnPibSVcvIcvokrOeLISUMvlPnhO/B9Nc/wVpd4bU2c0E+pITBHoPwLsctOIKO32yHasxYqNN7PzHCzq8hYrFYupyd9cUXX+Dy5cvIzc11meIL2FofFRUVuH79uuO9ESNGYP78+Zg8ebJjwN1fFi9ejLNnz3a6fciQIZg7dy4yMzMVGcz3ybctnW9rb0fHJ1thrb0G3SvZgMavf+WkIPcWycqVK/GHP/yhz85nLS2BbPjWpQvKWlUBVXxCjy/gpn17INffQNjSV2D6bLdwLfbuI/sduj90bNkE9eiHoJ4yvdOWkTfeQqzjtztg+fKE72MitycceJxjaAqkhERYThV6hojBAGt9nddBeDv75wno7CwRWq0WS5YsgVqtdrxXU1ODP/7xjygpsU3nq66uxr59+7BixQponC5oGo0GKSkpiI2Nxc2bN1FTU4PLly9j/fr12LJlC9atW4eHH37Yn+V2a+DAgYo/5NgT6rHjofv5LwD7997RDvPfC2A5eRywWgEA5mOHoZ39OFQP/YOClVJfCNS0d2vVZaiG3wfVUNskGLmhDpbSc9B2cffrcYz6OoSv3uAYoPcXuaEObS+udBm36WpgHXDtKjPt3AHzF4cRtuhFAOh0Zpb92Y3w13I8BqadZ6epH3sS4RvfB+DbmIhp3x5YK7+Gdt4zrj+n10MzYRLMp05C+/R8lxCwVlfAWvk1wjppITq3QPwdIICfQ0Sv1+P73/++x/uzZs3C2rVrHbO7SkpKYDAYXO7w7733XscANgDU19fjV7/6FQ4dOoTGxka89957yM3NxZAhQ/xS60cffdRtd9Yvf/lLbNu2Lei7s1TjxnusX6OZ8wTMn/8V7f++DrBYAKMRlnP/xxAJIc5LxiclJWHTpk19d7Lb/fTOrQ65vg6QZdtzFT2ke/VNAICl/ohfy3OM28D3hw2tZSXo6EWrCLANzgNAxOY8GNdke3wnqmEpLg8PdvWdhb+WA8AzfFTDRsD62W6PLi3LqUJI+iioRnvvgjMX5AN6PXQvreyTWZsBWTsrMjISEydOdLzuyXTd+Ph4/OxnP8PQoUMBAJcvX8aFCxf8WpdOp0N8fDzuu+8+pKenIzMzE2vXrsXevXvx4YcfIi0tDc3NzcjNzcXWrVv9eu5AUI8bD+k7sXfesNw9DySGOuf1tOzdWn061Vevhyo+AeYvT8BaZutVsJwqhJSQ6GiZBAt7uPVk5pf9wq6d8yRUYzyfaeupTmdQ3e5qAgDVqFTo/2QLz7blP4Xc6tn1r332hU6n3qpGp0LSR9lmbjkd33zqZJddWQAg6aN6PxOuE0G9AGNkZKTLg4m9eRreV5MnT8aOHTuwbNkyALbfPLdr166AnZ+oM/YAqa2tRVJSUsCeFdHlrEf4azloW/5TmPZ9CtOB/dBMmOS3u1vr+WIYnpwOw8xJMDw5HdbzxULH8SXcLKcKETbvGYT10Qwwuc0AGL51aXlon30BEZvzANjCpG3li44p+l2R4hKgHv0QrFUVjvfsXVmaKZ1PPNLlrEfk7v1+nW3mzK8h0tbWBqPR6PF+Q0MDDhw44Hh9//33O8LBaDSiurraa8vk/PnzuHTpkuO1EmtnPf/881i+fDkA4JNPPkFra2vAa+iS2Qy5uQlw//5kGea//Rdk+8wttRqq744OfH3kV/YurNra2sC0QNyop0xHxOY8dPxmGwB0ORvIV6oxY6H/0xHoD590/PF1eq+9a6qn4ebPp9K91lNaArnV4LUVIEXqEbE5D5oJttC0FHTfxaeZMgOW0nO2ZVLQfVdWIPh1TKS0tBTZ2dmYNWuWY+Xdq1ev4ve//71jCZUBAwZgzpw50N6ebmo0GrF69WpotVrMnTsXycnJ6OjoQGFhIfbt2+eY6puWloZRo0b5s9weW7BgAfbv34+qqiocPHgQTz/9tCJ1eNXeDuO/vQH5ZhM00x+Fasgw28D6kb/ZpvreDhd16jiox4xTuFj/+tGPfqR0CX6RlpaGtWvXdrufcwvEean4QDPt3QMYDJANBhjXrvLLYK3oxdz5rlxuqINx7Zte15tSSmdLlzjz5bNL8QmQDd/anjhPn9R9V9btqdLWyq8R8c4Hfp+6DPg5RACgsbERu3fvxu7dngNVGo0Gr776KsaPH++xraioyPFgn7vY2FhkZWUhLi7O3+X2iFarxfz58/HOO+/g+PHjwRUiACDLkK9dgWlnntfNUvIQ6F7PCZmlUIYOHYrq6mrU1tYqXYpf1NbWdhsi3rqwlAiQ9nWrYP7yBCI250E1NAVtb77sWIsJAOS6G2j958c9f7CXCzbK9XUeT7g7LwdiOX0S0OshRURC93pOn3Xd+MJScMT2Xb3zgd+O6TyuYi0r6XJWVqD4NUQGDhyIUaNGoayszGPbxIkTsXz5cowePdplSmJ4eDjS09NRVVXlWLXXLiwsDHPmzMHixYv9NitL1AMPPAAALs+xBAWNBqohQ2H9qgwwmVy3abXQPDoXuqzlHg929We/+93vQmYp+Mcf93LBdeMeIIqs4Hv7jlauv4HIvE8dF+mIDe+j7c2X0bFlEzRTZvR47azuOC+Tbhf+1kbHcZ3DTK6vg3FNNjTTZiIi71Ovx1ONSkXknj/7XIc75yWGnDlP79VMm2kL2C2bEDbvmV7d/csN9R5Lzrhzn8rsMpXXbVmYviDJfbCqodFodBkb0Wq1Hiv3urNarWhpaXGMjUiSBL1e7/IsiZKam5sxY8YMREdH4+jRo0qX48lqgdzcDFgttteSClL0QD6lHuTS09MBAKdPn/a6PSi6sHr4O0QsBUfQvuV9ryGimTDJr2MP9vED9xVqe7qcPOC2pEondXo7bl89b+HM63cZpPokREJVd//giXzV1f9T7i2Q7du3h8zy9xQ6gnqKL9Hdyn0WFgOEglVw9BURkYO3MRAGCAUrtkSIgoi350AYIBTM2BIhChLug+iB/q2FRCLYEiEKAgwQ6q8YIkRBQIm1sIj8gSFCFASUWguLqLcYIkRBgC0Q6q84sE6koHHjxsFgMCA3N5cBQv0SQ4RIQR999JHSJRD1CruziIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEgYQ4SIiIQxRIiISBhDhIiIhDFEiIhIGEOEiIiEMUSIiEiYRukCyA+MRpiPH4P5wH5Yr1RCvtkERA2AKjEZ2id+As20HwLh4UpXSUQhSJJlWVa6iP4iPT0dAHD69GmFK3FlKTgC45rsTrerRj6A8DXvQUpIDGBVRHQ3YHdWKNHpIMUnQIpLALRax9vW8q/QsTMP4P0CEfkZu7NCgBSfAN3qDdD84zRApQYAyFeq0LbqVcg1VwEAlqJTkJsaIcXGKVkqEYUYtkRCgGpUKjRTZzgCBACke4dBM/3ROztZLYBsVaA6IgplDJFQJcuQGxscL6X4wZAi9AoWREShiN1ZochkgvnwAZgL8m2vJcnWUtEzRIjIvxgiIcJafhHGjb8AvvkG8jc37wyi63QI+5cXoX0qQ9kCiSgkMURChckEuaEOMBgcb0mDvgPN3KegmTHLZbyEiMhfOCYSKrRaSHEJkOITAH0UAEBuvgnTro/RumgezEcPKVwgEYUiPmzog2B92NAb+doVGN/9N1hLSwDYWiXh726G6r77Fa6MiEIJWyIhSrrnXuhW/CsQHQ3A1iqxFJ9RuCoiCjUMkRAmRUdDCnNaM+vbFuWKIaKQxBDp7wwGWC9d8LqkieX0/0JurHe8luISAlkZEd0FODvLBxEREWhra0NLSwsGDBigdDkAALnNAOMvfg6o1dDMnAPVkGFARzvMfy+A5eRxR7hISfdAnTZB4WqJKNQwRHwwaNAgtLW14dq1a3jwwQeVLseFXFsD08487xt1OoQtfglSYnJgiyKikMfuLB/ExMQAAK5du6ZwJXdIEXqoRz/ksmqvg0oFddoERGzOg+aRRz23ExH1ElsiPhg7dizOnz+PY8eOYcaMGUqXY6PXQ5ezHjqrBXJzs22hRQCQVJCiB3oPFyIiP2FLxAezZ88GABw9ehS3bt1SuBo3KjWkmFjbA4dxCbYl3xkgRNTHGCI+SE1NxciRI9Ha2opf//rXSpdDRKQ4PrHuo7KyMixcuBAAkJGRgWXLliEqKkrhqoiIlMEQEbB3715s2LABABAVFYWZM2di8uTJSEpKQlJSkmMAnogo1DFEBFVUVCA7OxuXLl3y2NYf1tYiIvIHhkgvnTlzBvn5+SguLkZjYyOamppQWFiodFlERAHBECEiImGcnUVERMIYIkREJIwhQkREwhgiREQkjCFCRETCGCJERCSMIUJERMIYIkREJIwhQkREwhgiREQkjCFCRETCGCJERCTs/wHjeyOe5DoOUwAAAABJRU5ErkJggg==)

转换方法，用当前数 /10 取余数的方式得到。

- `153 / 10 = 1 5` 余数是 `3`
- `15 / 10 =1` 余数是 `5`
- `1 / 10 = 0` 余数是`1`

最后从下往上分别对应 百位 1 十位 5 个位 3

### 十进制转二进制计算公式

- 10 进制转 2 进制，就是用当前数除 2 取余数的方式得到的
- 如求 5 的二进制
  - 5/2=2 余 1 得到右边第 1 位
  - 2/2=1 余 0 得到 右边第 2 位
  - 1/2=0 余 1 得到 右边 第 3 位

最后商为 0 时， 把所从**上往下**的余数从**右往左**写出来就是最后的二进制数 `101`

**求 10 的二进制数**

```js
10/2=5  // 余 0
5/2=2   // 余 1
2/2=1   // 余 0
1/2=0   // 余 1
```

> 最后得以 10 的二进制数为`1010`

### 2、二进制如何转换成十进制

![image-20220914192828992](https://www.arryblog.com/assets/img/image-20220914192828992.6870fdc9.png)

### 二进制转十进制计算公式

![image-20220913235332821](data:image/png;base64,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)

- `b0`表示二进制右边第`1`位上的数字
- `b1`表示二进制右边第`2`位上的数字
- `b2`表示二进制右边第`3`位上的数字
- ...... 依次类推

5 的二进制计算过程

5 的二进制数: `00000000000000000000000000000101` 可以简写成`101`转换成 10 进制，计算过程如下：

![image-20220913235657873](data:image/png;base64,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)

从上面可以得到，当前位上的数字如果是 0，计算得到的结果就是 0

- `1010` 对应 10 进制 0+1*21+ 0 + 1*23 =2+8=10
- `11101` 对应 10 进制 1+0+1*22+1*23+1\*24=1+0+4+8+16=29

### 3、负十进制数如何转换成二进制

- 负数和正数的存储方式不一样，负数是以一种**二补数**(或**补码**)的二进制编码存储。
- 我们来看下，负数是如何转成对应二进制数，然后存储的。这里以`-5`来为例

![image-20220914195720810](https://www.arryblog.com/assets/img/image-20220914195720810.90b0a76f.png)

-5 的二进制计算过程

- 第一步：先确定 5 的二进制，得到 `00000000000000000000000000000101`
- 第二步：反转每一位的二进制数，即 1 变成 0，0 变成 1 ，得到 `11111111111111111111111111111010`
- 第三步：把上面反转得到二进制+1，就得到了最后负数的二进制，即 `11111111111111111111111111111010`+ 1 = 11111111111111111111111111111011
- 最后`-5`的二进制数是 `11111111111111111111111111111011`

```js
// 我们来验证下二进制`11111111111111111111111111111011` 转换成10进制，是不是-5
var str = 0b11111111111111111111111111111011 // js中2进制数以0b开头
console.log(str >> 0) // -5
```

> `>>` 右移操作符，这里你简单理解为把二进制转成 10 进制数，在后面我们马上就会学习到他。

![image-20220914194804921](https://www.arryblog.com/assets/img/image-20220914194804921.02631d38.png)

负数对应二进制如下：

| 十进制 | 对应正数二进制 | 对应负数二进制                     |
| :----- | :------------- | :--------------------------------- |
| 3      | 11             | `11111111111111111111111111111101` |
| 9      | 1001           | `11111111111111111111111111110111` |
| 12     | 1100           | `11111111111111111111111111110100` |

![image-20220914200727218](https://www.arryblog.com/assets/img/image-20220914200727218.4a4cbd7d.png)

### 4、如何一眼区分二进制数是正数还是负数

- **有符号整**数使用 32 位的前 31 位表示整数值，第 32 位表示数值的符号，如果 32 位是 0，表示正数，如果是 1 表示是负数。
- 第 32 位称为符号位，他的值决定了数值其余部分的格式。
- 正数以真正的二进制格式存储，而负数是以我们上面提到的补码的二进制编码存储的。

> 接下来我们看下面几个二进制数，如果第 32 位是 0，表示正数，如果为 1，表示负数

```js
var num1 = 11111111111111111111111111111101 // 负数
var num2 = 01111111111111111111111111111101 // 正数
var num3 = 10000000000000000000000000000001 // 负数
var num4 = 00000000000000000000000000011001 // 正数
```

### 5、最终版，二进制如何转换成十进制

- 拿到一个二进制数，首先看第 32 位是 0 还是 1
- 如果是 0，就按正二进制转十进制方式转
- 如果是 1，则就按负十进数转二进制的方式，反转回去。

**正二进制转十进制**

案例如下：

```js
var num4 = 00000000000000000000000000011001
```

- 1、num4 的二进制，第 32 位是 0，则是一个正数，按正常的正二进制转十进制方式转 1
- 2、num4 对应 10 进制计算公式= 1+0+0+1*23+1*24 = 1+8+16 = 25

![image-20220914203523933](https://www.arryblog.com/assets/img/image-20220914203523933.b7ff29c5.png)

**负二进制转十进制**

案例如下：

```js
var num1 = 11111111111111111111111111111101
```

- 1、num1 的二进制第 32 位是 1，则是一个负数，负数就要以补码的方式反转回去
- 2、先拿 二进制 `11111111111111111111111111111101-1` 得到 `11111111111111111111111111111100`
- 3、再把二上面得到的二进制反码回去，0 变 1，1 变 0，得到`00000000000000000000000000000011`
- 4、最后得到的二进制是 11，转换对应 10 进制是 3，因为是负数，所以最后结果为`-3`

![image-20220914204151774](https://www.arryblog.com/assets/img/image-20220914204151774.1c804fa7.png)

### 6、位运算的基础知识

- 位运算的操作数，都会被转成 32 位`bit`的整数（32 位的二进制数）,再做运算
- 速度是 T0（最高，速度最快）级别的，因为是在二进制下进行运算的。

### 7、按位& 操作符

- &与位操作符会先把值转换为 32 位整数（二进制数），然后再进行位操作。
- 按位&就是将两个操作数的每一位对齐，然后按下表中的规则，对每一位执行相应的操作

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------- | :------------- | :--- |
| 1              | 1              | 1    |
| 1              | 0              | 0    |
| 0              | 1              | 0    |
| 0              | 0              | 0    |

> 按位与操作的两个位数都是 1 是返回 1，只要两个中有一个是 0，则返回 0

### 7.1、& 运算过程

- 我们来看下面这个与&运算的运算过程

```js
var result = 5 & 3
console.log(result) // 1
```

- 先把 5 和 3 都转换为对应的 32 位二进制数，然后再 1 位 1 位的比较，最后结果为 1

![image-20220914004422990](https://www.arryblog.com/assets/img/image-20220914004422990.6848aa2c.png)

### 7.2、按位&操作符判断奇偶数 （经典面试题）

- 如果 一个数 & 1 == 1 这个数是奇数
- 如果 一个数 & 1 == 0 这个数是偶数

```js
;(5 & 1) == 1 // 5 是奇数
;(4 & 1) == 0 // 4 偶数
```

**我们来分析下，其背后的逻辑是什么 ？**

让我们再来回顾下，二进制转 10 进制的公式：

![image-20220913235332821](data:image/png;base64,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)

通过上面公式，我们知道，除第 1 位之外的每一位上的值都是 2 的倍数。

也就是第`1`位上如果是`0`就是偶数，如果是`1`就是奇数

| 10 进制 | 3   | 4   | 5   | 6   | 7   | 8    | 9    | 10   |
| :------ | :-- | :-- | :-- | :-- | :-- | :--- | :--- | :--- |
| 二进制  | 11  | 100 | 101 | 110 | 111 | 1000 | 1001 | 1010 |

- 如果一个数是奇数，他的第 1 位一定是 1 ，奇数 & 1 永远得到 1
- 如果一个数是奇数，他的第 1 位是 1，这个数 & 1 永远得到 1

**计算过程如下：**

![image-20220914144220631](https://www.arryblog.com/assets/img/image-20220914144220631.6457685e.png)

### 8、按位或 | 操作符

- 按位或`|`操作符会先把值转换为 32 位整数（二进制数），然后再进行位操作
- 按位或`|`就是将两个操作数的每一位对齐，然后按下表中的规则，对每一位执行相应的操作

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------- | :------------- | :--- |
| 1              | 1              | 1    |
| 1              | 0              | 1    |
| 0              | 1              | 1    |
| 0              | 0              | 0    |

> 按位或操作的两个位数，只要有一个是 1 就返回 1，两位都是 0 时返回 0

### 8.1、`|` 或运算过程

我们来看下面这个|或运算的整个计算过程

```js
var result = 5 | 3
console.log(result) // 7
```

- 先把 5 和 3 都转换为对应的 32 位二进制数，然后再 1 位 1 位的比较

![image-20220914144720116](https://www.arryblog.com/assets/img/image-20220914144720116.126b10bb.png)

### 8.2、`|` 或运算用将一个数取整

```js
var num = 5.467
console.log(num | 0) // 5
```

- 一个数在按位或运算时，会先将其转换为 32 位的整数（二进制），这个过程就会把小数转换为整数
- 然后这个**整数 | 0** 永远得到这个整数。因为 0 和 1 与 0 做或运算，都得到自身。

![image-20220914145822293](https://www.arryblog.com/assets/img/image-20220914145822293.e741dde9.png)

> **结论**：任何数与 0 做或|运算，最后结果都为这个数的整数部分。

### 9、按位非 ~ 操作符

- 按位非`~`操作符会先把值转换为 32 位整数（二进制数）,再运算
- 按位非`~`操作符，用来反转操作数对应的位数。当前位是 0，就变成 1，1 就变成 0
- 其最终结果的呈现是将一个数**取反**并**减 1**

```js
var num1 = 5
console.log(~num1) // 5取反为-5 ，然后再减1，得到-6

var num2 = -5
console.log(~num2) // -5取反为5，然后再减1，得到4
```

~ 5 的计算的过程

- 5 的 二进制是 `00000000000000000000000000000101`
- 反转后是：`11111111111111111111111111111010`
- 反转后是一个负数，负数转换为 10 进制
  - 先减 1，得到 `11111111111111111111111111111001`
  - 再反转，得到`00000000000000000000000000000110`
  - 最后结果就是 6，因为是负数，所 最后结果是 `-6`

### 按位非 ~ 应用

将一个数（整数）两次按位非运算，就能将这个数取反

**推导过程如下：**

> ```
> ~~ x = -（-x-1)-1 = x+1-1 = x
> ```

```js
var num1 = 5.432
console.log(~~num1)
// 第一次取反 先将 5.432 转成 整数5 ，再取返为-5，再-1，得到-6
// 第二次取反，-6取反得到6，6再-1 ，得到 5
```

> 取得一个数的相反数`~x + 1`

```js
var a = 5
console.log(~a + 1) // -5
```

### 10、按位异或 `^`

- 按位异或`^`操作符，会先把值转为 32 位整数（二进制数）,再运算
- 按位异或`^`在做运算时，就是将两个操作数的每一位对齐，然后按下表中的规则，对每一位执行相应的操作

| 第一个数的位 | 第二个数的位 | 结果 |
| :----------- | :----------- | :--- |
| 1            | 1            | 0    |
| 1            | 0            | 1    |
| 0            | 1            | 1    |
| 0            | 0            | 0    |

> 只有当两个数对应的位都是 1 或都是 0 时，返回 0，其它都返回 1

### 10.1、按位异或^ 运算过程

- 我们来看下面两个数的按位异或`^`的运算过程

```js
var result = 5 ^ 3
console.log(result) // 6
```

- 先把 5 和 3 转换为二进制数，再一位一位来运算，如下

![image-20220914160448946](https://www.arryblog.com/assets/img/image-20220914160448946.c89acff7.png)

> 得到二进制 110，其对应 10 过制是 6

### 10.2、按位异或^ （归零律）

- 归零律: 一个数异或自已得到 0 ，即 `a ^ a=0` ，因为只有两个数上对应位数是一样时，才会得到 0
- 用来判两个数是否相等，如果 a^b=0，则 a=b

```js
5 ^ 5 // 0
3 ^ 3 // 0
```

![image-20220914161808327](https://www.arryblog.com/assets/img/image-20220914161808327.4ee193ef.png)

### 10.3、按位异或^ （恒等律）

- 恒等律：`a ^ 0= a` （整数），自已异或 0，得到自己

```js
var num1 = 5
console.log(num1 ^ 0) // 5
var num2 = 6.3
console.log(num2 ^ 0) // 6
```

### 10.4、按位异或 ^ （自反）

- 自反：`a ^ a ^ a= 0 ^ a= a` ，一个（整数）异或自身 2 次，得到自身。

```js
;5 ^ 5 ^ 5 // 5
```

- 结合律 : `a ^ b ^c = c ^ b ^ a` ，计算结果一样，与先后顺序无关

### 10.5、按位异或 ^ （用来交换两个数值变量的值）

经典面试题

变量为数字，在不增加临时变量时，交换两个变量的值

```js
var a = 5
var b = 10
a ^= b
b ^= a
a ^= b
console.log(a, b) // 10 5
/*
 * 整个推演过程如下：
 * 1、 a ^ = b 得到 a = a ^ b
 * 2、 b ^ = a 得到 b = b ^ a 在第1步得到a = a ^ b，则推倒出b = b ^ a ^ b=b ^ b ^ a =0 ^ a =a
 * 3、 a ^ = b 得到 a = a ^ b ,在第1步得到a = a^b,第2步得到b = a,则推倒出： a = a ^ b ^ a = b ^ b ^ a = 0 ^ b = b
 *
 */

var a = 10.55
var b = 20.66
a ^= b // a = a ^ b
b ^= a // b = b ^ a = b ^ a ^ b =b ^  b ^ a= 0 ^  a= a
a ^= b // a= a ^ a = a ^ b ^ a =b
console.log(a, b) // 20 10
```

### 11、位移操作符（`>>`、 `<<`、 `>>>`）

前面我们知道了解如何将一个数转换为二进制，是基于这个数是一个正数，那如果是一个负数呢 ？其对应的二进是如何转换的呢 ？比如：

- `5` 的二进制是：`101`
- 那`-5`的二进制是多少 ？ 可不能简单的认为是`-101`，这样看，那肯定是错的。

### 11.1、<< 左移操作符

- 左移操作符用两个小于号`<<` 表示，会按指定的位数将数值的所有位向左移动。
- 左移后，左边移出去的 5 位去掉，右端空出的位数会以 0 来填充这些空位。

```js
// 5 左移 5位
5 << 5 // 160
```

- `5 << 5` 的整个运算过程如下图

> 先将 5 转成二进制，再左移 5 位，把左移的 5 位去掉，右边空出的 5 位用 0 来填充

![image-20220914172825585](https://www.arryblog.com/assets/img/image-20220914172825585.105ab45a.png)

注：

在有符号整数中，第 32 位中的第 32 位是 **符号位**

- 如果是 0 表示正数
- 如果是 1 表示负数，在左移时，会保留操作数的符号

### 11.2、>> 有符号 右移操作符

- 有符号右移由两个大于号`>>`表示,会将数值的所有 32 位都向右移。同时保留符号（正和负）
- 有符号右移，左边空出的位会在左侧，在**符号位后**用**符号位的值**来填充这些空位。

**案例一：**

160 >> 5 有符号右移 5 位的运算过程如下

```js
160 >> 5 // 5
```

160 转换成二进制数是 `10100000` ，右移后，左边空出 5 位，空出 5 位在符号位后，用符号位的值来填充，这里符号位的值是 0，所以就用 0 来填充

![image-20220914182021192](https://www.arryblog.com/assets/img/image-20220914182021192.1ea961bc.png)

**案例二：**

-5 >> 5 有符号右移 5 位的运算过程如下

```js
;-5 >> 5
```

- 首先要计算得到-5 的二进制数
- 5 的二进制`00000000000000000000000000000101` 补码后`11111111111111111111111111111010`
- 补码后 +1 得到 `11111111111111111111111111111011`
- -5 的二进制，最终是 11111111111111111111111111111011
- 然后向右移动 5 位，内部计算过程如下：
- 先右移，再左侧符号位后补 5 个 1，得到最后二进制 `11111111111111111111111111111111`
- 上面得到的二进制是一个负数，所以要先-1，再以补码，最后得到`00000000000000000000000000000001`
- 所以结果为 1，因为是负数，所以最后是 `- 1`

![image-20220914211504288](https://www.arryblog.com/assets/img/image-20220914211504288.49df318e.png)

![image-20220914213351718](https://www.arryblog.com/assets/img/image-20220914213351718.e16a5ad2.png)

### 11.3、>>> 无符号右移操作符

- 无符号右移会将数值的所有 32 位都向右移，位移造成的左侧空位全补 0.
- 所以对于正数，`>>>`无符号右移 和有符号右移>>的结果是相同的。因为正数的符号位是 0，所以两者都是补 0 的方式来填充右移造成的空位。
- 但是负数，就完全不一样了。

**案例 一：**

55 无符号右移 5 位运算过程如下

```js
55 >>> 5
```

- 55 的二进制是：`00000000000000000000000000110111`
- `>>>`无符号右移 5，左侧造成的空位 0 来补，则得到 `00000000000000000000000000000001`

> 最后得到的值是`1`

![image-20220914213443280](https://www.arryblog.com/assets/img/image-20220914213443280.de9ef9d2.png)

**案例 二：**

-55 无符号右移 5 位运算过程如下

```js
;-55 >>> 5
```

- -55 的二进制是：`11111111111111111111111111001001`
- `>>>`无符号右称 5 位，左侧造成空位 0 来补，则得到`00000111111111111111111111111110`
- 最终结果为`00000111111111111111111111111110` 得到对应的 10 进制是`134217726`

> 负数，在无符号位移后（至少 1 位），会被转换成一个正数

![image-20220914214241501](https://www.arryblog.com/assets/img/image-20220914214241501.9bb1131f.png)

### 12、位移操作符的应用

在接下来的位操作符中会用到随机函数，所以这里我们先来学习下随机数函数

### 12.1、随机数函数

Math.random()方法，可以得到 0-1 之间的小数

```js
Math.random() // 输出0~1之间的随机数
```

![image-20211218223539723](https://www.arryblog.com/assets/img/image-20211218223539723.85c3e9e4.png)

- 得到 [a , b] 区间的整数，公式如下

```js
parseInt(Math.random() * (b - a + 1)) + a
```

- 得到[1 ,5]区间的整数

```js
parseInt(Math.random() * 5) + 1
```

![image-20211218224225733](https://www.arryblog.com/assets/img/image-20211218224225733.5ab0f437.png)

- 得到[5 ,15]区间的整数

```js
parseInt(Math.random() * 11) + 5
```

![image-20220910214116295](https://www.arryblog.com/assets/img/image-20220910214116295.5898728e.png)

### 12.2、 如何随机生成随机色（经典面试题）

```js
// rgb颜色随机
function rgb() {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  var rgb = '(' + r + ',' + g + ',' + b + ')'
  return rgb
}

// 十六进制颜色
var randomHex = function () {
  return (
    '#' +
    Math.round(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  )
}
console.log(randomHex())

// 十六进制颜色
const randomColor = function () {
  return '#' + Math.random().toString(16).substr(2, 6)
}
console.log(randomColor())
```

![image-20220914234921389](https://www.arryblog.com/assets/img/image-20220914234921389.eb227bfa.png)

![image-20220914235714403](https://www.arryblog.com/assets/img/image-20220914235714403.a4e0a4ff.png)

### 12.3、 GRB 颜色 转 16 进制颜色

| RGB           | R 对应范围 | G 对应范围 | B 对应范围 |
| :------------ | :--------- | :--------- | :--------- |
| rgb(0,24,255) | 0-255      | 0-255      | 0-255      |

| 16 进制 | 前两位对应 R，取值范围 | 中间两位对应 G，取值范围 | 最后两位对应 B，取值范围 |
| :------ | :--------------------- | :----------------------- | :----------------------- |
| #05f3df | 00-ff                  | 00-ff                    | 00-ff                    |

![image-20220921192210649](https://www.arryblog.com/assets/img/image-20220921192210649.b0e69523.png)

**RGB 颜色转 16 进制原理**

> 将 rgb 的值，转成 32 位的二进制，然后再将 32 位二进制转成对应的 16 进制

![image-20220922150943892](https://www.arryblog.com/assets/img/image-20220922150943892.1a5c9398.png)

过程分析：

- ```
  rgb(2,33,55)
  ```

  转 16 进制，本质就是

  - `r`的值要被转成 16 进制的前两位上的值，要丢高位，丢 16 位，具体看下图
  - `g'`的值要被转成 16 进制中间两位上的值，要丢高位，丢 8 位，具体看下图
  - `b`的值要被转成 16 进制后两位上的值，不动

- 然后三者`|`运算，得到对应 二进制，然后再把二进制转成对应 16 进制值。

![image-20220917151435092](https://www.arryblog.com/assets/img/image-20220917151435092.0bab8166.png)

```js
// rgb颜色转 16进制颜色
function colorRGBToHex(rgb) {
  // rgbArr=['','2','33','55']
  var rgbArr = rgb.split(/[^\d]+/)
  // r 移掉丢掉高位   g移掉高位  b 不变
  var color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3]
  // color.toString(16) 的值，有可能不足6位，则需要向前补0
  var _color = color.toString(16) // 转换成16进制
  // padStart(6,'0'); // 不足6位，前面补0
  return '#' + _color.padStart(6, '0')
}
var hexColor = colorRGBToHex('rgb(2,33,55)')
console.log(hexColor) // #022137
```

toString 方法的三个作用

- 将其它类型转换为字符串类型

```js
true.toString() // 'true'
var a = 10
a.toString() // '10'
```

- 检测对象的类型

```js
Object.prototype.toString.call(arr) === '[object Array]'
```

- 返回该数字对应**进制**的字符串

```js
;(10).toString(2) // 10 专为2进制是 '1010'
;(10).toString(16) // 10 转为 16制进是 'a'
```

### 12.4、16 进制转 RGB 颜色

**16f 进制转 RGB 颜色，本质就是要把对应 16 进制的**

- 前 2 位转成 r 的值，
- 中间 2 位转成 g 的值，
- 后两位转成 b 的值

**转换思路如下：**

- 把 16 进制转换成对应 32 位的 2 进制数，只要做位移运算，就会自动把操作数转成 32 位二进制。
- 二进制右移 16 位，丢掉低 16 位，得到对应`r`的二进制，赋值时自动转成 10 进制
- 二进制右移 8 位，丢掉低 8 位，然后 & 0xff 得到对应 g 的二进制，赋值时自动转成 10 进制
- 二进制 & 0xff 得到对应 b 的二进制，赋值时自动转成 10 进制

![image-20220917161007502](https://www.arryblog.com/assets/img/image-20220917161007502.7e187912.jpg)

```js
// 16进制颜色，转rgb
function colorHexToRGB(hex) {
  var newHex = hex.replace('#', '0x')
  var r = newHex >> 16
  var g = (newHex >> 8) & 0xff
  var b = newHex & 0xff
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
console.log(colorHexToRGB('#022137')) // rgb(2,33,55)
```
