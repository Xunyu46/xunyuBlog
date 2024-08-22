# JavaScript DOM 样式 与 节点操作

在正式本节课内容之前，我们首先我们来回顾下，JS 这门课程需要学习的内容。

> 具体参考如下：

![image-20221004185803144](https://www.arryblog.com/assets/img/image-20221004185803144.a2887461.png)

前面

- 我们学习了 ECMAScript 标准中规定的基本语法中的一部分，还有 JS 高级部分+ES6+Ajax+本地存储等内容，等学完 DOM 和 BOM 后再学。
- 从今天开始，我们开始学习 DOM 和 BOM 相关的内容。
- DOM 与 BOM 属于 Web APIs 相关内容，那什么是 Web APIs 呢 ？

## 一、API 与 Web API

要了解什么是 Web API，我们需要先了解什么是 API，再这个基础上，再来了解 Web APIs 更容易

### 1、API 应用程序接口

API

Application Programming Interface ，**应用程序接口** 。在编程中可以理解为一些预先定义好的函数，目的是提供应用程序与开发人员基于某软件或硬件得一访问一组**例程**的能力，而无须考虑其底层的源代码为何、或理解其内部工作机制的细节。

- **例程：** 是某个系统对外提供的功能接口或服务的集合
- **接口：** 站在现实角度，可以理解为两个物体的口子相连接，而无需关心内部实现

| 手机充电接口                                                                                         | 实现充电                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![image-20221011220200355](https://www.arryblog.com/assets/img/image-20221011220200355.99a0c09e.png) | 不用关心手机内部如何实现 不用关心充电线如何制作 我们需要充电，只需要拿充电线插进充电接口，就可以充电了 这里的充电接口就是一个 API（应用程序接口） |

简单理解：

API 是一个被封装好具有一定功能的函数，程序需要使用某种功能时，只需要调用这个函数，就能轻松实现想要完成的功能。

所以 API 被称为应用程序接口。

### 2、Web API Web 应用程序接口

Web API

Web Application Programming Interface 在前端可以理解为是浏览器提供的一套操作**浏览器功能** 和 **页面元素的 API**，其中包括 DOM 和 BOM。

- `DOM（Document Object Model）`文档对象模型， 是 JavaScript 操作网页的接口。它定义了访问 HTML 文档对象的一套属性、方法和事件。
- `BOM：Browser Object`浏览器对象模型， 是 JavaScript 操作浏览器的接口，提供一系列与浏览器相关的信息

> - DOM 与 BOM 是 W3C 国际组织定义的一套 Web 标准接口。
> - W3C（万维网联盟）创建于 1994 年，是 Web 技术领域最具权威和影响力的国际中立性技术标准机构。

在我们接下来的学习中，我们主要学习 DOM 和 BOM 相关的 API。

> 因为 Web API 很多，所以我们称其为 Web APIs。

## 二、DOM 概况与获取元素

- 深入浅出 DOM，节点（NODE），document 文档对象，访问元素节点的常用方法
- getElementById()，getElementsByTagName()，getElementsByClassName()，querySelector()，querySelectorAll()
- querySelectorAll 、getElementsByClassName()、getElementsByTagName() 的区别
- 获取 body 与 HTML 元素
- 获取页面中所有元素
- onload 方法

### 1、什么是 DOM

DOM 全称 Document Object Model 文档对象模型。

- Document 文档，表示的就是整个 HTML 网页文档
- Object 对象 ，表示将网页中的每一个部分都转换为一个对象
- Model 模型，表示对象之间的关系，这样方便我们获取对象。

**DOM 是 JavaScript 操作网页的接口，那 JS 具体是如何操作 DOM 的呢 ？**

DOM 最大的特点，就是将整个 HTML 文档抽象成一个 DOM 树，JS 可以通过操作 DOM 树来实现对 HTML 文档的添加、删除 、修改等操作

> 我们来下面这段简单的 HTML 代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM文档结构树</title>
  </head>
  <body>
    <div>
      <div>我是文本节点</div>
      <img src="" alt="" />
      <h3></h3>
    </div>
    <p></p>
  </body>
</html>
```

> 抽象出来的 DOM 树，如下图

![dom-16493959945942](https://www.arryblog.com/assets/img/dom-16493959945942.681e4cae.png)

注：

- DOM 的最小组成单位叫做**节点（node）**
- 根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点。
- DOM 树就是由各种不同类型的节点组成。

> 接下来，我们来学习下，有哪些不同的节点类型

### 2、节点（node）

> DOM 中的节点的类型有如下七种：

| 节点分类                  | 描述                                                        |
| :------------------------ | :---------------------------------------------------------- |
| Document 文档节点         | 整个 DOM 树的顶层节点                                       |
| DocumentType 文档类型节点 | 如 doctype 标签（`<!DOCTYPE html>`)                         |
| Element 元素节点          | 网页的各种 HTML 标，如：`<p>`、`<div>`                      |
| Attr 属性节点             | 元素的各种属性，如：`title='标题'`、`class='box'`           |
| Text 文本节点             | 标签之间或标签包含的文本                                    |
| Comment 注释节点          | 网页中的注释                                                |
| DocumentFragment 文档片段 | 文档片段，不存于 DOM 树上，是一种游离态，通常作为仓库来使用 |

注：

在实际开发中，用到最多的是

- 文档节点
- 元素节点
- 属性节点
- 文本节点
- 文档片段

- **元素、属性、文本节点**

![image-20221004205418474](https://www.arryblog.com/assets/img/image-20221004205418474.8b79ac08.png)

### 3、document 文档对象

- document 文档对象是`HTMLDocument`的实例，表示整个 HTML 页面（HTMLDocument 继承 Document）
- document 是 window 对象的属性，因此是一个全局对象
- 控制台 console 可以输入下面两行代码，就可以获得当前网页的文档对象

```js
window.document // 获取 文档节点对象
document // 获取 文档节点对象
// 注意区分大小写， document 与 Document是两个不同的东西
// HTMLDocument 继承 Document
```

注：

- document 对象是 DOM 中最重要的东西，几乎所有**DOM 的功能都封装在了 document 对象中**
- 我们可以通过 document 对象，来访问元素节点。

### 4、访问元素节点的常用方法

- 所谓 "访问" 元素节点，就是指 "得到"、"获取" 页面上的元素节点
- 对节点进行操作，第一步就是要得到它

| 方法                     | 功能                                          |
| :----------------------- | :-------------------------------------------- |
| getElementById()         | 通过元素 id 名获取到元素                      |
| getElementsByTagName()   | 通过标签名获取元素，返回的是一个数组          |
| getElementsByClassName() | 通过 class 名获取元素，返回的是一个数组       |
| querySelector()          | 通过选择器得到元素,只能得到第一个被找到的元素 |
| querySelectorAll()       | 通过选择器得到元素，返回的是一个数组          |

### 5、getElementById()

- `document.getElementById()` 的功能是，通过元素的`id`名来得到元素节点
- 不管元素藏的位置有多深，都能通过 id 把它找到

```html
<div id="box">我是一个盒子</div>
<p id="title">我是一个段落</p>

<script>
  var box = document.getElementById('box')
  var title = document.getElementById('title')
  console.log(box) // <div id="box">我是一个盒子</div>
  console.log(title) // <p id="title">我是一个段落</p>
  console.log(typeof box) // object
</script>
```

注意事项：

如果页面上有**相同 id 的元素，则只能得到第一个** ，id 是唯一的。

```html
<div id="box">我是1</div>
<div id="box">我是2</div>
<script>
  var box = document.getElementById('box')
  console.log(box) // <div id="box">我是1</div>
</script>
```

### 6、getElementsByTagName()

- `getElementsByTagName()`方法的功能是**通过标签名得到节点元素组成的数组**
- 所以我们可以通过遍历数组，批量操控每一元素节点

```html
<div id="box1">
  <p>我是p段落标签</p>
</div>
<div id="box2">
  <p>我是p段落标签</p>
  <p>我是p段落标签</p>
  <h3>我是h3标签</h3>
</div>
<script>
  var pList = document.getElementsByTagName('p')
  console.log(pList) // HTMLCollection(3) [p, p, p]
</script>
```

> HTMLCollection 对象，是一个类数组对象，他没有数组身上的方法。

- 即使页面上只有一个指定标签名的节点，也将得到**长度为 1 的数组**
- 如果没有找找到指定标签名的节点，则返回一个空数组

```html
<div id="box1">
  <p>我是p段落标签</p>
</div>
<script>
  var pList = document.getElementsByTagName('p')
  var h3 = document.getElementsByTagName('h3')
  console.log(pList) // HTMLCollection [p]
  console.log(h3) // HTMLCollection []
</script>
```

- 任何一个节点元素也可以调用 `getElementsByTagName()`方法，从而得到其内部的某种类的元素节点

```html
<div id="box1">
  <p>我是段落</p>
</div>

<div id="box2">
  <p>我是段落</p>
  <p>我是段落</p>
</div>

<script>
  // 先得到box1
  var box1 = document.getElementById('box1')
  // 再得到box1中p标签的数组
  var ps_inbox1 = box1.getElementsByTagName('p')
  console.log(ps_inbox1) // HTMLCollection [p]
</script>
```

### 7、getElementsByClassName()

- `getElementsByClassName()`方法的功能是通过**class 类名得到节点数组**
- 如果只能获取一个元素，返回长度为 1 的数组，如果没有找到，则返回空数组
- document 和节点元素都可以调用 `getElementsByClassName()`方法，从而得到其内部的某类名的元素节点

```html
<div class="box box1">box1</div>
<div class="box box2">box2</div>
<div id="content">
  <div class="box box3">box3</div>
</div>

<script>
  // 获取所有class名中包含 box的元素
  var box = document.getElementsByClassName('box')
  console.log(box)
  // 获取id content的元素
  var content = document.getElementById('content')
  // 获取content中class名为box的元素
  var conBox = content.getElementsByClassName('box')
  console.log(conBox)
</script>
```

![image-20221004214957069](https://www.arryblog.com/assets/img/image-20221004214957069.c3f4298d.png)

### 8、querySelector()

通过**CSS 选择器**得到页面当中的元素，不过只能得到**第一个被找到的元素**

```html
<div class="box">
  <p>我是p1</p>
  <p>我是p2</p>
</div>
<script>
  var p = document.querySelector('.box p')
  console.log(p) // <p>我是p1</p>
</script>
```

### 9、querySelectorAll()

- 通过**CSS 选择器**得到页面当中的元素，返回被找到元素组成的**数组**
- 如果只有一个符合要求的，也将得到长度为 1 的数组
- 如果没有符合要求的，则返回一个空数组

```html
<div class="box">
  <div class="title">
    <p>我是p</p>
    <p>我是p</p>
  </div>
</div>

<div class="title">
  <p>我是p</p>
  <p>我是p</p>
</div>
<script>
  var pList = document.querySelectorAll('.title p')
  console.log(pList) // NodeList(4) [p, p, p, p]
</script>
```

### 10、querySelectorAll 、getElementsByClassName()、getElementsByTagName() 的区别

- `getElementsByClassName()` 和 `getElementsByTagName()` 方法是可以动态获取元素，也就是当页面上增加或删除元素时，获取的元素个数可以改变
- 而 `querySelectorAll()` 是做不到的

```html
<ul class="list">
  <li class="item">oldli</li>
  <li class="item">oldli</li>
</ul>
<script>
  // 获取ul元素
  var listEle = document.getElementsByClassName('list')[0]
  // 通过querySelectorAll方法获取元素
  var lis = document.querySelectorAll('.list li')
  // 没有利用循环生成li之前打印lis
  console.log(lis) //2

  // 通过循环，生成5个li标签，类名为liEle，内容为new li，生成之后，放在ul里面
  for (var i = 0; i < 3; i++) {
    var newli = document.createElement('li')
    newli.className = 'item'
    newli.innerHTML = 'new li'
    listEle.appendChild(newli)
  }
  // 利用循环生成li之后打印lis
  console.log(lis) //2
</script>
```

![image-20221004221229416](https://www.arryblog.com/assets/img/image-20221004221229416.6f00ca62.png)

```html
<ul class="list">
  <li class="item">oldli</li>
  <li class="item">oldli</li>
</ul>
<script>
  // 获取ul元素
  var listEle = document.getElementsByClassName('list')[0]
  // 通过querySelectorAll方法获取元素
  // var lis = document.getElementsByTagName("li");
  var lis = listEle.getElementsByClassName('item')
  // 没有利用循环生成li之前打印lis
  console.log(lis) // 打印出2个元素

  // 通过循环，生成5个li标签，类名为liEle，内容为new li，生成之后，放在ul里面
  for (var i = 0; i < 3; i++) {
    var newli = document.createElement('li')
    newli.className = 'item'
    newli.innerHTML = 'new li'
    listEle.appendChild(newli)
  }
  // 利用循环生成li之后打印lis
  console.log(lis) // 打印出5个元素
</script>
```

![image-20221004221251693](https://www.arryblog.com/assets/img/image-20221004221251693.8b3a841e.png)

### 11、获取 body 与 HTML 元素

| 属性                       | 说明           |
| :------------------------- | :------------- |
| `document.body`            | 获取 body 元素 |
| `document.documentElement` | 获取 html 元素 |

![image-20221004221601187](https://www.arryblog.com/assets/img/image-20221004221601187.9c1495d7.png)

### 12、获取页面中所有元素

- `document.all` 获取页面当中所有元素
- `document.getElementsByTagName(“*”)` 获取页面当中所有元素

![image-20221004221745770](https://www.arryblog.com/assets/img/image-20221004221745770.d8c69b2f.png)

> 以上方式几乎不用，只是当做了解即可

### 13、onload 方法

- 浏览器在加载一个页面时，是按照自下而是上的顺序加载的。
- 如果 JS 写在了 body 前面，那 JS 在获取页面元素时，页面上的元素标签还没有被加载出来，就会造成读取不到内容。

> **通常 JS 代码一定要写到`</body>`节点的前面**，否则 JS 无法找到相应 HTML 节点

```html
<script>
  var box1 = document.getElementById('box1')
  console.log(box1) // null  没有获取到元素
</script>
<div id="box1">box</div>
```

- 如果 JS 代码写在 body 前面，也能正常执行，可以使用`window.onload = function(){}`事件，使页面加载完毕后，再执行指定的代码

```html
<script>
  // 给window对象添加onload事件监听，onload表示页面都加载完毕了
  window.onload = function () {
    var box1 = document.getElementById('box1')
    console.log(box1)
  }
</script>
<body>
  <div id="box1">box</div>
</body>
```

## 三、操作元素属性

上面我们学习了如何获取一个元素，接下来我们来学习如何操作元素的属性，我们会从以下四个方面来展开讲解

### 1、符合标准的 w3c 属性

常见的符合标准的 w3c 属性有

- id、alt、title
- class、style 更改元素样式属性 比较特殊，我们放在后面单独来讲
- src 、 href 修改图片地址和 a 标签链接地址
- type、value、checked、selected、disabled 表单元素属性

> 符合标准的 w3c 属性，我们可以直接用 **对象.属性名** 的方式来访问

### 1.1、id、alt 、title

- id 这个属性在实际中，我们肯定不会去更改他的值
- alt 图片描述属性
- title 提示属性，主要用在 a 标签上

```html
<img src="./images/logo2.png" id="img" />
<a href="http://www.baidu.com" id="link">百度</a>

<script>
  var img = document.getElementById('img')
  var a = document.getElementById('link')

  img.id = 'img1'
  img.alt = '美女图片'
  a.title = '去百度走一趟'
</script>
```

![image-20221004233013398](data:image/png;base64,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)

### 1.2、src 和 href

- src 属性，用来修改图片的地址
- href 属性，用来修改超链接的地址

```html
<img src="images/img1.png" alt="" id="img" />
<a href="http://www.baidu.com" title="百度" id="link">百度</a>

<script>
  var img = document.getElementById('img')
  var a = document.getElementById('link')

  img.src = 'images/logo.png'
  a.href = 'http://www.icodingedu.com'
  a.innerText = '艾编程'
  a.title = '艾编程'
</script>
```

![image-20221004233401358](https://www.arryblog.com/assets/img/image-20221004233401358.d545a70e.png)

### 1.3、表单属性

- type 表单类型
- value 表单值
- checked 单选和复选框选中状态
- selected 下拉列表元素选中状态
- disabled 元素是否被禁用

```html
用户名：
<input type="text" name="" id="userName" value="" />
<br />
密码：
<input type="text" name="" id="iphone" value="" />
<h3>姓别</h3>
<input type="radio" name="sex" id="" value="男" />
男
<input type="radio" name="sex" id="" value="女" />
女
<h3>喜欢的水果</h3>
<input type="checkbox" name="fruit" id="" />
苹果
<input type="checkbox" name="fruit" id="" />
梨子
<input type="checkbox" name="fruit" id="" />
葡萄
<h3>选择所在城市</h3>
<select name="" id="city">
  <option value="湖南">湖南</option>
  <option value="深圳">深圳</option>
  <option value="上海">上海</option>
</select>
<h3></h3>
<input type="submit" id="submit" value="提交" />

<script>
  // 获取用户名和电话号码输入框
  var userName = document.getElementById('userName')
  var iphone = document.getElementById('iphone')
  // 写入用户名和密码，将电话号码隐藏
  userName.value = '清心'
  iphone.value = '1223333'
  iphone.type = 'password'

  // 获取单选框
  var sex = document.getElementsByName('sex')
  // 选中第一个男
  sex[0].checked = true
  // sex[1].checked = "checked";

  // 获取复选框
  var fruit = document.getElementsByName('fruit')
  for (var i = 0; i < fruit.length; i++) {
    fruit[i].checked = true
  }

  // 获取下拉列表
  var city = document.getElementById('city')
  var ops = city.getElementsByTagName('option')
  ops[2].selected = true

  // 提交按扭
  var submit = document.getElementById('submit')
  submit.disabled = true // 禁用
  // submit.disabled = "disabled";
</script>
```

![image-20221005000330123](https://www.arryblog.com/assets/img/image-20221005000330123.2960083d.png)

### 2、自定义属性

- 自定义属性：由我们自己定义在元素身上的属性
- 自定义属性的目的：用来保存元素标签后期要用到的一些数据内容，一些简单数据存在自定义属性中，后期操作方便。
- 修改自定义属性，可以通过下面方法来操作

| 方法                      | 说明                                               |
| :------------------------ | :------------------------------------------------- |
| `setAttribute(key,value)` | 添加或修改属性值，key 表示属性名，value 表示属性值 |
| `getAttribute(key)`       | 获取属性，key 表示要获取的属性名                   |

```html
<div id="box" abs="值" title="我是提示"></div>
<script>
  var box = document.getElementById('box')
  console.log(box.abs) // undefined
  console.log(box.getAttribute('abs')) // 值
  console.log(box.getAttribute('title')) // 我是提示
  box.setAttribute('mycustom', '自定义属性值')
</script>
```

> `setAttribute(key,value)`与`getAttribute(key)`也是可以操作标准属性

### 3、Html5 中自定义属性规范

- Html5 中规定自定义属性名以`data-`开头
- 使用`data-`前缀自定义属性，可以解决属性混乱无管理的现状，区分自定义属性与标准属性

### 3.1、设置自定义属性的 2 种方式

- **方式一：** 可以直接在 HTML 标签上面书写

```html
<h2 data-weather="sunny">今天是晴天</h2>
<!--
	data-weather 自定义属性名
	sunny 自定义属性值
-->
```

> 如果设置的自定义属性是多个单词组合的形式，需要用中横线`-`连接

```html
<h2 data-birth-date="20230501">今天是我的生日</h2>
```

- **方式二：** 通过 JS 的`dataset`属性来设置

```html
<h2>今天是我的生日</h2>
<script>
  var h2 = document.querySelector('h2')
  h2.dataset.birthDate = '20230501'
</script>
```

![image-20221005002528628](data:image/png;base64,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)

### 3.2、获取自定义属性

- 直接通过**对象.dataset.属性名** （属性名书写格式：属性去掉 data-之后的单词，以驼峰命名）
- 如 属性名为`data-ab-cd-fg` 则访问方式：`对象.dataset.abCdFg`

```html
<img src="images/dog.png" data-animal-type="animal" />
<script>
  var img = document.getElementsByTagName('img')
  var animalType = img[0].dataset.animalType
  console.log(animalType)
</script>
```

重要提示：

自定义属性也是可以通过`setAttribut`和`getAttribut`方式操作的

## 四、操作元素样式

- 操作元素样式的属性有`style` 、`cssText`、 `className`
- 同时 HTML5 提供了`classList`对象，`classList`对象身上的方法，用来操作元素的 class 属性，简直完美。

### 1、style 属性

- style 属性用来操作元素的行内样式，他只对行内样式有效
- 获取行内样式的写法：

```js
对象.style.属性名 // 属性名要采用驼峰形式书写
```

- 修改或添加行内样式的写法

```js
对象.style.属性名 = 属性值 // 属性名要采用驼峰形式书写
```

**代码演示**

```html
<style>
    .box {
        width: 100px;
        height: 200px;
        background-color: hotpink;
        color: red;
    }
</style>

<div class="box"></div>
<script>
    var box = document.getElementsByClassName("box");
    box[0].style.width = "200px";
    box[0].style.backgroundColor = "red";
    box[0].style.borderTop = "15px solid blue";

    // 获取样式
    console.log(box[0].style.width); // 200px
    console.log(box[0].style.color); // 啥也没有
```

![image-20221005011215905](https://www.arryblog.com/assets/img/image-20221005011215905.50f6514a.png)

注意事项：

- 操作元素的 style 上的样式，这里的样多权重最高，可以覆盖外部和内嵌样式
- 如果样式写在了 class 类中，没写在 style 属性中，则通过 `对象.stylel.属性名` 的方式，是获取不到的
- 如果元素要改变的样式量特别多，这种方式就比较麻烦。

### 2、cssText 属性

- cssText 的本质就是设置 HTML 元素的 style 属性值
- 所以每设置一次 cssText 值，就会把之前的 style 属性中的样式全覆盖掉

```html
<div class="box" style="width: 100px; height: 200px; background-color: red"></div>
<script>
  var box = document.getElementsByClassName('box')[0]
  box.style.cssText = 'color:blue' // 覆盖了之前的style样式中的值
</script>
```

![image-20221005012223993](data:image/png;base64,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)

> cssText 主要用来合并多次对 CSS 样式的修改，改为一次性处理

### 3、className 属性

- 我们在操作元素的 class 样式属性时，不能用 `对象.属性` 的方法操作，因为 class 是关键字
- 我们可以通过 `对象.className` 的方式来操作
- **注意事项：** className 修改样式，如果是多个样式，样式之间要用空隔隔开

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
  .box1 {
    border: 5px dashed tomato;
  }
</style>
<body>
  <div class="box"></div>
  <script>
    var box = document.getElementsByClassName('box')
    box[0].className = 'box box1' // box与box1之间要有空格
  </script>
</body>
```

![image-20221004234312546](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB8CAIAAADPS/jqAAADNklEQVR4nO3dMYvaYBzH8VzpLkLBUXAtKMFZKBSlg7NDEbsUHLpVhHsJV8Sxg9Cl4uTsUHQpOEtR6Co4CgXxFXiDkKZ/SZ5c0P60/X4m75oHji+S8Dx9ktwdDgcPIs/Uf8B/jfpK1FeivhL1lZ7bX7x/E3P0w4dR8Lkx6RU2y6gjx/XuOl86fi6vptX5MOrIRbE2q7SOn7P7bXvUiTpyl8kNmv3gx/aok91vow4eNPu7TO74uTofllfTqCNnldaiWDt+LmyWjUkv6sh1vjSud4Mf7z83o470PM/78i3uXz3P47uvRX0l6itRX+nOrjT8edUNX2YRz16EuepeOeorUV+J+kr2qvvw45fqT/nH3PsvnMfw3VeivhL1lewap1nhCy/pIZ5dHPU/OYfY+jGLxoiXIh1nHiXqK1FfifpK1FeivhL1laivZGdbTG5TM+kaCYbY+sEWKDxVinSceZSor2TPPGa/Y7DBEU52q6j/1jnE1jfbXamfnN0p/M5dnzOPEvWVqK9EfSXqK1FfifpK1Feysy2mV6mZdOUEQ9hFeynsor121Fey531z93dwuzecTm6cd595uGfxbLhn8cZQX4n6StRXor4S9ZWor0R9JTvXZXKbmkmXTTCENc5LYY3z2lFfifpK9qprHkYafvoo4tnnuPpfnUMc6/tILkU6zjxK1FeivhL1laivRH0l6itRX8mucQ6+/wz/yIJzcma21X710jmE9f2zSZGOM48S9ZUc96oH72KCk71X3f/oHOJ4TgP1kzt5pZe7PmceJeorUV+J+krUV6K+EvWVqK9kZ1tMr1Iz6aoJhrCL9lLYRXvtqK/keOcQj2VOzr5zyH/tHMKTAs6GJwXcGOorUV+J+krUV6K+EvWVqK/EO4fOxqQrJBjCGuelsMZ57aivRH0l1jjPhjXOG0N9JeorUV/JznUNcyUJX4Qbk579n8yQcb0bzP3Kq6m9ryNkUawFO2Gy+619yk3ILpMLPy+oPerEPJRl0OwHt7FV58OTWxt+m1VawUs7CptlY9KLOnKdL4VfYWwvs0/Hd1+J+krUV6K+0slcF38R330l6itRX4n6StRXor4S9ZUeASa64vDPZYQ8AAAAAElFTkSuQmCC)

注：

- className 操作 CSS 样式有一个很大的缺点，就是我每次更新 class 类名时，都要把所有的类名带上。
- 如果我只想在元素原有的基础上继续添加新的类名、或删除某个类名，能不能不动原有的类名，就能实现。答案肯定是可以的。

### 4、操作 CSS 样式的优先方案

style、cssText、className 三种方式操作 CSS 样式时，**性能消耗**由**底到高**的排序分别如下：

![image-20221018150747724](data:image/png;base64,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)

> 接下来我们用这三种不同的方式来操作同一个 DOM 的 CSS 样式，来对比他们所消耗的时间

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    color: red;
    font-size: 20px;
  }
</style>
<div id="box">box</div>

<script>
  var box = document.getElementById('box')

  // style方式操作样式
  console.time('style')
  for (var i = 0; i < 10000; i++) {
    box.style.width = '100px'
    box.style.height = '100px'
    box.style.color = 'red'
    box.style.fontSize = '20px'
  }
  console.timeEnd('style')

  // cssText方式操作样式
  console.time('cssText')
  for (var i = 0; i < 10000; i++) {
    box.style.cssText = 'width:100px;height:100px;color:red;font-size:20px'
  }
  console.timeEnd('cssText')

  // className方式操作样式
  console.time('className')
  for (var i = 0; i < 10000; i++) {
    box.className = 'box'
  }
  console.timeEnd('className')
</script>
```

![image-20221018145523909](https://www.arryblog.com/assets/img/image-20221018145523909.f0cfd67c.png)

为什么会出现这么大的差异，本质是什么 ？

- 通过 style 属性来操作 CSS 样式，会频繁的触发页面的**重排**和**重绘**（**DOM 重新渲染**）
- 通过 style 身上的 cssText 属性来操作 CSS 样式，是把多次对 DOM 的操作合并为一次性处理，减少了触发**重排**和**重绘**（**DOM 的重新渲染**）次数
- 通过 className 属性，本质也是一样的，减少了对 DOM 的操作，多次操作合并为一次性处理，同时 className 中的样式，一开始就准备好了。

### 5、classList 对象

html5 为每一个元素新增了一个`classList`对象，`classList`对象保存着控制当前元素类名的各个方法和属性。

> classList 对象身上相关的属性和方法如下表：

| 属性或方法                      | 说明                                                                                 |
| :------------------------------ | :----------------------------------------------------------------------------------- |
| length                          | 返回类名的个数                                                                       |
| `add()`                         | 在原有的类名基础上添加一个类名，如果这些类已经存在于元素的属性中，那么它们将被忽略。 |
| `remove()`                      | 在原有的类名基础上 移出某一个类名，使删除不存在的类值也不会导致抛出异常              |
| `toggle()`                      | 如果有这个类名 则删除这个类名，返回 false，如果没有 则添加减去，返回 true            |
| `item()`                        | 根据索引 获取类名                                                                    |
| `contains()`                    | 判断元素是否包含某一个类名                                                           |
| `replace( oldClass, newClass )` | 用一个新类值替换已有的类值，替换成功返回 true,替换失败，返回 false                   |

```html
<div class="box box1 box2">盒子</div>
<script>
  var box = document.getElementsByClassName('box')[0]
  console.log(box.classList.length) // 3 类名个数
  box.classList.add('box3') // 追加一个类名box3
  box.classList.remove('box2') // 移除一个类名box2
  box.classList.toggle('box1') // 有就移除box1
  box.classList.toggle('box1') // 没有就添加box1
  console.log(box.classList.item(0)) // 索引为0的类名 box
  console.log(box.classList.contains('box')) // true
  console.log(box.classList.replace('box', 'mybox')) // 用mybox 替换box
</script>
```

注：

- 假设现在浏览器版本过低，不支持 classList 对象，那就需要我们手写相关方法来实现对 class 属性的操作。
- 这里我们尝试手写：`add`、`remove`、`toggle`三个方法。
- 我们期望 html 元素可以直接调用这些方法，实现对 class 类名的操作。
- 那就需要确认，我们手写的这些方法要加在那个构造函数（类）的原型上。因此我们了解 DOM 中各个类的关系。

### 6、DOM 中各类的继承关系图

![image-20221101152645480](https://www.arryblog.com/assets/img/image-20221101152645480.a134fcdc.png)

**在控制台查看对应的继承关系**

> 分别在控制台输入下代码，然一层一层点看，查看类的继承关系

```js
document.__proto__

var div = document.createElement('div')
div.__proto__

var attr = document.createAttribute('id')
attr.__proto__

var text = document.createTextNode('文本')
text.__proto__

var frag = document.createDocumentFragment()
frag.__proto__

var comment = document.createComment('我是一段注释')
comment.__proto__

document.childNodes[0].__proto__
```

![image-20221101151654017](https://www.arryblog.com/assets/img/image-20221101151654017.5293f173.png)

结论：

- 我们希望 HTML 元素可以直接打点调用 addClass 等方法，实现对 class 属性的操作
- 所以这些方法要写在 HTMLElement 的原型上。

### 7、手写 addClass 方法

该方法实现对元素添加对应的 class 类名，如果元素上没有对应 class 类名添加，有的话就不加

```html
<div class="box box1 box2 box2"></div>

<script>
  /**
   * addClass 方法实现对元素添加对应的class类名，如果元素上没有对应class类名就添加，有就不加
   * @param name  class类名字符串
   */
  HTMLElement.prototype.addClass = function (name) {
    // 获取当前对象上的class类名
    var className = this.className
    // 以空格分隔成一个数组
    var classArr = className.split(' ')
    // 判断传过来的类名在不在当前数组中，如果不存在，就添加
    if (!classArr.includes(name)) {
      classArr.push(name) // 将类名添加到数组中
    }
    var newClassName = classArr.join(' ') // 将数组元素以空格拼接成字符串
    this.className = newClassName
  }
  var box = document.querySelector('.box')
  box.addClass('box4')
</script>
```

### 8、手写 removeClass 方法

该方法实现移除元素上对应的 Class 类名，如果有就移除，如果没有不做处理

```html
<div class="box box1 box2 box2"></div>

<script>
  /**
   * removeClass 该方法实现移除元素上对应的Class类名，如果有就移除，如果没有不做处理
   * @param name  class类名字符串
   */
  HTMLElement.prototype.removeClass = function (name) {
    // 获取当前对象上的class类名
    var className = this.className
    // 以空格分隔成一个数组
    var classArr = className.split(' ')
    // 判断传过来的类名在不在当前数组中，如果存在，找到对应下标然后删掉
    // 要考虑傻逼模式，就是他本来就出现了两个相同的类名
    var index = classArr.indexOf(name)
    while (index !== -1) {
      classArr.splice(index, 1)
      index = classArr.indexOf(name, index)
    }
    var newClassName = classArr.join(' ') // 将数组元素以空格拼接成字符串
    this.className = newClassName
  }

  var box = document.querySelector('.box')
  box.removeClass('box2') // 移除
  box.removeClass('box1') // 移除
</script>
```

### 9、手写 toggleClass 方法

该方法实现自动判断是给元素添加还是删除对应的 Class 类名，如果元素存在对应 Class 类名就删除，否则就添加

```html
<div class="box box1 box2 box2"></div>
<script>
  /**
   * toggleClass 该该方法实现自动判断是给元素添加还是删除对应的Class类名，如果元素存在对应Class类名就删除，否则就添加
   * @param name  class类名字符串
   */
  HTMLElement.prototype.toggleClass = function (name) {
    // 获取当前对象上的class类名
    var className = this.className
    // 以空格分隔成一个数组
    var classArr = className.split(' ')
    // 判断传过来的类名在不在当前数组中，如果不在，就添加，存在，找到对应下标然后删掉
    var index = classArr.indexOf(name)
    if (index === -1) {
      // 没有就添加
      classArr.push(name)
    } else {
      // 存在，就删除
      // 要考虑傻逼模式，就是他本来就出现了两个相同的类名
      var _index = index
      while (_index !== -1) {
        classArr.splice(_index, 1)
        _index = classArr.indexOf(name, _index)
      }
    }
    var newClassName = classArr.join(' ') // 将数组元素以空格拼接成字符串
    this.className = newClassName

    // 处理返回值
    if (index === -1) return true
    return false
  }

  var box = document.querySelector('.box')
  box.toggleClass('box2')
  box.toggleClass('box1')
  box.toggleClass('box3')
</script>
```

注：

以上所有方法，都没有办法获取 class 类名或 id 中定义的 css 样式。接下来我们来学习一个方法，用来获取 class 类名中的 css 样式

### 10、getComputedStyle 方法

`getComputedStyle()` 方法，获取元素的计算样式，但不能修改样式。

**语法**

```js
var style = window.getComputedStyle(element, [pseudoElt])
```

- element 用于获取计算样式的元素
- pseudoElt 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或`null`）
- 返回的`style`是一个实时的 CSSStyleDeclaration （css 样式声明）对象（它是一个 CSS 声明块，CSS 属性键值对的集合），当元素的样式更改时，它会自动更新本身。

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  .box1 {
    font-size: 20px;
    color: yellow;
    line-height: 100px;
  }
</style>

<div class="box box1" id="mybox">我是css盒子</div>
<script>
  var mybox = document.getElementById('mybox')
  var style = getComputedStyle(mybox, null)
  console.log(style)
  for (var i = 0; i < style.length; i++) {
    key = style[i]
    console.log(cs + '=' + style.getPropertyValue(cs))
  }
</script>
```

### 11、访问 CSS 属性值 3 种方式

```js
// 访问方式一
// propName 属性名，正常书写
window.getComputedStyle(element, [pseudoElt]).getgetPropertyValue(propName);

// 访问方式二
// propName 属性名 要采用驼峰命名方式
window.getComputedStyle(element, [pseudoElt]).propName;

// 访问方式三
// propName 属性名，正常书写
window.getComputedStyle(element, [pseudoElt])[propName];
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  .box1 {
    font-size: 20px;
    color: yellow;
    line-height: 100px;
  }
</style>
<div class="box box1" id="mybox">我是css盒子</div>

<script>
  var mybox = document.getElementById("mybox");
  var style = getComputedStyle(mybox, null);
  console.log(style.height);
  console.log(style.backgroundColor);
  console.log(style.lineHeight);

  console.log(style.getPropertyValue("height"));
  console.log(style["background-color"]);
  console.log(style.getPropertyValue("line-height"));
</script>
```

![image-20221005015822903](https://www.arryblog.com/assets/img/image-20221005015822903.a9fe364f.png)

### 12、获取伪元素样式

```html
<style>
  #mybox {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  #mybox::after {
    content: '我是伪元素内容';
    color: yellow;
  }
</style>

<div id="mybox"></div>
<script>
  var mybox = document.getElementById('mybox')
  var style = getComputedStyle(mybox, '::after')
  console.log(style.color)
  console.log(style.content)
</script>
```

![image-20221025142409799](https://www.arryblog.com/assets/img/image-20221025142409799.ee317bf2.png)

## 五、获取元素尺寸

接下来我们将学习一组属性，这些属性可以获取页面中元素当前的实际尺寸大小，其中包括

- 偏移尺寸
- 客户端尺寸
- 滚动尺寸
- 确定元素尺寸

### 1、偏移尺寸

以下 5 个属性，都与元素的偏移尺寸有关 ,并且都是只读的

- offsetWidth
- offsetHeight
- offsetParent
- offsetLeft
- offsetTop

> 接一来，我们就一起来学习吧！

### 1.1、offsetWidth 与 offsetHeight

> 以下属性为只读的，每次访问都会重新计算

| 属性         | 说明                                                                                                |
| :----------- | :-------------------------------------------------------------------------------------------------- |
| offsetWidth  | 返回一个元素的布局宽度 标准盒模型下，包括：width、border、padding、滚动条宽 怪异盒模型下为：width   |
| offsetHeight | 返回一个元素的布局宽度 标准盒模型下，包括：height、border、padding、滚动条宽 怪异盒模型下为：height |

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 200px;
    height: 200px;
    padding: 30px;
    border: 10px solid red;
    margin: 20px;
  }
  .box1 {
    width: 100px;
    height: 100px;
    padding: 30px;
    border: 10px solid blue;
    margin: 20px;
    /* box-sizing: border-box; */
  }
</style>

<div class="box">
  <div class="box1"></div>
</div>

<script>
  var box1 = document.querySelector('.box1')
  var _width = box1.offsetWidth
  var _height = box1.offsetHeight
  console.log(_width) // width+padding+border=100+60+20=180
  console.log(_height) //  height+padding+border=100+60+20=180

  // 如果box1更改为border-box，则最后输出结果为100 100
</script>
```

### 1.2、offsetParent

- 此属 性为只读属性，每次访问都会重新计算
- 返回离当前元素最近的**定位祖先元素**或最近的 table,td,th,tody 元素
- 在 Webkit 中，如果当前元素为隐藏的（该元素或其祖先元素的 `style.display` 为 "none"），或者该元素的 `style.position` 被设为 "fixed"，则该属性返回 `null`。

```html
<style>
  .box {
    position: absolute;
  }
  .box1 {
    position: relative;
  }
</style>

<div class="box">
  <!--绝对定位-->
  <div class="box1">
    <!--相对定位-->
    <div class="box2">
      <!--未定位-->
      <div class="box3"></div>
    </div>
  </div>
</div>

<script>
  // 获取box3元素
  var box3 = document.querySelector('.box3')
  // 获取离box3最近的定位祖先元素
  var parent = box3.offsetParent
  console.log(parent) // div.box1
</script>
```

![image-20221006155613890](https://www.arryblog.com/assets/img/image-20221006155613890.3e50a1fd.png)

```html
<style>
  .box {
    position: absolute;
  }
  .box1 {
    /* position: relative;*/
  }
</style>

<div class="box">
  <!--绝对定位-->
  <div class="box1">
    <!--相对定位-->
    <div class="box2">
      <!--未定位-->
      <div class="box3"></div>
    </div>
  </div>
</div>

<script>
  // 获取box3元素
  var box3 = document.querySelector('.box3')
  // 获取离box3最近的定位祖先元素
  var parent = box3.offsetParent
  console.log(parent) // div.box
</script>
```

![image-20221006155724388](https://www.arryblog.com/assets/img/image-20221006155724388.e84f2df9.png)

- 在 Webkit 中，如果当前元素为隐藏的（该元素或其祖先元素的 `style.display` 为 "none"），或者该元素的 `style.position` 被设为 "fixed"，则该属性返回 `null`。

```html
<style>
  .box {
    position: absolute;
  }
  .box1 {
    /* display: none; */
    position: relative;
  }
  .box3 {
    /* position: fixed; */
    display: none;
  }
</style>
<div class="box">
  <!--绝对定位-->
  <div class="box1">
    <!--相对定位-->
    <div class="box2">
      <!--未定位-->
      <div class="box3"></div>
    </div>
  </div>
</div>
<script>
  // 获取box3元素
  var box3 = document.querySelector('.box3')
  // 获取离box3最近的定位祖先元素
  var parent = box3.offsetParent
  console.log(parent) // null
</script>
```

### 1.3、offsetLeft 和 offsetTop

> 以下两属性为只读属性，每次访问都会重新计算

| 属性       | 说明                                                                 |
| :--------- | :------------------------------------------------------------------- |
| offsetLeft | 它返回当前元素(左边框）相对于其 `offsetParent`元素的左边框内壁的距离 |
| offsetTop  | 它返回当前元素(上边框）相对于其 `offsetParent`元素的上边框内壁的距离 |

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    padding: 100px;
  }
  .box1 {
    margin: 50px;
    padding: 20px;
    border: 5px solid blue;
    width: 200px;
    height: 200px;
    position: relative;
  }
  .box2 {
    border: 2px solid red;
    height: 150px;
  }
  .box3 {
    width: 100px;
    height: 100px;
    position: absolute;
    border: 10px solid skyblue;
    margin-top: 50px;
    margin-left: 30px;
    left: 20px;
    top: 50px;
  }
</style>

<div class="box1">
  <div class="box2">
    <div class="box3"></div>
  </div>
</div>

<script>
  // 获取box3元素
  var box3 = document.querySelector('.box3')
  // 与离他最近的定位祖先元素左内边距的距离
  var _left = box3.offsetLeft // left + margin - left = 20 + 30 = 50
  // 与离他最近的定位祖先元素上内边距的距离
  var _top = box3.offsetTop //  top + margin - top = 50 + 50 = 100
  console.log(_left, _top)
</script>
```

![image-20221006162439940](https://www.arryblog.com/assets/img/image-20221006162439940.6d7a65dd.png)

### 1.4、计算元素与页面偏移量

- 如果要计算一个元素与页面的左偏移量
- 则需要把**当前元素**的的`offsetLeft` 和`offsetTop`分别与他的`offsetParen`t 的`offsetLeft`和`offsetTop`相加，同时还要分别加上他们**父元素**的`border-left-width`和`border-top-width`值
- 再分别加上**offsetParent 元素**的`offsetParent`元素的`offsetLeft`和`offsetTop`，还有父元素的`border-left-width`和`border-top-width`，一层层相加，一直加到根元素

**获取与页面左偏移量**

- while 循环版

```js
function getElementLeft(el) {
  // 获取当前元素左偏移量
  var left = el.offsetLeft
  // 获了当前元素的offsetParent
  var parent = el.offsetParent
  // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
  while (parent) {
    left += parent.offsetLeft // 与每一轮元素的父元素与其定位父元素左边距离累加
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null)
    border = parseInt(style.borderLeftWidth) // 过滤单位部分，只取数字部分
    // 把左边框累加进去
    left += border
    parent = parent.offsetParent
  }
  // 最终返回获取的left值
  return left
}
```

- 递归版

```js
function getElementLeft(el) {
  // 获取当前元素左边距
  var left = el.offsetLeft
  // 获了当前元素的offsetParent
  var parent = el.offsetParent
  // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
  if (parent) {
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null)
    border = parseInt(style.borderLeftWidth) // 过滤单位部分，只取数字部分
    // 把左边框累加进去
    left += border
    left += getElementLeft(parent)
  }
  return left
}
```

**获取与页面上偏移量**

- while 循环版

```js
function getElementTop(el) {
  // 获取当前元素左偏移量
  var top = el.offsetTop
  // 获了当前元素的offsetParent
  var parent = el.offsetParent
  // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
  while (parent) {
    top += parent.offsetTop
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null)
    border = parseInt(style.borderTopWidth) // 过滤单位部分，只取数字部分
    // 把左边框累加进去
    top += border
    parent = parent.offsetParent
  }
  // 最近返回获取的left值
  return top
}
```

- 递归版

```js
function getElementTop(el) {
  // 获取当前元素上偏移量
  var top = el.offsetTop
  // 获了当前元素的offsetParent
  var parent = el.offsetParent
  // 如果 offsetParent 存在，则一直获取,计算他的offsetTop值，如果不存在，则终止
  if (parent) {
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null)
    border = parseInt(style.borderTopWidth) // 过滤单位部分，只取数字部分
    // 把左边框累加进去
    top += border
    top += getElementTop(parent)
  }
  return top
}
```

### 1.5、总结

> 以下 5 个属性都与元素的偏移尺寸相关

| 属性         | 说明                                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |
| offsetWidth  | 返回一个元素的布局宽度 标准盒模型下，包括：width、border、padding、滚动条宽 怪异盒模型下为：width                    |
| offsetHeight | 返回一个元素的布局宽度 标准盒模型下，包括：height、border、padding、滚动条宽 怪异盒模型下为：height                  |
| offsetParent | 返回离当前元素最近的定位祖先元素或最近的 table,td,th,tody 元素。 当前元素 `display: none;`时，offsetParent 返回 null |
| offsetLeft   | 它返回当前元素(左边框）相对于其 `offsetParent`元素的左内边距的距离                                                   |
| offsetTop    | 它返回当前元素(上边框）相对于其 `offsetParent`元素的顶部内边距的距离                                                 |

**图形结构**

![image-20221006174614064](https://www.arryblog.com/assets/img/image-20221006174614064.dcb8e598.png)

重点强调

以上偏移尺寸属性都是只读的，每次访问都会重新计算。因此，应该尽量减少查询它们的次数。

我们可以把查询的值保存在变量中，供后面使用，这样就可以避免影响性能。

### 2、案例 1：求两元素中心点之间的距离

两个元素相对于同一个父元素定位，现在我们要求这两个元素中心点之间的距离。

> 我们通过下面这个图来分析，如何求两个元素中心点之间距离

![image-20221013215324621](https://www.arryblog.com/assets/img/image-20221013215324621.15fabc02.png)

**代码实现如下：**

```js
// 求两点之间的距离
// obj1与obj2分别表示上图中 box1与box2
function getDistance(obj1, obj2) {
  var a = obj1.offsetLeft + obj1.offsetWidth / 2 - (obj2.offsetLeft + obj2.offsetWidth / 2)
  var b = obj1.offsetTop + obj1.offsetHeight / 2 - (obj2.offsetTop + obj2.offsetHeight / 2)
  return Math.sqrt(a * a + b * b)
}
```

### 3、案例 2：找出与当前元素最近的一个元素

- 我们需要找到所有元素与当前元素的距离，然后再从中找出距离最小的那个元素
- 我们可以新建一个数组，用来保存**每个元素**及**每个元素与当前元素中心点的距离**

> 数组结构如下

```js
var elementArr = [
  {
    element: li1, // html元素
    distance: 30, // 与当前元素的最近距离
  },
  {
    element: li2,
    distance: 50,
  },
]
```

- 最后找出数组中 distance 值最小的那一个对象中的 element 元素

**代码实现如下：**

```html
<style>
  .container {
    width: 400px;
    height: 500px;
    background-color: skyblue;
    position: relative;
  }
  .box {
    width: 100px;
    height: 100px;
    background-color: khaki;
    margin: 5px;
    position: absolute;
  }
  .box1 {
    left: 0;
    top: 100px;
  }
  .box2 {
    left: 100px;
    top: 150px;
  }
  .box3 {
    left: 200px;
    top: 0px;
  }
  .box4 {
    left: 200px;
    top: 300px;
  }
</style>

<body>
  <div class="container">
    <div class="box box1">box1</div>
    <div class="box box2">box2</div>
    <div class="box box3">box3</div>
    <div class="box box4">box4</div>
  </div>

  <script>
    var conatiner = document.querySelector('.container')
    var box = document.querySelectorAll('.container .box')

    // 找出与obj元素距离最近的元素
    function findNearest(obj) {
      var elementArr = []
      // 遍历每个元素，计算每个元素于obj的中心位置，然后保存到数组中
      for (var i = 0; i < box.length; i++) {
        // 当前被用来比较的obj，不用存到数组中，要排除
        if (box[i] !== obj) {
          // 计算两中心点距离
          var centerDistance = getDistance(box[i], obj)
          // 把这个元素和对应中心点距离保存到数组中
          var el = {}
          el.element = box[i]
          el.distance = centerDistance
          elementArr.push(el)
        }
      }

      // for循环遍历elementArr数组，找出数组中距离最小的那个元素，然后返回
      var minElement = elementArr[0]
      for (var j = 0; j < elementArr.length; j++) {
        if (elementArr[j].distance < minElement.distance) {
          minElement = elementArr[j]
        }
      }
      return minElement.element // 返回最小的距离的那个对象
    }

    console.log(findNearest(box[2]))

    // 计算两个元素中心点位置
    function getDistance(obj1, obj2) {
      var x = obj1.offsetLeft + obj1.offsetWidth / 2 - (obj2.offsetLeft + obj2.offsetWidth / 2)

      var y = obj1.offsetTop + obj1.offsetHeight / 2 - (obj2.offsetTop + obj2.offsetHeight / 2)

      return Math.sqrt(x * x + y * y)
    }
  </script>
</body>
```

### 4、客户端尺寸

> 以下两个属性为元素的客户端尺寸，属性为只读的，每次访问都会重新计算

| 属性         | 说明                                                                                           |
| :----------- | :--------------------------------------------------------------------------------------------- |
| clientWidth  | 表示元素的内容区宽，在标准盒模型下，包括 `width + padding`，不包括 `border + margin + 滚动条`  |
| clientHeight | 表示元素的内容区高，在标准盒模型下，包括 `height + padding`，不包括 `border + margin + 滚动条` |

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 200px;
    height: 200px;
    padding: 30px;
    border: 10px solid red;
    margin: 20px;
  }
</style>

<div class="box">
  <div class="box1"></div>
</div>

<script>
  var box = document.querySelector('.box')
  var w = box.clientWidth // width + padding = 200 + 60 = 260
  var h = box.clientHeight // height + padding = 200 + 60 = 260
  console.log(w, h)
</script>
```

![image-20221006173256016](https://www.arryblog.com/assets/img/image-20221006173256016.aa3b0396.png)

### 5、滚动尺寸

滚动尺寸，提供了元素内容滚动相关的信息。有以下四个属性

- scrollWidth
- scrollHeight
- scrollLeft
- scrollTop

> 接下来，就让我们一起来学习吧！

### 5.1、scrollWidth 与 scrollHeight

| 属性         | 说明                                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------- |
| scrollWidth  | 元素内容宽度的一种度量，包括由于 overflow 溢出而在屏幕上不可见的内容 如果没有水平滚动条，其它大小与 clientWidth 相同 |
| scrollHeight | 元素内容高度的度量，包括由于 overflow 溢出导致的视图中不可见内容。 如果没有垂直滚动条，其它大小与 clientHeight 相同  |

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    border: 2px solid red;
    padding: 50px;
    overflow: scroll;
  }
  .box1 {
    width: 800px;
    height: 800px;
    background-color: skyblue;
  }
</style>

<div class="box">
  <div class="box1">
    滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容
  </div>
</div>
<script>
  var box = document.querySelector('.box')
  var _w = box.scrollWidth
  var _h = box.scrollHeight
  console.log(_w, _h) // 900 900
</script>
```

![image-20221006182524877](https://www.arryblog.com/assets/img/image-20221006182524877.e9a46e7a.png)

### 5.2、scrollLeft 和 scrollTop

| 属性       | 说明                                                                                                                                                                                                         |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scrollLeft | 获取或设置一个元素的内容水平滚动的距离 如果元素没有产生水平方向滚动条，那 `scrollLeft = 0;` 设置`scrollLeft`的值小于 0，`scrollLeft` 被设为`0` 如果设置了超出这个容器可滚动的值，`scrollLeft` 会被设为最大值 |
| scrollTop  | 获取或设置一个元素的内容垂直滚动的距离 如果元素没有产生垂直方向滚动条，那 `scrollTop = 0;` 设置`scrollTop`的值小于 0，`scrollTop` 被设为`0` 如果设置了超出这个容器可滚动的值，`scrollTop` 会被设为最大值     |

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    border: 2px solid red;
    padding: 50px;
    overflow: scroll;
    border: 50px solid khaki;
  }
  .box1 {
    width: 800px;
    height: 800px;
    background-color: skyblue;
  }
</style>

<div class="box">
  <div class="box1">
    滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容滚动的内容
  </div>
</div>

<script>
  var box = document.querySelector('.box')
  box.onscroll = function () {
    console.log(box.scrollTop) // 打印滚动条滚动的高度
    console.log(box.scrollLeft) // 打印滚动条滚动的宽度
  }

  // 滚动条，滚动到底部
  box.scrollTop = 718 // 800-100+17 要注意，不要多减了滚条条的高度
  // 滚动条，滚动到最右边
  box.scrollLeft = 618 // 800-200+17 要注意，不要多减了滚条条的宽度
</script>
```

![image-20221006183703295](https://www.arryblog.com/assets/img/image-20221006183703295.08407f18.png)

### 5.3、总结

以下属性

- `scrollWidth`和`scrollHeight`为 **只读** 属性
- `scrollLeft`和`scrollTop`为 **可读可写** 属性

| 属性         | 说明                                                                                                                                                                                                     |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scrollWidth  | 元素内容宽度的一种度量，包括由于 overflow 溢出而在屏幕上不可见的内容 如果没有水平滚动条，其它大小与 clientWidth 相同                                                                                     |
| scrollHeight | 元素内容高度的度量，包括由于 overflow 溢出导致的视图中不可见内容。 如果没有垂直滚动条，其它大小与 clientHeight 相同                                                                                      |
| scrollLeft   | 获取或设置一个元素的内容水平滚动的距离                                                                                                                                                                   |
| scrollTop    | 获取或设置一个元素的内容垂直滚动的距离 如果元素没有产生垂直方向滚动条，那 `scrollTop = 0;` 设置`scrollTop`的值小于 0，`scrollTop` 被设为`0` 如果设置了超出这个容器可滚动的值，`scrollTop` 会被设为最大值 |

### 6、确定元素尺寸

- 浏览器在每个元素上都暴露了`getBoundingClientRect()`方法，返回一个 DOMRect 对象
- 访对象提供了元素的大小及其相对于**视口**（可视区）的位置

> 相关属性如下：

| 属性    | 说明                                       |
| :------ | :----------------------------------------- |
| left、x | 元素左边框相对于可视区左边的距离           |
| top、y  | 元素上边框框相对于可视区顶部的距离         |
| right   | 元素右边框相对于可视区左边的距离           |
| bottom  | 元素底边框相对于可视区顶部的距离           |
| height  | 元素的高，包括 `height + padding + border` |
| width   | 元素的宽，包括 `width + padding + border`  |

![image-20221006195302347](https://www.arryblog.com/assets/img/image-20221006195302347.34bfe799.png)

**代码演示**：

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    border: 2px solid red;
    padding: 20px;
    border: 20px solid khaki;
  }
</style>

<div class="box"></div>

<script>
  var box = document.querySelector('.box')
  var domRect = box.getBoundingClientRect()
  console.log(domRect) // 打印 DOMRect对象
  // 遍历对象
  for (key in domRect) {
    if (typeof domRect[key] !== 'function') {
      // 过滤掉方法，只留下属性
      console.log(key + ':' + domRect[key])
    }
  }
</script>
```

![image-20221006195832471](https://www.arryblog.com/assets/img/image-20221006195832471.2e3d191b.png)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    border: 2px solid red;
    padding: 20px;
    border: 20px solid khaki;
  }

  body {
    height: 3000px;
  }
</style>
<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  // 滚动浏览器窗口
  window.onscroll = function () {
    var domRect = box.getBoundingClientRect()
    console.log(domRect)
  }
</script>
```

![image-20221006200815944](https://www.arryblog.com/assets/img/image-20221006200815944.da73b109.png)

### 7、案例 1：如何判断两个元素发生了碰撞（经典面试题）

如何判断两个元素是否发生碰撞

> 我们来看下这个图

![image-20221011234853780](https://www.arryblog.com/assets/img/image-20221011234853780.582b73ca.png)

```js
// 以下代码仅限两个元素是相对于同一个定位的父元素
// 如是不是相对于同一个父元素，就要计算他们都相对于浏览器的位置来计算
// 前面讲过如何获取一个元素相对于浏览器的位置，大家可以去自己调用下对应的方法
function isBump(obj1, obj2) {
  var L1 = obj1.offsetLeft
  var R1 = L1 + obj1.offsetWidth
  var T1 = obj1.offsetTop
  var B1 = T1 + obj1.offsetHeight
  var L2 = obj2.offsetLeft
  var R2 = L2 + obj2.offsetWidth
  var T2 = obj2.offsetTop
  var B2 = T2 + obj2.offsetHeight
  if (L2 > R1 || L1 > R2 || T2 > B1 || T1 > B2) {
    return false // 未碰撞，返回false
  } else {
    return true // 碰撞，返回true
  }
}
```

### 8、案例 2：判断元素是否在可视区（经典面试题）

判断一个元素是不是在可视区，只有元素全在可视区，才算是在可视区内

> 可以参考下图的分析

![image-20221012010911657](https://www.arryblog.com/assets/img/image-20221012010911657.3c3f9bd7.png)

```js
// 判断元素是否是在可视区内，只有当元素全部在可视区内才算是在可视区内
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()
  var T1 = rect.top
  var B1 = rect.bottom
  var L1 = rect.left
  var R1 = rect.right
  return (
    T1 >= 0 &&
    B1 <= document.documentElement.clientHeight &&
    L1 >= 0 &&
    R1 <= document.documentElement.clientWidth
  )
}

// 测试，自行在页面加一个.box的div
var box = document.querySelector('.box')
window.onscroll = function () {
  console.log(isElementInViewport(box))
}
```

## 六、节点操作

接下来我们来学习与节点相关的操作，在开始学习 DOM 的时候，我们提到过 DOM 的节点类型有以下 7 种

| 节点分类                  | 描述                                                        |
| :------------------------ | :---------------------------------------------------------- |
| Document 文档节点         | 整个 DOM 树的顶层节点                                       |
| DocumentType 文档类型节点 | 如 doctype 标签（`<!DOCTYPE html>`)                         |
| Element 元素节点          | 网页的各种 HTML 标，如：`<p>`、`<div>`                      |
| Attr 属性节点             | 元素的各种属性，如：`title='标题'`、`class='box'`           |
| Text 文本节点             | 标签之间或标签包含的文本                                    |
| Comment 注释节点          | 网页中的注释                                                |
| DocumentFragment 文档片段 | 文档片段，不存于 DOM 树上，是一种游离态，通常作为仓库来使用 |

在实际开发中，用到最多的是

- 文档节点
- 元素节点
- 属性节点
- 文本节点
- 文档片段

那我们如何检测节点的类型呢 ？其实每一个节点对象都有以下三个属性：

- nodeName 节点名
- nodeType 节点类型
- nodeValue 节点值

> 我们来看下不同的节点类型，对应以上三个属性的值

| 节点类型 | nodeName    | nodeType | nodeVulue |
| :------- | :---------- | :------- | :-------- |
| 文档节点 | `#document` | 9        | null      |
| 元素节点 | 标签名      | 1        | null      |
| 属性节点 | 属性名      | 2        | 属性值    |
| 文本节点 | `#text`     | 3        | 文本内容  |

```html
<div class="box" id="box"></div>
<script>
  // 获取元素节点 box
  var box = document.querySelector('.box')
  console.log('-----打印元素节点 相关信息----')
  console.log('节点名：' + box.nodeName)
  console.log('节点类型：' + box.nodeType)
  console.log('节点值：' + box.nodeValue)

  // 打印document 文档节点 相关信息
  console.log('-----打印document 文档节点 相关信息----')
  console.log('节点名：' + document.nodeName)
  console.log('节点类型：' + document.nodeType)
  console.log('节点值：' + document.nodeValue)
</script>
```

![image-20221006204144152](https://www.arryblog.com/assets/img/image-20221006204144152.45cdcf6c.png)

### 1、节点关系

> 页面节点之间存在以下关系

| 关系           | 考虑所有节点    |
| :------------- | :-------------- |
| 子节点         | childNodes      |
| 父节点         | parentNode      |
| 第一个子节点   | firstChild      |
| 最后一个子节点 | lastChild       |
| 前一个兄弟节点 | previousSibling |
| 后一个兄弟节点 | nextSibling     |

> 我们以下面这个代码为例，来绘制元素节点之间的关系图

```html
<div class="box">
  <h3 class="title">我是h3标签</h3>
  <p class="p1">我是p标签</p>
  <div class="item">我是item</div>
</div>
```

![image-20221006213045829](https://www.arryblog.com/assets/img/image-20221006213045829.c651ce5d.png)

```html
<div class="box">
  <h3 class="title">我是h3标签</h3>
  <p class="p1">我是p标签</p>
  <div class="item">我是item</div>
</div>

<script>
  var box = document.querySelector('.box')
  console.log(box.parentNode) // body
  console.log(box.firstChild) // #text
  console.log(box.lastChild) // #text
  console.log(box.firstChild.nextElementSibling) // h3.title

  var p = document.querySelector('.p1')
  console.log(p.nextSibling) // #text
  console.log(p.previousSibling) // #text
</script>
```

![image-20221006212802065](https://www.arryblog.com/assets/img/image-20221006212802065.9507cb2c.png)

注意点：文本节点也属于节点

文本节点（即实是空白的文本）也属于节点。

而我们实际开发中，我们常常希望获取的是元素类型的节点，所以文本类型的节点给我们带来了很大的干扰。

### 2、 只考虑元素节点

- 实际上在 DOM 中还提供了一些只考虑元素节点的属性，如下表
- 我们把考虑所有节点的属性与只考虑元素节点的属性作如下对比

| 关系           | 考虑所有节点    | 只考虑元素节点         |
| :------------- | :-------------- | :--------------------- |
| 子节点         | childNodes      | children               |
| 父节点         | parentNode      | parentNode             |
| 第一个子节点   | firstChild      | fristElementChild      |
| 最后一个子节点 | lastChild       | lastElementChild       |
| 前一个兄弟节点 | previousSibling | previousElementSibling |
| 后一个兄弟节点 | nextSibling     | nextElementSibling     |

> 我们以下面这个代码为例，来绘制元素节点之间的关系图

```html
<div class="box">
  <h3 class="title">我是h3标签</h3>
  <p class="p1">我是p标签</p>
  <div class="item">我是item</div>
</div>
```

![image-20221006210620804](https://www.arryblog.com/assets/img/image-20221006210620804.bd1e9dc9.png)

```html
<div class="box">
  <h3 class="title">我是h3标签</h3>
  <p class="p1">我是p标签</p>
  <div class="item">我是item</div>
</div>

<script>
  var box = document.querySelector('.box')
  var _children = box.children
  console.log(_children)
  console.log(_children[0])
  console.log(box.parentNode) // body
  console.log(box.firstElementChild) // h3.title
  console.log(box.lastElementChild) // div.item
  console.log(box.firstElementChild.nextElementSibling) // p.p1

  var p = document.querySelector('.p1')
  console.log(p.nextElementSibling) // div.item
  console.log(p.previousElementSibling) // h3.title
</script>
```

![image-20221006223929261](https://www.arryblog.com/assets/img/image-20221006223929261.c34d9350.png)

### 3、手写 children 方法

实现思路

- 用`当前节点.childNodes`获取所有子节点，然后遍历所有子节点，判断节点的类型 nodeType 是否为 1
- 如果为 1，则把这个节点添加到数组中
- 最后遍历完，把数组作为返回值返回。

```js
HTMLElement.prototype._children = function () {
  // this 指向，谁调用_children 那this就是谁
  var nodes = this.childNodes
  var elementArr = []
  // 过滤节点类型，只留下元素类型节点
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === 1) {
      // 是元素类型节点，保存
      elementArr.push(nodes[i])
    }
  }
  return elementArr
}
```

### 4、手写 prevElementSibling 方法

实现思路

- `当前节点.previousSibling`
- 如果返回值为`null`，说明没有上一个元素兄弟节点，直接将返回值`null`返回
- 如果返回值不为 null，要判断节点类型是否为元素节点，即判断`返回节点.nodeType === 1`是否成立
- 如果不成立，则继续用`返回的节点.previousSibling`，一直重复上面过程，至到`返回节点.nodeType === 1`成立或返回值为 null，就不再继续查找了。

```js
HTMLElement.prototype._prevElementSibling = function () {
  // this，谁打点调用这个方法，this是谁
  var nextElement = this.previousSibling // 找上一个兄弟节点
  // if(!nextElement) return null;
  // 如果返回的兄弟节点不为null 且节点类型不等于1，说明当前兄弟节点不是元素类型节点，需要继续向上查找。
  while (nextElement && nextElement.nodeType !== 1) {
    nextElement = nextElement.previousSibling
    // if (!nextElement) return null;
  }
  return nextElement // 如果上面为null，直接返回null,如果不是，返回对应元素节点
}
```

### 5、 修改节点内容 innerText 和 innerHTML

改变元素节点中的内容可以使用两个相关属性

- innerHTML：更改元素的内容，更改的内容能以 HTML 语法的形式显示
- innerText：更改的内容，更改的内容只能以纯文本的形式显示

```html
<div class="box"></div>
<div class="box"></div>

<script>
  var box = document.getElementsByClassName('box')
  box[0].innerHTML = '<h3>我是h3标签</h3>'
  box[1].innerText = '<h3>我是h3标签</h3>'
</script>
```

![image-20221004231923269](data:image/png;base64,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)

### 6、节点创建与移动

DOM 中提供了以下方法，用来创建节点，并将创建好的节点插入到页面当中

| 操作节点方法                             | 作用                                                       |
| :--------------------------------------- | :--------------------------------------------------------- |
| `document.createElement('标签名')`       | 用来创建一个指定的元素节点对象，并将创建好的对象作为返回值 |
| `document.createTextNode('文本内容')`    | 用来创建一个文本节点对象，并将创建好的对象作为返回值。     |
| `父节点.appendChild('子节点对象')`       | 用来向父节点的最后面添加一个新的子节点。                   |
| `父节点.insertBefore('新节点','旧节点')` | 将新创建的"孤儿节点"插入到页面原有的节点的前面             |

### 6.1、document.createElement()

- `document.createElement()`方法用于创建一个指定 tagName 的 HTML 元素
- 在创建元素之前，会将传入的 tagName 转化为小写，即生成的标签名是小写名
- 创建出来的节点是一个 **“孤儿节点”**，他并不在 DOM 树上，而是独立存在的。
- 所以我们必须使用`appendChild()`或`insertBefore()`方法将孤儿节点插入到 DOM 树上

```js
var myDiv = document.createElement('div') //  创建一个标签名为div的元素节点
console.log(myDiv) // <div></div>
```

### 6.2、document.createTextNode()

用来创建一个文本节点对象，并将创建好的对象作为返回值

```js
var text = document.createTextNode(data)
```

- `text` 是一个文本节点。
- `data` 是一个字符串，包含了要放入文本节点的内容

```js
var text = document.createTextNode('我是文本节点内容')
console.log(text) // "我是文本节点内容"
```

### 6.3、appendChild()

- 方法将一个节点附加到指定父节点的子节点列表的末尾处
- 如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置
- 这意味着，一个节点不可能同时出现在文档的不同位置

> 返回值：`appendChild()` 返回的是被附加的子元素

```js
element.appendChild(child)

// element  将节点追节到的那个父节点
// child 要追加给父节点的节点（通通是一个元素节点）
```

**代码演示**

> 创建一个有内容的 p 标签，插入到页面的 div 标签中

```html
<div class="box"></div>
<script>
  // 获取页面元素
  var box = document.getElementsByClassName('box')
  // 创建 p元素
  var pNode = document.createElement('p')
  // 创建文本节点
  var pTxt = document.createTextNode('我是p标签的文本')
  // 将文本节点插入到创建的p标签中，并打印返回值
  console.log(pNode.appendChild(pTxt)) // "我是p标签的文本"
  // 将创建的p元素，插入到页面div标签中
  box[0].appendChild(pNode)
</script>
```

### 6.4、insertBefore()

- 方法在参考节点之前插入一个拥有指定父节点的子节点
- 如果被插入节点已经有父节点，则会从当前位置移动到新插入位置

> 返回值：返回被插入的子节点

```js
var insertedNode = parentNode.insertBefore(newNode, referenceNode)

// insertedNode 被插入节点（即 newNode)
// parentNode 新插入节点的父节点
// newNode 用于插入的节点
// referenceNode 参考节点，newNode将插入到这个节点前
```

> 如果 `referenceNode` 为 `null` 则 `newNode` 将被插入到子节点的末尾

**代码演示**

> 创建一个 li 标签，插入到 ul 标签的第 3 个子标签的前面

```html
<ul>
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>

<script>
  // 获取页面元素
  var oul = document.getElementsByTagName('ul')
  // 创建li元素
  var li = document.createElement('li')
  // 创建文本节点
  var liTxt = document.createTextNode('我是新创建的li文本')
  // 将文本节点插入到创建的li标签中
  li.appendChild(liTxt)
  // 将新创建的li，插入到ul原来的第3个li标签前面
  oul[0].insertBefore(li, oul[0].children[2])
</script>
```

![image-20221006223617946](data:image/png;base64,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)

**移动节点**

```html
<h3 id="title">我是标题</h3>
<div class="box">
  <p>我是p</p>
  我是box
</div>

<script>
  var h3 = document.getElementById('title')
  var box = document.querySelector('.box')
  var p = box.firstElementChild
  // 如果第二个参数为null，则新节点将成为父元素的最后一个节点
  box.insertBefore(h3, null)
  // box.insertBefore(h3, p);
</script>
```

![image-20221006230432229](https://www.arryblog.com/assets/img/image-20221006230432229.aec16641.png)

### 7、案例 1：请动态创建出一个 15 行 10 列的表格

```html
<style>
  td {
    width: 30px;
    height: 30px;
    border: 1px solid #000;
  }
</style>
<div id="table-list"></div>

<script>
  // 请动态创建一个15行10列的表格
  var mytable = document.getElementById('table-list')
  var table = document.createElement('table')
  for (var i = 0; i < 10; i++) {
    // 创建新的tr标签
    var tr = document.createElement('tr')
    for (var j = 0; j < 10; j++) {
      // 创建新的td标签
      var td = document.createElement('td')
      // 让tr追加td标签
      tr.appendChild(td)
    }
    // 让mytable追加tr标签
    table.appendChild(tr)
  }
  mytable.appendChild(table)
</script>
```

![image-20221006224854598](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXAAAAFwCAIAAAAue7doAAAGMUlEQVR4nO3ZwQqcQBRFwXTw/3+5s1Bk0Fme6UBTtYsEbtwcfJMx5/wDUPj7v/8BwD4EBcgICpARFCAjKEDmePx5jLFg9fyvJVu2bO2xdXsG5f03cp/vacuWrT22Tk4eICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgc70djjGXztmzZ2mPrWpxzLp4EduXkATLPk2fNN9L5WWTLlq09tm5ffkP59RH0+Z62bNnaY+vk5AEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAzPF+NMZYNm/Llq09tq7FOefiSWBXTh4g8zx51nwjnZ9FtmzZ2mPr9uU3lF8fQZ/vacuWrT22Tk4eICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgc70djjGXztmzZ2mPrWpxzLp4EduXkATLPk2fNN9L5WWTLlq09tm5ffkP59RH0+Z62bNnaY+vk5AEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAzPF+NMZYNm/Llq09tq7FOefiSWBXTh4g8zx51nwjnZ9FtmzZ2mPr9uU3lF8fQZ/vacuWrT22Tk4eICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgc70djjGXztmzZ2mPrWpxzLp4EduXkATLPk2fNN9L5WWTLlq09tm5ffkP59RH0+Z62bNnaY+vk5AEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAzPF+NMZYNm/Llq09tq7FOefiSWBXTh4g8zx51nwjnZ9FtmzZ2mPr9uU3lF8fQZ/vacuWrT22Tk4eICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgc70djjGXztmzZ2mPrWpxzLp4EduXkATLPk2fNN9L5WWTLlq09tm5ffkP59RH0+Z62bNnaY+vk5AEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAzPF+NMZYNm/Llq09tq7FOefiSWBXTh4g8zx51nwjnZ9FtmzZ2mPr9uU3lF8fQZ/vacuWrT22Tk4eICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgc70djjGXztmzZ2mPrWpxzLp4EduXkATLPk2fNN9L5WWTLlq09tm5ffkP59RH0+Z62bNnaY+vk5AEyggJkBAXICAqQERQgIyhARlCAjKAAGUEBMoICZAQFyAgKkBEUICMoQEZQgIygABlBATKCAmQEBcgICpARFCAjKEBGUICMoAAZQQEyggJkBAXICAqQERQgIyhARlCAzPF+NMZYNm/Llq09tq7FOefiSWBXTh4gIyhARlCAzD+vyX07pri/NwAAAABJRU5ErkJggg==)

### 8、案例 2：请制作九九乘法表

```html
<style>
  table {
    background-image: linear-gradient(to right, pink, skyblue);
  }
  td {
    width: 120px;
    height: 35px;
    border: 1px solid #000;
    text-align: center;
  }
</style>
<table id="mytable"></table>

<script>
  var mytable = document.getElementById('mytable')

  for (var i = 1; i <= 9; i++) {
    // 创建了新的tr标签
    var tr = document.createElement('tr')
    for (var j = 1; j <= i; j++) {
      // 创建新的td标签
      var td = document.createElement('td')
      // 设置td内部的文字
      td.innerText = i + '*' + j + '=' + i * j
      // 让tr追加td标签
      tr.appendChild(td)
    }
    // 让mytable追加tr标签
    mytable.appendChild(tr)
  }
</script>
```

![image-20221006225221315](https://www.arryblog.com/assets/img/image-20221006225221315.6b08f1af.png)

### 9、案例 3：创建电影座位号

> 根据需求，创建几行几列的电影座位号

![image-20221012180858393](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAADmCAIAAADJMBKGAAAY20lEQVR4nO3dPW/iWNsH8MuP7g8BEim8mnYaKkDaBmk+wBoRKaa6lZIuSodDQewumi7l6q4wUhDeDzASzUg2Fc22M7gIEv4W5ykwYN4M5BgfH+f/q2Yw2j3/Ofbl82InCmOMAADgo/5PdAMAAOSGMgoAwAVlFACAC8ooAAAXlFEAAC4oowAAXFBGAQC4oIwCAHBBGQUA4PKf8786m82u146r+uOPP2KOIlfWIJdcPmeuqAvK6EX/3ew4pxeRKzuQSy6fOdcaJvUAAFxQRgEAuKCMAgBwQRkFAOCCMgoAwAVlFACAS/pl1LOUNcs7+JW53Th2KLticgX27eaY8ixXsrj+CgaN9bHGIBDTwA864zxcBbQmqbaMT0yu6CHpTsVT/TW3G/FfuKaUy2hg347rbGnRbxq1gz1903LSbRa3uFzBoN366oYHmWt2a8qtLUnJie2vidWm1/CgZzp6UZ5KevI8JCKiud3W5ToTY3PN/SmR6bGNp6rAtl7iRH8Fg4Zy0ypvonXSDsbO9vv37/O/fBbPJNL679G/mi5jC1tb/iERJ5t99VwXHT1bxnIt+k2iXgKdlp1cbo+oqWk7peejxOd67yeVJerT5orK0tpopSPgNgJw0MSqdU33e0N0O5KlqSXRTUha8HPkNPv3FZFtuOxl0ER5VtXQ7IWet349kSvwp0RlCc/muFzBoN0amu6bjDfBg7nCD6s0FtUsbnu55r5DJP9tYSdXMP7Hoa+PBaFtSn00ulkJflHf2ehObPzknJlrYhV1h3p1aepNbC7vOTxW/PUo2UwiLldg39aMnivlyXniPHRaNzLuL8Xk8v0haV/U9amoKA17nnbrUi+jJX0Urie80oOAPbVrOSNXMGgoVYOa/YU0S/snclWfVotD38aSbdYfzxWOrCXqo6iY/qp0Not5nkndmkyVNPY8dPTi+Ft4eGFT6yb1hyvOX0ZNfqmYuSaRZi92PpV+i+lALtdc/nMnsQmzlI1cG0n1muBcV9u+yGR/ybnVuZXLNXcvq/1PPkKiLSZVbZLzyxfahmvYyeVZSs1YnrKSjnFCcf1VUMtEUz/1+VQS1rkC+7uxNfO9aTlERlXMVJHbyf6SVDSXqjZJ+6LuHE2Z2DIarmsIbcM1bOXynmsGmS4byb+ZFtdf0m6dUSRXQX/bHmZsRqMydt9WfwXzrSWXwJ+KaFIiorkK6tedW4XvD1Nv0ZVGuYd5ZmSKseg36eA0UL5JfVyuuIkVD9G5Fv1mpI88kxKKKTrXNrkm9bG5Fra2CZKn/nrva5Esbo/SWayISnttdGFrmxJ+ZP1CvjIal2u1Krrj+ms31++vaLQETtylDOSKkKuMnsrl9jYHk3pePQu5tk/FZErHRc1WGGPxw9W12Wwm6S8DOPm7YpArO5BLLp82V1SW3mICAJAQyigAABeUUQAALiijAABcUEYBALhc9hOeZrPZldohFnLJBbnkktdcaxc88AQAAPswqQcA4IIyCgDABWUUAIALyigAABeUUQAALiijAABcUEYBALigjAIAcEEZBQDgcsHLoPK+0XXyx8qm1pJkIZdckEsu5//Y5sveqZf0p1if/A5yZQdyyeUz51rDpB4AgAvKKAAAF5RRAAAuKKMAAFxQRgEAuKCMAgBwSb2MTixlo2HPo8e86DFFUZRnL+3mfVhcLiIimtuNzRcsaYIdyzXZ7avwG4NAZGvPF99f0aMSnYR0QS5peioULQ57l0/04rq10w+Wchn1rOq0/86WFja1bhRrsjo496dEpsc2nqrpNu/DYnMRBYOGctMqb6J1JAl2PFelw7YtbI3IfLwrCG7yWWL7a2IpVUOzF4wxxlyzW5OnksblCgYNZXPULetFeXIF9u24vorVbxq1aCWd242bFq37a9gqpp+Lne3379/nf/k8i36TqOeGf3vvaztlNAknm41cZ9vOtcU1iValh4vwXG6PqNnfJPFMIvNg5ouIzrXXQZ5JpK1r7ocJyLXd8kP9lUauqKytjWpqSXQTkhb8HDnN/n1FdDuuKRi8GNIMRT+luT8lKquRDqrUTXL8/dUnyXjjLml/1TfBSqpGzuhnqjN7sWXU94ekfVHDv819R2hrkhPNFYz/ceirmosCs91fG97fuqPZ95KsVOzbylX9b18bttrh0qFnVQ1po+3219SPFJe5P935RA7LHnnVl+Ot/dtDSS0TOb/8NNsksIwG9m3NIK3xZ7TCOK0bOZf2N3Zyhaey9xy7ASWBg/1FJP1QdC9XSR8tlw4VRVFq5LGRlNG2c5X0xx45ent17gX2Q0umUctmE+lFfY/vEVVtpteuJVFl1LOUYmtIpjfS17P46K6FZ5JMS/trh3IROXpx/C1Mtr8BJYPDuZaHZB6KHsgVDBrLa3XZXep3MZu/fA7kqj4xt7cephT9B9cU2sTLlPRReAG90kP2nnW50pprjIWtEdHJZeCFrcm1BH4kl2vSzrbM/icfITrXSkIr+muic+3vlSWzeyY6156Edj5FbJ1FeuRAipSur6i0R6PBoFHUHeq5jO2Pa7YU1HJajUrA8Vyq2txZTxQw6fiwk/3l/TCo2ajLtjF4NNf+WhupajPttbYPO//6ornvkFmXcucz0iMltXxohffQCv4VpVtG53ZbdzR7cfCB0GC+9W8R+NO0msUtLldB/bpzEfr+ML2mcYntLyI6sE8qhVO5ti/LYxtr2XO6v9YC+7tBvbqcSzHRHlHVJjn/jDcdNhkfXMG/riuNcg9aPqF9bLS9sLXN4NwzSZ7nEONzLecd6yxuj2RZrDiRi4XdlOwjscJzbXfQot8kWZ4bPXV9mVvPWiYRiqUzqffMSCnY65GtWpHe88tR6ZfRfdtP0q4kdXGmdfrG5QrXa1bJZDl9T+Y6XWcvl5lcK9FHuzlkINeyACUZiqW1NroVbX/d09tcXonUUHZhsxXG2KF/+gNms5mkvwzg5O+KQa7sQC65fNpcUVl7iwkAQDIoowAAXFBGAQC4oIwCAHBBGQUA4PKfi749m82u1A6xkEsuyCWXvOZau+CBJwAA2IdJPQAAF5RRAAAuKKMAAFxQRgEAuKCMAgBwQRkFAOCCMgoAwAVlFACAC8ooAACXC14GlfeNrpM/Vja1liQLueSCXHI5/8c2X/ZOvaQ/xfrkd5ArO5BLLp851xom9QAAXFBGAQC4oIwCAHBBGQUA4IIyCgDABWUUAICLsDLqPSuNQbD76cRSVg4czbJIyxWlYc+3j87txvrgrS1TsPhcS3O7oVhe2i3jE5crsG8jB5+lShbbX8Fgcxrm6vpaWQa0Jum2TUgZXUatdQ99Xp323xljjDG3rBflOYM9a9NytrCpdRPpy7nduGmRvVjmMoetYj5yLb+gKMpNyxHVwA+KyxUM2q2vbniMuWa3Js+dL7a/JlabXsNjnunoRXkq6cnzkIiI5nZbF3QmsrP9/v37/C8fseg3SbMXjLkmLf+wtveJZxJp63+7DzvZ7CRy7Vj0m0S98FJ0e0TN/iZYXnIxzyQyXcYWtrb8QyLE59qRm/4699BlspPL7RE1NY3I9BL4f1zU7JRHowX9jY3uCgeOzP0pUVmNHKrUTXL8I6N3eXjjLml/1TfBSqpGzuinLAOB4yodxjpV0a0AICKaWLWu6X5vCPmfZ2uLaepHisvcn+58Ig3fH5L2RSU6dHsoqWUi55cvqnEcIrlyJS5XsOzAUspNSsTRXMGg3Rqa7pOkN8H9XJ5VNTT7XlSezJTRkv7YI0dvrxaPA/tBuhW3pcC+rRmkNf48NOgmIlLVZqoNSsjJXJKKzTWxirpDvbqE9eZALu853KMp/nqUdiaxnyuwb2tGzz08zU1FZsooUfWJuT2ndRN2tP/gmqKbdDnPUoqtIZneSJdy/HLMZ8wVDBpK1aBmfyHfqO1wrurTajHv21i+zXqig7myMLLOUBmlaDcz1intTYezLRg0FKVmkNZ/Z51KzBd9f5haoxJwdi7JxObyLEUp6g71XPamS3MKEtGZ/VXpLGzN0f+W5ZEROpZrYhV16r8LHllnq4xumfsOmXVJrttg0AivOrY9rimp5UMrvLKsMB7NJbnYXJ61ulyZbOPQ8/ursDwxJdnCPZIrsL8bROspbPjsnVGNe7b0GjJbRgP7uyHNmtTcbuuOZi8OXXWq2iTnn/Gmjk7G0qwwxuWSWWwu77lmkOnKeNu4pL9k2jo7mqugv20/efTeXz3wlGr3ZaiMBgNrfQPxnovC1zvOF/wcOWQ+Hl7hLugPJg1b7XAdarml+CrFJRqbS2KxubxxlwTu+fKIzRXYt5E3zSZWUXdkiZn98zBDZbRwd08P4di89m9/IdlOolFTdqymFZXO8qWRZbKpvRC4pXi547nkFpdr1VkyvhJ6LFdBf6uP159Vp/33I09wZ1Smz0OFMXbmV2ezmaS/DODk74pBruxALrl82lxRGRqNAgDICGUUAIALyigAABeUUQAALiijAABc/nPRt2ez2ZXaIRZyyQW55JLXXGsXPPAEAAD7MKkHAOCCMgoAwAVlFACAC8ooAAAXlFEAAC4oowAAXFBGAQC4oIwCAHBBGQUA4HLBy6DyvtF18sfKptaSZCGXXJBLLuf/2ObL3qmX9KdYn/wOcmUHcsnlM+daw6QeAIALyigAABeUUQAALiijAABcUEYBALigjAIAcBFWRr1npTEIdj4MBg1lZf+oFA7mWlsGtCZptigZh3J5lrLt2RPTOA5H+2tub85FxZIu2G6uyW5fSXqVHe6vaDoRJ6GAMrosJbXu3oGJ1aZXtuSZjl6Uq4+P5lqb223dSa9BCTmaa+5PiUyPbTxVBbTvo2L6Kxg0lJtWeROtI1Gww7kqHbZtYWtE5uNdQUwrLxdTN5SqodkLxhhjrtmtpV9JUy6jgX2rtOmVMdfcP1jpjNadWrnvN8n55afauo+LzbXi/a/lNDUtvVbxOyuXhGJzze227pge61TSbxin8/vL+1t3NPtekttDXC7vh0HN/mtYOqodz6TuOOU6etlbTNwK+hvTiYhkqY9nOiPXxKp1TfddfRlKNCA9mUtTSyk2JzFxuYKfI6fZf5WvhtL511cweDHIdKUZima9bmR0iykYtFtD05VqkhjLs6qGPDf/88x9iW4IZwvG/zj0VZWlwHyIXEPRE6r/7WvDVjtcABRzoWWrjHrP4TJx8dejXAtSsQL7tmb03JE0N//zOa0bifeXDvH9IWlf1PWpqCgNey66UYlaDkUlWhU9oaSPmFvWi4qiKEqNPJb+hZatMlp9Wi2AfxvLuI14UO5G1ivRXQvPJBFL+1fi6MXxt/VWDLVupHy44ohcDUUp3Hp6Ud/D7lK/K8qtnXLhyFYZ3ah0Frbm6H9Lf11OrKJO/ffcjKyPqHQWtkbdl5wM3Hruen+pcPdoEhk/pD8TQ5OxQVrjz7wMRcO7wqsertEX9DfX3MzxU5LVMkpUUMtEU1/uyzKwvxtbM9+blkNkVHM4VSyoZdFNSISqNkn7ou58khveD4OajbqUG4OHzP0pUXlrKVtVU3/IJ7tlNFj++8jd3wX9bftpvfe+Fj5rOdLljkbBfOuGH/hTUS1JVEH9unMR+v5QWGuS5o27pP1Vz81YdGnqR0/FcHU7zQZkp4wG9m3kXZGJVczXCk4O/WxvVgzD/nqV/d5Ay53fbm29Lu891wzS+v/NxZk4GRu7YzfJlfTHHjl6ezW3C+zbWvobaCk/NxqjoL/VLUWphX/V+u8sB9dkjhXuRvVnRVmVFzmfVz+kpI+YailFRV/+3XTz8tBI4E+JzHo+umml+sQWXxrFG6W1/Huzv2B6yjcKhTF25ldns5mkvwzg5O+KQa7sQC65fNpcUdmZ1AMASAllFACAC8ooAAAXlFEAAC4oowAAXC574Gk2m12pHWIhl1yQSy55zbV2wQNPAACwD5N6AAAuKKMAAFxQRgEAuKCMAgBwQRkFAOCCMgoAwAVlFACAC8ooAAAXlFEAAC4XvAwq7xtdJ3+sbGotSRZyyQW55HL+j22+7J16SX+K9cnvIFd2IJdcPnOuNUzqAQC4oIwCAHBBGQUA4IIyCgDABWUUAIALyigAABeBZdSzlENu7UBcm5ITTWd5oluTnEiuXPSU96w0Bns55nZD8piHcy3N7Ya05+ShXIF9GykgzwKSCSyj1Q7b9t7XiMwHvSCuTQnxLKVmNPsLxhhjbs+oSXvWbpnbDaU2tZexmPu1VZQ5VzBoKIpS6+4dmNuNmxaFMV1z2CqKuDI/7GguovAueNNyUm5TEo7lCgbt1ld3VURcs1tL/86XoUm997+W0+zfV0S3g99kbJDW/x7eD6pPrknGeCK4UfyWHfR6F97mlrlejg15Mi2wb5U2vTLmmnvHtmNWO55J3Rd7nnYTPyQuF00sRRnXGVvYWvot4xOXq3A3Yk/V1d+qHc+k4Wicbn9d9hbTFc3tly6ZXg6GonkV+P8SfVUjHVSt98j45RNJ12kF/Y3pRET+3iFv3CXNrm8ilVSNjNHPQL/LfsyYXESVzvLXV0p434vNlQFZGY3mZyhKRJX7ftNpPYQzC++5ZuQm2r9+5CIM/H93PpHf3J8SlaM3i5JaJnJ+ZfQChh3BsgNLqf5Ps1FGl0PRPKyKLhX0t+XSoaIoSo1c9paDaAX9waRhq72axQeDdmsotknpUNWm6CbAmSZWUXeoV6+e/mqSMlFGczUUpXCf9+VLuBWz+PKiKA1JFtdiVTrMMx19eXdQir8e3Z7oJgGsBIOGUjWo2V88pVxFM1FGvXGXtL/q8o/XQjtbMYW7kdvbzPHlVok8XvGk7q2W5pLvf4pBt9Q8S1GKukM9MTO/DJTRydggrfFnbi7G/a0YUr9oNPRzt7rm+0Myv6V957+uklommu6t92pfVCHNgTN4llIzSOu/M5b6OHRJfBn1fhjUbNTTXRK+uu2NF/+XQ001ZxdiMHgxyKznZikmpKpNcv4Zb7ovb7f5vPGeawaZLhvp4mqI8DLqjbs5mxjub8U0avnYQJvb1vop0YlV1B3T6+RrLEp73edZVUOzXwVeohBr+YDavdjzUHQZnftTyt3EsNJh731ab8Xo1H9nnRyM2kr6PbXDV+6q05yE2re1k1ab2ouRBE+MfmrrbU9Rr4SKfvy+pI+Wz9XmTE5zFe5G7E50I5JUDR9J31HpMNZJvTEJOpKLiOTuxP1c1Sx0lejRKACA5FBGAQC4oIwCAHBBGQUA4IIyCgDA5bKd+tlsdqV2iIVcckEuueQ115rCjj8YAQAAJ2FSDwDABWUUAIALyigAABeUUQAALiijAABcUEYBALigjAIAcEEZBQDggjIKAMDlgpdB5X2j648//og5ilxZg1xy+Zy5oi57p/78/252nNOLyJUdyCWXz5xrDZN6AAAuKKMAAFxQRgEAuKCMAgBwQRkFAOCCMgoAwCUjZTSwbxVrIroVyQkGDWXD8kS3JzFzexPs1g5ENyd5y4DPOekx71nZlqNTkQL7NhJMaPUQX0a9Z0VRiq2h6HYkaG639bLLQm7PqCkNey66VQnwrAd6XcUyh61i3ippYD+0HNGNSE7g/0vUW5+JjLFOVXSbkjG3G0qx9XUTrVMR2RyxZdSzFGX8jbH3via0HQkr6aPI+Vp9ck1yRj9zUHCqnTe9sPrzva3R0PeFNihhk79bQ01rim4GnBDYDy2n57KnrNwUxJbRakf0bQRgxbOqhum9NkS3I1naF1V0E5I2H4+GWv+/WamhJLqMfg5zf0pUVgunvymRud3WHdPLyySRyHuuGc3+fa5u6r6fp7WyleDnyKGyWhLdjgiU0WvzrJuWQ2Y9H9fnxAqX9G/8xxzNJIJBo9Y13c2SRX44ejFn+0v+L4eaqro+FRWlMRC8YoYyek1zu6HUDNL673kZtVU6qzX9+jg3m/W5G1mvVDubzSXXJKOWl0pKw1bxRz1M9t4nvSj24QqU0WvxnhXlpuWQ6bKRnqUJSEKqnfe+Nmz9Lf1jap510yJ7kZuR9RHVzntfI+NF9MAtIaa73l8q6Y89ou5YYB1FGb0K71mpdUmzF/l5xGRfSS0TTX25L8tg8GJszXyLrSFRt5aFqWLCSmpZdBMSoX7RqKmqO58IhTJ6BROr1iXTY6O7/C21ReRi66xwN2JbFv1m+Kyl9N03D7buA3N/KqoliSqo5Z0n7fxfgh/2RRlNnvfDoLzt+RIRBYNG5F0Rz7ppOXmMmSPj9mbFMOyvV9nvDURUue83jdp6XX5i1bqk2fcCp30oo9cxbK1nibnZJy3cjeo/1nFqU3vB8ri1nR8lffRtvO4vo+fmpb8K+htzv64usaohfOZ32S8RuZaSPmK66EYkpvrE2JPoRlxHjqOtFPS3HJ2LlQ5jHdGNuIpMnYoYjQIAcEEZBQDggjIKAMAFZRQAgAvKKAAAl8t26mez2ZXaIRZyyQW55JLXXGsKY0x0GwAAJIZJPQAAF5RRAAAuKKMAAFxQRgEAuKCMAgBwQRkFAOCCMgoAwOX/ATOVnsGV50HFAAAAAElFTkSuQmCC)

```html
<style>
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #taopiao {
    background-color: #ddd;
    margin: 10px auto;
  }
  #taopiao ul li div {
    float: left;
    width: 60px;
    height: 25px;
    margin: 5px;
    text-align: center;
    line-height: 25px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
  .selected {
    background-color: khaki;
  }
</style>
<body>
  <div id="taopiao"></div>

  <script>
    // 创建电影票座位
    function createSeats(el, rows, columns) {
      var ul = document.createElement('ul')
      var index = 0 // 座位号
      for (var i = 1; i <= rows; i++) {
        // 创建每一行li元素
        var li = document.createElement('li')
        for (var j = 1; j <= columns; j++) {
          var div = document.createElement('div')
          div.innerText = ++index
          // 把div添加到li中
          li.appendChild(div)
        }
        ul.insertBefore(li, ul.children[0])
      }
      // 动态计算ul的宽
      ul.style.width = (j - 1) * 72 + 'px'
      // 动态设置ul水平居中
      ul.style.margin = '0px auto'
      // 将ul添加到页面元素中
      el.appendChild(ul)
    }

    var taopiao = document.getElementById('taopiao')
    createSeats(taopiao, 6, 6)
  </script>
</body>
```

### 10、innerHTML 与 createElement 的效率问题

- innerHTML 更改元素的内容，更改的内容能以 HTML 语法的形式显示
- createElement 用于动态创建 HTML 元素，然后结合 appendChild 将元素插入到页面中

> 这两种方式都可以动态创建 HTML 元素，那一种效率更高呢 ？我们通过一个案例来分析

**案例**

- 在页面动态创建 100 个 li，插入到页面中

```html
<ul class="list"></ul>
<script>
  var oUl = document.querySelector('.list')
  // innerHTML实现
  console.time('innerHTML')
  for (var i = 1; i <= 100; i++) {
    oUl.innerHTML += '<li>这是第' + i + '条新闻</li>'
  }
  console.timeEnd('innerHTML')

  // createElement实现
  console.time('createElement')
  for (var j = 1; j <= 100; j++) {
    var oLi = document.createElement('li')
    oLi.innerText = '这是第' + j + '条新闻'
    oUl.appendChild(oLi)
  }
  console.timeEnd('createElement')
</script>
```

![image-20221025151126275](https://www.arryblog.com/assets/img/image-20221025151126275.5a342496.png)

以上代码中

innerHTML 的执行效率明显比 createElement 的方式要低很多，原因在于

- 每次迭代都要设置一次 innerHTML，在设置 innerHTML 前还要先读取 innerHTML。而且每次读取和插入都是把之前的所有节点读取出来。

> 所以我们最后是通过一个字符串来拼接所有内容，然后再一次性的插入到页面中。

- 而 createElement 每次迭代，只是把新创建的元素插入到之前元素的后面。

**优化版**

```html
<ul class="list"></ul>
<script>
  var oUl = document.querySelector('.list')
  console.time('innerHTML')
  var str = ''
  for (var i = 1; i <= 1000; i++) {
    str += '<li>这是第' + i + '条新闻</li>'
  }
  oUl.innerHTML += str
  console.timeEnd('innerHTML')

  console.time('createElement')
  for (var j = 1; j <= 1000; j++) {
    var oLi = document.createElement('li')
    oLi.innerText = '这是第' + j + '条新闻'
    oUl.appendChild(oLi)
  }
  console.timeEnd('createElement')
</script>
```

![image-20221025154016134](https://www.arryblog.com/assets/img/image-20221025154016134.2a026208.png)

### 10.1、innerHTML 安全问题

如果页面中需要提供用户输入的信息，那建议不要使用 innerHTML。因为有可能会造成`XSS`攻击。

- 所谓`XSS`攻击全称是`'Cross Site Scripting'`跨站脚本。
- 是指黑客往 HTML 文件中或者 DOM 中注入恶意脚本，从而在用户浏览页面时利用注入的恶意脚本对用户实施攻击的一种手段。

> 2015 年喜马拉雅就被爆出了对应的 XSS 漏洞，是因为用户在设置专辑名称时，服务器对关键字过滤不严格，可以将专辑名设置为一段 Javascript。

> 以下代码简单演示 innerHTML 造成的 XSS 攻击

```html
请输入标题：
<input type="text" name="" class="title" />
<button id="button">插入</button>
<div class="box"></div>

<script>
  var btn = document.getElementById('button')
  var title = document.querySelector('.title')
  var box = document.querySelector('.box')
  btn.onclick = function () {
    //如果用户输入内容为： <a href="" onclick='alert("攻击")'>用户标题</a>
    var value = title.value
    box.innerHTML = value
  }
</script>
```

![GIF-2022-10-25-16-06-14](https://www.arryblog.com/assets/img/GIF-2022-10-25-16-06-14.8c41a76c.gif)

### 10.2、innerHTML、createElement 总结

|               | 说明                                                                                                                                                |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| innerHTML     | 在操作时相对结构复杂，可读性不强，如果内容较少，可以使用，不过要注意把内容拼接成字符串，一次性插入到页面 同时，如果内容为用户输入时，要考虑安全问题 |
| createElement | 创建元素相对复杂些，但可读性强，如果内容较多，建议使用这种方式                                                                                      |

### 11、删除节点

DOM 中删除一个子节点，返回删除的节点。

```js
var oldChild = node.removeChild(child)
```

- `child` 是要移除的那个子节点。
- `node` 是`child`的父节点。
- oldChild 保存对删除的子节点的引用。`oldChild === child`

> **注意：** 节点不能主动删除自己，必须由父节点删除它

**代码演示**

```html
<div class="box">
  <h3 class="title">我是标题</h3>
</div>
<script>
  var box = document.querySelector('.box')
  var h3 = document.querySelector('.title')

  // 删除h3标签，方法一:先找到父节点，然后删除其子节点
  // var _h3 = box.removeChild(h3);
  // console.log(_h3);

  // 删除h3标签，方法二：通过自身调用parentNode，将自身删除
  h3.parentNode.removeChild(h3)
</script>
```

**删除一个元素的所有子节点**

```html
<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
</ul>

<script>
  var oUl = document.querySelector('.list')
  // 如果有第一个子元素，就将他给删除
  // while (oUl.firstChild) {
  //   oUl.removeChild(oUl.firstChild);
  // }

  // 最简单的方法
  oUl.innerHTML = ''
</script>
```

### 12、节点的替换（修改）

- **`replaceChild`** 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点

```js
parentNode.replaceChild(newChild, oldChild)
```

- newChild：用来替换 `oldChild` 的新节点。如果该节点已经存在于 DOM 树中，则它首先会被从原始位置删除。
- oldChild： 被替换掉的原始节点。

```html
<style>
  li {
    list-style: none;
  }
</style>
<ul>
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>

<script>
  // 获取页面元素
  var oul = document.getElementsByTagName('ul')[0]
  var firstli = oul.children[0]
  var lastli = oul.children[3]
  oul.replaceChild(lastli, firstli)

  // 创建新的元素来替换
  var oli = document.createElement('li')
  oli.innerHTML = '<p>我是新创建的</p>'
  oli.title = '我是新创建的'
  oul.replaceChild(oli, oul.children[1])
</script>
```

![image-20221006235056794](https://www.arryblog.com/assets/img/image-20221006235056794.43d6e288.png)

### 13、案例：交换两个元素在节点中的位置（阿里面试题）

> 实现思路

- 假设要交换以下中的**第 1 个 li**和**第 4 个 li**

```html
<ul class="list">
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>
```

- 我们可以先创建一个新的节点 newNode，插入到第 1 个 li 前面，用来占位（记录第 1 个 li 的位置）

```html
<ul class="list">
  <!--新建节点newNode，插入到此占位-->
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>
```

- 然后用**第一个 li**来替换**第 4 个 li**，在替换前，要先把**第 4 个 li 保存**起来，供后面使用
- 最后用**第 4 个 li**来替换之前新创建的节点`newNode`

> 如果传过来的节点中，有一个不存在，则返回 false ，如果替换成功，则返回 true

```html
<ul class="list">
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>
<script>
  function changeOfPosition(obj1, obj2) {
    // 如果传过来的节点，有一个不存在，就不做任何操作
    if (!obj1 || !obj2) return false
    // 首先创建一个新节点
    var newNode = document.createElement('div')
    // 把新创建的节点插入到 obj1的前面
    obj1.parentNode.insertBefore(newNode, obj1)
    // 用obj1替换obj2
    obj1.parentNode.replaceChild(obj1, obj2)
    // 用obj2替换newNode
    obj1.parentNode.replaceChild(obj2, newNode)
    return true
  }

  var liList = document.querySelectorAll('.list li')
  // 交换第1个和第3个元素位置
  changeOfPosition(liList[0], liList[3])
</script>
```

注：

以上代码，**交换的两个元素是兄弟关系**，**如果两交换的元素分别属于不同的父级呢 ？**

则上面代码是会报错的，主要问题在于调用`insertBefore` 和`replaceChild`的父级元素到底是`obj1`还是`obj2`的父素来操作。

> 修改后代码如下：

```html
<div class="box">box</div>
<ul class="list">
  <li>第一个li</li>
  <li>第二个li</li>
  <li>第三个li</li>
  <li>第四个li</li>
</ul>

<script>
  function changeOfPosition(obj1, obj2) {
    // 如果传过来的节点，有一个不存在，就不做任何操作
    if (!obj1 || !obj2) return false
    // 首先创建一个新节点
    var newNode = document.createElement('div')
    // 把新创建的节点插入到 obj1的前面
    obj1.parentNode.insertBefore(newNode, obj1)
    // 用obj1替换obj2,返回obj2
    obj2.parentNode.replaceChild(obj1, obj2)
    // 用obj2替换newNode,为什么不用obj1的父级，而要用newNode
    // 在上面用obj1替换obj2了，所以obj1的父级此时变成了obj2的父级
    newNode.parentNode.replaceChild(obj2, newNode)
    return true
  }

  var liList = document.querySelectorAll('.list li')
  var box = document.querySelector('.box')
  // 交换第1个和第3个元素位置
  changeOfPosition(box, liList[3])
</script>
```

### 14、克隆节点

- cloneNode 方法返回调用该方法的节点的一个副本。
- 也就是隆节点，克隆出来的节点是 **“孤儿节点”**

```js
var dupNode = node.cloneNode(deep)
```

- node 将要被克隆的节点
- dupNode 克隆生成的副本节点
- deep 是否采用深度克隆 .可选参数
  - 如果为 `true`，则该节点的所有后代节点也都会被克隆
  - 如果为 `false`，则只克隆该节点本身

> 在早期规范中，deep 的默认值是 true，现在的新规范里，把默认值变成了 false
>
> 所以考虑兼容问题，最好在克隆时把这个参数带上。

```html
<div class="box">
  <ul>
    <li>第一个li</li>
    <li>第二个li</li>
    <li>第三个li</li>
    <li>第四个li</li>
  </ul>
</div>

<script>
  // 获取页面元素
  var box = document.getElementsByClassName('box')
  // var box2 = box[0].cloneNode(); // 浅克隆
  var box2 = box[0].cloneNode(false) // 浅克隆
  console.log(box2)
  var box3 = box[0].cloneNode(true) // 深克隆
  console.log(box3)
  document.body.appendChild(box2)
  document.body.appendChild(box3)
</script>
```

![image-20221006233434902](https://www.arryblog.com/assets/img/image-20221006233434902.9a39a454.png)

温馨提示：

- 如果克隆的节点，设置了 id 名，则克隆后要修改 id 的名字，确保 id 的唯 一性
- 克隆一个元素节点会拷贝它所有的属性以及属性值，当然也就包括了属性上绑定的事件（比如`onclick="alert(1)"`），但不会拷贝那些使用`addEventListener()`方法或者`node.onclick = fn`这种用 JavaScript 动态绑定的事件。

### 15、DocumentFragment

DocumentFragment 文档片段接口，表示一个没有父对象的最小文档对象。

它被作为一个轻量版的 Document 使用，就像标准的 document 一样，存储由节点（nodes）组成的文档结构。与 document 相比，最大的区别是它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的**重新渲染**，且不会对性能产生影响。

- 他具有真实 DOM 的一切方法和属性，所以我们可以像操作真实 DOM 一样来操作他
- 你可以把他理解成**虚拟节点对象**，他的作用是充当其它要被添加到真实文档节点的仓库。而他自己永远不会被添加到真实的文档对中

> MDN 官方参考：[https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)

> 我们可能通过`document.createDocumentFragment()`方法来创建一个文档片段

```html
<ul id="list"></ul>
<script>
  var oUl = document.getElementById('list')
  // 创建一个文档片段，此时还没有插入到真实DOM树中，其存在内存中
  var fragment = document.createDocumentFragment()

  // for循环创建5个li，然后插入到ul中
  for (var i = 0; i < 4; i++) {
    var oLi = document.createElement('li')
    oLi.innerText = '第' + i + '个li'
    // 将创建的DOM先放在文档片段中，这样就不会造成频繁的操作真实DOM
    fragment.appendChild(oLi)
  }
  // 一次性将创建的5个oLi插入到真实的DOM树中
  oUl.appendChild(fragment)
</script>
```

DocumentFragment 文档片段的主要功能：

可以将频繁的 DOM 操作理改为一次性 DOM 操作，从页减少了页面的重排和重绘（减少 DOM 渲染的次数）

## 七、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

> 重点

### 1、根据真实 HTML 代码，绘制 DOM 树

> 按照自己的理解和课程中所讲的绘制 DOM 树

### 2、访问节点的常用方法

| 方法                       | 功能                                          |
| :------------------------- | :-------------------------------------------- |
| `getElementById()`         | 通过元素 id 名获取到元素                      |
| `getElementsByTagName()`   | 通过标签名获取元素，返回的是一个数组          |
| `getElementsByClassName()` | 通过 class 名获取元素，返回的是一个数组       |
| `querySelector()`          | 通过选择器得到元素,只能得到第一个被找到的元素 |
| `querySelectorAll()`       | 通过选择器得到元素，返回的是一个数组          |

注：

`getElementsByTagName()`与`getElementsByClassName()`方法，可以动态获取元素，如果页面中有新增或删除元素，获取元素的个数会自动变化到最新的。

### 3、如何访问和修改属性值

方式一：w3c 标准属性： **`对象.属性名`** 和 **`对象.属性名 = 属性值`**

```js
box.id // 获取属性
box.id = 'box1' // 修改属性值
```

方式二：自定义属性： **`对象.getAttribute(key)`** 或 **`对象.setAttribute(key,value)`**

```js
box.setAttribute('data', 'a') // 设置自定义属性
box.getAttribute('data') // 获取自定义属性值
```

方式三：HTML5 中自定义属性规范：`对象.dataset.属性名`（驼峰命名） `对象.dataset.属性名 = value`

```js
// 设置自定义属性 <div data-birth-date="20230501"></div>
box.dataset.birthDate = '20230501'
// 获取自义属性
box.dataset.birthDate
```

### 4、操作元素样式的方法

| 方式           | 说明                                                                                                       | 三者性能 |
| :------------- | :--------------------------------------------------------------------------------------------------------- | :------- |
| style 属性     | 通过操作 style 属性来给元素添加行内样式，每次添加是在原来基础上追加                                        | 最低     |
| cssText 属性   | 通过操作 cssText 来给元素添加行内样式，每次添加会把之前的样式全覆盖                                        | 低       |
| className 属性 | 通过操作 className 属性来更改元素的 class 属性值，从而引起样式的变化。className 没次操作也是直接覆盖之前的 | 高       |

- classList 对象提供了很多方法，可以帮助我们很方便的操作元素的 class 属性。常见方法如下

| 属性或方法                      | 说明                                                                                 |
| :------------------------------ | :----------------------------------------------------------------------------------- |
| length                          | 返回类名的个数                                                                       |
| `add()`                         | 在原有的类名基础上添加一个类名，如果这些类已经存在于元素的属性中，那么它们将被忽略。 |
| `remove()`                      | 在原有的类名基础上 移出某一个类名，使删除不存在的类值也不会导致抛出异常              |
| `toggle()`                      | 如果有这个类名 则删除这个类名，返回 false，如果没有 则添加减去，返回 true            |
| `item()`                        | 根据索引 获取类名                                                                    |
| `contains()`                    | 判断元素是否包含某一个类名                                                           |
| `replace( oldClass, newClass )` | 用一个新类值替换已有的类值，替换成功返回 true,替换失败，返回 false                   |

### 5、获取元素相关尺寸

- 重点掌握，同时要区分以下属性

| 属性                       | 分类       | 说明                                                                                                                               |
| :------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| offsetWidth / offsetHeight | 偏移尺寸   | offsetWidth 返回一个元素的布局宽度 标准盒模型下，包括：width、border、padding、滚动条宽 怪异盒模型下为：width                      |
| clientWidth / clientHeight | 客户端尺寸 | clientWidth 表示元素的内容区宽，在标准盒模型下，包括`width+padding`，不包括`border+margin+滚动条`                                  |
| scrollWidth / scrollHeight | 滚动尺寸   | scrollWidth 是元素内容宽度的一种度量，包括由于 overflow 溢出而在屏幕上不可见的内容 如果没有水平滚动条，其它大小与 clientWidth 相同 |

- 常握以下属性

| 属性         | 分类     | 说明                                                                                                |
| :----------- | :------- | :-------------------------------------------------------------------------------------------------- |
| offsetParent | 偏移尺寸 | 返回离当前元素最近的**定位祖先元素**或最近的`table,td,th,tody`元素                                  |
| offsetLeft   | 偏移尺寸 | 它返回当前元素(左边框）相对于其 `offsetParent`元素的左边框内壁的距离，相当于元素 `left+margin-left` |
| offsetTop    | 偏移尺寸 | 它返回当前元素(上边框）相对于其 `offsetParent`元素的上边框内壁的距离，相当于元素 `top+margin-top`   |
| scrollLeft   | 滚动尺寸 | 获取或设置一个元素的内容水平滚动的距离                                                              |
| scrollTop    | 滚动尺寸 | 获取或设置一个元素的内容垂直滚动的距离                                                              |

### 6、getBoundingClientRect()方法

- 浏览器在每个元素上都暴露了`getBoundingClientRect()`方法，返回一个 DOMRect 对象
- 访对象提供了元素的大小及其相对于**视口**（可视区）的位置

> 相关属性如下：

| 属性    | 说明                                   |
| :------ | :------------------------------------- |
| left、x | 元素左边框相对于**可视区**左边的距离   |
| top、y  | 元素上边框框相对于**可视区**顶部的距离 |
| right   | 元素右边框相对于**可视区**左边的距离   |
| bottom  | 元素底边框相对于**可视区**顶部的距离   |
| height  | 元素的高，包括 `height+padding+border` |
| width   | 元素的宽，包括 `width+padding+border`  |

![image-20221006195302347](https://www.arryblog.com/assets/img/image-20221006195302347-16676662758181.34bfe799.png)

### 7、节点操作

- 节点类型，及不同节点对象身上 nodeName、nodeType、nodeValue 值

| 节点类型             | nodeName    | nodeType | nodeVulue |
| :------------------- | :---------- | :------- | :-------- |
| 文档节点（Document） | `#document` | 9        | null      |
| 元素节点（Element）  | 标签名      | 1        | null      |
| 属性节点（Attr）     | 属性名      | 2        | 属性值    |
| 文本节点（Text）     | `#text`     | 3        | 文本内容  |

- 理清各个节点之间的关系，通过节点之间关系来访问到对应节点

| 关系           | 考虑所有节点    | 只考虑元素节点         |
| :------------- | :-------------- | :--------------------- |
| 子节点         | childNodes      | children               |
| 父节点         | parentNode      | parentNode             |
| 第一个子节点   | firstChild      | fristElementChild      |
| 最后一个子节点 | lastChild       | lastElementChild       |
| 前一个兄弟节点 | previousSibling | previousElementSibling |
| 后一个兄弟节点 | nextSibling     | nextElementSibling     |

- 节点的创建、移动、删除、替换、克隆

| 方法                                     | 说明                                                                                   |
| :--------------------------------------- | :------------------------------------------------------------------------------------- |
| `document.createElement('标签名')`       | 用来创建一个指定的元素节点对象，并将创建好的对象作为返回值                             |
| `document.createTextNode('文本内容')`    | 用来创建一个文本节点对象，并将创建好的对象作为返回值。                                 |
| `父节点.appendChild('子节点对象')`       | 用来向父节点的最后面添加一个新的子节点。                                               |
| `父节点.insertBefore('新节点','旧节点')` | 将新创建的"**孤儿节点**"插入到页面原有的节点的前面                                     |
| `父节点.removeChild(子节点)`             | 将子节点从父节点中移除，返回值为移出的子节点                                           |
| `父节点.replace(newchild,oldchild)`      | 用指定的节点替换当前父节点的一个子节点，并返回被替换掉的节点                           |
| `节点.cloneNode(布尔值)`                 | cloneNode 方法返回调用该方法的节点的一个副本,如果参数为 true，表示深克隆，否则为浅克隆 |

- innerHTML 与 createElement 效率问题
- DocumentFragment 文档片段

### 8、难点

- 手写 add、remove、toggle 方法，来操作元素的 class 属性
- 手写 children、nextElementSibling 方法
- 手写 getElementLeft 方法，计算元素与页面左边距离
- 求两元素中心点之间距
- 求出与当前元素最近的兄弟元素
- 判断两个元素是否发生碰撞
- 判断元素是否在可视区内
- 交换两个元素在节点中位置
