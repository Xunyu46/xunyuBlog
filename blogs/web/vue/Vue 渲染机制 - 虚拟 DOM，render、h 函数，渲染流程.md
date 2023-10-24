---
title: Vue 渲染机制 - 虚拟 DOM，render、h 函数，渲染流程
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
publish: true
---

# Vue 渲染机制 - 虚拟 DOM，render、h 函数，渲染流程

Vue 是如何将一份模板转换为真实的 DOM 节点的，这就需要我们了解 Vue 的渲染机制。要了解 Vue 的渲染机制，需要我们了解以下内容：

- Vue 描述 UI 的 2 种方式
- 虚拟 DOM
- 渲染函数（h 函数、render 函数）
- vue 渲染机制
- 深入 h 函数
- 渲染函数案例

> 相关资料查阅 Vue 官方文档，[渲染函数 & JSX(opens new window)](https://cn.vuejs.org/guide/extras/render-function.html)

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#一、vue-描述-ui-的-2-种方式)一、Vue 描述 UI 的 2 种方式

Vue 提供了以下两种方式来声明式描述 UI

- 模板语法来描述 UI
- 虚拟 DOM 来描述 UI

**模板语法**

- 以下代码使用模板语法来描述 UI

```html
<!-- 模板语法描述UI -->
<button @click="count++">{{ count }}</button>
```

**虚拟 DOM**

> 以下代码使用虚拟 DOM 来描述 UI

```js
/*
   h() 函数是Vue提供用来创建虚拟DOM ,函数的
      第一个参数：元素的HTML标签名
      第二个参数：标签元素的属性、事件等
      第三个参数：标签元素的子元素内容
*/
h("button", { onClick: () => count.value++ }, count.value);
```

注：

以上两段代码采用了不同的方式描述 UI，但最终渲染出来的结果是一模一样，都是告诉 Vue：

- 需要生成`button`元素，`button`元素的`innerText`值为`count`变量的值
- 为`button`元素绑定了`click`事件，点击按扭后，`count`变量的值 +1

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#二、虚拟-dom)二、虚拟 DOM

本小节我们将了解虚拟 DOM 的定义、如何手动创建虚拟 DOM、如何通过 JS 自动创建虚拟 DOM。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、虚拟-dom-定义)1、虚拟 DOM 定义

虚拟 DOM（Virtual DOM，简称 VDOM）是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

> **”虚拟 DOM“** 简单理解就是用一个纯 JavaScript 的对象来描述真实的 DOM 结构

”虚拟 DOM“ 这个概念是由 React 率先开拓，随后被许多不同的框架采用，当然也包括 Vue。

以下为真实 DOM

```html
<div id="box" class="active"></div>
```

转换成虚拟 DOM

```js
const vnode = {
  // 标签名 <div>
  tag: "div",
  // 标签上的属性
  props: {
    id: "box",
    class: "active",
  },
  children: null, // 可以是 null 空数组、"" 或 不存在 都可以
  // .....
};
```

注：

上面代码用一个 JS 对象表达 DOM 结构

- tag ：属性用来描述标签名称，所以`tag:'div'` 描述的就是一个`<div>`标签
- props：属性值是一个对象，用来描述标签的属性、事件等内容。所以`props:{id:'box',class:'active'}` 表示标签的属性，如：`<div id='box' class='active'></div>`
- children：属性用来描述标签的子节点，没有子节点，所以值为 null，当然也可是空数组，空字符串都可以。

**注意：** JS 对象表示 vnode 的写法并不是固定的，对象中属性名可以自定义，也可以增加其它属性来表示元素的其它信息，没有规定说一定要如何写才是对，只要能用一个对象来表达出 DOM 的信息，就是合理的。

> 与其说虚拟 DOM 是一种具体的技术，不如说是一种模式，所以并没有一个标准的实现。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、手动创建虚拟-dom)2、手动创建虚拟 DOM

- 将以下 DOM 结构转换为虚拟 DOM（vnode）

```html
<div id="box" class="active">
  <a href="xxx.html" target="_blank">
    <img src="xxx.png" alt="图片" />
  </a>
  <p>图片描述</p>
</div>
```

- 以上 DOM 结构转换为 vnode 如下

```js
const vnode = {
  // 标签名 <div>
  tag: "div",
  // 标签上的属性
  props: {
    id: "box",
    class: "active",
  },
  // 标签的子节点，数组中每一个对象用来描述一个子节点
  children: [
    // 第一个子节点，
    {
      tag: "a",
      props: {
        href: "xxx.html",
        target: "_blank",
      },
      children: [
        {
          tag: "img",
          props: {
            src: "xxx.png",
            alt: "图片",
          },
        },
      ],
    },
    // 第二个子节点
    {
      tag: "p",
      children: "图片描述",
    },
  ],
};
```

注：

上面代码用一个 JS 对象表达 DOM 结构

- tag ：属性用来描述标签名称，所以`tag:'div'` 描述的就是一个`<div>`标签
- props：属性值是一个对象，用来描述标签的属性、事件等内容。所以`props:{id:'box',class:'active'}` 表示标签的属性，如：`<div id='box' class='active'></div>`
- children：属性用来描述标签的子节点
  - 值可以是一个数组，数组中的每一个对象表示一个子节点。
  - 也可以是一个字符串，表示只有一个文本类的子节点。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3、自动创建虚拟-dom)3、自动创建虚拟 DOM

如果真实 DOM 的结构非常复杂，我们还采用手动形式来书写虚拟 DOM 这肯定是不可行的。所以我们可以创建一个方法，用来将真实 DOM 转换成虚拟 DOM

**实现原理**

- 创建一个函数，根据真实 DOM 节点返回 vnode
- 处理节点标签名
- 处理节点属性
- 处理节点的子节点

**实现步骤**

- 创建一个函数`createNode`，该函数的第一个参数为真实 DOM 元素，然后返回该 DOM 元素的 vnode

```js
function createNode(el) {
  const vnode = {};
  // ....
  return vnode;
}
// 返回#box的vnode
const vnode = createNode(document.getElementById("box"));
```

- 判断 el 是否是元素节点，如果是元素节点，则获取该元素的标签名

```js
// 1、判断el是否为元素节点，如果是，获取该元素的标签名
if (el.nodeType === 1) {
  vnode.tag = el.tagName.toLowerCase();
}
```

- 获取元素节点的所有属性，然后将属性名与属性值作为 props 的属性和属性值

```js
// 2、获取元素节点的所有属性，然后将属性名与属性值作为props的属性和属性值
const attrs = el.attributes;
// 如果有属性
if (attrs.length) {
  const props = {};
  vnode.props = props;
  [...attrs].forEach((attr) => {
    // 取出对应属性的属性名与属性值
    let { name, value } = attr;
    props[name] = value;
  });
}
```

- 获取该元素节点的子节点，如果存在，创建`vnode.children=[]`,用来保存子节点。
- 在添加前，要判断子节点的类型。
  - 如果子节点为文本节点，则直接将文本节点的 nodeValue 添加到数组中
  - 如果子节点为元素节点，则利用递归，获取子节点的 vnode，然后将 vnode 添加到数组中。

```js
// 3、获取子节点
const children = el.childNodes;
// 如果存在子节点
if (children.length) {
  vnode.children = [];
  [...children].forEach((child) => {
    // 如果为文本节点
    if (child.nodeType === 3) {
      // 如果不考虑空的文本节点，可以加个判断
      if (child.nodeValue.trim()) {
        vnode.children.push(child.nodeValue.trim());
      }
      // 如果为元素节点
    } else if (child.nodeType === 1) {
      vnode.children.push(createNode(child));
    }
  });
}
```

> 最终完整版代码如下：

```js
export default function createNode(el) {
  const vnode = {};

  // 1、判断el是否为元素节点，如果是，获取该元素的标签名
  if (el.nodeType === 1) {
    vnode.tag = el.tagName.toLowerCase();

    // 2、获取元素的所有属性，然后遍历，将属性与属性对应值添加到props对象上
    const attrs = el.attributes;
    // 如果有属性
    if (attrs.length) {
      const props = {};
      vnode.props = props;
      [...attrs].forEach((attr) => {
        let { name, value } = attr;
        props[name] = value;
      });
    }
    // 3、获取子节点
    const children = el.childNodes;
    // 如果存在子节点
    if (children.length) {
      vnode.children = [];
      [...children].forEach((child) => {
        // 如果为文本节点
        if (child.nodeType === 3) {
          // 如果不考虑空的文本节点，可以加个判断
          if (child.nodeValue.trim()) {
            vnode.children.push(child.nodeValue.trim());
          }
          // 如果为元素节点
        } else if (child.nodeType === 1) {
          vnode.children.push(createNode(child));
        }
      });
    }
  }

  // ....
  return vnode;
}
```

代码测试示例

```html
<div id="box" class="active">
  <a href="xxx.html" target="_blank">
    <img src="xxx.png" alt="图片" />
  </a>
  <p>图片描述</p>
  文本节点内容
</div>

<script>
  const vnode = createNode(document.getElementById("box"));
  console.log(vnode);
</script>
```

最终生成如下虚拟 DOM

```json
{
  "tag": "div",
  "props": {
    "id": "box",
    "class": "active"
  },
  "children": [
    {
      "tag": "a",
      "props": {
        "href": "xxx.html",
        "target": "_blank"
      },
      "children": [
        {
          "tag": "img",
          "props": {
            "src": "xxx.png",
            "alt": "图片"
          }
        }
      ]
    },
    {
      "tag": "p",
      "children": ["图片描述"]
    },
    "文本节点内容"
  ]
}
```

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#三、vue-渲染函数)三、Vue 渲染函数

前面我们提到 Vue 提供了 **模板语法** 与 **虚拟 DOM** 两种方式来声明式的描述 UI，那 Vue 是如何将模板与虚拟 DOM 转换为真实的 DOM 节点呢 ？这就需要用到 Vue 提供的以下两个函数：

- `h()`函数：创建虚拟 DOM
- `render()`渲染函数：返回虚拟 DOM

**代码示例**

以下 Vue 代码利用`h()`函数来创建虚拟 DOM，然后利用`render`渲染函数返回虚拟 DOM。最终 Vue 会利用**渲染器**将虚拟 DOM 转换为真实 DOM 显示在页面中。

```html
<script>
  import { h, ref } from "vue";
  export default {
    setup() {
      let count = ref(10);
      /*
             	h() 函数用来创建虚拟DOM ,函数的
                第一个参数：元素的HTML标签名
                第二个参数：标签元素的属性、事件等
                第三个参数：标签元素的子元素内容
                setup函数返回值为 render渲染函数  render函数返回用虚拟DOM树，最终Vue渲染器会将虚拟DOM渲染成真实DOM挂载到页面中。
			*/
      return () => h("button", { onClick: () => count.value++ }, count.value);
    },
  };
</script>
```

> 最终渲染效果如下，点击按扭后，数字会自动加 1

![GIF2023-7-1115-43-22](data:image/gif;base64,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)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、h-函数的语法)1、h() 函数的语法

- Vue 提供的`h()`函数是用创建 vnodes
- `h()` 是 **hyperscript** 的简称 —— 意思是 “能生成 HTML（超文本标记语言）的 JavaScript”

**语法**

```js
function h(
 type: string | Component,
 props?: object | null,
 children?: Children | Slot | Slots
): VNode

// children值的三种类型
type Children = string | number | boolean | VNode | null | Children[]
type Slot = () => Children  // 组件默认插槽内容
type Slots = { [name: string]: Slot }  //  组件插槽内容
```

参数

- type：如果值为字符串，表示生成 DOM 元素的标签名。如果是一个 Vue 组件，表示将组件转换为 vnode
- props ：可选参数，用于定义生成后标签元素或组件的属性、事件，值可以是一个对象也可以 null
- children：可选参数，用于生成标签元素的子节点或组件的插槽内容

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、h-函数的基本用法)2、h 函数的基本用法

实际上`h()`函数的使用非常灵活。`h`函数可以

- 创建原生 HTML 元素的 vnode
- 也可以创建组件的 vnode

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-1、创建-html-元素的-vnode)2.1、创建 HTML 元素的 vnode

以下代码为测试示例，你可以更改以下代码的`h()`，来查看最终生成的 DOM，掌握`h`函数的用法

```html
<script>
  import { h } from "vue";
  export default {
    setup() {
      return () => h("div");
    },
  };
</script>
```

- h 函数被传入三个参数，第一个参数为标签名，第二个为标签属性，第三个为子节点

```js
h("div", { id: "box" }, "Hello Vue!!");

// 以上代码，最终生成如下结构的vnode
const vndoe = {
  type: "div",
  props: { id: "box" },
  children: "Hello Vue!!",
  //......
};
//  渲染后DOM :   <div id='box'> Hello Vue!! </div>
```

- 第一个参数必填，表示标签名，其它两个参数为可选项

```js
h("div"); // 渲染后DOM : <div></div>
h("div", { id: "foo" }); // 渲染后DOM :<div id='foo'></div>
```

- 没有 prop 时可以省略不写，第二个参数表示子节点

```js
h("div", "hello"); //  渲染后DOM :<div>hello</div>
h("div", [h("span", "hello")]); // 渲染后DOM : <div><span>hello</span></div>
```

- 第三个参数`children`，可以是是以下任意类型

```js
/* 字符串、数字、布尔值、虚拟DOM、null 、数组（成员为前面几种类型组成） */
type Children = string | number | boolean | VNode | null | Children[];
h("div", { id: "foo" }, "hello");
// 渲染后DOM :<div id="foo">hello</div>

h("div", true);
//  渲染后DOM:<div>true</div>

h("div", h("span", { class: "sp" }));
// 渲染后DOM <div><span class="sp"></span></div>

h("div", ["hello", h("span", "hello")]);
// 渲染后DOM : <div>hello<span>hello</span></div>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-2、创建组件的-vnode)2.2、创建组件的 vnode

当给组件创建 vnode 时，传入给`h()`函数的

- 第一个参数应当是组件的定义
- 第二个参数是传递给组件的 prop 或 事件监听
- 第三个参数是传递给组件的插槽内容，如果组件只有默认槽，可以使用单个插槽函数进行传递。否则，必须以插槽函数的对象形式来传递。

```js
type Slot = () => Children; // 只有一个默认插槽时，通过插槽函数传递插槽内容
type Slots = { [name: string]: Slot }; // 多个插槽时，要通过插槽函数对象形式传递插槽内容
```

**代码示例**

- `App.vue`

```html
<script>
  import { h, ref } from 'vue';
  import A from "./components/A.vue"

  export default {
      setup() {
          const title = ref("新闻标题");
          const info = ref("新闻内容");

          function update() {
              title.value = "标题XXX";
              info.value = "内容XXX"

          // 渲染函数
          return () => h(
              // 组件定义
              A,
              // 组件属性与事件
              {
                  title: title.value,  // prop属性
                  info: info.value,  //  prop属性
                  onUpdate: update  // 组件监听事件
              },
              // 只传递默认插槽内容
              // () => h('div', { class: "header" }, "最新动态"),
              // 传递多个插槽内容
              {
                  default: () => h('div', { class: "header" }, "最新动态"),
                  footer: () => h('div', { class: 'footer' }, "底部")
              }
          )
      }
  }
</script>

<style scoped>
  .header,
  .footer {
    margin: 20px 0;
    background-color: skyblue;
  }
</style>
```

- `A.vue`

```html
<script setup>
  // props
  defineProps(["title", "info"]);
  // emit
  defineEmits(["update"]);
</script>

<template>
  <div class="com-a">
    <!-- 默认插槽 -->
    <slot></slot>

    <div class="main">
      <h3>{{ title }}</h3>
      <p>{{ info }}</p>
      <button @click="$emit('update')">更新</button>
    </div>

    <!-- 具名插槽 -->
    <slot name="footer"></slot>
  </div>
</template>

<style scoped>
  .main {
    background-color: #ddd;
  }
</style>
```

> 以上示例最终渲染效果如下：

![image-20230711220200721](https://www.arryblog.com/assets/img/image-20230711220200721.b5601e88.png)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3、渲染函数的基本用法)3、渲染函数的基本用法

`render()`用于编程式地创建组件虚拟 DOM 树的函数，返回值为 VNodeChild 类型。

> 在以下三种情况会用到渲染函数

- 选项式 API 中的 render 选项
- `setup()`函数直接返回 render 渲染函数
- `<script setup>`中使用 render 渲染函数

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3-1、选项式-api)3.1、选项式 API

- 在选项式 API 中，我们可以使用 `render` 选项来声明渲染函数
- `render()`函数中的 this 为当前组件实例，所以在`render()`函数中可以访问组件的属性和方法等

```html
<!-- App.vue -->
<script>
  import { h } from "vue";
  export default {
    data() {
      return {
        message: "Hello Vue!!",
      };
    },
    render() {
      // 返回值为vnode
      return h("div", { id: "box" }, this.message);
    },
  };
</script>
```

> 以上 App 组件最终渲染后的真实 DOM 如下：

```html
<div id="box">Hello Vue!!</div>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3-2、setup-函数中)3.2、setup() 函数中

- 组合式 API 中，`setup()`钩子可以直接返回渲染函数。
- 在 `setup()` 内部声明的渲染函数天生能够访问在同一范围内声明的 props 和许多响应式状态。

```html
<script>
  import { h, ref } from "vue";
  export default {
    props: ["text"], // props.text的值是 Vue!!
    data() {
      return {
        message: "Hello", // setup中访问不到
      };
    },
    setup(props) {
      const msg = ref("Hello");
      return () => {
        return h("div", { id: "box" }, msg.value + props.text);
      };
    },
  };
</script>
```

> 以上 App 组件最终渲染后的真实 DOM 如下：

```html
<div id="box">Hello Vue!!</div>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3-3、在-script-setup-中使用)3.3、在 `<script setup>` 中使用

在 setup 中，一个带有 render 选项的 JS 对象就会被当成组件渲染，可以直接在模板中使用。

```html
<script setup>
  import { h, ref } from "vue";
  const info = ref("ComA");
  const ComA = {
    render() {
      return h("div", info.value);
    },
  };
</script>

<template>
  <ComA></ComA>
</template>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_4、根渲染函数)4、根渲染函数

根渲染函数是用将一个 vnode 转换为真实 DOM 挂载到指定的 DOM 容器中。

**语法：**

```js
function render(vnode, container, isSVG?: boolean) {}
```

**代码示例**

```html
<script setup>
  import { h, render, ref, onMounted } from "vue";
  // 创建vnode
  const vnode = h("div", { id: "box" }, "Hello Vue!!");
  // 获取.container元素
  const container = ref(null);
  onMounted(() => {
    // 将vnode转换为真实DOM挂载到页面
    // 第一个参数为vnode，第二个参数为挂载容器
    render(vnode, container.value);
    // render(vnode, document.body)
  });
</script>
<template>
  <div class="container" ref="container"></div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_5、渲染函数-与-template-模板)5、渲染函数 与 template 模板

- `render`函数是字符串模板的一种替代，所以不能一个组件中同时拥有`render`和`template`。
- 因为单文件组件中的`template`模板，会在构建时被编译为`render`函数，添加到组件实例上。

**代码示例**

- `A.vue`文件

```html
<script setup>
  import { ref } from "vue";
  const msg = ref("A组件");
</script>
<template>
  <div>A组件</div>
</template>
```

- `App.vue`

```html
<script setup>
  import A from "./components/A.vue";
  console.log(A);
</script>
<template></template>
```

> 最终在控制台打印出的 A 是一个带有 render 选项的 JS 对象

![image-20230704224251227](https://www.arryblog.com/assets/img/image-20230704224251227.d03ca8d8.png)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_6、模板-vs-渲染函数)6、模板 VS 渲染函数

Vue 提供了以下两种方式来声明式描述 UI

- 使用模板语法来描述 UI
- 使用虚拟 DOM 来描述 UI

> 在绝大多数情况下，Vue 推荐使用模板语法来创建应用，主要原因有：

- 模板更贴近实际的 HTML。这使得我们能够更方便地重用一些已有的 HTML 代码片段，能够带来更好的可访问性体验、能更方便地使用 CSS 应用样式，并且更容易使设计师理解和修改。
- 由于其确定的语法，更容易对模板做静态分析。这使得 Vue 的模板编译器能够应用许多编译时优化来提升虚拟 DOM 的性能表现 。具体内容参考 Vue 官网：[带编译时信息的虚拟 DOM(opens new window)](https://cn.vuejs.org/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom)

在实践中，模板对大多数的应用场景都是够用且高效的。渲染函数一般只会在需要处理高度动态渲染逻辑的可重用组件中使用。

> 比如接下来要讲到的《动态生成带锚点标题》的案例，使用渲染函数要比使用模板语法来的更简洁高效易读。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_7、实战应用-动态生成带锚点标题)7、实战应用：动态生成带锚点标题

我们希望创建如下这样一个组件，这个组件可以根据传入的`level`属性值，动态生成带有链接的的 h 标签。

```html
<AnchoredHeading :level="3" href="http://www.icodingedu.com"
  >艾编程</AnchoredHeading
>

<!-- 以上代码最终编译后的真实DOM如下 -->
<h3><a href="http://www.icodingedu.com">艾编程</a></h3>
```

> 我们采用模板语法和虚拟 DOM 两种方式来描述 UI，通过对比来看那种方式更简洁

- 模板语法来描述 UI

```html
<script setup>
  defineProps(["level", "href"]);
</script>
<template>
  <h1 v-if="level === 1">
    <a :href="href">
      <slot></slot>
    </a>
  </h1>
  <h2 v-else-if="level === 2">
    <a :href="href">
      <slot></slot>
    </a>
  </h2>
  <h3 v-else-if="level === 3">
    <a :href="href">
      <slot></slot>
    </a>
  </h3>
  <h4 v-else-if="level === 4">
    <a :href="href">
      <slot></slot>
    </a>
  </h4>
  <h5 v-else-if="level === 5">
    <a :href="href">
      <slot></slot>
    </a>
  </h5>
  <h6 v-else-if="level === 6">
    <a :href="href">
      <slot></slot>
    </a>
  </h6>
</template>
```

- 虚拟 DOM 描述 UI

```html
<script>
  import { h } from "vue";
  export default {
    props: ["level", "href"],
    setup(props, { slots }) {
      return () =>
        h("h" + props.level, h("a", { href: props.href }, slots.default()));
    },
  };
</script>
```

> 通过对比，明显采用虚拟 DOM 描述 UI 的方式在这里更合适，代码相对要简洁很多。

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#四、vue-渲染机制)四、Vue 渲染机制

通过前面的学习，我知道 Vue 提供了**模板语法** 与 **虚拟 DOM**两种方式声明式描述 UI。

如果 Vue 提供虚拟 DOM 来描述 UI，则需要用到 h 函数来创建虚拟 DOM，render 函数来返回虚拟 DOM。最终 vue 渲染器会将 vnode 转换为真实 DOM。**但渲染器是如何将 vnode 转换为真实 DOM 的呢 ？**

如果 Vue 采用模板语法来描述 UI，**那模板最终会被编译成什么，又如何转换成真实 DOM 的呢？**

> 要回答面提到的两个问题，就需要先掌握以下几个知识点：

- 编译器
- 虚拟 DOM
- 渲染器
- 渲染器渲染组件

当我们了解了以上知识点后，我们就知道 Vue 的整个渲染流程和渲染机制了。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、编译器)1、编译器

Vue 中的编译器主要是将 Vue 的模板编译成渲染函数，该渲染函数会添加到组件实例上。这一步通常是通过构建步骤提前完成的，也可以使用运行时编译器即时完成。即：

- 如果我们采用虚拟 DOM 来描述 UI，并不需要用到编译器，因为我们是直接通过`h()`函数来创建 vnode，然后在`render`渲染函数中返回 vnode。
- 只有采用模板语法来描述 UI 时，才需要用到编译器。

> 定义了一个 Vue 组件：

```html
<!--A组件-->
<script setup>
  function handler() {}
</script>
<template>
  <div @click="handler">点我</div>
</template>
```

在构建时，编译器会将上模板转换为一个与之功能相同的渲染函数，添加到组件实例上。

> 以上单文件组件最终被转换成如下代码：

```js
function handler() {}
const A = {
  __name: "A", // 组件名
  render() {
    //  h函数，用来生成vnode，
    return h("div", { onClick: handler }, "点我");
  },
  //	......省略更多属性
};
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、渲染器)2、渲染器

通过前面的学习我知道，如果 Vue 项目采用的是模板语法来描述 UI，则在构建项目时首先会利用编译器将模板编译成`render`渲染函数，渲染函数的返回值为虚拟 DOM。

那 Vue 是如何将一个虚拟 DOM 转换为一个真实的 DOM 并渲染到浏览器页面中呢 ？这就需要借助渲染器来实现。

> 渲染器的作用就是把虚拟 DOM 渲染为真实 DOM

![image-20230704174016339](https://www.arryblog.com/assets/img/image-20230704174016339.95a2fd65.png)

**代码示例**

> 将以下 vnode 渲染成一个真实的 DOM

```js
// 虚拟DOM中需要用到的事件处理函数
function handler() {
  alert("我被点击了");
}
// vnode为虚拟DOM
const vnode = {
  // html元素标签名
  tag: "div",
  // 元素身上的属性
  props: {
    id: "box",
  },
  // 元素子节点
  children: [
    {
      tag: "button",
      props: {
        onClick: handler, // 绑定一个click事件，事件处理函数为handler
      },
      children: "点我",
    },
  ],
};
```

> 编写一个渲染器，将上面虚拟 DOM 转换为真实 DOM

实现思路：

- **创建 html 元素**：把 `vnode.tag` 作为标签名来创建 DOM 元素
- **为元素添加属性和事件**：遍历`vnode.props`对象，如果 key 以 on 字符开头，说明它是一个事件，事件名为`on`之后的字符，则从`on`之后截图字符并利用`toLowerCase`函数将事件名转换为小写，最终得到合法的事件名称。如：`onClick`变成`click`，最后调用`addEventListener`方法为元素添加事件监听。
- **创建子节点**：首先判断 children 是否有内容，如果没有则不做任何处理，如果是一个字符串，则使用`createTextNode`方法创建一个文本节点，并将其加入到新创建的元素内。如果是一个数组，则遍历数组，然后递归`renderer`函数继续渲染子节点。
- **挂载**：将`vnode.tag`作为标签名创建的元素挂载到真实的 DOM 容器`container`中

**完整版代码**

```js
/**
 * 创建渲染器 renderer
 * vnode为需要渲染的虚拟DOM
 * container为一个真实DOM，渲染后的DOM需要挂载的容器
 */
function renderer(vnode, container) {
  // 获取tag属性，创建DOM元素
  const el = document.createElement(vnode.tag);
  // 遍历props，将属性与事件添加到元素身上
  for (const key in vnode.props) {
    // 如果key为on开头，表示添加的事件
    if (/^on/.test(key)) {
      // 将事件名，转换为小写，并去掉on
      const eventName = key.substring(2).toLocaleLowerCase();
      // 添加事件监听
      window.addEventListener(eventName, vnode.props[key]);
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  }
  // 判断是否有子节点,并判断是一个子节点还是多个，
  // 如果是一个，则是一个字符串，如果是多个，则是一个数组
  if (vnode.children && typeof vnode.children === "string") {
    // 创建文本类子节点
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    // 如果有多个子节点，则利用递归来处理
    vnode.children.forEach((child) => {
      renderer(child, el);
    });
  }
  // 将元素添加到挂载容器中
  container.appendChild(el);
}
```

> 以上 renderer 函数最终将 vnode 转换为一个真实 DOM 并渲染到页面中，具体效果如下：

![image-20230704172611686](https://www.arryblog.com/assets/img/image-20230704172611686.e6edb1b4.png)

温馨提示：

我们上们只学习了渲染器如何在初始化时创建 DOM 节点，但渲染器的核心是 DOM 的更新，DOM 的更新涉及到 diff 算法与响应式，非常复杂，目前暂时不讲解。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3、渲染器渲染组件)3、渲染器渲染组件

> 通过前面的学习我们知道

组件最终编译成一个带有 render 函数的对象。render 函数返回值是一组 vnode，这里的 vnode 就是`template`模板中的内容被编译器编译成了虚拟 DOM。

> 以下代码为编译后的组件实例

```js
// A组件实例
const A = {
  render() {
    //  h函数，用来生成vnode，
    return h("div", { onClick: handler }, "点我");
  },
  //	......省略更多属性
};
```

- 虚拟 DOM 是用一个纯 JavaScript 的对象来描述真实的 DOM 结构。其实虚拟 DOM 除了能描述真实 DOM 之外，还能够描述组件。只需要将 vnode 对象的 tag 属性定义为一个组件的定义就 ok。

> 以下为组件 A 的虚拟 DOM

```js
const vnode={
	tag：A  // A为组件实例
}
```

- **渲染器的作用就是把虚拟 DOM 渲染成一个真实 DOM**。那渲染器在渲染时，他如何判断是要渲染一个 HTML 元素，还是渲染一个组件呢？

> 渲染器在渲染时会判断传入的第一个参数 vnode 的 tag 属性值是一个字符串还是一个对象

- 如果是一个字符串则会渲染成 HTML 元素
- 如果是一个对象，则调用该对象的`render`方法得到`vnode`，然后递归调用用`renderer`渲染器来渲染 vnode。

> 为了使渲染器能渲染组件，我们需要对`renderer`函数做修改，具体如下：

```js
function renderer(vnode, container) {
  // 如果tag的值为字符串，则vnode描述的是标签元素
  if (typeof vnode.tag === "string") {
    // mountElement方法，就是原来的renderer方法
    mountElement(vnode, container);
    // 如果tag的值为对象，则vnode描述的是组件
  } else if (typeof vnode.tag === "object") {
    mountComponent(vnode, container);
  }
}
```

- mountElement 函数用来渲染标签元素，与前面提到的 renderer 函数内容一致。

```js
/**
 * 创建渲染器
 * vnode为需要渲染的虚拟DOM
 * container为一个真实DOM，渲染后的DOM需要挂载的容器
 */
function mountElement(vnode, container) {
  // 获取tag属性，创建DOM元素
  const el = document.createElement(vnode.tag);
  // 遍历props，将属性与事件添加到元素身上
  for (const key in vnode.props) {
    // 如果key为on开头，表示添加的事件
    if (/^on/.test(key)) {
      // 将事件名，转换为小写，并去掉on
      const eventName = key.substring(2).toLocaleLowerCase();
      // 添加事件监听
      window.addEventListener(eventName, vnode.props[key]);
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  }
  // 判断是否有子节点,并判断是一个子节点还是多个，
  // 如果是一个，则是一个字符串，如果是多个，则是一个数组
  if (vnode.children && typeof vnode.children === "string") {
    // 创建文本类子节点
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    // 如果有多个子节点，则利用递归来处理
    vnode.children.forEach((child) => {
      renderer(child, el);
    });
  }
  // 将元素添加到挂载容器中
  container.appendChild(el);
}
```

- mountComponent 函数，用来渲染组件。内容如下：

```js
function mountComponent(vnode, container) {
  // vnode.tag是组件对象，调用它的render函数得到组件要渲染的内容(vnode)
  const subtree = vnode.tag.render();
  mountElement(subtree, container);
}
```

**测试代码**

```js
// A组件实例
const A = {
  render() {
    return {
      tag: "div",
      props: {
        id: "com",
      },
      children: [
        {
          tag: "p",
          children: "组件内容",
        },
      ],
    };
  },
};

// DOM元素的虚拟DOM
const vnode1 = {
  tag: "div",
  props: {
    class: "box1",
  },
  children: "div元素",
};

// 组件A的虚拟DOM
const vnode2 = {
  tag: A,
};
// 渲染 html元素，挂载到#app容器中
renderer(vnode1, document.getElementById("app"));
// 渲染组件，最终将生成的html元素挂载到#app2容器中
renderer(vnode2, document.getElementById("app2"));
```

> 最终渲染后代码如下：

```html
<div id="app">
  <div class="box1">div元素</div>
</div>

<div id="app2">
  <div id="com">
    <p>组件内容</p>
  </div>
</div>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_4、vue-渲染流程)4、Vue 渲染流程

> 通过前面的学习，我们知道了 Vue 的渲染流程大致如下图：

![render-pipeline.03805016](https://www.arryblog.com/assets/img/render-pipeline.03805016.b75c5864.png)

编译

在项目构建阶段，会通过编译器将 Vue 模板编译为**渲染函数**，渲染函数用来返回虚拟 DOM 树

**挂载（渲染器）**

在运行项目时，渲染器会调用组件身上的渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。当然内部还会做相关的响应式处理等更多优化。

**更新**

当某个响应式数据发生是变化时，会创建一个更新后的虚拟 DOM 树，然后渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#五、深入-h-函数)五、深入 h 函数

前端我们对`h`函数的用法做了一定的了解，接下来我们针对没有讲到的一些内容做相关补充

- attribute 和 property 都可以用于 prop，Vue 会自动选择正确的方式来分配它

```js
h("div", { class: "bar", innerHTML: "hello" });
// 渲染后DOM : <div class="bar">hello</div>
```

- class 与 style 可以像在模板中一样，用数组或对象的形式书写

```html
<script>
  import { h, ref } from "vue";
  export default {
    setup() {
      const foo = ref("foo");
      const bar = ref(true);
      return () =>
        h("div", { class: [foo.value, { bar }], style: { color: "red" } });
    },
  };
</script>

<!-- 渲染后DOM如下-->
<div class="foo bar" style="color: red;"></div>
```

- 给元素添加事件监听器以`onxxx`的形式书写

```js
h(
  "div",
  {
    onClick: () => {
      alert("点击了");
    },
  },
  "点我"
);
// 渲染后DOM : <div>点我</div>
// 元素添加了点击事件，点击元素时，会弹出弹窗，显示"点击了"
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、vnodes-必须唯一)1、vnodes 必须唯一

组件树中的 vnodes 必须是唯 一的，以下为错误示范:

```html
<script>
  import { h } from "vue";
  const p = h("p", "hi");

  export default {
    setup() {
      return () => h("div", [p, p]);
    },
  };
</script>
```

如果 vnodes 是一样的，那后期操作 DOM 时，操作第一个 p 会影响到第二个 p

如果你真的非常想在页面上渲染多个重复的元素或者组件，你可以使用一个工厂函数来做这件事。

> 以下代码可以渲染出 10 个一样的 p 标签

```html
<script>
  import { h } from "vue";
  export default {
    setup() {
      return () =>
        h(
          "div",
          Array.from({ length: 20 }).map(() => h("p", "h1"))
        );
    },
  };
</script>
```

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#六、渲染函数案例)六、渲染函数案例

本小节我们来利用渲染函数实现与模板语法相同的功能。如：利用渲染函数实现

- v-on 事件
- v-if 指令
- v-for 指令
- 事件修饰符
- 动态组件
- 内置组件
- 渲染插槽
- 传递插槽
- 组件 v-model
- 自定义指令
- 模板引用

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、v-on-事件)1、v-on 事件

> 模板描述 UI

```html
<script setup>
  import { ref } from "vue";
  const count = ref(0);
</script>
<template>
  <button @click="count++">{{ count }}</button>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, ref } from "vue";
  export default {
    setup() {
      const count = ref(0);
      return () => h("button", { onClick: () => count.value++ }, count.value);
    },
  };
</script>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、v-if-指令)2、v-if 指令

> 模板描述 UI

```html
<script setup>
  import { ref } from "vue";
  const isShow = ref(true);
</script>
<template>
  <!--模板语法-->
  <div>
    <button @click="isShow = !isShow">切换</button>
    <div v-if="isShow">A内容</div>
    <div v-else>B内容</div>
  </div>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, ref } from "vue";
  export default {
    setup() {
      const isShow = ref(true);
      // 渲染函数--------------
      return () =>
        h("div", [
          h(
            "button",
            { onClick: () => (isShow.value = !isShow.value) },
            "切换"
          ),
          isShow.value ? h("div", "A内容") : h("div", " B内容"),
        ]);
    },
  };
</script>
```

> 最终渲染效果如下：

![GIF2023-7-1122-31-47](https://www.arryblog.com/assets/img/GIF2023-7-1122-31-47.0d202d28.gif)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3、v-for)3、v-for

> 模板描述 UI

```html
<script setup>
  import { reactive } from "vue";
  const list = reactive([1, 2, 3]);
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, reactive } from "vue";
  export default {
    setup() {
      const list = reactive([1, 2, 3]);
      return () =>
        h(
          "ul",
          list.map((item, index) => h("li", { key: index }, item))
        );
    },
  };
</script>
```

> 最终渲染效果如下：

![image-20230711225148172](data:image/png;base64,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)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_4、事件修饰符)4、事件修饰符

- 对于 `.passive`、`.capture` 和 `.once` 事件修饰符，可以使用驼峰写法将他们拼接在事件名后面：

> 模板描述 UI

```html
<script setup>
  import { ref } from "vue";
  const count = ref(1);
</script>
<template>
  <!--只能点击一次，按下enter抬起键盘背景变红色-->
  <button @click.once="count++">{{ count }}</button>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, ref } from "vue";
  export default {
    setup() {
      const count = ref(0);
      return () =>
        h(
          "button",
          {
            onClickOnce: () => count.value++,
          },
          count.value
        );
    },
  };
</script>
```

- 对于事件和按键修饰符，可以使用 [`withModifiers` (opens new window)](https://cn.vuejs.org/api/render-function.html#withmodifiers)函数：

> 模板描述 UI

```html
<script setup>
  import { h, ref } from "vue";
  const count = ref(0);
</script>
<template>
  <div @click.self="count++">
    <span>{{ count }}</span>
  </div>
</template>
<style scoped>
  div {
    width: 50px;
    height: 50px;
    padding: 50px;
    background-color: skyblue;
  }

  div span {
    display: block;
    width: 50px;
    height: 50px;
    background-color: khaki;
  }
</style>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, ref, withModifiers } from "vue";
  export default {
    setup() {
      const count = ref(0);
      return () =>
        h(
          "div",
          {
            onClick: withModifiers(() => count.value++, ["self"]),
          },
          [h("span", count.value)]
        );
    },
  };
</script>
<style scoped>
  div {
    width: 50px;
    height: 50px;
    padding: 50px;
    background-color: skyblue;
  }

  div span {
    display: block;
    width: 50px;
    height: 50px;
    background-color: khaki;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_5、组件)5、组件

> 模板描述 UI

```html
<script setup>
  import { shallowRef } from "vue";
  import A from "./components/A.vue";
  import B from "./components/B.vue";
  const current = shallowRef(A);
</script>
<template>
  <button @click="current = B">切换到B</button>
  <component :is="current"></component>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, shallowRef } from "vue";
  import A from "./components/A.vue";
  import B from "./components/B.vue";

  export default {
    setup() {
      const current = shallowRef(A);
      return () =>
        h("div", [
          h("button", { onClick: () => (current.value = B) }, "切换到B"),
          // 渲染组件的虚拟DOM
          h(current.value),
        ]);
    },
  };
</script>
```

> 最终渲染效果如下：

![GIF2023-7-1123-36-16](https://www.arryblog.com/assets/img/GIF2023-7-1123-36-16.79fd4332.gif)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_6、内置组件)6、内置组件

诸如 `<KeepAlive>`、`<Transition>`、`<TransitionGroup>`、`<Teleport>` 和 `<Suspense>` 等[内置组件 (opens new window)](https://cn.vuejs.org/api/built-in-components.html)在渲染函数中必须导入才能使用：

> 模板描述 UI

```html
<script setup>
  import { h, shallowRef } from "vue";
  import A from "./components/A.vue";
  import B from "./components/B.vue";
  const current = shallowRef(A);
</script>
<template>
  <button @click="current = B">切换到B</button>
  <button @click="current = A">切换到A</button>
  <KeepAlive>
    <component :is="current"></component>
  </KeepAlive>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, shallowRef, resolveComponent, KeepAlive } from "vue";
  import A from "./components/A.vue";
  import B from "./components/B.vue";

  export default {
    setup() {
      const current = shallowRef(A);
      return () =>
        h("div", [
          h("button", { onClick: () => (current.value = B) }, "切换到B"),
          h("button", { onClick: () => (current.value = A) }, "切换到A"),
          h(KeepAlive, [h(current.value)]),
        ]);
    },
  };
</script>
```

> 最终渲染效果如下：

![GIF2023-7-1123-44-21](https://www.arryblog.com/assets/img/GIF2023-7-1123-44-21.57add776.gif)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_7、渲染插槽)7、渲染插槽

在渲染函数中，插槽可以通过 `setup()` 的上下文来访问。

每个 `slots` 对象中的插槽都是一个**返回 vnodes 数组的函数**：

> 模板描述 UI

```html
<template>
  <div>
    <!-- 具名插槽 -->
    <slot name="header"></slot>
    <!-- 默认插槽 -->
    <slot :info="{ a: 1}"></slot>
    <!-- 具名插槽 -->
    <slot name="footer"></slot>
  </div>
</template>
```

> 上面代码等价于下面代码

```html
<!--A组件-->
<script>
  import { h } from "vue";
  export default {
    // slots用来接受传递的插槽内容，返回该插槽的vnodes数组
    setup(props, { slots }) {
      return () =>
        h("div", [
          // <slot name="header"></slot>
          slots.header(),
          // <slot info={a:1}></slot>
          slots.default({
            info: { a: 1 },
          }),
          // <slot name="footer"></slot>
          slots.footer(),
        ]);
    },
  };
</script>
```

> 在组件中使用上面的 A 组件

```html
<script setup>
  import A from "./components/A.vue";
</script>
<template>
  <a>
    <template #header>
      <div class="header">头部</div>
    </template>

    <template #default="{ info }">
      <div class="main">主体参数：{{ info.a }}</div>
    </template>

    <template #footer>
      <div class="footer">底部</div>
    </template>
  </a>
</template>
```

> 最终渲染效果如下：

![image-20230712161207112](data:image/png;base64,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)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_8、传递插槽内容)8、传递插槽内容

在使用组件时，需要传递插槽内容，前面创建组件的 vnode 时讲过，可以参考：**深入 h 函数 - 创建组件的 vnode**

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_9、组件-v-model)9、组件 v-model

当我们在使用 A 组件时，在组件上绑定 v-model 指令，如下：

```html
<script setup>
  import { ref } from "vue";
  import A from "./components/A.vue";
  const isShow = ref(true);
</script>
<template>
  <a v-model="isShow"></a>
</template>
```

> 在 A 组件中要接受传过来的 props 和 emits，并在需要的时候触发事件。

模板描述 UI

```html
<!--A组件-->
<script>
  import { h } from "vue";
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
  };
</script>

<template>
  <button @click="$emit('update:modelValue', !modelValue)">切换</button>
  <div class="box" v-if="modelValue">内容</div>
</template>
```

上面代码等价于下面代码

```html
<script>
  import { h } from "vue";
  export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return () =>
        h("div", [
          h(
            "button",
            {
              onClick: () => emit("update:modelValue", !props.modelValue),
            },
            "切换"
          ),
          props.modelValue ? h("div", { class: "box" }, "内容") : "",
        ]);
    },
  };
</script>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_10、自定义指令)10、自定义指令

可以使用 [`withDirectives` (opens new window)](https://cn.vuejs.org/api/render-function.html#withdirectives)将自定义指令应用于 vnode

> 模板描述 UI

```html
<script setup>
  const vFocus = (el, binding) => {
    console.log(binding.value); // 指令值
    console.log(binding.arg); // 指令参数
    console.log(binding.modifiers); // 指令修饰符
    el.focus();
  };
</script>

<template>
  <input type="text" v-focus:color.enter="'red'" value="123" />
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { h, withDirectives } from "vue";

  export default {
    setup() {
      // 自定义指令
      const focus = (el, binding) => {
        console.log(binding.value); // 指令值
        console.log(binding.arg); // 指令参数
        console.log(binding.modifiers); // 指令修饰符
        el.focus();
      };
      return () =>
        withDirectives(
          // html元素
          h("input", { type: "text", value: "123" }),
          // 指令
          [[focus, "red", "color", { enter: true }]]
        );
    },
  };
</script>
```

> 以上代码最终渲染效果如下：

![image-20230712174144308](https://www.arryblog.com/assets/img/image-20230712174144308.2f614462.png)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_11、模板引用)11、模板引用

在组合式 API 中，模板引用通过将 `ref()` 本身作为一个属性传递给 vnode 来创建

> 模板描述 UI

```html
<script setup>
  import { ref, onMounted } from "vue";
  const box = ref(null);
  onMounted(() => {
    console.log(box.value.innerText);
  });
</script>

<template>
  <div ref="box">box内容</div>
</template>
```

> 上面代码等价于下面代码

```html
<script>
  import { ref, onMounted, h } from "vue";

  export default {
    setup() {
      const box = ref(null);
      onMounted(() => {
        console.log(box.value.innerText);
      });
      return () => h("div", { ref: box }, "box内容");
    },
  };
</script>
```

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#七、函数式组件)七、函数式组件

函数式组件是一种定义自身没有任何状态的组件的方式。

它们很像纯函数：接收 props，返回 vnodes。函数式组件在渲染过程中不会创建组件实例（也就是说，没有 `this`），也不会触发常规的组件生命周期钩子。

函数式组件的写法与`setup()`函数类似，其返回值为 vnode，

```js
// 函数式组件 没有expose
function MyComponent(props, { slots, emit, attrs }) {
  // ...
  return h("div"); // 返回vnode
}
```

大多数常规组件的配置选项在函数式组件中都不可用，除了 [`props` (opens new window)](https://cn.vuejs.org/api/options-state.html#props)和 [`emits` (opens new window)](https://cn.vuejs.org/api/options-state.html#emits)。我们可以给函数式组件添加对应的属性来声明它们：

```js
MyComponent.props = ["value"];
MyComponent.emits = ["click"];
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、函数式组件的基本用法)1、函数式组件的基本用法

函数式组件和普通函数一样被组册和使用

- 在`<script setup>`中定义函数式组件，则在模板中可以直接使用

```html
<script setup>
  import { h } from "vue";
  function MyComponent(props, { slots, emit, attrs }) {
    // ...
    return h("div", { class: "box" }, "函数式组件");
  }
</script>
<template>
  <MyComponent></MyComponent>
</template>
```

- 在选项式 API 中，需要先注册，然后才能使用

```html
<script>
  import { h } from "vue";
  function MyComponent(props, { slots, emit, attrs }) {
    // ...
    return h("div", { class: "box" }, "函数式组件");
  }
  export default {
    components: {
      MyComponent,
    },
  };
</script>

<template>
  <MyComponent></MyComponent>
</template>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、函数式组件复杂应用)2、函数式组件复杂应用

利用函数式组件实现如下`MyComponent`组件

```html
<script setup>
  defineProps(["title"]); // 声明接受的props
  defineEmits(["update"]); // 声明接受的事件
</script>

<template>
  <div class="box">
    <!--update方法更新title标题内容-->
    <button @click="$emit('update', 'xxxx函数式组件xxxx')">更新</button>
    <div>{{ title }}</div>
    <slot></slot>
    <slot name="main"></slot>
  </div>
</template>
```

在其它组件中使用`MyComponent`组件

```html
<script setup>
  import { h, ref } from "vue";
  //  import MyComponent from "./components/MyComponent.js"
  import MyComponent from "./components/MyComponent.vue";
  const title = ref("函数式组件");
  function update(value) {
    title.value = value;
  }
</script>

<template>
  <MyComponent :title="title" info="内容" @update="update">
    <template #default>
      <div>---默认插槽内容---</div>
    </template>
    <template #main>
      <div>---具名插槽main内容---</div>
    </template>
  </MyComponent>
</template>
```

上面代码等价下面的 函数式组件

```js
import { h } from "vue";

// props属性  slots 插槽   emit 触发器   attrs 透传属性
export default function MyComponent(props, { slots, emit, attrs }) {
  // 返回虚拟DOM
  return h("div", { class: "box" }, [
    h(
      "button",
      { onClick: () => emit("update", "xxxx函数式组件xxxx") },
      "更新"
    ),
    h("div", props.title),
    slots.default(), // 默认插槽
    slots.main(), // 具名插槽
  ]);
}

// 声明接受的props
MyComponent.props = ["title"];
// 声明接受的事件
MyComponent.emit = ["update"];
```

## [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#八、实战应用-无限下拉菜单)八、实战应用：无限下拉菜单

本小节我们一起来完成《无限下拉菜单》案例

> 具体效果如下：

![GIF2023-7-1918-26-28](https://www.arryblog.com/assets/img/GIF2023-7-1918-26-28.9fbdcdd5.gif)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1、项目介绍)1、项目介绍

首先我们来了解：项目功能、项目涉及核心知识点、学习目标

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1-1、项目功能)1.1、项目功能

该项目所需要实现的功能如下：

- 无论菜单有多少级，都能够递归渲染出来。
- 当鼠标滑动到对应的菜单上时，才会显示对应菜单的下级菜单。
- 针对有下级菜单的菜单不能点击跳转，针对没有下级菜单的菜单可以点击跳转

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1-2、项目涉及核心知识点)1.2、项目涉及核心知识点

> 该项目涉及知识点较多，主要有：

| 知识分类           | 涉及内容                                             |
| :----------------- | :--------------------------------------------------- |
| Vue 基础（组合式） | 插值语法、列表渲染、v-bind 指令、响应式 API-reactive |
| 组件间通信         | defineProps、slot 插槽                               |
| 其它知识           | 递归组件                                             |

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_1-3、学习目标)1.3、学习目标

- 组件拆分：一个完整的项目，应该如何进行组件化拆分
- 项目开发流程：如何一步步完成项目的开发，先做什么后做什么
- 递归组件：如何实现递归一个组件自身
- render 渲染函数：掌握渲染函数何递归组件。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2、项目开发流程)2、项目开发流程

深入浅出无限下拉菜单的开发流程，分析 UI 图，实现 UI 静态布局，拆分组件，确定数据源，渲染一级 与 二级菜单，渲染无限级菜单等。

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-1、分析-ui-图)2.1、分析 UI 图

首先我们需要通过 UI 图，分析当前项目可以拆分成哪些组件，当前项目可以拆分成以下 3 个组件（未包含当前应用的 APP 组件）

![image-20230719160511026](https://www.arryblog.com/assets/img/image-20230719160511026.fc3b8f15.png)

| 组件      | 功能                                                  |
| :-------- | :---------------------------------------------------- |
| MenuItem  | 单个菜单项                                            |
| SubMenu   | 二级菜单 （二级菜单子菜单调用`<MenuItem>`）           |
| ReSubMenu | 递归组件，用来递归自身。该组件内部调用`<SubMenu>`组件 |

> 组件间关系如下：

![image-20230719160948206](https://www.arryblog.com/assets/img/image-20230719160948206.cee1c8b3.png)

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-2、实现-ui-静态布局)2.2、实现 UI 静态布局

根据 UI 图，利用`HTML + CSS`实现静态布局，同时要把所有的交互效果用到的 CSS 样式也要写好。并且要清楚的知道每一个交互背后的实现逻辑。

**本案例中涉及到如下几个交互效果**

- 鼠标滑动到对应的菜单项，菜单项的背景变黄色
- 当鼠标滑动到对应菜单项的子项时，对应菜单项和子项的背景都变黄色
- 当鼠标滑动到对应的菜单项时，如果有子级，显示对应的子菜单项

![image-20230719170454436](data:image/png;base64,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)

```html
<div class="menu">
  <!--menu-item 只含一级菜单-->
  <div class="menu-item">
    <a href="#">菜单一</a>
  </div>
  <!--sub-menu 二级菜单-->
  <div class="sub-menu">
    <div class="title">
      菜单二
      <span>&gt;</span>
    </div>
    <div class="sub-item">
      <div class="menu-item">
        <a href="#">菜单二-21</a>
      </div>
      <div class="menu-item">
        <a href="#">菜单二-22</a>
      </div>
      <div class="menu-item">
        <a href="#">菜单二-23</a>
      </div>
    </div>
  </div>
  <!--sub-menu end-->

  <div class="menu-item">
    <a href="#">菜单三</a>
  </div>
</div>

<style>
  .menu {
    width: 200px;
    margin: 50px;
  }

  /* menu-item start */
  .menu-item {
    width: 100%;
  }

  .menu-item a {
    display: block;
    line-height: 35px;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
    text-decoration: none;
  }

  .menu-item a:hover {
    background-color: khaki;
  }

  /* sub-menu start */
  .sub-menu {
    height: 35px;
    position: relative;
  }

  .sub-menu:hover > .title {
    background-color: khaki;
  }

  .sub-menu:hover > .sub-item {
    display: block;
  }

  .sub-menu .title {
    height: 35px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
  }

  .sub-menu .title span {
    margin-right: 10px;
  }

  .sub-menu .sub-item {
    width: 100%;
    position: absolute;
    left: 100%;
    top: 0;
    display: none;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-3、拆分组件)2.3、拆分组件

- 按最开始的需求分析，将静态布局的内容拆分到如下图所示的 2 个组件中去，每个组件中有自己独立的 HTML + CSS
- 拆分后，还需要按各个组件间的关系组合起来，组合成一个完整的应用。
- 最终组合后效果与插分前效果要一模一样即为 OK。

![image-20230719170339234](data:image/png;base64,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)

- App 根组件

```html
<script setup>
  import MenuItem from "./components/MenuItem.vue";
  import SubMenu from "./components/SubMenu.vue";
</script>
<template>
  <div class="menu">
    <!--menu-item start-->
    <menuitem> </menuitem>
    <!--menu-item end-->

    <!--sub-menu start-->
    <SubMenu></SubMenu>
    <!--sub-menu end-->
  </div>
</template>
<style scoped lang="scss">
  .menu {
    width: 200px;
    margin: 150px;
  }
</style>
```

- MenuItem 组件

```html
<template>
  <div class="menu-item">
    <a href="#">菜单一</a>
  </div>
</template>
<style scoped>
  /* menu-item start */
  .menu-item {
    width: 100%;
  }

  .menu-item a {
    display: block;
    line-height: 35px;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
    text-decoration: none;
  }

  .menu-item a:hover {
    background-color: khaki;
  }
</style>
```

- SubMenu 组件

```html
<script setup>
  import MenuItem from "./MenuItem.vue";
</script>
<template>
  <div class="sub-menu">
    <div class="title">
      菜单二
      <span>&gt;</span>
    </div>
    <div class="sub-item">
      <menuitem> 菜单二-21</menuitem>
      <menuitem> 菜单二-22</menuitem>
      <menuitem> 菜单二-23</menuitem>
    </div>
  </div>
</template>
<style scoped>
  /* sub-menu start */
  .sub-menu {
    height: 35px;
    position: relative;
  }

  .sub-menu:hover > .title {
    background-color: khaki;
  }

  .sub-menu:hover > .sub-item {
    display: block;
  }

  .sub-menu .title {
    height: 35px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
  }

  .sub-menu:hover .title {
    background-color: khaki;
  }

  .sub-menu .title span {
    margin-right: 10px;
  }

  .sub-menu .sub-item {
    width: 100%;
    position: absolute;
    left: 100%;
    top: 0;
    display: none;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-4、确定数据源)2.4、确定数据源

整个应用中最核心的数据就是菜单列表，以下数据为模拟的菜单列表数据，定义在 `src/data/menu.js` 文件中

```js
export default [
  {
    id: 1,
    title: "菜单一",
    href: "http://www.xxx11.com",
  },
  {
    id: 2,
    title: "菜单二",
    children: [
      {
        id: 21,
        title: "菜单二-21",
        children: [
          {
            id: 211,
            title: "菜单21-1",
            href: "http://www.xxx211.com",
          },
          {
            id: 212,
            title: "菜单21-2",
            children: [
              {
                id: 2121,
                title: "菜单21-2-1",
                href: "http://www.xxx2121.com",
              },
            ],
          },
          {
            id: 213,
            title: "菜单21-3",
            href: "http://www.xxx213.com",
          },
        ],
      },
      {
        id: 22,
        title: "菜单二-22",
        href: "http://www.xxx22.com",
      },
      {
        id: 23,
        title: "菜单二-23",
        href: "http://www.xxx23.com",
      },
    ],
  },
  {
    id: 3,
    title: "菜单三",
    href: "http://www.xxx3.com",
  },
  {
    id: 4,
    title: "菜单四",
    href: "http://www.xxx4.com",
  },
];
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-5、渲染一级与二级菜单)2.5、渲染一级与二级菜单

我们先只考虑 1 级到二级菜单内容的渲染，然后再考虑递归组件渲染无限级菜单

在数据渲染时，我们希望菜单的内容由用户通过插槽来传入，这样用户就可以根据自己的需求来定义菜单的样式

`MenuItem`组件模板内容调整如下

```html
<script setup>
  defineProps(["href"]);
</script>
<template>
  <div class="menu-item">
    <a :href="href">
      <slot></slot>
    </a>
  </div>
</template>
```

`App`组件中将菜单数据渲染成列表

```html
<script setup>
  import MenuItem from "./components/MenuItem.vue";
  import SubMenu from "./components/SubMenu.vue";
  import menuList from "./data/menu.js";
</script>
<template>
  <div class="menu">
    <template v-for="item in menuList">
      <!--没有子菜单，就渲染一级-->
      <menuitem v-if="!item.children" :key="item.id" :href="item.href">
        {{ item.title }}
      </menuitem>
      <!--有子菜单，就渲染二级-->
      <SubMenu v-else :data="item"></SubMenu>
    </template>
  </div>
</template>
```

`SubMenu`组件对接受的 data 数据进行渲染

```html
<script setup>
  import MenuItem from "./MenuItem.vue";
  defineProps(["data"]);
</script>

<template>
  <div class="sub-menu">
    <div class="title">
      {{ data.title }}
      <span>&gt;</span>
    </div>
    <div class="sub-item">
      <menuitem
        v-for="child in data.children"
        :key="child.id"
        :href="child.href"
      >
        {{ child.title }}
      </menuitem>
    </div>
  </div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_2-6、渲染无限级菜单)2.6、渲染无限级菜单

不管菜单子级有多少项，我们需要渲染出来，这里就要考虑用到递归组件了。

我们新建一个`ReSubMenu`组件，这个组件主要是用来递归。只要当前菜单项有子级就要递归自身继续渲染。如果没有，则正常显示一级就 ok。

- 在 ReSubMenu 组件中调用 `SubMenu`组件，在 App 组件中调用`ReSubMenu`组件，并将一级菜单的数据内容传递过来。
- 根据传递的数据来渲染`SubMenu`组件，考虑到要渲染无限菜单，后续的子菜单内容要根在上一级菜单的后面，所以传递给`SubMenu`组件中的内容需要通过插槽来接受

`SubMenu`组件模板内容调整后如下

```html
<template>
  <div class="sub-menu">
    <div class="title">
      <slot name="title"></slot>
      <span>&gt;</span>
    </div>
    <div class="sub-item">
      <slot></slot>
    </div>
  </div>
</template>
```

`ReSubMenu`组件内容如下

```html
<script setup>
  import SubMenu from "./SubMenu.vue";
  import ReSubMenu from "./ReSubMenu.vue";
  import MenuItem from "./MenuItem.vue";
  defineProps(["data"]);
</script>

<template>
  <SubMenu>
    <template #title> {{ data.title }}</template>
    <template #default>
      <template v-for="child in data.children" :key="child.id">
        <menuitem v-if="!child.children" :href="child.href">
          {{ child.title }}
        </menuitem>
        <!-- 递归 -->
        <ReSubMenu v-else :data="child"></ReSubMenu>
      </template>
    </template>
  </SubMenu>
</template>
```

`App`组件内容如下：

```html
<script setup>
  import MenuItem from "./components/MenuItem.vue";
  import ReSubMenu from "./components/ReSubMenu.vue";
  import menuList from "./data/menu.js";
</script>
<template>
  <div class="menu">
    <template v-for="item in menuList">
      <!--menu-item start-->
      <menuitem v-if="!item.children" :key="item.id" :href="item.href"
        >{{ item.title }}</menuitem
      >
      <!--menu-item end-->
      <!--sub-menu start-->
      <ReSubMenu v-else :data="item" :key="item.id"></ReSubMenu>
      <!--sub-menu end-->
    </template>
  </div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/virtual-dom-render-process.html#_3、完整版代码)3、完整版代码

- `menu.js`

```js
export default [
  {
    id: 1,
    title: "菜单一",
    href: "http://www.xxx11.com",
  },
  {
    id: 2,
    title: "菜单二",
    children: [
      {
        id: 21,
        title: "菜单二-21",
        children: [
          {
            id: 211,
            title: "菜单21-1",
            href: "http://www.xxx211.com",
          },
          {
            id: 212,
            title: "菜单21-2",
            children: [
              {
                id: 2121,
                title: "菜单21-2-1",
                href: "http://www.xxx2121.com",
              },
            ],
          },
          {
            id: 213,
            title: "菜单21-3",
            href: "http://www.xxx213.com",
          },
        ],
      },
      {
        id: 22,
        title: "菜单二-22",
        href: "http://www.xxx22.com",
      },
      {
        id: 23,
        title: "菜单二-23",
        href: "http://www.xxx23.com",
      },
    ],
  },
  {
    id: 3,
    title: "菜单三",
    href: "http://www.xxx3.com",
  },
  {
    id: 4,
    title: "菜单四",
    href: "http://www.xxx4.com",
  },
];
```

- `App.vue`

```html
<script setup>
  import MenuItem from "./components/MenuItem.vue";
  import ReSubMenu from "./components/ReSubMenu.vue";
  import menuList from "./data/menu.js";
</script>
<template>
  <div class="menu">
    <template v-for="item in menuList">
      <!--menu-item start-->
      <menuitem v-if="!item.children" :key="item.id" :href="item.href"
        >{{ item.title }}</menuitem
      >
      <!--menu-item end-->
      <!--sub-menu start-->
      <ReSubMenu v-else :data="item" :key="item.id"></ReSubMenu>
      <!--sub-menu end-->
    </template>
  </div>
</template>
<style scoped lang="scss">
  .menu {
    width: 200px;
    margin: 150px;
  }
</style>
<style></style>
```

- `MenuItem.vue`

```html
<script setup>
  defineProps(["href"]);
</script>
<template>
  <div class="menu-item">
    <a :href="href">
      <slot></slot>
    </a>
  </div>
</template>
<style scoped>
  /* menu-item start */
  .menu-item {
    width: 100%;
  }

  .menu-item a {
    display: block;
    line-height: 35px;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
    text-decoration: none;
  }

  .menu-item a:hover {
    background-color: khaki;
  }
</style>
```

- `SubMenu.vue`

```html
<template>
  <div class="sub-menu">
    <div class="title">
      <slot name="title"></slot>
      <span>&gt;</span>
    </div>
    <div class="sub-item">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
  /* sub-menu start */
  .sub-menu {
    height: 35px;
    position: relative;
  }

  .sub-menu:hover > .title {
    background-color: khaki;
  }

  .sub-menu:hover > .sub-item {
    display: block;
  }

  .sub-menu .title {
    height: 35px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    text-indent: 2em;
    background-color: skyblue;
    color: #fff;
  }

  .sub-menu .title span {
    margin-right: 10px;
  }

  .sub-menu .sub-item {
    width: 100%;
    position: absolute;
    left: 100%;
    top: 0;
    display: none;
  }
</style>
```

- `ReSubMenu.vue`

```html
<script setup>
  import SubMenu from "./SubMenu.vue";
  import ReSubMenu from "./ReSubMenu.vue";
  import MenuItem from "./MenuItem.vue";
  defineProps(["data"]);
</script>

<template>
  <SubMenu>
    <template #title> {{ data.title }}</template>
    <template #default>
      <template v-for="child in data.children" :key="child.id">
        <menuitem v-if="!child.children" :href="child.href">
          {{ child.title }}
        </menuitem>
        <!-- 递归 -->
        <ReSubMenu v-else :data="child"></ReSubMenu>
      </template>
    </template>
  </SubMenu>
</template>
```
