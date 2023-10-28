---
title: Vue 插槽 Slots，自定义弹窗、高级列表组件，依赖注入
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
publish: true
---

# Vue 插槽 Slots，自定义弹窗、高级列表组件，依赖注入

从本节内容开始，我们学习 Vue 组件相关的核心内容，具体如下

- 插槽（slots)
- 祖先组件向孙组件传值 - 依赖与注入
- 实战应用：自定义 Dialog 弹窗组件
- 实战应用：高级列表组件
- 祖先组件向孙组件传值 - 依赖与注入

## 一、插槽 Slots

插槽主要用来实现父组件向子组件传递**模板内容**，且使用起来非常方便。

> 我们会从以下几个点来展开插槽的学习

- 为什么需要插槽
- 默认插槽
- 具名插槽
- 实战应用：自定义`Dialog`弹窗组件
- 作用域插槽

### 1、为什么需要插槽

在实际的开发中，父组件经常需要向子组件传递模板内容。

> 如下图所示的案例

![image-20230513161942213](https://www.arryblog.com/assets/img/image-20230513161942213.0e6da611.png)

在父组件`App`中调用了同一个子组件`<List>`2 次，子组件的外观样式一样，但展示的主体内容模板和样式都不一样，这时候主体中需要展示的模板内容就需要通过父组件来传递。

也就是说子组件在定义时，并不知道使用该组件的父组件需要在子组件中显示什么模板内容，所以把需要显示的模板内容权限交给了使用他的父组件，父组件想要显示什么内容，直接传递给子组件就好。

> 父组件向子组件传递模板内容有以下两种方式：

| 方式                      | 优缺点                                               |
| :------------------------ | :--------------------------------------------------- |
| 通过 props 来传递模板内容 | 如果模板内容较复杂，使用起来会非常麻烦               |
| 通过插槽来传递模板内容    | 不管模板内容简单还是复杂，使用起来都非常简单和方便。 |

### 2、通过 props 来传递模板内容

- 父组件中调用子组件，通过 Prop 传递模板内容

```html
<!--通过prop传递模板内容-->
<List :content="<h3>新闻动态</h3> <div>新闻内容</div >" />
```

- 子组件中使用传递的 prop 数据

```html
<div class="list" v-html="content"></div>
```

- 渲染后代码如下

```html
<div class="list">
  <h3>新闻动态</h3>
  <div>新闻内容</div>
</div>
```

如果传递的模板内容比较简单还好，如果传递的模板数据较复杂，使用 props 来传递就会非常麻烦。

> 我们利用`props`来传递模板内容，实现如下效果

![image-20230513161942213](https://www.arryblog.com/assets/img/image-20230513161942213-168810915639229.0e6da611.png)

- `App.vue`组件

```html
<script>
  import List from "./components/List.vue";
  export default {
    data() {
      return {
        courseTitle: "推荐课程",
        courseImg: `<img src="https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg" />`,
        newsTitle: "最新动态",
        newsList: ["动态1", "最新动态2", "最新动态3"],
      };
    },
    computed: {
      // 计算属性
      // 把数据拼接成最终要显示的HTML字符串
      myList() {
        let html = "<ul>";
        for (let i = 0; i < this.newsList.length; i++) {
          html += `<li>${this.newsList[i]}</li>`;
        }
        html += "</ul>";
        return html;
      },
    },
    components: {
      List,
    },
  };
</script>

<template>
  <div class="container">
    <List :title="courseTitle" :info="courseImg" />
    <List :title="newsTitle" :info="myList" />
  </div>
</template>

<style>
  .container {
    border: 2px solid skyblue;
    padding: 20px;
    margin: 20px auto;
    width: 440px;
    display: flex;
    justify-content: space-between;
  }

  ul {
    padding: 0px 10px;
  }

  ul li {
    line-height: 35px;
    border-bottom: 1px dotted #ddd;
  }
</style>
```

- `List.vue`组件内容

```html
<script>
  export default {
    // props接收
    props: ["title", "info"],
  };
</script>

<template>
  <div class="list">
    <h3>{{ title }}</h3>
    <!-- 因为接受的字符串最终要渲染成html，所以要用v-html指令-->
    <div v-html="info"></div>
  </div>
</template>

<style>
  html,
  body,
  ul,
  li,
  h3 {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list {
    width: 200px;
    border: 1px solid skyblue;
  }

  .list h3 {
    text-align: center;
    background-color: skyblue;
  }

  .list img {
    width: 80%;
    display: block;
    margin: 20px auto;
  }
</style>
```

注：

通过上面代码，我们分析得出，如果使用`Prop`来传递模板内容，所有`html`标签等内容都要写到字符串中，又回到操作 DOM 和子符串拼接的时代，这肯定不是 Vue 框架设计的初衷。

> 所以 Vue 为传递模板内容提供了更加简单的方式，即使用插槽来传递模板内容。

### 3、插槽的分类

Vue 为我们提供了以下三种插槽

- 默认插槽
- 具名插槽
- 作用域插槽

### 4、默认插槽

> 默认插槽的使用分为以下两步：

- **①、定义插槽内容（slot content）：** 在父组件中，把需要传入给默认插槽的模板内容，直接写在子组件标签中间，如下：

```html
<!--App 父组件-->
<List>
  <!-- 插槽内容，以下内容会替换子组件中的<solt></slot>元素 -->
  <h3>新闻动态</h3>
  <div>新闻内容</div>
</List>
```

- **②、定义插槽出口（slot outlet）：** 在子组件中，我们想把传入的模板内容插入到模板的哪个位置，我们就可以在对应位置插入`<slot></slot>`

```html
<!--List子组件-->
<!--在子组件使用插槽传递的模板内容-->
<div class="list">
  <!-- slot为插槽出口，上面插槽内容最终会替换这里的slot标签 -->
  <slot></slot>
</div>
```

注：

`<slot>` 元素是一个**插槽出口（slot outlet）**，标示了父元素提供的**插槽内容（slot content）** 将在哪里被渲染。

> 以上代码最终渲染后效果如下：

```html
<!--渲染后模板代码如下-->
<div class="list">
  <h3>新闻动态</h3>
  <div>新闻内容</div>
</div>
```

### 4.1、插槽的渲染作用域

- **渲染作用域** ：插槽内容可以访问到父组件的数据作用域，而**无法访问子组件的数据**，因为插槽内容本身是在父组件模板中定义的
- **插槽内容**：可以是任意合法的模板内容，例如：模板内容可以是**多个 HTML 元素，也可以是组件**

**代码演示**

`App.vue` 根组件

```html
<script>
  import Person from "./components/Person.vue";
  import Button from "./components/Button.vue";
  export default {
    data() {
      return {
        userName: "艾编程",
        age: 33,
        sex: "男",
      };
    },
    components: {
      Person,
      Button,
    },
  };
</script>

<template>
  <Person>
    <h3>用户：{{ userName }}</h3>
    <div class="info">年龄：{{ age }} -- 性别： {{ sex }}</div>
    <!--插槽内容中可以使用组件-->
    <button>
      <button>提交</button>
    </button>
  </Person>
</template>
```

> 以上代码**插槽内容**中访问的`userName`、`age`、`sex` 均为当前父组件中的数据

`Person.vue` 子组件

```html
<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
```

`Button.vue`子组件

```html
<template>
  <slot></slot>
</template>
```

> 以上案例最终渲染后代码如下：

```html
<div class="container">
  <h3>用户：艾编程</h3>
  <div class="info">年龄：33 -- 性别： 男</div>
  <button>提交</button>
</div>
```

### 4.2、插槽默认内容

我们可以为插槽指定默认内容，当父组件中没有提供任何插槽内容时，显示插槽的默认内容。如果指定了，就显示指定的内容。

- 在`Person`组件中定义插槽出口，并为插槽指定默认内容

```html
<!--Person组件-->
<div class="container">
  <slot>
    <!--以下内容为默认内容，如果父组件中没有指定插槽内容，则显示以下内容-->
    <button>登录</button>
    <button>注册</button>
  </slot>
</div>
```

- 当我们在父组件中使用 `<Person>`组件 且没有提供任何插槽内容时

```html
<Person></Person>
```

> 最终渲染出来的效果如下：

```html
<div class="container">
  <button>登录</button>
  <button>注册</button>
</div>
```

### 4.3 、插槽内容的 CSS 样式

在子组件中不会渲染**插槽出口**的内容，其内容由父组件的**插槽内容**渲染后提供。

这一点决定了**插槽内容**的 CSS 样式应该写在父组件中，而不能写在子组件中。

**代码示例**

- `App.vue`文件内容

```html
<script>
  import List from "./components/List.vue";
  export default {
    components: {
      List,
    },
  };
</script>
<template>
  <List>
    <div class="title">插槽内容</div>
  </List>
</template>
```

- `List.vue` 文件内容

```html
<template>
  <div class="list">
    <slot></slot>
  </div>
</template>
<style scoped>
  .list {
    width: 300px;
    height: 200px;
    border: 1px solid skyblue;
  }

  .list .title {
    background-color: skyblue;
  }
</style>
```

> 最终渲染后的效果如下图，CSS 样式并没有生效

![image-20230630155514945](data:image/png;base64,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)

> 我们查看下最终渲染后的 HTML 与 CSS 代码，如下：

```html
<div data-v-b7ac1dbf="" class="list">
  <div class="title">插槽内容</div>
</div>

<style>
  .list[data-v-b7ac1dbf] {
    width: 300px;
    height: 200px;
    border: 1px solid skyblue;
  }
  .list .title[data-v-b7ac1dbf] {
    background-color: skyblue;
  }
</style>
```

注：

因为插槽内容是由父组件渲染后提供给子组件的，所以插槽内容的标签上并不会添加子组件的`data-v-xx`属性。

所以子组件`scoped`中的样式并不会应用到插槽内容上。

> 如果我们把控制插槽内容的 CSS 样式写在父组件中，如下：

```html
<script>
  import List from "./components/List.vue";
  export default {
    components: {
      List,
    },
  };
</script>
<template>
  <List>
    <div class="title">插槽内容</div>
  </List>
</template>
<style scoped>
  .title {
    background-color: skyblue;
  }
</style>
```

> 最终渲染效果如下，CSS 样式生效了：

![image-20230630160016921](data:image/png;base64,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)

> 我们查看下最终渲染后的 HTML 与 CSS 代码，如下：

```html
<div data-v-b7ac1dbf="" data-v-7a7a37b1="" class="list">
  <div data-v-7a7a37b1="" class="title">插槽内容</div>
</div>
<style>
  .list[data-v-b7ac1dbf] {
    width: 300px;
    height: 200px;
    border: 1px solid skyblue;
  }

  .title[data-v-7a7a37b1] {
    background-color: skyblue;
  }
</style>
```

注：

以上代码也证明了，插槽内容是在父组件中渲染后再放入子组件，即插槽内容中的 html 元素会加上父组件的`data-v-xx`属性。

**总结**

插槽内容对应的 CSS 样式和数据都要写在父组件中，不能写在子组件，因为插槽内容是在父组件中渲染后提供给子组件的。

### 4.4、插槽选择器

如果我们想在子组件中通过 css 选择器选择插槽内容，可以借助`:slotted` 伪类。

```css
:slotted(.list .title) {
  background-color: skyblue;
}
```

> 修改前面的案例

将`App.vue`中的 css 样式去掉，然后将 css 样式写入`<List>`组件中，并添加`:slotted`伪类，具体如下

```html
<template>
  <div class="list">
    <slot></slot>
  </div>
</template>
<style scoped>
  .list {
    width: 300px;
    height: 200px;
    border: 1px solid skyblue;
  }

  :slotted(.list .title) {
    background-color: skyblue;
  }
</style>
```

> 最终渲染后效果如下：

![image-20230630160016921](data:image/png;base64,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)

> 我们查看下最终渲染后的 HTML 与 CSS 代码，如下：

```html
<div data-v-b7ac1dbf="" class="list">
  <!--加上了唯一data-v-xx-s属性-->
  <div data-v-b7ac1dbf-s="" class="title">插槽内容</div>
</div>
<style>
  .list[data-v-b7ac1dbf] {
    width: 300px;
    height: 200px;
    border: 1px solid skyblue;
  }
  /* 通过唯一属性来选择 */
  .list .title[data-v-b7ac1dbf-s] {
    background-color: skyblue;
  }
</style>
```

注：

观察以上代码发现，`.title`元素添加上了唯一`data-v-b7ac1dbf-s`属性，同时 css 选择器也添加上了属性选择，即：`.list .title[data-v-b7ac1dbf-s]`

### 4.5、案例演示

接下来，我们用插槽来实现下图所示的案例

![image-20230513161942213](https://www.arryblog.com/assets/img/image-20230513161942213.0e6da611.png)

- `App.vue`根组件

```html
<script>
  import List from "./components/List.vue";
  export default {
    data() {
      return {
        imgUrl:
          "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg",
        courseTitle: "推荐课程",
        newsTitle: "最新动态",
        newsList: ["动态1", "最新动态2", "最新动态3"],
      };
    },
    components: {
      List,
    },
  };
</script>

<template>
  <div class="container">
    <List :title="courseTitle">
      <!--插槽内容-->
      <img id="img" :src="imgUrl" />
    </List>
    <List :title="newsTitle">
      <!--插槽内容-->
      <ul>
        <li v-for="item in newsList">{{ item }}</li>
      </ul>
    </List>
  </div>
</template>
<style>
  html,
  body,
  ul,
  li,
  h3 {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
<style scoped>
  .container {
    border: 2px solid skyblue;
    padding: 20px;
    margin: 20px auto;
    width: 440px;
    display: flex;
    justify-content: space-between;
  }

  ul {
    padding: 0px 10px;
  }

  ul li {
    line-height: 35px;
    border-bottom: 1px dotted #ddd;
  }

  #img {
    width: 80%;
    display: block;
    margin: 20px auto;
  }
</style>
```

- `List.vue` 子组件

```html
<script>
  export default {
    // props接收
    props: ["title"],
  };
</script>

<template>
  <div class="list">
    <h3>{{ title }}</h3>
    <!--插槽出口-->
    <slot></slot>
  </div>
</template>

<style scoped>
  .list {
    width: 200px;
    border: 1px solid skyblue;
  }

  .list h3 {
    text-align: center;
    background-color: skyblue;
  }
</style>
```

### 5、具名插槽

有时候我们需要在一个组件中包含多个插槽出口，同时为每个插槽出口指定对应的插槽内容，如下图所示的弹窗效果。

![image-20230513205906663](data:image/png;base64,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)

![image-20230513210131239](https://www.arryblog.com/assets/img/16884714343548.aff92516.png)

注：

上图两个效果采用的是同一个组件实现的。

- 标题部分利用的是`Prop`传值来实现的
- 中间内容和底部按扭分别为两个插槽，每个插槽中显示的内容不一样。只是第二个图中，底部的插槽中没有传入任何内容，所以啥也没显示。

> 课程最后，我们会带大家来开发这个弹窗效果

### 5.1、具名插槽与默认插槽区别

相对于前面讲到的默认插槽而言，具名插槽的`<slot>`元素上有一个特殊的`name`属性，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容。

```html
<!-- 具名插槽 -->
<slot name="header"> </slot>
<!--默认插槽-->
<slot> </slot>
```

实际上默认插槽`<slot>`元素也有`name`属性，`name`属性为`default`，通常情况下该`name`属性可以省略不写

```html
<!--默认插槽-->
<slot></slot>

<!--默认插槽，和上面写法表示的是一个意思-->
<slot name="default"></slot>
```

### 5.2、具名插槽的使用

> 使用具名插槽，需要分以下两步：

- **①、指定插槽出口**：在子组件模板中，在需要显示插槽内容的位置添加`<slot>`标签指定插槽出口，同时为具名插槽添加`name`属性，如下

```html
<!-- Layout组件 -->
<div class="container">
  <header>
    <!-- 具名插槽 -->
    <slot name="header"> </slot>
  </header>
  <main>
    <!--默认插槽 -->
    <slot></slot>
  </main>
  <footer>
    <!-- 具名插槽-->
    <slot name="footer"> </slot>
  </footer>
</div>
```

- **②、指定插槽内容**：要为具名插槽传入对应的内容，我们需要使用一个含`v-slot`指令的`<template>`元素，并将目标插槽的名字传给该指令。

```html
<Layout>
  <template v-slot:default>
    <!--默认插槽内容放这里-->
  </template>
  <template v-slot:header>
    <!--header插槽内容放这里-->
  </template>
  <template v-slot:footer>
    <!--footer插槽内容放这里-->
  </template>
</Layout>
```

> 以下为对应的插槽出口指定插槽内容

```html
<Layout>
  <!--默认插槽内容-->
  <template v-slot:default>
    <div class="main">我是主体内容</div>
  </template>
  <template v-slot:header>
    <!--header插槽内容-->
    <div class="header">我是头部内容</div>
  </template>
  <template v-slot:footer>
    <!--footer插槽内容-->
    <div class="footer">我是底部内容</div>
  </template>
</Layout>
```

> 最终所有插槽内容都被传递到了相应的插槽出口，渲染后的效果如下：

```html
<div class="container">
  <header>
    <div class="header">我是头部内容</div>
  </header>
  <main>
    <div class="main">我是主体内容</div>
  </main>
  <footer>
    <div class="footer">我是底部内容</div>
  </footer>
</div>
```

### 5.3、注意事项

- 当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容，所以上面内容也可以写成

```html
<Layout>
  <!--Layout标签中，所有没有写在template模板中的内容，都为默认插槽内容-->
  <div class="main">我是主体内容</div>
  <template v-slot:header>
    <!--header插槽内容-->
    <div class="header">我是头部内容</div>
  </template>
  <template v-slot:footer>
    <!--footer插槽内容-->
    <div class="footer">我是底部内容</div>
  </template>
</Layout>
```

- `v-slot`指令可以简写成`#`，因此`<template v-slot:header>`可以简写成`<template #header>` ，所以上面内容也可以简写成

```html
<Layout>
  <!--Layout标签中，所有没有写在template模板中的内容，都为默认插槽内容-->
  <div class="main">我是主体内容</div>
  <template #header>
    <!--header插槽内容-->
    <div class="header">我是头部内容</div>
  </template>
  <template #footer>
    <!--footer插槽内容-->
    <div class="footer">我是底部内容</div>
  </template>
</Layout>
```

- 可以为插槽指定动态的插槽名

```html
<template v-slot:[header]> .... </template>
<!--上面简写形式-->
<template #[header]> ..... </template>
```

> 以上代码可以改写成如下：

```html
<script>
  import exp from "constants";
  import Layout from "./components/Layout.vue";
  export default {
    data() {
      return {
        header: "header",
        footer: "footer",
      };
    },
    components: {
      Layout,
    },
  };
</script>
<template>
  <Layout>
    <!--只要没有写在对应template模板中的内容，都会放到默认插槽中-->

    <template v-slot:default>
      <div class="main">我是主体内容</div>
    </template>
    <template v-slot:[header]>
      <!--header插槽内容放这里-->
      <div class="header">我是头部内容</div>
    </template>
    <template #[footer]>
      <!--footer插槽内容放这里-->
      <div class="footer">我是底部内容</div>
    </template>
  </Layout>
</template>
```

## 二、实战应用：自定义 Dialog 弹窗组件

- 点击显示弹窗按扭，会弹出对应的弹窗
- 点击弹窗中的取消与确认按扭，都会关闭弹窗。
- 点击右上角的关闭按扭会弹出一个提示框，询问是确定关闭弹窗吗？点击确定就会关才，点击取消，就不关闭。

![GIF2023-5-1322-27-58](https://www.arryblog.com/assets/img/GIF2023-5-1322-27-58.ea7b94d0.gif)

![GIF2023-7-419-31-41](https://www.arryblog.com/assets/img/GIF2023-7-419-31-41.4137741f.gif)

### 1、实现步骤

**第一步：** 首先定义一个子组件`Dialog`，实现如下布局效果

![image-20230630170324029](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2sAAADACAIAAAAV5Gx3AAAbbklEQVR4nO3de1TT5x3H8SdUi6AICl5OkQpMF1yPRya9WbCdl0oOamvReRngZp1CK2ebtuicBpWUbtZ66aQttGKnJvOyia4TS7rKZk2qrdWBq46sLccbZ3UkqKiJrdHsj+f0tzRc5LFdUXm//vrlye/3y/PL8cjnfJ9LdEuWLBEAAABAmwW1dwcAAABwiyFBAgAAQA0JEgAAAGpIkAAAAFBDggQAAIAaEiQAAADUkCABAACghgQJAAAANSRIAAAAqCFBAgAAQA0JEgAAAGpIkAAAAFBDggQAAIAaEiQAAADUkCABAACghgQJAAAANSRIAAAAqCFBAgAAQA0JEgAAAGpIkAAAAFBDggQAAIAaEiQAAADUkCABAACghgQJAAAANSRIAAAAqCFBAgAAQA0JEgAAAGpIkAAAAFBDggQAAIAaEiQAAADUkCABAACghgQJAAAANSRIAAAAqCFBAgAAQA0JEgAAAGpIkAAAAFBDggQAAIAaEiQAAADUkCABAACghgQJAAAANSRIAAAAqOnU3h3Atyo2Nra9uwAAuOmEh4ffwFXV1dXfeE9wqyBBdiw/+clP2rsLAICbTm1t7Q1cRYLsyBjFBgAAgBoSJAAAANSQIAEAwP+cO3duxowZixcvvnz5stZYVFQ0Y8aMc+fOtWPHcFMhQQIAgP+JiIjIzc3dvHnz0aNHZcuhQ4cqKiqMRmNERET79g03DxIkAAD4iqSkpLlz5xYVFZ07d+7cuXNFRUUGgyE+Pr69+4WbCGuxAQBAoLS0tIqKir1798qXmZmZ7dsf3GxIkAAAIFB8fPysWbPmzZsnhFi1ahXj1whAggQAAM145JFHHn744ejo6NTU1PbuC246zIMEAADNMJvNPp+vqqrKarW2d19w06EGCQAAAtXW1lZUVCxbtuz06dOvv/764MGDWUkDf9QgAQDAV1y+fHn9+vUGgyEpKemRRx7p1avX7t2727tTuLmQIAEAwFdYrdaqqqq0tDTx5faQq1evPnToUHv3CzcREiQAAPifQ4cOzZs3b9asWdqw9T333DNt2jS5PWT79g03D+ZB4pt04cKFO++8Mzg4WGvxer2XL1/u1q1bWy5vbGw8f/58TEzM1+nDxYsXr1y5EhYW1qnT9f95+3y+M2fOREVFteVkAOgIkpKSPv30U/+WLl26PPfcc+3VH9ycqEHiG3P8+PHx48evWbPG6/VqjZWVlQ8++GB5efl1L6+rq5s4ceJTTz312WeftfETT506denSpYDG1atXjxgxIuC/v5aUlZUNHTr0vffea+MnAgAAQYKEEpfLZTAYdF9lt9vluzExMWPHji0sLPzjH/8oW+rr64uLi2NjY5OSkrSbeDweV3O6dOny+OOPl5eXm83mZk84e/asfzb997///eSTT6ampn744Yc+n+/GnmjkyJEpKSmlpaWNjY3+7Q6HIzExUdeExWK5sQ8CAOB2wsgdFHTr1m3p0qW//OUv5cu6urply5Zp795xxx0//elPDx48aLfbx48fHxoaunPnzsOHD2/YsKFv377aaWVlZa3/OlZeXl5eXl7T9iFDhmzdulWv18uXffv2Xb58+cKFC0eOHPn000/Pnz+/Z8+e132Eq1ev/uMf//CfyjNw4MALFy7s379fG3zv06dPUFCQECI3N7dfv36y8fTp00VFRde9PwDcirp06dLeXcAthgQJBcHBwQ8++KD20uFwhIaGyuO1a9fu2rVLCHH+/Hmn05menn7lypXq6uqwsLDnnnvu+eefj4iI+PWvfy3nZQ8ePLi0tNR/azGv1xsUFCRzW7PKyspefvll/xadTjd06NCysrJVq1atWLGisrLyN7/5zYgRI1p/hC+++KK4uLikpCSgfe3atdpxQUHB5MmThRBTp05NTk4WQvh8vtWrVw8aNCgxMbH1+wPAreiuu+5q7y7gFsMoNr4Z586dczgc165dCw8P79y5c319fXV19ZAhQ/R6fVBQUGNjo8PhuHLlijw5KCioe/fukZGRPXv2vHLlyu9///vx48f/61//ivySzWabOHHi9u3br1y50rNnz8jISC2qBujatevixYt37NjxxRdf7Nmz5+rVq633MyQkpLi4+Nq1azU1NS6Xy+fn8OHDBw8evHr1qtFoDLjqs88+e+utt9LS0gYMGPD1vysAAG511CDxjTEYDKtXrw4JCRFCWCyWTZs2WSyWyMhIIYTdbp8zZ448LT09PS0tzev1btmyxWKx7Nq1q3///jNnzoyJiampqfn0008feeSRIUOGpKWlFRUVZWdnjxs3LiMjY/To0WlpaWFhYUKIzz///NVXX3344Ye///3vy+mJo0aN+stf/nLnnXe2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)

```html
<template>
  <!--黑色半透明遮罩层-->
  <div class="dialog-mask"></div>
  <!--弹出层-->
  <div class="dialog">
    <!--弹窗头部标题-->
    <div class="dialog-header">
      <div class="title">弹窗头部</div>
      <div class="close">X</div>
    </div>
    <!--弹窗主体内容-->
    <div class="dialog-main">弹窗主体内容</div>
    <!--弹窗底部-->
    <div class="dialog-footer">弹窗底部</div>
  </div>
</template>
<style scoped>
  .dialog-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .dialog {
    width: 600px;
    min-height: 100px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .dialog .dialog-header {
    position: relative;
    height: 45px;
    overflow: hidden;
  }

  .dialog .dialog-header .title {
    line-height: 55px;
    font-size: 24px;
    text-indent: 1em;
  }

  .dialog .dialog-header .close {
    width: 20px;
    height: 20px;
    background-color: #ddd;
    position: absolute;
    right: 0px;
    top: 0px;
    text-align: center;
    line-height: 20px;
    z-index: 1;
    cursor: pointer;
  }

  .dialog .dialog-main {
    margin: 20px;
  }
</style>
```

**第二步：** 在子组件`Dialog`中添加一个默认插槽出口与具名插槽出口

```html
<template>
  <!--黑色半透明遮罩层-->
  <div class="dialog-mask"></div>
  <!--弹出层-->
  <div class="dialog">
    <!--弹窗头部标题-->
    <div class="dialog-header">
      <div class="title">弹窗头部</div>
      <div class="close">X</div>
    </div>
    <!--弹窗主体内容-->
    <div class="dialog-main">
      <slot>弹窗主体内容</slot>
    </div>
    <!--弹窗底部-->
    <div class="dialog-footer">
      <slot name="footer">弹窗底部</slot>
    </div>
  </div>
</template>
```

**第三步：** 在父组件中使用`Dialog`子组件，最终实现如下效果

![image-20230704193038581](https://www.arryblog.com/assets/img/image-20230704193038581.ba674530.png)

- 在组件上添加`title`属性，将内容的标题传入子组件

```html
<dialog :title="title"></dialog>
```

- 在子组件中接受传过来的`title`属性，并在模板中使用

```html
<script>
  export default {
    props: ["title"],
  };
</script>
<template>
  ...........
  <!--弹出层-->
  <div class="dialog">
    <!--弹窗头部标题-->
    <div class="dialog-header">
      <div class="title">{{ title }}</div>
      <div class="close">X</div>
    </div>
    .........
  </div>
</template>
```

- 为默认插槽和具名插槽传入内容，同时添加为插槽内容设置 CSS 样式

```html
<script>
  import Dialog from "./components/Dialog.vue";
  export default {
    data() {
      return {
        title: "收货地址",
        isVisible: false, // 弹窗显示
        // 弹窗主体显示数据
        gridData: [
          {
            date: "2027-07-02",
            name: "王小花",
            address: "xxx普陀区金沙江路 12345 ",
          },
          {
            date: "2027-07-04",
            name: "刘晓冉",
            address: "xxx普陀区金沙江路 12345",
          },
          {
            date: "2027-07-01",
            name: "小清心",
            address: "xxx普陀区金沙江路 12345",
          },
          {
            date: "2027-07-03",
            name: "王小虎",
            address: "xxx普陀区金沙江路 12345",
          },
        ],
      };
    },
    components: {
      Dialog,
    },
  };
</script>

<template>
  <dialog :title="title">
    <template v-slot:default>
      <!--默认插槽内容-->
      <table>
        <tr>
          <th>日期</th>
          <th>姓名</th>
          <th>收货地址</th>
        </tr>
        <tr v-for="{ date, name, address } in gridData">
          <td>{{ date }}</td>
          <td>{{ name }}</td>
          <td>{{ address }}</td>
        </tr>
      </table>
    </template>
    <!--具名插槽内容-->
    <template v-slot:footer>
      <div class="button">
        <button class="cancle">取消</button>
        <button class="confirm">确认</button>
      </div>
    </template>
  </dialog>
</template>

<style>
  .button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .button button {
    width: 80px;
    height: 30px;
    margin-right: 20px;
    border: none;
  }

  .button .confirm {
    background-color: rgb(96, 183, 217);
    color: #fff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tr td,
  table tr th {
    height: 35px;
    text-align: center;
    border: 1px solid #ddd;
  }
</style>
```

**第四步：\*\*点击\*\*显示弹窗**按扭，显示弹窗，然后弹窗右上角的关闭按扭，会弹出确认提示框询问是否关闭弹窗，如果是，则关闭，否则不关闭。

- 在父组件中定义变量`isVisible`来控制弹窗的显示与关闭，一开始弹窗是关闭的，则默认值为 fasle。
- 在组件上添加`visible`属性，将`isVisible`的值作为`visible`属性的值传递给到子组件，子组件拿到该值来控制弹窗的显示与隐藏
- 在父组件中添加一个**显示弹窗**按扭，点击后将`isVisible=true`，则显示弹窗
- 同时监听`before-close`事件，在子组件中触发`before-close`事件时会调用`handleClose`方法关闭弹窗。

```html
<!--App 父组件--->
<script>
  import Dialog from "./components/Dialog.vue";
  export default {
    data() {
      return {
        // ......
        isVisible: false, // 弹窗显示
        // ......
      };
    },
    components: {
      Dialog,
    },
    methods: {
      // 点击弹窗右上角关闭按扭，会触发这个方法，弹出一个新弹窗询问是否确定关闭弹窗
      handleClose(done) {
        const bool = confirm("确认关闭吗？");
        if (bool) {
          this.isVisible = false;
        }
      },
    },
  };
</script>

<template>
  <button @click="isVisible = true">显示弹窗</button>
  <dialog :title="title" :visible="isVisible" @before-close="handleClose">
    <!-- ......-->
  </dialog>
</template>
<!--Dialog 子组件-->
<script>
  export default {
    props: ["title", "visible"],
  };
</script>
<template>
  <!--黑色半透明遮罩层-->
  <div class="dialog-mask" v-if="visible"></div>
  <!--弹出层-->
  <div class="dialog" v-if="visible">
    <!--弹窗头部标题-->
    <div class="dialog-header">
      <div class="title">{{ title }}</div>
      <div class="close" @click="$emit('beforeClose')">X</div>
    </div>
    <!--.......-->
  </div>
</template>
```

**第五步：\*\*点击弹窗中的\*\*确认**与**取消**按扭，则关闭弹窗

```html
<template v-slot:footer>
  <div class="button">
    <button @click="isVisible = false" class="cancle">取消</button>
    <button @click="isVisible = false" class="confirm">确认</button>
  </div>
</template>
```

### 2、完整版代码

- `App.vue` 根组件

```html
<script>
  import Dialog from "./components/Dialog.vue";
  export default {
    data() {
      return {
        title: "收货地址",
        isVisible: false, // 弹窗显示
        // 弹窗主体显示数据
        gridData: [
          {
            date: "2027-07-02",
            name: "王小花",
            address: "xxx普陀区金沙江路 12345 ",
          },
          {
            date: "2027-07-04",
            name: "刘晓冉",
            address: "xxx普陀区金沙江路 12345",
          },
          {
            date: "2027-07-01",
            name: "小清心",
            address: "xxx普陀区金沙江路 12345",
          },
          {
            date: "2027-07-03",
            name: "王小虎",
            address: "xxx普陀区金沙江路 12345",
          },
        ],
      };
    },
    components: {
      Dialog,
    },
    methods: {
      // 点击弹窗右上角关闭按扭，会触发这个方法，弹出一个新弹窗询问是否确定关闭弹窗
      handleClose(done) {
        const bool = confirm("确认关闭吗？");
        if (bool) {
          this.isVisible = false;
        }
      },
    },
  };
</script>

<template>
  <button @click="isVisible = true">显示弹窗</button>
  <dialog :title="title" :visible="isVisible" @before-close="handleClose">
    <template v-slot:default>
      <!--默认插槽内容-->
      <table>
        <tr>
          <th>日期</th>
          <th>姓名</th>
          <th>收货地址</th>
        </tr>
        <tr v-for="{ date, name, address } in gridData">
          <td>{{ date }}</td>
          <td>{{ name }}</td>
          <td>{{ address }}</td>
        </tr>
      </table>
    </template>
    <!--具名插槽内容-->
    <template v-slot:footer>
      <div class="button">
        <button @click="isVisible = false" class="cancle">取消</button>
        <button @click="isVisible = false" class="confirm">确认</button>
      </div>
    </template>
  </dialog>
</template>

<style>
  .button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .button button {
    width: 80px;
    height: 30px;
    margin-right: 20px;
    border: none;
  }

  .button .confirm {
    background-color: rgb(96, 183, 217);
    color: #fff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tr td,
  table tr th {
    height: 35px;
    text-align: center;
    border: 1px solid #ddd;
  }
</style>
```

- `Dialog.vue` 弹窗组件

```html
<script>
  export default {
    props: ["title", "visible"],
  };
</script>
<template>
  <!--黑色半透明遮罩层-->
  <div class="dialog-mask" v-if="visible"></div>
  <!--弹出层-->
  <div class="dialog" v-if="visible">
    <!--弹窗头部标题-->
    <div class="dialog-header">
      <div class="title">{{ title }}</div>
      <div class="close" @click="$emit('beforeClose')">X</div>
    </div>
    <!--弹窗主体内容-->
    <div class="dialog-main">
      <slot>弹窗主体内容</slot>
    </div>
    <!--弹窗底部-->
    <div class="dialog-footer">
      <slot name="footer">弹窗底部</slot>
    </div>
  </div>
</template>
<style scoped>
  .dialog-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .dialog {
    width: 600px;
    min-height: 100px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .dialog .dialog-header {
    position: relative;
    height: 45px;
    overflow: hidden;
  }

  .dialog .dialog-header .title {
    line-height: 55px;
    font-size: 24px;
    text-indent: 1em;
  }

  .dialog .dialog-header .close {
    width: 20px;
    height: 20px;
    background-color: #ddd;
    position: absolute;
    right: 0px;
    top: 0px;
    text-align: center;
    line-height: 20px;
    z-index: 1;
    cursor: pointer;
  }

  .dialog .dialog-main {
    margin: 20px;
  }
</style>
```

### 3、作用域插槽

在上面**插槽的渲染**中我们提到，插槽的内容可以访问父组件数据作用域（即父组件状态），但无法访问到子组件的状态

然而在某些场景下，插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

> Vue 框架也为我们考虑到了这一点，我们可以像对组件传递 `props` 那样，向一个插槽的出口上传递属性

```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :msg="message" :count="1"></slot>
</div>
```

> 当需要接受插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别，我们分开来讲解。

### 3.1、默认作用域插槽

在默认插槽中，我们需要通过**子组件标签**（如：`<MyComponent>`）上的`v-slot`指令，直接接受一个插槽 props 对象。

> 这个对象可以直接在插槽内容的表达式中访问。

```html
<!-- slotProps 名字可自定义 -->
<MyComponent v-slot="slotProps">
  {{ slotProps.msg }} {{ slotProps.count }}
</MyComponent>
```

**代码演示**

- `App.vue`

```html
<script>
  import MyComponent from "./components/MyComponent.vue";
  export default {
    components: {
      MyComponent,
    },
  };
</script>
<template>
  <MyComponent v-slot="slotProps">
    {{ slotProps.msg }} ---{{ slotProps.count }}
  </MyComponent>
</template>
```

- `MyComponent.vue`

```html
<script>
  export default {
    data() {
      return {
        message: "Hello Vue!!",
        count: 1,
      };
    },
  };
</script>

<template>
  <slot :msg="message" :count="count"></slot>
</template>
```

> 以上代码最终渲染后效果如下：

![image-20230513230428102](data:image/png;base64,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)

### 3.2、具名作用域插槽

- 我们要在父组件中接受对应具名插槽传过来的 props，可以在插槽内容对应的`<template>`标签上的`v-slot`指令的值中被访问到。
- 如果一个组件中同时使用了默认插槽和具名插槽，则默认插槽内容一定要写在`<template #default>`标签中,然后能过 `#default="defaultProps"`方式来接受值。如果直接在子组件的`v-slot`中来接受，会导致编译错误。这是为了避免因默认插槽的 props 的作用域而困惑

```html
<MyComponent>
  <template #header="headerProps"> {{ headerProps }} </template>

  <!--这里是用来接受默认插槽传过来的props-->
  <template #default="defaultProps"> {{ defaultProps }} </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

> 以下写法是错的

```html
<MyComponent v-slot="defaultProps">
  <template #header="headerProps"> {{ headerProps }} </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

- 以下方式向具名插槽出口中传入 props

```html
<slot name="header" msg="hello" count="1"></slot>
```

注

插槽上的`name`属性是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。

> 因此，最终 `headerProps` 的结果是 `{ msg: 'hello' ,count:1}`

- 每个插槽出口对外传递的 props，只能在当前插槽对应的插槽内容中使用

```html
<MyComponent>
  <template #header="headerProps">
    <div>{{ headerProps.hMsg }}</div>
    <!--此插槽内容中，没有办法访问其它插槽传过来的内容，会在控台报错-->
    <div>{{ defaultProps.mMsg }}</div>
  </template>

  <!-- 这里是用来接受默认插槽传过来的props -->
  <template #default="defaultProps">
    <div>{{ defaultProps.mMsg }}</div>
  </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

**代码演示**

- `App.vue`

```html
<script>
  import MyComponent from "./components/MyComponent.vue";
  export default {
    components: {
      MyComponent,
    },
  };
</script>
<template>
  <MyComponent>
    <template #header="headerProps">
      <div>{{ headerProps.hMsg }}</div>
    </template>

    <!-- 这里是用来接受默认插槽传过来的props -->
    <template #default="defaultProps">
      <div>{{ defaultProps.mMsg }}</div>
    </template>

    <!--采用了对象的解构赋值-->
    <template #footer="{ fMsg }">
      <div>{{ fMsg }}</div>
    </template>
  </MyComponent>
</template>
```

- `MyComponent.vue`

```html
<script></script>
<template>
  <slot name="header" h-msg="header内容"></slot>
  <slot m-msg="main内容"></slot>
  <slot name="footer" f-msg="footer内容"></slot>
</template>
```

> 最终渲染后效果如下：

```html
<div id="app" data-v-app="">
  <div>header内容</div>
  <div>main内容</div>
  <div>footer内容</div>
</div>
```

## 三、实战应用：高级列表组件

> 我们来实现如下图所示的无限滚动加载更多内容的案例

![GIF2023-7-115-20-15](https://www.arryblog.com/assets/img/GIF2023-7-115-20-15.1cf72ecc.gif)

我们的需求

在实际的开发中，我们经常需要远程请求数据，并对请求过来的数据进行列表渲染、实现分页、无限滚动加载这样的功能。但最终渲染出来的内容和样式都不一样。

所以我们期望封装一个`<FancyList>`组件，这个组件封装了远程加载请求数据的逻辑，同时对请求过来的数据进行列表渲染、实现分页、无限滚动加载这样的功能。

为了保证渲染出来的内容和样式都不一样，我们把单个列表元素的内容和样式的控制权留给使用它的父母的组件。

> 我们期望`<FancyList>`组件的用法可能是如下这样

```html
<!--
	api-url：为请求数据的地址
 	page-num:请求加载数据的条目
	#item="{ title }"：中接受的 title为请求加载回来每一条数据中的新闻标题，还可以有更多信息
-->
<FancyList :api-url="url" page-num="10">
  <!--{title} 采用了解构赋值-->
  <template #item="{ title }">
    <h3 class="title">{{ title }}</h3>
    <!---更多内容....-->
  </template>
</FancyList>
```

在 `<FancyList>` 之中，我们可以多次渲染 `<slot>` 并每次都提供不同的数据 (注意我们这里使用了 `v-bind` 来传递插槽的 props)：

```html
<div class="container">
  <ul class="list">
    <!--对请求回来的数据进行列表渲染-->
    <li v-for="item in list">
      <!--插槽出口，接收父组件传递的模板内容-->
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</div>
```

### 1、实现思路

第一步：

- 创建 FancyList 组件，并在父组件中使用`<FancyList>`组件
- 在`<FancyList>`组件中通过 axios 发送请求获取数据
- 请求的地址和请求加载数据的条目都由父组件通过 prop 传递给到`<FancyList>`组件

```html
<!--App.vue-->
<script>
  import FancyList from "./components/FancyList.vue";
  export default {
    data() {
      return {
        // 请求地址
        url: "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/news",
        // 首次请求的数据条目
        pageNum: 8,
      };
    },
    components: {
      FancyList,
    },
  };
</script>
<template>
  <FancyList :api-url="url" :page-num="pageNum"> </FancyList>
</template>
<!--FancyList.vue-->
<script>
  // 这里要记得执行npm i axios 下载axios包
  import axios from "axios";
  export default {
    // 接受父组件传递的props
    props: ["apiUrl", "pageNum"],
    data() {
      return {
        items: [], // 存放请求回来的数据
      };
    },
    created() {
      // 发请求获取数据
      axios.get(this.apiUrl + "/" + this.pageNum).then((res) => {
        this.items = res.data.data;
      });
    },
  };
</script>

<template>
  <ul class="list">
    <li v-for="item in items">
      <!--   {{ item.title }} -->
      <!-- 具体要显示的模板内容由父组件提供 -->
    </li>
  </ul>
</template>
<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
```

第二步：

在子组件中提供插槽出口，并且将请求回来的数据提供给到插槽

```html
<template>
  <ul class="list">
    <li v-for="item in items">
      <!--v-bind=item 将返回的每一项数据的所有信息都以props提供给插槽-->
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>
```

第三步：

在父组件中提供插槽内容，并编写对应的 CSS 样式

```html
<template>
  <FancyList :api-url="url" :page-num="pageNum">
    <template #item="{ title, image }">
      <div class="item">
        <div class="img"><img :src="image" /></div>
        <div class="title">{{ title }}</div>
      </div>
    </template>
  </FancyList>
</template>

<style scoped>
  .item {
    width: 500px;
    display: flex;
    padding: 20px 0px;
    border-bottom: 1px solid #ddd;
  }

  .item .img {
    width: 140px;
    height: 88px;
    margin-right: 20px;
    font-size: 0;
  }
</style>
```

第四步：

- 利用`IntersectionObserver`类实现无限滚动加载更多功能
- 在`<FancyList>`组件模板的最下添中一个`.loading`元素，然后监听该元素是否进入浏览器可视区，如果进入，则说明滚动到了浏览器底部，则加载更多内容，否则不做任何处理。

```html
<script>
  import axios from "axios";
  export default {
    // ......
    mounted() {
      this.createObserver(this.$refs.loading);
    },
    methods: {
      // 根据n来加载对应的数据条目
      loadMore(n) {
        // 模拟远程请求
        setTimeout(() => {
          for (let i = 0; i < n; i++) {
            this.items.push({
              title: `新加载标题` + i,
              image:
                "http://cms-bucket.ws.126.net/2019/03/08/d41c98c5380647d498d7750a252d6d50.png?imageView&thumbnail=140y88&quality=85",
            });
          }
        }, 1000);
      },

      // 创建观察器实例，观察目标元素
      createObserver(el) {
        // 创建观察器实例
        const io = new IntersectionObserver((entries) => {
          // 如果进入可视区，表示加载的元素加载完成，则再加载10条
          if (entries[0].isIntersecting) {
            this.loadMore(10);
          }
        });
        // 添加被观察者
        io.observe(el);
      },
    },
  };
</script>

<template>
  <ul class="list">
    <li v-for="item in items">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
  <div class="loading" ref="loading">加载更多.......</div>
</template>
<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
```

### 2、完整版代码

- `App.vue`文件

```html
<script>
  import FancyList from "./components/FancyList.vue";
  export default {
    data() {
      return {
        // 请求地址
        url: "https://www.fastmock.site/mock/6ec78e345df340241e1f5043f0167833/icode/news",
        // 首次请求的数据条目
        pageNum: 8,
      };
    },
    components: {
      FancyList,
    },
  };
</script>
<template>
  <FancyList :api-url="url" :page-num="pageNum">
    <template #item="{ title, image }">
      <div class="item">
        <div class="img"><img :src="image" /></div>
        <div class="title">{{ title }}</div>
      </div>
    </template>
  </FancyList>
</template>
<style scoped>
  .item {
    width: 500px;
    display: flex;
    padding: 20px 0px;
    border-bottom: 1px solid #ddd;
  }

  .item .img {
    width: 140px;
    height: 88px;
    margin-right: 20px;
    font-size: 0;
  }
</style>
```

- `FancyList.vue`文件内容

```html
<script>
  import axios from "axios";
  export default {
    props: ["apiUrl", "pageNum"],
    data() {
      return {
        items: [],
      };
    },
    created() {
      // 发请求获取数据
      axios.get(this.apiUrl + "/" + this.pageNum).then((res) => {
        this.items = res.data.data;
        console.log(this.items);
      });
    },
    mounted() {
      this.createObserver(this.$refs.loading);
    },
    methods: {
      // 根据n来加载对应的数据条目
      loadMore(n) {
        // 模拟远程请求
        setTimeout(() => {
          for (let i = 0; i < n; i++) {
            this.items.push({
              title: `新加载标题` + i,
              image:
                "http://cms-bucket.ws.126.net/2019/03/08/d41c98c5380647d498d7750a252d6d50.png?imageView&thumbnail=140y88&quality=85",
            });
          }
        }, 1000);
      },

      // 创建观察器实例，观察目标元素
      createObserver(el) {
        // 创建观察器实例
        const io = new IntersectionObserver((entries) => {
          // 如果进入可视区，表示加载的元素加载完成，则再加载10条
          if (entries[0].isIntersecting) {
            this.loadMore(10);
          }
        });
        // 添加被观察者
        io.observe(el);
      },
    },
  };
</script>

<template>
  <ul class="list">
    <li v-for="(item,index) in items" :key="index">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
  <div class="loading" ref="loading">加载更多.......</div>
</template>
<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
```

### 3、获取鼠标坐标

![GIF 2023-7-115-40-15](https://www.arryblog.com/assets/img/GIF-2023-7-115-40-15.662db6ce.gif)

我们期望实现一个组件，这个组件内部主要封装了获取鼠标坐标的功能。当我们在使用这些组件时，我们希望拿在父组件中拿到当前鼠标的坐标，然后显示在页面中。

> 我们期望的可能是下面这样

```html
<MouseTracker v-slot="{ x, y }"> Mouse is at: {{ x }}, {{ y }} </MouseTracker>
```

**`<MouseTracker>`组件代码实现逻辑**

```html
<script>
  export default {
    data() {
      return {
        x: 0, // 保存x坐标
        y: 0, // 保存y坐标
      };
    },
    methods: {
      // 更新x与y标坐
      update(e) {
        this.x = e.pageX;
        this.y = e.pageY;
      },
    },
    mounted() {
      window.addEventListener("mousemove", this.update);
    },
    // 组件卸载，取消事件监听
    unmounted() {
      window.removeEventListener("mousemove", this.update);
    },
  };
</script>
<template>
  <slot :x="x" :y="y"></slot>
</template>
```

### 4、作用域插槽的应用场景

如果某个组件同时封装了逻辑和视图，然而又希望把一部视图的输出交给父组件来实现，这时子组件需要将一部分数据供给给到插槽让父组件来使用。就好比上面讲到高级列表组件。

当然还有一部分组件只封装了逻辑，没有视图，我们在使用这部分组件时，子组件也需把数据供给到插槽供父组件来使用。就好比上面讲到的获取鼠标坐标案例。

### 5、总结

> 本小节我们重点需要掌握以下内容

**插槽的定义**

插槽主要用来实现父组件向子组件传递**模板内容**，且使用起来非常方便。

**插槽的分类**

插槽分为：默认插槽、具名插槽、作用域插槽

**默认插槽**

> 默认插槽的使用分以下两步：

- ①、在子组件中通过定义插槽的出口
- ②、在父组件中使用子组件时，直接写在子组件标签中间的内容就是插槽内容。该内容会替换插槽出口`<slot>`标签

![image-20230701160304665](https://www.arryblog.com/assets/img/image-20230701160304665.f7c323d9.png)

**具名插槽**

- 如果`<slot>`标签上有一个特殊的`name`属性，则该插槽为具名插槽，如：`<slot name="main" ></slot>`，`name`属性用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容。
- 默认插槽本质上也是有`name`属性的，name 属性的值为`default`，即`<slot name="default"></slot>`，不过可以省略不写。

> 在指定具名插槽的使用分两步：

- ①、在子组件中定义插槽出口
- ②、在父组件中使用子组件时，指定插槽内容

![image-20230701162302078](https://www.arryblog.com/assets/img/image-20230701162302078.add4b2ed.png)

插槽注意事项

- 插槽的渲染作用域：插槽内容可以访问到父组件的数据作用域，而**无法访问子组件的数据**，因为插槽内容本身是在父组件模板中定义的
- 插槽默认内容：写在`<slot></slot>`标签中间的内容为插槽的默认内容
- 插槽内容的 CSS 样式：在子组件中不会渲染**插槽出口**的内容，其内容由父组件的**插槽内容**渲染后提供。这一点决定了**插槽内容**的 CSS 样式应该写在父组件中，而不能写在子组件中。
- 插槽选择器：如果我们想在子组件中通过 CSS 选择器选择插槽内容，可以借助`:slotted` 伪类。

```css
:slotted(.box) {
  color: red;
}
```

**作用域插槽**

- 当我们父组件中的插槽内容需要访问子组件中的数据时，就需要子组件在插槽出口上像传递 props 一样将数据传递给到父组件。

```html
<!-- 具名插槽 -->
<slot name="main" :msg="msg" :count="count"></slot>
<!-- 默认插槽 -->
<slot :msg="msg" :count="count"></slot>
```

- 当需要接受插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别

如果只有默认插槽，则可以在子组件标签上来通过`v-slot`指令的值来接受插槽 props

```html
<!-- slotProps 名字可自定义 -->
<MyComponent v-slot="slotProps">
  {{ slotProps.msg }} {{ slotProps.count }}
</MyComponent>
```

如果同时有默认插槽与具名插槽，则都需要在通过`<template>`标签上的`v-slot`指令的值来接受插槽的 props

```html
<MyComponent>
  <template #header="headerProps"> {{ headerProps }} </template>

  <!--这里是用来接受默认插槽传过来的props-->
  <template #default="defaultProps"> {{ defaultProps }} </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

## 四、祖先组件向孙组件传值 - 依赖与注入

本小节我们来学习祖先组件如何向孙组件及更远的后代祖件提供数据，这就需要用到依赖（Provide）与注入（Inject）。

> 本小节涉及内容如下：

- Prop 逐级透传问题
- 依赖与注入定义
- 依赖注入的基本使用
- provide 选项
- 应用层 Provide
- 注入（Inject）
- 使用 Symbol 作为注入名

### 1、Prop 逐级透传问题

通常情况下，当我们需要从父组件向子组件传递数据时，会使用`props`。

但如果出现如下图所示情况，我们需要将组件`<Root>`中的数据传递给到孙组件`<Item>`或后代组件`<ListChild>`时要如何传呢 ？

![image-20230516153434804](https://www.arryblog.com/assets/img/image-20230516153434804.fdaa5e83.png)

> 如果用之前讲到的`props`来实现，传递方式如下图：

- 数据从`<Root>`组件传到`<Item>`组件：需要先将数据传递给到`<Aside>`组件，再通过`<Aside>`组件传递给到`<Item>`组件。
- 数据从`<Root>`组件传到`<ListChild>`组件：需要先将数据传递给到`<Main>`组件，再通过`<Main>`组件传递给到`<List>`组件，最后通过`<List>`组件传递给到`<ListChild>`组件。

![image-20230516150039593](https://www.arryblog.com/assets/img/image-20230516150039593.60d630dd.png)

**代码演示**

- `App.vue` 根组件，相当于 Root

```html
<script>
  import Aside from "./components/Aside.vue";
  export default {
    data() {
      return {
        message: "Hello props", // 将该数据传递给到 <Item>孙组件
      };
    },
    components: {
      Aside,
    },
  };
</script>
<template>
  <!--props方式传递数据-->
  <aside :msg="message" />
</template>
```

- `Aside.vue` 子组件

```html
<script>
  import Item from "./Item.vue";
  export default {
    // props选项声明
    props: ["msg"],
    components: {
      Item,
    },
  };
</script>
<template>
  <div class="aside">
    <!--props方式接着向下传递数据-->
    <Item :msg="msg"></Item>
  </div>
</template>
```

- `Item.vue` 孙组件

```html
<script>
  export default {
    props: ["msg"],
  };
</script>
<template>
  <div class="item">Item组件中显示：{{ msg }}</div>
</template>
```

> 最终在孙组件`Item`中访问到了`App`组件中传递的数据，显示结果如下

![image-20230516165526979](data:image/png;base64,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)

Prop 逐级透传问题

利用`props`将`<Root>`中的数据传递给到`<Item>`组件时，需要先把数据传递给到`<Aside>`组件。

但`<Aside>`组件可能根本不关心这些`props`，但为了使`<Item>`能访问到它们，他需要接受并继续向下传递，造成当前组件数据管理的混乱。

如果组件链路非常长，一层一层传递非常麻烦，同时会影响到这条链路上的其它组件。这一问题被称为“**prop 逐级透传**”，显然是我们希望尽量避免的情况。

> 针对上面提到的问题，依赖与注入要以帮助我们解决。

### 2、依赖与注入定义

- 一个父组件相对于其所有的后代组件而言，他是数据提供者，我们称为**依赖提供（Provide）者**。
- 所有该组件的后代组件，无论层级有多深，都可以**注入（Inject）**由祖先组件提供给整条链路的数据（依赖）

![image-20230516151734357](https://www.arryblog.com/assets/img/image-20230516151734357.c2e52a23.png)

### 3、依赖注入的基本使用

祖先组件向后代组件提供数据，后代组件能接受到数据。

> 需要经过以下两步：

**①、Provider （提供）**

祖先组件要为后代组件提供数据，需要用到`provide`选项

```js
export default {
  provide: {
    message: "Hello props",
  },
};
```

> `provide`对象上的每一个属性，后代组件会用其`key`为注入名查找期望注入的值，属性的值就是要提供的数据。

**②、Inject （注入）**

要注入上层组件提供的数据，需使用 `inject`选项来声明：

```js
export default {
  inject: ["message"],
};
```

**代码演示**

- `App.vue`

```html
<script>
  import Aside from "./components/Aside.vue";
  export default {
    // 提供数据
    provide: {
      message: "Hello props",
    },
    components: {
      Aside,
    },
  };
</script>
<template>
  <aside />
</template>
```

- `Aside.vue` 子组件

```html
<script>
  import Item from "./Item.vue";
  export default {
    components: {
      Item,
    },
  };
</script>

<template>
  <div class="aside">
    <Item></Item>
  </div>
</template>
```

- `Item.vue` 孙组件

```html
<script>
  export default {
    // 注入 App组件中提供的数据
    inject: ["message"],
  };
</script>

<template>
  <div class="item">Item组件中显示：{{ message }}</div>
</template>
```

### 4、provide 选项

关于`provide`选项在提供数据时，有以下几个需要特别注意的点

- 如何提供组件实例的状态（如：`data()` 定义的数据属性）
- 如何保证`inject`注入数据时保持响应性
- 如何修改`inject`注入的数据

> 接下来，我们就针对这三个点分别展开讲解。

### 4.1、提供组件实例的状态

如果我们需要提供依赖当前组件实例的状态（比如：那些由 `data()` 定义的数据属性），`provide`选项的值必需改写成函数形式。

```js
export default {
  data() {
    return {
      message: "Hello props",
    };
  },
  provide() {
    return {
      msg: this.message, // 访问data中的属性
    };
  },
};
```

> 这种方式提供的数据，在注入时不会保持响应性，如在子组件中通过`this.msg='Hello update`更新`msg`的值，页面并不会同步更新。

### 4.2、inject 注入数据时保持响应性

如果需要使提供的数据在注入时保持响应性，我们需要使用`computed()`函数提供一个计算属性

```js
import { computed } from "vue";
export default {
  data() {
    return {
      message: "Hello props",
    };
  },
  provide() {
    return {
      // msg的值是一个计算属性
      msg: computed(() => this.message),
    };
  },
};
```

临时配置要求

上面的用例需要设置 `app.config.unwrapInjectedRef = true` 以保证注入会自动解包这个计算属性。

这将会在 Vue 3.3 后成为一个默认行为，而我们暂时在此告知此项配置以避免后续升级对代码的破坏性。在 3.3 后就不需要这样做了。

```js
// main.js中添加以下配置
app.config.unwrapInjectedRef = true;
```

### 4.3、如何操作 inject 注入的数据

如果我们需要在后代组件中操作`inject`注入的数据，推荐在上层组件提供数据时，顺带提供操作此数据的方法。

```js
import { computed } from "vue";
export default {
  data() {
    return {
      message: "Hello props",
    };
  },
  // 提供了message数据和更新该数据的update方法
  provide() {
    return {
      message: computed(() => this.message),
      update: this.update,
    };
  },
  methods: {
    update() {
      console.log("更新");
      this.message = "Hello update!!";
    },
  },
};
```

### 4.4、代码演示

以下代码演示了`App`组件向后代组件`Item`提供了`msg`属性和更新数据的`update`方法。

在`Item`组件中点击更新按扭，就会调用`update`方法更新`message`属性的值，`message`属性的值一变化，`msg`的值也更新为最新，最后页面同步更新

- `App.vue` 根组件

```html
<script>
  import Aside from "./components/Aside.vue";
  import { computed } from "vue";
  export default {
    data() {
      return {
        message: "Hello props",
      };
    },
    provide() {
      return {
        msg: computed(() => this.message),
        update: this.update,
      };
    },
    methods: {
      update() {
        console.log("更新");
        this.message = "Hello update!!";
      },
    },
    components: {
      Aside,
    },
  };
</script>
<template>
  <aside />
</template>
```

- `Aside.vue`子组件

```html
<script>
  import Item from "./Item.vue";
  export default {
    components: {
      Item,
    },
  };
</script>
<template>
  <div class="aside">
    <Item></Item>
  </div>
</template>
```

- `Item.vue`孙组件

```html
<script>
  export default {
    inject: ["msg", "update"],
  };
</script>
<template>
  <button @click="update">更新</button>
  <div class="item">Item组件中显示：{{ msg }}</div>
</template>
```

> 以上代码最终渲染结果如下：

![GIF2023-5-1618-07-33](https://www.arryblog.com/assets/img/GIF2023-5-1618-07-33.5412b3ec.gif)

### 5、应用层 Provide

除了在一个组件中提供依赖，我们还可以在整个应用层面提供依赖

```js
import { createApp } from "vue";

const app = createApp({});

app.provide("msg", "hello!"); // msg 为注入名   hello 为值
```

在应用级别提供（provide）的数据在该应用内的所有组件中都可以注入（inject）。这在你编写**插件**时会特别有用，因为插件一般都不会使用组件形式来提供值。

### 6、注入（Inject）

在子组件中注入上层组件提供的数据时，有以下几个需要注意的点

- 注入被解析时机
- 注入别名
- 注入默认值

> 接下来，我们就针对这三个点分别展开讲解。

### 6.1、注入被解析时机

`inject`（注入）会在组件自身的状态**之前**被解析，你可以在

- `data()`、`method`、`computed`等中访问到注入的属性
- 在`created`生命周期函数中访问到。

> 在`beforeCreate`生命周期函数中是访问不到的

```js
export default {
  inject: ["msg"],
  data() {
    return {
      text: this.msg,
    };
  },
  methods: {
    print() {
      console.log("打印msg", this.msg);
    },
  },
  computed: {
    newMsg() {
      return this.msg + " computed";
    },
  },
};
```

### 6.2、注入别名

如果我们想在子组件中用一个不同的**本地属性**名注入上层组件提供的属性时，`inject`选项需要采用以下对象写法

```html
<script>
  export default {
    // 必须使用对象形式
    inject: {
      // text 为本地属性名
      text: {
        from: "msg", // 注入来源名，msg为上层组件提供的属性（注入名）
      },
    },
  };
</script>
<template>
  <!--使手注入的属性-->
  <div>{{ text }}</div>
</template>
```

### 6.3、注入默认值

如果`inject`选项中声明的注入名没有被提供，则会抛出一个运行时警告。所以在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值。

这样在注入名没有被提供时，会采用默认值，如果有被提供，则采用提供的值。

> 不过此时`inject`选项必须使用对象形式来书写

```js
export default {
  // 当声明注入的默认值时
  // 必须使用对象形式
  inject: {
    text: {
      from: "msg", // 注入来源，如果本地属性名与原注入名相同，这个属性是可选的
      default: "default value", // 默认值
    },
    count: {
      from: "count", // 当与原注入名同名时，这个属性是可选的
      // 如果默认值需要经过复杂的计算，则可以写成函数
      default() {
        //....
        return 0;
      },
    },
  },
};
```

### 6.4、代码演示

- `App.vue` 根组件

```html
<script>
  import Aside from "./components/Aside.vue";
  import { computed } from "vue";
  export default {
    data() {
      return {
        count: 10,
        message: "Hello props",
      };
    },
    // 提供数据
    provide() {
      return {
        msg: computed(() => this.message),
        count: computed(() => this.count),
        countAdd: this.add,
      };
    },
    methods: {
      // 更新count的方法
      add() {
        this.count++;
      },
    },
    components: {
      Aside,
    },
  };
</script>
<template>
  <aside />
</template>
```

- `Aside.vue`子组件

```html
<script>
  import Item from "./Item.vue";
  export default {
    components: {
      Item,
    },
  };
</script>
<template>
  <div class="aside">
    <Item></Item>
  </div>
</template>
```

- `Item.vue` 孙组件

```html
<script>
  export default {
    // 注入数据
    inject: {
      text: {
        from: "msg",
        default: "default value",
      },
      count: {
        // 如果默认值需要经过复杂的计算，则可以写成函数
        default() {
          //....
          return 0;
        },
      },
      countAdd: {
        from: "countAdd",
      },
    },
    data() {
      return {
        // 基本数据类型，count的值更新了，newCount的值不会更新
        newCount: this.count,
      };
    },
  };
</script>
<template>
  <button @click="countAdd">count++</button>
  <div>text的值：{{ text }}</div>
  <div>count的值：{{ count }}</div>
  <div>newCount的值 {{ newCount }}</div>
</template>
```

> 最终渲染效果如下：

![GIF2023-5-1620-11-54](https://www.arryblog.com/assets/img/GIF2023-5-1620-11-54.3233261a.gif)

### 7、使用 Symbol 作为注入名

但如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库。

> 建议最好使用 Symbol 来作为注入名以避免潜在的冲突。

我们通常推荐在一个单独的文件中导出这些注入名 Symbol：

```js
// keys.js
export const count = Symbol("count");
export const msg = Symbol("msg");
// 在供给方组件
import { computed } from "vue";
import { count, msg } from "./keys.js";
export default {
  data() {
    return {
      count: 10,
      message: "Hello props",
    };
  },
  provide() {
    return {
      /* msgt 和 count 为Symbol类型，则需要采用[]方括号写法*/
      [msg]: computed(() => this.message),
      [count]: computed(() => this.count),
    };
  },
};
// 注入方组件
// 导入keys
import { count, msg } from "../keys.js";
export default {
  // 注入数据
  inject: {
    text: {
      from: msg,
      default: "default value",
    },
    count: {
      from: count,
      // 如果默认值需要经过复杂的计算，则可以写成函数
      default() {
        //....
        return 0;
      },
    },
  },
};
```

### 8、总结

> 本小节我们重点需要掌握以下内容：

**为什么需要依赖注入**

因为`Prop`在实现祖先组件向后代组件传递数据里，需要沿着组件链一层一层向下传递，非常的麻烦。在传递过层过程，很多组件其实并不需要关注上层组件传递的`props`，但为了能把数据向下传递，则需要接受`props`并继续向下传递，造成组件数据管理混乱问题。

> 而依赖注入可以帮助解决这个问题。

**依赖与注入**

- 依赖提供者：向下层提供数据的组件称为依赖提供者。
- 注入者：需要接受上层组件传递的数据组件，称为注入者

**依赖注入的基本使用**

- 依赖提供者通过`provide`选项对外提供数据
- 在后代组件中通过`inject`选项来注入父或（上层）组件提供(`provide`)的数据

**provide 选项注意事项**

- 如何提供组件实例的状态（如：`data()` 定义的数据属性）
- 如何保证`inject`注入数据时保持响应性
- 如何修改`inject`注入的数据

**inject 注入选项注意事项**

- 注入被解析时机
- 注入别名
- 注入默认值

**应用层 Provide 的基本用法**

```js
app.provide(/* 注入名 */ "message", /* 值 */ "hello!");
```

**使用`Symbol`作为注入名**

- 通常把需要注入的名写在一个单独的 JS 文件中
- 在供给方组件中（依赖提供者），通过`import`导入上面提到的 JS 文件，将导入的 Symbol 作为提供的属性名
- 在注方组件中，同样通过`import`导入上面提到的 JS 文件，将导入的 Symbol 作为注入的注入来源名

注意事项

依赖注入主要用来实现上层组件向后代组件传递数据，所以父子间传递数据也是可行的。

> 但是父子组件间传递数据，更推荐使用`props`来实现。
