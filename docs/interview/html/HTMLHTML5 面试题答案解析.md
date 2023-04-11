# HTML/HTML5 面试题答案解析

关于答案解析

- HTML/HTML5 面试题答案解析过程是根据自身项目实践以及查阅官方文档等最终的得出结论。
- 仅供学习参考，评论区感谢补充和纠错 ！

## 高频重点

### 1、说说你对 HTML 语义化的理解 ？（字节、百度，阿里，腾讯、京东，小米）
::: tip

> 答案解析
>
> HTML 语义化是指我们在写 HTML 结构时用有英文语义的标签，使 HTML 更易于开发人员和机器的阅读和理解。
>
> **非语义**元素的例子：`<div>`和`<span>` 是没有语义的标签
>
> **语义**元素示例： `<form>`、`<table>`、`<nav>`和`<header>` 有明确定义其内容
>
> **为什么要语义化 ?**
>
> - 为了在没有 CSS 的情况下，页面也能呈现出很好地内容结构、代码结构，易于阅读；
> - 提升用户体验：如 title、alt 属性用于名词解释或图片内容说明，以及 label 标签的灵活运用等；
> - 有利于 SEO 优化：与搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重；
> - 可访问性：帮助辅助技术（如视障用户的屏幕阅读器、屏幕阅读器）更好的阅读和转译你的网页，利于无障碍阅读；
> - 国际化：全球只有 13%的人口是英语母语使用者，因此遵循 W3C 标准通用的语义化标签可以让各国开发者更容易弄懂你网页的结构；
> - 可维护性：语义化更具可读性，减少网页间的差异性，方便后期开发和维护；
>
> **在写 HTML 代码时，语义化实践中应该注意什么 ？**
>
> - 尽可能少的使用无语义的标签 div 和 span；
> - 在语义不明显时，既可以使用 div 或者 p 时，尽量用 p, 因为 p 在默认情况下有上下间距，对兼容特殊终端有利；
> - 不要使用纯样式标签，如：b、font、u 等，改用 css 设置；
> - 需要强调的文本，可以包含在 strong 或 em 标签中，strong 默认样式是加粗（不要用 b），em 是斜体（不要用 i 标签）；
> - 使用表格时，标题要用 caption，表头用 thead，主体部分用 tbody 包围，尾部用 tfoot 包围。表头和一般单元格要区分开，表头用 th，单元格用 td；
> - 表单域要用 fieldset 标签包起来，并用 legend 标签说明表单的用途；
> - 每个 input 标签对应的说明文本都需要使用 label 标签，并且通过为 input 设置 id 属性，在 lable 标签中设置 for=someld 来让说明文本和相对应的 input 关联起来。
> - 不仅写 html 结构时，要用语义化标签，给元素写 css 类名时，JS 类名、方法名、变量命名等也要遵循语义化原则。不随意取名，不利于后期的代码重构和维护。同时，也最好不要用汉语拼音命名。
:::
### 2、HTML5 新增了哪些语义化标签 ？

>  答案解析

| 标签           | 描述                                           |
| :------------- | :--------------------------------------------- |
| `<header>`     | 定义了文档的头部区域                           |
| `<nav>`        | 定义导航链接的部分                             |
| `<main>`       | 定义文档的主体内容                             |
| `<section>`    | 定义文档中的节（section、区段）                |
| `<article>`    | 定义页面独立的内容区域                         |
| `<aside>`      | 定义页面的侧边栏内容                           |
| `<details>`    | 用于描述文档或文档某个部分的细节               |
| `<figcaption>` | 定义 `<figure>` 元素的标题                     |
| `<figure>`     | 规定独立的流内容（图像、图表、照片、代码等等） |
| `<mark>`       | 定义带有记号的文本                             |
| `<summary>`    | 标签包含 details 元素的标题                    |
| `<time>`       | 定义日期或时间                                 |
| `<footer>`     | 定义 section 或 document 的页脚                |

> [简单用法参考(opens new window)](https://htmlreference.io/semantic/)

### 3、DOCTYPE 是干嘛的，都有哪些属性（字节）

> 答案解析
>
> DOCTYPE 是 document type (文档类型) 的缩写。`<!DOCTYPE>`声明位于文档的最前面，处于标签之前，它不是 html 标签。主要作用是告诉浏览器的解析器使用哪种 HTML 规范或者 XHTML 规范来解析页面。
>
> **DOCTYPE 声明的目的是：**防止浏览器在渲染文档时，进入“怪异模式”渲染。“`<!DOCTYPE html>`" 确保浏览器按照标准模式进行渲染，而不是使用一个不符合规范的渲染模式。
>
> 在 HTML 中`<!DOCTYPE>`常见声明类型共有 8 种，其中 HTML5 有 1 种，HTML 4.01 和 XHTML 1.0 都有 3 种，XHTML 1.1 有 1 种。
>
> - 在 HTML 4.01 中，<!DOCTYPE> 声明引用 DTD（[w3c 官方规范 (opens new window)](https://www.w3.org/TR/html4/sgml/dtd.html)），因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容；
> - HTML5 不基于 SGML，所以不需要引用 DTD。
> - 当前，HTML5 已经一统江湖了，早期的 HTML4 及以前的版本都已不用，只做 HTML 发展历史了解就好；
>
> **以 HTML4.01 为例，有 3 种 <!DOCTYPE> 声明（严格版、过渡版、框架版）**
>
> - Strict Doctype （严格版文档类型）
>
> ```html
> <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
> ```
>
> - Transitional Doctype（过渡版文档类型）
>
> ```html
> <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
> ```
>
> - Frameset Doctype（框架版文档类型）
>
> ```html
> <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
> ```
>
> **在 HTML5 中，只有一种可用的 DOCTYPE 声明**
>
> ```html
> <!DOCTYPE html>
> ```
>
> 



### DOCTYPE 与浏览器模式

> 目前浏览器的排版引擎使用三种模式：
>
> - 怪异模式（Quirks mode）：排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。在 W3C 标准出来之前，不同的浏览器对页面渲染有不同的标准，产生了一定的差异。（也称之为混杂模式或兼容模式）
> - 接近标准模式（Almost standards mode）：只有少数的怪异行为被实现。
> - 标准模式（Standards mode）：在 W3C 标准出来之后，浏览器对页面的渲染有了统一的标准，行为即按照 W3C 的标准来解析代码渲染页面
>
> **DOCTYPE 声明与否的影响**
>
> - `<!DOCTYPE>`声明的前面是没有任何内容的
> - 如果有其他内容(空格除外) 或 不写文档 DOCTYPE 声明，浏览器将无法获知 HTML 或 XHTML 的文档类型，就会使浏览器进入怪异模式渲染网页，不同浏览器下，显示效果就会不一致；
> - 但是，只要我们对文档 DOCTYPE 做了正确的声明，浏览器就会进入标准模式；浏览器会按照 W3C 的标准来解析渲染页面，那么，在所有的浏览器下，显示的样式效果会保持一致。因此， <!DOCTYPE>声明还是很有必要的。
>
> [怪异模式和标准模式(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
>
> [浏览器如何决定使用哪个模式？(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode#how_does_mozilla_determine_which_mode_to_use.3f)
>
> [我要如何知道目前是哪个模式？(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode#what_are_the_differences_between_the_modes.3f)
>
> [使用 Doctype 激活浏览器模式(opens new window)](https://hsivonen.fi/doctype/)



### DOCTYPE 对 HTML 标签的影响

> TIP
>
> - html 版本经过了几次的升级，每次升级都会弃用一些不适用的旧标签，而增加某些新的 html 标签。因此，对于不同 html 版本的 doctype 文档类型声明，能合法使用的 html 标签也是有所不同。比如：
> - `<article>`和`<aside>`标签，能在 html5 中能使用，而在 HTML 4.01 和 XHTML 中就不能使用；
> - `<center>`标签（目前 W3C 已废弃），XHTML1.0 版本中是不可用的，而在 HTML4.01 和 XHTML1.1 的`<!DOCTYPE>`声明中，只有 Transitional 和 Frameset 是可用的
> - 由此可见，`<!DOCTYPE>`声明的 html 版本，也决定了哪些 html 标签可以合法使用

### 4、meta 标签干什么的，都有什么属性和作用（字节，58，商汤）

> 答案解析
>
> - `<meta>`标签用于描述 HTML 网页的元信息。它不会显示在页面上，但是对于机器是可读的，并告诉机器该如何解析这个页面。
> - 如：浏览器（如何显示内容或重新加载页面），SEO 优化（keywords、description、robots）其他 web 服务等
>
> **meta 标签常用的属性有 4 个如下：**
>
> | meta 标签属性 | 作用                                                         |
> | :------------ | :----------------------------------------------------------- |
> | charset       | 规定 HTML 页面的字符编码 常用的值：UTF-8(Unicode 字符编码)、 ISO-8859-1(拉 J 字母表的字符编码) |
> | content       | 当 meta 标签中有`http-equiv`或`name`属性的时候，一定要有 content 属性对其进行说明。 |
> | http-equiv    | 添加 http 头部内容 对一些自定义的，或者需要额外添加的 http 头部内容，需要发送到浏览器中，我们就可以是使用这个属性 |
> | name          | 元数据的名称 `name` 和 `content` 属性可以一起使用，以`"名 - 值"`对的方式给文档提供元数据，content 作为元数据的值。 |
>
> ### 

### 5、你了解哪些 HTLML5 新特性（快手）

> 新增的有：
>
> - 语义化标签（header、nav、main、section、article、aside、details、figcaption、figure、mark、summary、time、footer 等）
> - Canvas 画布和 SVG 矢量图
> - 拖放（Drag and drop）
> - 音频、视频（audio、video）
> - 地理定位（Geolocation）
> - 本地离线存储（localStorage）长期存储数据，关闭浏览器后不丢失。
> - 会话储存（sessionStorage）数据在关闭浏览器后自动删除。
> - 表单控件（calendar、date、time、email、url、search）
> - 新技术（Web Worker、Web Socket）
> - 新的文档属性（document.visibilityState）
>
> **移除的元素有：**
>
> - 纯表现的元素：basefont，big，center，font, s，strike，tt，u
> - 对可用性产生负面影响的元素：frame，frameset，noframes

### 6、html 文档结构解释下（创业公司）

```html
<!--声明当前文档类型为 html5标准-->
<!DOCTYPE html>
<!--声明当前页面的语言类型-->
<html lang="en">
  <head>
    <!--网页的编码集-->
    <meta charset="UTF-8" />
    <!--IE8及以上的版本按照最新的标准去渲染-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--用户移动端适配-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--网页标题-->
    <title>艾编程</title>
    <!--网页关键词-->
    <meta name="Keywords" content="艾编程,WEB前端,Java架构师,Python课程" />
    <!--网页描述-->
    <meta name="description" content="为每个互联网人提供高质量的终身学习平台" />
  </head>
  <body>
    ......
  </body>
</html>
```

### 7、form 表单的属性说一说（字节）

> 答案解析
>
> - HTML 表单用于搜集不同类型的用户输入
> - 单纯的 form 标签没有任何作用，我们通过设置 form 标签的属性值以及为它添加子元素，从而达到上传数据以及和服务器进行通讯交互的目的。
> - `<form>`标签的属性规定了当前网页上传数据的地址和方式。
>
> ```html
> <!DOCTYPE html>
> <html>
>   <body>
>     <form
>       action="/user"
>       method="post"
>       target="_blank"
>       accept-charset="UTF-8"
>       enctype="application/x-www-form-urlencoded"
>       autocomplete="off"
>       novalidate
>     >
>       ......
>     </form>
>   </body>
> </html>
> ```
>
> | form 属性      | 描述                                                         |
> | :------------- | :----------------------------------------------------------- |
> | action         | 规定提交表单时将表单数据发送到何处，如果 action 的值为空或者#，则数据交由本页面处理。 |
> | method         | method 即方法，规定发送表单数据时要使用的 HTTP 方法          |
> | name           | Form 标签元素自身并没有数据传输，它的 name 属性只是提供了一种在脚本中引用表单的方法。对 form 进行标记，为 form 取个名字 与此同时，form 标签元素内的数据都是通过 name 来传递的，只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。 |
> | accept-charset | 规定了服务器使用哪一种字符集编码来处理本页面所上传的数据。常用的有“UTF-8”、“ISO-8859-1"、"gb2312"等 |
> | enctype        | 规定在发送到服务器之前应该如何对表单数据进行编码 ① application/x-www-form-urlencoded： 在发送前编码所有字符（默认值）把 "+" 转换为空格，并且把特殊字符转换为 ASCII 十六进制值。在不涉及文件传输时，一般使用这种方式； ② multipart/form-data： 不对字符编码，在使用包含文件上传控件的表单时（如：文档，图片、视频、MP3 等）必须使用该值； ③ text/plain：将内容设置为纯文本的形式，空格转换为 "+" 加号，但不对特殊字符编码； |
> | target         | target 属性规定在何处打开 action URL ① _blank 在新窗口中打开 ② _self 默认，在相同的框架中打开 ③ _parent 在父框架集中打开 ④ _top 在整个窗口中打开 ⑤ framename 在指定的框架中打开 |
> | autocomplete   | ① 规定浏览器应该自动完成表单（默认：开启） 当用户在字段开始键入时，浏览器基于之前键入过的值，显示出在 ② 该字段中填写过的选项，从而简化用户的输入 ③ autocomplete 只有两个值，on 和 off，分别对应启用和关闭这个功能。默认值为 on |
> | novalidate     | 规定当提交表单时不对其进行验证 通过将 novalidate=novalidate 属性放置到 form 元素上，form 元素的原生校验特征就会忽略，这样就可以防止它同 JavaScript 的校验方法起冲突 |



### 8、说一下 href 和 src 的区别（字节）

> 答案解析
>
> href 用于建立当前页面与引用资源之间的关系，而 src 会替换当前元素。
>
> 遇到 href，页面会并行加载后续内容，而 src 则需要浏览器加载完毕 src 的内容才会继续往下走。
>
> **src 是 source 的缩写，指向外部资源的位置**
>
> - 指向的内容将会嵌入到文档中当前标签所在位置或下载并应用到文档内；如 js 脚本，img 图片和 iframe 等元素。
> - 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。
>
> **href 是 Hypertext Reference 的缩写，指向网络资源所在位置**
>
> - 建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加`<link href="common.css" rel="stylesheet"/>`那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。
> - 这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式

### 9、script 标签放在 head 那里怎么解决加载问题（百度，阿里，腾讯、京东，小米 等）

答案解析



**考点：主要涉及加载顺序、JS 是单线程**

> 由于浏览器解析是自上而下加载解析，如果一个很大的 js 文件放在 head 里面，由于 js 是单线程，那么浏览器会一直解析中，而无法加载解析后面的 DOM tree，会阻塞后续的 DOM 渲染，以至于页面出现空白。

**当浏览器加载一个含有`<script>`标签的页面时，会发生以下动作：**

- 1、获取 HTML 文件，拉取 HTML 页面（如：index.html）
- 2、开始解析 html 文件
- 3、当解析器遇到一个`<script>`标签时，准备去获取`<script>`标签对应的 js 文件
- 4、当解析器获取 js 文件时，同时阻塞了页面上其他 html 的解析（页面会出现空白，用户体验不好）
- 5、当 js 文件解析完毕，页面上其他的 html 标签继续解析

> **阻塞 HTML 解析的原因：**

- 任何 script 代码都能改变 HTML 的结构，通过 document.write() 这种方式或者其他方式。 这就导致了 HTML 解析必须等待`<script>`全部被下载和执行完，HTML 才能解析 script 标签之后余下的部分。最后，用户才能看到具体页面；

> **早年的解决方式**

- 以前解决这个问题的方式是将`<script>`标签放在 html 文件的`<body>`标签结束之前来执行；但这种加载方式存在的问题就是只有当所有的 html 元素加载完成后才能开始加载`<script>`标签的内容，如果这个加载需要花很长时间的话，那在这段时间内，就无法操作页面，要知道两秒之内不能操作页面的话，这个用户体验是非常差的。
- 如果 js 放在 head 里面，引用了某个 dom，但是这时你还没加载 dom tree，会报错，可以采用`window.onload = function(){}`这样来解决，但这任然不是最优解
- 动态创建 DOM 方式，将 JS 代码放置在 body 标签结束之前；
- 使用 jQuery 的 getScript()方法
- 使用`setTimeout`延迟方法

**目前各大厂主流的解决方案是：**

- 现在浏览器和`<script>`标签都支持 **`async`** 和 **`defer`** 两个属性来解决 DOM 渲染阻塞的问题，这也是 script 标签非常重要的两个属性。
- 按需异步载入 js

**① 有 async 时**

```html
<script async src="script.js"></script>
```

- 加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。 对 async 而言，脚本的加载和执行是紧挨着的，不管声明顺序如何，只要加载完就会立即执行。
- async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：百度统计，Google Analytics 等

**② 有 defer 时**

```html
<script defer src="script.js"></script>
```

- 加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。 推迟的脚本原则上按照它们被列出的顺序执行。

**两者之间共同点：**defer 和 async 在网络读取（下载）这一阶段是一样的，相对于 html 解析来说都是异步的。
**两者之间差别是：** script 脚本下载完后何时执行。defer 是最接近我们对于应用脚本加载和执行要求的。

**推荐实际应用场景**

① 使用 defer 属性：

- 如果你的脚本代码依赖于页面中的 DOM 元素（文档是否解析完毕），或者被其他脚本文件依赖。 如：评论看，代码语法高亮 等

② 使用 async 属性：

- 如果你的脚本并不关心页面中的 DOM 元素（文档是否解析完毕），并且也不会产生其他脚本需要的数据。如：百度统计，Google 统计等

### 10、了解过不同图片格式的区别吗（京东）

> 答案解析
>
> - gif，全称：图像互换格式（Graphics Interchange Format）是一种位图文件格式，以 8 位色重现真色彩的图像。可以实现动画效果；
> - jpg，全称：联合照片专家组（Joint Photographic Expert Group）简称：JPEG，jpg === jpeg；
>   - 是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在 www 上，被用来储存和传输照片的格式。
> - png，全称：便携式网络图形（Portable Network Graphics）是一种无损数据压缩位图文件格式；
> - webp 格式，谷歌（google）2010 年开发的一种旨在加快图片加载速度的图片格式。压缩率只有 jpg 的 2/3，大小比 png 小了 45%，并能节省大量的服务器宽带资源和数据空间；
> - svg，全称：可缩放矢量图形（Scalable Vector Graphics）简称 SVG；
>   - 它是基于 XML，由万维网联盟进行开发的。一种开放标准的矢量图形语言，可任意放大图形显示，边缘异常清晰，文字在 SVG 图像中保留可编辑和可搜寻的状态，没有字体的限制，生成的文件很小，下载很快，十分适合用于设计高分辨率的 Web 图形页面
>
> | 格式 | 优点                                                         | 缺点                                                         | 适用场景                                              |
> | :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :---------------------------------------------------- |
> | gif  | 支持动画、透明，无兼容性问题                                 | 仅布尔透明                                                   | 色彩简单的 logo、icon、动图                           |
> | jpg  | 色彩丰富，文件小                                             | 有损压缩，反复保存图片质量下降明显                           | 色彩丰富的图片/渐变图像，照片，复杂 banner            |
> | png  | 无损压缩，支持透明，简单图片尺寸小，高保真                   | ① 不支持动画，色彩丰富的图片尺寸大； ② 对自然照片和复杂色块的图片压缩率不高 | logo/icon/透明图，适用于 web 所有场景                 |
> | webp | 文件小，支持有损和无损压缩，支持动画、透明                   | 浏览器兼容性相对而言不好                                     | 支持 webp 格式的 app 和 webview，产品图片（如：京东） |
> | SVG  | ① 可伸缩性，矢量图片随意放大缩小，不影响质量；显示效果好，不存在锯齿等情况 ② 体积小，Svg 平均比 GIF、 JPEG、 PNG 小得多，甚至在极高的分辨率下也是如此； ③ 支持动画，更灵活、质量效果好； ④ 与 DOM 无缝衔接，Svg 可以直接使用 HTML、 CSS 和 JavaScript （例如动画）来操作 | ① 不适合高复杂度的图形，SVG 复杂度高会减慢渲染速度； ② 不适合游戏类等高互动动画 | 图表（echarts），图标，logo                           |

### 常用图片格式 PNG, GIF, JPG 比较

| 对比         | 结果                                            |
| :----------- | :---------------------------------------------- |
| 大小         | PNG ≈ JPG > GIF ，8 位的 PNG 完全可以替代掉 GIF |
| 透明性       | PNG > GIF > JPG                                 |
| 色彩丰富程度 | JPG > PNG > GIF                                 |
| 兼容程度     | GIF ≈ JPG > PNG                                 |

### 11、精灵图的原理和优缺点？（广联达）

> 答案解析
>
> 精灵图也是为了减少网络请求，将小图标和背景图像合并到一张图片上，然后利用 css 的 background-positon 或者 img 的 clip 来进行背景定位显示需要显示的图片部分
>
> - **优点：**减少加载网页图片时对服务器的请求次数，从而大大的提高页面的性能，减少图片的字节；
> - **缺点：**使用起来不够灵活，标签更复杂如果需要多个尺寸，维护困难；
> - **适用场景：**图标



### 12、说说你对 Canvas 的理解（腾讯、阿里）

> 答案解析

Canvas 是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

> 也是 HTML5 元素中功能最强大的一个，这种强大的能力是通过 canvas 的 context 对象表现出来的。它提供一套完成的绘图功能，从而使我们可以使用 javascript 可以操作他们。

**Canvas 的特点：**

- 依赖分辨率
- 逐像素进行渲染
- 弱的文本渲染能力
- 不支持事件处理器
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

**我们能用 Canvas 做些什么 ?**

- 游戏：毫无疑问，游戏在 HTML5 领域具有举足轻重的地位。相比 flash 技术，html5 基于 web 的图像显示更加立体，精巧。流行的游戏引擎 cocos2d-js、Egret 都基于 html5 的 canvas
- 图表制作：图表制作时常被人们忽略，但无论企业内部还是企业间交流合作都离不开图表。现在一些开发者使用 HTML/CSS 完成图标制作，完全可以用 Canvas 来实现。当然，使用 SVG(可缩放矢量图形)来完成图表制作也是非常好的方法。
- banner 广告：Flash 曾经辉煌的时代，智能手机还未曾出现。现在以及未来的智能机时代，HTML5 技术能够在 banner 广告上发挥巨大作用，用 Canvas 实现动态的广告效果再合适不过。
- 模拟器：无论从视觉效果还是核心功能方面来说,模拟器产品可以完全由 JavaScript 来实现。
- 远程计算机控制：Canvas 可以让开发者更好地实现基于 Web 的数据传输，构建一个完美的可视化控制界面。
- 字体设计：对于字体的自定义渲染将完全可以基于 Web，使用 HTML5 技术进行实现。
- 图形编辑器：图形编辑器将能够 100%基于 Web 实现。
- 其他可嵌入网站的内容：类似图表、音频、视频,还有许多元素能够更好地与 Web 融合，并且不需要任何插件。继续挖掘 Canvas 的潜力，运用 HTML5 技术创造更多价值。

### 13、“ data- *” 属性的作用是什么 ？

> 答案解析

“data-*” 是 HTML5 新增的自定义属性，用于存储页面或应用程序的私有自定义数据。

- **好处：**存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）

**data-\* 属性包括两部分：**

- 属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符，多个单词组成需用连字符分割。如：“data-color” 或 “data-list-name”
- 属性值可以是任意字符串

**使用方法：**

这些属性集可以通过对象的`dataset`属性获取，不支持该属性的浏览器可以通过`getAttribute`方法获取，具体如下：

```html
<div id="animal" data-type="cat"></div>
<div id="people" data-type-name="arry老师"></div>
<script>
  var animal = document.getElementById("animal");
  var people = document.getElementById("people");
  // 使用 dataset属性赋值
  animal.dataset.type = "sheep";
  // 使用 dataset属性取值
  console.log(animal.dataset.type); // sheep

  // 如果是 data-abc-abc-abc 的格式，则采用首字母小写的驼峰式 abcAbcAbc 读写该自定义属性值
  // data多个连字符赋值
  people.dataset.typeName = "清心老师";
  // data多个连字符取值
  console.log(people.dataset.typeName); // 清心老师

  // 使用setAttribute 给data属性赋值
  animal.setAttribute("data-type", "dog");
  // 使用getAttribute取值
  console.log(animal.getAttribute("data-type")); // dog

  // 如果是 data-abc-abc-abc 的格式，则采用首字母小写的驼峰式 abcAbcAbc 读写该自定义属性值
  // setAttribute多个连字符赋值
  people.setAttribute("typeName", "allen老师");
  // getAttribute多个连字符取值
  console.log(people.getAttribute("typeName")); // allen老师

  // jQuery中使用
  // 设置data属性： $("元素").attr("key","value")或 $("元素").data("key","value") 即可
</script>
```

## HTML/HTML5 基础

### 1、Canvas 和 SVG 有什么区别 ？

| Canvas                                             | SVG                                                          |
| :------------------------------------------------- | :----------------------------------------------------------- |
| 它是通过 JavaScript 来绘制的                       | 使用 XML 的 2d 语言                                          |
| 取决于分辨率（依赖）                               | 独立于分辨率（不依赖）                                       |
| 不支持事件处理程序                                 | 支持事件处理程序                                             |
| 适用于小规模渲染应用程序                           | 在大规模渲染应用程序中表现更好                               |
| 最适合图像密集型的游戏，其中的许多对象会被频繁重绘 | 不适合游戏应用，复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） |

适用范围：

- Canvas 是逐像素进行渲染的，一旦图形绘制完成，就不会继续被浏览器关注。而 SVG 是通过 DOM 操作来显示的。
- 所以 Canvas 的文本渲染能力弱，而 SVG 最适合带有大型渲染区域的应用程序。
- Canvas 最适合有许多对象要被频繁重绘的图形密集型游戏。
- SVG 由于 DOM 操作 在复杂度高的游戏应用中 会减慢渲染速度。所以不适合在游戏应用。

### 2、HTML 中的 void 元素是什么 ？

> 答案解析



没有关闭标签或不需要关闭的`HTML元素`是`Void元素`。

例如 `<br />`、`<img />`、`<hr />` 等。

### 3、HTML5 与之前的版本相比有哪些优势 ？

> HTML5 的一些优点是：
>
> - 它有多媒体支持。
> - 它具有使用 SQL 数据库和应用程序缓存存储离线数据的能力。
> - Javascript 可以在后台运行。
> - HTML5 还允许用户绘制各种形状，如矩形、圆形、三角形等。
> - 包括新的语义标签和表单控制标签。

### 4、HTML5 规范的重要目标是什么 ？

> 答案解析

- 引入新元素标签以更好地构建网页，例如 `<header>` 标签。
- 形成跨浏览器行为的标准并支持不同的设备和平台
- 向后兼容旧版本的 HTML 网页
- 引入基本交互元素，不依赖 `<video>` 标签等插件，而不是 flash 插件。

### 5、旧浏览器如何支持 SVG？

> 答案解析



- 为了支持旧浏览器而不是在 `<img>` 标签的 src 属性中定义 svg 的资源
- 应该在 srcset 属性中定义它，并且应该在 src 中定义备用 png 文件。

```html
<img src="circle.png" alt="circle" srcset="circle.svg" />
```

### 6、HTML5 中的内联元素和块级元素分别有哪些 ？

| Inline 内联元素                                              | Block 块级元素                                               |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| 内联元素只占用内容绝对必要的空间，而不是从新行开始。 示例：`<span>`、`<a>`、`<strong>`、`<img>`、`<button>`、`<em>`、`<select>`、`<abbr>`、`<label>`、`<sub>`、`<cite>`、`<abbr>` 、`<script>`、`<label>`、`<i>`、`<input>`、`<output>`、`<q>` 等。 | 块元素从新行开始并占用可用页面的整个宽度。 示例：`<div>`、`<p>`、`<header>`、`<footer>`、`<h1>...<h6>`、`<form>`、`<table>`、`<canvas>`、`<video>`、`<blockquote>`、`< pre>`、`<ul>`、`<ol>`、`<figcaption>`、`<figure>`、`<hr>`、`<article>`、`<section>`等。 |

###  