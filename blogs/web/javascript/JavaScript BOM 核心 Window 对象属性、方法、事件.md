# JavaScript BOM 核心 Window 对象属性、方法、事件



从本章开始，我们来学习 BOM 相关内容，在之前的 DOM 相关内容中，提到的和 window 对象有关的属性，部分也属于 BOM 相关内容，比如定时器。只是因为在 DOM 中要经常用到，所以就提前学习了。

**什么是 BOM**

- BOM（Browser Object Model）浏览器对象模型，是 JS 与浏览器窗口交互的接口
- BOM 的核心是 window 对象，表示浏览器的实例

> 接下来我们就来深入学习下 window 对象

## 一、window 对象



- `window`作为全局变量，代表了脚本正在运行的窗口，暴露给 Javascript 代码
- 在有标签页功能的浏览器中，每个标签都拥有自己的 window 对象
- 也就是说，同一个窗口的标签页之间不会共享一个 window 对象

**window 对象有两重身份**

- 在 ECMScript 中为 Global 对象，也就是后面常说的 Node 中的全局对象。
- 在浏览器窗口中为 window 对象，所有全局作用域下的 var 声明的全局变量和函数都是 window 对象的属性

### 1、全局变量是 window 属性



所有全局作用域下 var 声明的全局变量和函数都是 window 对象的属性

```js
var a = 2;
// hasOwnProperty 检测当前对象是否拥有该属性
console.log(window.hasOwnProperty("a")); // true
console.log(window.a); // 2
console.log(window.a == a); // true
```

- 多个 JS 文件之间是共享全局作用域的，即 JS 文件没有作用域隔离功能
- 创建`a.js`和`b.js`及`c.html`文件，在`c.html`页面引入`a.js`和`b.js`

```js
// a.js文件代码如下
var i=2;

// b.js文件代码如下
var i++;
<!-- c.html文件代码如下 -->
<script src="js/a.js"></script>
<script src="js/b.js"></script>
<script>
  console.log(i); // 3
</script>
```

### 2、内置函数普遍是 window 对象的方法



`setInterval()`、`alert()`、`Array` 等普遍是 window 的方法

```js
console.log(window.alert == alert); // true
console.log(window.setInterval == setInterval); // true

console.log(window.hasOwnProperty("setInterval"));

window.setInterval(function () {
  window.console.log("aaa");
}, 2000);
```

### 3、浏览器窗口大小



window 对象身上的以下 4 个属性用来确定浏览器窗品大小

| 属性名      | 说明                                                                  |
| :---------- | :-------------------------------------------------------------------- |
| innerWidth  | 返回浏览器窗口中页面可视区宽（不包含 浏览器边框和工具栏，包括滚动条） |
| innerHeight | 返回浏览器窗口中页面可视区高（不包含 浏览器边框和工具栏，包括滚动条） |
| outerWidth  | 返回浏览器窗口自身的实际宽                                            |
| outerHeight | 返回浏览器窗口自身的实际高                                            |

注：

因为 innerWidth 和 innerHeight 包括了滚动条的宽和高，所以很多时候我们获取页面可视宽和高是通过。

`document.body.clientWidth || document.documentElement.clientWidth` 来实现

```js
// 浏览器窗口中页面视口大小 包括滚动条
console.log("innerWidth:" + window.innerWidth);
console.log("innerHeight:" + window.innerHeight);
// 浏览器窗口大小
console.log("outerWidth:" + window.outerWidth);
console.log("outerHeight:" + window.outerHeight);

// 页面可视区大小（不包括滚动条）
console.log("clientWidth:" + document.documentElement.clientWidth);
console.log("clientHeight:" + document.documentElement.clientHeight);
```

![image-20221201145847880](https://www.arryblog.com/assets/img/image-20221201145847880.57189c9a.png)

### 4、滚动距离

| 属性                 | 说明                              |
| :------------------- | :-------------------------------- |
| `window.scrollX`     | 返回文档/页面水平方向滚动的像素值 |
| `window.scrollY`     | 返回文档在垂直方向已滚动的像素值  |
| `window.pageXoffset` | 相当于 scrollX 的别名             |
| `window.pageYoffset` | 相当于 scrollY 的别名             |

注：

通常获取页面的水平和垂滚动距离还会通过如下代码获取

- 文档水平滚动距离： `document.documentElement.scrollLeft || document.body.scrollLeft`
- 文档垂直滚动距离： `document.documentElement.scrollTop || document.body.scrollTop`

```js
console.log("scrollX:" + window.scrollX);
console.log("scrollY:" + window.scrollY);
console.log("pageXoffset:" + window.pageXOffset);
console.log("pageYoffset:" + window.pageYOffset);
console.log("scrollTop:" + document.documentElement.scrollTop);
console.log("scrollLeft:" + document.documentElement.scrollLeft);
```

| 方法            | 说明                                                                          |
| :-------------- | :---------------------------------------------------------------------------- |
| `scroll(x,y)`   | `x，y`表示相对视口距离的`x`和`y`坐标，`scroll(x,y)`表示文档滚动到指定坐标位置 |
| `scrollBy(x,y)` | `x`表示水平方向上要滚动的偏移量，`y`表示垂直方向上要滚动的偏移量              |

```html
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 3000px;
    width: 3000px;
  }
  button {
    width: 150px;
    height: 50px;
    position: fixed;
    right: 50px;
    top: 200px;
  }
  .by {
    top: 280px;
  }
</style>

<button class="to">滚动到指定位置</button>
<button class="by">滚动一定距离</button>

<script>
  var button = document.getElementsByTagName("button");
  button[0].onclick = function () {
    window.scroll(100, 200); // 点击后，跳转到与视口x=100,y=200的坐标位置
  };

  button[1].onclick = function () {
    // window.scrollBy(0, -100); // 每次点击，滚动条向上滚动 100px
    window.scrollBy(0, 100); // 每次点击，滚动条向上滚动100px
  };
</script>
```

### 5、window 其它属性



**重点提示**

- 因为 window 对象的属性在全局作用域中有效，所以很多**浏览器 API**及相关**构造函数**等都以 window 对象属性的形式暴露出来
- 总结一句话：window 对象身上的属性并非全是与 BOM 操作相关的方法和属性

> 接下来我们学习`window`对象身上与`BOM`相关的属性

| 属性      | 说明                                         |
| :-------- | :------------------------------------------- |
| location  | 获取当前面面的 URL 信息                      |
| history   | 对象提供了操作浏览器**会话历史**的接口       |
| navigator | 对象包含用户此次活动的浏览器的相关属性和标识 |

## 二、window.location 对象



**`window.location`** 只读属性，返回一个 `Location`对象，其中包含有关文档当前位置的信息。

`Location` 接口表示其链接到的对象的位置（URL）

```js
location.__proto__ === Location.prototype; // true
window.location;
```

![image-20221108141335356](https://www.arryblog.com/assets/img/image-20221108141335356.10d5438b.png)

> 强调：location 对象可以赋值，重新赋值 URL，相当于跳转到当 URL

```js
// 跳转到  http://www.icodingedu.com 这个页面
window.location = "http://www.icodingedu.com";
```

### 1、URL 组成部分



- URL（Uniform Resource Locator）统一资源定位符
- URL 无非就是一个给定的独特资源在 Web 上的地址
- 理论上说，每个有效的 URL 都指向一个唯一的资源
- 这个资源可以是一个 HTML 页面，一个 CSS 文档，一幅图像，等等

**URL 的组成部分**

```css
protocol://host[:port]/path/[?query]#fragment  /* [] 方括号表示可选 */
http://www.arryblog.com/guide/html5/html5.html?targetId=12&preview=0#top
```

| 组成     | 说明                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| protocol | URL 对应的协议名，常用的协议有：`http`、`https`、`ftp`、`maito`、`file`等            |
| host     | 主机（域名），如 `www.arryblog.com`                                                  |
| port     | 网络端口号，可选。如果省略，表示使用默认的端口。如 http 的默认端口是 80              |
| path     | 路径，用来表示服务器上的一个目录或文件路径 如：`guide/html5/html5.html`              |
| query    | 查询字符串（参数），以键值对的形式表示，多个用&符号分隔，如：`targetId=12&preview=0` |
| fragment | 片段标识符，`#`后内容，用来标记已获取资源的文档内的某个位置。如：常见锚点 `#top`     |

### 2、location 对象的属性

location 对象上有很多属性，以下就是其中的一部分

| 属性                | 说明                                         |
| :------------------ | :------------------------------------------- |
| `location.href`     | 获取完整的 URL，也可以重新设置 URL           |
| `location.host`     | 获取主机名（域名）                           |
| `location.port`     | 获取端口号，如果端口号省略，返回空字符串`“”` |
| `location.pathname` | 返回 URL 中 path 路径部分                    |
| `location.search`   | 返回 URL 中的 query 查询字符串部分内容       |
| `location.hash`     | 返回 URL 中的 fragment 部分内容。            |

![image-20221108142440670](https://www.arryblog.com/assets/img/image-20221108142440670.abc8afb5.png)

### 3、处理 URL 中 query 部分数据



写一个函数，把 URL 中的 query 部分参数转换成对象中的属性和值，然后将这个对象返回，同时要考虑参数的类型。

> MDN 官方参考地址：[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location)

```js
// location.search得到 URL中的query数据
"?targetId=99&sort=hot&bool=true&name=张三"

// 最终转换成下面这样一个对象
{ targetId: 99, sort: 'hot', bool: true, name: '张三'}
// 获取地址中query查询字符串部分内容
var search = window.location.search;
// 返回处理后以对象形式呈现的查询字符
paramObj = GetVars(search);
console.log(paramObj);
/**
 * GetVars 将取得的查询参数以键值对形式存到对象中，同时考虑数据类型
 * @param search查询的字符串内容 如 ?targetId=99&sort=hot
 */
function GetVars(search) {
  var oGetVars = {}; // 用来保存返回的参数与参数对应的值
  if (search.length > 1) {
    // 将获取到的字符串，去掉第一个问号，同时将剩下的字符串以 & 来分隔
    var arr = search.slice(1).split("&"); //得到如下数组：
    arr.forEach(function (item) {
      var keyValue = item.split("=");
      var key = keyValue[0];
      var value = keyValue[1];
      // decodeURIComponent  将已编码 URI 中所有能识别的转义序列转换成原字符
      oGetVars[key] = buildValue(decodeURIComponent(value));
    });
  }
  return oGetVars;
}

// 写一个函数，专门来处理参数值的类型
// 1、考虑传过来的值是不是空的，如果为空就返回null
// 2、考虑参数是boole值 true和false,返回对应bool值
// 3、考虑是不是一个数字类型
// 4、考虑是不是一个日期类型
// 5、排除上面，最后只有字符串类型
function buildValue(value) {
  // 1、考虑传过来的值是不是空的，如果为空就返回null
  if (value === undefined || value.trim() === "") return null;
  // 2、如果是一个boole值，则返回对应的bool值
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  // 3、全局isFinite() 用来判断被传入的数值是否为一个有限数值，判断时会做数据类型转换
  if (isFinite(value)) return parseFloat(value);
  // 4、判断是不是一个日期
  if (isFinite(Date.parse(value))) return new Date(value);
  // 5、上面都不满足，最后只能是字符串，并将其返回
  return value;
}
```

### 4、数据交互 - 根据参数显示页面内容



- `index.html`表示首页，用来显示产品列表
- `goods.html`表示产品详细页，根据 URL 中的参数来决定显示那个产品的详细信息
- 当点击`index.html`页面的产品名，就会跳转到`goods.html`页面，显示对应产品的详细信息

![数据交互，根据参数来显示页面内容](https://www.arryblog.com/assets/img/GIF2022-11-816-08-32.f7db9c57.gif)

**`index.html` 页面源代码**

```html
<ul id="list">
  <!--
<li>
<a href="./goods.html?targetId=93">Web前端高级工程师系统课-星辰班</a>
</li>
<li><a href="./goods.html?targetId=91">CSS实战小案例详解</a></li>
<li>
<a href="./goods.html?targetId=77">云原生Kubernetes与云上DevOps新版系统实战</a>
</li> 
--></ul>
<script>
  var data = [
    {
      targetId: 93,
      title: "Web前端高级工程师系统课-星辰班",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg",
      price: 8680,
    },
    {
      targetId: 91,
      title: "30个HTML+CSS实战小案例详解",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg",
      price: 0,
    },
    {
      targetId: 77,
      title: "云原生Kubernetes与云上DevOps新版系统实战课",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/07-14/122139326c0d505110.png",
      price: 2680,
    },
  ];

  var ul = document.getElementById("list");
  // 遍历我们拿到的数据
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "./goods.html?targetId=" + data[i].targetId;
    a.target = "_blank";
    a.innerText = data[i].title;
    li.appendChild(a);
    ul.appendChild(li);
  }
</script>
```

**`goods.html` 页面源代码**

```html
<div id="container">
  <!--
<img  src="https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg"
width="300"
/>
<h3>Web前端高级工程师系统课-星辰班</h3>
<p>价格：8680</p> 
--></div>

<script src="./getVars.js"></script>
<script>
  var data = [
    {
      targetId: 93,
      title: "Web前端高级工程师系统课-星辰班",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg",
      price: 8680,
    },
    {
      targetId: 91,
      title: "30个HTML+CSS实战小案例详解",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg",
      price: 0,
    },
    {
      targetId: 77,
      title: "云原生Kubernetes与云上DevOps新版系统实战课",
      mainImage:
        "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/07-14/122139326c0d505110.png",
      price: 2680,
    },
  ];

  //
  var container = document.getElementById("container");
  // 获取查询字符串中的targetId
  var search = location.search;
  var Vars = GetVars(search);

  data.forEach(function (item) {
    if (item.targetId === Vars.targetId) {
      // 就是我想要找到用来渲染的那一条数据
      // 创建一个DOM碎片
      var frag = document.createDocumentFragment();
      // 创建图片
      var img = document.createElement("img");
      img.src = item.mainImage;
      // 创建h3
      var h3 = document.createElement("h3");
      h3.innerText = item.title;
      // 创建p标签
      var p = document.createElement("p");
      var price = item.price > 0 ? item.price : "免费";
      p.innerText = "价格：" + price;

      // 先添加到DOM碎片
      frag.appendChild(img);
      frag.appendChild(h3);
      frag.appendChild(p);
      // 统一加到container中去
      container.appendChild(frag);
    }
  });
</script>
```

### 5、404 页面，定时跳转功能

![20221108time404](https://www.arryblog.com/assets/img/20221108time404.e0f2dc36.gif)

```html
<style>
  .time {
    font-size: 20px;
    color: red;
  }
</style>
<span class="time">5</span>秒后，页面跳转到首页
<script>
  var time = document.querySelector(".time");
  var second = 5;
  var timer = setInterval(function () {
    second--;
    time.innerText = second;
    if (!second) {
      clearInterval(timer);
      window.location.href = "http://www.icodingedu.com";
    }
  }, 1000);
</script>
```

### 6、location 对象的方法

> 以下是 location 对象身上的一些常见的方法

| 方法名  | 说明                                                                                                                                                                        |
| :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assign  | `location.assign()`方法会触发窗口加载并显示指定的 URL 的内容，类似`location.href` 会有**历史记录**，可通过前进和后退按扭来追回历史页。 如果传入一个无效的 URL，则会抛出一个 |
| replace | 用给定的 URL 替换掉当前的资源，**不会有历史记录**，即不能用后退回到原页面                                                                                                   |
| reload  | 重新加载当前页面，相当于刷新按扭或`F5` 如果参数 为`true`，表示**强制刷新** `ctrl + F5` ，即：要从服务器上加载数据 如果参数为`false`，表示浏览器可能从**缓存当中加载页面**   |

```js
// assign 相当于href，跳转到一个新的页面
location.assign("http://www.icodingedu.com");

// 用给定URL替换当前面 不会产生历史记录
location.replace("http://www.icodingedu.com");

// 重新加载当页面
location.reload(true); // 强制制新，重新从服务器加载数据
```

## 三、window.history 对象



**`Window.history`** 是一个只读属性，用来获取`History`对象的引用，History 对象提供了操作浏览器**会话历史**的接口

`window.history`对象相关方法

| 方法    | 作用                                                                                                        |
| :------ | :---------------------------------------------------------------------------------------------------------- |
| back    | 后退功能，返回上一页，相当于用户点击了浏览的 `🡰` 等价 `history.go(-1)`                                      |
| forward | 前进功能，进入下一页，相当于用户点击了浏览的 `➔` 等价`history.go(1)`                                        |
| go      | 前进与后退， 当参数为`1`，表示进入下一页， 当参数为`-1`，表示退回上一页， 如果参数为`0`，则重新载入当前页面 |

```js
history.back(); // 后退
history.forward(); // 前进
history.go(1); // 前进 进入下一页
```

## 四、navigator 对象



- `window.navigator`对象包含用户此次活动的浏览器的相关属性和标识
- 他有很多属性，但最常用的是 userAgent 这个属性
- userAgent 属性返回当前浏览器的用户代理字符串

```js
navigator.userAgent; // 返回用户代理（浏览器）相关信息
```

![image-20221108201344417](https://www.arryblog.com/assets/img/image-20221108201344417.3db96021.png)

> 我们通常利用这个`userAgent`属性来判断当前的打开页面的浏览器和设备

### 1、检测浏览器并返回浏览器名称

> 以下代码来自 MDN：[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator)

```js
function BrowserName() {
  var sBrowser,
    sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox"; // 火狐
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera"; // 欧朋
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge"; //Edge浏览器
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium"; // Chrome
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari"; // Safari
  } else {
    sBrowser = "unknown"; // 不知道
  }
  return sBrowser;
}
```

### 2、判断是否为微信环境



`micromessenger`为微信内嵌的浏览器，有此标识的基本上可以判断是微信环境吗，但此标识也可以伪造

```js
// 判断是否为微信
const isWx = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf("micromessenger") !== -1) return true;
  return false;
};
```

### 3、设备判断：android、ios、web

```js
function isDevice() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return "iOS";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return "Android";
  }
  return "Web";
}
```

注：

- `i`：代表不区分大小写匹配
- `()`是为了提取匹配字符串的，表达式中有几个`()`，就有几个相应的匹配字符串

## 五、window 相关事件

接下来我们学习几个非常用要的事件

| 事件名           | 说明                                                                                                       |
| :--------------- | :--------------------------------------------------------------------------------------------------------- |
| load             | 整个页面（包括所有外部资源，如：图片、JavaScript 文件和 CSS 文件）加载完成后触发                           |
| DOMContentLoaded | 在 DOM 树构建完成后立即触发，不用等待图片、JavaScript 文件、CSS 文件或其它资源加载完成。                   |
| resize           | 当调整浏览器的窗口大小时，会触发 resize 事件。 resize 事件触发会很频繁，所以我们在处理时，可以设置节流操作 |
| scroll           | 当浏览器滚动条发生滚动时触发`window.onsrcoll`事件                                                          |

注：

```
DOMContentLoaded`事件的实际目标是`document`，但会冒泡到`window
```

> 所以我们可以在`document`上监听这个事件

### 1、load 和 DOMContentLoaded 事件



- `load` ：整个页面（包括所有外部资源，如：图片、JavaScript 文件和 CSS 文件）加载完成后触发
- `DOMContentLoaded` ：在 DOM 树构建完成后立即触发，不用等待图片、JavaScript 文件、CSS 文件或其它资源加载完成。

> DOMContentLoaded 事件始终在 load 事件之前发生

```js
console.log("我第一个出来");
// DOM树构建完成时触发
window.addEventListener("DOMContentLoaded", function () {
  alert("我第二个出来");
});
// 页面加载完成后触发
window.onload = function () {
  alert("我第三个出来");
};
```

> 除了页面加完会触发 load 事件外，其它元素也会触发与之对应的 load 的事件

| 元素           | 说明                                                                                                                                    |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `<img>`标签    | 图片会在图片加载完成后触发 load 事件 图片并不需要插入到页面。只要 img 对象添加 src 属性，就会发起 http 请求，下载成功就会触发 load 事件 |
| `<script>`标签 | 在 JS 加载完后会触发 load 事件 不过`<script>`标签要指定 src 属性，同时要插入到文档中，才会发起 http 请求，下载成功才会触发 load 事件    |
| `<link>`标签   | 需要指定`<link>`标签的 href 属性，同时要插入到文档中，才会发起 http 请求，在 CSS 文件全部加载完成后会触发 load 事件                     |

### 1.1、动态加载图片，插入页面



load 加载成功，触发 load 事件

- 图片加载完成后触发 load 事件，图片并不需要插入到页面。
- 只要 img 对象添加 src 属性，就会发起 http 请求，下载成功就会触发 load 事件
- error 加载失败，触发 error 事件

```js
/**
 * loadImg 动态加载图片
 * @param url 图片地址
 */
function loadImg(url) {
  var img = new Image(); // 创建img对象
  // 图片加载成功，插入到页面
  img.onload = function () {
    // alert('加载成功')
    document.body.appendChild(img);
  };
  // 图片加载失败，在页面显示图片加载失败
  img.onerror = function () {
    document.body.innerText = "图片加载失败";
  };
  img.src = url;
}

var url =
  "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg";
loadImg(url);
```

### 1.2、动态加载 JS



- 在 JS 加载完后会触发 load 事件
- 不过`<script>`标签要指定 src 属性，同时要插入到文档中，才会发起 http 请求，下载成功才会触发 load 事件。

```js
/**
 * loadScript 动态加载JS文件
 * @param src js文件地址
 * @param callback回调函数，js加载完成后，要处理的事情
 */
function loadScript(src, callback) {
  var script = document.createElement("script");
  script.onload = function () {
    typeof callback === "function" ? callback() : callback;
  };
  script.onerror = function () {
    alert("加载失败");
  };
  // 指定src属性值，并插入到页面中
  script.src = src;
  document.body.appendChild(script); // 不插入到页面，load事件永远不会触发
}

loadScript("./a.js", function () {
  alert("加载成功");
});
```

### 1.3、动态加载 CSS



- 在 CSS 文件全部加载完成后会触发 load 事件
- 和`<script>`标签一样，需要指定 href 属性值，并且要把`<link>`标签插入到文档发中才会开始下载 CSS 样式，下载完成后才会触发 load 事件

```js
/**
 * 动态插入外链css
 * href css外链地址
 */
function loadCSS(href) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.addEventListener(
    "load",
    function () {
      alert("css加载成功");
    },
    false
  );
  link.href = href;
  // 把link标签插入到head标签中
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}
loadCSS("./index.css");
```

### 2、resize 事件



- 当调整浏览器的窗口大小时，会触发`resize`事件
- `resize`事件触发会很频繁，所以我们在处理时，可以设置节流操作

```js
var a = 0;
window.onresize = function () {
  console.log(a++);
};
var a = 0;
window.onresize = throttle(fn, 50);
function fn() {
  console.log(a++);
}

/**
 * 节流函数
 * fn 事件处理函数
 * delay 函数执行间隔时间
 */
function throttle(fn, delay) {
  var timer = null;

  return function () {
    var self = this;
    var args = arguments;
    if (timer) return;
    timer = setTimeout(function () {
      // 函数体执行代码
      fn.apply(self, args);
      // 开锁
      timer = null;
    }, delay);
  };
}
```

### 3、srcoll 事件



- 当浏览器滚动条发生滚动时触发`window.onsrcoll`事件
- 如果某个元素内的内容溢出，显示了滚动条，滚动对应的滚动条，也会触发**对应**的`scroll`事件
- `scroll`事件的触发频率也非常的快，所以了要根据实际业务场景来添加节流操作

```js
var a = 0;
window.onscroll = function () {
  console.log(a++);
};
```

![GIF2022-11-822-45-11](https://www.arryblog.com/assets/img/GIF2022-11-822-45-11.60ca9047.gif)

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    overflow: scroll;
  }
  .box1 {
    height: 400px;
  }
</style>

<div class="box">
  <div class="box1"></div>
</div>

<script>
  var box = document.querySelector(".box");
  var a = 0;
  box.onscroll = function () {
    console.log(a++);
  };
</script>
```

![GIF2022-11-822-42-50](data:image/gif;base64,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Z2J3XvqnYEEAACH5BAEUAAAALAAAFgAwAb4BpAD/APDw8P///3h4eBoapmSv6Omvrhoarq7m/5Eapv//1Mz////NuhpmxRoauun////mxWQapsyPphqP1P//6K5mppHN/8yvrpHN1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/ICCOZGmeaKqubOu+cCzLQW3f9qzvfO//wKBwGMQZa8SkcslsOp+9oxFKrVqv2CxJitN6v+Cw2MS9jc/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+LAMCChwo8J8igggDGkyUEOFCRA0JPjwUceDEixgzatzIsaPHjyBDihxJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr27CgHgw4sfT768+fPo06tfz769+/fw48ufT7++ffFl8uvfz7+///8ABijggAQWaOCBBnqn4P+CDDbYiAB0hTeXeHKNNwMEERyAAFcUvkBBBQ1coGFXHbYgQQEAGDAiiRLCoOKGHLbo4opalTgjjFhZOMOLNcooA49Z+fgjjTn2AKRbBhCg5JINPODgk1BGKeWU/CBo5ZVYZqnlllx22SWVYIYp5phklrlKkko2+ZYBaiqQgJpyHQmXnG9J4MACcjFAwAR5EgDnWxjeGVegeMJFqFwSLMmkk2Y26uijkEZqppeUVmrppZhmaqmknHbq6aeghiqEnovO5eafcwoap6qGRoAioBEoySddEhD5lpuvxoWrXB+yuhaaSuYq6rDEFmvssVpoquyyzDbrbKXIRivttNRW25ylmwQI61ai2Q4aAQYJaLvWhxPsuuad5ra1a7psSdBmuG4xsCK7anGraLC6wisXvdb26++/AAeM1bMEF2zwwQgHIPDCDDfs8MOCkbqkr2rJiyNcFs+VcZ8TFxrXh7a6haG46iYwa1x6WiAXhiezBSwBKkMs88w012zzQwnnrPPOPCd4889ABy300DthSwDFaiUZc6tLw+Uuo3CRay/JZ2Ebs55UFxUCACH5BAEKAAAALL0AGwANAEkAoQD/APHx8Xh4eAAAAAIrjI+py+0Oopy02ouz3rz7D4biSJbmiabqyrbuC8fyTNe2LeT6zvf+DwwGCwAh+QQBCgAAACy9ACAADQBGAKEA/wDx8fF4eHgAAAACJoyPqQntD6OctNqLs968+w+G4kiW5omm6sq27gvH8hwL9o3nel4AACH5BAAKAKsALL0AIgANAEQAoKioqAAAAAIchI+py+0Po5y02ouz3rz7D4biSJbmiabqyrZbAQAh+QQAPACrACy9ACIADQBEAKDBwcEAAAACHISPqcvtD6OctNqLs968+w+G4kiW5omm6sq2WwEAOw==)

### 4、返回顶部

实现效果

![GIF 2022-11-9 0-18-25](data:image/gif;base64,R0lGODlhGAKVAXcAACH5BAAyAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGAKVAaf4+Pjx8fHd3d3z9Pbu8PL3+Pj67e3h4eL/55PBwcGqqqrS0tLM0NfsyElfY2jIyMjg4ufe4OLMz9AAAADFIh88QEO15/+ZmZn//9Dy9PXUjUNVX3ByseeRQGw8jdDU///ssWyioqKwsLCs3d1obHCRz/+RkZHZ2dn//+ePSgByrN3/z488abL/57Ld3ci1aUNiY2Xi5OndrHLIkEe5ubkASo/I3d0AAHLdxY/q6ury0V5yQI/n6eoAcaz67b88QGxHAHJHSo+scQBQUFDnoF/X2NnZMCVyQEPIoNny13t9gISOj5GPSkeXmZrqjoiGiY1yQGyscUdHkMjd3az45OT68fG7vL7VY2H6wIzVYF7s///Fer/o6u7T2e10dXbhi4qRQI+Pxd3ss7KRlJdyAADqsbDkmpjy1m+Qk5bJNDLLPDrxyclrbG723t3RUlDtvLvcel/TW1manaD67+/c7e3fhYTcennKOTZHAADTV1VmcH/IW6b12dg8QI/MPjvOwO1dZ3j67dlyabLIIowAAEfV2N7FIoxysbKQmKSFhoj62abbeXeZn6tyAEe1sWxlb3615+e8wMnFW6bExcXrt7bcwIzOW4yRz+eRQENysdC1aWyqr7mLi4uJkJ2srHLwxcWRjdDTWx/ceh+PxcjI3chyaWxykI/3399HkKzn2abTel/n7b/FIl/MPzzOIh/KzdFyaUNyjdD24eHc7b+sxY+1seeRl6Osxays3cjOW6a1z7KRsbKmpqaPkEeZoKvIkHLOeozIer9ycQCRabK1aY/TwKZyAHLUz4/TW4w8aWzUjWxHAEfjmJcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI/wADCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFiwcBaNzIsaPHjyBDihxJsqTJkyhTqiR5Ko6aK1/K8DFAs6bNmzhz6qzJp8yXK2riyDqp4MHAAQKRBlDKNKnTpU+bQp0qtWrUq1SxWs3KdatXrWC7hv0qtizZs1jNjl2rtu2AAivjyp1Lt67du8zUrNnJt6/fnGvumDFZdOmAw4gTK17MuLHjx5AjS55MubLly5gza97MmTHcu6BDix49kgCPGDFyEFhZxY2dOX9jy+ZrJ08VkgoWQEXrli3v376D9x4OnLjw4siPKzdO9TPp59CjoxyAOgaE6xCqDzhZJc8b2LPDi/+n+cb2yMKG0x9Wj3S9+/bw2ct/Pz8+/fv289ffj5+//v4A/iegfwQGWOCABiaI4IKGvSXdgxBGyAVq2FWYXWomufFGFeN1GF555+mm4IEkjmgigyeWiOKKKraY4osswqgeDzwYuFSEOIqEYY4nUXhdBBZiFwMPJJnxmodIymbHYCGh155hBARQQJRTSknllVZmWeWWWHKpZZdgfimml2SGWeaYZqaJ5ppntqmmm2y+iSV8clpZRBEEPElnnFpaYcVu9R02F0FzLUBDAgpcEMIJGh0QwgUKJEDDA3I94IADlNJFwqYOcOopCZ2iNCEEQGJXaqnYERkSFX4k6epfc6j/QUWTIgaQQQEBEICrrrnu6muvwPIq7K/DBkvsscYmW+yyyDKrbLPQPiuts9RGW+201vqaJ3z5bbvtUrwGwAAJRVh5K7bJIuWFFyg6l9IBCoQQQqRyBSDCvSaYcIFGF+R7rwgByLXEpU3UdenBCCd8UgDWVVgIInro4cuPQm4HUhZ7JUnEFkk6YYQTO61xRZNGHZanizGmjPLKMrasssssI+WmnmtmwMC65Q5wsom6EsAADA4wIJCXTy7lbkkBMJrABUwzXagINISQ7wkn5BsCDSIsoFIOISyxBKideh1CDHFd+pHCJjV8KiIbtL0BIkGS/VEbrfSFBQV45633HzT5/zAIHTb54ArfsRlhOF9+zPpRboBe63i26D4eOeSSV0755ZNnbrmxBDDbua867+peBuJewAYMTxThRbnWugcurgE0oYQSTSTVHq+LpfRACAeI0LS+Ocz1b77Em/DvSiEknHAIZZNw9sHOlzRAkBAA4vYGepBKsdweiXHFbFggcRMRehtSCd6GAC6bxyDvdIUYIDm53pQmw2l/nffzmf/++Pevv//8+x+bhuatM4UuSiS4kgJIYAUeDOQB5LISncqElCIwgAEKgAENrKDBC+bsds05SdT6FQLdAGABj2KaCFbSOxoooHgKuBejVDIw5R1sCWVzwEfAZraSjOpU1bveI/+ox4WP1MEJ4NkJ+fSWN/EFAhmAIwISsMCxV+HkC3WIn4iQ0jPPDetzvQJjF7X1xTKS8YxhNGMa0TjGNbqxjXCckhrjKEY5stGOb8QjHeeoxz7W8XN1HNrrgBUAGEBFBEpwIOlIF7snZC4CSoCBJFFHoydMEgZKiMCv3mI0kwSgaSEIXg4OAACuMS0EAVMJ1miQL05cYJVxeYINb9i85x0sbdRjxPUYYapUfSQOYvCLFGkSPpoM0wCK2EMqgmEAKloRJ2LIQvyMAhUKygyA2BRgALeZTW5qs5vgHNNudPYWAmRAZxJMjwOkFAES5MBWuCrAAKwQwREFgAeRVIBBMpj/SNuBCz6eZJoJtPaAfCXghPq6QPC2dq8XmiCGIlioSg5wgjHMkgRLyBRKQGXLHpJEbRSDgC0e8QheoqpCH7lDG4TJxCYGIhRMBIbeJLG+j/GlDWnQIpSOBcaY+RRmQH2ZUH86VAMRa5DxCQAJBNIEK0SABrJEHT3LJSVl0Qd2TYDBBTLA1djBoHYC+ZbrjhaST/YreE27QABy0DSJ6g5q/cKaRuMygFkejHsm8ShHEBY9klDvOoWIRCQKESQg4XUjaVhpX47JWPH1bQ85aCbH4NCF2RjOCDe9wzSdctUrlfOboPWmaMM52tCS9rRW6pmVCkA/W+1pnUq9AAlCIDQG/7CBDR+UD9GUIhA0wIAHXOWBA9AwEHkCin5kBYlZTRA8BXDCBMzLQUJTuZJ//Yu6crHrpUi5UR16hIfeJQkPQsqATujhenroBANOqqqOZCGYi20p3sS3RPRVYrKVrWn7dBJNndbvWYDcnIAxN2DNEfjABk5wga91uyoFMlxLVWoTHCgQ21I1tWfEHXxw1QQviEtoXgCr6xBTzYD266A5EIECSJmA6cplAdbVmlxiUNGLjmGueQ3vXhFmEi5UaBPXC/IGNlGhInqkDl/wCxYkwQMDEIFww1TEIGZhCUvQYZiUfSZNvvCFzQLKZPMDU/0KKNaimpmoaA5qml/Ws2tWFf/MSYXtnwhyJ6ONs4xfWo8S0HABSV4ADUqoapv/iZSFpXWGGjlBWt2qyuPNpYazfEJcOOoRtJFketqznpDdBgjtQcBiHfHeX7DAimL8zSaBiEMXfLCHVexBFZXNspavUAb/7pSAquXSghG8awXz+te+DnavPQc70SElA+uE3WEKQDoeULOryMIVnAXCA0myQQEKON1vkdWe5Co3rRdIwAkisDRFMQ27E70XdwV2sDFoxKKXwuFKQlVp6J3EVJsOMkrn1qq/LLGKN/FBLnKQzMjKOjbsQ5ziPFKYEbuZft16EpfGbNqKl/biqMW4xc2UgZNBHFwSfHiy0zMQBjgSw57/vVK4pP0AGKAhAgKJgG+FlucSezKhAtUXzpnGaJXcqy7Ju9QMT3Aw5s37Up9S3sKwk+/rYWc1F8uYTkQxX2LqbQsvpQDHREG4g//lsjv5hDRtfbtzTu6Aj/sjH9V+R7bn0e17bPva5y73ur+d7nfXo8SlVUhJHkySJJCkI/+Lu5AT0OxWmIRBJkEDXEu7kygxFA0mT/nK00DGc8lBzycqhycsgbsHeMIT5OBtkmiXxz3q5UkrBKT2foQKd9CyhxKukzQsnOHUJHF8Jh46x6eJ4hoPfsaHv/Hit4mAU5J278/prc8yUiFKgfic9lSloRlXkGHWEo+2z32VUA+I+xaJ/5FkT/5FMInsg4xjHh2/fnMV25zvP5f7Dx//+tP//vPP/5Tkv3/76x/++Nd/AQiA/8d/BCiABeh/EEc6dtQ5T9JxKxdGUsJVXCVtxdYgvXdn3JYYUbJsaNdaDtJ9IjiCOuJphQUBricSGkJ+z0QJY0cy6QGCAxRm2bcld2YyYxRgDZiDPLiDPqiDQNiDQfiDQliERHiEQ5iERqiEDYhyVSVB8bQzDycQjHSBrgNyzEYz79GBVAFCaEKCYBiGHEEAIXVSUFcSrfEGLOgqlOAGtyES+uIUGvZFhIeE5+IsbyYz/qRsehiDe/iHfhiI8wOIgyiIfViIiHiIiviEiciIi//Ih44YiZAIOWPGRXzUK/RRZjJDTgWULpu0hdoSgmI4imA4AKOSHVwAatzhBouwhh6yCOZxHiWjhW9CQE9YJe3RcSD4gYDkhE34i70IjLkWjMQ4jMaoa8iocsnoi8W4jMLojM0oJ2Z0JY+3fwzYfJz1cHNiiwZ0QMflWUNDiuI4jnJhBncgda74F5+QBucXIruhfKvVe9OIYddELethdmqWj2emj2vGH3OILIKGjOz3j3VETuRUgZyjKx84LaJIjg75kCRBBVnwEjExE+loEz3xE2qQBbcni0nRgegkR9X0LTboHr83hcZHfMKXkizJP8P4JccITuaEfQ4YgzP5ZTL/o4tUwlqlB5E++ZMAQAVlUAdxkAbydZRImZRMlAZxUAdl0JG4gXlAOZVUWZVWeZVYmZVEgWNa2ZVe+ZVgGZZiaRe5MZZmeZZomZZqSZVFsZZu+ZZwGZdyCRplOZd2eZd4mZdu2ZZ62Zd++ZeACZF1GZiEWZiGeZjPwZeIuZiM2ZiOuThS+ZiSOZmUmZeKWZmYmZmaaZaDuZme+ZmgCZSXCYY60ACmWZqn2QBnsJao2QCtWZqrSYqvaZquqZpiOJupGZsPiZu1qZvcx5uwGZoMF5kk2AAIcJzIiZwNsJbGmZzJuZyk2JzOeZzQCYbSOZ3V6ZDX6ZzZuX3b+ZzC2RFX/zMSGNABFhASK1ABLNCTJ/GdyikaGsABABCfK1Ge52kX7kmdoUGfc5GfCNCdIuifAGoXIOABdyGgcWGfdIGgKKGgK+EDO/ABe0mcHeGgHoECUVACoMGgI+EDR1ABFRAEEhoS9MmfFxoFIKqe7mKhCzqd7wkaJhoXHFqcLqqfo1GgB1qj/1kSGMAEICqiAMCiKzGjPGqecdECEbqXXNmgYDCi+KmjA9oRIPAD97kCVEqi8ikSKPACGvoRQioXREoXMTqkUCqGYUqgBvqkNRqlHOGhXYoBw+AuY9qeZdqgRroSSOqk4pgIRsenctGZKoEBTbqhdRoSLAoC6wkSc9oRW//apR7xpTJaqHaxqChxptxnqXSBo2rqomyqERiACY76EZRKEpgKEpBaEnnqkMlTMKsaF6P5qEaqAZmAolTaAh9aAfLpoSCapipRqgCwAom6ERD6ARB6DLuqESUqnwWqASCqoY3aEcwKolT6rACgqSnhq/S5pfKJAppwntGaqLKKohUQqnS6piMRBVnqA1AACRmqEZqanhVwpb0qqV7aAbrwocEKAinapbp6rL8qrfd5rfTqEcBKVuXJrgA7r+ZKnj6Kqw4arVdasEFqpFuaokCqqg6gBACQPImwEoAKq956pRpgoIIqoS0ABeeJoVkqsAuLnsHqqeZpqwaqrt4qn/T/qa8aiqgFULHHqrO/Oq1c6q68WqkD2xErYKAt4AWCUAA+sLQgkKU4qgFXerIBW66cOhISW6DUiqNNCxepyrJXKxI9up49mrOJSrVlCwAYOrNLCwBfS7QtCxISq6siqqCjOhK+2qMra7dpugIiCqxaMLHemqYg0Ad6Ko5ykLEAkLgaqxKvWqGxmqUFW7LVyqsSC7bYibUsELgbkaep+qzJWrkaMazUqrZBK7hbO7RWm7li26QgcAnd+rQ8C6LraaIaQK4lkbdMUAL2mbrVmqLxWrUmkbd3Gp+lG5+Xi6P6mqLyCrdh67Kc67YRarcri7ncqbnOYZ8O2qiAK7gO+rbi/5g8Y1AAiTu+HrsASSC2kasRgEu51nq5zuucpZm+hnqn7rq5nxu0oaupeVq61Nq7p2ut8Zuc8zsSGnAJxPABT6sMFlC6yJqlGIq7pFqjBSwSBXq0ptulyqu6CjudFWyqxcsBx8sByWugAkymLvrB9RqweUq9kZrCDUC/cvuy2nun3JuoNXyf4EuKSmB0PfynD9CpLvyrm0u5VGu61bu6z7mjFiyvVnqe+auh+5um/Xu6yJqoUzq4QcoEHJy7a8rEIQECyRALblsKSeqzKyDFQOq3h+vFnArGIHGysNClI7vFM4uyQQoKKIydcAyyD1ytiUqztqqhPXrH54kBetzB3P/Zxx6RxRrRwuu7x4ssxLsbpLXAt+xruEecxVuaphpwsWqZG0Icye07qP8KokmsxMrJyARrsSMaxfNps8pKxRE6uyLKs4dgpLYaoo7QxRP8xp3qtkfgrC/Aq9HqyYfgo807wKsczPMZrLscBL3Mvj/axm7Mx6N8n/wJsVX6o9N8yqDMzNTJyh2xy6gsuP+6zMP7xcG8y4aroDxruMgKorl8yJgAoruQpGtZFM6MI/lpnP2clf9Mzt030AEtHQYNkQld0OwcnhuRGzJsnbQ50bQZ0WZJ0Rht0cWJ0ROt0ZfK0RWt0CBtmh4dISNN0g6tEY+b0izd0i5NlhT60jI90zT/TTI1fdM4ndMfm9M83dOhudI+HdRCLZk7PdRGfdSGCdRIvdRMfZdF3dRQHdX7vKRSXdVWHZZPfdVavdVsSdVc/dVgTY65EQEHUNZmfdZondZqvdZs3dZu/dZwHddyPdd0Xdd2fdd4ndd6vdd83dd+/deAHdiCPdhordRhfdiIDRoRkdWJ3diOrRKL7dWPPdmULRKRXdmYndmWDRGGrdme3diLHdOfPdqJfdmkfdqPvdgMgNqsXdoHMQQI0dmtPdtM/dpDANv7JAG0vdtabRC3/dv7JNm8PdxCXRC/fdwFoQC6TdzMvdSm3dzQXdycvdzRXd08/dzWnd00vdjUrd3e/+3S2P3d4h2e3D3e5k3enC3c573ejlne7P3emBne8D3fjOne9H3fiynf+L3ff2nf/P3ffqnfAD7gcunfBH7gcSngCL7gZ2ngDP7gZqngED7hWungFH7hWSnhGL7hP2nhHP7hPqnhID7io+jhJH7iYijiKL7i22fiLP7iPKLiMD7j0OHiNH7jzyHjOL7jdWHjPP7jdKHjQD7kCzPdRH7kdyHkSL7kHuHjTP7kTZ7eUD7lnmTkVH7lZSXlWL7lHeHkXI7kSv7lP+7lYj7kYV7mOE7maM7jZ77mM67mbn7jbR7nLA7ndA7jc37nJ27ner7ied7nIM7ngE7ifz7oGy7ohv/+4YWe6BSO6IyO4Yv+6A/u6JI+4ZFe6QhO6ZjO4Je+6QOu6Z5+4J0e6vwN6qQO4KN+6vdt6qq+36ne6vDN6rBO368+6+st67b+3rWe6+ON67x+3rv+697t68Iu3sFe7NZN7Miu3ce+7NCt7M5e3c0e7cQN7dTe3NN+7btt7do+3Nne7a3N7eBO298+7qct7ubO2uWe7p+N7uxO2uv+7pnt7vLu2fFe75RN7/iO2fe+746t7/4+2f0e8IgN8AQP2lp+8Oxt8Ap/2APf8FzN8BD/1Q8/8Vct8Rbf2wmf8cNu5Rzf8Q8h2x+/7R4/8sm+8SYf3Rif8k1d8SyP1Cv/8jD/j/Iy7+0lX/M2H/LqjfPwfvM8T+40//Ph7vNCr+5BX/TnTvRI3/M6v/RAH/Ld7fRJ3/RSb/RQX/VW7xAij/UIf/Vcz/Rav/Nf79peP/b2fvRmn9pKn/b/jvZsT/ZaH/Vvr/ZUP/f5vvZ2H9Yun/egGfN83/du//db7feCv5l7X/iZSfiIH9+Bv/hSrfiOP5mHH/mSCfmU396Nf/nOjfeaX9uZ3/lGbfmgf5iTP/qkz/mmP9Sln/qEKfqsD5ir//r9jfqyf92fX/vcR9i6D9ebXfa4L44HEAHCP/zEX/zGf/zIn/zKv/zLX9a9H/a/T44UdQICIADUb/3Vf/3an/3c/4/93r/939/94D/+4l/+2E81AhABz98Qyh394yj81R//8j//9F//9n//+J//+r9uHxH70Q8QESIIIFjQ4EGECRUuZNiwYQQAESVODFDR4kWMFRVImNjR40eQIUWOJFnS5EmUKVWuZNnS5UuYMWXOpDlzoEOcOXXuTHhAZEagFxU8qFnU6FGkSZUuZdrU6dOSN3lOpVqVIMSQQbVuhNrV61ewYcWOJetSqlW0aRf6zKoV6NCyceXOpVvXrt0DavXuLYgVpNu3HO8OJlzY8GHEHs/yZUyV7V/AGOEmplzZ8mXMM/M25jzV78fIkgVnJl3a9GnKizuvZvgYdGiLk1HPpv9d2/bTzax1L/zsEXbs0beFDyde3KTq3ckFuPb9O4Bs49GlT6+dW/n13h2dPw9O3ft38IaRX2fNXLtz6OHVr2cP1jr53dkpou/e3v59/DTHw+dsfv7v9PITcEACSXqPv9Xkk2g7rgp08EEI90OQL/8WRI8oCDPU8L4DJ2xMwYgYrG9DEks0TkIP1aowxAtNdPHF4TpMcS8QARARRhxzNA3FGa1a0cYWdRRySMRk7DGtGm8kckkm6eLxyKl+ZBDDJqu08isjoawqSfqu9PJLpp7UUicpgwTzTDRlynJMnrgEcMQ045STJDHZdKhMAKmcc08+P1rTzpzchK3BPgsttE7/QNf6yUxDG5Xzz0QfWvRNRyuNc7wowlDIhRQmIERT3WT4lCc8B9XTUlStlFGGG0YQAAc8JpBVVhUK4nRWXHOtgZROZ71BmFxn7cEgIWqwgSBYcZUiIUFDIzRVaJncT4hhcQDC1YQ4rXWhGYwliFVsv23VIBmCneAGWq4VYAoytj2oVGdPjXbeHI20doR7N03B3YS6PVYAcIld9iAcgvi3YBvy9ZfZSQeFk16ISeQx2WCH1RbgYGtdGOBxZzB3XAGEWPbie6doBFSE4I0swIhb1rBDIWh9VV1bUxh5X4C9FeDijQOeYVhyQZ7CmBF+RvZaanlr2NmHXXZ6wPFIBsIT/53zvVgGnXnW2WeLcQY3ZnNNAQKXFEBOeemV5X16bQFlJDmIW8oegdOBr84a55477rrWgBXKt9h/D2p25abZNly9qL32Fuy7+W5cgLxdNfpqsxGy2uae0AaM5cM7D89tnEUuKOaBd/Y6Y8i31nvdkzmWPON8IQdacM3detZz3MFLXAWTNWX3Bk8mANruf7X+l+uZXUWeIHZViN3os9vKM3fqwQNdhW55Ff7b7S/mVvVwQz43fOjXbTd20REafPPCq3eftvFiRoWJUVLQGdllwvBeocgLmqHVmLmrfM2zVi9kdT+DqGxzantfA2kDM0LUb3b6MpeubFCuCQwMVlXDA//QPJYr59FMadJzmANNeBvk/AJUYKtgD/bXLwT+LnymW9YAzydChSjQdgw8YQ8vA6lIjRAylPJhEUmDqCC+q3Zb4aERnUgYICZRfUsMyu2eeEXCIFGKBNEhE7H4xcJEcYt9oWJgwHhGu2hxi12sYhPR+MauiHGMAlif7doHRzwuRY1SZONb3JhHQCJFjmOs41buGEhE2mSOO+ljRjiXSEjSZJBbLGQVDxlJTKpkj0lspGT+mElQomSSUqykGUN5ypdsMoidFMonUflKPy1SJ6V05CVheUsAqDJSrIyNK3F5y1EmkZai+WUxRaLLRPFSI7405imDGcRhCsWWzQQlMgH/pcznMJOamXxmpKIJnG2G05p2wuYjw/nKbibqmxqZ5jkTOU42lVOb7kRkOgG1Tu7Q05jwHJM89VlMe9oJn1b85yn5qSV/FhSYsgxUGWup0FseFEoJhSgqA8qmgbazomeU6JEoulGQUkZJISXpYaZUUpQWZqQpZelcTtpSmMZlpTGl6VdeWlOcdmWmOeWpUm7aU6AiZadBJapMflpUpMJkqEllakqO2lSonmSpUaXqEE1VVaySZKpZzepTufrVrX6Vql4VK1bDWtamkhWtUT3rWpGqVrcyta1xDSpc6VrUud6Vp3bVK1Dz2tea8hWwOf3rYGEqWMPStLCJTSliGdvS/8U+lqSOlSxKI1vZjVIWsyG97GYVqlnPVrSzodUnaElb0NGe9pymVS09U9taarIWtuF87WyLKVvbNrO2ub0lbnn7y93+FpUVSUBxjXtc4y5TuCUlLnKdmwB2LneyAXiuc5UrXZA2t7rJzSd2M0vd7XLXnN6lLXjDC93ukvez5g3vddWLWvZuN7rvhe95i+te+ro2vtWdb371a1/0jte/uNRue9M74PICGL8Iju1+n9tfBjdYwdmMcILtC+EK39bB1qVwhnW7YeRi2MO9BfFxFzxiWBZYvgdGcYpLLN55thiPKuYvi2V8Sho/uMM3fmWOOUxQHmPSxyHecZBDOWQT29XYyJFEMoyXjOMX31fJT0Zkk6UsYCq/0coB1miWnbjlE3sZkGCespjhSGYsmxmLaO6ymk/oWze/L7hxxh2c6Uy9Od/5cHbWs+fy3Oe1YSQEgyZ0CDwJaC0LutAPRfQZgRICXhjakTFudO6CImlGV3rNjNL0l7vU6SvyGdQt+/OooyVqU9Or1KlG1ZQYwIAFwFrWsab1rG1da1zfWte55vWufd1rYP9a2MEm9rCNXWxkH1vZyWb2sp3dbGg/W9rRpva0rV1tbF9b271+dbe9/e1XdHsjAQEAIfkEAAoArAAsFgIAAAIAlQGicHBwx8fHtra2W1tbmJiYaWlpAAAAAAAAAy0Iobze8MlIwyA1z62K0CAnhuRoluippuzqtvArx/Rs1/it5/zu98CfMEgcyhIAIfkEAQoAAgAsBwIuAQ0AXwChwcHB8fHxAP8AUFBQAkqEj6nL7Q+jnLTai7PevPsPhotAluaJpurKtu4Lx/JM13Yb5PrO9/4PDAqHxKLxiEwql8ym8wmNSqdU3+2KjQ223EGq61VxW2FTAQAh+QQBCgACACwHAvEADQBfAKHx8fHBwcEA/wAAAAACQIyPqcvtD6OctNqLs968+w+Gi0CW5omm6sq27gvH8kzX9o3n+s4D/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNDgsAIfkEAQoAAgAsBwLIAA0ASwCh8fHxwcHBAP8AAAAAAjWMj6nL7Q+jnLTai7PevPsPhotAluaJpurKtu4LxPJM1/aN5/rO9/4PDAqHxKLxiEwql0xbAQAh+QQBCgAAACwHAoEADQBpAKEA/wDx8fHBwcEAAAACRZSPqcvtD6OctNqLs968+w+GC0CW5omm6sq27gvH8kzX9o3n+s73/g+UBYbEovGITCqXzKbzCY1Kp9Sq9YrNarfcrhdZAAAh+QQBoAACACwHAkcADQBcAKHBwcHx8fEA/wCjo6MCSJQ/pzq93NyL9NmLs958gQ+G4kiW5omm6sq27gvH8kzX9o3nOtn1/g8MCodEYeCITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDouZBQAh+QQACgCsACwWAgAAAgCVAaKqqqrNzc2cnJy7u7uLi4sAAAAAAAAAAAADLQihvN7wyUgDETXPrcTQICeG5GiW6Kmm7Oq28CvH9GzX+K3n/O73wJ8wSBzKEgA7)

> 点击返回顶部按扭，页面滚动到最顶部，即滚动条与浏览器顶部的滚动距离不断的减小，直到减少到 0

**其实现方式有三种**



- 1、不断减小`window.scroll(x,y)`中 y 的值，直到`y <= 0`
- 2、通过`window.scrollBy(x,y)` 方法，每次向上移动一点距离，直接`window.scrollY <= 0`
- 3、通过不断减小`document.documentElement.scrollTop`的值，直到 `<= 0`

**三种实现方式的通用布局**

```html
<style>
  #back-top {
    width: 80px;
    height: 80px;
    background-color: #ddd;
    text-align: center;
    line-height: 80px;
    cursor: pointer;
    position: fixed;
    right: 10px;
    bottom: 100px;
  }
  body {
    height: 3000px;
  }
</style>

<div id="back-top">返回顶部</div>
```

### 4.1、实现方式一



使用 `window.scroll(x,y)` 和 `window.scrollY`

- 点击后，首先获取当前滚动条滚动的距离`scrollY = window.scrollY`
- 然后开启一个定时器，隔一定时间让 `window.scroll(0,y)`中 `y` 的值减小 `100` ，直到`window.scrollY <= 0`，说明滚动条滚动到页面的顶部，然后暂停定时器
- 添加 `lock` 变量，用来防止当次滚动没有结束前，再次执行新的动画

```html
<script>
  var backTop = document.getElementById("back-top");
  // 第一套方案 window.scroll();
  var timer = null;
  var lock = false; // 可以点击
  // 点击事件
  backTop.onclick = function () {
    // 获取滚动条与浏览器顶部的距
    if (lock) return;
    lock = true;
    var scrollY = window.scrollY; // 把他放在外面，不用频繁的读他
    timer = setInterval(function () {
      scrollY -= 100;
      if (scrollY <= 0) {
        clearInterval(timer);
        lock = false;
      }
      window.scroll(0, scrollY);
    }, 20);
  };
</script>
```

### 4.2、实现方式二



使用 `window.scrollBy` 和 `window.scrollY`

- 通过`window.scrollBy(x,y)` 方法，每次向上移动一点距离，直接`window.scrollY <= 0`
- 添加 `lock` 变量，用来防止当次滚动没有结束前，再次执行新的动画

```html
<script>
  var backTop = document.getElementById("back-top");
  // 第一套方案 window.scroll();
  var timer = null;
  var lock = false; // 可以点击

  // 点击事件
  backTop.onclick = function () {
    // 获取滚动条与浏览器顶部的距
    if (lock) return;
    lock = true;

    timer = setInterval(function () {
      var scrollY = window.scrollY; // 把他放在外面，不用频繁的读他
      if (scrollY <= 0) {
        clearInterval(timer);
        lock = false;
      }
      window.scrollBy(0, -20);
    }, 20);
  };
</script>
```

### 4.3、实现方式三



使用 `document.documentElement.scrollTop` 来实现

- 首先获取当前滚动条滚动过的距离 `document.documentElement.scrollTop`
- 开启定时器，不断的减小`scrollTop` 的值，直到 `<= 0`
- 添加 `lock` 变量，用来防止当次滚动没有结束前，再次执行新的动画

```html
<script>
  var backTop = document.getElementById("back-top");
  backTop.addEventListener("click", backToTop, false);
  var lock = false;
  function backToTop() {
    if (lock) return;
    lock = true;
    // 获取当前滚动条滚动的距离
    var doc = document.documentElement || document.body;
    var top = doc.scrollTop;
    clearInterval(this.timer); // 多次点击无效，以最后一次为主
    var that = this; // 保存this，在定时器内需要用到

    this.timer = setInterval(function () {
      if (top <= 0) {
        clearInterval(that.timer); // 如果top小于0清除定时器
        lock = false;
      } else {
        top = top - 100; // 每次减 100
        doc.scrollTop = top; // 动态更改滚动条件与浏览器的滚动的距离
      }
    }, 20);
  }
</script>
```

> 以上三种方式，都是限定步长的运动，如果想要实现限定时间的匀速动动，则参考如下代码：

### 4.4、优化版 - 最佳实践 - 限定时间匀速运动



- T：time 已经运动的时间
- B：begin 开始位置
- C： `change 需要移动的总距离 = Target - Begin`
- D： duration 动画运动的总时间 `CurrentDistance = T / D * C + B` 即：`当前位置 = T / D * C + B` ，每次运动后，元素的当前位置

**使用 `window.scroll(x,y)` 和 `window.scrollY` 实现**

```html
<script>
  // 限定时运动到顶部
  var backTop = document.getElementById("back-top");
  var timer = null;
  var lock = false;
  // 限定时间500ms
  backTop.onclick = function () {
    if (lock) return;
    lock = false;
    // 已经运动的时间
    var T = 0;
    // 开始运动的位置
    var B = window.scrollY;
    // 目标位置是 0  var targe=0;
    // 总共需要改变的距离
    var C = 0 - B;
    // 总共需要运动的时间
    var D = 200;

    // 开始执行动画
    timer = setInterval(function () {
      T += 20; // 记录运动的时间
      // 当前滚动条运动的距离
      var currentDistance = (T / D) * C + B;
      // currentDistance <= 0
      if (T >= D) {
        clearInterval(timer);
        currentDistance = 0;
        lock = false;
      }
      window.scroll(0, currentDistance);
    }, 20);
  };
</script>
```

**使用 `document.documentElement.scrollTop` 实现**

```html
<script>
  var backTop = document.getElementById("back-top");
  var doc = document.documentElement || document.body;
  var timer = null;
  var lock = false;
  //点击后要处理的事情
  // 限定时间动画
  backTop.onclick = function () {
    if (lock) return;
    lock = true;
    // 运动的时间
    var T = 0;
    var B = doc.scrollTop; // 开始位置
    // target=0 目标位置
    var C = 0 - B; // 总共需要改变的距离
    var D = 500; // 总共运动的时间

    timer = setInterval(function () {
      // 记录运的时间
      T += 20;
      // 当前运动到的位置
      var currentDistance = (T / D) * C + B;
      // currentDistance < 0
      if (T >= D) {
        clearInterval(timer);
        currentDistance = 0;
        lock = false;
      }

      doc.scrollTop = currentDistance;
    }, 20);
  };
</script>
```

### 5、图片延时加载

![GIF2022-12-121-39-22](https://www.arryblog.com/assets/img/GIF2022-12-121-39-22.29c280b0.gif)

实现原理：

- 页面中所有需要做延时加载的图片上加上`class = 'lazy'` 和 `data-src = ' 图片真实地址'`
- 获取页面中所有`class`中包含`lazy`的元素，同时要判断元素是否为`img`标签且`data-src`是否有值。确保操作的元素是 img 元素，同时`data-src`中有图片地址。
- 当滚动浏览器的滚动条时，要判断对应的图片是否**进入可视区**，如果进入，则给`img.src`动态赋值
- 如果图片一但赋值，则后面就不需要再对此 img 标签做监听。则可以从数组对象中将其删除，同时把 lazy 样式删除
- 最后考虑浏览器窗口大小改变时的情况，还有要考虑对 scroll 和 resize 事件做节流操作

![image-20221201200514490](https://www.arryblog.com/assets/img/image-20221201200514490.7937ab64.png)

### 5.1、HTML 结构

```html
<style>
  html,
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  ul {
    /* width: 968px; */
    margin: 0 auto;
  }
  li {
    list-style: none;
    width: 200px;
    height: 200px;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ddd;
    float: left;
  }
  li img {
    width: 200px;
    height: 200px;
  }
</style>
<body>
  <ul id="J_container">
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/01.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/01.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/02.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/03.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/04.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/05.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/06.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/07.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/08.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/09.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/10.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/11.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/12.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/13.png"
        class="lazy"
      />
    </li>
    <li>
      <img
        src="./images/loading-svg/loading-bars.svg"
        data-src="./images/14.png"
        class="lazy"
      />
    </li>
  </ul>
</body>
```

### 5.2、JS 实现页面响应式布局



第一次打开页面或当浏览器窗品大小发生改变时，获取浏览器窗口的可视区宽 `clientWidth`

```js
var clientWidth =
  document.documentElement.clientWidth || document.body.clientWidth;
```

然后用`clienwWidth / 每个li元素的占位宽`（包括 margin，border，padding），对结果向上取整，计算得出页面一行最多能放几个`li`

```js
var count = Math.floor(clientWidth / 242);
```

利用 `count * 242` 动态计算得到其父容器`ul`的宽

```js
container.style.width = count * 242 + "px";
```

**完整实现代码**

```js
var container = document.getElementById("J_container"); // 获取ul元素
initUlWidth(); // 初始化ul宽
// throttle 为节流函数
window.addEventListener("resize", throttle(initUlWidth, 90));
function initUlWidth() {
  // 获取当前浏览器可视区的宽
  var clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  var count = Math.floor(clientWidth / 242);
  // 动态计算container的宽
  container.style.width = count * 242 + "px";
}
```

### 5.3、JS 实现懒加载（延时加载）效果

获取页面中所有`class = 'lazy'` 的元素，同时过滤掉不是图标的元素

```js
// 1、需要获取到所有需要延时加载的图片
var imgs = document.querySelectorAll(".lazy");
// 2、过滤掉不是图片的标签
imgs = Array.prototype.filter.call(imgs, function (item) {
  return item instanceof Image;
});
```

获取页面可视区的高

```js
// 获取浏览器可视区的高
var clientHeight =
  document.documentElement.clientHeight || document.body.clientHeight;
```

- 对获取的所有图片进行遍历，遍历时判断元素是否进入到可视区
- 元素进入可视区原理：`元素底部与浏览器可视区的高 > 0` 同时元素顶部与浏览器可视区的高要小于浏览器可视区高。 即`bottom > 0 && _top < clientHeight`
- 如果元素进入可视区，将图片保存在`data-src`属性上的正确地址赋值给`src`属性
- 同时将此图片从`imgs`数组中删除，以后不需要再监听了

```js
// 遍历所有过滤后得图片，然后查看图片是否进入到可视区，如果进入到可视区，就动态给图片添加真实的图片地址
for (var i = 0; i < imgs.length; i++) {
  // 判断图片是否进入可视区  bottom>0  && top<浏览器可视区高
  var rect = imgs[i].getBoundingClientRect();

  var bottom = rect.bottom;
  var _top = rect.top;
  // 以下条件成立，代表元素进入到可视区
  if (bottom > 0 && _top < clientHeight) {
    imgs[i].src = imgs[i].dataset.src; // 把自定义属性上的真实地址赋值给图片
    // 如果图片进入过一次可视区，动态赋过值，就不用再管他了
    var index = imgs.indexOf(imgs[i]);
    imgs.splice(index, 1);
    i--; // 一定要注意，i--
  }
}
```

- 当滚动条滚动时，或浏览器窗口大小发生改变时，会有其它图片进入到当前浏览器可视区,则需要添加对应的事件来监听。但整个过程不需要再重新获取页面的中的`class = 'lazy'`的元素，同时还要判断，如果 `imgs` 的长度为 `0`，则表示所有图片都加载完成，不需要再做任何处理
- 最后还要做相关节流操作

**完整的代码如下**

```js
// 以下内容，单独放在名lazyload.js 文件中，其它页面需要此效果，
// 只需要将图片上添加data-src属性，存放真实图片地址，同时添加class='lazy",最后调用lazyLoad()即可
(function () {
  // 实现延时加载
  function lazyLoad() {
    // 1、需要获取到所有需要延时加载的图片
    var imgs = document.querySelectorAll(".lazy");
    // 2、过滤掉不是图片的标签
    imgs = Array.prototype.filter.call(imgs, function (item) {
      return item instanceof Image;
    });
    lazy(); // 调用
    window.addEventListener("scroll", throttle(lazy, 100)); //  给window绑定滚动事件
    window.addEventListener("resize", throttle(lazy, 100));
    function lazy() {
      if (imgs.length === 0) return; // 当前数组中没有需要监听的图片了
      // 获取浏览器可视区的高
      var clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      // 遍历所有过滤后得图片，然后查看图片是否进入到可视区，
      // 如果进入到可视区，就动态给图片添加真实的图片地址
      for (var i = 0; i < imgs.length; i++) {
        // 判断图片是否进入可视区  bottom>0  && top<浏览器可视区高
        var rect = imgs[i].getBoundingClientRect();

        var bottom = rect.bottom;
        var _top = rect.top;
        // 以下条件成立，代表元素进入到可视区
        if (bottom > 0 && _top < clientHeight) {
          // 把自定义属性上的真实地址赋值给图片
          imgs[i].src = imgs[i].dataset.src;
          // 如果图片进入过一次可视区，动态赋过值，就不用再管他了
          var index = imgs.indexOf(imgs[i]);
          imgs.splice(index, 1);
          i--; // 一定要注意，i--
        }
      }
    }
  }

  /**
   * 节流函数
   * fn 事件处理函数
   * delay 函数执行间隔时间
   */
  function throttle(fn, delay) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      if (timer) return;
      timer = setTimeout(function () {
        // 函数体执行代码
        fn.apply(self, args);
        // 开锁
        timer = null;
      }, delay);
    };
  }

  window.lazyLoad = lazyLoad;
})();
```

### 6、吸顶盒导航



涉及知识点

- 过渡动画
- `window.onsrcoll`事件
- offsetTop、offsetHeight、scrollTop

![GIF2022-12-615-40-31](https://www.arryblog.com/assets/img/GIF2022-12-615-40-31.10ed2716.gif)

```html
<style>
  html,
  body {
    margin: 0;
    height: 100%;
  }
  .top {
    height: 50px;
    background-color: #000;
  }
  .header {
    height: 120px;
    background-color: skyblue;
  }
  .nav {
    width: 100%;
    height: 100px;
    background-color: red;
  }
  .nav2 {
    background-color: red;
    position: fixed;
    top: -100px;
  }
  .transition {
    transition: top 1s ease;
  }

  .main {
    height: 3000px;
  }
</style>

<!-- 模拟的头部内部 -->
<div class="top"></div>
<div class="header"></div>
<!-- 吸顶盒 -->
<!-- nav2相当于nav1的副本，不过nav2是固定定位在浏览器的外部 -->
<div class="nav nav1"></div>
<div class="nav nav2"></div>
<div class="main"></div>

<script>
  // 获取nav1与nav2
  var nav1 = document.querySelector(".nav1");
  var nav2 = document.querySelector(".nav2");
  var nav1Top = nav1.offsetTop; // nav1的顶部与浏览器顶部距离
  var bottom = nav1Top + nav1.offsetHeight; // nav1的底部与浏览器顶部距离

  //添加 scroll事件
  window.addEventListener("scroll", fn);
  function fn() {
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动条滚动距离 >= 元素底部与浏览器顶部距离
    if (scrollTop >= bottom) {
      nav2.classList.add("transition");
      //nav2 区块显示出
      nav2.style.top = "0px";
    }
    // 滚动条滚动距离 <= 元素顶部与浏览器项部距离
    if (scrollTop <= nav1Top) {
      nav2.classList.remove("transition");
      nav2.style.top = "-100px";
    }
  }
</script>
```

### 7、滚动加载更多



- 当滚动条滚动到最底部时，加载一批数据，填充到页面上
- 判断滚动条滚动到底部公式：`scrollHeight - scrollTop - clientHeight = 0`

| 属性         | 说明                             |
| :----------- | :------------------------------- |
| scrollTop    | 元素滚动出去的高                 |
| clientHeight | 元素的可视高（height + padding） |
| scrollHeight | 元素实际内容的高                 |

```js
var doc = document.documentElement || document.body;
if (doc.scrollHeight - doc.scrollTop - doc.clientHeight < 100) {
  // 快滚动到底部时，就开始请求加载数据
}
<style>
  .main {
    height: 3000px;
  }
  .box1 {
    background-color: khaki;
    height: 500px;
    margin: 50px;
  }
</style>

<div class="main"></div>
<!--  滚动到底部，动态加载的内容
<div class="box1"></div>
<div class="box1"></div>
<div class="box1"></div> 
-->

<script>
  // window滚动事件
  window.addEventListener("scroll", throttle(loadmore, 100));
  // 加载更多函数
  function loadmore() {
    var doc = document.documentElement || document.body;
    var scrollHeight = doc.scrollHeight;
    var scrollTop = doc.scrollTop;
    var clientHeight = doc.clientHeight;
    // 什么时开始加载下一批内容
    // 当浏览器的srollHeight - scrollTop -clientHeight=0时，表示滚动到页面的底部
    // 但我们更希望在快到达底部前，就开始加载下一批数据，所以可以设置100左右的差值
    if (scrollHeight - scrollTop - clientHeight < 100) {
      // 加载更多内容
      //   console.log("加载更多内容");
      // 每次滚动到底部，创建一批内容，加载到页面当中
      var div = document.createElement("div");
      div.className = "box1";
      document.body.appendChild(div);

      // ajax请求
      // 把数据渲染到页面当中来
    }
  }

  /**
   * 节流函数
   * fn 事件处理函数
   * delay 函数执行间隔时间
   */
  function throttle(fn, delay) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      if (timer) return;
      timer = setTimeout(function () {
        // 函数体执行代码
        fn.apply(self, args);
        // 开锁
        timer = null;
      }, delay);
    };
  }
</script>
```

### 8、楼梯式导航



涉及知识

- 元素添加自定义属性绑定下标序号
- 事件委托
- 查找数组中第一个大于 n 的数的下标
- 限时匀速动画
- `window.onscroll`事件
- scrollTop、offsetTop
- 函数节流

![GIF2022-11-1019-07-19](https://www.arryblog.com/assets/img/GIF2022-11-1019-07-19.ea43a0bd.gif)

布局思路

- foor-nav 用来制作右侧楼梯导航，采用固定定位，定位到浏览右侧
- header 和 footer 用来占位，模拟真实网站头部和尾部占用的空间
- main 中的直接子元素`floor-item`区域为楼梯导航滚动相关内容区块

### 8.1、HTML 结构

```html
<style>
  html {
    /* 滚动条平滑滚动效果 */
    scroll-behavior: smooth;
  }
  html,
  body,
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  body {
    background-color: #ddd;
  }
  .floor-nav {
    position: fixed;
    right: 50px;
    top: 100px;
    width: 50px;
    background-color: #fff;
    padding: 10px 10px;
  }
  .floor-nav li {
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #000;
    font-size: 14px;
    border-bottom: 1px dashed #ddd;
    cursor: pointer;
  }
  .floor-nav li:hover,
  .floor-nav li.active:hover {
    background-color: red;
    color: #fff;
  }

  .floor-nav li.active {
    color: red;
  }
  .main {
    width: 600px;
    margin: 0px auto;
  }
  .main .floor-item {
    width: 100%;
    background-color: skyblue;
    font-size: 50px;
    text-align: center;
    line-height: 200px;
    margin-top: 50px;
  }
</style>

<!-- 楼梯导航按扭开始 -->
<ul class="floor-nav" id="J_floor">
  <li>国创</li>
  <li>综艺</li>
  <li>娱乐</li>
  <li>电影</li>
  <li>游戏</li>
  <li>纪录片</li>
  <li>电视剧</li>
</ul>
<!-- 楼梯导航按扭开始 -->
<div class="header" style="height: 500px"></div>
<!--楼梯内容开始-->
<div id="J_app" class="main">
  <div class="floor-item" style="height: 500px">国创</div>
  <div class="floor-item" style="height: 530px">综艺</div>
  <div class="floor-item" style="height: 400px">娱乐</div>
  <div class="floor-item" style="height: 600px">电影</div>
  <div class="floor-item" style="height: 560px">游戏</div>
  <div class="floor-item" style="height: 400px">纪录片</div>
  <div class="floor-item" style="height: 620px">电视剧</div>
</div>
<!--楼梯内容结束-->
<div class="footer" style="height: 1500px"></div>
```

### 8.2、JS 实现思路

第一步：实现右侧楼梯导航按扭点击滚动效果

- 利用事件委托来实现，所有 li 的点击事件全委托给父元素`#J_floor`来实现
- 点击对应按扭实现：当前点击元素文字变红，其它文字为灰色，同时滚动条滚动到对应楼层
- 要实现当前文字变红，其它文字变灰，需要定义变量 `prevIndex` 来保存前一项被点击元素的下标

```js
// 获取id为 J_floor元素
var floorNav = document.getElementById("J_floor");
var navs = document.querySelectorAll("#J_floor li");
var prevIndex = -1; // 前一个楼梯按扭序号
// 事件委托，所有子元素li的点击事件委托给父元素来处理
floorNav.onclick = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  // 如果不是点击对应的li啥也不做
  if (tagName !== "li") return;

  // 点击后要处理的事情
  // 1.前面变红的li复原
  prevIndex !== -1 && navs[prevIndex].classList.remove("active");
  // 2.当前项变红色
  target.classList.add("active");
  // 3、把前一个序号更新为当前序号，供后面使用
  prevIndex = Array.prototype.indexOf.call(navs, target);
  // 4、滚动条滚动到当前楼层所在位置
  // .........具体实现思路看下一步，
};
```

**第二步：实现点击导航按扭后，滚动条滚动到对应楼层**



- 创建一个空数组`floorItemsTopArr = []`，用来保存每一个楼层的元素与浏览器顶部的距离
- 点击按扭时，找到对应按扭元素的下标，再找到`floorItemsTopArr`数组中对应下标的元素，获得当前浏览器滚动条需要滚动到的距离。
- 为了实现滚动条在滚动时能平滑滚动，可以在`html` 标签的样式中添加`scroll-behavior: smooth;`样式
- 因为`scroll-behavior: smooth;`目前在一些底版本浏览器中不支持，可以封装 JS 动画来实现

```css
html {
  /* 滚动条滚动效果 */
  scroll-behavior: smooth;
}
var floorItems = document.querySelectorAll("#J_app .floor-item");
var floorItemsTopArr = []; // 用来保存每一层的顶部与浏览器顶部的高

// 把所有 floor-item与body顶部的距离添加到一个数组floorItemsTopArr
for (var i = 0; i < floorItems.length; i++) {
  floorItemsTopArr.push(floorItems[i].offsetTop);
}

// 以下代码，对接到上一步的 4的下面
// 4、滚动条滚动到当前楼层所在位置
// 方法一：
window.scroll(0, floorItemsTopArr[prevIndex]);
// 方法二：
// var doc = document.documentElement || document.body;
// doc.scrollTop = floorItemsTopArr[prevIndex];

// 也可以调用手动封装的 JS动画来实现滚动条平滑滚动
// 方法三：
```

**JS 手动封装实现滚动条平滑滚动的 JS**

```js
/**
 * scrollByTop 滚动条从当前位置滚动到目标位置（只针对垂直方向）
 * target 滚动到的目标位置
 * delay 滚动的总时间
 */
function scrollByTop(target, delay = 200) {
  // 已经运动的时间
  var T = 0;
  // 开始运动的位置
  var B = window.scrollY;
  // 目标位置是 0  var targe=0;
  // 总共需要改变的距离
  var C = target - B;
  // 总共需要运动的时间
  var D = delay;

  // 开始执行动画
  timer = setInterval(function () {
    T += 20; // 记录运动的时间
    // 当前滚动条运动的距离
    var currentDistance = (T / D) * C + B;
    if (T >= D) {
      currentDistance = target;
      clearInterval(timer);
    }
    window.scroll(0, currentDistance);
  }, 20);
}
```

**第三步：实现滚动浏览器窗口，对应楼层按扭显示对应样式**



- 如何知道当前滚动条滚动所在的对应楼层呢 ？可以通过当前滚动条滚动的距离与楼层顶部与浏览器的距离来判断
- 找到数组中从前往后满足： **`滚动条滚动距离 > 楼层顶部与浏览器顶部距离的最后一个元素`** 。这个元素所在的下标，就是当前滚动条滚动到的楼层所对应的下标。把这个下标保存在变量`currentIndex`中，供后面使用。
- 找到对应楼层序号，就可以修改楼层的按扭样式。

```js
var currentIndex = -1; // 当前楼梯所在按扭序号
// 当滚动浏览器窗口时，对应导航的样式要显示到对应楼层
window.onscroll = function () {
  // 不断获取浏览器滚动的距离
  var scrollY = window.scrollY;
  // 找到当前滚动所在的楼层序号
  for (var i = 0; i < floorItemsTopArr.length; i++) {
    if (scrollY >= floorItemsTopArr[i]) {
      currentIndex = i; // 最后一次找到的i就是当前滚动所在的楼层
    } else {
      break;
    }
  }

  // 相关优化代码，会添加到此处
  // ........

  // 找到对应楼层后，需要处理的事情
  prevIndex !== -1 && navs[prevIndex].classList.remove("active");
  currentIndex !== -1 && navs[currentIndex].classList.add("active");
  prevIndex = currentIndex;
};
```

**第四步：性能优化**



- 如果滚动条一直在当前楼层中滚动，则不需要频繁执行更改楼层按扭样式的代码
- 如果`prevIndex === currentIndex` 说明当前滚动条一直在当前楼层滚动

```js
// 以下代码，添加到上一步，相关优化代码.....位置

// 优化处理，如果一直在当前楼层内滚动，不执行以下代码
if (prevIndex === currentIndex) return;
```

**第五步：第一个按扭和最后一个按扭样式的特殊情况**



- 当滚动条滚动在最上面，不在第一个楼层区，即 **`滚动距离 < 第一个楼层与浏览器顶部距离`**，则楼层按扭文字不变红
- 当滚动条滚动到最后面，不在最后一个楼层区，即 **`滚动距离 > 最后一个楼层与浏览器顶部距离 + 最后一个楼层的高度`** ，则最后一个楼层按扭文字也不变红
- 要使楼层按扭文字不变红，只需要把`currentIndex = -1`即可

```js
var len = floorItems.length;
// 最后一个元素底部与浏览器顶部距离
var bottom = floorItemsTopArr[len - 1] + floorItems[len - 1].offsetHeight;
if (scrollY < floorItemsTopArr[0] || scrollY > bottom) {
  currentIndex = -1;
}
```

### 8.3、完整源代码

```html
<style>
  html {
    /* 滚动条滚动效果 */
    scroll-behavior: smooth;
  }
  body,
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  body {
    background-color: #ddd;
  }
  .floor-nav {
    position: fixed;
    right: 50px;
    top: 100px;
    width: 50px;
    background-color: #fff;
    padding: 10px 10px;
  }
  .floor-nav li {
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #000;
    font-size: 14px;
    border-bottom: 1px dashed #ddd;
    cursor: pointer;
  }
  .floor-nav li:hover,
  .floor-nav li.active:hover {
    background-color: red;
    color: #fff;
  }

  .floor-nav li.active {
    color: red;
  }

  .main {
    width: 600px;
    margin: 0px auto;
  }
  .main .floor-item {
    width: 100%;
    background-color: skyblue;
    font-size: 50px;
    text-align: center;
    line-height: 200px;
    margin-top: 50px;
  }
</style>

<body>
  <!-- 楼梯导航按扭开始 -->
  <div class="header" style="height: 1500px"></div>

  <!-- 楼梯导航按扭开始 -->
  <ul class="floor-nav" id="J_floor">
    <li>国创</li>
    <li>综艺</li>
    <li>娱乐</li>
    <li>电影</li>
    <li>游戏</li>
    <li>纪录片</li>
    <li>电视剧</li>
  </ul>

  <!--楼梯内容开始-->
  <div id="J_app" class="main">
    <div class="floor-item" style="height: 500px">国创</div>
    <div class="floor-item" style="height: 530px">综艺</div>
    <div class="floor-item" style="height: 400px">娱乐</div>
    <div class="floor-item" style="height: 600px">电影</div>
    <div class="floor-item" style="height: 560px">游戏</div>
    <div class="floor-item" style="height: 400px">纪录片</div>
    <div class="floor-item" style="height: 620px">电视剧</div>
  </div>

  <!--楼梯内容结束-->
  <div class="footer" style="height: 3000px"></div>

  <script>
    // 获取id为 J_floor元素
    var floorNav = document.getElementById("J_floor");
    var navs = document.querySelectorAll("#J_floor li");
    var floorItems = document.querySelectorAll("#J_app .floor-item");
    var len = floorItems.length;
    var prevIndex = -1; // 前一个楼梯按扭序号
    var currentIndex = -1; // 当前楼梯所在按扭序号
    var floorItemsTopArr = []; // 用来保存每一层的顶部与浏览器顶部的高

    // 把所有 floor-item与body顶部的距离添加到一个数组floorItemsTopArr
    for (var i = 0; i < floorItems.length; i++) {
      floorItemsTopArr.push(floorItems[i].offsetTop);
    }

    // 事件委托，所有子元素li的点击事件委托给父元素来处理
    floorNav.onclick = function (e) {
      var target = e.target;
      var tagName = target.tagName.toLowerCase();
      // 如果不是点击对应的li啥也不做
      if (tagName !== "li") return;

      // 点击后要处理的事情
      // 1.前面变红的li复原
      prevIndex !== -1 && navs[prevIndex].classList.remove("active");
      // 2.当前项变红色
      target.classList.add("active");
      // 3、把前一个序号更新为当前序号，供后面使用
      prevIndex = Array.prototype.indexOf.call(navs, target);
      // 4、滚动条滚动到当前楼层所在位置
      // 方法一：
      window.scroll(0, floorItemsTopArr[prevIndex]);
      // 方法二：
      // var doc = document.documentElement || document.body;
      // doc.scrollTop = floorItemsTopArr[prevIndex];
      // 方法三
      //   scrollByTop(floorItemsTopArr[prevIndex]);
    };

    // 当滚动浏览器窗口时，对应导航的样式要显示到对应楼层
    window.onscroll = function () {
      // 不断获取浏览器滚动的距离
      var scrollY = window.scrollY;
      // 找到当前滚动所在的楼层序号
      // 楼层数据中最后一个满足： 条件的的元素所在序号
      for (var i = 0; i < floorItemsTopArr.length; i++) {
        if (scrollY >= floorItemsTopArr[i]) {
          currentIndex = i; // 最后一次找到的i就是当前滚动所在的楼层
        } else {
          break;
        }
      }
      // 考虑第一个和最后一个的特殊情况
      // 最后一个元素底部与浏览器顶部距离
      var bottom = floorItemsTopArr[len - 1] + floorItems[len - 1].offsetHeight;
      if (scrollY < floorItemsTopArr[0] || scrollY > bottom) {
        currentIndex = -1;
      }

      // 优化处理，如果一直在当前楼层内滚动，不执行以下代码
      if (prevIndex === currentIndex) return;

      // 找到对应楼层后，需要处理的事情
      prevIndex !== -1 && navs[prevIndex].classList.remove("active");
      currentIndex !== -1 && navs[currentIndex].classList.add("active");
      prevIndex = currentIndex;
    };
  </script>
</body>
```

## 六、重难点总结



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点



- 理解什么是 BOM
- 掌握 window 对象上的以下属性和方法：`window.scrollY`属性，`window.scroll()`和`window.scrollBy()`方法
- 掌握 URL 的组成部分
- 了解 navigator 对象的三大应用：检测浏览器、判断是否在微信中打开页面、设备判断 ios、android、web
- 区分 load 与 DOMContentLoaded 事件的执行顺序
- 如何动态加载 JS、CSS、图片

### 2、难点

WARNING

- 对查询字符串作处理，转换为对象形式并考虑数据类型
- 手写以下案例
  - 返回顶部
  - 图片延时加载
  - 吸顶盒导航
  - 滚动加载更多
  - 楼梯式导航