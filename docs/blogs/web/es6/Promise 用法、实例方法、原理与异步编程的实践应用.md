---
title: Promise 用法、实例方法、原理与异步编程的实践应用
date: 2023-10-30
sidebar: 'auto'
categories:
  - ES6
tags:
  - ES6
publish: true
---

# Promise 用法、实例方法、原理与异步编程的实践应用

本节内容我们开始学习 ES6 中的 Promise 异步编程的解决方案。比传统的解决方案：回调函数和事件，更合理和更强大。

它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

## 一、认识 Promise

深入浅出 Promise 是什么，什么时候才使用 Promise

### 1、什么是 Promise

Promise 是异步编程的一种解决方案，关于异步编程的解决方案，在之前我们学习过，回调函数是解决异步操作的一种解决方案，但是他存在一些缺陷，而这些缺陷 Promise 可以完美解决。

> 接下来我们通过一个案例来讲解，Promise 和回调函数相比他的优势在哪里

**异步加载一张图片**

通常在一张图片加载完成后，我们需要做相关的操作，这时候我们可以把相关的操作写入到回调函数中，等图片加载完成后，就会执行回调函数中的代码，做相关的操作

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url, resolve, reject) {
  let img = new Image()
  img.onload = function () {
    resolve(img) // 加载成功，调用回调函数执行下一步操作
  }
  img.onerror = function () {
    reject(new Error('图片加载失败'))
  }
  img.src = url
}

const url =
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/10-29/011138ab5ee2314108.png'
// 预加载一张图片
preloadImage(url, (data) => {
  document.body.appendChild(data)
})
```

**逐步加载 5 张图片，并插入到页面中**

> 在一张图片加载成功后，插入到页面，然后再加载下一张，共加载 5 张

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url, resolve, reject) {
  let img = new Image()
  img.onload = function () {
    resolve(img) // 加载成功，调用回调函数执行下一步操作
  }
  img.onerror = function () {
    reject(new Error('图片加载失败'))
  }
  img.src = url
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]
preloadImage(urls[0], (data) => {
  document.body.appendChild(data)
  preloadImage(urls[1], (data) => {
    document.body.appendChild(data)
    preloadImage(urls[2], (data) => {
      document.body.appendChild(data)
      preloadImage(urls[3], (data) => {
        document.body.appendChild(data)
        preloadImage(urls[4], (data) => {
          document.body.appendChild(data)
        })
      })
    })
  })
})
```

总结

通过上面的案例我们可以看到，如果只是加载 1 张图片，那回调函数的方式能很方便的帮我们实现。如果需要加载多张，就会出现**层层嵌套**的回调函数（回调地狱`callback hell`）的问题也就出来。

如果需要加载的图片再多一些，那嵌套的级别会更深，不利于后期代码的维护，同时这种层层嵌套的写法也不符合正常代码的书写逻辑，而`Promise`就可以解决这个问题。

### 2、什么时候使用 Promise

Promise 一般用来解决**层层嵌套**的回调函数（回调地狱 `callback hell`）的问题

> 我们用 Promise 来改造下上面的回调函数的写法，代码如下

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = function () {
      resolve(img) // 加载成功，调用回调函数执行下一步操作
    }
    img.onerror = function () {
      reject(new Error('图片加载失败'))
    }
    img.src = url
  })
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]

preloadImage(urls[0])
  .then((data) => {
    document.body.appendChild(data)
    return preloadImage(urls[1])
  })
  .then((data) => {
    document.body.appendChild(data)
    return preloadImage(urls[2])
  })
  .then((data) => {
    document.body.appendChild(data)
    return preloadImage(urls[3])
  })
  .then((data) => {
    document.body.appendChild(data)
    return preloadImage(urls[4])
  })
  .then((data) => {
    document.body.appendChild(data)
  })
```

注：

Promise 改造后的代码是按正常的代码书写逻辑，从上往下来书写，解决了“回调地狱 callback hell”问题。**他使的异步操作能以同步操作的流程表达出来**。

## 二、Promise 的基本用法

深入浅出 Promise 的用法和实践

### 1、 创建 Promise 实例

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

- 构造函数接受一个函数作为参数，该函数有两个参数，分别是`resolve`和`reject`

```js
const promise = new Promise(function (resolve, reject) {})
// 参数resolve和reject是两个形参，名字可自定义，为了更符合语义，建议使用resolve和reject来命名
```

- Promise 对象一旦创建，就会立即执行构造函数参数中的函数（我们称此函数为执行器 executor 函数）

```js
const promise = new Promise(function (resolve, reject) {
  console.log('立马执行')
})
// 输入结果： 立马执行
```

- resolve 和 reject 参数分别为两个函数，异步操作成功时调用`resolve`，败失时调用`reject`

```js
const p1 = new Promise(function (resolve, reject) {
  // 创建图片对象
  let img = new Image()
  // 图片加载成功触发onload事件
  img.onload = function () {
    resolve(img) // 图片加载成功，就把图片作为参数传出去,对外如何接收数据并操作，后面讲
  }
  // 图片加载失败，触发onerror事件
  img.onerror = function () {
    reject(new Error('图片加载失败')) // 图片加载失败，把错误对象传出去
  }
  // 给图片添加地址，就会发送http请求下载图片
  img.src = 'http://www.xxx.com'
})
```

注：

- 异步操作成功时，我们通常需要把成功的结果传出去，再做后需操作
- 异步操作失败时，我们通常需要把错误对象传递出去，知道问题出在哪里。

> 至于对外如何拿到成功或失败后传递的数据，后面会讲到 promise 的 then 方法，then 方法可以处理

### 2、Promise 的三种状态

Promise 代表一种异步操作，他有三种状态，分别代表异步操作的三种状态

- 待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）：意味着操作成功完成。
- 已拒绝（rejected）：意味着操作失败。

> 通过查看 Promise 对象身上的`[[PromiseState]]`属性，可以了解 Promise 的状态

- 刚创建一个 Promise 对象，他的的状态为 `pending` 待定或正在进行中。

```js
const promise = new Promise(function (resolve, reject) {})
console.log(promise)
```

![image-20230214154531587](https://www.arryblog.com/assets/img/image-20230214154531587.827daf03.png)

- 调用`resolve`函数，Promise 的状态由 `pending` （待定）变为`fulfilled` （成功）

```js
const promise = new Promise(function (resolve, reject) {
  resolve() // 调用resolve，promise状态由pending变为fulfilled
})
console.log(promise)
```

![image-20230214155217074](https://www.arryblog.com/assets/img/image-20230214155217074.c4ec47a9.png)

- 调用`reject`函数，Promise 的状态由`pending`（待定）变为 `rejected`（失败）

```js
const promise = new Promise(function (resolve, reject) {
  reject() // 调用resolve，promise状态由pending变为rejected
})
console.log(promise)
```

![image-20230214155821345](https://www.arryblog.com/assets/img/image-20230214155821345.ec1bc668.png)

### 3、注意事项

- Promise 的状态一旦由 `pending`变为`rejected`或`fulfilled`，就不可能再发生改变了。

```js
const promise = new Promise(function (resolve, reject) {
  reject() // 调用resolve，promise状态由pending变为rejected
  resolve() // 调用无效，因为promise的状态在上面已经变为rejected了，不可能再改变了
})
console.log(promise)
```

![image-20230214160112748](https://www.arryblog.com/assets/img/image-20230214160112748.1a904848.png)

- Promise 内部抛出错误，promise 的状态也会由`pending`变为`rejected`

```js
const p1 = new Promise(function (resolve, reject) {
  throw new Error('抛出错误')
})
console.log(p1)
```

![image-20230214175228849](https://www.arryblog.com/assets/img/image-20230214175228849.2f4fb2dd.png)

### 4、then 方法的简单应用

then 方法的作用是为 Promise 实例添加状态改变时的回调函数。then 方法中有两个参数，这两个参数分别为两个回调函数。

- 第一个回调函数在 Promise 的状态变为`fulfilled`的时调用，表示成功的回调。
- 第二个回调函数在 Promise 的状态变为`rejected`的时候调用，表示失败的回调。

```js
const promise = new Promise(function (resolve, reject) {
  resolve() // Promise状态由pending-->fulfilled ,调用then方法的第一个回调函数
})

promise.then(
  // promise状态变为fulfilled时，调第一个回调
  (data) => {
    console.log('成功的回调')
  },
  // promise状态变为rejected时，调第二个回调
  (data) => {
    console.log('失败的回调')
  },
)
// 打印结果： 成功的回调
const promise = new Promise(function (resolve, reject) {
  reject() // Promise状态由pending-->rejected 调用then方法的第二个回调函数
})

promise.then(
  (data) => {
    console.log('成功的回调')
  },
  (data) => {
    console.log('失败的回调')
  },
)
// 打印结果： 失败的回调
```

### 5、resolve 和 reject 参数

resolve 和 reject 参数分别为两个函数，这两个函数的作用分别用来在异步操作成功和失败时调用。

| 参数         | 作用                                                                                                                                                                                                                    |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resolve 函数 | 当异步操作成功时调用`resolve`函数，他可以将 Promise 的状态由 pending 变为 fulfilled，同时将异步操作的结果作为 resolve 函数的参数传递出去。 resolve 函数通常带一个参数，其参数会被传递到 then 方法的第一个回调函数的参数 |
| reject 函数  | 当异步操作失败时调用`reject`函数，他可以将 Promise 的状态由 pending 变为 rejected，同时将异步操作的结果作为 rejected 函数的参数传递出去。 reject 函数通常带一个参数，其参数会被传递到 then 方法的第二个回调函数的参数   |

**代码演示**

```js
const promise = new Promise(function (resolve, reject) {
  resolve(1) // 1被传递给then方法的第一个回调函数的参数data.
})
promise.then(
  (data) => {
    console.log('成功', data) // 成功 1
  },
  (data) => {
    console.log('失败', data)
  },
)
// 打印结果：成功 1
const promise = new Promise(function (resolve, reject) {
  reject(0) // 0被传递给then方法的第二个回调函数的参数data.
  // reject(new Error('操作失败'))
})
promise.then(
  (data) => {
    console.log('成功', data) // 成功 1
  },
  (data) => {
    console.log('失败', data)
  },
)
// 打印结果： 失败 0
// 打印结果： 失败 Error: 操作失败
```

温馨提示：

- `reject`主要是用来在异步操作失败时调用，所以他的参数通常是一个错误对象
- reject 和 resolve 函数的参数，保存在 promise 对象的`[[PromiseResult]]` 属性中，我们称为 promise 实例对象的返回值

```js
const promise = new Promise((resolve, reject) => {
  resolve('hello')
})
console.log(promise)
```

![image-20230216152812088](https://www.arryblog.com/assets/img/image-20230216152812088.af64858b.png)

### 6、resolve 和 reject 函数的参数

resolve 函数的参数为不同类型时，其传递给 then 方法的值会有所不同

> 主要分以下四种情况

| 参数类型                                    | 说明                                                                                                                                                    |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 不带任何参数                                | then 方法第一个回调函数接受到的参数值为 undefined                                                                                                       |
| 一般类型（非 thenable 对象和 Promise 对象） | then 方法第一个回调函数接收到的参数值为这个参数                                                                                                         |
| Promise 实例                                | 该参数的状态和返回值决定了后面 then 的回调函数和参数值                                                                                                  |
| thenable 对象                               | 先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，改变 Promise 的状态。该 Promise 的状态决定了后面 then 方法的回调和参数值 |

- 不带任何参数

```js
const p = new Promise((resolve, reject) => {
  resolve()
})
p.then((data) => {
  console.log(data) // undefined
})
```

- 参数为一般类型

```js
const p = new Promise((resolve, reject) => {
  resolve('hello')
})
p.then((data) => {
  console.log(data) // hello
})
```

- 参数是一个 Promise 对象

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    reject(2)
  }, 3000)
})
const p2 = new Promise(function (resolve, reject) {
  resolve(p1)
})

p2.then(
  (data) => {
    console.log('成功', data)
  },
  (data) => {
    console.log('失败', data)
  },
)
// 打印结果： 失败 2
```

代码解析：

- 上面代码中，p1 和 p2 都是 promise 对象，但 p2 的 resolve 方法将 p1 作为参数，此时 p2 的状态和返回结果都由 p1 来决定。
- 在 3s 后 p1 的状态改变，此时才会执行下面 then 方法中的回调，由于 p1 中调用的是`reject(2)`，其状态为失败，所以最后调 then 的第二个回调，其参数 data=2。最后在控制台输出 ：“失败 2”
- thenable 对象

> 所谓的 thenable 对象是指：具有 then 方法的对象，如下面这个对象

```js
let thenable = {
  name: 'icoding',
  b: 2,
  then(resolve, reject) {
    resolve(this.name)
  },
}
```

如果 then 回调函数中的返回的值为 thenable 对象，会先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，改变 Promise 的状态。

> 该 Promise 的状态决定了后面 then 方法的回调和参数值

```js
let thenable = {
  name: 'icoding',
  b: 2,
  then(resolve, reject) {
    resolve(this.name)
  },
}
const p = new Promise((resolve, reject) => {
  resolve(thenable)
})

p.then((data) => {
  console.log(data) // hello
})
```

resolve 方法的参数为 thenable 对象时，其内部实现大致如下

```js
// 模拟Promise的resolve方法，其参数为thenable对象时
function resolve(obj) {
  return new Promise((resolve, reject) => {
    obj.then(resolve, reject)
  })
}
resolve(thenable).then((data) => {
  console.log(data)
})
```

**reject 函数的参数**

`reject`函数的参数不管是什么，其都会直接向后传递给到 then 的回调函数

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 3000)
})
const p2 = new Promise(function (resolve, reject) {
  // resolve(p1);
  reject(p1)
})

p2.then(
  (data) => {
    console.log('成功', data)
  },
  (data) => {
    console.log('失败', data)
  },
)
```

![image-20230214170306569](https://www.arryblog.com/assets/img/image-20230214170306569.57a49cd0.png)

- 由于 resolve 方法和 reject 方法并不能阻止后需代码的运行，所以我们通常会在他们前面加上 return

```js
const p = new Promise((resolve, reject) => {
  resolve(3)
  console.log(2)
})
// 正常而言，resolve后面是不希望出现代码，也不需要执行。 以下写法更好

const p = new Promise((resolve, reject) => {
  return resolve(3)
  console.log(2)
})
```

## 三、Promise 的实例方法

深入浅出 Promise 实例的方法：`then()` ，`catch()`，`finally()` 方法

| 实例方法 | 说明                                                                                                       |
| :------- | :--------------------------------------------------------------------------------------------------------- |
| then     | 为 promise 添加被兑现和被拒绝状态的回调函数，并返回一个新的 promise 对象                                   |
| catch    | 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise                                            |
| finally  | 为 promise 添加一个回调函数，不管 promise 状态是兑现还是拒绝，都会凋用这个回调函数，并返回一个新的 promise |

### 1、then 方法

then 方法的作用是为 promise 添加被兑现和被拒绝状态的回调函数，并返回一个新的 promise 对象

> 接下来，我们从以下几个方面深入学习 then 方法

- 什么时候执行
- then 方法的简写
- then 方法执行后的返回值
- then 方法向后传值

### 1.1 、then 方法什么时候执行

- then 方法相当于一个**异步方法**（是一个微任务），内部的回调函数并不会立即执行，只有 Promise 的状态改变之后，没有同步代码需要执行时，才会执行。

> 不过它会优先于`setTimeOut`（宏任务）方法前执行

- Promise 状态由 pending -> fulfilled（成功） 时，执行 then 的第一个回调函数
- Promise 状态由 pending -> rejected（失败） 时，执行 then 的第二个回调函数

```js
setTimeout(function () {
  console.log(1)
}, 0)

const promise = new Promise(function (resolve, reject) {
  console.log(3)
  resolve() // 调用then方法的第一个回调函数
})

promise.then(
  (data) => {
    console.log('成功的回调')
  },
  (data) => {
    console.log('失败的回调')
  },
)

console.log(2)
```

![image-20230214162855150](https://www.arryblog.com/assets/img/image-20230214162855150.5af072dd.png)

- Promise 的状态在 3 秒后，才开始改变，则 then 函数中的回调需要在 3s 后才执行

```js
setTimeout(function () {
  console.log(1)
}, 0)

const promise = new Promise(function (resolve, reject) {
  console.log(3)
  setTimeout(function () {
    resolve() // 3秒后调用then方法的第一个回调函数
  }, 3000)
})

promise.then(
  (data) => {
    console.log('成功的回调')
  },
  (data) => {
    console.log('失败的回调')
  },
)

console.log(2)
```

![img](https://www.arryblog.com/assets/img/image-20230214162831545.1be925a1.png)

### 1.2、then 方法的简写

then 方法的两个回调函数并不一定都要写

- 如果只需要处理成功的回调，那只写一个回调就好
- 如果只需要处理失败的回调，第一个回调函数可以用 null 代替

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1)
})

// 只需要处理成功的回调
p1.then((data) => {
  console.log('成功', data)
})
const p1 = new Promise(function (resolve, reject) {
  reject(1)
})
// 只需要处理失败的回调
p1.then(null, (data) => {
  console.log('失败', data)
})
```

### 1.3 、then 方法返回值

- then 方法的返回值为一个新的 Promise 对象，所以 then 方法支持链式调用

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1)
})

p1.then().then().then()
```

- then 方法的返回值默认为一个新的**成功**的 Promise 对象。

```js
const p1 = new Promise(function (resolve, reject) {
  reject(1) // 状态为失败
})

p1.then(null, () => {
  console.log('a') // 返回一个新的成功状态的Promise
})
  .then(() => {
    console.log(2) // 返回一个新的成功状态的Promise
  })
  .then(() => {
    console.log(3) // 返回一个新的成功状态的Promise
  })
```

提问：

如何才能返回一个失败状态的 Promise 对象呢 ？

> 后边会给出答案

### 1.4 、then 方法向后传值

then 方法回调函数的返回值，会传递给下一个 then 方法的回调函数的参数。不过参数的类型不同，其结果会有所不同。

> then 方法向后传值，分以下四种情况

| return 返回值                               | 说明                                                                                                                                                    |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 不带任何参数                                | then 方法第一个回调函数接受到的参数值为 undefined                                                                                                       |
| 一般类型（非 thenable 对象和 Promise 对象） | then 方法第一个回调函数接收到的参数值为这个参数                                                                                                         |
| Promise 实例                                | 该参数的状态和返回值决定了后面 then 的回调函数和参数值                                                                                                  |
| thenable 对象                               | 先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，改变 Promise 的状态。该 Promise 的状态决定了后面 then 方法的回调和参数值 |

- 不带任何参数

```js
const p = new Promise(function (resolve, reject) {
  resolve(3)
})
p.then((data) => {
  console.log(data) // 3
}).then((data) => {
  console.log(data) // undefined
})
```

- 一般类型

> then 方法回调函数的返回值，值会传递给下一个 then 方法的回调函数的参数

```js
const p1 = new Promise(function (resolve, reject) {
  reject(1)
})

p1.then(null, (data) => {
  console.log(data) // 1
  // 相当于返回 new Promise((resolve,reject)=>resolve(new Error("错误")))
  return new Error('错误')
})
  .then((data) => {
    console.log(data) // Error: 错误
    // 相当于返回 new Promise((resolve,reject)=>resolve(3))
    return 3
  })
  .then((data) => {
    console.log(data) // 3
    // 相当于返回 new Promise((resolve,reject)=>resolve({ a: 1 }))
    return { a: 1 }
  })
  .then((data) => {
    console.log(data) // { a: 1 }
    // 相当于返回 new Promise((resolve,reject)=>resolve(undefined))
  })
  .then((data) => {
    console.log(data) // undefined
  })
```

- Promise 对象

注：

- 如果 then 的回调函数的返回值为 Promise 对象，则后面的 then 的回调和参数的值是由这个 Promise 对象的状态和返回值决定。
- 如果这个 Promise 对象的状态为成功的，则执行后面 then 的第一个回调，回调中的参数为这个 Promise 的返回值
- 如果这个 Promise 对象的状态为失败的，则执行后面 then 的第二个回调，回调中的参数为这个 Promise 的返回值

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1)
})

const p2 = new Promise(function (resolve, reject) {
  reject(2)
})

const p3 = new Promise(function (resolve, reject) {
  resolve(3)
})

p1.then((data) => {
  console.log('第一个then', data) // 第一个then 1
  return p2
})
  .then(
    (data) => {
      console.log('第二个then', data)
    },
    (err) => {
      console.log('第二个then错误', err) // 第二个then错误 2
      return p3
    },
  )
  .then((data) => {
    console.log('第三个then', data) // 第三个then 3
  })
```

![image-20230214194426479](https://www.arryblog.com/assets/img/image-20230214194426479.16bd06e7.png)

代码解析

- 上面 p1 的状态为成功态，则执行 then 的第一个回调，输出：“第一个 then 1”，其返回值为 p2。
- p2 的状态决定了下一个 then 的回调，p2 的状态为失败，则执行 then 的第二个回调，输出：“第二个 then 2”，其返回值为 p3
- p3 的状态决定了他的下一个 then、p3 的状态为成功，则执行 then 的第一个回调，输出：“第三个 then 3”

- thenable 对象

先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，改变 Promise 的状态。该 Promise 的状态决定了后面 then 方法的回调和参数值

```js
const p = new Promise(function (resolve, reject) {
  resolve(3)
})
p.then((data) => {
  console.log(data) // 3
  // 返回值为thenable对象
  return {
    then(resolve, reject) {
      resolve('清心')
    },
  }
}).then((data) => {
  console.log(data) // 清心
})
```

### 1.5 、then 返回失败的 Promise

如果 then 需要返回一个失败的 Promise 对象，有以下三种实现方式：

- then 方法回调函数的返回值改为一个失败的 Promise 对象
- then 方法的回调函数中主动抛出错误
- then 方法的回调函数返回一个 thenable 对象，thenable 对象的的 then 中调用的是 reject 方法

> **提示：** 除了以上三种情况下，其它情况下 then 的返回的都是成功的 Promise 对象

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1)
})
p1.then(() => {
  throw new Error(1) // 抛出错误
  // return new Promise((resolve,reject)=>reject(1))  返回一个失败的Promise对象
  // return {then(resolve,reject){reject(1)}}  // 返回一个thenable对象，对象的then方法中调用的是reject方法
}).then(
  (data) => {
    console.log('成功', data)
  },
  (err) => {
    console.log('失败', err)
  },
)
// 打印结果：失败 Error: 1
```

### 1.6、测试题

```js
const p = new Promise((resolve, reject) => {
  resolve(1) // Promise状态由 pending--->fulfilled
})

p.then((data) => {
  console.log(data) // 1
  // 没有返回值
  // 相当于then返回了一个成功的Promise,Promise的返回值 undefined
  // new Promise((resolve,reject)=>{resolve()})
})
  .then((data) => {
    console.log(data) // undefined
    return 3
    // 相当于then返回了一个成世的Promise，Promise的返回值是3
    // new Promise((resolve,reject)=>resolve(3))
  })
  .then((data) => {
    console.log(data) // 3
    return new Promise((resolve, reject) => reject(4))
  })
  .then(null, (err) => {
    console.log(err) // 4
    return {
      then(resolve, reject) {
        resolve('清心')
      },
    }
    // new Promise((resolve,reject)=> resolve("清心");)
  })
  .then((data) => {
    console.log(data) // 清心
  })
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、catch 方法

重点了解：`catch()` 方法有什么用 和 基本用法。

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误（失败）时的回调函数。

```js
const p1 = new Promise(function (resolve, reject) {
  reject(1)
})
p1.then(null, (err) => {
  console.log(err)
})

// 上面写法，改成catch方法如下
p1.catch((err) => {
  console.log(err)
})
```

- 如果 catch 方法前没有错误，就不会执行 catch 方法，其会自动被忽略

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1) // 成功回调
})
p1.then((data) => {
  console.log(data) // 1
  return 3
}) // 前面代码没有抛出错误，则此处的catch会被忽略，并不会执行
  .catch((err) => {
    console.log('错误')
    return 4
  })
  .then((data) => {
    // 些处的data为第一个then方法中的返回值
    console.log(data) // 3
  })
```

- catch 方法的返回值和向后传值原理与 then 方法完全一样。catch 方法默认返回一个成功的 Promise 对象，其回调函的返回值会向下传递给下一个 then 或 catch 方法的回调函数的参数

```js
const p1 = new Promise(function (resolve, reject) {
  resolve(1)
})
p1.then((data) => {
  console.log(data) // 1
  return new Promise((resolve, reject) => reject(4)) // 返回一个失败状态的Promise
})
  .catch((err) => {
    console.log(err) // 4
    return 3
  })
  .then((data) => {
    console.log(data) //3
    throw new Error('2') // 主动抛出错误
  })
  .catch((err) => {
    console.log(err) // Error:2
  })
```

如果 Promise 的失败状态在 then 方法中没有调用回调函数处理，则错误会向下传递，直到遇到 then 的第二个回调或 catch 方法才会被处理，如果一直没有处理，则最后会将错误抛出来

> `reject()`函数，相当于抛出错误

```js
const p1 = new Promise(function (resolve, reject) {
  reject(1)
})
// p1状态为失败,then中没有处理,则向下传递
p1.then((data) => {
  console.log('成功的回调', data)
}) // then中没有处理,向下传递
  .then((data) => {
    console.log('不会执行2', data)
  }) // then中没有处理,向下传递
  .then((data) => {
    console.log('不会执行2', data)
  }) // 遇到catch被处理
  .catch((err) => {
    console.log('失败的回调', err)
  })
// 打印结果：失败的回调 1
```

代码解析：

代码从上往下执行，p1 的状态为失败（相当于抛出一个错误），第一个 then 中没有书写第二个回调来处理这个错误，所以错误会向下传递，往后的第二个，三个 then 方法中都没有书写第二个回调来处理错误

> 所以错误继续向下传递，遇到 catch 后，被处理，然后打印输出结果："失败的回调 1"

**注意**

在错误被抛出后和错误被处理之间的多个 then 方法中的第一个回调会被忽略。

### 2.1、catch 方法有什么好处理呢 ？

- 如果只需要处理失败（错误）的回调，则可以用直调用 catch 方法就好，不用调用 then 方法。
- 如果成功与失败的回调都要处理，则可以采用链式调用写法，相当更直观，简洁。

```js
const p1 = new Promise(function (resolve, reject) {
  // resolve(1);
  reject(2)
})

p1.then((data) => {
  console.log('成功的回调', data)
}).catch((err) => {
  console.log('失败的回调', err)
})
// 打印结果： 失败的回调 2
```

### 2.2、总结

`catch()` 方法主要用来捕获它前面的错误

在实际开发中，一般总是建议，Promise 对象后面要跟 `catch()` 方法（一个或多个 catch 方法），这样可以处理 Promise 内部发生的错误。

**注：**

catch 方法主要是用来捕获它前面的错误，promise 抛出一个错误，就被`catch()`方法指定的回调函数捕获，如果没有错误，就不会执行 catch 方法。

### 3、finally 方法

需要重点了解：`finally()`方法什么时候执行，本质是什么 ?

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。在实际开发中用得不多，仅做了解。

```js
const p1 = new Promise(function (resolve, reject) {
  // resolve("成功");
  reject('失败')
})

p1.finally((data) => {
  console.log('执行了')
  console.log(data)
})
```

注：

finally 方法并不会接受任何参数，也不处理错误，只是用来执行 finally 方法回调函数中的代码。他常用来处理不关异步操作成功还是失败，最后都要做的操作。

> 比如：常见的数据库操作，不关最后操作成功还是失败，都需要关闭数据库。

## 四、Promise 的实践和应用

异步任务的执行分为并发和继发

**继发**

- 定义：只指等上一个异步操作结束之后，才开始指行下一个异步任务
- 应用：一般在执行异步任务时需要上一个异步操作的结果，只有等上一个异步任务得到结果后，才能执行下一个异步任务，就需要采用继发模式。

**并发**

- 定义：多个异步任务同时触发执行
- 应用：如果多个异步任务之间没有依赖关系，各自可以独立进行的时候，应该让他们同时触发，就需要采用并发模式

### 1、Promise 实现继发加载 5 张图片

```js
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.style.cssText = 'width:200px'
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      // reject(new Error("图片地址错误"));
      reject(null)
    }
    img.src = url
  })
}

let urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/04-23/1339186404a1276893.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/10-29/011138ab5ee2314108.png',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
]
preloadImage(urls[0])
  .then((data) => {
    if (data) document.body.appendChild(data)
    // 加载第二张
    return preloadImage(urls[1])
  })
  .catch(() => {})
  .then((data) => {
    if (data) document.body.appendChild(data)
    // 加载第三张
    return preloadImage(urls[2])
  })
  .catch(() => {})
  .then((data) => {
    if (data) document.body.appendChild(data)
    // 加载第四张
    return preloadImage(urls[3])
  })
  .catch(() => {})
  .then((data) => {
    if (data) document.body.appendChild(data)
    // 加载第五张
    return preloadImage(urls[4])
  })
  .catch(() => {})
  .then((data) => {
    if (data) document.body.appendChild(data)
  })
```

注：

上面代码中每个 then 方法后面都跟了一个 catch，主要是为了防止图片加载失败后，其错误没有处理而造成后面的 then 方法直接被忽略，从而造成后面的图片都没有办法加载。

### 2、Promise 实现并发加载 5 张图片

```js
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.style.cssText = 'width:200px'
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      // reject(new Error("图片地址错误"));
      reject(null)
    }
    img.src = url
  })
}

let urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/04-23/1339186404a1276893.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/10-29/011138ab5ee2314108.png',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
]
preloadImage(urls[0])
  .then((data) => {
    document.body.appendChild(data)
  })
  .catch(() => {})
preloadImage(urls[1])
  .then((data) => {
    document.body.appendChild(data)
  })
  .catch(() => {})
preloadImage(urls[2])
  .then((data) => {
    document.body.appendChild(data)
  })
  .catch(() => {})
preloadImage(urls[3])
  .then((data) => {
    document.body.appendChild(data)
  })
  .catch(() => {})
preloadImage(urls[4])
  .then((data) => {
    document.body.appendChild(data)
  })
  .catch(() => {})
```

### 3、Generator 函数实现继发加载 5 张图片

实现的基本思想

通过 Generator 函数生成的遍历器对象的 next 方法的参数，把外部的值传到 Generator 函数内部来，然后做相关操作，最后再接着执行下一步的异步操作。

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url) {
  let img = new Image()
  img.style.cssText = 'width:200px;margin:10px'
  img.onload = function () {
    it.next(img)
  }
  img.onerror = function () {
    it.next(null)
  }

  img.src = url
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]
/*
function* gen() {
    let img = yield preloadImage(urls[0]);
    if (img) document.body.appendChild(img);
    img = yield preloadImage(urls[1]);
    if (img) document.body.appendChild(img);
    img = yield preloadImage(urls[2]);
    if (img) document.body.appendChild(img);
    img = yield preloadImage(urls[3]);
    if (img) document.body.appendChild(img);
    img = yield preloadImage(urls[4]);
    if (img) document.body.appendChild(img);
}
*/
/* 上面Generator函数可以简写成下面形式 */
function* gen() {
  let img
  for (let v of urls) {
    img = yield preloadImage(v)
    if (img) document.body.appendChild(img)
  }
}
// 生成遍历器
const it = gen()
it.next() // 开始执行代码
```

优化版

以下形式的写法，前提时，每一次加载图片成功后，操作的内容是一样的

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url) {
  let img = new Image()
  img.style.cssText = 'width:200px;margin:10px'
  img.onload = function () {
    document.body.appendChild(img)
    it.next()
  }
  img.onerror = function () {
    it.next(null) // 图片加载失败，不处理，往后继续加载新图片
  }
  img.src = url
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]

function* gen() {
  yield preloadImage(urls[0])
  yield preloadImage(urls[1])
  yield preloadImage(urls[2])
  yield preloadImage(urls[3])
  yield preloadImage(urls[4])
}

// 生成遍历器
const it = gen()
it.next() // 开始执行代码
```

### 4、Generator 函数实现并发加载 5 张图片

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url) {
  let img = new Image()
  img.style.cssText = 'width:200px;margin:10px'
  img.onload = function () {
    document.body.appendChild(img)
  }
  img.onerror = function () {}
  img.src = url
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]

function* gen() {
  yield preloadImage(urls[0])
  yield preloadImage(urls[1])
  yield preloadImage(urls[2])
  yield preloadImage(urls[3])
  yield preloadImage(urls[4])
}

// 生成遍历器
const it = gen()
it.next() // 加载第1张图片
it.next() // 加载第2张图片
it.next() // 加载第3张图片
it.next() // 加载第4张图片
it.next() // 加载第5张图片
```

Generator 函数与自动化管理

```js
// 预加载一张图片，图片加载成功后，需要处理的事情在回调函数中处理
function preloadImage(url) {
  return function thunk(resolve, reject) {
    let img = new Image()
    img.style.cssText = 'width:200px;margin:10px'
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(null)
    }

    img.src = url
  }
}

const urls = [
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2019/11-06/134028c28eb5212376.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/02-08/145955bc3b00504448.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/03-19/174949d70767470556.jpg',
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/02-19/16465934b475255075.jpg',
]

//   const it = gen();
//   it.next().value(function (data) {
//     document.body.appendChild(data);
//     it.next().value(function (data) {
//       document.body.appendChild(data);
//       it.next().value(function (data) {
//         document.body.appendChild(data);
//         it.next().value(function (data) {
//           document.body.appendChild(data);
//         });
//       });
//     });
//   });

function* gen() {
  yield preloadImage(urls[0])
  yield preloadImage(urls[1])
  yield preloadImage(urls[2])
  yield preloadImage(urls[3])
  yield preloadImage(urls[4])
}

// 采取自动化管理
function run(gen) {
  let it = gen()
  function next() {
    let result = it.next()
    if (result.done) return
    result.value(function (data) {
      document.body.appendChild(data)
      // next(); // 写在这里是继发
    })
    next() // 写在这里是并发
  }

  next()
}

run(gen)
```

## 五、Promise 的构造函数方法

深入浅出 Promise 的构造函数方法，`Promise.resolve()` 和 `Promise.reject()` 、`Promise.all()`、`Promise.race()` 和 `Promise.allSettled()`、`Promise.any()`

> 重点学习`Promise.resolve()` 和 `Promise.reject()`这个两个方法的：本质，参数 和 在 then 方法中的应用

### 1、Promise.resolve() 方法

有时需要将一个对象转为成功的 Promise 对象，`Promise.resolve` 方法就可以起到这个作用。

> `Promise.resolve()` 方法是 成功状态 Promise 的一种简写形式

```js
Promise.resolve('hello')
// 等价于
new Promise((resolve, reject) => {
  resolve('hello')
})
```

**基本用法**

- 创建一个成功的 Promise 对象

```js
// 创建一个成功的Promise对象
Promise.resolve('hello').then((data) => {
  console.log(data) // hello
})
```

- then 的回调函数中返回一个成功的 Promise 对象

```js
const p = new Promise((resolve, reject) => {
  resolve(22)
})
p.then((data) => {
  return Promise.resolve('icoding') // 返回一个成功的Promise
}).then((data) => {
  console.log(data) // icoding
})
```

**resolve 方法的参数**

> resolve 方法的参数分以下 4 种情况展开讲解

| 参数类型                                      | 说明                                                                                                 |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| 不带任何参数                                  | 直接返回一个成功状态的 Promise 对象                                                                  |
| 一般类型（非 thenable 对象和 Promise 对象）） | 直接返回一个成功状态的 Promise 对象                                                                  |
| Promise 实例                                  | 直接返回这个 Promise 实例                                                                            |
| thenable 对象                                 | 先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，改变 Promise 的状态。 |

- 不带任何参数

```js
Promise.resolve()
// 等价于
new Promise((resolve, reject) => resolve())
```

- 参数为一般类型

```js
Promise.resolve('hello')
// 等价于
new Promise((resolve, reject) => {
  resolve('hello')
})
```

- 参数为 Promise 实例

```js
const p1 = new Promise((resolve, rejcet) => resolve('hello'))
const p3 = Promise.resolve(p1)
console.log(p3 === p1) // true

// 与下面代码做区分
const p1 = new Promise((resolve, rejcet) => resolve('hello'))
const p2 = new Promise((resolve, rejcet) => resolve(p1))
console.log(p1 === p2) // false
```

- 参数为 thenable 对象

将 thenable 对象作为 Promise.resolve 的参数，则会先将 thenable 对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法，从而改变 Promise 的状态。

```js
let thenable = {
  name: 'icoding',
  b: 2,
  then(resolve, reject) {
    resolve(this.name)
  },
}

Promise.resolve(thenable).then((data) => {
  console.log(data)
})
// 打印结果： icoding
```

### 2、Promise.reject() 方法

有时需要将一个对象转为失败的 Promise 对象，`Promise.reject`方法就可以起到这个作用。

> `Promise.reject()` 是失败状态 Promise 的一种简写形式

```js
Promise.reject(new Error('错误'))
// 等价于
new Promise((resolve, reject) => reject('错误'))
```

**基本用法**

当我们需要在 then 方法中返回一个失败的 Promise 时，就可以用 `Promise.reject` 方法

```js
Promise.reject(new Error('地址错误'))
  .catch((err) => {
    console.log(err) // Error: 地址错误
    return 3
  })
  .then((data) => {
    console.log(data) // 3
    // 抛出错误的Promise
    return Promise.reject(new Error('内部错误'))
  })
  .catch((err) => {
    console.log(err) // Error: 内部错误
  })
```

**参数问题**

`Promise.reject()`的参数不管是什么类型都会原封不动传递给新创建的 Promise 回调函数的 reject 参数的参数。这一点与`Promise.resolve()`方法不一样喽

```js
obj = {
  then(resolve, reject) {
    resolve(22)
  },
}

Promise.reject(obj).catch((data) => console.log(data))
// 打印结果：{then:f}
const p1 = new Promise((resolve, rejcet) => resolve('hello'))

const p2 = Promise.reject(p1)
console.log(p1 === p2) // false
p2.catch((data) => {
  console.log(data) // p1
})
```

### 3、Promise.all() 方法

`Promise.all()`方法用于关注多个 Promise 对象的状态变化。其参数只要是一个迭代器对象或可遍历对象就可以。迭代的每个成员如果不是 Promise 对象，则会先将其转换为 Promise 对象，再做处理。

**语法**

```js
const p = Promise.all(iterable)
```

**基本用法**

```js
const p = Promise.all([p1,p2,p3,...]) ; // p1 p2 p3都是promise对象
```

注：

上面代码中，`Promise.all`接受一个数组作为参数，数组的成员都是 Promise 对象，如果其成员不是 Promise 对象，会将其转换为成功的 Promise 对象，再进一步处理。

> 返回值 p 为一个新的 Promise 对象，其状态由 `p1,p2,p3` 决定，分两种情况

- 只有 `p1,p2,p3` 的状态都是`fulfilled`，p 的状态才会变成`fulfilled`, 此时 `p1,p2,p3` 的返回值（`[[PromiseResult]]属性值`）组成一个数组，传递给到`p.then`的回调函数
- 只要 `p1,p2,p3` 中有一个的状态是 rejected，p 的状态就会变成 rejected，些时第一个状态变为 rejected 的 promise 实例的返回值（`[[PromiseResult]]属性值`）传递给 `p.then` 的回调函数

**代码演示一**：

`Promise.all()`方法参数中的所有 Promise 对象状态都变为`fulfilled`的情况

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
p1.then(() => {
  console.log('p1成功')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
p2.then((data) => {
  console.log('p2成功')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
p3.then((data) => {
  console.log('p3成功')
})

const p = Promise.all([p1, p2, p3])
p.then((data) => {
  console.log('成功', data)
}).catch((err) => {
  console.log('失败', err)
})

// p1,p2,p3状态都为fulfilled时,p的状态改变fulfilled,然后执行他的then方法
```

![image-20230216162632674](https://www.arryblog.com/assets/img/image-20230216162632674.1ff26e8e.png)

代码解释：

- 1s 后 p1 的状态变为 fulfiled，打印出："p1 成功"
- 2s 后 p2 的状态变为 fulfilled，打印出："p2 成功"
- 3s 后 p3 的状态变为 fulfilled,打印出："p3 成功"
- 当 p1,p2,p3 的状态都变为 fulfilled 时， p 的状态变为 fulfilled，然后调用 then 方法的第一个回调，打印出："成功 [1,2 ,3]"

**代码演示二：**

`Promise.all()`方法参数中的 Promise 对象状态有一个变为 rejected 的情况

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
p1.then(() => {
  console.log('p1成功')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 2000)
})
p2.catch((err) => {
  console.log('p2失败')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
p3.then((data) => {
  console.log('p3成功')
})

const p = Promise.all([p1, p2, p3])
p.then((data) => {
  console.log('成功', data)
}).catch((err) => {
  console.log('失败', err)
})

// 当p2状态为reject时，p的状态也变为rejected,同时执行catch方法
```

![image-20230216163412463](https://www.arryblog.com/assets/img/image-20230216163412463.15f5d029.png)

代码解释：

- 1s 后 p1 的状态变为 fulfiled，打印出："p1 成功"
- 2s 后 p2 的状态变为 rejected，打印出："p2 失败"。
- 此时 p 的状态变为 rejected，然后调用 catch 方法，打印出：“失败 2”
- 3s 后 p3 的状态变为 fulfilled，打印出"p3 成功"。

**总结：**

只要 p1,p2,p3 中有一个的状态率先变为 rejected 的，则 p 的状态就会变为 rejected 的。但并不会因为 p 的状态变为 rejected 的，其后没有执行完的 Promise 就不执行了，后在的 Promise 该如何执行还得如何执行完。

**`Promise.all()` 最常用的场景**

- 通过 Ajax 或其他方式从前端向后端获取数据的时候会用到
- 如：同时获取多个数据，所有数据都获取到了，都显示出来。如果没获取到再次处理 ，类似应用用的到比较多的地方。

> 目前只需要知道即可

### 4、Promise.race() 方法

`Promise.race` 方法（race 翻译过来为“竞赛”）用来关注多个 Promise 的状态，看那个 Promise 的状态先改变，然后返回一个新的 Promise 对象，新的 Promise 的状态和返回值与最先改变的那个 Promise 对象一致。

**语法**

```js
const p = Promise.race(iterable)
```

参数：iterable

表示一个迭代器对象或可遍历对象就可以。不过迭代的每个成员如果不是 Promise 对象，则会先将其转换为 Promise 对象，再做处理。

**基本用法**

```js
const p = Promise.race([p1, p2, p3,...]);
```

上面代码中

`p,p1,p2,p3` 为 Promise 对象，p 的状态由 `p1,p2,p3` 的状态决定。

只要 `p1,p2,p3` 中有一个先改变状态，p 的状态就跟着改变。p 的状态和返回值与第一个先改变状态的 Promise 对象的状态和返回值是一致的。

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
p1.then(() => {
  console.log('p1成功')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('地址出错了'))
  }, 2000)
})
p2.catch(() => {
  console.log('p2失败')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
p3.then(() => {
  console.log('p3成功')
})

const p = Promise.race([p1, p2, p3])
p.then((data) => {
  console.log('p成功', data)
}).catch((err) => {
  console.log('p失败', err)
})
```

![image-20230216172135422](https://www.arryblog.com/assets/img/image-20230216172135422.f51eed79.png)

代码解析：

- 1s 后 p1 的状态改变，变为`fulfilled`，然后调用 then 方法，打印： “p1 成功”
- 因为 p1 状态改变`fulfilled`，则 p 的状态也变为`fulfilled`，然后调用 then 方法，打印： “p 成功 1”
- 2s 后 p2 的状态改变，变为`“rejected"`，然后调用 catch 方法，打印：”p2 失败“
- 2s 后 p3 的状态改变，变为 `"fulfilled"`，然后调用 then 方法，打印：”p3 成功“

**提示：**

不关第一个改变状态的 Promise，其状态是成或还是失败，p 的状态都会在第一个状态改变的 Promise 之后马上改变。

> 但对其它没有操作完成的 Promise 没有影响。

### 5、Promise.race() 应用

我们经常会有这样的需求，如果某个异步请求在 3s 内还没有响应结果，则把 Promise 的状态改变 rejected 的，再次发送请求。

> 如果 3s 内的响应为失败，也重新发送一次请求。

```js
// 预加载图片
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('图片加载失改'))
    }
    img.src = url
  })
}

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('超时,重新发送')
  }, 3000)
})

const url =
  'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/system/2019/09-25/22132557f330499313.png?version=22.3.7'
const p = Promise.race([preloadImage(url), p2])
p.then((data) => {
  console.log('一次成功')
  document.body.appendChild(data)
})
  .catch((err) => {
    console.log(err)
    return preloadImage(url)
  })
  .then((data) => {
    if (data) document.body.appendChild(data)
  })
```

代码解析：

- 如果 preloadImage 方法中返回的 Promise 对象在 3 秒内状态改变
- 如果状态为成功，则 p 的状态为成功，执行 p 的 then 方法，把图片插入到页面中。下一个 then 方法的参数值为 undefined，则不会执行插入 dom 操作。
- 如果状态为失败，则 p 的状态为失败，执行 p 的 catch 方法，重新发送一次请求，请求成功将图片，插入页面，请求失败，抛出错误。
- 如果 preloadImage 方法返回的 Promise 对象在 3s 秒后状态才改变，则先改变状态的是 p2，p2 为失败的 Promise 对象，p 的状态为失败，执行 catch 方法，重新发送一次请求，请求成功将图片，插入页面，请求失败，抛出错误。

### 6、Promise.allSettled() 方法

`Promise.allSettled` 方法用来记录多个 Promise 的状态，他只忠于记录各个 Promise 的状态，其自身状态永远不受其他 Promise 状态的影响，返回的新的 Promise 实例永远为成功状态。

**语法**

```js
const p = Promise.allSettled(iterable)
```

**基本用法**

```js
const p = Promise.allSettled([p1, p2, p3])
```

以上代码中

```
p,p1,p2,p3` 都是 Promise 对象，当 `p1,p2,p3` 的状态都必变后，p 的状态才变为`fulfilled
```

其 p 的返回值是一个数组，数组的每个成员都是一个对象，用来记录每个 promise 的状态，其对象顺序与传入的参数的顺序一样。

> 对象都有以下属性

- status 表示对应 promise 的状态，要么是 `"fulfilled"`，要么是 `"rejected"`
- value 仅当 `status` 为 `"fulfilled"`，才存在，表示 promise 成功时才有的值
- reason 仅当 `status` 为 `"rejected"`，才存在，在 promsie 失败时才有 reason

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
p1.then(() => {
  console.log('p1状态改变')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 2000)
})

p2.catch((err) => {
  console.log('p2状态改变')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

p3.then((err) => {
  console.log('p3状态改变')
})

const p = Promise.allSettled([p1, p2, p3])

p.then((data) => {
  console.log(data)
})
```

![image-20230214232554648](https://www.arryblog.com/assets/img/image-20230214232554648-16765548969831.3cb4d5ec.png)

### 7、Promise.any() 方法

`Promise.any` 用于关注多个 Promise 对象状态的改变

- 只要其中有一个 Promise 的状态变为 fulfilled，则这个方法返回的 Promise 对象的状态就变立马变为 fulfilled，其返回值为首个状态变为 fulfilledPromise 的返回值。
- 如果所有 Promise 的状态都变为了 rejected,则这个方法返回的 Promise 对象的状态变为 rejected 的。其返回值为 `AggregateError` 实例，这是 `Error`的子类，用于把单一的错误集合在一起。

> 他主要用于多个 Promise 中最先成功的那一个。不过 `Promise.any` 方法还是一个实验性，并不被所有浏览器支持。

**代码演示一**

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})
p1.catch(() => {
  console.log('p1失败')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})

p2.then((data) => {
  console.log('p2成功')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

p3.then((data) => {
  console.log('p3成功')
})

const p = Promise.any([p1, p2, p3])
p.then((data) => {
  console.log('p成功', data)
}).catch((err) => {
  console.log('p失败', err)
})
```

![image-20230216182517231](https://www.arryblog.com/assets/img/image-20230216182517231.2cedf572.png)

代码解析：

- 1s 后 p1 的状态变为失败，调用 catch 方法，打印：”p1 失败“
- 2s 后 p2 的状态变为成功，调用 then 方法，打印：”p2 成功“
- 因为 p2 状态为成功，所以 p 的状态马上变为成功，并调用 then 方法，打印：”p 成功 2“

> 3s 后 p3 的状态变为成功，调用 then 方法，打印：”p3 成功“

**提求：**

只要 `p1,p2,p3` 中有一个成功，则 p 的状态就变为成功，同时他的状态并不影其它 Promis 的正常执行。

**代码演示二**：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})
p1.catch((err) => {
  console.log('p1失败')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 2000)
})

p2.catch((err) => {
  console.log('p2失败')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3)
  }, 3000)
})

p3.catch((err) => {
  console.log('p3失败')
})

const p = Promise.any([p1, p2, p3])
console.log(p)
p.then((data) => {
  console.log('p成功', data)
}).catch((err) => {
  console.log('p失败', err)
})
```

![image-20230216182333692](https://www.arryblog.com/assets/img/image-20230216182333692.033649b8.png)

> 因为 p1,p2,p3 都为失败，所以 p 为失败

### 8、经典面试题

定义一个方法，方法传入一个参数，参数的类型只要是 iterable 就行，这个方法用来

- ①、返回物理上第一个成功的 promise 的结果
- ②、若全部为失败，则返回物理上最后一个 promise 的结果

解题思路

- 定义的方法返回一个 Promise 对象，然后在 Promise 中遍历传入的 iterable 对象，如果其成员中有一个是成功的，就改变 Promise 的状态，状态一旦改变就不可逆。
- 如果成员是失败的就记录失败的个数，当失败的个数与 iterable 成员个数相同时，则这个失败的成员就是最后一个失败的成员，调用 `reject()`方法，改变 Promise 对象的状态，然后将最后一个失败的 Promise 返回值传入。

**具体实现细节：**

- 定义两个变量 rejectTimes 和 length
- rejectTimes 变量：用来记录失败的 Promise 个数
- length 变量：用来记录参数 iterable 的迭代成员个数
- 利用 `for...of` 来遍历 iterable，
- 遍历过程中 `length++`，用来记录参数 iterable 的迭代成员个数
- 遍历中要判断遍历的成员类型，如果不是 Promise 对象，则直接调用 resolve,并将成员作为 resolve 的参数
- 如果是 Promise 对象，则给遍历成员添加 then 和 catch 方法，then 中直接调用 `resolve(data)`。catch 方法中将遍历 `rejectTimes++`，然后判断，如果 `if(rejectTimes === length)` 说明所有的 Promise 都是失败的，则将最后一次的失败的 Promise 返回值传入 `reject()`中
- 注意特殊情况，就是 iterable 中没有一个成员，如果 `length === 0`，就说明 iterable 中没有一个成员，则调用 `reject()`方不法。

```js
Promise._any = function (iterable) {
  let rejectTimes = 0 // 用来记录失败的个数
  let length = 0 // 有来记录迭代器成员个数
  return new Promise((resolve, reject) => {
    // 判断是否传值或传值为null
    if (iterable == null) {
      return reject(new TypeError(`${iterable} is not iterable`))
    }
    // 判断传的成员是否是迭代器对象或可迭代成员，不是，则调用reject
    if (typeof iterable.next !== 'function' && typeof iterable[Symbol.iterator] !== 'function') {
      return reject(new TypeError(`${iterable} is not iterable`))
    }

    // 对iterable进行for遍历
    for (let v of iterable) {
      length++ // 同步代码
      // 判断其类型是否为Promise
      if (v instanceof Promise) {
        v.then((data) => {
          resolve(data)
        }).catch((err) => {
          rejectTimes++ // 异步中代码
          // 如果 length===rejectTimes，说明所有Promise都失败了
          if (length === rejectTimes) {
            reject(err)
          }
        })
      } else {
        resolve(v)
      }
    }
    // 判断传过的迭代对象中成员是否为空，如果为空，直接reject
    if (length === 0) {
      reject(new Error('All promises were rejected'))
    }
  })
}

// 应用
Promise._any([1, 2])
  .then((data) => {
    console.log(data) // 1
  })
  .catch((err) => {
    console.log(err)
  })

Promise._any([Promise.reject(33), 2])
  .then((data) => {
    console.log(data) // 2
  })
  .catch((err) => {
    console.log(err)
  })

Promise._any([Promise.reject(33), Promise.reject(44)])
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err) // 44
  })
```

## 六、总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、认识 Promise

Promise 是什么 ？

- Promise 是异步操作的一种解决方案
- Promise 一般用来解决层层嵌套的回调函数的问题（回调地狱）
- Promise 解决的不是回调函数，而是回调地狱

### 2、Promise 3 种状态

- pending （未完成）
- resolved/fulfilled（已成功）
- rejected（已失败）

![image-20221114235510088](https://www.arryblog.com/assets/img/image-20221114235510088.b70f66fa.png)

状态转换

- 只有从 pending（未完成）转到 resolved/fulfilled（已成功）
- 或 pending（未完成）转到 rejected（已失败）

> Promise 状态一旦变化，就不会再改变了。

### 3、Promise 的基本用法

```js
const p = new Promise((resolve, reject) => {
  return resolve('成功 ！')
  return reject(new Error('失败'))
}).then(
  (data) => {},
  (err) => {},
)
```

以上代码解读：

- 使用 Promise 时，用的不是它的构造函数，而是实例化的构造函数生成的 Promise 对象
- 在实例化的过程中，构造函数中传的是一个回调函数，该回调函数有两个参数，resolve 和 reject
- resolve 调用后，状态由 pending（未完成）转为 esolved/fulfilled（已成功）状态。状态改变后：成功态，执行 then 的第一个回调函数
- reject 调用后，状态由 pending （未完成）转为 rejected（已失败）。状态改变后：失败态，执行 then 的第二个回调函数

**注：**

resolve 和 reject 在调用的时候，是可以传递参数的，这个参数会在 then 方法中接收到。我们建议在调用 resolve 和 reject 时，直接通过 return 返回，这样即使后边还有代码也不会被执行

> 因此，我们推荐在调用 resolve 和 reject 函数的时候加上 return

### 4、Promise 的实例方法

**`then()` 方法**

- pending -> resolved 时，执行 then 的第一个回调函数
- pending -> rejected 时，执行 then 的第二个回调函数
- 状态不改变，`then()` 的回调函数都不会被执行
- `then()` 执行后返回一个新的 Promise 对象
- 可以通过 return 语句 改变返回的 Promise 对象的状态，默认情况下都是成功状态
- `then()` 方法是可以向后传值的

**`catch()` 方法**

- catch 专门用来处理 rejected 失败状态
- catch 本质上是 then 的特例
- 建议 Promise 对象后面要跟 catch 方法，这样可以处理 Promise 内部发生的错误

**注：**

catch 是可以捕获错误信息的，当前的错误只要没有被前面的 catch 或 then 的第二个回调所捕获的，错误是一直会传递下去的，不会消失，直到被某一个 catch 或 then 的回调捕获之后，后边就没有错误了。

**finally() 方法**

- 当 Promise 状态发生变化时，不论如何变化都会执行
- `finally()` 本质上是 `then()` 的特例

### 5、Promise 的构造函数方法

**`Promise.resolve()` 方法**

本质是成功状态 Promise 的一种简写形式

```js
new Promise((resolve) => resolve('成功'))
// 等价于
Promise.resolve('成功')
```

**`Promise.resolve()` 的参数**

- 参数是 Promise 实例对象时，直接返回这个 Promise 对象
- 参数是具有 then 方法的对象时，会立即执行它的 then 方法
- 参数是其他值时，相当于通过 resolve 函数传参

**`Promise.reject()`**

本质是失败状态 Promise 的一种简写形式

```js
new Promise((resolve, reject) => reject('失败 ！'))
// 等价于
Promise.reject('失败 ！')
```

> 不管什么参数，都会原封不动的向后传递，作为后续方法的参数

**`Promise.all、race、allSettled() 方法`**

- 只要是可遍历的，都可作为参数
- 参数的 "集合" 中若有成员不是 Promise 对象，内部会将其转变为 Promise 对象
- 返回一个新的 Promise 实例对象

**`Promise.all()` 方法**

- 所有状态都变成 resolved 成功时，最终的状态才会变成 resolved 成功
- 只要有一个变成 rejected 失败时，最终的状态就会变成 rejected 失败

**`Promise.race()` 方法**

- 最终的状态取决于第一个完成的 Promise 实例对象
- 如果第一个完成的成功了，那最终的就成功

**`Promise.allSettled()` 方法**

- 最终的状态永远都是成功的，与传入的 Promise 对象状态无关
- 会记录下各个 Promise 的表现

## 七、测试题

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、下面代码中 Promise 对象的最终状态是 ？

> 单选

```js
const p = new Promise((a, b) => {
  a(4)
})
```

- A、rejected
- B、fulfilled
- C、pending
- D、resolved

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B</p></details>

### 2、下面代码输出的结果是 ？

```js
const p = new Promise((resolve, reject) => {
  reject(1)
})
p.then((data) => {
  console.log('a' + data)
})
  .catch((data) => {
    console.log('b' + data)
  })
  .then(
    () => {
      console.log('c')
      return 2
    },
    () => {
      console.log('d')
      return 3
    },
  )
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：b1 c 2</p></details>

### 3、以下代码最终执行结果

```js
console.log(1)
setTimeout(function () {
  console.log(2)
}, 0)
const p = new Promise((resolve, reject) => {
  console.log(3)
  reject(1)
})

console.log(4)
p.then((data) => {
  console.log(data)
})
  .catch((err) => {
    console.log(err)
    return 5
  })
  .then((data) => {
    console.log(data)
    throw new Error('错误')
  })
  .catch((err) => {
    console.log(err)
  })
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：1 3 4 1 5 Error:错误 2</p></details>

### 4、关于 Promise.resolve 方法说法错误的是 ?

> 单选

- A、如果参数是 Promise 实例，将不做任何修改、原封不动地返回这个实例
- B、如果参数是具有 then 方法的对象，将这个对象转为 Promise 对象，并不会立即执行这个对象的 then 方法
- C、如果参数是一般参数，返回一个新的 Promise 对象，状态为 fulfilled
- D、如果参数为空，直接返回一个 fulfilled 状态的 Promise 对象

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B</p></details>

### 5、以下说法错误的是 ?

> 单选

```js
const p = Promise.all(new Set(p1, p2, p3))
```

- A、Promise.all()会返回一个实例，状态为成功
- B、只有 p1、p2、p3 的状态都为成功，p 的状态才会为成功
- C、只要 p1、p2、p3 之中有一个是失败状态，p 的状态就变成失败
- D、参数若为空数组的话，p 的状态为成功

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：A</p></details>

上次更新时间: 6/8/2023, 9:23:17 PM

← [Generator 函数的实践与实践应用](https://www.arryblog.com/vip/es6/generator-application.html)[JavaScript 中的 Event Loop 事件循环、微任务与宏任务 ](https://www.arryblog.com/vip/es6/event-loop-micro-task-macro-task.html)→

评论 Powered by [GitHub ](https://github.com/)& [Vssue](https://github.com/meteorlxy/vssue)

使用 GitHub 帐号登录后发表评论

使用 GitHub 登录

登录后查看评论
