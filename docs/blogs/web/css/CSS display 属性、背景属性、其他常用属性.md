# CSS display 属性、背景属性、其他常用属性

本节学习 CSS 中的 display 属性，background 背景属性，CSS 精灵图，线性渐变，径向渐变 等项目中常用的属性

## 一、display 属性

- display 属性的作用，块级元素、行内元素、行内块级元素，互相转换和对比，隐藏元素，空白间隙
- 中小企业和大厂面试真题解析

### 1、display 属性的作用

**`display`** 属性可以设置元素的 **内部**和 **外部** 显示类型

- 外部显示类型：
  - 元素的外部显示类型有 block 块、inline 内联等。
  - 外部显示类型将决定该元素在**流式布局**中的表现。
- 内部显示类型：
  - 内部显示类型**flex 布局**、**grid 网格布局**、**流式布局**等。
  - 元素的内部显示类型可以控制其子元素的布局方式。

**流式布局（文档流 或 常规流）**

- "文档流" 或 "流式布局" 是在对布局进行任何更改之前（默认情况下），在页面上显示 "块" 和 "内联" 元素的方式。
- 简单直白点来说，他是一种排版方式，这种排版方式规定了块级和内联元素在页面中如何排版显示。

**【流式布局】中 - 块级元素排版方式**

- 块级盒子会从包含块的顶部开始，按序垂直排列。
- 同级盒子间的垂直距离会由“margin”属性决定。
- 相邻两个块级盒子之间的垂直间距会遵循外边距折叠原则被折叠

**【流式布局】中 - 内联元素排版方式**

- 盒子会从包含块的顶部开始，按序水平排列。
- 只有水平外边距、边框和内边距会被保留。
- 这些盒子可以以不同的方式在垂直方向上对齐：可以底部对齐或顶部对其，或者按文字底部进行对齐

> 内部显示类型，我们在后面讲到 flex 弹性布局和 grid 网格布局时再来讲）

### 2、元素外部显示类型

display 通过以下属性值来指定元素的显示类型

- block 块级
- inline-block 行内块
- inline 行内

元素显示类型分为：**块级** 和 **内联** 等
内联（行内）元素又分为：**inline 内联元素**和 **inline-block 行内块元素**

#### ① block 块级元素

常见的块级元素有

`<p>、<div>、<ul>、<ol>、<li>、<h1>~<h6>、<dl> 等`

**块级元素的特点：**

- 独占一行
- 可以设置 width、height 属性。
- 在不设置宽情况下，宽默认为父元素内容区宽。
- 块级元素里可以放任意类型元素，不过要注意
- 文字类元素标签内不能放其它块元素
- p 标签里不能放 p 和 div 标签。
- h1-h6 标签里不能放 p，div 元素

```html
<style>
  /* 
       块级元素特点：
       1、不能并排显示，默认流体布局
       2、可以设置宽高
       3、默认width自动撑满
   */
  h2 {
    background-color: pink;
  }
  .box1 {
    width: 300px;
    height: 50px;
    background-color: skyblue;
  }
  .box2 {
    width: 300px;
    height: 50px;
    background-color: gold;
  }
</style>
<body>
  <h2>div块级元素</h2>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```

![image-20220715173601588](data:image/png;base64,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)

#### ② inline-block 行内块元素

以下元素具有行内块元素的特性：

`<img>、表单类元素、<video>、<audio> 等`

以上元素本质上叫 **可替换元素**（归类归到行内元素）

**行内块元素的特点：**

- 相邻的行内块（或行内）元素会在一行显示，放不下会换行。
- 相邻的行内块元素之间会有**空白间隙**（后面案例中来解答这个问题）。
- 元素默认宽为它本身内容宽
- 可设置 width、height 属性

```html
<style>
  .box {
    width: 450px;
    background-color: skyblue;
    padding: 20px;
  }
  /* 
       img 和 表单元素是具有行内块元素的特点
       它们既能设置宽度高度、也能并排显示 
   */
  img {
    width: 200px;
  }
  input {
    width: 200px;
    margin-bottom: 10px;
  }
</style>
<body>
  <div class="box">
    <input type="text" />
    <input type="text" />
    <img src="images/flower.jpg" alt="" />
    <img src="images/flower.jpg" alt="" />
    <img src="images/flower.jpg" alt="" />
  </div>
</body>
```

![image-20220715180527564](https://www.arryblog.com/assets/img/image-20220715180527564.0970deab.png)

#### ③ inline 内联（行内）元素

常见的行内元素有：

`<a>、<strong>、<span>、<i>、<del> 等`

**行内元素特点：**

- 相邻的行内元素会在一行显示，放不下时会换行显示
- 设置 width、height 属性是无效的。其宽高随其内容大小而撑开。
- 行内元素里只能放文本或其它行内元素

**注意：**

- `<a>`标签中不能再放`<a>`标签
- 但 a 标签中可以放块级元素
- 实际开发中，在某些情况下会把 a 标签转换为块级元素

```html
<style>
  /* 
       行内元素特点：
       1、并排显示，默认从左至右布局
       2、不可以设置宽高
       3、其宽高随其内容大小而撑开  
   */
  span {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>
<body>
  <span>我是span标签</span>
  <span>我是span标签</span>
  <span>我是span标签</span>
</body>
```

![image-20220715181156615](data:image/png;base64,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)

#### ④ 总结：三种元素类型对比

| 元素类型             | 排列方式       | 盒模型属性         | 内容             |
| :------------------- | :------------- | :----------------- | :--------------- |
| 块级(block)          | 独占一行       | width、height 有效 | 任意元素         |
| 行内块(inline-block) | 一行可显示多个 | width、height 有效 | 行内或行内块元素 |
| 内联（inline）       | 一行可显示多个 | width、height 无效 | 行内或文本元素   |

[点击查看，项目中常用的 HTML 元素类型分类 完整版 👆](https://www.arryblog.com/guide/html5/#_2、块级元素)

### 3、行内元素和块级元素的互相转换

我们只需要给对应的元素添加对应 display 属性值，就可以把元素转换为对应的元素类型。

- 使用 `display: block;` 即可将元素转换为 **块级元素**
- 使用`display: inline;` 即可将元素转换为 **行内元素**。不过将元素转换为行内元素的应用不多见
- 使用 `display: inline-block;` 即可将元素转换为 **行内块**

```html
<style>
  div {
    /* 转换为行内元素 */
    display: inline;
  }
  a {
    background-color: skyblue;
    /* 转换块级元素 */
    display: block;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: #fff;
    border-radius: 5px;
    margin-top: 20px;
  }
  /* 鼠标滑动到a标签上面时，背景变色 */
  a:hover {
    background-color: rgb(67, 183, 230);
  }
  span {
    background-color: gold;
    padding: 10px 20px;
    /* 转换为行内块 */
    display: inline-block;
    margin-top: 20px;
    color: #fff;
  }
</style>
<body>
  <!-- 块级元素转换为行内元素 -->
  <div>div标签</div>
  <div>div标签</div>

  <!-- 行内元素转换为块级元素 -->
  <a href="#">加入购物车 ！</a>

  <!-- 行内元素转换为行内块 -->
  <span>span标签</span>
  <span>span标签</span>
  <span>span标签</span>
</body>
```

![image-20220715182225126](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVoAAACkCAIAAABZ3HH8AAAVQ0lEQVR4nO3dPUwbacIH8P9k+LDBkgEjFl9yRBBZi5E2ESlQQLrG6AqueKU1YiWgOkGqa1YLBVJICmIkClhtc9VibWVH2ohs8UpvilPcnIQRBSh7Es6JO6Il2TOHMGDJgAlx5i3mGc+MP7DJmoCT/08p8Hg+Hj/M859nnmdwJEVRQEQEXLnoAhDRZcE4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIKBwH4YeSJE2H1RdL05IkTS8VseOlaemr4FbxBXkd7M/ec86FhW0Fv5K0oxt/LrzVmY4VfphjzzkXEpWFD9I7WJqWctNSBgj/MPwEmOzW3+t/FA5+k7lQehg+7UAlsxX8KneJ+x9pLf11cPYB8HjYafw4S9M9mQv7g68/SJGJfrOKs61+556i3DvzQQputTTd88C3qNzrNizbetTv/GJR+bE771ZFaR76URkq/VZbwW+GEYwqg82GheFpaTbwShm6dubjEV0KSiGLUwB8iwXXM61vVGjbVwEv4AsrStiHKXXdaGAgvWE0MABfuOjDpzcfCESLXP1VwGsusTdYYNPFKXX/0cCAN/BKURRFCfv0DcO+Mxyd6NLIFQeG5uENRk1xEPZBbbqvAt7MZhMNDEBrz0o06NWaxKLvlDSaWlyc0vcTDXp9Ya0x642qiEQI6wfR95Au1UAgmjPXwj5Aa8/Kog/iKNGgN3+JvYHlgFffz6JPLap2XFFOJgKVoaw4MF7l9IaRFQfZV+D0RV7J9a6iLz+tYatJZMyUIjomaiHTuxXdk6w4MBTesGa6kFnv6hVyasNenEJGphTsXBBdThlDiVvBbycxEPirdkvcPPjXwEDOi2Sz50svHi+EtHGyrb8vPIHPcwcAsOQffgxg4S/GsbcCtoJfSdLvh2+HFeV+t3b0BSWMngI7CfuHnmBq8d4d8br7fp7+yB2PD5j8mz58GXoA75ee5vQHB1a+7TcOcBawNC1JUs8/AlFlQRsv6L6nRPt/cp5hJ0SXhjkOXocWHqdbiKq59YvcWzb/od+LJwt/VxvqVuinJ97gSDcAbAW/XQkEfXh8e/xVAEN/Cb7eCn5latJbj/qNs3Hhh5IkOYe/WIwGvaZ5BEmSuicxFej/ySnlC4Wl0CTg+6NxxLG1NXeEdXumgAehsL6hb1wNviX/8BeBwADw5V8XpyZ7HoaxNG1u0uFp45Tn62C/JEndK4FXiz7TPIIkSc7hx95AED3mqROiyy/HROPt1ubshTlc8/QP4Mm/XgJqjnj7/9AMYOvRX4a/GB9qBQZaW68NLSgLQ9DfVTX/od/7eNi/BADhh1LPA9+ioij3u5sHF3L0YO4PDf2oKMri7SFnnolGb2txg/ndf/QBKy9fA0D4b5OY8nQDQHi6eyXwZ4/62bvvK8r9bsO7YlPPFCa/DW4BeB3s//0wglFFWRi61n0vR4kXhgbvKYoSDa70cKKRykeOOFh5WWT3vnnoG596sd36+8KTgX7PNQB4+S8E/myaHQz/MPxkatw0/XZtaHxK9Nu77yuKeYox+4mg8ENpeqn7nqLfR5g9eVlkk7szEhhQezTh0AOtT/H65UpG8V4HZx94Mz5F958DXvXm6NrQgqIsDJpDM+Oxq9fB/q+CGFxQ9PsIosvOHAfXWm9Du+AL4dCD/Fvf8fgwGVraCv30xPfNkNo+uu8vZDWtjM48oF6oH8ymr5xbj/oN9wLNni+94lIMYGm65x+BkTvI7VqrNyPCXocWHucrcbPnS++Tn0JbS6HJAW2f14YW7mfll5ZuhgN5+geeDP+gDz1MG+8F7nh8Wn9HfSrhtlYhRGUjo5urjtKnx8a1hwiyZxYUfYUBrzd7/F8bkDeN3ptmFqKBAeMgvHnS4VXAK4brC88yqoU0TWog18yCYc/egezxf+1ApikS88xC2Gea6TBPOixOaXMinGWk8pTjuQPjrLsvrOR+7iBNnfCfypoNFE1Cn8xXFEUxvzQ8m5DeVWas6G3sVIZnn7yBV7mfO0h/vsAADFODpuW+cGapzC8zPk5GoimKYgwyojJT+KnE92S+QuoRk33ZzHoo8BRnfDzxTDK6IfpsZfZBs568zI/dBCofksIvViciAPy+AyJKYxwQkcA4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIYBwQkcA4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIYBwQkcA4ICKBcUBEAuOAiATGAREJFdmL1vaOV3eS/zl4m+J3rtN7kSXpd7UVnY2Wjvrqiy4LnUHm/7MQ+vVgefvookpDH5muJqvnau1Fl4KKZbpZWNs7ZhZQCS1vH63tHV90KahYpjhY3UleVDnoY8WTqoyY4uA/B28vqhz0seJJVUZMccCxQyo5nlRlhBONRCQwDohIYBwQkcA4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIYBwQkcA4ICKhfOKgpX7CbfuQB+xyOU49ou1uZ+PdFu1VS/1EZ31fkbu9ae8qQQGJSizHl6N9VFrqJxx4vrr39LSVbHc7LQ7D61hs5/tN6w2rFNtP5Fm/OvGr6Vs9+mrlWGzn1KOIbW/ZpFgsvlxE2Y26XA6P7V2hD0L0m5R1HGQ2Y6ROQj+bWlpXMvk8WXvrpj328+ktUPnl19ijbbFPAGiq+kyGxdE4YT7A89W9p01yLd693obtqra4yf65BRZLxsrp9e1fX620GBdn7jZv+Yk+pDKIgz534y3RmOSJTvFTLLbz/SYMzRhoqZ+oy9x2efsI26i7Wdvjsi6vn/69b6Zrfp+jEomDGeMmTfavr14BAMsVC+RbnTIAOBonapPPUXkQ2/luU91D7N92h6fieOagUrT57fh32+k9VPw3XWCiS6YMxg6eRnZmVndCCQWpk9DqzszqwS+pM+3g6NHWCWw1g01Fb1Ft/9yS+ue6fLfTkb1VV/WVZOJgZjUZA2KxnZmY/HnlyfNNoEmuxbv9bTgqpOTbFACk3sUMG/Y5Ki3J40fpaMi183yWj98VXXqi91QGcfDbddkrLJCuO4odiXTYKi3Jk6ctlY7U23+nr+SWKxYAsN6w4r9xvdfQ56g82I8vq0dJnjyFta4SB8dZPZEm++cW5ZdYzsEIokvhU4gD6w2rlEycxCzVRV6NY7GdmUiiq/pK8uiN6U4+9S4G2QZDRgBPI+pti/WGVYodJADZJiuJrK8L7XNUWlKmDYkumzIYO9CdpN5nmK3Fcl1WfonH/w2Hx2HDdpHXZ+sNK/67ddTlcngqjmci6a0S3/+sr1Rb55ioPZ6JJNBiuS6nnm8CLZWO1Nvn2+hyXcHJiVZga10lIFd6Ohs9hmNcv9o4kR6PTCYNRyG6AGUTB44KyfAqx+U3D+tgnYxk8tE2sH18q7N6sClR1EheU9VneLu4jWXLO4+tsg8wzvB1uRwemwQgeXQ4s34E2O46xERjX62cPEouA+YnC44e/Wy+feCwIl0+5XKzYK2rhBifg2yTi95O7RqIO/bE8wSuN+d5BMgiBgK1l1eg3ilsnsQgX0s/bgTr4M1Gj/VtaDUZgzpGYB28aXEkk99vigEC48hCyWzuzfChAzpnZdI7aKr6TH6PZma765CTiYP0FXh5/fDGzdpbLVjeNK6W+H41gZb6Cci33CczqzuAdfCmbJFrJzrFfyiWrLZCTEGmr/O2WwCALlfN9RO1n28dbK6Edjh9foGoTJRHHHTZK84+DmcdvGlxpE5CpscNjh5tVX191TGYzOyl99XKycTJgc3ytSv1XbzqMxnJxMF360dQbw2sVV15/m+x5fWYOkDQ5669jozDqcvTz01kMo0dANCfp8jU5XJ4bPiFNxd0nsoiDqw3rJI+yK89FAgAkEwtKqVPzve5a6/LqeerWQ/5bccX7Q7P1fq+bUPfu8n+uSX1z9X4U9judtZ+jYPvVuPpN9UG3+VyAHkn//vcjbcqjc8U2q5ZcBA7AvA0kuvhZY4d0OVTBnHQ5aq5Lqeer2PwZuN1GQCSiQOtgeV8KtE6eLP2Ok5C2VkAAFhej8Hl8HQ66tRttZb5FAAS3/8qf91c1YUj87bmSMosoUNkgfF55GRyJtd1/v2k+yBE5+fyx4Htlg2//Lr3FEDG4Lx6z5+2uTezCZEFJwUm7ZbXY8st9RNXG+9aDhJ1lQexHf0qnX6mWN1Vetgy877DvLfMbYnKj6QY/gu9mdWdCywKfawmOhsvughUlHKZaCSic8c4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIYBwQkcA4ICKBcUBEgikOZEnKtx7R++FJVUZMcfC72sv/B45UZnhSlRFTHHQ25vnWHqL3xZOqjJjioKO+uqvJelFFoY9PV5O1o776oktBxTJ934Fqbe94dSf5n4O3qay3iIohS9Lvais6Gy3MgvKSIw6I6NPEiUYiEhgHRCQwDohIYBwQkcA4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIYBwQkcA4ICKBcUBEAuOAiATGAREJjAMiEhgHRCQwDohIMH8H/gv+Dxm/Wbv5uydZpb8dq7Tk2nN/Qyp7B0QkMA6ISGAcEJHAOCAigXFARALjgIgExgERCYwDIhIYB0QkMA6ISGAcEJHAOCAigXFAREI5x4FzDa5nZ1i/4RnaFTiLWPjJYpWWXMse2ubPsL5zDe17aChi4TmoKLxKWXCuwe7O9UYELzrEj3UeALArsGtvHvpRnbXwjR8bo+dY1HLBKi25lj3U1OVYngphvRcAMAabGwCaFDRp78b94hdhXHg4js25khfwY4mDaAeip67gXEOV4TxWtewh5cc6z9RcWKUlt1lfYIWWSSCEF72mhW3KOTX+bOV5s9CmoF2B3Q3Zg3YF7WsF1m94Brsb8Q4417Se2xhcCmqi2BgVP3/inVtWaYmNwaWgXUFNHapG0K4UvgtzrqEGiPWiZQ8tYwCAebQrkEPYnAPmP8D9Qml7B2NwzUIGYOj/NDxDkweH48Ck3lOKS4YrzzzaR7SfDVcbtbMaH4cta58bEgC07KF6Beu9otbyeeMHPDgcRxRAB1r24IzANguEEHfC9QzrvVgHXAqcUoHr4QUwVE66yy1qRoJVQZX63j6267GrbaTWuUrviAJtCqoi2I7q76YvO594lao182JRf8tYbzD3843X6rxVOof1ObEC/NgYFUMq+Rz+L6rdiEvYBXbr0baHBjeaRvDGj7f9aJvHxiheAO17gOEXXWol7B2MwTWLlB8vJLyQEIPp4lAzC/jEW28AezrnxuDqEctfjCPlzgxR+yRiEl5I2A5B9hhGZcZQnb4NG9X2oO4EiEv6ko1RbEj67y+xAvssUn6s9yLagePbaF8D5rB+WU/cw3HxQY5aTRcHu4Kj9EeuQ9OavpUD2sf3mysNgFt/93AfNbOGX9MnXqVutGunYsbJ5lzTz954xFxpOLVK57W8BnZ7DVXqB/axbajSzf8xVddRFE0jOBzHxig264ERuJ4Bo3hxjlmAUsZBw58gA28j4uVur+lUeOPXz56NcaTqUKfW9RzW0zefc0hEIN82nfSHPvH5d3vxBqjqEcudI5AB3Ea7ovWsChqDS0GTB3FJH9narEccZ9nJB+TsAYATrd6ivaZTQVycAcxh3Q+4tY8warisjeJwX680ANhHTHt3cwEArOmT/hOv0n1sa6fibi/iEVT1i1Mx2qGfvVE/UoZKUzfMV6Ut/QAg959lqmUe7QrsTmwbAndDwvHtDzBfU7o42H0JADWTuW9v0jEBAHNIAXJr5jote7C7gTpUGxaeGEZQ3u5rP43B5sRhBHIU2yHUTKJhDC7z+deyZ+potClon0XKj8N92BW0G/7Z3XgTQvXspTuDj6MAYM9zG2+sGUSQAiqyJgLaFNTUAU7DLyVqaAARpNI/s0qjprQ9jmaeigAwj/ZZyBlnb74qnUdNFIf7wAriEdjXRFM3Nuk2xdThdSmi8/KmDk3mKq2pw2FI1PO5hUIJxw5Gsd2KJo+YDokX6ijK6mcy3MgdjiM+kmdyK82JBsA2idQCTnqQimK3F7tAwzPI+0jMAdrJl1hBjQdOIJq+M+wQ5cxrHu2zaHNfllmx3V5Ur8HuRruSOTqQk3qOGgcO4hLe7qGmiK1aWKW5VI4Bc4aBgwhejMM1W+AoapW2jYghs9RLRHsRVW86IqZ2cRSBvR8No9gdg2vWMK2Qfx6h4RmaFFSey1xDSWcWxN2RHwDshS4LqSgAtI0AEe32qeiPVwHsm0+vOg/eLJh+terNhdpt25Ay58Oyh77bFDhHxY3x5RHtELeyqENToctC6iUwBocHqZCo0uJv3VmlOZ3MoeEZauq04YaOU9c2GoMcMZ/SY7C5ceg3F8aPVB1sY2KoZd08xZg5mzAG1x7Qe7bGchbnMdE4KgafjH1XUz92HlXA8f8BY5C1XFBVFtcN2jCHesMzVAFHWefckeH2DzDM3wCYw/E+bFrX17kGOXT5xr00u70iZCsNCWv8WR24ORoF3JDVXNBU5HruJRur1HRLBdhuiyt5tRMw3pq5xTxXAcZBMXX3I1pvy7za8T5qRvQFbcaEGsWb9Cib1oMrk6HEZ4Yzw20aVgRQNaJ9yDG4RoCImIw53tfHDp1ruZ/ZKqjOg1SuM0+PXgDApg/VhlHfxIp26DHY3Ej0Zm1/0ZxremkbWgHzeIE+TDOPpnQNjJoGXFv29JHtM/kUq7QODkOW1dSJK3l0EUiPDqpn73sYg82d2dtSbS4Abr1UG37DvJuav+pvcx41WT24UivhUGIvMKmNfIxkPkd16IdNfWsWsuHhgk0fUtqoiS2KeCTnvk81jyoYzjxjeM/heB/Vf9JfJiL6MNJur5i2aZtFyn8Zr2PRDli1kSR19N5YyPiCNto0Ypok3/ADbrFVxQIO93Pt+nSfZpVGkHDqQ6H6CTyKeEQ8StQ+i8S4YbCwaA1/gryvN+YG40jkqH4Lpr48hB5M0Q686BAxlJ5lOzeSohgejTiP/+4q/RhSye92nGuwRfVmkB7vyXiABObRtYIKDoKe7gP8D2Lpx5BK3t4+2So1jYyWVMseKhb00ZM27cmx7L/jyPtHItmKGAQ9XZ4Hosr5bxai5l/eKQ+E7/aed6x+JFilJZdRhxv5s6zgH4mcv/L8mwUiOgeMAyISzv9mgb3KkrsEvcqPzSl9+E8JewdEJDAOiEhgHBCRwDggIoFxQEQC44CIBMYBEQmMAyISGAdEJJj/opGIPmHsHRCRwDggIoFxQEQC44CIBMYBEQmMAyIS/h9gYId5jQwS/AAAAABJRU5ErkJggg==)

### 4、隐藏元素方法

| 属性                     | 功能     | 描述                                                                                                                                            |
| :----------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **`display:none;`**      | 隐藏元素 | 可以将元素隐藏，子孙元素全部隐藏不可见。并且只要父元素隐藏，子孙没有任何办法可见。 元素隐藏后不会占空间。就好比页面当中就没有加过这个元素一样。 |
| **`visibility:hidden;`** | 隐藏元素 | 将元素隐藏，子孙元素全部不可见，但是给子孙加上 `visibility: visible;`时，子孙可见。 隐藏后仍占其位置，会留下空白的一块区域。基本不用。          |

```html
<style>
  .sp1 {
    display: none;
  }
  /* 如果需要显示，可设为 display: inline */
  .sp2 {
    visibility: hidden;
  }
</style>
<body>
  <p>
    我在隐藏的元素前面，
    <span class="sp1">我是隐藏的元素里的内容</span>
    我在隐藏的元素后面。
  </p>
  <p>
    我在隐藏的元素前面，
    <span class="sp2">我是隐藏的元素里的内容</span>
    我在隐藏的元素后面。
  </p>
</body>
```

![image-20220707220326345](https://www.arryblog.com/assets/img/image-20220707220326345.fec9e78a.png)

补充

- **`display`** 除 **`none`** 以外的值，均为显示元素。
- **`visibility:visible;`** 为显示元素

### 5、常见大厂面试真题

面试题：

**`display:none;` 与 `visibility:hidden;` 两者的区别 ？（字节跳动）**

| 区别         | display: none                                                    | visibility: hidden                                                      |
| :----------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------- |
| 空间占据性   | 不占据空间                                                       | 占据原空间                                                              |
| 回流与渲染性 | 会产生回流与重绘                                                 | 不会产生回流，只会产生重绘                                              |
| 对子元素影响 | 子孙元素全部隐藏不可见。并且只要父元素隐藏，子孙没有任何办法可见 | 子孙元素全部不可见，但是给子孙加上 `visibility: visible;`时，子孙可见。 |

答案解析

[点击查看，完整版详细答案解析 👆](https://www.arryblog.com/interview/htmlcss/css-properties.html)

### 6、去掉行内块元素默认的空白间隙

> **行内块元素间默认产生空隙**

```html
<style>
  span {
    /* 元素转换为行内块元素 */
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 2px solid pink;
  }
</style>
<body>
  <div class="box">
    <!-- span元素转成行内块元素后，他们之间会产生空白空隙 -->
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
  </div>
</body>
```

![空隙效果图](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAA/CAIAAAC+S7maAAADB0lEQVR4nO3dsW7aQBzH8f9VfQgjwYDUtVsH8FKJN6gtInE8QjbUDYch2FvUjbEjhwTCj4CUBWeI8gSRGGLJfovrAASSQiAKwXd//T5TU3X4yfr2HDtRIrTWBMDIl6IHAJwYmgZu0DRw83XH393en33GO/388eJDuwbbtZbsG4xzGrjZdU4vvfrPaog3zgy7Btu1lmwajHMauEHTwA2aBm7QNHBzXNOp8kWUfPKUU0giseGP8qL3HLQ92IorvJYqXwjRN3HywaaTSAhRacfnGPNRSd99UJleehqSLJl50ddydTFrrOZmw2bgWpN1rjrmJvFm03eRELOG1pnyzrXnQ+pXetpyVh+U5UB51JsZXIkjx9368587IdHDIi100ZHu/rYnntcsesYe+99PE1Gtu/ymPfNv4XBGSVQPwiSr/onNPKrfbNpyi8eYmn616BnHSaJ64KlMloseckjSd4PmMKvRrOgl+7B975GPfLdH3q+Gc/jfFmf5pCWEEDfVp61PnEyVj3y3F87H0uShPJtO+qIkY7qem15JWU5Xz4gD6hj/6iNVlzIOk+dnAEOxazpVvhBujzyV6SvDL/42R47nIQU35r5/TKJKm1TWrRU95BBeTafKr7RjCufagvv4f6rVJsWPi6Jn7JaPbgKiWJbWb9NL7QlRzzXw6wCcms5Vpx03h5k2/ea4x2IxIe+boc+0Tmv9WdLmhTrR9Vybd3wwajqdTScUdox+fHnhLto64XJ14QYU/jasDxsxapqIiIK6eMW0O+NGrTugy82t/Ptc23qHMctR76ed1lS3PnvJh5XlVMuiR7yPHRd2N0eODb3c3M5pADQN3KBp4AZNAzdoGrhB08ANmgZu0DRwg6aBGzQN3KBp4AZNAzdoGrhB08ANmgZu0DRwg6aBGzQN3KBp4AZNAzdoGrhB08ANmgZu0DRwg6aBGzQN3KBp4AZNAzdoGrhB08ANmgZu0DRws/9nqt/en3HGKdg12K61ZNNgnNPAjdDLXykOwAXOaeAGTQM3aBq4QdPAzT9g1fgBdfz4wQAAAABJRU5ErkJggg==)

产生间隙原因

- 元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理
- 根据 white-space 的处理方式（默认是 normal，合并多余空白），原来 HTML 代码中的回车换行被转成一个空白符，所以元素之间就出现了空隙。
- 这些元素之间的间距会随着字体的大小而变化

**解决办法：**

- 给父元素添加 `font-size: 0px;` 同时子元素重写 font-size
- 给元素添加 float
- 图片间空隙，给图片添加 `display:block;`

#### ① 给父元素添加 font-size:0; 同时子元素重写 font-size

font-size 属性有继承性，所以父元素 `font-size:0;` 会继承到子元素 span，则子元素需要重新设置 font-size 大小

```html
<style>
  .box {
    /* 去掉以下span行内块元素间空隙 */
    font-size: 0;
  }
  span {
    /*
      font-size属性有继承性，所以父元素 font-size:0;
      会继承到子元素span，则子元素需要重新设置 font-size 大小
    */
    font-size: 16px;
  }
</style>
```

![空隙效果图](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAAA8CAIAAADwsyHiAAAC0UlEQVR4nO3cvW7aYBTG8fNWuYMuWCoDF9Al6oBZKiH1BoxAihkzsnbDMIC9Vd06Vp1sJBC+BEtdbA8VVxCJASS89BreDHwEKJAmqvDj6vlNEGU4gn+O8poPpbUWIlRv8h6A6BIGStBuDu79/JXTGER7Pn7Y3eQGJWg3J3621y+Q/e3OCV+nWBOKCDcogWOgBI2BEjQGStCeC3QZNJSXXGWUF8qClnoyRJwxGzV2AzZGWd7jXLIe1UvznuMPFwJNPKVUuR1eb5gXyEad9vtYb8Ruv6ZaAVYCqdeRb5sBEze0DdxGl0HHxnyezwWaekpFda1XgXXdef5W6W6qe+b2ntlNXJlMo2WeIx2rdqd3pe3te78p4cM814HOSn60w6aF+Uyfug4qItXu+j0kqH/y9O+kXq3vxovKlwniEj0TaNFk85nIbeVd3nOckY067Ykbj83nf/XaEs90rGBlSpT3JKf9F6f41DPsUAZ1tOc/GW5OSMbDZ627aOOJZEGr5gzip39F8BQ+0GzUUKYjTX/VgwvA7G1PcZ8iwIP8Zq/jPW77Ch1o4ill2KEMYj22cZeAiFS7q8AK7e9AF8NSz7DFXwDu9QPFDTTxVM0Ry19ojb0D1kqVW5HZHOU6w+/gqyMStsvb67TldijimEqpRoAypEhxA02GNUfcWE9t1IPREbBj3Ft7rA8sfEvETbQGe0gLGmgS9cUK7oE3Zxa09l6BSz3DDrEHBlXQQEVEQttQR4Be8CzZ43q0G8yc+QuNfFiGpQ4+1bl+uyj+W1k54esUZUJ+5IOKgoESNAZK0BgoQWOgBI2BEjQGStAYKEFjoASNgRI0BkrQGChBY6AEjYESNAZK0BgoQWOgBI2BEjQGStAYKEFjoASNgRI0BkrQGChBY6AEjYESNAZK0BgoQWOgBI2BEjQGStAYKEE79QW2RPniF9hSURxuUCIw3KAEjYEStEcqFfZWFxYYjgAAAABJRU5ErkJggg==)

#### ② 给元素本身添加 float

- 元素添加 float 后，会脱离文档流
- 父元素未添加高度时，会出现高度塌陷问题，则需要清除浮动造成的问题。

```html
<style>
  span {
    /* 元素全部左浮动后，空隙就消失了 */
    float: left;
  }
</style>
```

![空隙效果图](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAAA8CAIAAADwsyHiAAAC0UlEQVR4nO3cvW7aYBTG8fNWuYMuWCoDF9Al6oBZKiH1BoxAihkzsnbDMIC9Vd06Vp1sJBC+BEtdbA8VVxCJASS89BreDHwEKJAmqvDj6vlNEGU4gn+O8poPpbUWIlRv8h6A6BIGStBuDu79/JXTGER7Pn7Y3eQGJWg3J3621y+Q/e3OCV+nWBOKCDcogWOgBI2BEjQGStCeC3QZNJSXXGWUF8qClnoyRJwxGzV2AzZGWd7jXLIe1UvznuMPFwJNPKVUuR1eb5gXyEad9vtYb8Ruv6ZaAVYCqdeRb5sBEze0DdxGl0HHxnyezwWaekpFda1XgXXdef5W6W6qe+b2ntlNXJlMo2WeIx2rdqd3pe3te78p4cM814HOSn60w6aF+Uyfug4qItXu+j0kqH/y9O+kXq3vxovKlwniEj0TaNFk85nIbeVd3nOckY067Ykbj83nf/XaEs90rGBlSpT3JKf9F6f41DPsUAZ1tOc/GW5OSMbDZ627aOOJZEGr5gzip39F8BQ+0GzUUKYjTX/VgwvA7G1PcZ8iwIP8Zq/jPW77Ch1o4ill2KEMYj22cZeAiFS7q8AK7e9AF8NSz7DFXwDu9QPFDTTxVM0Ry19ojb0D1kqVW5HZHOU6w+/gqyMStsvb67TldijimEqpRoAypEhxA02GNUfcWE9t1IPREbBj3Ft7rA8sfEvETbQGe0gLGmgS9cUK7oE3Zxa09l6BSz3DDrEHBlXQQEVEQttQR4Be8CzZ43q0G8yc+QuNfFiGpQ4+1bl+uyj+W1k54esUZUJ+5IOKgoESNAZK0BgoQWOgBI2BEjQGStAYKEFjoASNgRI0BkrQGChBY6AEjYESNAZK0BgoQWOgBI2BEjQGStAYKEFjoASNgRI0BkrQGChBY6AEjYESNAZK0BgoQWOgBI2BEjQGStAYKEE79QW2RPniF9hSURxuUCIw3KAEjYEStEcqFfZWFxYYjgAAAABJRU5ErkJggg==)

#### ③ 去掉图片下面的空隙，给图片添加 display: block;

> 加了 display:block 之后，图片成为块级元素，独占一行

```html
<style>
  .box {
    width: 300px;
    border: 2px solid red;
  }
  img {
    width: 300px;
    /* 把图片转成块级元素，就可以消除图片与父元素向下的间隙 */
    display: block;
  }
</style>
<body>
  <div class="box"><img src="./images/flower.jpg" alt="" /></div>
</body>
```

| 图片未加`display:block;`之前的效果                                                                   | 图片加上`display:block;`去掉向下空白间隙                                                             |
| :--------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| ![image-20220716134031719](https://www.arryblog.com/assets/img/image-20220716134031719.79423d99.png) | ![image-20220716134114841](https://www.arryblog.com/assets/img/image-20220716134114841.4016242a.png) |

## 二、background 背景属性

- background 背景属性（颜色、图片、重复、位置、符合属性）
- CSS 精灵图，背景固定，背景尺寸
- 线性渐变，径向渐变，浏览器私有前缀等

### 1、background-color 背景颜色

- background-color 表示背景颜色
- 背景颜色可以用 十六进制、rgb()、rgba() 或 英文单词表示
- padding 区域是有背景颜色的

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    padding: 20px;
    /* background-color: orange; */
    /* 背景颜色及透明度 0.5 */
    background-color: rgba(245, 100, 4, 0.5);
  }
</style>
<body>
  <div class="box">1</div>
</body>
```

![image-20220707222119668](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADiCAIAAADccoyAAAADPklEQVR4nO3doYpUYQCG4bOisMHgBbjgFk0mg2BYmBtYvQG9AfEWDN7AgrAgWESLTbRtWIRNWyxOWiyCYQYsBhdEhTGZFLedMy8+T5wJ/xde/gOHgdlYrVYDrLdzUw+As8mUAJkSIFMCZEqATAmQKQHn//zox5tH4+/gP3dh9+E/vnWbEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKwBpkerp4+erDx6lXsM4mznQ5P7p9/8m9Z4vltDtYb3/5J5NR/FyevN97cbg3/zrRAEomyPTLu8Pdp0fHi2EYLs6ub72dfxp/Ay0TPPS/nX4+XgxXbtx6/vjBwd2r4w8gZ4LbdHPr5sH+ndnlzWEYhpPxz6dngkwvbW/Pxj+VsjV4IQVnkSkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgRM9bPo367tfH+9M/EG1p7blACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZEiBTAmRKgEwJkCkBMiVApgTIlACZErCxWq2m3gBncJsSIFMCZEqATAmQKQEyJUCmBPwCTak1Ec8uGnMAAAAASUVORK5CYII=)

### 2、background-image 图片

- `background-image`属性用来设置背景图片
- 图片路径要写在 `url()`圆括号中，可以是相对路径，也可以是绝对路径
- 地址相对路径是从 css 样式的位置出发

```css
background-image: url(./images/bg.jpg);
```

**案例**

- html 文件位置： `demo/index.html`
- css 文件位置：`demo/css/index.css`
- 图片文件位置：`demo/images/luobo.png`

```css
/* demo/css/index.css */
.box {
  width: 500px;
  height: 400px;
  border: 50px solid #000;
  padding: 50px 40px;
  background-color: yellow;
  background-image: url(../images/luobo.png);
}
<!-- demo/index.html -->
<head>
  <link rel="stylesheet" href="css/index.css" />
</head>
<body>
  <div class="box">内容区内容区内容区内容区内容区</div>
</body>
```

### 3、background-repeat 重复

用来设置背景图片的重复模式，在默认情况下，背景是会在 x 和 y 轴方向进行平铺。

**background-repeat 属性值**

| 值           | 描述                 |
| :----------- | :------------------- |
| `repeat;`    | x，y 均平铺 （默认） |
| `repeat-x;`  | x 平铺               |
| `repeat-y;`  | y 平铺               |
| `no-repeat;` | 不平铺               |

```html
<style>
  div {
    /* 宽度 */
    width: 200px;
    /* 高度 */
    height: 200px;
    /* 边框线 */
    border: 2px solid red;
    /* 背景图 */
    background-image: url(./images/bg48.png);
    /* 左外边距 */
    margin-left: 20px;
    /* 左浮动 */
    float: left;
  }
  .box1 {
    /* 不平铺 */
    background-repeat: no-repeat;
  }
  .box2 {
    /* y轴平铺 */
    background-repeat: repeat-y;
  }
  .box3 {
    /* x轴平铺 */
    background-repeat: repeat-x;
  }
  .box4 {
    /* x 和 y 轴平铺 */
    background-repeat: repeat;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</body>
```

![image-20211107234028659](https://www.arryblog.com/assets/img/image-20211107234028659.67c5b1eb.png)

### 4、background-position 背景图片位置

- 用来控制背景图片在盒子中显示的开始位置
- 背景图片位置默认是从 padding 区开始计算

**语法：**

```css
/* x与盒子左边距离  Y与盒子上边距离 */
background-position: x y;
```

#### ① 数值表达法

- 固定值写法

```css
/* 背景图与盒子左边20px  上边30px距离 */
background-position: 20px 30px;
```

- 单个值写法

```css
/* 表时背景图与盒子左边间距为宽的10px，垂方向居中显示 */
background-position: 10px;
```

**背景图片位置（数值表达法），应用案例**

```html
<style type="text/css">
  div {
    width: 100px;
    height: 100px;
    border: 2px solid red;
    /* 背景图片 */
    background-image: url(./images/bg.png);
    /* 背景图不重复 */
    background-repeat: no-repeat;
    /* 背景尺寸大小 */
    background-size: 50px 50px;
    /* 左浮动 */
    float: left;
    /* 左外边距 */
    margin-right: 10px;
  }
  .box1 {
    /* 水平30px 上边 20px */
    background-position: 30px 20px;
  }
  .box2 {
    /* 水平10px  垂直居中显示 */
    background-position: 10px;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```

![image-20220718111005149](data:image/png;base64,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)

#### ② 百分比表达法

百分比写法 `x% y%` ，则最后的偏移量是

- 左偏移量 =（容器 width + 左右 padding - 背景图 width）\* 百分比
- 上偏移量 =（容器 height +上下 padding - 背景图 height）\* 百分比

**语法：**

```css
background-position: x% y%;
/*
    如果盒子宽为100px 高为200px ,内边距为0 ，
	背景图宽为 50px 高为50px  
    则左边距离为 (100+0-50) * 10% = 5px;
    则上边距离为 (200+0-50) * 20% = 30px
*/
background-position: 10% 20%;
```

- **元素未设置 padding 属性**

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    border: 2px solid red;
    /* 背景图片 */
    background-image: url(flower.jpg);
    /* 背景图片大小 */
    background-size: 50px 50px;
    /* 背景图片重复度 */
    background-repeat: no-repeat;
  }
  .box1 {
    /* 
        左侧距离为 (容器宽200+0-背景图宽50) * 10 = 15px
        顶部距离为 (容器高100+0-50背景图高) * 20% = 10px 
        */
    background-position: 10% 20%;
  }
  .box2 {
    background-position: 15px 10px;
  }
</style>
<body>
  <div class="box box1"></div>
  <div class="box box2"></div>
</body>
```

![image-20220718105807201](https://www.arryblog.com/assets/img/image-20220718105807201.aa35709e.png)

- **元素设置 padding 属性值**

```css
<style>
    .box {
        padding: 50px;
        width: 200px;
        height: 100px;
        border: 2px solid red;
        background-image: url(./images/bg.png);
        background-size: 50px 50px;
        background-repeat: no-repeat;
        /*
            左偏移量=（容器width + 左右padding - 背景图width)*百分比
            左边距=((200+50*2)-50) *20%=50px
            上偏移量=（容器height +上下padding  -  背景图 height）*百分比
            上边距=((100+50*2)-50) *30%=45px
        */
        background-position: 20% 30%;
    }
    .box1 {
        background-position: 50px 45px;
    }
</style>
<body>
    <div class="box"></div>
    <div class="box box1"></div>
</body>
```

![image-20220718134146128](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATsAAAGjCAIAAADciyW+AAAgAElEQVR4nO3df0xT1+P/8VsKpUBvC9FKJaITW+O2OBOIug1/ZQHdkCAKFpmZBdQIuv2xZE5ijIEgohF/oBgz4z+LurhpncOpMQzcjChxYwQYUMBfKLQyJLaABWxpv3+cvG/Ot4Cfvc1a3+f29fhLPdZw/3jm3nvO6VHidrs5AGBEwJv+AQDgv4BiAViCYgFYgmIBWIJiAVgS6PkHEsmb+DEAYDxjlnJwjwVgyZh7LIFFWoA3a4KnXdxjAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWIJiAViCYgFYgmIBWBL4pn+Af8eVK1eamprIr3U63aJFiyIjI8lv7XZ7Q0PDb7/9Rn4bHBz85Zdf0p+trq5ubGwcHh7mOC4qKmrZsmXTp08XRuvq6iorK8mv1Wp1QkLCjBkzvH05ABNye+A499g//N92+fLlxYsX8zwfExNTUFDw+PHj0dFRMjQ4OHjp0qXY2Fie5zUaTV5e3sDAAP3Zqqqq9957T6lU8jyfn5/f0dHhdDqF0bt37+r1ep7no6KisrOzTSYTPQrgRROUyHyxFRUVixcvDg4OVqvVO3bsoJMbGBgwGo1xcXFBQUE8zxsMhr///pv+LMk1MDCQ47jPP/+8paXF4XAIo7W1tXq9PjQ0VKlUZmZm1tfX06NWq3X79u2+uUbwR6Is9qefflq8eLFcLp8yZUp+fn5bW5sQVX9///nz5xcsWCCTyVQqVU5OTnd3N/1ZOtcvvviiubn55cuXwujt27f1er1CoVCpVOvXr6+rq6NHe3p6srKyDAaDby4T/JH4iqVz3blzp8lkEnK12Wznzp17//33g4ODIyIiNm3a9OjRI+GDLperurqazrWlpYUOsqamRq/XK5VKlUq1YcOGu3fvjoyMCKNPnjzJzMyMjIz86quvfHax4HdEVizJNSQkhOTa2toqJGez2b777rv4+Pjg4OBJkyZt3rz53r17wgcdDkdVVdW8efOkUil5GPa4u966dSsjI0OlUoWHhxsMhtra2uHhYWH04cOH69ev53me5/mioiKfXS/4HTEVS95dhbsrnavVaj179uyiRYvkcvnkyZO3bNnS1tYmfHBkZKSysjI2NlYikXAct23bNo+7661bt/R6fXh4eHh4eFZW1p07d+hc29vbP/vsM6VSKZfLV65c2dHR4bNLBr8jmmLJzPBEuZ45c4aMqtXq3Nzc1tZW4YNDQ0PXr19fsGABmSTfunVra2srPZlE55qdnX379u2hoSFhtKWlheQaGhqanJz8+++/++ySwR+Jo9iff/6ZzAyPm+vp06eXLFlCHpXz8vL++usv4YN2u/3atWsffvghx3EBAQG5ubkeSzVCrhEREdnZ2TU1NXSuTU1NGzZsUCqVCoUiJSWltrbWZ5cMfkocxZaUlPA8r1ar8/PzTSaTx9116dKlISEhkZGRW7dubWxsFD41ODh49erVJUuWcBwnk8k2b97c1tYmrNm63e6ampqMjAzh7uqRa0NDg8FgIGu2KSkpt27d8tn1gv8STbExMTE7duygF3LI3XWiXAcGBq5cubJs2TKO40JCQjZu3NjW1uZyuYS/QBZyyFTT2Fzr6+sNBgPP80qlMjU19ebNmz67WPBroim2oKCgo6ODzvXMmTPkYZjk2tDQIPz9/v7+y5cvf/TRRxzHKRSKnJwc+s3W/Z9tEkqlkkw1eby7/vnnn0Kuq1ev/vXXX4Wh0dHR3t5eL18u+DFxFHvhwoXHjx8L7582m+3s2bNkmWfcXCsqKhISEjiOUyqV2dnZLS0t9L9GNiGSbRIGg+HOnTvj5qpSqVavXn3jxg1hyOl0dnd3V1RUePlywY+Jo9inT58K759k3ZUs5EyZMsXjYdhms1VUVCQmJnIcR+6fzc3N9D/1xx9/kE2IZJuEx7qr8DCsUqnWrFlTXV0tDDmdzkePHpWWlpaUlHj5csGPiaNYQX9//7lz5+Lj48lCTl5e3thcly9fznFcRESEwWCg541dLld9fb1er5fL5Uqlcv369Xfv3qVzJVNNQq5VVVXCkNPpfPjwYVFRkU6nQ7HgRWIqdmBg4Pz582QT4uTJk3Nzc+kgycMwnWtTU5Mw6nQ6Gxoa9Ho9+XpAZmZmXV0dvQmxsbFxw4YNwrsrfXd1OBwPHjzYs2ePRqPheR7FgheJptjBwUGj0bhgwQKyCXHLli30ZBLJlTwMj83V4XA0NDRkZGQEBAQoFAq9Xl9fX0/veWpubiabEEmu9Lurw+G4f/9+cXHx1KlTg4KC4uLizp8/75tLBn8kjmJfvHhx6dKluLg4mUwWERFBVlaF0YGBgcuXL5OpprG5vnz5sqGhYd26dRzHhYWFpaWlNTY20nueTCZTZmamQqHgeT41NZWeGaZzlclkcXFxP/zwg28uGfyUOIq9fft2bGxsUFCQSqXatGkTvcV/cHDwypUrZCGHbOIfm2tmZqZEIgkLC1u1alVLSwu95+n+/ft6vT4sLIzsaqLXXZ1O54MHD+hcv//+e99cL/gvcRRL9jzxPJ+Tk0N/gc5ut1+9epVsk1AqlVlZWfSbLcn1008/lUgkCoUiOTm5vb2d3vPU2dmZlpYWFhYWGhrqsauJTDXt2bMHuYJPiaZYjUZjMBjor6cPDQ1du3aNbEJUKBTZ2dn0Qs7YXO/du0fvebJYLCkpKaGhoXK5PDk5md4zTBZyioqKNBoNeXdFruAjoik2Ly+PPvxlZGTk+vXrZIt/SEhITk4OvU2CTDWRh2GSq8dX5J49e5aUlCSXy2UyWVJSEv2NnNHR0c7OzsLCQo1GExgY6PHu6nK56O0WAP8ycRR76NAh+mg1h8NRWVlJvkAnk8k2btxIzxuThZx169ZNlOvg4GBiYmJwcHBgYOCKFSvq6+uFIZfL1dXVVVBQEBkZKZVKPWaGXS5Xf3+/0Wj05rWCfxNHsTSXy1VVVRUbG0u+QOcxb+xyuchCDpkZJg/D9McdDsfSpUtlMplEIklMTKSnqdxut9ls3r17d2RkpEQiiYuLu3DhAj1qs9lOnz6N9VjwIvEVW11dPW/ePHKaRG5ursc3csiupoCAADIz3N7eTo+63e74+HiZTMZxXEJCQmtrq8eb7a5duzQaDcdx8+fPNxqN9DSV1WotLy8PDw9HseBFIiuWnIRIzmraunWryWSioyJ7hoOCghQKRVpaWktLCz06MjIi5JqYmNja2kqPms3mnTt3RkVFSSSShQsXXrx4kd5i0dfXV1ZWFhISgj1P4F1iKpY+uHTbtm2tra1jjwWXy+U8z+v1+sbGRnrUarWSh2EhV3rUbDbn5+dPmzYtICDggw8+MBqN9PRSb2/v4cOHlUol2aGBPU/gRaIp9rWPBXe5XGazOSEh4RW57tixIzo6WiqVxsfHG43GFy9eCKM9PT0HDx6cNGkSx3FqtfrUqVODg4M+u2rwO+Io9rWPBR8dHX348OHHH38cHBwskUjIu6tHrl9//fX06dOlUumiRYuMRiM9KW2xWA4cOED+L5+pU6eePHnSZrP57KrBH4mjWOGh9L86Fnx0dNRkMiUnJ8vl8sDAwLHvrt3d3du3b58xY4ZUKl2yZInRaOzv7xdGzWbz/v37o6KiOI6Ljo4+ceLE8+fPfXbJ4KfEUSzZpfhfHQvudDobGxtTU1NDQ0NlMtmKFSuampromWGz2eyRK33/7O7u3rdvX3R0NMdxM2fOPH78eF9fn8+uF/yXaIrNz8//58eCOxyOurq6NWvWhIWFyeXypKQkepuE+z8Pw3SuVqtVGO3q6iopKXnrrbc4jtNqteXl5TjbCXxEHMV+++239LFs7lceC/7y5cva2tr09HSyxX/sseBkqom8u47N9cmTJ3v37p05cybHcbNnzz569Ci9O9Jut//4449evlzwY+IotrOz8x8eCz4yMlJTU7N27VqFQjHuseBkIYfMDI+ba3Fx8axZsziOmzNnTllZ2dOnT4VRq9V67NgxrMeCF4mjWNorjgUfHh6+efMm+c+axz0W3GKx7Ny5c9q0acLMMP3uSu6uWq2W47i33377yJEjFotFGO3r6ystLZ07dy6KBS8SWbGvOBZ8aGjoxo0bGRkZ4x4LTlZld+3aFRUVFRAQQNZd6ZlhOtd33nnHI9fe3t6DBw/GxMRgzxN4l5iKfcWx4Ha7vaqqitxdxz0WvKura/fu3RqNRiKRkF1N9LoreRgmub777rtHjhwxm83CaE9Pz6FDh2bNmiWVSnU6Hd5jwYtEU+wrjgW32+2//PLL2rVrJzoWvLOzk3yBjuO4hQsXeuxq6urq2rt3L3l3JXdXOleLxXLo0CGtVhsYGBgTE1NcXExPRAH8y8RR7CuOBX/x4kVlZWV6evorjgUvLCwkX6CbP3/+xYsX6T3D3d3dJSUlZGaYvLt65Hr48GGSq1arLSoq6unp8dlVgz8SR7FkB8XYY8FJrmlpaa8+Flyj0ZCvpxuNRnpF12w279u3j6y7zpkzx+Pd1WKxHDlyRKfTkVwLCwuRK3idaIqNioryOBacPAyvWbPm/zwWnBz+cuHCBXqLosVi2b9/P9nVNHv27LKysoly1el0BQUF9DIPgLeIptjs7Gz6WHAy1ZSamvp6x4L39PQcOHCA7BnWarVHjx6lgyQPw0KuhYWFyBV8RBzFnjp1ymQyCXueyEJOSkrK6x0LTpZqyETUzJkzy8vL6ckkMjNM3l2RK/iaOIp99OiRsOeJbJNITk5+vWPB+/r6Dh8+TL7vGh0dffz4cXrPcG9vr5CrVqvFwzD4mjiKFZBNiElJSa93LLjVai0rKyNf3Js6deqJEyfob+T09fUdPHhw1qxZwlQTcgVfE1OxZIv/8uXLX+NYcJfLZbPZysvLQ0JCyGkSJ0+epL/varVaS0tLY2JipFJpTEwMFnLgzRBTsU1NTatWrVKr1TzPr1y50uNY8O7u7tLSUp1Ox/P82GPB+/v7T58+HR4ezvN8RETEqVOn6B3Fdrv92LFjc+fO5Xlep9MVFxcjV3gzJihR4na7OZpEwnEc5/GH/2O++eab58+fk1+np6eTTYXEs2fP7ty509zcTH6r1WrT09OF0eHh4atXr7a3twujn3zySVhYmPAXLl26ZDKZyK/nzJkTHx+vVqu9ei0A45ugRCaLBRC/CUoMeAM/CgC8LhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8ASFAvAEhQLwBIUC8CSwPH/WCLx7Y8BAP8I7rEALEGxACxBsQAsmeA91u327Y8BAP+/CeaScI8FYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgCYoFYAmKBWAJigVgSeCb/gH+HVeuXGlqaiK/1ul0ixYtioyMJL+12+0NDQ2//fYb+W1wcPCXX35Jf7a6urqxsXF4eJjjuKioqGXLlk2fPl0Yraurq6ysJL9Wq9UJCQkzZszw9uUATMjtgePcY//wf9vly5cXL17M83xMTExBQcHjx49HR0fJ0ODg4KVLl2JjY3me12g0eXl5AwMD9Gerqqree+89pVLJ83x+fn5HR4fT6RRG7969q9freZ6PiorKzs42mUz0KIAXTVAi88VWVFQsXrw4ODhYrVbv2LGDTm5gYMBoNMbFxQUFBfE8bzAY/v77b/qzJNfAwECO4z7//POWlhaHwyGM1tbW6vX60NBQpVKZmZlZX19Pj1qt1u3bt/vmGsEfibLYn376afHixXK5fMqUKfn5+W1tbUJU/f3958+fX7BggUwmU6lUOTk53d3d9GfpXL/44ovm5uaXL18Ko7dv39br9QqFQqVSrV+/vq6ujh7t6enJysoyGAy+uUzwR+Irls51586dJpNJyNVms507d+79998PDg6OiIjYtGnTo0ePhA+6XK7q6mo615aWFjrImpoavV6vVCpVKtWGDRvu3r07MjIijD558iQzMzMyMvKrr77y2cWC3xFZsSTXkJAQkmtra6uQnM1m++677+Lj44ODgydNmrR58+Z79+4JH3Q4HFVVVfPmzZNKpeRh2OPueuvWrYyMDJVKFR4ebjAYamtrh4eHhdGHDx+uX7+e53me54uKinx2veB3xFQseXcV7q50rlar9ezZs4sWLZLL5ZMnT96yZUtbW5vwwZGRkcrKytjYWIlEwnHctm3bPO6ut27d0uv14eHh4eHhWVlZd+7coXNtb2//7LPPlEqlXC5fuXJlR0eHzy4Z/I5oiiUzwxPleubMGTKqVqtzc3NbW1uFDw4NDV2/fn3BggVkknzr1q2tra30ZBKda3Z29u3bt4eGhoTRlpYWkmtoaGhycvLvv//us0sGfySOYn/++WcyMzxurqdPn16yZAl5VM7Ly/vrr7+ED9rt9mvXrn344YccxwUEBOTm5nos1Qi5RkREZGdn19TU0Lk2NTVt2LBBqVQqFIqUlJTa2lqfXTL4KXEUW1JSwvO8Wq3Oz883mUwed9elS5eGhIRERkZu3bq1sbFR+NTg4ODVq1eXLFnCcZxMJtu8eXNbW5uwZut2u2tqajIyMoS7q0euDQ0NBoOBrNmmpKTcunXLZ9cL/ks0xcbExOzYsYNeyCF314lyHRgYuHLlyrJlyziOCwkJ2bhxY1tbm8vlEv4CWcghU01jc62vrzcYDDzPK5XK1NTUmzdv+uxiwa+JptiCgoKOjg461zNnzpCHYZJrQ0OD8Pf7+/svX7780UcfcRynUChycnLoN1v3f7ZJKJVKMtXk8e76559/CrmuXr36119/FYZGR0d7e3u9fLngx8RR7IULFx4/fiy8f9pstrNnz5JlnnFzraioSEhI4DhOqVRmZ2e3tLTQ/xrZhEi2SRgMhjt37oybq0qlWr169Y0bN4Qhp9PZ3d1dUVHh5csFPyaOYp8+fSq8f5J1V7KQM2XKFI+HYZvNVlFRkZiYyHEcuX82NzfT/9Qff/xBNiGSbRIe667Cw7BKpVqzZk11dbUw5HQ6Hz16VFpaWlJS4uXLBT8mjmIF/f39586di4+PJws5eXl5Y3Ndvnw5x3EREREGg4GeN3a5XPX19Xq9Xi6XK5XK9evX3717l86VTDUJuVZVVQlDTqfz4cOHRUVFOp0OxYIXianYgYGB8+fPk02IkydPzs3NpYMkD8N0rk1NTcKo0+lsaGjQ6/Xk6wGZmZl1dXX0JsTGxsYNGzYI76703dXhcDx48GDPnj0ajYbneRQLXiSaYgcHB41G44IFC8gmxC1bttCTSSRX8jA8NleHw9HQ0JCRkREQEKBQKPR6fX19Pb3nqbm5mWxCJLnS764Oh+P+/fvFxcVTp04NCgqKi4s7f/68by4Z/JE4in3x4sWlS5fi4uJkMllERARZWRVGBwYGLl++TKaaxub68uXLhoaGdevWcRwXFhaWlpbW2NhI73kymUyZmZkKhYLn+dTUVHpmmM5VJpPFxcX98MMPvrlk8FPiKPb27duxsbFBQUEqlWrTpk30Fv/BwcErV66QhRyyiX9srpmZmRKJJCwsbNWqVS0tLfSep/v37+v1+rCwMLKriV53dTqdDx48oHP9/vvvfXO94L/EUSzZ88TzfE5ODv0FOrvdfvXqVbJNQqlUZmVl0W+2JNdPP/1UIpEoFIrk5OT29nZ6z1NnZ2daWlpYWFhoaKjHriYy1bRnzx7kCj4lmmI1Go3BYKC/nj40NHTt2jWyCVGhUGRnZ9MLOWNzvXfvHr3nyWKxpKSkhIaGyuXy5ORkes8wWcgpKirSaDTk3RW5go+Ipti8vDz68JeRkZHr16+TLf4hISE5OTn0Ngky1UQehkmuHl+Re/bsWVJSklwul8lkSUlJ9DdyRkdHOzs7CwsLNRpNYGCgx7ury+Wit1sA/MvEUeyhQ4foo9UcDkdlZSX5Ap1MJtu4cSM9b0wWctatWzdRroODg4mJicHBwYGBgStWrKivrxeGXC5XV1dXQUFBZGSkVCr1mBl2uVz9/f1Go9Gb1wr+TRzF0lwuV1VVVWxsLPkCnce8scvlIgs5ZGaYPAzTH3c4HEuXLpXJZBKJJDExkZ6mcrvdZrN59+7dkZGREokkLi7uwoUL9KjNZjt9+jTWY8GLxFdsdXX1vHnzyGkSubm5Ht/IIbuaAgICyMxwe3s7Pep2u+Pj42UyGcdxCQkJra2tHm+2u3bt0mg0HMfNnz/faDTS01RWq7W8vDw8PBzFgheJrFhyEiI5q2nr1q0mk4mOiuwZDgoKUigUaWlpLS0t9OjIyIiQa2JiYmtrKz1qNpt37twZFRUlkUgWLlx48eJFeotFX19fWVlZSEgI9jyBd4mpWPrg0m3btrW2to49Flwul/M8r9frGxsb6VGr1UoehoVc6VGz2Zyfnz9t2rSAgIAPPvjAaDTS00u9vb2HDx9WKpVkhwb2PIEXiabY1z4W3OVymc3mhISEV+S6Y8eO6OhoqVQaHx9vNBpfvHghjPb09Bw8eHDSpEkcx6nV6lOnTg0ODvrsqsHviKPY1z4WfHR09OHDhx9//HFwcLBEIiHvrh65fv3119OnT5dKpYsWLTIajfSktMViOXDgAPm/fKZOnXry5EmbzeazqwZ/JI5ihYfS/+pY8NHRUZPJlJycLJfLAwMDx767dnd3b9++fcaMGVKpdMmSJUajsb+/Xxg1m8379++PioriOC46OvrEiRPPnz/32SWDnxJHsWSX4n91LLjT6WxsbExNTQ0NDZXJZCtWrGhqaqJnhs1ms0eu9P2zu7t737590dHRHMfNnDnz+PHjfX19Prte8F+iKTY/P/+fHwvucDjq6urWrFkTFhYml8uTkpLobRLu/zwM07larVZhtKurq6Sk5K233uI4TqvVlpeX42wn8BFxFPvtt9/Sx7K5X3ks+MuXL2tra9PT08kW/7HHgpOpJvLuOjbXJ0+e7N27d+bMmRzHzZ49++jRo/TuSLvd/uOPP3r5csGPiaPYzs7Of3gs+MjISE1Nzdq1axUKxbjHgpOFHDIzPG6uxcXFs2bN4jhuzpw5ZWVlT58+FUatVuuxY8ewHgteJI5iaa84Fnx4ePjmzZvkP2se91hwi8Wyc+fOadOmCTPD9LsrubtqtVqO495+++0jR45YLBZhtK+vr7S0dO7cuSgWvEhkxb7iWPChoaEbN25kZGSMeyw4WZXdtWtXVFRUQEAAWXelZ4bpXN955x2PXHt7ew8ePBgTE4M9T+BdYir2FceC2+32qqoqcncd91jwrq6u3bt3azQaiURCdjXR667kYZjk+u677x45csRsNgujPT09hw4dmjVrllQq1el0eI8FLxJNsa84Ftxut//yyy9r166d6Fjwzs5O8gU6juMWLlzosaupq6tr79695N2V3F3pXC0Wy6FDh7RabWBgYExMTHFxMT0RBfAvE0exrzgW/MWLF5WVlenp6a84FrywsJB8gW7+/PkXL16k9wx3d3eXlJSQmWHy7uqR6+HDh0muWq22qKiop6fHZ1cN/kgcxZIdFGOPBSe5pqWlvfpYcI1GQ76ebjQa6RVds9m8b98+su46Z84cj3dXi8Vy5MgRnU5Hci0sLESu4HWiKTYqKsrjWHDyMLxmzZr/81hwcvjLhQsX6C2KFotl//79ZFfT7Nmzy8rKJspVp9MVFBTQyzwA3iKaYrOzs+ljwclUU2pq6usdC97T03PgwAGyZ1ir1R49epQOkjwMC7kWFhYiV/ARcRR76tQpk8kk7HkiCzkpKSmvdyw4WaohE1EzZ84sLy+nJ5PIzDB5d0Wu4GviKPbRo0fCnieyTSI5Ofn1jgXv6+s7fPgw+b5rdHT08ePH6T3Dvb29Qq5arRYPw+Br4ihWQDYhJiUlvd6x4FartaysjHxxb+rUqSdOnKC/kdPX13fw4MFZs2YJU03IFXxNTMWSLf7Lly9/jWPBXS6XzWYrLy8PCQkhp0mcPHmS/r6r1WotLS2NiYmRSqUxMTFYyIE3Q0zFNjU1rVq1Sq1W8zy/cuVKj2PBu7u7S0tLdTodz/NjjwXv7+8/ffp0eHg4z/MRERGnTp2idxTb7fZjx47NnTuX53mdTldcXIxc4c2YoESJ2+3maBIJx3Gcxx/+j/nmm2+eP39Ofp2enk42FRLPnj27c6Gfm14AAAIdSURBVOdOc3Mz+a1Wq01PTxdGh4eHr1692t7eLox+8sknYWFhwl+4dOmSyWQiv54zZ058fLxarfbqtQCMb4ISmSwWQPwmKDHgDfwoAPC6UCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEtQLABLUCwAS1AsAEsCx/9jicS3PwYA/CO4xwKwZMw91u1+Ez8GAPwjuMcCsATFArAExQKwBMUCsOT/AQEE3dBX3HaxAAAAAElFTkSuQmCC)

- **单个值写法**

语法

```css
/*
	如果容器宽为200px 高为100px ，padding为0 ，背景图片宽为50px 高为50px;
	则背景图片与容器左边（水平）距离为 (200-50)*10%=15px
	则背景图在垂直方向上居中显示
*/
background-position: 10%;
<style type="text/css">
    div {
        width: 200px;
        height: 100px;
        border: 2px solid red;
        /* 背景图片 */
        background-image: url(bg.png);
        /* 背景图不重复 */
        background-repeat: no-repeat;
        /* 背景尺寸大小 */
        background-size: 50px 50px;
        /* 左外边距 */
        margin-right: 10px;
    }
    .box1 {
        /*
        	背景图与容器左边距离（水平）为 (200-50)*10=15px
        	背景图与容器在垂直方向上居中显示
        */
        background-position: 10%;
    }
    .box2 {
        /* 水平15px  垂直居中显示 */
        background-position: 15px;
    }
</style>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
```

![image-20220718111610441](data:image/png;base64,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)

- **负值情况**

```html
<style>
  div {
    width: 200px;
    height: 100px;
    border: 2px solid red;
    /* 背景图片 */
    background-image: url(bg.png);
    /* 背景图不重复 */
    background-size: 50px 50px;
    background-repeat: no-repeat;
    /* 左外边距 */
    margin-right: 10px;
  }
  .box1 {
    /* 水平-15px 上边 -30px */
    background-position: -15px -30px;
  }
  .box2 {
    /* 
        左边 (200-50) * (-10%) = -15px 
        上边 (100-50) * -60% = -30px
    */
    background-position: -10% -60%;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```

![image-20220718112610559](data:image/png;base64,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)

#### ③ 关键词表达法

- 可以用 `（top、bottom）`、`（center）`、`（left、right）` 三组中的任意两个组中的一个值组合来确定位置
- 也可以用三以上中的单个词来确定位置

```css
/* 左上角 */
background-position: top left;
/* 左边中间 */
background-position: left center;
/* 上中间 */
background-position: top;
....
```

**单一关键字与对应组合关键字表示法**

| 单一关键字 | 等价的组合关键字               |
| :--------- | :----------------------------- |
| center     | center center                  |
| top        | top center 或 center top       |
| bottom     | bottom center 或 center bottom |
| right      | right center 或 center right   |
| left       | left center 或 center left     |

```html
<style>
  div {
    width: 110px;
    height: 100px;
    /* 内边距 */
    padding: 10px;
    border: 2px solid red;
    /* 浮动 */
    float: left;
    /* 左外边距 */
    margin-right: 10px;
    /* 文本水平居中 */
    text-align: center;
    /* 文本垂直居中 */
    line-height: 100px;
    /* 文字颜色 */
    color: red;
    /* 背景图片 */
    background-image: url(images/bg.png);
    /* 背景不重复 */
    background-repeat: no-repeat;
  }
  /* 左上角 */
  .box1 {
    background-position: left top;
  }
  /* 左中间 */
  .box2 {
    background-position: left center;
    line-height: 20px;
  }
  /* 左下角 */
  .box3 {
    background-position: left bottom;
  }
  /* 右上角 */
  .box4 {
    background-position: right top;
  }
  /* 右中间 */
  .box5 {
    background-position: right center;
    line-height: 20px;
  }
  /* 左下角 */
  .box6 {
    background-position: right bottom;
  }
  /* 上中间 */
  .box7 {
    background-position: top center;
  }
  /* 水平垂居中 */
  .box8 {
    background-position: center center;
    line-height: 20px;
  }
  /* 水平垂居中 */
  .box9 {
    background-position: center;
    line-height: 20px;
  }
</style>
<body>
  <div class="box1">left top</div>
  <div class="box2">left center</div>
  <div class="box3">left bottom</div>
  <div class="box4">right top</div>
  <div class="box5">right center</div>
  <div class="box6">right bottom</div>
  <div class="box7">top center</div>
  <div class="box8">center center</div>
  <div class="box9">center</div>
</body>
```

![image-20220707231045351](https://www.arryblog.com/assets/img/image-20220707231045351.f36aef42.png)

### 5、background 复合属性

- 常用的背景相关小属性，可以合写到一条 background 属性中
- background 是的 background-color、background-image、background-repeat、background-position 的简写
- 工作中用的非常多

**语法**

```css
.box1 {
  /* 
        background 综合属性
        #fff 背景颜色
        url(./images/yingtao.png) 背景图片
        no-repeat 背景不重复
        center center 背景位置
  */
  background: #fff url(./images/yingtao.png) no-repeat center center;
  background-size: contain;
}

.box2 {
  background: skyblue url(./images/yingtao-two.png) no-repeat center center;
}
```

![image-20211202183335901](https://www.arryblog.com/assets/img/image-20211202183335901.19c8fbf5.png)

background 复合写法，其后面的值如果省略未写，会以默认值代替。

```css
/*
    省略的 背景色为透明
    images/bg.png 背景图地址
    no-repeat 背景图不重复
    center 背景图居中显示
*/
background: url(images/bg.png) no-repeat center;
<style>
    .box {
        width: 200px;
        height: 100px;
        border: 2px solid skyblue;
    }
    .box1 {
        /* 背景颜色为红色 */
        background-color: red;
        /*
            省略的背景色为透明
            images/bg.png 背景图地址
            no-repeat 背景图不重复
            center 背景图居中显示
            写在后面的背景色透明，会覆盖前面的red
        */
        background: url(./images/bg.png) no-repeat center;
    }
    .box2 {
        /*
            省略的背景色为透明
            images/bg.png 背景图地址
            no-repeat 背景图不重复
            center 背景图居中显示
        */
        background: url(./images/bg.png) no-repeat center;
        /* 背景颜色为红色 会覆盖上面复合写法中的默认的背景色-背景色透明*/
        background-color: red;
    }
</style>
<body>
    <div class="box box1"></div>
    <div class="box box2"></div>
</body>
```

![image-20220718153320954](https://www.arryblog.com/assets/img/image-20220718153320954.a771c805.png)

### 6、CSS 精灵图

- 将多个 **小图标** 合并制作到一张图片上
- 使用 `background-position`属性单独显示其中一个
- 这样的技术叫做 **CSS 精灵技术** ，也叫作**CSS 雪碧图**
- CSS 精灵可以减少 HTTP 请求数，加快网页显示速度，但缺点也很明显：不方便测量，后期改动麻烦

**类比法 - 方便理解**

- 就好比你有 20 本本子，要从 1 楼拿到 20 楼，如果你一次拿一本，就要拿 20 次，如果你一次性把这 20 本本子拿上去，只需要拿一次就完成
- 这里一定要注意是小图，不是大图
- 就好比 20 本子你一次拿上去不费力，但是如果是 20 张桌子，那你还是得一张一张搬上去

**查找百度 CSS 精灵图**

- 点击 **百度首页 logo** 进入**百度热搜**

  ![image-20211201224156968](https://www.arryblog.com/assets/img/image-20211201224156968.127aa74e.png)

- 使用 PS 的切片工具，选中精灵图，测量尺寸和坐标位置

![image-20211201232416046](https://www.arryblog.com/assets/img/image-20211201232416046.50530f10.png)

```html
<style>
  body,
  p {
    margin: 0;
    padding: 0;
  }
  i {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(images/icons.png);
    /* 文字和图标居中对齐 */
    vertical-align: middle;
    /* 相对定位 */
    position: relative;
    /* 向上移动 2px */
    top: -2px;
  }
  .word {
    background-position: -288px -192px;
  }
  .excel {
    background-position: -312px -192px;
  }
  .ppt {
    background-position: -336px -192px;
  }
  .pdf {
    background-position: -360px -192px;
  }
  .bbd {
    background-position: -168px -192px;
  }

  /* 通过 ::after 伪元素，添加图标 */
  .doctor::after {
    display: inline-block;
    content: '';
    width: 16px;
    height: 16px;
    background: url(images/icons.png);
    background-position: -144px -192px;
    /* 上下居中，通过相对定位移动元素 */
    position: relative;
    top: 2px;
  }
  p,
  div {
    margin: 20px;
  }
</style>
<body>
  <p>
    wordx
    <i class="word"></i>
    xxxx
  </p>
  <p>
    excel文档
    <i class="excel"></i>
  </p>
  <p>
    PPT文档
    <i class="ppt"></i>
  </p>
  <p>
    PDF文档
    <i class="pdf"></i>
  </p>
  <p>
    太棒啦
    <i class="bbd"></i>
  </p>
  <div class="doctor">严防严控</div>
</body>
```

![image-20211201232811626](data:image/png;base64,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)

### 7、background-attachment 背景固定

决定背景图像的位置是在 **视口** 内固定，或者随着包含它的区块滚动

| 属性值 | 描述                                                                                                               |
| :----- | :----------------------------------------------------------------------------------------------------------------- |
| scroll | 默认值。背景图片随着页面的滚动而滚动，相对于元素本身固定，而不是随着它的内容滚动                                   |
| fixed  | 此关键属性值表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动                         |
| local  | 背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，同时背景图图片随着页面的滚动而滚动 |

#### ① scroll 值

背景图片随着页面的滚动而滚动，相对于元素本身固定，而不是随着它的内容滚动

```html
<style>
  body {
    height: 2000px;
  }
  .box {
    width: 400px;
    height: 400px;
    background: url('./images/flower.jpg') no-repeat;
    /* scroll为默认值，不加值也是scroll，所以加和不加效果一样 */
    background-attachment: scroll;
  }
</style>
<body>
  <div class="box"></div>
</body>
```

![scroll值](https://www.arryblog.com/assets/img/GIF-2022-7-15-19-42-20.a10d7eab.gif)

#### ② fixed 值

- 此关键属性值表示背景相对于视口固定。
- 即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动

```html
<style>
  body {
    height: 2000px;
  }
  .box {
    width: 400px;
    height: 400px;
    background: url('./images/flower.jpg') no-repeat;
    /* 背景图相对视口固定,拖动浏览器滚动条和元素自身滚动条，背景图都固定，不会随着内容滚动 */
    background-attachment: fixed;
    /* Y轴内容溢出显示滚动条 */
    overflow-y: auto;
  }
  .box1 {
    height: 800px;
    width: 20px;
    background-color: pink;
  }
</style>
<body>
  <div class="box">
    <div class="box1">1-2-3-4-5-6-7-8-9</div>
  </div>
</body>
```

![GIF-2022-7-15-19-46-09](https://www.arryblog.com/assets/img/GIF-2022-7-15-19-46-09.70fcaf8e.gif)

#### ③ local 值

- 背景相对于元素的内容固定
- 如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，同时背景图图片随着页面的滚动而滚动

```html
<style>
  body {
    height: 2000px;
  }
  .box {
    width: 400px;
    height: 400px;
    background: url('images/flower.jpg') no-repeat;
    /* 背景图相对视口固定,拖动浏览器滚动条和元素自身滚动条，背景图都固定，不会随着内容滚动 */
    background-attachment: local;
    /* Y轴内容溢出显示滚动条 */
    overflow-y: auto;
  }
  .box1 {
    height: 800px;
    width: 20px;
    background-color: pink;
  }
</style>
<body>
  <div class="box">
    <div class="box1">1-2-3-4-5-6-7-8-9</div>
  </div>
</body>
```

![GIF 2022-7-15 19-47-29](https://www.arryblog.com/assets/img/GIF-2022-7-15-19-47-29.2a26dfa9.gif)

### 8、background-size 背景尺寸

| 属性值  | 说明                                                                   | 实例                          |
| :------ | :--------------------------------------------------------------------- | :---------------------------- |
| x y     | x y 数值，分别表示背景图片宽高大小                                     | background-size: 100px 200px; |
| x% y%   | 百分比是相对于盒子的宽高而言，                                         | background-size: 50% 20%;     |
| x auto  | auto 是相对于第一个值宽来自动缩放 第一个值可以是数值，也可以是百分形式 | background-size: 100px auto;  |
| contain | 背景图片智能改变尺寸以容纳到盒子里                                     | background-size: contain;     |
| cover   | 背景图片智能改变尺寸以撑满盒子                                         | background-size: cover;       |

#### ① 数值表示法

```html
<style>
  div {
    width: 200px;
    height: 200px;
    border: 2px solid red;
    background-image: url(images/bg48.png);
    background-repeat: no-repeat;
  }
  .box1 {
    background-size: 100px 200px;
  }
  .box2 {
    background-size: 50% 20%;
  }
  .box3 {
    background-size: 50% auto;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
</body>
```

![img](https://www.arryblog.com/assets/img/image-20211108175445959.da17cc21.png)

#### ② contain 和 cover 表示法

```html
<style>
    div{
        width:200px;
        height:200px;
        border:2px solid red;
        background-image: url(images/yw.png);
        background-repeat: no-repeat;
        float: left;
        margin-right: 10px;
    }

    .box2{
        background-size: contain;
    }
    .box3{
        background-size: cover;
    }

</style>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
</body>
</html>
```

![image-20211108180555485](https://www.arryblog.com/assets/img/image-20211108180555485.bd805432.png)

### 9、background-clip

`background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

| 值          | 说明                           |
| :---------- | :----------------------------- |
| border-box  | 默认值。背景绘制在边框方框内。 |
| padding-box | 背景绘制在内边距方框内。       |
| content-box | 背景绘制在内容方框内。         |
| text        | 背景被裁剪成文字的前景色。     |

```html
<style type="text/css">
  .box {
    width: 100px;
    height: 100px;
    border: 50px solid rgba(244, 155, 155, 0.5);
    padding: 50px;
    background-image: url(images/fish.png);
    background-color: aquamarine;
    float: left;
    margin-right: 10px;
  }
  .box1 {
    background-clip: border-box;
  }
  .box2 {
    background-clip: padding-box;
  }
  .box3 {
    background-clip: content-box;
  }
  .box4 {
    float: left;
    width: 200px;
    height: 200px;
    font-size: 50px;
    background-image: linear-gradient(to right, red, blue, yellow);
    /* 背景被裁剪成文字的前景色 */
    background-clip: text;
    -webkit-background-clip: text;
    /* 文字颜色一定要设置为透明，才能看到效果 */
    color: rgba(0, 0, 0, 0.2);
  }
</style>
<body>
  <div class="box box1"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>
  <div class="box4">一条小鱼</div>
</body>
```

![image-20220725182312423](https://www.arryblog.com/assets/img/image-20220725182312423.985cd1a2.png)

### 10、background-origin

背景图片的定位区域

| 值          | 描述                                       |
| :---------- | :----------------------------------------- |
| padding-box | 背景图片的摆放以 padding 区域为参考 默认值 |
| border-box  | 背景图片的摆放以 border 区域为参考         |
| content-box | 背景图片的摆放以 content 区域为参考        |

```html
<style type="text/css">
  div {
    width: 100px;
    height: 100px;
    border: 50px solid rgba(0, 0, 0, 0.5);
    padding: 50px;
    background-image: url(images/bg16.png);
    background-color: aquamarine;
    float: left;
    margin-right: 10px;
    background-repeat: no-repeat;
  }
  .box1 {
    /* 背景图片的摆放以 padding 区域为参考  默认值 ; */
    background-origin: padding-box;
  }
  .box2 {
    /* 背景图片的摆放以 border 区域为参考 */
    background-origin: border-box;
  }
  .box3 {
    /* 背景图片的摆放以 content 区域为参考 */
    background-origin: content-box;
  }
</style>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
</body>
```

![image-20211108193255811](data:image/png;base64,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)

## 三、线性渐变

盒子的 background-image 属性可以用`linear-gradient()`形式创建线性渐变背景

**语法：**

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

| 值                                 | 描述                                                                                                                                                                                  |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`direction`**                    | 用角度值指定渐变的方向（或角度）。 未设置角度，则默认为 180deg（从上到下） 设置了角度，则 0deg 为竖直向上，然后顺时针旋转 指定关键词 to right、to top、to bottom 、to bottom right 等 |
| **`color-stop1, color-stop2,...`** | 用于指定渐变的起止颜色。                                                                                                                                                              |

### 1、未设置角度，则默认从上向下渐变

```css
.box1 {
  width: 200px;
  height: 200px;
  /* 
      linear-gradient 线性渐变
      to right 表示渐变方向，向右ss
      gole 表示开始颜色
      red 表示结束颜色
  */
  background-image: linear-gradient(gold, red);
}
```

![image-20220715190043684](https://www.arryblog.com/assets/img/image-20220715190043684.6517545a.png)

### 2、关键字来指定渐变的方向

```css
.box1 {
  width: 200px;
  height: 200px;
  /* 
      linear-gradient 线性渐变
      to right 表示渐变方向，向右
      gole 表示开始颜色
      red 表示结束颜色
  */
  background-image: linear-gradient(to right, gold, red);
}
```

![image-20211202212659184](https://www.arryblog.com/assets/img/image-20211202212659184-16578813441802.538e5127.png)

### 3、用度数来指定渐变方向

```css
.box2 {
  width: 200px;
  height: 200px;
  /* 45deg 表示倾斜方向，deg表示度数 */
  background-image: linear-gradient(45deg, green, red);
}
```

![image-20211202213158124](https://www.arryblog.com/assets/img/image-20211202213158124.dbf35e22.png)

### 4、多个颜色值，并且可以用百分数定义它出现的位置

默认转换中点

从一个颜色的终止点平滑的过渡到另一个颜色的终止点，颜色之间的中点是两个颜色转换的中点

```html
<style>
  .box3 {
    width: 600px;
    height: 200px;
    /* 
            blue 代表蓝色
            0% 表示蓝色出现的位置
            yellow 代表黄色
            50% 表示黄色出现的位置
            red 代表红色
            100% 表示红色出现的位置 
        */
    background-image: linear-gradient(to right, blue 0%, yellow 50%, red 100%);
  }
</style>
<body>
  <div class="box3"></div>
</body>
```

![image-20220716160834168](https://www.arryblog.com/assets/img/image-20220716160834168.8bcd81f9.png)

自定义转换中点

你可以将中点移动到这两个颜色之间的任意位置，方法是在两个颜色之间添加未标记的 %，以指示颜色的中转位置

```html
<style>
  .box3 {
    width: 600px;
    height: 200px;
    /* 
            blue 代表蓝色
            0% 表示蓝色出现的位置
        	40% 表示蓝色与黄色的颜色转换中心
            yellow 代表黄色
            50% 表示黄色出现的位置
            red 代表红色
            100% 表示红色出现的位置 
        */
    background-image: linear-gradient(to right, blue 0%, 40%, yellow 50%, red 100%);
  }
  .box4 {
    width: 240px;
    height: 20px;
    background-color: pink;
  }
</style>
<body>
  <div class="box3"></div>
  <div class="box4"></div>
</body>
```

![image-20220716162147299](https://www.arryblog.com/assets/img/image-20220716162147299.d3468f09.png)

未设置 0%与 100%的终止色

- 默认情况下，如果不带 0% 终止的颜色，则起始色为声明的第一个颜色。
- 最后一种颜色将持续到 100% 标记，或者如果在最后一个没有声明长度，则在 100% 标记处。

```html
<style>
  .box3,
  .box4 {
    width: 600px;
    height: 200px;
    /* 
            blue 代表蓝色
            20% 表示蓝色出现的位置
            yellow 代表黄色
            50% 表示黄色出现的位置
            red 代表红色
            80% 表示红色出现的位置 
        */
    background-image: linear-gradient(to right, blue 20%, yellow 50%, red 80%);
  }
</style>
<body>
  <div class="box3"></div>
</body>
```

![image-20220716162534051](https://www.arryblog.com/assets/img/image-20220716162534051.9ce82763.png)

### 5、浏览器私有前缀

- 不同浏览器有不同的私有前缀，用来对实验性质的 CSS 属性加以标识

| 浏览器        | 前缀       |
| :------------ | :--------- |
| Chrome 浏览器 | `-webkit-` |
| Firefox 火狐  | `-moz-`    |
| IE、Edge      | `-ms-`     |
| 欧朋          | `-o-`      |

```css
background-image: -webkit-linear-gradient(to right, gold, red);
background-image: -moz-linear-gradient(to right, gold, red);
background-image: -ms-linear-gradient(to right, gold, red);
background-image: -o-linear-gradient(to right, gold, red);
background-image: linear-gradient(to right, gold, red);
```

### 6、渐变色工具

工具

[点击查看，渐变色工具 👆(opens new window)](https://c.runoob.com/more/gradients/)

![渐变色工具效果图](https://www.arryblog.com/assets/img/image-20220716141748018.bf2bc6c6.png)

![渐变色工具效果图，查看源代码](https://www.arryblog.com/assets/img/image-20220716141514019.c815f57f.png)

## 四、径向渐变

- 盒子的 background-image 属性可以用 radial-gradient() 形式创建径向渐变背景图
- 径向渐变 (Radial gradients) 由其**中心点*、*边缘形状轮廓、两个或多个色值结束点（color stops）**定义而成。

**语法**

```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

| 值                           | 描述                                                                                                                                                                                                                                                                                                |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shape                        | **确定圆的类型** ellipse (默认)：指定椭圆形的径向渐变 circle ：指定圆形的径向渐变                                                                                                                                                                                                                   |
| size                         | **定义渐变的大小** ，可能值： farthest-corner (默认) : 指定径向渐变的半径长度为从圆心到离圆心最远的角 closest-side ：指定径向渐变的半径长度为从圆心到离圆心最近的边 closest-corner ： 指定径向渐变的半径长度为从圆心到离圆心最近的角 farthest-side ：指定径向渐变的半径长度为从圆心到离圆心最远的边 |
| position                     | **定义渐变的位置** 可能值：**center**（默认）：设置中间为径向渐变圆心的纵坐标值。**top**：设置顶部为径向渐变圆心的纵坐标值。**bottom**：设置底部为径向渐变圆心的纵坐标值。                                                                                                                          |
| start-color, ..., last-color | 用于指定渐变的起止颜色                                                                                                                                                                                                                                                                              |

### 1、简单的径向渐变

默认起始点为元素中心点，默认形状为椭圆，默认尺寸大小为 farthest-corner，颜色节点均匀分布

```css
<style>
    .box {
        width: 600px;
        height: 200px;
    }
    .box1 {
        /*
        red代表红色
        yellow代表黄色
        blue代表蓝色
        未定义位置时，默认以元素中心位置为起点
        未定义渐变类型，默认是以椭圆形的径向渐变
        */
        background-image: radial-gradient(red, yellow, blue);
    }
</style>
<body>
    <div class="box box1"></div>
</body>
```

![image-20220716172023800](https://www.arryblog.com/assets/img/image-20220716172023800.9f2ee09f.png)

### 2、设置颜色节点出现位置

同时可以通过中间填写非颜色的 10%，为实现两个过度色的颜色转换中心位置

```html
<style>
  .box {
    width: 300px;
    height: 300px;
    border: 2px solid #fff;
    float: left;
  }
  .box1 {
    /* 
            red代表红色
            10%代表红色起始点
            yellow代表黄色
            80% 代表黄色起始点
            blue代表蓝色 
        */
    background-image: radial-gradient(red 10%, yellow 80%, blue);
  }
  .box2 {
    /* 
            red代表红色
            10%代表红色起始点
            第二个10%代表红色与黄色的转换中点
            yellow代表黄色
            80% 代表黄色起始点
            blue代表蓝色 
        */
    background-image: radial-gradient(red 10%, 10%, yellow 80%, blue);
  }
</style>
<body>
  <div class="box box1"></div>
  <div class="box box2"></div>
</body>
```

![image-20220716173426303](https://www.arryblog.com/assets/img/image-20220716173426303.7436cef3.png)

### 3、设置径向渐变的形状 shape

shape 参数定义了形状。它可以是值 circle 或 ellipse。其中，circle 表示圆形，ellipse 表示椭圆形。默认值是 ellipse

```html
<style>
  .box {
    width: 300px;
    height: 200px;
    border: 2px solid #fff;
    float: left;
  }
  .box1 {
    /* 
        circle 指定椭圆形的径向渐变
        red 代表红色
        yellow代表黄色
        blue代表蓝色 
        */
    background-image: radial-gradient(circle, red, yellow, blue);
  }
  .box2 {
    background-image: radial-gradient(red, yellow, blue);
  }
</style>
<body>
  <div class="box box1"></div>
  <div class="box box2"></div>
</body>
```

![image-20220716173901951](https://www.arryblog.com/assets/img/image-20220716173901951.a305847f.png)

### 4、指定径向渐变中心位置 position

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    margin: 0px 2px;
    float: left;
    color: #fff;
  }
  .box1 {
    /* 
            at 100px 100px代表径向渐变的中心点
            red代表红色
            yellow 代表黄色
            blue代表蓝色
        */
    background-image: radial-gradient(at 100px 100px, red, yellow, blue);
  }
</style>
<body>
  <div class="box box1"></div>
</body>
```

![image-20220716184842472](https://www.arryblog.com/assets/img/image-20220716184842472.3830b8ad.png)

### 5、指定不同尺寸的大小 size

> size 参数定义了渐变的大小。它可以是以下四个值：

| 值              | 描述                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------ |
| farthest-corner | (默认) : 渐变的边缘形状与容器距离渐变中心点最远的一个角相交。                                           |
| closest-side    | （圆形）渐变的边缘形状与容器距离渐变中心点最近的一边相切 （椭圆）距离渐变中心点最近的垂直和水平边相切。 |
| closest-corner  | 渐变的边缘形状与容器距离渐变中心点最近的一个角相交(水平与垂直边相交)。                                  |
| farthest-side   | 与 closest-side 相反，边缘形状与容器距离渐变中心点最远的一边相切（或最远的垂直和水平边）。              |

#### ① 椭圆时径向渐变

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    margin: 0px 2px;
    float: left;
    color: #fff;
  }
  .box1 {
    /* 
        closest-side 最近的边
        50px 20px为径向椭圆的中心点
        red代表红色
        yellow 代表黄色
        blue代表蓝色
     */
    background-image: radial-gradient(closest-side at 50px 20px, red, yellow, blue);
  }
  .box2 {
    background-image: radial-gradient(farthest-side at 50px 20px, red, yellow, blue);
  }
  .box3 {
    background-image: radial-gradient(closest-corner at 50px 20px, red, yellow, blue);
  }
  .box4 {
    background-image: radial-gradient(farthest-corner at 50px 20px, red, yellow, blue);
  }
</style>
<body>
  <div class="box box1">closest-side</div>
  <div class="box box2">farthest-side</div>
  <div class="box box3">closest-corner</div>
  <div class="box box4">farthest-corner</div>
</body>
```

![image-20220716184325641](https://www.arryblog.com/assets/img/image-20220716184325641.01853c22.png)

#### ② 圆形时径向渐变

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    margin: 0px 2px;
    float: left;
    color: #fff;
  }
  .box1 {
    /* 
        circle 表示圆形的径向渐变
        closest-side 最近的边
        50px 20px为径向椭圆的中心点
        red代表红色
        yellow 代表黄色
        blue代表蓝色
     */
    background-image: radial-gradient(circle closest-side at 50px 20px, red, yellow, blue);
  }
  .box2 {
    background-image: radial-gradient(circle farthest-side at 50px 20px, red, yellow, blue);
  }
  .box3 {
    background-image: radial-gradient(circle closest-corner at 50px 20px, red, yellow, blue);
  }
  .box4 {
    background-image: radial-gradient(circle farthest-corner at 50px 20px, red, yellow, blue);
  }
</style>
<body>
  <div class="box box1">closest-side</div>
  <div class="box box2">farthest-side</div>
  <div class="box box3">closest-corner</div>
  <div class="box box4">farthest-corner</div>
</body>
```

![image-20220716183720999](https://www.arryblog.com/assets/img/image-20220716183720999.6718ded0.png)

#### ③ 使用径向渐变实现彩虹效果

```html
<style>
  .container {
    width: 600px;
    height: 300px;
    overflow: hidden;
  }

  .container .layer {
    width: 600px;
    height: 600px;
    /* 
      径向渐变 
   	  50% 50% 表示的是圆的大小
    */
    background-image: radial-gradient(
      50% 50%,
      white 40%,
      pink 50%,
      pink 55%,
      red 60%,
      red 65%,
      orange 70%,
      orange 75%,
      skyblue 80%,
      skyblue 85%,
      yellow 90%,
      yellow 95%,
      white 95%
    );
  }
</style>

<body>
  <div class="container">
    <div class="layer"></div>
  </div>
</body>
```

![image-20211202233912610](https://www.arryblog.com/assets/img/image-20211202233912610.e5e71482.png)

## 五、背景相关属性的补充

`background-image,bakground-size,bakground-position,background-repeat`后面都可以设置多个值，每组值之间用逗号分隔开来。

每个属性之间用逗号分隔的值，都是按顺序一一对应的，如果对应后面的值没有写，则以当前属性设置的第一组值为默认值显示。

```html
<style>
  .box {
    width: 400px;
    height: 200px;
    border: 5px solid skyblue;
    /* 
      hd.png为蝴蝶
      yf.png为衣服
      bg.png为背景图
      linear-gradient为绘制线性渐变背景
    */
    background-image: url(./hd.png), url(./yf.png), url(./bg.png), linear-gradient(rgb(240, 44, 77), khaki);
    /* 
      第一个no-repeat控制蝴蝶不重复
      第二个no-repeat控制衣服不重度
      第三个repeat是控制背景图重复
      没有设置第四个值，则四张图片值为第一个值no-repeat
    */
    background-repeat: no-repeat, no-repeat, repeat;
    /* 
      100px 100px 为第一个图片蝴蝶大小
      50px 50px 为第二个图片衣服大小
      50px 30px 为第三个图片背景图大小
      第四个没有设置，则第四张图片大小为第一个值100px 100px 
    */
    background-size: 100px 100px, 50px 50px, 50px 30px;
    /* 和上面的同理，从左往右依次为第一，二，三，四张图片位置 */
    background-position: 100px 100px, 50px 50px, 10px 20px, 0px 0px;
  }
</style>
<body>
  <div class="box"></div>
</body>
```

![image-20220716193330766](https://www.arryblog.com/assets/img/image-20220716193330766.ffe890fc.png)

## 六、其它常用属性

鼠标样式，外轮廓，超出部分隐藏，vertical-align 属性

### 1、cursor 鼠标样式

- 设置光标的类型，在鼠标指针悬停在元素上时显示相应样式
- [更多属性值看官方文档 👆(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)

| 值        | 描述                                                                                                    |
| :-------- | :------------------------------------------------------------------------------------------------------ |
| url       | 需使用的自定义光标的 URL。注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。 |
| default   | 默认光标（通常是一个箭头）                                                                              |
| auto      | 默认。浏览器设置的光标。                                                                                |
| crosshair | 光标呈现为十字线。                                                                                      |
| pointer   | 光标呈现为指示链接的指针（一只手）                                                                      |
| move      | 此光标指示某对象可被移动。                                                                              |
| e-resize  | 此光标指示矩形框的边缘可被向右（东）移动。                                                              |
| ne-resize | 此光标指示矩形框的边缘可被向上及向右移动（北/东）。                                                     |
| nw-resize | 此光标指示矩形框的边缘可被向上及向左移动（北/西）。                                                     |
| n-resize  | 此光标指示矩形框的边缘可被向上（北）移动。                                                              |
| se-resize | 此光标指示矩形框的边缘可被向下及向右移动（南/东）。                                                     |
| sw-resize | 此光标指示矩形框的边缘可被向下及向左移动（南/西）。                                                     |
| s-resize  | 此光标指示矩形框的边缘可被向下移动（南）。                                                              |
| w-resize  | 此光标指示矩形框的边缘可被向左移动（西）。                                                              |
| text      | 此光标指示文本。                                                                                        |
| wait      | 此光标指示程序正忙（通常是一只表或沙漏）。                                                              |
| help      | 此光标指示可用的帮助（通常是一个问号或一个气球）。                                                      |

关于 url 这个值需要注意：

- ① 图片地址，在实际开发中一般为绝对路径
- ② 图片大小最好是 `32*32` 的大小（各浏览器支持大小不一，但 32 都 ok）
- ③ 图片格式，不同浏览器格式不一，可以是 png、svg、ico、cur，一般以 ico 和 cur 为主

[ico 在线图标生成器，点击查看 👆(opens new window)](https://www.bitbug.net/)

```css
html {
  /* 图片地址，在实际开发中一般为绝对路径 */
  cursor: url('http://127.0.0.1:5500/images/fish.ico'), pointer;
}
/* 当没有找到自定义图标，就会用pointer效果 */
```

### 2、outline 外轮廓

这个属性用于设置元素周围的轮廓 ，其用法和 border 属性一样

**语法**

```css
/* 边框宽 边框风格 边框颜色 */
outline: 10px solid red;
```

**outline 的小属性**

- outline-width 边框宽
- outline-style 边框风格
- outline-color 边框颜色

**border 与 outline 的区别**

- outline ：不占据空间，绘制于元素内容周围的轮廓 ，不参于盒子模型的占位计算，不会因为添加这个属性，而造成盒子占位空间变化。
- outline 没有办法单独控制某一边效果，也就是没有 outline-left、outline-top、outline-right、outline-bottom 属性;
- border：参于盒子模型计算，会因为边框值的变化，造成盒子占位空间变化。

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    /* 上 右  下 左 */
    margin: 50px 0px 0px 30px;
    background-color: tomato;
    /* 外轮廓 */
    outline: 30px dotted skyblue;
    /* border: 30px dotted skyblue; */
  }
</style>
<body>
  <div class="box"></div>
  我是页面中的其它元素喽
</body>
```

| 添加 outline 效果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 添加 border 效果                                                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| ![image-20220708134557514](data:image/png;base64,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) | ![image-20220708134616530](https://www.arryblog.com/assets/img/image-20220708134616530.6e56f7a4.png) |

去掉表单元素默认的 outline 属性

- outline 的值为 设置为 `0` 或 `none` 会移除元素的默认轮廓
- 表单元素为了增中其可访问性（聚焦提示），都有默认的 outline 值。
- 去掉表单元素默认的 outline 效果

```css
input {
  outline: none;
}
```

### 3、overflow 超出部分隐藏

overflow 属性规定当内容溢出元素框时该 做什么。

#### ① overflow 属性值

| 值      | 描述                                                                 |
| :------ | :------------------------------------------------------------------- |
| visible | 默认值。内容溢出，会呈现在元素框之外。                               |
| hidden  | 内容溢出，则溢出内容是不可见的。                                     |
| scroll  | 不管内容是否溢出，都会显示滚动条。                                   |
| auto    | 内容溢出，则显示滚动条以便查看其余的内容。如果不溢出，则不显示滚动条 |
| inherit | 规定应该从父元素继承 overflow 属性的值。                             |

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    line-height: 35px;
    /* 左浮动 */
    float: left;
    margin-left: 20px;
  }
  .box1 {
    overflow: hidden;
  }
  .box2 {
    overflow: scroll;
  }
  .box3 {
    overflow: auto;
  }
</style>
<body>
  <div class="box">啥处理都不做我是文本内容2，我是文本内容3</div>
  <div class="box box1">hidden 我是文本内容1，我是文本内容2，我是文本内容3</div>
  <div class="box box2">scroll 我是文本内容1，我是文本内容2，我是文本内容3</div>
  <div class="box box3">auto 我是文本内容1，我是文本内容2，我是文本内容3</div>
</body>
```

![image-20220708144644584](https://www.arryblog.com/assets/img/image-20220708144644584.f21679ca.png)

#### ② overflow-x 和 overfow-y

- overflow-x 水平方溢出设置
- overflow-y 垂直方向溢出设置

```css
overflow-x: hidden;
```

### 4、vertical-align 属性

- 指定**行内元素** 、**行内块级元素** 、**表格单元格元素** 的垂直对齐方式
- 对块级元素是无效的

| 属性值      | 描述                                                                                                                                                                            |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseline    | 使元素的基线与父元素的 **基线对齐**                                                                                                                                             |
| sub         | 使元素的基线与父元素的 **下标基线对齐**                                                                                                                                         |
| super       | 使元素的基线与父元素的 **上标基线对齐**                                                                                                                                         |
| text-top    | 使元素的顶部与父元素的字体顶部对齐。                                                                                                                                            |
| text-bottom | 使元素的底部与父元素的字体底部对齐。                                                                                                                                            |
| middle      | 使元素的中部与父元素的基线加上父元素 x-height(**x 高度**) 的一半对齐。                                                                                                          |
| 数值(10px)  | 使元素的基线对齐到父元素的**基线** 之上的给定长度 可以是负数                                                                                                                    |
| 百分比 %    | 使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是[line-height (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)属性的百分比 可以是负数 |
| top         | 使元素及其后代元素的顶部与整行的顶部对齐                                                                                                                                        |
| bottom      | 使元素及其后代元素的底部与整行的底部对齐                                                                                                                                        |

小写字母 x 的下边缘（线）就是我们的基线

[点击查看，详细参考地址 👆(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)

![2015-06-28_105734](data:image/png;base64,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)

**应用案例**

```html
<style>
  .box {
    height: 50px;
    float: left;
    margin: 10px 10px 10px 0px;
    background-color: skyblue;
    /* 行高 50px */
    line-height: 50px;
  }
  .box span {
    /* 行内块 */
    display: inline-block;
    line-height: 1;
    background-color: yellow;
  }
  .baseline {
    vertical-align: baseline;
  }
  .sub {
    vertical-align: sub;
  }
  .super {
    vertical-align: super;
  }
  .text-top {
    vertical-align: text-top;
  }
  .text-bottom {
    vertical-align: text-bottom;
  }
  .middle {
    vertical-align: middle;
  }
  .top10px {
    vertical-align: 10px;
  }
  .top10 {
    vertical-align: 10%;
  }
  .top {
    vertical-align: top;
  }
  .bottom {
    vertical-align: bottom;
  }
</style>
<body>
  <div class="box">
    文字Xx
    <span class="baseline">x-baseline</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <sub>2</sub>
    <span class="sub">x-sub</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <sup>2</sup>
    <span class="super">x-super</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="text-top">x-text-top</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="text-bottom">x-text-bottom</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="middle">x-middle</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="top10px">x-10px</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="top10">x-10%</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="top">x-top</span>
    文字
  </div>
  <div class="box">
    文字Xx
    <span class="bottom">x-bottom</span>
    文字
  </div>
</body>
```

![image-20220708160743457](https://www.arryblog.com/assets/img/image-20220708160743457.8f81ee2d.png)

**vertical-align 的应用场景**

- 用于控制文字与行内块元素或图片在垂直方向上的对齐方式

  ```html
  <style>
    h3 {
      height: 50px;
      background-color: #ddd;
      line-height: 50px;
    }
    .img {
      /* 元素的中线与x的中心对齐 */
      vertical-align: middle;
    }
  </style>
  <body>
    <h3>
      <img src="images/fish.png" class="img" />
      x我是一直可爱的小白兔
    </h3>
  </body>
  ```

  ![image-20220708162811809](data:image/png;base64,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)

- 用于设置表格单元中内容的垂直对齐方式

  ```html
  <style>
    table {
      height: 100px;
    }
    table tr td {
      border: 1px solid #000;
    }
    .baseline {
      vertical-align: baseline;
    }
    .top {
      vertical-align: top;
    }
    .middle {
      vertical-align: middle;
    }
    .bottom {
      vertical-align: bottom;
    }
  </style>
  <body>
    <table>
      <tr>
        <td class="baseline">baseline</td>
        <td class="top">top</td>
        <td class="middle">middle</td>
        <td class="bottom">bottom</td>
      </tr>
    </table>
  </body>
  ```

  ![image-20220708163347715](data:image/png;base64,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)

## 七、应用案例

### 1、常用的 a 标签布局按钮

```html
<style>
  .button {
    /* 把a标签转换为块级元素，转换后，设置宽高就会生效 */
    display: block;
    width: 200px;
    height: 50px;
    /* 去掉下划线 */
    text-decoration: none;
    /* 字体颜色 */
    color: #fff;
    /* 背景色 */
    background-color: tomato;
    /* 水平居中 */
    text-align: center;
    /* 垂直居中 */
    line-height: 50px;
  }
</style>
<body>
  <a href="#" class="button">点击进入艾编程官网</a>
</body>
```

![image-20220707215749653](data:image/png;base64,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)

### 2、水平居中的轮播图按扭

核心点：display 元素类型转换、vertical-align 控制元素垂直对齐

```html
<style>
  .button {
    height: 50px;
    background-color: skyblue;
    text-align: center;
    /* 去掉span间间隙 */
    font-size: 0px;
    /* 元素水平居中 */
    line-height: 50px;
  }
  .button span {
    /* 行内块元素 */
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #fff;
    /* 上下 0  左右 2px */
    margin: 0px 2px;
    /* 垂直居中 */
    vertical-align: middle;
    /* 圆角 */
    border-radius: 50%;
  }
  .button .current {
    background-color: tomato;
  }
</style>
<body>
  <div class="button">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span class="current"></span>
  </div>
</body>
```

![image-20220708165249413](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABD0AAABNCAIAAAAq+4j9AAAD9klEQVR4nO3dMU8bBxjHYbsY5ANHRSLC8UIkYIChrIwweuuamQ/QPRtb+RTMGdONEaQuTEgsMBAaWBwjo1LFYAtMrkO3yDZWQPJ71+eZ3790o3/YJ4ppmhYAAAAC+2ncDwAAAPCEUqFQ2DlqjfsxAAAABvJ9CwAAEJ1uAQAAotMtAABAdLoFAACITrcAAADR6RYAACA63QIAAESnWwAAgOh0CwAAEJ1uAQAAotMtAABAdLoFAACITrcAAADR6RYAACA63QIAAESnWwAAgOh0CwAAEJ1uAQAAotMtAABAdLoFAACITrcAAADR6RYAACA63QIAAESnWwAAgOh0CwAAEJ1uAQAAotMtAABAdLoFAACITrcAAADRlcb9AAC8vLW58srsVG1mMpkodh7Txu3D6c398XX3fzE/OVg5O6xdnSfddqdcacwvni6vH69ujDgHIKZimqY7R61xPwYAL6OalOoLldp0nz9LNe56e5ftZqeX23nror6/W2t+6jOvLu1tbjVfvx0yByAy3QKQH9Wk9G7556RUHHTQ6aUfzv4Z9Ok/2/PWxbs/fk+67YHzcuXDr++lC0BGeb8FID/qC5Uhn/sLhUJSKtYXKvmc7+8OiZZCoZB02/X93SEHAESmWwByYm2u3PcXVt+pTZfW5sp5m58c9P152Pfz5qe1k4MnzwAISLcA5MTK7NRzLrM9PzscdT7yJQCh6BaAnKjNTD7nMtvzq/NR5yNfAhCKbgHIiWRi2MshT15mez70zZYfuwQgFN0CkBOdx/Q5l9melwe+r//DlwCEolsAcqJx+/Ccy2zP5xdHnY98CUAougUgJ05v7p9zme358vqo85EvAQhFtwDkxPF1t3E37N/J/6dx1zu+7uZtvrrRqC49Pa8uHa9uPHkGQEC6BSA/9i7bnd6wF0U6vXTvcuCL6dmeb24Nf3elU67sbW4NOQAgsont7e0/v9yN+zEAeAG3vW+fvz68mS69muzzZ6nGXe/jX1+bnYFfa2R7Pj37eeGXN62LV7d/95lXlz7Wf2u+fjtoDkBwxTRNd45a434MAF7S2lx5ZXaqNjOZTBQ7j2nj9uH05r7vL6xyOD85WDk7rF2dJ912p1xpzC+eLq/7eRhA1ukWAAAgOu+3AAAA0ekWAAAgOt0CAABEp1sAAIDodAsAABCdbgEAAKLTLQAAQHS6BQAAiE63AAAA0ekWAAAgOt0CAABEp1sAAIDodAsAABCdbgEAAKLTLQAAQHS6BQAAiE63AAAA0ekWAAAgOt0CAABEp1sAAIDodAsAABCdbgEAAKLTLQAAQHS6BQAAiE63AAAA0ekWAAAgOt0CAABEp1sAAIDodAsAABDdv6XxBYYHASnkAAAAAElFTkSuQmCC)
