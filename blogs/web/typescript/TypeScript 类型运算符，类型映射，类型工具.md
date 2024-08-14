---
title: TypeScript 类型运算符，类型映射，类型工具
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 类型运算符，类型映射，类型工具



从本节开始学习 TypeScript 类型运算符，类型映射相关等内容

- 类型运算符
- 类型映射

## 一、类型运算符



TypeScript 提供强大的类型运算能力，可以使用各种类型运算符，对已有的类型进行计算，得到新类型。

### 1、keyof 运算符



keyof 是一个单目运算符，接受一个对象类型作为参数，返回该对象的所有键名组成的联合类型。

```tsx
type MyObj = {
  foo: number;
  bar: string;
};

type Keys = keyof MyObj; // 'foo'|'bar'

const a: Keys = "bar"; // 正确
const b: Keys = "foo"; // 正确
const c: Keys = "icoding"; // 错误

// keyof MyObj 返回 MyObj 的所有键名组成的联合类型，即 'foo'|'bar'
```

keyof 接受一个接口类型作为参数

```tsx
interface T {
  0: boolean;
  a: string;
  b(): void;
}

type KeyT = keyof T; // 0 | 'a' | 'b'

const a: KeyT = "a"; // 正确
const b: KeyT = "b"; // 正确
const c: KeyT = 0; // 正确
```

### 1.1、keyof 返回类型



由于 JavaScript 对象的键名只有三种类型，所以对于任意对象的键名的联合类型就是`string|number|symbol`。

```tsx
// string | number | symbol
type KeyT = keyof any;
```

对于没有自定义键名的类型使用 keyof 运算符，返回`never`类型，表示不可能有这样类型的键名。

```tsx
type KeyT = keyof object; // never

// 由于 object 类型没有自身的属性，也就没有键名，所以 keyof object 返回 never 类型
```

由于 keyof 返回的类型是`string|number|symbol`，如果有些场合只需要其中的一种类型，那么可以采用交叉类型的写法。

```tsx
type Capital<T extends string> = Capitalize<T>;

type MyKeys<Obj extends object> = Capital<keyof Obj>; // 报错

// 类型 Capital 只接受字符串作为类型参数，传入keyof Obj会报错，原因是这时的类型参数是string|number|symbol，跟字符串不兼容
```

采用下面的交叉类型写法，就不会报错

```tsx
type Capital<T extends string> = Capitalize<T>;
// 使用交叉类型的写法
type MyKeys<Obj extends object> = Capital<string & keyof Obj>;

// string & keyof Obj 等同于 string & string|number|symbol 进行交集运算，最后返回string
// 因此 Capital<T extends string> 就不会报错了
```

### 1.2、keyof 返回属性名的索引类型



如果对象属性名采用索引形式，keyof 会返回属性名的索引类型。

```tsx
// 示例一
interface T {
  [prop: number]: number;
}

// number
type KeyT = keyof T;

const a: KeyT = 123; // 正确
const b: KeyT = "icoding"; // 错误

// 示例二
interface U {
  [prop: string]: number;
}

// string|number
type KeyU = keyof U;

const m: KeyU = 123; // 正确
const n: KeyU = "icoding"; // 正确

// 以上示例二，keyof T 返回的类型是 string|number
// 原因是 JavaScript 属性名为字符串时，包含了属性名为数值的情况，因为数值属性名会自动转为字符串
```

### 1.3、keyof 用于数组 或 元组类型



如果 keyof 运算符用于数组或元组类型，得到的结果可能出人意料。

```tsx
type Result = keyof ["a", "b", "c"];

// 返回 number | "0" | "1" | "2"
// | "length" | "pop" | "push" | ···
// keyof 会返回数组的所有键名，包括数字键名和继承的键名

const a: Result = 123; // 正确
const b: Result = "0"; // 正确
const c: Result = "1"; // 正确
const d: Result = "2"; // 正确
const e: Result = "3"; // 报错

const f: Result = "length";
const g: Result = "pop";
const h: Result = "push";
const o: Result = "icoding"; // 报错
```

### 1.4、keyof 用于联合类型



对于联合类型，keyof 返回成员共有的键名。

```tsx
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };

// 返回 'z'
type KeyT = keyof (A | B);

const a: KeyT = "z"; // 正确
```

### 1.5、keyof 用于交叉类型



对于交叉类型，keyof 返回所有键名。

```tsx
type A = { a: string; x: boolean };
type B = { b: string; y: number };

// 返回 'a' | 'x' | 'b' | 'y'
type KeyT = keyof (A & B);

// 相当于
// keyof (A & B) ≡ keyof A | keyof B

const a: KeyT = "a"; // 正确
const b: KeyT = "x"; // 正确
const c: KeyT = "b"; // 正确
const d: KeyT = "y"; // 正确
const e: KeyT = "m"; // 错误
```

keyof 取出的是键名组成的联合类型，如果想取出键值组成的联合类型，可以像下面这样写。

```tsx
type MyObj = {
  foo: number;
  bar: string;
};

type Keys = keyof MyObj;

type Values = MyObj[Keys]; // number|string

const a: Values = 123; // 正确
const b: Values = "icoding"; // 正确
const c: Values = true; // 错误

// Keys 是键名组成的联合类型，而 MyObj[Keys] 会取出每个键名对应的键值类型，组成一个新的联合类型，即 number|string
```

### 2、keyof 运算符的用途



keyof 运算符往往用于精确表达对象的属性类型。

> 举例来说，取出对象的某个指定属性的值，JavaScript 版本可以写成下面这样。

```tsx
function prop(obj, key) {
  return obj[key];
}
```

上面这个函数添加类型，只能写成下面这样。

```tsx
function prop(obj: { [p: string]: any }, key: string): any {
  return obj[key];
}

// 上面的类型声明有两个问题：
// 一是无法表示参数 key 与 参数 obj 之间的关系
// 二是返回值类型只能写成 any
```

有了 keyof 以后，就可以解决这两个问题，精确表达返回值类型。

```tsx
function prop<Obj, K extends keyof Obj>(obj: Obj, key: K): Obj[K] {
  return obj[key];
}

// K extends keyof Obj 表示 K 是 Obj 的一个属性名，传入其他字符串会报错
// 返回值类型 Obj[K] 就表示 K 这个属性值的类型
```

keyof 的另一个用途是用于属性映射，即将一个类型的所有属性逐一映射成其他值。

```tsx
type NewProps<Obj> = {
  [Prop in keyof Obj]: boolean;
};

// 用法
type MyObj = { foo: number };

// 等于 { foo: boolean; }
type NewObj = NewProps<MyObj>;

// 类型 NewProps 是类型 Obj 的映射类型，前者继承了后者的所有属性，但是把所有属性值类型都改成了 boolean
```

下面的例子是去掉 readonly 修饰符

```tsx
type Mutable<Obj> = {
  // -readonly 表示去除这些属性的只读特性
  -readonly [Prop in keyof Obj]: Obj[Prop];
};

// 用法
type MyObj = {
  readonly foo: number;
};

// 等于 { foo: number; }
type NewObj = Mutable<MyObj>;

// [Prop in keyof Obj] 是 Obj 类型的所有属性名，-readonly 表示去除这些属性的只读特性
// 对应地，还有 +readonly 的写法，表示添加只读属性设置
```

下面的例子是让可选属性变成必有的属性

```tsx
type Concrete<Obj> = {
  [Prop in keyof Obj]-?: Obj[Prop];
};

// 用法
type MyObj = {
  foo?: number;
};

// 等于 { foo: number; }
type NewObj = Concrete<MyObj>;

// [Prop in keyof Obj] 后面的 -? 表示去除可选属性设置
// 对应地，还有 +? 的写法，表示添加可选属性设置
```

### 3、in 运算符



JavaScript 语言中，`in`运算符用来确定对象是否包含某个属性名。

```tsx
const obj = { a: 123 };

if ("a" in obj) {
  console.log("找到了 a");
}

// in 运算符用来判断对象 obj 是否包含属性 a
```

`in`运算符的左侧是一个字符串，表示属性名，右侧是一个对象。它的返回值是一个布尔值。

TypeScript 语言的类型运算中，`in`运算符有不同的用法，用来取出（遍历）联合类型的每一个成员类型。

```tsx
type U = "a" | "b" | "c";

type Foo = {
  [Prop in U]: number;
};

// 等同于
type Foo = {
  a: number;
  b: number;
  c: number;
};

// [Prop in U] 表示依次取出联合类型 U 的每一个成员
```

### 4、方括号运算符



方括号运算符（`[]`）用于取出对象的键值类型，比如`T[K]`会返回对象`T`的属性`K`的类型。

```tsx
type Person = {
  age: number;
  name: string;
  alive: boolean;
};

// Age 的类型是 number
type Age = Person["age"];

// Person['age'] 返回属性 age 的类型，本例是 number
```

方括号的参数如果是联合类型，那么返回的也是联合类型。

```tsx
type Person = {
  age: number;
  name: string;
  alive: boolean;
};

// number|string
type T = Person["age" | "name"];

// number|string|boolean
type A = Person[keyof Person];

// 方括号里面是属性名的联合类型，所以返回的也是对应的属性值的联合类型

// 如果访问不存在的属性，会报错
type T1 = Person["notExisted"]; // 报错
```

方括号运算符的参数也可以是属性名的索引类型。

```tsx
type Obj = {
  [key: string]: number;
};

// number
type T = Obj[string];

// Obj 的属性名是字符串的索引类型，所以可以写成 Obj[string]，代表所有字符串属性名，返回的就是它们的类型 number
```

这个语法对于数组也适用，可以使用`number`作为方括号的参数。

```tsx
// MyArray 的类型是 { [key:number]: string }
const MyArray = ["a", "b", "c"];

// 等同于 (typeof MyArray)[number]
// 返回 string
type Person = (typeof MyArray)[number];

// MyArray 是一个数组，它的类型实际上是属性名的数值索引，而 typeof MyArray[number] 的typeof 运算优先级高于方括号
// 所以返回的是所有数值键名的键值类型 string
```

注意，方括号里面不能有值的运算。

```tsx
// 示例一
const key = 'age';
type Age = Person[key]; // 报错

// 示例二
type Age = Person['a' + 'g' + 'e']; // 报错

// 这两个示例，方括号里面都涉及值的运算，编译时不会进行这种运算，所以会报错
```

### 5、`extends...?:` 条件运算符



TypeScript 提供类似 JavaScript 的`?:`运算符这样的三元运算符，但多出了一个`extends`关键字。

条件运算符`extends...?:`可以根据当前类型是否符合某种条件，返回不同的类型。

```tsx
T extends U ? X : Y

// extends 用来判断，类型 T 是否可以赋值给类型 U，即 T 是否为 U 的子类型，这里的 T 和 U 可以是任意类型
```

如果`T`能够赋值给类型`U`，表达式的结果为类型`X`，否则结果为类型`Y`

```tsx
// true
type T = 1 extends number ? true : false;

// 1 是 number 的子类型，所以返回 true
```

### 5.1、实践应用

```tsx
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

// number
type T1 = Dog extends Animal ? number : string;

// string
type T2 = RegExp extends Animal ? number : string;

// Dog 是 Animal 的子类型，所以 T1 的类型是 number
// RegExp 不是 Animal 的子类型，所以 T2 的类型是 string
```

注：

一般来说，调换`extends`两侧类型，会返回相反的结果。

举例来说，有两个类`Cat`和`Animal`，前者是后者的子类型，那么`Cat extends Animal`就为真，而`Animal extends Cat`就为伪。

### 5.2、判断联合类型



如果需要判断的类型是一个联合类型，那么条件运算符会展开这个联合类型。

```tsx
(A|B) extends U ? X : Y

// 等同于

(A extends U ? X : Y) | (B extends U ? X : Y)

// A|B 是一个联合类型，进行条件运算时，相当于 A 和 B 分别进行运算符，返回结果组成一个联合类型
```

如果不希望联合类型被条件运算符展开，可以把`extends`两侧的操作数都放在方括号里面。

```tsx
// 示例一
type ToArray<Type> = Type extends any ? Type[] : never;

// string[]|number[]
type T = ToArray<string | number>;

// 示例二
type ToArray<Type> = [Type] extends [any] ? Type[] : never;

// (string | number)[]
type T = ToArray<string | number>;

// 传入 ToArray<Type> 的类型参数是一个联合类型，所以会被展开，返回的也是联合类型
// 示例二是 extends 两侧的运算数都放在方括号里面，所以传入的联合类型不会展开，返回的是一个数组
```

条件运算符还可以嵌套使用。

```tsx
type LiteralTypeName<T> = T extends undefined
  ? "undefined"
  : T extends null
  ? "null"
  : T extends boolean
  ? "boolean"
  : T extends number
  ? "number"
  : T extends bigint
  ? "bigint"
  : T extends string
  ? "string"
  : never;
```

上面示例是一个多重判断，返回一个字符串的值类型，对应当前类型。下面是它的用法。

```tsx
type LiteralTypeName<T> = T extends undefined
  ? "undefined"
  : T extends null
  ? "null"
  : T extends boolean
  ? "boolean"
  : T extends number
  ? "number"
  : T extends bigint
  ? "bigint"
  : T extends string
  ? "string"
  : never;

// 以上类型的用法

// "bigint"
type Result1 = LiteralTypeName<123n>;

// "string" | "number" | "boolean"
type Result2 = LiteralTypeName<true | 1 | "a">;
```

### 6、infer 关键字



`infer`关键字用来定义泛型里面推断出来的类型参数，而不是外部传入的类型参数。

它通常跟条件运算符一起使用，用在`extends`关键字后面的父类型之中。

```tsx
type Foo<Type> = Type extends Array<infer Item> ? Item : Type;

// infer Item 表示 Item 这个参数是 TypeScript 自己推断出来的，不用显式传入，Foo<Type> 则表示 Type 这个类型参数是外部传入的
// Type extends Array<infer Item> 则表示，如果参数 Type 是一个数组，那么就将该数组的成员类型推断为 Item，即 Item 是从 Type 推断出来的
```

一旦使用`Infer Item`定义了`Item`，后面的代码就可以直接调用`Item`了。下面是上例的泛型`Foo<Type>`的用法。

```tsx
type Foo<Type> = Type extends Array<infer Item> ? Item : Type;

// 以下是 泛型 Foo<Type> 的用法

// string
type Str = Foo<string[]>;

// number
type Num = Foo<number>;

// 第一个例子 Foo<string[]> 传入的类型参数是 string[]，可以推断出 Item 的类型是 string，所以返回的是 string
// 第二个例子 Foo<number> 传入的类型参数是 number，它不是数组，所以直接返回自身
```

如果不用`infer`定义类型参数，那么就要传入两个类型参数。

```tsx
type Foo<Type, Item> = Type extends Array<Item> ? Item : Type;

// 上面是不使用 infer 的写法，每次调用 Foo 的时候，都要传入两个参数，就比较麻烦
```

下面的例子使用`infer`，推断函数的参数类型和返回值类型。

```tsx
type ReturnPromise<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : T;

// 如果 T 是函数，就返回这个函数的 Promise 版本，否则原样返回
// infer A 表示该函数的参数类型为 A，infer R 表示该函数的返回值类型为 R
```

如果不使用`infer`，就不得不把`ReturnPromise<T>`写成`ReturnPromise<T, A, R>`，这样就很麻烦，相当于开发者必须人肉推断编译器可以完成的工作。

> 下面是`infer`提取对象指定属性的例子。

```tsx
type MyType<T> = T extends {
  a: infer M;
  b: infer N;
}
  ? [M, N]
  : never;

// 用法示例
type T = MyType<{ a: string; b: number }>;
// [string, number]

// infer 提取了参数对象的属性 a 和 属性 b 的类型
```

下面是`infer`通过正则匹配提取类型参数的例子。

```tsx
type Str = "foo-bar";

type Bar = Str extends `foo-${infer rest}` ? rest : never; // 'bar'

// rest 是从模板字符串提取的类型参数
```

### 7、is 运算符



函数返回布尔值的时候，可以使用`is`运算符，限定返回值与参数之间的关系。

`is`运算符用来描述返回值属于`true`还是`false`。

```tsx
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// 函数 isFish() 的返回值类型为 pet is Fish ，表示如果参数 pet 类型为 Fish，则返回 true，否则返回 false。
```

`is`运算符总是用于描述函数的返回值类型，写法采用`parameterName is Type`的形式，即左侧为当前函数的参数名，右侧为某一种类型。它返回一个布尔值，表示左侧参数是否属于右侧的类型。

```tsx
type A = { a: string };
type B = { b: string };

function isTypeA(x: A | B): x is A {
  if ("a" in x) return true;
  return false;
}

// 返回值类型 x is A 可以准确描述函数体内部的运算逻辑
```

`is`运算符可以用于类型保护。

```tsx
function isCat(a: any): a is Cat {
  return a.name === "kitty";
}

let x: Cat | Dog;

if (isCat(x)) {
  x.meow(); // 正确，因为 x 肯定是 Cat 类型
}

// 函数 isCat() 的返回类型是 a is Cat ，它是一个布尔值。
// 后面的 if 语句就用这个返回值进行判断，从而起到类型保护的作用，确保 x 是 Cat 类型，从而 x.meow() 不会报错（假定 Cat 类型拥有 meow() 方法）
```

`is`运算符还有一种特殊用法，就是用在类（class）的内部，描述类的方法的返回值。

```tsx
class Teacher {
  isStudent(): this is Student {
    return false;
  }
}

class Student {
  isStudent(): this is Student {
    return true;
  }
}

// isStudent() 方法的返回值类型，取决于该方法内部的 this 是否为 Student 对象
// 如果是的，就返回布尔值 true ，否则返回 false
```

注：

`this is T`这种写法，只能用来描述方法的返回值类型，而不能用来描述属性的类型。

### 8、模板字符串



TypeScript 允许使用模板字符串，构建类型。

模板字符串的最大特点，就是内部可以引用其他类型。

```tsx
type World = "world";

// "hello world"
type Greeting = `hello ${World}`;

// 类型 Greeting 是一个模板字符串，里面引用了另一个字符串类型 world
// 因此 Greeting 实际上是字符串 hello world
```

注意，模板字符串可以引用的类型一共 6 种，分别是 string、number、bigint、boolean、null、undefined。引用这 6 种以外的类型会报错。

```tsx
type Num = 123;
type Obj = { n: 123 };

type T1 = `${Num} received`; // 正确
type T2 = `${Obj} received`; // 报错

// 模板字符串引用数值类型的别名 Num 是可以的，但是引用对象类型的别名 Obj 就会报错
```

模板字符串里面引用的类型，如果是一个联合类型，那么它返回的也是一个联合类型，即模板字符串可以展开联合类型。

```tsx
type T = "A" | "B";

// "A_id"|"B_id"
type U = `${T}_id`;

// 类型 U 是一个模板字符串，里面引用了一个联合类型 T ，导致最后得到的也是一个联合类型
```

如果模板字符串引用两个联合类型，它会交叉展开这两个类型。

```tsx
type T = "A" | "B";

type U = "1" | "2";

// 'A1'|'A2'|'B1'|'B2'
type V = `${T}${U}`;

//  T 和 U 都是联合类型，各自有两个成员，模板字符串里面引用了这两个类型，最后得到的就是一个 4 个成员的联合类型。
```

### 9、satisfies 运算符



`satisfies`运算符用来检测某个值是否符合指定类型。

有时候，不方便将某个值指定为某种类型，但是希望这个值符合类型条件，这时候就可以用`satisfies`运算符对其进行检测。[TypeScript 4.9 (opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)添加了这个运算符。

举例来说，有一个对象的属性名拼写错误。

```tsx
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255], // 属性名拼写错误
};
```

上面示例中，对象`palette`的属性名拼写错了，将`blue`拼成了`bleu`，我们希望通过指定类型，发现这个错误。

```tsx
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255], // 报错
};

// 变量 palette 的类型被指定为 Record<Colors, string|RGB> ，这是一个类型工具，用来返回一个对象，详细介绍见《类型工具》一章
// 简单说，它的第一个类型参数指定对象的属性名，第二个类型参数指定对象的属性值。
```

本例的`Record<Colors, string|RGB>`，就表示变量`palette`的属性名应该符合类型`Colors`，属性值应该符合类型`string|RGB`，要么是字符串，要么是元组`RGB`。属性名`bleu`不符合类型`Colors`，所以就报错了。

> 这样的写法，虽然可以发现属性名的拼写错误，但是带来了新的问题。

```tsx
const greenComponent = palette.green.substring(1, 6); // 报错

// palette.green 属性调用 substring() 方法会报错
// 原因是这个方法只有字符串才有，而 palette.green 的类型是 srting | RGB ，除了字符串，还可能是元组 RGB ，而元组并不存在 substring() 方法，所以报错了
```

如果要避免报错，要么精确给出变量`palette`每个属性的类型，要么对`palette.green`的值进行类型缩小。两种做法都比较麻烦，也不是很有必要。

这时就可以使用`satisfies`运算符，对`palette`进行类型检测，但是不改变 TypeScript 对`palette`的类型推断。

```tsx
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255], // 报错
} satisfies Record<Colors, string | RGB>;

const greenComponent = palette.green.substring(1); // 不报错

// 变量 palette 的值后面增加了 satisfies Record<Colors, string|RGB> ，表示该值必须满足 Record<Colors, string|RGB> 这个条件，所以能够检测出属性名 bleu 的拼写错误。
// 同时，它不会改变 palette 的类型推断，所以，TypeScript 知道 palette.green 是一个字符串，对其调用 substring() 方法就不会报错。
```

`satisfies`也可以检测属性值。

```tsx
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0], // 报错
} satisfies Record<Colors, string | RGB>;

// 属性 blue 的值只有两个成员，不符合元组 RGB 必须有三个成员的条件，从而报错了
```

## 二、类型映射



映射（mapping）指的是，将一种类型按照映射规则，转换成另一种类型，通常用于对象类型。

> 举例来说，现有一个类型 A 和另一个类型 B。

```tsx
type A = {
  foo: number;
  bar: number;
};

type B = {
  foo: string;
  bar: string;
};

// 这两个类型的属性结构是一样的，但是属性的类型不一样
// 如果属性数量多的话，逐个写起来就很麻烦
```

### 1、类型映射语法



使用类型映射，就可以从类型`A`得到类型`B`

```tsx
type A = {
  foo: number;
  bar: number;
};

type B = {
  [prop in keyof A]: string;
};

// 类型 B 采用了属性名索引的写法，[prop in keyof A] 表示依次得到类型 A 的所有属性名，然后将每个属性的类型改成 string
```

注：

在语法上，`[prop in keyof A]`是一个属性名表达式，表示这里的属性名需要计算得到。具体的计算规则如下：

- `prop`：属性名变量，名字可以随便起。
- `in`：运算符，用来取出右侧的联合类型的每一个成员。
- `keyof A`：返回类型`A`的每一个属性名，组成一个联合类型

### 1.1、复制原始类型

```tsx
type A = {
  foo: number;
  bar: string;
};

type B = {
  [prop in keyof A]: A[prop];
};

// 类型 B 原样复制了类型 A
```

### 1.2、映射类型的泛型写法



为了增加代码复用性，可以把常用的映射写成泛型。

```tsx
type ToBoolean<Type> = {
  [Property in keyof Type]: boolean;
};

// 定义了一个泛型，可以将其他对象的所有属性值都改成 boolean 类型
```

### 1.3、实践应用

```tsx
type MyObj = {
  [P in 0 | 1 | 2]: string;
};

// 等同于
type MyObj = {
  0: string;
  1: string;
  2: string;
};

// 联合类型 0|1|2 映射成了三个属性名
```

不使用联合类型，直接使用某种具体类型进行属性名映射，也是可以的。

```tsx
type MyObj = {
  [p in "foo"]: number;
};

// 等同于
type MyObj = {
  foo: number;
};

// p in 'foo' 可以看成只有一个成员的联合类型，因此得到了只有这一个属性的对象类型
```

甚至还可以写成`p in string`

```tsx
type MyObj = {
  [p in string]: boolean;
};

// 等同于
type MyObj = {
  [p: string]: boolean;
};

// [p in string] 就是属性名索引形式 [p: string] 的映射写法
```

通过映射，可以把某个对象的所有属性改成可选属性。

```tsx
type A = {
  a: string;
  b: number;
};

type B = {
  [Prop in keyof A]?: A[Prop];
};

// 类型 B 在类型 A 的所有属性名后面添加问号，使得这些属性都变成了可选属性
```

> 事实上，TypeScript 的内置工具类型`Partial<T>`，就是这样实现的。

TypeScript 内置的工具类型`Readonly<T>`可以将所有属性改为只读属性，实现也是通过映射。

```tsx
// 将 T 的所有属性改为只读属性
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

具体用法

```tsx
type T = { a: string; b: number };

type ReadonlyT = Readonly<T>;
// {
//   readonly a: string;
//   readonly b: number;
// }
```

### 2、映射修饰符



映射会原样复制原始对象的可选属性和只读属性。

```tsx
type A = {
  a?: string;
  readonly b: number;
};

type B = {
  [Prop in keyof A]: A[Prop];
};

// 等同于
type B = {
  a?: string;
  readonly b: number;
};

// 类型 B 是类型 A 的映射，把 A 的可选属性和只读属性都保留下来
```

如果要删改可选和只读这两个特性，并不是很方便。为了解决这个问题，TypeScript 引入了两个映射修饰符，用来在映射时添加或移除某个属性的`?`修饰符和`readonly`修饰符。

- `+`修饰符：写成`+?`或`+readonly`，为映射属性添加`?`修饰符或`readonly`修饰符。
- `–`修饰符：写成`-?`或`-readonly`，为映射属性移除`?`修饰符或`readonly`修饰符。

> 以下是添加或移除可选属性的案例

```tsx
// 添加可选属性
type Optional<Type> = {
  [Prop in keyof Type]+?: Type[Prop];
};

// 移除可选属性
type Concrete<Type> = {
  [Prop in keyof Type]-?: Type[Prop];
};
```

注意：

`+?`或`-?`要写在属性名的后面

以下是添加或移除只读属性的案例

```tsx
// 添加 readonly
type CreateImmutable<Type> = {
  +readonly [Prop in keyof Type]: Type[Prop];
};

// 移除 readonly
type CreateMutable<Type> = {
  -readonly [Prop in keyof Type]: Type[Prop];
};
```

注意：

`+readonly`和`-readonly`要写在属性名的前面

如果同时增删`?`和`readonly`这两个修饰符，写成下面这样。

```tsx
// 增加
type MyObj<T> = {
  +readonly [P in keyof T]+?: T[P];
};

// 移除
type MyObj<T> = {
  -readonly [P in keyof T]-?: T[P];
};
```

TypeScript 原生的工具类型`Required<T>`专门移除可选属性，就是使用`-?`修饰符实现的。

注意：

`–?`修饰符移除了可选属性以后，该属性就不能等于`undefined`了，实际变成必选属性了。但是，这个修饰符不会移除`null`类型。

另外，`+?`修饰符可以简写成`?`，`+readonly`修饰符可以简写成`readonly`。

```tsx
type A<T> = {
  +readonly [P in keyof T]+?: T[P];
};

// 等同于
type A<T> = {
  readonly [P in keyof T]?: T[P];
};
```

### 3、键名重映射



TypeScript 4.1 引入了键名重映射（key remapping），允许改变键名

> 具体语法如下

```tsx
type A = {
  foo: number;
  bar: number;
};

type B = {
  [p in keyof A as `${p}ID`]: number;
};

// 等同于
type B = {
  fooID: number;
  barID: number;
};

// 类型 B 是类型 A 的映射，但在映射时把属性名改掉了，在原始属性名后面加上了字符串 ID
```

可以看到，键名重映射的语法是在键名映射的后面加上`as + 新类型`子句。这里的“新类型”通常是一个模板字符串，里面可以对原始键名进行各种操作。

```tsx
interface Person {
  name: string;
  age: number;
  location: string;
}

type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type LazyPerson = Getters<Person>;

// 等同于
type LazyPerson = {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
};

// 类型 LazyPerson 是类型 Person 的映射，并且把键名改掉了
```

注：

它的修改键名的代码是一个模板字符串`get${Capitalize<string & P>}`，下面是各个部分的解释。

- `get`：为键名添加的前缀。
- `Capitalize<T>`：一个原生的工具泛型，用来将`T`的首字母变成大写。
- `string & P`：一个交叉类型，其中的`P`是 keyof 运算符返回的键名联合类型`string|number|symbol`，但是`Capitalize<T>`只能接受字符串作为类型参数，因此`string & P`只返回`P`的字符串属性名。

### 3.1、属性过滤



键名重映射还可以过滤掉某些属性。下面的例子是只保留字符串属性。

```tsx
type User = {
  name: string;
  age: number;
};

type Filter<T> = {
  [K in keyof T as T[K] extends string ? K : never]: string;
};

type FilteredUser = Filter<User>; // { name: string }

// 映射 K in keyof T 获取类型T的每一个属性以后，然后使用 as Type 修改键名
```

注：

它的键名重映射`as T[K] extends string ? K : never]`，使用了条件运算符。如果属性值`T[K]`的类型是字符串，那么属性名不变，否则属性名类型改为`never`，即这个属性名不存在。

这样就等于过滤了不符合条件的属性，只保留属性值为字符串的属性。

### 3.2、联合类型的映射



由于键名重映射可以修改键名类型，所以原始键名的类型不必是`string|number|symbol`，任意的联合类型都可以用来进行键名重映射。

```tsx
type S = {
  kind: "square";
  x: number;
  y: number;
};

type C = {
  kind: "circle";
  radius: number;
};

type MyEvents<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type Config = MyEvents<S | C>;

// 等同于
type Config = {
  square: (event: S) => void;
  circle: (event: C) => void;
};

// 原始键名的映射是 E in Events，这里的 Events 是两个对象组成的联合类型 S|C
// 所以，E 是一个对象，然后再通过键名重映射，得到字符串键名 E['kind']
```

## 三、TypeScript 类型工具



TypeScript 提供了一些内置的类型工具，用来方便地处理各种类型，以及生成新的类型。

> 以下是常用的类型工具

### 1、`Awaited<Type>`



`Awaited<Type>`用来取出 Promise 的返回值类型，适合用在描述`then()`方法和 await 命令的参数类型。

```tsx
type A = Awaited<Promise<string>>; // string

// Awaited<Type> 会返回 Promise 的返回值类型（string）
```

它也可以返回多重 Promise 的返回值类型

```tsx
type B = Awaited<Promise<Promise<number>>>; // number
```

如果它的类型参数不是 Promise 类型，那么就会原样返回。

```tsx
type C = Awaited<boolean | Promise<number>>; // number | boolean

// 类型参数是一个联合类型，其中的 boolean 会原样返回，所以最终返回的是 number|boolean
```

`Awaited<Type>`的实现如下

```tsx
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
```

### 2、`ConstructorParameters<Type>`



`ConstructorParameters<Type>`提取构造方法`Type`的参数类型，组成一个元组类型返回

```tsx
type T1 = ConstructorParameters<new (x: string, y: number) => object>; // [x: string, y: number]

type T2 = ConstructorParameters<new (x?: string) => object>; // [x?: string | undefined]
```

它可以返回一些内置构造方法的参数类型。

```tsx
type T1 = ConstructorParameters<ErrorConstructor>; // [message?: string]

type T2 = ConstructorParameters<FunctionConstructor>; // string[]

type T3 = ConstructorParameters<RegExpConstructor>; // [pattern:string|RegExp, flags?:string]
```

如果参数类型不是构造方法，就会报错。

```tsx
type T1 = ConstructorParameters<string>; // 报错

type T2 = ConstructorParameters<Function>; // 报错
```

`any`类型和`never`类型是两个特殊值，分别返回`unknown[]`和`never`。

```tsx
type T1 = ConstructorParameters<any>; // unknown[]

type T2 = ConstructorParameters<never>; // never
```

`ConstructorParameters<Type>`的实现如下

```tsx
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

### 3、`Exclude<UnionType, ExcludedMembers>`



`Exclude<UnionType, ExcludedMembers>`用来从联合类型`UnionType`里面，删除某些类型`ExcludedMembers`，组成一个新的类型返回。

```tsx
type T1 = Exclude<"a" | "b" | "c", "a">; // 'b'|'c'
type T2 = Exclude<"a" | "b" | "c", "a" | "b">; // 'c'
type T3 = Exclude<string | (() => void), Function>; // string
type T4 = Exclude<string | string[], any[]>; // string
type T5 = Exclude<(() => void) | null, Function>; // null
type T6 = Exclude<200 | 500, 200 | 201>; // 500
type T7 = Exclude<number, boolean>; // number
```

`Exclude<UnionType, ExcludedMembers>`的实现如下

```tsx
type Exclude<T, U> = T extends U ? never : T;
```

注：

上面代码中，等号右边的部分，表示先判断`T`是否兼容`U`，如果是的就返回`never`类型，否则返回当前类型`T`。

由于`never`类型是任何其他类型的子类型，它跟其他类型组成联合类型时，可以直接将`never`类型从联合类型中“消掉”，因此`Exclude<T, U>`就相当于删除兼容的类型，剩下不兼容的类型。

### 4、`Extract<Type, Union>`



`Extract<UnionType, Union>`用来从联合类型`UnionType`之中，提取指定类型`Union`，组成一个新类型返回。它与`Exclude<T, U>`正好相反。

```tsx
type T1 = Extract<"a" | "b" | "c", "a">; // 'a'
type T2 = Extract<"a" | "b" | "c", "a" | "b">; // 'a'|'b'
type T3 = Extract<"a" | "b" | "c", "a" | "d">; // 'a'
type T4 = Extract<string | string[], any[]>; // string[]
type T5 = Extract<(() => void) | null, Function>; // () => void
type T6 = Extract<200 | 500, 200 | 201>; // 200
```

如果参数类型`Union`不包含在联合类型`UnionType`之中，则返回`never`类型。

```tsx
type T = Extract<string | number, boolean>; // never
```

`Extract<UnionType, Union>`的实现如下

```tsx
type Extract<T, U> = T extends U ? T : never;
```

### 5、`InstanceType<Type>`



```
InstanceType<Type>`提取构造函数的返回值的类型（即实例类型），参数`Type`是一个构造函数，等同于构造函数的`ReturnType<Type>
type T = InstanceType<new () => object>; // object

// 类型参数是一个构造函数 new () => object，返回值是该构造函数的实例类型（object）
```

以下案例

```tsx
type A = InstanceType<ErrorConstructor>; // Error
type B = InstanceType<FunctionConstructor>; // Function
type C = InstanceType<RegExpConstructor>; // RegExp

// InstanceType<T> 的参数都是 TypeScript 内置的原生对象的构造函数类型
// InstanceType<T> 的返回值就是这些构造函数的实例类型
```

由于 Class 作为类型，代表实例类型。要获取它的构造方法，必须把它当成值，然后用`typeof`运算符获取它的构造方法类型。

```tsx
class C {
  x = 1;
  y = 2;
}

type T = InstanceType<typeof C>; // C

// typeof C 是 C 的构造方法类型，然后 InstanceType 就能获得实例类型，即 C 本身
```

如果类型参数不是构造方法，就会报错。

```tsx
type T1 = InstanceType<string>; // 报错

type T2 = InstanceType<Function>; // 报错
```

如果类型参数是`any`或`never`两个特殊值，分别返回`any`和`never`。

```tsx
type T1 = InstanceType<any>; // any

type T2 = InstanceType<never>; // never
```

`InstanceType<Type>`的实现如下

```tsx
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

### 6、`NonNullable<Type>`



`NonNullable<Type>`用来从联合类型`Type`删除`null`类型和`undefined`类型，组成一个新类型返回，也就是返回`Type`的非空类型版本。

```tsx
// string|number
type T1 = NonNullable<string | number | undefined>;

// string[]
type T2 = NonNullable<string[] | null | undefined>;

type T3 = NonNullable<boolean>; // boolean
type T4 = NonNullable<number | null>; // number
type T5 = NonNullable<string | undefined>; // string
type T6 = NonNullable<null | undefined>; // never
```

`NonNullable<Type>`的实现如下

```tsx
type NonNullable<T> = T & {};

// T & {} 等同于求 T & Object 的交叉类型
// 由于 TypeScript 的非空值都属于 Object 的子类型，所以会返回自身
// 而 null 和 undefined 不属于Object，会返回 never 类型
```

### 7、`Omit<Type, Keys>`



`Omit<Type, Keys>`用来从对象类型`Type`中，删除指定的属性`Keys`，组成一个新的对象类型返回。

```tsx
interface A {
  x: number;
  y: number;
}

type T1 = Omit<A, "x">; // { y: number }
type T2 = Omit<A, "y">; // { x: number }
type T3 = Omit<A, "x" | "y">; // { }

// Omit<Type, Keys> 从对象类型A里面删除指定属性，返回剩下的属性
```

指定删除的键名`Keys`可以是对象类型`Type`中不存在的属性，但必须兼容`string|number|symbol`

```tsx
interface A {
  x: number;
  y: number;
}

type T = Omit<A, "z">; // { x: number; y: number }

// 对象类型 A 中不存在属性 z，所以就原样返回了
```

`Omit<Type, Keys>`的实现如下

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 8、`OmitThisParameter<Type>`



`OmitThisParameter<Type>`从函数类型中移除 this 参数

```tsx
function toHex(this: Number) {
  return this.toString(16);
}

type T = OmitThisParameter<typeof toHex>; // () => string

// OmitThisParameter<T> 给出了函数 toHex() 的类型，并将其中的 this 参数删除
```

如果函数没有 this 参数，则返回原始函数类型

> `OmitThisParameter<Type>`的实现如下

```tsx
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
```

### 9、`Parameters<Type>`



`Parameters<Type>`从函数类型`Type`里面提取参数类型，组成一个元组返回

```tsx
type T1 = Parameters<() => string>; // []

type T2 = Parameters<(s: string) => void>; // [s:string]

type T3 = Parameters<<T>(arg: T) => T>; // [arg: unknown]

type T4 = Parameters<(x: { a: number; b: string }) => void>; // [x: { a: number, b: string }]

type T5 = Parameters<(a: number, b: number) => number>; // [a:number, b:number]

// Parameters<Type> 的返回值会包括函数的参数名，这一点需要注意
```

如果参数类型`Type`不是带有参数的函数形式，会报错

```tsx
// 报错
type T1 = Parameters<string>;

// 报错
type T2 = Parameters<Function>;
```

由于`any`和`never`是两个特殊值，会返回`unknown[]`和`never`

```tsx
type T1 = Parameters<any>; // unknown[]

type T2 = Parameters<never>; // never
```

`Parameters<Type>`主要用于从外部模块提供的函数类型中，获取参数类型

```tsx
interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  // ...
  return {
    name: { first: "icoding", last: "ibc" },
    gift: "艾编程",
  };
}
```

以上代码中，模块只输出了函数 `getGift()`，没有输出参数 `SecretName` 和 返回值 `SecretSanta`。这时就可以通过 `Parameters<T>` 和 `ReturnType<T>` 拿到这两个接口类型

```tsx
interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  // ...
  return {
    name: { first: "icoding", last: "ibc" },
    gift: "艾编程",
  };
}

// 从外部模块提供的函数类型中，获取参数类型

type ParaT = Parameters<typeof getGift>[0]; // SecretName

type ReturnT = ReturnType<typeof getGift>; // SecretSanta
```

`Parameters<Type>`的实现如下

```tsx
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

### 10、`Partial<Type>`



`Partial<Type>`返回一个新类型，将参数类型`Type`的所有属性变为可选属性

```tsx
interface A {
  x: number;
  y: number;
}

type T = Partial<A>; // { x?: number; y?: number; }
```

`Partial<Type>`的实现如下

```tsx
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### 11、`Pick<Type, Keys>`



`Pick<Type, Keys>`返回一个新的对象类型，第一个参数`Type`是一个对象类型，第二个参数`Keys`是`Type`里面被选定的键名。

```tsx
interface A {
  x: number;
  y: number;
}

type T1 = Pick<A, "x">; // { x: number }
type T2 = Pick<A, "y">; // { y: number }
type T3 = Pick<A, "x" | "y">; // { x: number; y: number }

// Pick<Type, Keys> 会从对象类型A里面挑出指定的键名，组成一个新的对象类型
```

指定的键名`Keys`必须是对象键名`Type`里面已经存在的键名，否则会报错。

```tsx
interface A {
  x: number;
  y: number;
}

type T = Pick<A, "z">; // 报错

// 对象类型 A 不存在键名 z，所以报错了
```

`Pick<Type, Keys>`的实现如下

```tsx
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### 12、`Readonly<Type>`



`Readonly<Type>`返回一个新类型，将参数类型`Type`的所有属性变为只读属性

```tsx
interface A {
  x: number;
  y?: number;
}

// { readonly x: number; readonly y?: number; }
type T = Readonly<A>;

// y 是可选属性，Readonly<Type> 不会改变这一点，只会让 y 变成只读
```

`Readonly<Type>`的实现如下

```tsx
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

我们可以自定义类型工具`Mutable<Type>`，将参数类型的所有属性变成可变属性

```tsx
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// -readonly 表示去除属性的只读标志
```

相应地，`+readonly`就表示增加只读标志，等同于`readonly`。因此，`ReadOnly<Type>`的实现也可以写成下面这样。

```tsx
type Readonly<T> = {
  +readonly [P in keyof T]: T[P];
};
```

`Readonly<Type>`可以与`Partial<Type>`结合使用，将所有属性变成只读的可选属性。

```tsx
interface Person {
  name: string;
  age: number;
}

const worker: Readonly<Partial<Person>> = { name: "张三" };

worker.name = "李四"; // 报错
```

### 13、`Record<Keys, Type>`



`Record<Keys, Type>`返回一个对象类型，参数`Keys`用作键名，参数`Type`用作键值类型

```tsx
// { a: number }
type T = Record<"a", number>;

// Record<Keys, Type> 的第一个参数 a，用作对象的键名，第二个参数 number 是 a 的键值类型
```

参数`Keys`可以是联合类型，这时会依次展开为多个键

```tsx
// { a: number, b: number }
type T = Record<"a" | "b", number>;

// 第一个参数是联合类型 'a'|'b'，展开成两个键名 a 和 b
```

如果参数`Type`是联合类型，就表明键值是联合类型

```tsx
// { a: number|string }
type T = Record<"a", number | string>;

// 参数 Keys 的类型必须兼容 string|number|symbol ，否则不能用作键名，会报错
```

`Record<Keys, Type>`的实现如下

```tsx
type Record<K extends string | number | symbol, T> = { [P in K]: T };
```

### 14、`Required<Type>`



`Required<Type>`返回一个新类型，将参数类型`Type`的所有属性变为必选属性。它与`Partial<Type>`的作用正好相反。

```tsx
interface A {
  x?: number;
  y: number;
}

type T = Required<A>; // { x: number; y: number; }
```

`Required<Type>`的实现如下

```tsx
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 符号 -? 表示去除可选属性的 “问号”，使其变成必选属性
```

相对应地，符号`+?`表示增加可选属性的“问号”，等同于`?`。因此，前面的`Partial<Type>`的定义也可以写成下面这样。

```tsx
type Partial<T> = {
  [P in keyof T]+?: T[P];
};
```

### 15、`ReadonlyArray<Type>`



`ReadonlyArray<Type>`用来生成一个只读数组类型，类型参数`Type`表示数组成员的类型。

```tsx
const values: ReadonlyArray<string> = ["a", "b", "c"];

values[0] = "x"; // 报错
values.push("x"); // 报错
values.pop(); // 报错
values.splice(1, 1); // 报错

// 变量 values 的类型是一个只读数组，所以修改成员会报错，并且那些会修改源数组的方法 push()、pop()、splice() 等都不存在
```

`ReadonlyArray<Type>`的实现如下

```tsx
interface ReadonlyArray<T> {
  readonly length: number;

  readonly [n: number]: T;

  // ...
}
```

### 16、`ReturnType<Type>`



`ReturnType<Type>`提取函数类型`Type`的返回值类型，作为一个新类型返回。

```tsx
type T1 = ReturnType<() => string>; // string

type T2 = ReturnType<
  () => {
    a: string;
    b: number;
  }
>; // { a: string; b: number }

type T3 = ReturnType<(s: string) => void>; // void

type T4 = ReturnType<() => () => any[]>; // () => any[]

type T5 = ReturnType<typeof Math.random>; // number

type T6 = ReturnType<typeof Array.isArray>; // boolean
```

如果参数类型是泛型函数，返回值取决于泛型类型。如果泛型不带有限制条件，就会返回`unknown`。

```tsx
type T1 = ReturnType<<T>() => T>; // unknown

type T2 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
```

如果类型不是函数，会报错

```tsx
type T1 = ReturnType<boolean>; // 报错

type T2 = ReturnType<Function>; // 报错
```

any 和 never 是两个特殊值，分别返回 any 和 never

```tsx
type T1 = ReturnType<any>; // any

type T2 = ReturnType<never>; // never
```

`ReturnType<Type>`的实现如下

```tsx
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

### 17、`ThisParameterType<Type>`



`ThisParameterType<Type>`提取函数类型中`this`参数的类型。

```tsx
function toHex(this: Number) {
  return this.toString(16);
}

type T = ThisParameterType<typeof toHex>; // number
```

如果函数没有`this`参数，则返回`unknown`

> `ThisParameterType<Type>`的实现如下

```tsx
type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown;
```

### 18、`ThisType<Type>`



`ThisType<Type>`不返回类型，只用来跟其他类型组成交叉类型，用来提示 TypeScript 其他类型里面的`this`的类型。

```tsx
interface HelperThisValue {
  logError: (error: string) => void;
}

let helperFunctions: { [name: string]: Function } & ThisType<HelperThisValue> =
  {
    hello: function () {
      this.logError("Error: Something wrong!"); // 正确
      this.update(); // 报错
    },
  };

// 变量 helperFunctions 的类型是一个正常的对象类型与 ThisType<HelperThisValue> 组成的交叉类型
```

这里的`ThisType`的作用是提示 TypeScript，变量`helperFunctions`的`this`应该满足`HelperThisValue`的条件。所以，`this.logError()`可以正确调用，而`this.update()`会报错，因为`HelperThisValue`里面没有这个方法。

注意，使用这个类型工具时，必须打开`noImplicitThis`设置。

> 下面是另一个例子

```tsx
let obj: ThisType<{ x: number }> & { getX: () => number };

obj = {
  getX() {
    return this.x + this.y; // 报错
  },
};

// getX() 里面的 this.y 会报错，因为根据 ThisType<{ x: number }>，这个对象的 this 不包含属性 y
```

`ThisType<Type>`的实现就是一个空接口

```tsx
interface ThisType<T> {}
```

### 19、字符串类型工具



TypeScript 内置了四个字符串类型工具，专门用来操作字符串类型。这四个工具类型都定义在 TypeScript 自带的`.d.ts`文件里面。

它们的实现都是在底层调用 JavaScript 引擎提供 JavaScript 字符操作方法。

### 19.1、`Uppercase<StringType>`



`Uppercase<StringType>`将字符串类型的每个字符转为大写

```tsx
type A = "icoding";

// "ICODING"
type B = Uppercase<A>;

// Uppercase<T> 将 icoding 转为 ICODING
```

### 19.2、`Lowercase<StringType>`



`Lowercase<StringType>`将字符串的每个字符转为小写

```tsx
type A = "ICODING";

// "icoding"
type B = Lowercase<A>;

// Lowercase<T> 将 ICODING 转为 icoding
```

### 19.3、`Capitalize<StringType>`



`Capitalize<StringType>`将字符串的第一个字符转为大写

```tsx
type A = "icoding";

// "Icoding"
type B = Capitalize<A>;

// Capitalize<T> 将 icoding 转为 Icoding
```

### 19.4、`Uncapitalize<StringType>`



`Uncapitalize<StringType>` 将字符串的第一个字符转为小写

```tsx
type A = "ICODING";

// "iCODING"
type B = Uncapitalize<A>;

// Uncapitalize<T> 将 ICODING 转为 iCODING
```
