---
title: Pinia 全局状态管理，深入 State、Getter、Action
date: 2023-10-24
sidebar: 'auto'
categories:
  - vue
tags:
  - vue
  - Pinia
publish: true
---

# Pinia 全局状态管理，深入 State、Getter、Action

Pinia 是 Vue 的专属状态（状态指的就是数据）管理库，它允许你跨组件或页面共享状态。 Pinia 相当于一个数据仓库，所有当前应用的组件都可以访问数据仓库中的数据。

> 关于 Pinia 简介，可以查阅 Pinia 官方教程 - [Pinia 简介(opens new window)](https://pinia.vuejs.org/zh/introduction.html)

本章节主要讲解内容如下：

- Pinia 的基本使用
- 深入 State
- 深入 Getter
- 深入 Action
- 组合式 Store

## 一、Pinia 的基本使用

本小节主要讲解关于 Pinai 的基本使用，使用 Pinia 需要经历以下 5 步：

- 安装 Pinia
- 在 vue3 中注册 Pinia 插件
- 定义 Store
- 使用 Store

### 1、安装 Pinia

执行以下命令安装 pinia

```shell
yarn add pinia
# 或者使用 npm 安装
npm install pinia
```

### 2、注册 Pinia

- 以下为在 Vue3 中注册 Pinia 的方法
- 首先导入 pinia 提供的`createPinia`方法，然后调用创建 pinia 实例
- 执行`app.use()`方法，将 pinia 实例传递给应用

```js
import { createApp } from 'vue'
import App from './App.vue'

// 导航pinia的createPinia方法
import { createPinia } from 'pinia'
// 创建 pinia实例
const pinia = createPinia()
const app = createApp(App)
// 注册pinia插件
app.use(pinia)

app.mount('#app')
```

### 3、定义 Store

在定义 Store 之前，我们需要先了解下什么是 Store ？Store 有仓库的意思，在这里好比是数据存放的仓库。

### 3.1、Store 是什么 ？

Store （如 Pinia）是一个保存状态和业务逻辑的实例，它并不与你的组件树绑。

> 上面这句话你可以理解为，应用中需要共享的全局状态（数据）及数据处理相关的逻辑都保存在 Store 实例上，但他不与应用中的任何组件单独绑定。

它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有**三个概念**，`state`、`getter` 和 `action`，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。

**如何定义 Store**

- Store 是用`defineStore()` 定义的，返回值为一个函数，函数名推荐使用`use...Store`写法
- 它的第一个参数要求是一个**独一无二的**名字
- 它的第二个参数接受两类值：`Setup` 函数或`Option` 对象

```js
import { defineStore } from 'pinia'
// 定义Store ，Store的命名推荐使用 usexxxStore 这种写法
export const useCountStore = defineStore('count', {
  //  Option对象
})

// 或
export const useCountStore = defineStore('count', () => {
  // setup函数
})
```

### 3.2、Option Store

`defineStore()`方法的第二个参数可以是一个`Option`对象，该对象与 Vue 的选项式 API 类似，接受 `state`、`actions` 与 `getters` 属性。

在当前项目的`src`目录下新建`store`目录，并在该目录下新建 `count.js`文件，在文件中定义 Store 并对外暴露

```js
import { defineStore } from 'pinia'
// 定义Store ，Store的命名推荐使用 usexxxStore 这种写法
export const useCountStore = defineStore('count', {
  // Option对象,有三个重要的属性 state、actions 与 getters,

  // state 相当于组件中的data
  // 为了完整类型推理，state函数更推荐箭头函数写法
  state: () => {
    return {
      count: 10,
    }
  },

  // getters 相当于组件中的computed,会对数据缓存
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  // actions 相当于组件中的methods
  actions: {
    add() {
      this.count++ // this指向创建的store
    },
  },
})
```

注：

你可以认为以上代码中的 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

**温馨提示：**

为了完整类型推理，state 函数更推荐箭头函数写法

### 4、使用 Store

- 上面我们定义了一个 Store，但在我们没有调用`defineStore()`方法返回的值（一个函数）之前，store 实例是不会被创建的
- 我们在`<script setup>`中调用`useCountStore()`创建 store 实例
- 一旦 store 被实例化，你可以直接访问在 store 的 `state`、`getters` 和 `actions` 中定义的任何属性

```html
<script setup>
  import { useCountStore } from './store/count'
  // countStore为创建的store实例，可以在组件的任意位置访问countStore
  const countStore = useCountStore()
</script>

<template>
  <div>count的值：{{ countStore.count }}</div>
  <div>count放大2倍值：{{ countStore.doubleCount }}</div>
  <button @click="countStore.add">count++</button>
</template>
```

> 以上代码，最终渲染效果如下：

![GIF2023-6-222-30-57](https://www.arryblog.com/assets/img/GIF2023-6-222-30-57.41822f71.gif)

### 5、Setup Store

- `defineStore()`方法的第二个参数除了是一个 Option 对象，还可以是一个`Setup`函数。
- 该函数与 Vue 组合式 API 的`Setup`函数相似。该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

温馨提示：

我们可以定义任意多的 Store，但为了让使用 pinia 的益处最大化（比如允许构建工具自动进行代码分割以及 TypeScript 推断），**我们应该在不同的文件中去定义 store**。

在`store`目录下新建`user.js`文件，在文件中创建一个 Store

```js
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  // 定义的ref变量，相当于Option对象中的state 即相当于组件中的data
  const username = ref('艾编程')
  const age = ref(17)
  const hobbies = reactive(['画画', '写字'])

  // 计算属性  相当于Option对象的getters，即相当于组件中的computed
  // 返回的计算属性 identity 是一个ref对象，所以是响应式的
  const identity = computed(() => {
    return age.value >= 18 ? '成年' : '未成年'
  })

  // 函数，相当于Option对象的actions，即相当于组件中的methods方法
  function update() {
    age.value++
  }

  // 对外暴露属性和方法
  return {
    username,
    age,
    hobbies,
    identity,
    update,
  }
})
```

注：

在`Setup Store`中，Setup 函数中

- 定义的响应式变量，就是 state 属性，好比组件的 data 属性
- 定义的`computed()`计算属性，就是 getters，好比组件中的计算属性
- 定义的`function()`就是 actions，好比组件中的 methods 方法

**在组件中使用创建好的 Store**

```html
<script setup>
  import { useUserStore } from './store/user'
  // countStore为创建的store实例，可以在组件的任意位置访问countStore
  const userStore = useUserStore()
</script>

<template>
  <div>用户姓名：{{ userStore.username }}</div>
  <div>用户年龄：{{ userStore.age }}</div>
  <!--
	identity计算属性虽然是一个ref对象，但是userStore是一个用reactive包装的响应式对象
	针对响应式对象的ref属性，在模板中调用时会自动解包，所以模板中调用不需要`.value`
	-->
  <div>用户身份：{{ userStore.identity }}</div>
  <button @click="userStore.update">更新年龄</button>
</template>
```

> 最终渲染结果如下：

![GIf2023-6-223-11-09](https://www.arryblog.com/assets/img/GIf2023-6-223-11-09.a7752510.gif)

### 6、解构 Store

- 创建的`Store`实例对象是一个用`reactive`包装的响应式对象（即 Proxy 代理对象）。
- 所以不能直接解构 Store，因为解构后会失去响应式

**错误示例**

```html
<script setup>
  import { useUserStore } from './store/user'
  //  直接解构store，会失去响应性，
  const { username, age, identity, update } = useUserStore()
</script>

<template>
  <div>用户姓名：{{ username }}</div>
  <div>用户年龄：{{ age }}</div>
  <div>用户身份：{{ identity }}</div>
  <button @click="update">更新年龄</button>
</template>
```

注：

- 为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。
- 该方法类似于 Vue 中的`toRefs()`，最终解构出来的每个属性都是一个单的`ref`对象。

> 不过要特别注意，store 实例中的方法是可以直接从 store 实例解构的

**正确示例**

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from './store/user'
  const UserStore = useUserStore()
  //  直接解构store，会失去响应性
  const { username, age, identity } = storeToRefs(UserStore)
  // 方法，可以直接解构
  const { update } = UserStore
</script>

<template>
  <div>用户姓名：{{ username }}</div>
  <div>用户年龄：{{ age }}</div>
  <div>用户身份：{{ identity }}</div>
  <button @click="update">更新年龄</button>
</template>
```

> 最终渲染效果和我们预期一样，解构出来的属性保持了响应性

![GIf2023-6-223-11-09](https://www.arryblog.com/assets/img/GIf2023-6-223-11-09.a7752510.gif)

## 二、深入 State

本小节我们来重点学习如何修改和订阅 state

### 1、直接修改 state 的值

我们可以通过 store 实例访问 state，直接修改其值

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from './store/user'
  const userStore = useUserStore()
  function update() {
    userStore.username = '清心'
    userStore.age = 33
  }
</script>

<template>
  <div>用户姓名：{{ userStore.username }}</div>
  <div>用户年龄：{{ userStore.age }}</div>
  <div>用户身份：{{ userStore.identity }}</div>
  <button @click="update">更新数据</button>
</template>
```

### 2、批量修改 State 的值

调用 store 实例的`$patch`方法，它允许你用一个 `state` 的补丁对象在同一时间更改多个属性。

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from './store/user'
  const userStore = useUserStore()
  function update() {
    userStore.$patch({
      username: '清心',
      age: 33,
    })
  }
</script>

<template>
  <div>用户姓名：{{ userStore.username }}</div>
  <div>用户年龄：{{ userStore.age }}</div>
  <div>用户身份：{{ userStore.identity }}</div>
  <button @click="update">更新用户信息</button>
</template>
```

如果`UserStore`有一个`hobbies`属性，该属性是一个数组，我们需要向数组中添加一项，则需要创建一个新的数组来实现。

```js
function update() {
  UserStore.$patch({
    username: '清心',
    age: 33,
    hobbies: [...userStore.hobbies, '唱歌'],
  })
}
```

注：

所以针对任何集合类型的修改，上面这种方式都是非常麻烦的，所以`$patch`也接受一个函数作为参数。

### 3、批量修改函数形式

- 你可以向 store 实例的`$patch`方法传入一个函数作为参数来实现一次性修改多个 state 属性值
- 该回调函数接受 state 作为第一个参数

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from './store/user'
  const userStore = useUserStore()

  // 修改state中多个属性的值
  function update() {
    userStore.$patch((state) => {
      state.username = '清心'
      state.age = 33
      state.hobbies.push('唱歌')
    })
  }
</script>

<template>
  <div>用户姓名：{{ userStore.username }}</div>
  <div>用户年龄：{{ userStore.age }}</div>
  <div>用户身份：{{ userStore.identity }}</div>
  <div>用户爱好：{{ userStore.hobbies }}</div>
  <button @click="update">更新用户信息</button>
</template>
```

### 4、通过 actions 修改

我们可以在 Store 的 actions 选项中定义方法来修改 state 中的值

> 以下代码中的 update 方法用来修改 state 属性中的值

```js
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  // 定义的ref变量，相当于Option对象中的state 即相当于组件中的data
  const username = ref('艾编程')
  const age = ref(17)
  const hobbies = reactive(['画画', '写字'])

  // 计算属性  相当于Option对象的getters，即相当于组件中的computed
  const identity = computed(() => {
    return age.value >= 18 ? '成年' : '未成年'
  })

  // 函数，相当于Option对象的actions，即相当于组件中的methods
  function update() {
    username.value = '清心'
    age.value = 33
    hobbies.push('喝歌')
  }

  // 对外暴露属性和方法
  return {
    username,
    age,
    identity,
    update,
    hobbies,
  }
})
```

### 5、注意事项

我们没有办法替换掉`store`的`state`，因为那样会破坏其响应性。

即使你使用`store.$state`来重新给 state 赋值，也无计于事。因为`store.$state`代码内部本质是调用了`sotre.$patch`来实现打补丁修改`state`某些属性值。

```js
// 以下代码实际上并没有替换掉整个state
userStore.$state = { username: '清心' }

// 上面代码相当于内部调用了$patch()方法，如下
userStore.$patch({ username: '清心' })
```

### 6、订阅 state

你可以通过 store 的 `$subscribe()` 方法侦听 state 及其变化。当 state 的值发生改变时就会触发`$subscribe()`方法及回调函数。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 subscriptions 在 _patch_ 后只触发一次

> 使用`store.$patch()`方法一次修改多个 state 的值，只会触发一次`$subscribe()`方法的执行

**语法**

```js
const stop = store.$subscribe(
  (mutation, state) => {
    /*
      * mutation主要包含三个属性值：
      *   events：当前state改变的具体数据都在该对象上
      *   storeId：是当前store的id
      *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
      *         “direct” ：直接修改 , 如：store.count++
                ”patch object“ ：通过 $patch 传递对象的方式改变的
                “patch function” ：通过 $patch 传递函数的方式改变的
      *
      * */
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
  },
  {
    /*
     * 第二个参数options对象，是各种配置参数
     * detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除， 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
     * immediate，deep，flush等等参数 和vue3 watch的参数是一样的
     *
     * */
  },
)

// 停止订阅
stop()
```

**代码演示**

- 定义 store

```js
import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCountStore = defineStore('count', () => {
  const count = ref(10)
  const num = ref(1)

  return {
    count,
    num,
  }
})
```

- 使用 store，并订阅 state

```html
<script setup>
  import { watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useCountStore } from './store/count'
  const countStore = useCountStore()
  // 解构state
  const { count, num } = storeToRefs(countStore)
  // 修改值
  function add() {
    countStore.$patch(() => {
      count.value++
      num.value++
    })
  }
  // 订阅
  const stop = countStore.$subscribe((mutation, state) => {
    console.log('改变后count的值', state.count)
  })
</script>
<template>
  <div>count的值：{{ count }}</div>
  <div>num的值{{ num }}</div>
  <button @click="add">count++</button>
  <button @click="stop()">停止订阅</button>
</template>
```

> 最终渲染效果如下：

![GIF2023-6-321-45-45](https://www.arryblog.com/assets/img/GIF2023-6-321-45-45.8df5796a.gif)

## 三、深入 Getter

Getter 完全等同于 store 的 state 的计算值。可以通过 `defineStore()` 中的 `getters` 属性来定义它们。

**推荐**使用箭头函数，并且它将接收 `state` 作为第一个参数

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => {
    return {
      count: 10,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    price: (state) => '$' + state.count,
  },
})
```

### 1、Getter 中的 this

使用普通函数（非箭头函数）定主 getter 时，getter 函数内部的 this 指向整个 store 实例。

> 我们可以通过 this 问 state、getter、actions

```js
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => {
    return {
      count: 10,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    price() {
      return this.fn() + '$' + this.doubleCount
    },
  },
  actions: {
    fn() {
      return '价格：'
    },
  },
})
```

### 2、向 getter 传递参数

_Getter_ 只是幕后的**计算**属性，所以不可以向它们传递任何参数。不过，你可以从 _getter_ 返回一个函数，该函数可以接受任意参数

```js
const sum = computed(() => {
  // 这里的数据相当于被缓存
  // 返回一个带有函数的函数，函数本身不会被缓存，因为他并不是一个具体的值
  return (item) => total + item
})
```

请注意

当你这样做时，**getter 将不再被缓存**，它们只是一个被你调用的函数。

不过，你可以在 getter 本身中缓存一些结果，虽然这种做法并不常见，但有证明表明它的性能会更好

```js
import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const list = reactive([1, 2, 3, 4, 5, 6])
  const sum = computed(() => {
    // 计算数组中所有数之和
    const total = list.reduce((total, prev, next) => total + prev, 0)
    console.log('total相当于缓存下来了')
    return (item) => total + item
  })

  return {
    sum,
    list,
  }
})
```

> 测试代码

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../src/store/user.js'
  const userStore = useUserStore()
  console.log(userStore.sum(4))
  console.log(userStore.sum(5))
  console.log(userStore.sum(6))
  console.log(userStore.sum(7))
  userStore.list.push(20)
  console.log(userStore.sum(4))
</script>
```

## 四、深入 Action

本小节来我们将重点学习

- action 异步写法
- 订阅 action

### 1、action 的异步写法

在 setup store 中，我们像写正常的异步方法一样来书写就可

> 以下代码中的 getInfo 方法，根据 id 来返回对应的用户条数

```js
import axios from 'axios'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  // 保存获取的数据
  let result = ref([])
  // 异步获取数据
  async function getInfo(id) {
    const list = await axios.get(
      `https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/list?num=${id}`,
    )
    result.value = list.data.data.userslist || []
  }

  return {
    getInfo,
    result,
  }
})
```

> 代码测试

```html
<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../src/store/user.js'
  const userStore = useUserStore()
  // 获取数据
  userStore.getInfo(3)
</script>

<template>
  <div v-for="item in userStore.result">
    <h3>{{ item.username }}</h3>
    <p>{{ item.desc }}</p>
  </div>
</template>
```

> 最终渲染结果如下：

![image-20230811173235167](https://www.arryblog.com/assets/img/image-20230811173235167.83c52371.png)

### 2、订阅 action

- 我们可以通过`store.$onAction()`来监听 action 和它们的返回结果，即 action 被调用时就会触发`$onAction`。
- `store.$onAction()`方法的第一个参数是一个回调函数，回调函数会在 action 本身之前执行。

> 回调函数的参数对象的每个属性的作用如下

```js
userStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action执行完后，会调用after方法的回调
    onError, // action 抛出错误或 reject 时执行执行该方法的回调
  }) => {
    console.log('name', name)
    console.log('store', 'store')
    console.log('args', args)
    // 在action 函数执行完后调用，
    // 如果action是一个异步方法，会在返回后的promise的then方法前调用。
    // result为 action执行后的返回结果
    after((result) => {
      console.log('after回调执行', result)
    })
  },
)
```

**代码演示**

在 store 文件夹下新建`user.js`文件，内容如下：

```js
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
let url = 'https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/users/list?num='
export const useUserStore = defineStore('user', () => {
  let result = ref([])
  // 请求数据方法
  async function getInfo(id) {
    console.log('action的getInfo方法正在执行')
    const list = await axios.get(`${url}${id}`)
    result.value = list.data.data.userslist || []
  }

  // 对外暴露属性
  return {
    getInfo,
    result,
  }
})
```

在组件中使用 store，`App.vue`文件内容如下：

```html
<script setup>
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../src/store/user.js'
  const userStore = useUserStore()
  const { getInfo } = userStore

  // 订阅action
  userStore.$onAction(
    ({
      name, // action 名称
      store, // store 实例，类似 `someStore`
      args, // 传递给 action 的参数数组
      after, // 在 action执行完后，会调用after方法的回调
      onError, // action 抛出错误或 reject 时执行执行该方法的回调
    }) => {
      console.log('name', name)
      console.log('store', 'store')
      console.log('args', args)
      // 在action 函数执行完后调用，
      // 如果action是一个异步方法，会在返回后的promise的then方法前调用。
      // result为 action执行后的返回结果
      after((result) => {
        console.log('after回调执行', result)
      })
    },
  )

  // 请求获取数据
  getInfo(3)
</script>

<template>
  <div v-for="item in userStore.result">
    <h3>{{ item.username }}</h3>
    <p>{{ item.desc }}</p>
  </div>
</template>
```

> 程序运行后，点击获取用户信息按扭后，控制台的输出结果如下

![image-20230603192628071](https://www.arryblog.com/assets/img/image-20230603192628071.773a25ad.png)

温馨提示

- 想要在 action 执行前做相关操作，可以直接写在的`$onAction()`的回调函数中
- 想要在 action 执行后做相关操作，可以直接写在 after 方法的回调函数中

## 五、组合式 Store

你可以在一个 store 中使用另一个 store，使用步骤如下：

- 在当前 store 的顶部直接通过 import 导入另一个 store
- 调用导入的 store，创建 store 实例
- 在需要使用的地方，直接通过 store 实例来访问其身上的 state、getter、action

```js
import { defineStore } from 'pinia'
import { useBStore } from '../store/useB.js'
// 注意，不要在这里  const bStore=useBStore()
export const useAStore = defineStore('useA', {
  state() {
    return {
      a: useBStore().m, // 使用别一个store中数据
    }
  },
})
import { defineStore } from 'pinia'
import { useAStore } from '../store/useA.js'
// 注意，不要在这里  const aStore=useAStore()

export const useBStore = defineStore('useB', () => {
  const m = 10
  return {
    m,
  }
})
```

注意事项:

如果**两个或更多的 store 相互使用**

- 它们不可以通过 `getters` 或 `actions` 创建一个无限循环。
- 它们也不可以**同时**在它们的 setup 函数中直接互相读取对方的 state

## 六、组件间通信的方案

大家可以自行去复习下我们之前讲过的通信方案，包括（使用方法，场景）

- props 父子组件间通信
- emit 父子组件间通信
- v-model 父子组件间通信
- 依赖注入（provide / inject）
- `$attrs` 透传属性
- 任意组件间通信- 发布与订阅
- `ref` 获取子组件实例
- `$parent` 访问父组件实例
- `$children` 访问子组件实例
- `$root` 访问根组件
- pinia 全局状态管理
