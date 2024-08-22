---
title: JS 面向对象，代码分层架构设计实践 与 网络请求封装
date: 2023-10-28
sidebar: 'auto'
categories:
  - applet
tags:
  - applet
publish: true
---

# JS 面向对象，代码分层架构设计实践 与 网络请求封装

通过上一章节的学习，我们使用微信小程序自定义组件的能力，封装了一个 tabs 组件，经过这个过程我们解决了一个工程隐患，即代码重复实现的问题。

经历了发现问题，逐步解决问题的方式，学习到了微信小程序小程序项目开发中的实践技巧和解决方案。但我们项目中还没有实际的动态业务数据。

因此本节内容我们开始来实践如何获取业务数据 并 进行渲染的综合实践。从而衍生到复杂项目中应用 JavaScript 的面向对象 与 代码分层、架构设计等。同时会对 `wx.request` 进行二次封装实现统一响应、异常处理 以及 async/await 与 同步/异步编程等。再次升级微信小程序自定义组件的封装难度，进行新的自定义组件的封装实践。

> 搞清楚这些核心实践在实际的项目该如何应用，它的由来、既解决工程问题又能搞定面试相关

**JavaScript 面向对象 与 代码分层架构设计**

- 常规的实现方式
- 什么模型
- 模型的意义
- 软件工程最佳实践
- 分层设计的好处

**wx.request 二次封装，实现统一响应和异常处理**

- `wx.request` 封装
- 全局统一响应、异常处理
- 解决方案一：回调函数
- 回调地狱解决方案演进脉络
- 解决方案二：Promise 演进
- 小程序 API 的 Promise 化
- 终极解决方案：async/await

## 一、JavaScript 面向对象 与 代码分层架构设计

前面我们实现了内容标签页 tabs 自定义组件，接下来实现在内容标签的基础上加载不同的数据内容。

深入浅出面向对象在 JavaScript 中的实践，利用代码分层设计提高代码的可维护性 和 扩展性。

### 1、常规的实现方式

我们前面的学习中，是通过以下方式，发起网络请求来获取页面初始化的数据的

在 `pages/index/index.js` 页面逻辑中

```js
// pages/index/index.js
Page({
  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化课程列表
    this._getCourseList()

    // 执行其他函数 ......
  },

  // 获取课程列表（以 _ 开头，表示页面私有函数）
  _getCourseList() {
    // 发起网络请求，获取课程列表数据
    wx.request({
      // ......
    })
  },

  // 部分省略 ......
})
```

在企业项目开发中的最佳实践

- 页面数据初始化时，onLoad 生命周期函数作为一个总的入口，进入后会分别执行各种函数，不要在其中写任何业务逻辑。这样做对于项目维护性、代码的可读性都会非常高
- 对于函数的封装也有利于在其他函数中复用，因此不会在 onLoad 中直接发起网络请求
- 会重新定义一个页面的私有函数，并以 `_`开头，然后再 onLoad 中调用该函数
- 在 `_getCourseList()` 函数中同样也不可以直接发起网络请求 `wx.request()` ，同样是也是为了代码的可维护性、复用性的问题

> 我们前面都是通过以上代码的方式做了很多实践，就会发现在其他页面 或 方法中都会用到 `wx.request()` 并还需要传递很多参数，每次都会重复的书写。这样的方式会带来很多隐患

- 其中的 url 在多个方法中都会用到，一旦服务端 API 接口域名地址改变了，就需要把项目中所有的接口地址更新，是非常危险的，后期也很难维护
- 因此，需要对 `wx.request()` 这个部分进行再次封装，从而提高项目的可维护性

> 接下来我们就会通过建立**模型**方式，增加一层来实现。如下

### 2、什么是 模型

- 对某个业务或数据进行归纳总结，最终对外提供若干函数方法
- 每个对外提供的函数方法都有各自独立的作用

我们需要定义一个通用的模型，后续只要其他页面有需求时，直接调用某个方法，就能拿到我想要的数据

在项目的根目录中创建文件夹 `model`

```markdown
icoding-com-course
├─ model
│ ├─ course.js
```

在 `/mode/course.js` 中定义一个 `Course` 类

```js
/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  /**
   * 分页获取课程列表
   * @param {Number} page 页码
   * @param {Number} count 每页数量
   * @param {Number} categoryId 分类 ID（可为空）
   * @param {Number} type 课程类型（可为空）
   */
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')
    // 发起网络请求，获取数据
  }
}

export default Course
```

在 `pages/index/index.js` 页面逻辑 `_getCourseList()` 方法中调用模型层中的方法

```js
// pages/index/index.js

// 导入 Course 类
import Course from '../../mode/course'
// 实例化 Course
const course = new Course()

Page({
  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化课程列表
    this._getCourseList()

    // 执行其他函数 ......
  },

  // 获取课程列表（以 _ 开头，表示页面私有函数）
  _getCourseList() {
    // 调用模型层中的方法
    course.getCourseList(1, 10)
  },

  // 部分省略 ......
})
```

> 当页面加载时，就会成功调用模型层中的 `getCourseList()` 方法

### 3、模型的意义

用来分离调用 与 内部实现，实现功能解耦

### 3.1、传统的方式

![image-20230424193857074](data:image/png;base64,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)

注：

按照传统方式，我们直接在 JS 中发起 `wx.request` 网络请求 -> 获取到数据 -> 返回到 JS 中 -> 完成数据绑定，渲染到页面

### 3.2、改变调用链路

新增一个 Model 模型类（增加一层）

![image-20230424194136124](data:image/png;base64,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)

注：

在 JS 中调用 Model 模型类中的方法 -> 在模型类中再发起 `wx.request` 网络请求 -> 将获取到的数据返回给 Model 模型 -> 再从模型返回给 JS，同时还可有多个 JS （页面）调用模型层

这么做的目的就是为了解决上边提到的几个问题：

- 当接口发生改变时，如果有多个页面 JS 中使用了就都需要修改，通过增加一个 模型层就能很好的解决这个问题
- 将具体的请求封装到模型层中，JS 只跟模型做交互，我们还可以有多个 JS（页面）同时调用模型，如果一旦接口发生了改变，我们只需要修改模型层中的代码即可，模型暴露的通常都是模型的方法

也就是说，无论我们的接口怎么变，只需要在模型中做好适配即可，所有调用模型类的页面全部都不用做改动。这就叫做 “调用与实现的分离”，将可能存在变化的部分隔离起来，集中在一个地方。这与我们前面在自定义组件封装时提到的编程思想 “高类聚，低耦合” 类似。

把功能与功能之间的耦合度尽量的降低，又可以实现易于维护、并易于扩展的代码。这种在调用 与 实现中加一层的思想在软件工程中的实践是非常广泛的。

### 4、软件工程最佳实践

计算机科学领域的任何问题都可以通过增加一个间接的中间层来解决。

> 被用于各个项目工程中，如 Java 工程

- DO（Data Object）：与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。
- DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。
- BO（Business Object）：业务对象，由 Service 层输出的封装业务逻辑的对象。
- AO（Application Object）：应用对象，在 Web 层与 Service 层之间抽象的复用对象模型，极为贴近展示层，复用度不高。
- VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。
- Countroller：业务控制层，负责接收数据和请求，并且调用 Service 层实现这个业务逻辑。
- Service：服务层或业务层，封装 Dao 层的操作，使一个方法对外表现为实现一种功能
- Model：模型层

> 不同的项目分层设计都会不一样，尤其是在中大型项目中优势会体现的更明显，还会有更多其他的分层。做这么分层的目的和我们前面讲的都一样，就是为了 分离调用 与 内部实现，实现功能与功能之间的解耦。

注：

项目是否分层不是编程语言决定的，而是项目复杂度决定的。

### 5、分层设计的好处

- 高内聚：分层的设计可以简化系统设计，让不同的层专注做某一模块的事
- 低耦合：层与层之间通过接口 或 API 来交互，依赖方不用知道被依赖方的细节
- 复用：分层之后可以做到很高的复用
- 扩展性：分层架构可以让我们更容易做横向扩展

> 如果系统没有分层，当业务规模增加或流量增大时我们只能针对整体系统来做扩展。分层之后可以很方便的把一些模块抽离出来，独立成一个系统。

### 6、发起网络请求

通过上边的学习对于模型在工程实践中的意义有一些了解了。接下来就需要实现发起网络请求

在 `/mode/course.js` 模型层的 `getCourseList` 方法中发起网络请求

```js
/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  /**
   * 分页获取课程列表
   * @param {Number} page 页码
   * @param {Number} count 每页数量
   * @param {Number} categoryId 分类 ID（可为空）
   * @param {Number} type 课程类型（可为空）
   */
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')
    // 发起网络请求，获取数据
    wx.request({
      url: 'url',
    })
  }
}

export default Course
```

以上代码

我们设计了一个模型类确实解决了模型方法的复用问题，当如果我们在模型方法中直接发起一个 `wx.request` 请求的话就会产生另外一些工程上的问题

- ①、容易犯错：在工程实践中要 尽量避免提供犯错的机会。因为我们需要 request 中配置大量的参数，直接调用 `wx.request` 的方式对开发者不友好，很容易犯错。因此，需要将 `wx.request` 这个 API 做一层封装。
- ②、请求响应 和 异常处理，如果请求成功了还好，如果失败了就需要每次单独处理和判断（根据不同状态码）。无法做到 统一的响应和处理，如果封装后就可以集中处理

> 对`wx.request`API 的封装，再一次体现了调用与实现分离的思想，这网络请求这个部分进一步做了解耦。

## 二、wx.request 二次封装，实现统一响应和异常处理

我们前面封装了一个 Model 模型类，但发现如果直接在模型类中直接发起请求获取数据，后期会造成大量的重复代码，在真实的开发场景下，一般都会网络请求做二次封装。

通过封装可以把统一的响应和异常处理集中在一个函数中，可以大大提高使用效率以及降低维护成本。

- `wx.request` 二次封装，简化调用
- 全局统一响应、异常处理

### 1、wx.request 封装

在项目根目录 `utils` 文件夹中新建 `http.js` 文件用于封装 `wx.request`

```markdown
icoding-com-course
├─ utils
│ ├─ http.js
```

在 `/utils/http.js` 中

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {
  // 静态方法：
  // 当方法不需要使用到类的属性
  // 调用静态方法不需要实例化，直接使用 “类名.方法名” 即可直接调用方法了

  /**
   * 发起网络请求
   * @param {String} url 接口地址
   * @param {Object} data 服务器请求，需要传递参数
   * @param {String} method HTTP 请求方法 （默认值 GET）
   */
  static request(url, data, method = 'GET') {
    wx.request({
      url: APIConfig.baseUrl + url, // 将接口根地址单独管理配置，方便统一修改
      data,
      method,
      success: (res) => {
        console.log(res)
        // 全局的统一响应 和 异常处理

        // 请求成功

        // 请求失败
      },
    })
  }
}

export default Http
```

在项目根目录中新建 `config` 文件夹，并创建 `api.js` 文件

```markdown
icoding-com-course
├─ config
│ ├─ api.js
```

在 `/config/api.js` 中

```js
/**
 * @author arry老师
 * @description 服务器接口根地址（域名）
 */
const APIConfig = {
  baseUrl: 'https://www.fastmock.site/mock/3f688708823217b086a3a3f316e13307/icoding-course',
}

export default APIConfig
```

在模型层 `/mode/course.js` 中调用测试网络请求

```js
import Http from '../utils/http'

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  /**
   * 分页获取课程列表
   * @param {Number} page 页码
   * @param {Number} count 每页数量
   * @param {Number} categoryId 分类 ID（可为空）
   * @param {Number} type 课程类型（可为空）
   */
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')
    // 发起网络请求，获取数据
    Http.request({ url: '/api/course/list', data: { page, count } })
  }
}

export default Course
```

网络请求数据获取成功

![image-20230423045219701](https://www.arryblog.com/assets/img/image-20230423045219701.6e04bd81.png)

> 通过服务端返回的 `statusCode` 状态码来判断请求是成功 还是 出现异常了

### 2、全局统一响应、异常处理

通过返回结果中的 `statusCode` 判断状态码（请求成功 OR 失败）

- 请求成功：状态码正常是 200 ，其他如接口中返回有特殊的定义，按接口来即可
- 请求失败：根据接口文档中定义的状态码，来进行判断即可
- 其他公共的错误信息处理：接口错误信息一定要看清楚文档，哪些适合直接给用户展示，哪些不适合展示（仅开发者自己看的），一般情况会单独定义一个函数来处理。

> 如微信官方相关错误码，[点击查看接口文档 - 错误码字典(opens new window)](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_1.shtml)

其他公共的错误信息处理思路如下

- 在本地定义字典，将不适合对外展示的列举出来，当接口提示了对应的错误信息时，将接口返回的错误码和字典作比对
- 如果找到了，就不展示这条错误信息，而是用我们另外定义的错误信息作展示；
- 如果没有找到，就直接把接口返回的错误信息作展示

在 `/utils/http.js` 中定义

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {
  /**
   * 发起网络请求
   * @param {String} url 接口地址
   * @param {Object} data 服务器请求，需要传递参数
   * @param {String} method HTTP 请求方法 （默认值 GET）
   */
  static request({ url, data, method = 'GET' }) {
    wx.request({
      url: APIConfig.baseUrl + url, // 将接口根地址单独管理配置，方便统一修改
      data,
      method,
      success: (res) => {
        console.log(res)
        // 全局的统一响应 和 异常处理

        // 请求成功（测试异常处理时，先将其注释，由于我们该接口中没有返回大于 400 的状态码）
        if (res.statusCode < 400) {
          return res.data.data
        }

        // 请求失败（将接口中定义的相关失败的状态码，进行判断）
        if (res.statusCode === 401) {
          return
        }

        // 接口错误信息，一定要看清楚文档，哪些适合直接给用户展示，哪些不适合展示（仅开发者自己看的）
        // 正规的接口的文档都有会 错误码字典

        // 实现思路：
        // 在本地定义字典，将不适合对外展示的列举出来，当接口提示了对应的错误信息时，将接口返回的错误码和字典作比对。
        // 如果找到了，就不展示这条错误信息，而是用我们另外定义的错误信息作展示；
        // 如果没有找到，就直接把接口返回的错误信息作展示

        Http._showError(res.data.code, res.data.desc)
      },
    })
  }

  /**
   * 错误信息比对校验
   * @param {String} errorCode 接口返回的错误码
   * @param {String} message 接口返回的错误信息内容
   * @desc 演示时，需要在模型层 course.js 中，制造错误才可看到效果
   */
  static _showError(errorCode, message) {
    console.log(errorCode)
    // 弹窗展示给用户的信息
    let title = ''
    // 在对象中通过 [] 的方式进行匹配，如果匹配成功直接返回对应的值，如失败 返回 undefined
    const errorMessage = exceptionMessage[errorCode]
    console.log(errorMessage)

    // 判断如果返回的不是一个有效的字符串（undefined），就需要取其他的展示信息
    // 优先取字典中的内容，如果没有取原始接口中返回的内容，还没有就直接 “未知异常”
    title = errorMessage || message || '未知异常'

    // desc: {page: "page 不能为空",count: "count 不能为空"}
    // 如果有多个参数都异常的话，会返回一个对象
    // Object.values(title) 在对象上找到的可枚举属性值，返回一个数组
    // .join(';') 把数组中的所有元素转换一个字符串,通过指定的分隔符进行分隔的
    title = typeof title === 'object' ? Object.values(title).join(';') : title

    // 在页面中展示信息
    wx.showToast({
      title,
      icon: 'none',
      duration: 3000,
    })
  }
}

export default Http
```

在项目根目录中新建错误码字典

```markdown
icoding-com-course
├─ config
│ ├─ exception-message.js
```

在`/config/exception-message.js` 中定义字典，将不适合对外展示的列举出来

```js
/**
 * @author arry老师
 * @description 不适合对外展示的错误码字典（在本地定义字典，将不适合对外展示的列举出来）
 */
const exceptionMessage = {
  '0002': '这是测试信息',
}

export default exceptionMessage
```

注：

演示异常处理时，需要在模型层 `course.js` 的网络请求中故意制造错误才可看到效果。如：将 url 中的路径修改错误，再测试

### 3、在模型类中调用封装好的 request 请求

在模型类 `mode/course.js` 中调用 `Http` 类中封装好的 `wx.request` 请求，并接收返回值在控制台打印，输出请求返回结果

```js
import Http from '../utils/http'

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  /**
   * 分页获取课程列表
   * @param {Number} page 页码
   * @param {Number} count 每页数量
   * @param {Number} categoryId 分类 ID（可为空）
   * @param {Number} type 课程类型（可为空）
   */
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')
    // 发起网络请求，获取数据
    const res = Http.request({
      url: '/api/course/list',
      data: { page, count },
    })
    // 输出结果 为 undefined
    console.log(res)
  }
}

export default Course
```

注：

当我们在模型类中打印输出返回结果为 `undefined` 这是为什么呢 ？

但我们在 `Http` 类中打印输出 `res` 请求结果时是有正确返回请求结果的。却在模型类 `Course` 中没有拿到接口返回的数据，而输出了 `undefined`

**原因是：**

在 `Http` 类的 request 方法中 success 返回的请求结果是在一个回调函数中，当请求成功时不能通过 return 取到值的。

> 那怎么才能拿到值呢 ？否则封装网络请求就么有意义了 ！

### 5、解决方法 一 ：回调函数

刚刚我们通过网络请求进行简单的封装，但我们测试时发现根本无法拿到接口返回的数据 ！我们接下来就来解决这个问题

我们将最终通过之前学过的 JavaScript 中非常重要的一个机制 async/await 来解决此类问题，这其中就会涉及同步编程和异步编程的概念。

> 一起来看下从 回调函数 -> Promise -> async/await 整个演进过程，从而来了解如何告别回调地狱的问题

### 5.1、什么是回调地狱

我们可以看到代码中通过 `wx.request` 请求接口，请求成功后 success 中是通过回调函数的方式来接收请求的结果。因为 `wx.request` 本身就是微信小程序提供的一个异步 API ，当我们要去接收一个 异步 API 结果时，只能用另外一个函数传递给它，并在这个 API 的内部去调用函数来获取这种结果的目的。

> 这种回调函数 调用 回调函数的方式 就会形成回调地狱

```js
// 导入 API 接口根地址
import APIConfig from "../config/api"
import exceptionMessage from "../config/exception-message"

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {

    /**
     * 发起网络请求
     * @param {String} url 接口地址
     * @param {Object} data 服务器请求，需要传递参数
     * @param {String} method HTTP 请求方法 （默认值 GET）
     */
    static request({url,data,method='GET'}){

        // wx.request 本身就是微信小程序提供的一个异步API ，当我们要去接收一个 异步 API 结果时，只能用另外一个函数传递给它，并在这个API 的内部去调用函数来获取这种结果的目的
        wx.request({
          url: APIConfig.baseUrl + url,
          data,
          method,
          success: (res) => {
              // console.log(res)

              // 请求成功
              if(res.statusCode < 400
                  // 当请求成功时不能通过 return 取到值的
                  return res.data.data
                  console.log(res)
              }

              // 请求失败
              if(res.statusCode === 401){
                  return
              }

              // 错误信息比对校验
              Http._showError(res.data.code,res.data.desc)
          }
        })
    }

	// 省略部分 ......

}

export default Http
```

### 5.2、同步编程

同步编程的代码是按顺序执行的，下一行代码是建立在上一行代码执行完成的基础上才会执行，这就是同步编程。

如果我们的应用程序中所有的代码都是同步执行的就会有问题，一旦上一行代码的执行时间很长（如：20s） 就意味着在这条代码执行完毕之前，后边的代码永远都不会执行。这样就会大大的降低程序的执行效率 ！因此就有了异步编程的概念 。

### 5.3、异步编程

如果我们要执行三条编程语句：①、②、③

在异步编程中它的执行顺序就改变了，当执行了第 ① 条语句后，第 ② 语句并不会等待第 ① 条语句执行完毕后才执行。而是执行了第 ① 条语句，就立马执行第 ② 条语句，同样第 ③ 条也同样

它们是并发执行的，通过这样的执行方式，我们的应用程序就可以提高工作效率了。问题来了，它异步执行后结果去哪里了 ！我们还能够像原来一样用同步的方式把它的结果拿到吗 ？当然不行 ！

> 这也是为什么我们上边的代码中，直接通过 `return res.data.data` 在模型类中是取不到值的

```js
success: (res) => {
  if (res.statusCode < 400) {
    // 当请求成功时不能通过 return 取到值的
    return res.data.data
  }
}
```

通过一张图来分析一下，整个异步执行的结果

![image-20230424194723482](https://www.arryblog.com/assets/img/image-20230424194723482.cad89c6b.png)

执行过程分析

- 首先调用了一个微信的 `wx.requesst` API ->
- 传递一个回调函数接收 API 返回的结果 ->
- 接下来执行一个打印操作 `console.log(res)` 执行打印结果，这里肯定是拿不到结果的，因为它是分叉出去的 。

> 在这种异步编程中，如何才能实现在原来代码中去拿到异步函数的执行结果呢

![image-20230424195120892](https://www.arryblog.com/assets/img/image-20230424195120892.975e9504.png)

执行过程分析

- 调用 微信的 `wx.requesst` API ->
- 定义一个回调函数 A 接收请求的结果 -> 再定义一个回调函数 B
- 然后在 回调函数 A 中写一行逻辑，即：当我们的结果拿到后，反过来去调用回调函数 B，同时把回调函数 A 之前拿到的结果传递给回调函数 B，这样就可以实现拿到回调函数 A 的请求结果了

> 这样的思路，就是用回调函数调用回调函数的方式，当然是可以取到值的。代码实现如下

在模型层 `mode/course.js` 的 `Http.request()` 中增加一个参数

```js
import Http from '../utils/http'

class Course {
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')

    // 在调用 request 方法时，在增加一个参数（函数式的参数）
    // 函数中接收参数 res 表示，异步回调中的结果，我们要在 Http.request 类库中反过来调用传递进来的函数
    const res = Http.request({ url: '/api/course/list', data: { page, count } }, function (res) {
      console.log(res)
    })
    // console.log(res)
  }
}

export default Course
```

在 `/utils/http.js` 函数 `request()` 方法中增加 参数

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'

class Http {
  // 增加接收回调函数的参数 callback 回调函数
  static request({ url, data, method = 'GET' }, callback) {
    wx.request({
      url: APIConfig.baseUrl + url,
      data,
      method,
      success: (res) => {
        // 请求成功
        if (res.statusCode < 400) {
          // 调用 callback 回调函数，并将返回结果 res.data.data 传入
          callback(res.data.data)
          //   return res.data.data
        }

        // 请求失败
        if (res.statusCode === 401) {
          return
        }

        Http._showError(res.data.code, res.data.desc)
      },
    })
  }

  // 省略部分 ......
}

export default Http
```

以上代码中

可以看到在模型类中确实打印出了请求结果，我们通过让原本一个异步 API 的回调函数中，反过来在调用我们传递进去的参数（函数），在这里函数中就可以拿到异步的结果 ！

就有一种魔法打败魔法的感觉了，这种回调函数 调用 回调函数的方式也是最原始解决异步编程计算结果的一种解决方案。

### 6、回调地狱解决方案演进脉络

以上我们通过回调函数 调用 回调函数的解决方案的问题就是 **回调地狱**。我们上边实现的代码仅仅只是嵌套了一层还好问题不大，如果需求更复杂了，嵌套层级多了就是真正变成了回调地狱，我们在 JavaScript 部分已经详细学过了。这里就不再赘述 ！

这也是为什么随着前端应用越来多、越来越广泛之后，回调地狱的问题就被 JavaScript 社区摆上了台面。因为这个问题已经严重影响了我们在编写一些复杂项目时候的开发和维护效率。

针对回调地狱，社区首先提出了 Promise ，也是 JavaScript 中非常重要的知识点、也是应用非常广泛点。虽然它并没有完全解决我们的回调地狱问题，但它是一个非常有用的东西。包括我们后边会讲到的最终的解决方案，也是建立在 Promise 基础上的，它是实现的一个很重要的前提。

![image-20230424195318441](data:image/png;base64,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)

### 6.1、使用 Promise 解决地狱回调

在 ES6 中推出了一种新的机制 Promise ，它的初衷就是为了解决回调地狱的问题。

在 `/utils/http.js` 中 我们不希望像原来，给 success 属性传递一个函数的方式来接收值，更新希望通过下边的方式来实现，定义个变量 res 直接就能拿到结果，Promise 的出现让这个愿景成为了可能

不过它本身对这个的解决就不是特别的彻底，后边还是需要 `.then` 还需要接收一个函数的方式（还是嵌套了函数）

```js
// 伪代码
const res = wx
  .request()
  .then((res) => {})
  .then()
  .then()
  .then()

// ...... 一路 .then 下去将原来回调函数的方式 变成了 链式调用的方式，比原来的嵌套方式的回调地狱得到了很好的优化
```

注：

Promise 的链式调用从客观来看，确实是有很大的帮助和提升的。但这种解决方案并不完美，原因也是出在链式调用的方式上。

虽然 Promise 的出现确实让我们原来的嵌套方式调用变得相对扁平了，但还需要我们去维护这个调用链的。如果调用成功还好，我们知道 Promise 是有两种状态结果的（成功和异常）以上的代码是成功的状态。

> 异常如下

```js
// 伪代码
const res = wx
  .request()
  .then((res) => {})
  .catch()
  .then()
  .catch()
  .then()
  .catch()

  // 出现异常后
  .catch()

// 每一个都捕获异常的话，就会变成这样的链式调用
```

注：

如果代码一旦复杂了，依然是非常丑陋的，并且难以维护这个调用链。因此就有最终的解决方案。

> 虽然，我们在项目中不会直接使用 Promise 的链式调用来开发，但 毕竟 Promise 是基础，我们接下来先将 `wx.request` 请求 Promise 化

### 6.2、小程序 API 的 Promise 化

回调地狱确实在实际工程中是一个大问题，在项目开发中就需要提前考虑到，面试题也爱考。

在小程序早期，很多 API 都是异步的 API ，它并没有提供原生支持 Promise 的 API，那时候我们都是自己封装一个函数 或 第三方库来转换一下，将小程序原生的异步 API 转成一个 Promise 对象，最后再使用 async/await 最终解决方案（后边会讲）来实现一个以同步代码编写的方式调用异步的函数，这样的最终实现结果。

这样的方式，维持了很长的一段时间，直到后来小程序在某一版本把官方提供的 API 中，绝大多数的异步 API 都提供了一种原生 Promise 的 支持。这样就大大简化了我们的开发工作，而且变得更友好了。

但，很不幸的是由于底层的实现机制问题，小程序的原生 API 中是有几个不支持 Promise 化的，还需要我们开发者自己手动转化，其中一个就是 网络请求 `wx.request`

> 详细查阅，[微信小程序官方文档 - 异步 API 返回 Promise(opens new window)](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html#API)

在项目根目录 `utils` 文件夹中，新建一个 `wx.js` 文件，封装一个函数用来处理原生不支持 Promise 的官方 API

在 `/utils/wx.js` 中

```js
/**
 * 转换原生不支持 Promise 的官方API
 * @param {String} method 需要调用的小程序官方 API
 * @param {Object} options 调用时需要传递的参数
 */
export default function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = (err) => {
      reject(err)
    }
    wx[method](options)
  })
}
```

在 `/utils/http.js` 中使用封装好的 `wxToPromise` 函数

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {
  /**
   * 发起网络请求
   * @param {String} url 接口地址
   * @param {Object} data 服务器请求，需要传递参数
   * @param {String} method HTTP 请求方法 （默认值 GET）
   */
  static request({ url, data, method = 'GET' }, callback) {
    // 调用封装好的 wxToPromise 函数，使用 Promise 方式返回结果
    const res = wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method,
    })

    res.then((res) => {
      console.log(res)
    })

    // wx.request({
    //   url: APIConfig.baseUrl + url, // 将接口根地址单独管理配置，方便统一修改
    //   data,
    //   method,
    //   success: (res) => {
    //     //   console.log(res)
    //       // 全局的统一响应 和 异常处理

    //       // 请求成功（测试异常处理时，先将其注释，由于我们该接口中没有返回大于 400 的状态码）
    //       if(res.statusCode < 400){
    //           // 调用 callback 回调函数，并将返回结果 res.data.data 传入
    //           callback(res.data.data)
    //         //   return res.data.data
    //       }

    //       // 请求失败（将接口中定义的相关失败的状态码，进行判断）
    //       if(res.statusCode === 401){
    //           return
    //       }

    //       // 接口错误信息，一定要看清楚文档，哪些适合直接给用户展示，哪些不适合展示（仅开发者自己看的）
    //       // 正规的接口的文档都有会 错误码字典

    //       // 实现思路：
    //       // 在本地定义字典，将不适合对外展示的列举出来，当接口提示了对应的错误信息时，将接口返回的错误码和字典作比对。
    //       // 如果找到了，就不展示这条错误信息，而是用我们另外定义的错误信息作展示；
    //       // 如果没有找到，就直接把接口返回的错误信息作展示

    //       Http._showError(res.data.code,res.data.desc)
    //   }
    // })
  }

  // 部分省略 ......
}

export default Http
```

> 通过调用 `wxToPromise` 函数，以上代码，测试控制台打印信息，成功返回值

### 6.3、改造完善 Http 类中的方法

现在就可以在 `res.then()` 中直接 return ，这个值也会被包装成一个 Promise 对象

在 `/utils/http.js` 中

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {
  /**
   * 发起网络请求
   * @param {String} url 接口地址
   * @param {Object} data 服务器请求，需要传递参数
   * @param {String} method HTTP 请求方法 （默认值 GET）
   */
  static request({ url, data, method = 'GET' }) {
    // 去掉 callback 参数

    // 调用封装好的 wxToPromise 函数，使用 Promise 方式返回结果
    const res = wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method,
    })

    // 同时，需要将整个成功的对象返回出去
    return res.then((res) => {
      if (res.statusCode < 400) {
        // callback(res.data.data)
        // 直接 return 也会被包装成一个 Promise 的对象，并且是一个成功的状态，外界调用时就能获取到值
        return res.data.data
      }
      // 请求失败（将接口中定义的相关失败的状态码，进行判断）
      if (res.statusCode === 401) {
        return
      }
      // 错误信息比对校验
      Http._showError(res.data.code, res.data.desc)
    })
  }

  // 省略部分 .......
}

export default Http
```

在模型类`mode/course.js`中调用封装好的 request 方法，即可返回一个 Promise 对象

```js
import Http from '../utils/http'

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  /**
   * 分页获取课程列表
   * @param {Number} page 页码
   * @param {Number} count 每页数量
   * @param {Number} categoryId 分类 ID（可为空）
   * @param {Number} type 课程类型（可为空）
   */
  getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')

    // 发起网络请求，获取数据
    // 去掉原来的函数式的参数，直接输出就能返回 Promise 对象
    const result = Http.request({
      url: '/api/course/list',
      data: { page, count },
    })

    // 获取 Promise 对象
    console.log(result)

    // 获取 Promise 成功的值
    result.then((res) => {
      console.log(res)
    })
    // .catch(error=>{ // 失败
    //   console.log(error)
    // })

    // 返回到页面中，做数据绑定即可，但依然非常的麻烦
    // 需要再次以 Promise 对象的方式返回，一路 .then 的方式取值
    // return result.then()
  }
}

export default Course
```

注：

以上代码中，我们发现返回 Promise 对象，但依然非常的麻烦，效率非常低下

### 7、async/await 终极解决方案

后来社区又出了一个方法 `Generator` 生成器一个全新的机制，可以在函数中实现暂停，且暂停的控制是交给调用者的。也就是说我们在`Generator` 函数中定义很多方法（如我们刚刚写的异步函数），通过暂停拿到值， 继续下一步 ！就很好的解决我们的问题，同时在书写是也可以像写同步方法一样去调用异步函数。

**但很遗憾有两点：**

- 微信小程序不支持 `Generator`
- `Generator` 生成器在实际的项目工程中，最后演变成了一般只会在偏底层的组件、函数类库、框架中才会使用这个机制，在应用层面的开发很少会使用 Generator

> 一方面 Generator 在使用还是有开发成本的，很多概念不是很好理解，如果在应用层使用对开发者的要求就非常高了，这也是为什么小程序不支持 Generator 生成器的机制也是非常明智的。

### 7.1、async/await 的本质

在经历了各种方案之间的斗争之后，终于产生了终极的解决方案 async/await ，它本身不是一个全新的技术，也没有新的知识点。

它的本质就是 Promise + Generator 这两个解决方案的结合体，它是一个语法糖。

**也就是说：** 在实际的开发中，只需要通过简单的 两个关键字（async/await）就能实现 Promise + Generator 这两个解决方案的结合。从而完美的实现异步调用的问题。

![image-20230424195638577](https://www.arryblog.com/assets/img/image-20230424195638577.3595c2af.png)

注：

有了 `async/await` 后，接下来只需要在包含有异步操作的函数或方法上，声明 `async` 关键字，通过这个声明就说明，这个函数或方法中是存在异步调用的

然后，在每一个异步调用的前面加上 `await` ，这个 await 顾名思义就是等待，当我们执行当前方法时，需要先等待它的结果返回（之前我们执行完该方法就会执行下面的代码，即异步执行）因此就不需要后面的 `.then` 了，就可以像写同步代码一样，对于返回值就可以直接拿来用。

### 7.2、通过 async/await 改造完善 Http 类中的方法

在 `/utils/http.js` 中

```js
// 导入 API 接口根地址
import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

/**
 * @author arry老师
 * @description 网络请求
 */
class Http {
  // 在包含有异步操作的函数上，声明 async 关键词，说明这个函数或方法中是存在异步调用的
  static async request({ url, data, method = 'GET' }) {
    // 异步调用的前面加上 await 等待它的结果返回
    const res = await wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method,
    })

    // 上边通过 await 关键字等待后，直接返回结果，下边就可以直接使用了，就跟同步代码一样的用法
    // return res.then((res)=>{

    if (res.statusCode < 400) {
      // 直接 return 也会被包装成一个 Promise 的对象
      return res.data.data
    }
    // 请求失败（将接口中定义的相关失败的状态码，进行判断）
    if (res.statusCode === 401) {
      return
    }
    // 错误信息比对校验
    Http._showError(res.data.code, res.data.desc)

    // })
  }

  // 省略部分 ......
}

export default Http
```

在模型类 `mode/course.js` 中，添加 async/await

如果我们在模型类中需要调用该方法，并对结果进行计算或运算时，同样是需要在调用的方法上加上 `async` 关键字声明，同样 `await` 等待异步函数的执行结果

```js
import Http from '../utils/http'

/**
 * @author arry老师
 * @description 课程相关
 */
class Course {
  // 在使用异步函数时，需要在调用的方法上加上 async 关键字声明
  async getCourseList(page, count, categoryId = null, type = null) {
    console.log('获取课程列表')

    // 同样需要添加，await 关键字，等待异步函数的执行结果
    const result = await Http.request({
      url: '/api/course/list',
      data: { page, count },
    })

    // 同样可以取到值
    console.log(result)
    // 再返回到页面中，做数据绑定即可
    return result
  }
}

export default Course
```

### 8、在页面逻辑中调用模型类中的方法

在 `/pages/index/index.js` 中

```js
// pages/index/index.js

Page({
  // 页面的初始数据
  data: {},

  // 省略部分 .......

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 初始化课程列表
    this._getCourseList()

    // 执行其他函数 ......
  },

  // 添加 async 关键字
  async _getCourseList() {
    // 添加 await 关键字
    const courseList = await course.getCourseList(1, 10)
    // 打印验证
    console.log(courseList)
  },
})
```

以上代码

实现了通过 async、await 机制解决回调地狱的问题，这个机制是在我们真实开发场景中必备的能力，一定要掌握。

同时，从理论层面理解回调地狱解决方案的演进过程也是非常重要的，在面试中也非常喜欢问这个意义是什么 ？ 本质上 async/await 就是为了解决原有的 回调函数、Promise、Generator 这几种方案的不完美，它本身是一种语法糖（结合了 Promise + Generator 这两种机制）

因此，我们在实际开发中，需要重点关注的是：回调函数、Promise、async/await 这三个，Generator 在应用层面会用的比较少。

> 当然我们上边封装的这些请求库还不是很完满，会根据项目需求再持续迭代优化
