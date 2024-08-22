# JavaScript DOM 事件，事件流，事件对象，事件委托

本节内容我们开始学习在实际开发中用到最多的 JavaScript DOM 事件（鼠标事件、键盘事件、表单事件）DOM 事件流，event 事件对象，事件委托，常见的应用场景和案例等。

## 一、DOM 事件的基本介绍

我们会从以下四个方面入手，让大先对 DOM 事件有一个简单的了解

- 什么是 DOM 事件
- 什么是事件监听
- 设置事件监听的方法
- 如何移除事件监听

### 1、什么是 DOM 事件 ？

事件可以理解为：用户与网页发生的交互动作，比如：

- 当鼠标移动到元素上面，会触发 `mouseover`事件
- 当鼠标标点击中某个页面元素 ，会触 发`click`事件
- 当用户进入或离开页面时，会触发 `load` 和 `unload` 事件
- .... DOM 中的事件非常多，我们后面慢慢来学习

> 当我们触发了上面这些事件时，计算机是如何知道用户与浏览器（网页）发生了这些交互呢 ？这就涉及到事件监听。

### 2、什么是事件监听 ？

事件监听

就是计算机对事件进行监听，知道什么时候发生了这个事件，从而执行一些程序员预先编写好的程序。

### 3、设置事件监听的方法

设置事件监听的方法有 2 种

- 以 `on` 方式注册事件（绑定事件）
- 以 `addEventListener()` 方式监听注册事件

### 3.1、on 方式注册事件

基本用法

```js
// 语法
eventTarget.on事件类型 = fn
```

- eventTarget 触发事件的目标对象，称为**事件源**
- on 后面是**事件类型**，事件类型有很多如 click、mouseover、keydown、focus 等
- fn 是一个函数，事件触发时调用的函数，被称为**事件处理函数**

> 一个完整的 DOM 事件，需要具备以上三部分：**事件源**、**事件类型**、**事件处理函数**

```html
<button id="btn">点我</button>
<script>
  // 获取dom元素
  var btn = document.getElementById('btn')

  // btn 为事件源 click 为事件类型名，这里的函数为事件处理函数
  btn.onclick = function () {
    alert('我被点击了1')
  }
  btn.onclick = function () {
    alert('我被点击了2')
  }
</script>
```

注：

on 方式注册事件，同一元素的同一事件，只能有一个事件处理函数，同时以写在后面的为主

![image-20221102174707450](https://www.arryblog.com/assets/img/image-20221102174707450.e4193ac9.png)

### 3.2、以 addEventListener 方式监听注册事件

基本用法

```js
// 语法
eventTarget.addEventListener(type, fn, useCapture)
```

- eventTarget 为事件源, 触发事件的目标对象
- type 监听事件的类型
- fn 事件处理函数
- useCapture 设置事件触发是捕获阶段还是冒泡阶段，其值只能是 false 和 true
  - true 表示在捕获阶段触发
  - false 默认值，表示在冒泡阶段触发

温馨提示

addEventListener 方式，可以给元素的同一个事件添加多个事件监听（即绑定多个事件处理函数）

**应用场景**

- 同一个页面要实现 **吸顶盒效果**、**楼梯式导航**、**滚动到底部加载更多** 等效果，这些效果都会用到`window.srcoll`事件
- 所以我们需要为 window 的 scroll 事件，添加三个事件处理函数来分别处理以上三种效果。

```html
<button id="btn">点我</button>
<script>
  // 获取dom元素
  var btn = document.getElementById('btn')
  // btn 为事件源 click 为事件类型名，fn为事件处理函数  false表示在冒泡阶段触发
  btn.addEventListener('click', fn1, false)
  btn.addEventListener('click', fn2, false)
  function fn1() {
    alert('我被点击了fn1')
  }
  function fn2() {
    alert('我被点击了fn2')
  }
</script>
```

![image-20221102174903415](https://www.arryblog.com/assets/img/image-20221102174903415.b324d6b8.png)

### 4、移除事件监听

移除 on 方式绑定（注册）的事件

```js
eventTarget.on事件类型 = null; // 移除事件处理程序
<button id="btn">点我</button>

<script>
  // 获取dom元素
  var btn = document.getElementById("btn");
  btn.onclick = function () {
    console.log("点击后要执行的内容");
  };
  btn.onclick = null; // 移除 click事件
</script>
```

移除 addEventListener 方式的事件监听，需要通过 removeEventListener 方法来实现

- 因为 addEventListener 可以为同一元素的的同一事件绑定多个事件处理函数
- 所以，用 removeEventListener 方法来移除对应事件监听时，要保证移除的**事件名**，**事件处理函数**，**布尔值** 要与 addEventListener 添加时的参数完全相同。才能移除具体的某个事件监听

```js
removeEventListener(事件名，事件处理函数，布尔值); // 用来移除具体的某一个事件监听
// 移除时的，事件名，事件处理函数，布尔值 要与addEventListener添加时的参数完全相同
<button id="btn">点我</button>
<script>
  // 获取dom元素
  var btn = document.getElementById("btn");
  btn.addEventListener("click", fn1, false);
  btn.addEventListener("click", fn2, true);
  // 不能移除，因为没有相对应的事件监听
  // btn.removeEventListener("click", fn1, true);
  // 移除第一次添加的事件监听
  btn.removeEventListener("click", fn1, false);
  function fn1() {
    console.log("执行了fn1");
  }
  function fn2() {
    console.log("执行了fn2");
  }
</script>
```

## 二、常见鼠标事件

> 常见的鼠标事件如下

| 事件名       | 描述                                                   |
| :----------- | :----------------------------------------------------- |
| onclick      | 当鼠标单击某个对象                                     |
| ondbclick    | 当鼠标双击某个对象                                     |
| onmouseover  | 当鼠标进入某个对象                                     |
| onmouseout   | 当鼠标离开某个对象                                     |
| onmouseenter | 当鼠标进入某个对象（相似事件 onmouseover）不能向上冒泡 |
| onmouseleave | 当鼠标离开某个对象（相似事件 onmouseout）不能向上冒泡  |
| onmousedown  | 当某个鼠标按键在某个对象上被按下                       |
| onmouseup    | 当某个鼠标按键在某个对象上被松开                       |
| onmousemove  | 当某个鼠标按键在某个对象上被移动                       |

### 1、onclick 与 ondblclick 事件

| 事件名     | 描述                                   |
| :--------- | :------------------------------------- |
| onclick    | 鼠标单击事件，当鼠标单击某个对象时触发 |
| ondblclick | 鼠标双击事件，当鼠标双击某个对象时触发 |

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>
<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  // 单击事件
  box.onclick = function () {
    console.log('我是 onclick')
  }
  // 双击事件
  box.ondblclick = function () {
    alert('我是 ondblclick')
  }
</script>
```

### 2、事件处理函数中的 this 指向

> 事件处理函数中的 this 指向绑定事件的那个对象

```html
<div class="box">点我</div>
<script>
  var box = document.querySelector('.box')
  // on开头绑定事件
  box.onclick = function () {
    console.log(this) // <div class="box">点我</div>
  }

  // addEventListener 绑定事件
  box.addEventListener('click', fn, false)
  function fn() {
    console.log(this) // <div class="box">点我</div>
  }
</script>
```

### 2.1、案例 1：当用户点击页面上的 div 后，更改 div 的背景色

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>

<div class="box"></div>
<script>
  // 获取class名为box的div
  var box = document.querySelector('.box')
  // on开头的方式给box元素添加click点击事件
  // 当box元素被点击后，就会触发click事件，从而执行后面函数中的代码
  box.onclick = function () {
    this.style.backgroundColor = 'khaki' // 更改div的背景颜色
  }

  // 以addEventListener（）方法给 box元素添加click事件
  // 当box元素被点击后，就会触发click事件，从而执行bgColor函数
  box.addEventListener('click', bgColor, false)
  function bgColor() {
    this.style.backgroundColor = 'blue'
  }
</script>
```

### 2.2、案例 2：点击显示和隐藏

![GIF 2022-10-12 17-00-55](data:image/gif;base64,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iqdQV7RgSjUGgKtYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4BmCDDbo4IMQRijhhBRWaOGFGGao4YYc5hYCACH5BAE8AAIALAQABAArABcApO/v73Z2dgD/AO+7fE2c2QB6upWVle/Vm9mcTbrv79nv7+/v2b29vU1Qm+fn55vV7+/vuny7700AAHwAfJtQfLp6AJtQTQAATXwAAAAAfE0AfJtQAABQmwAAAAAAAAAAAAW8oGMEZGmeaKqWhsgAcCzPdG3HzHjvPE/2wCDsJyzeiMakDDk7SATQKJQAG0ivmYSNKTs0FDQEVTkM2JzX6JjMjXnBMzG5fH6mBVTEXXp51Nowb2FrMgMFQIBCCxZ+hgByR2Y0CxRajgNUEBNaAJhVh4t+W5I0BxoJlwQLGxEwmpyOAIJ/pDSYqZAAFa2fMbkziTGphYfCxQCUnMC1MRV7URxwEBhQvD7Mc0LB2Tvb3FsGL99BOSIr5+grLSEAOw==)

方法一：涉及知识点

- 操作样式（控制元素显示与隐藏）
- 开关锁

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    background-color: pink;
  }
  .hide {
    display: none; /* 隐藏 */
  }
</style>

<body>
  <button id="on-off">显示</button>
  <div class="box hide">内容区</div>

  <script>
    ;(function () {
      var box = document.querySelector('.box')
      var button = document.getElementById('on-off')
      var flag = true
      // 方法一  开关锁
      button.onclick = function () {
        // 定义一个变量，用来表示当前状态
        if (flag) {
          box.style.display = 'block'
          flag = false
        } else {
          box.style.display = 'none'
          flag = true
        }
      }
    })()
  </script>
</body>
```

方法二：涉及知识点

利用 `classList.toggle()` 方法，实现两种样式之间相互转换

```html
<style>
  .box {
    width: 200px;
    height: 100px;
    background-color: pink;
  }
  .hide {
    display: none; /* 隐藏 */
  }
</style>

<body>
  <button id="on-off">显示</button>
  <div class="box hide">内容区</div>

  <script>
    ;(function () {
      var box = document.querySelector('.box')
      var button = document.getElementById('on-off')

      // 方法二
      button.onclick = function () {
        box.classList.toggle('hide')
      }
    })()
  </script>
</body>
```

### 2.3、案例 3：变色小球

让小球在**红（red)**，**绿(green)**，**黄(yellow)**，**蓝(blue)** 4 个颜色之间切换

![变色小球](data:image/gif;base64,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)

- 小球初始颜色为**红色（red）**，第一次点击后，变为**绿色（green）**，第二次点击，变为**黄色（yellow）**，第三次点击变为**蓝色（blue）**，第四点击后变为**红色（red）**
- 后面点击依次按上面步骤来切换不同颜色

解题思路：

- 我们可以定义一个变量`bgColor`，用来保存元素的当前的颜色状态
- 刚开始小球颜色为红色，即`bgColor = 'red';`
- 然后每次点击后，判断下当前的颜色，
- 如果为`red`，则把小球背景色变为`green`，同时`bgColor = 'green',`更改为当前球的背景色
- 如果为`green`，则把小球背景色变为`yellow`，同时`bgColor = 'yellow',`更改为当前球的背景色
- 如果为`yellow`，则把小球背景色变为`blue`，同时`bgColor = 'blue',`更改为当前球的背景色
- 如果为`blue`，则把小球背景色变为`red`，同时`bgColor = 'red',`更改为当前球的背景色

```html
<style>
  .ball {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: red;
  }
</style>

<div class="ball"></div>
<script>
  var ball = document.querySelector('.ball')
  var bgColor = 'red'
  ball.onclick = function () {
    if (bgColor === 'red') {
      this.style.backgroundColor = 'green'
      bgColor = 'green'
    } else if (bgColor === 'green') {
      this.style.backgroundColor = 'yellow'
      bgColor = 'yellow'
    } else if (bgColor === 'yellow') {
      this.style.backgroundColor = 'blue'
      bgColor = 'blue'
    } else if (bgColor === 'blue') {
      this.style.backgroundColor = 'red'
      bgColor = 'red'
    }
  }
</script>
```

**优化版**

- 元素在多个状态之间切换，可以把 if 这种方式，改成用 switch 语句来实现，条理更清淅
- 把 bgColor 这个变量，更改为对象自身的一个属性，更好，这样就可以消除全局变量，同时如果页面有多个相似的对象，那这些对象之间互不干扰
- 把这个改变元素背景颜色的函数封装成一个大家共用的方法

```html
<style>
  .ball1 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: red;
  }
  .ball2 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: green;
  }
</style>

<div class="ball1"></div>
<div class="ball2"></div>
<script>
  var ball1 = document.querySelector('.ball1')
  var ball2 = document.querySelector('.ball2')
  ball1.bgColor = 'red' // bgColor为对象的一个属性
  ball1.onclick = changeBgColor
  ball2.bgColor = 'green' // bgColor为对象的一个属性
  ball2.onclick = changeBgColor

  // 把切换背景的功能，抽离成一个公共方法
  function changeBgColor() {
    switch (this.bgColor) {
      case 'red':
        this.style.backgroundColor = 'green'
        this.bgColor = 'green'
        break
      case 'green':
        this.style.backgroundColor = 'yellow'
        this.bgColor = 'yellow'
        break
      case 'yellow':
        this.style.backgroundColor = 'blue'
        this.bgColor = 'blue'
        break
      case 'blue':
        this.style.backgroundColor = 'red'
        this.bgColor = 'red'
        break
    }
  }
</script>
```

总结：

如果一个元素在多个状态之间相互切换，我们可以在元素身上定义一个属性，这个属 性用来保存当前元素的当前状态。
然后在每次切换状态前，判断下当前的状态，再根据不同的状态来实现不同效果。

### 2.4、案例 4：点击弹出对应 li 的序号

涉及知识点

- 对象自定义属性的应用
- 闭包的应用

> 如下：当点击第一个 1，弹出 0，第二个弹出 1，第三个弹出 2，第 4 个弹出 3

![GIF 2022-10-12 18-31-31](https://www.arryblog.com/assets/img/GIF-2022-10-12-18-31-31.12da74f9.gif)

```html
<body>
  <ul class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
  <script>
    var liList = document.querySelectorAll('.list li')
    // 常见错误写法
    for (var i = 0; i < liList.length; i++) {
      liList[i].onclick = function () {
        alert(i)
      }
    }

    // 正确写法一：自定义属性
    for (var i = 0; i < liList.length; i++) {
      liList[i].index = i // 给每个对象添加自定义属性，来保存对应下标
      liList[i].onclick = function () {
        alert(this.index)
      }
    }

    // 正确写法二：利用闭包
    for (var i = 0; i < liList.length; i++) {
      ;(function (i) {
        console.log(i)
        liList[i].onclick = function () {
          alert(i)
        }
      })(i)
    }
  </script>
</body>
```

### 2.5、案例 5：点击随机生成 6 位符号验证码

涉及知识

- 创建 DOM 元素，同时添加样式，事件等
- 随机函数

![GIF 2022-10-12 21-12-08](https://www.arryblog.com/assets/img/GIF-2022-10-12-21-12-08.5c863d7d.gif)

```html
<style>
  /* .yzm {
        width: 120px;
        height: 40px;
        position: relative;
      }
      .yzm .yzm-code {
        box-sizing: border-box;
        height: 100%;
        background-color: #ddd;
        text-align: center;
        line-height: 40px;
        font-size: 0;
      }
      .yzm .yzm-code span {
        font-size: 26px;
        font-weight: bold;
        user-select: none;
      
      }
      .yzm-bg {
        background-color: khaki;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(./images/yzm/line1.png) no-repeat center;
        background-size: cover;
        cursor: pointer;
      } */
</style>
<body>
  <div class="container">
    <!-- <div class="yzm">
        <div class="yzm-code">
          <span>1</span>
          <span>2</span>
          <span>a</span>
          <span>b</span>
          <span>f</span>
          <span>5</span>
        </div>
        <div class="yzm-bg"></div>
      </div> -->
  </div>
  <script>
    // 这个生成验证码的函数，需要一个参数，这个参数是用来放yzm的容器
    // yzm的整html结构，我们在函数内部自动生成，不写死
    // yzm中的数字和字母是自动生成的，背景干扰图片也是自动生成

    function addYzm(element) {
      // 首先创建yzm的html结构
      var yzm = document.createElement('div')
      yzm.className = 'yzm'
      yzm.style.cssText = 'width: 120px; height: 40px;position: relative;'
      // 生成yzm-code
      var yzmCode = document.createElement('div')
      yzmCode.className = 'yzm-code'
      yzmCode.style.cssText =
        ' box-sizing: border-box;height: 100%;background-color: #ddd;text-align: center; line-height: 40px;font-size: 0;'
      // 生成验证码背景图
      var yzmBg = document.createElement('div')
      yzmBg.className = 'yzm-bg'
      yzmBg.style.cssText =
        ' background-color: khaki;width: 100%;height: 100%;position: absolute;top: 0;left: 0; background: url(./images/yzm/line1.png) no-repeat center;background-size: cover;cursor: pointer;'

      // 把 yzmCode 添加到yzm中去
      yzm.appendChild(yzmCode)
      yzm.appendChild(yzmBg)
      container.appendChild(yzm)

      // 调用下更新验证码的函数
      updateYzmCode(yzmCode)

      // 给yzm这个元素添加一下点击事件,点击后到更新验证码
      yzm.addEventListener('click', updateYzm, false)
      function updateYzm() {
        updateYzmCode(yzmCode)
        updateYzmBg(yzmBg)
      }
    }

    // 更新验证码中的数写与字母
    function updateYzmCode(el) {
      // 在赋值前，先把之前内容全部清空
      el.innerHTML = ''
      // 生成yzm-code中的span标签
      // 内容是随机的，颜色是随机的
      // var codeArr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
      var codeArr = [0, 1, 2, 3, 4, 5, 6, 'a', 'b', 'c', 'f']
      var colorArr = ['#000', 'skyblue', 'orange', 'tomato', 'blue', 'red']
      for (var i = 0; i < 6; i++) {
        // 生成一个span标签
        var span = document.createElement('span')
        span.style.cssText = ' font-size: 26px; font-weight: bold;  user-select: none;'
        // 生成span标签中的内容
        var num = (Math.random() * codeArr.length) >> 0
        span.innerText = codeArr[num]

        // 生成span标签的颜色
        var color = colorArr[(Math.random() * colorArr.length) >> 0]
        span.style.color = color

        // 把每一次生成的span标签，添加到yzm-code中去
        el.appendChild(span)
      }
    }

    // 更新验证码背景图片的函数  el表示要更新背景图片的那个元素
    function updateYzmBg(el) {
      var bgArr = [
        './images/yzm/line1.png',
        './images/yzm/line2.png',
        './images/yzm/line3.png',
        './images/yzm/line4.png',
      ]
      var bgIndex = (Math.random() * bgArr.length) >> 0
      var imgUrl = bgArr[bgIndex]
      el.style.backgroundImage = 'url(' + imgUrl + ')'
    }

    var container = document.querySelector('.container')
    addYzm(container)
  </script>
</body>
```

### 2.6、案例 6：点击换肤效果

涉及知识点

- 操作元素身上自定义属性
- 元素的显示与隐藏

![GIF 2022-10-12 22-19-28](https://www.arryblog.com/assets/img/GIF-2022-10-12-22-19-28.6b9ed608.gif)

```html
<style>
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  html,
  body {
    width: 100%;
    height: 100%;
  }
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  .body-img {
    background: url(./images/skin/big1.jpg) no-repeat;
    background-size: cover;
  }

  .update-skin {
    position: fixed;
    right: 10px;
    top: 10px;
    color: #fff;
    cursor: pointer;
  }
  .skin-container {
    width: 540px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    display: none;
  }
  .skin-container ul li {
    width: 260px;
    height: 163px;
    margin: 5px;
    float: left;
  }
  span.close {
    display: block;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 30px;
    position: absolute;
    right: -15px;
    top: -15px;
    cursor: pointer;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
  }
</style>

<body class="body-img">
  <span class="update-skin" id="J_skin">更换皮肤</span>
  <!-- 黑色半透明遮罩层 -->
  <div class="mask" id="J_mask"></div>
  <!-- 图片列表弹窗 -->
  <div class="skin-container" id="J_container">
    <span class="close">X</span>
    <ul class="clearfix">
      <li>
        <img src="./images/skin/min1.jpg" data-img="./images/skin/big1.jpg" />
      </li>
      <li>
        <img src="./images/skin/min2.jpg" data-img="./images/skin/big2.jpg" />
      </li>
      <li>
        <img src="./images/skin/min3.jpg" data-img="./images/skin/big3.jpg" />
      </li>
      <li>
        <img src="./images/skin/min4.jpg" data-img="./images/skin/big4.jpg" />
      </li>
    </ul>
  </div>

  <script>
    // 获取点击按扭
    var skin = document.getElementById('J_skin')
    // 获取半透明的遮罩层
    var mask = document.getElementById('J_mask')
    // 获取图片弹窗列表
    var skinContainer = document.getElementById('J_container')
    // 关半按扭
    var close = document.querySelector('#J_container .close')

    // 点击换肤按扭
    skin.onclick = function () {
      mask.style.display = 'block'
      skinContainer.style.display = 'block'
    }

    // 点击关闭按扭
    close.onclick = function () {
      mask.style.display = 'none'
      skinContainer.style.display = 'none'
    }

    // 点击图片，更换背景图
    var imgList = document.querySelectorAll('#J_container ul li img')
    var seletedImg = imgList[0] // 最开始选中的那一项
    seletedImg.style.outline = '2px solid red' // 最开始选中那一项样式
    for (var i = 0; i < imgList.length; i++) {
      imgList[i].onclick = function () {
        // 排他思想，清除前一次被选中元素样式
        seletedImg.style.outline = ''
        // 当前元素样式
        this.style.outline = '2px solid red'
        seletedImg = this
        var url = this.dataset.img
        document.body.style.backgroundImage = 'url(' + url + ')'
      }
    }
  </script>
</body>
```

### 3、onmouseover 和 onmouseout 事件

| 事件名      | 描述               |
| :---------- | :----------------- |
| onmouseover | 当鼠标进入某个对象 |
| onmouseout  | 当鼠标离开某个对象 |

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
</style>

<body>
  <div class="box"></div>
  <script>
    var box = document.querySelector('.box')
    box.onmouseover = function () {
      console.log('鼠标悬停在box上')
    }
    box.onmouseout = function () {
      console.log('鼠标离开了box')
    }
  </script>
</body>
```

### 3.1、案例 1：鼠标滑动，表格隔行变色

![GIF 2022-10-12 23-08-10](data:image/gif;base64,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)

```html
<style>
  ul li {
    height: 50px;
    width: 400px;
    list-style: none;
  }
  ul li:nth-child(even) {
    background-color: #ddd;
  }
  ul li:nth-child(odd) {
    background-color: #f5f5f5;
  }
  /* ul li:hover {
    background-color: plum;
    } */
</style>

<body>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <script>
    var liList = document.querySelectorAll('ul li')
    var currbg
    for (var i = 0; i < liList.length; i++) {
      // 鼠标悬停
      liList[i].onmouseover = function () {
        currbg = this.style.backgroundColor
        this.style.backgroundColor = 'plum'
      }

      // 鼠标离开
      liList[i].onmouseout = function () {
        this.style.backgroundColor = currbg
      }
    }
  </script>
</body>
```

### 3.2、案例 2：扫图游戏

> 当图形中的花全部被扫出来，整个游戏就结束了

![GIF 2022-10-13 0-48-44](https://www.arryblog.com/assets/img/GIF-2022-10-13-0-48-44.39023a13.gif)

```html
<style>
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  .container {
    width: 800px;

    border: 2px solid red;
    margin: 50px auto;
  }
  .container h1 {
    text-align: center;
  }
  .game {
    width: 800px;
    height: 600px;
    background: url(./images/games/flower.png);
    background-size: cover;
    background-color: khaki;
  }
  ul li {
    width: 50px;
    height: 50px;
    background-color: #ddd;
    float: left;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    display: none;
  }
</style>
<body>
  <div class="container">
    <h1>扫图游戏</h1>
    <div class="game">
      <!-- li的布局，用js生成 -->
      <!-- <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> -->
    </div>
  </div>
  <div class="mask"></div>

  <script>
    // 创建ul列表
    var ul = document.createElement('ul')
    var game = document.querySelector('.game')
    var mask = document.querySelector('.mask')
    var sum = 0 // 记录结果数组中被扫过的元素个数，如果sum等于data.lenght表示游戏结束
    var data = [
      23, 24, 25, 38, 39, 40, 41, 42, 43, 53, 54, 55, 56, 57, 58, 59, 67, 68, 69, 70, 71, 72, 73,
      74, 75, 76, 77, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 99, 100, 101, 102, 103, 104, 105, 106,
      107, 108, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 130, 131, 132, 133, 134, 135, 136,
      137, 138, 139, 147, 148, 149, 150, 151, 152, 153, 166, 167, 168, 169,
    ]

    for (var k = 0; k < 12 * 16; k++) {
      var li = document.createElement('li')
      li.index = k // 把序号记录在元素自身自定义属性上
      ul.appendChild(li)

      // 给每一个li添加一个onmouseover事件
      li.onmouseover = function () {
        this.style.opacity = 0
        // 如果sum===data.length，表示游戏结束
        if (sum === data.length) {
          mask.style.display = 'block'
        }
        var i = data.indexOf(this.index)
        if (i !== -1) {
          // 如果扫到数组中元素，则sum+1
          sum++
        }
        // 被扫过的元素，把身上的onmouseover事件取消
        this.onmouseover = null
      }
    }
    game.appendChild(ul)
  </script>
</body>
```

> 还有一个综合案例：放大镜效果，放在后面的综合案例应用中讲解

### 4、onmousedown、onmouseup 和 onmousemove

| 事件名      | 描述                                   |
| :---------- | :------------------------------------- |
| onmousedown | 当某个鼠标按键在某个对象上被按下时触发 |
| onmouseup   | 当某个鼠标按键在某个对象上被松开时触发 |
| onmousemove | 当某个鼠标按键在某个对象上被移动时触发 |

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>

<div class="box"></div>

<script>
  var box = document.querySelector('.box')
  box.onmousedown = function () {
    console.log('鼠标在box上按下')
  }
  box.onmouseup = function () {
    console.log('鼠标在box上抬起')
  }
  box.onmousemove = function () {
    console.log('鼠标在box移动')
  }
</script>
```

代码解读

- onmousedown 只会在鼠标按键被按下时触发一次
- onmouseup 只会在鼠标标按键松开时触发一次
- onmousemove 的触发频率特别高，只要稍会移动下，就会触发好多次

相关案例：参考本章综合案例应用中以下两个案例

- 案例 1：拖拽动画
- 案例 2：拖拽交换两元素位置

## 三、常见键盘事件（keypress、keydown 和 keyup 事件）

> 以下是常见的键盘事件

| 事件名     | 描述                                     |
| :--------- | :--------------------------------------- |
| onkeypress | **被弃用** （他会后于 onkeydown 触发）   |
| onkeydown  | 当某个键盘的键被按下（系统按钮可以识别） |
| onkeyup    | 当某个键盘的键被松开                     |

注：

- 一般使用键盘事件都是 document 和 input
- 如果需要在一个 div 中使用时，需要在 div 中增加`contenteditable="true"`

```html
姓名：
<input type="text" id="nameField" />
<script>
  var nameField = document.getElementById('nameField')

  // 当某个键盘的键被按下（系统按钮可以识别，并且会先于onkeypress发生）
  nameField.onkeydown = function () {
    console.log('我是 onkeydown')
  }

  // 当某个键盘的键被松开
  nameField.onkeyup = function () {
    console.log('我是 onkeyup')
  }
</script>
```

![image-20221018191515362](https://www.arryblog.com/assets/img/image-20221018191515362.4b69d4c5.png)

> 通过 keyup 事件，来获取每次键盘抬起时，文本输入框中的内容

```html
姓名：
<input type="text" id="nameField" />
<script>
  var nameField = document.getElementById('nameField')
  nameField.onkeyup = function () {
    console.log(this.value)
  }
</script>
```

![GIF 2022-11-2 14-49-27](https://www.arryblog.com/assets/img/GIF-2022-11-2-14-49-27.e8b0bbd4.gif)

注：

相关案例：参考本章综合案例应用中的第 3 个案例

案例 3：键盘控制元素运动

## 四、常见表单事件

> 常见的表单事件如下

| 事件名 | 描述                                      |
| :----- | :---------------------------------------- |
| change | 当用户改变域的内容                        |
| focus  | 当某元素获得焦点（比如 tab 键或鼠标点击） |
| blur   | 当某元素失去焦点                          |

### 1、focus 和 blur 事件

- 当文本框获取焦点 focus 时，文本框背景色变蓝
- 当文本框失去焦点 blur 时，取消蓝色背景，同时在控制台打印输入框内容

```html
<input type="text" name="" id="username" autocomplete="off" />
<script>
  var input = document.getElementById('username')
  input.addEventListener('focus', fn, false)
  input.addEventListener('blur', fn2, false)

  // 获取焦点事件处理函数
  function fn() {
    this.style.backgroundColor = 'skyblue'
  }

  // 失去焦点事件处理函数
  function fn2() {
    this.style.backgroundColor = ''
    console.log(this.value)
  }
</script>
```

![GIF 2022-10-27 18-02-24](https://www.arryblog.com/assets/img/GIF-2022-10-27-18-02-24.9e6b5977.gif)

注：

相关案例：参考本章综合案例应用中的第 5 个案例

案例 5：表单验证提示效果

### 2、change 事件

change 事件，只会在内容发生改变时才触发，如果重复选择，内容不变，不会触发

> **案例**：当选中下拉列表中的某个元素，把对应选中的内容显示在控制台

![GIF 2022-10-27 19-26-02](https://www.arryblog.com/assets/img/GIF-2022-10-27-19-26-02.01f62f6b.gif)

```html
你最喜欢的水果
<select id="friut">
  <option value="apple">苹果</option>
  <option value="banana">香蕉</option>
  <option value="pear">梨子</option>
  <option value="watermelon">西瓜</option>
</select>

<script>
  var friut = document.getElementById('friut')
  friut.addEventListener('change', fn, false)
  function fn() {
    var _index = this.selectedIndex // 被选中元素的下标
    var value = this.options[_index].value // 被选中元素的value值,如 pear
    var text = this.options[_index].text // 被选中元素的文本 如 梨子
    console.log(value, text)
  }
</script>
```

### 3、二级联动下拉

涉及知识点

- 多级联动的原理
- 自定义数据结构
- change 事件
- 如何利用自定义属性保存数据
- DOM 创建与添加
- DOM 片段 createDocumentFragment

![GIF 2022-10-27 19-04-39](https://www.arryblog.com/assets/img/GIF-2022-10-27-19-04-39.f8313e8a.gif)

```html
<select name="" id="province">
  <!-- 
<option data-city="长沙市,株洲市,湘潭市,常德市"></option>
<option data-city="西安市,铜川市,咸阳市,安康市,宝鸡市"></option>
<option data-city="成都市,广元市,德阳市,眉山市"></option>
--></select>
<select name="" id="city">
  <!-- 
<option value="">长沙市</option>
<option value="">株洲市</option>
<option value="">湘潭市</option>
<option value="">常德市</option>
--></select>
<script>
  var data = [
    {
      province: '湖南',
      city: ['长沙市', '株洲市', '湘潭市', '常德市'],
    },
    {
      province: '陕西',
      city: ['西安市', '铜川市', '咸阳市', '安康市', '宝鸡市'],
    },
    {
      province: '四川',
      city: ['成都市', '广元市', '德阳市', '眉山市'],
    },
  ]

  // 首先是拿到两个下拉列表对象
  var province = document.getElementById('province')
  var city = document.getElementById('city')
  init(data)
  // 数据初始化
  function init(data) {
    var frag = document.createDocumentFragment()
    // 先填充 省份
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option')
      option.text = data[i].province
      // 把对应的市数据绑定到他的自定义属性中
      option.dataset.city = data[i].city
      frag.appendChild(option)
    }
    province.appendChild(frag)
    // 填充对应的市数据
    addCityDate(city, data[0].city)
  }

  // 给下拉列表绑定change事件
  province.addEventListener('change', addCity, false)

  function addCity() {
    // 第一种:拿到对应省份名字，然后去总数据data去查询对应省份的市信息
    var _index = this.selectedIndex
    // var text = this.options[_index].text; // 湖南  陕西
    // 获取被选中元素自定义属性中的市信息
    var cityDate = this.options[_index].dataset.city
    // 把获取到的市信息转换成对应的数组，便于后期操作
    // ['西安市', '铜川市', '咸阳市', '安康市', '宝鸡市']
    cityDate = cityDate.split(',')
    // 拿省对应的市数据
    // var cityDate = filter(text, data);
    //填充对应的市下拉列表
    addCityDate(city, cityDate)
  }

  //定义一个函数，通过省份名字，返回对应省份的市信息
  function filter(province, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].province === province) {
        return data[i].city
      }
    }
  }
  //用市数据来填充市下拉列表
  function addCityDate(el, data) {
    el.innerHTML = '' // 加数据前，要把原来的数据清空
    var frag = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option')
      option.text = data[i]
      frag.appendChild(option)
    }
    el.appendChild(frag)
  }
</script>
```

### 4、省市区三级联动

![GIF2022-11-101-15-49](https://www.arryblog.com/assets/img/GIF2022-11-101-15-49.7d47a3ea.gif)

> 省市区三级联动 JSON 数据包下载：`data.js` （该文件在钉钉裙文件中可下载）

```html
<div id="area"></div>
<script>
  // 我们需要利用JS来动态创建三个下拉列表，同时把对应的数据填充好，然后再一次性插入到页面中来
  var area = document.getElementById('area')
  var selectArr = [] // 用来保存初始的三个下拉列表
  init(area, data)
  // 初始化函数
  function init(el, data) {
    // 创建下拉列表
    var select = document.createElement('select') // 创建一个下拉列表
    selectArr.push(select)
    // select.addEventListener('change',fn,false);
    for (var i = 0; i < data.length; i++) {
      // 创建option
      var option = document.createElement('option')
      // 这里是重点，这个对应的id等下要用来找数据
      option.value = data[i].pid || data[i].cid || data[i].aid
      option.text = data[i].fullname
      select.appendChild(option)
    }
    el.appendChild(select)

    // 递归调用 初始化市 区数据
    if (data[0].children) {
      init(el, data[0].children)
    }
  }

  // 开始级省份下拉列表添加change事件
  selectArr[0].onchange = function () {
    // 查找省份对应的id，然后用他来查找省份对应的市数据
    var _index = this.selectedIndex
    var id = this.options[_index].value
    // 找到对应省份的市数据 ，首先找到对应省份，然后找到对应的市数据，然后再填充
    // 直接拿着对应的省份，去所有数据中找，然后把对应市数据拿到
    var children = find(id, data)
    // 拿省份对应的市数据，那就开始填充数据
    addDate(selectArr[1], children)
    // 驱动区数据的变化
    addDate(selectArr[2], children[0].children)
  }

  // 开始市级下拉列表添加change事件
  selectArr[1].onchange = function () {
    var _index = this.selectedIndex
    var id = this.options[_index].value
    // 拿市 id要去找对应的区数据
    var children = find(id, data)
    // 填充数据
    addDate(selectArr[2], children)
  }

  // 填充数据，el谁里面填数据 data用来填充的数据
  function addDate(el, data) {
    el.innerHTML = '' // 往el中填数据前，要清空之前数据
    var frag = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option')
      option.value = data[i].pid || data[i].cid || data[i].aid
      option.text = data[i].fullname
      frag.appendChild(option)
    }
    el.appendChild(frag)
  }

  /**
   * find 根据pid 或 cid 或aid来查找对应省或市或区的下一级
   * id为对应pid或 cid或aid
   * data为省市区数据
   * n表示递归的深度
   */
  function find(id, data, n) {
    var result
    var flag = false
    n = n || 100
    return search(id, data, n)
    function search(id, data, n) {
      if (n === -1) {
        return
      }
      // 数据遍历
      for (var i = 0; i < data.length; i++) {
        if (flag) break // 退出整个for循环
        if (data[i].pid === id || data[i].cid === id || data[i].aid === id) {
          result = data[i].children
          flag = true // 找到了标记为true,用来退出后面所有for循环
          break // 或 return result;
        } else {
          if (data[i].children) {
            n-- // 调用递归就开始减
            search(id, data[i].children, n) // 值
            n++
          }
        }
      }
      return result
    }
  }
</script>
```

### 5、省市区 - 数据查询策略 - 深度全面查询

**深度全面查询**：

- 根据传递的（pid、cid、aid)来查询对应省、市、区的 children
- 不管 id 是省份 pid 还是 cid，还是 aid，其查询规则是，先深度后广度
- 查询顺序：（第一个省、第一个市、所有区 `---->` 第二个市 、所有区`---->` ......当前省下所有市区都查完。

> 按上面顺序查询第 2，3，4.....省）中间只要查到，就不再查询，返回对应结果

```js
/**
 * find 根据pid 或 cid 或aid来查找对应省或市或区的下一级
 * id为对应pid或 cid或aid
 * data为省市区数据
 * n表示递归的深度
 */
function find(id, data, n) {
  var result
  var flag = false // 用来标记，退出整个for循环
  n = n || 100
  return search(id, data, n)
  function search(id, data, n) {
    // 递归深度达到 或  数据不存在，则退出
    if (n === -1 || !data) return

    // 数据遍历
    for (var i = 0; i < data.length; i++) {
      if (flag) break // 退出整个for循环
      if (data[i].pid === id || data[i].cid === id || data[i].aid === id) {
        result = data[i].children
        flag = true // 找到了标记为true,用来退出后面所有for循环
        break // 或 return result;
      } else {
        n-- // 调用递归就开始减
        search(id, data[i].children, n) // 值
        n++
      }
    }
    return result
  }
}

find('130000', data, 0)
find('130200', data, 0)
find('130203', data, 0)
```

### **6、省市区 - 数据查询策略 - 逐级查询**

- 根据对应省 pid 查询对应省下面市信息
- 根据对应省 pid 和市 cid 查询对应省-市下面的区信息
- 根据省 pid 和市 cid 及 aid，查询对应省-市-区下面街道信息。因数据中没有提供区的下一级，即返回 null

我们定义一个对象 ids，用来保存要查询的 id，然后当前参数传到 find 函数中

- 查省对应市 `var ids = {pid: "130000"}`;
- 查省-市对应区`var ids = {pid: "130000",cid: "130100"}`;
- 查省-市-区对应街道 `var ids = {pid: "130000",cid: "130100",aid: "130102"}`;

```js
/**
 * find 根据传递id集合，找到对应市、区、街道信息
 * ids查询id集合   { pid: "130000", cid: "130100" }
 * data 查询的数据
 */

//   var a = 0;  查看查询的次数
function find(ids, data) {
  // 遍历对象
  for (var key in ids) {
    for (var i = 0; i < data.length; i++) {
      // a++;
      if (
        (data[i].pid && data[i].pid === ids[key]) ||
        (data[i].cid && data[i].cid === ids[key]) ||
        (data[i].aid && data[i].aid === ids[key])
      ) {
        data = data[i].children // 每一轮查找下一轮要查询的数据
        break // 找到了就退出，不找了，只退出第一层for循环
      }
    }
  }
  // console.log(a);
  return data || null
}

//   find({ pid: "130000" }, data);
//   find({ pid: "130000", cid: "130100" }, data);
//   find({ pid: "130000", cid: "130100", aid: "130102" }, data);

//   find({ pid: "820000" }, data);
//   find({  pid: "820000", cid: "820000" }, data);
//   find({ pid: "820000", cid: "820000", aid: "820101" }, data);
```

> 如何记录每个下拉列表当前被选中项的 `pid`或`cid`或`aid`的值呢 ？
> 在当前对象上添加一个属性，用来记录。

- `init()` 函数初始化时，给对象添加对应属性保存对应值

```js
data[0].pid && (select.pid = data[0].pid)
data[0].cid && (select.cid = data[0].cid)
data[0].aid && (select.aid = data[0].aid)
```

- 对应的 change 事件中

```js
this.pid = this.options[_index].value
// 或
this.cid = this.options[_index].value
// 或
this.aid = this.options[_index].value
```

- addDate 函数中

```js
el.pid && (el.pid = data[0].pid)
el.cid && (el.cid = data[0].cid)
el.aid && (el.aid = data[0].aid)
```

**完整实现**

```html
<div id="area"></div>
<script>
  // 我们需要利用JS来动态创建三个下拉列表，同时把对应的数据填充好，然后再一次性插入到页面中来
  var area = document.getElementById('area')
  var selectArr = [] // 用来保存初始的三个下拉列表
  init(area, data)
  // 初始化函数
  function init(el, data) {
    // 创建下拉列表
    var select = document.createElement('select') // 创建一个下拉列表
    selectArr.push(select)
    // select.addEventListener('change',fn,false);
    for (var i = 0; i < data.length; i++) {
      // 创建option
      var option = document.createElement('option')
      // 这里是重点，这个对应的id等下要用来找数据
      option.value = data[i].pid || data[i].cid || data[i].aid
      option.text = data[i].fullname
      select.appendChild(option)
    }
    el.appendChild(select)

    // 保存对应pid或cid 或 aid到对象身上
    data[0].pid && (select.pid = data[0].pid)
    data[0].cid && (select.cid = data[0].cid)
    data[0].aid && (select.aid = data[0].aid)

    // 递归调用 初始化市 区数据
    if (data[0].children) {
      init(el, data[0].children)
    }
  }

  // 开始级省份下拉列表添加change事件
  selectArr[0].onchange = function () {
    // 查找省份对应的id，然后用他来查找省份对应的市数据
    var _index = this.selectedIndex
    var pid = this.options[_index].value
    this.pid = pid // 保存pid
    // 找到对应省份的市数据 ，首先找到对应省份，然后找到对应的市数据，然后再填充
    // 直接拿着对应的省份，去所有数据中找，然后把对应市数据拿到
    var children = find({ pid: pid }, data)
    // 拿省份对应的市数据，那就开始填充数据
    addDate(selectArr[1], children)
    // 驱动区数据的变化
    addDate(selectArr[2], children[0].children)
  }

  // 开始市级下拉列表添加change事件
  selectArr[1].onchange = function () {
    var _index = this.selectedIndex
    var cid = this.options[_index].value
    this.cid = cid // 保存id
    // 拿市 id要去找对应的区数据

    var children = find({ pid: selectArr[0].pid, cid: cid }, data)
    // 填充数据
    addDate(selectArr[2], children)
  }

  selectArr[2].onchange = function () {
    var _index = this.selectedIndex
    var id = this.options[_index].value
    this.aid = id // 保存aid
  }

  // 填充数据，el谁里面填数据 data用来填充的数据
  function addDate(el, data) {
    el.innerHTML = '' // 往el中填数据前，要清空之前数据
    el.pid && (el.pid = data[0].pid)
    el.cid && (el.cid = data[0].cid)
    el.aid && (el.aid = data[0].aid)
    var frag = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option')
      option.value = data[i].pid || data[i].cid || data[i].aid
      option.text = data[i].fullname
      frag.appendChild(option)
    }
    el.appendChild(frag)
  }

  function find(ids, data) {
    // 遍历对象
    for (var key in ids) {
      for (var i = 0; i < data.length; i++) {
        // a++;
        if (
          (data[i].pid && data[i].pid === ids[key]) ||
          (data[i].cid && data[i].cid === ids[key]) ||
          (data[i].aid && data[i].aid === ids[key])
        ) {
          data = data[i].children // 每一轮查找下一轮要查询的数据
          break // 找到了就退出，不找了，只退出第一层for循环
        }
      }
    }
    // console.log(a);
    return data || null
  }

  // 无关函数，用来询对象身上的pid或cid 或 aid属性
  function show() {
    for (var i = 0; i < selectArr.length; i++) {
      console.log(selectArr[i].pid || selectArr[i].cid || selectArr[i].aid)
    }
  }
</script>
```

## 五、DOM 事件流

本章要学习 DOM 事件流相关内容，我会从以下 5 个方面展开讲解

- 什么是事件流
- 如何监听事件捕获与冒泡
- 不支持事件冒泡的事件
- on 与 addEventListener 两者区别

### 1、事件流

在了解什么是事件流之前，我们先来回答下面这个问题。

- 以下图中的四个圆 A、B、C、D 共用一个圆心，这个圆心称为同心圆。如果用手指点击中心，那我们按住了哪个圆？
- 实际上我们**按住了所有的圆**

![image-20221102154051995](https://www.arryblog.com/assets/img/image-20221102154051995.0f6ef934.png)

> 网页事件监听也是类似的,如果多个元素发生嵌套，当我们点击最里面的元素，本质上相当于点击了所有元素。

假设

以上图中的 A、B、C、D 为嵌套的 4 个 div 元素，当我在中心点点击后，则相当于四个 div 元素都触发了`click`点击事件。那事件触发的顺序是以下那种情况？

- 第一种情况： A ---> B ---> C ---> D
- 第二种情况： D ---> C ---> B ---> A

> 以上两种情况都有可能，但在具体的应用中，到底是情况一，还是情况二呢？

这就需要我们了解**事件流**

- 事件流描述了页面接收事件的顺序
- 事件流分为 3 个阶段：**事件捕获**、**到达目标**、**事件冒泡**

> 事件的传播本质是：先从外到内，到达实际的目标元素，然后再从内到外

- 从外到内的阶段称为：**事件捕获阶段**
- 从内到外的阶段称为：**事件冒泡阶段**

![image-20221102161900169](https://www.arryblog.com/assets/img/image-20221102161900169.99f72adb.png)

注：

- **事件冒泡：** 最先由 IE 公司提出，事件定义为从最具体的元素开始触发，然后向上传播至文档
- **事件捕获：** 最先由网景公司提出，事件定义为从最外层（最不具体的节点）开骀先收到（触发）事件，然后再传到具体的节点。

> 最后规范中规定事件流分为 3 个阶段：事件捕获、到达目标、事件冒泡

### 2、如何监听事件捕获与冒泡

监听事件有两种方式：

- on 开头方式
- addEventListener 方式

> 那这两种方式在事件监听上有何不同 ？

on 开头方式，只能监听到事件冒泡阶段，不支持监听事件捕获阶段

```js
// 监听冒泡阶段
element.onclick = function () {};
<style>
  #box3 {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
  }
  #box2 {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    padding: 50px;
  }
  #box1 {
    width: 202px;
    height: 202px;
    border: 1px solid #000;
    padding: 50px;
  }
</style>

<div id="box1">
  <div id="box2">
    <div id="box3"></div>
  </div>
</div>
<script>
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  var box3 = document.getElementById("box3");

  // 监听冒泡阶段
  box1.onclick = function () {
    console.log("冒泡，我是box1");
  };

  box2.onclick = function () {
    console.log("冒泡，我是box2");
  };
  box3.onclick = function () {
    console.log("冒泡，我是box3");
  };
</script>
```

![image-20221102163957973](https://www.arryblog.com/assets/img/image-20221102163957973.586ccb88.png)

以上代码

on 方式只能监听到冒泡阶段，所以会先从 box3 开始，再 box2，最后 box1

addEventListener 方式监听事件。由它的第三个参数决定，是监听捕获还是冒泡阶段

- 如果第三个参数是`true` ， 表示监听捕获阶段
- 如果第三个参数是`false` ，表示监听冒泡阶段

```js
// 监听捕获阶段
element.addEventListener('click', function () {}, true)

// 监听冒泡阶段
element.addEventListener('click', function () {}, false)
```

**代码演示**

```html
<style>
  #box3 {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
  }
  #box2 {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    padding: 50px;
  }
  #box1 {
    width: 202px;
    height: 202px;
    border: 1px solid #000;
    padding: 50px;
  }
</style>

<div id="box1">
  <div id="box2">
    <div id="box3"></div>
  </div>
</div>

<script>
  var box1 = document.getElementById('box1')
  var box2 = document.getElementById('box2')
  var box3 = document.getElementById('box3')

  // 监听捕获就阶段
  box1.addEventListener(
    'click',
    function () {
      console.log('我是box1的捕获阶段')
    },
    true,
  )

  box2.addEventListener(
    'click',
    function () {
      console.log('我是box2的捕获阶段')
    },
    true,
  )

  box3.addEventListener(
    'click',
    function () {
      console.log('我是box3的捕获阶段')
    },
    true,
  )

  // 监听冒泡阶段
  box1.addEventListener(
    'click',
    function () {
      console.log('我是box1的冒泡阶段')
    },
    false,
  )

  box2.addEventListener(
    'click',
    function () {
      console.log('我是box2的冒泡阶段')
    },
    false,
  )

  box3.addEventListener(
    'click',
    function () {
      console.log('我是box3的冒泡阶段')
    },
    false,
  )
</script>
```

![image-20221102164559088](https://www.arryblog.com/assets/img/image-20221102164559088.a60c0529.png)

以上代码中

- 当我们点击了`box3`时，事件是 先从 box1-box2-box3 捕获阶段。再由 box3-box2-box1 的冒泡阶段。
- on 开头绑定事件的方式，只能监听到冒泡阶段
- addEventListener 到底监听那个阶段，是由他的第三个参数决定的。

### 3、mouseenter 和 mouseleave 事件不支持冒泡

| 事件名     | 描述                                                   |
| :--------- | :----------------------------------------------------- |
| mouseenter | 当鼠标进入某个对象（相似事件 onmouseover）不能向上冒泡 |
| mouseleave | 当鼠标离开某个对象（相似事件 onmouseout）不能向上冒泡  |

```html
<style>
  .box1 {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
  .box2 {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
</style>

<div class="box1">
  <div class="box2"></div>
</div>

<script>
  var box1 = document.querySelector('.box1')
  var box2 = document.querySelector('.box2')

  // box1.addEventListener("mouseenter", fn1, false);
  // box2.addEventListener("mouseenter", fn2, false);

  // box1.addEventListener("mouseleave", fn1, false);
  // box2.addEventListener("mouseleave", fn2, false);

  // box1.addEventListener("mouseover", fn1, false);
  // box2.addEventListener("mouseover", fn2, false);

  box1.addEventListener('mouseout', fn1, false)
  box2.addEventListener('mouseout', fn2, false)

  function fn1() {
    console.log('box1')
  }
  function fn2() {
    console.log('box2')
  }
</script>
```

### 4、on 与 addEventListener 两者监听事件的区别

| 区别                 | on 方式监听                            | addEventListener 方式监听                                                                           |
| :------------------- | :------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| 事件捕获与冒泡       | 只能监听到冒泡阶段                     | 第三个参数是 true，监听捕获阶段 第三个参数是 false ,监听冒泡阶段                                    |
| 事件处理函数         | 同一事件，只能有一个                   | 同一事件，任意个都行                                                                                |
| 事件处理函数执行顺序 | 写在后面的覆盖前面的，以最后的一个为主 | 先执行捕获阶段，再执行冒泡阶段，在这两个阶段， 以代码书写时的顺序为主，从上往下执行每个事件处理函数 |

- on 方式

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>

<div class="box"></div>

<script>
  var box = document.querySelector('.box')
  box.onclick = function () {
    console.log('on方式，第2个事件处理函数')
  }
  box.onclick = function () {
    console.log('on方式，第2个事件处理函数')
  }
  // 最终点击元素，只会执行最后一次监听的事件处理函数
  // 写在后面的会覆盖前面的
  // 占击元素，在控制台输出 "on方式，第2个事件处理函数“
</script>
```

![image-20221013030058931](https://www.arryblog.com/assets/img/image-20221013030058931.2bd0aa42.png)

- addEventListener 方式

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>

<div class="box"></div>

<script>
  var box = document.querySelector('.box')
  box.addEventListener('click', fn1, false)
  box.addEventListener('click', fn2, false)

  function fn1() {
    console.log('addEventListener方式，第1个事件处理函数')
  }
  function fn2() {
    console.log('addEventListener方式，第2个事件处理函数')
  }
  // 最终点击元素，2个事件处理函数都会执行
</script>
```

![image-20221013030023526](https://www.arryblog.com/assets/img/image-20221013030023526.6faa6966.png)

### 5、经典面试题

面试真题

给一个 DOM 同时绑定两个点击事件，一个用捕获，一个用冒泡，说下会执行几次事件，然后会先执行冒泡还是捕获（知乎）

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  box.addEventListener('click', fn1, true)
  box.addEventListener('click', fn2, false)
  function fn1() {
    console.log('事件捕获阶段')
  }
  function fn2() {
    console.log('事件冒泡阶段')
  }
</script>
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析并完成题目，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 6、总结

什么是事件流 ？

- 事件流描述了页面接收事件的顺序
- 事件流分为 3 个阶段：**事件捕获**、**到达目标**、**事件冒泡**

**什么是事件捕获和事件冒泡 ？**

- 事件捕获 ：事件由外向内传播，最后到达目标元素，这个阶段称为事件捕获阶段
- 事件冒泡：事件从目标元素由内向外传播，最后到达文档，这个阶段称为事件冒泡

**如可监听事件捕获与事件冒泡 ？**

- on 开头的方式，只能监听到事件冒泡阶段，不能监听到事件捕获阶段
- addEventListener 中的第三个参数，如果是 true，表示监听捕获阶段，如果为 false，表示监听冒阶段

**on 与 addEventListenter 两种方式监听事件的区别 ？**

- on 同一事件只能添加一个事件处理函数，写在后面的会覆盖前面的
- addEventListenter 方式，同一事件可以添加任意个事件处理函数，先执行捕获阶段，再执行冒泡阶段，捕获与冒泡阶段的事件函数处理顺序，是按代码从上往下的书写顺序来的。

**注意事项：**

- 在实际开发中，我们很少使用事件捕获，主要以事件冒泡这种形式为主。
- 有些事件不支持事件冒泡，比如：`onmouseenter 、 onmouseleave 、onload、onblur、onfocus`
- 事件冒泡有时候会带来一些麻烦，我们需要阻止事件冒泡，这个后面会做相关讲解。

## 六、event 事件对象

- 事件处理函数提供了一个形参，它是一个对象，封装了本次**事件的所有细节**
- 这个参数通常用 单词`event`或`e`、`ev`表示

```js
oBox.onmousemove = function (e) {
  // 对象e就是这次事件的 “事件对象”
}
```

### 1、鼠标位置

> 事件对象 event 上提供了鼠标位置相关的属性，具体如下表

| 属性    | 描述                               |
| :------ | :--------------------------------- |
| clientX | 鼠标指针相对于浏览器的水平坐标     |
| clientY | 鼠标指针相对于浏览器的垂直坐标     |
| pageX   | 鼠标指针相对于整张网页的水平坐标   |
| pageY   | 鼠标指针相对于整张网页的垂直坐标   |
| offsetX | 鼠标指针相对于事件源元素的水平坐标 |
| offsetY | 鼠标指针相对于事件源元素的垂直坐标 |

### 1.1、clientX 和 clientY

> clientX 和 clientY 分别表示：鼠标指针相对于浏览器的水平和垂直坐标

![image-20211230134846195](https://www.arryblog.com/assets/img/image-20211230134846195.9047cd81.png)

### 1.2、offsetX 和 offsetY

> offsetX 和 offsetY 分别表示：鼠标指针相对于事件源元素的水平和垂直坐标

![image-20211230134026215](https://www.arryblog.com/assets/img/image-20211230134026215.5ecbe607.png)

### 1.3、pageX 和 pageY

> pageX 和 pageY 分别表示：鼠标指针相对于整张网页的水平和垂直坐标

![image-20211230135405150](https://www.arryblog.com/assets/img/image-20211230135405150.0c568aea.png)

### 1.4、代码演示

```html
<style>
  .box {
    width: 300px;
    height: 200px;
    background-color: skyblue;
    margin: 300px auto;
  }
  body {
    height: 3000px;
  }
</style>

<body>
  <div class="box"></div>

  <script>
    var box = document.querySelector('.box')
    box.onmousedown = function (e) {
      var x = e.clientX
      var y = e.clientY
      console.log('鼠标与浏览器顶部与左边', x, y)

      var _x = e.offsetX
      var _y = e.offsetY
      console.log('鼠标与事件源左边和上边', _x, _y)

      var _pagex = e.pageX
      var _pagey = e.pageY
      console.log('鼠标与整个网页上边与左边距离', _pagex, _pagey)
    }
  </script>
</body>
```

![image-20221013014621554](https://www.arryblog.com/assets/img/image-20221013014621554.cefdfacd.png)

### 2、e.key 和 e.code

事件对象上提供了获取**键盘键码**相关的属性，主要与`onkeydown`、`onkeyup`事件结合使用。

> 参考 [MDN 官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code)

| 属性名   | 用处                                                                                                                                             |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| key      | 返回用户按下的物理按键的值。 按下的键如果是可打印内容，返回的就是对应按扭的值 如果是一个**控制键或特殊字符**，返回一个事先定义好的值，参考以下表 |
| code     | 表示键盘上的物理键                                                                                                                               |
| charCode | **被弃用**                                                                                                                                       |
| keyCode  | **被弃用**                                                                                                                                       |

> 控制键或特殊字符

| 按键                     | 键值                                              |
| :----------------------- | :------------------------------------------------ |
| 四个方键 `←` `↑` `→` `↓` | `ArrowLeft`、`ArrowUp`、`ArrowRight`、`ArrowDown` |
| 回车键                   | Enter                                             |
| 空格键                   | ”“                                                |
| 删除键                   | Backspace                                         |

> 更多的就不一一出来了，大家可以自己测试下

```js
document.onkeydown = function (e) {
  console.log('e.key:' + e.key)
  console.log('e.code:' + e.code)
}
```

![image-20221018191947091](https://www.arryblog.com/assets/img/image-20221018191947091.01c7f361.png)

### 3、e.altKey、e.ctrlKey、e.shiftKey

| 属性名   | 说明                                                                                   |
| :------- | :------------------------------------------------------------------------------------- |
| ctrlKey  | 表示事件触发时 `ctrl`键是否 按下 如果按下，则 `e.ctrlKey` 返回值为 true，否则为 false  |
| altKey   | 表示事件触发时`alt`键是否 按下 如果按下，则 `e.altKey` 返回值为 true，否则为 false     |
| shiftKey | 表示事件触发时`shift`键是否 按下 如果按下，则 `e.shiftKey` 返回值为 true，否则为 false |

**代码演示**

```js
document.onkeydown = function (e) {
  console.log('e.ctrlKey:' + e.ctrlKey)
  console.log('e.altKey:' + e.altKey)
  console.log('e.shiftKey：' + e.shiftKey)
}
```

![image-20221018195457304](https://www.arryblog.com/assets/img/image-20221018195457304.47e1dcad.png)

> 同时按下 ctrl 键和字母 A 键，则浏览器背景颜色变红

```js
document.onkeydown = function (e) {
  if (e.ctrlKey && e.key === 'a') {
    document.body.style.backgroundColor = 'red'
  }
}
```

### 4、e.preventDefault() 方法

- `e.preventDefault()`方法用来`阻止事件产生的 "默认动作"`
- 常见图片默认的拖拽行为、超链接的默认点击跳转行为，如下动画演示

![GIF 2022-10-18 18-02-48](https://www.arryblog.com/assets/img/GIF-2022-10-18-18-02-48.40819742.gif)

```html
<img src="./images/skin/min1.jpg" alt="" id="img" />
<a href="http://www.icodingedu.com" id="logo">艾编程</a>

<script>
  var img = document.getElementById('img')
  var oA = document.getElementById('logo')

  //   阻止鼠标按下时的默认拖拽行为
  img.onmousedown = function (e) {
    e.preventDefault()
  }

  //   阻止超链接被点击后的默认跳转行为
  oA.onclick = function (e) {
    e.preventDefault()
  }
</script>
```

### 5、e.stopPropagation() 方法

- `e.stopPropagation()`方法 **用来阻止事件冒泡**
- 在一些场合，非常有必要切断事件继续传播，否则会造成页面特效显示出 bug

```html
<style>
  .box1 {
    width: 200px;
    height: 200px;
    background-color: khaki;
  }
  .box2 {
    width: 100px;
    height: 100px;
    background-color: skyblue;
  }
</style>

<div class="box1">
  <div class="box2"></div>
</div>

<script>
  var box1 = document.querySelector('.box1')
  var box2 = document.querySelector('.box2')
  box1.onclick = function () {
    console.log('box1被点击了')
  }
  box2.onclick = function (e) {
    /* 
        默认情况下，我们点击box2，click事件会冒泡到box1上，所以点击box2时， 
        box1的click事件也被触发了，但加上e.stopPropagation()后，点击box2时，
        事件冒泡被阻止了,所以box1的click事件不会被触发
    */
    e.stopPropagation()
    console.log('box2被点击了')
  }
</script>
```

![image-20221018182001537](https://www.arryblog.com/assets/img/image-20221018182001537.c6125607.png)

## 八、事件委托

接下来我们学习一个很重要的知识，事件委托。

> 那什么是事件委托呢 ？

### 1、什么是事件委托

- 事件委托可以理解为，本来是 A 要处理的事情，现在委托给了 B 来处理，事件委托也称为事件代理。
- 事件委托是通过事件冒泡机制来实现，本来由各个子节点处理的事情，现在全部委托给其父节点来处理。

> 接下来我们通过下面这个案例来演示，对比常规方法和事件委托处理之间的优缺点。

### 1.1、案例 1：批量给子元素添加事件

- 页面上有一个无序列表`<ul>`，它内部共有`10`个`<li>`元素，请**批量**给它们添加点击事件监听
- 实现效果：点击哪个`<li>`元素，哪个`<li>`元素的文字颜色就变红

**常规方法**

```html
<ul id="list">
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  <li>列表项4</li>
  <li>列表项5</li>
  <li>列表项6</li>
  <li>列表项7</li>
  <li>列表项8</li>
  <li>列表项9</li>
  <li>列表项10</li>
</ul>
<script>
  var oList = document.getElementById('list')
  var lis = oList.getElementsByTagName('li')

  // 书写循环语句，批量给元素添加监听
  for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      // 更改li的字体颜色
      this.style.color = 'red'
    }
  }
</script>
```

批量添加事件监听的性能问题

- 每一个事件监听注册都会消耗一定的系统内存，而批量添加事件会导致监听数量太多，内存消耗会非常大
- 再加上，每个 li 的事件处理函数都是不同的函数，这些函数本身也会占用内存

**事件委托方式处理**

- 我们把所有子节点 li 的 click 事件全部委托给到他们对共同的父节点 ul 来处理
- 给 ul 添加 click 事件，当点击每个 li 时，其 li 上的 click 事件会通过冒泡的机制，来触发父节点上的 click 事件

> 事件委托通常需要结合事件对象身上的 target 和 currentTarget 属性来处理

| 属性          | 描述                                  |
| :------------ | :------------------------------------ |
| target        | 触发此事件的最早元素，即 "事件源元素" |
| currentTarget | 绑定事件的那个元素                    |

```html
<ul id="list">
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  <li>列表项4</li>
  <li>列表项5</li>
  <li>列表项6</li>
  <li>列表项7</li>
  <li>列表项8</li>
  <li>列表项9</li>
  <li>列表项10</li>
</ul>

<script>
  var oUl = document.getElementById('list')
  oUl.onclick = function (e) {
    e.target.style.color = 'red'

    console.log(e.currentTarget) // 绑定当前click事件的元素 oUl
    console.log(e.target) // 当前点击的li元素，用户真正点击的那个元素
  }
</script>
```

事件委托的优点

减少了事件监听的个数，同时绑定的函数个数也大大减少了。这些减少，本质就是减少内存的消耗，从而提高性能。

### 1.2、案例 2：给新增元素动态绑定事件

- 页面上有一个无序列表`<ul>`，它内部没有`<li>` 元素，请制作一个按钮，点击这个按钮就能增加一个 li 元素
- 并且要求每个 li 上有一个删除按扭，点击后删除当前这个 li 元素

![GIF 2022-10-18 22-25-52](data:image/gif;base64,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)

**常规方法**

```html
<style>
  .add {
    width: 100px;
    height: 50px;
    background-color: tomato;
    font-size: 20px;
    text-align: center;
    border: none;
    color: #fff;
  }
  #list li {
    width: 300px;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 1px dotted #ddd;
    list-style: none;
    position: relative;
  }
  #list li span {
    width: 80px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: turquoise;
    text-align: center;
    line-height: 30px;
    color: #fff;
    border-radius: 10px;
  }
</style>

<button class="add">新增</button>
<ul id="list"></ul>

<script>
  var addButton = document.querySelector('.add')
  var oUl = document.getElementById('list')
  var count = 0 // 用来统计当前新增li的序号
  addButton.onclick = function () {
    count++
    // 创建新的li元素
    var li = document.createElement('li')
    li.innerText = '第' + count + '个li元素'
    // 创建 li用作删除按扭
    var span = document.createElement('span')
    span.innerText = '删除'
    // 把span添加到li中
    li.appendChild(span)
    // 给span添加点击事件
    span.onclick = function () {
      this.parentNode.parentNode.removeChild(this.parentNode)
    }
    // 把li添加到ul中
    oUl.appendChild(li)
  }
</script>
```

**事件委托**

> li 中每个 span 身上的点击事件委托给到 ul 来处理

```html
<script>
  var addButton = document.querySelector('.add')
  var oUl = document.getElementById('list')
  var count = 1
  // 新增li元素
  addButton.onclick = function () {
    count++
    //创建新的li元素
    var li = document.createElement('li')
    li.innerText = '第' + count + '个li元素'
    // 创建 li用作删除按扭
    var span = document.createElement('span')
    span.innerText = '删除'
    // 把span添加到li中
    li.appendChild(span)
    // 把li添加到ul中
    oUl.appendChild(li)
  }

  // 把本来由 span处理的click事件，委托给到ul来处理
  oUl.onclick = function (e) {
    var span = e.target
    if (span.tagName.toLowerCase() === 'span') {
      this.removeChild(span.parentNode)
    }
  }
</script>
```

### 1.3、案例 3：选项卡效果

![GIF 2022-10-26 0-01-12](https://www.arryblog.com/assets/img/GIF-2022-10-26-0-01-12.917bb513.gif)

涉及知识点

- 事件委托
- 自定属性操作 dataset
- 节点操作 firstElementChild

```html
<style>
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .music {
    width: 600px;
    margin: 100px auto;
  }
  .music .music-type::after {
    display: block;
    content: '';
    clear: both;
  }
  .music .music-type li {
    width: 100px;
    height: 35px;
    float: left;
    cursor: pointer;
  }
  .music .music-type li.current {
    color: #31c27c;
  }
  .music-content {
    height: 200px;
    overflow: hidden;
  }
  .music-content .item {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    text-align: center;
    font-size: 50px;
    line-height: 200px;
  }
</style>

<div class="music">
  <ul class="music-type">
    <li class="current" data-id="a">最新</li>
    <li data-id="b">内地</li>
    <li data-id="c">港台</li>
    <li data-id="d">欧美</li>
    <li data-id="e">韩国</li>
  </ul>
  <div class="music-content">
    <div class="item" data-id="a">最新</div>
    <div class="item" data-id="b">内地</div>
    <div class="item" data-id="c">港台</div>
    <div class="item" data-id="d">欧美</div>
    <div class="item" data-id="e">韩国</div>
  </div>
</div>

<script>
  ;(function () {
    var oUl = document.querySelector('.music-type')
    var currentLi = oUl.firstElementChild // 记录当前选中项
    var currentContent = document.querySelectorAll('.music-content .item')[0] // 当前显示内容项
    oUl.onclick = function (e) {
      // 获取最开始触发点击事件的事件源
      var el = e.target
      var tagName = el.tagName.toLowerCase()
      if (tagName.toLowerCase() !== 'li') return
      // 获取对应li上面的data-id值
      var dataId = el.dataset.id
      // 根据data-id查找到对应内容区
      var content = document.querySelector('.music-content .item[data-id=' + dataId + ']')
      // 当前项添加current  同时 当前项对应内容显示
      el.classList.add('current')
      content.style.display = 'block'

      // 前一项移除current样式，同时前一项对应内容隐藏
      currentLi.classList.remove('current')
      currentContent.style.display = 'none'

      // 保存当前项和对应内容项
      currentLi = el
      currentContent = content
    }
  })()
</script>
```

### 2、事件委托的使用场景和注意事项和优点

注意事项：

不能委托不冒泡的事件给祖先元素

- 通过上面的学习，我知道事件委托本质就是利用了事件的冒泡机制来实现
- 所以对于不支持事件冒泡的事件是没有办法使用事件委托

> 如：onmouseenter 、 onmouseleave 、onload、onblur、onfocus，是不支持事件冒泡的

**使用场景：**

- 当有大量类似元素需要批量添加相同的事件，处理相同的事情时，可以使用事件委托，把事件委托给这些元素的父级或祖先元素来处理。
- 当我们需要动态添加某节点时，我们可以把这些动态节点需要处理的事件委托给到父元素或祖先元素来处理。

**优点：**

可以减少事件的监听，减少内存的消耗，提升性能。

## 九、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 1、元素绑定事件有那两种方式及区别，这两种方式绑定的事件如何移除 ？
- 2、事件处理函数中的 this 指向谁 ？
- 3、你了解那些常见的事件及他们之间需要注意的点 ？
- 4、什么是事件流，事件流分为几个阶段，如何理解事件冒泡和事件捕获 ？
- 5、什么是事件对象，你了解事件对象上的哪些属性和方法 ？
- 6、如何阻止元素的默认行为和事件冒泡 ？
- 7、什么是事件委托？事件委托的机制是什么 ？事件委托的优点，应用场景和注意事项

### 难点

- 1、如何实现元素在 2 个或多个不同状态之间切换（如：背景颜色的变化）
- 2、数据查询的两种策略：深度全面查询 和 逐级查询
- 3、掌握以下案例
  - 点击 li 弹出对应序号
  - 随机生成 6 位验证码
  - 点击换肤
  - 扫图游戏
  - 三级联动
  - 选项卡效果
