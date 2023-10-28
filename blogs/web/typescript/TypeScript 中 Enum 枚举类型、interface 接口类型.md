---
title: TypeScript 中 Enum 枚举类型、interface 接口类型
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 中 Enum 枚举类型、interface 接口类型

TIP

从本节正式开始学习 Enum 枚举类型、interface 接口类型的核心基础 和 应用实践。

- Enum 枚举类型
- interface 接口类型

## 一、枚举类型

TIP

观察以下代码，这是一个角色判断的案例：一般系统都会有很多种角色，每个角色都会有不同的操作权限，同时也会对应不同的 UI 界面。

> 一般用户登录系统时，会做一些初始化的工作，如下代码所示

```js
// 初始化角色权限
function initByRole(role) {
  if (role === 1 || role === 2) {
    // ...
  } else if (role === 3 || role === 4) {
    // ...
  } else if (role === 5) {
    // ...
  } else {
    // ...
  }
}
```

注：以上代码的问题

- ①、可读性差：如果不借助特殊的文档，很难记住数字的含义
- ②、可维护性差：代表角色的数字都被硬编码了，如果某一天这些数字需要发生改变，就会牵一发而动全身，成本和风险就是灾难级的

> 如何解决这种问题呢，就可以使用 TS 的枚举类型，这是在 ES 中没有的数据类型

### 1、什么是枚举

TIP

枚举：一组有名字的常量集合

我们可以把它理解成手机里的通讯录，在拨打电话时，只需要记住人名即可，而不别真正去记住她的电话号码。更何况电话号码是可变的，人名基本是不会变的。

![image-20230901195824419](https://www.arryblog.com/assets/img/image-20230901195824419.5bf2582f.png)

> 同时，枚举类型分为数字枚举 和 字符串枚举

### 2、数字枚举

TIP

使用 enum 关键字定义一个数字枚举，该枚举包含了 5 个枚举成员，它们的取值从零开始

```tsx
// 数字枚举
enum Role {
  SuperAdministrator,
  Administrators,
  OrdinaryAdministrator,
  User,
  Developer,
}

// 声明了一个 Enum 结构 Role，里面包含五个成员
// 第一个成员的值默认为整数0，第二个为1，第三个为2，以此类推。

// 第一个枚举成员的值，默认值为 0，往后依次递增
console.log(Role.SuperAdministrator); // 0
```

使用时，调用 Enum 的某个成员，与调用对象属性的写法一样，可以使用点运算符，也可以使用方括号运算符。

```tsx
enum Role {
  SuperAdministrator,
  Administrators,
  OrdinaryAdministrator,
  User,
  Developer,
}

let u = Role.User; // 3

// 等同于
let u1 = Role["User"];

console.log(u, u1); // 3 3
```

Enum 结构本身也是一种类型。比如，上例的变量`u`等于`3`，它的类型可以是 Role，也可以是`number`。

```tsx
let r1: Role = Role.User; // 正确
let r2: number = Role.User; // 正确

console.log(r1, r2); // 3 3

// 变量 r1 和 r2 的类型写成 Role 或 number 都可以。但是，Role 类型的语义更好
```

### 2.1、自定义枚举的初始值

TIP

枚举可定义初始值，给第一个枚举成员设置初始值，后边的枚举成员会在此基础上依次递增

```tsx
// 数字枚举
enum Role {
  // 自定义数字枚举的初始值为 1，默认从0开始
  SuperAdministrator = 1,
  Administrators,
  OrdinaryAdministrator,
  User,
  Developer,
}

// 第一个枚举成员的值，默认值为 0，往后依次递增
// 如果给第一个枚举成员初始值，后边的枚举成员会在此基础上递增
console.log(Role.SuperAdministrator); // 1

// 打印输出枚举
console.log(Role);
```

枚举在运行环境下，被编译成了一个对象，除了正常的枚举成员之外还多了一些其他成员。

![image-20230621135946497](https://www.arryblog.com/assets/img/image-20230621135946497.956e9b12.png)

注：

这时，如果我们需要获取枚举成员的值即可通过枚举成员的名称来索引，还可以通过值来索引。

### 2.2、枚举的实现原理

TIP

它是如何实现的 ？ 可在 [TypeScript - Playground (opens new window)](https://www.typescriptlang.org/play?#code/PTAEgdTR1bULPND45AoApgOwK4FtQCUD2AbRUAb3lDNBFECvAwLO1BJOSjkBC3QXCVBpzUB4FQLjlQBGQGH-AG3mAS6MBzcgAZAAPptS5AMqoADogBOAQQAm6AJbJtAZwAuKgIaGcK0AF4+AGlllNOvUdPmV+++VAB5FRt0TFQBPJ10DYzMLL3IAVX1VGLIAEUQAN0Q8HGUVeABfIA)中编译查看编译后的 JS 代码

![image-20230621140523758](https://www.arryblog.com/assets/img/image-20230621140523758.73e9982a.png)

注：

查看编译后的 JS 代码可以看到

枚举被编译成了一个对象，枚举成员的名称被作为 key ，枚举成员的值被作为了 value，这个表达式直接返回了 value 。然后 value 又被作为了 key，成员的名称又被作为了 value。

> 这种方法叫做：反向映射，这就是枚举的实现原理。

### 3、Enum 结构的特别之处

TIP

Enum 结构的特别之处在于，它既是一种类型，也是一个值。

绝大多数 TypeScript 语法都是类型语法，编译后会全部去除，但是 Enum 结构是一个值，编译后会变成 JavaScript 对象，留在代码中。

```tsx
// 编译前
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

// 编译后
let Color = {
  Red: 0,
  Green: 1,
  Blue: 2,
};

//  Enum 结构编译前后的对比
```

### 4、Enum 应用场景

TIP

由于 TypeScript 的定位是 JavaScript 语言的类型增强，所以官方建议谨慎使用 Enum 结构，因为它不仅仅是类型，还会为编译后的代码加入一个对象。

Enum 结构比较适合的场景是，成员的值不重要，名字更重要，从而增加代码的可读性和可维护性。

```tsx
enum Operator {
  ADD,
  DIV,
  MUL,
  SUB,
}

function compute(op: Operator, a: number, b: number) {
  switch (op) {
    case Operator.ADD:
      return a + b;
    case Operator.DIV:
      return a / b;
    case Operator.MUL:
      return a * b;
    case Operator.SUB:
      return a - b;
    default:
      throw new Error("wrong operator");
  }
}

const res = compute(Operator.ADD, 3, 6);
console.log(res); // 9

// Enum 结构 Operator 的四个成员表示四则运算“加减乘除”
// 代码根本不需要用到这四个成员的值，只用成员名就够了
```

### 5、Enum 注意事项

TIP

[TypeScript 5.0 (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#enum-overhaul)之前，Enum 有一个 Bug，就是 Enum 类型的变量可以赋值为任何数值。

```tsx
enum Bool {
  No,
  Yes,
}

function foo(noYes: Bool) {
  // ...
}

foo(22); // TypeScript 5.0 之前不报错

// 函数foo的参数noYes是 Enum 类型，只有两个可用的值
// 但是，TypeScript 5.0 之前，任何数值作为函数foo的参数，编译都不会报错，TypeScript 5.0 纠正了这个问题
```

另外，由于 Enum 结构编译后是一个对象，所以不能有与它同名的变量（包括对象、函数、类等）。

```tsx
enum Color {
  Red,
  Green,
  Blue,
}

const Color = "red"; // 报错

// Enum 结构与变量同名，导致报错
```

很大程度上，Enum 结构可以被对象的`as const`断言替代。

```tsx
enum Foo {
  A,
  B,
  C,
}

const Bar = {
  A: 0,
  B: 1,
  C: 2,
} as const;

if (x === Foo.A) {
}
// 等同于
if (x === Bar.A) {
}

// 对象Bar使用了as const断言，作用就是使得它的属性无法修改
// 这样的话，Foo 和 Bar的行为就很类似了，前者完全可以用后者替代，而且后者还是 JavaScript 的原生数据结构。
```

### 6、Enum 成员的值

TIP

Enum 成员默认不必赋值，系统会从零开始逐一递增，按照顺序为每个成员赋值，比如 0、1、2……

> 但是，也可以为 Enum 成员显式赋值。

```tsx
enum Color {
  Red,
  Green,
  Blue,
}

// 等同于
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2,
}

// Enum 每个成员的值都是显式赋值
```

成员的值可以是任意数值，但不能是大整数（Bigint）

```tsx
enum Color {
  Red = 90,
  Green = 0.5,
  Blue = 7n, // 报错
}

// Enum 成员的值可以是小数，但不能是 Bigint
```

成员的值甚至可以相同

```tsx
enum Color {
  Red = 0,
  Green = 0,
  Blue = 0,
}
```

如果只设定第一个成员的值，后面成员的值就会从这个值开始递增。

```tsx
enum Color {
  Red = 6,
  Green, // 7
  Blue, // 8
}

// 或者
enum Color {
  Red, // 0
  Green = 6,
  Blue, // 7
}
```

Enum 成员的值也可以使用计算式。

```tsx
enum Permission {
  UserRead = 1 << 8,
  UserWrite = 1 << 7,
  UserExecute = 1 << 6,
  GroupRead = 1 << 5,
  GroupWrite = 1 << 4,
  GroupExecute = 1 << 3,
  AllRead = 1 << 2,
  AllWrite = 1 << 1,
  AllExecute = 1 << 0,
}

enum Bool {
  No = 123,
  Yes = Math.random(),
}

// Enum 成员的值等于一个计算式，或者等于函数的返回值，都是正确的。
```

Enum 成员值都是只读的，不能重新赋值。

```tsx
enum Color {
  Red,
  Green,
  Blue,
}

Color.Red = 5; // 报错

// 重新为 Enum 成员赋值就会报错
```

为了让这一点更醒目，通常会在 enum 关键字前面加上`const`修饰，表示这是常量，不能再次赋值

```tsx
const enum Color {
  Red,
  Green,
  Blue,
}
```

加上`const`还有一个好处，就是编译为 JavaScript 代码后，代码中 Enum 成员会被替换成对应的值，这样能提高性能表现。

```tsx
const enum Color {
  Red,
  Green,
  Blue,
}

const x = Color.Red;
const y = Color.Green;
const z = Color.Blue;

// 编译后
const x = 0; /* Color.Red */
const y = 1; /* Color.Green */
const z = 2; /* Color.Blue */

// 由于 Enum 结构前面加了const关键字，所以编译产物里面就没有生成对应的对象，而是把所有 Enum 成员出现的场合，都替换成对应的常量
```

注：

如果希望加上`const`关键词后，运行时还能访问 Enum 结构（即编译后依然将 Enum 转成对象），需要在编译时打开`preserveConstEnums`编译选项。

### 7、同名 Enum 的合并

TIP

多个同名的 Enum 结构会自动合并

```tsx
enum Foo {
  A,
}

enum Foo {
  B = 1,
}

enum Foo {
  C = 2,
}

// 等同于
enum Foo {
  A,
  B = 1，
  C = 2
}

// Foo 分成三段定义，系统会自动把它们合并
```

Enum 结构合并时，只允许其中一个的首成员省略初始值，否则报错。

```tsx
enum Foo {
  A,
}

enum Foo {
  B, // 报错
}

// Foo 的两段定义的第一个成员，都没有设置初始值，导致报错
```

同名 Enum 合并时，不能有同名成员，否则报错。

```tsx
enum Foo {
  A,
  B,
}

enum Foo {
  B = 1, // 报错
  C,
}

// Foo 的两段定义有一个同名成员 B，导致报错
```

同名 Enum 合并的另一个限制是，所有定义必须同为 const 枚举或者非 const 枚举，不允许混合使用。

```tsx
// 正确
enum E {
  A,
}
enum E {
  B = 1,
}

// 正确
const enum E {
  A,
}
const enum E {
  B = 1,
}

// 报错
enum E {
  A,
}
const enum E {
  B = 1,
}

// 同名 Enum 的合并，最大用处就是补充外部定义的 Enum 结构
```

### 8、字符串枚举

TIP

Enum 成员的值除了设为数值，还可以设为字符串。也就是说，Enum 也可以用作一组相关字符串的集合。

> 枚举成员的值是 字符串，它就是字符串枚举

```tsx
// 字符串枚举
enum Message {
  Success = "成功",
  Fail = "失败",
}

// Message 就是字符串枚举，每个成员的值都是字符串
```

在 [TypeScript - Playground (opens new window)](https://www.typescriptlang.org/play?#code/PTAEnVtQyb0JjlCzzQ+OQFAFMB2BXAtqAssgzvgIYDmyoA3oqDaAMroDGjB+oAvKAOSAIRoPlKXADTVaAMSIBLADYdugRk1ApLFdEAX0RA)中编译查看编译后的 JS 代码

![image-20230621173447355](https://www.arryblog.com/assets/img/image-20230621173447355.eeab66fb.png)

注：

从以上编译后的 JS 可以看出，只有枚举成员的名称被作为了 key ，就是说字符串枚举是不可以进行反向映射的。

### 8.1、字符串枚举 - 注意事项

TIP

字符串枚举的所有成员值，都必须显式设置。

如果没有设置，成员值默认为数值，且位置必须在字符串成员之前。

```tsx
enum Foo {
  A, // 0
  B = "icoding",
  C, // 报错
}

// A 之前没有其他成员，所以可以不设置初始值，默认等于 0；
// C 之前有一个字符串成员，所以 C 必须有初始值，不赋值就报错了。
```

Enum 成员可以是字符串和数值混合赋值

```tsx
enum Enum {
  One = "One",
  Two = "Two",
  Three = 3,
  Four = 4,
}
```

除了数值和字符串，Enum 成员不允许使用其他值（比如 Symbol 值）。

变量类型如果是字符串 Enum，就不能再赋值为字符串，这跟数值 Enum 不一样。

```tsx
enum MyEnum {
  One = "One",
  Two = "Two",
}

let s = MyEnum.One;
s = "One"; // 报错

// 变量 s 的类型是 MyEnum，再赋值为字符串就报错
```

由于这个原因，如果函数的参数类型是字符串 Enum，传参时就不能直接传入字符串，而要传入 Enum 成员。

```tsx
enum MyEnum {
  One = "One",
  Two = "Two",
}

function f(arg: MyEnum) {
  return "arg is " + arg;
}

f("One"); // 报错

// 参数类型是 MyEnum，直接传入字符串会报错
```

所以，字符串 Enum 作为一种类型，有限定函数参数的作用。

前面说过，数值 Enum 的成员值往往不重要。但是有些场合，开发者可能希望 Enum 成员值可以保存一些有用的信息，所以 TypeScript 才设计了字符串 Enum。

```tsx
const enum MediaTypes {
  JSON = "application/json",
  XML = "application/xml",
}

const url = "localhost";

fetch(url, {
  headers: {
    Accept: MediaTypes.JSON,
  },
}).then((response) => {
  // ...
});

// 函数 fetch() 的参数对象的属性 Accept，只能接受一些指定的字符串
// 这时就很适合把字符串放进一个 Enum 结构，通过成员值来引用这些字符串。
```

字符串 Enum 可以使用联合类型（union）代替。

```tsx
function move(where: "Up" | "Down" | "Left" | "Right") {
  // ...
}

// 函数参数 wher e属于联合类型，效果跟指定为字符串 Enum 是一样的。
```

注意，字符串 Enum 的成员值，不能使用表达式赋值。

```tsx
enum MyEnum {
  A = "one",
  B = ["T", "w", "o"].join(""), // 报错
}

// 成员 B 的值是一个字符串表达式，导致报错
```

### 9、keyof 运算符

TIP

keyof 运算符可以取出 Enum 结构的所有成员名，作为联合类型返回。

```tsx
enum MyEnum {
  A = "a",
  B = "b",
}

// 'A'|'B'
type Foo = keyof typeof MyEnum;

// keyof typeof MyEnum 可以取出 MyEnum 的所有成员名，所以类型 Foo 等同于联合类型 'A'|'B'
```

### 9.1、keyof 运算符 - 注意事项

TIP

这里的`typeof`是必需的，否则`keyof MyEnum`相当于`keyof number`

```tsx
type Foo = keyof MyEnum;
// "toString" | "toFixed" | "toExponential" |
// "toPrecision" | "valueOf" | "toLocaleString"

// 类型 Foo 等于类型 number 的所有原生属性名组成的联合类型
```

这是因为 Enum 作为类型，本质上属于`number`或`string`的一种变体，而`typeof MyEnum`会将`MyEnum`当作一个值处理，从而先其转为对象类型，就可以再用`keyof`运算符返回该对象的所有属性名。

如果要返回 Enum 所有的成员值，可以使用`in`运算符。

```tsx
enum MyEnum {
  A = "a",
  B = "b",
}

// { a: any, b: any }
type Foo = { [key in MyEnum]: any };

// 采用属性索引可以取出 MyEnum 的所有成员值
```

### 10、异构枚举

TIP

数字枚举 和 字符串枚举 混用，就构成了 异构枚举。

> 当然，这种情况容易引起混淆。因此不建议使用 ！

```tsx
// 异构枚举
enum Answer {
  N,
  Y = "Yes",
}
```

### 11、枚举成员的性质

TIP

枚举成员的值是一个只读类型，因此定义之后是不能修改的。

```tsx
// 数字枚举
enum Role {
  // 自定义数字枚举的初始值为 1，默认从0开始
  SuperAdministrator = 1,
  Administrators,
  OrdinaryAdministrator,
  User,
  Developer,
}

// 修改枚举成员的值，编辑器会报错（枚举成员的值是一个只读类型）
// 因此枚举成员的值定义后是不能修改的
Role.SuperAdministrator = 2;
```

![image-20230621204613610](https://www.arryblog.com/assets/img/image-20230621204613610.1ef487d9.png)

### 12、枚举成员的分类

TIP

枚举成员的分为两类

**①、`const enum` 常量枚举，有三种情况**

- 没有初始值的
- 对已有枚举成员的引用
- 常量的表达式

**②、`computed enum` 需要被计算的枚举成员（非常量的表达式）**

- 这些枚举成员的值不会在编译阶段进行计算，而会被保留到程序执行阶段

```tsx
// 枚举成员
enum Char {
    // const enum 常量枚举，有三种情况（a，b，c）
    // 1、没有初始值
    a,
    // 2、对已有枚举成员的引用
    b = Char.a,
    // 3、常量的表达式
    c = 1 + 2,

    // computed enum 需要被计算的枚举成员（非常量的表达式）
    // 这些枚举成员的值不会在编译阶段进行计算，而会被保留到程序执行阶段
    d = Math.random(),
    e = '123'.length

    // 如果定义在 computed enum 后边的枚举成员，必须要有一个 初始值，否则会报错
    // f
    f = 3
}
```

在 [TypeScript - Playground (opens new window)](https://www.typescriptlang.org/play?#code/PTAEizzQ+OUBCNA0VAoApgOwK4FtQGEAWBDAJ1AG95RzQRQBjAe2QGcAXUFDUQDj1B5xKkBh-wSHNAkHKBZz0CjBoFbFQBD-eXgCNe1QJD-ZCngA0K8rNABebPgIA6dZpq7QARlABqUACYNFSmDroADqiaIAJqzSZAAHTAQMjAaojAQujAdO9AELcoOElAPXTuKMALCMA++MB4fWUnXz0AWTwmHEMCPGRvWnQACgBKRwpEcwByCzsAZkbDABsUAHNC+ABfIA)中编译查看编译后的 JS 代码

![image-20230621225116041](https://www.arryblog.com/assets/img/image-20230621225116041.cfd5e95d.png)

注：

通过以编译后的 JS 代码可看到

- 常量枚举成员，已经被计算出了结果，分别是 0、0、3
- 需要被计算的枚举成员，它的值被保留了，需要在运行时环境才会被计算

> 如果定义在 computed enum 后边的枚举成员，必须要有一个 初始值，否则会报错

### 13、常量枚举

TIP

用 const 声明的枚举 就是 **常量枚举**

常量枚举的特性：会在编译阶段被移除

```tsx
// 常量枚举
const enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
}
```

在 [TypeScript - Playground (opens new window)](https://www.typescriptlang.org/play?#code/PTAEg49R5xMLPND45AoAxgewHYGcAuoCmqCuAtqALJqYAWoA3vKPaAFICGqANHQwGI4BGHDUswBOAhgEEADqM70SzAJ5j6jfKngBfIA)中编译查看编译后的 JS 代码，发现编译后没有任何代码

![image-20230621231600020](https://www.arryblog.com/assets/img/image-20230621231600020.f1704b21.png)

常量枚举的作用：当我们不需要一个对象，而需要对象的值的时候，就可以使用 常量枚举。这样会减少我们在编译环境的代码。

如：定义一个变量，它的取值定义为一些常量枚举

```tsx
// 常量枚举
const enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
}
// 定义一个变量，它的取值定义为一些常量枚举
let month = [Month.Jan, Month.Feb, Month.Mar];
```

在 [TypeScript - Playground (opens new window)](https://www.typescriptlang.org/play?#code/PTAEg49R5xMLPND45AoAxgewHYGcAuoCmqCuAtqALJqYAWoA3vKPaAFICGqANHQwGI4BGHDUswBOAhgEEADqM70SzAJ5j6jfKngBfeCFCAs7UCScoAA5QFRygDeVIgGH-AwdqAQt0BryoB4FA4C45Q4Gy5KHHgAbHNkLkVAC8oADaZKiUAHQs7KSBUTz88ZEUUfLCALpAA)中编译查看编译后的 JS 代码

![image-20230621232634195](https://www.arryblog.com/assets/img/image-20230621232634195.6dc3fbc7.png)

注：

从以上编译后的 JS 代码中，枚举已经被直接替换成了常量，这样我们在运行时的代码就会变得非常简洁。

### 14、枚举类型

TIP

在某些情况下，枚举 和 枚举成员都可以作为一种单独的类型存在。

- 情况 1：枚举成员没有任何初始值
- 情况 2：所有成员都是数字枚举
- 情况 3：所有成员都是字符串枚举

```tsx
// 枚举类型

// 枚举成员没有任何初始值
enum A {
  a,
  b,
}
// 所有成员都是数字枚举
enum B {
  a = 1,
  b = 2,
}
// 所有成员都是字符串枚举
enum C {
  a = "icoding",
  b = "艾编程",
}

// 定义了两个枚举类型 a 和 b
// 我们可以将任意的 number 类型赋值给枚举类型
// 它的取值也可以超出枚举成员的定义
let a: A = 6;
let b: B = 6;

// 两种不同类型的枚举是不可以进行比较的，编辑器会提示报错
a === b;

// 定义了三种枚举成员类型 a1、a2、a3
let a1: A.a = 1;
let a2: A.b;

// a1 和 a2 是不可以比较的，不是相同的枚举成员类型
a1 === a2;

let a3: A.a = 1;
// a1 和 a3 是相同的枚举成员类型，可以进行比较
a1 === a3;

// 字符串枚举的取值只能是 枚举成员的类型
let c1: C = C.b; // 取值可以是 G.a 或 G.b
let c2: C.a = C.a; // C.a 的取值只能是它自身
```

### 15、总结

TIP

关于 TS 的枚举类型，需要我们掌握一种思维方法：将程序中不容易记忆的硬编码 或 在未来中可能改变的常量抽取出来，定义成枚举类型。

这样可以提高我们程序的可读性 和 可维护性，枚举类型可以使我们的程序以不变应万变。

## 二、interface 接口

TIP

接口在 TS 中是一个非常重要的概念，接口可以用来约束对象、函数、以及类的结构 和 类型，这是一种代码协作的契约，我们必须遵守而且不能改变。

### 1、什么是 interface 接口

TIP

interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构。

```tsx
interface User {
  id: number;
  username: string;
  age: number;
}

// 定义了一个接口 User，它指定一个对象模板，拥有三个属性 id、username 和 age
// 任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型
```

实现该接口很简单，只要指定它作为对象的类型即可。

```tsx
const u: User = {
  id: 1001,
  username: "icoding",
  age: 18,
};

// 变量 u 的类型就是接口 User，所以必须符合 User 指定的结构
```

方括号运算符可以取出 interface 某个属性的类型

```tsx
interface Foo {
  a: string;
}

type A = Foo["a"]; // string

// Foo['a'] 返回属性a的类型，所以类型 A 就是 string
```

### 2、interface 表示对象的 5 种语法

TIP

interface 可以表示对象的各种语法，它的成员有 5 种形式。

- 对象属性
- 对象的属性索引
- 对象方法
- 函数
- 构造函数

### 2.1、对象属性

```tsx
interface Point {
  x: number;
  y: number;
}

// x 和 y 都是对象的属性，分别使用冒号指定每个属性的类型
```

属性之间使用分号或逗号分隔，最后一个属性结尾的分号或逗号可以省略。

如果属性是可选的，就在属性名后面加一个问号。

```tsx
interface Foo {
  x?: string;
}
```

如果属性是只读的，需要加上`readonly`修饰符。

```tsx
interface A {
  readonly a: string;
}
```

### 2.2、对象的属性索引

```tsx
interface A {
  [prop: string]: number;
}

// [prop: string] 就是属性的字符串索引，表示属性名只要是字符串，都符合类型要求
```

属性索引共有`string`、`number`和`symbol`三种类型。

一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。

```tsx
interface MyObj {
  [prop: string]: number;

  a: boolean; // 编译错误
}

// 属性索引指定所有名称为字符串的属性，它们的属性值必须是数值（number）
// 属性 a 的值为布尔值就报错了
```

属性的数值索引，其实是指定数组的类型

```tsx
interface A {
  [prop: number]: string;
}

const obj: A = ["a", "b", "c"];

// [prop: number] 表示属性名的类型是数值，所以可以用数组对变量 obj 赋值
```

同样的，一个接口中最多只能定义一个数值索引。数值索引会约束所有名称为数值的属性。

如果一个 interface 同时定义了字符串索引和数值索引，那么数值索引必须服从于字符串索引。因为在 JavaScript 中，数值属性名最终是自动转换成字符串属性名。

```tsx
interface A {
  [prop: string]: number;
  [prop: number]: string; // 报错
}

interface B {
  [prop: string]: number;
  [prop: number]: number; // 正确
}

// 数值索引的属性值类型与字符串索引不一致，就会报错
// 数值索引必须兼容字符串索引的类型声明
```

### 2.3、对象的方法

TIP

对象的方法共有三种写法

```tsx
// 写法一
interface A {
  f(x: boolean): string;
}

// 写法二
interface B {
  f: (x: boolean) => string;
}

// 写法三
interface C {
  f: { (x: boolean): string };
}
```

属性名可以采用表达式，所以下面的写法也是可以的。

```tsx
const f = "f";

interface A {
  [f](x: boolean): string;
}
```

类型方法可以重载

```tsx
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}
```

interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。

```tsx
interface A {
  f(): number;
  f(x: boolean): boolean;
  f(x: string, y: string): string;
}

function MyFunc(): number;
function MyFunc(x: boolean): boolean;
function MyFunc(x: string, y: string): string;
function MyFunc(x?: boolean | string, y?: string): number | boolean | string {
  if (x === undefined && y === undefined) return 1;
  if (typeof x === "boolean" && y === undefined) return true;
  if (typeof x === "string" && typeof y === "string") return "hello";
  throw new Error("wrong parameters");
}

const a: A = {
  f: MyFunc,
};

// 接口 A 的方法 f() 有函数重载，需要额外定义一个函数 MyFunc() 实现这个重载，然后部署接口 A 的对象 a 的属性 f 等于函数 MyFunc() 就可以了。
```

### 2.4、函数

TIP

interface 也可以用来声明独立的函数

```tsx
interface Add {
  (x: number, y: number): number;
}

const myAdd: Add = (x, y) => x + y;

// 接口 Add 声明了一个函数类型
```

### 2.5、构造函数

TIP

interface 内部可以使用`new`关键字，表示构造函数。

```tsx
interface ErrorConstructor {
  new (message?: string): Error;
}

// 接口 ErrorConstructor 内部有 new 命令，表示它是一个构造函数
```

> TypeScript 里面，构造函数特指具有`constructor`属性的类，在 Class 类中会详细讲解

### 3、interface 的继承

TIP

interface 可以继承其他类型

- interface 继承 interface
- interface 继承 type
- interface 继承 class

### 3.1、interface 继承 interface

TIP

interface 可以使用`extends`关键字，继承其他 interface。

```tsx
interface Shape {
  name: string;
}

interface Circle extends Shape {
  radius: number;
}

// Circle 继承了 Shape，所以 Circle 其实有两个属性 name 和 radius
// 这时，Circle 是子接口，Shape 是父接口
```

`extends`关键字会从继承的接口里面拷贝属性类型，这样就不必书写重复的属性。

interface 允许多重继承

```tsx
interface Style {
  color: string;
}

interface Shape {
  name: string;
}

interface Circle extends Style, Shape {
  radius: number;
}

// Circle 同时继承了 Style 和 Shape，所以拥有三个属性 color、name 和 radius
```

多重接口继承，实际上相当于多个父接口的合并。

如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。

```tsx
interface Foo {
  id: string;
}

interface Bar extends Foo {
  id: number; // 报错
}

// Bar 继承了 Foo，但是两者的同名属性 id 的类型不兼容，导致报错。
```

多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。

```tsx
interface Foo {
  id: string;
}

interface Bar {
  id: number;
}

// 报错
interface Baz extends Foo, Bar {
  type: string;
}

// Baz 同时继承了 Foo 和 Bar，但是后两者的同名属性 id 有类型冲突，导致报错。
```

### 3.2、interface 继承 type

TIP

interface 可以继承`type`命令定义的对象类型。

```tsx
type Person = {
  username: string;
  age: number;
};

interface Allen extends Person {
  height: number;
}

// Allen 继承了 type 命令定义的 Person 对象，并且新增了一个 height 属性
```

注：

如果`type`命令定义的类型不是对象，interface 就无法继承。

### 3.3、interface 继承 class

TIP

interface 还可以继承 class，即继承该类的所有成员。（后边会详细讲解 class）

```tsx
class A {
  x: string = "";

  y(): boolean {
    return true;
  }
}

interface B extends A {
  z: number;
}

// B 继承了 A，因此 B 就具有属性 x、y() 和 z
```

实现`B`接口的对象就需要实现这些属性。

```tsx
const b: B = {
  x: "",
  y: function () {
    return true;
  },
  z: 123,
};

// 对象 b 就实现了接口 B，而接口 B 又继承了 类 A
```

某些类拥有私有成员和保护成员，interface 可以继承这样的类，但是意义不大。

```tsx
class A {
  private x: string = "";
  protected y: string = "";
}

interface B extends A {
  z: number;
}

// 报错
const b: B = {
  /* ... */
};

// 报错
class C implements B {
  // ...
}

// A 有私有成员 和 保护成员，B 继承了 A，但无法用于对象，因为对象不能实现这些成员
// 这导致 B 只能用于其他 class，而这时其他 class 与 A 之间不构成父类 和 子类的关系，使得 x 与 y 无法部署
```

### 4、接口合并

TIP

多个同名接口会合并成一个接口。

```tsx
interface Box {
  height: number;
  width: number;
}

interface Box {
  length: number;
}

// 两个 Box 接口会合并成一个接口，同时有 height、width 和 length 三个属性
```

注：

这样的设计主要是为了兼容 JavaScript 的行为。JavaScript 开发者常常对全局对象或者外部库，添加自己的属性和方法。

那么，只要使用 interface 给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便。

### 4.1、接口合并 - 注意事项

TIP

Web 网页开发经常会对`windows`对象和`document`对象添加自定义属性，但是 TypeScript 会报错，因为原始定义没有这些属性。

> 解决方法就是把自定义属性写成 interface，合并进原始定义。

```tsx
interface Document {
  foo: string;
}

document.foo = "icoding";

// 接口 Document 增加了一个自定义属性 foo，从而就可以在 document 对象上使用自定义属性
```

同名接口合并时，同一个属性如果有多个类型声明，彼此不能有类型冲突。

```tsx
interface A {
  a: number;
}

interface A {
  a: string; // 报错
}

// 接口 A 的属性 a 有两个类型声明，彼此是冲突的，导致报错
```

同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。

```tsx
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 等同于
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}

// clone() 方法有不同的类型声明，会发生函数重载。这时，越靠后的定义，优先级越高，排在函数重载的越前面
// 比如，clone(animal: Animal) 是最先出现的类型声明，就排在函数重载的最后，属于clone() 函数最后匹配的类型。
```

这个规则有一个例外。同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。

```tsx
interface A {
  f(x: "foo"): boolean;
}

interface A {
  f(x: any): void;
}

// 等同于
interface A {
  f(x: "foo"): boolean;
  f(x: any): void;
}

// f() 方法有一个类型声明的参数x是字面量类型，这个类型声明的优先级最高，会排在函数重载的最前面
```

### 4.2、接口合并实践应用

TIP

以下应用是 Document 对象的`createElement()`方法，它会根据参数的不同，而生成不同的 HTML 节点对象

```tsx
interface Document {
  createElement(tagName: any): Element;
}
interface Document {
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
  createElement(tagName: string): HTMLElement;
  createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 等同于
interface Document {
  createElement(tagName: "canvas"): HTMLCanvasElement;
  createElement(tagName: "div"): HTMLDivElement;
  createElement(tagName: "span"): HTMLSpanElement;
  createElement(tagName: string): HTMLElement;
  createElement(tagName: any): Element;
}

// createElement() 方法的函数重载，参数为字面量的类型声明会排到最前面，返回具体的 HTML 节点对象
// 类型越不具体的参数，排在越后面，返回通用的 HTML 节点对象
```

如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。

```tsx
// 圆
interface Circle {
  area: bigint;
}

// 长方形
interface Rectangle {
  area: number;
}

declare const s: Circle | Rectangle;

s.area; // bigint | number

// 接口 Circle 和 Rectangle 组成一个联合类型 Circle | Rectangle
// 因此，这个联合类型的同名属性 area，也是一个联合类型
// declare命令表示 变量 s 的具体定义，由其他脚本文件给出，在 declare 命令 的部分会学习
```

### 5、interface 与 type 的异同

TIP

`interface`命令与`type`命令作用类似，都可以表示对象类型。

很多对象类型既可以用 interface 表示，也可以用 type 表示。而且，两者往往可以换用，几乎所有的 interface 命令都可以改写为 type 命令。

### 5.1、相似之处

TIP

它们的相似之处，首先表现在都能为对象类型起名。

```tsx
type User = {
  username: string;
  age: number;
};

interface Users {
  username: string;
  age: number;
}

// type 命令 和 interface 命令，分别定义同一个类型
```

注：

`class`命令也有类似作用，通过定义一个类，同时定义一个对象类型。

但是，它会创造一个值，编译后依然存在。如果只是单纯想要一个类型，应该使用`type`或`interface`。

### 5.2、interface 与 type 的区别

TIP

- ①、`type`能够表示非对象类型，而`interface`只能表示对象类型（包括数组、函数等）
- ②、`interface`可以继承其他类型，`type`不支持继承。

继承的主要作用是添加属性，`type`定义的对象类型如果想要添加属性，只能使用`&`运算符，重新定义一个类型。

```tsx
type Animal = {
  name: string;
};

type Dog = Animal & {
  age: number;
};

// 类型 Dog 在 Animal 的基础上添加了一个属性 age
// 上面的 &运算符，表示同时具备两个类型的特征，因此可以起到两个对象类型合并的作用。
```

作为比较，`interface`添加属性，采用的是继承的写法。

```tsx
interface Animal {
  name: string;
}

interface Dog extends Animal {
  age: number;
}
```

继承时，type 和 interface 是可以换用的。interface 可以继承 type。

```tsx
type Foo = { x: number };

interface Bar extends Foo {
  y: number;
}
```

type 也可以继承 interface。

```tsx
interface Foo {
  x: number;
}

type Bar = Foo & { y: number };
```

- ③、同名`interface`会自动合并，同名`type`则会报错。也就是说，TypeScript 不允许使用`type`多次定义同一个类型

```tsx
type A = { foo: number }; // 报错
type A = { bar: number }; // 报错

// type 两次定义了类型A，导致两行都会报错
```

作为比较，`interface`则会自动合并

```tsx
interface A {
  foo: number;
}
interface A {
  bar: number;
}

const obj: A = {
  foo: 1,
  bar: 1,
};

// interface 把类型 A 的两个定义合并在一起
```

这表明，interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type

- ④、`interface`不能包含属性映射（mapping），`type`可以

```tsx
interface Point {
  x: number;
  y: number;
}

// 正确
type PointCopy1 = {
  [Key in keyof Point]: Point[Key];
};

// 报错
interface PointCopy2 {
  [Key in keyof Point]: Point[Key];
};
```

- ⑤、this`关键字只能用于`interface

```tsx
// 正确
interface Foo {
  add(num: number): this;
}

// 报错
type Foo = {
  add(num: number): this;
};

// type 命令声明的方法 add()，返回 this 就报错了
// 而 interface 命令没有这个问题
```

下面是返回`this`的实际对象的例子

```tsx
class Count implements Foo {
  result = 0;
  add(num: number) {
    this.result += num;
    return this;
  }
}
```

- ⑥、type 可以扩展原始数据类型，interface 不行

```tsx
// 正确
type MyStr = string & {
  type: "new";
};

// 报错
interface MyStr extends string {
  type: "new";
}

// type 可以扩展原始数据类型 string，interface 就不行
```

- ⑦、`interface`无法表达某些复杂类型（比如交叉类型和联合类型），但是`type`可以

```tsx
type A = {
  /* ... */
};
type B = {
  /* ... */
};

type AorB = A | B;
type AorBwithName = AorB & {
  name: string;
};

// 类型 AorB 是一个联合类型，AorBwithName 则是为 AorB 添加一个属性
// 这两种运算，interface 都没法表达
```

注：

综上所述，如果有复杂的类型运算，那么没有其他选择只能使用`type`；一般情况下，`interface`灵活性比较高，便于扩充类型或自动合并，建议优先使用。

### 6、对象类型接口

TIP

需求：从后端获取一组数据，然后将数据渲染到页面中，我们应该如何定义接口 ？

```tsx
// 使用 interface 定义一个 List 接口，该接口包括三个成员
interface List {
  id: number;
  username: string;
  age: number;
}
// 使用 interface 定义一个 Result 接口，有一个成员是 data，成员的取值是 List[] 数组
interface Result {
  data: List[];
}

// 渲染函数
function render(result: Result) {
  // 遍历 result.data
  result.data.forEach((value) => {
    // 打印对应的值
    console.log(value.id, value.username, value.age);
  });
}

// 假设：result 为后端接收过来的数据，同时 result 完全符合接口的定义
let result = {
  data: [
    { id: 1, username: "icoding", age: 18 },
    { id: 2, username: "艾编程", age: 19 },
  ],
};

// 调用 render() 函数，同时将后端的数据 result 作为参数传入其中
render(result);
```

![image-20230623155344693](https://www.arryblog.com/assets/img/image-20230623155344693-16937298565541.8dddccd4.png)

注：

以上代码运行后，输出的结果符合我们的预期。

但实际开发过程中，一定会遇到后端往往会传入过来一些预定之外的字段。

> 如下

### 7、TS 的鸭式辨型法

```tsx
interface List {
  id: number;
  username: string;
  age: number;
}
interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.username, value.age);
  });
}

let result = {
  data: [
    // 后端传入预定之外的字段，sex: 'male'
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19 },
  ],
};

render(result);
```

注：

当后端传入了预定之外的字段 `sex: 'male'` ，发现在 TS 中并没有报错，它是允许这种情况发生的。

这是因为 TS 采用了一种 **“鸭式辨型法”** 这是一种动态语言风格，有一种形象的说法是：“一只鸟，看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么这只鸟就可以被认为是鸭子”。

> 在 TS 中，我们只要传入的对象满足接口的必要条件，那就是被允许的，即便传入多余的字段也可以通过类型检查。

### 7.1、鸭式辨型法特殊情况

TIP

如果直接传入对象字面量，TS 就会对额外的字段进行类型检查

```tsx
render({
  data: [
    // 此时，TS 会对额外的字段进行类型检查，sex: 'male' 处，会报错
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19 },
  ],
});
```

![image-20230623165508453](https://www.arryblog.com/assets/img/image-20230623165508453-16937298565542.ebff2073.png)

注：

以上代码，我们在 `render()` 方法中传入了对象字面量，其中有额外的字段，此时 TS 就会对额外的字段 `sex: 'male'` 进行类型检查。

> **绕过这种检查的方法有三种：**

- ①、将对象字面量赋值给一个变量（像上边 result 变量的做法）
- ②、使用类型断言，在对象字面量后边加上 `as 对象的类型` 。类型断言的含义是：我们要明确的告诉编译器，对象的类型是什么 ，这样编译器就会绕过类型检查

```tsx
render({
  data: [
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19 },
  ],
} as Result);

// 通过 as Result 类型断言
```

类型断言的另一种语法

```tsx
// 直接在对象前加上 <对象类型>
render(<Result>{
  data: [
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19 },
  ],
});
```

> 注：两种方法是等价的，但此方式不建议使用，在 React 框架中会产生歧义，建议还是使用 `as 对象类型` 的方式

- ③、使用字符串索引签名

```tsx
interface List {
  id: number;
  username: string;
  age: number;
  // 定义字符串索引签名
  [x: string]: any;
}
```

注：

`[x: string]: any;` 在 `[]` 中定义一个 `x` ，它的返回值类型是 `any` 这就是一个字符串索引签名。

它的含义是：用任意的字符串去索引 `List` 可以得到任意的结果，这样 List 就可以支持多个属性了。

### 8、接口成员 - 可选属性

TIP

需求：判断 value 中是否有新的字段，如果有就打印出来

> 可选属性语法：在属性前添加一个 `?` 问号，表示该属性可有可无

```tsx
interface List {
  id: number;
  username: string;
  age: number;
  // [x: string]: any; // 定义字符串索引签名
  // sex: string; // 添加 sex 属性后，调用 render(result) 方法还是会报错

  // 设置可选属性，在 sex 后边添加一个 ？ 表示该属性可有可无
  sex?: string;
}
interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.username, value.age);
    // 判断 value 中是否有新的字段，如果有就打印出来
    if (value.sex) {
      console.log(value.sex);
    }
  });
}

let result = {
  data: [
    // 后端传入预定之外的字段，sex: 'male'
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19, sex: "female" },
  ],
};

render(result);
```

![image-20230623192623265](https://www.arryblog.com/assets/img/image-20230623192623265-16937300444665.f5c2178f.png)

### 9、接口成员 - 只读属性

TIP

只读属性：给一个属性添加 `readonly` ，一般 id 都是只读的，并且只读属性都是不能修改的。

```tsx
interface List {
  // 将 id 设置为 只读属性
  readonly id: number;
  username: string;
  age: number;
  // 设置可选属性，在 sex 后边添加一个 ？ 表示该属性可有可无
  sex?: string;
}
interface Result {
  data: List[];
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.username, value.age);
    // 判断 value 中是否有新的字段，如果有就打印出来
    if (value.sex) {
      console.log(value.sex);
    }
    // 只读属性是不能修改的
    value.id++;
  });
}

let result = {
  data: [
    // 后端传入预定之外的字段，sex: 'male'
    { id: 1, username: "icoding", age: 18, sex: "male" },
    { id: 2, username: "艾编程", age: 19, sex: "female" },
  ],
};

render(result);
```

![image-20230623193912490](https://www.arryblog.com/assets/img/image-20230623193912490-16937300444666.f615c095.png)

### 10、可索引类型的接口 - 数字索引

TIP

以上接口的属性个数都是固定的，当我们不确定一个接口中有多少个属性时，就可以使用可索引类型的接口。

可索引类型的接口可使用数字索引，也可用字符串来索引。

```tsx
// 定义一个用数字索引的接口
interface StringArray {
  // 定义数字索引签名
  [index: number]: string;
}

// 这样的含义是：用任意的数字去索引 StringArray，都会得到一个 string
// 相当于声明了一个字符串类型的数组

// 定义一个变量 chars ，它的类型是 StringArray，取值为一个字符串数组
let chars: StringArray = ["A", "B"];
```

### 11、可索引类型的接口 - 字符串索引

```tsx
// 定义一个字符串索引的接口
interface Names {
  // 字符串索引签名，这样声明后就不能再声明 number 类型的成员了
  [x: string]: string;
  // y: number // 会报错，因为两种索引签名是可以混用的

  // 新增一个数字签名索引
  [z: number]: string;

  // 这样即可以用数字索引 Names，也可以用 String 去索引 Names
  // 需要注意：数字签名的返回值，一定要是字符串索引签名值的子类类型
  // 这是因为 JavaScript 会进行类型转换，将 Number 转换为 String，这样就能保持类型的兼容性
}
```

如果将数字签名的返回值改为 number，这样就会和 string 不兼容

```tsx
// 定义一个字符串索引的接口
interface Names {
  // [x: string]: string;
  [x: string]: any; // 改为 any 就兼容了

  // 将数字签名索引的返回值 改为 number，这样就会和 string 不兼容
  [z: number]: number;
}
```

### 12、总结

TIP

以上学习了对象类型接口，可以将过去我们开发过的 API 或 调用过的 API ，用接口去描述一下。

在这个过程中，会强制我们去思考一些变量的类型，也会思考一些接口的边界问题。这个过程非常有利于你培养类型思维。

### 13、函数类型接口

TIP

在数据类型中学过，使用变量来定义一个函数类型。如下

```tsx
let add: (x: number, y: number) => number;
```

使用接口来定义一个函数，该接口的定义方式 等价于 以上函数

```tsx
interface Add {
  (x: number, y: number): number;
}
```

除此之外，还有一种更简洁的函数定义方式，即：使用类型别名

```tsx
// 使用类型别名定义函数
// type 为关键字，Add 为类型别名的名称，=> 后边的 number 为函数返回值类型
type Add = (x: number, y: number) => number;
```

> 注：类型别名就是我们这个函数取一个名字，该名字为 Add

实现一个具体的函数 `add`

```tsx
let add: Add = (a, b) => a + b;
```

### 14、混合类型接口

TIP

一个接口既可以定义一个函数，也可以像对象一样拥有属性和方法，即：混合类型接口

使用混合接口定义一个类库

```tsx
// 使用混合接口定义一个类库
interface Lib {
  // 无返回值、无参数的函数
  (): void;
  // 版本号
  version: string;
  // 函数的方法
  doSomething(): void;
}

// 实现接口
let lib: Lib = (() => {}) as Lib; // 使用类型断言，明确函数的类型
lib.version = "1.0";
lib.doSomething = () => {};
```

注：

以上的接口已经实现了，但它的问题就是对全局暴露了一个 `lib`，它是一个单例

如果需要创建多个 `lib` 就需要使用函数进行封装

```tsx
// 使用混合接口定义一个类库
interface Lib {
  // 无返回值、无参数的函数
  (): void;
  // 版本号
  version: string;
  // 函数的方法
  doSomething(): void;
}

// 封装 getLib() 函数
function getLib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => {};
  return lib;
}

// 有了封装好的 getLib() 函数，就可以创建多个实例了
// 创建一个 lib1 实例
let lib1 = getLib();
// 调用方法
lib1.doSomething();

// 创建一个 lib2 实例
let lib2 = getLib();
// 调用方法
lib2.doSomething();
```

总结：

以上我们用接口分别定义了对象和函数，其实接口还可以定义类的结构和类型，这部分内容会在学习完 TS 的类之后在做学习。
