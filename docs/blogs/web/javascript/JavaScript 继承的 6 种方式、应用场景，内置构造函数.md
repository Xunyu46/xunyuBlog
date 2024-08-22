# JavaScript 继承的 6 种方式、应用场景，内置构造函数

本章节我们开始学习继承相关的内容，我们会从以下几个方面展开讲解

- 什么是继承
- JavaScript 实现继承的 6 种方式
  - 原型链实现继承
  - 借用构造函数（经典继承）
  - 组合继承
  - 原型式继承
  - 寄生式继承
  - 寄生式组合继承
- 常用的内置构造函数

## 一、什么是继承呢 ？

- 首先继承是一种关系，类（Class）与类之间的关系
- JS 中没有类,但是可以通过**构造函数模拟类**，然后通过原型来实现继承。
- 继承是为了**实现数据共享**，同时对于**实现代码的复用**非常有用

> 我们先来看下面两个类

![image-20220109134146856](https://www.arryblog.com/assets/img/image-20220109134146856.007dbee2.png)

解说

- `People`类拥有的属性和方法`Student`类都有，同时`Student`类还扩展了一些自已独有的属性和方法
- 我们可以按上图结构定义`People`类，然后再定义一个`Student`类，在`Student`类上只需要定义`People`类上没有的属性和方法。
- 然后用`Student`类**继承**`People`类，这样`Student`类就可以直接拥有`People`类的所有属性和方法了

> Student 类继承 People 类，在这个继承关系中
>
> - People 类称为”父类“（或 “超类”、“基类”）
> - Student 类称为“子类”（或 ”派生类“）
> - Student 子类可以访问 People 父类的所有属性和方法
> - Student " 是 一种" People ，两个继承类之间是`“is a kind of”`关系

继承描述了两个类之间的`“ is a kind of "关系`，也就是两个类之间存在`" is a kind of "`关系，就可以实现继承。

> 如下

| 父类   | 子类                                 |
| :----- | :----------------------------------- |
| 人类   | 学生类、医生类、教师类、...          |
| 动物类 | **狗类**、猫类、老虎类、**鸟类**     |
| 鸟类   | 鹦鹉类、麻雀类、猫头鹰类             |
| 狗类   | 二哈类、牧羊犬类、拉布拉多类、泰迪类 |

> 接下来，我们来学习下，如何实现类与类之间的继承关系。

JavaScript 实现继承有以下 6 种方式

- 原型链实现继承
- 借用构造函数（经典继承）
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生式组合继承

> **实现继承的关键在于：** 子类必须拥有父类的**全部公有（属性和方法）**，同时子类还应该能定义自己特有的属性和方法

## 二、通过原型链实现继承

接下来，我们来学习下，如何利用原型链实现 `Student`类 **继承** `People`类

![image-20220109134146856](https://www.arryblog.com/assets/img/image-20220109134146856.007dbee2.png)

### 1、原型链实现继承的本质

让子类构造函数的 prototype ，指向父类的一个实例

```js
// 子类 Student 父类 People
Student.prototype = new People()
// 以上原型链方式实现继承，Student 的实例，就可以访问 Popele类原型上的所有方法和属性
```

- 通过前面的学习我们知道，每个构造函数都有一个 prototype 属性，这个属性指向一个对象。
- 构造函数构造出来的实例对象，可以访问构造函数 prototype 属性上所有方法和属性。
- 如果 **`子类构造函数.prototype = 父类的实例`** ，那**子类的实例** 就可以通过原型链查找，访问到父类构造函数原型 prototype 上面的所有属性和方法。

### 1.1、Student 类继承 People 类关系图

![image-20220109160201709](https://www.arryblog.com/assets/img/image-20220109160201709.2355d950.png)

本质

原型链实现继承本质上是扩展了**原型的搜索机制**。

- 实例在访问某个属性时，会在自己身上找，找不到，就会去原型上找
- 原型上找不到，就会去**继承的实例的原型**上去找，一层层向上找，找到就不找
- 找不到就会一直找到原型链的终点（Object 原型的原型，为 null）

> Student 类 与 People 类 通过原型链实现继承，代码如下

```js
// 父类  人类
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}
People.prototype.sayHello = function () {
  console.log('我是' + this.name + '今年' + this.age + '岁，我是' + this.sex + '生')
}
People.prototype.sleep = function () {
  console.log(this.name + '开始睡觉了zzzzz')
}

// 子类  学生类
function Student(name, age, sex, scholl, sid) {
  this.name = name
  this.age = age
  this.sex = sex
  this.scholl = scholl
  this.sid = sid
}

// 实现继承   一定要先实现继承，再添加新的方法和属性
Student.prototype = new People()

Student.prototype.study = function () {
  console.log(this.name + '正在学习！')
}
Student.prototype.exam = function () {
  console.log(this.name + '正在考试，加油！！')
}

// 创建父类 实例
var laoliu = new People('老刘', 38, '男')
laoliu.sayHello()

// 创建子类实例
var cuihua = new Student('翠花', 18, '女', '雅礼中学', 20800)
cuihua.sayHello()
cuihua.study()
cuihua.exam()
cuihua.sleep()
```

![image-20221115224403914](https://www.arryblog.com/assets/img/image-20221115224403914.9f574ea4.png)

### 2、注意事项 1 - 重写父类方法

- 子类有时候需要覆盖父类的方法，或者增加父类没有的方法。这些方法必须在原型赋值之后再添加到原型上去。
- 子类覆盖父类上没有的方法，我们称为 **重写** （override）父类方法

```js
// 以下代码必需写在 Student.prototype = new People(); 之后
// 也可以重写（override）父类的 sayHello方法
Student.prototype.sayHello = function () {
  console.log('大家好，我是' + this.scholl + '学校的学生,我叫' + this.name)
}
```

### 3 、注意事项 2 - 子类的 constructor 指向问题

- 因为 `Student.prototype=new People()`
- 则`Student.prototype`中的`constructor`属性被重写为指向`People`
- 即`Student`的所有实例访问到的`constructor`都指向`People`

```js
Student.prototype.constructor === People // true
cuihua.constructor === People // true
```

### 4、注意事项 3 - instanceof

- instanceof 操作符确认 实例与构造函数的关系
- 如果实例的原型链中出现过对应的构造函数的原型，则实例为对应构造函数的实例

```js
cuihua instanceof Student // true
cuihua instanceof People // true
cuihua instanceof Object // true
```

### 5、注意事项 4

- 任意函数的**默认**`prototype`原型都是一个 Object 的实例
- 这就意味着函数的默认原型中有一个`__proto__`属性指向`Object.prototype`
- 这就为什么自定义类型能继承（访问）Object 原型上的`toString()`、`valueOf()`等方法的原型

```js
function People() {}
People.prototype.__proto__ === Object.prototype // true
new People().__proto__.__proto__ === Object.prototype // true
```

![image-20221115231512866](https://www.arryblog.com/assets/img/image-20221115231512866.c3c33618.png)

### 6、原型链实现继承的不足之一

- 如果原型中某个属性的值是**引用类型值**时,这个值会被所有实例共享。当实例修改这个属性值时，其它实例身上对应的这个属性值也被改变了
- 这也是为什么属性通常会在构造函数中定义，而不会定义在原型上的原因
- 原型链实现继承，子类的原型实际上变成父类的实例，则就意味父类实例身上的属性变成了子类原型属性
- 所有子类的实例都能访问这个属性

```js
// 超类 （父类）
function SuperType() {
  this.colors = ['red', 'blue', 'yellow']
  this.a = 2
}
// 子类
function subType() {}

subType.prototype = new SuperType()
var sub1 = new subType()
var sub2 = new subType()

sub1.a = 4 // 修改值，相当于重写属性（遮蔽效应）
console.log(sub1.a) // 4
console.log(sub2.a) // 2

sub1.colors.push('green') // 修改数组中值
console.log(sub1.colors) //  ['red', 'blue', 'yellow', 'green']
console.log(sub2.colors) // ['red', 'blue', 'yellow', 'green']
```

### 7、原型链实现继承的不足之二

子类在实例化时，不能给父类的构造函数传参。 也就意味着，子类不能应用父类已有的属性，而需要自己重写一份

```js
function Student(name, age, sex, scholl, sid) {
  this.name = name
  this.age = age
  this.sex = sex
  this.scholl = scholl
  this.sid = sid
}
```

## 三、借用构造函数（经典继承）

- 为了解决**子类原型中包含引用类型值**所带来问题和在**子类构造函数中不能给父类构造函数传参**的问题
- 开发人员通常使用一种叫做 **"借用构造函数"** 的技术，也被称为 **“伪造对象”** 或 **“经典继承”**

### 1、借用构造函数的基本思路

- 在子类构造函数内部调用父类的构造函数
- 但要注意使用`call`或`apply`方法将新创建的对象作为父类构造函数的上下文对象

```js
function People(name, sex, age) {
  this.name = name
  this.sex = sex
  this.age = age
  this.arr = [1, 2, 3]
}

function Student(name, sex, age, school, sid) {
  // 借用构造函数
  People.call(this, name, sex, age)
  this.school = school
  this.sid = sid
}

var cuihua = new Student('翠花', '女', 18, '雅礼中学', 20230106)
cuihua.arr.push('abc')
console.log(cuihua)
console.log(cuihua.arr)

var dandan = new Student('蛋蛋', '女', 19, '雅礼中学', 20231897)
console.log(dandan)
console.log(dandan.arr)
```

![image-20221116001801093](https://www.arryblog.com/assets/img/image-20221116001801093.f548efba.png)

### 2、借用构造函数实现继承的不足之处

- 如果采用借用构造函数的方式实现继承，是没有办法把父类原型上的方法继承过来，只能继承父类构造函数中的属性
- 如果要把父类上的方法继承过来，那父类的方法就必需定义在构造函数内部，之显然是不合理的

## 四、组合继承

- 将**原型链实现继承**和**借用构造函数实现继承**的技术组合到一起，这样就可以将两者的优点集中起来
- 这种继承方式，叫做 `"组合继承"` ，也叫作`"伪经典继承"`

### 1、组合继承的基本思路

- 使用原型链继承来实现继承父类原型上的属性和方法
- 借用构造函数来实现继承父类实例上的属性

> 这样就可以把父类的方法定义在原型上，实现重用。同时又可以让每个实例都有自己的属性。

```js
// 父类  人类
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  this.a = [1, 2, 3]
}
People.prototype.sayHello = function () {
  console.log('我是' + this.name + '今年' + this.age + '岁，我是' + this.sex + '生')
}
People.prototype.sleep = function () {
  console.log(this.name + '开始睡觉了zzzzz')
}

// 子类  学生类
function Student(name, age, sex, scholl, sid) {
  // 借用构造函数 实现继承
  People.call(this, name, age, sex)
  this.scholl = scholl
  this.sid = sid
}

// 借用原型链 实现继承
Student.prototype = new People()

Student.prototype.study = function () {
  console.log(this.name + '正在学习！')
}
Student.prototype.exam = function () {
  console.log(this.name + '正在考试，加油！！')
}

// 创建父类 实例
var laoliu = new People('老刘', 38, '男')
laoliu.sayHello()
laoliu.a.push('我是老刘的')
console.log(laoliu.a)

// 创建子类实例
var cuihua = new Student('翠花', 18, '女', '雅礼中学', 20800)
cuihua.sayHello()
cuihua.study()
cuihua.exam()
cuihua.sleep()
console.log(cuihua.a)
```

> 组合式继承是 JavaScript 中使用最多的继承模式。但也有不足之处。

### 2、组合继承的不足之处

组合继承最大的问题就是无论什么情况下，都会调用 **两次父（超）类的构造函数**

- 一次是在创建子类原型的时候，如

```js
Student.prototype = new People() // 调用父类构造函数
```

- 另一次是在子类构造函数的内部，如

```js
People.call(this, name, age, sex) // 调用父类的构造函数
```

子类原型中的`constructor`被丢失，当访问子类原型中的 constructor 时，其本质是通过原型链查找，最终查找到的是父类的构造函数

```js
Student.prototype.constructor === People // true
```

> 关于组合继承的不足之处如何解决，我们在后面会讲到

## 五、原型式继承

**重点强调**：原型式继承是一种不涉及严格意义上构造函数的继承方法

### 1、原型式继承适用场景

- 如果你有一个对象，想在它的基础上再创建一个新对象
- 现有对象 obj1，现希望在创建一个 obj2 对象，obj2 需要继承 obj1 实例身上的所有方法和属性

```js
var obj1 = {
  a: 1,
  b: ['A', 'B', 'C'],
  sum: function () {
    console.log(this.a + this.b)
  },
}
```

- obj2 要能继承 obj1 身上的所有方法和属性，则`obj2.__proto__`属性需要指向 obj1
- 我们知道`obj2.__proto__`指向的是`obj2`的构造函数的`prototype`，则说明`obj2`肯定是要用构造函数构造出来。
- 同时`obj2`的**构造函数**的`prototype=obj1`

```js
function Fn() {}
Fn.prototype = obj1
var obj2 = new Fn()
```

- 我们可以把上面的代码封装成一个函数，这个函数接受一个**参数**（原型指向的对象）
- 当我们调用这个函数时，就会创建出一个新的对象，同时这个对象的原型指向函数的参数。

```js
function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}
```

**原型式继承：完整版代码**

```js
var obj1 = {
  a: 1,
  b: ['A', 'B', 'C'],
  sum: function () {
    console.log(this.a)
    console.log(this.b)
  },
}

function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

var obj2 = createObject(obj1) // 以obj1为原型，创建一个新对象
var obj3 = createObject(obj1)
obj2.c = 3 // 新对象添加自已的属性
obj2.a = 4 // 重写原型上属性 a
console.log(obj2) // {c: 3, a: 4}
obj2.b.push('obj2新加')
obj2.sum() // 4  ['A', 'B', 'C', 'obj2新加']
obj1.sum() // 1 ['A', 'B', 'C', 'obj2新加']
```

注意事项

- 以上方法创建出来的多个对象会共享 原型上的引用类型属性
- 其中一个对象修改了这个引用类型中的值，相当于所有创建出来的对象上的这个属性值都改变了

### 2、Object.create 方法

- ECMAScript5 增加了`Object.create()`方法将原型式继承的概念规范化了
- `Object.create()`方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

**语法**

```js
Object.create(proto[,propertiesObject]);
```

- proto 为新创建对象的原型对象
- propertiesObject 可选参数，给新对象定义额外属性的对象。 他与 `Object.defineProperties()`的第二个参数一样，每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性

```js
var obj1 = {
  a: 1,
  b: ['A', 'B', 'C'],
  sum: function () {
    console.log(this.a)
    console.log(this.b)
  },
}

var obj2 = Object.create(obj1)
console.log(obj2.a) // 1
var obj3 = Object.create(obj1, {
  b: {
    value: 4,
  },
})
console.log(obj3) // {b:4}
console.log(obj3.b) // 4
```

### 2.1、注意事项

`Object.create(proto)`中的 proto，只能是 `null` 或 `对象类型`，否则会抛出`TypeError`异常

```js
Object.create(1) // 报错
Object.create(new Object(1)) // 不报错
Object.create(undefined) // 报错
Object.create(function () {}) // 不报错
```

`Object.defineProperties(newObj,propertiesObject)`中的第二个参数，不能是`null`和`undefined`，字符串，否则会报错。实际上只要这里传的不是一个对象，就没有意义

```js
var obj = {}
Object.defineProperties(obj, null) // 报错
Object.defineProperties(obj, undefined) // 报错
```

### 3、手写 Object.create 方法（经典面试题）

- 面试中经常会要求我们手写 `Object.create` 方法
- 当`Object.create()`只有一个参数时，其作用与上面我们自已封装的`createObject()`方法效果一样，所以我们只需要在`createObject`的基础上来完善第二个参数的相关功能等

**完善的功能：**

- 判断传入的`proto`是否为`对象`或`null`
- 利用`Ojbect.defineProperties(newObj,propertiesObject)`来实现第二个参数功能
- 同时要判断 `propertiesObject` 是否是一个对象

```js
Object._create = function (proto, propertiesObject) {
  // proto只能是null 或 对象
  if (proto !== null && !(proto instanceof Object))
    throw new TypeError('proto只能是null或者对象,不能是其它类型')

  // 实现原型式继承
  function Fn() {}
  Fn.prototype = proto
  var obj = new Fn()

  // 给新对象添加属性，只要当前属性不是对象，就没有意义
  propertiesObject instanceof Object && Object.defineProperties(obj, propertiesObject)

  return obj
}
```

**实践应用**

```js
var obj = {
  name: '张三',
}

var obj2 = Object._create(obj, {
  age: {
    value: 12,
    writable: true,
    enumerable: true,
  },
})

console.log(obj2) // {age:12}
console.log(obj2.name) // 张三
console.log(obj2.age) // 12
for (var key in obj2) {
  console.log(obj2[key]) //  张三  12
}
obj2.age = 22
console.log(obj2.age) // 22
```

### 3、原型式继承注意事项

注：

- **适用场景：** 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合
- **注意事项：** 如果原型对象的属性包含引用类型值时，所有以这个对象为原型创建的新对象的这个属性指向的是堆内中的同一个内容

## 六、寄生式继承

**寄生式继承的实现思路：** 编写一个函数，它接收一个参数 O，返回以 O 为原型的新对象 p，同时给 p 添加了一些预置的新方法

新对象相当于是寄生在原来的对象上，然后又添加了一些自己的新方法，所以称为 **“寄生式继承”**

```js
// 创建一个对象
var ball = {
  color: 'red',
  r: 20,
  opacity: 1,
}

// 创建一个函数，实现增强某个对象，实现寄生式继承
function enHanceObject(o) {
  // 以o为原型，创建出一个新对象
  var obj = Object.create(o)
  // 为新创建的对象添加一些预置的方法，用来增强对象
  obj.changeColor = function () {
    this.color = 'blue'
    console.log('我已经将颜色变成' + this.color)
  }
  // ....可以为新对象添加更多的预置方法
  return obj
}

var ball2 = enHanceObject(ball)
console.log(ball2)
console.log(ball2.r)
ball2.changeColor()
```

![image-20221117162352082](https://www.arryblog.com/assets/img/image-20221117162352082.64e0014e.png)

注：

- **寄生式继承**相当于一个小工厂，他接受一个参数，然后返回一个新的对象
- **寄生式继承适用场景**：主要关注的是对象，而不在乎类型和构造函数的场景
- **注意事项：** 寄生式继承给新对象添加的函数是没有办法实现重用的。每创建一个新对象身上都会独有一份预置的方法

## 七、寄生式组合继承

在前面学习的组合继承中也存在以下不足之处

### 1、组合继承不足之处

组合继承最大的问题就是无论什么情况下，都会调用两次父（超）类的构造函数。一次是在创建子类原型的时候 ，另一次是在子类构造函数的内部

```js
Student.prototype = new People() // 创建子类原型时，调用父类构造函数

People.call(this, name, age, sex) // 在子类的构造函数内部，调用父类的构造函数
```

- 子类原型中的`constructor`被丢失，当访问子类原型中的 constructor 时，其本质是通过原型链查找，最终查找到的是父类的构造函数

```js
Student.prototype.constructor === People // true
```

在接下来学习的寄生式组合继承中，就能解决上面的两大问题

### 2、寄生式组合的基本思路

- **借用构造函数实现继承父类属性：** 在子类的构造函数中调用父类的构造函数来实现继承父类属性
- **混合式原型链，实现继承父类原型上方法**：以父类的原型对象为原型，来创建出一个新的对象。让子类的原型指向新创建出来的对象。解决了不用再次调用父类构造函数，同时父类构造函数中的属性也不会成为原型的属性
- **修正子类构造函数的 constructor 属性的指向：** 把新创建对象中的`constructor`指向子类的构造函数。解决了原型中`constructor`丢失问题，同是修正了子类构造函数中的 constructor 指向子类构造函数

![image-20221117182834399](https://www.arryblog.com/assets/img/image-20221117182834399.e5dddec4.png)

> 以下图把 prototype 隐藏的 Fn 构造函数绘制出来了

![16710318727342.png](https://www.arryblog.com/assets/img/16710318727342.62a07a7d.png)

```js
// 父类  人类
function People(name, age) {
  this.name = name
  this.age = age
}

People.prototype.sayHello = function () {
  console.log('大家好，我是' + this.name + '今年' + this.age + '岁了')
}

// 子类  学生类
function Student(name, age, scholl, sid) {
  People.call(this, name, age)
  this.scholl = scholl
  this.sid = sid
}

// 寄生式组合继承
// 以 People的原型为原型，创建一个新对象
var prototype = Object.create(People.prototype)
// 更改prototype中的constructor指向
prototype.constructor = Student
// 将新创建的prototype对象，赋值给Student.prototype
Student.prototype = prototype

// 子类原型上对象上添加新方法
Student.prototype.exam = function () {
  console.log(this.name + '正在考试')
}

var cuihua = new Student('翠花', 13, '高新中学', 'A0001')
var laoliu = new Student('老刘', 20, '北京大学', 'SD0001')
console.log(cuihua)
cuihua.sayHello()
cuihua.exam()
console.log(laoliu)
laoliu.sayHello()
laoliu.exam()
```

温馨提示：

继承的代码要写在给子类原型添加新方法的前面，否则子类在原型上新添加的方法会被覆盖

### 3、封装函数 - 寄生式组合继承

```js
/**
 * 寄生式组合继承
 * subType子类
 * superType 超类（父类）
 */
function inheritPrototype(subType, superType) {
  // 以父类的原型为原型，创建一个新对象
  var prototype = Object.create(superType.prototype)
  // 新对象的constructor指向子类的构造函数
  prototype.constructor = subType
  // 子类的原型指向新创建的对象
  subType.prototype = prototype
}
// 父类  人类
function People(name, age) {
  this.name = name
  this.age = age
}

People.prototype.sayHello = function () {
  console.log('大家好，我是' + this.name + '今年' + this.age + '岁了')
}

// 子类  学生类
function Student(name, age, scholl, sid) {
  People.call(this, name, age)
  this.scholl = scholl
  this.sid = sid
}

// 寄生式组合继承
inheritPrototype(Student, People)

// 子类原型上对象上添加新方法
Student.prototype.exam = function () {
  console.log(this.name + '正在考试')
}

var cuihua = new Student('翠花', 13, '高新中学', 'A0001')
var laoliu = new Student('老刘', 20, '北京大学', 'SD0001')
console.log(cuihua)
cuihua.sayHello()
cuihua.exam()
console.log(laoliu)
laoliu.sayHello()
laoliu.exam()
```

## 八、JavaScript 6 种继承方式的实现原理、优缺点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

| 继承方式       | 实现原理                                                                                                                                                   | 继承的对象 | 优缺点                                                                         |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------- |
| 原型链实现继承 | 子类的原型指向父类的实例 `子类.prototype=new 父类()`                                                                                                       | 类与类     | 不能实现属性的复用，同时父类的属性中有引用类型，则所有子类的实例共享这个属性值 |
| 借用构造函数   | 子类构造函数中调用父类构造函数 `父类.call(this,参数)`                                                                                                      | 类与类     | 不能实现方法的继承                                                             |
| 组合式继承     | 将原型链实现继承和借用构造函数实现继承组合一起使用                                                                                                         | 类与类     | 两次调用父类的构造函数，也因此造成子类原型上多了一份无用的属性                 |
| 原型式继承     | 利用`Object.create()`实现以 obj 对象为原型，创建出一个新的对象 newObj,同时可以给新创建的对象添加新的属性 `var newObj=Object.create(obj，propertiesObject)` | 对象与对象 | 如果原型对象上有引用数据类型，则所有新创建的对象共享同一个属性值               |
| 寄生式继承     | 以 obj 为原型，创建出一个新的对象，同时为新创建的对象添加一个预置的方法                                                                                    | 对象与对象 | 给新对象添加的函数是没有办法实现重用的                                         |
| 寄生式组合继承 | 将借用构造函数与原型式继承组合在一起来使用 以父类的原型为原型创建出一个新对象，同时将新对象的 constructor 指向子类，再将新对象作为子类的原型。             | 类与类     | 完美解决类与类之间的继承                                                       |

## 九、内置构造函数

> 在学习内置构造函数前，我们先来了解下 JS 中对象的分类，JS 对象分为以下 3 大类

| 类别       | 描述                                                                                                                                                                                                                                                                                                                                                      |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 内部对象   | JS 中的内部对象很多包括但不限于以下 常用构造函数（对象）：Object、Function、Array 包装类（对象）：String、Boolean、Number Date 日期类、RegExp 正则表达式 错误处理类：Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError 内置对象：Global、Math                                                                                |
| 宿主对象   | 宿主对象就是执行 JS 脚本的环境提供的对象 对于嵌入到网页中的 JS 来说，其宿主对象就是浏览器提供的对象，所以又称为**浏览器对象** 不同的浏览器提供的宿主对象可能不同，即使提供的对象相同，其实现方式也大相径庭！这会带来浏览器兼容问题，增加开发难度 浏览器对象有很多，所有的 BOM 和 DOM 都是宿主对象，如`Window`、`Document`，`Element`，`Form`，`Image`等等 |
| 自定义对象 | 就是开发人员自己定义的对象                                                                                                                                                                                                                                                                                                                                |

注：

我们接下来要学习的内置构造函数，指的就是内部对象中的相关对象

> 内置构造函数非常有用，所有该类型的方法都是定义在它的内置构造函数的 prototype 上的，我们可以给这个对象添加新的方法，从而拓展某类型的功能。

**内置构造函数**

- 常用构造函数：Object、Function、Array
- 包装类：String、Boolean、Number
- Date 日期类、RegExp 正则表达式
- 错误处理类：Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError
- ......还有更多，在后面慢慢介绍

**内置对象**

- Global 对象，全局对象
- Math 对象

> 这两个对象在脚本程序初始化时被创建，不必实例化这两个对象。即不用 new 来调用

### 1、常用构造函数

- 关于 Array、Function、Object 三个构造函数，我们在之前就有接触过，特别是 Array 构造函数。
- 这三个构造函数身上有那些：静态属性、静态方法、实例属性、实例方法大家可以参考 MDN 官方文档来复习。

> 在后期的课程中，我们会慢慢的来学习这些构造函数身上的方法和属性

| 构造函数 | MDN 官方地址                                                                                                                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array    | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)       |
| Function | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) |
| Object   | [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)   |

> 接下来，我们来复习下这三个构造函数的继承关系和原型链

![image-20221117203604374](https://www.arryblog.com/assets/img/image-20221117203604374.1fa2cd75.png)

### 2、Object 构造函数

- Object 构造函数用来构造对象，所有对象都是 Object 的实例

```js
{}.__proto__===Object.prototype; // true
```

- Object 的原型也是一个对象，按理来说`Object.prototype.___proto__===Object.prototype`，但显然是不合理的。实际 Object 原型的原型指向原型链的终点，即 null

```js
Object.prototype.__proto__ === Object.prototype // false
Object.prototype.__proto__ === null // true;
```

- Object 构造函数也是函数，所以 Object 也是 Function 构造函数的实例

```js
Object.__proto__ === Function.prototype // true
```

- 所以 Object 可以打点调用 Function 原型上的方法

```js
'call' in Object // true
'bind' in Object // true

Object.call({ a: 1, b: 2 }) // {}
```

### 3、Array 构造函数

- Array 构造函数，用来构造数组，所有数组都是 Array 的实例

```js
;[].__proto__ === Array.prototype // true
```

- Array.prototype 是一个对象，所以 Array.prototype 也是 Object 的实例

```js
Array.prototype.__proto__ === Object.prototype
```

- Object 原型的原型为原型链的终点,即 null

```js
Array.prototype.__proto__.__proto__ === null // true
```

- Array 构造函数也是函数，所以 Array 也是 Function 构造函数的实例

```js
Array.__proto__ === Function.prototype // true
```

### 4、Function 构造函数

- Function 构造函数用来构造函数，所有函数都是 Function 的实例

```js
var fn = function () {}
fn.__proto__ === Function.prototype // true
```

- Function 构造函数也是一个函数，所以下面这种特殊情况也成立

```js
Function.__proto__ === Function.prototype // true
```

## 十、重难点

- **重点：** 掌握寄生式组合继承的写法
- **难点：** 手写 `Object.create()` 方法
