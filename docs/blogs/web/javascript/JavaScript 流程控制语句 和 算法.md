# JavaScript 流程控制语句 和 算法

本章节我们一起来学习流程控制语句，所谓的流程控制句语，就是指我们可以通过这些语句来控制代码按照什么样的**顺序结构**来执行。

在 JS 中流程控制主要有三种结构：**顺序结构**、**分支结构**、**循环结构**，这三种结构代表三种不同的代码执行顺序。

![img](https://www.arryblog.com/assets/img/2022042801.3ae79cae.png)

顺序结构：

代码默认执行结构就是按顺序结构，从上往下依次执行的。

**分支结构语句**：

- if 语句
- switch 语句

**循环结构的语句**：

- for 语句
- while 语句
- do while 语句

> 这些都是接下来要学习的重点。首先我们来学习 if 语句

## 一、if 语句

if 语句是使用最频繁的语句之一，也是最简单的**条件语句**，也称为**选择语句**（**条件判断语句**）

### 1、最简单的 if 语句

- if 是**如果**的意思，如果`()`括号中条件成立，则就执行`{ }`大括号中的**语句块**。
- 如果不成立，则啥也不做

```js
if (条件) {
  // 当条件为真，则执行这里的代码
  // 语句块.....
}
// if语句后面的代码.....
```

注：

- 这里的**语句块**可能是**一行代码**，也可能是一个**多行代码**
- `()`括号里的**条件**可以是任何**值**或**任何表达式**，并且求值结果不一定是**布尔值**。
- 但 JS 内部会自动调用`Boolean()`函数，将这个表达式的返回值转为 **布尔值**。
- 如果条件求值为`true`,则执行`{}`中的**语句块**，如果条件求值为`false`，则啥也不做。执行 if 语句后面的代码。

#### 1.1、if 语句写法

```html
<script>
  // 3>2 条件表达式，返回值为true
  if (3 > 2) {
    console.log(3 > 2) // true
  }
</script>
<script>
  // null 最终被转换成boolean值，是false，所以不会执行括号中的代码
  if (null) {
    alert('条件不足，我只能躲起来！')
  }
</script>
```

#### 1.2、要注意区分那些是属于 if 语句体中的语句

```html
<script>
  // ’‘ 最终被转换成boolean值，是false，所以不会执行括号中的代码
  if ('') {
    alert('条件不足，我只能躲起来！')
  }
  // 以下是if语句体外的代码，不管if中的条件是满足，他都会执行
  console.log('我和if没关系，我始终会执行')
</script>
```

#### 1.3、 if 语句的简写

- 如果 if 语句体中只有`一条语句`，可以省略`大括号`和`换行`
- 如果超过一条语句，是万万不能简写的，简写会造成编译错误。

```html
<script>
  if (2 < 3) console.log('2<3成立，在控制台输出')
  if (2 > 3) console.log('2>3不成立，不在控制台输出')
  console.log('我与if无关，我永远出来')
</script>
```

### 2、if-else 语句

![is-else](https://www.arryblog.com/assets/img/ifelse.9b822e5d.png)

- 如果条件求值为 true，则执行语句块 1 中的内容，否则执行语句块 2 中的内容

```js
if (条件) {
  // 当条件为true，则执行这里代码
  // 语句块1....
} else {
  // 当条件为false，则执行这里代码
  // 语句块2....
}
```

代码演示：

```js
var a = 3
if (a > 2) {
  console.log(a + '>2') // 输入3>2
} else {
  console.log(a + '<2')
}
```

#### 案例实践：判断用户输入的数是偶数还是奇数

- 如果一个数除以 2,能整除，也就是余数为 0，就是偶数，否则就是奇数
- 但是如果用户啥也不输，`''`和`' '`也会被转成 0，这里暂时不做讲解，下面案例中会完善

```html
<script>
  // 弹出弹窗，让用户输入内容
  var num = Number(prompt('请用户输入一个数字'))
  // 上面num接收过来的值，是字符串类型，不过num%2时num会自动做隐式类型转换，转换成数字
  if (num % 2 == 0) {
    alert(num + '他是一个偶数')
  } else {
    alert(num + '他是一个奇数')
  }
</script>
```

### 3、if-else if 多条件分支语句

- 如果条件 1 成立，则执行语句 1，后面的就不看了
- 如果条件 1 不成立，则看条件 2，如果条件 2 成立，则执行语句 2，如果不成立，则执行语句 3

```js
if (条件1) {
  // 条件2为真，执行这里的代码
  // 语句 1....
} else if (条件2) {
  // 条件1为假，条件2为真，执行这里代码
  // 语句 2....
} else {
  // 条件1和1都为假，执行这里代码
  // 语句2....
}
```

#### 案例实践 1：根据用户的输入的成绩，判断用户是在那个成绩档次

| 分数   | 档次   |
| :----- | :----- |
| 90-100 | 优秀   |
| 89-70  | 良好   |
| 69-60  | 一般   |
| 0-59   | 不及格 |

```html
<script>
  var score = prompt('请输入你的考试成绩！')
  if (score >= 90) {
    alert('成绩优秀')
  } else if (score >= 70) {
    alert('成绩良好')
  } else if (score >= 60) {
    alert('成绩及一般')
  } else {
    alert('成绩不及格')
  }
</script>
```

#### 案例实践 2：判断用户输入的内容从是否为数字

代码实现思路分析：

- 用户输入的内容，都是字符串，我们要判断是否为数字，肯定是要把类型转换数字，看能不能转成功。
- 将字符串转成数字的方法有很多`Number()`、`parseInt()`、`parseFloat()`、`+`号，我们选那个呢？
- `Number()`和`+`都可以，只要字符串是不是纯数字，都会转成`NaN`，纯数字符串都会转成数字，但`' '`空格不行，会被转成`0`
- 所以接下来，接下来先过滤不是纯数字字符串，再过滤' ' 空格，剩下的就都是纯数字字符串了
- 要判断 Number()函数转换后的结果是不 NaN 和数，有两种办法，
- isNaN 用来判断一个数是不是数字，而 NaN 正好不是数字，还可以用 NaN 不自等的方法来判断。
- 接下来要过滤`' '`，`' '`空格 和 数字，可以通过 parseInt()和 isNaN 结合
- 乘下的就都是 纯数字字符串了

```html
<script>
  var num=prompt('请输入你的幸运数字！');
  if(isNaN(Number(num))){ // 如果条件成立，则num不是纯数字字符串，但不能过滤'' 空格
      console.log(num+'不是一个数字');
  }else if(isNaN(parseInt(num)){ // ’‘空格，会被转成NaN，NaN不是数字，为真，剩下的，就全都是纯数字了
           console.log(num +'不是一个数字');
  }else{
      console.log(num+'是一个纯数字');
  }
</script>
```

- 封装成方法使用

```js
function isNumber(num) {
  if (isNaN(+num)) {
    // 如果条件成立，则num不是纯数字字符串，但不能过滤'' 空格
    return false
  } else if (isNaN(parseInt(num))) {
    // 识别空格或者没有输入任何值
    return false
  } else {
    return true
  }
}
```

### 4、if、if-else、if-else if 语句的嵌套

```js
if(){
    // 语句 1
    // 语句中可以嵌套 if(){}else{ } 或if()else if(){}等if语句
}else{
    // 语句 2
    // 语句2中可以嵌套 if(){}else{ } 或if()else if(){}等if语句
}
```

### 5、if 嵌套案例实践

#### 案例实践 1：BMI 肥胖指数计算

- BMI 指数（Body Mass Index，身体质量指数）是用体重（以公斤为单位）除以身高（以米为单位）的平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否分赴康的标准。
- BMI 指数 = 体重 / 身高 \*身高

| BMI 值          | 分档     |
| :-------------- | :------- |
| 低于 18.5       | 过瘦     |
| 18.5~24（不含） | 正常     |
| 24~28（不含）   | 过胖     |
| 28~32（不含）   | 肥胖     |
| 大于等于 32     | 非常肥胖 |

```html
<script>
  // 要求用户输入身高,强制转换为数字
  var height = parseFloat(prompt('请输入你的身高多少米'))
  // 要求用户输入体重
  var weight = parseFloat(prompt('请输入你的体重'))
  // 判断输入是否合法
  if (isNaN(height) || isNaN(weight)) {
    alert('你的输入有误！')
  } else {
    // 计算得到BMI指数
    var bmi = weight / (height * height)

    // 分档判断
    if (bmi < 18.5) {
      alert('偏瘦')
    } else if (bmi < 24) {
      alert('正常')
    } else if (bmi < 28) {
      alert('过胖')
    } else if (bmi < 32) {
      alert('肥胖')
    } else {
      alert('非常肥胖')
    }
  }
</script>
```

#### 案例实践 2：判断用户输入的数是偶数还是奇数

```html
<script>
  var num = prompt('请用户输入一个数字')
  if (isNumber(num)) {
    if (num % 2 === 0) {
      alert(num + '是一个偶数')
    } else {
      alert(num + '是一个奇数')
    }
  } else {
    alert('你的输入有误,请重新输入一次')
  }

  // 封装好的，用来判断用户输入的是否是纯数字
  function isNumber(num) {
    if (isNaN(+num)) {
      // 如果条件成立，则num不是纯数字字符串，但不能过滤'' 空格
      return false
    } else if (isNaN(parseInt(num))) {
      // 识别空格或者没有输入任何值
      return false
    } else {
      return true
    }
  }
</script>
```

#### 案例实践 3：游乐园门票计算

- 某游乐园的门票价格如下表所示
- 请用户输入年龄和星期几，弹出对话框显示门票价格
- 星期日到星期一，分别用阿拉伯数字 0、1、2、3、4、5、6 表示

|      | 年龄大于 12 岁 | 年龄小于等于 12 岁 |
| :--- | :------------- | :----------------- |
| 平日 | 100            | 50                 |
| 周末 | 200            | 150                |

两种实现思路：

- 左图：先判断星期几，再判断年龄
- 右图：先判断年龄，再判断星期几

![image-20220922161718954](https://www.arryblog.com/assets/img/image-20220922161718954.57077d4b.png)

```html
<script>
  // 自动获取当前日期
  var date = new Date()
  // 设置日期 var date = new Date("2022/9/912");
  // 获取当前星期，0-6分别表示星期日-星期六
  var week = date.getDay()
  // 让用户输入年龄
  var age = Number(prompt('请输入你的年龄'))

  if (week == 0 || week == 6) {
    // 周末
    if (age > 12) {
      alert('周末门票价格' + 200)
    } else {
      alert('周末门票价格' + 150)
    }
  } else {
    // 平日
    if (age >= 12) {
      alert('今天门票价格' + 100)
    } else {
      alert('今天门票价格' + 50)
    }
  }
</script>
```

注：

在实际业务场景中，年龄也不会让用户自己输入，而是通过扫描身份证或输入身份证号来识别

身份证识别相关技术：

- [百度 AI 实践案例，点击查看 (opens new window)](https://ai.baidu.com/tech/ocr_cards/idcard)👆
- [阿里云 AI 实践案例，点击查看 (opens new window)](https://ai.aliyun.com/ocr/card)👆

## 二、switch 语句

除 if 语句之外，JS 还提供了另外一种选择语句：switch 语句

```js
switch (表示式或变量) {
  case 值1:
    // 执行语句1....
    break
  case 值2:
    // 执行语句2....
    break
  default:
    // 执行语句3....
    break
}
```

### 1、switch 语句基本用法

swith 后面的**表达式或变量**会**依次**会与**case 后面的值**进行比较，比较时是**全等比较**，因此不会做数据类型转换

- 如果比较结果为 true，就会执行当前 case 下面的执行语句,执行到 break 关键字，就会跳出 switch 语句，退出执行。
- 如果比较结果为 false，则继续往下比较，如果所有结果都为 false，则最后会执行 default 下面的语句。
- 当然 default 也可以省略不写

```html
<script>
  var a = 1 // a的类型是数字，这里可以尝试把值换成 1,3看下结果
  switch (a) {
    case '1': // 1 与 '1' 在全等比较时，返回false 不成立，则继续与下一个case后面值比较
      alert('这里是字符串1,匹配失败')
      break
    case 2: // 1 与 2全等比较，false，继续往下比较
      alert('这里是2,匹配失败')
      break
    case 1: // 1 与 1 全等，则执行这个case后面的语句
      alert('这里是1,匹配成功') // 在页面弹出弹窗
      break
    default:
      alert('找不到相匹配的内容')
      break
  }
</script>
```

注：

以上代码最后执行结果，最后在页面弹出弹窗，弹窗内容为 '这里是 1,匹配成功'

在实际开发时，`switch()`括号中表达式的值，经常是以**变量**形式出现

### 2、break 不写会有什么影响

- 如果不写 break，则会在匹配成功之后，后面所有 case 都将被视为匹配，直到遇见 break，才会退出。
- 所有在 switch 语句中，程序员必须主动调用 `break`来跳出`switch`语句体

```html
<script>
  var a = 1
  switch (a) {
    case 0: // 全等匹配失败
      alert('这里是0,匹配成功') // 这里不会弹出来
    case 1: // 全等匹配成功，下面代码会执行
      alert('这里是1,匹配成功') // 这里会弹出来
    // 这个case中没有break，则会将后面所有case都被视为匹配，遇到break才退出
    case 2:
      alert('这里是字符串2,匹配成功') // 这里会弹出来
      break // 到这里退出
    case 3:
      alert('这里是字符串1,匹配成功')
    default:
      alert('找不到相匹配的内容')
      break
  }
</script>
```

以上代码：

最后会在页面弹出 **'这里是 1,匹配成功'** ，确认后，又会接着弹出 **'这里是字符串 2,匹配成功'**

### 3、多条 case 共同一个语句体

switch 语句与 if 语的区别，switch 语句的用途：**当一个变量被分类讨论**的情形

- 判断当前是休息日，还是工作日
- 数字 0-6 表示星期日 - 星期六

**if 语形式**

```html
<script>
  var week = 0
  if (week == 1 || week == 2 || week == 3 || week == 4 || week == 5) {
    alert('现在是工作日，记得要早起喽！')
  } else if (week == 0 || week == 6) {
    alert('今天是周末，尽情的享受吧')
  }
</script>
```

**switch 语句**

```html
<script>
  // week表时当前星期几
  var week = 4
  // var week=new Date().getDay();   自动获取当天是星期几的方法
  switch (week) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      alert('现在是工作日，记得要早起喽！')
      break
    case 6:
    case 0:
      alert('今天是周末，尽情的享受吧')
      break
  }
</script>
```

### 4、switch 表达式值为布尔值

判断一个人是否是未成年人，如果满 18，就是成功，否则是未成年。

```html
<script>
  var a = Number(prompt('请输入你的年龄！'))
  switch (true) {
    case a >= 18:
      alert('成年人')
      break
    default:
      alert('未成年')
      break
  }
</script>
```

### 5、switch 的嵌套

```js
switch(){
    case 值1:
        // 执行语句
        break;
    case 值2:
        // 执行语句
        switch(){
            case 值1:
                // 执行语句
                break;
                // .....
        }
        break;
        // ......
}
```

### 6、switch 嵌套案例

案例实践：根据年份和对应的月份，判断月份天数

- 1，3，5，7，8，10，12 月，每月 31 天
- 4，6，9，11 月，每月 30 天
- 当年为闰年 2 月 29 天，其它年份，2 月 28 天

```html
<script>
  // var year=prompt('请输入当前年份')
  // var year=new Date().getFullYear(); 获取当前年份
  var year = 2022
  // 用户输入月份
  var month = Number(prompt('请输出当前的月份'))
  // var month=new Date().getMonth()+1; 获取当前月份(new Date().getMonth()返回 0-11这间值,0代表1月)
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      alert('当月有31天')
      break
    case 4:
    case 6:
    case 9:
    case 11:
      alert('当月有30天')
      break
    case 2:
      var isRunNian = (year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)
      switch (isRunNian) {
        case true:
          alert('这个月有29天')
          break
        case false:
          alert('这个月有28天')
          break
      }
      break
    default:
      alert('你输入的月份有误！')
  }
</script>
```

### 7、if 语句和 switch 语句应用场景总结

| 条件判断句 | 应用场景                                           |
| :--------- | :------------------------------------------------- |
| if 语句    | 根据条件做出判断，符合条件做什么，不符合条件做什么 |
| switch     | 一个变量存在多个值的情况，根据不同的值来分别讨论时 |

## 三、for 循环

如果我们想在页面中，重复捃行某个操作时，我们就可以用到 for 循环语句。

- 比如，你向一个女孩表白，他说，你必须要说 100 次"我爱你"，她才答应做你女朋友，那怎么办呢 ？
- 最简单的方式，就是把声音录到大喇叭里，重复的播放 100 次，哈哈！

> 我们来看下，如果没有 for 循环，拿之前学到的知识，我们要在页面输出 100 次"我爱你"，要咱处理

```html
<script>
  console.log('我爱你！')
  console.log('我爱你！')
  console.log('我爱你！')
  // ... 此处省略97次 console.log('我爱你！');
</script>
```

- 但有了 for 循环，我们就可以简化程序的写法

```html
<script>
  // 以下代码执行完，最后在控制台，输出100次“我爱你！”
  for (var i = 0; i < 100; i++) {
    console.log('我爱你！')
  }
</script>
```

### 1、for 语句的语法

首先我们来学习下 for 语句的语法，下面这个 for 循环语句有哪些组成部分

```js
// 在控制台输出从0-9的数字
for (var i = 0; i < 10; i++) {
  console.log(i)
}
```

**for 的圆括号中有三个表达式：**

- 表达式 `var i=0;`表示定义一个“循环变量"i，赋值为 0;
- 表达式 `i < 10;` 表示继续执行循环的条件，只要这个条件为真，则会一直执行；
- 表达式 `i++` 用来更新循环变量，使循环变量的值越来越趋向终点

### 2、for 语句的执行机理

我们先来看一个简单的 for 循环语句：

![image-20220910162136307](https://www.arryblog.com/assets/img/image-20220910162136307.d648ba50.png)

- 首先会**执行语句 ①**
- 然后**判断语句 ②**是否满足，如果满足则进入循环体，**执行语句 ③**，如果不满足则退出循环
- 语句体中的语句执行完毕后，**执行语句 ④**
- 再次**判断语句 ②**是否满足，如果满足则进入循环体，**执行语句 ③**，如果不满足则退出循环
- ...... 依次继续循环执行

![image-20220910231817112](https://www.arryblog.com/assets/img/for20221.9808a567.png)

### 3、准确遍历 for 循环

根据 for 循环执行机理，必须要会准确遍历 for 循环

**案例 1：**

```js
for (var i = 3; i <= 15; i += 3) {
  console.log(i) // 3,6,9,12,15
}

/*
    当 i=3, 3<=15, 满足条件，输出 3; 再执行i+=3更新循环变量，得到i=6
    再次判断 i<15这个条件， 即 6<=15, 满足条件，输出 6;  再执行i+=3更新循环变量， 得到i=9
    再次判断 i<15这个条件，即 9<=15, 满足条件，输出9; 再执行i+=3更新循环变量，得到 i=12
    再次判断 i<15这个条件，即 12<=15, 满足条件，输出12; 再执行i+=3更新循环变量，得到 i=15
    再次判断 i<15这个条件，即 15<=15, 满足条件，输出15; 再执行i+=3更新循环变量，得到 i=18
    再次判断 i<15这个条件，即 18<=15, 不满足条件，退出for循环
*/
```

**案例**2：

```js
for (var i = 15; i > 2; i -= 3) {
  console.log(i) // 15,12,9,6,3
}

/*
    当 i=15, i>2, 满足条件，输出 15; i-=3 得到 i=12
    当 i=12, i>2, 满足条件，输出 12; i-=3 得到 i=9
    当 i=9, i>2, 满足条件，输出 9; i-=3 得到 i=6
    当 i=6, i>2, 满足条件，输出 6; i-=3 得到 i=3
    当 i=3, i>2, 满足条件，输出 3; i-=3 得到 i=0
    当 i=0, i>2, 不满足条件，退出循环
*/
```

**案例 3：**

```js
for (var i = 2; i < 12; i += 3) {
  i += 4
  console.log(i) // 6,13
}

/*
  当 i=2, i<12, 满足条件，i+=4, 输出 6; 再执行i+=3 得到 i=9
  当 i=9, i<12, 满足条件，i+=4, 输出 13; 再执行 i+=3 得到 i=16
  当 i=16, i<12, 不满足条件，退出循环
*/
```

**案例 4：**

```js
for (var i = 1; i < 10; i++) {}
// 不在循环体中，输出循环体结束时 i 的值
console.log(i) // 10
```

**案例 5：**

```js
for (var i = 1; i < 10; i--) {
  console.log(i) // i永远都会小于10 ，所以会进入死循环
}
```

**案例 6：**

```js
for (var i = 10; i < 4; i++) {
  console.log(i) // 没有任何输出，一开始就不满足条件
}
// 在循环体外输出：i=10
console.log(i)
```

### 4、for 循环案例

- 求 1-10 之间所有数字之和

```js
// 这里一定要赋初始值为0，否则为undefined,在做+加法运算时，转换成NaN，NaN与任何数相加都得NaN
var sum = 0
for (var i = 1; i <= 10; i++) {
  sum += i // 等同于 sum=sum+i;
}
console.log(sum) // 55
```

- 字符串的拼接（在页面输入 10 颗星星）

```js
// 一定要赋初值始，并且只能是''字符符串。
var str = ''
for (var i = 0; i < 10; i++) {
  str += '★'
}
console.log(str) // ★★★★★★★★★★
```

### 5、for 循环嵌套

for 循环中可以嵌套 for 循环

```js
for (var i = 0; i < 5; i++) {
  // ...循环体
  for (var j = 0; j < 5; j++) {
    // ...循环体
  }
}
```

**for 循环嵌套的执行原理**

- 从最外层 for 循环开始执行，执行到内部 for 循环时，要把内部 for 循环执行完
- 再更新最外层的循环变量，然后判条件是否成立，成立则执行循环体中代码，进入内部循环
- 内部循环全部执行完，再更新最外层循还变量......重复上面过程

```js
for (var i = 1; i <= 3; i++) {
  for (var j = 1; j <= 5; j++) {
    console.log('i=' + i + ',j=' + j)
  }
}
/*
 * 首先i=1，i<=3成立，则进入循环体,执行循环体中的for
 * j=1,j<=5成立，则进入循环体，执行循环体中的代码  console.log("i=" + i + ",j=" + j);
 * 执行成功后，j++,得到j=2,再判2<=5成立，则再执行循环体中代码
 * 重复上面过程，当j的值为6时，退出第二个for循环体。进入第一个for循环，i++得到i=2,2<3成立，
 * 进入第二个for循环，首先j=1,1<5成立，则进入第二个for循环体......
 * 最后当i=4是，退出整个for循环。
 */
```

![image-20220910165157209](https://www.arryblog.com/assets/img/image-20220910165157209.db4f7d73.png)

### 6、for 循环嵌套案例

#### 案例实践 1：打印如下图形

题目要求

理解最外层 for 循环代表行，最内层 for 循环代表列

![image-20220910235506744](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAABdCAIAAADojJV6AAAB20lEQVR4nO2Z0UrEMBQFs7If4or+/wct6KfEhxS5JGkaC54T6syTpNNFbuOmMreccwItL+5f4D/C0A1MDf3x9vGrD8Ufw043cDz08hjnHyb+Iex0AwdDjw9w5mHiz3Br39Mnb/76fOLP+C2dnT6wuw7+2G/pf72M72mv4s9fTYPv9L07WT+3HuHtxQBDN7A79HhGxz+ZvbMbf+xH7uPLPx9Xfjj8RPyxv5F7vD7eu+t7V/Hnr+acO/8cwV/DQWqAoRtg6AYoRwafnW6AcqT2EzvdAuVI6hcoR5SjK/otlCOFX0E5Eq1HeHsxwNANUI5EfoRyJPU3TrSP9UvNan4F5cgAB6kBhm6AoRugHBl8droBypHaT+x0C5QjqV+gHFGOrui3UI4UfgXlSLQe4e3FAEM3QDkS+RHKkdTfONE+1i81q/kVlCMDHKQGGLoBhm6AcmTw2ekGKEdqP7HTLVCOpH6BckQ5uqLfQjlS+BWUI9F6hLcXAwzdAOVI5EcoR1J/40T7WL/UrOZXUI4McJAaYOgGGLoBypHBZ6cboByp/cROt0A5kvoFyhHl6Ip+C+VI4VdQjkTrEd5eDDB0A5QjkR+hHEn9jRPtY/1Ss5pfQTkywEFqgKEbYOgGvgGEE7UZW+Ub+QAAAABJRU5ErkJggg==)

```js
var str = ''
// 行
for (var i = 0; i < 5; i++) {
  // 列
  for (var j = 0; j < 7; j++) {
    str += '★'
  }
  str += '\n'
}
console.log(str)
```

#### 案例实践 2：打印 99 乘法表

题目要求

- 在理解理解最外层 for 循环代表行，最内层 for 循环代表列的基础上
- 要找出行与列对应的关系（这是最难，也是必需要攻克的）

> `document.write()`把内容添加到`html`的`body`标签中

```html
<style>
  span {
    display: inline-block;
    width: 100px;
    line-height: 30px;
    background-color: #ddd;
    margin: 5px;
    text-align: center;
  }
</style>
<script>
  // 最外层for循环打印对应行数
  for (var i = 1; i <= 9; i++) {
    // 内层for循环，打印对应列数
    for (var j = 1; j <= i; j++) {
      document.write('<span>' + j + '*' + i + '=' + j * i + '</span>')
    }
    document.write('<br/>')
  }
</script>
```

![image-20220910195059184](https://www.arryblog.com/assets/img/image-20220910195059184.1edf07df.png)

总结规律：

- 最外层 for 循环对应的行数
- 最内层 for 循环对应每一行中的列
- 在执行 for 嵌套时，首先要找的就是行和列的关系（当然最难的也就是找出列和行之间的关系）

> 有了这个规律，我们想打印任何图形，就变的轻松简单了。我们来看下面这几个图形可以如何打印

#### 案例实践 3：打印下表中的 3 个图形

题目要求

`document.writeln` 是向文档中写入一串文本，并紧跟着一个换行符（换行符会被编译成空格效果）

| 等腰三角形                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | V 字形                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | X 图形                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image-20220910184848073](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACLCAIAAADAss0bAAACrUlEQVR4nO3cMU4cMRhA4X+iXCJFjpAmJcdYBAVcBVHAcpSdkmOw3AMkuMWkSBMQNs54Yj8r72vB0qyePJLNz07LsoQwvvR+AL1hDxZ7sNiDxR4s9mCxB4s9WOzBwu/xOp9Pn7s99n7ObfB7RETs5pcl6eVw1vv5tjNGj/+HPVjswWIPFnuw2IPFHiz2YLEHy9feD1Dk/uLbdJH9jR+NnuRfG2N/eF+iPibnr1DcHyz2YLEHiz1Y7MFiDxZGj+f5tGBm4e7x49XH24LF5/Nr28+0DqNHRMTu8JQ+gz8ddvnVNw/pxcvDTZuPsAFOD0XYg8YeLPZgsQeLPVjswWIPFnuwcOYZ7i+/T5fZ3/iZ+dn1yXSdXTzI39g5+8P7kghSD0U4z0Dj/mCxB4s9WOzBYg8We7C061E3dVD3LQ118xIttd0fdafouv86qDv/t+L7isUeLPZgsQeLPVjswWIPFnuw2IOl7TxD3dRB3bc01M1LtOJ9ifclSnOegcX9wWIPFnuw2IPFHiz2YNm0R+XYwONdwerT+fnj1T3nJbaz+f6oPAbvcyf44/6T1T3P/9vwfcViDxZ7sNiDxR4s9mCxB4s9WOzBsvk8Q+XYwNXJdJVdnT3g95yX2Ib3JX88uvclesd5Bhb3B4s9WOzBYg8We7DYg+Wvewz8NQs95yVKrdofA//bQM/zfwnfVyz2YLEHiz1Y7MFiDxZ7sNiDxR4sq+YZBv6ahZ7zEiW8L/G+RGnOM7C4P1jswWIPFnuw2IPFHjCrTlUREfvj2lNVROZYV3SqOjskjpRlU+ipY13XD/5ban8MfAwe+Pzv+4rGHiz2YLEHiz1Y7MFiDxZ7sNiDJTXPMPDYwMDzEun94X1Jjw/u+4rGeQYW9weLPVjswWIPFnuw2IPFHiz2YLEHyy+HyPQflCCt6AAAAABJRU5ErkJggg==) | ![image-20220910191453839](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB/CAIAAACi6DFHAAADSElEQVR4nO3dsWrbUBSH8Xv6FDU0g6FrlmzJW1QiHpJHyFa6dUuszfQtpEDB5C2kTF7yAB1skN/idglNm7ZgX+nqu1L+vzFgYT6Ji8nxScx772RY7+g38BYpOkDRAYoOUHTA39H31cKKR+CtjMj+Pre7Jvjl/3zSs/mH4Au+FdnHefBrf4u+q3Izs5u1c+vPZmb5/b6Hdzcp+2phZnbz4NzDjZnZogpp5F/ZlplzWdW+/rm8aMtL5y7L4EavjpemOLk+a9r8YaZj/X+au9n1ad1+Ws+Cj/U/7mCVudvae++bZZc7OWXbMnPL2nvv66XLym3INczrdy+D0+d0gKIDFB2g6ABFByg6QNEBig5QdICiAxQdoOgARQcoOuDI6I9F4IBqfJrC8moX5dLHP+mn8/cR3keSziIN6A+N3tyZmeXfNu5plZuZFeHfQEjcY2Fmtlht3Ga1MLMIX0g5as5U3zr3PKyaumbpnFs2Ua59xPGyv88vnsq2cReTP9Z3VX6+Kbe1O49zrB98e37NYdvyMtYjkIj69vlLKC+T+l5pMA3Q53SAogMUHaDoAEUHKDpA0QGKDlB0gKIDFB2g6ABFByg6oMfo41u17rj4HKzfJ318q9ZdFp+D9RF9fKvWPS0+B+ttBjW+Veuui8/B+jpexrdq3cPic7Bebt34Vq37WHwOpsE0QJ/TAYoOUHSAogMUHaDoAEUHKDpA0QGKDlB0gKIDFB2g6IChomOr1hEXn4MN+KRjq9axFp+DRY+OrVoPsPgcbJgBFbZqHXPxOdgQxwu2ah178TlY/PuKrVrHXnwOpsE0QJ/TAYoOUHSAogMUHaDoAEUHKDpA0QGKDlB0gKIDFB2g6IAUonddtaYWn4OlEN11X7VGFp+DodG7rlrTi8/B6NFV91VrbPE5GH68dF21Jhefg7H3vOuqNbr4HEyDaQB+vLxFig5QdICiAxQdoOgARQcoOkDRAYoOUHSAogMUHaDogNSjj27ofIjUo7uxDZ0PkWz00Q6dD5D45GhfLWbXrmy/X03pX7gn+6Q7N9Kh8wESftJ3VX7y44v/eu6awlbz7foqsT9mESzh6NOV9PEyVYoOUHSAogMUHaDoAEUHKDpA0QE/ATWB8rwwA9GoAAAAAElFTkSuQmCC) | ![image-20220910193725282](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAADoCAIAAABNSXyCAAAE6UlEQVR4nO3dMW7bSABG4Zk9xRrYFAa2TZPOucVKsIr4CO6C7bazpc7YW4gGAhi+hejKTQ6QQgakW3AbYwMXUqwZch5Hel8dB8IjQTAY/1Hsui6ouN/oD3Ci7M6wO2N/920zi4unQh+lUtv7abxtD/2pX97vk/M/0j7PCZn8eX7oj+zo/tJMY4zx+iGEh68xxji93+Z+umOzbWYxxnj9GMLjdYwxzpoDGnV7rJeTECbNZt+fOXWb5WUIl8tDG+15zrSLD1ef2s308cxH/C7t7dnVx9Xmr4ezQx/xO69jMwk3q67runaecD1Pwno5CfNV13Xdah4my/UBPxo7/71K8P2dYXeG3Rl2Z9idYXeG3Rl2Z9idYXeG3Rl2Z9idYXdGRvenxWEnWxVrF3HavPT5N+bd7x/Pf+/pc4zep37P91O6t7cxxjj99zl8v5vGGOPi4F9jqMXTIsYYZ3fP4fluFmPs77dakg+5VjchvJ5yHbt2HkKYt33+lYnPme399PP35aYNn4/+Ef/STC+el+tVuOj1EZ90tf4/xt0sL3u+EcZmdfP6myw/D/r74Lk2w/d3ht0ZdmfYnWF3ht0ZdmfYnWF3ht0ZdmfYnWF3ht0ZA3Wvb+idNrtONtz9Xt/QO2F2nazv7vUNvfNm18n6Orh6o76hd+LsOtkQz5n6ht7ps+tkvV/J+obeGbPrZJ5rM3x/Z9idYXeG3Rl2Z9idYXeG3Rl2Z9idYXeG3Rl2Z9idQXTHht79z66TQfc7NvTueXadrGh3bOg93Ow6WYlDrbewofcAs+tkpZ8z2NB7oNl1srKXGRt6DzS7Tua5NsP3d4bdGXZn2J1hd4bdGXZn2J1hd4bdGXZn2J1hd4bdGWPrnjv0Ljy7Tja27iF/6F1ydp1sNN1zh97Q7DoZfeD1Vu7Qu/TsOtlo7vcQ8ofewOw6GX3hf8odehOz62SeazNG9Zw5IXZn2J1hd4bdGXZn2J1hd4bdGXZn2J1hd4bdGXZn1NS9ljPr96ipe6jkzPo9quhe25n1O1R03rRtZmdXYbn59uUIvsS+ivs9hLrOrN+hkvv9pZl++PF3989FaBfx7nz98GUc/61Gskq6H51qnjNHxu4MuzPszrA7w+4MuzPszrA7w+4MuzPszrA7w+6MsXV3r41xr12Se22Se22Ce22Ce20NblTPmRNid4bdGXZn2J1hd4bdGXZn2J1hd4bdGXZn2J1hd4bfr83w+7UZfr82pPwRl9+v3fn92piyl9nv137luTbD93eG3Rl2Z9idYXeG3Rl2Z9idYXeG3Rl2Z9idYXeG3RkDdc+dXZdXeOg93P2eO7sur+TQu+/uubPr8qCh9yCnWLmz6/JKD72HeM7kzq7LA4bevV/J3Nl1ecTQ23Nthu/vDLsz7M6wO8PuDLsz7M6wO8PuDLsz7M6wO8PuDLszMrpjs+vy+h96593v2Oy6vJ6H3indsdl1ecMNvZNPqrDZdXkDDL0TnzPY7Lq8gYbeSVcLm12XN9DQ23Nthu/vDLsz7M6wO8PuDLsz7M6wO8PuDLsz7M6wO8PuDLsz9nevb3ZdXtrQ+5f3e32z6/ISht47utc3uy4vb+i97zCqvtl1eYlD7z3Pmfpm1+WlD713XsfqZtflZQy9Pddm+P7OsDvD7gy7M+zOsDvD7gy7M+zOsDvD7oz/ABnX920aa1BaAAAAAElFTkSuQmCC) |

- 图形打印原理

![image-20220923193546683](https://www.arryblog.com/assets/img/image-20220923193546683.98b89ecb.png)

- 等腰三角形

```html
<script>
  // 行
  for (var i = 0; i <= 5; i++) {
    // 列左边空格
    for (var j = 1; j <= 5 - i; j++) {
      document.writeln('&nbsp')
    }
    // 列中口
    for (var k = 0; k < i + 1; k++) {
      document.writeln('口')
    }
    document.writeln('</br>')
  }
</script>
```

- V 字形

```html
<script>
  // 图形行
  for (var i = 0; i <= 5; i++) {
    // 列前面空格
    for (var j = 0; j < i; j++) {
      document.writeln('&nbsp;')
    }
    // 列中第1个星星
    for (var k = 0; k <= 0; k++) {
      document.writeln('*')
    }
    // 每列两个星星中间的列空格
    for (var h = 0; h < 9 - 2 * i; h++) {
      document.writeln('&nbsp;')
    }
    // 列中第2个星星
    for (var k = 0; k <= 0; k++) {
      if (i != 5) {
        document.writeln('*')
      }
    }
    document.writeln('</br>')
  }
</script>
```

- X 图形

```html
<script>
  // 打印 x的上半部分
  for (var i = 0; i <= 5; i++) {
    // 列前面空格
    for (var j = 0; j < i; j++) {
      document.writeln('&nbsp;')
    }
    // 列中第1个星星
    for (var k = 0; k <= 0; k++) {
      document.writeln('*')
    }
    // 每列两个星星中间的列空格
    for (var h = 0; h < 9 - 2 * i; h++) {
      document.writeln('&nbsp;')
    }
    // 列中第2个星星
    for (var k = 0; k <= 0; k++) {
      if (i != 5) {
        // 在v的底部，只要一个星，所以要去掉一个
        document.writeln('*')
      }
    }
    document.writeln('</br>')
  }
  // x的下半部分
  for (var i = 0; i <= 5; i++) {
    // 列前面空格
    for (var j = 0; j < 4 - i; j++) {
      document.writeln('&nbsp;')
    }
    // 列中第1个星星
    for (var k = 0; k <= 0; k++) {
      // 保证上v和下v中*的个数相同，则下v左边最后一个星要去掉
      if (i != 5) {
        document.writeln('*')
      }
    }
    // 每列两个星星中间的列空格
    for (var h = 0; h <= i * 2; h++) {
      document.writeln('&nbsp;')
    }
    // 列中第2个星星
    for (var k = 0; k <= 0; k++) {
      if (i != 5) {
        document.writeln('*')
      }
    }
    document.writeln('</br>')
  }
</script>
```

## 四、for 循环算法题

关于什么是算法，我们先不讲，我们做两道算法题，来找找感觉，然后在本章的第九个版块，我们会再深入探讨算法。

在接下来的算法题中，我们会接触 2 个重要的概念：**累加器**、**累乘器**。

### 1 、计算 1+2+3+ ...... +99+100 的和

题目解析

求 1+2+3+.....+99+100 的和，本质就是等差数列求和

**什么是等差数列 ？**

- 等差数列：如果一个数列从第二项起，每一项与它的前一项的差等于同一个常数，这个数列就叫做等差数列
- 如：1，2，3，4，5，6..... 或 1，3，5，7，9，11，....
- 如果我们要计算等差数列的求和，在数学中是有计算公式的，也就是前面讲到的高斯算法：
- 计算等差数列前 n 项和：`Sn=(n*(a1+an))/2`
- a1 代表首项，a2 代表第 2 项.....an 代表第 n 项

**注：**

- 在计算机中，并没有等差数的求和公式，我们必须一项一项的加起来，就要用到 for 循环
- 在 JS 中，我们使用**累加器**来操作

```js
// 创建累加器
var sum = 0
// 遍历1到100的每一个数字，每遍历一个数字就要把这个数字加到sum中去
for (var i = 1; i <= 100; i++) {
  sum += i
}
// 输出累加器的值
console.log(sum)
```

注意：

- 累加器（变量 sum)必须定义在循环外面的前面
- 累加器的初始值必须设置，而且必须设置为 0，不会影响累加结果
- 使用最终累加结果时，必须在 for 循环结束后的外面
- 很多 JS 大神喜欢将 sum 这样的变量，书写在 for 循环的括号中

```js
// 循环开始的时候定义sum，sum就是累加器，初始值是0
// 遍历1到100的每一个数字，每遍历一个数字要把这个数字加到sum中去
for (var i = 1, sum = 0; i <= 100; i++) {
  sum += i
}
// 输出累加器的值
console.log(sum)
```

### 2、计算 10 的阶乘

题目解析

- 一个正整数的**阶乘**（**factorial**）是所有小于及等于该数的正整数的积，并且 0 的阶乘为 1。
- 自然数 n 的阶乘写作 n!
- 10! = 10 _ 9 _ 8 _ 7 _ 6 _5 _ 4 _ 3 _ 2 \*1
- 在 JS 中，我们使用**累乘器**来操作

```html
<script>
  // 累乘器,初始值必须是1
  var n = 1
  for (var i = 10; i >= 1; i--) {
    // 将每一次的数据 i 要累乘到 n 中去
    n *= i
  }
  // 循环结束后使用累乘结果
  console.log(n) // 3628800
</script>
```

注：

- 累乘器必须定义在循环外部前面
- 累乘器的初始值必须是 1，因为 1 乘以任何数都等于本身
- 累乘器最终结果必须在 for 循环结束后的外面

## 五、while 循环

while 表示 **"当"** 的意思，是一种先测试语句，和 for 循环一样，先测试条件，根据测试条件再判断是否执行行环循体中代码

```js
while (测试条件) {
  // 执行语句，代码块
}
var i = 1 // 循环变量
while (i < 10) {
  // 测试条件
  // 循环体
  console.log(i)
  i++ // 更新循环变量
}
```

![image-20220910231920887](https://www.arryblog.com/assets/img/for20220911.9de8fe83.png)

### 1、while 循环注意事项

注：

- while 语句事先不指定循环开始、结束的范围，只要测试条件满足，就一直执行循环体
- 所以 while 循环体内的语句，必须使循环**测试条件趋向不成立**，否则会死循环
- while 循环没有指定循环的变量，必顺在**循环外定义好循环的变量**

```js
var i = 0 // 定义循环变量
var num = 0 // 累加器
while (i <= 10) {
  // 测试条件
  num += i
  i++ // 更新循环变量
}
```

### 2、更适合 while 的应用场景

**while 循环**更适合，没有定范围的循环，根据结果，找条件。

#### 应用实践 1：寻找 n2 大于 23450 的最小整数

```js
var n = 1
while (n * n <= 23450) {
  n++
}
console.log(n) // 154
```

#### 应用实践 2：

> 小兔子拔萝卜，第 1 天拔 1 个，第 2 天拔 2 个，第 3 天拔 3 个 .... 以此类推。请问小兔子多少天能把 500 个萝卜扒光 ？

题目解析：

我们把这个题转化成下面这个表格，大家没有没发现，这是不是我们前面讲过的等差数列的求和。

| 第 1 天 | 第 2 天 | 第 3 天 | ..... | 第 n-1 天 | 第 n 天 |
| :------ | :------ | :------ | :---- | :-------- | :------ |
| 1       | 2       | 3       | ..... | n-1       | n       |

- 当等差数列 1,2,3,4....n-1,n 之和第一次>500 时，这里的 n 就是我们要找的 n
- 所以我们需要有一个累加器来累加所有天数萝卜之和，当累加器的值<500 时，就一直累加，加到>500 时，就不加了。

```js
var n = 1 // 天数，也是这一天的拔萝卜数
var sum = 0 // 累加器
while (sum < 500) {
  sum += n
  n++ // 最后一次循环会多加一个1
}
console.log(n - 1) // 32
```

验证：

通过等**差数列求**和公式： (首项 + 末项) \* 项数 / 2 = 和

- 计算 1+2+3+4+5 ... +32 的和
- (1 +32) \* 32 / 2 = 528

## 六、do while 循环

![image-20220910231947027](https://www.arryblog.com/assets/img/do-while202209.45f613f7.png)

详细解读

- do while 循环是一种 **后测试循环语句**，这一点和 while 和 for 都不一样。
- for 循环和 while 循环每次都是 "先测试条件是否满足，然后执行循环体"
- do while 循环是 "先执行循环，然后测试条件是否满足"

```js
do {
  // 循环体
} while (循环执行条件)
```

- **循环体一定会至少执行一次**，然后再检测循环执行条件是否为 true，决定是否继续执行循环体。
- do while 循环将循环执行条件写到了循环体的后面

```js
// do while循环是后判断的循环形式，能至少执行一次循环体
do {
  console.log('太棒了！')
} while (false)
```

### 1、随机数函数

- 在接下来的案例中，我们会用到随机函数，所以在此我们先来学习下随机数函数
- `Math.random()`方法，可以得到 0-1 之间的小数

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

### 2、更适合 do while 的应用场景

- 先运行一次代码，如果不符合条件再重做，符合就不做了。
- 其不满足条件，是在事情做完后产生的

#### 应用实践 1：

> 随机生成 2 个 1-10 之内的整数，但是这 2 个数之和要等于 10

```html
<script>
  var a, b
  do {
    a = parseInt(Math.random() * 10) + 1
    b = parseInt(Math.random() * 10) + 1
  } while (a + b != 10)
  console.log(a, b)
</script>
```

#### 应用实践 2：

> 随机移动元素的位置

题目解析

- 在做游戏开发和动画的时候，我们想随机生成两个数 a 和 b，作为元素在 x，y 轴方向上的移动距离
- 要求 a 和 b 的值均在[-10 , 10]区间随机整数
- 但 a 和 b，不能同时为 0

```js
var x, y
do {
  x = parseInt(Math.random() * 21) - 10
  y = parseInt(Math.random() * 21) - 10
} while (x == 0 && y == 0)
console.log(x, y)
```

## 七、break、continue、label 语句

break 和 continue 语句为执行循环代码提供了更严格的控制手段

### 1、break 语句

什么时候用 ？

break 语句用于立即**退出当前循环**，他只能用在循环语句中，如 for 循环和 while 循环中都可以

```js
for (var i = 0; i < 10; i++) {
  console.log(i)
  if (i == 5) {
    break
  }
}
// 输出：0、1、2、3、4、5
// 当执行到i==5时，遇到break，就会退出整个循环语句
```

- break 在 for 嵌套中，他只会退出他所在的那个 for 循环语句，然后继续执行当前 for 循环外的 for 循环体中语句

```html
<script>
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (j == 3) {
        break // 每次执行到j==3时，就会退出当前for循环，继续执行当前for外的for循环
      }
      console.log(i + '-' + j)
    }
    console.log('j' + j) // break退出for时，会从这里开始执行下一次的外层for循环
  }
</script>
```

![image-20220911202703554](https://www.arryblog.com/assets/img/image-20220911202703554.10780a9a.png)

- break 用在 while 语句中，通常和`while(true){}`搭配使用

```js
// 寻找最小的满足 n^2 > 456789 的整数n
// 方法一
var n = 1
while (n * n <= 23450) {
  n++
}
console.log(n) //154

// 方法二
var n = 1
while (true) {
  if (n * n > 23450) {
    break
  }
  n++
}
// 输出：154
```

### 2、continue 语句

continue 用于**跳过循环中的一个迭代** ，并继续执行循环中的下一个迭代，for 循环更经常使用 continue

```js
for (var i = 0; i < 10; i++) {
  if (i == 5) {
    continue
  }
  console.log(i) // 0、1、2、4
}
```

- continue 在 for 嵌套中，也是跳过当前循环中的一个迭代，并继续执行循环中的下一个迭代

```html
<script>
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (j == 2) {
        continue
      }
      console.log(i + '-' + j)
    }
  }
</script>
```

![image-20220911202840093](https://www.arryblog.com/assets/img/image-20220911202840093.4b7edaa0.png)

### 3、label 语句

我们上面讲过，不管是 continue 还是 break，他最多能退出的也就是当前的 for 循环，如果我想退出最外层的 for 循环，那就可以借助这里的 label

> 在实际开发应用不多，了解即可

```text
label: statement
```

- label 表示标签名，这个名字是可以自定义的标识符
- statement 表示代码块
- label 标签名和 statement 代码块之间使用英文状态下的冒号分隔
- label 标签一般都是与 for 循环语句等循环语句配合使用,同时是由 break 和 continue 语句引用的。

#### label 标签与 continue 语句结合

两者结合

表示退出到 label 标记位置，继续从 label 标签标识的 for 循环开如执行下一次循环

```js
// outer就是label标签，用来标识第一个for循环语句，其名字outer可以自定义，不一定是outer
outer: for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    if (j == 2) {
      continue outer
    }
    console.log(i + '-' + j)
  }
  console.log('j' + j) // continue outer退出时，不会执行这个代码
}
```

![image-20220911203813270](https://www.arryblog.com/assets/img/image-20220911203813270.e27bf189.png)

> 这里要特别注意区分和 break 的区别，break 是退出当前 for 循环，会从 for 循环的外层循环语句体开始执行

```js
// outer就是label标签，用来标识第一个for循环语句，其名字outer可以自定义，不一定是outer
for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    if (j == 2) {
      break
    }
    console.log(i + '-' + j)
  }
  console.log('j' + j) // break退出后，会执行这个代码
}
```

![image-20220911203843314](https://www.arryblog.com/assets/img/image-20220911203843314.f2095fca.png)

#### label 标签与 break 语句结合

两者结合

表示立即退出到 label 标签标识后的 for 循环，不再执行

```js
// outer就是label标签，其名字可以自定义，不一定是outer
outer: for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    if (j == 2) {
      break outer
    }
    console.log(i + '-' + j)
  }
  console.log('j' + j) // 永远不会执行
}
```

![image-20220910231242186](https://www.arryblog.com/assets/img/image-20220910231242186.b7c2c058.png)

### 4、关于 break、continue、label 语句总结

| 语句     | 描述                                                                                                                                                                |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| break    | break 语句用于立即**退出当前循环**，他只能用在循环语句中，如 for 循环和 while 循环中都可以                                                                          |
| continue | continue 用于**跳过循环中的一个迭代** ，并继续执行循环中的下一个迭代                                                                                                |
| label    | 与 break 配合：表示立即退出到 label 标签标识后的 for 循环，不再执行 与 continue 配合：表示退出到 label 标记位置，继续从 label 标签标识的 for 循环开始执行下一次循环 |

## 八、循环语句总结

| 循环类型          | 语法                                            | 使用场景                                                                                  |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------- |
| for 循环          | for(语句 1; 语句 2; 语句 3) { 被执行的代码块; } | 循环次数是固定的,知道明确的循环范围                                                       |
| while 循环        | while(条件){ 需要执行的代码; 变量变化语句; }    | 循环次数不定,更适合根据结果，找条件                                                       |
| do ... while 循环 | do { 需要执行的代码; } while(条件)              | 先运行一次代码，如果不符合条件再重做，符合就不做了。 其不满足条件，是在事情做完后产生的。 |

## 九、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点内容

#### ①、JavaScript 中的流程控制语句有哪些 ？

- **分支结构语句**
  - if 语句
  - switch 语句
- **循环结构的语句**
  - for 语句
  - while 语句
  - do while 语句
- **其它语句**
  - break 退出当前循环
  - continue 跳过当前迭代，继续执行下一个迭代
  - label 给语句加标签，常合 for 嵌套循环一起使用

#### ②、if 多分支语句的执行机理，for 循环的执行机理

> if 执行机理

![ifelse](https://www.arryblog.com/assets/img/ifelse.9b822e5d.png)

> for 环循还执行机理

![for环循还执行机理](https://www.arryblog.com/assets/img/for20221.9808a567.png)

#### ③、for 和 while、do while 循环各有什么应用场景 ？

| 循环语句      | 应用场景                                             |
| :------------ | :--------------------------------------------------- |
| for 循环      | for 循环次数是固定的,知道明确的循环范围              |
| while 循环    | 循环次数不定,更适合根据结果，找条件                  |
| do while 循环 | 先运行一次代码，如果不符合条件再重做，符合就不做了。 |

#### ④、for 循环打印图形规律 ？

- 外层 for 循环控制行
- 内层 for 循环控制列

#### ⑤、break、continue、label 的用法

| 语句     | 描述                                                                                                                                                                |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| break    | break 语句用于立即**退出当前循环**，他只能用在循环语句中，如 for 循环和 while 循环中都可以                                                                          |
| continue | continue 用于**跳过循环中的一个迭代** ，并继续执行循环中的下一个迭代                                                                                                |
| label    | 与 break 配合：表示立即退出到 label 标签标识后的 for 循环，不再执行 与 continue 配合：表示退出到 label 标记位置，继续从 label 标签标识的 for 循环开始执行下一次循环 |

### 2、难点内容

- 1、for、while、do..while 的应用场景
- 2、for 循环的应用案例

## 十、作业

1、下面代码的运行结果是 ？

```js
var str = 'icoding123'
var num = parseInt(str)
if (num == NaN) {
  alert(NaN)
} else {
  alert(str)
}
var a = 1
var b = 0
var str1 = ''
var str2 = false
if (a || b || str1) {
  alert(a + b + str1)
}
if (a && b && !str2) {
  alert(!str2)
}
if (a && !str1 && !str2) {
  alert(!str1)
}
```

2、完整课程中讲到的所有案例

## 十一、算法

> 接下来，我们来学习算法，算法是大厂面试必考点 ！了解算法是非常非常有必要的。

首先我们来了解下什么是算法（Algorithm）？

> 这里我们从一个算法的小故事开始切入

有一个“熊孩子”，小时候非常淘气，一次数学课上，老师为了让他们安静下来，给他们列了一道很难的算式，让他们一个小时内算出`1+2+3+4+5+6+……+100`的得数。

> 作为我们正常的一般思维，我们会如何计算呢 ？我们会像下面这样来一步一步计算：

1+2=3
3+3=6
6+4=10
........

结果

这个“熊孩子”只用了 20 分钟就给出了答案，因为他想到了用`（1+100）+（2+99）+（3+98）……+（50+51）`……一共有`50`个`101`，所以`50×101`就是 1+2+3+...100 的总和。

这个“熊孩子”名叫 **高斯** ，后来著名的犹太数学家 **约翰·卡尔·弗里德里希·高斯**，后来人们把这种简便算法称作 **高斯算法**。

> 这是数学领域中算法的一个简单示例。

### 1、到底什么是算法 ？

- 在数学领域中，算法是用来解决某一类问题的公式和思想。
- 而在计算机科学领域中，它本质是一系列程序指令，用来解决特定的**运算**和**逻辑问题**。
- 在计算机中，算法就是把一个问题，拆解为**计算机能够一步一步执行的步骤**

**衡量算法的好坏：**

> 算法有简单的也有复杂的，衡量算法的好环有以下几个指标

- 时间复杂度：代码运行得到结果所花的时间
- 空间复杂度： 代码运行是所占用的内存空间大小
- 正确性（经得起时间、规模、大范围应用也不会出错）
- 健壮性：是指一个计算机系统在执行过程中处理错误,以及算法在遭遇输入、运算等异常时继续正常运行的能力
- 可读性

**计算机的优势**

- 计算机最突出的能力就是计算，它没有归纳总结、逻辑推理的能力。
- 所以人们使用计算机解决问题的时候，要"扬长避短"
- 充分发挥计算机的计算优势，而不要让它进行逻辑推理

但并不意味着，我们就可以完全不考虑计算机在计算一个算法时所需要耗费的时间和占用的内存。相同的结果，肯定是耗时越小，占用的内存空间越小越好了。

所以我们在写算法时，需要考虑算法的复杂度，那什么是算法的复杂度呢 ？我们暂时不学习，我们先做几道算法题，找找感觉，然后再下下节课，我们来重点学习算法的复杂度。

### 2、累加器

由用户输入数字 n，请计算下面算式的值

\+ + + ...... +

首先我们来找规律：

- 第一项是分母是从 2 开始的，每一项分子比分母大 1
- 所以在 for 循环，遍历时，只需要遍历分母就好，分母为 i ，分子为 i+1

```js
// 由用户输入数字n,计算 3/2 + 4/3 + 5/4 + ... + (n+1)/n 的结果

// 用户输入数字n
var n = Number(prompt('请输入数字n'))

// 累加器
var sum = 0
// 遍历分母就可以了，因为分子就是分母加1有关系
for (var i = 2; i <= n; i++) {
  sum += (i + 1) / i // 每一项值 i+1/i
}
// 输出累加结果
alert(sum.toFixed(2)) // 这里要特别注意小数的处理
```

### 3、累乘器

由用户输入数字 n，请计算 n 的阶乘

```js
5的阶乘 = 5 * 4 * 3 * 2 * 1
// 计算阶乘

// 用户输入数字n
var n = Number(prompt("请输入数字"));

// 累成器，一定要注意，累成器要从1开始，因为如果从0开始，0乘以任何数子都是0
var result = 1;

// 倒着遍历，计算阶乘
for (var i = n; i >= 1; i--) {
  result *= i;
}

// 显示结果
alert(result);
```

### 4、累加器与累乘器的结合

大厂经典面试真题

圆周率 π 可以由下面的`莱布尼茨级数`公式计算出来，请由用户输入参数 n，计算圆周率 π

π

- 通过上面公式，得到圆周率 `π = 2 * (1 + 1/3 + (1*2)/(3*5) + (1*2*3)/(3*5*7) + (1*2*3*4)/(3*5*7*9)) + (1*2* ... *n)/(3*5*...*(2n+1));`
- 第一步：找规律 ，除去第 1 项，每一项都等于`前一项 * n/(n*2+1)`
- 这里需要用到累乘器来计算出每一项的值
- 然后利用累加器，把每一项加起来

```js
// 累加器，就是最后的答案
var sum = 0
// 累乘器，用来制作每一项，制作出来的这个项，要往累加器中累加
var item = 1

// 让用户输入n
var n = Number(prompt('请输入数字n'))

// 遍历
for (var i = 1; i <= n; i++) {
  // 要先制作项目
  item *= i / (2 * i + 1)
  console.log(item)
  // 把每一项往累加器中累加
  sum += item
}

// 显示结果
alert((1 + sum) * 2)
```

注意：

算法题最难的点在于找到背后的规律，和相关的一些通用处理算法的技巧。

### 5、穷举法

穷举法是什么 ？

穷举法的基本思想是根据题目的部分条件确定答案的大致范围，并在此范围内对所有的情况逐一验证，直到全部情况验证完毕。

- 若某个情况验证符合题目的全部条件，则为本问题的一个解
- 若全部情况验证后都不符合题目的全部条件，则本题无解。
- 穷举法也称为**枚举法**。

穷举法是一种算法思想，把在条件范围内的所有情况都逐一验证一遍。

### 6、穷举法应用：寻找能被整除的数

算法题目：

寻找 100 以内的既能被 3 整除，也能被 5 整除的数字

- 如果让人类来计算，人类会找规律或公式,如下

![image-20211219195336969](data:image/png;base64,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)

- 如果计算机来做：如下

> 计算机不会找规律 和逻辑推理，他最大的优势就是强大的计算能力

![image-20211219200006028](https://www.arryblog.com/assets/img/image-20211219200006028.6cf361e1.png)

```js
// 寻找100以内的既能被3整除，也能被5整除的数字
// 穷举法，从1开始实验
for (var i = 1; i <= 100; i++) {
  if (i % 3 == 0 && i % 5 == 0) {
    console.log(i) // 15、30、45、60、75、90
  }
}
```

### 7、穷举法应用：寻找约数

算法题目：

用户输入一个数字，在控制台显示这个数字的全部约数

```js
// 什么是约数：举例如下

48的约数 ： 1、2、3、4、6、8、12、16、24、48

// 这些数字都是能够整除48的
// 或者说 让48除以这些数字，余数都是0
// 寻找约数

// 用户输入数字 n
var n = Number(prompt("请输入数字"));

// 穷举法 从1开始验证
for (var i = 1; i <= n; i++) {
  if (n % i == 0) {
    console.log(i);
  }
}
```

### 8、穷举法应用：寻找符合条件的数字

算法题目：

请问 1~100 中哪个数字除以 3 余 1，除以 4 余 2，除以 5 余 3 ？

```js
// 寻找1~100的符合条件的数字：除以3余1，除以4余2，除以5余3
// 使用穷举法
for (var i = 1; i <= 100; i++) {
  if (i % 3 == 1 && i % 4 == 2 && i % 5 == 3) {
    console.log(i) // 58
  }
}
```

![image-20211218170650143](https://www.arryblog.com/assets/img/image-20211218170650143.0781a794.png)

### 9、穷举法应用：求水仙花数

算法题目：

请输入一个三位数，判断这个数是不是水仙花数

什么是水仙花数 ？

- 如果一个数是水仙花数，那么这个数的个位 3 次方`+`十位数的 3 次方`+`百位数的 3 次方=这个数本身
- 如 153 ,其中 13 + 53 + 33=153 ，这里的 153 就是水仙花数
- 如 154，其中 13 + 53 + 43 = 190，所以这里的 154 不是水仙花数

**代码实现思路：**

利用穷举法，把 100 到 999 之内的所有数字都验证一遍。（要求是一个三位数）

**将一个 3 位数，拆成个位、十位、百位**

![image-20211217203754752](data:image/png;base64,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)

实现方式有两种方法：

**数学方法**

- 百位/100 取整
- 十位/10 取整
- 个位%10 求模

**字符串方法**

- 利用 charAt()方法找到是应的个，十，百位
- charAt()方法返回指定索引位置的 char 值
- str.charAt(index); str 要检索的字符串，index 查找的索引，字符串中第一个字符下标是 0，index 为正整数

```html
<script>
  var n = Number(prompt('请输入一个3位数的整数'))
  if (!isNaN(n) && n >= 100 && n <= 999 && n.length == 3) {
    var a = parseInt(n / 100)
    var b = parseInt(n / 10) % 10
    var c = n % 10
    if (a * a * a + b * b * b + c * c * c == n) {
      alert(n + '是水仙花数')
    } else {
      alert(n + '不是水仙花数')
    }
  } else {
    alert('你输入的数字不合法！')
  }
</script>
<script>
  var n = prompt('请输入一个3位数的整数')
  if (!isNaN(n) && n >= 100 && n <= 999 && n.length == 3) {
    var a = n.charAt(0)
    var b = n.charAt(1)
    var c = n.charAt(2)

    if (a * a * a + b * b * b + c * c * c == n) {
      alert(n + '是水仙花数')
    } else {
      alert(n + '不是水仙花数')
    }
  } else {
    alert('你输入的数字不合法！')
  }
</script>
```

### 10、穷举法应用：寻找质数

算法题目：

请寻找 1 ~ 100 的所有质数

- 质数：只能被 1 和它本身整除的数字，最小的质数是 2
- 比如：2、3、5、7、11、13、17、19、23、29 ......

```js
// 寻找100以内的质数

// 穷举法
outer: for (var i = 2; i <= 100; i++) {
  // 内层循环开始从2开始到小于这个数字的每一个数字都尝试除i,如果能够整除，说明它不是质数，就可以筛选下一个数字了
  for (var j = 2; j < i; j++) {
    if (i % j == 0) {
      // 说明数字 i不是质数，因为它找到了除1和它自身之外的约数了
      // continue表示放弃这个数字，开始迭代下个数字，continue它负责的是它所在的最内层的for循环
      // 要给for循环加上label,然后在continue的后面加上这个label
      // 这样就表示立即开始迭代外层for循环的下一个数字了，而不是内层for循环
      continue outer
    }
  }

  // 能够遇见这条语句的数字i,一定是质数，否则就被continue略过了
  console.log(i)
}
```

### 11、穷举法应用：鸡兔同笼

中国古代的数学著作《孙子算经》中记载了这样的一道题：

“今有雉兔同笼，上有三十五头，下有九十四足，问雉兔各几何 ？”

> 这四句的意思就是：
>
> 有一些鸡和兔子在同一个笼子里，从上面看有 35 个头；从下面看有 94 条腿．请求出笼中的鸡和兔子各有几只？

![image-20211219233402701](https://www.arryblog.com/assets/img/image-20211219233402701.c9f13dd3.png)

数学方法解题思路：

- 鸡和兔子各有一个头：a + b = 35
- 鸡有 2 只脚，兔子有 4 只脚：2a + 4b = 94

![image-20211219234905428](data:image/png;base64,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)

> 计算所得： a = 23 ；b = 12；

```js
// 鸡兔同笼

// 方法1：
// 假设小鸡有a只，兔子有b只
for (var a = 0; a <= 35; a++) {
  for (var b = 0; b <= 35; b++) {
    if (a + b == 35 && 2 * a + 4 * b == 94) {
      console.log('小鸡有：' + a + '只，兔子有：' + b + '只。') // 小鸡有：23只，兔子有：12只。
    }
  }
}

// 方法2：优化算法（减少for循环的次数）
for (var a = 0; a <= 35; a++) {
  var b = 35 - a
  if (2 * a + 4 * b == 94) {
    console.log('小鸡有：' + a + '只，兔子有：' + b + '只。') // 小鸡有：23只，兔子有：12只。
  }
}
```

### 12、算法如何学习 ？

在早期，我们学算法，学数据结构，最重要的是学基本功，只有把基本功学好了，算法的基本功就是算法的复杂度和数据结构。然后

- 多敲、多练、多总结
- 经典的业务需求场景要熟记，多实践
- 多寻找算法题，进行练习
- 有了一定基础后，[推荐在力扣上刷算法题 (opens new window)](https://leetcode.cn/problemset/all/)👆
