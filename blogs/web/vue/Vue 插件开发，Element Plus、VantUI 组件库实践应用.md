---
title: Vue 插件开发，Element Plus、VantUI 组件库实践应用
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
publish: true
---

# Vue 插件开发，Element Plus、VantUI 组件库实践应用

本章节我们来学习如何开发 Vue 插件及使用第三方插件库（比如：VantUI 和 Element plus）。

- Vue 插件开发，使用、功能范围
- 星级评分插件开发
- Element Plus 组件库
- Vant UI 组件库

## [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#一、vue-插件开发)一、Vue 插件开发

本小节我们将学习如何定义一个插件，如何使用插件、插件能实现的功能范围。

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_1、vue-插件介绍)1、Vue 插件介绍

插件（Plugins）是一种能为 Vue 添加全局功能的工具代码。

- 一个插件可以是一个拥有 `install()` 方法的对象

```js
export const myPlugin = {
  /*
        app 为当前安装插件的应用实例对象，调用use方法app对象
        options 为传递给插件的可选配置项，传递给app.use方法的第二个参数
     */
  install(app, options) {
    // 这里编写插件代码
  },
};
```

- 一个插件可以是一个安装函数本身

```js
/*
    app 为当前安装插件的应用实例对象
    options 为传递给插件的配置选项
*/
export function myPlugin(app, options) {
  // 这里编写插件代码
}
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2、插件的使用)2、插件的使用

在 Vue 中可以在`src/main.js`文件中通过调用`app.use()`来注册插件。

```js
import { createApp } from "vue";
// 导入插件
import { myPlugin } from "./plugin/myPlugin.js";
const app = createApp(App);

// 注册插件
app.use(myPlugin, {
  /* 可选的插件配置选项 */
});
```

如果`myPlugin`插件是一个带有`install`方法的对象，调用`app.use(myPlugin,options)`注册插件时，内部会调用`myPlugin`对象的`install`方法，并将`app`和`options`作为参数传递给`install`方法。

```js
import { createApp } from "vue";
import App from "./App.vue";

const app1 = createApp(App);
// 定义插件
const myPlugin = {
  install(app, options) {
    console.log("app", app === app1); // true
    console.log("options", options); // {a:1,b:2}
  },
};

// 注册插件
app1.use(myPlugin, {
  a: 1,
  b: 2,
});

app1.mount("#app");
```

> 当启动应用时，最终在控制台输出如下结果

![image-20230726142822324](https://www.arryblog.com/assets/img/image-20230726142822324.c68428dd.png)

如果`myPlugin`插件是一个函数，调用`app.use(myPlugin,options)`注册插件时，会将`app`和`options`作为参数传递函数。

```js
import { createApp } from "vue";
import App from "./App.vue";
const app1 = createApp(App);

// 定义插件
function myPlugin(app, options) {
  console.log("app", app === app1);
  console.log("options", options);
}
// 注册插件
app1.use(myPlugin, {
  a: 1,
  b: 2,
});
app1.mount("#app");
```

> 当启动应用时，最终在控制台输出如下结果

![image-20230726142822324](https://www.arryblog.com/assets/img/image-20230726142822324.c68428dd.png)

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_3、插件的功能范围)3、插件的功能范围

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

- ①、通过 [app.component() (opens new window)](https://cn.vuejs.org/api/application.html#app-component)和 [app.directive() (opens new window)](https://cn.vuejs.org/api/application.html#app-directive)注册一到多个**全局组件或全局自定义指令**。
- ②、通过 [app.provide() (opens new window)](https://cn.vuejs.org/api/application.html#app-provide)使一个资源**可被注入**进整个应用。
- ③、向 [app.config.globalProperties (opens new window)](https://cn.vuejs.org/api/application.html#app-config-globalproperties)中添加一些**全局实例属性或方法**
- ④、一个可能上述三种都包含了的功能库（例如 [vue-router (opens new window)](https://github.com/vuejs/vue-router-next)）

**代码示例**

在`src/plugin/myPlugin.js`中定义插件

```js
import { h, reactive } from "vue";
// 导入（前2节课讲的Message组件）   导入 ../components/Message/index.js
import Message from "../components/Message";
// 默认导出插件对象
export default {
  install(app, options) {
    // 添加全局组件
    app.component("my-component", {
      render() {
        return h("h3", "Hello Vue3！！");
      },
    });

    // 添加全局指令
    app.directive("display", (el, binding) => {
      if (binding.value) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });

    // 添加全局依赖
    app.provide(
      "userInfo",
      reactive({
        username: "清心",
        age: 34,
        identity: "管理员",
      })
    );

    // 添加全局属性或方法
    // 这种方式提供的全局变量，不推荐在setup() 和 <script setup>中访问
    // 可以把全局变量通过provide来提供，然后再通过inject来注入
    app.config.globalProperties.$message = Message;
  },
};
```

**注册插件**

在`src/main.js`文件中注册插件

```js
import { createApp } from "vue";
import App from "./App.vue";
// 导入插件
import myPlugin from "./plugin/myPlugin.js";

const app = createApp(App);
// 注册插件
app.use(myPlugin);
app.mount("#app");
```

**使用插件提供的功能**

在`src/app.vue`中使用插件提供的全局组件、全局指令、全局依赖、全局方法

```html
<script setup>
  import { inject, getCurrentInstance } from "vue";
  // 注入提供的依赖
  const userInfo = inject("userInfo");
  // 以下方式可以获取到全局变量，但不推荐这样使用
  /*
        const instance = getCurrentInstance()
        console.log(instance.proxy)
        function submit() {
            instance.proxy.$message.success({ message: '提交成功' })
        }
	*/
</script>

<template>
  <!-- 使用全局组件 -->
  <my-component></my-component>

  <!-- 使用全局指令 -->
  <div v-display="true">显示</div>
  <div v-display="false">隐藏</div>
  <hr />

  <!-- 使用全局注入-->
  <div>用户名：{{ userInfo.username }}</div>
  <div>用户类型：{{ userInfo.identity }}</div>

  <!-- 使用全局方法 -->
  <button @click="$message.success({ message: '提交成功' })">提交</button>
</template>
```

> 最终渲染后效果如下，点击提交按扭，会显示提交成功提示框

![GIF2023-7-2616-37-22](https://www.arryblog.com/assets/img/GIF2023-7-2616-37-22.1f36b243.gif)

## [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#二、星级评分插件)二、星级评分插件

本小节我们一起来开发《星级评分》插件，`Rate`星级评分组件使用方法

```html
<script setup>
  import { ref } from "vue";
  const score = ref(4);
</script>
<template>
  <Rate :size="40" v-model="score"></Rate>
</template>
```

> 最终渲染出效果如下：

![GIF2023-7-2723-10-53](https://www.arryblog.com/assets/img/GIF2023-7-2723-10-53.cb6e0561.gif)

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_1、开发流程)1、开发流程

- 开发 Rate 组件
- 将 Rate 组件做成插件
- 注册插件
- 使用 Rate 组件

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2、开发-rate-组件)2、开发 Rate 组件

- 利用阿里`iconfont`图标来绘制星星

  ![image-20230728155846889](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABQCAIAAADusQ7EAAAEVklEQVR4nO2b63KzLBSFBYnmYOJ5erj/i+tMqtZjVFS+H8x8TZPGIAFM32T9bJXNwyob2FhACNEeTHDuDsygJ/Nj6Mn8GHoyP4aQghiEkP1+X5alpmmbzSYIAgjnHGsVsdM0LcuSEEIIKYoiSRIFQUcknbnv+6Iojnd7VVV1XSc77oikM+d5jjE+/gnGOMsy2XFHJJf53GSqsixntFou87nJVPNaLZH5kslUM1otkfmSyVRd181ltSzmcZM1TSOEzGW1LOZxk6m6riuKQlIHRiSF+arJVHSL0ve9jD6MSAozi8lUGOM8z2X0YUTimRlNpprFavHM7CZTqbdaMHPf9/Q4wf6KeqsFMxdF0bbt1LcUWy2SedJMPhZdq5VZLZKZz2Sqtm2VrdXCmJumSdOU+1aEEJKmadM0ovozIsDXy77v27at6xpjjDHuum4YhtuvgQAAEEKE0GKxWCwWy+XSMAxd129s9jTK1Y5KwmOX8IH4wUwIaZrmcDjMhceuk4FYrVamaQIAmN79H6nv+4+PDzUzSoZM03x9fWXx/zuHZVn2d4E1TWuahvFA/s08DIO0/igS42n8m9k0zXlL7TcKALBcLlme/Ia0LMtxHMY0cG8CALiuu91uWR7+YazjOK7r/jlsCuw4Duvz50tRmqZxHN/nEnUuAIDnebZts7/yywS2bdvzvD/hNgewNrIPy7IsjuN7TuYQQs/zdrvd5Bcv/WK323med7eZnBtYu7rfzvM8iqJ7cxtC6Ps+Y5Y+1/UzRlEUURSpr8hekq7rvu9blsXdwvU/XcuyfN8XfqDj0+3AGvv5uSzLz8/Ped3WdT0Igs1mc2M7rCmKfgcyo9uigLWpdZKqqvb7vXq3dV0Pw3C9XgtpbXJt6HA47Pd7lfeJCKEwDFerlagGJy+/q9VK5bpN99ICgTW+uqdhGMqYdV03TVNsmzxdp196ie3HJQ3DIDx98DB3XaeMmRAy6caPRTzMGGOVzMLzJQ9z27YqT9d34bPiD1/m97nrOsV7EnqRIrBBHmbFR0vhqXsyM8ZYMTMhZH6fFZcHhafuycxih5xRYlM3j88CwzNqzvmMMeYODwDgrh+LTd3T/geFL2lDCLfbLb0h+fr6yrJs6sCJTd3TmKfuOiGElmUdnz1d17Vtm5KzDx9N3aJOlLKYAQCWZbmui9BpCFqadhwnjuOiKFjIxabuycxXnwEArNdr3/fPaY8FIQyCwHGcJElYvioTmLqnMY9PKgAAraIYhsEaHqEwDF3XjaKoqqoR8nnmc9u2lwIDAEzTDIKAnfZHJxB6eXlp2zaKorqufyWnqZuv/dNw7I/2ff/r3DNN0/O82xOMYRhvb291XcdxXNf1yW8Fpu4JzIZhIISO10nDMDzPE1WCpVoul+/v71VVJUly/E0PQkiIyRpHfZveZiwWC9u2uW/JGJXneZqmGGNa0J+tvv0P6E6vl6XqyfwYejI/hp7Mj6En82PoPw4qAijIszAbAAAAAElFTkSuQmCC)

`src/components/Rate/Rate.vue`组件内容如下：

```html
<template>
  <div class="rate">
    <span class="iconfont icon-star star"></span>
  </div>
</template>
<style scoped>
  @font-face {
    font-family: "iconfont";
    /* Project id 4186612 */
    src: url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff2?t=1690529927523")
        format("woff2"), url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff?t=1690529927523")
        format("woff"),
      url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.ttf?t=1690529927523")
        format("truetype");
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-star:before {
    content: "\e627";
  }

  .star {
    color: #ddd;
  }
</style>
```

- 利用 `v-for='starNum in 5'`循环遍历得到 5 颗星星

  ![image-20230728155912191](data:image/png;base64,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)

```html
<div class="rate">
  <span v-for="starNum in 5" :key="starNum" class="iconfont icon-star star">
  </span>
</div>
```

- 设置变量`score`保存当前选中星星数量（即：当前评分）,并通过动态绑定 class 实现选中星星为红色

  ![image-20230728160004609](data:image/png;base64,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)

```html
<script setup>
  import { ref } from "vue";
  // 当前评分（选中星星数）
  const score = ref(3);
</script>

<template>
  <div class="rate">
    <span
      v-for="starNum in 5"
      :key="starNum"
      class="iconfont icon-star star"
      :class="{ active: starNum <= score ? true : false }"
    ></span>
  </div>
</template>

<style scoped>
  /* ..... */
  .star.active {
    color: red;
  }
</style>
```

- 点击对应星星时，实现评分效果

![GIF2023-7-2816-20-04](data:image/gif;base64,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)

```html
<script setup>
  import { ref } from "vue";
  // 当前评分（选中星星数）
  const score = ref(3);
  // 设置评分
  function setScore(starNum) {
    score.value = starNum;
  }
</script>
<template>
  <div class="rate">
    <span
      v-for="starNum in 5"
      :key="starNum"
      class="iconfont icon-star star"
      :class="{ active: starNum <= score ? true : false }"
      @click="setScore(starNum)"
    ></span>
  </div>
</template>
<style scoped>
  @font-face {
    font-family: "iconfont";
    /* Project id 4186612 */
    src: url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff2?t=1690529927523")
        format("woff2"), url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff?t=1690529927523")
        format("woff"),
      url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.ttf?t=1690529927523")
        format("truetype");
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-star:before {
    content: "\e627";
  }

  .star {
    color: #ddd;
  }

  .star.active {
    color: red;
  }
</style>
```

- 在使用`Rate`组件时，可以通过 `size` prop 来设置星星的大小，同时在使用`Rate`组件时可以得到当前被选中的星星数（评分 score）
- 我们可以给`Rate`组件监听`@getScore=getScore`事件，当点击星星时触发 getScore 事件，事件触发时会调`getScore`方法，在该方法内部可以拿到当前被选中的星星数（评分 score）

```html
<script setup>
  import Rate from "./components/Rate/Rate.vue";

  function getScore(value) {
    // value值为当前评分（选中星星数量）
    console.log(value);
  }
</script>
<template>
  <Rate :size="40" @getScore="getScore"></Rate>
</template>
<!--Rate.vue组件 -->
<script setup>
  import { computed, ref } from "vue";
  // 声明按受的props
  const props = defineProps(["size"]);
  // 声明监听的事件
  const emit = defineEmits(["getScore"]);

  // 计算属性,得到当前星星的大小 40px
  const fontSize = computed(() => props.size + "px");

  // 当前评分（选中星星数）
  const score = ref(3);
  // 设置评分
  function setScore(starNum) {
    score.value = starNum;
    emit("getScore", starNum);
  }
</script>

<style scoped>
  .star {
    color: #ddd;
    font-size: v-bind(fontSize); /* 根据size的计算属性设置字体大小*/
  }
</style>
```

- 如果用户想在使用`Rate`组件时，能初始化当前被选中的星星数，则可以给`Rate`组件传递 `score`prop
- 然后 Rate 组件中接受该 prop

```html
<!--Rate.vue-->
<script setup>
  import { computed, ref } from "vue";
  // 声明按受的props
  const props = defineProps(["size", "score"]);
  // 声明监听的事件
  const emit = defineEmits(["getScore"]);

  // 计算属性,得到当前星星的大小 40px
  const fontSize = computed(() => props.size + "px");

  // 当前评分（选中星星数）
  // const score = ref(3);
  // 设置评分
  function setScore(starNum) {
    // score.value = starNum  不能通过这种方式设置score prop的值
    emit("getScore", starNum);
  }
</script>
<!--App.vue-->
<script setup>
  import Rate from "./components/Rate/Rate.vue";
  import { ref } from "vue";
  const score = ref(4);

  function getScore(value) {
    // value值为当前评分（选中星星数量）
    console.log(value);
    score.value = value; // 修改 score的值
  }
</script>
<template>
  <Rate :size="40" @getScore="getScore" :score="score"></Rate>
</template>
```

**代码优化**

我们可以将 `@getScore="getScore"`事件监听与 `:score="score"`prop 简写成`v-model='score'`

- App.vue

```html
<script setup>
  import Rate from "./components/Rate/Rate.vue";
  import { ref } from "vue";
  const score = ref(4);
</script>
<template>
  <Rate :size="40" v-model="score"></Rate>
</template>
```

- Rate.vue 组件

```html
<script setup>
  import { computed, ref } from "vue";
  // 声明按受的props
  const props = defineProps(["size", "modelValue"]);
  // 声明监听的事件
  const emit = defineEmits(["update:modelValue"]);

  // 计算属性,得到当前星星的大小 40px
  const fontSize = computed(() => props.size + "px");

  // 当前评分（选中星星数）
  // const score = ref(3);
  // 设置评分
  function setScore(starNum) {
    // score.value = starNum
    emit("update:modelValue", starNum);
  }
</script>
<template>
  <div class="rate">
    <span
      v-for="starNum in 5"
      :key="starNum"
      class="iconfont icon-star star"
      :class="{ active: starNum <= modelValue ? true : false }"
      @click="setScore(starNum)"
    ></span>
  </div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2-1、rate-组件最终版)2.1、Rate 组件最终版

```html
<script setup>
  import { computed, ref } from "vue";
  // 声明按受的props
  const props = defineProps(["size", "modelValue"]);
  // 声明监听的事件
  const emit = defineEmits(["update:modelValue"]);

  // 计算属性,得到当前星星的大小 40px
  const fontSize = computed(() => props.size + "px");

  // 设置评分
  function setScore(starNum) {
    // 触发事件，修改评分值
    emit("update:modelValue", starNum);
  }
</script>

<template>
  <div class="rate">
    <span
      v-for="starNum in 5"
      :key="starNum"
      class="iconfont icon-star star"
      :class="{ active: starNum <= modelValue ? true : false }"
      @click="setScore(starNum)"
    ></span>
  </div>
</template>

<style scoped>
  @font-face {
    font-family: "iconfont";
    /* Project id 4186612 */
    src: url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff2?t=1690529927523")
        format("woff2"), url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.woff?t=1690529927523")
        format("woff"),
      url("//at.alicdn.com/t/c/font_4186612_6tkc3n3cd7r.ttf?t=1690529927523")
        format("truetype");
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-star:before {
    content: "\e627";
  }

  .star {
    color: #ddd;
    font-size: v-bind(fontSize);
  }

  .star.active {
    color: red;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2-2、将组件做成插件)2.2、将组件做成插件

`src/components/Rate/index.js` 文件内容如下：

```js
// 导入 Rate组件
import Rate from "./Rate.vue";
// 定义插件对象
export default {
  install(app, options) {
    // 将组件注册为全局组件
    app.component("Rate", Rate);
  },
};
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2-3、注册插件)2.3、注册插件

`/src/main.js`中注册插件

```js
// 导入Rate星级评分插件
import Rate from "./components/Rate";
// ....
// 注册插件
app.use(Rate);
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2-4、使用-rate-组件)2.4、使用 Rate 组件

```html
<script setup>
  import { ref } from "vue";
  const score = ref(4);
</script>
<template>
  <Rate :size="40" v-model="score"></Rate>
</template>
```

## [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#三、element-plus-组件库)三、Element Plus 组件库

[Element Plus (opens new window)](https://element-plus.org/)是基于 Vue 3，面向设计师和开发者的组件库。

> Element 组件的使用有以下三种方式：

- 完整引入
- 按需导入 - 自动导入（推荐）
- 按需导入 - 手动导入

但不管那一种方式使用，都需要先执行以下命令，下载`Element Plus`组件库

```shell
npm install element-plus --save
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_1、完整引入)1、完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便

```js
// 导入 ElementPlus
import ElementPlus from "element-plus";
// 导入组件用到的CSS
import "element-plus/dist/index.css";
// 注册组件
app.use(ElementPlus);
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2、按需导入-自动导入-推荐)2、按需导入 - 自动导入（推荐）

根据项目中用到的 Element 组件来导入对应组件。

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite`

```js
// vite.config.ts
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_3、按需导入-手动导入)3、按需导入 - 手动导入

Element Plus 提供了基于 ES Module 的开箱即用的 [Tree Shaking (opens new window)](https://webpack.js.org/guides/tree-shaking/)功能。

> 但你需要安装 [unplugin-element-plus (opens new window)](https://github.com/element-plus/unplugin-element-plus)来按需引入样式

- 执行下面命令安装 `unplugin-element-plus`插件

```shell
npm i unplugin-element-plus -D
```

- 在`vite.config.js`中配置插件

```js
// vite.config.js
import { defineConfig } from "vite";
import ElementPlus from "unplugin-element-plus/vite";

export default defineConfig({
  // ...
  plugins: [ElementPlus()],
});
```

- 在需要使用 Element 组件的组件中，通过`import`导入即可

```html
<script setup>
  import { ElButton } from "element-plus";

  // 以上导入会自动转换如下  ↓ ↓ ↓ ↓ ↓ ↓
  // import { ElButton } from 'element-plus'
  // import 'element-plus/es/components/button/style/css'
</script>

<template>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</template>
```

注意

如果使用 `unplugin-element-plus` 并且只使用组件 API，你需要手动导入样式。

```html
<script>
  import "element-plus/es/components/message/style/css";
  import { ElMessage } from "element-plus";
  import { h } from "vue";

  export default {
    setup() {
      return () => h(ElMessage, { type: "success", message: "ssss" });
    },
  };
</script>
```

## [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#四、vant-组件库)四、Vant 组件库

[Vant 4.x (opens new window)](https://vant-contrib.gitee.io/vant/#/zh-CN)是一个轻量、可定制的移动端 Vue3 组件库

> Vant 组件的使用有以下三种方式：

- 常规用法
- 按需导入 - 自动导入（推荐）

但不管那一种方式使用，都需要先执行以下命令，下载`Vant`组件库

```shell
npm i vant
```

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_1、常规用法)1、常规用法

如果你不在乎打包后文件的大小，可以采用以下方式注册 Vant 组件。

```js
import { createApp } from "vue";
// 1. 引入你需要的组件
import { Button, Search } from "vant";
// 2. 引入组件样式（(所有组件样式)）
import "vant/lib/index.css";

const app = createApp();

// 3. 注册你需要的组件
app.use(Button);
app.use(Search);
```

以上方式注册好 Button 组件后，就可以在其它组件模板中使用 Button 组件了。

```html
<!--App组件中使用-->
<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
  <div>
    <van-search v-model="value" placeholder="请输入搜索关键词" />
  </div>
</template>
```

![image-20230727191210111](https://www.arryblog.com/assets/img/image-20230727191210111.680eff26.png)

提示：

Vant 默认支持 Tree Shaking，因此你不需要配置任何插件，通过 Tree Shaking 即可移除不需要的 JS 代码，但 CSS 样式无法通过这种方式优化。

> 如果需要按需引入 CSS 样式，请参考下面的方法二。

### [#](https://www.arryblog.com/vip/vue/vue-plugin-element-plus-vant-ui.html#_2、按需引入-推荐)2、按需引入（推荐）

相比于常规用法，这种方式可以按需引入组件的 CSS 样式，从而减少一部分代码体积，但使用起来会变得繁琐一些

- ①、需要安装 [unplugin-vue-components (opens new window)](https://github.com/antfu/unplugin-vue-components)插件，它可以自动引入组件，并按需引入组件的样式

```shell
npm i unplugin-vue-components -D
```

- ②、如果是基于 `vite` 的项目，在 `vite.config.js` 文件中配置插件

```js
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default {
  plugins: [
    // ...
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```

- ③、完成以上两步，就可以直接在模板中使用 Vant 组件了，`unplugin-vue-components` 会解析模板并自动注册对应的组件

```html
<!--App组件中使用-->
<template>
  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="default">默认按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button>
</template>
```

注意事项

Vant 中有个别组件是以函数的形式提供的，包括 `Toast`，`Dialog`，`Notify` 和 `ImagePreview` 组件。

在使用函数组件时，`unplugin-vue-components` 无法自动引入对应的样式，因此需要手动引入样式。

```js
// Toast
import { showToast } from "vant";
import "vant/es/toast/style";

// Dialog
import { showDialog } from "vant";
import "vant/es/dialog/style";

// Notify
import { showNotify } from "vant";
import "vant/es/notify/style";

// ImagePreview
import { showImagePreview } from "vant";
import "vant/es/image-preview/style";
```

> 你可以在项目的入口文件或公共模块中引入以上组件的样式，这样在业务代码中使用组件时，便不再需要重复引入样式了。

- 在 App 组件中使用 Dialog 组件

```html
<script setup>
  import { showDialog } from "vant";
  import "vant/es/dialog/style";

  showDialog({
    message: "生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。",
    theme: "round-button",
  }).then(() => {
    // on close
  });
</script>

<template>
  <button
    @click="showDialog({
                    message: '提交成功'
                    })"
  >
    提交
  </button>
</template>
```

![GIF2023-7-2719-54-44](https://www.arryblog.com/assets/img/GIF2023-7-2719-54-44.0c040017.gif)
