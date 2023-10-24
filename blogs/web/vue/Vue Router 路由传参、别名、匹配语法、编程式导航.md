---
title: Vue Router 路由传参、别名、匹配语法、编程式导航
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
  - router
publish: true
---

# Vue Router 路由传参、别名、匹配语法、编程式导航

从本节内容开始我们正式学习 Vue Router 核心基础 和 在实际开发中的实践应用相关内容

- Vue Router 的基本用法
- Vue Router 路由传参
- 路由别名
- 命名视图
- 动态路由的匹配语法
- Vue Router 编程式导航
- 实战应用：项目框架搭建

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#一、vue-router-的基本用法)一、Vue Router 的基本用法

Vue Router 是 [Vue.js (opens new window)](https://vuejs.org/)的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建**SPA 单页应用**变得轻而易举。在 Vue3 中需要安装`vue-router`4 版本。

> Vue Router 官网地址：https://router.vuejs.org/zh/guide/

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、使用-vue-router-的步骤)1、使用 vue-router 的步骤

在 vue3 中使用`vue-router@4.x` 版本步骤

- 第一步：安装`vue-router@4`
- 第二步：定义路由组件
- 第二步：创建路由实例
- 第三步：配置路由映射：路径和组件映射关系
- 第四步：在 app 应用实例中挂载创建的路由实例
- 第五步：使用路由：通过`<router-link>`和`<router-view>`组件

> 接下来，我们按以上步骤，最终实现如下效果的单页面应用

![GIF2023-8-218-02-39](https://www.arryblog.com/assets/img/GIF2023-8-218-02-39.d4123c52.gif)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-1、第一步-安装vue-router-4-x版本)1.1、第一步：安装`vue-router@4.x`版本

执行以下 npm 命令，安装`vue-router`4.x 版本，安装成生产依赖

```shell
npm install vue-router@4
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-2、第二步-定义路由组件)1.2、第二步：定义路由组件

在 `src/views/`目录下新建当前应用需要用到的所有路由组件（也称视图组件）

```js
views / Home.vue; // Home 组件
views / About.vue; //  About 组件
views / News.vue; // News 组件
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-3、第三步-创建路由实例)1.3、第三步：创建路由实例

在`src/router/`目录下新建`router.js`文件，此文件最终对外暴露`router`路由实例

```js
import { createRouter, createWebHashHistory } from "vue-router";

// createRouter方法，用来创建路由实例，参数为一个对象，用来配置路由相关信息
const router = createRouter({
  // 路由模式，createWebHashHistory()创建 hash 模式。
  history: createWebHashHistory(),
});

// 对外暴露router实例
export { router };
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-4、第四步-配置路由映射-路径和组件映射关系)1.4、第四步：配置路由映射 - 路径和组件映射关系

- ①、导入路由组件
- ②、定义路由：路径与组件的映射关系
- ③、在`createRouter`方法的参数中配置`routes`选项

```js
import { createRouter, createWebHashHistory } from "vue-router";

// 1、导入路由组件 -------------------
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";

// 2、定义一些路由： 路径和组件映射关系 -------------------
const routes = [
  {
    path: "/", // 路径
    component: Home, // 路径对应渲染的组件
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/news",
    component: News,
  },
];

// createRouter方法，用来创建路由实例，参数为一个对象，用来配置路由相关信息
const router = createRouter({
  // 路由模式，createWebHashHistory()创建 hash 模式。
  history: createWebHashHistory(),
  // 3、配置routes -------------------
  routes, // 'routes':routes的缩写
});

// 对外暴露router实例
export { router };
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-5、第五步-全局注册-router-实例)1.5、第五步：全局注册 router 实例

在`main.js`中利用 app.use 方法注册 router 路由实例

```js
import { createApp } from "vue";
import App from "./App.vue";
// 导入router实例
import { router } from "./router/router.js";
const app = createApp(App);
// 全局注册路由
app.use(router);
app.mount("#app");
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-6、第六步-使用路由通过-router-link-和-router-view)1.6、第六步：使用路由通过`<router-link>`和`<router-view>`

可以在`App.vue`组件中调用`<router-link>`和`<router-view>`组件使用路由

- `<router-link>` 组件用来创建链接，最终会生成`<a>`标签形式的导航
- `<router-view>`组件用来显示与 Url 对应的组件内容

```html
<!--App组件-->
<template>
  <ul class="router-link">
    <!--创建a标签链接  to属性最终转换为a标签的href属性值-->
    <li><router-link to="/">网站首页</router-link></li>
    <li><router-link to="/about">关于我们</router-link></li>
    <li><router-link to="/news">新闻中心</router-link></li>
  </ul>

  <div class="router-view">
    <!--url对应组件内容渲染出口-->
    <router-view></router-view>
  </div>
</template>

<style>
  .router-link {
    display: flex;
    justify-content: center;
    text-align: center;
    list-style: none;
    margin-top: 30px;
  }

  .router-link li {
    margin: 0 10px;
  }

  .router-link li a {
    color: #000;
    font-size: 16px;
    text-decoration: none;
  }

  .router-link li a:hover {
    color: tomato;
  }
  .router-view {
    width: 80%;
    margin: 30px auto;
    font-size: 20px;
    min-height: 300px;
    background-color: rgb(251, 249, 249);
  }
</style>
```

> 经过以上 6 步，最终我们完成了刚开始我们期望的效果。

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、路由模式)2、路由模式

`createRouter`方法参数对象的`history`属性用来指定路由的模式，当`history`的值为

- `createWebHashHistory()` 创建 hash 路由模式
- `createWebHistory()` 创建 history 路由 模式

```js
const router = createRouter({
  // history属性指定路由模式
  history: createWebHashHistory(), // 创建 hash 路由 模式。
  //  history: createWebHistory(),  // 创建 history 路由 模式
});
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、链接激活时-class-类名)3、链接激活时 Class 类名

默认情况下，链接被激活时会加上`router-link-active` Class 类名，比如前面提到的案例

![image-20230802180836683](https://www.arryblog.com/assets/img/image-20230802180836683.2404cddb.png)

我们可以通过添中`router-link-active`Class 类名，来控制被激活链接的样式

```css
/* 在上面案例的基础上，在style标签中 添加如下css样式 */
.router-link li a.router-link-active {
  color: tomato;
}
```

> 添加以上 css 后，最终渲染效果如下

![GIF2023-8-218-14-48](https://www.arryblog.com/assets/img/GIF2023-8-218-14-48.1792bcc3.gif)

我们还可以设置`<router-link>`组件的`active-class`属性值来更改链接激活时使用的 CSS 类名

```css
/* 我们修改上面案例中的如下css样式 */
.router-link li a.router-link-active {
  color: tomato;
}
/* 修改成 */
.router-link li a.active {
  color: tomato;
}
```

> 以上代码，最终渲染后效果如下：

![image-20230802182113674](https://www.arryblog.com/assets/img/image-20230802182113674.f40c316c.png)

> 关于什么情况下会加上的`router-link-exact-active`Class 类名，及有什么用，后面会讲到

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4、去掉路由历史记录)4、去掉路由历史记录

如果想在页面切换时，不留下历史记录，也就是在浏览器最顶部左侧不会出现前进和后退按扭。我们只需要在`<router-link>`标签上添加`replace`属性（表示用当前路径替换之前路径）

> 修改以上案例中`<App>`组件中 所有`<router-link>`标签内容如下：

```html
<ul class="router-link">
  <!--创建a标签链接  to属性最终转换为a标签的href属性值-->
  <li>
    <router-link to="/" replace active-class="active">网站首页</router-link>
  </li>
  <li>
    <router-link to="/about" replace active-class="active"
      >关于我们</router-link
    >
  </li>
  <li>
    <router-link to="/news" replace active-class="active">新闻中心</router-link>
  </li>
</ul>
```

最终效果如下，注意观察，导航切换时，浏览器最顶部前进和后退按扭一直是不灰色，不可点状态。

![GIF2023-8-218-31-06](https://www.arryblog.com/assets/img/GIF2023-8-218-31-06.c1be8089.gif)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5、访问router实例和当前路由route)5、访问`router`实例和当前路由`route`

通过调用 `app.use(router)`注册 vue-router 插件后。

**选项式 API 中，我们可以在任意的组件中以**

- `this.$router`访问到 router 实例 (即：`createRouter()`方法返回的 router 实例)
- `this.$route`访问到当前路由

**组合式 API 中，我们可以在任意组件中，调用`vue router`提供的**

- `useRouter` 函数访问到 router 实例
- `useRoute` 函数访问到当前路由

> 在任意组件的模板中，通过

- `$router` 访问到 router 实例
- `$route` 访问到当前路由

> [路由实例方法查阅教程 (opens new window)](https://v3.router.vuejs.org/zh/api/#router-实例方法)| [路由对象属性查阅教程(opens new window)](https://v3.router.vuejs.org/zh/api/#路由对象属性)

用以下代码，替换前面案例中的`About`组件内容

```html
<script>
  export default {
    data() {
      // this.$router.currentRoute.value.path 当有url后面的路径值
      console.log("选项式API：路由实例", this.$router.currentRoute.value.path);
      console.log("选项式API：当前路由信息", this.$route.path);
      return {};
    },
  };
</script>
<script setup>
  import { useRouter, useRoute } from "vue-router";
  console.log("组合式API：路由实例", useRouter().currentRoute.value.path);
  console.log("组合式API：当前路由信息", useRoute().path);
</script>

<template>
  <div>关于我们</div>
  <div>路由实例：{{ $router.currentRoute.value.path }}</div>
  <div>当前路由的路径：{{ $route.path }}</div>
</template>
```

> 最终渲染后效果如下：

![image-20230802190555269](https://www.arryblog.com/assets/img/image-20230802190555269.127c0c95.png)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_6、嵌套路由)6、嵌套路由

以下图中展示的效果就是一个嵌套路由效果

- 在点击`News`导航时，会显示对应组件的内容，在该组件中还存在二级导航，点击对应二级导航时，会加载不同的组件来显示不同内容。
- 我们把`/home`、`/about`、`/news`看作是一级路由，则`/news/tab1`、`/news/tab2`、`/news/tab3`可以看成是二级路由。
- 并且这些路由显示的内容是嵌套在`/news`路由所在组件中，所以我们在定义路由时，需要把这些二级路由作为`/news`路由的子路由。

![GIF2023-8-219-03-19](https://www.arryblog.com/assets/img/GIF2023-8-219-03-19.199e6b47.gif)

以下代码为`/news`一级路由定义了三个子路由 ,记得先用`import`导入`Tab1`、`Tab2`、`Tab3`（用以下代码替换前面案例中的对应代码）

```js
{
    path: "/news",
    component: News,
     // 所有子路由的书写方式和父路由一样，父路由对应子路由按以下方式写在children数组中
    children: [
        {
            // 这里不需要加 / ，加/ 表示的是绝对路径  http://www.xx.com/tab1
            // 不加表示相对父路由而言  http://www.xx.com/news/tab1
            path: "tab1",
            component: Tab1,
        },
        {
            path: "tab2",
            component: Tab2,
        },
        {
            path: "tab3",
            component: Tab3,
        }

    ]
}
```

子路由是在父路由组件中显示的，所以我们需要在父路由组件`News`中来定义子路由链接及路由组件内容渲染出口

> 用以下代码替换掉前面案例中的`News.vue`组件内容。

```html
<!--News.vue 组件-->
<template>
  <div class="menu">
    <router-link to="/news/tab1">最新动态</router-link> |
    <router-link to="/news/tab2">热门推荐</router-link> |
    <router-link to="/news/tab3">历史动态</router-link>
  </div>

  <div class="main">
    <router-view />
  </div>
</template>

<style scoped>
  .menu a {
    font-size: 16px;
  }

  .router-link-active {
    color: #fff;
    background-color: skyblue;
    padding: 5px;
    border-radius: 10px;
  }
</style>
```

按以上两步操作后，就可以实现如上图所示案例效果。

> 关于更深层级的路由嵌套和上面一样，一层一层嵌套下去就好。

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_7、链接精确激活时-class-类名)7、链接精确激活时 Class 类名

默认情况下，链接精确激活时会加上`router-link-exact-active` Class 类名。

**链接精确激活与链接激活的区别**

- 精确激活： 当地址栏链接为`/news/tab1`时，则只有链接`/news/tab1`对应的 a 标签会被添加`router-link-exact-active` Class 类，此时`/news/tab1`链接为精确激活状态
- 激活：当地址栏链接为`/news/tab1`时，链接`/news`和`/news/tab1`对应的 a 标签会被添加`router-link-active` Class 类名，此时`/news/tab1`和`/news`链接为激活状态

> 激活状态的链接中包含精确激活状态的链接。

下图是链接地址为`/news/tab`时的截图，我们可以看`/news`和`/news/tab1`对应的 a 标签都加上激活状态的 class 类名，但只有`/news/tab1`对应的 a 标签加上了精确激活的 class 类名

![image-20230802190846766](https://www.arryblog.com/assets/img/image-20230802190846766.9926de3b.png)

如果精确激活的链接样式包含了激活链接的样式，则我们只需要针不同部分的样式，给精确激活的链接添加`router-link-exact-active`类名来实现。

**exact-active-class 属性**

我们可以通过`<router-link>`标签的 `exact-active-class`属性来自定义精确激活链接时添加的 Class 类名

```html
<router-link to="/news/tab1" exact-active-class="exact-active"
  >最新动态</router-link
>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_8、命名路由)8、命名路由

在定义路由时，我们可以为路由添加`name`属性来指定路由的名字

```js
const routes = [
    {

        name: 'home', // 路由名字，名字自定义，不一定是home
        path: "/", // 路径
        component: Home, // 路径对应渲染的组件
    },
    {
        name: 'about',
        path: "/about",
        component: About,

    },
    {
        name: 'news',
        path: "/news",
        component: News,
        children: [
            {
                name:'tab1' // 路由名字
                path: "tab1",
                component: Tab1,
            },
            {
                path: "tab2",
                component: Tab2,
            },
            {
                path: "tab3",
                component: Tab3,
            }

        ]
    }
]
```

有了`name`属性后，我们可以向`<rotuer-link>`组件的 to 属性传递一个对象，来实现路由的跳转。

```html
<!--以下方式，会根据name属性来找到指定的路由中的path值，实现路由跳转-->
<router-link :to="{ name: 'home' }" active-class="active">Home</router-link> |
<router-link :to="{ name: 'about' }" active-class="active">About</router-link> |
<router-link :to="{ name: 'news' }" active-class="active">News</router-link>

<!--以上代码，与以下代码实现的效果一模一样-->
<router-link to="/" active-class="active">Home</router-link> |
<router-link to="/about" active-class="active">About</router-link> |
<router-link to="/news" active-class="active">News</router-link>
```

当`<router-link>`to 的属性值为一个对象时，name 属性与 path 属性只需要写一个即可

```html
<!--以下写法是错的-->
<router-link :to="{name:'home',path:'/'}" active-class="active"
  >Home</router-link
>

<!--以下两种写法是对的-->
<router-link :to="{name:'home'}" active-class="active">Home</router-link> |
<router-link :to="{path:'/'}" active-class="active">Home</router-link> |
```

注：

当我们的路由名很长很复杂时，在`<router-link>`标签中可以通过`name`属性来简化，而不需要书写`path`属性

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_9、路由重定向)9、路由重定向

当我们访问某个路径时，我们希望他能重定向到其它的路径，比如访问`/news`时，希望重定向到到`/news/tab1`。

我们就可以在路由的配置中添加`redirect`属性来实现路由的重定向。

- 重定向的目标可以是一个**字符串路径**

```js
{
        name: 'news',
        path: "/news",
        component: News,
        redirect: "/news/tab1",  // 重定向到 /news/tab1
        children: [
            {
                name: 'tab1',
                path: "tab1",
                component: Tab1,
            },
           // ....此处省略部分代码
        ]
    }
```

- 重定向的目标可以是一个命名的路由 （采用路由对象写法）

```js
{
        name: 'news',
        path: "/news",
        component: News,
        redirect: { name: 'tab1' },  // 重定向到路由命名name所在的路径
        children: [
            {
                name: 'tab1',
                path: "tab1",
                component: Tab1,
            },
           // ....此处省略部分代码
        ]
    }
```

- 重定向的目标也可以是一个方法，该方法的返回值可以是前面提到的 **”字符串路径“** 或 **”路由对象“** 中的一种

```js
{
        name: 'news',
        path: "/news",
        component: News,
       redirect: (to) => {
 // to为目标路由对象，此处为/news路由对象
//  {fullPath: '/news', hash: '', query: {…}, name: 'news', path: '/news', …}
            console.log(to)
            return { path: '/news/tab1' }
        }
        children: [
            {
                name: 'tab1',
                path: "tab1",
                component: Tab1,
            },
           // ....此处省略部分代码
        ]
    }
```

以上三种方式，最终都能实现，当我们访问`/news`路由时，会重定向到`/new/tab1`路由，具体效果如下

![GIF2023-8-219-24-55](https://www.arryblog.com/assets/img/GIF2023-8-219-24-55.d07a785b.gif)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_9-1、注意事项)9.1、注意事项

如果重定向的路由**没有子路由**，则该路由中的`component`可以省略不写，因为它从来没有被直接访问过

```js
const routes = [
    {
        path:"/"
        redirect:"/home"
        // 此处可以没有component
    },
    {
        name: 'home', // 名字自定义，不一定是home
        path: "/home", // 路径
        component: Home,
    }
]
```

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#二、vue-router-路由传参)二、vue Router 路由传参

在路由进行跳转时，我们可以通过传参的形式为当前路由携带相关数据。

> 路由传参有以下两种形式：

- query 参数
- params 参数

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、路由的-query-参数)1、路由的 query 参数

query 参数最终会以 `key = value` 键值对的形式出现在地址 `？` 后面。

![image-20230531001454243](data:image/png;base64,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)

> 我们来看下面这个路由

```js
const routes = [
  {
    name: "user",
    path: "/user",
    component: User,
  },
  // ....
];
```

> 我们在定义路由导航时，就可以通过以下两种方式来传递 query 参数

- **query 参数的两种写法**

直接在址后面以`key=value`形式携带传递的数据

```html
<!--id=001 为传递的参数数据-->
<router-link to="/user?id=001">用户中心</router-link>
```

将`to`属性的值定义为一个路由对象，通过`query`字段来传递参数

```html
<router-link
  :to="{
                  path: '/user',
                  query: {
                	  id: '001',
                  	   title:'abc'
                  }
                  }"
  >用户中心</router-link
>

<!-- 也可以采用如下写法 -->
<router-link
  :to="{
                  name: 'user',
                  query: {
                 	 id: '001'
                  }
                  }"
  >用户中心</router-link
>
```

- **接受 query 参数**

在`User.vue`组件中，接受传递的 query 参数，代码如下：

```html
<script setup>
  import { useRoute } from "vue-router";
  // 当前路由对象
  const route = useRoute();
  // 读取query参数
  console.log(route.query.id); // 001
</script>
<template>
  <div>用户中心</div>
  <!--$route.query.id 读取传递的id，值为 001-->
  <div>query参数：{{ $route.query.id }}</div>
  <div>query参数：{{ route.query.id }}</div>
</template>
```

> 最终`User.vue`组件渲染后效果如下：

![image-20230803130053537](https://www.arryblog.com/assets/img/image-20230803130053537.25740485.png)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1-1、实战应用-根据-query-参数渲染数据)1.1、实战应用：根据 query 参数渲染数据

- 当我们点击不同的新闻标题时，需要把当前新闻的`id`作为参数传递给到`Detail`组件
- `Detail`组件接受传递过来的`id`值，向后端发请求获取当前 Id 对应的新闻详细内容，然后渲染在页面中

![GIF2023-8-314-00-51](https://www.arryblog.com/assets/img/GIF2023-8-314-00-51.989268b9.gif)

**实现步骤**

- 在前面项目的基础上，在`views/news`目录下新建`Detail`组件
- 在`routes`配置中，`/news/detail`路由定义为`/news`的子路由，因为`/news/detail`路由对应的组件最终被渲染后显示在`News`组件中

```js
const routes = [
  // ...省略部分代码
    {
        name: 'news',
        path: "/news",
        component: News,
        redirect: { name: 'tab1' },  // 重定向到路由命名name所在的路径
        children: [
            // 因为该组件内容显示在  News组件中，所以定义为他的子路由
            {
                name: "detail",
                path: 'detail',
                component: Detail

            },
            {
                name: 'tab1',
                path: "tab1",
                component: Tab1,
            }
            // ....省略部分代码

        ]
    }
```

- 修改组件 Tab1 的内容如下

```html
<script setup>
  import { reactive } from "vue";
  const list = reactive([
    {
      id: "001",
      title: "新闻标题1111",
    },
    {
      id: "002",
      title: "新闻标题2222",
    },
    {
      id: "003",
      title: "新闻标题3333",
    },
  ]);
</script>

<template>
  <div>最新动态内容</div>
  <ul>
    <li v-for="{ id, title } in list">
      <!--  方式一
            <RouterLink :to="`/news/detail?id=${id}`">{{ title }}</RouterLink> 
			-->
      <!--以下把path去掉,改用name="detail" 也可以-->
      <RouterLink
        :to="{
                path: '/news/detail',
                query: {
                    id: `${id}`
                }
            }"
        >{{ title }}</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped>
  ul li {
    line-height: 35px;
    border-bottom: 1px dashed #ddd;
  }

  ul li a {
    font-size: 16px;
    color: #666;
  }
</style>
```

- 在`Detail`组件中接受传递的`id`参数，并根据 id 查找满足条件的新闻，将新闻标题和内容显示在页面中

```html
<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  // 获取当前路由
  const route = useRoute();
  // 接受传递的参数id
  const id = route.query.id;
  // 保存请求回来的新闻详情
  const info = ref({});
  // 根据id来发请求，获取当前新闻的详细内容
  axios
    .get(
      `https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/detail/${id}`
    )
    .then((res) => {
      info.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
</script>

<template>
  <h3>{{ info.title }}</h3>
  <div class="main">{{ info.content }}</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、路由的-params-参数)2、路由的 params 参数

以`params`形式传参，需要在配置路由时，以`:key`形式先占位。

> 如下：

```js
const routes=[
    // ....
            {
                name:'detail',
                 // 能匹配detail/12  detail/ab    不能匹配detail/12/b
                path:'detail/:id',
                component:Detail
            },
            {
			   path:'add/:id/:typeid
                // path:'add/:id/a/:typeid'
                component:Add'
            }
            // ......
        ]
    }
    // ....
]
```

> 在`<router-link>`组件中，to 属性的值可以写成一个路由对象，`params`属性表示传递的参数。

注意：

以 params 形式传参时，只能通过`name`属性来指定要跳转的链接，不能用`path`属性。

```html
<RouterLink
  :to="{
                name: 'detail',
                params: {
                    id: '001'
                }
            }"
  >{{ title }}</RouterLink
>

<!--以下为错误写法,params只能与name属性配合使用 -->
<RouterLink
  :to="{
                path: '/news/detail/',
                params: {
                    id: '001'
                }
                  }"
  >{{ title }}</RouterLink
>
```

在组件中可以通过`params.id`形式来访问到传递的 params 参数 id 等。

```html
<script setup>
  import { useRouter, useRoute } from "vue-router";
  console.log("参数id:", useRoute().params.id);
</script>

<template>
  <div>params参数：{{ $route.params.id }}</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2-1、实战应用-根据-params-参数渲染数据)2.1、实战应用：根据 params 参数渲染数据

针以前面的`query`参数案例，我们只需做以下相关修改，就可以实现与之相同的效果

- 修改路由配置，在路由中添加`:id`占位符

```js
const routes = [
  // .....
  {
    name: "news",
    path: "/news",
    component: News,
    redirect: { name: "tab1" }, // 重定向到路由命名name所在的路径
    children: [
      {
        name: "detail",
        path: "detail/:id",
        component: Detail,
      },
      // ....
    ],
  },
];
```

- 修改`Tab1.vue`中`<route-link>`组件内容如下： （把 query 改成了 params)

```html
<RouterLink
  :to="{
                name: 'detail',
                params: {
                    id: `${id}`
                }
            }"
  >{{ title }}</RouterLink
>
```

- 将`Detail.vue`组件中的`route.query.id` 修改成`route.params.id`即可

```js
// 接受传递的参数id
const id = route.params.id;
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、路由的-props-配置)3、路由的 props 配置

路由的 props 配置可以让路由组件以 props 的形式来接受传递的 params 或 query 参数，写法更简洁。

> 在没有设置`props`属性前，在路由组件中只能以如下方式接受`params`参数

```html
<script setup>
  import { useRouter, useRoute } from "vue-router";
  console.log("参数id:", useRoute().params.id);
</script>

<template>
  <div>参数：{{ $route.params.id }}</div>
</template>
```

有了 props 配置后，可以以 props 形式来接受传递的参数，如下写法更简洁

```html
<script setup>
  // 这里的属性名，必需要与路由组件的参数名相同
  const props = defineProps(["id"]);
  console.log("id参数", props.id);
</script>

<template>
  <div>参数：{{ props.id }}</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3-1、props-布尔模式)3.1、props 布尔模式

当 props 的值为布尔值 true 时，相当于`route.params`将被设置为组件的`props`。

> 即：把所有 params 参数作为 props 传递给路由组件。

```js
// 定义一些路由
const routes = [
  // ...
  {
    name: "detail",
    path: "detail/:id",
    component: Detail,
    // route.params将设置为组件的props
    // 相当于在组件中 <Detail v-bind:=route.params />
    props: true,
  },
];
```

我们可以在`Deatil`组件中以 props 的形式来接受传递的`params`参数

```html
<script setup>
  import { ref } from "vue";
  import axios from "axios";

  // 接受params形式传递的参数 ----------------------
  const props = defineProps(["id"]);
  const id = props.id;

  const info = ref({});

  // 根据id来发请求，获取当前新闻的详细内容
  axios
    .get(
      `https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/detail/${id}`
    )
    .then((res) => {
      info.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
</script>

<template>
  <h3>{{ info.title }}</h3>
  <div class="main">{{ info.content }}</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3-2、props-对象模式)3.2、props 对象模式

当`props`是一个对象时，这个对象会被设置为组件的 props。

```js
// 定义一些路由
const routes = [
  // ...
  {
    name: "detail",
    path: "detail/:id",
    component: Detail,
    // route.params将设置为组件的props
    // 相当于在组件中 <Detail v-bind:={a:1,b:2} />
    props: { a: 1, b: 2 },
  },
];
```

我们可以在路由组件中以`props`的形式来接受 props 配置传递的数据

```html
<script setup>
  const props = defineProps(["a", "b"]);
  console.log("参数a", props.a); // 1
  console.log("参数b", props.b); // 2
</script>

<template>
  <div>关于我们</div>
  <div>参数a：{{ props.a }}</div>
  <div>参数b：{{ props.b }}</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3-3、props-函数模式)3.3、props 函数模式

当 props 的值是一个函数时，允许返回值是一个 props 对象，函数的第一个参数为当前`route`路由对象。

> 我们可以利用 props 的函数模式，实现以下功能：

- 将传递的`query`参数作为 props 传递给路由组件
- 将传递的`query`参数与静态值一起作为 props 传递给路由组件
- 将传递的`params`参数与静态值一起作为 props 传递给路由组件

**将传递的`query`参数作为 props 传递给路由组件**

- 定义路由导航

```html
<router-link to="/about?id=001">关于我们</router-link>
```

- 定义路由

```js
const routes = [
  // .....
  {
    name: "about",
    path: "/about",
    component: About,
    // 写法一 将query参数作为props传递
    props: (route) => route.query,
  },
];
```

- 路由组件中通过 props 接受传递的 query 参数

```js
const props = defineProps(['id');
```

**将传递的`query`参数与静态值一起作为 props 传递给路由组件**

- 定义路由导航

```html
<router-link to="/about?id=001&title=123">关于我们</router-link>
<!-- 或 -->
<router-link
  :to="{
                  name: 'about',
                  query: {
                      id: '001',
                      title: '123'
                  }
                  }"
  >关于我们</router-link
>
```

- 定义路由

```js
const routes = [
  // ....
  {
    name: "about",
    path: "/about",
    component: About,
    alias: "/myabout",
    // 将query参数与静态值组合，一起作为props传递
    props: (route) => ({
      id: route.query.id,
      title: route.query.title,
      msg: "其它数据",
    }),
  },
];
```

- 路由组件中通过 props 接受传递的 query 参数

```js
const props = defineProps(["id", "title", "msg"]);
```

**将传递的`params`参数与静态值一起作为 props 传递给路由组件**

- 定义路由导航

```html
<router-link
  :to="{
                  name: 'about',
                  params: {
                      id: '001',
                      title: '1233'
                  }
                  }"
  >关于我们</router-link
>
```

- 定义路由

```js
const routes = [
  // ....
  {
    name: "about",
    path: "/about/:id/:title",
    component: About,
    alias: "/myabout",
    // 写法三：将params参数与静态值组合，一起作为props传递
    props: (route) => ({
      id: route.params.id,
      title: route.params.title,
      msg: "其它数据",
    }),
  },
];
```

- 路由组件中通过 props 接受传递的 query 参数

```js
const props = defineProps(["id", "title", "msg"]);
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4、响应路由参数的变化)4、响应路由参数的变化

我们来看下面这个带参的路由

```js
const routes = [
  {
    name: "news", // 路由名
    path: "/news/:id", // 路径
    component: News, // 路径需要渲染的组件
  },
];
```

当用户从`/news/1001`导航到`/news/1002`或`/news/1003`时，**相同的组件实例将被重复使用**。

因为 3 个路由都渲染同个`News`组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会被调用**，所以当路由的参数发生变化时，在`<script setup>`中并不能获取到变化后的参数。

```html
<script setup>
  import { useRoute } from "vue-router";
  const route = useRoute();
  const id = route.params.id;
  const url = "http://wwww.xxx.com/...."; // 请求数据源
  // 只能在刚进到/news/1001时才能拿到id=1001。
  // 后面从从/news/1001导航到/news/1002或/news/1003时,拿不到变化后的id

  axios.get(`${url}${id}`).then((res) => {
    // 发请求拿数据
  });
</script>
```

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `route` 对象上的任意属性

```html
<script setup>
  import { useRoute } from "vue-router";
  const route = useRoute();
  const url = "http://wwww.xxx.com/...."; // 请求数据源

  // 侦听 route.params的变化
  watch(
    () => route.params,
    (newValue, oldValue, onCleanup) => {
      // 对路由的变化做出响应
      axios.get(`${url}${newValue.id}`).then((res) => {
        // 发请求拿数据
      });
    }
  );
</script>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4-1、实战应用)4.1、实战应用

我们来实现如下效果，当用户从`/news/1001`导航到`/news/1002`或`/news/1003`时都能拿到变化后的参数，然后根据参数的值来发请求获取新闻数据列表。

![GIF2023-8-320-06-15](https://www.arryblog.com/assets/img/GIF2023-8-320-06-15.115eacaa.gif)

- `src/router/router.js` 创建路由实例

```js
// 1、从vue-router中解构两个方法
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import News from "../views/News.vue";

// 定义一些路由：路径与组件的映射关系....
const routes = [
  {
    name: "home",
    path: "/",
    redirect: "/news/1001",
  },
  {
    name: "news",
    path: "/news/:id",
    component: News,
  },
];

// 创建router 路由实例
const router = createRouter({
  // 路由模式
  //  history:createWebHashHistory(),  // hash模式的路由
  history: createWebHistory(),
  // 配置一些路由
  // routes:routes
  routes,
});

// 对外暴露
export { router };
```

- `App.vue`中，创建路由导航

```html
<template>
  <ul class="router-link">
    <li>
      <router-link to="/news/1001">最新动态</router-link>
    </li>
    <li>
      <router-link to="/news/1002">执门推荐</router-link>
    </li>
    <li>
      <router-link to="/news/1003">历史动态</router-link>
    </li>
  </ul>

  <!-- url对应组件内容输出口 -->
  <div class="router-view">
    <router-view></router-view>
  </div>
</template>
<style>
  .router-link {
    display: flex;
    justify-content: center;
    text-align: center;
    list-style: none;
    margin-top: 30px;
  }

  .router-link li {
    margin: 0 10px;
  }

  .router-link li a {
    color: #000;
    font-size: 16px;
    text-decoration: none;
  }

  .router-link li a:hover {
    color: tomato;
  }

  .router-link li a.router-link-active {
    color: tomato;
  }

  .router-view {
    width: 80%;
    margin: 30px auto;
    font-size: 20px;
    min-height: 300px;
    background-color: rgb(251, 249, 249);
  }
</style>
<script setup>
  import { ref, watch } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  const route = useRoute();
  const list = ref([]);
  const url =
    "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/new/list/";

  // 用来取消请求的对象
  let controller = null;

  // 侦听器侦听 route.params 的变化
  watch(
    () => route.params,
    (newValue, oldValue, onCleanup) => {
      controller = new AbortController();
      // 发请求，拿数据
      axios
        .get(`${url}${route.params.id}`, {
          // 配置取消请求
          signal: controller.signal,
        })
        .then((res) => {
          list.value = res.data.data;
        })
        .catch((err) => {
          console.log(err.message);
        });

      // 取消请求
      function cancle() {
        controller.abort();
      }

      // 取消之前的请求
      onCleanup(cancle);
    },
    {
      immediate: true,
    }
  );
</script>

<template>
  <ul>
    <li v-for="{ id, title } in list">
      <router-link to=""> {{ title }}</router-link>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    padding: 20px;
  }

  ul li {
    line-height: 35px;
    border-bottom: 1px dashed #ddd;
    text-indent: 2em;
  }

  ul li a {
    color: #333;
    text-decoration: none;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5、总结)5、总结

本小节重点掌握路由传参和路由的 props 配置

**路由传参两种方式**：路由传递参数有 **query 传参** 和 **params 传参** 两种方式。

> 具体如下：

| 传参方式    | 特点与用法                                                                                                                                                                   |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query 参数  | query 传递显示参数，在地址栏中明确知道那部分是参数 query 参数在`<script setup>`中通过`useRoute().query.id`形式获取，在模板中以`$route.query.id`形式获取                      |
| params 参数 | parmas 传递，不会显示参数，所以 params 传参相比 query 传参更安全一些 params 参数在`<script setup>`中通过`useRoute().params.id`形式获取，在模板中以`$route.params.id`形式获取 |

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5-1、路由-props-配置)5.1、路由 props 配置

路由 props 配置的主要作用：

- 使路由组件能以 props 的形式来接受传递的参数，写法更简洁。
- 使路由组件可以以 props 形式接受一些静态数据。

> 路由 props 配置的三种写法，如下：

| 值的三种写法 | 应用场景                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------- |
| 布尔值       | 当我们需要把`params`参数作为 props 传递给路由组件时，props 的值为`true`                                  |
| 对象写法     | 当我们需要给路由组件传递一些静态的 props 时，可以采用对象写法                                            |
| 函数写法     | 当我们需要把路由的`query参数`或`params`参数与一些静态值一起作为 props 传递给路由组件时，可以采用函数写法 |

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5-3、响应路由参数的变化)5.3、响应路由参数的变化

当路由带参时，比如`/news/:id`路由，当用户从`/news/1001`导航到`/news/1002`时，**相同的组件实例将被重复使用**，所以组件的生命周期钩子不会被调用，这样造成没有办法获取到变化后的参数值。

要对同一个组件中参数的变化做出响应的话，你可以简单地 watch `$route` 对象上的任意属性。

```js
import { useRoute } from "vue-router";
const route = useRoute();
watch(
  () => router.params,
  () => {}
);
```

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#三、路由别名)三、路由别名

在路由配置时，我们可以通过`alias`属性为路由取别名。

- 当路由`/about`的别名为`/myabout`时，我们通过地址`/myabout`访问的是`/about`路由的内容，但路由地址显示的是`/myabout`
- 当路由`/news/tab2`的别名为`/newsInfo`时，我们通过地址`/newsInfo`访问的是`/news/tab2`路由的内容，但地址显示的是`/newsInfo`

> 通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、别名是一个绝对或相对路径)1、别名是一个绝对或相对路径

别名可以是一个以`/`开头的绝对路径，也可以是一个没有`/`开头的相对路径

```js
const routes = [
  	// 省略部分代码......
    {
        name: 'about',
        path: "/about",
        component: About,
        alias: "/myabout"  // 别名 绝对路径，访问地址 /myabout
    },
    {
        name: 'news',
        path: "/news",
        component: News,
        redirect: { name: 'tab1' },
        children: [

                name: 'tab1',
                path: "tab1",
                component: Tab1,
            },
            {
                path: "tab2",
                component: Tab2,
                alias: '/newsInfo',  // 别名 ，绝对路径 访问地址 /newsInfo
            },
            {
                path: "tab3",
                component: Tab3,
                alias:"commonInfo"  // 别名，相对路径 访问地址 /news/commonInfo
            }

        ]
    }
]
```

接下来，我们可以把页面中访问路由的地址修改为访问别名，如下

```html
<ul class="router-link">
  <li><router-link to="/">网站首页</router-link></li>
  <li><router-link to="/myabout">关于我们</router-link></li>
  <li><router-link to="/newsInfo">热门推荐</router-link></li>
  <li><router-link to="/news/commonInfo">历史动态</router-link></li>
</ul>
```

> 最终渲染效果如下：

![image-20230803204324259](https://www.arryblog.com/assets/img/image-20230803204324259.9ff0912a.png)

![image-20230803204421894](https://www.arryblog.com/assets/img/image-20230803204421894.ade058dd.png)

![image-20230803204444342](https://www.arryblog.com/assets/img/image-20230803204444342.910877b7.png)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、别名是一个数组)2、别名是一个数组

别名可以由多个以相对或绝对路径组成的数组

> 路由`/news/tab3`的别名是一个数组，如下：

```js
const routes = [
  // ......
  {
    name: "news",
    path: "/news",
    component: News,
    redirect: { name: "tab1" },
    children: [
      // ......
      {
        path: "tab3",
        component: Tab3,
        // /Info  /news/commonInfo   最终访问的都是 /news/tab3路由的内容
        alias: ["/Info", "commonInfo"],
      },
    ],
  },
];
```

> 我们通过`/Info` `/news/commonInfo` 最终访问的都是`/news/tab3`路由的内容

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、别名携带参数)3、别名携带参数

如果路由有参数，一定要在任何绝对别名中包含它们

```js
const routes = [
  // .....
  {
    name: "about",
    path: "/about/:id",
    component: About,
    // 可以通过 /about/1001  、 /myabout/1001/   、 /1001  访问到about关于我们页面
    alias: [
      "/myabout/:id", // 绝对路径必须带上参数
      "/:id",
    ],
  },
];
```

> 以下导航访问的都是同一个页面关于我们

```html
<li><router-link to="/about/1001">关于我们</router-link></li>
<li><router-link to="/myabout/1001">关于我们</router-link></li>
<li><router-link to="/1001">关于我们</router-link></li>
```

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#四、命名视图)四、命名视图

本小节我们讲解命名视图和嵌套命名视图

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、命名视图)1、命名视图

有时候想同时（同级）展示多个视图，而不是嵌套展示。例如创建一个布局，有 header（头部）、main（主内容）、footer（底部）三个视图，这个时候命名视图就派上用场了。

> 你可以在界面中拥有多个单独命名视图，而不是只有一个单独的出口，如下：

```html
<router-view name="Header"></router-view>
<router-view></router-view>
<!-- 没有name属性，默认为name='default'  上面写法等同于下面写法-->
<!-- <router-view name="default"></router-view> -->

<router-view name="Footer"></router-view>
```

> 如果`router-view` 没有设置 name 名字，那么默认为`name="default"` 。

一个视图使用一个组件渲染，因此对于同个路由，有多个视图就需要多个组件渲染。确保正确使用 `components` 配置 (带上 **s**)：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: Main,
        // Header: Header 的缩写
        Header,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        Footer,
      },
    },
  ],
});
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、命名视图应用)2、命名视图应用

我们利用命名视图实现如下图所示的效果

![GIF2023-8-322-53-49](https://www.arryblog.com/assets/img/GIF2023-8-322-53-49.d7a92ef7.gif)

- `App.vue`

```html
<script setup>
  import Header from "./views/Header.vue";
</script>
<template>
  <header></header>
  <!--多个命名视图, 注意这里的名字采用的是小写-->
  <router-view name="header"></router-view>
  <router-view></router-view>
  <router-view name="footer"></router-view>
</template>
```

- `Header.vue`

```html
<template>
  <div class="header">
    <ul class="router-link">
      <li><router-link to="/">网站首页</router-link></li>
      <li><router-link to="/about">关于我们</router-link></li>
      <li><router-link to="/news">新闻中心</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
  .header {
    height: 50px;
  }

  .router-link {
    display: flex;
    justify-content: center;
    text-align: center;
    list-style: none;
  }

  .router-link li {
    line-height: 50px;
    margin: 0 10px;
  }

  .router-link li a {
    color: #000;
    font-size: 16px;
    text-decoration: none;
  }

  .router-link li a:hover {
    color: tomato;
  }

  .router-link li a.router-link-active {
    color: tomato;
  }
</style>
```

- `router/router.js`

```js
import { createRouter, createWebHistory } from "vue-router";

import HomeHeader from "../views/HomeHeader.vue";
import HomeMain from "../views/HomeMain.vue";
import HomeFooter from "../views/HomeFooter.vue";

import AboutHeader from "../views/AboutHeader.vue";
import AboutMain from "../views/AboutMain.vue";

import NewsMain from "../views/NewsMain.vue";

const routes = [
  {
    path: "/",
    // 当前路由对应多个组件
    components: {
      header: HomeHeader, // 对应默认视图
      default: HomeMain, // 对应命名视图 name='main'
      footer: HomeFooter, // 对应命名视图 name='footer'
    },
  },
  {
    path: "/about",
    components: {
      header: AboutHeader, // 对应默认视图
      default: AboutMain,
    },
  },
  {
    path: "/news",
    components: NewsMain,
    // 如果只渲染默认视图， components:{ default:NewHeader }可以简写成
    // component:NewHeader
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、嵌套命名视图)3、嵌套命名视图

如果上面案例中 `/news` 路由还存在子路由，子路由对应的页面也可以由多个命名视图来展示

- `NewsMain.vue`

```html
<template>
  <div class="router-link">
    <router-link to="/news/tab1">最新动态</router-link>
  </div>
  <div class="router-view">
    <router-view name="Left" class="left"></router-view>
    <router-view name="Right" class="right"></router-view>
  </div>
</template>

<style scoped>
  .router-view {
    display: flex;
    justify-content: space-between;
  }
</style>
```

- `router/router.js`

```js
const routes = [
  {
    path: "/news",
    component: NewsMain,
    children: [
      {
        path: "tab1",
        components: {
          Left: TabLeft1,
          Right: TabRight1,
        },
      },
    ],
  },
];
```

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#五、动态路由的匹配语法)五、动态路由的匹配语法

本小节我们来学习动态路由的匹配语法，主要内容有：

- 参数中自定义正则
- 可重复的参数
- 可选参数
- 注意事项
- 捕获 404 Not Found 路由
- Sensitive 与 strict 路由配置

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、参数中自定义正则)1、参数中自定义正则

当我们使用`user/:userId`这样的动态路由时，`:userId`为路径参数，他能匹配任意的字符，所以`user/12`、`user/ab` 都能匹配成功。

如果我们希望`:userId`只能匹配数字，也就是`user/12` 能匹配成功，但`user/ab`会匹配失败。我们可在**路径参数** 后面的**括号中**加入正则表达式来限定

```js
const routes = [
  {
    // 只能匹配 /user/1  /user/123  等 但不能匹配 /user/ab
    path: "/user/:userId(\\d+)",
  },
];
```

注意：

字符中的`\`反斜杆有特殊用途，所以要加上`\\`来转义，确保能正确匹配`\d`

如果我们希望路由`/user/：userId`后面的`:userId`只能匹配数字或字母类字符，我们可以在路径参数后面的括号加入正则表达式来限定

```js
const routes = [
  {
    // 只能匹配 /user/1  /user/123  等 但不能匹配 /user/ab
    path: "/user/:userId([a-zA-Z0-9]+)",
  },
];
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、可重复的参数)2、可重复的参数

如果你需要匹配具有多个部分的路由，如`/user/:urls` 可以匹配 `/user/one` `/user/one/two`、`/user/one/two/123` 等

则可以在路径参数后面使用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复

```js
const routes = [
  {
    // 可以匹配 /user/one   /user/one/two    /user/one/two/123
    // 不能匹配 /user/
    path: "/user/:userId+",
  },
  {
    // 可以匹配 /product/one  /product/one/two  /product/one/two/123
    // 也能匹配 /user/
    path: "/product/:productId*",
  },
  {
    // 可以匹配 /news/12   /news/12/23   不能匹配 /news/a   /news/12/b
    // 只要重复的路径中包含非数字，都不能匹配成功
    path: "/news/:id（\\d+）+",
  },
];
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、可选参数)3、可选参数

你可以在路径参数后面使用 `?` 修饰符（0 个或 1 个）将一个参数标记为可选。

```js
const routes = [
  {
    // 可以匹配 /user   /user/ab   /user/12 等
    path: "/user/:userId?",
  },
  {
    // 可以匹配 /news  /news/12   不能匹配 /user/ab
    path: "/news/:id(\\d+)?",
  },
];
```

总结

- `+` 表示 1 个或多个，同时参数可以重复
- `*` 表示 0 个或多个，同时参数可以重复
- `?` 表示 0 个或 1 个，参数不能重复

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4、注意事项)4、注意事项

> 我们来看下面两个路由

```js
const routes = [
  {
    path: "/:keyword",
  },
  {
    path: "/:id(\\d+)",
  },
];
```

注：

当我们访问`/12`时，或`/`反斜杆后面跟着数字时，将匹配`/:id(\\d+)`，其它情况将会匹配`/:keyword`。

与`/:id(\\d+)`和`/:keyword`在 routes 数组中的顺序没有关系。

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5、捕获-404-not-found-路由)5、捕获 404 Not Found 路由

我们可以在定义`routes`时，配置一个匹配所有路由的路由对象，该路由所渲染的组件为`NotFound`显示 404 页面内容。

如果当前访问的路径没有被`/:pathMatch(.*)`之外的路由匹配，则就会被`/:pathMatch(.*)`匹配，显示`NotFound`组件

```js
const routes = [
  // .......
  {
    name: "NotFound",
    // 匹配任意路由
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
  // .......
];
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_6、sensitive-与-strict-路由配置)6、Sensitive 与 strict 路由配置

默认情况下路由`/users`将匹配 `/users`、`/users/`、甚至 `/Users/`。我们可以在`createRouter(options)`的 options 中来配置`sensitive`与`strict`选项来区分大小写要禁用尾部斜线。

- sensitive ：设置路由是否区分大小写,true 表示区分大小写，false 表示不区分，默认值为 fasle
- strict ：路由是否禁止尾部斜线 true 表示禁用，false 表示不禁用，默认值为 false

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/news",
      component: News,
    },
  ],
  strict: true, // 禁止尾部斜线
  sensitive: true, // 区分大小写
});
```

以上`/about`路由只能与`/about`匹配，与`/About`和`/about/`都不会匹配成功。`/news`路由只能与`/news`匹配，与`/News`和`/news/`都不会匹配成功。

sensitive 与 strict 选项即可以如上面一样应用在整个全局路由上，又可以应用于当前路由上，如下：

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/about",
      component: About,
      strict: true, // 禁止尾部斜线
    },
    {
      path: "/news",
      component: News,
      sensitive: true, // 区分大小写
    },
  ],
});
```

注：

- 以上`/about`路由可以与`/about`和`/About`匹配成功，但与`/about/`匹配失败
- 以上`/news`路由可以与`/news`和`/news/`匹配成功，但与`/News`匹配失败

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#六、vue-router-编程式导航)六、vue Router 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

- 在组件中插入`<router-link>`组件来创建导航，属于声明式写法
- 通过`router`实例方法来创建导航，属于编程式导航写法。

| 声明式                    | 编程式             |
| :------------------------ | :----------------- |
| `<router-link :to="...">` | `router.push(...)` |

> 以下表格中列出的 router 实例方法，可以用来实现页面导航

| router 实例方法 | 功能                                                             |
| :-------------- | :--------------------------------------------------------------- |
| `push()`        | 用来导航到一个新的 URL                                           |
| `replace()`     | 用来导航到一个新的 URL，但会替换掉之前的 URL，无法后退到之前 URL |
| `go()`          | 导航到指定记录，用于前进或后退                                   |
| `back()`        | 相当于后退按扭，后退到前一页                                     |
| `forward()`     | 相当于前进按扭，前进到前一页                                     |

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、push-方法)1、push 方法

push 方法用来导航到一个新的 URL，他接受一个参数，该参数与`<router-link>`组件中 to 属性值的写法一模一样，可以是一个字符串路径，或者一个描述地址对象。

```js
// 字符串路径
router.push("/news/tab1");

// 带有路径的对象
router.push({ path: "/news/tab1" });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: "tab1", params: { id: "001" } });

// 带query查询参数，结果是 /news/tab1?id=001
router.push({ path: "/news/tab1", query: { id: "001" } });

// 带 hash，结果是 /about#team
router.push({ path: "/about", hash: "#team" });
```

注意事项

`params`参数只能与`name`属性配合，不能与`path`属性配合，以下写法 params 会被忽略

```js
// 错误写法
router.push({ path: "/news/tab1", params: { id: "001" } });
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、实战应用)2、实战应用

接下来，我们利用编程式导航实现下图所示的导航切换

![GIF2023-5-3122-01-26](https://www.arryblog.com/assets/img/GIF2023-5-3122-01-26.7a4c3716.gif)

- 在`src`目录下新建`views`目录，在此目录所需要的路由组件

```js
views
   ├─ Home.vue    // 首页组件
   ├─ Login.vue   // 登录组件
   ├─ Register.vue // 注册组件
```

- 各个路由组件内容如下

```html
<!--Home.vue-->
<template>
  <h3>网站首页</h3>
</template>

<!--Login.vue-->
<template>
  <h3>用户登录</h3>
</template>

<!--Register.vue-->
<template>
  <h3>用户注册</h3>
</template>
```

- 在`src`目录下新建`router`目录，在此目录下新建`index.js`文件，用来定义路由

```js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import User from "../views/User.vue";

// 定义一些路由
const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 对外暴露
export { router };
```

- `App.vue` 组件

```html
<script setup>
  import { useRouter } from "vue-router";
  // 获取router实例
  const router = useRouter();
  // 切换URL方法
  function goTo(url) {
    router.push(url); // 切换到对应URL
  }
</script>
<template>
  <button @click="goTo('/login')">登录</button> |
  <button @click="goTo('/register')">注册</button>

  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
  .main {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、replace-方法)3、replace 方法

与 push 方法一样用来导航到一个新的 URL，但会替换掉之前的 URL，无法后退到之前 URL

| 声明式                            | 编程式                |
| :-------------------------------- | :-------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

```js
router.replace({ path: "/home" });
```

如果把上面案例中的 push 方法，换成 replace 方法，发现浏览器顶部左侧的前进后退按扭一直是灰色的。

```js
function goTo(url) {
  router.replace(url); // 切换到对应URL
}
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4、go、back、forward-方法)4、go、back、forward 方法

```js
router.go(1); // 向前移动一页，相当于前进按扭
router.back(); // 返回前一页 ，相当于后退按扭
router.forward(); // 与go(1) 是一样的
```

> 把上面案例`App.vue`中代码更改成如下：

```html
<script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  function goTo(url) {
    router.push(url);
  }
  function go() {
    router.go(1);
  }
  function back() {
    router.back();
  }
</script>
<template>
  <button @click="goTo('/login')">登录</button> |
  <button @click="goTo('/register')">注册</button> |

  <button @click="go">前进</button> |
  <button @click="back">后退</button>

  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
  .main {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```

最终渲染效果如下，先点击登录、注册、再点击后退会退到登录页，再点前进按扭，会前进到注册页。

![GIF2023-5-3122-08-59](https://www.arryblog.com/assets/img/GIF2023-5-3122-08-59.4288407f.gif)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5、总结-2)5、总结

你可能已经注意到，`router.push`、`router.replace` 和 `router.go` 是 [`window.history.pushState`、`window.history.replaceState` 和 `window.history.go` (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/History)的翻版，它们确实模仿了 `window.history` 的 API。

> 因此，如果你已经熟悉 [Browser History APIs (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，在使用 Vue Router 时，操作历史记录就会觉得很熟悉。

值得一提的是，无论在创建路由器实例时传递什么样的 [`history` 配置 (opens new window)](https://router.vuejs.org/zh/api/#history)，Vue Router 的导航方法( `push`、`replace`、`go` )都能始终正常工作。

## [#](https://www.arryblog.com/vip/vue/vue-router-2.html#七、实战应用-项目框架搭建)七、实战应用：项目框架搭建

本小节结合前面学习过的 Vant UI 与 Vue Router 实现一个简单的应用导航框架，具体效果如下。

![GIF2023-8-414-50-20](https://www.arryblog.com/assets/img/GIF2023-8-414-50-20.ec35d3e7.gif)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_1、实现步骤)1、实现步骤

- 路由设计
- 安装 Vant 组件库
- 实现页面路由
- 单页面开发

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_2、路由设计)2、路由设计

首先根据当前应用的需求设计好当前应用的路由。

> 当前项目只涉及一级导航（路由），各路由关系与路由对应的组件如下表

| 页面   | 一级路由  | 路由组件 |
| :----- | :-------- | :------- |
| 首页   | `/`       | Home     |
| 购物车 | `/mycart` | MyCart   |
| 好看   | `/nice`   | Nice     |
| 我的   | `/my`     | My       |

在`src/router/index.js`中创建 router 实例，并对外暴露

```js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MyCart from "../views/MyCart.vue";
import My from "../views/My.vue";
import Nice from "../views/Nice.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/mycart",
    component: MyCart,
  },
  {
    path: "/nice",
    component: Nice,
  },
  {
    path: "/my",
    component: My,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
```

在`src/main.js`中注册 router 实例

```js
// .....此处省略部分代码
import { router } from "./router/";
// 注册路由
app.use(router);
// ......
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_3、安装-vant-组件库)3、安装 Vant 组件库

在此项目中，我们会用到 Vant 组件库，所以我们需要先安装好 Vant 组件库

- 安装 UI 组件库

```shell
npm i vant
```

- 按需引入组件，则需要安装以下插件

```shell
npm i unplugin-vue-components -D
```

- 在 vite.config.js 文件中配置好此插件

```js
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_4、实现页面路由)4、实现页面路由

根据路由实现各页面之间的链接（跳转）关系。

在此项目中，我主要构建当前应用底部的 Tabbar 导航。此导航采用 Vant 组件库中的 [Tabbar 组件 (opens new window)](https://vant-contrib.gitee.io/vant/#/zh-CN/tabbar)实现。

```html
<script setup>
  import { ref } from "vue";
  const active = ref(0);
</script>

<template>
  <router-view></router-view>

  <van-tabbar active-color="#ee0a24" v-model="active">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/mycart"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="tv-o" to="/nice">好看</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>
```

> 最终实现效果如下，点击对应的导航可以显示不同的内容

![image-20230804151401327](data:image/png;base64,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)

### [#](https://www.arryblog.com/vip/vue/vue-router-2.html#_5、单页面开发)5、单页面开发

整个应用的页面路由（导航）实现好之后，我们就可以开发单个路由页面的功能了。

在这个应用中，每个页面（除首页）的顶部都有一个返回按扭，可以返回到到前一页。这里利用 Vant UI 的 [NavBar 导航栏 (opens new window)](https://vant-contrib.gitee.io/vant/#/zh-CN/nav-bar)组件来实现。

- `MyCart.vue`组件内容

```html
<script setup>
  // 返回前一页
  function onClickLeft() {
    history.back();
  }
</script>

<template>
  <!-- 导航栏 -->
  <van-nav-bar
    title="购物车"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!--主体内容-->
  <div class="main">购物车.....</div>
</template>
<style scoped>
  .main {
    text-align: center;
  }

  /* 修改导航栏中 < 返回 的颜色为黑色*/
  :global(.van-nav-bar__text) {
    color: #000;
  }

  :global(.van-nav-bar .van-icon) {
    color: #000;
  }
</style>
```

> 最终实现 `/mycart` 路由访问到的效果如下：

![image-20230804153919422](data:image/png;base64,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AqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkCoIwMAVBGhgAoI0MAlJEhAMrIEABlZAiAMjIEQBkZAqCMDAFQRoYAKCNDAJSRIQDKyBAAZWQIgDIyBEAZGQKgjAwBUEaGACgjQwCUkSEAysgQAGVkCIAyMgRAGRkC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)

注：

其它带有返回导航栏的`Nice`、`My`组件的内容也按上面格式书写即可，针对修改导航栏中 `< 返回` 颜色的样式可以不用再重写。
