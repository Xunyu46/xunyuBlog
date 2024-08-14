---
title: JSON、Ajax、跨域请求、XHR 对象、Axios 与 Fetch
date: 2023-10-29
sidebar: "auto"
categories:
  - ajax
tags:
  - ajax
publish: true
---

# JSON、Ajax、跨域请求、XHR 对象、Axios 与 Fetch



从本节内容我们开始学习未来实际开发中最最常用的 Ajax（从入门到自定义封装，Promise 改造封装 Ajax，Ajax 在实际项目中应用实践）、JSON、跨域请求、XHR 对象、Axios 与 Fetch 完整系统内容。

**JSON**

- 认识 JSON
- 为什么需要 JSON
- JSON 的 3 种形式
- JSON 的常用方法

**原生 Ajax 核心基础**

- 认识 Ajax
- Ajax 的基本用法
- GET 请求
- POST 请求
- POST 请求提交 Form 表单数据

**跨域请求**

- 认识 跨域
- CORS 跨域资源共享
- JSONP
- 代理跨域

**XHR 核心对象**

- XHR 的属性
- XHR 的方法
- XHR 的事件

**Ajax 的进阶（自定义封装 Ajax）**

- 自定义封装 Ajax
- 使用 Promise 改造封装好的 Ajax
- 多个 Ajax 请求并发执行

**Ajax 在实际项目开发中的应用与实践**

- 搜索提示（自动补全）
- 动态加载二级菜单
- GET 请求实现搜索课程

**Ajax 扩展**

- axios
- Fetch

## 一、JSON 数据



深入浅出什么是 JSON，为什么需要 JSON，JSON 的 3 种形式，JSON 的常用方法 等

### 1、JSON 是什么 ？



JSON 全称是 JavaScript Object Notation ，即：JavaScript 对象表示法

- JSON 是 Ajax 发送和接收数据的一种格式
- **JSON** 是一种轻量级的数据交换格式，常用来做前后端数据交互，其为**字符串类型**。
- **JSON** 是一种语法，用来**序列化**对象、数组、数值、字符串、布尔值和 `null`，但不能是`undefined`。

以下我们之前了解过的，都属于一种数据的格式

- XML
- `username=icoding&sex=male&age=19`
- JSON

### 2、序列化 与 反序列化



- **序列化：** 将对象转、数组、字符串、布尔值、null 转换成 JSON 字符串
- **反序列化（解析）：** 将 JSON 字符串转换为对象、数组、字符串、布尔值、null

**为什么要序列化 ？**

- 其实序列化最终的目的是为了对象可以**跨平台存储和进行网络传输**。而我们进行跨平台存储和网络传输的方式就是 IO，而我们的 IO 支持的数据格式就是字节数组。
- 因为我们单方面的只把对象转成字节数组还不行，因为没有规则的字节数组我们是没办法把对象的本来面目还原回来的，所以我们必须在把对象转成字节数组的时候就制定一种规则 **（序列化）**，那么我们从 IO 流里面读出数据的时候再以这种规则把对象还原回来 **（反序列化）。**

如果我们要把一栋房子从一个地方运输到另一个地方去，**序列化** 就是我把房子拆成一个个的砖块放到车子里，然后留下一张房子原来结构的图纸，**反序列化** 就是我们把房子运输到了目的地以后，根据图纸把一块块砖头还原成房子原来面目的过程

> 你可以理解为 JSON 是一种特殊的字符串。其特殊性在于，字符串中的内容为对象或数组，但其内的对象与 JS 的对象有些不一样。比如：JSON 字符串中的对象，他的属性名必需用双号号包裹，而 JS 对象中的属性名不用。

以下是常见的 JSON 格式数据（`data.json`文件内容)

```json
{
  "status": 0,
  "data": {
    "id": "230000201401123540",
    "username": "艾编程",
    "password": "123456",
    "email": "g.tkybf@lfsqxivjr.de",
    "phone": 123456,
    "role": 0,
    "createTime": "2030-07-31 17:17:38",
    "updateTime": "2035-06-30 16:12:53"
  }
}
```

或

```json
{
  "code": 200,
  "data": [
    {
      "word": "javascript"
    },
    {
      "word": "java"
    },
    {
      "word": "json"
    },
    {
      "word": "python"
    },
    {
      "word": "c/c++"
    },
    {
      "word": "node.js"
    },
    {
      "word": "php"
    }
  ]
}
```

### 3、为什么需要 JSON



前后端通信过程中需要交换数据，如果将前端 JS 的数据（对象、数组 等）直接传给后端，后端是无法解析的；后端直接传给前端的数据也是无法解析的，因为他们互相都不认识，因此就需要一种能够进行前后端通信的统一的数据格式作为中转。

而 JSON 有 3 种形式，每种形式的写法都和 JS 中的数据类型很像，可以很轻松的和 JS 中的数据类型互相转换，同时后端也认识这种 JSON 类型的数据，也有对应解析 JSON 的方式，所以在前后端通信中，用 JSON 来做为传输的数据格式是非常棒的。

- 前端将 JS 的数据（对象，数组等）转换成 JSON 的格式发送到后端，后端拿到对应的数据后，用对应的方法来解析 JSON，然后做相关处理。

> JS（前端）-> JSON -> Java/Python/GO/PHP/Node.js（后端）

- 后端向前端发送数据时，发送的也是 JSON 格式的数据，前端拿到对应的数据后，也有对应的方法来解析 JSON，然后做相关处理。

> Java/Python/GO/PHP/Node.js（后端）-> JSON -> JS（前端）

### 4、JSON 的 3 种形式



JSON 有 3 种形式：简单值形式、对象形式、数组形式

- JSON 数据文件的后缀名是：`.json`
- JSON 中是不能写注释的

### 4.1、JSON 简单值形式



- JSON 的简单值形式就对应着 JS 中的基础数据类型
- 数字、字符串、布尔值、null

**注意事项**

- JSON 中没有`undefined` 值
- JSON 中的字符串必须使用双引号，单引号会报错

**应用实践**

新建 后缀名为`.json` 文件，文件中写入 JSON 简单值形式：数字、字符串、布尔值、null，进行体验和测试

```json
124;
"JSON字符串"
```

### 4.2、JSON 对象形式



JSON 的对象形式就是对应着 JS 中的对象，但与 JS 中的对象存在以下不同点

- JSON 中对象的属性名必须用双引号，属性值如果是字符串也必须用双引号
- JSON 对象的属性值不能是`undefined`

新建`data.json`文件，内容如下

```json
{
  "username": "艾编程",
  "sex": "male",
  "age": 20,
  "hobby": ["篮球", "乒乓球", "足球", "书法"],
  "family": {
    "father": "icoding",
    "mother": "美美"
  }
}
```

以下 JS 变量中保存的字符串符合 JSON 格式的有

```js
let strJson1 = '{"name":1,"age":32}'; // 正确的JSON字符串
let strJson2 = `{"name":1,"age":32}`; // 正确的JSON字符串
let strJson3 = "{'name':1,'age':32}"; // 错误的JSON字符串
let strJson4 = `{'name':1,'age':32}`; // 错误的JSON字符串
```

### 4.3、JSON 数组形式



JSON 的数组形式就对应着 JS 中的数组，但也有如下区别：

- 数组中的字符串必须用双引号
- 如果数组中的成员有对象类型，则需要满足 JSON 对象的格式要求。
- 不支持 `undefined`类型

新建`data.json`文件，内容如下，表示简单的 JSON 数组

```js
[1, "icoding", null];
```

新建`user.json`文件，内容如下，表示相对复杂些的 JSON 数组

```js
[
  {
    id: 1,
    username: "艾编程",
    phone: "123456",
    email: "123@gmail.com",
  },
  {
    id: 2,
    username: "小可爱",
    phone: "18912368918",
    email: "666@gmail.com",
  },
  {
    id: 3,
    username: "星辰大海",
    phone: "18966668888",
    email: "888@gmail.com",
  },
];
```

以下 JS 变量中保存的字符串符合 JSON 格式的有

```js
let arrStr1 = "[1,2,3,4]"; // 正确
let arrStr2 = '[{"name":"清心"},3,4,5]'; // 正确
let arrStr3 = '  [9.1,"A",[1,3],undefined]'; // 错误

let arrStr4 = "[{'name':清心'},3,4,5]"; // 错误
```

### 4.4、总结：JSON 数据的注意事项



JSON 数据一般是保存在`.json`的文件中，当然其写法一定要是合法的 JSON 字符串，否则解析会报错。合法即以下规则：

- JSON 中没有 undefined 值
- JSON 中的字符串必须使用双引号
- JSON 中对象的属性名必须用双引号，属性值如果是字符串也必须用双引号
- JSON 中是不能注释的

### 5、JSON 的常用方法

**`JSON`** 对象包含以下两个方法

| 方法               | 说明                                                           |
| :----------------- | :------------------------------------------------------------- |
| `JSON.stringify()` | 可以将 JS 的基本数据类型、对象或者数组转换成 JSON 格式的字符串 |
| `JSON.parse()`     | 可以将 JSON 格式的字符串解析成 JS 中的对应值                   |

注：

除了上面两个方法，JSON 这个对象本身并没有其他作用，也不能被调用或者作为构造函数调用。

### 5.1、对象与 JSON 字符串之间相互转换

```js
const obj = {
  username: "清心",
  age: 33,
};
// 将对象转换为字符串 （对象序列化）
const strJson = JSON.stringify(obj);
console.log(strJson);
console.log(typeof strJson);

// 将JSON字符串转换为对象，字符串解析
const obj2 = JSON.parse(strJson);
console.log(obj2);
console.log(typeof obj2);
```

![image-20230302213831362](https://www.arryblog.com/assets/img/image-20230302213831362.402cacb7.png)

### 5.2、数组与 JSON 字符串之间相互转换

```js
let arrStr = '[{"name":"清心"},3,4,5]'; // 正确
const arr = JSON.parse(arrStr);
console.log(arr);
// 将数组转成JSON字符串
const jsonStr = JSON.stringify(arr);
console.log(jsonStr);
```

![image-20230119190522909](https://www.arryblog.com/assets/img/image-20230119190522909.bd3e49f5.png)

## 二、原生 Ajax



深入浅出原生 Ajax ，基本用法，GET 请求、POST 请求 等。

### 1、Ajax 是什么



Ajax 是 Asynchronous Javascript And XML（异步 JavaScript 和 XML）的简写

- Ajax 中的异步：可以异步地向服务器发送请求，在等待响应的过程中，不会阻塞当前页面，浏览器可以做自己的事情。直到成功获取响应后，浏览器才开始处理响应数据。
- XML（可扩展标记语言）是前后端数据通信时传输数据的一种格式（早年用的多，现在都用 JSON 了）
- 查看博客网站地图的 xml 文件，可了解语法结构 [https://www.arryblog.com/sitemap.xml(opens new window)](https://www.arryblog.com/sitemap.xml)
- XML 现在已经很少使用了，当下比较常用的是 JSON

`Ajax` 其实就是浏览器与服务器之间的一种异步通信方式。

### 2、Ajax 主要作用



`Ajax` 最吸引人的就是它的“异步”特性，也就是说它可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

> 你可以使用 AJAX 最主要的两个特性做下列事：

- 在不重新加载页面的情况下发送请求给服务器。
- 接受并使用从服务器发来的数据。

**应用场景如下**

以下只是列举出一些简单的常见应用，让大家对 Ajax 有个初步的了解，Ajax 能做的事情非常多，后面我们在项目中主要就是使手 Ajax 来实现前后端通信。

**注册用户名或手机号检测，一般都会使用 Ajax 异步交互**

![image-20221206195427862](https://www.arryblog.com/assets/img/image-20221206195427862.79e13eb4.png)

注：

以上用户名检测会提示 “名称已被占用”

本质的过程是 使用 Ajax 向后端发送请求，将用户名一起发送到后端，后端获取到数据后会和数据库中的数据进行比对，查看是否存在该用户名，如果存在就会响应给前端已存在，前端就会给出对应的用户提示信息。如果响应给前端为不存在，就继续注册就好。

**搜索提示，自动补全**

![image-20221206201711204](https://www.arryblog.com/assets/img/image-20221206201711204.178446bf.png)

> 以上同样使用了 Ajax 向后端发送请求，后端会进行一些列的操作，最终将响应回来的数据给到前端，最后展示出来。

### 3、搭建 Ajax 开发环境



Ajax 需要服务器环境，在非服务器环境下（如本地文件直接打开的形式），浏览器无法正常使用 Ajax

![image-20221206222202025](https://www.arryblog.com/assets/img/image-20221206222202025.c2a9b25f.png)

> 搭建服务访问就意味着浏览器地址栏访问一定是以 http 或 https 开头的，才可以正常使用 Ajax

**使用 VSCode 搭建 Ajax 开发环境**



使用 VSCode 开发，建议使用 `Live Server` 插件，它会给我们提供一个本地的服务器环境。使用注意事项如下：

- 需在当前文件的目录中打开 VSCode ， `Live Server` 插件才能生效。
- 在 VSCode 中，打开需要运行的文件，右键选择 `"Open with Live Server"` 即可启动本地服务器来运行对应的文件
- 也可以使用快捷键 `Ctrl + shift + p` 在弹窗的命令行窗口中输入`Live Server` 会自动补全 选择 `Open with Live Server` 即可，下次再企业其他文件时，会默认出现在第一个。直接使用快捷键 `Ctrl + shift + p` 再回车 即可运行。

![image-20221206223653494](https://www.arryblog.com/assets/img/image-20221206223653494.6fa5720b.png)

注：

当然，VSCode 中的 `Live Server` 也不是强制一定要用这个

- Windows 可用 phpStudy
- Mac 可用 MAMP
- Windows 和 Mac 上也可直接用 Nginx

> 为了开发方便，我们选择使用 `Live Server` 足以，其他知道即可。

### 3、Ajax 的基本用法



深入浅出 XMLHttpRequest、Ajax 的使用步骤、如何使用 Ajax 完成前后端通信

### 3.1、XMLHttpRequest



我们要使用 Ajax ，但浏览器是没有直接提供 类似 Ajax 这样对象的。因此

- Ajax 想要实现浏览器与服务器之间的异步通信，就需要依靠 XMLHttpRequest ，它是一个构造函数。
- 因为早期前后端通信的数据格式是 XML，所以 XMLHttpRequest 构造函数的命名中带有 XML，但本质上 XMLHttpRequest 在实现前后端通信时，并没有和具体的某种数据格式绑定。

> 不过我们现在前后端通信，主要使用的还是 JSON 格式的数据

### 3.2、Ajax 的使用步骤

- 第一步：创建 xhr 对象

```js
const xhr = new XMLHttpRequest();
```

- 第二步：调用用`open()`方法，准备发送

```js
xhr.open(method, url, boolean);
// 调用 open方法并是真正的发送请求，只是做好发送请求的准备工作
/*
 	open方法的三个参数

 	method：表示HTTP请求的方法，如：GET、POST、PUT、DELETE
 	url: 请求的url地址（本地或远程服务器都可以）
 	boolean: 是一个可选的布尔值，表示是否异步执行操作，默认为true。true表示是异步，			false表示同步，但重来不会使用ajax来同步加载，
*/

xhr.open(
  "get",
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test"
);
```

- 第三步：调用`send()`方法，正式发送请求

```js
xhr.send(body);

/*
	body:是一个可选参数，用于你想发送给服务器的任何内容
	主要用于发送POST请求时，发送请求体数据。
	如果采用的是GET请求，其参数写和不写一样，因为写了也不会被处理
*/

// 目前常用的几种发送数据形式有以下三种
// xhr.send('123') //  字符串
// xhr.send("username=icoding&key=1242");  // 参数字符串
xhr.send('{"username":"icoding","key":1254}'); // JSON格式
// xhr.send(new FormData()); // 发送表单数据
```

温馨提示

`send()`方法中发送数据的格式前后端要协商好，这样后端在接受到参数时就知道以什么格式来解析。

- 第四步：通过监听`readystatechange()`事件，来处理服务器响应

```js
// 当获取到响应后，会触发 xhr 对象的 readystatechange 事件，可以在该事件中对响应进行处理
// onreadystatechange() 见名知意，即：状态改变时触发事件,所以我们需要判断当前Ajax的状态。
xhr.onreadystatechange = function () {
  // ...
};
// 也可以采用 addEventListener 方式来监听事件
// xhr.addEventListener("readystatechange", () => {}, false);
```

`xhr.readyState`属性记录了整个通信过程中的状态，它的值从 `0 ~ 4`，一共 5 个状态

| 值   | 状态               | 描述                                                |
| :--- | :----------------- | :-------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中，`responseText` 属性已经包含部分数据。       |
| `4`  | `DONE`             | 下载操作已完成。                                    |

> 每次状态发生改变，都会触发`readystatechange`事件

```js
xhr.onreadystatechange = function () {
    // readyState 不等于 4，未完成，数据还没有准备好，就没必要继续执行，直接返回null就好
    if (xhr.readyState !== 4) return;
    // readyState 等于 4，表示完成，并已经接收到全部响应数据
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ) {
        // 请求被发送后，从服务器端返回文本。
        console.log(xhr.responseText);
        // 查看返回值的类型
        console.log(typeof xhr.responseText);
    }
```

### 3.3、使用 Ajax 完成前后端通信



通过以上四个步骤完成 Ajax 前后端通信，不过我们一般会把`xhr.onreadystatechange`事件写在`xhr.open()`和`xhr.send()`代码前面，保证请求发出去后的状态一定能被事件监听到。

```js
// 第一步：创建xhr对象
const xhr = new XMLHttpRequest();
// 第四步：通过监听`readystatechange()`事件，来处理服务器响应
xhr.onreadystatechange = function () {
  // readyState 不等于 4，未完成，数据还没有准备好，就没必要继续执行，直接返回null就好
  if (xhr.readyState !== 4) return;
  // readyState 等于 4，表示完成，并已经接收到全部响应数据
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    // 请求被发送后，从服务器端返回文本。
    console.log(xhr.responseText);
    // 查看返回值的类型
    console.log(typeof xhr.responseText);
  }
};
// 第二步：调用用open()方法，准备发送
xhr.open(
  "get",
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test",
  true
);
// 第三步：调用send()方法，正式发送请求
xhr.send();
```

![image-20230302232918420](https://www.arryblog.com/assets/img/image-20230302232918420.d12fb695.png)

### 4、Ajax 发送 GET 请求



前面了解了 Ajax 是如何发送请求的，接下来深入了解 发送 GET 请求时，如何携带数据 和 数据编码

- GET 请求不能通过请求体携带数据，但可以通过请求头携带
- URL 地址中问号后边即为携带的数据，& 符号来分隔多个名值对

```js
const url = "http://www.xxx.com/test?keyword=json&type=1&sort=1";
// url地址？号的字符串就是GET请求体携带的数据 keyword=json&type=1&sort=1
```

**代码演示**

根据参数 num 来决定返回几条用户信息

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/list?num=3";
// 第一步：创建xhr对象
const xhr = new XMLHttpRequest();
// 第四步：通过监听`readystatechange()`事件，来处理服务器响应
xhr.onreadystatechange = function () {
  // readyState 不等于 4，未完成，数据还没有准备好，就没必要继续执行，直接返回null就好
  if (xhr.readyState !== 4) return;
  // readyState 等于 4，表示完成，并已经接收到全部响应数据
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    // 请求被发送后，从服务器端返回文本。
    console.log(xhr.responseText);
    // 查看返回值的类型
    console.log(typeof xhr.responseText);
  }
};
// 第二步：调用用open()方法，准备发送
xhr.open("get", url);
// 第三步：调用send()方法，正式发送请求
xhr.send();
```

![GIF2023-3-2 23-55-48](https://www.arryblog.com/assets/img/GIF2023-3-2-23-55-48.c07980df.gif)

注：

要在浏览器中看到 Ajax 的请求，一定要选中上面的`Fetch/XHR` 选项

### 5、Ajax 发送 POST 请求



- POST 请求主要通过请求体携带数据，同量也可以在请求头携带（不过实际开发不这样用）
- 请求体数据作为`send()`方法的参数（一般是字符串），被传送到服务器端。

Ajax 发送 POST 请求，请求体携带的数据格式通常为以下两种，但不管那一种，都需要和后端沟通好，这样后端就能以对应的格式来解析数据

| 数据类型                          | 格式                                                   | fastmock 接受数据形式 |
| :-------------------------------- | :----------------------------------------------------- | :-------------------- |
| application/x-www-form-urlencoded | `"username=admin&password=123456"`                     | `_req.body.username`  |
| JSON                              | `JSON.stringify({username:"admin",password:"123456"})` | `_req.body.username`  |

- `application/x-www-form-urlencoded` 格式

```js
// 请求接口地址
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/login";
// 创建xhr对象
const xhr = new XMLHttpRequest();
// 监听事件，处理响应
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};
// 准备发送
xhr.open("post", url);
// 设置请求头，发送内容类型为JSON格式
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 正式发送，并发送请求体数据
xhr.send("username=admin&password=123456");
```

- JSON 格式

```js
// 请求接口地址
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login";
// 创建xhr对象
const xhr = new XMLHttpRequest();
// 监听事件，处理响应
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};
// 准备发送
xhr.open("post", url);
// 设置请求头，发送内容类型为JSON格式
xhr.setRequestHeader("Content-Type", "application/json");
// 正式发送，并发送请求体数据
xhr.send(
  JSON.stringify({
    username: "admin",
    password: "123456",
  })
);
```

![GIF2023-3-317-29-35](https://www.arryblog.com/assets/img/GIF2023-3-317-29-35.7742cc7d.gif)

### 6、请求数据编码



不管是`GET`还是`POST`请求，如果请求携带的数据是非英文字母的，如：中文汉字，就需要编码之后再发送给后端，不然会造成乱码问题

可以使用 `encodeURIComponent()` 方法进行编码

```js
// GET请求地址中有中文需要编码
const url = `https://www.xxx.com/test?wd=${encodeURIComponent("web前端")}`;
// POST请求体数据中有中文需要编码
xhr.send(`username=${encodeURIComponent("艾编程")}&age=20`);
```

**代码演示**

```js
const url = `https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test?wd=${encodeURIComponent(
  "web前端"
)}&username=${encodeURIComponent("艾编程")}`;

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState !== 4) {
    return;
  }
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};

xhr.open("GET", url, true);
xhr.send(null);
```

查看编码后传递到服务器端的中文字符串

![GIF2023-3-3 1-21-17](https://www.arryblog.com/assets/img/GIF2023-3-3-1-21-17.131dd845.gif)

### 7、form 表单 post 请求携带数据



form 表单在发送`post`请求时，请求体数据类型有如下三种，通过`enctype`属性设置。

| enctype 属性                        | 说明                                                                                                                     |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `application/x-www-form-urlencoded` | 默认值，只能上传文本格式的文件。不能用于发送文件。在发送前**会编码所有字符**，即在发送到服务器之前，所有字符都会进行编码 |
| `multipart/form-data`               | 指定传输数据为二进制类型（不对字符编码），比如图片，mp3，文件。是将文件以二进制的形式上传，可以实现多种类型的文件上传    |
| `text/plain`                        | 纯文本的传输，空格转换为"+"号，但**不对特殊字符编码**，一般用于 email 之类的                                             |

温馨提示

form 表单只有在发送 post 请求时，需要设置 enctype 属性的值，如果不设置默认为`application/x-www-form-urlencoded`

```html
<!--
    action: 设置表单请求（提交）的地址
    method: 设置请求的方法
    enctype: 设置以post方法请求时，请求携带的数据类型。
-->

<form
  action="https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/login"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="username" id="" />
  <input type="password" name="password" id="" />
  <input type="submit" value="提交" />
</form>

<!--
        当 enctype="application/x-www-form-urlencoded"   
        提交的数据格式： username=admin&password=123456
		
	    当 enctype="text/plain"  
	    提交的数据格式：  
                username=admin
                password=123456
		
		当enctype="multipart/form-data" 
		提交的数据格式：
        ------WebKitFormBoundaryCRBfs11AGJrtx0St
        Content-Disposition: form-data; name="username"

        admin
        ------WebKitFormBoundaryCRBfs11AGJrtx0St
        Content-Disposition: form-data; name="password"

        123456
        ------WebKitFormBoundaryCRBfs11AGJrtx0St--
 -->
```

注：

通过提交按扭提交表单数据时，会发生页面的跳转，如果不想发生页面跳转就需要通过 Ajax 来发送请求。

这里重点讲解下如何利用 Ajax 来提交`enctype = "multipart/form-data"`类型的表单数据。

### 8、FormData 对象



通过 Ajax 来提交 Form 表单，如果提交的数据类型为`multipart/form-data`类型，则需要利用到 FormData 构造函数来创建对应类型的数据。

FormData 对象用以将数据编译成键值对，以便用`XMLHttpRequest`来发送数据

接下来我们就通过案例来展开 FormData 的学习。

```html
<form id="login">
  <input type="text" name="username" autocomplete="off" />
  <input type="password" name="password" id="" autocomplete="off" />
  <input type="submit" value="提交" id="submit" />
</form>
<script>
  // 获取form表单
  const login = document.getElementById("login");
  // 获取用户名和密码输入框
  //   console.log(login.username);
  //   console.log(login.password);
  const { username, password } = login;
  // 获取提交按扭
  const submit = document.getElementById("submit");
  // Ajax请求地址
  const url =
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/login";
  // 给提交按扭添加点击事件
  submit.addEventListener("click", (e) => {
    // 阻止点击表单自动提交
    e.preventDefault();

    // 表单数据验证（省略）.....

    // 创建Ajax发送请求
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState !== 4) return;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.log(xhr.responseText);
      }
    });
    // 准备发送
    xhr.open("post", url);
    // 组装数据
    // const data = `username=${username.value.trim()}&password=${password.value.trim()}`;
    // 设置请求头 Content-Type
    // xhr.setRequestHeader(
    //   "Content-Type",
    //   "application/x-www-form-urlencoded"
    // );

    /*
         目前我们只有两个字段，这样手动组装数据还行，如果一旦字段变多了，就会非常崩溃
         我们想要从重复的劳动中解脱出来，就需要用到 FormData 了
    */

    // 组装数据
    const data = new FormData(login);
    // 查看获取到的表单中数据
    // for (const item of data) {
    //   console.log(item);
    // }
    // 设置请求头 Content-Type
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    // 正式发送
    xhr.send(data);
  });
</script>
```

### 8.1、FormData 的基本用法

接下来我们来学习以下几个 FormData 的实例方法

| 实例方法            | 说明                                                                           |
| :------------------ | :----------------------------------------------------------------------------- |
| `append(key,value)` | 添加一个新的值到 FormData 对象内的一个已存在的键中，如果键不存在则会添加该键   |
| set                 | 对 `FormData` 对象里的某个 `key` 设置一个新的值，如果该 `key` 不存在，则添加。 |
| get                 | `get()` 方法用于返回 FormData 对象中和指定的键关联的第一个值                   |
| getAll              | 方法会返回该 `FormData` 对象指定 key 的所有值                                  |
| `delete(key)`       | 根据 key 从 `FormData` 对象中删除指定键                                        |

> 关于 FormData 构造函数相关的实例方法[查看官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append)

- `append(key,value)` 和 `get(key)` 和 `getAll(key)`

```js
const data = new FormData();
data.append("a", 1);
data.append("a", 1);
data.append("a", 2);
data.append("b", 1);
// data为可迭代对象
for (let item of data) {
  console.log(item);
}

console.log(data.get("a"));
console.log(data.getAll("a"));
```

![image-20230307212503092](https://www.arryblog.com/assets/img/image-20230307212503092.4fd56af6.png)

- set(key,value)

```js
const data = new FormData();
data.set("a", 1);
data.set("a", 2);
data.set("a", 3);
data.set("b", 1);
for (let item of data) {
  console.log(item);
}

console.log(data.get("a"));
```

![image-20230307211758212](https://www.arryblog.com/assets/img/image-20230307211758212.1d606a73.png)

- delete

```js
const data = new FormData();
data.set("a", 1);
data.append("a", 2);

for (let item of data) {
  console.log(item, "--");
}

data.delete("a"); // 所有键为"a"的都删除
for (let item of data) {
  console.log(item);
}
```

## 三、跨域



深入浅出什么是跨域，什么是不同域，什么是同域，跨域请求为什么会被阻止，跨域的解决方案，CORS 跨域资源共享，JSONP 等 。

### 1、什么是跨域 ？



跨域问题其实就是浏览器的[同源策略 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)所导致的。

**同源策略**是一个重要的安全策略，它用于限制一个[源(Origin) (opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介

**源（Origin)的定义**

Web 内容的**源**由用于访问它的 [URL (opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/URL)的 **方案**（协议）、**主机名**（域名）和 **端口** 定义。只有当协议、主机和端口都匹配时，两个对象才具有相同的源。

### 2、什么是同域（源），什么是不同域（源）

我们观察以下 URL 地址

![image-20221211130442655](https://www.arryblog.com/assets/img/image-20221211130442655.e1fa0b5c.png)

只有当两个 URL 地址的 **protocol（协议）**、**domain（域名）**、**port（端口）** 三者完全相同时，我们才认为他们是同域，只要三者中任何一个不同，就是不同域，与路径（参数、锚点）无关，路径是否一样无所谓

以下 URL 为同域

```text
https://www.icodingedu.com/
https://www.icodingedu.com/goods/
https://www.icodingedu.com/open/course/20
https://www.icodingedu.com/goods/show/81?targetId=90&preview=0

<!--
	以上地址的

	协议都是：https
	域名都是：www.icodingedu.com
	端口号没有写，默认都是 443
-->
```

以下 URL 为不同域

```text
<!-- 以下URL的 协议不同，即为不同域 -->
https://www.icodingedu.com/
http://www.icodingedu.com/

<!-- 以下URL的 域名不同，即为不同域 -->
http://www.icodingedu.com:80/goods/
http://m.icodingedu.com:80/goods/

<!-- 以下URL的 第1个和第2个的协议 端口号都不同 -->
https://www.icodingedu.com:443/goods/
http://www.icodingedu.com:80/goods/
```

注意事项：

- 默认情况下 http 协议的默认端口号是`80`， 可以省略端口号
- https 的默认端口是`443`，可以省略端口号

所以以下情况为同域

```text
http://www.icodingedu.com:80 与 http://www.icodingedu.com 是同域
https://www.icodingedu.com:443 与 https://www.icodingedu.com 是同域
```

### 3、同域请求



如果请求的 URL 地址和当前 URL 地址是同域，则不会受浏览器的同源策略限制。所以服务端响应的内容前端能正常的接受到。

**代码演示**

在同一目录下，新建 `index.html` 和 `data.json` 文件 ，在`index.html`页面使用 Ajax 异步请求`data.json`文件

- `index.html`页面核心代码如下

```html
<script>
  const url = "./data.json";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      const data = xhr.responseText;
      console.log(data);
      console.log(typeof data);
      console.log(JSON.parse(data));
    }
  };
  xhr.open("get", url);
  xhr.send();
</script>
```

- `data.json` 页面代码如下

```json
{
  "username": "icoding",
  "age": 33
}
```

代码解读

上面的代码，相当于是在 `http://127.0.0.1:5500/index.html` 路径下向 `http://127.0.0.1:5500/data.json` 路径发送了 Ajax 请求，因为两者 “协议名，域名，端口号” 三者都相同，所以是同域请求，并不受浏览器同源策略的限止。

![GIF2023-3-417-54-03](https://www.arryblog.com/assets/img/GIF2023-3-417-54-03.ede11617.gif)

### 4、跨域请求



如果请求的 URL 地址和当前 URL 地址是不同域，则会受浏览器的同源策略限制，即服务端响应的会被浏览器给丢弃掉。

> 也就是说请求发出去了，服务端也响应了内容，但是浏览器在接受到服务端的内容后，发现请求的地址和当前 URL 不是同域的，则会把内容丢弃掉

**代码演示**

- 在同一目录下创建`index.html`和`server.js`两个文件
- `server.js`文件，用来创建 HTTP 服务器，服务器的访问地址为 `http://127.0.0.1:8887`
- 在`index.html`页面使用 Ajax 异步请求 `http://127.0.0.1:8887`来获取内容

```html
<!--index.html的核心代码-->
<script>
  const url = "http://127.0.0.1:8887";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    }
  };
  xhr.open("get", url);
  xhr.send();
</script>
// server.js const http = require("http"); http .createServer((request,
response) => { console.log("请求成功"); // 设置响应头，解决中文乱码
response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", });
response.end("发送的数据内容"); }) .listen(8887); console.log("Server running at
http://127.0.0.1:8887");
```

运行代码：

- 先在在 VSCode 的命令终端执行 `node server.js` 命令来运行 node 程序，创建`http://127.0.0.1:8887`服务
- 然后在 VScode 中打开`index.html`页面，打开后地址为：`http://127.0.0.1:5500/index.html`，打开后，其内部就会向`http://127.0.0.1:8887`发送 Ajax 请求。
- 所以我们 VSCode 的终端看到，服务端成功响应请求，并输出 **"请求成功"**。

> 但浏览器端并没有在控制台正确打印服务端响应的内容，而是报如下错误

![image-20230304182643641](https://www.arryblog.com/assets/img/image-20230304182643641.4ace1780.png)

注：

跨域限制是浏览器的行为，它不限制请求发送到服务端，也没有限制服务端响应内容，只在服务端响应内容后，浏览器会判断当前地址和请求地址是不是同一域，如果不是，则会把响应回来的内容丢弃，并抛出相应错误。

> 当然，如果后端有相关设置，跨域也是可以的，后面会讲

### 5、跨域请求为什么会被阻止



阻止跨域请求，其实是浏览器本身的一种安全策略，即：同源策略

**本质上**

跨域被阻止的问题就是 浏览器本身的问题（基于安全考虑，帮我们禁止掉了），其他客户端 或 服务器 都不存在跨域被阻止的问题。

虽然，阻止了跨域请求保障了一定的安全，但有的时候合理的跨域请求也是至关重要的。那我们应该如何跨域请求，还不被浏览器阻止呢 ？

> 这就是我们接下来为什么要学习 跨域解决方案的原因了 ！

**跨域常用解决方案**

- CORS 跨域资源共享（最常用）
- JSONP（主要用到 script 标签）
- 代理跨域：开启一个代理服务器实现数据转发

关于跨域请求的解决方案有数十种之多，主要看应用场景，每种方式都有各自的优缺点。

> 当下我们前端开发中会优先使用 CORS 跨域资源共享。

### 6、CORS 跨域资源共享



深入浅出 CORS 是什么，使用 CORS 跨域的过程，CORS 的兼容性 等

我们使用 CORS 跨域资源共享 主要是后端来解决的，其实我们前端什么都不用做也帮不上啥忙，只要后端解决了，前端就可以实现跨域了。

### 6.1、CORS 是什么



**CORS**（Cross-Origin Resource Sharing）通俗地译为跨域资源共享，定义了浏览器与服务器如何实现跨源通信。背后的基本思路是一种基于 HTTP 头的机制，该机制通过允许服务器标示除了它自己以外的其它源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源。

我们前面说过，因为浏览器的同源策略，所以不同域之间是不能实现资源共享。如果我们想要不同域之间能实现资源共享，我们只需要在服务端的响应头中添加`Access-Control-Allow-Origin` 头信息

- 允许任意的外源访问该资源

```js
Access-Control-Allow-Origin: "*"
```

- 只允许指定的外源访问该资源

```js
Access-Control-Allow-Origin: "https://www.xxx.com"
```

### 6.2、CORS 实现资源共享



接下来我们用代码来演示，CORS 是如何解决不同域之间的资源共享。

> 在同一目录下新建`index.html`和`server.js`文件。

- `server.js`文件用来创建一个 HTTP 服务，服务的访问地址 `http://127.0.0.1:88806`

```js
const http = require("http");
http
  .createServer((request, response) => {
    // 设置响应头
    response.writeHead(200, {
      // 允许所有域访问
      // "Access-Control-Allow-Origin":"*"
      // 只允许http://127.0.0.1:5500 这个域名下的所有请求
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });
    // 设置响应内容
    response.end("响应内容");
  })
  .listen(8886);
console.log("Server running at http:127.0.0.1:8886");
```

- `index.html`页面，使用 Ajax 向 `http://127.0.0.1:88806` 发起一个异步的请求

```html
<script>
  const url = "http://127.0.0.1:8886";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response);
    }
  };
  xhr.open("get", url);
  xhr.send();
</script>
```

以上代码执行过程

- 首先在 VSCode 的终端，执行`node server.js` 命令来运行 node 程序，创建 Http 服务，服务地址`http:127.0.0.1:8886`
- 然后在 VSCode 中打开 `index.html` 页面，这时地址栏中的地址为`http://127.0.0.1:5500`,同时内部的 JS 代码执行，发起了 Ajax 请求，因为请求的地址：`http:127.0.0.1:8886`和`http://127.0.0.1:5500`不是同域的，所以就会有跨域限制，但是我们在响应头中设置了`"Access-Control-Allow-Origin":"http://127.0.0.1:5500"`，相当于允许`http://127.0.0.1:5500`来访问我的资源，所以在浏览器的控制台能成功的打印出 **”响应内容“** 。
- 如果把`server.js`文件中设置响应头`"Access-Control-Allow-Origin":"http://127.0.0.1:5500"`代码去掉，你再次启动 node 服务，刷新`index.html`页面时，你就发现浏览器的控制台就报出了错误，相当请求失败。

### 6.3、使用 CORS 跨域过程



- ①、浏览器发送请求
- ②、后端在响应头中添加 `Access-Control-Allow-Origin` 头信息
- ③、浏览器接收到响应
- ④、如果是同域下的请求，浏览器不会额外做什么，这次前后端通信就圆满完成了
- ⑤、如果是跨域请求，浏览器会从响应头中查找是否允许跨域访问
- ⑥、如果允许跨域，通信圆满完成
- ⑦、如果没找到或不包含想要跨域的域名，就丢弃响应结果

### 6.4、如何给 CORS 设置多域名



如果想要指定多个外源能访问该资源，其需要一定的办法才能办到，同时我们还需要了解以下两个必要的知识点：

- 如果当前请求是跨域请求，则请求头中会有`Origin` 头字段
- 如果当前请求不是跨域请求，则请求头中不会有`Origin`头字段

> 了解了这一点，我们就知道如何：指定多个外源访问该资源

**具体思路**

- 在响应断获取请求头中的`Origin`字段，如果没有值，则说明当前并没跨域，可以不做任何处理
- 如果请求头中带有`Orign`字段，则说明当前为跨域请求，只需要将响应头`Access-Control-Allow-Origin`字段的值设置为请求头 `Orign`字段的值

**具体代码实现**

```js
// 用来保存响应头信息的对象
const head = {};
// 允许访问该资源的外源
const origin = ["http://127.0.0.1:5500", "http://127.0.0.1:5501"];
// 获取请求头的origin字段中的值，只有在请求是跨域请求是，请求头中才会有该字段，并且该字段的值是发起请求时所在的地址
const requestOrigin = request.headers.origin;
// 判断origin的值是否在允许的源中，如果在，则将响应头Access-Control-Allow-Origin的值设置为该源
if (origin.includes(requestOrigin)) {
  head["Access-Control-Allow-Origin"] = requestOrigin;
}

// 设置 Vary: Origin，避免 CDN 缓存破坏 CORS 配置
(head["Vary"] = "Origin"),
  // 设置响应头
  response.writeHead(200, head);
```

**完整的 node 代码**

```js
const http = require("http");
http
  .createServer((request, response) => {
    // 用来保存响应头信息的对象
    const head = {};
    // 允许访问该资源的外源
    const origin = ["http://127.0.0.1:5500", "http://127.0.0.1:5501"];
    // 获取请求头的origin字段中的值，只有在请求是跨域请求是，请求头中才会有该字段，并且该字段的值是发起请求时所在的地址
    const requestOrigin = request.headers.origin;
    // 判断origin的值是否在允许的源中，如果在，则将响应头Access-Control-Allow-Origin的值设置为该源
    if (origin.includes(requestOrigin)) {
      head["Access-Control-Allow-Origin"] = requestOrigin;
    }
    // 设置 Vary: Origin，避免 CDN 缓存破坏 CORS 配置
    (head["Vary"] = "Origin"),
      // 设置响应头
      response.writeHead(200, head);
    // 设置响应内容
    response.end("响应内容");
  })
  .listen(8886);
console.log("Server running at http:127.0.0.1:8886");
```

### 7、JSONP 实现跨域



深入浅出 JSONP 的原理 和 JSONP 实现跨域的具体实践和应用。

### 7.1、JSONP 的原理



在浏览器中`<img> 、<link> 、<video> 、<script>`等标签在跨域请求资源时不受浏览器同源策略的影响。

JSONP 主要就是利用 `<script>` 标签，加载跨域文件

### 7.2、 使用 JSONP 实现跨域



为了让大家能理解 JSONP 是如何实现跨域来请求资源，我们先来从一段简单的 JS 代码开始说起

- `index.html`页面的 JS 代码

```html
<script>
  // 处理数据的函数  data为需要处理的数据
  function handle(data) {
    console.log(data);
  }

  // 调用函数，并将数据作为参数传入 ，这里的操作，我们是希望服务端返回对应的JS代码来实现
  handle({ userName: "icoding", password: 123456 });
</script>
```

我们希望通过`<script>`标签来发起请求，返回以下 JS 代码，而不是我们人为写死，因为我们传入函数中的参数数据更希望后端发送给到我们。

```js
handle({ userName: "icoding", password: 123456 });
```

- 改造后的`index.html`页面代码如下

```html
<script>
  // 处理数据的函数  data为需要处理的数据
  function handle(data) {
    console.log(data);
  }
</script>
<!-- 服务端通过地址中的参数 callback=handle 来判断返回的函数的名-->
<script src="http://127.0.0.1:8885/callback=handle"></script>
```

**`node.js` 搭建 HTTP 服务**



接下来我们来搭建 HTTP 服务，让大家感受完整的处理过程。即后端拿收到`http://127.0.0.1:8885/callback=handle`这个请求后，会如何响应，才能实现我们想要的结果

创建`server.js`文件，用来创建 HTTP 服务

```js
const http = require("http");
http
  .createServer((request, response) => {
    // 获取路径 /callback=handle 中的handle
    const callback = request.url.split("=")[1];

    const data = JSON.stringify({ userName: "icoding", password: 123456 });
    response.end(`${callback}(${data})`);
    // 上面代码同等于
    //   response.end(`handle({"userName":"icoding","password":123456})`)
  })
  .listen(8885);
console.log("Server running at http://127.0.0.1:8885");
```

服务端根据请求地址中的参数，来确定返回的字符串中的函数名，同时把对应的数据做为函数的实参传入。前端的`<script>`标签收到响应内容后，会把内容当成 JS 代码来编译和执行。

代码执行过程

- 首先在 VSCode 的终端，执行`node server.js` 命令来运行 node 程序，创建 Http 服务，服务地址`http:127.0.0.1:8885`
- 然后在 VSCode 中打开`index.html`页面，这里你在控制台就能看到函数调用执行后的结果

![image-20230304232514715](https://www.arryblog.com/assets/img/image-20230304232514715.a50f7a02.png)

### 8、代理跨域



深入浅出代理跨域的原理 和 代理跨域的具体实践和应用。

### 8.1、代理跨域的原理



我们前面说过，跨域请求被阻止是浏览器的行为，服务器和服务器之间是没有这种限制。

如果在浏览器访问 `http:127.0.0.1:5500` 页面时，该页面发送 Ajax 请求到`http://127.0.0.1:8886` 服务下获取资源，受到浏览器同源策略的影响，肯定会被阻止。

如果我们可以在请求端和服务端之间架设一个代理服务器。这个代理服务器与请求端满足同源策略，那我们请求端就可把请求发给代理服务器，然后代理服务器帮我们把请求转发给真实的服务器，服务器响应内容给到代理服务器，代理服务器再把内容响应给到请求端。

> 这样就完美的解决了跨域问题。

![image-20230304235201497](https://www.arryblog.com/assets/img/image-20230304235201497.c8fe27f9.png)

> 关于代理服务器，我们后面将到 Vue 时会涉及到。这里我们就用 node 来搭建两个服务器来模拟下中间整个过程。

### 8.2、模拟代理跨域的实现过程



- 创建`a.js`，来创建 HTTP 服务器，服务地址`http:127.0.0.1:8881`
- 创建`b.js`，来创建 HTTP 服务，服务地址`http:127.0.0.1:8882` 在这个服务器中返回一个 html 页面，这个返回的需要发送 Ajax 请求，获取服务器`http:127.0.0.1:8881`的响应结果。

> 因为受到浏览器同源策略的限制，所以请求肯定会失败。

**我们模拟代理来实现**

我们把请求转发给`http:127.0.0.1:8882/userInfo`这个服务器，然后这个服务器就相当于是一个代理服务器，他再发送请求到 `http:127.0.0.1:8881`，拿到响应结果后，返回给到浏览器端。

- 新建`index.html`网页

```html
<body>
  a.js创建的服务器返回的html内容渲染后页面
  <script>
    // 需要获取http:127.0.0.1:8881 服务器响应的内容，因为受到同源策略的限制，所以我们需要把请求发送给到http://127.0.0.1:8882/getInfo,他会在接受到请求后，将请求转发给到http:127.0.0.1:8881，然后拿到响应的结果，返回给到浏览器端。
    const url = "http://127.0.0.1:8882/getInfo";
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        console.log(xhr.response);
      }
    };
    xhr.open("get", url);
    xhr.send();
  </script>
</body>
```

- 新建 `a.js` 创建 HTTP 服务器，服务地址`http:127.0.0.1:8881`

```js
const http = require("http");
const fs = require("fs");
http
  .createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
    });
    // 发送请求到另一台服务器（目标服务器来获取内容）
    response.end("目标服务器返回的内容");
  })
  .listen(8881);
console.log("Server running at http:127.0.0.1:8881");
```

- 新建`b.js`，创建 HTTP 服务器，服务地址`http:127.0.0.1:8882`，这个地址返回`index.html`页面。

> 然后`index.html`页面发送 Ajax 请求到`http://127.0.0.1:8882/getInfo` ，这个服务收到请求后，会发送请求到目标服务器`http://127.0.0.1:8881` 获取响应内容，然后将获取到的内容响应到浏览器端

```js
const http = require("http");
const fs = require("fs");
// 需要 npm install axios命令在当前目录下安装axios包
const axios = require("axios");

http
  .createServer((request, response) => {
    // 获以url路径
    if (request.url === "/") {
      // 读取文件内容
      const html = fs.readFileSync("./index.html");
      response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8",
      });
      response.end(html);
    } else {
      // 发送请求到另一台服务器（目标服务器来获取内容）
      axios.get("http://127.0.0.1:8881").then((res) => {
        // 将目标服务器响应的内容作为响应内容返回
        response.end(res.data);
      });
    }
  })
  .listen(8882);
console.log("Server running at http:127.0.0.1:8882");
```

## 四、XHR 对象的属性



深入浅出 XHR 对象的属性：responseType 和 response 属性、timeout 属性、withCredentials 属性

### 1、responseType 、esponseText、 response 属性

| 属性         | 描述                                                                                                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| responseType | 属性值是一个枚举字符串值，用于指定响应中包含的数据类型。 其常用的类型有：`text`、`json`。 如果没有指定，则默认值为 `text` 文本类型 |
| response     | 用于返回响应的正文，返回的类型为`responseType`指定的类型                                                                           |
| esponseText  | 用来返回响应的正文，其接受的内容为文本形式。 所以只有在没有设置 `responseType` 或者 `responseType = ""` 或 `"text"` 的时候才能使用 |

提示：

通过上面的了解，我们应该知道`response`完全可以替代 `responseText` ，关于 `responseType`的更多类型，[可查看 MDN 官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType)

**代码演示**



如果`xhr.responseType='json'`，则 `xhr.response` 的返回值是经过 json 解析后的 js 对象。

> 所以如果返回内容不是 json 格式的，则返回值为 `null`

- `server.js` 创建 HTTP 服务

```js
const http = require("http");
http
  .createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    });

    response.end(`{"username":"icoding","age":12}`);
    //  response.end('abc');
  })
  .listen(8885);
console.log("Server running at http://127.0.0.1:8885");
const url = "http://127.0.0.1:8885";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response); // 如果服务端响应内容不符合JSON格式,则最后的结果为null
  }
};
// 指定接受过来的响应的数据类型，如果为json字符串，则收到的值为json解析后的js对象
xhr.responseType = "json";
xhr.open("get", url);
xhr.send();
```

![image-20230305021720201](https://www.arryblog.com/assets/img/image-20230305021720201.bcac2446.png)

### 2、timeout 属性



**`timeout`** 的值是 是一个无符号长整型数（正整数），代表着一个请求在被自动终止前所消耗的毫秒数。也就是说在规定时间内请求发出去还没有响应，则取消请求。

```js
xhr.timeout = 10; //  超时时间为10ms
```

- `timeout`的默认值为 0，意味着没有超时（不设置 timeout 属性，就没有超时一说）
- **`timeout`** 一般在调用`open()`方法之后且在调用`send()`方法之前设置。
- timeout 属性常于`timeout`事件结合使用，在超时后，就会触发`timeout`事件，我们可以在`timeout`事件中来做相关处理

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
xhr.ontimeout = function () {
  console.log("timeout");
};
xhr.open("get", url);
xhr.timeout = 1000; // 请求超过1s还没响应，则取消请求
xhr.send();
```

### 3、withCredentials 属性



`withCredentials` 属性：指定**Ajax 跨域**请求是要不要携带 cookie 等。

> 使用 Ajax 发送请求，默认情况下：

- 同域时，会携带 Cookie
- 跨域时，不会携带 Cookie

同时需要设置 `xhr.withCredentials = true;` ，但最终能否成功跨域携带 Cookie 还要看服务器是否同意，服务器端默认是不同意的。

- 如果在同域请求时，设置`xhr.withCredentials = true;` 会抛出错误
- 如果需要成功携带 Cookie 服务端还需要以下两个设置。

**服务端的设置**

- 服务端必需要设置`Access-Control-Allow-Origin`，告诉浏览器允许跨域，而且这个值必须指定域名，不能设置为 `*`
- 在响应头中，`Access-Control-Allow-Credentials`这个值也要设置为`true`

**代码演示**

新建`index.html`页面，代码如下

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
  }
};

xhr.open("post", url);
xhr.setRequestHeader("Content-Type", "application/json");
//  允许Ajax跨域请求时携带Cookie，如果把这里去掉，则请求时，请求头中没有Cookie信息
xhr.withCredentials = true;
xhr.send(JSON.stringify({ username: "admin", password: "123456" }));
```

温馨提示：

在测试这个功能时，建议使用 Firfox（火孤）浏览器，因为 Chrome 80 版本以上的浏览器中仍然在请求头中没有携带 Cookie。原因在于 Chrome 80 以后 SameSite 的默认值为 Lax，导致跨域 Cookie 传输收到限制，在此之前默认值为 none。

> 此处内容为后端人员需要解决的，所以不讲解（网上也有现成的答案，有兴趣自已了解）

## 五、XHR 对象的方法



深入浅出 XHR 对象的方法：`abort()` 方法、`setRequestHeader()` 方法

### 1、abort() 方法



- 如果该请求已被发出，`XMLHttpRequest.abort()` 方法将终止该请求
- 需要`send()`方法发送请求完之后再调用`abort()`方法
- `abort()`方法一般与`abort`事件一起配合使用

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
// abort事件，在调用abort方法时，触发
xhr.onabort = function () {
  console.log("abort");
};
xhr.open("get", url);
xhr.send();

// 需要在发送完请求之后来调用 abort() 方法，即：发送完请求后，立马就取消了
// abort() 方法用来终止当前请求
// 请完成后，马上又终止了请求
xhr.abort();
```

### 2、setRequestHeader 方法



`XMLHttpRequest.setRequestHeader()` 是设置 HTTP 请求头部的方法。

> 此方法必须在`open()`方法和 `send()` 之间调用。

**语法**

```js
// header 属性的名称   value属性的值
xhr.setRequestHeader(header, value);
```

> 为了安全起见，大部分的请求头我们是没办法设置的，[具体查阅官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)

我们学习`setRequestHeader()`主要是为了设置`Content-Type`的属性值，在请求中，`Content-Type` 主要是告诉服务器实际发送的数据类型，其值为 MIME 类型。

> MIME 类型 [参考官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};

xhr.open("post", url);
/*
    前后端通信时，需要协商好发送的数据类型（参数），默认不设置"Content-Type"属性时，其值为"text/plain"类型。但是响应端https://www.fastmock.site/.....是以JSON格式来处理接受的参数，所以不设置就会造成数据出错，拿不到结果。
*/
xhr.setRequestHeader("Content-Type", "application/json");
const data = {
  username: "admin",
  password: "123456",
};
xhr.send(JSON.stringify(data));
```

## 六、XHR 对象的事件



深入浅出 XHR 对象的 load 事件、error 事件、abort 事件、timeout 事件，这些事件都需要会用。

XHR 常用的事件有

| 事件      | 说明                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| loadstart | 当调用`send()`函数，发出请求时触发                                      |
| load      | 当请求完成（成功）时触发                                                |
| loadend   | 请求结束时触发，无论请求成功 ( `load`) 还是失败 (`abort`) 或 （`error`) |
| error     | 当请求或网络错误时触发                                                  |
| timeout   | 当请求超时时触发                                                        |
| abort     | 当调用 abort 方 法，终止请求时触发                                      |
| progress  | 当服务器响应数据时开始周期性触发                                        |

注：

对任何请求，浏览器只会触发`load`、`timeout`、`abort`、`error`事件中的一个

> 更多事件可 [查阅官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/abort_event)

### 1、load、loadstart、loadend 事件



`load`事件：用于响应数据成功时触发，相当于 `readyState === 4`时，才会触发。

> 所以我们可以用 load 事件代替 readystatechange 监听事件，处理响应。

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState !== 4) return;
//     if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 ) {
//       console.log(xhr.response);
//     }
//   };

// 用onload代替onreadystatechange,代码如下
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
xhr.open("get", url);
xhr.send();
```

**对比 load、loadstart、loadend 事件**

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
// 当调用send()函数，发出请求时触发
xhr.onloadstart = function () {
  console.log("loadstart");
};
// 当请求完成（成功）时触发
xhr.onload = function () {
  console.log("load");
};
// 请求结束时触发，无论请求成功 (load) 还是失败 (abort) 或 （error)
xhr.onloadend = function () {
  console.log("loadend");
};

xhr.open("get", url);
xhr.send();
```

### 2、error 事件



error 事件：请求发生错误时触发

```js
// url地址中的site，错写成了sit
const url =
  "https://www.fastmock.sit/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
xhr.onload = function () {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
// 请求发生错误时触发，比如上面的url地址错误
xhr.onerror = function () {
  console.log("error");
};

xhr.open("get", url);
xhr.send();
```

### 3、abort 事件



abort 事件：调用 `abort()` 终止请求时触发

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
});
// 当调用abort方法终止请求时触发
xhr.addEventListener("abort", () => {
  console.log("abort");
});
xhr.open("get", url);
xhr.send();
// 调用 abort() 方法终止请求
xhr.abort();
```

### 4、timeout 事件



timeout 事件：当请求超时后触发

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.response);
  }
};
xhr.ontimeout = function () {
  console.log("timeout");
};
xhr.open("get", url);
xhr.timeout = 1000; // 请求超过1s还没响应，则取消请求
xhr.send();
```

### 5、progress 事件



`progress` 事件会在请求接收到数据的时候被周期性触发。

在 `progress` 事件的事件对象（Event）上存在以下三个重要的属性，可以用来显示资源的下载进度。

| 属性             | 描述                                                                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| lengthComputable | 只读属性，是一个布尔值 表示底层流程将需要完成的总工作量和已经完成的工作量是否可以计算。换句话说，它告诉我们进度是否可以被测量        |
| loaded           | 只读属性，是一个正整数，表示底层流程已经执行的工作总量                                                                               |
| total            | 只读属性，是一个正整数，表示正在执行的底层流程的工作总量。（需要在响应头中携带`Content-Length`字段，total 相当于是读取这个字段的信息 |

代码演示

在请求资源时，最好弄一张大的图片，以免因为加载内容太小而看不到效果。同时在控制台把网速调慢和禁用缓存，否则直接从缓存读取或网速过快，也看不到进度效果。

![image-20230306192845917](https://www.arryblog.com/assets/img/image-20230306192845917.9994aad7.png)

```js
// 请求地址
const url = "./bg.jpg";
// 创建xhr对象
const xhr = new XMLHttpRequest();
// 响应成功的操作
xhr.onload = function () {
  // 成功相关的操作可以自己设置
};
// 数据响应过程中的进度情况
xhr.onprogress = function (e) {
  // 如果进度可以被测量
  if (e.lengthComputable) {
    // 获取当前已执行的工作总量
    const loaded = e.loaded;
    // 获取响应数据的工作总量
    const total = e.total;
    // 计算当前的工作进程（百分比）
    console.log("图片加载进度:", ((loaded / total) * 100).toFixed(0) + "%");
  }
};
// 准备发送
xhr.open("get", url);
// 正式发送
xhr.send();
```

![image-20230306193126800](https://www.arryblog.com/assets/img/image-20230306193126800.4017a571.png)

### 6、显示图片加载进度

![GIF2023-3-620-07-28](https://www.arryblog.com/assets/img/GIF2023-3-620-07-28.59f153f1.gif)

- html+css 布局

```html
<style>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progress {
    width: 80%;
    height: 50px;
  }
  .progress .progress-bar {
    width: 0%;
    height: 50px;
    background-color: red;
    text-align: center;
    line-height: 50px;
    color: #fff;
    transition: all 0.2;
  }
</style>
<body>
  <div class="progress">
    <div class="progress-bar"></div>
  </div>
</body>
```

- js 实现加载进度条

```js
let progressEl = document.querySelector(".progress");
// 获取DOM元素
let bar = document.querySelector(".progress-bar");

// 请求地址
const url = "./bg.jpg";
// 创建xhr对象
const xhr = new XMLHttpRequest();
// 响应成功的操作
xhr.onload = function () {
  // 读取响应过来的数据
  let blob = xhr.response;
  // 根据blob创建对象的URL
  let src = window.URL.createObjectURL(blob);
  // 创建图片标签
  let img = document.createElement("img");
  // 给图片添加地址
  img.src = src;
  // 将图片添加到页面中
  document.body.appendChild(img);
  // 将进度掉隐藏
  if (progressEl) {
    document.body.removeChild(progressEl);
    progressEl = null;
    bar = null;
  }
};
// 数据响应过程中的进度情况
xhr.onprogress = function (e) {
  // 如果进度可以被测量
  if (e.lengthComputable) {
    // 获取当前已执行的工作总量
    const loaded = e.loaded;
    // 获取响应数据的工作总量
    const total = e.total;
    // 计算当前的工作进程（百分比）
    let progress = ((loaded / total) * 100).toFixed(0);
    bar.style.width = progress + "%";
    bar.innerText = progress + "%";
  }
};
// 将接受的数据类型设置为blob,一个包含二进制数据的 Blob 对象
xhr.responseType = "blob";
// 准备发送
xhr.open("get", url);
// 正式发送
xhr.send();
```

注：

**`URL.createObjectURL()`** 静态方法会创建一个 URL 字符串，表示参数中给出的对象的 URL

## 七、Ajax 的简单封装



接下来就是 Ajax 的进阶内容的学习了，深入浅出 Ajax 封装，接下来在项目实践中就可以轻松的用起来

### 1、Promise 简单封装 Ajax



利用 Promise 来简单封装下 Ajax 请求，关于更完善更复杂的封装后面再讲。

```js
/**
 * @param method 表示请求的方法，如get或post
 * @param url 请求的地址
 * @param body 如果为post请求，传入的请求体数据，需要传入JSON格式
 */
function ajax(method, url, body = null) {
  // 返回Promise对象
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject("请求失败");
      }
    });
    // 响应过来的数据类型为json格式接受
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json"); // 发送JSON格式数据
    xhr.send(body);
  });
}

export default ajax;
```

### 2、Ajax 并发问题



利用 `Promise.all` 来处理多个 Ajax 并发的问题

> 相关伪代码如下：

```js
const p1=ajax(method,url);
const p2=ajax(method,url)

const p=Promise.all([p1,p2]);
p.then([data1,data2]=>{
	console.log(data1)
	console.log(data2)
})

// 以上针对情况是在需要拿到p1和p2的结果后，才能做后续相关操作
<script type="module">
  import ajax from "./ajax.js";
  // get 请求
  const p1 = ajax(
    "get",
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test"
  );
  // post 请求
  const p2 = ajax(
    "post",
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login",
    '{"username":"admin","password":"123456"}'
  );
  Promise.all([p1, p2]).then(([data1, data2]) => {
    console.log(data1);
    console.log(data2);
  });
</script>
```

## 八、Ajax 的实践与应用



深入浅出 Ajax 在实际项目开发中的应用场景和具体实践

### 1、搜索自动补全

![GIF2023-3-622-29-29](https://www.arryblog.com/assets/img/GIF2023-3-622-29-29.3bf12124.gif)

实现思路

- 给输入框绑定`input`事件,然后在事件中判断文本框输入的内容。如果内容不为空，则把输入的内容作为查询的参数拼接到请求的 url 地址上，然后利用 Ajax 向后端发送 get 请求。
- 根据后端返回的数据来创建 DOM，并插入到页面中。

```html
<style>
  .search {
    display: flex;
    height: 200px;
    flex-direction: column;
    align-items: center;
  }
  .search-input {
    width: 400px;
    height: 40px;
  }
</style>

<div class="search">
  <div><input type="text" name="" class="search-input" /></div>
  <ul class="list">
    <li>111</li>
  </ul>
</div>

<script type="module">
  // 导入模块
  import ajax from "./ajax.js";
  // 获取DOM
  const list = document.querySelector(".list");
  const searchInput = document.querySelector(".search-input");
  // 请求地址
  let url =
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/search/keyword";
  // 监听文本框input输入事件
  searchInput.oninput = function () {
    // 获取内容，并去除字符串前后的空格
    let value = this.value.trim();
    // 如果输入内容不为空，则发起Ajax请求
    if (value) {
      // 将搜索的参数拼接在url后面，发送到服务端
      let newUrl = `${url}?keyword=${value}`;
      ajax("get", newUrl).then((res) => {
        let data = res.data;
        // 根据返回的数据，创建DOM，添加到页面中
        render(data);
      });
    } else {
      list.innerHTML = "";
    }
  };

  // 根据请求的数据创建DOM，添加到页面
  function render(data) {
    let html = "";
    list.innerHTML = ""; // 重新赋值前，先将原来的内容清空
    for (let { keyword } of data) {
      html += `<li>${keyword}</li>`;
    }
    list.innerHTML = html;
  }
</script>
```

如果想要降低请求的频率，可以结合之间讲的防抖函数，在规定的时间内再次触发 input 事件，则重新计时。

```js
/**
 * debounce 防抖函数
 * @param fn 事件处理函数
 * @param delay 延迟时间
 */
function debounce(fn, delay = 200) {
  var timer = null;
  // 以下是每次需要执行的代码
  return function () {
    if (timer) clearTimeout(timer);
    // 开启定时器
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null; // 这里很多人有争议，要不要置空
    }, delay);
  };
}
```

如果上一次请求没有响应回来前，又触发了事件，则把上一次请求取消，重新发送请求

关注以下代码 `--------------------------------` 部分内容

```js
import ajax from "./ajax.js";
// 获取输入框
const searchInput = document.querySelector(".search-input");
// 获取ul列表
const list = document.querySelector(".list");
// 请求地址
let url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/search/keyword";

//---------------------------------
let xhr = null; // 保证xhr对象
let done = false; // 当前没有请求
// --------------------------------

// 给输入框添加input事件
searchInput.oninput = function () {
  // 获取输入框中内容，并去掉前后的空格
  let value = this.value.trim();

  // --------------------------------
  if (done) {
    xhr.abort();
  }
  done = true; // 当前有请求
  // --------------------------------

  // 如果输入框中的内容不为空，把对应内容作为参数拼接到URL后面，发送到服务端
  if (value) {
    let newUrl = `${url}?keyword=${value}`;
    xhr = new XMLHttpRequest();
    // 监听事件
    xhr.addEventListener("load", () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 响应成功
        // --------------------------------
        done = false; // 请求响应回来，标识目前没有请求
        // --------------------------------
        render(xhr.response.data);
      } else {
        // 响应失败
      }
    });
    // 统一响过来的数据只是JSON类型，并把他转换成JS对象返回
    xhr.responseType = "json";
    xhr.open("get", newUrl);
    xhr.send();
  } else {
    list.innerHTML = "";
  }
};

// 用来渲染DOM
function render(data) {
  let html = "";
  for (let { keyword } of data) {
    html += `<li>${keyword}</li>`;
  }
  list.innerHTML = html;
}
```

### 2、动态加载二级菜单

- HTML、CSS 布局

```html
<style>
  html,
  body,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu {
    width: 200px;
    margin-left: 300px;
    margin-top: 100px;
    border: 1px solid #ddd;
    position: relative;
  }
  .menu ul li {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;

    cursor: pointer;
  }
  .menu ul li:hover {
    background-color: tomato;
    color: #fff;
  }
  .menu ul li:hover .content {
    display: block;
  }
  .menu .content {
    width: 200px;
    min-height: 250px;
    position: absolute;
    left: 200px;
    top: 0;
    background-color: #ddd;
    display: none;
    padding: 0 10px;
  }
  .menu .content p {
    display: flex;
    align-items: center;
  }
  .menu .content p img {
    width: 50px;
    margin-right: 10px;
  }
  .menu .content p a {
    text-decoration: none;
    color: #000;
  }
</style>
<body>
  <div class="menu">
    <!-- 
        <ul>
            <li>
                一级1
                <div class="content">
                    <img src="./loading-svg/loading-balls.svg" alt="" />
                </div>
            </li>
            <li>一级2</li>
            <li>一级3</li>
            <li>一级4</li>
            <li>一级5</li>
        </ul> 
	-->
  </div>
</body>
```

JS 实现原理

第一步：实现一级菜单

- 利用 Ajax 加载一级菜单数据，然后利用数据渲染出一级菜单。

- 一级菜单

  ```
  <li>
  ```

  标签身上有两个自定属性，分别为

  ```
  data-id
  ```

  和

  ```
  data-done
  ```

  - `data-id`用来保存一级菜单的栏目 id，后面根据这个 id 来确定需要获取的二级菜单数据
  - `data-done`属性值为 true 表示 Ajax 请求加载过数据，不需要再次发送请求。如果没有这个属性则表示没有加载过数据，需要发送 Ajax 请求来加载二级菜单数据

第二步：实现动态显示二级菜单

- 当利用事件代理来处理，当滑动到`li`时，先获取`data-done`属性，如果没有这个属性，则获取 li 身上的`data-id`属性，来发送 Ajax 请求。
- 如果没有`data-done`属性，则说明之前发送 Ajax 请求到了数据，不需要再发送 Ajax 请求。

```html
<script type="module">
  // 导入模块
  import ajax from "./ajax.js";
  // 获取DOM节点（菜单）
  const menuEl = document.querySelector(".menu");
  // 发送Ajax加载一级菜单
  const url =
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/menu";
  ajax("get", url)
    .then((res) => {
      // Ajax加载成功的数据
      let data = res.data;
      // 拼接html
      let html = "<ul>";
      // for...of遍历
      for (let item of data) {
        html += `<li data-id=${item["category_id"]}>${item.title}
                        <div class="content">
                            <img src="./loading-svg/loading-bars.svg" alt="" />
    </div>
    </li>`;
      }
      html += "</ul>";
      menuEl.innerHTML = html;
    })
    // 处理鼠标滑上一级菜单，显示对应二级菜单
    .then(() => {
      // 利用事件委托
      menuEl.addEventListener("mouseover", (e) => {
        const target = e.target;
        const tagName = target.tagName.toLowerCase();
        let url =
          "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/menu/";
        if (tagName === "li") {
          // 判断li身上是的data-done是否为true，如果为true表示已经加载过了，不再发ajax请求
          if (!target.dataset.done) {
            // 把数据做为参数传过去
            let newUrl = url + `${e.target.dataset.id}`;
            // 发起Ajax请求
            ajax("get", newUrl).then((res) => {
              // 添加自定义属性 data-done=true
              target.dataset.done = true;
              // 读取Ajax加载的数据，来构建DOM
              let data = res.data;
              const conEl = target.querySelector(".content");
              let html = "";
              // for...of遍历
              for (let { productName, productImg } of data) {
                html += `<p>
                                <img src="${productImg}" />
                                <a href="">${productName}</a> 
    </p>`;
              }
              conEl.innerHTML = html;
            });
          }
        }
      });
    });
</script>
```

### 3、GET 请求实现搜索课程

![GIF2023-3-3 1-04-53](https://www.arryblog.com/assets/img/GIF2023-3-3-1-04-53.a3b19a36.gif)

- 新建`index.html`页面，创建 form 表单，然后选择 get 方式发送请求

```html
<!--
action：表单提交后，发送请求的地址,请求发送到search.html搜索页
method:表示请求的方式，是以get方式发送请求
-->
<form action="./search.html" method="get">
  <input type="text" name="keyword" />
  <input type="submit" value="搜索" />
</form>
```

注：

- 以上 input 标签中一定要添加 name 属性，表单中的数据才能以键值对的形式出现在提交的地址栏中。
- 所以 GET 提交，action 中的地址后边不需要通过添加问号和名值对的方式来携带数据

> 因为搜索按扭的内容不需要出现在地址栏中，所以不用加 name 属性。

- 新建 `search.html`页面，用来显示搜索到的课程

> 先获取地址栏中传过来的`keyword = xxx`参数，然后根据这个参数，再一次发送 Ajax 请求，向后端请求数据，拿到数据，开始根据数据创建 DOM 插入到页面。

```js
// 导入模块
import ajax from "./ajax.js";
// 获取传递过来的keyword参数对应的值
let url = window.location.search;
const keyword = url.split("=")[1];
// 发送Ajax请求
let newUrl =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/search";
ajax("get", `${newUrl}?keyword=${keyword}`).then((res) => {
  console.log(res.data);
  render(res.data);
});

// 渲染函数
function render(data) {
  // 我们可以将所有内容先添加到文档碎片
  const fragment = document.createDocumentFragment();
  // for(let item of data){
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const img = document.createElement("img");

  h3.innerText = data.courseName;
  p.innerText = data.desc;
  img.src = data.imageUrl;

  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(p);

  fragment.appendChild(div);

  // }

  document.body.appendChild(fragment);
}
```

## 九、Axios



深入浅出 Axios 是什么，基本用法，应用实践。

### 1、Axios 是什么



- axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器 和 `node.js` 中
- 可理解为 axios 是一个第三方 Ajax 库，这个库是基于 Promise 的

> axios 的官方文档地址：[Axios Docs (axios-http.com)(opens new window)](https://axios-http.com/zh/docs/intro)

### 2、axios 的基本用法



axios 是一个第三个库，所以我们需要引入这个库才能使用。最简单的方式就是通过`<script>`标签来引入对应的 `axios.js` 文件来使用。

为了提高文件的加载速度，我们使用 CDN 加速服务，网址： [https://www.bootcdn.cn/ (opens new window)](https://www.bootcdn.cn/)按以下操作，找到对应的引入地址。

![image-20230308163122765](https://www.arryblog.com/assets/img/image-20230308163122765.27b7adfb.png)

```html
<!-- 为了提高加载速度，我们使用CDN加速服务 https://www.bootcdn.cn/ -->
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js"></script>
```

**axios 的基本用法**

```js
const p=axios(config);
const p=axios(url[,config]);
/*
	axios参数

	url:请求的URL
	config:为可选项,请求相关的配置信息
*/
```

axios 函数的返回值是一个 Promise 对象，所以可以通过`then()`方法来接受响应数据

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js"></script>
<script>
  // 查看axios
  console.log(axios);
  // 基本用法
  axios(url, config).then((response) => {
    // response 响应相关的数据都在这个对象上
  });
</script>
```

**使用 axios 来发送 get 请求**



如果`axios`只传一个参数，这个参数是一个 url，则默认为 get 请求，其它相关参数会采用默认配置

```js
const url =
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test";
// 发送ajax请求
axios(url).then((response) => {
  // response 响应相关的信息都在response对象上
  // 可以打印response,了解这个对象身上的相关属性和方法
  console.log(response);
  if (response.status === 200) {
    console.log(response.data.data);
  }
});
```

### 3、config 请求配置



`config`为`axios` 创建请求时可用的配置选项，相关的配置项可能参考官方地址：[https://axios-http.com/zh/docs/req_config(opens new window)](https://axios-http.com/zh/docs/req_config)

> 以下列出第个常用的来作为讲解

```js
axios({
  // url是用于请求的服务器URL，如果第一个参数为url，这里可以不写
  url: "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/list",
  // 请求的方法
  method: "post",
  // 自定义请求头
  headers: { "Content-Type": "application/json" },
  // 通过请求头携带的数据,主要与get方法结合
  params: {
    num: 3,
  },
  //  请求体被发送的数据，主要与'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  data: {
    username: "admin",
    password: "123456",
  },
  // 请求超时的毫秒数,默认值 0 （永不超时）
  timeout: 1000,
  // 表示跨域请求时是否需要使用凭证（是否携带Cookie)  默认值false
  withCredentials: false,
  // 表示浏览器将要响应的数据类型，默认值 json
  responseType: "json",
  // 浏览器专属 onUploadProgress 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },
  // onDownloadProgress 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },
  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },
}).then((res) => {});
```

get 请求

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js"></script>
<script>
  axios({
    // url是用于请求的服务器URL，如果第一个参数为url，这里可以不写
    url: "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/list",
    // url: "./bg.jpg",
    // 请求的方法
    method: "get",
    // 通过请求头携带的数据,主要与get方法结合
    params: {
      num: 3,
    },
    // 请求超时的毫秒数,默认值 0 （永不超时）
    timeout: 5000,
    // 表示跨域请求时是否需要使用凭证（是否携带Cookie)  默认值false
    withCredentials: true,
    // 表示浏览器将要响应的数据类型，默认值 json
    responseType: "json",

    // onDownloadProgress 允许为下载处理进度事件
    // 浏览器专属
    onDownloadProgress: function (progressEvent) {
      // 处理原生进度事件
      const e = progressEvent.event;
      if (e.lengthComputable) {
        console.log("当前下载量:", e.loaded);
        console.log("总下载量", e.total);
      }
    },
  }).then((res) => {
    console.log(res.data);
  });
</script>
```

post 请求

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js"></script>
<script>
  axios({
    // url是用于请求的服务器URL，如果第一个参数为url，这里可以不写
    url: "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login",
    // url: "./bg.jpg",
    // 设置请求头，请求发送的数据类型
    headers: {
      "Content-Type": "application/json",
    },
    // 请求的方法
    method: "post",
    //  请求体被发送的数据，主要与'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
    data: {
      username: "admin",
      password: "123456",
    },
    // 表示跨域请求时是否需要使用凭证（是否携带Cookie)  默认值false
    withCredentials: true,
    // 表示浏览器将要响应的数据类型，默认值 json
    responseType: "json",
  }).then((res) => {
    console.log(res.data);
  });
</script>
```

### 4、response 响应对象



当请求响应回来后，相关信息保存在 response 响应对象中，响应对象的相关信息如下

> 参考官方文档：[https://axios-http.com/zh/docs/res_schema(opens new window)](https://axios-http.com/zh/docs/res_schema)

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

### 5、使用别名方式请求



为了方便起见，已经为所有支持的请求方法提供了别名。

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

> 在使用别名方法时 `url`、`method`、`data` 这些属性都不必在配置中指定。

axios 是别人封装好的，已经是非常成熟了，我们未来企业项目开发中也会经常用到。我们前面自己的封装的 Ajax 主要是为了学习使用，还有很多特殊情况没有考虑到，一般在实际开发中也不会真正使用。在实际开发中就使用 axios 这样成熟的库即可。

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js"></script>
<script>
  axios
    .post(
      "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login",
      {
        username: "admin",
        password: "123456",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        // 表示跨域请求时是否需要使用凭证（是否携带Cookie)  默认值false
        // withCredentials: true,
        // 表示浏览器将要响应的数据类型，默认值 json
        responseType: "json",
      }
    )
    .then((res) => {
      console.log(res.data);
    });
</script>
```

> 关于更多内容，暂时目前不讲，因为后面的项目中经常需要和 axios 打交道，到时候在项目中深入学习，目前大家可以看官方文档自行学习。

## 十、Fetch



深入浅出 Fetch 是什么，基本用法，应用实践。

### 1、Fetch 是什么



- 与 Ajax 类似，Fetch 也是前后端通信的一种方式。Fetch 要比 Ajax 年轻一些
- Fetch 被称为下一代 Ajax 技术（用来替代 XMLHttpRequest），内部是采用 Promise 的方式来处理数据。
- API 语法简洁明了，比 XMLHttpRequest 更加简单易用
- 采用了模块化设计，API 分散于多个对象中（如：Response 对象，Request 对象、Header 对象）
- 通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能，对于大文件或者网速慢的场景极为有用。

**兼容性**

> 关于兼容性也可以使用：[https://caniuse.com/ (opens new window)](https://caniuse.com/)查询

![image-20230308004933138](https://www.arryblog.com/assets/img/image-20230308004933138.9e906f59.png)

Fetch 缺点

- Fetch 的兼容性没有 Ajax 好
- Fetch 原生没有提供 abort 终止请求方式、timeout 请求超时方式，如果需要用到这些时，需要自己来实现。

### 2、Fetch 的基本用法



全局的 `fetch()` 方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应被 resolve，并传回 `Response`对象。

> 失败时会被 reject，并传回`TypeError`

```js
// fetch 是一个全局函数，是真实存在的
console.log(fetch);
// ajax 是不存在的
console.log(ajax);
```

**语法**

```js
const p = fetch(url, options).then((response) => {
  // 处理响应回来的数据
});
/*
	p 为Promise对象,通过then方法可以接受响应后的response对象
	url  :获取资源的URL
	options: 配置对象，包括所有对请求的设置
	response：是一个Response类型的对象，呈现了对一次请求的响应数据
*/
```

**利用 fetch 发送 get 请求**



- 如果`fetch()`只接受一个`url`字符串参数，则表示向该网址发送 get 请求，请求返回一个 Promise 对象
- 能过 Promise 的 then 方法可以得到一个 response 对象，对象的`status`属性获取返回响应的状态码，通过这个状态码可以知道响应是成功还是失败。
- 调用 response 对象身上的特定方法可以获取到响应回来的数据，如`response.json()`方法

```js
// 发送Ajax请求，请求方式 get
fetch(
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test"
)
  .then((res) => {
    // res 为response对象，res.status 返回响应的状态码
    if (res.status === 200) {
      // res.json() 是一个异步操作 返回响应的数据（一个被解析为JSON格式的Promise对象）
      return res.json();
    } else {
      // 抛出错误
      throw new Error("请求错误");
    }
  })
  .then((data) => {
    // 拿到返回的JSON数据
    console.log(data);
  })
  .catch((err) => {
    // 捕获错误信息
    console.log(err);
  });
```

### 3、response 对象



关于 fetch 方法发起请求响应成功后，promise 对象返回的 response 对象的相关属性和方法可以[查阅官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

以下是常用到的一些属性和方法

| 属性     | 说明                                                                        |
| :------- | :-------------------------------------------------------------------------- |
| status   | 只读属性包含响应的状态代码，如成功为 200                                    |
| body     | body 是一个可读的流， 只能读取一次，读过之后就不让再读了                    |
| bodyUsed | 表示 response 对象是否读取过 body 流，默认值为 false，如果读取过就变为 true |

| 方法 | 说明                                                                                                         |
| :--- | :----------------------------------------------------------------------------------------------------------- |
| json | 接收一个 Response 流，并将其读取完成。它返回一个 Promise，Promise 的解析 resolve 结果是将文本体解析为 JSON。 |

```js
fetch(
  "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/test"
)
  .then((res) => {
    if (res.status === 200) {
      console.log(res.bodyUsed);
      console.log(res.json()); // 因为body流只能读一次，所以这里读了，后面就没法读
      console.log(res.bodyUsed);
      return res.json();
    }
  })
  .then((data) => {
    console.log(data); // 这里拿不到数据
  });
```

![image-20230307235448956](https://www.arryblog.com/assets/img/image-20230307235448956.3e432f06.png)

### 3、Fecth 的参数配置

| 属性        | 说明                                                                                                                                                                                                                                                                                |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method      | 请求使用的方法，如 `GET`、`POST`、`PUT` 等                                                                                                                                                                                                                                          |
| body        | 请求的 body(请求体) 信息，GET 方法不包含 body 信息                                                                                                                                                                                                                                  |
| headers     | 请求的头信息，形式为 [`Headers` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)的对象或包含 [`ByteString` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)值的对象字面量                  |
| mode        | 请求的模式，如 cors`、`no-cors 或者 same-origin `cors`：跨域请求，且要求后端需要设置 cors 响应头 `no-cors`：允许跨域，但服务端不设置 cors 响应头，如果图片、脚本、样式 `same-origin`：同源请求，限制了不能跨域                                                                      |
| credentials | 请求是否携带 Cookie，有三个值：`omit`、`same-origin`、`include` `omit`：缺省值，默认为该值 `same-origin`: 同源, 表示同域请求才发送 cookie `include`：跨域请求中需要带有 cookie 时 与 Ajax 的 withCredentials 属性一样，设置跨域请求时是否允许携带 Cookie 等，同是后端也要做相关设置 |

```html
<script>
  const url =
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/login";

  fetch(url, {
    // 请求使用的方法，如 `GET`、`POST`、`PUT` 等
    method: "post",
    // post请求体携带数据，不传递就是 null,可以是键值对、JSON、FormData
    body: "username=admin&password=123456",
    // 请求的头信息
    headers: {
      // Form格式
      "Content-Type": "application/x-www-form-urlencoded",
      // JSON格式
      // "Content-Type": "application/json",
    },
    // 请求的模式：跨域资源共享，默认值：cors 默认支持跨域
    mode: "cors",
    // 是否携带Cookie
    credentials: "include",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("请求出错");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
</script>
```

## 十一、总结



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、Ajax 的使用步骤

①、创建 xhr 对象

```js
const xhr = new XMLHttpRequest();
```

②、监听事件，处理响应（readystatechange 兼容性很好）

```js
const xhr = new XMLHttpRequest();
// 监听事件，处理响应
xhr.onreadystatechange = () => {
  if (xhr.readyState !== 4) {
    return;
  }
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    console.log(xhr.responseText);
    console.log(typeof xhr.responseText);
  }
};
```

load 监听事件，处理响应（不考虑 IE6~8 时优先使用）

```js
xhr.addEventListener(
  "load",
  () => {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
      console.log(xhr.response);
    }
  },
  false
);
```

③、准备发送请求

```js
xhr.open("GET", url, true);
```

④、发送请求

```js
// 第1种：不需要携带数据 或 GET请求，这是就传 null 或 什么都不传，null 是为了兼容性考虑
xhr.send(null);
// 第2种：名值对的形式
xhr.send("username=icoding&sex=male");
// 第3种：JSON 格式的字符串形式
xhr.send(
  JSON.stringify({
    username: "icoding",
    age: 20,
  })
);
```

### 2、GET 和 POST 请求

GET 请求不能通过请求体携带数据，但可以通过请求头携带

```js
xhr.open("GET", "./index.html?username=icoding&age=20", true);
xhr.send(null);
```

POST 请求一般通过请求体携带数据，但也可以通过请求头携带

```js
xhr.open("POST", "./index.html?username=icoding&age=20", true);
xhr.send("username=icoding&age=20");
```

> 如果携带的数据是非英文字母，需要编码之后再发送。可以使用 `encodeURIComponent()` 编码

### 3、JSON 的 3 种形式

①、简单值形式（对应着 JS 中的基础数据类型）

```js
6;
("str");
true;
null;
```

②、对象形式（对应着 JS 中的对象）

```json
{
  "username": "艾编程",
  "sex": "male",
  "age": 20,
  "hobby": ["篮球", "乒乓球", "足球", "书法"],
  "family": {
    "father": "icoding",
    "mother": "美美"
  }
}
```

③、数组形式（对应着 JS 中的数组）

```json
[
  {
    "id": 1,
    "username": "艾编程",
    "phone": "123456",
    "email": "123@gmail.com"
  },
  {
    "id": 2,
    "username": "小可爱",
    "phone": "18912368918",
    "email": "666@gmail.com"
  },
  {
    "id": 3,
    "username": "星辰大海",
    "phone": "18966668888",
    "email": "888@gmail.com"
  }
]
```

### 4、JSON 的方法

- **`JSON.parse()`**

> 解析 JSON 格式的字符串 -> JS 中的对应值

```js
JSON.parse(xhr.responseText);
```

- **`JSON.stringify()`**

> JS 中的值 -> JSON 对应形式的字符串

```js
JSON.stringify("str");

JSON.stringify({
  username: "icoding",
  age: 20,
});

JSON.stringify([2, true, "str"]);
```

### 5、跨域



- 协议、域名、端口号，任何一个不一样，就是不同域
- 不同域之间的请求，就是跨域请求，会被浏览器阻止
- 常用的解决方案：CORS 跨域资源共享 和 JSONP

### 6、CORS 跨域资源共享



- 后端在响应头中添加 Access-Control-Allow-Origin 头信息
- 主要是后端来设置，前端无需做任何操作
- 优先使用 CORS 解决跨域问题

```shell
# 通配符 * 表示所有的域名都可以请求
Access-Control-Allow-Origin: *
# 指定域名和端口号不会被阻止，其他都会被阻止（这种方式相对更安全）
Access-Control-Allow-Origin: http://127.0.0.1:5501
```

### 7、JSONP



- JSONP 利用 script 标签加载跨域文件（使用 script 标签将 JSONP 的接口引入）
- JSONP 的接口是需要特殊设计的，如下

```shell
# ?callback= 为固定写法
# handleResponse 为自定义写法
https://www.icodingedu.com/api/web?callback=handleResponse
```

- 在前端使用对应的函数

```js
// handleResponse 函数名 就是对应的 ?callback= 后边的函数名
function handleResponse(data) {
  // data 就是跨域获取到的数据
  console.log(data);
}
```

注：

不能使用 CORS 的时候，可以考虑使用 JSONP 解决跨域问题

### 8、XHR 的属性



**response 和 responseText**

- `responseType = "json"` ，只能使用 response
- `responseType = "text"` 或 `""` ，response 和 responseText 都能用
- IE 10 及以上浏览器开始支持 response，只要浏览器支持 response，就优先使用 response

**timeout 和 withCredentials**

- timeout 属性用来设置超时时间，单位 ms
- withCredentials 属性为 true ，跨域时也会携带 Cookie
- IE8 开始支持 timeout ，IE10 开始支持 withCredentials （这些兼容性的内容不需要记忆，知道即可，必要时直接去查询即可）

### 9、XHR 的方法



- `abort()` 用来终止当前请求
- `setRequestHeader(名称,值)` 用来设置请求头信息，常用的设置方式如下

```js
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
```

### 10、XHR 的事件

- load 事件：响应数据可用时会触发 load 事件，IE9 开始支持该事件

```js
xhr.addEventListener(
  "load",
  () => {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response);
    }
  },
  false
);
```

- 请求发生错误时会触发 error 事件，IE10 开始支持该事件
- 调用 `abort()` 终止请求时会触发 abort 事件，IE10 开始支持该事件
- 请求超时后会触发 timeout 事件，IE8 开始支持该事件

### 11、FormData



可用于发送表单数据，也可以独立于表单，用于发送键值对数据。IE10 开始支持

```js
// 将表单元素传入
const data = new FormData(表单元素);

// 不传入表单元素，通过 append 添加数据，脱离于表单来使用，也是可以的
const data = new FormData();
data.append("username", "icoding");
data.append("sex", "male");
```

可以通过 `xhr.send(FormData 数据)` 发送

```js
xhr.send(data);
```

### 12、axios

axios 的基本用法

```js
axios(url)
  // 成功
  .then((response) => {
    console.log(response);
  })
  // 失败
  .catch((error) => {
    console.log(error);
  });
```

axios 的相关配置

```js
axios(url, {
  method: "post",
  // 请求头信息
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // 通过请求头携带的数据
  params: {
    sex: "male",
  },
  // 通过请求体携带的数据
  data: "username=icoding&sex=male",
  // 超时时间
  timeout: 10,
  // 跨域时携带 Cookie
  withCredentials: true,
});
```

GET 请求：`axios.get()`

```js
axios
  .get(url, {
    params: {
      username: "icoding",
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

POST 请求：`axios.post()`

> `post()`方法中第二个参数是直接传递数据

```js
axios
  .post(url, {
    username: "icoding",
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

### 13、Fetch

Fetch 的基本用法

```js
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP CODE 异常 ${response.status}`);
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
```

Fetch 的相关配置

```js
fetch(url, {
  method: "POST",
  // 请求的头信息
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // 请求体携带数据
  body: "username=icoding&sex=male",
  // 跨域时设置，默认值 cors
  mode: "cors",
  // 跨域时携带 Cookie
  credentials: "include",
});
```

## 十二、测试题



自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、下列关于 readyState 状态值，描述正确的选项是 ？

> 多选

- A、状态值为 0：此时尚未创建 xhr 对象，也没有调用 open 方法
- B、状态值为 1：此时 open 方法已被调用，但是尚未调用 send 方法
- C、状态值为 2：send 方法已被调用，但是尚未接收到响应数据
- D、状态值为 3：已经接收完响应数据了

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B C</p></details>

### 2、下列 JSON 数据，格式书写正确的选项是 ？

> 单选

A、

```js
{
	"username":"icoding", // 用户名
	"age":18
}
```

B、

```js
{
	username:"icoding",
	age:18
}
```

C、

```js
{
	"username":"icoding",
	"age":"undefined"
}
```

D、

```js
{
	'username':'icoding',
	'age':18
}
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 3、下列选项中，描述错误的是 ？

> 单选

- A、`JSON.stringify()`的作用是将 JavaScript 中的对象转换为 JSON 字符串
- B、`JSON.stringify()`方法让 localStorage/sessionStorage 可以存储对象
- C、`JSON.parse()`作用是将字符串转为一个对象
- D、`JSON.stringify()`方法可以判断两个数组或对象中的值是否相等

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 4、以下地址的页面，向下列选项中哪个地址发送请求时，不属于跨域 ？

地址：`http://www.icodingedu.com`

> 单选

- A、`http://www.icodingedu.com:8080`
- B、`https://www.icodingedu.com`
- C、`http://www.icodingedu.com/list`
- D、`http://m.icodingedu.com`

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 5、下列描述正确的选项是 ？

- A、responseType 属性值为空时，不可以使用 response 属性接收
- B、responseType 属性值为 json 时，不可以使用 responseText 属性接收
- C、responseType 属性值为 text 时，只能使用 responseText 属性接收
- D、没有设置 responseType 属性时，可以使用 responseText 或 response 属性接收

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B D</p></details>

### 6、下列 setRequestHeader() 和 send() 方法对应正确的是 ？

> 单选

A、

```js
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.parse({ username: "icoding" }));
```

B、

```js
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(`{"username":"icoding"}`);
```

C、

```js
xhr.setRequestHeader("Content-Type", "multipart/form-data");
xhr.send("username=admin&password=123456");
```

D、

```js
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send('{"username":"icoding","password":123456}');
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：D</p></details>

上次更新时间: 6/8/2023, 9:23:17 PM

← [本地存储 Cookie、localStorage、sessionStorage 实践](https://www.arryblog.com/vip/network/cookie-localstorage-sessionstorage.html)[async 和 await 异步编程解决方案 ](https://www.arryblog.com/vip/network/async-await.html)→

大厂最新技术学习分享群

![大厂最新技术学习分享群](https://www.arryblog.com/bulletin-box.jpg)

微信扫一扫进群，获取资料

X

评论 Powered by [GitHub ](https://github.com/)& [Vssue](https://github.com/meteorlxy/vssue)

使用 GitHub 帐号登录后发表评论

使用 GitHub 登录

登录后查看评论
