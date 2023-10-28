import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "xunyublog",
  // @ts-ignore
  base: "/xunyu-blog/",
  description: "用代码将梦想照进现实",
  head: [["link", { rel: "icon", href: "favicon.ico" }]],
  theme: recoTheme({
    smoothScroll: true,
    lastUpdatedText: "最后一次修改",
    editLinkPattern: "https://gitee.com/xunyuBlog/xunyu-blog",
    editLinkText: "修改此页面",
    style: "@vuepress-reco/style-default",
    logo: "/logo.jpg",
    author: "xunyu",
    authorAvatar: "/logo.jpg",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    primaryColor: "rgb(86,95,211)",
    // series 为原 sidebar
    series: {
      "/blogs/web/vue/": [
        {
          text: "vue基础",
          children: [
            "/blogs/web/vue/Vue 基础 - 模板语法、事件处理、计算属性、侦听器.md",
            "/blogs/web/vue/Vue 基础 - 表单、样式绑定，条件、列表渲染、指令.md",
            "/blogs/web/vue/Vue 生命周期、自定义指令、模板引用的原理与实践.md",
          ],
        },
        {
          text: "组件通信",
          children: [
            "/blogs/web/vue/Vue 单文件组件，父子组件间传值、通信，透传属性.md",
            "/blogs/web/vue/Vue 插槽 Slots，自定义弹窗、高级列表组件，依赖注入.md",
            "/blogs/web/vue/Vue 兄弟组件间通信、发布与订阅，动态、异步组件.md",
          ],
        },
        {
          text: "组合式API",
          children: [
            "/blogs/web/vue/Vue 组合式 API - setup、reactive 与 ref，响应式工具.md",
            "/blogs/web/vue/Vue 组合式 API - watch 和 watchEffect、自定义指令.md",
            "/blogs/web/vue/Vue 组合式 API - ref，通信 API，依赖注入，生命周期.md",
          ],
        },
        {
          text: "路由和导航守卫",
          children: [
            "/blogs/web/vue/Vue Router 路由，前后端路由原理 与 具体实现.md",
            "/blogs/web/vue/Vue Router 路由传参、别名、匹配语法、编程式导航.md",
            "/blogs/web/vue/Vue Router 导航守卫、过渡与滚动、懒加载、动态路由.md",
          ],
        },
        {
          text: "Pinia",
          children: [
            "/blogs/web/vue/Pinia 全局状态管理，深入 State、Getter、Action.md",
          ],
        },
        {
          text: "其他",
          children: [
            "/blogs/web/vue/Vue 渲染机制 - 虚拟 DOM，render、h 函数，渲染流程.md",
            "/blogs/web/vue/Vue 中 Transition 和 TransitionGroup 组件，实践应用.md",
            "/blogs/web/vue/Vue 插件开发，Element Plus、VantUI 组件库实践应用.md",
            "/blogs/web/vue/Vue 中的 Teleport 内置组件.md",
          ],
        },
      ],
      "/blogs/web/typescript/": [
        {
          text: "TypeScript 核心基础",
          children: [
            "/blogs/web/typescript/TypeScript 快速入门 - 核心基础，TS 基本数据类型.md",
            "/blogs/web/typescript/TypeScript 数组、元组，any、unknown、never 类型.md",
            "/blogs/web/typescript/TypeScript 函数类型、symbol 类型、对象类型.md",
            "/blogs/web/typescript/TypeScript 中 Enum 枚举类型、interface 接口类型.md",
            "/blogs/web/typescript/TS 中 class 类型，泛型，类型断言核心基础 与 实践应用.md",
            "/blogs/web/typescript/TS 的类型检查机制，类型兼容性、保护机制、高级类型.md",
            "/blogs/web/typescript/TS 模块，namespace 命名空间，declare 关键字.md",
            "/blogs/web/typescript/TypeScript 类型运算符，类型映射，类型工具.md",
            "/blogs/web/typescript/TypeScript 注释指令，tsconfig.json，tsc 命令行编辑器.md",
          ],
        },
        {
          text: "TypeScript 工程实践",
          children: [
            "/blogs/web/typescript/TS 工程实践，构建工具，模块系统，编写类型声明文件.md",
            "/blogs/web/typescript/TS 工程实践中的编译工具，代码检查工具，单元测试.md",
          ],
        },
      ],
    },

    navbar: [
      { text: "主页", link: "/", icon: "Home" },
      {
        text: "前端学习笔记",
        icon: "Catalog",
        children: [
          {
            text: "前端基础",
            children: [
              { text: "HTML", link: "/blogs/web/html/" },
              { text: "CSS", link: "/blogs/web/css/" },
              { text: "JavaScript", link: "/blogs/web/javascript/" },
            ],
          },
          {
            text: "进阶",
            children: [
              { text: "Ajax", link: "/blogs/web/ajax/" },
              { text: "ES6", link: "/blogs/web/es6/" },
              { text: "浏览器原理和性能优化", link: "/blogs/web/brower/" },
            ],
          },
          {
            text: "小程序",
            children: [{ text: "微信小程序", link: "/blogs/web/applet/" }],
          },
          {
            text: "框架",
            children: [
              {
                text: "Vue",
                link: "/blogs/web/vue/Vue 基础 - 模板语法、事件处理、计算属性、侦听器.md",
              },
              { text: "React", link: "/blogs/web/react/" },
            ],
          },
          {
            text: "外部库",
            children: [
              { text: "Element Ui", link: "/blogs/web/elementui/" },
              { text: "Naive Ui", link: "/blogs/web/naiveui/" },
              { text: "Echarts", link: "/blogs/web/echarts/" },
            ],
          },
          {
            text: "TypeScript",
            children: [
              {
                text: "TypeScript",
                link: "/blogs/web/typescript/TypeScript 快速入门 - 核心基础，TS 基本数据类型.md",
              },
            ],
          },
          {
            text: "构建工具",
            children: [
              { text: "Webpack", link: "/blogs/web/webpack/" },
              { text: "Vite", link: "/blogs/web/vite/" },
            ],
          },
        ],
      },
      {
        text: "面试题",
        icon: "DataCenter",
        children: [
          { text: "HTML", link: "/blogs/interview/html/" },
          { text: "CSS", link: "/blogs/interview/css/" },
          { text: "JavaScript", link: "/blogs/interview/javascript/" },
          { text: "ES6", link: "/interview/es6/" },
          { text: "手写面试题 ", link: "/interview/write/" },
          { text: "webpack", link: "/interview/blogs/webpack/" },
          { text: "浏览器网络", link: "/interview/brower/" },
          { text: "Vue", link: "/interview/vue/" },
          { text: "React", link: "/interview/react/" },
          { text: "算法", link: "/interview/algorithm/" },
        ],
      },
      { text: "算法", link: "/algorithm/", icon: "CalculationAlt" },
      { text: "项目", link: "/project/", icon: "Workspace" },
      {
        text: "文件夹",
        icon: "Folder",
        children: [
          { text: "vue", link: "/categories/vue/1/" },
          { text: "微信小程序", link: "/categories/applet/1/" },
          { text: "面试", link: "/categories/mianshi/1/" },
        ],
      },
    ],
    algolia: {
      appId: "ATRY2UAMFR",
      apiKey: "2cf59883a19ba748d13086307f869776",
      indexName: "xunyu",
      inputSelector: "### REPLACE ME ####",
      algoliaOptions: { facetFilters: ["lang:$LANG"] },
      debug: false, // Set debug to true if you want to inspect the dropdown
    },
  }),
});
