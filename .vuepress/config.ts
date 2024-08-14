import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import series from "./series";
import navbar from "./navbar";
import algolia from "./algolia";

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
    series: series,
    navbar: navbar,
    algolia: algolia,
  }),
});

// 匹配字符串\[#\]\([^)]*\)
