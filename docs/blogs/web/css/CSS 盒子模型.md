# CSS 盒子模型

在学习盒子模型之前，我们先来思考一个问题？网页布局的本质是什么？

- 我们所看到的网页本质上就是由一个个矩形框拼凑而成，矩形框里放置相关的图片，文字，视频等内容。
- 我们可以简单的把网页中的这种矩形框结构称为盒子模型。接下来我们站在专业的角度，来了解下盒子模型。
- 如下图所示：

![image-20220706172732919](https://www.arryblog.com/assets/img/image-20220706172732919.241f7008.png)

## 一、盒子模型简介

- 所有 HTML 标签都可以看成矩形盒子，具有 **（盒子模型）** 结构。
- **盒模型由 4 个部分组成**，分别是： **`content`**、**`padding`**、**`border`**、**`margin`**
- **盒模型有 5 个属性**： **`width`** 宽 、**`height`** 高 、**`border`** 边框 、**`padding`** 内边距 、**`margin`** 外边距

![image-20211107135225669](https://www.arryblog.com/assets/img/image-20211107135225669.359c561e.png)

**我们可以用现实生活中的相框类比：**

![image-20211127162519192](https://www.arryblog.com/assets/img/image-20211127162519192.91922fc3.png)

注：

`width`、`height` 不是盒子的总宽度

- 在标准盒子模型下，盒子模型的 content 部分就是元素的 width 和 height 属性组成的矩形部分。

**简单盒子模型**

```html
<style>
  .box {
    /* 宽度 200px */
    width: 200px;
    /* 高度 200px */
    height: 200px;
    /* 边框 快捷键 bd */
    border: 10px solid red;
    /* 内边距 上右下左 30px */
    padding: 30px;
    /* 外边距 上右下左 30px */
    margin: 30px;
  }
</style>
<body>
  <div class="box">我就是div盒子的内容</div>
</body>
```

![image-20220714155941608](https://www.arryblog.com/assets/img/image-20220714155941608.e3b243de.png)

## 二、盒模型的属性

包含内容：

- width、height 属性（宽、高），border 属性（边框）
- padding 属性（内边框），padding 的不同数值写法
- margin 属性（外边距），margin 的不同数值写法，margin 塌陷，margin 负值
- 去掉元素默认值，盒子水平居中，盒子模型占位计算

### 1、width 和 height 属性 - 宽和高

| 属性     | 单位                                   | 描述           |
| :------- | :------------------------------------- | :------------- |
| `width`  | px 、移动端开发 （百分比、rem 等单位） | 盒子内容的宽度 |
| `height` | px、移动端开发（百分比、rem 等单位）   | 盒子内容的高度 |

#### ① width 属性

当**块级元素**（div、h 系列、li 系列）没有设置 width 属性时，它将**自动撑满**，但并不意味着 width 可以继承

```html
<style>
  /* box1 不设置width宽度，由于div是块级元素，能够自动撑满 */
  .box1 {
    height: 100px;
    background-color: skyblue;
  }
  /* 如果不是块级元素，设置或不设置宽度，都无法撑满 */
  a {
    height: 100px;
    background-color: red;
  }
</style>

<body>
  <h2>width 属性</h2>
  <p>
    当块级元素（div、h系列、li系列 ...... 等）没有设置 width 属性时，它将自动撑满 ，但并不意味着
    width 可以继承
  </p>

  <div class="box1"></div>

  <p>如果不是块级元素，设置或不设置宽度，都无法撑满</p>
  <a href="#">我是超级链接a标签</a>
</body>
```

![image-20220714162243022](https://www.arryblog.com/assets/img/image-20220714162243022.133fef8b.png)

#### ② height 属性

- 盒子的 height 属性如果不设置，它将自动被其内容撑开
- 如果没有内容，则 height 默认是 0

```html
<style>
  /* 
  box2 如果不设置 height高度，默认是0。且没内容时，页面则不显示
  如果有内容，能够被内容自动撑起来  
  */
  .box2 {
    width: 200px;
    background-color: yellow;
  }
</style>

<body>
  <h2>height 属性</h2>
  <p>
    box2 如果不设置 height高度，默认是0。且没内容时，页面则不显示。如果有内容，能够被内容自动撑起来
  </p>

  <div class="box2">我是内容内容内容内容内容内容内容内容内容内容</div>
</body>
```

![image-20220714162449769](https://www.arryblog.com/assets/img/image-20220714162449769.b4c52cf1.png)

#### ③ 总结：width 和 height 的特性

块级元素

- 当块级元素（如：div，p，li，h1-h6 ......）等没有设置 width 属性时，盒子的宽度会自动撑满他的父元素。但并不意味着 width 可以继承，width 是无法继承的。
- 高度在没有设置时，其高度为内容高，如果内容为空，则高度为 0
- 支持宽高属性的设置

**内联元素**

- 内联元素（如：a，span，b，strong ......）的宽高是由其内容决定，如果内容为空，则宽高默认为 0
- 内联元素设置宽高属性无效

```html
<style>
  p {
    background-color: skyblue;
  }
  div {
    width: 400px;
    height: 50px;
    background-color: tomato;
  }
  span {
    width: 400px; /*不生效*/
    height: 50px; /*不生效*/
    background-color: yellow;
  }
</style>
<body>
  <p>p标签为块级元素，独占一行，默认宽度同父元素宽一样（内容宽）</p>
  <div>div是块级元素，我独占一行，同时支持宽高设置</div>
  <span>span元素，我是内联元素，我的宽高由内容决定，不支持宽高属性</span>
</body>
```

![image-20220713111853172](https://www.arryblog.com/assets/img/image-20220713111853172.49094f4e.png)

### 2、border 属性 - 边框

border 属性的三要素

```css
/* 
    1px 线宽度
    solid 线型
    red 线颜色
*/
border: 1px solid red;
```

| 常见线型值 | 描述                                             |
| :--------- | :----------------------------------------------- |
| `solid`    | 实线                                             |
| `dashed`   | 虚线                                             |
| `dotted`   | 点状线                                           |
| `double`   | 双边框                                           |
| `groove`   | 定义 3D 凹槽边框。效果取决于 border-color 值     |
| `ridge`    | 定义 3D 垄状边框。效果取决于 border-color 值     |
| `inset`    | 3D inset 边框。其效果取决于 border-color 的值。  |
| `outset`   | 3D outset 边框。其效果取决于 border-color 的值。 |
| `none`     | 无边框                                           |
| `hidden`   | 隐藏边框                                         |

![image-20211130222312600](https://www.arryblog.com/assets/img/image-20211130222312600-165783056117236.e7449770.png)

#### ① 边框的三要素小属性

| 小属性         | 描述   |
| :------------- | :----- |
| `border-width` | 线宽   |
| `border-style` | 线型   |
| `border-color` | 线颜色 |

注：

小属性是为了层叠大属性用的

```html
<style>
  div {
    width: 50px;
    height: 50px;
    /* 2px 实线 灰色边框 */
    border: 2px solid #666;
  }
  .box {
    /* 单独定义边框颜色为红色 */
    border-color: red;
  }
</style>
<body>
  <div>1</div>
  <div class="box">2</div>
  <div>3</div>
</body>
```

![image-20220706182731237](data:image/png;base64,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)

#### ② 四个方向的边框

| 属性            | 描述   |
| :-------------- | :----- |
| `border-top`    | 上边框 |
| `border-right`  | 右边框 |
| `border-bottom` | 下边框 |
| `border-left`   | 左边框 |

```css
border-left: 1px solid red;
...
```

使用方法

```html
<style>
  div {
    width: 100px;
    height: 100px;
    /* 上边框 */
    border-top: 5px solid red;
    /* 右边框 */
    border-right: 6px double blue;
    /* 下边框 */
    border-bottom: 6px dotted orange;
    /* 左边框 */
    border-left: 5px dashed skyblue;
  }
</style>
<body>
  <div></div>
</body>
```

![image-20220706183436149](data:image/png;base64,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)

> **单独去掉某一边框线 border-top、border-bottom、border-right、border-left 的属性值设为 none**

```css
/* 去掉上边框线 */
border-top: none;
....
```

#### ③ 四个方向的边框的三要素小属性

| 属性                  | 描述       |
| :-------------------- | :--------- |
| `border-top-width`    | 上边框宽度 |
| `border-top-style`    | 上边框线型 |
| `border-top-color`    | 上边框颜色 |
| `border-right-width`  | 右边框宽度 |
| `border-right-style`  | 右边框线型 |
| `border-right-color`  | 右边框颜色 |
| `border-bottom-width` | 下边框宽度 |
| `border-bottom-style` | 下边框线型 |
| `border-bottom-color` | 下边框颜色 |
| `border-left-width`   | 左边框宽度 |
| `border-left-style`   | 左边框线型 |
| `border-left-color`   | 左边框颜色 |

```html
<style>
  div {
    width: 120px;
    height: 120px;
    border: 5px solid skyblue;
    float: left;
    margin: 10px;
  }

  /* 需要单独设置某个值是：使用小属性覆盖大属性 */
  .box {
    border-top-color: red;
    border-left-style: dashed;
    border-bottom-width: 10px;
  }
</style>

<body>
  <div></div>
  <div class="box"></div>
  <div></div>
</body>
```

![image-20211130224238678](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcsAAACbCAYAAAAN+7AEAAAD70lEQVR4nO3dMU4bURSGURNBg5BoXEABHQtw75XAAsgGgrwEkmwgWQCsZHoWQAcFFDRIiIZiUqRwMY5+BSa8S3xOORLmSUbzaR5Xbzb6vu8nAMAffWq9AACoTiwBIBBLAAjEEgACsQSAQCwBIBBLAAjEEgACsQSAQCwBIBBLAAg2X/uD51cPY66DD2oxm476ed3ns8n85/dRP5OPpTs9m8x/fB31M92vmEzedr/yZEkp3enZpDv90noZNOL7pyqxpBw3zPXke6cysaQkN8714vumOrGkLDfQ9eB75iN49YDPKmMPe1BLiyGJ38Me39799/J+ukbDN+5X/7ex71eeLAEgEEsACMQSAAKxBIBg1AEfeCtDF0BFniwBIBBLAAjEEgACsQSAwIAPpdw8vQyuHe5sNVgJwJJYUsrl9ePgmglZoDXbsAAQiCUABGIJAIFYAkAglgAQiCUABGIJAIFYAkDgUAJKOXBaD1CQWFLKydFu6yUADNiGBYBALAEgEEsACMQSAAIDPpRyseIVXYZ+gNbEklJuV7z8GaA127AAEIglAARiCQCBWAJAIJYAEIglAARiCQCBWAJA4FACSjl2Wg9QkFhSyqGXPwMF2YYFgEAsASAQSwAIxBIAAgM+lHJ+9TC4tphNG6wEYMmTJQAEYgkAgVgCQCCWABCIJQAEYgkAgVgCQCCWABCIJQAETvChFKf1ABV5sgSAQCwBIBBLAAjEEgACAz6U0t09D67N97cbrARgSSwppbsXS6Ae27AAEIglAARiCQCBWAJAIJYAEIglAARiCQCBWAJA4FACSpnvOYAAqEcsKcVpPUBFtmEBIBBLAAjEEgACsQSAwIAPpVxcPw6unRztNlgJwJJYUsrt00vrJQAM2IYFgEAsASAQSwAIxBIAArEEgEAsASAQSwAIxBIAAocSUMqx03qAgsSSUg53tlovAWDANiwABGIJAIFYAkDgf5aUcrPirSP+jwm0JpaUcrnifZaL2bTBSgCWbMMCQCCWABCIJQAEYgkAgVgCQCCWABCIJQAEYgkAgUMJKOXAaT1AQWJJKSfeZwkUZBsWAAKxBIBALAEgEEsACAz4UEp39zy4Nt/fbrASgCWxpJTuXiyBemzDAkAglgAQiCUABGIJAIFYAkAglgAQiCUABGIJAIFDCShlvucAAqAesaQUp/UAFdmGBYBALAEgEEsACMQSAIJRB3zOrx7G/DjWkL8h3ou/Nf6GJ0sACMQSAAKxBIBALAEgePWAz2I2HXMdAP+M+xVv5ckSAAKxBIBALAEgEEsACDb6vu9bLwIAKvNkCQCBWAJAIJYAEIglAARiCQCBWAJAIJYAEPwCE4FwINQYufMAAAAASUVORK5CYII=)

#### ④ 去掉边框

`border-left: none;` 即：去掉左边框

```css
/* 去掉右边框 */
border-right: none;
```

#### ⑤ 边框应用场景 - 制作三角形

![image-20211130225304565](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAEACAYAAACNnDl6AAAFUklEQVR4nO3dy24bSRBE0eDA/93Ul4c3A8GyyWY/6hl1L9D7Ag+kXWY+bFsU1X+9H0DlAzUwUAMDNTBQAwM1sPeoz6f0eKzxPZ8Nf/IGea9ts6Xsb9t2f4IZ20e1s2EDQe0jqHYmbCiofRTVzoINBrXPoNoZsOGg9llUe27YBUDtK6j2nLCLgNpXUe25YBcCte+g2nPALgZq30W1x4ZdENQugWqPCbsoqF0K1R4LdmFQuySqPQbs4qB2aVS7Lyygtmug2n1gAf2uDqrdFhbQH9VDtdvAAvpPdVHturCAvqw+ql0HFtC3tUG1y8ICuls7VLsMLKAfa4tq34MF9FDtUe1rsIAerg+qfQ4W0FP1Q7WPwQJ6ur6o9j4soJfqj2q/hgX0cmOg2j9hAb3Vr96zPN/9OaSUNrDUuIdt934ElY351MBADQzUwEANDNTAQA0M1MBADQzUwEANDNTAQA0M1MBADQzUwEANDNTAQA0M1MBADQzUwEANDNTAQA0M1MBADQzUwEANDNTAQJXiRidBfT6lr6/eryja2qiBoNLKqKGg0qqowaDSiqjhoNJqqAuASiuhLgIqrYK6EKi0AupioFI66oKgUjLqoqBSKurCoFIi6uKgUhoqoJKSUAH9LgMV0B/NjwroP82NCujL5kUF9G1zogK623yogH5sLlRADzUPKqCHmwMV0FONjwro6cZGBfRS46ICerkxUQG91XiogN5uPFS63Xioz6e0bb1fMXXjoUrA3mxMVAnYG42LKgF7sbFRJWAvND6qBOzJ5kCVgD3RPKgSsAebC1UC9kDzoUrAfmhOVAnYneZFlYB909yoErAvmh9VAvavMlAlYP8oB1UC9v+yUCVglYgqLQ+biSotDZuLKi0Lm40qLQmbjyotB7sGqrQU7Dqo0jKwa6FKS8CuhyrFw66JKkXDrosqxcL+6v2A7oWdBJOkh233fgSVbe1/v6GBGhiogYEaGKiBgRoYqIGBGhiogYEaGKiBgRoYqIGBGhiogYEaGKiBgRoYqIGBGhiogYEaGKiBgRoYqIGBGhiogYEaGKiBjYX6fEaOFrZunPnUv68xgns9j9C22dLPb9t6v2ra+qO+AgX2Vn1R90CBvVw/1COgwF6qD+oZUGBP1x71Ciiwp2qLegcU2MO1Qy0BCuyh2qCWBAX2Y/VRa4ACu1td1JqgwL6tHmoLUGBfVge1JSiw/1QetQcosD8qi9oTFNjvyqGOAAqs7VKoI4ECWwB1RNDFYe+hjgy6MOx11BlAF4W9hjoT6IKw51FnBF0M9hzqzKALwR5HTQBdBPYYahLoArCfURNBw2H3UZNBg2Hfo64AGgq7PyBlN5rooZK9H2X8+mLybNL251OBnbLPQ8fATtexSXJgp+r4egBgp+nczgdgp+j8Ig9gh+/adhZgh+76yh1gh+3eHiVgh+z+cixgh6vMxjNgh6rcGjtgh6nsbkJgh6j8wklgu1dniyiwXau3GhbYbtXd9wtsl+ovcQa2eW02cwPbtHbr1oFtVtsd+sA2qf1hBGCr1+faBbBV63fCBNhq9b1LA2yV+h8bArZ4/VElYAs3BqoEbMHGQaVijYO6bfylFmoMVECL1h8V0OL1RQW0Sv1QAa1WH1RAq9YeFdDqtUUFtEntUAFtVhtUQJtWHxXQ5tVFBbRL9VAB7VYdVEC7Vh4V0O6VRQV0iMqhAjpMZVABHar7qIAO1z1UQIfsOiqgw3YNFdChO48K6PCdQwV0io6jAjpNx1ABnarPqIBO1z4qoFP2HhXQaXvYHHRLq/8sDRUP1MBADQzUwEANDNTAQA0M1MB+A2dwgPIXMpuCAAAAAElFTkSuQmCC)

```html
<style>
  .box1 {
    width: 0;
    height: 0;
    /* transparent 是透明色 */
    border: 30px solid transparent;
    border-top-color: red;
  }

  .box2 {
    width: 0;
    height: 0;
    /* transparent 是透明色 */
    border: 30px solid transparent;
    border-right-color: red;
  }

  .box3 {
    width: 0;
    height: 0;
    /* transparent 是透明色 */
    border: 30px solid transparent;
    border-bottom-color: red;
  }

  .box4 {
    width: 0;
    height: 0;
    /* transparent 是透明色 */
    border: 30px solid transparent;
    border-left-color: red;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</body>
```

#### ⑥ 圆角 border-radius 属性

- border-radius 属性的值通常为 `px`单位 ，表示**圆角的半径**

```css
border-radius: 10px;
```

![image-20211130232532181](data:image/png;base64,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)

```html
<style>
  div {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    margin: 20px;
    float: left;
  }

  .box1 {
    border-radius: 10px;
  }

  .box2 {
    border-radius: 20px;
  }

  .box3 {
    /* 圆，正方形宽度的50% */
    border-radius: 50%;
  }

  .box4 {
    /* 圆：直接给数值，正方形宽度的一半即：圆的半径 */
    border-radius: 50px;
  }
</style>

<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</body>
```

**单独设置四个圆角**

```css
/* 分别代表：上 右 下 左 四个值 */
border-radius: 10px 20px 30px 40px;
```

**小属性**

| 属性                         | 描述   |
| :--------------------------- | :----- |
| `border-top-left-radius`     | 左上角 |
| `border-top-right-radius`    | 右上角 |
| `border-bottom-left-radius`  | 左下角 |
| `border-bottom-right-radius` | 右下角 |

```html
<style>
  .box {
    border-radius: 30px;
    /* 右下角 */
    border-bottom-right-radius: 0;
  }
</style>

<body>
  <div class="box"></div>
</body>
```

![image-20211130233613322](data:image/png;base64,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)

以百分比为单位

- border-radius 属性的值也可以用百分比做单位，表示圆角起始于每条边的哪里
- 正方形盒子 设置`border-radius: 50%;` 为正圆形
- 长方形盒子 设置 `border-radius: 50%;` 为椭圆形，不能用 px 为单位

### 3、padding 属性 - 内边距

- padding 是盒子的内边距，即边框内壁到内容之间的距离
- padding 有四个方向，可以分别设置

| 属性             | 描述     |
| :--------------- | :------- |
| `padding-top`    | 上内边距 |
| `padding-right`  | 右内边距 |
| `padding-bottom` | 下内边距 |
| `padding-left`   | 左内边距 |

```html
<style>
  .box1 {
    width: 200px;
    height: 100px;
    background-color: skyblue;
    /* 上内边距 */
    padding-top: 10px;
    /* 右内边距 */
    padding-right: 20px;
    /* 下内边距 */
    padding-bottom: 30px;
    /* 左内边距 */
    padding-left: 40px;
  }
</style>

<body>
  <div class="box1">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
</body>
```

![image-20220714164731669](https://www.arryblog.com/assets/img/image-20220714164731669.69daf43f.png)

### 4、padding 的不同数值写法

从不同数值写法中找规律，总结快速记忆的方法

#### ① padding 的四数值写法

- padding 属性如果用四个数值以空格隔开进行设置
- 分别表示 （上、右、下、左）的 padding
- `padding: 上 右 下 左;`

```css
padding: 10px 20px 30px 40px;
```

**快速记忆：**

- 按照顺时针方向：上右下左 即可

#### ② padding 的三数值写法

- padding 属性如果用三个数值以空格隔开进行设置
- 分别表示 （上、左右，下）的 padding（内边距）
- `padding: 上 左右 下;`

```css
padding: 10px 20px 30px;
```

**快速记忆：**

- 还是上右下左，左没有，就跟右一样，即：上 左右 下

#### ③ padding 的二数值写法

- padding 属性如果二个数值以空格隔开进行设置
- 分别表示 （上下、左右）的 padding（内边距）
- `padding: 上下 左右;`

```css
padding: 10px 20px;
```

**快速记忆：**

- 还是上右下左，下没有，就跟上一样，左没有，就跟右一样
- 即：上下，左右

#### ④ padding 的一数值写法

```css
/* 上右下左内边距都是10px */
padding: 10px;
```

#### ⑤ padding 属性应用场景

> 如果需要设置父子间间距，即给父元素添加内边距来实现

#### ⑥ 快速灵活设置 padding 属性

```css
/* padding: 上下30px 左右为0 */
padding: 30px 0;

/* padding: 上30px 左右10px 下20px */
padding: 30px 10px 20px;

/* padding: 上30px 左右10px 下0 */
padding: 30px 10px 0;

/* 
	小属性层叠大属性
	padding: 上右下左为40px
	padding-bottom: 下为0
	或 padding: 40px 40px 40px 0; 

	更推荐（小属性层叠大属性）写法
*/
padding: 40px;
padding-bottom: 0;
```

padding 大小属性的最佳实践：

- 小属性 padding-top/padding-right/padding-bottom/padding-left 用来层叠大属性 padding 来组合使用
- 更推荐（小属性层叠大属性）写法

```html
<style>
  .box {
    width: 50px;
    border: 1px solid red;
    /* 四个方向内边距都为10px */
    padding: 10px;
  }
  .box1 {
    /* 单独控制下内边距为0 */
    padding-bottom: 0;
  }
</style>
<body>
  <div class="box">文字内容文字</div>
  <div class="box">文字内容文字</div>
  <div class="box box1">文字内容文字</div>
</body>
```

![image-20220706201354790](https://www.arryblog.com/assets/img/image-20220706201354790-165783570758846.987693b0.png)

### 5、margin 属性 - 外边距

- margin 是盒子的外边距
- 即：盒子和其他盒子之间的距离

![image-20211127181550704](data:image/png;base64,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)

#### margin 有四个方向

| 属性            | 描述     |
| :-------------- | :------- |
| `margin-top`    | 上外边距 |
| `margin-right`  | 右外边距 |
| `margin-bottom` | 下外边距 |
| `margin-left`   | 左外边距 |

```html
<style>
  .box {
    width: 50px;
    height: 50px;
    background-color: skyblue;
  }
  .box1 {
    /* 上外边距 20px */
    margin-top: 20px;
    /* 左外边距 50px */
    margin-left: 50px;
    /* 下外边距 30px */
    margin-bottom: 30px;
  }
</style>
<body>
  <div class="box box1">box1</div>
  <div class="box box2">box2</div>
</body>
```

![image-20220714224436271](https://www.arryblog.com/assets/img/image-20220714224436271.8d24e39c.png)

### 6、margin 的不同数值写法

与 padding 的数值写法类同

#### ① margin 的四数值写法

- margin 属性如果用四个数值以空格隔开进行设置
- 分别表示 （上、右、下、左）的 margin（外边距）
- `margin: 上 右 下 左;`

```css
margin: 10px 20px 30px 40px;
```

**快速记忆：**

- 按照顺时针方向：上右下左 即可

#### ② margin 的三数值写法

- margin 属性如果用三个数值以空格隔开进行设置
- 分别表示 （上、左右，下）的 margin（外边距）
- `margin: 上 左右 下;`

```css
margin: 10px 20px 30px;
```

**快速记忆：**

- 还是上右下左，左没有，就跟右一样，即：上 左右 下

#### ③ margin 的二数值写法

- margin 属性如果二个数值以空格隔开进行设置
- 分别表示 （上下、左右）的 margin（外边距）
- `margin: 上下 左右;`

```css
margin: 10px 20px;
```

**快速记忆：**

- 还是上右下左，下没有，就跟上一样，左没有，就跟右一样
- 即：上下，左右

#### ④ margin 的一数值写法

```css
/* 上右下左外边距都是10px */
margin: 10px;
```

### 7、margin 的塌陷

margin 塌陷也叫：外间距重叠 或 外边距合并 或 外边距穿透

#### ① 兄弟元素之间 ，垂直方向：上下外边距出现塌陷

- 垂直方向的 margin 有塌陷现象，第一个元素的下外边距与第二个元素的上外边距会发生合并
- 小的 margin 会塌陷到大的 margin 中，从而 margin 不叠加，只以大值为准
- 以下两盒子之间间距为 100px ，垂直方向的 margin 不叠加，以大数为准

![image-20211127211251169](data:image/png;base64,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)

```html
<style>
  .box {
    width: 200px;
    height: 100px;
  }
  .box1 {
    background-color: skyblue;
    /*下外边距 100px */
    margin-bottom: 100px;
  }
  .box2 {
    background-color: gold;
    /* 上外边距 50px */
    margin-top: 50px;
  }
</style>
<body>
  <div class="box box1"></div>
  <div class="box box2"></div>
</body>
```

解决办法：

- 任何一个元素加上 display:inline-block;
- 把外边距只加在其中一个元素上
- 任意一个元素外边距换成对应的 padding

#### ② margin 在水平方向：不会塌陷

- margin 在水平方向 不会塌陷
- margin 在垂直方向 出现塌陷

```html
<style>
  span {
    border: 1px solid red;
  }

  /* 
    margin在水平方向不会塌陷
    span标签之间的距离为: 两者之和 80px 
  */
  .span1 {
    margin-right: 30px;
  }
  .span2 {
    margin-left: 50px;
  }

  /* 
    margin在竖直方向出现塌陷
    box1,box2 两盒子之间间距为 100px
    竖直方向的margin不叠加，以大数为准 
  */
  .box1 {
    width: 200px;
    height: 100px;
    background-color: skyblue;
    margin-bottom: 100px;
  }

  .box2 {
    width: 200px;
    height: 100px;
    background-color: gold;
    margin-top: 50px;
  }
</style>

<body>
  <h1>margin 属性</h1>

  <h2>margin在水平方向：不会塌陷</h2>
  <span class="span1">我是span标签</span>
  <span class="span2">我是span标签</span>

  <h2>margin在垂直方向：出现塌陷</h2>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```

![image-20220714220940463](https://www.arryblog.com/assets/img/image-20220714220940463.473aa969.png)

#### ③ 父子元素之间，垂直方向：上外边距塌陷

当一个元素包含在另一个元素中时，如果**父元素没有设置内边距或边框把外边距分隔开**，它们的上外边距也会发生塌陷（合并）

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: gold;
    /* 父元素的上外边距 */
    margin-top: 20px;
  }
  .item {
    width: 50px;
    height: 50px;
    background-color: skyblue;
    /* 子元素的上外边距，此时父子元素的上边距发生塌陷（合并），最终上外边距的结果为 50px */
    margin-top: 50px;
  }
</style>
<body>
  <div class="box">
    <div class="item"></div>
  </div>
</body>
```

**`.item`** 的 **`margin-top:50px;`** 发生了穿透现象（塌陷）

- 穿透了父元素，并与父元素上外边距发生合并，合并后以最大的值为主。
- 所以看到的间距并不 **`.item`** 与 **`.box`** 的间距，而是 **`.box`** 与浏览器上面产生了 **`50px`** 的间距

![image-20220714222036503](https://www.arryblog.com/assets/img/image-20220714222036503.01e70600.png)

解决方案

- 给**父**元素加上 **`overflow: hidden;`**
- 给**父**元素添加 **`border`** 边框
- 将**子**元素的 margin 改成 padding
- 可以给父元添加对应的子元大小的 padding 值

还有更多方法，等我们后面学完浮动，定位之后再来讲解。

### 8、margin 负值

> 关于 margin 负值问题，我们留在 float 浮动 讲完后再学习

### 9、去掉元素的默认样式

网页中的元素为了展示元素本身的用途和结构，都会给元素添加默认的样式。

- 一些元素都有默认的 margin，如下常见的默认样式
  - h、body、ul、p 标签，都添加了默认的 margin。
  - ul 添加了默认的 padding、list-style
  - a 标签添中了默认的颜色、下划线
  - 等等 ...... （后续在项目开发中还会深入所有标签的默认样式）
- 我们在实际的网页开发中，要将这些默认的样式清除掉，也称之为 "CSS 样式的初始化"
- `*` 通配符选择器，表示选择所有元素 （通配符有效率问题，实际工作中不使用）

```css
/* 通配符选择器，表示选择所有元素 */
* {
  margin: 0;
  padding: 0;
}

/* 通配符有效率问题，应该使用并集选择器 */
body,
ul,
p {
  margin: 0;
  padding: 0;
}

a {
  /* 去掉下划线 */
  text-decoration: none;
  /* 颜色为黑色 */
  color: #000;
}

ul {
  /* 去掉圆点 */
  list-style: none;
}
```

### 10、盒子的水平居中

将盒子的左右两边的 margin 都设置为 auto ，盒子将水平居中。共有两种方法：

```css
/* 方式一， margin: 上下0 ，左右自动 */
.box {
  margin: 0 auto;
}
/* 
	方式二，margin: 上10px 水平居中 下0px 
	第二种方法的应用场景在于，需要当前盒子距离顶部 10px, 水平居中对齐，距离底部0px 类似这样的需求时使用
*/
.box {
  margin: 10px auto 0;
}
```

盒子的垂直居中，需要使用绝对定位技术实现 （后边会讲到）

```html
<style>
  section {
    width: 300px;
    height: 200px;
    background-color: salmon;
    /* 盒子水平居中 */
    /* margin: 0 auto; */
    /* margin: 上150px 水平居中对齐 下0px */
    margin: 150px auto 0;
    /* 文本内容水平居中 */
    text-align: center;
    /* 文本内容垂直居中 */
    line-height: 200px;
  }
</style>

<body>
  <section>我是文档区域标签</section>
</body>
```

![image-20220714235749577](https://www.arryblog.com/assets/img/image-20220714235749577.904c23de.png)

注：

- `margin: auto 20px;` 这样写，并不会垂直居中
- 文字水平、图片水平居中：`text-align: center;`
- div 块级元素水平居中，是给元素自身加上`margin: 0 auto;`

### 11、盒子模型占位计算

盒模型的内容区大小，可视宽高，盒模型实际占位宽度

#### ① 盒模型的内容区大小

在标准盒子模型中

content 内容区，也就是盒子里面能留给子元素的宽度和高度大小,也就意味着盒子里面的内容的最大面积就是 width 和 height 形成的矩形面积。

- 如果只有一个子元素，子元素的宽度超过父元素，就会溢出
- 如果有多个子元素，子元素（行内元素，行内块元素）的宽度加起来超过了父元素，那么超过的那些子元就会换行显示

```html
<style>
  div {
    /* 盒模型内容区大小 */
    width: 200px;
    height: 200px;
    background-color: gold;
    /* 边框 */
    border: 20px solid skyblue;
    /* 内边距 */
    padding: 50px;
    /* 外边距 */
    margin: 30px;
  }
</style>
<body>
  <div class="box">内容区，内容区内容区，内容区内容区，内容区内容区，内容区</div>
</body>
```

![image-20220715023749843](https://www.arryblog.com/assets/img/image-20220715023749843.a6f638ca.png)

#### ② 盒模型可视宽高

- 可视区宽 = 宽度 + 左右内边距 + 左右边框宽
- 可视区高 = 高度 + 上下内边距 + 上下边框宽

#### ③ 盒模型实际占位宽度

- 实际占位宽 = 宽度 + 左右内边距 + 左右边框宽 + 左右外边距
- 实际占位高 = 高度 + 上下内边距 + 上下边框宽 + 上下外边距

```html
<style>
  .box {
    /* 内容区宽 */
    width: 100px;
    /* 内容区高 */
    height: 150px;
    /* 边框线 */
    border: 2px dashed #333;
    /* 内边距 */
    padding: 10px;
  }
  .box1 {
    /* 内容区宽 */
    width: 70px;
    /* 内容区高 */
    height: 120px;
    /* 边框线 */
    border: 5px solid skyblue;
    /* 内边距 */
    padding: 10px;
    /* 背景色 */
    background-color: gold;
  }
</style>
<body>
  <div class="box">
    <div class="box1"></div>
  </div>
</body>
```

![image-20220715030129395](https://www.arryblog.com/assets/img/image-20220715030129395.a1b55ac5.png)

> 如果 box1 计算得到的占位宽超过了你元素的内容区宽，就会达不到我们相要的布局效果

提示：

- 盒模型的内容区大小：决定了父元中的子元素能占据的最大的宽和高度
- 可视区占位：我们看到的这个元素在页面层现的效果的区域
- 实际占位宽度：决定了这个元素在父元素中的占据面积（宽和高）

## 三、box-sizing 怪异盒模型

在 CSS3 中新增了怪异盒子模型（IE 盒子模型）

### 1、box-sizing 是什么 ？

- 将盒子添加 `box-sizing: border-box;`属性， 盒子的 width、height 数字就表示盒子实际占有的宽度 （不含 margin）
- 即 padding、border 变为 **内缩** 的，不再 **外扩**
- box-sizing 属性 **大量应用于移动网页制作中** ，因为它结合百分比布局、弹性布局等非常好用，在 PC 页面开发中使用较少
- box-sizing 属性兼容到 IE9

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    border: 10px solid skyblue;
    padding: 10px;
    margin: 100px auto;
    /* 
        添加 box-sizing 之前，box是外扩的，总宽度=240px
        添加 box-sizing 之后，变成内缩，总宽度=200px */
    box-sizing: border-box;
  }
</style>

<body>
  <div class="box"></div>
</body>
```

**添加 `box-sizing: border-box;` 之前**

![image-20211128000749414](https://www.arryblog.com/assets/img/image-20211128000749414.64b52537.png)

**添加 `box-sizing: border-box;` 之后**

![image-20211128000824590](https://www.arryblog.com/assets/img/image-20211128000824590.763a264e.png)

### 2、为什么 div 和 button 按钮的大小有差别 ？

```html
<style>
  .box1 {
    width: 100px;
    height: 30px;
    background-color: skyblue;
    padding: 10px;
    border: 5px solid gold;
  }

  button {
    width: 100px;
    height: 30px;
    background-color: skyblue;
    padding: 10px;
    border: 5px solid gold;
  }
</style>

<body>
  <div class="box1"></div>
  <button></button>
</body>
```

同样的代码，在 Google 浏览中为什么显示却有差异

![image-20211128002708428](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAABuCAYAAAAqJ9aBAAABvElEQVR4nO3dsW0CQRBA0TuLhALogRIpgRLpgQII14kj8x3iXeneCzeaAH2N9pB2H2OMDeCXr9kDAGsSByCJA5DEAUjiACRxAJI4AOmUp4/9n8dgSVd/gTkymwOQxAFI4gAkcQBSX0iG++v5yTmY7Ha+zB6BxdgcgCQOQBIHIIkDkMQBSOIAJHEAkjgASRyAJA5AEgcgiQOQxAFI4gAkcQCSOABJHIAkDkASByCJA5DEAUjiACRxAJI4AEkcgCQOQBIHIIkDkMQBSOIAJHEAkjgASRyAJA5AEgcgiQOQxAFI4gAkcQCSOABJHIAkDkASByCJA5DEAUjiACRxAJI4AEkcgLSPMcbb6WOfMArLub7/NDgOmwOQxAFI4gAkcQBSX0gCh2dzANIpT33KXItPikxgcwCSOABJHIAkDkDqC8lwfz0/OQc/bufL7BFg2zabA/AHcQCSOABJHIAkDkASByCJA5DEAUjiACRxAJI4AEkcgCQOQBIHIIkDkMQBSOIAJHEAkjgAqZ/D86jNWjxqwwQ2ByCJA5DEAUjiAKS+kAQOz+YAJHEAkjgASRyAJA5AEgcgiQOQxAFI4gCkb+SkIsyigD80AAAAAElFTkSuQmCC)

原因：

- button 按钮默认是 怪异盒模型
- 即：自带`box-sizing: box-border;`属性
- button 是 **`内缩`** 的 ，div 是 **`外扩`** 的

### 3、盒模型分为两种类型

标准盒模型

- `box-sizing: content-box;` 盒子的大小会因为设置的内外边距和边框而变化
- 即：外扩

![image-20211128003805440](https://www.arryblog.com/assets/img/image-20211128003805440.192d1a1f.png)

怪异盒模型

- `box-sizing: box-border;`盒子会的实际大小是设置的大小，不会因为内外边距和边框的大小而变化，
- 即：内缩

![image-20211128003936738](https://www.arryblog.com/assets/img/image-20211128003936738.89035179.png)

### 4、标准盒模型与怪异盒模型区别

区别

**标准盒模型**和 **IE 盒模型**的区别在于设置 **`width`** 和 **`height`** 属性时，所对应的范围不同：

- 标准盒模型的 width 和 height 属性的范围只包含了 **`content`** 内容区
- IE 盒模型（怪异盒模型）的 width 和 height 属性的范围包含了 **`border、padding 和 content`**
- 尺寸计算公式：
  - width = border + padding + 内容的宽度
  - height = border + padding + 内容的高度
- button 标签，是典型的怪异盒模型

### 5、盒模型转换

我们通过 box-sizing 属性来切换标准盒子模型与怪异盒子模型

- `box-sizing：content-box` 是默认值，盒子以标准盒子模型特性来渲染
- `box-sizing: border-box` 盒子以怪异盒子模型特性来渲染

```html
<style>
  .box {
    width: 100px;
    height: 150px;
    padding: 20px;
    border: 10px;
    margin: 50px;
    /*box-sizing:borde-box;*/
  }
</style>
<body>
  <div class="box"></div>
</body>
```

以上代码，在两种盒子模型下渲染的效果如下

| 标准盒子模型                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 怪异盒子模型（box-sizing:borde-box;)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![16549198837318-16549216262352](data:image/png;base64,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) | ![16549204799174](data:image/png;base64,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) |
| 标准盒模型下的`width:100px;` `height:150px;` 只包含了 content 部分，所以 content 的宽高为 100px 和 150px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 怪异盒子模型：`width:100px;` `height:150px;` 包含了 border、padding、content 三部分，则通过计算得出 content 内容区的 高为：`150px - 20px*2 - 10px*2 = 90px` 宽为：`100px - 20px*2 - 10px*2 = 40px`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

应用场景：

- 如果我们期望不管`内容区`，`边框`、`内边距`大小如何变化，元素的可视宽高始终不变时，就可以给元素添加 box-sizing:border-box;属性，以怪异盒模型来渲染。
- 不管元素的占位宽如何变化，始终保持边框和内边距不变，希望通过改变内容区大小来达到目的。
- 常见的响应式开发中、栅格系统等。
