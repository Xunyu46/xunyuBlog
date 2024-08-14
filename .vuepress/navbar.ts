export default [
  { text: "主页", link: "/", icon: "Home" },
  {
    text: "前端学习笔记",
    icon: "Catalog",
    children: [
      {
        text: "前端基础",
        children: [
          {
            text: "HTML",
            link: "/blogs/web/html/前端 HTMLHTML5 核心标签和属性.md",
          },
          {
            text: "CSS",
            link: "/blogs/web/css/前端 CSS、CSS3 核心样式和属性.md",
          },
          {
            text: "JavaScript",
            link: "/blogs/web/javascript/JavaScript 简介、核心语法、变量.md",
          },
        ],
      },
      {
        text: "进阶",
        children: [
          {
            text: "Ajax",
            link: "/blogs/web/ajax/前后端数据交互 与 HTTP 协议.md",
          },
          {
            text: "ES6",
            link: "/blogs/web/es6/ECMAScript、ES6 简史，let、const、var 区别和应用.md",
          },
          { text: "浏览器原理和性能优化", link: "/blogs/web/brower/" },
        ],
      },
      {
        text: "小程序",
        children: [
          {
            text: "微信小程序",
            link: "/blogs/web/applet/微信小程序发展史、开发环境准备、团队协作上线流程.md",
          },
        ],
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
          { text: "Webpack", link: "/blogs/web/webpack/第01章—重新认识Webpack：旧时代的破局者.md" },
          { text: "Vite", link: "/blogs/web/vite/README.md" },
        ],
      },
    ],
  },
  {
    text: "外部库",
    icon: "CopyLink",
    children: [
      {
        text: "外部库",
        children: [
          { text: "Element Ui", link: "https://element.eleme.io/#/zh-CN" },
          {
            text: "Naive Ui",
            link: "https://www.naiveui.com/zh-CN/light/docs/introduction",
          },
          {
            text: "Echarts",
            link: "https://echarts.apache.org/zh/index.html",
          },
        ],
      },
    ],
  },
  {
    text: "面试题",
    icon: "DataCenter",
    children: [
      {
        text: "每日面试题",
        link: "/blogs/interview/everyday/每日面试题.md",
      },
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
  {
    text: "算法",
    link: "/blogs/algorithm/二叉树.md",
    icon: "CalculationAlt",
  },
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
];
