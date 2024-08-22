---
title: TS 的类型检查机制，类型兼容性、保护机制、高级类型
date: 2023-10-28
sidebar: 'auto'
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TS 的类型检查机制，类型兼容性、保护机制、高级类型

从本节内容开始，正式学习 Typescript 中的类型检查机制，高级类型，相关配置及应用等。

## 一、TS 的类型检查机制

TypeScript 编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。即：TS 的类型检查机制

**作用：** 辅助开发，提高开发效率

> 从以下几个方面来学习

- 类型推断
- 类型兼容性
- 类型保护

### 1、类型推断

不需要指定变量的类型（函数的返回值类型），TypeScript 可以根据某些规则自动地为其推断出一个类型。

- 基础类型推断
- 最佳通用类型推断
- 上下文类型推断

### 1.1、基础类型推断

基础类型推断也是 TS 中比较常见的类型推断，通常发生在以下场景中

- 初始化变量时
- 设置函数默认参数时
- 在确定函数返回值时

初始化变量时

```tsx
// 初始化变量时，声明一个变量 a
// 如果不指定它的变量类型，TS 会自动推断为 any 类型
let a

// 如果给变量 a 赋值为 1，就会推断为 number 类型
let a = 1

// 给变量 b 赋值为 空数组，b 就会被推断为以 any 类型为元素的 数组类型
let b = []

// 给 b 赋值为 [1, 2]，就会被推断为 number 类型的数组
let b = [1, 2]
```

设置函数默认参数时

```tsx
// 定义一个函数 c ，为它指定一个默认的参数 x，值为 1，x 被推断为 number 类型
let c = (x = 1) => {}
```

在确定函数返回值时

```tsx
// 将该函数返回 x + 1 ，c 的返回值类型就会被 推断为 number 类型
let c = (x = 1) => x + 1
```

### 1.2、最佳通用类型推断

当需要从多个类型中推断出一个类型时，TS 就会尽可能的推断出一个兼容当前所有类型的通用类型，这个就是最佳通用类型推断

```tsx
// 给数组增加一个 null，null 和 number 类型是不兼容的
// 因此，d 就会被推断为 null 和 number 的联合类型
let d = [1, null]
```

如果在 `tsconfig.json` 配置文件中关闭 `"strictNullChecks": false`

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

> 此时，以上 null 和 number 就兼容了，d 就会被推断为 number 类型的数组

```tsx
// 修改完配置文件后，d 就会被推断为 number 类型的数组
let d = [1, null]
```

> 以上的类型推断都是从右向左的推断，也就是根据表达式右侧的值来推断表达式左侧的变量的类型

### 1.3、上下文类型推断

上下文类型的推断是从左到右的，它通常会发生在一个事件处理中

```tsx
// 给 window 绑定一个 onkeydown 事件，这时就会发生上下文的类型推断
// TS 会根据左侧的事件绑定，来推断出右侧的事件类型，会被推断为 KeyboardEvent 类型（鼠标划上 event 即可看到）
window.onkeydown = (event) => {
  // 打印输出 event 键盘事件有哪些属性
  // event.button 会报错：类型“KeyboardEvent”上不存在属性“button”，因为 button 不是键盘事件的属性，而是鼠标事件的属性
  console.log(event.button)
}
```

### 2、类型断言

有时候，TS 的类型推断可能不符合你的预期，而且你完全有自信比 TS 更了解你的代码。

这时 TS 就提供了一种方法，允许你覆盖它的推断，即：**类型断言**

```tsx
// 定义一个空对象
let foo = {}
// 给对象指定 bar 属性，此时会报错：类型“{}”上不存在属性“bar”
foo.bar = 1
```

如何解决以上的报错问题呢 ？

```tsx
// 定义一个接口
interface Foo {
  // 给接口定义一个 bar 属性
  bar: number
}

// 利用 类型断言将 foo 指定为一个 Foo 接口类型，这时就不会报错了（类型断言就发挥作用了）
let foo = {} as Foo
foo.bar = 1
```

同时，也要注意类型断言不能乱用

```tsx
interface Foo {
  bar: number
}

// let foo = {} as Foo

// 比如：去掉该赋值语句
// 这时没有报错，但 foo 对象并么有按照接口的严格规定给其赋值为一个 bar 属性
// foo.bar = 1

// 因此在声明时，就指定类型
let foo: Foo = {
  // TS 要求必须添加接口中的属性
  bar: 1,
}
```

注：

类型断言，可以增加代码的灵活性，再改造一些旧代码时会非常有效。

但使用类型断言要注意避免滥用，需要对上下文环境有充分的预判，没有任何根据的类型断言，会给我们的代码带来安全隐患。

### 3、总结

TS 的类型推断我们可以为我们提供重要的辅助信息，应该深加利用。

我们也可以检查下之前写的代码，观察哪里部分可以使用类型推断进行优化。

## 二、类型的兼容性

当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y

> 其中，X 被叫做 **目标类型**，Y 被叫做 **源类型**

X 兼容 Y ：X（目标类型）= Y（源类型）

```tsx
// X 兼容 Y ：X（目标类型）= Y（源类型）

// 定义一个字符串变量 s
let s: string = 'ibc'
// 当关闭 tsconfig.json 配置文件中为 "strictNullChecks": false 时
// 字符串变量是可以被赋值为 null 的，此时我们可以说字符型是可以兼容 null 类型的
// 即：null 是字符型的子类型
s = null
```

注：

之所以，我们要讨论类型兼容性问题，是因为 TS 允许我们把一些类型不同的变量相互赋值。

虽然在某种程度上讲会产生不可靠的行为，但却增加了语言的灵活性，而类型兼容性的例子会广泛存在于 接口、函数 和 类中。

### 1、接口兼容性

下面我们来观察两个接口是如何兼容的

```tsx
// 定义接口 X ，其中有两个属性
interface X {
  a: any
  b: any
}
// 定义接口 Y ，其中有三个属性
interface Y {
  a: any
  b: any
  c: any
}

// 定义变量 x 和 y 分别符合以上接口类型
let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }

// 思考 x 和 y 可以相互赋值吗

// x 是可以被赋值给 y
x = y
// y 不能被赋值为 x（会报错）
y = x
```

注：

只要 Y 接口具备 X 接口的所有属性（即：a 和 b），即使有 额外的属性 c ，y 仍然可以被认为是 X 类型。即 X 类型可以兼容 Y 类型

> 这里再次体现了 TS 的类型检查原则，即：鸭式辨型法

“一只鸟，看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么这只鸟就可以被认为是鸭子”。总结：语言类型必须具备目标类型的必要属性，就可以进行赋值。

> 总结一句口诀：接口之间相互兼容时，成员少的兼容成员多的

### 2、函数兼容性

函数之间兼容的条件有以下三个

- 参数个数
- 参数类型
- 返回值类型

需要判断两个函数是不是兼容，通常会发生在两个函数相互赋值的情况下

> 当函数作为参数时

```tsx
// 函数兼容性

// 定义函数类型 Handler，有两个参数 a 和 b
type Handler = (a: number, b: number) => void

// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回
function hof(handler: Handler) {
  return handler
}
```

注：

当我们给以上高阶函数传入一个参数时，就会判断该参数是否 和 Handler 类型兼容，Handler 为目标类型，传入的参数为 源类型。

> 如果要目标函数 兼容 源函数，它们需要同时满足三个条件（如下）

### 2.1、参数个数

```tsx
// 函数兼容性

// 定义函数类型 Handler，有两个参数 a 和 b
type Handler = (a: number, b: number) => void

// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回
function hof(handler: Handler) {
  return handler
}

/**
 * 当我们给以上高阶函数传入一个参数时，就会判断该参数是否 和 Handler 类型兼容
 * Handler 为目标类型，传入的参数为 源类型
 * 如果要目标函数 兼容 源函数，它们需要同时满足三个条件（如下）
 **/

// 1、参数个数（要求目标函数的参数个数一定要多余源函数的参数个数）

// 定义一个只有一个参数的函数
let handler1 = (a: number) => {}
// 将 handler1 作为参数传递给 hof 高阶函数，没问题（因为它只有一个参数）
hof(handler1)

// 定义一个有 3个 参数的函数
let handler2 = (a: number, b: number, c: number) => {}
// 将 handler2 作为参数传递给 hof 高阶函数（会报错，因为它的参数是三个，而目标函数只有两个参数）
hof(handler2)
```

注：

以上情况都是具有固定参数的函数，如果函数中含有可变参数（可选参数）或剩余参数时，会遵循其它的原则

**可选参数 和 剩余参数**

```tsx
// 定义函数 a ，为固定参数
let a = (p1: number, p2: number) => {}
// 定义函数 b，为可选参数
let b = (p1?: number, p2?: number) => {}
// 定义函数 c，为剩余参数
let c = (...args: number[]) => {}

// 原则一：固定参数是可以兼容可选参数 和 剩余参数的
a = b
a = c

// 原则二：可选参数是不兼容固定参数 和 剩余参数的（通过关闭 tsconfig.json 中 "strictFunctionTypes": false 选项即可实现兼容）
b = c
b = a

// 原则三：剩余参数可兼容 固定参数 和 可选参数
c = a
c = b
```

注：

以上是函数之间兼容必须要满足的第一个条件，即参数个数的要求。

> 函数兼容性的第二个条件，如下

### 2.2、参数类型

函数兼容性的第二个条件：参数类型，要求必须匹配

```tsx
// 定义函数类型 Handler，有两个参数 a 和 b
type Handler = (a: number, b: number) => void

// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回
function hof(handler: Handler) {
  return handler
}

// 参数类型
// 定义一个只有一个参数的函数
let handler3 = (a: string) => {}
// 将 handler3 作为参数传递给 hof 高阶函数（会报错：因为它的类型是不兼容的）
hof(handler3)
```

对象类型

```tsx
// 定义接口 Point3D 有3个属性
interface Point3D {
  x: number
  y: number
  z: number
}

// 定义接口 Point2D 有2个属性
interface Point2D {
  x: number
  y: number
}

// 定义两个函数 p3d 和 p2d，它们的参数是上边定义的接口类型
// 以下函数的 参数个数是相同的，参数的类型都是 对象
let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}

// 它们之间的兼容性如何 ？

// p3d 兼容 p2d
p3d = p2d
// p2d 不兼容 p3d（观察两个函数的参数，它们都是对象：p3d 中有3个成员，p2d 中有2个成员）
// 即：成员个数多的 兼容 成员个数少的（与之前接口之间兼容性的结论正好相反）两个接口之间兼容要求成员少的 兼容 成员多的
// 这里正好相反，很容易混淆（可以用另一种方法来看：不要把 Point3D 接口对象看成一个整体的对象，可以拆分成 3个参数，即参数多的兼容参数少的，与之前的结论就一致了）
p2d = p3d
```

如果一定要 p2d 兼容 p3d 也是可以做到的，将 `tsconfig.json` 中配置设为 false，这样两个函数就可以兼容了

```json
{
  "compilerOptions": {
    "strictFunctionTypes": false
  }
}
```

注：

以上这种函数的参数之间可以相互赋值的情况，叫做 **函数参数双向协变**

它允许我们把一个精确的类型，赋值给一个不那么精确的类型，这样做很方便。我们就不需要把一个不精确的类型断言成一个精确的类型了。

### 2.3、返回值类型

TS 要求目标返回值类型 必须 与原函数的返回值类型相同 或 为其子类型

```tsx
// 定义函数 f，它的返回值是一个对象，其中有一个字段 username
let f = () => ({ username: 'ibc' })
// 定义函数 g，它的返回值有两个字段
let g = () => ({ username: 'ibc', location: 'Beijing' })

// f 就可以兼容 g
f = g
// g 是不兼容 f 的（因为 f 的返回值类型是 g 返回值类型的 子类型）
g = f

// 同样这里也是成员少的会兼容成员多的，与 鸭式辨型法 是一致的
```

**函数重载**

函数重载分为两个部分

- 第一部分：函数重载的列表。如：在列表中定义了两个函数，overload
- 第二部分：函数的实现。

这里，列表中的函数就是 **目标函数**，而具体的实现就是 **原函数**。程序在运行时编译器会查找重载的列表，然后使用第一个匹配的定义来执行下面的函数。

> 所以，在重载列表中目标函数的参数要多于原函数的参数，而且返回值类型也要符合相应的要求。

```tsx
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}
// 在具体实现时，增加一个参数 c ，这样就是不兼容的（因为实现的参数的个数 多于 目标函数的个数了）
function overload(a: any, b: any, c: any): any {}

// 去掉返回值，它也是不兼容的（返回值类型不兼容）
// function overload(a: any, b: any) {}
```

注：

以上是两个函数之间要兼容，所必须要满足的三个条件

### 3、枚举类型兼容性

枚举类型 和 数值类型 是可以完全互相兼容的

```tsx
// 枚举兼容性
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  Red,
  Yellow,
}

// 枚举类型 和 数值类型 是可以完全互相兼容的

// 定义变量 fruit 它的类型是 一个枚举类型，可以给它赋值任意的数字
let fruit: Fruit.Apple = 2
// 定义变量 no 它的类型是 一个数值类型，它可以被赋值给一个枚举类型
let no: number = Fruit.Apple

// 因此，我们可以看到枚举 和 数值类型是可以相互兼容的
```

枚举 和 number 之间是可以兼容的，枚举之间是不兼容的

```tsx
// 枚举兼容性
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  Red,
  Yellow,
}

// 枚举之间是完全不兼容的（如下：Color 和 Fruit 是完全不兼容的）
let color: Color.Red = Fruit.Apple
```

### 4、类的兼容性

类的兼容性 与 接口比较相似，它们也是只比较结构

**注意：** 在比较两个类是否兼容时，静态成员 和 构造函数是不参与比较的。如果两个类具备两个相同的实例成员，它们的实例就可以完全相互兼容

```tsx
// 定义两个类 A 和 B
class A {
  constructor(a: number, b: number) {}
  id: number = 1
}

class B {
  static s = 1
  constructor(a: number) {}
  id: number = 2
}

// 分别创建了两个实例 aa 和 bb
let aa = new A(1, 3)
let bb = new B(1)

// 这两个实例是完全兼容的，因为它们都具有两个实例 id
// 而构造函数 和 静态成员是不作为比较的
aa = bb
bb = aa
```

如果类 A 和 B 含有私有成员呢 ？

```tsx
// 定义两个类 A 和 B
class A {
  constructor(a: number, b: number) {}
  id: number = 1
  // 添加一个私有成员
  private username: string = ''
}

class B {
  static s = 1
  constructor(a: number) {}
  id: number = 2
  // 添加一个私有成员
  private username: string = ''
}

// 分别创建了两个实例 aa 和 bb
let aa = new A(1, 3)
let bb = new B(1)

// 以上 A 和 B 类中含有私有成员，这两个类就不兼容了（会报错）
aa = bb
bb = aa
```

注：

如果类中含有私有成员，这两个类就不兼容了

> 此时，只有父类和子类之间是可以相互兼容的

定义一个 A 的子类

```tsx
// 定义两个类 A 和 B
class A {
  constructor(a: number, b: number) {}
  id: number = 1
  // 添加一个私有成员
  private username: string = ''
}

class B {
  static s = 1
  constructor(a: number) {}
  id: number = 2
  // 添加一个私有成员
  private username: string = ''
}

// 分别创建了两个实例 aa 和 bb
let aa = new A(1, 3)
let bb = new B(1)

// aa = bb
// bb = aa

// 如果类中含有私有成员，这两个类就不兼容了
// 此时，只有父类和子类之间是可以相互兼容的

// 定义一个 A 的子类 C
class C extends A {}
// 创建 C 的实例
let cc = new C(1, 2)

// 父类 和 子类的实例是可以完全相互兼容的
aa = cc
cc = aa
```

### 5、泛型的兼容性

```tsx
// 泛型兼容性

// 定义一个泛型接口 Empty ，该接口没有任何的成员
interface Empty<T> {}

// 定义 obj1 和 obj2 两个变量，该变量都是 Empty 接口类型（其中传入的参数类型不同）
let obj1: Empty<number> = {}
let obj2: Empty<string> = {}

// 这两个变量是相互兼容的，因为 Empty 接口中没有任何的成员
obj1 = obj2
```

给 Empty 泛型接口中，添加成员

```tsx
// 给泛型接口 Empty 中添加一个成员
interface Empty<T> {
  value: T
}

let obj1: Empty<number> = {}
let obj2: Empty<string> = {}

// 这是两个变量就不兼容了（会报错）
// 也就是说只有类型参数 T 被接口成员使用时，才会影响泛型的兼容性
obj1 = obj2
```

### 6、泛型函数

```js
// 以下定了两个完全相同的泛型函数
let log1 = <T>(x: T): T => {
  console.log('x')
  return x
}
let log2 = <U>(y: U): U => {
  console.log('y')
  return y
}

// log1 和 log2 是完全兼容的
// 即：如果两个泛型函数的定义相同，但没有指定类型参数，那么它们之间也是可以相互兼容的
log1 = log2
```

注：

TS 允许我们在类型兼容的变种之间相互赋值，这个特性增加了语言的灵活性。

### 7、总结

关于类型兼容性的部分学习了很多规则，我们总结了几句比较好记的几条兼容性口诀：

当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y

> 其中，X 被叫做 **目标类型**，Y 被叫做 **源类型**

**口诀：**

- 结构之间兼容：成员少的兼容成员多的
- 函数之间兼容：参数多的兼容参数少的

## 三、TS 的类型保护机制

我们先来观察如下代码

```tsx
enum Type {
  Strong,
  week,
}

// 定义 Java 类
class Java {
  helloJava() {
    console.log('Hello Java')
  }
}

// 定义 JavaScript 类
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
}

// 定义一个函数
function getLanguage(type: Type) {
  // 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // 增加一个功能，即：创建实例后，运行该实例打印的方式
  // 以下提示报错（lang 是 Java 和 JavaScript 的联合类型）此时 TS 是不能判断它具体是哪一种类型的
  // 需要添加 类型断言，就不会报错了
  // if(lang.helloJava){
  //     lang.helloJava()
  // } else {
  //     lang.helloJavaScript()
  // }
  if ((lang as Java).helloJava) {
    ;(lang as Java).helloJava()
  } else {
    ;(lang as JavaScript).helloJavaScript()
  }

  return lang
}

getLanguage(Type.Strong)
```

注：

由于不知道程序在运行时，到底会传入什么样的参数，所以就必须要在每一处都加上类型断言。显然这不是一种理想的方案，代码的可读性很差

> 而类型保护机制就是用来解决这个问题的，它可以提前对类型做出预判。

### 1、什么是类型保护

- TypeScript 能够在特定的区块中保证变量属于某种确定的类型。
- 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法。

> 接下来我们就来使用 4 种创建特殊区块的方法

### 2、instanceof 方法

该方法类型保护的方法用来判断一个实例是不是属于某个类

```tsx
enum Type {
  Strong,
  week,
}

// 定义 Java 类
class Java {
  helloJava() {
    console.log('Hello Java')
  }
}

// 定义 JavaScript 类
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
}

// 定义一个函数
function getLanguage(type: Type) {
  // 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // instanceof 方法用来判断一个实例是不是属于某个类

  // 如果 lang 属于 Java 类
  if (lang instanceof Java) {
    // TS 就能保证 lang 一定是 Java 类的实例，相应的方法也会自动提示出来
    lang.helloJava()
  } else {
    // 在 else 区块中，TS 就会判断 lang 对象一定是 JavaScript 的实例，相应的方法也会直接提示出来
    lang.helloJavaScript()
  }

  // 这样的代码就比之前使用 类型断言简洁多了

  return lang
}

getLanguage(Type.Strong)
```

### 3、in 方法

in 关键字可以判断一个属性是不是属于某个对象

> 我们在以上代码 Java 和 JavaScript 类中，分别加入属性

```tsx
enum Type {
  Strong,
  week,
}

// 定义 Java 类
class Java {
  helloJava() {
    console.log('Hello Java')
  }
  // 新增属性
  java: any
}

// 定义 JavaScript 类
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  // 新增属性
  javascript: any
}

// 定义一个函数
function getLanguage(type: Type) {
  // 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // in 方法可以判断一个属性是不是属于某个对象

  // 通过以上新增的两个属性来创建类型保护区块（if 和 else 两个区块）
  if ('java' in lang) {
    // 在第一个区块中，TS 会判断该对象一定是 Java 类的实例
    lang.helloJava()
  } else {
    // 在第一个区块中，TS 会判断该对象一定是 JavaScript 类的实例
    lang.helloJavaScript()
  }

  return lang
}

getLanguage(Type.Strong)
```

### 4、typeof 方法

typeof 方法 ，用来判断一个基本的类型

给 getLanguage 函数增加一个参数 x 为联合类型

```tsx
enum Type {
  Strong,
  week,
}

// 定义 Java 类
class Java {
  helloJava() {
    console.log('Hello Java')
  }
  // 新增属性
  java: any
}

// 定义 JavaScript 类
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  // 新增属性
  javascript: any
}

// 给函数增加一个参数 x
function getLanguage(type: Type, x: string | number) {
  // 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // typeof 方法 ，用来判断一个基本的类型

  // 用 typeof 来判断 x 的类型
  if (typeof x === 'string') {
    // 该区块中 x 的类型就一定是 string 类型，x 就可以拥有 string的一些属性，如下
    x.length
  } else {
    // 该区块中 x 的类型就一定是 number 类型，x 就拥有了 number 的一些方法
    x.toFixed(2)
  }

  return lang
}

// getLanguage(Type.Strong)
```

### 5、通过创建类型保护函数来判断对象的类型

> 该函数需要自定义

```tsx
enum Type {
  Strong,
  week,
}

// 定义 Java 类
class Java {
  helloJava() {
    console.log('Hello Java')
  }
  // 新增属性
  java: any
}

// 定义 JavaScript 类
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  // 新增属性
  javascript: any
}

// 自定义创建类型保护函数来判断对象的类型

// 该函数的返回值是一种特殊的返回值，叫做 "类型谓词"
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

// 给函数增加一个参数 x
function getLanguage(type: Type, x: string | number) {
  // 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例
  let lang = type === Type.Strong ? new Java() : new JavaScript()

  // 使用自定义类型保护函数来判断
  if (isJava(lang)) {
    // 该类型保护区块，TS 会判断该对象一定是 Java 类的实例
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}

// getLanguage(Type.Strong)
```

### 6、总结

我们学习了 TS 的类型保护机制，分别是

- 类型推断
- 类型兼容性
- 类型保护

利用这些机制，再配合 IDE 的自定补全 和 提示功能，可以极大提高开发效率，可以深加利用。