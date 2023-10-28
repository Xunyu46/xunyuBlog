---
title: 本地存储 Cookie、localStorage、sessionStorage 实践
date: 2023-10-29
sidebar: "auto"
categories:
  - 本地储存
tags:
  - 本地储存
publish: true
---

# 本地存储 Cookie、localStorage、sessionStorage 实践

TIP

本节内容我们开始学习本地存储，见名知意即我们将把数据存储在本地。本地存储相关的技术有：Cookie、localStorage、sessionStorage 的基本用法、实际应用、注意事项、面试真题解析等。

**Cookie**

- 认识 Cookie
- Cookie 的基本用法
- Cookie 的属性
- Cookie 的封装
- Cookie 在实际开发中的注意事项
- 服务端创建 Cookie
- Cookie 在实际开发中的实际应用

**localStorage**

- localStorage 的基本用法
- localStorage 在实际开发中的注意事项
- localStorage 的封装
- localStorage 在实际开发中的应用

**localStorage 和 sessionStorage 对比、实践与应用**

## 一、Cookie 简介

TIP

深入浅出 Cookie 是什么，Cookie 有什么用，在浏览器中如何操作 Cookie，基本用法，Cookie 的属性，Cookie 的封装 以及在实际开发中的应用和注意事项等。

### 1、Cookie 是什么

TIP

Cookie 的全称是 HTTP Cookie ，简称 Cookie

它是浏览器存储数据的一种方式，因为存储在用户本地，而不是存储在服务器上，属于本地存储一般会自动随着浏览器每次请求发送到服务器端。

**在 MDN 官网上的定义如下：**

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。Cookie 使基于[无状态 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview#http_是无状态，有会话的)的 HTTP 协议记录稳定的状态信息成为了可能。

> [MDN 官网上 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)的定义更多是站在后端的角度来理解 Cookie，当我们在课程最后讲解后端是如何创建 Cookie 时再来理解。

### 2、在浏览器中操作 Cookie

TIP

找到浏览器开发者工具中，打开 Application，手动添加浏览器的 Cookie 信息

![image-20221201211409231](https://www.arryblog.com/assets/img/image-20221201211409231.794f8794.png)

观察

添加完成浏览器本地的 Cookie 后，再次刷新当前网页，这时就会向服务器端发送请求。

> 观察 Cookie 是否会随着请求一起发送到服务器端 ，查看开发者工具中的 “Network”

![image-20221201233338497](https://www.arryblog.com/assets/img/image-20221201233338497.30744091.png)

注：

以上我们可以看到，在请求头中有一个字段 Cookie 后边就是我们之前添加的值。

> 当看到请求头中携带的 Cookie 时，说明它确实发送给了服务器端。

获取 Cookie ，即 获取到的就是 “名值对” 的形式

```js
// 获取 cookie
document.cookie;
```

![image-20221201234238172](https://www.arryblog.com/assets/img/image-20221201234238172.3de2c40f.png)

### 3、Cookie 的主要作用

TIP

Cookie 主要用于以下三个方面：

- 会话状态管理

> 如用户登录状态、购物车、游戏分数或其它需要记录的信息

- 个性化设置

> 如用户自定义设置、主题和其他设置

- 浏览器行为跟踪

> 如跟踪分析用户行为等

## 二、Cookie 的基本用法

TIP

这里我们主要学习浏览器端利用 JS 来操作 Cookie

> 即 JavaScript 写入 Cookie 和 读取 Cookie

### 1、写入 Cookie

- 写入 Cookie 语法

```js
document.cookie = "键=值";
```

- 在浏览器中写入 Cookie

```js
// 写入 Cookie
document.cookie = "username=icoding";
document.cookie = "sex=male";
document.cookie = "age=18";
```

注：

设置多个`Cookie`时，只能通过多次调用`document.cookie = '键=值”` 的方式逐个添加，无法批量添加

![image-20221202133224610](https://www.arryblog.com/assets/img/image-20221202133224610.1be9caec.png)

### 2、读取 Cookie

TIP

读取 Cookie 的值是一个由名值对构成的字符串，每个名值对之间由 `;` （一个分号 `+` 一个空格）隔开

```js
// 读取 Cookie
console.log(document.cookie); // username=icoding; sex=male; age=18
```

注：

以上 `document.cookie` 读取出来的是 全部的 Cookie ，不能通过特定的名称来读取特定的值，只能一次性全部读取出来。

> 那么，如何根据具体的名称来读取具体的值呢 ？

原生的 Cookie 是没有这样方法的，需要我们自己去封装（后边会深入讲解）

## 三、Cookie 的属性

TIP

深入浅出 Cookie 的属性 ，重点掌握 Cookie 的名称 Name 和 值 Value ，失效（到期）时间 Expires 或 Max-Age 即可，其他属性作为了解即可。

> Cookie 的属性有：

- Cookie 的名称（name)和值 value
- 失效（到期）时间
- Domain 域
- Path 路径
- HttpOnly
- Secure

### 1、Cookie 的名称 Name 和 值 Value

TIP

Name 和 Value 是最重要的两个属性，创建 Cookie 时必须填写，其他属性可以使用默认值

**Cookie 的名称 或 值如果包含非英文字母**

- 写入时需要使用 `encodeURIComponent()` 编码
- 读取时使用 `decodeURIComponent()` 解码

一般名称使用英文字母，不要用中文。值可以用中文，但一定需要编码

```js
// 名称和值 都是 英文
document.cookie = "username=icoding";
// 名称为英文，值为中文
document.cookie = `username=${encodeURIComponent("艾编程")}`;
// 名称和值 都是 中文
document.cookie = `${encodeURIComponent("用户名")}=${encodeURIComponent(
  "艾编程"
)}`;

// 读取Cookie，并解码
const cookie = decodeURIComponent(document.cookie);
console.log(cookie); // 用户名=艾编程; username=艾编程
```

注：

之所以使用 `encodeURIComponent()` 方法进行编码，因为 cookie 在前端存储时有中文没问题。一旦传递到后端就可能获取不到值了。

![image-20221202195937472](https://www.arryblog.com/assets/img/image-20221202195937472.a4e6259c.png)

### 2、expires 和 max-age 属性

TIP

- `expires` 和 `max-age`属性都可以设置 Cookie 的失效期，Cookie 的失效（到期）时间可以理解为 Cookie 生命的倒计时。
- 如果 Cookie 没有设置失败时间，这样的 Cookie 称为：**“会话 Cookie”**，只要关闭浏览器，Cookie 就会被浏览器清除（注意是关闭浏览器，不是单个标签页）。
- 如果设置了对应的失败时间，只有到时间后，才会被浏览器清除。

```js
// 以下方式写入Cookie，属于会话Cookie，没有设置失效到期时间，只要关闭浏览器，Cookie消失
document.cookie = "username=icoding";
```

![image-20221202201518367](https://www.arryblog.com/assets/img/image-20221202201518367.101440bf.png)

Session 表示会话，即 浏览器关闭时，Cookie 消失

> 如果 Cookie 需要长时间存储，可以设置**expires**或**max-age** 属性

| 属性        | 说明                                                |
| :---------- | :-------------------------------------------------- |
| **expires** | 设置具体的过期时间，值为 Date 类型                  |
| **max-age** | 值为数字，表示当前时间 + 多少秒后过期，单位是**秒** |

```js
// expires 过期时间   值为 Date 类型
document.cookie = `username=icoding; expires=${new Date("2023-3-22 00:00:00")}`;
// max-age 表示多少秒后过期，20秒
document.cookie = `password=12345; max-age=20`;
// 需要cookie存储一个月，按 30天计算，如下
document.cookie = `age=33; max-age=${30 * 24 * 3600}`;
```

![image-20230227225330364](https://www.arryblog.com/assets/img/image-20230227225330364.95ab7036.png)

### 3、删除 Cookie

TIP

- 如果要删除一个 Cookie，我们只需要设置他的失效期，让他马上失效就好。
- 如果 max-age 的值是 0 或 负数，则 Cookie 就会失效，从浏览器中被删除
- 如果 expires 的时间小于当前时间，则 Cookie 就会失效，从浏览器中被删除

```js
// expires 过期时间   值为 Date 类型
document.cookie = `username=icoding; expires=${new Date("2023-3-22 00:00:00")}`;
// 2023-2-22 小于当前时间，当前时间 2023-2-23
document.cookie = `username=icoding; expires=${new Date("2023-2-22 00:00:00")}`;

//  max-age属性，需要cookie存储一1天
document.cookie = `age=33; max-age=${24 * 3600 * 30}`;
// max-age=-1或0  表示删除cookie
document.cookie = "age=33;max-age=-1";
```

### 4、Domain 属性

TIP

`Domain` 属性指定了哪些域名可以访问该 Cookie。如果 Domain 省略未写，其默认为当前域名

- 通过 JS 添加 `domain` 属性，其 domain 值只能是当前域或父域
- 使用 JS 也只能读写当前域 或 父域的 Cookie ，无法读写其他域的 Cookie

**当前域和父域的解读**

- 当我们访问小米的 PC 端网站 `www.mi.com` 或 移动端 `m.mi.com` 网站时
- 当前域：`www.mi.com`和 `m.mi.com` 表示当前访问的域名，为当前域
- 父域：`.mi.com` 也就是上面两个域名共有的域，称为两者的父域

```js
// 在 m.mi.com域名下，添加发下Cookie，在www.mi.com域名下能访问到该Cookie
document.cookie = `清心=124; domain='.mi.com'`;

// 在m.mi.com域名下，添加以下Cookie，在www.mi.com域名下不能访问到该Cookie
document.cookie = "张三=123";
document.cookie = `清心=124; domain='m.mi.com'`;
```

### 5、Path 路径

TIP

`Path` 属性指定了一个 URL 路径， 限定了访问 Cookie 的范围（同一域名下）

如果 path 省略未写，其值默认为当前路径（当前文件所在文件夹路径）

- 使用 JS 只能读写当前路径 和 上级路径的 Cookie ，无法读写下级路径的 Cookie
- 同时在当前路径中，path 只能设置当前或上级路径，不能设置成下级路径

创建以下文件目录结构

![image-20230227233232466](data:image/png;base64,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)

```js
// docs/doc.html
document.cookie = `doc='doc123'; max-age=${24 * 3600}; path=/docs`;
// 上面代码等同于下面代码
// document.cookie = `doc='doc123'; max-age=${24 * 3600};`;
console.log(document.cookie); // doc='doc123'

// docs/web/web.html
document.cookie = `web='web123'; max-age=${24 * 3600}; path=/docs/web `;
console.log(document.cookie); // web='web123'; doc='doc123'

// docs/web/http/http.html
document.cookie = `http='http123';max-age=${24 * 3600}; path=/docs/web/http `;
console.log(document.cookie); // http='http123'; web='web123'; doc='doc123'
```

注：

- `/` 表示 `http://www.xxx.com/`以下目录都可以访问这个 Cookie，但以上都不行
- `/docs` 表示 `http://ww.xxx.com/docs`以下目录都可以访问这个 Cookie，但以上都不行
- `/docs/web` 表示`http://ww.xxx.com/docs/web` 以下目录都可以访问这个 Cookie，但以上都不行

![image-20230227234605669](https://www.arryblog.com/assets/img/image-20230227234605669.7a966e95.png)

在当前路径中，path 只能设置当前或上级路径，不能设置成下级路径

```js
// 以下代码属于 /docs/doc.html页面

// 错误写法 因为path不能指向当前路径的上级路径
document.cookie = `doc='doc123'; path=/doc/web`;

// 正确写法
document.cookie = `doc='doc1'; path=/docs`;
document.cookie = `doc='doc123'; path=/`;
```

### 6、判断是否为同一 Cookie

TIP

通过上面的学习，我们知道，只有当 Name、Domain、Path 这三个字段都相同时，才是同一个 Cookie

```js
// 以下为相同Cookie
document.cookie = `doc='doc1'; path=/docs`;
document.cookie = "doc=abc"; // 其path默认值为 /docs

// 以下都为不同Cookie
document.cookie = `doc='doc123'; path=/docs`;
document.cookie = `doc='doc123'; path=/`;
```

### 7、HttpOnly 属性

TIP

设置了 HttpOnly 属性的 Cookie 不能通过 JS 去访问，禁止 JS 访问也是为了安全性考虑。

HttpOnly 属性不能通过 JS 来设置，只能通过服务端来设置。如果我们想要看到效果，可以手动在浏览器的控制台勾选。

![image-20230228001241131](https://www.arryblog.com/assets/img/image-20230228001241131.6e02d53d.png)

注：

在当前页面的控制台操作`document.cookie`时，只能获取到`doc = doc123` ，说明 HttpOnly 属性选中时，JS 是无法读取当前 Cookie

### 8、Secure 安全标志

TIP

标记为 `Secure` 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。它永远不会使用不安全的 HTTP 发送（本地主机除外）

![image-20221202232058751](https://www.arryblog.com/assets/img/image-20221202232058751.072b4c2e.png)

注意

我们在浏览器中看到 Secure 有打 `√` 时，就标明 该 Cookie 信息必须是在 https 的情况下才可以发送给服务端

### 9、什么样的 Cookie 才能发送到服务器端

TIP

Domain、Path、Secure 都要满足条件，还不能过期的 Cookie 才能随着请求发送到服务器端

## 四、Cookie 的封装

TIP

前边几节中我们学习了通过 JS 来 写入、读取、删除 Cookie，我们在使用的过程中也发现了 Cookie 原生提供的方式都不好用。因此，我们现在开始对 Cookie 进行封装，让 Cookie 在实际开发中使用起来更方便。

> 需要封装写入 Cookie，读取 Cookie，删除 Cookie 这三个功能。会用到我们前面学习过的 ES6 Module 模块的方式进行导入和导出。

### 1、封装 cookie

TIP

新建 `cookie.js` 文件，封装成一个模块 ，创建一个 Cookie 类，添加三个静态方法，将 Cookie 类做为接口导出

- set 方法，设置 cookie
- get 方法，通过 cookie 的 name 获取 value 值
- remove 方法，通过 cookie 的 name 删除对应的 cookie

```js
class Cookie {
  // set方法，用来添加Cookie
  // name 和 value 是必传项
  // {} 对象中的属性是非必传项，这是对象字面量的新增简洁表示法
  // { maxAge, domain, path, secure } = {} 设置默认值，在没有传值的情况下给 {} 对象
  static set(name, value, { maxAge, domain, path, secure } = {}) {
    // 对传过来的name和value编码
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    // 设置失效时间
    if (typeof maxAge === "number") {
      cookieText += `; max-age=${maxAge}`;
    }
    // 设置访问域
    if (domain) {
      cookieText += `; domain=${domain}`;
    }
    // 设置路径
    if (path) {
      cookieText += `; path=${path}`;
    }
    // 设置安全标志
    if (secure) {
      cookieText += `; secure=${secure}`;
    }
    document.cookie = cookieText;
  }
  // get方法，用来获取Cookie
  // 原来通过 document.cookie 获取的 Cookie 值是：
  // "username=icoding; age=20; sex=male"
  // 对于以上有规律的字符串可以使用 split("; ") 分割拆分成一个数组，分割后如下
  // 得到一个数组 ['username=icoding', 'age=20', 'sex=male']
  static get(name) {
    // 将获到的name解码
    name = encodeURIComponent(name);
    // 将读取到的cookie信息字符串，通过"; "分割成一个数组
    let cookies = document.cookie.split("; ");
    // 利用for...of来遍历数组
    for (let item of cookies) {
      const [cookieName, cookieValue] = item.split("=");
      if (cookieName === name) {
        // 解码
        return decodeURIComponent(cookieValue);
      }
    }
    // 如果最后没有找到
    return;
  }
  // remove方法，用来删除Cookie
  // 根据 name，domain 和 path 删除 Cookie
  // name 必传参数
  // domain 和 path 可选项
  static remove(name, { domain, path } = {}) {
    this.set(name, "", { domain, path, maxAge: -1 });
  }
}
// 默认导出
export default Cookie;
```

新建一个 `cookie.html` 文件，导入封装好的 cookie 模块，调用对应的方法

```html
<script type="module">
  // 导入 Cookie 模块
  import Cookie from "../Cookie.js";
  // 设置Cookie
  Cookie.set("username", "清心", { maxAge: 10 });
  Cookie.set("age", 33, { path: "/" });
  Cookie.set("sex", "女", { secure: "secure" });

  // 获取Cookie
  console.log(Cookie.get("username"));
  console.log(Cookie.get("age"));
  console.log(Cookie.get("sex"));

  // 删除Cookie
  Cookie.remove("age", { path: "/" });
  Cookie.remove("sex");
</script>
```

## 五、Cookie 的注意事项

TIP

在实际开发中需要注意，前后端都可以写入和获取 Cookie ，Cookie 有数量限制，Cookie 有大小限制。

### 1、Cookie 有数量限制

TIP

每个域名下的 Cookie 数量有限，具体有多少无法确定，得看浏览器，每个都会不一样

> 以下数据也只是参考，不能作为实际数据来用，因为浏览器在更新，相关限制也会出现变动

| Cookie 限制             | Edge  | Opera  | Firefox |    Safari    |    Chrome    |
| :---------------------- | :---- | :----: | :------ | :----------: | :----------: |
| Cookie 个数（每个域）   | 50 个 | 180 个 | 150 个  | 没有个数限制 | 没有个数限制 |
| Cookie 总大小（字节数） | 4095  |  4096  | 4097    |     4097     |     4097     |

注：

- 浏览器 Cookie 的数量限制只跟 每个域名下 Cookie 数量有关系
- 当超过单个域名限制之后，再设置 Cookie ，浏览器就会清除以前设置的 Cookie

> 因此，在实际开发中不要过多的设置 Cookie ，要考虑它的数量限制，防止发生无法预期的后果

### 2、Cookie 有大小限制

TIP

Cookie 的存储容量很小，最多只有 4KB 左右（具体在以上表格中），这里对容量的限制不是针对一个 Cookie，是针对一个域名下的所有 Cookie 而言

在实际开发中一般是遇不到超出 Cookie 的数量和大小限制的，我们正常也不会设置那么多的 Cookie。

> 如果真的设置了很多 Cookie，就需要考虑下 Cookie 的限制了。

### 3、前后端都可以写入 和 获取 Cookie

TIP

- 不仅仅前端可以创建 Cookie，随着请求发送到服务器端
- 后端同样可以创建 Cookie ，通过响应发送到前端来，之后的请求总会携带 Cookie 发送到后端
- 到底 Cookie 是从前端来创建还是后端来创建，就需要根据具体的业务需求来了

> 接下来我们简单来了解下服务端创建 Cookie

## 六、服务端创建 Cookie

TIP

我们通过图解和代码来帮助大家理解服务端创建 Cookie 的过程。服务端是后台开发人员需要掌握的，我们这个阶段只需要先了解就好，因为需要操作服务器。

> 所以我们需要简单学习下 node，用来搭建一个简单的 HTTP 服务器。

### 1、什么是 Node.js

TIP

- `Node.js` 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。
- `Node.js` 为 JavaScript 提供了在服务端运行的环境，使得 JavaScript 也能开发服务端的程序，前后端统一语言，统一模型的梦想得以实现

`Node.js` 2009 年诞生，2015 到 2016 左右在中国就火起来了，Node 火了之后带来了连锁反应。

2016 年前后，以 webpack 为代表的 **`Node.js` 工作流工具** 使前端开发的开发形式产**生了翻天覆地的变化**。并且，随着 **Vue / React 的诞生**，使前端开发进入了框架时代。

> 在今天，可以说前端开发 **"上天入地，无所不能"**：PC 端 web 开发、移动 web 开发、APP 开发、小程序开发、服务端开发等等都能搞定。

注：

我们日常听到 `Node.js` 时，要注意区分他到底说的是 平台 还是 `Node.js` 语言，因此我们讲 `Node.js` 有两个层面的含义：

- `Node.js` 是个平台或工具，即在 `Node.js` 平台上安装模块或包，类似于前端在浏览器上安装插件一样
- `Node.js` 语言 = 后端 JavaScript = ECMAScript + IO + File + ... 等服务端的操作

我们前端常说的 Node 更多是指如何在 `Node.js` 平台上安装模块或包，类似前端在浏览器上安装插件一样。

因此，大家在日常开发中会用到在 `Node.js` 平台上安装模块或包， 这只是使用了 `Node.js` 平台，并不代表你就懂 `Node.js` 语言了（`Node.js` 语言本质上它就类似 PHP、Python、Perl、Ruby 等服务端语言，包括 Java 这些服务端的语言能干的 `Node.js` 都能干，非常强大 ），这个一定要搞清楚，务必盲目的自信，避免闹笑话。

> 但本节课的案例中为了帮助大家更好的理解 Cookie 的前后交互，会简单涉及 `Node.js` 语言相关内容，大家不要深究，只做了解即可。

### 2、node 的安装

TIP

Node.js 官方下载地址：[https://nodejs.org/en/download/(opens new window)](https://nodejs.org/en/download/)

![image-20221123214804844](https://www.arryblog.com/assets/img/image-20221123214804844.4bd63338.png)

选择最新稳定版，根据自己的操作系统选择对应的下载地址

> 下载完成后，直接下一步，默认安装即可

### 3、检测是否安装成功及版本号

TIP

在 window 的 cmd 命令窗口，输入 `node -v`

> 安装 node 时，会自动安装 npm , npm 是 `node.js` 的包管理器

![image-20221123232718380](data:image/png;base64,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)

在 VSCode 的终端、GitBash、Windows PowerShell、Mac 系统命令终端 等 都可以输出以下命令来检测

```shell
# 检测 node 是否安装及版本，正常显示版本号说明已经安装相应的版本
node -v

# 检测 npm 是否安装及版本，正常显示版本号说明已经安装相应的版本
npm -v
```

### 4、node 搭建服务器

TIP

创建 `server.js` 文件

> 文件内容如下

```js
// 加载Node.js自带的http模块，http模块主要用来创建HTTP服务器
const http = require("http");
// 创建HTTP服务器  回调函数中的request用来接受请求数据，response用来处理响应数据
http
  .createServer(function (request, response) {
    // 设置响应头，解决中文乱码问题
    response.writeHead(200, {
      // 返回内容的类型和编码
      "Content-type": "text/plain;charset=utf-8",
    });
    // response.write方法向前端返回数据，该方法可调用多次,多次调用的数据会被拼接到一起返回
    response.write("hello");
    response.write("world");
    // 必须调用response.end方法结束请求，否则前端会一直处于等待状态，
    // response.end方法也可以用来向前端返回数据
    response.end("发送完，结束");
  })
  .listen(8886); // 指定HTTP服务器监听的端口号

console.log("Server running at http://127.0.0.1:8886");
```

运行流程

- 执行程序，在 VSCode 的终端命令中运行 `node server.js`命令来执行程序，程序启动成功后，在地址栏中输入`http://127.0.0.1:8886` 回车，就可以看到返回的内容。
- 返回上级目录，在 VSCode 的终端命令中运行`cd ../`回车
- 切换到下级目录，在 VSCode 的终端命令中运行`cd 目录地下`回车 如：`cd Desktop/test`
- 终止程序执行，使用快捷键 `ctrl + C`

常见的返回数据类型（MIME 类型）

MIME 类型就是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。

> 多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。

- 普通文本： `text/plain`
- JS 代码：`application/javascript`
- HTML 代码： `text/html`
- JSON 类型：`application/json`
- 图片类型：`image/gif` 、`image/jpeg`、`image/png`
- 设置编码的格式： `charset = utf-8`

### 5、服务端 Cookie 的创建过程

TIP

服务端在响应头中设置`Set-Cookie` 选项，然后发送到浏览器（客户端），浏览器对应的数据存储 Cookie 中，并在下次向同一服务器再发起请求时携带并发送到服务器上。

![image-20230227203535223](https://www.arryblog.com/assets/img/image-20230227203535223.1752b1a6.png)

创建过程解析

- 当前端（浏览器端）第一次发送 HTTP 请求时，服务端收到 HTTP 请求后，服务端可以在响应标头里面添加一个或多个 `Set-Cookie` 选项。
- 浏览器收到响应后会将接受的`Set-Cookie`中的数据保存在浏览器的`Cookie`中。
- 当下一次前端（浏览器端）再次向服务端发送 HTTP 请求时，会将其放在 HTTP 请求头的`Cookie`中，发送到服务端。服务端收到这个数据后，会拿这个数据来做校验....

### 6、代码演示 Cookie 创建过程

```js
// // http模块，主要用来搭建 HTTP 服务器
const http = require("http");
// http.createServer() 方法创建服务器
//并使用 listen 方法绑定 8889 端口
//函数通过 request, response 参数来接收和响应数据。
http
  .createServer(function (request, response) {
    // 获取请求端发过来的Cookie
    const cookie = request.headers.cookie;
    console.info(cookie);
    // 设置响应头信息
    response.writeHead(200, {
      // 发送内容为文本，编码格式为utf-8
      "content-Type": "text/plain;charset=utf-8",
      // 响应头中添加cookie
      "Set-Cookie": ["username=qxin"],
      // 添加多个Cookie
      // 'Set-Cookie':['username=qxin','age=44; max-age=1000']
    });
    // 响应体内容
    response.end("Hello World");
  })
  .listen(8889);

console.log("server running at 127.0.0.1:8889/");
```

运行流程

- 先安装 node，然后在一个文件夹中打开 VSCode，在 VSCode 中创建`server.js`文件，文件内容如上面代码。
- 然后在终端执行`node server.js`命令运行程序，程序启动成功后，在浏览器地址栏输入：`http://127.0.0.1:8889/` 就可以向服务端发起 Http 请求，同时服务端响应内容`Hello World`。
- 第一次向 `http://127.0.0.1:8889/` 发起请求时，请求头中并没有 Cookie 信息，服务端接收请求后，在响应头中设置了`Set-Cookie`，所以但响应头信息中有`Set-Cookie: username = qxin`信息。这时候浏览器会把响应头`Set-Cookie`中的信息，保存在浏览器的 Cookie 中。
- 第二次向 `http://127.0.0.1:8889/` 发送请求时，请求头中携带了 `Cookie：username = qxin` 信息，同时服务端读取到请求头中的 Cookie，并在服务端的终端打印出来。

> 在当前页面中，打开控制台，选择 Network 面板，然后刷新浏览器，然后按下图操作，就能看到整个过程。

![image-20230227214100554](https://www.arryblog.com/assets/img/image-20230227214100554.0d4e5e08.png)

![image-20230227213848747](https://www.arryblog.com/assets/img/image-20230227213848747.f9131312.png)

## 七、Cookie 在实际开发中的实际应用

TIP

深入浅出 Cookie 在实际开发中的实际应用，使用 Cookie 实现中英文网站语言切换

### 1、Cookie 实现中英文网站语言切换

TIP

当用户第一次访问网站时，默认显示的是中文网站，如果点击了页面的英文切换按扭，则切换到英文网站。下次打开网站后显示的就是英文版的。

### 1.1、实现原理

TIP

- 第一次发送请求，服务端会判断请求头中是否有对应的 Cookie，如果没有，则默认发送的中文版的网站
- 点击页面中英文按扭，在 Cookie 中添加`language=en; max-age=${365*24*3600}"`，然后利用`window.location='/'`重新向后端发送一次请求。
- 点击页面中中文按扭，在 Cookie 中添加`language=cn; max-age=${365*24*3600}"`，然后利用`window.location='/'`重新向后端发送一次请求
- 服务器接受请求头中的 Cookie，判断 cookie 值，如是为`en`,则发送英文网站，否则发送中文。随后的每次请求，请求头中都会携带 Cookie，服务端都会根据请求头中的 Cookie 来判断是发送中文网站还是英文网站

### 1.2、代码实现步骤

TIP

创建两个 HTML 页面

- `en.html`表示英文网站
- `cn.html` 表示中文网站

在页面中添加对应的中英文切换按扭，点击对应的按扭，创建对就的 Cookie 存入到浏览器中，然后利用`window.location = '/'` 重新向后端发送一次请求，后端会根据这一次请求，响应对应的内容

> `cn.html`页面

```html
<body>
  <button id="cn">中文</button>
  <button id="en">英文</button>
  我爱你

  <script>
    const cn = document.getElementById("cn");
    const en = document.getElementById("en");
    cn.addEventListener("click", () => {
      //创建Cookie
      document.cookie = `language=cn; max-age=${365 * 24 * 3600}`;
      window.location = "/";
    });

    en.addEventListener("click", () => {
      //创建Cookie
      document.cookie = `language=en; max-age=${365 * 24 * 3600}`;
      window.location = "/";
    });
  </script>
</body>
```

> `en.html`页面

```html
<body>
  <button id="cn">中文</button>
  <button id="en">English</button>
  I love you
  <script>
    const cn = document.getElementById("cn");
    const en = document.getElementById("en");
    cn.addEventListener("click", () => {
      //创建Cookie
      document.cookie = `language=cn; max-age=${365 * 24 * 3600}`;
      window.location = "/";
    });

    en.addEventListener("click", () => {
      //创建Cookie
      document.cookie = `language=en; max-age=${365 * 24 * 3600}`;
      window.location = "/";
    });
  </script>
</body>
```

> 用 node 创建服务器，具体代码如下

```js
// http模块，主要用来搭建 HTTP 服务器
const http = require("http");
// 文件操作模块
const fs = require("fs");

// 创建服务器
http
  .createServer((request, response) => {
    // 获取请求体中的cookie
    const cookie = request.headers.cookie;
    const language = cookie ? cookie.split("=")[1] : "cn";
    let html = ""; // 保存响应内容体
    // 根据Cookie的内容，来决定发送的内容
    if (language === "en") {
      html = fs.readFileSync("./en.html");
    } else {
      html = fs.readFileSync("./cn.html");
    }

    // 设置响应头信息 200 表示状态响应成功，
    // Content-Type 响应主体的内容类型为html文件，编码格式utf-8
    response.writeHead(200, {
      "Content-Type": "text/html;charset=utf-8",
    });
    // 发送响应体内容
    response.end(html);
  })
  .listen(8889); // 监听端口

console.log("Server running at http://127.0.0.1:8889/");
```

### 2、升级版

TIP

在上面的版本中，我们没有办法在 cn.html 和 en.html 页面使用模块化加载 Cookie.js 来操作 Cookie，本质是因为`http://127.0.0.1:8889/Cookie` 请求失败，后端并没有针对这个请求做相关的响应（也就返回 Cookie.js 文件）。

> 所以我们需要根据用户的请求路径来响应不同的内容

> `cn.html`页面

```html
<button id="cn">中文</button>
<button id="en">英文</button>
我爱你

<script type="module">
  // 模块化导入JS
  import Cookie from "./Cookie";
  const cn = document.getElementById("cn");
  const en = document.getElementById("en");
  cn.addEventListener("click", () => {
    //创建Cookie
    Cookie.set("language", "cn", { maxAge: 365 * 24 * 3600 });
    // 重新加载页面
    window.location = "/";
  });

  en.addEventListener("click", () => {
    //创建Cookie
    Cookie.set("language", "en", { maxAge: 365 * 24 * 3600 });
    window.location = "/";
  });
</script>
```

> `en.html`页面

```html
<button id="cn">中文</button>
<button id="en">English</button>
I love you

<script type="module">
  // 模块化导入JS
  import Cookie from "./Cookie";
  const cn = document.getElementById("cn");
  const en = document.getElementById("en");
  cn.addEventListener("click", () => {
    //创建Cookie
    Cookie.set("language", "cn", { maxAge: 365 * 24 * 3600 });
    // 重新加载页面
    window.location = "/";
  });

  en.addEventListener("click", () => {
    //创建Cookie
    Cookie.set("language", "en", { maxAge: 365 * 24 * 3600 });
    // 重新加载页面
    window.location = "/";
  });
</script>
```

> `server.js`页面

```js
// http模块，主要用来搭建 HTTP 服务器
const http = require("http");
// 文件操作模块
const fs = require("fs");

// 创建服务器
http
  .createServer((request, response) => {
    // 请求根目录
    if (request.url === "/") {
      // 获取请求体中的cookie
      const cookie = request.headers.cookie;
      const language = cookie ? cookie.split("=")[1] : "cn";
      let html = ""; // 保存响应内容体
      if (language === "en") {
        html = fs.readFileSync("./en.html");
      } else {
        html = fs.readFileSync("./cn.html");
      }

      // 设置响应头信息 200 表示状态响应成功，
      // Content-Type 响应主体的内容类型为html文件，编码格式utf-8
      response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
      });
      // 发送响应体内容
      response.end(html);

      //----------------------------------------------------------------
      // 请求 /Cookie目录
    } else if (request.url === "/Cookie") {
      // 读取JS文件
      const js = fs.readFileSync("./Cookie.js");
      // 设置响应头
      response.writeHead(200, {
        "Content-Type": "application/javascript;charset=utf-8",
      });
      // 发送响应体内容
      response.end(js);
    }
  })
  .listen(8889); // 监听端口

console.log("Server running at http://127.0.0.1:8889/");
```

## 八、LocalStorage 简介

TIP

深入浅出 localStorage 在实际开发中的实践和应用

### 1、localStorage 是什么

TIP

有一些数据确实是需要存储在本地，但它却不需要发送到服务器端，所以它并不适合放在 Cookie 中。那么，localStorage 就是一个不错的选择。

localStorage 也是一种浏览器存储数据的方式（本地存储），它只存储在本地，不会发送到服务器端（不会像 Cookie 那样发送到服务器端）。

> 这样以来

- 对于那些你既想存储在用户本地，又不想发送到服务器端的数据，就可以存储在 localStorage 中
- 而那些既希望它存储在本地，又希望它能随着请求发送到服务器端的数据就可以存储在 Cookie 中

### 2、在浏览器中操作 localStorage

TIP

localStorage 也是按域名来存储的，在浏览器可直接查看。

> 如下

![image-20221205235241206](https://www.arryblog.com/assets/img/image-20221205235241206.39760f7f.png)

Local Storage 中的数据是以键值对的形式存储的

## 九、LocalStorage 的基本用法

TIP

我们可以通过`window.localStorage`对象来操作浏览器中的 Local Storage 数据。

### 1、localStorage 对象

TIP

通过`window.localStorage`对象可以获取浏览器 Local Storage 中所有的项的数据

![image-20230228211340286](https://www.arryblog.com/assets/img/image-20230228211340286.e3f5bfde.png)

```js
// 获取本地所有 Local Storage
console.log(localStorage);

// 控制台输出结果： Storage {font-size: '12px', color: '#666', background-color: 'skyblue', length: 3}
```

localStorage 对象的 length 属性表示存在的 key 和 value 键值对有多少项。

```js
console.log(localStorage.length); // 3
```

### 2、localStorage 对象的方法

TIP

其中`window.localStorage`对象身上提供了以下方法来操作数据。

| 方法                 | 说明                                    |
| :------------------- | :-------------------------------------- |
| `setItem(key,value)` | 为本地的 Local Storage 添加一个数据项。 |
| `getItem(key)`       | 根据对应的键名，获取对应的键值          |
| `removeItem(key)`    | 根据键名，移除指定项                    |
| `clear()`            | 移除所有的 Local Storage 项             |

### 3、setItem(key,value)

TIP

`setItem(key,value)` 为本地的 Local Storage 添加一个数据项。

```js
localStorage.setItem("font-size", "12px");
localStorage.setItem("color", "#666");
localStorage.setItem("background-color", "skyblue");
```

![image-20230228211340286](https://www.arryblog.com/assets/img/image-20230228211340286.e3f5bfde.png)

### 4、getItem(key)

TIP

`getItem(key)`根据对应的键名，获取对应的键值，获取不存在的会返回 null

```js
localStorage.getItem("font-size"); // "12px"
localStorage.getItem("color"); // "#666"
localStorage.getItem("background-color"); // "skyblue"
```

### 5、removeItem(key)

TIP

```
removeItem(key)`方法根据键名 `key`，移除指定项，如果删除不存在的 `key`，不会报错。这个方法没有返回值或返回`undefined
// 移除（删除）不存在的 key，不报错
localStorage.removeItem("username");
// 移除存在的指定项
localStorage.removeItem("font-size");
localStorage.removeItem("color");
```

![image-20230228212905902](https://www.arryblog.com/assets/img/image-20230228212905902.6180322d.png)

### 6、clear()

TIP

`clear()`方法用来移除所有的 localStorage 数据项

```js
// 移除所有
localStorage.clear();

// 打印输入 localStorage
console.log(localStorage); // Storage {length: 0}
```

## 十、localStorage 的注意事项

TIP

深入浅出 localStorage 在实际项目开发中有哪些需要注意的，localStorage 的存储期限，键和值的类型，不同域名下能否共用 localStorage 等。

### 1、localStorage 的存储期限

TIP

localStorage 是持久化的本地存储，除非手动清楚（如 通过 JS 删除 或 清除浏览器缓存）否则，数据永远不会过期的。

### 1.1、与 localStorage 对应的是 sessionStorage

TIP

sessionStorage 当前会话结束（如：关闭浏览器）的时候，sessionStorage 中的数据会被清空

> 操作 sessionStorage 的方法和操作 localStorage 的方法一模一样

```js
// 添加项
sessionStorage.setItem("font-size", "12px");
sessionStorage.setItem("color", "#666");
sessionStorage.setItem("background-color", "skyblue");

// 打印sessionStorage
console.log(sessionStorage);

// 获取指定项
console.log(sessionStorage.getItem("font-size"));

// 移除指定项
sessionStorage.removeItem("font-size");
sessionStorage.removeItem("color");

// 移除所有项
sessionStorage.clear();
```

### 1.2、localStorage 和 sessionStorage 什么时候用 ？

TIP

- 如需要永久话的存储一个数据，可保存在 localStorage 中
- 需要会话结束（关闭浏览器）就消失，可保存在 sessionStorage 中

### 2、不同域名下能否共用 localStorage

TIP

localStorage 是按域名来存储的，即同一个域名下的所有页面都可以访问该域名下的 localStorage

但不同的域名下是不能共用 localStorage 的

> 我们自己域名下的 localStorage 别的域名是无法访问的，别的域名下的 localStorage 我们自己的域名也是不能访问的。

### 3、localStorage 的大小限制

TIP

单个域名下的`localStorage` 总大小有限制（不超过 `5MB`），但没有单个大小的限制。而 Cookie 是单个大小的限制，也跟浏览器有关系，不同浏览器大小限制不同。

> 正常情况下是不会存满的，使用中不要超过限制即可，超过了会造成数据丢失。

### 4、localStorage 键和值的类型

TIP

- localStorage 存储的键和值只能是字符串类型
- 不是字符串类型，也会先转化成字符串类型再存进去（localStorage 会自动转的，不需要手动转换）

```js
// key传入的是一个对象
localStorage.setItem({}, "hello");
console.log(localStorage.getItem("[object Object]")); // hello

// value传入的是一个对象
localStorage.setItem("skinTheme", {
  "font-size": "12px",
  color: "#666",
  "background-color": "skyblue",
});
console.log(localStorage);
// 打印结果 Storage {skinTheme: '[object Object]', [object Object]: 'hello', length: 2}
```

![image-20230228220304606](https://www.arryblog.com/assets/img/image-20230228220304606.5beb6ab4.png)

## 十一、localStorage 的封装

TIP

因为 localStorage 的键和值只能是字符串类型的，但很多时候我们希望保存的 value 值是一个对象，根据对应的 key 来取值时，也能取出对应的对象。

> 这就需要我们人为的来封装一个类来实现。

### 1、封装 storage 对象

TIP

新建 `storage.js` 文件，封装成一个模块 ，创建一个 storage 对象，添加三个方法，将 storage 对象做为默认接口导出

- set 方法，添加一项数据
- get 方法，通过指定的 key 来获取数据
- remove 方法，根据 key 来移除指定的数据项
- has 方法，根据 key 来判断是否存在指定项
- `clear()` 清除所有项

```js
// storage.js模块 默认导出一个对象
export default {
  // 根据key value 添加一项数据
  set(key, value) {
    if (typeof value === "object") {
      value = JSON.stringify(value); // 将对象转成JSON字符串
    }
    localStorage.setItem(key, value);
  },
  // 根据key来获取指定项
  get(key) {
    const data = localStorage.getItem(key);
    try {
      return JSON.parse(data); // 将字符串转换为对象
    } catch (err) {
      return data;
    }
  },
  // 根据key来删除指定项
  remove(key) {
    localStorage.removeItem(key);
  },

  // 根据key来判断是否存在指定项
  has(key) {
    const value = localStorage.getItem(key);
    return value ? true : false;
  },

  // clear() 清除所有项
  clear() {
    localStorage.clear();
  },
};
```

> 新建`index.html`页面，添加如下代码，测试封装好的模块

```html
<script type="module">
  import storage from "./storage.js";
  // 添加
  storage.set("skinTheme", {
    "font-size": "12px",
    color: "#666",
    "background-color": "skyblue",
  });
  storage.set("history", [1, 2, 3, 4, 5]);
  storage.set("username", "清心");
  storage.set("空", null);

  // 获取
  console.log(storage.get("username")); // 清心
  console.log(storage.get("history")); // [1, 2, 3, 4, 5]

  // 移除
  storage.remove("空");
  storage.remove("history");

  // 判断是否存在
  console.log(storage.has("skinTheme")); // true
  console.log(storage.has("ab")); // false
</script>
```

## 十二、localStorage 在实际开发中的应用

TIP

深入浅出 localStorage 在实际开发中的应用，添加搜索框附近的历史记录，更改网站皮肤 等

### 1、添加搜索历史记录

TIP

当用户在搜索框搜索对应的关键字时，会把用户搜索过的关键字保存在搜索框下面，并且只限定能放 6 个，超过了就删除最早加入的，当然也可以手动删除不想要的。

![GIF2023-3-10-02-35](https://www.arryblog.com/assets/img/GIF2023-3-10-02-35.2542028f.gif)

### 1.1、HTML 布局

```html
<style>
  input,
  button {
    box-sizing: border-box;
    outline: none;
  }
  .search {
    width: 600px;
    margin: 50px auto;
  }
  .search-wrap {
    display: flex;
    height: 70px;
  }
  .search-input {
    width: 680px;
    height: 50px;
    border: 1px solid #ddd;
    border-right: 0px;
    border-radius: 5px 0 0 5px;
  }
  .search-input::placeholder {
    font-size: 20px;
  }
  .search-button {
    width: 120px;
    height: 50px;
    background-color: orange;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  .keywords-wrap span {
    display: inline-block;
    background-color: #ddd;
    padding: 5px 10px;
    border-radius: 2px;
    margin: 5px;
    position: relative;
    cursor: pointer;
  }
  .keywords-wrap span i {
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    right: -2px;
    top: -2px;
    background-color: orange;
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
    line-height: 10px;
    color: #fff;
    display: none;
    cursor: pointer;
  }
  .keywords-wrap span:hover i {
    display: block;
  }
</style>
<body>
  <div class="search">
    <div class="search-wrap">
      <input type="text" placeholder="请输入搜索关键字" class="search-input" />
      <button class="search-button">搜索</button>
    </div>

    <div class="keywords-wrap">
      <!-- 
        <span>漂亮的包包<i>x</i></span>          
        <span>衣服<i>x</i></span>
        <span>女性化妆品 <i>x</i></span>
        <span>洗面奶<i>x</i></span>
        <span>小米手机 <i>x</i></span>
        <span>图解HTTP<i>x</i></span>
        <span>你不知道的Javascript<i>x</i></span>
        <span>ES6标准入门<i>x</i></span>
      -->
    </div>
  </div>
</body>
```

### 1.2、JS 代码实现逻辑

第一步：实现搜索框中的数据添加到页面

- 获取 DOM 元素：搜索框，搜索按扭，存放关键词容器
- 定义一个数组`let keywordsArr = []`，数组用来保存每次搜索的关键字信息，同时这些信息了会保存在本地的 localStorage 中。
- 数组中的每个成员是一个对象，对象结构`{id: new Date().getTime(),keyword: 索搜框中数据}`，对象中的 id 一定要是唯一的，同时要添中到 DOM 元素上去，当点击删除按扭删除对应关键字时，可以通过这个唯一的 id 标识将数组和 localStorage 中对应的数据删除
- 给搜索按扭点加添加事件，当点击后判断输入框中是否有内容，有内容就创建一条数据加入到数组中，同时生成一条 DOM 插入到页面，
- 因为限止了关键字显示的个数只能显示 6 个，所以需要判断数组中的元素是否超过了 6 个，如果超过了需要将数组中的第一个元素删除，同时将页面中的第一个关键字所在的 DOM 删除
- 最后还要将数据保存在 localStorage 中，如：`storage.set("history", keywordsArr);`

```js
import storage from "./storage.js";
// 获取输入框和搜索按扭
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
// 获取（历史搜索）存放关键词容器
const keywords = document.querySelector(".keywords-wrap");
// 用来保存关键字的数组
let keywordsArr = [];

// 点击搜索按扭
searchButton.addEventListener("click", () => {
  let value = searchInput.value;
  searchInput.value = "";
  // 如果内容去掉前后空格，还有内容，将内容添加到页面中
  if (value.trim()) {
    // 创建一条数据
    const obj = {
      id: new Date().getTime(),
      keyword: value,
    };
    // 创建span标签
    const span = document.createElement("span");
    span.dataset.id = obj.id; // 添加唯一标识
    span.innerHTML = `${value}<i>x</i>`;
    // span标签添加到页面
    keywords.appendChild(span);
    // 将内容添加到数组的尾部保存起来

    keywordsArr.push(obj);
    // 因为记录的数据不能超过6条，所以要判断，如果超过，则删除第一条
    if (keywordsArr.length > 6) {
      // 数组中将第一个元素删除
      keywordsArr.shift();
      // DOM中也将第一个元素删除
      keywords.removeChild(keywords.children[0]);
    }
    // 将数组中对应的数据存入到localStorage中
    storage.set("history", keywordsArr);
  }
});
```

**第二步：读取 localStorage 中的数据，显示在页面中**

TIP

- 当关闭页面后，再次打开，搜索框下的内容就消失了，所以我们需要把 localStorage 中存储的数据取出来插入到页面中
- 这里要考虑第一次打开页面时，localStorage 中还没有存任何数据，所以取出的 localStorage 数据可能为 undefined，所以需要判断是过数据存在，在遍历取出的数据，生成 DOM 插入到页面。

```js
showKeywords();
function showKeywords() {
  const storageDate = storage.get("history");
  // 第一次访问网站，可能什么数据也没有，所以返回值为undefine要判断
  if (storageDate) {
    // 将数据存入keywordsArr中
    keywordsArr = storageDate;
    // for...of遍历数组
    for (let { id, keyword } of storageDate) {
      const span = document.createElement("span");
      span.dataset.id = id; // 添加唯一标识
      span.innerHTML = `${keyword}<i>x</i>`;
      keywords.appendChild(span);
    }
  }
}
```

**第三步：点击关键字右侧顶部的删除按扭，删除对应关键字**

TIP

- 因为添加的关键字比较多，所以我们不可能为每个关键字对应的 DOM 添加点击事件，这里我们可以利用事件代理，把`<i>`标签的点击事件委托给其祖先元素 `keywords-wrap`来处理。
- 点击删除对应的 span 标签的同时，还需要将数组中对应项的数据删除，同时还要更新 localStorage

```js
// 点击关键字上面的删除按扭，可将其删除
deleteKeyword();
function deleteKeyword() {
  // 利用事件代理来处理
  keywords.addEventListener("click", function (e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName !== "i") return;
    // 如果点击的是i标签，则做相关删除操作
    // 删除DOM标签
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    // 删除数组中元素,将读取的数据转成数字类型
    const id = Number(e.target.parentNode.dataset.id);
    // 找到数组中id对应的下标
    const index = keywordsArr.findIndex((item) => {
      console.log(id, item.id);
      return item.id === id;
    });
    // 通过下标删除
    keywordsArr.splice(index, 1);
    // 重新给localStorage赋值
    storage.set("history", keywordsArr);
  });
}
```

### 1.3、最终完整版代码

```html
<script type="module">
  import storage from "./storage.js";
  // 获取输入框和搜索按扭
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  // 获取（历史搜索）存放关键词容器
  const keywords = document.querySelector(".keywords-wrap");
  // 用来保存关键字的数组
  let keywordsArr = [];

  // 点击搜索按扭
  searchButton.addEventListener("click", () => {
    let value = searchInput.value;
    searchInput.value = "";
    // 如果内容去掉前后空格，还有内容，将内容添加到页面中
    if (value.trim()) {
      // 创建一条数据
      const obj = {
        id: new Date().getTime(),
        keyword: value,
      };
      // 创建span标签
      const span = document.createElement("span");
      span.dataset.id = obj.id; // 添加唯一标识
      span.innerHTML = `${value}<i>x</i>`;
      // span标签添加到页面
      keywords.appendChild(span);
      // 将内容添加到数组的尾部保存起来

      keywordsArr.push(obj);
      // 因为记录的数据不能超过6条，所以要判断，如果超过，则删除第一条
      if (keywordsArr.length > 6) {
        // 数组中将第一个元素删除
        keywordsArr.shift();
        // DOM中也将第一个元素删除
        keywords.removeChild(keywords.children[0]);
      }
      // 将数组中对应的数据存入到localStorage中
      storage.set("history", keywordsArr);
    }
  });

  // 当关闭页面后，再次打开，搜索框下的内容就消失了，所以我们需要把localStorage中存储的数据取出来插入到页面中
  showKeywords();
  function showKeywords() {
    const storageDate = storage.get("history");
    // 第一次访问网站，可能什么数据也没有，所以返回值为undefine要判断
    if (storageDate) {
      // 将数据存入keywordsArr中
      keywordsArr = storageDate;
      // for...of遍历数组
      for (let { id, keyword } of storageDate) {
        const span = document.createElement("span");
        span.dataset.id = id; // 添加唯一标识
        span.innerHTML = `${keyword}<i>x</i>`;
        keywords.appendChild(span);
      }
    }
  }

  // 点击关键字上面的删除按扭，可将其删除
  deleteKeyword();
  function deleteKeyword() {
    // 利用事件代理来处理
    keywords.addEventListener("click", function (e) {
      const tagName = e.target.tagName.toLowerCase();
      if (tagName !== "i") return;
      // 如果点击的是i标签，则做相关删除操作
      // 删除DOM标签
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      // 删除数组中元素,将读取的数据转成数字类型
      const id = Number(e.target.parentNode.dataset.id);
      // 找到数组中id对应的下标
      const index = keywordsArr.findIndex((item) => {
        console.log(id, item.id);
        return item.id === id;
      });
      // 通过下标删除
      keywordsArr.splice(index, 1);
      // 重新给localStorage赋值
      storage.set("history", keywordsArr);
    });
  }
</script>
```

### 2、更改网站皮肤

TIP

大家可以自己去实现，可以参考 [MDN 官方网站给出的实例(opens new window)](https://mdn.github.io/dom-examples/web-storage/)

## 十三、总结

TIP

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、Cookie

TIP

- Cookie 是浏览器存储数据的一种方式
- 存储在用户本地，而不是存储在服务器上
- 可以随着浏览器每次请求发送到服务器端

### 2、Cookie 的用法

TIP

写入 Cookie

- 我们只能一个一个的写入，不能将多个 Cookie 写在一起
- 写入 Cookie 时是可以加入多个属性的，属性与属性之间是需要 `;` （分号+空格）来分开

> 注：使用分号分隔即可，有空格是为了美观

```js
document.cookie = "username=icoding; max-age=6";
document.cookie = "sex=male; max-age=6";
```

读取 Cookie

```js
const info = document.cookie;
console.log(info); // username=icoding; sex=male
```

注：

原生的 Cookie 是不能通过特定的名称来读取特定的值，只能一次性全部读取出来。

> 因此，我们就需要自己来封装，否则用起来非常不方便。

### 3、Cookie 的属性

TIP

**名称（name）和 值（value）**

- 创建 Cookie 时必须填写，其他属性可以使用默认值
- 如果包含非英文字母，写入时要用 `encodeURIComponent()` 编码
- 如果写入时编码，读取时要用 `decodeURIComponent()` 解码

**失效（到期）时间**

- 失效的 Cookie ，会被浏览器清除
- 如果没有设置失效时间，默认会话结束后，Cookie 会被清除
- 需要 Cookie 长时间存在，可设置 Expires 或 Max-Age
- expires 值为 Date 类型，表示具体什么时间过期
- Max-Age 值为数字，表示当前时间加多少秒后过期，单位是秒
- 如果设置 Max-Age 的值是 0 或 负数，则 Cookie 会被删除

**Domain 域**

- Domain 限定了访问 Cookie 的范围（不同域下）
- 使用 JS 只能写入/读取当前域 或 父域的 Cookie ，无法写入/读取其他域的 Cookie

**Path**

- Path 限定了访问 Cookie 的范围（同域不同路径下）
- 使用 JS 只能写入/读取当前路径 和 上级路径的 Cookie，无法写入/读取其他路径的 Cookie

> 当 Name、Domain、Path 的 3 个字段都相同时，才是同一个 Cookie

**HttpOnly**

- 前端不能通过 JS 去设置一个 HttpOnly 类型的 Cookie ，这种类型的 Cookie 只能是后端来设置。本质即有了 HttpOnly 属性后，前端就不能操作 Cookie 了。
- 只要是 HttpOnly 类型的，通过 `document.cookie` 是获取不到的，也不能进行修改

**Secure**

- Secure 限定了只有在使用 https 而不是 http 的情况下才可以将 Cookie 发送给服务端
- Domain、Path、Secure 都要满足条件，还不能过期的 Cookie 才能随着请求发送到服务器端

### 4、Cookie 在实际开发中的注意事项

TIP

- 前后端都可以写入和读取 Cookie
- 每个域名下的 Cookie 数量有限
- 每个 Cookie 的存储容量很小，最多只有 4KB 左右，每个浏览器不一样

### 5、localStorage

TIP

- localStorage 是浏览器存储数据的一种方式
- 存储在用户本地，不会发送到服务器端
- 单个域名下的总大小有限制（一般最大 5MB 左右）每个浏览器不一样

### 6、localStorage 的基本用法

```js
// 设置（添加）localStorage 数据项
localStorage.setItem("username", "icoding");
// 获取 localStorage 数据项
localStorage.getItem("username");
// 移除 localStorage 数据项
localStorage.removeItem("username");
// 移除所有的 localStorage 数据项
localStorage.clear();
// length localStorage 中有存储多少数据
localStorage.length;
```

### 7、localStorage 在实际开发中的注意事项

TIP

- localStorage 存储的数据，除非手动清楚（如 通过 JS 删除 或 清除浏览器缓存）否则，数据永远不会过期的。它是持久化的本地存储。
- sessionStorage 存储的数据，是当前会话结束（如 关闭浏览器）的时候，sessionStorage 中的数据会被清空
- sessionStorage 的使用方法 与 localStorage 一模一样
- localStorage 存储的键和值只能是字符串类型
- 不同的域名不能共用 localStorage

### 8、Cookie、localStorage、sessionStorage 的对比（面试题）

| 对比项         | Cookie                            | LocalStorage     | sessionStorage |
| :------------- | :-------------------------------- | :--------------- | :------------- |
| 存储大小       | 4K                                | 5M               | 5M             |
| 有效期         | 手动设置                          | 无               | 浏览器窗口关闭 |
| 存储位置       | 浏览器                            | 浏览器           | 浏览器         |
| 与请求一起发送 | 是                                | 否               | 否             |
| 访问限止       | 子域可以访问自己和父域中的 Cookie | 同域下都可以访问 | 只限当前窗口   |

## 十四、测试题

TIP

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、关于 cookie，下列说法正确的是？

> 选择两项

- A、cookie 是服务器端存储数据的一种方式
- B、浏览器在每次发送请求时，大部分情况下会自动把 cookie 发送到服务器端
- C、可以在 cookie 中保存密码等信息
- D、可以利用 cookie，统计用户的访问习惯，比如用户什么时间段会访问网站

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B D</p></details>

### 2、关于 Cookie 的使用，以下说法正确的是？

> 选择两项

- A、利用 `document.cookie = "age"`，可以写入一个 cookie
- B、读取 cookie，可以使用 `document.cookie`
- C、可以使用 `document.cookie = 'username = zs; age=18'` 的形式批量设置 cookie
- D、`document.cookie` 获取到的值，是名值对构成的字符串，例如：`username = zs; age = 18`

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B D</p></details>

### 3、下面代码中，可以正确设置 Cookie 失效时间为 1 天的选项是？

> 单选

- A

```js
document.cookie = `username=icoding; max-age=1`;
```

- B

```js
document.cookie = "username=icoding";
document.cookie = `max-age=${24 * 3600}`;
```

- C

```js
document.cookie = `username=icoding;age=18;max-age=${24 * 3600}`;
```

- D、

```js
document.cookie = `username=icoding;max-age=${24 * 3600}`;
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：D</p></details>

### 4、下列选项中，关于 Cookie 的说法错误的是？

> 单选

- A、创建 cookie 时，必须设置名称和值两个属性
- B、如果 cookie 的名称或值包含非英文字母，写入该 cookie 时无需处理
- C、可以使用 Expires 或 Max-Age 两个属性，为 cookie 设置失效时间
- D、没有设置失效时间的 cookie 称为会话 cookie，浏览器关闭该 cookie 就会消失

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B</p></details>

### 5、以下操作 locaStorage 数据正确的？

- A、

```js
localStorage.clear("username");
```

- B、

```js
localStorage.setItem("username", { name: "清心" });
```

- C、

```js
localStorage.removeItem("username");
```

- D、

```js
localStorage.get("username");
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

上次更新时间: 6/8/2023, 9:23:17 PM

← [前后端数据交互 与 HTTP 协议](https://www.arryblog.com/vip/network/)[JSON、Ajax、跨域请求、XHR 对象、Axios 与 Fetch ](https://www.arryblog.com/vip/network/json-ajax-cross-domain-axios-fetch.html)→

大厂最新技术学习分享群

![大厂最新技术学习分享群](https://www.arryblog.com/bulletin-box.jpg)

微信扫一扫进群，获取资料

X

评论 Powered by [GitHub ](https://github.com/)& [Vssue](https://github.com/meteorlxy/vssue)

使用 GitHub 帐号登录后发表评论

使用 GitHub 登录

登录后查看评论
