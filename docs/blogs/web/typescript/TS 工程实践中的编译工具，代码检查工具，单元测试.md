---
title: TS 工程实践中的编译工具，代码检查工具，单元测试
date: 2023-10-28
sidebar: 'auto'
categories:
  - typescript
tags:
  - typescript
  - TS 工程实践
publish: true
---

# TS 工程实践中的编译工具，代码检查工具，单元测试

从本节开始学习 TypeScript 工程实践中的编译工具，代码检查工具 TSLint 和 ESLint，Jest 单元测试，TS 工程实践知识总结相关内容。

## 一、TS 编译工具

前面我们用 Webpack 构建了 TS 的基础环境，并编写了 `Hello World` 程序。为了能将 TypeScript 编译成 JavaScript 我们用了一个 Webpack 的 loader ，即 `ts-loader` 。

> 接下来我们来详细解读 `ts-loader` 的细节

### 1、解读 ts-loader

在 `webpack.base.config.js` 基础（公共）环境配置中

> 从 `ts-loader` 源码中可以看到，它在内部调用了 TS 官方的编译器，即 `tsc`

![image-20230927001348015](https://www.arryblog.com/assets/img/image-20230927001348015.13127203.png)

注：

- 所以，`ts-loader` 和 `tsc` 是共享 `tsconfig.json` 配置文件的
- 此外，`ts-loader` 还会有一些自己的配置，会通过 `options` 属性传入。其中的配置项可以参考 [ts-loader 的官方文档(opens new window)](https://github.com/TypeStrong/ts-loader)

### 2、ts-loader 中的 options 属性

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.ts',
  // 输出文件
  output: {
    filename: 'app.js',
  },
  // 指定扩展名
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  // ts-leader
  module: {
    rules: [
      {
        // ts-loader 的正则，以 ts 或 tsx 结尾的文件
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            // ---------------------------------------------
            // ts-loader 自己的配置，通过 options 属性传入
            options: {
              // 作用：当该配置项开启后会告诉编译器只做语言转换，而不去做类型检查
              // 因为在实际项目中，随着项目越来越大，构建时间越来越长。原因之一是 TS 编译器要做很多事情，不仅要做语言转换也要做类型检查
              // 开启该配置项，就会启动一种快速构建的模式，设为 false 就是将其关闭
              // 默认值为 false，现在来观察构建速度
              transpileOnly: false,
            },
          },
        ],
        // 排除 node_modules 下的文件
        exclude: /node_modules/,
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html',
    }),
  ],
}
```

在控制台中，通过命令行进行重新构建

```shell
npm run build
```

观察构建时间为 `2023 ms`

![image-20230927190906176](https://www.arryblog.com/assets/img/image-20230927190906176.29f7c034.png)

再次修改配置文件中 `transpileOnly: true`

```js
{
    loader: "ts-loader",
	    // 修改  transpileOnly: true 开启
        options: {
            transpileOnly: true
        }
},
```

在控制台中，通过命令行进行重新构建

```shell
npm run build
```

再次观察构建时间为 `820 ms` ，相比配置选项为 `transpileOnly: false` 时，已经节约了很多的构建时间

![image-20230927191729760](https://www.arryblog.com/assets/img/image-20230927191729760.52e22e29.png)

> 以上方式已经节约了很多构建时间（速度更快了），但该模式有一个缺点，即：在编译时不能进行类型检查

在 `src/index.ts` 中

```tsx
let hello: string = 'Hello TypeScript ! arry老师'
console.log(hello)

// 将以上字符串插入到网页中
document.querySelectorAll('.app')[0].innerHTML = hello

// 在此写下一个明显的错误
hello = 1
```

![image-20230927192849059](https://www.arryblog.com/assets/img/image-20230927192849059.8ab97ab5.png)

> 此时，IDE 开发工具会报错 ！但 TS 比较柔性的地方在于：即使 IDE 报错，也不会阻止程序的编译

在控制台中，通过命令行进行重新编译构建

```shell
npm run build
```

![image-20230927194552401](https://www.arryblog.com/assets/img/image-20230927194552401.6287d0ed.png)

> 此时，可以看到编译仍然是通过了 ！

### 3、fork-ts-checker-webpack-plugin 插件

如何在 `transpileOnly: true` 开启的状态下，又可以进行类型检查呢 ？

这时，我们需要借助一个插件来实现，它会将类型检查放在一个独立的进程中进行。

> 安装如下

```shell
npm i fork-ts-checker-webpack-plugin -D
```

> 以上插件安装完成后，然后在配置文件中引入进来 ！

在 `webpack.base.config.js` 配置文件中

```tsx
// 导入插件依赖
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: './src/index.ts',
  // 输出文件
  output: {
    filename: 'app.js',
  },
  // 指定扩展名
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  // ts-leader
  module: {
    rules: [
      {
        // ts-loader 的正则，以 ts 或 tsx 结尾的文件
        test: /\.tsx?$/i,
        use: [
          {
            loader: 'ts-loader',
            // ---------------------------------------------
            // ts-loader 自己的配置，通过 options 属性传入
            options: {
              // 作用：当该配置项开启后会告诉编译器只做语言转换，而不去做类型检查
              // 因为在实际项目中，随着项目越来越大，构建时间越来越长。原因之一是 TS 编译器要做很多事情，不仅要做语言转换也要做类型检查
              // 开启该配置项，就会启动一种快速构建的模式，设为 false 就是将其关闭
              // 默认值为 false，现在来观察构建速度
              transpileOnly: true,
            },
          },
        ],
        // 排除 node_modules 下的文件
        exclude: /node_modules/,
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html',
    }),
    // ---------直接 new 即可-----------
    new ForkTsCheckerWebpackPlugin(),
  ],
}
```

在终端重新构建，输入如下命令

```shell
npm run build
```

![image-20230930180841125](https://www.arryblog.com/assets/img/image-20230930180841125.a510628d.png)

> 以上构建过程中会报错，提示 `src/index.ts` 语句中有错误 ！“不能将 1 赋值给 字符串类型”

在 `src/index.ts` 中

```tsx
// 导入
import './libs/index'

let hello: string = 'Hello TypeScript ! arry老师'
console.log(hello)

// 将以上字符串插入到网页中
document.querySelectorAll('.app')[0].innerHTML = hello

// 在此写下一个明显的错误
// --------将以下代码注释掉，构建就能通过--------
// hello = 1;
```

将以上错误代码注释掉后，构建就能通过了 ，不再报错

```shell
npm run build
```

注：

以上就是 `ts-loader` 中 `transpileOnly` 配置项的用法

- 在关闭的情况下，可以提高构建速度；
- 在开启的情况下，它会失去类型检查。我们需要额外的插件来进行工作，以上使用的是 `fork-ts-checker-webpack-plugin` 插件

### 4、awesome-typescript-loader

除了 `ts-loader` ，还有另一个 leader。 即：[awesome-typescript-loader(opens new window)](https://www.npmjs.com/package/awesome-typescript-loader)

`awesome-typescript-loader` 与 `ts-loader` 的主要区别

- ①、更适合与 Babel 集成，使用 Babel 的转义 和 缓存
- ②、不需要安装额外的插件，就可以把类型检查放在独立进程中进行

**编译时间对比（ms）**

| loader                    | 默认设置 | transpileOnly | transpileOnly + 类型检查进程 |
| :------------------------ | :------- | :------------ | :--------------------------- |
| ts-loader                 | 1600+    | 500+          | 3000+（时间较长）            |
| awesome-typescript-loader | 2200+    | 1600+         | 1600+（类型检查有遗漏）      |

以上两个 loader 在开启 `transpileOnly` 的情况下，构建时间都有明显的缩短。但在加入类型检查进程时，`ts-loader` 的构建时间反而比较长。

而 `awesome-typescript-loader` 是有一些缺陷的，如以上有明显的类型赋值错误 `hello = 1;` 但它无法检测出来。

> 综合对比下来，还是建议使用 `ts-loader` 默认的配置即可。

注：

这个 npm 包好久不更新了，而且类型检查的时候会有遗漏，所以不推荐使用

### 5、TypeScript 与 Babel

我们肯定会有一个疑问：使用了 TypeScript，为什么还需要 Babel ？

| 编译器 | 编译能力                     | 类型检查 | 插件     |
| :----- | :--------------------------- | :------- | :------- |
| TSC    | ts(x)、js(x) -> ES3/5/6/ ... | 有       | 无       |
| Babel  | ts(x)、js(x) -> ES3/5/6/ ... | 无       | 非常丰富 |

对比说明

- 从编译能力看：TSC 和 Babel 都可以将 TS 和 JS 编译成 ES3/5/6/ ... 更高级的版本
- 类型检查：Babel 没有检查能力，TSC 有
- 插件：围绕 Babel 社区提供了非常丰富的生态插件，周边生态系统也非常的完善，而 TSC 非常欠缺
- Babel 7 之前是不支持 TS 的，对于那些已经使用了 Babel 的项目如果想要使用 TS ，并不是一件容易的事情。需要结合前面介绍的 Webpack Loader 经过 loader 的转义 -> 转成 JS -> 再交给 Babel 处理，这是一件非常痛苦的事情。过程如下

> TS -> tsc（ts-loader / awesome-typescript-loader） -> JS -> Babel -> JS

- Babel 7 之后：已经支持 TS ，是与 TS 官方合作开发的，具有正统的官方血统 ！这时我们就不需要各种 loader 了。甚至在编译时抛弃了 TypeScript 让他去做唯一 Babel 不能去做的事情，即：类型检查。

> 过程如下

![image-20231003143616007](https://www.arryblog.com/assets/img/image-20231003143616007.7b63d791.png)

其实，我们确实完全没有必要同时来配置两个编译器，可以让各种工具都有 Babel 的生态系统来支持。这样也会让我们的构建系统更加统一、更加可维护。

> 接下来，我们就使用 Babel 来重新创建一个项目工程

### 6、使用 Babel 创建工程

新建一个项目，文件夹名称为 `ts-babel`

### 6.1、使用 npm 命令初始化工程

```shell
# npm 初始化生成 package.json 配置文件
npm init -y
```

### 6.2、安装 Babel 相关的依赖

```tsx
npm i @babel/cli -D
npm i @babel/core -D
npm i @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-proposal-object-rest-spread -D
npm i @babel/preset-env -D
npm i @babel/preset-typescript -D
```

以上依赖中

- `@babel/cli`、`@babel/core`、`@babel/preset-env` 是使用 Babel 必须的
- `@babel/preset-typescript` 用来编译 TS 文件
- `@babel/plugin-proposal-object-rest-spread` 插件，用来支持剩余 和 扩展运算符
- `@babel/plugin-proposal-class-properties` 插件，用来支持使用类的属性初始化器在类的定义中直接给属性赋值

### 6.3、Babel 配置文件

在 Babel 的配置文件 `.babelrc` 中

```json
{
  "presets": ["@babel/env", "@babel/preset-typescript"],
  "plugins": ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"]
}
```

> 以上将两个 presets 和 plugins 都引入进来 ！

### 6.4、编写文件并完成编译

新建文件 `src/index.ts`

```markdown
ts-babel
├─ node_modules
├─ .babelrc
├─ .gitignore
├─ package-lock.json
├─ package.json
└─ src
└─ index.ts
```

在 `src/index.ts` 文件中

```tsx
// 定义一个类
class A {
  a: number = 1
}

// 解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
// 扩展运算符
let n = { x, y, ...z }
```

编写编译脚本，在 `package.json` 中

```json
{
  "scripts": {
    "build": "babel src --out-dir dist --extensions \".ts,.tsx\""
  }
}

// 脚本中调用了 babel 命令，指定了输出目录，babel 是不能自动识别 .ts ，.tsx 文件，我们需要指定扩展名
```

在控制台中执行构建命令

```shell
npm run build
```

构建成功，整个过程就是一个最简单的 Babel + TS 的工程配置

![image-20231001175457739](https://www.arryblog.com/assets/img/image-20231001175457739.1bb99a27.png)

注：

整个过程我们并没有安装 TypeScript ，而是完全使用 Babel 作为编译工具编译了 TS 文件。通过前面的学习我们知道 Babel 是不能进行类型检查的。

> 如下测试，在 `src/index.ts` 中故意设置错误代码

```tsx
// 定义一个类
class A {
  a: number = 1
}

// 解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
// 扩展运算符
let n = { x, y, ...z }

// 在此故意写下一个明显的错误
n = 1
```

再次使用 Babel 构建

```shell
npm run build
```

![image-20231001180907923](https://www.arryblog.com/assets/img/image-20231001180907923.39b525b3.png)

在代码中有明显的错误代码时，同样也是编译成功了 ！并没有给出任何的错误提示。那么，如果我们想要引入类型检查该怎么办呢 ？

> 答案是：只能再次安装 TypeScript

### 6.5、安装 TypeScript

在命令行终端中输入

```shell
npm i typescript -D
```

新建 `tsconfig.json` 配置文件

```shell
tsc --init
```

在 `tsconfig.json` 配置文件中开启 `"noEmit": true` 选项

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}

// 开始该选项表示 TS 不会输出任何文件只会做类型检查（不生成编译产物，只进行类型检查）
```

再在 `package.json` 中，添加类型检查脚本

```json
{
  "scripts": {
    "build": "babel src --out-dir dist --extensions \".ts,.tsx\"",
    "type-check": "tsc --watch"
  }
}
```

执行类型检查脚本，需要重新开一个命令行终端（独占一个终端），在执行如下命令

```shell
npm run type-check
```

![image-20231001233133273](https://www.arryblog.com/assets/img/image-20231001233133273.0ce3e25e.png)

> 此时，就会实时监控编码中的类型错误 ！

将 `src/index.ts` 中的错误代码注释掉，命令行终端已经提示没有错误。

![image-20231001235018931](https://www.arryblog.com/assets/img/image-20231001235018931.bddad4c0.png)

注：

这样就将 TS 和 Babel 结合在一起了

- Babel 只做语言转换
- TS 只做类型检查

### 6.6、在 Babel 中使用 TS 注意事项

有四种语法在 Babel 中是无法编译的

- ①、命名空间，在 Babel 中编译会报错，已经过时了。即：Namespace 语法不推荐，改用标准的 ES6 module（import/export）

在 `src/index.ts` 中

```tsx
// 命名空间
namespace N {
  // 导出一个常量
  export const n = 123
}
```

![image-20231002134656126](https://www.arryblog.com/assets/img/image-20231002134656126.296587c0.png)

- ②、类型断言的语法

```tsx
// 定义一个类
class A {
  a: number = 1
}

// 声明对象 s
let s = {} as A
// 给 s 绑定 a 属性，此时 a 是没有定义的，可以给它断言成 class 类型（使用以上的 as 语法）
s.a = 1
```

- ③、const 常量枚举，在 Babel 中也会编译报错

```tsx
// 常量枚举，在 Babel 中也会编译报错
const enum E {
  A,
  B,
}
```

- ④、export 默认导出，在 Babel 中也会编译报错

```tsx
export = s
```

### 7、如何选择 TypeScript 编译工具

有三点建议：

- ①、如果没有使用过 Babel，首选 TypeScript 自身的编译器（可配合 `ts-loader` 使用）
- ②、如果项目中已经使用了 Babel，安装 `@bable/preset typescript`（可配合 tsc 做类型检查）
- ③、两种编译工具不要混用，这样只会增加工程的复杂度

## 二、代码检查工具 TSLint 和 ESLint

深入浅出代码检查工具的来龙去脉以及相关应用，Jest 工具的使用，babel-jest 工具的使用等。

### 1、TSLint 转向 ESLint 的原因

TypeScript 官方转向从 TSLint 转向 ESLint 的原因：

- ①、TSLint 执行规则的方式存在一些架构问题，从而影响了性能,而修复这些问题会破坏现有的规则;
- ②、ESLint 的性能更好，并且社区用户通常拥有 ESLint 的规则配置（比如针对 React 和 Vue 的规则），而不会拥有 TSLint 的规则配置。

这个决定受到了社区的广泛欢迎，毕竟大家都不想学习那么多的工具，掌握一个好用的就可以了。既然官方已经给出了方向，那我们就不把 TSLint 作为学习的方向了。重点掌握 ESLint 在 TS 中的应用即可 ！

### 2、使用了 TypeScript，为什么还需要 ESLint ？

从前面的学习中我们知道，TS 主要做两件事情：类型检查 和 语言转换，在这个过程中也会对语法错误进行检查。

而 ESLint 除了能够检查语法错误 还能 保证代码风格的统一，如：语句后面是不是要加上分号 `;` 。两者的功能有一些重合，但也各自有它独特的职责。

![image-20231003145953370](https://www.arryblog.com/assets/img/image-20231003145953370.7587d3aa.png)

但，如果要 ESLint 去检查 TS 的语法就会面临一些问题，它们在进行各自的工作之前都需要把代码转换成抽象语法树，即：AST 。而这两种语法树是不兼容的（如下图）

相反，TSLint 是完全基于 TS 的抽象语法树工作，这样的好处是没有兼容性问题，缺点是不能重用。这是目前社区已经围绕 ESLint 所做的工作了。这也是官方放弃 TSLint 的原因之一 ！

如何解决解决这种兼容性问题呢 ？我们需要使用一种 `typescript-eslint` 的项目，这个项目也是有官方血统的，所以我们可以放心的使用。它为 ESLint 专门提供了解析 TS 代码的编译器，可以把 TS 的语法树转换成 ESLint 所期望的语法树，即：ESTree

![image-20231003151810580](https://www.arryblog.com/assets/img/image-20231003151810580.e7091938.png)

### 3、如何在 TS 中使用 ESLint

基于前面的 hello world 工程进行改造

> 项目目录如下

```markdown
icoding-ts
├─ .eslintrc.json
├─ .gitignore
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│ ├─ index.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

安装 eslint 相关的依赖包

- `eslint`
- `@typescript-eslint/eslint-plugin` 插件，可使 ESLint 识别 TS 的特殊语法
- `@typescript-eslint/parser` 插件为 ESLint 提供解析器

```shell
npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

### 4、ESLint 配置

在 `.eslintrc.json` 中

```json
{
  // 指定 ESLint 解析器
  "parser": "@typescript-eslint/parser",
  // 指定 ESLint 识别 TS 的特殊语法的插件
  "plugins": ["@typescript-eslint"],
  // 指定 tsconfig 中的类型规则信息
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  // 具体规则为官方推荐的 recommended 规则，会默认指定一些规则
  "extends": ["plugin:@typescript-eslint/recommended"],
  "rules": {}
}
```

在 `package.json` 中，添加 lint 脚本

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.ts"
  }
}

// 该脚本会自动检查 .js 和 .ts 文件
```

在命令行终端中执行该脚本

```shell
npm run lint
```

![image-20231002213112122](https://www.arryblog.com/assets/img/image-20231002213112122.4ea0e193.png)

> 运行报错，由于 `src/index.ts` 中的变量 hello 从未使用过，建议使用 const 定义

```tsx
// let hello: string = "Hello TypeScript ! arry老师";

// 将 let 改为 const
const hello: string = 'Hello TypeScript ! arry老师'
console.log(hello)

// 将以上字符串插入到网页中
document.querySelectorAll('.app')[0].innerHTML = hello
```

> 将 let 改为 const 后，检查通过，即 正常运行 ！

![image-20231002213542750](https://www.arryblog.com/assets/img/image-20231002213542750.373ce272.png)

### 5、安装 ESLint 插件

除了使用脚本做代码检查，还可以安装 ESLint 的插件 ！来辅助开发。

![image-20231002215731413](https://www.arryblog.com/assets/img/image-20231002215731413.fa916a3f.png)

安装成功后，在代码编译阶段将自动提示报错 ！

![image-20231002221032280](https://www.arryblog.com/assets/img/image-20231002221032280.008c128d.png)

> 点击快速修复，错误即可自动修复 ！

![image-20231002221618435](https://www.arryblog.com/assets/img/image-20231002221618435.a37c8755.png)

成功修复后，效果如下

![image-20231002221704161](https://www.arryblog.com/assets/img/image-20231002221704161.d55f2012.png)

在 VSCode 的 `settings.json` 配置文件中，加入以下配置项

```json
{
  // Ctrl + S 即可自动修复不符合 ESLint 要求的代码
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

![GIF-2023-10-2-22-28-21](https://www.arryblog.com/assets/img/GIF-2023-10-2-22-28-21.ad3928df.gif)

### 6、babel-eslint 与 typescript-eslint

如果我们使用过 Babel ，也使用过 Babel 的 ESLint，接下来对比 babel-eslint 与 typescript-eslint，它们两者之间的区别如下。

- `babel-eslint`：支持 TypeScript 没有的额外的语法检查，抛弃 TypeScript，不支持类型检
- `typescript-eslint`：基于 TypeScript 的 AST，支持创建基于类型信息的规则（`tsconfig.json`）

**使用建议：**

- 两者底层机制不一样，不要一起使用
- Babel 体系建议使用 babel-eslint，否则可以使用 typescript-eslint

> 以上内容是关于 TS 代码检查工具的演化过程

## 三、Jest 单元测试

Jest 是由 Facebook 开源的一款 JavaScript 测试框架。它非常易于使用，快速而且功能强大，被广泛用于 React 项目 和 Node.js 应用程序。

### 1、TypeScript 工具体系

TS 的工具体系基本分成了 Babel 系 和 非 Babel 系，单元测试也不例外

![image-20231003152913730](https://www.arryblog.com/assets/img/image-20231003152913730.e8088527.png)

注：

我们可以使用 Babel 系的 `babel-jest` ，它和 Babel 系的工具具有同样的缺点，即：对测试代码进行类型检查。

如果需要类型检查，就要使用非 Babel 系的 `ts-jest` ，接下来就学习这两种工具的使用

### 2、Jest 工具的使用

依然在前面 `hello world` 工程中来实现

> 工程目录如下

```markdown
icoding-ts
├─ .eslintrc.json
├─ .gitignore
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│ ├─ index.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

### 2.1、安装 Jest 相关包

在命令行终端中输入如下命令，安装三个包 `jest` 、`ts-jest` 和 `@types/jest`

```shell
npm i jest ts-jest @types/jest -D
```

在 `package.json` 中配置测试脚本

```json
{
  "scripts": {
    // 添加测试脚本
    "test": "jest"
  }
}
```

### 2.2、生成 Jest 的配置文件

在命令行终端中输入如下命令，即可生成

```shell
npx ts-jest config:init
```

通过该命令生成了一个 `jest.config.js` 配置文件

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // 指定 preset 是 ts-jest
  preset: 'ts-jest',
  // 测试环境为 node
  testEnvironment: 'node',
}
```

### 3、编写测试用例

下面会编写两个简单的函数，再为它们编写一个测试用例

新建 `src/math.ts` 文件

```tsx
// 定义加法函数
function add(a: number, b: number) {
  return a + b
}

// 定义减法函数
function sub(a: number, b: number) {
  return a - b
}

// 将函数导出
module.exports = {
  add,
  sub,
}
```

编写测试用例，在根目录中新建 `test` 文件夹，同时新建 `test/math.test.ts` 文件

```tsx
// 导入 math 文件
const math = require('../src/math')

// 编写第一个测试用例
test('add: 1 + 1 = 2', () => {
  expect(math.add(1, 1)).toBe(2)
})

test('add: 1 - 2 = -1', () => {
  expect(math.sub(1, 2)).toBe(-1)
})
```

此时，第一行代码报错了 “Require 语句不是导入语句的一部分”

![image-20231002233024700](https://www.arryblog.com/assets/img/image-20231002233024700.db529750.png)

解决办法，在 `.eslintrc.json` 配置文件 `rules` 节点中添加如下选项即可

```json
{
  "rules": {
    // 关闭 不允许使用 require 语句的检查
    "@typescript-eslint/no-var-requires": "off"
  }
}
```

运行测试脚本

```shell
npm run test
```

![image-20231002234029531](https://www.arryblog.com/assets/img/image-20231002234029531.4da45477.png)

> 以上两个测试用例都已经通过了，使用 TS 的 Jest 的好处是：它能够在测试用例中进行类型检查。

在 `test/math.test.ts` 中定义一个变量，故意制造一个明显的类型错误

```tsx
// 故意制造一个明显的类型错误
const x: number = 'icoding'
```

再次运行测试脚本，观察是否能够检测出来

```shell
npm run test
```

![image-20231002234610928](https://www.arryblog.com/assets/img/image-20231002234610928.1976c28b.png)

> 运行测试脚本后，明确提示错误：不能将字符串赋值给 number

### 4、babel-jest 工具的使用

打开我们前面用到的 `ts-babel` 项目

> 目录结构如下

```markdown
ts-babel
├─ .babelrc
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ src
│ └─ index.ts
└─ tsconfig.json
```

安装 `jest`、`babel-jest` 和`@types/jest`

```shell
npm i jest babel-jest @types/jest -D
```

### 4.1、编写测试用例

下面会编写两个简单的函数，再为它们编写一个测试用例

新建 `src/math.ts` 文件

```tsx
// 定义加法函数
function add(a: number, b: number) {
  return a + b
}

// 定义减法函数
function sub(a: number, b: number) {
  return a - b
}

// 将函数导出
module.exports = {
  add,
  sub,
}
```

编写测试用例，在根目录中新建 `test` 文件夹，同时新建 `test/math.test.ts` 文件

```tsx
// 导入 math 文件
const math = require('../src/math')

// 编写第一个测试用例
test('add: 1 + 1 = 2', () => {
  expect(math.add(1, 1)).toBe(2)
})

test('add: 1 - 2 = -1', () => {
  expect(math.sub(1, 2)).toBe(-1)
})

const x: number = 'icoding'
```

在 `package.json` 配置文件中，添加测试脚本

```json
{
  "scripts": {
    // 添加测试脚本
    "test": "jest"
  }
}
```

再次运行测试脚本，观察是否能够检测出来

```shell
npm run test
```

![image-20231003000154238](https://www.arryblog.com/assets/img/image-20231003000154238.4b83ee82.png)

> 从运行结果可以看到，两个测试用例都成功检查通过了 ！但 并没有进行类型检查，以上明显的赋值错误并没有检查出来。

### 4.2、启动类型检查脚本

如果要进行类型检查，我们仍然需要启动类型检查脚本

新开一个命令行终端中输入如下命令

```shell
npm run type-check
```

![image-20231003012843082](https://www.arryblog.com/assets/img/image-20231003012843082.8cb2f4f2.png)

> 运行命令脚本后，在控制台会实时监听所有错误信息，可根据错误提示来修改对应的代码即可

![image-20231003013114222](https://www.arryblog.com/assets/img/image-20231003013114222.b77025ee.png)

> 修改后，控制提示通过检查 ！

## 四、TS 工程实践知识总结

总结 TypeScript 工程实践部分所学到的所有知识点，模块系统、命名空间，声明合并，`tsconfig.json` 主要配置，编译工具，代码检查工具，单元测试。

### 1、模块系统

| 模块系统      | 导入    | 导出                   | 描述                              |
| :------------ | :------ | :--------------------- | :-------------------------------- |
| ES6 模块      | import  | export export default  | ES6 模块 与 CommonJS 模块不兼容   |
| CommonJS 模块 | require | exports module.exports | Node 环境运行 ts 文件使用 ts-node |

注：

处理两个模块系统（ES6 和 CommonJS ）模块之间的不兼容性问题，解决方案有两个：

- 两种模块系统不要混用
- 如果你的 ES6 模块有一个顶级导出，而且可能会被 node 模块引用，TS 为我们提供了兼容性的语法

```tsx
// export = 的方式，编译后就是 module.exports 就相当于 CommonJS 中的顶级导出
export = x
import x = require
```

### 2、命名空间

| 实现原理               | 要点                                                                                                | 描述               |
| :--------------------- | :-------------------------------------------------------------------------------------------------- | :----------------- |
| 立即执行函数构成的闭包 | 局部变量对外不可见 导出成员对外可见 多个文件可共享同名命名空间 依赖关系 `/// <reference path="" />` | 注：不要与模块混用 |

### 3、声明合并

定义：多个具有相同名称的声明会合并为一个声明

| 合并类型           | 描述                                                                                                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 接口之间合并       | 非函数成员保证唯一性 函数成员成为函数重载，重载的顺序如下： ①、函数参数为字符串字面量，提升到最顶端 ②、接口之间，后面的接口靠前 ③、接口内部，按书写顺序 |
| 命名空间之间合并   | 导出的成员不可重复定义或实现                                                                                                                            |
| 命名空间与类合并   | 为类添加静态成员                                                                                                                                        |
| 命名空间与函数合并 | 为函数添加属性和方法                                                                                                                                    |
| 命名空间与枚举合井 | 为枚举添加属性和方法                                                                                                                                    |

注：

命名空间要在类和函数声明之后

### 4、tsconfig.json 主要配置

TypeScript 中 `tsconfig.json` 配置文件中的主要配置信息，包括：文件选项、编译选项、工程引用

> 详细配置项，点击查阅 [https://www.arryblog.com/vip/ts/note-tsconfig-tsc.html(opens new window)](https://www.arryblog.com/vip/ts/note-tsconfig-tsc.html)

### 4.1、文件选项

| 文件选项 | 描述                   |
| :------- | :--------------------- |
| files    | 需要编译的单个文件列表 |
| inclue   | 需要编译的文件或目录   |
| exclude  | 需要排除的文件或目录   |
| extends  | 配置文件继承           |

### 4.2、编译选项

| 编译选项             | 描述                                           |
| :------------------- | :--------------------------------------------- |
| incremental          | 增量编译                                       |
| target               | 目标语言                                       |
| module               | 目标模块系统                                   |
| outFile              | 将多个依赖文件生成一个文件（amd 模块）         |
| lib                  | 引用类库                                       |
| allowJs              | 允许编译 JS 文件                               |
| outDir               | 输出目录                                       |
| rootDir              | 输入目录，用于调整输出目录结构                 |
| declaration          | 生成声明文件                                   |
| sourceMap            | 生成 sourceMap                                 |
| noEmit               | 不输出文件                                     |
| esModuleInterop      | 允许 `export =` 导出，由 `import from` 导入    |
| allowUmdGlobalAccess | 允许在模块中访问 UMD 全局变量                  |
| moduleResolution     | 模块解析策略                                   |
| baseUrl              | 解析非相对模块的基地址                         |
| paths                | 路径映射，相对于 baseUrl                       |
| rootDirs             | 将多个目录放在一一个虚拟目录下，方便运行时访问 |

`"strict": true` 选项，这个设置相当于同时打开以下的一系列设置

| 编译选项                     | 描述                                                            | 代码                                                                                              |
| :--------------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| alwaysStrict                 | 总是在编译产物的头部添加`use strict`                            | 注入 `"use strict"`                                                                               |
| noImplicitAny                | 类型推断只要为`any`类型就报错                                   | `function(x) {}`                                                                                  |
| strictNullChecks             | 对`null`和`undefined`进行严格类型检查                           | `let x: number = null`                                                                            |
| strictFunctionTypes          | 允许对函数更严格的参数检查                                      | `let a = (x: number) => {}` `let b = (y?: number) => {}` `b = a`                                  |
| strictPropertyInitialization | 类的属性必须进行初始值，但是允许在构造函数里面赋值              | `class C {` `x: number` `}`                                                                       |
| strictBindCallApply          | 是否对函数的`call()`、`bind()`、`apply()`这三个方法进行类型检查 | `function add(x: number, y: number) {` `return x + y;` `}` `add.call(undefined, 1, '2')`          |
| noImplicitThis               | 设置如果`this`被推断为`any`类型是否报错                         | `class B {` `a: number = 1;` `getA() {` `return function () {` `console.log(this.a);` `}` `}` `}` |

### 4.3、工程引用

| 选项             | 描述                                 |
| :--------------- | :----------------------------------- |
| composite        | 工程可以被引用和进行增量编译         |
| declaration      | 必须开启                             |
| references       | 该工程所依赖的工程                   |
| tsc --build 模式 | 单独构建一个工程，依赖工程也会被构建 |

### 5、编译工具

| 编译工具                  | 配置描述                                                                                                                                                                                                                                                                                                     |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ts-loader                 | 默认配置 transpileOnly：只做语言转换，不做类型检查 fork-ts-checker-webpack-plugin：独立的类型检查进程                                                                                                                                                                                                        |
| awesome-typescript-loader | 默认配置 transpileOnly：只做语言转换，不做类型检查 CheckerPlugin（内置）：独立的类型检查进程                                                                                                                                                                                                                 |
| Babel                     | **只做语言转换：** `@babel/preset-typescript` `@babe/proposal-class-properties` `@babel/proposal-object-rest- spread` **`tsc --watch` 模式：** 类型检查 **无法编译的 TypeScript 特性：** ①、namespace：不要使用 ②、`<typename>` 类型断言，改用 `as typename` ③、`const enum` 未来可期 ④、`export =` 不要使用 |

### 6、代码检查工具

| 检查工具           | 描述                                                                                                                                                                                                |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TSLint             | 官方已弃用                                                                                                                                                                                          |
| ESLint             | eslint：与 TypeScript 的 AST 不兼容 typescript-eslint： ①、`@typescript- eslint/parser`：替换 ESLint 的解析器 ②、`@typescript- eslint/eslint- plugin`：使 ESLint 能够识别一些特殊的 TypeScript 语法 |
| VSCode ESLint 插件 | `Ctrl + S` 即可自动修复不符合 ESLint 要求的代码 在 `settings.json` 文件中配置如下： `"editor.codeActionsOnSave": {` `"source.fixAll.eslint": true` `}`                                              |
| babel- eslint      | 适用于 Babel 体系                                                                                                                                                                                   |

### 7、单元测试

| 工具       | 描述       |
| :--------- | :--------- |
| ts-jest    | 有类型检查 |
| babel-jest | 无类型检查 |
