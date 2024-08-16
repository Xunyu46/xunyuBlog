import{_ as p,r as o,o as c,c as i,b as s,d as n,e as t,a}from"./app-48690364.js";const l={},u=a(`<h1 id="typescript-中-enum-枚举类型、interface-接口类型" tabindex="-1"><a class="header-anchor" href="#typescript-中-enum-枚举类型、interface-接口类型" aria-hidden="true">#</a> TypeScript 中 Enum 枚举类型、interface 接口类型</h1><p>从本节正式开始学习 Enum 枚举类型、interface 接口类型的核心基础 和 应用实践。</p><ul><li>Enum 枚举类型</li><li>interface 接口类型</li></ul><h2 id="一、枚举类型" tabindex="-1"><a class="header-anchor" href="#一、枚举类型" aria-hidden="true">#</a> 一、枚举类型</h2><p>观察以下代码，这是一个角色判断的案例：一般系统都会有很多种角色，每个角色都会有不同的操作权限，同时也会对应不同的 UI 界面。</p><blockquote><p>一般用户登录系统时，会做一些初始化的工作，如下代码所示</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 初始化角色权限</span>
<span class="token keyword">function</span> <span class="token function">initByRole</span><span class="token punctuation">(</span><span class="token parameter">role</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">||</span> role <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token number">3</span> <span class="token operator">||</span> role <span class="token operator">===</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：以上代码的问题</p><ul><li>①、可读性差：如果不借助特殊的文档，很难记住数字的含义</li><li>②、可维护性差：代表角色的数字都被硬编码了，如果某一天这些数字需要发生改变，就会牵一发而动全身，成本和风险就是灾难级的</li></ul><blockquote><p>如何解决这种问题呢，就可以使用 TS 的枚举类型，这是在 ES 中没有的数据类型</p></blockquote><h3 id="_1、什么是枚举" tabindex="-1"><a class="header-anchor" href="#_1、什么是枚举" aria-hidden="true">#</a> 1、什么是枚举</h3><p>枚举：一组有名字的常量集合</p><p>我们可以把它理解成手机里的通讯录，在拨打电话时，只需要记住人名即可，而不别真正去记住她的电话号码。更何况电话号码是可变的，人名基本是不会变的。</p><p><img src="https://www.arryblog.com/assets/img/image-20230901195824419.5bf2582f.png" alt="image-20230901195824419"></p><blockquote><p>同时，枚举类型分为数字枚举 和 字符串枚举</p></blockquote><h3 id="_2、数字枚举" tabindex="-1"><a class="header-anchor" href="#_2、数字枚举" aria-hidden="true">#</a> 2、数字枚举</h3><p>使用 enum 关键字定义一个数字枚举，该枚举包含了 5 个枚举成员，它们的取值从零开始</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 数字枚举</span>
<span class="token keyword">enum</span> Role <span class="token punctuation">{</span>
  SuperAdministrator<span class="token punctuation">,</span>
  Administrators<span class="token punctuation">,</span>
  OrdinaryAdministrator<span class="token punctuation">,</span>
  User<span class="token punctuation">,</span>
  Developer<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 声明了一个 Enum 结构 Role，里面包含五个成员</span>
<span class="token comment">// 第一个成员的值默认为整数0，第二个为1，第三个为2，以此类推。</span>

<span class="token comment">// 第一个枚举成员的值，默认值为 0，往后依次递增</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Role<span class="token punctuation">.</span>SuperAdministrator<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用时，调用 Enum 的某个成员，与调用对象属性的写法一样，可以使用点运算符，也可以使用方括号运算符。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Role <span class="token punctuation">{</span>
  SuperAdministrator<span class="token punctuation">,</span>
  Administrators<span class="token punctuation">,</span>
  OrdinaryAdministrator<span class="token punctuation">,</span>
  User<span class="token punctuation">,</span>
  Developer<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> u <span class="token operator">=</span> Role<span class="token punctuation">.</span>User<span class="token punctuation">;</span> <span class="token comment">// 3</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">let</span> u1 <span class="token operator">=</span> Role<span class="token punctuation">[</span><span class="token string">&quot;User&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> u1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Enum 结构本身也是一种类型。比如，上例的变量<code>u</code>等于<code>3</code>，它的类型可以是 Role，也可以是<code>number</code>。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">let</span> r1<span class="token operator">:</span> Role <span class="token operator">=</span> Role<span class="token punctuation">.</span>User<span class="token punctuation">;</span> <span class="token comment">// 正确</span>
<span class="token keyword">let</span> r2<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> Role<span class="token punctuation">.</span>User<span class="token punctuation">;</span> <span class="token comment">// 正确</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r1<span class="token punctuation">,</span> r2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3 3</span>

<span class="token comment">// 变量 r1 和 r2 的类型写成 Role 或 number 都可以。但是，Role 类型的语义更好</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、自定义枚举的初始值" tabindex="-1"><a class="header-anchor" href="#_2-1、自定义枚举的初始值" aria-hidden="true">#</a> 2.1、自定义枚举的初始值</h3><p>枚举可定义初始值，给第一个枚举成员设置初始值，后边的枚举成员会在此基础上依次递增</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 数字枚举</span>
<span class="token keyword">enum</span> Role <span class="token punctuation">{</span>
  <span class="token comment">// 自定义数字枚举的初始值为 1，默认从0开始</span>
  SuperAdministrator <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Administrators<span class="token punctuation">,</span>
  OrdinaryAdministrator<span class="token punctuation">,</span>
  User<span class="token punctuation">,</span>
  Developer<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 第一个枚举成员的值，默认值为 0，往后依次递增</span>
<span class="token comment">// 如果给第一个枚举成员初始值，后边的枚举成员会在此基础上递增</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Role<span class="token punctuation">.</span>SuperAdministrator<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>

<span class="token comment">// 打印输出枚举</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Role<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举在运行环境下，被编译成了一个对象，除了正常的枚举成员之外还多了一些其他成员。</p><p><img src="https://www.arryblog.com/assets/img/image-20230621135946497.956e9b12.png" alt="image-20230621135946497"></p><p>注：</p><p>这时，如果我们需要获取枚举成员的值即可通过枚举成员的名称来索引，还可以通过值来索引。</p><h3 id="_2-2、枚举的实现原理" tabindex="-1"><a class="header-anchor" href="#_2-2、枚举的实现原理" aria-hidden="true">#</a> 2.2、枚举的实现原理</h3>`,30),r={href:"https://www.typescriptlang.org/play?#code/PTAEgdTR1bULPND45AoApgOwK4FtQCUD2AbRUAb3lDNBFECvAwLO1BJOSjkBC3QXCVBpzUB4FQLjlQBGQGH-AG3mAS6MBzcgAZAAPptS5AMqoADogBOAQQAm6AJbJtAZwAuKgIaGcK0AF4+AGlllNOvUdPmV+++VAB5FRt0TFQBPJ10DYzMLL3IAVX1VGLIAEUQAN0Q8HGUVeABfIA",target:"_blank",rel:"noopener noreferrer"},d=a(`<p><img src="https://www.arryblog.com/assets/img/image-20230621140523758.73e9982a.png" alt="image-20230621140523758"></p><p>注：</p><p>查看编译后的 JS 代码可以看到</p><p>枚举被编译成了一个对象，枚举成员的名称被作为 key ，枚举成员的值被作为了 value，这个表达式直接返回了 value 。然后 value 又被作为了 key，成员的名称又被作为了 value。</p><blockquote><p>这种方法叫做：反向映射，这就是枚举的实现原理。</p></blockquote><h3 id="_3、enum-结构的特别之处" tabindex="-1"><a class="header-anchor" href="#_3、enum-结构的特别之处" aria-hidden="true">#</a> 3、Enum 结构的特别之处</h3><p>Enum 结构的特别之处在于，它既是一种类型，也是一个值。</p><p>绝大多数 TypeScript 语法都是类型语法，编译后会全部去除，但是 Enum 结构是一个值，编译后会变成 JavaScript 对象，留在代码中。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 编译前</span>
<span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span> <span class="token comment">// 0</span>
  Green<span class="token punctuation">,</span> <span class="token comment">// 1</span>
  Blue<span class="token punctuation">,</span> <span class="token comment">// 2</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">let</span> Color <span class="token operator">=</span> <span class="token punctuation">{</span>
  Red<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  Green<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Blue<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//  Enum 结构编译前后的对比</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、enum-应用场景" tabindex="-1"><a class="header-anchor" href="#_4、enum-应用场景" aria-hidden="true">#</a> 4、Enum 应用场景</h3><p>由于 TypeScript 的定位是 JavaScript 语言的类型增强，所以官方建议谨慎使用 Enum 结构，因为它不仅仅是类型，还会为编译后的代码加入一个对象。</p><p>Enum 结构比较适合的场景是，成员的值不重要，名字更重要，从而增加代码的可读性和可维护性。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Operator <span class="token punctuation">{</span>
  <span class="token constant">ADD</span><span class="token punctuation">,</span>
  <span class="token constant">DIV</span><span class="token punctuation">,</span>
  <span class="token constant">MUL</span><span class="token punctuation">,</span>
  <span class="token constant">SUB</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">compute</span><span class="token punctuation">(</span>op<span class="token operator">:</span> Operator<span class="token punctuation">,</span> a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>op<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> Operator<span class="token punctuation">.</span><span class="token constant">ADD</span><span class="token operator">:</span>
      <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token keyword">case</span> Operator<span class="token punctuation">.</span><span class="token constant">DIV</span><span class="token operator">:</span>
      <span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">;</span>
    <span class="token keyword">case</span> Operator<span class="token punctuation">.</span><span class="token constant">MUL</span><span class="token operator">:</span>
      <span class="token keyword">return</span> a <span class="token operator">*</span> b<span class="token punctuation">;</span>
    <span class="token keyword">case</span> Operator<span class="token punctuation">.</span><span class="token constant">SUB</span><span class="token operator">:</span>
      <span class="token keyword">return</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;wrong operator&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">compute</span><span class="token punctuation">(</span>Operator<span class="token punctuation">.</span><span class="token constant">ADD</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 9</span>

<span class="token comment">// Enum 结构 Operator 的四个成员表示四则运算“加减乘除”</span>
<span class="token comment">// 代码根本不需要用到这四个成员的值，只用成员名就够了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、enum-注意事项" tabindex="-1"><a class="header-anchor" href="#_5、enum-注意事项" aria-hidden="true">#</a> 5、Enum 注意事项</h3>`,14),k={href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#enum-overhaul",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Bool <span class="token punctuation">{</span>
  No<span class="token punctuation">,</span>
  Yes<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span>noYes<span class="token operator">:</span> Bool<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeScript 5.0 之前不报错</span>

<span class="token comment">// 函数foo的参数noYes是 Enum 类型，只有两个可用的值</span>
<span class="token comment">// 但是，TypeScript 5.0 之前，任何数值作为函数foo的参数，编译都不会报错，TypeScript 5.0 纠正了这个问题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，由于 Enum 结构编译后是一个对象，所以不能有与它同名的变量（包括对象、函数、类等）。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Color <span class="token operator">=</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

<span class="token comment">// Enum 结构与变量同名，导致报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很大程度上，Enum 结构可以被对象的<code>as const</code>断言替代。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
  <span class="token constant">B</span><span class="token punctuation">,</span>
  <span class="token constant">C</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Bar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token constant">B</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token constant">C</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> Foo<span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> Bar<span class="token punctuation">.</span><span class="token constant">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对象Bar使用了as const断言，作用就是使得它的属性无法修改</span>
<span class="token comment">// 这样的话，Foo 和 Bar的行为就很类似了，前者完全可以用后者替代，而且后者还是 JavaScript 的原生数据结构。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、enum-成员的值" tabindex="-1"><a class="header-anchor" href="#_6、enum-成员的值" aria-hidden="true">#</a> 6、Enum 成员的值</h3><p>Enum 成员默认不必赋值，系统会从零开始逐一递增，按照顺序为每个成员赋值，比如 0、1、2……</p><blockquote><p>但是，也可以为 Enum 成员显式赋值。</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  Green <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Blue <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// Enum 每个成员的值都是显式赋值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成员的值可以是任意数值，但不能是大整数（Bigint）</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red <span class="token operator">=</span> <span class="token number">90</span><span class="token punctuation">,</span>
  Green <span class="token operator">=</span> <span class="token number">0.5</span><span class="token punctuation">,</span>
  Blue <span class="token operator">=</span> <span class="token number">7n</span><span class="token punctuation">,</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// Enum 成员的值可以是小数，但不能是 Bigint</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成员的值甚至可以相同</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  Green <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
  Blue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果只设定第一个成员的值，后面成员的值就会从这个值开始递增。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span> <span class="token comment">// 7</span>
  Blue<span class="token punctuation">,</span> <span class="token comment">// 8</span>
<span class="token punctuation">}</span>

<span class="token comment">// 或者</span>
<span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span> <span class="token comment">// 0</span>
  Green <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span> <span class="token comment">// 7</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Enum 成员的值也可以使用计算式。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Permission <span class="token punctuation">{</span>
  UserRead <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">8</span><span class="token punctuation">,</span>
  UserWrite <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">7</span><span class="token punctuation">,</span>
  UserExecute <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">6</span><span class="token punctuation">,</span>
  GroupRead <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">5</span><span class="token punctuation">,</span>
  GroupWrite <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">,</span>
  GroupExecute <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">3</span><span class="token punctuation">,</span>
  AllRead <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span><span class="token punctuation">,</span>
  AllWrite <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">,</span>
  AllExecute <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Bool <span class="token punctuation">{</span>
  No <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">,</span>
  Yes <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// Enum 成员的值等于一个计算式，或者等于函数的返回值，都是正确的。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Enum 成员值都是只读的，不能重新赋值。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

Color<span class="token punctuation">.</span>Red <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

<span class="token comment">// 重新为 Enum 成员赋值就会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了让这一点更醒目，通常会在 enum 关键字前面加上<code>const</code>修饰，表示这是常量，不能再次赋值</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> <span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上<code>const</code>还有一个好处，就是编译为 JavaScript 代码后，代码中 Enum 成员会被替换成对应的值，这样能提高性能表现。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> <span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Green<span class="token punctuation">,</span>
  Blue<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> x <span class="token operator">=</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">;</span>
<span class="token keyword">const</span> y <span class="token operator">=</span> Color<span class="token punctuation">.</span>Green<span class="token punctuation">;</span>
<span class="token keyword">const</span> z <span class="token operator">=</span> Color<span class="token punctuation">.</span>Blue<span class="token punctuation">;</span>

<span class="token comment">// 编译后</span>
<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">/* Color.Red */</span>
<span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">/* Color.Green */</span>
<span class="token keyword">const</span> z <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">/* Color.Blue */</span>

<span class="token comment">// 由于 Enum 结构前面加了const关键字，所以编译产物里面就没有生成对应的对象，而是把所有 Enum 成员出现的场合，都替换成对应的常量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>如果希望加上<code>const</code>关键词后，运行时还能访问 Enum 结构（即编译后依然将 Enum 转成对象），需要在编译时打开<code>preserveConstEnums</code>编译选项。</p><h3 id="_7、同名-enum-的合并" tabindex="-1"><a class="header-anchor" href="#_7、同名-enum-的合并" aria-hidden="true">#</a> 7、同名 Enum 的合并</h3><p>多个同名的 Enum 结构会自动合并</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">C</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span>，
  <span class="token constant">C</span> <span class="token operator">=</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token comment">// Foo 分成三段定义，系统会自动把它们合并</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Enum 结构合并时，只允许其中一个的首成员省略初始值，否则报错。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">B</span><span class="token punctuation">,</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// Foo 的两段定义的第一个成员，都没有设置初始值，导致报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同名 Enum 合并时，不能有同名成员，否则报错。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
  <span class="token constant">B</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 报错</span>
  <span class="token constant">C</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// Foo 的两段定义有一个同名成员 B，导致报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同名 Enum 合并的另一个限制是，所有定义必须同为 const 枚举或者非 const 枚举，不允许混合使用。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 正确</span>
<span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 正确</span>
<span class="token keyword">const</span> <span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错</span>
<span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token keyword">enum</span> <span class="token constant">E</span> <span class="token punctuation">{</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 同名 Enum 的合并，最大用处就是补充外部定义的 Enum 结构</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8、字符串枚举" tabindex="-1"><a class="header-anchor" href="#_8、字符串枚举" aria-hidden="true">#</a> 8、字符串枚举</h3><p>Enum 成员的值除了设为数值，还可以设为字符串。也就是说，Enum 也可以用作一组相关字符串的集合。</p><blockquote><p>枚举成员的值是 字符串，它就是字符串枚举</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 字符串枚举</span>
<span class="token keyword">enum</span> Message <span class="token punctuation">{</span>
  Success <span class="token operator">=</span> <span class="token string">&quot;成功&quot;</span><span class="token punctuation">,</span>
  Fail <span class="token operator">=</span> <span class="token string">&quot;失败&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// Message 就是字符串枚举，每个成员的值都是字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),m={href:"https://www.typescriptlang.org/play?#code/PTAEnVtQyb0JjlCzzQ+OQFAFMB2BXAtqAssgzvgIYDmyoA3oqDaAMroDGjB+oAvKAOSAIRoPlKXADTVaAMSIBLADYdugRk1ApLFdEAX0RA",target:"_blank",rel:"noopener noreferrer"},b=a(`<p><img src="https://www.arryblog.com/assets/img/image-20230621173447355.eeab66fb.png" alt="image-20230621173447355"></p><p>注：</p><p>从以上编译后的 JS 可以看出，只有枚举成员的名称被作为了 key ，就是说字符串枚举是不可以进行反向映射的。</p><h3 id="_8-1、字符串枚举-注意事项" tabindex="-1"><a class="header-anchor" href="#_8-1、字符串枚举-注意事项" aria-hidden="true">#</a> 8.1、字符串枚举 - 注意事项</h3><p>字符串枚举的所有成员值，都必须显式设置。</p><p>如果没有设置，成员值默认为数值，且位置必须在字符串成员之前。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Foo <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">,</span> <span class="token comment">// 0</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">C</span><span class="token punctuation">,</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// A 之前没有其他成员，所以可以不设置初始值，默认等于 0；</span>
<span class="token comment">// C 之前有一个字符串成员，所以 C 必须有初始值，不赋值就报错了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Enum 成员可以是字符串和数值混合赋值</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Enum <span class="token punctuation">{</span>
  One <span class="token operator">=</span> <span class="token string">&quot;One&quot;</span><span class="token punctuation">,</span>
  Two <span class="token operator">=</span> <span class="token string">&quot;Two&quot;</span><span class="token punctuation">,</span>
  Three <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>
  Four <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了数值和字符串，Enum 成员不允许使用其他值（比如 Symbol 值）。</p><p>变量类型如果是字符串 Enum，就不能再赋值为字符串，这跟数值 Enum 不一样。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> MyEnum <span class="token punctuation">{</span>
  One <span class="token operator">=</span> <span class="token string">&quot;One&quot;</span><span class="token punctuation">,</span>
  Two <span class="token operator">=</span> <span class="token string">&quot;Two&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> s <span class="token operator">=</span> MyEnum<span class="token punctuation">.</span>One<span class="token punctuation">;</span>
s <span class="token operator">=</span> <span class="token string">&quot;One&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

<span class="token comment">// 变量 s 的类型是 MyEnum，再赋值为字符串就报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于这个原因，如果函数的参数类型是字符串 Enum，传参时就不能直接传入字符串，而要传入 Enum 成员。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> MyEnum <span class="token punctuation">{</span>
  One <span class="token operator">=</span> <span class="token string">&quot;One&quot;</span><span class="token punctuation">,</span>
  Two <span class="token operator">=</span> <span class="token string">&quot;Two&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span>arg<span class="token operator">:</span> MyEnum<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">&quot;arg is &quot;</span> <span class="token operator">+</span> arg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">f</span><span class="token punctuation">(</span><span class="token string">&quot;One&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

<span class="token comment">// 参数类型是 MyEnum，直接传入字符串会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，字符串 Enum 作为一种类型，有限定函数参数的作用。</p><p>前面说过，数值 Enum 的成员值往往不重要。但是有些场合，开发者可能希望 Enum 成员值可以保存一些有用的信息，所以 TypeScript 才设计了字符串 Enum。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> <span class="token keyword">enum</span> MediaTypes <span class="token punctuation">{</span>
  <span class="token constant">JSON</span> <span class="token operator">=</span> <span class="token string">&quot;application/json&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">XML</span> <span class="token operator">=</span> <span class="token string">&quot;application/xml&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">&quot;localhost&quot;</span><span class="token punctuation">;</span>

<span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  headers<span class="token operator">:</span> <span class="token punctuation">{</span>
    Accept<span class="token operator">:</span> MediaTypes<span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 函数 fetch() 的参数对象的属性 Accept，只能接受一些指定的字符串</span>
<span class="token comment">// 这时就很适合把字符串放进一个 Enum 结构，通过成员值来引用这些字符串。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字符串 Enum 可以使用联合类型（union）代替。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">function</span> <span class="token function">move</span><span class="token punctuation">(</span>where<span class="token operator">:</span> <span class="token string">&quot;Up&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;Down&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;Left&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;Right&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数参数 wher e属于联合类型，效果跟指定为字符串 Enum 是一样的。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，字符串 Enum 的成员值，不能使用表达式赋值。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> MyEnum <span class="token punctuation">{</span>
  <span class="token constant">A</span> <span class="token operator">=</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;T&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;o&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// 成员 B 的值是一个字符串表达式，导致报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、keyof-运算符" tabindex="-1"><a class="header-anchor" href="#_9、keyof-运算符" aria-hidden="true">#</a> 9、keyof 运算符</h3><p>keyof 运算符可以取出 Enum 结构的所有成员名，作为联合类型返回。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> MyEnum <span class="token punctuation">{</span>
  <span class="token constant">A</span> <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// &#39;A&#39;|&#39;B&#39;</span>
<span class="token keyword">type</span> <span class="token class-name">Foo</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> <span class="token keyword">typeof</span> MyEnum<span class="token punctuation">;</span>

<span class="token comment">// keyof typeof MyEnum 可以取出 MyEnum 的所有成员名，所以类型 Foo 等同于联合类型 &#39;A&#39;|&#39;B&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-1、keyof-运算符-注意事项" tabindex="-1"><a class="header-anchor" href="#_9-1、keyof-运算符-注意事项" aria-hidden="true">#</a> 9.1、keyof 运算符 - 注意事项</h3><p>这里的<code>typeof</code>是必需的，否则<code>keyof MyEnum</code>相当于<code>keyof number</code></p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">Foo</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> MyEnum<span class="token punctuation">;</span>
<span class="token comment">// &quot;toString&quot; | &quot;toFixed&quot; | &quot;toExponential&quot; |</span>
<span class="token comment">// &quot;toPrecision&quot; | &quot;valueOf&quot; | &quot;toLocaleString&quot;</span>

<span class="token comment">// 类型 Foo 等于类型 number 的所有原生属性名组成的联合类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为 Enum 作为类型，本质上属于<code>number</code>或<code>string</code>的一种变体，而<code>typeof MyEnum</code>会将<code>MyEnum</code>当作一个值处理，从而先其转为对象类型，就可以再用<code>keyof</code>运算符返回该对象的所有属性名。</p><p>如果要返回 Enum 所有的成员值，可以使用<code>in</code>运算符。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> MyEnum <span class="token punctuation">{</span>
  <span class="token constant">A</span> <span class="token operator">=</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">B</span> <span class="token operator">=</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// { a: any, b: any }</span>
<span class="token keyword">type</span> <span class="token class-name">Foo</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key <span class="token keyword">in</span> MyEnum<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 采用属性索引可以取出 MyEnum 的所有成员值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、异构枚举" tabindex="-1"><a class="header-anchor" href="#_10、异构枚举" aria-hidden="true">#</a> 10、异构枚举</h3><p>数字枚举 和 字符串枚举 混用，就构成了 异构枚举。</p><blockquote><p>当然，这种情况容易引起混淆。因此不建议使用 ！</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 异构枚举</span>
<span class="token keyword">enum</span> Answer <span class="token punctuation">{</span>
  <span class="token constant">N</span><span class="token punctuation">,</span>
  <span class="token constant">Y</span> <span class="token operator">=</span> <span class="token string">&quot;Yes&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11、枚举成员的性质" tabindex="-1"><a class="header-anchor" href="#_11、枚举成员的性质" aria-hidden="true">#</a> 11、枚举成员的性质</h3><p>枚举成员的值是一个只读类型，因此定义之后是不能修改的。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 数字枚举</span>
<span class="token keyword">enum</span> Role <span class="token punctuation">{</span>
  <span class="token comment">// 自定义数字枚举的初始值为 1，默认从0开始</span>
  SuperAdministrator <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Administrators<span class="token punctuation">,</span>
  OrdinaryAdministrator<span class="token punctuation">,</span>
  User<span class="token punctuation">,</span>
  Developer<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 修改枚举成员的值，编辑器会报错（枚举成员的值是一个只读类型）</span>
<span class="token comment">// 因此枚举成员的值定义后是不能修改的</span>
Role<span class="token punctuation">.</span>SuperAdministrator <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230621204613610.1ef487d9.png" alt="image-20230621204613610"></p><h3 id="_12、枚举成员的分类" tabindex="-1"><a class="header-anchor" href="#_12、枚举成员的分类" aria-hidden="true">#</a> 12、枚举成员的分类</h3><p>枚举成员的分为两类</p><p><strong>①、<code>const enum</code> 常量枚举，有三种情况</strong></p><ul><li>没有初始值的</li><li>对已有枚举成员的引用</li><li>常量的表达式</li></ul><p><strong>②、<code>computed enum</code> 需要被计算的枚举成员（非常量的表达式）</strong></p><ul><li>这些枚举成员的值不会在编译阶段进行计算，而会被保留到程序执行阶段</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 枚举成员</span>
<span class="token keyword">enum</span> Char <span class="token punctuation">{</span>
    <span class="token comment">// const enum 常量枚举，有三种情况（a，b，c）</span>
    <span class="token comment">// 1、没有初始值</span>
    a<span class="token punctuation">,</span>
    <span class="token comment">// 2、对已有枚举成员的引用</span>
    b <span class="token operator">=</span> Char<span class="token punctuation">.</span>a<span class="token punctuation">,</span>
    <span class="token comment">// 3、常量的表达式</span>
    c <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">,</span>

    <span class="token comment">// computed enum 需要被计算的枚举成员（非常量的表达式）</span>
    <span class="token comment">// 这些枚举成员的值不会在编译阶段进行计算，而会被保留到程序执行阶段</span>
    d <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    e <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span><span class="token punctuation">.</span>length

    <span class="token comment">// 如果定义在 computed enum 后边的枚举成员，必须要有一个 初始值，否则会报错</span>
    <span class="token comment">// f</span>
    f <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45),g={href:"https://www.typescriptlang.org/play?#code/PTAEizzQ+OUBCNA0VAoApgOwK4FtQGEAWBDAJ1AG95RzQRQBjAe2QGcAXUFDUQDj1B5xKkBh-wSHNAkHKBZz0CjBoFbFQBD-eXgCNe1QJD-ZCngA0K8rNABebPgIA6dZpq7QARlABqUACYNFSmDroADqiaIAJqzSZAAHTAQMjAaojAQujAdO9AELcoOElAPXTuKMALCMA++MB4fWUnXz0AWTwmHEMCPGRvWnQACgBKRwpEcwByCzsAZkbDABsUAHNC+ABfIA",target:"_blank",rel:"noopener noreferrer"},x=a(`<p><img src="https://www.arryblog.com/assets/img/image-20230621225116041.cfd5e95d.png" alt="image-20230621225116041"></p><p>注：</p><p>通过以编译后的 JS 代码可看到</p><ul><li>常量枚举成员，已经被计算出了结果，分别是 0、0、3</li><li>需要被计算的枚举成员，它的值被保留了，需要在运行时环境才会被计算</li></ul><blockquote><p>如果定义在 computed enum 后边的枚举成员，必须要有一个 初始值，否则会报错</p></blockquote><h3 id="_13、常量枚举" tabindex="-1"><a class="header-anchor" href="#_13、常量枚举" aria-hidden="true">#</a> 13、常量枚举</h3><p>用 const 声明的枚举 就是 <strong>常量枚举</strong></p><p>常量枚举的特性：会在编译阶段被移除</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 常量枚举</span>
<span class="token keyword">const</span> <span class="token keyword">enum</span> Month <span class="token punctuation">{</span>
  Jan<span class="token punctuation">,</span>
  Feb<span class="token punctuation">,</span>
  Mar<span class="token punctuation">,</span>
  Apr<span class="token punctuation">,</span>
  May<span class="token punctuation">,</span>
  Jun<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),y={href:"https://www.typescriptlang.org/play?#code/PTAEg49R5xMLPND45AoAxgewHYGcAuoCmqCuAtqALJqYAWoA3vKPaAFICGqANHQwGI4BGHDUswBOAhgEEADqM70SzAJ5j6jfKngBfIA",target:"_blank",rel:"noopener noreferrer"},h=a(`<p><img src="https://www.arryblog.com/assets/img/image-20230621231600020.f1704b21.png" alt="image-20230621231600020"></p><p>常量枚举的作用：当我们不需要一个对象，而需要对象的值的时候，就可以使用 常量枚举。这样会减少我们在编译环境的代码。</p><p>如：定义一个变量，它的取值定义为一些常量枚举</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 常量枚举</span>
<span class="token keyword">const</span> <span class="token keyword">enum</span> Month <span class="token punctuation">{</span>
  Jan<span class="token punctuation">,</span>
  Feb<span class="token punctuation">,</span>
  Mar<span class="token punctuation">,</span>
  Apr<span class="token punctuation">,</span>
  May<span class="token punctuation">,</span>
  Jun<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义一个变量，它的取值定义为一些常量枚举</span>
<span class="token keyword">let</span> month <span class="token operator">=</span> <span class="token punctuation">[</span>Month<span class="token punctuation">.</span>Jan<span class="token punctuation">,</span> Month<span class="token punctuation">.</span>Feb<span class="token punctuation">,</span> Month<span class="token punctuation">.</span>Mar<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),f={href:"https://www.typescriptlang.org/play?#code/PTAEg49R5xMLPND45AoAxgewHYGcAuoCmqCuAtqALJqYAWoA3vKPaAFICGqANHQwGI4BGHDUswBOAhgEEADqM70SzAJ5j6jfKngBfeCFCAs7UCScoAA5QFRygDeVIgGH-AwdqAQt0BryoB4FA4C45Q4Gy5KHHgAbHNkLkVAC8oADaZKiUAHQs7KSBUTz88ZEUUfLCALpAA",target:"_blank",rel:"noopener noreferrer"},w=a(`<p><img src="https://www.arryblog.com/assets/img/image-20230621232634195.6dc3fbc7.png" alt="image-20230621232634195"></p><p>注：</p><p>从以上编译后的 JS 代码中，枚举已经被直接替换成了常量，这样我们在运行时的代码就会变得非常简洁。</p><h3 id="_14、枚举类型" tabindex="-1"><a class="header-anchor" href="#_14、枚举类型" aria-hidden="true">#</a> 14、枚举类型</h3><p>在某些情况下，枚举 和 枚举成员都可以作为一种单独的类型存在。</p><ul><li>情况 1：枚举成员没有任何初始值</li><li>情况 2：所有成员都是数字枚举</li><li>情况 3：所有成员都是字符串枚举</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 枚举类型</span>

<span class="token comment">// 枚举成员没有任何初始值</span>
<span class="token keyword">enum</span> <span class="token constant">A</span> <span class="token punctuation">{</span>
  a<span class="token punctuation">,</span>
  b<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 所有成员都是数字枚举</span>
<span class="token keyword">enum</span> <span class="token constant">B</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 所有成员都是字符串枚举</span>
<span class="token keyword">enum</span> <span class="token constant">C</span> <span class="token punctuation">{</span>
  a <span class="token operator">=</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span>
  b <span class="token operator">=</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义了两个枚举类型 a 和 b</span>
<span class="token comment">// 我们可以将任意的 number 类型赋值给枚举类型</span>
<span class="token comment">// 它的取值也可以超出枚举成员的定义</span>
<span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> b<span class="token operator">:</span> <span class="token constant">B</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

<span class="token comment">// 两种不同类型的枚举是不可以进行比较的，编辑器会提示报错</span>
a <span class="token operator">===</span> b<span class="token punctuation">;</span>

<span class="token comment">// 定义了三种枚举成员类型 a1、a2、a3</span>
<span class="token keyword">let</span> a1<span class="token operator">:</span> <span class="token constant">A</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> a2<span class="token operator">:</span> <span class="token constant">A</span><span class="token punctuation">.</span>b<span class="token punctuation">;</span>

<span class="token comment">// a1 和 a2 是不可以比较的，不是相同的枚举成员类型</span>
a1 <span class="token operator">===</span> a2<span class="token punctuation">;</span>

<span class="token keyword">let</span> a3<span class="token operator">:</span> <span class="token constant">A</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// a1 和 a3 是相同的枚举成员类型，可以进行比较</span>
a1 <span class="token operator">===</span> a3<span class="token punctuation">;</span>

<span class="token comment">// 字符串枚举的取值只能是 枚举成员的类型</span>
<span class="token keyword">let</span> c1<span class="token operator">:</span> <span class="token constant">C</span> <span class="token operator">=</span> <span class="token constant">C</span><span class="token punctuation">.</span>b<span class="token punctuation">;</span> <span class="token comment">// 取值可以是 G.a 或 G.b</span>
<span class="token keyword">let</span> c2<span class="token operator">:</span> <span class="token constant">C</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token constant">C</span><span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// C.a 的取值只能是它自身</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15、总结" tabindex="-1"><a class="header-anchor" href="#_15、总结" aria-hidden="true">#</a> 15、总结</h3><p>关于 TS 的枚举类型，需要我们掌握一种思维方法：将程序中不容易记忆的硬编码 或 在未来中可能改变的常量抽取出来，定义成枚举类型。</p><p>这样可以提高我们程序的可读性 和 可维护性，枚举类型可以使我们的程序以不变应万变。</p><h2 id="二、interface-接口" tabindex="-1"><a class="header-anchor" href="#二、interface-接口" aria-hidden="true">#</a> 二、interface 接口</h2><p>接口在 TS 中是一个非常重要的概念，接口可以用来约束对象、函数、以及类的结构 和 类型，这是一种代码协作的契约，我们必须遵守而且不能改变。</p><h3 id="_1、什么是-interface-接口" tabindex="-1"><a class="header-anchor" href="#_1、什么是-interface-接口" aria-hidden="true">#</a> 1、什么是 interface 接口</h3><p>interface 是对象的模板，可以看作是一种类型约定，中文译为“接口”。使用了某个模板的对象，就拥有了指定的类型结构。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义了一个接口 User，它指定一个对象模板，拥有三个属性 id、username 和 age</span>
<span class="token comment">// 任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现该接口很简单，只要指定它作为对象的类型即可。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> u<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token number">1001</span><span class="token punctuation">,</span>
  username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 变量 u 的类型就是接口 User，所以必须符合 User 指定的结构</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方括号运算符可以取出 interface 某个属性的类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> Foo<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// string</span>

<span class="token comment">// Foo[&#39;a&#39;] 返回属性a的类型，所以类型 A 就是 string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、interface-表示对象的-5-种语法" tabindex="-1"><a class="header-anchor" href="#_2、interface-表示对象的-5-种语法" aria-hidden="true">#</a> 2、interface 表示对象的 5 种语法</h3><p>interface 可以表示对象的各种语法，它的成员有 5 种形式。</p><ul><li>对象属性</li><li>对象的属性索引</li><li>对象方法</li><li>函数</li><li>构造函数</li></ul><h3 id="_2-1、对象属性" tabindex="-1"><a class="header-anchor" href="#_2-1、对象属性" aria-hidden="true">#</a> 2.1、对象属性</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// x 和 y 都是对象的属性，分别使用冒号指定每个属性的类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性之间使用分号或逗号分隔，最后一个属性结尾的分号或逗号可以省略。</p><p>如果属性是可选的，就在属性名后面加一个问号。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  x<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果属性是只读的，需要加上<code>readonly</code>修饰符。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">readonly</span> a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、对象的属性索引" tabindex="-1"><a class="header-anchor" href="#_2-2、对象的属性索引" aria-hidden="true">#</a> 2.2、对象的属性索引</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// [prop: string] 就是属性的字符串索引，表示属性名只要是字符串，都符合类型要求</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性索引共有<code>string</code>、<code>number</code>和<code>symbol</code>三种类型。</p><p>一个接口中，最多只能定义一个字符串索引。字符串索引会约束该类型中所有名字为字符串的属性。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">MyObj</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

  a<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// 编译错误</span>
<span class="token punctuation">}</span>

<span class="token comment">// 属性索引指定所有名称为字符串的属性，它们的属性值必须是数值（number）</span>
<span class="token comment">// 属性 a 的值为布尔值就报错了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性的数值索引，其实是指定数组的类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj<span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// [prop: number] 表示属性名的类型是数值，所以可以用数组对变量 obj 赋值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，一个接口中最多只能定义一个数值索引。数值索引会约束所有名称为数值的属性。</p><p>如果一个 interface 同时定义了字符串索引和数值索引，那么数值索引必须服从于字符串索引。因为在 JavaScript 中，数值属性名最终是自动转换成字符串属性名。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token punctuation">[</span>prop<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 正确</span>
<span class="token punctuation">}</span>

<span class="token comment">// 数值索引的属性值类型与字符串索引不一致，就会报错</span>
<span class="token comment">// 数值索引必须兼容字符串索引的类型声明</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3、对象的方法" tabindex="-1"><a class="header-anchor" href="#_2-3、对象的方法" aria-hidden="true">#</a> 2.3、对象的方法</h3><p>对象的方法共有三种写法</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 写法一</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 写法二</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token function-variable function">f</span><span class="token operator">:</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 写法三</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token punctuation">{</span>
  f<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性名可以采用表达式，所以下面的写法也是可以的。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> f <span class="token operator">=</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>f<span class="token punctuation">]</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型方法可以重载</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>interface 里面的函数重载，不需要给出实现。但是，由于对象内部定义方法时，无法使用函数重载的语法，所以需要额外在对象外部给出函数方法的实现。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">MyFunc</span><span class="token punctuation">(</span>x<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">,</span> y<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">boolean</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> y <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">&quot;boolean&quot;</span> <span class="token operator">&amp;&amp;</span> y <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> y <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;wrong parameters&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a<span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  f<span class="token operator">:</span> MyFunc<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 接口 A 的方法 f() 有函数重载，需要额外定义一个函数 MyFunc() 实现这个重载，然后部署接口 A 的对象 a 的属性 f 等于函数 MyFunc() 就可以了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4、函数" tabindex="-1"><a class="header-anchor" href="#_2-4、函数" aria-hidden="true">#</a> 2.4、函数</h3><p>interface 也可以用来声明独立的函数</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Add</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> myAdd<span class="token operator">:</span> <span class="token function-variable function">Add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

<span class="token comment">// 接口 Add 声明了一个函数类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5、构造函数" tabindex="-1"><a class="header-anchor" href="#_2-5、构造函数" aria-hidden="true">#</a> 2.5、构造函数</h3><p>interface 内部可以使用<code>new</code>关键字，表示构造函数。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">ErrorConstructor</span> <span class="token punctuation">{</span>
  <span class="token keyword">new</span> <span class="token punctuation">(</span>message<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> Error<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口 ErrorConstructor 内部有 new 命令，表示它是一个构造函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>TypeScript 里面，构造函数特指具有<code>constructor</code>属性的类，在 Class 类中会详细讲解</p></blockquote><h3 id="_3、interface-的继承" tabindex="-1"><a class="header-anchor" href="#_3、interface-的继承" aria-hidden="true">#</a> 3、interface 的继承</h3><p>interface 可以继承其他类型</p><ul><li>interface 继承 interface</li><li>interface 继承 type</li><li>interface 继承 class</li></ul><h3 id="_3-1、interface-继承-interface" tabindex="-1"><a class="header-anchor" href="#_3-1、interface-继承-interface" aria-hidden="true">#</a> 3.1、interface 继承 interface</h3><p>interface 可以使用<code>extends</code>关键字，继承其他 interface。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Circle 继承了 Shape，所以 Circle 其实有两个属性 name 和 radius</span>
<span class="token comment">// 这时，Circle 是子接口，Shape 是父接口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>extends</code>关键字会从继承的接口里面拷贝属性类型，这样就不必书写重复的属性。</p><p>interface 允许多重继承</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Style</span> <span class="token punctuation">{</span>
  color<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Style</span><span class="token punctuation">,</span> Shape <span class="token punctuation">{</span>
  radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Circle 同时继承了 Style 和 Shape，所以拥有三个属性 color、name 和 radius</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多重接口继承，实际上相当于多个父接口的合并。</p><p>如果子接口与父接口存在同名属性，那么子接口的属性会覆盖父接口的属性。注意，子接口与父接口的同名属性必须是类型兼容的，不能有冲突，否则会报错。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Bar</span> <span class="token keyword">extends</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// Bar 继承了 Foo，但是两者的同名属性 id 的类型不兼容，导致报错。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Bar</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错</span>
<span class="token keyword">interface</span> <span class="token class-name">Baz</span> <span class="token keyword">extends</span> <span class="token class-name">Foo</span><span class="token punctuation">,</span> Bar <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Baz 同时继承了 Foo 和 Bar，但是后两者的同名属性 id 有类型冲突，导致报错。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2、interface-继承-type" tabindex="-1"><a class="header-anchor" href="#_3-2、interface-继承-type" aria-hidden="true">#</a> 3.2、interface 继承 type</h3><p>interface 可以继承<code>type</code>命令定义的对象类型。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">Allen</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Allen 继承了 type 命令定义的 Person 对象，并且新增了一个 height 属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>如果<code>type</code>命令定义的类型不是对象，interface 就无法继承。</p><h3 id="_3-3、interface-继承-class" tabindex="-1"><a class="header-anchor" href="#_3-3、interface-继承-class" aria-hidden="true">#</a> 3.3、interface 继承 class</h3><p>interface 还可以继承 class，即继承该类的所有成员。（后边会详细讲解 class）</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>

  <span class="token function">y</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// B 继承了 A，因此 B 就具有属性 x、y() 和 z</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现<code>B</code>接口的对象就需要实现这些属性。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">const</span> b<span class="token operator">:</span> <span class="token constant">B</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">y</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  z<span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 对象 b 就实现了接口 B，而接口 B 又继承了 类 A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>某些类拥有私有成员和保护成员，interface 可以继承这样的类，但是意义不大。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> x<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">protected</span> y<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错</span>
<span class="token keyword">const</span> b<span class="token operator">:</span> <span class="token constant">B</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token keyword">implements</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// A 有私有成员 和 保护成员，B 继承了 A，但无法用于对象，因为对象不能实现这些成员</span>
<span class="token comment">// 这导致 B 只能用于其他 class，而这时其他 class 与 A 之间不构成父类 和 子类的关系，使得 x 与 y 无法部署</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、接口合并" tabindex="-1"><a class="header-anchor" href="#_4、接口合并" aria-hidden="true">#</a> 4、接口合并</h3><p>多个同名接口会合并成一个接口。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Box</span> <span class="token punctuation">{</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Box</span> <span class="token punctuation">{</span>
  length<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 两个 Box 接口会合并成一个接口，同时有 height、width 和 length 三个属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>这样的设计主要是为了兼容 JavaScript 的行为。JavaScript 开发者常常对全局对象或者外部库，添加自己的属性和方法。</p><p>那么，只要使用 interface 给出这些自定义属性和方法的类型，就能自动跟原始的 interface 合并，使得扩展外部类型非常方便。</p><h3 id="_4-1、接口合并-注意事项" tabindex="-1"><a class="header-anchor" href="#_4-1、接口合并-注意事项" aria-hidden="true">#</a> 4.1、接口合并 - 注意事项</h3><p>Web 网页开发经常会对<code>windows</code>对象和<code>document</code>对象添加自定义属性，但是 TypeScript 会报错，因为原始定义没有这些属性。</p><blockquote><p>解决方法就是把自定义属性写成 interface，合并进原始定义。</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
  foo<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 接口 Document 增加了一个自定义属性 foo，从而就可以在 document 对象上使用自定义属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同名接口合并时，同一个属性如果有多个类型声明，彼此不能有类型冲突。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token punctuation">}</span>

<span class="token comment">// 接口 A 的属性 a 有两个类型声明，彼此是冲突的，导致报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同名接口合并时，如果同名方法有不同的类型声明，那么会发生函数重载。而且，后面的定义比前面的定义具有更高的优先级。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Cloner</span> <span class="token punctuation">{</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Animal<span class="token punctuation">)</span><span class="token operator">:</span> Animal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Cloner</span> <span class="token punctuation">{</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Sheep<span class="token punctuation">)</span><span class="token operator">:</span> Sheep<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Cloner</span> <span class="token punctuation">{</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Dog<span class="token punctuation">)</span><span class="token operator">:</span> Dog<span class="token punctuation">;</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Cat<span class="token punctuation">)</span><span class="token operator">:</span> Cat<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">interface</span> <span class="token class-name">Cloner</span> <span class="token punctuation">{</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Dog<span class="token punctuation">)</span><span class="token operator">:</span> Dog<span class="token punctuation">;</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Cat<span class="token punctuation">)</span><span class="token operator">:</span> Cat<span class="token punctuation">;</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Sheep<span class="token punctuation">)</span><span class="token operator">:</span> Sheep<span class="token punctuation">;</span>
  <span class="token function">clone</span><span class="token punctuation">(</span>animal<span class="token operator">:</span> Animal<span class="token punctuation">)</span><span class="token operator">:</span> Animal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// clone() 方法有不同的类型声明，会发生函数重载。这时，越靠后的定义，优先级越高，排在函数重载的越前面</span>
<span class="token comment">// 比如，clone(animal: Animal) 是最先出现的类型声明，就排在函数重载的最后，属于clone() 函数最后匹配的类型。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个规则有一个例外。同名方法之中，如果有一个参数是字面量类型，字面量类型有更高的优先级。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token string">&quot;foo&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token function">f</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// f() 方法有一个类型声明的参数x是字面量类型，这个类型声明的优先级最高，会排在函数重载的最前面</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、接口合并实践应用" tabindex="-1"><a class="header-anchor" href="#_4-2、接口合并实践应用" aria-hidden="true">#</a> 4.2、接口合并实践应用</h3><p>以下应用是 Document 对象的<code>createElement()</code>方法，它会根据参数的不同，而生成不同的 HTML 节点对象</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> Element<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLDivElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;span&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLSpanElement<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;canvas&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLCanvasElement<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 等同于</span>
<span class="token keyword">interface</span> <span class="token class-name">Document</span> <span class="token punctuation">{</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;canvas&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLCanvasElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;div&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLDivElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token string">&quot;span&quot;</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLSpanElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> HTMLElement<span class="token punctuation">;</span>
  <span class="token function">createElement</span><span class="token punctuation">(</span>tagName<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> Element<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// createElement() 方法的函数重载，参数为字面量的类型声明会排到最前面，返回具体的 HTML 节点对象</span>
<span class="token comment">// 类型越不具体的参数，排在越后面，返回通用的 HTML 节点对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果两个 interface 组成的联合类型存在同名属性，那么该属性的类型也是联合类型。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 圆</span>
<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  area<span class="token operator">:</span> bigint<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 长方形</span>
<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  area<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">declare</span> <span class="token keyword">const</span> s<span class="token operator">:</span> Circle <span class="token operator">|</span> Rectangle<span class="token punctuation">;</span>

s<span class="token punctuation">.</span>area<span class="token punctuation">;</span> <span class="token comment">// bigint | number</span>

<span class="token comment">// 接口 Circle 和 Rectangle 组成一个联合类型 Circle | Rectangle</span>
<span class="token comment">// 因此，这个联合类型的同名属性 area，也是一个联合类型</span>
<span class="token comment">// declare命令表示 变量 s 的具体定义，由其他脚本文件给出，在 declare 命令 的部分会学习</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、interface-与-type-的异同" tabindex="-1"><a class="header-anchor" href="#_5、interface-与-type-的异同" aria-hidden="true">#</a> 5、interface 与 type 的异同</h3><p><code>interface</code>命令与<code>type</code>命令作用类似，都可以表示对象类型。</p><p>很多对象类型既可以用 interface 表示，也可以用 type 表示。而且，两者往往可以换用，几乎所有的 interface 命令都可以改写为 type 命令。</p><h3 id="_5-1、相似之处" tabindex="-1"><a class="header-anchor" href="#_5-1、相似之处" aria-hidden="true">#</a> 5.1、相似之处</h3><p>它们的相似之处，首先表现在都能为对象类型起名。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">User</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">Users</span> <span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// type 命令 和 interface 命令，分别定义同一个类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p><code>class</code>命令也有类似作用，通过定义一个类，同时定义一个对象类型。</p><p>但是，它会创造一个值，编译后依然存在。如果只是单纯想要一个类型，应该使用<code>type</code>或<code>interface</code>。</p><h3 id="_5-2、interface-与-type-的区别" tabindex="-1"><a class="header-anchor" href="#_5-2、interface-与-type-的区别" aria-hidden="true">#</a> 5.2、interface 与 type 的区别</h3><ul><li>①、<code>type</code>能够表示非对象类型，而<code>interface</code>只能表示对象类型（包括数组、函数等）</li><li>②、<code>interface</code>可以继承其他类型，<code>type</code>不支持继承。</li></ul><p>继承的主要作用是添加属性，<code>type</code>定义的对象类型如果想要添加属性，只能使用<code>&amp;</code>运算符，重新定义一个类型。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">Animal</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Dog</span> <span class="token operator">=</span> Animal <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 类型 Dog 在 Animal 的基础上添加了一个属性 age</span>
<span class="token comment">// 上面的 &amp;运算符，表示同时具备两个类型的特征，因此可以起到两个对象类型合并的作用。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为比较，<code>interface</code>添加属性，采用的是继承的写法。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>继承时，type 和 interface 是可以换用的。interface 可以继承 type。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">Foo</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">Bar</span> <span class="token keyword">extends</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>type 也可以继承 interface。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Bar</span> <span class="token operator">=</span> Foo <span class="token operator">&amp;</span> <span class="token punctuation">{</span> y<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>③、同名<code>interface</code>会自动合并，同名<code>type</code>则会报错。也就是说，TypeScript 不允许使用<code>type</code>多次定义同一个类型</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> bar<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>

<span class="token comment">// type 两次定义了类型A，导致两行都会报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为比较，<code>interface</code>则会自动合并</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  foo<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  bar<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj<span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  bar<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// interface 把类型 A 的两个定义合并在一起</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这表明，interface 是开放的，可以添加属性，type 是封闭的，不能添加属性，只能定义新的 type</p><ul><li>④、<code>interface</code>不能包含属性映射（mapping），<code>type</code>可以</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Point</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 正确</span>
<span class="token keyword">type</span> <span class="token class-name">PointCopy1</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Point<span class="token punctuation">]</span><span class="token operator">:</span> Point<span class="token punctuation">[</span>Key<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">interface</span> <span class="token class-name">PointCopy2</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Key <span class="token keyword">in</span> <span class="token keyword">keyof</span> Point<span class="token punctuation">]</span><span class="token operator">:</span> Point<span class="token punctuation">[</span>Key<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>⑤、this<code>关键字只能用于</code>interface</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 正确</span>
<span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  <span class="token function">add</span><span class="token punctuation">(</span>num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 报错</span>
<span class="token keyword">type</span> <span class="token class-name">Foo</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">add</span><span class="token punctuation">(</span>num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// type 命令声明的方法 add()，返回 this 就报错了</span>
<span class="token comment">// 而 interface 命令没有这个问题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是返回<code>this</code>的实际对象的例子</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">class</span> <span class="token class-name">Count</span> <span class="token keyword">implements</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token function">add</span><span class="token punctuation">(</span>num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">+=</span> num<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>⑥、type 可以扩展原始数据类型，interface 不行</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 正确</span>
<span class="token keyword">type</span> <span class="token class-name">MyStr</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&quot;new&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 报错</span>
<span class="token keyword">interface</span> <span class="token class-name">MyStr</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">string</span></span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&quot;new&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// type 可以扩展原始数据类型 string，interface 就不行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>⑦、<code>interface</code>无法表达某些复杂类型（比如交叉类型和联合类型），但是<code>type</code>可以</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">AorB</span> <span class="token operator">=</span> <span class="token constant">A</span> <span class="token operator">|</span> <span class="token constant">B</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">AorBwithName</span> <span class="token operator">=</span> AorB <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 类型 AorB 是一个联合类型，AorBwithName 则是为 AorB 添加一个属性</span>
<span class="token comment">// 这两种运算，interface 都没法表达</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>综上所述，如果有复杂的类型运算，那么没有其他选择只能使用<code>type</code>；一般情况下，<code>interface</code>灵活性比较高，便于扩充类型或自动合并，建议优先使用。</p><h3 id="_6、对象类型接口" tabindex="-1"><a class="header-anchor" href="#_6、对象类型接口" aria-hidden="true">#</a> 6、对象类型接口</h3><p>需求：从后端获取一组数据，然后将数据渲染到页面中，我们应该如何定义接口 ？</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 使用 interface 定义一个 List 接口，该接口包括三个成员</span>
<span class="token keyword">interface</span> <span class="token class-name">List</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 使用 interface 定义一个 Result 接口，有一个成员是 data，成员的取值是 List[] 数组</span>
<span class="token keyword">interface</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> List<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 渲染函数</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span>result<span class="token operator">:</span> Result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 遍历 result.data</span>
  result<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 打印对应的值</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>id<span class="token punctuation">,</span> value<span class="token punctuation">.</span>username<span class="token punctuation">,</span> value<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 假设：result 为后端接收过来的数据，同时 result 完全符合接口的定义</span>
<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 调用 render() 函数，同时将后端的数据 result 作为参数传入其中</span>
<span class="token function">render</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230623155344693-16937298565541.8dddccd4.png" alt="image-20230623155344693"></p><p>注：</p><p>以上代码运行后，输出的结果符合我们的预期。</p><p>但实际开发过程中，一定会遇到后端往往会传入过来一些预定之外的字段。</p><blockquote><p>如下</p></blockquote><h3 id="_7、ts-的鸭式辨型法" tabindex="-1"><a class="header-anchor" href="#_7、ts-的鸭式辨型法" aria-hidden="true">#</a> 7、TS 的鸭式辨型法</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">List</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> List<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span>result<span class="token operator">:</span> Result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  result<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>id<span class="token punctuation">,</span> value<span class="token punctuation">.</span>username<span class="token punctuation">,</span> value<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 后端传入预定之外的字段，sex: &#39;male&#39;</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>当后端传入了预定之外的字段 <code>sex: &#39;male&#39;</code> ，发现在 TS 中并没有报错，它是允许这种情况发生的。</p><p>这是因为 TS 采用了一种 <strong>“鸭式辨型法”</strong> 这是一种动态语言风格，有一种形象的说法是：“一只鸟，看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么这只鸟就可以被认为是鸭子”。</p><blockquote><p>在 TS 中，我们只要传入的对象满足接口的必要条件，那就是被允许的，即便传入多余的字段也可以通过类型检查。</p></blockquote><h3 id="_7-1、鸭式辨型法特殊情况" tabindex="-1"><a class="header-anchor" href="#_7-1、鸭式辨型法特殊情况" aria-hidden="true">#</a> 7.1、鸭式辨型法特殊情况</h3><p>如果直接传入对象字面量，TS 就会对额外的字段进行类型检查</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 此时，TS 会对额外的字段进行类型检查，sex: &#39;male&#39; 处，会报错</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230623165508453-16937298565542.ebff2073.png" alt="image-20230623165508453"></p><p>注：</p><p>以上代码，我们在 <code>render()</code> 方法中传入了对象字面量，其中有额外的字段，此时 TS 就会对额外的字段 <code>sex: &#39;male&#39;</code> 进行类型检查。</p><blockquote><p><strong>绕过这种检查的方法有三种：</strong></p></blockquote><ul><li>①、将对象字面量赋值给一个变量（像上边 result 变量的做法）</li><li>②、使用类型断言，在对象字面量后边加上 <code>as 对象的类型</code> 。类型断言的含义是：我们要明确的告诉编译器，对象的类型是什么 ，这样编译器就会绕过类型检查</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">as</span> Result<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 通过 as Result 类型断言</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型断言的另一种语法</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 直接在对象前加上 &lt;对象类型&gt;</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Result</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token plain-text">);
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注：两种方法是等价的，但此方式不建议使用，在 React 框架中会产生歧义，建议还是使用 <code>as 对象类型</code> 的方式</p></blockquote><ul><li>③、使用字符串索引签名</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">List</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token comment">// 定义字符串索引签名</span>
  <span class="token punctuation">[</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p><code>[x: string]: any;</code> 在 <code>[]</code> 中定义一个 <code>x</code> ，它的返回值类型是 <code>any</code> 这就是一个字符串索引签名。</p><p>它的含义是：用任意的字符串去索引 <code>List</code> 可以得到任意的结果，这样 List 就可以支持多个属性了。</p><h3 id="_8、接口成员-可选属性" tabindex="-1"><a class="header-anchor" href="#_8、接口成员-可选属性" aria-hidden="true">#</a> 8、接口成员 - 可选属性</h3><p>需求：判断 value 中是否有新的字段，如果有就打印出来</p><blockquote><p>可选属性语法：在属性前添加一个 <code>?</code> 问号，表示该属性可有可无</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">List</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token comment">// [x: string]: any; // 定义字符串索引签名</span>
  <span class="token comment">// sex: string; // 添加 sex 属性后，调用 render(result) 方法还是会报错</span>

  <span class="token comment">// 设置可选属性，在 sex 后边添加一个 ？ 表示该属性可有可无</span>
  sex<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> List<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span>result<span class="token operator">:</span> Result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  result<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>id<span class="token punctuation">,</span> value<span class="token punctuation">.</span>username<span class="token punctuation">,</span> value<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 判断 value 中是否有新的字段，如果有就打印出来</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span>sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 后端传入预定之外的字段，sex: &#39;male&#39;</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;female&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230623192623265-16937300444665.f5c2178f.png" alt="image-20230623192623265"></p><h3 id="_9、接口成员-只读属性" tabindex="-1"><a class="header-anchor" href="#_9、接口成员-只读属性" aria-hidden="true">#</a> 9、接口成员 - 只读属性</h3><p>只读属性：给一个属性添加 <code>readonly</code> ，一般 id 都是只读的，并且只读属性都是不能修改的。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">List</span> <span class="token punctuation">{</span>
  <span class="token comment">// 将 id 设置为 只读属性</span>
  <span class="token keyword">readonly</span> id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  <span class="token comment">// 设置可选属性，在 sex 后边添加一个 ？ 表示该属性可有可无</span>
  sex<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Result</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> List<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span>result<span class="token operator">:</span> Result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  result<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>id<span class="token punctuation">,</span> value<span class="token punctuation">.</span>username<span class="token punctuation">,</span> value<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 判断 value 中是否有新的字段，如果有就打印出来</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>value<span class="token punctuation">.</span>sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">.</span>sex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 只读属性是不能修改的</span>
    value<span class="token punctuation">.</span>id<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">{</span>
  data<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 后端传入预定之外的字段，sex: &#39;male&#39;</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;icoding&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;male&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> username<span class="token operator">:</span> <span class="token string">&quot;艾编程&quot;</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span> sex<span class="token operator">:</span> <span class="token string">&quot;female&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230623193912490-16937300444666.f615c095.png" alt="image-20230623193912490"></p><h3 id="_10、可索引类型的接口-数字索引" tabindex="-1"><a class="header-anchor" href="#_10、可索引类型的接口-数字索引" aria-hidden="true">#</a> 10、可索引类型的接口 - 数字索引</h3><p>以上接口的属性个数都是固定的，当我们不确定一个接口中有多少个属性时，就可以使用可索引类型的接口。</p><p>可索引类型的接口可使用数字索引，也可用字符串来索引。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个用数字索引的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">StringArray</span> <span class="token punctuation">{</span>
  <span class="token comment">// 定义数字索引签名</span>
  <span class="token punctuation">[</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 这样的含义是：用任意的数字去索引 StringArray，都会得到一个 string</span>
<span class="token comment">// 相当于声明了一个字符串类型的数组</span>

<span class="token comment">// 定义一个变量 chars ，它的类型是 StringArray，取值为一个字符串数组</span>
<span class="token keyword">let</span> chars<span class="token operator">:</span> StringArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11、可索引类型的接口-字符串索引" tabindex="-1"><a class="header-anchor" href="#_11、可索引类型的接口-字符串索引" aria-hidden="true">#</a> 11、可索引类型的接口 - 字符串索引</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个字符串索引的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Names</span> <span class="token punctuation">{</span>
  <span class="token comment">// 字符串索引签名，这样声明后就不能再声明 number 类型的成员了</span>
  <span class="token punctuation">[</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token comment">// y: number // 会报错，因为两种索引签名是可以混用的</span>

  <span class="token comment">// 新增一个数字签名索引</span>
  <span class="token punctuation">[</span>z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

  <span class="token comment">// 这样即可以用数字索引 Names，也可以用 String 去索引 Names</span>
  <span class="token comment">// 需要注意：数字签名的返回值，一定要是字符串索引签名值的子类类型</span>
  <span class="token comment">// 这是因为 JavaScript 会进行类型转换，将 Number 转换为 String，这样就能保持类型的兼容性</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果将数字签名的返回值改为 number，这样就会和 string 不兼容</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个字符串索引的接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Names</span> <span class="token punctuation">{</span>
  <span class="token comment">// [x: string]: string;</span>
  <span class="token punctuation">[</span>x<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span> <span class="token comment">// 改为 any 就兼容了</span>

  <span class="token comment">// 将数字签名索引的返回值 改为 number，这样就会和 string 不兼容</span>
  <span class="token punctuation">[</span>z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12、总结" tabindex="-1"><a class="header-anchor" href="#_12、总结" aria-hidden="true">#</a> 12、总结</h3><p>以上学习了对象类型接口，可以将过去我们开发过的 API 或 调用过的 API ，用接口去描述一下。</p><p>在这个过程中，会强制我们去思考一些变量的类型，也会思考一些接口的边界问题。这个过程非常有利于你培养类型思维。</p><h3 id="_13、函数类型接口" tabindex="-1"><a class="header-anchor" href="#_13、函数类型接口" aria-hidden="true">#</a> 13、函数类型接口</h3><p>在数据类型中学过，使用变量来定义一个函数类型。如下</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">let</span> <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用接口来定义一个函数，该接口的定义方式 等价于 以上函数</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Add</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还有一种更简洁的函数定义方式，即：使用类型别名</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 使用类型别名定义函数</span>
<span class="token comment">// type 为关键字，Add 为类型别名的名称，=&gt; 后边的 number 为函数返回值类型</span>
<span class="token keyword">type</span> <span class="token class-name">Add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注：类型别名就是我们这个函数取一个名字，该名字为 Add</p></blockquote><p>实现一个具体的函数 <code>add</code></p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">let</span> add<span class="token operator">:</span> <span class="token function-variable function">Add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_14、混合类型接口" tabindex="-1"><a class="header-anchor" href="#_14、混合类型接口" aria-hidden="true">#</a> 14、混合类型接口</h3><p>一个接口既可以定义一个函数，也可以像对象一样拥有属性和方法，即：混合类型接口</p><p>使用混合接口定义一个类库</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 使用混合接口定义一个类库</span>
<span class="token keyword">interface</span> <span class="token class-name">Lib</span> <span class="token punctuation">{</span>
  <span class="token comment">// 无返回值、无参数的函数</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token comment">// 版本号</span>
  version<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token comment">// 函数的方法</span>
  <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 实现接口</span>
<span class="token keyword">let</span> lib<span class="token operator">:</span> Lib <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Lib<span class="token punctuation">;</span> <span class="token comment">// 使用类型断言，明确函数的类型</span>
lib<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">;</span>
lib<span class="token punctuation">.</span><span class="token function-variable function">doSomething</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上的接口已经实现了，但它的问题就是对全局暴露了一个 <code>lib</code>，它是一个单例</p><p>如果需要创建多个 <code>lib</code> 就需要使用函数进行封装</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 使用混合接口定义一个类库</span>
<span class="token keyword">interface</span> <span class="token class-name">Lib</span> <span class="token punctuation">{</span>
  <span class="token comment">// 无返回值、无参数的函数</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
  <span class="token comment">// 版本号</span>
  version<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token comment">// 函数的方法</span>
  <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 封装 getLib() 函数</span>
<span class="token keyword">function</span> <span class="token function">getLib</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> lib<span class="token operator">:</span> Lib <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Lib<span class="token punctuation">;</span>
  lib<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">;</span>
  lib<span class="token punctuation">.</span><span class="token function-variable function">doSomething</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> lib<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 有了封装好的 getLib() 函数，就可以创建多个实例了</span>
<span class="token comment">// 创建一个 lib1 实例</span>
<span class="token keyword">let</span> lib1 <span class="token operator">=</span> <span class="token function">getLib</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 调用方法</span>
lib1<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个 lib2 实例</span>
<span class="token keyword">let</span> lib2 <span class="token operator">=</span> <span class="token function">getLib</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 调用方法</span>
lib2<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：</p><p>以上我们用接口分别定义了对象和函数，其实接口还可以定义类的结构和类型，这部分内容会在学习完 TS 的类之后在做学习。</p>`,209);function A(q,E){const e=o("ExternalLinkIcon");return c(),i("div",null,[u,s("p",null,[n("它是如何实现的 ？ 可在 "),s("a",r,[n("TypeScript - Playground (opens new window)"),t(e)]),n("中编译查看编译后的 JS 代码")]),d,s("p",null,[s("a",k,[n("TypeScript 5.0 (opens new window)"),t(e)]),n("之前，Enum 有一个 Bug，就是 Enum 类型的变量可以赋值为任何数值。")]),v,s("p",null,[n("在 "),s("a",m,[n("TypeScript - Playground (opens new window)"),t(e)]),n("中编译查看编译后的 JS 代码")]),b,s("p",null,[n("在 "),s("a",g,[n("TypeScript - Playground (opens new window)"),t(e)]),n("中编译查看编译后的 JS 代码")]),x,s("p",null,[n("在 "),s("a",y,[n("TypeScript - Playground (opens new window)"),t(e)]),n("中编译查看编译后的 JS 代码，发现编译后没有任何代码")]),h,s("p",null,[n("在 "),s("a",f,[n("TypeScript - Playground (opens new window)"),t(e)]),n("中编译查看编译后的 JS 代码")]),w])}const B=p(l,[["render",A],["__file","TypeScript zhong Enum meijuleixing、interface jiekouleixing.html.vue"]]);export{B as default};
