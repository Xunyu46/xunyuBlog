---
title: TypeScript 快速入门 - 核心基础，TS 基本数据类型
date: 2023-10-28
sidebar: "auto"
categories:
  - typescript
tags:
  - typescript
publish: true
---

# TypeScript 快速入门 - 核心基础，TS 基本数据类型

TIP

从本节内容开始，正式学习 TypeScript 从入门到深度实践，真正掌握 TypeScript 在大型企业项目开发中的最佳实践与应用，透过实际开发中的应用场景 和 底层源码 深度解析成为 TS 高手。

同时也是未来进入大厂、开发大型企业项目、进阶前端架构的必备核心技能之一。

- TypeScript 简介
- 基础类型
- TS 核心基础
- TS 基本数据类型

## 一、TypeScript 简介

TIP

深入浅出 TypeScript 历史、重要性、本质、Atwood 定律，重塑 “类型思维” 等。

> 详细查阅 [TypeScript 官方文档(opens new window)](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)

### 1、TypeScript 的历史

TIP

2012 年，微软公司宣布推出 TypeScript 语言，设计者是著名的编程语言设计大师 Anders Hejlsberg，他也是 C# 和 .NET 的设计师。

微软推出这门语言的主要目的，是让 JavaScript 程序员可以参与 Windows 8 应用程序的开发。

当时，Windows 8 即将发布，它的应用程序开发除了使用 C# 和 Visual Basic，还可以使用 HTML + JavaScript。微软希望，TypeScript 既能让 JavaScript 程序员快速上手，也能让 .Net 程序员感到熟悉。

这就是说，TypeScript 的最初动机是减少 .NET 程序员的转移和学习成本。所以，它的很多语法概念跟 .NET 很类似。

另外，TypeScript 是一个开源项目，接受社区的参与，核心的编译器采用 Apache 2.0 许可证。微软希望通过这种做法，迅速提高这门语言在社区的接受度。

- 2013 年，微软的 Visual Studio 2013 开始内置支持 TypeScript 语言。
- 2014 年，TypeScript 1.0 版本发布。同年，代码仓库搬到了 GitHub。
- 2016 年，TypeScript 2.0 版本发布，引入了很多重大的语法功能。
- 2018 年，TypeScript 3.0 版本发布。
- 2020 年，TypeScript 4.0 版本发布。
- 2023 年，TypeScript 5.0 版本发布。

> 查看 [最新 TypeScript 更新版本内容信息 ！(opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html)

### 2、TypeScript 目前有多火

TIP

TypeScript 的火爆程度与日俱增，其优势 和 成熟度早已通过市场验证，且异常火爆。强有力的证明即：Vue3 的底层源码全部重写并采用了 TypeScript 开发，原生支持 TypeScript。

> 几乎所有企业的中大型前端项目中都深度融合了 TypeScript

- Vue3 + Vuex（Pinia）的项目
- React + Hooks 的项目
- 后端 Node.js 融合 TS 技术（Nest.js 框架）
- 各种 `d.ts` 文件全为 TS 技术
- Unity 等游戏引擎 结合 TS 技术 实现高性能的游戏开发

> 在 2018 年才开始在国内外各大互联网公司逐步流行，短短几年时间里几乎都在使用 TS 进行项目的开发，同时很多中小型团队也都在快速跟进使用 TypeScript 开发项目。

### 3、TypeScript 的重要性

TIP

TS 这么火爆 与 我们当下有什么关系呢 ？它的重要性具体是什么 ！

> 深度掌握 TypeScript 对我们前端工程师的重要性

- 顺利通过面试
- 试用期的快速转正
- 晋级高级前端工程师
- 拿高薪必备

在面试中，我们能够熟练的解说 Vue3 源码中 TypeScript 语法即功能模块实现，必定可以为我们的面试加分。

### 4、TypeScript 的本质

TIP

TS 是一门融合了部分 Java 后端思想的前端 JS 语言，学习课程后必须同时掌握以下技能

- TS 中蕴含的 Java 核心思想
- TS 底层复杂的 JS 技能
- TS 自带的语法
- 无比重要 和 深度庞杂的泛型技能

### 5、学习 TypeScript 必备的前置技术

TIP

- HTML/HTML5 常用的标签、CSS/CSS3 基础
- JS 核心基础（如：数组、立即执行函数 ... 等）
- ES6 核心基础（如：Class 类、结构、Set 集合 ... 等）

### 6、Atwood 定律

TIP

在过去的十多年里，从事全栈开发工作，亲自见证了 **Atwood 定律** 即：“任何能够用 JavaScript 实现的应用系统，最终都必将用 JavaScript 实现。”

如今从移动终端 到 后端服务，从 IOT 到 神经网络，到今天的 AICG 大模型，JavaScript 几乎无处不在。

### 7、重塑 ”类型思维“

TIP

如此广阔的应用领域，自然对语言的安全性、健壮性 和 可维护性有更高的要求。尽管 ECMAScript 标准近几年有了长足的进步，但在类型检查方面依然无所建树。

> 你是否经常遇到这样的场景

- 场景一：你调用一个别人写的函数，但很不幸的是，这家伙没留下任何注释，为了搞清楚参数类型，你只能硬着头皮去看里面的逻辑；
- 场景二：为了保证代码的健壮性，你很有责任心，对一个函数的输入参数进行了各种假设，最终给老板盛上了一碗香喷喷的面条；
- 场景三：leader 看好你，让你维护一个重要的底层类库，你殚精竭虑优化了一个参数类型，但是不知道有多少处引用，在提交代码前是否感到脊背发凉，彻夜难眠 ？
- 场景四：命名定义好了接口，可一联调就报错了 `TypeError：Cannot read property 'length' of undefined` 于是你怒气冲冲的找后端理论，这个字段类型不对，不对，不对 ...

> 以上情况归根结底是因为 JavaScript 是一门动态弱类型语言，对变量的类型非常的宽容，而且不会在这些变量和它们的调用者之间建立结构化的契约。

注：

如果你长期在没有类型约束的环境下开发，就会造成 "类型思维" 的缺失，养成不良的编程习惯。这也是做前端开发的短板之一，值得我们警醒。

令人庆幸的是，开源社区一直在努力解决这个问题，早在 2014 年 FaceBook 就推出了 Flow ，微软在同一年也发布了 TypeScript 的 1.0 版本，他们都致力于为 JavaScript 提供静态类型的检查。

如今近 10 年过去了，显然 TypeScript 发展的更好，多个团队如：Vue3、React、Angular 都已经全面使用了 TypeScript 重构代码，甚至连 FaceBook 自家的产品 如：Jest 和 Yarn 都已从 Flow 转向 TypeScript 。可以说在 ECMAScript 标准推出静态类型检查之前，TypeScript 是当下解决此问题的最佳方案。

### 8、什么是 TypeScript

TIP

官方定义：它是拥有类型系统的 JavaScript 的超集，可以编译成纯 JavaScript 代码。

TS 扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

![image-20230606232747330](https://www.arryblog.com/assets/img/image-20230606232747330.c15a5f54.png)

需要注意三个点：

- ①、类型检查：TypeScript 会在编译代码时，进行严格的静态类型检查。这意味着我们可以在编码的阶段，发现可能存在的隐患，而不必把它们带到线上去。
- ②、语言扩展：TypeScript 会来自 ECMAScript 6 和 未来提案中的特性。如：异步操作 和 装饰器，也会从其他语言借鉴某些特性。如：接口 和 抽象类
- ③、工具属性：TypeScript 可以编译成标准的 JavaScript ，可以在任何浏览器操作系统上运行，无需任何运行时的额外开销。从这个角度上讲 TypeScript 更像是一个工具，而不是一门独立的语言。

### 9、为什么要使用 TypeScript

TIP

使用 TypeScript 还能带来其他好处，如：VSCode 具有强大的自动补全、导航 和 重构功能。这使得接口定义可以直接代替文档，同时也可以提高开发效率，降低维护成本。

更重要的是，TypeScript 可以帮助团队重塑 “类型思维”。接口的提供方将被迫去思考 API 的边界，他们将从代码的编写者蜕变为代码的设计者。

如果 JavaScript 是一匹野马，那么 TypeScript 就是束缚这匹野马的缰绳，作为骑士的你自然可以张开双臂放飞自我。

但是，如果不是技艺超群，恐怕会摔得很惨。然而如果抓住了缰绳，你即可闲庭信步 亦可策马扬鞭。这就是 TypeScript 的价值 ！他可以让你在前端开发之路上走的更稳，走的更远。

## 二、基础类型

TIP

在正式学习 TypeScript 之前有必要理清楚一些关于类型的基本概念，在前面学习中，我们知道 JavaScript 是一门动态的弱类型语言，那么与之对应肯定是有静态类型语言 和 强类型语言。

如何区分它们是我们在学习一门计算机语言之前，首先要搞清楚的问题。只有理解了这些概念我们才会明白在程序员之间有所谓的 **“语言鄙视链”** ，也会对 TypeScript 诞生的原因有更深层次的认识。

### 1、强类型语言 与 弱类型语言

TIP

遗憾的是，关于强类型语言 与 弱类型语言 的概念有着不同的解释，一个比较早的定义来自两位美国的计算机科学家（Liskov、Zilles） 他们在 1974 年提出：

在强类型语言中，当一个对象从调用函数传递到被调用函数时，其类型必须与被调用函数中声明的类型兼容。

```js
A() {
    B(x)
}
B(y) {
    // y 可以被赋值 x ，程序运行良好
}
```

注：

以上面的伪代码为例，定义两个函数 A 和 B ，当 A 在调用 B 时，x 的类型必须 和 y 的类型兼容，兼容意味着 y 可以被赋值 给 x ，而且程序可以运行的良好。

这是一个相对宽泛的定义，并没有产生具体的规则，后人对强类型语言的定义则会更精确一些。

### 2、强类型语言

TIP

强类型语言：不允许改变变量的数据类型，除非进行强制类型转换

### 2.1、以 Java 语言为例

TIP

以 Java 为例来说明，我们使用 [在线的 Java 环境 (opens new window)](https://tool.lu/coderunner/)做测试 ！（简单测试无需配置 Java 环境）

```java
class Test {
    public static void main(String[] args) {
        int a = 1;
        boolean b = true;
        // 将 b 赋值给 a
        a = b;
        // 打印输出 a
        System.out.println(a); // 报错
    }
}
```

注：

- 定义一个 变量 x 为整型，值为 1
- 定义一个 boolean 型变量 b ，值为 true
- 将 b 赋值给 a，然后打印输出 a

> 运行后，系统会报错 ！提示我们 “类型不兼容，不能将 boolean 型 转换为 整型”

![image-20230609170032786](https://www.arryblog.com/assets/img/image-20230609170032786.959ffefa.png)

### 2.2、Java 语言中的强制类型转换

TIP

继续定义一个字符型变量，验证结果

```java
class Test {
    public static void main(String[] args) {
        int a = 1;
        // boolean b = true;
        // a = b;

        // 定义一个字符型变量 c
        char c = 'x';
        // 将变量 c 赋值给 a
        a = c;
        // 打印输出 a
        System.out.println(a); // 120
    }
}
```

注：

- 定义一个字符型变量 c ，值为 'x'
- 将 c 赋值给 a ，然后打印输出 a

运行后，打印输出了 120 并没有报错。这是因为 Java 进行了强制类型转换，将 字符 x 的 ASCII 码传递给了变量 a ，这样 a 的类型仍然是整型。

因此，我们可以知道 Java 语言就是典型的强类型语言 ！

> 详细查阅，计算机 [ASCII (opens new window)](https://baike.baidu.com/link?url=hFTI0jvCqtriJOnwmmlzh3C1HsgvsdamNxmofB6fbGzbIPo7-sTKESyQyAmYzB_g3_U9JY-TDIpYM93KpqzR2_)码 - [ASCII 值对照表(opens new window)](https://tool.oschina.net/commons?type=4)

![image-20230609184509746](https://www.arryblog.com/assets/img/image-20230609184509746.973072fd.png)

### 3、弱类型语言

TIP

弱类型语言：变量可以被赋予不同的数据类型

### 3.1、以 JavaScript 语言为例

TIP

以 JavaScript 语言为例，我们在浏览器的控制台中测试如下代码

```js
let a = 1;
let b = true;
a = b;

// 输出 true
```

注：

- 定义一个变量 a ，值为 1
- 定义一个变量 b ，值为 true

> 运行输出 a 的值为 true，我们发现 在 JavaScript 中 变量 a 和 b 为不同数据类型 也能赋值成功，并且并没有报错。

![image-20230609185113746](https://www.arryblog.com/assets/img/image-20230609185113746.04f1d0d2.png)

### 3.2、JS 语言中，变量可被赋值为不同的数据类型

```js
let a = 1;
let b = true;
a = b;

// 输出 true

let c = "x";
a = c;

// 输出 'x'
```

注：

- 定义一个字符串变量 c ，值为 `'x'`
- 将 c 赋值给 a ，然后打印输出 a

> 运行输出 a 的值为 `'x'` ，从这里我们就可以看出 JS 是一门弱语言类型，它的变量可以被赋予不同的数据类型。

![image-20230610000218669](https://www.arryblog.com/assets/img/image-20230610000218669.3a6280b7.png)

### 5、总结

TIP

- 在强类型语言中，对语言的类型有严格的限制，不同类型的变量是不能相互赋值的，这样就可以避免许多低级错误。
- 在弱语言类型中，没有什么约束性，虽然相对灵活，但也更容易产生 Bug 。

### 6、静态类型语言 与 动态类型语言

TIP

- 静态类型语言：在编译阶段确定所有变量的类型
- 动态类型语言：在执行阶段确定所有变量的类型

> 我们通过对比这两种类型的语言，来观察它们的区别

### 6.1、JavaScript - 动态类型语言

> 观察如下 JS 代码

```js
class Test {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function add(a, b) {
  return a.x + a.y + b.x + b.y;
}
```

注：

以上代码中，定义了一个 Test 类，并且为它添加了两个实例成员 x 和 y 。同时，又定义了一个 add 函数，该函数的作用是：把两个实例的所有属性相加。

当 JS 编译器看到这段代码时，它完全无法获知变量 a 和 b 的类型，只有在程序执行的时候，才能根据实际传入的对象来确定。

![image-20230610004149159](https://www.arryblog.com/assets/img/image-20230610004149159.fa3912e2.png)

### 6.2、C++ - 静态类型语言

TIP

观察如下一段 C++ 代码，与上边 JS 代码功能相同

```text
class Test {
	public:
    	int x;
    	int y;
};

int add(Test a, Test b) {
    return a.x + a.y + b.x + b.y;
}
```

注：

与 JS 不同的是，C++ 在编译阶段时就能确定变量 a 和 b 的类型，且它们的类型一定是整型

![image-20230610005337695](https://www.arryblog.com/assets/img/image-20230610005337695.561490be.png)

### 7、JS 与 C++ 内存分配对比

TIP

从内存分配的角度来对比 JS 与 C++ 语言差别

![20230610172341](https://www.arryblog.com/assets/img/20230610172341.1c50de00.jpg)

| JavaScript                       | C++                        |
| :------------------------------- | :------------------------- |
| 在程序运行时，动态计算属性偏移量 | 编译阶段确定属性偏移量     |
| 需要额外的空间存储属性名         | 用偏移量访问代替属性名访问 |
| 所有对象的偏移量信息各存一份     | 偏移量信息共享             |

注：

- 在执行 `add()` 方法时，两种语言都会创建两个实例对象 a 和 b
- 所不同的是，JS 需要在程序运行时动态计算属性 x 和 y 的偏移量，这个偏移量是相对于对象基地址的偏移量，还需要额外的存储空间来存储 x 和 y 这两个属性名，并且所有的对象的偏移量都要各自存一份
- C++ 在编译阶段就能确定 x 和 y 的偏移量，如果一个整型占据 4 个字节，那么 x 的偏移量就是 0，y 的偏移量就是 4
- 这样在运行的时候，通过偏移量访问代替属性名访问，并且所有偏移量的信息是共享的

> 由此，可以看到动态类型语言，无论在时间还是空间上都有比较多的性能损耗

### 8、静态类型 与 动态类型语言对比 - 总结

| 静态类型语言   | 动态类型语言               |
| :------------- | :------------------------- |
| 对类型极度严格 | 对类型非常宽松             |
| 立即发现错误   | Bug 可能隐藏数月 甚至 数年 |
| 运行时性能好   | 运行时性能差               |
| 自文档化       | 可读性差                   |

TIP

这样对比下来，视乎静态类型语言的优势更大一些，动态类型语言有很多缺陷。如果是一门动态弱类型语言更会被打入鄙视链的底端。

> 但，动态语言的支持者也有他们的理由：

- 性能是可以改善的（V8 引擎这方面就做的很好），相对损失的性能而言，语言的灵活性则更为重要
- 隐藏的错误是可以通过单元测试来发现
- 文档也可以通过工具生成

注：

其实，这种争论一直存在，这也说明任何语言特性都具有两面性。同时，也是在不断发展和进化的。不能一概而论，要看具体的场景和性价比。

> 如：JavaScript 语言就是一门动态弱类型语言，但丝毫未能阻止它的广泛应用。

### 9、关于语言类型的其他定义

TIP

关于语言类型的定义，除了我们上边讲得的比较通俗的还有一些其他的定义。

> 美国加州大学的讲义中，对强类型的定义是：

**强类型语言：** 不允许程序在发生错误后继续执行

按照这个定义，C 和 C++ 是强类型还是弱类型呢 ？显然是弱类型语言。因为它们没有对数组越界进行检查，由此可能导致程序的崩溃。所以如果没有特殊说明，本课程所提及的类型，均指通俗的定义。即：

- 静态类型语言：在编译阶段确定所有变量的类型
- 动态类型语言：在执行阶段确定所有变量的类型

### 10、语言类型的象限

TIP

以下是一张语言类型的象限图，图的横轴代表 由 动 -> 静 ，纵轴代表由弱到强，可通过该图来理解什么是动态类型、什么是静态类型 以及 弱类型 和 强类型，进而区分这些语言之间的差别。

![image-20230610202557921](https://www.arryblog.com/assets/img/image-20230610202557921.ed85534e.png)

思考：

如果把 TypeScript 当成一门语言来看待，那么它是强类型语言 还是 弱类型语言呢 ？是动态类型语言 还是 静态类型语言呢 ？

## 三、TS 核心基础

TIP

深入浅出 TypeScript 核心基础，环境搭建，TS 的优势，TS 的编译运行 及 相关优化。

### 1、TS 的环境搭建

TIP

- 安装 VSCode 开发工具
- 安装 Node.js
- 安装 TypeScript 编译器

```shell
# npm 初始化生成 package.json 配置文件
npm init -y

# 全局安装 TS，好处：在任何地方都可以使用 TS 的编译器 即：tsc
npm i typescript -g
```

安装好 TS 编译器后，就可以在命令行中使用 tsc 命令了

```shell
# 查看 TS 的版本
tsc -v

# 查看 TS 的帮助信息
tsc -h
```

在 VSCode 默认的 powershell 命令终端中运行以上命令，发现会无法之别。因为在此系统上禁 止运行脚本。（在 GitBash 命令行使用 tsc 是可以正常执行的）

![image-20230614185505326](https://www.arryblog.com/assets/img/image-20230614185505326.49e52a77.png)

注：

解决办法，查阅 [微软 VSCode 官方文档 - PowerShell 执行策略并说明如何管理这些策略(opens new window)](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3)

在 VSCode 默认的 powershell 命令终端中运行以下命令

```shell
# 更改执行策略为 RemoteSigned
set-ExecutionPolicy RemoteSigned

# 运行get命令，可查看到脚本的执行策略已被更改为 RemoteSigned
get-ExecutionPolicy
```

> 此时，再次使用 tsc 命令时，就可以正常运行了 ！

### 2、创建 TS 的配置文件

TIP

`tsconfig.json` 是一个 TypeScript 项目的配置文件，它用于指定编译器选项、源文件、输出选项等。

通过配置 `tsconfig.json` 文件，你可以告诉 TypeScript 编译器如何编译您的代码，以及生成哪些输出文件

```shell
# 初始化 TS 配置文件
tsc --init
```

![image-20230614225732179](https://www.arryblog.com/assets/img/image-20230614225732179.09b7e174.png)

> 打开 `tsconfig.json` 可以看到很多配置信息。同时，每一项的配置都有明确的注释。后边会专门讲到 ！

### 3、体验第一个 TS 程序

在 `/src/index.ts` 中

```tsx
const hello: string = "Hello TS !";
console.log(hello);
```

在 VSCode 命令行终端中

```shell
# 通过 tsc 编译 .ts 文件
tsc .\src\index.ts

# 运行编译后的 .js 文件
node .\src\index.js

# 输出
Hello TS !
```

![image-20230615144954067](https://www.arryblog.com/assets/img/image-20230615144954067.a72817c0.png)

### 4、TS 的优势

TIP

- ①、编译时静态类型检测：函数或方法传参或变量赋值不匹配时，会出现编译错误提示 ，规避了开发期间的大量低级错误，省时，省力；
- ②、自动提示更清晰明确；
- ③、引入了泛型和一系列的 TS 特有的类型；
- ④、强大的 `d.ts` 声明文件：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type 类型，类，函数，变量等声明；
- ⑤、轻松编译成 JS 文件：即使 TS 文件有错误，绝大多数情况也能编译出 JS 文件；
- ⑥、灵活性高：尽管 TS 是一门 强类型检查语言，但也提供了 any 类型 和 as any 断言，这提供了 TS 的灵活度；

### 4.1、优势一：编译时静态类型检测

TIP

函数或方法传参或变量赋值不匹配时，会出现编译错误提示 ，规避了开发期间的大量低级错误，省时，省力。

在 `/src/index.ts` 中定义 字符串类型的 str 变量，再给 str 赋值一个 数字类型的值

```tsx
let str: string = "艾编程";
str = 1;

// 此时，str = 1 编译时会报错 （不能将类型“number”分配给类型“string”）
```

`/src/index.js` 中写入同样的代码，JS 中则会正常显示

```js
let str = "艾编程";
str = 1;
```

![image-20230615151542850](https://www.arryblog.com/assets/img/image-20230615151542850.40764887.png)

在 `/src/index.ts` 中

```tsx
let arr: string = "abcd";
arr.forEach(() => {});

// TS中，编译阶段会报错，类型“string”上不存在属性“forEach”
```

在 `/src/index.js` 中

```js
let arr = "abcd";
arr.forEach((item) => {
  console.log(item);
});

// JS 中，编译阶段并没有报错，而是推迟到运行阶段才会报错，这就会留出很大的隐患，一旦项目复杂了，必定会出现灾难性的后果。
```

![image-20230615152514572](https://www.arryblog.com/assets/img/image-20230615152514572.0cc25dd7.png)

### 4.2、优势二：自动提示更清晰明确

在 `/src/index.ts` 中

```tsx
let arr : string = "abcd"
arr.forEach(() => {

})

let obj = {
    username: '艾编程',
    age: 18,
    sex: 'male'
}

obj.
```

在 TS 中自动提示，是可以正确的识别有哪些已经确定好的属性

![image-20230615153748947](https://www.arryblog.com/assets/img/image-20230615153748947.7abf5535.png)

同样的代码，在 JS `/src/index.js` 中

```js
let arr = "abcd"
arr.forEach(item => {
    console.log(item)
})

let obj = {
    username: '艾编程',
    age: 18,
    sex: 'male'
}

obj.
```

在 JS 中自动提示，会非常的杂乱，简单的几行代码就会有很多无关的字段出现。一旦代码多了，就会会更多

![image-20230615154303563](https://www.arryblog.com/assets/img/image-20230615154303563.a592aeab.png)

注：

其他四个优势，后续会随着课程的深入，会逐步学习。

### 5、错误提示插件

在 VSCode 扩展中安装 `Error Lens` 错误提示插件，无需鼠标触碰直接提示错误信息

![image-20230821165908901](https://www.arryblog.com/assets/img/image-20230821165908901.89081ec9.png)

提示效果

![image-20230821170141352](https://www.arryblog.com/assets/img/image-20230821170141352.0ee1e06b.png)

### 6、类型注解

TIP

类型注解的作用：相当于强类型语言中的类型声明

类型注解的语法

```tsx
// 语法
let 变量名/函数 : 类型 = 初始值

// 示例：类型注解
let age: number = 18
```

注：

以上代码中

- `: number` 就是类型注解
- 作用：为变量添加类型约束
- 其中，约定变量 age 的类型为 number 类型，就只能给变量赋该类型的值，否则就会报错

### 7、类型推导

TIP

类型推导是指在 TypeScript 中，当变量声明时，可以自动推断出该变量的类型。这样，可以省略掉显式地去声明变量的类型，从而减少代码量。

TypeScript 会根据变量的初始值来推断出变量的类型，而不需要用户显式地指定变量的类型。

```tsx
// str 的值是字符串类型，推导出来 str 的变量类型就是 字符串类型
let str = "艾编程";

// 此时，给 str 重新赋值，如非字符串类型，依然会报错
// 不能将类型“number”分配给类型“string”
str = 1;
```

在以上代码中，并没有显示的告诉我们变量 str 是一个 string 类型，但是如果把鼠标移到 str 上，会发现 TypeScript 自动把变量注释为 string 类型

注：在开发中使用

- 如果 TS 能够自动分析变量类型，我们就什么也不需要做了
- 如果 TS 无法分析变量类型的话，我们就需要使用类型注解

**类型注解 和 类型推导的区别：**

- 类型注解：在定义时刻就固定了数据类型
- 类型推导：在定义是直接给编译类型的值，由 TS 自行推导数据类型

### 8、TS 编译

TIP

TS 的代码是不能直接在浏览器 或 通过 node 命令直接运行的，需要通过 tsc 命令 将 TS 编译成 JS 文件

- ①、创建 `.ts` 文件，如：`main.ts` 文件
- ②、将 TS 编译为 JS：在终端命名中输入 `tsc main.ts` ，命令执行后，在同级目录中会生成一个同名的 JS 文件
- ③、执行 JS 代码：在终端中输入命令 `node main.js` 即可运行

注：

- 由 TS 编译生成的 JS 文件中就没有类型信息了
- 所有合法的 JS 代码都是 TS 代码，有 JS 基础只需要学习 TS 的类型和新特性即可

### 8.1、编译文件目录优化

TIP

现在的 TS 文件 和 编译后的 JS 文件都在同一目录下，我们希望编译后的文件能在独立的文件目录下。

> 此时，只需要在 TS 的配置文件 `tsconfig.json` 中 配置对应的输入输出目录即可

```json
{
  "compilerOptions": {
    "rootDir": "./src" /* 指定 TS 源文件中的根文件目录 */,
    "outDir": "./src/dist" /* 指定输出编译后的 JS 的文件目录  */
  }
}
```

配置完成后，直接在项目根目录的命令行终端里 输入 tsc 命令即可完成编译

![image-20230615225746203](https://www.arryblog.com/assets/img/image-20230615225746203.ce7211a7.png)

### 8.2、重复变量名 或 函数名的编译优化

TIP

在同一目录中，不同 TS 文件中出现重复变量名 或 函数名时，编译阶段会报错

在 `/src/index.ts` 中

```ts
let str = "abc";

function foo() {}
```

在 `/src/main.ts` 中

```tsx
let str = "abc";

function foo() {}
```

![image-20230616003818633](https://www.arryblog.com/assets/img/image-20230616003818633.9d9474c7.png)

注：

- 当出现重复变量名 或 函数名时，编译会报错，但运行 tsc 命令依然可以正常生成 JS 文件
- 给当前 `index.ts` 或 `main.ts` 文件中添加一行 `export {}` 来改变当前文件的作用域即可

```tsx
let str = "abc";

function foo() {}

export {};
```

> 此时，就不会报错了 ！运行 tsc 命名也不会报错

### 8.3、TS 出现语法错误，不编译

TIP

在 VSCode 命令行终端中输入如下命令，表示 TS 文件中有语法错误时，就不编译成 JS 文件

```shell
# 当 TS 中出现语法错误时，就不发出编译命令
tsc --noEmitOnError
```

### 8.4、使用 ts-node 直接运行 TS

TIP

通过上面的操作会发现，每次修改代码后，都需要重复执行 `tsc` 命令 并 执行 `node xxx.js` 这两行命令，才能运行 TS 代码，非常麻烦。

> 使用 `ts-node` 包，可 “直接” 在 Node.js 环境中 执行 TS 代码。安装 `ts-node` 包命令如下

```shell
# 安装 ts-node
npm i ts-node -g
```

使用 `ts-node` 命令运行 TS 代码

```shell
# 运行指定 TS 文件代码
ts-node index.ts
```

注：

`ts-node` 命令本质上是在内部将 TS -> JS ，然后再运行 JS 代码的。也并非直接在 Node.js 环境中 执行 TS 代码

## 四、TS 基本数据类型

TIP

我们之前学过 ES6 中有 7 种基本数据类型 和 3 种引用数据类型

- ES6 中的 7 种基本数据类型：Boolean 、Number、bigint、String、Symbol、undefined、null
- ES6 中的 3 种引用数据类型：Array、Function、Object

| JavaScript 原始类型 | TypeScript 类型  | 描述           |
| :------------------ | :--------------- | :------------- |
| Boolean             | Boolean          | 布尔           |
| Number              | Number           | 数字           |
| bigint              | bigint           | 大整数         |
| String              | String           | 字符串         |
| undefined           | undefined        | 未定义         |
| null                | null             | Null 类型      |
| Symbol              | Symbol           | Symbol 类型    |
| **引用数据类型**    | **引用数据类型** |                |
| Array               | Array            | 数组           |
| Function            | Function         | 函数           |
| Object              | Object           | 对象           |
| /                   | **新增**         |                |
| /                   | void             | 无返回值的类型 |
| /                   | any              | 任意类型       |
| /                   | never            | 不能是任何值   |
| /                   | tuple            | 元组           |
| /                   | enum             | 枚举           |
| /                   | 更多高级类型     |                |

TIP：

- TypeScript 继承了 JavaScript 的类型设计，以上的基本类型（原始类型）和 部分引用数据类型（Object）可以看作 TypeScript 的基本类型；
- undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们；
- 基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成；

**注意：**

以上所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 JavaScript 语言中都是内置对象，而不是类型名称。

### 1、原始数据类型

```tsx
// 原始类型
let bool: boolean = true;
let num: number = 123;
let str: string = "艾编程";

// str = 123 // 改变数据类型会报错
```

注：

在 TS 中 与 JS 的原始数据类型最大的区别是：变量的数据类型是不可以改变的

### 1.1、boolean 类型

TIP

`boolean`类型只包含`true`和`false`两个布尔值

```tsx
let a: boolean = true;
let b: boolean = false;

console.log(a, b); // true false

// 变量 a 和 b 就属于 boolean 类型
```

### 1.2、number 类型

TIP

`number`类型包含所有整数和浮点数

```tsx
// 整数
let a: number = 1;
// 浮点数
let b: number = 3.1415926;
// 十六进制数
let c: number = 0xffff;

console.log(a, b, c); // 1 3.1415926 65535

// 整数、浮点数 和 非十进制数都属于 number 类型
```

### 1.3、string 类型

TIP

`string`类型包含所有字符串

```tsx
// 普通字符串
let a: string = "hello";
// 模板字符串
let b: string = `${a}，艾编程`;

console.log(b); // hello，艾编程

// 普通字符串 和 模板字符串都属于 string 类型
```

### 1.4、bigint 类型

TIP

bigint 类型包含所有的大整数，详细查阅 [BigInt 文档(opens new window)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint)

```tsx
const a: bigint = 100n;
const b: bigint = 0xffffn;

console.log(a); // 100n 65535n

// 变量 a 和 b 属于 bigint 类型
```

在默认配置下，以上代码会报错

因为，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数`target`不低于`es2020`）。

> 同时，bigint 也是 TypeScript 3.2 的版本中引入的 。

```json
{
  "compilerOptions": {
    // 将默认 es2016 改为 es2020
    "target": "es2020"
  }
}
```

bigint 与 number 类型不兼容

```tsx
const a: bigint = 100; // 报错
const b: bigint = 2.25; // 报错

// bigint类型赋值为整数和小数，都会报错
```

### 1.5、symbol 类型

TIP

- symbol 的含义是：具有唯一的值
- symbol 类型包含所有的 Symbol 值

```tsx
// Symbol 类型

// 方式一：显示声明 s1 是 Symbol 类型，将其赋值给一个 Symbol()
// Symbol() 函数的返回值就是 symbol 类型
let s1: symbol = Symbol();
// 方式二：直接创建一个 Symbol()
let s2 = Symbol();

console.log(s1 === s2); // false ，s1 和 s2 这两个变量是不相等的
```

### 1.6、object 类型

TIP

根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数

```tsx
// 对象
let a: object = { foo: 121 };
// 数组
let b: object = [1, 2, 3, 4, 5];
// 函数
let c: object = (x: number) => x + 2;

// 对象、数组、函数都属于 object 类型
```

注：

在 JS 中可以任意修改对象的属性，在 TS 中这种操作是不允许的。

```tsx
// 对象
let obj: Object = { x: 1, y: 2 };
obj.x = 6; // 在 TS 中会报错，因为我们只是简单的指定了 obj 是 Object 类型，并没有具体的定义它应该包含哪些属性

// 正确的做法如下
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 6;
```

### 1.7、undefined 类型

TIP

我们可以为一个变量声明为 undefined 。但，如果声明了 undefined 它就不能被赋值为其他的数据类型了（即：只能被赋值为它本身）。

```tsx
// undefined
let uf: undefined = undefined;

// 赋值其他数据类型，就会报错
let uf: undefined = 1;
```

![image-20230620163851900](https://www.arryblog.com/assets/img/image-20230620163851900.e2ad0b9a.png)

### 1.8、null 类型

TIP

我们也可以为一个变量声明为 null ，同时与 undefined 一样，如果声明了 null 它就不能被赋值为其他数据类型了（即：只能被赋值为它本身）

```tsx
// null
let nu: null = null;

// 赋值其他数据类型，就会报错
let nu: null = 2;
```

![image-20230620164717618](https://www.arryblog.com/assets/img/image-20230620164717618.be2206a4.png)

反过来，其它的变量能赋值给 undefined 和 null 吗 ？

```tsx
let num: number = 123;

// 将 undefined 和 null 赋值给 num ，发现编辑器直接会报错
num = undefined;
num = null;
```

![image-20230620171303184](https://www.arryblog.com/assets/img/image-20230620171303184.f75b2923.png)

在 TS 官方的文档中，[undefined 和 null (opens new window)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)是任何类型的子类型，这说它是可以被赋值为其它类型。但我们需要做一些设置 ！

在 `tsconfig.json` 配置文件中，将 strictNullChecks 的值修改为 false

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

修改配置后，就允许将其它变量赋值给 undefined 和 null 了

```ts
let num: number = 123;

// 将 undefined 和 null 赋值给 num ，此时就不会报错了
num = undefined;
num = null;
```

![image-20230620180218943](https://www.arryblog.com/assets/img/image-20230620180218943.72bc9dd4.png)

> 如果我们想在 TS 中使用更严格的语法呢 ，就可以将该配置关闭掉。

```tsx
{
  "compilerOptions": {
     // "strictNullChecks": false
  }
}
```

关闭掉后，如果还允许将其它变量赋值给 undefined 和 null，就需要用到 **联合类型**

```tsx
// 使用联合类型，这样就可以通过类型检查
let num: number | undefined | null = 123;

// 将 undefined 和 null 赋值给 num
num = undefined;
num = null;
```

### 2、包装对象类型

TIP

JavaScript 的 8 种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```tsx
// 字符串 "icoding" 执行了 charAt() 方法
const s = "icoding".charAt(2);
console.log(s); // 'o'
```

以上代码中

字符串`icoding`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。

这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

> 这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

### 2.1、可获取包装对象的类型

TIP

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`
- `String()`
- `Number()`

> 以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```tsx
// s 为 字符串 "icoding" 的包装对象
const s = new String("icoding");
// typeof 运算符返回 object，而不是 string。但是本质上它还是字符串，可以使用所有的字符串方法
console.log(typeof s); // "object"

// 使用 charAt 方法
console.log(s.charAt(3)); // "d"
```

注：

`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。

如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

### 2.2、包装对象类型与字面量类型

TIP

由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

```tsx
// 字面量
"icoding";
// 包装对象
new String("icoding");

// 以上两行代码，它们都是字符串
```

注：

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

- Boolean 和 boolean
- String 和 string
- Number 和 number
- BigInt 和 bigint
- Symbol 和 symbol

> 其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

```tsx
const s1: String = "icoding"; // 正确
const s2: String = new String("icoding"); // 正确

const s3: string = "icoding"; // 正确
const s4: string = new String("icoding"); // 报错
```

注：

以上代码中，`String`类型可以赋值为字符串的字面量，也可以赋值为包装对象。

但是，`string`类型只能赋值为字面量，赋值为包装对象就会报错。

### 2.3、最佳实践

TIP

建议只使用小写类型，不使用大写类型。

因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```tsx
const n1: number = 1;
const n2: Number = 1;

Math.abs(n1); // 1
Math.abs(n2); // 报错

// Math.abs() 方法的参数类型被定义成小写的number，传入大写的Number类型就会报错。
```

注：

通过前面的学习我们知道，`Symbol()`和`BigInt()`这两个函数不能当作构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，除非使用下面的写法。

但是，它们没有使用场景，因此`Symbol`和`BigInt`这两个类型虽然存在，但是完全没有使用的理由。

```tsx
let x = Object(Symbol());
let y = Object(BigInt());

// 代码中，得到的就是 Symbol 和 BigInt 的包装对象，但是没有使用的意义。
```

TIP

目前在 TypeScript 里面，`symbol`和`Symbol`两种写法没有差异，`bigint`和`BigInt`也是如此，不知道是否属于官方的疏忽。

因此，建议始终使用小写的`symbol`和`bigint`，不使用大写的`Symbol`和`BigInt`。

### 3、Object 类型 与 object 类型

TIP

TypeScript 的对象类型也有大写`Object`和小写`object`两种。

### 3.1、大写 Object 类型

TIP

大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是`Object`类型，这囊括了几乎所有的值。

```tsx
let obj: Object;

// boolean
obj = true;
// string
obj = "icoding";
// number
obj = 1;
// 对象
obj = { foo: 100 };
// 数组
obj = [1, 2, 3];
// 函数
obj = (x: number) => x + 1;

// 原始类型值、对象、数组、函数都是合法的 Object 类型
```

注：

除了`undefined`和`null`这两个值不能转为对象，其他任何值都可以赋值给`Object`类型。

```tsx
let obj: Object;

obj = undefined; // 报错
obj = null; // 报错

// undefined 和 null 赋值给 Object 类型，就会报错
```

另外，空对象`{}`是`Object`类型的简写形式，所以使用`Object`时常常用空对象代替。

```tsx
let obj: {};

// boolean
obj = true;
// string
obj = "icoding";
// number
obj = 1;
// 对象
obj = { foo: 100 };
// 数组
obj = [1, 2, 3];
// 函数
obj = (x: number) => x + 1;

// 变量 obj 的类型是空对象 {}，就代表 Object 类型
```

注：

无所不包的`Object`类型既不符合直觉，也不方便使用。

### 3.2、小写 object 类型

TIP

小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```tsx
let obj: object;

// boolean
obj = true; // 报错
// string
obj = "icoding"; // 报错
// number
obj = 1; // 报错

// 对象
obj = { foo: 100 };
// 数组
obj = [1, 2, 3];
// 函数
obj = (x: number) => x + 1;

// object 类型不包含原始类型值，只包含对象、数组 和 函数
```

注：

- 大多数时候，我们使用对象类型，只希望包含真正的对象，不希望包含原始类型。所以，建议总是使用小写类型`object`，不使用大写类型`Object`。
- 无论是大写的`Object`类型，还是小写的`object`类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```tsx
// 大写 Object 类型
const o1: Object = { foo: 0 };
// 小写 object 类型
const o2: object = { foo: 0 };

o1.toString(); // toString() 是对象的原生方法，可以正确访问
o1.foo; // foo 是自定义属性，访问就会报错

o2.toString(); // 正确
o2.foo; // 报错
```

### 4、值类型

TIP

TypeScript 规定，单个值也是一种类型，称为“值类型”。

```tsx
let a: "icoding";

a = "icoding"; // 正确
a = "ibc"; // 报错，不能将 "ibc" 分配给类型 "icoding"

// 变量 a 的类型是字符串 icoding，导致它只能赋值为这个字符串，赋值为其他字符串就会报错
```

TypeScript 推断类型时，遇到`const`命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

```tsx
// a 的类型是 "icoding"
const a = "icoding";
// c 的类型是 “string”
let c = "icoding";

// b 的类型是 string
const b: string = "icoding";

// 变量 a 是 const 命令声明的，TypeScript 就会推断它的类型是值 icoding，而不是 string 类型。
```

这样推断是合理的，因为`const`命令声明的变量，一旦声明就不能改变，相当于常量。值类型就意味着不能赋为其他值。

注：

`const`命令声明的变量，如果赋值为对象，并不会推断为值类型。

```tsx
// a 的类型是 { foo: number }
const a = { foo: 1 };

// 变量 a 没有被推断为值类型，而是推断属性 foo 的类型是 number
// 这是因为 JavaScript 里面，const 变量赋值为对象时，属性值是可以改变的
```

### 4.1、值类型注意事项

TIP

值类型可能会出现一些很奇怪的报错。

```tsx
const a: 6 = 2 + 4; // 报错
```

注：

以上代码中，等号左侧的类型是数值`6`，等号右侧`2 + 4`的类型，TypeScript 推测为`number`。

由于`6`是`number`的子类型，`number`是`6`的父类型，父类型不能赋值给子类型，所以报错了。

> 但是，反过来是可以的，子类型可以赋值给父类型。

```tsx
let a: 6 = 6;
let b: number = 2 + 4;

a = b; // 报错，不能将类型 number 分配给类型 6
b = a; // 正确

// 变量 a 属于子类型，变量 b 属于父类型。子类型 a 不能赋值为父类型 b，但是反过来是可以的。
```

如果一定要让子类型可以赋值为父类型的值，就要用到类型断言

```tsx
const a: 6 = (2 + 4) as 6; // 正确

// 在 2 + 4 后面加上 as 6，就是告诉编译器，可以把 2 + 4 的类型视为值类型 6，这样就不会报错了
```

> 只包含单个值的值类型，用处不大。实际开发中，往往将多个值结合，作为联合类型使用。

### 5、联合类型

TIP

联合类型（union types）指的是多个类型组成的一个新类型，使用符号`|`表示。

联合类型`A|B`表示，任何一个类型只要属于`A`或`B`，就属于联合类型`A|B`。

```tsx
let a: string | number;

a = 100; // 正确
a = "icoding"; // 正确

// 变量 a 就是联合类型 string|number，表示它的值既可以是字符串，也可以是数值。
```

联合类型可以与值类型相结合，表示一个变量的值有若干种可能。

```tsx
let bool: true | false;

let sex: "male" | "female";

let color: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";

// 以上都是由值类型组成的联合类型，非常清晰地表达了变量的取值范围。
// 其中，true|false 其实就是布尔类型 boolean
```

前面提到，打开编译选项`strictNullChecks`后，其他类型的变量不能赋值为`undefined`或`null`。这时，如果某个变量确实可能包含空值，就可以采用联合类型的写法。

```tsx
let username: string | null;

username = "icoding";
username = null;

// 变量 username 的值可以是字符串，也可以是 null
```

### 5.1、联合类型注意事项

TIP

联合类型的第一个成员前面，也可以加上竖杠`|`，这样便于多行书写。

```tsx
let a: "one" | "two" | "three" | "four";

// 联合类型的第一个成员 one 前面，加上了竖杠
```

如果一个变量有多种类型，读取该变量时，往往需要进行“类型缩小”（type narrowing），区分该值到底属于哪一种类型，然后再进一步处理。

```tsx
function printId(id: number | string) {
  console.log(id.toUpperCase()); // 报错
}

// 参数变量 id 可能是数值，也可能是字符串，这时直接对这个变量调用 toUpperCase()方法会报错
// 因为这个方法只存在于字符串，不存在于数值。
```

解决方法就是对参数`id`做一下类型缩小，确定它的类型以后再进行处理。

```tsx
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// 函数体内部会判断一下变量 id 的类型，如果是字符串，就对其执行 toUpperCase()方法
```

注：

“类型缩小”是 TypeScript 处理联合类型的标准方法，凡是遇到可能为多种类型的场合，都需要先缩小类型，再进行处理。

实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）。

### 5.2、类型缩小应用场景

```tsx
function getPort(scheme: "http" | "https") {
  switch (scheme) {
    case "http":
      return 80;
    case "https":
      return 443;
  }
}

// 函数体内部对参数变量 scheme 进行类型缩小，根据不同的值类型，返回不同的结果。
```

### 6、交叉类型

TIP

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号`&`表示。

交叉类型`A&B`表示，任何一个类型必须同时属于`A`和`B`，才属于交叉类型`A&B`，即交叉类型同时满足`A`和`B`的特征。

```tsx
let a: number & string;

// 变量 a 同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为 a 的类型实际是 never
```

### 6.1、交叉类型的应用场景

TIP

交叉类型的主要用途是表示对象的合成。

```tsx
let obj: { foo: string } & { bar: string };

obj = {
  foo: "icoding",
  bar: "love",
};

console.log(obj); // { foo: 'icoding', bar: 'love' }

// 变量 obj 同时具有属性 foo 和 属性 bar。
```

交叉类型常常用来为对象类型添加新属性。

```tsx
type X = { foo: number };

// 类型 Y 是一个交叉类型
type Y = X & { bar: number };

// 类型 Y 是一个交叉类型，用来在 X 的基础上增加了属性 bar。
```

### 7、type 命令

TIP

`type`命令用来定义一个类型的别名。

```tsx
// 使用 type 命令为 number 类型定义了一个别名 Age
type Age = number;

// 这样就能像使用 number 一样，使用 Age 作为类型
let age: Age = 18;

console.log(age); // 18
```

别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。

注：

别名不允许重名

```tsx
type Color = "red";
type Color = "blue"; // 报错

// 同一个别名 Color 声明了两次，就报错了。
```

别名的作用域是块级作用域。这意味着，代码块内部定义的别名，影响不到外部。

```tsx
// 定义一个 类型别名 Color
type Color = "red";

if (Math.random() < 0.5) {
  // if 代码块内部 定义一个同名的 类型别名 Color
  type Color = "blue";
}

// if 代码块内部的类型别名 Color，跟外部的 Color 是不一样的
```

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。

```tsx
type World = "world";
type Str = `hello ${World}`;

// 别名 Str 使用了模板字符串，读取另一个别名 World
```

注：

`type`命令属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除。

### 8、typeof 运算符

TIP

JavaScript 语言中，typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型。

```tsx
typeof "icoding";

console.log(typeof "icoding"); // 'string'

// typeof 运算符返回字符串 icoding 的类型是 string
```

> 注意，这时 typeof 的操作数是一个值。

在 JavaScript 里面，`typeof`运算符只可能返回八种结果，而且都是字符串。

```tsx
typeof undefined;
typeof true;
typeof 123;
typeof "icoding";
typeof {};
typeof parseInt;
typeof Symbol();
typeof 123n;

console.log(typeof undefined); // undefined
console.log(typeof true); // boolean
console.log(typeof 123); // number
console.log(typeof "icoding"); // string
console.log(typeof {}); // object
console.log(typeof parseInt); // function
console.log(typeof Symbol()); // symbol
console.log(typeof 123n); // bigint

// typeof 运算符在 JavaScript 语言里面，可能返回的八种结果
```

TypeScript 将`typeof`运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。

```tsx
const a = { x: 0 };

type T1 = typeof a; // { x: number }
type T2 = typeof a.x; // number

// typeof a 表示返回变量 a 的 TypeScript 类型（{ x: number }）
// 同理，typeof a.x 返回的是属性x的类型（number）
```

这种用法的`typeof`返回的是 TypeScript 类型，所以只能用在类型运算之中（即跟类型相关的代码之中），不能用在值运算。

也就是说，同一段代码可能存在两种`typeof`运算符，一种用在值相关的 JavaScript 代码部分，另一种用在类型相关的 TypeScript 代码部分。

```tsx
let a = 1;
let b: typeof a;

if (typeof a === "number") {
  b = a;
}

// 用到了两个 typeof，第一个是类型运算，第二个是值运算。
// 它们是不一样的，不要混淆
```

JavaScript 的 typeof 遵守 JavaScript 规则，TypeScript 的 typeof 遵守 TypeScript 规则。它们的一个重要区别在于，编译后，前者会保留，后者会被全部删除。

> 以上的代码编译结果如下：

```js
let a = 1;
let b;
if (typeof a === "number") {
  b = a;
}

// 只保留了原始代码的第二个 typeof，删除了第一个 typeof
```

由于编译时不会进行 JavaScript 的值运算，所以 TypeScript 规定，typeof 的参数只能是标识符，不能是需要运算的表达式。

```tsx
type T = typeof Date(); // 报错

// 原因是 typeof 的参数不能是一个值的运算式，而 Date() 需要运算才知道结果。
```

另外，`typeof`命令的参数不能是类型。

```tsx
type Age = number;
type MyAge = typeof Age; // 报错

// Age 是一个类型别名，用作 typeof 命令的参数就会报错。
```

注：

typeof 是一个很重要的 TypeScript 运算符，有些场合不知道某个变量`foo`的类型，这时使用`typeof foo`就可以获得它的类型。

### 9、块级类型声明

TIP

TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。

```tsx
const bool: boolean = false;

if (bool) {
  type T = number;
  let a: T = 2;
  console.log(a);
} else {
  type T = string;
  let a: T = "icoding";
  console.log(a); // icoding
}

// 以上代码，存在两个代码块，其中分别有一个类型 T 的声明
// 这两个声明都只在自己的代码块内部有效，在代码块外部无效
```

### 10、类型的兼容

TIP

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。

```tsx
type T = number | string;

let a: number = 2;
let b: T = a;

// 变量 a 和 b 的类型是不一样的，但是变量 a 赋值给变量 b 并不会报错
// 这时，我们就认为，b 的类型兼容 a 的类型
```

注：

TypeScript 为这种情况定义了一个专门术语。如果类型`A`的值可以赋值给类型`B`，那么类型`A`就称为类型`B`的子类型（subtype）。

> 以上代码中，类型`number`就是类型`number|string`的子类型。

TypeScript 的一个规则是，凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

```tsx
let a: "hello" = "hello";
let b: string = "icoding";

b = a; // 正确
a = b; // 报错

// hello 是 string 的子类型，string 是 hello 的父类型
// 所以，变量 a 可以赋值给变量 b，但是反过来就会报错
```

注：

之所以有这样的规则，是因为子类型继承了父类型的所有特征，所以可以用在父类型的场合。

但是，子类型还可能有一些父类型没有的特征，所以父类型不能用在子类型的场合。
