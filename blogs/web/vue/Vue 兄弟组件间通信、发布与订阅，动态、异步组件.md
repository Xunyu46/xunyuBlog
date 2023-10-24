---
title: Vue 兄弟组件间通信、发布与订阅，动态、异步组件
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
  - 组件通信
publish: true
---

# Vue 兄弟组件间通信、发布与订阅，动态、异步组件

从本节内容开始，我们正式深入 Vue 组件的学习，也是组件学习过程中非常重要的部分

- Vue 兄弟组件间通信 - 发布与订阅
- 动态组件
- 异步组件

## [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#一、兄弟组件间通信-发布与订阅)一、兄弟组件间通信 - 发布与订阅

本小节我们重点学习兄弟组件间通信的两种方式：

- 借助父组件完成兄弟组件间通信
- 利用发布订阅模式实现兄弟组件间通信。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_1、借助父组件完成兄弟组件通信)1、借助父组件完成兄弟组件通信

> 下图中的组件 A 与组件 B 为兄弟组件，组件 App 为他们共同的父组件。

![image-20230625154316778](data:image/png;base64,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)

注：

如果组件 A 需要把变量 state 的值传递给到组件 B，可以先把 state 的值传递给到父组件 App，然后父组件 App 再把 state 的值传递给到 B 组件。

**实现原理**

- 把变量 state 定义在 App 组件中，然后通过自定义属性递给到 B 组件。
- 在 App 组件中监听自定义事件`on-state`，当事件触发时修改 state 的值。
- 在 A 组件中触发`onState`事件，来修改 state 的值

**代码示例**

`App.vue`文件

- 把变量`state`定义在组件`<App>`中，同时监听`on-state`事件，在事件触发时调用`setState`方法修改`state`变量的值。
- 把变量`state`作为属性传递到 B 组件内部

```html
<script>
  import A from "./components/A.vue";
  import B from "./components/B.vue";
  export default {
    data() {
      return {
        state: 1,
      };
    },
    components: {
      A,
      B,
    },
    methods: {
      setState(value) {
        this.state = value;
      },
    },
  };
</script>

<template>
  <a @on-state="setState"></a>
  <b :state="state"></b>
</template>
```

`A.vue`文件，在 A 组件中，触发`onState`事件，修改 state 的值

```html
<script>
  export default {
    emits: ["onState"],
  };
</script>
<template>
  <button @click="$emit('onState', 10)">A组件中修改state的值</button>
</template>
```

`B.vue`文件，在 B 组件中接受传递过的 state 属性值，并显示

```html
<script>
  export default {
    props: ["state"],
  };
</script>
<template>
  <div>B组件中state的值：{{ state }}</div>
</template>
```

> 以上代码，最终实现效果如下：

![GIF2023-6-2515-17-04](https://www.arryblog.com/assets/img/GIF2023-6-2515-17-04.ea42012c.gif)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_2、借助父组件通信的问题)2、借助父组件通信的问题

通过前面例子，我们知道借助父组件完兄弟组件间通信显然是非常麻烦的，原本属于 A 组件的 state 属性需要定义在 App 组件中，造成了数据管理的混乱。

> 如果通信的两个组件层级较深，如下图

![image-20230625154139583](https://www.arryblog.com/assets/img/image-20230625154139583.545b8faa.png)

注：

A1 组件需要与 B1 组件通信，则数据传递链接从 A1 -> A -> App -> B -> B1 。这显然是非常麻烦，而且数据的管理将会变得更加混乱。

接下来讲到的发布与订阅模式是一种非常好的兄弟组件间通信的方式，他可以让 A1 组件直接与 B1 组件通信，不需要借助其它组件。

![image-20230625155110811](data:image/png;base64,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)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3、发布与订阅模式)3、发布与订阅模式

发布与订阅模式其实是对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

**现实中的发布订阅模式**

比如小明最近看上了 xx 楼盘的房子，但是该楼盘还没有正式对外销售， 具体对外正式销售时间不清楚，于时小明每天都要打电话到售楼部问售楼 MM 楼盘对外销售时间。

如果有 100 个人都等着该楼盘，那售楼 MM 每天都要接到 100 个电话，而且回答的问题都是一样的，那估计售楼 MM 肯定会崩溃的离职。好在售楼 MM 很聪明，她让这 100 个人加上她的微信，等到楼盘一但对外销售，就会第一时间给这 100 个人群发消息通知他们。

**你眼里的发布者与订阅者**

你可以理解上面的售楼 MM 就是发布者，小明等购房者就是订阅者。但如果站在更全面的角度来思考，这样理解是不太准确的。

**真实的发布者与订阅者**

在实际生活中，我们知道售楼部其实是一个一中介，他负责给房地产公司发布售楼相关的消息，同时购买者通过售数部订阅售楼消息。所以

- **发布者**：是房产公司，因为真正要对外发布售楼信息的是房产公司，而售楼部只是代替房产公司对外发布消息。
- **订阅者**：是购买房子的用户，他需要向售楼部订阅房产公司的售楼消息
- **发布订阅中心**：是售楼中心，房产公司找售楼部发布售楼消息，购房者找售楼部订阅售楼消息

> 由此可以知道，发布消息与订阅消息的接口都是发布订阅中心提供的。

发布订阅的本质

发布订阅核心基于一个中心来建立整个体系。其中**发布者和订阅者不直接进行通信**，而是发布者将要发布的消息交由中心管理，订阅者也是根据自己的情况，按需订阅订阅中心的消息

> 我们用下面一张图来描述发布订阅模式

![image-20230625190918103](https://www.arryblog.com/assets/img/image-20230625190918103.92b9902b.png)

发布订阅中心提供了**发布消息**和**订阅消息**的**接口**（API 方法），发布者调用发布消息接口即可发布消息，订阅者调用订阅消息接口就可以订阅消息。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3-1、简单版-发布与订阅)3.1、简单版：发布与订阅

我们以上面售楼的故事为例子，利用 JS 实现简单版的发布与订阅。

**实现思路**

- ①、定义一个对象，充当售楼部（发布订阅中心）
- ②、在该对象上创建一个缓存列表，存放订阅的事件（消息），相当于存放订阅者微信号
- ③、在对象上添加 on 方法，用于订阅消息，调用 on 方法把订阅的事件都添加到缓存列表中，相当于注册（监听）事件
- ④、在对象上添加 emit 方法，用于发布消息，调用 emit 方法来触发事件（相当于发布消息）

```js
// 1、定义一个对象，充当售楼部（发布订阅中心）
let salesOffices = {};
// 2、在该对象上创建一缓存列表，存放订阅的事件（消息），相当于存放订阅者微信号
salesOffices.clientList = [];
// 3、添加订阅方法，将订阅的事件（消息）添加进缓存列表
salesOffices.on = function (fn) {
  // 订阅的消息添加进缓存列表
  this.clientList.push(fn);
};
// 4、添加emit方法，用于发布消息
// 发布消息时，会去遍历缓存列表中的回调函数，并执行。相当于触发事件的事件处理函数
salesOffices.emit = function () {
  for (let i = 0; i < this.clientList.length; i++) {
    // 修改订阅者回调内的this
    // 发布消息时会带上一些消息相关的信息，这些信息做为参数传入即：arguments
    this.clientList[i].apply(this, arguments);
  }
};
```

> 测试以上代码

```js
// 小明订阅消息
salesOffices.on((area, price) => {
  console.log(`当前房子面积是:${area}平方米，价格为:${price}万`);
});
// 小花订阅消息
salesOffices.on((area, price) => {
  console.log(`当前房子面积是:${area}平方米，价格为:${price}万`);
});

// 售楼部发布消息
salesOffices.emit(2000000, 110);
salesOffices.emit(1000000, 55);
```

> 最终在控制台输出如下内容

![image-20230625171815424](https://www.arryblog.com/assets/img/image-20230625171815424.71458925.png)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3-2、按主题发布与订阅)3.2、按主题发布与订阅

上面我们已经实现了一个简单的发布与订阅模式，但还存在一些问题。我们看到订阅者接收到了发布者的每一个消息。如果小明只想买 55 平方米的房子，那发布者就不应该把 110 平方米房子的信息推送给小明，因为这对小明来说是一种困扰。

所以订阅者在订阅消息时应该要根据主题来订阅，发布者在发布消息时也要根据主题来发布，只有订阅了该主题的订阅者才能收到该主题发布的消息。

> 我们需要把缓存列表，修改成一个对象，根据订阅的主题来存放订阅者的回调函数

```js
salesOffices.clientList = {};
```

> 以下代码实现了按主题订阅和发布消息

```js
// 1、定义一个对象，充当售楼部（发布订阅中心）
let salesOffices = {};
// 2、在该对象上创建一缓存列表，存放订阅的事件（消息）
// 订阅的事件（消息）分为：事件名与事件处理函数，所以我们用一个对象来存放
salesOffices.clientList = {};
// 3、增加订阅事件，key为事件名，fn为事件名对应的事件处理函数
salesOffices.on = function (key, fn) {
  // 如果没有订阅此事件名，给该事件名创建一个缓存事件处理函数的列表
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  // 将事件处理函数添加到事件名对应的事件处理函数缓存列表
  this.clientList[key].push(fn);
};
// 4、售楼处发布消息
// 发布消息时，会根据事件名去遍历对应缓存列表中的事件处理函数，并执行。相当于触发事件的事件处理函数
salesOffices.emit = function () {
  // 取出事件名
  let key = Array.prototype.shift.call(arguments);
  // 根据事件名取出对应的缓存列表
  const fns = this.clientList[key];

  // 如果没有订阅
  if (!fns || fns.length === 0) {
    return false;
  }
  for (let i = 0; i < fns.length; i++) {
    // 修改订阅者回调内的this
    // 发布者在发布消息时会带上一些消息相关的信息，这些信息做为参数传入即：arguments
    fns[i].apply(this, arguments);
  }
};
```

> 测试以上代码

```js
// 小明订阅消息
salesOffices.on("area110", (area, price) => {
  console.log(`当前房子面积是:${area}平方米，价格为:${price}万`);
});
// 小花订阅消息
salesOffices.on("area80", (area, price) => {
  console.log(`当前房子面积是:${area}平方米，价格为:${price}万`);
});

// 售楼部发布消息
salesOffices.emit("area110", 2000000, 110);
salesOffices.emit("area80", 1000000, 55);
```

> 最终在控制台输出如下内容

![image-20230625175159258](https://www.arryblog.com/assets/img/image-20230625175159258.bb0b7456.png)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3-3、完整版-发布与订阅)3.3、完整版：发布与订阅

一个完整的发布订阅应该包含以下 4 个方法

- on 方法：用来订阅事件，即根据事件名添加对应的事件处理回调函数到对应缓存列表
- emit 方法：用来触发事件，即根据事件名查询缓存列表中的事件处理函数，并执行。
- off 方法：用来取消订阅事件，即根据事件名查询缓存列表中的事件处理函数，并从列表中移除。
- once 方法：用来订阅事件，但只订阅一次，即事件触发后，就会取消该事件的订阅

```js
// 1、定义一个对象，充当售楼部（发布订阅中心）
let salesOffices = {};
// 2、在该对象上创建一缓存列表，存放订阅的事件（消息）
// 订阅的事件（消息）分为：事件名与事件处理函数，所以我们用一个对象来存放
salesOffices.clientList = {};
// 3、增加订阅事件，key为事件名，fn为事件名对应的事件处理函数
salesOffices.on = function (key, fn) {
  // 如果没有订阅此事件名，给该事件名创建一个缓存事件处理函数的列表
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  // 将事件处理函数添加到事件名对应的事件处理函数缓存列表
  // this.clientList[key].push(fn)
  this.clientList[key].unshift(fn);
};
// 4、售楼处发布消息
// 发布消息时，会根据事件名去遍历对应缓存列表中的事件处理函数，并执行。相当于触发事件的事件处理函数
salesOffices.emit = function () {
  // 取出事件名
  let key = Array.prototype.shift.call(arguments);
  // 根据事件名取出对应的缓存列表
  const fns = this.clientList[key];
  // 如果没有订阅
  if (!fns || fns.length === 0) {
    return false;
  }
  // 注意，这里要从后放前遍历，因为once的事件会执行一次后被取消
  for (let i = fns.length - 1; i >= 0; i--) {
    // 修改订阅者回调内的this
    // 发布者在发布消息时会带上一些消息相关的信息，这些信息做为参数传入即：arguments
    fns[i].apply(this, arguments);
  }
};

// 5、取消订阅
salesOffices.off = function (key, fn) {
  // 根据事件名取出对应的缓存列表
  const fns = this.clientList[key];
  // 如果没有订阅
  if (!fns || fns.length === 0) {
    return false;
  }
  // 不传订阅事件处理函数，意味着取消所有订阅
  !fn && fns && (fns.length = 0);
  // 传了事件处理函数，取消事件对应的事件处理函数
  for (let i = 0; i < fns.length; i++) {
    // 注意要判断 fns[i].fn===fn,主要用来判断once绑定时
    if (fns[i] === fn || fns[i].fn === fn) {
      fns.splice(i, 1);
      break;
    }
  }
};

// 6、只订阅一次
salesOffices.once = function (key, fn) {
  const _that = this;
  // emit触发时，执行的是on这个方法
  function on() {
    // 先执行一次，再取消
    fn.apply(_that, arguments);
    // 先取消
    _that.off(key, on);
  }
  // 取消时，要判断on.fn===fn，如果等于，则移除该项
  on.fn = fn;
  // 订阅
  this.on(key, on);
};
```

**以上代码有几个需要注意的点**

- emit 方法中，遍历事件名对应的缓存列表，改成从后往前遍历。因为 once 订阅事件只订阅一次，触发一次后就会从列表中删除，造成数组长度变短，后续事件处理函数无法被执行

```js
/*
for (let i =0 ; i < fns.length; i++) {
    fns[i].apply(this, arguments)
}
*/

for (let i = fns.length - 1; i >= 0; i--) {
  fns[i].apply(this, arguments);
}
```

- on 方法中，将事件处理函数添加到事件名对应的缓存列表，改成从前往后加入。这样做的目的是保证从后往前遍历缓存列表时，先触发的是先订阅的事件。

```js
// this.clientList[key].push(fn)
this.clientList[key].unshift(fn);
```

- off 方法中，在移除事件名对应的事件处理函数时，要考虑 once 绑定的情况。

```js
/*
	for (let i = 0; i < fns.length; i++) {
        // 注意要判断 fns[i].fn===fn , 主要用来判断once绑定时
        if (fns[i] === fn) {
            fns.splice(i, 1);
            break;
        }
    }
*/

for (let i = 0; i < fns.length; i++) {
  // 注意要判断 fns[i].fn===fn , 主要用来判断once绑定时
  if (fns[i] === fn || fns[i].fn === fn) {
    fns.splice(i, 1);
    break;
  }
}
```

> 最后，测试以上代码

```js
const fna1 = function () {
  console.log("fna1");
};
const fna2 = function () {
  console.log("fna2");
};
const fnb = function () {
  console.log("fnb");
};
salesOffices.once("a", fna1);
salesOffices.once("a", fna2);
salesOffices.on("a", fna2);
salesOffices.on("b", fnb);

salesOffices.emit("a");
salesOffices.emit("a");
salesOffices.emit("b");
```

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3-4、发布与订阅模式实现组件间通信)3.4、发布与订阅模式实现组件间通信

> 接下来我们利用发布与订阅来实现 A 组件与 B 组件间的通信，实现原理如下图：

![image-20230625231009216](https://www.arryblog.com/assets/img/image-20230625231009216.9ecc7647.png)

- 在`main.js`中将订阅发布对象 pubsub（相当前面说的 salesOffices）绑定到全局`$event`变量上，这样在任意组件内部就可以通过`this.$event`访问到`pubsub`对象

```js
app.config.globalProperties.$event = pubsub;
```

- 在 B 组件中订阅`setState`事件，在事件回调函数中接受传过来的值`state`值

```js
// $event 为订阅发布中心
this.$event.on("setState", (state) => {
  this.state = state;
});
```

- 当组件 A 中 state 变量值发生变化时，触发`setState`事件，将 state 变量的值做为 emit 方法参数传入

```js
this.state = 10;
this.$event.emit("setState", this.state);
```

**完整代码**

> 创建项目目录结构如下：

```js
vue-project
├─ index.html
├─ src
│  ├─ App.vue
│  ├─ common
│  │  └─ pubsub.js   // js实现发布订阅内容
│  ├─ components
│  │  ├─ A.vue
│  │  └─ B.vue
│  └─ main.js
├─ package-lock.json
├─ package.json
└─ vite.config.js
```

- `src/common/pubsub.js`文件内容如下：

```js
// 1、定义一个对象，充当售楼部（发布订阅中心）
let event = {};
// 2、在该对象上创建一缓存列表，存放订阅的事件（消息）
// 订阅的事件（消息）分为：事件名与事件处理函数，所以我们用一个对象来存放
event.clientList = {};
// 3、增加订阅事件，key为事件名，fn为事件名对应的事件处理函数
event.on = function (key, fn) {
  // 如果没有订阅此事件名，给该事件名创建一个缓存事件处理函数的列表
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  // 将事件处理函数添加到事件名对应的事件处理函数缓存列表
  // this.clientList[key].push(fn)
  this.clientList[key].unshift(fn);
};
// 4、售楼处发布消息
// 发布消息时，会根据事件名去遍历对应缓存列表中的事件处理函数，并执行。相当于触发事件的事件处理函数
event.emit = function () {
  // 根据事件名取出对应的缓存列表
  let key = Array.prototype.shift.call(arguments);
  const fns = this.clientList[key];
  // 如果没有订阅
  if (!fns || fns.length === 0) {
    return false;
  }
  // 注意，这里要从后放前遍历，因为once的事件会执行一次后被取消
  for (let i = fns.length - 1; i >= 0; i--) {
    // 修改订阅者回调内的this
    // 发布者在发布消息时会带上一些消息相关的信息，这些信息做为参数传入即：arguments
    fns[i].apply(this, arguments);
  }
};

// 5、取消订阅
event.off = function (key, fn) {
  // 根据事件名取出对应的缓存列表
  const fns = this.clientList[key];
  // 如果没有订阅
  if (!fns || fns.length === 0) {
    return false;
  }
  // 不传订阅事件处理函数，意味着取消所有订阅
  !fn && fns && (fns.length = 0);
  // 传了事件处理函数，取消事件对应的事件处理函数
  for (let i = 0; i < fns.length; i++) {
    // 注意要判断 fns[i].fn===fn,主要用来判断once绑定时
    if (fns[i] === fn || fns[i].fn === fn) {
      fns.splice(i, 1);
      break;
    }
  }
};

// 6、只订阅一次
event.once = function (key, fn) {
  const _that = this;
  // emit触发时，执行的是on这个方法
  function on() {
    // 先执行一次，再取消
    fn.apply(_that, arguments);
    // 先取消
    _that.off(key, on);
  }
  // 取消时，要判断on.fn===fn，如果等于，则移除该项
  on.fn = fn;
  // 订阅
  this.on(key, on);
};

export default event;
```

- `src/main.js`文件内容

```js
import { createApp } from "vue";
import App from "./App.vue";
// 导入 pubsub 对象
import pubsub from "./common/pubsub.js";

const app = createApp(App);
// 将pubsub对象绑定到全局$event变量上，这样在组件内部就可以通过this.$event访问到pubsub对象
app.config.globalProperties.$event = pubsub;

app.mount("#app");
```

- `App.vue`文件内容

```html
<script>
  import A from "./components/A.vue";
  import B from "./components/B.vue";
  export default {
    components: {
      A,
      B,
    },
  };
</script>

<template>
  <a></a>
  <b></b>
</template>
```

- `A.vue`文件内容

```html
<script>
  export default {
    data() {
      return {
        state: 1,
      };
    },
    methods: {
      update() {
        this.state = 10; // 修改 state的值
        // 在A组件中发布消息（即触发事件），将this.state的值传递给到B组件
        this.$event.emit("setState", this.state);
      },
    },
  };
</script>
<template>
  <button @click="update">更改state的值</button>
</template>
```

- `B.vue`文件内容

```html
<script>
  export default {
    data() {
      return {
        state: 0,
      };
    },
    created() {
      // 订阅（监听）setState事件
      // 在事件处理函数中接受传过来的state的值，并将其赋值给B组件中的state变量
      this.$event.on("setState", (value) => {
        console.log(value);
        this.state = value;
      });
    },
  };
</script>
<template>
  <div>B组件中state的值：{{ state }}</div>
</template>
```

> 整个项目最终渲染效果如下：

![GIF2023-6-2523-18-34](https://www.arryblog.com/assets/img/GIF2023-6-2523-18-34.4505f4f7.gif)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_4、mitt-插件)4、mitt 插件

[mitt 插件 (opens new window)](https://www.npmjs.com/package/mitt)就是一款实现发布与订阅功能的插件。

如果我们不想自己手写发布与订阅，在 Vue3 中就可以借助 mitt 插件来帮我们实现。

**在 Vue3 中使用 mitt 插件的步骤如下：**

- 执行以下命令在项目中安装 mitt 插件

```shell
npm install --save mitt
```

- 在`main.js`中导入 mitt 对象，并注册为全局变量，这样就可以任意组件中通过`this.$event`来访问

```js
// 导入 mitt
import mitt from "mitt";
const app = createApp(App);
// 注册为全局变量 $event
app.config.globalProperties.$event = mitt();
app.mount("#app");
```

- mitt 插件提供了以下方法来实现订阅与发布。

```js
// 添加事件监听
this.$event.on("foo1", fn);
this.$event.on("foo2", fn);

// 移除事件监听
this.$event.off("foo1", fn);

// 移除所有事件监听
this.$event.all.clear();

// 触发事件
this.$event.emit("foo1", 1);
this.$event.emit("foo2", 2);
```

注：

该插件没有 once 方法，如果需要 once 方法，推荐大家使用 [tiny-emitter (opens new window)](https://www.npmjs.com/package/tiny-emitter)插件，用法一样

针对前面提到的 A 组件与 B 组件通信的案例，你只需要安装好 mitt 插件，然后把`main.js`内容替换成以上内容，其实现效果如前面一样。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_5、总结)5、总结

> 兄弟组件间通信可以采用以下两种方式：

**借助父组件完成兄弟组件间通信**

- 这种方式并不是最适合的方式，其中最大的问题就是使用起来较复杂，而且数据管理混乱。所以实际开发中很少用

**利用发布订阅模式实现兄弟组件间通信**

- 这种方式使用起来比较方便，如果自己不会手动实现订阅与发布可以借助`mitt`或`tiny-emitter`插件来实现。
- 不过这种方式也有一定的缺陷，对于代码的根踪和维护不方便。我们在一个组件中使用了`on`方法订阅事件，我们很难追踪到该事件是由那个组件触发的，所以在使用时一定要加好注释。
- 在触发事件的组件中要备注好订阅该事件的组件
- 在订阅事件的组件中要备注好触发事件的组件

> 发布与订阅模式不仅可以用来实现兄弟组件间通信，其实也可以用来实现任意组件间通信。

后面我们还会讲到`pinia`全局状态管理，他可以实现任意组件间通信，并且他在代码维护和跟踪上都较方便。

## [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#二、动态组件)二、动态组件

> 在有些场景下，我们需要在两个或多个组件间来回切换，如下图所示的 Tab 选项卡

![GIF2023-5-1621-34-26](data:image/gif;base64,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)

我们就可以利用本小节讲到的`<component>`内置组件来帮助我们实现动态渲染组件。当然我们也可以用前面学过的`v-if`或`v-show`来实现。

我们先用`v-if`或`v-show`来实现这个效果，然后再用`<component>`内置组件来实现，通过两者对比，看那种方式更简单。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_1、v-if-或-v-show-实现选项卡效果)1、v-if 或 v-show 实现选项卡效果

- `App.vue`根组件

```html
<script>
  import Tab1 from "./components/Tab1.vue";
  import Tab2 from "./components/Tab2.vue";
  import Tab3 from "./components/Tab3.vue";
  export default {
    data() {
      return {
        currentTab: "Tab1",
      };
    },
    components: {
      Tab1,
      Tab2,
      Tab3,
    },
  };
</script>

<template>
  <div class="container">
    <div class="tab-title">
      <button
        @click="currentTab = 'Tab1'"
        :class="{ active: currentTab === 'Tab1' }"
      >
        Tab1
      </button>
      <button
        @click="currentTab = 'Tab2'"
        :class="{ active: currentTab === 'Tab2' }"
      >
        Tab2
      </button>
      <button
        @click="currentTab = 'Tab3'"
        :class="{ active: currentTab === 'Tab3' }"
      >
        Tab3
      </button>
    </div>

    <div class="tab-content">
      <Tab1 v-show="currentTab === 'Tab1'" />
      <Tab2 v-show="currentTab === 'Tab2'" />
      <Tab3 v-show="currentTab === 'Tab3'" />
    </div>
  </div>
</template>
<style>
  button {
    width: 80px;
    height: 40px;
    border: none;
    margin-right: 10px;
    cursor: pointer;
  }

  .active {
    background-color: skyblue;
  }

  .tab {
    width: 400px;
    min-height: 100px;
    background-color: #ddd;
    margin-top: 10px;
  }
</style>
```

- `Tab1.vue`、`Tab2.vue`、`Tab3.vue` 内容如下

```html
<!--Tab1.vue-->
<script></script>
<template>
  <div class="tab tab1">
    <input type="text" />
    Tab1111.....内容....
  </div>
</template>

<!--Tab2.vue-->
<script></script>
<template>
  <div class="tab tab1">Tab2222.....内容....</div>
</template>

<!--Tab3.vue-->
<script></script>
<template>
  <div class="tab tab1">Tab3333.....内容....</div>
</template>
```

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_2、动态组件-component)2、动态组件 component

- `<component>`是一个内置组件，用来渲染动态组件或元素的"元组件"。
- 该组件的`is`属性决定了最终要渲染的实际组件。

```html
<component is="Tab1" />
<!--最终要渲染的是Tab1组件-->
```

is 属性值

- 当

  ```
  is
  ```

  的值是字符串时，他既可以是 HTML 标签名也可以是组件的注册名。

  - 如果为`HTML`标签，则最终渲染出对应的 HTML 元素。
  - 如果为注册的组件名，则最终渲染这个组件

- 在组合式 API 中，`:is`也可以直接绑定到组件的定义

**示例**

- 按 HTML 元素的标签名，来渲染 HTML 元素

```html
<component is="a" href="http://www.icodingedu.com">艾编程</component>
<!--最终渲染结果如下-->
<a href="http://www.icodingedu.com">艾编程</a>
```

- 按组件名来渲染组件

```html
<script>
  import List from "./components/List.vue";
  export default {
    components: {
      List,
    },
  };
</script>
<template>
  <!--List为组件名-->
  <component is="List"></component>
</template>
```

- 按组件的定义来渲染组件

```html
<script setup>
  import { h } from "vue";
  // 自定义组件
  const MyComponent = {
    render: () => {
      return h("div", "组件定义对象");
    },
  };
</script>
<template>
  <component :is="MyComponent"></component>
</template>
<script setup>
  import A from "./components/A.vue";
</script>
<template>
  <component :is="A"></component>
</template>
```

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3、component-实现-tab-选项卡)3、component 实现 Tab 选项卡

同比上面用`v-if`实现 Tab 选项卡，内容只需要做如下变动

- 把`App.vue`文件中`tab-conent`元素中内容

```html
<div class="tab-content">
  <Tab1 v-show="currentTab === 'Tab1'" />
  <Tab2 v-show="currentTab === 'Tab2'" />
  <Tab3 v-show="currentTab === 'Tab3'" />
</div>
```

- 替换成如下内容

```html
<div class="tab-content">
  <component :is="currentTab"></component>
</div>
```

> 观察修改后的代码可以得出，使用动态组件来实现，代码相对要简洁。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_4、动态渲染-tab-选项卡)4、动态渲染 Tab 选项卡

```html
<script>
  import Tab1 from "./components/Tab1.vue";
  import Tab2 from "./components/Tab2.vue";
  import Tab3 from "./components/Tab3.vue";
  export default {
    data() {
      return {
        currentTab: "Tab1", // 当前渲染的组件
        active: 0, // 被激活的下标
        tab: [
          {
            name: "Tab1组件",
            com: "Tab1",
          },
          {
            name: "Tab2组件",
            com: "Tab2",
          },
          {
            name: "Tab3组件",
            com: "Tab3",
          },
        ],
      };
    },
    components: {
      Tab1,
      Tab2,
      Tab3,
    },
    methods: {
      change(index, item) {
        this.active = index;
        this.currentTab = item.com;
      },
    },
  };
</script>
<template>
  <div class="container">
    <div class="tab-title">
      <button
        v-for="(item, index) in tab"
        :class="[active === index ? 'active' : '']"
        @click="change(index, item)"
      >
        {{item.name }}
      </button>
    </div>

    <div class="tab-content">
      <component :is="currentTab"></component>
    </div>
  </div>
</template>
<style>
  button {
    width: 80px;
    height: 40px;
    border: none;
    margin-right: 10px;
    cursor: pointer;
  }

  .active {
    background-color: skyblue;
  }

  .tab {
    width: 400px;
    min-height: 100px;
    background-color: #ddd;
    margin-top: 10px;
  }
</style>
```

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_5、注意事项)5、注意事项

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载，这会导致丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

![GIF2023-5-1711-52-57](https://www.arryblog.com/assets/img/GIF2023-5-1711-52-57.25816480.gif)

注：

上图中，最开始在 Tab1 选项下的输入框中输入了内容，然后切换到 Tab2，随后再切找到 Tab1 时，输入框中的内容没有了。因为组件在被切换掉后会被卸载，再次切换回来相当于 Tab1 组件被重新渲染了。

但在实际开发中，我们希望组件被“切走”的时候保留言它们的状态。要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来，这样被切换掉的组件仍然保持“存活”的状态。

> `<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

```html
<KeepAlive>
  <component :is="currentTab"></component>
</KeepAlive>
```

> 将动态组件用`<KeepAlive>`内置组件包裹后，最终渲染效果如下：

![GIF2023-5-1712-07-23](data:image/gif;base64,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)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_6、总结)6、总结

> 本小节我们重点掌握以下内容

**动态组件`<component>`的用法**

- `<component>`内置组件的`is`属性决定了最终要渲染的实际组件

- ```
  is
  ```

  属性的值可以是

  - 字符串类型的标签名
  - 字符串类型的组件名
  - 组件的定义对象

```html
<component :is="currentTab"></component>
<component :is="a" href="xx"></component>
```

动态组件注意事项

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。如果我们想要在组件被切换掉后仍保持”存活“的状态，可以将动态组件包裹在`<KeepAlive>`内置组件中。

> 当`<component>`用`<KeepAlive>`包裹后，组件被切换后，生命周期函数`unmounted`和`beforeUnmount`周期函数不会被触发

## [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#三、异步组件)三、异步组件

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件，这时候就可以使用异步组件。Vue 提供了 `defineAsyncComponent`方法来定义一个异步组件。

> 本小节涉及主要内容如下：

- 如何定义一个异步组件
- 异步组件的基本使用
- 异步组件按需加载
- 异步组件加载与错误状态

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_1、方法定义一个异步组件)1、方法定义一个异步组件

`defineAsyncComponent`方法用来定义一个异步组件，该方法接受一个参数，参数可以是一个返回`Promise`的加载函数。

- 在组件加载成功后调用`resolve`方法，把获取到的组件作为`resolve`方法的参数传入。
- 在组件加载失败后调用`reject`方法，可以传入一个错误对象，对外告知组件加载失败

```js
import { defineAsyncComponent } from "vue";
// 定义一个异步组件
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */);
  });
});
```

在实际开发中我们会利用`import()`方法来导入一个组件，因为`import()`方法返回的也是一个 Promise 对象，所以我们通常会使用以下方式来定义一个异步组件

```js
import { defineAsyncComponent } from "vue";
// 定义一个异步组件
const AsyncComp = defineAsyncComponent(() =>
  import("./components/AsyncComp.vue")
);
```

最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_2、异步组件的基本使用)2、异步组件的基本使用

异步组件即可以注册为全局的，也可以组册为局部的，其方式与普通组件一样。

**将异步组件注册为局部组件**，并使用，需要经过以下三步

- 先利用`defineAsyncComponent`方法定义一个异步组件
- 再在使用该异步组件的组件`components`选项中注册该组件
- 最后就可以直接在父组件模板中通过注册名来使用组件

```html
<script>
  import { defineAsyncComponent } from "vue";
  // 第一步： 定义一个异步组件
  const AsyncComp = defineAsyncComponent(() =>
    import("./components/AsyncComp.vue")
  );

  export default {
    // 第二步：注册成局部组件
    components: {
      AsyncComp: AsyncComp,
    },
  };
</script>

<template>
  <!--第三步：使用组件-->
  <AsyncComp />
</template>
```

**将异步组件注册为全局组件**，并使用，需要经过以下三步：

- 先利用`defineAsyncComponent`方法定义一个异步组件
- 使用`app.component()`方法将组件全局注册，注册后的异步组件在整个应用中全局可用
- 在需要使用该组件的组件模板中通过注册名来使用组件

```js
// 导入defineAsyncComponent方法，定义异步组件
import { defineAsyncComponent } from "vue";

// 第一步：定义异步组件
const AsyncComp = defineAsyncComponent(() =>
  import("./components/AsyncComp.vue")
);
// 第二步：全局注册
app.component("AsyncComp", AsyncComp);
<!-- 任意组件中使用 -->
<template>
  <!--第三步：使用组件-->
  <AsyncComp />
</template>
```

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_3、异步组件按需加载)3、异步组件按需加载

异步组件在运行时是懒加载的，即在需要用到时才加载，不用不加载，正是这个特性，可以提高应用首次的加载速度。

如果一个较大的项目，所有组件都是同步的，那一开始需要加载的组件较多，页面打开速度会变慢，体验会变差。所以需要将应用拆分成更多的异步组件，使现按需加载。

**代码演示**

- `App.vue`

```html
<script>
  import { defineAsyncComponent } from "vue";
  // 定义异步组件
  const AsyncCompA = defineAsyncComponent(() =>
    import("./components/AsyncCompA.vue")
  );

  const AsyncCompB = defineAsyncComponent(() =>
    import("./components/AsyncCompB.vue")
  );

  export default {
    data() {
      return {
        currentComp: "AsyncCompA",
      };
    },
    components: {
      AsyncCompA,
      AsyncCompB,
    },
  };
</script>

<template>
  <button @click="currentComp = 'AsyncCompA'">加载A组件</button>
  <button @click="currentComp = 'AsyncCompB'">加载B组件</button>
  <!--KeepAlive将被切换掉的组件缓存起来-->
  <KeepAlive>
    <component :is="currentComp"></component>
  </KeepAlive>
</template>
```

- `AsyncCompA.vue`

```html
<template>
  <div>AsyncCompAAAA 组件中内容</div>
</template>
```

- `AsyncCompB.vue`

```html
<template>
  <div>AsyncCompBBBBB 组件中内容</div>
  <input type="text" name="" id="" />
</template>
```

注：

项目首次加载时，页面中只加载了`AsyncCompA`组件，当我们点击加载 B 组件时，才会去加载`AsyncCompB`组件。

> 具体效果如下：

![GIF2023-5-1717-11-47](https://www.arryblog.com/assets/img/GIF2023-5-1717-11-47.6d666368.gif)

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_4、异步组件加载与错误状态)4、异步组件加载与错误状态

当我们在加载一个异步组件时，可能会因为组件比较大或网速等原因，需要等待一定的时间才能加载成功，所以在加载成功之前页面是空白的状态，这非常影响用户体验。

针对这种情况，我们可以在真正的组件被加载之前，先显示一些其它的内容，在组件加载成功后，再替换掉就好。

> 如下图：

![GIF2023-5-1717-53-09](data:image/gif;base64,R0lGODlhFQFPAFUAACH5BAAUAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAFQFPAKX////v7+92dnYAAACb1e/v79mbUE18u+/v1ZvZnE267+/v77q6egAAAE18AHxNnNmbUADZ7+/vu3xNAE2VlZVNAACbUHxNUJsAUJsAerp8AAC9vb3n5+cAAHxNAHxNerpNnLq679m677p8UJt8AE26ek3Z79nZ1Zt8nJt8u9lNept8erqb1dkAeny6enybu5sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/0CAcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW67vxyKYE6v2+/4vH7Pz1M4b4GCg0UUGwGIiYqLjI2Oj5CRjhsUhJaXawKSm5ydnowCmKKjYpqfp6ipAaGkra5Ypqqys46sr7e4TrG0vLS2ucDBRLuKBQYEkggfiAgXJxPIkQgeCtIXEYkMB5C/wt64xInG0Y0FEAPoAw0v1wskyAgV6QMPiQnb5vMN5An1EhkBtHH7RhCco3H20u1LpAzRghHYGEJjVmHbghUBEoA4hghhAIQCBT7qVrDkpXAZ9RG49/FYgnkw0e1DMPEjhHolCDQzwbFlNP8JHRQs0BCzHiiTSDGh9FnAggKWHj0ucFBNYjSaBIaqI5BPITJzQRMADLhtZNKzg5aOa/oU37F4MEE4dQdPXrqyASS4jYYwQQsHIZwiElkLrWE3ao+xhcpxWoieOfsxqzm0HgIVEBqw6InQhQiqigg3Inm4NJmlUxUs3hsQ5oEEKKhN5ochAoOFXWVGmyqCaMzaR00LL7NUQu3UjMl5lDAAL1Z7wMVx7pk6NN7Rw7OXcsSgHnLWHc81v831LWUNRuGmmL4bdLbrwbXL54ISaLVmEV7qhrs1YIZ/D0XAHzoAmQNcVNS5Nxh8i5A234NThGPOAczRkxF4PnWHyEtGRVK5YUwWKUjWQBCWWMVSvaTYiYMmtqgEiirGSKKLNDIBo4w4NljjjkoYkuOPj1DC45BGxNHHkUgmqWQdfxDp5JNQRinllFRWaeWVWGap5ZZcdunll2CGKeaYZJZp5plopqnmmmy26eabcMYp55x01mnnnXjmqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo5BGKumklFZq6aWYZqrpppx26umnoIYq6qiklmrqqaimquqqrLbq6qtuBAEAIfkEAR4AAgAsBAAEAE4AFwCl5eXlT09PAP8A4eHhlMzl5eXPlExKd7Pl5cyUz5VKsuXl5eWysnUAAABKdwB3SpXPz+XllEwASgBK5bN3d3d3SgAAlEx3AEyUdwAAAHWySkyUp6enSgB3AAB3suWydwBKsuXPd0yUsnVKSpWySnWyz+XPz8yUd5WUd7PPSnWUd3WylMzPAHV3snV3lLOUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/AASVALBqPyKRyyWwqKcLNYEqtWq/YrHbLzW6GA4B4TC6bz+i0en2eEtnwuHxuftPv+DzAru/70URhZgUGBGwIJGIIGiYShmsIHAqQGhBjDAdqfGWEj2cFEQKiAg0ulQsfhggVowIPYwmZoK0NngmvExkAmJoBaJ2wo7VjiGILIZbEjooVmQsqAAkjhWLAAMC8vGmbwcIEsdeFCa3korUIy9cRryIEiyXU4Y8THQoLGOWvdb6fhQUWCsBZs7bAwSRlj9ARuEeKwCxv6uol0LUr0zZ+g/wBFFhoFbkRAFGpYjXKIoAJsuIBS8DCAQiAYrQBwshJY8CUqjiAiNfulqKzdPdeIUgRocEKldRaeDBIRuYZbmMKKvh3U94ucgcSnJD009YFCAyGPTT3qKAHfOW+7kMz4atUjp6sTRBgUiEstWMGxpPa1ORTmk1fvcWZNxTdsA47AsWgzyMKpGWZXvK71gy9SYsgjCPrseGuDLmOQegsShcotXojH4xJuQxUUAfmuopGuFohBvrG6Vsju5wzyax7/RlOfA/g4sjnQE3OfE0AChuaS1/zRYiT69izazcCJQgAIfkEAQoAAgAsBAAEAE4AFwCl9fX1jY2NAP8An9r19fXen1JPf7/19dqf3p9PvvX19fW+vn0AAABPfwB/T5/en1IA3vX19b9/TwBPp6enTwAAn1J/fwAAT1KfAFKfAH2+ysrK6+vrTwB/AAB/vvXevvW+f1KfT5++fwBPT32+vn1Pvn1/3vXeAH1/n7+fT32ff5+ff7/e3tqfn9ref32+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/AzSRALBqPyKRyyWwqJ0INYEqtWq/YrHbLzWqG3bB4TL4Sy+i0enpeu9/aNnw+l1sJhUH3MJoeLiwSelwHHAmEFxBUCwZbdlV4g1gEDwKWAgwoiQoiegcUlwIOVAiNlKEMkgijERkAjI4BWZGkl6lUfFMKIIq4gn4UjQouAAgheVO0ALSwsHGyVwioA6XLedKh2ZgDB7/LD6Mk3BcmyNaDER0JChbao2bQV5EEFQnVysoKDYe+g90D7LadsqWHkjoErl41ejYrDz17pvJ8yhaiHidPoC4tBBAh4iBaCE408FBvirMsj6jMq3cPWSEP5sSt8uON3agDKR4waGGOVomnD/uqnMSSUte+hy31LMhmAIEKQzRVYYCw4NZAS7cA6PvQTttUeFkiTNUH8ZxKcxEEbPxH6uvZj+bICt1INJ6VBaPIJlVZSW3VAZHYarXwbuKKnnGDLqIL9kq6Q38gYNs2cdurDK12QahsyRWlr/gS8zPJ2EpKSgbSiirm8S3eKdLecVGtTZhi0rHo6H5TdLfvLr1/Cyc6Qcrw416gDHHCvLnz50WgBAEAIfkEARQAAgAsBAAEAE4AFwCl5eXlT09PAP8A4eHhlMzl5eXPlExKd7Pl5cyUz5VKsuXl5eWysnUAAABKdwB3SpXPz+XllEwASgBK5bN3d3d3SgAAlEx3AEyUdwAAAHWySkyUp6enSgB3AAB3suWydwBKsuXPd0yUsnVKSpWySnWyz+XPz8yUd5WUd7PPSnWUd3WylMzPAHV3snV3lLOUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/AASVALBqPyKRyyWwqKcLNYEqtWq/YrHbLzW6GA4B4TC6bz+i0en2eEtnwuHxuftPv+DzAru/70URhZgUGBGwIJGIIGiYShmsIHAqQGhBjDAdqfGWEj2cFEQKiAg0ulQsfhggVowIPYwmZoK0NngmvExkAmJoBaJ2wo7VjiGILIZbEjooVmQsqAAkjhWLAAMC8vGmbwcIEsdeFCa3korUIy9cRryIEiyXU4Y8THQoLGOWvdb6fhQUWCsBZs7bAwSRlj9ARuEeKwCxv6uol0LUr0zZ+g/wBFFhoFbkRAFGpYjXKIoAJsuIBS8DCAQiAYrQBwshJY8CUqjiAiNfulqKzdPdeIUgRocEKldRaeDBIRuYZbmMKKvh3U94ucgcSnJD009YFCAyGPTT3qKAHfOW+7kMz4atUjp6sTRBgUiEstWMGxpPa1ORTmk1fvcWZNxTdsA47AsWgzyMKpGWZXvK71gy9SYsgjCPrseGuDLmOQegsShcotXojH4xJuQxUUAfmuopGuFohBvrG6Vsju5wzyax7/RlOfA/g4sjnQE3OfE0AChuaS1/zRYiT69izazcCJQgAIfkEAQoAAAAsAwAfAIQADwClAP8AAAAAxoIAAILG/8eEUqbnpVUA///nhMf/5///AFWlxv///+Ol56ZS///GAACEhAAApeP/UgCEAABSUgAAUlWlAIKl58eEhABS/+PnUgBS5+P/UqbG5//GUqalxv/npcelhIKEpaZShACExuPnxseEpVVSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv9AgHBILBoBDMniOGwMhAdTZOgYLY+CAILJqCSYxoOhMBQUGBQyU/AEu48OSGBOr88nUyL77Ryit2IWG1gPJXhHXV9ucXYBBWYZHRBtRntvl4sQakQEjZ4BbX1DGSQAAgqKRGKoAASHRYlDYnUPVwBim2aXlpi9RXGbWKxMDXUeco2vrY5EaJvFdgViW0hKWZ92qNfYoL5MrnnAYHHUpsFNlASs034Uw0UCygS15uzVtvO2onrBvAD73ji9EkfsnS4j+9R9sSeA3jY6qOK0yVfPALUktg4KIfAElxCNpij9Exlw40BNXCiUM3ekgYUxrdZZLLnRobSZ9zo1UnABFQP/DXlA+gNIE5wQRnXaiKn1sA6rYq8U3sJZUqoZexinFpB6j5dQkUSrnjwnpBi9MufMOJn16QkaiAl00inXgJUABFiV/EPF1QEGEEDLcJtDUmw4lLAohDj7kexIdFCoZlUo1V7IqXhxYmRb52Y3tHrAFg5oFABBPQgogkaoFCZmP3opy6RGDnNeWzFTNWCMZTTNIaVPF1HduOXEs5Yn851dc8m025zonKFAr26qMqPj+KTglvs/Ld/LBUdshDhL1svKJacAV92FOWct+Y3AOUAtuQFYxeEA0x92OBBs190TxWxRYH3csDKPCNwMAM10KyUX23LXtYLHNR1pphdwEU1SG80HVIX224ic8EYiGFxFtlIvCmnUiYkf+VZSEAAh+QQBlgACACwEAAQATgAXAKXv7+92dnYA/wCb1e/v79mbUE18u+/v1ZvZnE267+/v77q6egAAAE1NnNl8AHybUADZ7+/vu3xNAE2VlZVNAACbUHx8AAAAUJtNUJsAerq9vb3n5+dNAHwAAHy677pNerp8UJu679lNnLp8AE26ek3Z79l8u9l8nJtNept8erqb1dmbu5u6enzZ1ZsAenwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/8DNJEAsGo/IpHLJbConQg1gSq1ar9isdsvNaobdsHhMvhLL6LR6el6739o2fD6XWwmFQffwmR4wLRJ6XAccCYQYEFQLBlt2VXiDWAQPApYCDCuJCiN6BxSXAg1UCI2UoQySCKMRGQCMjgFZkaSXqVR8UwogiriCfhSNCikACCJ5U7QAtLCwcbJXCKgDpct50qHZmAMHv8sPoyTcGCXI1oMRHQkKFtqjZtBXkQQVCdXKygoOh76D3QPstp2ypYeSOgSuXjV6NisPPXum8nzKJqIeJ0+gLi0EECHiIFoIXDgIUW+KsyyPqMyrdw9ZoRDmxK3y443dqAMoHjBQYY4WC6cP+6qcxJJS176HLfUsyGYAwQlDNFVdgLDg1kBLtwDo89BO21R4WSJM1QfxnEpzEQRs/Efq69mP5sgK3Ug0npUFo8gmVVlJbdUBkdhqtfBuoomecYMuogv2SrpDfyBg2zZx26sMrXZBqGzJFaWv+BLzM8nYSkpKBtKKKubxLd4p0t5xUa1NmGLSsejoflN0t+8uvX8LJzpByvDjXqAMccK8ufPnRaAEAQAh+QQBZAAAACwDAB8A4wAoAKUA/wD///92dnYAAAD/46VSpudSAADGggAAVaXn//8AgsaEx/+lVQD//+el4//G///nplL/x4QAAFIAAIT//8aEAABSAISEAFJSAFLn46VSVaWlx/+lgqXG/+eEAIQAgqXGplLG/8bG46XGx4RSpqWEVQClVVJSVQBSVVIAVYSlpsalx6WEx+eEggDGglKEpucAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/0CAcEgsGgGB5HGoRDadgWUyepwujVbh9ImlXr9gMAHjCAshiATxUAAfFGYA20wwLKTTCKCw7Re5VV5WW0IHA4dphF1eeH19EIeRd0J1kQNwlAaWmACVkZyeh5xGb5mWh21CDQxtFBV3c1+lZrFhEBMPX6sDuIBQjsBajEpWdWlIBBrCjMtMwc3CABASZdIDk3WpdZjZmdwG2gbf4aNDFB4PYysWuaqsQwTsABHHtUuzYfbmFaf9vO2ZUFzzRSRLIGB9ukEp+ARhFoeOpjlI4opPgGxTDhxTKGcjuCEa1XAMSaoNBAXxAK5KJQeTIX+w/J3CFEGmpTsULlRbkpLJrf8ODBQ8gTSA2qpjZ6jVZMEAkRp3TgOEVARP06FJUieIsLpg1yUqByaE4DcgkTRqmcKlOiryIwC2ndzCVQiXCL0E59LJc0eu01599vBJo4lUDstVOHUCcIXNjl+AruBIpHIrVwMVQtC+DTqvaJk6VYV22lBx0BY9C5LUbCO1bAKvk9wawhVXtMQhSBVGoBZFt2bf1YAbIXotbr82u+DgA8yyJZGTQu66m7SZuitqGSrA2UXdSOnNhS+6rXNnNUhcbKMkIb8k8ppeB3gHqIkpffyJqnkT91zVkkXjkbAUygACWoXKFQS8QMlem5mEAAgKNGDCTsytMQp08+TmVnWb0Vb/xwcMHLPKKG+AlYhUeywzFRoJzAdAakhUVpp64nVnV3FD7DZRWA+sZwATU/GoBHkB3NaZWkK44lEqSrbFZAVLJgnlU0Q0wMFTPfEFgAsOYLhGc4ZZ+BxhT71UHwPdcXcGjkS40s8kXgmVnwMrRVHTHUpQQ+QW3QQjn2oDCSkekIkIGhcfRhbZC0Y+3sERe486FqmNcnySZYNDnDTgKWm8ZNMl0R0jEVuIQVVOpd1VRsWIRRiSSEVjTNRZd3qCQ0US6RGjRHF58CYoaFoE2UujRWpW7GcbdhNpG8seWhWYTZpyCkteggRmYBeSeZ87EwAVEwlk9TNBCwRuJqcWRmY6/6xGIJh1JxFGhfhUHgPpGoB7GRU6LLBIkHSfEqqmy6Oz0RXH0bsHG7zhu19culKmp+pDyqnRpVBCxCBap1gRl+6pRTZWlnniGCekZiebAGgG6mhRQPJfMjHWe2cSv/4YbD2uzUdgEpPpjORiUx5K0ZTiWRStQtEaUQkCGTD48BkRgznxEtIdUWqSGxNxqaFIsOXJiQGsMuys8OL3dYtSDiAE2HoAwB/N+9qRb4thjRDgFPuxOSAoBqrtRCVuf9Vb3xTXlJvT70BdkhsUZ0hlEYyZkzU8e0GEEBQjWk7VQs048ofnDzUhqGkGMRTH6ai7KZOoUTNOdWHSFqa6uAChvv1MrLafXnrp+QzbEO/R5C788MQ7VzzWO1Feu/CsHu+8G7Q9L/301Ff/vKuPW3999Np37/334Icv/vjkl2/++einr/7zArTv/vvwxy///PTXb//9+Oev//789//++kUQAAAHSEDtCZCAByygAhc4vAQC0IEMjKAErwBB9VVwghic4AXRt8EMerCAHTRfCD9IwvSNkHwnLKEKx5dC8bVwhTDs3gvBN8MY2lB6NfReDm/IwwaCsIdA/N4ODRjEIlpviEc0ohJx+MMlOpF4SKxeFJ+oxClOz4pUDCIW2ZfFLsZhi84DoxdjKMbilXGMKjwjFP3Hxja68Y1wjCMbCxgEADs=)

如果在加载一个组件时没有加载成功，我们同样需要对错误的状态做相关处理，比如告诉用户内容加载失败等

> 针对以上两种情况，我们想要在加载组件时做相关的状态处理，需要将`defineAsyncComponent`的参数定义成如下对象

```js
import { defineAsyncComponent } from "vue";
// 内容正在加载中显示的组件
import LoadingComponent from "./components/LoadingComponent.vue";
// 内容加载失败后显示的组件
import ErrorComponent from "./components/ErrorComponent.vue";

const AsyncCompB = defineAsyncComponent({
  // 加载函数，用来加载真正要显示的组件
  loader: () => import("./components/AsyncCompB.vue"),
  // 在真正要显示的组件被加成功前，会先加载这个组件来显示内容
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 1000,
});
```

**以下是完整的代码示例**

- `App.vue`

```html
<script>
  import { defineAsyncComponent } from "vue";
  import LoadingComponent from "./components/LoadingComponent.vue";
  import ErrorComponent from "./components/ErrorComponent.vue";

  const AsyncCompA = defineAsyncComponent(() =>
    import("./components/AsyncCompA.vue")
  );

  const AsyncCompB = defineAsyncComponent({
    // 加载函数，用来加载真正要显示的组件
    loader: () => import("./components/AsyncCompB.vue"),
    // 在真正要显示的组件被加成功前，会先加载这个组件来显示内容
    loadingComponent: LoadingComponent,
    // 展示加载组件前的延迟时间，默认为 200ms
    delay: 200,
    // 加载失败后展示的组件
    errorComponent: ErrorComponent,
    // 如果提供了一个 timeout 时间限制，并超时了
    // 也会显示这里配置的报错组件，默认值是：Infinity
    timeout: 1000,
  });

  export default {
    data() {
      return {
        currentComp: "AsyncCompA",
      };
    },
    components: {
      AsyncCompA,
      AsyncCompB,
    },
  };
</script>

<template>
  <button @click="currentComp = 'AsyncCompA'">加载A组件</button>
  <button @click="currentComp = 'AsyncCompB'">加载B组件</button>
  <KeepAlive>
    <component :is="currentComp"></component>
  </KeepAlive>
</template>
```

- `AsyncCompA.vue` 与`AsyncCompB.vue`

```html
<!--AsyncCompA.vue-->
<template>
  <div>AsyncCompAAAA 组件中内容</div>
</template>

<!--AsyncCompB.vue-->
<template>
  <div>AsyncCompBBBBB 组件中内容</div>
  <input type="text" name="" id="" />
</template>
```

- `LoadingComponent.vue`

```html
<template>
  <div class="loading">正在拼命加载中.....</div>
</template>
```

- `ErrorComponent.vue`

```html
<template>
  <div class="error">内容加载失败....</div>
</template>
```

> 最终渲染后效果如下：

![GIF2023-5-1717-43-07](https://www.arryblog.com/assets/img/GIF2023-5-1717-43-07.65e47283.gif)

注：

在点击加载 B 组件时，会先显示`正在拼命加载中.....`，因为设置了超时`1000ms`

所以在`1s`后组件还没有加载成功时显示了`内容加载失败....`，（一般超时会设置在 3s），最后加载成功则显示真正组件的内容。

### [#](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html#_5、总结-2)5、总结

> 本小节重点掌握以下内容

- 如果利用`defineAsyncComponent`方法定义一个异步组件，同时将其注册为全局组件或局部组件。
- 异步组件最大的优点就是能实现按需加载，提高页面加载的性能。
- 关于异步组件加载与错误状态的处理。
