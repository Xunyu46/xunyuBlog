---
title: 微信小程序页面导航、传参、事件、API、网络请求
date: 2023-10-28
sidebar: 'auto'
categories:
  - applet
tags:
  - applet
publish: true
---

# 微信小程序页面导航、传参、事件、API、网络请求

从本节内容开始学习微信小程序页面导航，导航传参，页面事件、微信小程序相关 API 等

- 页面导航
- 导航传参
- 页面事件
- 小程序的 API
- 小程序网络数据请求
- 上拉触底分页数据加载综合实践应用

## 一、页面导航

深入浅出小程序中的页面导航，声明式导航、编程式导航基本用法和注意事项。

> 详细查阅 [小程序官方文档 - navigator(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)

### 1、什么是页面导航

页面导航指页面之间的相互跳转。如浏览器中实现页面导航的方式有两种方式

- a 标签，超链接
- `location.href`

### 2、在小程序中导航的两种方式

①、声明式导航

- 在页面上声明一个 `<navigator>` 导航组件
- 通过点击 `<navigator>` 组件实现页面跳转

②、编程式导航

- 调用小程序的 导航 API ，实现页面的跳转

### 3、声明式导航 - 导航跳转到 tabBar 页面

tabBar 页面指：被配置为 tabBar 的页面

**注：**

在使用 `<navigator>` 组件跳转到指定的 tabBar 页面时，需要指定 url 属性 和 open-type 属性

- ①、url 表示要跳转的页面地址，必须以 `/` 开头
- ②、open-type 表示跳转的方式，必须为 `switchTab`（注：一定要指定 open-type 属性，否则不生效）

```html
<!--pages/navigator/navigator.wxml-->
<navigator url="/pages/menu/menu" open-type="switchTab">导航到菜单页面</navigator>
```

### 4、声明式导航 - 导航到非 tabBar 页面

非 tabBar 页面指：没有被配置为 tabBar 的页面

在使用 `<navigator>` 组件跳转到普通的非 tabBar 页面时，则需要指定 url 属性 和 open-type 属性

- ①、url 表示要跳转的页面地址，必须以 `/` 开头
- ②、open-type 表示跳转方式，必须为 `navigate`

```html
<!--pages/navigator/navigator.wxml-->
<navigator url="/pages/desc/desc" open-type="navigate">导航到 desc 页面（非tabBar页面）</navigator>
```

注：

在导航到非 tabBar 页面时，`open-type="navigate"` 属性可以省略不写

### 5、声明式导航 - 后退导航

如果要后退到上一个页面或多级页面，需要指定 open-type 属性和 delta 属性

- open-type 的值必须是 `navigateBack` ，表示要进行后退导航
- delta 的值必须是数字，表示要后退的层级

```html
<!--pages/desc/desc.wxml-->
<navigator open-type="navigateBack" delta="1">返回上一页</navigator>
```

注：

如果只是后退到上一级页面，可以省略 delta 属性，因为其默认值就是 1

### 6、编程式导航 - 导航到 tabBar 页面

调用 `wx.switchTab(Object object)` 方法，可以跳转到 tabBar 页面。

> 其中 Object 参数对象的属性列表如下，详细查阅[小程序官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)

| 属性     | 类型     | 必填 | 说明                                                                                                                                                                                                                  |
| :------- | :------- | :--- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url      | string   | 是   | 需要跳转的 tabBar 页面的路径 (代码包路径)（需在 app.json 的 [tabBar (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabbar)字段定义的页面），路径后不能带参数。 |
| success  | function | 否   | 接口调用成功的回调函数                                                                                                                                                                                                |
| fail     | function | 否   | 接口调用失败的回调函数                                                                                                                                                                                                |
| complete | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                                                                                                                                                      |

在 `pages/navigator/navigator.wxml` 页面结构中

```html
<!--pages/navigator/navigator.wxml-->
<button type="primary" bindtap="gotoMenu">跳转到菜单页面</button>
```

在 `pages/navigator/navigator.js` 页面逻辑中

```js
Page({
  // 通过编程式导航，跳转至 menu 页面（tabBar页面）
  gotoMenu(e) {
    wx.switchTab({
      url: '/pages/menu/menu',
    })
  },
})
```

### 7、编程式导航 - 导航到非 tabBar 页面

调用 `wx.navigateTo(Object object)` 方法，可以跳转到非 tabBar 页面，不能跳到 tabbar 页面。

> 其中 Object 参数对象的属性列表如下，详细查阅[小程序官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

| 属性      | 类型     | 必填 | 说明                                                                                                                                                                               |
| :-------- | :------- | :--- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url       | string   | 是   | 需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如`path?key=value&key2=value2` |
| events    | Object   | 否   | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。基础库 2.7.3 开始支持。                                                                                                    |
| routeType | string   | 是   | 2.29.2 自定义路由类型，相关文档 [自定义路由(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/custom-route.html)                       |
| success   | function | 否   | 接口调用成功的回调函数                                                                                                                                                             |
| fail      | function | 否   | 接口调用失败的回调函数                                                                                                                                                             |
| complete  | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                                                                                                                   |

在 `pages/navigator/navigator.wxml` 页面结构中

```html
<button type="primary" bindtap="gotoDesc">跳转到描述页面</button>
```

在 `pages/navigator/navigator.js` 页面逻辑中

```js
Page({
  // 通过编程式导航，跳转至 desc 页面（非tabBar页面）
  gotoDesc(e) {
    wx.navigateTo({
      url: '/pages/desc/desc',
    })
  },
})
```

### 8、编程式导航 - 后退导航

调用 `wx.navigateBack(Object object)` 方法，可以返回上一页面或多级页面

> 其中 Object 参数对象属性列表如下，详细查阅[小程序官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)

| 属性     | 类型     | 默认值 | 必填 | 说明                                                    |
| :------- | :------- | :----- | :--- | :------------------------------------------------------ |
| delta    | number   | 1      | 否   | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 |
| success  | function |        | 否   | 接口调用成功的回调函数                                  |
| fail     | function |        | 否   | 接口调用失败的回调函数                                  |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）        |

在 `pages/desc/desc.wxml` 页面结构中

```html
<!--pages/desc/desc.wxml-->
<button type="primary" bindtap="gotoBack">后退</button>
```

在 `pages/desc/desc.js` 页面逻辑中

```js
// pages/desc/desc.js
Page({
  // 编程式导航，后退上一页面
  gotoBack(e) {
    wx.navigateBack({
      delta: 1, // 默认值为 1 可以省略
    })
  },
})
```

## 二、导航传参

深入浅出 声明式导航传参 和 编程式导航传参

### 1、声明式导航传参

`navigator` 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数

- 参数与路径之间使用 `?` 分隔
- 参数键与参数值用 `=` 相连
- 不同参数用 `&` 分隔

```html
<navigator url="/pages/desc/desc?id=1001&type=1">跳转到描述页面，并传递参数 id 和 type</navigator>
```

![image-20230407182000282](https://www.arryblog.com/assets/img/image-20230407182000282.b2c43ae2.png)

### 2、编程式导航传参

调用 `wx.navigateTo(Object object)` 方法跳转页面时，也可以携带参数

在 `pages/navigator/navigator.wxml` 页面结构中

```html
<button type="primary" bindtap="gotoNavigateTo">编程式导航传参</button>
```

在 `pages/navigator/navigator.js` 页面逻辑中

```js
// pages/navigator/navigator.js
Page({
  gotoNavigateTo() {
    wx.navigateTo({
      url: '/pages/desc/desc?id=1001&type=1',
    })
  },
})
```

![image-20230407183030788](https://www.arryblog.com/assets/img/image-20230407183030788.c9c034d3.png)

### 3、在 onLoad 中接收导航参数

通过声明式传参 或 编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到

在跳转完成后的目标页面 `pages/desc/desc.js` 逻辑的 onLoad 生命周期函数中接收传递过来的参数

```js
// pages/desc/desc.js
Page({
  // 生命周期函数--监听页面加载，options 为形参
  onLoad(options) {
    // options 是导航传递过来的参数对象
    console.log(options)
  },
})
```

![image-20230407184002169](https://www.arryblog.com/assets/img/image-20230407184002169.52c90cf0.png)

如果我们需要让页面中其他函数也能访问到通过导航传递过来的参数，我们只需将 `options` 参数对象挂在到 data 对象中即可

```js
// pages/desc/desc.js
Page({
  // 页面的初始数据
  data: {
    // 通过导航传递过来的参数对象
    query: {},
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    // options 是导航传递过来的参数对象
    console.log(options)
    // 将 options 参数对象存储在 data 中 query 对象中
    this.setData({
      query: options,
    })
  },
})
```

注：

当页面中的企业其他函数需要用到导航传递过来的参数时，只需要从 data 中 query 对象中取值即可。

![image-20230407184803683](https://www.arryblog.com/assets/img/image-20230407184803683.184de36d.png)

## 三、页面事件

深入浅出页面常用的事件，实现下拉刷新、上拉触底，综合实践应用

### 1、什么是下拉刷新

下拉刷新是移动端的专有术语，指通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为

![GIF-2023-4-7-19-02-54](https://www.arryblog.com/assets/img/GIF-2023-4-7-19-02-54.904f7d5a.gif)

### 2、启用下拉刷新

启用下拉刷新有两种方式

- ①、全局开启下拉刷新。详情查阅 [小程序官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)

在 `app.json` 的 window 节点中，将 `enablePullDownRefresh` 设置为 `true`

- ②、局部开启下拉刷新。详情查阅 [小程序官方文档(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

在页面的 `.json` 配置文件中，将 `enablePullDownRefresh` 设置为 `true`

> 实际开发中，推荐使用第 2 种方式，为需要的页面单独开启下拉刷新的效果。

### 3、配置下拉刷新窗口的样式

在全局 或 页面的 `.json` 配置文件中，通过 `backgroundColor` 和 `backgroundTextStyle`来配置下拉刷新窗口的样式

- backgroundColor 用来配置下拉刷新窗口的背景颜色，仅支持 16 进制的颜色值
- backgroundTextStyle 用来配置下拉刷新 loading 的样式，仅支持 dark 和 light

在页面 `/pages/index/index.json` 配置文件中

```json
{
  "usingComponents": {},
  "enablePullDownRefresh": true,
  "backgroundColor": "#e0dede",
  "backgroundTextStyle": "dark"
}
```

![GIF-2023-4-8-2-16-19](https://www.arryblog.com/assets/img/GIF-2023-4-8-2-16-19.e7177f40.gif)

### 4、监听页面的下拉刷新事件

在页面的 `.js` 文件中，通过 [onPullDownRefresh() (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPullDownRefresh)生命周期函数即可监听当前页面的下拉刷新事件

在 `/pages/refresh/refresh.js` 页面逻辑中

```js
Page({
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    console.log('触发了refresh 页面的下拉刷新')
  },
})
```

当下拉刷新页面时，会触发 `onPullDownRefresh()` 声明周期函数，控制台打印输出如下

![image-20230408022109966](https://www.arryblog.com/assets/img/image-20230408022109966.08d7b40a.png)

### 5、下拉刷新事件操作

当点击页面中的按钮时，让 count 值自增 +2 ，再触发页面的下拉刷新事件时，将 count 值重置为 0

在 `pages/refresh/refresh.wxml` 页面结构中

```html
<view class="container">
  <view>count 值为：{{ count }}</view>
  <button type="primary" bindtap="countAdd">点我 + 2</button>
</view>
```

在 `pages/refresh/refresh.js` 页面逻辑中

```js
// pages/refresh/refresh.js
Page({
  // 页面的初始数据
  data: {
    count: 0,
  },
  // +2 按钮点击事件处理函数
  countAdd() {
    this.setData({
      count: this.data.count + 2,
    })
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    console.log('触发了index页面的下拉刷新')
    this.setData({
      count: 0,
    })
  },
})
```

效果如下

![GIF-2023-4-8-2-36-19](https://www.arryblog.com/assets/img/GIF-2023-4-8-2-36-19.9457fb07.gif)

### 6、停止下拉刷新效果

当在真机调试中，下拉刷新的 loading 效果会一直显示，不会主动消失（在模拟器正常）

![GIF-2023-4-8-2-57-26](https://www.arryblog.com/assets/img/GIF-2023-4-8-2-57-26.1691f4ed.gif)

在真机中的调试效果，loading 不会主动关闭

> 因此，需要手动隐藏 loading 效果，使用[wx.stopPullDownRefresh(Object object) (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html)停止当前页面的下拉刷新。

```js
// 页面相关事件处理函数--监听用户下拉动作
onPullDownRefresh() {
    console.log("触发了index页面的下拉刷新")
    this.setData({
        count: 0
    })

    // 当数据重置成功后，调用该函数，关闭下拉刷新效果即可
    wx.stopPullDownRefresh();
},
```

优化后的真机调试效果

![GIF-2023-4-8-3-01-00](https://www.arryblog.com/assets/img/GIF-2023-4-8-3-01-00.cfe60d70.gif)

### 7、上拉触底事件

上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，加载更多数据行为

> 多用于移动端的分页功能效果实现。如下

![GIF-2023-4-8-3-14-45](https://www.arryblog.com/assets/img/GIF-2023-4-8-3-14-45.dc44efea.gif)

### 8、监听页面的上拉触底事件

在页面的 `.js` 文件中，通过 `onReachBottom()` 生命周期函数，即可监听当前页面的上拉触底事件。

> 如下

```js
Page({
  // 页面上拉触底事件的处理函数
  onReachBottom() {
    console.log('触发了上拉触底事件 ......')
  },
})
```

`.wxml`页面结构

```html
<!-- 触发上拉触底的事件的前提是：当前页面的高度必须超过一屏 -->
<view style="height: 1500rpx; background-color: skyblue;"></view>
```

![image-20230408032819805](https://www.arryblog.com/assets/img/image-20230408032819805.d649cdee.png)

### 9、配置上拉触底的距离

上拉触底的距离指触发上拉触底事件时，滚动条距离页面底部的距离。

在全局 或 页面的 `.json` 页面配置文件中，通过 [onReachBottomDistance (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)属性来配置上拉触底的距离。默认触底距离为 `50px`，在实际开发中根据自己的需求修改值即可

```json
{
  "onReachBottomDistance": 200
}
```

![image-20230408034119230](https://www.arryblog.com/assets/img/image-20230408034119230.94edbcfa.png)

### 10、上拉触底分页数据加载综合实践应用

![GIF-2023-4-8-4-57-01](https://www.arryblog.com/assets/img/GIF-2023-4-8-4-57-01.ec6717f1.gif)

实现上拉触底的综合实践应用的步骤

- ①、定义获取随机颜色值的方法（使用 fastmock 定义数据接口）
- ②、在页面加载时初始化数据
- ③、渲染页面 UI 结构并定义页面样式
- ④、在上拉触底时调用获取随机颜色的方法
- ⑤、添加 loading 正在加载效果
- ⑥、对上拉触底进行节流处理

> 等学完网络请求后，再来实现该实践内容

## 四、小程序的 API

小程序的 API 是由宿主环境提供的，通过这些丰富的小程序 API 开发者可以方便调用微信提供的能力。

> 如：获取用户信息、本地存储、支付能力、摄像头、录音、通讯录等

小程序官方把 API 分为 3 大类，详细查阅 [小程序官方文档 - API(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/)

### 1、事件监听 API

特点：以 on 开头，用来监听某些事件的触发

> 如：`wx.onThemeChange(function listener)` 监听系统主题改变事件

### 2、同步 API

- 特点 1：以 Sync 结尾的 API 都是同步 API
- 特点 2：同步 API 的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常

> 如：`wx.setStorageSync(string key, any data)` 将数据存储在本地缓存中指定的 key 中

### 3、异步 API

特点：类似于 jQuery 中的 `$.ajax(options)` 函数，需要通过 success、fail、complete 接收调用的结果

> 如：`wx.request()` 发起网络数据请求，通过 success 回调函数接收数据

## 五、小程序网络数据请求

在小程序 API 中网络板块分为：发起请求、下载、上传、WebSocket 、mDNS 服务、TCP 通信 等

### 1、小程序网络数据请求的限制

出于安全性方面的考虑，小程序官方对数据接口的请求做出了 2 个部分的限制

- ①、只能请求 HTTPS 类型的接口
- ②、必须将接口的域名添加到信任列表中 （登录小程序后台，即可添加）

![image-20230408182416537](https://www.arryblog.com/assets/img/image-20230408182416537.7f28e74d.png)

### 2、配置 request 合法域名

需要将我们要请求的接口的域名地址，在小程序后台配置即可，发起对应的请求。

> 配置流程：登录微信小程序管理后台 -> 开发 -> 开发管理 -> 开发设置 -> 服务器域名 -> 配置 或 修改 request 合法域名 即可。第一次课中也有讲过，详细见 [小程序配置服务器(opens new window)](https://www.arryblog.com/vip/applet/#_3、小程序开发工具下载、安装)

![image-20230108014556525](https://www.arryblog.com/assets/img/image-20230108014556525-168095428446110.2669a942.png)

注：

- 域名只支持 HTTPS 协议
- 域名不能使用 IP 地址 或 localhost
- 域名必须经过 ICP 备案
- 服务器域名一个月内最多修改 5 次，后台显示次数和实际不符，详情见[社区问答(opens new window)](https://developers.weixin.qq.com/community/develop/doc/000ace660a8018bbae6acd15956800)

> 详细查阅 [小程序官方文档 - 网络(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

### 3、发起 GET 请求

调用微信小程序提供的 `wx.request()` 方法，可以发起 GET 数据请求

在 `.wxml` 中定义一个按钮

```html
<!--pages/request/request.wxml-->
<button type="primary" bindtap="getInfo">发起 GET 请求</button>
```

在 `.js` 中定义方法

```js
// pages/request/request.js
Page({
  getInfo() {
    wx.request({
      // 请求的接口地址，必须是 HTTPS 协议的
      url: 'https://www.fastmock.site/mock/f0905ad9e9d4f8cf946be47b97f126a3/icoding/api/words',
      // 请求方式
      method: 'GET',
      // 发送到服务器的数据
      data: {
        username: 'arry',
        sex: 'man',
      },
      // 请求成功之后的回调函数
      success: ({ data: res }) => {
        console.log(res)
      },
    })
  },
})
```

fastmock 中定义的数据，如下

```json
{
  "code": 200,
  "data": [
    { "word": "javascript" },
    { "word": "java" },
    { "word": "json" },
    { "word": "python" },
    { "word": "c/c++" },
    { "word": "node.js" },
    { "word": "php" }
  ]
}
```

运行结果

![image-20230409122838844](https://www.arryblog.com/assets/img/image-20230409122838844.f1049941.png)

### 4、发起 POST 请求

发起 HTTP 的 POST 请求，以下是以用户登录为例

在 fastmock 中定义的数据接口，如下

```json
{
  "code": "0000",
  "data": {
    "verifySuccess": function({_req, Mock}) {
      let body = _req.body;
      if(body.username === 'admin' && body.password === '123456'){
        return "登录成功 ！";
      } else {
        return "用户名或密码错误 ！";
      }
    },
    "userInfo": function({_req, Mock}) {
      let body = _req.body;
      if (body.username === 'admin' && body.password === '123456') {
        return Mock.mock({
          username: "admin",
          email: "@email",
          address: "@county(true)"
        });
      } else {
        return "用户名或密码错误";
      }
    },
  },
  "desc": "成功"
}
```

通过 fastmock 预览接口地址

![image-20230410115812448](https://www.arryblog.com/assets/img/image-20230410115812448.07ce6600.png)

在 `.wxml` 定义按钮

```html
<!--pages/request/request.wxml-->
<button type="primary" bindtap="postInfo">发起 POST 请求</button>
```

在 `.js` 中定义方法

```js
// pages/request/request.js
Page({
  postInfo() {
    wx.request({
      // 请求的接口地址，必须是 HTTPS 协议的
      url: 'https://www.fastmock.site/mock/f0905ad9e9d4f8cf946be47b97f126a3/icoding/user/login',
      // 请求方式
      method: 'POST',
      // 发送到服务器的数据
      data: {
        username: 'admin',
        password: '123456',
      },
      // 请求成功之后的回调函数
      success: (res) => {
        console.log(res.data)
      },
    })
  },
})
```

运行效果

![image-20230409123616801](https://www.arryblog.com/assets/img/image-20230409123616801.e13a8f41.png)

### 5、在页面加载时请求数据

在很多情况下，我们需要在页面刚加载的时候，自动请求一些初始化的数据。我们只需要在页面的 onLoad 生命周期函数中调用获取数据的函数即可

```js
// pages/network/network.js
Page({
  // 发起 GET 请求
  getInfo() {
    wx.request({
      // 请求的接口地址，必须是 HTTPS 协议
      url: 'https://www.fastmock.site/mock/f0905ad9e9d4f8cf946be47b97f126a3/icoding/api/words',
      // 请求方式
      method: 'GET',
      success(res) {
        console.log(res.data)
      },
    })
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {
    // 在页面刚刚加载时，请求数据
    this.getInfo()
  },
})
```

### 6、跳过 request 合法域名校验

如后端开发者仅提供了 HTTP 协议的接口，暂时没有提供 HTTPS 协议的接口。

为了不耽误开发进度，我们可以在微信开发者工具中，临时开启 **“不校验合法域名、web-view(业务域名)、TLS 版本以及 HTTPS 证书”** 选项（在微信开发者工具中勾选即可）。即跳过 request 合法域名的校验

![image-20230409125018444](https://www.arryblog.com/assets/img/image-20230409125018444.65660585.png)

### 7、关于跨域 和 Ajax 的解析

跨域问题只存在于基于浏览器的 Web 开发中，由于 小程序的宿主环境不是浏览器，而是微信客户端，所以小程序中不存在跨域的问题。

Ajax 技术的核心依赖于浏览器中的 `XMLHttpRequest` 对象，由于小程序的宿主环境是微信客户端，所以小程序中不能叫做 “发起 Ajax 请求” ，而是叫做 “发起网络数据请求”。

## 六、上拉触底分页数据加载综合实践应用

![GIF-2023-4-8-4-57-01](https://www.arryblog.com/assets/img/GIF-2023-4-8-4-57-01-16810876397551.ec6717f1.gif)

实现上拉触底的综合实践应用的步骤

- ①、定义获取随机颜色值的方法（使用 fastmock 定义数据接口）
- ②、在页面加载时初始化数据
- ③、渲染页面 UI 结构并定义页面样式
- ④、在上拉触底时调用获取随机颜色的方法
- ⑤、添加 loading 正在加载效果
- ⑥、对上拉触底进行节流处理

### 1、使用 fastmock 定义随机生成颜色的数据接口

在 fastmock 中定义动态生成数据的 JSON 数据

```json
{
  "code": "0000",
  "data": function({Mock}) {
      return Mock.mock({"colorList|10":
        [
          "@rgba()"
        ]
      })
  },
  "desc": "成功"
}
```

![image-20230409135352375](https://www.arryblog.com/assets/img/image-20230409135352375.5daa1c53.png)

预览接口

![image-20230410120145489](https://www.arryblog.com/assets/img/image-20230410120145489.15e7e8e9.png)

### 2、定义获取随机颜色值的方法 和 初始化数据

在`.js` 页面逻辑中，先在控制台中打印输出

```js
// pages/reach-bottom/reach-bottom.js
Page({
  // 页面的初始数据
  data: {
    colorList: [],
  },
  // 获取颜色值
  getColor() {
    wx.request({
      url: 'https://www.fastmock.site/mock/5937c42ca063e4fea4ae49cbbef977f0/icoding/color',
      method: 'GET',
      success: ({ data: res }) => {
        // console.log(res.data.colorList)
        this.setData({
          // 将新数据拼接到旧数据中，并更新 data 中的 colorList
          colorList: [...this.data.colorList, ...res.data.colorList],
        })
      },
    })
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {
    this.getColor()
  },
})
```

### 3、渲染页面 UI 结构并定义页面样式

在 `.wxml` 中渲染页面结构

```html
<!--pages/reach-bottom/reach-bottom.wxml-->
<view class="banner" wx:for="{{colorList}}" wx:key="index" style="background-color: {{ item }};">
  {{ item }}
</view>
```

在 `.wxss` 中定义页面样式

```css
/* pages/reach-bottom/reach-bottom.wxss */
.banner {
  height: 200rpx;
  background-color: skyblue;
  border-radius: 20rpx;
  margin: 20rpx;
  text-align: center;
  line-height: 200rpx;
}
```

### 4、上拉触底获取随机颜色值

```js
// 页面上拉触底事件的处理函数
onReachBottom() {
    // 调用随机获取颜色值的方法
    this.getColor();
},
```

### 5、添加 loading 的提示效果

详情查阅 [小程序官方文档 - 显示 loading 提示框 (opens new window)](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html)，需主动调用 `wx.hideLoading` 才能关闭提示框

```js
// 获取颜色值
getColor(){

    // 显示 loading
    wx.showLoading({
        title: '数据加载中 ...',
    })

    // 发起网络请求，获取随机颜色值
    wx.request({

        // ...... 此处省略

        complete:()=>{
            // 隐藏loading
            wx.hideLoading();
        }
    })
},
```

效果如下

![GIF-2023-4-10-0-15-23](https://www.arryblog.com/assets/img/GIF-2023-4-10-0-15-23.c7fb792b.gif)

### 6、对上拉触底进行节流处理

①、在 `data` 中定义 `isLoading` 节流阀

- `isLoading: false` 表示当前没有进行任何数据请求，即可以发起后续的数据请求
- `isLoading: true` 表示当前正在进行数据请求，即额外其他的请求都需要被屏蔽掉

②、在 `getColor()` 方法中修改 `isLoading` 节流阀的值

- 在刚刚调用 `getColor()` 时，将节流阀设置为 `true`，即后续所有的请求都需要被屏蔽掉
- 在网络请求的 complete 回调函数中，将节流阀设置为 `false` ，即当前的请求已经完成了，后续的请求可以正常发起了

③、在 `onReachBottom()` 页面上拉触底生命周期函数中判断节流阀的值，从而对数据请求进行节流控制

- 如果节流阀 `isLoading` 的值为 `true`，即 阻止当前请求
- 如果节流阀 `isLoading` 的值为 `false`，即 发起数据请求

在 `.js` 页面逻辑中，进行节流处理

```js
// pages/reach-bottom/reach-bottom.js
Page({
  // 页面的初始数据
  data: {
    colorList: [],
    // 节流阀
    isLoading: false,
  },
  // 获取颜色值
  getColor() {
    // 正在发起数据请求
    this.setData({
      isLoading: true,
    })
    // 显示 loading
    wx.showLoading({
      title: '数据加载中 ...',
    })
    wx.request({
      url: 'https://www.fastmock.site/mock/5937c42ca063e4fea4ae49cbbef977f0/icoding/color',
      method: 'get',
      success: ({ data: res }) => {
        // console.log(res.data.colorList)
        this.setData({
          colorList: [...this.data.colorList, ...res.data.colorList],
        })
      },
      // 当网络数据请求完成后
      complete: () => {
        // 隐藏loading
        wx.hideLoading()
        // 将 节流阀设置为 false
        this.setData({
          isLoading: false,
        })
      },
    })
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {
    this.getColor()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    // 如果节流阀为 true 时，直接 return，不做任何数据请求
    if (this.data.isLoading) return
    // 调用随机获取颜色值的方法
    this.getColor()
  },
})
```
