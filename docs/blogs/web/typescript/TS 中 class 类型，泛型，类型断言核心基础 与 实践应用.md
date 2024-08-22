---
title: TS 中 class 类型，泛型，类型断言核心基础 与 实践应用
date: 2023-10-28
sidebar: 'auto'
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TS 中 class 类型，泛型，类型断言核心基础 与 实践应用

从本节正式开始学习 class 类型，泛型，类型断言的核心基础 和 应用实践。

- class 类型
- 泛型
- 类型断言

## 一、TS 中的 class 类型

在 ES6 中引入 `class` 关键字，我们终于可以向传统的面向对象语言那样去创建一个类了。总体上来讲 TS 的类覆盖了 ES6 的类，同时也引入了其他特性，接下来我们会重点比较它们两者之间的不同。

类（class）是面向对象编程的基本构件，封装了属性和方法，TypeScript 给予了全面支持。

### 1、属性的类型

类的属性可以在顶层声明，也可以在构造方法内部声明。

对于顶层声明的属性，可以在声明时同时给出类型。

```tsx
class Count {
  a: number
  b: number
}

// 属性 a 和 b 的类型都是 number
```

如果不给出类型，TypeScript 会认为`a`和`b`的类型都是`any`

```tsx
class Count {
  a
  b
}

// a 和 b 的类型都是 any
```

如果声明时给出初值，可以不写类型，TypeScript 会自行推断属性的类型。

```tsx
class Count {
  a = 2
  b = 3
}

// 属性 a 和 b 的类型都会被推断为 number
```

### 1.1、属性的类型 - 注意事项

TypeScript 有一个配置项`strictPropertyInitialization`，只要打开（默认是打开的），就会检查属性是否设置了初值，如果没有就报错。

```tsx
class Count {
  a: number // 报错
  b: number // 报错
}
```

以上代码中，如果类的顶层属性不赋值，就会报错。如果不希望出现报错，可以使用非空断言。

```tsx
class Count {
  a!: number // 正确
  b!: number // 正确
}

// 属性 a 和 b 没有初值，但是属性名后面添加了感叹号，表示这两个属性肯定不会为空，所以 TypeScript 就不报错了，后面 类型断言 部分还会详细讲解。
```

### 2、readonly 修饰符

属性名前面加上 readonly 修饰符，就表示该属性是只读的。实例对象不能修改这个属性。

```tsx
class A {
  readonly id = '1001'
}

const a = new A()
a.id = '1003' // 报错

// id 属性前面有 readonly 修饰符，实例对象修改这个属性就会报错
```

readonly 属性的初始值，可以写在顶层属性，也可以写在构造方法里面。

```tsx
class A {
  readonly id: string

  constructor() {
    this.id = '1001' // 正确
  }
}
```

以上代码中，构造方法内部设置只读属性的初值，这是可以的。

```tsx
class A {
  readonly id: string = '1001'

  constructor() {
    this.id = '1003' // 正确
  }
}

// 构造方法修改只读属性的值也是可以的
// 或者说，如果两个地方都设置了只读属性的值，以构造方法为准
// 在其他方法修改只读属性都会报错
```

### 3、方法的类型

类的方法就是普通函数，类型声明方式与函数一致。

```tsx
class Count {
  a: number
  b: number

  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }

  add(count: Count) {
    return new Count(this.a + count.a, this.b + count.b)
  }
}

// 构造方法 constructor() 和 普通方法 add() 都注明了参数类型，但是省略了返回值类型，因为 TypeScript 可以自己推断出来
```

类的方法跟普通函数一样，可以使用参数默认值，以及函数重载。

> 以下是参数默认值的例子

```tsx
class Count {
  a: number
  b: number

  constructor(a = 0, b = 0) {
    this.a = a
    this.b = b
  }
}

// 如果新建实例时，不提供属性 a 和 b 的值，它们都等于默认值 0
```

以下是函数重载的例子

```tsx
class Count {
  constructor(a: number, b: string)
  constructor(s: string)
  constructor(as: number | string, b?: string) {
    // ...
  }
}

// 构造方法可以接受一个参数，也可以接受两个参数，采用函数重载进行类型声明
```

另外，构造方法不能声明返回值类型，否则报错，因为它总是返回实例对象。

```tsx
class B {
  constructor(): object {
    // 报错
    // ...
  }
}

// 构造方法声明了返回值类型 object，导致报错
```

### 4、存取器方法

存取器（accessor）是特殊的类方法，包括取值器（getter）和 存值器（setter）两种方法。

它们用于读写某个属性，取值器用来读取属性，存值器用来写入属性。

```tsx
class C {
  _username = ''
  get username() {
    return this._username
  }
  set username(value) {
    this._username = value
  }
}

// get username() 是取值器，其中get是关键词，name是属性名
// 外部读取 username 属性时，实例对象会自动调用这个方法，该方法的返回值就是 username 属性的值。
```

注：

`set username()`是存值器，其中`set`是关键词，`username`是属性名。

外部写入`username`属性时，实例对象会自动调用这个方法，并将所赋的值作为函数参数传入。

### 5、存取器的规则

TypeScript 对存取器有以下 3 种规则

- ①、如果某个属性只有`get`方法，没有`set`方法，那么该属性自动成为只读属性。

```tsx
class C {
  _username = 'icoding'

  get username() {
    return this._username
  }
}

const c = new C()
c.username = 'ibc' // 报错

// username 属性没有 set 方法，对该属性赋值就会报错
```

- ②、TypeScript 5.1 版之前，`set`方法的参数类型，必须兼容`get`方法的返回值类型，否则报错

```tsx
// TypeScript 5.1 版之前
class C {
  _username = ''
  get username(): string {
    // 报错
    return this._username
  }
  set username(value: number) {
    this._username = String(value)
  }
}

// set 方法的参数类型（number|string）兼容 get 方法的返回值类型（string），这是允许的
```

> TypeScript 5.1 版做出了[改变 (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#unrelated-types-for-getters-and-setters)，现在两者可以不兼容。

- ③、`get`方法与`set`方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

### 6、属性索引

类允许定义属性索引。

```tsx
class Test {
  [s: string]: boolean | ((s: string) => boolean)

  get(s: string) {
    return this[s] as boolean
  }
}

// [s:string] 表示所有属性名类型为字符串的属性，它们的属性值要么是布尔值，要么是返回布尔值的函数
```

注意，由于类的方法是一种特殊属性（属性值为函数的属性），所以属性索引的类型定义也涵盖了方法。如果一个对象同时定义了属性索引和方法，那么前者必须包含后者的类型。

```tsx
class Test {
  [s: string]: boolean
  f() {
    // 报错
    return true
  }
}

//
```

以上代码中，属性索引的类型里面不包括方法，导致后面的方法`f()`定义直接报错。正确的写法是下面这样

```tsx
class Test {
  [s: string]: boolean | (() => boolean)
  f() {
    return true
  }
}
```

属性存取器视同属性。

```tsx
class Test {
  [s: string]: boolean

  get isInstance() {
    return true
  }
}

// 属性 inInstance 的读取器虽然是一个函数方法，但是视同属性，所以属性索引虽然没有涉及方法类型，但是不会报错
```

### 7、ES6 与 TS 中的 class

TS 中类的基本实现

```tsx
// 定义一个 People 类，与 ES 不同的是，我们为成员属性添加了类型注解
class People {
  // 构造函数的参数添加了类型注解
  // 构造函数的返回值会自动推断为 People，即该类的本身（鼠标划上去即可看到）
  constructor(username: string) {
    this.username = username
  }
  username: string
  // run() 方法的默认返回值是 void（鼠标划上去即可看到）
  run() {}
}
```

注：

- 无论在 ES 或 TS 中， 类成员的属性都是实例属性，而不是原型属性；
- 而类成员的方法都是实例方法；

打印 People 类的原型，对比看结果

```tsx
class People {
  constructor(username: string) {
    this.username = username
  }
  username: string
  run() {}
}

// 打印输出 类的原型
console.log(People.prototype) // {constructor: ƒ, run: ƒ}
```

将编译后的 JS 文件，在浏览器中运行可查看结果

![image-20230628150612196](https://www.arryblog.com/assets/img/image-20230628150612196-16937422975471.d0080e2e.png)

> 从上边打印的结果可以看到，它是不包含 `username` 属性的，只有 constructor 和 run 方法

创建一个类的实例，并打印输出类的实例

```tsx
class People {
  constructor(username: string) {
    this.username = username
  }
  username: string
  run() {}
}

// 打印输出 类的原型
console.log(People.prototype) // {constructor: ƒ, run: ƒ}

// 创建一个类的实例
let people = new People('艾编程')
console.log(people) // People { username: '艾编程' }
```

![image-20230629151827332](https://www.arryblog.com/assets/img/image-20230629151827332-16937422975472.be0b2123.png)

注：

通过以上打印输出类实例的结果，对比可以看到

- `username` 属性只在实例上而不在原型上；
- 与 ES 中不同的是，实例的属性必须具有初始值 或 在构造函数中被初始化。即 `this.username = username` （如果删掉该初始化的语句，那么编译器就会提示我们必须要赋一个初始的值）。如下

```tsx
class People {
  constructor(username: string) {
    // this.username = username
    // 删掉该初始化的语句，编辑器就会报错提示：必须要赋一个初始的值
  }
  // 赋一个初始的值
  // username: string = 'arry'
  // 或 将 username 设置为可选属性，也会不报错
  username?: string
  run() {}
}

// 打印输出 类的原型
console.log(People.prototype) // {constructor: ƒ, run: ƒ}

// 创建一个类的实例
let people = new People('艾编程')
console.log(people) // People { username: '艾编程' }
```

## 二、类的 interface 接口

接口在 TS 中是一个非常重要的概念，接口可以用来约束对象、函数、以及类的结构 和 类型，这是一种代码协作的契约，我们必须遵守而且不能改变。

### 1、implements 关键字

interface 接口或 type 别名，可以用对象的形式，为 class 指定一组检查条件。

然后，类使用 implements 关键字，表示当前类满足这些外部类型条件的限制。

```tsx
interface User {
  username: string
  desc: string
}
// 或者
type User = {
  username: string
  desc: string
}

class Allen implements User {
  username = ''
  desc = ''
}

// interface 或 type 都可以定义一个对象类型
// 类 Allen 使用 implements 关键字，表示该类的实例对象满足这个外部类型
```

interface 只是指定检查条件，如果不满足这些条件就会报错。它并不能代替 class 自身的类型声明。

```tsx
interface A {
  get(username: string): boolean
}

class B implements A {
  // s 的类型是 any
  get(s) {
    return true
  }
}
```

以上代码中，类`B`实现了接口`A`，但是后者并不能代替`B`的类型声明。

因此，`B`的`get()`方法的参数`s`的类型是`any`，而不是`string`。`B`类依然需要声明参数`s`的类型。

```tsx
class B implements A {
  get(s: string) {
    return true
  }
}
```

### 1.1、implements 实践

```tsx
interface User {
  username: string
  age?: number
}

class Allen implements User {
  username = 'icoding'
}

const a = new Allen()
a.age = 18 // 报错
```

以上代码中，接口`User`有一个可选属性`age`，类`Allen`没有声明这个属性，所以可以通过类型检查。

但是，如果给`Allen`的实例对象的属性`age`赋值，就会报错。所以，`Allen`类还是需要声明可选属性`age`。如下

```tsx
interface User {
  username: string
  age?: number
}

class Allen implements User {
  username = 'icoding'
  // 声明可选属性 age
  age?: number
}

const a = new Allen()
a.age = 18
```

### 1.2、implements 注意事项

类可以定义接口没有声明的方法和属性。

```tsx
interface Count {
  x: number
  y: number
}

class Nums implements Count {
  x = 1
  y = 2
  // 定义一个接口没有的属性
  z: number = 3
}

// Nums 类实现了 Count 接口，但是内部还定义了一个额外的属性 z，这是允许的，表示除了满足接口给出的条件，类还有额外的条件。
```

`implements`关键字后面，不仅可以是接口，也可以是另一个类。这时，后面的类将被当作接口。

```tsx
class Person {
  id: number = 1
  run(): void {}
}

class Allen implements Person {
  id = 2 // 不可省略
  run(): void {} // 不可省略
}

// implements 后面是类 Person，这时 TypeScript 就把 Person 视为一个接口，要求 Allen 实现 Person 里面的每一个属性和方法，否则就会报错。
// 所以，这时不能因为 Person 类已经实现过一次，而在 Allen 类省略属性或方法。
```

注：

interface 描述的是类的对外接口，也就是实例的公开属性和公开方法，不能定义私有的属性和方法。

这是因为 TypeScript 设计者认为，私有属性是类的内部实现，接口作为模板，不应该涉及类的内部代码写法。

```tsx
interface Foo {
  member: {} // 报错
}

// 接口 Foo 有一个私有属性，结果就报错了
```

### 2、实现多个接口

类可以实现多个接口（其实是接受多重限制），每个接口之间使用逗号分隔。

```tsx
class User implements Student, Engineer, Doctor {
  // ...
}

// User 类同时实现了 Student、Engineer、 Doctor三个接口
// 这意味着，它必须部署这三个接口声明的所有属性和方法，满足它们的所有条件
```

> 但是，同时实现多个接口并不是一个好的写法，容易使得代码难以管理，可以使用两种方法替代。

### 2.1、方式一：类的继承

```tsx
class User implements Student {}

class CollegeStudent extends User implements Engineer, Doctor {}

// User 类实现了 Student，而 CollegeStudent 类继承了 User 类，然后再实现Engineer 和 Doctor 两个接口，相当于 CollegeStudent 类同时实现了三个接口。
```

### 2.2、方式二：接口的继承

```tsx
interface User {
  username: string
}

interface Student extends User {
  age: number
}

// 接口 Student 继承了接口 User，类只要实现接口 Student，就相当于实现 User 和 Student 两个接口。
```

### 2.3、接口继承改写

```tsx
interface Student {
  // ...
}
interface Engineer {
  // ...
}
interface Doctor {
  // ...
}

interface SuperUser extends Student, Engineer, Doctor {
  // ...
}

class AdministratorUser implements SuperUser {
  // ...
}

// 类 AdministratorUser 通过 SuperUser 接口，就间接实现了多个接口
```

### 2.4、注意事项

发生多重实现时（即一个接口同时实现多个接口），不同接口不能有互相冲突的属性。

```tsx
interface Engineer {
  foo: number
}

interface Doctor {
  foo: string
}

// 属性 foo 在两个接口里面的类型不同，如果同时实现这两个接口，就会报错。
```

### 3、类与接口的合并

TypeScript 不允许两个同名的类，但是如果一个类和一个接口同名，那么接口会被合并进类。

```tsx
class A {
  x: number = 1
}

interface A {
  y: number
}

let a = new A()
a.y = 10

a.x // 1
a.y // 10

// 类 A 与 接口 A 同名，后者会被合并进前者的类型定义
```

注：

合并进类的非空属性（上例的`y`），如果在赋值之前读取，会返回`undefined`。

```tsx
class A {
  x: number = 1
}

interface A {
  y: number
}

let a = new A()
a.y // undefined

// 根据类型定义，y 应该是一个非空属性
// 但是合并后，y 有可能是 undefined
```

## 三、Class 类型

深入浅出 Class 类型，实例类型、类的自身类型、结构类型原则、类的继承等。

### 1、实例类型

TypeScript 的类本身就是一种类型，但是它代表该类的实例类型，而不是 class 的自身类型。

```tsx
class User {
  username: string

  constructor(username: string) {
    this.username = username
  }
}

const allen: User = new User('allen')

// 定义了一个类 User。它的类名就代表一种类型，实例对象 allen 就属于该类型
```

对于引用实例对象的变量来说，既可以声明类型为 Class，也可以声明类型为 Interface，因为两者都代表实例对象的类型。

```tsx
interface Student {}

class User implements Student {}

// 写法一
const u1: User = new User()
// 写法二
const u2: Student = new User()

// 变量的类型可以写成类 User，也可以写成接口 Student
// 它们的区别是，如果类 User 有接口 Student 没有的属性和方法，那么只有变量 u1 可以调用这些属性和方法。
```

作为类型使用时，类名只能表示实例的类型，不能表示类的自身类型。

```tsx
class Count {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

// 错误
function createCount(CountClass: Count, x: number, y: number) {
  return new CountClass(x, y)
}

// 函数 createCount() 的第一个参数 CountClass，需要传入 Count 这个类，但是如果把参数的类型写成 Count 就会报错，因为Point描述的是实例类型，而不是 Class 的自身类型
```

注：

由于类名作为类型使用，实际上代表一个对象，因此可以把类看作为对象类型起名。

事实上，TypeScript 有三种方法可以为对象类型起名：type、interface 和 class。

### 2、类的自身类型

要获得一个类的自身类型，一个简便的方法就是使用 typeof 运算符。

```tsx
class Count {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

function createCount(CountClass: typeof Count, x: number, y: number): Count {
  return new CountClass(x, y)
}

// createCount() 的第一个参数 CountClass 是 Count 类自身，要声明这个参数的类型，简便的方法就是使用 typeof Count
// 因为 Count 类是一个值，typeof Count 返回这个值的类型
// 注意，createCount() 的返回值类型是 Count，代表实例类型
```

JavaScript 语言中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。

```tsx
class Count {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

function createCount(CountClass: new (x: number, y: number) => Count, x: number, y: number): Count {
  return new CountClass(x, y)
}

// 参数 CountClass 的类型写成了一个构造函数，这时就可以把 Count 类传入
```

构造函数也可以写成对象形式，所以参数`CountClass`的类型还有另一种写法。

```tsx
class Count {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

function createCount(
  CountClass: {
    new (x: number, y: number): Count
  },
  x: number,
  y: number,
): Count {
  return new CountClass(x, y)
}
```

根据上面的写法，可以把构造函数提取出来，单独定义一个接口（interface），这样可以大大提高代码的通用性。

```tsx
class Count {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

interface CountConstructor {
  new (x: number, y: number): Count
}

function createCount(CountClass: CountConstructor, x: number, y: number): Count {
  return new CountClass(x, y)
}
```

总结：

类的自身类型就是一个构造函数，可以单独定义一个接口来表示。

### 3、结构类型原则

Class 也遵循“结构类型原则”。一个对象只要满足 Class 的实例结构，就跟该 Class 属于同一个类型。

```tsx
class Foo {
  id!: number
}

function fn(arg: Foo) {
  // ...
}

const bar = {
  id: 10,
  amount: 100,
}

fn(bar) // 正确

// 对象 bar 满足类 Foo 的实例结构，只是多了一个属性 amount
// 所以，它可以当作参数，传入函数 fn()
```

如果两个类的实例结构相同，那么这两个类就是兼容的，可以用在对方的使用场合。

```tsx
class Person {
  username: string
}

class Customer {
  username: string
}

// 正确
const cust: Customer = new Person()

// Person 和 Customer是两个结构相同的类，TypeScript 将它们视为相同类型，因此 Person 可以用在类型为 Customer 的场合
```

现在修改一下代码，`Person`类添加一个属性。

```tsx
class Person {
  username: string
  age: number
}

class Customer {
  username: string
}

// 正确
const cust: Customer = new Person()

// Person 类添加了一个属性 age，跟 Customer 类的结构不再相同
// 但是这种情况下，TypeScript 依然认为，Person 属于 Customer 类型
```

这是因为根据“结构类型原则”，只要`Person`类具有`username`属性，就满足`Customer`类型的实例结构，所以可以代替它。

反过来就不行，如果`Customer`类多出一个属性，就会报错。

```tsx
class Person {
  username: string
}

class Customer {
  username: string
  age: number
}

// 正确
const cust: Customer = new Person()

// Person 类 比 Customer 类 少一个属性 age，它就不满足 Customer 类型的实例结构，就报错了
// 因为在使用 Customer 类型的情况下，可能会用到它的 age 属性，而 Person 类就没有这个属性
```

总之，只要 A 类具有 B 类的结构，哪怕还有额外的属性和方法，TypeScript 也认为 A 兼容 B 的类型。

不仅是类，如果某个对象跟某个 class 的实例结构相同，TypeScript 也认为两者的类型相同。

```tsx
class Person {
  username: string
}

const obj = { username: 'Allen' }
const p: Person = obj // 正确

// 对象 obj 并不是 Person 的实例，但是赋值给变量 p 不会报错，TypeScript 认为 obj 也属于 Person 类型，因为它们的属性相同
```

由于这种情况，运算符`instanceof`不适用于判断某个对象是否跟某个 class 属于同一类型。

```tsx
obj instanceof Person // false

// 运算符 instanceof 确认变量 obj 不是 Person 的实例，但是两者的类型是相同的。
```

空类不包含任何成员，任何其他类都可以看作与空类结构相同。因此，凡是类型为空类的地方，所有类（包括对象）都可以使用。

```tsx
class Empty {}

function fn(x: Empty) {
  // ...
}

fn({})
fn(window)
fn(fn)

// 函数 fn() 的参数是一个空类，这意味着任何对象都可以用作 fn() 的参数
```

### 3.1、结构类型原则 - 注意事项

注意，确定两个类的兼容关系时，只检查实例成员，不考虑静态成员和构造方法。

```tsx
class Count {
  x: number
  y: number
  static t: number
  constructor(x: number) {}
}

class Position {
  x: number
  y: number
  z: number
  constructor(x: string) {}
}

const count: Count = new Position('')

// Count 与 Position 的静态属性和构造方法都不一样，但因为 Count 的实例成员 与 Position 相同，所以 Position 兼容 Count
```

如果类中存在私有成员（private）或保护成员（protected），那么确定兼容关系时，TypeScript 要求私有成员和保护成员来自同一个类，这意味着两个类需要存在继承关系。

```tsx
// 情况一
class A {
  private username = 'a'
}

class B extends A {}

const a: A = new B()

// 情况二
class A {
  protected username = 'a'
}

class B extends A {
  protected username = 'b'
}

const a: A = new B()

// A 和 B 都有私有成员（或保护成员）username，这时只有在 B 继承 A 的情况下（class B extends A），B 才兼容 A
```

### 4、类的继承

类（这里又称“子类”）可以使用 extends 关键字继承另一个类（这里又称“基类”）的所有属性和方法。

```tsx
class A {
  greet() {
    console.log('Hello, world!')
  }
}

class B extends A {}

const b = new B()
b.greet() // "Hello, world!"

// 子类 B 继承了基类 A，因此就拥有了 greet() 方法，不需要再次在类的内部定义这个方法了
```

根据结构类型原则，子类也可以用于类型为基类的场合。

```tsx
const a: A = b
a.greet()

// 变量 a 的类型是基类，但是可以赋值为子类的实例
```

子类可以覆盖基类的同名方法

```tsx
class A {
  greet() {
    console.log('Hello, world!')
  }
}

class B extends A {
  greet(username?: string) {
    if (username === undefined) {
      super.greet()
    } else {
      console.log(`Hello, ${username}`)
    }
  }
}

// 子类 B 定义了一个方法 greet()，覆盖了基类 A 的同名方法
// 其中，参数 username 省略时，就调用基类 A 的 greet() 方法，这里可以写成super.greet()，使用 super 关键字指代基类是常见做法
```

但是，子类的同名方法不能与基类的类型定义相冲突。

```tsx
class A {
  greet() {
    console.log('Hello, world!')
  }
}

class B extends A {
  // 报错
  greet(username: string) {
    console.log(`Hello, ${username}`)
  }
}

// 子类 B 的 greet() 有一个 username 参数，跟基类 A 的 greet() 定义不兼容，因此就报错了
```

如果基类包括保护成员（`protected`修饰符），子类可以将该成员的可访问性设置为公开（`public`修饰符），也可以保持保护成员不变，但是不能改用私有成员（`private`修饰符）

```tsx
class A {
  protected x: string = ''
  protected y: string = ''
  protected z: string = ''
}

class B extends A {
  // 正确
  public x: string = ''

  // 正确
  protected y: string = ''

  // 报错
  private z: string = ''
}

// 子类 B 将基类 A 的受保护成员改成私有成员，就会报错
```

注意，`extends`关键字后面不一定是类名，可以是一个表达式，只要它的类型是构造函数就可以了。

```tsx
// 例一
class MyArray extends Array<number> {}

// 例二
class MyError extends Error {}

// 例三
class A {
  running() {
    return "I'm A, I like running"
  }
}
class B {
  running() {
    return "I'm B, I like running"
  }
}

interface Admin {
  running(): string
}

interface AdminConstructor {
  new (): Admin
}

function getAdminBase(): AdminConstructor {
  return Math.random() >= 0.5 ? A : B
}

class Test extends getAdminBase() {
  sayHello() {
    console.log(this.running())
  }
}

// 例一 和 例二的 extends 关键字后面都是构造函数
// 例三的 extends 关键字后面是一个表达式，执行后得到的也是一个构造函数
```

对于那些只设置了类型、没有初值的顶层属性，有一个细节需要注意。

```tsx
interface Person {
  personName: any
}

interface Allen extends Person {
  allenName: any
}

class PersonHouse {
  user: Person

  constructor(person: Person) {
    this.user = person
  }
}

class AllenHouse extends PersonHouse {
  user: Allen

  constructor(allen: Allen) {
    super(allen)
  }
}

// 类 AllenHouse 的顶层成员 user 只设置了类型（Allen），没有设置初值
// 这段代码在不同的编译设置下，编译结果不一样
```

如果编译设置的`target`设成大于等于`ES2022`，或者`useDefineForClassFields`设成`true`，那么下面代码的执行结果是不一样的。

```tsx
// 实例化运行
const allen = {
  personName: 'person',
  allenName: 'allen',
}

const allenHouse = new AllenHouse(allen)
console.log(allenHouse.user)

// 编译后运行 JS 文件
// 如果 target 大于等于 ES2022 ，输出 undefined
// 如果 target 小于 ES2022 ，输出 { personName: 'person', allenName: 'allen' }
```

以上代码中，`AllenHouse`实例的属性`user`输出的是`undefined`，而不是预料的`allen`。

原因在于 ES2022 标准的 Class Fields 部分，与早期的 TypeScript 实现不一致，导致子类的那些只设置类型、没有设置初值的顶层成员在基类中被赋值后，会在子类被重置为`undefined`，详细的解释参见后边 `tsconfig.json` 一节，以及官方 3.7 版本的[发布说明 (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier)。

解决方法就是使用`declare`命令，去声明顶层成员的类型，告诉 TypeScript 这些成员的赋值由基类实现。

```tsx
interface Person {
  personName: any
}

interface Allen extends Person {
  allenName: any
}

class PersonHouse {
  user: Person

  constructor(person: Person) {
    this.user = person
  }
}

class AllenHouse extends PersonHouse {
  // 使用 declare 命令后，不报错
  declare user: Allen

  constructor(allen: Allen) {
    super(allen)
  }
}

// resident 属性的类型声明前面用了 declare 命令，这样就能确保在编译目标大于等于 ES2022 时（或者打开 useDefineForClassFields 时），代码行为正确。

const allen = {
  personName: 'person',
  allenName: 'allen',
}

const allenHouse = new AllenHouse(allen)
console.log(allenHouse.user)
```

### 5、可访问性修饰符

类的内部成员的外部可访问性，由三个可访问性修饰符（access modifiers）控制：

- public 公有成员
- private 私有成员
- protected 受保护成员

> 这三个修饰符的位置，都写在属性或方法的最前面。

### 5.1、public

`public`修饰符表示这是公开成员，外部可以自由访问。

类的所有属性默认都是 public，即： 对所有人都是可见的，同时也可以显示的声明

```tsx
class User {
  public runing() {
    console.log('I like running')
  }
}

const u = new User()
u.runing() // I like running

// runing() 方法前面的 public 修饰符，表示该方法可以在类的外部调用，即外部实例可以调用
```

注：

`public`修饰符是默认修饰符，如果省略不写，实际上就带有该修饰符。因此，类的属性和方法默认都是外部可访问的。

正常情况下，除非为了醒目和代码可读性，`public`都是省略不写的。

### 5.2、private

`private`修饰符表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员。

```tsx
class User {
  private username: string = 'icoding'
}

const u = new User()
u.username // 报错

class Allen extends User {
  showUserName() {
    console.log(this.username) // 报错
  }
}

// 属性 username 前面有 private 修饰符，表示这是私有成员
// 因此，实例对象和子类使用该成员，都会报错
```

注意，子类不能定义父类私有成员的同名成员。

```tsx
class User {
  private age = 0
}

class Allen extends User {
  age = 18 // 报错
}

// User 类有一个私有属性 age，子类 Allen 就不能定义自己的属性 age 了
```

如果在类的内部，当前类的实例可以获取私有成员。

```tsx
class User {
  private age = 18

  foo(obj: User) {
    console.log(obj.age)
  }
}

const u = new User()
u.foo(u) // 18

// 在类 User 内部， User 的实例对象可以获取私有成员 age
```

严格地说，`private`定义的私有成员，并不是真正意义的私有成员。

- 一方面，编译成 JavaScript 后，`private`关键字就被剥离了，这时外部访问该成员就不会报错。
- 另一方面，由于前一个原因，TypeScript 对于访问`private`成员没有严格禁止，使用方括号写法（`[]`）或者`in`运算符，实例对象就能访问该成员。

```tsx
class User {
  private age = 18
}

const u = new User()
u['age'] // 18

if ('age' in u) {
  // 正确
  // ...
}

// User 类的属性 age 是私有属性，但是实例使用方括号，就可以读取这个属性，或者使用 in 运算符检查这个属性是否存在，都可以正确执行。
```

由于`private`存在这些问题，加上它是 ES2022 标准发布前出台的，而 ES2022 引入了自己的私有成员写法`#propName`。因此建议不使用`private`，改用 ES2022 的写法，获得真正意义的私有成员。

```tsx
class User {
  #age = 18
}

const u = new User()
u['age'] // 报错

// 采用了 ES2022 的私有成员写法（属性名前加 #），TypeScript 就正确识别了实例对象没有属性 age，从而报错
```

构造方法也可以是私有的，这就直接防止了使用`new`命令生成实例对象，只能在类的内部创建实例对象。

这时一般会有一个静态方法，充当工厂函数，强制所有实例都通过该方法生成。

```tsx
class Singleton {
  private static instance?: Singleton

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}

const s = Singleton.getInstance()

// 以上使用私有构造方法，实现了单例模式
// 想要获得 Singleton 的实例，不能使用 new 命令，只能使用 getInstance() 方法
```

### 5.3、protected

`protected`修饰符表示该成员是受保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用。

```tsx
class User {
  protected age = 18
}

class Allen extends User {
  getAge() {
    return this.age
  }
}

const u = new User()
const a = new Allen()

u.age // 报错
const s = a.getAge() // 18

// 类 User 的属性 age 是保护成员，直接从实例读取该属性（u.age）会报错，但是子类B内部可以读取该属性。
```

子类不仅可以拿到父类的保护成员，还可以定义同名成员。

```tsx
class User {
  protected age = 18
}

class Allen extends User {
  age = 20
}

// 子类 Allen 定义了父类 User 的同名成员 age ，并且父类的 age 是保护成员，子类将其改成了公开成员。
// Allen 类的 age 属性前面没有修饰符，等同于修饰符是 public，外界可以读取这个属性。
```

在类的外部，实例对象不能读取保护成员，但是在类的内部可以。

```tsx
class User {
  protected age = 18

  foo(obj: User) {
    console.log(obj.age)
  }
}

const u = new User()

u.age // 报错
u.foo(u) // 1

// 属性 age 是类 User 的保护成员，在类的外部，实例对象 u 拿不到这个属性
// 但是，实例对象 u 传入类 User 的内部，就可以从 u 拿到 age
```

**完整的实践案例**

一个受保护成员只能在类 或 子类中访问，而不能在类的实例中访问

```tsx
class People {
  constructor(username: string) {
    this.username = username
  }
  public username: string
  run() {}
  private eat() {}

  // 受保护成员
  protected pro() {}
}

let people = new People('艾编程')
// 受保护成员不能在类的实例中访问，会报错
people.pro()

class Allen extends People {
  constructor(username: string, age: number) {
    super(username)
    this.age = age

    // 在子类中调用父类中受保护的成员，允许访问
    this.pro()
  }
  age: number
}
```

构造函数也能被声明为 protected

作用：当前类不能被实例化，只能被继承。就相当于声明了一个基类

```tsx
class People {
  // 构造函数也能被声明为 protected
  // 作用：当前类不能被实例化，只能被继承。就相当于声明了一个基类
  protected constructor(username: string) {
    this.username = username
  }
  public username: string
  run() {}
  private eat() {}

  // 受保护成员
  protected pro() {}
}

// 报错
let people = new People('艾编程')
// 受保护成员不能在类的实例中访问，会报错
people.pro()
```

### 6、实例属性的简写形式

实际开发中，很多实例属性的值，是通过构造方法传入的。

```tsx
class Count {
  a: number
  b: number

  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }
}

// 属性 a 和 b 的值是通过构造方法的参数传入的
```

这样的写法等于对同一个属性要声明两次类型，一次在类的头部，另一次在构造方法的参数里面。这有些累赘，TypeScript 就提供了一种简写形式。

```tsx
class Count {
  constructor(public a: number, public b: number) {}
}

const c = new Count(11, 22)
c.a // 11
c.b // 22

// 构造方法的参数 a 前面有 public 修饰符，这时 TypeScript 就会自动声明一个公开属性x，不必在构造方法里面写任何代码，同时还会设置 a 的值为构造方法的参数值。
// 注意，这里的 public 不能省略
```

除了`public`修饰符，构造方法的参数名只要有`private`、`protected`、`readonly`修饰符，都会自动声明对应修饰符的实例属性。

```tsx
class U {
  constructor(public a: number, protected b: number, private c: number, readonly d: number) {}
}

// 编译结果
class U {
  constructor(a, b, c, d) {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
  }
}

// 从编译结果可以看到，构造方法的 a、b、c、d 会生成对应的实例属性
```

`readonly`还可以与其他三个可访问性修饰符，一起使用。

```tsx
class U {
  constructor(
    public readonly a: number,
    protected readonly b: number,
    private readonly c: number,
  ) {}
}
```

### 7、readonly 只读属性

类的成员也可以声明被为 readonly 只读属性，只读属性不能被更改，只读属性一定要被初始化。

```tsx
class People {
  constructor(username: string) {
    this.username = username
  }
  public username: string
  run() {}
  private eat() {}
  protected pro() {}

  // 只读属性，只读属性不能被更改，只读属性一定要被初始化
  readonly legs: number = 2
}
```

### 8、静态成员

类的内部可以使用`static`关键字，定义静态成员。

静态成员是只能通过类本身使用的成员，不能通过实例对象使用。

```tsx
class User {
  static age = 18
  static printAge() {
    console.log(User.age)
  }
}

User.age // 18
User.printAge() // 18

// age 是静态属性，printAge() 是静态方法
// 它们都必须通过 User 获取，而不能通过实例对象调用
```

`static`关键字前面可以使用 public、private、protected 修饰符。

```tsx
class User {
  private static age = 18
}

User.age // 报错

// 静态属性 age 前面有 private 修饰符，表示只能在 User 内部使用，如果在外部调用这个属性就会报错
```

静态私有属性也可以用 ES6 语法的`#`前缀表示，上面示例可以改写如下

```tsx
class User {
  static #age = 18
}
```

`public`和`protected`的静态成员可以被继承。

```tsx
class User {
  public static x = 1
  protected static y = 2
}

class Allen extends User {
  static getY() {
    return Allen.y
  }
}

Allen.x // 1
Allen.getY() // 2

// 类 User 的静态属性 x 和 y 都被 Allen 继承，公开成员 x 可以在 Allen 的外部获取，保护成员 y 只能在 Allen 的内部获取
```

### 9、泛型类

类也可以写成泛型，使用类型参数。关于泛型的详细介绍，会在泛型部分讲解

```tsx
class Message<Type> {
  contents: Type

  constructor(value: Type) {
    this.contents = value
  }
}

const b: Message<string> = new Message('hi icoding !')

// 类 Message 有类型参数 Type，因此属于泛型类
// 新建实例时，变量的类型声明需要带有类型参数的值，不过本例等号左边的 Message<string> 可以省略不写，因为可以从等号右边推断得到。
```

注意，静态成员不能使用泛型的类型参数。

```tsx
class Message<Type> {
  static defaultContents: Type // 报错
}
```

注：

以上代码中，静态属性`defaultContents`的类型写成类型参数`Type`会报错。

因为这意味着调用时必须给出类型参数（即写成`Message<string>.defaultContents`），并且类型参数发生变化，这个属性也会跟着变，这并不是好的做法。

### 10、抽象类，抽象成员

在 ES 中并没有引入抽象类的概念，这是 TS 对 ES 的又一次扩展。

TypeScript 允许在类的定义前面，加上关键字`abstract`，表示该类不能被实例化，只能当作其他类的模板。即：只能被继承而不能被实例化的类

这种类就叫做 **“抽象类”**（abstract class）

```tsx
abstract class User {
  id = 1001
}

const u = new User() // 报错

// 直接新建抽象类的实例，会报错
```

抽象类只能当作基类使用，用来在它的基础上定义子类。即：抽象类只能被继承

```tsx
abstract class User {
  id = 1001
}

class Allen extends User {
  amount = 123
}

const a = new Allen()

a.id // 1001
a.amount // 123

// User 是一个抽象类，Allen 是 User 的子类，继承了 User 的所有成员，并且可以定义自己的成员和实例化
```

抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。

```tsx
abstract class User {
  foo: number = 1
}

abstract class Allen extends User {
  bar: string = 'icoding'
}
```

抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。

后者就叫做“抽象成员”（abstract member），即属性名和方法名有`abstract`关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。

```tsx
abstract class User {
  abstract foo: string
  bar: string = ''
}

class Allen extends User {
  foo = 'allen'
}

// 抽象类 User 定义了抽象属性 foo，子类 Allen 必须实现这个属性，否则会报错
```

下面是抽象方法的例子。如果抽象类的方法前面加上`abstract`，就表明子类必须给出该方法的实现。

```tsx
abstract class User {
  abstract execute(): string
}

class Allen extends User {
  execute() {
    return `执行了 Allen`
  }
}
```

### 10.1、抽象类 - 实践应用

只能被继承而不能被实例化的类

```tsx
abstract class Animal {
  // 在抽象类中定义一个方法，它可以有具体的实现，这样子类就不用实现了（实现方法的复用）
  eat() {
    console.log('eat ......')
  }
}

// 无法创建抽象类的实例
// let animal = new Animal()

// Dog 继承 Animal
class Dog extends Animal {
  constructor(name: string) {
    // 派生类的构造函数必须包含 "super" 调用
    super()
    this.name = name
  }
  name: string
  run() {}
}

let dog = new Dog('旺旺旺')
// 在子类中调用 eat() 方法，可以正常调用
dog.eat() // eat ......
```

### 10.2、抽象方法的好处

在抽象类中也可以不指定方法的具体实现，即构成一个**抽象方法**

抽象方法的好处是：明确知道子类有其他的实现，就没必要在父类中实现了。

```tsx
abstract class Animal {
  eat() {
    console.log('eat ......')
  }
  // 定义抽象方法：在抽象类中也可以不指定方法的具体实现
  abstract sleep(): void
}

class Dog extends Animal {
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run() {}
  // 在子类中实现父类的抽象方法 sleep()
  sleep() {
    console.log('I want to sleep ...')
  }
}
```

总结：

抽象类的好处：可以抽离出一些事物的共性，这样就更有利于代码的复用和扩展。

> 同时，抽象类也可以实现多态。

### 10.3、抽象类、抽象成员 - 注意事项

- ①、抽象成员只能存在于抽象类，不能存在于普通类。
- ②、抽象成员不能有具体实现的代码。也就是说，已经实现好的成员前面不能加`abstract`关键字。
- ③、抽象成员前也不能有`private`修饰符，否则无法在子类中实现该成员。
- ④、一个子类最多只能继承一个抽象类。

总之，抽象类的作用是，确保各种相关的子类都拥有跟基类相同的接口，可以看作是模板。其中的抽象成员都是必须由子类实现的成员，非抽象成员则表示基类已经实现的、由所有子类共享的成员。

### 11、多态

在父类中，定义一个抽象方法，在多个子类中对该方法有不同的实现，在程序运行时会根据不同的对象执行不同的操作。即可实现运行时的绑定 ！

> 实现 TS 中的多态

```tsx
abstract class Animal {
  eat() {
    console.log('eat ......')
  }
  // 定义抽象方法：在抽象类中也可以不指定方法的具体实现
  abstract sleep(): void
}

class Dog extends Animal {
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run() {}
  // 在子类中实现父类的抽象方法 sleep()
  sleep() {
    console.log('Dog：I want to sleep ...')
  }
}

// 创建 Dog 的实例
let dog = new Dog('旺旺旺')
dog.eat() // eat ......

// 实现 TS 中的多态
class Cat extends Animal {
  // 实现父类的抽象方法 sleep
  sleep() {
    console.log('Cat：I want to sleep ...')
  }
}

// 创建 Cat 类的实例
let cat = new Cat()

// 定义一个 Animal 数组
let animals: Animal[] = [dog, cat]
// 执行 animals 的 forEach 循环
animals.forEach((i) => {
  // 在程序执行时，此时就会判断具体的实例是哪一种实例
  // 然后执行不同的方法，这样就实现了多态
  i.sleep()
})
```

![image-20230701183405454](https://www.arryblog.com/assets/img/image-20230701183405454-16939947376401.21356637.png)

### 12、this 问题

类的方法经常用到`this`关键字，它表示该方法当前所在的对象。

```tsx
class User {
  username = 'User'

  getUserName() {
    return this.username
  }
}

const a = new User()
a.getUserName() // 'User'

const b = {
  username: 'b',
  getUserName: a.getUserName,
}
b.getUserName() // 'b'

// 变量 a 和 b 的 getUserName() 是同一个方法，但是执行结果不一样，原因就是它们内部的 this 指向不一样的对象。
// 如果 getUserName() 在变量 a 上运行，this 指向 a
// 如果在 b 上运行，this 指向 b
```

有些场合需要给出`this`类型，但是 JavaScript 函数通常不带有`this`参数，这时 TypeScript 允许函数增加一个名为`this`的参数，放在参数列表的第一位，用来描述函数内部的`this`关键字的类型。

```tsx
// 编译前
function fn(this: SomeType, x: number) {
  //
}

// 编译后
function fn(x) {
  //
}

// 函数 fn() 的第一个参数是 this，用来声明函数内部的 this 的类型
// 编译时，TypeScript 一旦发现函数的第一个参数名为 this，则会去除这个参数，即编译结果不会带有该参数
```

将 this 作为类方法的参数，调用方法时 this 的类型就会跟声明的类型不一致

```tsx
class User {
  username = 'icoding'

  getUserName(this: User) {
    return this.username
  }
}

const u = new User()
const a = u.getUserName

a() // 报错

// 类 User 的 getUserName() 添加了 this 参数，如果直接调用这个方法，this 的类型就会跟声明的类型不一致，从而报错
```

`this`参数的类型可以声明为各种对象。

```tsx
function foo(this: { username: string }) {
  this.username = 'icoding'
  this.username = 0 // 报错
}

foo.call({ username: 123 }) // 报错

// 参数 this 的类型是一个带有 username 属性的对象，不符合这个条件的 this 都会报错
```

TypeScript 提供了一个`noImplicitThis`编译选项。如果打开了这个设置项，如果`this`的值推断为`any`类型，就会报错。

```tsx
// noImplicitThis 打开

class Rectangle {
  constructor(public width: number, public height: number) {}

  getAreaFunction() {
    return function () {
      return this.width * this.height // 报错
    }
  }
}

// getAreaFunction() 方法返回一个函数，这个函数里面用到了 this，但是这个 this 跟 Rectangle 这个类没关系，它的类型推断为 any，所以就报错了
```

在类的内部，`this`本身也可以当作类型使用，表示当前类的实例对象。

```tsx
class Message {
  contents: string = ''

  set(value: string): this {
    this.contents = value
    return this
  }
}

// set() 方法的返回值类型就是 this，表示当前的实例对象
```

注意，`this`类型不允许应用于静态成员。

```tsx
class User {
  static user: this // 报错
}

// 静态属性 user 的返回值类型是 this，就报错了
// 原因是 this 类型表示实例对象，但是静态成员拿不到实例对象
```

有些方法返回一个布尔值，表示当前的`this`是否属于某种类型。这时，这些方法的返回值类型可以写成`this is Type`的形式，其中用到了`is`运算符。

```tsx
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep
  }

  isDirectory(): this is Directory {
    return this instanceof Directory
  }

  // ...
}

// 以上两个方法的返回值类型都是布尔值，写成 this is Type 的形式，可以精确表示返回值
// is 运算符 会在 类型断言的部分讲解，先做了解
```

### 13、this 类型

this 类型是一种特殊的 TS 类型。

类的成员方法可以直接返回一个 this ，这样就可以很方便的实现链式调用

```tsx
class WorkFlow {
  // 定义 step1 方法
  step1() {
    return this
  }
  // 定义 step2 方法
  step2() {
    return this
  }
}

// 实例化 WorkFlow 类
// 实现方法的链式调用，非常的方便
new WorkFlow().step1().step2()
```

在继承的时候，this 类型也可以表现为多态，这里的多态是指 this 既可以是父类型 也可以是 子类型。

```tsx
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}

// 实例化 WorkFlow 类
// 实现方法的链式调用，非常的方便
new WorkFlow().step1().step2()

// 定义一个子类
class Myflow extends WorkFlow {
  next() {
    return this
  }
}

// 实例化子类，并调用子类的方法 next()，该方法返回了子类的类型
// 也可以是父类的类型，同时也可调用父类的方法，再接着调用子类的方法
// 这样就保持了父类和子类之间接口调用的连贯性，这也是 this 类型的作用。
new Myflow().next().step1().next().step2()
```

注：

以上我们重点学习了 TS 中的类，对了比 TS 和 ES 中类的差别，我们发现 TS 将 ES 中缺失的特性都补回来了。

这样 TS 就更像一门面向对象语言了 ！

## 四、类 与 接口的关系

深入浅出 类类型接口、接口的继承、接口继承类，以及类与接口的关系。

### 1、类类型接口

类类型接口：一个接口可以约束类成员有哪些属性 以及 它们的类型。

```tsx
// 定义一个 People 接口
interface People {
  // username 属性
  username: string
  // eat 方法
  eat(): void
}

// 用 Kevin 实现了 People 接口（使用 implements 关键字）
class Kevin implements People {
  constructor(username: string) {
    this.username = username
  }
  username: string
  eat() {}

  // 类也可以定义自己的属性
  sleep() {}
}

// 注：类实现接口时必须实现接口中声明的所有属性，否者会报错
```

注：

- ①、接口只能约束类的公有成员
- ②、接口不能约束类的构造函数

```tsx
interface People {
  // 接口不能约束类的构造函数
  // new (username: string): void
  username: string
  eat(): void
}

class Kevin implements People {
  constructor(username: string) {
    this.username = username
  }
  // 接口只能约束类的公有成员
  private username: string
  eat() {}
}
```

![image-20230701211901965](https://www.arryblog.com/assets/img/image-20230701211901965-16939949015103.aac2d0ba.png)

### 2、接口的继承

接口可以像类一样，相互继承。并且一个接口可以继承多个接口

```tsx
interface People {
  username: string
  eat(): void
}

// 定义 Man 接口来继承 People 接口
interface Man extends People {
  // 给 Man 接口添加 run 方法
  run(): void
}

// 定义 Child 接口
interface Child {
  // 给 Child 接口添加 cry 方法（哭）
  cry(): void
}

// 定义 Boy 接口，让其同时继承 Man 和 Child 接口
interface Boy extends Man, Child {}

// 定义一个对象，要符合 Boy 接口的定义
// 该对象中会有四个属性，分别来自 Man、People、Child 接口中
let boy: Boy = {
  username: '',
  run() {},
  eat() {},
  cry() {},
}
```

注：

从接口的继承可以看出，接口的继承可以抽离出可重用的接口，也可以将多个接口合并成一个接口。

### 3、接口继承类

接口除了可以继承接口外，还可以继承类。

这就相当于接口把类的成员都抽象了出来，也就是只有类的成员结构而没有具体的实现。

```tsx
// 定义一个 Auto 类
class Auto {
  // 公共属性 state
  state = 1
  // 私有成员
  // private state1 = 3
}

// 定义 AutoInterface 接口来继承 Auto 类，现在该接口中就隐含了 state 属性
// 想要实现 AutoInterface 接口，只要一个类的成员有 state 属性即可
interface AutoInterface extends Auto {}

// Car 类实现 AutoInterface 接口，只需要添加 state 属性即可
class Car implements AutoInterface {
  state = 2
}

// Auto 的子类也可以实现 AutoInterface 这个接口
class Bus extends Auto implements AutoInterface {
  // 在 Bus 子类中就不必实现 state 属性了，因为它是 Auto 的子类，自然就继承了 state 属性
  // 注：接口在抽离类的成员时，不仅抽离了公共成员，而且抽离了私有成员和受保护成员
  // 在 Auto 类中定义一个私有成员，”private state1 = 3“，此时 Car 即会报错，该类错误的实现了AutoInterface接口
  // 因为 Car 不是 Auto的子类，自然不能包含它的非公有成员
}
```

### 4、接口 和 类的关系

关于接口和类的关系比较容易混淆，如下图所示，更能清晰的理解

![image-20230906193721481](https://www.arryblog.com/assets/img/image-20230906193721481.ec225251.png)

注：

- ①、接口之间是可以相互继承的，这样可以实现接口的复用
- ②、类之间也可以互相继承，可以实现方法 和 属性的复用
- ③、接口是可以通过类来实现的，但接口只能约束类的公有成员
- ④、接口也可以抽离出类的成员，抽离时会包括类的公有成员、私有成员 和 受保护成员

## 五、泛型

很多时候，我们希望一个函数 或 一个类可以支持多种数据类型 且 有很大的灵活性，就需要用到泛型。

### 1、泛型的概念

举例：声明一个打印函数

```tsx
// 定义一个打印函数
function log(value: string): string {
  console.log(value)
  return value
}
```

注：

以上是一个打印函数，它接收一个字符串，将该字符串打印出来，最终直接返回该字符串。

> 接下来，我们希望该函数接收一个字符串数组，应如何实现 ？

通过前面的学习，我们可能会想到使用 **函数重载** 的方式来实现

```tsx
// 函数重载

// 定义接收字符串变量的函数
function log(value: string): string
// 定义接收字符串数组的函数
function log(value: string[]): string[]
// 最后，在一个比较宽泛的版本中将其实现，参数类型为 any
function log(value: any) {
  console.log(value)
  return value
}
```

还可以使用其它类型，**联合类型** 来实现。它会比函数重载更简便一些

```tsx
// 联合类型
function log(value: string | string[]): string | string[] {
  console.log(value)
  return value
}
```

现在需要更进一步，希望这个函数可以接收任何类型的参数，我们从前面的函数重载中已经得到了答案，即 使用 any 类型。

```tsx
// any 类型
function log(value: any) {
  console.log(value)
  return value
}
```

注：

此时，使用 any 类型的函数似乎已经满足了我们所有的需求。

但产生了另外一个问题，any 类型丢失了一些信息，即 类型之间的约束关系，它忽略了输入参数的类型 和 函数返回值的类型必须是一致的。

当一个调用者看到这个 log 函数时，他完全无法获知这种约束关系，这时就需要用到泛型了。

### 2、为什么使用泛型

有些时候，函数返回值的类型与参数类型是相关的。

```tsx
function foo(arr) {
  return arr[0]
}

// 函数 foo() 总是返回参数数组的第一个成员
// 参数数组是什么类型，返回值就是什么类型
```

以上这个函数的类型声明只能写成下面这样

```tsx
function f(arr: any[]): any {
  return arr[0]
}

// 以上的类型声明，就反映不出参数与返回值之间的类型关系
```

为了解决这个问题，TypeScript 就引入了“泛型”（generics）。泛型的特点就是带有“类型参数”（type parameter）。

```tsx
function foo<T>(arr: T[]): T {
  return arr[0]
}

// 函数 foo() 的函数名后面尖括号的部分 <T>，就是类型参数，参数要放在一对尖括号（<>）里面
// 本例只有一个类型参数 T，可以将其理解为类型声明需要的变量，需要在调用时传入具体的参数类型
```

以上的函数`foo()`的参数类型是`T[]`，返回值类型是`T`，就清楚地表示了两者之间的关系。

比如，输入的参数类型是`number[]`，那么 T 的值就是`number`，因此返回值类型也是`number`

> 函数调用时，需要提供类型参数。

```tsx
foo<number>([1, 2, 3])

// 调用函数 foo() 时，需要在函数名后面使用尖括号，给出类型参数T的值，本例是<number>
```

不过为了方便，函数调用时，往往省略不写类型参数的值，让 TypeScript 自己推断。

```tsx
foo([1, 2, 3])

// TypeScript 会从实际参数 [1, 2, 3]，推断出类型参数 T 的值为 number
```

### 2.1、泛型的复杂场景

有些复杂的使用场景，TypeScript 可能推断不出类型参数的值，这时就必须显式给出了。

```tsx
function foo<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2)
}
```

以上代码中，两个参数`arr1`、`arr2`和返回值都是同一个类型。如果不给出类型参数的值，下面的调用会报错。

```tsx
function foo<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2)
}

foo([1, 2], ['a', 'b']) // 报错
```

以上代码中会报错，TypeScript 认为两个参数不是同一个类型。但是，如果类型参数是一个联合类型，就不会报错。

```tsx
function foo<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2)
}

foo<number | string>([1, 2], ['a', 'b']) // 正确

// 类型参数是一个联合类型，使得两个参数都符合类型参数，就不报错了
// 这种情况下，类型参数是不能省略不写的
```

注：

类型参数的名字，可以随便取，但是必须为合法的标识符。习惯上，类型参数的第一个字符往往采用大写字母。一般会使用`T`（type 的第一个字母）作为类型参数的名字。

如果有多个类型参数，则使用 T 后面的 U、V 等字母命名，各个参数之间使用逗号（“,”）分隔。

### 2.2、多个类型参数应用

```tsx
function foo<T, U>(arr: T[], f: (arg: T) => U): U[] {
  return arr.map(f)
}

// 用法实例
foo<string, number>(['1', '2', '3'], (n) => parseInt(n)) // 返回 [1, 2, 3]

// 将数组的实例方法 foo() 改写成全局函数，它有两个类型参数 T 和 U
// 含义是，原始数组的类型为 T[]，对该数组的每个成员执行一个处理函数 f，将类型 T 转成类型 U，那么就会得到一个类型为 U[] 的数组
```

注：

总之，泛型可以理解成一段类型逻辑，需要类型参数来表达。有了类型参数以后，可以在输入类型与输出类型之间，建立一一对应关系。

### 3、泛型的写法

泛型主要用在四个场合：函数、接口、类和别名。

### 4、函数的泛型写法

前面有提到，`function`关键字定义的泛型函数，类型参数放在尖括号中，写在函数名后面。

```tsx
function foo<T>(arg: T): T {
  return arg
}
```

对于变量形式定义的函数，泛型有下面两种写法

```tsx
// 写法一
let bar1: <T>(arg: T) => T = foo

// 写法二
let bar2: { <T>(arg: T): T } = foo
```

### 5、接口的泛型写法

interface 也可以采用泛型的写法

```tsx
interface Box<Type> {
  contents: Type
}

let box: Box<string>

// 使用泛型接口时，需要给出类型参数的值（本例是string）
```

泛型接口方式一：先定义了一个泛型接口，然后将这个接口用于一个类

```tsx
interface Count<T> {
  countTo(value: T): number
}

class Nums implements Count<Nums> {
  countTo(value: Nums): number {
    // ...
    return 123
  }
}
```

泛型接口还有第二种写法

```tsx
interface Fn {
  <Type>(arg: Type): Type
}

function foo<Type>(arg: Type): Type {
  return arg
}

let myFoo: Fn = foo

// Fn 的类型参数 Type 的具体类型，需要函数 foo 在使用时提供
// 所以，最后一行的赋值语句不需要给出 Type 的具体类型
```

注：

此外，第二种写法还有一个差异之处。那就是它的类型参数定义在某个方法之中，其他属性和方法不能使用该类型参数。

前面的第一种写法，类型参数定义在整个接口，接口内部的所有属性和方法都可以使用该类型参数。

### 6、类的泛型写法

泛型类的类型参数写在类名后面

```tsx
class User<K, V> {
  key: K
  value: V
}
```

继承泛型类

```tsx
class User<T> {
  value: T
}

class Allen extends User<any> {}

// 类 User 有一个类型参数 T，使用时必须给出 T 的类型，所以类 Allen 继承时要写成 User<any>
```

泛型也可以用在类表达式

```tsx
const Container = class<T> {
  constructor(private readonly data: T) {}
}

const a = new Container<boolean>(true)
const b = new Container<number>(0)

// 新建实例时，需要同时给出类型参数 T 和 类参数 data 的值
```

### 6.1、实践应用

```tsx
class Count<NumType> {
  value!: NumType
  add!: (x: NumType, y: NumType) => NumType
}

let foo = new Count<number>()

foo.value = 0
foo.add = function (x, y) {
  return x + y
}

// 先新建类 Count 的实例 foo，然后再定义实例的 value 属性和 add() 方法
// 类的定义中，属性和方法后面的感叹号是非空断言，告诉 TypeScript 它们都是非空的，后面会赋值。
```

JavaScript 的类本质上是一个构造函数，因此也可以把泛型类写成构造函数。

```tsx
type MyClass<T> = new (...args: any[]) => T

// 或者
interface MyClass<T> {
  new (...args: any[]): T
}

// 用法实例
function createInstance<T>(AnyClass: MyClass<T>, ...args: any[]): T {
  return new AnyClass(...args)
}

// 函数 createInstance() 的第一个参数 AnyClass 是构造函数（也可以是一个类），它的类型是 MyClass<T>，这里的 T 是 createInstance() 的类型参数，在该函数调用时再指定具体类型。
```

注：

泛型类描述的是类的实例，不包括静态属性和静态方法，因为这两者定义在类的本身。

> 因此，它们不能引用类型参数。

```tsx
class Count<T> {
  static data: T // 报错
  constructor(public value: T) {}
}

// 静态属性 data 引用了类型参数 T，这是不可以的
// 因为类型参数只能用于实例属性和实例方法，所以报错了
```

### 7、类型别名的泛型写法

type 命令定义的类型别名，也可以使用泛型。

```tsx
type Nullable<T> = T | undefined | null

// Nullable<T> 是一个泛型，只要传入一个类型，就可以得到这个类型与 undefined 和 null 的一个联合类型
```

应用案例

```tsx
type Container<T> = { value: T }

const a: Container<number> = { value: 0 }
const b: Container<string> = { value: 'b' }
```

定义树形结构

```tsx
type Tree<T> = {
  value: T
  left: Tree<T> | null
  right: Tree<T> | null
}

// 类型别名 Tree 内部递归引用了 Tree 自身
```

### 8、类型参数的默认值

类型参数可以设置默认值。使用时，如果没有给出类型参数的值，就会使用默认值。

```tsx
function getFirst<T = string>(arr: T[]): T {
  return arr[0]
}

// T = string 表示类型参数的默认值是 string
// 调用 getFirst() 时，如果不给出T的值，TypeScript 就认为 T 等于 string
```

但是，因为 TypeScript 会从实际参数推断出`T`的值，从而覆盖掉默认值，所以下面的代码不会报错。

```tsx
getFirst([1, 2, 3]) // 正确

// 实际参数是 [1, 2, 3]，TypeScript 推断 T 等于 number，从而覆盖掉默认值 string
```

类型参数的默认值，往往用在类中。

```tsx
class Count<T = string> {
  list: T[] = []

  add(t: T) {
    this.list.push(t)
  }
}

//
```

以上代码中，类`Count`有一个类型参数`T`，默认值为`string`。这意味着，属性`list`默认是一个字符串数组，方法`add()`的默认参数是一个字符串。

```tsx
class Count<T = string> {
  list: T[] = []

  add(t: T) {
    this.list.push(t)
  }
}

// 新建实例 c
const c = new Count()

c.add(4) // 报错
c.add('hello') // 正确
```

以上代码中，新建 Count 的实例 c 时，没有给出类型参数 T 的值，所以 T 就等于 string。因此，向 `add()`方法传入一个数值会报错，传入字符串就不会。

```tsx
class Count<T = string> {
  list: T[] = []

  add(t: T) {
    this.list.push(t)
  }
}

const c = new Count<number>()

c.add(5) // 正确
c.add('icoding') // 报错

// 新建实例 c 时，给出了类型参数 T 的值是 number
// 因此 add() 方法传入数值不会报错，传入字符串会报错
```

一旦类型参数有默认值，就表示它是可选参数。如果有多个类型参数，可选参数必须在必选参数之后。

```tsx
<T = boolean, U> // 错误

<T, U = boolean> // 正确

// 依次有两个类型参数 T 和 U
// 如果 T 是可选参数，U 不是，就会报错
```

### 9、数组的泛型表示

在学习数组的章节中，数组类型有一种表示方法是`Array<T>`。

这就是泛型的写法，`Array`是 TypeScript 原生的一个类型接口，`T`是它的类型参数。声明数组时，需要提供`T`的值。

```tsx
let arr: Array<number> = [1, 2, 3]

// Array<number> 就是一个泛型，类型参数的值是 number，表示该数组的全部成员都是数值
```

同样的，如果数组成员都是字符串，那么类型就写成`Array<string>`

事实上，在 TypeScript 内部，数组类型的另一种写法`number[]`、`string[]`，只是`Array<number>`、`Array<string>`的简写形式。

在 TypeScript 内部，`Array`是一个泛型接口，类型定义基本是下面的样子。

```tsx
interface Array<Type> {
  length: number

  pop(): Type | undefined

  push(...items: Type[]): number

  // ...
}

// push() 方法的参数 item 的类型是 Type[]，跟 Array() 的参数类型 Type 保持一致，表示只能添加同类型的成员
// 调用 push() 的时候，TypeScript 就会检查两者是否一致
```

其他的 TypeScript 内部数据结构，比如`Map`、`Set`和`Promise`，其实也是泛型接口，完整的写法是`Map<K, V>`、`Set<T>`和`Promise<T>`。

TypeScript 默认还提供一个`ReadonlyArray<T>`接口，表示只读数组。

```tsx
function foo(values: ReadonlyArray<string>) {
  values.push('icoding') // 报错
}

// 参数 values 的类型是 ReadonlyArray<string>，表示不能修改这个数组，所以函数体内部新增数组成员就会报错
// 因此，如果不希望函数内部改动参数数组，就可以将该参数数组声明为 ReadonlyArray<T> 类型
```

### 10、类型参数的约束条件

很多类型参数并不是无限制的，对于传入的类型存在约束条件。

```tsx
function foo<Type>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  }
  return b
}

// 类型参数 Type 有一个隐藏的约束条件：它必须存在length属性
// 如果不满足这个条件，就会报错
```

TypeScript 提供了一种语法，允许在类型参数上面写明约束条件，如果不满足条件，编译时就会报错。这样也可以有良好的语义，对类型参数进行说明。

```tsx
function foo<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a
  }
  return b
}

// T extends { length: number } 就是约束条件，表示类型参数 T 必须满足 { length: number } ，否则就会报错

foo([1, 2], [1, 2, 3]) // 正确
foo('ibc', 'icoding') // 正确
foo(1, 2) // 报错

// 只要传入的参数类型不满足约束条件，就会报错
```

类型参数的约束条件采用下面的形式。

```tsx
<TypeParameter extends ConstraintType>

// TypeParameter 表示类型参数
// extends 是关键字，这是必须的
// ConstraintType 表示类型参数要满足的条件，即类型参数应该是 ConstraintType 的子类型
```

类型参数可以同时设置约束条件和默认值，前提是默认值必须满足约束条件。

```tsx
type Fn<A extends string, B extends string = 'world'> = [A, B]

type Result = Fn<'hello'> // ["hello", "world"]

// 类型参数 A 和 B 都有约束条件，并且 B 还有默认值
// 所以，调用 Fn 的时候，可以只给出 A 的值，不给出 B 的值
```

另外，上例也可以看出，泛型本质上是一个类型函数，通过输入参数，获得结果，两者是一一对应关系。

如果有多个类型参数，一个类型参数的约束条件，可以引用其他参数。

```tsx
<T, U extends T>
// 或者
<T extends U, U>

// U 的约束条件引用 T，或者 T 的约束条件引用 U，都是正确的
```

但是，约束条件不能引用类型参数自身。

```tsx
<T extends T>               // 报错
<T extends U, U extends T>  // 报错

// T 的约束条件不能是 T 自身
// 同理，多个类型参数也不能互相约束（即 T 的约束条件是 U、U 的约束条件是 T）
// 因为互相约束就意味着约束条件就是类型参数自身
```

### 11、泛型使用注意事项

在实际开发中，泛型的使用过程中的注意事项，中共有 4 项。

### 11.1、尽量少用泛型

泛型虽然灵活，但是会加大代码的复杂性，使其变得难读难写。

一般来说，只要使用了泛型，类型声明通常都不太易读，容易写得很复杂。因此，可以不用泛型就不要用。

### 11.2、类型参数越少越好

多一个类型参数，多一道替换步骤，加大复杂性。因此，类型参数越少越好。

```tsx
function filter<T, Fn extends (arg: T) => boolean>(arr: T[], func: Fn): T[] {
  return arr.filter(func)
}
```

以上代码中，有两个类型参数，但是第二个类型参数 Fn 是不必要的，完全可以直接写在函数参数的类型声明里面。

```tsx
function filter<T>(arr: T[], func: (arg: T) => boolean): T[] {
  return arr.filter(func)
}

// 类型参数简化成了一个，效果与前一个示例是一样的
```

### 11.3、类型参数需要出现两次

如果类型参数在定义后只出现一次，那么很可能是不必要的。

```tsx
function foo<Str extends string>(s: Str) {
  console.log('Hello, ' + s)
}
```

以上代码中，类型参数`Str`只在函数声明中出现一次（除了它的定义部分），这往往表明这个类型参数是不必要。

```tsx
function foo(s: string) {
  console.log('Hello, ' + s)
}

// 把前面的类型参数省略了，效果与前一个示例是一样的
```

> 也就是说，只有当类型参数用到两次或两次以上，才是泛型的适用场合。

### 11.4、泛型可以嵌套

类型参数可以是另一个泛型

```tsx
type OrNull<Type> = Type | null

type OneOrMany<Type> = Type | Type[]

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>

// 最后一行的泛型 OrNull 的类型参数，就是另一个泛型 OneOrMany
```

### 12、总结

泛型对前端开发来说，是一个比较新的概念，刚开始接触会有些难以理解。

我们可以换个角度思考就会变得简单：将泛型变量与函数参数等同对待，它只不过是另一个维度的参数，是代表类型而不是代表值的参数。

> 泛型在后边的高级类型中有广泛的应用，现阶段先作为基础了解即可。

### 13、泛型的好处

- 函数和类可以轻松地支持多种类型，增强程序的扩展性
- 不必写多条函数重载，也不必写冗长的联合类型声明，增强代码可读性
- 灵活控制类型之间的约束

> 有了泛型，类型就像穿上了变色龙的外衣，可以很友好的融入各种环境，这样代码的灵活性就大大增强了。

截止目前，TS 的基础知识就已经介绍完了，接下来我们就要开始学习 TS 的类型检查机制，高级类型，相关配置及应用等。

## 六、类型断言

对于没有类型声明的值，TypeScript 会进行类型推断，很多时候得到的结果，未必是开发者想要的。

```tsx
type T = 'a' | 'b' | 'c'
let foo = 'a'

let bar: T = foo // 报错

// 最后一行报错，原因是 TypeScript 推断变量 foo 的类型是 string，而变量 bar 的类型是 'a'|'b'|'c'，前者是后者的父类型
// 父类型不能赋值给子类型，所以就报错了
```

TypeScript 提供了“类型断言”这样一种手段，允许开发者在代码中“断言”某个值的类型，告诉编译器此处的值是什么类型。TypeScript 一旦发现存在类型断言，就不再对该值进行类型推断，而是直接采用断言给出的类型。

这种做法的实质是，允许开发者在某个位置“绕过”编译器的类型推断，让本来通不过类型检查的代码能够通过，避免编译器报错。这样虽然削弱了 TypeScript 类型系统的严格性，但是为开发者带来了方便，毕竟开发者比编译器更了解自己的代码。

> 以上代码，解决方法就是进行类型断言，在赋值时断言变量`foo`的类型。

```tsx
type T = 'a' | 'b' | 'c'

let foo = 'a'
let bar: T = foo as T // 正确

// 最后一行的 foo as T 表示告诉编译器，变量 foo 的类型断言为 T
// 所以这一行不再需要类型推断了，编译器直接把 foo 的类型当作 T ，就不会报错了
```

总之，类型断言并不是真的改变一个值的类型，而是提示编译器，应该如何处理这个值。

### 1、类型断言的语法

类型断言有两种语法

```tsx
// 语法一：<类型>值
<Type>value

// 语法二：值 as 类型
value as Type
```

> 以上两种语法是等价的，value 表示值，Type 表示类型

- 早期只有语法一，后来因为 TypeScript 开始支持 React 的 JSX 语法（尖括号表示 HTML 元素），为了避免两者冲突，就引入了语法二
- 目前，推荐使用语法二

```tsx
// 语法一
let bar: T = <T>foo

// 语法二
let bar: T = foo as T

// 以上代码是两种类型断言的语法，其中的语法一因为跟 JSX 语法冲突，使用时必须关闭 TypeScript 的 React 支持，否则会无法识别
// 由于这个原因，现在一般都使用语法二
```

对象类型有严格字面量检查，如果存在额外的属性会报错。

```tsx
// 报错
const p: { x: number } = { x: 0, y: 0 }
```

以上代码中，等号右侧是一个对象字面量，多出了属性`y`，导致报错。解决方法就是使用类型断言，可以用两种不同的断言。

```tsx
// 正确
const p1: { x: number } = { x: 0, y: 0 } as { x: number }

// 正确
const p2: { x: number } = { x: 0, y: 0 } as { x: number; y: number }

// 两种类型断言都是正确的
// 第一种断言将类型改成与等号左边一致
// 第二种断言使得等号右边的类型是左边类型的子类型，子类型可以赋值给父类型，同时因为存在类型断言，就没有严格字面量检查了，所以不报错
```

在网页中的具体实践

```tsx
const username = document.getElementById('username')

if (username) {
  ;(username as HTMLInputElement).value // 正确
}

// 变量 username 的类型是 HTMLElement | null，排除了null的情况以后，HTMLElement 类型是没有value属性的
// 如果 username 是一个输入框，那么就可以通过类型断言，将它的类型改成 HTMLInputElement，就可以读取 value 属性。
```

注：

以上代码中的类型断言的圆括号是必需的，否则`username`会被断言成`HTMLInputElement.value`，从而报错。

### 1.1、类型断言 - 注意事项

类型断言不应滥用，因为它改变了 TypeScript 的类型检查，很可能埋下错误的隐患。

```tsx
const data: object = {
  a: 1,
  b: 2,
  c: 3,
}

data.length // 报错

;(data as Array<string>).length // 正确

// 变量 data 是一个对象，没有 length 属性
// 但是通过类型断言，可以将它的类型断言为数组，这样使用length属性就能通过类型检查
// 但是，编译后的代码在运行时依然会报错，所以类型断言可以让错误的代码通过编译
```

### 1.2、类型断言的作用

类型断言的一大用处是，指定 unknown 类型的变量的具体类型。

```tsx
const value: unknown = 'Hello World'

const s1: string = value // 报错
const s2: string = value as string // 正确

// unknown 类型的变量 value 不能直接赋值给其他类型的变量，但是可以将它断言为其他类型，这样就可以赋值给别的变量了
```

另外，类型断言也适合指定联合类型的值的具体类型。

```tsx
const s1: number | string = 'hello'
const s2: number = s1 as number

// 变量 s1 是联合类型，可以断言其为联合类型里面的一种具体类型，再将其赋值给变量 s2
```

### 2、类型断言的条件

类型断言并不意味着，可以把某个值断言为任意类型。

```tsx
const n = 1
const m: string = n as string // 报错

// 变量 n 是数值，无法把它断言成字符串，TypeScript 会报错
```

类型断言的使用前提是，值的实际类型与断言的类型必须满足一个条件。

```tsx
expr as T

// expr 是实际的值，T 是类型断言，它们必须满足下面的条件
// expr 是 T 的子类型，或者 T 是 expr 的子类型
```

也就是说，类型断言要求实际的类型与断言的类型兼容，实际类型可以断言为一个更加宽泛的类型（父类型），也可以断言为一个更加精确的类型（子类型），但不能断言为一个完全无关的类型。

但是，如果真的要断言成一个完全无关的类型，也是可以做到的。那就是连续进行两次类型断言，先断言成 unknown 类型或 any 类型，然后再断言为目标类型。因为`any`类型和`unknown`类型是所有其他类型的父类型，所以可以作为两种完全无关的类型的中介。

```tsx
// 或者写成 <T><unknown>expr
expr as unknown as T

// expr 连续进行了两次类型断言
// 第一次断言为 unknown 类型
// 第二次断言为 T 类型
// 这样的话，expr 就可以断言成任意类型 T，而不报错
```

改写前面的案例

```tsx
const n = 1
const m: string = n as unknown as string // 正确

// 通过两次类型断言，变量 n 的类型就从数值，变成了完全无关的字符串，从而赋值时不会报错
```

### 3、as const 断言

如果没有声明变量类型，let 命令声明的变量，会被类型推断为 TypeScript 内置的基本类型之一。const 命令声明的变量，则被推断为值类型常量。

```tsx
// 类型推断为基本类型 string
let s1 = 'JavaScript'

// 类型推断为字符串 “JavaScript”
const s2 = 'JavaScript'

// 变量 s1 的类型被推断为 string
// 变量 s2 的类型推断为值类型 JavaScript。后者是前者的子类型，相当于 const 命令有更强的限定作用，可以缩小变量的类型范围。
```

有些时候，let 变量会出现一些意想不到的报错，变更成 const 变量就能消除报错。

```tsx
let s = 'JavaScript'

type Lang = 'JavaScript' | 'TypeScript' | 'Python'

function setLang(language: Lang) {
  //
}

setLang(s) // 报错

// 最后一行报错，原因是函数 setLang() 的参数 language 类型是 Lang，这是一个联合类型
// 但是，传入的字符串 s 的类型被推断为 string，属于 Lang 的父类型
// 父类型不能替代子类型，导致报错。
```

一种解决方法就是把 let 命令改成 const 命令

```tsx
// let s = "JavaScript";

// 将 let 命令改成 const 命令
const s = 'JavaScript'

type Lang = 'JavaScript' | 'TypeScript' | 'Python'

function setLang(language: Lang) {
  //
}

setLang(s) // 正确

// 变量 s 的类型就是值类型 JavaScript，它是联合类型 Lang 的子类型，传入函数 setLang() 就不会报错
```

另一种解决方法是使用类型断言。TypeScript 提供了一种特殊的类型断言`as const`，用于告诉编译器，推断类型时，可以将这个值推断为常量，即把 let 变量断言为 const 变量，从而把内置的基本类型变更为值类型。

```tsx
let s = 'JavaScript' as const
setLang(s) // 正确

// 变量 s 虽然是用 let 命令声明的，但是使用了 as const 断言以后，就等同于是用  const 命令声明的，变量 s 的类型会被推断为值类型 JavaScript。
```

使用了`as const`断言以后，let 变量就不能再改变值了。

```tsx
let s = 'JavaScript' as const
s = 'Python' // 报错

// let 命令声明的变量 s，使用 as const 断言以后，就不能改变值了，否则报错。
```

### 3.1、as const 断言 - 注意事项

注意，`as const`断言只能用于字面量，不能用于变量。

```tsx
// 定义变量 s
let s = 'JavaScript'

type Lang = 'JavaScript' | 'TypeScript' | 'Python'

function setLang(language: Lang) {
  //
}

// 调用函数
setLang(s as const) // 报错
```

以上代码中，`as const`断言用于变量`s`，就报错了。下面的写法可以更清晰地看出这一点

```tsx
let s1 = 'JavaScript'
let s2 = s1 as const // 报错
```

另外，`as const`也不能用于表达式。

```tsx
let s = ('Java' + 'Script') as const // 报错

// 以上代码中，as const 用于表达式，导致报错
```

`as const`也可以写成前置的形式。

```tsx
// 后置形式
expr as const

// 前置形式
<const>expr
```

`as const`断言可以用于整个对象，也可以用于对象的单个属性，这时它的类型缩小效果是不一样的。

```tsx
const v1 = {
  x: 1,
  y: 2,
} // 类型是 { x: number; y: number; }

const v2 = {
  x: 1 as const,
  y: 2,
} // 类型是 { x: 1; y: number; }

const v3 = {
  x: 1,
  y: 2,
} as const // 类型是 { readonly x: 1; readonly y: 2; }

// 第二种写法是对属性 x 缩小类型，第三种写法是对整个对象缩小类型
```

总之，`as const`会将字面量的类型断言为不可变类型，缩小成 TypeScript 允许的最小类型。

### 3.2、数组字面量使用断言

```tsx
// a1 的类型推断为 number[]
const a1 = [1, 2, 3]

// a2 的类型推断为 readonly [1, 2, 3]
const a2 = [1, 2, 3] as const

// 数组字面量使用 as const 断言后，类型推断就变成了只读元组
```

由于`as const`会将数组变成只读元组，所以很适合用于函数的 rest 参数。

```tsx
function add(x: number, y: number) {
  return x + y
}

const nums = [1, 2]
const total = add(...nums) // 报错

// 变量 nums 的类型推断为 number[]，导致使用扩展运算符 ... 传入函数 add() 会报错，因为 add() 只能接受两个参数，而 ...nums 并不能保证参数的个数
```

事实上，对于固定参数个数的函数，如果传入的参数包含扩展运算符，那么扩展运算符只能用于元组。只有当函数定义使用了 rest 参数，扩展运算符才能用于数组。

解决方法就是使用`as const`断言，将数组变成元组。

```tsx
const nums = [1, 2] as const
const total = add(...nums) // 正确

// 使用 as const 断言后，变量 nums 的类型会被推断为 readonly [1, 2]，使用扩展运算符展开后，正好符合函数 add() 的参数类型
```

Enum 成员也可以使用`as const`断言

```tsx
enum Foo {
  X,
  Y,
}
let e1 = Foo.X // Foo
let e2 = Foo.X as const // Foo.X

// 如果不使用 as const 断言，变量 e1 的类型被推断为整个 Enum 类型；
// 使用了 as const 断言以后，变量 e2 的类型被推断为 Enum 的某个成员，这意味着它不能变更为其他成员
```

### 4、非空断言

对于那些可能为空的变量（即可能等于`undefined`或`null`），TypeScript 提供了非空断言，保证这些变量不会为空，写法是在变量名后面加上感叹号`!`。

```tsx
function f(x?: number | null) {
  validateNumber(x) // 自定义函数，确保 x 是数值
  console.log(x!.toFixed())
}

function validateNumber(e?: number | null) {
  if (typeof e !== 'number') throw new Error('Not a number')
}

// 函数 f() 的参数 x 的类型是 number|null，即可能为空
// 如果为空，就不存在 x.toFixed() 方法，这样写会报错
// 但是，开发者可以确认，经过 validateNumber() 的前置检验，变量 x 肯定不会为空，这时就可以使用非空断言，为函数体内部的变量 x 加上后缀!，x!.toFixed() 编译就不会报错了
```

非空断言在实际编程中很有用，有时可以省去一些额外的判断。

```tsx
const root = document.getElementById('root')

// 报错
root.addEventListener('click', (e) => {
  /* ... */
})
```

以上代码中，`getElementById()`有可能返回空值`null`，即变量`root`可能为空，这时对它调用`addEventListener()`方法就会报错，通不过编译。

但是，开发者如果可以确认`root`元素肯定会在网页中存在，这时就可以使用非空断言。

```tsx
const root = document.getElementById('root')!

// getElementById() 方法加上后缀!，表示这个方法肯定返回非空结果
```

不过，非空断言会造成安全隐患，只有在确定一个表达式的值不为空时才能使用。比较保险的做法还是手动检查一下是否为空。

```tsx
const root = document.getElementById('root')

if (root === null) {
  throw new Error('找不到DOM元素 #root')
}

root.addEventListener('click', (e) => {
  /* ... */
})

// 如果 root 为空会抛错，比非空断言更保险一点
```

非空断言还可以用于赋值断言。TypeScript 有一个编译设置，要求类的属性必须初始化（即有初始值），如果不对属性赋值就会报错。

```tsx
class Point {
  x: number // 报错
  y: number // 报错

  constructor(x: number, y: number) {
    // ...
  }
}

// 属性 x 和 y 会报错，因为 TypeScript 认为它们没有初始化
```

这时就可以使用非空断言，表示这两个属性肯定会有值，这样就不会报错了。

```tsx
class Point {
  x!: number // 正确
  y!: number // 正确

  constructor(x: number, y: number) {
    // ...
  }
}
```

注：

非空断言只有在打开编译选项`strictNullChecks`时才有意义。如果不打开这个选项，编译器就不会检查某个变量是否可能为`undefined`或`null`。

### 5、断言函数

断言函数是一种特殊函数，用于保证函数参数符合某种类型。如果函数参数达不到要求，就会抛出错误，中断程序执行；如果达到要求，就不进行任何操作，让代码按照正常流程运行。

```tsx
function isString(value: unknown): void {
  if (typeof value !== 'string') throw new Error('不是字符串')
}

// 函数 isString() 就是一个断言函数，用来保证参数 value 是一个字符串，否则就会抛出错误，中断程序的执行
```

### 5.1、断言函数的用法

```tsx
function toUpper(x: string | number) {
  isString(x)
  return x.toUpperCase()
}

// 函数 toUpper() 的参数 x，可能是字符串，也可能是数值。
// 但是，函数体的最后一行调用 toUpperCase() 方法，必须保证 x 是字符串，否则报错。
// 所以，这一行前面调用断言函数 isString()，调用以后 TypeScript 就能确定，变量 x 一定是字符串，不是数值，也就不报错了。
```

传统的断言函数`isString()`的写法有一个缺点，它的参数类型是`unknown`，返回值类型是`void`（即没有返回值）。单单从这样的类型声明，很难看出`isString()`是一个断言函数。

为了更清晰地表达断言函数，TypeScript 3.7 引入了新的类型写法。

```tsx
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('不是字符串类型 ！')
}

// 函数 isString() 的返回值类型写成 asserts value is string，其中 asserts 和 is 都是关键词，value 是函数的参数名，string 是函数参数的预期类型
// 它的意思是，该函数用来断言参数 value 的类型是 string，如果达不到要求，程序就会在这里中断
```

注：

使用了断言函数的新写法以后，TypeScript 就会自动识别，只要执行了该函数，对应的变量都为断言的类型。

### 5.2、断言函数 - 注意事项

函数返回值的断言写法，只是用来更清晰地表达函数意图，真正的检查是需要开发者自己部署的。

而且，如果内部的检查与断言不一致，TypeScript 也不会报错。

```tsx
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'number') throw new Error('不是数字类型 !')
}

// 函数的断言是参数 value 类型为字符串，但是实际上，内部检查的却是它是否为数值，如果不是就抛错
// 这段代码能够正常通过编译，表示 TypeScript 并不会检查断言与实际的类型检查是否一致
```

另外，断言函数的`asserts`语句等同于`void`类型，所以如果返回除了`undefined`和`null`以外的值，都会报错。

```tsx
function isString(value: unknown): asserts value is string {
  if (typeof value !== 'string') throw new Error('不是字符串类型 ！')
  return true // 报错
}

// 断言函数返回了true，导致报错
```

### 5.3、断言函数的实践应用

```tsx
// 访问级别
type AccessLevel = 'r' | 'w' | 'rw'

// 定义 允许读取访问权限函数
function allowsReadAccess(level: AccessLevel): asserts level is 'r' | 'rw' {
  if (!level.includes('r')) throw new Error('不允许读取 !')
}

// 函数 allowsReadAccess() 用来断言参数 level 一定等于 r 或 rw
```

如果要断言参数非空，可以使用工具类型 `NonNullable<T>`

```tsx
function foo<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}

// 工具类型 NonNullable<T> 对应类型 T 去除空类型后的剩余类型
```

如果要将断言函数用于函数表达式，可以采用下面的写法。

```tsx
// 写法一
const assertIsNumber = (value: unknown): asserts value is number => {
  if (typeof value !== 'number') throw Error('不是 number 类型')
}

// 写法二
type AssertIsNumber = (value: unknown) => asserts value is number

const assertIsNumber: AssertIsNumber = (value) => {
  if (typeof value !== 'number') throw Error('不是 number 类型')
}
```

注意，断言函数与类型保护函数（type guard）是两种不同的函数。它们的区别是，断言函数不返回值，而类型保护函数总是返回一个布尔值。

```tsx
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// 以上就是一个类型保护函数 isString()
// 作用是检查参数 value 是否为字符串。如果是的，返回 true，否则返回 false。
// 该函数的返回值类型是 value is string，其中的 is 是一个类型运算符，如果左侧的值符合右侧的类型，则返回 true，否则返回 false
```

如果要断言某个参数保证为真（即不等于`false`、`undefined`和`null`），TypeScript 提供了断言函数的一种简写形式。

```tsx
function assert(x: unknown): asserts x {
  // ...
}

// 函数 assert() 的断言部分，asserts x 省略了谓语和宾语，表示参数 x 保证为真（true）
```

同样的，参数为真的实际检查需要开发者自己实现。

```tsx
function assert(x: unknown): asserts x {
  if (!x) {
    throw new Error(`${x} 应该是一个真实的值.`)
  }
}
```

这种断言函数的简写形式，通常用来检查某个操作是否成功。

```tsx
type Person = {
  username: string
  email?: string
}

function loadPerson(): Person | null {
  return null
}

let person = loadPerson()

// 定义一个断言函数
function assert(state: unknown, message: string): asserts state {
  if (!state) throw new Error(message)
}

// Error: Person is not defined
assert(person, 'Person is not defined')
console.log(person.username)

// 只有 loadPerson() 返回结果为真（即操作成功），assert() 才不会报错。
```
