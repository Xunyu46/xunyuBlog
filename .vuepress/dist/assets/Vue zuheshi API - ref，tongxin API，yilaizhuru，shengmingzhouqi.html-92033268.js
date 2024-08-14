import{_ as e,r as p,o as l,c as o,b as n,d as s,e as i,a}from"./app-e6acbbcc.js";const c={},u=a(`<h1 id="vue-组合式-api-ref-通信-api-依赖注入-生命周期" tabindex="-1"><a class="header-anchor" href="#vue-组合式-api-ref-通信-api-依赖注入-生命周期" aria-hidden="true">#</a> Vue 组合式 API - ref，通信 API，依赖注入，生命周期</h1><p>从本节内容开始，我们正式深入 Vue 组合式 API 的相关部分细节</p><ul><li>模板引用 ref</li><li>组合式 API - 组件通信 API</li><li>props、emits、透传属性、expose</li><li>依赖与注入</li><li>生命周期钩子</li><li>组合式 API 常见疑问</li><li>实战应用：带历史记录的搜索</li></ul><h2 id="一、模板引用" tabindex="-1"><a class="header-anchor" href="#一、模板引用" aria-hidden="true">#</a> 一、模板引用</h2><p>深入浅出 组合式 API 中 ref 模板引用，v-for 中的模板引用，组件上的 ref 等</p><h3 id="_1、ref-模板引用" tabindex="-1"><a class="header-anchor" href="#_1、ref-模板引用" aria-hidden="true">#</a> 1、ref 模板引用</h3><p>在组合式 API 中要获得对模板的引用，我们需要声明一个同名的 ref 变量。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 声明一个ref变量来存放该元素的引用</span>
  <span class="token comment">// 变量名必须与模板里 ref同名</span>
  <span class="token keyword">const</span> box <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 组件挂载成功后，才能访问到该元素的引用</span>
  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>box<span class="token punctuation">.</span>value<span class="token punctuation">.</span>innerHTML<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>box内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意</p><p>你只可以<strong>在组件挂载后</strong>才能访问模板引用，在没有挂载前模板引用的 ref 值是一个 null。</p><h3 id="_2、v-for-中的模板引用" tabindex="-1"><a class="header-anchor" href="#_2、v-for-中的模板引用" aria-hidden="true">#</a> 2、v-for 中的模板引用</h3><p>当在 <code>v-for</code> 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 声明一个ref变量来存放该元素的引用</span>
  <span class="token comment">// 变量名必须与模板里 ref同名</span>
  <span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 组件挂载成功后，才能访问到该元素的引用</span>
  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>items<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in list<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、组件上的-ref" tabindex="-1"><a class="header-anchor" href="#_3、组件上的-ref" aria-hidden="true">#</a> 3、组件上的 ref</h3><p>在组合式 API<code>&lt;script setup&gt;</code>中，模板引用中获得的值是组件实例。</p><p>不过使用了 <code>&lt;script setup&gt;</code> 的组件是<strong>默认私有</strong>的：一个父组件无法访问到一个使用了 <code>&lt;script setup&gt;</code> 的子组件中的任何东西，除非子组件在其中通过 <code>defineExpose</code> 宏显式暴露。</p><p><strong>代码示例</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>App.vue
&lt;script setup&gt;
  import A from &quot;./components/A.vue&quot;;
  import { ref, onMounted } from &quot;vue&quot;;
  const child = ref(null);
  onMounted(() =&gt; {
    console.log(child.value.msg); //  undefined  如果A组件中对外暴露了该属性，则能获取值
  });
&lt;/script&gt;

&lt;template&gt;
  &lt;a ref=&quot;child&quot;&gt;&lt;/a&gt;
&lt;/template&gt;
A.vue
&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  const msg = ref(&quot;A组件&quot;);
  // 对外暴露属性
  // defineExpose({
  //     msg
  // })
&lt;/script&gt;
&lt;template&gt;
  &lt;div&gt;{{ msg }}&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、组合式-api-组件通信-api" tabindex="-1"><a class="header-anchor" href="#二、组合式-api-组件通信-api" aria-hidden="true">#</a> 二、组合式 API - 组件通信 API</h2><p>本小节主要讲解组合式 API 中涉及组件间通信的 API，具体有：</p><ul><li><code>defineProps()</code>方法，用来声明接受的 props</li><li><code>defineEmits()</code>方法，用来声明接受的事件监听</li><li><code>useAttrs()</code>方法，用来接受所有的透传属性</li><li><code>defineOptions()</code>方法，用来在组合式 API 中声明组件选项</li><li><code>defineExpose()</code>方法，用来对外暴露组件的属性和方法</li></ul><h3 id="_1、defineprops" tabindex="-1"><a class="header-anchor" href="#_1、defineprops" aria-hidden="true">#</a> 1、defineProps()</h3><ul><li>在选项式 API 中，通过 props 选项来声明父组件传递的 props</li><li>在组合式 API 中，通过<code>defineProps()</code>方法来声明 props。</li><li><code>defineProps()</code>方法接收与 <code>props</code> 选项相同的值</li></ul><blockquote><p><code>defineProps()</code>方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用</p></blockquote><ul><li>数组简写形式</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 参数是一个数组</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;userName&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// props是由声明的属性名与属性值组成的对象</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  {userName: 1, age: 19}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对象写法，对 props 做校验，</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 参数是一个对象，可以对prop做相关的校验</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">userName</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 数据类型</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>

      <span class="token comment">// 属性是否为必传，true表示必传</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

      <span class="token comment">// 表示未传该属性时，属性的默认值，如果没有配置default选项</span>
      <span class="token comment">// 对于没有传的非bool类型属性，默认值为undefind，bool类型属性为false</span>
      <span class="token comment">// required与default 不能同时出现，因为必传，就决定了不会启用默认值</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span>

      <span class="token comment">// 数据校验函数，如果返回值为false，表示校验失败，控制台会抛出禁告</span>
      <span class="token function">validator</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ....</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// props是由声明的属性名与属性值组成的对象</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  {userName: 1, age: 19}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、defineemits-方法" tabindex="-1"><a class="header-anchor" href="#_2、defineemits-方法" aria-hidden="true">#</a> 2、defineEmits() 方法</h3><p>在选项式 API 中，通过<code>emits</code>来声明父组件传递的事件监听器，在组合式 API 中，通过<code>defineEmits()</code>方法来声明。<code>defineEmits()</code>方法接收与 <code>emits</code> 选项相同的值</p><blockquote><p><code>defineEmits()</code>方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
<span class="token comment">// emit 相当于选项式API中的 this.$emit 用来触发自定义事件</span>
<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;addEvent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delEvent&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 生命周期函数中触发事件</span>
<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;addEvent&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码演示</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>App.vue
&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  import Count from &quot;./components/Count.vue&quot;;
  const count = ref(0);

  function add() {
    count.value++;
  }
&lt;/script&gt;
&lt;template&gt;
  &lt;!--@add-event  绑定事件监听器--&gt;
  &lt;Count :count=&quot;count&quot; @add-event=&quot;add&quot; /&gt;
&lt;/template&gt;
Count.vue
&lt;script setup&gt;
  import { onMounted } from &quot;vue&quot;;
  defineProps([&quot;count&quot;]);
  // emit 相当于选项式API中的 this.$emit,可以用来触发事件
  const emit = defineEmits([&quot;addEvent&quot;, &quot;delEvent&quot;]);

  // 生命周期函数中触发事件
  onMounted(() =&gt; {
    setTimeout(() =&gt; {
      emit(&quot;addEvent&quot;);
    }, 2000);
  });
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;{{ count }}&lt;/div&gt;
  &lt;button @click=&quot;$emit(&#39;addEvent&#39;)&quot;&gt;count++&lt;/button&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码最终渲染效果如下：</p></blockquote><p><img src="https://www.arryblog.com/assets/img/GIF2023-5-1918-15-02.b6427b47.gif" alt="GIF2023-5-1918-15-02"></p><p>注：</p><p>在打开页面 2 秒后，生命周期函数中的<code>emit(&quot;addEvent&quot;)</code>方法触发了自定事件 addEvent，执行了<code>count.value++</code>，count 的值从 0 变成了 1。</p><p>后面点击 count++按扭，多次触发自定义事件 addEvent，则 count 不断加 1</p><h3 id="_3、useattrs-方法" tabindex="-1"><a class="header-anchor" href="#_3、useattrs-方法" aria-hidden="true">#</a> 3、useAttrs() 方法</h3><p>在选项式 API 中，可以通过<code>this.$attrs</code>来访问透传属性。</p><p>在组合式 API 中，我们需要用 Vue 提供的<code>useAttrs()</code>方法来获取所有透传属性，该方法的返回值与选项式 API 中<code>this.$attrs</code>的值是一样的</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--父组件中调用Count--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Count</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[&#39;active&#39;]<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--Count.vue 代码--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> useAttrs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// attrs 相当于选项式API中的this.$attrs</span>
  <span class="token keyword">const</span> attrs <span class="token operator">=</span> <span class="token function">useAttrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrs<span class="token punctuation">.</span>class<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// active</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrs<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// box</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ attrs.class }} --- {{ attrs.id }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码最终渲染后代码如下：</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>active<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>active --- box<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>禁用透传行为</p><p>在选项式 API 中，我们通过<code>inheritAttrs</code>选项来禁用透传行为。</p><ul><li>在组合式 API 中，我们可以让<code>&lt;script setup&gt;</code>与<code>&lt;script&gt;</code>标签一起共存，在<code>&lt;script&gt;</code>标签的选项式 API 中来书写<code>inheritAttrs</code>选项禁用透传行为。</li><li>在 Vue3.3+以上版本，也可以通过<code>defineOptions()</code>方法来实现</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--父组件中调用Count--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Count</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[&#39;active&#39;]<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--Count.vue 代码--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">inheritAttrs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> useAttrs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// attrs 相当于选项式API中的this.$attrs</span>
  <span class="token keyword">const</span> attrs <span class="token operator">=</span> <span class="token function">useAttrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrs<span class="token punctuation">.</span>class<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrs<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ attrs.class }} --- {{ attrs.id }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码，最终渲染后效果如下：</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>active --- box<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注：</p><p><code>class</code>与<code>id</code>属性并没有自动透传绑定 div 元素身上</p><h3 id="_4、defineoptions-方法" tabindex="-1"><a class="header-anchor" href="#_4、defineoptions-方法" aria-hidden="true">#</a> 4、defineOptions() 方法</h3><p>在 <strong>Vue3.3+</strong> 以上版本，defineOptions 这个宏可以用来直接在 <code>&lt;script setup&gt;</code> 中声明组件选项，而不必使用单独的 <code>&lt;script&gt;</code> 块</p><blockquote><p><code>defineOptions()</code>方法被称为编译器宏，在组合式 API 中不需要导入，可以直接使用</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--父组件中调用Count--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Count</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[&#39;active&#39;]<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>box<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--Count.vue 代码--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useAttrs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// attrs 相当于选项式API中的this.$attrs</span>
  <span class="token keyword">const</span> attrs <span class="token operator">=</span> <span class="token function">useAttrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">defineOptions</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">inheritAttrs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&quot;Hello Vue&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{ attrs.class }} --- {{ attrs.id }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码最终渲染结果如下：</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Hello Vue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>active --- box<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>属性自动透传行为被禁止，<code>msg</code>被正确的在模板中解析出来了</p></blockquote><h3 id="_5、defineexpose-方法" tabindex="-1"><a class="header-anchor" href="#_5、defineexpose-方法" aria-hidden="true">#</a> 5、defineExpose() 方法</h3><p>使用 <code>&lt;script setup&gt;</code> 的组件是<strong>默认关闭</strong>的——即通过模板引用或者 <code>$parent</code> 链获取到的组件的公开实例，<strong>不会</strong>暴露任何在 <code>&lt;script setup&gt;</code> 中声明的绑定。</p><p>可以通过 <code>defineExpose</code> 编译器宏来显式指定在 <code>&lt;script setup&gt;</code> 组件中要暴露出去的属性</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&quot;Hello Count&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 对外暴露以下属性</span>
  <span class="token function">defineExpose</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    msg<span class="token punctuation">,</span>
    count<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码演示</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>App.vue
&lt;script setup&gt;
  import Count from &quot;./components/Count.vue&quot;;
  import { ref, onMounted } from &quot;vue&quot;;
  const box = ref(null);
  const comp = ref(null);

  onMounted(() =&gt; {
    console.log(box.value); // &lt;div&gt;App.vue&lt;/div&gt;
    console.log(comp.value.msg); // Hello Count
    console.log(comp.value.count); // 1
    console.log(comp.value.num); // undefined
  });
&lt;/script&gt;

&lt;template&gt;
  &lt;div ref=&quot;box&quot;&gt;App.vue&lt;/div&gt;
  &lt;Count ref=&quot;comp&quot; /&gt;
&lt;/template&gt;
Count.vue
&lt;script setup&gt;
  import { ref } from &quot;vue&quot;;
  const msg = ref(&quot;Hello Count&quot;);
  const count = ref(1);
  const num = ref(100);
  defineExpose({
    msg,
    count,
  });
&lt;/script&gt;
&lt;template&gt;
  &lt;div&gt;{{ msg }}&lt;/div&gt;
  &lt;div&gt;{{ count }}&lt;/div&gt;
  &lt;div&gt;{{ num}}&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码，渲染后在控制台输出如下内容</p></blockquote><p><img src="https://www.arryblog.com/assets/img/image-20230519202930499.2a83c5a4.png" alt="image-20230519202930499"></p><h2 id="三、依赖与注入" tabindex="-1"><a class="header-anchor" href="#三、依赖与注入" aria-hidden="true">#</a> 三、依赖与注入</h2><p>在组合式 API 中，组件要为后代组件提供数据，后代组件要能使用上层组件提供的数据，需要经过以下两步：</p><ul><li>上层组件通过<code>provide()</code>函数向后代组件提供数据</li><li>后代组件通过<code>inject()</code>函数注入上层组件提供的数据</li></ul><h3 id="_1、provide-函数" tabindex="-1"><a class="header-anchor" href="#_1、provide-函数" aria-hidden="true">#</a> 1、provide() 函数</h3><p><code>provide()</code>函数用于在组合式 API 中为后代组件提供数据</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> provide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token function">provide</span><span class="token punctuation">(</span><span class="token comment">/* 注入名 */</span> <span class="token string">&quot;message&quot;</span><span class="token punctuation">,</span> <span class="token comment">/* 值 */</span> <span class="token string">&quot;hello!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数详解</p><ul><li>第一个参数为注入名，可以是一个字符串或一个 Symbol 类型，后代组件会用该注入名来查找期望的注入值</li><li>第二个参数是提供的值，值可以是任意类型，如果值是一个响应式的（如比 ref 或 reactive），则后代组件可以由此和提供者建立响应式的联系。</li></ul><blockquote><p>一个组件可以多次调用 <code>provide()</code>，使用不同的注入名，注入不同的依赖值。</p></blockquote><h3 id="_2、inject-函数" tabindex="-1"><a class="header-anchor" href="#_2、inject-函数" aria-hidden="true">#</a> 2、inject() 函数</h3><p><code>inject()</code>函数用于在组合式 API 中，后代组件要注入上层组件提供的数据</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&quot;message&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;默认值&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数详解</p><ul><li>第一个参数为注入名，通过注入名访问到上层组件提供的对应数据</li><li>第二个参数为默认值，如果上传组件没有提供该注入名，则会启用默认值</li></ul><blockquote><p>上层组件提供的数据如果是一个 ref 对象，注入进来的会是该 ref 对象，而不会自动解包，这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。不过在模板中使用时会自动解包。</p></blockquote><p><strong>代码演示</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>App.vue
&lt;script setup&gt;
  import Main from &quot;./components/Main.vue&quot;;
  import { ref, reactive, provide } from &quot;vue&quot;;
  // 响应式数据
  const userInfo = reactive({
    userName: &quot;艾编程&quot;,
    age: 12,
    hobbies: [&quot;画画&quot;, &quot;唱歌&quot;, &quot;音乐&quot;],
  });
  function update() {
    userInfo.userName = &quot;清心&quot;;
    userInfo.age = 30;
    userInfo.hobbies = [&quot;写代码&quot;, &quot;跑步&quot;, &quot;阅读&quot;];
  }
  // 提供数据
  provide(&quot;userInfo&quot;, userInfo);
  provide(&quot;update&quot;, update);
&lt;/script&gt;

&lt;template&gt;
  &lt;main /&gt;
&lt;/template&gt;
Main.vue
&lt;script setup&gt;
  import Item from &quot;./Item.vue&quot;;
&lt;/script&gt;
&lt;template&gt;
  &lt;Item /&gt;
&lt;/template&gt;
Item.vue
&lt;script setup&gt;
  import { inject, reactive, toRefs } from &quot;vue&quot;;
  // 注入数据
  const { userName, age, hobbies } = toRefs(inject(&quot;userInfo&quot;));
  // 以下写法，解构后，将会失去响应性
  // const { userName, age, hobbies } = inject(&quot;userInfo&quot;)

  const update = inject(&quot;update&quot;);
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click.once=&quot;update&quot;&gt;更新数据&lt;/button&gt;
  &lt;div&gt;姓名：{{ userName }}&lt;/div&gt;
  &lt;div&gt;年龄：{{ age }}&lt;/div&gt;
  &lt;div&gt;爱好：{{ hobbies }}&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码最终渲染效果如下：</p></blockquote><p><img src="https://www.arryblog.com/assets/img/GIF2023-5-1922-19-11.5e6118f2.gif" alt="GIF2023-5-1922-19-11"></p><h2 id="四、生命周期钩子" tabindex="-1"><a class="header-anchor" href="#四、生命周期钩子" aria-hidden="true">#</a> 四、生命周期钩子</h2><p>深入浅出 Vue 组合式 API 中的生命周期钩子，生命周期函数示图，生命周期函数使用 等。</p><h3 id="_1、生命周期函数示图" tabindex="-1"><a class="header-anchor" href="#_1、生命周期函数示图" aria-hidden="true">#</a> 1、生命周期函数示图</h3><blockquote><p>我们再来回顾之前讲到的生命周期函数示图</p></blockquote><p><img src="https://www.arryblog.com/assets/img/lifecycle.16e4c08e.1ae3c5f4.png" alt="lifecycle.16e4c08e"></p><p>注：</p><p>组合式 API 中的生命周期函数与选项式 API 中是几乎是一一对应的，只是存在以下两点不同：</p><ul><li>两者函数名写法上有所不同，组合式 API 生命周函数都以 on 开头，并采用驼峰命名，如下表。</li><li>组合式 API 中没有与之对应的<code>onBeforeCreate</code>与<code>onCreated</code>函数，所有期望在<code>beforeCreate</code>与<code>created</code>生命周期函数阶段执行的代码都可以写在在<code>setup()</code>函数或<code>&lt;script setup&gt;</code>标签中。</li></ul><p>因为<code>setup()</code>与<code>&lt;script setup&gt;</code>中的代码会在<code>beforeCreate</code>生命周期函数之前被处理。相当于组合式 API 中所有写在<code>setup()</code>函数或<code>&lt;script setup&gt;</code>中的顶层变量或方法相当于选项式 API 中<code>data()</code>方法与<code>methods</code>选项等其它选项对外暴露的属性和方法。</p><p><strong>组合式 API 与选项式 API 中生命周期函数的对比表</strong></p><table><thead><tr><th style="text-align:left;">选项式 API</th><th style="text-align:left;">组合式 API</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">beforeCreate</td><td style="text-align:left;">setup</td><td style="text-align:left;">在组件实例初始化完成之后立即调用</td></tr><tr><td style="text-align:left;">created</td><td style="text-align:left;">setup</td><td style="text-align:left;">在组件实例处理完所有与状态相关的选项后调用。</td></tr><tr><td style="text-align:left;">beforeMount</td><td style="text-align:left;">onBeforeMount</td><td style="text-align:left;">组件被挂载之前被调</td></tr><tr><td style="text-align:left;">mounted</td><td style="text-align:left;">onMounted</td><td style="text-align:left;">用组件挂载完成后执行</td></tr><tr><td style="text-align:left;">beforeUpdate</td><td style="text-align:left;">onBeforeUpdate</td><td style="text-align:left;">组件即将因为响应式状态变更而更新其 DOM 树之前调用</td></tr><tr><td style="text-align:left;">updated</td><td style="text-align:left;">onUpdated</td><td style="text-align:left;">组件因为响应式状态变更而更新其 DOM 树之后调用</td></tr><tr><td style="text-align:left;">beforeUnmount</td><td style="text-align:left;">onBeforeUnmount</td><td style="text-align:left;">组件实例被卸载之前调用</td></tr><tr><td style="text-align:left;">unmounted</td><td style="text-align:left;">onUnmounted</td><td style="text-align:left;">组件实例被卸载之后调用</td></tr></tbody></table><h3 id="_2、生命周期函数使用" tabindex="-1"><a class="header-anchor" href="#_2、生命周期函数使用" aria-hidden="true">#</a> 2、生命周期函数使用</h3><ul><li>组合式 API 中生命周期函数需要先导入，然后才能使用。</li><li>每个生命周期函数的第一个参数是一个回调函数，在组件或应用执行到此阶段时，会触发该回调函数。</li></ul><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 导入生命周期函数</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 只会在组件或应用执行到此生命阶段时，才会触发其回调函数</span>
  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;DOM挂载完毕&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果在同一个 setup 中，同一个生命周期函数出现多次，则每个生命周期函数的回调都会触发，不存在覆盖的情况</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 导入生命周期函数</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">// 只会在组件或应用执行到此生命阶段时，才会触发其回调函数</span>
  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;111&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;222&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码，最终页面加载完毕，会在控制台输出 &quot;111&quot; 与 ”222“</p></blockquote><p><strong>代码演示</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>App.vue
&lt;script setup&gt;
  import Count from &quot;./components/Count.vue&quot;;
  import { ref } from &quot;vue&quot;;
  const isShow = ref(true);
&lt;/script&gt;
&lt;template&gt;
  &lt;button @click=&quot;isShow = false&quot;&gt;卸载组件&lt;/button&gt;
  &lt;Count v-if=&quot;isShow&quot; /&gt;
&lt;/template&gt;
Count.vue
&lt;script setup&gt;
  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from &quot;vue&quot;;
  const count = ref(0);

  console.log(&quot;01:setup&quot;);

  onBeforeMount(() =&gt; {
    console.log(&quot;02:onBeforeMounted&quot;);
  });
  onMounted(() =&gt; {
    console.log(&quot;03:onMounted&quot;);
  });
  onBeforeUpdate(() =&gt; {
    console.log(&quot;04:onBeforeUpdate&quot;);
  });
  onUpdated(() =&gt; {
    console.log(&quot;05:onUpdated&quot;);
  });
  onBeforeUnmount(() =&gt; {
    console.log(&quot;06:onBeforeUnmount&quot;);
  });
  onUnmounted(() =&gt; {
    console.log(&quot;07:onUnmounted&quot;);
  });
&lt;/script&gt;
&lt;template&gt;
  &lt;button @click=&quot;count++&quot;&gt;count++&lt;/button&gt;
  &lt;div&gt;{{ count }}&lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上代码最终渲染后效果如下：</p></blockquote><p><img src="https://www.arryblog.com/assets/img/GIF2023-5-1923-28-52.df8c1a9e.gif" alt="GIF2023-5-1923-28-52"></p><h2 id="五、组合式-api-常见疑问" tabindex="-1"><a class="header-anchor" href="#五、组合式-api-常见疑问" aria-hidden="true">#</a> 五、组合式 API 常见疑问</h2>`,109),d={href:"https://cn.vuejs.org/guide/extras/composition-api-faq.html",target:"_blank",rel:"noopener noreferrer"},r=a('<h2 id="六、实战应用-带历史记录的搜索" tabindex="-1"><a class="header-anchor" href="#六、实战应用-带历史记录的搜索" aria-hidden="true">#</a> 六、实战应用：带历史记录的搜索</h2><p>本小节我们一起来完成《带历史记录的搜索》案例</p><blockquote><p>具体效果如下：</p></blockquote><p><img src="https://www.arryblog.com/assets/img/GIF2023-7-1418-47-54.02cd61b0.gif" alt="GIF2023-7-1418-47-54"></p><h3 id="_1、项目功能介绍" tabindex="-1"><a class="header-anchor" href="#_1、项目功能介绍" aria-hidden="true">#</a> 1、项目功能介绍</h3><blockquote><p>首先我们来了解下，该案例所需要实现的功能点：</p></blockquote><ul><li>在搜索框中输入内容，并按回车键 <ul><li>输入框中的内容添加到搜索历史列表中</li><li>根据关键词搜索对应的课程，并且将搜索的结果以列表形式呈现在页面中</li></ul></li><li>点击搜索框右则的取消按扭，可以取消输入框中的的内容</li><li>点击搜索历史列表中的关键字，可以触发搜索功能，将搜索的结果以列表形式呈现在页面中</li><li>点击搜索历史列表右则的删除按扭，可以清空搜索历史列表。</li></ul><h3 id="_2、项目涉及核心知识点" tabindex="-1"><a class="header-anchor" href="#_2、项目涉及核心知识点" aria-hidden="true">#</a> 2、项目涉及核心知识点</h3><blockquote><p>该项目所涉及知识点较多，主要有：</p></blockquote><table><thead><tr><th style="text-align:left;">知识点分类</th><th style="text-align:left;">涉及内容</th></tr></thead><tbody><tr><td style="text-align:left;">Vue 基础（组合式）</td><td style="text-align:left;">插值语法、列表渲染、v-bind 指令、表单元素绑定、事件绑定、样式绑定、事件修饰符 、watchEffect 侦听器、响应式 API-reactive</td></tr><tr><td style="text-align:left;">组件间通信</td><td style="text-align:left;">defineProps、defineEmits、组件 v-model</td></tr><tr><td style="text-align:left;">原生 JS 基础</td><td style="text-align:left;">本地数据持久化： localStorage 本地存储、JSON.parse、JSON.stringify 数组相关 API：unshift</td></tr><tr><td style="text-align:left;">网络请求</td><td style="text-align:left;">axios</td></tr></tbody></table><h3 id="_3、学习目标" tabindex="-1"><a class="header-anchor" href="#_3、学习目标" aria-hidden="true">#</a> 3、学习目标</h3><blockquote><p>通过该案例的学习，我们将重点掌握以下内容</p></blockquote><ul><li>项目开发流程：如何一步步完成项目的开发，先做什么后做什么</li><li>组件拆分：一个完整的项目，应该如何进行组件化拆分</li><li>组件功能分析：分析拆分出来的组件具有那些功能，需要那些 props、事件、插槽等</li><li>组件间通信：在实际开发中，组件间通信时应该选择那一种通信方式最合适</li></ul>',13);function v(k,m){const t=p("ExternalLinkIcon");return l(),o("div",null,[u,n("p",null,[s("组合式 API 的常见疑问，大家可以参 Vue 官方文档："),n("a",d,[s("组合式 API 常见问题(opens new window)"),i(t)])]),r])}const b=e(c,[["render",v],["__file","Vue zuheshi API - ref，tongxin API，yilaizhuru，shengmingzhouqi.html.vue"]]);export{b as default};
