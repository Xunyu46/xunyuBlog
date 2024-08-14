# JavaScript 简介、核心语法、变量



我们都知道，HTML、CSS、JavaScript 是前端开发的主要三门语言

![web](https://www.arryblog.com/assets/img/web.117c61c5.png)

在之前的 30 天课程中

我们系统的学习过 HTML 和 CSS，想必大家对 HTML 和 CSS 已经非常熟系统。

从今天开始，我们就开始系统的学习 JavaScript 这门编程语言。首先我们从 JavaScript 是什么开始聊起 !

## 一、JavaScript 简介



JavaScript 是用来做什么的 ？要解决这个问题 ，我们需要先来了解下 HTML+CSS+JavaScript 三者之间的关系。

### 1、HTML、CSS、JavaScript 三者之间的关系



HTML+CSS+JavaScript 是前端开发的主要 3 门语言。

- 他们之间如何分工 ？
- 各自有什么样的作用 ？

HTML，CSS，JavaScript 分别被称为前端的三层，具体如下表

| 前端三层 | 语言       | 功能                               | 类比 1         | 类比 2         |
| :------- | :--------- | :--------------------------------- | :------------- | :------------- |
| 结构层   | HTML       | 搭建结合、放置部件、描述语义       | 房子的框架     | 人的骨架       |
| 样式层   | CSS        | 美化页面、实现布局                 | 对房子装修     | 给人打扮、化妆 |
| 行为层   | JavaScript | 实现交互效果、数据收发、表单验证等 | 房子通水、通电 | 人的各种行为   |



- 交互效果：比如网站看到的鼠标滑动显示的下拉菜单、轮播图、选项卡等网页特效
- 数据收发：网站页面的数据，都是能过 ajax 向后台发送请求，然后后台把数据返回给到前端，我们再把数据渲染到页面中。
- 表单验证：当我们提交一个注册表单时，会验证我们输入的邮箱、手机、密码等格式是否符合要求，这些都是通过 JS 来验证的。

> 当然 JS 能做的事情非常多，而且也非常强大，远不至上面提到的这些，那接下来就让我们一起来走进 JS 的大门吧！我们先从 JavaScript 这门编程语言的发展史开始说起

### 2、JavaScript 发展史


![brendan-eich](https://www.arryblog.com/assets/img/brendan-eich.08205858.jpg)

> 布兰登.艾奇 (Brendan Eich) JavaScript 创始人， 人称 JS 之父

JavaScript 创建背景

1995 年 34 岁的系统程序员 Brendan Eich，任职于网景公司（Netscape ，美国一家专注浏览器的公司）

> 网景公司当时急需要开发一款客户端脚本语言来处理用户在浏览器端的表单输入验证。当时的上网速度很慢，为了验证简单的表单需要大量的与服务器端往返通信，不管是用户端还是服务端体验都非常差。于时 JavaScript 脚本语言的开发就提上了日程

- JavaScript 当时开发的目的，处理用户在浏览器端的输入验证（常说的表单验证）
- 布兰登.艾奇，仅用 10 天时间就把 JavaScript 设计出来了 😃
- JavaScript 的前身叫`LiveScript`，后面改名为`JavaScript`。

> LiveScript 为什么要改名为 JavaScript，本质上是为了傍大款，当时 Java 是非常有名的编程语言，看上他的品牌效应。

**Java 与 JavaScript 的关系 ？**

本质上是没有任何关系，就好像老婆与老婆饼的关系，雷锋与雷峰塔的关系。

**JavaScript 的早期设计思路**

- 借鉴 C 语言的基本语法
- 借鉴 Java 语言的数据类型和内存管理
- 借鉴 Scheme 语言，将函数提升到"第一等公民"(first class)的地位
- 借鉴 Self 语言，使用基于原型(prototype)的继承机制

> 所以，JavaScript 语言实际上是两种语言风格的混合产物 -（简化的）函数式编程 +（简化的）面向对象编程
>
> 这是由 Brendan Eich（函数式编程）与网景公司（面向对象编程）共同决定的

**Brendan Eich 在介绍自己的作品 JavaScript 时说：**

> "与其说我爱 JavaScript，不如说我恨它。它是 C 语言和 Self 语言一夜情的产物 😇
>
> 十八世纪英国文学家约翰逊博士说得好：**'它的优秀之处并非原创，它的原创之处并不优秀。**'

Brendan Eich 创业经历

> 如果想要对 JavaScript 创始人有更多了解，[可参考这里(opens new window)](https://baike.baidu.com/item/布兰登·艾奇/58101949?fromtitle=Brendan Eich&fromid=561441)

- 1998 年布兰登协助成立 Mozilla
- 2003 年在美国在线决定结束网景浏览器的开发后，布兰登协助成立了 Mozilla 基金会（Mozilla Firefox，中文俗称“火狐”，是一个由 Mozilla 开发的自由及开放源代码的网页浏览器）
- 2015 年 5 月 28 日，艾克成立 Brave 软件公司，这是一家互联网安全公司。
- 2016 年 1 月 20 日，该公司发布了 Brave 网页浏览器

Brave 官网介绍：[https://brave.com/zh/about/(opens new window)](https://brave.com/zh/about/)

![image-20211210211939227](https://www.arryblog.com/assets/img/image-20211210211939227.8d480a6a.png)

### 3、JavaScript 的地位



- JavaScript 垄断了浏览器端脚本语言，绝对唯一的霸主

> 在这之前其实有三种脚本语言 `VBScript` 、`JScrip`、`JavaScript` 。随着时间的推移，有两种被淘汰了，只剩下 JavaScript

- 任何做浏览器端开发的工程师都不可能绕开 JavaScript
- js 现在能做什么？
  - 表单动态校验（密码强度检测）js 产生的最初目的
  - 网页特效
  - 服务端开发 Node.js (Node.js 是 JS 的一个运行平台）
  - 桌面程序（Electron)
  - APP（Cordova)
  - 游戏开发（cocos2d-js)

> 我们都知道 JS 是前端开发语言，现在又说他可以做服务端开发，那什么是前端 ？什么是后端（服务端）以及为什么现在 JS 又可以做服务端开发了？

### 4、前端 与 后端

如何理解前端（客户端）

- 所谓前端（客户端），其本质就是直接面向用户的那一端。
- 前端主要是用来：处理界面，交互逻辑，用户能看见的东西，是我们前端开发要解决的问题
- 前端开发的主要编程语言：HTML、CSS、JavaScript

![qd](https://www.arryblog.com/assets/img/qd.f9f93105.jpg)

前端的不同终端

如何理解后端（服务端）

- 后端主要是用来：操作数据库，实现数据的增删改查，处理数据。
- 后端开发主要的编程语言：Java、Python、PHP、C/C++、GO
- 前端和后端通过 HTTP 协议进行传输

![img](https://www.arryblog.com/assets/img/1649501733(1).1cdac8ff.jpg)

JavaScript 是一种前端开发语言，为什么他现在可以做服务端开发 ？

在 2009 年，JavaScript 诞生了一个著名的平台 NodeJS。NodeJS 就是 JavaScript 的一个运行平台，NodeJS 的诞生，让 JS 的触角延伸到了服务器端。 也就是说随着 NodeJS 的诞生，JS 也可以操作数据库了，也就可以做服务端开发。

- Node.js （让 JavaScript 可以运行到服务器端）是真正可以称得上是能上天入地的语言
- 能上天入地，是指他不仅能做前端，也能做后端开发，这就是现在我们提到的全栈开发工程师，前端后端都可以搞定。
- 前端开发即能完成 PC 端 web 开发、移动 web 开发、APP 开发、小程序开发、服务端开发等等

**国内前端开发的变革**

- 2016 年前后，前端开发突然迎来了技术井喷期，开发形式突然发生了彻底的变化
- nodejs 突然火了，2009 年诞生，2015 到 2016 左右在国内就火起来了，node 火了之后带来了连锁反应
- 2016 年前后，以 webpack 为代表的 Node.js 工作流工具使前端开发的开发形式产生了翻天覆地的变化

并且，随着 React / Vue 的诞生，使前端开发进入了框架时代

### 5、ECMAScript 与 JavaScript 的关系



1996 年 11 月，网景公司将 JavaScript 提交给**欧洲计算机制造商协会**（ECMA）进行标准化。

1997 年，**欧洲计算机制造商协会**（ECMA）设置了 JavaScript 的标准，命名为 `ECMAScript`

**JavaScript 有 ECMAScript 的关系**

- JavaScript 是语言，ECMAScript 是标准
- JavaScript 实现了 ECMAScript 标准，而 ECMAScript 标准规范了 JavaScript

![img](data:image/png;base64,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)

为了让大家更好的理解，我举了下面这个例子：

比如你现在要研发一款感冒药，但是国家对感冒药是有明确规定的，比如规定中写明价格不能超过多，不能有副作用，必需要配套详细的说明书等一系列的规定。

- 如果你研发的感冒药符合国家的规定和要求，那就说明你按照国家规定的标准，**实现了**一种新型感冒药的研发。
- 如果你开发的感冒药不符合国家的规定，就不能对外出售，那就说明国家的标准**规范了**感冒药的研发标准。

ECMAScript 最新标准官方地址：[https://tc39.es/ecma262/(opens new window)](https://tc39.es/ecma262/)

### 6、JavaScript 知识体系



接下来我们要学习的 JavaScript 知识体系，分为以下 3 个部分：

- 语言核心（ECMAScript5)
- DOM （Document Object Model）文档对象模型
- BOM （Browser Object Model）浏览器对象模型

#### 6.1、语言核心（ECMAScript5 ）



我们接下来要学习的 JS 语言核心，就是 ECMAScript5 中的标准，标准中规定了语言的

- 基本语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

> 学习完这个后，才会再学习后面的 ECMAScript6、7、8、9....13

- ES6 对应的是 ECMAScript2015( ES2015）改动最多，主要是让 JS 工程化，构建化，所以我们常把 ES6 之后的归到 ES6。
- 其它不同版本间的对应关系如下

> ES7（ES2016）、ES8（ES2017）、ES9（ES2018）、ES10（ES2019）、ES11（ES2020）、ES12（ES2021）、ES13（ES2022）

#### 6.2、DOM（Document Object Model）文档对象模型



DOM 将整个页面抽象为一组分层节点（DOM 树），开发者可以通过操作 DOM 树来随心所欲的控制网页的内容和结构和样式。

我们常见的网页特效，就是通过 JS 来操作 DOM 实现的

- Document 文档，表示的就是整个 HTML 网页文档
- Object 对象 ，表示将网页中的每一个部分都转换为一个对象
- Model 模型，表示对象之间的关系，这样方便我们获取对象。

> 我们来看下面这个 HTML 转换成一个简单的 HTML DOM 树形结构，如下图

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>text</title>
  </head>
  <body>
    <div>
      <div>text</div>
      <img src="" alt="" />
      <h3></h3>
    </div>
    <p></p>
  </body>
</html>
```

> - 橘黄色：表示元素节点
> - 粉色：表示文本节点
> - 紫色：属性节点

![dom](https://www.arryblog.com/assets/img/dom-16493959945942.681e4cae.png)

#### 6.3、BOM（Browser Object Model）浏览器对象模型



BOM 用于支持访问和操作浏览器的窗口，JS 通过操作 BOM，可以获取窗口的大小，窗口输入的地址，控制前进和后退，监听窗口大小的改变等

接下来很多同学关心的一个问题 ，JavaScript 好学吗？那接下来我们一起来了解下 JavaScript 的语言风格和特性。

### 7、JavaScript 为何称为脚本语言



在前面我们一直说，JavaScript 是一种运行在客户端的脚本语言（Script 是脚本的意思）。

#### 7.1、JS 为何称为脚本语言



所谓的脚本语言：是指不需要提前编译，运行的过程中边编译，边执行。

JS 本质上就是在运行过程中边编译，边执行的，JS 是由 JS 解释器（JS 引擎）来逐行进行解释并执行

#### 7.2、什么是 JS 解释器 ？



就需要我们了解浏览器的两大组成部分：**渲染引擎** 和 **JavaScript 引擎**

- 渲染引擎：用来解析 HTML 与 CSS，俗称内核，比如 chrome 浏览器的 blink，老板本的 webkit
- JS 引擎： 也称为 JS 解释器，用来读取网页中的 JavaScript 代码，对其处理后运行。比如 chrome 浏览器的 V8 引擎。

> 浏览器本身并不会执行 JS 代码，而是通过内置 JavaScript 引擎（解释器）来编译和执行 JS 代码。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言），然后由计算机去执行。

所以 JavaScript 语言归为脚本语言，边编译边执行。

### 8、JavaScript 的语言风格和特性



- JS 类似 C 语言的风格，简单好学，

```js
var i = 0;
for (var i = 0; i < 10; i++) {
  console.log(i);
}
```

- 弱语言类型，繁文缛节少

> - 定义变量时，不用区分变量类型，不管什么类型的变量，我们都可以 var 这个单词来定义
> - 但是在其它语言，比如 Java 中，我们定义不同类型的变量，要使用不同的单词（关键词）来定义

```js
// Js中变量定义
var a = 1;
var b = 1.68
var c = '艾编程'
var d = true

// Java中变量定义
int a = 1;
float b = 1.68;
String c = "艾编程";
boolean = true;
```

- 各种效果所见即所得，全程可视化，学习不枯燥，更有兴趣

> 总结一句话：JS 相比其它语言，更简单，更容易入门，更容易产生兴趣。

## 二、JavaScript 基础语法



在接下来的 JavaScript 基础语法中，我们会学到以下相关内容：

- Js 的三种书写位置
- Js 中的注释
- 书写 JS 时的注意事项
- Js 中常用输入和输出语句

### 1、JS 三种书写位置



JavaScript 有三种书写位置，分别行内式、内部式、外部 JS

#### 1.1、行内式



直接写在标签上，有点类似行内样式，这种写法基本不用，只做了解。

```html
<div onclick="alert('主人，你好');">点我</div>
<a href="JavaScript:;">禁止页面刷新</a>
```

#### 1.2、内部 JS



- JS 代码直接写在写在`<script>`标签内部
- `<script>`标签，可以写在`<head></head>`标签中，也可以写在`<body></body>`标签中
- `<script>`标签中的 type 属性表示将< script>< /script>之间的文本内容，在浏览器中要转换为 js 脚本执行，现在要以省略不写。

```html
<head>
  <!--完整写法-->
  <script type="text/JavaScript">
    alert("请问有什么吩咐！");
  </script>
</head>

<body>
  <!--省略type属性写法-->
  <script>
    alert("请问有什么吩咐！");
  </script>
</body>
```

#### 1.3、外部 JS



- 把 js 代码，单独保存在一个 js 文件中
- 通过`<script>`标签的 src 属性来加载 js 文件
- 过`<script>`标签可以写在 head 或 body 标签中

```html
<script src="js/demo.js"></script>
```

- 如果采用了外部 JS 的写法，则`<script>`标签中，不能再写 JS 代码，写了也不会生效

```html
<!--错误写法，如果src属性中引入了外部js文件，则<script>标签不能再写js代码-->
<script src="js/demo.js">
  alert('错误写法，弹窗不会弹出');
</script>
```

温馨提示 1

在实际的开发中，我们常用的就是外部 JS 这种写法，因为他有很多优点

**优点**：

- 结构彻底分离
- 多页面可以进行复用
- 后期好维护修改
- 浏览器可以根据特定的设置缓存所有外部 JS 文件，所以多个页面都用到同一个文件，那么这个文件只需要下载一次，页面加载速度更快。如果后续再打开网页，浏览器会直接从缓存中读取。

**唯一缺点：**

- 增加请求数（外部文件），但相对上面的优点，完全可以忽略不计。

> 提示：html 文件是不会被缓存的 !

**温馨提示 2**

- Javascrip 文件不能脱离 HTML 网页运行，只有在后面学到 Node.JS 时，JS 可以在 NodeJS 平台上独立运行。

### 2、JS 注释

对于程序开发人员最讨厌的两件事：

- 讨厌自己加注释
- 讨厌别人的代码不加注释

**添加注释的重要性：**

- 提高代码的可阅读性，方便自己阅读或他人阅读
- 增强代码的可维护性

> 注：注释在网页中是不显示的，只有自己能看到

**各大厂 JavaScript 注释规范**

- [京东 JavaScript 注释规范(opens new window)](https://guide.aotu.io/docs/js/language.html)
- [阿里巴巴 JavaScript 注释规范(opens new window)](https://github.com/airbnb/javascript#comments)
- [百度 JavaScript 注释规范(opens new window)](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md#user-content-24-注释)

#### 2.1、单行注释



- `// .....`需要注释的代码
- 在 vscode 中，鼠标放在当前代码上，按快捷键 `ctrl+ /` 就可以实现单行注释

```html
<script>
  // alert('主人，你好呀！');
</script>
```

#### 2.2、多行注释



- 需要注释的代码写要`/* */`两个`* *`之间

```html
<script>
  /*  
        alert('主人，你好呀！');
        alert('主人，你好呀！');
        alert('主人，你好呀！');  
    */
</script>
```

- 在 vscode 中，鼠标选中需要注释的代码，按快捷键 `Alt + shift + a` 就可以实现多行注释

> 如果我们想修改快捷键，我们可以在 vscode 最左下角的管理面板中的键盘快捷方式中修改

![image-20220906224421583](https://www.arryblog.com/assets/img/image-20220906224421583.acf0e7ce.png)

![image-20220906224737279](https://www.arryblog.com/assets/img/image-20220906224737279.91ad403f.png)

### 3、JavaScript 中的注意事项

> 严格区分大小写

```html
<script type="text/JavaScript">
  alert("弹窗内容1"); //正确写法
  Alert("弹窗内容2"); //错误写法
</script>
```

> 语句字符都要是英文状态下（字符串可以使用任意字符）

```html
<script type="text/JavaScript">
  //''单引号和;分号必需是英文状态下
  //()也要是英文状态下
  alert(’弹窗内容1‘);
</script>
```

每条语句以分号（;）结尾

- 如果不写分号，意味着由解析器来确定语句在哪里结尾。
- 加分号有助于在某些情况下提升性能，因为解析器会尝试在合适的位置补上分号以纠正语法错误
- 如果不加分号，在后期压缩代码时，有可能会造成语法错误
- 而且有些时候，浏览器会加错分号，所以在开发中分号必须写

> 早期刚开始学习，大家一定要养成加分号的习惯，日后完全熟练，可以不加。

```html
<script type="text/JavaScript">
  alert("弹窗内容1");
  alert("弹窗内容1");
</script>
```

**JS 中会忽略多个空格和换行**

```html
<script type="text/JavaScript">
  alert("弹窗         内容1");
</script>
<!-- 错误的理解 以下代码错误-->
<script type="text/JavaScript">
  alert

  (
    '
    弹窗内容1
    '
  )
</script>
```

> 以上内容，主要的用处，就是可以利用空格和换行，对代码进宪格式化，这样写出来的代码更美观

### 4、JS 中的输入输出语句



在后面的课程中，我们需要用到输入和输出语句来调试代码，所以本节课我们先来了解下 JS 中的输入输出语句。

为了方便信息的输入和输出，JS 中提供了一些输入和输出语句，最常见的语句如下

| 方法                          | 说明                           |
| :---------------------------- | :----------------------------- |
| alert('弹窗内容')             | 浏览器弹出警示框               |
| console.log('控制台输入内容') | 浏览器控制台打印输出信息       |
| prompt('提示用户输入信息')    | 浏览器弹出输入框，用户输入内容 |

#### 4.1、alert('弹窗')



- alert() 语句，会在页面打开时，弹出弹窗
- alert()语句，会阻止程序的执行，他会在此代码执行确认后，才会接着执行后面的代码
- 可以用来调式代码

```html
<script type="text/JavaScript">
  //先弹出弹窗，显示123,点击确认后，才会执行后面的弹窗，弹出hello
  alert(132);
  alert("hello");
</script>
```

注：

如果 alert 中输入的是数字，不用加引号，如果输入的是字符串，则要加上`''`单引号或`""`双引号包裹

后面的 console.log 和 prompt 语句同理。

#### 4.2、console.log('控制台输出内容')



- 他不会打断程序运行
- 常用来调试代码
- 常用来调试代码

```html
<script type="text/JavaScript">
  console.log(1);
  console.log("hello");
</script>
```

> 在打开页面的浏览器中，按 F12 或右击审查元素，就可以调出控制台面板

![image-20220906231016032](https://www.arryblog.com/assets/img/image-20220906231016032.a21c49a0.png)

> 可以一次打印多条内容，每条内容间用`,`逗号隔开

```html
<script type="text/JavaScript">
  console.log("主人，你好", 2, "我是大美人");
</script>
```

![image-20220906231152639](https://www.arryblog.com/assets/img/image-20220906231152639.53464356.png)

#### 4.3、prompt('提示用户输入信息')

```html
<script>
  prompt("请输入你的年龄");
</script>
```

## 三、JavaScript 变量与字面量



在接下来的 JavaScript 变量与字面量中，我们会学到以下相关内容：

- 了解计算机中硬盘、内存、CUP 三者关系
- 什么是变量
- 如何声明变量
- 变量的初始化
- 更新变量的值
- 同时声明多个变量
- 声明变量的几种特殊情况
- JS 变量相关测试题 和案例
- JS 中字面量的概念
- 处理报错
- REPL 环境

### 1、硬盘、内存、CPU 三者关系



在之后的 JS 课程中，一直会提到**内存**这个概念，所以我们在学习变量之前，先来了解下内存。

为了更好的理解内存，我们从硬盘、内存、CPU 三者的关系和作用开始说起。

#### 1.1 、硬盘，内存，CPU 三者各自的作用

| 名称 | 照片                                                                                                 | 作用                                                                                                                                                                     |
| :--- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 硬盘 | ![image-20220907111712617](https://www.arryblog.com/assets/img/image-20220907111712617.be93341f.png) | 负责程序和数据的`永久`存储 断电数据不丢失的特点                                                                                                                          |
| 内存 | ![image-20220907111915378](https://www.arryblog.com/assets/img/image-20220907111915378.82e355fe.png) | 负责连接`CPU`和`硬盘` 存储`临时`使用的数据 - 保存从硬盘读取的数据，提供给 CPU 使用 - 保存 CPU 的一些临时执行结果，以便 CPU 下次使用或保存到硬盘 断电数据就会`清空，丢失` |
| CPU  | ![image-20220907111921565](https://www.arryblog.com/assets/img/image-20220907111921565.97285fbf.png) | 运行总指挥，负责发指令，数据处理与计算                                                                                                                                   |

#### 1.2 、他们三者之间如何工作的



当我们运行程序 A 的时候，CPU 首先接受到我们的命令，之后 CPU 是告诉硬盘，我要运行你存储的程序 A，你把程序 A 送到内存去。CPU 对内存说，我让硬盘把程序 A 送到你这里来了，你保存一下。

等程序 A 被完整的送到内存之后。CPU 就开始执行程序 A。在接下来的过程 中，内存还要保存 CPU 的一些临时执行结果，以便 CPU 下次使用或保存到硬盘

![image-20220412135339830](https://www.arryblog.com/assets/img/image-20220412135339830.ad2a4fe8.png)

#### 1.3、CPU 可以直接从硬盘中读取数据，为什么要在中间加一个内存呢？



是因为 CPU 的处理速度特别的快（相当于飞机），而硬盘的读取和存储数据的速度特别的慢（相当于电动车）。如果直接从硬盘读数据，而硬盘的速度跟上不 CPU 的速度，就会对 CPU 造成很大的浪费，同时我们操作电脑时，就会很卡。而内存的数据就很快了，他可以跟上 CPU 的处理速度。

如果直接从硬盘取数据，cpu 计算后存储到硬盘中，cpu 计算速度很快（相当于飞机），硬盘速度很慢（相当于电动车）。硬盘读取、存储数据很慢，跟不上 cpu 的速度。即使是现在的 ssd 固态硬盘，速度在 200-600MB/S，cpu 的计算速度在 20G/S，中间相差约 100 倍。

我们平时打开一个 word 文档，刚打开时的时候很慢，等待时间长。这个打开操作的等待时间，其实就是从硬盘读取数据到内存的过程。然后我们操作文档时，就很快，没有卡顿和等待，这些都是 CPU 直接从内存中读取数据，同时把处理的临时数据存储到内存条，以供后面使用。到时后操作完成再保存时，又比较慢，这个时候就是从内存存储到硬盘，时间又比较长了

内存就是为了解决 cpu 和硬盘之间速度不匹配的冲突，内存是由电流实现的存取速度，相当快，不过断电就丢失。

#### 1.4、总结

| 名称     | 作用                                                            | 速度                    | 类比   |
| :------- | :-------------------------------------------------------------- | :---------------------- | :----- |
| **硬盘** | 负责程序和数据的`永久`存储 断电数据不丢失的特点                 | 很慢                    | 大仓库 |
| **内存** | 负责连接 CPU 和硬盘 存储`临时`使用的数据 断电数据就会清空，丢失 | 很快，几乎硬盘的 100 倍 | 中转站 |
| **CPU**  | 运行总指挥，负责发指令，数据处理与计算                          | 很快，几乎硬盘的 100 倍 | 车间   |

如果需要用现实生活中的例子，来类比的话：

- **硬盘（大仓库**）：用来保存车间需要用的原料和最终生产出来的商品。仓库太大，取出原料和存储商品太慢，耗时间。
- **内存（临时中转站）**：原料会先放到这里，在这里，可以很快的找到需要的原料或商品。
- **CPU（车间）**：从内存（中转站）里拿到原料，生产商品。中间会有半成品，半成品可以放在内存（小仓库）里。

> CPU，内存 决定你电脑运行的快慢，**硬盘**决定你可以放东西的多少 ！

### 2、什么是变量



**大白话**：变量就是一个用来装东西的盒子，再往深里说，他就是用来存放数据的容器。

下图中，a 就是变量（容器），8 是值，存入到变量（容器）中

![image-20211211194901991](https://www.arryblog.com/assets/img/image-20211211194901991.08a1d260.png)

> **变量的本质：** 变量是程序在**内存**中申请的一块用来存放数据的空间。

![image-20220412230049293](https://www.arryblog.com/assets/img/image-20220412230049293.bf3980b2.png)

> - 上图中，相当于我们在**内存**中申请了两块空间，同时存入了数据 小明和 25,那么我们要读取存入的数据，我们就要为这块空间取个名字
> - 上图中的，a，b 分别这两块空间的名字，我们称他为变量 a 和变量 b;

### 3、如何声明变量

- 在 js 中，使用 var 关键词来声明一个变量

```js
// 声明一个变量 a ,
var a;
```

- a 是自定义的变量名
- 使用 var 关键字声明变量后，计算机会自动为变量分配内存空间，用来存储变量的值
- 变量声明后，就可以给变量赋值，`=` 等号表示赋值

```js
// 为变量a赋值，把字符串小明存入到变量a中。
a = "小明";
```

- 通过变量名就可以访问变量在内存中存储的值。
- 赋值后我们就可以使用他了，我们可以在控制台通过输出语句输出变量 a 的值

```js
// 控制台输入变量a的值
console.log(a);
```

> 从声明变量，到赋值，到控制台输出变量，整个代码完整写法如下：

```html
<script>
  // 使用var关键字，声明一个变量 a
  var a;
  // 为变量a赋值，把字符串小明存入到变量a中。
  a = "小明";
  // 控制台输入变量a的值
  console.log(a);
</script>
```

### 4、变量的初始化



我们在声明一个变量的同时为其赋值，称为变量的初始化。

```html
<script>
  // 这就叫变量的初始化
  var name = "张三";
  // 在控制台输出变量a的值
  console.log(name);
</script>
```

### 5、更新变量的值



一个变量被重新赋值后，他之前的值就会被覆盖

```html
<script>
  var name = "张三";
  // 给变量name 重新赋值
  name = "李四";
  console.log(name);
</script>
```

### 6、同时声明多个变量



同时声明多个变量，每个变量之间用`,逗号`隔开

- 先声明后赋值

```html
<script>
  // 一次性声明了 x,y,z三个变量
  var x, y, z;
  // 为变量x赋值 1
  x = 1;
  // 为变量y赋值 2
  y = 2;
  // 为变量z赋值 3
  z = 3;
  // 在控制台输出变量x,y,z
  console.log(x, y, z);
</script>
```

- 声明的同时赋值

```html
<script>
  // 声明变量，x,y,z的同时，为变量赋值，这个过程叫变量的初始化。
  var x = 1,
    y = 2,
    z = 3;
  // 在控制台输出变量x,y,z
  console.log(x, y, z);
</script>
```

- 声明过程可赋值，可不赋值

```html
<script>
  var x,
    y = 1,
    z = 4;
  x = 2;
  console.log(x, y, z);
</script>
```

### 7、声明变量的几种特殊情况



声明变量，但没有赋值，默认值为 undefined

```html
<script>
  // 声明变量 x，但没有给他赋初始值
  var x;
  // 得到的结果是undefined
  console.log(x);
</script>
```

提示：

我们后期如果要判断一个变量是否成功赋值，我们就可以通过检测他的值是否是 undefined 来判断

- 不声明变量,直接进行赋值

```html
<script>
  x = 7;
  // 控制台输出得到的结果是 7
  console.log(x);
</script>
```

> 这是 js 的一个语法特性，只需要了解就好，在实际开发中非常不推建这样写。

- 直接输出一个不存在的变量

```html
<script>
  // 控制台会报错 z is not defined
  console.log(z);
</script>
```

> 所以我们在使用一个变量前，一定要先声明变量。

### 8、变量的命名（标识符）



当我们用 var 关键字声明一个变量时，这个变量的名字，我们能随便取吗？答案是否定的，变量的命名必需要遵守一定的规则。

> 在讲解变量的命名前，我们先来了解一个概念**标识符**

**标识符：\**在 js 中所有可以由我们\**自主命名**的都可以称为标识符。

> 例如：变量名，函数名，属性名、类名等都属于标识符。
>
> 所以接下来讲的标识符命名规则，本质上就是变量的命名规则。

```html
<script>
  // 变量名a 就是标识符
  var a = 1;
  // 函数名show 就是标识符
  function show() {
    alert("我是函数中的内容");
  }
  // 对象名obj 就是标识符
  var obj = {
    name: "张三",
    age: 23,
  };
</script>
```

#### 8.1、标识符的命名规则

- 只能有字母，数字，_下划线，$组成，但不能以数字开头

```js
  // 合法命名
  abc   a_b    a1   $a
  // 非法命名
  8a    abc#123   this   a-b
合法命名：userName , item1 ,a_b, _index, $1 非法命名： 8a ,abc#1 ,￥1 a-b ,
ibc@123
```

- 严格区分大小写，a 和 A 是两个不同的变量

```html
<script type="text/JavaScript">
  var A;
  A = 2021;
  // 控制台输出 2021
  console.log(A);
  // 会报错，因为a没有被声明过
  console.log(a);
</script>
<script>
  var a = 1;
  var A = 3;
  // 控制台输出 1 3
  console.log(a, A);
</script>
```

- 不能使用`关键字`或`保留字`做为变量名

#### 8.2 、关键字和保留字

关键字

所谓关键字就是 JavaScript 语言本身已经使用的一些单词。这些单词具有特定的用途，用户自定义的标识符（名字）不能与关键字相同 。

**保留字**

所谓保留字就是 JavaScript 语本身没有使用，但是考虑后期随之着 JS 的发展，可能会使用的一些单词。这些单词建议用户不要使用。

**以下是部分关键字和保留字**

| abstract | arguments | boolean    | break     | byte         |
| :------- | :-------- | :--------- | :-------- | :----------- |
| case     | catch     | char       | class*    | const        |
| continue | debugger  | default    | delete    | do           |
| double   | else      | enum*      | eval      | export*      |
| extends* | false     | final      | finally   | float        |
| for      | function  | goto       | if        | implements   |
| import*  | in        | instanceof | int       | interface    |
| let      | long      | native     | new       | null         |
| package  | private   | protected  | public    | return       |
| short    | static    | super*     | switch    | synchronized |
| this     | throw     | throws     | transient | true         |
| try      | typeof    | var        | void      | volatile     |
| while    | with      | yield      | eval      | arguments    |

#### 8.3 总结

![image-20220414152153831](https://www.arryblog.com/assets/img/image-20220414152153831.56465e73.png)

### 9、推荐两种优秀的命名法



在遵顺标识符命名规则的基础上，这里推荐两种在实际开发中常用的标识符命名法。

#### 9.1、驼峰命名



首个单词小写，其余每个单词开头字母大写

```js
myFirstName 、myStudentCount 、getBoxColor、navList
```

> 不建议使用全小写 myfirstname

#### 9.2、C 语言风格



所有单词全小写，单词之间用_下划线分隔

```js
my_first_name 、 my_student_count
```

#### 9.3、匈牙利命名法



- 基本原则是：变量名=属性+类型+对象描述
- 在 JS 中一般不会使用匈牙利命名，仅当成了解即可

```js
// i 提示变量类型为 整型
iMyStudentCount;
```

> [点击查看，相关参考资料(opens new window)](https://baike.baidu.com/item/匈牙利命名法/7632397)

#### 9.4、总结

> 两种优秀的命名法

| 命名方式   | 描述                                |
| :--------- | :---------------------------------- |
| 驼峰命名法 | 首字母小写，后面每个单词首字母大小  |
| C 语言风格 | 所有单词均小写，单词间用_下划线连接 |

### 10、JS 中字面量量



**字面量**：可以理解为`不可能发生改变的(固定)值`。他就是他的字面意思。

```js
比如 1 、A
// 1表示的永远是数字1，不可以是1个苹果，也不可以变为2等。
// A表示的永远是大写字母A，不可能表示 优秀，棒，good之意
```

**以下代码中，字面量给变量赋值**

```html
<script>
  var A = 1;
  var A = "我爱你";
  var A = "优秀";
</script>
```

源代码解读

- 上面代码中，1，'我爱你'，'优秀' 就是字面量。
- A 是变量，A 可以表示 1，也可以表示'我爱你'，还可以表示'优秀'。

在实际开发中，我们都是通过变量来保存一个字面量，然后被使用。而不是直接使用字面量。因为直接使用字面量，会非常麻烦。

> 比如现在有一串数字:3.14159234578962222247389234465436563563;

- 我需要在代码的 100 个地方用到它，如果使用字面量的方式来使用的话，那我就得写 100。
- 关键是这么长的数字你记得住吗？ 你每次写起来不累吗？
- 如果我们把这个数字保存在变量 a 中

```js
var a = 3.14159234578962222247389234465436563563;
```

- 那我们只需要在每次用到的地方，调用下变量 a 就好，你说你是记一个 a 方便，还是记这么大的一串数字方面。

我们前面接触 过的字面量：

- 数字字面量：如`1`，`2`，`ob11`（二进制）、`0x11`(十六进制)等
- 布尔字面量：只有个 `true`和`false`
- 字符串字面量：是由双引号`（"）`对或单引号`（'）`括起来的零个或多个字符

> [点击查看，参考 MDN 官方资料(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_Types#字面量_literals)

**后面我们还会学到：**

- 数组字面量
- 对象字面量
- RegExp 字面值

## 四、本章重难点



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

### 1、重点内容



- （1） 前端开发主要有哪些层 ？语言和功能是什么 ？
- （2）JavaScript 的书写位置是哪里 ？
- （3）JavaScript 有哪些输出语句 ？
- （4）变量是什么 ？如何定义变量 ？变量的合法命名规则有哪些 ？
- （5）什么叫变量初始化？

### 2、难点内容



- （1）只用 var 定义一个变量，但没有赋初值，这个变量的值是 ？
- （2）JavaScript 中，等号的功能是什么 ？

## 五、测试题



自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

#### 题一：关于变量，以下选项中说法错误的是？（选择一项）

- A、定义变量需要使用 var
- B、变量赋值使用等号（=）
- C、修改变量值时，前面需要使用 var
- D、输出变量时，不需要加引号

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

#### 题二：以下代码在控制台输出的结果是 ？

```html
<script>
  var a = 2;
  console.log(a);
  console.log("a");
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br></p></details>

#### 题三：以下代码在控制台输出的结果是多少？

```html
<script>
  var a = 1,
    b = 2,
    c = 3;
  a = "艾编程";
  b = 55;
  console.log(a);
  console.log(b);
  console.log("c");
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br><br></p></details>

#### 题四：以下代码在控制台输出的结果是多少？

```html
<script>
  var a = 1,
    b = 2,
    c = 3;
  a = 55;
  b = c;
  a = b;
  console.log(a, b, c);
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

#### 题五：以下选项中的代码书写正确的是 ？

A、

```html
<script>
  var a = 1;
  var a = 2;
  console.log(a); // 2
</script>
```

B、

```html
<script>
  var a = 1;
  a = 2;
  console.log(a); // 2
</script>
```

C、

```html
<script>
  var a,
    b = "小明",
    c;
  a = 1;
  b = 2;
  console.log(a, b, c); // 1,'小明',3
</script>
```

**D、**

```html
<script>
  var a=1 b=2 c=3;
  console.log(a,b,c);//1,2,3
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

#### 题六：在 JavaScript 中，下列标识符（变量）格式正确的是 ？

- A、1_item
- B、item_1
- C、item-1
- D、$item

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

## 六、综合案例

弹出用户输入的信息

需求：

当用户打开浏览器时，弹出输入框，要求用户输入姓名，点击确认后，以弹窗形式，显示用户的姓名。

实现思路：

- 使用 `prompt()` 函数弹出输入框，让用户输入内容
- 要通过变量来接受 `prompt()` 函数的返回值
- 通过 alert()函数，显示结果

**具体实现代码如下：**

```html
<script>
  var name = prompt("请输入你的名字");
  alert(name);
</script>
```

如何交换两变量的值

需求：

- 定义两个变量同时赋值，然后交换两个变量中的值。

实现思路：

- 这里我们可以用现实生活中的例子来解答这道题
- 首先定义两个变量 apple 和 pear，然后分别赋值"苹果"和"梨子"
- 我们把这两个变量想像成两个盘子，变量的值，想像成盘子中放入了苹果和梨子。
- 现在的需求就是要把苹果放到 pear 盘中去，把梨子放到苹果盘子中去。
- 所以我们需要再借助第三个盘子，再声明一个变量 desk，不赋值。相当于空盘子
- 然后把苹果放到空盘子中 desk 中，再把梨子放到苹果盘中，再把 desk 盘中的苹果放到梨子盘中，就 ok 了

**具体实现代码如下：**

```html
<script>
  // 声明一个变量apple相当于盘子，里面放了苹果
  var apple = "苹果";
  // 声明一个变量pear相当于盘子，里面放了苹果
  var pear = "梨子";
  // 声明变量desk，相当于空盘子
  var desk;
  //首先把apple 苹果放放空盘子中，这时苹果盘子就空了
  var desk = apple;
  //再把梨子放到苹果的盘子中，这时梨子盘子就空了
  apple = pear;
  //最后，把desk盘中的苹果，放到梨子盘中，不就实现效换了
  pear = desk;
  console.log(apple, pear);
</script>
```

## 七、处理报错 和 REPL 环境



用好 REPL 环境对于我们 Web 开发的同学是很重要的技能和工具之一。

### 1、处理报错



在初学 JS 的时候，我们经常会写错代码，造成控制台报错，初学者经常会遇到以下两种常见错误

- Uncaught SyntaxError 未捕获的语法错误
- Uncaught ReferenceError 引用错误

**Uncaught SyntaxError 未捕获的语法错误**

> 常见语法错误：如结尾的`;`分号写成了中文的，常见的 () 写成了中文下的括号。

```js
alert('艾编程')； // 把结尾的分号写成了中文分号
```

![image-20220907130024426](https://www.arryblog.com/assets/img/image-20220907130024426.a268ed71.png)

> **Uncaught SyntaxError: Invalid or unexpected token** ： 翻译后：捕获的查询无效或意外的标记
>
> 不过现在的 vscode 非常强大，如果你写错了，他会给你在错的地方标出红色的下划线。

**Uncaught ReferenceError 引用错误**

> 常见引用错识：误把字符串当变量用，或找不到变量，变量未定义

```js
// 如果没有引号，JS运行器就会认为 "艾编程" 三个字是一个变量，而又找不到对这个变量的定义
console.log(艾编程);
```

![image-20220907130925374](https://www.arryblog.com/assets/img/image-20220907130925374.30dadc62.png)

```js
// a也是当成变量处理，但变量a没有被定义（声明）过，所以也会报错
console.log(a);
```

注：

- 遇到错误和 bug 不可怕，即便 10 年的老程序员每天仍有一半的时间在寻找并解决 bug
- 遇到错误一定要多多尝试自己先解决，因为这是在工作中的必备技能。

在后续课程中，会教大家更多排错的方法。

### 2、REPL 执行环境



- REPL(Read-Eval-Print-Loop)：交互式解析器
- 在 REPL 环境下，可以定义和运行变量、函数、对象
- console 控制台其实也是一个 REPL 环境，可以使用它临时测试表达式的值

![image-20211211192405378](https://www.arryblog.com/assets/img/image-20211211192405378.688fa30d.png)

在控制台书写代码后，按回车，就会进入上面四个流程：

- 先读取代码，再执行，执行后把结果打印现来，然后又可以重复刚才的动作。
- 接着在控制台书写代码，然后回车，又会进入上面四个流程.....

![image-20220907131930891](https://www.arryblog.com/assets/img/image-20220907131930891.897f1a8a.png)

![image-20220907132218451](https://www.arryblog.com/assets/img/image-20220907132218451.1b34dee3.png)

## 八、作业



- 1、把本章重难点内容做到完全掌握，相关代码都需要全部手动敲一遍
- 2、把课上的两个案例，自己手动敲一遍。特别是交换两个变量的思路，要理清楚。

## 九、扩展知识



结合当前所学知识，拓展相关中小企业和大厂面试真题及答案解析

**如何提高页面的渲染速度 ？**



- 最好把 JS 代码写在`</body>`结束之前，也就是等页面加载完成后，再加载 JS
- 因为如果把 js 放在`<head>`中，当解析到`<script>`标签时，HTML 解析器就会暂停 DOM 的解析，而要等到 JS 代码下载（预解析线程会提前下载这个文件）、解析和解释完成后，HTML 解析器才恢复解析过程，继续解析后面内容。
- JS 在执行时，页面的 DOM 还没有解析完，就会出现操作 DOM 失败的问题。
- 如果想把 JS 放在`<head>`标签中，同时还能保证页面渲染速度和 JS 能正常操作 DOM，可以采用下面策略。

目前大厂和主流厂商的最佳实践

- 给`<script>`标签上面添加 `defer` 或`async` 属性

```html
<script defer src="./js/index.js"></script>
<script async src="./js/index.js"></script>
```

- defer 属性，告诉浏览器，解析到

  ```
  <script>
  ```

  标签位置，

  立即下载

  ，但要

  延迟执行

  ，脚本会在整个页面都解析完成后再运行。

  - HTML5 规范中要求脚本应该按它们出现的顺序执行。也就是正常情况会按顺序执行
  - 但现实当中，延迟脚本并不一定会按照顺序执行，也不一定会在`DOMContentLoaded`事件触发前执行，因此最好只包含一个延迟脚本。
  - defer 属性只能外部 JS 这种写法有效。

- async 他的用法和 defer 类似，加载和渲染后续文档元素的过程将和 JS 的**加载**与**执行**并行进行（异步），所以 async 中的最好不要有操作 DOM 的 JS

> 标记为 async 的脚本并不保证按照指定它们的先后顺序执行，他是谁先加载完，先执行谁，所以要确保这些 JS 之间不要有相互依赖的关系。

**关于 defer 和 async 的验证**

- 新建 `index.html` 文件

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    /* 背景黄色 */
    background-color: khaki;
  }
</style>
<div id="box"></div>
```

- 新建 `a.js` 和 `b.js`，保证 `a.js` 要远远大于 `b.js`，这样在加载 js 时，`a.js` 肯定会后加载

```js
//a.js
var box=document.getElementById('box');
box.style.backgroundColor='red'
//在后面加大量无用js代码，主要目的是增加这个文件的大小
..........
//b.js
var box = document.getElementById("box");
box.style.backgroundColor = "blue";
```

- 在 `index.html` 的`<head>`标签中插入以下代码

```html
<script defer src="./a.js"></script>
<script defer src="./b.js"></script>
<!--defer是先下载，后执行，按顺序，所以最后背景更改为蓝色blue-->
```

- 在 `index.html` 的`<head>`标签中插入以下代码

```html
<script async src="./a.js"></script>
<script async src="./b.js"></script>
<!--先加载的先执行，因为a.js文件大，所以会后执行，是最后把背景色改为了红色-->
```

- 修改 `index.html` 文件

```html
<script async src="./b.js"></script>
<style>
  #box {
    width: 300px;
    height: 300px;
    /* 背景黄色 */
    background-color: khaki;
  }
</style>
......
<!--在这个上面添加大量html代码，增加DOM解析到box标签的时间-->
<div id="box"></div>
```

注：

因为`./b.js` 文件小，同是加载完后就会执行，所以 html 还没有解析完，js 就执行完了。

> 这时候会报错，最后 box 颜色为黄色