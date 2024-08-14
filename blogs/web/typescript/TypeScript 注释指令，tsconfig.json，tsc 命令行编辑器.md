---
title: TypeScript 注释指令，tsconfig.json，tsc 命令行编辑器
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 注释指令，tsconfig.json，tsc 命令行编辑器



从本节内容开始学习 TypeScript 的注释指令，tsconfig.json，tsc 命令行编辑器相关内容

- TypeScript 的注释指令
- `tsconfig.json` TypeScript 项目的配置文件
- tsc 命令行编辑器

## 一、TypeScript 的注释指令



TypeScript 接受一些注释指令。所谓“注释指令”，指的是采用 JS 双斜杠注释的形式，向编译器发出的命令。

### 1、`// @ts-nocheck`



`// @ts-nocheck`告诉编译器不对当前脚本进行类型检查，可以用于 TypeScript 脚本，也可以用于 JavaScript 脚本。

```tsx
// @ts-nocheck

const element = document.getElementById(123);

// document.getElementById(123) 存在类型错误，但是编译器不对该脚本进行类型检查，所以不会报错
```

### 2、`// @ts-check`



如果一个 JavaScript 脚本顶部添加了`// @ts-check`，那么编译器将对该脚本进行类型检查，不论是否启用了`checkJs`编译选项。

```tsx
// @ts-check
let isChecked = true;

console.log(isChceked); // 报错

// 以上是 JavaScript 脚本，// @ts-check 告诉 TypeScript 编译器对其进行类型检查，所以最后一行会报错，提示拼写错误
```

### 3、`// @ts-ignore`



`// @ts-ignore`告诉编译器不对下一行代码进行类型检查，可以用于 TypeScript 脚本，也可以用于 JavaScript 脚本。

```tsx
let x: number;

x = 0;

// @ts-ignore
x = false; // 不报错

// 以上代码中，最后一行是类型错误，变量 x 的类型是 number，不能等于布尔值
// 但是因为前面加上了 // @ts-ignore，编译器会跳过这一行的类型检查，所以不会报错
```

### 4、`// @ts-expect-error`



`// @ts-expect-error`主要用在测试用例，当下一行有类型错误时，它会压制 TypeScript 的报错信息（即不显示报错信息），把错误留给代码自己处理。

```tsx
function foo(abc: string, xyz: string) {
  if (typeof abc === "string") {
  }
  if (typeof xyz === "string") {
  }
  // do some stuff
}

// @ts-expect-error
expect(() => {
  foo(123, 456);
}).toThrow();

// 以上代码是一个测试用例，上面示例是一个测试用例，倒数第二行的 foo(123, 456) 的参数类型与定义不一致，TypeScript 引擎会报错
// 但是，测试用例本身测试的就是这个错误，已经有专门的处理代码，所以这里可以使用 // @ts-expect-error，不显示引擎的报错信息
```

如果下一行没有类型错误，`// @ts-expect-error`则会显示一行提示

```tsx
// @ts-expect-error
console.log(1 + 1);
// 输出 Unused '@ts-expect-error' directive.

// 以上代码中，第二行是正确代码，这时系统会给出一个提示，表示 @ts-expect-error 没有用到
```

### 5、JSDoc



TypeScript 直接处理 JS 文件时，如果无法推断出类型，会使用 JS 脚本里面的 JSDoc 注释。

> 使用 JSDoc 时，有两个基本要求

- ①、JSDoc 注释必须以`/**`开始，其中星号（`*`）的数量必须为两个。若使用其他形式的多行注释，则 JSDoc 会忽略该条注释。
- ②、JSDoc 注释必须与它描述的代码处于相邻的位置，并且注释在上，代码在下

> 下面是 JSDoc 的一个简单例子

```tsx
/**
 * @param {string} somebody
 */
function sayHello(somebody) {
  console.log("Hello " + somebody);
}

// 注释里面的 @param 是一个 JSDoc 声明，表示下面的函数 sayHello() 的参数 somebody 类型为 string
```

TypeScript 编译器支持大部分的 JSDoc 声明，下面介绍其中的一些

### 5.1、@typedef



`@typedef`命令创建自定义类型，等同于 TypeScript 里面的类型别名

```tsx
/**
 * @typedef {(number | string)} NumberLike
 */
```

以上代码中，定义了一个名为`NumberLike`的新类型，它是由`number`和`string`构成的联合类型，等同于 TypeScript 的如下语句。

```tsx
type NumberLike = string | number;
```

### 5.2、@type



`@type`命令定义变量的类型

```tsx
/**
 * @type {string}
 */
let a;

// @type 定义了变量 a 的类型为 string
```

在`@type`命令中可以使用由`@typedef`命令创建的类型

```tsx
/**
 * @typedef {(number | string)} NumberLike
 */

/**
 * @type {NumberLike}
 */
let a = 0;
```

在`@type`命令中允许使用 TypeScript 类型及其语法

```tsx
/**@type {true | false} */
let a;

/** @type {number[]} */
let b;

/** @type {Array<number>} */
let c;

/** @type {{ readonly x: number, y?: string }} */
let d;

/** @type {(s: string, b: boolean) => number} */
let e;
```

### 5.3、@param



`@param`命令用于定义函数参数的类型

```tsx
/**
 * @param {string}  x
 */
function foo(x) {}
```

如果是可选参数，需要将参数名放在方括号`[]`里面

```tsx
/**
 * @param {string}  [x]
 */
function foo(x) {}
```

方括号里面，还可以指定参数默认值

```tsx
/**
 * @param {string} [x="bar"]
 */
function foo(x) {}

// 参数 x 的默认值是字符串 bar
```

### 5.4、@return，@returns



`@return`和`@returns`命令的作用相同，指定函数返回值的类型

```tsx
/**
 * @return {boolean}
 */
function foo() {
  return true;
}

/**
 * @returns {number}
 */
function bar() {
  return 0;
}
```

### 5.5、@extends 和 类型修饰符



`@extends`命令用于定义继承的基类

```tsx
/**
 * @extends {Base}
 */
class Derived extends Base {}
```

`@public`、`@protected`、`@private`分别指定类的公开成员、保护成员和私有成员

> `@readonly`指定只读成员

```tsx
class Base {
  /**
   * @public
   * @readonly
   */
  x = 0;

  /**
   *  @protected
   */
  y = 0;
}
```

## 二、tsconfig.json 配置文件相关选项



`tsconfig.json`是 TypeScript 项目的配置文件，放在项目的根目录。反过来说，如果一个目录里面有`tsconfig.json`，TypeScript 就认为这是项目的根目录。

如果项目源码是 JavaScript，但是想用 TypeScript 处理，那么配置文件的名字是`jsconfig.json`，它跟`tsconfig`的写法是一样的。

`tsconfig.json`文件主要供`tsc`编译器使用，它的命令行参数`--project`或`-p`可以指定`tsconfig.json`的位置（目录或文件皆可）。

```shell
tsc -p ./dir
```

如果不指定配置文件的位置，`tsc`就会在当前目录下搜索`tsconfig.json`文件，如果不存在，就到上一级目录搜索，直到找到为止。

`tsconfig.json`文件的格式，是一个 JSON 对象，最简单的情况可以只放置一个空对象`{}`。下面是一个示例。

```json
{
  "compilerOptions": {
    "outDir": "./src/dist",
    "allowJs": true,
    "target": "es2016"
  },
  "include": ["./src/**/*"]
}
```

注：

上面示例的四个属性的含义：

- include：指定哪些文件需要编译。
- allowJs：指定源目录的 JavaScript 文件是否原样拷贝到编译后的目录。
- outDir：指定编译产物存放的目录。
- target：指定编译产物的 JS 版本。

`tsconfig.json`文件可以不必手写，使用 tsc 命令的`--init`参数自动生成。

```shell
tsc --init

# 该命令生成的 tsconfig.json 文件，里面会有一些默认配置
```

你也可以使用别人预先写好的 tsconfig.json 文件，npm 的`@tsconfig`名称空间下面有很多模块，都是写好的`tsconfig.json`样本，比如 `@tsconfig/recommended`和`@tsconfig/node16`。

> 这些模块需要安装，以`@tsconfig/deno`为例

```shell
npm install --save-dev @tsconfig/deno
# 或
yarn add --dev @tsconfig/deno
```

安装以后，就可以在`tsconfig.json`里面引用这个模块，相当于继承它的设置，然后进行扩展

```json
{
  "extends": "@tsconfig/deno/tsconfig.json"
}
```

> `@tsconfig`空间下包含的完整 tsconfig 文件目录，可以查看 [GitHub(opens new window)](https://github.com/tsconfig/bases/tree/main/bases)

`tsconfig.json`的一级属性并不多，只有很少几个，但是`compilerOptions`属性有很多二级属性。下面先逐一介绍一级属性，然后再介绍`compilerOptions`的二级属性，按照首字母排序。

### 1、与文件相关的选项



新建一个项目工程，目录结构如下

```markdown
icoding-ts-config
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ package-lock.json
├─ package.json
├─ src
│ ├─ index.ts
│ ├─ a.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

先清空 `tsconfig.json` 配置文件，如果没有任何配置，编译器就会按照默认配置编译当前目录下的所有 TS 文件。

```json
{}
```

新建 `/src/a.ts` 文件

```tsx
// 定义一个变量
let s: string = "arry";
```

在命令行终端中输入命令，编译 TS 文件

```shell
# 直接输入 tsc 命令
tsc
```

在工程中，所有的 TS 文件都被编译成了 JS 文件

![image-20230820005357324](https://www.arryblog.com/assets/img/image-20230820005357324.09f60aef.png)

### 1.1、files 选项



- `files`属性指定编译的文件列表，如果其中有一个文件不存在，就会报错。
- 它是一个数组，排在前面的文件先编译。

在 `tsconfig.json` 中

```json
{
  "files": ["src/a.ts"]
}
```

在命令行终端中输入命令，编译该 TS 文件

```shell
# 直接输入 tsc 命令
tsc
```

![image-20230820011643510](https://www.arryblog.com/assets/img/image-20230820011643510.508c24ee.png)

注：

可以看到只有 `a.ts` 文件被编译了

该属性必须逐一列出文件，不支持文件匹配。如果文件较多，建议使用`include`和`exclude`属性。

### 1.2、include 选项



`include`属性指定所要编译的文件列表，既支持逐一列出文件，也支持通配符。文件位置相对于当前配置文件而定。

新建 `src/lib/lib.ts` 文件

```tsx
// 定义 libs 变量
let libs = {};
```

在 `tsconfig.json` 中，添加 `include` 选项，值为 `src` 目录

```json
{
  "files": ["src/a.ts"],
  "include": ["src"]
}
```

在命令行终端中输入命令，编译 TS 文件

```shell
# 直接输入 tsc 命令
tsc
```

![image-20230820012533505](https://www.arryblog.com/assets/img/image-20230820012533505.9e1b9163.png)

运行结果可以看到，编译器会将 `src` 目录下的所有 TS 文件 全部编译成 JS 文件，包括子目录的文件。

### 1.3、include 属性支持三种通配符



- `?`：指代单个字符
- `*`：指代任意字符，不含路径分隔符
- `**`：指定任意目录层级。

如果不指定文件后缀名，默认包括`.ts`、`.tsx`和`.d.ts`文件。如果打开了`allowJs`，那么还包括`.js`和`.jsx`。

```json
{
  // " src/* " 只会编译 src 一级目录下的文件
  "include": ["src/*"]
}
```

![image-20230820013436012](https://www.arryblog.com/assets/img/image-20230820013436012.14284a8c.png)

```json
{
  // " src/*/* " 只会编译 src 二级目录下的文件
  "include": ["src/*/*"]
}
```

当 `files` 和 `include` 同时存在时，是会合并的

![image-20230820014149851](https://www.arryblog.com/assets/img/image-20230820014149851.5b6fb514.png)

### 1.4、exclude 选项



表示编译器需要排除的文件 或 文件夹

`exclude`属性是一个数组，必须与`include`属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与`include`属性相同的通配符。

> 默认 TS 会排除 `node_modules` 下的所有文件，也会排除所有的声明文件

```json
{
  "files": ["src/a.ts"],
  // 指定了 src 下的所有文件
  "include": ["src"],
  // 排除 “src/lib” 下的所有文件
  "exclude": ["src/lib"]
}
```

![image-20230820015803349](https://www.arryblog.com/assets/img/image-20230820015803349.ba13f275.png)

注：

- `include` 指定了 `src` 文件夹下的所有文件
- `exclude` 排除了 `lib` 下的文件

结果就只剩下 `a.ts` 和 `index.ts` 文件会被编译成 JS 文件了

### 1.5、extends 选项



配置文件之间是可以继承的，我们可以将继承的配置信息抽离出来方便复用。

`tsconfig.json`可以继承另一个`tsconfig.json`文件的配置。如果一个项目有多个配置，可以把共同的配置写成`tsconfig.base.json`，其他的配置文件继承该文件，这样便于维护和修改。

在项目的根目录中新建基础的 TS 配置文件 `tsconfig.base.json`

```json
{
  "files": ["src/a.ts"],
  "include": ["src"],
  "exclude": ["src/lib"]
}
```

在 `tsconfig.json` 中配置 `extends` 选项，继承 `tsconfig.base.json`

```json
{
  "extends": "./tsconfig.base"
}
```

从运行结果中可以看到和上边一样

![image-20230820020856272](https://www.arryblog.com/assets/img/image-20230820020856272.fea4777f.png)

另外，在 `tsconfig.json` 文件中也可以覆盖 `tsconfig.base.json` 中的配置项

```json
{
  "extends": "./tsconfig.base",
  // 不排除任何目录（会覆盖 tsconfig.base.json 中 exclude 选项的值）
  "exclude": []
}
```

![image-20230820021544543](https://www.arryblog.com/assets/img/image-20230820021544543.684a59b7.png)

如果`extends`属性指定的路径不是以`./`或`../`开头，那么编译器将在`node_modules`目录下查找指定的配置文件。

`extends`属性也可以继承已发布的 npm 模块里面的 tsconfig 文件。

```json
{
  "extends": "@tsconfig/node12/tsconfig.json"
}
```

`extends`指定的`tsconfig.json`会先加载，然后加载当前的`tsconfig.json`。如果两者有重名的属性，后者会覆盖前者。

### 1.6、compileOnSave 选项



设置保存文件的时候自动编译

> 遗憾的是，VSCode 暂不支持该功能，可以使用 Atom 编辑器

```json
{
  "compileOnSave": true
}
```

## 三、tsconfig.json 编译相关选项



在 TS 的 `tsconfig.json` 中跟编译相关的选项有 100 余项，我们只需要学习常用的选项（满足开发使用）即可。不常用的直接查阅官方文档即可 ！

### 1、compileOptions 选项



`compilerOptions`属性用来定制编译行为。这个属性可以省略，这时编译器将使用默认设置。

> 创建配置选项如下

```json
"compilerOptions": {
  "incremental": true, // TS 编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息

  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中，即开启时应设置 "module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS 需要引用的库，即声明文件，es5 默认引用 dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如 es8 的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译 JS，JSX 文件
  "checkJs": true, // 允许在JS文件中报错，通常与 allowJS 一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成 js 文件
  "sourceMap": true, // 生成目标文件的 sourceMap 文件
  "inlineSourceMap": true, // 生成目标文件的 inline SourceMap，inline SourceMap 会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成 sourceMap
  "typeRoots": [], // 声明文件目录，默认时 node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释
  "noEmit": true, // 不输出文件，即编译后不会生成任何 js 文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成 helper 函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过 tslib 引入 helpe r 函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是 es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的 any 类型
  "strictNullChecks": true, // 不允许把 null、undefined 赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的 bind/call/apply 检查
  "noImplicitThis": true, // 不允许 this 有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止 switch 语句贯穿（即如果没有 break 语句后面不会执行）
  "noImplicitReturns": true, // 每个分支都会有返回值
  "esModuleInterop": true, // 允许 export = 导出，由 import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问 umd 模块
  "moduleResolution": "node", // 模块解析策略，ts 默认用 node 的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于 baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟 src 和 out 在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
```

### 2、allowJs



`allowJs`允许 TypeScript 项目加载 JS 脚本（允许编译器编译 JS，JSX 文件）。编译时，也会将 JS 文件，一起拷贝到输出目录。

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

### 3、alwaysStrict



`alwaysStrict`确保脚本以 ECMAScript 严格模式进行解析，因此脚本头部不用写`"use strict"`。

> 它的值是一个布尔值，默认为`true`。

### 4、allowSyntheticDefaultImports



`allowSyntheticDefaultImports`允许`import`命令默认加载没有`default`输出的模块。

比如，打开这个设置，就可以写`import React from "react";`，而不是`import * as React from "react";`

### 5、allowUnreachableCode



`allowUnreachableCode`设置是否允许存在不可能执行到的代码。它的值有三种可能

- `undefined`： 默认值，编辑器显示警告
- `true`：忽略不可能执行到的代码
- `false`：编译器报错

### 6、allowUnusedLabels



`allowUnusedLabels`设置是否允许存在没有用到的代码标签（label）。它的值有三种可能

- `undefined`： 默认值，编辑器显示警告
- `true`：忽略没有用到的代码标签
- `false`：编译器报错

### 7、baseUrl



`baseUrl`的值为字符串，指定 TypeScript 项目的基准目录。

由于默认是以 `tsconfig.json` 的位置作为基准目录，所以一般情况不需要使用该属性。

```json
{
  "compilerOptions": {
    "baseUrl": "./"
  }
}
```

上面代码中，`baseUrl`为当前目录`./`。那么，当遇到下面的语句，TypeScript 将以`./`为起点，寻找`hello/world.ts`

```tsx
import { helloWorld } from "hello/world";
```

### 8、checkJs



```
checkJS`设置对 JS 文件同样进行类型检查。打开这个属性，也会自动打开`allowJs
```

> 它等同于在 JS 脚本的头部添加`// @ts-check`命令。

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

### 9、composite



`composite`打开某些设置，使得 TypeScript 项目可以进行增量构建，往往跟`incremental`属性配合使用。

### 10、declaration



`declaration`设置编译时是否为每个脚本生成类型声明文件`.d.ts`。

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

### 11、declarationDir



`declarationDir`设置生成的`.d.ts`文件所在的目录

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types"
  }
}
```

### 12、declarationMap



`declarationMap`设置生成`.d.ts`类型声明文件的同时，还会生成对应的 Source Map 文件

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}
```

### 13、emitBOM



`emitBOM`设置是否在编译结果的文件头添加字节顺序标志 BOM，默认值是`false`。

### 14、emitDeclarationOnly



`emitDeclarationOnly`设置编译后只生成`.d.ts`文件，不生成`.js`文件。

### 15、esModuleInterop



`esModuleInterop`修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。

如果`module`属性为`node16`或`nodenext`，则`esModuleInterop`默认为`true`，其他情况默认为`false`。

打开这个属性，使用`import`命令加载 CommonJS 模块时，TypeScript 会严格检查兼容性问题是否存在。

```tsx
import * as moment from "moment";
moment(); // 报错

// 根据 ES6 规范， import * as moment 里面的 moment 是一个对象，不能当作函数调用，所以第二行报错了
```

解决方法就是改写上面的语句，改成加载默认接口。

```tsx
import moment from "moment";
moment(); // 不报错
```

打开`esModuleInterop`以后，如果将上面的代码编译成 CommonJS 模块格式，就会加入一些辅助函数，保证编译后的代码行为正确。

注：

打开`esModuleInterop`，将自动打开`allowSyntheticDefaultImports`

### 16、exactOptionalPropertyTypes



`exactOptionalPropertyTypes`设置可选属性不能赋值为`undefined`。

```tsx
// 打开 exactOptionalPropertyTypes
interface MyObj {
  foo?: "A" | "B";
}

let obj: MyObj = { foo: "A" };

obj.foo = undefined; // 报错

//  foo 是可选属性，打开 exactOptionalPropertyTypes 以后，该属性就不能显式赋值为 undefined
```

### 17、forceConsistentCasingInFileNames



```
forceConsistentCasingInFileNames`设置文件名是否为大小写敏感，默认为`true
```

### 18、incremental



`incremental`让 TypeScript 项目构建时产生文件`tsbuildinfo`，从而完成增量构建。

### 19、inlineSourceMap



`inlineSourceMap`设置将 SourceMap 文件写入编译后的 JS 文件中，否则会单独生成一个`.js.map`文件。

### 20、inlineSources



`inlineSources`设置将原始的`.ts`代码嵌入编译后的 JS 中。

> 它要求`sourceMap`或`inlineSourceMap`至少打开一个

### 21、isolatedModules



`isolatedModules`设置如果当前 TypeScript 脚本作为单个模块编译，是否会因为缺少其他脚本的类型信息而报错，主要便于非官方的编译工具（比如 Babel）正确编译单个脚本。

### 22、jsx



`jsx`设置如何处理`.tsx`文件。它可以取以下五个值。

- `preserve`：保持 jsx 语法不变，输出的文件名为`.jsx`。
- `react`：将`<div />`编译成`React.createElement("div")`，输出的文件名为`.js`。
- `react-native`：保持 jsx 语法不变，输出的文件后缀名为`.js`。
- `react-jsx`：将`<div />`编译成`_jsx("div")`，输出的文件名为`.js`。
- `react-jsxdev`：跟`react-jsx`类似，但是为`_jsx()`加上更多的开发调试项，输出的文件名为`.js`。

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

### 23、lib



`lib`值是一个数组，描述项目需要加载的 TypeScript 内置类型描述文件，跟三斜线指令`/// <reference lib="" />`作用相同。

```json
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}
```

TypeScript 内置的类型描述文件，主要有以下一些，完整的清单可以参考 [TypeScript 源码 (opens new window)](https://github.com/microsoft/TypeScript/tree/main/src/lib)。

- ES5
- ES2015
- ES6
- ES2016
- ES7
- ES2017
- ES2018
- ES2019
- ES2020
- ES2021
- ES2022
- ESNext
- DOM
- WebWorker
- ScriptHost

### 24、listEmittedFiles



`listEmittedFiles`设置编译时在终端显示，生成了哪些文件。

```json
{
  "compilerOptions": {
    "listEmittedFiles": true
  }
}
```

### 25、listFiles



`listFiles`设置编译时在终端显示，参与本次编译的文件列表。

```json
{
  "compilerOptions": {
    "listFiles": true
  }
}
```

### 26、mapRoot



`mapRoot`指定 SourceMap 文件的位置，而不是默认的生成位置。

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "mapRoot": "https://my-website.com/debug/sourcemaps/"
  }
}
```

### 27、module



`module`指定编译产物的模块格式。它的默认值与`target`属性有关，如果`target`是`ES3`或`ES5`，它的默认值是`commonjs`，否则就是`ES6/ES2015`。

```json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}

// 它可以取以下值：none、commonjs、amd、umd、system、es6/es2015、es2020、es2022、esnext、node16、nodenext
```

### 28、moduleResolution



`moduleResolution`确定模块路径的算法，即如何查找模块。它可以取以下四种值。

- `node`：采用 Node.js 的 CommonJS 模块算法。
- `node16`或`nodenext`：采用 Node.js 的 ECMAScript 模块算法，从 TypeScript 4.7 开始支持。
- `classic`：TypeScript 1.6 之前的算法，新项目不建议使用。
- `bundler`：TypeScript 5.0 新增的选项，表示当前代码会被其他打包器（比如 Webpack、Vite、esbuild、Parcel、rollup、swc）处理，从而放宽加载规则，它要求`module`设为`es2015`或更高版本，详见加入该功能的 [PR 说明 (opens new window)](https://github.com/microsoft/TypeScript/pull/51669)。

它的默认值与`module`属性有关，如果`module`为`AMD`、`UMD`、`System`或`ES6/ES2015`，默认值为`classic`；如果`module`为`node16`或`nodenext`，默认值为这两个值；其他情况下,默认值为`Node`。

### 29、moduleSuffixes



`moduleSuffixes`指定模块的后缀名

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".native", ""]
  }
}
```

上面的设置使得 TypeScript 对于语句`import * as foo from "./foo";`，会搜索以下脚本`./foo.ios.ts`、`./foo.native.ts`和`./foo.ts`

### 30、newLine



`newLine`设置换行符为`CRLF`（Windows）还是`LF`（Linux）。

### 31、noEmit



`noEmit`设置是否产生编译结果。如果不生成，TypeScript 编译就纯粹作为类型检查了。

### 32、noEmitHelpers



`noEmitHelpers`设置在编译结果文件不插入 TypeScript 辅助函数，而是通过外部引入辅助函数来解决，比如 NPM 模块`tslib`。

### 33、noEmitOnError



`noEmitOnError`指定一旦编译报错，就不生成编译产物，默认为`false`。

### 34、noFallthroughCasesInSwitch



`noFallthroughCasesInSwitch`设置是否对没有`break`语句（或者`return`和`throw`语句）的 switch 分支报错，即`case`代码里面必须有终结语句（比如`break`）。

### 35、noImplicitAny



`noImplicitAny`设置当一个表达式没有明确的类型描述、且编译器无法推断出具体类型时，是否允许将它推断为`any`类型。

> 它是一个布尔值，默认为`true`，即只要推断出`any`类型就报错。

### 36、noImplicitReturns



`noImplicitReturns`设置是否要求函数任何情况下都必须返回一个值，即函数必须有`return`语句。

### 37、noImplicitThis



`noImplicitThis`设置如果`this`被推断为`any`类型是否报错。

### 38、noUnusedLocals



`noUnusedLocals`设置是否允许未使用的局部变量。

### 39、noUnusedParameters



`noUnusedParameters`设置是否允许未使用的函数参数。

### 40、outDir



`outDir`指定编译产物的存放目录。如果不指定，编译出来的`.js`文件存放在对应的`.ts`文件的相同位置。

### 41、outFile



`outFile`设置将所有非模块的全局文件，编译在同一个文件里面。它只有在`module`属性为`None`、`System`、`AMD`时才生效，并且不能用来打包 CommonJS 或 ES6 模块。

### 42、paths



`paths`设置模块名和模块路径的映射，也就是 TypeScript 如何导入`require`或`imports`语句加载的模块。

`paths`基于`baseUrl`进行加载，所以必须同时设置后者。

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "b": ["bar/b"]
    }
  }
}
```

它还可以使用通配符`*`

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@bar/*": ["bar/*"]
    }
  }
}
```

### 43、preserveConstEnums



`preserveConstEnums`将`const enum`结构保留下来，不替换成常量值。

```json
{
  "compilerOptions": {
    "preserveConstEnums": true
  }
}
```

### 44、pretty



`pretty`设置美化输出终端的编译信息，默认为`true`。

### 45、removeComments



`removeComments`移除 TypeScript 脚本里面的注释，默认为`false`。

### 46、resolveJsonModule



`resolveJsonModule`允许 import 命令导入 JSON 文件。

### 47、rootDir



`rootDir`设置源码脚本所在的目录，主要跟编译后的脚本结构有关。`rootDir`对应目录下的所有脚本，会成为输出目录里面的顶层脚本。

### 48、rootDirs



`rootDirs`把多个不同目录，合并成一个目虚拟目录，便于模块定位。

```json
{
  "compilerOptions": {
    "rootDirs": ["bar", "foo"]
  }
}

// rootDirs 将 bar 和 foo 组成一个虚拟目录
```

### 49、sourceMap



`sourceMap`设置编译时是否生成 SourceMap 文件。

### 50、sourceRoot



`sourceRoot`在 SourceMap 里面设置 TypeScript 源文件的位置。

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "sourceRoot": "https://my-website.com/debug/source/"
  }
}
```

### 51、strict



`strict`用来打开 TypeScript 的严格检查。它的值是一个布尔值，默认是关闭的。

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

注：

这个设置相当于同时打开以下的一系列设置

- alwaysStrict
- strictNullChecks
- strictBindCallApply
- strictFunctionTypes
- strictPropertyInitialization
- noImplicitAny
- noImplicitThis
- useUnknownInCatchVaria

打开`strict`的时候，允许单独关闭其中一项。

```json
{
  "compilerOptions": {
    "strict": true,
    "alwaysStrict": false
  }
}
```

### 52、strictBindCallApply



`strictBindCallApply`设置是否对函数的`call()`、`bind()`、`apply()`这三个方法进行类型检查。

如果不打开`strictBindCallApply`编译选项，编译器不会对以上三个方法进行类型检查，参数类型都是`any`，传入任何参数都不会产生编译错误。

```tsx
function fn(x: string) {
  return parseInt(x);
}

// strictBindCallApply:false
const n = fn.call(undefined, false);
// 以上不报错
```

### 53、strictFunctionTypes



`strictFunctionTypes`允许对函数更严格的参数检查。具体来说，如果函数 B 的参数是函数 A 参数的子类型，那么函数 B 不能替代函数 A。

```tsx
function fn(x: string) {
  console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// 打开 strictFunctionTypes，下面代码会报错
let func: StringOrNumberFunc = fn;

// 函数 fn() 的参数是 StringOrNumberFunc 参数的子集，因此 fn 不能替代 StringOrNumberFunc
```

### 54、strictNullChecks



`strictNullChecks`设置对`null`和`undefined`进行严格类型检查。如果打开`strict`属性，这一项就会自动设为`true`，否则为`false`。

```tsx
let value: string;

// strictNullChecks:false
// 下面语句不报错
value = null;
```

它可以理解成只要打开，就需要显式检查`null`或`undefined`。

```tsx
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### 55、strictPropertyInitialization



`strictPropertyInitialization`设置类的实例属性都必须初始化，包括以下几种情况。

- 设为`undefined`类型
- 显式初始化
- 构造函数中赋值

> 注意，使用该属性的同时，必须打开`strictNullChecks`。

```tsx
// strictPropertyInitialization：true
class User {
  // 报错，属性 username 没有初始化
  username: string;
}

// 解决方法一
class User {
  username = "张三";
}

// 解决方法二
class User {
  username: string | undefined;
}

// 解决方法三
class User {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
// 或者
class User {
  constructor(public username: string) {}
}

// 解决方法四：赋值断言
class User {
  username!: string;

  constructor(username: string) {
    this.initialize(username);
  }

  private initialize(username: string) {
    this.username = username;
  }
}
```

### 56、suppressExcessPropertyErrors



`suppressExcessPropertyErrors`关闭对象字面量的多余参数的报错。

### 57、target



`target`指定编译出来的 JavaScript 代码的 ECMAScript 版本，比如`es2021`，默认是`es3`。

它可以取以下值。

- es3
- es5
- es6/es2015
- es2016
- es2017
- es2018
- es2019
- es2020
- es2021
- es2022
- esnext

注意，如果编译的目标版本过老，比如`"target": "es3"`，有些语法可能无法编译，`tsc`命令会报错。

### 58、traceResolution



`traceResolution`设置编译时，在终端输出模块解析的具体步骤。

```json
{
  "compilerOptions": {
    "traceResolution": true
  }
}
```

### 59、typeRoots



`typeRoots`设置类型模块所在的目录，默认是`node_modules/@types`，该目录里面的模块会自动加入编译。一旦指定了该属性，就不会再用默认值`node_modules/@types`里面的类型模块。

该属性的值是一个数组，数组的每个成员就是一个目录，它们的路径是相对于`tsconfig.json`位置。

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings", "./vendor/types"]
  }
}
```

### 60、types



默认情况下，`typeRoots`目录下所有模块都会自动加入编译，如果指定了`types`属性，那么只有其中列出的模块才会自动加入编译。

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

注：

上面的设置表示，默认情况下，只有`./node_modules/@types/node`、`./node_modules/@types/jest`和`./node_modules/@types/express`会自动加入编译，其他`node_modules/@types/`目录下的模块不会加入编译。

> 如果`"types": []`，就表示不会自动将所有`@types`模块加入编译。

### 61、useUnknownInCatchVariables



`useUnknownInCatchVariables`设置`catch`语句捕获的`try`抛出的返回值类型，从`any`变成`unknown`。

```tsx
try {
  someExternalFunction();
} catch (err) {
  err; // 类型 any
}
```

> 上面示例中，默认情况下，`catch`语句的参数`err`类型是`any`，即可以是任何值。

打开`useUnknownInCatchVariables`以后，`err`的类型抛出的错误将是`unknown`类型。这带来的变化就是使用`err`之前，必须缩小它的类型，否则会报错。

```tsx
try {
  someExternalFunction();
} catch (err) {
  if (err instanceof Error) {
    console.log(err.message);
  }
}
```

## 四、tsc 命令行编译器



tsc 是 TypeScript 官方的命令行编译器，用来检查代码，并将其编译成 JavaScript 代码。

tsc 默认使用当前目录下的配置文件`tsconfig.json`，但也可以接受独立的命令行参数。命令行参数会覆盖`tsconfig.json`，比如命令行指定了所要编译的文件，那么 tsc 就会忽略`tsconfig.json`的`files`属性。

### 1、tsc 的基本语法

```shell
# 使用 tsconfig.json 的配置
$ tsc

# 只编译 index.ts
$ tsc index.ts

# 编译 src 目录的所有 .ts 文件
$ tsc src/*.ts

# 指定编译配置文件
$ tsc --project tsconfig.production.json

# 只生成类型声明文件，不编译出 JS 文件
$ tsc index.js --declaration --emitDeclarationOnly

# 多个 TS 文件编译成单个 JS 文件
$ tsc app.ts util.ts --target esnext --outfile index.js
```

### 2、命令行参数



tsc 的命令行参数，大部分与 `tsconfig.json` 的属性一一对应。

下面只是按照首字母排序，简单罗列出主要的一些参数，详细解读查阅以上《tsconfig.json 配置文件》部分

### 2.1、--all



`--all`：输出所有可用的参数

### 2.2、--allowJs



`--allowJs`：允许 TS 脚本加载 JS 模块，编译时将 JS 一起拷贝到输出目录

### 2.3、--allowUnreachableCode



`--allowUnreachableCode`：如果 TS 脚本有不可能运行到的代码，不报错

### 2.4、--allowUnusedLabels



`--allowUnusedLabels`：如果 TS 脚本有没有用到的标签，不报错

### 2.5、--alwaysStrict



```
--alwaysStrict`：总是在编译产物的头部添加`use strict
```

### 2.6、--baseUrl



`--baseUrl`：指定非相对位置的模块定位的基准 URL

### 2.7、--build



`--build`：启用增量编译

### 2.8、--checkJs



`--checkJs`：对 JS 脚本进行类型检查

### 2.9、--declaration



`--declaration`：为 TS 脚本生成一个类型生成文件

### 3.0、--declarationDir



`--declarationDir`：指定生成的类型声明文件的所在目录

### 3.1、--declarationMap



`--declarationMap`：为`.d.ts`文件生成 SourceMap 文件

### 3.2、--diagnostics



`--diagnostics`：构建后输出编译性能信息

### 3.3、--emitBOM



`--emitBOM`：在编译输出的 UTF-8 文件头部加上 BOM 标志

### 3.4、--emitDeclarationOnly



`--emitDeclarationOnly`：只编译输出类型声明文件，不输出 JS 文件

### 3.5、--esModuleInterop



`--esModuleInterop`：更容易使用 import 命令加载 CommonJS 模块

### 3.6、--exactOptionalPropertyTypes



```
--exactOptionalPropertyTypes`：不允许将可选属性设置为`undefined
```

### 3.7、--experimentalDecorators



`--experimentalDecorators`：支持早期的装饰器语法

### 3.8、--explainFiles



`--explainFiles`：输出进行编译的文件信息

### 3.9、--forceConsistentCasingInFileNames



`--forceConsistentCasingInFileNames`：文件名大小写敏感，默认打开

### 4.0、--help



`--help`：输出帮助信息、

### 4.1、--importHelpers



`--importHelpers`：从外部库（比如 tslib）输入辅助函数

### 4.2、--incremental



`--incremental`：启用增量构建

### 4.3、--init



`--init`：在当前目录创建一个全新的`tsconfig.json`文件，里面是预设的设置

### 4.4、--inlineSourceMap



`--inlineSourceMap`：SourceMap 信息嵌入 JS 文件，而不是生成独立的`.js.map`文件

### 4.5、--inlineSources



`--inlineSources`：将 TypeScript 源码作为 SourceMap 嵌入编译出来的 JS 文件

### 4.6、--isolatedModules



`--isolatedModules`：确保每个模块能够独立编译，不依赖其他输入的模块

### 4.7、--jsx



`--jsx`：设置如何处理 JSX 文件

### 4.8、--lib



`--lib`：设置目标环境需要哪些内置库的类型描述

### 4.9、--listEmittedFiles



`--listEmittedFiles`：编译后输出编译产物的文件名

### 5.0、--listFiles



`--listFiles`：编译过程中，列出读取的文件名

### 5.1、--listFilesOnly



`--listFilesOnly`：列出编译所要处理的文件，然后停止编译

### 5.2、--locale



`--locale`：指定编译时输出的语言，不影响编译结果

### 5.3、--mapRoot



`--mapRoot`：指定 SourceMap 文件的位置

### 5.4、--module



`--module`：指定编译生成的模块格式

### 5.5、--moduleResolution



`--moduleResolution`：指定如何根据模块名找到模块的位置

### 5.6、--moduleSuffixes



`--moduleSuffixes`：指定模块文件的后缀名

### 5.7、--newLine



```
--newLine`：指定编译产物的换行符，可以设为`crlf`或者`lf
```

### 5.8、--noEmit



`--noEmit`：不生成编译产物，只进行类型检查

### 5.9、--noEmitHelpers



`--noEmitHelpers`：不在编译产物中加入辅助函数

### 6.0、--noEmitOnError



`--noEmitOnError`：一旦报错，就停止编译，没有编译产物。

### 6.1、--noFallthroughCasesInSwitch



`--noFallthroughCasesInSwitch`：Switch 结构的`case`分支必须有终止语句（比如`break`）

### 6.2、--noImplicitAny



`--noImplicitAny`：类型推断只要为`any`类型就报错

### 6.3、--noImplicitReturns



`--noImplicitReturns`：函数内部没有显式返回语句（比如`return`）就报错

### 6.4、--noImplicitThis



`--noImplicitThis`：如果`this`关键字是`any`类型，就报错

### 6.5、--noImplicitUseStrict



`--noImplicitUseStrict`：编译产生的 JS 文件头部不添加`use strict`语句

### 6.6、--noResolve



`--noResolve`：不进行模块定位，除非该模块是由命令行传入

### 6.7、--noUnusedLocals



`--noUnusedLocals`：如果有未使用的局部变量就报错

### 6.8、--noUnusedParameters



`--noUnusedParameters`：如果有未使用的函数参数就报错

### 6.9、--outDir



`--outDir`：指定编译产物的存放目录

### 7.0、--outFile



`--outFile`：所有编译产物打包成一个指定文件

### 7.1、--preserveConstEnums



`--preserveConstEnums`：不将`const enum`结构在生成的代码中，替换成常量

### 7.2、--preserveWatchOutput



`--preserveWatchOutput`： watch 模式下不清屏

### 7.3、--pretty



```
--pretty`：美化显示编译时的终端输出。这是默认值，但是可以关闭`--pretty false
```

### 7.4、--project



`--project`（或者`-p`）：指定编译配置文件，或者该文件所在的目录

### 7.5、--removeComments



`--removeComments`：编译结果中移除代码注释

### 7.6、--resolveJsonModule



`--resolveJsonModule`：允许加载 JSON 文件

### 7.7、--rootDir



`--rootDir`：指定加载文件所在的根目录，该目录里面的目录结构会被复制到输出目录

### 7.8、--rootDirs



`--rootDirs`：允许模块定位时，多个目录被当成一个虚拟目录

### 7.9、--skipDefaultLibCheck



`--skipDefaultLibCheck`：跳过 TypeScript 内置类型声明文件的类型检查

### 8.0、--skipLibCheck



`--skipLibCheck`：跳过`.d.ts`类型声明文件的类型检查。这样可以加快编译速度

### 8.1、--showConfig



`--showConfig`：终端输出编译配置信息，而不进行配置

### 8.2、--sourcemap



`--sourcemap`：为编译产生的 JS 文件生成 SourceMap 文件（`.map` 文件）

### 8.3、--sourceRoot



`--sourceRoot`：指定 SourceMap 文件里面的 TypeScript 源码根目录位置

### 8.4、--strict



`--strict`：打开 TypeScript 严格检查模式

### 8.5、--strictBindCallApply



`--strictBindCallApply`：bind, call、apply 这三个函数的类型，匹配原始函数

### 8.6、--strictFunctionTypes



`--strictFunctionTypes`：如果函数 B 的参数是函数 A 参数的子类型，那么函数 B 不能替代函数 A

### 8.7、--strictNullChecks



`--strictNullChecks`：对`null`和`undefined`进行严格类型检查

### 8.8、--strictPropertyInitialization



`--strictPropertyInitialization`：类的属性必须进行初始值，但是允许在构造函数里面赋值

### 8.9、--suppressExcessPropertyErrors



`--suppressExcessPropertyErrors`：关闭对象字面量的多余参数的报错

### 9.0、--target



`--target`：指定编译出来的 JS 代码的版本，TypeScript 还会在编译时自动加入对应的库类型声明文件

### 9.1、--traceResolution



`--traceResolution`：编译时在终端输出模块解析（moduleResolution）的具体步骤

### 9.2、--typeRoots



```
--typeRoots`：设置类型模块所在的目录，替代默认的`node_modules/@types
```

### 9.3、--types



`--types`：设置`typeRoots`目录下需要包括在编译之中的类型模块

### 9.4、--version



`--version`：终端输出 tsc 的版本号

### 9.5、--watch



`--watch`（或者`-w`）：进入观察模式，只要文件有修改，就会自动重新编译
