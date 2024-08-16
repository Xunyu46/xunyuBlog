import{_ as n,o as s,c as a,a as e}from"./app-48690364.js";const t={},p=e(`<h1 id="ts-的类型检查机制-类型兼容性、保护机制、高级类型" tabindex="-1"><a class="header-anchor" href="#ts-的类型检查机制-类型兼容性、保护机制、高级类型" aria-hidden="true">#</a> TS 的类型检查机制，类型兼容性、保护机制、高级类型</h1><p>从本节内容开始，正式学习 Typescript 中的类型检查机制，高级类型，相关配置及应用等。</p><h2 id="一、ts-的类型检查机制" tabindex="-1"><a class="header-anchor" href="#一、ts-的类型检查机制" aria-hidden="true">#</a> 一、TS 的类型检查机制</h2><p>TypeScript 编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。即：TS 的类型检查机制</p><p><strong>作用：</strong> 辅助开发，提高开发效率</p><blockquote><p>从以下几个方面来学习</p></blockquote><ul><li>类型推断</li><li>类型兼容性</li><li>类型保护</li></ul><h3 id="_1、类型推断" tabindex="-1"><a class="header-anchor" href="#_1、类型推断" aria-hidden="true">#</a> 1、类型推断</h3><p>不需要指定变量的类型（函数的返回值类型），TypeScript 可以根据某些规则自动地为其推断出一个类型。</p><ul><li>基础类型推断</li><li>最佳通用类型推断</li><li>上下文类型推断</li></ul><h3 id="_1-1、基础类型推断" tabindex="-1"><a class="header-anchor" href="#_1-1、基础类型推断" aria-hidden="true">#</a> 1.1、基础类型推断</h3><p>基础类型推断也是 TS 中比较常见的类型推断，通常发生在以下场景中</p><ul><li>初始化变量时</li><li>设置函数默认参数时</li><li>在确定函数返回值时</li></ul><p>初始化变量时</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 初始化变量时，声明一个变量 a</span>
<span class="token comment">// 如果不指定它的变量类型，TS 会自动推断为 any 类型</span>
<span class="token keyword">let</span> a<span class="token punctuation">;</span>

<span class="token comment">// 如果给变量 a 赋值为 1，就会推断为 number 类型</span>
<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">// 给变量 b 赋值为 空数组，b 就会被推断为以 any 类型为元素的 数组类型</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 给 b 赋值为 [1, 2]，就会被推断为 number 类型的数组</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置函数默认参数时</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个函数 c ，为它指定一个默认的参数 x，值为 1，x 被推断为 number 类型</span>
<span class="token keyword">let</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在确定函数返回值时</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 将该函数返回 x + 1 ，c 的返回值类型就会被 推断为 number 类型</span>
<span class="token keyword">let</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2、最佳通用类型推断" tabindex="-1"><a class="header-anchor" href="#_1-2、最佳通用类型推断" aria-hidden="true">#</a> 1.2、最佳通用类型推断</h3><p>当需要从多个类型中推断出一个类型时，TS 就会尽可能的推断出一个兼容当前所有类型的通用类型，这个就是最佳通用类型推断</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 给数组增加一个 null，null 和 number 类型是不兼容的</span>
<span class="token comment">// 因此，d 就会被推断为 null 和 number 的联合类型</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在 <code>tsconfig.json</code> 配置文件中关闭 <code>&quot;strictNullChecks&quot;: false</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;strictNullChecks&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此时，以上 null 和 number 就兼容了，d 就会被推断为 number 类型的数组</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 修改完配置文件后，d 就会被推断为 number 类型的数组</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上的类型推断都是从右向左的推断，也就是根据表达式右侧的值来推断表达式左侧的变量的类型</p></blockquote><h3 id="_1-3、上下文类型推断" tabindex="-1"><a class="header-anchor" href="#_1-3、上下文类型推断" aria-hidden="true">#</a> 1.3、上下文类型推断</h3><p>上下文类型的推断是从左到右的，它通常会发生在一个事件处理中</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 给 window 绑定一个 onkeydown 事件，这时就会发生上下文的类型推断</span>
<span class="token comment">// TS 会根据左侧的事件绑定，来推断出右侧的事件类型，会被推断为 KeyboardEvent 类型（鼠标划上 event 即可看到）</span>
window<span class="token punctuation">.</span><span class="token function-variable function">onkeydown</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// 打印输出 event 键盘事件有哪些属性</span>
  <span class="token comment">// event.button 会报错：类型“KeyboardEvent”上不存在属性“button”，因为 button 不是键盘事件的属性，而是鼠标事件的属性</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>button<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、类型断言" tabindex="-1"><a class="header-anchor" href="#_2、类型断言" aria-hidden="true">#</a> 2、类型断言</h3><p>有时候，TS 的类型推断可能不符合你的预期，而且你完全有自信比 TS 更了解你的代码。</p><p>这时 TS 就提供了一种方法，允许你覆盖它的推断，即：<strong>类型断言</strong></p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个空对象</span>
<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 给对象指定 bar 属性，此时会报错：类型“{}”上不存在属性“bar”</span>
foo<span class="token punctuation">.</span>bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何解决以上的报错问题呢 ？</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  <span class="token comment">// 给接口定义一个 bar 属性</span>
  bar<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 利用 类型断言将 foo 指定为一个 Foo 接口类型，这时就不会报错了（类型断言就发挥作用了）</span>
<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token keyword">as</span> Foo<span class="token punctuation">;</span>
foo<span class="token punctuation">.</span>bar <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时，也要注意类型断言不能乱用</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  bar<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// let foo = {} as Foo</span>

<span class="token comment">// 比如：去掉该赋值语句</span>
<span class="token comment">// 这时没有报错，但 foo 对象并么有按照接口的严格规定给其赋值为一个 bar 属性</span>
<span class="token comment">// foo.bar = 1</span>

<span class="token comment">// 因此在声明时，就指定类型</span>
<span class="token keyword">let</span> foo<span class="token operator">:</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// TS 要求必须添加接口中的属性</span>
  bar<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>类型断言，可以增加代码的灵活性，再改造一些旧代码时会非常有效。</p><p>但使用类型断言要注意避免滥用，需要对上下文环境有充分的预判，没有任何根据的类型断言，会给我们的代码带来安全隐患。</p><h3 id="_3、总结" tabindex="-1"><a class="header-anchor" href="#_3、总结" aria-hidden="true">#</a> 3、总结</h3><p>TS 的类型推断我们可以为我们提供重要的辅助信息，应该深加利用。</p><p>我们也可以检查下之前写的代码，观察哪里部分可以使用类型推断进行优化。</p><h2 id="二、类型的兼容性" tabindex="-1"><a class="header-anchor" href="#二、类型的兼容性" aria-hidden="true">#</a> 二、类型的兼容性</h2><p>当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y</p><blockquote><p>其中，X 被叫做 <strong>目标类型</strong>，Y 被叫做 <strong>源类型</strong></p></blockquote><p>X 兼容 Y ：X（目标类型）= Y（源类型）</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// X 兼容 Y ：X（目标类型）= Y（源类型）</span>

<span class="token comment">// 定义一个字符串变量 s</span>
<span class="token keyword">let</span> s<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;ibc&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// 当关闭 tsconfig.json 配置文件中为 &quot;strictNullChecks&quot;: false 时</span>
<span class="token comment">// 字符串变量是可以被赋值为 null 的，此时我们可以说字符型是可以兼容 null 类型的</span>
<span class="token comment">// 即：null 是字符型的子类型</span>
s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>之所以，我们要讨论类型兼容性问题，是因为 TS 允许我们把一些类型不同的变量相互赋值。</p><p>虽然在某种程度上讲会产生不可靠的行为，但却增加了语言的灵活性，而类型兼容性的例子会广泛存在于 接口、函数 和 类中。</p><h3 id="_1、接口兼容性" tabindex="-1"><a class="header-anchor" href="#_1、接口兼容性" aria-hidden="true">#</a> 1、接口兼容性</h3><p>下面我们来观察两个接口是如何兼容的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义接口 X ，其中有两个属性</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">X</span></span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义接口 Y ，其中有三个属性</span>
<span class="token keyword">interface</span> <span class="token class-name"><span class="token constant">Y</span></span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  c<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义变量 x 和 y 分别符合以上接口类型</span>
<span class="token keyword">let</span> x<span class="token operator">:</span> <span class="token constant">X</span> <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> y<span class="token operator">:</span> <span class="token constant">Y</span> <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 思考 x 和 y 可以相互赋值吗</span>

<span class="token comment">// x 是可以被赋值给 y</span>
x <span class="token operator">=</span> y<span class="token punctuation">;</span>
<span class="token comment">// y 不能被赋值为 x（会报错）</span>
y <span class="token operator">=</span> x<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>只要 Y 接口具备 X 接口的所有属性（即：a 和 b），即使有 额外的属性 c ，y 仍然可以被认为是 X 类型。即 X 类型可以兼容 Y 类型</p><blockquote><p>这里再次体现了 TS 的类型检查原则，即：鸭式辨型法</p></blockquote><p>“一只鸟，看起来像鸭子，游起来像鸭子，叫起来像鸭子，那么这只鸟就可以被认为是鸭子”。总结：语言类型必须具备目标类型的必要属性，就可以进行赋值。</p><blockquote><p>总结一句口诀：接口之间相互兼容时，成员少的兼容成员多的</p></blockquote><h3 id="_2、函数兼容性" tabindex="-1"><a class="header-anchor" href="#_2、函数兼容性" aria-hidden="true">#</a> 2、函数兼容性</h3><p>函数之间兼容的条件有以下三个</p><ul><li>参数个数</li><li>参数类型</li><li>返回值类型</li></ul><p>需要判断两个函数是不是兼容，通常会发生在两个函数相互赋值的情况下</p><blockquote><p>当函数作为参数时</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 函数兼容性</span>

<span class="token comment">// 定义函数类型 Handler，有两个参数 a 和 b</span>
<span class="token keyword">type</span> <span class="token class-name">Handler</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回</span>
<span class="token keyword">function</span> <span class="token function">hof</span><span class="token punctuation">(</span>handler<span class="token operator">:</span> Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> handler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>当我们给以上高阶函数传入一个参数时，就会判断该参数是否 和 Handler 类型兼容，Handler 为目标类型，传入的参数为 源类型。</p><blockquote><p>如果要目标函数 兼容 源函数，它们需要同时满足三个条件（如下）</p></blockquote><h3 id="_2-1、参数个数" tabindex="-1"><a class="header-anchor" href="#_2-1、参数个数" aria-hidden="true">#</a> 2.1、参数个数</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 函数兼容性</span>

<span class="token comment">// 定义函数类型 Handler，有两个参数 a 和 b</span>
<span class="token keyword">type</span> <span class="token class-name">Handler</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回</span>
<span class="token keyword">function</span> <span class="token function">hof</span><span class="token punctuation">(</span>handler<span class="token operator">:</span> Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> handler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * 当我们给以上高阶函数传入一个参数时，就会判断该参数是否 和 Handler 类型兼容
 * Handler 为目标类型，传入的参数为 源类型
 * 如果要目标函数 兼容 源函数，它们需要同时满足三个条件（如下）
 **/</span>

<span class="token comment">// 1、参数个数（要求目标函数的参数个数一定要多余源函数的参数个数）</span>

<span class="token comment">// 定义一个只有一个参数的函数</span>
<span class="token keyword">let</span> <span class="token function-variable function">handler1</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 将 handler1 作为参数传递给 hof 高阶函数，没问题（因为它只有一个参数）</span>
<span class="token function">hof</span><span class="token punctuation">(</span>handler1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个有 3个 参数的函数</span>
<span class="token keyword">let</span> <span class="token function-variable function">handler2</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 将 handler2 作为参数传递给 hof 高阶函数（会报错，因为它的参数是三个，而目标函数只有两个参数）</span>
<span class="token function">hof</span><span class="token punctuation">(</span>handler2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上情况都是具有固定参数的函数，如果函数中含有可变参数（可选参数）或剩余参数时，会遵循其它的原则</p><p><strong>可选参数 和 剩余参数</strong></p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义函数 a ，为固定参数</span>
<span class="token keyword">let</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token punctuation">(</span>p1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> p2<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 定义函数 b，为可选参数</span>
<span class="token keyword">let</span> <span class="token function-variable function">b</span> <span class="token operator">=</span> <span class="token punctuation">(</span>p1<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> p2<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 定义函数 c，为剩余参数</span>
<span class="token keyword">let</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 原则一：固定参数是可以兼容可选参数 和 剩余参数的</span>
a <span class="token operator">=</span> b<span class="token punctuation">;</span>
a <span class="token operator">=</span> c<span class="token punctuation">;</span>

<span class="token comment">// 原则二：可选参数是不兼容固定参数 和 剩余参数的（通过关闭 tsconfig.json 中 &quot;strictFunctionTypes&quot;: false 选项即可实现兼容）</span>
b <span class="token operator">=</span> c<span class="token punctuation">;</span>
b <span class="token operator">=</span> a<span class="token punctuation">;</span>

<span class="token comment">// 原则三：剩余参数可兼容 固定参数 和 可选参数</span>
c <span class="token operator">=</span> a<span class="token punctuation">;</span>
c <span class="token operator">=</span> b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上是函数之间兼容必须要满足的第一个条件，即参数个数的要求。</p><blockquote><p>函数兼容性的第二个条件，如下</p></blockquote><h3 id="_2-2、参数类型" tabindex="-1"><a class="header-anchor" href="#_2-2、参数类型" aria-hidden="true">#</a> 2.2、参数类型</h3><p>函数兼容性的第二个条件：参数类型，要求必须匹配</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义函数类型 Handler，有两个参数 a 和 b</span>
<span class="token keyword">type</span> <span class="token class-name">Handler</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个高阶函数，该函数以 Handler 类型为参数，并直接返回</span>
<span class="token keyword">function</span> <span class="token function">hof</span><span class="token punctuation">(</span>handler<span class="token operator">:</span> Handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> handler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 参数类型</span>
<span class="token comment">// 定义一个只有一个参数的函数</span>
<span class="token keyword">let</span> <span class="token function-variable function">handler3</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 将 handler3 作为参数传递给 hof 高阶函数（会报错：因为它的类型是不兼容的）</span>
<span class="token function">hof</span><span class="token punctuation">(</span>handler3<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对象类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义接口 Point3D 有3个属性</span>
<span class="token keyword">interface</span> <span class="token class-name">Point3D</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义接口 Point2D 有2个属性</span>
<span class="token keyword">interface</span> <span class="token class-name">Point2D</span> <span class="token punctuation">{</span>
  x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义两个函数 p3d 和 p2d，它们的参数是上边定义的接口类型</span>
<span class="token comment">// 以下函数的 参数个数是相同的，参数的类型都是 对象</span>
<span class="token keyword">let</span> <span class="token function-variable function">p3d</span> <span class="token operator">=</span> <span class="token punctuation">(</span>point<span class="token operator">:</span> Point3D<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token function-variable function">p2d</span> <span class="token operator">=</span> <span class="token punctuation">(</span>point<span class="token operator">:</span> Point2D<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 它们之间的兼容性如何 ？</span>

<span class="token comment">// p3d 兼容 p2d</span>
p3d <span class="token operator">=</span> p2d<span class="token punctuation">;</span>
<span class="token comment">// p2d 不兼容 p3d（观察两个函数的参数，它们都是对象：p3d 中有3个成员，p2d 中有2个成员）</span>
<span class="token comment">// 即：成员个数多的 兼容 成员个数少的（与之前接口之间兼容性的结论正好相反）两个接口之间兼容要求成员少的 兼容 成员多的</span>
<span class="token comment">// 这里正好相反，很容易混淆（可以用另一种方法来看：不要把 Point3D 接口对象看成一个整体的对象，可以拆分成 3个参数，即参数多的兼容参数少的，与之前的结论就一致了）</span>
p2d <span class="token operator">=</span> p3d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一定要 p2d 兼容 p3d 也是可以做到的，将 <code>tsconfig.json</code> 中配置设为 false，这样两个函数就可以兼容了</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;strictFunctionTypes&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上这种函数的参数之间可以相互赋值的情况，叫做 <strong>函数参数双向协变</strong></p><p>它允许我们把一个精确的类型，赋值给一个不那么精确的类型，这样做很方便。我们就不需要把一个不精确的类型断言成一个精确的类型了。</p><h3 id="_2-3、返回值类型" tabindex="-1"><a class="header-anchor" href="#_2-3、返回值类型" aria-hidden="true">#</a> 2.3、返回值类型</h3><p>TS 要求目标返回值类型 必须 与原函数的返回值类型相同 或 为其子类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义函数 f，它的返回值是一个对象，其中有一个字段 username</span>
<span class="token keyword">let</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token operator">:</span> <span class="token string">&quot;ibc&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 定义函数 g，它的返回值有两个字段</span>
<span class="token keyword">let</span> <span class="token function-variable function">g</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token operator">:</span> <span class="token string">&quot;ibc&quot;</span><span class="token punctuation">,</span> location<span class="token operator">:</span> <span class="token string">&quot;Beijing&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// f 就可以兼容 g</span>
f <span class="token operator">=</span> g<span class="token punctuation">;</span>
<span class="token comment">// g 是不兼容 f 的（因为 f 的返回值类型是 g 返回值类型的 子类型）</span>
g <span class="token operator">=</span> f<span class="token punctuation">;</span>

<span class="token comment">// 同样这里也是成员少的会兼容成员多的，与 鸭式辨型法 是一致的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>函数重载</strong></p><p>函数重载分为两个部分</p><ul><li>第一部分：函数重载的列表。如：在列表中定义了两个函数，overload</li><li>第二部分：函数的实现。</li></ul><p>这里，列表中的函数就是 <strong>目标函数</strong>，而具体的实现就是 <strong>原函数</strong>。程序在运行时编译器会查找重载的列表，然后使用第一个匹配的定义来执行下面的函数。</p><blockquote><p>所以，在重载列表中目标函数的参数要多于原函数的参数，而且返回值类型也要符合相应的要求。</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">function</span> <span class="token function">overload</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">overload</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">overload</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 在具体实现时，增加一个参数 c ，这样就是不兼容的（因为实现的参数的个数 多于 目标函数的个数了）</span>
<span class="token keyword">function</span> <span class="token function">overload</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> c<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 去掉返回值，它也是不兼容的（返回值类型不兼容）</span>
<span class="token comment">// function overload(a: any, b: any) {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上是两个函数之间要兼容，所必须要满足的三个条件</p><h3 id="_3、枚举类型兼容性" tabindex="-1"><a class="header-anchor" href="#_3、枚举类型兼容性" aria-hidden="true">#</a> 3、枚举类型兼容性</h3><p>枚举类型 和 数值类型 是可以完全互相兼容的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 枚举兼容性</span>
<span class="token keyword">enum</span> Fruit <span class="token punctuation">{</span>
  Apple<span class="token punctuation">,</span>
  Banana<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Yellow<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 枚举类型 和 数值类型 是可以完全互相兼容的</span>

<span class="token comment">// 定义变量 fruit 它的类型是 一个枚举类型，可以给它赋值任意的数字</span>
<span class="token keyword">let</span> fruit<span class="token operator">:</span> Fruit<span class="token punctuation">.</span>Apple <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">// 定义变量 no 它的类型是 一个数值类型，它可以被赋值给一个枚举类型</span>
<span class="token keyword">let</span> no<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> Fruit<span class="token punctuation">.</span>Apple<span class="token punctuation">;</span>

<span class="token comment">// 因此，我们可以看到枚举 和 数值类型是可以相互兼容的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举 和 number 之间是可以兼容的，枚举之间是不兼容的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 枚举兼容性</span>
<span class="token keyword">enum</span> Fruit <span class="token punctuation">{</span>
  Apple<span class="token punctuation">,</span>
  Banana<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">enum</span> Color <span class="token punctuation">{</span>
  Red<span class="token punctuation">,</span>
  Yellow<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 枚举之间是完全不兼容的（如下：Color 和 Fruit 是完全不兼容的）</span>
<span class="token keyword">let</span> color<span class="token operator">:</span> Color<span class="token punctuation">.</span>Red <span class="token operator">=</span> Fruit<span class="token punctuation">.</span>Apple<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、类的兼容性" tabindex="-1"><a class="header-anchor" href="#_4、类的兼容性" aria-hidden="true">#</a> 4、类的兼容性</h3><p>类的兼容性 与 接口比较相似，它们也是只比较结构</p><p><strong>注意：</strong> 在比较两个类是否兼容时，静态成员 和 构造函数是不参与比较的。如果两个类具备两个相同的实例成员，它们的实例就可以完全相互兼容</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义两个类 A 和 B</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 分别创建了两个实例 aa 和 bb</span>
<span class="token keyword">let</span> aa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> bb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">B</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 这两个实例是完全兼容的，因为它们都具有两个实例 id</span>
<span class="token comment">// 而构造函数 和 静态成员是不作为比较的</span>
aa <span class="token operator">=</span> bb<span class="token punctuation">;</span>
bb <span class="token operator">=</span> aa<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果类 A 和 B 含有私有成员呢 ？</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义两个类 A 和 B</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// 添加一个私有成员</span>
  <span class="token keyword">private</span> username<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// 添加一个私有成员</span>
  <span class="token keyword">private</span> username<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 分别创建了两个实例 aa 和 bb</span>
<span class="token keyword">let</span> aa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> bb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">B</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 以上 A 和 B 类中含有私有成员，这两个类就不兼容了（会报错）</span>
aa <span class="token operator">=</span> bb<span class="token punctuation">;</span>
bb <span class="token operator">=</span> aa<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>如果类中含有私有成员，这两个类就不兼容了</p><blockquote><p>此时，只有父类和子类之间是可以相互兼容的</p></blockquote><p>定义一个 A 的子类</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义两个类 A 和 B</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// 添加一个私有成员</span>
  <span class="token keyword">private</span> username<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  id<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// 添加一个私有成员</span>
  <span class="token keyword">private</span> username<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 分别创建了两个实例 aa 和 bb</span>
<span class="token keyword">let</span> aa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> bb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">B</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// aa = bb</span>
<span class="token comment">// bb = aa</span>

<span class="token comment">// 如果类中含有私有成员，这两个类就不兼容了</span>
<span class="token comment">// 此时，只有父类和子类之间是可以相互兼容的</span>

<span class="token comment">// 定义一个 A 的子类 C</span>
<span class="token keyword">class</span> <span class="token class-name"><span class="token constant">C</span></span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 创建 C 的实例</span>
<span class="token keyword">let</span> cc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">C</span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 父类 和 子类的实例是可以完全相互兼容的</span>
aa <span class="token operator">=</span> cc<span class="token punctuation">;</span>
cc <span class="token operator">=</span> aa<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、泛型的兼容性" tabindex="-1"><a class="header-anchor" href="#_5、泛型的兼容性" aria-hidden="true">#</a> 5、泛型的兼容性</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 泛型兼容性</span>

<span class="token comment">// 定义一个泛型接口 Empty ，该接口没有任何的成员</span>
<span class="token keyword">interface</span> <span class="token class-name">Empty<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 定义 obj1 和 obj2 两个变量，该变量都是 Empty 接口类型（其中传入的参数类型不同）</span>
<span class="token keyword">let</span> obj1<span class="token operator">:</span> Empty<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> obj2<span class="token operator">:</span> Empty<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 这两个变量是相互兼容的，因为 Empty 接口中没有任何的成员</span>
obj1 <span class="token operator">=</span> obj2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给 Empty 泛型接口中，添加成员</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 给泛型接口 Empty 中添加一个成员</span>
<span class="token keyword">interface</span> <span class="token class-name">Empty<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> obj1<span class="token operator">:</span> Empty<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> obj2<span class="token operator">:</span> Empty<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 这是两个变量就不兼容了（会报错）</span>
<span class="token comment">// 也就是说只有类型参数 T 被接口成员使用时，才会影响泛型的兼容性</span>
obj1 <span class="token operator">=</span> obj2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、泛型函数" tabindex="-1"><a class="header-anchor" href="#_6、泛型函数" aria-hidden="true">#</a> 6、泛型函数</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 以下定了两个完全相同的泛型函数</span>
<span class="token keyword">let</span> log1 <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>x<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter"><span class="token constant">T</span></span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;x&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> log2 <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">U</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>y<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter"><span class="token constant">U</span></span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;y&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// log1 和 log2 是完全兼容的</span>
<span class="token comment">// 即：如果两个泛型函数的定义相同，但没有指定类型参数，那么它们之间也是可以相互兼容的</span>
log1 <span class="token operator">=</span> log2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>TS 允许我们在类型兼容的变种之间相互赋值，这个特性增加了语言的灵活性。</p><h3 id="_7、总结" tabindex="-1"><a class="header-anchor" href="#_7、总结" aria-hidden="true">#</a> 7、总结</h3><p>关于类型兼容性的部分学习了很多规则，我们总结了几句比较好记的几条兼容性口诀：</p><p>当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y</p><blockquote><p>其中，X 被叫做 <strong>目标类型</strong>，Y 被叫做 <strong>源类型</strong></p></blockquote><p><strong>口诀：</strong></p><ul><li>结构之间兼容：成员少的兼容成员多的</li><li>函数之间兼容：参数多的兼容参数少的</li></ul><h2 id="三、ts-的类型保护机制" tabindex="-1"><a class="header-anchor" href="#三、ts-的类型保护机制" aria-hidden="true">#</a> 三、TS 的类型保护机制</h2><p>我们先来观察如下代码</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Type <span class="token punctuation">{</span>
  Strong<span class="token punctuation">,</span>
  week<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 Java 类</span>
<span class="token keyword">class</span> <span class="token class-name">Java</span> <span class="token punctuation">{</span>
  <span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 JavaScript 类</span>
<span class="token keyword">class</span> <span class="token class-name">JavaScript</span> <span class="token punctuation">{</span>
  <span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个函数</span>
<span class="token keyword">function</span> <span class="token function">getLanguage</span><span class="token punctuation">(</span>type<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例</span>
  <span class="token keyword">let</span> lang <span class="token operator">=</span> type <span class="token operator">===</span> Type<span class="token punctuation">.</span>Strong <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Java</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">JavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 增加一个功能，即：创建实例后，运行该实例打印的方式</span>
  <span class="token comment">// 以下提示报错（lang 是 Java 和 JavaScript 的联合类型）此时 TS 是不能判断它具体是哪一种类型的</span>
  <span class="token comment">// 需要添加 类型断言，就不会报错了</span>
  <span class="token comment">// if(lang.helloJava){</span>
  <span class="token comment">//     lang.helloJava()</span>
  <span class="token comment">// } else {</span>
  <span class="token comment">//     lang.helloJavaScript()</span>
  <span class="token comment">// }</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>lang <span class="token keyword">as</span> Java<span class="token punctuation">)</span><span class="token punctuation">.</span>helloJava<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>lang <span class="token keyword">as</span> Java<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>lang <span class="token keyword">as</span> JavaScript<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getLanguage</span><span class="token punctuation">(</span>Type<span class="token punctuation">.</span>Strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>由于不知道程序在运行时，到底会传入什么样的参数，所以就必须要在每一处都加上类型断言。显然这不是一种理想的方案，代码的可读性很差</p><blockquote><p>而类型保护机制就是用来解决这个问题的，它可以提前对类型做出预判。</p></blockquote><h3 id="_1、什么是类型保护" tabindex="-1"><a class="header-anchor" href="#_1、什么是类型保护" aria-hidden="true">#</a> 1、什么是类型保护</h3><ul><li>TypeScript 能够在特定的区块中保证变量属于某种确定的类型。</li><li>可以在此区块中放心地引用此类型的属性，或者调用此类型的方法。</li></ul><blockquote><p>接下来我们就来使用 4 种创建特殊区块的方法</p></blockquote><h3 id="_2、instanceof-方法" tabindex="-1"><a class="header-anchor" href="#_2、instanceof-方法" aria-hidden="true">#</a> 2、instanceof 方法</h3><p>该方法类型保护的方法用来判断一个实例是不是属于某个类</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Type <span class="token punctuation">{</span>
  Strong<span class="token punctuation">,</span>
  week<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 Java 类</span>
<span class="token keyword">class</span> <span class="token class-name">Java</span> <span class="token punctuation">{</span>
  <span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 JavaScript 类</span>
<span class="token keyword">class</span> <span class="token class-name">JavaScript</span> <span class="token punctuation">{</span>
  <span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个函数</span>
<span class="token keyword">function</span> <span class="token function">getLanguage</span><span class="token punctuation">(</span>type<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例</span>
  <span class="token keyword">let</span> lang <span class="token operator">=</span> type <span class="token operator">===</span> Type<span class="token punctuation">.</span>Strong <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Java</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">JavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// instanceof 方法用来判断一个实例是不是属于某个类</span>

  <span class="token comment">// 如果 lang 属于 Java 类</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>lang <span class="token keyword">instanceof</span> <span class="token class-name">Java</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TS 就能保证 lang 一定是 Java 类的实例，相应的方法也会自动提示出来</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在 else 区块中，TS 就会判断 lang 对象一定是 JavaScript 的实例，相应的方法也会直接提示出来</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 这样的代码就比之前使用 类型断言简洁多了</span>

  <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getLanguage</span><span class="token punctuation">(</span>Type<span class="token punctuation">.</span>Strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、in-方法" tabindex="-1"><a class="header-anchor" href="#_3、in-方法" aria-hidden="true">#</a> 3、in 方法</h3><p>in 关键字可以判断一个属性是不是属于某个对象</p><blockquote><p>我们在以上代码 Java 和 JavaScript 类中，分别加入属性</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Type <span class="token punctuation">{</span>
  Strong<span class="token punctuation">,</span>
  week<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 Java 类</span>
<span class="token keyword">class</span> <span class="token class-name">Java</span> <span class="token punctuation">{</span>
  <span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  java<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 JavaScript 类</span>
<span class="token keyword">class</span> <span class="token class-name">JavaScript</span> <span class="token punctuation">{</span>
  <span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  javascript<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个函数</span>
<span class="token keyword">function</span> <span class="token function">getLanguage</span><span class="token punctuation">(</span>type<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例</span>
  <span class="token keyword">let</span> lang <span class="token operator">=</span> type <span class="token operator">===</span> Type<span class="token punctuation">.</span>Strong <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Java</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">JavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// in 方法可以判断一个属性是不是属于某个对象</span>

  <span class="token comment">// 通过以上新增的两个属性来创建类型保护区块（if 和 else 两个区块）</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;java&quot;</span> <span class="token keyword">in</span> lang<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在第一个区块中，TS 会判断该对象一定是 Java 类的实例</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在第一个区块中，TS 会判断该对象一定是 JavaScript 类的实例</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">getLanguage</span><span class="token punctuation">(</span>Type<span class="token punctuation">.</span>Strong<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、typeof-方法" tabindex="-1"><a class="header-anchor" href="#_4、typeof-方法" aria-hidden="true">#</a> 4、typeof 方法</h3><p>typeof 方法 ，用来判断一个基本的类型</p><p>给 getLanguage 函数增加一个参数 x 为联合类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Type <span class="token punctuation">{</span>
  Strong<span class="token punctuation">,</span>
  week<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 Java 类</span>
<span class="token keyword">class</span> <span class="token class-name">Java</span> <span class="token punctuation">{</span>
  <span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  java<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 JavaScript 类</span>
<span class="token keyword">class</span> <span class="token class-name">JavaScript</span> <span class="token punctuation">{</span>
  <span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  javascript<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 给函数增加一个参数 x</span>
<span class="token keyword">function</span> <span class="token function">getLanguage</span><span class="token punctuation">(</span>type<span class="token operator">:</span> Type<span class="token punctuation">,</span> x<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例</span>
  <span class="token keyword">let</span> lang <span class="token operator">=</span> type <span class="token operator">===</span> Type<span class="token punctuation">.</span>Strong <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Java</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">JavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// typeof 方法 ，用来判断一个基本的类型</span>

  <span class="token comment">// 用 typeof 来判断 x 的类型</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> x <span class="token operator">===</span> <span class="token string">&quot;string&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该区块中 x 的类型就一定是 string 类型，x 就可以拥有 string的一些属性，如下</span>
    x<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该区块中 x 的类型就一定是 number 类型，x 就拥有了 number 的一些方法</span>
    x<span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// getLanguage(Type.Strong)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、通过创建类型保护函数来判断对象的类型" tabindex="-1"><a class="header-anchor" href="#_5、通过创建类型保护函数来判断对象的类型" aria-hidden="true">#</a> 5、通过创建类型保护函数来判断对象的类型</h3><blockquote><p>该函数需要自定义</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">enum</span> Type <span class="token punctuation">{</span>
  Strong<span class="token punctuation">,</span>
  week<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 Java 类</span>
<span class="token keyword">class</span> <span class="token class-name">Java</span> <span class="token punctuation">{</span>
  <span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  java<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义 JavaScript 类</span>
<span class="token keyword">class</span> <span class="token class-name">JavaScript</span> <span class="token punctuation">{</span>
  <span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Hello JavaScript&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 新增属性</span>
  javascript<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 自定义创建类型保护函数来判断对象的类型</span>

<span class="token comment">// 该函数的返回值是一种特殊的返回值，叫做 &quot;类型谓词&quot;</span>
<span class="token keyword">function</span> <span class="token function">isJava</span><span class="token punctuation">(</span>lang<span class="token operator">:</span> Java <span class="token operator">|</span> JavaScript<span class="token punctuation">)</span><span class="token operator">:</span> lang <span class="token keyword">is</span> Java <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>lang <span class="token keyword">as</span> Java<span class="token punctuation">)</span><span class="token punctuation">.</span>helloJava <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 给函数增加一个参数 x</span>
<span class="token keyword">function</span> <span class="token function">getLanguage</span><span class="token punctuation">(</span>type<span class="token operator">:</span> Type<span class="token punctuation">,</span> x<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断该类型是 强类型 则返回 Java 类的实例，否则 返回 JavaScript 类的实例</span>
  <span class="token keyword">let</span> lang <span class="token operator">=</span> type <span class="token operator">===</span> Type<span class="token punctuation">.</span>Strong <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Java</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">JavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 使用自定义类型保护函数来判断</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isJava</span><span class="token punctuation">(</span>lang<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 该类型保护区块，TS 会判断该对象一定是 Java 类的实例</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJava</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    lang<span class="token punctuation">.</span><span class="token function">helloJavaScript</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> lang<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// getLanguage(Type.Strong)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、总结" tabindex="-1"><a class="header-anchor" href="#_6、总结" aria-hidden="true">#</a> 6、总结</h3><p>我们学习了 TS 的类型保护机制，分别是</p><ul><li>类型推断</li><li>类型兼容性</li><li>类型保护</li></ul><p>利用这些机制，再配合 IDE 的自定补全 和 提示功能，可以极大提高开发效率，可以深加利用。</p><h2 id="四、ts-的高级类型" tabindex="-1"><a class="header-anchor" href="#四、ts-的高级类型" aria-hidden="true">#</a> 四、TS 的高级类型</h2><p>所谓 &quot;高级类型&quot;，即：TS 为了保证语言的灵活性所引入的一些语言特性。这些特性将有助于我们应对复杂多变的开发场景。</p><blockquote><p>我们先来学习 交叉类型 和 联合类型</p></blockquote><h3 id="_1、交叉类型" tabindex="-1"><a class="header-anchor" href="#_1、交叉类型" aria-hidden="true">#</a> 1、交叉类型</h3><p>交叉类型即：将多个类型合并为一个类型（使用 &amp; 符号连接），新的类型将具有所有类型的特性。</p><blockquote><p>因此，交叉类型特别适合对象混入的场景</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 DogInterface 接口 ，具有 run() 方法</span>
<span class="token keyword">interface</span> <span class="token class-name">DogInterface</span> <span class="token punctuation">{</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个 CatInterface 接口，具有 jump() 方法</span>
<span class="token keyword">interface</span> <span class="token class-name">CatInterface</span> <span class="token punctuation">{</span>
  <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义变量 pet 的类型是 以上两个接口的交叉类型（交叉类型用 &amp; 符来链接）</span>
<span class="token keyword">let</span> pet<span class="token operator">:</span> DogInterface <span class="token operator">&amp;</span> CatInterface <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 该变量同时具备以上两个接口的所有方法</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>从名称上看，交叉类型给人感觉是取类型的交集，但实际上是取所有类型的并集。</p><blockquote><p>这里需要注意，不要混淆了。</p></blockquote><h3 id="_2、联合类型" tabindex="-1"><a class="header-anchor" href="#_2、联合类型" aria-hidden="true">#</a> 2、联合类型</h3><p>在前面的学习中，多少接触过一些。这里我们正式明确它的概念</p><p>所谓联合类型：声明的类型并不确定，可以为多个类型中的一个。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 声明变量 a，它的类型是 number 和 string 的联合类型</span>
<span class="token comment">// 它的取值既可以是数字类型 1 也可以是字符串类型 &#39;a&#39;</span>
<span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// let a: number | string = &#39;a&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1、字面量联合类型" tabindex="-1"><a class="header-anchor" href="#_2-1、字面量联合类型" aria-hidden="true">#</a> 2.1、字面量联合类型</h3><p>有时候我们不仅要限定一个变量的类型，而且还需要限定变量的取值在某一个特定的范围内</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个变量 b，它的类型是一个字符串类型的字面量联合类型</span>
<span class="token comment">// 即：b 的取值只能是 &#39;b&#39;，&#39;a&#39;，&#39;c&#39; 中的一种</span>
<span class="token keyword">let</span> b<span class="token operator">:</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;b&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 数字类型的字面量联合类型，它的取值限定为只能是 1，2，3</span>
<span class="token keyword">let</span> c<span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">|</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2、对象的联合类型" tabindex="-1"><a class="header-anchor" href="#_2-2、对象的联合类型" aria-hidden="true">#</a> 2.2、对象的联合类型</h3><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 DogInterface 接口 ，具有 run() 方法</span>
<span class="token keyword">interface</span> <span class="token class-name">DogInterface</span> <span class="token punctuation">{</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个 CatInterface 接口，具有 jump() 方法</span>
<span class="token keyword">interface</span> <span class="token class-name">CatInterface</span> <span class="token punctuation">{</span>
  <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对象的联合类型</span>

<span class="token comment">// 创建 Dog 类型，实现了 DogInterface 接口</span>
<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">implements</span> <span class="token class-name">DogInterface</span> <span class="token punctuation">{</span>
  <span class="token comment">// 实现了 run 和 eat 方法</span>
  <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建 Cat 类型，实现了 CatInterface 接口</span>
<span class="token keyword">class</span> <span class="token class-name">Cat</span> <span class="token keyword">implements</span> <span class="token class-name">CatInterface</span> <span class="token punctuation">{</span>
  <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Master <span class="token punctuation">{</span>
  Boy<span class="token punctuation">,</span>
  Girl<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个函数</span>
<span class="token keyword">function</span> <span class="token function">getPet</span><span class="token punctuation">(</span>master<span class="token operator">:</span> Master<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 判断参数类型，如果是 Boy 即返回 Dog 的实例，否则返回 Cat 的实例</span>
  <span class="token keyword">let</span> pet <span class="token operator">=</span> master <span class="token operator">===</span> Master<span class="token punctuation">.</span>Boy <span class="token operator">?</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Cat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 调用实例的方式，首先看下 pet 的类型被推断为 Dog 和 Cat 的联合类型</span>
  <span class="token comment">// 如果一个对象是联合类型，在类型未确定的情况下，它就只能访问所有类型的共有成员，Dog 和 Cat的共有成员 就是 eat 方法</span>
  <span class="token comment">// 如果想要访问其中的 run 方法，是不能访问的，同样 jump 也不能访问</span>
  pet<span class="token punctuation">.</span><span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> pet<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>以上代码中，有趣的事情再次发生了，从名称上看联合类型给人的感觉是 取所有类型的并集，而实际上在对象的联合类型情况下，却只能访问所有类成员的交集。</p><blockquote><p>接下来了解一种模式，该模式叫做：可区分的联合类型</p></blockquote><h3 id="_2-3、可区分的联合类型" tabindex="-1"><a class="header-anchor" href="#_2-3、可区分的联合类型" aria-hidden="true">#</a> 2.3、可区分的联合类型</h3><p>可区分的联合类型该模式本质上是结合了<strong>联合类型</strong> 和 <strong>字面量类型</strong>的一种 <strong>类型保护方法</strong></p><p>它的核心思想是：一个类型如果是多个类型的联合类型 并且 每个类型之间有一个公共的属性，那么我们就可以凭借这个公共属性创建不同的类型保护区块。</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 声明两个接口 Square 和 Rectangle，它们有一个共同的属性 kind 用来表示它们的类型</span>

<span class="token comment">// 声明接口 Square</span>
<span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;square&quot;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 声明接口 Rectangle</span>
<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;rectangle&quot;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用类型别名声明了一种 Square 和 Rectangle 的联合类型 Shape</span>
<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle<span class="token punctuation">;</span>

<span class="token comment">// area 函数，用来计算不同类型的面积</span>
<span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 通过两个接口共用的属性 kind，就可以创建不同的类型保护区块</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;square&quot;</span><span class="token operator">:</span>
      <span class="token comment">// 该区块在可访问 Square 的属性</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;rectangle&quot;</span><span class="token operator">:</span>
      <span class="token comment">// 该区块在可访问 Rectangle 的属性</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>height <span class="token operator">*</span> s<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>该模式的核心：即利用两种类型的共有属性来创建不同的类型保护区块</p><blockquote><p>以上代码不升级是么有问题的，但如果我们想加一种新的 Shape 就有可能存在一种新的隐患</p></blockquote><p>如果我们给以上代码添加一种新的 Shape（形状）类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;square&quot;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;rectangle&quot;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 添加一种新的 Shape（形状）类型</span>
<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 半径</span>
  r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在联合类型中添加 Circle 类型</span>
<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle <span class="token operator">|</span> Circle<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;square&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;rectangle&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>height <span class="token operator">*</span> s<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打印面积</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">,</span> r<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p><code>ts-node 文件名</code> 命令行运行以上代码，打印结果为 undefined ，如何运用 TS 来约束这种模式了（即：给出对应的错误提示）。</p><blockquote><p>有两种方法，如下</p></blockquote><p><strong>方法一：</strong> 为 area 函数指定明确的返回值类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;square&quot;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;rectangle&quot;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">;</span>
  r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle <span class="token operator">|</span> Circle<span class="token punctuation">;</span>

<span class="token comment">// 为 area 函数指定明确的返回值类型</span>
<span class="token comment">// 如果指定为 number 类型（number处会报错），此时 TS 就会判断 所有的 switch 分支是不是包含了所有的情况</span>
<span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;square&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;rectangle&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>height <span class="token operator">*</span> s<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">,</span> r<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230725180216441.905c3337.png" alt="image-20230725180216441"></p><p><strong>方法二：</strong> 利用 never 类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;square&quot;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;rectangle&quot;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">;</span>
  r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle <span class="token operator">|</span> Circle<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;square&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&quot;rectangle&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>height <span class="token operator">*</span> s<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
    <span class="token comment">// 补上 circle 分支</span>
    <span class="token keyword">case</span> <span class="token string">&quot;circle&quot;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> s<span class="token punctuation">.</span>r <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token comment">// 函数的参数是 area 的参数 s，此时 s 处会报错</span>
      <span class="token comment">// 该函数的作用是 检查 s 是不是 never 类型，如果 s 是 never 类型就说明前面的所有分支都被覆盖了，以下分支永远不会走到</span>
      <span class="token comment">// 如果 s 不是 never 类型，说明前面的分支有遗漏，那么再补上分支</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打印面积（可正常输出了）</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">area</span><span class="token punctuation">(</span><span class="token punctuation">{</span> kind<span class="token operator">:</span> <span class="token string">&quot;circle&quot;</span><span class="token punctuation">,</span> r<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3.141592653589793</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、总结-1" tabindex="-1"><a class="header-anchor" href="#_3、总结-1" aria-hidden="true">#</a> 3、总结</h3><p>我们以上学习了 TS 的高级类型交叉类型 和 联合类型</p><ul><li>交叉类型比较适合做对象的混入</li><li>联合类型可以使类型具有一定的不确定性，可以增强代码的灵活性</li></ul><h3 id="_4、索引类型" tabindex="-1"><a class="header-anchor" href="#_4、索引类型" aria-hidden="true">#</a> 4、索引类型</h3><p>在 JS 中我们经常会遇到以下的场景：从对象中获取一些属性的值，然后建立一个集合</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 需求：我们想抽取它的一些值，形成一个数组</span>

<span class="token comment">/**
 * 实现一个函数
 * @param obj 对象
 * @param keys 字符串数组
 * @returns 数组
 */</span>
<span class="token keyword">function</span> <span class="token function">getValues</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> keys<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 遍历 keys 数组，调用它的 map 方法</span>
  <span class="token keyword">return</span> keys<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 先抽取它的属性 a 和 b</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getValues</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 1, 2 ]</span>
<span class="token comment">// 再抽取 obj 中没有的属性 e 和 f</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getValues</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ undefined, undefined ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>在以上抽取 obj 中没有的属性 e 和 f 时，TS 编译器并没有报错。如何使用 TS 对这种模式进行类型约束呢 ？ 这里就会用到索引类型</p><blockquote><p>要使用索引类型，得先了解索引类型的查询操作符</p></blockquote><h3 id="_4-1、索引类型的查询操作符-keyof-t" tabindex="-1"><a class="header-anchor" href="#_4-1、索引类型的查询操作符-keyof-t" aria-hidden="true">#</a> 4.1、索引类型的查询操作符 - keyof T</h3><p><code>keyof T</code> 表示类型 T 的所有公共属性的字面量的联合类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// keyof T</span>

<span class="token comment">// 定义一个接口，有属性 a 和 b</span>
<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义一个变量，它的类型为 keyof Obj</span>
<span class="token comment">// key 的类型就变成了 a 和 b 的联合类型 let key: &quot;a&quot; | &quot;b&quot;</span>
<span class="token keyword">let</span> key<span class="token operator">:</span> <span class="token keyword">keyof</span> Obj<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、索引访问操作符" tabindex="-1"><a class="header-anchor" href="#_4-2、索引访问操作符" aria-hidden="true">#</a> 4.2、索引访问操作符</h3><p>索引访问操作符的语法：<code>T[K]</code> ，它的含义表示对象 T 的属性 K 所代表的类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// T[K]（索引访问操作符）它的含义表示对象 T 的属性 K 所代表的类型</span>

<span class="token comment">// 定义一个变量 value，它的类型就是一个索引访问操作符</span>
<span class="token comment">// 这里指定 Obj 属性 a 所代表的类型，即：value 的类型就是 number</span>
<span class="token keyword">let</span> value<span class="token operator">:</span> Obj<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3、泛型约束" tabindex="-1"><a class="header-anchor" href="#_4-3、泛型约束" aria-hidden="true">#</a> 4.3、泛型约束</h3><p><code>T extends U</code> 表示泛型变量可以通过继承某个类型获得某些属性</p><p>清楚了 索引类型的查询操作符 <code>keyof T</code>，索引访问操作符 <code>T[K]</code> ，泛型约束<code>T extends U</code> 这三个概念，我们就来改造以上的 <code>getValues()</code> 函数</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  b<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  c<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 改造前</span>
<span class="token comment">// function getValues(obj: any, keys: string[]){</span>
<span class="token comment">//    return keys.map(key =&gt; obj[key])</span>
<span class="token comment">//}</span>

<span class="token comment">// 改造成泛型函数，需要做一些约束</span>
<span class="token comment">// kyes 其中的元素一定是 obj 的属性</span>
<span class="token comment">// 先给 getValues 定义一个泛型变量 T，用它来约束 obj</span>
<span class="token comment">// 然后，再给 getValues 定义一个泛型变量 K，用它来约束 keys 数组</span>
<span class="token comment">// 将 getValues&lt;T, K&gt; 其中的 K 增加类型约束，让它来继承 obj 所有属性的联合类型</span>
<span class="token comment">// 函数的返回值首先它是一个数组，数组的元素的类型就是属性 K 对应的类型</span>
<span class="token comment">// 这样我们就通过一个索引类型把一个 getValues 函数改造完毕了，这是 TS 的类型检查就发挥作用了</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getValues</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> keys<span class="token operator">:</span> <span class="token constant">K</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> keys<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getValues</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 1, 2 ]</span>
<span class="token comment">// 如果指定了一个不在 obj 里的属性，编译器就会报错，由此可以看到索引类型可以实现对对象属性的查询和访问，然后在配合泛型约束就能够使我们建立对象、对象属性 以及 属性值之间的约束关系</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getValues</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&quot;e&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;f&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230727210136485.bf745baa.png" alt="image-20230727210136485"></p><h3 id="_5、映射类型" tabindex="-1"><a class="header-anchor" href="#_5、映射类型" aria-hidden="true">#</a> 5、映射类型</h3><p>通过映射类型我们可以从一个旧的类型生成一个新的类型</p><h3 id="_5-1、readonly-只读-映射类型" tabindex="-1"><a class="header-anchor" href="#_5-1、readonly-只读-映射类型" aria-hidden="true">#</a> 5.1、Readonly 只读 - 映射类型</h3><p>比如：把一个类型中的所有属性变为只读</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 Obj 接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  c<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 需求：将接口的所有属性变为 只读</span>

<span class="token comment">// 定义一个类型别名</span>
<span class="token comment">// 该类型别名是 TS 一个内置的泛型接口，接口的名称是 Readonly</span>
<span class="token comment">// 该接口传入的类型是我们指定的 Obj，当鼠标划在 ReadonlyObj 上可以看到</span>
<span class="token comment">// 这样新生成的类型 和 旧的类型，可以看到它们的成员是完全相同的，且每一个成员的属性都变成了只读</span>
<span class="token keyword">type</span> <span class="token class-name">ReadonlyObj</span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span>Obj<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230727212156577.69d93f85.png" alt="image-20230727212156577"></p><p>它是如何实现的呢 ？按住 Ctrl 键，点击 Readonly 查看 TS 源码的实现方法，直接跳转至 TS 内置的类库中，该类库的位置在 <code>\\node_modules\\typescript\\lib</code> 目录下，这里预定义了很多 TS 内置的类库。</p><p><img src="https://www.arryblog.com/assets/img/image-20230727213216431.bec03049.png" alt="image-20230727213216431"></p><p>注：</p><p>观察 Readonly 的实现</p><ul><li>Readonly 是一个泛型接口，而且是一个可索引类型的泛型接口</li><li>它的索引签名是 <code>P in keyof T</code> 其中 <code>keyof T</code> 是一个索引类型的查询操作符，它表示类型 T 所有属性的联合类型</li><li><code>P in</code> 相当于执行了一次 <code>for in</code> 操作，它会把变量 P 依次的绑定到 T 的所有的属性上</li><li>索引签名的返回值就是一个索引访问操作符了，即 <code>T[P]</code> ，这里代表属性 P 所指定的类型</li><li>最后再加上 <strong>readonly</strong> 就把所有的属性变成了只读</li></ul><blockquote><p>以上就是 Readonly 的实现原理了，TS 还预置了很多的 映射类型</p></blockquote><h3 id="_5-2、partial-可选-映射类型" tabindex="-1"><a class="header-anchor" href="#_5-2、partial-可选-映射类型" aria-hidden="true">#</a> 5.2、Partial 可选 - 映射类型</h3><p>把一个接口的所有属性变为可选的</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 Obj 接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  c<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 需求：把一个接口的所有属性变为可选的</span>

<span class="token comment">// 给类型别名 PartialObj 指定一个 TS 内置的映射类型叫 Partial，参数为 Obj</span>
<span class="token comment">// 鼠标划在 PartialObj 上可以看到新的类型已经把所有属性 变成了可选</span>
<span class="token keyword">type</span> <span class="token class-name">PartialObj</span> <span class="token operator">=</span> Partial<span class="token operator">&lt;</span>Obj<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230727215247256.48b7c060.png" alt="image-20230727215247256"></p><p>注：</p><p>我们可以看到新的类型已经把所有的属性变成了可选，按住 Ctrl 键，点击 Partial 查看 TS 源码的实现方法</p><p>与以上只读的实现几乎是一致的，只不过把属性变成了可选</p><p><img src="https://www.arryblog.com/assets/img/image-20230727215652014.b6006881.png" alt="image-20230727215652014"></p><h3 id="_5-3、pick-挑选-映射类型" tabindex="-1"><a class="header-anchor" href="#_5-3、pick-挑选-映射类型" aria-hidden="true">#</a> 5.3、Pick 挑选- 映射类型</h3><p>Pick 映射类型可以抽取 Obj 的一些子集</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 Obj 接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  c<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽取 Obj 的一些子集</span>

<span class="token comment">// Pick 接收两个参数：第一个是 Obj，第二是我们要抽取的一些属性的 key ，我们指定为 a 和 b</span>
<span class="token keyword">type</span> <span class="token class-name">PickObj</span> <span class="token operator">=</span> Pick<span class="token operator">&lt;</span>Obj<span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;b&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上 a 和 b 就会被单独的抽取出来，形成一个新的类型</p><p><img src="https://www.arryblog.com/assets/img/image-20230727221622080.99b3a91e.png" alt="image-20230727221622080"></p><blockquote><p>按住 Ctrl 键，点击 Pick 查看 TS 源码的实现方法 和 原理</p></blockquote><p><img src="https://www.arryblog.com/assets/img/image-20230727222055048.47ee444c.png" alt="image-20230727222055048"></p><p>注：</p><ul><li>Pick 有两个参数，第一个参数是 T ，它代表我们要抽取的一个对象</li><li>第二个参数是 K，它有一个约束即：K 一定要来自 T 所有属性字面量的联合类型，新的类型的属性一定要从 K 中选取</li></ul><blockquote><p>以上 Readonly、Partial、Pick 三种类型官方将它们称为 <strong>同态</strong>，即：它们只会作用为 Obj 属性，而不会引入新的属性。</p></blockquote><h3 id="_5-4、record-映射类型" tabindex="-1"><a class="header-anchor" href="#_5-4、record-映射类型" aria-hidden="true">#</a> 5.4、Record - 映射类型</h3><p>Record 会创建新的属性</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个 Obj 接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Obj</span> <span class="token punctuation">{</span>
  a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  c<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Record  会创建新的属性</span>
<span class="token comment">// Record 接收两个参数，第一参数是 预定义的新的属性 x 和 y ，该属性不来自 Obj</span>
<span class="token comment">// 第二个参数是 一个已知的类型</span>
<span class="token keyword">type</span> <span class="token class-name">RecordObj</span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token string">&quot;x&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">,</span> Obj<span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://www.arryblog.com/assets/img/image-20230727223444058.5fb18ee4.png" alt="image-20230727223444058"></p><p>注：</p><p>鼠标划在 RecordObj 上可以看到，新的类型会有一些属性，这些属性有 Record 的第一参数所指定，这些属性的类型就是一个 已知的类型。</p><blockquote><p>这种类型就是一个 <strong>非同态的类型</strong> ，映射类型本质上一种预先定义的泛型接口，通常还会结合索引类型获取对象的属性 和 属性值，从而将一个对象映射成我们想要的结构。</p></blockquote><h3 id="_5-5、总结" tabindex="-1"><a class="header-anchor" href="#_5-5、总结" aria-hidden="true">#</a> 5.5、总结</h3><p>以上我们学习 TS 的映射类型，TS 预设了很多的映射类型，我们感兴趣可以去它的类库中来学习</p><h3 id="_6、条件类型" tabindex="-1"><a class="header-anchor" href="#_6、条件类型" aria-hidden="true">#</a> 6、条件类型</h3><p>条件类型是一种由条件表达式所决定的类型</p><blockquote><p>条件表达式的语法</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token constant">X</span> <span class="token operator">:</span> <span class="token constant">Y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>具体含义：</strong></p><p>如果类型 T 可以被赋值给 类型 U ，结果类型为 X 类型，否则就是 Y 类型</p><blockquote><p>条件类型使类型具有了不唯一性，同样也增加了语言的灵活性</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 条件表达式的语法 T extends U ? X : Y</span>

<span class="token comment">// 定义一个类型别名 TypeName，它是一种条件类型</span>
<span class="token comment">// 而且是一种条件类型的嵌套，它会依次判断 T 的类型，然后返回不同的字符串</span>
<span class="token keyword">type</span> <span class="token class-name">TypeName<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">string</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;string&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">number</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;number&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">boolean</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;boolean&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">undefined</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;undefined&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Function</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;function&quot;</span>
  <span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个类型 T1，它是条件类型传入一个参数 string</span>
<span class="token comment">// T1 的类型（鼠标划上去可看出）根据上面的逻辑，它就是一个字面量类型 string</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T1</span></span> <span class="token operator">=</span> TypeName<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token comment">// T2 的类型是一个字面量类型，值是 Object</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T2</span></span> <span class="token operator">=</span> TypeName<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-1、分布式条件类型" tabindex="-1"><a class="header-anchor" href="#_6-1、分布式条件类型" aria-hidden="true">#</a> 6.1、分布式条件类型</h3><p>分布式条件类型的含义：如果 <code>T extends U ? X : Y</code> 中类型 T 是一个联合类型的情况下，如：</p><p><code>(A | B) extends U ? X : Y</code> ，即：T 是一个类型 A 和 类型 B 的联合类型，这时的结果类型会变成多个条件类型的联合类型，它可以进行如下拆解</p><blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(A extends U ? X : Y) | (B extends U ? X : Y)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">TypeName<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">string</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;string&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">number</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;number&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">boolean</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;boolean&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token keyword">undefined</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;undefined&quot;</span>
  <span class="token operator">:</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">Function</span></span>
  <span class="token operator">?</span> <span class="token string">&quot;function&quot;</span>
  <span class="token operator">:</span> <span class="token string">&quot;object&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个类型 T3 ，它的类型为 分布式的条件类型</span>
<span class="token comment">// 此时，T3 的类型就会被推断为 string 和 object 的字面量联合类型</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T3</span></span> <span class="token operator">=</span> TypeName<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用这个特性，可以帮助我们去实现一些类型的过滤</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个新的类型 Diff ，它又两个参数 一个是 T，一个是 U</span>
<span class="token comment">// 具体实现：如果 T 可以被赋值给 U，结果类型就是 never 类型，否则就是 T 类型</span>
<span class="token keyword">type</span> <span class="token class-name">Diff<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个类型 T4</span>
<span class="token comment">// Diff 的第一个参数传入abc的联合类型 &quot;a&quot; | &quot;b&quot; | &quot;c&quot; ，第二个参数 &quot;a&quot; | &quot;e&quot;</span>
<span class="token comment">// T4 的类型就变成了 b 和 c 的联合类型，其中就过滤掉了第二个参数中已经含有的类型 a</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T4</span></span> <span class="token operator">=</span> Diff<span class="token operator">&lt;</span><span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;b&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;e&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们按照上边的拆解逻辑详细的解释</p><blockquote><p>Diff 会被拆解为如下的样子</p></blockquote><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// Diff 会被拆解为多个条件类型的联合类型</span>
<span class="token comment">// Diff&lt;&quot;a&quot;, &quot;a&quot; | &quot;e&quot;&gt; | Diff&lt;&quot;b&quot;, &quot;a&quot; | &quot;e&quot;&gt; | Diff&lt;&quot;c&quot;, &quot;a&quot; | &quot;e&quot;&gt;</span>

<span class="token comment">// 判断 a 是不是可以被赋值给 字面量联合类型（&quot;a&quot; | &quot;e&quot;），答案是可以的，所以它就会返回为 never</span>
<span class="token comment">// b 和 c 是不可以被赋值给字面量联合类型（&quot;a&quot; | &quot;e&quot;） 因此，依然返回 b 和 c</span>

<span class="token comment">// 因此，最终返回如下</span>

<span class="token comment">// never | &quot;b&quot; | &quot;c&quot;</span>

<span class="token comment">// 最后，never 和 b，c 的联合类型就是 &quot;b&quot; | &quot;c&quot;</span>

<span class="token comment">// 通过分析，我们就可以看出 Diff 的作用即可从类型 T 中过滤掉可以赋值给类型 U 的类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还可以基于 <code>Diff</code> 类型再做扩展，从类型中除去一些我们不需要的类型。如：<code>undefined</code> 和 <code>null</code></p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token keyword">type</span> <span class="token class-name">Diff<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token constant">U</span></span> <span class="token operator">?</span> <span class="token builtin">never</span> <span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个类型 NotNull，接收一个参数 T</span>
<span class="token comment">// 然后，利用 Diff 从 T 中过滤掉 undefined 和 null</span>
<span class="token keyword">type</span> <span class="token class-name">NotNull<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> Diff<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// 定义一个 T5，NotNull 中传入一个联合类型</span>
<span class="token comment">// 通过 NotNull 类型就可以过滤掉 undefined 和 null，T5 的类型就变为了 string 和 number（鼠标划上 T5 就能看到）</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T5</span></span> <span class="token operator">=</span> NotNull<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：</p><p>实际上，我们上边实现了两个类型，官方已经为我们实现了，即：一些内置的类型</p><ul><li>Diff 的内置类型是 <code>Exclude&lt;T, U&gt;</code>，从类型 T 中过滤掉可以赋值给类型 U 的类型，它的实现和我们上边的实现是一致的</li><li>NotNull 的内置类型是 <code>NonNullable&lt;T&gt;</code></li></ul><blockquote><p>在实际使用时，直接调用 <code>Exclude&lt;T, U&gt;</code> 和 <code>NonNullable&lt;T&gt;</code> 这两个内置的类型即可</p></blockquote><p>此外，官方还预制了一些条件类型，如：<code>Extract&lt;T, U&gt;</code> ，该类型与 <code>Exclude&lt;T, U&gt;</code> 相反</p><ul><li><code>Extract&lt;T, U&gt;</code> 可以从类型 T 中抽取出可以赋值给 U 的类型</li></ul><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// Extract 中有两个参数，第一个是 &quot;a&quot; | &quot;b&quot; | &quot;c&quot;，第二个参数是 &quot;a&quot; | &quot;e&quot;</span>
<span class="token comment">// 这样 T6 的类型就会变成 a，因为它抽取了在 U 中含有的类型 a</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T6</span></span> <span class="token operator">=</span> Extract<span class="token operator">&lt;</span><span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;b&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">|</span> <span class="token string">&quot;e&quot;</span>
                 <span class="token comment">// &gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2、returntype" tabindex="-1"><a class="header-anchor" href="#_6-2、returntype" aria-hidden="true">#</a> 6.2、ReturnType</h3><p><code>ReturnType&lt;T&gt;</code> 可以获取函数返回值的类型</p><div class="language-tsx line-numbers-mode" data-ext="tsx"><pre class="language-tsx"><code><span class="token comment">// 定义一个类型 T7，ReturnType 的参数是一个函数，返回 string</span>
<span class="token comment">// 此时 T7 的类型就是 string（鼠标划上去即可看到）</span>
<span class="token keyword">type</span> <span class="token class-name"><span class="token constant">T7</span></span> <span class="token operator">=</span> ReturnType<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按住 Ctrl 键，点击 ReturnType 查看 TS 源码的实现方法</p><p><img src="https://www.arryblog.com/assets/img/image-20230729202033173.527dd988.png" alt="image-20230729202033173"></p><p>源码实现解读</p><ul><li>ReturnType 要求参数 T 可以被赋值为一个函数，这个函数可以有任意的参数</li><li>返回值类型也是任意的（any）</li><li>由于返回值类型是不确定的，因此使用了一个 infer 关键字（它的作用表示待推断 或 延迟推断）需要根据实际的情况来确定</li><li>如果实际的情况是返回 R 结果类型就是 R ，否则返回值类型就是 any</li></ul><blockquote><p>以上就是 ReturnType 的实现原理 和 作用。当然 TS 的条件类型还有很多，感兴趣还可以通过 TS 的官方类库查阅 和 学习。</p></blockquote><h2 id="五、ts-核心基础知识总结" tabindex="-1"><a class="header-anchor" href="#五、ts-核心基础知识总结" aria-hidden="true">#</a> 五、TS 核心基础知识总结</h2><p>总结 TS 核心基础部分所学到的所有知识点</p><h3 id="_1、类型基础" tabindex="-1"><a class="header-anchor" href="#_1、类型基础" aria-hidden="true">#</a> 1、类型基础</h3><table><thead><tr><th style="text-align:left;">语言类型</th><th style="text-align:left;">描述</th><th style="text-align:left;">举例</th></tr></thead><tbody><tr><td style="text-align:left;">强类型语言</td><td style="text-align:left;">不能改变变量的数据类型，除非进行强制类型转换</td><td style="text-align:left;">Java、C#、Python、C/C++</td></tr><tr><td style="text-align:left;">弱类型语言</td><td style="text-align:left;">能够改变变量的数据类型</td><td style="text-align:left;">JavaScript、PHP</td></tr><tr><td style="text-align:left;">静态类型语言</td><td style="text-align:left;">在编译阶段确定变量的类型</td><td style="text-align:left;">Java、C#、C/C++</td></tr><tr><td style="text-align:left;">动态类型语言</td><td style="text-align:left;">在执行阶段确定变量的类型</td><td style="text-align:left;">JavaScript、PHP、Python</td></tr></tbody></table><h3 id="_2、基本类型" tabindex="-1"><a class="header-anchor" href="#_2、基本类型" aria-hidden="true">#</a> 2、基本类型</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">描述</th><th style="text-align:left;"></th></tr></thead><tbody><tr><td style="text-align:left;">number</td><td style="text-align:left;">数字</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">string</td><td style="text-align:left;">字符串</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">boolean</td><td style="text-align:left;">布尔</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">Array</td><td style="text-align:left;">数组，<code>type[]</code> 、<code>Array&lt;type&gt;</code></td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">Tuple</td><td style="text-align:left;">元组，限定元素个数与类型的数组</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">function</td><td style="text-align:left;">函数</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">object</td><td style="text-align:left;">对象</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">symbol</td><td style="text-align:left;">符号，独一无二的值</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">void</td><td style="text-align:left;">没有类型</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">any</td><td style="text-align:left;">任意类型</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">undefined</td><td style="text-align:left;">未定义</td><td style="text-align:left;">任意类型的子类型</td></tr><tr><td style="text-align:left;">null</td><td style="text-align:left;">没有值</td><td style="text-align:left;">任意类型的子类型</td></tr><tr><td style="text-align:left;">never</td><td style="text-align:left;">永远不存在的值（抛异常、死循环）</td><td style="text-align:left;">任意类型的子类型</td></tr></tbody></table><h3 id="_3、枚举类型" tabindex="-1"><a class="header-anchor" href="#_3、枚举类型" aria-hidden="true">#</a> 3、枚举类型</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">数字枚举</td><td style="text-align:left;">枚举成员值默认从 0 递增</td></tr><tr><td style="text-align:left;">字符串枚举</td><td style="text-align:left;">不支持反向映射</td></tr><tr><td style="text-align:left;">异构枚举</td><td style="text-align:left;">数字枚举 和 字符串枚举 混用，就构成了 异构枚举 （这种情况容易引起混淆。因此不建议使用）</td></tr><tr><td style="text-align:left;">枚举成员</td><td style="text-align:left;">拥有只读属性 ①、<code>const member</code>（在编译阶段被计算出结果），无初始值、对常量成员的引用、常量表达式 ②、<code>computed member</code>（表达式保留到程序的执行阶段），非常量表达式</td></tr><tr><td style="text-align:left;">常量枚举</td><td style="text-align:left;">编译后被移除 成员只能为 <code>const member</code></td></tr><tr><td style="text-align:left;">枚举 / 枚举成员作为类型</td><td style="text-align:left;">①、无初始值 ②、枚举成员均为数字 ③、枚举成员均为字符串</td></tr></tbody></table><h3 id="_4、接口" tabindex="-1"><a class="header-anchor" href="#_4、接口" aria-hidden="true">#</a> 4、接口</h3><table><thead><tr><th style="text-align:left;">接口类型</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">对象类型接口</td><td style="text-align:left;">检查原则：鸭式辨型法 绕过对象字面量检查（将对象字面量赋值给变量、使用类型断言、使用字符串索引签名） 对象的属性（可选属性、只读属性）</td></tr><tr><td style="text-align:left;">可索引类型接口</td><td style="text-align:left;">数字索引（相当于数组）<code>[index: number]</code> 字符串索引 <code>[x: string]</code> 以上两种混用时，数字索引签名的返回值必须是字符串索引签名返回值的子类型</td></tr><tr><td style="text-align:left;">函数类型接口</td><td style="text-align:left;">interface A { (arg: type): type }</td></tr><tr><td style="text-align:left;">混合类型接口</td><td style="text-align:left;">interface B { (arg: type): type; prop: type; method(arg: type): type; }</td></tr><tr><td style="text-align:left;">类类型接口</td><td style="text-align:left;">类必须实现接口中的所有属性 接口只能约束类的公有成员，不能约束私有成员、受保护成员、静态成员和构造函数</td></tr><tr><td style="text-align:left;">接口继承接口</td><td style="text-align:left;">抽离可重用的接口 将多个接口整合成一个接口</td></tr><tr><td style="text-align:left;">接口继承类</td><td style="text-align:left;">抽象出类的公有成员、私有成员和受保护成员</td></tr></tbody></table><h3 id="_5、函数" tabindex="-1"><a class="header-anchor" href="#_5、函数" aria-hidden="true">#</a> 5、函数</h3><table><thead><tr><th style="text-align:left;">分类</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">定义函数</td><td style="text-align:left;">定义方式（function、变量定义、类型别名、接口定义）注：定义函数类型，无函数体 类型要求：参数类型必须声明，返回值类型 ─ 般无需声明</td></tr><tr><td style="text-align:left;">函数参数</td><td style="text-align:left;">①、参数个数：实参和形参必须 — — 对应 ②、可选参数：必选参数不能位于可选参数后 ③、默认参数：在必选参数前，默认参数不可省略；在必选参数后，默认参数可以省略 ④、剩余参数</td></tr><tr><td style="text-align:left;">函数重载</td><td style="text-align:left;">静态类型语言：函数的名称相同，参数的个数或类型不同 TypeScript：预先定义一组名称相同，类型不同的函数声明，并在一个类型最宽松的版本中实现</td></tr></tbody></table><h3 id="_6、类" tabindex="-1"><a class="header-anchor" href="#_6、类" aria-hidden="true">#</a> 6、类</h3><table><thead><tr><th style="text-align:left;">选项</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">基本实现</td><td style="text-align:left;">①、类中定义的属性都是实例属性，类中定义的方法都是原型方法 ②、实例属性必须有初始值，或在构造函数中被赋值，或为可选成员</td></tr><tr><td style="text-align:left;">继承</td><td style="text-align:left;">子类的构造函数中必须包含 super 调用</td></tr><tr><td style="text-align:left;">成员修饰符</td><td style="text-align:left;">①、public：对所有人可见，所有成员默认为 public ②、private：只能在被定义的类中访问，不能通过实例或子类访问（<code>private constructor</code>：不能被实例化，不能被继承） ③、protected：只能在被定义的类和子类中访问，不能通过实例访问（<code>protected constructor</code>：只能被实例化，不能被继承） ④、readonly：必须有初始值，或在构造函数中被赋值 ⑤、static：只能由类名调用，不能通过实例访问，可继承</td></tr><tr><td style="text-align:left;">构造函数参数中的修饰符</td><td style="text-align:left;">将参数变为实例属性</td></tr><tr><td style="text-align:left;">抽象类</td><td style="text-align:left;"><strong>不能被实例化，只能被继承</strong> ①、抽象方法包含具体实现：子类直接复用 ②、抽象方法不包含具体实现：子类必须实现 <strong>多态：</strong> 多个子类对父抽象类的方法有不同实现，实现运行时绑定</td></tr><tr><td style="text-align:left;">this 类型</td><td style="text-align:left;">实现实例方法的链式调用 在继承时，具有多态性，保持父子类之间接口调用的连贯性</td></tr></tbody></table><h3 id="_7、泛型" tabindex="-1"><a class="header-anchor" href="#_7、泛型" aria-hidden="true">#</a> 7、泛型</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">支持多种类型的方法</td><td style="text-align:left;">①、函数重载 ②、联合类型 ③、any 类型：丢失类型约束 ④、泛型：不预先确定的类型，使用时才确定</td></tr><tr><td style="text-align:left;">泛型函数</td><td style="text-align:left;">定义：<code>function generic&lt;T&gt;(arg: T): T</code> 调用：<code>generic&lt;type&gt;(arg)</code> 、<code>generic(arg)</code> 泛型函数类型：<code>type Generic = &lt;T&gt;(arg: T) =&gt; T</code></td></tr><tr><td style="text-align:left;">泛型接口</td><td style="text-align:left;">定义： <code>interface Generic&lt;T&gt;</code> { <code>(arg: T): T</code> } 实现：<code>let generic: Generic&lt;type&gt;</code>（必须指定类型）</td></tr><tr><td style="text-align:left;">泛型类</td><td style="text-align:left;">定义： <code>class Generic&lt;T&gt;</code>{ <code>method(value: T)</code> } 泛型不能应用于类的静态成员 实例化： <code>let generic = new Generic&lt;type&gt;()</code> <code>let generic = new Generic()</code>，T 可为任意类型</td></tr><tr><td style="text-align:left;">泛型约束</td><td style="text-align:left;"><code>T extends U (T 必须具有 U 的属性)</code></td></tr></tbody></table><h3 id="_8、类型检查机制" tabindex="-1"><a class="header-anchor" href="#_8、类型检查机制" aria-hidden="true">#</a> 8、类型检查机制</h3><table><thead><tr><th style="text-align:left;">分类</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">类型推断</td><td style="text-align:left;">含义：根据某些规则自动地为变量推断出类型 ①、基础类型推断：初始化变量、设置函数默认参数、确定函数返回值 ②、最佳通用类型推断：推断出一个可以兼容当前所有类型的通用类型 ③、上下文推断：根据事件绑定推断出事件类型</td></tr><tr><td style="text-align:left;">类型断言</td><td style="text-align:left;">含义：用自己声明的类型覆盖类型推断 方式：<code>表达式 as type</code>， <code>&lt;type&gt; 表达式</code> 弊端：没有按照接口的约定赋值，不会报错</td></tr><tr><td style="text-align:left;">类型兼容性</td><td style="text-align:left;">含义：如果 X(目标类型) = Y(源类型)，则 X 兼容 Y <strong>接口兼容性、函数兼容性、枚举兼容性、类兼容性、泛型兼容性：（见下表）</strong></td></tr><tr><td style="text-align:left;">类型保护</td><td style="text-align:left;">含义：在特定的区块中保证变量属于某种确定的类型 创建区块的方法： ①、instanceof ②、typeof ③、in ④、类型保护函数，特殊的返回值：<code>arg is type</code> （类型谓词）</td></tr></tbody></table><p>类型兼容性</p><table><thead><tr><th style="text-align:left;">兼容性分类</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">接口兼容性</td><td style="text-align:left;">成员少的兼容成员多的（鸭式辨型法）</td></tr><tr><td style="text-align:left;">函数兼容性</td><td style="text-align:left;">①、参数个数：目标函数多于源函数 可选参数和剩余参数，遵循原则：固定参数兼容可选参数和剩余参数、可选参数不兼容固定参数和剩余参数（严格模式）、剩余参数兼容固定参数和可选参数 ②、参数类型：必须匹配 参数对象：严格模式：成员多的兼容成员少的；非严格模式：相互兼容（函数参数双向协变） ③、返回值类型：目标函数必须与源函数相同，或为其子类型</td></tr><tr><td style="text-align:left;">枚举兼容性</td><td style="text-align:left;">枚举类型和数字类型相互兼容 枚举类型之间不兼容</td></tr><tr><td style="text-align:left;">类兼容性</td><td style="text-align:left;">静态成员和构造函数不在比较范围 两个类具有相同的实例成员，它们的实例相互兼容 类中包含私有成员或受保护成员，只有父类和子类的实例相互兼容</td></tr><tr><td style="text-align:left;">泛型兼容性</td><td style="text-align:left;">泛型接口：只有类型参数 T 被接口成员使用时，才会影响兼容性 泛型函数：定义相同，没有指定类型参数时就兼容</td></tr></tbody></table><h3 id="_9、高级类型" tabindex="-1"><a class="header-anchor" href="#_9、高级类型" aria-hidden="true">#</a> 9、高级类型</h3><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">交叉类型（类型并集）</td><td style="text-align:left;">含义：将多个类型合并为一个类型，新的类型将具有所有类型的特性 应用场景：混入</td></tr><tr><td style="text-align:left;">联合类型（类型交集）</td><td style="text-align:left;">含义：类型并不确定，可能为多个类型中的一个 应用场景：多类型支持 可区分的联合类型：结合联合类型和字面量类型的类型保护方法</td></tr><tr><td style="text-align:left;">字面量类型</td><td style="text-align:left;">字符串字面量 数字字面量 应用场景：限定变量取值范围</td></tr><tr><td style="text-align:left;">索引类型</td><td style="text-align:left;"><strong>要点：</strong> ①、<code>keyof T</code>（索引查询操作符）：类型 T 公共属性名的字面量联合类型 ②、<code>T[K]</code>（索引访问操作符）：对象 T 的属性 K 所代表的类型 ③、泛型约束 <strong>应用场景：</strong> 从一个对象中选取某些属性的值</td></tr><tr><td style="text-align:left;">映射类型</td><td style="text-align:left;"><strong>含义：</strong> 从旧类型创建出新类型 <strong>应用场景：</strong> <code>Readonly&lt;T&gt;</code>：将 T 的所有属性变为只读 <code>Partial&lt;T&gt;</code>：将 T 的所有属性变为可选 <code>Pick&lt;T, K&gt;</code>：选取以 K 为属性的对象 T 的子集 <code>Record&lt;K, T&gt;</code>：创新属性为 K 的新对象，属性值的类型为 T <strong>同态：</strong> 只作用于 T 的属性</td></tr><tr><td style="text-align:left;">条件类型</td><td style="text-align:left;">含义：<code>T extends U ? X : Y</code> （如果类型 T 可以赋值给类型 U，那么结果类型就是 X，否则就是 Y） 应用场景： ①、<code>Exclude&lt;T, U&gt;</code>：从 T 中过滤掉可以赋值给 U 的类型 ②、<code>Extract&lt;T, U&gt;</code>：从 T 中抽取出可以赋值给 U 的类型 ③、<code>NonNullable&lt;T&gt;</code>：从 T 中除去 undefined 和 null ④、<code>ReturnType&lt;T&gt;</code>：获取函数的返回值类型</td></tr></tbody></table>`,311),o=[p];function l(c,i){return s(),a("div",null,o)}const r=n(t,[["render",l],["__file","TS deleixingjianchajizhi，leixingjianrongxing、baohujizhi、gaojileixing.html.vue"]]);export{r as default};
