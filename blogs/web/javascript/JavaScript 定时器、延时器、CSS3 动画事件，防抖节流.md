# JavaScript 定时器、延时器、CSS3 动画事件，防抖节流



本节内容我们开始学习 JavaScript 定时器、延时器，requestAnimationFrame 解决定时器和延时器动画丢帧、卡顿的相关问题，CSS3 动画事件，防抖和节流，性能优化等在实际开发中的综合真实应用场景和企业高频面试真题和答案解析。

## 一、定时器与延时器



接下来我们学习两个非常重要的知识点，定时器与延时器。[详见 MDN 官方参考(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)

### 1、setInterval() 与 clearInterval()



`setInterval()` 方法设置一个定时器，每间隔相同的一段时间，重复调用一个函数或执行一个代码片段

```js
// 基本语法
var timer = setInterval(funtion, delay, arg1, arg2, arg3);
```

- delay：表示定时器延迟的时间，以毫秒为位，1 秒等于 1000 毫秒
- function：这个参数是一个函数，每经过指定 delay 毫秒后执行一次。第一次调用发生在 `delay` 毫秒之后。
- arg1...arg3：每次定时器到指定时间，要执行 function 函数前，这些参数会被当成 function 的参数传递给 function
- timer：表示延时器的返回值，返回值是一个正整数，表示定时器的编号，这个值可以传递给`clearInterval()`来取消该定时器

```js
// 每一秒输出一个数字
var a = 0;
setInterval(function () {
  console.log(++a);
}, 1000);

setInterval(
  function (a, b) {
    // 形式参数a的值是22，形式参数b的值是66
    console.log(a, b); // 不断重复，过2秒在页面输入22，66
  },
  2000,
  22,
  66
);
// 从22第三个参数开始，表示传入函数内的参数

// 具名函数也可以传入setInterval
var a = 0;
function fun() {
  console.log(++a);
}
// 具名函数当做第一个参数，注意：fun这里没有圆括号
setInterval(fun, 1000);
```

**清除定时器**

> `clearInterval()` 函数可以清除一个定时器

```html
<button id="btn">点我清除定时器</button>

<script>
  var oBtn = document.getElementById("btn");

  var a = 0;
  // 设置定时器，并且用timer变量接收这个定时器
  var timer = setInterval(function () {
    console.log(++a);
  }, 1000);

  // 点击按钮时，清除定时器
  oBtn.onclick = function () {
    // 清除定时器，这时需要传入定时器变量
    clearInterval(timer);
    alert("清除定时器成功 ！");
  };
</script>
```

**案例：计时器功能**

```html
<h2 id="info">0秒</h2>
<button id="btn1">开始</button>
<button id="btn2">暂停</button>

<script>
  var oInfo = document.getElementById("info");
  var oBtn1 = document.getElementById("btn1");
  var oBtn2 = document.getElementById("btn2");

  var n = 0;
  // 设置一个定时器全局变量
  var timer;

  // 点击开始
  oBtn1.onclick = function () {
    // 为了防止定时器叠加（当我们不停点击开始按钮时，就能看到），我们应该在设置定时器之前先清除定时器
    clearInterval(timer);
    // 更改全局变量timer的值为一个定时器实体
    timer = setInterval(function () {
      oInfo.innerText = ++n + "秒";
    }, 1000);
  };

  // 暂停，清除定时器
  oBtn2.onclick = function () {
    clearInterval(timer);
  };
</script>
```

### 2、setTimeout() 与 clearTimeout()



`setTimeout()`方法设置一个延时器，该延时器在定时器到期后执行一个函数或指定的一段代码。

> 注意：当指定时间到了之后，**会执行函数一次，不再重复执行**

**语法**

```js
// 设置一个定时器
var timer = setTimeout(funtion, delay, arg1, arg2, arg3);
```



- delay ：表示定时器延迟的时间，以毫秒为位，1 秒等于 1000 毫秒
- function 这个参数是一个函数，当延时器延迟时间`delay`到期后，就会执行这个函数
- arg1...arg3 等：附加参数，一旦定时器到期，它们会作为参数传递给 function ，ie 不支持
- timer：表示延时器的返回值，返回值是一个正整数，表示定时器的编号，这个值可以传递给`clearTimeout()`来取消该延时器。

```js
setTimeout(function () {
  // 在页面弹出弹窗
  alert(1);
}, 1000);

// 设置定时器，2，3作为函数形参a,b对应的实参
setTimeout(
  function (a, b) {
    // 在页面弹出 5
    alert(a + b);
  },
  1000,
  2,
  3
);
```

**清除延时器**

> `clearTimeout()`用来取消一个延时器

```js
// 清除一个定时器
cleartTimeout(timer);
<button id="btn1">2秒后弹出 Hello World ！</button>
<button id="btn2">取消弹出</button>

<script>
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");
  // 定义延时器全局变量
  var timer;

  btn1.onclick = function () {
    // 更改全局变量timer的值为一个延时器实体
    timer = setTimeout(function () {
      alert("Hello World ！");
    }, 2000);
  };

  // 点击取消按钮
  btn2.onclick = function () {
    // 清除延时器
    clearTimeout(timer);
  };
</script>
```

### 3、定时器中 this 问题



- setTimout 和 setInterval 函数中的第一个参数是一个函数，当定时器到时间执行这个函数
- 这个函数中的`this`默认指向`window`或`global`，在严格模式下，`this`也指向`window`

```js
var obj = {
  name: "张三",
  sayHello: function () {
    console.log(this); // window
    console.log("大家好，我叫" + this.name);
  },
};

setInterval(obj.sayHello, 1000);
```

**修改 this 指向**

> 方法一： 包装函数来实现 this

```js
var obj = {
  name: "张三",
  sayHello: function () {
    console.log(this); // obj
    console.log("大家好，我叫" + this.name);
  },
};

setInterval(function () {
  obj.sayHello();
}, 1000);
```

> 方法二：利用 bind 来实现

```js
var obj = {
  name: "张三",
  sayHello: function () {
    console.log(this);
    console.log("大家好，我叫" + this.name);
  },
};

setInterval(obj.sayHello.bind(obj), 1000);
```

> 方法三：在外层作用域，保存 this

```html
<button id="start">开始</button>
<script>
  var start = document.getElementById("start");
  start.onclick = function () {
    var that = this;
    setInterval(function () {
      console.log(that); // this指向start
    }, 1000);
  };
</script>
```

### 4、队列



在讲接下来的同步与异步相关内容时，会涉及到队列相关知识，所以我们先来学习下队列相关内容

- 队是一种线性的数据结构，它的特点是先进先出（`First In First Out`,简称`FIFO`），后进后出。
- 队列的出口端叫作**队头**（`front`），队列的入口端叫作**队尾**(`rear`)
- **入队**（`enqueue`）就是把新元素放入队列中，只允许在队列的队尾放入元素
- **出队**（`dequeue`）就是把元素移出队列，只允许在队列的队头移出元素。

![image-20221103162913639](https://www.arryblog.com/assets/img/image-20221103162913639.4f29d364.png)

**用数组来模拟队列**

![image-20221103211210042](data:image/png;base64,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)

```js
var arr = [];
arr.push(1); // 入队
arr.shift(); // 出队
```

### 4.1、用 JS 来实现一个队列



- 要求队列在创建时规定好其容量
- 要求实现出队、入队、查看队列是否为空、队列是否已满、查看队列中元素

```js
(function () {
  var arr = [];
  Queue = function (maxSize) {
    this.maxSize = maxSize;
  };
  // 入队
  Queue.prototype.enqueue = function (item) {
    // 入队前判断
    if (arr.length < this.maxSize) {
      arr.push(item);
      return true;
    } else {
      throw new Error("队列已满");
    }
  };
  // 出队
  Queue.prototype.dequeue = function () {
    if (arr.length === 0) {
      throw new Error("队列已空");
    } else {
      arr.shift();
      return true;
    }
  };
  // 查看当前队列是否为空
  Queue.prototype.isEmpty = function () {
    if (arr.length === 0) return true;
    return false;
  };
  // 判断队列是否满
  Queue.prototype.isFull = function () {
    if (arr.length === this.maxSize) return true;
    return false;
  };
  // 查看队列中所有元素
  Queue.prototype.view = function () {
    console.log(arr);
  };
})();

var queue = new Queue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.view();
queue.isFull();
```

上述版本缺点

- 以上版本，在入队时还好，直接尾部插入元素，但是在出队时从队头取出元素，本质上会造成整个数组往后的所有元素都向前移动，非常消耗性能。
- 同时队列的容量大小一直是在不断变化的，而实际上一个队列的大小一开始分配时，大小应该是固定才更合理。

> 有没有什么办法能实现在出队时，能正常出，但不需要动数组中的其它元素呢 ? 同时保证整个出队和入队过程程中，栈的容量大小是固定的

### 4.2、优化版本



- 我们可以利用双指针思想，同时采用循环队列的方式来实现
- 以下图中的队列容量（长度）为 4，需要用长度为 5 的数组来实现。
- 定义两个指针 front 和 rear，front 和 rear 分别表示当前队列**队头**和**队尾**的下标
- 刚开始初始化的队列为空，则 `front = rear = 0`
- 入队一个元素，rear+1，向右移一位，如果队未满，当 `rear + 1 === arr.length` 时，则 `rear = 0`
- 出队一个元素，`front + 1`,向右移一位，如果队未空，当 `front + 1 === arr.lenght` 时，`front = 0`;

> 重点强调：队列的容量 + 1 = 数组的长度

![image-20221104001903505](https://www.arryblog.com/assets/img/image-20221104001903505.2ca00ec6.png)

队列入队的整个过程

![image-20221103235611430](https://www.arryblog.com/assets/img/image-20221103235611430.171330e9.png)

队列出队与队入的整过程

![image-20221103235647233](https://www.arryblog.com/assets/img/image-20221103235647233.6137f46f.png)

队列出队的整个过程

通过以上绘图分析得出如下结论



- 队满： 当 `(rear+1) % arr.lenght === front` 时，表示队满
- 队空： 当 `rear === front` 时，表示队空

**出队**：

- 出队时要判断当前队是否为空，如果为空，啥也不做。
- 如果队不为空，要判断 `front + 1 === arr.length`如果成立则出队后，`front = 0`
- 如果不成立，则 `front + 1`

> front 的计算公式：`front = (front + 1) % arr.length`

**入队**：

- 入队时要判断当前队是否满，如果满，啥也不做
- 如果队未满，要判断 `rear + 1 === arr.lenght` 如果成立，则入队后，`rear = 0`
- 如果未满，则 `rear + 1`

> rear 的计算公式：`rear=(rear+1) % arr.length`

```js
(function () {
  var arr = []; // 数组实现队
  var front = 0; // 队头
  var rear = 0; // 队尾
  Queue = function (capacity) {
    arr = new Array(capacity + 1); // 初始化队列长度,数组长度大比队列长度大1
  };

  // 入队
  Queue.prototype.enQueue = function (value) {
    // 判断是栈满
    if (this.isFull()) throw new Error("栈满");
    arr[rear] = value;
    rear = (rear + 1) % arr.length;
    return true; // 入队成功
  };

  // 出队
  Queue.prototype.deQueue = function () {
    // 判断是否栈空
    if (this.isEmpty()) throw new Error("栈空");
    var deQueueElement = arr[front];
    front = (front + 1) % arr.length;
    return deQueueElement;
  };

  // 队满
  Queue.prototype.isFull = function () {
    if ((rear + 1) % arr.length === front) return true;
    return false;
  };

  // 队空
  Queue.prototype.isEmpty = function () {
    if (front === rear) return true;
    return false;
  };

  // 遍历队（或显示队）
  Queue.prototype.view = function () {
    console.log(arr);
  };
})();

var queue = new Queue(4);
```

### 5、单线程、同步与异步



为了让大家更好的理解单线程、同步和异步，我们先站在生活的角度来举一个例子，帮助大家理解。

比如你现在工作是查阅合同，并归档，并且这个工作只有你一个人在做，那就属性单线程执行。

> 所谓单线程，站在现实角度，简单理解就是一个人干了所有活。
>
> 至于 JS 为什么设置成单线程的，我们后面在性能优化那节课来专门讲解。

**比如，你现在的工作流程如下：**

- 第一：查阅合同是否有错误，我们简称 A 事情
- 第二：如果有错误就要提交到老板处，让老板改正 我们简称 B 事情
- 第三：老板改正好之后，我们要拿回合同，然后一起归档，简称 C 事情
- 第四：可能中间还有其它同事需要我帮助等啥的，我们简称 D 事情

如果说你现在手上有 10 个文档，当你查阅到第 3 个文档时，发现文档有错误，那你现在该怎么办 ？

### 5.1、第一种情况：同步执行任务



把错误合同提交到老板处，让老板改正后，等老板改好，再拿回来，继续查况后面的合同。老板修改合同上的错误，肯定需要花很多时间，还要找律师啥，显然在老师改合同这个时间里，我们一直等着，后面的合同也不审，那太浪费时间了。

> 这种情况，就是**单线的同步执行任务**

一次只能做一件事，而且每次要等前面的事做完了，再做后面的，否则就一直等着。而自己一直空闲着，但后面还有好多事又做不了。

**JS 单线程同步执行任务**

- JS 是属于单线程的，也就是一次只能做一件事。做了 A 就不能做 B。如果前面的 A 任务会花费大量的时间，就会导致后面的 B 任务停止执行，至到 A 执行完才会执行 B。
- 如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 设备（输入输出设备）很慢（比如 Ajax 操作从网络读取数据，进行大量计算），不得不等着结果出来，再往下执行。

> 显示如果单线执行任务，只能同步执行的话，那是非常麻烦的。

### 5.2、第二种情况：同步与异步结合执行任务



每次把错误的合同提交到老板那里，让老板去改正，自己继续审下面的合同。等老板改好合同后，来通知我去拿合同时，我才会**考虑去取回合同**。

老板通知我拿合同时，如果手上的事没有忙完，则等我忙完了，再去老板那里拿回合同，一起归档，如果忙完了，那就直接去老板哪里取回合同。

如果我忙完了，老板还没有通知我，那我闲着没事也没关系。

> 这种情况，就是**同步与异步混合的方式来执行任务**

从上面这件事来看，第二种情况肯定工作效率会更高，那在我们 JS 执行代码时，他也采用的是第二种机制，同步与异步结合的方式执行代码。

**为了防止主线程的不阻塞，异步方案产生**

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。

> 就好比上面的 A、B、D 是同步任务，C 是异步任务

- **同步任务指的是：** 在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- **异步任务指的是：** 不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

> JS 中代码分为同步代码和异步代码。大部分代码是同步的，只有少许代码是异步的

### 5.3、JS 执行中遇到异步任务如何处理



- JS 代码在执行代码时，也是一样的，首先会将所有同步代码执行完了，再去执行异步的代码。
- 如果在执行过程中碰到了异步的代码，那 JS 就会先把他暂时放到一个**任务队列中**等着，等同步的代码全部执行完了再**执行任务队列中的异步代码**。
- 执行顺序按先插入队列的先拿出来执行。

**JS 代码执行流程（简化版）**

![image-20221103170123369](https://www.arryblog.com/assets/img/image-20221103170123369.e9094f48.png)

### 5.4、setInterval 和 setTimeout 是两个异步语句

> 我们来分析下，下面这段代码的执行结果

```js
console.log(1);
console.log(2);
setTimeout(function () {
    console.log("定时器1000");
}, 1000);
console.log(3);

setTimeout(function () {
    console.log("定时器0");
}, 0);
console.log(4);
......

// 最后执行结果  1，2，3，4 定时器0  定时器1000
```

![image-20221028182135373](https://www.arryblog.com/assets/img/image-20221028182135373.0f66236d.png)



代码从上往下执行时，碰到`setInterval()` 和`setTimeout()` 异步任务时，浏览器会把这个任务放在 `Event Table`，等到定时器计时一到，会把对应**回调函数**加入到`Event Queue`**事件队列**中，等其它的同步代码执行完了，再去执行他们。

> 定时器的计时不是由 JS 主线程来负责的。

这里就会造成定时器并不能完全按预期的延迟时间来执行代码。因为有可能定时器的等待时间是 100ms，而同步代码执行的时间要 200ms，这样就会造成定时器要在 200ms 后才会第一次被执行。

总结



**单线程：** 一个人干了所有活，而且每次只能做一件事，JS 就是单线程的。

**同步**

- 同步就是一件一件事情来，只有等前面的事情做完了，才会做后面的事情，如果前面的事情耗时很长，也要一直等着完成才做后面。
- 同步会阻塞后续代码的执行

**异步**

- 异步是相同同步而言的，如果在做的过程中遇到异步的任务，就把他先放在一边，等同步的事情做完了，再去做异步的任务
- 异步不会阻塞后续代码的执行

> 异步任务一般都是非常耗时的，而且会受到外部影响。

### 5.5、异步的应用场景



- 异步任务都是基于 callback 回调函数的形式来处理的，即需要异步处理的代码放在 callbacak 回调函数中
- 遇到异步任务，就会把对应的 callback 函数，添加到任务队列中，等同步执行完，再到任务队列中取出对应的回调数，开始执行。

**常见的异步任务有**

- 网络请求，如：ajax，图片加载
- 定时任务，如：`setInterval()` 和 `setTimeout()`

**图片加载案例**

- load 事件，表示图片加载成功后要触发的事件
- error 事件，表示图片加载失败后要触发的事件

```js
console.log("同步代码1");
var img = document.createElement("img"); // 同步代码
img.src = "https://www.arryblog.com/logo.png"; // 同步代码
img.onload = function () {
  console.log("图片加载成功");
  document.body.appendChild(img);
}; // 异步回调
img.onerror = function () {
  console.log("图片加载失败");
}; // 异步回调
console.log("同步代码2");
```

注：

ajax 后面还会重点讲，setInterval 和 setTimeout 接下来会重点讲

### 6、定时器实现动画



- 动画的本质，就是在更改 CSS 样式
- 比如，制作一个变色的小球，就是在一定的时间内改变 div 的背景颜色
- 比如，实现一个长方形，从左边移动到右边，本质就是在不停的更改 div 的 left 值（前提 div 是一个定位元素）

> 我们利用定时器，在一定的时间内，更改元素身上的 CSS 属性，就能实现简单的动画效果

### 6.1、案例 1：实现变色小球

> 开一个定时器，间隔一定的时间，就更改下元素的背景颜色

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
  var ball = document.querySelector(".ball");
  var arr = ["red", "yellow", "skyblue"];
  var len = arr.length;
  setInterval(function () {
    var index = (Math.random() * len) >> 0;
    var color = arr[index];
    ball.style.backgroundColor = color;
  }, 500);
</script>
```

### 6.2、案例 2：匀速运动 - 向右



当点击开始按时，希望小球从左边运动到右边的某个位置，然后停下来，在整个过程中小球运动要到达目的地，可以是

- 匀速运动
- 减速运动
- 限定时间（规定多长时间运动到目的）

**我们来先看第一种：匀速运动 - 向右运动**

- 匀速运动，即小球每次移动的距离是一样的，我们把每一次移动距离称为**步长（step）**
- 我们可以开启一个定时器，让小球每次从当前位置向右移动规定的**步长**
- 当小球到达目的时，暂停动画（即关闭定时器）

> 在小球每有到达目地的时，如果一直按开始按扭，会开启很多个定时器，小球的运动速度会越来越快
>
> 所以每次在开启一个新的定时器前，要关闭之前的定时器

![GIF2022-11-1218-16-21](https://www.arryblog.com/assets/img/GIF2022-11-1218-16-21.3c55fdbd.gif)

![image-20221113010343615](https://www.arryblog.com/assets/img/image-20221113010343615.64a9347e.png)

```html
<style>
  #ball {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
  }
</style>
<body>
  <button class="button">开始</button>
  <div id="ball"></div>
  <script>
    // 点击按扭，方块开始运动
    var button = document.querySelector(".button");
    var ball = document.getElementById("ball");
    var step = 7; // 小球每次运动的步长
    var target = 800; // 运动到的目的
    var timer = null; //记录定时器
    button.onclick = function () {
      // 每次开启新定时器前，把之前的定时器关闭
      clearInterval(timer);
      // 定时器隔一定时间，让小球向右移动一定距离
      timer = setInterval(function () {
        // 如果移动距离超过了目标位置，则让他运动到目标位置
        var currentLocation = ball.offsetLeft + step;
        if (currentLocation >= target) {
          currentLocation = target;
          clearInterval(timer);
        }
        ball.style.left = currentLocation + "px";
      }, 50);
    };
  </script>
</body>
```

> 把上面控制小球运动的代码封装成一个函数

```js
/**
 * move 运动函数 指定元素以规定的步长匀速运动到目的
 * @param el 需要运动的元素
 * @param step 每次运动的步长（移动的距离）
 * @param target 运动到的目的点
 * @param delay 定时器每次间隔时长，如果没有传就启用默认值20
 */
function move(el, step, target, delay = 20) {
  clearInterval(el.timer);
  // 定时器隔一定时间，让小球向右移动一定距离
  el.timer = setInterval(function () {
    // 如果移动距离超过了目标位置，则让他运动到目标位置
    var currentLocation = el.offsetLeft + step;
    if (currentLocation >= target) {
      currentLocation = target;
      clearInterval(el.timer);
    }
    el.style.left = currentLocation + "px";
  }, delay);
}
```

注：

以上方法，小球只能向右运动。如果想让小球在水平向左或向右运动，我们需要修改代码

### 6.3、案例 3：匀速水平（向左或向右）



要让小球沿水平（向左或向右）运动，那就要判断小球的位置与目标点的距离

- 如果小球位置 < 目标点位置，则 step 为正数
- 如果小球位置 > 目标点位置，则 step 为负数

> 所以小球运动到目标点停止的条件就变成了

- 当前位置 >= 目标位置 && step 为正数时，停止
- 或 当前位置 <= 目标位置 && step 为负数时，停止

![GIF2022-11-1218-41-16](data:image/gif;base64,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)

![image-20221113011727222](https://www.arryblog.com/assets/img/image-20221113011727222.3faae5ed.png)

```js
// 如果当前位置大于目标位置  step设为负数
if (el.offsetLeft > target) step = -step;

// 小球停止运动条件
if (
  (currentLocation >= target && step > 0) ||
  (currentLocation <= target && step < 0)
) {
  currentLocation = target;
  clearInterval(el.timer);
}
```

**完整代码**

```js
/**
 * move 运动函数 指定元素以规定的步长匀速运动到目的
 * @param el 需要运动的元素
 * @param step 每次运动的步长（移动的距离）
 * @param target 运动到的目的点
 * @param delay 定时器每次间隔时长，如果没有传就启用默认值20
 */
function move(el, step, target, delay = 20) {
  // 判断目标位置与当前元素位置
  if (el.offsetLeft > target) step = -step;
  clearInterval(el.timer);
  // 定时器隔一定时间，让小球向右移动一定距离
  el.timer = setInterval(function () {
    // 如果移动距离超过了目标位置，则让他运动到目标位置
    var currentLocation = el.offsetLeft + step;
    // 小球停止运动的条件
    if (
      (currentLocation >= target && step > 0) ||
      (currentLocation <= target && step < 0)
    ) {
      currentLocation = target;
      clearInterval(el.timer);
    }
    el.style.left = currentLocation + "px";
  }, delay);
}
```

### 6.4、案例 3：减速运动 - 向右



- 所谓减速运动，我们可以理解为，让一个元素从左边运动到右边，其运动的速度越来越小，到最后停止运动。
- 比如小球从左边运动到右边，其**步长**变化类似于： `step = 10`，`step = 9`、`step = 7` ... `step = 1` 最后到达终点，然后停止运动。

> 这里的难点在于，整个过程中速度的变化如何消减，从而还要实现在速度消减到最小的时候小球运动到了目地的。这里有一个简单计算每一次小球运动步长的公式

```js
// n 是一个大于1的数，如果等于1，直接到达目地的，所以n仅可能设置大些
step = (目地的 - 当前位置) / n;
```

![image-20221113014902575](https://www.arryblog.com/assets/img/image-20221113014902575.517a3db1.png)

> 小球从最左边做减速运动运动到 600px 的位置

```html
<style>
  #ball {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
  }
</style>
<button class="button">开始</button>
<div id="ball"></div>
<script>
  // 点击按扭，方块开始运动
  var button = document.querySelector(".button");
  var ball = document.getElementById("ball");
  button.onclick = function () {
    move(ball, 600);
  };

  /**
   * move 实现减速运动
   * @param el 需要运动的元素
   * @param target 运动到的目的点
   * @param delay 定时器每次间隔时长，如果没有传就启用默认值20
   */
  function move(el, target, delay = 20) {
    // 每次开启一个新定时器前，先清除原来的
    clearInterval(el.timer);
    // 开启定时器
    el.timer = setInterval(function () {
      // 计算每次运动的步长  小数向上取正
      var step = Math.ceil((target - el.offsetLeft) / 10);
      // 到达目标位置，停上下（即清除定时器）
      if (el.offsetLeft === target) {
        clearInterval(el.timer);
      }
      // 让小球运动起来
      el.style.left = el.offsetLeft + step + "px";
    }, delay);
  }
</script>
```

注：

以上方法，小球只能向右运动。如果想让小球在水平向左或向右运动，我们需要修改代码

### 6.5、案例 4：减速运动 - 水平（向左或向右）



要让小球沿水平（向左或向右）运动，那就要判断小球的位置与目标点的距离

- 如果小球位置 < 目标点位置，则 step 为正数，向上取整
- 如果小球位置 > 目标点位置，则 step 为负数，向下取整

![image-20221113015120515](https://www.arryblog.com/assets/img/image-20221113015120515.d62be9cf.png)

![image-20221113015231299](https://www.arryblog.com/assets/img/image-20221113015231299.d810b055.png)

```js
/**
 * move 实现减速运动
 * @param el 需要运动的元素
 * @param target 运动到的目的点
 * @param delay 定时器每次间隔时长，如果没有传就启用默认值20
 */
function move(el, target, delay = 20) {
  // 每次开启一个新定时器前，先清除原来的
  clearInterval(el.timer);
  // 开启定时器
  el.timer = setInterval(function () {
    // 计算每次运动的步长
    var step = (target - el.offsetLeft) / 10;
    // 如果step大于0，则向上取正  如果step小于0，则向下取正
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // 到达目标位置，停上下（即清除定时器）
    if (el.offsetLeft === target) {
      clearInterval(el.timer);
    }
    // 让小球运动起来
    el.style.left = el.offsetLeft + step + "px";
  }, delay);
}
```

### 6.6、案例 6：动画函数添加回调函数

> 我们希望动画运动结束后，再执行某些操作，我们就可以通过添加回调函数的形式来实现

```js
button.onclick = function () {
  move(ball, 500, function () {
    move(ball, 0);
  });
  // move(ball, 500, move.bind(null, ball, 0));
};

/**
 * move 实现减速运动
 * @param el 需要运动的元素
 * @param target 运动到的目地的
 * @param callback 回调函数，当运动执行结束后，执行回调函数中代码
 */
function move(el, target, callback) {
  // 每次开启一个新定时器前，先清除原来的
  clearInterval(el.timer);
  // 开启定时器
  el.timer = setInterval(function () {
    // 计算每次运动的步长
    var step = (target - el.offsetLeft) / 10;
    // 如果step大于0，则向上取正  如果step小于0，则向下取正
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (el.offsetLeft === target) {
      clearInterval(el.timer);
      // 判断传过来的是不是一个函数，如果是一个函数就调用
      callback instanceof Function ? callback() : callback;
    }
    // 让小球运动起来
    el.style.left = el.offsetLeft + step + "px";
  }, 20);
}
```

### 6.7、案例 7：多属性减速运动



我们希望小球按我们指定的属性来发生变化，如果同时指定多个属性呢 ？

> 那要如何处理

**难点一：多个属性如何指定，传值问题**。

> 我们把 target 目标参数改成一个对象，用对象的形式来指定变化的属性值，如下：

```js
target = { left: 200, top: 300, width: 300, height: 400 };
```

**难点二：如何控制每个属性的变化**



- 可以利用 `for..in` 循环遍历出 target 中的每个属性名和对应的属性值
- 然后利用 `getComputedStyle()` 方法，获取元素当前对应属性值，与目标值对比，来控制属性变化

```js
// for ...in 遍历target，获取对应属性名和属性值
for(var key in target){ ....}

// 获取元素对应属性值
function getStyle(el, attr) {
    return getComputedStyle(el, null)[attr];
}
```

**难点三：何时暂停定时器**



- 多个属性发生变化，只有当所有属性变化值都达到目标时，才会能暂停定时器。
- 判断方法：我们设置一个 flag 属性用来记录是否所有属性都达到了目标值，只要有一个没有达到`flag = false`,只有所有值都达到目标值时，`flag = true`

```js
if (flag) {
  // 清除定时器
}
/**
 * move 实现多属性减速运动动画效果
 * @param el 需要运动的元素
 * @param target 运动到的目地的,是一个对象 传入方式 target = { left: "200px", top: "300px", width: "300px", height: "400px" };
 * @param callback 回调函数，当运动执行结束后，执行回调函数中代码
 */

function move(el, target = {}, callback) {
  // 清除定时器
  clearInterval(el.timer);
  el.timer = setInterval(function () {
    // 假设当前所有属性值达到目标值
    var flag = true;
    // 遍历出target目标中的每个属性和对应属性值
    for (var key in target) {
      var attrValue = getStyle(el, key); // 元素对应属性值
      // 计算每一次变化的步长
      var step = (target[key] - attrValue) / 10;
      // 如果step大于0，向上取整，如果小于0，向下取整
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      // 设置元素属性变化
      el.style[key] = attrValue + step + "px";
      // 如果当前元素身上的值没有等于目标值，则flag=false
      if (target[key] !== attrValue) {
        flag = false;
      }
    }
    // 以下判断要放在for..in循环的外面
    // 如果所有属性达到目标值，则停止动画
    if (flag) {
      clearInterval(el.timer);
      callback instanceof Function ? callback() : callback;
    }
  }, 20);
}

// 获取当前元素的css样式
function getStyle(el, attr) {
  return parseInt(getComputedStyle(el, null)[attr]) || 0;
}
```

把 opacity 透明度属性融入进去

我们把 `透明度的属性值 * 100` 再处理，然后保存结果时，再除以 100

> 如果用户传过来的对应属性 left，top，width，height，opacity 值，带有小数，我们在比较时用整数来比较。

```js
/**
 * move 多属性运动动画
 * el 运动的元素
 * target 多个属性的目标值 target={width:'300px',height:'400px'}
 * callback 回调函数  动画结束后执行
 * delay 定时器的执行间隔时间
 */
function move(el, target = {}, callback, delay = 20) {
  // 开定时器之前，要清定时器
  clearInterval(el.timer);
  el.timer = setInterval(function () {
    var flag = true; //假设所有的属性都到达目标值
    // 多属性动画
    // 通过for...in遍历 target对象，取得每个key和(value)
    // 通过key得到当前改变的属性，及属性的当前值
    // 通过value得到当前改变的属性的目标值
    for (var key in target) {
      // 要对传过来的key做一个判断，判断是不是一个opacity
      var attrValue = getComputedStyle(el)[key]; // 当前值   1
      if (key.toLowerCase() === "opacity") {
        // 将值 1 或 0.4等 转换成 100或 40
        attrValue = attrValue * 100;
      } else {
        attrValue = parseInt(attrValue); // 当前值   1
      }

      var targetValue = parseInt(target[key]); // 目标值   30

      // 计算运动的步长step(速度 speed)
      var step = (targetValue - attrValue) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);

      var currentDistance = attrValue + step;
      // 只要有一个属性没有到达目标值，那就把flag设置为false
      if (currentDistance !== targetValue) {
        flag = false;
      }
      // 赋值
      if (key.toLowerCase() === "opacity") {
        el.style[key] = currentDistance / 100;
      } else {
        el.style[key] = currentDistance + "px";
      }
    }

    // 清定时器,只有flage=true时
    if (flag) {
      clearInterval(el.timer);
      // 执行回调
      callback instanceof Function ? callback() : callback;
    }
  }, delay);
}
```

注：

以上情况，传入的 opacity 只能是 1 到 100 之间的整数

### 6.8、案例 8：限定时间动画



- 限定步长的动画，是没有办法精准的把控好时间的，其运动的距离也长，耗时越长
- 如果我们要限定时间，在规定的时间内完成动画，那需要如何实现呢 ？

![image-20221113020442421](https://www.arryblog.com/assets/img/image-20221113020442421.688f5c26.png)

**限定时间的匀速运动公式**

- T：time 已经运动的时间
- B：begin 开始位置
- C：change 需要移动的总距离 = Target - Begin
- D：duration 动画运动的总时间

`CurrentDistance = T / D * C + B` 即 `当前位置 = T / D * C + B` 每次运动后，元素的当前位置

```js
/**
 * move 实现限定时间匀速运动
 * @param el 需要运动的元素
 * @param target 目标位置
 * @param duration 运动所消耗的总时长
 * @param callback 回调函数，当运动执行结束后，执行回调函数中代码
 */
function move(el, target, duration = 1000, callback) {
  // 清除定时器
  clearInterval(el.timer);
  var time = 0; // 用来记录当前运动的耗时
  var begin = el.offsetLeft; // 开始位置
  var change = target - begin; // 移动的总距离
  var currentDistance; // 用来记录当前元素所在位置
  el.timer = setInterval(function () {
    time += 20;
    var currentDistance = (time / duration) * change + begin;
    // 如果时间超过总时间，则将最终位置设定为目标位置
    if (time >= duration) {
      currentDistance = target;
      clearInterval(el.timer);
    }
    el.style.left = currentDistance + "px";
    if (time >= duration) {
      callback instanceof Function ? callback() : callback;
    }
  }, 20);
}
```

### 6.9、案例 9：多属性限定时间动画

![GIF2022-11-150-58-34](https://www.arryblog.com/assets/img/GIF2022-11-150-58-34.f0de497d.gif)

**关注以下几大核心问题：**

- 多属性运动，target 保存数据的结构定义成如下，用户按这个格式来传数据

```js
var target = [
  {
    width: "200px",
    duration: "2s",
  },
  {
    left: "600px",
    duration: "5s",
  },
  {
    top: "200px",
    duration: "1s",
  },
];
```

- 对上面结构的数据做转换，转成适合编程的如下结构数据

```js
/**
 * attr 运动的属性
 * target 运动的目标值
 * D ：duration 动画（某个属性）运动的总时间
 * B ：Begin 动画（当前属性）的开始位置
 * C : Change 需要改变的总距离  target -B
 */
var target = [
  { attr: "width", D: 2000, target: 200, B: 100, C: 100 },
  { attr: "left", D: 5000, target: 600, B: 10, C: 590 },
  { attr: "top", D: 1000, target: 200, B: 10, C: 190 },
];
```

- 数据结构转换函数

```js
var attrArr = ["width", "left", "top", "height"];
function convertDataStruct(el, target) {
  var result = [];
  for (var i = 0; i < target.length; i++) {
    var obj = {};
    for (var key in target[i]) {
      var index = attrArr.indexOf(key);
      if (index !== -1) {
        obj.attr = key;
        obj.target = parseInt(target[i][key]);
        obj.B = parseInt(getComputedStyle(el)[key]);
        obj.C = obj.target - obj.B;
      } else {
        obj.D = Math.abs(parseFloat(target[i][key]) * 1000);
      }
    }
    result.push(obj);
  }
  return result;
}
```

- 获取多个属性中，运动时间最长的那个时间。
- 只有当记录的时间大于等于多个属性中运动时间最长的那个，才能清除定时器
- 要考虑，用户可能没有传 duration 参数

```js
/**
 * 获取数组中动画运动时间最长的时间，同时将时间转换成 ms  返回结果类似  5000
 * @param target 运动属性数组
 */
function getMaxTime(target) {
  var max = target[0].duration && parseFloat(target[0].duration) * 1000;
  max = max ? Math.abs(max) : 0; // 如果没有设置duration,则时间为0
  target.forEach(function (value) {
    var time = value.duration && parseFloat(value.duration) * 1000;
    time = time ? Math.abs(time) : 0;
    if (max < time) max = time;
  });
  return max;
}
var duration = getMaxTime(target);
```

- 开启定时器，利用 for 循环，改变每个属性的的值
- 如果用户参数中没有传 duration，则把运动时间默认设为 200ms
- 如果 MaxTime 没有，或为 0，则把运动最大时间默认设为 200ms

```js
function move(el, target, callback) {
  clearInterval(el.timer); // 清除定时器

  var T = 0; // 记录动画已经运动的时间
  var MaxTime = getMaxTime(target) || 200; // 获取目标属性中运动时间最长的那个时间
  var target = convertDataStruct(el, target);

  // 开定时器
  el.timer = setInterval(function () {
    T += 20;
    // 遍历目标数组
    for (var i = 0; i < target.length; i++) {
      var D = target[i].D || 200;
      var B = target[i].B;
      var C = target[i].C;
      var currentDistance = (T / D) * C + B;
      el.style[target[i].attr] = currentDistance + "px";
    }
  }, 20);
}
```

- 如何保证累计时间大于属性运动时间，元素属性值为目标值
- 如果累计时间 > 属性运动时间，则属性值 = 目标值，但不清定时器

```js
// 记录的时间大于或等于了当前属性的时间，那就要强制设置他的当前值为目标值
if (T >= D) {
  currentDistance = target[i].target;
}
```

- 何时清除定时器
- 累计时间 > 多个属性中最大运动时间时，清定时器
- 清定时器，表示动画结束，可以执行回调

```js
// 当累计的时间超过的了最大的运动时间，就清定时器
if (T > MaxTime) {
  clearInterval(el.timer);
  // 动画执行完，执行回调函数
  callback instanceof Function ? callback() : callback;
}
```

**完整源码**

```js
(function () {
  window.move = move;

  /**
   * 多属性 限定时间动画
   * el 运动的元素
   * target 表示运动的目标点
   * callback回调函数，动画执行完要做的事情
   * duration 动画运动的总时间
   */

  function move(el, target, callback) {
    clearInterval(el.timer); // 清除定时器

    var T = 0; // 记录动画已经运动的时间
    var MaxTime = getMaxTime(target) || 200; // 获取目标属性中运动时间最长的那个时间
    var target = convertDataStruct(el, target);

    // 开定时器
    el.timer = setInterval(function () {
      T += 20;
      // 遍历目标数组
      for (var i = 0; i < target.length; i++) {
        var D = target[i].D || 200;
        var B = target[i].B;
        var C = target[i].C;

        var currentDistance = (T / D) * C + B;

        // 记录时间大于属性运动时间，强制把属性的值设为目标值
        if (T >= D) {
          currentDistance = target[i].target;
        }
        el.style[target[i].attr] = currentDistance + "px";
      } // for结束位置

      // 当累计的时间超过的了最大的运动时间，就清定时器
      if (T > MaxTime) {
        clearInterval(el.timer);
        // 动画执行完，执行回调函数
        callback instanceof Function ? callback() : callback;
      }
    }, 20);
  }

  function getMaxTime(target) {
    var max = target[0].duration && parseFloat(target[0].duration) * 1000;
    max = max ? Math.abs(max) : 0;
    target.forEach(function (value) {
      var time = value.duration && parseFloat(value.duration) * 1000;
      time = time ? Math.abs(time) : 0;
      if (max < time) max = time;
    });
    return max;
  }

  // 将以下数据结构转换为
  /*
        var target = [
        {
          width: "200px",
          duration: "2s",
        },
        {
          left: "600px",
          duration: "5s",
        },
        {
          top: "200px",
          // duration: "1s",
        },
      ];
      */

  /* 将上面数组结构，转换为下面这种数据结构
      var target = [
        { attr: "width", D: 2000, target: 200, B: 100, C: 100 },
        { attr: "left", D: 5000, target: 600, B: 10, C: 590 },
        { attr: "top", D: 1000, target: 200, B: 10, C: 190 },
     ];
     */

  /**
   * convertDataStruct 转换数据结构
   * el 运动的元素
   * target 多属性运动数组
   */
  var attrArr = ["width", "left", "top", "height"];
  function convertDataStruct(el, target) {
    var result = [];
    for (var i = 0; i < target.length; i++) {
      var obj = {};
      for (var key in target[i]) {
        var index = attrArr.indexOf(key);
        if (index !== -1) {
          obj.attr = key;
          obj.target = parseInt(target[i][key]);
          obj.B = parseInt(getComputedStyle(el)[key]);
          obj.C = obj.target - obj.B;
        } else {
          obj.D = Math.abs(parseFloat(target[i][key]) * 1000);
        }
      }
      result.push(obj);
    }
    return result;
  }
})();
```

**常见的动画运动公式**：

```js
// 运动方式
var Tween = {
  // 匀速运动公式
  Linear: function (t, b, c, d) {
    return (t / d) * c + b;
  },
  // 指数衰减的反弹缓动
  Bounce: {
    easeIn: function (t, b, c, d) {
      return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function (t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    easeInOut: function (t, b, c, d) {
      if (t < d / 2) {
        return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
      }
      return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
  },
  // 二次方的缓动
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
      }
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
  },
  // 三次方的缓动
  Cubic: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t + b;
      }
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
  },
  // 四次方的缓动
  Quart: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t * t + b;
      }
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
  },
  // 五次方的缓动
  Quint: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (c / 2) * t * t * t * t * t + b;
      }
      return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
  },
  // 正弦曲线的缓动
  Sine: {
    easeIn: function (t, b, c, d) {
      return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    easeInOut: function (t, b, c, d) {
      return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
  },
  // 指数曲线的缓动
  Expo: {
    easeIn: function (t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function (t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    easeInOut: function (t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  },
  // 圆形曲线的缓动
  Circ: {
    easeIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
  },
};
```

### 7、带左右按扭的自动切换轮播效果

![GIF 2022-10-23 16-49-42](https://www.arryblog.com/assets/img/GIF-2022-10-23-16-49-42.9988a284.gif)

**布局代码**

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
    width: 990px;
    height: 460px;
    margin: 50px;
    position: relative;
    overflow: hidden;
  }
  .container .wrap {
    height: 460px;
    width: 10000px;
    position: absolute;
    left: 0;
    top: 0;
    left: 0;
  }
  .container .wrap li {
    width: 990px;
    height: 460px;
    float: left;
  }

  .container .buttons {
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: 20px;
    font-size: 0;
    text-align: center;
  }
  .container .buttons span {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    margin: 0px 5px;
    border-radius: 50%;
    cursor: pointer;
  }
  .container .buttons span.active {
    background-color: orange;
  }
  .prev,
  .next {
    width: 41px;
    height: 69px;
    background-color: red;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: url(./images/icon-slides.png);
    cursor: pointer;
  }
  .prev {
    background-position: -83px;
  }
  .next {
    right: 0;
    background-position: -125px;
  }
  .prev:hover {
    background-position: 0px;
  }
  .next:hover {
    background-position: -42px;
  }
</style>
<div class="container">
  <!-- 滚动内容区 -->
  <ul class="wrap">
    <li><img src="./images/1.jpg" alt="" /></li>
    <li><img src="./images/2.jpg" alt="" /></li>
    <li><img src="./images/3.jpg" alt="" /></li>
    <li><img src="./images/4.jpg" alt="" /></li>
  </ul>

  <!-- 分页器 -->
  <div class="buttons">
    <span class="active"></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <!-- 左右按扭 -->
  <div class="prev"></div>
  <div class="next"></div>
</div>
```

JS 代码，引用了`move.js` （前面封装的多属性限时动画）

```html
<script src="./js/move.js"></script>

<script>
  // 先获取需要的元素
  var wrap = document.querySelector(".wrap");
  var list = document.querySelectorAll(".wrap li"); // 获取li列表
  var spans = document.querySelectorAll(".buttons span");
  var button = document.querySelector(".buttons");
  var prev = document.querySelector(".prev");
  var next = document.querySelector(".next");
  // 克隆第一个li，作ul了最后一个子元素
  var len = spans.length;
  wrap.appendChild(list[0].cloneNode(true));
  var liWidth = list[0].offsetWidth; // 获取li的宽度
  var currentIndex = 0; // 默认当前切换到的下标是0
  var currentSpan = spans[0];
  var timer = null; // 用来记录定时器的变量
  var flag = false; // 表示当前没有元素在切换

  // 首先要实现的是自动轮播
  autoPlay();
  function autoPlay() {
    clearInterval(timer); // 开之前，先清
    timer = setInterval(function () {
      currentIndex++; // 4
      toNext();
    }, 3000);
  }

  // 当手指放在按扭上时，要停止自动轮播，离开后，再自动轮播
  for (var i = 0; i < len; i++) {
    spans[i].index = i;
    spans[i].onmouseover = function () {
      // 暂停自动轮播， 清定时器
      clearInterval(timer);
    };
    spans[i].onmouseout = function () {
      autoPlay(); // 自动播放
    };
  }

  // 事件代理,所有span按扭点击后，需要处理的事情，全交给他们的父亲 buttons来处理
  button.onclick = function (e) {
    var target = e.target; // 整正触发事件的对象
    var tagName = target.tagName.toLowerCase();
    if (tagName !== "span") return;

    if (flag) return;
    flag = true;
    // 点击对应li的下标
    currentIndex = target.index;
    currentSpan.classList.remove("active"); // 移除原来
    spans[currentIndex].classList.add("active"); //当前的span新加样式
    currentSpan = spans[currentIndex];
    var currentDistance = currentIndex * liWidth;
    // 切换到对应的那一张图片
    move(wrap, [{ left: -currentDistance + "px" }], function () {
      flag = false;
    });
  };

  // 处理向上按扭
  prev.onmouseover = function () {
    // 移到元素上，暂停自动轮播
    clearInterval(timer);
  };
  prev.onmouseout = function () {
    // 从元素上移开，开始自动轮播
    autoPlay();
  };

  prev.onclick = function () {
    if (flag) return; // flag=true 表示当前有动画在执行
    flag = true;
    // 点击向上按扭处理的事情
    currentIndex--;
    toPrev();
  };

  // 处理向下按扭
  next.onmouseover = function () {
    // 移上动，暂停自动轮播
    clearInterval(timer);
  };
  next.onmouseout = function () {
    // 移开，开始自动轮播
    autoPlay();
  };
  next.onclick = function () {
    if (flag) return;
    flag = true;
    currentIndex++;
    toNext();
  };

  // 切换到上一张
  function toPrev() {
    if (currentIndex < 0) {
      // 先把当前wrap的left的值，拉回到最后一个li的位置
      wrap.style.left = -liWidth * len + "px";
      currentIndex = len - 1; // 3
    }
    currentSpan.classList.remove("active");
    currentSpan = spans[currentIndex];
    currentSpan.classList.add("active");

    var currentDistance = -liWidth * currentIndex; // 3 * -990
    move(wrap, [{ left: currentDistance + "px" }], function () {
      flag = false; // 当前动画执行完，flag=false表示没有动画在执行
    });
  }

  // 切换到下一张
  function toNext() {
    if (currentIndex >= len) {
      currentSpan.classList.remove("active");
      spans[0].classList.add("active");
      currentSpan = spans[0]; // 要更新当前被选中的span
    } else {
      // 改变span的样式
      currentSpan.classList.remove("active");
      spans[currentIndex].classList.add("active");
      currentSpan = spans[currentIndex];
    }

    var targetDistance = -currentIndex * 990; // 需要移动到的目标位置
    move(wrap, [{ left: targetDistance + "px" }], function () {
      flag = false;
      if (currentIndex >= len) {
        wrap.style.left = "0px"; // 最后一个动画执行完成之后，拉回 0
        currentIndex = 0; // 当前的currentIndex改成0
      }
    });
  }
</script>
```

## 二、定时器延迟执行与丢帧问题



要了解定时器为什么会延迟执行和存在丢帧问题，就需要先了解下面 3 个问题

- 屏幕刷新频率
- 动画实现原理
- setInterval 实现动画原理
- setTimeout 实现动画原理
- 动画动画卡顿、抖动现象
- 总结：定时器执行动画卡顿、抖动原理

### 1、屏幕刷新频率



屏幕刷新频率即图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹（Hz）。

对于一般笔记本电脑，这个频率大概是 60Hz， 可以在桌面上 **`右键 —显示设置 — 高级显示设置 — 刷新频率`** 中查看和设置

> 这个值的设定受屏幕分辨率、屏幕尺寸和显卡的影响，原则上设置成让眼睛看着舒适的值都行。

![image-20221027225313544](data:image/png;base64,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)

常见的显示器有两种

即 CRT 和 LCD， CRT 就是传统显示器，LCD 就是我们常说的液晶显示器。

CRT 是一种使用阴极射线管的显示器，屏幕上的图形图像是由一个个因电子束击打而发光的荧光点组成，由于显像管内荧光粉受到电子束击打后发光的时间很短，所以电子束必须不断击打荧光粉使其持续发光，电子束每秒击打荧光粉的次数就是屏幕刷新频率。

而对于 LCD 来说，则不存在刷新频率的问题，它根本就不需要刷新，因为 LCD 中每个像素都在持续不断地发光，直到不发光的电压改变并被送到控制器中，所以 LCD 不会有电子束击打荧光粉而引起的闪烁现象。

> 因此，当你对着电脑屏幕什么也不做的情况下，显示器也会以每秒 60 次的频率正在不断的更新屏幕上的图像。为什么你感觉不到这个变化？

那是因为人的眼睛有视觉停留效应，即前一副画面留在大脑的印象还没消失，紧接着后一副画面就跟上来了，这中间只间隔了 `16.7ms(1000/60 ≈ 16.7)`。

所以会让你误以为屏幕上的图像是静止不动的，而屏幕给你的这种感觉是对的，试想一下，如果刷新频率变成 1 次/秒，屏幕上的图像就会出现严重的闪烁，这样就很容易引起眼睛疲劳、酸痛和头晕目眩等症状。

### 2、动画实现原理



根据上面的原理我们知道，你眼前所看到图像正在以每秒 60 次的频率刷新，由于刷新频率很高，因此你感觉不到它在刷新，而**动画本质就是要让人眼看到图像被刷新而引起变化的视觉效果**，这个变化要以连贯的、平滑的方式进行过渡。

> 那怎么样才能做到这种效果呢 ?

刷新频率为 60Hz 的屏幕每 16.7ms 刷新一次，我们在屏幕每次刷新前，将图像的位置向左移动一个像素，即 1px，这样一来，屏幕每次刷出来的图像位置都比前一个要差 1px，因此你会看到图像在移动，由于我们人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置。

> 因此你才会看到图像在流畅的移动，这就是视觉效果上形成的动画。

### 3、setInterval 实现动画原理



setInterval 其实就是通过设置一个间隔时间来不断的改变图像的位置等属性，从而达到动画效果的。

```js
setInterval(f, 20); // 每隔10ms 执行下回调函数 f
```

**setInterval 执行会出现延迟问题**

- setInterval 的执行时间并不是确定的。在 Javascript 中， setInterval 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此， **setInterval 的实际执行时间一般要比其设定的时间晚一些**。
- setInterval 的第二个参数的延时只能保证何时会把回调函数添加到任务队列，不能保证添加到任务队就会立即执行。能不能执行要看主线程是否空闲，同时前面是否还有任务在等待

### 4、setTimeout 实现动画原理



setTimeout 是通间隔一定时间执行动画回调函数，在回调函数执行完成后，再重新开一个 setTimeout 定时器执行下一次回调，重复上面过程。

```js
function f() {
  /* 要执行的动画代码 */
  // ....
  setTimeout(f, 20);
}
setTimeout(f, 20);
```

注：

- setTimeout 每次是在上一个动画执行完成后，再间隔相同时间，把定时器加入到任务队列等待执行。和 setInterval 一样都会存在延时问题。
- 浏览器的计时也会存在不精准的问题，具体内容可参考[官方教程(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)

### 5、动画动画卡顿、抖动现象



- 因为 setInterval 和 setTimeout 会出现执行时间延时问题，再加上刷新频率受屏幕分辨率和屏幕尺寸的影响
- 因此不同设备的屏幕刷新频率可能会不同，而 setInterval 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

> 以上两种情况都会导致**动画的执行步调和屏幕的刷新步调不一致**，从而引起**丢帧**现象，造成动画**卡顿、抖动**。

**那为什么步调不一致就会引起丢帧呢**？

- 首先要明白，setInterval 和 setTimeout 的执行只是在内存中对图像属性进行改变，这个变化必须要等到屏幕下次刷新时才会被更新到屏幕上。
- 如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的图像

**案例分析**



假设屏幕每隔 16.7ms 刷新一次，而 setInterval 每隔 10ms 设置图像向左移动 1px， 就会出现如下

**绘制过程**

- 1、第`0ms`屏幕未刷新，等待中，setInterval 也未执行，等待中；
- 2、第`10ms`屏幕未刷新，等待中，setInterval 开始执行并设置图像属性 `left = 1px;`
- 3、**第`16.7ms`屏幕开始刷新，屏幕上的图像向左移动了 1px， setInterval 未执行，继续等待中；**
- 4、第`20ms` 屏幕未刷新，等待中，setInterval 开始执行并设置图像属性 `left = 2px;`
- 5、 第`30ms`屏幕未刷新，等待中，setInterval 开始执行并设置图像属性 `left = 3px;`
- 6、**第`33.4ms`屏幕开始刷新，屏幕上的图像向左移动了 3px， setInterval 未执行，继续等待中；**

注：

- 从上面的绘制过程中可以看出，屏幕没有更新`left = 2px`的那一帧画面
- 图像直接从`1px`的位置跳到了`3px`的的位置
- 这就是丢帧现象，这种现象就会引起动画卡顿

### 6、总结：定时器执行动画卡顿、抖动原理



- 定时器的执行时间并不是一定会按预期时间执行，所以会造成动画延迟执行。
- 定时器的执行频率和屏幕的刷新频率不一样，会造成丢帧现象，引起动画卡顿。
- 当然还有各个浏览器的计时器精度也程很大差异，不能精确到 1 毫秒内

> 比如：

- Chrome 的计时器精度为 4 毫秒
- Firefox 和 Safari 计时器精度约为 10 毫秒
- .....

> 为了解决上面定时器存在的问题，出现了一个新的方法 requestAnimationFrame。接下来我们就来学习下这个方法 ！

## 三、requestAnimationFrame



我们都知道浏览器是知道 CSS3 的 transition 和 animation 动画什么时候开始，并据此计算出正确的时间间隔，到时间就去刷新用户界面。

但是对于 JS 动画，浏览器并不知道动画什么时候开始，如果我们能让浏览器知道动画什么时候开始，然后开始刷新屏幕。

> 这样不就出现丢帧问题了吗？

**requestAnimationFrame 方法就可以解决这个问题**

- requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机
- 具体一点讲，如果屏幕刷新率是`60Hz`，那么回调函数就每`16.7ms`被执行一次
- 如果刷新率是`75Hz`，那么这个时间间隔就变成了`1000/75 = 13.3ms`
- 换句话说就是，requestAnimationFrame 的步伐跟着系统的刷新步伐走
- 它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

### 1、requestAnimationFrame 用法



- `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次**重绘**之前调用指定的回调函数更新动画。
- 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次**重绘**之前执行

```js
var timer = window.requestAnimationFrame(callback);
// callback 下一次重绘之前更新动画帧所调用的函数
// timer 一个整数，表示请求ID 是回调列表中唯一的标识
```

> requestAnimationFrame 方法只会执行一次

```js
requestAnimationFrame(fn);
function fn() {
  console.log(this); // window
  console.log("只执行一次");
}
```

### 2、requestAnimationFrame 实现动画原理

```js
window.requestAnimationFrame(f);
function f() {
  /* 动画执行代码 */
  if (条件为真) {
    window.requestAnimationFrame(f);
  }
}
```

### 3、cancelAnimationFrame



`cancelAnimationFrame`方法用来取消`requestAnimationFrame`方法添加的的任务。

```js
cancelAnimationFrame(requestId);
// requestId 为 requestAnimationFrame 方法的返回值
var requestId = requestAnimationFrame(fn); // 第一次执行
cancelAnimationFrame(requestId);
function fn() {
  console.log("我不会出来");
}
```

### 4、requestAnimationFrame 注意事项



为了提高性能和电池寿命，因此在大多数浏览器里，当`requestAnimationFrame()` 运行在**后台标签页**或者隐藏的`<iframe>`里时，`requestAnimationFrame()` 会被暂停调用以提升性能和电池寿命。

```js
var i = 0;
var d = new Date().getTime(); // 当前时间
var timer = window.requestAnimationFrame(fn);
function fn() {
  i++;
  var d2 = new Date().getTime(); // 记录调用函数时间
  if (d2 - d <= 1000) {
    // 如果两者是间差小于1s,一直执行，否则打印i
    window.requestAnimationFrame(fn);
  } else {
    console.log(i); // 记录fn调用的次数
  }
}
```

### 5、requestAnimationFrame 方法实现动画

![GIF 2022-10-27 23-51-22](https://www.arryblog.com/assets/img/GIF-2022-10-27-23-51-22.85b99d9f.gif)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 0;
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector(".box");
  requestAnimationFrame(fn); // 第一次执行
  function fn() {
    var left = box.offsetLeft + 3;
    if (left > 600) left = 600;
    box.style.left = left + "px";
    if (left < 600) {
      requestAnimationFrame(fn); // 没有有达到目标，再次执行
    }
  }
</script>
```

### 6、优雅降级 - 处理兼容问题



目前所有浏览器都支持`requestAnimationFrame`这个不带前缀的方法，但考虑有些浏览器的旧版本，还需要添加前缀，所以需要处理下兼容问题。

```js
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
```

## 四、函数节流（经典面试题）



接下来我们学习一个重要的知识，关于函数的节流问题。如何封装节流函数是我们必需要掌握的技能，也是面试必问的。

**什么是函数节流：**

不管事件触发有多频繁，都会保证在规定时间内执行一次真正的事件处理函数

**函数节流原理：**

通过判断是否到达一定时间，如果 `时间 >= 规定时间周期`，才会触发函数

**函数节流优点：**

降低函数执行的频率，从而达到节省计算资源，减少性能消耗

节流函数的应用场景：

- 当一个事件触发的时间特别短频繁时，就会频繁的触发事件处理函数，我们需要通过节流函数来限止执行的频率。
- 比如：`mousemove`、`mousedown`、`keydown`、`scroll`等事件，他们的触发时间特别短。我们可以通过节流函数来限止，在一定时间内只能执行一次。

> 接下来我们以 mousemove 事件来作为切入点，学习下如何对函数节流，以及如何封装节流函数

### 1、未节流前，mousemove 事件处理函数的执行次数

```js
var i = 0;
document.onmousemove = fn;
function fn() {
  console.log(i++);
}
```

![image-20221119153952786](https://www.arryblog.com/assets/img/image-20221119153952786.aeb404e0.png)

### 2、对 mousemove 事件处理函数执行节流操作后，其执行次数



- 接下来我们对 mousemove 事件处理函数执行节流操作，限止其在`50ms`内只能执行一次
- 即 mousemove 事件频敏触发，那事件处理函数也只会每间隔`50ms`才会执行一次

**节流实现原理**

- 我们也可以定义一个变量 lock 与定时器配合，变量 lock 相当于一把锁，定时器用来计录时间。
- 刚开始变量`lock = false`，表示锁是打开的，可以执行事件处理函数中代码，在执行时立即设置`lock = true`
- `lock = true`，相当于当前锁是关上的，不管 mousemove 事件触发多少次，都不会做任何操作
- 等到定时器时间一到，在定时器中设置`lock = false`，相当把锁打开，下一次 mousemove 事件触发，则又恢复正常。
- 重复上面过程，就可以达到节流效果，相当于事件处理函数在`50ms`内只会执行一次

```js
var i = 0;
var lock = false; // false表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码
document.onmousemove = fn;
function fn() {
  if (lock) return;
  lock = true;
  // 那什么时候开锁内，规定在50ms后，再开锁
  var timer = setTimeout(function () {
    lock = false; //开锁
  }, 50);
  console.log(i++);
}
```

![image-20221119155731602](https://www.arryblog.com/assets/img/image-20221119155731602.1631a8b6.png)

对以上代码做相关优化

- 我们把上面的 lock 变量消除掉，直接用 timer 变量来代替。
- 代码中，两处`lock = false`的地方，用`timer = null` ; 替换, 表示当前锁是开的, 可以执行事件处理函数
- 把`if(lock)`换成 `if(timer)` ，如果 timer 有值，表示当前锁是关着的，不能再次执行事件处理函数
- 去掉用来保存定时器返回值 timer 变量前面的 var，因为 timer 在上面改成全局中声明

```js
var i = 0;
//   var lock = false;
var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码
document.onmousemove = fn;
function fn() {
  if (timer) return;
  // lock = true;
  // 那什么时候开锁内，规定在50ms后，再开锁
  timer = setTimeout(function () {
    // lock = false;
    timer = null; // 开锁
  }, 50);
  console.log(i++);
}
```

### 3、抽离节流相关代码，封装成节流函数



- 上一步中的 `console.log(i++)` 代码，是事件触发时真正要执行的代码，我们把抽离出来封装在函数`eventFn`中，在没有节流函数前，**eventFn 为真正的事件处理函数**。
- 以上代码的 fn 函数是用来处理节流的函数，也就是我们真正需要封装的节流函数，我们把 fn 改名为`throttle`，throttle 为节流的意思

```js
var i = 0;
var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码
document.onmousemove = throttle;

// 节流函数
function throttle() {
  if (timer) return;
  // 那什么时候开锁内，规定在50ms后，再开锁
  timer = setTimeout(function () {
    timer = null; // 开锁
  }, 50);

  eventFn(); // 事件处理函数
}

function eventFn() {
  console.log(i++);
}
```

> 以上 throttle 节流函数显然还有很多不足，需要我们来进一步优化

下一步优化点

- timer 这个变量不能放在全局作用域下,要改写到`throttle`函数内部才算是完美的。
- 定时器的时间不能固定，可以改写成参数，让用户自己来决定
- 事件处理函数也不能固定死，可以改写成参数，让用户自己来决定

```js
var i = 0;
document.onmousemove = throttle(eventFn, 30);

// 节流函数
function throttle(fn, delay = 20) {
  var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

  return function () {
    if (timer) return;
    // 那什么时候开锁内，规定在50ms后，再开锁
    timer = setTimeout(function () {
      timer = null; // 开锁
    }, delay);

    fn(); // 事件处理函数
  };
}

function eventFn() {
  console.log(i++);
}
```

再进一步优化，事件处理函数中的 this 和事件对象 e

- 以上事件处理函数 fn 中的 this 和 事件对象 e 是有问题的
- `fn()`直接调用，内部 this 肯定指向的是 window，同时事件对象 e 被丢失了

还有一个问题，就是`fn()`事件处理函数的位置问题，他是写在定时器前面，还是后面，还是定时器里面呢？

- 如果 `fn()` 写在定时器后面，相对来说没有什么问题，只是定时器会先计时，再执行`fn()`
- 如果`fn()`写在定时器前面，那会先执行事件处理函数，再定时器计时，那最终每次间隔时间比预期的长些，如果`fn()`执行时间较长，会达不到节流效果。
- 如果`fn()`写在定时器里面，那要等到计时器到达时间后才开始执行`fn()`，这样就会造成第一次`fn()`函数要在计时器到达到才执行。（针对高频事件，delay 的时间特别小，这个影响可以忽略不计，但如果 delay 的时间特别长，那这个影响就很明显了，后面用案例演示）
- 而我们所说的节流操作主要针对的就是高频时间，即 delay 的时间特别小，所以面试中，各大网站上流行的面试题答案都是基于这个版本的。

```js
var i = 0;
document.onmousemove = throttle(eventFn, 30);

// 节流函数
function throttle(fn, delay = 20) {
  var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

  return function () {
    if (timer) return;
    var self = this; // 保存this 绑定事件的对象
    var args = arguments; // 保存arguments 主要用来获取事件对象 e
    // 定时器计时，用来开锁
    timer = setTimeout(function () {
      fn.apply(self, args); // 事件处理函数
      timer = null; // 开锁
    }, delay);
  };
}

function eventFn(e) {
  console.log(this, e);
  console.log(i++);
}
```

### 4、ES5 版本 - 节流函数

```js
/**
 * throttle 节流函数
 * fn 事件处理函数
 * delay 执行事件处理函数的间隔时间
 */
function throttle(fn, delay = 20) {
  var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

  return function () {
    if (timer) return;
    var self = this; // 保存this 绑定事件的对象
    var args = arguments; // 保存arguments 主要用来获取事件对象 e
    // 定时器计时，用来开锁
    timer = setTimeout(function () {
      fn.apply(self, args); // 事件处理函数
      timer = null; // 开锁
    }, delay);
  };
}
```

### 5、ES6 版本 - 节流函数

```js
/**
 * throttle 节流函数
 * fn 事件处理函数
 * delay 执行事件处理函数的间隔时间
 */
function throttle(fn, delay = 20) {
  var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

  return function () {
    if (timer) return;
    // 定时器计时，用来开锁
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 箭头函数没有自己的this和arguments
      timer = null; // 开锁
    }, delay);
  };
}
```

### 6、案例：规定时间内只能操作一次



- 这个案例主要是用来演示上面提到 事件处理函数放在定里器里面与外面的区别
- 我们希望点击发送按扭，就执行一次回调函数，然后间隔 1s 后，再次点击发送按扭才会再次执行回调函数。如果`下一次点击时间离上一次点击时间 < 1s`，就啥也不做。

```html
<button id="send">发送</button>
<script>
  var send = document.getElementById("send");
  send.onclick = throttle(fn, 1000);

  // 事件处理函数
  function fn() {
    console.log(1);
  }

  function throttle(fn, delay = 20) {
    var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

    return function () {
      if (timer) {
        alert("请1s后再点击");
        return;
      }
      // 定时器计时，用来开锁
      timer = setTimeout(() => {
        timer = null; // 开锁
      }, delay);
      fn.apply(this, arguments);
    };
  }
</script>
```

## 五、CSS3 动画效果开发



- 在前面我们已经学习了如何利用纯 JS 来实现动画效果，如果实现相对较简单的动画 JS 肯定是没什么问题，但如何遇到相对复杂的动画，用 JS 实现起来还是很麻烦的。
- 我们知道，CSS3 的 transition 可以实现过渡动画，animation 可以实现相对复杂的动画。而且 CSS3 动画是浏览器原生支持的，相对而言性能比 JS 实现会更好。

> 我们可以利用 JS 和 CSS3 来结合，轻松实现各种动画。 接下来就让我们一起来学习吧 ！

### 1、JS 结合 CSS3 的 transition 实现动画



我们希望利用 JS 与 CSS3 来实现以下动画效果，我们来看下

**实现的思路**

- 整个运动过程中，方块的位置、宽、高、透度明都发生了变化
- 我们可以给方块添加 transition 过渡属性，让其支持过渡动画
- 然后在点击开始动画按扭时，动态添加相应的样式，那方块就会按下面效果动起来。

![GIF 2022-10-23 23-51-37](https://www.arryblog.com/assets/img/GIF-2022-10-23-23-51-37.60bb753b.gif)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 100px;
    background-color: skyblue;
    opacity: 1;
    transition: all 1s ease;
  }
  .move {
    left: 500px;
    top: 300px;
    opacity: 0.5;
  }
</style>

<body>
  <button id="button">开始动画</button>
  <div class="box"></div>
  <script>
    var button = document.getElementById("button");
    var box = document.querySelector(".box");
    var flag = true; // 用来标识当前元素的位置，true表示左边，false表示右边
    button.onclick = function () {
      // 如果在左边，是添加move类样式
      if (flag) {
        box.classList.add("move");
        flag = false;
      } else {
        // 如果在右边，就移除 move类样式
        box.classList.remove("move");
        flag = true;
      }
    };
  </script>
</body>
```

### 2、动画的优化



- 如果用户频繁的点击开始动画按扭，那方块就会在未达到终点状态之间来回切换
- 如果我们希望在动画没有到达终点状态之前，不管用户点击多少次，都不会执行再执行新的动画。
- 只有动画到达终点状态后，用户再次点击，再会再执行新的动画

解决方案

- 可以用我们之前讲到的节流函数来处理
- 也可以用我们接下来讲到的过渡事件来处理

![GIF 2022-10-24 0-09-43](https://www.arryblog.com/assets/img/GIF-2022-10-24-0-09-43.2c754560.gif)

```html
<script>
  var button = document.getElementById("button");
  var box = document.querySelector(".box");
  var flag = true; // 用来标识当前元素的位置，true表示左边，false表示右边
  button.onclick = throttle(fn, 1000);

  function fn() {
    // 如果在左边，是添加move类样式
    if (flag) {
      box.classList.add("move");
      flag = false;
    } else {
      // 如果在右边，就移除 move类样式
      box.classList.remove("move");
      flag = true;
    }
  }

  // 节流函数
  function throttle(fn, delay = 20) {
    var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

    return function () {
      if (timer) return;
      // 定时器计时，用来开锁
      timer = setTimeout(() => {
        timer = null; // 开锁
      }, delay);
      fn.apply(this, arguments); // 箭头函数没有自己的this和arguments
    };
  }
</script>
```

### 3、过渡事件

| 事件             | 描述                                                      |
| :--------------- | :-------------------------------------------------------- |
| transitionstart  | 该事件在 CSS 过渡实际开始时触发                           |
| transitionend    | 该事件在 CSS 完成过渡后触发。                             |
| transitioncancel | 该事件在 CSS 过渡动画取消时触发                           |
| transitionrun    | 该事件会在创建过渡动画前触发，即在 transitionstart 前触发 |

> 利用 transitionend 事件，实现当过渡动画执行完后，保持其动画执行完后的最终效果，如下：

![GIF 2022-10-27 21-25-38](data:image/gif;base64,R0lGODlhkgGDAAAAACH5BAAyAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAkgGDAKD/////AAAC/4SPqcvtD6OctNqLs968+w+G4kiW5omm6goG7gvH8kzX9o3nNcv3/g8MAnTEovGIDAiXzKbzmUhKp1Qd9IrNaj/Vrre7DYvHZMP3jC6W1+z2Lw2Pz9z0ur0lz8fv/L4foheI9kdY6CeICGa4yLiW+CjVKDmZBWlpRJmpKXTZmbMJGqriSbojeoqKV7r6kur6isEqqwRba+swy3q7y2uWW9obXPsLLGyMSkx6vBya7MkMnencGV3dOH1prV2Ibbn93dcNCU5eJ/5Yns52nqjuPsaO+D6vFS9Ijw9lH5jfz7Svx59AIADzDDzIo6AchAxTKNzTMCKJh3AkWgxBMc3Fjf8dMg7iCDKWxy8hS1YYSdKkSkAoFa18uaClS5g0fcmcUjPnkJs4ddLk2dPnS6CRhA4lisToUaSYlKpkesTpU6hqpJakWtUqSKxEtIbkasUrR7CfxG4ki8PsWbQ21F5k29atRLim5DakS8NuRLxz9DLkK8PvX8AwBCMkXNjwQMStFAtk7MLxY8iS/UGmVRnf5cz5NnOm5/nzu9Ci1ZEuXe40anCqV29r7doa7NjRZtNmZvv2sdy6hfHu3es38F3Ch9sqbhwW8uSuljNHRvn5MufSm0Wv7vs69uDatxPv7v04+PDKx5Nvbv48dMbqb1Fvv+g9fG7p52+Sb/9Q/fyU8PNEv+PffwIOSGCBBh6IYIIKLshggw4+CGGEEk5IYYUWXohhhhpuyGGHHn4IYogijkhiiSaeiGKKKq7IYosuvghjjDLmVwAAIfkEAAoAqwAsaAACAAIAZACg/wAAAAAAAgyEj6nL7Q+jnLTa6woAIfkEAAoAqwAsagACAB0AZACg/wAAAAAAAjiEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym82krAAAh+QQACgCrACyHAAIAJABkAKD/AAAAAAACQISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YoVFQAAIfkEAAoAqwAsqwACADAAZACg/wAAAAAAAkuEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSqfUqvWKzWq33K73Cw6Lx+TyrAAAIfkEAAoAqwAs2wACAB8AZACg/wAAAAAAAjqEj6nL7Q+jnLTai7PevPsPhuJIluaJpurKtu4Lx/JM1/aN5/rO9/4PDAqHxKLxiEwql8ym8wmNSi8FACH5BAAKAKsALPoAAgAVAGQAoP8AAAAAAAIuhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh0RMAQAh+QQACgCrACwPAQIAEABkAKD/AAAAAAACJ4SPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s4jBQAh+QQACgCrACwfAQIACQBkAKD/AAAAAAACHISPqcvtD6OctNqLs968+w+G4kiW5omm6sq2awEAIfkEAAoAqwAsKAECAAYAZACg/wAAAAAAAheEj6nL7Q+jnLTai7PevPsPhuJIlmZSAAAh+QQAjACrACwuAQIAAgBkAKD/AAAAAAACDISPqcvtD6OctNrrCgA7)

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    transition: width 1s ease;
  }
  .box:hover {
    width: 300px;
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector(".box");
  box.addEventListener("transitionend", fn, false);
  function fn() {
    // alert("动画结束");
    this.style.width = "300px"; // 动画结束后，停在目标点
  }
</script>
```

### 4、利用 transitionend 事件，优化最开始的双向切换动画



- 定义一个变量`lock = false`，表示当前没有动画执行，锁是开的
- 当`lock = false`时，可以执行动画，同时设置 `lock = true`
- 然后在 transitionend 事件中，设置`lock = false`，表示动画结束，开锁

```html
<script>
  var button = document.getElementById("button");
  var box = document.querySelector(".box");
  var flag = true; // 用来标识当前元素的位置，true表示左边，false表示右边
  var lock = false;
  button.onclick = fn;

  function fn() {
    if (lock) return;
    lock = true;
    // 如果在左边，是添加move类样式
    if (flag) {
      box.classList.add("move");
      flag = false;
    } else {
      // 如果在右边，就移除 move类样式
      box.classList.remove("move");
      flag = true;
    }
  }

  //  过流动画结束后，会触发 transitionend 事件
  box.addEventListener(
    "transitionend",
    function () {
      lock = false; // 开锁
    },
    false
  );
</script>
```

### 5、二级伸缩菜单



涉及知识点

- 节点操作 nextElementSibling、children
- click 事件，事件委托
- 自定义属性
- css3 过渡动画
- 节流函数

![GIF 2022-10-25 22-54-03](https://www.arryblog.com/assets/img/GIF-2022-10-25-22-54-03.dfdde2fa.gif)

```html
<style>
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu {
    width: 200px;
    margin: 100px;
  }
  .menu .title {
    height: 35px;
    background-color: skyblue;
    color: #fff;
    text-indent: 2em;
    line-height: 35px;
    cursor: pointer;
  }
  .menu ul {
    height: 0;
    overflow: hidden;
    /* display: none; */
    transition: height 1s ease;
  }
  .menu ul li {
    line-height: 30px;
    border-bottom: 1px dotted #ddd;
    text-indent: 2em;
  }
  .menu ul li a {
    text-decoration: none;
    color: #000;
  }
</style>
<script src="./throttle.js"></script>
<div class="menu">
  <div class="title">菜单一</div>
  <ul>
    <li><a href="">首页</a></li>
    <li><a href="">免费公开课</a></li>
    <li><a href="">web前端</a></li>
    <li><a href="">java架构师</a></li>
    <li><a href="">大数据</a></li>
  </ul>
  <div class="title">菜单二</div>
  <ul>
    <li><a href="">首页</a></li>
    <li><a href="">免费公开课</a></li>
    <li><a href="">web前端</a></li>
  </ul>
  <div class="title">菜单三</div>
  <ul>
    <li><a href="">首页</a></li>
    <li><a href="">免费公开课</a></li>
  </ul>
</div>

<script>
  // 事件委托来处理
  // 本来应该由 div.title这些子元素处理的事情，现在全部交给他们的父亲 div.menu来处理
  var menu = document.querySelector(".menu");
  var title = document.querySelectorAll(".menu .title");
  // 委托给父元素 menu来处理click事件
  menu.onclick = throttle(fn, 1000);

  // 事件处理函数
  function fn(e) {
    var target = e.target;
    var className = target.className;
    if (className !== "title") return;
    // 当前被点击元素的下一个HTML标签类型的兄弟元素
    var nextSibling = target.nextElementSibling;
    // 获取nextSibling里面子元素的高度，然后将所有子元素高度加起来
    var children = nextSibling.children;
    var height = children.length * children[0].offsetHeight; // 计算ul高度
    // 让他显示
    if (target.flag) {
      // 如果当前是开，那我就关
      nextSibling.style.height = "0px";
      target.flag = false; // 更新为关的状态
    } else {
      nextSibling.style.height = height + "px";
      target.flag = true;
    }
  }
</script>
```

利用 transitionend 事件来处理

```js
// 事件委托来处理
// 本来应该由 div.title这些子元素处理的事情，现在全部交给他们的父亲 div.menu来处理
var menu = document.querySelector(".menu");
var title = document.querySelectorAll(".menu .title");
var oUl = document.querySelectorAll(".menu ul");
var lock = false;
// 委托给父元素 menu来处理click事件
menu.onclick = fn;

// 事件处理函数
function fn(e) {
  if (lock) return;
  lock = true;
  var target = e.target;
  var className = target.className;
  if (className !== "title") return;
  // 当前被点击元素的下一个HTML标签类型的兄弟元素
  var nextSibling = target.nextElementSibling;
  // 获取nextSibling里面子元素的高度，然后将所有子元素高度加起来
  var children = nextSibling.children;
  var height = children.length * children[0].offsetHeight; // 计算ul高度
  // 让他显示
  if (target.flag) {
    // 如果当前是开，那我就关
    nextSibling.style.height = "0px";
    target.flag = false; // 更新为关的状态
  } else {
    nextSibling.style.height = height + "px";
    target.flag = true;
  }
}

// 每个li身上添加transitionend事件，当动画结束触发了transitionend事件时，开锁
for (var i = 0; i < oUl.length; i++) {
  console.log(oUl[i]);
  oUl[i].addEventListener(
    "transitionend",
    function () {
      lock = false;
    },
    false
  );
}
```

### 6、动画事件

> 以下是常见的 CSS3 动画事件

| 事件               | 描述                            |
| :----------------- | :------------------------------ |
| animationend       | 该事件在 CSS 动画结束播放时触发 |
| animationiteration | 该事件在 CSS 动画重复播放时触发 |
| animationstart     | 该事件在 CSS 动画开始播放时触发 |
| animationcancel    | 该事件在 CSS 动画意外中止时触发 |

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    /* 动画名  动画时间  速度  延时  执行次数 */
    animation: move 2s ease 2s 3;
  }
  @keyframes move {
    0% {
      width: 100px;
      height: 100px;
    }
    50% {
      width: 300px;
      height: 100px;
    }
    100% {
      width: 300px;
      height: 300px;
    }
  }
</style>

<div class="box"></div>
<script>
  var box = document.querySelector(".box");
  box.addEventListener("animationstart", fn1, false);
  box.addEventListener("animationend", fn2, false);
  box.addEventListener("animationiteration", fn3, false);
  function fn1() {
    console.log("动画开始前执行");
  }
  function fn2() {
    console.log("动画开始结束时执行");
  }
  function fn3() {
    console.log("动画重复执行时执行");
  }
</script>
```

![GIF 2022-10-27 22-36-33](https://www.arryblog.com/assets/img/GIF-2022-10-27-22-36-33.53a414b3.gif)

### 7、案例 1：JS 结合 CSS3 实现转盘抽奖



涉及知识点

- 抽奖盘布局
- 抽奖概率计算原理
- transitionend 事件
- css3 实现缓动动画
- 节流锁应用
- 其它：权重数组、数组 sort 方法排序、switch 用法、数组的 splice 方法

![GIF2022-11-1923-53-44](https://www.arryblog.com/assets/img/GIF2022-11-1923-53-44.d33b2d06.gif)

```html
<style>
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .luck-draw {
    width: 320px;
    height: 320px;
    background-color: tomato;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .luck-draw .luck-panel {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    transform: rotate(22.5deg);
    transition: all 3s cubic-bezier(0.14, 0.66, 0.77, 0.98);
  }
  /* .luck-draw .luck-panel:hover {
    transform: rotate(1800deg);
    } */
  .luck-panel .panel-left {
    width: 50%;
    height: 100%;
    background-color: #ddd;
    float: left;
    position: relative;
    overflow: hidden;
  }
  .luck-panel .panel-right {
    width: 50%;
    height: 100%;
    background-color: #ddd;
    float: right;
    position: relative;
    overflow: hidden;
  }

  /* 每一个抽奖格子的实现 */
  .panel-left .prize-item,
  .panel-right .prize-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .panel-left .prize-item {
    transform-origin: right center;
  }
  .panel-left .prize-item:nth-child(1) {
    background-color: rgb(243, 136, 154);
  }
  .panel-left .prize-item:nth-child(2) {
    background-color: rgb(240, 229, 136);
    transform: rotate(-45deg);
  }
  .panel-left .prize-item:nth-child(3) {
    background-color: rgb(168, 231, 250);
    transform: rotate(-90deg);
  }
  .panel-left .prize-item:nth-child(4) {
    background-color: rgb(191, 245, 209);
    transform: rotate(-135deg);
  }
  /* 把span 中的文字移出来*/
  .panel-left .prize-item span {
    position: absolute;
    top: 30px;
    right: 12px;
    transform: rotate(-22.5deg);
    user-select: none;
  }

  .panel-right .prize-item {
    transform-origin: left center;
  }

  .panel-right .prize-item:nth-child(1) {
    background-color: rgb(245, 196, 90);
  }
  .panel-right .prize-item:nth-child(2) {
    background-color: rgb(240, 229, 136);
    transform: rotate(-45deg);
  }
  .panel-right .prize-item:nth-child(3) {
    background-color: rgb(168, 231, 250);
    transform: rotate(-90deg);
  }
  .panel-right .prize-item:nth-child(4) {
    background-color: #fff;
    transform: rotate(-135deg);
  }

  .panel-right .prize-item span {
    position: absolute;
    bottom: 30px;
    left: 10px;
    transform: rotate(160deg);
    user-select: none;
  }

  .luck-draw .draw-button {
    width: 60px;
    height: 60px;
    background-color: tomato;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
  }
  .draw-button::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom-color: tomato;
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<!-- 转盘布局开始 -->
<div class="luck-draw">
  <div class="luck-panel">
    <div class="panel-left">
      <div class="prize-item"><span>10个积分</span></div>
      <div class="prize-item"><span>10元红包</span></div>
      <div class="prize-item"><span>免单50元</span></div>
      <div class="prize-item"><span>免单100元</span></div>
    </div>
    <div class="panel-right">
      <div class="prize-item"><span>保温杯一个</span></div>
      <div class="prize-item"><span>电饭煲一台</span></div>
      <div class="prize-item"><span>手机一部</span></div>
      <div class="prize-item"><span>未中奖喽!</span></div>
    </div>
  </div>
  <!-- 抽奖按扭 -->
  <div class="draw-button">抽奖</div>
</div>
<!-- 转盘布局结束-->
```

**JavaScript 实现思路**

- 第一步

动态添加抽奖礼品数据到页面，抽奖礼品保存在以下数组中

```js
var prizes = [
  "手机一部",
  "电饭煲一台",
  "保温杯一个",
  "免单50元",
  "免单100元",
  "10元红包",
  "10个积分",
  "未中奖喽!",
];
```

- 第二步

随机抽奖，需要通过随机函数，生成 0-数组长度-1 之间的整数，通过这个随机数来确定对应的中奖奖品

```js
var prizesLength = prizes.length;
var _index = (Math.random() * prizesLength) >> 0;
```

- 第三步

根据抽中的奖项，来确定转盘旋转的角度，计算公式如下

```js
var deg = _index * 45 + 22.5;
```

- 第四步

我们希望每次抽奖，转盘能在现有角度上再旋转 5 圈，然后到达指定角度

```js
var sum = 0; // 相当于累加器
sum += 1800;
deg = sum + deg;
luckpanel.style.transform = "rotate(" + deg + "deg)";
```

- 第五步

控制抽奖概率

- 设置权重数组，然后随机生成 0-99 之间的整数，把生成的数插入到权重数组中，然后升序排序。
- 查询随机数在权重数组中的下标，根据对应的下标来决定中的是那个奖项。
- 最后把随机从权重数组中删除，不能破坏了权重数组

```js
// 权重数组
var weight = [1, 3, 7, 12, 19, 30, 40, 100];
// 随机生成 0-99 之间的整数。
var random = (Math.random() * 100) >> 0;
// 把生成的随机数添加到数组中
weight.push(random);
// 对数组进行升序排序
weight.sort(function (a, b) {
  return a - b;
});
// 找到随机生成的数，在数组中的下标
var _index = weight.indexOf(random);
// 删除随机生成的数，不能影到我的权重数组
weight.splice(_index, 1);
```

- 第六步

防止用户频繁点击按扭。在上一次抽奖没有结束前，不能再次抽奖

```js
var lock = false; // 开锁 目前没有抽奖
// 点击抽奖
drawButton.onclick = function () {
  if (lock) return;
  lock = true; // 关锁 正在抽奖

  // ....
};

// 动画结束后 开锁
luckpanel.addEventListener(
  "transitionend",
  function () {
    lock = false;
    //   alert("恭喜你中了" + drawText);
  },
  false
);
```

完整版

```html
<script>
  // 动态添加抽奖礼品数据到页面中
  var prizes = [
    "手机一部",
    "电饭煲一台",
    "保温杯一个",
    "免单50元",
    "免单100元",
    "10元红包",
    "10个积分",
    "未中奖喽!",
  ];

  // 权重数组
  var weight = [1, 3, 7, 12, 19, 30, 40, 100];

  // 获取页面中的span
  var spans = document.querySelectorAll(".luck-panel .prize-item span");
  var spansLength = spans.length;
  // 动态填充内容
  for (var i = 0; i < spansLength; i++) {
    spans[i].innerText = prizes[i];
  }

  // 第二步，点击抽奖按扭，开始抽奖
  var drawButton = document.querySelector(".draw-button");
  var luckpanel = document.querySelector(".luck-panel");
  var prizesLenght = prizes.length; // 数组长度
  var drawText = "";
  var lock = false; // 当前没有抽奖 转盘没有转动

  // 点击抽奖
  drawButton.onclick = function () {
    if (lock) return;
    lock = true; // 正在抽奖
    // var _index = (Math.random() * prizesLenght) >> 0;
    // 控制抽奖概率
    var random = (Math.random() * 100) >> 0;
    // 把生成的随机数添加到数组中
    weight.push(random);
    // 对数组进行升序排序
    weight.sort(function (a, b) {
      return a - b;
    });
    // 找到随机生成的数，在数组中的下标
    var _index = weight.indexOf(random);
    // 删除随机生成的数，不能影到我的权重数组
    weight.splice(_index, 1);
    drawText = prizes[_index];
    // 抽中了对应的奖项后，转盘要转动到对应位置
    switch (_index) {
      case 0:
        draw(22.5);
        break;
      case 1:
        draw(67.5);
        break;
      case 2:
        draw(112.5);
        break;
      case 3:
        draw(175.5);
        break;
      case 4:
        draw(202.5);
        break;
      case 5:
        draw(247.5);
        break;
      case 6:
        draw(292.5);
        break;
      case 7:
        draw(337.5);
        break;
    }
  };

  // 转盘转动
  var draw = (function () {
    var sum = 0; // 累加器
    return function (deg) {
      sum += 1800;
      var deg = deg + sum;
      luckpanel.style.transform = "rotate(" + deg + "deg)";
    };
  })();

  // 动画结束后 开锁
  luckpanel.addEventListener(
    "transitionend",
    function () {
      lock = false;
      //   alert("恭喜你中了" + drawText);
    },
    false
  );
</script>
```

### 8、案例 2：JS 结合 CSS3 实现红包雨



涉及知识点

- animation 动画
- animationend 事件
- 事件委托
- JavaScript 面向对象
- 构造函数与实例

![GIF 2022-10-30 2-32-35](https://www.arryblog.com/assets/img/GIF-2022-10-30-2-32-35.6407feee.gif)

### 8.1、布局实现思路

- 页面背景设置黑色，同时设置超出部分显示隐藏

```css
body {
  background-color: #000;
  overflow: hidden; /* 超出部分显示隐藏 */
}
```

- 创建一个小红包（因为每个红包旋转角度不一样，则红包旋转的角度用 JS 来设置）

```html
<!-- 红包 -->
<div class="red-packet animation-drop"></div>
.red-packet {
  width: 120px;
  height: 168px;
  background: url("./images/redPacket.png") no-repeat;
  background-size: cover;
  cursor: pointer;
}
```

- 利用 animation 动画实现小红包从上往下掉落效果 （每个红包掉落的时间不一样，用 JS 来实现）

```css
/* 匀速下落动画 */
.animation-drop {
  /* 动画运动时间，不同的红包是不一样的 */
  /* animation: drop 5s ease forwards; */
  animation-name: drop; /* 动画名字 */
  /* animation-duration: 5s; 动画运动时间 */
  animation-timing-function: ease; /* 运动的速度 */
  animation-fill-mode: forwards; /* 运动结束后的状态 */
}
@keyframes drop {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    top: 1200px;
  }
}
```

- 布局红包中奖后的显示效果，包括关闭按扭，红包金额

```html
<!-- 中奖效果 -->
<div class="show-red-packet">
  <div class="close">X</div>
  <div class="money">1.67元</div>
</div>
/* 中奖显示效果 */
.show-red-packet {
  width: 400px;
  height: 579px;
  background-image: url("./images/redPacket2.png");
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

/* 关闭按扭 */
.show-red-packet .close {
  display: block;
  content: "";
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: -50px;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}

/* 中奖后，显示金额样式 */
.show-red-packet .money {
  width: 100%;
  height: 50px;
  font-size: 50px;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: 150px;
  display: block;
  user-select: none;
}
```

- 黑色半透明遮罩层 (刚开始是隐藏的)

```css
/* 黑色半透明遮罩层 */
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2; /* 要比show-red-packet的z-index小 */
  display: none;
}
```

- 完整的 html 布局结构和样式

```html
<style>
  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  body {
    background-color: #000;
    overflow: hidden;
  }
  .red-packet {
    width: 120px;
    height: 168px;
    background: url("./images/redPacket.png") no-repeat;
    background-size: cover;
    cursor: pointer;
    position: absolute;
  }
  .animation-drop {
    /* animation-duration: 5s; */
    animation-name: drop; /* 动画名 */
    animation-timing-function: ease; /* 运动速度 */
    animation-fill-mode: forwards; /* 运动结束后状态 */
  }
  @keyframes drop {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      top: 1200px;
    }
  }

  /* 中奖显示效果 */
  .show-red-packet {
    width: 400px;
    height: 579px;
    background-image: url("./images/redPacket2.png");
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: none;
  }
  /* 关闭按扭 */
  .show-red-packet .close {
    display: block;
    content: "";
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: -50px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    color: #333;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
  }
  /* 中奖后，显示金额样式 */
  .show-red-packet .money {
    width: 100%;
    height: 50px;
    font-size: 50px;
    color: #fff;
    text-align: center;
    position: absolute;
    bottom: 150px;
    display: block;
    user-select: none;
  }

  /* 黑色半透明遮罩层 */
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    display: none;
  }
  .container {
    width: 100%;
    height: 100%;
  }
</style>
<div id="J_redpacket">
  <!-- 红包 -->
  <div class="red-packet animation-drop"></div>
  <!-- 中奖显示效果 -->
  <div class="show-red-packet">
    <div class="money">2.85元</div>
    <div class="close">X</div>
  </div>
  <!-- 黑色半透明的遮罩层 -->
  <div class="mask"></div>
</div>
```

### 8.2、JS 实现思路

- 创建一个红包类，这个红包类有以下属性和方法

| 属性     | 说明                                                                    |
| :------- | :---------------------------------------------------------------------- |
| width    | 红包宽 ，如果不传，用默认值 120                                         |
| height   | 红包高，如果不传，用默认值 168                                          |
| x        | 水平方向坐标 （随机生成） （最大值不能大于浏览器宽 - 元素宽）           |
| y        | 垂直方向坐标 (随机生成) （最开始元素在浏览器外面，即 top=- 元素自身高） |
| money    | 红包金额大小（钱）                                                      |
| rotate   | 旋转的角度 （-45deg 到 45deg ）之间                                     |
| duration | 运动时间 3-7s 秒之间                                                    |
| dom      | 红包的 dom 结构                                                         |

| 实例方法 | 说明                        |
| :------- | :-------------------------- |
| init     | 用于在页面初始化一个红包    |
| drop     | 让红包运动起来,从上往下掉落 |

| 静态方法      | 说明             |
| :------------ | :--------------- |
| showRedPacket | 显示红包中奖状态 |
| hideRedPacket | 隐藏红包中奖状态 |
| sendRedPacket | 用来发放红包     |

- 随机生在`[a ,b]`之间的整数

```js
Math.random() * (b + 1 - a) + a;
/**
 * RedPacket 红包类
 * width 红包宽
 * height 红包高
 * @param x 红包x坐标
 * @param y 红包 y 坐标
 * @param money 红包金额
 */
function RedPacket(money = 0, x, y, rotate, width = 120, height = 168) {
  // 钱、宽、高都不能小于0的
  this.money = money <= 0 ? 0 : money;
  this.width = width <= 0 ? 0 : width;
  this.height = height < 0 ? 0 : height;

  // x 如果用户传了，就用用户传的，没有传，就自动随机生成
  // [30, 浏览器的宽度 - 红包的宽度];
  this.x = (function (that) {
    if (x === 0) return 0;
    if (x) return x;
    var maxLeft = document.documentElement.clientWidth - that.width;
    return (Math.random() * (maxLeft - 30 + 1) + 30) >> 0;
  })(this);

  // 用户传了就用传的，没传就赋默认值为 -元素高度
  this.y = (function (that) {
    if (y === 0) return 0;
    if (y) return y;
    return -that.height;
  })(this);

  // 处理旋转的角度,如果传了就用传的， 如果没传，就随机生成 [-45 ,45] 之间整数
  this.rotate = (function () {
    if (rotate === 0) return 0;
    if (rotate) return rotate;
    return ((Math.random() * 91) >> 0) - 45;
  })();

  // 运动时间，随机生成 [3，7]之间随机整数
  this.duration = Math.floor(Math.random() * 5 + 3);

  this.init(); // 调一下初始化方法
}
```

- init 方法，实现创建红包，同时添加到页面，红包创建完就会添加到页面

```js
// 初始化红包
RedPacket.prototype.init = function () {
  this.dom = document.createElement("div");
  this.dom.className = "red-packet";
  this.dom.style.width = this.width + "px";
  this.dom.style.height = this.height + "px";
  this.dom.style.left = this.x + "px";
  this.dom.style.top = this.y + "px";
  // 旋转角度
  this.dom.style.transform = "rotate(" + this.rotate + "deg)";
  this.dom.that = this; // 把this保存他对应dom的that属性上，供后面使用
  // 上树，添加到我们的页面当中去
  this.dom.parent = redPacketParent; // 可保存，可不保存，看后续需求
  this.dom.parent.appendChild(this.dom);
};
```

- move 方法，调用 move 方法，红包就可以运动，同时运动结束后，会将自己的 dom 元素从页面删除

```js
// drop 让红包运动起来
RedPacket.prototype.drop = function () {
  // this 红包实例
  this.dom.classList.add("animation-drop");
  // 给他添加运动时间
  this.dom.style.animationDuration = this.duration + "s";
  // 性能优化，如果动画结束，就从dom中移出自身
  this.dom.addEventListener(
    "animationend",
    function () {
      //把自身从dom树中移除
      this.parentNode.removeChild(this);
    },
    false
  );
};
```

- 在页面中创建 100 个 0-5 之间的随机数，作为红包的金额

```js
var moneyArr = [];
for (var i = 0; i < 100; i++) {
  // 创建一个0-5块钱之内的随机数，用来作为红包的金额
  var random = Number((Math.random() * 5).toFixed(2));
  moneyArr.push(random);
}
```

- 定义一个静态方法，用来实现发红包效果

```js
RedPacket.sendRedPacket = function (data) {
  if (!Array.isArray(data)) throw new Error("data不是一个数组，请传一个数组");
  // 随机发红包了,过100ms发一个红包出来
  var timer = setInterval(function () {
    var redPacket = new RedPacket(data.pop());
    redPacket.drop();
    // 如果数组的长度为0,说明红包发完了
    if (data.length === 0) {
      clearInterval(timer);
    }
  }, 100);
};
```

- 添加事件委托，把红包的点击事件委托给他的父元素来操作

```js
var domShowRedPacket = redPacketParent.querySelector(".show-red-packet");
var domMoney = redPacketParent.querySelector(".money");
var domClose = redPacketParent.querySelector(".close");
var domMask = redPacketParent.querySelector(".mask");
RedPacket.flag = false; // 表示已添加事件委托

if (!RedPacket.flag) {
  RedPacket.flag = true;
  // 事件委托 来处理红包被点击后中奖效果
  redPacketParent.onclick = function (e) {
    var target = e.target;
    var bool = target.classList.contains("red-packet");
    if (!bool) return;
    RedPacket.showRedPacket(target.that);
  };

  // 关闭中奖
  domClose.onclick = function () {
    RedPacket.hideRedPacket();
  };
}
```

### 8.3、完整源代码

```html
<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #000;
    overflow: hidden;
  }
  .red-packet {
    width: 120px;
    height: 168px;
    background-color: red;
    background: url("./images/redPacket.png");
    background-size: cover;
    cursor: pointer;
    /* 红包旋转角度，后期通过js实现 */
    /* transform: rotate(20deg); */
    position: absolute;
    top: -168px;
  }
  .animation-drop {
    /* 动画运动时间，不同的红包是不一样的 */
    /* animation: drop 5s ease forwards; */
    animation-name: drop; /* 动画名字 */
    /* animation-duration: 5s; 动画运动时间 */
    animation-timing-function: ease; /* 运动的速度 */
    animation-fill-mode: forwards; /* 运动结束后的状态 */
  }
  @keyframes drop {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      top: 1200px;
    }
  }

  /* 中奖显示效果 */
  .show-red-packet {
    width: 400px;
    height: 579px;
    background: url(./images/redPacket2.png);
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: none;
  }
  .show-red-packet .money {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 140px;
    font-size: 50px;
    color: #fff;
    text-align: center;
  }
  .show-red-packet .close {
    width: 50px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: -10px;
    right: -60px;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    cursor: pointer;
  }
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
    display: none;
  }
</style>

<div id="J_redpacket">
  <!-- 红包 -->
  <div class="red-packet animation-drop"></div>
  <!-- 中奖显示效果 -->
  <div class="show-red-packet">
    <div class="money">2.85元</div>
    <div class="close">X</div>
  </div>
  <!-- 黑色半透明的遮罩层 -->
  <div class="mask"></div>
</div>
<script>
  var RedPacket = (function () {
    /**
     * RedPacket 构造函数，相当于类
     * money 金额大小
     * x 水平坐标
     * y 垂直坐标
     * rotate 旋转角度
     * width 红包的宽
     * height 红包的高
     */
    var redPacketParent = document.getElementById("J_redpacket");
    var domShowRedPacket = redPacketParent.querySelector(".show-red-packet");
    var domMoney = redPacketParent.querySelector(".money");
    var domClose = redPacketParent.querySelector(".close");
    var domMask = redPacketParent.querySelector(".mask");

    function RedPacket(money = 0, x, y, rotate, width = 120, height = 168) {
      this.money = money <= 0 ? 0 : money; // 钱的金额是不能小于0的
      this.width = width <= 0 ? 0 : width;
      this.height = height < 0 ? 0 : height;
      // x 如果用户传了，就用用户传的，没有传，就自动随机生成
      // [30, 浏览器的宽度 - 红包的宽度];
      this.x = (function (that) {
        if (x === 0) return 0;
        if (x) return x;
        var maxLeft = document.documentElement.clientWidth - that.width;
        return (Math.random() * (maxLeft - 30 + 1) + 30) >> 0;
      })(this);

      // 用户传了就用传的，没传就赋默认值为 -元素高度
      this.y = (function (that) {
        if (y === 0) return 0;
        if (y) return y;
        return -that.height;
      })(this);

      // 处理旋转的角度  如果没传，就随机生成，如果传了就用传的  -45deg  45deg [-45 ,45]
      this.rotate = (function () {
        if (rotate === 0) return 0;
        if (rotate) return rotate;
        return ((Math.random() * 91) >> 0) - 45;
      })();

      // 运动时间 [3，7]
      this.duration = Math.floor(Math.random() * 5 + 3);
      // 调一下初始化方法
      this.init();

      if (!RedPacket.flag) {
        RedPacket.flag = true;
        // 事件委托
        redPacketParent.onclick = function (e) {
          var target = e.target;
          var bool = target.classList.contains("red-packet");
          if (!bool) return;
          RedPacket.showRedPacket(target.that);
        };

        // 关闭中奖
        domClose.onclick = function () {
          RedPacket.hideRedPacket();
        };
      }
    }

    RedPacket.flag = false; // 表示添加事件委托
    // 静态方法
    RedPacket.showRedPacket = function (that) {
      domShowRedPacket.style.display = "block";
      domMask.style.display = "block";
      domMoney.innerText = that.money; // that表示当前点击的那个红包的实例对象
    };

    // 用来隐藏红包
    RedPacket.hideRedPacket = function () {
      domShowRedPacket.style.display = "none";
      domMask.style.display = "none";
    };

    RedPacket.sendRedPacket = function (data) {
      if (!Array.isArray(data))
        throw new Error("data不是一个数组，请传一个数组");
      // 随机发红包了,过100ms发一个红包出来
      var timer = setInterval(function () {
        var redPacket = new RedPacket(data.pop());
        redPacket.drop();
        // 如果数组的长度为0,说明红包发完了
        if (data.length === 0) {
          clearInterval(timer);
        }
      }, 100);
    };

    // 初始化红包
    RedPacket.prototype.init = function () {
      this.dom = document.createElement("div");
      this.dom.className = "red-packet";
      this.dom.style.width = this.width + "px";
      this.dom.style.height = this.height + "px";
      this.dom.style.left = this.x + "px";
      this.dom.style.top = this.y + "px";
      // 旋转角度
      this.dom.style.transform = "rotate(" + this.rotate + "deg)";
      this.dom.that = this; // 把this保存他对应dom的that属性上，供后面使用
      // 上树，添加到我们的页面当中去
      this.dom.parent = redPacketParent; // 可保存，可不保存，看后续需求
      this.dom.parent.appendChild(this.dom);
    };

    // drop 让红包运动起来
    RedPacket.prototype.drop = function () {
      // this 红包实例
      this.dom.classList.add("animation-drop");
      // 给他添加运动时间
      this.dom.style.animationDuration = this.duration + "s";
      // 性能优化，如果动画结束，就从dom中移出自身
      this.dom.addEventListener(
        "animationend",
        function () {
          //把自身从dom树中移除
          this.parentNode.removeChild(this);
        },
        false
      );
    };
    return RedPacket;
  })();

  // 页面中创建100个 0-5之间的随机数，作为红包的金额
  var moneyArr = [];
  for (var i = 0; i < 100; i++) {
    // 创建一个0-5块钱之内的随机数，用来作为红包的金额
    var random = Number((Math.random() * 5).toFixed(2));
    moneyArr.push(random);
  }
  RedPacket.sendRedPacket(moneyArr); // 发放红包
</script>
```

## 六、JS 实现拖拽动画



结合本章节所学内容实现拖拽动画综合实践应用。

### 1、案例 1：拖拽动画



要求拖拽的小方块只能在父元素的区域内移动

**涉及知识点**

- 事件对象（鼠标位置、阻止默认行为）
- onmousedown、onmousemove、onmouseup 事件
- offsetWidth、offsetHeight、 clientWidth、clientHeight
- 拖拽动画实现原理

![GIF 2022-10-13 20-36-30](https://www.arryblog.com/assets/img/GIF-2022-10-13-20-36-30.d31ee09e.gif)

- 拖拽动画的实现原理，我们通过下面这个图来分析
- container 为拖拽小方块的定位父元素，小方块在被拖拽时，不能超出 container 区域。

![image-20221013202829968](https://www.arryblog.com/assets/img/image-20221013202829968.e89506a5.png)

实现步骤：

在鼠标按下时,即 onmousedown 事件

- 记录鼠标按下时与浏览器可视区左边和上边距离，即 `e.clientX` 和 `e.clientY`
- 同时记录被拖拽元素与定义父元素左边的距离，即 `drag.offsetLeft` 和 `drag.offsetTop`

在鼠标标移动时，即 onmousemove 事件

- 记录鼠标此时与浏览器可视区左边和上边距离，即 `e.clientX` 和 `e.clientY`
- 用 **`当前的 e.clientX - 鼠标按下时e.clientX`** ，得到鼠标在水平移动的距离，然后用这个距离加上移动前元素的 offsetLeft，就得到了此时被拖拽元素的 left 值。同得理得 top 值

还要添加 onmouseup 事件，在鼠标抬起时，要解绑 onmousemove 和 onmouseup 事件

> 以上步骤实现了元素可以自由的被拖拽，但是并不能控制元素只能在定位父元素容器中移动

控制被拖拽元素移动时不能超出父容器，我们只需要控制被拖拽元素的 left 和 top 值的大小

- 如果 `left < 0`，表示超出了父容器左边界，此时设置 left=0，强行拉回
- 如果 `left > 父容器宽 - 元素宽` ，表示超出了父容器右边界，此时设置 `left = 父容器宽 - 元素宽` ,强行拉回
- 如果 `top < 0`，表示超出了父容器上边界，此时设置 `top = 0`，强行拉回
- 如果 `top > 父容器高 - 元素高` ，表示超出了父容器下边界，此时设置 `top = 父容器宽 - 元素宽` ,强行拉回

> 以上步骤，实现了控制元素只能在父容器中移动

- 兼容性处理：如果被拖拽的元素是一个图片，或元素中有文字，被拖拽时就会出现卡顿
- 处理办法，就是禁止掉鼠标按下时,图片和被选中的文字**默认的拖拽行为**。

```js
e.preventDefault();
```

**完整版代码实现**

```html
<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  .container {
    width: 800px;
    height: 600px;
    border: 10px solid khaki;
    background-color: skyblue;
    margin: 100px;
    position: relative;
  }
  .drag {
    width: 100px;
    height: 100px;
    background-color: tomato;
    position: absolute;
    left: 100px;
    top: 100px;
    cursor: move;
  }
</style>

<body>
  <div class="container">
    <div class="drag">我是一堆没有用的干扰文字</div>
  </div>

  <script>
    var container = document.querySelector(".container");
    var drag = document.querySelector(".drag");
    // 当鼠标在元素身上按下去时
    drag.onmousedown = function (e) {
      var e = e || window.event;

      // 取消事件的默认行为
      e.preventDefault();
      // 鼠标按下时，与浏览器左边的距离和上面的距离
      var _clientX = e.clientX;
      var _clientY = e.clientY;

      // 获鼠标按下时，元素与定位父元素左边和上边的距离
      var _offsetTop = drag.offsetTop;
      var _offsetLeft = drag.offsetLeft;

      // 获取父容器的宽,用来计算元素最大left
      var dragWidth = this.offsetWidth;
      var dragHeight = this.offsetHeight;

      // 获取元素的定位父容器的宽
      var parentWidth = this.offsetParent.clientWidth;
      var parentHeight = this.offsetParent.clientHeight;

      // 计算元素能移动的最大left值和最大top值
      var maxLeft = parentWidth - dragWidth;
      var maxTop = parentHeight - dragHeight;

      // 当鼠标移动时
      document.onmousemove = function (e) {
        // 鼠标移动时，与浏览器可视区左边的距离
        var _moveClientX = e.clientX;
        var _moveClientY = e.clientY;

        // 计算鼠标移动的距离
        var _x = _moveClientX - _clientX;
        var _y = _moveClientY - _clientY;

        // 元素的left和top值
        var left = _x + _offsetLeft;
        var top = _y + _offsetTop;

        // 限定left只能在 0-maxLeft之间
        left = left < 0 ? 0 : left;
        left = left > maxLeft ? maxLeft : left;

        top = top < 0 ? 0 : top;
        top = top > maxTop ? maxTop : top;

        // 计算元素当前的位置
        drag.style.left = left + "px";
        drag.style.top = top + "px";
      };

      // 当鼠标弹起来时，要对事件解绑
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  </script>
</body>
```

### 1.1、封装 drag 方法 一



- 功能：需要拖拽那个元素，那个元素就调用 drag 方法
- drag 方法中有两个参数 dragmove 和 dragend，分别为两个回调函数
- dragmove：拖拽过程中需要处理的事情写在 dragmove 函数
- dragend：拖拽结束后，需要处理的事情写在 dragend 函数中

> **注意**：
> mousemove 事件处理函数中的 this 要替换为拖拽的元素，所以需要在事件处理函数外面用 `var that = this` 保存被拖拽元素，然后传进去。

```js
/**
 *	drag 拖拽方法
 * @param dragmove：拖拽过程中需要处理的事情写在dragmove函数
 * @param dragend：拖拽结束后，需要处理的事情写在dragend函数中
 */
HTMLElement.prototype.drag = function (dragmove, dragend) {
  // 当鼠标在元素身上按下去时
  this.onmousedown = function (e) {
    var e = e || window.event;
    // 取消事件的默认行为
    e.preventDefault();
    // 鼠标按下时，与浏览器左边的距离和上面的距离
    var _clientX = e.clientX;
    var _clientY = e.clientY;

    // 获鼠标按下时，元素与定位父元素左边和上边的距离
    var _offsetTop = this.offsetTop;
    var _offsetLeft = this.offsetLeft;

    // 获取父容器的宽,用来计算元素最大left
    var dragWidth = this.offsetWidth;
    var dragHeight = this.offsetHeight;

    // 获取元素的定位父容器的宽
    var parentWidth = this.offsetParent.clientWidth;
    var parentHeight = this.offsetParent.clientHeight;

    // 计算元素能移动的最大left值和最大top值
    var maxLeft = parentWidth - dragWidth;
    var maxTop = parentHeight - dragHeight;
    var that = this;
    // 当鼠标移动时
    document.onmousemove = function (e) {
      // 鼠标移动时，与浏览器可视区左边的距离
      var _moveClientX = e.clientX;
      var _moveClientY = e.clientY;

      // 计算鼠标移动的距离
      var _x = _moveClientX - _clientX;
      var _y = _moveClientY - _clientY;

      // 元素的left和top值
      var left = _x + _offsetLeft;
      var top = _y + _offsetTop;

      // 限定left只能在 0-maxLeft之间
      left = left < 0 ? 0 : left;
      left = left > maxLeft ? maxLeft : left;

      top = top < 0 ? 0 : top;
      top = top > maxTop ? maxTop : top;

      // 计算元素当前的位置
      that.style.left = left + "px";
      that.style.top = top + "px";

      // 移动过程中要处理的事情，调用以下回调函数
      dragmove instanceof Function ? dragmove() : dragmove;
    };

    // 当鼠标弹起来时，要对事件解绑
    document.onmouseup = function () {
      document.onmousemove = null;
      // 拖拽动画结束后，调用以下回调函数
      dragend instanceof Function ? dragend() : dragend;
      document.onmouseup = null;
    };
  };
};
```

**使用封装好的 drag 方法**

![GIF2022-11-2313-25-29](https://www.arryblog.com/assets/img/GIF2022-11-2313-25-29-16692712986061.e944f327.gif)

```html
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .box {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 100px;
    top: 100px;
    cursor: move;
  }
  .box1 {
    background-color: khaki;
    left: 100px;
  }
  .box2 {
    background-color: skyblue;
    left: 300px;
  }
  .box3 {
    background-color: tomato;
    top: 200px;
  }
</style>

<div class="box box1"></div>
<div class="box box2"></div>
<div class="box box3"></div>

<script src="./drag.js"></script>
<script>
  var box = document.querySelectorAll(".box");
  box[0].drag();
  box[1].drag();
  box[2].drag();
</script>
```

### 1.2、封装 drag 方法 二



- 功能：被按下的元素和被拖拽的元素不是同一个元素，当在 A 元素上按下时，可拖拖拽 B 元素
- drag 方法中有 3 个参数 dragElement,dragmove 和 dragend
- dragElement 表示要拖拽的元素
- dragmove：拖拽过程中需要处理的事情写在 dragmove 函数
- dragend：拖拽结束后，需要处理的事情写在 dragend 函数中

```js
/**
 * 调用drag方法的元素，为鼠标按下的元素
 * @param dragElement 为被拖拽的元素
 * @param dragmove：拖拽过程中需要处理的事情写在dragmove函数
 * @param dragend：拖拽结束后，需要处理的事情写在dragend函数
 */

HTMLElement.prototype.drag = function (dragElement, dragmove, dragend) {
  // 当鼠标在元素身上按下去时
  this.onmousedown = function (e) {
    var e = e || window.event;

    // 取消事件的默认行为
    e.preventDefault();
    // 鼠标按下时，与浏览器左边的距离和上面的距离
    var _clientX = e.clientX;
    var _clientY = e.clientY;

    // 获鼠标按下时，元素与定位父元素左边和上边的距离
    var _offsetTop = dragElement.offsetTop;
    var _offsetLeft = dragElement.offsetLeft;

    // 获取父容器的宽,用来计算元素最大left
    var dragWidth = dragElement.offsetWidth;
    var dragHeight = dragElement.offsetHeight;

    // 获取元素的定位父容器的宽
    var parentWidth = dragElement.offsetParent.clientWidth;
    var parentHeight = dragElement.offsetParent.clientHeight;

    // 计算元素能移动的最大left值和最大top值
    var maxLeft = parentWidth - dragWidth;
    var maxTop = parentHeight - dragHeight;

    // 当鼠标移动时
    document.onmousemove = function (e) {
      // 鼠标移动时，与浏览器可视区左边的距离
      var _moveClientX = e.clientX;
      var _moveClientY = e.clientY;

      // 计算鼠标移动的距离
      var _x = _moveClientX - _clientX;
      var _y = _moveClientY - _clientY;

      // 元素的left和top值
      var left = _x + _offsetLeft;
      var top = _y + _offsetTop;

      // 限定left只能在 0-maxLeft之间
      left = left < 0 ? 0 : left;
      left = left > maxLeft ? maxLeft : left;

      top = top < 0 ? 0 : top;
      top = top > maxTop ? maxTop : top;

      // 计算元素当前的位置
      dragElement.style.left = left + "px";
      dragElement.style.top = top + "px";

      // 移动过程中要处理的事情，调用以下回调函数
      dragmove instanceof Function ? dragmove() : dragmove;
    };

    // 当鼠标弹起来时，要对事件解绑
    document.onmouseup = function () {
      document.onmousemove = null;
      // 拖拽动画结束后，调用以下回调函数
      dragend instanceof Function ? dragend() : dragend;
      document.onmouseup = null;
    };
  };
};
```

利用封装的 drag 方法，实现以下效果

- 在黄色元素上按下，可拖拽橘红色元素移动
- 在橘红色元素上按下，元素不能被拖拽

![GIF2022-11-220-56-07](https://www.arryblog.com/assets/img/GIF2022-11-220-56-07.70f09c26.gif)

```html
<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: tomato;
    position: absolute;
    left: 100px;
    top: 100px;
    cursor: move;
  }
  .title {
    width: 200px;
    height: 50px;
    background-color: khaki;
  }
</style>
<div class="box">
  <div class="title"></div>
</div>

<script src="./drag.js"></script>
<script>
  var box = document.querySelector(".box");
  var title = document.querySelector(".title");
  // 鼠标在 title上面按下，但拖拽的是box元素
  title.drag(box);
</script>
```

### 2、案例 2：拖拽交换两元素位置



涉及知识点

- 利用 JS 实现布局转换
- onmousedown、onmousemove、onmouseup 事件
- 事件对象
- 自定义属性的使用
- 拖拽动画实现原理、如何检测两个元素碰撞，如果找到多个碰撞元素中离自己最近的一个
- 如何交换两个元素的位置

![GIF2022-11-2318-15-45-16692036016674](https://www.arryblog.com/assets/img/GIF2022-11-2318-15-45-16692036016674.c00635d9.gif)

### 2.1、布局实现

先利用纯 CSS 来实现两行 4 列的布局

![image-20221123165914084](data:image/png;base64,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)

```html
<style>
  html,
  body,
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  html,
  body {
    width: 100%;
    height: 100%;
  }
  ul {
    width: 880px;
    height: 240px;
    margin: 100px auto;
    background-color: #ddd;
    position: relative;
  }
  ul li {
    width: 200px;
    height: 100px;
    margin: 10px;
    float: left;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    cursor: move;
    background-color: skyblue;
  }
</style>

<ul class="list clearfix">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
</ul>
```

### 2.2、布局转换



元素需要拖动，那肯定要设置为绝对定位元素，我们可以利用 JS 来实现布局转换。同时将每个版块的颜色设置为不同

![image-20221123165841067](data:image/png;base64,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)

通过 JS 获取页面中 li 元素，然后把每个元素相对其定位的父元素 left 值和 top 值添加到一个数组中

```js
var items = document.querySelectorAll(".list li");
// 数组用来保存每个li元素的left 和 top值坐标
var coordinates = [];
// 循环遍历，把每个元素的坐标存到数组中去
for (var i = 0; i < len; i++) {
  var obj = {};
  obj.left = items[i].offsetLeft;
  obj.top = items[i].offsetTop;
  coordinates.push(obj);
}
```

- 遍历所有 li 元素，把每个元素的都转换为定位元素，同时把之前保存到数组中的对应的 left 值和 top 值添加到对应元素身上
- 再准备一个 bgColor 数组，用来保存每个 li 元素的背景颜色，同时把每个元素的背景颜色更改为对应颜色

```js
var bgColor = [
  "pink",
  "skyblue",
  "turquoise",
  "khaki",
  "salmon",
  "thistle",
  "orange",
  "red",
];
// 布局转换，把li转换成对应的绝对定位布局
for (var j = 0; j < items.length; j++) {
  items[j].style.position = "absolute";
  items[j].style.margin = "0"; // 注意把margin值设为 0
  items[j].style.left = coordinates[j].left + "px";
  items[j].style.top = coordinates[j].top + "px";
  items[j].style.backgroundColor = bgColor[j];
  items[j].style.zIndex = 2; // 统一元素的层级关系

  // 保存left与top值，是为了后面效换元素时，能拿到元素交换前的位置
  items[j].left = coordinates[j].left;
  items[j].top = coordinates[j].top;
}
```

### 2.3、JS 实现：拖拽效果



利用事件委托来处理，所以 li 子元素的 mousedown 事件需要处理的事情，全交由父元素来处理

```js
list.onmousedown = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  if (tagName !== "li") return;

  // 如果是在 li上按下需要处理的事情写在下面
};
```

- 在 li 上按下，可以拖拽 li
- 同时在元素没有发生碰撞时，松开鼠标，元素回到原位置
- 被按下拖拽的元素，会在所有元素的最上面，所以他的 z-index 要最大

```js
// 我们利事件委托，来处理
list.onmousedown = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  if (tagName !== "li") return;
  // 只有在li上按下时，才会做下面的事情
  // 鼠标按下时与浏览器可视区左边距离
  var _clientX = e.clientX;
  var _clientY = e.clientY;
  // 按下时，元素的left值和top值
  var offsetLeft = target.left;
  var offsetTop = target.top;

  document.onmousemove = function (e) {
    var clientX = e.clientX;
    var clientY = e.clientY;

    var left = clientX - _clientX + offsetLeft;
    var top = clientY - _clientY + offsetTop;

    target.style.left = left + "px";
    target.style.top = top + "px";

    // 被拖拽的元素的层级是最高的
    target.style.zIndex = 33;
  };

  // 鼠标松开
  document.onmouseup = function () {
    // 如果没有和其它元素碰撞，那就回到原来位置，同时元素zIndex复原
    // 判断条件，后面再写
    target.style.left = target.left + "px";
    target.style.top = target.top + "px";
    target.style.zIndex = 2;
    // 事件解绑
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
```

### 2.4、JS 实现：碰撞检测，同时找出碰撞元素中离自己最近的元素



- 判断当前拖拽的元素与其它兄弟碰上是否碰上
- 如果碰上，就把碰上的元素添加到数组中去
- 如果何找到碰到的元素中，离自己最近的元素

```js
var prevBumpElement = null; // 记录前一个与自己碰撞的元素
var nearElement = null; // 当前碰上的元素

document.onmousemove = function (e) {
  // 前面代码略
  //  .....
  // 如何判断两个元素是否碰上
  var bumpElement = [];
  items.forEach(function (item) {
    if (item !== target) {
      if (isBump(target, item)) {
        bumpElement.push(item);
      }
    }
  });

  // 找出与我碰撞的元素中，离自己最近的那一个
  nearElement = findNearest(target, bumpElement);

  // 如果前一个碰上的元素存在，就把样式消掉
  if (prevBumpElement) {
    prevBumpElement.style.outline = "none";
    prevBumpElement.style.zIndex = 2;
  }
  // 如果有碰上的元素，就把碰上的最近的那个元素添加如下样式
  if (nearElement) {
    nearElement.style.outline = "2px solid red";
    nearElement.style.zIndex = 22;
    prevBumpElement = nearElement; // 所当前碰上元素记录下来
  }
};
// 判断两个元素是否碰上
function isBump(obj1, obj2) {
  var L1 = obj1.offsetLeft;
  var R1 = L1 + obj1.offsetWidth;
  var T1 = obj1.offsetTop;
  var B1 = T1 + obj1.offsetHeight;
  var L2 = obj2.offsetLeft;
  var R2 = L2 + obj2.offsetWidth;
  var T2 = obj2.offsetTop;
  var B2 = T2 + obj2.offsetHeight;
  if (L2 > R1 || L1 > R2 || T2 > B1 || T1 > B2) {
    return false; // 未碰撞，返回false
  } else {
    return true; // 碰撞，返回true
  }
}

// 找出数组中与obj元素距离最近的元素
function findNearest(obj, arr) {
  var elementArr = [];
  // 遍历每个元素，计算每个元素于obj的中心位置，然后保存到数组中
  for (var i = 0; i < arr.length; i++) {
    // 当前被用来比较的obj，不用存到数组中，要排除
    if (arr[i] !== obj) {
      //计算两中心点距离
      var centerDistance = getDistance(arr[i], obj);
      // 把这个元素和对应中心点距离保存到数组中
      var el = {};
      el.element = arr[i];
      el.distance = centerDistance;
      elementArr.push(el);
    }
  }

  // for循环遍历elementArr数组，找出数组中距离最小的那个元素，然后返回
  var minElement = elementArr[0];
  for (var j = 0; j < elementArr.length; j++) {
    if (elementArr[j].distance < minElement.distance) {
      minElement = elementArr[j];
    }
  }
  if (minElement) return minElement.element; // 返回最小的距离的那个对象
  return;
}

// 计算两个元素中心点位置
function getDistance(obj1, obj2) {
  var x =
    obj1.offsetLeft +
    obj1.offsetWidth / 2 -
    (obj2.offsetLeft + obj2.offsetWidth / 2);

  var y =
    obj1.offsetTop +
    obj1.offsetHeight / 2 -
    (obj2.offsetTop + obj2.offsetHeight / 2);

  return Math.sqrt(x * x + y * y);
}
```

### 2.5、JS 实现：在碰上时，松开鼠标，交换两元素位置



如何判断当前鼠标是在碰撞元素上松开的呢 ？

如果鼠标松开时，存在离自己最近的碰上元素，那就是就是碰上时松开鼠标的

- 碰上时，交换两元素位置，同时交换位置时，实现动画效果
- 交换位置时，要把碰上元素的`outline`去掉，同时`nearElement = null`

```css
/* 过渡动画 */
.move {
  transition: all 0.5s ease;
}
document.onmouseup = function () {
  if (nearElement) {
    // 如果元素碰上，然后再松开鼠标,就要交换两个元素的位置
    var left = target.left;
    var top = target.top;

    // 把碰上元素的left和top值赋值级到 拖拽元素
    target.left = nearElement.left;
    target.top = nearElement.top;

    nearElement.left = left;
    nearElement.top = top;

    // 正式交换位置

    target.classList.add("move");
    nearElement.classList.add("move");

    target.style.left = target.left + "px";
    target.style.top = target.top + "px";

    nearElement.style.left = nearElement.left + "px";
    nearElement.style.top = nearElement.top + "px";
    nearElement.style.outline = "none";
    nearElement = null;
  } else {
    // 如果没有和其它元素碰撞，那就回到原来位置
    target.style.left = target.left + "px";
    target.style.top = target.top + "px";
    target.style.zIndex = 2;
  }

  document.onmousemove = null;
  document.onmouseup = null;
};
```

### 2.6、JS 实现：元素过渡动画结束后要处理的事



动画结束后移除元素身上的过渡动画样式，同时元素的`z-index`恢复为原值 2

```js
for (var k = 0; k < items.length; k++) {
  items[k].addEventListener(
    "transitionend",
    function () {
      this.classList.remove("move");
      this.style.zIndex = 2;
    },
    false
  );
}
```

### 2.7、完整版代码

布局

```html
<style>
  body,
  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body,
  html,
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list {
    width: 880px;
    height: 240px;
    /* background-color: #ddd; */
    margin: 100px auto;
    position: relative; /* 相对定位，切记要加 */
  }
  .list li {
    width: 200px;
    height: 100px;
    background-color: skyblue;
    float: left;
    margin: 10px;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    user-select: none;
    cursor: move;
    /* transition: all 1s ease; */
  }

  .move {
    transition: all 0.5s ease;
  }
</style>

<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
</ul>
```

JS 代码

```js
// 利用JS来实现布局转换
var list = document.querySelector(".list");
var items = document.querySelectorAll(".list li");
var len = items.length;
var prevBumpElement = null; // 记录前一个与自己碰撞的元素
var nearElement = null; // 当前碰上的元素
var coordinates = []; // 保存每个li的元素left 和 top
for (var i = 0; i < len; i++) {
  var obj = {};
  obj.left = items[i].offsetLeft;
  obj.top = items[i].offsetTop;
  coordinates.push(obj);
}
// 每个li元素的背景颜色
var bgColor = [
  "pink",
  "skyblue",
  "turquoise",
  "khaki",
  "salmon",
  "thistle",
  "orange",
  "red",
];
// 把每一个li转换成一个绝对定位的元素
for (var j = 0; j < items.length; j++) {
  items[j].style.position = "absolute";
  items[j].style.margin = "0"; // 注意把margin值设为 0
  items[j].style.left = coordinates[j].left + "px";
  items[j].style.top = coordinates[j].top + "px";
  items[j].style.backgroundColor = bgColor[j];
  items[j].style.zIndex = 2; // 统一元素的层级关系

  // 保存left与top值，是为了后面效换元素时，能拿到元素交换前的位置
  items[j].left = coordinates[j].left;
  items[j].top = coordinates[j].top;
}

// 我们利事件委托，来处理
list.onmousedown = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  if (tagName !== "li") return;
  // 只有在li上按下时，才会做下面的事情
  // 鼠标按下时与浏览器可视区左边距离
  var _clientX = e.clientX;
  var _clientY = e.clientY;
  // 按下时，元素的left值和top值
  var offsetLeft = target.left;
  var offsetTop = target.top;

  document.onmousemove = function (e) {
    var clientX = e.clientX;
    var clientY = e.clientY;

    var left = clientX - _clientX + offsetLeft;
    var top = clientY - _clientY + offsetTop;

    target.style.left = left + "px";
    target.style.top = top + "px";

    // 被拖拽的元素的层级是最高的
    target.style.zIndex = 33;

    // 如何判断两个元素是否碰上
    var bumpElement = [];
    items.forEach(function (item) {
      if (item !== target) {
        if (isBump(target, item)) {
          bumpElement.push(item);
        }
      }
    });

    // 找出与我碰撞的元素中，离自己最近的那一个
    nearElement = findNearest(target, bumpElement);
    // 如果前一个碰上的元素存在，就把样式消掉
    if (prevBumpElement) {
      prevBumpElement.style.outline = "none";
      prevBumpElement.style.zIndex = 2;
    }
    // 如果有碰上的元素，就把碰上的最近的那个元素添加如下样式
    if (nearElement) {
      nearElement.style.outline = "2px solid red";
      nearElement.style.zIndex = 22;
      prevBumpElement = nearElement; // 所当前碰上元素记录下来
    }
  };

  document.onmouseup = function () {
    if (nearElement) {
      //如果元素碰上，然后再松开鼠标,就要交换两个元素的位置
      var left = target.left;
      var top = target.top;

      // 把碰上元素的left和top值赋值级到 拖拽元素
      target.left = nearElement.left;
      target.top = nearElement.top;

      nearElement.left = left;
      nearElement.top = top;

      // 正式交换位置

      target.classList.add("move");
      nearElement.classList.add("move");

      target.style.left = target.left + "px";
      target.style.top = target.top + "px";

      nearElement.style.left = nearElement.left + "px";
      nearElement.style.top = nearElement.top + "px";
      nearElement.style.outline = "none";
      nearElement = null;
    } else {
      // 如果没有和其它元素碰撞，那就回到原来位置
      target.style.left = target.left + "px";
      target.style.top = target.top + "px";
      target.style.zIndex = 2;
    }

    document.onmousemove = null;
    document.onmouseup = null;
  };
};

for (var k = 0; k < items.length; k++) {
  items[k].addEventListener(
    "transitionend",
    function () {
      this.classList.remove("move");
      this.style.zIndex = 2;
    },
    false
  );
}

// 判断两个元素是否碰上
function isBump(obj1, obj2) {
  var L1 = obj1.offsetLeft;
  var R1 = L1 + obj1.offsetWidth;
  var T1 = obj1.offsetTop;
  var B1 = T1 + obj1.offsetHeight;
  var L2 = obj2.offsetLeft;
  var R2 = L2 + obj2.offsetWidth;
  var T2 = obj2.offsetTop;
  var B2 = T2 + obj2.offsetHeight;
  if (L2 > R1 || L1 > R2 || T2 > B1 || T1 > B2) {
    return false; // 未碰撞，返回false
  } else {
    return true; // 碰撞，返回true
  }
}

// 找出数组中与obj元素距离最近的元素
function findNearest(obj, arr) {
  var elementArr = [];
  // 遍历每个元素，计算每个元素于obj的中心位置，然后保存到数组中
  for (var i = 0; i < arr.length; i++) {
    // 当前被用来比较的obj，不用存到数组中，要排除
    if (arr[i] !== obj) {
      //计算两中心点距离
      var centerDistance = getDistance(arr[i], obj);
      // 把这个元素和对应中心点距离保存到数组中
      var el = {};
      el.element = arr[i];
      el.distance = centerDistance;
      elementArr.push(el);
    }
  }

  // for循环遍历elementArr数组，找出数组中距离最小的那个元素，然后返回
  var minElement = elementArr[0];
  for (var j = 0; j < elementArr.length; j++) {
    if (elementArr[j].distance < minElement.distance) {
      minElement = elementArr[j];
    }
  }
  if (minElement) return minElement.element; // 返回最小的距离的那个对象
  return;
}

// 计算两个元素中心点位置
function getDistance(obj1, obj2) {
  var x =
    obj1.offsetLeft +
    obj1.offsetWidth / 2 -
    (obj2.offsetLeft + obj2.offsetWidth / 2);

  var y =
    obj1.offsetTop +
    obj1.offsetHeight / 2 -
    (obj2.offsetTop + obj2.offsetHeight / 2);

  return Math.sqrt(x * x + y * y);
}
```

如果这个案例会了

那类传的以下效果大家都要尝试自己去做 ！

- **拖拽碰撞爆炸或拖拽删除、拖拽插入元素**
- **黑洞吸附效果**（其它元素碰到黑洞就消失）
- 拖拽改变元素大小

## 七、综合应用实践案例



结合本章节所学内容进行综合实践应用。

### 1、案例 3：键盘控制元素运动



涉及知识点

- 定时器 `setInterval()`
- onkeydown、onkeyup 事件
- 事件对象：`e.altkey`、`key`
- 动画执行原理

![GIF 2022-10-18 17-51-06](https://www.arryblog.com/assets/img/GIF-2022-10-18-17-51-06.ac22461b.gif)

- 页面中有一个长方形，当我按键盘上的不同方向键时，他可以向不同的方向移动
- 如果同时按下`Alt`键和方向键，则会加速向某个方向移动
- 因为 `keydown` 的第一次事件处理函数的调用时间与第二次的事件处理函数调用的时间间隔相对来说比较长
- 所以`keydown`事件主要用来判断元素的运动方向，元素的运动行为通过定时器来实现。

```html
<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    left: 100px;
    top: 100px;
  }
</style>
<div class="box"></div>

<script>
  var box = document.querySelector(".box");
  var speed = 5;
  var lock = false; // 锁，当前开锁状态
  var key;
  var timer = null;
  // 当键盘按下时，需要做的事情
  document.onkeydown = function (e) {
    key = e.key;
    var altkey = e.altKey; // true 或 false
    speed = altkey ? 50 : 5;

    // 这里第一次进来就会上锁,是不希望重复调用toMove函数
    if (!lock) {
      lock = true;
      toMove();
    }
  };

  // 根据方向，来移动元素
  function toMove() {
    timer = setInterval(function () {
      switch (key) {
        case "ArrowLeft":
          box.style.left = box.offsetLeft - speed + "px";
          break;
        case "ArrowRight":
          box.style.left = box.offsetLeft + speed + "px";
          break;
        case "ArrowDown":
          box.style.top = box.offsetTop + speed + "px";
          break;
        case "ArrowUp":
          box.style.top = box.offsetTop - speed + "px";
          break;
      }
    }, 50);
  }

  document.onkeyup = function () {
    clearInterval(timer);
    lock = false;
  };
</script>
```

### 2、案例 4：表单全选和取消



涉及知识点

- 自定义属性灵活使用
- 事件委拖
- 判断元素身上是否包含某个 class 类

![GIF 2022-10-23 18-45-38](https://www.arryblog.com/assets/img/GIF-2022-10-23-18-45-38.56cb46d3.gif)

> 以上布局，我们采用 `display: table;`来实现布局。

`display: table;`系列几乎是 和 `table`系的元素相对应的，请看下表：

| 属性               | 说明                                                               |
| :----------------- | :----------------------------------------------------------------- |
| table              | （类似 `<table>`）此元素会作为块级表格来显示，表格前后带有换行符。 |
| inline-table       | （类似 `<table>`）此元素会作为内联表格来显示，表格前后没有换行符。 |
| table-row-group    | （类似 `<tbody>`）此元素会作为一个或多个行的分组来显示。           |
| table-header-group | （类似 `<thead>`）此元素会作为一个或多个行的分组来显示。           |
| table-footer-group | （类似 `<tfoot>`）此元素会作为一个或多个行的分组来显示。           |
| table-row          | （类似 `<tr>`）此元素会作为一个表格行显示。                        |
| table-column-group | （类似 `<colgroup>`）此元素会作为一个或多个列的分组来显示。        |
| table-column       | （类似 `<col>`）此元素会作为一个单元格列显示。                     |
| table-cell         | （类似 `<td>` 和 `<th>`）此元素会作为一个表格单元格显示。          |
| table-caption      | （类似 `<caption>`）此元素会作为一个表格标题显示。                 |

### 2.1、布局实现源码

```html
<style>
  .table {
    display: table;
    border: 1px solid #ddd;
    width: 750px;
    border-collapse: collapse; /* 合并单元格边框线 */
  }
  .table .tr {
    display: table-row;
  }
  .table .tr .th,
  .table .tr .td {
    display: table-cell;
    height: 45px;
    border: 1px solid #666;
  }

  .table .tr .th {
    background-color: #ddd;
    vertical-align: middle;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
  }

  .table .tr .td {
    vertical-align: middle;
    text-align: center;
    font-size: 16px;
  }
  .check {
    width: 32px;
    height: 32px;
    outline: 1px solid #333;
    margin: 0 auto;
  }
  /* 选中状态的样式 */
  .selected {
    background: url("./images/seleted.png");
    outline: none;
  }
</style>
<div class="table" id="J_table">
  <div class="tr">
    <div class="th"><div class="check" id="J_selected"></div></div>
    <div class="th">序号</div>
    <div class="th">编号</div>
    <div class="th">班级名称</div>
    <div class="th">班主任</div>
    <div class="th">操作</div>
  </div>
  <div class="tr">
    <div class="td"><div class="check check-item"></div></div>
    <div class="td">001</div>
    <div class="td">202201001</div>
    <div class="td">初一（103班）</div>
    <div class="td">王老师</div>
    <div class="td"><button class="del">删除</button></div>
  </div>
  <div class="tr">
    <div class="td"><div class="check check-item"></div></div>
    <div class="td">002</div>
    <div class="td">202201002</div>
    <div class="td">初一（104班）</div>
    <div class="td">贺老师</div>
    <div class="td"><button class="del">删除</button></div>
  </div>
  <div class="tr">
    <div class="td"><div class="check check-item"></div></div>
    <div class="td">003</div>
    <div class="td">202201001</div>
    <div class="td">初二（105班）</div>
    <div class="td">雷老师</div>
    <div class="td"><button class="del">删除</button></div>
  </div>
  <div class="tr">
    <div class="td"><div class="check check-item"></div></div>
    <div class="td">004</div>
    <div class="td">202201001</div>
    <div class="td">初二（106班）</div>
    <div class="td">张老师</div>
    <div class="td"><button class="del">删除</button></div>
  </div>
</div>
```

### 2.2、JS 实现思路



**第一步：处理全选按扭点击后要实现的功能**

- 通过`classList.toggle`方法，来实现元素点击时，在选中和未选中状态之间来回切换
- 如果`classList.toggle`方法的返回值为 true，表示当前是全选状态，为 false 表示未全选状态。
- 在全选按扭对象上创建 1 个属性，用来记录当前选中的子元素的个数`(selectedNum)`,同时赋初默认值`selectedNum = 0`
- 如果全选按扭为选中状态，则`selectedNum = 所有子元素（复选框）个数`
- 如果全选按扭未选中状态，则设直`selectedNum = 0`

**第二步：处理每个子元素点击要实现的功能（采用事件委托）**

同样通过`classList.toggle`来实现子元素在选中和未选中状态之间切换。

然后根据`toggle`方法的返回值，来决定当前全选按扭的状态。

- 如果返回值为 true，让`selectedNum++`，如果`selectedNum === 子元素个数`，则表示当前所有子元素都是选中状态，则全选按扭更新为选中状态
- 如果返回值为`false`，让`selectedNume--`; 些时全选按扭肯定为未全选状态。因为只要有一个未选中，那就是未全选状态。

```js
// id="J_table"的元素
var table = document.getElementById("J_table");
// 获取全选按扭
var selectAllButton = document.getElementById("J_selected");
// 获取所有的复选框
var checkButtons = document.querySelectorAll(".table .tr .td .check");
var len = checkButtons.length;
selectAllButton.selectedNum = 0; // 刚开始被选中的元素个数是0

// 点击全选按扭，做相应的全选或取消操作
selectAllButton.onclick = function () {
  var flag = this.classList.toggle("selected");
  // flag为true表示当前是选中状态，false表示取消状态
  if (flag) {
    // 所有复选框全部选中
    for (var i = 0; i < len; i++) {
      checkButtons[i].classList.add("selected");
    }
    this.selectedNum = len; // 保存当前选中的子元素个数
  } else {
    // 所有复选框都是未选中状态
    for (var i = 0; i < len; i++) {
      checkButtons[i].classList.remove("selected");
    }
    this.selectedNum = 0; // 保存当前选中的子元素个数
  }
};

// 利用事件委托，把复选的点击事件需要处理的事处委托给他的祖先元素 table来处
table.onclick = function (e) {
  // 获取真正触发点击事件的元素
  var target = e.target;
  var bool = target.classList.contains("check-item");
  if (!bool) return;
  // 如果被点击的元素身上的className中有check-item类，那就需要处理下面的事情
  var bool2 = target.classList.toggle("selected");
  // 添加 selected时，flag值为true
  if (bool2) {
    selectAllButton.selectedNum++;
    // 选中个数与len相等，说明当前所有复选框全是选中的
    if (selectAllButton.selectedNum === len) {
      selectAllButton.classList.add("selected");
    }
  } else {
    selectAllButton.selectedNum--;
    selectAllButton.classList.remove("selected");
  }
};
```

### 3、案例 5：表单验证提示效果



涉及知识点

- 定时器
- onfocus 和 onblur 事件
- css3 过渡动画

![GIF 2022-10-23 21-54-01](https://www.arryblog.com/assets/img/GIF-2022-10-23-21-54-01.be6ce2f4.gif)

### 3.1、布局实现源码

```html
<style>
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000;
  }
  input {
    outline: none;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login {
    width: 300px;
    background-color: #fff;
    padding: 40px;
    border-radius: 5px;
  }
  .login .login-row {
    margin: 20px 0px;
    position: relative;
  }

  .login .login-row input,
  .login .login-row button {
    box-sizing: border-box;
    width: 100%;
    border: none;
    background-color: #f9f9f9;
    height: 60px;
    padding-left: 10px;
  }
  /* JS 操作获取焦点后的样式 */
  .login .login-row input.focus1 {
    border: 1px solid tomato;
  }
  .login .login-row input.focus2 {
    background-color: #fcf2f3;
  }

  label.label-tip {
    line-height: 60px;
    position: absolute;
    left: 20px;
    top: 0px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 18px;
    transition: all 0.2s ease-out;
  }
  /* 动态添加的缩放效果 */
  label.label-tip-min {
    font-size: 12px;
    line-height: 24px;
  }
  /* 错误提示 */
  .label-error {
    font-size: 14px;
    color: tomato;
    margin-top: 5px;
  }
  .hide {
    display: none;
  }

  .password-icon {
    width: 32px;
    height: 20px;
    position: absolute;
    top: 20px;
    right: 10px;
    background-color: red;
    background: url(./images/eye-close.png) no-repeat;
  }
  .eye-open {
    background-image: url(./images/eye.png);
  }

  .login .login-row button {
    background-color: tomato;
    font-size: 30px;
    color: #fff;
  }
</style>

<div class="login" id="J_login">
  <div class="login-row">
    <input type="text" id="account" name="account" class="user-name" />
    <label for="account" class="label-tip">邮箱/手机号码</label>
    <div class="label-error hide">请输入账户名</div>
  </div>
  <div class="login-row">
    <input type="password" name="password" id="password" class="user-pwd" />
    <label for="password" class="label-tip">密码</label>
    <div class="label-error hide">请输入登录密码</div>
    <div class="password-icon" id="J_eye"></div>
  </div>
  <div class="login-row">
    <button type="submit" name="login" class="button-login" id="button-login">
      登录
    </button>
  </div>
</div>
```

### 3.2、JS 实现思路



**第一步：处理文本框获取到焦点时要实现的功能**

获取焦点时

- 不关输入框中有内容还是没有内容，文字是缩小的，同时增加红色边框线
- 如果没有内容，还需要显示错误提示
- 如果有内容，去掉粉色背景，同时隐藏错误提示。

失去焦点时

- 不关输入框中有内容还是没有内容，去掉红色边框线
- 如果有内容，不需要再增加其它处理，因为有内容时，获取焦点时就处理过了
- 如果没有内容，文字要恢复正常大小，不需要再其它处理，因为在获取焦点时，如果没有内容，错误提示显示出来了。

> - 在输入时，有可能输入内容后又删除了，但 onfocus 只会在获取焦点时触发一次
> - 所以要开一个**计时器**来定期检查输入内容是否为空，这里采用 requestAnimationFrame 来处理。
> - 当失去焦点时，就不再调用 requestAnimationFrame，所以我们可以定义一把锁，当获取焦点时开锁，可以一直重复调用 requestAnimationFrame，失去焦点时关锁，不再调用

**第二步：处理点击密码框中的小眼睛，闭上与打开要实现的功能**

- 如果小眼睛关闭状态，点击后打开，然后设置密码输入框`type = 'text'`
- 如果小眼睛打开状态，点击后关闭，然后设置密码输入框`type = 'password'`

```js
// 获取input输入框，然后分别给他们加上获取焦点和失去焦点事件监听
var inputs = document.querySelectorAll("#J_login .login-row input");
var eyeButton = document.getElementById("J_eye");
var password = document.getElementById("password");
var lock = false; // false表示锁是开的
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", focusFn, false);
  inputs[i].addEventListener("blur", blurFn, false);
}
// 获取焦点事件处理函数
function focusFn() {
  window.requestAnimationFrame(fn);
  var that = this;
  //只要是获取焦点状态，不关是有内容还是没内容，文字都要缩小，同时添加边框线
  // 1、缩小文字
  that.nextElementSibling.classList.add("label-tip-min");
  // 2、增加边框线
  that.classList.add("focus1");

  lock = false; // 每次获取焦点时的那一刻，要解锁
  function fn() {
    // 获取输入框中的内容
    var value = that.value.trim();
    if (value) {
      // 1、错识提示隐藏
      that.nextElementSibling.nextElementSibling.classList.add("hide");
      // 2、去掉粉色背景
      that.classList.remove("focus2");
    } else {
      // 3、显示错误提示
      that.nextElementSibling.nextElementSibling.classList.remove("hide");
    }
    // 开锁状态，一直调用
    if (!lock) {
      window.requestAnimationFrame(fn);
    }
  }
}

// 失去焦点事件处理函数
function blurFn() {
  lock = true;
  var value = this.value.trim(); // 获取输入框中内容
  // 1、移除边框线
  this.classList.remove("focus1");
  if (!value) {
    // 2、添加粉的背景色
    this.classList.add("focus2");
    //3、文字恢复正常
    this.nextElementSibling.classList.remove("label-tip-min");
  }
}

// 点击眼睛关闭我显示
eyeButton.onclick = function () {
  var bool = this.classList.toggle("eye-open");
  if (bool) {
    password.type = "text";
  } else {
    password.type = "password";
  }
};
```

### 4、案例 6：放大镜效果



涉及知识点

- 选项卡效果、事件代理
- onmouseover、onmousemove 事件
- 事件对象：`e.pageX`、`e.pageY`
- 元素偏移尺寸：offsetLeft、offsetTop
- 操作图片的 src 属性，完成图片替换
- 元素的显示与隐藏、事件冒泡机制

![GIF2022-11-270-02-04](https://www.arryblog.com/assets/img/GIF2022-11-270-02-04.197d9b0a.gif)

### 4.1、CSS 布局

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
  .magnifier-preview {
    width: 350px;
    border: 1px solid #ddd;
    margin: 100px;
    padding: 20px;
    position: relative;
  }
  /* 主图样式 */
  .magnifier-preview .main-img {
    width: 100%;
    height: 350px;
    background-color: khaki;
    position: relative;
  }
  .magnifier-preview .main-img img {
    width: 350px;
    height: 350px;
  }
  .magnifier-preview .main-img .mask {
    width: 150px;
    height: 150px;
    background-color: rgba(252, 245, 184, 0.6);
    position: absolute;
    left: 0;
    top: 0;
    cursor: move;
    display: none; /* 一开始要隐藏 */
  }
  .magnifier-preview .small-img {
    width: 100%;
    height: 85px;
    /* background-color: skyblue; */
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .magnifier-preview .small-img li {
    width: 75px;
    height: 75px;
  }
  .magnifier-preview .small-img li img {
    width: 75px;
    height: 75px;
    cursor: pointer;
  }
  .active {
    outline: 3px solid red;
  }
  /* 大图预览样式 */
  .magnifier-preview .big-img {
    width: 450px;
    height: 475px;
    background-color: red;
    position: absolute;
    left: 400px;
    top: 0px;
    overflow: hidden;
    display: none;
  }
  .magnifier-preview .big-img img {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
<div class="magnifier-preview">
  <!-- 主图部分 -->
  <div class="main-img" id="J_main-img-wrap">
    <img src="./images/big1.jpg" alt="" width="350" />
    <div class="mask"></div>
  </div>
  <!-- 小图部分 -->
  <ul class="small-img" id="J_small-img-wrap">
    <li>
      <img
        src="./images/small1.jpg"
        width="75"
        class="active"
        data-src="./images/big1.jpg"
      />
    </li>
    <li>
      <img src="./images/small2.jpg" width="75" data-src="./images/big2.jpg" />
    </li>
    <li>
      <img src="./images/small3.jpg" width="75" data-src="./images/big3.jpg" />
    </li>
    <li>
      <img src="./images/small4.jpg" width="75" data-src="./images/big4.jpg" />
    </li>
  </ul>
  <!-- 大图预览 -->
  <div class="big-img" id="J_big-img-wrap">
    <img src="./images/big1.jpg" alt="" id="J_big-img" />
  </div>
</div>
```

### 4.2、JS 实现思路



**第一步：处理点击小图要实现的效果**

利用事件委托，点击小图后要处理的事情委托给他的们的祖先元素 ul 来处理。

> 具体代码如下：

```js
// 获取页面中的元素
var smallImgWrap = document.getElementById("J_small-img-wrap"); // 小图容器
var smallImgs = document.querySelectorAll("#J_small-img-wrap li img"); // 所有小图
var mainImg = document.querySelector("#J_main-img-wrap img"); // 主图
var bigImg = document.getElementById("J_big-img"); // 大图
var prevActiveImg = smallImgs[0]; // 保存当前被选中的小图

// 采用事件委托，把所有子元素的click事件需要处理的事情，委托他们的祖先元素来处
smallImgWrap.onclick = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  if (tagName !== "img") return;
  // 如果是img，接下来就要处理
  // 0、把之前选中的图片样式去掉
  prevActiveImg.classList.remove("active");
  // 1、给当前点击的图片添加边框
  target.classList.add("active");
  // 2、把当前点击的图片更改换为前一个击活的图片
  prevActiveImg = target;
  // 3、更换主图 获当前图片上自定义属性data-src的图片地址
  mainImg.src = target.dataset.src;
  // 4、更换大图
  bigImg.src = target.dataset.src;
};
```

**第二步：当鼠标滑动到主图容器和离开主图容器要实现的效果**



- 鼠标滑动到主图容器，要显示透明滑块，同时显示大图容器
- 鼠标离开主图容器，要隐藏透明滑块，同时隐藏大图容器

```js
var mainImgWrap = document.getElementById("J_main-img-wrap");
var mask = document.querySelector("#J_main-img-wrap .mask");
var bigImgWrap = document.getElementById("J_big-img-wrap");

// 当鼠标进入到主图区域的时，要处理的事情
mainImgWrap.onmouseover = function () {
  mask.style.display = "block";
  bigImgWrap.style.display = "block";
};

// 当鼠标离开主图区域的时候，要处理的事情
mainImgWrap.onmouseout = function () {
  mask.style.display = "none";
  bigImgWrap.style.display = "none";
};
```

**第三步：实现滑块跟随之鼠标移动，并且块的中心位置为鼠标当前所在位置**



- 我们要求得滑块相对主图容器的 left 和 top 值
- left 值 = 鼠标与浏览器左边距离 - 主图与浏览器左边距离 - 滑块宽度的一半
- top 值 = 鼠标与浏览器上边距离 - 主图与浏览器上边距离 - 滑块高度的一半

```js
// 当鼠标在主图区域上滑动时，要处理的事情
mainImgWrap.onmousemove = function (e) {
  // 鼠标与浏览器左边和顶部距离
  var pageX = e.pageX;
  var pageY = e.pageY;
  // 主图容器与浏览器左边和上边的距离
  var mainLeft = getPosition(this).left;
  var mainTop = getPosition(this).top;
  // 获取滑块的宽和高
  var maskWidth = mask.offsetWidth;
  var maskHeight = mask.offsetHeight;

  // 计算滑块的left 和 top值
  var left = pageX - mainLeft - maskWidth / 2;
  var top = pageY - mainTop - maskHeight / 2;

  // 下面限止滑块滑动的范围，代码写在这里

  // 设置滑块的left和top值。
  mask.style.left = left + "px";
  mask.style.top = top + "px";
};

// 获取当前元素与浏览器的left和top值
function getPosition(el) {
  // 获取当前元素左偏移量
  var left = el.offsetLeft;
  var top = el.offsetTop;
  // 获了当前元素的offsetParent
  var parent = el.offsetParent;
  // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
  while (parent) {
    left += parent.offsetLeft; // 与每一轮元素的父元素与其定位父元素左边距离累加
    top += parent.offsetTop;
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null);
    borderLeft = parseInt(style.borderLeftWidth); // 过滤单位部分，只取数字部分
    borderTop = parseInt(style.borderTopWidth);
    // 把左边框累加进去
    left += borderLeft;
    top += borderTop;
    parent = parent.offsetParent;
  }
  // 最终返回获取的left值
  return { left: left, top: top };
}
```

**第四步：限止滑块的滑块区域**



- 滑块能滑动的最小水平距离 = 0 ，最大水平距离 = 主图容器宽 - 滑块宽
- 滑块能滑动的最小垂直距离 = 0 ，最大垂距离 = 主图容器高 - 滑块高

```js
// 计算滑块能滑动的最大宽和高,即最大Left值和Top值,添加到mainImgWrap.onmousemove事件中
var maxLeft = this.clientWidth - maskWidth; // this= mainImgWrap
var maxTop = this.clientHeight - maskHeight; // this= mainImgWrap

// 限定元素的left 和 top值
left = left < 0 ? 0 : left; // 如果小于0，强制拉回为0
left = left > maxLeft ? maxLeft : left; // 如果大于最大left，则强制拉回为最大Left

top = top < 0 ? 0 : top;
top = top > maxTop ? maxTop : top;
```

**第五步：处理大图预览的对应移动的位置**



- 通过以下公式，来求大图对应移动的 left 和 top 值
- 滑块滑动的距离 / 滑块能滑动的最大距 = 大图移动的距离 / 大图能移动的最大距离
- 图移动的距离=（滑块滑动的距离 / 滑块能移动的最大距离） * 大图能移动的最大距离

```js
// 大图最大滑动水平距离 即 left最大值
var bigMaxLeft = bigImg.clientWidth - bigImgWrap.clientWidth;
// 大图最大滑动垂直距离，即top最大值
var bigMaxTop = bigImg.clientHeight - bigImgWrap.clientHeight;

var bigLeft = (left / maxLeft) * bigMaxLeft;
var bigTop = (top / maxTop) * bigMaxTop;
```

### 4.3、完整版代码实现

```html
<script>
  // 获取页面中的元素
  var smallImgs = document.querySelectorAll("#J_small-img-wrap li img");
  var mainImgWrap = document.getElementById("J_main-img-wrap");
  var smallImgWrap = document.getElementById("J_small-img-wrap");
  var bigImg = document.getElementById("J_big-img");
  var prevActiveImg = smallImgs[0]; // 保存当前被选中的小图
  var mainImg = document.querySelector("#J_main-img-wrap img"); // 主图
  var mask = document.querySelector("#J_main-img-wrap .mask");
  var bigImgWrap = document.getElementById("J_big-img-wrap");

  // 采用事件委托，把所有子元素的click事件需要处理的事情，委托他们的祖先元素来处
  smallImgWrap.onclick = function (e) {
    var target = e.target;
    var tagName = target.tagName.toLowerCase();
    if (tagName !== "img") return;
    // 如果是img，接下来就要处理
    // 0、把之前选中的图片样式去掉
    prevActiveImg.classList.remove("active");
    // 1、给当前点击的图片添加边框
    target.classList.add("active");
    // 2、把当前点击的图片更改换为前一个击活的图片
    prevActiveImg = target;
    // 3、更换主图
    mainImg.src = target.dataset.src; // 获当前图片上自定义属性data-src的图片地址
    // 4、更换大图
    bigImg.src = target.dataset.src;
  };

  // 当鼠标进入到主图区域的时，要处理的事情
  mainImgWrap.onmouseover = function () {
    mask.style.display = "block";
    bigImgWrap.style.display = "block";
  };

  // 当鼠标离开主图区域的时候，要处理的事情
  mainImgWrap.onmouseout = function () {
    mask.style.display = "none";
    bigImgWrap.style.display = "none";
  };

  // 当鼠标在主图区域上滑动时，要处理的事情
  mainImgWrap.onmousemove = function (e) {
    // 鼠标与浏览器左边和顶部距离
    var pageX = e.pageX;
    var pageY = e.pageY;
    // 主图容器与浏览器左边和上边的距离
    var mainLeft = getPosition(this).left;
    var mainTop = getPosition(this).top;
    // 获取滑块的宽和高
    var maskWidth = mask.offsetWidth;
    var maskHeight = mask.offsetHeight;

    // 计算滑块的left 和 top值
    var left = pageX - mainLeft - maskWidth / 2;
    var top = pageY - mainTop - maskHeight / 2;

    // 计算滑块能滑动的最大宽和高,即最大Left值和Top值
    var maxLeft = this.clientWidth - maskWidth;
    var maxTop = this.clientHeight - maskHeight;

    // 限定元素的left 和 top值
    left = left < 0 ? 0 : left; // 如果小于0，强制拉回为0
    left = left > maxLeft ? maxLeft : left; // 如果大于最大left，则强制拉回为最大Left

    top = top < 0 ? 0 : top;
    top = top > maxTop ? maxTop : top;
    mask.style.left = left + "px";
    mask.style.top = top + "px";

    // 处理大图预览
    // 滑块滑动的距离 /  滑块能滑动的最大距  =   大图移动的距离  /  大图能移动的最大距离
    // 图移动的距离=（滑块滑动的距离 / 滑块能移动的最大距离） * 大图能移动的最大距离

    var bigMaxLeft = bigImg.clientWidth - bigImgWrap.clientWidth;
    var bigMaxTop = bigImg.clientHeight - bigImgWrap.clientHeight;

    var bigLeft = (left / maxLeft) * bigMaxLeft;
    var bigTop = (top / maxTop) * bigMaxTop;

    // 大图的left和top
    bigImg.style.left = -bigLeft + "px";
    bigImg.style.top = -bigTop + "px";
  };

  // 获取当前元素与浏览器的left和top值
  function getPosition(el) {
    // 获取当前元素左偏移量
    var left = el.offsetLeft;
    var top = el.offsetTop;
    // 获了当前元素的offsetParent
    var parent = el.offsetParent;
    // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
    while (parent) {
      left += parent.offsetLeft; // 与每一轮元素的父元素与其定位父元素左边距离累加
      top += parent.offsetTop;
      // 计算父元素左边框大小
      style = getComputedStyle(parent, null);
      borderLeft = parseInt(style.borderLeftWidth); // 过滤单位部分，只取数字部分
      borderTop = parseInt(style.borderTopWidth);
      // 把左边框累加进去
      left += borderLeft;
      top += borderTop;
      parent = parent.offsetParent;
    }
    // 最终返回获取的left值
    return { left: left, top: top };
  }
</script>
```

### 4.4、性能优化版

```js
// 第一个功能，点击对应的小图，更对应主图和大图预览中的图片
// 获取页面中的元素
var smallImgs = document.querySelectorAll("#J_small-img-wrap li img");
var mainImgWrap = document.getElementById("J_main-img-wrap");
var smallImgWrap = document.getElementById("J_small-img-wrap");
var bigImg = document.getElementById("J_big-img");
var prevActiveImg = smallImgs[0];
var mainImg = document.querySelector("#J_main-img-wrap img"); // 主图
var mask = document.querySelector("#J_main-img-wrap .mask");
var bigImgWrap = document.getElementById("J_big-img-wrap");
// 采用事件委托，把所有子元素的click事件需要处理的事情，委托他们的祖先元素来处
var smallImgWrap = document.getElementById("J_small-img-wrap");
smallImgWrap.onclick = function (e) {
  var target = e.target;
  var tagName = target.tagName.toLowerCase();
  if (tagName !== "img") return;
  // 如果是img，接下来就要处理
  // 0、把之前选中的图片样式去掉
  prevActiveImg.classList.remove("active");
  // 1、给图片添加边框
  target.classList.add("active");
  // 2、把当前点击的图片更改换为前一个击活的图片
  prevActiveImg = target;
  // 2、更换主图
  mainImg.src = target.dataset.src; // 获当前图片上自定义属性data-src的图片地址
  // 3、更换大图
  bigImg.src = target.dataset.src;
};

// 鼠标滑动到主图区，要处理的事情
// 当鼠标进入到主图区域的时，要处理的事情
var maskWidth;
var maskHeight;
var bigMaxLeft;
var bigMaxTop;
mainImgWrap.onmouseover = function () {
  mask.style.display = "block";
  bigImgWrap.style.display = "block";

  // 获取滑块的宽和高
  maskWidth = mask.offsetWidth;
  maskHeight = mask.offsetHeight;

  // 大图预览能移动的最left和Top
  bigMaxLeft = bigImg.clientWidth - bigImgWrap.clientWidth;
  bigMaxTop = bigImg.clientHeight - bigImgWrap.clientHeight;
};

// 当鼠标离开主图区域的时候，要处理的事情
mainImgWrap.onmouseout = function () {
  mask.style.display = "none";
  bigImgWrap.style.display = "none";
};

// 主图容器与浏览器左边和上边的距离
var mainLeft = getPosition(mainImgWrap).left;
var mainTop = getPosition(mainImgWrap).top;
var mainImgWrapWidth = mainImgWrap.clientWidth;
var mainImgWrapHeight = mainImgWrap.clientHeight;

// 当鼠标在主图区域上滑动时，要处理的事情
// 优化点一：针对mousemove做节流操作
mainImgWrap.onmousemove = throttle(fn, 20);
function fn(e) {
  // 鼠标与浏览器左边和顶部距离
  var pageX = e.pageX;
  var pageY = e.pageY;
  // 主图容器与浏览器左边和上边的距离
  // var mainLeft = getPosition(this).left;
  // var mainTop = getPosition(this).top;
  // 获取滑块的宽和高
  // var maskWidth = mask.offsetWidth;
  // var maskHeight = mask.offsetHeight;

  // 计算滑块的left 和 top值
  var left = pageX - mainLeft - maskWidth / 2;
  var top = pageY - mainTop - maskHeight / 2;

  var maxLeft = mainImgWrapWidth - maskWidth;
  var maxTop = mainImgWrapHeight - maskHeight;

  // 限定元素的left 和 top值
  left = left < 0 ? 0 : left; // 如果小于0，强制拉回为0
  left = left > maxLeft ? maxLeft : left; // 如果大于最大left，则强制拉回为最大Left

  top = top < 0 ? 0 : top;
  top = top > maxTop ? maxTop : top;
  mask.style.left = left + "px";
  mask.style.top = top + "px";

  // 处理大图预览
  // 滑块滑动的距离 /  滑块能滑动的最大距  =   大图移动的距离  /  大图能移动的最大距离
  // 图移动的距离=（滑块滑动的距离 / 滑块能移动的最大距离） * 大图能移动的最大距离

  // var bigMaxLeft = bigImg.clientWidth - bigImgWrap.clientWidth;
  // var bigMaxTop = bigImg.clientHeight - bigImgWrap.clientHeight;

  var bigLeft = (left / maxLeft) * bigMaxLeft;
  var bigTop = (top / maxTop) * bigMaxTop;

  // 大图的left和top
  bigImg.style.left = -bigLeft + "px";
  bigImg.style.top = -bigTop + "px";
}

function getPosition(el) {
  // 获取当前元素左偏移量
  var left = el.offsetLeft;
  var top = el.offsetTop;
  // 获了当前元素的offsetParent
  var parent = el.offsetParent;
  // 如果 offsetParent 存在，则一直获取,计算他的offsetLeft值，如果不存在，则终止
  while (parent) {
    left += parent.offsetLeft; // 与每一轮元素的父元素与其定位父元素左边距离累加
    top += parent.offsetTop;
    // 计算父元素左边框大小
    style = getComputedStyle(parent, null);
    borderLeft = parseInt(style.borderLeftWidth); // 过滤单位部分，只取数字部分
    borderTop = parseInt(style.borderTopWidth);
    // 把左边框累加进去
    left += borderLeft;
    top += borderTop;
    parent = parent.offsetParent;
  }
  // 最终返回获取的left值
  return { left: left, top: top };
}

// 节流操作
function throttle(fn, delay = 20) {
  var timer = null; // null表示当前锁是打开的，没有锁，可以执行事件处理函数中的代码

  return function () {
    if (timer) return;
    var self = this; // 保存this 绑定事件的对象
    var args = arguments; // 保存arguments 主要用来获取事件对象 e
    // 定时器计时，用来开锁
    timer = setTimeout(function () {
      fn.apply(self, args); // 事件处理函数
      timer = null; // 开锁
    }, delay);
  };
}
```

## 八、手写防抖函数（经典面试题）



工作能力 ≠ 面试能力，在学习和面试之前刻意练习，强化训练。聚焦前端面试必考的刚需内容，掌握解决面试题的思路、技巧与方法论。

接下来我们学习一个非常重要的知识，如何实现 JS 防抖。在实际的开发中也是经常用到，在面试中也是必问的。所以这个知识点是我们必需要掌握的一个核心知识点。

> 以下公司面试中问到如何手写防抖函数（商汤、同花顺、广联达、百度、小红书、知乎、小米、字节）

### 1、什么是防抖 ？



- 是指只有在间隔时间达到规定时间后才会执行一次真正的事件处理函数
- 如果在规定时间内再次触发事件，则会重新计时。

接下来我们通过一个经典的**防抖案例：搜索查询**来作为切入点展开讲解。

**搜索查询 - 功能需求**

当我们在表单中输入内容时，希望在抬起键盘间隔`500ms`毫秒之后，获取输入框中输入的内容，然后再在事件处事函数中向后台发送请求，请求查询。

### 2、搜索查询 - 未实现防抖前效果



- 我们想要在键盘起后，获取输入框中的内容，然后再发送请求，请求查询
- 我们可以通过 keyup 事件来处理，但是当我们抬起键盘的那一刻就会触发 keup 事件
- 也就意味着我每输一个字，就会触发一次 keyup 事件

> 具体代码如下：

```html
搜索查询<input type="text" id="search" />
<script>
  var search = document.getElementById("search");

  search.onkeyup = function () {
    // 获取输入框内容，向后台发请求查询
    console.log(this.value);
    // ....发送请求代码省略
  };
</script>
```

![GIF 2022-10-26 1-34-17](https://www.arryblog.com/assets/img/GIF-2022-10-26-1-34-17.dcacc6ae.gif)

以上写法存在问题

- 以上效果肯定不是我们想要的，因为事件处理函数的执行频率太高了。

**期望效果**

- 我们希望的是在我们抬起键盘`500ms`后，才真正的执行一次事件处理函数中的代码。
- 如果在`500ms`以内，再次输入内容，则会重新计时，不会执行事件处理函数中的代码。

### 3、搜索查询 - 实现防抖后效果



**实现逻辑**

- 我们可以通过一个定时器来计时， 然后在定时器到达指定时间后，就执行事件处理函数中代码，向后台发送请求，请求查询
- 如果在定时器没有达到指定时间内，再次触发 keyup 事件，就把上一次的定时器清除掉，重新再开一个定时器重新计时

```html
搜索查询<input type="text" id="search" />
<script>
  var search = document.getElementById("search");
  var timer = null;
  search.onkeyup = function fn() {
    if (timer) clearTimeout(timer);
    var self = this;
    // 开启定时器
    timer = setTimeout(function () {
      // 获取输入框内容，向后台发请求查询
      console.log(self.value);
      // ....发送请求代码省略
      timer = null; // 这里很多人有争议，要不要置空
    }, 500);
  };
</script>
```

![GIF 2022-10-26 1-32-13](https://www.arryblog.com/assets/img/GIF-2022-10-26-1-32-13.22c21dbd.gif)

### 4、抽离防抖相关代码，封装成防抖函数

上一步代码中的如下代码

```js
console.log(self.value);
// ....发送请求代码省略
```

是事件触发时真正要执行的代码，我们把抽离出来封装在函数`eventFn`中，在没有实现防抖前，**eventFn 为真正的事件处理函数**。

```js
function eventFn() {
  console.log(self.value);
  // ....发送请求代码省略
}
```

上一步代码中的`fn 函数`是用来处理**防抖的函数**，也就是我们真正需要封装的防抖函数，我们把 fn 改名为`debounce`，`debounce`为防抖的意思

```html
<script>
  var search = document.getElementById("search");
  var timer = null;
  search.onkeyup = function debounce() {
    if (timer) clearTimeout(timer);
    var self = this;
    // 开启定时器
    timer = setTimeout(function () {
      eventFn();
      timer = null; // 这里很多人有争议，要不要置空
    }, 200);
  };

  // 搜索查事件处理函数
  function eventFn() {
    // 获取输入框内容，向后台发请求查询
    console.log(this.value);
    // ....发送请求代码省略
  }
</script>
```

以上 debounce 防抖函数显然还有很多不足（比如不能通用），需要我们来进一步优化

**下一步 debounce 函数优化点**



- timer 要放在 debounce 函数体内
- 在 debounce 函数体内，eventFn 事件处理函数名不能写死，要让用户自己来定义，通过参数传进去
- debounce 函数体内的定时器的延次时间也不能写死，要让用户自己来定义

```html
搜索查询<input type="text" id="search" />
<script>
  var search = document.getElementById("search");
  var timer = null;
  search.onkeyup = debounce(eventFn, 500); // 调用防抖函数

  /**
   * debounce 防抖函数
   * fn 事件处理函数
   * delay 定时器的延迟时间
   */
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      if (timer) clearTimeout(timer);
      var self = this;
      // 开启定时器
      timer = setTimeout(function () {
        fn();
        timer = null; // 这里很多人有争议，要不要置空
      }, delay);
    };
  }

  // 搜索查事件处理函数
  function eventFn() {
    // 获取输入框内容，向后台发请求查询
    console.log(this.value);
    // ....发送请求代码省略
  }
</script>
```

**再进一步优化 - 最终版**



- denounce 函数内调用的 fn 事件处理函数中的 this 和 事件对象 e 是有问题的
- `fn()`直接调用，内部 this 肯定指向的是 window，同时事件对象 e 被丢失了
- 所以我们要修改`fn()`时，内部的 this 指向，同时把事件对象 e 传递进去。

```html
搜索查询<input type="text" id="search" />
<script>
  var search = document.getElementById("search");
  var timer = null;
  search.onkeyup = debounce(eventFn, 500);

  /**
   * debounce 防抖函数
   * fn 事件处理函数
   * delay 定时器的延迟时间
   */
  function debounce(fn, delay) {
    var timer = null;
    return function () {
      if (timer) clearTimeout(timer);
      var self = this;
      var args = arguments;
      // 开启定时器
      timer = setTimeout(function () {
        fn.apply(self, args);
        timer = null; // 这里很多人有争议，要不要置空
      }, delay);
    };
  }

  // 搜索查事件处理函数
  function eventFn() {
    // 获取输入框内容，向后台发请求查询
    console.log(this.value);
    // ....发送请求代码省略
  }
</script>
```

### 5、ES5 版本 - 防抖函数

```js
/**
   * debounce 防抖函数
   * @param fn 事件处理函数
   * @param delay 延迟时间
  */
function debounce(fn, delay=200) {
    var timer = null;
    // 以下是每次需要执行的代码
    return function () {
        if (timer) clearTimeout(timer);
        var self = this;
        var args = arguments;
        // 开启定时器
        timer = setTimeout(function () {
            fn.apply(self, args);
            timer = null; // 这里很多人有争议，要不要置空
        }, delay);
    };
```

### 6、ES6 版本 - 防抖函数

```js
/**
 * debounce 防抖函数
 * @param fn 事件处理函数
 * @param delay 延迟时间
 */
function debounce(fn, delay = 200) {
  var timer = null;
  // 以下是每次需要执行的代码
  return function () {
    if (timer) clearTimeout(timer);
    // 开启定时器
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null; // 这里很多人有争议，要不要置空
    }, delay);
  };
}
```

### 7、区分防抖与节流

不同点

- 节流：不管事件触发有多频繁，都会保证在规定时间内执行一次真正的事件处理函数
- 防抖：只有在间隔时间达到规定时间后才会执行一次真正的事件处理函数，如果在规定时间内再次触发事件，则会重新计时。

**相同点**

- 都可通通过使用 setTimeout 来实现
- 都是降低真正的事件处理函数的执行频率，达到节省计算资 源，减少性能的消耗

**节流应用场景**

- 搜索框输入查询、手机号、邮箱验证输入检测。
- resize 事件，只需在窗口调整完后，计算窗口大小，防止重复渲染

**防抖应用场景**

- scroll 滚动事件，判断是否滚动到页面底部，自动加载更多内容
- mousemove 事件，当拖拽页面元素，或鼠标根随效果
- 防止高频点击提交，防止表单重复提交

## 九、重难点总结



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点



- 1、掌握 setTimeout 和 setInterval 的用法，及如何清除定时器
- 2、理解同步与异步
- 3、定时器的延时和丢帧问题
- 4、requestAnimationFrame 的用法和优点和兼容处理
- 5、常握过渡事件和动画事件

### 2、难点



- 1、封装动画函数
- 2、封装拖拽函数
- 3、手写防抖和节流函数
- 4、手写以下案例
  - 带左右按扭的自动轮播图
  - 转盘抽奖
  - 红包雨
  - 拖拽交换两元素位置
  - 键盘控制元素运动
  - 表单全选和取消
  - 表单验证提示效果
  - 放大镜效果