import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/blogs/web/html': [
    {
      text: 'HTML',
      collapsed: false,
      items: [
        {
          text: '前端 HTMLHTML5 核心标签和属性',
          link: '/blogs/web/html/前端 HTMLHTML5 核心标签和属性.md',
        },
        {
          text: 'HTMLHTML5 标签基础语法',
          link: '/blogs/web/html/HTMLHTML5 标签基础语法.md',
        },
        {
          text: 'HTMLHTML5 常用标签和属性',
          link: '/blogs/web/html/HTMLHTML5 常用标签和属性.md',
        },
      ],
    },
  ],
  '/blogs/web/css': [
    {
      text: 'CSS/CSS3核心',
      items: [
        {
          text: '前端 CSS、CSS3 核心样式和属性',
          link: '/blogs/web/css/前端 CSS、CSS3 核心样式和属性.md',
        },
      ],
    },
    {
      text: 'CSS/CSS3',
      items: [
        {
          text: 'CSS 基础认知 和 选择器',
          link: '/blogs/web/css/CSS 基础认知 和 选择器.md',
        },
        {
          text: 'CSS 文本和字体属性、列表属性',
          link: '/blogs/web/css/CSS 文本和字体属性、列表属性.md',
        },
        {
          text: 'CSS 盒子模型',
          link: '/blogs/web/css/CSS 盒子模型.md',
        },
        {
          text: 'CSS display 属性、背景属性、其他常用属性',
          link: '/blogs/web/css/CSS display 属性、背景属性、其他常用属性.md',
        },
        {
          text: 'CSS 三大特性：继承、层叠性、优先级',
          link: '/blogs/web/css/CSS 三大特性：继承、层叠性、优先级.md',
        },
        {
          text: '浮动、BFC 规范、清除浮动的最佳实践',
          link: '/blogs/web/css/浮动、BFC 规范、清除浮动的最佳实践.md',
        },
        {
          text: 'CSS 定位、层叠顺序、层叠上下文',
          link: '/blogs/web/css/CSS 定位、层叠顺序、层叠上下文.md',
        },
        {
          text: 'margin 负值的最佳实践',
          link: '/blogs/web/css/margin 负值的最佳实践.md',
        },
        {
          text: '圆角、阴影、文本图像处理、CSS 函数',
          link: '/blogs/web/css/圆角、阴影、文本图像处理、CSS 函数.md',
        },
        {
          text: 'transition 过渡动画与 animation 自定义动画',
          link: '/blogs/web/css/transition 过渡动画与 animation 自定义动画.md',
        },
        {
          text: 'transform 2D 与 3D 转换',
          link: '/blogs/web/css/transform 2D 与 3D 转换.md',
        },
      ],
    },
    {
      text: '项目解决方案',
      items: [
        {
          text: '防御式编程 - 防御式 CSS',
          link: '/blogs/web/css/防御式编程 - 防御式 CSS.md',
        },
      ],
    },
  ],
  '/blogs/web/javascript': [
    {
      text: 'javascript核心基础',
      items: [
        {
          text: 'JavaScript 简介、核心语法、变量',
          link: '/blogs/web/javascript/JavaScript 简介、核心语法、变量.md',
        },
        {
          text: 'JavaScript 数据类型和类型转换',
          link: '/blogs/web/javascript/JavaScript 数据类型和类型转换.md',
        },
        {
          text: 'JavaScript 表达式、操作符、位运算符',
          link: '/blogs/web/javascript/JavaScript 表达式、操作符、位运算符.md',
        },
        {
          text: 'JavaScript 流程控制语句 和 算法',
          link: '/blogs/web/javascript/JavaScript 流程控制语句 和 算法.md',
        },
        {
          text: 'JavaScript 数组应用 和 算法',
          link: '/blogs/web/javascript/JavaScript 数组应用 和 算法.md',
        },
        {
          text: 'JS 函数、作用域（链）、变量函数提升、算法核心',
          link: '/blogs/web/javascript/JS 函数、作用域（链）、变量函数提升、算法核心.md',
        },
        {
          text: '深入 JavaScript 数组相关方法 和 API',
          link: '/blogs/web/javascript/深入 JavaScript 数组相关方法 和 API.md',
        },
        {
          text: 'JavaScript 算法，大厂前端面试真题',
          link: '/blogs/web/javascript/JavaScript 算法，大厂前端面试真题.md',
        },
      ],
    },
    {
      text: 'javascript核心重点',
      items: [
        {
          text: 'JavaScript 面向对象，原型和原型链',
          link: '/blogs/web/javascript/JavaScript 面向对象，原型和原型链.md',
        },
        {
          text: 'JavaScript DOM 事件，事件流，事件对象，事件委托',
          link: '/blogs/web/javascript/JavaScript DOM 事件，事件流，事件对象，事件委托.md',
        },
        {
          text: 'JavaScript DOM 样式 与 节点操作',
          link: '/blogs/web/javascript/JavaScript DOM 样式 与 节点操作.md',
        },
        {
          text: 'JavaScript 定时器、延时器、CSS3 动画事件，防抖节流',
          link: '/blogs/web/javascript/JavaScript 定时器、延时器、CSS3 动画事件，防抖节流.md',
        },
        {
          text: 'JavaScript 鼠标事件 和 HTML5 拖拽事件的综合应用',
          link: '/blogs/web/javascript/JavaScript 鼠标事件 和 HTML5 拖拽事件的综合应用.md',
        },
        {
          text: 'JavaScript BOM 核心 Window 对象属性、方法、事件',
          link: '/blogs/web/javascript/JavaScript BOM 核心 Window 对象属性、方法、事件.md',
        },
        {
          text: 'defineProperty 方法，JS 公有、私有、静态，栈和队列',
          link: '/blogs/web/javascript/defineProperty 方法，JS 公有、私有、静态，栈和队列.md',
        },
        {
          text: 'JavaScript 继承的 6 种方式、应用场景，内置构造函数',
          link: '/blogs/web/javascript/JavaScript 继承的 6 种方式、应用场景，内置构造函数.md',
        },
        {
          text: 'JavaScript 三大包装类 Number、String、Boolean',
          link: '/blogs/web/javascript/JavaScript 三大包装类 Number、String、Boolean.md',
        },
        {
          text: 'JS 的 Math 与 Date 对象，手写活动倒计时、日历组件',
          link: '/blogs/web/javascript/JS 的 Math 与 Date 对象，手写活动倒计时、日历组件.md',
        },
        {
          text: 'JavaScript 正则表达式从入门到实践，正则相关工具',
          link: '/blogs/web/javascript/JavaScript 正则表达式从入门到实践，正则相关工具.md',
        },
        {
          text: 'JavaScript 核心基础，阶段测试题',
          link: '/blogs/web/javascript/JavaScript 核心基础，阶段测试题.md',
        },
      ],
    },
    {
      text: 'javascript底层原理',
      items: [
        {
          text: 'JavaScript 执行原理、闭包、垃圾回收、立即执行函数',
          link: '/blogs/web/javascript/JavaScript 执行原理、闭包、垃圾回收、立即执行函数.md',
        },
        {
          text: 'JavaScript 错误处理、LHS 左查询、RHS 右查询',
          link: '/blogs/web/javascript/JavaScript 错误处理、LHS 左查询、RHS 右查询.md',
        },
      ],
    },
  ],
  '/blogs/web/vue/': [
    {
      text: 'vue基础',
      items: [
        {
          text: 'Vue 基础 - 模板语法、事件处理、计算属性、侦听器',
          link: '/blogs/web/vue/Vue 基础 - 模板语法、事件处理、计算属性、侦听器.md',
        },
        {
          text: 'Vue 基础 - 表单、样式绑定，条件、列表渲染、指令',
          link: '/blogs/web/vue/Vue 基础 - 表��、样式绑定，条件、列表渲染、指令.md',
        },
        {
          text: 'Vue 生命周期、自定义指令、模板引用的原理与实践',
          link: '/blogs/web/vue/Vue 生命周期、自定义指令、模板引用的原理与实践.md',
        },
      ],
    },
    {
      text: '组件通信',
      items: [
        {
          text: 'Vue 单文件组件，父子组件间传值、通信，透传属性',
          link: '/blogs/web/vue/Vue 单文件组件，父子组件间传值、通信，透传属性.md',
        },
        {
          text: 'Vue 插槽 Slots，自定义弹窗、高级列表组件，依赖注入',
          link: '/blogs/web/vue/Vue 插槽 Slots，自定义弹窗、高级列表组件，依赖注入.md',
        },
        {
          text: 'Vue 兄弟组件间通信、发布与订阅，动态、异步组件',
          link: '/blogs/web/vue/Vue 兄弟组件间通信、发布与订阅，动态、异步组件.md',
        },
      ],
    },
    {
      text: '组合式API',
      items: [
        {
          text: 'Vue 组合式 API - setup、reactive 与 ref，响应式工具',
          link: '/blogs/web/vue/Vue 组合式 API - setup、reactive 与 ref，响应式工具.md',
        },
        {
          text: 'Vue 组合式 API - watch 和 watchEffect、自定义指令',
          link: '/blogs/web/vue/Vue 组合式 API - watch 和 watchEffect、自定义指令.md',
        },
        {
          text: 'Vue 组合式 API - ref，通信 API，依赖注入，生命周期',
          link: '/blogs/web/vue/Vue 组合式 API - ref，通信 API，依赖注入，生命周期.md',
        },
      ],
    },
    {
      text: '路由和导航守卫',
      items: [
        {
          text: 'Vue Router 路由，前后端路由原理 与 具体实现',
          link: '/blogs/web/vue/Vue Router 路由，前后端路由原理 与 具体实现.md',
        },
        {
          text: 'Vue Router 路由传参、别名、匹配语法、编程式导航',
          link: '/blogs/web/vue/Vue Router 路由传参、别名、匹配语法、编程式导航.md',
        },
        {
          text: 'Vue Router 导航守卫、过渡与滚动、懒加载、动态路由',
          link: '/blogs/web/vue/Vue Router 导航守卫、过渡与滚动、懒加载、动态路由.md',
        },
      ],
    },
    {
      text: 'Pinia',
      items: [
        {
          text: 'Pinia 全局状态管理，深入 State、Getter、Action',
          link: '/blogs/web/vue/Pinia 全局状态管理，深入 State、Getter、Action.md',
        },
      ],
    },
    {
      text: '其他',
      items: [
        {
          text: 'Vue 渲染机制 - 虚拟 DOM，render、h 函数，渲染流程',
          link: '/blogs/web/vue/Vue 渲染机制 - 虚拟 DOM，render、h 函数，渲染流程.md',
        },
        {
          text: 'Vue 中 Transition 和 TransitionGroup 组件，实践应用',
          link: '/blogs/web/vue/Vue 中 Transition 和 TransitionGroup 组件，实践应用.md',
        },
        {
          text: 'Vue 插件开发，Element Plus、VantUI 组件库实践应用',
          link: '/blogs/web/vue/Vue 插件开发，Element Plus、VantUI 组件库实践应用.md',
        },
        {
          text: 'Vue 中的 Teleport 内置组件',
          link: '/blogs/web/vue/Vue 中的 Teleport 内置组件.md',
        },
      ],
    },
    {
      text: 'Vue3技术揭秘',
      items: [
        {
          text: '1 开篇词：Vue3和Vue2',
          link: '/blogs/web/vue/1 开篇词：Vue3和Vue2.md',
        },
        {
          text: '2 渲染器：组件是如何被渲染成 DOM 的？',
          link: '/blogs/web/vue/2 渲染器：组件是如何被渲染成 DOM 的？.md',
        },
        {
          text: '3 渲染器：数据访问是如何被代理的？',
          link: '/blogs/web/vue/3 渲染器：数据访问是如何被代理的？.md',
        },
        {
          text: '4 渲染器：组件是如何完成更新的？',
          link: '/blogs/web/vue/4 渲染器：组件是如何完成更新的？.md',
        },
        {
          text: '5 渲染器：数组子节点的 diff 算法',
          link: '/blogs/web/vue/5 渲染器：数组子节点的 diff 算法.md',
        },
        {
          text: '6 响应式原理：基于 Proxy 的响应式是什么样的？',
          link: '/blogs/web/vue/6 响应式原理：基于 Proxy 的响应式是什么样的？.md',
        },
        {
          text: '7 响应式原理：副作用函数探秘',
          link: '/blogs/web/vue/7 响应式原理：副作用函数探秘.md',
        },
        {
          text: '8 响应式原理：Vue 3 的 nextTick ？',
          link: '/blogs/web/vue/8 响应式原理：Vue 3 的 nextTick ？.md',
        },
        {
          text: '9 响应式原理：watch 函数的实现原理',
          link: '/blogs/web/vue/9 响应式原理：watch 函数的实现原理.md',
        },
        {
          text: '10 响应式原理：computed 函数和普通函数有什么不同？',
          link: '/blogs/web/vue/10 响应式原理：computed 函数和普通函数有什么不同？.md',
        },
        {
          text: '11 响应式原理：依赖注入实现跨级组件数据共享',
          link: '/blogs/web/vue/11 响应式原理：依赖注入实现跨级组件数据共享.md',
        },
        {
          text: '12 编译器：模板是如何被编译成 AST 的？',
          link: '/blogs/web/vue/12 编译器：模板是如何被编译成 AST 的？',
        },
        {
          text: '13 编译器：AST 是如何被转换成 JS AST 的？',
          link: '/blogs/web/vue/13 编译器：AST 是如何被转换成 JS AST 的？.md',
        },
        {
          text: '14 编译器：JS AST 是如何生成渲染函数的？',
          link: '/blogs/web/vue/14 编译器：JS AST 是如何生成渲染函数的？.md',
        },
        {
          text: '15 编译器：编译过程中的优化细节',
          link: '/blogs/web/vue/15 编译器：编译过程中的优化细节.md',
        },
        {
          text: '16 内置组件：Transition 是如何实现的？',
          link: '/blogs/web/vue/16 内置组件：Transition 是如何实现的？.md',
        },
        {
          text: '17 内置组件：KeepAlive 保活的原理',
          link: '/blogs/web/vue/17 内置组件：KeepAlive 保活的原理.md',
        },
        {
          text: '18 内置组件：Teleport 是如何实现选择性挂载的？',
          link: '/blogs/web/vue/18 内置组件：Teleport 是如何实现选择性挂载的？.md',
        },
        {
          text: '19 内置组件：Suspense 原理与异步',
          link: '/blogs/web/vue/19 内置组件：Suspense 原理与异步.md',
        },
        {
          text: '20 特殊元素&指令：双向绑定是如何实现的？',
          link: '/blogs/web/vue/20 特殊元素&指令：双向绑定是如何实现的？.md',
        },
        {
          text: '21 特殊元素&指令：slot 插槽元素是如何实现的？',
          link: '/blogs/web/vue/21 特殊元素&指令：slot 插槽元素是如何实现的？.md',
        },
        {
          text: '22 结语：再回首，纵观 Vue 3 实现',
          link: '/blogs/web/vue/22 结语：再回首，纵观 Vue 3 实现.md',
        },
      ],
    },
  ],
  '/blogs/web/typescript/': [
    {
      text: 'TypeScript 核心基础',
      items: [
        {
          text: 'TypeScript 快速入门 - 核心基础，TS 基本数据类型',
          link: '/blogs/web/typescript/TypeScript 快速入门 - 核心基础，TS 基本数据类型.md',
        },
        {
          text: 'TypeScript 数组、元组，any、unknown、never 类型',
          link: '/blogs/web/typescript/TypeScript 数组、元组，any、unknown、never 类型.md',
        },
        {
          text: 'TypeScript 函数类型、symbol 类型、对象类型',
          link: '/blogs/web/typescript/TypeScript 函数类型、symbol 类型、对象类型.md',
        },
        {
          text: 'TypeScript 中 Enum 枚举类型、interface 接口类型',
          link: '/blogs/web/typescript/TypeScript 中 Enum 枚举类型、interface 接口类型.md',
        },
        {
          text: 'TS 中 class 类型，泛型，类型断言核心基础 与 实践应用',
          link: '/blogs/web/typescript/TS 中 class 类型，泛型，类型断言核心基础 与 实践应用.md',
        },
        {
          text: 'TS 的类型检查机制，类型兼容性、保护机制、高级类型',
          link: '/blogs/web/typescript/TS 的类型检查机制，类型兼容性、保护机制、高级类型.md',
        },
        {
          text: 'TS 模块，namespace 命名空间，declare 关键字',
          link: '/blogs/web/typescript/TS 模块，namespace 命名空间，declare 关键字.md',
        },
        {
          text: 'TypeScript 类型运算符，类型映射，类型工具',
          link: '/blogs/web/typescript/TypeScript 类型运算符，类型映射，类型工具.md',
        },
        {
          text: 'TypeScript 注释指令，tsconfig.json，tsc 命令行编辑器',
          link: '/blogs/web/typescript/TypeScript 注释指令，tsconfig.json，tsc 命令行编辑器.md',
        },
      ],
    },
    {
      text: 'TypeScript 工程实践',
      items: [
        {
          text: 'TS 工程实践，构建工具，模块系统，编写类型声明文件',
          link: '/blogs/web/typescript/TS 工程实践，构建工具，模块系统，编写类型声明文件.md',
        },
        {
          text: 'TS 工程实践中的编译工具，代码检查工具，单元测试',
          link: '/blogs/web/typescript/TS 工程实践中的编译工具，代码检查工具，单元测试.md',
        },
      ],
    },
  ],
  '/blogs/web/applet/': [
    {
      text: '微信小程序',
      items: [
        {
          text: '微信小程序发展史、开发环境准备、团队协作上线流程',
          link: '/blogs/web/applet/微信小程序发展史、开发环境准备、团队协作上线流程.md',
        },
        {
          text: '小程序项目结构、配置层、视图层、逻辑层、宿主环境',
          link: '/blogs/web/applet/小程序项目结构、配置层、视图层、逻辑层、宿主环境.md',
        },
        {
          text: '微信小程序视图层的组件、数据绑定，列表、条件渲染',
          link: '/blogs/web/applet/微信小程序视图层的组件、数据绑定，列表、条件渲染.md',
        },
        {
          text: '微信小程序页面导航、传参、事件、API、网络请求',
          link: '/blogs/web/applet/微信小程序页面导航、传参、事件、API、网络请求.md',
        },
        {
          text: '微信小程序的生命周期、生命周期函数 与 实践应用',
          link: '/blogs/web/applet/微信小程序的生命周期、生命周期函数 与 实践应用.md',
        },
        {
          text: '前后端分离架构 VS 传统架构，行业最佳实践',
          link: '/blogs/web/applet/前后端分离架构 VS 传统架构，行业最佳实践.md',
        },
        {
          text: '微信小程序自定义组件，核心基础 和 实践应用',
          link: '/blogs/web/applet/微信小程序自定义组件，核心基础 和 实践应用.md',
        },
        {
          text: '微信小程序自定义组件封装，项目最佳实践综合应用',
          link: '/blogs/web/applet/微信小程序自定义组件封装，项目最佳实践综合应用.md',
        },
        {
          text: 'JS 面向对象，代码分层架构设计实践 与 网络请求封装',
          link: '/blogs/web/applet/JS 面向对象，代码分层架构设计实践 与 网络请求封装.md',
        },
        {
          text: 'JS 面向对象、分层设计、动态数据遍历最佳实践与应用',
          link: '/blogs/web/applet/JS 面向对象、分层设计、动态数据遍历最佳实践与应用.md',
        },
        {
          text: '小程序节流防抖，骨架屏功能、用户体验优化与实践',
          link: '/blogs/web/applet/小程序节流防抖，骨架屏功能、用户体验优化与实践.md',
        },
        {
          text: '小程序 npm 支持，状态管理，分包，自定义 tabBar',
          link: '/blogs/web/applet/小程序 npm 支持，状态管理，分包，自定义 tabBar.md',
        },
        {
          text: '微信小程序云开发实现注册登录 与 多终端常见登录方式',
          link: '/blogs/web/applet/微信小程序云开发实现注册登录 与 多终端常见登录方式.md',
        },
      ],
    },
  ],
  '/blogs/web/ajax/': [
    {
      text: '网络请求，前后端通信',
      items: [
        {
          text: '前后端数据交互 与 HTTP 协议',
          link: '/blogs/web/ajax/前后端数据交互 与 HTTP 协议.md',
        },
        {
          text: '本地存储 Cookie、localStorage、sessionStorage 实践',
          link: '/blogs/web/ajax/本地存储 Cookie、localStorage、sessionStorage 实践.md',
        },
        {
          text: 'JSON、Ajax、跨域请求、XHR 对象、Axios 与 Fetch',
          link: '/blogs/web/ajax/JSON、Ajax、跨域请求、XHR 对象、Axios 与 Fetch.md',
        },
      ],
    },
  ],
  '/blogs/web/es6/': [
    {
      text: 'ES6核心基础',
      items: [
        {
          text: 'ECMAScript、ES6 简史，let、const、var 区别和应用',
          link: '/blogs/web/es6/ECMAScript、ES6 简史，let、const、var 区别和应用.md',
        },
        {
          text: 'Symbol、BigInt、模板字符串的应用场景和底层原理',
          link: '/blogs/web/es6/Symbol、BigInt、模板字符串的应用场景和底层原理.md',
        },
        {
          text: 'ES6 箭头函数 和 对象自面量增强，大厂面试真题解析',
          link: '/blogs/web/es6/ES6 箭头函数 和 对象自面量增强，大厂面试真题解析.md',
        },
        {
          text: 'ES6 解构赋值，函数参数默认值，在项目中的应用场景',
          link: '/blogs/web/es6/ES6 解构赋值，函数参数默认值，在项目中的应用场景.md',
        },
        {
          text: 'ES6 剩余参数 和 展开运算符在实际开发中的应用',
          link: '/blogs/web/es6/ES6 剩余参数 和 展开运算符在实际开发中的应用.md',
        },
        {
          text: 'Set、WeakSet、Map 数据结构的应用及面试真题解析',
          link: '/blogs/web/es6/Set、WeakSet、Map 数据结构的应用及面试真题解析.md',
        },
        {
          text: 'Class 类的属性、方法、继承、构造函数及解决方案',
          link: '/blogs/web/es6/Class 类的属性、方法、继承、构造函数及解决方案.md',
        },
        {
          text: '设计模式 - 迭代器模式和 Iterator 遍历器与 for...of 循环',
          link: '/blogs/web/es6/设计模式 - 迭代器模式和 Iterator 遍历器与 for...of 循环.md',
        },
        {
          text: 'ES6 字符串、数组、对象的新增方法和常见应用',
          link: '/blogs/web/es6/ES6 字符串、数组、对象的新增方法和常见应用.md',
        },
        {
          text: 'Generator 函数的实践与实践应用',
          link: '/blogs/web/es6/Generator 函数的实践与实践应用.md',
        },
        {
          text: 'Promise 用法、实例方法、原理与异步编程的实践应用',
          link: '/blogs/web/es6/Promise 用法、实例方法、原理与异步编程的实践应用.md',
        },
        {
          text: 'JavaScript 中的 Event Loop 事件循环、微任务与宏任务',
          link: '/blogs/web/es6/JavaScript 中的 Event Loop 事件循环、微任务与宏任务.md',
        },
        {
          text: 'ES6 Module 模块系统',
          link: '/blogs/web/es6/ES6 Module 模块系统.md',
        },
      ],
    },
  ],
  '/blogs/web/webpack/': [
    {
      text: 'webpack核心原理应用实践',
      items: [
        {
          text: '第01章—重新认识Webpack：旧时代的破局者',
          link: '/blogs/web/webpack/第01章—重新认识Webpack：旧时代的破局者.md',
        },
        {
          text: '第02章—如何理解Webpack配置底层结构逻辑',
          link: '/blogs/web/webpack/第02章—如何理解Webpack配置底层结构逻辑.md',
        },
        {
          text: '第03章—如何借助Babel+TS+ESLint构建现代JS工程环境',
          link: '/blogs/web/webpack/第03章—如何借助Babel+TS+ESLint构建现代JS工程环境.md',
        },
        {
          text: '第04章—如何借助预处理器、PostCSS等构建现代CSS工程环境',
          link: '/blogs/web/webpack/第04章—如何借助预处理器、PostCSS等构建现代CSS工程环境.md',
        },
        {
          text: '第05章—如何搭建Vue全栈开发环境',
          link: '/blogs/web/webpack/第05章—如何搭建Vue全栈开发环境.md',
        },
        {
          text: '第06章—如何搭建React全栈开发环境',
          link: '/blogs/web/webpack/第06章—如何搭建React全栈开发环境.md',
        },
        {
          text: '第07章—使用Webpack构建NPMLibrary的正确方式',
          link: '/blogs/web/webpack/第07章—使用Webpack构建NPMLibrary的正确方式.md',
        },
        {
          text: '第08章—使用Webpack构建微前端应用',
          link: '/blogs/web/webpack/第08章—使用Webpack构建微前端应用.md',
        },
        {
          text: '第09章—如何借助Webpack开发PWA、Node、Electron应用',
          link: '/blogs/web/webpack/第09章—如何借助Webpack开发PWA、Node、Electron应用.md',
        },
        {
          text: '第10章—深入理解图像加载原理与最佳实践',
          link: '/blogs/web/webpack/第10章—深入理解图像加载原理与最佳实践.md',
        },
        {
          text: '第11章—深入理解Webpack核心配置结构',
          link: '/blogs/web/webpack/第11章—深入理解Webpack核心配置结构.md',
        },
        {
          text: '第12章—构建性能：分享7款常用的性能分析工具',
          link: '/blogs/web/webpack/第12章—构建性能：分享7款常用的性能分析工具.md',
        },
        {
          text: '第13章—如何使用Webpack持久化缓存大幅提升构建性能',
          link: '/blogs/web/webpack/第13章—如何使用Webpack持久化缓存大幅提升构建性能.md',
        },
        {
          text: '第14章—Webpack都有哪些实现并行构建的方法',
          link: '/blogs/web/webpack/第14章—Webpack都有哪些实现并行构建的方法.md',
        },
        {
          text: '第15章—有哪些值得学习的构建性能极致优化技巧',
          link: '/blogs/web/webpack/第15章—有哪些值得学习的构建性能极致优化技巧.md',
        },
        {
          text: '第16章—如何正确使用SplitChunks提升应用性能',
          link: '/blogs/web/webpack/第16章—如何正确使用SplitChunks提升应用性能.md',
        },
        {
          text: '第17章—不止Terser：揭秘代码压缩的门门道道',
          link: '/blogs/web/webpack/第17章—不止Terser：揭秘代码压缩的门门道道.md',
        },
        {
          text: '第18章—还有哪些值得学习的应用性能极致优化技巧',
          link: '/blogs/web/webpack/第18章—还有哪些值得学习的应用性能极致优化技巧.md',
        },
        {
          text: '第19章—Loader开发基础：从开源项目学到的Loader开发技巧',
          link: '/blogs/web/webpack/第19章—Loader开发基础：从开源项目学到的Loader开发技巧.md',
        },
        {
          text: '第20章—Loader开发进阶：如何用好Loader扩展开发工具',
          link: '/blogs/web/webpack/第20章—Loader开发进阶：如何用好Loader扩展开发工具.md',
        },
        {
          text: '第21章—插件开发基础：实例剖析插件基本形态与架构逻辑',
          link: '/blogs/web/webpack/第21章—插件开发基础：实例剖析插件基本形态与架构逻辑.md',
        },
        {
          text: '第22章—插件开发进阶：如何提升插件健壮性',
          link: '/blogs/web/webpack/第22章—插件开发进阶：如何提升插件健壮性.md',
        },
        {
          text: '第23章—插件架构：Hook体系是如何影响Webpack架构的',
          link: '/blogs/web/webpack/第23章—插件架构：Hook体系是如何影响Webpack架构的.md',
        },
        {
          text: '第24章—Init、Make、Seal：真正读懂Webpack核心流程',
          link: '/blogs/web/webpack/第24章—Init、Make、Seal：真正读懂Webpack核心流程.md',
        },
        {
          text: '第25章—DependencyGraph：如何管理模块间依赖',
          link: '/blogs/web/webpack/第25章—DependencyGraph：如何管理模块间依赖.md',
        },
        {
          text: '第26章—Chunk：三种产物的打包逻辑',
          link: '/blogs/web/webpack/第26章—Chunk：三种产物的打包逻辑.md',
        },
        {
          text: '第27章—Runtime：模块编译打包及运行时逻辑',
          link: '/blogs/web/webpack/第27章—Runtime：模块编译打包及运行时逻辑.md',
        },
        {
          text: '第28章—Tree-shaking：如何删除无用模块导出',
          link: '/blogs/web/webpack/第28章—Tree-shaking：如何删除无用模块导出.md',
        },
        {
          text: '第29章—Sourcemap：源码映射原理与应用技巧',
          link: '/blogs/web/webpack/第29章—Sourcemap：源码映射原理与应用技巧.md',
        },
        {
          text: '第30章—HMR：如何动态替换页面代码',
          link: '/blogs/web/webpack/第30章—HMR：如何动态替换页面代码.md',
        },
      ],
    },
  ],
  '/blogs/web/vite/': [
    {
      text: 'vite核心基础',
      items: [
        {
          text: 'README',
          link: 'README.md',
        },
      ],
    },
    {
      text: '深入浅出Vite',
      items: [
        {
          text: '第01章—开篇：让Vite助力你的前端工程化之路',
          link: '/blogs/web/vite/第01章—开篇：让Vite助力你的前端工程化之路.md',
        },
        {
          text: '第02章—模块标准：为什么ESM是前端模块化的未来',
          link: '/blogs/web/vite/第02章—模块标准：为什么ESM是前端模块化的未来.md',
        },
        {
          text: '第03章—快速上手：如何用Vite从零搭建前端项目',
          link: '/blogs/web/vite/第03章—快速上手：如何用Vite从零搭建前端项目.md',
        },
        {
          text: '第04章—样式方案：在Vite中接入现代化的CSS工程化方案',
          link: '/blogs/web/vite/第04章—样式方案：在Vite中接入现代化的CSS工程化方案.md',
        },
        {
          text: '第05章—代码规范：如何利用Lint工具链来保证代码风格和质量',
          link: '/blogs/web/vite/第05章—代码规范：如何利用Lint工具链来保证代码风格和质量.md',
        },
        {
          text: '第06章—静态资源：如何在Vite中处理各种静态资源',
          link: '/blogs/web/vite/第06章—静态资源：如何在Vite中处理各种静态资源.md',
        },
        {
          text: '第07章—预构建：如何玩转秒级依赖预构建的能力',
          link: '/blogs/web/vite/第07章—预构建：如何玩转秒级依赖预构建的能力.md',
        },
        {
          text: '第08章—双引擎架构：Vite是如何站在巨人的肩膀上实现的',
          link: '/blogs/web/vite/第08章—双引擎架构：Vite是如何站在巨人的肩膀上实现的.md',
        },
        {
          text: '第09章—得力的性能推手：Esbuild功能使用与插件开发实战',
          link: '/blogs/web/vite/第09章—得力的性能推手：Esbuild功能使用与插件开发实战.md',
        },
        {
          text: '第10章—Vite构建基石(上)——Rollup打包基本概念及使用',
          link: '/blogs/web/vite/第10章—Vite构建基石(上)——Rollup打包基本概念及使用.md',
        },
        {
          text: '第11章—Vite构建基石(下)——深入理解Rollup的插件机制',
          link: '/blogs/web/vite/第11章—Vite构建基石(下)——深入理解Rollup的插件机制.md',
        },
        {
          text: '第12章—插件开发与实战：如何开发一个完整的Vite插件',
          link: '/blogs/web/vite/第12章—插件开发与实战：如何开发一个完整的Vite插件.md',
        },
        {
          text: '第13章—HMRAPI及原理：代码改动后，如何进行毫秒级别的局部更新',
          link: '/blogs/web/vite/第13章—HMRAPI及原理：代码改动后，如何进行毫秒级别的局部更新.md',
        },
        {
          text: '第14章—代码分割：打包完产物体积太大，怎么拆包',
          link: '/blogs/web/vite/第14章—代码分割：打包完产物体积太大，怎么拆包.md',
        },
        {
          text: '第15章—语法降级与Polyfill：联合前端编译工具链，消灭低版本浏览器兼容问题',
          link: '/blogs/web/vite/第15章—语法降级与Polyfill：联合前端编译工具链，消灭低版本浏览器兼容问题.md',
        },
        {
          text: '第16章—预渲染：如何借助Vite搭建高可用的服务端渲染(SSR)工程',
          link: '/blogs/web/vite/第16章—预渲染：如何借助Vite搭建高可用的服务端渲染(SSR)工程.md',
        },
        {
          text: '第17章—模块联邦：如何实现优雅的跨应用代码共享',
          link: '/blogs/web/vite/第17章—模块联邦：如何实现优雅的跨应用代码共享.md',
        },
        {
          text: '第18章—再谈ESM：高阶特性&PureESM时代',
          link: '/blogs/web/vite/第18章—再谈ESM：高阶特性&PureESM时代.md',
        },
        {
          text: '第19章—性能优化：如何体系化地对Vite项目进行性能优化',
          link: '/blogs/web/vite/第19章—性能优化：如何体系化地对Vite项目进行性能优化.md',
        },
        {
          text: '第20章—配置解析服务：配置文件在Vite内部被转换成什么样子了',
          link: '/blogs/web/vite/第20章—配置解析服务：配置文件在Vite内部被转换成什么样子了.md',
        },
        {
          text: '第21章—依赖预构建：Esbuild打包功能如何被Vite玩出花来',
          link: '/blogs/web/vite/第21章—依赖预构建：Esbuild打包功能如何被Vite玩出花来.md',
        },
        {
          text: '第22章—插件流水线：从整体到局部，理解Vite的核心编译能力',
          link: '/blogs/web/vite/第22章—插件流水线：从整体到局部，理解Vite的核心编译能力.md',
        },
        {
          text: '第23章—热更新：基于ESM的毫秒级HMR的实现揭秘',
          link: '/blogs/web/vite/第23章—热更新：基于ESM的毫秒级HMR的实现揭秘.md',
        },
        {
          text: '第24章—手写Vite：实现no-bundle开发服务(上)',
          link: '/blogs/web/vite/第24章—手写Vite：实现no-bundle开发服务(上).md',
        },
        {
          text: '第25章—手写Vite：实现no-bundle开发服务(下)',
          link: '/blogs/web/vite/第25章—手写Vite：实现no-bundle开发服务(下).md',
        },
        {
          text: '第26章—手写Bundler：实现JavaScriptAST解析器——词法分析、语义分析',
          link: '/blogs/web/vite/第26章—手写Bundler：实现JavaScriptAST解析器——词法分析、语义分析.md',
        },
        {
          text: '第27章—手写Bundler：实现代码打包、TreeShaking',
          link: '/blogs/web/vite/第27章—手写Bundler：实现代码打包、TreeShaking.md',
        },
        {
          text: '第28章—加餐：Vite3.0核心更新盘点与分析',
          link: '/blogs/web/vite/第28章—加餐：Vite3.0核心更新盘点与分析.md',
        },
      ],
    },
  ],
  '/blogs/algorithm/': [
    {
      text: '二叉树',
      items: [
        {
          text: '二叉树',
          link: '/blogs/algorithm/二叉树.md',
        },
      ],
    },
    {
      text: '数组字符串',
      items: [
        {
          text: '数组字符串',
          link: '/blogs/algorithm/数组字符串.md',
        },
      ],
    },
    {
      text: '回溯算法',
      items: [
        {
          text: '回溯算法',
          link: '/blogs/algorithm/回溯算法.md',
        },
      ],
    },
  ],
  '/blogs/interview/algorithm/': [
    {
      text: '前端算法与数据结构面试',
      items: [
        {
          text: '1-面试总有套路，算法不是玄学——写给普通人的前端算法面试攻略',
          link: '/blogs/interview/algorithm/1-面试总有套路，算法不是玄学——写给普通人的前端算法面试攻略.md',
        },
        {
          text: '2-快速上手——从0到1掌握算法面试需要的数据结构（一）',
          link: '/blogs/interview/algorithm/2-快速上手——从0到1掌握算法面试需要的数据结构（一）.md',
        },
        {
          text: '3-快速上手——从0到1掌握算法面试需要的数据结构（二）',
          link: '/blogs/interview/algorithm/3-快速上手——从0到1掌握算法面试需要的数据结构（二）.md',
        },
        {
          text: '4-快速上手——从0到1掌握算法面试需要的数据结构（三）',
          link: '/blogs/interview/algorithm/4-快速上手——从0到1掌握算法面试需要的数据结构（三）.md',
        },
        {
          text: '5-递归初相见——二叉树递归遍历的三种姿势',
          link: '/blogs/interview/algorithm/5-递归初相见——二叉树递归遍历的三种姿势.md',
        },
        {
          text: '6-算法的衡量——轻松理解时间复杂度与空间复杂度',
          link: '/blogs/interview/algorithm/6-算法的衡量——轻松理解时间复杂度与空间复杂度.md',
        },
        {
          text: '7-数组的应用——真题归纳与解读',
          link: '/blogs/interview/algorithm/7-数组的应用——真题归纳与解读.md',
        },
        {
          text: '8-字符串的应用——真题归纳与解读',
          link: '/blogs/interview/algorithm/8-字符串的应用——真题归纳与解读.md',
        },
        {
          text: '9-链表的应用——真题归纳与解读',
          link: '/blogs/interview/algorithm/9-链表的应用——真题归纳与解读.md',
        },
        {
          text: '10-快慢指针与多指针——玩转链表复杂操作',
          link: '/blogs/interview/algorithm/10-快慢指针与多指针——玩转链表复杂操作.md',
        },
        {
          text: '11-姿势特别的链表——环形链表专题',
          link: '/blogs/interview/algorithm/11-姿势特别的链表——环形链表专题.md',
        },
        {
          text: '12-栈与队列怎么玩（上）',
          link: '/blogs/interview/algorithm/12-栈与队列怎么玩（上）.md',
        },
        {
          text: '13-栈与队列怎么玩（下）',
          link: '/blogs/interview/algorithm/13-栈与队列怎么玩（下）.md',
        },
        {
          text: '14-遍历专题：DFS 与 BFS',
          link: '/blogs/interview/algorithm/14-遍历专题：DFS 与 BFS.md',
        },
        {
          text: '15-场景化解读：递归与回溯思想在真题中的应用',
          link: '/blogs/interview/algorithm/15-场景化解读：递归与回溯思想在真题中的应用.md',
        },
        {
          text: '16-二叉树真题归纳与解读',
          link: '/blogs/interview/algorithm/16-二叉树真题归纳与解读.md',
        },
        {
          text: '17-特殊的二叉树——二叉搜索树专题',
          link: '/blogs/interview/algorithm/17-特殊的二叉树——二叉搜索树专题.md',
        },
        {
          text: '18-特殊的二叉树——平衡二叉树专题',
          link: '/blogs/interview/algorithm/18-特殊的二叉树——平衡二叉树专题.md',
        },
        {
          text: '19-特殊的二叉树——堆结构及其在排序中的应用',
          link: '/blogs/interview/algorithm/19-特殊的二叉树——堆结构及其在排序中的应用.md',
        },
        {
          text: '20-排序算法专题（上）',
          link: '/blogs/interview/algorithm/20-排序算法专题（上）.md',
        },
        {
          text: '21-排序算法专题（下）',
          link: '/blogs/interview/algorithm/21-排序算法专题（下）.md',
        },
        {
          text: '22-普通人也能吃透的动态规划思想专题（上）',
          link: '/blogs/interview/algorithm/22-普通人也能吃透的动态规划思想专题（上）.md',
        },
        {
          text: '23-普通人也能吃透的动态规划思想专题（下）',
          link: '/blogs/interview/algorithm/23-普通人也能吃透的动态规划思想专题（下）.md',
        },
        {
          text: '24-大厂真题训练与解读——微软真题',
          link: '/blogs/interview/algorithm/24-大厂真题训练与解读——微软真题.md',
        },
        {
          text: '25-大厂真题训练与解读——Google 真题',
          link: '/blogs/interview/algorithm/25-大厂真题训练与解读——Google 真题.md',
        },
        {
          text: '26-大厂真题训练与解读——腾讯真题',
          link: '/blogs/interview/algorithm/26-大厂真题训练与解读——腾讯真题.md',
        },
        {
          text: '27-大厂真题训练与解读——头条真题',
          link: '/blogs/interview/algorithm/27-大厂真题训练与解读——头条真题.md',
        },
        {
          text: '28-思维课：算法面试的评价逻辑',
          link: '/blogs/interview/algorithm/28-思维课：算法面试的评价逻辑.md',
        },
      ],
    },
  ],
}
