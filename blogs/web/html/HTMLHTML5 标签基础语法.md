# HTML/HTML5 标签基础语法



Web 前端开发零基础快速入门，HTML/HTML5 标签及属性的基础语法

## 一、基础入门



- 从零开始创建一个网页（2 种方法）
- 生成 HTML5 骨架

### 1、创建第一个网页

方法一：

- 创建一个空文件夹
- 在文件夹中，右键新建文本文件
- 然后将文件后缀名`.txt`修改为 `.html` ，再使用`Vscode` 编辑器打开
- 注意：设置操作系统 "文件扩展名" 为可见

**方法二：**

- 创建一个空文件夹，直接使用 Vscode 打开文件夹
- 使用快捷键 `Ctrl + N` 新建文件 ，保存文件格式为 `.html`后缀名即可
- 或者点击`新建文件`按钮 或 在 Vscode 资源管理器中`右键新建文件`

注：

我们所看到的网页有各种效果（包括图片、视频、文字 .....），但 HTML 文件本身是纯文本

### 2、生成 HTML5 骨架



- 输入 `!` 英文模式下，按 `tab`键，即可自动生成 HTML5 的骨架
- 注：如果没有生成，看网页的格式是否正确或保存
- 在 Vscode 中 生成 HTML5 骨架 即可

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>这是我的第一个HTML网页</title>
  </head>
  <body>
    第一个HTML网页 ，Hello ！
  </body>
</html>
```

### 3、预览网页的方式

方法 1：

- 直接文件夹中双击网页图标，即可查看
- 适合开发者 Chrome 浏览器，记得将 Chrome 浏览器设置为默认浏览器
- 修改网页内容后，在浏览器中手动刷新后，即可更新内容

**方法 2：**

- 在 Vscode 中安装 `Live Server`插件（实时热更新）修改内容后，保存网页将自动刷新
- 安装完成后，在当前 HTML 文件中，按快捷键 `Ctrl+Shift+P` 选择 `Open Witch Live Server` 即可打开
- 使用快捷键注意：网页必须存放在文件夹中，并且 Vscode 已经打开这个文件夹
- 开发时可以使用分屏模式，一边开发、一边呈现效果，所见即所得。电脑屏幕效果如下：

![image-20211118224526266](https://www.arryblog.com/assets/img/image-20211118224526266.dc46b6c0.png)

### 4、常用浏览器



浏览器是网页显示、运行的平台。常用浏览器有 IE、火狐（Firefox）谷歌（Google）、Safari（苹果官方）、Opera 、Edge（微软） 等

全球浏览器市场份额：[https://gs.statcounter.com/browser-market-share(opens new window)](https://gs.statcounter.com/browser-market-share)

![image-20211118230728798](https://www.arryblog.com/assets/img/image-20211118230728798.d87f42e5.png)

[中国浏览器市场份额 ：https://tongji.baidu.com/research/site(opens new window)](https://tongji.baidu.com/research/site)

![image-20211118231008348](https://www.arryblog.com/assets/img/image-20211118231008348.e9d88a5a.png)

### 5、浏览器内核

浏览器内核（渲染引擎）：

负责读取网页内容，整理信息，计算网页的显示方式并显示页面

| 浏览器                         | 内核           | 说明                                                                                                       |
| :----------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------- |
| IE                             | Trident        | IE 浏览器内核                                                                                              |
| Edge                           | WebKit         | 微软 Microsoft Edge（简称 ME 浏览器）                                                                      |
| Chrome/Opera                   | Blink          | 由 Google 和 Opera Software 共同研发，Blink 其实是 WebKit 的分支，以前 Google 是 WebKit 内核、现在是 Blink |
| Firefox                        | Gecko          | 火狐浏览器内核                                                                                             |
| Safari                         | WebKit         | 苹果浏览器内核                                                                                             |
| 360、猎豹、2345 浏览器         | Trident+Blink  | 双内核                                                                                                     |
| UC、搜狗、遨游、QQ 浏览器      | Trident+Webkit | 双内核                                                                                                     |
| 百度（已关闭）、世界之窗浏览器 | Trident        | IE 浏览器内核                                                                                              |

> [浏览器内核检测工具：https://ie.icoa.cn/(opens new window)](https://ie.icoa.cn/)

![image-20211118235012224](https://www.arryblog.com/assets/img/image-20211118235012224.5eca5242.png)

## 二、认识 HTML5 骨架

```html
<!--文档类型声明DTD-->
<!DOCTYPE html>
<!--<html></html> 标签对-->
<html lang="en">
  <!--<head></head> 标签对-->
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <!--<body></body>标签对-->
  <body></body>
</html>
```

### 1、文档类型声明 DTD

定义和用法

- `<!DOCTYPE>` 声明必须是 HTML 文档的第一行，位于 `<html>` 标签之前。`
- `<!DOCTYPE>` 声明不是 HTML 标签，它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。
- 在 HTML 4.01 中，`<!DOCTYPE>` 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。

**SGML（Standard Generalized Markup Language）**

- 即标准通用标记语言) SGML 是国际上定义电子文档和内容描述的标准。
- HTML5 不基于 SGML，所以不需要引用 DTD

提示：

请始终向 HTML 文档添加 `<!DOCTYPE>` 声明，这样浏览器才能获知文档类型。

- 不写 DTD 会引发浏览器的一些兼容问题
- 不同版本的 HTML 有不同的 DTD 写法

**HTML 4.01 与 HTML5 之间的差异**

- 在 HTML 4.01 中有三种 <!DOCTYPE> 声明。
- 在 HTML5 中只有一种（如下所示）：

#### HTML5 标准

```html
<!DOCTYPE html>

<!DOCTYPE > 声明没有结束标签。
<!DOCTYPE > 声明对大小写不敏感，以下任意方式都可以。但，建议使用 <!DOCTYPE html>

<!DOCTYPE html>
<!DOCTYPE html>
<!DOCTYPE html>
<!DOCTYPE html>
```

#### HTML4.01 严格版

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

#### HTML4.01 过渡版

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

#### HTML4.01 框架版

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

当前

HTML5 已经一统江湖了，早期的 HTML4 及以前的版本都已不用，只做 HTML 发展历史了解就好。

那么，是谁在制定这些版本，就是 W3C 组织

### 2、W3C 组织



- W3C 指万维网联盟（World Wide Web Consortium）是万维网的主要国际标准组织
- W3C 创建于 1994 年 10 月主要负责制定 WEB 标准
- W3C 由 *Tim Berners-Lee*（蒂姆·伯纳斯·李） 创建 ，被誉为 "互联网之父"
- W3C 是一个*会员组织*
- W3C 的工作是*对 web 进行标准化*
- W3C 创建并维护 *WWW 标准*
- W3C 标准也被称为 *W3C 规范*
- 主要是 HTML 和 CSS

[W3C 组织官网：https://www.w3.org/(opens new window)](https://www.w3.org/)

JavaScript 由 Brendan Eich 于 1995 年发明，并于 1997 年成为 ECMA 标准。

### 3、网页组成

网页主要由三部分组成：

结构（Structure）、表现（Presentation）和行为（Behavior）

| 标准 | 简介                                                         | 描述       |
| :--- | :----------------------------------------------------------- | :--------- |
| 结构 | 用于对网页元素进行整理和分类，即当下学习的 HTML              | 网页的骨骼 |
| 表现 | 表现用户设置网页元素的排版、颜色、大小修饰等外观样式，即 CSS | 网页的皮肤 |
| 行为 | 行为是指网页模型的定义、交互等编写，即要学习的 JavaScript    | 网页的神经 |

Web 标准提出的最佳体验方案：

- 结构、样式、行为相分离
- 即：结构写在 HTML 文件中，表现写在 CSS 文件中，行为写在 JavaScript 文件中

### 4、html 标签

```html
<!--文档类型声明-->
<!DOCTYPE html>
<!--
    <html></html>标签
    lang 表示网页的语言，en表示英语，zh表示中文 ,不修改也行
    什么时候修改呢：如果网站有多国语言时修改，中文版、英语版、日语版、法语版等等，具体案例可参考 小米官网源码
-->
<html lang="en">
  <!-- <head></head>标签对，是网页的配置，不要认为是网页的头部 -->
  <head> </head>
  <!-- <body></body>标签对中书写网页的内容，包括网页的头部、主要内容、页脚等各个部分 -->
  <body></body>
</html>
```

### 5、字符集



- meta 元标签，表示网页的基础配置
- charset 字符集
- UTF-8 是一种字符集

```html
<meta charset="UTF-8" />
```

在中国常见的字符集有两种 UTF-8 和 gb2312

| 字符集        | 涵盖字符                                                           | 1 个汉字的字节数 | 适用场景                                                                       |
| :------------ | :----------------------------------------------------------------- | :--------------- | :----------------------------------------------------------------------------- |
| UTF-8         | 涵盖全球所有国家、民族的文字和大量图形字符                         | 3                | 开发有非汉字文字的网页                                                         |
| gb2312（gbk） | 收录所有汉字字符（简体、繁体）和英语、少量韩文、日语和少量图形字符 | 2                | 开发只有汉语和英语的网页，由于 1 个汉字仅占 2 个字节，网页文件尺寸大小明显减少 |

注：

与 UTF-8 相比一个汉字节省一个字节

**更改网页的字符集**

无论使用哪种字符集，一定要在 Vscode 中将文件也设置为相同的字符集，否则会出现乱码

```html
<meta charset="UTF-8" />
<meta charset="gb2312" />
<meta charset="gbk" />
```

**注：**

Live Serve 插件不支持 gb2312、gbk 字符集，只支持 UTF-8 字符集

文件编码集与 meta 标签编码不一致网页会出现乱码

![image-20211119222611759](https://www.arryblog.com/assets/img/image-20211119222611759.85cbee36.png)

同样的内容，不同的编码所占字节数也不同

![image-20211119223036565](data:image/png;base64,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)

### 6、网页三要素



- title：网页的标题（30 字以内）
  - 文字会显示在浏览器的标题栏上
  - title 也是搜索引擎收录网站时显示的标题，为了吸引用户点击，合理的标题设置有利于 SEO 优化
- keywords：网页的关键词（关键词之间用英文状态下的逗号 "," 分隔）
- description：网页的描述（150 字以内）

[点击查看详细版，网页三要素企业优化规范 👆](https://www.arryblog.com/guide/standard/seo.html#_1、网页三要素的基础优化规范)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>艾编程-为每个互联网人提供高质量的终身学习平台</title>
    <meta name="Keywords" content="艾编程,WEB前端,Java架构师,Python课程" />
    <meta
      name="description"
      content="艾编程连接了国内外一线互联网公司整合一线师资和企业项目研发解决方案，面向互联网企业开发者提供Web前端、Java、Python、大数据、人工智能等技术在实际企业应用中的项目研发解决方案体系化在线课程。"
    />
  </head>
  <body></body>
</html>
```

#### SEO 优化



SEO（Search Engine Optimization）即：搜索引擎优化

利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。目的是让其在行业内占据领先地位，获得品牌收益。

[详细版，SEO 搜索引擎网页代码优化 👆](https://www.arryblog.com/guide/standard/seo.html)

#### 网页 title

![image-20211119231010517](https://www.arryblog.com/assets/img/image-20211119231010517.fdbda5cd.png)

#### 通过关键词搜索，百度收录效果

![image-20211119230636936](https://www.arryblog.com/assets/img/image-20211119230636936.fb71370b.png)

### 7、VSCode 中 HTML 模板代码解读

meta 标签及属性的含义

```html
<!--IE8及以上的版本按照最新的标准去渲染-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

**`X-UA-Compatible` 是什么？**

- X-UA-Compatible 是 IE8 的一个专有`<meta>`属性，它告诉 IE8 采用何种 IE 版本去渲染网页，在 html 的`<head>`标签中使用，IE8 以下版本不识别
- Edge 模式告诉 IE 以最高级模式渲染文档，也就是任何 IE 版本都以当前版本所支持的最高级标准模式渲染，避免版本升级造成的影响。
- 简单的说，就是什么版本 IE 就用什么版本的标准模式渲染。

**最佳的兼容模式方案：**

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```

- 添加”chrome=1“ 将允许站点在使用了谷歌浏览器内嵌框架（Chrome Frame）的客户端渲染，对于没有使用的，则没有任何影响。
- 百度目前也是使用该模式

**`viewport`主要用作移动端适配**

- width：用来设置 layout viewport 的宽度
- device-width ：设置成设备的实际宽度
- initial-scale=1.0 ：防止浏览器对页面进行缩放 1:1 显示，即不缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**完整解读**

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
  <body></body>
</html>
```

## 三、重新认识标签

### 1、什么是 HTML？

HTML 是用来描述网页的一种语言

- HTML 指的是超文本标记语言 (**H**yper **T**ext **M**arkup **L**anguage)
- HTML 不是一种编程语言，而是一种`标记语言` (markup language)
- 标记语言是一套`标记标签` (markup tag)
- HTML 使用标记标签来描述网页

**注：超文本有两层含义**

- 它可以加入图片、声音、动画、多媒体等内容（超越了文本限制）
- 它还可以从一个文件跳转到另一个文件，与世界各地主机的文件连接（超级链接文本）

### 2、HTML 标签

HTML 标记标签通常被称为 HTML 标签 (HTML tag)

- HTML 标签是由`尖括号`包围的关键词，比如 `<html>`
- HTML 标签通常是`成对出现`的，比如 `<b></b>`
- 标签对中的第一个标签是`开始标签`，第二个标签是`结束标签`
- 开始和结束标签也被称为`开放标签`和`闭合标签`

### 3、HTML 文档 = 网页

HTML 文档

- HTML 文档 `描述网页`
- HTML 文档 `包含 HTML 标签和纯文本`
- HTML 文档也被称为`网页`

Web 浏览器的作用是读取 HTML 文档，并以网页的形式显示出它们。 浏览器不会显示 HTML 标签，而是使用标签来解释页面的内容：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML标签 - Arry老师</title>
  </head>
  <body>
    <h1>我是一个标题标签</h1>

    <p>我是一个段落标签</p>
  </body>
</html>

<!--

以上代码案例解读：

<html> 与 </html> 之间的文本描述网页
<body> 与 </body> 之间的文本是可见的页面内容
<h1> 与 </h1> 之间的文本被显示为标题
<p> 与 </p> 之间的文本被显示为段落
不同的标签有不同的功能比如：p标签表示段落，h1标签表示一级标题
标签可以给文字设置不同的语义

-->
```

### 4、单标签



有的标签不是成对出现的，而是只有起始标签，称之为**单标签**

```html
<meta charset="UTF-8" />
```

在 HTML4 代中，单标签必须写一个结尾的反斜杠，HTML5 就不用写

```html
<meta charset="UTF-8" />
```

现在，我们就能彻底理解 "超文本标记语言" 的含义啦