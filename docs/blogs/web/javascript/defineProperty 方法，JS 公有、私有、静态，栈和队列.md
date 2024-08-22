# defineProperty 方法，JS 公有、私有、静态，栈和队列

本章节我们会讲解以下三方面内容

- 如何利用 `Object.defineProperty()`方法给一个对象新增属性
- 公有，私有，静态属性和方法的写法和应用，在此基础上了解什么是特权方法
- 学习栈和队列这两种数据结构，同时利用 JS 来实现一个简单的栈和队列

## 一、Object.defineProperty

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，**并返回此对象**。

```js
// 语法
Object.defineProperty(obj, prop, descriptor)
```

- obj ：要定义属性的对象
- prop ：要定义或修改的属性的名称
- descriptor : 要定义或修改的属性描述符，是一个**对象**

> 目前存在的属性描述符有两种主要形式：**数据描述符** 和 **存取描述符**

### 1、数据描述符

- 数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。
- 数据描述符有以下 4 个特性描述它们的行为，具体如下表

| 属性特性     | 说明                                                                                            | 默认值    |
| :----------- | :---------------------------------------------------------------------------------------------- | :-------- |
| writable     | 表示属性值是否可以被修改，false 不能改，true 可以修改                                           | false     |
| value        | 属性的实际值                                                                                    | undefined |
| configurable | 特性表示对象的属性是否可以被删除，以及除 `value` 和 `writable` 特性外的其他特性是否可以被修改。 | false     |
| enumerable   | 表示属性是否可通过 `for-in` 循环遍历。                                                          | false     |

注

`Object.defineProperty`定义的属性，如果属性描述符为数据描述符，那这个属性被称为 **“数据属性”**

### 1.1、writable 与 value

- writable 表示属性值是否可以被修改，false 不能改，true 可以修改，默认值 false
- value 表示属性的实际值，默认值为 undefined

```js
// 定义对象
var obj = {
  name: '张三',
}
// 定义属性age
Object.defineProperty(obj, 'age', {
  value: 22,
  writable: false,
})
console.log(obj)
// age的值并不能被修改成功
obj.age = 23
console.log(obj)
```

![image-20221122235939469](https://www.arryblog.com/assets/img/image-20221122235939469.925367d2.png)

```js
// 定义对象
var obj = {
  name: '张三',
}
// 定义属性age
Object.defineProperty(obj, 'age', {
  value: 22,
  writable: true,
})
console.log(obj)
// age的属性值被成功修改
obj.age = 23
console.log(obj)
```

![image-20221123000043901](https://www.arryblog.com/assets/img/image-20221123000043901.0bd261c5.png)

### 1.2、enumerable

- enumerable 表示属性是否可通过`for-in`等其它方式循环遍历，`false`表示不可以，`true`表示可以
- 默认值 false

```js
// 定义对象
var obj = {
  name: '张三',
}
// 定义属性age
Object.defineProperty(obj, 'age', {
  value: 22,
  writable: true,
  enumerable: false, // 不可以被枚举，被for..in遍历
})
console.log(obj)
// age属性不能被遍历出来
for (var key in obj) {
  console.log(obj[key])
}
```

![image-20221123000500106](https://www.arryblog.com/assets/img/image-20221123000500106.81a99e7a.png)

```js
// 定义对象
var obj = {
  name: '张三',
}
// 定义属性age
Object.defineProperty(obj, 'age', {
  value: 22,
  writable: true,
  enumerable: true, // 可遍历
})
console.log(obj)
// age属性不能被遍历出来
for (var key in obj) {
  console.log(obj[key])
}
```

![image-20221123000623949](https://www.arryblog.com/assets/img/image-20221123000623949.8cc227d7.png)

### 1.3、configurable

configurable 为 true，表示可删除属性重新定义，其它特性也可以被修改

```js
var obj = {}
// 定义属性
Object.defineProperty(obj, 'name', {
  writable: true,
  value: '张三',
  enumerable: true,
  configurable: true,
})
console.log(obj)
delete obj.name // 删除属性
Object.defineProperty(obj, 'name', {
  writable: false,
  value: '张三',
  enumerable: false,
  configurable: false,
})
console.log(obj)
```

configurable 为 false 表示不可删除属性重新定义，除 `value` 和 `writable` 特性外的其他特性不可以被修改。

```js
var obj = {}
// 定义属性
Object.defineProperty(obj, 'name', {
  writable: true,
  value: '张三',
  enumerable: true,
  configurable: false,
})

// 不可删除
// delete obj.name;

Object.defineProperty(obj, 'name', {
  writable: false, // 可修改
  value: '张三2', // 可修改
  enumerable: true, // 不可修改
  configurable: true, // 不可修改
})
console.log(obj)
```

### 1.4、注意事项

注：

- 直接定义在对象身上的属性，以上属性特性的默认值分别为：`writable:true`、`value:undefined`、`configurable：true`、`enumerable:true`
- 通过`Object.defineProperty`方式定义的属性，其属性特性的默认值分别为：`writable:false`、`value:undefined`、`configurable：false`、`enumerable:false`

### 1.5、Object.getOwnPropertyDescriptor

`Object.getOwnPropertyDescriptor()`方法可以取得指定属性的属性描述符

```js
Object.getOwnPropertyDescriptor(obj, prop)
var obj = {
  name: '张三',
  age: 23,
}

Object.defineProperty(obj, 'sex', {
  writable: false,
  value: '女',
  enumerable: false,
  configurable: false,
})

var descriptor1 = Object.getOwnPropertyDescriptor(obj, 'name')
var descriptor2 = Object.getOwnPropertyDescriptor(obj, 'sex')
console.log(descriptor1)
console.log(descriptor2)
console.log(obj)
```

![image-20221206201401381](https://www.arryblog.com/assets/img/image-20221206201401381.a6a661f1.png)

### 2、存取描述符

> 存取描述符有以下 4 个特性描述它们的行为，具体如下表

| 属性特性     | 说明                                                                                            | 默认      |
| :----------- | :---------------------------------------------------------------------------------------------- | :-------- |
| configurable | 特性表示对象的属性是否可以被删除，以及除 `value` 和 `writable` 特性外的其他特性是否可以被修改。 | false     |
| enumerable   | 表示属性是否可以通过 for...in 循环遍历                                                          | false     |
| get 获取函数 | 获取函数，在读取属性时调用。这个函数的主要责任就是返回一个有效的值                              | undefined |
| set 设置函数 | 设置函数，在写入属性时调用。这个函数决定了对数据做什么样的修改，这个函数有一个参数。            | undefined |

注：

`Object.defineProperty`定义的属性，如果属性描述符为**存取描述符**，那这个属性被称为 **“访问器属性”**

- configurable 与 enumerable 特性与 数据描述符的用法是一样的
- get 获取函数，在读取属性时调用，这个函数的返回值为这个属性的值
- set 设置函数，在写入属性时调用，这个函数决定了对数据做什么样的修改

```js
var obj = {
  name: '张三',
  age: 23,
  _sex: '女',
  identity: '女士',
}

Object.defineProperty(obj, 'sex', {
  set: function (value) {
    this._sex = value
    if (value === '女') {
      this.identity = '女士'
    } else {
      this.identity = '先生'
    }
  },
  get: function () {
    return this._sex
  },
})
obj.sex = '男'
console.log(obj.sex)
console.log(obj.identity)
```

![image-20221123010917757](https://www.arryblog.com/assets/img/image-20221123010917757.28e28129.png)

访问器属性的典型应用场景：

当设置或获取一个属性的值时，我们还需要做相关的其它操作，就可以把这个属性设置成访问器属性。

get 和 set 方法的这种机制，我们可以理解为数据拦截或数据劫持。

> 也就是在我操作数据时，会被 get 和 set 方法拦截，然后在里面做相应的操作。改变正常的访问和设置行为。

### 2.1、注意事项

注：

- 获取函数和设置函数不一定都要定义
- 只定义获取函数意味着属性是只读的，尝试修改属性会被忽略，严格模式会抛错
- 只有一个设置函数的属性是不能读取的，非严格模式下返回值为 undefined,严格模式下（有可能）会抛错。

```js
'use strict' // 严格模式下
var obj = {
  name: '张三',
  age: 23,
  _sex: '女',
  identity: '女士',
}

Object.defineProperty(obj, 'sex', {
  get: function () {
    return this._sex
  },
})
obj.sex = '男'
console.log(obj)
```

### 3、Object.defineProperties

`Object.defineProperties()`方法允许我们在一个对象上同时定义多个属性。

```js
Object.defineProperties(obj, props)
```

- obj 需要定义和修改属性的对象
- props 用来修改对应属性的描述符对象

```js
var obj = {
  _sex: '女',
  identity: '女士',
}
Object.defineProperties(obj, {
  name: {
    value: '张三',
    writable: true,
  },
  age: {
    value: 23,
    writable: true,
  },
  sex: {
    get: function () {
      return this._sex
    },
    set: function (value) {
      if (value === '女') {
        this.identity = '女士'
      } else {
        this.identity = '先生'
      }
      this._sex = value
    },
  },
})

obj.sex = '男'
console.log(obj)
```

### 4、经典面试题

**JavaScript 中有没有可能让`(a === 1 && a === 2 && a === 3)`返回`true` ？**

这是阿里的一个经典面试题，刚开始一看你觉得这是不可能的，因为一个变量怎么可能同时存在三个不同的值呢？ 但你静下心来分析，你就能找到面试官在考什么 ？

> 如果我们在读取一个变量的值时，能修改这个变量对应的值，那不就有解了吗 ?

我们可以把变量 a 当前 window 对象的属性，同时 a 还是一个访问器属性，那我们就可以在他的 get 方法中来修改他的值。

```js
var _a = 0
Object.defineProperty(window, 'a', {
  get: function () {
    return ++_a
  },
})

if (a === 1 && a === 2 && a === 3) {
  console.log('再次输出a的值为' + a)
}
```

注：

通过上面这个面试题给了我们一个启发

如果在获取或设置一个变量的值时，还需要做相关的其它操作，我们就可以把这个变量设置成一个访问器属性，然后在他的 get 和 set 方法中做相应的操作。

### 4.1、案例应用：追溯属性的赋值记录

当我们每次设置属性的值时，可以把设置的值保存在数组中，那这个数组就是用来保存属性赋值的记录

```js
var obj = {
  _num: 0,
  _historyValues: [],
}
Object.defineProperty(obj, 'num', {
  get: function () {
    return this._num
  },
  set: function (value) {
    this._historyValues.push(value)
    this._num = value
  },
})

obj.getHistory = function () {
  return this._historyValues
}
obj.go = function (index) {
  if (index >= this._historyValues.length) throw new Error('访问下标超出范围')
  return this._historyValues[index]
}

obj.num = 1
obj.num = 2
obj.num = 3
console.log(obj.getHistory())
console.log(obj.go(1))
console.log(obj.go(3))
```

### 4.2、应用案例：数据驱动页面更新（单向）

**Vue 中有两种数据绑定方式**

- 单向绑定（v-bind）：数据只能从 `data` 流向页面
- 双向绑定（v-modle）：数据不仅能从 `data` 流向页面，还能从页面流向 `data`

在 Vue2 中，其数据的绑定方式底层采用的是 `Object.defineProperty`，在 Vue3 中，底层采用的是 Proxy 代理。但本质的原理是一样的。

> 以下案例简单实现了数据的单向绑定，关于双向绑定后面的案例中会讲到

```html
<div class="J-container">
  <h3 class="title"></h3>
  <img src="" alt="" class="main-img" width="200" />
  <p>
    价格
    <span class="price"></span>
  </p>
</div>

<script>
  //   var data = {
  //     title: "xx",
  //     mainImg: "xx",
  //     price: "xx",
  //   };

  function defineData() {
    var _obj = {},
      title = '云原生容器化docker+K8S+CICD弹性扩容集群架构实战',
      mainImg =
        'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2020/04-23/1339186404a1276893.jpg',
      price = 3680.0

    // 获取页面元素
    var oTitle = document.querySelector('.title')
    var oMainImg = document.querySelector('.main-img')
    var oPrice = document.querySelector('.price')

    // 初始渲染
    oTitle.innerText = title
    oMainImg.src = mainImg
    oPrice.innerText = price

    var data = Object.defineProperties(_obj, {
      title: {
        get: function () {
          return title
        },
        set: function (value) {
          title = value
          oTitle.innerText = value
        },
      },
      mainImg: {
        get: function () {
          return mainImg
        },
        set: function (value) {
          mainImg = value
          oMainImg.src = value
        },
      },
      price: {
        get: function () {
          return price
        },
        set: function (value) {
          price = value
          oPrice.innerText = value
        },
      },
    })

    return data
  }

  var data = defineData()

  // 当data中的数据发生更新数据，则页面数据就发生相应的变化
  data.title = 'Web前端高级工程师系统课-星辰班'
  data.mainImg =
    'https://sce7a2b9c9d95a-sb-qn.qiqiuyun.net/files/course/2022/08-29/210311f40bcf290736.jpg'
  data.price = 300
</script>
```

## 二、区分公有、静态、私有属性

深入浅出 JavaScript 公有属性和方法，静态属性和方法，私有属性和方法、特权方法，混合模式，综合应用实践 多彩运动的小球

### 1、JS 公有属性和公有方法

- 公有属性：所有构造函数的实例都可以访问的属性，在构造函数内部通过 **`this.属性名`** 定义的。
- 公有方法：所有构造函数的实例都可以访问的方法，在**构造函数 prototype 原型**上定义的方法。

> 公有属性也称实例属性，公有方法也称实例方法

```js
function Person(name, age) {
  // 公有属性 实例属性
  this.name = name
  this.age = age

  // 公有方法（一般不会这样写）
  this.toSleep = function () {
    console.log('我正在睡觉')
  }
}
// 公有方法 实例方法
Person.prototype.sayHello = function () {
  console.log('大家好，我是' + this.name)
}

var p1 = new Person('张三', 32)
console.log(p1.name)
console.log(p1.age)
p1.sayHello()
```

### 2、JS 静态属性和静态方法

- 静态属性：只有类（构造函数）本身能访问的属性，通过`类名.属性名` 来定义
- 静态方法：只有类（构造函数）本身能访问的属性，通过`类名.方法名 = function() {...}` 来定义

```js
function Person() {}
// 静态属性
Person.length = 0
Person.children = function () {
  console.log('静态方法')
}

var p = new Person()
console.log(p.length) // 不能访问
console.log(Person.length) // 能访问
```

### 3、JS 私有属性、私有方法和特权方法

- **私有属性**：只能在构造函数内部才能访问的属性，如果外部要访问必须通过指定的方法来访问和修改
- **私有方法**：是指对象不希望公开的方法，只能在构造函数内部才能调用的方法
- **特权方法：\*\*是指有权访问内部私有属性和私有方法的\*\*公有方法**

注意：

- 在 JS 中并没有**私有属性和私有方法**的概念，所以需要利用**闭包**的思想
- 行业约定规范，私有属性和方法在命名时以 `_` 下划线开头

```js
function Price() {
  // 私有属性
  var _price = 0

  // 私有方法  用来对属性price做相关操作
  function _computed() {
    return _price > 0 ? '￥' + _price : '免费'
  }

  // 特权方法  获取属性计算后的值
  this.getPrice = function () {
    return _computed()
  }

  // 特权方法
  this.setPrice = function (value) {
    if (typeof value !== 'number') throw new TypeError('传入一个数字')
    _price = value
  }
}

var p = new Price()
p.setPrice(200.05)
console.log(p.getPrice()) // ￥200.05
p.setPrice(-90) //
console.log(p.getPrice()) // 免费
```

### 4、混合模式

- 将所有实例都操作的**特权方法**定义在构造函数的原型链上
- 特权方法要访问到私有属性和方法可以利用**闭包**来实现

**案例应用**

- 利用 JS 来模拟现实生活中，父亲有挣钱、花钱、查看账户金额的能力，但是他的孩子只有花钱能力
- 我们可以定义两个类：`Father`类（模拟父亲） `Children`类（模拟孩子们）

**Father 类身上有的方法和属性**

| 属性与方法       | 功能                       |
| :--------------- | :------------------------- |
| 私有属性 \_money | 记录账户总金额             |
| 静态方法 save    | 存钱                       |
| 静态方法 take    | 花（取 take）钱            |
| 静态方法 view    | 查看账户金额               |
| 实例方法 take    | 取钱（提供孩子花钱的接口） |

**Children 类身上有的方法和属性**

| 属性和方法    | 功能           |
| :------------ | :------------- |
| 实例属性 姓名 | 保存孩子的姓名 |

```js
// 父类
var Father = (function () {
  var _money = 0 // 私有属性

  function Father() {}
  // 静态方法 存钱
  Father.save = function (value) {
    console.log('父亲存入' + value + '元')
    _money += value
  }
  // 静态方法 取钱
  Father.take = function (value) {
    console.log('父亲取出' + value + '元')
    _money -= value
  }
  // 静态方法 查看
  Father.view = function () {
    console.log('目前账户还有' + _money + '元')
    return _money
  }

  // 公有方法 (实例方法)
  Father.prototype.take = function (value) {
    _money -= value
    console.log(this.name + '取了' + value + '元')
  }

  return Father
})()

// 子类
function Child(name) {
  this.name = '张三'
  Father.call(this) // 经典继承（盗用构造函数）
}
// 原型式继承
Child.prototype = Object.create(Father.prototype)

var child = new Child()
Father.save(2000)
child.take(1000)
Father.view()
Father.save(2000)
Father.view()
```

![image-20221209150311956](https://www.arryblog.com/assets/img/image-20221209150311956.afb53fc4.png)

> **注意：** 以上情况，所有实例本质上操作的是同一个变量 `_money`

### 5、多彩运动的小球

![GIF2022-11-1615-58-55](https://www.arryblog.com/assets/img/GIF2022-11-1615-58-55.2144f523.gif)

> 首先我们要根据这个特效做相关分析：构建一个什么类，这个类上有那些属性和方法。

### 5.1、多彩运动小球的实现原理

- 当鼠标滑动时，会产生一系列的彩色小球，然后这些小球开始向不同的方向运动，运动过程中会发生（大小，位置，透明度）的变化
- 所以我们需要构建一个**球类**，这个类身上有以下相关的属性和方法

| 属性和方法       | 说明                                                                     |
| :--------------- | :----------------------------------------------------------------------- |
| 实例属性 x       | 小球水平方向坐标 ，默认值 0                                              |
| 实例属性 y       | 小球垂直方向从标 ，默认值 0                                              |
| 实例属性 r       | 小球的半径，默认值 20                                                    |
| 实例属性 color   | 数组，从数组中随机取出一个颜色作为小球的颜色                             |
| 实例属性 opacity | 小球的透明度（刚开始透明度为 1）                                         |
| 实例属性 speedX  | 小球水平方向运动速度（步长）随机 （取值范围`[-10,10]`）                  |
| 实例属性 speedY  | 小球垂直方向运动速度（步长）随机（取值范围`[-10,10]`）                   |
| 实例属性 dom     | 小球的 dom 结构                                                          |
| 实例方法 init    | 初始化一个小球（根据小球属性，在页面创建一个真实的 DOM 球）              |
| 实例方法 update  | 更新小球的属性值`(x,y,r,opacity)`，同时小球透明度为 0，将其从 DOM 中删除 |

那如何监控鼠标在滑动过程中被创建出来的一堆小球，然后让他们不停的运动呢 ？

- 我们需要在球类上创建一个私有属性`ballArr = []`，用来保存鼠标移动时创建出来的实例化小球。每实例化一个小球，就把这个实例化的小球对象添加到`ballArr`数组中
- 还需要创建一个静态方法`getBalls`用来获取所有实例化的小球。这样我们就能拿到所有实例化的小球，对他们进行操作。

| 属性和方法          | 说明                                          |
| :------------------ | :-------------------------------------------- |
| 私有属性 `_ballArr` | 数组，用来保存创建好的实例化小球              |
| 静态方法 `getBalls` | 用来获取所有实例化的小球 （返回数组 ballArr） |

**拿到实例化小球后，如何让小球运动起来 ？**

- 要让小球运动起来，需要开启一个定时器，让球不断的调用自身的`update`方法，实现小球运动及运动中各种属性的变化
- 同时还要判断如果小球的透明度为 0，则需要将小球从`ballArr`数组和 DOM 中删除，确保垃圾能及时被回收，不至于小球多了造成页面卡顿

### 5.2、JS 代码实现思路

创建一个球类，定义好球类的实例属性

```js
/**
 * Ball 创建一个球类
 * @param x坐标  默认值 0
 * @param y坐标  默认值 0
 * @param r小球半径 默认 20
 */
function Ball(x = 0, y = 0, r = 20) {
  this.x = x // x坐标
  this.y = y // y坐标
  this.r = r // 小球半径
  // 随机生成一个小球颜色
  this.color = (function () {
    var color = ['red', 'pink', 'skyblue', 'orange', 'tomato', 'khaki', 'greenyellow']
    var index = (Math.random() * color.length) >> 0
    return color[index]
  })()
  this.opacity = 1 // 小球透明度
  // 小球运动速度，speedX和speedY的取值范围 [-10,10]，但不能同时为0
  do {
    this.speedX = Math.floor(Math.random() * 21) - 10
    this.speedY = Math.floor(Math.random() * 21) - 10
  } while (this.speedX === 0 && this.speedY === 0)

  // 在new Ball(),内部会自动调用this.init()初始化小球，在页面显示，其实现代码看下一步
  this.init()
}

// 鼠标在页面滑动时，会创建实例化的小球
document.onmousemove = function (e) {
  var pageX = e.pageX
  var pageY = e.pageY
  new Ball(pageX, pageY)
}
```

实现球类的 init 初始化方法，实现在页面插入一个真实的小球

```js
Ball.prototype.init = function () {
  this.dom = document.createElement('div') // 创建dom结构
  this.dom.style.position = 'absolute'
  this.dom.style.left = this.x - this.r + 'px'
  this.dom.style.top = this.y - this.r + 'px'
  this.dom.style.width = 2 * this.r + 'px'
  this.dom.style.height = 2 * this.r + 'px'
  this.dom.style.borderRadius = '50%'
  this.dom.style.backgroundColor = this.color
  // 添加到页面
  document.body.appendChild(this.dom)
}
```

实现球类的 update 方法，当调实例调用 update 方法，就可以更新自己的属性

```js
Ball.prototype.update = function () {
  this.x += this.speedX // 更新x坐标
  this.y += this.speedY // 更新y坐标
  this.r += 0.3 // 更新半径
  this.opacity -= 0.01

  // 更新的属性更新到真实DOM上
  this.dom.style.display = 'none'
  this.dom.style.width = this.r * 2 + 'px'
  this.dom.style.height = this.r * 2 + 'px'
  this.dom.style.left = this.x - this.r + 'px'
  this.dom.style.top = this.y - this.r + 'px'
  this.dom.style.opacity = this.opacity
  this.dom.style.display = 'block'
}
```

让产生的实例小球能运动起来，需要创建私有属性保存每次创建的实例小球，同时还要创建静态方法，可以获取到创建的所有实例小球

```js
var _ballArr=[]; // 类的私有属性
// 静态方法
Ball.getBalls = function () {
    return ballArr;
};

function Ball(x = 0, y = 0, r = 20）{
               // ......
               // .....以下代码放在 this.init() 后面

               // 每次创建的实例对象，添加到数组 _ballArrl中
               _ballArr.push(this);
}
```

开启定时器，间隔一定时间，让小球调用自己的 update 方法，实现小球运动

```js
var timer = setInterval(function () {
  var balls = Ball.getBalls()
  // 更新小球
  for (var i = 0; i < balls.length; i++) {
    balls[i].update()
  }
}, 20)
```

- 如果小球在运动种，透明度变成了 0，则需要从\_ballArr 和 DOM 中删除，这样垃圾就能得到及时回收，不会因为小球太多造成页面卡顿。
- 如果判断小球在运动过程中透明度变为 0，则可以在 update 方法中来判断

```js
// 以下代码添加到update方法的最后面
// 如果小球的透明度小于等于0,则将其从数组和DOM中删除
if (this.opacity <= 0) {
  for (var i = 0; i < _ballArr.length; i++) {
    if (_ballArr[i] === this) {
      _ballArr.splice(i, 1) // 从数组中删除
      document.body.removeChild(this.dom) // 从DOM中删除
      break
    }
  }
}
```

### 5.3、完整版源码

为了防止变量造成全局污染，则利用闭包，将所有代码封装在立即执行函数中，然后将 Ball 类作为返回值返回

```html
<script>
  /**
   * Ball 创建一个球类
   * @param x坐标  默认值 0
   * @param y坐标  默认值 0
   * @param r小球半径 默认 20
   */
  var Ball = (function () {
    var _ballArr = [] // 类的私有属性
    function Ball(x = 0, y = 0, r = 20) {
      this.x = x // x坐标
      this.y = y // y坐标
      this.r = r // 小球半径
      // 随机生成一个小球颜色
      this.color = (function () {
        var color = ['red', 'pink', 'skyblue', 'orange', 'tomato', 'khaki', 'greenyellow']
        var index = (Math.random() * color.length) >> 0
        return color[index]
      })()
      this.opacity = 1 // 小球透明度
      // 小球运动速度，speedX和speedY的取值范围 [-10,10]，但不能同时为0
      do {
        this.speedX = Math.floor(Math.random() * 21) - 10
        this.speedY = Math.floor(Math.random() * 21) - 10
      } while (this.speedX === 0 && this.speedY === 0)

      // 每次创建的实例对象，添加到数组 _ballArrl中
      _ballArr.push(this)
      // 每次实例化对象时，就调用init方法，在页面实例化小球
      this.init()
    }

    // 静态方法
    Ball.getBalls = function () {
      return _ballArr
    }

    Ball.prototype.init = function () {
      this.dom = document.createElement('div') // 创建dom结构
      this.dom.style.position = 'absolute'
      this.dom.style.left = this.x - this.r + 'px'
      this.dom.style.top = this.y - this.r + 'px'
      this.dom.style.width = 2 * this.r + 'px'
      this.dom.style.height = 2 * this.r + 'px'
      this.dom.style.borderRadius = '50%'
      this.dom.style.backgroundColor = this.color
      // 添加到页面
      document.body.appendChild(this.dom)
    }

    Ball.prototype.update = function () {
      this.x += this.speedX // 更新x坐标
      this.y += this.speedY // 更新y坐标
      this.r += 0.3 // 更新半径
      this.opacity -= 0.01

      // 更新的属性更新到真实DOM上
      this.dom.style.display = 'none'
      this.dom.style.width = this.r * 2 + 'px'
      this.dom.style.height = this.r * 2 + 'px'
      this.dom.style.left = this.x - this.r + 'px'
      this.dom.style.top = this.y - this.r + 'px'
      this.dom.style.opacity = this.opacity
      this.dom.style.display = 'block'

      // 如果小球的透明度小于等于0,则将其从数组和DOM中删除
      if (this.opacity <= 0) {
        // 找到小球实例在数组中的位置，然后将他从数组中删除
        var index = _ballArr.indexOf(this)
        _ballArr.splice(index, 1)
        // 从dom中删除
        document.body.removeChild(this.dom)
      }
    }
    return Ball
  })()

  // 鼠标在页面滑动时，会创建实例化的小球
  document.onmousemove = function (e) {
    var pageX = e.pageX
    var pageY = e.pageY
    new Ball(pageX, pageY)
  }

  // 点击后，创建一个小球让他运动起来
  //   document.onclick = function (e) {
  //     var pageX = e.pageX;
  //     var pageY = e.pageY;
  //     new Ball(pageX, pageY);
  //   };

  var timer = setInterval(function () {
    var balls = Ball.getBalls()
    // 更新小球
    for (var i = 0; i < balls.length; i++) {
      balls[i].update()
    }
  }, 20)
</script>
```

## 三、JS 实现栈与队列

接下来我们学习栈和队列这两种数据结构，同时利用 JS 来模拟栈和队列

在之前的课程（算法）章节，我们学习过栈这种数据结构，这里我们先来复习下

### 1、什么是栈

栈是一种先进后出的数据结构，是一种逻辑结构，一种抽像出来的理论模型

- **入栈操作（ push ）**：就将新元素放入到栈中，先放的在栈底
- **出栈操作（ pop ）**：就是将元素从栈中弹出，只有栈顶元素才能出

![stack](https://www.arryblog.com/assets/img/stack.b043979b.jpg)

- 之前课程中我们简单的用数组来模拟一个栈的出栈和入栈全过程
- **数组相当于一个栈结构**，向数组中 push 添中元素为**入栈**，从数组尾部 pop 取出元素为**出栈**

```js
// 声明一个空数组，用来当成栈
var stack = []

// 向数组中添加元素
for (var i = 0; i < 6; i++) {
  stack.push(i) // 入栈
  console.log(arr)
}

// 取出数组中的元素
for (var i = 0; i < 6; i++) {
  stack.pop() // 出栈
  console.log(arr)
}
```

> 接下来，我们利用 JS 来模拟一个完整的栈对象

### 2、JS 实现栈结构

构建一个 Stack 类，只要 `new Stack()` 就能创建一个新的栈

> 一个基础的栈对象要求有以下方法和属性

| 方法    | 说明                   |
| :------ | :--------------------- |
| push    | 入栈，向栈中添加元素   |
| pop     | 出栈，从栈顶部弹出元素 |
| isFull  | 查看栈是否满           |
| isEmpty | 查看栈是否为空         |
| getTop  | 取出栈顶部元素         |
| clear   | 清空栈中元素           |
| view    | 查看当前栈中元素       |

| 属性                | 说明                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------- |
| 实例属性： size     | 查看栈的长度（模拟大小）                                                                             |
| 私有属性： `_stack` | 数组，模拟栈容器，栈中元素都存在 stack 中 私有属性，不允许直接操作`_stack`，只能通过给定的接口来操作 |

```js
/**
 * Stack 栈
 * size 栈的大小（长度）
 */
function Stack(size = 100) {
  this._stack = [] // 私有属性，栈容器
  this.size = size // 返回栈的大小（长度）,可更改
}

// 判断栈是否满,满返回true,否则false
Stack.prototype.isFull = function () {
  return this._stack.length >= this.size ? true : false
}

// 判断栈是否为空,为空返回true,否则false
Stack.prototype.isEmpty = function () {
  return this._stack.length <= 0 ? true : false
}

// 入栈
Stack.prototype.push = function (value) {
  if (this.isFull()) {
    throw new Error('栈满，不能再填加元素')
  } else {
    this._stack.push(value)
    return true // 返回true，表示入栈成功
  }
}

// 出栈
Stack.prototype.pop = function () {
  if (this.isEmpty()) {
    throw new Error('栈空，没有元素可以出栈')
  } else {
    return this._stack.pop() // 返回出栈元素
  }
}

// 取出栈顶元素
Stack.prototype.getTop = function () {
  return this._stack[this._stack.length - 1]
}

// 查看栈中元素
Stack.prototype.view = function () {
  console.log('当前栈中的元素有')
  this._stack.forEach(function (item) {
    console.log(item)
  })
}

// 清空栈
Stack.prototype.clear = function () {
  this._stack = []
  return true // 清空栈成功
}

var stack = new Stack(4)
// 入栈
console.log(stack.push(1)) // true
console.log(stack.push(2)) // true
console.log(stack.push(3)) // true
console.log(stack.push(4)) // true
// 查看栈是否满
console.log(stack.isFull()) // true
// 查看栈元素
console.log(stack.view()) //  [1, 2, 3, 4]
// 出栈
console.log(stack.pop()) // 4
console.log(stack.pop()) // 3
// 查看栈元素
console.log(stack.view()) // [1, 2]
// 查看栈是否满
console.log(stack.isFull()) // false
// 清空栈
console.log(stack.clear()) // true
// 判断栈是否为空
console.log(stack.isEmpty()) // true
// 查看栈元素
console.log(stack.view()) // []
```

注：

- 以上栈（数组）的长度是在动态变化的，但最终入栈的个数不能大于栈的`size`大小
- 如果栈满，再入栈就会抛出栈满错误提示
- 如果栈空，再出栈就会抛出栈空错误提示

### 3、JS 实现栈结构 - 优化版

以上版本，最终用户本质上还是可以通过 `stack._stack`的方式操作数组

我们可以把**私有属性的名字，改成 Symbol 类型**，这样用户就真正没有办法访问到该属性了

```js
var Stack = (function () {
  /**
   * Stack 栈
   * size 栈的大小（长度）
   */
  var _stack = Symbol('_stack') // 生成唯一标识符
  function Stack(size = 100) {
    this[_stack] = [] //  私有属性，栈容器
    var _size = size // 返回栈的大小（长度）,可更改

    Object.defineProperty(this, 'size', {
      get: function () {
        return _size
      },
      // 当对size进行操作时，需要对数组做相关操作
      set: function (value) {
        if (value < _size) {
          this[_stack] = this[_stack].slice(0, value)
          _size = value
        }
      },
    })
  }

  // 判断栈是否满,满返回true,否则false
  Stack.prototype.isFull = function () {
    return this[_stack].length === this.size ? true : false
  }

  // 判断栈是否为空,为空返回true,否则false
  Stack.prototype.isEmpty = function () {
    return this[_stack].length === 0 ? true : false
  }

  // 入栈
  Stack.prototype.push = function (value) {
    if (this.isFull()) {
      throw new Error('栈满，不能再填加元素')
    } else {
      this[_stack].push(value)
      return true // 返回true，表示入栈成功
    }
  }

  // 出栈
  Stack.prototype.pop = function () {
    if (this.isEmpty()) {
      throw new Error('栈空，没有元素可以出栈')
    } else {
      return this[_stack].pop() // 返回出栈元素
    }
  }

  // 取出栈顶元素
  Stack.prototype.getTop = function () {
    return this[_stack][this[_stack].length - 1]
  }

  // 查看栈中元素
  Stack.prototype.view = function () {
    console.log('当前栈中的元素有')
    this[_stack].forEach(function (item) {
      console.log(item)
    })
  }

  // 清空栈
  Stack.prototype.clear = function () {
    this[_stack] = []
    return true // 清空栈成功
  }
  return Stack
})()

var stack = new Stack()
// 入栈
console.log(stack.push(1)) // true
console.log(stack.push(2)) // true
console.log(stack.push(3)) // true
console.log(stack.push(4)) // true
// 查看栈是否满
console.log(stack.isFull()) // true
// 查看栈元素
console.log(stack.view()) //  [1, 2, 3, 4]
// 出栈
console.log(stack.pop()) // 4
console.log(stack.pop()) // 3
// 查看栈元素
console.log(stack.view()) // [1, 2]
// 查看栈是否满
console.log(stack.isFull()) // false
// 清空栈
console.log(stack.clear()) // true
// 判断栈是否为空
console.log(stack.isEmpty()) // true
// 查看栈元素
console.log(stack.view()) // []
```

### 4、什么是队列

现在我们来学习一种新的数据结构**队列**

- 队列是一种线性的数据结构，它的特点是先进先出（`First In First Out`，简称`FIFO`），后进后出
- 队列的出口端叫作**队头**（`front`），队列的入口端叫作**队尾**（`rear`）
- **入队**（`enqueue`）就是把新元素放入队列中，只允许在队列的队尾放入元素
- **出队**（`dequeue`）就是把元素移出队列，只允许在队列的队头移出元素

![image-20221103162913639](https://www.arryblog.com/assets/img/image-20221103162913639.4f29d364.png)**用数组来模拟队列**

![image-20221103211210042](data:image/png;base64,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)

```js
var arr = []
arr.push(1) // 入队
arr.shift() // 出队
```

### 5、JS 实现队列

构建一个 Queue 类，只要`new Queue()` 就能创建一个新的队列

> 一个基础的队列对象要求有以下方法和属性

| 方法     | 说明                 |
| :------- | :------------------- |
| enQueue  | 入队，向队尾添加元素 |
| deQueue  | 出队，从队头删除元素 |
| isFull   | 判断队列是否已满     |
| isEmpty  | 判断队列是否为空     |
| getFront | 取出队头元素         |
| clear    | 清空队列             |
| view     | 查看队列中元素       |

| 属性                | 说明                                                                                                    |
| :------------------ | :------------------------------------------------------------------------------------------------------ |
| 私有属性： `_queue` | 数组，模拟队列容器，队中元素都存在`_queue`中 私有属性，不允许直接操作`_queue`，只能通过给定的接口来操作 |
| 实例属性：size      | 队列的大小（长度）                                                                                      |

```html
<script>
  var Queue = (function () {
    var _queue = Symbol('queue') // 创建唯一标识符
    function Queue(size) {
      this[_queue] = [] // 私有属性，队列容器
      this.size = size // 队列的长度（大小）
    }
    // 判断队列是否已满,true表示已满，false表示未满
    Queue.prototype.isFull = function () {
      return this[_queue].length === this.size ? true : false
    }
    // 判断队列是否为空
    Queue.prototype.isEmpty = function () {
      return this[_queue].length === 0 ? true : false
    }

    // 入队
    Queue.prototype.enQueue = function (value) {
      if (this.isFull()) {
        throw new Error('队列已满，不能现入队')
      } else {
        this[_queue].push(value)
        return true //表示入队成功
      }
    }

    // 出队
    Queue.prototype.deQueue = function () {
      if (this.isEmpty()) {
        throw new Error('队列已为空，没有元素可出队')
      } else {
        return this[_queue].shift() // 返回出队元素
      }
    }

    // 取出队头元素
    Queue.prototype.getFront = function () {
      return this[_queue][0] // 返回值为undefined表示当前队列已空
    }

    // 查看队列中元素
    Queue.prototype.view = function () {
      this[_queue].forEach(function (item) {
        console.log(item)
      })
    }

    // 清空队列
    Queue.prototype.clear = function () {
      this[_queue] = []
      return true // true清空队列成功
    }
    return Queue
  })()

  var queue = new Queue(3)
  var queue2 = new Queue(3)
  // 判断队列是否为空
  console.log(queue.isEmpty()) // true
  // 入队元素
  queue.enQueue(1)
  queue.enQueue(2)
  queue.enQueue(3)
  //   queue.enQueue(4);
  // 取出队列头部元素
  console.log(queue.getFront()) // 1
  // 查看队列中元素
  console.log(queue.view()) // [1, 2, 3]
  // 查看队列是否已满
  console.log(queue.isFull()) // true
  // 出队
  console.log(queue.deQueue()) // 1
  console.log(queue.deQueue()) // 2
  console.log(queue.deQueue()) // 3
  // 查看队列是否为空
  console.log(queue.isEmpty()) // true
</script>
```

上述版本缺点

- 以上版本，在入队时还好，直接尾部插入元素，但是在出队时从队头取出元素，本质上会造成整个数组往后的所有元素都向前移动，非常消耗性能
- 同时队列的容量大小一直是在不断变化的，而实际上一个队列的大小在刚开始分配时，大小应该是固定才更合理

**优化方向**

- 有没有什么办法能实现在出队时，能正常出，不需要动数组中的其它元素呢 ?
- 同时保证整个出队和入队过程程中，栈的容量大小是固定的

### 6、优化版本 - JS 实现循环队列

- 我们可以利用**双指针**思想，同时采用**循环队列**的方式来实现
- 以下图中的**队列容量（长度）为 4**，需要用**长度为 5 的数组**来实现。
- 定义两个指针 `front` 和 `rear`，`front`和`rear`分别表示当前队列**队头**和**队尾**的下标
- 刚开始初始化的队列为空，则 `front = rear = 0`
- 如果队未满，入队一个元素，`rear + 1`，向右移一位，当`rear + 1 === arr.length` 时，则 `rear = 0`
- 如果队未空，出队一个元素，`front + 1`，向右移一位，当`front + 1 === arr.lenght` 时，`front = 0`

> **重点强调**：队列的容量 + 1 = 数组的长度

![image-20221104001903505](https://www.arryblog.com/assets/img/image-20221104001903505.2ca00ec6.png)

队列入队的整个过程

![image-20221103235611430](https://www.arryblog.com/assets/img/image-20221103235611430.171330e9.png)

队列出队与队入的整过程

![image-20221103235647233](https://www.arryblog.com/assets/img/image-20221103235647233.6137f46f.png)

队列出队的整个过程

通过以上绘图分析得出如下结论

- **队满**： 当`(rear + 1) % arr.lenght === front` 时，表示队满
- **队空：** 当 `rear === front` 时，表示队空

**出队**：

- 出队时要判断当前队是否为空，如果为空，啥也不做。
- 如果队不为空，要判断 `front+1 === arr.length` 如果成立则出队后，`front = 0`，
- 如果不成立，则 `front + 1`

> front 的计算公式：`front = (front + 1) % arr.length`

**入队**：

- 入队时要判断当前队是否满，如果满，啥也不做
- 如果队未满，要判断 `rear + 1 === arr.lenght` 如果成立，则入队后，`rear = 0`
- 如果未满，则 `rear + 1`

> rear 的计算公式：`rear = (rear + 1) % arr.length`

```html
<script>
  var Queue = (function () {
    var _queue = Symbol('queue')
    var _front = Symbol('front')
    var _rear = Symbol('rear')
    function Queue(size = 100) {
      // 私有属性
      this[_queue] = new Array(size + 1) // 队容器（固定长度）
      this[_front] = 0 // 队头
      this[_rear] = 0 // 队尾
      // 实例属性
      var _size = size
      Object.defineProperty(this, 'size', {
        get: function () {
          return _size
        },
        set: function () {
          throw new Error('不允许设置size的值')
        },
      })
    }

    // 队是否为空
    Queue.prototype.isFull = function () {
      //   队满的条件
      return (this[_rear] + 1) % this[_queue].length === this[_front]
    }
    // 队是否为空
    Queue.prototype.isEmpty = function () {
      return this[_front] === this[_rear]
    }
    // 入队
    Queue.prototype.enQueue = function (value) {
      //入队前要判断当前队列是否已满,如果已满,则啥也不做,抛出错误提示
      if (this.isFull()) throw new Error('当前队列已满,不能再入队')

      // 先在当前位置入队元素,然后指向右移动
      this[_queue][this[_rear]] = value
      // 判断当前是不是在数组的最后面,最后一位就回到0
      this[_rear] = (this[_rear] + 1) % this[_queue].length
      return true
    }
    // 出队
    Queue.prototype.deQueue = function () {
      // 出队前要判断当前队列是否为空
      if (this.isEmpty()) throw new Error('当前队列已空,没有元素可出队')
      // 只存要出队的元素
      var deQueueValue = this[_queue][this[_front]]
      // 出队不是真的把这个元素从数组中删除,而是把指针移动到下一位
      // 为了能看到效果,我们把出队的元素的位置值设置为null
      this[_queue][this[_front]] = null
      // 判断出对的指针是否指向了数组的最后面,如果是,则出队后指向0
      this[_front] = (this[_front] + 1) % this[_queue].length

      return deQueueValue
    }

    // 队头元素
    Queue.prototype.getTop = function () {
      // 返回出队的元素,如果为null表示当前队列为空
      return this[_queue][this[_front]]
    }
    // 查看队列元素
    Queue.prototype.view = function () {
      var result = this[_queue].filter(function (item) {
        return item !== null
      })
      return result
    }
    // 清空队列
    Queue.prototype.clear = function () {
      // 清空队列,就是重新初始化队列
      this[_queue] = new Array(this.size + 1)
      this[_front] = this[_rear] = 0
      return true
    }
    return Queue
  })()

  var queue = new Queue(4)
  console.log(queue.view()) // [empty × 5]
  console.log(queue.enQueue(1)) // true
  console.log(queue.enQueue(2)) // true
  console.log(queue.enQueue(3)) // true
  console.log(queue.enQueue(4)) // true
  console.log(queue.view()) // [1, 2, 3, 4, empty]
  //   console.log(queue.enQueue(4));
  console.log(queue.deQueue()) // 1
  console.log(queue.deQueue()) // 2
  console.log(queue.deQueue()) // 3
  console.log(queue.deQueue()) // 4
  console.log(queue.view()) // [null, null, null, null, empty]

  console.log(queue.isEmpty()) // true
  console.log(queue.isFull()) // false
  //   console.log(queue.deQueue());
  //   console.log((queue.size = 7));
  //   console.log(queue.size);
</script>
```

## 四、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 掌握`Object.defineProperty()`的用法
- 区分公有、私有、静态属性和方法
- 了解什么是栈，利用 JS 简单实现一个栈和队列

### 2、难点

- 利用 `Object.defineProperty` 实现数据驱动页面更新
- 手写多彩运动的小球
- 利用 JS 实现循环队列
