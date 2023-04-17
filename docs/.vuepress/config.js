module.exports = {
  base: "/xunyu-blog/",
  head: [["link", { rel: "icon", href: "/image/favicon.ico" }]],
  title: "寻鱼的博客",
  description: "分享前端学习路线和面试文章等等",
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    lastUpdated: "最近一次修改",
    activeHeaderLinks: true,
    smoothScroll: true,
    nav: [
      { text: "主页", link: "/" },
      {
        text: "前端学习笔记",
        items: [
          {
            text: "前端基础",
            items: [
              { text: "HTML", link: "/web/html/" },
              { text: "CSS", link: "/web/css/" },
              { text: "JavaScript", link: "/web/javascript/" },
            ],
          },
          {
            text: "进阶",
            items: [
              { text: "Ajax", link: "/web/ajax/" },
              { text: "ES6", link: "/web/es6/" },
              { text: "webpack", link: "/web/webpack/" },
              { text: "浏览器原理和性能优化", link: "/web/brower/" },
            ],
          },
          {
            text: "小程序",
            items: [{ text: "微信小程序", link: "/web/applet/" }],
          },
          {
            text: "框架",
            items: [
              { text: "Vue", link: "/web/vue/" },
              { text: "React", link: "/web/react/" },
            ],
          },
          {
            text: "外部库",
            items: [
              { text: "Element Ui", link: "/web/elementui/" },
              { text: "Echarts", link: "/web/echarts/" },
            ],
          },
          {
            text: "TypeScript",
            items: [{ text: "TypeScript", link: "/web/typescript/" }],
          },
        ],
      },
      {
        text: "面试题",
        items: [
          { text: "HTML", link: "/interview/html/" },
          { text: "CSS", link: "/interview/css/" },
          { text: "JavaScript", link: "/interview/javascript/" },
          { text: "ES6", link: "/interview/es6/" },
          { text: "手写面试题 ", link: "/interview/write/" },
          { text: "webpack", link: "/interview/webpack/" },
          { text: "浏览器网络", link: "/interview/brower/" },
          { text: "Vue", link: "/interview/vue/" },
          { text: "React", link: "/interview/react/" },
          { text: "算法", link: "/interview/algorithm/" },
        ],
      },
      { text: "算法", link: "/algorithm/" },
      { text: "项目", link: "/project/" },
    ],
    sidebar: {
      "/guide/guide/": [
        {
          title: "指南",
          collapsable: false,
          children: [""],
        },
      ],
      "/interview/html/": [
        {
          title: "面经",
          collapsable: false,
          children: ["", "2022年我的面试万字总结（HTML篇）"],
        },
        {
          title: "自我总结",
          collapsable: false,
          children: [],
        },
      ],
      "/interview/css/": [
        {
          title: "面经",
          collapsable: false,
          children: [""],
        },
        {
          title: "自我总结",
          collapsable: false,
          children: [],
        },
      ],
    },
  },
};
