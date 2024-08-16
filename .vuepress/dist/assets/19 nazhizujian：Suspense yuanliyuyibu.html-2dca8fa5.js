import{_ as n,o as s,c as a,a as e}from"./app-48690364.js";const p={},t=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p><code>&lt;Suspense&gt;</code> 是一个内置组件，用来在组件树中协调对异步依赖的处理。可以帮助我们更好的完成组件树父组件对子组件的多个嵌套异步依赖关系的管理，当父组件处于等待中时，允许我们自定挂载一个加载中状态。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a44178ca30404637b8e775d4e5760271~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 上图中，红色字体代表的是组件有异步的 <code>setup()</code> 。 通过 <code>&lt;Suspense&gt;</code> 组件我们可以很容易实现在组件异步加载时统一展示加载中状态，在所有组件完成加载时，再统一展示：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Suspense</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 具有深层异步依赖的组件 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Dashboard</span> <span class="token punctuation">/&gt;</span></span>

  <span class="token comment">&lt;!-- 在 #fallback 插槽中显示 “正在加载中” --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#fallback</span><span class="token punctuation">&gt;</span></span>
    Loading...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Suspense</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们将深度解读 <code>&lt;Suspense&gt;</code> 组件实现的原理。</p><h2 id="suspense-挂载" tabindex="-1"><a class="header-anchor" href="#suspense-挂载" aria-hidden="true">#</a> Suspense 挂载</h2><p><code>&lt;Suspense&gt;</code> 组件和所有内置组件一样，也是有初始化挂载的过程，先来看看 <code>Vue</code> 对 <code>&lt;Suspense&gt;</code> 组件的源码定义：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> SuspenseImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Suspense&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// Suspense 组件标识符</span>
  <span class="token literal-property property">__isSuspense</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 初始化挂载的逻辑</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// diff 的逻辑</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">create</span><span class="token operator">:</span> createSuspenseBoundary<span class="token punctuation">,</span>
  <span class="token literal-property property">normalize</span><span class="token operator">:</span> normalizeSuspenseChildren
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>process</code> 的执行时机和前面提到的 <code>&lt;Teleport&gt;</code> 组件是一致的，会在 <code>patch</code> 的时候根据组件的 <code>shapeFlag</code> 标志来判断是否需要执行 <code>process</code> 函数的调用。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">patch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> <span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> ref<span class="token punctuation">,</span> shapeFlag <span class="token punctuation">}</span> <span class="token operator">=</span> n2
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据 type 类型处理</span>
    <span class="token keyword">case</span> <span class="token literal-property property">Text</span><span class="token operator">:</span>
      <span class="token comment">// 对文本节点的处理</span>
      <span class="token function">processText</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token comment">// 这里省略了一些其他节点处理，比如注释、Fragment 节点等等</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token comment">// 根据 shapeFlag 来处理</span>
      <span class="token comment">// ...</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">SUSPENSE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对 Suspense 节点进行处理</span>
        type<span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span>
          n1<span class="token punctuation">,</span>
          n2<span class="token punctuation">,</span>
          container<span class="token punctuation">,</span>
          anchor<span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          slotScopeIds<span class="token punctuation">,</span>
          optimized<span class="token punctuation">,</span>
          internals
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们着重先来看看 <code>Suspense</code> 的初始化挂载逻辑，这块的代码集中在 <code>mountSuspense</code> 中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountSuspense</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> rendererInternals</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">p</span><span class="token operator">:</span> patch<span class="token punctuation">,</span>
    <span class="token literal-property property">o</span><span class="token operator">:</span> <span class="token punctuation">{</span> createElement <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token operator">=</span> rendererInternals
  <span class="token comment">// 创建隐藏容器，用来实例化挂载 default 插槽内的内容</span>
  <span class="token keyword">const</span> hiddenContainer <span class="token operator">=</span> <span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">// 构造一个 suspense 对象，并赋值给 vnode.suspense</span>
  <span class="token keyword">const</span> suspense <span class="token operator">=</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>suspense <span class="token operator">=</span> <span class="token function">createSuspenseBoundary</span><span class="token punctuation">(</span>
    vnode<span class="token punctuation">,</span>
    parentSuspense<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    hiddenContainer<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    slotScopeIds<span class="token punctuation">,</span>
    optimized<span class="token punctuation">,</span>
    rendererInternals
  <span class="token punctuation">)</span><span class="token punctuation">)</span>
  
  <span class="token comment">// 离线挂载 default 插槽内的内容</span>
  <span class="token function">patch</span><span class="token punctuation">(</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>suspense<span class="token punctuation">.</span>pendingBranch <span class="token operator">=</span> vnode<span class="token punctuation">.</span>ssContent<span class="token punctuation">)</span><span class="token punctuation">,</span>
    hiddenContainer<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    suspense<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    slotScopeIds
  <span class="token punctuation">)</span>
  <span class="token comment">// 如果有异步依赖</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>suspense<span class="token punctuation">.</span>deps <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 触发 onPending，onFallback 钩子函数</span>
    <span class="token function">triggerEvent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token string">&#39;onPending&#39;</span><span class="token punctuation">)</span>
    <span class="token function">triggerEvent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token string">&#39;onFallback&#39;</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 初始化挂载 fallback 插槽内容</span>
    <span class="token function">patch</span><span class="token punctuation">(</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      vnode<span class="token punctuation">.</span>ssFallback<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      anchor<span class="token punctuation">,</span>
      parentComponent<span class="token punctuation">,</span>
      <span class="token comment">// fallback tree 不会有 suspense context</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span> 
      isSVG<span class="token punctuation">,</span>
      slotScopeIds
    <span class="token punctuation">)</span>
    <span class="token comment">// 将 fallback vnode 设置为 activeBranch</span>
    <span class="token function">setActiveBranch</span><span class="token punctuation">(</span>suspense<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>ssFallback<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果 suspense 没有异步依赖，直接调用 resolve</span>
    suspense<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在开始解读源码之前，我们需要提前认识几个关键变量的含义：</p><ol><li><code>ssContent</code> 代表的是 <code>default</code> 插槽内的内容的 <code>vnode</code>。</li><li><code>ssFallback</code> 代表的是 <code>fallback</code> 插槽内的内容的 <code>vnode</code>。</li><li><code>activeBranch</code> 代表的是当前激活的分支，就是挂载到页面中的 <code>vnode</code>。</li><li><code>pendingBranch</code> 代表的是正处于 <code>pending</code> 状态的分支，一般指还未被激活的 <code>default</code> 插槽内的内容中的 <code>vnode</code></li></ol><p>然后我们再来看一下整个 <code>mountSuspense</code> 的过程，首先会创建一个隐藏的 <code>DOM</code> 元素，该元素将作为 <code>default</code> 插槽内容的初始化挂载容器。然后创建了一个 <code>suspense</code> 变量，该变量内部包含了一些的对 <code>&lt;Suspense&gt;</code> 组件的处理函数：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createSuspenseBoundary</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> container<span class="token punctuation">,</span> hiddenContainer<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> rendererInternals<span class="token punctuation">,</span> isHydrating <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">const</span> suspense <span class="token operator">=</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">,</span>
    parent<span class="token punctuation">,</span>
    parentComponent<span class="token punctuation">,</span>
    isSVG<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    hiddenContainer<span class="token punctuation">,</span>
    anchor<span class="token punctuation">,</span>
    <span class="token literal-property property">deps</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pendingId</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token keyword">typeof</span> timeout <span class="token operator">===</span> <span class="token string">&#39;number&#39;</span> <span class="token operator">?</span> timeout <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">activeBranch</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pendingBranch</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token literal-property property">isInFallback</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    isHydrating<span class="token punctuation">,</span>
    <span class="token literal-property property">isUnmounted</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">effects</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">resume <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token function">fallback</span><span class="token punctuation">(</span><span class="token parameter">fallbackVNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token function">move</span><span class="token punctuation">(</span><span class="token parameter">container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token function">registerDep</span><span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> setupRenderEffect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token function">unmount</span><span class="token punctuation">(</span><span class="token parameter">parentSuspense<span class="token punctuation">,</span> doRemove</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> suspense
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，这个 <code>createSuspenseBoundary</code> 函数本身其实并没有做太多的事情，本质上就是为了构造一个 <code>suspense</code> 对象。</p><p>接下来会进入到对 <code>default</code> 容器中的内容进行 <code>patch</code> 的过程。在本课程的第二小节中，我们提到了 <code>patch</code> 函数在进行组件实例化的过程中，会执行 <code>setupStatefulComponent</code> 这个设置并运行副作用渲染函数的方法，之前我们只是介绍了该方法处理同步 <code>setup</code> 的情况，而对于 <code>&lt;Suspense&gt;</code> 组件来说，<code>setup</code> 会返回个 <code>promise</code>。我们再来看看对于这种情况的处理：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setupStatefulComponent</span><span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> isSSR</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token comment">// 对于 setup 返回是个 promise 的情况</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromise</span><span class="token punctuation">(</span>setupResult<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    setupResult<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>unsetCurrentInstance<span class="token punctuation">,</span> unsetCurrentInstance<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 在 suspense 模式下，为实例 asyncDep 赋值为 setupResult</span>
      instance<span class="token punctuation">.</span>asyncDep <span class="token operator">=</span> setupResult
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到对于 <code>Suspense</code> 组件来说，其中的 <code>default</code> 内容的 <code>setup</code> 如果返回的是个 <code>pormise</code> 对象的话，则会为将 <code>setup</code> 函数执行的结果 <code>setupResult</code> 赋值给实例属性 <code>asyncDep</code>。那 <code>asyncDep</code> 有什么用呢？</p><p>在渲染器执行 <code>mountComponent</code> 的时候，如果存在 <code>asyncDep</code> 变量，则会调用 <code>suspense</code> 上的 <code>registerDep</code> 方法，并为 <code>default</code> 中的插槽节点创建了一个占位符：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">mountComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">initialVNode<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> optimized</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token comment">// 依赖于 suspense 的异步 setup</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__FEATURE_SUSPENSE__ <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>asyncDep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    parentSuspense <span class="token operator">&amp;&amp;</span> parentSuspense<span class="token punctuation">.</span><span class="token function">registerDep</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> setupRenderEffect<span class="token punctuation">)</span>
    
    <span class="token comment">// 为插槽 vnode 创建注释节点</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>initialVNode<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> placeholder <span class="token operator">=</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>subTree <span class="token operator">=</span> <span class="token function">createVNode</span><span class="token punctuation">(</span>Comment<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token function">processCommentNode</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> placeholder<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 <code>parentSuspense</code> 就是 <code>default</code> 插槽内的第一个父级 <code>suspense</code> 对象。接下来看看 <code>registerDep</code> 的执行逻辑：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createSuspenseBoundary</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> container<span class="token punctuation">,</span> hiddenContainer<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> rendererInternals<span class="token punctuation">,</span> isHydrating <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">const</span> suspense <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token function">registerDep</span><span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> setupRenderEffect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 是否有异步未处理的分支</span>
      <span class="token keyword">const</span> isInPendingSuspense <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>suspense<span class="token punctuation">.</span>pendingBranch
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isInPendingSuspense<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// deps 这里会被递增，记录依赖的异步数量</span>
        suspense<span class="token punctuation">.</span>deps<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// asyncDep promise 执行</span>
      instance
        <span class="token punctuation">.</span>asyncDep<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// setup return 的 promise 异常捕获</span>
          <span class="token function">handleError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> instance<span class="token punctuation">,</span> ErrorCodes<span class="token punctuation">.</span><span class="token constant">SETUP_FUNCTION</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">asyncSetupResult</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
          <span class="token comment">// 处理一些异常结果</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            instance<span class="token punctuation">.</span>isUnmounted <span class="token operator">||</span>
            suspense<span class="token punctuation">.</span>isUnmounted <span class="token operator">||</span>
            suspense<span class="token punctuation">.</span>pendingId <span class="token operator">!==</span> instance<span class="token punctuation">.</span>suspenseId
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
          <span class="token punctuation">}</span>
          instance<span class="token punctuation">.</span>asyncResolved <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token keyword">const</span> <span class="token punctuation">{</span>vnode<span class="token punctuation">}</span> <span class="token operator">=</span> instance
          <span class="token comment">// setup 处理完成调用</span>
          <span class="token function">handleSetupResult</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> asyncSetupResult<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
          <span class="token comment">// 占位内容，就是 mountComponent 中创建的注释节点</span>
          <span class="token keyword">const</span> placeholder <span class="token operator">=</span> <span class="token operator">!</span>hydratedEl <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span>subTree<span class="token punctuation">.</span>el
          <span class="token comment">// 执行 render 挂载节点</span>
          <span class="token function">setupRenderEffect</span><span class="token punctuation">(</span>
            instance<span class="token punctuation">,</span>
            vnode<span class="token punctuation">,</span>
            <span class="token comment">// 找到注释占位内容的父节点，作为容器节点，也就是我们之前创建的隐藏 dom</span>
            <span class="token function">parentNode</span><span class="token punctuation">(</span>hydratedEl <span class="token operator">||</span> instance<span class="token punctuation">.</span>subTree<span class="token punctuation">.</span>el<span class="token punctuation">)</span><span class="token punctuation">,</span>
            hydratedEl <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token function">next</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span>subTree<span class="token punctuation">)</span><span class="token punctuation">,</span>
            suspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
          <span class="token comment">// 移除占位符</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>placeholder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">remove</span><span class="token punctuation">(</span>placeholder<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 更新 vnode el 属性</span>
          <span class="token function">updateHOCHostEl</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
        
          <span class="token comment">// 当所有的异步依赖处理完成后执行 suspense.resolve()</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>isInPendingSuspense <span class="token operator">&amp;&amp;</span> <span class="token operator">--</span>suspense<span class="token punctuation">.</span>deps <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            suspense<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> suspense
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里在执行 <code>createSuspenseBoundary</code> 函数的时候，有一个变量需要先了解一下，就是 <code>suspense.deps</code>。这个变量记录着需要处理的异步数量，比如我们上面的图例：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a44178ca30404637b8e775d4e5760271~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这里生成的 <code>deps = 3</code>。</p><p>然后会对 <code>instance.asyncDep</code> 的执行结果进行处理，如果有异常，则进入到 <code>handleError</code> 的逻辑，<code>handleError</code> 内部会调用 <code>onErrorCaptured</code> 钩子，可以让我们监听到组件的错误。</p><p>如果正常返回，则会进入到 <code>then</code> 的处理逻辑中，这里的处理主要做了以下几件事儿：</p><ol><li>首先对一些异常场景进行降级，这里的异常场景包含了组件实例在异步执行完成后被卸载，或者 <code>Suspense</code> 实例被卸载等情况。</li><li>然后就是为组件设置 <code>render</code> 函数。如果 <code>setup promise</code> 返回的时候函数，那么这里也会将这个函数设置为渲染函数。</li><li>接着就是通过 <code>setupRenderEffect</code> 函数的调用，完成渲染函数的调用执行，生成 <code>DOM</code> 节点</li><li>最后，根据 <code>deps</code> 判断是否所有的异步依赖都已执行完，如果执行完，则进入 <code>suspense.resolve()</code> 的逻辑。</li></ol><p>介绍完了 <code>patch</code> 的过程，再回到 <code>mountSuspense</code> 函数体当中，如果存在异步依赖，此时的 <code>suspense.deps &gt; 0</code> 会进入到对异步处理的逻辑中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 触发 onPending，onFallback 钩子函数</span>
<span class="token function">triggerEvent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token string">&#39;onPending&#39;</span><span class="token punctuation">)</span>
<span class="token function">triggerEvent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token string">&#39;onFallback&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 初始化挂载 fallback 插槽内容</span>
<span class="token function">patch</span><span class="token punctuation">(</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span>
  vnode<span class="token punctuation">.</span>ssFallback<span class="token punctuation">,</span>
  container<span class="token punctuation">,</span>
  anchor<span class="token punctuation">,</span>
  parentComponent<span class="token punctuation">,</span>
  <span class="token comment">// fallback tree 不会有 suspense context</span>
  <span class="token keyword">null</span><span class="token punctuation">,</span> 
  isSVG<span class="token punctuation">,</span>
  slotScopeIds
<span class="token punctuation">)</span>
<span class="token comment">// 将 fallback vnode 设置为 activeBranch</span>
<span class="token function">setActiveBranch</span><span class="token punctuation">(</span>suspense<span class="token punctuation">,</span> vnode<span class="token punctuation">.</span>ssFallback<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的核心逻辑就是在 <code>default</code> 插槽中的异步未执行完成时，先挂载 <code>fallback</code> 的内容。然后将 <code>activeBranch</code> 设置为 <code>fallback</code>。</p><p>如果不存在异步依赖，<code>suspense.deps = 0</code> 此时，也会直接执行 <code>suspense.resolve()</code>。</p><p>接下来，我们看看这个 <code>resolve</code> 到底做了哪些事：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createSuspenseBoundary</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parent<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> container<span class="token punctuation">,</span> hiddenContainer<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> rendererInternals<span class="token punctuation">,</span> isHydrating <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">const</span> suspense <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token parameter">resume <span class="token operator">=</span> <span class="token boolean">false</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">,</span>
        activeBranch<span class="token punctuation">,</span>
        pendingBranch<span class="token punctuation">,</span>
        pendingId<span class="token punctuation">,</span>
        effects<span class="token punctuation">,</span>
        parentComponent<span class="token punctuation">,</span>
        container
      <span class="token punctuation">}</span> <span class="token operator">=</span> suspense
      <span class="token comment">// 服务端渲染的逻辑，这里不关心</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>suspense<span class="token punctuation">.</span>isHydrating<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        suspense<span class="token punctuation">.</span>isHydrating <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>resume<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token keyword">let</span> <span class="token punctuation">{</span>anchor<span class="token punctuation">}</span> <span class="token operator">=</span> suspense
        <span class="token comment">// 卸载当前激活分支，即 fallback</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>activeBranch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          anchor <span class="token operator">=</span> <span class="token function">next</span><span class="token punctuation">(</span>activeBranch<span class="token punctuation">)</span>
          <span class="token function">unmount</span><span class="token punctuation">(</span>activeBranch<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> suspense<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>delayEnter<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 将 default 容器中的内容移动到可视区域</span>
          <span class="token function">move</span><span class="token punctuation">(</span>pendingBranch<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> MoveType<span class="token punctuation">.</span><span class="token constant">ENTER</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 将 pendingBranch 设置为激活分支</span>
      <span class="token function">setActiveBranch</span><span class="token punctuation">(</span>suspense<span class="token punctuation">,</span> pendingBranch<span class="token punctuation">)</span>
      suspense<span class="token punctuation">.</span>pendingBranch <span class="token operator">=</span> <span class="token keyword">null</span>
      suspense<span class="token punctuation">.</span>isInFallback <span class="token operator">=</span> <span class="token boolean">false</span>
      
      <span class="token comment">// 获取父节点</span>
      <span class="token keyword">let</span> parent <span class="token operator">=</span> suspense<span class="token punctuation">.</span>parent
      <span class="token comment">// 标记是否还有未处理完成的 suspense</span>
      <span class="token keyword">let</span> hasUnresolvedAncestor <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">.</span>pendingBranch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">//  如果存在还未处理完的父级 suspense，将当前 effect 合并到父级当中</span>
          parent<span class="token punctuation">.</span>effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>effects<span class="token punctuation">)</span>
          hasUnresolvedAncestor <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent
      <span class="token punctuation">}</span>
      <span class="token comment">// 全部处理完suspense，一次性 queuePostFlushCb</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hasUnresolvedAncestor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>effects<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      suspense<span class="token punctuation">.</span>effects <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      
      <span class="token comment">// 调用 onResolve 钩子函数</span>
      <span class="token function">triggerEvent</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> <span class="token string">&#39;onResolve&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> suspense
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里要做的事情也是比较明确的，我们也来一一枚举一下</p><ol><li>卸载 <code>fallback</code> 的插槽内容，因为已经完成了异步逻辑，所以没必要了。</li><li>将之前缓存在内存中的 <code>default</code> 节点移动到可是区域。</li><li>遍历父节点，找到是否还有未完成的 <code>suspense</code> 节点，将当前的渲染 <code>effects</code> 合并到父节点上进行统一更新。</li><li>触发 <code>onResolve</code> 钩子函数。</li></ol><p>这里我想重点说一下第三点，什么情况下会出现子节点已经完成异步依赖执行单父节点还有未完成的异步依赖呢？可以来看一个 <code>demo</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { createApp, ref, h, onMounted } from &#39;vue&#39;

// 构造一个异步渲染容器
function defineAsyncComponent(
  comp,
  delay = 0
) {
  return {
    setup(props, { slots }) {
      return new Promise(resolve =&gt; {
        setTimeout(() =&gt; {
          resolve(() =&gt; h(comp, props, slots))
        }, delay)
      })
    }
  }
}
// 定义一个外层异步组件
const AsyncOuter = defineAsyncComponent(
  {
    setup: () =&gt; {
      onMounted(() =&gt; {
        console.log(&#39;outer mounted&#39;)
      })
      return () =&gt; h(&#39;div&#39;, &#39;async outer&#39;)
    }
  },
  2000
)
// 定义一个内层异步组件
const AsyncInner = defineAsyncComponent(
  {
    setup: () =&gt; {
      onMounted(() =&gt; {
        console.log(&#39;inner mounted&#39;)
      })
      return () =&gt; h(&#39;div&#39;, &#39;async inner&#39;)
    }
  },
  1000
)
// 定义一个内层 Suspense 组件
const Inner = {
  setup() {
    return () =&gt;
      h(Suspense, null, {
        default: h(AsyncInner),
        fallback: h(&#39;div&#39;, &#39;fallback inner&#39;)
      })
  }
}
createApp({
  setup() {
    return () =&gt;
      // 定义一个外层 Suspense 组件
      h(Suspense, null, {
        default: h(&#39;div&#39;, [h(AsyncOuter), h(Inner)]),
        fallback: h(&#39;div&#39;, &#39;fallback outer&#39;)
      })
  },
}).mount(&#39;#app&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里呢，我们构造了一个包含了 <code>Suspense</code> 异步渲染的 <code>Outer</code> 组件，<code>Outer</code> 中又包含了另一个通过 <code>Suspense</code> 渲染的 <code>Inner</code> 组件。我们通过 <code>defineAsyncComponent</code> 函数来模拟组件的异步过程，此时的 <code>AsyncInner</code> 组件是优先于 <code>AsyncOuter</code> 组件的异步完成的，对于这种情况，就满足了存在父的 <code>Suspense</code> 且父级 <code>Suspense</code> 还有 <code>pendingBranch</code> 待处理的情况，那么会把子组件的 <code>suspense.effects</code> 合入父组件当中。</p><p><code>suspense.effects</code> 是个什么东西呢？</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// queuePostRenderEffect 在 suspense 模式下指的是 queueEffectWithSuspense</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> queuePostRenderEffect <span class="token operator">=</span> __FEATURE_SUSPENSE__
  <span class="token operator">?</span> queueEffectWithSuspense
  <span class="token operator">:</span> queuePostFlushCb
  
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">queueEffectWithSuspense</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> suspense</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 针对 suspense 处理，会将渲染函数推送到 suspense.effects 中</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>suspense <span class="token operator">&amp;&amp;</span> suspense<span class="token punctuation">.</span>pendingBranch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      suspense<span class="token punctuation">.</span>effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>fn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      suspense<span class="token punctuation">.</span>effects<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">queuePostFlushCb</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>suspense.effects</code> 在 <code>suspense</code> 模式下，就是通过 <code>queuePostRenderEffect</code> 生成的副作用函数的数组。我们的示例中，会在组件中调用 <code>onMounted</code> 钩子函数，在组件被挂载的时候，就会执行通过 <code>queuePostRenderEffect</code> 函数，将 <code>onMounted</code> 推入 <code>suspense.effects</code> 数组中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 设置并运行带副作用的渲染函数</span>
<span class="token keyword">const</span> <span class="token function-variable function">setupRenderEffect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">componentUpdateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">.</span>isMounted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> m <span class="token punctuation">}</span> <span class="token operator">=</span> instance
      <span class="token comment">// mounted hook 推入到 suspense.effects</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">queuePostRenderEffect</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
     
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token keyword">let</span> <span class="token punctuation">{</span> u <span class="token punctuation">}</span> <span class="token operator">=</span> instance
      <span class="token comment">// updated hook 推入到 suspense.effects</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">queuePostRenderEffect</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以上述的示例中，父子组件的 <code>onMounted</code> 钩子将会被在父组件异步完成后统一执行。</p><h2 id="suspense-更新" tabindex="-1"><a class="header-anchor" href="#suspense-更新" aria-hidden="true">#</a> Suspense 更新</h2><p>接下来我们看一下 <code>Suspense</code> 更新的逻辑，这块的逻辑都集中在 <code>patchSuspense</code> 函数中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  // 初始化赋值操作
  const suspense = (n2.suspense = n1.suspense)
    suspense.vnode = n2
  n2.el = n1.el
  // 最新的 default 分支
  const newBranch = n2.ssContent
  // 最新的 fallback 分支
  const newFallback = n2.ssFallback
  
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense
  // 存在旧的 pendingBranch
  if (pendingBranch) {
    suspense.pendingBranch = newBranch
    // 新旧分支是属于 isSameVNodeType
    if (isSameVNodeType(newBranch, pendingBranch)) {
      // 新旧分支进行 diff
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      // 没有依赖则直接 resolve
      if (suspense.deps &lt;= 0) {
        suspense.resolve()
      } else if (isInFallback) {
        // 处于 fallback 中，激活分支和 newFallback 进行 diff
        patch(
          activeBranch,
          newFallback,
          container,
          anchor,
          parentComponent,
          null, // fallback tree will not have suspense context
          isSVG,
          slotScopeIds,
          optimized
        )
        // 更新激活分支为 newFallback
        setActiveBranch(suspense, newFallback)
      }
    } else {
      suspense.pendingId++
      // ...
      // 卸载旧分支
      unmount(pendingBranch, parentComponent, suspense)
      // ...
      //  创建隐藏容器
      suspense.hiddenContainer = createElement(&#39;div&#39;)
      // 处于 fallback 态
      if (isInFallback) {
        // 挂载新的分支到隐藏容器中
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        // 没有依赖则直接 resolve
        if (suspense.deps &lt;= 0) {
          suspense.resolve()
        } else {
          // 激活分支和 newFallback 进行 diff
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null, // fallback tree will not have suspense context
            isSVG,
            slotScopeIds,
            optimized
          )
          setActiveBranch(suspense, newFallback)
        }
      } else if (activeBranch &amp;&amp; isSameVNodeType(newBranch, activeBranch)) {
        // 激活分支和新分支进行 diff
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        suspense.resolve(true)
      } else {
        // 挂载新分支到隐藏分支
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        if (suspense.deps &lt;= 0) {
          suspense.resolve()
        }
      }
    }
  } else {
    if (activeBranch &amp;&amp; isSameVNodeType(newBranch, activeBranch)) {
      // activeBranch 和 newBranch 进行 diff
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      setActiveBranch(suspense, newBranch)
    } else {
      // ...
      // 挂载新分支到隐藏分支
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      // ...
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数核心作用是通过判断 <code>ssConent</code>、<code>ssFallback</code>、<code>pendingBranch</code>、<code>activeBranch</code> 的内容，进行不同条件的 <code>diff</code>。 <code>diff</code> 完成后的工作和上面初始化的过程是大致一样的，会进行异步依赖 <code>deps</code> 数目的判断，如果没有依赖 <code>deps</code> 则直接进行 <code>suspense.resolve</code>。</p><p>该函数看起来分支逻辑比较多，我们可以通过一个简单的脑图捋顺其中的逻辑：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1d3dceb3cf84c509c458a291fb45fc6~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>这里我们详细介绍了 <code>&lt;Suspense&gt;</code> 组件的实现原理，本质上就是通过一个计数器 <code>deps</code> 来记录需要被处理的依赖数量，当异步状态执行完成后，响应的计数器进行递减，当所有 <code>deps</code> 清空时，则达到统一完成态。于此同时，如果有父子嵌套的情况出现，会根据父节点的 <code>suspense</code> 状态来判断是否需要统一处理 <code>effects</code>。</p><p>最后，<code>&lt;Suspense&gt;</code> 组件到目前为止，还是一个实验性的功能，这也意味着这个功能在后续迭代中可能会被随时调整，作者也会持续关注组件的变更。</p>`,55),c=[t];function i(o,l){return s(),a("div",null,c)}const d=n(p,[["render",i],["__file","19 nazhizujian：Suspense yuanliyuyibu.html.vue"]]);export{d as default};
