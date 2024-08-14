---
title: JS 面向对象、分层设计、动态数据遍历最佳实践与应用
date: 2023-10-28
sidebar: "auto"
categories:
  - applet
tags:
  - applet
publish: true
---

# JS 面向对象、分层设计、动态数据遍历最佳实践与应用



本节内容开始使用上一节学到的 async/await 机制来实现同步代码的编写风格，调用异步请求的代码可以很好为我们整个项目的网络请求提供很好的支持。

接下来我们就开始应用这些知识来实现动态接口请求数据的方式，完成真实项目开发中 JS 面向对象、分层设计、动态数据遍历的最佳实践与应用。

- 分类列表选项的动态化
- 课程预览组件封装 与 课程列表展示
- 上拉触底、下拉刷新，加载更多数据
- 内容标签页、分类切换数据联动

## 一、分类列表选项的动态化



运用封装好的 `request` 网络请求库、async/await 机制、分层设计实现分类列表数据的动态化。

### 1、创建课程分类列表接口 Mock 数据



在 fastmock 中创建课程分类列表数据接口 `/api/course/category` 请求方式为 GET

```json
{
  "code": "0000",
  "data": [
    { "id": 1, "name": "Web 前端" },
    { "id": 2, "name": "Java 架构" },
    { "id": 3, "name": "Python 实战" },
    { "id": 4, "name": "Node 后端" },
    { "id": 5, "name": "GO 语言" },
    { "id": 6, "name": "云原生" }
  ],
  "desc": "成功"
}
```

### 2、定义分类 Category 模型类

在 `model` 中新建文件 `category.js`

```js
import Http from "../utils/http";

/**
 * @author arry老师
 * @description 课程分类信息
 */
class Category {
  /**
   * 获取课程分类列表数据
   */
  static async getCategoryList() {
    // 发起网络请求
    return await Http.request({
      url: "/api/course/category",
    });
  }
}

export default Category;
```

在页面 `/pages/index/index.js` 页面逻辑中调用模型类中的方法，实现数据绑定和页面数据渲染

```js
// pages/index/index.js

// 导入 Category 类
import Category from "../../model/category";

Page({
  // 页面的初始数据
  data: {
    // 省略部分 ......

    // 分类数据
    categoryList: [],
  },

  // 省略部分 ......

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 省略部分 ....

    // 获取分类列表
    this._getCategoryList();
  },

  // 获取分类列表数据
  async _getCategoryList() {
    const categoryList = await Category.getCategoryList();
    this.setData({
      categoryList,
    });
  },
});
```

数据请求成功后，页面显示的效果

![image-20230426144439939](https://www.arryblog.com/assets/img/image-20230426144439939.7b460b27.png)

注：

我们会发现默认情况下，页面中显示的应该是全部分类数据的，但我们发现接口返回的数据中是没有全部这个选项的。

如果接口直接默认返回**全部**的选项，就会降低接口的通用性。因为，有些接口是不需要全部这个选项的，比如：发布信息的部分就不用全部这个选项。

> 最佳实践是：接口返回时不用全部选项，只需要我们前端做一下处理即可

### 3、插入默认全部选项



定义全部选项的方式有几种

- ①、在页面逻辑中将返回的数据，使用 JavaScript 原生数组的方法手动插入全部选项
- ②、在模型层中插入（推荐方式）

在模型类 `model/category.js` 中定义插入全部选项的方法

```js
import Http from "../utils/http";

/**
 * @author arry老师
 * @description 课程分类信息
 */
class Category {
  /**
   * 获取课程分类列表数据
   */
  static async getCategoryList() {
    // 发起网络请求
    return await Http.request({
      url: "/api/course/category",
    });
  }

  /**
   * 在课程分类列表数据前插入 全部选项
   */
  static async getCategoryListWithAll() {
    const categoryList = await Category.getCategoryList();
    // 在返回结果前插入 全部选项
    // unshift() 方法： 可向数组的开头添加一个或更多元素，并返回新的长度
    categoryList.unshift({ id: 0, name: "全部" });
    return categoryList;
  }
}

export default Category;
```

修改页面 `/pages/index/index.js` 中调用获取分类列表数据方法中的 调用方法

```js
// pages/index/index.js

// 导入 Category 类
import Category from "../../model/category";

Page({
  // 页面的初始数据
  data: {
    // 省略部分 ......

    // 分类数据
    categoryList: [],
  },

  // 省略部分 ......

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 省略部分 ....

    // 获取分类列表
    this._getCategoryList();
  },

  // 获取分类列表数据
  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll();
    this.setData({
      categoryList,
    });
  },
});
```

总结

我们发现刚刚在模型层中，重新定义一个插入全部选项的方法后，就可以起到很灵活的方法复用了。

我们是在定义的 `getCategoryListWithAll()` 方法中调用了原来的 `getCategoryList()` 获取分类数据列表的方法来实现数据定制，在页面逻辑中只需要修改调用的方法即可实现数据的切换。

> 这就是我们前面说到的：分离调用 与 内部实现，实现功能解耦的具体实现了。

## 二、课程预览组件封装 与 课程列表展示



是否需要将课程列表信息封装为自定义组件，可根据 [自定义组件封装 - 最佳实践总结 (opens new window)](http://localhost:8888/vip/applet/custom-component-practice.html#六、自定义组件封装-最佳实践总结)中讲到《自定义组件封装的本质》满足条件即可对 课程列表部分进行封装。

> 具体步骤如下

### 1、创建课程列表接口 Mock 数据



在 fastmock 中创建课程列表数据接口 `/api/course/list` 请求方式为 GET

```json
{
  "code": "0000",
  "data": {
    "pageNo": "@integer(1, 100)",
    "totalRecord": "@integer(100, 1000)",
    "pageSize": 10,
    "list|10": [
      {
        "id|+1": 1,
        "type|1-2": 1,
        "title": "@cword(5,20)",
        "description": "@csentence(20,50)",
        "price": "@float(10, 10000, 2, 2)",
        "createTime": "@datetime()",
        "salesVolume|1-100": 1,
        "score|1-5": 1,
        "category": {
          "id|+1": 1,
          "name": "@cword(2)"
        },
        "coverImage": {
          "id|+1": 1,
          "path": "@image('180x190', '#ffcc33', '#FFF', 'png', 'icoding')"
        },
        "publisher": {
          "id|+1": 1,
          "nickname": "@cword(2,4)",
          "avatar": "@image('81x81', '#7bd802', '#FFF', 'png', 'avatar')",
          "realname": "@cword(2,4)",
          "gender|0-2": 1
        }
      }
    ]
  },
  "desc": "成功"
}
```

### 2、课程列表数据绑定

在 `pages/index/index.js` 页面逻辑中，实现课程列表的数据绑定

```js
// pages/index/index.js

// 导入 Course 类
import Category from "../../model/category";
import Course from "../../model/course";
// 实例化 Course
const course = new Course();

Page({
  // 页面的初始数据
  data: {
    tabs: ["全部课程", "正在学", "基础入门", "架构"],
    categoryList: [],
    coursetList: [],
  },

  // 省略部分 ......

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化课程列表的数据
    this._getCourseList();
    // 初始化课程分类 swiper 数据
    this._getCategoryList();
  },

  // 获取课程列表数据 （以 _ 开头，表示页面的私有函数）
  async _getCourseList() {
    // 调用模型层中的方法
    const coursetList = await course.getCourseList(1, 10);
    // console.log(coursetList.list)
    this.setData({
      coursetList: coursetList.list,
    });
  },

  // 获取分类列表数据
  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll();
    this.setData({
      categoryList,
    });
  },
});
```

### 3、课程预览组件封装 - UI 结构



在项目根目录 `components` 文件夹中新建 `course-preview` 课程预览组件

在 `/components/course-preview/course-preview.wxml` 组件 UI 结构中

```html
<!--components/course-preview/course-preview.wxml-->
<view class="container">
  <view class="course-cover">
    <image
      class="course-cover-img"
      src="{{ course.coverImage.path }}"
      mode=""
    />
    <view class="type-tag"
      >{{ course.type === 1 ? "正在学" : "可选课程" }}</view
    >
  </view>
  <view class="course-info">
    <view class="row">
      <view class="course-title">{{ course.title }}</view>
      <view class="course-category">
        <i-icon name="Tag" size="30" color="#7bd802"></i-icon>
        <text class="course-categroy-name">{{ course.category.name }}</text>
      </view>
    </view>
    <view class="row">
      <view class="publisher">
        <image class="avatar-img" src="{{ course.publisher.avatar }}" mode="" />
        <view class="publisher-nickname">{{ course.publisher.nickname }}</view>
      </view>
      <view class="score">☆ {{ course.score }}</view>
    </view>
    <view class="row">
      <view class="create-time">{{ course.createTime }}</view>
    </view>
    <view class="row row-last">
      <view class="price">
        <text class="label">￥</text> {{ course.price }}
      </view>
      <view class="sales-volume">已售 {{ course.salesVolume }}</view>
    </view>
  </view>
</view>
```

### 4、课程预览组件封装 - CSS 样式

在`/components/course-preview/course-preview.wxss` 样式文件中

```css
/* components/course-preview/course-preview.wxss */
.container {
  display: flex;
  width: 100%;
  padding: 20rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  color: #333;
  background-color: #fff;
  margin: 20rpx 0;
}
.course-cover {
  position: relative;
}
.course-cover-img {
  width: 180rpx;
  height: 190rpx;
  border-radius: 10rpx;
}
.type-tag {
  background-color: #333;
  color: #fff;
  opacity: 0.7;
  width: max-content;
  font-size: 16rpx;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10rpx;
  z-index: 2;
  border-top-right-radius: 10rpx;
}
.course-info {
  width: 100%;
  margin-left: 30rpx;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.course-title {
  min-width: 100rpx;
  max-width: 340rpx;
  font-size: 32rpx;
  /* 溢出一行隐藏，超出的部分添加 省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.course-category {
  display: flex;
  align-items: center;
  margin-left: 20rpx;
}
.course-categroy-name {
  margin-left: 10rpx;
}
.publisher {
  display: flex;
  align-items: center;
}
.avatar-img {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.publisher-nickname {
  margin-left: 10rpx;
}
.score {
  color: tomato;
  margin-left: 30rpx;
}
.create-time,
.sales-volume {
  color: #888;
}
.price {
  font-size: 32rpx;
  color: tomato;
}
.label {
  font-size: 22rpx;
}
.row-last {
  justify-content: space-between;
  margin-bottom: 0;
}
```

### 5、课程预览组件 - 引入 icon 自定义组件

在`/components/course-preview/course-preview.json` 中

```json
{
  "component": true,
  "usingComponents": {
    "i-icon": "../../components/icon/icon"
  }
}
```

### 6、在页面配置中引入 course-preview 自定义组件

在 `/pages/index/index.json` 中

```json
{
  "usingComponents": {
    "i-tabs": "../../components/tabs/tabs",
    "i-icon": "../../components/icon/icon",
    "i-course-preview": "../../components/course-preview/course-preview"
  }
}
```

### 7、在页面结构中使用 course-preview 自定义组件

在`/pages/index/index.wxml` 页面结构中，循环遍历 `coursetList` ，并通过自定义属性传值

```html
<!--pages/index/index.wxml-->
<view class="container">
  <!-- 使用 tabs 自定义组件 -->
  <i-tabs tabs="{{ tabs }}" bind:change="handleChange">
    <!-- 省略部分 .... -->

    <view slot="panel">
      <!-- 循环遍历 coursetList -->
      <view wx:for="{{ coursetList }}" wx:key="id">
        <i-course-preview course="{{ item }}" />
      </view>
    </view>
  </i-tabs>
</view>
```

### 8、在自定义组件 course-preview 逻辑中，接收属性传值

在 `/components/course-preview/course-preview.js` 中

```js
// components/course-preview/course-preview.js
Component({
  // 组件的属性列表
  properties: {
    // 接收页面传值
    course: Object,
  },

  // 组件的初始数据
  data: {},

  // 组件的方法列表
  methods: {},
});
```

实现效果

![image-20230427024936814](https://www.arryblog.com/assets/img/image-20230427024936814.827f2ffe.png)

## 三、上拉触底、下拉刷新，加载更多数据



上拉触底 和 下拉刷新加载更多数据在移动端 和 小程序项目开发中是非常常见的功能需求，也是必备技能。同时，深入 JavaScript 面向对象的原理和机制在项目工程中的实践。

### 1、在页面配置文件中开启下拉刷新

在 `/pages/index/index.json` 配置文件中，开启下拉刷新并配置样式

```json
{
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dark"
}
```

### 2、在页面逻辑中使用页面生命周期函数

在 `pages/index/index.js` 页面逻辑中监听上拉触底、下拉刷新的生命周期函数

```js
// pages/index/index.js
Page({
  // 页面的初始数据
  data: {},

  // 省略部分 ......

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    console.log("下拉刷新");
  },

  // 页面上拉触底，加载更多
  onReachBottom() {
    console.log("上拉触底");
  },
});
```

### 3、重构课程列表接口 Mock 数据



在 fastmock 中重构课程列表数据接口 `/api/course/list` ，新增接收当前页码 和 每页数量参数，并判断最终返回数据

```json
{
    "code": "0000",
    "data": function({_req, Mock}){
      if(_req.query.page === '1' && _req.query.count === '5'){
        return Mock.mock({
        "page": function({_req, Mock}){
            return _req.query.page
        },
        "count": function({_req, Mock}){
            return _req.query.count
        },
        "totalRecord": 10,
        "list|5": [{
            "id|+1": 1,
            "type|1-2": 1,
            "title": "@cword(5,20)",
            "description": "@csentence(20,50)",
            "price": "@float(10, 10000, 2, 2)",
            "createTime": "@datetime()",
            "salesVolume|1-100": 1,
            "score|1-5": 1,
            "category": {
              "id|+1": 1,
              "name": "@cword(2)"
            },
            "coverImage": {
              "id|+1": 1,
              "path": "@image('180x190', '#ffcc33', '#FFF', 'png', 'icoding')"
            },
            "publisher": {
              "id|+1": 1,
              "nickname": "@cword(2,4)",
              "avatar": "@image('81x81', '#7bd802', '#FFF', 'png', 'avatar')",
              "realname": "@cword(2,4)",
              "gender|0-2": 1
            }
          }]
        })
      }else if(_req.query.page === '2' && _req.query.count === '5'){
        return Mock.mock({
        "page": function({_req, Mock}){
            return _req.query.page
        },
        "count": function({_req, Mock}){
            return _req.query.count
        },
        "totalRecord": 10,
        "list|5": [{
            "id|+1": 1,
            "type|1-2": 1,
            "title": "@cword(5,20)",
            "description": "@csentence(20,50)",
            "price": "@float(10, 10000, 2, 2)",
            "createTime": "@datetime()",
            "salesVolume|1-100": 1,
            "score|1-5": 1,
            "category": {
              "id|+1": 1,
              "name": "@cword(2)"
            },
            "coverImage": {
              "id|+1": 1,
              "path": "@image('180x190', '#ffcc33', '#FFF', 'png', 'icoding')"
            },
            "publisher": {
              "id|+1": 1,
              "nickname": "@cword(2,4)",
              "avatar": "@image('81x81', '#7bd802', '#FFF', 'png', 'avatar')",
              "realname": "@cword(2,4)",
              "gender|0-2": 1
            }
          }]
        })
      } else {
        return {
            "desc": "没有更多商品了哦  ！"
        }
      }
    },
    "desc": "成功"
  }
```

### 4、上拉触底加载下一页的数据



实现原理：每一次下拉触底都需要获取下一页的数据并且与当前页的数据合并

**实现思路**

- ①、直接调用模型类中获取课程列表的方法 `getCourseList(page,count)` 每次下拉刷新改变参数 page 当前页 和 count 每页数量 即可，通过这种方式可以实现，但不优雅 ！

> 我们之前学过代码的分层设计目的就是：分离调用 与 内部实现，实现功能解耦。
>
> 我们要讲究一个单一原则，当前课程模型它的功能就是为我们提供数据的，页面去调用这个模型时它不应该还需要去维护类似这种 page 和 count 的数据。都应该是模型内在去维护和管理的，它可以暴露一些方法让我们去定制化、去修改它。正常情况下在调用时不应该由页面去关心这些东西。
>
> 否则，每一个使用到课程列表的页面都要去维护一份 page 和 count 包括处理它的数据合并。其实，都应该是模型帮我们做的事情才对。

- ②、在模型中实现获取下一页的数据并且与当前页的数据合并

### 4.1、改造课程模型类 - 实现上拉触底逻辑



模型方法 `getCourseList(page,count,categoryId=null,type=null)` 中默认会接收 4 个参数，其中 categoryId 和 type 不是模型应该关心的部分，将 page 和 count 去掉，交给模型来维护（在模型类 Course 中定义 page 和 count 属性）

- 将 `getCourseList` 方法中的 page 和 count 参数以类属性的方式进行初始化声明
- 将网络请求返回的结果 与 上一次的结果做数据合并
- 判断边界，如果当前页码 等于 最大页码（总记录数/每页数量），已经没有数据了，即不再发起数据请求
- 当前页码 等于 最大页码，即还有数据。当前页码就 +1 ，当下一次发起请求时 page 就会等于 2
- 最后，将最终获取到的数据返回到页面中即可

在 `/model/course.js` 中

```js
import Http from "../utils/http";

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  page = 1; // 当前页码
  count = 5; // 每页数量
  data = []; // 保存上一次返回的结果
  hasMoreData = true; // 是否有更多的数据（默认为 true）

  /**
   * 分页获取课程列表
   * @param {Number} categoryId 分类 ID（可空）
   * @param {Number} type 课程类型（可空）
   */
  async getCourseList(categoryId = null, type = null) {
    console.log("获取课程列表");

    // 发起网络请求，获取数据
    const courseList = await Http.request({
      url: "/api/course/list",
      data: {
        page: this.page,
        count: this.count,
      },
    });
    // 将网络请求返回的结果 与 上一次的结果做数据合并
    this.data = this.data.concat(courseList.list);

    // 需要控制每一次请求的页码，这样才能实现加载下一页的效果（page 默认为 1，如果做修改，永远都是 1，就无法实现加载下一页的效果）
    // page 页码需要增加，条件是：当前已经请求的页码不是最后一页，才有必要 +1 ，如已是最后一页就不必再 +1 请求最后一页的数据

    // 判断当前页码是否等于 最大页码（总记录数/每页数量），如果相等说明已经没有数据了，就不需要再起发起网络请求了
    // ! 取反，表示还有更多数据
    this.hasMoreData = !(this.page === courseList.totalRecord / this.count);
    // 如果还有数据 当前页码就 +1 ，当下一次发起请求时 page 就会等于 2
    this.page++;

    // 将最终获取到的数据返回到页面中
    return this.data;
  }
}

export default Course;
```

### 4.2、在页面逻辑中，调用模型方法实现上拉触底

在 `pages/index/index.js` 中

```js
// pages/index/index.js

// 导入 Course 类
import Category from "../../model/category";
import Course from "../../model/course";
// 实例化 Course
const course = new Course();

Page({
  // 页面的初始数据
  data: {
    tabs: ["全部课程", "正在学", "基础入门", "架构"],
    // 分类数据
    categoryList: [],
    // 课程列表数据
    courseList: [],
  },

  // 省略部分 ......

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化课程列表
    this._getCourseList();
  },

  // 获取课程列表（以 _ 开头，表示页面私有函数）
  async _getCourseList() {
    // 初始化数据时，不用在传递参数（模型类中已经初始化了）
    const courseList = await course.getCourseList();
    // 打印验证
    // console.log(courseList)
    this.setData({
      // courseList.list 去掉 .list ，数据已经在模型类中重新组装了
      courseList: courseList,
    });
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    console.log("下拉刷新");
  },

  // 页面上拉触底，加载更多
  async onReachBottom() {
    console.log("上拉触底");

    // 优化不必要的网络请求（可在控制台 network 中查看）

    // 如果没有更多数据，直接 return，不再发起网络请求了
    if (!course.hasMoreData) {
      wx.showToast({
        title: "没有更多课程了 ...",
        icon: "none",
      });
      return;
    }

    // 获取下一页的数据 并且 和当前页的数据合并
    const courseList = await course.getCourseList();
    this.setData({
      courseList,
    });
  },
});
```

控制台 network 中查看网络请求

![image-20230428035458680](https://www.arryblog.com/assets/img/image-20230428035458680.92cf2aa6.png)

同时，在`/model/course.js`模型方法中做一个防御性判断，如果没有更多数据时，直接返回已有的数据

这样同时可以避免，我们在直接调用 `getCourseList()` 模型方法时，依然会产生 page 无效自增的问题

```js
import Http from "../utils/http";
class Course {
  // 省略部分 ....

  async getCourseList(categoryId = null, type = null) {
    console.log("获取课程列表");

    // 防御性判断，如果没有更多数据时，直接返回已有的数据
    if (!this.hasMoreData) {
      return this.data;
    }

    const courseList = await Http.request({
      url: "/api/course/list",
      data: {
        page: this.page,
        count: this.count,
      },
    });
    this.data = this.data.concat(courseList.list);
    this.hasMoreData = !(this.page === courseList.totalRecord / this.count);
    // 做防御性判断，可避免直接调用该模型方法时，依然会产生 page 无效自增的问题
    this.page++;
    return this.data;
  }
}
export default Course;
```

实现效果

![GIF-2023-4-28-3-29-51](https://www.arryblog.com/assets/img/GIF-2023-4-28-3-29-51.47e01247.gif)

注：

上拉触底的功能已经实现了，但如果接下来我们在实现下拉刷新时，就会发现问题。思路分析如下

- 在页面生命周期函数下拉刷新 `onPullDownRefresh()` 中实现数据加载，本质上与页面初始化数据类似，直接调用 `this._getCourseList()` 私有方法（本质上是调用模型方法），但直接刷新时加载的数据是不正常的。
- 因为我们当我们上拉触底时，每次加载数据时，模型类中的 page 属性是会变化的，如果我上拉触底 page 增加到了 2，这时候在下拉刷新直接请求模型方法 `getCourseList()` 直接请求的就是第 2 页的数据 + 前两页的数据；
- 但我们下拉刷新的目的是为了显示最新的数据，而不是包含之前请求过的数据

我们可能会想到再重新定义一个模型方法来单独实现下拉刷新，可以但不够优雅。之所以会导致这样问题，是因为在页面逻辑中 无论是下拉刷新 还是 上拉触底都是在使用 **同一个对象** 。注意是 **同一个对象** ，这个对象 course 是在页面中通过 new Course 模型类出来的实例对象，在 Course 模型类中是有 属性的。

Course 模型类的属性会随着我们的加载而改变，它是有状态的。正因为如此，如果在下拉刷新前做过上拉触底的操作时，这些属性状态改变了，但到了下拉刷新时这些属性并没有做重新的初始化，就会导致这个数据问题。

> 本质上这个问题由于面向对象的机制引起的：实例对象是有状态的，在不合适的时机里做了一次共享导致的。是否可以通过面向对象的风格来解决这个问题呢 ？答案是肯定的。

### 5、下拉刷新功能实现思路分析



解决以上的所说的问题，代码实现很简单，但背后涉及到的理论知识会非常多，这是重点。

在模型类 `Course` 中有一个 `getCourseList()` 方法，我们称这个方法为 **实例方法** 。还记我们之前定义 `Category` 分类模型类时，其中定义的都是 static 静态方法，但我们在 Course 类中的方法并没有使用 static 静态方法 而是 实例方法，就是为了后面实现分页加载。

因为分页加载需要将当前请求的数据与上一次请求的数据做一个合并，这时我们就需要将上一次加载的数据保存下来，上面实现中我们是在 当前 Course 类中定义 `data` 属性用来存放每一次请求的结果，并合并再重新赋值。同时，这个类中还有其他的属性 `page`、`count` 、`hasMoreData` 共 4 个，从语法上说我们叫它们是 类的属性，也称之为 **类的实例属性** 。但业务层面来说也称它们为 **模型实例的状态**，当每次加载时 `page++` 页码+1 ，这就是状态的改变，之所以把 `getCourseList()` 定义成一个实例方法，就是因为我们需要有一个 **状态管理**

但，在面向对象的机制中，当我们一个类被实例化后（即：new），其中属性的状态就会被重新初始化，如果类的方法中改变了属性的状态，且对象的实例没有被销毁 或 重新实例化。那么这个对象的状态就永远是改变后的样子，保持不变。如：我们执行几次上拉触底操作时 page 的值变成了 3 ，在这个实例被初始化或销毁之前 page 永远都等于 3，因此这就导致了后续做下拉刷新时不能直接复用 `getCourseList()` 方法。这就是导致上面所说问题的本质原因。

这时，我们肯定会想到，只需要在做下拉刷新之前，将该对象重新初始化，属性的状态就会变为初始化的状态，请求就不会出现问题了。同时还可以复用 `getCourseList()` 方法。思路没有，具体的实现方式就有很多种了 ！

### 5.1、解决下拉刷新 - 无法加载最新数据的问题



最简单的方式之一：在页面下拉刷新生命周期函数 `onPullDownRefresh(){}` 中直接先实例化一次 Course 模型类，再次调用模型的方法。

在页面 `pages/index/index.js` 逻辑下拉刷新生命周期函数中

```js
Page({
  // 省略部分 .....

  // 页面相关事件处理函数--监听用户下拉动作 - 下拉刷新
  onPullDownRefresh() {
    // 实例化模型类，会重新初始实例属性的状态
    const course = new Course();
    // 调用模型类，获取课程列表数据的方法
    course.getCourseList();
  },
});
```



以上方式的请求结果，肯定不会受到上拉触底加载更多影响的，通常情况下这种方式是可以实现的。但这种方式可以实现是建立在当前的业务场景下的，如果 Course 类中有很多属性，我只想初始化其中几个属性的状态值，不是所有的属性都全部初始化。

因此直接简单粗暴的直接 `new` 一个新的对象，就不一定适用了。因此我们会采用符合面向对象风格的方式来实现。

> 如下

在 `/model/course.js` 模型类中重新定义一个方法，专门用来做重置当前属性状态的工作

```js
import Http from "../utils/http";

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  page = 1; // 当前页码
  count = 5; // 每页数量
  data = []; // 保存上一次返回的结果
  hasMoreData = true; // 是否有更多的数据（默认为 true）

  /**
   * 分页获取课程列表
   * @param {Number} categoryId 分类 ID（可空）
   * @param {Number} type 课程类型（可空）
   */
  async getCourseList(categoryId = null, type = null) {
    // 省略部分 ......
  }

  // 重置当前类属性的状态，在页面做下拉刷新时，每次发起请求前，都先执行下该方法
  // 通过模型方法改变当前状态的好处：方法中还可以写其他的业务逻辑，可以定制化它；后期维护效率更高、同时方便复用
  reset() {
    this.page = 1;
    this.count = 5;
    this.data = [];
    this.hasMoreData = true;

    // 小技巧：本质上这种重置状态的方法是不需要返回值的
    // return 的好处是：在调用时代码更简洁，直接可以采用链式掉的方式实现（非常爽）
    // 返回当前对象的实例
    return this;
  }
}

export default Course;
```

### 5.2、实现下拉刷新



直接调用原来实例化的对象，不需要再重新 new ，直接调用模型类中定义的 `reset()` 方法即可

在页面 `pages/index/index.js` 逻辑下拉刷新生命周期函数中

```js
Page({
  // 省略部分 .....

  // 页面相关事件处理函数--监听用户下拉动作 - 下拉刷新
  async onPullDownRefresh() {
    console.log("下拉刷新");
    // const course = new Course()
    // course.getCourseList()

    // 使用链式调用的方式，获取新的课程列表数据
    const courseList = await course.reset().getCourseList();
    // 数据绑定
    this.setData({
      courseList,
    });

    // 手动关闭下拉刷新状态条（真机上不会自动关闭）
    wx.stopPullDownRefresh();
  },
});
```

在控制台 network 中查看上拉触底、下拉刷新前后的参数变化，观察是否有初始化，同时观察页面数据是否有变化。

![image-20230428054351779](https://www.arryblog.com/assets/img/image-20230428054351779.0cb9b921.png)

### 6、总结：面向对象在项目工程中的最佳实践



什么时候定义实例方法（使用时需要 new），什么时候定义静态方法

- 实例方法：当方法中需要使用到类的属性，并需要维护它们的状态时，就需要使用实例方法（实例对象，是有状态的）
- 静态方法：当方法的本身实现是不依赖类的属性（维护状态）时，就是用静态方法（在静态方法中，无法获取实例属性的值，这是静态方法的语法定义）

如果我们做过后端开发就会知道，绝大多数的后端工具类库全部都是静态方法。都是纯粹的实现，不依赖任何状态，因此都是静态方法。

这种设计也很正常，通常情况下一个类中会存在状态（属性），多数情况会出现在业务模型或业务操作中，而作为第三方的公共工具类库是不可能跟具体的业务耦合的。

### 6.1、调用静态方法 和 实例化方法的本质总结



- 调用静态方法本质上就是 **调用类方法**
- 实例化调用，本质上是在 **调用对象的方法**

> 调用类方法 和 调用对象的方法 区别

```js
// 实例化 Course 类
const course1 = new Course();
const course2 = new Course();
```

以上代码中

`course1` `course2` 两个对象区别

- 共同点：它们都是从 Course 类实例化而来，都是 Course 类的具体实例。
- 不同点：它们之间是不会互相干扰的，因为它们每一次实例化后都会产生不同的对象。

```js
// 实例化 Course 类
const course = new Course();
const course2 = new Course();

// 给第一个 course 对象中的 hasMoreData 属性重新赋值
course.hasMoreData = false;
// 输出第二个 course2 对象中的 hasMoreData 属性的值并没有改变，course 不会影响 course 2
// 虽说 course，course2 都是 Course 类的实例对象，但每次实例化后都会产生不同的实例对象
console.log(course2.hasMoreData); // true
```

> 这也是为什么 实例化调用，本质上是在 **调用对象的方法** 而不是 类方法

### 6.2、静态属性



我们知道 类里面除了有静态方法外，还有静态属性。通过之前的学习知道在静态方法中是无法访问到类里面定义的属性的。

> 但，在静态方法中是可以访问静态属性的

```js
class Course {
  // 静态属性
  static a = 1;

  // 静态方法
  static foo() {
    // 给静态属性重新赋值
    Course.a = 2;
    console.log(Course.a);
  }
}

// 调用静态方法
Course.foo(); // 2
```

注：

既然在静态方法中也是有办法访问到类的属性的，为什么还要来区分静态方法 和 实例方法 ？ 那我们把之前的代码中全部改成静态属性和静态方法的形式来实现可以吗 ？

> 确实可以 ！但在真实的项目中不会有人这样做。

因为，我们调用静态方法本质上就是 **调用类方法**，如果在页面上 给类的静态属性赋值 `Course.a` 其实是在操作 **类的属性** 而不是 对象的属性。这就会导致如果你在 5 个页面中使用了这个属性，但在其中一个页面对 a 属性的值做了修改，其余的 4 个页面都会跟着改变。相当于我们在操作一个全局共享的变量，这就是静态属性最大的问题。

原因是我们操作的是类本身，而不是一个具体的对象。如果操作的是具体的对象，在多个页面中使用了，每次用之前都 new 一次，你在任意页面中属性值的更改是不会影响其他页面的。除非说我本身就需要共享变量，但这样同样会出现一些莫名其妙的问题。

最佳实践：

在真实的项目中，这种会被全局共享的状态或属性是一定要慎用的，后期难以维护。因此在项目中不建议使用全局共享变量的。

- 项目中必须要用到全局共享变量才能解决的，一般会用 **全局状态管理** 来替代
- 在使用面向对象的机制过程中，不要让静态属性同时在多个地方被使用（实际开发中很少会定义静态属性，但静态方法会经常使用）

> 如果大家对面向对象的思想不能完全理解 或 不深入，我们可以先用起来，在慢慢熟悉

## 四、内容标签页、分类切换数据联动



在事件处理函数中调用对应模型类中获取课程列表的方法，同时需要在内容标签切换 和 点击课程分类选项时传递对应的参数，实现数据联动。

### 1、在模型方法中接收参数

在 `/model/course.js` 中接收课程分类 ID 和 课程类型索引

```js
import Http from "../utils/http";

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  // 省略部分 ....

  /**
   * 分页获取课程列表
   * @param {Number} categoryId 分类 ID（可空）
   * @param {Number} type 课程类型（可空）
   */
  async getCourseList(categoryId = null, type = null) {
    console.log("获取课程列表");

    // 省略部分 .....

    // 发起网络请求，获取数据
    const courseList = await Http.request({
      url: "/api/course/list",
      data: {
        page: this.page,
        count: this.count,
        // 增加 分类ID
        categoryId: categoryId || "",
        // 增加 课程类型
        type: type || "",
      },
    });

    // 省略部分 ....
  }

  // 省略部分 ....
}

export default Course;
```

### 2、实现事件函数逻辑



- 实现 tab 标签页切换事件`handleChange()` 函数逻辑
- 实现点击课程分类选项事件`handleCategoryChange()`函数逻辑
- 在调用`getCourseList()`模型方法中传递参数：分类 ID 和 课程类型索引，同时每次调用模型方法前，先重置实例属性状态，即调用 `reset()` 方法

在 `pages/index/index.js` 页面逻辑中

```js
// pages/index/index.js

// 导入 Course 类
import Category from "../../model/category";
import Course from "../../model/course";
// 实例化 Course 类
const course = new Course();

Page({
  // 页面的初始数据
  data: {
    tabs: ["全部课程", "正在学", "基础入门", "架构"],
    // 分类数据
    categoryList: [],
    // 课程列表数据
    courseList: [],
    tabIndex: 0,
    categoryId: 0,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化课程列表
    this._getCourseList();
    // 获取分类列表
    this._getCategoryList();
  },

  // 自定义事件 - tab 切换
  handleChange(e) {
    const index = e.detail.index;
    console.log(index);
    // 直接在data中挂载属性，只是内部使用的属性，可以这样的方式绑定
    this.data.tabIndex = index;
    // 点击/滑动 tab标签页时，调用获取课程列的方法
    this._getCourseList();
  },

  // 点击 swiper-item 的事件处理函数 - 课程分类
  handleCategoryChange(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    this.data.categoryId = id;
    // 点击课程分类时，调用获取课程列的方法
    this._getCourseList();
  },

  // 获取课程列表（以 _ 开头，表示页面私有函数）
  async _getCourseList() {
    console.log(this.data.categoryId, this.data.tabIndex);
    // -------------
    // 传递参数：分类ID 和 课程类型索引，同时每次调用模型方法前，先重置实例属性状态
    const courseList = await course
      .reset()
      .getCourseList(this.data.categoryId, this.data.tabIndex);
    this.setData({
      courseList: courseList,
    });
  },

  // 获取分类列表数据
  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll();
    this.setData({
      categoryList,
    });
  },

  // 页面相关事件处理函数--监听用户下拉动作 - 下拉刷新
  async onPullDownRefresh() {
    console.log("下拉刷新");
    this._getCourseList();
    // 手动关闭下拉刷新状态条（真机上不会自动关闭）
    wx.stopPullDownRefresh();
  },

  // 页面上拉触底，加载更多
  async onReachBottom() {
    console.log("上拉触底");
    // 如果没有更多数据，直接 return ，不再发起网络请求了
    if (!course.hasMoreData) {
      wx.showToast({
        title: "没有更多课程了 ...",
        icon: "none",
      });
      return;
    }
    // 获取下一页的数据 并且 和当前页的数据合并
    const courseList = await course.getCourseList(
      this.data.categoryId,
      this.data.tabIndex
    );
    // console.log(courseList)
    this.setData({
      courseList,
    });
  },
});
```

### 3、优化重复点击课程分类选项性能



当重复点击课程分类选项时，每次都会向服务端发送网路请求，需要优化

在 `pages/index/index.js` 页面逻辑 `handleCategoryChange()` 事件处理函数中，添加判断

```js
// 点击 swiper-item 的事件处理函数 - 课程分类
handleCategoryChange(e){
    const id = e.currentTarget.dataset.id
    // 判断如果分类ID === 传递过来的ID 说明已经点击过了，就直接 return ，后边的代码就不执行了
    if(this.data.categoryId === id) return

    this.data.categoryId = id
    // 点击课程分类时，调用获取课程列的方法
    this._getCourseList()
},
```

### 4、发现问题



当我们在 tab 标签页之间频繁的切换，它的数据渲染就会出错，同时还会产生很多不必要的网络请求。

会出现我们可能已经切换到了“基础入门”，可能数据停留在 “正在学” 的数据。同样课程分类也一样。虽说这样无聊的用户会比较少一些，不停在两个标签之间来回频繁的切换。

> 但类似这样问题在我们实际开发中经常会遇到，因此解决这个问题对我们来说非常有意义。
