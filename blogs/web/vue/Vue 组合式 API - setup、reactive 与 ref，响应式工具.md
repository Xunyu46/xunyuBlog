---
title: Vue 组合式 API - setup、reactive 与 ref，响应式工具
date: 2023-10-24
sidebar: "auto"
categories:
  - vue
tags:
  - vue
publish: true
---

# Vue 组合式 API - setup、reactive 与 ref，响应式工具

组合式 API（Composition API）是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：

- [响应式 API (opens new window)](https://cn.vuejs.org/api/reactivity-core.html)：使我们可以直接创建响应式状态、计算属性和侦听器，如： `ref()` 和 `reactive()`
- [生命周期钩子 (opens new window)](https://cn.vuejs.org/api/composition-api-lifecycle.html)：使我们可以在组件各个生命周期阶段添加逻辑，如： `onMounted()` 和 `onUnmounted()`
- [依赖注入 (opens new window)](https://cn.vuejs.org/api/composition-api-dependency-injection.html)：使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统，如 `provide()` 和 `inject()`

组合式 API 是 Vue 3 及 [Vue 2.7 (opens new window)](https://blog.vuejs.org/posts/vue-2-7-naruto.html)的内置功能。对于更老的 Vue 2 版本，可以使用官方维护的插件 [`@vue/composition-api` (opens new window)](https://github.com/vuejs/composition-api)。

> 在 Vue 3 中，组合式 API 基本上都会配合 [`` (opens new window)](https://cn.vuejs.org/api/sfc-script-setup.html)语法在单文件组件中使用。

下面是一个使用组合式 API 的组件示例：

```html
<script setup>
  import { ref, reactive, computed } from "vue";

  // 创建响应式数据 相当于选项式API中 data中定义的属性
  const msg = ref("Hello Composition API");
  const num = ref(100);

  // 定义一个方法，相当于选项式API中的methods选项中定义的方法
  function update() {
    num.value = 200;
  }

  // 创建一个计算属性，相当于选项式API中的computed选项中创建的计算属性
  const price = computed(() => {
    return "$" + num.value;
  });
</script>
<template>
  <h3>{{ msg }}</h3>
  <p>价格：{{ price }}</p>
  <button @click="update">更新</button>
</template>
```

注：

- 从上面代码中可以看到，创建的响应式数据，methods 方法，computed 计算属性都是基于函数来实现的。这些函数组合在一起就能完成一个具体的应用。
- 所谓组合式 API 就是指这些不同的 API（函数）组合在一起来实现一个完整的应用，和之前学习的选项式 API 风格完全不同。

> 以上代码最终渲染结果如下：

![GIF2023-7-818-26-01](https://www.arryblog.com/assets/img/GIF2023-7-818-26-01.2e15412c.gif)

接下来我们将正式开启组合式 API 的学习之旅，本章节具体内容安排如下：

- 初识`setup()`函数
- 初始`reactive`与`ref`响应式 API
- 深入响应式 API- 工具函数（一）
- 深入响应式 API- 工具函数（二）
- `setup()`函数参数

## 一、初识 setup() 函数

`setup()` 函数是在组件中使用组合式 API 的入口（表演的舞台），所有组合式 API 代码都写在`setup()`函数中

```html
<script>
  export default {
    // setup函数是所有组合式API的入口（表演的舞台）
    setup() {
      // .....所有代码在此书写
    },
  };
</script>
```

### 1、setup() 函数的返回值

`setup()`函数的返回值通常是一个对象，这个对象的所有属性会暴露给组件模板和组件实例，所以

- 在组件的**模板**中可以直接访问`setup()`返回对象的属性
- 在组件的**选项式 API**中可通过组件实例可以访问`setup()`返回对象身上的属性。

以下代码展示了，在模板中和组件实例上访问到`setup()`函数返回的对象身上的属性和方法。

> **提示：** 选项式 API 与组合式 API 是可以共存的。

```html
<script>
  export default {
    setup() {
      // 返回值会暴露给模板和其他的选项式 API 钩子
      return {
        message: "Hello Vue!!",
        sayHello: () => console.log("sayHello"),
      };
    },
    beforeCreate() {
      console.log(this.message); // 组件实例可以直接获取message属性
    },
  };
</script>
<template>
  <button @click="sayHello">sayHello</button>
  <!--模板中可以直接使用message属性-->
  <div>{{ message }}</div>
</template>
```

> 最终渲染效果如下：

![GIF2023-7-814-43-14](https://www.arryblog.com/assets/img/GIF2023-7-814-43-14.338bbb14.gif)

### 2、setup() 函数中 this 指向

- `setup()`函数自身并不含对组件实例的访问权，在`setup()`中访问`this`会是`undefind`
- 所以`setup()`函数内是没有办法访问到选项式 API 中的属性、方法、计算属性等。

```html
<!-- 以下代码是错的 -->
<script>
  export default {
    data() {
      return {
        message: "Hello Vue!!",
      };
    },
    setup() {
      console.log(this); // undefined
      console.log(this.message); // 抛出错误，因为this为undefined
    },
  };
</script>
```

### 3、setup() 函数执行时机

`setup()`函数是在 Vue 生命周期函数`beforeCreate()`之前被自动调用的。

所以在`beforeCreate()`函数和选项式 API 中可以访问到`setup()`函数对外暴露的属性

```html
<script>
  export default {
    data() {
      return {
        text: this.message,
      };
    },
    setup() {
      return {
        message: "Hello Vue!!",
      };
    },
    beforeCreate() {
      // 在控制台输出 ： beforeCreate： Hello Vue!!
      console.log("beforeCreate：", this.message);
    },
  };
</script>
<template>
  <!--以下代码渲染后效果: <div> Hello Vue!! </div>-->
  <div>{{ text }}</div>
</template>
```

![image-20230522151358423](https://www.arryblog.com/assets/img/image-20230522151358423.dd146084.png)

### 4、setup() 函数暴露非响应式属性

以下方式`setup()`函数对外暴露的属性非响应式的，当属性的值发生变化时，页面并不会同步更新。

```html
<script>
  export default {
    setup() {
      let a = 1;
      let b = 2;
      function update() {
        a = 10;
        b = 20;
      }
      return {
        a,
        b,
        update,
      };
    },
  };
</script>
<template>
  <div>a的值：{{ a }}</div>
  <div>b的值：{{ b }}</div>
  <button @click="update">更新a,b的值</button>
</template>
```

![GIF2023-5-2215-22-16](https://www.arryblog.com/assets/img/GIF2023-5-2215-22-16.70462a1f.gif)

注：

以上的 a,b 属性都是非响应式的，所以当我们点击按扭时，页面中 a,b 的值并没有变化

> 如果想要对外暴露的属性支持响应式，需要用到响应式 API 中的`reactive()`或`ref()`方法来实现。

### 5、总结

- `setup()`函数返回值通常是一个对象，这个对象的所有属性会暴露给组件模板和组件实例
- `setup()`函数中的`this`指向`undefined`
- `setup()`函数会在所有生命周期函数`beforeCreate`之前被执行。
- `setup()`函数内定义的变量默认为非响应式的，所以对外暴露该属性为非响应式

## 二、初始 reactive 与 ref 响应式 API

本小节我们将会初步认识`reactive`与`ref` 两个响应式 API，掌握他们的基本用法。

### 1、初识 reactive() 方法

`reactive()`方法用来返回一个**对象**的响应式代理。

```js
const objProxy = reactive(obj); // objProxy为obj对象的响应式代理
```

我们通过响应式代理来操作对象的属性，当属性的值发生变化时也会驱动页面视图的更新。

```html
<script>
  // 导入reactive方法
  import { reactive } from "vue";
  export default {
    setup() {
      const obj = { a: 1, b: 2 };
      // Info为响应式代理对象
      const objProxy = reactive(obj);
      console.log(objProxy); // Proxy(Object) {a: 1, b: 2}

      function update() {
        // 修改对象属性的值
        objProxy.a = 10;
        objProxy.b = 20;
      }
      // 将属性暴露给组件实例
      return {
        objProxy,
        update,
      };
    },
  };
</script>
<template>
  <div>a的值：{{ objProxy.a }}</div>
  <div>b的值：{{ objProxy.b }}</div>
  <button @click="update">更新a,b的值</button>
</template>
```

> 以上代码最终渲染效果如下，当点击按扭更新 a、b 值时，页面中 a、b 的值会更新为最新的。

![GIF2023-5-2215-51-30](https://www.arryblog.com/assets/img/GIF2023-5-2215-51-30.5c3c48f9.gif)

代码分析

- 以上代码中的`objProxy`为`obj`对象的响应式代理对象。
- 我们可以通过`objProxy.a=10` 和`objProxy.b=20`来为`obj`对象的 a、b 属性赋值。
- 当点击按扭后，会调用 update 方法，更新对象的属性的值。最终 a、b 属性的值从 1，2 修改成 10，20。因为数据是响应式的，所以数据更新后页面视图也发生了更新

> 以上过程证明`objProxy`代理对象具有响应性，所以`objProxy`为响应式代理对象。

### 1.1、深层响应性

通过`reactive()`方法转换的响应式对象是 **"深层响应"** 的。

即不管对象的属性嵌套有多深，都具有响应性，其值发生变化时，页面视图会同步更新。

```html
<script>
  import { reactive } from "vue";
  export default {
    setup() {
      // info为响应式代理对象
      const info = reactive({
        a: {
          b: {
            c: [1, 2, 3],
          },
        },
      });
      function add() {
        info.a.b.c.push("A");
      }
      return {
        info,
        add,
      };
    },
  };
</script>

<template>
  <ul>
    <li v-for="item in info.a.b.c">{{ item }}</li>
  </ul>
  <button @click="add">添加</button>
</template>
```

> 以上代码渲染后效果如下：

![GIF2023-5-2217-16-08](data:image/gif;base64,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)

> 当点击按扭后，往数组中添加了“A"，页面同步更新渲染出来了。

### 1.2、reactive() 无法转换基本数据类型

- `reactive()`方法只能将一个对象转换为一个响应式对象，而不能将一个基本数据类型转换为响应式对象。
- 因为`reactive()`方法的底层采用的是`Proxy`来实现的，而`Proxy`只能创建对象的代理。

> 以下代码为错误示例

```js
import { reactive } from "vue";
export default {
  setup() {
    let msg = reactive("Hello Vue!!");
    console.log(msg);
  },
};
```

> 以上代码执行后，在控制台打印如下结果：

![image-20230522161131916](data:image/png;base64,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)

注：

警告提示，值不能被设置为响应式，最后 msg 的结果仍为原始值`"Hello Vue!!"`

### 1.3、reactive() 方法底层实现原理

`reactive()`方法返回的响应式代理对象本质是`Proxy()`的实例。

```js
const objProxy = reactive(obj);
```

> 以上代码的内部实现如下：（以下为极简版， 主要帮助大家理解响应式代理）

```js
function reactive(obj) {
  // 判断obj是不是对象，是对象才可以利有Proxy实现代理
  if (obj !== null && typeof obj === "object") {
    // objProxy响应式代理对象
    return new Proxy(obj, {
      // 当访问objProxy对象身上的属性时,get方法会被调用
      get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);
        track(); // 响应式依赖收集 ,收集属性对应的DOM更新代码
        return res;
      },
      // 当给objProxy对象向上的属性赋值时，set方法会被调用
      set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver);
        trigger(); // 触发响应式依赖 更新DOM
      },
      // ....
    });
  }
}
```

### 2、初识 ref() 方法

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`

- 可更改是指你可以为`ref`对象的`value`属性赋予新的值
- 响应式是指所有对 `.value` 的操作都将被追踪，并且写操作会触发与之相关的副作用（DOM 更新）

```html
<script>
  import { ref } from "vue";
  export default {
    setup() {
      // msg为一个ref对象，并且是响应式的
      const msg = ref("Hello Vue!!"); // {value: "Hello Vue!!"}

      // 修改ref对象value属性的值
      msg.value = "Hello ref!!";

      return {
        msg,
      };
    },
  };
</script>
<template> {{ msg }} </template>
```

注：

以上代码中的字符串`"Hello Vue!!"`被`ref()`方法转换成了一个 ref 对象`{value: "Hello Vue!!"}`。

当我们修改这 value 属性的值时，页面视图中用到该数据的地方会同步更新。

> 以上代码最终渲染结果如下：

![image-20230708154959482](data:image/png;base64,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)

### 2.1、访问 ref 对象的 value 属性

- 在`setup()`中访问`ref`对象的`value`值时，需要`.value`的形式来访问
- 在组件模板中访问`ref`对象的`value`值时，它会**自动浅层解包**（会自动调用`ref.value`），因此你无须再在模板中为它写 `.value`。
- 在选项式 API 中，通过 `this` 访问 ref 时也会自动浅层解包

| 使用场景      | 是否自动浅层解包 |
| :------------ | :--------------- |
| `setup()`函数 | 否               |
| 组件模板      | 是               |
| 选项式 API    | 是               |

**代码示例**

```html
<script>
  // 导入 ref 方法
  import { ref } from "vue";
  export default {
    setup() {
      // 将"Hello Vue!!" 转换为响应式，可更改的ref对象
      const msg = ref("Hello Vue!!");
      console.log(msg);
      console.log("setup--", msg.value);
      // 更新msg方法
      function update() {
        // 修改msg的值
        msg.value = "Hello ref!!!";
      }
      return {
        msg,
        update,
      };
    },
    mounted() {
      // msg是一个ref对象，但会自动解包,所以不需要通过this.msg.value来获取值
      console.log("mounted", this.msg);
    },
  };
</script>
<template>
  <button @click="update">更新</button>
  <!--msg会自动解包，不需要使用 msg.value-->
  <div>{{ msg }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-1722-12-19](https://www.arryblog.com/assets/img/GIF2023-5-1722-12-19.4a33561b.gif)

### 2.2、ref() 方法转换对象

- `ref()`方法的参数如果为一个对象（引用类型），则最终返回的`ref`对象的`value`属性值为该对象的响应式代理对象。
- 该 ref 对象是一具有**深层响**应式，可更改的`ref`对象。

```html
<script>
  import { ref } from "vue";
  export default {
    setup() {
      const obj = { msg: "Hello ref!!" };
      /*
            	ref的参数为一个对象，先用reactive()方法返回obj的响应式代理对象
            	然后将该响应式代理对象赋值给到ref对象的value属性。
            */
      const refProxyObj = ref(obj);

      console.log(refProxyObj);
      console.log(refProxyObj.value);
    },
  };
</script>
```

> 以上代码，最终在控制台输出如下结果：

![image-20230522195240987](https://www.arryblog.com/assets/img/image-20230522195240987.ec33cf4c.png)

分析输出结果

`ref()`方法的参数如果为一个对象，其内部相当于经历了以下两步：

- 先用`reactive(obj)`方法返回`obj`的响应式代理对象 `proxyObj`
- 然后将该响应式代理对象赋值给到 ref 对象的 value 属性，即`{value:proxyObj}`

> 所以最终得到的 ref 对象是一个**深层响**应式，可更改的`ref`对象。

**代码演示**

```html
<script>
  import { ref } from "vue";
  export default {
    setup() {
      const userInfo = ref({
        userName: "清心",
        sex: ref("女"),
        a: {
          b: ref(0),
        },
      });
      function update() {
        userInfo.value.userName = "icoding";
        //sex a.b 都会一个ref对象，但都会自动解包
        userInfo.value.sex = "男";
        userInfo.value.a.b = 100;
        // 下面这种写法，也支持响应式
        // userInfo.value.a={b:100}
      }
      return {
        userInfo,
        update,
      };
    },
  };
</script>
<template>
  <button @click="update">更新</button>
  <!--使用时，全都会自动解包-->
  <div>{{ userInfo.userName }} -- {{ userInfo.sex }}</div>
  <div>{{ userInfo.a.b }}</div>
</template>
```

![GIF2023-5-1814-40-06](https://www.arryblog.com/assets/img/GIF2023-5-1814-40-06.af7c2bea.gif)

注：

当数据的结构比较深时，深层响应式是非常消耗性能的，因为需要对对象进行深度递归，将每一个被嵌套的属性都转换为响应式。

> 若要避免这种深层次的转换，请使用 `shallowRef()`来替代。

### 2.3、ref() 方法的底层实现

以上代码中的`ref()`方法，返回的`ref`对象，底层实现如下（极简版，不完整，仅供了解思路）

```js
function ref(value) {
  const refObject = {
    get value() {
      track(refObject, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(refObject, "value");
    },
  };
  return refObject;
}
```

注：

- 当我们访问 ref 对象的 value 属性时，本质是触发了 value 属性的 get 方法。
- 当我们给 ref 对象赋值时，本质是触发了 value 属性的 set 方法。

### 3、总结

**reactive 方法**

- 用来返回一个对象的响应式代理对象，其响应性为深层响应，不管对象的属性嵌套有多深，都具有响应性，其值发生变化时，页面视图会同步更新。
- reactive 方法无法转换基本数据类型
- reactive 方法的底层实现是通过`proxy`代理来实现的

**ref 方法**

- 主要用来将一个基本数据类型值转换为一个响应式，可更改的 ref 对象。
- 访问 ref 对象的属性值时，如果在 setup()函数中，需要打点`.value`属性才能访问，如果在模板或选项式 API 中，则会自动浅层解包，不需要`.value`。
- ref 方法的参数如果为对象类型，则返回的 ref 对象的 value 属性值为该对象的 proxy 响应式代理对象。
- ref 方法的底层实现是通过创建一个具有 get value 与 set value 属性的对象来实现。

## 三、深入响应式 API - 工具函数（一）

通过前面的学习我们知道`reactive()`方法的返回值为一个对象的**响应式代理**。本小节我们针对响应式代理对象做深入的学习，主要内容如下：

- 响应式对象会自动解包 ref 属性
- 不能被自动解包的集合
- 解构响应式对象
- `toRef()` 方法
- `toRefs()` 方法
- `shallowReactive()`方法
- `readonly()` 方法

> 注：我们将响应式代理对象简称为响应式对象

### 1、响应式对象会自动解包 ref 属性

一个响应式对象的属性及嵌套属性的值如果为`ref`属性，在模板或`setup()`中使用时，会自动解包，同时保持响应性

```html
<script>
  import { reactive, ref } from "vue";

  export default {
    setup() {
      const userName = ref("艾编程");
      const age = ref(33);
      const userInfo = reactive({
        userName, // ref对象
        age, // ref对象
        sex: "男",
        test: {
          a: {
            b: ref(3), // ref对象
          },
        },
      });
      function update() {
        // userName会自动解包  所以写成 userInfo.userName.value="清心" 是错误的
        userInfo.userName = "清心"; // 与 userName.value="清心" 一样支持响应式
        userInfo.age = 44; // 与  age.value = "44" 一样支持响应式
        userInfo.sex = "女";
        userInfo.test.a.b = 100; // 深层响应式
      }
      return {
        userInfo,
        update,
      };
    },
  };
</script>

<template>
  <button @click="update">更新数据</button>
  <!--userInfo的属性为ref对象时，会自动解包-->
  <div>{{ userInfo.userName }} -{{ userInfo.age }}--{{ userInfo.sex }}</div>
  <div>{{ userInfo.test.a.b }}</div>
</template>
```

> 以上代码渲染后效果如下：

![GIF2023-5-1722-57-04](https://www.arryblog.com/assets/img/GIF2023-5-1722-57-04.6a787ae1.gif)

### 2、不能被自动解包的集合

当访问到某个响应式数组或 `Map` 这样的原生集合类型中的 `ref` 元素时，**不会**执行 ref 的解包。

```js
const hobbies = reactive([ref("音乐"), ref("阅读"), ref("跳舞")]);
// 这里需要 .value
console.log(hobbies[0].value);

const map = reactive(new Map([["count", ref(0)]]));
// 这里需要 .value
console.log(map.get("count").value);
```

### 3、解构响应式对象

**如果我们直接利用解构赋值来解构响应式对象**

- 当属性值为基本数据类型或 ref 对象（解包后为基本数据类型）时，解构后会失去响应性
- 当属性值为引用数据类型或 ref 对象（解包后为引用数据类型）时，解构后仍保持响应性

```html
<script>
  import { reactive, ref } from "vue";

  export default {
    setup() {
      // 解构响应式对象
      let { a, b, c, d } = reactive({
        a: ref("a"),
        b: ref(["b"]),
        c: ["c"],
        d: "d",
      });
      console.log(a); // 'a' 基本数据类型，失去响应式
      console.log(b); // Proxy(Array) {0: 'b'} 响应式对象，具有响应性
      console.log(c); // Proxy(Array) {0: 'c'} 响应式对象，具有响
      console.log(d); // 'd'  基本数据类型，失去响应式

      // 更新数据
      function update() {
        a = "aa";
        b[0] = "bb";
        c[0] = "cc";
        d = "dd";
      }

      return {
        a,
        b,
        c,
        d,
        update,
      };
    },
  };
</script>

<template>
  <div>a:{{ a }}--b:{{ b[0] }}--c:{{ c[0] }}--{{ d }}</div>
  <button @click="update">更新</button>
</template>
```

> 最终渲染效果如下图：

![GIF2023-7-817-08-42](https://www.arryblog.com/assets/img/GIF2023-7-817-08-42.982079d2.gif)

注：

观察控制台输出的结果，可以看到解构后

- b 和 c 的值为 proxy 响应式代理对象，具有响应性
- a 和 d 变量的值为基本数据类型，不具有响应性。

> 所以，点击更新后按扭后，b,c 的值更新后，页面中对应的值也被更新了。

---

**如果解构的响应式对象为数组或 Map 等原生集合类型**

- 只有集合中成员为基本数据类型时会失去响应性
- 集合成员为`ref`类型与引用类型都不会失去响应性，因为`ref`成员不会自动解包

```html
<script>
  import { reactive, ref } from "vue";

  export default {
    setup() {
      // 解构响应式对象
      let [a, b, c, d] = reactive([ref("a"), ref(["b"]), ["c"], "d"]);
      console.log(a); // {value:'a'} ref对象，具有响应性
      console.log(b); // {value:Proxy(Array){0:'b'}} ref对象，具有响应性
      console.log(c); // Proxy(Array) {0: 'c'} 响应式对象，具有响性
      console.log(d); // 'd'  基本数据类型，失去响应式

      // 更新数据
      function update() {
        a.value = "aa";
        b.value[0] = "bb";
        c[0] = "cc";
        d = "dd";
      }

      return {
        a,
        b,
        c,
        d,
        update,
      };
    },
  };
</script>

<template>
  <div>a:{{ a }}--b:{{ b[0] }}--c:{{ c[0] }}--{{ d }}</div>
  <button @click="update">更新</button>
</template>
```

> 以上代码最终渲染结果如下：

![GIF2023-7-817-22-18](https://www.arryblog.com/assets/img/GIF2023-7-817-22-18.2d48fd21.gif)

注：

观察上图控制台打印的结果，可以看到

- 变量 a，b 为 ref 对象，具有响应性
- 变量 c 为 proxy 代理对象，具有响应性
- d 变量为基本数据类型，不具有响应性

所以点击更新按扭后，a,b,c 变量的值更新后，页面也同步更新了。

> 那我们如何保持解构后的变量都具有响应性呢 ？这就需要用到接下来讲到的`toRef()`和`toRefs()`方法

### 4、toRef() 方法

`toRef()`方法可以基于响应式对象上的一个属性，创建一个对应的 ref。

> 这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

**语法：**

```js
const variable = toRef(proxyObject, key, defaultValue);
```

- `proxyObject` 为响应式对象
- `key` 为 响应式对象对应的原对象的属性
- `defaultValue` 默认值，当转换对象身上不存在的值是会返回 undefined，如果有默认值，则会使用默认值

**代码演示**

```html
<script>
  import { reactive, toRef } from "vue";
  export default {
    setup() {
      const obj = { a: 1, b: 2 };
      // obj为响应式代理对象
      const objProxy = reactive(obj);

      // toRef()方法将对象obj的属性a转换为一个响应式的ref对象 {value:1}
      let a = toRef(objProxy, "a");

      console.log(a); // {value:1}
      console.log(a.value); // 访问a的值

      // objProxy.a=10 时，对应a.value的值也变成了10，两者保持同步
      objProxy.a = 10;
      setTimeout(() => {
        // a.value=100时，对应objProxy.a的值也变成100，两者保持同步
        a.value = 100;
      }, 2000);

      return {
        a,
      };
    },
  };
</script>
<template>
  <div>{{ a }}</div>
</template>
```

> 以上代码最终渲染结果如下：

![GIF2023-7-923-42-52](https://www.arryblog.com/assets/img/GIF2023-7-923-42-52-16889813353901.7c158049.gif)

注：

通过渲染后的结果可以看到，`objProxy.a = 10`与`a.value = 100`最终都会影响到 a 变量的值，也可以说影响到`objProxy.a`的值，同时都具有响应性。

### 4.1、toRef() 注意事项

- `toRef()` 如果传入的对象非响应式的，则返回该对象上指定属性的`ref`对象。（只做了解）

```js
let a = toRef({ a: 1 }, "a"); // {value:1}
// 访问a的值
console.log(a.value); // 1
```

- 当`toRef()`转换一个对象身上不存在的属性时，返回的 ref 对象的 value 值为`undefind`，可以为其指定默认值

```js
const objProxy = reactive({ a: 1, b: 2 });
// toRef()方法将对象{a:1,b:2}的属性a转换为一个响应式的ref对象
let c = toRef(objProxy, "c");
// 访问a的值
console.log(c.value); // undefined

c = toRef(objProxy, "c", "默认值");
console.log(c.value); // 默认值
```

- 利用`toRef()`也可以返回一个只读的`ref对象`，当我们想创建一个只读的变量时可以使用

```js
import { reactive, toRef } from "vue";
const obj = { a: 1, b: 2 };
// obj为响应式代理对象
const objProxy = reactive(obj);
// 返回值为只读的ref对象
let a = toRef(() => objProxy);
// 访问a的值
console.log(a.value);
// 以下赋值操作将抛出错误
// a.value = "ssss"
```

### 5、toRefs() 方法

- 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。
- 每个单独的 ref 都是使用 [`toRef()` (opens new window)](https://cn.vuejs.org/api/reactivity-utilities.html#toref)创建的。

**语法**

```js
toRefs(object); // object为响应式对象
```

> 如果我们想要一次性解构一个响应式对象的所有属性，则可以使用`toRefs()`

```js
import { reactive, ref, toRefs } from "vue";
export default {
  setup() {
    const objProxy = reactive({ a: 1, b: 2 });
    const obj = toRefs(objProxy);
    console.log(obj); // {a:toRef(objProxy,"a"),b:toRef(objProxy,"b")}
    const { a, b } = obj;
    // a,b为ref对象，所以访问需要.value
    console.log(a.value, b.value); // 1  2
  },
};
```

**代码演示**

```html
<script>
  import { reactive, ref, toRefs } from "vue";

  export default {
    setup() {
      const userInfo = reactive({
        userName: ref("艾编程"), // ref对象
        age: ref(33), // ref对象
        sex: "男",
        test: {
          a: {
            b: 3,
          },
        },
      });

      // toRefs()转换响应式对象，然后利用解构赋值解构属性
      let { userName, age, sex, test } = toRefs(userInfo);
      // 因为解构后的每个属性为ref对象，所以需要通过.value形式访问
      console.log("userName", userName.value); // userName 艾编程
      console.log("age", age.value); // age 33
      console.log("sex", sex.value); // sex 男
      console.log("test", test.value); // proxy对象

      function update() {
        userName.value = "清心"; // 失去响应性
        age.value = "44"; // 失去响应性
        sex.value = "女"; // 失去响应性
        test.value.a.b = 100; // 保持响应性
      }
      return {
        userName,
        age,
        sex,
        test,
        update,
      };
    },
  };
</script>

<template>
  <button @click="update">更新数据</button>
  <!--userInfo的属性为ref对象时，会自动解包-->
  <div>{{ userName }} -{{ age }}--{{ sex }}</div>
  <div>{{ test.a.b }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-2222-25-47](https://www.arryblog.com/assets/img/GIF2023-5-2222-25-47.d5ca60e3.gif)

注意事项

`toRefs` 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 [`toRef` (opens new window)](https://cn.vuejs.org/api/reactivity-utilities.html#toref)。

### 6、shallowReactive() 方法

- `shallowReactive()`相当于是`reactive()`的浅层作用形式。
- 也就是`shallowReactive()`转换的响应式对象只有根级别的属性是响应式的。属性的值会被原样存储和暴露，这也意味着值为 `ref` 的属性**不会**被自动解包了。

```html
<script>
  import { reactive, ref, shallowReactive } from "vue";
  export default {
    setup() {
      const info = shallowReactive({ count: ref(0), a: { b: 1 } });

      function update1() {
        // ref不会自动解包，需要调用value，值修改后会触发
        info.count.value = 100;
      }
      function update2() {
        // 并不会触发页面更新
        info.a.b = 100;
        // 以下方式会触发页面更新
        // info.a = { b: 100 }
      }

      return {
        info,
        update1,
        update2,
      };
    },
  };
</script>

<template>
  <button @click="update1">更新count</button>
  <button @click="update2">更新b的值</button>
  <div>{{ info.count }}</div>
  <div>{{ info.a.b }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-1815-55-26](https://www.arryblog.com/assets/img/GIF2023-5-1815-55-26.5c88ba5a.gif)

### 7、readonly() 方法

接受一个对象 (不论是响应式还是普通的) 或是一个 [ref (opens new window)](https://cn.vuejs.org/api/reactivity-core.html#ref)，返回一个原值的只读代理。

只读代理是深层的：对任何嵌套属性的访问都将是只读的。它的 ref 解包行为与 `reactive()` 相同，会自动解包，但解包得到的值是只读的。

> 要避免深层级的转换行为，请使用 [shallowReadonly() (opens new window)](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly)作替代。

```html
<script>
  import { reactive, readonly } from "vue";

  export default {
    setup() {
      const proxyObj = reactive({ a: 1, b: { c: 2 } });
      const readonlyObj = readonly(proxyObj);
      // 对象属性可读
      console.log(readonlyObj.a); // `
      console.log(readonlyObj.b.c); // 2
      // 以下对象属性赋值失败，同时在控制台抛出错误
      readonlyObj.a = 100;
      readonlyObj.b.c = 200;
    },
  };
</script>
```

### 8、isReactive() 方法

检查一个对象是否是由 `reactive()`或 `shallowReactive()` 创建的代理。

> 返回值为`boolean`布尔类型值，`true`表示是，`false`表示否

```html
<script>
  import { reactive, isReactive, shallowReactive } from "vue";

  export default {
    setup() {
      const obj = { a: 1 };
      console.log(isReactive(obj)); // false
      console.log(isReactive(reactive(obj))); // true
      console.log(isReactive(shallowReactive(obj))); // true
    },
  };
</script>
```

## 四、深入响应式 API - 工具函数（二）

通过前面`ref()`方法的学习，我们对 ref 对象有了初步的了解，本小节我们将深入展开`ref`对象的学习。

本小节主要包含如下内容：

- `shallowRef()`方法，创建浅层的 ref 对象
- `isRef()`方法，检查某个值是否为 ref 对象
- `unref()`方法，获取 ref 属性值的一种语法糖
- `customRef()`方法，自定义 ref

### 1、shallowRef() 方法

`shallowRef()`方法相当于`ref()`的浅层作用形式，只对`.value`的访问是响应式的，对对象的其它属性值的写操作不支持响应式。

针对大型的数据结构，如果我们确实只需要浅层次的响应式，则可以利用`shallowRef()`帮助我们提升性能，因为减小了深层次的递归操作。

```html
<script>
  import { ref, shallowRef } from "vue";
  export default {
    setup() {
      const state = shallowRef({ count: 1 });

      function update1() {
        // 不会触发页面的更新
        state.value.count = 100;
      }
      function update2() {
        // 会触发页面的更新
        state.value = { count: 200 };
      }
      return {
        state,
        update1,
        update2,
      };
    },
  };
</script>
<template>
  <button @click="update1">更新1</button>
  <button @click="update2">更新2</button>
  <div>{{ state.count }}</div>
</template>
```

> 以上代码最终效果如下：

![GIF2023-5-1814-57-56](https://www.arryblog.com/assets/img/GIF2023-5-1814-57-56.bf03451c.gif)

注：

点击更新 1 并不会触发页面的更新，只有点击更新 2 时，才会触发页面的更新。

因为 state 是被`shallowRef`转换的的一个浅层的响应式对象，所以`state.value.count = 100`并不会触发页面的更新，而`state.value = { count: 200 }`会触发页面的更新。

### 2、isRef() 方法

检查某个值是否为 ref 对象，如果是返回 true，否则返回 false

```js
import { isRef, ref } from "vue";

export default {
  setup() {
    console.log(isRef(ref(0))); // true
    console.log(isRef(0)); // false
  },
};
```

### 3、unref() 方法

`unref()`方法的参数是 ref，则返回 ref 对象的 value 属性值，否则返回参数本身。

> `unref()`方法是`val = isRef(val) ? val.value : val`计算的一个语法糖

```js
import { isRef, unref, ref } from "vue";

export default {
  setup() {
    console.log(unref(ref("Hello"))); // Hello
    console.log(unref("Hello")); // Hello
    console.log(unref(ref({ a: 1, b: 2 }))); // Proxy(Object) {a: 1, b: 2}
    console.log(unref({ a: 1, b: 2 })); // {a: 1, b: 2}
  },
};
```

### 4、customRef() 自定义 ref

`customRef()`方法用来创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

**语法**

```js
let value=0;
// 返回值为ref对象
const refObj=customRef((track,trigger)=>{
    // 返回一个对象
    return {
        get(){
            // 获取ref的值时，会调用get方法
            return value;
        },
        set(newValue){
            // 修改ref的值时，会调用set方法
            value=newValue
        }
    }
}
```

注：

为了帮助大家更好的理解`customRef()`的用法，大家可以先按以下思路来创建一个自定义的 ref，实现数据与视图的同步更新。

**第一步：创建 `createRef()`函数**

- `customRef()`方法的返回值为一个`ref`，该方法接受一个回调函数作为参数。
- `createRef(value)`方法直接将`customRef()`方法的返回值返回，即返回值为 ref
- 参数`value`为需要转换为`ref`的原始值
- 以下代码中`count`为原始值 0 转换后的 ref 对象

```js
// createRef为自定义创建ref的方法，接受一个参数value，value为需要转换为ref的原始值
function createRef(value) {
  return customRef(() => {});
}

// 使用createRef将原始值 0 创建成 ref，即count为ref对象
const count = createRef(0);
```

**第二步：`customRef()`回调函数的返回值**

- `customRef()`方法的回调函数返回一个带 get 和 set 的对象
- 当访问 count 的值（`count.vaue`）时，会调用 get 方法获取到对应的值
- 当修改 count 的值（`count.value=100`）时，会调用 set 方法来更新对应的值

```js
function createRef(value) {
  return customRef(() => {
    return {
      // 当访问ref对象的value值时，会调用get方法
      get() {
        console.log(`get被调用了，此时返回的value值为：${value}`);
        return value;
      },
      // 当给ref对象的value重新赋值时，会调用set方法
      set(newValue) {
        value = newValue;
        console.log(`set被调用了，此时value的值更新为：${value}`);
      },
    };
  });
}

// 使用createRef将原始值 0 创建成 ref，即count为ref对象
const count = createRef(0);
// 读取ref中的值
console.log(count.value);
// 更新ref的value值
count.value = 100;
```

**第三步：在组件模板中使用 count**

- 在组件模板中使用自定义的 ref 对象 count
- 定义 update 方法，当点击更新按扭时，调用该方法更新 count 的值

```html
<script>
  import { customRef } from "vue";

  export default {
    setup() {
      function createRef(value) {
        return customRef(() => {
          return {
            // 当访问ref对象的value值时，会调用get方法
            get() {
              console.log(`get被调用了，此时返回的value值为：${value}`);
              return value;
            },
            // 当给ref对象的value重新赋值时，会调用set方法
            set(newValue) {
              value = newValue;
              console.log(`set被调用了，此时value的值更新为：${value}`);
            },
          };
        });
      }

      // 使用createRef将原始值 0 创建成 ref，即count为ref对象
      const count = createRef(0);
      // 读取ref中的值
      console.log(count.value);

      function update() {
        // 更新ref的value值
        count.value = 100;
      }

      // 对外暴露属性与方法
      return {
        count,
        update,
      };
    },
  };
</script>

<template>
  <button @click="update">更新myRef的值</button>
  <div>myRef的值:{{ count }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-7-913-52-10](https://www.arryblog.com/assets/img/GIF2023-7-913-52-10.ebc781dc.gif)

分析执行结果

- 当我们点击对应的更新按扭更新`count`的值为 100 时，set 方法被调用了，但页面视图并没有同步更新。
- 因为我们并没有在**get 中收集依赖**（建立对应属性与相关 DOM 的依赖，让 Vue 知道数据更新后要更新那些 DOM）
- 也没有在**set 方法中触发依赖**（根据 get 方法中建立的依赖关系，触发 DOM 的更新）

**第四步：`customRef()`回调函数的`track`与`trigger`参数**

> `customRef((track, trigger) => { })`回调函数的两个参数

- `track()`方法用来在 get 方法被调用时，收集依赖
- `trigger()` 方法用来在 set 方法被调用时，触发依赖

```html
<script>
  import { customRef } from "vue";

  export default {
    setup() {
      function createRef(value) {
        return customRef((track, trigger) => {
          return {
            // 当访问ref对象的value值时，会调用get方法
            get() {
              console.log(`get被调用了，此时返回的value值为：${value}`);
              track();
              return value;
            },
            // 当给ref对象的value重新赋值时，会调用set方法
            set(newValue) {
              value = newValue;
              trigger();
              console.log(`set被调用了，此时value的值更新为：${value}`);
            },
          };
        });
      }

      // 使用createRef将原始值 0 创建成 ref，即count为ref对象
      const count = createRef(0);
      // 读取ref中的值
      console.log(count.value);
      function update() {
        // 更新ref的value值
        count.value = 100;
      }

      return {
        count,
        update,
      };
    },
  };
</script>

<template>
  <button @click="update">更新myRef的值</button>
  <div>myRef的值:{{ count }}</div>
</template>
```

> 以上代码最终渲染效果如下：

![GIF2023-5-2314-52-23](https://www.arryblog.com/assets/img/GIF2023-5-2314-52-23.eaac56f0.gif)

### 4.1、总结：customRef() 方法使用流程

**第一步：**

- 创建一个自定义函数，该函数接受一个参数，这个参数为需要转换为 ref 的原始值
- 函数的返回值为`customRef()`方法的返回值 ref

```js
function createRef(value) {
  return customRef(() => {});
}
```

**第二步：**

- 创建 customRef 回调函数的返回值，返回值为一个带有 get 和 set 的对象。
- 当访问 ref 的 value 值时调用 get 方法，所有在此时需要处理的相关逻辑都可以写在 get 中
- 当修改 ref 的 value 值时调用 set 方法，所有在此时南要处理的相关链辑都可以写在 set 中

```js
function createRef(value) {
  return customRef(() => {
    return {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
      },
    };
  });
}
```

**第三步：**

- 在 get 方法返回值前调用`track()`方法，收集依赖
- 在 set 方法更新值之后调用`trigger()`方法，触发依赖

```js
function createRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger();
      },
    };
  });
}
```

> 通过前面的学习，我们知道如何创建自定义 ref，那自定义 ref 应该在什么场景下使用呢？

注：自定义 ref 使用场景

- 当我们在获取数据或更新数据时需要做一些额外的操作，就可以用自定义 ref。
- 比如：页面视图的更新并不需要同步更新，而是数据在 200ms 内如果没有连续更新，则再更新视图。

> 接下来，我们就来学习下 Vue 官方提供的《自定义防抖 ref》案例

### 5、实战应用：自定义防抖 ref

当在输入框中连续输入内容的间隔时间超过`500ms`，则更新 h3 标签显示的内容，否则不更新。

> 如下：

![GIF2023-5-2315-39-31](https://www.arryblog.com/assets/img/GIF2023-5-2315-39-31.3669680c.gif)

```html
<script>
  import { customRef } from "vue";

  export default {
    setup() {
      function useDebouncedRef(value, delay = 500) {
        let timer = null; // 用来保存定时器
        return customRef((track, trigger) => {
          return {
            get() {
              track();
              return value;
            },
            set(newValue) {
              // 间隔时间不够500ms,则清除上一次定时器，重新计时
              clearTimeout(timer);
              timer = setTimeout(() => {
                value = newValue;
                trigger();
              }, delay);
            },
          };
        });
      }
      // 创建 ref
      const text = useDebouncedRef("hello");
      // 对外暴露text
      return {
        text,
      };
    },
  };
</script>

<template>
  <input v-model="text" />
  <h3>{{ text }}</h3>
</template>
```

### 6、总结

- `shallowRef()` 用来创建浅层的 ref 对象，只对`.value`的访问是响应式的，对象的其它均为非响应式

```js
const proxy = shallowRef({ a: 1 });
proxy.value = { a: 2 }; // 具有响应性，值被修改后页面视图会同步更新
proxy.value.a = 2; // 不具有响应性，值被修改后页面视图不会更新
```

- `isRef()`判断一个对象是不是 ref 对象，是返回 true，不是返回 false

```js
console.log(isRef(0)); // false
console.log(isRef(ref(0))); // true
```

- `unref()`方法的参数是 ref，则返回 ref 对象的 value 属性值，否则返回参数本身。

```js
const a = unref(ref(0)); // 0
const b = unref(0); // 0
const c = unref(reactive({ a: 1 })); // Proxy（Object){a:1}
```

- `customRef()`用来自定义 ref 对象，主要掌如何定义一个 ref 对象及实现自定义防抖 ref

```js
// value为ref对象value属性的原始值
function createRef(value) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger();
      },
    };
  });
}
// 定义一个ref对象
const count = createRef(0);
```

## 五、setup() 函数参数

深入浅出 setup() 函数参数 props、context、什么情况下会使用 setup() 函数

### 1、参数 props

- `setup()`函数有两个参数，第一个参数是组件的`props`，和标准的组件一致。
- 一个 `setup` 函数的 `props` 是响应式的，并且会在传入新的`props` 时同步更新。

```js
export default {
  props: ["list", "title"],
  setup(props) {
    console.log(props.title); // 访问传递的title属性
    console.log(props.list); // 访问传递的list属性
  },
};
```

**代码示例**

- `App.vue`

```html
<script>
  import { reactive, ref } from "vue";
  import List from "./components/List.vue";
  export default {
    setup() {
      const list = reactive(["新闻1..", "新闻2..", "新闻3.."]);
      const title = ref("新闻标题");

      // 更新方法
      function update() {
        (title.value = "更新后--标题"), list.push("新加内容一条");
      }
      return {
        list,
        title,
        update,
      };
    },
    components: {
      List,
    },
  };
</script>
<template>
  <List :list="list" :title="title" @event-update="update"></List>
</template>
```

- `List.vue`

```html
<script>
  export default {
    props: ["list", "title"],
    emits: ["eventUpdate"],
    setup(props) {
      setTimeout(() => {
        console.log(props.title); // 访问传递的title属性
        console.log(props.list); // 访问传递的list属性
      }, 3000);
    },
  };
</script>
<template>
  <button @click="$emit('eventUpdate')">更新</button>
  <h3>{{ title }}</h3>
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</template>
```

最终渲染效果如下：

> 点击更新按扭更新 props 的内容，`3s`后，`setup()`函数中的 props 的值也更新为了最新的。

![GIF2023-7-914-23-39](https://www.arryblog.com/assets/img/GIF2023-7-914-23-39.9a84900a.gif)

### 1.1、解构 props

通过上面案例我们知道 props 参数的值为一个响应式代理对象，但如果直接解构`props`部分属性将失去响应性。因此推荐通过`props.xxx`的形式来使用 props

- 如果我们确实需要解构`props`，但解构后对应变量仍需保持响应性，可以利用`toRefs()`工具函数来实现

```js
setup(props) {
    let { title, list } = toRefs(props)
}
```

- 如果我们需要将 props 中的某一个 prop 传递到外部，并保持其响应性，则可以利用`toRef()`工具函数来实现

```js
setup(props) {
    let title = toRef(props, 'title')
}
```

### 2、参数 context

传入 `setup` 函数的第二个参数 context 是一个 **Setup 上下文**对象。上下文对象暴露了其他一些在 `setup` 中可能会用到的值。

> 如下：

```js
setup(props, context) {
    // context是非响应式的普通对象
    console.log("context", context)
    // 透传 Attributes（非响应式的对象（只读），等价于 $attrs）
    console.log("attrs", context.attrs)

    // 插槽（非响应式的对象，等价于 $slots）
    console.log("slots", context.slots)

    // 触发事件（函数）等价于 $emit）
    console.log("emit", context.emit)

    // 暴露组件公共属性（函数）
    console.log("expose", context.expose)
}
```

> 以下为上面代码在某个案例中的打印结果

![image-20230709150617759](https://www.arryblog.com/assets/img/image-20230709150617759.405c7a10.png)

**代码示例**：

- App.vue

```html
<script>
  import { reactive, ref } from "vue";
  import List from "./components/List.vue";
  export default {
    setup() {
      const title = ref("新闻标题");
      let list = reactive([1, 2, 3]);
      // 更新
      function update() {
        title.value = "最新动态";
      }
      return {
        title,
        list,
        update,
      };
    },
    mounted() {
      // 子组件List对外暴露了num属性，所以可以访问到
      console.log("num", this.$refs.myList.num); // 100
      // 子组件List并没有对外暴露count属性
      console.log("count", this.$refs.myList.count); // undefined
    },
    components: {
      List,
    },
  };
</script>
<template>
  <List :title="title" @update-event="update" class="list" ref="myList">
    <!--默认插槽内容-->
    <ul>
      <li v-for="item in list">{{ item }}</li>
    </ul>
    <!--具名插槽内容-->
    <template v-slot:footer>
      <a href="#">...点击查看更多</a>
    </template>
  </List>
</template>
```

- List.vue

```html
<script>
  import { ref } from "vue";
  export default {
    props: ["title"],
    emits: ["updateEvent"],
    setup(props, context) {
      // context是非响应式的普通对象
      console.log("context", context);
      // 透传 Attributes（非响应式的对象（只读），等价于 $attrs）
      console.log("attrs", context.attrs);

      // 插槽（非响应式的对象，等价于 $slots）
      console.log("slots", context.slots);

      // 触发事件（函数）等价于 $emit）
      console.log("emit", context.emit);

      // 暴露组件公共属性（函数）
      console.log("expose", context.expose);

      // 暴露组件公共属性
      const count = ref(100);
      const num = ref(2000);
      context.expose({ count });
    },
  };
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <!--默认插槽-->
    <slot>显未主体内容</slot>
    <div class="footer">
      <!--具名插槽-->
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

![image-20230710162733492](https://www.arryblog.com/assets/img/image-20230710162733492.0a3bb939.png)

> 通过上图可以看到，`context`上下文对象是非响应式的，可以安全地解构

```js
export default {
    // props是响应式的
    // attrs,slots非响应式（只读的） emit、expose为函数
    setup(props, { attrs, slots, emit, expose }) {
        ...

    }
}
```

- `attrs` 和 `slots` 都是有状态的对象，它们总是会随着组件自身的更新而更新
- 这意味着你应当避免解构它们，并始终通过 `attrs.x` 或 `slots.x` 的形式使用其中的属性

```js
/* 不应该解构他们 */
setup(props, { attrs, slots, emit, expose }) {
    const {xx,xxx}=attrs;
    const {xx,xxx}=slots
    }
```

### 3、什么情况下会使用 setup() 函数

通过前面的学习，我们知道组合式 API 可以与选项式 API 共存，也就是说，我们可以在选项式 API 中使用`setup()`函数。

但在实际开发中，我们并不推荐两种方式混合使用，更希望在项目中选择其中的一种方式来开发。但在以下情况，选项式 API 会与组合式 API 共存。

- **旧项目改造：** 我们在改造旧项目时，旧项目使用的是选项式 API 书写的，但是我们现在想在原来的基础上集成基于组合式 API 的代码。
- **非单文件组件：** 在非单文件组件中我们想要使用组合使 API 时，就必需要使用到`setup()`函数。

```js
// App.js
import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
export default {
  setup() {
    const msg = ref("Hello Vue!!");
    return {
      msg,
    };
  },
  template: `<div>{{msg}}</div>`,
};
```

温馨提示

对于单文件组件开发中想要使用组合式 API，我们更推荐在`<script setup>....</script>`标签中来书写，代码更加简加及符合程序员编写代码的习惯。

> 在本章的第三个版块《单文件组件中使用组合式 API》中会讲到`<script setup>`
