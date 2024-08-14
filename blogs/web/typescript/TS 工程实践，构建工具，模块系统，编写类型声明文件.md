---
title: TS 工程实践，构建工具，模块系统，编写类型声明文件
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
  - TS 工程实践
publish: true
---

# TS 工程实践，构建工具，模块系统，编写类型声明文件



随着前端应用越来越复杂，多人协作开发成为了一种常态，而模块化的开发方式也被广泛接受了。然而这却是一个渐进的过程，在这个过程中曾经诞生过许多的模块化解决方案，如：CommonJS、AMD、CMD 等等

经历了时间的沉淀，最终目前最常用的两种方案：一种是 ES6 的模块，一种是 CommonJS 的模块。

> TS 对这两种模块系统都有比较好的支持，接下来我们会先回顾下两个模块系统，然后对比它们之间的兼容性问题。

## 一、TS 基础环境搭建



在基础阶段，我们已经搭建配置过 TS 的基础环境了，这里我们再简单熟悉一下

> 在 TS 的环境搭建中，预装软件只有两个：Node.js 和 VSCode

### 1、创建项目和基础配置



创建一个项目，文件夹名称为 `icoding-ts`

使用 npm 命令初始化工程

```shell
# npm 初始化生成 package.json 配置文件
npm init -y
```

全局安装 TypeScript

```shell
# 全局安装 TS，好处：在任何地方都可以使用 TS 的编译器 即：tsc
npm i typescript -g
```

安装好 TS 编译器后，就可以在命令行中使用 tsc 命令了

```shell
# 查看 TS 的版本
tsc -v

# 查看 TS 的帮助信息，可以看到编译器有很多的配置项，大部分都可以通过配置文件来实现
tsc -h
```

### 2、创建 TS 的配置文件



初始化 TS 配置文件

```shell
tsc --init
```

![image-20230803160103957](https://www.arryblog.com/assets/img/image-20230803160103957.0f43410a.png)

### 3、编译 TS 文件



在 VSCode 命令行终端中

```shell
# 通过 tsc 编译 .ts 文件
tsc .\src\index.ts

# 运行编译后的 .js 文件
node .\src\index.js

# 输出
Hello TS !
```

![image-20230803162131150](https://www.arryblog.com/assets/img/image-20230803162131150.235d0666.png)

## 二、配置构建工具



我们这里使用常见的 Webpack ，如果暂时不熟悉也没有关系，只是为了让 TS 的功能跑起来，同时作为体验。Webpack 只是一个工具而已。

### 1、Webpack 配置安装



需要先安装三个包 `webpack`、`webpack-cli`、`webpack-dev-server`

```shell
npm i webpack webpack-cli webpack-dev-server -D
```

在配置 Webpack 时，我们需要区分开发环境 和 生产环境，这两个环境的配置是不一样的，需要做不同的事情。

为了工程的可维护性，需要把开发环境的配置、生产环境的配置、公共配置分开来书写，最后通过插件来合并

> 在项目根目录下先创建一个 build 文件目录（再创建 4 个配置文件），用来存放所有的配置文件的目录

```markdown
icoding-ts
├─ build
│ ├─ webpack.base.config.js # 公共环境的配置
│ ├─ webpack.config.js # 所有配置文件的入口
│ ├─ webpack.dev.config.js # 开发环境的配置
│ └─ webpack.pro.config.js # 生产环境的配置
├─ package.json
├─ src
│ ├─ index.js
│ └─ index.ts
└─ tsconfig.json
```

### 2、公共环境的配置



`build/webpack.base.config.js` 配置公共环境

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口文件
  entry: "./src/index.ts",
  // 输出文件，输出目录 dist（默认）
  output: {
    filename: "app.js",
  },
  // 指定扩展名，分别为 .js 、.ts 、.tsx
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  // 引入了新的文件 TypeScript，就需要安装相应的 loader，我们使用 ts-loader
  module: {
    rules: [
      {
        // ts-loader 的正则，以 ts 或 tsx 结尾的文件
        test: /\.tsx?$/i,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        // 排除 node_modules 下的文件
        exclude: /node_modules/,
      },
    ],
  },
  // 插件
  plugins: [
    // HtmlWebpackPlugin 插件，作用：通过一个模板，帮助我们生成网站的首页，同时可以把输出文件自动嵌入到该文件中
    new HtmlWebpackPlugin({
      // 在 ./src/tpl/ 目录下创建 index.html 文件
      template: "./src/tpl/index.html",
    }),
  ],
};
```

在命令终端中输入命令行，安装 `ts-loader`

```shell
npm i ts-loader typescript -D
```

> 注：安装 ts-loader 时，需要再次本地安装一下 typescript

安装插件 `html-webpack-plugin`

```tsx
npm i html-webpack-plugin -D
```

在 `src` 目录下新建 `tpl` 文件夹 -> 新建 `index.html` 文件，项目目录结构如下

```text
icoding-ts
├─ build
│  ├─ webpack.base.config.js
│  ├─ webpack.config.js
│  ├─ webpack.dev.config.js
│  └─ webpack.pro.config.js
├─ package.json
├─ README.md
├─ src
│  ├─ index.js
│  ├─ index.ts
│  └─ tpl
│     └─ index.html # 新建 index.html 文件
└─ tsconfig.json
```

在 `/src/tpl/index.html` 中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript</title>
  </head>
  <body>
    <!-- 定义一个 class="app" 的 div -->
    <div class="app"></div>
  </body>
</html>
```

### 3、开发环境中的配置



`build/webpack.dev.config.js` 配置开发环境

```js
module.exports = {
  // 在开发环境中开启 source-map，也是官方推荐的配置
  // cheap 表示 source-map 会忽略文件的列信息，因为在调试时列信息是没有用的
  // module 会定位到 TS 的源码，而不是经过 loader 转译后的 JS 源码
  // eval-source-map 会将 source-map 以 dataURL 的形式打包到文件中，它的重编译速度是很快的，因此也不必担心性能问题
  devtool: "cheap-module-eval-source-map",
};
```

### 4、生产环境中的配置



在生产环境中需要安装一个插件 `clean-webpack-plugin`

**作用：** 是在每次成功构建之后，帮助我们清空 dist 目录。

> 有的时候为了避免缓存，我们需要在文件后加入 Hash ，这样在多次构建后就会产生很多无用的文件。通过这个插件就可以帮助我们自动的清空 dist 目录。

```shell
# 本地安装 clean-webpack-plugin 插件
npm i clean-webpack-plugin -D
```

`build/webpack.pro.config.js` 配置生产环境

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

### 5、所有配置文件入口的配置



需要用到 `webpack-merge` 插件，它的作用是将两个配置文件合并

```shell
# 本地安装 webpack-merge 插件
npm i webpack-merge -D
```

`build/webpack.config.js` 配置所有配置文件的入口

```js
// webpack-merge 插件，它的作用是将两个配置文件合并
const { merge } = require("webpack-merge");
// 引入三个配置文件（公共环境配置、开发环境配置、生产环境配置）
const baseConfig = require("./webpack.base.config");
const devConfig = require("./webpack.dev.config");
const proConfig = require("./webpack.pro.config");

// 定义一个 config 变量
// 判断当前的环境变量，如果是开发环境，就选用开发环境的配置，否则就选用生产环境的配置
let config = process.NODE_ENV === "development" ? devConfig : proConfig;

// 将 baseConfig 和 config 合并
module.exports = merge(baseConfig, config);
```

> 配置工作完成后，最后再修改 npm 的脚本

### 6、修改 npm 的脚本



打开 `package.json` 文件，更改入口 和 编写启动开发环境的命令

```json
{
  "name": "icoding-ts",
  "version": "1.0.0",
  "description": "",
  // 更改入口文件
  "main": "./src/index.ts",
  "scripts": {
    // 启动开发环境的命令
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

注：

- 添加启动开发环境的命令 start 中需要用到 `webpack-dev-server`
- 指定 `--mode` 参数为 `--mode=development` ，即：将当前环境变量设置为 `development`
- 再指定配置文件 `--config` 为 `./build/webpack.config.js`

### 7、启动运行

在控制台输入命令，启动运行

```shell
npm start
```

在浏览器地址栏中输入 `http://localhost:8080/` 即可看到页面

![image-20230803231903206](https://www.arryblog.com/assets/img/image-20230803231903206.fb8116fd.png)

修改 `./src/index.ts` 文件

```tsx
let hello: string = "Hello TS ！";
console.log(hello);

// 将以上字符串插入到页面中
document.querySelectorAll(".app")[0].innerHTML = hello;
```

![image-20230803232005127](https://www.arryblog.com/assets/img/image-20230803232005127.3990fae4.png)

### 8、构建生产环境



编写构建生产环境的脚本，新增 `build`。在 `package.json` 中 新增 `build` 选项

```json
{
  "name": "icoding-ts",
  "version": "1.0.0",
  "description": "",
  "main": "./src/index.ts",
  "scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    // 新增
    "build": "webpack --mode=production --config ./build/webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "html-webpack-plugin": "^5.5.3",
    "ts-loader": "^9.4.4",
    "typescript": "^5.1.6",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "webpack-merge": "^5.9.0"
  }
}
```

注：

- 构建生产环境的脚本，取名叫 `build`
- 需要用到 `webpack` 命名，指定 `--mode`参数为 `--mode=production` 即：当前的环境变量
- 指定配置文件 `--config` 为 `./build/webpack.config.js`

### 9、运行构建命令

在控制台输入如下命令

```shell
npm run build
```

![image-20230803234020312](https://www.arryblog.com/assets/img/image-20230803234020312.187adbb9.png)

可以看到已经生成了一个 `dist` 目录，构建好的 `app.js` 也已经嵌入到了模板文件中

![image-20230803234434436](https://www.arryblog.com/assets/img/image-20230803234434436.dde74c80.png)

## 三、ES6 与 CommonJS 的模块系统



先简单回顾下 ES6 的模块化系统，在 `src` 文件夹下新建了一个 `es6` 文件，同时创建 3 个 TS 文件

```markdown
icoding-ts
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ dist
│ ├─ app.js
│ └─ index.html
├─ package-lock.json
├─ package.json
├─ src
│ ├─ es6 # 新建
│ │ ├─ a.ts
│ │ ├─ b.ts
│ │ └─ c.ts
│ ├─ index.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

其中有三个模块：分别是 `a.ts` 、`b.ts` 、`c.ts` ，它们之间的依赖关系是

- `c.ts` 依赖了 `a.ts`
- `a.ts` 依赖了 `b.ts`

为了看出最后的执行效果，我们在 `/src/index.ts` 中，将 es6 下 `c` 模块引入进来

```tsx
import "./es6/c";
```

### 1、ES6 模块的导出



ES6 的导出是通过 export 语句来实现

- 单独导出一个变量
- 将多个变量放入一个对象中，批量导出
- 在 TS 中，ES6 也可以单独导出一个接口 或 导出一个函数
- 在导出时，可以给变量取一个别名
- ES6 也有默认的导出 `export default` 默认导出时函数是不需要取名字的，如果取也可以，但在导入时时无效的
- ES6 也可以引入外部的模块，然后重新导出

在 `/src/es6/a.ts` 中

```tsx
// 单独导出
export let a = 1;

// 批量导出
let b = 2;
let c = 3;
export { b, c };

// 导出接口
export interface P {
  x: number;
  y: number;
}

// 导出函数
export function f() {}

// 导出时起别名
function g() {}
export { g as G }; // G 为别名

// 默认导出，无需函数名
export default function () {
  console.log("I'm default");
}

// 引入外部模块，重新导出
export { str as hello } from "./b";
```

> 以上就是关于 ES6 模块的导出，接下来再来看导入

### 2、ES6 模块的导入



- 使用 `{}` 的形式批量导入
- 导入接口
- 导入时起别名
- 导入模块中的所有成员，绑定在 All 上
- 不加 `{}`，导入默认

在 `/src/es6/c.ts` 中

```tsx
import { a, b, c } from "./a"; // 批量导入
import { P } from "./a"; // 导入接口
import { f as F } from "./a"; // 导入时起别名
import * as All from "./a"; // 导入模块中的所有成员，绑定在 All 上
import myFunction from "./a"; // 不加{}，导入默认

// 打印输出，批量导入的变量值
console.log(a, b, c); // 1 2 3

// 导入一个接口，该接口就可以约束模块中的变量
let p: P = {
  x: 1,
  y: 1,
};

// 打印输出 All 变量，All 中包含了所有 a 模块中导出的变量
console.log(All);

// 打印输出 默认导入
myFunction();
```

![image-20230804161351005](https://www.arryblog.com/assets/img/image-20230804161351005.4b795ba5.png)

### 3、CommonJS 模块



node 是 CommonJS 一种实现，在 `src` 下新建一个 `node` 文件夹，下面有三个模块

```markdown
icoding-ts
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ dist
│ ├─ app.js
│ └─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│ ├─ es6
│ │ ├─ a.ts
│ │ ├─ b.ts
│ │ └─ c.ts
│ ├─ index.ts
│ ├─ node # 新增
│ │ ├─ a.node.ts
│ │ ├─ b.node.ts
│ │ └─ c.node.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

注：

其中有三个模块：分别是 `a.node.ts` 、`b.node.ts` 、`c.node.ts` ，它们之间的依赖关系是：`c.node.ts` 依赖了 `a.node.ts` 和 `b.node.ts`

### 4、node 模块的导出



node 模块的导出，可以把该模块中所有的变量作为一个整体导出。使用 `module.exports` 语法导出

在 `/src/node/a.node.ts` 中

```tsx
let a = {
  x: 1,
  y: 2,
};

// 整体导出
module.exports = a;
```

也可以使用 `exports.` 的语法导出多个变量，其中 exports 本质上是 `module.exports` 的引用

在 `/src/node/b.node.ts` 中

```tsx
// exports === module.exports

// exports  本质上是 module.exports 的引用

// 导出多个变量
// module.exports = {}
exports.c = 3;
exports.d = 4;
```

### 5、node 模块的导入



使用 `require` 语句导入即可

在 `/src/node/c.node.ts` 中

```tsx
let c1 = require("./a.node");
let c2 = require("./b.node");

// 打印输出导入的结果
console.log(c1);
console.log(c2);
```

> 由于以上编写的是 node 模块，因此我们会在 node 环境下运行（node.js 是默认寻找 JS 文件的，因此是需要将 TS 文件编译成 JS 文件后才能运行）

需要安装一个工具才能实现，TS 编译成 JS 文件

```shell
npm i ts-node -g
```

编译执行 TS 文件（在控制台执行如下命令）

```shell
ts-node .\src\node\c.node.ts
```

![image-20230805150229638](https://www.arryblog.com/assets/img/image-20230805150229638.f3f583d4.png)

### 6、总结



以上我们对 ES6 与 CommonJS 的模块系统进行了简单的回顾，可以看到 TS 对这两个模块系统都有很好的支持。

> 以上都是在开发环境下运行，在生产环境中这两个模块系统会被构建成什么样子呢 ？

### 7、在生产环境中模块系统的构建



我们来研究两个编译的选项，在 `tsconfig.json` 配置文件中

```json
{
  "compilerOptions": {
    // target：我们要编译成的目标语言是什么版本
    // 在 TS 默认生成的 tsconfig.json 中，target 默认值 为 ES7，在命名终端中 tsc 的命令默认值是 ES3
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // module：指定生成的模块代码
    "module": "commonjs" /* Specify what module code is generated. */
  }
}
```

配置选项解读：

- `target` 选项：是我们要编译成的目标语言是什么版本。在命名终端中 tsc 的命令默认值是 ES3
- 除了 `ES2016` 还可以选择 `ES3`、`ES5` 、`ES2015` 、`ES2017` 、`ES2018`、`ES2019`、or `ESNEXT`
- `module` 选项：要把我们的代码编译成什么样的模块系统，无论是 `tsconfig.json` 还是在命令行中 module 的默认选项都是 `commonjs` 。除了 `commonjs` 之外还可以编译成其它的模块，如：`amd` 、`system` 、`umd` 、`ES2015` 等等 以及最新的 。

### 7.1、编译 ES6 的模块



在控制台中输入命令，编译 ES6 的 `/src/es6/a.ts` 模块

**注：** 如果在命令行中指定了输入文件，那么 TS 就会自动忽略 `tsconfig.json` 配置文件，所有的配置只能在命令行中使用

```shell
# target 简写 -t ，编译成 ES3
tsc .\src\es6\a.ts -t es3
```

> 执行以上命令行，会报错 ！因为在 TypeScript 5.5 中已经弃用 `target = ES3` 了

![image-20230807162452029](https://www.arryblog.com/assets/img/image-20230807162452029.fb07c968.png)

将 `/src/es6/a.ts` 模块编译成 ES5，在命令终端中输入如下命令

```shell
tsc .\src\es6\a.ts -t es5
```

![image-20230807162951556](https://www.arryblog.com/assets/img/image-20230807162951556.127df41d.png)

注：

编译后，可以看到 `es6` 文件夹下多了 `a.js` 和 `b.js` 文件，因为 a 依赖了 b 中的模块。

同时，我们可以看到 `defineProperty` 属性，这是 ES5 的属性。也编译成了 CommonJS 模块 ！

将 `/src/es6/a.ts` 模块编译成 ES6，在命令终端中输入如下命令

```shell
tsc .\src\es6\a.ts -t es6
```

![image-20230807164755810](https://www.arryblog.com/assets/img/image-20230807164755810.fc524599.png)

注：

编译成 ES6 后，模块就默认指定为 ES6 模块了，在命令行中如果 target 是 ES5 的话，module 就默认指定为 ES6

不指定 target 选项，直接指定 module 选项为 `amd`

```shell
tsc .\src\es6\a.ts -m amd
```

![image-20230807170316851](https://www.arryblog.com/assets/img/image-20230807170316851.7dea7e58.png)

注：

以上编译后的代码，我们如果使用过 requireJS 的话，就会对以上代码看着很熟悉，这就是一个 amd 模块。

不指定 target 选项，直接指定 module 选项为 `umd`

```shell
tsc .\src\es6\a.ts -m umd
```

![image-20230807181522329](https://www.arryblog.com/assets/img/image-20230807181522329.ff4a9e7d.png)

注：

以上使用 umd 模块编译后的代码，这种类型的代码就是我们日常看到的类库的代码编写方式。

> 通常情况下，我们会使用 tsc 的默认配置即可

- `target` 默认为 `es2016`
- `module` 默认为 `commonjs`

这就引出了两个模块系统的兼容性问题，因为我们在编译时会默认把所有的模块都编译成 `commonjs` 模块。TS 在处理 ES6 模块的默认导出导入时就会做一些特殊的处理，接下来我们来研究是怎么处理的 ？

### 7.2、TS 模块系统的兼容性问题

编译 ES6 模块下的 `./src/es6/c.ts` 模块

```shell
tsc .\src\es6\c.ts
```

![image-20230807213516598](https://www.arryblog.com/assets/img/image-20230807213516598.61c92ebe.png)

注：

以上执行 tsc 命令后，3 个模块都被编译了

- 在 a 模块中，本身默认导出的是一个函数，编译后该函数被指定了一个默认的名称叫 `default_1`
- 最重要的改变是默认函数 `default_1` 被绑定在了 `exports.default` 属性上，也就是说这个默认的导出不再是整个模块的顶级属性了
- 在 `/src/es6/c.js` 中导入时，也需要通过 default 属性来调用这个函数

> 之所以这样处理，是因为两个模块系统（ES6 模块 和 node 模块）在处理顶级导入导出时是不兼容的。

两个模块系统对比

- 在 ES6 中，允许一个模块有一个顶级导出，即 `export default` 。同时也允许有自己的导出，即 `export` （如：`/src/es6/a.ts` 中）
- 在 CommonJS 中，只允许一个模块有一个顶级的导出，即 `module.exports`（如：`/src/node/a.node.ts` 中）

如果一个模块中有自己的导出，以 `exports.` 的形式，是不会再有一个顶级的导出

在 `/src/b.node.ts` 中

```tsx
// exports === module.exports

// module.exports = {}

// 导出多个变量
exports.c = 3;
exports.d = 4;

// 如果一个模块中有自己的导出，如以上 `exports.` 的形式，是不会再有一个顶级的导出
// 我们定义一个顶级的导出，此时就会覆盖上面的 多个变量的导出（即便将以下代码放到最上边 同样也会覆盖）
module.exports = {};
```

![image-20230807222627738](https://www.arryblog.com/assets/img/image-20230807222627738.3e437733.png)

注：

运行后，可以看到 `module.exports = {}` 完全覆盖了 导出的多个变量定义的部分。由此就可以看到两个模块不兼容的地方

如果我们在程序中都使用 ES6 模块的话，是不会有问题的 ！因为 TS 在编译后的 `/src/es6/a.js` 中 `exports.default = default_1;` 添加上了 `.default` ，对于我们开发者来说是无感知的。

在调用时，在 `/src/es6/c.js` 中 `(0, a_2.default)();` 也会自动加上 `.default` 。

> 但如果一个模块用 ES6 的方式做了默认的导出，另一个模块用非 ES6 的方式做了导入就会产生问题。（如下）

### 7.3、在 node 模块中 导入 ES6 模块

在 node 模块 `/src/node/c.node.ts` 中 导入 ES6 模块 `/src/es6/a.ts`

```tsx
let c1 = require("./a.node");
let c2 = require("./b.node");

// 在 node 模块中 导入 ES6 模块
let c3 = require("../es6/a");

console.log(c1);
console.log(c2);
// 因为在 a 模块中会默认导出一个函数，所以我们自然的会认为 c3 也是一个函数
// 执行会报错，c3 不是一个函数
c3();
```

![image-20230810163807712](https://www.arryblog.com/assets/img/image-20230810163807712.42932f83.png)

正确的调用方式是什么呢 ？先打印输出 c3 是什么样的一个结构 ！

```tsx
let c1 = require("./a.node");
let c2 = require("./b.node");

// 在 node 模块中 导入 ES6 模块
let c3 = require("../es6/a");

console.log(c1);
console.log(c2);
// 因为在 a 模块中会默认导出一个函数，所以我们自然的会认为 c3 也是一个函数
// 执行会报错，c3 不是一个函数
// c3()

// 正确的执行方式该是什么样的呢 ？

// 打印输入 c3 的结构（在浏览器 或 命令终端中查看）
console.log(c3);
```

在控制台中查看运行结果

![image-20230811005448956](https://www.arryblog.com/assets/img/image-20230811005448956.18636576.png)

在浏览器中查看运行结果

![image-20230811012233129](https://www.arryblog.com/assets/img/image-20230811012233129.f3617b71.png)

注：

可以看到打印输出的结果中，自动添加了一个 default 属性。所以我们要调用 a 模块的默认导出时，就只能通过 `c3.default()` 方式调用。

![image-20230811013311341](https://www.arryblog.com/assets/img/image-20230811013311341.d20d82f2.png)

> 此时，就正常输出了 ！不过，通过 `c3.default()`的方式访问是一件反直觉的事情，也很容易发生错误。

### 7.4、如何处理两个模块系统之间的不兼容性问题



如何处理两个模块系统（ES6 模块 和 node 模块）之间的不兼容性问题呢 ？有两个方案

- ①、两个模块系统不要混用
- ②、如果你的 ES6 模块有一个顶级导出，而且可能会被 node 模块引用，TS 为我们提供了兼容性的语法 `export =` 的方式，编译后就是 `module.exports` 就相当于 CommonJS 中的顶级导出

新建一个 ES6 模块 `/src/es6/d.ts`

```tsx
// export = 的方式，编译后就是 module.exports 就相当于 CommonJS 中的顶级导出
// 将 function 函数作为顶级导出
export = function () {
  console.log("I'm default");
};

// 同时也意味着该模块中不能有其它的导出了

// 以下再次导出就会报错，如果需要导出其他的变量，建议将它们合并在一个对象中导出
// export let a = 1
```

在 `/src/node/c.node.ts` 中导入以上模块

```tsx
let c1 = require("./a.node");
let c2 = require("./b.node");
let c3 = require("../es6/a");

// 将 d.ts 中 ES6 模块默认导出的函数导入进来
// import c4 = require('../es6/d')

// 也可以使用普通的 ES6 模块的方式导入
import c4 from "../es6/d";

console.log(c1);
console.log(c2);
// c3()
// console.log(c3)
c3.default();

// 直接执行 c4
c4();
```

![image-20230811015041833](https://www.arryblog.com/assets/img/image-20230811015041833.42c9cd66.png)

> 以上两种方式导入都可，输出的结果都是一样的。

在 `tsconfig.json` 配置文件中有一个配置项

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

注：

- 如果以上配置项为开启状态，即为 `true` 时，既可以使用 `import c4 = require('../es6/d')` 方式导入，也可以用 `import c4 from '../es6/d'` 的方式导入。
- 如果将该项选项关闭掉，注释 或 置为 `fasle` 时，该 `import c4 from '../es6/d'` 方式导入就会报错。这就要求我们只能通过 `import c4 = require('../es6/d')` 的方式导入了。

> 以上就是 TS 对 ES6 模块 和 CommonJS 模块的兼容性处理了。

### 8、总结



我们复习了 ES6 模块 和 CommonJS 模块，TS 能够对这两种模块进行比较好的支持。

我们基本上可以沿袭之前的写法。但要注意两个模块系统最好不要混用，如果混用我们就要采用一些兼容性的处理方式。

## 四、TS 的命名空间



namespace 是一种将相关代码组织在一起的方式，中文译为“命名空间”。

它出现在 ES 模块诞生之前，作为 TypeScript 自己的模块格式而发明的。但是，自从有了 ES 模块，官方已经不推荐使用 namespace 了。

在 JavaScript 中，命名空间能够有效的避免全局污染，在 ES6 引入了模块系统后，命名空间也就很少被提及了。但 TS 仍然实现了该特性，尽管在模块系统中我们完全不必考虑全局污染问题了。如果要使用全局的类库，命名空间仍然是一个比较好的解决方案。

### 1、TS 中命名空间的定义



- 命名空间用 `namespace` 关键字来声明
- 在命名空间内可以定义任意多的变量
- 这些变量只能在定义的命名空间内可见，如果需要这些变量在全局范围内可见就需要使用 `export` 关键字导出

新建项目，目录结构如下

```markdown
icoding-ts
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│ ├─ a.ts
│ ├─ b.ts
│ ├─ index.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

在 `/src/a.ts` 中

```tsx
// 命名空间用 namespace 关键字来声明
namespace Shape {
  // 在命名空间内定义变量
  const pi = Math.PI;
  // 使用 export 关键字导出，全局可见
  export function cricle(r: number) {
    return pi * r ** 2;
  }
}
```

> 随着程序的不断扩张，该命名空间会变得越来越大，命名空间也是可以拆分的。

在 `/src/b.ts` 中也有一个同名的命名空间，该命名空间就分布在了两个文件中，它们之间是共享一个命名空间的。

```tsx
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

// 命名空间的调用方法

// 调用 a.ts 中的 cricle 方法
Shape.cricle(1);
// 调用 b.ts 中的 square 方法
Shape.square(1);
```

如何看到效果，需要明确一个原则：命名空间和模块不要混用，不在一个模块中使用命名空间

> 命名空间最好是在一个全局的环境中使用

**正确的使用方法：** 应该先将 `a.ts` 和 `b.ts` 这两个文件编译成 JS 文件。然后在 `/tpl/index.html` 中使用 `script` 标签来引入

```shell
# 将 编译成 JS 文件
tsc .\src\b.ts
```

![image-20230812153223278](https://www.arryblog.com/assets/img/image-20230812153223278.af068b26.png)

运行会有报错，因为不能调用 `cricle` 方法，该方法是在 `/src/a.ts` 中定义的，因此 `b.ts` 就构成了对 `a.ts` 的引用。就需要用到 **三斜杠命令**

### 2、三斜杠命令



三斜杠命令（`///`）是一个 TypeScript 编译器命令，用来指定编译器行为。它只能用在文件的头部，如果用在其他地方，会被当作普通的注释。另外，若一个文件中使用了三斜线命令，那么在三斜线命令之前只允许使用单行注释、多行注释和其他三斜线命令，否则三斜杠命令也会被当作普通的注释。

除了拆分类型声明文件，三斜杠命令也可以用于普通脚本加载类型声明文件。

> 三斜杠命令主要包含三个参数，代表三种不同的命令。

- path：必须指向一个存在的文件，若文件不存在会报错。且不允许指向当前文件
- types：参数的值是类型库的名称，也就是安装到`node_modules/@types`目录中的子目录的名字。
- lib：允许脚本文件显式包含内置 lib 库，等同于在`tsconfig.json`文件里面使用`lib`属性指定 lib 库

### 3、`/// <reference path="" />`



`/// <reference path="" />`是最常见的三斜杠命令，告诉编译器在编译时需要包括的文件，常用来声明当前脚本依赖的类型文件。

优化以上代码错误，在 `/src/b.ts` 中添加 `///` 三斜杠命令

```tsx
// path 为 b.ts 的引用，引用了 a.ts ，即 一个相对路径
/// <reference path="a.ts" />

namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

// 命名空间的调用方法

// 调用 a.ts 中的 cricle 方法
Shape.cricle(1);
// 调用 b.ts 中的 square 方法
Shape.square(1);
```

再次在命令行终端中执行

```shell
# 将 编译成 JS 文件
tsc .\src\b.ts
```

![image-20230812161212982](https://www.arryblog.com/assets/img/image-20230812161212982.d807a18e.png)

> 此时，可以看到两个文件都被编译完成了，即：`a.js` 和 `b.js`

![image-20230812161916163](https://www.arryblog.com/assets/img/image-20230812161916163.73a0eeaf.png)

从编译后的文件可以看到，命名空间被编译成了一个立即执行函数，该函数创建了一个闭包。在闭包之内有一些私有成员（即未导出的成员），导出的成员会被挂载在全局变量下，这种形式就是 **命名空间的实现原理** 。

### 4、使用命名空间

在 `src/tpl/index.html` 中引入 `a.js` 和 `b.js`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript</title>
  </head>
  <body>
    <div class="app"></div>

    <!-- 在页面中使用 命名空间 -->
    <script src="../a.js"></script>
    <script src="../b.js"></script>
  </body>
</html>
```

在 `/src/b.ts` 中打印输出调用 `cricle` 和 `square` 方法的结果

```tsx
/// <reference path="a.ts" />
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

// 命名空间的调用方法

// 调用 a.ts 中的 cricle 方法
Shape.cricle(1);
// 打印输出结果
console.log(Shape.cricle(1));

// 调用 b.ts 中的 square 方法
Shape.square(1);
// 打印输出结果
console.log(Shape.square(1));
```

再次编译 `b.ts` 文件

```shell
# 将 编译成 JS 文件
tsc .\src\b.ts
```

直接在浏览器中访问 `http://127.0.0.1:5500/src/tpl/index.html` 即可看到打印的结果

![image-20230814171343986](https://www.arryblog.com/assets/img/image-20230814171343986.18826f4a.png)

### 5、命名空间成员的别名



以上代码中，我们在访问命名空间成员时如： `Shape.cricle(1)` 都要加上 `Shape` 前缀，很多时候为了简便可以给 `cricle()` 函数取一个别名。这样访问起来就会更加快捷。

在 `/src/b.ts` 中添加

```tsx
/// <reference path="a.ts" />
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}

console.log(Shape.cricle(1));
console.log(Shape.square(1));

// 命名空间成员添加别名，使用 import 语法，这里注意：与模块中的 import 没有关系
import cricle = Shape.cricle;
// 这时，就可以直接执行 cricle 函数
console.log(cricle(2));
```

再次编译 `b.ts` 文件

```shell
# 将 编译成 JS 文件
tsc .\src\b.ts
```

直接在浏览器中访问 `http://127.0.0.1:5500/src/tpl/index.html` 即可看到打印的结果

![image-20230814172826315](https://www.arryblog.com/assets/img/image-20230814172826315.eec600e0.png)

### 6、总结



在 TS 的早期版本中，命名空间也叫 “内部模块”。本质上它就是一个闭包，可以用于隔离作用域。

随着 ES6 模块的引入，内部模块这个名称已经不再就叫了。TS 包保留命名空间更多的考虑是对全局变量的时代的一种兼容。

> 现在，在一个完全的模块化系统中，我们其实不必使用命名空间。

## 五、声明合并



在 TS 中有一个独特的概念，即：声明合并。

- 声明合并：编译器会把程序多个地方具有相同名称的声明 合并为 一个声明。
- 好处：可以将程序中散落各处的同名声明合并再一起。

如：在程序中多个地方定了同样名字的接口，那么在使用接口时就会对多处的定义同时具有感知能力。通过声明合并，就会避免对接口成员的遗漏

### 1、接口的声明合并



这是 TS 中最常见的一种声明合并

在 `/src/merge.ts` 中定义接口

```tsx
// 定义一个接口 A
interface A {
  x: number;
}
// 再定义一个同名接口 A
interface A {
  y: number;
}

// 此时，两个接口就会合并成一个接口

// 定义一个变量，变量的类型就是 接口 A，该变量就需要具备 以上两个接口 中的所有成员
let a: A = {
  x: 1,
  y: 2,
};
```

注：

如果我们在编写时，是一个全局模块，那么以上两个接口甚至可以不再一个接口中，也可以发生接口的合并。

> 下面我们来关注接口的成员

### 2、接口的成员



对于接口中非函数的成员要求我们保证它的唯一性，如果不唯一它们的类型必须相同。

### 2.1、非函数成员

在 `/src/merge.ts` 中

```tsx
interface A {
  x: number;
  // 定义一个成员 y，它的类型为 number，是没有问题的
  // y: number;

  // 如果将 y 的类型改为 string，就会报错
  y: string;
}

interface A {
  y: number;
}

let a: A = {
  x: 1,
  y: 2,
};
```

### 2.2、函数成员



函数成员，每一个函数都会被声明为一个函数重载

在 `/src/merge.ts` 中

```tsx
interface A {
  x: number;
  // 在 A接口中定义一个函数
  foo(bar: number): number;
}
interface A {
  y: number;
  // 在 第二个A接口中 也定义一个函数，类型改为 string
  foo(bar: string): string;
  // 在增加一个函数，类型为数字类型的数组
  foo(bar: number[]): number[];
}

// 这样就实现了函数重载，在接口中定义的函数就是函数重载的列表
// 在实现时，就需要指定一个更为宽泛的类型
let a: A = {
  x: 1,
  y: 2,
  // 函数的实现
  foo(bar: any) {
    return bar;
  },
};
```

注：

以上函数重载就实现了，在前面的课程中我们学习过函数重载时，需要注意函数声明的顺序，因为编译器会按顺序进行匹配。

> 在接口合并时，这些顺序是如何确定的呢 ？原则如下：

- 在接口内部，按书写的顺序来确定
- 在接口之间，后边的接口会排在前面

> 函数声明的列表顺序如下

在 `/src/merge.ts` 中

```tsx
interface A {
  x: number;
  foo(bar: number): number; // 3
}
interface A {
  y: number;
  foo(bar: string): string; // 函数声明的列表顺序 1
  foo(bar: number[]): number[]; // 2
}

let a: A = {
  x: 1,
  y: 2,
  foo(bar: any) {
    return bar;
  },
};
```

也有一个例外，如果函数的参数是一个字符串字面量的，那么这个声明就会被提升到整个函数声明的最顶端。

> 再增加一个函数的定义

在 `/src/merge.ts` 中

```tsx
interface A {
  x: number;
  foo(bar: number): number; // 5
  // 增加一个函数的定义，参数是一个字符串字面量
  foo(bar: "a"): number; // 2
}
interface A {
  y: number;
  foo(bar: string): string; // 3
  foo(bar: number[]): number[]; // 4
  // 增加一个函数的定义，参数是一个字符串字面量
  foo(bar: "b"): number; // 1
}

// 函数声明的顺序会变成：拥有字符串字面量参数的函数 会排在第一位（顺序如上）

let a: A = {
  x: 1,
  y: 2,
  foo(bar: any) {
    return bar;
  },
};
```

### 3、命名空间之间的合并



在前面学习命名空间时，我们有接触到

在 `/src/a.ts` 中

```tsx
// 命名空间用 namespace 关键字来声明
namespace Shape {
  const pi = Math.PI;
  export function cricle(r: number) {
    return pi * r ** 2;
  }
}
```

在 `/src/b.ts` 中

```tsx
namespace Shape {
  export function square(x: number) {
    return x * x;
  }
}
```

注：

在以上两个文件中，分别定义了 Shape 两个同名的命名空间，这时两个命名空间就会发生合并。

> 注意：在命名空间中导出的成员是不可以重复定义的。

将 `b.ts` 中的导出函数 放入 `a.ts` 的命名空间中就会提示函数实现重复。

> 这与接口之间的声明与合并就有区别，接口之间是可以重复定义的。但在命名空间中不可以 ！

```tsx
namespace Shape {
  const pi = Math.PI;
  export function cricle(r: number) {
    return pi * r ** 2;
  }
  // 函数实现重复（报错）
  export function square(x: number) {
    return x * x;
  }
}
```

![image-20230815175300595](https://www.arryblog.com/assets/img/image-20230815175300595.00d37a18.png)

### 4、命名空间和函数的合并

在 `/src/merge.ts` 中，定义一个函数

```tsx
// 定义一个函数
function Lib() {}

// 再定义一个同名的命名空间
namespace Lib {
  // 在命名空间中导出一个变量
  export let version = "1.0";
}

// 以上就相当于给函数 Lib 增加了一个属性
// 在 JS 中，创建一个函数然后给它增加一些属性是很常见的一个模式
// 通过命名空间 和 函数的声明合并也可以实现这个模式

// 打印输出变量的值
console.log(Lib.version); // 1.0
```

![image-20230815210238090](https://www.arryblog.com/assets/img/image-20230815210238090.0f1f0e23.png)

### 5、命名空间 和 类声明合并

在 `/src/merge.ts` 中，定义一个类

```tsx
// 声明一个类
class A {}
// 定义一个同名的命名空间
namespace A {
  // 在命名空间中导出一个变量
  export let state = 100;
}

// 以上就相当于给 类 添加了一些静态属性

// 打印输出类的属性值
console.log(A.state); // 100
```

![image-20230815210800952](https://www.arryblog.com/assets/img/image-20230815210800952.014bc2f7.png)

### 6、命名空间 和 枚举的合并

在 `/src/merge.ts` 中，定义一个枚举类型

```tsx
// 定义一个枚举
enum Color {
  Red,
  Yellow,
  Blue,
}
// 再定义一个同名的命名空间
namespace Color {
  // 在命名空间中导出一个函数
  export function mix() {}
}

// 以上就相当于给 枚举类型增加了一个方法

// 打印输出 Color，其中增加了一个 mix 方法
console.log(Color);
```

![image-20230815211820764](https://www.arryblog.com/assets/img/image-20230815211820764.59a15e72.png)

注：

命名空间在与函数进行声明合并 或 与类声明合并时，一定要放在函数定义的后面 或 类定义的后面。

> 枚举 与 命名空间的位置是没有要求，前后都行 ！

- 在我们的程序中，如果有多处的同名的声明，其实并不是一个好的模式，最好还是把它们封装在一个模块之内。
- TS 具有这种特性就是为了照顾一些旧的开发模式，这使得在我们的工程中如果引入了 TS 仍然能与老的代码共存。并且还可能发现其中的一些设计缺陷 ！

## 六、编写声明文件



本节开始学习如何在 TS 中引入外部类库，以及如何为它们编写声明文件

> 类库一般分为三类：

- 全局类库
- 模块类库
- UMD 类库

### 1、TS 中引入外部类库



以 jQuery 为例，在使用它之前先安装

```shell
# 在命令行终端中输入
npm i jquery
```

jQuery 属于 UMD 库，也就说：既可以通过全局的方式来引用（通常需要配合 Webpack 的一些插件来实现），也可以通过模块化的方式来引用。

> 以下采用模块化的方式来引用

```markdown
// 项目目录结构
icoding-ts
├─ build
│ ├─ webpack.base.config.js
│ ├─ webpack.config.js
│ ├─ webpack.dev.config.js
│ └─ webpack.pro.config.js
├─ package-lock.json
├─ package.json
├─ src
│ ├─ index.ts
│ ├─ libs
│ │ └─ index.ts
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

在 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";
```

导入提示报错：“无法找到模块 jQuery 的声明文件”

![image-20230815220229799](https://www.arryblog.com/assets/img/image-20230815220229799.69569444.png)

报错原因：

JQuery 是用 JavaScript 编写的，我们在使用非 TS 编写的类库时必须为这个类库编写一个声明文件，并对外暴露它的 API 。

有时这些类库的声明文件是包含在源码中的，但有时候是单独提供的需要额外的安装。jQuery 就是这样的 ！

> 幸运的是，大多数类库的声明文件社区已经为我们编写好了。使用的方法需要安装一个类型声明包 ！

在命令行终端中，安装 jQuery 的类型声明包

```shell
# 以 @types/ 开头 加上 包的名称，-D 开发依赖
npm i @types/jquery -D
```

安装完成后，`import $ from 'jquery'` 导入 jQuery 就不会报错了 ！

在 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";

// 更改首页的文字颜色
$(".app").css("color", "red");
```

在 `/src/index.ts` 中导入以上文件

```tsx
// 导入
import "./libs/index";

let hello: string = "Hello TS ！";
// console.log(hello)
// 将以上字符串插入到页面中
document.querySelectorAll(".app")[0].innerHTML = hello;
```

启动运行

```shell
npm run start
```

在浏览器中预览

![image-20230815222717241](https://www.arryblog.com/assets/img/image-20230815222717241.1cc12385.png)

注：

在 TS 中使用外部类库时，首先要考虑的是它是不是有这个声明文件，可以在 [npm 官网 (opens new window)](https://www.npmjs.com/)上搜索 `@types/类库名称` 即可。

> 如：`@types/lodash` 包，npm 链接 [https://www.npmjs.com/package/@types/lodash(opens new window)](https://www.npmjs.com/package/@types/lodash)

如果 npm 上没有对应的包，就需要我们自己去写一个，也是我们贡献社区的好机会（具体方法之前有讲过的）。当然在这之前我们需要学会如何编写一个类库声明文件 ！

### 2、三种类库声明文件的写法



在 `/src/libs` 文件夹下，有三个类库：

- 全局库（`global-lib.js`）
- 模块库（`module-lib.js`）
- UMD 库（`umd-lib.js`）

### 2.1、全局类库

在 `src/libs/global-lib.js` 中

```js
// 定义全局方法
function globalLib(options) {
  console.log(options);
}

// 以下给全局方法添加了两个属性

// 在方法上挂载 version 属性
globalLib.version = "1.0.0";

// 在方法上挂载 doSomething 方法
globalLib.doSomething = function () {
  console.log("globalLib do something");
};
```

> 以上是典型的全局类库的模式，如果要使用这个全局库呢 ？

在 `/src/tpl/index.html` 中使用 `<script>` 标签引入进来

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript</title>
  </head>
  <body>
    <div class="app"></div>
    <!-- 引入全局类库 -->
    <script src="/src/libs/global-lib.js"></script>
  </body>
</html>
```

在 `/src/libs/index.ts` 中调用全局库中的方法

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
```

直接调用会报错，找不到 `globalLib` 类库方法

![image-20230816180955812](https://www.arryblog.com/assets/img/image-20230816180955812.867b7064.png)

因为我们没有为 `/src/libs/global-lib.js` 该 JS 类库编写一个 声明文件

在 `/src/libs` 文件夹下编写一个 `global-lib.d.ts`（名称一样，但需要添加 `d.ts` 后缀名） 的声明文件

```tsx
// declare 关键字，它可以为一个外部变量提供类型声明
// 参数为 options 为一个对象，用到了一个接口来约束对象的结构（接口放在了命名空间中）
declare function globalLib(options: globalLib.Options): void;

// 使用 declare 关键字声明一个 命名空间
declare namespace globalLib {
  // 在命名空间中定义了 两个成员 version 和 doSomething
  const version: string;
  function doSomething(): void;
  // 可索引类型的接口，可接收任意类型的字符串属性，返回值为 any
  // 当然，该接口也可以放到全局的（放到与命名空间平级的位置），这样该接口就对全局暴露了出来，如果不想暴露就放到命名空间中
  interface Options {
    [key: string]: any;
  }
}
```

对比 `global-lib` 类库的源码 和 声明文件

![image-20230816181824833](https://www.arryblog.com/assets/img/image-20230816181824833.2e632996.png)

注：

- 在 TS 声明文件中用到了 `declare` 关键字，它可以为一个外部变量提供类型声明
- 在 JS 类库源码中有一个 全局的 `globalLib` 函数，在 `global-lib.d.ts` 中也提供了一个全局的声明 `declare function globalLib()` 它的参数为 `options` 为一个对象。 用接口来约束对象的结构，`Options` 接口放在了命名空间中。接口为可索引类型的接口（可接收任意类型的字符串属性，返回值为 any）
- 在 JS 类库源码中，`globalLib` 函数上挂载了 `version` 属性 和 `doSomething` 方法
- 同时就需要在 TS 声明文件中 `declare` 一个命名空间，在命名空间中有两个成员 `version` 和 `doSomething` 。这就用到了前面学到了声明合并，即：函数和命名空间的声明合并。相当于为该函数添加了一些属性 ！
- 注意：`interface` 接口是可以放在全局的（放到与命名空间平级的位置），这样该接口就对全局暴露了出来，如果不想暴露就放到命名空间中

> 此时，程序也不会有报错了 ！

在 `/src/libs/index.ts` 中，调用全局类库的方法

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });

// 调用 全局类库中的方法
globalLib.doSomething();
```

启动运行

```shell
npm run start
```

在浏览器中，看下运行效果

![image-20230817180022297](https://www.arryblog.com/assets/img/image-20230817180022297.c154217c.png)

报错原因：

Webpack 版本问题 ！在 Webpack5 以上的版本，需要 [copy-webpack-plugin (opens new window)](https://www.npmjs.com/package/copy-webpack-plugin)这个插件（将已存在的单个文件或整个目录复制到生成目录），并在配置文件中配置对应的路径

在命名行终端安装

```shell
npm i copy-webpack-plugin -D
```

在 `/build/webpack.base.config.js` 中添加配置

```js
// 导入 copy-webpack-plugin 插件
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/libs/global-lib.js" }],
    }),
  ],
};
```

在 `/src/tpl/index.html` 中引入全局类库的 JS 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript</title>
  </head>
  <body>
    <div class="app"></div>

    <!-- 引入全局类库 -->
    <script src="global-lib.js"></script>
  </body>
</html>
```

再次启动运行

```shell
npm run start
```

在浏览器中查看运行结果

![image-20230817184123511](https://www.arryblog.com/assets/img/image-20230817184123511.31986d37.png)

以上全局类库项目结构

```markdown
icoding-ts
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
│ ├─ libs
│ │ ├─ global-lib.d.ts
│ │ ├─ global-lib.js
│ │ ├─ index.ts
│ │ ├─ module-lib.js
│ │ └─ umd-lib.js
│ └─ tpl
│ └─ index.html
└─ tsconfig.json
```

### 2.2、模块类库

新建 `/src/libs/module-lib.js` 模块类库文件，为一个 CommonJS 的模块

```js
const version = "1.0.0";

function doSomething() {
  console.log("moduleLib do something");
}

function moduleLib(options) {
  console.log(options);
}

// 在 moduleLib 上挂载了 version 属性 和 doSomething 方法
moduleLib.version = version;
moduleLib.doSomething = doSomething;

// 向外导出一个顶级的 moduleLib 函数
module.exports = moduleLib;
```

将 `module-lib.js` 引入到 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
```

报错，无法找到模块对应的声明文件

![image-20230817200627234](https://www.arryblog.com/assets/img/image-20230817200627234.00dbd19f.png)

新建 `/src/libs/module-lib.d.ts` 模块声明文件

```tsx
// 使用 declare 关键字声明了 moduleLib
declare function moduleLib(options: Options): void;

interface Options {
  [key: string]: any;
}

// 使用 declare 定义了 命名空间
declare namespace moduleLib {
  const version: string;
  function doSomething(): void;
}

export = moduleLib;
```

> 此时，有了模块声明文件后，就不会报错了 ！

在 `/src/libs/index.ts` 中，调用模块类库的方法

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();
```

再次启动运行

```shell
npm run start
```

在浏览器中查看运行结果

![image-20230817204332832](https://www.arryblog.com/assets/img/image-20230817204332832.0353e78f.png)

### 2.3、UMD 类库

新建 `/src/libs/umd-lib.js` UMD 类库文件

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.umdLib = factory();
  }
})(this, function () {
  return {
    version: "1.0.0",
    doSomething() {
      console.log("umdLib do something");
    },
  };
});
```

将 `umd-lib.js` 引入到 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();

// 引入 UMD 类库
import umdLib from "./umd-lib";
```

报错，无法找到 UMD 类库对应的声明文件

![image-20230817215509364](https://www.arryblog.com/assets/img/image-20230817215509364.6aaa1a3c.png)

新建 `/src/libs/umd-lib.d.ts` UMD 类库的声明文件

```tsx
declare namespace umdLib {
  const version: string;
  function doSomething(): void;
}

// 专门为 UMD 类库设计的语句（如果要编写一个 UMD 库这条语句是不可缺少的）
export as namespace umdLib;

// export 默认导出
export = umdLib;
```

> 此时，有了 UMD 类库声明的文件后，就不会报错了 ！

在 `/src/libs/index.ts` 中，调用 UMD 类库的方法

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();

// 引入 UMD 类库
import umdLib from "./umd-lib";
// 调用 UMD 类库中的方法
umdLib.doSomething();
```

再次启动运行

```shell
npm run start
```

在浏览器中查看运行结果

![image-20230818010112674](https://www.arryblog.com/assets/img/image-20230818010112674.4698741c.png)

### 2.4、UMD 库的全局引用



UMD 库是可以通过全局的方式来引用的 和 `globalLib` 是一样的

在 `/src/tpl/index.html` 中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeScript</title>
  </head>
  <body>
    <div class="app"></div>
    <!-- 引入全局类库 -->
    <script src="global-lib.js"></script>

    <!-- 引入 UMD 类库 -->
    <script src="umd-lib.js"></script>
  </body>
</html>
```

在 `/build/webpack.base.config.js` 配置文件中加入配置

```json
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/libs/global-lib.js" },
                // 导入 UMD 类库文件
                { from: "./src/libs/umd-lib.js" },
            ],
        }),
    ]
}
```

通过全局的方式引入 umd 类库，需去掉 `/src/libs/index.ts` 文件中导入的 `umdLib`

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();

// 引入 UMD 类库 （）
// import umdLib from './umd-lib'

// 调用 UMD 类库中的方法
umdLib.doSomething();
```

报错，`umdLib` 是一个 UMD 库，不建议在模块中通过全局的方式来引用

![image-20230818205948250](https://www.arryblog.com/assets/img/image-20230818205948250.0eaadc20.png)

在 `tsconfig.json` 配置文件中，有一个配置项可以关闭这个错误提示

```json
{
  "compilerOptions": {
    // 开启该配置项
    "allowUmdGlobalAccess": true
  }
}
```

注：

此时，就没有报错了 ！现在就可以在一个模块中通过全局的方式来引用 UMD 类库了。

如果我们想要在一个全局的环境中调用 UMD 库，就需要在一个非模块的文件中去调用，这就回到了最传统的开发模式。

### 3、两种插件



模块化插件 和 全局插件，即：有时候我们想给一个类库添加自定义的方法

### 3.1、模块化插件



如：我们希望为 `moment` 类库增加一些自定义的方法

```shell
# 安装时间类库 moment
npm i moment
```

在 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();

// 引入 UMD 类库
// import umdLib from './umd-lib'

// 调用 UMD 类库中的方法
umdLib.doSomething();

// ------------------------------------------

// 导入 moment
import m from "moment";

// 给 moment 自定义一些方法（报错：moment 不存在该属性）
m.myFunction = () => {};

// 使用 declare 关键字来为外部的类库增加了自定义的方法
declare module "moment" {
  // 导出自定义的方法
  export function myFunction(): void;
}
```

### 3.2、全局插件



给全局变量添加一些方法

在 `/src/libs/index.ts` 中

```tsx
import $ from "jquery";

$(".app").css("color", "red");

// 调用 全局库中的属性
globalLib({ x: 1 });
// 调用 全局类库中的方法
globalLib.doSomething();

// 将 module-lib.js 引入 index.ts 中
import moduleLib from "./module-lib";
// 调用 模块类库中的方法
moduleLib.doSomething();

// 引入 UMD 类库
// import umdLib from './umd-lib'

// 调用 UMD 类库中的方法
umdLib.doSomething();

// 导入 moment
import m from "moment";

// 给 moment 自定义一些方法（报错：moment 不存在该属性）
m.myFunction = () => {};

// 使用 declare 关键字来为外部的类库增加了自定义的方法
declare module "moment" {
  // 导出自定义的方法
  export function myFunction(): void;
}

// -----------------------

// 使用 declare 关键字，给全局变量定义方法
declare global {
  // 添加自定义方法
  namespace globalLib {
    function doAnything(): void;
  }
}
// 给 globalLib 添加一个 doAnything 方法
globalLib.doAnything = () => {};
```

> 以上方式，对全局命名空间造成了污染，所以一般不建议这样做。

### 3.3、声明文件的依赖



如果一个文件比较大，它的声明文件就会很长。一般就会按照模块划分，这些声明文件之间就会存在一定的依赖关系。

以 jQuery 为例，查看 `/node_modules/@types/jquery` 文件夹下的文件

![image-20230819170438649](https://www.arryblog.com/assets/img/image-20230819170438649.f25f9118.png)

其中 `"types": "index.d.ts",` 字段会代表声明文件的入口

![image-20230819183524719](https://www.arryblog.com/assets/img/image-20230819183524719.e777e3f0.png)

注：

如果编写一个声明文件很困难 或 官方的案例看不明白，一个好的方法就是研究知名类库的声明文件是如何编写的。从中找到启发 ！
