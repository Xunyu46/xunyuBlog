# CSS 文本和字体属性、列表属性



本节关于常用 CSS 文本样式属性、段落和行相关属性、列表属性

## 一、常用文本样式属性

| 属性                        | 描述                       |
| :-------------------------- | :------------------------- |
| `color`英文单词表示法       | `color: red;`              |
| `color`十六进制表示法       | `color: #ff0000;`          |
| `color`rgb() 表示法         | `color: rgb(255,0,0);`     |
| `color` rgba() 表示法       | `color: rgba(255,0,0,.35)` |
| `font-size`字体大小         | `font-size: 20px;`         |
| `font-weight` 字体粗细程度  | `font-weight: bold;`       |
| `font-style`字体倾斜        | `font-style: italic;`      |
| `text-decoration`文本修饰线 | `text-decoration:none;`    |

### 1、color 属性



- color 属性可设置文本内容的字体颜色
- color 属性主要可以用 英语单词、十六进制、rgb()、rgba() 等表示法

注：英语单词表示法，如：`color:red;`仅用于学习或测试使用，工作中基本不用这样的形式，需要精准

```css
color: red;
color: skyblue;
```

### 2、color 属性 - 十六进制表示法



- 十六进制表示法是所有设计软件中都通过的颜色表示法
- 设计师会给我们在设计图上标注的颜色，通常为十六进制表示

```css
/* 
	ff: 最小值是00 ，最大值是ff
	光学显示器三原色：红绿蓝 
	我们日常画画时是：红黄蓝
*/
color: #ff0000;
```

- 如：十六进制 ff 就是十进制的 255，每种颜色分量都是 0~255 的数字
- 如果颜色值是两两相同，并且能有三对，`#aabbcc` 的形式，可以简写为 `#abc`

```css
color:#cc0066      可以简写成       color:#c06;
color:#ff43dd       不能写成        color:f43d;
```

常用的十六进制表示法

| 色值                                        | 描述 |
| :------------------------------------------ | :--- |
| `#000`                                      | 黑色 |
| `#fff`                                      | 白色 |
| `#ccc` 、`#333` 、`#2f2f2f`、`#666`、`#ddd` | 灰色 |

### 3、color 属性 - rgb() 表示法



- rgb 中三个数字的范围是 0-255 之间
- rgb 是光学显示器三原色：红（red ）、绿（green）、 蓝（blue） 三个单词的缩写

```css
/*
	rgb()三个值分别表示：红色,绿色,蓝色
	最小值：0 
	最大值：255 （红色）
*/
color: rgb(255, 0, 0);

/* 白色 */
color: rgb(255, 255, 255);

/* 黑色 */
color: rgb(0, 0, 0);
```

### 4、color 属性 - rgba() 表示法



- 颜色也可以用 rgba() 表示法，rgba 中前三个数字的范围是 0-255 之间，表示的是颜色
- 最后一个参数表示颜色透明度介于 0 到 1 之间
- 0 表示纯透明，1 表示纯实心（不透明），从 0-1 值越大，透明度越低
- rgba() 表示法从 IE9 开始兼容

```css
color: rgba(255, 0, 0, 0.35);
```

### 5、font-size 属性，字体大小



- font-size 属性用来设置文字的字体字号大小，单位通常为 px（像素）、%百分比
- 移动端还会学习 em、rem、vw、vh 单位

#### px（像素）单位

```css
font-size: 20px; /* 字体大小 20px */
```

- 网页文字正文字号通常是 16px
- 浏览器最小支持 12px 字号，也就是你设置的字体小于 12px，默认都会以 12px 大小显示
- **面试题**：如何在页面显示小于 12px 的字体？（学到动画会讲）

#### %（百分比）单位

百分比相对于父元素的 font-size 大小而言

```html
<style>
  p {
    font-size: 20px; /*字体大小*/
  }
  p span {
    font-size: 200%; /*相当于 40px*/
  }
</style>
<body>
  <p><span>字体</span>大小以百分比为单位，相对的是父元素font-size大小</p>
</body>
```

### 6、font-weight 属性



- font-weight 属性设置字体的粗细程度
- 通常用 normal 和 bold 两个值，或其对应数字 400 与 700 来表示

| 属性      | 描述                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `normal`  | 正常粗细，与 400 等值                                                                |
| `bold`    | 加粗，与 700 等值                                                                    |
| `lighter` | 更细，大多数中文字体不支持。 比从父元素继承来的值更细 （处在字体可行的粗细值范围内） |
| `bolder`  | 更粗，大多数中文字体不支持。 比从父元素继承来的值更粗（处在字体可行的粗细值范围内）  |

```css
/* 正常粗细 与400等值 */
font-weight: normal;
/* 加粗，与700等值 */
font-weight: bold;
```

**当我们使用`数字`来表示粗细时**

- 数字大小介于 1-1000（包含）之间，更大的数字比更小的数字表示的字体要相对粗些
- 最终的粗细要在当前字体可行的精细范围之内

```html
<style>
  div {
    font-weight: 400; /*正常粗细*/
  }
  div span {
    font-weight: lighter;
  }
  div .bold {
    font-weight: bold;
  }
</style>
<body>
  <div>
    <span class="bold">我是加粗过的</span> 我正常粗细，<span
      >我比父级字体细？</span
    >
  </div>
</body>
```

### 7、font-style 属性



- font-style 属性设置字体的倾斜

| 属性      | 描述                                                                            |
| :-------- | :------------------------------------------------------------------------------ |
| `normal`  | 取消倾斜，如：把天生倾斜的 i、em 等标签设置为 不倾斜                            |
| `italic`  | 设置为倾斜字体（常用） 如果当前字体没有可用的斜体版本，会选用（`oblique` ）替代 |
| `oblique` | 设置为倾斜字体（用常规字体模拟，不常用）                                        |

```html
<style>
  p i {
    font-style: normal; /*取消倾斜*/
  }
  .line1 {
    font-style: italic; /*倾斜字体*/
  }
  .line2 {
    font-style: oblique; /*倾斜字体*/
  }
</style>
<body>
  <p><i>我是normal下修正过来的,不倾斜</i></p>
  <p class="line1">我是italic下的倾斜</p>
  <p class="line2">我是oblique下的倾斜</p>
</body>
```

### 8、@font-face 自定义字体

设置用户电脑中没有的字体

`@font-face` 可以消除对用户电脑字体的依赖，如果用户电脑中没有我们想要的字体，那用户在浏览网页时就会下载相关字体，然后显示字体效果。

#### **定义字体前准备工作**

- 必须自己定义新的字体 （需要有字体文件）
- 用户加载网页时，会同时下载这些字体文件
- 字体文件根据操作系统和浏览器不同，有 `eot`、`woff2`、`woff`、`ttf`、`svg` 文件格式，需要同时有这 5 种文件

#### 如何定义字体

```css
@font-face {
  font-family: ; /*字体类型*/
  src: url(); /*引入字体文件*/
}
```

- 当我们拥有字体文件后，就可以用 `@font-face` 定义字体
- 字体有很多是有版权的不能随便商业使用
- 建议使用**阿里巴巴普惠体**，可免费商用的字体
- 阿里巴巴普惠体：[https://www.iconfont.cn/webfont(opens new window)](https://www.iconfont.cn/webfont)
- 使用阿里巴巴普惠字体，可以下载，也可以在线使用，也省去了下载字体的麻烦
- 实际应用场景：指定特定文字设置样式，比如：标题 ...

#### 使用阿里巴巴普惠字体步骤

① 点击网址[https://www.iconfont.cn/webfont (opens new window)](https://www.iconfont.cn/webfont)进入

![image-20220705221154007](https://www.arryblog.com/assets/img/image-20220705221154007.eaec028e.png)

② 解压下载好的字体包，然后点击 demo.html，按文件中的以下三步来使用字体

![image-20220705221500015](https://www.arryblog.com/assets/img/image-20220705221500015.004c79b4.png)

**第一步：使用 font-face 声明字体**

> 这里要注意，引入字体的地址，如果导入文件和字体不在同一目录下，需要修改地址

```css
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("webfont.eot"); /* IE9 */
  src: url("webfont.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("webfont.woff2") format("woff2"), url("webfont.woff") format("woff"), /* chrome、firefox */
      url("webfont.ttf") format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("webfont.svg#webfont") format("svg"); /* iOS 4.1- */
}
```

**第二步：定义使用 webfont 的样式**

```css
.web-font {
  font-family: "webfont" !important;
  font-size: 26px;
  color: red;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**第三步：为文字加上对应的样式**

```html
<p class="web-font">艾编程- 为每个互联网人提供高质量的终身学习平台</p>
<p></p>
```

**查看字体效果：**

![image-20220705222200384](https://www.arryblog.com/assets/img/image-20220705222200384.ab6e97f7.png)

## 二、CSS 文本属性

包含内容

修饰线，首行缩进，行高，font 属性复合写法，内容水平居中，字间距，字符间距

### 1、text-decoration 属性 - 修饰线

修饰线

- 用于设置文本的修饰线外观的（下划线、上划线、贯穿线/删除线 或 闪烁）
- 常用的属性值有以下三种

| 属性           | 描述       |
| :------------- | :--------- |
| `none`         | 没有修饰线 |
| `underline`    | 下划线     |
| `line-through` | 删除线     |

```html
<style>
  a {
    /* 去掉下划线 */
    text-decoration: none;
  }
  p {
    /* 下划线 */
    text-decoration: underline;
  }
  div {
    /* 删除线 */
    text-decoration: line-through;
  }
</style>
<body>
  <a href="#">艾编程</a>
  <p>为每个互联网人提供高质量的终身学习平台</p>
  <div>删除线</div>
</body>
```

![image-20220705223416158](https://www.arryblog.com/assets/img/image-20220705223416158.b6104ab8.png)

扩展延伸：

text-decoration 它是以下四个属性的简写

- `text-decoration-line` ：文本修饰的位置，如下划线`underline`，删除线`line-through`
- `text-decoration-color`：文本修饰的颜色
- `text-decoration-style`：文本修饰的样式，如波浪线`wavy`实线`solid`虚线`dashed`
- `text-decoration-thickness`：文本修饰线的粗细

```html
<style>
  .wavy {
    text-decoration: wavy underline red 5px; /*波浪线  下划线  红色 粗细*/
  }
</style>
<body>
  <div class="wavy">艾编程-为每个互联网人提供高质量的终身学习平台</div>
</body>
```

![image-20220705224218275](https://www.arryblog.com/assets/img/image-20220705224218275.2765c3d2.png)

### 2、text-indent 属性 - 首行缩进

首行缩进

- text-indent 属性定义首行文本内容之前的缩进量
- 比如：中文一般文章书写都会 **缩进两个字符**
- 常用单位是`em`，`1em`是一个字符的宽度,`2em`表示 2 个字符的宽度

```html
<style>
  p {
    font-size: 20px;
  }
  p span {
    font-size: 2em; /*相当于 40px*/
  }
  .line2 {
    text-indent: 2em; /*P首行缩进为2个字符大小*/
  }
</style>
<body>
  <p class="line1">
    艾编程，为每个互联网人提供 <span>高质量</span>的终身学习平台
  </p>
  <p class="line2">
    艾编程是在大数据人工智能时代高速发展的今天成立的一家以提供各行业商业项目研发解决方案为核心的在线教育学习平台。
  </p>
</body>
```

![image-20220712120323107](https://www.arryblog.com/assets/img/image-20220712120323107.20d4176d.png)

### 3、line-height 属性 - 行高

行高

- line-height 属性**定义行高**
- 如何测量行高，有很多种方式，比如：从一行文字的最顶部到下一行文字的最顶部之间的距离，就是行高。具体测量方式可以看下图

![image-20211126231413734](https://www.arryblog.com/assets/img/image-20211126231413734.45966ec4.png)

#### 关于行高的最佳实践：

- ①② 是行高测量上的定义，③ 是行高的真实定义
- line-height 属性的单位可以是 px 为单位的数值
- line-height 属性也可以是没有单位的数值，表示**字号的倍数**，这是**最推荐**的写法
- 实际工作中行高：`1.25 , 1.5 , 1.75` 都是常用的倍数设置
- line-height 属性也可以是百分数，表示字号的倍数

#### line-height 行高值的 4 种写法

| 单位         | 实例                  | 说明                                                                                          |
| :----------- | :-------------------- | :-------------------------------------------------------------------------------------------- |
| px           | `line-height:30px;`   | 行高为 30px                                                                                   |
| 数值表示法   | `line-height:2;`      | 行高为 font-size 的倍数，如果`font-size:20px;`则`line-height:2;`表示行高为 40px               |
| 百分比表示法 | `line-height:200%;`   | 行高为 font-size 的百分比，如果`font-size:20px`，则`line-height:40px;`                        |
| normal       | `line-height:normal;` | 取决于用户端。桌面浏览器（包括 Firefox）使用默认值，约为`1.2`，这取决于元素的 `font-family`。 |

[官方详细解读 .......(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)

```html
<style>
  div {
    border: 1px solid red; /*边框线:1像素 实线  红色*/
    font-size: 20px; /*字体大小*/
  }
  .line1 {
    line-height: 30px; /*行高为30px*/
  }
  .line2 {
    line-height: 2; /*行高为字体2倍*/
  }
  .line3 {
    line-height: 200%; /*行高为字体2倍*/
  }
</style>
<body>
  <div class="line1">行高为30px</div>
  <div class="line2">行高为数值2</div>
  <div class="line3">行高为200%</div>
</body>
```

注：

- 推荐在设置 line-height 时使用无单位数值
- 主段落内容的 `line-height` 至少应为 `1.5`
- 如果文字的大小要随页面的缩放而变化，请使用无单位的值，以确保行高也会等比例缩放。

### 4、行文本垂直、水平居中

① 行文本垂直居中

- 设置 **行高 = 盒子高度** ，即可实现单行文本垂直居中

```css
/* 行高 = 盒子高度，即 文本垂直居中 */
line-height: 盒子高度;
```

**② text-align 属性**

- 定义 **行内内容（例如文字、图片、行内块级元素）** 相对它的块父元素的对齐方式

**常用的三个属性值：**

- left 水平居左
- right 水平居右
- center 水平居中

```html
<style>
  div.left {
    text-align: left;
  }
  div.center {
    /* 文本居中对齐 */
    text-align: center;
  }
  div.right {
    text-align: right;
  }
</style>
<body>
  <div class="left">左边</div>
  <div class="center">中间</div>
  <div class="right">右边</div>
</body>
```

![image-20220705233906154](data:image/png;base64,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)

### 5、font 合写属性 - 复合写法



- font 属性可以用来作为 `font-style`，`font-weight` ，`font-size` ，`line-height` 和 `font-family` 属性的合写

```css
/* 
	20px 表示字体大小
	1.5 表示行高
	Arial, "微软雅黑" 表示字体（英文写前边，中文写后边）
*/
font: 20px/1.5 Arial, "微软雅黑";
```

如果同时还需要 倾斜和加粗 （大大的减少代码量）

```css
/* 
	italic 倾斜
	bold 加粗
*/
font: italic bold 20px/1.5 Arial, "微软雅黑";
```

应用场景：（小米，京东 等等 一线互联网企业都这么用）

```html
<style>
  p {
    font: italic bold 30px/1.5 "Times New Roman", "微软雅黑";
  }
</style>

<body>
  <h1>font 合写属性</h1>

  <p>icodingedu , 艾编程企业精神</p>
  <p>付出不亚于任何人的努力</p>
  <p>谦虚戒骄</p>
  <p>天天反省</p>
  <p>活着就要感谢</p>
  <p>积善行、思利他</p>
  <p>不要有感性的烦恼</p>
</body>
```

font 属性连写注意事项

- font 属性连写时，必须设置 font-size 和 font-family 才能生效
- 连写时，行高问题

```html
<style>
  p {
    /* 此行高不生效，因为font连写时，30px/行高 ，这里默认有行高了 */
    /* line-height: 40px; */
    font: bold 30px "宋体";
    /* line-height 写在 font 下边，即可生效，此时 是覆盖了font默认的行高 */
    line-height: 50px;
  }
</style>
```

- font 属性连写时，必须设置 font-size 和 font-family 才能生效

```css
font: bold 30px; /* 这种写法是错的，不会生效 */
```

- `font-style`和`font-weight` 必须在 `font-size` 之前

```css
/* 正确写法 */
font: bold italic 20px/1.5 "宋体";
font: 20px/1.5 "宋体";

/* 错误写法 */
font: italic 20px/1.5 bold;
font: 20px/1.5 bold "宋体";
```

### 6、继承性



关于文字属性的继承性和就近原则

#### ① 祖先元素设置，后代元素即生效

- 文本相关的属性普遍具有继承性，只需要给 **祖先标签** 设置，即可在后代所有标签中生效

```css
color
font-开头的属性
list-开头的属性
text-开头的属性
line-开头的属性
```

- 因为文字相关属性有继承性，所以通常会设置 `<body>`标签的字号、颜色、行高等，这样就能当做整个网页的默认样式了

```html
<style>
  .box {
    font-size: 20px;
    line-height: 1.5;
    font-weight: bold;
    font-family: "宋体";
    text-align: center;
    text-decoration: underline;
    font-style: italic;
    color: skyblue;
  }
</style>

<body>
  <h1>继承性</h1>

  <div class="box">
    <ul>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
    </ul>
  </div>
</body>
```

![image-20211127000019693](https://www.arryblog.com/assets/img/image-20211127000019693.46547df3.png)

#### ② 就近原则

- 在继承的情况下，选择器权重计算失效，而不是就近原则

```html
<style>
  /* （3,0,0） 注意：继承的选择器，权重可以看做是0，权重绝对没有选中的大*/
  #box1 #box2 #box3 {
    color: red;
  }

  /* （0,0,1）p标签是直接选中，权重最高，因此跟继承没关系 */
  p {
    color: skyblue;
  }
</style>

<body>
  <h2>在继承的情况下，选择器权重计算失效，而不是就近原则</h2>

  <div class="box1" id="box1">
    <div class="box2" id="box2">
      <div class="box3" id="box3">
        <p>我是段落标签</p>
      </div>
    </div>
  </div>
</body>
```

- 在继承的情况下，选择器权重计算失效，而是就近原则

```html
<style>
  /* 就近原则，谁描述的近，听谁的 */
  #box1 #box2 {
    color: red;
  }

  /* .box3描述距离p标签更近，所以，当前生效 */
  .box1 .box3 {
    color: green;
  }
</style>

<body>
  <h2>在继承的情况下，选择器权重计算失效，而是就近原则</h2>

  <div class="box1" id="box1">
    <div class="box2" id="box2">
      <div class="box3" id="box3">
        <p>我是段落标签</p>
      </div>
    </div>
  </div>
</body>
```

### 6、word-spacing 字间距



word-spacing 表示字间距，对中文是无效的，仅对英文字单词起作用

| 属性值 | 描述                                        |
| :----- | :------------------------------------------ |
| normal | 正常的单词间距，由当前字体和/或浏览器定义。 |
| 长度   | 通过指定具体的额外间距来增加字体的单词间距  |

```html
<style>
  .f1 {
    word-spacing: 50px; /*英文单词间间距*/
  }
</style>
<body>
  <h3 class="f1">注意观察，汉字与英文之间的显示区别</h3>
  <h3 class="f1">display is different</h3>
</body>
```

![image-20220705235229227](https://www.arryblog.com/assets/img/image-20220705235229227.7f7fdad2.png)

### 7、letter-spacing 字符间距



`letter-spacing` 属性用于设置文本字符的间距表现。

| 属性值 | 描述                                               |
| :----- | :------------------------------------------------- |
| normal | 此间距是按照当前字体的正常间距确定的               |
| 长度   | 指定文字间的间距以替代默认间距。可以是负值 如-10px |

```html
<style>
  .f1 {
    letter-spacing: 30px; /*字简距*/
  }
</style>
<body>
  <h3 class="f1">注意观察，汉字与英文之间的显示区别</h3>
  <h3 class="f1">display is different</h3>
</body>
```

![image-20220705235400370](https://www.arryblog.com/assets/img/image-20220705235400370.7cecc5f6.png)

## 三、列表样式

### 1、list-style-type

- list-style-type 属性设置列表项标记的类型

| 值                   | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| none                 | 无标记。                                                     |
| disc                 | 默认。标记是实心圆。                                         |
| circle               | 标记是空心圆。                                               |
| square               | 标记是实心方块。                                             |
| decimal              | 标记是数字。                                                 |
| decimal-leading-zero | 0 开头的数字标记。(01, 02, 03, 等。)                         |
| lower-alpha          | 小写英文字母 The marker is lower-alpha (a, b, c, d, e, 等。) |
| upper-alpha          | 大写英文字母 The marker is upper-alpha (A, B, C, D, E, 等。) |

最佳实践：

- 标记的类型多在 20 多项，以上只列出了部分，但实际开发中几乎不用。
- 在实际开发中，一般会把前面的标记类型去掉
- 如果需要相关标记类型，用做好的小图标来代替
- 所以我们只需要掌握如何去掉标记就好，去掉标记代码 **`list-style-type:none;`**

```html
<style type="text/css">
  ul {
    list-style-type: none; /*去掉标记*/
  }
</style>
<body>
  <ul>
    <li>前端</li>
    <li>java</li>
    <li>大数据</li>
  </ul>
</body>
```

### 2、list-style-image



用来指定列表中的列表标记图像，几乎不用，了解就好

| 值      | 描述                                             |
| :------ | :----------------------------------------------- |
| *URL*   | 图像的路径。                                     |
| none    | 默认。无图形被显示。                             |
| inherit | 规定应该从父元素继承 list-style-image 属性的值。 |

```css
ul li {
  /* 去掉默认小黑圆点 */
  list-style-type: none;
  list-style-image: url(images/dot.png);
}
```

### 3、list-style-position



规定列表中列表项目标记的位置 ，几乎不用，了解就好

| 值      | 描述                                                                                   |
| :------ | :------------------------------------------------------------------------------------- |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。                                   |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |
| inherit | 规定应该从父元素继承 list-style-position 属性的值。                                    |

```css
ul li {
  border: 1px solid red; /*边框线*/
  list-style-type: none; /*去掉圆点*/
  list-style-position: outside; /*圆点位置*/
  list-style-image: url(images/dot.png); /*圆点图标*/
}
```

| outside 效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | inside 效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image-20220707165017755](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsQAAABzCAIAAAAQZ4MwAAAYrUlEQVR4nO3dcWhT594H8G/SRI5VWera68m1ohkd3BQnTdnAlHd/NMU7TOkLS7Fggi944wazvhdmMmG3nX9ou8Ha7sKunbBrHFxJBEvjH8WUS+npH74kwi6NzNEIK+9R7JbjlJuArj2vyZL3j1Rta9OmTaxTv5+/0nOe8zzP8Z/z83l+z/NostksiIiIiFZL+6w7QERERM83BhNERERUFAYTREREVBQGE0RERFQUBhNERERUFN0ataPRrFFDRERE9JTkWQG6VsFE/h4QERHRcyD/uACnOYiIiKgoDCaIiIioKAwmiIiIqCgMJoiIiKgoDCaIiIioKM80mEgrUk9r88mIuthNdcRb29YnKXmfVsb6XO8H5CVbUM63ajStgani+klERET5FRpMZFMPMtO/ZKZ/yaYelKxx3YxyLRw67nCffyIkuB/pOtYXGxiM3Fg00gCAmUkp8HdP57xnk5Fv+vq+iSTzPZOM+Hr6fFfy3iciIqKVKjSY+PXunQfXv/+/2LX03Z9L17rJeaLPKSoB5xHf5NzrqnTC0X1VdAb8HbuFvA+/d+rMXiXg9AZuPH5QHvZ6h+W8Ach9OXTMG8p/n4iIiFZqmU2rfk38O/XjTfW78dSNyfSd2wB0VVv0O2qEXfX6rdvLKjavpK1kbGw8vvCi2HzQGp2yGW9J0q3HJaNKBVpcLlGWxhYMWhjrG82G2d8m96e9vmFv17mI4xNr3qCDiIiInqZlgonUjzd/GfvnvaELqVtyZnoagLa8XL/NtKmlbUPjOysMJmJBW1Pn4rcizeeevNjZPPTkxa5wtsOSTM6OLexw9F+2G3ca1WRSBQTDk+WJiIjo6VommFC/G783dCE1dTOjzn6+M6qamrp5b+hC2atVwk7LStqyehKJ9tV29CHBACXwvtE18OQth/9WPwBc7nL90Td7LT4BoOu/mny5F03HJ4CGYvtAREREj+UNJrKpB+m7P6duTKZuyRlVRSYzeyOTycxMp27JqRuT6fiPZZVVGv26AhsTDIZVTkaoyaQKYaNB0AEQHV8nEl8vWj+ie3t735p7zW6f+1diPDEWW10XiIiIaFFLBBOp9E9T6Tu3c7Mb82Qymenp9J3b6fiU9hVD4cEEANyNSdeeSJx4ZFNtw5vikwGHctFtdAa7ItmO3cCTQUlaVSEIOgCwHvRYl2hdVWx73Hid0yFEREQls9Q0h2a5c8OzqzgIdDLYZMuTOAFgnz9+wSkCuNKtsXY6AvHB/eKTpZThzvYe1R3stRsAIDnsrfjPcG903FO3XOuCaGlcpEIiIiJatbxLQzV6vc5Yravaoi0vh3Z+Ma1WW16uq9qi+321Rq9fRasdocQTJs68W+jj4iYEx/zRh6tJE8k4YDaJkW5N4biTFRERUWnkHZnQ6NfpjFv1O2r020ypqZuZmenZtAmtVru+XF+9Xb+jRm+sXl2r6ysMhoVTDer6ZZJB56ipd6J7PCbjTRMA5YcgxC6TaDZLowvmOGLnmo584+gNtVsWzp1U1FaupudERES0wDIfcGFX/aaWtnlLQwVBX719U0ubsKt+1a3KUUmaWXAtOZEECkxmEE31dfD+oAAmQJGvA2+bjDCIjTbz/Hbkz4B3Wx17baZV95WIiIiWtEwwod+6fUPjO2WvVi26adWqW/UdbvItemNfgRWYLXuAKxMyrCbI8gDET82LpEIkY9ERWL4wM5IgIiJ6epYJJsoqNpdVbBZ2WlLxqfRPUxqNRmes1hm3FtlqRyjhXbjoIj74p9pDhVYgmF63oScmqzAl4xOArcYIQDnfanQGF5Y9Wq85uuBSVzjbsdSiDyIiIipYoXkKusrflb1SAWB1GZcLFJszARh3WICoPAUkYxLEI6ZHAxO2jgsdtkokx7pbT2LOb9MpyWkGYuebjvy9+DcgIiKiWYV+wDX6dSvbT2JJM4lkcuHJnYmZdOHdgWAy29AXk1UlOaGg1VLz6I6h1mqzVUNR+gHM+W2qb7RZgfX/U6J3ICIiIgAr+HqXVLe9onvRG4XmTACVtc6zg/VmxAdiqHMZuQ0VERHRM/JsgomicyYAg9V9EEAy9EMUVi+uBH0xYz1PDiUiIlpzzyaYWD5nosYxKlkrFt/3Wk0m43I0Fvs+HL4ckS4Diqv+NPCuP1z4wAYRERGVyLMJJpZXabY1mhe/pYa7Kpr6cr9rrLa9nvY9tnpLvaVGTA4Mrl0PiYiICMBvKZiIx38AXn/8t5pUhdx5XmlZGg4D4mxnhfrWf/htr1vq/2ASV3sKKREREZXKMw4m1JHO5p4IANyTpauA9XF0EP1ifcPJOUXFDuvO3C+D9YBz2ZoFk733c5g2AgA2mmx7cOnYa55/CfIYIIIxCBERUak842BCMNWaEJEBbDLZDro7jtkfZUmY3vLY9kRzvw01jvbj7baVhACG3W7P7tnfYkvvaAuUoUTkarR2T4P3RLulZG9ARET0stOs5hjx1bSjQa6htJq8rwobDcJvZ4KFiIiIlvXoU/7knbUOJoiIiOh5lP9Trl3jnhAREdELZg0nGzSatWuLiIiI1gpHJoiIiKgoazgywZwJIiKi51f+GQaOTBAREVFRGEwQERFRURhMEBERUVEYTBAREVFRGEwQERFRURhMEBERUVEKDSayqQeZ6V8y079kUw+KaU+90tf8urH2/aBcTC1ERET0m1FoMPHr3TsPrn//f7Fr6bs/F9NedMQbmlRif/dHpoqphoiIiH4rltm06tfEv1M/3lS/G0/dmEzfuQ1AV7VFv6NG2FWv37q9rGLzStuztJxyXw4m3m63V6+yx0RERPSbssypoer30V/G/nlv6ELqlpyZngagLS/XbzNtamnb0PiOsNNScDs8NZSIiOh5tupTQ9Xvxu8NXUhN3cyoau5KRlVTUzfvDV1QvxsvcS+JiIjoOZR3miObepC++3PqxmTqlpxRVWQyszcymczMdOqWnLoxmY7/WFZZpdGvK1Vv1GQyF7MIGw1CkceG3E8m0wAAncGwsdiOERERUT55RyayqVT6p6n0nduZ6enHkUROJpOZnk7fuZ2OT2VTqRW1p5xv1Wg0mraAMvdqMhY86ao1atZXzFqvf635WFBOPyxwta9eo9FoWgOLpG0mQ4c1Go2mvic6W9fFbtcbRs2mh3Vt0rxm9wZvrKibREREVKil/vuvyX8+WM7S+RaFi/yttvU4xJ029wG7uQoJWQqcDoV6WhvuX4p9ZTcAqLO56hC9Ghy8rDj3i/MevisFTwOwuPZYAOBKf62jE6LZdtBlNxtxT5bO94eG+1qt6qVrp+yVJekvERERPZZ3ZEKj1+uM1bqqLdrycmjnF9NqteXluqotut9Xa/T6EvRCcPRK8fi10TOfezwfebq+ujRxucMCKKf7BydzJSyOP9sBBM9dWrBBRfJyyAdgb7uj7mFdn4/Gb02Mnu31fOTxnDh1KRruqAOU/v4h7m1BRERUeksEE+t0xq36HTX6bSbt+jnxhFarXV+u32bS76jRG6tLkjBh/WjQ0zhvvEH4D3f7HgChaCyZu2J622EHMByUJucWVELnfQDc77Wachd2ewY/solzB1w2Wt2HbQBC3z6si4iIiEpnmdUcwq76TS1t+urtWkGYfUAQ9NXbN7W0Cbvqn2K/7qvYCADx+7OrSFDT6j4IIBS8PGeAYUoaHADEDudeQ96q0qoKAwDcTap5CxEREdEqLbNkQr91+4bGd8perVp006pSdkSJBoel8OVQ9EZ8YiymLFLCYGtx4xtfaECSD7pz4xDyiD8IiIebbcKcgmklOnRJikRCV+X4NWnRuoiIiKhUlgkmyio2l1VsFnZaUvGp9E9TGo1GZ6zWGbeWtA9q9K+t9qMhBQBEc2Nt7UG71yyMB7oDV+eVM+x1doi+7uGgNOl21wCQpYEQYPG2WB/XdbWvda93tq6dtto33PajZuGav/tctKR9JiIiolmFbuagq/xd2SsVAEqTcTlHcshrPxpSRHtXwOdpFB8OMSiBbxcGExAabAfF7s9CgTHZXWPCpBQYnpt6CdwNefd6Q4po/9Tv+9D2uK7zYQYTRERET0mhB31p9Ou05Ru05RtKuEUVAECRBvoVwHbiVMfjSCIfwdbmtQDSgCQD0aF+aW7qJaCM+fsVYE/XqY9ty9ZFREREJVFoMPH05Pbptuwwzrt6NywNLFa6zuaqA0YC0mRU+kcU8MxLvUyrAFBnml9XMjwSLG2fiYiI6JFnH0zklon4R6TH6zbTcuBou2/x4rkNJ6TQ2cHwVYgf2xvmjkDoBAA4F5pTF+Rz7e3flL7bRERElPPMgwnRtq9dBJSe5nr7kc6evr7jR5rNr3lwpOPdxR/IbTgR/Kw7CIu3bd4yDrHR1S4CSl/zW81Hjvf19XQesb/22jEc+cSxJu9CRET0MnrmwQQMLb3SWbdZhDzc333M6z05qLb4pa/ctflyQ2c3nJifeplTae8dO+PeKWIy1H/S6z3WPag6/GM+t/npvgIREdHLTFOq8zWWa2f2EHTlfKvRGcQ+f/yCc96el2k1eVeWkxWmarH4Qz7VpCLfSFTsMIkG5mESERGVwsNP+ZOKPOd7xWbuJwHgDZO44IZOMIhmy8KrqyQYRHNdieoiIiKiJa3xNIcsXZQAtNdx4oGIiOgFsQbBhJq8O/tLPtfZOQyIHkdj/qM0iIiI6LmyBtMc0f4qhx8wvmGUvlcA0fml11Z0VgQRERH9RqzByIQg7EQMkL5XTHvbT12O+fcxm4GIiOjFsXarOVSAKyuIiIieY3lihjVcGkpERETPtWe/NHRtohYiIiJ6GvKPCzz7HTCJiIjoucZggoiIiIrCYIKIiIiKwmCCiIiIisJggoiIiIryGwomon9ravpjk3dIWfGTk6G+nj7fleRi9+TAn5paDwflpZ5XQkebmo6GVt4wERERFbw0NJt6kE2lAGj0eo1+3dPoipqUpBEYDhZUWL7o7bze6vvYKgC4G/Ue63QEXO7dACCfP3TkW/upzx0mHZCMhb+Rgh94fEvWlpySJLgf1R3qCcYK6URlg/uglaeMEBHRS67QYOLXu3fS8alsNqv7fbXeWP1U+1QAVfk+HDjux46wf79p3o0r3S6nTz5gm32z69FBwGE1r+STr0SPeTsLKbjP7zpoXUHFREREL6JlgolfE/9O/XhT/W48dWMyfec2AF3VFv2OGmFXvX7r9rKKzSXvkFBQeCNYP+nvDdV7nd7mtwedjy7fj3R90BnZ3RX+ypkLMaKRQQU2u9WUr6K89vnjF5z5DxFRAm1G14orJSIiegEt8+lO/Xjzl7F/3hu6kLolZ6anAWjLy/XbTJta2jY0vvM0gonabQUeA2bxnBvENYuzGph6dNFQ2+jx/7nDOnsqqTw+HAXc6i1JurXgcWN9o0n9V3jiHoDkRBLARHhMMgDGN9aX4j2IiIheFssEE+p34/eGLqSmbmZUNXclo6qpqZv3hi6UvVol7LQ8/R4uInldGo8DMFgMsjQm47oMIBkLS6JBbLFDliTZWN9oNlwN9o8A8B2xPZky0RXOuuXPm1wDj650t450A+iKhNfqPYiIiF4EeYOJbOpB+u7PqRuTqVtyRlWRyczeyGQyM9OpW3LqxmQ6/mNZZVXB+ZiqMjsSsLjYLQCQo5I0k7+OTbUNb4qxgaam4wvvSCdbpZOP/uoKZz0zF3qjsJ+K+l07Hl6O9FbYux1fT/j2mQyA6djo6AcAktJnrd3oGPzYZgCMNQgCGHAZNcvNY+xb5j4REdHLYIlgIpX+aSp953ZudmOeTCYzPZ2+czsdn9K+Yig4mEhK80YCFuc73LTUyot9/vgFp/XDROK/Zy8kIr0ue3cEcHw93t9iEmaPORcMU8HWzxRAqKg0GB6mX6o6FYBgqDAYBADimzYRABTlNIDahsbcnxEAqHN2OOsr8vYjMR7oDizzKkRERC+FpaY5NMudG77C48sNttmRgEUlpc9au0fg/nLUuTN/HZtqDQA2zoYH8sUjLkc/dltxJSKfbbecre/7ptf5BwFQpU89QQCQ43eBh6tP4oqMAtMyXm8+8tHcBMxcxuXjrEz1PW8/BK4LJSIiyhtMaPR6nbFaV7VFW14+b5oDgFarFQRd1Rbd76s1en3BbQkPRwIWJSt/AwBZMNkaC1h8kZaDxw61/1UyfTwaskcq3o6Y9rQ2jHhd5vFw0N+7LeDtUcTdVuOViHwribrZj77yQxBwmEqxslXIDW4QERG99JYIJtbpjFv1O2r020ypqZuZmenZeEKr1a4v11dv1++oKeWGE6o8fhEApJGI8p5p6aEDZayv/X1vcNLkPjtx6qBZuBIBALPr1DG75c/NhxwN8lc+70G38GeHZGkOT8pALlFUnrgCiPXmfL1Oq/K/Yut3AwB+uHSqJz5nmiMx/gOABRcBmB0f2Ve+8JSIiOjFscxqDmFX/aaWtnlLQwVBX719U0ubsKu+hP1QI5I/92vAf2nS6a5Zoqx8qccbrGz3X+xy7jQgDegMtj0200Zgo9l9dtxk9q8/YLd+YAfkxB70D4/LH1pMAJKx6AjwgWXht19NzKSBiMeidynwjM60AsDVQPfVJ5MinrzY1cBggoiIXm7LBBP6rds3NL5T9mrVoptWla4banjEp8DSe6FdajsUHJPdNUt8oE3uf8SbDaKoA6BKfzG5hl2+sVF7Ze6uwfZR+6OStW+LOB6UJt3uGqjfSv2A4+362TkPVZHO9wbOhS6NxXKnclS0tHv3t9bmMjBPhLOfzN3dcmHOBBEREeUsE0yUVWwuq9gs7LSk4lPpn6Y0Go3OWK0zbi1xL6aC/Z8pqPPa9tkMe3HoeL+0v9e2MV/pZOzaRBwTEwAUqbNHUfYZcU2S5pQwvmEzVwKA5T/cIrqDl2V3TYV0sQ+w2996GAwIcuRPfT7AtNdpjwdCr/dJs4FCZImlqURERLRAoWdz6Cp/V/ZKBYCVZFwWSJW+9AQB93G3BQbzh57OP/Z1/rVV+sSaJ8MxFrQ1zTs7Y8DbPH/FaVck21EJAEJj8xGxu/PLQOQtsf80sNdhezyBYrIFRyfetpkrlUBbIPTo8pQcA2wiByCIiIgKUugR5Br9Om35Bm35hpIfGZoc8rp6FOzubX/XAEDY0961F5Hjnr4rap4nrJ5EIpFIjH9lB0TnPyYSc4x+YgbsYuXjwvZjVlztbD/QHwLc77XOmT4Rre/ODmDMo8hhwCxWRE5q5jC6BnI7Wc3RFuCp5URERIWOTDwl6nVf+/v9Cqxdf2t/uDW3yf1pr2/Y2/luqzA86KlbZHhCMBiEuyHfiRD2+fsOzDkRdNLXdzJmOeFzzcnftBzobP+8uf9q9FG8sjQ5Nq7AYtpmwFUA9vbPbYulb8jSsf7QIteJiIheOs8ymFCv+9yNhwKK6Az4O96cEzTUefyB8QZnwLu3FUN+z5uLRADKt2F5IzDQ6T6c8PzFbasWcD/SfeBQSPSMfjh/fkSoMIiAAmwzFrDHVDIWCQIdDXXAEIAG10eexU4Zj6gMJoiIiAAUPs1RcvLFIzbzoYAC64mgb//C//yb9vuCJ6xQQt636lt7IsknHhf3dl2KJcYDDowcadq2/rW2I4f2NHTesHVd7JqXuXk/5jvs6L4KURQx4HKdjOSbO5mVDIdOAx80mIt+QSIiopfEswgmkrHA0aYGR38Eov2L8TyJloL1E2n8C7sIOXiswfyGq29MWRgH6AyW/b2Xrk2cOWCWB/p9V4AdJsNM8nGx+zHfYduhc4p4wB+O9DtFRI432P4iPRmaPKIM+/qB9r0N3CebiIioUNm1kWsoFQ+f9cxuqS3aOkLxZZ+Lhzoeb8FdY2//cjSeengvlZgI9Tp3igDElq4zX7pzJcWdXeGZbPbOaEejCEA8cGbiXjabzWZlf27pp9jSNZprOVdV4pJHBPb54/fCHXVAXVd4JpvNZsMnlvu32+df/gWIiIheDPljhjXMmUhH+/5Y7x0DANO+3jNfepY4qOMRcW/XaMwV+NTb2ROSJ8cTlSZRl4xdHPSPBAOnQzKAGkev1N/eKAqA+0BH6O9en8FhinQ3OztDCkwH/aNfO025t9zh9Eewfo/LN9TZZAmfueyrOGFsPTfbkMVqjp9u774KR8A9Z6iECZhERETLWdNwRvY7dzp6pVX9f/7O+KXL/5vNZrPZ8d7dAETz/i5/JD6zSNGZ8S/sIkT7F+OJJ28mxk/tM1k/HZ/JZse/tNn22Gx7bO4TgxP3slnZ73z3zP8+LBg+AaArvHhvwl3gyAQREb1M8scMmuzKjhFfLY0GpWtIVWTVYFry1E5VmVLFamY+EBERlUj+T/lzGUwQERHRWsv/KX9mS0OJiIjoxbCGCZgazdq1RURERGtlrYIJznEQERG9oDjNQUREREVhMEFERERFYTBBRERERWEwQUREREVhMEFERERFYTBBRERERfl/pr2XIXoxEskAAAAASUVORK5CYII=) | ![image-20220707164959603](data:image/png;base64,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) |

### 4、list-style



- list-style 是 list-style-type 、 list-type-position 、list-style-image 的三个的综合写法。
- 但在实际开发中，用的最多的是 `list-style:none;` 和 `list-style-type:none`用来去掉标记。

## 四、应用实践



将所学 CSS 文本样式属性用于实践

### 1、单行文本水平垂直居中

```html
<style>
  .box {
    width: 200px; /*宽 200px*/
    height: 50px; /*宽 50px*/
    border: 1px solid red; /*边框线：1像素  实线 红色;*/
    text-align: center; /*文字水平居中*/
    line-height: 50px; /*文字垂直居中*/
  }
</style>
<body>
  <div class="box">单行文本水平垂直居中</div>
</body>
```

![image-20220706162520448](data:image/png;base64,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)

### 2、设置中英文混合间距

把 word-spacing 与 letter-spacing 两者结合使用

```html
<style>
  h3 {
    word-spacing: 20px; /*英文单词间距*/
  }
  h3 span {
    letter-spacing: 20px; /*span标签中汉字间距*/
  }
</style>
<body>
  <h3>I love you<span>&nbsp;我的宝贝！</span></h3>
</body>
```

![image-20220706163237578](data:image/png;base64,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)

### 3、新闻排版

- 效果图如下：

![image-20220712173453394](https://www.arryblog.com/assets/img/image-20220712173453394.fa95fdcc.png)

```html
<style>
  h1 {
    font-size: 30px;
    text-align: center;
  }
  .desc {
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  .desc span {
    color: red;
    background-color: #ddd;
  }
  .desc a {
    text-decoration: none;
    color: red;
  }
  p {
    text-indent: 2em;
    line-height: 2;
  }
  .img {
    text-indent: 0;
    text-align: center;
  }
</style>
<body>
  <h1>首个国产新冠特效药上市后首批抵深</h1>
  <p class="desc">
    <span>原创</span> 2022-07-12 09:57 · <a href="">南方日报</a>
  </p>
  <p>
    7月11日,新冠中和抗体安巴韦单抗和罗米司韦单抗联合疗法药品运抵深圳市第三人民医院
  </p>
  <p class="img"><img src="images/pic.jpg" alt="" /></p>
  <p>
    南方日报讯
    （记者/黄思华）7月11日，新冠中和抗体安巴韦单抗和罗米司韦单抗联合疗法药品交接仪式在深圳市第三人民医院举行。这是国产新冠特效药商业化上市后向市场供应的首批药物，共计100人份，每1人份的联合疗法是由安巴韦单抗1000毫克和罗米司韦单抗1000毫克组成，
    全程在2—8℃冷链环境下储存。
  </p>
  <p>南方日报记者 朱洪波 摄</p>
</body>
```