# CSS 三大特性：继承、层叠性、优先级

我们实际的开发中，经常会遇到 CSS 应用时的冲突问题。比如本来应该产生效果的样式没有生效，或有时候不想要的效果硬实现了，为什么会产生这种效果，我们搞不清原因。

接下来我们要学的 CSS 三大特性：继承性、层叠性、优先级就是为解决这些问题而来的。

但是在学习之前，我们先来看一个 CSS 样式发生冲突的案例，看下在这个案例当中会发生那些样式冲突，带着这些问题我们再来学习，效果会更好。

**CSS 样式发生冲突案例：**

```html
<style>
  .box {
    font-style: italic;
  }
  /* 优先级 0012 */
  .box p span {
    color: blue;
  }
  /* 优先级 0011 */
  span:hover {
    color: red;
    font-size: 30px;
  }
</style>
<body>
  <div class="box">
    <p><span>我是span中内容</span></p>
  </div>
</body>
```

思考以下 3 个问题，并给出答案：

- 鼠标滑动到 span 上时，span 中的文字有没有放大和变红？为什么？
- 如果鼠标滑动到 span 上时，想实现文字变红，如何修改代码，达到效果？
- span 标签最终的呈现效果是什么？为什么是这样的？

## 一、CSS 继承性

CSS 的继承性

是指**特定的 CSS 属性**会向下传递到子孙元素。即祖先元素设置，后代元素即生效

```html
<style type="text/css">
  .box {
    /* 宽300px 无继承性 */
    width: 700px;
    /* 边框线 无继承性 */
    border: 1px solid red;
    /*
        color、text-align、font-size都有继承性
        都可以继承给到其子孙元素
    */
    color: red;
    text-align: center;
    font-size: 14px;
  }
  .box p {
    background-color: khaki;
    /* p中自已设置了font-size，所以不会继承父元素的 */
    font-size: 20px;
  }
</style>
<body>
  <div class="box">
    <p>我的文字颜色红色和文字水平居中，都是继承于父元素box的</p>
  </div>
</body>
```

![image-20220723151636520](https://www.arryblog.com/assets/img/image-20220723151636520.814bb4c2.png)

### 1、CSS 继承性遵顺“就近原则”

- 如果元素自身没有设置某个具有可继承的属性，则会向他的父元素继承
- 如果父元素没有，则再往上继承父元素的父元素的这个属性，一层层向上找，如果找不到，就以**默认的样式**显示

```html
<style>
  .box {
    /* width不可继承属性 */
    width: 400px;
    /* border不可继承属性 */
    border: 1px solid #666;
    /* text-align 可继承属性 */
    text-align: center;
  }
  .box1 {
    /* color 可继承属性 */
    color: blue;
  }
</style>
<body>
  <div class="box">
    <div class="box1">
      <h3>CSS继承性遵顺“就近原则”</h3>
    </div>
  </div>
</body>
```

![image-20220719131752156](https://www.arryblog.com/assets/img/image-20220719131752156.9c1a49d4.png)

如何查看元素的默认值

要了解一个属性的默认值，可以把这个属性值设置为 initial ，然后审查元素，在 computed 面板中可以看到其默认值，如`color:initial;`

### 2、可继承和不可继承属性有哪些

可继承属性

文本相关的属性普遍具有继承性，只需要给**祖先标签**设置，即可在后代所有标签中生效

- 字体系列： font-size、font-family、font-style、font 、font-weight
- 文本系列：color 、text-align、text-indent、line-height、word-spacing、letter-spacing、text-transform
- 列表布局属性：list-style、list-style-type、list-style-image、list-style-position 等
- 光标属性：cursor 光标显示为何种形态
- 元素可见性：visibility 控制元素显示和隐藏

**不可继承属性**

- 盒子模型：display、margin、border、padding、height、min-height、max-height、width、min-width、max-width
- 定位相关：position、left、right、top、bottom、z-index
- 浮动：float、clear
- 其它：background、overflow、table-layout、vertical-align、page-break-after、page-bread-before 和 unicode-bidi

### 3、a 标签的 color 值默认不继承

```html
<style type="text/css">
  /* 
    .box中文字为红色，
    但a标签没有设置color属性，也没有继承父元素的color属性，以默认值出现
  */
  .box {
    color: red;
  }
</style>
<body>
  <div class="box">
    <a href="">我是超链接</a>
  </div>
</body>
```

![image-20220707161721440](data:image/png;base64,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)

### 4、line-height 的继承性

line-height 的值有三种单位，在继承时的差异点

| 父元素 line-height 值 | 继承规则                                                                                     | 子元素 line-height 值 |
| :-------------------- | :------------------------------------------------------------------------------------------- | :-------------------- |
| 50px                  | 直接继承该 值                                                                                | 50px                  |
| 2                     | 直接继承该比例                                                                               | 2                     |
| 200%                  | 继承%百分比计算后的值 如果父元素`font-size: 20px;` 则计算得到父元素 line-height 的值是 40px; | 40px                  |

```html
<style>
  .box {
    width: 350px;
    height: 100px;
    background-color: pink;
    font-size: 30px;
    /* 情况一： 子元素直接继承父元素值 */
    line-height: 50px;
    /* 
        情况二：  子元素直接继承父元素值
        line-height:2;
    */

    /*
        情况三：  子元素继承%百分比换算后的值  200%*30=60px
        line-height:200%;
    */
  }
  .item1 {
    font-size: 20px;
    /* 情况一： 从父元素直接继承过来  line-height:50px;  */
    /* 情况二：从父元素直接继承过来 line-height:2; 最终2*20px  子元素行高为40px */
    /* 情况三：子元素继承父元素%百分比换算后的值60px ，所以子元素line-height:60px */
  }
</style>
<body>
  <div class="box">
    <div class="item1">直接继承父元素的line-height:50px;</div>
  </div>
</body>
```

### 5、body 标签样式初始化

因为文字相关属性有继承性，所以通常会设置 `<body>`标签的字号、颜色、行高等，这样就能当做整个网页的默认样式了。

```css
/* 以下代码来自京东 你可能会有疑问，字体类型为什么没有引号引起来 */
body {
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B8B\4F53', sans-serif;
  color: #666;
}
```

### 6、设置继承性

默认不继承的属性想要继承，可以把属性值设为`inherit` 。表示这个属性的值继承父元素的。

**扩展补充知识：**

css 属性通常会有以下三个值：

- `initial` 设置属性值和浏览器默认样式相同
- `inherit` 属性值默认继承父元素
- `unset` 它是关键字 `initial` 和 `inherit` 的组合，如果属性有继承性，则继承父元素，没有则为默认值

```html
<style type="text/css">
  .box {
    width: 100px;
    height: 100px;
    /* 2px 实线 红色 边框 */
    border: 2px solid red;
  }
  .item {
    width: 50px;
    height: 50px;
    /* 边框是没有继承性的，所以要让他继承父元素的边框样式，就把值设为inherit */
    border: inherit;
  }
</style>
<body>
  <div class="box">
    <div class="item"></div>
  </div>
</body>
```

![image-20220723153827475](https://www.arryblog.com/assets/img/image-20220723153827475.a4637943.png)

深入 CSS 继承

[CSS 继承的官方资料，点击查看详细文档 👆(opens new window)](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

## 二、CSS 层叠性

- 层叠是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源（css 规则）的属性值的算法。
- 它在 CSS 处于核心地位，CSS 的全称层叠样式表正是强调了这一点。

**我们来看下面这个例子**

有两个 css 规则同时作用于同一个 div 标签，那最后之两个 css 规则中的属性值是如何合并计算的，以谁为主呢？这就需要一套明确的规则来规定，这套规则就是指**CSS 层叠性**。

```html
<style>
  /* css规则1 */
  .box {
    color: red;
    font-size: 30px;
  }
  /* css规则2 */
  div {
    color: blue;
  }
</style>
<body>
  <div class="box">艾编程</div>
</body>
```

![image-20220719141324349](data:image/png;base64,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)

### 1、CSS 层叠性解读

- 所谓的层叠性是指多个 CSS 规则可以同时作用于同一个标签，效果 **叠加**，并不完全 **覆盖**。
- css 的层叠性有两层含义：**叠加** 和 **覆盖**
- 不同选择器作用同一元素，不同属性会**叠加**，相同属性会 **覆盖** 。
- 在 **覆盖** 时需要遵顺以下两大原则：**"就近原则"** 和 **"优先级"**

### 2、CSS 的叠加原理

> 不同选择器作用于同一元素，不同属性会叠加作用于元素。

```html
<style>
  /*
        以下三个选择器中的样式属性都不一样，则会叠加
        最后div效果：
            背景颜色:黄色
            字体大小：20像素
            字体颜色：红色
    */
  div {
    background: yellow;
  }
  div {
    font-size: 20px;
  }
  .box {
    color: red;
  }
</style>
<body>
  <div class="box">文本内容</div>
</body>
```

![image-20220709190141069](data:image/png;base64,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)

### 3、CSS 的覆盖原则

就近原则

- 当两个或多个 **优先级相同** 的选择器作用到同一个元素时。如果出现相同的属性，则以写在后面的选择器中的属性为主。
- 所谓的就近原则是指，离 html 元素最近的那个为主。本质和选择器谁写在后面以谁为主是一个意思。

```css
/*
    以下两个选择器的优先级一一样，
    则相同属性会覆盖，覆盖时，以写在后面的为主
    不同属性会叠加。
*/

div {
  /* background属性会叠加 */
  background: yellow;
  /* 无效 */
  color: blue;
}
div {
  /* font-size属性会叠加 */
  font-size: 20px;
  /* 选择器优先级一样，以后面为主，则此属性生效 */
  color: red;
}
/* 最终的CSS实际效果 */
/*
    div{
    background:yellow;
    font-size:20px;
    color:red; 
    }
*/
```

优先级

- 当两条或多条规则（选择器）作用到同一个元素，如果出现相同的属性，则以**优先级高**的为主。

```html
<style>
  /*
        基础选择器优先级从高到低分别是： id选择器 >class选择器 >标签选择器
        id优先级最高，则最后以id中的color:red为最终显示效果
    */
  #box {
    /* 生效 */
    color: red;
  }
  .box {
    /* 不生效 */
    color: blue;
  }
  div {
    /* 不生效 */
    color: green;
  }
</style>
<body>
  <div class="box" id="box">div中内容</div>
</body>
```

![image-20220709133706358](data:image/png;base64,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)

### 4、层叠性的冲突处理

- 不同 css 规则集同时作用于同一个标签，不同属性相互叠加，相同属性会覆盖。
- 相同属性覆盖，首先需要计算选择器的权重，最后以选择器权重高的为主。
- 如果选择器权重相同，则写在后面的会覆盖写在前面的。
- 如果想要实现的效果，因为选择器因为权重低而不生效，则通过提高选择器权重来达到效果。

```html
<style>
  /* id权重最高，样式全部应用 */
  #box {
    width: 200px;
  }
  /*
    	.box与.box2权重一样，相同属性叠加，不同属性，以写在后面的为主
    	最后生效样式：
    	color:orange; background:skyblue; font-size:30px
    */
  .box {
    color: blue;
    background-color: skyblue;
  }
  .box2 {
    color: orange;
  }
  /*
        div权重低于.box和.box2，相同属性叠加，不同属性，以权重高的为主
        则color不生效，border属性生效
    */
  div {
    color: green;
    font-size: 30px;
  }
  /*
    	计算后最终生效样式
    	width:200px;
    	color:orange;
    	background-color:skyblue;
    	font-size:30px;
    */
</style>
<body>
  <div class="box2 box" id="box">文本内容</div>
</body>
```

![image-20220709135551251](data:image/png;base64,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)

## 三、CSS 选择器优先级

- 当多个 css 规则集同时作用于同一个 HTML 标签时，不同属性会叠加，但相同属性会发生覆盖。
- 在发生覆盖时，浏览器通过 **选择器的优先级** 来判断以那个选择器中的属性值为主，从而在该元素上应用这些属性值。

### 1、单个选择器类型的权重

- 我们前面讲过基础选择器类型的优先级，从高到低为：**id 选择器>class 选择器>标签选择器>通配符选择器**。
- 但我们学过的选择器类型远不止上面这 4 种，那这些选择器都放在一起，谁的优先级会更高一些呢？
- 本质上，不同类型的选择器有不同的分数值，分数值越高，选择器的权重越高，具体如下表。

| 选择器的类型                   | 实例                        | 选择器权重 | 等级     |
| :----------------------------- | :-------------------------- | :--------- | :------- |
| !important                     | div{ color:red!important; } | 无穷大     | 特级     |
| 行内样式（style 属性中样式）   | style='color:red;'          | 1000       | 第一等级 |
| id 选择器                      | #id                         | 0100       | 第二等级 |
| class、伪类、属性选择器        | .box、:hover、[type='text'] | 0010       | 第三等级 |
| 标签选择器、伪元素选择器       | div、::after、::before      | 0001       | 第四等级 |
| 通配符、子选择器、相邻选择器等 | \*、> 、+、~                | 0000       |          |
| 继承的样式                     |                             | 0000       |          |

提示：

**\* 通配符** 权重实际是要大于继承的样式的

### 2、复杂选择器优先级计算

- 优先级就是分配给指定的 CSS 声明的一个权重
- 选择器的优先级是由选择器中的每一种 **选择器类型的数值（权值）** 相加的最终结果来决定。
- 一个选择器的优先级是由四个部分相加计算得来的（数值越大，代表选择器的优选级越高）。

**以下是复杂选择器的权重计算规则**

- 这里要对照我们前面讲过的单个选择器类型的选择器权重来看
- 这里的**行内样式** `<p style="color: red"></p>` 并不是选择器，但我们把他放在一起，是因为了他会影响我们最终的结果

| 选择器                                   | 千位 | 百位 | 十位 | 个位 | 优先级 |
| :--------------------------------------- | :--- | :--- | :--- | :--- | :----- |
| 行内样式 如：`<p style="color:red"></p>` | 1    | 0    | 0    | 0    | 1000   |
| `div p`                                  | 0    | 0    | 0    | 2    | 0002   |
| `#box div p`                             | 0    | 1    | 0    | 2    | 0102   |
| `.box .item h3`                          | 0    | 0    | 2    | 1    | 0021   |
| `.box:hover p`                           | 0    | 0    | 2    | 1    | 0021   |

案例 1：

鼠标放在 p 标签上，文字会变成红色吗 ？

```html
<style>
  /* 优先级 0011 */
  p:hover {
    color: red;
  }
  /* 优先级 0011 */
  .box p {
    color: blue;
  }
  /*
    两选择器优选级相同，都是0011 ，则以写在后面的为主，相同属性发生覆盖。
    则最终效果为 blue蓝色，鼠标滑上去文字并不会变色
  */
</style>
<body>
  <div class="box">
    <p>文本内容</p>
  </div>
</body>
```

答：

鼠标滑动到 p 上面，文字并不会变成红色

案例 2：

以下案例中的 p 标签的最终显示效果怎样的？

```html
<style>
  /* 优先级：100 */
  #title {
    color: red; /*生效*/
  }
  /* 优先级：20 */
  .box .title {
    /* 不生效，以#title为主 */
    color: blue;
  }
  /* 优先级：10 */
  .title {
    /* 生效 */
    font-size: 16px;
  }
  /* 优先级：2 */
  div p {
    /* 不生效，以.title中为主 */
    font-size: 40px;
  }
</style>
<body>
  <div class="box">
    <p id="title" class="title">p中内容</p>
  </div>
</body>
```

![image-20220709162624874](data:image/png;base64,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)

案例 3：

以下案例中，p 标签中的文字最终是以什么颜色显示？

```html
<style>
  /* 单个选择器类型优先级从高到低：id  > class > 标签 */
  /* 优先级 0201 */
  #box1 #box2 p {
    color: red;
  }
  /* 优先级 0212  三个中优先级最高，则以他为主 */
  #box1 div.box2 #box3 p {
    color: green;
  }
  /* 优先级 0031 */
  .box1 .box2 .box3 p {
    color: blue;
  }
</style>
<body>
  <div class="box1" id="box1">
    <div class="box2" id="box2">
      <div class="box3" id="box3">
        <p>我是一个段落标签</p>
      </div>
    </div>
  </div>
</body>
```

![image-20220723161534329](data:image/png;base64,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)

注意事项：

- 在进行选择器权重计算时不允许进行进位
- 例如，20 个类选择器仅仅意味着 20 个十位，而不能视为 两个百位，也就是说，无论多少个类选择器的权重叠加，都不会超过一个 ID 选择器。
- 在比较选择器优先级时，从左往右比较，一位一位比较，如果千位不相同，以大的为主，如果千位相同，是比较下一位。下一位的比较规则与上一位一样。

### 3、!important 提升权重

- 当在一个样式声明中使用一个 `!important` 规则时，此声明将覆盖任何其他声明,包括行内样式。
- 虽然，从技术上讲，`!important` 与优先级无关，但它与最终的结果直接相关

```html
<style>
  div {
    color: red !important;
  }
  #box {
    color: orange;
  }
</style>
<body>
  <div style="color: blue">文本内容</div>
</body>
```

![image-20220709144523227](data:image/png;base64,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)

注：

- 只要 css 声明属性值后面带!important,就一定以他为主。

**慎用 !important**

- 不过我们要慎用!important，因为这会带来样式的冲突。后面某个地方，需要重写这个样式时，会发现根本无效。一般你在利用第三方组件或 css 框架时，如果不能重写样式，那将会失去很多色彩。
- 在某些情况下是一定要用的，比如在之前学的自定义字体时，font-family 属性后面加了!important 关键字。

### 4、总结：CSS 选择器优先级

首先要找到，有哪些选择器在控制标签元素的样式，然后按以下 5 步来分析，最终生效的 css 声明。

- 第一步：找有没有带 important 关键词的 CSS 声明，有就一定以他为主，没有看第二步
- 第二步：找有没有行内样式，有则以行内样式为主，没有看第三步
- 第三步：看选择器的优先级，优先级高的为主，如果优先级相同，则看第四步
- 第四步：优先级相同，以写在后面的为主。如果没有选择器作用于当前标签，则看第五步
- 第五步：看此 CSS 属性是否具有继承性，如果有，则继承父元素的样式，如果没有，则以默认样式显示。

## 四、测试题

### 1、看代码，回答以下三个问题

- 鼠标滑动到 span 上时，span 中的文字有没有放大和变红？为什么？
- 如果鼠标滑动到 span 上时，想实现文字变红，如何修改代码，达到效果？
- span 标签最终的呈现效果是什么？为什么是这样的？

```html
<style>
  .box {
    font-style: italic;
  }
  .box p span {
    color: blue;
  }
  span:hover {
    color: red;
    font-size: 30px;
  }
</style>
<body>
  <div class="box">
    <p><span>我是span中内容</span></p>
  </div>
</body>
```

**1、鼠标滑动到 span 上时，span 中的文字有没有放大和变红？为什么？**

- 答：不会变红，因为`span: hover;`的优先级低于`.box p span`，所以最终`color: blue;`

**2、如果鼠标滑动到 span 上时，想实现文字变红，如何修改代码，达到效果？**

- 答： 把`span:hover`选择器，改成 `p span:hover { }` 提高选择器的优先级

**3、span 标签最终的呈现效果是什么？为什么是这样的？**

- 答：span 最终以 **16px**、 **蓝色** 、**斜体** 来呈现，当鼠标滑上去时，文字会变大到 30px

**解读**

所以 span 中文字最终以 **16px** **蓝色** **斜体** 来呈现

- `.box p span`中没有`font-style`属性，所以其默认的`font-style`属性是继承其祖先元素 div 的 `font-style:italic;`
- `.box p span`中没有定义`font-size` 则会继承 body 的`font-size:16px`
- `.box p span` 中定义了`color:blue;`

当鼠标滑上去时，文字会变大到 30px

- `span:hover`中的 color 属性并不会生效，因为`span:hover`的优先级低于`.box p span`
- `span:hover`中的`font-size:30px`是生效的，因为在`.box p span`中并没有声明 font-size 属性。
- 鼠标滑动到`span`上时，文字只会变成 30px，并不会改变颜色

### 2、以下 span 中文字的颜色是？

```html
<style>
  .col {
    color: red;
  }
  div p span {
    color: blue;
  }
</style>
<body>
  <div>
    <p><span>span标签的文字颜色</span></p>
  </div>
</body>
```

答：

`.col`并没有作用于 span 标签，所以控制 span 标签的字体颜色为`color:blue;`蓝色

### 3、鼠标滑动到 a 标签，a 标签中文字能不能变成黄色

```html
<style>
  /* 12 */
  li a:hover {
    color: yellow;
  }
  /* 12 */
  .list li a {
    color: orange;
  }
</style>
<body>
  <ul class="list">
    <li><a href="">艾编程</a></li>
  </ul>
</body>
```

答：

`li a:hover` 与`.list li a`的优先级一样，优先级一样，以写在后面的为主，则鼠标滑上去，文字不会变成黄色

### 4、以下 li 中和 a 中的文字颜色分别？

```html
<style>
  /* 2 */
  ul li {
    color: red;
  }
  /* 2 */
  ul > li {
    color: orange;
  }
</style>
<body>
  <ul class="list">
    <li>
      点击进入
      <a href="">艾编程</a>
    </li>
  </ul>
</body>
```

答：

ul li 和 ul > li 的优先级是一样的，优先级一样，以写在后面的为主，则 li 最终的效果为橘黄色

## 五、案例

### 1、CSS 开关按扭

核心知识：

- `::checked` 选择器
- `<label>`标签应用
- 后续兄弟选择器
- `::after` 伪元素选择器

![image-20220708222925929](data:image/png;base64,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)

```html
<style>
  .button {
    width: 60px;
    height: 26px;
    padding: 2px;
    background-color: #ddd;
    border-radius: 20px;
  }
  .button::after {
    display: inline-block;
    content: '';
    width: 26px;
    height: 26px;
    background-color: #fff;
    border-radius: 100%;
  }
  input {
    display: none;
  }
  input:checked ~ .button {
    background-color: skyblue;
  }
  input:checked ~ .button::after {
    float: right;
  }
</style>

<body>
  <label for="on-off">
    <input type="checkbox" id="on-off" />
    <div class="button"></div>
  </label>
  <br />
  <label for="on-off2">
    <input type="checkbox" id="on-off2" />
    <div class="button"></div>
  </label>
</body>
```

### 2、鼠标滑动按扭效果

核心知识：

- `:hover` 伪类选择器
- 元素类型转换
- background 背景样式

| 原始效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 鼠标悬停效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image-20220709165142067](data:image/png;base64,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) | ![image-20220709165113529](data:image/png;base64,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) |

```html
<style>
  .down {
    display: inline-block;
    width: 130px;
    height: 40px;
    /* 首行缩进 或用内边距+计算   或 内边距+怪异盒子模型 */
    text-indent: 45px;
    line-height: 40px;
    text-decoration: none;
    color: #d81e06;
    border-radius: 10px;
    background: #ddd url(images/down1.png) no-repeat 5px center;
  }
  .down:hover {
    /* 样式重写 图片位置 重复度用.down选择器中的样式 */
    background-color: #d81e06;
    background-image: url(images/down2.png);
    color: #fff;
  }
</style>
<body>
  <a href="#" class="down">点击下载</a>
</body>
```
