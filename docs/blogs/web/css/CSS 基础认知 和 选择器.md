# CSS 基础认知 和 选择器

从本节开始，我们来学习 CSS 样式。首先我们来了解下什么是 CSS 和 CSS3 ！

## 一、CSS/CSS3 基础认知

CSS、CSS3 简介，基础语法，CSS 样式的两种书写方式，CSS 注释，CSS 的 4 种书写位置，优先级

### 1、CSS 简介

CSS（Cascading Style Sheets）层叠样式表

- 用来给 HTML 标签`添加样式`的标记语言
- 他可以设置 HTML 页面中`文字大小`，`颜色`，`对齐方式`及元素的`宽高`，`位置`等样式。

**CSS 与 CSS3 是什么关系 ？**

- CSS3 是 CSS 的最新版本，增加了大量的样式、动画、3D 特效和移动端特性等等

![image-20211124002228431](https://www.arryblog.com/assets/img/image-20211124002228431.c7b0057a.png)

**Web 前端三大核心基础，俗称 “前端三层”**

| 分层   | 语言       | 功能                                          | 描述 |
| :----- | :--------- | :-------------------------------------------- | :--- |
| 结构层 | HTML       | 搭建结构、放置部件、描述语义（HTML 负责结构） | 骨骼 |
| 样式层 | CSS        | 美化页面、实现布局（CSS 样式负责样式）        | 皮肤 |
| 行为层 | JavaScript | 实现交互效果、数据收发、表单验证等等          | 神经 |

> **选择器** 作为 HTML 和 CSS 两者的 **纽带** ，即可将两者结合起来

CSS 样式的本质

- CSS 就是样式的 `清单`，要书写合适的选择器，然后把指定元素的样式 `一条一条的罗列`出来
- CSS 没有加减乘除、与或非、循环、选择、判断，CSS 不是编程，就是简单直接的罗列样式
- 熟记 CSS 属性是非常重要的，样式和属性的熟练程度绝对了开发网页速度

### 2、CSS 的基本语法

假设我现在要通过 CSS 样式来控制 h1 标签文字的颜色和大小，那该如何书写 CSS 样式呢？

我们来学习下**CSS 规则集**

![css](https://www.arryblog.com/assets/img/css.1d711872.png)

- CSS 规则集由两个主要的部分构成：**选择器**和**声明块**组成；
- 选择器：选择器指向需要改变样式的 HTML 元素，通过选择器，我们知道是给那个元素添加样式
- 声明块：包含一条或多条声明，每条声明用分号**`;`**结束，声明大括号`{}`括起来；
- 每条声明都包含一个 CSS 属性名称和一个值，以冒号分隔。

```css
/* 换行的写法 */
h1 {
  color: skyblue;
  font-size: 30px;
}
p {
  background-color: black;
  color: aliceblue;
}

/* 

不换行写法 

h1 {color: skyblue;font-size: 30px;}
p {background-color: black;color: aliceblue;}

*/
```

注：

最后一条样式（声明）可以不写 `;` 为了保证统一标准，建议还是书写完整

### 3、CSS 样式的两种书写方式

- **方式一**：每行只描述一个属性，每一条声明与选择器之间会有一个 tab 的间距。（或更多间距也不会有问题，但不建议）

```css
p {
  color: red;
  font-size: 14px;
}
/* 在VSCode上安装：prettier 格式化代码插件，ctrl+s 保存代码时，会自动帮我们格式化代码 */
```

- **方式二**：CSS 中的样式声明，直接写在一行

```css
/* 样式声明写在一行 */

/*
  p {font-size: 14px;color: red;} 
*/
```

以上两种方式都可以，不过第一种方式更方便阅读和后期修改，则我们约定后期以第一种方式来书写 CSS 样式。

**注：**

在实际项目开发完成上线时，我们会把 CSS 样式进行代码压缩，压缩后就其实就是第二种样式的写法。

### 4、CSS 注释

- 注释只是给自己或其他开发者查看的，网页中不显示
- 提高代码阅读性
- Vscode 快捷键 `Ctrl + /` 即可 快速输入

```css
/* 这里书写注释内容 */

/* h1 标签的样式*/
h1 {
  /* 设置文字的颜色值 */
  color: skyblue;
  /* 设置文字的大小 */
  font-size: 30px;
}
```

这里要注意区分之前讲的 HTML 注释，HTML 注释内容写在 HTML 标签中，并使用 `<!-- 注释内容 -->`

```html
<body>
  <!--html的注释-->
</body>
```

### 5、CSS 的书写位置

CSS 样式的书写位置一共有 4 种

#### 方式一：内嵌样式

又俗称：“内部样式”

- 内嵌在 HTML 文件中
- 在 `<head></head>`标签对中写 `<style type="text/css"></style>` 标签对，然后在里边书写 CSS 语句
- `style` ：为样式风格的意思
- `type` ：类型，当前样式的类型是 `text/css`
- 在 HTML5 中，type 属性变为可选，我们经常在项目看到会直接使用 `<style></style>`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS基础入门 - arry老师</title>

    <!-- 内嵌样式 -->
    <style>
      /* h1 标签 */
      h1 {
        color: skyblue;
        font-size: 30px;
      }
      p {
        background-color: black;
        color: aliceblue;
      }
    </style>
  </head>
  <body>
    <h1>CSS基础入门</h1>

    <p>CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明</p>
  </body>
</html>
```

#### 方式二：外链样式

又俗称：“外部样式”

- 将 CSS 单独存为 `.css` 文件，然后使用 `<link>`标签引入到页面中
- 优点：多个 HTML 网页，可以共用一个 CSS 样式表文件

```html
<!-- 
    rel ：关系
    stylesheet ：样式表
    href ：路径和文件名
   -->
<link rel="stylesheet" href="css/index.css" />
```

#### 方式三：导入式样式

导入式是最不常见的样式表导入方法

- 使用导入式的样式表，不会等待 CSS 文件加载完毕，而是会立即渲染 HTML 结构 。这样，网页就会呈现出没有 CSS 裸奔现象
- 实际开发中几乎不用（只做了解）

```html
<!-- 导入式样式 -->
<style>
  @import url(css/index.css);
</style>
```

#### 方式四：行内样式

样式写在 HTML 标签的 `style`属性上

- 行内样式只能作用于当前标签上，不具有通用性
- 这种写法样式和结构混为一起，通常配合 JS 使用
- 优先级最高

```html
<h2 style="color:skyblue">行内样式</h2>
```

总结：

企业开项目发中，常用的样式有 `内嵌式`和`外链式` ，其他不常用

### 6、CSS 样式的优先级

- 行内样式优先级最高
- 内联样式和外部样式在书写时，样式发生冲突，在优先级相同的情况下，以写在后面的为主，如果不相同，则以优先级高的为主。

**如下案例所示：**

`basic.css` 创建外部连接样式文件，代码如下

```css
div {
  color: red;
}
```

`index.html`代码如下

```html
<head>
  <link rel="stylesheet" href="basic.css" />
  <style>
    div {
      color: blue;
    }
  </style>
</head>
<body>
  <div style="color: green">我是div</div>
  <!-- 按CSS优先级判断，该文字为 green 绿色 -->
</body>

<!--
	以上代码解读：
	- 默认以上文字的颜色为 green 绿色
	- 去掉 style="color: green"文字颜色为 blue 蓝色
	- 去掉 style="color: green"把link与style标签互换位置，文字颜色为 red 红色
-->
```

### 7、总结：CSS4 种书写位置特点与区别

| 引入方式   | 书写位置                                                            | 作用范围     | 优先级                             | 使用场景                                                           |
| :--------- | :------------------------------------------------------------------ | :----------- | :--------------------------------- | :----------------------------------------------------------------- |
| 内嵌样式   | 写在`<style>`标签中                                                 | 当前页面     | 由书写位置和选择器优先级来共同决定 | 小案例 对网站首页首次打开速度要求很高的网页需要 如：百度、腾讯首页 |
| 行内样式   | css 样式写在标签的 style 属性中                                     | 当前标签     | 最高                               | 配合 JS 或特殊需求                                                 |
| 外链样式   | css 样式写在单独 css 文件中，通过 link 标签引入                     | 多个页面     | 由书写位置和选择器优先级来共同决定 | 项目开发中高频使用                                                 |
| 导入式样式 | 把@import 放在`style`标签中或 CSS 文件中，用于导入外部 CSS 样式文件 | 被导入的页面 | 最低                               | 项目开发中几乎不用（用作了解即可）                                 |

## 二、CSS 选择器

传统 CSS2.1 选择器和 CSS3 新增选择器

### 1、选择器分类

- 传统 CSS2.1 选择器
  - 标签选择器和 id 选择器
  - class（类）选择器
  - 复合选择器
  - 伪类
- CSS3 新增选择器
  - 元素关系选择器
  - 序号选择器
  - 属性选择器
  - CSS3 新增伪类
  - 伪元素
- 层叠性和选择器权重计算

### 2、标签选择器

标签选择器称之为：元素选择器、类型选择器

- 他直接使用元素的标签名当做选择器，将选择页面上所有该种标签
- 标签选择器将选择页面上所有该种标签，无论标签所处位置的深浅

```css
/* 选中当前页面上所有的 h2标签和p标签 */
h2 {
  color: skyblue;
  font-size: 30px;
}
p {
  background-color: black;
  color: aliceblue;
}
```

**标签选择器的作用：**

- 标签选择器的 "覆盖面" 非常大，通常用于标签样式的初始化

```css
ul {
  /* 去掉无序列表的小圆点 */
  list-style: none;
}
a {
  /* 去掉超级链接的下划线 */
  text-decoration: none;
}
```

### 3、id 选择器

id 选择器是使用 HTML 元素的 id 属性来选择特定元素

- 元素的 id 在页面中是唯一的，因此 id 选择器用于选择一个唯一的元素
- 要选择具有特定 id 的元素，请写一个井号（＃），后跟该元素的 id。
- id 的名称只能由 字母、数字、下划线、短横线 构成，不能以数字开头，字母区分大小写，但习惯上一般为 小写字母
- 名称最好是：见名知意，多一个英文单词之间用 `-`分隔

```html
<style>
  #desc {
    background-color: black;
    color: aliceblue;
    font-size: 20px;
  }
</style>

<body>
  <p id="desc">定义一个id属性</p>
</body>
```

### 4、class 选择器

class 属性表示 "类名"

- 类名的命名规范和 id 选择器相同
- 类选择器是以 `.`前缀开头的，并指向 class 的标签
- 多个标签可以定义相同的类名

```html
<style>
  .desc {
    font-size: 30px;
    color: skyblue;
  }
</style>

<body>
  <p class="desc">定一个class属性</p>
  <div class="desc">我是一个div标签</div>
</body>
```

- 同一个标签可以同时属于多个类，类名用空格隔开

```html
<style>
  .desc {
    font-size: 30px;
    color: skyblue;
  }

  .para {
    background-color: beige;
  }
</style>

<body>
  <!-- 同时属于两个类 -->
  <p class="desc para">定一个class属性</p>
</body>
```

原子类

- 在网页项目前，可以将所有的常用字号、文字、颜色、行高、外边距、内边距等等都设置为单独的类
- HTML 标签就可以 “按需选择” 它的类名了，这样就可以快速添加一些常见的样式
- 应用场景：组件化开发

具体实现方法如下：

```html
<style>
  .fs12 {
    font-size: 12px;
  }
  .fs14 {
    font-size: 14px;
  }
  .fs16 {
    font-size: 16px;
  }
  .fs18 {
    font-size: 18px;
  }
  .fs20 {
    font-size: 20px;
  }
  .fs22 {
    font-size: 22px;
  }

  .color-red {
    color: red;
  }
  .color-black {
    color: black;
  }
  .color-green {
    color: green;
  }
  .color-blue {
    color: blue;
  }
</style>

<body>
  <h2 class="fs22 color-red">原子类</h2>

  <p class="fs18 color-green">
    在网页项目前，可以将所有的常用字号、文字、颜色、行高、外边距、内边距等等都设置为单独的类
  </p>
  <p class="fs14 color-blue">
    HTML标签就可以 “按需选择” 它的类名了，这样就可以快速添加一些常见的样式
  </p>
</body>
```

### 5、\* 通配符选择器

- 代表页面当中所有的元素

- 基本不用，对性能消耗过大

```css
* {
  color: red;
} /* 页面当中所有元素的字体颜色为红色 */
```

### 6、复合选择器

| 选择器名称 | 示例         | 描述                                           |
| :--------- | :----------- | :--------------------------------------------- |
| 后代选择器 | `.box .para` | 选择类名为 box 的标签内部的 类名为 para 的标签 |
| 交集选择器 | `li.para`    | 选择既是 li 标签，也属于 para 类的标签         |
| 并集选择器 | `ul,ol`      | 选择所有 ul 和 ol 标签                         |

#### 后代选择器

- 在 CSS 中，使用 `空格`表示 “后代”
- 后代 并不一定是 “儿子”
- 后代选择器可以有很多空格，隔开好几代

```html
<style>
  /* .box p 这种新式的选择器，称之为 “后代选择器” */
  .box p {
    color: skyblue;
    font-size: 20px;
  }
  /* 多个空格形式 */
  .box ul li p a {
    color: red;
  }
</style>

<body>
  <div class="box">
    <p>我是div中的段落标签</p>
    <p>我是div中的段落标签</p>
    <ul>
      <li>
        <p>
          我是 ul li 中的
          <a href="#">p标签</a>
        </p>
      </li>
    </ul>
  </div>
</body>
```

#### 交集选择器

- 如：选择有 .box 类的 h2 标签，此时应该使用 交集选择器

```html
<style>
  h2.box {
    color: skyblue;
    font-size: 30px;
  }
</style>

<body>
  <h2 class="box">交集选择器</h2>
</body>
```

#### 并集选择器

- 并集选择器也叫作 `分组选择器`，逗号表示分组

```css
ul,
ol,
p {
  font-size: 12px;
  color: red;
}
```

#### 复合选择器

- 选择器可以任何搭配、结合，从而形成复合选择器。我们必须要能一目了然的看出选择器代表的含义

```css
div.box ul li p.para span {
  color: green;
}
```

### 7、伪类

伪类是添加到选择器的描述性词语，指定要选择的元素的特殊状态

**超链接拥有 4 个特殊状态**

| 伪类        | 描述                                             |
| :---------- | :----------------------------------------------- |
| `a:link`    | 没有被访问的超级链接                             |
| `a:visited` | 已经被访问过的超级链接                           |
| `a:hover`   | 正被鼠标悬停的超级链接                           |
| `a:active`  | 正被激活的超级链接（按下按键，但还没有松开按键） |

**爱恨准则**

- a 标签的伪类书写，按照 “爱恨准则” 的顺序，否则会与伪类不生效
- LOVE HATE
- :link -> :visited -> :hover -> :active

```html
  <style>

    /*
      顺序不能乱 ，爱恨准则 LOVE HATE
      :link  -> :visited -> :hover -> :active
    */

    a:link {
      color:red;
    }
    a:visited {
      color:blue;
    }
    a:hover {
      color: green;
    }
    a:active {
      color:yellow;
    }

  </style>

</head>
<body>

<h1>伪类</h1>

<p>
  <a href="https://www.icodingedu.com">艾编程</a>
</p>

<p>
  <a href="https://baidu.com">百度一下，你就知道 ！</a>
</p>

</body>
```

注：

- 遵守了 “爱恨原则” ，但 a:link 不生效，是因为之前访问过的网址会被浏览器记录，就会显示 a:visited 的样式（修改网址或清楚浏览记录即可）
- 四个样式可以根据实际情况单独使用
- 伪类`:hover` 不仅可以用在 a 标签上，还可以用在其他标签上，比如：div、p、列表标签，标题标签 等等

### 8、元素关系选择器

| 名称           | 举例     | 描述                           |
| :------------- | :------- | :----------------------------- |
| 子选择器       | `div>p`  | div 的子标签 p                 |
| 相邻兄弟选择器 | `img+p`  | 图片后面紧跟着的段落将被选中   |
| 通用兄弟选择器 | `p~span` | p 元素之后的所有同级 span 元素 |

#### 子选择器

- 当使用 `>`符号分隔两个元素时，它只会匹配那些作为第一个元素的直接后代元素，即：`两个标签为父子关系`
- 后代选择器：不一定限制是子元素
- 从 IE7 开始兼容

```html
<style>
  /* 子选择器 ：两个标签为 父子元素 */
  .box > p {
    color: red;
  }

  /* 后代选择器：不一定限制是子元素 */
  .box p {
    color: skyblue;
  }
</style>

<body>
  <h1>元素关系选择器</h1>
  <h2>子选择器</h2>

  <div class="box">
    <p>我是div的子元素，也是一个段落标签</p>
    <ul>
      <li>
        <p>我是一个段落标签</p>
      </li>
      <li>
        <p>我是一个段落标签</p>
      </li>
    </ul>
  </div>
</body>
```

#### 相邻兄弟选择器

- 相邻兄弟选择器（+）基于两个选择器之间，当第二个元素紧跟在第一个元素之后，并且两个元素都属于同一个父元素的子元素，则第二个元素将被选中
- a + b 即 选择 紧跟在 a 后面的第一个 b
- 从 IE7 开始兼容

```html
<style>
  /* 相邻兄弟选择器：a + b 即 选择 紧跟在a后面的第一个b */
  img + span {
    color: seagreen;
  }
</style>

<body>
  <h2>相邻兄弟选择器</h2>
  <p>a + b 即 选择 紧跟在a后面的第一个b</p>

  <p>
    <img src="images/3.webp" alt="" />
    <span>小米智能电视</span>
    <span>1999元</span>
  </p>

  <p>
    <img src="images/4.webp" alt="" />
    <span>小米空气净化器</span>
    <span>2999元</span>
  </p>
</body>
```

#### 通用兄弟选择器

- 通用兄弟选择器 `~` 波浪线 `a~b`选择 a 元素之后所有同层级 b 元素
- 从 IE7 开始兼容

```html
<style>
  /* 通用兄弟选择器：a~b选择a元素之后所有同层级b元素 */
  h3 ~ span {
    color: aqua;
  }
</style>

<body>
  <h3>通用兄弟选择器</h3>
  <p>通用兄弟选择器~波浪线 a~b选择a元素之后所有同层级b元素</p>

  <span>我是一个span标签</span>
  <span>我是一个span标签</span>
  <span>我是一个span标签</span>
  <span>我是一个span标签</span>
  <p>段落</p>
  <span>我是一个span标签</span>
  <span>我是一个span标签</span>
  <div>
    <span>我是一个span标签</span>
    <span>我是一个span标签</span>
  </div>
</body>
```

### 9、序号选择器

| 选择器                 | 描述                    | 兼容性 |
| :--------------------- | :---------------------- | :----- |
| `:first-child`         | 第一个子元素            | IE7    |
| `:last-child`          | 最后一个子元素          | IE9    |
| `:nth-child(n)`        | 第 n 个子元素           | IE9    |
| `:nth-of-type(n)`      | 第 n 个某类型子元素     | IE9    |
| `:nth-last-child(n)`   | 倒数第 n 个子元素       | IE9    |
| `:nth-last-of-type(n)` | 倒数第 n 个某类型子元素 | IE9    |

**`:first-child` 选择第一个子元素**

```html
<style>
  /* 表示.box盒子中的第一个p标签 */
  .box p:first-child {
    color: skyblue;
  }
</style>

<body>
  <h2>:first-child 选择第一个子元素</h2>

  <div class="box">
    <!-- 第一个p标签被选择 -->
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
  </div>
</body>
```

**`:last-child` 选择最后一个子元素**

```html
<style>
  /* 选择.box1盒子中最后一个p标签 */
  .box1 p:last-child {
    color: red;
  }
</style>

<body>
  <h2>:last-child 选择最后一个子元素</h2>

  <div class="box1">
    <!-- 最后一个p标签被选中 -->
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
  </div>
</body>
```

**`:nth-child(n)` 可以选择任意序号的子元素**

```html
<style>
  /* 选择任意序号的子元素,第2个p标签 */
  .box2 p:nth-child(2) {
    color: blue;
  }
</style>

<body>
  <h2>:nth-child(n) 可以选择任意序号的子元素</h2>

  <div class="box2">
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
  </div>
</body>
```

**`:nth-child()` 值可以写成 `an+b` 的形式，表示从 b 开始每 a 个选择一个，注 ：不能写成 b + an**

```html
<style>
  /* 
      写成 an+b 的形式，表示从b开始每a个选择一个 
      将 n 作为自然数从 0,1,2 ... 开始带入公式计算，即可得出哪一行被选中
      */
  .box3 p:nth-child(3n + 2) {
    color: blueviolet;
  }
</style>

<body>
  <h2>:nth-child() 可以写成 an+b 的形式</h2>
  <p>表示从b开始每a个选择一个</p>

  <div class="box3">
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
    <p>第6个p标签</p>
    <p>第7个p标签</p>
    <p>第8个p标签</p>
    <p>第9个p标签</p>
    <p>第1个p标签</p>
  </div>
</body>
```

**`:nth-child()` 值为 `2n+1`等价于 odd ，表示奇数**

```html
<style>
  /* 2n+1 等价于 odd ，表示奇数 */
  .box4 p:nth-child(2n + 1) {
    color: salmon;
  }
</style>

<body>
  <h2>:nth-child() 值为 2n+1 等价于odd ，表示奇数</h2>
  <p>奇数行将被选中</p>

  <div class="box4">
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
  </div>
</body>
```

**`:nth-child()` 值为 `2n`等价于 even ，表示偶数**

```html
<style>
  /* 2n 等价于 even ，表示偶数 */
  .box5 p:nth-child(2n) {
    color: aqua;
  }
</style>

<body>
  <h2>:nth-child() 值为 2n等价于even ，表示偶数</h2>

  <div class="box5">
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
    <p>第6个p标签</p>
  </div>
</body>
```

**`:nth-of-type(n)` 将选择同种标签指定序号的子元素**

```html
<style>
  /* :nth-of-type(n) 将选择同种标签指定序号的子元素 */
  .box6 p:nth-of-type(3) {
    color: salmon;
  }
</style>

<body>
  <h2>:nth-of-type(n) 将选择同种标签指定序号的子元素</h2>

  <div class="box6">
    <p>第1个p标签</p>
    <p>第2个p标签</p>
    <h3>第1号h3标签</h3>
    <h3>第2号h3标签</h3>
    <!--第三个p标签将被选中-->
    <p>第3个p标签</p>
    <p>第4个p标签</p>
    <p>第5个p标签</p>
    <h3>第3号h3标签</h3>
    <h3>第4号h3标签</h3>
  </div>
</body>
```

倒数选择

`:nth-last-child(n)` 倒数选择：倒数第 n 个子元素

`:nth-last-of-type(n)` 倒数第 n 个某类型子元素

**与以上同理，只是顺序不一样**

### 10、属性选择器

| 案例                 | 描述                                               | 兼容性                                     |
| :------------------- | :------------------------------------------------- | :----------------------------------------- | --- |
| `img[alt]`           | 选择有 alt 属性的 img 标签                         | IE9                                        |
| `img[alt="艾编程"]`  | 选择 alt 属性是`艾编程`的 img 标签                 | IE9                                        |
| `img[alt^="艾编程"]` | 选择 alt 属性以`艾编程`开头的 img 标签             | IE9                                        |
| `img[alt$="艾编程"]` | 选择 alt 属性以`艾编程`结尾的 img 标签             | IE9                                        |
| `img[alt*="艾编程"]` | 选择 alt 属性中包含`艾编程`文字的 img 标签         | IE9                                        |
| `img[alt~="艾编程"]` | 选择 alt 属性中有空格隔开的`艾编程`字样的 img 标签 | IE9                                        |
| `img[alt             | ="艾编程"]`                                        | 选择 alt 属性中以 `艾编程-`开头的 img 标签 | IE9 |

> 注：实际开发中用到的很少，只做了解即可

```html
<style>
  /* 选择有alt属性的img标签 */
  img[alt] {
    border: 5px solid skyblue;
    border-radius: 12px;
  }

  /* 选择有alt属性是 "小米" 的img标签 */
  img[alt='小米'] {
    border: 10px solid red;
  }

  /* 选择有alt属性以 "智能" 开头的img标签 */
  img[alt^='智能'] {
    border: 10px solid salmon;
  }

  /* 选择alt属性以 "生活" 结尾的img标签 */
  img[alt$='生活'] {
    border: 10px solid pink;
  }

  /* 选择alt属性中包含 "的" 字的img标签 */
  img[alt*='的'] {
    border: 10px solid yellow;
  }

  /* 选择alt属性中有空格隔开的`小米家`字样的img标签 */
  img[alt~='小米家'] {
    border: 20px solid green;
  }

  /* 选择有alt属性以 “小米-” 开头的img标签 */
  img[alt|='小米'] {
    border: 15px solid black;
  }
</style>

<body>
  <h1>属性选择器</h1>

  <h2>img[alt] 选择有alt属性的img标签</h2>
  <img src="images/3.webp" alt="小米电视" />

  <h2>img[alt="小米"] 选择有alt属性是小米的img标签</h2>
  <img src="images/3.webp" alt="小米" />

  <h2>img[alt^="智能"] 选择有alt属性以智能开头的img标签</h2>
  <img src="images/3.webp" alt="智能电视：小米" />

  <h2>img[alt$="生活"] 选择alt属性以生活结尾的img标签</h2>
  <img src="images/4.webp" alt="智能生活" />

  <h2>img[alt*="的"] 选择alt属性中包含 "的" 字的img标签</h2>
  <img src="images/5.webp" alt="小米的净水器" />

  <h2>img[alt~="小米家"] 选择alt属性中有空格隔开的`小米家`字样的img标签</h2>
  <img src="images/3.webp" alt="小米家 的电视" />

  <h2>img[alt|="小米"] 选择有alt属性以 “小米-” 开头的img标签</h2>
  <img src="images/4.webp" alt="小米-净水器" />
</body>
```

### 11、CSS3 新增伪类

| 伪类        | 描述                               |
| :---------- | :--------------------------------- |
| `:empty`    | 选择空标签                         |
| `:focus`    | 选择当前获得焦点的表单元素         |
| `:enabled`  | 选择当前有效的表单元素             |
| `:disabled` | 选择当前无效的表单元               |
| `:checked`  | 选择当前已经勾选的单选按钮或复选框 |
| `:root`     | 选择根元素，即 `<html>`标签        |

**`:empty` 选择所有 p 标签，为空（没有内容）的标签**

```html
<style>
  p {
    width: 200px;
    height: 50px;
    border: 1px solid red;
  }

  /* :empty 选择所有p标签，为空（没有内容）的标签 */
  p:empty {
    background-color: skyblue;
  }
</style>

<body>
  <h1>CSS3新增伪类</h1>

  <h2>:empty 选择空标签</h2>

  <p class="para1"></p>
  <p class="para2"></p>
  <p class="para3">艾编程</p>
  <p class="para4"></p>
</body>
```

**`:focus`选择当前获得焦点的表单元素**

```html
<style>
  /* :focus 选择当前获得焦点的表单元素 */
  input:focus {
    background-color: skyblue;
  }
</style>

<body>
  <h2>:focus 选择当前获得焦点的表单元素</h2>

  <div>
    <input type="text" />
    <input type="text" />
    <input type="text" />
  </div>
</body>
```

**`:enabled` 选择当前有效的表单元素**

```html
<style>
  /* :enabled 选择当前有效的表单元素 */
  input:enabled {
    background-color: salmon;
  }
</style>

<body>
  <h2>:enabled 选择当前有效的表单元素</h2>

  <div>
    <input type="text" />
    <input type="text" />
    <input type="text" />
  </div>
</body>
```

**`:disabled` 选择当前无效的表单元**

```html
<style>
  /* :disabled 选择当前无效的表单元 */
  input:disabled {
    background-color: green;
  }
</style>

<body>
  <h2>:disabled 选择当前无效的表单元</h2>

  <div>
    <input type="text" />
    <input type="text" disabled />
    <input type="text" />
  </div>
</body>
```

**`:checked` 选择当前已经勾选的单选按钮或复选框**

```html
<style>
  /* 
      :checked 选择当前已经勾选的单选按钮或复选框 
      +span 表示input标签后边第一个span标签
    */
  input:checked + span {
    color: red;
  }
</style>

<body>
  <h2>:checked 选择当前已经勾选的单选按钮或复选框</h2>

  <div>
    <label>
      <input type="checkbox" />
      <span>篮球</span>
    </label>
    <label>
      <input type="checkbox" checked />
      <span>乒乓球</span>
    </label>
    <label>
      <input type="checkbox" />
      <span>书法</span>
    </label>
  </div>
</body>
```

![image-20211125232654456](data:image/png;base64,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)

**`:root` 选择根元素，即 `<html>`标签**

```html
<style>
  /* :root 选择根元素，即 <html>标签 */
  :root {
    font-size: 20px;
  }
</style>
```

### 12、CSS3 新增：伪元素

- CSS3 新增了 “伪元素” 特性，表示`虚拟动态创建的元素`
- 伪元素用双冒号`::`表示，IE8 及以上可以兼容单冒号 `:`

| CSS3 新增伪元素 | 描述                                   |
| :-------------- | :------------------------------------- |
| `::before`      | 匹配选中的元素的第一个元素             |
| `::after`       | 匹配选中的元素的最后一个子元素         |
| `::selection`   | ::selection 选择器匹配被用户选取的部分 |
| `:first-letter` | 会选中某元素中第一行的第一个字母       |
| `::first-line`  | 会选中某元素中第一行的全部文字         |

::before

- ::before 创建一个伪元素，将成为匹配选中的元素的第一个元素
- 必须设置 content 属性表示其中的内容

```html
<style>
  /* ::before 创建一个伪元素，将成为匹配选中的元素的第一个元素 */
  a::before {
    content: '※☆';
  }
</style>

<body>
  <h2>::before 创建一个伪元素，将成为匹配选中的元素的第一个元素</h2>

  <a href="#">艾编程</a>
</body>
```

企业应用：各种小图标，CSS 精灵图等等，如：小米官网

::after

- ::after 创建一个伪元素，成为匹配选中的元素的最后一个子元素
- 必须设置 content 属性表示其中的内容

```html
<style>
  /* ::after 创建一个伪元素，成为匹配选中的元素的最后一个子元素 */
  span::after {
    content: '△❥(^_-)';
  }
</style>

<body>
  <h2>::after 创建一个伪元素，成为匹配选中的元素的最后一个子元素</h2>

  <span>艾编程</span>
</body>
```

::selection

- ::selection 选择器匹配被用户选取的部分
- 只能向 ::selection 选择器应用少量 CSS 属性：color、background、cursor 以及 outline

```html
<style>
  /* 
      ::selection 选择器匹配被用户选取的选取是部分
      只能向 ::selection 选择器应用少量 CSS 属性：color、background、cursor 以及 outline
    */
  .box::selection {
    color: pink;
    background-color: black;
  }
</style>

<body>
  <h2>::selection 选择器匹配被用户选取的选取是部分</h2>
  <div class="box">arry老师是全宇宙最帅气的男神 ！！！！</div>
</body>
```

:first-letter

- 会选中某元素中第一行的第一个字母
- 必须是块级元素

```html
<style>
  /* ::first-letter 会选中某元素中第一行的第一个字母 */
  .box1::first-letter {
    font-size: 30px;
    color: skyblue;
  }
</style>

<body>
  <h2>::first-letter 会选中某元素中第一行的第一个字母</h2>

  <div class="box1">艾编程连 - 为每个互联网人提供高质量的终身学习平台</div>
</body>
```

::first-line

- 会选中某元素中第一行的全部文字
- 必须是块级元素

```html
<style>
  /* ::first-line 会选中某元素中第一行的全部文字 */
  .box2::first-line {
    font-size: 20px;
    color: salmon;
    text-decoration: underline;
  }
</style>

<body>
  <h2>::first-line 会选中某元素中第一行的全部文字</h2>

  <div class="box2">艾编程连 - 为每个互联网人提供高质量的终身学习平台</div>
</body>
```

## 三、CSS 选择器的权重计算

### 1、层叠性

- CSS 全名叫 `层叠式样式表` ，层叠性是它很重要的性质
- 层叠性：多个选择器可以同时作用于同一个标签，效果叠加

```html
<style>
  div {
    width: 300px;
    height: 100px;
  }

  .para {
    color: aliceblue;
    background-color: skyblue;
  }

  #desc {
    background-color: green;
  }
</style>

<body>
  <h2>层叠性</h2>

  <div class="para" id="desc">我是一个div</div>
</body>
```

### 2、层叠性的冲突处理

- 多个选择器定义同一元素的冲突问题
- CSS 有严密的处理冲突的规则
- `id 权重 > class权重 > 标签权重 > 通配符权重`

```html
<style>
  /* id 权重 > class权重 > 标签权重 */
  p {
    color: red;
  }

  #arry {
    color: skyblue;
  }

  .me {
    color: green;
  }
</style>

<body>
  <h2>层叠性的冲突处理</h2>

  <p class="me" id="arry">我是一个段落标签</p>
</body>
```

### 3、复杂选择器权重计算

- 复杂选择器可以通过（`id的个数，class的个数，标签的个数`）的形式，计算权重

```html
<style>
  /* id 权重 > class权重 > 标签权重 */

  /* （2,0,1）权重 */
  #box1 #box2 p {
    color: red;
  }

  /* （2,1,2）权重 三个中，此复合样式权重最高，生效*/
  #box1 div.box2 #box3 p {
    color: green;
  }

  /* （0,3,1）权重 */
  .box1 .box2 .box3 p {
    color: blue;
  }
</style>

<body>
  <h2>复杂选择器权重计算</h2>

  <div class="box1" id="box1">
    <div class="box2" id="box2">
      <div class="box3" id="box3">
        <p>我是一个段落标签</p>
      </div>
    </div>
  </div>
</body>
```

### 4、!important 提升权重

- 如果我们需要将某个选择器的某条属性提升权重，可以在属性后边写上 `!important`
- 市级企业中，不允许使用 !important ，因为这会带来不经意的样式冲突

```html
<style>
  /* 权重 （0,1,2） */
  .list ul li {
    color: red;
  }

  /* 权重（0,1,0） */
  /* !important 提升权重，生效 */
  .desc {
    color: skyblue !important;
  }
</style>

<body>
  <h2>!important 提升权重</h2>

  <div class="list">
    <ul>
      <li>我是列表项</li>
      <li class="desc">我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
      <li>我是列表项</li>
    </ul>
  </div>
</body>
```

## 四、CSS 选择器分类汇总

项目中常用选择器和不常用选择器总结

- CSS 选择器用于选择你想要的元素的样式的模式
- "CSS 版本" 该列，表示在 CSS 版本的属性定义（CSS1，CSS2，或对 CSS3）

### 1、常用选择器

| 选择器                   | 示例                  | 示例说明                                                     | CSS 版本 |
| :----------------------- | :-------------------- | :----------------------------------------------------------- | :------- |
| element                  | p                     | 选择所有`<p>`元素                                            | 1        |
| .class                   | .intro                | 选择所有`class="intro"`的元素                                | 1        |
| #id                      | #firstname            | 选择所有`id="firstname"`的元素                               | 1        |
| \*                       | \*                    | 选择所有元素                                                 | 2        |
| element,element          | div,p                 | 选择所有`<div>`元素和`<p>`元素                               | 1        |
| element element          | div p                 | 选择`<div>`元素内的所有`<p>`元素                             | 1        |
| element > element        | div>p                 | 选择所有父级是 `<div>` 元素的 `<p>` 元素                     | 2        |
| element + element        | div+p                 | 选择所有紧跟在 `<div>`元素之后的第一个`<p>`元素              | 2        |
| element1 ~ element2      | p~ul                  | 选择 p 元素之后的每一个 ul 元素                              | 3        |
| :link                    | a:link                | 选择所有未访问链接                                           | 1        |
| :visited                 | a:visited             | 选择所有访问过的链接                                         | 1        |
| :active                  | a:active              | 选择活动链接                                                 | 1        |
| :hover                   | a:hover               | 选择鼠标在链接上面时                                         | 1        |
| :first-letter            | p:first-letter        | 选择每一个`<p>`元素的第一个字母                              | 1        |
| :first-line              | p:first-line          | 选择每一个`<p>`元素的第一行                                  | 1        |
| :first-child             | p:first-child         | 指定只有当`<p>`元素是其父级的第一个子级的样式。              | 2        |
| :before                  | p:before              | 在每个`<p>`元素之前插入内容                                  | 2        |
| :after                   | p:after               | 在每个`<p>`元素之后插入内容                                  | 2        |
| [attribute]              | [target]              | 选择所有带有 target 属性元素                                 | 2        |
| [attribute = value]      | [target=-blank]       | 选择所有使用`target="-blank"`的元素                          | 2        |
| [attribute ~= value]     | [title~=flower]       | 选择标题属性包含单词"flower"的所有元素                       | 2        |
| [attribute \|= language] | [lang\|=en]           | 选择 lang 属性等于 **en**，或者以 **en-** 为开头的所有元素   | 2        |
| [attribute ^= value]     | a[src^="https"]       | 选择每一个 src 属性的值以`"https"`开头的元素                 | 3        |
| [attribute $= value]     | a[src$=".pdf"]        | 选择每一个 src 属性的值以`".pdf"`结尾的元素                  | 3        |
| [attribute *= value]     | a[src*="icodingedu"]  | 选择每一个 src 属性的值包含子字符串`"icodingedu"`的元素      | 3        |
| :checked                 | input:checked         | 选择每个选中的输入元素                                       | 3        |
| :focus                   | input:focus           | 选择具有焦点的输入元素                                       | 2        |
| :first-of-type           | p:first-of-type       | 选择每个 p 元素是其父级的第一个 p 元素                       | 3        |
| :last-of-type            | p:last-of-type        | 选择每个 p 元素是其父级的最后一个 p 元素                     | 3        |
| :only-of-type            | p:only-of-type        | 选择每个 p 元素是其父级的唯一 p 元素                         | 3        |
| :only-child              | p:only-child          | 选择每个 p 元素是其父级的唯一子元素                          | 3        |
| :nth-child(n)            | p:nth-child(2)        | 选择每个 p 元素是其父级的第二个子元素                        | 3        |
| :nth-last-child(n)       | p:nth-last-child(2)   | 选择每个 p 元素的是其父级的第二个子元素，从最后一个子项计数  | 3        |
| :nth-of-type(n)          | p:nth-of-type(2)      | 选择每个 p 元素是其父级的第二个 p 元素                       | 3        |
| :nth-last-of-type(n)     | p:nth-last-of-type(2) | 选择每个 p 元素的是其父级的第二个 p 元素，从最后一个子项计数 | 3        |
| :last-child              | p:last-child          | 选择每个 p 元素是其父级的最后一个子级。                      | 3        |
| :root                    | :root                 | 选择文档的根元素                                             | 3        |
| :empty                   | p:empty               | 选择每个没有任何子级的 p 元素（包括文本节点）                | 3        |

### 2、不常用选择器

| 选择器          | 示例           | 示例说明                                              | CSS 版本 |
| :-------------- | :------------- | :---------------------------------------------------- | :------- |
| :target         | #news:target   | 选择当前活动的`#news`元素（包含该锚名称的点击的 URL） | 3        |
| :enabled        | input:enabled  | 选择每一个已启用的输入元素                            | 3        |
| :disabled       | input:disabled | 选择每一个禁用的输入元素                              | 3        |
| :not(selector)  | :not(p)        | 选择每个并非 p 元素的元素                             | 3        |
| ::selection     | ::selection    | 匹配元素中被用户选中或处于高亮状态的部分              | 3        |
| :out-of-range   | :out-of-range  | 匹配值在指定区间之外的 input 元素                     | 3        |
| :in-range       | :in-range      | 匹配值在指定区间之内的 input 元素                     | 3        |
| :read-write     | :read-write    | 用于匹配可读及可写的元素                              | 3        |
| :read-only      | :read-only     | 用于匹配设置`"readonly"`（只读） 属性的元素           | 3        |
| :optional       | :optional      | 用于匹配可选的输入元素                                | 3        |
| :required       | :required      | 用于匹配设置了 `"required"` 属性的元素                | 3        |
| :valid          | :valid         | 用于匹配输入值为合法的元素                            | 3        |
| :invalid        | :invalid       | 用于匹配输入值为非法的元素                            | 3        |
| :lang(language) | p:lang(it)     | 选择一个 lang 属性的起始值`="it"`的所有`<p>`元素      | 2        |
