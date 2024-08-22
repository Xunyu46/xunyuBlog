import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '主页', link: '/' },
  { text: '前端导航', link: '/nav/' },
  {
    text: '前端学习笔记',
    items: [
      {
        text: '前端基础',
        items: [
          {
            text: 'HTML',
            link: '/blogs/web/html/前端 HTMLHTML5 核心标签和属性.md',
          },
          {
            text: 'CSS',
            link: '/blogs/web/css/前端 CSS、CSS3 核心样式和属性.md',
          },
          {
            text: 'JavaScript',
            link: '/blogs/web/javascript/JavaScript 简介、核心语法、变量.md',
          },
        ],
      },
      {
        text: '进阶',
        items: [
          {
            text: 'Ajax',
            link: '/blogs/web/ajax/前后端数据交互 与 HTTP 协议.md',
          },
          {
            text: 'ES6',
            link: '/blogs/web/es6/ECMAScript、ES6 简史，let、const、var 区别和应用.md',
          },
          { text: '浏览器原理和性能优化', link: '/blogs/web/brower/' },
        ],
      },
      {
        text: '小程序',
        items: [
          {
            text: '微信小程序',
            link: '/blogs/web/applet/微信小程序发展史、开发环境准备、团队协作上线流程.md',
          },
        ],
      },
      {
        text: '框架',
        items: [
          {
            text: 'Vue',
            link: '/blogs/web/vue/Vue 基础 - 模板语法、事件处理、计算属性、侦听器.md',
          },
          { text: 'React', link: '/blogs/web/react/' },
        ],
      },
      {
        text: 'TypeScript',
        items: [
          {
            text: 'TypeScript',
            link: '/blogs/web/typescript/TypeScript 快速入门 - 核心基础，TS 基本数据类型.md',
          },
        ],
      },
      {
        text: '构建工具',
        items: [
          { text: 'Webpack', link: '/blogs/web/webpack/第01章—重新认识Webpack：旧时代的破局者.md' },
          { text: 'Vite', link: '/blogs/web/vite/README.md' },
        ],
      },
    ],
  },
  {
    text: '外部库',
    items: [
      {
        text: '外部库',
        items: [
          { text: 'Element Ui', link: 'https://element.eleme.io/#/zh-CN' },
          {
            text: 'Naive Ui',
            link: 'https://www.naiveui.com/zh-CN/light/docs/introduction',
          },
          {
            text: 'Echarts',
            link: 'https://echarts.apache.org/zh/index.html',
          },
        ],
      },
    ],
  },
  {
    text: '面试题',
    items: [
      {
        text: '每日面试题',
        link: '/blogs/interview/everyday/每日面试题.md',
      },
      { text: 'HTML', link: '/blogs/interview/html/' },
      { text: 'CSS', link: '/blogs/interview/css/' },
      { text: 'JavaScript', link: '/blogs/interview/javascript/' },
      { text: 'ES6', link: '/blogs/interview/es6/' },
      { text: '手写面试题 ', link: '/blogs/interview/write/' },
      { text: 'webpack', link: '/blogs/interview/blogs/webpack/' },
      { text: '浏览器网络', link: '/blogs/interview/brower/' },
      { text: 'Vue', link: '/blogs/interview/vue/1.v-if和v-for哪个优先级更高？.md' },
      { text: 'React', link: '/blogs/interview/react/' },
      { text: '算法', link: '/blogs/interview/algorithm/' },
    ],
  },
  {
    text: '算法',
    link: '/blogs/algorithm/二叉树.md',
  },
  { text: '项目', link: '/project/' },
  {
    text: '文件夹',
    items: [
      { text: 'vue', link: '/categories/vue/1/' },
      { text: '微信小程序', link: '/categories/applet/1/' },
      { text: '面试', link: '/categories/mianshi/1/' },
    ],
  },
]
