---
title: ES6 Proxy 代理 与 Reflect 反射，Vue3 响应式数据原理
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 Proxy 代理 与 Reflect 反射，Vue3 响应式数据原理

TIP

本章我们来学习 Proxy，Proxy 英文翻译为代理。

**什么是代理**

代理就是针对一个对象设置代理，控制对这个对象的直接访问。用户不得直接访问这个对象，只能访问该对象的代理，代理会帮忙完成相关操作。

在现实生活中，需要用到代理的地方非常多，比如：

- 房产中介：房产中介作为房主的代理人。如果客户想看房，只能联系中介人员，中介会代理房主带客户看房，签合同，收钱等。
- 明星经纪人：经纪人作为明星的代理人。如果有人想请明星参加一场商业演出，只能联系他的经纪人，经纪人会代理明星与客户谈好合作的细节和报酬，再把合同交给明星签。

**代理的价值**

我们还是以房产中介和明星经纪人作为案例来讲解。

**为什么房主不直接与客户对接呢？**

因为房主平时忙，没有时间带客户看房，还有房主不会拟合同等，所以找个专业的代理来完成这些事情，肯定比自己亲自来要好。

**为什么明星不直接与客户对接呢？**

明星作为公众人为要维护好自己对外的形象，所以不方便直接和客户谈钱。谈钱这种事交给经纪人更合理。如果明星对于合作有要求，比如低于 10 万的演出就不要接，那这种情况自然是经纪人出面会更好，经经人可以直接帮明星拒绝一些不合理的要求和合作。

通过上面的例子，我们知道代理可以帮对象做很多对象自己做不了的事情，或拒绝，过滤掉一些不合法，不安全，不满足要求的事情等

**代理的价值**

使用代理，可以保证更加方便，安全的访问对象，代理可以帮助我们过滤掉一些不合理的，敏感的，不安全的信息。

> 那接下来我们学习 ES 中的 Proxy 代理。

## 一、Proxy 基本用法

TIP

Proxy（代理）可以理解成：在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

### 1、Proxy 语法

TIP

ES6 原生提供了 Proxy 构造函数，用于生成 Proxy 实例。

> 我们实际操作的是 Proxy 的实例

**语法**

```js
const proxy = new Proxy(target, handler);
```

参数

- target：表示要使用 Proxy 代理的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler：是一个处理器对象，对象的每个属性是一个函数，用来定制相关的拦截行为。

### 2、proxy 基本用法

TIP

当我们读取对象的某个属性时，handler 对象中的 get 方法就可以拦截该操作，如果读取对象身上不存在的属性时，就会抛出错误。

> 具体代码实现如下：

```js
// 目标对象
const obj = {
  name: "icoding",
  age: 33,
};

// 代理对象
const proxy = new Proxy(obj, {
  get(target, key) {
    if (key in target) {
      return target[key];
    } else {
      throw new Error("访问的属性不存在");
    }
  },
});

//使用代理对象
console.log(proxy.name); // icoding
console.log(proxy.sex); // Uncaught Error: 访问的属性不存在
```

代码解析

上面代码中的 obj 为目标对象，proxy 为代理对象。当我们访问 proxy 对象的属性时，就相当于是在访问目标对象上的相关属性。

> 但和直接访问目标对象不同，通过 proxy 代理访问时，就会调用代理构造函数的第二个参数`handle`对象中的`get`方法来处理（相当于拦截）

**注意事项**

要使 Proxy 代理起作用，必须对 Proxy 实例（上例中的 proxy） 进行操作，而不是针对目标对象（上例中的 obj）进行操作

### 3、注意事项

TIP

当`handler = {}`时，相当于没有设置任何拦截，那操作代理对象等同于直接操作目标对象。

```js
// 目标对象
const obj = {
  name: "icoding",
  age: 33,
};

// 代理对象
const proxy = new Proxy(obj, {});

//使用代理对象
console.log(proxy.name); // icoding
console.log(proxy.sex); // undefined
```

> 接下来，我们就来学习 handler 对象中有那些方法，这些方法分别用来拦截目标对象的那些行为。

## 二、handler 对象的方法

TIP

`handler`：是一个处理器对象，对象的每个属性是一个函数（每个函数相当于是具有特定功能的捕捉器），用来定制相关的拦截行为。如果对象中没有指定相关的捕捉器，那就会保留目标对象的默认行为。

> 那接下来我们来学习下 handler 对象身上可以设置那些方法（捕捉器）

### 1、handler.get() 方法

TIP

- `handler.get()` 方法用于拦截对象的读取属性操作，包括访问原型上的属性。
- **返回值**：可以是任何类型，表示最终访问到的属性值。

**语法**

```js
var p = new Proxy(target, {
  get: function (target, property, receiver) {
    // ....
  },
});

/*
   get函数的参数：
    
   target：被代理的目标对象
   property：被获取的属性名
   receiver：可选参数，指代上面的p
*/
```

**基本应用**

- 访问对象身上不存在的属性时会报错

```js
// target 目标对象
const obj = {
  name: "icoding",
  age: 33,
};

// proxy 代理对象
const proxy = new Proxy(obj, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error("访问的属性不存在");
    }
  },
});

console.log(proxy.name); // icoding
console.log(proxy.toString); // ƒ toString() { [native code] }
proxy.sex; // Uncaught Error: 访问的属性不存在
```

> 正常情况下，当我们访问对象上不存在的属性时，返回值是`undefined`，但是上面抛出了错误，说明 proxy 代理生效，拦截了对 obj 对象的访问

- 实现数组可以通过负索引来访问

```js
const target = ["a", "b", "c"];
const arr = new Proxy(target, {
  get(target, prop) {
    prop = Number(prop); // 将属性转换为数字类型
    if (prop < 0) {
      prop = target.length + prop; // 将负数转换为正数对应索引
    }
    return target[prop];
  },
});

console.log(arr[-1]); // c
console.log(arr[-2]); // b
console.log(arr[0]); // a
```

> 当访问的数组的属性（下标）值是小于 0 的负数时，则将其转换为对应的正数索引下标并输出。

注意事项

如果一个属性不可配置（configurable）或不可写（writable)，代理时的返回值必须与该目标对象的属性的值相同，否则就会抛出错误

```js
const obj = {
  a: 1,
  b: 2,
};
Object.defineProperty(obj, "c", {
  configurable: false,
  value: 3,
  writable: false,
});

const proxy = new Proxy(obj, {
  get(target, prop) {
    if (prop === "c") {
      // return 3;  // 访问属性时，正确输出3
      return 4; // 访问属性c时，因为输出的值不是3，和目标属性的值不相同，所以抛出错误
    } else {
      return target[prop];
    }
  },
});

console.log(proxy.a); // 1
console.log(proxy.c); // 如果上面return3，则正确输出3，否则抛错
```

### 2、handler.set() 方法

TIP

`handler.set()`方法用于拦截对对象的某个属性做赋值操作。

**语法**

```js
const p = new Proxy(target, {
  set: function (target, property, value, receiver) {
    // ....
  },
});

/*
	set函数的参数：

    target：被代理的目标对象
    property：将要被设置值的属性名
    value：新的属性值
    receiver：可选参数，最初被调用的对象。通常是 proxy 本身
*/
```

**返回值**：是一个布尔值，`true`表示赋值成功，`false`表示赋值失败

- 非严格模式下，返回值可写可不写
- 严格模式下，一定要写(除非抛出错误），同时返回值为`false`时，会抛出错误

```js
//   "use strict";
const obj = {
  a: 1,
  b: 2,
};

let handler = {
  set(target, prop, value) {
    if (prop === "a") {
      return false;
    }
    target[prop] = value;
    return true; // 非严格模式下，可以省略不写
  },
};
const proxy = new Proxy(obj, handler);
proxy.b = "hello";
// 捕获错误
try {
  proxy.a = "world";
} catch (err) {
  console.log(err);
}

console.log(proxy.b);
console.log(proxy.a);
```

![image-20230223155800771](https://www.arryblog.com/assets/img/image-20230223155800771.5ae3a3d3.png)

![image-20230223155922531](https://www.arryblog.com/assets/img/image-20230223155922531.c02cc35b.png)

**基本用法**

- 禁止给以`_`下划线开头的私有属性被重新赋值，并抛出错误

```js
// "use strict";
const obj = {
  name: "icoding",
  age: 33,
  _sex: "女",
};

const proxy = new Proxy(obj, {
  set(target, prop, value) {
    // 如果属性名以_开头，则抛出错误
    if (prop[0] === "_") {
      throw new Error("不允许赋值操作");
    }
    // 其它情况，正常赋值
    target[prop] = value;
    // 非严格模式下，return语句可以省略
    return true;
  },
});

proxy.name = "arry";
proxy._sex = "男";
```

- 实现数据绑定，当对象的某个属性发生变化时，自动更新 DOM

```html
<h3 class="title">标题</h3>
<p class="desc">内容</p>
<script>
  const data = {
    title: "新闻标题",
    desc: "新问内容",
  };

  const title = document.querySelector(".title");
  const desc = document.querySelector(".desc");
  title.innerText = data.title;
  desc.innerText = data.desc;

  const proxy = new Proxy(data, {
    set(target, prop, value) {
      switch (prop) {
        case "title":
          title.innerText = value;
          break;
        case "desc":
          desc.innerText = value;
          break;
      }
    },
  });

  // 点击页面，更新数据
  document.onclick = function () {
    proxy.title = "set方法能做什么？";
    proxy.desc = "set方法可以实现动态更新DOM";
  };
</script>
```

![GIF2023-2-2316-35-02](https://www.arryblog.com/assets/img/GIF2023-2-2316-35-02.de0a2f5c.gif)

注意事项

若目标属性是一个不可写及不可配置的**数据属性**，则不能改变它的值，否则会报错

### 3、handler.has() 方法

TIP

`handler.has()`方法用来拦截判断某个属性是否为对象属性的操作，但并不拦截判断某个属性是否为对象自身属性的操作。

也就是说 has 方法主要针对`in`运算符，而不针对`hasOwnProperty`，还有`for...in`中用到了 in 运算符，但`has()`拦截对`for…in`循环不生效。

> **返回值：** 返回一个布尔值，true 表示该属性存在于该对象上，false 表示不存在该对象上

**语法**

```js
var p = new Proxy(target, {
  has: function (target, property) {
    // ....
  },
});
/*
	has函数的参数：
    
    target：被代理的目标对象
    property：需要检查是否存在的属性名
*/
```

**基本应用**

- 用来隐藏对象的某个属性

```js
const obj = {
  name: "icoding",
  age: 33,
  _sex: "女",
};
const proxy = new Proxy(obj, {
  has(target, prop) {
    if (prop[0] === "_") {
      return false;
    }
    return prop in target;
  },
});

console.log("name" in proxy); // true
console.log("_sex" in proxy); // false
console.log("toString" in proxy); // true
```

- 判断对象身上是否有这个属性，如果有，再判断是否为函数，如果是，就调用下这个方法

```js
const obj = {
  name: "icoding",
  say() {
    console.log(`大家好，我是${this.name}`);
  },
};
const proxy = new Proxy(obj, {
  has(target, prop) {
    if (prop === "say" && typeof target[prop] === "function") {
      target[prop]();
    }
  },
});

"say" in proxy; // 大家好，我是icoding
```

**注意事项**

- 如果目标对象的某一属性为不可配置，则该属性不能够被代理设置为隐藏(false)

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "icoding",
  writable: false,
  configurable: false, // 不可配置
});

const proxy = new Proxy(obj, {
  has(target, prop) {
    return true; // false是会报错，true不会
  },
});
console.log("name" in proxy);
```

- 如果目标对象为不可扩展对象，则该对象的属性不能够被代理设置为隐藏（false)

```js
const obj = {
  a: 1,
  b: 2,
};

Object.preventExtensions(obj); // 将对象设置为不可扩展的
const proxy = new Proxy(obj, {
  has(target, prop) {
    if (prop in target) {
      return true; // false是会报错，true不会
    } else {
      return false;
    }
  },
});
console.log("name" in proxy); // false
console.log("toString" in proxy); // true
console.log("a" in proxy); // 抛出错误
```

> `Object.preventExtensions()`方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

### 4、handler.apply() 方法

TIP

`handler.apply()` 方法用于拦截函数的调用，call 和 apply 操作。返回值可以是任意类型，表示函数调用的返回值

**语法**

```js
var p = new Proxy(target, {
  apply: function (target, thisArg, args) {
    // ...
  },
});
/*
	apply函数的参数：
    
    target：被代理的目标对象（函数）
    thisArg：被调用时的上下文对象
    args：被调用时的参数组成的数组
*/
```

关于 apply 方法的参数的理解，可以看下面代码的演示

```js
function foo() {
  console.log(this);
}

const proxy = new Proxy(foo, {
  apply(target, thisArg, args) {
    console.log(target); // 被代理的目标对象（函数 foo)
    console.log(thisArg); // 被调用是的上下文对象，指 undefined 或{m:1,n:2}
    console.log(args); // 被调用时的参数数组，指[1,2,3] 或['a','b','c']
  },
});

proxy(1, 2, 3); // foo  undefined  [1, 2, 3]
proxy.call({ m: 1, n: 2 }, "a", "b", "c"); // foo undefined  ['a', 'b', 'c']
```

**基本应用**

- 改变函数调用时的返回值

```js
// 函数返回的是一个数组
function foo() {
  return [1, 4, 5, 6, 20, 3, 44];
}
// // 代理后，返回的数组是升序排序好的
const proxy = new Proxy(foo, {
  apply(target, thisArg, args) {
    const arr = target();
    return arr.sort((a, b) => a - b); // 降序
  },
});

console.log(proxy()); // [1, 3, 4, 5, 6, 20, 44]
```

- 预加载图片

TIP

在 web 开发中，图片预加载是一种常用的技术。通常我们加载一张图片的做法是：

- 直接给`img`标签设置`src`属性，但如果图片过大或网络不佳，图片加载到显示需要很长的一段时间，这时页面显示图片的位置就会出现很长时间的一片空白。
- 解决这个问题，常见的做法是，在图片没有加载成功前，先用一张 loading 图片占位，然后异步方式加载图片，等图片加载好了，再显示真正的图片。

> 上面这种情况，我们就可以通过代理来实现。

```js
// 加载图片的方法
function loadImg(url) {
  const img = new Image();
  img.width = "200";
  img.onload = function () {
    document.body.appendChild(img);
  };
  img.src = url;
  return img; // 返回img对象
}

// 代理loadImg方法来加载图片
const proxyImg = new Proxy(loadImg, {
  apply(target, thisArg, args) {
    // 调用方法，先加载loading占位图,为了演示效果，这里采用本地图片
    const realImg = target("./loading-svg/loading-bars.svg");
    // 创建img标签，来加载真实图片
    const img = new Image();
    img.src = args[0];
    // 真实图片加载成功，再用真实图片替换掉占位图
    img.onload = function () {
      realImg.src = args[0]; // 把图片的地址改变真实图片地址
    };
  },
});

const url =
  "https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg";
proxyImg(url);
```

![GIF2023-2-23 20-26-54](https://www.arryblog.com/assets/img/GIF2023-2-23-20-26-54.f9f06beb.gif)

### 5、handler.construct() 方法

TIP

`construct()`方法用于拦截 new 命令。其返回值必需是一个对象，否则报错

**语法**

```js
var p = new Proxy(target, {
  construct: function (target, argumentsList, newTarget) {
    // ....
  },
});

/*
	construct函数的参数：
    
    target：被代理的目标对象(类)
    argumentsList：constructor的参数组成的数组
    newTarget：最初被调用的构造函数，就上面的例子而言是 p
*/
```

关于 construct 方法的参数的理解，可以看下面代码的演示

```js
class A {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function fn() {}
const proxy = new Proxy(A, {
  construct(target, args, newTarget) {
    console.log(target);
    console.log(args);
    console.log(newTarget === proxy);
    return new target(...args); // 参数记得传
  },
});

const p = new proxy(1, 2);
console.log(p);
```

![image-20230223204541429](https://www.arryblog.com/assets/img/image-20230223204541429.6a2fe3ba.png)

注意事项

- construct 方法必需要返回一个对象，否则报错
- `new Proxy()` 时，传入的目标对象本身必需能使用 new 来操作

```js
const proxy = new Proxy(function () {}, {
  construct(target, args, newTarget) {
    //   return {};
    return 3; // 返回值为非对象类型，则报错
  },
});
new proxy(1, 2);

// 传入的目标对象本身不能使用new来操作，所以报错
const proxy = new Proxy(
  {},
  {
    construct(target, args, newTarget) {},
  }
);
new proxy(1, 2);
```

### 6、handler.deleteProperty() 方法

TIP

`handler.deleteProperty()` 方法用于拦截对对象属性的 `delete`操作。

> 返回值必须为一个布尔值，表示该属性是否被成功删除

**语法**

```js
var p = new Proxy(target, {
  deleteProperty: function (target, property) {
    // ....
  },
});

/*
	deleteProperty函数的参数：

    target：被代理的目标对象
    property：待删除的属性名
*/
```

**基本用法**

- 禁止删除指定的属性

```js
const obj = {
  name: "清心",
  age: 22,
  sex: "女",
};

const proxy = new Proxy(obj, {
  deleteProperty(target, prop) {
    if (prop === "name") {
      return false;
    }
    return delete target[prop];
  },
});

console.log(delete proxy.age);
console.log(obj);
console.log(delete proxy.name);
console.log(obj);
```

![image-20230223210434338](https://www.arryblog.com/assets/img/image-20230223210434338.c4575eaa.png)

注意事项

如果目标对象的属性为不可配置（`configurable`)，则不能被`deleteProperty`方法删除，否则报错。

```js
const obj = {
  name: "清心",
  age: 22,
  sex: "女",
};
Object.defineProperty(obj, "say", {
  value: function () {},
  configurable: false,
  writable: true,
});

const proxy = new Proxy(obj, {
  deleteProperty(target, prop) {
    if (prop === "say") {
      // return false; // 正确执行
      return true; // 报错，因为该属性为不可配置，无法删除
    }
    return delete target[prop];
  },
});

console.log(delete proxy.say);
```

### 7、handler.defineProperty() 方法

TIP

`handler.defineProperty()` 用于拦截对象的 `Object.defineProperty()` 操作，也就是给对象添加新的属性时会被拦截。

**返回值：** 必须是一个布尔值，表示定义该 属性的操作是否成功，严格模式下没有返回值或返回值为 false，则会抛出错误

**语法**

```js
var p = new Proxy(target, {
  defineProperty: function (target, property, descriptor) {
    // ....
  },
});

/*
	defineProperty函数的参数：
    
    target: 被代理的目标对象
    property：待添加的属性名
    descriptor：待添加的属性的描述符对象
*/
```

对于`defineProperty`中参数的理解，看如下代码示例

```js
"use strict";
let handler = {
  defineProperty(target, key, descriptor) {
    // 被代理的目标对象 {a:1}
    console.log(target);
    // 将要被添加的属性名 foo
    console.log(key);
    // 将要被添加的属性的属性描述符对象
    //  {value: 'bar', writable: true, enumerable: true, configurable: true}
    console.log(descriptor);
    // 添加属性
    Object.defineProperty(target, key, descriptor);
    return true; // 严格模式下，不写或为false，则会抛出错误
  },
};
const obj = { a: 1 };
let proxy = new Proxy(obj, handler);
proxy.foo = "bar";
console.log(obj); //  {a: 1, foo: 'bar'}
```

![image-20230223215544495](https://www.arryblog.com/assets/img/image-20230223215544495.9cee6269.png)

**注意事项**

- 如果目标对象不可扩展，则`defineProperty`不能增加目标对象中不存在的属性，否则会报错。

```js
//   "use strict";
const obj = { name: "icoding" };
Object.preventExtensions(obj);
const proxy = new Proxy(obj, {
  defineProperty(target, prop, desc) {
    Object.defineProperty(target, prop, desc);
  },
});

proxy.age = 33; // 报错
```

- 如果目标对象的某个属性不可以写（`writable`)或不可配置（`configurable`)，则`defineProperty`不能修改这两个设置，严格模式下会报错。

```js
//   "use strict";
const obj = {};
Object.defineProperty(obj, "name", {
  value: "清心",
  writable: false,
  configurable: true,
});

const proxy = new Proxy(obj, {
  defineProperty(target, prop, desc) {
    Object.defineProperty(target, prop, desc); // 定义属性
    return true;
  },
});

proxy.name = "icoding";
console.log(obj); // {name:'清心'}
// 以上代码，开启严格模式，则会报错
```

### 8、handler.getOwnPropertyDescriptor() 方法

TIP

```
handler.getOwnPropertyDescriptor()`方法用来拦截`Object.getOwnPropertyDescriptor()`方法。其返回值是一个属性描述符对象或`undefinedy
```

**语法**

```js
var p = new Proxy(target, {
  getOwnPropertyDescriptor: function (target, prop) {
    // ....
  },
});

/*
	getOwnPropertyDescriptor函数的参数：

    target: 被代理的目标对象
    prop：被用来返回属性描述符对象的属性名
*/
```

**基本用法**

> 指定属性的描述不允许被获取

```js
const obj = {
  name: "icoding",
  age: 33,
};

const proxy = new Proxy(obj, {
  getOwnPropertyDescriptor(target, prop) {
    if (prop === "name") {
      return undefined;
    }
    return Object.getOwnPropertyDescriptor(target, prop);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, "name"));
console.log(Object.getOwnPropertyDescriptor(proxy, "age"));
```

### 9、handler.getPrototypeOf() 方法

TIP

`handler.getPrototypeOf()` 用来拦截获取对象原型的操作。

> 返回值必须为一个对象或者 null，否则会报错。

**语法**

```js
const p = new Proxy(obj, {
  getPrototypeOf(target) {
    // ...
  },
});
```

getPrototypeOf()方法具体拦截以下操作：

- `对象.__proto__`
- `对象.isPrototypeOf()` 用于测试一个对象是否存在于另一个对象的原型链上。
- `Object.getPrototypeOf(对象)`
- `instanceof` 操作

```js
const obj = {
  a: 1,
  b: 2,
};
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    console.log("执行");
    return {};
  },
});

// 以下四种方式，都需要获取对象的 __proto__ 属性值，都会被 getPrototypeOf 方法拦截
Object.getPrototypeOf(proxy);
proxy.__proto__;
proxy instanceof Object; // proxy 的原型链上是否存在 Object.prototype
Object.prototype.isPrototypeOf(proxy); // Object.prototype 对象是否在 proxy 的原型链上
```

**基本用法**

> 获取对象原型时，返回一个假的对象。

```js
const obj = {
  a: 1,
  b: 2,
};
const __proto__ = { m: 10, n: 20 };
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    return __proto__;
  },
});
// 获取proxy原型，返回的是__proto__
console.log(Object.getPrototypeOf(proxy) === __proto__);
```

注意事项

- `getPrototypeOf()` 方法返回的不是对象也不是 `null`，则会抛出错误。
- 目标对象是不可扩展的，且 `getPrototypeOf()` 方法返回的原型不是目标对象本身的原型，则会抛出错误

```js
const obj = {};
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    return null; // 如果没有return语句，或返回值不是null或对象，则抛出错误
  },
});
Object.getPrototypeOf(proxy);
const obj = {};
Object.preventExtensions(obj);
const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    return Object.prototype; // 它任何返回值，都会抛出错误
  },
});
console.log(Object.getPrototypeOf(proxy) === obj.__proto__);
```

### 10、handler.setPrototypeOf() 方法

TIP

`handler.setPrototypeOf()` 方法用于拦截`Object.setPrototypeOf`方法。

> 返回值必须是一个布尔值，表示原型修改是否成功。

**语法**

```js
var p = new Proxy(target, {
  setPrototypeOf: function (target, prototype) {
    // ...
  },
});

/*
	setPrototypeOf函数的参数：
    
    target: 被代理的目标对象
    prototype：对象新原型或为null
*/
```

**基本用法**

> 不允许更改对象的原型

```js
const arr = [];
const proxy = new Proxy(arr, {
  setPrototypeOf(target, prototype) {
    return false;
    //   或
    //   throw new Error("不允许修改原型");
  },
});

Object.setPrototypeOf(proxy, Object.prototype);
console.log(arr.__proto__ === Object.prototype);
```

注意事项

如果目对象不可扩展，`setPrototypeOf()`方法不得改变目标对象的原型（也就是说 setPrototypeOf 的返回值必需与 `Object.getPrototypeOf(target)` 的值相同

```js
"use strict";
const arr = [];
Object.preventExtensions(arr);
const proxy = new Proxy(arr, {
  setPrototypeOf(target, prototype) {
    Object.setPrototypeOf(target, prototype);
    return true;
  },
});

//   Object.setPrototypeOf(proxy, Object.prototype); // 抛出错误
Object.setPrototypeOf(proxy, Array.prototype); // 正常执行
```

### 11、handler.ownKeys() 方法

TIP

`handler.ownKeys()`方法用来拦截对象自身属性的读取操作，具体拦截以下操作：

- `Object.getOwnPropertyNames()` 获取对象自身属性（可遍历+不可遍历）
- `Object.getOwnPropertySymbols()` 获取对象身的 Symbol 属性（可遍历 + 不可遍历）
- `Object.keys()` 获取对象自身所有可遍历属性（不包括 Symbolo 类型）

| 方法                           | 原型 | 自身 | 自身 Symbol | 可枚举 | 不可枚举 |
| :----------------------------- | :--- | :--- | :---------- | :----- | :------- |
| `Object.keys()`                |      | ✔    |             | ✔      |          |
| `for...in`                     | ✔    | ✔    |             | ✔      |          |
| `Object.getOwnPropertyNames`   |      | ✔    |             | ✔      | ✔        |
| `Object.getOwnPropertySymbols` |      |      | ✔           | ✔      | ✔        |

> 返回值只能是数组，其数组的成员只能是字符串类型或 Symbol 类型。

**语法**

```js
var p = new Proxy(target, {
  ownKeys: function (target) {
    // ...
  },
});
```

注：

在拦截以上三种方法时，对于返回的值会有以下区别：

**不同点**一

- 拦截

  ```
  Object.keys()
  ```

  时，会过滤掉以下三类属性

  - 目标对象上不存在的属性
  - 属性名为 Symbol 值
  - 不可遍历（enumerable 为 false）的属性

- 拦截`Object.getOwnPropertyNames()`方法，只会留下字符串类型的值（不可遍历 + 可遍历）

- 拦截`Object.getOwnPropertySymbols()`，只会留下 Symbol 类型的值（不可遍历 + 可遍历）

**不同点二**

- 拦截`Object.keys()`方法时，其不能返回目标对象身上不存在的属性，但是`Object.getOwnPropertyNames()`和`Object.getOwnPropertySymbols()`方法是可以的。

**相同点**

- 只要是对象身上的不可配置属性，则必须被`ownKeys`方法，即使最后因为类型不符合要求被过滤
- 如果对象是不可扩展，则`ownKeys`方法必须返回对象自身的所有属性，即使最后因为类型不符合要求被过滤。但返回的数组中的成员不能有对象自身没有的属性，否则会报错

**代码演示**

```js
const obj = {
  a: 1,
  [Symbol.for("b")]: 2,
};
Object.defineProperty(obj, "name", {
  value: "icoding",
  configurable: false,
});
const proxy = new Proxy(obj, {
  ownKeys(target) {
    // 正确写法，返回的数组中一定要包含这个值
    return ["a", "c", "name", Symbol.for("b")];
    // 以下方式，则会抛出错误，因没有包含不可配置属性
    //   return ["a", "c"，Symbol.for("b")];
  },
});

const keys = Object.getOwnPropertyNames(proxy);
console.log(keys); // ['a', 'c', 'name'] 只留下字符串类型
const keys2 = Object.getOwnPropertySymbols(proxy);
console.log(keys2); // [Symbol(b)]  只留下Symbol类型的
const keys3 = Object.keys(proxy);
console.log(keys3); // ['a']  过滤Symbol,对象自身不存在的，不可遍历的
```

**代码演示：相同点**

> 如果代理的目标对象是不可扩展的，则 ownKeys 方法返回的数组中必须包含目标对象自身的所有属性（包括 Symbold 类型，即时最后会被过滤掉），且不能包含多余属性，否则报错。

```js
const obj = {
  a: 1,
  [Symbol.for("b")]: 2,
};
Object.defineProperty(obj, "name", {
  value: "icoding",
  configurable: false,
});
// 对象设置为不可扩展
Object.preventExtensions(obj);
const proxy = new Proxy(obj, {
  ownKeys(target) {
    return ["a", "name", Symbol.for("b")];
    // 以下两种写法，都会抛出错误
    // return ["a", "name"];
    //   return ["a", "name", Symbol.for("b"), "c"];
  },
});

const keys = Object.getOwnPropertyNames(proxy);
console.log(keys); // ['a', 'name']
const keys2 = Object.getOwnPropertySymbols(proxy);
console.log(keys2); // [Symbol(b)]
const keys3 = Object.keys(proxy);
console.log(keys3); // ['a']
```

## 三、this 问题

TIP

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下也无法保证与目标对象的行为一致。

> 主要原因就是 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

```js
const obj = {
  name: "icoding",
  age: 33,
  say() {
    console.log(this === proxy);
    console.log(`大家好，我是${this.name}，我今年${this.age}岁了`);
  },
};

const proxy = new Proxy(obj, {});
obj.say();
proxy.say();
```

![image-20230224013008282](https://www.arryblog.com/assets/img/image-20230224013008282.3e0b6cf0.png)

注：

上面代码中，proxy 代理了 obj，则`proxy.say()` 方法时，其内部的 this 指向 proxy 对象，而非 obj

### 1、this 问题，造成无法代理

TIP

我们再来看一个例子，由于 this 指向的变化导致 Proxy 无法代理目标对象

```js
// Stack.js文件

// 存放私有属性
const privates = new WeakMap();
class Stack {
  constructor(size) {
    this.size = size;
    // 私有属性
    privates.set(this, []);
  }
  // 入栈
  push(value) {
    privates.get(this).push(value);
    return this;
  }
  // 查看栈中成员
  view() {
    console.log(privates.get(this));
  }
}
// 默认导出
export default Stack;
<script type="module">
  import Stack from "./Stack.js"; const stack = new Stack(10); // 正确被执行
  console.log(stack.push(1)); stack.view(); // 代理 const proxyStack = new
  Proxy(stack, {}); console.log(proxyStack.push()); //
  抛出错误，因为内部this问题，造成privates.get(this)得到的是undefined，所以无法调用push方法而报错
</script>;
```

代码解析

上面代理失败，是因为`WeakMap`中保存的是`stack`对象与数组的映射关系，而代理后，`this`不再指向`stack`，而指向`proxy`对象，此时在`WeakMap`中找不到相关的映射。

> 所以 `privates.get(this)`返回的值为`undefined`, `undefined`打点调用 push 方法肯定就会报错。

如果我们直接代理 Stack 类，是可以的，因为 this 没有问题

```html
<script type="module">
  import Stack from "./Stack.js";
  const proxyStack = new Proxy(Stack, {});
  const stack = new proxyStack(10);
  stack.push(1).push(2);
  stack.view();
  console.log(stack.size);
</script>
```

### 2、无法代理的原生对象

TIP

有些原生对象的内部属性只能通过正确的 this 才能获取，所以 Proxy 也无法代理这些原生对象属性。比如`new Date()`出来的对象

> 具体演示看以下代码：

```js
const date = new Date();
const handler = {};
const proxy = new Proxy(date, handler);
proxy.getDate(); // this is not a Date
```

注：

上面代码中，`getDate()`方法只能在 Date 对象的实例上获取，所以 this 不是 Date 对象实例时就会报错。

> 解决办法，就是让`getDate()`方法内的 this 永远指向 Date 实例。

```js
const date = new Date();
const proxy = new Proxy(date, {
  get(target, prop) {
    if (prop === "getDate") {
      return target[prop].bind(target);
    }
    return target[prop];
  },
});
console.log(proxy.getDate()); // 24
console.log(proxy.getMonth()); // 报错  因为this指向不是Date实例
```

## 四、Reflect 反射

TIP

Reflect 对象与 Proxy 对象一样，也是 ES6 为了操作对象而提供的新的 API。

Reflect 是一个内置的对象，他不是一个函数对象，所以他不可以用 new 来调用。Reflect 对象所有的属性和方法都是静态的（这一点和 Math 对象一样）。

> Reflect 对象被设计出来，主要是解决什么问题呢 ？

### 1、Reflect 对象被设计的目的

TIP

Reflect 对象被设计出来，主要有以下四个目的：

- 将 Object 对象一些明显属于语言内部的方法，放到了 Reflect 对象上，同时未来新增加的语言内部的方法都会放在 Reflect 对象上

> 比如`Object.defineProperty`方法，现在 Reflect 对象上也添加了此方法。所以现阶段`Object`和`Reflect`对象上都有这个方法

- 修改某些 Object 方法的返回结果，让其变得更合理。

> 比如`Object.defineProperty()`方法，如果属性定义失败时会抛出一个错误，则`Reflect.defineProperty()`则会返回 false

```js
// 旧的写法,属性定义不成功抛出错误，所以需要用try...catch语句来捕获错误
const obj = {};
Object.preventExtensions(obj);
try {
  Object.defineProperty(obj, "name", {
    value: "清心",
  });
} catch (e) {
  console.log(e);
}

// 新写法，属性定义不成功，返回值为false，可以直接通过if语句来判断
const obj = {};
Object.preventExtensions(obj);
if (Reflect.defineProperty(obj, "name", { value: "清心" })) {
  // 成功...
} else {
  // 失败
  console.log("添加失败");
}
```

- 让 Object 的操作变成函数行为

TIP

比如判断某个属性是否为对象的属性时，我们采用的是 `属性 in 对象`。而`Reflect.has()`方法，让他变成了函数行为。

比如我们想要删除对象的某个属性时，我们采用的是`delete 对象.属性`。而`Reflect.deleteProperty()`方 法，将它变成了函数行为。

```js
// 旧写法
const obj = {
  name: "清心",
  age: 33,
};
console.log("name" in obj);
console.log(delete obj.age);
console.log(obj);

// 新写法
const obj = {
  name: "清心",
  age: 33,
};
// 判断 name是否是obj的属性
console.log(Reflect.has(obj, "name"));
// 删除 obj的age属性
console.log(Reflect.deleteProperty(obj, "age"));
// 打印obj
console.log(obj);
```

- `Reflect`对象的方法与`Proxy`对象的方法一一对象，这使得`Proxy`可以代理（覆盖）目标对象的默认行为，而`Reflect`对象总能找到对应方法获取目标对象的默认行为|

```js
const obj = {
  name: "清心",
  _sex: "女",
};
const proxy = new Proxy(obj, {
  set(target, prop, value) {
    if (prop[0] === "_") {
      return false;
    }
    Reflect.set(target, prop, value);
    // 上面代码等价于  target[prop] = value;
    return true;
  },
});

proxy.name = "icoding";
proxy._sex = "男";
console.log(obj);
```

### 2、Reflect 对象的静态方法

TIP

Reflect 对象一共有 13 个静态方法，这些方法与 Proxy 对象的方法一一对象。

| 静态方法                                   | 描述                                                                                                                    |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `Reflect.get(obj,name,receiver)`           | 返回`obj`对象的`name`属性，如果没有该属性返回`undefined`                                                                |
| `Reflect.set(obj,name,value,receiver)`     | 设置`obj`对象的`name`属性值等于`value`                                                                                  |
| `Reflect.defineProperty(obj,prop,desc)`    | 为对象 obj 添加属性，相当于`Object.defineProperty(obj,prop,desc)`                                                       |
| `Reflect.has(obj,name)`                    | 判断`name`是不是`obj`对象的属性，相当于 `name in obj`                                                                   |
| `Reflect.apply(fn,thisArg,args)`           | 相当于函数调用 apply 方法，即`fn.apply(thisArg,args)`                                                                   |
| `Reflect.construct(obj,args)`              | 等同于`new target(...args)` 创建类的实例                                                                                |
| `Reflect.deleteProperty(obj,name)`         | 删除`obj`对象的`name`属性，等同于 `delete obj.name`                                                                     |
| `Reflect.getPrototypeOf(obj)`              | 获取对象的原型，相当于`Object.getPrototypeOf(obj)`                                                                      |
| `Reflect.setPrototypeOf(obj,newProto)`     | 设置对象的原型,相当于`Object.setPrototypeOf(obj,newProto)`                                                              |
| `Reflet.getOwnPropertyDescriptor(obj,key)` | 获取对象属性的属性描述符对象，相当于`Object.getOwnPropertyDescriptor()`方法                                             |
| `Reflect.ownKeys(target)`                  | 返回对象的自身所有属性（可遍历+不可遍历+Symbol)，等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和 |
| ......                                     |                                                                                                                         |

**基本使用**

```html
<script>
  "use strict";
  const obj = {
    name: "icoding",
    age: 33,
    _sex: "女",
    [Symbol()]: "symbol值",
    say() {
      console.log(`大家好，我是${this.name}今年${this.age}岁了`);
    },
  };

  const proxy = new Proxy(obj, {
    get(target, prop) {
      if (prop[0] === "_") {
        throw new Error("私有属性，不能获取");
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (prop[0] === "_") {
        throw new Error("私有属性，不能重新被赋值");
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty(target, prop) {
      if (prop[0] === "_") {
        return false; // 严格模式下，抛出错误
      }
      return Reflect.deleteProperty(target, prop);
    },
    has(target, prop) {
      if (prop[0] === "_") {
        return false;
      }
      return Reflect.has(target, prop);
    },
    defineProperty(target, prop, desc) {
      // ....
      return Reflect.defineProperty(target, prop, desc);
    },
    getPrototypeOf(target) {
      // ....
      return Reflect.getPrototypeOf(target);
    },
    setPrototypeOf(target, proto) {
      // ....
      return Reflect.setPrototypeOf(target, { a: 1 });
    },
    ownKeys(target) {
      // ....
      return Reflect.ownKeys(target);
    },
  });
  try {
    console.log(proxy._sex);
  } catch (e) {
    console.log(e);
  }
  console.log(proxy.name);
  //   proxy._sex = "男";
  proxy.age = 18;
  console.log(proxy.age);

  delete proxy.age;
  console.log(proxy);
  try {
    delete proxy._sex;
  } catch (e) {
    console.log(e);
  }

  console.log("c" in proxy); // false
  console.log("_sex" in proxy); // false
  console.log("name" in proxy); // true

  const bool = Reflect.defineProperty(obj, "money", {
    value: 1000,
    writable: false,
  });

  const bool2 = Object.defineProperty(obj, "weight", {
    value: "1.6cm",
    writable: false,
  });
  console.log(bool);
  console.log(obj);

  console.log(Object.keys(obj));
  console.log(Object.getOwnPropertySymbols(obj));
  console.log(Reflect.ownKeys(obj));
</script>
```

温馨提示：

Reflect 和 Object 上都存在的方法，建议以后使用 Reflect 身上的方法，因为 Object 身上的相关方法会慢慢被 Reflect 替换掉。

### 3、注意事项

TIP

关于 Reflect 对象的静态方法，有以下几个需要注意的点

- 如果对象的属性是一个访问器属性，具有 get 方法，则 get 方法内部的 this 指向`Reflect.get(target,name,receiver)` 方法中的 receiver 参数。

```js
const obj = {
  a: 1,
  b: 2,
  get foo() {
    console.log(this.a);
    console.log(this.b);
  },
};

const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    //   return Reflect.get(target, prop, receiver);  // receiver默认为proxy
    return Reflect.get(target, prop, { a: 10, b: 20 });
  },
});

proxy.foo;
```

- 如果对象的属性是一个访问器属性，具有 set 方法，则 set 方法内部的 this 指向`Reflect.set(target,name,value,receiver)` 方法中的 receiver 参数。

```js
const obj = {
  a: 1,
  b: 2,
  set foo(value) {
    console.log(this.a);
    console.log(this.b);
  },
};

const proxy = new Proxy(obj, {
  set(target, prop, value, receiver) {
    //   return Reflect.set(target, prop, value, receiver);
    return Reflect.set(target, prop, value, { a: 10, b: 20 });
  },
});

proxy.foo = "hello";
```
