---
title: Vue 组合式 API - ref，通信 API，依赖注入，生命周期
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
  - 组件通信
publish: true
---

# Vue 组合式 API - ref，通信 API，依赖注入，生命周期

从本节内容开始，我们正式深入 Vue 组合式 API 的相关部分细节

- 模板引用 ref
- 组合式 API - 组件通信 API
- props、emits、透传属性、expose
- 依赖与注入
- 生命周期钩子
- 组合式 API 常见疑问
- 实战应用：带历史记录的搜索

## 一、模板引用

深入浅出 组合式 API 中 ref 模板引用，v-for 中的模板引用，组件上的 ref 等

### 1、ref 模板引用

在组合式 API 中要获得对模板的引用，我们需要声明一个同名的 ref 变量。

```html
<script setup>
  import { ref, onMounted } from "vue";
  // 声明一个ref变量来存放该元素的引用
  // 变量名必须与模板里 ref同名
  const box = ref(null);

  // 组件挂载成功后，才能访问到该元素的引用
  onMounted(() => {
    console.log(box.value.innerHTML);
  });
</script>

<template>
  <div class="box" ref="box">box内容</div>
</template>
```

注意

你只可以**在组件挂载后**才能访问模板引用，在没有挂载前模板引用的 ref 值是一个 null。

### 2、v-for 中的模板引用

当在 `v-for` 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素

```html
<script setup>
  import { ref, onMounted } from "vue";
  const list = [1, 2, 3, 4];
  // 声明一个ref变量来存放该元素的引用
  // 变量名必须与模板里 ref同名
  const items = ref([]);

  // 组件挂载成功后，才能访问到该元素的引用
  onMounted(() => {
    console.log(items.value);
  });
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">{{ item }}</li>
  </ul>
</template>
```

### 3、组件上的 ref

在组合式 API`<script setup>`中，模板引用中获得的值是组件实例。

不过使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露。

**代码示例**

```
App.vue
<script setup>
  import A from "./components/A.vue";
  import { ref, onMounted } from "vue";
  const child = ref(null);
  onMounted(() => {
    console.log(child.value.msg); //  undefined  如果A组件中对外暴露了该属性，则能获取值
  });
</script>

<template>
  <a ref="child"></a>
</template>
A.vue
<script setup>
  import { ref } from "vue";
  const msg = ref("A组件");
  // 对外暴露属性
  // defineExpose({
  //     msg
  // })
</script>
<template>
  <div>{{ msg }}</div>
</template>
```

## 二、组合式 API - 组件通信 API

本小节主要讲解组合式 API 中涉及组件间通信的 API，具体有：

- `defineProps()`方法，用来声明接受的 props
- `defineEmits()`方法，用来声明接受的事件监听
- `useAttrs()`方法，用来接受所有的透传属性
- `defineOptions()`方法，用来在组合式 API 中声明组件选项
- `defineExpose()`方法，用来对外暴露组件的属性和方法

### 1、defineProps()

- 在选项式 API 中，通过 props 选项来声明父组件传递的 props
- 在组合式 API 中，通过`defineProps()`方法来声明 props。
- `defineProps()`方法接收与 `props` 选项相同的值

> `defineProps()`方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用

- 数组简写形式

```html
<script setup>
  // 参数是一个数组
  const props = defineProps(["userName", "age"]);
  // props是由声明的属性名与属性值组成的对象
  console.log(props); //  {userName: 1, age: 19}
</script>
```

- 对象写法，对 props 做校验，

```html
<script setup>
  // 参数是一个对象，可以对prop做相关的校验
  const props = defineProps({
    userName: String,
    age: {
      // 数据类型
      type: Number,

      // 属性是否为必传，true表示必传
      required: true,

      // 表示未传该属性时，属性的默认值，如果没有配置default选项
      // 对于没有传的非bool类型属性，默认值为undefind，bool类型属性为false
      // required与default 不能同时出现，因为必传，就决定了不会启用默认值
      default: 17,

      // 数据校验函数，如果返回值为false，表示校验失败，控制台会抛出禁告
      validator(value) {
        // ....
        return true;
      },
    },
  });

  // props是由声明的属性名与属性值组成的对象
  console.log(props); //  {userName: 1, age: 19}
</script>
```

### 2、defineEmits() 方法

在选项式 API 中，通过`emits`来声明父组件传递的事件监听器，在组合式 API 中，通过`defineEmits()`方法来声明。`defineEmits()`方法接收与 `emits` 选项相同的值

> `defineEmits()`方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用

```js
import { onMounted } from "vue";
// emit 相当于选项式API中的 this.$emit 用来触发自定义事件
const emit = defineEmits(["addEvent", "delEvent"]);

// 生命周期函数中触发事件
onMounted(() => {
  emit("addEvent");
});
```

**代码演示**

```
App.vue
<script setup>
  import { ref } from "vue";
  import Count from "./components/Count.vue";
  const count = ref(0);

  function add() {
    count.value++;
  }
</script>
<template>
  <!--@add-event  绑定事件监听器-->
  <Count :count="count" @add-event="add" />
</template>
Count.vue
<script setup>
  import { onMounted } from "vue";
  defineProps(["count"]);
  // emit 相当于选项式API中的 this.$emit,可以用来触发事件
  const emit = defineEmits(["addEvent", "delEvent"]);

  // 生命周期函数中触发事件
  onMounted(() => {
    setTimeout(() => {
      emit("addEvent");
    }, 2000);
  });
</script>

<template>
  <div>{{ count }}</div>
  <button @click="$emit('addEvent')">count++</button>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-1918-15-02](https://www.arryblog.com/assets/img/GIF2023-5-1918-15-02.b6427b47.gif)

注：

在打开页面 2 秒后，生命周期函数中的`emit("addEvent")`方法触发了自定事件 addEvent，执行了`count.value++`，count 的值从 0 变成了 1。

后面点击 count++按扭，多次触发自定义事件 addEvent，则 count 不断加 1

### 3、useAttrs() 方法

在选项式 API 中，可以通过`this.$attrs`来访问透传属性。

在组合式 API 中，我们需要用 Vue 提供的`useAttrs()`方法来获取所有透传属性，该方法的返回值与选项式 API 中`this.$attrs`的值是一样的

```html
<!--父组件中调用Count-->
<template>
  <Count :class="['active']" id="box" />
</template>

<!--Count.vue 代码-->
<script setup>
  import { ref, useAttrs } from "vue";
  // attrs 相当于选项式API中的this.$attrs
  const attrs = useAttrs();
  console.log(attrs.class); // active
  console.log(attrs.id); // box
</script>

<template>
  <div>{{ attrs.class }} --- {{ attrs.id }}</div>
</template>
```

> 以上代码最终渲染后代码如下：

```html
<div class="active" id="box">active --- box</div>
```

禁用透传行为

在选项式 API 中，我们通过`inheritAttrs`选项来禁用透传行为。

- 在组合式 API 中，我们可以让`<script setup>`与`<script>`标签一起共存，在`<script>`标签的选项式 API 中来书写`inheritAttrs`选项禁用透传行为。
- 在 Vue3.3+以上版本，也可以通过`defineOptions()`方法来实现

```html
<!--父组件中调用Count-->
<template>
  <Count :class="['active']" id="box" />
</template>

<!--Count.vue 代码-->
<script>
  export default {
    inheritAttrs: false,
  };
</script>
<script setup>
  import { ref, useAttrs } from "vue";
  // attrs 相当于选项式API中的this.$attrs
  const attrs = useAttrs();
  console.log(attrs.class);
  console.log(attrs.id);
</script>

<template>
  <div>{{ attrs.class }} --- {{ attrs.id }}</div>
</template>
```

> 以上代码，最终渲染后效果如下：

```html
<div>active --- box</div>
```

注：

`class`与`id`属性并没有自动透传绑定 div 元素身上

### 4、defineOptions() 方法

在 **Vue3.3+** 以上版本，defineOptions 这个宏可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块

> `defineOptions()`方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用

```html
<!--父组件中调用Count-->
<template>
  <Count :class="['active']" id="box" />
</template>

<!--Count.vue 代码-->
<script setup>
  import { useAttrs } from "vue";
  // attrs 相当于选项式API中的this.$attrs
  const attrs = useAttrs();
  defineOptions({
    inheritAttrs: false,
    data() {
      return {
        msg: "Hello Vue",
      };
    },
  });
</script>

<template>
  <div>{{ msg }}</div>
  <div>{{ attrs.class }} --- {{ attrs.id }}</div>
</template>
```

> 以上代码最终渲染结果如下：

```html
<div>
  <div>Hello Vue</div>
  <div>active --- box</div>
</div>
```

> 属性自动透传行为被禁止，`msg`被正确的在模板中解析出来了

### 5、defineExpose() 方法

使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性

```html
<script setup>
  import { ref } from "vue";

  const msg = ref("Hello Count");
  const count = ref(1);
  // 对外暴露以下属性
  defineExpose({
    msg,
    count,
  });
</script>
```

**代码演示**

```
App.vue
<script setup>
  import Count from "./components/Count.vue";
  import { ref, onMounted } from "vue";
  const box = ref(null);
  const comp = ref(null);

  onMounted(() => {
    console.log(box.value); // <div>App.vue</div>
    console.log(comp.value.msg); // Hello Count
    console.log(comp.value.count); // 1
    console.log(comp.value.num); // undefined
  });
</script>

<template>
  <div ref="box">App.vue</div>
  <Count ref="comp" />
</template>
Count.vue
<script setup>
  import { ref } from "vue";
  const msg = ref("Hello Count");
  const count = ref(1);
  const num = ref(100);
  defineExpose({
    msg,
    count,
  });
</script>
<template>
  <div>{{ msg }}</div>
  <div>{{ count }}</div>
  <div>{{ num}}</div>
</template>
```

> 以上代码，渲染后在控制台输出如下内容

![image-20230519202930499](https://www.arryblog.com/assets/img/image-20230519202930499.2a83c5a4.png)

## 三、依赖与注入

在组合式 API 中，组件要为后代组件提供数据，后代组件要能使用上层组件提供的数据，需要经过以下两步：

- 上层组件通过`provide()`函数向后代组件提供数据
- 后代组件通过`inject()`函数注入上层组件提供的数据

### 1、provide() 函数

`provide()`函数用于在组合式 API 中为后代组件提供数据

```html
<script setup>
  import { provide } from "vue";
  provide(/* 注入名 */ "message", /* 值 */ "hello!");
</script>
```

参数详解

- 第一个参数为注入名，可以是一个字符串或一个 Symbol 类型，后代组件会用该注入名来查找期望的注入值
- 第二个参数是提供的值，值可以是任意类型，如果值是一个响应式的（如比 ref 或 reactive），则后代组件可以由此和提供者建立响应式的联系。

> 一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

### 2、inject() 函数

`inject()`函数用于在组合式 API 中，后代组件要注入上层组件提供的数据

```html
<script setup>
  import { inject } from "vue";
  const msg = inject("message", "默认值");
</script>
```

参数详解

- 第一个参数为注入名，通过注入名访问到上层组件提供的对应数据
- 第二个参数为默认值，如果上传组件没有提供该注入名，则会启用默认值

> 上层组件提供的数据如果是一个 ref 对象，注入进来的会是该 ref 对象，而不会自动解包，这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。不过在模板中使用时会自动解包。

**代码演示**

```
App.vue
<script setup>
  import Main from "./components/Main.vue";
  import { ref, reactive, provide } from "vue";
  // 响应式数据
  const userInfo = reactive({
    userName: "艾编程",
    age: 12,
    hobbies: ["画画", "唱歌", "音乐"],
  });
  function update() {
    userInfo.userName = "清心";
    userInfo.age = 30;
    userInfo.hobbies = ["写代码", "跑步", "阅读"];
  }
  // 提供数据
  provide("userInfo", userInfo);
  provide("update", update);
</script>

<template>
  <main />
</template>
Main.vue
<script setup>
  import Item from "./Item.vue";
</script>
<template>
  <Item />
</template>
Item.vue
<script setup>
  import { inject, reactive, toRefs } from "vue";
  // 注入数据
  const { userName, age, hobbies } = toRefs(inject("userInfo"));
  // 以下写法，解构后，将会失去响应性
  // const { userName, age, hobbies } = inject("userInfo")

  const update = inject("update");
</script>

<template>
  <button @click.once="update">更新数据</button>
  <div>姓名：{{ userName }}</div>
  <div>年龄：{{ age }}</div>
  <div>爱好：{{ hobbies }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-1922-19-11](https://www.arryblog.com/assets/img/GIF2023-5-1922-19-11.5e6118f2.gif)

## 四、生命周期钩子

深入浅出 Vue 组合式 API 中的生命周期钩子，生命周期函数示图，生命周期函数使用 等。

### 1、生命周期函数示图

> 我们再来回顾之前讲到的生命周期函数示图

![lifecycle.16e4c08e](https://www.arryblog.com/assets/img/lifecycle.16e4c08e.1ae3c5f4.png)

注：

组合式 API 中的生命周期函数与选项式 API 中是几乎是一一对应的，只是存在以下两点不同：

- 两者函数名写法上有所不同，组合式 API 生命周函数都以 on 开头，并采用驼峰命名，如下表。
- 组合式 API 中没有与之对应的`onBeforeCreate`与`onCreated`函数，所有期望在`beforeCreate`与`created`生命周期函数阶段执行的代码都可以写在在`setup()`函数或`<script setup>`标签中。

因为`setup()`与`<script setup>`中的代码会在`beforeCreate`生命周期函数之前被处理。相当于组合式 API 中所有写在`setup()`函数或`<script setup>`中的顶层变量或方法相当于选项式 API 中`data()`方法与`methods`选项等其它选项对外暴露的属性和方法。

**组合式 API 与选项式 API 中生命周期函数的对比表**

| 选项式 API    | 组合式 API      | 说明                                              |
| :------------ | :-------------- | :------------------------------------------------ |
| beforeCreate  | setup           | 在组件实例初始化完成之后立即调用                  |
| created       | setup           | 在组件实例处理完所有与状态相关的选项后调用。      |
| beforeMount   | onBeforeMount   | 组件被挂载之前被调                                |
| mounted       | onMounted       | 用组件挂载完成后执行                              |
| beforeUpdate  | onBeforeUpdate  | 组件即将因为响应式状态变更而更新其 DOM 树之前调用 |
| updated       | onUpdated       | 组件因为响应式状态变更而更新其 DOM 树之后调用     |
| beforeUnmount | onBeforeUnmount | 组件实例被卸载之前调用                            |
| unmounted     | onUnmounted     | 组件实例被卸载之后调用                            |

### 2、生命周期函数使用

- 组合式 API 中生命周期函数需要先导入，然后才能使用。
- 每个生命周期函数的第一个参数是一个回调函数，在组件或应用执行到此阶段时，会触发该回调函数。

```html
<script setup>
  // 导入生命周期函数
  import { onMounted } from "vue";
  // 只会在组件或应用执行到此生命阶段时，才会触发其回调函数
  onMounted(() => {
    console.log("DOM挂载完毕");
  });
</script>
```

> 如果在同一个 setup 中，同一个生命周期函数出现多次，则每个生命周期函数的回调都会触发，不存在覆盖的情况

```html
<script setup>
  // 导入生命周期函数
  import { onMounted } from "vue";
  // 只会在组件或应用执行到此生命阶段时，才会触发其回调函数
  onMounted(() => {
    console.log("111");
  });
  onMounted(() => {
    console.log("222");
  });
</script>
```

> 以上代码，最终页面加载完毕，会在控制台输出 "111" 与 ”222“

**代码演示**

```
App.vue
<script setup>
  import Count from "./components/Count.vue";
  import { ref } from "vue";
  const isShow = ref(true);
</script>
<template>
  <button @click="isShow = false">卸载组件</button>
  <Count v-if="isShow" />
</template>
Count.vue
<script setup>
  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from "vue";
  const count = ref(0);

  console.log("01:setup");

  onBeforeMount(() => {
    console.log("02:onBeforeMounted");
  });
  onMounted(() => {
    console.log("03:onMounted");
  });
  onBeforeUpdate(() => {
    console.log("04:onBeforeUpdate");
  });
  onUpdated(() => {
    console.log("05:onUpdated");
  });
  onBeforeUnmount(() => {
    console.log("06:onBeforeUnmount");
  });
  onUnmounted(() => {
    console.log("07:onUnmounted");
  });
</script>
<template>
  <button @click="count++">count++</button>
  <div>{{ count }}</div>
</template>
```

> 以上代码最终渲染后效果如下：

![GIF2023-5-1923-28-52](https://www.arryblog.com/assets/img/GIF2023-5-1923-28-52.df8c1a9e.gif)

## 五、组合式 API 常见疑问

组合式 API 的常见疑问，大家可以参 Vue 官方文档：[组合式 API 常见问题(opens new window)](https://cn.vuejs.org/guide/extras/composition-api-faq.html)

## 六、实战应用：带历史记录的搜索

本小节我们一起来完成《带历史记录的搜索》案例

> 具体效果如下：

![GIF2023-7-1418-47-54](https://www.arryblog.com/assets/img/GIF2023-7-1418-47-54.02cd61b0.gif)

### 1、项目功能介绍

> 首先我们来了解下，该案例所需要实现的功能点：

- 在搜索框中输入内容，并按回车键
  - 输入框中的内容添加到搜索历史列表中
  - 根据关键词搜索对应的课程，并且将搜索的结果以列表形式呈现在页面中
- 点击搜索框右则的取消按扭，可以取消输入框中的的内容
- 点击搜索历史列表中的关键字，可以触发搜索功能，将搜索的结果以列表形式呈现在页面中
- 点击搜索历史列表右则的删除按扭，可以清空搜索历史列表。

### 2、项目涉及核心知识点

> 该项目所涉及知识点较多，主要有：

| 知识点分类         | 涉及内容                                                                                                                |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Vue 基础（组合式） | 插值语法、列表渲染、v-bind 指令、表单元素绑定、事件绑定、样式绑定、事件修饰符 、watchEffect 侦听器、响应式 API-reactive |
| 组件间通信         | defineProps、defineEmits、组件 v-model                                                                                  |
| 原生 JS 基础       | 本地数据持久化： localStorage 本地存储、JSON.parse、JSON.stringify 数组相关 API：unshift                                |
| 网络请求           | axios                                                                                                                   |

### 3、学习目标

> 通过该案例的学习，我们将重点掌握以下内容

- 项目开发流程：如何一步步完成项目的开发，先做什么后做什么
- 组件拆分：一个完整的项目，应该如何进行组件化拆分
- 组件功能分析：分析拆分出来的组件具有那些功能，需要那些 props、事件、插槽等
- 组件间通信：在实际开发中，组件间通信时应该选择那一种通信方式最合适
