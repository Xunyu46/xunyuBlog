# JavaScript 面向对象，原型和原型链

从本节课开始，我们将学习 JS 中的面向对象，我们会从以下几个方面来展开讲解

- 对象的基本概念
- 对象的创建
- 对象属性和方法操作
- 对象的遍历
- 对象的深克隆与浅克隆
- this 关键字
- 构造函数与类
- 原型与原型链
- 对象相关的经典面试题

## 一、对象的基本概念

首先我们需要了解就是，什么是对象，我们从以下两个角度来理解什么是对象

- 现实生活
- Javascript 语言

### **1、现实生活角度-理解对象**

- 在现实生活中，万物皆对象，对象是一个具体的，看得见摸得着的实实在在存在的实物。
- 如：一个苹果，一本书，一个杯子，一个人等，这些实实在在存在颜的实物，就是一个对象。
- 一个对象有两个重要的组成部分：**属性**、**功能**

| 属性                                                                         | 功能                                                 |
| :--------------------------------------------------------------------------- | :--------------------------------------------------- |
| 可以简单理解为一个对象的特征和外观等，如：形状、颜色、气味、大小、重量、味道 | 可以简单的理解为一个对象功能和行为等，他能用来做什么 |

> 我们来看下面这些对象，他们有那些属性和功能

|      | 手机                                 | 人                                     | 彩球                         |
| :--- | :----------------------------------- | :------------------------------------- | :--------------------------- |
| 属性 | 品牌名、尺寸，颜色、重量、材质       | 肤色、身高、体重、年龄、姓名、身份证号 | 大小、颜色、半径、形状、材质 |
| 功能 | 打电话、发短信、看电影、购物、打人等 | 唱歌、跳舞、跑步、做饭等               | 运动、变色、装鉓、打人等     |

### 2、JavaScript 语言角度-理解对象

在 JavaScript 中

对象是由一组无序的相关属性和方法的集合。

JS 中的对象，本质就是用代码来模拟现实生活中的对象，他由**属性**和**方法**两个部分组成。

- 对象属性与现实生活中对象的属性是对应
- 对象方法与现实生活中对象的功能是对应

> 比如，我们要在 JS 中定义一个手机对象，我们可以写成如下：

```js
// 定义了一个手机对象
var phone = {
  brand: '苹果', // 品牌名
  size: '5.8英寸', // 手机尺寸
  color: '黑色', // 颜色
  weight: '100g', // 重量
  quality: '铝合金', // 材质
  ringUp: function () {
    console.log('打电话') // 方法：打电话
  },
  playMovie: function () {
    console.log('播放电影') // 方法： 播放电影
  },
  // 更多方法省略......
}
```

### 3、为什么需要对象

- 前面我们学过变量和数组，如果要保存一个基本数据类型的值，我们可以用变量来保存; 如果要保存一且具有相关性的值和数据，我们可以用数组;
- 但如果要保存一个完整的对象（比如人）的信息？显然变量是不可行的，那数组呢？

> 我们来尝试下，如果用数组来保存一个人信息

```js
var person = ['小明', '女', '45', '45', '128']
```

- 显然，数组保存一个对象的信息是非常不直观，而且混乱的，根本不知道每一项中的值是代表什么，只能猜。

> 我们来看下,如果用对象的形式来保存一个人的信息呢？代码如下：

```js
var person = {
  name: '小明',
  sex: '女',
  age: 45,
  weight: 45,
  height: 128,
}
```

> 对象的形式保存数据，非常直观和清淅，很明确的知道每一项保存的是什么信息。

通过前面的学习

已经对对象有一定的认知，如果在 JS 中没有对象，那我们在 JS 中是没有办法保存一个完整的对象相关的信息的。

> 那接下来就让我们一起来学习，如何在 JS 中创建对象和使用对象吧 ！

## 二、对象的创建

在 JS 中创建一个对象有以下三种方式：

- 利用**字面量**方式，创建一个对象
- 利用 **new Object()** 方式，创建对象
- 利用**构造函数**方式，创建一个对象

### 1、字面量方式创建对象

> 字面量方式创建一个对象，其语法如下：

```js
// 对象的抽象写法
var obj = {
	key:value,
	key:value,
     ....
}

// 创建一个对象
var obj = {
    name:'小明', // 属性
    age:23,  // 属性
    sing:function(){  // 方法
        console.log('我在唱歌')
    }
}

// 创建一个空对象 对象中没有任何属性和方法
var obj = {};
```

语法解读

- `{}`表示的就是一个对象，我们把这个对象赋值给到一个变量，我们后面通过变量来访问这个对象。

- ```
  {}
  ```

  括号里面表达了对象的属性和方法，对象的属性和方法，是以键值对的形式来书写的

  - `key: value;`键值对形式， `key`表示属性名，`value`表示属性值，即： `name: '小明'`
  - name、age 就是对象的属性
  - sing 是对象的方法，其实他也是对象属性，不过一个属性的值如果是一个函数，我们把这个属性称为对象的**方法**

- 属性的值，可以是任意的数据类型

- 每个属性之间用`,`逗号隔开

- 最后一个属性`,`逗号不写

### 2、对象中属性名规范

- 如果对象的属性名符合**JS 标识符命名规范**，则属性名不需要加双引号
- 否则就需要用 `“”` **双引号** 或`''`**单引号**包裹起来

**标识符命名规范：** 只能以字母，数字，`_`下划线，`$`组成，但不能以数字开头

```js
//定义了一个变量，并给这个变量赋值了一个对象
var person = {
  name: '张三',
  sex: '男',
  hobby: ['游泳', '健身', '阅读'],
  say: function () {
    console.log('大家好，我是' + this.name)
  },
  'to-sleep': function () {
    // to-sleep命名不符合标识符命名规范，则用''包裹
    console.log('我要睡觉了')
  },
}
```

- 对象中的属性名，如果是一个变量，则必需用`[]`的方式来书写

```js
var name = 'myname'
var user = {
  [name]: '清心',
  ['age']: 18, // 注意这里，age是一个字符串，不是一个变量
  sex: '女',
  hobbies: ['篮球', '画画', '阅读', '编程'],
}
console.log(user.myname) // 清心
console.log(user[name]) // 清心

console.log(user.age) // 18
```

### 3、创建一个对象

接下来，我们使用字面量方式，创建一个对象（模拟人），他有以下属性和方法

| 属性             | 方法     |
| :--------------- | :------- |
| 姓名、性别、爱好 | 自我介绍 |

```js
// 定义了一个变量，并给这个变量赋值了一个对象
var person = {
  name: '张三',
  sex: '男',
  hobby: ['游泳', '健身', '阅读'],
  selfIntroduction: function () {
    console.log('大家好，我是' + this.name)
  },
}
```

> `name、sex、hobby` 表示的是对象的属性 ; `selfIntroduction` 表示对象的方法

记住这句话：

JS 中的对象，本质就是用代码来模拟现实生活中的对象，他由**属性**和**方法**两个部分组成。

## 三、对象属性的操作

如何访问对象中的属性，添加或修改对象属性值，删除对象属性等对象属性的基本操作

### 1、访问对象中的属性

- 我们可用对象打点的方式来访问对象中的属性，即：`对象.属性名`

```js
// 创建了一个对象
var user = {
  name: '清心',
  age: 18,
  sex: '女',
  hobbies: ['篮球', '画画', '阅读', '编程'],
}

// 对象打点访问对象中的属性值
console.log(user.name) // 清心
console.log(user.age) // 18
console.log(user.sex) // 女
console.log(user.hobbies) // ["篮球", "画画", "阅读", "编程"]
```

- 如果属性名**不符合 JS 标识符命名规范**，则必须用方括号的写法来访问，即： `对象['属性名']`
- `[]`方括中的属性名，必需用`''`单引号或`""`双引号包裹

```js
var user = {
  name: '清心',
  age: 18,
  sex: '女',
  'my-hobbies': ['篮球', '画画', '阅读', '编程'],
}

// 不符合标识符命名规范，就必须用方括号访问属性
console.log(user['my-hobbies']) // ["篮球", "画画", "阅读", "编程"]
```

- 如果属性名以变量的形式存储，则可以使用方括号的形式访问，即 ：`对象[变量名]`

```js
var user = {
  name: '清心',
  age: 18,
  sex: '女',
  hobbies: ['篮球', '画画', '阅读', '编程'],
}
var key = 'name'
console.log(user[key]) // 清心
```

- 如果访问对象中，不存在的属性，不会报错，其值为 undefined

```js
// 定义一个对象 dog
var dog = {
  name: '小黑',
  'skin-color': '黑色',
}
console.log(dog.age) // undefined
```

### 2、添加或修改对象属性值

- 我们通过 `对象.属性名 = 属性值` 或 `对象[属性名] = 属性值`的方式来添加或修改对象的属性值
- 如果属性名不存在，则为对象添加属性
- 如果属性名存在，则相当于修改属性的值。

```js
// 定义一个对象 dog
var dog = {
  name: '小黑',
  'skin-color': '黑色',
}

dog.name = '小红' // 修改属性值
dog['skin-color'] = '红色' // 修改属性值

dog.age = 10 // 给对象添加属性
console.log(dog) // {name: '小红', skin-color: '红色', age: 10}
dog.age++ // 修改属性值
console.log(dog) // {name: '小红', skin-color: '红色', age: 11}
dog['weight'] = '10kg' // 添加属性
console.log(dog) // {name: '小红', skin-color: '红色', age: 11, weight: '10kg'}
```

### 3、删除对象属性

- 如果要删除某个属性，则使用`delete obj.属性`

```js
// 创建一个对象
var dog = {
  name: '小黑',
  'skin-color': '黑色',
  age: 18,
}
delete dog.name // 删除属性
delete dog['skin-color'] // 删除属性
console.log(dog) // {age: 18}
```

## 四、对象方法的操作

- 如果对象的某个属性值是一个函数，则我们把他称为**对象的方法**
- 我们采用 `对象.属性名()` 或 `对象[属性名]()` 的方式来调用对象的方法

### 1、方法的调用

```js
var user = {
  name: '清心',
  age: 18,
  sayHello: function () {
    console.log('大家好，我是清心，永远18岁 ！')
  },
  'to-sleep': function () {
    console.log('我正在睡觉')
  },
}
user.sayHello() // 大家好，我是清心，永远18岁 ！
user['to-sleep']() // 我正在睡觉
```

> 对象方法的修改，新增、删除和属性的操作方法是一样，不过我们一般不会对一个对象的方法去做这些操作。

### 2、方法和函数的关系

- **方法也是函数**，只不过方法是对象的 **"属性"** ，它需要用对象打点调用等方式调用
- 我们之前讲的 `Math.random()`随机函数，本质上 random 就是 Math 对象上的一个方法

## 五、对象的遍历

- 我们使用`for....in ....`循环来遍历对象
- 使用`for...in...`循环可以遍历对象的每个`键`
- `for...in...`只能遍历对象的**非符号键属性**

**for...in...循环语句语法**

```js
// obj 要遍历的对象
// key 循环变量，它会依次成为对象的每一个键
// key 可以换成符何标识符，只是在长期的习惯中，大家习惯用key来表示对象的键，用来遍历
for (var key in obj) {
  console.log('对象obj的属性' + key + '的值是：' + obj[key])
}
var user = {
  name: '清心',
  age: 18,
  sayHello: function () {
    console.log('大家好，我是清心，永远18岁 ！')
  },
  'to-sleep': function () {
    console.log('我正在睡觉')
  },
}
for (var key in user) {
  console.log('对象user的属性' + key + '的值是：' + user[key])
}
```

![image-20220929203404924](https://www.arryblog.com/assets/img/image-20220929203404924.c934965d.png)

- `for...in...`只能遍历对象的**非符号键属性**

```js
var s = Symbol('符号属性')
var obj = {
  a: 1,
  b: 2,
  c: 3,
  [s]: '我用for-in无法遍历', // 符号属性
}
for (var key in obj) {
  console.log(key + ':' + obj[key])
}
```

![image-20220929204505170](https://www.arryblog.com/assets/img/image-20220929204505170.eebd8c27.png)

- 数组也是一个对象，他的属性名就是对引的索引下标 0,1,2.... 他也可以用 for...in 遍历

```js
var arr = ['A', 'B', 'C', 'D']
for (var key in arr) {
  console.log(key) // 0 1 2 3
  console.log(arr[key]) // A B C D
}
```

## 六、对象的深克隆与浅克隆

我们之前讲过基本数据类型和引用数据类型在内存中的存储方式是不同的，其在赋值时也是的不同。

> 我们先来复习下

| 数据类型     | 举例                                                  | 变量中存储内容   | 赋值                   | `==`和`===`比较时                  |
| :----------- | :---------------------------------------------------- | :--------------- | :--------------------- | :--------------------------------- |
| 基本数据类型 | 数字型、字符串型、布尔型、null 空类型、undefined 类型 | 变量中存的是值   | 把值复制一份，来赋值   | == 比较值是否相等 === 比较值和类型 |
| 引用数据类型 | 对象、数组、函数                                      | 变量中存的是地址 | 把地址复制一份，来赋值 | == 和 === 比较的都是地址           |

- 基本数据类型，赋值 和 == 、=== 比较

```js
// 基本数据类型
var a = 10
var b = a
a = 20
console.log(a, b) // 20 ,10

// == 和 ===比较
console.log('5' == 5)
console.log('5' === 5)
```

- 引用数据类型，赋值 和 == 、=== 比较

```js
var arr1 = [1, 2, 3]
var arr2 = arr1
arr1[0] = 'A'
console.log(arr1) // ['A', 2, 3]
console.log(arr2) // ['A', 2, 3]

// == 和 === 比较
console.log(arr1 == arr2) // true
console.log(arr1 === arr2) // true
console.log([1, 2] == [1, 2]) // false
console.log([1, 2] === [1, 2]) // false
```

### 1、对象是引用类型

对象是引用类型值，这意味着：

- 不能使用`var obj2 = obj1`这样的语法克隆一个对象
- 使用`==` 或 `===` 进行对象的比较时，比较的也是两个对象是否指向堆内存中的同一个地址

**对象 == 或 ===比较时**

```js
// 案例一
var obj1 = {
  a: 1,
  b: 2,
  c: 3,
}
var obj2 = {
  a: 1,
  b: 2,
  c: 3,
}

console.log(obj1 == obj2) // false
console.log(obj1 === obj2) // false

console.log({} == {}) // false
console.log({} === {}) // false
```

**对象赋值**

> 对象赋值，本质也是把对象存在栈内存中的地址赋值给另一个变量

```js
var obj1 = {
  a: 1,
  b: 2,
}
var obj2 = obj1
obj2.a = 'A'
console.log(obj1) // {a: 'A', b: 2}
console.log(obj2) // {a: 'A', b: 2}
```

### 2、对象的浅克隆

- 对象的浅克隆，本质也就是只能克隆对象的第一层
- 我们创建一个新的空对象 obj1，然后遍历现在的对象 obj，把对象的属性全部遍历出来，添加 obj 中

```js
// 用来克隆的对象
var obj = {
  a: 1,
  b: 2,
  c: ['你', '我', '他'],
}

// 被克隆后的对象
var obj1 = {}
// 浅克隆对象
for (var key in obj) {
  obj1[key] = obj[key] // 赋值
}

obj1.a = 'A'
console.log(obj)
console.log(obj1)

console.log(obj1.c == obj.c) // true
obj1['c'].push('哈哈')
console.log(obj)
console.log(obj1)
```

![image-20220929211831786](https://www.arryblog.com/assets/img/image-20220929211831786.5d565735.png)

### 3、对象的深克隆

- 深克隆：就是克隆对象的所有，不论对象的属性值是否是引用类型，都能将它们实现克隆
- 深克隆后原对象与克隆后的对象，克隆出来后长的一样，但本质两者都互相独立，互不干扰。

> 以下对象克隆，只考对象`{}` 、数组`[]`、函数、基本数据类型，其它 es6 相关的类型暂时不考虑

**递归实现深克隆**

判断传过来的数据类是数组，还是对象，还是其它数据类型

```js
// 传入一个对象，深克隆一个对象出来
// 如果传入的是基本数据类型，直接返回
function deepClone(obj) {
  var result // 克隆后的结果对象
  if (Array.isArray(obj)) {
    // 如果传过来的是数组
  } else if (Object.prototype.toString.call(obj) == '[object Object]') {
    // 如果传过来的是数组
  } else {
    // 传过来的值是其它基本数据类型

    return obj
  }
  // 返回克隆的对象
  return result
}
```

- 分别处理如果传过的数组和对象两种情况

```js
function deepClone(obj) {
  var result
  if (Array.isArray(obj)) {
    // 如果传过来的是数组
    result = []
    // 遍历数组中的元素，如果是基本类型，直接添加到数组中，如果不是再递归
    obj.forEach(function (el) {
      result.push(deepClone(el))
    })
    console.log('数组')
  } else if (Object.prototype.toString.call(obj) == '[object Object]') {
    // 如果传过来的是对象
    result = {}
    // 遍历对象中的元素，如果是基本类型，直接添加到对象中，如果不是再递归
    for (k in obj) {
      result[k] = deepClone(obj[k])
    }
  } else {
    // 传过来的值是其它基本数据类型
    return obj
  }
  // 返回克隆的对象
  return result
}
```

## 七、this 关键字

- 在函数那一章节，我提到函数内部有一个特殊的对象 arguments，他是一个类数组，用来表示它接收到的实参列表
- 今天我们再来学习函数内部一个特殊的对象 this

### 1、this 是什么

在函数中，其内部`this`指向把函数当成方法调用的**上下文对象**

**什么是上下文 ？**

**这** 是非常好的习惯，值得表扬。

> 以上这句话，看上去有些摸不着头脑，因为这句话第一个字有一个 "这" ，这个字是一个代词。
> “这是非常好的习惯，值得表扬。”，但这句话并没有详细的说明到底什么是非常好的习惯，到底什么事情是值得表扬的。因此，这句话如果单独给我们看，就会给我们造成很大的困扰。
> 进一步来看，”这“ 字是应该有前言后语的，通过前言后语我们才能清楚的知晓它所要表达的意思。

如以下表达方式：

**垃圾分类**，**这**是非常好的习惯，值得表扬。
**随手关灯**，**这**是非常好的习惯，值得表扬。
**遛狗栓绳**，**这**是非常好的习惯，值得表扬。
**课后复习**，**这**是非常好的习惯，值得表扬。
**早睡早起**，**这**是非常好的习惯，值得表扬。

> - 以上补充完前边的部分后，这五个**这**字就会变得显而易见
> - 因此，这里的 **“这”** 字，就是这个语句的上下文。
> - 就是说 **“这”** 这个代词的意思是需要通过这条中文语句的前言后语来判断

总结一句话：

- `this`指向把函数当成方法调用的**上下文对象**，即谁来调用这个**函数**或**方法**，当前函数或方法体内的`this`就指向谁。
- 所以 this 的指向在定义时是不确的，只有在调用的时候才能被确定

接下来，我们来看下面几个不同场景下，函数内部的 this 指向

- 函数作为普通函数直接调用
- 函数作为对象的方法被调用
- `函数.call()` 与 `函数.apply()`方式调用
- 函数作为构造器被调用

### 2、函数作为普通函数直接调用

- `函数名()` 的方式调用函数，其本质是`window.函数名()` 的方式在调用函数
- 所以这种方式调用函数，函数内部的 this 指向`window` 。 **谁调用函数，this 就是谁**

> 所有全局作用域下的声明的变量和函数，都是 window 对象的属性

```js
var a = 10
var b = 20
function sum() {
  return this.a + this.b
}
console.log(sum())
```

![image-20220929220801813](https://www.arryblog.com/assets/img/image-20220929220801813.f34b8e2b.png)

### 2.1、IIFE 立即执行函数

> 立即执行函数，本质也是 window 对象调用的，所以其内部 this 指向 window

```js
var a = 10
var b = 20
;(function () {
  console.log(a + b) // 30
  console.log(this) // window
})()
```

### 3、函数作为对象的方法被调用

> 函数作为对象的方法被调用，this 指向这个对象，**谁调用函数，this 就是谁**

```js
// 定义一个对象
var dog = {
  name: '小黑',
  'skin-color': '黑色',
  say: function () {
    console.log('我叫' + this.name + '，因为我的毛是' + this['skin-color'])
    console.log(this)
  },
}
dog.say() //  this 是 dog对象
var say2 = dog.say
say2() // this 是 window对象
```

![image-20220929221206089](https://www.arryblog.com/assets/img/image-20220929221206089.e2e65912.png)

- 当代码执行到 `var say2 = dog.say` 时，本质是把函数当做值赋给了变量 say2，即

```js
var say2 = function () {
  console.log('我叫' + this.name + '，因为我的毛是' + this['skin-color'])
  console.log(this)
}
```

> 所以往后执行 `say2()` 时，本质是 window 对象调用了这个函数。

### 3.1、数组`[下标]()`

- 数组（类数组对象）枚举出函数进行调用，this 指向的是这个数组（类数组对象）
- **谁调用函数，this 就是谁**

```js
var arr = [
  'A',
  2,
  3,
  function () {
    console.log(this[0])
  },
]
arr[3]() // A 这里 函数是数组身上的一个属性
console.log(arr) //
var fn = arr[3]
fn() // undefined  这里的this是window
```

![image-20220929224542369](https://www.arryblog.com/assets/img/image-20220929224542369.9251f73e.png)

### 3.2、测试题

```js
var obj1 = {
  a: 1,
  b: 2,
  sum: function () {
    return this.a + this.b
  },
}
var obj2 = {
  a: 3,
  b: 4,
  sum: obj1.sum, // 这里只是完成简单的赋值操作
}

console.log(obj2.sum()) // 7
function add() {
  var a = 1,
    b = 2
  return {
    // 将对作为返回值，返回
    a: 10,
    b: 20,
    sum: function () {
      return this.a + this.b
    },
  }
}
console.log(add().sum()) // 30
var a = 1
var b = 2
function add() {
  return this.a + this.b
}
var obj = {
  a: 10,
  b: add(), // this是window  得出结果是 3
  sum: add,
}
var result = obj.sum()
console.log(result) //13
var a = 1
var obj = {
  a: 2,
  add: (function () {
    var a = this.a // 立即执行函数，window对象调用，则this.a得到1
    return function () {
      console.log(a + this.a)
    }
  })(),
}
obj.add() // 3
```

### 4、call 与 apply 更改 this 指向

- 函数调用`call()`和 `apply()`方法，可以**更改 this 的指向**，同时立即执行
- call() 和 apply() 方法中的第一个参数是一个对象，这个对象指向函数内部的 this

**语法**

```js
// obj 是一个对象，此时，函数内部的this指向了obj
// 这种方式，类传于把函数当成了obj的方法来使用
函数.call(obj, arg1, arg2, arg3)
函数.apply(obj, [arg1, arg2, arg3])
```

- 我们来看一个案例，定义一个方法，用来统计数组中所有数字之和

```js
var arr1 = [1, 2, 3, 4, 5]
var arr2 = [5, 6, 7, 4, 3]

// 函数 sum用来统计数组中所有元素之后
function sum() {
  var result = 0
  for (var i = 0; i < this.length; i++) {
    result += this[i]
  }
  return result
}

console.log(sum.call(arr1))
console.log(sum.call(arr2))
console.log(sum.apply(arr1))
console.log(sum.apply(arr2))
```

重点：

某个函数或方法调用 call 时，等同于把方法或函数作为 call 的第一个参数的方法在调用。即

`函数.call(obj)` 和 `函数.apply(obj)` 的方式，类似于把函数转换成了对象`obj`身上的方法来使用

```js
 fn.call(obj,arg1,arg2)   等同于 obj.fn(arg1,arg2)
var obj = {
  a: 1,
  b: 2,
};
function fn() {
  console.log(this.a + this.b); // 相当于 obj.a +obj.b
}
fn.call(obj);
console.log(obj); // obj身上不会添加fn方法，只是类似于把fn当成obj的方法一样使用
```

### 4.1、call 和 apply 的注意事项

如果 call 和 apply 的第一个参数

- obj 是一个 `null` 或 `undefined` 时，其函数会自动将 this 替换为指向全局对象
- 如果 obj 是一个原始值会被包装成一个对象

```js
function fn() {
  console.log(this)
}
fn.call(null) //
fn.apply(undefined)
fn.call(1)
fn.call('abc')
fn.call(true)
```

![image-20220929235903161](https://www.arryblog.com/assets/img/image-20220929235903161.62b1bd5c.png)

### 5、bind 函数

- bind 方法创建一个新的函数（简单理解为原函数的拷贝）
- 在 bind 被调时，这个新函数的 this 被指定为 `bind()`的第一个参数。
- 其余参数将作为新函数的参数，供调用时使用。

```js
var fn2 = fn.bind(thisArg, arg1, arg2, arg3)
```

### 5.1、bind 用法一： 改变 this 指向

```js
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
function sum(a, b, c) {
  console.log(this.a, this.b, c)
}
// 这里的fn可以简理解为sum函数，此时fn函数内部的this变成了obj
var fn = sum.bind(obj, 'A', 'B', 'C')
fn()
```

### 5.2、bind 用法二：创建一个拥有预设参数列表

> 也就是我们在第一次调用 bind 方法时，除了第一个参数外，后面还可以传递 `>= 0` 个参数

```js
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
var c = 5
function sum(a, b, c) {
  console.log(a, this.b, c)
}
// 创建一个函数，它拥有预设的第一参数
var fn = sum.bind(obj, 'A')
fn('B', 'C')
// 创建一个函数，它拥有预设的前2个参数
var fn2 = sum.bind(obj, 'A', 'B')
fn2('C')
```

### 5.3、案例：比较两个数的大小

> 用户输入一个数，其后拿用户输入的任意数来和这个数对比，大于等于就返回 true，小于就返回 false

```js
function compare(a, b) {
  return a >= b
}
var fn = compare.bind(null, 10)

console.log(fn(11)) // false
console.log(fn(6)) // true
console.log(fn(56)) // false
```

### 5.4、bind 返回的新函数，作为构造函数使用

- 如果 bind 返回的新函数作为构造函数，则会忽略 thisArg 这个参数
- 也就是不更改原函数中 this，其作为构造函数使用，内部的 this 是 new 出来的实例对象

> bind 返回的新函数，作为构造函数使用，就相当于直接 `new 原函数()`

```js
// 构造函数
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.getPosition = function () {
  console.log('指向位置' + this.x, this.y)
}

var Fn = Point.bind([], 1)

// bind返回的新函数和调用的函数是两个函数，只是长得一样
console.log(Fn)
console.log(Fn === Point) // false
console.log(Fn.prototype === Point.prototype) // false

// point1是Point的实例, 并不是Fn的实例,也不是[]的实例
var point1 = new Fn(2)
console.log(point1) // Point {x: 1, y: 2}
console.log(point1 instanceof Point) // true
console.log(point1.__proto__ === Point.prototype) // true

// point1是Point实例，所以point1能访问Point.prototype上的属性
point1.getPosition()
```

特别注意

- 我们返回的新函数，每一个函数，都有自己的 prototype
- 如何让新函数的 prototype 指向原函数的 prototype，两者相互独立呢？

### 5.5、bind 注意事项

- 如果 bind 的第一个参数 thisArg 是
- 一个 `null` 或 `undefined` 时，其函数会自动将 this 替换为指向全局对象
- 如果 thisArg 是一个原始值会被包装成一个对象

```js
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
function sum(a, b, c) {
  console.log(this)
}
var fn1 = sum.bind()
var fn2 = sum.bind(null)
var fn3 = sum.bind(1)
fn1(3, 4)
fn2(3, 4)
fn3(3, 4)
```

![image-20221009210427586](https://www.arryblog.com/assets/img/image-20221009210427586.84420dda.png)

### 5.6、总结

```js
var fn2 = fn.bind(thisArg, arg1, arg2)
```

- fn 调用 bind 方法，相当于 fn 被当成了 thisArg 对象身上的方法，即 `thisArg.fn();`
- 但时，函数调用 bind 方法，并不会立即执行 fn 函数，而是返回一个新的函数 fn2
- 当调用 fn2 时，相当于内部执行了 `thisArg.fn();`

### 6、call、apply、bind 的区别和使用场景

`call`,`apply`和`bind`方法就是`Function`原型中的方法，所以所有的函数都可以使用这三个方法

> 三者的区别和相同点，如下表

|       | 作用相同           | 传参方式不同                                          | 返回值不同                         |
| :---- | :----------------- | :---------------------------------------------------- | :--------------------------------- |
| call  | 用来改变 this 指   | 第一参数是 thisArg，后续参数是一个参数列表            | 立即执行函数，返回值为原函数返回值 |
| apply | 用来改变 this 指向 | 第一参数是 thisArg,后续参数是包含一个或多个参数的数组 | 立即执行函数，返回值为原函数返回值 |
| bind  | 用来改变 this 指向 | 第一参数是 thisArg，后续参数是一个参数列表            | 返回一个新函数，相当于原函数拷贝   |

> 改变 this 指向，本质就是把某个**函数**当成对象的**方法**来使用。

```js
// 函数内部的this指向更改为thisArg对象
函数.call(thisArg,arg1,arg2,arg3,...);   // arg1, arg2, ... 指定的参数列表
函数.apply(thisArg,[arg1,arg2,arg3...]) ; // [arg1,arg2,...] 一个包含多个参数的数组
var 函数=函数.bind(thisArg,arg1,arg2,arg3,...);  //
var obj = {
  name: "张三",
};

function hobbies(a, b, c) {
  console.log(this.name + "的爱好有：" + a + "," + b + "," + c);
}

hobbies.call(obj, "弹琴", "画画", "阅读"); //  张三的爱好有：弹琴,画画,阅读
hobbies.apply(obj, ["弹琴", "画画", "阅读"]); // 张三的爱好有：弹琴,画画,阅读

var newHobbies = hobbies.bind(obj, "弹琴");
newHobbies("画画", "阅读");
```

### 7、this 指向总结

| 函数的调用方式         | this 指向          |
| :--------------------- | :----------------- |
| `对象.函数()`          | 对象               |
| `函数名()`             | window             |
| IIFE 立即执行函数      | window             |
| `数组[下标]()`         | 数组               |
| `call(对象,arg1,arg2)` | 对象               |
| `apply(对象,arry)`     | 对象               |
| `bind(对象,arg1,arg2)` | 对象               |
| 定时器中的回调函数     | window             |
| DOM 事件处理函数       | 添加事件监听的元素 |
| `new 函数()`           | 对象的实例         |

特别注意：

`数组[下标]()`这种方式，数组就是一个对象，下标就是他的属性，所以`数组[下标]()`就是调用数组身上的方法

## 八、构造函数与类

在学习构造函数之前，我们来思考一个问题，如果我们需要**批量创建一批相似的对象**（结构相似），我们会如何创建

> 比如说，我们现在要批量创建下面这样一批对象，这些对象有相同的属性和方法，我们会如何创建

| 相似对象（人） | 属性                              | 方法                                        |
| :------------- | :-------------------------------- | :------------------------------------------ |
| 小明           | 姓名：小明，年龄：22 岁，性别：男 | 自我介绍：大家好，我是小明，性别男，今年 22 |
| 小红           | 姓名：小红，年龄：32 岁，性别：女 | 自我介绍：大家好，我是小红，性别女，今年 32 |
| 小丽           | 姓名：小丽，年龄：43 岁，性别：女 | 自我介绍：大家好，我是小丽，性别女，今年 43 |

> 比如，我们一个一个来单独创建

```js
// 创建对象小明
var obj1 = {
  name: '小明',
  age: 22,
  sex: '男',
  sayHello: function () {
    console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + obj.age)
  },
}

// 创建对象小红
var obj1 = {
  name: '小红',
  age: 32,
  sex: '女',
  sayHello: function () {
    console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + obj.age)
  },
}

// 创建对象小丽
var obj1 = {
  name: '小丽',
  age: 43,
  sex: '女',
  sayHello: function () {
    console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + obj.age)
  },
}
```

上面这种方式

显然是不合理的，如果我们要创建 100 个这样的相似对象，难道我们要写 100 次吗 ？
我们学过函数，可以利用函数封装的特性，把相同的部分封装在函数体内，不同的部分通过函数的参数来传递。

> 我们看下函数封装的形式是如何创建对象的

### 1、工厂方法 - 批量创建对象

- 利用函数的封装特性来创建对象，只要调用下函数，就能产生一个类似的对象，我们把这种方式称为**工厂模式。**
- 因为他有点类似于工厂批量生产物品，把材料放到机器中，修改下参数，就能出来一个类似的物品。

```js
function Person(name, age, sex) {
  var obj = {}
  obj.name = name
  obj.age = age
  obj.sex = sex
  obj.sayHello = function () {
    console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + obj.age)
  }
  return obj
}
// 创建对象小明
var obj1 = Person('小明', 22, '男')
// 创建对象小红
var obj2 = Person('小红', 32, '女')
// 创建对象小丽
var obj3 = Person('小丽', 43, '女')
```

> 工厂方式创建对象，看似完美，其它他还有一个很大的问题 !
> 我们来看下面这段代码：

```js
// 用来创建人对象的 函数
function Person(name, age) {
  var obj = {}
  obj.name = name
  obj.age = age
  return obj
}
// 用来创建狗对象的 函数
function Dog(name, age) {
  var obj = {}
  obj.name = name
  obj.age = age
  return obj
}

var obj1 = Person('张三', 8)
var dog = Dog('小黑', 7)

console.log(obj1) // {name: '张三', age: 8}
console.log(dog) // {name: '小黑', age: 7}

console.log(typeof obj1) // object
console.log(typeof dog) // object
```

上面代码中

我们用 typeof 来检测两个对象的类型时，得到的都是 Object，也就是我们用这种方法创建出来的对象，我们是没有办法区分他们的具体类型。

> 如果我们希望在类型检测时得到的是 Person 和 Dog 类型，那要如何办呢？这就需要用到我们接下来讲到的构建函数的方式创建对象

### 2、构造函数 - 创建对象

- 用**new 调用一个函数**，这个函数就被称为**构造函数**，任何函数都可以是构造函数，只需要用**new**调用它。
- 构造函数：主要用来在**创建对象**时**初始化对象**， 即为对象成员变量赋初始值
- 构造函数的**首字母需要大写**，这是开发者约定的规范，并非说首字不大写就是错

```js
// 创建一个构造函数Person，用来创建对象
function Person(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  this.sayHello = function () {
    console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + obj.age)
  }
}
var p1 = new Person('小明', 22, '男')
console.log(p1) // Person {name: '小明', age: 22, sex: '男', sayHello: ƒ}
var p2 = new Person('小丽', 32, '女')
console.log(p2) // Person {name: '小丽', age: 32, sex: '女', sayHello: ƒ}

// 给创建好的对象再添加一些其它方法
p1.toSleep = function () {
  console.log(this.name + '要开始睡觉了, zzzzzzzzz')
}
p1.toSleep() // 小明要开始睡觉了, zzzzzzzzz
```

### 3、new 调用函数四步曲

- 第一步：会在函数体内自动创建一个新的空对象`{}` 即：`var obj = {}`
- 第二步：函数体内的 this 被赋值为这个新对象, 即 `this = obj`
- 第三步：从上往下，执行函数体内的代码，相当于给新创建的空对象 obj 添加属性
- 第四步：函数体内代码执行完，会自动返回创建的新对象 obj（所以构造函数体内不需要 return）

> 提示：在第一步和第二步中间，其实还省略了一步
>
> 将新对象 obj 的`__proto__`指向构造函数的`prototype`属性

```js
// 用来创建人对象的 函数
function Person(name, age, sex) {
  // 第一步： var obj={ }
  // 第二步： this=obj;
  this.name = name
  this.age = age
  this.sex = sex
  // 第三步：从上往下执行代码，相当于给obj对象添加属性
  // 		obj.name=name,obj.age=age,obj.sex=sex
  // 第四步：代码执行完，自动返回obj这个对象，相当于return obj;
}
// new调用函数
var p1 = new Person('小明', 22, '男')
console.log(p1.name) // 小明
console.log(p1.age) // 22
console.log(p1.sex) // 男
var p2 = new Person('小红', 32, '女')
console.log(p2.name) // 小红
console.log(p2.age) // 32
console.log(p2.sex) // 女
```

提示：

其实最后`p1 = this = obj`，也就 p1 和 this 都指向 **new 调用函数** 内部新创建的对象 obj。

### 4、构造函数中的 this 指向

> 构造函数中的 this，指向的是 **new 调用函数** 创建出来的新对象

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  console.log(this)
}

var arry = new People('arry老师', 18, '男')
var cuihua = new People('翠花', 21, '女')
var shuandan = new People('栓蛋', 19, '男')
```

![image-20221002213551411](https://www.arryblog.com/assets/img/image-20221002213551411.50b71709.png)

### 5、构造函数注意事项

- 一定要记住：**一个函数是不是构造函数，要看它是否用 new 调用**，而至于名称首字母大写，完全是开发者的习惯约定
- 如果一个函数名首字母大写，但调用是没有用 new，而是直接调用，其不是构造函数，内部 this 指向 window

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  console.log(this)
}

People('arry老师', 18, '男')
People('翠花', 21, '女')
People('栓蛋', 19, '男')
```

![image-20221002213720031](https://www.arryblog.com/assets/img/image-20221002213720031.b5c0fd9a.png)

### 6、构造函数的问题

- 构造函数虽然很有用，但也有他的问题存在。他的主要问题在于，其定义的方法会在每个实例上都创建一遍。
- 如果我们用这个构造函数创建出来 10 个实例，那这 10 个实例上都有相同的方法，这些相同的方法在创建实都会单独占用一定的内存空间，所以增大了内存的开销。
- 但是这些方法本质上是做的相同的事情，所以没必要定义那么多同名函数。

> 当然，我们可以把这些方法写在外面，然后在构造函数中引用他们，如下：

```js
function Person(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  this.sayHello = sayHello
}

function sayHello() {
  console.log('大家好，我叫' + this.name + ',' + this.sex + '今年' + this.age)
}

var p = new Person('小明', 32, '男')
p.sayHello()
```

注：

- 但这种做法，会造成全局作用域的污染。因为这些(函数）方法只是供这些对象来调用的。
- 在 JS 中为每个函数提供了原型这个属性，后面我们可以通过原型的方实来解决。后面接下来就会学到。

## 九、类和实例（对象）

接下来我们来学习两个重要的概念，类和实例

### 1、现实生活角度理解类和实例

什么是类

我们常说分门别类，其实就是根据事物的特点、性质将其分成各种门类。

- 这里的类并不指具体的东西，而是一类具有相同特点事物抽象的一个分类。
- 类好比一类物体的抽象出来的一个画像或模型。

**什么是实例**

- 实例可以理解为我们之前说的对象，他是一个实实在在，能摸得着，看得见的实物。
- 类可以理解为模型，那实例就是由模型制作出来的具体的一件东西。

**区分类与实例**

| 类                             | 实例                                 |
| :----------------------------- | :----------------------------------- |
| 苹果、书包、人、动物、小猫、狗 | 这个苹果、小明的书包、清心、这条黑狗 |

### 2、JS 角度来理解类和实例

什么是类

- 在 JS 中，**类**是用来描述对象会拥有那些属性和方法，但是并不具体指明属性的值。
- JS 中的构造函数就好比是一个类，他只描述了这个类有那些属性和方法，但并不具体指明属性的值。

**什么是实例**

- 在 JS 中，**实例**就可以理解为 JS 中的对象，他有自己的属性和方法，同时有自己的属性值
- 我们用 new 调用函数，本质就是创建了一个对象（实例化一个对象），我们称为**对象实例化**
- **对象实例化：** 是指将一个类实例化成对象,即用类创建对象的过程

```js
// 构造函数 就可以看成是一个类 创建了一个Person类
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
  this.sayHello = function () {
    console.log('我是' + this.name + '，我今年' + this.age + '岁了，我是' + this.sex + '生哦 !')
  }
  this.sleep = function () {
    console.log(this.name + '要开始睡觉了, zzzzzzzzz')
  }
}

var arry = new People('arry老师', 18, '男') // arry是对象，即实例
var cuihua = new People('翠花', 21, '女') // cuihua是对象，即实例
var shuandan = new People('栓蛋', 19, '男') // shuandan是对象，即实例
```

![image-20220107224358935](https://www.arryblog.com/assets/img/image-20220107224358935.30382387.png)

### 3、创建一个球类和球对象

> 要求将创建好的球对象，添加到 body 中，在页面呈现出来。

| 类  | 属性                               | 方法               |
| :-- | :--------------------------------- | :----------------- |
| 球  | 半径、颜色、透明度、坐标、DOM 元素 | 初始化，变色，运动 |

```js
function Ball(r, color, opacity, x, y) {
  this.r = r
  this.color = color
  this.opacity = opacity
  this.x = x
  this.y = y
  // this.init(); 一般初始化，是在new时就自动初始化
  this.init = function () {
    this.dom = document.createElement('div')
    this.dom.style.width = this.r + 'px'
    this.dom.style.height = this.r + 'px'
    this.dom.style.borderRadius = this.r + 'px'
    this.dom.style.backgroundColor = this.color
    this.dom.style.opacity = this.opacity
    this.dom.style.position = 'absolute'
    this.dom.style.left = this.x + 'px'
    this.dom.style.top = this.y + 'px'
    // 将小球添加到body上
    document.body.appendChild(this.dom)
  }
  this.move = function () {
    // 运动
    this.dom.style.left = this.x + 250 + 'px'
    this.dom.style.top = this.y + 250 + 'px'
  }
  this.changeColor = function () {
    // 变色
    this.dom.style.backgroundColor = 'skyblue'
  }
}
var ball = new Ball(100, 'pink', 0.5, 100, 100)
ball.init() // 初始化
ball.changeColor() // 变色
ball.move() // 移动
```

![image-20221002225748627](data:image/png;base64,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)

注：

- Javascript 是 **基于对象（object-based）** 的语言，他并不是完全面向对象（object-oriented）语言。
- java 、c++等是 **"面向对象（object-oriented）"** 语言

## 十、Object() 构造函数

**`Object` 构造函数将给定的值包装为一个新对象。**

- 如果给定的值是`null`或 `undefined`, 它会创建并返回一个空对象。
- 否则，它将返回一个和给定的值相对应的类型的对象。
- 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）。

语法

```js
new Object()
new Object(value)
```

创建一个新对象

```js
var obj = new Object()
console.log(obj) // {}
obj.a = 1
obj.b = 2
console.log(obj) // {a: 1, b: 2}

// 如果给定的值是`null`或 `undefined`, 它会创建并返回一个空对象
var obj1 = new Object(null)
var obj2 = new Object(undefined)
console.log(obj1) // {}
console.log(obj2) // {}

// 给定值是基本数据类型  数字、字符串、boolean值
var strObject = new Object('字符串包装成一个对象')
console.log(strObject) //  String {'字符串包装成一个对象'}

var numberObject = new Object(11)
console.log(strObject) // Number {11}

var booleanObject = new Object(true)
console.log(strObject) // Boolean {true}

// 给定值本身就是一个对象，返回这个对象
var arr = [1, 2, 3]
arrObject = new Object(arr)
console.log(arr) // [1, 2, 3]
```

## 十一、原型（prototype）和原型链

接下来我们将学习一个非常非常重要的知识点，也是面试必问的核心重点，那就是原型和原型链。

### 1、什么是原型（prototype）

- 任何函数都有一个`prototype`属性，`prototype`的翻译成英语，就是“**原型**”的意思
- `prototype`属性值是一个**对象**，这个对象中拥有一个`constructor` 属性，这个属性指向这个**函数本身**。

```js
function sum(a, b) {
  return a + b
}

console.log(sum.prototype) // {constructor: ƒ}
console.log(typeof sum.prototype) // object
console.log(sum.prototype.constructor === sum) // true
```

> 对于普通函数， `prototype`属性没有任何用处，而 **构造函数的 prototype 属性非常有用**

### 2、构造函数的 prototype 属性

- 构造函数的`prototype`属性是它的 **实例的原型**
- 在构造函数的**实例**中有一个隐含的属性`__proto__`，指向该构造函数的原型`prototype`

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}

// 实例化
var cuihua = new People('翠花', 18, '男')
// 测试三角关系是否存在
console.log(cuihua.__proto__ === People.prototype) // true,表示存在

// 构造函数的prototype属性是它的实例的原型
```

![image-20220108111554989](https://www.arryblog.com/assets/img/image-20220108111554989.52945031.png)

注：

实例的`__proto__`属性，指向构造函数的原型 `prototype`，到底有什么用 ？

答案就是：原型链查找

### 3、什么是原型链查找

- 构造函数的原型 prototype 对象，相当于一个公共的区域，所有同一个类的实例都可以访问到这个原型对象
- 所以我们可以将**对象中共有的内容，统一设置到原型对象中**。
- 当我们通过对象访问属性时，会按照属性的名称开始查找，他最先开始在对象实例本身来查找，如果在实例身上找到了，则返回该属性对应的值。
- 如果没有找到，会去原型对象中寻找，如果原型对象中有，则使用
- 如原型对象中没有，则继续去原型的原型中寻找，直到找到 Object 对象的原型
- Object 对象的原型没有原型，如果在 Object 对象的原型中依然没有，则返回 undefined

> 对象访问属性时，会沿着原型去查找，好比原型形成了一个链条，一层一层向上找，我们把这种现象称为 **原型链查找** 。

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}

// 在构造函数的prototype上添加nationality属性
People.prototype.nationality = '中国'

// 实例化
var cuihua = new People('翠花', 18, '男')

console.log(cuihua.nationality) // 输出：中国，这个就叫做原型链查找
console.log(cuihua) // {name: '翠花', age: 18, sex: '男'}

// 总结：当一个对象打点调用一个属性时，这个对象的身上并没有这个属性的时候，系统并不会直接报错，它会寻找这个对象的原型上有没有这个属性，如果能找到这个属性，则证明打点调用是可以的
```

![image-20220108124204407](https://www.arryblog.com/assets/img/image-20220108124204407.e47329fd.png)

注：

- JS 规定：一个对象（或一个实例）是可以打点调用原型上的属性的
- 因此：cuihua 是可以打点调用 nationality 属性的

### 4、原型链的遮蔽效应

- 我们说当访问对象中的属性时，会先在自身找，如果找到就用自身的。
- 也就是说，如果自身有一个与原型对象上同名的属性，那自然在查找时，会以自身的为主
- 这就相当于原型上的同名属性被**遮蔽**了，我们把这种现象称为**原型链的遮蔽效应**

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}
// 在构造函数的prototype(原型)上添加nationality属性
People.prototype.nationality = '中国'
// 实例化
var cuihua = new People('翠花', 18, '男')
// 再实例化一个mini对象
var mini = new People('mini', 19, '女')
// 给mini本身添加nationality属性
mini.nationality = '美国'

console.log(cuihua.nationality) // 输出：中国
console.log(cuihua) // {name: '翠花', age: 18, sex: '男'}

console.log(mini.nationality) // 输出：美国，这就是原型链的遮蔽效应
```

### 5、hasOwnProperty

- hasOwnProperty 方法可以检查**对象是否真正 “自己拥有” 某属性或者方法**
- 也就是这个属性或方法，是在实例本身身上，并不是在原型上。
- 如果是真正自身属性，返回 true，否则返回 false

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}
// 在构造函数的prototype(原型)上添加nationality属性
People.prototype.nationality = '中国'
var cuihua = new People('翠花', 18, '男')
console.log(cuihua.hasOwnProperty('name')) // true
console.log(cuihua.hasOwnProperty('age')) // true
console.log(cuihua.hasOwnProperty('sex')) // true
console.log(cuihua.hasOwnProperty('nationality')) // false
```

### 6、in

- in 运算符只能检查某个**属性或方法是否可以被对象访问**，不能检查是否是自己的属性或方法
- 也就是不管这个属性是对象自身还是原型上的，都返回 true,找不到，则返回 false

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
  this.sex = sex
}
// 在构造函数的prototype(原型)上添加nationality属性
People.prototype.nationality = '中国'
var cuihua = new People('翠花', 18, '男')
console.log('name' in cuihua) // true
console.log('age' in cuihua) // true
console.log('sex' in cuihua) // true
console.log('nationality' in cuihua) // true
```

### 7、在 prototype 添加方法

- 在之前的课程中，我们把方法都是直接写到了构造函数身上，这种方式会造成内存的浪费，因为每创建一个实例，就需要单独为同一个方法分配一块内存空间。
- 如果将方法写在构造函数的原型 prototype 上，就不会了，因为并不会创建一个实例，就为方法分配一块内存，所有实例都是共用原型上的同一个方法。

```js
function Count(a, b) {
  this.a = a
  this.b = b
  // 方法写在构造函数中
  this.add = function () {
    return this.a + this.b
  }
}

var c1 = new Count(2, 3)
var c2 = new Count(2, 3)
var c3 = new Count(2, 3)
// 指向内存中的不同地址，每个对象身上的方法都分配了一块内存
console.log(c1.add === c2.add) //  false
console.log(c2.add === c3.add) // false
function Count(a, b) {
  this.a = a
  this.b = b
}
// 将方法，加在构造函数的原型上
Count.prototype.add = function () {
  return this.a + this.b
}

var c1 = new Count(2, 3)
var c2 = new Count(3, 3)
var c3 = new Count(6, 3)
console.log(c1.add === c2.add) // true
console.log(c2.add === c3.add) // true;
console.log(c1.add(), c2.add(), c3.add()) // 5 6 9
```

### 8、原型链的终点

- 原型对象也是对象，所以原型也有原型，最终所有的对象都会继承 Object 的原型
- Object 原型的的原型是 null，即原链的终点

```js
function People(name, age) {
  this.name = name
  this.age = age
}

var p1 = new People('小丽', 32)
console.log(People.prototype === p1.__proto__)
console.log(People.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
```

![image-20221003003210243](https://www.arryblog.com/assets/img/image-20221003003210243.59637009.png)

### 9、数组的原型链

- 数组是 Array 类（构造函数）构造出来的，Array 的原型指向 Object 的原型

```js
var arr = [123, 55, 33, 66, 88]

console.log(arr.__proto__ === Array.prototype) // true
console.log(Array.prototype.__proto__ === Object.prototype)
console.log(arr.__proto__.__proto__ === Object.prototype) // true
```

![image-20220108233731050](https://www.arryblog.com/assets/img/image-20220108233731050.17606538.png)

- **验证 hasOwnProperty() 和 toString() 方法**

```js
function People(name, age, sex) {
  this.name = name
  this.age = age
}

var cuihua = new People()
console.log(cuihua.__proto__.__proto__ === Object.prototype) // true,说明cuihua的原型的原型是 Object.prototype
console.log(Object.prototype.__proto__) // null，说明Object.prototype没有自己的原型了，即 它就是原型链的终点

console.log(Object.prototype.hasOwnProperty('hasOwnProperty')) // true，说明hasOwnProperty方法是定义在Object.prototype
console.log(Object.prototype.hasOwnProperty('toString')) // true，同理
```

> 每个对象，比如数组、字符串、数字等都重写了 toString() 方法。

### 10、函数的原型链

```js
function fn() {
  console.log(1)
}

console.log(fn.__proto__ === Function.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
// 所有对象，本质都是构造函数构造出来的
console.log(Object.__proto__ === Function.prototype) // true
console.log(Object.__proto__) // ƒ () { [native code] }
```

![image-20221003011839619](https://www.arryblog.com/assets/img/image-20221003011839619.e6a41c15.png)

### 11、instanceof

- 检查一个对象是否是一个类的实例。
- 底层机理:就是检查 **构造函数.prototype 属性**是否在实例的**原型链**上（多少层都行）
- 所有对象都是 Object 的后代，所以任何对象与 Object 做 instanceof 检查时都会返回 true

```js
function People(name, age) {
  this.name = name
  this.age = age
}
function Dog(name, age) {
  this.name = name
  this.age = age
}

var p1 = new People('小丽', 32)
var dog = new Dog('小黑', 3)
console.log(p1 instanceof People) //true
console.log(dog instanceof People) //false
console.log(dog instanceof Dog) //true
console.log(dog instanceof Object) //true
console.log(p1 instanceof Object) //true
```

![image-20221009232752872](https://www.arryblog.com/assets/img/image-20221009232752872.289b27e0.png)

```js
console.log(p1.__proto__.__proto__ === Object.prototype) // true
console.log(dog.__proto__.__proto__ === Object.prototype) // true
console.log(People.prototype.__proto__ == Object.prototype) // true
console.log(Dog.prototype.__proto__ == Object.prototype) // true
console.log(Object.prototype.__proto__) // null
```

### 12、类数组转换数组

> 常用来将类数组转换为数组的方法有

```js
Array.prototype.slice.call(arguments) // 把slice当成arguments的一个方法
Array.prototype.concat.apply([], arguments)
function sum(a, b, c) {
  var arr1 = Array.prototype.slice.call(arguments)
  var arr2 = Array.prototype.concat.apply([], arguments)
  console.log(arr1)
  console.log(arr2)
}
sum(1, 2, 3)
```

### 13、手写 JS 的 slice 方法

> 如果这个方法不判断 undefined 情况，相当于当两个参数都没有传的时候，啥也得不到

```js
/**
 * slice(start,end)方法的功能，返回值，注意事项
 * 1、功能：从指定start下标开始复制数组中元素，添加到新数组中，到下标end结束，不包括end
 * 2、返回值：查询到的元素组成的新数组
 * 3、注意事项
 * - 如果start和end为null 、undefind，和非数字类型，则start=0
 * - 如果end 为null或其它类型，end=0,如果end为undefined则表示数组长度
 * - 如果start或end为负值时，要确定好查询的起始于结束的位置
 * - 本质就是要把对应的负数转成正数对应下标 （难点，很多同学想不到）
 */
Array.prototype._slice = function (start, end) {
  var result = []
  // null和数字类型转成 0或数字，其它都转为NaN，start赋值为0
  start = Number(start) !== Number(start) ? 0 : Number(start)
  // 这里不用处理NaN的情况，因为结束是NaN,本质在for条件判断时会通示过
  // 也就相当于0，不做任何查询
  end = end === undefined ? arr.length : Number(end)
  // 如果start小于0，则确定start的查找位置
  if (start < 0) {
    start = -start > this.length ? 0 : this.length + start
  }
  // 如果start小于0，则确定end的结束位置
  if (end < 0) {
    end = -end > this.length ? 0 : this.length + end
  }
  // 循环遍历，从起始位置到结束位置，查找元素，添加到新数组中
  // 不用判断 start与end的大小关小，因为start如果大于end不会执行
  for (var i = start; i < end; i++) {
    result[result.length] = this[i]
  }
  return result
}

var arr = [1, 2, 3, 4, 5]
arr2 = arr._slice(0, 'a')
arr3 = arr.slice(0, 'a')
console.log(arr2)
console.log(arr3)
```

### 14、手写数组的 concat 方法

```js
/**
 * concat(value,value2) 方法的功能，返回值，注意事项
 * 功能：将数组或值，被合并到一个新的数组中
 * 返回值：返回合并后组成的新数组
 * 注意事项：concat后的参数如果不是数组的情况，要考虑进去，不要漏掉
 */
Array.prototype._concat = function () {
  var newArr = []
  // 浅浅拷贝调用concat方法的数组
  for (var i = 0; i < this.length; i++) {
    newArr.push(this[i])
  }
  for (var i = 0; i < arguments.length; i++) {
    if (!Array.isArray(arguments[i])) {
      newArr[newArr.length] = arguments[i]
    } else {
      for (var j = 0; j < arguments[i].length; j++) {
        newArr[newArr.length] = arguments[i][j]
      }
    }
  }
  return newArr
}

var arr = [1, 2, 3]
//   var arr2 = arr._concat(1, [5, 6], [7], 9);
var arr2 = [].concat(1, 2, 3)
console.log(arr2)
```

### 15、Object.prototype.toString()方法

访方法返回一个表示该对象的字符串。

返回值为`"[object type]"`，其中 `type` 是对象的类型

```js
Object.prototype.toString([]) // '[object Object]'
Object.prototype.toString({}) // '[object Object]'
Object.prototype.toString(function () {}) // '[object Object]'
Object.prototype.toString(1) // '[object Object]'
```

### 16、经典应用：toString() 来获取每个对象的类型

- 通过`Object.prototype.toString.call(thisArg)` 或
- `Object.prototype.toString.apply(thisArg)`来判断 thisArg 的类型
- 要检查的对象作为第一个参数，称为 `thisArg`

![image-20221009230138335](https://www.arryblog.com/assets/img/image-20221009230138335.7e096176.png)

温馨提示：

- Array、String、Number、Boolean、RegExp、Date 等类型都重写了 toString()
- 所以实例本身调用 toString()方法，并不能达到检测类型的作用。
- 因为直接调用是调用自身的原型对象上已有 toString()方法,就不会调用到 Object 原型对象上的 toString()方法了

## 十二、本章节经典面试题

汇总了 2022 年各互联网大厂以及中小型创业公司 JavaScript 本节内容相关的最新高频面试题。

面试真题是检验自己学习成果和查缺补漏的最好方式之一，同时也是了解企业对求职者技能要求的风向标 。

### 1、手写一个 getType 方法，可以判断出任意的数据类型（经典面试题）

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析并完成题目，再点击查看正确答案</summary><ul style="padding-left: 1.2em; line-height: 1.7;"><li></li><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li></ul><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token class-name" style="color: rgb(248, 197, 85);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

> 这道题还会追问，判断数据类型有那些方，分别有什么区别 ？

### 2、判断数据类型有那些方法，分别有什么区别 ？

> 所我们先来复习下，我们之前学习过的能判断数据类型的相关操作符和方法

| 判断数据类操作符或方法               | 功能                                                                                                                   | 用法                                  |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| typeof                               | 只能区分基本数据类型和引用数据类型 但不能区分 null、Object、array typeof null 得到 object typeof 检测函数得到 function | `typeof a;`                           |
| `Array.isArray()`                    | 判断某个变量，不是不是数组                                                                                             | `Array.isArray(arr)`                  |
| in                                   | 检查某个**属性或方法是否可以被对象访问**，不能检查是否是自己的属性或方法                                               | `'name' in obj`                       |
| instanceof                           | 检查一个**对象**是否是一个**类**的实例                                                                                 | `o instanceof Object`                 |
| constructor                          | 判断**实例对象**是不是这个**构造函数的实例**                                                                           | `an1.constructor == Anamil`           |
| `Object.prototype.toString().call()` | 可以用来判断任意数据类型                                                                                               | `Object.prototype.toString().call(X)` |

### 2.1、typeof

- 只能用来区分基本数据类型和函数，但不能区分 null、object、arary 等引用数据类型

```js
typeof 1 // 'number'
typeof 'a' // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof null // 'object'
typeof {} // 'object'
typeof function () {} // 'function'
typeof [] // 'object'
```

### 2.2、Array.isArray

- 用来判断是一个变量是不是数组类型，是返回 true，否则返回 false

```js
Array.isArray({}) // false
Array.isArray([]) // true
```

### 2.3、in

- 检查某个**属性或方法是否可以被对象访问**，不能检查是否是自己的属性或方法
- 只要这个属性能在对象或对象的原型或原型的原型上能找到，就会返回 true

```js
Object.prototype.x = 1
var obj = {
  // x: 3,
}
console.log('x' in obj) // true
```

### 2.4、hasOwnProperty

- hasOwnProperty 方法可以检查**对象是否真正 “自己拥有” 某属性或者方法**
- 也就是这个属性或方法，是在实例本身身上，并不是在原型上。

```js
Object.prototype.x = 1
var obj = {
  // x: 3,
  y: 4,
}
console.log('x' in obj) // true
console.log(obj.hasOwnProperty('x')) // false
console.log(obj.hasOwnProperty('y')) // true
```

### 2.5、instanceof

- 检查一个对象是否是一个类的实例。
- 底层机理：就是检查 **构造函数.prototype 属性**是否在实例的**原型链**上（多少层都行）

```js
var obj = {}
obj instanceof Object // true

var arr = []
arr instanceof Object // true
```

### 2.6、constructor

- 构造函数的原型 prototype 上有一个属性 constructor，这个属性指向构造函数本身
- 构造函数构造的实例可以直接访问 prototype 对象身上的属性和方法
- 即：`实例.constructor === 构造函数` 那就说明这个实例是这个构造函数的实例

```js
function Person() {}
var p1 = new Person()
console.log(p1.constructor == Person) // true
```

注意事项

constructor 是不稳 定的，因为开发者可以重写 prototype，得写后，原有的 constructor 引用会丢失，需要我们重新指定 constructor 的引用

在没有重新指定时，constructor 会默认为 Object

> 为什么重写 prototype 后，constructor 的默认值会是 Object 呢 ？

```js
function F() {}
F.prototype = {}
console.log(F.prototype.constructor)
```

- 当 `F.prototype = {}` 时， `{}` 是 `new Object()` 创建出来的实例
- 所以`{}`的**proto**指向 Object 构造函数的原型 prototype,Object 的 prototype 对象上的属性 constructor 指 Object 构造函数。

### 3、ES6 版本-手写 call 方法（经典面试题）

- 我们来回顾下，我们之前一直强调一个点，`函数.call(obj)` ，类似于把**函数**当成了**obj 的方法**来使用
- 我们就是要利用这个特点来实现 手写 call 函数

**第一步：**

call 方法，是函数身上的方法，所以肯定手写的 call 方法，是要绑定到函数的原型上

```js
Function.prototype._call = function () {}
```

**第二步：搭建基础结构**

call 方法，的第一个参数是用来改变 this 指向（函数上下文），后面的参数相当于是传递给函数的参数,且个数不定，所以我们定义函数时，可以用写形参，最后用实参来接受传过来的参数

```js
// context 表示传入的上下文对象
Function.prototype._call = function (context) {}
```

**第三步：把函数处理成 context 对象的方法**

- 要主函数成为 context 的方法，我们需要为 context 对象添加一个属性 key，然后把这个属性指向这个函数
- `_call`方法内部的 this 就是调用`_call`方法的函数，即 `context[key]=this`
- 当然要保证 context 对象新添加的属性 key 不能与对象原有的属性重名，如果重名就会对象原有的属性给覆盖了。
- 我们可以用 ES6 的 Symbol 来创建一个唯一的标识符。

```js
Function.prototype._call = function (context) {
  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
}
```

**第四步：调用函数，并处理参数**

- 调用`_call`方法的函数如果有对应的参数，我们需要在调用函数即`context[key]()`时，把对应的参数传递进去
- 我们不清楚调用 call 方法的函数，具体有多少个参数，（这里用 arguments 处来相对麻烦，在 es5 版本中，我们来讲 arguments 的方式如何处理）所以我们用剩余参数`..args`来接受所有参数，接受过来的参数是以数组的形式组合在一起 ,即类传于`args=[1,2,3]`
- 利用 ES6 的展开运算符，把 args 数组展开放在调用的函数后面，作为实参传递过去

```js
Function.prototype._call = function (context, ...args) {
  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
  // 调用函数，取得函数的返回结果
  var result = context[key](...args)
  // 返回函数执行后的返回值
  return result
}
```

**第五步：删除新创建的属性，保证 context 不被修改，恢复原貌**

```js
Function.prototype._call = function (context, ...args) {
  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
  // 调用函数，取得函数的返回结果
  var result = context[key](...args)
  // 这里要特别注意，我们不能修改context对象
  // 所以这里要把创建的属性，使用完，删除掉
  delete context[key]
  // 返回执行结果
  return result
}
```

**第六步：考虑 context 的数据类型**

如果传递过来的第一个参数 context ，不是一个对象呢 ？

- 如果传过的是`null`、`nudefined` ，此时 context 指向全局对象 `globalThis`
- 如果是原始数据类型呢 ？context 要被转换成对应的包装对象

```js
Function.prototype._call = function (context, ...args) {
  // 如果传过来的是null 或undefind，则this指向window
  // null ==null 返回true  undefined==null也是true
  // globalThis 在浏览器中指向window ，在nodejs中指向global
  if (context == null) context = globalThis
  // 如果传过来的是基本数据类型（原始数据类型）
  // new Object(1) 转成 Number {1} ....
  if (typeof context !== 'object') context = new Object(context)

  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
  // 调用函数，取得函数的返回结果
  var result = context[key](...args)
  // 这里要特别注意，我们不能修改context对象
  // 所以这里要把创建的属性，使用完，删除掉
  delete context[key]
  // 返回执行结果
  return result
}
```

**第七步：判断调用 call 方法的对象，是不是一个函数**

- 按正常思维来思考，call 方法是在 `Function.prototype` 上，只有函数才会调用到 call 方法。
- 在实际上，会有一些特殊的情况，一个对象也能访问到 call 方法。

> 比如：

- 如果一个对象是用 `Function.prototype` 构造出来的，那他这个对象就能调用 call 方法，但他不是一个函数
- `Object.create()`方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

```js
var obj = Object.create(Function.prototype)
// obj是一个对象，但他能调用call方法

console.log(obj.__proto__ === Function.prototype) // true
Function.prototype._call = function (context, ...args) {
  // 判断调用 call方法的对象，是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('Type Error !')
  }

  // 如果传过来的是null 或undefind，则this指向window
  // null ==null 返回true  undefined==null也是true
  // globalThis 在浏览器中指向window ，在nodejs中指向global
  if (context == null) context = globalThis
  // 如果传过来的是基本数据类型（原始数据类型）
  // new Object(1) 转成 Number {1} ....
  if (typeof context !== 'object') context = new Object(context)

  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
  // 调用函数，取得函数的返回结果
  var result = context[key](...args)
  // 这里要特别注意，我们不能修改context对象
  // 所以这里要把创建的属性，使用完，删除掉
  delete context[key]
  // 返回执行结果
  return result
}
```

### 4、ES5 版本-手写 Call 方法（经典面试题）

在 ES5 中，是没有 Symbol 和 剩余参数 和 扩展运算符的，所以在 ES5 中，我们要如何处理下面两个问题 ？

- 第一：如何创建出一个 context 对象身上没有的属性
- 第二：如何解决动态传参的问题

### 4.1、如何创建出一个 context 对象身上没有的属性

如果不允许使用 es6 的 `Symbol()`，如何创建出一个 context 对象身上没有的属性 ？

- 我们可以随机创建一个属性名，然后判断这个属性名是否在原来的上下文对象中存在
- 如果存在，重新生成，如果不存在就可以使用

```js
// 随机生成一个属性名，保证context对象身上没有与之同名的属性
var key = 'fn_' + Math.random() * new Date().getTime()
while (context.hasOwnProperty(key)) {
  key = 'fn_' + Math.random() * new Date().getTime()
}
```

- 如果不能用 es6 的...args 剩余参数来传参
- 要解决动态传参的问题，就要利用`new Function()`动态创建函数来实现
- 所以我们现在简单学习`Function`构造函数

### 4.2、Function 构造函数

`new Function()`构造函数，可以用来创建一个函数

**语法**

```js
var fn = new Function(arg1,arg2,arg3...,functionBody)
```

- fn 为新创建出来的函数
- arg1,arg2，arg3... 都是一个字符串，为新创建出来的函数的形参
- functionBod 是 `Function()`构造函数的最后一个参数，表示新创建出来的函数的函数体代码，如果`new Function()`中只一个参数，那这个函数就是函数体代码，这个新创建出来的函数没有参数。

```js
// 以下代码相当于创建了匿名函数  sum= function anonymous(a,b){return a+b}
var sum = new Function('a', 'b', 'return a+b')
sum(1, 2) // 3

// 相当于创建了匿名函数
// sayHello=sayHell=function anonymous(){console.log("大家好，我是...")}
var sayHello = new Function('console.log("大家好，我是...")')
sayHello() // 大家好，我是...
```

### 4.3、Function 构造函数：实现动态传递参数

- fn 函数，除去第一个参数外，后面传过来多少个参数，就要把这些参数一一作为 `sum()`的实参。

```js
function fn(context) {
  // 处理fn动态传过来的参数，除去第一个参数，你传几个，我这里就接受几个
  // 处理办法，先把接受过来的实参，添加到一个数组中
  var argArr = []
  for (var i = 1; i < arguments.length; i++) {
    argArr.push(arguments[i])
  }

  // 如果argArr的长度是1，则 sum(argArr[0])
  // 如果argArr的长度是2，则sum(argArr[0],argArr[1])
  // 如果argArr的长度是3 ，则sum(argArr[0],argArr[1],argArr[2])
  // ... 也就是sum后面接受多少个实参，是由argArr的长度来决定的。
  // 但我们有没有办法通过循环把里面的每个数拿出来，放到sum函数后面
  // 把我们只能通过另辟蹊径的方式来解决

  return sum(/*参数个数，由argArr长度决定*/)
}

function sum(a, b, c) {
  console.log(a, b, c)
}
```

**解决办法**

- 我们可以根据 argArr 的长度，结合 new Function 来动态创建如下函数

```js
// 假设argArr的长度是2,则创建出如下函数
function anonymous(argArr) {
  return sum(argArr[0], argArr[1])
}

// 假设argArr的长度为3，则创建出如下函数
function anonymous(argArr) {
  return sum(argArr[0], argArr[1], argArr[2])
}
```

- 相当于，我在 fn 的函数体内，只要调用下上面创建出来的函数，就可以达到动态传参，并执行 sum 函数。

```js
function fn(context) {
  // 处理fn动态传过来的参数，除去第一个参数，你传几个，我这里就接受几个
  // 处理办法，先把接受过来的实参，添加到一个数组中
  var argArr = []
  for (var i = 1; i < arguments.length; i++) {
    argArr.push(arguments[i])
  }

  // 假设 argArr长度为3 ，则下面代码
  // 内部会执行  sum(argArr[0],argArr[1],argArr[2])
  return anonymous(argArr)
}
```

**根据 argArr 长度，动态创建需要的函数**

```js
function createFn(argArrLength) {
  var code = 'return sum('
  for (var i = 0; i < argArrLength; i++) {
    if (i > 0) {
      code += ','
    }
    code += 'argArr[' + i + ']'
  }
  code += ')'

  return new Function('argArr', code)
}
```

- 最终我们只需要在 fn 函数内部调用 createFn 函数就可以实现了

```js
function fn(context) {
  // 处理fn动态传过来的参数，除去第一个参数，你传几个，我这里就接受几个
  // 处理办法，先把接受过来的实参，添加到一个数组中
  var argArr = []
  for (var i = 1; i < arguments.length; i++) {
    argArr.push(arguments[i])
  }

  // 假设 argArr长度为3 ，则下面代码
  // 内部会执行  sum(argArr[0],argArr[1],argArr[2])
  return createFn(argArr.length)(argArr)
}
```

### 4.4、Function 构造函数：实现动态传递参数 - 优化版

```js
function createFn(argArrLength) {
  var code = 'return sum('
  for (var i = 0; i < argArrLength; i++) {
    if (i > 0) {
      code += ','
    }
    code += 'argArr[' + i + ']'
  }
  code += ')'

  return new Function('argArr', code)
}
```

**以上方法还有很大的局限性**

- 如果 fn 内部调用的函数不是`sum`是`add`、`min`、`max`呢 ？
- 那就得把最开始的`var code='return sum('` 修改成`var code='return add('`
- 为了让所有代码都能通用，我们把上面函数再做简单修改，修改如下：

```js
function createFn(argArrLength) {
  var code = 'return fnName('
  for (var i = 0; i < argArrLength; i++) {
    if (i > 0) {
      code += ','
    }
    code += 'argArr[' + i + ']'
  }
  code += ')'

  return new Function('argArr', 'fnName', code)
}
```

- 这样修改后，不管 fn 内部调用的函数名是什么，我们只需要在调用 createFn 函数时，把对应的函数名传进去就可以了。

```js
return createFn(argArr.length)(argArr, add) // fn内调用add函数

return createFn(argArr.length)(argArr, min) // fn内调用min函数
```

### 4.5、解决 call 方法内部动态传参问题

- 我们需要根据 argArr 的长度，来动态创建一个如下形式的函数

```js
/**
 * 如果argArr长度为 3，则创建如下函数
 *  context 上下文对象，call中的第一个参数
 *  key 对象context的属性名
 *  argArrs参数数组
 */
function anonymous(context, key, argArr) {
  return context[key](argArr[0], argArr[1], argArr[2])
}

// 如果argArr 长度为2，则创建如下函数
function anonymous(context, key, argArr) {
  return context[key](argArr[0], argArr[1])
}
```

- 创建上面函数的函数

```js
/**
 * 此函数用来处理call内部动态传参问题，根据数组长度来创建函数
 * argsLength 传入的数组的长度
 */
function createFun(argsLength) {
  // 动态创建函数体执行代码
  var code = 'return context[key]('
  // 拼接参数
  for (var i = 0; i < argsLength; i++) {
    // 第二个开始加逗号
    if (i > 0) {
      code += ','
    }
    code += 'argArr[' + i + ']'
  }
  code += ')'

  //  return context[key](args[0],args[1],args[2]....)
  // 函数前三个参数分别代表： 执行上下文   属性名    参数   context[key](args)
  // 但args是数组，所以需要动态的来拼接，不能直接用
  return new Function('context', 'key', 'argArr', code)
}
```

- 完整版代码

```js
Function.prototype._call = function (context) {
  // 判断调用 call方法的对象，是不是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('Type Error !')
  }
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new Object(context)

  // 随机生成一个属性名，保证context对象身上没有与之同名的属性
  var key = 'fn_' + Math.random() * new Date().getTime()
  while (context.hasOwnProperty(key)) {
    key = 'fn_' + Math.random() * new Date().getTime()
  }

  context[key] = this

  // 解决动态传参问题
  var argArr = []
  var len = arguments.length
  for (var i = 1; i < len; i++) {
    argArr[i - 1] = arguments[i]
  }
  // 动态传参，用函数来解决
  var result = createFun(len - 1)(context, key, argArr)

  // var result = context[key](...args);
  delete context[key]
  return result
}

function createFun(argsLength) {
  // 动态创建函数体执行代码
  var code = 'return context[key]('
  // 拼接参数，第二个起是参数
  for (var i = 0; i < argsLength; i++) {
    if (i > 0) {
      code += ','
    }
    code += 'argArr[' + i + ']'
  }
  code += ')'
  return new Function('context', 'key', 'argArr', code)
}
```

### 5、手写 apply 方法（经典面试题）

- apply 和 call 方法一样，未一的区别就在于，其后的参数是数组
- 所以要判断下，传过来的值是不是数组类型，如果不是，则赋值一个空数组

```js
Function.prototype._apply = function (context, args = []) {
  // 判断传过来的是不是一个数组,不是就赋值一个空数组
  args = Array.isArray(args) ? args : []
  // 如果传过来的是null 或undefind，则this指向window
  // null ==null 返回true  undefined==null也是true
  // globalThis 在浏览器中指向window ，在nodejs中指向global
  if (context == null) context = globalThis
  // 如果传过来的是基本数据类型（原始数据类型）
  // new Object(1) 转成 Number {1} ....
  if (typeof context !== 'object') context = new Object(context)

  // 创建一个变量，用来做为context对象的属性
  // 防止属性名与context身上的属性重名，则我们需要用Symbol();方式来创建
  var key = Symbol()
  // 这里的this指向的是函数本身，把函数转换成context身上的方法
  context[key] = this
  // 调用函数，取得函数的返回结果
  var result = context[key](...args)
  // 这里要特别注意，我们并没有真正的在context对象上，创建了属性
  // 所以这里要把创建的属性，使用完，删除掉
  delete context[key]
  // 返回执行结果
  return result
}
```

### 6、手写 bind 方法

- bind 的方法在 Function 的原型上

```js
Function.prototype._bind = function () {}
```

- bind 的第一个参数是更改原函数中的 this 指向，后面参数个数不限

```js
Function.prototype._bind = function (context) {}
```

- bind 函数的返回值，又是一个函数

```js
Function.prototype._bind = function (context) {
  return function () {}
}
```

- 返回值相当于是对原函数的拷贝，调用返回值函数，其内部相当于直接调用了原函数，并返回回结果
- 原函中的 this 要指定为 bind 的第一个参数，后面的参数作为原函数的参数被传递
- 改变原函数中 this，可以用`原函数.apply(context)`方法
- 用 concat 来拼接两次调用函数传来参数

```js
Function.prototype._bind = function (context) {
  var self = this // 保存原函数
  // 第一次传入的参数
  var arg1 = Array.prototype.slice(arguments, 1)
  return function () {
    // 第二次传入的参数
    var arg2 = Array.prototype.slice(arguments)
    // 合并两次传入的参数
    var arg = arg1.concat(arg2)
    self.apply(context, arg)
  }
}
```

### 6.1、考虑 bind 返回的新函数作为构造函数的情况

- bind 的新函数作为构造函数，其内部 this 指向的还是原函数 new 出来的实例对象
- 同时内部相当于直接调用了 `new 原函数()`

```js
Function.prototype._bind = function (context) {
  var self = this // 保存原函数
  // 第一次传入的参数
  var arg1 = Array.prototype.slice.call(arguments, 1)
  return function fn() {
    // 第二次传入的参数
    var arg2 = Array.prototype.slice.call(arguments)
    // 合并两次传入的参数
    var arg = arg1.concat(arg2)
    // 如果this指向的是fn的实例,则说明外部是以构造函数形式调用的
    if (this instanceof fn) {
      return new self(...arg1, ...arg2)
    } else {
      return self.apply(context, arg)
    }
  }
}
```

### 6.2、考虑调用 bind 的对象不是一个函数

- 如果 bind 的第一个参数 thisArg 是
- 一个 `null` 或 `undefined` 时，其函数会自动将 this 替换为指向全局对象
- 如果 thisArg 是一个原始值会被包装成一个对象

```js
// 如果传过来的是null 或undefind，则this指向window
// null ==null 返回true  undefined==null也是true
// globalThis 在浏览器中指向window ，在nodejs中指向global
if (context == null) context = globalThis
// 如果传过来的是基本数据类型（原始数据类型）
// new Object(1) 转成 Number {1} ....
if (typeof context !== 'object') context = new Object(context)
```

### 6.3、完整代码

```js
Function.prototype._bind = function (context) {
  // null ==null 返回true  undefined==null也是true
  // globalThis 在浏览器中指向window ，在nodejs中指向global
  if (context == null) context = globalThis
  // 如果传过来的是基本数据类型（原始数据类型）
  // new Object(1) 转成 Number {1} ....
  if (typeof context !== 'object') context = new Object(context)

  var self = this // 保存原函数
  // 第一次传入的参数
  var arg1 = Array.prototype.slice.call(arguments, 1)
  function fn() {
    // 第二次传入的参数
    var arg2 = Array.prototype.slice.call(arguments)
    // 合并两次传入的参数
    var arg = arg1.concat(arg2)
    // 如果this指向的是fn的实例,则说明外部是以构造函数形式调用的
    if (this instanceof fn) {
      return new self(...arg1, ...arg2)
    } else {
      return self.apply(context, arg)
    }
  }
  return fn
}

function Point(x, y) {
  this.x = x
  this.y = y
  // console.log(this.x, this.y);
}
Point.prototype.toString = function () {
  return this.x + ',' + this.y
}

var point = Point._bind([], 0)
var p = new point(5, 9)
console.log(p.toString())

// 测试样例
var obj = {
  a: 1,
  b: 2,
  c: 3,
}
function sum(a, b, c) {
  console.log(this.a, this.b, c)
}
var fn = sum.bind(obj, 6)
fn(3, 4)
```

### 7、说说你对原型链的理解 ？（腾讯、货拉拉、字节、招银、阿里、小米）

**原型的定义**

- JavaScript 中的每一个函数身上都有 prototype 属性，我们称之为**原型**，而原型本身也是一个对象
- 构造函数的原型 prototype 对象中有一个属性 constructor，指向构造函数本身

```js
构造函数.prototype.constructor === 构造函数
```

**原型的作用**

- 普通函数的原型是没什么用
- 主要是构造函数的原型作用比较大

**构造函数原型的作用**

- 构造函数的原型本质上相当是一个公共的区域，所有有这个构造函数构造出来的对象，都可以访问这个构造函数原型上的方法和属性
- 所以我们可以把所有实例共享的方法或属性添加到构造函数的原型中去。

```js
实例.__proto__ === 构造函数.prototype
```

**原型链接查找**

- 当对象调用某个属性或方法时，会先在自身查找，如果能找到，就用自身的
- 如果没有，就会沿着原型链一层一层往上找，找到就用
- 如果一直找到原型链的终点都没有找到，返回`undefined`

> 对象的实例，会继承构造函数原型上的所有属性和方法

### 8、原型链的终点是什么 ？（货拉拉）

- 原型链的终点就是 Object 的原型的原型，Object 原型的的原型指向`null`

```js
Object.prototype.__proto__ === null // true
```

### 9、[] 的原型链是什么 ？（腾讯）

- 数组是 Array 构造函数构造出来的，所以[]的原型指向 Array 的原型

```js
;[].__proto === Array.prototype
```

- Array 的原型的原型指向 Object 的原型

```js
Array.prototype.__proto__ === Object.prototype // true
```

- 原型链的终点就是 Object 的原型的原型，Object 原型的的原型指向`null`

```js
Object.prototype.__proto__ === null // true
```

## 十三、重难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、重点

- 对象创建的几种方式
- 对象属性的增、删、改、查（遍历）操作
- this 关键字的应用场景及用法
- 构造函数创建的整个过程
- 判断数据类型有那些方法，这些方法有什么优缺点
- 画下数组的原型链图
- `in`、`instanceof`操作符和`hasOwnProperty`方法的应用
- 类数组转数组的方法

### 2、难点

- 手写 call、apply、bind 方法
- 手写对象的深克隆
- 手写 getType 方法
- 说说你对原型链的理解
