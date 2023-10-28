---
title: TS 模块，namespace 命名空间，declare 关键字
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TS 模块，namespace 命名空间，declare 关键字

TIP

从本节开始学习 TypeScript 的模块，常用的两种方案：一种是 ES6 的模块，一种是 CommonJS 的模块。

- 什么是模块
- import type 语句
- importsNotUsedAsValues 编译设置
- CommonJS 模块
- 模块定位
- namespace 命名空间

## 一、模块

TIP

任何包含 import 或 export 语句的文件，就是一个模块（module）。相应地，如果文件不包含 export 语句，就是一个全局的脚本文件。

模块本身就是一个作用域，不属于全局作用域。模块内部的变量、函数、类只在内部可见，对于模块外部是不可见的。暴露给外部的接口，必须用 export 命令声明；如果其他文件要使用模块的接口，必须用 import 命令来输入。

如果一个文件不包含 export 语句，但是希望把它当作一个模块（即内部变量对外不可见），可以在脚本头部添加一行语句。

```tsx
export {};

// 这行语句不产生任何实际作用，但会让当前文件被当作模块处理，所有它的代码都变成了内部代码
```

TypeScript 模块除了支持所有 ES 模块的语法，特别之处在于允许输出和输入类型。

```tsx
export type Bool = true | false;

// 当前脚本输出一个类型别名 Bool 。这行语句把类型定义和接口输出写在一行，也可以写成两行。
```

在 `/src/a.ts` 模块中导出类型别名 `Bool`

```tsx
type Bool = true | false;

export { Bool };
```

在 `/src/b.ts` 中使用 import 语句，输入这个类型

```tsx
import { Bool } from "./a";

let foo: Bool = true;

// import 语句加载的是一个类型
// 注意，加载文件写成./a，没有写脚本文件的后缀名
// TypeScript 允许加载模块时，省略模块文件的后缀名，它会自动定位，将 ./a 定位到 ./a.ts
```

编译时，可以两个脚本同时编译。

```shell
tsc a.ts b.ts

# 或

tsc

# tsc 命令会将 a.ts 和 b.ts 分别编译成 a.js 和 b.js
```

也可以只编译`b.ts`，因为它是入口脚本，tsc 会自动编译它依赖的所有脚本。

```tsx
tsc .\src\b.ts

// tsc 命令发现 b.ts 依赖 a.ts，就会自动寻找 a.ts，也将其同时编译，因此编译产物还是 a.js 和 b.js 两个文件
```

### 1、import type 语句

TIP

import 在一条语句中，可以同时输入类型和正常接口。

在 `/src/a.ts` 中

```tsx
export interface A {
  foo: string;
}

export let a = 123;
```

在 `/src/b.ts` 中

```tsx
import { A, a } from "./a";
```

以上代码中，文件`a.ts`的 export 语句输出了一个类型`A`和一个正常接口`a`，另一个文件`b.ts`则在同一条语句中输入了类型和正常接口。

### 1.1、区分类型和正常接口

TIP

以上代码的方式很不利于区分类型和正常接口，容易造成混淆。为了解决这个问题，TypeScript 引入了两个解决方法。

- 第一个方法：在 import 语句输入的类型前面加上`type`关键字

在 `/src/b.ts` 中

```tsx
import { type A, a } from "./a";

// import 语句输入的类型 A 前面有 type 关键字，表示这是一个类型。
```

- 第二个方法：使用 import type 语句，这个语句只能输入类型，不能输入正常接口

```tsx
// 正确
import type { A } from "./a";

// 报错
import type { a } from "./a";

console.log(a); // 报错

// import type 输入类型 A 是正确的，但是输入正常接口 a 就会报错。
```

### 1.2、默认类型

import type 语句也可以输入默认类型

```tsx
import type DefaultType from "moduleA";
```

import type 在一个名称空间下，输入所有类型的写法如下

```tsx
import type * as TypeNS from "moduleA";
```

同样的，export 语句也有两种方法，表示输出的是类型

```tsx
type A = "a";
type B = "b";

// 方法一
export { type A, type B };

// 方法二
export type { A, B };

// 方法一：使用 type 关键字作为前缀，表示输出的是类型
// 方法二：使用 export type 语句，表示整行输出的都是类型
```

### 1.3、将类作为类型输出

TIP

以下是 `export type` 将一个类作为类型输出的应用

在 `/src/module.ts` 中

```tsx
class Point {
  x: number;
  y: number;
}

export type { Point };

// 以上代码中，由于使用了 export type 语句，输出的并不是 Point 这个类，而是 Point 代表的实例类型。输入时，只能作为类型输入。
```

在 `/src/index.ts` 中

```tsx
import type { Point } from "./module";

const p: Point = { x: 1, y: 2 };

// Point 只能作为类型输入，不能当作正常接口使用
```

### 2、importsNotUsedAsValues 编译设置

TIP

TypeScript 特有的输入类型（type）的 import 语句，编译成 JavaScript 时怎么处理呢 ？

> TypeScript 提供了`importsNotUsedAsValues`编译设置项，有三个可能的值。

- ①、`remove`：这是默认值，自动删除输入类型的 import 语句
- ②、`preserve`：保留输入类型的 import 语句
- ③、`error`：保留输入类型的 import 语句（与`preserve`相同），但是必须写成`import type`的形式，否则报错

下面是一个输入类型的 import 语句

```tsx
import { TypeA } from "./a";

// TypeA 是一个类型
```

- `remove`的编译结果会将该语句删掉
- `preserve`的编译结果会保留该语句，但会删掉其中涉及类型的部分

```tsx
import "./a";

// preserve 的编译结果，可以看到编译后的 import 语句不从 a.js 输入任何接口（包括类型）
// 但是会引发 a.js 的执行，因此会保留 a.js 里面的副作用
```

`error`的编译结果与`preserve`相同，但在编译过程中会报错，因为它要求输入类型的`import`语句必须写成`import type` 的形式。原始语句改成下面的形式，就不会报错。

```tsx
import type { TypeA } from "./a";
```

### 3、CommonJS 模块

TIP

CommonJS 是 Node.js 的专用模块格式，与 ES 模块格式不兼容。

### 3.1、import = 语句

TIP

TypeScript 使用`import =`语句输入 CommonJS 模块

```tsx
// 导入 node.js 的 fs 模块（提供文件操作相关的API）
import fs = require("fs");
// 导入 path 模块（处理文件路径）
import path = require("path");

// 将当前文件所在的目录和 a.ts 文件名拼接成完整的文件路径
// __dirname 代表的是当前文件所在的目录
const filePath = path.join(__dirname, "a.ts");
// 使用 fs.readFileSync方法读取 a.ts 文件的内容
// 并将其存储在 fileContent 变量中
// utf8 参数表示以 UTF-8 编码读取文件内容
const fileContent = fs.readFileSync(filePath, "utf8");

// 使用 console.log 将 fileContent 变量的值打印到控制台上
console.log(fileContent);

// 使用 import = 语句 和 require() 命令输入了一个 CommonJS 模块
// 模块本身的用法跟 Node.js 是一样的
```

@types/node 库

在 TypeScript 中使用 Node.js 的核心模块 和 第三方库时，需要用到 `@types/node` 库，否则会报错

- `@types/node` 是 TypeScript 的一个声明文件包，用于描述 Node.js 核心模块和常用的第三方库的类型信息。
- 这些声明文件增加了对 TypeScript 在 Node.js 环境下的支持，并提供了更好的类型安全和编辑器智能提醒。

```shell
# 在命令行终端安装 @types/node
npm i -D @types/node
```

除了使用`import =`语句，TypeScript 还允许使用`import * as [接口名] from "模块文件"`输入 CommonJS 模块。

```tsx
import * as fs from "fs";
// 等同于
import fs = require("fs");
```

### 3.2、export = 语句

TIP

TypeScript 使用`export =`语句，输出 CommonJS 模块的对象，等同于 CommonJS 的`module.exports`对象。

在 `/src/a.ts` 中

```shell
let obj = { foo: 123 };

export = obj;
```

`export =`语句输出的对象，只能使用`import =`语句加载。

在 `/src/b.ts` 中

```tsx
import obj = require("./a");

console.log(obj.foo); // 123
```

### 4、模块定位

TIP

模块定位（module resolution）指的是一种算法，用来确定 import 语句和 export 语句里面的模块文件位置。

```tsx
// 相对模块
import { TypeA } from "./a";

// 非相对模块
import * as $ from "jquery";

// TypeScript 怎么确定 ./a 或 jquery 到底是指哪一个模块，具体位置在哪里，用到的算法就叫做 “模块定位”
```

注：

编译参数`moduleResolution`，用来指定具体使用哪一种定位算法。常用的算法有两种：`Classic`和`Node`

如果没有指定`moduleResolution`，它的默认值与编译参数`module`有关。

`module`设为`commonjs`时（项目脚本采用 CommonJS 模块格式），`moduleResolution`的默认值为`Node`，即采用 Node.js 的模块定位算法。

> 其他情况下（`module`设为 es2015、 esnext、amd, system, umd 等等），就采用`Classic`定位算法。

### 4.1、相对模块

TIP

加载模块时，目标模块分为相对模块（relative import）和非相对模块两种（non-relative import）。

相对模块指的是路径以`/`、`./`、`../`开头的模块。下面 import 语句加载的模块，都是相对模块。

- `import Entry from "./components/Entry";`
- `import { DefaultHeaders } from "../constants/http";`
- `import "/mod";`

相对模块的定位，是根据当前脚本的位置进行计算的，一般用于保存在当前项目目录结构中的模块脚本。

### 4.2、非相对模块

TIP

非相对模块指的是不带有路径信息的模块。下面 import 语句加载的模块，都是非相对模块。

- `import * as $ from "jquery";`
- `import { Component } from "@angular/core";`

非相对模块的定位，是由`baseUrl`属性或模块映射而确定的，通常用于加载外部模块。

### 5、Classic 方法

TIP

Classic 方法以当前脚本的路径作为“基准路径”，计算相对模块的位置。

> 比如，脚本`a.ts`里面有一行代码`import { b } from "./b"`，那么 TypeScript 就会在`a.ts`所在的目录，查找`b.ts`和`b.d.ts`。

至于非相对模块，也是以当前脚本的路径作为起点，一层层查找上级目录。

> 比如，脚本`a.ts`里面有一行代码`import { b } from "b"`，那么就会依次在每一级上层目录里面，查找`b.ts`和`b.d.ts`。

### 6、Node 方法

TIP

Node 方法就是模拟 Node.js 的模块加载方法，也就是`require()`的实现方法。

相对模块依然是以当前脚本的路径作为“基准路径”。比如，脚本文件`a.ts`里面有一行代码`let x = require("./b");`，TypeScript 按照以下顺序查找。

- ①、当前目录是否包含`b.ts`、`b.tsx`、`b.d.ts`。如果不存在就执行下一步。
- ②、当前目录是否存在子目录`b`，该子目录里面的`package.json`文件是否有`types`字段指定了模块入口文件。如果不存在就执行下一步。
- ③、当前目录的子目录`b`是否包含`index.ts`、`index.tsx`、`index.d.ts`。如果不存在就报错。

非相对模块则是以当前脚本的路径作为起点，逐级向上层目录查找是否存在子目录`node_modules`。比如，脚本文件`a.js`有一行`let x = require("b");`，TypeScript 按照以下顺序进行查找。

- ①、当前目录的子目录`node_modules`是否包含`b.ts`、`b.tsx`、`b.d.ts`。
- ②、当前目录的子目录`node_modules`，是否存在文件`package.json`，该文件的`types`字段是否指定了入口文件，如果是的就加载该文件。
- ③、当前目录的子目录`node_modules`里面，是否包含子目录`@types`，在该目录中查找文件`b.d.ts`。
- ④、当前目录的子目录`node_modules`里面，是否包含子目录`b`，在该目录中查找`index.ts`、`index.tsx`、`index.d.ts`。
- ⑤、进入上一层目录，重复上面 4 步，直到找到为止。

### 7、路径映射

TIP

TypeScript 允许开发者在`tsconfig.json`文件里面，手动指定脚本模块的路径。

### 7.1、baseUrl

TIP

`baseUrl`字段可以手动指定脚本模块的基准目录

```json
{
  "compilerOptions": {
    "baseUrl": "."
  }
}

// baseUrl 是一个点，表示基准目录就是 tsconfig.json 所在的目录
```

### 7.2、paths

TIP

`paths`字段指定非相对路径的模块与实际脚本的映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery"]
    }
  }
}

// 加载模块 jquery 时，实际加载的脚本是 node_modules/jquery/dist/jquery，它的位置要根据 baseUrl 字段计算得到
```

注：

上例的`jquery`属性的值是一个数组，可以指定多个路径。如果第一个脚本路径不存在，那么就加载第二个路径，以此类推。

### 7.3、rootDirs

TIP

`rootDirs`字段指定模块定位时必须查找的其他目录

```tsx
{
  "compilerOptions": {
    "rootDirs": ["src/zh", "src/de", "src/#{locale}"]
  }
}

// rootDirs 指定了模块定位时，需要查找的不同的国际化目录
```

### 8、tsc 的`--traceResolution`参数

TIP

由于模块定位的过程很复杂，tsc 命令有一个`--traceResolution`参数，能够在编译时在命令行显示模块定位的每一步。

```shell
tsc --traceResolution

# traceResolution 会输出模块定位的判断过程
```

### 9、tsc 的`--noResolve`参数

TIP

tsc 命令的`--noResolve`参数，表示模块定位时，只考虑在命令行传入的模块

在 `index.ts` 中

```tsx
import * as A from "moduleA";
import * as B from "moduleB";
```

使用下面的命令进行编译

```shell
tsc app.ts moduleA.ts --noResolve
```

注：

上面命令使用`--noResolve`参数，因此可以定位到`moduleA.ts`，因为它从命令行传入了；无法定位到`moduleB`，因为它没有传入，因此会报错。

## 二、namespace 命名空间

TIP

namespace 是一种将相关代码组织在一起的方式，中文译为 **“命名空间”**。

它出现在 ES 模块诞生之前，作为 TypeScript 自己的模块格式而发明的。但是，自从有了 ES 模块，官方已经不推荐使用 namespace 了。

### 1、基础用法

TIP

namespace 用来建立一个容器，内部的所有变量和函数，都必须在这个容器里面使用。

```tsx
namespace Utils {
  function isString(value: any) {
    return typeof value === "string";
  }

  // 正确
  isString("yes");
}

Utils.isString("no"); // 报错

// 命名空间 Utils 里面定义了一个函数 isString()，它只能在 Utils 里面使用，如果用于外部就会报错
```

如果要在命名空间以外使用内部成员，就必须为该成员加上`export`前缀，表示对外输出该成员。

```tsx
namespace Message {
  export function log(msg: string) {
    console.log(msg);
  }
  export function error(msg: string) {
    console.error(msg);
  }
}

Message.log("记得叫我哈 ！");
Message.error("我错了 !");

// 只要加上 export 前缀，就可以在命名空间外部使用内部成员
```

编译出来的 JavaScript 代码如下

```js
"use strict";
var Message;
(function (Message) {
  function log(msg) {
    console.log(msg);
  }
  Message.log = log;
  function error(msg) {
    console.error(msg);
  }
  Message.error = error;
})(Message || (Message = {}));
Message.log("记得叫我哈 ！");
Message.error("我错了 !");

// 命名空间 Message 变成了 JavaScript 的一个对象，凡是 export 的内部成员，都成了该对象的属性
```

> 这就是说，namespace 会变成一个值，保留在编译后的代码中。这一点要小心，它不是纯的类型代码。

namespace 内部还可以使用`import`命令输入外部成员，相当于为外部成员起别名。当外部成员的名字比较长时，别名能够简化代码。

```tsx
namespace Utils {
  export function isString(value: any) {
    return typeof value === "string";
  }
}

namespace App {
  import isString = Utils.isString;

  isString("yes");
  // 等同于
  Utils.isString("yes");
}

// import 命令指定在命名空间 App 里面，外部成员 Utils.isString 的别名为 isString
```

`import`命令也可以在 namespace 外部，指定别名。

```tsx
// 形状
namespace Shapes {
  // 多边形
  export namespace Polygons {
    // 三角形
    export class Triangle {}
    // 正方形
    export class Square {}
  }
}

import polygons = Shapes.Polygons;

// 等同于 new Shapes.Polygons.Square()
let sq = new polygons.Square();

// import 命令在命名空间Shapes的外部，指定Shapes.Polygons 的别名为 polygons
```

namespace 可以嵌套

```tsx
namespace Utils {
  export namespace Message {
    export function log(msg: string) {
      console.log(msg);
    }
  }
}

Utils.Message.log("icoding"); // "icoding"

// 命名空间 Utils 内部还有一个命名空间 Message
// 注意，如果要在外部使用 Message，必须在它前面加上 export 命令
```

使用嵌套的命名空间，必须从最外层开始引用，比如`Utils.Message.log()`

namespace 不仅可以包含实义代码，还可以包括类型代码。

```tsx
namespace N {
  export interface MyInterface {}
  export class MyClass {}
}

// 命令空间 N 不仅对外输出类，还对外输出一个接口，它们都可以用作类型
```

namespace 与模块的作用是一致的，都是把相关代码组织在一起，对外输出接口。区别是一个文件只能有一个模块，但可以有多个 namespace。由于模块可以取代 namespace，而且是 JavaScript 的标准语法，还不需要编译转换，所以建议总是使用模块，替代 namespace。

如果 namespace 代码放在一个单独的文件里，那么引入这个文件需要使用三斜杠的语法。

```tsx
/// <reference path = "SomeFileName.ts" />
```

### 2、namespace 的输出

TIP

namespace 本身也可以使用`export`命令输出，供其他文件使用。

在 `/src/shapes.ts` 中

```tsx
export namespace Shapes {
  export class Triangle {
    // ...
  }
  export class Square {
    // ...
  }
}

// 是一个文件 shapes.ts，里面使用 export 命令，输出了一个命名空间 Shapes
```

其他脚本文件使用`import`命令，加载这个命名空间。

在 `/src/index.ts` 中

```tsx
// 写法一
import { Shapes } from "./shapes";
let t = new Shapes.Triangle();

// 写法二
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle();
```

不过，更好的方法还是建议使用模块，采用模块的输出和输入。

在 `/src/shapes.ts` 中

```tsx
export class Triangle {
  /* ... */
}
export class Square {
  /* ... */
}
```

在 `/src/shapeConsumer.ts` 中

```tsx
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```

> 使用模块的输出和输入，改写了前面的例子

### 3、namespace 的合并

TIP

多个同名的 namespace 会自动合并，这一点跟 interface 一样。

```tsx
namespace Animals {
  export class Cat {}
}
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Dog {}
}

// 等同于
namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }
  export class Cat {}
  export class Dog {}
}

// 这样做的目的是，如果同名的命名空间分布在不同的文件中，TypeScript 最终会将它们合并在一起。这样就比较方便扩展别人的代码。
```

合并命名空间时，命名空间中的非`export`的成员不会被合并，但是它们只能在各自的命名空间中使用。

```tsx
namespace N {
  const a = 0;

  export function foo() {
    console.log(a); // 正确
  }
}

namespace N {
  export function bar() {
    foo(); // 正确
    console.log(a); // 报错
  }
}

// 变量 a 是第一个名称空间 N 的非对外成员，它只在第一个名称空间可用
```

命名空间还可以跟同名函数合并，但是要求同名函数必须在命名空间之前声明。这样做是为了确保先创建出一个函数对象，然后同名的命名空间就相当于给这个函数对象添加额外的属性。

```tsx
function f() {
  return f.version;
}

namespace f {
  export const version = "1.0";
}

f(); // '1.0'
f.version; // '1.0'

// 函数 f() 与命名空间f合并，相当于命名空间为函数对象 f 添加属性
```

命名空间也能与同名 class 合并，同样要求 class 必须在命名空间之前声明，原因同上。

```tsx
class C {
  foo = 1;
}

namespace C {
  export const bar = 2;
}

C.bar; // 2

// 名称空间 C 为类 C 添加了一个静态属性 bar
```

命名空间还能与同名 Enum 合并。

```tsx
enum E {
  A,
  B,
  C,
}

namespace E {
  export function foo() {
    console.log(E.C);
  }
}

E.foo(); // 2

// 命名空间 E 为枚举 E 添加了一个 foo() 方法
```

注意，Enum 成员与命名空间导出成员不允许同名。

```tsx
enum E {
  A, // 报错
  B,
}

namespace E {
  export function A() {} // 报错
}

// 同名 Enum 与命名空间有同名成员，结果报错
```

## 三、declare 关键字

TIP

declare 关键字用来告诉编译器，某个类型是存在的，可以在当前文件中使用。

它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用`declare`关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。

> declare 关键字可以描述以下类型：

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

declare 关键字的重要特点是，它只是通知编译器某个类型是存在的，不用给出具体实现。比如，只描述函数的类型，不给出函数的实现，如果不使用`declare`，这是做不到的。

declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。另外，所有 declare 语句都不会出现在编译后的文件里面。

### 1、declare variable

TIP

declare 关键字可以给出外部变量的类型描述

举例来说，当前脚本使用了其他脚本定义的全局变量`x`

```tsx
x = 123; // 报错

// 变量 x 是其他脚本定义的，当前脚本不知道它的类型，编译器就会报错
```

这时使用 declare 命令给出它的类型，就不会报错了

```tsx
declare let x: number;
x = 1;
```

如果 declare 关键字没有给出变量的具体类型，那么变量类型就是`any`

```tsx
declare let x;
x = 1;

// 变量 x 的类型为 any
```

下面的例子是脚本使用浏览器全局对象`document`

```tsx
declare var document;
document.title = "Hello";

// declare 告诉编译器，变量 document 的类型是外部定义的（具体定义在 TypeScript 内置文件 lib.d.ts）
```

如果 TypeScript 没有找到`document`的外部定义，这里就会假定它的类型是`any`

注：

declare 关键字只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。

```tsx
// 报错
declare let x: number = 1;

// declare 设置了变量的初始值，结果就报错了
```

### 2、declare function

TIP

declare 关键字可以给出外部函数的类型描述。

```tsx
declare function sayHello(username: string): void;

sayHello("icoding");

// declare 命令给出了 sayHello() 的类型描述，因此可以直接使用它
```

注：

这种单独的函数类型声明语句，只能用于`declare`命令后面。

- 一方面，TypeScript 不支持单独的函数类型声明语句
- 另一方面，declare 关键字后面也不能带有函数的具体实现

```tsx
// 报错
function sayHello(username: string): void;
function sayHello(username) {
  return "你好，" + username;
}

// 单独写函数的类型声明就会报错
```

### 3、declare class

TIP

declare 给出 class 类型描述的写法如下

```tsx
declare class Animal {
  constructor(name: string);
  eat(): void;
  sleep(): void;
}
```

以下复杂的应用

```tsx
declare class C {
  // 静态成员
  public static s1(): string;
  private static s2: string;

  // 属性
  public a: number;
  private b: number;

  // 构造函数
  constructor(arg: number);

  // 方法
  m(x: number, y: number): number;

  // 存取器
  get c(): number;
  set c(value: number);

  // 索引签名
  [index: string]: any;
}

// 同样的，declare 后面不能给出 Class 的具体实现或初始值。
```

### 4、declare module，declare namespace

TIP

如果想把变量、函数、类组织在一起，可以将 declare 与 module 或 namespace 一起使用。

```tsx
declare namespace AnimalLib {
  class Animal {
    constructor(name: string);
    eat(): void;
    sleep(): void;
  }

  type Animals = "Fish" | "Dog";
}

// 或者
declare module AnimalLib {
  class Animal {
    constructor(name: string);
    eat(): void;
    sleep(): void;
  }

  type Animals = "Fish" | "Dog";
}

// 以上代码中，declare 关键字给出了 module 或 namespace 的类型描述
```

declare module 和 declare namespace 里面，加不加 export 关键字都可以。

```tsx
declare namespace Foo {
  export var a: boolean;
}

declare module "io" {
  export function readFile(filename: string): string;
}

// namespace 和 module 里面使用了 export 关键字
```

下面的例子是当前脚本使用了`myLib`这个外部库，它有方法`makeGreeting()`和 属性`numberOfGreetings`

```tsx
let result = myLib.makeGreeting("你好");
console.log("欢迎词：" + result);

let count = myLib.numberOfGreetings;
```

`myLib`的类型描述就可以这样写

```tsx
declare namespace myLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}
```

declare 关键字的另一个用途，是为外部模块添加属性和方法时，给出新增部分的类型描述。

```tsx
import { Foo as Bar } from "moduleA";

declare module "moduleA" {
  interface Bar extends Foo {
    custom: {
      prop1: string;
    };
  }
}

// 上面代码中，从模块 moduleA 导入了 Foo 接口，将其重命名为 Bar，并用 declare 关键字为 Bar 增加一个属性 custom
```

### 4.1、实践应用

TIP

以下案例中，一个项目有多个模块，可以在一个模块中，对另一个模块的接口进行类型扩展

在 `/src/a.ts` 中

```tsx
export interface A {
  x: number;
}
```

在 `/src/b.ts` 中

```tsx
import { A } from "./a";

declare module "./a" {
  interface A {
    y: number;
  }
}

const a: A = { x: 1, y: 2 };
```

- 脚本`a.ts`定义了一个接口`A`
- 脚本`b.ts`为这个接口添加了属性`y`
- `declare module './a' {}`表示对`a.ts`里面的模块，进行类型声明，而同名 interface 会自动合并，所以等同于扩展类型

注：

使用这种语法进行模块的类型扩展时，有两点需要注意：

- ①、`declare module NAME`语法里面的模块名`NAME`，跟 import 和 export 的模块名规则是一样的，且必须跟当前文件加载该模块的语句写法（上例`import { A } from './a'`）保持一致
- ②、不能创建新的顶层类型。也就是说，只能对`a.ts`模块中已经存在的类型进行扩展，不允许增加新的顶层类型，比如新定义一个接口`B`
- ③、不能对默认的`default`接口进行扩展，只能对 export 命令输出的命名接口进行扩充。这是因为在进行类型扩展时，需要依赖输出的接口名。

某些第三方模块，原始作者没有提供接口类型，这时可以在自己的脚本顶部加上下面一行命令。

```tsx
declare module "模块名";

// 例子
declare module "hot-new-module";

// 加上上面的命令以后，外部模块即使没有类型声明，也可以通过编译
// 但是，从该模块输入的所有接口都将为 any 类型
```

declare module 描述的模块名可以使用通配符

```tsx
declare module "my-plugin-*" {
  interface PluginOptions {
    enabled: boolean;
    priority: number;
  }

  function initialize(options: PluginOptions): void;
  export = initialize;
}

// 模块名 my-plugin-* 表示适配所有以 my-plugin- 开头的模块名（比如 my-plugin-logger ）
```

### 5、declare global

TIP

如果要为 JavaScript 引擎的原生对象添加属性和方法，可以使用`declare global {}`语法。

```tsx
export {};

declare global {
  interface String {
    toSmallString(): string;
  }
}

String.prototype.toSmallString = (): string => {
  // 具体实现
  return "";
};

// 为 JavaScript 原生的 String 对象添加了 toSmallString() 方法
// declare global 给出这个新增方法的类型描述
// 第一行的空导出语句export {}，作用是强制编译器将这个脚本当作模块处理。这是因为declare global必须用在模块里面
```

下面的示例是为 window 对象添加一个属性 `myAppConfig`

```tsx
export {};

declare global {
  interface window {
    myAppConfig: object;
  }
}

const config = window.myAppConfig; // 报错

// declare global 只能扩充现有对象的类型描述，不能增加新的顶层类型
```

### 7、declare enum

TIP

declare 关键字给出 enum 类型描述的例子如下，下面的写法都是允许的。

```tsx
declare enum E1 {
  A,
  B,
}

declare enum E2 {
  A = 0,
  B = 1,
}

declare const enum E3 {
  A,
  B,
}

declare const enum E4 {
  A = 0,
  B = 1,
}
```

### 8、declare module 用于类型声明文件

TIP

我们可以为每个模块脚本，定义一个`.d.ts`文件，把该脚本用到的类型定义都放在这个文件里面。

但是，更方便的做法是为整个项目，定义一个大的`.d.ts`文件，在这个文件里面使用`declare module`定义每个模块脚本的类型。

在 `node.d.ts` 中

```tsx
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}

// url 和 path 都是单独的模块脚本，但是它们的类型都定义在 node.d.ts 这个文件里面
```

> 使用时，自己的脚本使用三斜杠命令，加载这个类型声明文件

在 `/src/index.ts` 中

```tsx
/// <reference path="node.d.ts"/>
```

如果没有上面这一行命令，自己的脚本使用外部模块时，就需要在脚本里面使用 declare 命令单独给出外部模块的类型

## 四、d.ts 类型声明文件

TIP

单独使用的模块，一般会同时提供一个单独的类型声明文件（declaration file），把本模块的外部接口的所有类型都写在这个文件里面，便于模块使用者了解接口，也便于编译器检查使用者的用法是否正确。

### 1、什么是类型声明文件

TIP

类型声明文件里面只有类型代码，没有具体的代码实现。它的文件名一般为`[模块名].d.ts`的形式，其中的`d`表示 declaration（声明）。

> 举例来说，有一个模块的代码如下：

在 `/src/test.d.ts` 中

```tsx
const maxInterval = 123;

function getArrayLength(arr) {
  return arr.length;
}

module.exports = {
  getArrayLength,
  maxInterval,
};
```

它的类型声明文件可以写成下面这样

```tsx
export function getArrayLength(arr: any[]): number;
export const maxInterval: 123;
```

类型声明文件也可以使用`export =`命令，输出对外接口。下面是 moment 模块的类型声明文件的例子。

```tsx
declare module "moment" {
  function moment(): any;
  export = moment;
}

// 模块 moment 内部有一个函数 moment()，而 export = 表示 module.exports 输出的就是这个函数
```

除了使用`export =`，模块输出在类型声明文件中，也可以使用`export default`表示。

```tsx
// 模块输出
module.exports = 3.1415;

// 类型输出文件
// 写法一
declare const pi: number;
export default pi;

// 写法二
declare const pi: number;
export = pi;

// 模块输出的是一个整数，那么可以用 export default 或 export = 表示输出这个值
```

### 2、如何使用类型声明文件

TIP

下面是一个如何使用类型声明文件的简单例子，有一个类型声明文件`types.d.ts`

在 `/src/types.d.ts` 中

```tsx
export interface User {
  language?: string;
  username: string;
}
```

> 然后，就可以在 TypeScript 脚本里面导入该文件声明的类型

在 `/src/index.ts` 中

```tsx
import { User } from "./types";

export const character: User = {
  language: "Chinese",
  username: "icoding",
};
```

类型声明文件也可以包括在项目的 `tsconfig.json` 文件里面，这样的话，编译器打包项目时，会自动将类型声明文件加入编译，而不必在每个脚本里面加载类型声明文件。

> 比如，moment 模块的类型声明文件是`moment.d.ts`，使用 moment 模块的项目可以将其加入项目的 `tsconfig.json` 文件。

```json
{
  "compilerOptions": {},
  "files": ["src/index.ts", "typings/moment.d.ts"]
}
```

### 3、类型声明文件的来源

TIP

类型声明文件主要有以下三种来源：

- TypeScript 编译器自动生成
- TypeScript 内置类型文件
- 外部模块的类型声明文件，需要自己安装

### 3.1、自动生成

TIP

只要使用编译选项`declaration`，编译器就会在编译时自动生成单独的类型声明文件。

在`tsconfig.json`文件里面，打开这个选项

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

可以在命令行打开这个选项

```shell
$ tsc --declaration
```

### 3.2、内置声明文件

TIP

安装 TypeScript 语言时，会同时安装一些内置的类型声明文件，主要是内置的全局对象（JavaScript 语言接口和运行环境 API）的类型声明。

这些内置声明文件位于 TypeScript 语言安装目录的`lib`文件夹内，数量大概有几十个，下面是其中一些主要文件。

- lib.d.ts
- lib.dom.d.ts
- lib.es2015.d.ts
- lib.es2016.d.ts
- lib.es2017.d.ts
- lib.es2018.d.ts
- lib.es2019.d.ts
- lib.es2020.d.ts
- lib.es5.d.ts
- lib.es6.d.ts

这些内置声明文件的文件名统一为 `lib.[description].d.ts`的形式，其中`description`部分描述了文件内容。比如，`lib.dom.d.ts`这个文件就描述了 DOM 结构的类型。

如果开发者想了解全局对象的类型接口（比如 ES6 全局对象的类型），那么就可以去查看这些内置声明文件。

TypeScript 编译器会自动根据编译目标`target`的值，加载对应的内置声明文件，所以不需要特别的配置。但是，可以使用编译选项`lib`，指定加载哪些内置声明文件。

```json
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}

// lib 选项指定加载 dom 和 es2021 这两个内置类型声明文件
```

> 编译选项`noLib`会禁止加载任何内置声明文件。

### 3.3、外部类型声明文件

TIP

如果项目中使用了外部的某个第三方代码库，那么就需要这个库的类型声明文件。

> 这时又分成三种情况：

- ①、这个库自带了类型声明文件

一般来说，如果这个库的源码包含了`[vendor].d.ts`文件，那么就自带了类型声明文件。

其中的`vendor`表示这个库的名字，比如`moment`这个库就自带`moment.d.ts`。使用这个库可能需要单独加载它的类型声明文件。

- ②、这个库没有自带，但是可以找到社区制作的类型声明文件

第三方库如果没有提供类型声明文件，社区往往会提供。TypeScript 社区主要使用 [DefinitelyTyped 仓库 (opens new window)](https://github.com/DefinitelyTyped/DefinitelyTyped)，各种类型声明文件都会提交到那里，已经包含了几千个第三方库。

这些声明文件都会作为一个单独的库，发布到 npm 的`@types`名称空间之下。比如，jQuery 的类型声明文件就发布成`@types/jquery`这个库，使用时安装这个库就可以了。

```shell
npm i @types/jquery --save-dev
```

执行上面的命令，`@types/jquery`这个库就安装到项目的`node_modules/@types/jquery`目录，里面的`index.d.ts`文件就是 jQuery 的类型声明文件。如果类型声明文件不是`index.d.ts`，那么就需要在`package.json`的`types`或`typings`字段，指定类型声明文件的文件名。

TypeScript 会自动加载`node_modules/@types`目录下的模块，但可以使用编译选项`typeRoots`改变这种行为。

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}

// 以上配置信息表示，TypeScript 不再去 node_modules/@types 目录，而是去跟当前 tsconfig.json 同级的 typings 和 vendor/types 子目录，加载类型模块了
```

默认情况下，TypeScript 会自动加载`typeRoots`目录里的所有模块，编译选项`types`可以指定加载哪些模块。

```json
{
  "compilerOptions": {
    "types": ["jquery"]
  }
}
```

上面设置中，`types`属性是一个数组，成员是所要加载的类型模块，要加载几个模块，这个数组就有几个成员，每个类型模块在`typeRoots`目录下都有一个自己的子目录。这样的话，TypeScript 就会自动去`jquery`子目录，加载 jQuery 的类型声明文件。

- ③、找不到类型声明文件，需要自己写

有时实在没有第三方库的类型声明文件，又很难完整给出该库的类型描述，这时你可以告诉 TypeScript 相关对象的类型是`any`。比如，使用 jQuery 的脚本可以写成下面这样。

```tsx
declare var $: any;

// 或者
declare type JQuery = any;
declare var $: JQuery;

// jQuery 的 $ 对象是外部引入的，类型是 any，也就是 TypeScript 不用对它进行类型检查
```

也可以采用下面的写法，将整个外部模块的类型设为`any`

```tsx
declare module "模块名";
```

有了上面的命令，指定模块的所有接口都将视为`any`类型。

### 4、declare 关键字

TIP

类型声明文件只包含类型描述，不包含具体实现，所以非常适合使用 declare 语句来描述类型。declare 关键字的具体用法，详见《declare 关键字》部分，这里讲解如何在类型声明文件里面使用它。

类型声明文件里面，变量的类型描述必须使用`declare`命令，否则会报错，因为变量声明语句是值相关代码。

在 `types.d.ts` 中

```tsx
declare let foo: string;
```

interface 类型有没有`declare`都可以，因为 interface 是完全的类型代码。

```tsx
interface Foo {} // 正确
declare interface Foo {} // 正确
```

类型声明文件里面，顶层可以使用`export`命令，也可以不用，除非使用者脚本会显式使用`export`命令输入类型。

```tsx
export interface Data {
  version: string;
}
```

下面是类型声明文件的一些例子。先看 moment 模块的类型描述文件`moment.d.ts`。

```tsx
declare module "moment" {
  export interface Moment {
    format(format: string): string;

    add(amount: number, unit: "days" | "months" | "years"): Moment;

    subtract(amount: number, unit: "days" | "months" | "years"): Moment;
  }

  function moment(input?: string | Date): Moment;

  export default moment;
}

// 注意一下默认接口 moment() 的写法
```

D3 库的类型声明文件`D3.d.ts`

```tsx
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
    };
  }

  export interface Event {
    x: number;
    y: number;
  }

  export interface Base extends Selectors {
    event: Event;
  }
}

declare var d3: D3.Base;
```

### 5、模块发布

TIP

当前模块如果包含自己的类型声明文件，可以在 `package.json` 文件里面添加一个`types`字段或`typings`字段，指明类型声明文件的位置。

在 `package.json` 中

```json
{
  "name": "icoding-ts-course",
  "author": "Arry",
  "version": "1.0.0",
  "main": "./lib/main.js",
  "types": "./lib/main.d.ts"
}

// types 字段给出了类型声明文件的位置
```

注：

如果类型声明文件名为`index.d.ts`，且在项目的根目录中，那就不需要在`package.json`里面注明了。

有时，类型声明文件会单独发布成一个 npm 模块，这时用户就必须同时加载该模块。

```tsx
{
  "name": "icoding-ts-course",
  "author": "Arry",
  "version": "1.0.0",
  "main": "./lib/main.js",
  "types": "./lib/main.d.ts",
  "dependencies": {
    "browserify": "latest",
    "@types/browserify": "latest",
    "typescript": "next"
  }
}

// 是一个模块的 package.json 文件，该模块需要 browserify 模块
// 由于后者的类型声明文件是一个单独的模块 @types/browserify，所以还需要加载那个模块
```

### 6、三斜杠命令

TIP

如果类型声明文件的内容非常多，可以拆分成多个文件，然后入口文件使用三斜杠命令，加载其他拆分后的文件。如下在 `/src/` 目录下

- 入口文件是 `main.d.ts`
- 里面的接口定义在 `interfaces.d.ts`
- 函数定义在`functions.d.ts`

> 那么，`/src/main.d.ts`里面可以用三斜杠命令，加载后面两个文件

```tsx
/// <reference path="./interfaces.d.ts" />
/// <reference path="./functions.d.ts" />
```

三斜杠命令（`///`）是一个 TypeScript 编译器命令，用来指定编译器行为。它只能用在文件的头部，如果用在其他地方，会被当作普通的注释。

另外，若一个文件中使用了三斜线命令，那么在三斜线命令之前只允许使用单行注释、多行注释和其他三斜线命令，否则三斜杠命令也会被当作普通的注释。

> 除了拆分类型声明文件，三斜杠命令也可以用于普通脚本加载类型声明文件。

注：

三斜杠命令主要包含三个参数，代表三种不同的命令。

- path
- types
- lib

### 6.1、`/// <reference path="" />`

TIP

`/// <reference path="" />`是最常见的三斜杠命令，告诉编译器在编译时需要包括的文件，常用来声明当前脚本依赖的类型文件。

在 `/src/lib.ts` 中

```tsx
type Add = (x: number, y: number) => number;

const add: Add = (x, y) => x + y;
```

在 `/src/index.ts` 中

```tsx
/// <reference path="./lib.ts" />

let res = add(1, 2);

// 当前脚本依赖于./lib.ts，里面是 add() 的定义
// 编译当前脚本时，还会同时编译 ./lib.ts 编译产物会有两个 JS 文件，一个当前脚本，另一个就是 ./lib.js
```

下面的案例是当前脚本依赖于 Node.js 类型声明文件

```tsx
/// <reference path="../lib/node.d.ts"/>

import * as URL from "url";
let myUrl = URL.parse("https://www.arryblog.com");
```

编译器会在预处理阶段，找出所有三斜杠引用的文件，将其添加到编译列表中，然后一起编译。

`path`参数指定了所引入文件的路径。如果该路径是一个相对路径，则基于当前脚本的路径进行计算。

注：

> 使用该命令时，有以下两个注意事项：

- `path`参数必须指向一个存在的文件，若文件不存在会报错。
- `path`参数不允许指向当前文件。

默认情况下，每个三斜杠命令引入的脚本，都会编译成单独的 JS 文件。如果希望编译后只产出一个合并文件，可以使用编译选项`outFile`。但是，`outFile`编译选项不支持合并 CommonJS 模块和 ES 模块，只有当编译参数`module`的值设为 None、System 或 AMD 时，才能编译成一个文件。

> 如果打开了编译参数`noResolve`，则忽略三斜杠指令。将其当作一般的注释，原样保留在编译产物中。

### 6.2、`/// <reference types="" />`

TIP

types 参数用来告诉编译器当前脚本依赖某个 DefinitelyTyped 类型库，通常安装在`node_modules/@types`目录。

types 参数的值是类型库的名称，也就是安装到`node_modules/@types`目录中的子目录的名字。

```tsx
/// <reference types="node" />

// 这个三斜杠命令表示编译时添加 Node.js 的类型库，实际添加的脚本是 node_modules 目录里面的 @types/node/index.d.ts
```

可以看到，这个命令的作用类似于`import`命令

注：

这个命令只在你自己手写类型声明文件（`.d.ts`文件）时，才有必要用到，也就是说，只应该用在`.d.ts`文件中，普通的`.ts`脚本文件不需要写这个命令。

如果是普通的`.ts`脚本，可以使用`tsconfig.json`文件的`types`属性指定依赖的类型库。

### 6.3、`/// <reference lib="" />`

TIP

`/// <reference lib="..." />`命令允许脚本文件显式包含内置 lib 库，等同于在`tsconfig.json`文件里面使用`lib`属性指定 lib 库。

前文说过，安装 TypeScript 软件包时，会同时安装一些内置的类型声明文件，即内置的 lib 库。这些库文件位于 TypeScript 安装目录的`lib`文件夹中，它们描述了 JavaScript 语言和引擎的标准 API。

库文件并不是固定的，会随着 TypeScript 版本的升级而更新。库文件统一使用 `lib.[description].d.ts` 的命名方式，而`/// <reference lib="" />`里面的`lib`属性的值就是库文件名的`description`部分，比如`lib="es2015"`就表示加载库文件`lib.es2015.d.ts`。

```tsx
/// <reference lib="es2017.string" />

// es2017.string 对应的库文件就是 lib.es2017.string.d.ts
```
