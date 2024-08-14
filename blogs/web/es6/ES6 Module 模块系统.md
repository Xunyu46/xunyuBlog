---
title: ES6 Module 模块系统
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 Module 模块系统



本节内容我们开始学习 ES6 中的 Module 模块系统相关内容，以及 Module 在实际开发中的注意事项 和 应用。

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的`require`、Python 的`import`，甚至就连 CSS 都有`@import`，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍

- 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。
- ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
- ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

**JS 模块化历程**

- JS 在发展历程中遇到的问题
- 模块化中遇到的问题
- 解决了哪些具体的问题

**认识 Module**

- Module 是什么 ？Module 环境
- Module 的基本用法

**Module 的导入和导出**

- export default 和 对应的 import
- export 和 对应的 import

**Module 在实际开发中的注意事项 和 应用**

- Module 的注意事项
- Module 的应用

**Module 总结与测试题**

## 一、JavaScript 模块化历程



深入浅出 JavaScript 模块化的发展历程、过程中遇到了哪些问题 及 模块化出现后解决了哪些问题 。

### 1、JS 发展中遇到的问题



早期 JS 能做的事情不多，其代码量也不大，我们通常把所有的 JS 写在一个文件中。但随着 JS 的发展，JS 能做的事情也就越来越多了，JS 的代码量也就越来越多，如果所有的 JS 代码都放在一个文件中，开发和维护都是极为不方便的，更不方便多人协作开发。

为了解决这些问题，我们开始考虑 JS 模块化，把不同功能的 JS 代码抽取出来放在一个单独的 JS 文件中，然后用简单的办法他们拼接起来。

这样可以多人协作来开发，每个人开发一部分功能，同时维护起来方便，那个功能需要更改，就需要找到对应功能的那个 js 文件来修改就好。

> **JS 模块化：** 可以理解为把一个大的 JS 程序拆分成多个相互依赖的小文件，再用简单的方法将它们拼装起来。

我们来看一个简单的案例，求对象中两个属性的最大值和最小值，我们可以把所有代码写在一个 JS 文件中，如下：

```js
// 数据配置对象
const data = {
  max: 10,
  min: 1,
};
// 求最小值
function min() {
  return data.max > data.min ? data.min : data.max;
}
// 求最大值
function max() {
  return data.max > data.min ? data.max : data.min;
}
```

注：

求最大值和最小值是两个独立的函数，并没有什么关联。但后面很多其的项目中需要用到这两个方法。 为了能够实现复用，我们把这两个函数独立出去放到两个不同的 JS 文件中实现。假设这两个函数内部实现相当复杂，我们就把他们交给了两个不同的程序员来开发。在开发前，协商好数据配置对象按规定的格式，写入`config.js`文件中。最终开发出来的代码如下：

- `config.js`文件为数据配置对象，用户可以自定义两个需要比较的数,前期是要遵守一定规则。
- `min.js` 文件，用来求两个数中的最小值
- `max.js`文件，用来求两个数中的最大值

```js
// config.js
const data = {
  max: 10,
  min: 1,
};

// max.js
let a = data.max;
let b = data.min;
function max() {
  return a > b ? a : b;
}

// min.js
let a = data.max;
let b = data.min;
function min() {
  return a > b ? a : b;
}
```

接下来我们在`index.html`页面引入这三个 JS 文件，并调用`max`和`min`函数，求出最大值和最小值

```html
<script src="./config.js"></script>
<script src="./max.js"></script>
<script src="./min.js"></script>
<script>
  console.log(max());
  console.log(min());
</script>
```

注：

以上代码并没有办法正确的执行，原因在于

> `max.js`和`min.js`文中的变量`a,b`发生了**命名的冲突**。

当我们把`max.js`中的变量`a,b`改为`m,n`（代码如下），错误消失了，并且代码正常执行了。

```js
let m = data.max;
let n = data.min;
function max() {
  return m > n ? m : n;
}
```

但是，如果我们再把`index.html`页面中引入 JS 文件的顺序打乱，代码如下：

```html
<script src="./max.js"></script>
<script src="./min.js"></script>
<script src="./config.js"></script>
<script>
  console.log(max());
  console.log(min());
</script>
```

注：

以上代码执行时，又抛出了错误`max.js:1 Uncaught ReferenceError: data is not defined` 错误。原因在于`max.js`和`min.js`在`config.js`文件前面引入，所以在执行`max.js`和`min.js`时，data 变量还没有定义。这就引发了我们上面提到的第二个错误

> 多个 JS 文件之间存在依赖关系，必需严格的保证 JS 的加载顺序。

### 2、早期模块化遇到的问题



通过上面案例的讲解，我们发现当我们把一个大的 JS 程序拆分成多个小的 JS 文件后，好外很明显，就是可以实现代码的复用，同时可以多人协作开发，每人开发一个小的功能，然后再把他们拼接起来。但同时也遇到了以下两个问题

**两个问题：**

- 一个页面需要加载多个 JS 文件，多个不同的 JS 文件之间就有可能存在变量命名冲突问题（同时大部分变量为全局变量，造成全局变量的污染）
- 多个 JS 文件之间还存在依赖关系，因此必须要严格的保证 JS 文件的加载顺序，否则就会出错。

### 3、解决多个 JS 文件变量命名冲突问题



多个 JS 文件中的变量之所以发生命名冲突问题，是因为这些相同的变量都在同一作用域（全局作用域下）

**早期的解决办法有以下二种：**

- 1、所有代码定义在一个对象中，对外暴露这个对象,通过访问对象的属性和方法来使用
- 2、将所有代码用`IIFE`立即执行函数包裹起来，将需要暴露的接口作为 window 对象的属性暴露出去。这样他们分别处于不同的函数作用域中，**不仅解决了变量命名冲突问题，也减少了全局变量的污染，但并没有完全消除全局变量的污染**

```js
// 方法一：作为对象的属性和方法
const maxObj = {
  m: data.max,
  n: data.min,
  max() {
    return this.m > this.n ? this.m : this.n;
  },
}(
  // 方法二： IIFE立即执行函数
  function () {
    let m = data.max;
    let n = data.min;
    function max() {
      return m > n ? m : n;
    }
    // 将max作为window对象的属性，暴露出去
    window.max = max;
  }
)();
```

注：

JS 模块化对于 JS 来说很重要，但 JS 原生不支持，所以社区制定了一些模块加载的方案，最主要的有 CommonJS 和 AMD、CMD。当然现在 ES6 原生支持模块化了，所以我们不再需要了解这些插件库的应用，直接来学习 ES6 的 Module 模块化就好。

## 二、认识 Module



ES Module 把一个 JS 文件当作一个独立的模块，这个文件内的所有变量，外部都无法获取。如果外部需要获取模块内的某个变量，就必需要使用`export`关键字输出该变量。在外部利用`import`关键字来导入该模块，并导入模块对外输出的内容。

ES Module 主要就是用来解决以下三大问题：

- JS 模块化的问题（一个 JS 文件就是一个模块，有自己独立的作用域）
- 变量命名冲突问题
- 管理模块间的加载顺序问题

### 1、Module 需要的环境



在学习 Module 模块系统之前，首先需要知道一点，Module 模块系统它需要一个服务器环境才能正常的执行。

- 如我们将 Module 模块系统的代码写在 `.html` 文件中，直接打开是不能正常执行的
- 直接使用 VSCode 中的 `Live Server` 本地服务器环境即可。
- 接下来的学习，我们需要全程使用 `Open with Live Server` 的方式打开了

### 2、Module 模块化的简单使用

`.config.js`数据配置文件，为一个单独的模块

```js
const data={
	max:10;
	min:1
}
export default data; // 导出模块接口
```

`max.js` 为一个单独的模块

```js
import data from "./config.js";
let a = data.max;
let b = data.min;
function max() {
  return a > b ? a : b;
}
export default max; // 导出模块接口
```

`min.js` 为一个单独的模块

```js
import data from "./config.js";
let a = data.max;
let b = data.min;
function min() {
  return a > b ? b : a;
}
export default min; // 导出模块接口
```

`index.html`文件中，通过以下方式来加载模块

```html
<script type="module">
  // 加载模块
  import max from "./max.js";
  console.log(max());
  // 加载模块
  import min from "./min.js";
  console.log(min());

  // 在这里，我们没有办法访问max.js和min.js中的变量a和b
  // console.log(a,b); // 报错
</script>
```

注：

通过 ES Moudle 来实现 JS 模块化的模块化，轻松的解决了上面提到的三大问题：

- JS 模块化的问题（每个 JS 文件就是一个模块，有自己独立的作用域，通过 export 导出模块接口）
- 变量命名冲突问题
- 管理模块间的加载顺序问题

## 三、Module 的导入与导出



深入浅出 `export default` 和 对应的 `import`，`export` 和 对应的 `import` 等

> Module 导入和导出模块有两种形式：

- `export default` 导出 和 `import` 导出
- `export` 导出 和 `import` 导出

### 1、export default 和 对应的 import



- `export default` 命令为模块指定默认输出（导出）
- `import` 用来加载模块，并导入模块中导出的内容

新建 `module.js` 文件

```js
const username = "icoding";
// 用export default 导出模块中的默认输出
export default username;
```

新建 `index.html` 文件

```html
<!-- type="module" 必需要写，否则没有办法把js当成模块来加载-->
<script type="module">
  // 并用import来导入模块导出的变量，这里的变量名可以是任意名字
  // import username from "./module.js";  // 这里的变量名可以取任意名字
  // console.log(username);

  import myname from "./module.js";
  console.log(myname);
</script>
```

注：

带有`type = 'module'`的`<script>`标签，浏览器是异步加载的，不会造成浏览器堵塞，即等到整个页面渲染完再执行模块脚本，等同于打开了`<script>`标签的`defer`属性

```html
<script type="module">
  const box = document.getElementById("box");
  console.log(box.innerHTML); // 我居然显示出来了
</script>

<div id="box">我居然显示出来了</div>
```

**注意事项**

- `export default` 命令为模块指定默认输出时，显然一个模块只能有一个默认输出，所以`export default`命令只能使用一次

```js
const username="icoding";
// 报错，因为一个模块中只能有一个export default
export default username
export default 53;
```

温馨提示：

一个模块只能有一个 `export default`，如果我们的模块只需要导出一个值，即可使用 `export default`

- `export default`本质上就是输出一个叫作`default`的变量或方法，所以`export default`后面只能是变量或值，不能是变量声明语句，相当于把后面的值或变量中的值赋值给到变量 `default`。

```js
const username = "icoding";
// 正确导出
export default username;
// export default 53;
// export default function fn(){}
// export default function(){}
// export default {}
// export default class A{}
// export default class{}
```

错误的导出，因为 `export default` 后面只能是值或变量，不能是变量声明语句

```js
// 错误导出
// export default const username = "icoding";
// export default let fn = function(){}
// export default const obj = {}
```

### 2、export 和 对应的 import



- `export`命令用来指定模块的对外输出接口，可以对外输出多个接口，这一点与`export default`不同
- `import` 命令用来导入其他模块的导出接口

**提示**

- export 命令规定的是对外的接口，所以其后只能是声明语句，不能是值或变量。
- import 用导入 export 导出的接口时，导入时变量名，需要与导出时一模一样。

```js
// 正确导出
export let num=1;
export function fn(params) {}
export class A{}
export let obj={}

// 错误导出接口
let num=1
export num;
export function(){}
export class {}
export obj{}
```

新建`module.js`文件

```js
// export导出多个接口：函数  类  变量等
export function foo() {}
export class Person {}
export const sex = "male";
```

新建`index.js`文件

```html
<script type="module">
  // import导入多个接口，其导入时变量名与export导出时一模一样，同时要写在{}中
  // import { foo } from "./module.js";
  // import { Person } from "./module.js";
  // import { sex } from "./module.js";
  // 下面import代码，等价于上面分三次导入
  import { foo, Person, sex } from "./module.js";

  console.log(foo); //  ƒ foo() { }
  console.log(Person); // class Person { }
  console.log(sex); // male
</script>
```

### 3、export 多个接口统一导出

思考：

如果需要导出的变量、对象或方法有几十个怎么办，难道也要一个一个手动导出吗 ？

> 一个一个导出，显然太麻烦了，export 允许一次导出多个

```js
function foo() {}
class Person {}
const sex = "male";
// 一次性导出多个接口
export { foo, Person, sex };
```

导入

```html
<script type="module">
  import { foo, Person, sex } from "./module.js";
</script>
```

### 4、export 导出取别名



使用 `as`关键字可以为导出的变量取别名，如果取了别名后，import 在导入时，需要用别名来导入。

```js
function foo() {}
class Person {}
const sex = "male";

// 使用 as 关键字起别名
export { foo as func, Person, sex };
```

导入

```html
<script type="module">
  // func必需与export导出时的别名一致
  import { func, Person, sex } from "./module.js";
  // 调用时
  console.log(func, Person, sex);
</script>
```

### 5、import 导入时取别名



使用 `as`关键字可以为导入的变量取别名，如果取了别名后，后面输出内容只能使用别名。

```js
function foo() {}
class Person {}
const sex = "male";

// 使用 as 关键字起别名
export { foo, Person, sex };
```

导入

> 一般在使用第三方库时，为了保证代码风格的统一，就需要取别名

```js
import { foo as bar, Person as People, sex } from "./module.js";
console.log(bar); // 必需使用别名，否则访问不到
console.log(People); // 必需使用别名，否则访问不到
console.log(sex);
```

### 6、import 整体导入



如果 export 导出接口很多，我们需要一个一个导入显然也是非常麻烦的，所以 import 也是允许一次性整体导入的。

利用 `*`号来导入多个导出，因为`*`不能当做变量名来使用，所以我们都要为他取别名。

```js
function foo() {}
class Person {}
const sex = "male";
const username = "icoding";
export default username;
// 一次性导出接口（多个变量）
export { foo, Person, sex };
```

整体导入所有输出（导出）

```html
<script type="module">
  // * 表示所有的输入
  // as obj 别名
  import * as obj from "./module.js";
  console.log(obj);
  // 取出所有接口，利用对象的解构赋值
  const { default: username, foo, Person, sex } = obj;
  console.log(username);
  console.log(foo);
  console.log(Person);
  console.log(sex);
</script>
```

> 以上 obj 为一模块对象，所以我们需要通过对象打点属性的方式来访问导出的接口

![image-20230221004204348](https://www.arryblog.com/assets/img/image-20230221004204348.b5f59884.png)

### 7、export 与 export default 同时导出



我们可以在一个模块文件中同时用 export 来导出多个接口，也可以用 export default 导出默认输出（接口）

```js
function foo() {}
class Person {}
const sex = "male";
const username = "icoding";
// 一次性导出接口（多个变量）
export { foo, Person, sex };
// 默认导出
export default username;
```

import 一次性导入所有接口

> 在 import 导入时，export default 导出的默认接口，必需要写在最前面，然后用逗号分隔，后面的`{}`为 export 导出的多个接口

```html
<script type="module">
  // 错误写法
  // import { foo, Person, sex },username from "./module.js";
  // 正确写法
  import username, { foo, Person, sex } from "./module.js";
  console.log(username); // icoding
  console.log(foo); // ƒ foo() { }
  console.log(Person); // class Person { }
  console.log(sex); // male
</script>
```

### 8、export 的注意事项



export 语句输出的接口与其对应的值是动态绑定关系，即可以通过接口取到模块内部实时的值

`module.js` 文件

```js
export let username = "清心";
setTimeout(() => {
  username = "icoding";
}, 3000);
```

`index.js` 文件

```html
<script type="module">
  import { username } from "./module.js";
  console.log(username);
  setTimeout(() => {
    console.log(username);
  }, 3000);

  // 最终输出结果： 清心  icoding
</script>
```

## 四、import 关键字



深入浅出 import 关键字导入模块相关特性

### 1、import 关键字



通过前面的学习，我们知道 import 关键字用来导入模块的输出接口。不过他还有一些重要的特点，需要我们掌握，具体如下：

- import 可以只用来导入模块（模块中可以没有导出接口）
- import 命令具有提升效果，会提升到整个模块的头部，率先执行
- import 是静态执行，也就是说 import 命令是编译阶段执行的，也就是说 import 导入的模块是编译阶段就确定好了
- 多次加载同一个 import 语句，只会执行一次（相当多次加载，后面的会覆盖前面的，所以在执行阶段只有一份代码）。
- import 可以用于在一个模块中导入另一个模块

### 2、import 只用来导入模块



import 可以只用来导入模块（模块中可以没有导出接口）

`module.js` 模块文件

```js
console.log("我是module.js模块中引入的代码 ...");
<script type="module">
  // 导入模块
  import "./module.js";

  // 在控制台输出： 我是module.js模块中引入的代码 ...
</script>

<!--如果import只是用来导入模块，则可以简写成如下形式-->
<script type="module" src="./module.js"></script>
```

### 3、import 具有提升效果



import 命令具有提升效果，会提升到整个模块的头部，率先执行

`module.js` 模块文件

```js
console.log("我是module.js模块中引入的代码 ...");
```

`index.js`文件中引入 `module.js`模块文件

```html
<script type="module">
  console.log("我是第一个");
  console.log("我是第二个");
  // 导入模块
  import "./module.js";
</script>
```

![image-20230221011231184](https://www.arryblog.com/assets/img/image-20230221011231184.fd08276c.png)

注：

以上打印输出结果，我们可以看到 导入的模块中的代码率先执行了

> import 命名导入的模块代码，不论你写在页面的任何位置，都会提升到最开头的地方（所有代码的前面，率先执行）

因为，在执行代码之前，浏览器 JavaScript 引擎静态分析会先分析代码中的 import 语法，会在所有代码执行之前先找到 import，将它提升到最前面并先执行完成之后，再执行其他代码。

以下代码，并不会如我们期望的那样去执行，因为`import`命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行

```html
<script type="module">
  // 模拟判断如果是PC端，执行pc端模块代码，如移动端执行移动端代码（伪代码）
  let pc = true; // pc端
  let yd = false; // 移动端
  if (pc) {
    import "./pc.js";
  } else if (yd) {
    import "mobile.js";
  }
</script>
```

注：

上面代码中，引擎处理`import`语句是在编译时，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。

> 因此，`import`和`export`命令只能在模块的顶层，不能在代码块之中。

### 4、import 是静态执行



import 是静态执行，也就是说 import 命令是编译阶段执行的，也就是说 import 导入的模块是编译阶段就确定好了。

由于 import 是静态执行的，所以 import 语句中不能使用表达式或变量，也就是只有在代码执行阶段才能得到结果的语法结构。

```js
// 报错
import {'f'+'oo'} "./module.js";
// 报错
let bar = "foo";
import { bar } from "./module.js";
```

### 5、import 多次加载，只执行一次



多次加载同一个 import 语句，只会执行一次

`module.js` 模块文件

```js
console.log("我是module.js模块中引入的代码 ...");
function foo() {}
class Person {}
const sex = "male";
const username = "icoding";

export { foo, Person, sex };
```

`index.js`文件中多次引入 `module.js`模块文件

```html
<script type="module">
  import { foo } from "./module.js";
  import { Person } from "./module.js";
  import { sex } from "./module.js";

  console.log(foo);
  console.log(Person);
  console.log(sex);
</script>
```

![image-20230221012927154](https://www.arryblog.com/assets/img/image-20230221012927154.7009ad82.png)

注：

上面 import 导入了三次 module.js 文件，但是控制台只输出了一次`"我是module.js模块中引入的代码 ..."`。说明三次导入中只有一次被执行了。

### 6、一个模块中导入另一个模块



import 可以用于在一个模块中导入另一个模块，这个功能解决了多个 JS 文件之间的依赖关系

`config.js`配置文件

```js
const data = {
  max: 10,
  min: 1,
};
export default data; // 默认导出
```

`add.js`文件，在这文件中导入`config.js`文件

```js
import data from "./config.js"; // 导入config.js模块
let a = data.max;
let b = data.min;
function max() {
  return a > b ? a : b;
}
export default max;
```

`index.js`文件

```html
<script type="module">
  // 导入模块
  import max from "./max.js";
  console.log(max());
</script>
```

## 五、import() 函数



在前面我们学习了 import 命令（关键字），import 命令会被 JS 引擎**静态分析**（也就是被加载的模块会在编译阶段就确定好），同时他会被提升到当前模块（代码）的最前面，并在执行阶段最先执行。

> 所以，以下这种形式的代码会报错

```html
<script type="module">
  let a = 3;
  if (a === 4) {
    import myname from "./a.js";
  }
</script>
```

注：

上面代码中，引擎处理`import`语句是在编译阶段，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。

> 因此，`import`命令只能在模块的顶层，不能在代码块之中。

因为模块的加载是在编译阶段就确定好的，也就是模块之间的依赖关系是在编译阶段就确定好的。这样有利于提高编译器的效率，但也导致无法在运行时加载模块。也就是我们没有办法按条件来加载对应模块。

> 因此，[ES2020 提案 (opens new window)](https://github.com/tc39/proposal-dynamic-import)引入`import()`函数，支持动态加载模块。

### 1、import() 动态加载模块



`import()`函数用于动态加载模块，他与`import`关键字存在以下区别

- `import()`函数支持动态加载模块，他可以在任何地方使用。
- `import()`函数是在运行时执行的，只有当代码运行到`improt()`函数这一语句时，才会开始加载指定模块。
- `import()`函数加载模块属于运行时异步加载

**代码演示**

```js
// a.js文件
console.log("a.js模块执行了");

// b.js文件
console.log("b.js模块执行了");
```

`index.js`文件

```html
<script type="module">
  console.log("同步一");
  setTimeout(function f1() {
    console.log("定时器1000");
  }, 1000);
  let a = 3;
  if (a === 4) {
    import("./a.js");
  } else {
    import("./b.js");
  }

  setTimeout(function f0() {
    console.log("定时器0");
  }, 0);
  console.log("同步二");
</script>
```

![image-20230221163253618](https://www.arryblog.com/assets/img/image-20230221163253618.f624c143.png)

上面代码，从上往下执行

- 遇到同步代码，打印“同步一”，
- 遇到异步代码，在 1s 后，将回调函数 f1 添加到宏任务队列，接着向下执行。
- 遇到`import()函数`加载模块，因为`import()`函数加载模块为异步加载，需要等模块加载成功后，才会把模块代码添加到宏任务队列中排着。等着同步任务全部执行完后，再执行。
- 遇到定时器，马上将回调函数 f0 添加到宏任务队列。

> 任务队列中需要执行的任务：fn0 ，import 模块，fn1

### 2、import() 函数返回值



`import()`函数的返回值为`promise`对象，`promise`对象的返回值(即`[[PromiseResult]]`属性值）为一个对象，这个对象的成员为模块对外导出的接口。

> 所以我们可以利用 promise 对象的 then 方法中的参数来接受这个对象，然后利用对象的解构赋值来获取输出的接口。

- 模块中只有 export 方式导出的接口，可以直接利用对象解构赋值来获取输出的接口

```js
// moudle.js
function foo() {}
class Person {}
const obj = {};
// 导出接口
export { foo, Person, obj };
<script type="module">
  const p = import("./module.js");
  p.then((data) => {
    // console.log(data); 查看data模块对象
    const { foo, Person, obj } = data;
    console.log(foo); // ƒ foo(){}
    console.log(Person); // class Person{}
    console.log(obj); // {}
  });
</script>

<!--或下面这种写法-->
<script type="module">
  const p = import("./a.js");
  p.then(({ foo, Person, obj }) => {
    console.log(foo);
    console.log(Person);
    console.log(obj);
  });
</script>
```

- 如果模块中，只有 export default 的默认输出

```js
// module.js
let username = "icoding";
export default username;
<script type="module">
  const p = import("./module.js");
  p.then((data) => {
    console.log(data.default); // // "icoding"
  });

  // 或下面这种方式，具名输出
  p.then(({ default: username }) => {
    console.log(username); // "icoding"
  });
</script>
```

- 有 export 导出，又有 export default 的默认导出

```html
<script type="module">
  const p = import("./module.js");
  p.then(({ default: username, foo, Person, obj }) => {
    console.log(username);
    console.log(foo);
    console.log(Person);
    console.log(obj);
  });
</script>
```

### 3、一次性动态加载多模块



一次性动态加载多个模块，可以一个一个处理，但还需要用一个新的 Promise 对象包装下。

```html
<script type="module">
  const p1 = import("./a.js");
  const p2 = import("./b.js");
  const p3 = import("./c.js");
  // 然后分别处理，获取输出的接口
  p1.then((data)=>{....})
  p2.then((data)=>{....})
  p3.then((data)=>{....})
  // 如果我们需要一次拿 到三个模块的输出接口，才开始后面的操作，显然上面的写法不能实现
  // 我们还需要再用Promise来包装下，所以我们可以用我们之前学过的Promise.all方法来处理
</script>
```

利用 `Promise.all` 方法来处理

```html
<script type="module">
  Promise.all([import("./a.js"), import("./b.js"), import("./c.js")]).then(
    ([module1, module2, module3]) => {
      // ....
      console.log(module1);
      console.log(module2);
      console.log(module3);
    }
  );
</script>
```

## 六、在实际开发中的注意事项



深入浅出在实际开发中的逐一实现：模块顶层的 this 指向、导入导出的复合写法

### 1、模块顶层的 this 指向



模块中，顶层的 this 指向 `undefined`

```js
// module.js 文件
console.log(this); // module.js作为模块时，其顶层this指向undefined
<!--在index.js文件中导入模块module.js-->
<script type="module">
  import "./module.js";
</script>

<!-- 或 -->
<script src="./module.js" type="module"></script>
```

注：

防止用户不使用模块的方式导入（如不使用模块的方式导入，this 就是指向 window 了，相当于导入了一个普通的 JS 文件），我们可以使用这一特性来限定某个 JS 文件只能以模块的方式加载，否则就抛出错误。

**JS 文件只能以模块方式加载**



在模块 `module.js` 文件中，如果 `this 指向 ≠ undefined` 时，抛出错误，提示用户需要使用模块化的方式来加载

```js
// module.js 文件
if (typeof this !== "undefined") {
  throw new Error("请使用模块的方式加载 ...");
}
```

如果在 `index.html` 文件中使用普通的 JS 文件的方式导入

```html
<!-- 使用普通引入JS文件的方式，未使用模块化的方式加载时，就会抛出自定义错误 -->
<script src="./module.js"></script>
```

![image-20221120000711149](https://www.arryblog.com/assets/img/image-20221120000711149.b1f7bdf6.png)

### 2、导入导出的复合写法（了解）



如果在一个模块之中先输入后输出同一个模块，则可以采用复合写法，将 import 语句与 export 语句写在一起。

> 具体如下

```js
import { a, b } from "./a.js"; // 在b模块中，导入a模块接口
export { a, b }; // 导出接口a,b

// 上面写法，等同于
export { a, b } from "./a.js"; // 导出从a模块导入的接口a，b
```

> 不过分开写与复合写法之间还是存在不同，分开写，可以在当前模块中使用导入的接口，而复合写法是没有办法在当前模块中使用导入的接口。

```js
// b.js 文件
import { a, b } from "./a.js";
export { a, b };
console.log(a, b); // 正确输出结果
// b.js文件
export { a, b } from "./a.js";
console.log(a, b); // 抛出引用错误，a和b未定义
```

![image-20230221181556101](https://www.arryblog.com/assets/img/image-20230221181556101.7c1c6d3d.png)

**基本应用**

```js
// a.js文件
export let a = 1;
export let b = 2;

// b.js文件
export let m = 10;
export let n = 20;
export { a, b } from "./a.js"; // 导出从a模块导入的接口a，b
<!--index.js 文件-->
<script type="module">
  import { a, b, m, n } from "./b.js";
  console.log(a, b, m, n); // 1 2 10 20
</script>
```

**其它应用**

- 复合写法中实现修改接口名字

```js
// b.js文件
export { a as aa, b } from "./a.js";
```

- 整体导入并导出

```js
export * from "./a.js";
```

以上整体导入并导出，会忽略`a.js`模块中的默认导出

```js
// a.js文件
let username = "icoding";
export default username;

// b.js文件
export * from "./a.js";
<!--index.js-->
<script type="module">
  import username from "./b.js";
  console.log(username);

  // 抛出错识：不提供名为 “default” 的导出
</script>
```

![image-20230221183346729](https://www.arryblog.com/assets/img/image-20230221183346729.928f4fc5.png)

- 导入默认接口，并将其作为默认接口导出

```js
// b.js
export { default, b } from "./a.js";

// default表示导入的默认接口，并将其作为默认接口导出（前提要保证b.js中没有其它的默认导出，否则会报错）
```

- 将导入的接口作为默认接口导出

```js
// b.js 文件
export { a as default, b } from "./a.js";

// 如果将导入的接口作为默认接口输出，必需要保证当前模块中没有默认接口输出，否则会报错，因为一个模块中只能有一个默认输出
```

> 以上复合写法仅需了解即可。

## 七、应用（用户自定义配置项）



我们现在有这样一个需求，实现一个名为`ball.js`的模块，当我们在 html 页面加载这个模块时，导入其`init`接口，调用下`init()`函数，就可以实现在页面插入一个小球。

当然，用户也可以根据自己的需求，在根目录下创建一个`ball.config.js`文件,然后按下面要求来配置小球的相关属性或方法等。

> `ball.config.js`文件默认导出一个对象，对象的相关属性和值需要遵守以下表格中的规则。

| 属性名  | 说明               | 值类型                                         |
| :------ | :----------------- | :--------------------------------------------- |
| color   | 小球颜色           | 字符串类型的颜色值，可以是 英文字母、rgb、rgba |
| r       | 小球半径           | 数字类型，必须为整数，最大不超过 100           |
| x       | 小球水平坐标       | 数字类型，必须为整数，最大不超过 1800          |
| y       | 小球垂直坐标       | 数字类型，必须为整数，最大不超过 800           |
| opacity | 小球垂直坐标透明度 | 数字类型，必须为 0-1 之间的小数                |

- `ball.config.js`文件

```js
// 用户自定义的配置文件，以下默认导出一个对象
export default {
  color: "red",
  r: 100,
  x: 200,
  y: 300,
  opacity: 0.5,
  // 不相关属性，用户没有遵守规定，随意添加的
  name: "球",
};
```

- `ball.js` 文件

```js
// 导入用户配置的参数
import userData from "./ball.config.js";

function init() {
  // 默认参数
  const defaultData = {
    color: "yellow",
    r: 20,
    x: 100,
    y: 100,
    opacity: 1,
  };

  // 遍历用户配置的参数，把不相关的属性过滤掉
  const obj = {};
  const keys = Object.keys(userData);
  for (let key of keys) {
    if (defaultData.hasOwnProperty(key)) {
      obj[key] = userData[key];
    }
  }

  // 将用户参数与默认参数合并
  const config = { ...defaultData, ...obj };

  // 创建小球
  const div = document.createElement("div");
  div.style.backgroundColor = config.color;
  div.style.width = config.r + "px";
  div.style.height = config.r + "px";
  div.style.position = "absolute";
  div.style.left = config.x + "px";
  div.style.left = config.y + "px";
  div.style.opacity = config.opacity;
  div.style.borderRadius = "50%";
  // 将小球插入到页面中
  document.body.appendChild(div);
}
// 导出init方法
export default init;
```

- `index.html` 页面

```html
<script type="module">
  import init from "./ball.js";
  init();
</script>
```

## 八、总结



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、Module 是如何加载的 ？



使用 script 标签加载模块时，需要添加 `type = "module"`

```html
<!-- 使用内联的方式加载 -->
<script type="module">
  import username from "./module.js";
</script>

<!-- 通过 src 引入的方式 -->
<script type="module" src="./module.js"></script>
```

### 2、导出和导入



- 一个模块的导出可以被其它模块导入，并访问
- 如果没有导出，也可以将其导入
- 多次导入相同的模块，最终也只会执行一次

### 3、export default 和 对应的 import



- `export default` 用于导出一个默认值，一个模块只能有一个。
- `export default` 后面只能是变量或值，不能是声明变量的语句

> 基本用法如下

```js
// 导出
export default 20;
export default class {}
export default function fn(){}

// 导入
import age from "./module.js";
```

### 4、export 和 对应的 import



export 用于导出声明或语句，其后不能是值或变量，只能是声明语句

> 一个模块中可以使用 export 导出多个接口

```js
// 导出
export const age = 20;
export function fn() {}
export class A {}

// 导入
import { age } from "./module.js";
```

export 可以将多个接口统一导出

```js
function foo() {}
class Person {}
const sex = "male";

// 统一导出
export { foo, Person, sex };

// 导入
import { foo, Person, sex } from "./module.js";
```

export 导出时，可以起别名

> 注：一旦使用别名后，原来的名字就失效了

```js
// 导出（起别名）
export { foo as fn, Person as p, sex as userSex };

// 导入
import { fn, p, userSex } from "./module.js";
```

import 导入时，也可以取别名

```js
function foo() {}
class Person {}
const sex = "male";

// 统一一个一个导出
export { foo, Person, sex };

// 导入（起别名）
import { foo as fn, Person as p, sex as userSex } from "./module.js";
```

- 同时导入 `export default` 和 `export` 导出的内容

```js
// 注意顺序，不能乱，否则会报错
// userSex 表示 export default 导出的
// { foo, Person, sex } 表示 export 导出的
import userSex, { foo, Person, sex } from "./module.js";
```

### 5、整体导入与导出



可以整体导入所有导出，包括 `export` 和 `export default` 的导出

```js
// * 通配符，表示所有导出
// as obj 起别名
import * as obj from "./module.js";
```

### 6、import 命令与 import 关键字



`import` 命令与 `import()` 函数都可以实现导入模块，并接受导出的接口，不过他们存在以下不同点

**import 命令与 import 函数的区别**

| 区别     | import 命令            | import 函数 |
| :------- | :--------------------- | :---------- |
| 出现位置 | 模块最顶层             | 任意位置    |
| 运行时机 | 编译阶段               | 执行阶段    |
| 加载方式 | 静态加载（编译时加载） | 异步加载    |

注：

import 命令不能与 if 配合，实现按需加载，而`import()`函数可以与 if 配合，实现按需加载

### 7、注意事项



- 模块顶层的 this 指向 undefined
- export 和 import 命令只能出现在模块的顶层
- 如果在一个模块之中先输入后输出同一个模块，则可以采用复合写法

```js
import { a, b } from "./a.js"; // 在b模块中，导入a模块接口
export { a, b }; // 导出接口a,b

// 上面写法，等同于
export { a, b } from "./a.js"; // 导出从a模块导入的接口a，b
```

## 九、测试题



自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、以下选项中关于模块化的描述错误的是 ？

> 单选

- A、每个模块有自己的独立作用域，避免命名冲突
- B、导入模块使用关键字 import
- C、导出模块使用关键字 export
- D、html 文件中在 script 标签中添加 `type="modules"` 属性，才能加载模块

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：D</p></details>

### 2、以下代码码中格式正确的一项是 ？

> 单选

A、

```js
let a=10;
export a;
```

B、

```js
export  function(){ }
```

C、

```js
export default let a=10;
```

D、

```js
let a = 10;
export default { a };
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：D</p></details>

### 3、下列在于模块的导出和导入，描述错误的是 ？

> 单选

- A、在一个模块中，可以同时使用 `export` 和 `export default` 导出
- B、`export default` 放式导出，`import` 在导入时，可以使用任意的变量名来接收
- C、`export` 方式导出，导入时必须添加`{}`，按照导出时候的名称和顺序接收
- D、在一个模块中，`export default` 只能有一个，`export` 可以有多个

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：C</p></details>

### 4、下列关于 import 命令与 import 函数的描述，错误的是 ？

> 单选

- A、import 命令只能出现在模块的最顶层，而`import()`函数，可以出现在任意位置
- B、import 关键字可以结合 if 语句，满足 if 条件时再引入模块，而`import()`函数不可以
- C、import 命令具有提升效果，会提升到当前模块的最前面，并最先执行
- D、`import()`函数的返回值为 Promise 对象，可以通过对象的 then 方法来接受输出的接口

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：B</p></details>

### 5、请问 index.html 文件中代码的输出结果是多少 ？

```js
// a.js
export let a=1;
export let b=2;
export default 'icoding';

// b.js
export {a as default,b} from './a.js'
export let a=10;
<!--index.html-->
<script type="module">
  import m, { a, b } from "./b.js";
  console.log(m);
  console.log(a);
  console.log(b);
</script>
```

<details class="custom-block details" open="" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;">正确答案：1 10 2</p></details>
