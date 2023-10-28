---
title: TypeScript 数组、元组，any、unknown、never 类型
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 数组、元组，any、unknown、never 类型

TIP

从本节开始正式学习 TypeScript 常见基础类型

- 数组类型
- 元组类型
- any 类型
- unknown 类型
- never 类型

## 一、数组类型

TIP

JavaScript 数组在 TypeScript 里面分成两种类型，分别是数组（array）和元组（tuple）。

### 1、TS 数组的特征

TIP

TypeScript 数组有一个根本特征：

- 所有成员的类型必须相同
- 但是成员数量是不确定的，可以是无限数量的成员，也可以是零成员

### 2、数组的类型语法

TIP

TS 中定义数组有两种写法，以下是简单写法

```tsx
// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 以上，Array 是 TS 为我们预定义的一个 泛型接口（在VSCode中按住 Ctrl 键 鼠标点击进入源码中可查看到）
```

注：

这两种声明方式都是等价的，即：这个数组只能是 number 类型

- 如果我们为该数组添加一个字符串成员，编辑器会报错。
- 如果我们需要为数组定义不同的数据类型，就需要用到联合类型

```tsx
// 给数组定义不同的数据类型，使用 联合类型
// 即：表示该数组的元素既可以是 number 类型 也可以是 string 类型
let arr2: Array<number | string> = [1, 2, 3, "艾编程"];
```

### 2.1、数组类型的第一种写法

TIP

方式一：在数组成员的类型后面，加上一对方括号。

```tsx
let arr: number[] = [1, 2, 3];

// 数组 arr 的类型是 number[]，其中 number 表示数组成员类型是 number。
```

如果数组成员的类型比较复杂，可以写在圆括号里面。

```tsx
// 数组 arr 的成员类型是 number|string
let arr: (number | string)[];

let arr1: (number | string)[] = [1, 2, "icoding"];
console.log(arr1); // [ 1, 2, 'icoding' ]
```

注：

这个例子里面的圆括号是必须的，否则因为竖杠`|`的优先级低于`[]`，TypeScript 会把`number|string[]`理解成`number`和`string[]`的联合类型。

如果数组成员可以是任意类型，写成`any[]`。当然，这种写法没有任何意义。

```tsx
let arr: any[];
```

### 2.2、数组类型的第二种写法

TIP

使用 TypeScript 内置的 Array 接口

```tsx
let arr: Array<number> = [1, 2, 3];
console.log(arr); // [ 1, 2, 3 ]

// 数组 arr 的类型是 Array<number>，其中 number 表示成员类型是 number。
```

对于成员类型比较复杂的数组，使用 **联合类型**

```tsx
let arr: Array<number | string> = [1, 2, "icoding", 3];
console.log(arr); // [ 1, 2, 'icoding', 3 ]

// 这种写法本质上属于泛型，后边会有专门的章节讲，先做了解即可
```

### 2.3、数组类型注意事项

TIP

数组类型声明了以后，成员数量是不限制的，任意数量的成员都可以，也可以是空数组。

```tsx
let arr: number[];
arr = [];
arr = [1];
arr = [1, 2];
arr = [1, 2, 3];
arr = [1, 2, 3, 4];
arr = [1, 2, 3, 4, 5];

// 数组 arr 无论有多少个成员，都是正确的
```

这种规定的隐藏含义就是，数组的成员是可以动态变化的。

```tsx
let arr: number[] = [1, 2, 3];

arr[3] = 5;
console.log(arr); // [ 1, 2, 3, 5 ]

arr.length = 3;
console.log(arr); // [ 1, 2, 3 ]

// 数组增加成员或减少成员，都是可以的
```

正是由于成员数量可以动态变化，所以 TypeScript 不会对数组边界进行检查，越界访问数组并不会报错。

```tsx
let arr: number[] = [1, 2, 3];
// TS中，越界访问不会报错
let num = arr[3]; // 正确

console.log(num); // undefined

// 变量 num 的值是一个不存在的数组成员，TypeScript 并不会报错
```

TypeScript 允许使用方括号读取数组成员的类型。

```tsx
type UserNames = string[];
type UserName = UserNames[0]; // string

// 类型 UserNames 是字符串数组，那么 UserNames[0] 返回的类型就是 string
```

由于数组成员的索引类型都是`number`，所以读取成员类型也可以写成下面这样。

```tsx
type UserNames = string[];
type UserName = UserNames[number]; // string

// UserNames[number] 表示数组 UserNames 所有数值索引的成员类型，所以返回 string
```

### 3、数组的类型推断

TIP

如果数组变量没有声明类型，TypeScript 就会推断数组成员的类型。这时，推断行为会因为值的不同，而有所不同。

如果变量的初始值是空数组，那么 TypeScript 会推断数组类型是`any[]`

```tsx
// 推断为 any[]
const arr = [];
```

为这个数组赋值时，TypeScript 会自动更新类型推断

```tsx
const arr = []; // arr 推断为 any[]

arr.push(123);
arr; // 推断类型为 number[]

arr.push("icoding");
arr; // 推断类型为 (string|number)[]

// 数组变量 arr 的初始值是空数组，然后随着新成员的加入，TypeScript 会自动修改推断的数组类型
```

但是，类型推断的自动更新只发生初始值为空数组的情况。如果初始值不是空数组，类型推断就不会更新

```tsx
// 推断类型为 number[]
const arr = [123];

arr.push("icoding"); // 报错

// 数组变量 arr 的初始值是 [123]，TypeScript 就推断成员类型为 number
// 新成员如果不是这个类型，TypeScript 就会报错，而不会更新类型推断
```

### 4、只读数组，const 断言

TIP

JavaScript 规定，`const`命令声明的数组变量是可以改变成员的。

```tsx
const arr = [1, 2, 3];
arr[1] = 5;

console.log(arr); // [ 1, 5, 3 ]

// 修改 const 命令声明的数组的成员是允许的
```

### 4.1、readonly 只读

TIP

很多时候确实有声明为只读数组的需求，即不允许变动数组成员。

TypeScript 允许声明只读数组，方法是在数组类型前面加上`readonly`关键字。

```tsx
const arr: readonly number[] = [1, 2, 3];

arr[1] = 5; // 报错
arr.push(6); // 报错
delete arr[0]; // 报错

// arr 是一个只读数组，删除、修改、新增数组成员都会报错
```

### 4.2、readonly 注意事项

TIP

TypeScript 将`readonly number[]`与`number[]`视为两种不一样的类型，后者是前者的子类型。

这是因为只读数组没有`pop()`、`push()`之类会改变原数组的方法，所以`number[]`的方法数量要多于`readonly number[]`，这意味着`number[]`其实是`readonly number[]`的子类型。

我们知道，子类型继承了父类型的所有特征，并加上了自己的特征，所以子类型`number[]`可以用于所有使用父类型的场合，反过来就不行。

```tsx
// 子类型
let a: number[] = [0, 1];
// 父类型
let b: readonly number[] = a;

a = b; // 报错

// 子类型 number[] 可以赋值给父类型 readonly number[]，但是反过来就会报错
```

由于只读数组是数组的父类型，所以它不能代替数组。这一点很容易产生令人困惑的报错。

```tsx
function getSum(s: number[]) {
  // ...
}

const arr: readonly number[] = [1, 2, 3];

getSum(arr); // 报错
// getSum(arr as number[]); // 正确

// 函数 getSum() 的参数 s 是一个数组，传入只读数组就会报错
// 原因就是只读数组是数组的父类型，父类型不能替代子类型
// 这个问题的解决方法是使用类型断言 getSum(arr as number[])
```

`readonly`关键字不能与数组的泛型写法一起使用

```tsx
// 报错
const arr: readonly Array<number> = [0, 1];
```

注：`readonly`关键字不能与数组的泛型写法一起使用

```tsx
// 报错
const arr: readonly Array<number> = [1, 2];

// readonly 与 数组的泛型写法一起使用，就会报错
```

实际上，TypeScript 提供了两个专门的泛型，用来生成只读数组的类型。

```tsx
const a1: ReadonlyArray<number> = [1, 2];

const a2: Readonly<number[]> = [1, 2];

// 泛型 ReadonlyArray<T> 和 Readonly<T[]> 都可以用来生成只读数组类型
// 两者尖括号里面的写法不一样，Readonly<T[]> 的尖括号里面是整个数组（number[]），而 ReadonlyArray<T> 的尖括号里面是数组成员（number）
```

只读数组还有一种声明方法，就是使用 “const 断言”

```tsx
const arr = [1, 2] as const;

arr[0] = [2]; // 报错，无法分配到 “0”，因为它是只读属性

// as const 告诉 TypeScript，推断类型时要把变量 arr 推断为只读数组，从而使得数组成员无法改变
```

### 5、多维数组

TIP

TypeScript 使用`T[][]`的形式，表示二维数组，`T`是最底层数组成员的类型

```tsx
let multi: number[][] = [
  [1, 2, 3],
  [11, 22, 33],
];

// 变量 multi 的类型是 number[][]，表示它是一个二维数组，最底层的数组成员类型是 number
```

## 二、元组类型

TIP

元组（tuple）是 TypeScript 特有的数据类型，也是一种特殊的数组。

JavaScript 没有单独区分这种类型，它表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。

> 由于成员的类型可以不一样，所以元组必须明确声明每个成员的类型。

```tsx
const a: [string, number, boolean] = ["icoding", 123, true];

// 元组 a 的第一个成员是 string，第二个成员是 number ，最后一个成员的类型是 boolean
```

### 1、元组类型的语法差异

TIP

元组类型的写法，与数组类型的语法有一个重大差异。数组的成员类型写在方括号外面（`number[]`），元组的成员类型是写在方括号里面（`[number]`）。

> TypeScript 的区分方法就是，成员类型写在方括号里面的就是元组，写在外面的就是数组。

```tsx
// 数组类型
let arr: number[] = [123];

// 元组类型
let tuple: [number] = [123];

// 变量 arr 和 tuple 的值都是 [123]，但是它们的类型是不一样的
// arr 是一个数组，成员类型 number 写在方括号外面；
// tuple 是一个元组，成员类型 number 写在方括号里面。
```

### 2、元组的使用

TIP

使用元组时，必须明确给出类型声明（上例的`[number]`），不能省略，否则 TypeScript 会把一个值自动推断为数组。

```tsx
// t 的类型被推断为 (number | boolean)[]
let t = [123, true];

// 变量 t 的值其实是一个元组，但是 TypeScript 会将其推断为一个联合类型的数组
// 即 t 的类型为(number | boolean)[]
// 所以，元组必须显式给出类型声明
```

元组成员的类型可以添加问号后缀（`?`），表示该成员是可选的

```tsx
let a: [number, number?] = [123];

// 元组 a 的第二个成员是可选的，可以省略
```

注：

问号只能用于元组的尾部成员，也就是说，所有可选成员必须在必选成员之后。

```tsx
type Tuple = [number, number, number?, string?];

// 元组 Tuple 的最后两个成员是可选的。也就是说，它的成员数量可能有两个、三个和四个
```

### 3、元组的越界问题

TIP

由于需要声明每个成员的类型，所以大多数情况下，元组的成员数量是有限的，从类型声明就可以明确知道，元组包含多少个成员，越界的成员会报错。

```tsx
let tuple: [number, string] = [666, "艾编程"];
// 给 tuple 的第二个成员重新赋值
tuple[1] = "icoding";
console.log(tuple); // [ 666, 'icoding' ]

tuple[2] = "ibc"; // 报错

// 变量 tuple 是一个只有两个成员的元组，如果对第三个成员赋值就报错了
```

使用 push 方法为元组插入新的元素

```tsx
let tuple: [number, string] = [666, "艾编程"];
// 为元组添加一个新的元素
tuple.push(1);
console.log(tuple); // [ 666, '艾编程', 1 ]

tuple[2]; // 报错

// 使用 push 方法为元组插入新的元素，运行结果中变成了三个元素。我们可以看到 TS 是允许我们往原子中插入新的元素的。
// 但，我们要对元组进行访问时，是不允许访问的 ！
```

注：

TS 中可以通过 push 方法为元组添加新的元素，但仍然不能进行越界访问

> 在实际的开发中，强烈不建议通过 push 方法插入元素的方式使用。

### 4、不限成员数量的元组

TIP

使用扩展运算符（`...`），可以表示不限成员数量的元组。

```tsx
type Nums = [string, ...number[]];

const a: Nums = ["icoding", 1, 2];
const b: Nums = ["ibc", 1, 2, 3];

// 元组类型 Nums 的第一个成员是字符串，后面的成员使用扩展运算符来展开一个数组，从而实现了不定数量的成员
```

扩展运算符（`...`）用在元组的任意位置都可以，它的后面只能是一个数组或元组。

```tsx
type T1 = [string, number, ...boolean[]];
type T2 = [string, ...boolean[], number];
type T3 = [...boolean[], string, number];

// 扩展运算符分别在元组的尾部、中部和头部，...的后面是一个数组 boolean[]
```

如果不确定元组成员的类型和数量，可以写成下面这样。

```tsx
type Tuple = [...any[]];

// 元组 Tuple 可以放置任意数量和类型的成员
// 但是这样写，也就失去了使用元组和 TypeScript 的意义
```

### 5、添加元组成员名

TIP

元组的成员可以添加成员名，这个成员名是说明性的，可以任意取名，没有实际作用。

```tsx
type Color = [red: number, green: number, blue: number];

const c: Color = [255, 255, 255];

console.log(c); // [ 255, 255, 255 ]

// 类型 Color 是一个元组，它有三个成员
// 每个成员都有一个名字，写在具体类型的前面，使用冒号分隔
// 这几个名字可以随便取，没有实际作用，只是用来说明每个成员的含义
```

### 6、读取元组成员类型

TIP

元组可以通过方括号，读取成员类型

```tsx
type Tuple = [string, number];
type A = Tuple[1]; // number

// Tuple[1] 返回 1号位置的成员类型
```

由于元组的成员都是数值索引，即索引类型都是`number`，所以可以像下面这样读取

```tsx
type Tuple = [string, number, Date];
type A = Tuple[number]; // string | number | Date

// Tuple[number] 表示元组 Tuple 的所有数值索引的成员类型
// 所以，返回 string | number | Date ，即这个类型是三种值的联合类型
```

### 7、只读元组

TIP

元组也可以是只读的，不允许修改，有两种写法

```tsx
// 写法一
type a = readonly [number, string];

// 写法二
type b = Readonly<[number, string]>;

// 两种写法都可以得到只读元组，其中写法二是一个泛型，用到了工具类型 Readonly<T>
```

跟数组一样，只读元组是元组的父类型。所以，元组可以替代只读元组，而只读元组不能替代元组。

```tsx
type a = readonly [number, number];
type b = [number, number];

let x: b = [1, 2];
let y: a = x; // 正确

x = y; // 报错

// 类型 a 是只读元组，类型 b 是普通元组。b 类型可以赋值给 a 类型，反过来就会报错
```

由于只读元组不能替代元组，所以会产生一些令人困惑的报错

```tsx
function foo([x, y]: [number, number]) {
  // 求平方根
  return Math.sqrt(x ** 2 + y ** 2);
}

let a = [3, 4] as const;

foo(a); // 报错

// 函数 foo() 的参数是一个元组，传入只读元组就会报错，因为只读元组不能替代元组
```

注：

以上代码中，`[3, 4] as const`的写法，在前面讲到，生成的是只读数组，其实生成的同时也是只读元组。

因为它生成的实际上是一个只读的“值类型” `readonly [3, 4]`，把它解读成只读数组或只读元组都可以。

解决报错的方法，就是使用类型断言，在最后一行将传入的参数断言为普通元组。

```tsx
foo(a as [number, number]); // 正确
```

### 8、成员数量的推断

TIP

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量（即元组长度）。

```tsx
function foo(point: [number, number]) {
  if (point.length === 3) {
    // 报错
    // ...
  }
}

// 报错原因是 TypeScript 发现元组 point 的长度是 2，不可能等于 3，这个判断无意义
```

如果包含了可选成员，TypeScript 会推断出可能的成员数量

```tsx
function foo(point: [number, number?, number?]) {
  if (point.length === 4) {
    // 报错
    // ...
  }
}

// 报错原因是 TypeScript 发现 point.length 的类型是 1 | 2 | 3，不可能等于 4
```

如果使用了扩展运算符，TypeScript 就无法推断出成员数量

```tsx
const tuple: [...string[]] = ["a", "b", "c"];

if (tuple.length === 4) {
  // 正确
  // ...
}

// tuple 只有三个成员，但是 TypeScript 推断不出它的成员数量
// 因为它的类型用到了扩展运算符，TypeScript 把 tuple 当成数组看待，而数组的成员数量是不确定的
```

注：

一旦扩展运算符使得元组的成员数量无法推断，TypeScript 内部就会把该元组当成数组处理。

### 9、扩展运算符与成员数量

TIP

扩展运算符（`...`）将数组（注意，不是元组）转换成一个逗号分隔的序列，这时 TypeScript 会认为这个序列的成员数量是不确定的，因为数组的成员数量是不确定的。

这导致如果函数调用时，使用扩展运算符传入函数参数，可能发生参数数量与数组长度不匹配的报错。

```tsx
const arr = [1, 2];

function add(x: number, y: number) {
  // ...
}

add(...arr); // 报错

// 报错原因是函数 add() 只能接受两个参数，但是传入的是 ...arr，TypeScript 认为转换后的参数个数是不确定的
```

有些函数可以接受任意数量的参数，这时使用扩展运算符就不会报错

```tsx
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3

// console.log() 可以接受任意数量的参数，所以传入 ...arr 就不会报错
```

解决这个问题的一个方法，就是把成员数量不确定的数组，写成成员数量确定的元组，再使用扩展运算符。

```tsx
const arr: [number, number] = [1, 2];

function add(x: number, y: number) {
  // ...
}

add(...arr); // 正确

// arr 是一个拥有两个成员的元组，所以 TypeScript 能够确定 ...arr 可以匹配函数 add() 的参数数量，就不会报错了
```

另一种写法是使用`as const`断言

```tsx
const arr = [1, 2] as const;
```

注：

以上代码中写法也可以，因为 TypeScript 会认为`arr`的类型是`readonly [1, 2]`，这是一个只读的值类型，可以当作数组，也可以当作元组。

## 三、any、unknown、never 类型

TIP

TypeScript 中三种特殊类型，可以作为学习 TypeScript 类型系统的起点

### 1、any 类型

TIP

在 TS 中如果我们不止定义一个变量和类型，它默认就是 any 类型，这和 JS 就没有任何区别了。我们可以给这个变量任意的赋值 ！

> 即：any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。

```tsx
// any 类型
// let a: any;

// 不添加类型注解，默认就是 any 类型
let a;

// any 类型即：可以给这个变量任意赋值（整型、数组、对象、函数 等都可以）
a = 1;
a = "icoding";
a = true;
a = [];
a = {};
a = () => {};

// 变量 a 的类型是 any，就可以被赋值为任意类型的值
```

变量类型一旦设为`any`，TypeScript 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要语法正确，都不会报错。

```tsx
let b: any = "icoding";

b(1); // 不报错
b.foo = 123; // 不报错

// 变量 b 的值是一个字符串，但是把它当作函数调用，或者当作对象读取任意属性，TypeScript 编译时都不报错
// 原因就是 b 的类型是 any，TypeScript 不对其进行类型检查
```

### 1.1、any 类型的应用场景

TIP

应该尽量避免使用`any`类型，否则就失去了使用 TypeScript 的意义。

> 实际开发中，`any`类型主要适用以下两个场合：

- ①、出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为`any`
- ②、为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为`any`。有些年代很久的大型 JavaScript 项目，尤其是别人的代码，很难为每一行适配正确的类型，这时你为那些类型复杂的变量加上`any`，TypeScript 编译时就不会报错。

总之，TypeScript 认为，只要开发者使用了`any`类型，就表示开发者想要自己来处理这些代码，所以就不对`any`类型进行任何限制，怎么使用都可以。

从集合论的角度看，`any`类型可以看成是所有其他类型的全集，包含了一切可能的类型。TypeScript 将这种类型称为“顶层类型”（top type），意为涵盖了所有下层。

### 1.2、类型推断问题

TIP

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`。

```tsx
function add(a, b) {
  return a + b;
}

add(1, [1, 2, 3]); // 不报错

// 函数 add() 的参数变量 a 和 b，都没有足够的信息，TypeScript 无法推断出它们的类型，就会认为这两个变量和函数返回值的类型都是 any
// 以至于后面就不再对函数 add() 进行类型检查了，怎么用都可以
```

注：

这显然是很糟糕的情况，所以对于那些类型不明显的变量，一定要显式声明类型，防止被推断为`any`

TypeScript 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出`any`类型就会报错。在 `tsconfig.json` 中

```tsx
{
  "compilerOptions": {
      "noImplicitAny": true
  }
}
```

也可以使用 `noImplicitAny` 编译选项进行编译，这时上面的函数`add()`就会报错。

```tsx
tsc --noImplicitAny .\src\main.ts
```

这里有一个特殊情况，即使打开了`noImplicitAny`，使用`let`和`var`命令声明变量，但不赋值也不指定类型，是不会报错的。

```tsx
var a; // 不报错
let b; // 不报错

// 变量 a 和 b 声明时没有赋值，也没有指定类型，TypeScript 会推断它们的类型为any。
// 这时即使打开了 noImplicitAny，也不会报错
```

以下 变量`a`的类型推断为`any`，但是不报错，可以顺利通过编译

```tsx
let a;

a = 123;
a = { foo: "icoding" };
```

### 1.3、注意事项

TIP

建议使用`let`和`var`声明变量时，如果不赋值，就一定要显式声明类型，否则可能存在安全隐患。

`const`命令没有这个问题，因为 JavaScript 语言规定`const`声明变量时，必须同时进行初始化（赋值）。

```tsx
const a; // 报错
```

注：

以上代码中，`const`命令声明的`a`是不能改变值的，声明时必须同时赋值，否则报错，所以它不存在类型推断为`any`的问题

### 1.4、污染问题

TIP

`any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。

```tsx
let a: any = "icoding";
let b: number;

b = a; // 不报错

b * 123; // 不报错
b.toFixed(); // 不报错

// 变量 b 的类型是 any，实际的值是一个字符串
// 变量 b 的类型是 number，表示这是一个数值变量，但是它被赋值为 a，这时并不会报错
// 然后，变量 b 继续进行各种数值运算，TypeScript 也检查不出错误，问题就这样留到运行时才会暴露
```

注：

污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用`any`类型的另一个主要原因。

### 2、unknown 类型

TIP

为了解决`any`类型“污染”其他变量的问题，TypeScript 3.0 引入了[`unknown`类型 (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)。

它与`any`含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像`any`那样自由，可以视为严格版的`any`

### 2.1、unknown 与 any 的相似之处

TIP

`unknown`跟`any`的相似之处，在于所有类型的值都可以分配给`unknown`类型。

```tsx
let a: unknown;

a = true; // 正确
a = 123; // 正确
a = "icoding"; // 正确

// 变量 a 的类型是 unknown，可以赋值为各种类型的值。这与 any 的行为一致。
```

### 2.2、unknown 与 any 的不同处

TIP

`unknown`类型跟`any`类型的不同之处在于，它不能直接使用。

> 主要有以下几个限制

①、`unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）

```tsx
let a: unknown = 123;

let a1: boolean = a; // 报错
let a2: number = a; // 报错

// 变量 a 是 unknown 类型，赋值给 any 和 unknown 以外类型的变量都会报错，这就避免了污染问题，从而克服了any 类型的一大缺点。
```

②、不能直接调用`unknown`类型变量的方法和属性

```tsx
let a: unknown = { foo: 123 };
a.foo; // 报错

let b: unknown = "icoding";
b.trim(); // 报错

let c: unknown = (n = 0) => n + 1;
c(); // 报错

// 直接调用 unknown 类型变量的属性和方法，或者直接当作函数执行，都会报错
```

③、`unknown`类型变量能够进行的运算是有限的，只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错

```tsx
let a: unknown = 1;

a + 1; // 报错
a === 1; // 正确

// unknown类型的变量a进行加法运算会报错，因为这是不允许的运算。
// 但是，进行比较运算就是可以的
```

### 2.3、使用 unknown 类型变量

TIP

只有经过“类型缩小”，`unknown`类型变量才可以使用。所谓“类型缩小”，就是缩小`unknown`变量的类型范围，确保不会出错

```tsx
let a: unknown = 1;

if (typeof a === "number") {
  let b = a + 10; // 正确
}

// unknown 类型的变量 a 经过 typeof 运算以后，能够确定实际类型是 number，就能用于加法运算了。
// 这就是“类型缩小”，即将一个不确定的类型缩小为更明确的类型
```

另一种情况

```tsx
let a: unknown = "icoding";

if (typeof a === "string") {
  a.length; // 正确
}

// 确定变量a 的类型为字符串以后，才能调用它的 length 属性
```

注：

这样设计的目的是，只有明确`unknown`变量的实际类型，才允许使用它，防止像`any`那样可以随意乱用，“污染”其他变量。类型缩小以后再使用，就不会报错。

总之，`unknown`可以看作是更安全的`any`。一般来说，凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型。

在集合论上，`unknown`也可以视为所有其他类型（除了`any`）的全集，所以它和`any`一样，也属于 TypeScript 的顶层类型。

### 3、never 类型

TIP

为了保持与集合论的对应关系，以及类型运算的完整性，TypeScript 还引入了“空类型”的概念，即该类型为空，不包含任何值。

由于不存在任何属于“空类型”的值，所以该类型被称为`never`，即不可能有这样的值。

```tsx
let a: never;

// 变量 a 的类型是 never，就不可能赋给它任何值，否则都会报错。
```

### 3.1、never 类型的使用场景

TIP

`never`类型的使用场景，主要是在一些类型运算之中，保证类型运算的完整性（后边会详细 讲解）。

> 另外，不可能返回值的函数，返回值的类型就可以写成`never`

如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于`never`类型。

```tsx
function foo(a: string | number) {
  if (typeof a === "string") {
    // ...
  } else if (typeof a === "number") {
    // ...
  } else {
    a; // never 类型
  }
}

// 参数变量 a 可能是字符串，也可能是数值，判断了这两种情况后，剩下的最后那个 else 分支里面，a 就是 never 类型了
```

`never`类型的一个重要特点是，可以赋值给任意其他类型。

```tsx
function foo(): never {
  throw new Error("Error");
}

let a: number = foo(); // 不报错
let b: string = foo(); // 不报错
let c: boolean = foo(); // 不报错

// 函数 foo() 会抛错，所以返回值类型可以写成 never，即不可能返回任何值
// 各种其他类型的变量都可以赋值为 foo() 的运行结果（never类型）
```

注：

为什么`never`类型可以赋值给任意其他类型呢 ？

这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。

> 总之，TypeScript 有两个“顶层类型”（`any`和`unknown`），但是“底层类型”只有`never`唯一一个。

### 3.2、总结

TIP

never 类型表示：永远不会有返回值的类型。

> 有两种情况

- ①、一个函数抛出了一个异常，这个函数就永远不会有返回值，它的类型就是 never 类型
- ②、死循环函数，它永远不会返回。它的类型就是 never 类型

```tsx
// 函数抛出了一个异常
let error = () => {
  throw new Error("error");
};

// 死循环函数，永远不会返回
let endless = () => {
  while (true) {}
};

// 变量 error 和 endless 就是 never 类型
```
