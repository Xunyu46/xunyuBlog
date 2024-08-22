---
title: TypeScript 函数类型、symbol 类型、对象类型
date: 2023-10-28
sidebar: 'auto'
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 函数类型、symbol 类型、对象类型

从本节开始正式深入学习 TypeScript 的函数类型、对象类型、symbol 类型

- 函数类型
- symbol 类型
- 对象类型

## 一、函数类型

以下 add 函数是一个常见的 ES6 函数，但在 TS 中会报错提示：参数 `“x/y”`隐式具有 `“any”` 类型。它的含义就是我们要为函数参数加上类型注解。

```tsx
// 函数
let add = (x, y) => x + y // 报错
```

![image-20230619160736353](https://www.arryblog.com/assets/img/image-20230619160736353.539594c8.png)

```tsx
// 函数
// let add = (x,y) => x + y // 报错

// 给以上 ES6 函数的参数添加 类型注解
let add = (x: number, y: number) => x + y

// 同时，在以上 () 后边还可以加上 返回值 的类型
// 通常，这个返回值类型会省略，这是利用了 TS 的类型推导功能
let add = (x: number, y: number): number => x + y
```

![image-20230619161245843](https://www.arryblog.com/assets/img/image-20230619161245843.ddc40571.png)

定义一个函数类型

```tsx
// 定义 compute 函数类型
let compute: (x: number, y: number) => number

// 实现 compute 函数
compute = (a, b) => a + b
// 使用 compute 函数
console.log(compute(1, 2))
```

注：

在实际实现过程中，函数的参数名称可以和定义时不一样，而且也不必指定具体的类型了

### 1、函数类型声明

函数的类型声明，需要在声明函数时，给出参数的类型和返回值的类型。

```tsx
function foo(str: string): void {
  console.log('hi ' + str)
}

// 函数 foo() 在声明时，需要给出参数 str 的类型（string），以及返回值的类型（void），后者写在参数列表的圆括号后面
// void 类型表示没有返回值（后边会详细讲解）
```

如果不指定参数类型（比如上例不写`str`的类型），TypeScript 就会推断参数类型，如果缺乏足够信息，就会推断该参数的类型为`any`。

> 返回值的类型通常可以不写，因为 TypeScript 自己会推断出来。

```tsx
function foo(str: string) {
  console.log('hi ' + str)
}

// 由于没有 return 语句，TypeScript 会推断出函数 foo() 没有返回值
```

不过，有时候出于文档目的，或者为了防止不小心改掉返回值，还是会写返回值的类型。

### 1.1、变量被赋值一个函数

如果变量被赋值为一个函数，变量的类型有两种写法

```tsx
// 写法一
const foo1 = function (str: string) {
  console.log('hi ' + str)
}

foo1('艾编程') // hi 艾编程

// 写法二
const foo2: (str: string) => void = function (str) {
  console.log('hi ' + str)
}

foo2('icoding') // hi icoding

// 变量 foo1 和 foo2 被赋值为一个函数，它的类型有两种写法：
// 写法一：是通过等号右边的函数类型，推断出变量 foo 的类型；
// 写法二：是使用箭头函数的形式，为变量 foo2 指定类型，参数的类型写在箭头左侧，返回值的类型写在箭头右侧
```

写法二的两个注意事项：

- ①、函数的参数要放在圆括号里面，不放会报错
- ②、类型里面的参数名（本例是`str`）是必须的。有的语言的函数类型可以不写参数名（比如 C 语言），但是 TypeScript 不行。如果写成`(string) => void`，TypeScript 会理解成函数有一个名叫 string 的参数，并且这个`string`参数的类型是`any`。

函数类型没写参数名，导致 TypeScript 认为参数类型都是`any`。

```tsx
type Func = (string, number) => number // 报错
// (string: any, number: any) => number;

// 函数类型没写参数名，导致 TypeScript 认为参数类型都是 any
```

### 1.2、参数名与实际参数名

函数类型里面的参数名与实际参数名，可以不一致。

```tsx
let foo: (a: number) => number

foo = function (b: number) {
  return b
}

// 函数类型里面的参数名为 a，实际的函数定义里面，参数名为 b，两者并不相同（但并没问题）。
```

### 1.3、type 命令定义函数别名

如果函数的类型定义很冗长，或者多个函数使用同一种类型，写法二用起来就很麻烦。

因此，往往用`type`命令为函数类型定义一个别名，便于指定给其他变量。

```tsx
type Func = (str: string) => void

const foo: Func = function (str) {
  console.log('hi ' + str)
}

foo('icoding') // hi icoding

// type 命令为函数类型定义了一个别名 Func，后面使用就很方便，变量可以指定为这个类型
```

### 1.4、函数参数注意事项

函数的实际参数个数，可以少于类型指定的参数个数，但是不能多于，即 TypeScript 允许省略参数。

```tsx
// func 的类型只能接受两个参数
let func: (a: number, b: number) => number

// 赋值一个参数
func = (a: number) => a // 正确
// 赋值三个参数（多余原定的参数）
func = (a: number, b: number, c: number) => a + b + c // 报错

// 变量 func 的类型只能接受两个参数，如果被赋值为只有一个参数的函数，并不报错
// 但是，被赋值为有三个参数的函数，就会报错
```

注：

以上特性的原因是，JavaScript 函数在声明时往往有多余的参数，实际使用时可以只传入一部分参数。

比如，数组的`forEach()`方法的参数是一个函数，该函数默认有三个参数`(item, index, array) => void`，实际上往往只使用第一个参数`(item) => void`。

> 因此，TypeScript 允许函数传入的参数不足

```js
const arr = [1, 2, 3]

arr.forEach((item, index, array) => {
  console.log(item, index, array)
})
```

在 TS 中

```tsx
let a = (x: number) => 0
let b = (y: number, z: string) => 0

b = a // 正确
a = b // 报错

// 函数 a 只有一个参数，函数 b 有两个参数，a 可以赋值给 b，反过来就不行
```

### 2、使用 typeof 运算符

如果一个变量要套用另一个函数类型，有一个小技巧，就是使用`typeof`运算符。

```tsx
function add(x: number, y: number) {
  return x + y
}

const myAdd: typeof add = function (x, y) {
  return x + y
}

// 函数 myAdd() 的类型与函数 add() 是一样的，那么就可以定义成 typeof add
// 因为函数名 add 本身不是类型，而是一个值，所以要用 typeof 运算符返回它的类型
```

注：

这是一个很有用的技巧，任何需要类型的地方，都可以使用`typeof`运算符从一个值获取类型。

### 3、函数类型的对象写法

如下，变量`add`的类型就写成了一个对象

```tsx
let add: {
  (x: number, y: number): number
}

add = function (x, y) {
  return x + y
}
```

### 3.1、函数类型的对象语法

```tsx
{
  (参数列表): 返回值
}

// 这种写法的函数参数与返回值之间，间隔符是冒号 : ，而不是正常写法的箭头 =>
// 因为这里采用的是对象类型的写法，对象的属性名与属性值之间使用的是冒号
```

这种写法平时很少用，但是非常合适用在一个场合：函数本身存在属性。

```tsx
function foo(x: number) {
  console.log(x)
}

foo.version = '1.0'

// 函数 foo() 本身还有一个属性 version
// 这时，foo 完全就是一个对象，类型就要使用对象的写法
```

函数本身存在属性时，使用对象写法

```tsx
function foo(x: number) {
  console.log(x)
}

foo.version = '1.0'

// 使用函数类型的对象语法
let f: {
  (x: number): void
  version: string
} = foo
```

### 4、函数类型的 Interface 写法

函数类型也可以使用 Interface 来声明，这种写法就是对象写法的翻版。

```tsx
interface fn {
  (a: number, b: number): number
}

var add: fn = (a, b) => a + b

// interface 命令定义了接口 fn，这个接口的类型就是一个用对象表示的函数
```

### 5、Function 类型

TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。

```tsx
function foo(f: Function) {
  return f(1, 2, 3)
}

// 参数 f 的类型就是 Function，代表这是一个函数
```

注：

- Function 类型的值都可以直接执行
- Function 类型的函数可以接受任意数量的参数，每个参数的类型都是`any`，返回值的类型也是`any`，代表没有任何约束

> 所以，不建议使用这个类型，给出函数详细的类型声明会更好

### 6、箭头函数

箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。

```tsx
const repeat = (str: string, num: number): string => str.repeat(num)

// 变量 repeat 被赋值为一个箭头函数，类型声明写在箭头函数的定义里面
// 其中，参数的类型写在参数名后面，返回值类型写在参数列表的圆括号后面
```

注意，类型写在箭头函数的定义里面，与使用箭头函数表示函数类型，写法有所不同。

```tsx
function foo(fn: (a: string) => void): void {
  fn('icoding')
}

// 函数 foo() 的参数 fn 是一个函数，类型就用箭头函数表示
// 这时，fn 的返回值类型要写在箭头右侧，而不是写在参数列表的圆括号后面
```

### 7、综合应用

```tsx
type Person = { username: string }

const people = ['icoding', 'ibc', 'allen'].map((username): Person => ({ username }))

// Person 是一个类型别名，代表一个对象，该对象有属性 username
// 变量 people 是数组的 map() 方法的返回值
```

注：

`map()`方法的参数是一个箭头函数`(username): Person => ({username})`，该箭头函数的参数`username`的类型省略了。

因为可以从`map()`的类型定义推断出来，箭头函数的返回值类型为`Person`。相应地，变量`people`的类型是`Person[]`。

至于箭头后面的`({username})`，表示返回一个对象，该对象有一个属性`username`，它的属性值为变量`username`的值。这里的圆括号是必须的，否则`(username): Person => {username}`的大括号表示函数体，即函数体内有一行语句`username`，同时由于没有`return`语句，这个函数不会返回任何值。

注意，以下两种写法都是不对的 ！

```tsx
// 错误
;(username: Person) => ({ username })

// 错误
username: (Person) => ({ username })

// 两种写法在以上案例中都是错的

// 第一种写法表示，箭头函数的参数 username 的类型是 Person，同时没写函数返回值的类型，让 TypeScript 自己去推断
// 第二种写法中，函数参数缺少圆括号
```

### 8、可选参数

如果函数的某个参数可以省略，则在参数名后面加问号表示。

```tsx
function foo(a?: number) {
  console.log(a)
}

foo() // undefined
foo(123) // 123

// 参数 a 后面有问号，表示该参数可以省略
```

参数名带有问号，表示该参数的类型实际上是`原始类型|undefined`，它有可能为`undefined`。比如，上例的`a`虽然类型声明为`number`，但是实际上是`number|undefined`。

```tsx
function foo(a?: number) {
  return a
}

foo(undefined) // 正确

console.log(foo(undefined)) // undefined

// 参数 a 是可选的，等同于说 a 可以赋值为 undefined
```

但是，反过来就不成立，类型显式设为`undefined`的参数，就不能省略

```tsx
function foo(a: number | undefined) {
  return a
}

foo() // 报错

// 参数 a 的类型是 number|undefined，表示要么传入一个数值，要么传入 undefined，如果省略这个参数，就会报错
```

函数的可选参数只能在参数列表的尾部，跟在必选参数的后面

```tsx
let foo: (a?: number, b: number) => number // 报错
// let foo: (a: number, b?: number) => number; // 正确

// 可选参数在必选参数前面，就报错了
```

如果前部参数有可能为空，这时只能显式注明该参数类型可能为`undefined`

```tsx
let foo: (a: number | undefined, b: number) => number

// 参数 a 有可能为空，就只能显式注明类型包括 undefined，传参时也要显式传入 undefined
```

函数体内部用到可选参数时，需要判断该参数是否为`undefined`

```tsx
let foo: (a: number, b?: number) => number

foo = function (x, y) {
  if (y === undefined) {
    return x
  }
  return x + y
}

// 由于函数的第二个参数为可选参数，所以函数体内部需要判断一下，该参数是否为空。
```

### 9、参数默认值

TypeScript 函数的参数默认值写法，与 JavaScript 一致。

设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值。

```tsx
function foo(a: number = 0, b: number = 0): [number, number] {
  return [a, b]
}

foo() // [0, 0]

// 参数 a 和 b 的默认值都是0，调用 foo() 时，这两个参数都是可以省略的
// 这里其实可以省略 a 和 b 的类型声明，因为可以从默认值推断出来
```

省略 a 和 b 的类型声明，从默认值推断类型。如下

```tsx
function foo(a = 0, b = 0) {
  return [a, b]
}

console.log(foo()) // [ 0, 0 ]
```

### 9.1、可选参数与默认值

可选参数与默认值不能同时使用

```tsx
// 报错
function foo(a?: number = 0) {
  // ...
}

// a 是可选参数，还设置了默认值，结果就报错了
```

### 9.2、传入 undefined

设有默认值的参数，如果传入`undefined`，也会触发默认值

```tsx
function foo(a = 123) {
  return a
}

foo(undefined) // 123
```

具有默认值的参数如果不位于参数列表的末尾，调用时不能省略，如果要触发默认值，必须显式传入`undefined`

```tsx
function add(a: number = 0, b: number) {
  return a + b
}

add(1) // 报错
add(undefined, 1) // 正确
```

### 10、参数解构

函数参数如果存在变量解构，类型写法如下

```tsx
function foo([x, y]: [number, number]) {
  // ...
}

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
}
```

参数解构可以结合类型别名（type 命令）一起使用，代码会看起来简洁一些

```tsx
type ABC = { a: number; b: number; c: number }

function sum({ a, b, c }: ABC) {
  console.log(a + b + c)
}
```

### 11、rest 剩余参数

rest 参数表示函数剩余的所有参数，它可以是数组（剩余参数类型相同），也可能是元组（剩余参数类型不同）。

```tsx
// rest 参数为数组
function count(...nums: number[]) {
  // ...
}

// rest 参数为元组
function foo(...args: [boolean, number]) {
  // ...
}
```

注意，元组需要声明每一个剩余参数的类型。如果元组里面的参数是可选的，则要使用可选参数。

```tsx
function foo(...args: [boolean, string?]) {}
```

观察以下 rest 剩余参数案例

```tsx
function foo(a: number, ...b: number[]) {
  return b.map((x) => a * x)
}

// 参数 b 就是 rest 类型，它的类型是一个数组
```

rest 剩余参数甚至可以嵌套

```tsx
function foo(...args: [boolean, ...string[]]) {
  // ...
}
```

rest 剩余参数可以与变量解构结合使用

```tsx
function foo(...[str, num]: [string, number]): string {
  return str.repeat(num)
}

// 等同于
function foo(str: string, num: number): string {
  return str.repeat(num)
}
```

### 12、readonly 只读参数

如果函数内部不能修改某个参数，可以在函数定义时，在参数类型前面加上`readonly`关键字，表示这是只读参数。

```tsx
function count(arr: readonly number[]) {
  // ...
  arr[0] = 0 // 报错
}

// 参数 arr 的类型是 readonly number[]，表示为只读参数
// 如果函数体内部修改这个数组，就会报错
```

### 13、void 类型

void 类型表示函数没有返回值

```tsx
function foo(): void {
  console.log('icoding')
}

// 函数 foo 没有返回值，类型就要写成 void
```

如果返回其他值，就会报错

```tsx
function foo(): void {
  return 123 // 报错
}

// 函数 foo() 的返回值类型是 void，但是实际返回了一个数值，编译时就报错了
```

void 类型允许返回`undefined`或`null`

```tsx
function foo(): void {
  return undefined // 正确
}

function foo1(): void {
  return null // 正确
}
```

如果打开了`strictNullChecks`编译选项，那么 void 类型只允许返回`undefined`。如果返回`null`，就会报错。这是因为 JavaScript 规定，如果函数没有返回值，就等同于返回`undefined`。

```tsx
// 打开编译选项 strictNullChecks

function foo(): void {
  return undefined // 正确
}

function foo1(): void {
  return null // 报错
}
```

### 13.1、注意事项

需要特别注意的是，如果变量、对象方法、函数参数的类型是 void 类型的函数，那么并不代表不能赋值为有返回值的函数。

恰恰相反，该变量、对象方法和函数参数可以接受返回任意值的函数，这时并不会报错。

```tsx
type voidFunc = () => void

const foo: voidFunc = () => {
  return 123
}

// 变量 foo 的类型是 voidFunc，是一个没有返回值的函数类型
// 但是实际上，foo 的值是一个有返回值的函数（返回123），编译时不会报错
```

这是因为，这时 TypeScript 认为，这里的 `void` 类型只是表示该函数的返回值没有利用价值，或者说不应该使用该函数的返回值。只要不用到这里的返回值，就不会报错。

这样设计是有现实意义的。举例来说，数组方法`Array.prototype.forEach(fn)`的参数`fn`是一个函数，而且这个函数应该没有返回值，即返回值类型是`void`。

但是，实际应用中，很多时候传入的函数是有返回值，但是它的返回值不重要，或者不产生作用。

```tsx
const src = [1, 2, 3]
const ret = []

src.forEach((el) => ret.push(el))

// push() 有返回值，表示新插入的元素在数组里面的位置
// 但是，对于forEach()方法来说，这个返回值是没有作用的，根本用不到，所以 TypeScript 不会报错
```

如果后面使用了这个函数的返回值，就违反了约定，则会报错

```tsx
type voidFunc = () => void

const foo: voidFunc = () => {
  return 123
}

foo() * 2 // 报错

// 最后一行报错了，因为根据类型声明，foo() 没有返回值，但是却用到了它的返回值，因此报错了
```

注意，这种情况仅限于变量、对象方法和函数参数，函数字面量如果声明了返回值是 void 类型，还是不能有返回值。

```tsx
function foo(): void {
  return true // 报错
}

const fn = function (): void {
  return true // 报错
}

// 函数字面量声明了返回 void 类型，这时只要有返回值（除了undefined和null）就会报错
```

除了函数，其他变量声明为`void`类型没有多大意义，因为这时只能赋值为`undefined`或者`null`（假定没有打开`strictNullChecks`) 。

```tsx
let foo: void = undefined

// 没有打开 strictNullChecks 的情况下
let bar: void = null
```

### 14、never 类型

`never`类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

> 它主要有以下两种情况

### 14.1、抛出错误的函数

```tsx
function fail(msg: string): never {
  throw new Error(msg)
}

// 函数 fail() 会抛错，不会正常退出，所以返回值类型是 never
```

注意，只有抛出错误，才是 never 类型。如果显式用`return`语句返回一个 Error 对象，返回值就不是 never 类型。

```tsx
function fail(): Error {
  return new Error('Something failed')
}

// 函数 fail() 返回一个 Error 对象，所以返回值类型是 Error
```

### 14.2、无限执行的函数

```tsx
const foo = function (): never {
  while (true) {
    console.log('icoding')
  }
}

// 函数 foo() 会永远执行，不会返回，所以返回值类型是 never
```

### 14.3、never 类型注意事项

注意，`never`类型不同于`void`类型。前者表示函数没有执行结束，不可能有返回值；后者表示函数正常执行结束，但是不返回值，或者说返回`undefined`

```tsx
// 正确
function foo(): void {
  console.log('icoding')
}

// 报错
function foo(): never {
  console.log('icoding')
}

// 函数 foo() 虽然没有 return 语句，但实际上是省略了return undefined这行语句，真实的返回值是 undefined
// 所以，它的返回值类型要写成 void，而不是 never，写成 never 会报错
```

如果一个函数抛出了异常或者陷入了死循环，那么该函数无法正常返回一个值，因此该函数的返回值类型就是`never`。如果程序中调用了一个返回值类型为`never`的函数，那么就意味着程序会在该函数的调用位置终止，永远不会继续执行后续的代码。

```tsx
function neverReturns(): never {
  throw new Error()
}

function foo(x: string | undefined) {
  if (x === undefined) {
    neverReturns()
  }

  x // 推断为 string
}

// 函数 foo() 的参数 x 的类型为 string|undefined
// 但是，x 类型为undefined时，调用了neverReturns()
// 这个函数不会返回，因此 TypeScript 可以推断出，判断语句后面的那个 x，类型一定是 string
```

一个函数如果某些条件下有正常返回值，另一些条件下抛错，这时它的返回值类型可以省略`never`。

```tsx
function foo(): number {
  if (Math.random() > 0.6) {
    return 123
  }

  throw new Error('报错了！')
}

const result = foo()

// 函数 foo() 的返回值其实是 number|never，但是一般都写成 number，包括最后一行的变量 result 的类型，也是被推断为 number
```

注：

原因是前面提到过，`never`是 TypeScript 的唯一一个底层类型，所有其他类型都包括了`never`。

从集合论的角度看，`number|never`等同于`number`。这也提示我们，函数的返回值无论是什么类型，都可能包含了抛出错误的情况。

### 15、局部类型

函数内部允许声明其他类型，该类型只在函数内部有效，称为 **局部类型**。

```tsx
function foo(txt: string) {
  type message = string
  let newTxt: message = 'hi ' + txt
  return newTxt
}

const newTxt: message = foo('icoding') // 报错

// 类型 message 是在函数 foo() 内部定义的，只能在函数内部使用。在函数外部使用，就会报错。
```

### 16、高阶函数

一个函数的返回值还是一个函数，那么前一个函数就称为高阶函数（higher-order function）

> 下面就是一个例子，箭头函数返回的还是一个箭头函数

```tsx
;(val: number) => (nums: number) => val * nums
```

### 17、函数重载

有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。

这种根据参数类型不同，执行不同逻辑的行为，称为 **函数重载**（function overload）。

```tsx
foo('icoding') // 'gnidoci'
foo([1, 2, 3]) // [3, 2, 1]

// 函数 foo() 可以将参数颠倒输出。参数可以是字符串，也可以是数组
```

这意味着，该函数内部有处理字符串和数组的两套逻辑，根据参数类型的不同，分别执行对应的逻辑。这就叫 **“函数重载”**。

TypeScript 对于 “函数重载” 的类型声明方法是，逐一定义每一种情况的类型

```tsx
function foo(str: string): string
function foo(arr: any[]): any[]

// 分别对函数 foo() 的两种参数情况，给予了类型声明
// 但是，到这里还没有结束，后面还必须对函数 foo() 给予完整的类型声明
```

以下代码中，前两行类型声明列举了重载的各种情况。第三行是函数本身的类型声明，它必须与前面已有的重载声明兼容

```tsx
function foo(str: string): string
function foo(arr: any[]): any[]
function foo(stringOrArray: string | any[]): string | any[] {
  if (typeof stringOrArray === 'string') return stringOrArray.split('').reverse().join('')
  else return stringOrArray.slice().reverse()
}
```

有一些编程语言允许不同的函数参数，对应不同的函数实现。但是，JavaScript 函数只能有一个实现，必须在这个实现当中，处理不同的参数。

因此，函数体内部就需要判断参数的类型及个数，并根据判断结果执行不同的操作。

```tsx
function add(x: number, y: number): number
function add(x: any[], y: any[]): any[]
function add(x: number | any[], y: number | any[]): number | any[] {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y
  } else if (Array.isArray(x) && Array.isArray(y)) {
    return [...x, ...y]
  }

  throw new Error('参数错误 ！')
}

// 函数 add() 内部使用 if 代码块，分别处理参数的两种情况
```

注：

重载的各个类型描述与函数的具体实现之间，不能有其他代码，否则报错。

另外，虽然函数的具体实现里面，有完整的类型声明。但是，函数实际调用的类型，以前面的类型声明为准。

> 比如，上例的函数实现，参数类型和返回值类型都是`number|any[]`，但不意味着参数类型为`number`时返回值类型为`any[]`。

### 17.1、函数重载的冲突问题 与 排序

函数重载的每个类型声明之间，以及类型声明与函数实现的类型之间，不能有冲突。

```tsx
// 报错
function foo(a: boolean): void
function foo(a: string): void
function foo(a: number | string) {
  console.log(a)
}

// 函数重载的类型声明与函数实现是冲突的，导致报错。
```

重载声明的排序很重要，因为 TypeScript 是按照顺序进行检查的，一旦发现符合某个类型声明，就不再往下检查了，所以类型最宽的声明应该放在最后面，防止覆盖其他类型声明。

```tsx
function foo(a: any): number
function foo(a: string): 0 | 1
function foo(a: any): any {
  // ...
}

const x: 0 | 1 = foo('icoding') // 报错

// 第一行类型声明 a:any 范围最宽，导致函数 foo() 的调用都会匹配这行声明，无法匹配第二行类型声明
// 所以最后一行调用就报错了，因为等号两侧类型不匹配，左侧类型是 0|1，右侧类型是 number
```

以上函数重载的正确顺序是，第二行类型声明放到第一行的位置

```tsx
function foo(a: string): 0 | 1
function foo(a: any): number
function foo(a: any): any {
  // ...
}

const x: 0 | 1 = foo('icoding') // 正确
```

### 17.2、对象方法使用重载

对象的方法也可以使用重载

```tsx
class StringBuilder {
  // 私有属性（ES6 语法）
  #data = ''

  add(num: number): this
  add(bool: boolean): this
  add(str: string): this
  add(value: any): this {
    this.#data += String(value)
    return this
  }

  toString() {
    return this.#data
  }
}

// add() 也使用了函数重载
```

函数重载也可以用来精确描述函数参数与返回值之间的对应关系。

```tsx
function createElement(tag: 'a'): HTMLAnchorElement
function createElement(tag: 'canvas'): HTMLCanvasElement
function createElement(tag: 'table'): HTMLTableElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

const a = createElement('a')
const canvas = createElement('canvas')
const table = createElement('table')
// 传入没有对应的参数，就会报错
const p = createElement('p') // 报错

// 函数重载精确描述了参数 tag 的三个值，所对应的不同的函数返回值。
```

以上代码中函数重载，也可以用对象表示。

```tsx
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement
}
```

### 17.3、函数重载最佳实践

由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该 **优先** 使用联合类型替代函数重载。

```tsx
// 写法一
function len(s: string): number
function len(arr: any[]): number
function len(x: any): number {
  return x.length
}

// 写法二：使用联合类型
function len(x: any[] | string): number {
  return x.length
}

// 写法二使用联合类型，要比写法一的函数重载简单很多
```

### 18、构造函数

JavaScript 语言使用构造函数，生成对象的实例。

构造函数的最大特点，就是必须使用`new`命令调用。

```tsx
const date = new Date()

// Date() 就是一个构造函数，使用 new 命令调用，返回 Date 对象的实例。
```

构造函数的类型写法，就是在参数列表前面加上`new`命令。

```tsx
class Animal {
  numLegs: number = 4
}

type AnimalConstructor = new () => Animal

function create(c: AnimalConstructor): Animal {
  return new c()
}

const a = create(Animal)

// 类型 AnimalConstructor 就是一个构造函数，而函数 create() 需要传入一个构造函数
// 在 JavaScript 中，类（class）本质上是构造函数，所以 Animal 这个类可以传入 create()
```

构造函数还有另一种类型写法，就是采用对象形式。

```tsx
type Foo = {
  new (str: string): object
}

// 类型 Foo 就是一个构造函数。类型写成一个可执行对象的形式，并且在参数列表前面要加上 new 命令
```

某些函数既是构造函数，又可以当作普通函数使用，比如`Date()`。这时，类型声明可以写成下面这样。

```tsx
type Foo = {
  new (str: string): object
  (num?: number): number
}

// Foo 既可以当作普通函数执行，也可以当作构造函数使用
```

## 二、symbol 类型

Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。

Symbol 值通过`Symbol()`函数生成。在 TypeScript 里面，Symbol 的类型使用`symbol`表示。

```tsx
let a: symbol = Symbol()
let b: symbol = Symbol()

a === b // false

// 变量 a 和 b 的类型都是 symbol，且都用 Symbol() 生成，但是它们是不相等的
```

### 1、unique symbol

`symbol`类型包含所有的 Symbol 值，但是无法表示某一个具体的 Symbol 值。

比如，`5`是一个具体的数值，就用`5`这个字面量来表示，这也是它的值类型。但是，Symbol 值不存在字面量，必须通过变量来引用，所以写不出只包含单个 Symbol 值的那种值类型。

为了解决这个问题，TypeScript 设计了`symbol`的一个子类型`unique symbol`，它表示单个的、某个具体的 Symbol 值。

> 因为`unique symbol`表示单个值，所以这个类型的变量是不能修改值的，只能用`const`命令声明，不能用`let`声明。

```tsx
// 正确
const a: unique symbol = Symbol()

// 报错
let b: unique symbol = Symbol()

// let 命令声明的变量，不能是 unique symbol 类型，会报错
```

`const`命令为变量赋值 Symbol 值时，变量类型默认就是`unique symbol`，所以类型可以省略不写。

```tsx
const a: unique symbol = Symbol()
// 等同于
const a = Symbol()
```

每个声明为 unique symbol 类型的变量，它们的值都是不一样的，其实属于两个值类型

```tsx
const a: unique symbol = Symbol()
const b: unique symbol = Symbol()

a === b // 报错

// 变量 a 和 变量 b 的类型虽然都是 unique symbol，但其实是两个值类型
// 不同类型的值肯定是不相等的，所以最后一行就报错了
```

由于 Symbol 类似于字符串，可以参考下面的例子来理解。

```tsx
const a: 'hi' = 'hi'
const b: 'icoding' = 'icoding'

a === b // 报错

// 变量 a 和 b 都是字符串，但是属于不同的值类型，不能使用严格相等运算符进行比较
```

由于变量`a`和`b`是两个类型，就不能把一个赋值给另一个

```tsx
const a: unique symbol = Symbol()
const b: unique symbol = a // 报错

// 变量 a 和 变量 b 的类型都是 unique symbol
// 但是其实类型不同，所以把 a 赋值给 b 会报错
```

以上代码中，变量`b`的类型，如果要写成与变量`a`同一个`unique symbol`值类型，只能写成类型为`typeof a`

```tsx
const a: unique symbol = Symbol()
const b: typeof a = a // 正确
```

相同参数的`Symbol.for()`方法会返回相同的 Symbol 值。TypeScript 目前无法识别这种情况，所以可能出现多个 `unique symbol` 类型的变量，等于同一个 Symbol 值的情况。

```tsx
const a: unique symbol = Symbol.for('foo')
const b: unique symbol = Symbol.for('foo')

// 变量 a 和 b 是两个不同的值类型，但是它们的值其实是相等的
```

### 1.1、unique symbol 注意事项

unique symbol 类型是 symbol 类型的子类型，所以可以将前者赋值给后者，但是反过来就不行。

```tsx
const a: unique symbol = Symbol()

const b: symbol = a // 正确

const c: unique symbol = b // 报错

// unique symbol 类型（变量a）赋值给 symbol 类型（变量b）是可以的
// 但是 symbol 类型（变量b）赋值给 unique symbol 类型（变量c）会报错
```

### 1.2、unique symbol 的作用

unique symbol 类型的一个作用，就是用作属性名，这可以保证不会跟其他属性名冲突。

如果要把某一个特定的 Symbol 值当作属性名，那么它的类型只能是 unique symbol，不能是 symbol。

```tsx
const a: unique symbol = Symbol()
const b: symbol = Symbol()

interface Foo {
  [a]: string // 正确
  [b]: string // 报错
}

// 变量 b 当作属性名，但是 b 的类型是 symbol，不是固定不变的值，导致报错。
```

`unique symbol`类型也可以用作类（class）的属性值，但只能赋值给类的`readonly static`属性。

```tsx
class C {
  static readonly foo: unique symbol = Symbol()
}

// 静态只读属性 foo 的类型就是 unique symbol
// 注意，这时 static 和 readonly 两个限定符缺一不可，这是为了保证这个属性是固定不变的
```

### 2、类型推断

如果变量声明时没有给出类型，TypeScript 会推断某个 Symbol 值变量的类型。

`let`命令声明的变量，推断类型为 symbol

```tsx
// 类型为 symbol
let a = Symbol()
```

`const`命令声明的变量，推断类型为 unique symbol

```tsx
// 类型为 unique symbol
const a = Symbol()
```

但是，`const`命令声明的变量，如果赋值为另一个 symbol 类型的变量，则推断类型为 symbol

```tsx
let a = Symbol()

// 类型为 symbol
const b = a
```

`let`命令声明的变量，如果赋值为另一个 unique symbol 类型的变量，则推断类型还是 symbol

```tsx
const a = Symbol()

// 类型为 symbol
let b = a
```

## 三、对象类型

除了原始类型，对象是 JavaScript 最基本的数据结构。TypeScript 对于对象类型有很多规则。

### 1、对象类型的声明

对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

```tsx
const obj: {
  a: number
  b: number
} = { a: 1, b: 2 }

// 对象 obj 的类型就写在变量名后面，使用大括号描述，内部声明每个属性的属性名和类型
```

属性的类型可以用分号结尾，也可以用逗号结尾。

```tsx
// 属性类型以分号结尾
type Obj = {
  a: number
  b: number
}

// 属性类型以逗号结尾
type Obj = {
  a: number
  b: number
}

// 最后一个属性后面，可以写分号或逗号，也可以不写
```

### 1.1、对象类型赋值

一旦声明了类型，对象赋值时，就不能缺少指定的属性，也不能有多余的属性。

```tsx
type Obj = {
  a: number
  b: number
}

const o1: Obj = { a: 1 } // 报错
const o2: Obj = { a: 1, b: 1, c: 1 } // 报错

// 变量 o1 缺少了属性 b，变量 o2 多出了属性 c，都会报错
```

### 1.2、对象属性读写

读写不存在的属性也会报错

```tsx
const obj: {
  a: number
  b: number
} = { a: 1, b: 1 }

console.log(obj.c) // 报错
obj.c = 1 // 报错

// 读写不存在的属性 c 都会报错
```

### 1.3、对象属性删除 与 修改

同样，也不能删除类型声明中存在的属性，修改属性值是可以的。

```tsx
const users = {
  username: 'icoding',
}

delete users.username // 报错
users.username = 'ibc' // 正确

// 删除类型声明中存在的属性 username 会报错，但是可以修改它的值
```

### 1.4、对象的方法

对象的方法使用函数类型描述

```tsx
const obj: {
  a: number
  b: number
  add(a: number, b: number): number
  // 或者写成
  // add: (a: number, b: number) => number;
} = {
  a: 1,
  b: 2,
  add(a, b) {
    return a + b
  },
}

// 对象 obj 有一个方法 add()，需要定义它的参数类型和返回值类型。
```

### 1.5、读取属性的类型

对象类型可以使用方括号读取属性的类型。

```tsx
type User = {
  username: string
  age: number
}
type Name = User['username'] // string

// 对象类型 User 使用方括号，读取了属性 name 的类型（string）
```

### 1.6、interface 命令定义对象类型的接口

除了`type`命令可以为对象类型声明一个别名，TypeScript 还提供了`interface`命令，可以把对象类型提炼为一个接口。

```tsx
// 写法一
type Obj = {
  a: number
  b: number
}

const obj: Obj = { a: 1, b: 2 }

// 写法二
interface Obj {
  a: number
  b: number
}

const obj: Obj = { a: 1, b: 2 }

// 写法一是 type 命令 的用法
// 写法二是 interface 命令的用法
// interface 命令的详细解释，以及与 type 命令的区别（Interface 章节详细学习）
```

### 1.7、对象类型注意事项

TypeScript 不区分对象自身的属性和继承的属性，一律视为对象的属性。

```tsx
interface Inter {
  toString(): string // 继承的属性
  prop: number // 自身的属性
}

const obj: Inter = {
  // 正确
  prop: 123,
}

// obj 只写了 prop 属性，但是不报错
// 因为它可以继承原型上面的 toString() 方法
```

### 2、可选属性

如果某个属性是可选的（即可以忽略），需要在属性名后面加一个问号

```tsx
const obj: {
  a: number
  b?: number
} = { a: 1 }

// 属性 b 是可选的
```

可选属性等同于允许赋值为`undefined`，下面两种写法是等效的

```tsx
type User = {
  firstName: string
  lastName?: string
}

// 等同于
type User = {
  firstName: string
  lastName?: string | undefined
}

// 类型 User 的可选属性 lastName 可以是字符串，也可以是 undefined，即可选属性可以赋值为 undefined
```

将可选属性赋值为 `undefined`

```tsx
const obj: {
  a: number
  b?: number
} = { a: 1, b: undefined }

// 可选属性 b 赋值为 undefined，不会报错
```

同样，读取一个没有赋值的可选属性时，返回`undefined`。

```tsx
type Obj = {
  a: string
  b?: string
}

const obj: Obj = { a: 'icoding' }
obj.b.toLowerCase() // 报错

// 最后一行会报错，因为 obj.b 返回 undefined，无法对其调用 toLowerCase()
```

### 2.1、可选属性注意事项

读取可选属性之前，必须检查一下是否为`undefined`

```tsx
const user: {
  firstName: string
  lastName?: string
} = { firstName: 'Foo' }

if (user.lastName !== undefined) {
  console.log(`hello ${user.firstName} ${user.lastName}`)
}
```

`lastName`是可选属性，需要判断是否为`undefined`以后，才能使用。建议使用下面的写法。

```tsx
const user: {
  firstName: string
  lastName?: string
} = { firstName: 'Foo' }

// 写法一
let firstName = user.firstName === undefined ? 'Foo' : user.firstName
let lastName = user.lastName === undefined ? 'Bar' : user.lastName

// 写法二
let firstName = user.firstName ?? 'Foo'
let lastName = user.lastName ?? 'Bar'

// 写法一使用三元运算符 ?:
// 判断是否为 undefined，并设置默认值
// 写法二使用 Null 判断运算符 ?? ，与写法一的作用完全相同
```

TypeScript 提供编译设置`ExactOptionalPropertyTypes`，只要同时打开这个设置和`strictNullChecks`，可选属性就不能设为`undefined`。

在 `tsconfig.json` 中打开以下两个配置

```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true,
    "strictNullChecks": true
  }
}
```

打开了这两个设置以后，可选属性就不能设为`undefined`了

```tsx
const obj: {
  a: number
  b?: number
} = { a: 1, b: undefined } // 报错
```

注：

可选属性与允许设为`undefined`的必选属性是不等价的。

```tsx
type A = { a: number; b?: number }
type B = { a: number; b: number | undefined }

const ObjA: A = { a: 1 } // 正确
const ObjB: B = { a: 1 } // 报错

// 属性 b 如果是一个可选属性，那就可以省略不写；
// 如果是允许设为 undefined 的必选属性，一旦省略就会报错，必须显式写成 { a: 1, b: undefined }
```

### 3、只读属性

属性名前面加上`readonly`关键字，表示这个属性是只读属性，不能修改。

```tsx
interface User {
  readonly username: string
}

// username 属性是只读属性，不能修改它的值
```

只读属性的值不能修改

```tsx
const person: {
  readonly age: number
} = { age: 20 }

person.age = 21 // 报错

// 最后一行修改了只读属性 age，就报错了
```

只读属性只能在对象初始化期间赋值，此后就不能修改该属性。

```tsx
type Point = {
  readonly a: number
  readonly b: number
}

const p: Point = { a: 0, b: 0 }

p.a = 123 // 报错

// 类型 Point 的属性 a 和 b 都带有修饰符 readonly
// 表示这两个属性只能在初始化期间赋值，后面再修改就会报错
```

### 3.1、只读属性注意事项

如果属性值是一个对象，`readonly`修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

```tsx
interface User {
  readonly student: {
    username: string
    age: number
  }
}

const u: User = {
  student: {
    username: 'icoding',
    age: 18,
  },
}

u.student.age = 20 // 正确

u.student = {
  username: 'allen',
  age: 19,
} // 报错

// u.student 是只读属性，它的值是一个对象
// 修改这个对象的 age 属性是可以的，但是整个替换掉 u.student 属性会报错
```

另一个需要注意的地方是，如果一个对象有两个引用，即两个变量对应同一个对象，其中一个变量是可写的，另一个变量是只读的，那么从可写变量修改属性，会影响到只读变量。

```tsx
interface Person {
  username: string
  age: number
}

interface ReadonlyPerson {
  readonly username: string
  readonly age: number
}

let p: Person = {
  username: 'icoding',
  age: 18,
}

let r: ReadonlyPerson = p

p.age += 1
r.age // 19

// 变量 p 和 r 指向同一个对象，其中 p 是可写的，r 是只读的
// 那么，对 p 的属性修改，会影响到 r
```

注：

如果希望属性值是只读的，除了声明时加上`readonly`关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言`as const`。

### 3.2、只读断言

如果希望属性值是只读的，除了声明时加上`readonly`关键字，还有一种方法，就是在赋值时，在对象后面加上只读断言`as const`。

```tsx
const user = {
  username: 'icoding',
} as const

user.username = 'ibc' // 报错

// 对象后面加了只读断言 as const，就变成只读对象了，不能修改属性了
```

注意，上面的`as const`属于 TypeScript 的类型推断，如果变量明确地声明了类型，那么 TypeScript 会以声明的类型为准。

```tsx
const user: { username: string } = {
  username: 'icoding',
} as const

user.username = 'ibc' // 正确

// 根据变量 user 的类型声明，username 不是只读属性，但是赋值时又使用只读断言as const
// 这时会以声明的类型为准，因为 username 属性可以修改
```

### 4、属性名的索引类型

如果对象的属性非常多，一个个声明类型就很麻烦，而且有些时候，无法事前知道对象会有多少属性，比如外部 API 返回的对象。

这时 TypeScript 允许采用属性名表达式的写法来描述类型，称为 **“属性名的索引类型”**。

### 4.1、属性名的字符串索引

索引类型里面，最常见的就是属性名的字符串索引。

```tsx
type Obj = {
  [property: string]: string
}

const obj: Obj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
}

// 类型 Obj 的属性名类型就采用了表达式形式，写在方括号里面
// [property: string] 的 property 表示属性名，这个是可以随便起的，它的类型是 string，即属性名类型为 string
// 也就是说，不管这个对象有多少属性，只要属性名为字符串，且属性值也是字符串，就符合这个类型声明
```

JavaScript 对象的属性名（即上例的`property`）的类型有三种可能，除了上例的`string`，还有`number`和`symbol`。

```tsx
type T1 = {
  [property: number]: string
}

type T2 = {
  [property: symbol]: string
}

// 对象属性名的类型分别为 number 和 symbol
```

### 4.2、属性名的数值索引

```tsx
type Arr = {
  [n: number]: number
}

const a: Arr = [1, 2, 3]

// 或者
const a: Arr = {
  0: 1,
  1: 2,
  2: 3,
}

// 对象类型 Arr 的属性名是 [n:number]，就表示它的属性名都是数值，比如 0、1、2
```

### 4.3、同时有多种类型的属性名索引

对象可以同时有多种类型的属性名索引，比如同时有数值索引和字符串索引。

但是，数值索引不能与字符串索引发生冲突，必须服从后者，这是因为在 JavaScript 语言内部，所有的数值属性名都会自动转为字符串属性名。

```tsx
type Obj = {
  [a: number]: boolean // 报错
  [a: string]: string
}

// 类型 Obj 同时有两种属性名索引，但是数值索引与字符串索引冲突了，所以报错了
// 由于字符属性名的值类型是 string，数值属性名的值类型只有同样为 string，才不会报错
```

同样地，可以既声明属性名索引，也声明具体的单个属性名。如果单个属性名符合属性名索引的范围，两者不能有冲突，否则报错。

```tsx
type Obj = {
  foo: boolean // 报错
  [a: string]: string
}

// 属性名 foo 符合属性名的字符串索引，但是两者的属性值类型不一样，所以报错了
```

### 4.4、属性的索引类型注意事项

属性的索引类型写法，**建议谨慎使用**，因为属性名的声明太宽泛，约束太少。

另外，属性名的数值索引不宜用来声明数组，因为采用这种方式声明数组，就不能使用各种数组方法以及`length`属性，因为类型里面没有定义这些东西。

```tsx
type Arr = {
  [a: number]: number
}

const arr: Arr = [1, 2, 3]
arr.length // 报错

// 读取 arr.length 属性会报错，因为类型 Arr 没有这个属性
```

### 5、解构赋值

解构赋值用于直接从对象中提取属性。

```tsx
const { id, username, age } = student

// 从对象 student 提取了三个属性，并声明属性名的同名变量
```

解构赋值的类型写法，跟为对象声明类型是一样的。

```tsx
const {
  id,
  username,
  age,
}: {
  id: string
  username: string
  age: number
} = student
```

注意，目前没法为解构变量指定类型，因为对象解构里面的冒号，JavaScript 指定了其他用途。

```tsx
let { a: foo, b: bar } = obj

// 等同于
let foo = obj.a
let bar = obj.b

// 冒号不是表示属性 a 和 b 的类型，而是为这两个属性指定新的变量名
```

如果要为 a 和 b 指定类型，不得不写成下面这样

```tsx
let { a: foo, b: bar }: { a: string; b: number } = obj
```

以上的方式要注意，在 TypeScript 中很容易混淆

```tsx
function position({ shape: Shape, xPos: number = 23.5, yPos: number = 56.2 }) {
  let s = shape // 报错
  let x = xPos // 报错
}

// 函数 position() 的参数是一个对象解构，里面的冒号很像是为变量指定类型，其实是为对应的属性指定新的变量名
// 所以，TypeScript 就会解读成，函数体内不存在变量 shape，而是属性 shape 的值被赋值给了变量 Shape
```

### 6、结构类型原则

只要对象 B 满足 对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为“结构类型”原则（structural typing）

```tsx
type A = {
  a: number
}

type B = {
  a: number
  b: number
}

// 对象 A 只有一个属性 a，类型为 number
// 对象 B 满足这个特征，因此兼容对象 A，只要可以使用 A 的地方，就可以使用 B
```

以下代码中，`A`和`B`并不是同一个类型

```tsx
const B = {
  a: 1,
  b: 2,
}

const A: { a: number } = B // 正确

// A 和 B 并不是同一个类型，但是 B 可以赋值给 A，因为 B 满足 A 的结构特征。
```

### 6.1、结构类型原则注意事项

根据“结构类型”原则，TypeScript 检查某个值是否符合指定类型时，并不是检查这个值的类型名（即“名义类型”），而是检查这个值的结构是否符合要求（即“结构类型”）。

TypeScript 之所以这样设计，是为了符合 JavaScript 的行为。JavaScript 并不关心对象是否严格相似，只要某个对象具有所要求的属性，就可以正确运行。

如果类型 B 可以赋值给类型 A，TypeScript 就认为 B 是 A 的子类型（subtyping），A 是 B 的父类型。子类型满足父类型的所有结构特征，同时还具有自己的特征。凡是可以使用父类型的地方，都可以使用子类型，即子类型兼容父类型。

```tsx
type Obj = {
  a: number
  b: number
}

function getSum(obj: Obj) {
  let sum = 0
  for (const n of Object.keys(obj)) {
    const res = obj[n] // 报错
    // Math.abs() 返回一个数的绝对值
    sum += Math.abs(res)
  }
  return sum
}

// 函数 getSum() 要求传入参数的类型是 Obj，但是实际上所有与 Obj 兼容的对象都可以传入
// 这会导致 const res = obj[n] 这一行报错
// 原因是 obj[n] 取出的属性值不一定是数值（number），使得变量 res 的类型被推断为 any
//
```

如果项目设置为不允许变量类型推断为`any`，代码就会报错。写成下面这样，就不会报错

```tsx
type Obj = {
  a: number
  b: number
}

function getSum(obj: Obj) {
  return Math.abs(obj.a) + Math.abs(obj.b)
}

// 此时就不会报错，因为函数体内部只使用了属性 a 和 b，这两个属性有明确的类型声明，保证 obj.a 和 obj.b 肯定是数值
// 虽然与 Obj 兼容的任何对象都可以传入函数 getSum()，但是只要不使用其他属性，就不会有类型报错
```

### 7、严格字面量检查

如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查（strict object literal checking）。

如果字面量的结构跟类型定义的不一样（比如多出了未定义的属性），就会报错。

```tsx
const num: {
  a: number
  b: number
} = {
  a: 1,
  b: 2,
  c: 3, // 报错
}

// 等号右边是一个对象的字面量，这时会触发严格字面量检查
// 只要有类型声明中不存在的属性（如：属性 c），就会导致报错
```

如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。

```tsx
const num = {
  a: 1,
  b: 2,
  c: 3,
}

const n: {
  a: number
  b: number
} = num // 正确

// 等号右边是一个变量，就不会触发严格字面量检查，从而不报错
```

### 7.1、严格检查的目的

TypeScript 对字面量进行严格检查的目的，主要是防止拼写错误。一般来说，字面量大多数来自手写，容易出现拼写错误，或者误用 API。

```tsx
type User = {
  username: string
  age?: number
}

const obj: User = {
  username: 'icoding',
  agem: 18, // 报错
}

// 属性 age 拼写错了，成了 agem
// 如果没有严格字面量规则，就不会报错，因为 age 是可选属性，根据结构类型原则，任何对象只要有 username 属性，都认为符合 User 类型
```

### 7.2、规避严格字面量检查

规避严格字面量检查，可以使用中间变量。

```tsx
type User = {
  username: string
  age?: number
}

// 中间变量
let user = {
  username: 'icoding',
  // 故意将 age 写成 agem，也不会报错
  agem: 18,
}

const obj: User = user

// 创建了一个中间变量 user，就不会触发严格字面量规则
// 因为这时变量 obj 的赋值，不属于直接字面量赋值
```

如果你确认字面量没有错误，也可以使用类型断言规避严格字面量检查。

```tsx
type User = {
  username: string
  age?: number
}

const obj: User = {
  username: 'icoding',
  agem: 18, // 正确
} as User // 添加类型断言

// 使用类型断言 as User，告诉编译器，字面量符合 User 类型，就能规避这条规则
```

### 7.3、严格字面量检查 - 注意事项

如果允许字面量有多余属性，可以像下面这样在类型里面定义一个通用属性。

```tsx
let a: {
  foo: number
  [a: string]: any
}

a = { foo: 1, bar: 2 }

// 变量 a 的类型声明里面，有一个属性的字符串索引（[a: string]），导致任何字符串属性名都是合法的
```

由于严格字面量检查，字面量对象传入函数必须很小心，不能有多余的属性。

```tsx
interface Count {
  a: number
  b: number
}

function computeCount(count: Count) {
  //
}

computeCount({ a: 1, b: 2, c: 3 }) // 报错
computeCount({ a: 1, b: 2 }) // 正确

// 对象字面量传入函数 computeCount() 时，不能有多余的属性，否则就通不过严格字面量检查
```

编译器选项`suppressExcessPropertyErrors`，可以关闭多余属性检查。下面是它在 `tsconfig.json` 文件里面的写法

```json
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```

### 8、最小可选属性规则

根据“结构类型”原则，如果一个对象的所有属性都是可选的，那么其他对象跟它都是结构类似的。

```tsx
type Count = {
  a?: number
  b?: number
  c?: number
}

// 类型 Count 的所有属性都是可选的
// 所以它可以是一个空对象，也就意味着任意对象都满足 Count 的结构
```

为了避免这种情况，TypeScript 2.4 引入了一个“最小可选属性规则”，也称为[“弱类型检测” (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#weak-type-detection)（weak type detection）

```tsx
type Count = {
  a?: number
  b?: number
  c?: number
}

const opts = { d: 123 }

const obj: Count = opts // 报错

// 对象 opts 与 类型 Count 没有共同属性，赋值给该类型的变量就会报错
```

注：

报错原因是，如果某个类型的所有属性都是可选的，那么该类型的对象必须至少存在一个可选属性，不能所有可选属性都不存在。这就叫做 **“最小可选属性规则”** 。

如果想规避这条规则，要么在类型里面增加一条索引属性（`[propName: string]: someType`），要么使用类型断言（`opts as Options`）

### 9、空对象

空对象是 TypeScript 的一种特殊值，也是一种特殊类型。

```tsx
const obj = {}
obj.prop = 123 // 报错

// 变量 obj 的值是一个空对象，然后对 obj.prop 赋值就会报错
```

原因是这时 TypeScript 会推断变量`obj`的类型为空对象，实际执行的是下面的代码。

```tsx
const obj: {} = {}

// 空对象没有自定义属性，所以对自定义属性赋值就会报错。
// 空对象只能使用继承的属性，即继承自原型对象 Object.prototype 的属性
obj.toString() // 正确

// toString() 方法是一个继承自原型对象的方法，TypeScript 允许在空对象上使用
```

注：

以上代码中，这种写法其实在 JavaScript 很常见：先声明一个空对象，然后向空对象添加属性。

但是，TypeScript 不允许动态添加属性，所以对象不能分步生成，必须生成时一次性声明所有属性。

```tsx
// 错误
const obj = {}
obj.a = 1
obj.b = 2

// 正确
const obj = {
  a: 1,
  b: 2,
}
```

### 9.1、空对象注意事项

如果确实需要分步声明，一个比较好的方法是，使用扩展运算符（`...`）合成一个新对象。

```tsx
const obj0 = {}
const obj1 = { a: 1 }
const obj2 = { b: 2 }

const obj = {
  ...obj0,
  ...obj1,
  ...obj2,
}

// 对象 obj 是三个部分合成的，这样既可以分步声明，也符合 TypeScript 静态声明的要求
```

空对象作为类型，其实是`Object`类型的简写形式。

```tsx
let a: {}
// 等同于
// let a: Object;

a = {}
a = { x: 1 }
a = 'icoding'
a = 2

// 各种类型的值（除了null 和 undefined）都可以赋值给空对象类型，跟 Object 类型的行为是一样的
```

因为`Object`可以接受各种类型的值，而空对象是`Object`类型的简写，所以它不会有严格字面量检查，赋值时总是允许多余的属性，只是不能读取这些属性。

```tsx
interface Empty {}
const e: Empty = { a: 1, b: 2 } // 正确
e.a // 报错

// 变量 e 的类型是空对象，视同 Object 类型，不会有严格字面量检查，但是读取多余的属性会报错
```

如果想强制使用没有任何属性的对象，可以采用下面的写法。

```tsx
interface NoProperties {
  [key: string]: never
}

// 报错
const a: NoProperties = { prop: 123 }

// [key: string]: never 表示字符串属性名是不存在的
// 因此其他对象进行赋值时就会报错
```
