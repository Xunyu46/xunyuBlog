import{_ as a,r as d,o as r,c as t,b as e,d as i,e as s,a as l}from"./app-48690364.js";const c={},v={href:"https://zh-hans.reactjs.org/docs/introducing-jsx.html",target:"_blank",rel:"noopener noreferrer"},u=l(`<div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>import React from &#39;react&#39;;

const Component = () =&gt; {
  return &lt;div className=&quot;hello&quot;&gt;hello world&lt;/div&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为支持这一特性，我们需要搭建一套使用的工程化环境，将 JSX 及 React 组件转换为能够在浏览器上运行的 JavaScript 代码。本文将递进介绍使用 Webpack 搭建 React 应用开发环境的主要方法，包括：</p><ul><li>如何使用 <code>Babel</code> 处理JSX文件？</li><li>如何使用 <code>html-webpack-plugin</code>、<code>webpack-dev-server</code> 运行 React 应用？</li><li>如何在 React 中复用 TypeScript、Less 等编译工具？</li><li>如何搭建 React SSR 环境？</li><li>如何使用 Create React App？</li></ul><h2 id="使用-babel-加载-jsx-文件" tabindex="-1"><a class="header-anchor" href="#使用-babel-加载-jsx-文件" aria-hidden="true">#</a> 使用 Babel 加载 JSX 文件</h2><p>绝大多数情况下，我们都会使用 JSX 方式编写 React 组件，但问题在于浏览器并不支持这种代码，为此我们首先需要借助构建工具将 JSX 等价转化为标准 JavaScript 代码。</p><p>在 Webpack 中可以借助 <code>babel-loader</code>，并使用 React 预设规则集 <code>@babel/preset-react</code> ，完成 JSX 到 JavaScript 的转换，具体步骤：</p><ol><li>安装依赖：</li></ol><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code>yarn add -D webpack webpack-cli babel-loader @babel/core @babel/preset-react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>修改 Webpack 配置，加入 <code>babel-loader</code> 相关声明：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = {
  mode: &#39;none&#39;,
  module: {
    rules: [
      {
        test: /\\.jsx$/,
        loader: &quot;babel-loader&quot;,
        options: {
          presets: [&quot;@babel/preset-react&quot;],
        }
      },
    ],
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>执行构建命令，如 <code>npx webpack</code> 。</li></ol><p>经过 <code>babel-loader</code> 处理后，JSX 将被编译为 JavaScript 格式的 <code>React.createElement</code> 函数调用，如：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c6cca0522148af9ebb80368613802f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>此外，JSX 支持新旧两种转换模式，一是上图这种 <code>React.createElement</code> 函数，这种模式要求我们在代码中引入 React，如上图的 <code>import React from &quot;react&quot;</code>；二是自动帮我们注入运行时代码，此时需要设置 <code>runtime:automatic</code>，如：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>{
  test: /\\.jsx$/,
  loader: &#39;babel-loader&#39;,
  options: {
    &quot;presets&quot;: [
      [&quot;@babel/preset-react&quot;, {
        &quot;runtime&quot;: &quot;automatic&quot;
      }]
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8949ce39cad48529a72e827e189e53d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这种模式会自动导入 <code>react/jsx-runtime</code>，不必开发者手动管理 React 依赖。</p><blockquote><p>加载 CSS 文件</p></blockquote><p>注意，上例 Webpack 配置还无法处理 CSS 代码：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b7f0da0a54a468c850603553e8108a7~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>为此需要添加 CSS 加载器，如 <code>css-loader/style-loader</code>，如：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = {
  mode: &#39;none&#39;,
  module: {
    rules: [
      {
        test: /\\.jsx$/,
        loader: &#39;babel-loader&#39;,
        options: {
          &#39;presets&#39;: [[&quot;@babel/preset-react&quot;, {
            &quot;runtime&quot;: &quot;automatic&quot;
          }]]
        }
      },
      {
        test: /\\.css$/,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;],
      }
    ],
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关用法已在其它章节有详细介绍，此处不再赘述。</p><h2 id="运行页面" tabindex="-1"><a class="header-anchor" href="#运行页面" aria-hidden="true">#</a> 运行页面</h2><p>上例接入的 <code>babel-loader</code> 使得 Webpack 能够正确理解、翻译 JSX 文件的内容，接下来我们还需要用 <code>html-webpack-plugin</code> 和 <code>webpack-dev-server</code> 让页面真正运行起来，配置如下：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;)

module.exports = {
  module: {/*...*/},
  devServer: {
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: \`
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Webpack App&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot; /&gt;
  &lt;/body&gt;
&lt;/html&gt;
    \`
    })
  ]
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，运行 <code>npx webpack serve</code> 命令，即可自动打开带热更功能的页面：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f41ba0c2c6ed4c57b5576ab8f8067b9a~tplv-k3u1fbpfcp-watermark.image?" alt="c100d66f-156d-4600-96c2-2838e70ac59b.gif"></p><h2 id="复用其它编译工具" tabindex="-1"><a class="header-anchor" href="#复用其它编译工具" aria-hidden="true">#</a> 复用其它编译工具</h2><p>与 Vue 类似，在 React 开发环境中我们也可以搭配其它工程化工具提升开发效率、质量，包括：</p><ul><li>使用 <code>babel-loader</code>、<code>ts-loader</code> 加载 TSX 代码；</li><li>使用 <code>less-loader</code>、<code>sass-loader</code> 预处理样式代码。</li></ul><blockquote><p>使用 TSX</p></blockquote><p>社区有两种主流的 TSX 加载方案，一是使用 Babel 的 <code>@babel/preset-typescript</code> 规则集；二是直接使用 <code>ts-loader</code>。先从 Babel 规则集方案说起：</p><ol><li>安装依赖，核心有：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>yarn add -D typescript @babel/preset-typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>修改 Webpack 配置，添加用于处理 TypeScript 代码的规则：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = {
  module: {
    rules: [
      {
        test: /\\.tsx$/,
        loader: &#39;babel-loader&#39;,
        options: {
          &#39;presets&#39;: [[&quot;@babel/preset-react&quot;, {
            &quot;runtime&quot;: &quot;automatic&quot;
          }],
          &#39;@babel/preset-typescript&#39;]
        }
      },
    ],
  },
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，将组件文件后缀修改 <code>.tsx</code>，Babel 就会帮我们完成 TypeScript 代码编译。<code>ts-loader</code> 用法也很相似：</p><ol><li>安装依赖：</li></ol><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code>yarn add -D typescript ts-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>修改 Webpack 配置，添加 <code>ts-loader</code> 规则：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = {
  resolve: {
    extensions: [&#39;.js&#39;, &#39;.jsx&#39;, &#39;.ts&#39;, &#39;.tsx&#39;],
  },
  module: {
    rules: [
      {
        test: /\\.tsx$/,
        use: &#39;ts-loader&#39;,
      },
    ],
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>修改 <code>tsconfig.json</code> 文件，添加 <code>jsx</code> 配置属性：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>{
  &quot;compilerOptions&quot;: {
    //...
    &quot;jsx&quot;: &quot;react-jsx&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完毕。两种方式功能效果相似，相对而言我个人更倾向于 <code>babel-loader</code>，因为 Babel 是一种通用的代码编译工具，配置适当 Preset 后能做的事情更多，相关经验更容易复用到其它场景。</p><blockquote><p>使用 CSS 预处理器</p></blockquote><p>类似的，我们还可以使用 Less/Sass/Stylus 等语言开发 CSS 代码，接入过程与上述 TypeScript 相似，以 Less 为例，首先安装依赖：</p><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code>yarn add -D less less-loader css-loader style-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其次，修改 Webpack 配置，添加 Less 文件相关处理规则：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = {
  resolve: {
    extensions: [&#39;.js&#39;, &#39;.jsx&#39;, &#39;.ts&#39;, &#39;.tsx&#39;],
  },
  module: {
    rules: [
      {
        test: /\\.tsx$/,
        use: &#39;ts-loader&#39;,
      },
      {
        test: /\\.less$/,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;, &quot;less-loader&quot;],
      },
    ],
  },
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，引入相关样式文件<code>.less</code>，然后，Webpack 就会使用 <code>less-loader</code> 加载这一模块内容。</p><blockquote><p>提示：其它 CSS 相关工具，如 Sass、Stylus、PostCSS 均遵循同样规则。</p></blockquote><h2 id="实现-server-side-render" tabindex="-1"><a class="header-anchor" href="#实现-server-side-render" aria-hidden="true">#</a> 实现 Server Side Render</h2>`,53),o={href:"https://github.com/vercel/next.js",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/zhangyuang/egg-react-ssr",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/zhangyuang/ssr",target:"_blank",rel:"noopener noreferrer"},p={href:"https://github.com/Tecvan-fe/webpack-book-samples/blob/main/react-ssr/package.json",target:"_blank",rel:"noopener noreferrer"},g=l(`<div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code>├─ react-ssr-example
│  ├─ package.json
│  ├─ server.js
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ entry-client.jsx
│  │  ├─ entry-server.jsx
│  ├─ webpack.base.js
│  ├─ webpack.client.js
│  └─ webpack.server.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>首先，需要为客户端环境准备项目入口文件 —— <code>entry-client.js</code>，内容：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>import { createRoot } from &#39;react-dom/client&#39;;
import App from &#39;./App&#39;;

const container = document.getElementById(&#39;app&#39;);
const root = createRoot(container);
root.render(&lt;App /&gt;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>为服务端环境准备入口文件 —— <code>server-client.js</code>，内容：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>import React from &#39;react&#39;
import express from &#39;express&#39;;
import App from &#39;./App&#39;
import { renderToString } from &#39;react-dom/server&#39;;

// 通过 manifest 文件，找到正确的产物路径
const clientManifest = require(&quot;../dist/manifest-client.json&quot;);

const server = express();

server.get(&quot;/&quot;, (req, res) =&gt; {

  const html = renderToString(&lt;App/&gt;);

  const clientCss = clientManifest[&quot;client.css&quot;];
  const clientBundle = clientManifest[&quot;client.js&quot;];

  res.send(\`
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
      &lt;title&gt;React SSR Example&lt;/title&gt;
      &lt;link rel=&quot;stylesheet&quot; href=&quot;\${clientCss}&quot;&gt;&lt;/link&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;!-- 注入组件运行结果 --&gt;
      &lt;div id=&quot;app&quot;&gt;\${html}&lt;/div&gt;
      &lt;!-- 注入客户端代码产物路径 --&gt;
      &lt;!-- 实现 Hydrate 效果 --&gt;
      &lt;script src=&quot;\${clientBundle}&quot;&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
    \`);
});

server.use(express.static(&quot;./dist&quot;));

server.listen(3000, () =&gt; {
  console.log(&quot;ready&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上例代码核心逻辑：</p><ul><li>引入客户端 React 根组件，调用 <code>renderToString</code> 将其渲染为 HTML 字符串；</li><li>获取客户端打包产物映射文件 <code>manifest</code> 文件，然后将组件 HTML 字符串与 <code>entry-client.js</code> 产物路径注入到 HTML 中，并返回给客户端。</li></ul><ol start="3"><li><p>分别为客户端、服务端版本编写 Webpack 配置文件，即上述目录中的三个 <code>webpack.*.js</code> 文件。其中：</p><ol><li><code>base</code> 用于设定基本规则；</li><li><code>webpack.client.js</code> 用于定义构建客户端资源的配置：</li></ol></li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const Merge = require(&quot;webpack-merge&quot;);
const path = require(&quot;path&quot;);
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);
const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;);
const { WebpackManifestPlugin } = require(&quot;webpack-manifest-plugin&quot;);
const base = require(&quot;./webpack.base&quot;);

// 继承自 \`webpack.base.js\`
module.exports = Merge.merge(base, {
  entry: {
    // 入口指向 \`entry-client.js\` 文件
    client: path.join(__dirname, &quot;./src/entry-client.jsx&quot;),
  },
  output: {
    filename: &#39;index.js&#39;,
    publicPath: &quot;/&quot;,
  },
  module: {
    rules: [{ test: /\\.css$/, use: [MiniCssExtractPlugin.loader, &quot;css-loader&quot;] }],
  },
  plugins: [
    // 这里使用 webpack-manifest-plugin 记录产物分布情况
    // 方面后续在 \`server.js\` 中使用
    new WebpackManifestPlugin({ fileName: &quot;manifest-client.json&quot; }),
    // 生成CSS文件
    new MiniCssExtractPlugin({
      filename: &#39;index.[contenthash].css&#39;
    }),
    // 自动生成 HTML 文件内容
    new HtmlWebpackPlugin({
      templateContent: \`
    &lt;!DOCTYPE html&gt;
    &lt;html&gt;
    &lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;Webpack App&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
  &lt;div id=&quot;app&quot; /&gt;
    &lt;/body&gt;
    &lt;/html&gt;
  \`,
    }),
  ],
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：</p><ul><li>这里我们需要使用 <code>webpack-manifest-plugin</code> 插件记录产物构建路径，之后才能在 <code>server.js</code> 中动态注入 HTML 代码中；</li><li>示例代码还用到 <code>mini-css-extract-plugin</code> ，将 CSS 从 JS 文件中抽离出来，成为一个单独的文件。</li></ul></blockquote><ol start="5"><li>在 <code>webpack.server.js</code> 定义构建服务端资源的配置：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const Merge = require(&quot;webpack-merge&quot;);
const path = require(&quot;path&quot;);
const { WebpackManifestPlugin } = require(&quot;webpack-manifest-plugin&quot;);
const base = require(&quot;./webpack.base&quot;);

module.exports = Merge.merge(base, {
  entry: {
    server: path.join(__dirname, &quot;./src/entry-server.jsx&quot;),
  },
  target: &quot;node&quot;,
  output: {
    // 打包后的结果会在 node 环境使用
    // 因此此处将模块化语句转译为 commonjs 形式
    libraryTarget: &quot;commonjs2&quot;,
    filename: &#39;server.js&#39;
  },
  module: {
    rules: [{
      test: /.css$/,
      loader: &#39;./loader/removeCssLoader&#39;
    }]
  },
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大部分配置与普通 Node 应用相似，唯一需要注意的是：在 SSR 中，通常由客户端代码提前做好 CSS 资源编译，对服务端而言只需要支持输出构建后的 CSS 文件路径即可，不需要关注 CSS 具体内容，因此通常会用一个简单的自定义 Loader 跳过 CSS 资源，如：</p><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>module.exports = () =&gt; {
  return &#39;module.exports = null&#39;;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们只需要调用适当命令即可分别生成客户端、服务端版本代码：</p><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code># 客户端版本：
npx webpack --config ./webpack.client.js
# 服务端版本：
npx webpack --config ./webpack.server.js 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>至此，SSR 的工程化框架搭建完毕，接下来可以开始编写任何 React 代码，例如：</li></ol><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>import React, { useState } from &#39;react&#39;;
import &#39;./App.css&#39;;

const App = () =&gt; {
  const [isActivity, setIsActivity] = useState(false);

  const handleClick = () =&gt; {
    setIsActivity(!isActivity);
  };

  return (
    &lt;div&gt;
      &lt;h3 className={\`main \${isActivity ? &#39;activate&#39; : &#39;deactivate&#39;}\`}&gt;Hello World&lt;/h3&gt;
      &lt;button onClick={handleClick}&gt;Toggle&lt;/button&gt;
    &lt;/div&gt;
  );
};

export default App;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，编译并执行 <code>node ./dist/server.js</code> 启动 Node 应用，访问页面时服务端将首先返回如下 HTML 内容：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2898268b18f4d85ad36eff2b64b79c0~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>页面也能正常运行 <code>App.jsx</code> 交互效果：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae1b5a2d37db4d86ba5a7282a049a0ef~tplv-k3u1fbpfcp-watermark.image?" alt="840a136d-fe81-42fc-93e0-3d7063c43949.gif"></p>`,22),h=e("p",null,"提示：",-1),q=e("li",null,"实际项目中建议使用更成熟、完备的技术方案，如 Next.js；",-1),S={href:"https://github.com/Tecvan-fe/webpack-book-samples/blob/main/react-ssr/package.json",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,[i("总的来说，React 的 SSR 实现逻辑与 Vue 极为相似，都需要搭建对应的 Client、Server 端构建环境，之后在 Server 端引入组件代码并将其渲染为 HTML 字符串，配合 "),e("code",null,"manifest"),i(" 记录的产物信息组装出完整的 Web 页面代码，从而实现服务端渲染能力。")],-1),k=e("h2",{id:"使用-create-react-app",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-create-react-app","aria-hidden":"true"},"#"),i(" 使用 Create React App")],-1),x=e("p",null,"综上，手动配置 React 开发环境的过程复杂且繁琐的，如果每次构建项目都需要从零开始使用 Webpack、Babel、TypeScript、Less、Mocha 等工具搭建项目环境，那对新手、老手来说都是极高的门槛和心智负担。",-1),_=e("p",null,"好在社区已经将大量重复、被验证有效的模式封装成开箱即用的脚手架工具，包括：",-1),j={href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://modernjs.dev/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"},R=e("div",{class:"language-Bash line-numbers-mode","data-ext":"Bash"},[e("pre",{class:"language-Bash"},[e("code",null,`npx create-react-app my-app
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),w={href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/arackaf/customize-cra",target:"_blank",rel:"noopener noreferrer"},W={href:"https://github.com/timarney/react-app-rewired",target:"_blank",rel:"noopener noreferrer"},A=l(`<div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const { override, addLessLoader } = require(&quot;customize-cra&quot;);

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    cssLoaderOptions: {}, 
    cssModules: {
      localIdentName: &quot;[path][name]__[local]--[hash:base64:5]&quot;, 
    },
  }) 
));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改 Script 运行脚本：</p><div class="language-JSON line-numbers-mode" data-ext="JSON"><pre class="language-JSON"><code>&quot;scripts&quot;: {
-   &quot;start&quot;: &quot;react-scripts start&quot;,
+   &quot;start&quot;: &quot;react-app-rewired start&quot;,
-   &quot;build&quot;: &quot;react-scripts build&quot;,
+   &quot;build&quot;: &quot;react-app-rewired build&quot;,
-   &quot;test&quot;: &quot;react-scripts test&quot;,
+   &quot;test&quot;: &quot;react-app-rewired test&quot;,
    &quot;eject&quot;: &quot;react-scripts eject&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),T={href:"https://cli.vuejs.org/guide/webpack.html#simple-configuration",target:"_blank",rel:"noopener noreferrer"},M=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),i(" 总结")],-1),L={href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"},P={href:"https://create-react-app.dev/docs/available-scripts/#npm-run-eject",target:"_blank",rel:"noopener noreferrer"},X=e("code",null,"eject",-1),N=e("h2",{id:"思考题",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#思考题","aria-hidden":"true"},"#"),i(" 思考题")],-1),E=e("p",null,[i("React JSX 经过 Webpack 转换后的结果与 Vue SFC 转换结果极为相似，为何 Vue 不能复用 Babel 而选择开发一个独立的 "),e("code",null,"vue-loader"),i(" 插件？")],-1);function $(H,z){const n=d("ExternalLinkIcon");return r(),t("div",null,[e("p",null,[i("传统 Web 开发强调样式、结构、逻辑分离，以此降低技术复杂度。但 React 认为渲染逻辑本质上与其它 UI 逻辑存在内在耦合关系，所以提倡将结构、逻辑与样式共同存放在同一文件中，以“组件”这种松散耦合结构实现关注点分离，并为此设计实现了一套 "),e("a",v,[i("JavaScript-XML"),s(n)]),i("(JSX) 技术，以支持在 JavaScript 中编写 Template 代码，如：")]),u,e("p",null,[i("在上一章节介绍如何搭建 Vue 开发环境时，已经就 SSR 的基本概念与各项优缺点做了详细阐述，这里我们就直接进入主题吧。React 有许多实现 SSR 的方案，例如："),e("a",o,[i("Next.js"),s(n)]),i("、"),e("a",b,[i("egg-react-ssr"),s(n)]),i("、"),e("a",m,[i("ssr（基于egg-react-ssr）"),s(n)]),i(" 等，接下来我们尝试使用 Webpack、React、Express 搭建一套 React SSR 应用环境，一步步剖析关键技术点。示例代码目录结构(示例代码已上传到小册"),e("a",p,[i("仓库"),s(n)]),i(")：")]),g,e("blockquote",null,[h,e("ul",null,[q,e("li",null,[i("建议大家拉取"),e("a",S,[i("示例代码"),s(n)]),i("，阅读学习。")])])]),f,k,x,_,e("ul",null,[e("li",null,[e("a",j,[i("Create React App"),s(n)]),i("：是官方支持的创建 React 应用程序的方式，提供免配置的现代构建开发环境；")]),e("li",null,[e("a",J,[i("Modern JS"),s(n)]),i("：字节跳动开源的现代 Web 工程体系。")])]),e("p",null,[i("这些工具能够快速生成一套健壮的 React 开发环境，以 "),e("a",y,[i("Create React App"),s(n)]),i(" 为例，只需执行一条简单命令：")]),R,e("p",null,[i("之后，"),e("a",w,[i("Create React App"),s(n)]),i(" 会自动安装项目依赖，项目环境就算是搭建完毕了。")]),e("p",null,[e("a",C,[i("Create React App"),s(n)]),i(" 提供的默认配置已经能够满足许多场景下的开发需求，必要时开发者还可以通过"),e("a",B,[i("customize-cra"),s(n)]),i(" 和 "),e("a",W,[i("react-app-rewired"),s(n)]),i(" 修改工程化配置，例如：")]),A,e("blockquote",null,[e("p",null,[i("提示：更多信息可参考 Create React App 官网 "),e("strong",null,[e("a",T,[i("Working with Webpack"),s(n)])]),i(" 一节。")])]),M,e("p",null,[i("本文介绍如何使用 Webpack 开发 React 应用，从最基础的 JSX 代码编译；到如何使用 TypeScript、Less 等基础编译工具；再到如何搭建 React SSR 应用；最后介绍如何使用 "),e("a",L,[i("Create React App"),s(n)]),i(" 迅速搭建开发环境。")]),e("p",null,[i("就我个人而言，多数情况下我都会选择使用 Create React App 或其它脚手架工具快速搭建开发框架，但多数时候又必须 "),e("a",P,[X,s(n)]),i(" 出具体配置信息之后手动修改，实现一些定制化需求，此时就需要用上上面介绍的这些知识点。")]),N,E])}const I=a(c,[["render",$],["__file","di06zhang—ruhedajianReactquanzhankaifahuanjing.html.vue"]]);export{I as default};
