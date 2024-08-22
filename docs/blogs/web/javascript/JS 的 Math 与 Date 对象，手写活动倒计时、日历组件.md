# JS 的 Math 与 Date 对象，手写活动倒计时、日历组件

从本节内容我们开始学习实际开发中常用的 Math 与 Date 对象，以及在项目实践中的应用开发等

## 一、Math 对象

- `Math` 是一个内置对象，它拥有一些数学常数属性和数学函数方法。
- 与其他全局对象不同的是，`Math` 不是一个构造器。即不能使用 new 关键字
- `Math` 的所有属性与方法都是静态的

> 以下是 Math 对象上的一些常用的方法和属性

| 属性      | 说明                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `Math.PI` | **`Math.PI`** 表示圆周率`π`，即一个圆的周长与直径的比例，约为 `3.14159` |

| 方法                   | 说明                                                                           |
| :--------------------- | :----------------------------------------------------------------------------- |
| `Math.pow(x,y)`        | 返回`x`的`y`次幂                                                               |
| `Math.sqrt(x)`         | 返回`x`的平方根                                                                |
| `Math.ceil(x)`         | 向上取整，返回大于等于`x`的最小整数                                            |
| `Math.floor(x)`        | 向下取整，返回小于等于`x`的最大整数                                            |
| `Math.round(x)`        | 返回`x`经过 4 舍 5 入后得到的最接近的整数                                      |
| `Math.max(a,b,c,[..])` | 返回给定数值中的最大数                                                         |
| `Math.min(a,b,c,[..])` | 返回给定数值中的最小数                                                         |
| `Math.abs()`           | 返回一个数字的绝对值                                                           |
| `Math.random()`        | 生成一个（0-1）之间的随机数                                                    |
| `Math.atan2`           | 返回从原点`（0,0）` 到 `（x,y）` 点的线段与 x 轴正方向之间的平面角度（弧度值） |

### 1、Math.PI 属性

**`Math.PI`** 表示圆周率`π`，即一个圆的周长与直径的比例，约为 `3.14159`

```js
console.log(Math.PI) // 3.141592653589793
```

### 2、Math.pow(x,y)

`Math.pow(x,y)` 返回 x 的 y 次幂

```js
console.log(Math.pow(2, 3)) // 8  2的3次幂为8
```

### 3、Math.sqrt(x)

返回`x`的平方根

```js
console.log(Math.sqrt(4)) // 2
console.log(Math.sqrt(9)) // 3
```

### 4、Math.ceil

向上取整，返回大于等于 x 的最小整数

```js
console.log(Math.ceil(2.2)) // 3
console.log(Math.ceil(2.0001)) // 3
console.log(Math.ceil(-2.1)) // -2
console.log(Math.ceil(0.909)) // 1
```

### 5、Math.floor

向下取整，返回小于等于 x 的最大整数

```js
console.log(Math.floor(2.2)) // 2
console.log(Math.floor(2.0001)) // 2
console.log(Math.floor(-2.1)) // -3
console.log(Math.floor(0.909)) // 0
```

### 6、Math.round

返回`x`经过四舍 5 入后得到的**最接近**的整数，只需要看 x 的小数部分与 0.5 的关系

> 特别注意：当`x`是负数是，如果小数部分是 0.5，则返回值为`x`的整数部分

```js
console.log(Math.round(10.49)) // 10
console.log(Math.round(10.5)) // 11
console.log(Math.round(-10.49)) // -10
// 特殊情况，记下
console.log(Math.round(-10.5)) // -10
console.log(Math.round(-10.51)) // -11
```

### 7、Math.max

返回给定数值中的最大数，如果任一参数不能转换为数值，则返回 `NaN`

> 如果没有提供参数，返回 `-Infinity`

```js
console.log(Math.max(1, 2, 3, 7)) // 7
console.log(Math.max()) // -Infinity
console.log(Math.max(1, 2, 'a')) // NaN
```

求数组中的最大值

```js
var arr = [1, 20, 5, 6, 3, 9, 10]
var maxValue = Math.max.apply(null, arr)
console.log(maxValue)
```

### 8、Math.min

返回给定数值中的最小数，如果任一参数不能转换为数值，则返回 `NaN`

> 如果没有提供参数，返回 `Infinity`

```js
console.log(Math.min(1, 2, 3, 7)) // 1
console.log(Math.min()) // -Infinity
console.log(Math.min(1, 2, 'a')) // NaN
```

**`Math.max` 与 `Math.min`常用于裁剪值**

比如

元素的 left 值只能在`0 ~ 500`之间，则我们可以利用`Math.max` 和 `Math.min`来对值做裁剪

```js
var left = 300
left = left < 0 ? 0 : left
left = left > 500 ? 500 : left
console.log(left)

// 利用 Math.max和Math.min来实现
left = Math.max(left, 0)
left = Math.min(500, left)
console.log(left)
```

### 9、Math.abs

返回一个数字的绝对值，如果不能转换的，则会转换为 NaN，能转的都会转换成对应的数字

```js
console.log(Math.abs(-1)) // 1
console.log(Math.abs(-1.2)) // 1.2
console.log(Math.abs(null)) // 0
console.log(Math.abs(true)) // 1
console.log(Math.abs(false)) // 0
console.log(Math.abs(undefined)) // NaN
console.log(Math.abs([-3])) // 3
console.log(Math.abs([2, -3])) // NaN
console.log(Math.abs({})) // NaN
```

### 10、Math.random

- 返回一个 `0 ~ 1` 之间的随机数，不包括 0 和 1
- 返回指定范围`[a,b]`之间的随机整数公式，包括 a 和 b

```js
Math.random() * (b - a + 1) + a
// 随机生成 0-6之间的随机整数,包括0和6
var n = Math.floor(Math.random() * 7)

// 随机生成 [2,6]之间的随机整数
var n = Math.floor(Math.random() * (6 - 2 + 1) + 2)

// 随机生成[-5,5]之间的整数
var n = Math.floor(Math.random() * (5 - -5 + 1) - 5)
```

### 11、Math.atan2

- 返回从原点`(0,0)` 到`(x,y)`点的线段与 x 轴正方向之间的平面角度（**弧度值**）
- 假设圆的中心点为原点坐标`（0,0）`，即从原点到坐标`（x,y）` 的线段与 x 轴正方向之间的角 θ 是一个负角（逆时针方向）
- 旋转角度的正负，是由 y 值决定的，`y < 0`得到负角，`y > 0`得到正角

![image-20221215222607148](https://www.arryblog.com/assets/img/image-20221215222607148.5338d589.png)

```js
Math.atan2(y, x) // 第一个参数是y坐标，第二个参数是x坐标

Math.atan2(-1, 1) // -0.7853981633974483
```

因为

`Math.atan2(y,x)`得到的是对应的弧度值，所以我们还需要将弧度值转换为对应的角度值

**弧度值转换成对应角度值的转换公式**

- `角度 = 弧度 * (180/π)`
- `角度 = 弧度 / (π/180)`

```js
var rad = Math.atan2(-1, 1)
var deg = rad * (180 / Math.PI)
console.log(deg) // -45

var rad2 = Math.atan2(1, -1)
var deg2 = rad2 * (180 / Math.PI)
console.log(deg2) // 135
```

### 12、案例：元素跟随鼠标旋转

当鼠标上旋转时，元素也会跟着一起旋转。

![GIF2022-12-1522-37-19](https://www.arryblog.com/assets/img/GIF2022-12-1522-37-19.7e107cf9.gif)

### 12.1、实现原理

![image-20221215223615956](https://www.arryblog.com/assets/img/image-20221215223615956.d1c4ae68.png)

> 我们以元素的中心点坐标为原点坐标`（0,0）`来计算鼠标旋转的角度

- 我们需要获取到元素中心点与浏览器左边和上边的距离

```js
var box = document.querySelector('.box')
// box中心点与浏览器左边和上边距离
var centerX = box.offsetLeft + box.offsetWidth / 2
var centerY = box.offsetTop + box.offsetHeight / 2
```

- 然后获取到鼠标与浏览左边和上边的距离

```js
document.onmousemove = function (e) {
  var clientY = e.clientY
  var clientX = e.clientX
}
```

- 最后用鼠标对应位置减去元素中心点与浏览器对应位置，得到的 `x,y` 这样元素的中心点就相当于是`(0,0)`原点坐标，`（x,y）`就是`Math.atan2(y,x)`方法对应的 `x,y`

```js
// 以元素的中心点为（0，0）坐标，来计算弧度值，最后转换为对应角度值
x = clientX - centerX
y = clientY - centerY

var rad = Math.atan2(y, x) // 弧度值
var deg = rad * (180 / Math.PI) // 将弧度值转换为对应角度制
```

### 12.2、完整版源码

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-image: linear-gradient(to right, khaki, skyblue);
    margin: 200px;
    /* transform-origin: top left; */
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  // box中心点与浏览器左边和上边距离
  var centerX = box.offsetLeft + box.offsetWidth / 2
  var centerY = box.offsetTop + box.offsetHeight / 2

  // onmousemove事件
  document.onmousemove = function (e) {
    // 鼠标与浏览器左边和右边距离
    var clientY = e.clientY
    var clientX = e.clientX

    // 得到鼠标与元素中心点的x和y坐标
    x = clientX - centerX
    y = clientY - centerY

    // 以元素的中心点为（0，0）坐标，来计算弧度值，最后转换为对应角度值
    var rad = Math.atan2(y, x)
    var deg = rad * (180 / Math.PI)

    // 控制元素的旋转角度
    box.style.transform = 'rotate(' + deg + 'deg)'
  }
</script>
```

### 13、扩展知识：弧度与角度的关系

- 角的度量单位通常有两种：一种是角度制，另一种是弧度制
- **弧度制：\*\*我们把\*\*长度等于半径长的弧**所对的圆心角叫**1 弧度的角**。 弧度常用`rad`表示

> 假设下图中圆的半径为 r ，弧 AB 的长为 L，如果`L = r`， 则`< AOB = L/r = 1` 弧度

![image-20221215202105196](data:image/png;base64,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)

1 弧度 = ?角度呢

- `1弧度 = 180deg/π` 约为 `57.2958279deg`

**推导过程**

- `周长 = 2πr` ， `周角 = 360deg`
- `1弧度/360deg = L/2πr` -->> `1弧度/360deg = r/2πr` --->> **`1弧度 = 180deg/π`**

通过 **`1弧度 = 180deg/π`** 得到

- `角度 = 弧度 * (180deg/π)`
- `角度 = 弧度 / (π/180)`
- `π = 180deg` ，`2π = 360deg` （弧度单位可以省略）

## 二、Date 日期对象

Date 日期对象主要是用来处理日期，接下来我们会从以下三个方面来展开讲解

- 如何创建一个日期
- 如何对日期格式化
- 日期对象常见的方法
- 如获得对应时间戳

> 以下是与星期相关的英文单词，可以记下来

| 星期   | 英文      | 缩写 |
| :----- | :-------- | :--- |
| 星期一 | Monday    | Mon  |
| 星期二 | Tuesday   | Tue  |
| 星期三 | Wednesday | Wed  |
| 星期四 | Thursday  | Thur |
| 星期五 | Friday    | Fri  |
| 星期六 | Saturday  | Sat  |
| 星期七 | Sunday    | Sun  |

以下是与月份相关的英文单词

| 月份   | 英文      | 简写 |
| :----- | :-------- | :--- |
| 一月   | January   | Jan  |
| 二月   | February  | Feb  |
| 三月   | March     | Mar  |
| 四月   | April     | Apr  |
| 五月   | May       | May  |
| 六月   | June      | Jun  |
| 七月   | July      | Jul  |
| 八月   | August    | Aug  |
| 九月   | September | Sep  |
| 十月   | October   | Oct  |
| 十一月 | November  | Nov  |
| 十二月 | December  | Dec  |

### 1、new Date() 创建日期对象

`new Date()` 可以用来创建一个日期对象

> 他的基本使用语法如下：

```js
new Date();
new Date(value);
new Date(dateString);
new Date((year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);)
```

- ①、`new Date()` 中没有提供任何参数，则返回结果为当前的日期和时间

```js
console.log(new Date()) //  Thu Aug 08 2022 21:39:54 GMT+0800 (中国标准时间)
```

- ②、value 是一个时间戳，他是一个整数值，表示从 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）开始算起的一个毫秒数。

```js
console.log(new Date(5000))
```

- ③、dateString 表示一个日期字符串，其中 2022-07-02 这种格式的日期会被处理成 UTC，而不是本地时间

```js
console.log(new Date('2022-7-1'))
console.log(new Date('2022/7/1'))
console.log(new Date('2022-07-1'))
console.log(new Date('2022-07-01')) // 会被处理成UTC时间
```

![image-20221215234820121](https://www.arryblog.com/assets/img/image-20221215234820121.3776a639.png)

UTC：

- 也就是我们所说的格林威治时间，指的是 time 中的世界时间标准
- JavaScript 的时间由世界标准时间（UTC）1970 年 1 月 1 日开始，用毫秒计时，一天由 86,400,000 毫秒组成

**本地（当地）时间**

是指执行 JavaScript 的客户端电脑所设置的时间

- ④、`new Date((year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);)`这种形式

- 分别提供日期和时间的每个成员，不过**至少**要提供**年份**与**月份**
- 如果没有提供的参数，日期默认值为 1，时，分，秒默认值为 0

**注意事项**

`monthIndex` 表示月份的整数值，从 0（1 月）到 11（12 月）

```js
new Date((year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);)
// year 年份的整数值，0 到 99 会被映射至 1900 年至 1999 年，其它值代表实际年份
// monthIndex 表示月份的整数值，从 0（1 月）到 11（12 月）
// day  表示一个月中的第几天的整数值 ，1表示第1天
// hours  表示小时，24小时制
// minutes 表示分  0-59
// seconds  表示 秒 0-59
// milliseconds 毫秒数


var d = new Date("2022-9-9");
console.log(d);

var d1 = new Date(2022, 8, 9); // 这里的8表示9月份
console.log(d1);
```

![image-20221215235334270](https://www.arryblog.com/assets/img/image-20221215235334270.5b3ea74c.png)

### 2、new Date() 方法注意事项

```
new Date((year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);)
```

> 这种写法，当传入多个参数时，如果数值大于合理范围时，相邻的数值会被调整

```js
// 月超出范围
var date1 = new Date(2022, 14) // 表示2023年3月1日
var date2 = new Date(2022, 26) // 表示2024年3月1日
console.log(date1)
console.log(date2)

// 日超出范围
var date3 = new Date(2022, 1, 61) // 表示2023年4月2日
console.log(date3)

// 时间超出范围
var date4 = new Date(2022, 1, 2, 1, 80) // 表示2022年1月2日2时20分
console.log(date4)
```

**实践应用**

- 获取上一个月共有多少天，比如获取 2022 年 9 月的上一个月有多少天

```js
// 获取2022年9月的上一个月有多少天
var date = new Date(2022, 8, 0) // 2022年8月的最后一天
console.log(date) // Wed Aug 31 2022 00:00:00 GMT+0800
var prevMonthDayCount = date.getDate() // 获取当前日期的天
console.log(prevMonthDayCount) // 31
```

- 获取当月一共有多少天，如比获取 2022 年 9 月一共有多少天

```js
// 获取2022年9月一共有多少天
var date = new Date(2022, 9, 0) // 2022年9月的最后一天
console.log(date) // Fri Sep 30 2022 00:00:00 GMT+0800 (中国标准时间)
var prevMonthDayCount = date.getDate() // 获取当前日期的天
console.log(prevMonthDayCount) // 30
```

### 3、日期格式化方法

> 以下方法只需要了解即可

| 方法                   | 说明                                       |
| :--------------------- | :----------------------------------------- |
| `toString()`           | 返回一个字符串，以本地的时间表示当前的时间 |
| `toLocaleString()`     | 根据**当地语言**规定返回代表着时间的字符串 |
| `toLocaleDateString()` | 根据当地语言规定返回代表着日期的字符串     |
| `toLocaleTimeString()` | 根据当地语言规定返回代表着时分秒的字符串   |

```js
var date = new Date()
console.log(date) // Thu Aug 08 2022 22:21:58 GMT+0800 (中国标准时间)
console.log(date.toString()) // Thu Aug 08 2022 22:21:58 GMT+0800 (中国标准时间)
console.log(date.toLocaleString()) // 2022/8/8 22:21:58
console.log(date.toLocaleDateString()) // 2022/8/8
console.log(date.toLocaleTimeString()) // 22:21:58
```

### 4、日期对象常见方法

如果我们想获取日期的指定部分，如：**年**，**月**，**日**，**星期**，**时**，**分**，**秒**等中的某个部分

> 则可以使用下面提供的方法

| 方法                | 说明                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `getFullYear()`     | 根据本地时间，返回具体时间中的 **年份**                                    |
| `getMonth()`        | 根据本地时间，返回具体时间中的 **月份** 0-11 表示 1-12 月                  |
| `getDate()`         | 根据本地时间，返回具体时间中的**日 （天）**                                |
| `getDay()`          | 根据本地时间，返回具体时间中的**星期，0-6 表示星期天，一，二，三，... 六** |
| `getHours()`        | 根据本地时间，返回具体时间中的 **时**                                      |
| `getMinutes()`      | 根据本地时间，返回具体时间中的 **分钟数**                                  |
| `getSeconds()`      | 根据本地时间，返回具体时间中的 **秒数**                                    |
| `getMilliseconds()` | 根据本地时间，返回具体时间中的 **毫秒数**                                  |

```js
var d = new Date()

console.log('年份', d.getFullYear()) // 年份 2022
// 月份 0 ，表示1月，d.getMonth()+1 表示当前月份
console.log('月份', d.getMonth() + 1) // 月份 9
console.log('日期', d.getDate()) // 日期 9
console.log('星期', d.getDay()) // 星期5
console.log('小时', d.getHours()) // 小时22
console.log('分钟', d.getMinutes()) // 分钟46
console.log('秒数', d.getSeconds()) // 秒数11
console.log('毫秒', d.getMilliseconds()) // 毫秒 952
```

- 以 ”2023 年 09 月 08 日 12 时 04 分 05 秒 星期四“ 格式输出对应的日期

```js
var d = new Date()
var year = d.getFullYear()
var month = d.getMonth() + 1
var date = d.getDate()
var day = d.getDay()
var hours = d.getHours()
var minutes = d.getMinutes()
var seconds = d.getSeconds()

// 对日期不足两位的补0操作
month = padZero(month)
date = padZero(date)
hours = padZero(hours)
minutes = padZero(minutes)
seconds = padZero(seconds)

var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

console.log(
  year +
    '年' +
    month +
    '月' +
    date +
    '天 ' +
    hours +
    '时' +
    minutes +
    '分' +
    seconds +
    '秒 ' +
    week[day],
)
// 输出结果格式： 2023年09月08天 23时12分16秒 星期四

// 补0
function padZero(str) {
  str = str + ''
  return str.padStart(2, '0')
}
```

### 5、时间戳

- **时间戳**：表示 1970 年 1 月 1 日零点整距离某时刻的毫秒数
- **getTime 方法**：可以把对应的日期时间转换为对应的时间戳

```js
var d = new Date()
console.log(d.getTime()) // 当前时间戳  1665244800000
```

- 利用 getTime 方法，可以测试代码的执行时间

```js
var start = new Date()
for (var i = 0; i < 1000; i++) {
  console.log(i)
}
var end = new Date()
// 代码执行时间，为两者时间之差（毫秒数）
var time = end.getTime() - start.getTime()
console.log('代码执行时间' + time + '毫秒') // 代码执行时间20毫秒
```

- 将一个日期转换为对应的时间戳 ，还有以下 4 种方法

| 时间戳方法             | 说明                                                     |
| :--------------------- | :------------------------------------------------------- |
| `日期对象.getTime()`   | 可以把对应的日期时间转换为对应的时间戳                   |
| `日期对象.valueOf`方法 | 返回 Date 对象的原始值，其功能和 getTime 方法一样        |
| `+日期对象`            | 这种是一种技巧，利用+号的特性，底层调用的是 valueOf 方法 |
| `Date.parse()`方法     | 静态方法，返回传递的日期的时间戳                         |
| `Date.now()` 方法      | 静态方法 返回**当前的日期**的时间戳                      |

- **valueOf 方法和 + 日期对象**

```js
var d = new Date(2022, 9, 9)
console.log(d.valueOf()) // 1665244800000
console.log(d.getTime()) // 1665244800000
console.log(+d) // 1665244800000
```

- **`Date.now()` 方法**：只能用来返回当前日期的时间戳

```js
console.log(Date.now()) // 1665244823500
```

- **`Date.parse()` 方法**有一个很特别的地方，传入的日期相同，但因为格式不同，得到的结果不同。

```js
console.log(Date.parse('2022-9-1')) // 本地时间  1661961600000
console.log(Date.parse('2022/9/1')) // 本地时间  1661961600000
console.log(Date.parse('2022-09-01')) // UTC 1661990400000
```

### 6、案例：活动倒计时

涉及知识点

- 定时器
- Date 对象、`getTime()` 方法
- 倒计时原理： 时间戳如何转换为对应的**天数**，**小时**，**分钟**，**秒数**

![GIF2022-12-1617-16-05](https://www.arryblog.com/assets/img/GIF2022-12-1617-16-05.0e89f557.gif)

### 6.1、布局思路

```html
<style>
  .countdown {
    width: 190px;
    height: 260px;
    background: url(./images/countdown-bg.png);
    position: relative;
    display: none;
  }
  .countdown-title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    padding-top: 30px;
    font-weight: bold;
  }
  .countdown-main {
    width: 100%;
    height: 35px;
    position: absolute;
    left: 0px;
    bottom: 20px;
    text-align: center;
    font-size: 0;
  }
  .countdown-main span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #000;
    font-size: 14px;
    color: #fff;
    margin: 0 10px;
    color: #fff;
    line-height: 30px;
    font-weight: bold;
    position: relative;
  }
  .countdown-main span::after {
    content: ':';
    position: absolute;
    right: -11px;
    font-size: 16px;
  }
  .countdown-main span.second::after {
    content: '';
  }
</style>
<!-- 秒杀到计时 -->
<div class="countdown" id="J_countdown">
  <div class="countdown-title">京东秒杀</div>
  <div class="countdown-main">
    <span class="hour">00</span>
    <span class="minute">00</span>
    <span class="second">00</span>
  </div>
</div>
```

### 6.2、JS 实现思路

倒计时需要三个时间：**当前时间**，**活动开始时间**，**活动结束时间**

- 活动没有开始前，活动版块不会出现在页面中；活动结束后，活动版块要在页面中删除
- 当前时间 `>=` 活动开始时间，表示当前活动正在进行，开始倒计时功能

**倒计时实现原理**

- 利用活动结束时间戳 - 当前时间戳 ，得到的剩余时间（毫秒）
- 把剩余时间（毫秒）/ 1000 得到对应的秒数，然后将秒数转换为对应的 天、时、分、秒
- 然后利用定时器，每过 1 分钟就更新下时间

**秒数转换成天、时、分、秒公式**

- 我们知道 `1天 = 24小时`，`1小时 = 60分`，`1分 = 60秒`，如果当前为 n 天，则 **`总秒数 = n \* 60 \* 60 \* 24`**
- 天数：`day = parseInt(总秒数 / 24 / 60 / 60)`
- 小时：`hour = parseInt(总秒数 / 60 / 60 % 24 )`
- 如果不考虑天数，也就是所有天数的时间也按小时来算，`hour=parseInt(总秒数 / 60 / 60 )`
- 分钟：`minutes=parseInt(总秒数 / 60 % 60)`
- 秒数：`secondes=parseInt(总秒数 % 60)`

**第一步：创建 countDown 函数**

这个函数有两个参数，分别代表开始时间和结束时间，只要调用这个函数，传入对应实参，就能实现倒计时功能

```js
function countDown(startDate, endDate) {}
```

**第二步：完善 countDown 函数功能**

- 检测是否两个参数都有传，同时传的类型是否是时间对象，并且是否满足 endDate 大于 startDate
- 如果不满足以上条件，则直接抛出对应的错误

```js
function countDown(startDate, endDate) {
  // 判断是否两个参数都有传
  if (startDate === undefined || endDate === undefined)
    throw new Error('必需传入两个日期对象，作为活动的开始时间和结束时间')

  // 两个中只要有一个不是日期对象，则抛出错误
  if (!(startDate instanceof Date) || !(endDate instanceof Date))
    throw new Error('两个参数，都必需是日期对象')

  // 如果开始时间大于等于结束时间，则相当于没有活动，抛出错误
  if (startDate.getTime() >= endDate.getTime()) throw new Error('开始时间不能大于等于结束时间')

  // ....... 活动开始与结束相关代码从这往下开始
}

// 测试代码
var startDate = new Date('2022-12-16 15:53:00') // 活动开始时间
var endDate = new Date('2022-12-17 00:00:00') // 活动结束时间
countDown(startDate, endDate)
```

**第三步：判断活动是否结束**

如果`当前时间 > 活动结束时间`，则表明活动结束，将活动版块从页面移除

```js
// 判断活动是否结束
if (endDate.getTime() < nowDate.getTime()) {
  // 活动结束，将元素从页面删除
  countdownEl.parentNode.removeChild(countdownEl)
  //  清除定时器
  clearInterval(timer)
}
```

注：

判断活动结束的代码，要写在判断活动开始的代码前，这样就会因为活动结束了，还要执行一次代码，然后才知道活动结束

**第四步：判断活动是否开始**

- 如果`活动开始时间 > 当前时间`，则表示活动开始，在活动版块插入页面中（显示）
- 同时开始定时器，每隔 1 秒更新下时间，实现倒计时功能。
- 用`活动结束时间戳 - 当前时间戳` 得到的毫秒数，转换成秒。
- 最后将秒数，换算成对应时，分，秒

```js
var countdownEl = document.getElementById('J_countdown')
var spans = document.querySelectorAll('#J_countdown .countdown-main span')

// 以下代码，写在countDown 内部
var timer = setInterval(function () {
  var nowDate = new Date()

  // .... 判断活动是否结束的代码，写在这里

  // 判断活动是否开始，如果未开始，则啥也不做，如果开始，则将活动版块显示
  if (nowDate.getTime() >= startDate.getTime()) {
    // 活动开始,显示活动版块
    countdownEl.style.display = 'block'

    // 倒计时 时间差秒
    var timeDiff = (endDate.getTime() - nowDate.getTime()) / 1000
    var hour = Math.floor(timeDiff / 60 / 60) // 计算时
    var minute = Math.floor((timeDiff / 60) % 60) // 计算分
    var second = Math.floor(timeDiff % 60) // 计时秒

    // 更新DOM元素,对于不足两位的数，前面补0
    spans[0].innerHTML = (hour + '').padStart(2, '0')
    spans[1].innerHTML = (minute + '').padStart(2, '0')
    spans[2].innerHTML = (second + '').padStart(2, '0')
  }
}, 1000)
```

**优化细节**

- 如果**时**，**分** 没有变化，则不需要再次更新 DOM，只有不相同时，才需要更新 DOM
- 创建一个对象，用来前面的时，分，然后拿 对象中的时，分与现在的对比，如果不相同则更新 DOM，同时把自身的值也更新为最新的，否则啥也不做

```js
// 用来保存前面的时，分
var time = {
  hour: '00',
  minute: '00',
}

// 如果时有变化，则更新DOM，同时更新自身的值
if (time.hour != hour) {
  spans[0].innerHTML = (hour + '').padStart(2, '0')
  time.hour = hour
}
// 如果分没有变化，则更新DOM，同时更新自身的值
if (time.minute != minute) {
  spans[1].innerHTML = (minute + '').padStart(2, '0')
  time.minute = minute
}
```

### 6.3、完整版代码

- 用户刚打开页面，活动已经开始了，则需要立马显示倒计时，而不用等到 1 秒后，才开始显示元素，然后显示对应时间
- 所以把定时器需要执行的代码封装到函数 updateTime 中，然后在定时器之前，先调用下 updateTime 函数

```html
<style>
  .countdown {
    width: 190px;
    height: 260px;
    background: url(./images/countdown-bg.png);
    position: relative;
    display: none;
  }
  .countdown-title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    padding-top: 30px;
    font-weight: bold;
  }
  .countdown-main {
    width: 100%;
    height: 35px;
    position: absolute;
    left: 0px;
    bottom: 20px;
    text-align: center;
    font-size: 0;
  }
  .countdown-main span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #000;
    font-size: 16px;
    color: #fff;
    margin: 0 10px;
    color: #fff;
    line-height: 30px;
    font-weight: bold;
    position: relative;
  }
  .countdown-main span::after {
    content: ':';
    position: absolute;
    right: -11px;
    font-size: 16px;
  }
  .countdown-main span.second::after {
    content: '';
  }
</style>
<!-- 秒杀到计时 -->
<div class="countdown" id="J_countdown">
  <div class="countdown-title">京东秒杀</div>
  <div class="countdown-main">
    <span class="hour">00</span>
    <span class="minute">00</span>
    <span class="second">00</span>
  </div>
</div>

<script>
  // 获取DOM元素
  var countdownEl = document.getElementById('J_countdown')
  var spans = document.querySelectorAll('#J_countdown .countdown-main span')

  /**
   * countDown 倒计时函数
   * @param startDate 开始时间，日期对象
   * @param endDate 结束时间，日期对象
   */
  function countDown(startDate, endDate) {
    // 判断是否两个参数都有传
    if (startDate === undefined || endDate === undefined)
      throw new Error('必需传入两个日期对象，作为活动的开始时间和结束时间')

    // 两个中只要有一个不是日期对象，则抛出错误
    if (!(startDate instanceof Date) || !(endDate instanceof Date))
      throw new Error('两个参数，都必需是日期对象')

    // 如果开始时间大于等于结束时间，则相当于没有活动，抛出错误
    if (startDate.getTime() >= endDate.getTime()) throw new Error('开始时间不能大于等于结束时间')

    // 用来记录前前面时，分
    var time = {
      hour: '00',
      minute: '00',
    }
    var timer = setInterval(updateTime, 1000)
    updateTime() //  进来就调用更新时间的函数
    function updateTime() {
      var nowDate = new Date()
      // .... 判断活动是否结束的代码，写在这里
      // 判断活动是否结束
      if (endDate.getTime() < nowDate.getTime()) {
        // 活动结束，将元素从页面删除
        countdownEl.parentNode.removeChild(countdownEl)
        //  清除定时器
        clearInterval(timer)
      }

      // 判断活动是否开始，如果未开始，则啥也不做，如果开始，则将活动版块显示
      if (nowDate.getTime() >= startDate.getTime()) {
        // 活动开始,显示活动版块
        countdownEl.style.display = 'block'

        // 倒计时 时间差秒
        var timeDiff = (endDate.getTime() - nowDate.getTime()) / 1000
        var hour = parseInt(timeDiff / 60 / 60) // 计算时
        var minute = parseInt((timeDiff / 60) % 60) // 计算分
        var second = parseInt(timeDiff % 60) // 计时秒

        // 更新DOM元素,对于不足两位的数，前面补0,
        if (time.hour != hour) {
          spans[0].innerHTML = (hour + '').padStart(2, '0')
          time.hour = hour
        }

        if (time.minute != minute) {
          spans[1].innerHTML = (minute + '').padStart(2, '0')
          time.minute = minute
        }
        spans[2].innerHTML = (second + '').padStart(2, '0')
      }
    }
  }

  // 倒计时功能
  // 需要三个时间，当前时间，活动开始时间，活动结束时间
  var startDate = new Date('2022-12-15 15:53:00') // 活动开始时间
  var endDate = new Date('2022-12-17 16:59:00') // 活动结束时间

  countDown(startDate, endDate)
</script>
```

## 三、手写日历组件

![GIF2022-12-2619-14-44](https://www.arryblog.com/assets/img/GIF2022-12-2619-14-44.c23e9ac2.gif)

### 1、布局思路

其中`calendar-main`中的内容，是重点渲染的内容，后期通过 JS 动态生成

```html
<div class="calendar">
  <!-- 年月切换按扭开始-->
  <div class="calendar-menu">
    <span class="prev-year">&lt;&lt;</span>
    <span class="prev-month">&lt;</span>
    <span class="current-date">2022年12月</span>
    <span class="next-month">&gt;</span>
    <span class="next-year">&gt;&gt;</span>
  </div>
  <!-- 年月切换按扭结束 -->
  <!-- 周信息 开始 -->
  <div class="calendar-week table">
    <div class="tr">
      <div class="th">一</div>
      <div class="th">二</div>
      <div class="th">三</div>
      <div class="th">四</div>
      <div class="th">五</div>
      <div class="th">六</div>
      <div class="th">七</div>
    </div>
  </div>
  <!-- 周信息 结束 -->

  <!-- 日历主体开始 -->
  <div class="calendar-main">
    <div class="table">
      <div class="tr">
        <div class="td prev-month">28</div>
        <div class="td prev-month">29</div>
        <div class="td prev-month">30</div>

        <div class="td">1</div>
        <div class="td">2</div>
        <div class="td">3</div>
        <div class="td">4</div>
      </div>
      <div class="tr">
        <div class="td">5</div>
        <div class="td">6</div>
        <div class="td">7</div>
        <div class="td">8</div>
        <div class="td">9</div>
        <div class="td">10</div>
        <div class="td">11</div>
      </div>
      <div class="tr">
        <div class="td">12</div>
        <div class="td">13</div>
        <div class="td">14</div>
        <div class="td">15</div>
        <div class="td">16</div>
        <div class="td">17</div>
        <div class="td">18</div>
      </div>
      <div class="tr">
        <div class="td">19</div>
        <div class="td">20</div>
        <div class="td">21</div>
        <div class="td">22</div>
        <div class="td">23</div>
        <div class="td">24</div>
        <div class="td">25</div>
      </div>
      <div class="tr">
        <div class="td current">26</div>
        <div class="td">27</div>
        <div class="td">28</div>
        <div class="td">29</div>
        <div class="td">30</div>
        <div class="td">31</div>
        <div class="td next-month">1</div>
      </div>
      <div class="tr">
        <div class="td next-month">2</div>
        <div class="td next-month">3</div>
        <div class="td next-month">4</div>
        <div class="td next-month">5</div>
        <div class="td next-month">6</div>
        <div class="td next-month">7</div>
        <div class="td next-month">8</div>
      </div>
    </div>
  </div>
  <!-- 日历主体结束 -->
</div>
```

CSS 样式

```html
<style>
  .calendar {
    width: 300px;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px #ddd;
    border-radius: 5px;
    padding: 20px;
    margin: 100px;
  }
  .calendar-menu {
    display: flex;
  }
  .calendar-menu .current-date {
    flex-grow: 1;
    text-align: center;
    color: #000;
  }
  .calendar-menu span {
    color: rgb(125, 124, 124);
    user-select: none;
    cursor: pointer;
  }
  .calendar-menu .prev-year {
    margin-right: 20px;
  }
  .calendar-menu .next-year {
    margin-left: 20px;
  }

  /* 表格布局样式 */
  .table {
    display: table;
    width: 100%;
  }
  .table .tr {
    display: table-row;
  }
  .table .tr .th,
  .table .tr .td {
    display: table-cell;
    text-align: center;
    height: 35px;
    vertical-align: middle;
    cursor: pointer;
    font-size: 12px;
  }
  .table .tr .th {
    padding-top: 20px;
    border-bottom: 1px solid #ddd;
  }
  .table .tr .td.prev-month,
  .table .tr .td.next-month {
    color: rgb(194, 194, 194);
  }
  .table .tr .td.current {
    background-color: rgb(244, 31, 102);
    color: #fff;
    font-weight: bold;
  }
  .table .tr .td:hover {
    outline: 2px solid #ddd;
  }
  .table .tr .td.active {
    outline: 2px solid rgb(244, 31, 102);
  }
</style>
```

### 2、JS 实现思路

关于日历的渲染，我们需要知道以下几方面信息

- 1、当月有多少天，这样就可以知道当月从 1 号渲染到几号
- 2、当月的第一天是星期几，这样就能知道当月 1 号的渲染位置
- 3、上月需要渲染天数对应的日期，（知道了当月第一天是星期几，就可以知道上月需要渲染的天数，同时还要知道上月最后一天是几号，就要以知道对应的日期）
- 4、下个月需要渲染的天数对应日期，保存在数组中。（下月需要渲染天数 = 42 - 当月总天数 - 上月需要渲染的天数，对应日期，从 1 号开始渲染到对应天数就可以）

### 3、书写相关的工具函数

- 获取对应年份的月份的总天数

```js
// year 年份，month 月份
function getMonthDayCount(year, month) {
  // 知道当月最后一天的是几号，就可以知道当月一共有多少天
  var date = new Date(year, month, 0)
  return date.getDate()
}
```

- 获取当月第一天是星期几

```js
// 获取当月第一天是星期几
function getMonthFirstWeekDay(year, month) {
  var date = new Date(year, month - 1, 1)
  return date.getDay() // 0-6表示星期日和星期一....星期六
}
```

- 上月需要渲染天数对应的日期，保存在数组中

```js
// 上月需要渲染天数对应的日期，保存在一个数组中
function getPrevMonthRestDays(year, month) {
  // 当月第一天是星期几
  var week = getMonthFirstWeekDay(year, month)
  //对于星期做相关处理，如果week=0表示周日，则需要上个月需要渲染6天
  week = week === 0 ? 6 : week - 1
  // 上月最后一天是几号
  var lastDate = getMonthDayCount(year, month - 1)
  // 用来记录上月需要渲染天数
  var restDays = []

  while (week > 0) {
    restDays.push(lastDate--)
    week--
  }
  return restDays.reverse() // 将结果置反
}

console.log(getPrevMonthRestDays(2022, 12)) // [28, 29, 30]
```

- 下个月需要渲染的天数对应的日期，保存在数组中

```js
// 下个月需要渲染的天数
function getNextMonthRestDays(year, month) {
  // 当月的总天数
  var currentMonthDayCount = getMonthDayCount(year, month)
  // 上月渲染的天数
  var days = getMonthFirstWeekDay(year, month)
  days = days === 0 ? 6 : days - 1
  // 计算得到下月需要渲染的天数
  var nextMonthRestDays = 42 - currentMonthDayCount - days

  var result = []
  for (var i = 1; i <= nextMonthRestDays; i++) {
    result.push(i)
  }
  return result
}
```

### 4、根据日期创建 td 结构数组

根据上月需要渲染的日期，生成对应 td 标签和样式，添加到数组中

```js
// 创建上月td结构
function createTd1(arr) {
  return arr.map(function (item) {
    var td = document.createElement('div')
    td.className = 'td prev-month'
    td.innerText = item
    return td
  })
}

// 根据下月需要渲染的天数，来生成对应的td标签
function createTd2(arr) {
  return arr.map(function (item) {
    var td = document.createElement('div')
    td.className = 'td next-month'
    td.innerText = item
    return td
  })
}

// 根据当月需要渲染的天数，来生成对应td标签
function createTd3(days) {
  var result = []
  for (var i = 1; i <= days; i++) {
    var td = document.createElement('div')
    td.className = 'td'
    td.innerText = i
    result.push(td)
  }
  return result
}
```

### 5、创建 render 渲染函数，根据对应年月来渲染出日历内容

```js
// 创建渲染函数，用来渲染 xxxx年xx月的日历表
function render(year, month) {
  // 获取上月需要渲染的日期
  var prevMonthRestDays = getPrevMonthRestDays(year, month)
  // 当月需要渲染的天数
  var currentMonthCountDays = getMonthDayCount(year, month)
  // 获取下月需要渲染的日期
  var nextMonthRestDays = getNextMonthRestDays(year, month)

  // 根据对应日期和天数，创建出对应的td结构
  var prevTd = createTd(prevMonthRestDays)
  var nextTd = createTd(nextMonthRestDays)
  var currentTd = createTd2(currentMonthCountDays)

  // 三个数组合并到一个数组
  var tds = prevTd.concat(currentTd, nextTd)
  // 利用tds来创建对应的表格，然后将表格渲染到页面中
  var calendarMain = document.querySelector('.calendar-main')
  // 渲染前，要先将原有内容清空
  calendarMain.innerHTML = ''
  calendarMain.appendChild(createTabel(tds))

  function createTabel(tds) {
    var table = document.createElement('div')
    table.className = 'table'
    var n = 0
    // 行
    for (var i = 0; i < 6; i++) {
      var tr = document.createElement('div')
      tr.className = 'tr'
      // 列
      for (var j = 0; j < 7; j++) {
        tr.appendChild(tds[n])
        n++
      }
      // 将tr添加到table
      table.appendChild(tr)
    }
    return table
  }
}
```

- 创建函数，用来获取当前的日期

```js
// 获取当前日期函数
function getCurrentDate() {
  var nowDate = new Date()
  return {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  }
}
```

- 调用 render 函数，来生成对应日历

```js
render(getCurrentDate().year, getCurrentDate().month)

// 或

render(2022, 10)
```

### 6、当前日期，背景要变成粉色

对应 render 函数中，调用 `createTd2()` 时，传入的参数要改变

```js
// 创建本月td结构
function createTd2(year, month) {
  var result = []
  // 获取当前日期（年，月，日）
  var currentDate = getCurrentDate().date
  var currentMonth = getCurrentDate().month
  var currentYear = getCurrentDate().year
  // 获取当月的总天数
  days = getMonthDayCount(year, month)
  // 遍历
  for (var i = 1; i <= days; i++) {
    var td = document.createElement('div')

    if (year === currentYear && month === currentMonth && i === currentDate) {
      td.className = 'td current'
    } else {
      td.className = 'td'
    }

    td.innerText = i
    result.push(td)
  }
  return result
}
```

### 7、完善 render 函数

当前日历表头的`xxxx 年 xx 月`日期，要更新为当前渲染的日期

```js
function render(year, month) {
  // 日历头部日期显示为渲染日期
  var dateDom = document.querySelector('.calendar-menu .current-date')
  dateDom.innerText = dateDom.innerText = year + '年 ' + month + '月'

  // .....
}
```

### 8、年月切换按扭事件处理

```js
// 获取当前日期
var date = getCurrentDate()
var currentYear = date.year
var currentMonth = date.month
var currentDate = date.date

// 渲染日历
render(currentYear, currentMonth)

// 年月切换按扭事件处理
var prevYearDom = document.querySelector('.prev-year')
var nextYearDom = document.querySelector('.next-year')
var prevMonthDom = document.querySelector('.prev-month')
var nextMonthDom = document.querySelector('.next-month')

// 上一年
prevYearDom.onclick = function () {
  currentYear--
  render(currentYear, currentMonth)
}

// 下一年
nextYearDom.onclick = function () {
  currentYear++
  render(currentYear, currentMonth)
}

// 上一个月
prevMonthDom.onclick = function () {
  currentMonth--
  if (currentMonth === 0) {
    currentMonth = 12
    currentYear--
  }
  render(currentYear, currentMonth)
}

// 下一个月
nextMonthDom.onclick = function () {
  currentMonth++
  if (currentMonth === 13) {
    currentMonth = 1
    currentYear++
  }
  render(currentYear, currentMonth)
}
```

### 9、选中对应日期

如果选中的日期是上个月或下个月的某天，则日历表更新到对应月份的天数

render 函数，需要再添加一个 selectDate 参数，如果有选中当前日期，则渲染时把当前日期标出来

```js
// 选中对应的日期
// 事件代理
var calendarMain = document.querySelector('.calendar-main')
var prevEl = null // 前一个被选中的元素
calendarMain.onclick = function (e) {
  var target = e.target
  var bool = target.classList.contains('td')
  if (!bool) return

  // 首先处理样式变化
  if (prevEl) prevEl.classList.remove('active')
  target.classList.add('active')
  prevEl = target

  // 判断当前点的是上个月的日期，还是下个月的日期
  var prevBool = target.classList.contains('prev-month') // 如果为true，表示点的是上个月日期
  var nextBool = target.classList.contains('next-month') // 如果为true，表示点的是上个月日期

  // 点的是上个月日期 或下个月的日期时，才会重新触发渲染
  if (prevBool) {
    // 点了上个月日期
    currentMonth--
    if (currentMonth === 0) {
      currentMonth = 12
      currentYear--
    }
    // 重新渲染
    var selectDate = target.innerText
    render(currentYear, currentMonth, selectDate)
  } else if (nextBool) {
    // 点了下个月日期
    currentMonth++
    if (currentMonth === 13) {
      currentMonth = 1
      currentYear++
    }
    // 重新渲染
    var selectDate = target.innerText
    render(currentYear, currentMonth, selectDate)
  }

  // 得到当前选中的日期
  console.log(currentYear + '年' + currentMonth + '月' + target.innerText + '日')
}
```

- 更新 createTd3 函数

```js
// 创建本月td结构,selectDate是当前选中的日期天数
function createTd3(year, month, selectDate) {
  var result = []
  // 要判断当前的year,month,date日，是不是于当前的日期完全一样，如果是，则date的td结构上添加current样式
  var currentYear = getCurrentDate().year
  var currentMonth = getCurrentDate().month
  var currentDate = getCurrentDate().date

  var days = getMonthDayCount(year, month)
  for (var i = 1; i <= days; i++) {
    var td = document.createElement('div')
    // 判断 渲染日期是不当前日期
    if (year === currentYear && month === currentMonth && i === currentDate) {
      td.className = 'td current'
    } else {
      td.className = 'td'
    }

    // 判断是否当前有选中的日期，如果有，则将期标红色边框
    if (selectDate && selectDate == i) {
      td.classList.add('active')
      prevEl = td
    }

    td.innerText = i
    result.push(td)
  }
  return result
}
```

- 把 render 函数中如下代码的注释部分更新为如下

```js
// selectDate 表示当前选中天数
function render(year, month, selectDate) {
  // var currentTd=createTd3(currentMonthCountDays);
  if (selectDate) {
    var currentTd = createTd3(year, month, selectDate)
  } else {
    var currentTd = createTd3(year, month)
  }

  //....
}
```

### 10、封装完整版工具函数 data.js

```js
// 日历的渲染，我们需要知道以下几个重要的信息
// 1、当月有多少天，有了这个数字，我们就可以知道当月从1号渲染到几号
// 2、当月的第一天是星期几，有了这个信息，我就知道当月1号的渲染位置
// 3、上个月需要渲染多少天和对应的日期
//    - 当月的第一天是星期几，就可以知道上个月需要渲染多少天，如果当月的第一天是星期日（0)，要特别处理下
//    - 上个月的最后一天是多少要知道
// 4、下个月需要渲染的天数和日期  = 42-当月总天数 -上月需要渲染的天数    42-3-31=42-34=8

// 获取对应年份的月份的总天数  2022 8
function getMonthDayCount(year, month) {
  var date = new Date(year, month, 0)
  return date.getDate()
}
//   console.log(getMonthDayCount(2022,9))

// 获取当月的第一天是星期几  2022 9
function getMonthFirstWeekDay(year, month) {
  var date = new Date(year, month - 1, 1)
  return date.getDay() // 0-6表示星期日和星期一....星期六
}
// console.log(getMonthFirstWeekDay(2022,11))

// 上月需要渲染天数对应的日期，保存在数组中  2022 9
function getPrevMonthRestDays(year, month) {
  // 当月第一天是星期几
  var week = getMonthFirstWeekDay(year, month)
  week = week === 0 ? 6 : week - 1 // 处理特殊的0，表示星期天
  // 上月最后一天是几号
  var lastDate = getMonthDayCount(year, month - 1)
  // 创建一个数组，用来保存上月需要渲染的日期
  var restDays = []
  while (week > 0) {
    restDays.push(lastDate--)
    week--
  }
  return restDays.reverse() // 置反
}
// console.log(getPrevMonthRestDays(2022,9))

// 下个月需要渲染的天数和对应的日期，保存在数组中  2022 9
function getNextMonthRestDays(year, month) {
  // 当月的总天数
  var currentMonthDayCount = getMonthDayCount(year, month)
  // 上月需要渲染的天数
  var days = getMonthFirstWeekDay(year, month)
  days = days === 0 ? 6 : days - 1 // 上个月需要渲染的天数
  // 下月需要渲染的天数
  var nextMonthRestDays = 42 - currentMonthDayCount - days

  // 如果要把需要渲染的日期保存在数组中
  var restDays = []
  for (var i = 1; i <= nextMonthRestDays; i++) {
    restDays.push(i)
  }
  // return nextMonthRestDays;
  return restDays
}

// console.log(getNextMonthRestDays(2022,9))

// 根据对应日期来创建td结构
// 根据上月需要渲染的日期，生成对应的td标签和样式，添加到数组中
function createTd1(year, month) {
  //  return  arr.map(function(item){
  //         var td=document.createElement('div');
  //         td.className='td prev-month'
  //         td.innerText=item;
  //         return td;
  //    })

  // 获取前一个月份对应的年和月
  var prevMonth,
    prevYear = year
  prevMonth = month - 1
  if (prevMonth === 0) {
    prevYear = year - 1
    prevMonth = 12
  }
  // 获取当前日期
  var currentYear = getCurrentDate().year
  var currentMonth = getCurrentDate().month
  var currentDate = getCurrentDate().date

  var arr = getPrevMonthRestDays(year, month)
  var result = []
  for (var i = 0; i < arr.length; i++) {
    var td = document.createElement('div')
    td.className = 'td prev-month'
    // 判断当前月的前一个月中的某个日期为当前日期时
    if (currentYear === prevYear && currentMonth === prevMonth && currentDate === arr[i]) {
      td.classList.add('current')
    }

    td.innerText = arr[i]
    result.push(td)
  }
  return result
}
//  console.log( createTd1(getPrevMonthRestDays(2022,12)))

// 根据下月需要渲染的天数，来生成对应的td标签
function createTd2(year, month) {
  // 考虑当前日历中的下月渲染中的某天为当前日期，则需要将背景变红色

  // 获取下一个月份对应的年和月
  var nextMonth = month + 1,
    nextYear = year
  if (nextMonth === 13) {
    nextYear = year + 1
    nextMonth = 1
  }

  // 获取当前日期
  var currentYear = getCurrentDate().year
  var currentMonth = getCurrentDate().month
  var currentDate = getCurrentDate().date

  var arr = getNextMonthRestDays(year, month)
  return arr.map(function (item) {
    var td = document.createElement('div')
    td.className = 'td next-month'
    // 判断条件，下月渲染中的某天是否为当前日期
    if (currentYear === nextYear && currentMonth === nextMonth && currentDate === item) {
      td.classList.add('current')
    }
    td.innerText = item
    return td
  })
}

//  console.log(createTd2(getNextMonthRestDays(2022,12)))

// 根据当月需要渲染的天数，来生成对应td标签
// function createTd3(days){
//     var result=[];
//     for(var i=1;i<=days;i++ ){
//         var td=document.createElement('div');
//         td.className='td';
//         td.innerText=i;
//         result.push(td);
//     }
//     return result;
// }

function createTd3(year, month, selectDate) {
  var result = []
  // 要判断当前的year,month,date日，是不是于当前的日期完全一样，如果是，则date的td结构上添加current样式
  var currentYear = getCurrentDate().year
  var currentMonth = getCurrentDate().month
  var currentDate = getCurrentDate().date

  var days = getMonthDayCount(year, month)
  for (var i = 1; i <= days; i++) {
    var td = document.createElement('div')
    // 判断 渲染日期是不当前日期
    if (year === currentYear && month === currentMonth && i === currentDate) {
      td.className = 'td current'
    } else {
      td.className = 'td'
    }

    // 判断是否当前有选中的日期，如果有，则将期标红色边框
    if (selectDate && selectDate == i) {
      td.classList.add('active')
      prevEl = td
    }

    td.innerText = i
    result.push(td)
  }
  return result
}

// console.log(createTd3(getMonthDayCount(2022,12)))

//  创建render渲染函数，根据对应的年月渲染出日历内容
// selectDate 表示当前选中天数
function render(year, month, selectDate) {
  // 更新日历头部的日期
  var dateDom = document.querySelector('.calendar-menu .current-date')
  dateDom.innerText = year + '年' + month + '月'

  // 获取上月需要渲染的日期,返回的是一个数组
  //  var prevMonthRestDays=getPrevMonthRestDays(year,month);
  // 当前月需要渲染的天数,返回的是一个整数
  // var currentMonthCountDays=getMonthDayCount(year,month)
  // 下个月需要渲染的天数 ，返回的是一个数组
  // var nextMonthRestDays=getNextMonthRestDays(year,month);

  // 根据对应的日期创建对应的td结构,三者都是一个数组
  // var prevTd=createTd1(prevMonthRestDays);
  var prevTd = createTd1(year, month)
  // var nextTd=createTd2(nextMonthRestDays);
  var nextTd = createTd2(year, month)
  // var currentTd=createTd3(currentMonthCountDays);
  if (selectDate) {
    var currentTd = createTd3(year, month, selectDate)
  } else {
    var currentTd = createTd3(year, month)
  }

  // 将三个数组，合并成一个数组
  var tds = prevTd.concat(currentTd, nextTd)
  // 将创建好的表格，插入到页面中
  var calendarMain = document.querySelector('.calendar-main')
  // 每次插入新的内容前，要将原来的内容清空
  calendarMain.innerHTML = ''
  calendarMain.appendChild(createTable(tds))

  // 根据tds来创建对应6行7列的表格，然后插入到页面中去
  function createTable(tds) {
    var table = document.createElement('div')
    table.className = 'table'

    // 创建对应的行和列
    var n = 0 // 用来记录当前的个数
    // 行
    for (var i = 0; i < 6; i++) {
      var tr = document.createElement('div')
      tr.className = 'tr'
      for (var j = 0; j < 7; j++) {
        // 列
        tr.appendChild(tds[n])
        n++
      }
      table.appendChild(tr)
    }
    return table
  }
}

// 根据当前的日期，来渲染出对应的日历
function getCurrentDate() {
  var nowDate = new Date()
  return {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  }

  // return {
  //     year:2023,
  //     month:1,
  //     date:3
  // }
}

// render(getCurrentDate().year,getCurrentDate().month)
```

### 11、完整版日历组件开发

```html
<style>
  .calendar {
    width: 300px;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px #ddd;
    border-radius: 5px;
    padding: 20px;
    margin: 100px;
  }
  .calendar-menu {
    display: flex;
  }
  .calendar-menu span {
    user-select: none;
    cursor: pointer;
    color: rgb(125, 124, 124);
  }
  .calendar-menu .current-date {
    flex-grow: 1;
    text-align: center;
    color: #000;
  }
  .calendar-menu .prev-year {
    margin-right: 20px;
  }
  .calendar-menu .next-year {
    margin-left: 20px;
  }

  /* display:table 布局样式 */
  .table {
    display: table;
    width: 100%;
  }
  .table .tr {
    display: table-row;
  }
  .table .tr .th,
  .table .tr .td {
    display: table-cell;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    height: 35px;
    cursor: pointer;
  }
  .table .tr .th {
    border-bottom: 1px solid #ddd;
    padding-top: 20px;
  }
  .table .tr .td.next-month,
  .table .tr .td.prev-month {
    color: rgb(194, 194, 194);
  }
  .table .tr .td.current {
    background-color: rgb(244, 31, 102);
    color: #fff;
    font-weight: bold;
  }
  .table .tr .td:hover {
    outline: 2px solid #ddd;
  }
  .table .tr .td.active {
    outline: 2px solid tomato;
  }
</style>

<div class="calendar">
  <!-- 年月切换按扭开始 -->
  <div class="calendar-menu">
    <span class="prev-year">&lt;&lt;</span>
    <span class="prev-month">&lt;</span>
    <span class="current-date">2022 年 12月</span>
    <span class="next-month">&gt;</span>
    <span class="next-year">&gt;&gt;</span>
  </div>
  <!-- 年月切换按扭结束 -->

  <!-- 周信息开始 -->
  <div class="calendar-week table">
    <div class="tr">
      <div class="th">一</div>
      <div class="th">二</div>
      <div class="th">三</div>
      <div class="th">四</div>
      <div class="th">五</div>
      <div class="th">六</div>
      <div class="th">日</div>
    </div>
  </div>
  <!-- 周信息结束 -->
  <!-- 日历主体开始 -->
  <div class="calendar-main">
    <div class="table">
      <div class="tr">
        <div class="td prev-month">28</div>
        <div class="td prev-month">29</div>
        <div class="td prev-month">30</div>
        <div class="td">1</div>
        <div class="td">2</div>
        <div class="td">3</div>
        <div class="td">4</div>
      </div>
      <div class="tr">
        <div class="td">5</div>
        <div class="td">6</div>
        <div class="td">7</div>
        <div class="td">8</div>
        <div class="td">9</div>
        <div class="td">10</div>
        <div class="td">11</div>
      </div>
      <div class="tr">
        <div class="td">12</div>
        <div class="td">13</div>
        <div class="td">14</div>
        <div class="td">15</div>
        <div class="td">16</div>
        <div class="td">17</div>
        <div class="td">18</div>
      </div>
      <div class="tr">
        <div class="td">19</div>
        <div class="td">20</div>
        <div class="td">21</div>
        <div class="td">22</div>
        <div class="td">23</div>
        <div class="td">24</div>
        <div class="td">25</div>
      </div>
      <div class="tr">
        <div class="td current">26</div>
        <div class="td">27</div>
        <div class="td">28</div>
        <div class="td">29</div>
        <div class="td">30</div>
        <div class="td">31</div>
        <div class="td rest">1</div>
      </div>
      <div class="tr">
        <div class="td next-month">2</div>
        <div class="td next-month">3</div>
        <div class="td next-month">4</div>
        <div class="td next-month">5</div>
        <div class="td next-month">6</div>
        <div class="td next-month">7</div>
        <div class="td next-month">8</div>
      </div>
    </div>
  </div>
  <!-- 日历主体结束 -->
</div>
<script src="./date.js"></script>
<script>
  // 日历的渲染，我们需要知道以下几个重要的信息
  // 1、当月有多少天，有了这个数字，我们就可以知道当月从1号渲染到几号
  // 2、当月的第一天是星期几，有了这个信息，我就知道当月1号的渲染位置
  // 3、上个月需要渲染多少天和对应的日期
  //    - 当月的第一天是星期几，就可以知道上个月需要渲染多少天，如果当月的第一天是星期日（0)，要特别处理下
  //    - 上个月的最后一天是多少要知道
  // 4、下个月需要渲染的天数和日期  = 42-当月总天数 -上月需要渲染的天数    42-3-31=42-34=8

  // 根据当前的日期（年，月来渲染出对应日历）
  var date = getCurrentDate()
  var currentYear = date.year
  var currentMonth = date.month
  var currentDate = date.date

  // 渲染日历
  //   render(currentYear, currentMonth);
  render(2022, 12)

  // 优化的第一个方向：当前所在的日期背景色要标红
  // 化化的第二个方向，对应的标题中的日期要更新为最新渲染的日期

  // 获取对应的切换按扭，然后添加点击事件
  var prevYearDom = document.querySelector('.prev-year')
  var nextYearDom = document.querySelector('.next-year')
  var prevMonthDom = document.querySelector('.prev-month')
  var nextMonthDom = document.querySelector('.next-month')

  // 添加点击事件
  // 上一年
  prevYearDom.onclick = function () {
    currentYear--
    render(currentYear, currentMonth)
  }

  // 下一年
  nextYearDom.onclick = function () {
    currentYear++
    render(currentYear, currentMonth)
  }

  // 上一个月
  prevMonthDom.onclick = function () {
    currentMonth--
    if (currentMonth === 0) {
      currentMonth = 12
      currentYear--
    }
    render(currentYear, currentMonth)
  }

  // 下一个月
  nextMonthDom.onclick = function () {
    currentMonth++
    if (currentMonth === 13) {
      currentMonth = 1
      currentYear++
    }
    render(currentYear, currentMonth)
  }

  // 选中对应的日期
  // 事件代理
  var calendarMain = document.querySelector('.calendar-main')
  var prevEl = null // 前一个被选中的元素
  calendarMain.onclick = function (e) {
    var target = e.target
    var bool = target.classList.contains('td')
    if (!bool) return

    // 首先处理样式变化
    if (prevEl) prevEl.classList.remove('active')
    target.classList.add('active')
    prevEl = target

    // 判断当前点的是上个月的日期，还是下个月的日期
    var prevBool = target.classList.contains('prev-month') // 如果为true，表示点的是上个月日期
    var nextBool = target.classList.contains('next-month') // 如果为true，表示点的是上个月日期

    // 点的是上个月日期 或下个月的日期时，才会重新触发渲染
    if (prevBool) {
      // 点了上个月日期
      currentMonth--
      if (currentMonth === 0) {
        currentMonth = 12
        currentYear--
      }
      // 重新渲染
      var selectDate = target.innerText
      render(currentYear, currentMonth, selectDate)
    } else if (nextBool) {
      currentMonth++
      if (currentMonth === 13) {
        currentMonth = 1
        currentYear++
      }
      // 重新渲染
      var selectDate = target.innerText
      render(currentYear, currentMonth, selectDate)
    }

    // 得到当前选中的日期
    console.log(currentYear + '年' + currentMonth + '月' + target.innerText + '日')
  }
</script>
```

## 四、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 掌握`Math.PI`、`Math.pow`、`Math.sqrt`、`Math.floor`、`Math.round`、`Math.ceil`、`Math.random`、`Math.min`、`Math.max`方法及应用
- 创建日期的四种形式
- 日期对象的掌见方法：`getFullYear`、`getMonth()`、`getDate()`、getDay、getHours、getMinutes、getSeconds、getMilliseconds
- 掌握时间戳 `getTime()`方法

### 2、难点

- 掌握`Math.atan2`方法及应用
- 手写元素跟随鼠标旋转特效
- 手写活动倒计时功能
- 手写日历表
