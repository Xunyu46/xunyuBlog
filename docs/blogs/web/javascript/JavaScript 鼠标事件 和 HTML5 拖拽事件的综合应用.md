# JavaScript 鼠标事件 和 HTML5 拖拽事件的综合应用

本节内容我们开始学习 JavaScript DOM 的鼠标事件，兼容性处理，各种滚动实践，鼠标按键，综合节流函数进行综合应用。

HTML5 拖拽事件，对象、属性、方法，兼容性处理，综合项目案例实践开发等

## 一、鼠标滚轮事件

鼠标滚轮事件存在兼容性问题，不同浏览器对应的事件名不一样。

> 具体有以下 3 种

| 事件名                   | 事件对象属性（判断滚动方向）                   | 支持浏览器                                                             |
| :----------------------- | :--------------------------------------------- | :--------------------------------------------------------------------- |
| mousewheel（非标准）     | `e.wheelDelta` 正值（120） `↑` 负值（-120）`↓` | Webkit 和 Edge 等各大浏览器，但 Firefox 不支持                         |
| DOMMouseScroll（非标准） | `e.detail` 正值（3）`↓` 负值（-3）`↑`          | 低版本 firefox，同时该事件需要通过 addEventListener 方来式绑定事件监听 |
| wheel（标准）            | `e.deltaY` 正值 `↓` 负值 `↑`                   | 各个厂商的高版本浏览器都支持                                           |

### 1、mousewheel 事件

- 早期低版本的 webkit 和 Edge 支持
- 通过 `e.wheelDelta` 的值来判断鼠标滚动的方向，值为 120 向上，值为-120 向下

```js
box.addEventListener('wheel', eventFn, false)
function eventFn(e) {
  // 负值 向下滚  正值 向上滚
  console.log(e.wheelDelta)
}
```

### 2、DOMMouseScroll 事件

- 低版本的 Firefox 支持
- 通过 `e.detail` 的值来判断鼠标滚动方向，值为 3，向下滚，值为 -3 向上滚

```js
box.addEventListener('DOMMouseScroll', eventFn, false)
function eventFn(e) {
  // 正值 3 向下滚  负值 -3  向上滚
  console.log(e.detail)
}
```

### 3、wheel 事件

- 为了统一滚轮事件的标准，各大浏览器的高版本都支持这个事件
- 通过 `e.deltaY` 的值来判断鼠标滚动方向，正值向下，负值向上。

```js
var box = document.querySelector('.box')
box.addEventListener('wheel', eventFn, false)
function eventFn(e) {
  // 正值 向下滚  负值 向上滚
  console.log(e.deltaY)
}
```

### 4、兼容型处理

以下代码封装成`wheel.js`文件，供后期使用

```js
/**
 * addWheelListener 兼容不同版板的鼠标滚轮事件
 * element 绑定滚轮事件的元素
 * eventFn 事件处理函数
 * useCapture 在捕获还是冒泡阶段执行
 */
window.addWheelListener = function (element, eventFn, useCapture = false) {
  // 获取浏览器当前支持的版本的鼠标滚轮事件名
  var support =
    'onwheel' in document.createElement('div')
      ? 'wheel' // 各个厂商的高版本浏览器都支持"wheel"
      : document.onmousewheel !== undefined
      ? 'mousewheel' // Webkit 和 IE 一定支持"mousewheel"
      : 'DOMMouseScroll' // 低版本 firefox

  // 添加鼠标事件
  element.addEventListener(support, callback, useCapture)

  // 兼容写法的事件方法
  function callback(e) {
    var e = e || window.event
    e.preventDefault() // 阻止默认行为
    // 处理低版本火狐
    e.detail && (e.deltaY = e.detail * 40)
    // 处理低版本 ie 和  Edge等浏览器
    e.wheelDelta && (e.deltaY = -e.wheelDelta)

    // 滚动事件要处理的事情，通过e.deltaY来判断滚动的方向，正向下，负向上
    eventFn.apply(this, arguments)
  }
}
```

**应用**

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: khaki;
    margin: 100px;
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  // 添加鼠标滚轮事件
  addWheelListener(box, fn, false)
  // 事件处理函数
  function fn(e) {
    console.log('e.deltaY' + e.deltaY)
    console.log(this)
  }
</script>
```

### 5、案例：滚动实现元素高度变化

![GIF2022-11-280-36-53](data:image/gif;base64,R0lGODlhJgEdAQAAACH5BAAoAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAJgEdAaD////w5owC/4SPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5LL5jE6r1+y2+w2Py+f0uv2Oz+v3/L7/DxgoOEhYaHiImKi4yNjo+AgZKTmZEWB5iZmpucnZ6fkJGtpJaSNqeoqaqhpAWrP6Chsr2koja3trSzuDy9t7qivjKzy8CRxDjExsDJPc3Lv84iydC90yff1abY3N/au90h0e+g0ubs5JrnK+npmewg7P6n4Szz5PX39+b5Kvv0/Sz9w/gAHDDRxR0ODBEAm7LWTYENtDEBElTvRQ8dpFjP8ZpW3s0NHjxw0hnY0kWTLZSQ0pVa7E0BLZS5gxh828UNPmzQo5he3k2fPZzwlBhQ6NUJTXUQlJcS1F2pTaUwdRpU5lUFXWVapZYW1t0NXr1wVhs41VUHbVWbRpU61N0Nbt2wNxUc2lW9fUXQN59e7tO+svYFB7AQwmLPjwqMSKizFu3O4x5EuFJzu+a1lT5cyYNnO25PlzaM6jM5e2fHpyasirG7dW/Ppw7MGzAdfueztv7rq74/Zu+ztt8LLDwxbvejxr8qrLozZv+jxp9KLTg1bveT1n9prbY3Zv+T1l+JLjQ5bveD5j+orrIxZ+Dz++/Pn069u/jz+//v38+/u3/w9ggAIOSGCBBh6IYIIKLshggw4+CGGEEk5IYYUWXohhhhpuyGGHHn4IYogijkhiiSaeiGKKKq7IYosuvghjjDLOSGONNt6IY4467shjjz7+CGSQQg5JZJFGHolkkkouyWSTTj4JZZRSTklllVZeiWWWWm7JZZdefglmmGKOSWaZZp6JZppqrslmm26+CWeccs5JZ5123olnnnruyWeffv4JaKCCDkpooYYeimiiii7KaKOOVlMAACH5BAAKAKsALBsAhwBkAAoAoPDmjAAAAAIehI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCzsFACH5BAAeAKsALBsAkQBkAB4AoPDmjAAAAAI5hI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJdRYAACH5BAAeAKsALBsArwBkACgAoPDmjAAAAAJDhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt1xsAQAh+QQAMgCrACwbANcAZAAoAKDw5owAAAACQ4SPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNardcbAEAIfkEAB4AqwAsGwDXAGQAKACg////AAAAAkOEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq3XGwBACH5BAAUAKsALBsArwBkACgAoP///wAAAAJDhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt1xsAQAh+QQACgCrACwbAKUAZAAKAKD///8AAAACHoSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gs7BQAh+QQAFACrACwbAJsAZAAKAKD///8AAAACHoSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gs7BQAh+QQAUACrACwbAJEAZAAKAKD///8AAAACHoSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gs7BQAh+QQAPACrACwbAHMAZAAeAKD///8AAAACOYSPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCXUWAAAh+QQAFACrACwbAF8AZAAUAKD///8AAAACLISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCmcFACH5BAAUAKsALBsAVQBkAAoAoP///wAAAAIehI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCzsFACH5BAAKAKsALBsAVQBkABQAoPDmjAAAAAIshI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKZwUAIfkEABQAqwAsGwBpAGQACgCg8OaMAAAAAh6Ej6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4LOwUAIfkEAAoAqwAsGwBzAGQAFACg8OaMAAAAAiyEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDApnBQAh+QQAUACrACwbAIcAZAAUAKDw5owAAAACLISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCmcFADs=)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: khaki;
    margin: 100px;
  }
</style>

<div class="box"></div>
<script src="./wheel.js"></script>
<script>
  var box = document.querySelector('.box')
  // 添加滚轮事件（封装后的方法）
  addWheelListener(box, fn, false)
  function fn(e) {
    var deltaY = e.deltaY
    var speed = 10
    if (deltaY > 0) {
      // 向下滚
      var height = this.offsetHeight + speed
      if (height > 200) height = 200
      this.style.height = height + 'px'
    } else {
      // 向上滚
      var height = this.offsetHeight - speed
      if (height < 50) height = 50
      this.style.height = height + 'px'
    }
  }
</script>
```

### 6、案例：全屏垂直滚动轮播

涉及知识点

- 鼠标滚轮事件
- transitionend 事件
- 节流操作
- 事件委托
- `window.resize` 事件

![GIF2022-11-2723-16-06](https://www.arryblog.com/assets/img/GIF2022-11-2723-16-06.344f78b3.gif)

### 6.1、CSS 布局代码

```html
<style>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .wrap {
    width: 100%;
    height: 500%;
    transform: translate3d(0, 0, 0);
    transition: transform 1s ease;
    cursor: pointer;
  }
  .wrap .slide {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    color: #fff;
  }
  .wrap .slide:nth-child(1) {
    background-color: rgb(248, 224, 179);
  }
  .wrap .slide:nth-child(2) {
    background-color: rgb(179, 248, 191);
  }
  .wrap .slide:nth-child(3) {
    background-color: rgb(243, 189, 201);
  }
  .wrap .slide:nth-child(4) {
    background-color: rgb(208, 207, 248);
  }
  .wrap .slide:nth-child(5) {
    background-color: rgb(247, 207, 204);
  }

  .pagination {
    position: fixed;
    width: 10px;
    height: 120px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .pagination span {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  .pagination span.active {
    background-color: orange;
    box-shadow: 0 0 2px 5px orange;
  }
</style>

<!-- 滚动容器 -->
<div class="wrap">
  <div class="slide">第一屏</div>
  <div class="slide">第二屏</div>
  <div class="slide">第三屏</div>
  <div class="slide">第四屏</div>
  <div class="slide">第五屏</div>
</div>

<!-- 分页器 -->
<div class="pagination">
  <span class="active"></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
```

### 6.2、利用 transitionend 事件，来实现节流

```html
<script src="./wheel.js"></script>
<script>
  // 获取所有的spans
  var spans = document.querySelectorAll('.pagination span')
  var pagination = document.querySelector('.pagination')
  var viewHeight = document.documentElement.clientHeight
  var wrap = document.querySelector('.wrap')
  var currentindex = 0 // 保存当前的序号
  var prevIndex = 0 // 保存前一项序号
  var len = spans.length // 按扭个数
  var lock = false // false表示当前没有锁

  // 给每个元素身上添加自定义属性index，用来记录当前元素身上的序号
  for (var i = 0; i < spans.length; i++) {
    spans[i].index = i // 给每个span标签添加一个自定义属性index，用来保存对应的序号
  }

  to(2) // 刚开始显示那个页面
  // 把span元素的点击事件要处理的事情，委托给他的父亲
  pagination.onclick = fn
  function fn(e) {
    var target = e.target
    var tagName = target.tagName.toLowerCase()
    if (tagName !== 'span') return
    if (lock) return
    lock = true
    // 如果是重复点一个span，那就要考虑解锁
    if (currentindex === prevIndex) {
      lock = false
    }
    // 需要处理事情
    // 清除前一个被点击元素的样式
    spans[prevIndex].classList.remove('active')
    currentindex = target.index
    prevIndex = currentindex
    spans[currentindex].classList.add('active')

    var translateY = -currentindex * viewHeight
    wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
  }

  // 处理滚轮事件
  addWheelListener(wrap, wheelFn) // 做了节流操作
  function wheelFn(e) {
    if (e.deltaY > 0) {
      // 向下滚
      if (lock) return
      lock = true
      currentindex++ // 4
      if (currentindex === len) {
        currentindex = len - 1
        lock = false // 开锁
        return
      }
      // 滚动到指定下标元素
      to(currentindex)
    } else {
      // 向上滚
      if (lock) return
      lock = true
      currentindex--
      if (currentindex < 0) {
        currentindex = 0
        lock = false // 开锁
        return
      }
      // 滚动到指定下标元素
      to(currentindex)
    }
  }

  // 跳转到指定的下标元素
  function to(index) {
    currentindex = index // 保存当前下标
    spans[prevIndex].classList.remove('active')
    prevIndex = currentindex
    spans[currentindex].classList.add('active')
    var translateY = -currentindex * viewHeight
    wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
  }

  // 监听wrap身上的 transitionend 事件
  wrap.addEventListener('transitionend', function () {
    lock = false // 解锁
  })

  // 当浏览器的高度发生改变时，那就需要重新计算veiwHeight的高度
  window.addEventListener('resize', function () {
    // 同时还要重新计算，wrap 的translateY的值
    viewHeight = document.documentElement.clientHeight
    var translateY = -(currentindex * viewHeight)
    wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
  })
</script>
```

### 6.3、利用节流函数，来实现节流

```html
<script src="./wheel.js"></script>
<script>
  // 获取所有的spans
  var spans = document.querySelectorAll('.pagination span')
  var pagination = document.querySelector('.pagination')
  var viewHeight = document.documentElement.clientHeight
  var wrap = document.querySelector('.wrap')
  var currentindex = 0 // 保存当前的序号
  var prevIndex = 0 // 保存前一项序号
  var len = spans.length // 按扭个数

  // 给每个元素身上添加自定义属性index，用来记录当前元素身上的序号
  for (var i = 0; i < spans.length; i++) {
    spans[i].index = i // 给每个span标签添加一个自定义属性index，用来保存对应的序号
  }
  // 把span元素的点击事件要处理的事情，委托给他的父亲
  pagination.onclick = throttle(fn, 1000)
  function fn(e) {
    var target = e.target
    var tagName = target.tagName.toLowerCase()
    if (tagName !== 'span') return
    // 需要处理事情
    // 清除前一个被点击元素的样式
    spans[prevIndex].classList.remove('active')
    currentindex = target.index // 更新当前下标
    prevIndex = currentindex // 更新前一个下标
    target.classList.add('active') // 给当前元素添加样式
    // 滚动的距离
    var translateY = -currentindex * viewHeight
    wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
  }

  // 处理滚轮事件
  addWheelListener(wrap, throttle(wheelFn, 1000)) // 做了节流操作
  function wheelFn(e) {
    if (e.deltaY > 0) {
      // 向下滚
      currentindex++
      if (currentindex === len) {
        currentindex = len - 1
        return
      }
      spans[prevIndex].classList.remove('active')
      prevIndex = currentindex
      spans[currentindex].classList.add('active')
      var translateY = -currentindex * viewHeight
      wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
    } else {
      // 向上滚
      currentindex--
      if (currentindex < 0) {
        currentindex = 0
        return
      }
      spans[prevIndex].classList.remove('active') // 移除前一项样式
      prevIndex = currentindex
      spans[currentindex].classList.add('active') // 当前项添加样式
      var translateY = -currentindex * viewHeight // 滚动的距离
      wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
    }
  }

  // 当浏览器的高度发生改变时，那就需要重新计算veiwHeight的高度
  window.addEventListener('resize', function () {
    // 同时还要重新计算，wrap 的translateY的值
    viewHeight = document.documentElement.clientHeight
    var translateY = -(currentindex * viewHeight)
    wrap.style.transform = 'translate3d(0, ' + translateY + 'px, 0)'
  })

  // 节流函数
  function throttle(fn, delay = 20) {
    var timer = null // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码
    return function () {
      if (timer) return
      var self = this // 保存this 绑定事件的对象
      var args = arguments // 保存arguments 主要用来获取事件对象 e
      // 定时器计时，用来开锁
      timer = setTimeout(function () {
        timer = null // 开锁
      }, delay)

      fn.apply(self, args) // 事件处理函数
    }
  }
</script>
```

## 二、鼠标按键

深入浅出鼠标按键，禁止右键菜单、禁止选中元素、判断按下的鼠标键、自定义右键菜单等实际开发中常用的方法及应用场景。

### 1、禁止右键菜单

- `contextmenu`事件，会在鼠标点击右键或者按下键盘上的菜单键时被触发，用于显示上下文菜单
- 如果我们希望在按下右键时，不要显示上下文菜单，我们可以在`contextmenu`事件中，阻止默认行为。

```js
// 在页面任意位置按下右键，都不会显示上下文菜单
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})

var box = document.querySelector('.box')
// 只在当前元素上按下时，不显示上下文菜单
box.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
```

### 2、禁止选中元素

`selectstart` 事件，在用户开始一个新的选择时候触发

> 如果不想用户选择内容，可以在事件中阻止默认行为

```js
document.onselectstart = function (e) {
  e.preventDefault()
}
```

### 3、判断按下的鼠标键

- `MouseEvent.button`是只读属性，它返回一个值，代表用户按下并触发了事件的鼠标按键。
- 常用于在 onmouseup 事件中，判断用户按下的是鼠标左键 、中键、右键中的那个键

| 属性值 | 说明                           |
| :----- | :----------------------------- |
| 0      | 主按键，通常指鼠标左键或默认值 |
| 1      | 辅助按键，通常指鼠标滚轮中键   |
| 2      | 次按键，通常指鼠标右键         |

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: khaki;
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector('.box')
  box.onmouseup = function (e) {
    console.log(e.button) // 0 左键  1中键  2右键
  }
</script>
```

### 4、自定义右键菜单

涉及知识点

- 禁止右键菜单
- 事件委托
- `e.button` 判断按下的鼠标键

![GIF2022-11-280-35-02](https://www.arryblog.com/assets/img/GIF2022-11-280-35-02.a7fd4f88.gif)

```html
<style>
  html,
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  .menu {
    width: 100px;
    border: 1px solid #ddd;
    position: absolute;
    left: 100px;
    top: 200px;
    box-shadow: 2px 2px 3px #ddd;
    display: none;
  }
  .menu li {
    height: 30px;
    line-height: 30px;
    text-indent: 1em;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    cursor: pointer;
  }
  .menu li:hover {
    background-color: #ddd;
  }
  .skin {
    width: 600px;
    height: 300px;
    background-color: khaki;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  .skin .close {
    width: 40px;
    height: 40px;
    background-color: #000;
    text-align: center;
    line-height: 40px;
    position: absolute;
    right: -20px;
    top: -20px;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
</style>
<body>
  <ul class="menu">
    <li>更换背景图</li>
    <li>新建标签</li>
    <li>显示隐藏元素</li>
    <li>其它操作</li>
  </ul>

  <div class="skin">
    更换皮肤
    <div class="close">X</div>
  </div>

  <script>
    var menu = document.querySelector('.menu')
    var list = document.querySelectorAll('.menu li')
    var skin = document.querySelector('.skin')
    var close = document.querySelector('.skin .close')
    // 禁止右键菜单
    document.oncontextmenu = function (e) {
      e.preventDefault()
    }
    // 鼠标按下时
    document.onmouseup = function (e) {
      if (e.button === 2) {
        // 表示按下了右键，显示自定义的右菜单,同时右菜单在鼠标的右下角显示
        menu.style.left = e.pageX + 'px'
        menu.style.top = e.pageY + 'px'
        menu.style.display = 'block'
      }
    }
    // 在页面任意位置点击，即关闭自定义菜单
    document.onclick = function () {
      menu.style.display = 'none'
    }

    // 为菜单选项，添加点击事件，点击后做相关操作,事件委托
    for (var i = 0; i < list.length; i++) {
      list[i].index = i
    }
    // 事件委托，右键菜单的点击事件委托给父元素来处理
    menu.onclick = function (e) {
      var target = e.target
      var tagName = target.tagName.toLowerCase()
      if (tagName !== 'li') return
      var index = target.index
      switch (index) {
        case 0:
          skin.style.display = 'block' // 显示换肤界面
          break
        case 1:
          break
        case 2:
          break
        case 3:
          break
      }
    }
    // 点击关闭按扭，关闭换肤
    close.onclick = function () {
      skin.style.display = 'none'
    }
  </script>
</body>
```

## 三、HTML5 的拖拽事件

- 默认情况下，网页中只有**图片和文本可以拖动**。其它元素默认情况下，均不允许被拖动
- 在图片上按下鼠标不放，然后移动鼠标就可以拖动图片。
- 当需要拖动文本时，只需要先选中文本，然后在选中文本上按下，最后移动鼠标，就可以实现拖动。

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
</style>

我是文字，选中就能拖
<div class="box"></div>
<img src="https://www.arryblog.com/logo.png" alt="" width="200px" />
<a href="">进入艾编程官网</a>
```

![GIF2022-11-2513-37-49](https://www.arryblog.com/assets/img/GIF2022-11-2513-37-49.32187ec1.gif)

如果想要其它元素也能被拖动呢 ？

- 在 HTML5 中为每个元素提供了一个`draggable`属性，这个属性用于标识元素是否允许使用**拖放操作**拖动。
- 我们可以在元素身上添加`draggabel`属性，同时值为字符`"true"`，元素就可以被拖动了

### 1、draggable 属性

draggable 属性有以下三个值，用来控制元素是否能被拖拽

| 属性值 | 描述                                                                                                         |
| :----- | :----------------------------------------------------------------------------------------------------------- |
| true   | 表示元素可以被拖动                                                                                           |
| false  | 表示元素不可以被拖动                                                                                         |
| auto   | 默认值，表示使用浏览器定义的默认行为 默认情况下,只有已选中的文本、图片、链接可以拖动，其它元素是不可拖拽的。 |

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
</style>
<div class="box" draggable="true">我是文字，但我不能被选中</div>
```

![GIF2022-11-2816-32-42](https://www.arryblog.com/assets/img/GIF2022-11-2816-32-42.f8e8ac63.gif)

注：

当元素被设置为可拖拽时，其元素中的文本和其子元素都**不能以正常的方式被选中**。

### 2、拖拽基础概念

- 在拖放（drag and drop）操作过程中，分为**拖拽元素**和**目标元素（可放置元素）**
- **拖拽元素：** 鼠标按下进行拖拽的元素为拖拽元素
- **目标元素：** 把拖拽元素放入某个元素内部，或与某个元素发生碰撞等，这些元素为目标元素（可放置元素）。

> 如下图：假设把 A 元素拖拽放到 B 元素中，那`A`元素为拖拽元素，`B`元素为目标元素(可放置元素)

![image-20221125135402987](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgwAAADiCAIAAACtNQiDAAAgAElEQVR4nO3dX2wbV34v8N/MkOI/kaIoSqIkK0q9buJF/lSrBFsIsiznIgjcxL7uItjcp2LrxlsgLfZp8xBgd5+6BtyLFFs0DXLbyjco0gJOt1vAiZxuk2IRa1cINkgcJUEQ22v4RpElUiRF8f8fceac+zAUNSI51L8Rh6S+nydxOKKON7Pz5Tm/c84InHMCAACoRTS7AQAA0LwQEgAAoAshAQAAuhASAACgy1L+KRH8GxPb0Vq6Bn5odhOghd29e7fOu0ePHtW+jEQiqVRK7+Te3l63211+mc/nl5eX9U622+2Dg4PaI4uLi8ViUe/84eFhq9VafhmPx2OxmN7JXq/X5/OVXyqKsrCwoHeyJEkjIyPaI6FQKJvN6p0fCAScTmf5ZTabDYVCeic7nc5AIKA9srCwoCiK3vkjIyOSJJVfxmKxeDyud7LP5/N6veWXxWJxcXFR72Sr1To8PKw9sry8nM/n9c4fHBy02+3ll6lUKhKJ6J3sdrt7e3u1R3Z1Xe0cehIAAKALIQEAALoQEgAAoAshAQAAuoTyimsUrncOhWvYj4oC454rigB1GHWZoScBAAC6EBIAAKALIQEAALoQEgAAoMuy/SkAYChUqqEBjLrM0JMAAABdCAkAANCFkAAAAF0ICQAA0IXCNUCjVez/XLHhM4AhjLrMEBIAjVbxfAiEBBwEoy4zDDcBAIAuhAQAAOhCSAAAgC6EBAAA6EJIAACALoQEAADoQkgAAIAuhAQAAOjCYjqARsPqOWgAoy4zhARAo7ndbrObAO3PqMsMw00AAKALIQEAALoQEgAAoAs1CYBGy+fz2pd2u92slkAbM+oyQ0gANNry8rL2pVEPrAfQMuoyw3ATAADoQkgAAIAuhAQAAOhCSAAAgC6EBAAA6EJIAACALoQEAADoat51EgvvXX/7d0RENHjswh8PYbkRAEDjNW1ILL39v9/+8RdERNT35KN/NHTSZnKDAIyCJdbQAEZdZk0aEvm5z1/5YuNF+L9//qupk3/kMLNBAMYZHBw0uwnQ/oy6zJqzJiF/OPvbFSI6+cjZh4iI3nj3TsLkJgEAHEZNGRKxL3/+SoqI+v9w4k+miIjozQ/f+srcNgEAHEbNGBKJ3375BhGR+/snj5184sl+IqIv/+ndJXNbBQBwCDVhSMTe+tcPiYgeOvXUY2Sf+Ob3+4iIPvv5nc/MbRcAwOHTfIXrLz7/p18RET363WOPEhGNPPXnQz/96RJ98f5bcxOPTjRfgwF2aXFxUftyeHjYrJZAGzPqMmu6nsRn1298RkR07PtPDalHHp0ae5SIKPXG7Fd5/V8EaBXFrcxuDrQnoy6zJguJwp23/nGJiOh/jJ28f+PgQ8eee4iIaOWVG+/FzGoZAMBh1Fwhkf/ozhthIqKnzh4b2Tw8dPbCN4mI6MN3f5szpWEAAIdTU4VE7r1//+8VIqJHvnvSp31j5A8feYqIiN74188XTGgYAMAh1UwhEbvz7ptERPS/xp4a2PrW/d/87lkiIvrV3NtfVP4eAAAckCYKiYX3PnyDiIj+5KljXZVvup/6428TEdHSv13HggkAgAZpnhmlS29Pf0lERO4P/+8//89/rnpfSfUTrRB99o+fzz6P/f4AABqhaULiizv/VhpHSt2aS92qc2b4t7MfPXkSCyYAAA5ek9xq5dm33v+MiMj94ER/v6RzViY2+3GMKPXyv3/5g4lHqoakAADAYM0REoWvZt9MERH1Tbzy8ye/rXvanZ/+4f95OUz05pezP3nkrE/vPICmhiXW0ABGXWZNUbhO/OrGy2Eiokf//Ju6CUFEtmNPfc9NREQfvoFlddCyrFuZ3RxoT0ZdZs0QErnZdz8kIqKh56aG6p/67adOPUpERO9Of479/gAADloThMRXn7+hLo94aOzkQ9ud/NAj3z9JRERf3JjFggkAgANmfkh89u7cu0S0ue1rfb6T31G36Fh65a072O8PAOBAmR4SS7M/VxfHDT03sc1Yk2rk5Ji6+HrlzTsfFg6uYQAHJb6V2c2B9mTUZSZwztWfEsG/Maht7a9r4IdmNwFa2N27d7Uvjx49alZLoI0ZdZmZ3pMAAIDmhZAAAABdCAkAANCFkAAAAF0ICQAA0IWQAAAAXQgJAADQhZAAAABdzbFVOMBh4vV6zW4CtD+jLjOEBECj+Xx4FgocOKMuMww3AQCALoQEAADoQkgAAIAu1CQAGk1RFO1LSZLMagm0MaMuM4QEQKMtLCxoX2KrcDgIRl1mGG4CAABdCAkAANCFkAAAAF0ICQAA0IWQAAAAXQgJAADQhZAAAABdCAkAANCFxXQAjYYl1tAARl1mCAmARhsZGTG7CdD+jLrMMNwEAAC6EBIAAKALIQEAALoQEgDQ8hhj+zwB9KBwDdBooVBI+zIQCJjVkp3KrYZieYUkuy/Q4zDwc1kusbqWyPLOwSGfdY+fIaej4dVUQegcvK/XpntWamVhNccFa2f/cJ9zj3+pxRh1mSEkABotm82a3YRdUor5QoGRKCnbn7sLLLkWS+U5USIS9w569zauwQqFgsI5pSNR9xG/vfZJmfw6JyISO3aQEMnwUqq4p7ZsZXUP9XkM+Jw9MuoyQ0gAND/925ZodXV2ud22llx5IXp9nlQwUeQ8Hw+nvYHOvXxIR0+PJxtMFPl6KrbmG+yuFTXr2YJCRNRh38lNu1gsFAp7aUqlysTKhL+OZAzKWVvX/YM+Yz5qGwgJgOZX57ZVKOTSsZjN4x/wu5qsxJhNRHPbfiPvsIjFIiOWjQVX8/WHnKwOf1etjoC9p8eVCaVlnk+G0901oqaYyMlERDZ7zQipzdZ1dKhH83r13t3EevXRpbuJAnV0HT1SfbQKZ4xxvuMW1GXU52wPIQHQSgRRKP3E+eZ9QikkVxbl3uGAu5lyIpdO1rpV6pBziWSu7hk2qh0SRE5/lyOXpM7u3lqdkWIiLxMRdewmIw6S5PC4Ovb5GVYja0N1ISQAWofk7B3RfFNmxVQsvJoqME5ESnYtmnP37enesd0oPJc5EREvxJeWEnXOqzkKL1ps1n2NhnF5fV3Z/OKs01iLSPlEaEvz1EL7ejxbJCKSRB5bjer9EbGjy+fW9mTk9dWo9uwiU49Go6uao+syERFbj2755KJc9x9k6fD7e+qeUYVlUlmbu9OMGzZCAqBliVa3f8glLS+s5TkRyfn0Ojn28hV1h6PwXFkv1B9Sr1U3trqGhnZ5S9wqHfoqnN0MiZ2XDCRJIcquZdVbtpJPJvO654pO+9aQUGr2bJRcssZROZdM1O8F1aYkQ8vpDn/A56jfxSmsBsOJgrCW9vb2ebc513AICYDWJnbbOtbyBSIipqwT7WMcQ/c7v1IsyIxIkDo6LEKN95m8XlR2OkjOcvFwNKE4+4d6KjKFJYJfr8k2d3dfT6d+38Nqtdm2/FlBsnZYat05JavEYmtZhYhIEISKlm+M16kjeKJY8bbVPeCvXUlXculMkYlWV6dDp5XpaHAH86NSocVollE2eK/Q0z/QpTt/Nx+NJAuciMuFfP0uyoHYDImugR82/s8DgHFEaX8j3brf+UuFWMnRM1RzPKviu/7Gx6l3c6vm+7mSjoaiyQIjokQ40rl1ZUNyZS3HGOUS4YVkzO729fvVqOhwebosrDwM7+kb8mz82YVwViHB1j2kMzMqG/46r859dfTeX3FO6R9l89xf8Y/uGTpat+eTTqxkskxyunp9OoN7juGjvfU+QeXu9WXuRbMKybnV4OJ671BvjakHLBVaSa5zIhI6uvrNKDqhJwHQ4tLF0pdWi23f5dDacoo6yCRJu6p4bN7NqdR/iGfVkX0SRJvb57MREWNMFNU7n6e/n0WiiUxRIS7nk+GF1JrD093X0+n29bj30u711bVM6as355XjZBlZVv9NmpzKhBfDO5ijytUaUOSr/xfZ9lzJ1Tfc59J5zxMYliJL4VSRs2IqvCh39w94t/Su8qvBqNoTkpz+wcqeV2MgJAAazcgl1iwXjecYEZFg6/Qd0FriQlG9T+2to8KKqVg4lixXM0Sbx9/v77QQEcutBkOJAhdEm7tvyO90ePuHvUp2LbKayBYZ8WIuEV5IrTm9/j0MxbO4OkpDRERcKbKt2xDJ6kYdoqS/TLsBRFfv8IBlObSWZ1zJxYJLSmCgp/RPZanQSqLAiUiwdQV23Ykw6jJDSAA0mtNpxM1cLmQyyXg8pd58JZd/YM87W2wjU1AnN0kWnW/EepTsWnQ1mSluxINg0QwiEcuoX6KJiLNCJpFwO7tsRCQ5uwPObiUdDa2mCgonVszGgl/FHb4jA96d37DYWmitwInIYrMphQJX5CyRZryJqUUUQdSOhrn6hn9v+49Oh74KZ1nFTLN9sHcPDkuhe6tZhfNCInRP7hnq90gFbSdioGf3UWbMZdbMIcGTSf7rX4vPPGN2QwCahpIN370brjgoWV1d/t6Dm/SSy6g5JHCeY7SbFXvCejZbSojKRirJlaXVjMyJBItVVIqKUjEuL3X6hzp9uXg4spaVOYk2p0fvbsULa1UzcyW7ele1dPp9FA0WZKWYZ9S52fiUOk1VsurcfVkxX8rGKqXDXM7l9KY0CRab3bqL/6U0A09czkQXlzLWYm6jE2FKJWJTE4fE737HfvpTIkJOANSjFDPxiCJvfkU3VjpRmkLKi6mVRbknUGceTgXRO9CdW0yRu7vPp2kby0SWwym1GGt19w31OnKRpXCqyIqpla/XPf5A+R8iOryB+zy5eCQt9Hbp3ii5UqyamStKXff5lVDO3ed0xC0CyVwupoi6Nt7PFYqMiASrTafMkl0NhbP1do5VcrGg7rRX0dlXWSffjujqHR4Ul4KJAiNWyBWIiARLp3/AnErEpiYOiU8/JSLlb/9W+P3fFx54wOzmADSBismeXCkWZcaJmJxPhr8uFAaqZpXuVyESU2+VoihyxpTc6vLX+Z6hfs/O8kj0Dox4tQeUdGQ5mlLL15Kjp3+gy05Ert7hQWk5GM8zVkiGv86luzVFCNHh7a9bMN8yc7e08k4QBNHdP+gmInJZLbF8kRdyaeoq3bhZVu1IdHTUr4iLVpdbb55rbcVMMrfneaq2nqF+5etguvQBkt3rN38NfROHRDBIREI6Lf/lX1pefRU5AW2jYnvOXYwdi9WTPVl5RIYXEisrtpH+zffV7YZqkJx9OxpPz0fCKZmISLB33RfoWF0Kp4pczkQXl+X+bVeAVdpsKW10ITRjVzbf4H2OWHAlXmC8mI0FF5IOj6+3p+4a44I662rLzN3SbFyLpn5idVjFVJGx9WyOOh1ERGxN/aZu7fDU/zcIVlePzmoJHau5bTYXqUdOhsLpzYhRctHFIN9F122LvV9mWzVxSNy+rS5uEdJp+eJFyyuvCB4Tt90F2FT83vcEl0sYGxMGBvbQ063Y6P/o0aP7aIvo8AaO8NKiayWbjFOnd/vf2on86r3SkjDB5untFkUqj4ewfDx0T/Yf6dvh91wluxaJJrKyOnwjWt011wSIDt/QfY5SknA5lwgvpmK2zu5en3vn4/tFVl1I6HTYItkcl/OpHDkcROux7DoRkcXu3abWv8N5rlp73nivkAiGVnNqqdrh7iimcjKRklsNLskDQ3soXBt1mTVvSAi3b2t/ln/wA+QENAlxbIxfucI/+aR8Q+DHjgkPPCAMDAhjY8KxYw2+UMVulz2RzzEivp5Pb07i8fYOOGsOqwuWbe45cnJlWa0rlybXlG6mtp6hAUswtJpTuJyOLCqsNF6ki+USq7GNKVhEJNq9dfsgosMbuK8zHV2JJguMOJPzychiMipZHS6Pu8vt0qbFOlOIKpcQ1txmtctpX8vlmJxLZsnhzK5likREVmfXAc0H2zWWiwZX1EWGG6NwzL5yL5KRiVghsbzI+moutWuEJg0JfutWxRHh9m3l7/7O8uMfm9IeAC3x9GnlyhXtEeHOHbpzhxPxy5fp6actP/lJY1skVe45oR61OXa/3x/LxcOR+Ma3fsnRUzFD39Y1ECD1O2/5a26tz1HSschaKlvcLCkLFmen08oya9HMtq2wd3os65lsXt3sgyvFbHI1m1y1dd031LNx11pXStWS6ttY5bEul20tl2NKNh6T1/NZhYgEm8u37bqP3c9z1R3i05ePB1fWcspGIh8JeCQiEt39Ryh8L5qWOfFiKnyP77znZqhmDYk7d2ocvXZNJkJOgIl4MMhmZ9nMTK17MhGRGQlB5ZVh+8USocW1jVXRJFhcPYP9NWaeanKCFxLBJaGnqrabWbm3uXZZkCwSk2UuZ1PJXbZItHc6WC6zrhARWTq7ezStKaghUWsduCBUtMjT5VjLZRSeT95bZ5yIJGe3b/s7Li9mVqP6uwLWUNzdfwglHVmOqItFSLB0bs0B0d13hKiUE3I6ushpuL/hOdGsIbGyUnkkEBAnJ8UzZ0xpDxxy6qodNjtLs7NE1GQJQfnVVGlpsdBh38/6LlGkUtoIFqevL6A/lGTrGggoy8F4nktOj1fMVN78Xf09zoVwlkv2Tl+vz10IfxWW62zFV21jz0DR2T/YR3I2sZYodPi1tdeUuh2Jxao9WN6jpJKz123LxgucMUZEgq2rdyd1XFbMJIx4kmlNcjoSiqhTgXXH4bbkhJKJLIZ4qafRMM0aEjduVByxvPqqMDhoSmPgMGPXr7PZWT47K6TT25xqTkKwXHwlnCiW7jQOz/6q1u4+X2Yxprh6AtsvurD5Bgek+Lrb6xbTNcaPOvsGbdxampta2tq7xuwsPaXN+0oszqqbei63XmelQ/Xwm+jrcqZKvRtLp39nT9Te6TSwTTscbmKp8L3VtLyRyK46s4pFd98R4mp9gpTs6vKqY7ingcWUJg0JcrnEV19V/uqvhI0CPf/kE4QENAy/fZtdu8beeUfNBt2uQ1ljEoJtXVtcXiehkpw9ffvdJ0J0B0Z2vpmercurXwHfsuGF4dbTeZmIBJu9S3tYVnR2ECkkgqvl8S85HVl1HzFzlZrYYbMKaZmILI66+4SrZ7v7j1BoMZJVJKd/qJEJQU0bEpa//msi4qdO8Y3yIMMWHXDwSiWHK1fUbyc1s4F/4xvimTPi1JT8F39R+hLTsD5ErbXFKsHa6R8ypa5pjnQsUysjSKn57OdCbDkYzzMiEkSJmML5eiK4kxlDNfdBMYStayAgB2OCt39n601Ed2BYTOccnQ2f49SkIaHSziHhH39sbmOgjZVKDteu0SefkF6/YXRUmJoSp6aEgQH1gKh+iTGpDlEiihar3eXp6d7FUoLWt7EOXLR3bqk+s4T6OFFB2ryzafYRFCyd/iN+UV0TyIuplXuyr7e/3q5XB7PimjF11yen10tU0N0Aqro1krh59m63h9qzpg4J4cEHeSBQ+k6XTvNbt4QHHzS7UdBW1JIDvfOO7hmTk+LUlDA5Wb30QTx9Wkkm95AQu1/7ut1jcBqKFfPr1KG5QcnJdEF3MuoWu5gspBR1V6XlVyPqsmSLs8uTi4XW1qUOq0DE1jOZPCPa3G1DExCaNd69Q32kHpZzseBC0tmt+1DQg1lxXUwFg6ndfGgt224P1f67wKpE7YjT3JyEkAAjVJQcKt91uYSxMb1sKBMefHBvfQgjnydhAiUeWa79cE7LNjshGTFZiKVCK4l1TkSio8vvJDGvBLPZLcEjOT3dIhUSoXAsW4oayeHTPM9HdPUOD0hLoXiBEXE5GwsuJOxdfd2UiOU2RvO4zKmqCLQDiky0dWNayeEL6D3C7iAdludJCCdOlEOC37hBf/Zn5rYHWlr9kgN3uYSpKXFyUjx1ypTmtQhrh0Wg6u/5oq2rt2fb4Q+h8lHSuniN/TWISLRaLQIpXLB7+7tEIrJZLeJ6uVAjWpze3n63mAwGV3OlXUBqTi61+4buc8RCK4k840RcsLocytpKobB1mYN+EWibxmt+T5Q2fnL2BAa69rxtR4VtV80bpdlDQnzsMcXlEjIZIqKPP+bJJHbmgN1SSw7KlSvCnTtUnQ2BgDg5KYyNHeJsqPE06jqcnV3Fji03U8Hi8GzdMqO2XSxg3joFVsPe0+fJB4ueQGkSq6vvvhrPQvL092QXI1lebxcQ0eEbvN+Tjq6s5jr6em1EgfsNeYiQLtFqdzTLRiA7J/CakwGaiXzxIs3MqD+Lly6JU1PmtgdaCLt+nb3zjroCrkJ5eSY2GG5XiqxIloauO2tLzd6TICLxxAm2ERJ8fp4QErAdfvu28uabNVfAlSawjo0hG9oeEsIQLdCTIKLik0+qI058YMD6H/9hdnOgSfFgkF27xq5dE7ZukkyaxQ3lCawmWlhY0L4cGRkxqyXQxoy6zFqgJ0FEwhNPqCNOQjDIl5ex9Bq06pUc1AmsY2PNkA1lirKXWijArhh1mbVGSGwZccL+HLBBW3KokQ11J7ACwE60RkgI3/pW+WfszwHsxg127VpFyQETWAEOQouEhMdDU1N0/Tphf45DjAeD7MoVNjurXeXAAwFhbAzZAHBAWiMkiEicnGTXrxP25zh8eDLJ/vM/2cyMtuSACawAjdEyISFMTpZ/Zp9+iv05DgN27VrFc374N74hjo0hGwAapnVCQjviNDtLzz1ndovgoFSXHJpqAivAodIyIUFEwtgYv36diAhliXZUo+Sg7paBbAAwTyuFhHjihPKzn6k/s+vXsT9HeyhtuqctOWACK0DTaKWQEAYH+QMPCLdvE/bnaH2l5/xslBzI5aKnn1Y32mv7bMASa2gAoy6zVgoJIhKfeYbfvk1E7MYNbMvSotTn/KglB+5yCU8/fdgmsEoSLl44cEZdZq2xd1MZX15Wnn1W/Vn6xS+w9LqFlJ7zMzsrhEKl3bmnpsTHHjO7XQBQT4v1JLaMOGF/jpbCf/c7NjuLxQ0AraXFQoKIxLGx0ojT/Dz252gh4jPP4L8XQMtpseEmIuK3bil/+qdExDs7re+9Z3ZzoKHk8XFhYkJ6+WWzG7IvsVhM+9Ln85nVEmhjRl1mrdeTEB58kAcCQiiE/TmgRcXjce1LhAQcBKMus9YLCSIST53iV64Q9ucwgzw+Xn1Q/NGPxDNntEfY9DS7fHnnHyscPy69/nrpd2dm2MWLemfyubmabSC/3/L22zv/iwCwE6033ESaESd67DHL3/+92c05XGrfoIkaMwrUHsNNd+/e1b48evSoWS2BNmbUZdaSPYnyiBP25zCL9Nprwuio+rPy4ot8bo7PzfH5+fLBfeLz88oLL9R+q1ZPQnz+efHCBUP+NABotWRIEJHw+OPqA02xP4fppJdfls+epWiUf/SRUSEhjI5aPvig+nh79CQAWkirhkT5gabYn6P96I1oqXRrEo0a8gI4VFo2JKamFJdLyGSwP4fp+Pw8RaNEZNSAT0UfolwDrzjO5+eVn/wExWqAA9WqIUFEwhNP0MyMcPs2Tybbfku4ZqYWD8Tnn1df1p+bVF91V0AteFQfV/+KMDHBZmYqJlYBgIFaOCQ2R5x+/WsBS3kbq6KqrK1ji2fOVNy11Ru9dpqsekT7W9XKYVNdnGCXLrG5uZpFCwAwViuHxNQUIyLsz9EElBde0C50qEk4cmRXn1nujtSYy3TunDrKJJ8924rDTVg9Bw1g1GXWwiFBROoDTTkmwjacthOgTlflN28qL75oYN24oqOgTqASz50TX3pJPcKmpykaVc6frx9OTcjr9ZrdBGh/Rl1moiGfYhZxcpKIhGCQ37pldlsOL2F0VHrtNSJSl0rUOGN1VT1tb58vnz0rj48Lfr/lgw/KCUFE4oUL0muv8Zs3lfPn9/bJALCt1u5JCJOT6g/Yn8Nc9QOA37xJfv9uP3OzAO73a3sV1Rt+GN6JAYCyFg8Jj6c04nTjBj33nNnNObzUGQR13hInJrb9EHl8vFzY2JIE0eiWssTWzKCN8S526ZK2nwEAhmjtkCAicXKSXb9O16+b3ZDDi8/Pq1/5hePHq7sU/Be/ICLh9OltP0T7UrxwoeaqC+X8eR6NVhwURkfFc+fo4Yd323KzFItF7Uur1WpWS6CNGXWZtXxICN/6lvoD+/hjPAuzYWpurFRdQFZefJHfvCk+//y2BQl+7x4RVW/8zi5d4rdu1SxNq6UI9a3W6kMsLi5qX2KDPzgIRl1mrV24po0HmhIR/81vzG7L4SWeO1e9akE5f57PzYnnzlX3CQS/nzaCQcXff5+ItL0BNj0tj4+zq1d5NFo9nMXn56mnh9+8KY+PKy++aNw/BQC2aPmeBBGJzzzDb9/G/hyNsZMlbOWac/VzJlTiSy+xuTl28aJ2bbZ47px68paS9dZlEDwaVQNGGB2VRkdpY12ePD6OjWABDkJbhMSJE8rPfob9OZoEu3SJXb267V57dRbBqWWMchpV7PMhbf1F9a/I4+P85s39NBsAamrJhw5VK37ve8Lt2+KPf4yl19D88NAhaACjLrOWr0mo1GxgNVdyAQDAXrVLSPzBHxAR9ucAADBWm4RE6YGm2J8DAMBQbRISRCSeOkVE7NNPzW4IAED7aKOQOH2aiPiNG2Y3BGAb1q3Mbg60J6MuszaZ3aQqfuc7lE5b33vP7IYAALSJ9ulJEJF46pSQTjOUrwEADNJWIaFuEMRRlgAAMEhbhYQ4NcVdLoYdYQEADNJWIUFEwhNPqPtzmN0QAIB20A57N2mJJ06wmRn+ySfC1JTZbQGobXl5WftycHDQrJZAGzPqMmu7kJiaUlwu9pvfiAgJaFb5fN7sJkD7M+oya7fhJiISHn8c+3MAABiiDUNCnJwUgkG+tasFAAB70IYhIUxOEhHDg+oAAPatHUPC46GpKezPAQCwf20YEkQkTk6iLAEAsH/tGRLC5CT25wAA2L82DQmPhx57DPtzAADsU3uGBBEJJ09ifw4AgH1qq63CtfjysvLss9J//Zfg8ZjdFoAtKlY52e12s1oCbcyoy6zdVlyXCYOD/HUL8g4AAAUWSURBVIEHsD8HNCGkAjSAUZdZ2w43EZH4zDN8ft7sVgAAtLC2DokTJ1CWAADYj7atSQAAwP61bU0CoGmlUintS7fbbVZLoI0ZdZkhJAAaLRKJaF8iJOAgGHWZtXNNoiY2PS2Pj7OZGbMbAgDQAg5dSAAAwM6ZWbiWz56laFQ4flx6/fWaJyjnz/ObN3f+geLzz4sXLpR+98UX+dzcbpsknjsnvvTSbn8LYFfu3r2rfXn06FGzWgJtzKjLzLSaBJuZoWiUiPjNm3x+XhgdrT5HLzx2Qnr55dp/d3qaXb4s/uhH4pkze/5wAIBDwrSQ4O+/T0TC8eP85k3+y1/WDIl9YpcusatXa7918SK7eLHioOWDDwxvAwBASzMvJObmiEh49ll+8SKbmzuI2oj40kvVY0foSQAA7Jw5IcGmp4lImJgQz5xh//APFI2ymRkD79pqEtQ7oVZPQoX8AAAoMyckSt2IU6eISJyYYFev8vffJ+NuzeKFC+UKtkqtgQsTExW1CnbpEhGhWA0AUJMJIcHn5/nNm+T3l76wP/wwXb1aMRNpb3OTVNVdAXl8vOZx9a+I587t7Q8B7A1Wz0EDGHWZmRESv/wlEYkTE+rLzRGn6eny1//quUny+Dj5/Za339YeqTN9VqXGQHUHgojks2fFiQkJxWpouN7eXrObAO3PqMvMhJBgahfh4YfLR0ojTnNztHWMqILg9+/uD01Pq90RPjendia0pNdeE0ZH2fQ0RaMYbgIAqKnRIVFaHlEeayIiIuH0abp6tc6Cib2pqEywmRm1WK3Gg3qQz82Vxr7q5hMAwOHU6JBQl0dQNFr91Z6I9BZMlJ4d1NOztz9ajgftkmyV9Prr7NIldSoUcgIAoELDQ6JuOVpvwQT/6CPa/XATaQrgFfttVG/4wS5fpkAAk18BALQaGhLq8oiK+rOKz88rL7ygt2BCvaELp09v+/ns8uVyd0GbBOzqVe3qa/HcuYqKN7t0iV28KBw5chBrvwG0sHcTNEBL7t1U+lK/Ma9JSxgdLW3RUbVggs/P87k54fjx7W/f0aj2Vc2JT6U0qiK+9BLf+usAANC4rcJLyyP0OwTCs89SrfEo9Z6+k83+1Lu88PjjFcfls2dLnZiqJsnj4+W3pJdfRjcCAECrcSHB/uVfiKhOh0A8c4b8ftpYBU0bN3Eikl57rcYv+P0V3/353Bz5/drPV86fl8fHKRqtWQvhH30kHD/OLl/GY4gAAGoy83kS9ZVqzrUKGKrynCWt8vRWvZK1+lsV05zKU62wESw0AGoS0ABGXWZNGhLq84j2vNeeWnjQLrTW7vNRcwE2m55mV6+K585hIiwctIr/91ao+D9zJBKpeKK9Vm9vr3b3hXw+v7y8rHey3W4fHBzUHllcXCwWi3rnDw8PW63W8st4PB6LxfRO9nq9Pp+v/FJRlIWFBb2TJUkaGRnRHgmFQtlsVu/8QCDgdDrLL7PZbCgU0jvZ6XQGAgHtkYWFBUVR9M4fGRmRJKn8MhaLxeNxvZN9Pp/X6y2/LBaLi4uLeidbrdbh4WHtkeXl5Xw+r3f+4OCg3W4vv0ylUhXPqdZyu90Va6p3dV3tnGlbhden13vYIWF0tKJPoPcMorLqPQEBAADPuAYAAF0ICQAA0IWQAAAAXU1auAYAgGaAngQAAOhCSAAAgC6EBAAA6EJIAACALoQEAADoQkgAAIAuhAQAAOhCSAAAgC6EBAAA6EJIAACArv8Pbnb9C956Q8UAAAAASUVORK5CYII=)

> 为了更方便实现 HTML 拖放（Drag and Drop）操作，我们来学习下拖拽相关的事件。

### 3、拖拽事件

元素在拖拽期间，会触发一些事件类型，其中分为

- 拖拽元素事件：`dragstart` 、`drag`、`dragend`
- 目标元素（放置元素）事件：`dragenter`、`dragover`、`dragleave`、`drop`

### 3.1、拖拽元素事件：drag、dragstart 、dragend

| 事件名    | 说明                                                                                                        |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| dragstart | 当按住鼠标键不放并**开始移动鼠标的那一刻**，被拖动元素上会触发`dragstart`事件。只会在刚开始移动时触发一次。 |
| drag      | 只要拖拽元素在拖拽中，就会持续的触发`drag`事件，有点类似于 mousemove 事件，只要鼠标在移动就会不断触发       |
| dragend   | `dragend` 事件在拖放操作结束时触发（通过释放鼠标按钮或单击 escape 键），只会在结束时触发一次                |

- 通常会在`dragstart`中，设置被拖拽元素为半透明，标识元素正在被拖动。
- 在`dragend`中，恢复被拖拽元素为不透明。

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
    position: absolute;
    left: 100px;
    top: 100px;
  }
</style>

<!-- draggable=true 表示元素可拖拽 -->
<div class="drag" draggable="true"></div>
<script>
  var drag = document.querySelector('.drag')

  // 按下，刚开始拖拽事
  drag.ondragstart = function () {
    this.style.opacity = 0.3 // 设置被拖拽元素的透明度
    console.log('dragstart事件')
  }
  // 拖拽过程中一直会触发
  drag.ondrag = function () {
    console.log('drag事件')
  }
  // 鼠标松开，不拖拽事触发
  drag.ondragend = function () {
    this.style.opacity = 1 // 设置被拖拽元素的透明度
    console.log('dragend事件')
  }
</script>
```

![image-20221123150253835](https://www.arryblog.com/assets/img/image-20221123150253835.bf786abb.png)

温馨提示：

- `dragstart` 事件类传于`mousedown`事件，不过是在按下后开始拖拽才触发，在 `drag`事件前触发
- `drag`事件类似于`mousemove`事件，会在拖动过程中频繁的触发
- `dragend`事件类似于 `mouseup`事件，会在鼠标弹起时（不拖拽）时触发

所有子元素的拖拽事件，都会冒泡到他们的父元素身上，所以在处理拖拽事件时，可以利用事件委托

```html
<style>
  .box {
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

<div class="box">
  <div class="box2" draggable="true"></div>
</div>
<script>
  var box = document.querySelector('.box')
  var box2 = document.querySelector('.box2')

  // 给box2添加对应拖拽事件
  box2.ondragstart = function (e) {
    console.log('box2-start')
  }
  box2.ondrag = function (e) {
    console.log('box2-drag')
  }
  box2.ondragend = function (e) {
    console.log('box2-end')
  }

  // 以下元素默认不能拖，但事件能被成功触发
  // 是因为box2元素上对应事件触发后，会冒泡到父元素上
  box.ondragstart = function (e) {
    console.log('box-start')
  }
  box.ondrag = function (e) {
    console.log('box-drag')
  }
  box.ondragend = function (e) {
    console.log('box-end')
  }

  document.ondragstart = function (e) {
    console.log('document-start')
  }
  document.ondrag = function (e) {
    console.log('document-drag')
  }
  document.ondragend = function (e) {
    console.log('document-end')
  }
</script>
```

![image-20221130150423150](https://www.arryblog.com/assets/img/image-20221130150423150.137afbc4.png)

### 3.2、dragenter、dragover、dragleave 放置元素事件

| 事件名    | 说明                                                                                           |
| :-------- | :--------------------------------------------------------------------------------------------- |
| dragenter | 当拖动的元素或被选择的文本进入有效的放置目标时， `dragenter` 事件被触发。                      |
| dragover  | 当元素或者选择的文本被拖拽到一个有效的放置目标上时，触发 `dragover` 事件（每几百毫秒触发一次） |
| dragleave | `dragleave` 事件在拖动的元素或选中的文本离开一个有效的放置目标时被触发                         |

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 100px;
    top: 100px;
    background-color: khaki;
    z-index: 3;
  }
  .target {
    width: 200px;
    height: 200px;
    background-color: skyblue;
    position: absolute;
    left: 100px;
    top: 300px;
  }
</style>

<div class="drag" draggable="true"></div>
<div class="target"></div>

<script>
  // 拖拽元素
  var drag = document.querySelector('.drag')
  // 目标元素
  var target = document.querySelector('.target')

  // 当拖拽元素进入目标元素时触发
  target.ondragenter = function () {
    console.log('dragenter')
  }

  // 当拖拽元素在有效的目标位置上时会触发
  target.ondragover = function () {
    console.log('dragover')
  }

  // 当拖拽元素离开有效的目标位置上时会触发
  target.ondragleave = function () {
    console.log('dragleave')
  }
</script>
```

![GIF2022-11-2817-22-06](https://www.arryblog.com/assets/img/GIF2022-11-2817-22-06.243493b0.gif)

### 3.3、drop 事件

| 事件名 | 说明                                                                    |
| :----- | :---------------------------------------------------------------------- |
| drop   | `drop` 事件在被拖拽元素或选中的文本被放置在**有效的放置目标**上时被触发 |

### 3.4、默认情况，元素不允许放置

- 在网页中，默认情况下，唯一有效的放置目标元素是**文本框**。但默认只能放置文本、链接、图片
- 页面其它元素默认情况下，是不允许放置。如果把元素拖动到不允许放置的目标上，然后放下，不会触发 drop 事件。

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 100px;
    border: 2px dashed #ddd;
    position: absolute;
    top: 10px;
    left: 300px;
  }
  textarea {
    width: 200px;
    height: 100px;
    position: absolute;
    left: 300px;
    top: 150px;
  }
</style>

<img src="https://www.arryblog.com/logo.png" width="100" />
我是一段文字
<a href="www.baidu.com">百度</a>
<div class="drag" draggable="true"></div>
<textarea name="" id="text" cols="30" rows="10"></textarea>
<div class="target"></div>
<script>
  var drag = document.querySelector('.drag')
  var text = document.getElementById('text')
  var target = document.querySelector('.target')

  text.ondrop = function () {
    console.log('text - drop')
  }
  target.ondrop = function () {
    console.log('target - drop ')
  }
</script>
```

![GIF2022-11-2817-39-24](https://www.arryblog.com/assets/img/GIF2022-11-2817-39-24.7ee632ca.gif)

### 3.5、如何使放置元素触发 drop 事件

- 如果被拖拽元素在进入放置（目标）元素时，其鼠标状态显示禁止，则表示禁止该行为，在鼠标松开时，不会触发`drop`事件。
- 因为默认情况，元素是不允许放置的，要使目标元素能够接收到`drop`事件，需要在`dragenter`和`dragover` 事件中阻止默认行为。

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    top: 10px;
    left: 120px;
  }
</style>

<div class="drag" draggable="true"></div>
<div class="target"></div>
<script>
  var drag = document.querySelector('.drag')
  var target = document.querySelector('.target')
  // 要使放置元素的drop事件能触发，需要在dragover中禁止其默认行为
  target.ondragover = function (e) {
    e.preventDefault()
  }
  // 放置元素绑定drop事件
  target.ondrop = function () {
    console.log('drop')
  }
</script>
```

### 3.6、drop 事件兼容问题

在 Firefox 浏览器中，drop 放置事件的默认行为如下：

- 如果拖动元素是链接，则在放置（目标）元素上松开鼠标时，会导航到对应页面
- 如果拖动元素是图片，则在放置（目标）元素上松开鼠标标时，会导航到图片文件
- 如果拖动元素是文本，会导致无效的 URL 错误（或默认开启百度搜索）

> 所以如果拖动元素为以上三者，我们需要在 drop 放置事件中，阻止其**默认行为**和**事件冒泡**

```js
e.preventDefault(); // 阻止默认行为
e.stopPropagation(); // 阻止事件冒泡
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    top: 10px;
    left: 220px;
  }
</style>

<a href="http://www.baidu.com">我是大美人</a><br />
<img src="https://www.arryblog.com/logo.png" alt="" width="100" /><br />
我只是个文字
<div class="drag" draggable="true"></div>
<div class="target"></div>
<script>
  var drag = document.querySelector(".drag");
  var target = document.querySelector(".target");
  // 要使放置元还给的drop事件能触发，需要在dragover中禁止其默认行为
  target.ondragover = function (e) {
    e.preventDefault();
  };
  // 放置元素绑定drop事件

  target.ondrop = function (e) {
    console.log("drop");
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation(); // 阻止事件冒泡
  };
</script>
```

### 4、DataTransfer 对象

- 在事件对象 e 上有一个 dataTransfer 属性，这个属性是一个 DataTransfer 对象
- `e.dataTransfer` 对象用于保存拖放（drag and drop）过程中的拖拽数据，可以保存一项或多项数据，这些数据项可以是一种或者多种数据类型。
- `e.dataTransfer` 对象提供了相关的属性和方法实现拖放功能

> 具体如下：

| 属性          | 说明                                                                   |
| :------------ | :--------------------------------------------------------------------- |
| effectAllowed | 表示对被拖动元素是否允许 dropEffect 中设置的行为，同时会影响鼠标的样式 |
| dropEffect    | 可以告诉浏览目标元素允许哪种放置行为， 同时会影响鼠标的样式            |

| 方法          | 说明                                                                                                                                                                                                             |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setDragImage  | 可以自定义一处图片元素来设置拖放图片。                                                                                                                                                                           |
| setData       | 方法用来设置拖放操作的[`drag data` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)到指定的数据和类型                                                                          |
| getData       | 方法接受指定类型的拖放（以[`DOMString` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)的形式)数据。如果拖放行为没有操作任何数据，会返回一个空字符串 |
| `clearData()` | 删除与给定类型关联的数据,如果类型为空或未指定，则删除与所有类型关联的数据                                                                                                                                        |

### 4.1、dropEffect 属性

- dropEffect 属性：可以告诉浏览目标元素允许哪种放置行为，比如：复制、移动、导航等，但具体行为的动作还需要开发者自己代码实现。
- 当拖动元素在目标元素上放置时，只有**dropEffect 允许的行为，才会触发 drop 事件**
- dropEffect 属性值，还会会影响拖拽过程中光标的手势，这个手势 可能会预示了将要发生什么样的操作，但仅是视觉上的反馈。

> 这个属性有以下 4 种可能值

| 属性值 | 说明                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------ |
| none   | 被拖动元素不允许被放置在目标元素，鼠标样式是禁止状态                                              |
| move   | 被拖动元素**应该**移动到放置的目标元素中，但必需满足 dropEffect 的行为是 effectAllowed 允许的行为 |
| copy   | 被拖动元素**应该**复制到放置目标元素中，但必需满足 dropEffect 的行为是 effectAllowed 允许的行为   |
| link   | 放置目标会导航到被拖动元素（仅限它是 URL 情况）                                                   |

注意事项

- 对于 `dragenter` 和 `dragover`事件，`dropEffect` 会根据用户的请求的行为进行初始化。具体如何初始化和浏览器平台有关。（即没有设置 dropEffect 属性值时，浏览器会自动为其赋值）
- 我们期望得到一个指定的行为时而不是用户的请求行为时，可以通过 `dragenter` 和 `dragover` 事件处理中修改 `dropEffect`的值。

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    top: 10px;
    left: 220px;
  }
</style>

<div class="drag" draggable="true"></div>
<div class="target"></div>

<script>
  var drag = document.querySelector('.drag') // 被拖动元素
  var target = document.querySelector('.target') // 目标放置元素

  // 拖动元素进入目标元素那一刻
  target.ondragenter = function (e) {
    // 阻止默认行为，元素才能被放置，才有可能触发drop事件
    e.preventDefault()
    // move 允许被拖动元素移动到目标元素上 , 同时光标也会变化
    e.dataTransfer.dropEffect = 'move'
  }

  target.ondragover = function (e) {
    // 阻止默认行为，元素才能被放置，才有可能触发drop事件
    e.preventDefault()
    // move 允许被拖动元素移动到目标元素上 , 同时光标也会变化
    e.dataTransfer.dropEffect = 'move'
    // 被动元素不允许放在这里，不会触发drop事件，光标为禁止样式
    // e.dataTransfer.dropEffect = "none";
  }

  target.ondrop = function () {
    console.log('drop')
  }
</script>
```

### 4.2、effectAllowed 属性

effectAllowed 属性：表示对被拖动元素是否允许 dropEffect 中设置的行为

| 属性值        | 说明                                     |
| :------------ | :--------------------------------------- |
| none          | 不允许 dropEffect 的任何行为             |
| copy          | 只允许”copy"这种 dropEffect 行为         |
| link          | 只允许”link"这种 dropEffect 行为         |
| move          | 只允许”move"这种 dropEffect 行为         |
| copyLink      | 允许"copy" 和 “link"两种 dropEffect 行为 |
| copyMove      | 允许"copy" 和 “move"两种 dropEffect 行为 |
| linkMove      | 允许"link" 和 “move"两种 dropEffect 行为 |
| all           | 允许所有 dropEffect 行为                 |
| uninitialized | 效果没有设置时的默认值，则等同于 _all_   |

注意事项

- 应该 在`dragstart`事件处理函数中设置`effectAllowed`的属性值，以便为拖动元素设置所需的拖动效果（鼠标样式）
- 要看到不同属性值对应的鼠标标样式，还需要在`document.ondragover`事件中，取消默认行为。
- 因为默认情况下，元素是不允许被放置的，所以在拖动元素时，事件会冒泡到 document 的 ondragover 事件中，鼠标样式为禁用。（整个拖动过程中 document 默认都是被放置元素）

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    left: 200px;
    top: 10px;
  }
</style>

<div class="drag" draggable="true"></div>
<div class="target"></div>
<script>
  var drag = document.querySelector('.drag')
  var target = document.querySelector('.target')
  drag.ondragstart = function (e) {
    // 设置被拖动元素允许的 dropEffect行为
    e.dataTransfer.effectAllowed = 'copy'
  }

  document.ondragover = function (e) {
    // 禁止默认行为,才能看到拖动元素的光标样式与effectAllowed的值对应
    e.preventDefault()
  }
</script>
```

- 如果 effectAllowed 的值，不是在 dropEffect 允许的范围，则**不会触发 drop 事件**
- 同时拖动元素进入目标元素时，鼠标样式为禁止样式

```html
<script>
  drag.ondragstart = function (e) {
    // 被拖动元素只允许copy这种dropEffect行为
    // 如果dropEffect的值不是copy，则不会触发drop事件，
    // 同时被拖动元素进入有效目标元素时，光禁为禁止
    e.dataTransfer.effectAllowed = 'copy'
  }

  // 要看到整个拖动过程中，鼠标光标不为禁止样式
  // 则需要在document.ondragover中禁止默认行为
  document.ondragover = function (e) {
    e.preventDefault()
  }

  //
  target.ondragover = function (e) {
    // 阻止默认行为，target元素才能允许被放置
    e.preventDefault()
    // 但最终哪些dropEffect行为能被放置，会触发drop事件，需要看dropEffect的值。
    // 如果EffectAllowed的值不是在 dropEffect允许内，不会触发drop事件，同时光标为禁止
    // 以下设置 不会触发drop事件，因为effectAllowed=“copy"，同是光标为禁止样式
    e.dataTransfer.dropEffect = 'move'

    // 以下设置，会触发drop事件，光标为copy样式
    // e.dataTransfer.dropEffect = "copy";
  }

  target.ondrop = function (e) {
    console.log('drop')
  }
</script>
```

### 4.4、setData 、getData 方法

| 方法    | 说明                                                                                               |
| :------ | :------------------------------------------------------------------------------------------------- |
| setData | 方法用来设置拖放操作的`drag data`到指定的数据和类型                                                |
| getData | 方法读取指定类型的拖放（以`DOMString`的形式)数据。如果拖放行为没有操作任何数据，会返回一个空字符串 |

**语法**

```js
e.dataTransfer.setData(format, data) // 保存数据
e.dataTransfer.getData(format) // 取出数据
```

- data 表示要存入的数据
- format 表示存入的数据类型，常见的支持类型如下：

> 推荐的拖动数据类型参考[官网链接地址(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types)

| 数据类型                       | 说明               |
| :----------------------------- | :----------------- |
| `text/plain` 支持简写：text    | 文本类型（string） |
| `text/html`                    | HTML 文字          |
| `text/xml`                     | XML 文字           |
| `text/uri-list` 支持简写： url | 链接               |
| `application/x-moz-file`       | 文件               |

注意事项

- 一般都会在 dragstart 事件中，利用`e.dataTransfer.setData()` 保存数据,可以存储一项或多项
- 存储在 dataTransfer 对象中的数据只能在 drop 放置事件中读取。
- 如果没有在 drop 事件处理函数中取得这些数据，随后 dataTransfer 对象被销毁，数据也就丢失了。

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    left: 200px;
    top: 10px;
  }
</style>
<div class="drag" draggable="true" id="J_drag"></div>
<div class="target"></div>

<script>
  var drag = document.querySelector('.drag')
  var target = document.querySelector('.target')
  drag.ondragstart = function (e) {
    e.dataTransfer.setData('text', e.target.id)
    // 下面这种情况保存id，在获取时得到的数据为空，因为他会把后面数据当链接处理
    e.dataTransfer.setData('url', e.target.id)
  }

  target.ondragover = function (e) {
    e.preventDefault()
  }

  target.ondrop = function (e) {
    var id = e.dataTransfer.getData('text')
    // var id = e.dataTransfer.getData("url");
    var dragElement = document.getElementById(id)
    target.appendChild(dragElement)
  }
</script>
```

![GIF2022-11-2916-14-25](data:image/gif;base64,R0lGODlhsAHjACIAACH5BAAyAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAsAHjAKL4+Pjw5ozg4ODx8fHr6+vd3d0AAAAAAAAD/wi63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feK7vfO//wKCQEygaj8ikcslsOp9Q5nBKrVpH0ax2y+0GruCweKzwms/oKPkjaLsZ7vciLiDA4/Z5fLAY0PkKfnsLBHQMhXF3iXqLCnQCim15jniRAoAAgm6Ymm2YiHIKoG2WkIyhKWmqq6prHo+llpMAdJOdl31/hLqihqekv6aUjbS+w5KyuYOBvACjuL3EsMGxK6zX2FquHcDb3j3dqdnj5EnfGuHn6jXpJ+Xv5esX7fL1LfQl8PrY9hT4/QBL/MOyr2CagAgT2jPI0IzChxBdNZy4JaLFi1UoaoSCsf+jxx4bQ0q5OPDjx5IhRKpEghGlyZbCxK1cCfOlzQYuP8ycWfOmz5wedtIkGdOnSaAdhKrsafQlUiJKQzadSlVn1I1Vs2q1cBXr1q9gGXTVGLbs17EUmZpF+HQD2olq1wJsq+Ftw7hy7dHNYJch3rzy9mLoa/AvYHWCLxAu2HLW4cCO3S3W97hyx8mULWuGiBne5s8JO78DTbqf6HhES3tLzPX0OMOqr7Cu4Pp16thrZlOonQ02biq6J/Dmd/u3mOAShl/DSCCy8SrNWShn9bw6mOmrrGungr3V9u9Auh+8iAn8kPIyxXvxbV4H8gjqz7Bvj+M9hPgOi9P/Yf8B/vX/+u0HTlGS/VdRgALu0J8DBnLBHHoJ6kAAhCY0eGCEGLZgoTYZdqjChll4KGKBIDqB0QAUjhgDitKV+MR8Kq6wYAMuvohgjDDMKFaNTcCIIwo6LsBjjzf+eA+BFQ65hI9GCoRkPkoqcWKKTarAojVRmlPllrtlyRKXYN7n5RFhlknjmEZMaeYKV36IZhFMrrlBkGW8+UWRcoZAJwB23mnRnmXu2WeceWIgqJ2EFmrBoW+qqWgJbaY35qNcDkpplZZeamSmEUWnaQieutkonp8a+iQJnEIEaJiMoploqQ60OimpsFYgq5ev1qpHi6PqKmKqvmIIbLAJDkvsfsYiFOqx/xYsi0KyAa0K5q1Z5uortVFaqyu2SmpbK7dDegsruDwymyG05m6HbrrWrcvuc+7WIy2X5NYobqn1unjvp/mWuK+m/YL476UBbzgwpQVb+K6A8S4cW8MORyzxxPyeGvG872Jcpcbpcmykx8yCjKPIxJKsosnXWuwwyhS37PLLMMcs88w0g8ayhzePq/LCOeO7c8Y/1+xP0B0TLXQEPWOYNMBGh9z00VBHLfXUVFdt9dVCLJ2g1gg/XbLXU3O9n9iKkt2e2XmiDZ7aaxYis9tYxy333HTXbffdcbO9nd6Bgp0y3rH6va3gUPNtneHTEq4z4A0427LjjEcu+eSUV74llf8SY0434s9xvqXnv4HepOixkf6j6aWhHqPqNisu9ADOTQy75bTXbvvtuMcWqcu7A876Z7+LGLxmw3dYfGXHK+16xZQnf5jzCfZOsfS5V2/99dhnrxD1mWs+N/R5gT/28kw3Tz7B58ss/lrrn53+o+2bx33E82tv//3456//DZBP3L/d8QtLAL8zwK8UUDsH1EoCq7PAqjTQOA+cSgT3R8EKWvCCGMygUf4XMQ5u7n1lA+HLJmgUEqrGhDdBIWlU6BQRuoyFR3GhBmdIwxra8IY4BAwMTyJDiu3QIz+0TBAPFrMh0up7PTSTEZ+XxL7l8IlQjKIUp0jFEjaRVVdcWRaH6bVFoKmvi+xaYkTEGD5jFEMalfjFLJpxC0404xmHMOM0jhGOOZ4RGWq0hBuXkYk3mhGO1Aik5ARQgAKgwo61SAYz+NjGXfARkHSMCSLlSEk3rDGNfWSkHx9ZyUNW0pBgrKIoR0nKUprylKhMpSpXycpWuvKVsIylLGdJy1ra8pa4zKUuMZAAACH5BAEKAAAALAsAFABkAGQAoAD/APTsqQL/hI+py+0PIwi0Uomz3tBaDoai41XjiYLllbYuub7ybKwBjbd2zo97D9z8gsTIsIhkHJPMw7LJfEKR0imxagVis7wtF+f9zsLiF7msi6GD5/Wp7RbB4yo1HWy/j/N6M7+fVgK4JzjoV2gY6JHoMscIg/jo8yfJ4VipcImJoLlZQ+kp0ek5ulmKeVqZKrn62Mr4mhhrODtYC3jbl6u3e9dL9xsX7Da8Vox2XJYstvzVzPWcFW01PVUNdd2UHQUa2tHtDbkYrrGdZE4FTr6AXtR+pb6e8M4WL+9kfz+Rf0+vxS/PhsCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aNGxw7evwIMqTIkSRLmjyJMqXKlSxbunwJM2bIAgAh+QQBCgAAACwLABQAjACcAKEA/wD07Kn///8AAAAC/4SPqcvtDyMQtFKJs968R2t54kiWGliZ6sqK6NXG8py8Ao3nqq33/sb7CYeMIPFINCKXPSXzOXNCpysp9TqyYrfAF/fr0YLHDTH5jDCj0eo1ue0Gw+PcOR1rv1Pzeii/z/QHiCQ4mORleFaY+LPI2IT4+OUoiUNZGRWJeXW52dLpWaUZ+gRKWmJ6mjWqepTa2vEK24UyuyRri4Gb+8HKq7P76xAsXORbnFmLDKm8nEPsfAAdPXFMvWN9jZqtvdrcrRMgPk5ebn6OTt6dzt7Ovu4eLw8vX59Ob5+vrq3fP47vzx7AgPP4Ecw38GC7hArvGWwYjyFEcxIn7rtm0V3FjP8BNmb0aBHkRJEQSTY0qRDlQZUEWQZ06Q9mP5n6bNi8iRPGGI7scvr8eYMMz3RAi9o8MxSd0aUgkCY1xzRq0J1Py0ll6rTquKtLs2oNwNWoV61hi46tWhbo2adpf65N2tbn26Fxc87lWRfnXY55b+7N2Peo0K/ifhA+vNIH4sUzFTN+XLAH5MkLHVO+XM4w5s2FLXO+rPkzaM+iIYcubZo06sWnV7NW7Zpw69iyYdOuOvs2btu6h+bu7Zs38I/Ch48sbvwk8uSJJTNP+vu5cufSOUav3nI5doTat9e77l0f+PACu5OvTP189vTqY5pvf248/Hfv518MZ78x+/yR8fMzL7/ff+j5J2BE9fEnX4GdBahgfAfml6CCERY4oYAV/nchgg/alyGEG87XIYcfwhfifAUAACH5BAEKAAAALDMATACoAH8AogD/APTsqf////PrqOvjoPDopQAAAAAAAAP/CLrc/jA+Qau9OOtdpf9gKI7kx51oSpVs676tKs8dbN+4S+9p7v9AB2+4CRqPNqLygmw6Rcuo4EmtCqVKq7aKzW6/yC4RTA6Kh+V07sxTu2Hs3XvOitPoeKhdlu979nx+gleAKIOHC4U9iIeKhoyDjieQkZJFlH6Wl5h5mhqcfZ4ZoJ2iTKR0pqeob6oWrHMzRgO0tba3uLm6u7y9tK5Ls77DxMXDwF5Axsu9BATMtshjQdDVt87WA9Jo1AMB3+Dh4uPk5eIDzubqAb/bct3r8fLj6fPj2u531Pb88fX93/DlC6QMoEF6BA6yGygriMKHEBcyVDErokWAEyk6vMhR/57AjBwqdpxH6yHIR0BG2vsH8OPJUftU+kuo8GXIjTLXsezn0uarmDnN7ezn8xPOoOWG2utZdApQpOMK0DzYFIMRqOa8KWRaVCTWkVVX/fiqkqtPr2QDaqUatkbKtOGUkmzr9sdauHLn0V1xFO/UlnudFoT7La+8wFcJF/7LE/HTtAUK3CW6NzFhWwfN2kSruGblvp0Nan7JmWxJz3Qtw0XHmN/ok6W/YkPdVrXfrY4HEzYcL/fYzrzVvQYZG2tkk5/fKj4t2rePyaExJv8dPbPzHNC/1qId1rbp2c2nPwf+jHtV72SDZ72OIztW9ebY3wgNn9zwjMWhDpBsvil6rP/bWScedtX11xVoBc41YHudBWiQfDY0CB5gC97gHlQTSpcagrK1thSEMFyIVH3kgPgCfR4quKFuqzGnYW0c6udgYxXaIGKC8dUIA44UrmhXg/yx5aMPEqbokYku3JhThpQNmQOKuOn4gpIykTgOki1AKaCTDC7nYpMwKtfilx9KmSSPYHYXI5r2YckClSodZ+BZawbF2laoZMMLinCSk6eeuURnZTgD/AkoZoIaKY+hgOI4KDiFkkImm6716aeklD40KUl5Zhpdp54uB2qo/URmqTiokNoSk0uNquo8rNqT6qv8PBqQq7TqpGg8s+Yqj63s4OprOZvO0+uwdgqL7Eg1xy5blrLOfiPVQ81GCymwkYJyqqrABlCttYvhiSm44nT7LbjYQhttsYuSQu5I2XKy7bvqJAAAIfkEAQoAAgAsdwBlANoAZgCi9Oyp+Pj4AP8A4ODg8fHx6+vrAAAAAAAAA/8outz+MMpJq60g6827/2AojiR4nWiqrljpvnAsB3Rt33iu73zv/7uUbEgsxoDIpHLJDAiN0KgU0Kxaf4OB9TntekvXsNiW3aK+6LRnzL6Wq1y1/NuuM9/N+HwftfuReEx6fIRDf4c9gUuDhY0uiJB+jI6UIZGXbJOVmxyYnleanKKfpIJnoqgdpYiKSqGplKuHrUmvsI2yf7RItreEuX67QL2+e8B2wj/ExXLHdck+y8xpztU10tN01tXY2V3b3KfeseDH3eN95VbQPefoRurrWnDi77/xTew87vaG+Hfz8tTrN+cfQDMnCN4zmKRAQFMJFRpj+ImfxEcUPVm8SCL/o8aBHL14xLQxpKWRPvQFAWlSCsqUDxexbAnlZaKYrmbSLGKTh0odJXd26qnjZ46gQjUQ1VGgAMILSacslaQzKoypdpBGxVpHa1KuNwg8tWA1HdgARnF4FXqWRtoba3e2RYuzVtWyYNq+tRGX5ty91+7iHTGXgFN6EQf7mzu2heIZjBtTeLw4MkSolI+0JSAWMebML/7W5SUY9NCzgGn0bSla8gTTofWOHlYadobWnsna7ri5s8DEu09avqw7uPDhOYEbX4NcpvLlp8Fydi0BOgjcvz9bj841tZPatrETd7x9g3jn2svflk09gnruWKfnJv++Ofri76nYt/u8/H7+p+mpN1dT7UGQn1LszTfZgfqhNpsy4MF2XnIB+pdgdvjVd+F4Cx74H2n9bfchbSFaNyKEJUJ3YjQRmjbgYRjSJ+CG98looYMFPsBgg2B5t5pJEwKY4Yw4Kvgagyu20yJoSe6zZGZNrpTiclEC9SRlQYJYoYg0UjjkjT0+yOKUxmVJ4pYmdimkjVwWGWOH+VV51JWPyakWC3jmqeeeCtgJF5+ABiroAwkAACH5BAEKAAAALO0AVACMAHUAoQD/AP////TsqQAAAAL/hI+pyygPo5y02ouztq37voXiSJbCh6aAybbupsbNS9e0jCf2zov5v+oJhxNgjogkGnHJJm8pc0pvUNX0yqpasVyfFtUNa75gsblC/pzXkrSHDT+5Z/H1nF43B/b8vv8PGNh3R3YleIh4SPhlmOj4uKjV+EgpGFk1Wak5eLmUubnZ6TkFWhogavRpCon6o7qa2OpKClspe0Rby3ob86obyBuV+4sY3DtMbGmc4pvMuayG7PwHXSY1rVj9Jo3Np7193Q34DcItTo7nJD6OvtCM3e5u3h2v8D5drzMPn39w79zP3z58AYOEW/es379kBQ2qQ5gw30JiDSf+qjgQYEGL7rowHoR4amNGhiI/QvT4EGTIgBxroWyics/LJDFXKhxJsWRKkDOR1OxJ5KdOmDGBDhHKEufFoTSLMvXpNKlJhEaFIL05dV3VHlclKu34NGhUrDtPhj061mvWc2etpq3XEtZWHl3hfnXZluvbeHFXzd1Rl+9duXnp7m3X19RfG4ERD/ZbGPBhdIlLLa7RmPJjxZEZTyZXGdRlGplBb7bcGfPnb6FDpSa9WltrTaNf1LwtGhXu3ZRa8f5dTDfw4dSEEz9u8xJy5L6XE2/uHDj06LynU8dt/XppN9qrG+++PQ147N/H8yxvnir69GxFFQAAIfkEAQoAAAAsFQFAAGQAeAChAP8A////9OypAAAAAuKUj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDApngKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+Sy+YxOq9fstvsNj8vn9Lr9js/r9/y+/w8YKDhIWGh4iJiouMjY6PgIGSk5SVlpeYmZqbnJ2en5CRoqOkpaanqKmqq6ytrq+gobKztLW2t7i5uru8vb6/sLDBwwTFxsfIycrLzM3Oz8DB0tPU1dbX2Nna29zd3t/Q0eLj5OXm5+jp6uvs7e7v4OHy8/T19vf4+fr7/P3+//D68AACH5BAEoAAAALBUBNgBkAG4AoQD/AP////TsqQAAAALGlI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuCzvATNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1trqxiQq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+HlwAACH5BAFuAAAALAMABAB2AZYAoQD/AP////DmjAAAAAL/jI+py+0PYwO02ouz3rz7D4biSJbmiZ7SyrbuG6TyTNf2jec5zPe+pAsKh8Si8fZLKpPHpvMJjc6W1CpLiq0Ittyu9wsOi8fkslmcDVrX7EUae47L5/S64L1r69n4qP0PGHjWh7RnSEX4JLjIuJhYcxjJ9HjUaHkpRzklyQmjaYQZKgr2mdJ52lJKNMo6qqqCGgvxKtRqe0lbIrs7kZtzC+zoK8JbnDCME6z8hxxi/BzTXLNMPSf9AW18TVPdbbbdkV0MLuNtjkauIc6bjnL+7tWesb4rbwKPf2dvQS+7T5IP3r8K/WINFBHw3UEABVEtBJHw3MKGpx5+iGhuIkVO/xY9YPSmcWOkjh0+dgsp0hBJDiaroUypZ+WGltRewuQjMwPNZTZvWsmpc2ewnj4RAb0gdOjBojGPWkgKjCjTSU4pQL0ldaqPqlqutsqqlQdXq15ZgQ37YiyAsmaXojXKla0rt2+VqJUr6mzdFXfxYtK7N0Jfv5YAB34wmDAjw4d7xVXciHFjN2MhR6Y7OW1ly8IGZha7mXMgyZ8PJBZth3TpaI9RM8O8Gkho13VUlz5NOxPs2LNm59btmTdf378H7RbuuGpxOsibU269/Izz6aaJRx9DnTru62KyT9/OHYx35+DDexnfvLx5LuiRq18voL3w9+vl86Zv3n5s/OH1r//mz51/t1kHH3sCZgbgdQciSGCB8S3YWILRQRhhgwVSeJiEy2EYmIbFcbiXh7+BWJeIuZH4lom0oYiWiq6xGJaLqMGolYyi0TiVjZzhyJSOlvFYlI+QAemTkIoReZORhCEJk5J+MZmSk3hBKZKUclG5kZVsYUmRlmVx2ZCXXoFZkJhXkdmPmVChSY+aSbG5jptCwSmOnDvRmY2dNOEJjZ4t8fmMnyYBqo2F8BE6jqH1IVqPovkx6o+j/UFqkKQBUuqQpQoyqFanXTn4xWeejroWqKFySqqmE6KaqnKmnsdqq7JeI+Cstm5T6626DpPrrr6q0uuvwj4S7LDGvlHsscqiRpHsss4e0eyz0goR7bTWFqLftdqq4d+23mJr37fibpLtuOaaUO256qrT7bruepDuu+/GK++69NZ77r34jqvvvt/26++2AAd87cAET2vwwc8mrPCyDDd87MMQDyvxxL9WbPGuGGd868Ycz+rxx62GLDKpJJfs6ckoq6Xyyly17LJTMMcM1Mw0y2TzzSTlrLNFPPdsm6hAO9zu0BEXbTTF/hUAADs=)

### 4.5、clearData

`clearData()`方法删除给定类型的拖动操作的 `drag data`，如果给定类型的数据不存在，则此方法不执行任何操作

```js
// 清空对应类型数据  如果不带参数，默认清空所有setData方式添加的数据
e.dataTransfer.clearData([format])
```

### 4.6、setDragImage

`setDragImage`可以自定义一个 img 类型，用来设置拖放过程中的鼠标下面的图标

```js
setDragImage(element, x, y)
```

- element 拖拽时鼠标下面的图片，必需是一个元素节点
- x 表示：图标距离鼠标指针的 x 轴方向的偏移量
- y 表示：图标距离鼠标指针 y 轴方向的偏移量 移

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
  }
  .target {
    width: 200px;
    height: 200px;
    border: 2px dashed #ddd;
    position: absolute;
    left: 200px;
    top: 10px;
  }
</style>

<div class="drag" draggable="true" id="J_drag"></div>
<div class="target"></div>
<script>
  var drag = document.querySelector('.drag')
  var target = document.querySelector('.target')

  drag.ondragstart = function (e) {
    var img = document.createElement('img')
    img.src = './example.jpg'
    e.dataTransfer.setDragImage(img, 10, 10) // 设置自定义图拖拽图像
  }
</script>
```

![GIF2022-11-2916-30-10](https://www.arryblog.com/assets/img/GIF2022-11-2916-30-10.4f5d5cc0.gif)

```html
<style>
  .drag {
    width: 100px;
    height: 100px;
    background-color: khaki;
    position: absolute;
    left: 100px;
    top: 100px;
    cursor: move;
  }
</style>
<!-- draggable=true 表示元素可拖拽 -->
<div class="drag" draggable="true"></div>
<script>
  var drag = document.querySelector('.drag')
  var offsetLeft
  var offsetTop
  var _clientX
  var _clientY

  drag.ondragstart = function (e) {
    offsetLeft = this.offsetLeft
    offsetTop = this.offsetTop

    _clientX = e.clientX
    _clientY = e.clientY
  }

  drag.ondrag = function (e) {
    var clientX = e.clientX
    var clientY = e.clientY

    var left = clientX - _clientX + offsetLeft
    var top = clientY - _clientY + offsetTop

    this.style.left = left + 'px'
    this.style.top = top + 'px'
  }

  document.addEventListener('dragover', function (event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move' // 鼠标样式
  })
</script>
```

## 四、HTML5 拖拽综合应用案例

结合本章节所学内容进行综合实践应用。

### 1、双向拖拽添加内容

涉及知识点

- 事件委托
- 拖拽事件（dragstart、dragend、dragover、drop）

![GIF2022-11-2917-21-35](https://www.arryblog.com/assets/img/GIF2022-11-2917-21-35.f61ec376.gif)

```html
<style>
  html,
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
    width: 600px;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
  }
  .select-fruit,
  .like-fruit {
    text-align: center;
    width: 200px;
  }

  .drag-wrap {
    border: 1px solid #ddd;
    padding: 10px;
    height: 280px;
  }
  .drag-wrap li,
  .target-wrap li {
    height: 50px;
    line-height: 50px;
    background-color: #ddd;
    margin: 5px auto;
  }
  .drag-wrap li:hover,
  .target-wrap li:hover {
    background-color: khaki;
  }

  .target-wrap {
    border: 2px dashed #ddd;
    padding: 10px;
    height: 280px;
  }
  .target-wrap li {
    background-color: skyblue;
  }
</style>

<div class="container">
  <!--select-fruit start-->
  <div class="select-fruit">
    <h3>选择你喜欢的水果</h3>
    <ul class="drag-wrap">
      <li draggable="true" class="drag-item">苹果</li>
      <li draggable="true" class="drag-item">香蕉</li>
      <li draggable="true" class="drag-item">梨子</li>
      <li draggable="true" class="drag-item">葡萄</li>
      <li draggable="true" class="drag-item">芒果</li>
    </ul>
  </div>
  <!--select-fruit end-->

  <!-- like-fruit start -->
  <div class="like-fruit">
    <h3>你最喜欢的水果是</h3>
    <ul class="target-wrap"></ul>
  </div>
  <!-- like-fruit end -->
</div>
```

**JS 实现**

- 在这个案例中，拖动元素的容器本身也是放置目标元素。
- 放置目标元素中的子元素，本身也是被拖动的元素。
- 所有拖动元素要处理的事情，全部委托给他到们的父容器来处理。

```html
<script>
  // 拖动元素的容器
  var dragWrap = document.querySelector('.drag-wrap')
  // 目标元素容器
  var targetWrap = document.querySelector('.target-wrap')
  var currentDragEl = null // 记录当前被拖动的元素

  // 拖动元素  采用事件委托，所有子元素的拖拽行为委托给父元还给来处理
  dragWrap.ondragstart = dragStartHandle
  dragWrap.ondragend = dragEndHandle
  dragWrap.ondragover = dragOverHandle
  dragWrap.ondrop = dragDropHandle

  // 放置元素
  targetWrap.ondragstart = dragStartHandle
  targetWrap.ondragend = dragEndHandle
  targetWrap.ondragover = dragOverHandle
  targetWrap.ondrop = dragDropHandle

  // 以下代码，全部采用了事件委托来处理
  function dragStartHandle(e) {
    // 获取被拖动的元素
    var target = e.target
    // 刚拖动时，元素透明度将低
    target.classList.add('opacity')
    // 记录被拖动的元素
    currentDragEl = target
  }
  function dragEndHandle(e) {
    var target = e.target
    // 刚拖动结束，还原透明度
    target.classList.remove('opacity')
  }
  function dragOverHandle(e) {
    // 阻止默认行为，才会触发drop事件
    e.preventDefault()
    // 设置光标样式
    e.dataTransfer.dropEffect = 'move'
  }
  function dragDropHandle(e) {
    // 将拖动元素移动到当前目标元素中
    this.appendChild(currentDragEl)
  }
</script>
```

### 2、拖拽排序

核心知识

- 拖拽相关事件
- 占位思想
- 找出相邻兄弟中离自己最近的元素
- insertAdjacentElement 方法
- prepend 方法

![GIF2022-11-300-11-06](https://www.arryblog.com/assets/img/GIF2022-11-300-11-06.ef5698f7.gif)

### 2.1、CSS 布局代码

```html
<style>
  html,
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  .drag-wrap {
    width: 200px;
    height: 280px;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 100px;
    position: relative; /* 切记设置为相对定位 */
  }
  .drag-wrap .drag-item {
    height: 50px;
    width: 200px;
    text-align: center;
    line-height: 50px;
    background-color: #ddd;
    margin: 5px 0px;
    cursor: move;
  }
  .drag-wrap .drag-item.dragcss {
    background-color: khaki;
  }
  /* 占位元素样式 */
  .drag-wrap .stance {
    height: 50px;
    margin: 5px 0px;
  }
</style>
<div class="drag-wrap">
  <div class="drag-item" draggable="true">苹果</div>
  <div class="drag-item" draggable="true">香蕉</div>
  <div class="drag-item" draggable="true">梨子</div>
  <div class="drag-item" draggable="true">葡萄</div>
  <div class="drag-item" draggable="true">芒果</div>
</div>
```

### 2.2、JS 实现原理

**第一步：实现鼠标按下开始拖动时要处理的事情**

- 1、为了后面 drag 事件中能获取到当前拖动的元素，还需要把拖动元素保存到全局变量中
- 2、把拖动元素的背景色设置为黄色
- 3、同时把拖动元素设置为绝对定位元素，设置好初始 left 和 top 值，同时把 margin 值为 0
- 4、创建一个 div 元素，作为**占位元素**，其宽、高、margin 和被拖动元素一样，然后把创建好的空元素插入当前元素前面。
- 5、为了后面拖动元素，还需要在此记录鼠标按下时与浏览器左边和上边的距离。

> 以上拖动元素需要处理的事情，全委托给他们的父元素来处理。

```js
// 拖动的父容器
var dragWrap = document.querySelector('.drag-wrap')
var dragLeft // 记录被拖动元素的初始left值
var dragTop // 记录被拖动元素的初始top值
var stanceELement = null // 用来保存占位元素
var pageX // 记录拖动元素开始拖动时，鼠标与浏览器的水平距离
var pageY // 记录拖动元素开始拖动时，鼠标与浏览器的垂直距离
var dragElement = null // 记录被拖动的元素

// 事件委托  拖动元素需要处理的事情，全很托给他们的父元素来处理
dragWrap.ondragstart = function (e) {
  // 获取被拖动的元素
  var target = e.target
  // 1、记录被拖动的元素
  dragElement = target
  // 2、将被拖动的元素背景设置为黄色的
  target.classList.add('dragcss')
  // 3、设置当前被拖动元素为定位元素，相对于他的父元素定位，所以父元素一定要设置相对定位
  // 获取元素相对其定位父元素的left和top值
  dragLeft = target.offsetLeft
  dragTop = target.offsetTop
  target.style.position = 'absolute'
  target.style.left = dragLeft + 'px'
  target.style.top = dragTop + 'px'
  target.style.margin = '0px auto'

  // 4、创建占位元素,将其插入当前拖动元素的后面
  stanceELement = document.createElement('div')
  stanceELement.classList.add('stance')
  this.insertBefore(stanceELement, target) // 占位元素插入拖动元素后面

  // 5、记录鼠标按下开始拖动时，鼠标与浏览器左边和顶部的距离
  pageX = e.pageX
  pageY = e.pageY
}
```

**第二步：拖动过程中要处理的事情**

- 元素能正常随着鼠标拖动

```js
// 拖动过程中需要处理的事情
dragWrap.ondrag = function (e) {
  // 获取鼠标与浏览器左边和上边距离
  var _pageX = e.pageX
  var _pageY = e.pageY

  // 记录鼠标移动的距离
  var moveX = _pageX - pageX
  var moveY = _pageY - pageY

  // 动态给拖动元素赋值
  dragElement.style.left = moveX + dragLeft + 'px'
  dragElement.style.top = moveY + dragTop + 'px'

  // 相关后面drag事件中要处理的代码，从这个位置接上
}
```

重点提示

整个 drag 操作过程的样式要生效，必需要设置父容器为允许放置行为，即在 dragover 中取消默认行为

```js
dragWrap.ondragover = function (e) {
  e.preventDefault()
}
```

- 找到与当前拖动元素同时满足以下条件的兄弟元素（兄弟元素不包含占位元素）

> 拖动元素底部与浏览器的距离 >= 兄弟元素垂直中心点与浏览器顶部的距离

- 封装一个函数来实现，如果有对应的兄弟元素就将元素返回，没有就返回 null

```js
/**
 * 寻找具有相同className的兄弟元素中，满足拖元素底部与浏览器距离 > 兄弟元素中心点与浏     览器的距离的元素
 * dragEl 被拖动元素
 * className 通过className来过滤不需要兄弟元素，然后在需要的兄弟元素中找最近的
 */
function findNearSibling(dragEl, className) {
  //  获取拖动元素底部距离浏览器顶部距离
  var rect = dragEl.getBoundingClientRect()
  var dragTop = rect.bottom

  // 获取拖动元素的所有兄弟元素,包括了自已,还包括了占位符
  // 所以通过className名过滤占位符
  var siblings = dragEl.parentNode.children
  // 将类数组转成数组
  siblings = Array.prototype.slice.call(siblings, 0)
  // 过滤满足条件的兄弟元素
  siblings = siblings.filter(function (item) {
    return item.classList.contains(className)
  })

  var result = null // 用来保存找到了满足条件兄弟元素

  // 遍历所有过滤后满足条件的兄弟元素，要排除自身
  for (var i = 0; i < siblings.length; i++) {
    if (siblings[i] === dragEl) continue // 排除自身
    // 获取每个元素中心与浏览器顶部的距离
    var rect = siblings[i].getBoundingClientRect()
    var center = rect.top + siblings[i].offsetHeight / 2

    // 找到离自己最近的满足 dragTop>center的兄弟元素
    if (dragTop > center) {
      result = siblings[i]
    } else {
      return result
    }
  }
  return result
}
```

- 如果有满足条件的兄弟元素，就将兄弟元素的背景色变为红色，同时将占位符插入当前兄弟元素的后面。
- 如果没有满足条件的兄弟元素，说明当前拖动元素在第一个子元素的前面，此时可以将占位元素插入到父元素的第一个子元素的前面。

```js
// 以下代码写在drag事件中
//  返回符合条件的兄弟元素
var nearSibling = findNearSibling(dragElement, 'drag-item')
// 如果不存在满足条件兄弟元素，说明当前拖动元素在第一个子元素的最前面
if (!nearSibling) {
  dragWrap.prepend(stanceELement) // 将占位元素插入到父元素的第一个子元素的前面
}
// 如果存在满足条件的兄弟元素,则需要做以下几件事
if (nearSibling) {
  prevNearSibling && (prevNearSibling.style.backgroundColor = '')
  // 1、将元素背景变为红色
  nearSibling.style.backgroundColor = 'red'
  // 3、记录下被(背景变红）的元素为前一个元素
  prevNearSibling = nearSibling
  // 2、将占位符元素，插入到当前元素的后面
  nearSibling.insertAdjacentElement('afterend', stanceELement)
}
```

**第三步：拖动结束要处理的事情**

- 拖动元素的背景色还原
- 拖动元素要取消定位，同时恢复 margin 值
- 将拖动元素放入占位元素所在位置（前或后）
- 将占位元素从页面中移除
- 如果存在前一个背景变红的兄弟元素，将红色背景去掉

```js
// 拖动结束
dragWrap.ondragend = function (e) {
  // 1、拖动元素颜色还原
  dragElement.classList.remove('dragcss')
  // 2、拖动元素取消定位，还原margin值
  dragElement.style.position = ''
  dragElement.style.margin = '5px auto'
  // 3、插入占位元素的后面
  dragWrap.insertBefore(dragElement, stanceELement)
  // 4、移除占位元素
  dragWrap.removeChild(stanceELement)
  // 5、前一个元素存在，则移出样式
  prevNearSibling && (prevNearSibling.style.backgroundColor = '')
}
```

### 2.3、JS 完整源码

```html
<script>
  // 拖动的父容器
  var dragWrap = document.querySelector('.drag-wrap')
  var dragLeft // 记录被拖动元素的初始left值
  var dragTop // 记录被拖动元素的初始top值
  var stanceELement = null // 用来保存占位元素
  var pageX // 记录拖动元素开始拖动时，鼠标与浏览器的水平距离
  var pageY // 记录拖动元素开始拖动时，鼠标与浏览器的垂直距离
  var dragElement = null // 记录被拖动的元素
  var prevNearSibling = null // 前一个背景变红的元素

  // 事件委托  拖动元素需要处理的事情，全很托给他们的父元素来处理
  dragWrap.ondragstart = function (e) {
    // 获取被拖动的元素
    var target = e.target
    // 1、记录被拖动的元素
    dragElement = target
    // 2、将被拖动的元素背景设置为黄色的
    target.classList.add('dragcss')
    // 3、设置当前被拖动元素为定位元素，相对于他的父元素定位，所以父元素一定要设置相对定位
    // 获取元素相对其定位父元素的left和top值
    dragLeft = target.offsetLeft
    dragTop = target.offsetTop
    target.style.position = 'absolute'
    target.style.left = dragLeft + 'px'
    target.style.top = dragTop + 'px'
    target.style.margin = '0px auto'

    // 4、创建占位元素,将其插入当前拖动元素的后面
    stanceELement = document.createElement('div')
    stanceELement.classList.add('stance')
    this.insertBefore(stanceELement, target) // 占位元素插入拖动元素后面

    // 5、记录鼠标按下开始拖动时，鼠标与浏览器左边和顶部的距离
    pageX = e.pageX
    pageY = e.pageY
  }

  // 拖动过程中需要处理的事情
  dragWrap.ondrag = function (e) {
    // 获取鼠标与浏览器左边和上边距离
    var _pageX = e.pageX
    var _pageY = e.pageY

    // 记录鼠标移动的距离
    var moveX = _pageX - pageX
    var moveY = _pageY - pageY

    // 动态给拖动元素赋值
    dragElement.style.left = moveX + dragLeft + 'px'
    dragElement.style.top = moveY + dragTop + 'px'

    //  返回符合条件的兄弟元素
    var nearSibling = findNearSibling(dragElement, 'drag-item')
    // 如果不存在满足条件兄弟元素，说明当前拖动元素在第一个子元素的最前面
    if (!nearSibling) {
      dragWrap.prepend(stanceELement) // 将占位元素插入到父元素的第一个子元素的前面
    }
    // 如果存在满足条件的兄弟元素,则需要做以下几件事
    if (nearSibling) {
      prevNearSibling && (prevNearSibling.style.backgroundColor = '')
      // 1、将元素背景变为红色
      nearSibling.style.backgroundColor = 'red'
      // 3、记录下被(背景变红）的元素为前一个元素
      prevNearSibling = nearSibling
      // 2、将占位符元素，插入到当前元素的后面
      nearSibling.insertAdjacentElement('afterend', stanceELement)
    }
  }

  dragWrap.ondragover = function (e) {
    e.preventDefault()
  }

  // 拖动结束
  dragWrap.ondragend = function (e) {
    // 1、拖动元素颜色还原
    dragElement.classList.remove('dragcss')
    // 2、拖动元素取消定位，还原margin值
    dragElement.style.position = ''
    dragElement.style.margin = '5px auto'
    // 3、插入占位元素的后面
    dragWrap.insertBefore(dragElement, stanceELement)
    // 4、移除占位元素
    dragWrap.removeChild(stanceELement)
    // 5、前一个元素存在，则移出样式
    prevNearSibling && (prevNearSibling.style.backgroundColor = '')
  }

  /**
   * 寻找具有相同className的兄弟元素中，满足拖元素底部与浏览器距离 > 兄弟元素中心点与浏     览器的距离的元素
   * dragEl 被拖动元素
   * className 通过className来过滤不需要兄弟元素，然后在需要的兄弟元素中找最近的
   */
  function findNearSibling(dragEl, className) {
    //  获取拖动元素底部距离浏览器顶部距离
    var rect = dragEl.getBoundingClientRect()
    var dragTop = rect.bottom

    // 获取拖动元素的所有兄弟元素,包括了自已,还包括了占位符
    // 所以通过className名过滤占位符
    var siblings = dragEl.parentNode.children
    // 将类数组转成数组
    siblings = Array.prototype.slice.call(siblings, 0)
    // 过滤满足条件的兄弟元素
    siblings = siblings.filter(function (item) {
      return item.classList.contains(className)
    })

    var result = null // 用来保存找到了满足条件兄弟元素

    // 遍历所有过滤后满足条件的兄弟元素，要排除自身
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === dragEl) continue // 排除自身
      // 获取每个元素中心与浏览器顶部的距离
      var rect = siblings[i].getBoundingClientRect()
      var center = rect.top + siblings[i].offsetHeight / 2

      // 找到离自己最近的满足 dragTop>center的兄弟元素
      if (dragTop > center) {
        result = siblings[i]
      } else {
        return result
      }
    }
    return result
  }
</script>
```

## 五、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 封装处理鼠标滚轮事件的兼容性函数
- 掌握禁止右键菜和禁止选中元素
- 如何识别用户按下的是那个鼠标键
- 掌握 drag 拽拖事件（drag、dragstart、dragend、dragenter、dragover、dragleave、drpp)
- 理解 dropEffect 和 effectAllowed 属性和 setData、getData、clearData 方法

### 2、难点

手写以下三个案例

- 全屏垂直滚动轮播
- 双向拖拽添加内容
- 拖拽排序
