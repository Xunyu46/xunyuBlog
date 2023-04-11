module.exports = {
  title: "寻鱼的博客",
  description: "分享前端学习路线和面试文章等等",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    sidebar: [
      {
        title: "指南",
        children: ["/guide/guide"],
        initialOpenGroupIndex: 1, // 可选的, 默认值是 0
      },
    ],
  },
};
