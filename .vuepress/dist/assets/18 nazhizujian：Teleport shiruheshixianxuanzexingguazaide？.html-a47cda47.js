import{_ as n,o as s,c as a,a as t}from"./app-48690364.js";const p={},e=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p><code>Teleport</code> 内置组件的功能是可以将一个组件内部的一部分 <code>vnode</code> 元素 “传送” 到该组件的 <code>DOM</code> 结构外层的位置去挂载。那什么情况下可能会用到该组件呢？如果开发过组件库的小伙伴可能深有体会，当我们开发全局 <code>Dialog</code> 组件来说，我们希望 <code>Dialog</code> 的组件可以渲染到全局 <code>&lt;body&gt;</code> 标签上，这个时候我们写的 <code>Dialog</code> 组件的源代码可能是这样的：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 这里是 dialog 组件的容器逻辑 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 在 dom 被挂载完成后，再转移到 body 上</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">destroyed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 在组件被销毁之前，移除 DOM</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$el<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这么做确实可是实现挂载到特定容器中，但这样一方面让 <code>Dialog</code> 组件内部需要维护复杂的 <code>DOM</code> 节点转换的逻辑，另一方面导致了浏览器需要进行 <code>2</code> 次刷新操作，一次初始化挂载，一次迁移。</p><p>所以 <code>Vue 3</code> 很贴心的为我们了提供了 <code>Teleport</code> 组件，帮助我们以简便的方式<strong>高性能</strong>的完成节点的转移工作:</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>modal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Hello from the modal!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Teleport</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们将一起探秘 <code>Teleport</code> 组件是如何实现 “传送” 挂载的。</p><h2 id="teleport-的挂载" tabindex="-1"><a class="header-anchor" href="#teleport-的挂载" aria-hidden="true">#</a> Teleport 的挂载</h2><p>先来看看 <code>Teleport</code> 组件的源码定义：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> TeleportImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 组件标记</span>
  <span class="token literal-property property">__isTeleport</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  
  <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token comment">// ... </span>
    <span class="token comment">// 初始化的逻辑</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token comment">// 更新逻辑</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// 卸载的逻辑</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 移动的逻辑</span>
  <span class="token literal-property property">move</span><span class="token operator">:</span> moveTeleport<span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们看一下这个内部组件是如何实现组件挂载的，这块的逻辑集中在组件的 <code>process</code> 函数中，<code>process</code> 函数是在渲染器 <code>renderer</code> 的 <code>patch</code> 函数中被调用的，在前面渲染器章节中，我们提到过 <code>patch</code> 函数内部会根据 <code>vnode</code> 的 <code>type</code> 和 <code>shapeFlag</code> 的类型调用不同的处理函数，而 <code>&lt;Teleport&gt;</code> 组件的 <code>process</code> 正是在这里被判断调用的：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">patch</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> <span class="token operator">...</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
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
      <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TELEPORT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对 Teleport 节点进行处理</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后一起来看看 <code>process</code> 中是如何完成对 <code>Teleport</code> 中的节点进行挂载的，这里我们先只关注挂载逻辑，对于更新逻辑后面再介绍：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> TeleportImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 组件标记</span>
  <span class="token literal-property property">__isTeleport</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  
  <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> internals</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 从内在对象上结构关键功能函数</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mc</span><span class="token operator">:</span> mountChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">pc</span><span class="token operator">:</span> patchChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">pbc</span><span class="token operator">:</span> patchBlockChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">o</span><span class="token operator">:</span> <span class="token punctuation">{</span>insert<span class="token punctuation">,</span> querySelector<span class="token punctuation">,</span> createText<span class="token punctuation">,</span> createComment<span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token operator">=</span> internals
    
    <span class="token comment">// 是否禁用</span>
    <span class="token keyword">const</span> disabled <span class="token operator">=</span> <span class="token function">isTeleportDisabled</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>shapeFlag<span class="token punctuation">,</span> children<span class="token punctuation">,</span> dynamicChildren<span class="token punctuation">}</span> <span class="token operator">=</span> n2
    <span class="token comment">// 初始化的逻辑</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 向主视图中插入锚点</span>
      <span class="token keyword">const</span> placeholder <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>el <span class="token operator">=</span> __DEV__
        <span class="token operator">?</span> <span class="token function">createComment</span><span class="token punctuation">(</span><span class="token string">&#39;teleport start&#39;</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">createText</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> mainAnchor <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>anchor <span class="token operator">=</span> __DEV__
        <span class="token operator">?</span> <span class="token function">createComment</span><span class="token punctuation">(</span><span class="token string">&#39;teleport end&#39;</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">createText</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token function">insert</span><span class="token punctuation">(</span>placeholder<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
      <span class="token function">insert</span><span class="token punctuation">(</span>mainAnchor<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">)</span>
      <span class="token comment">// 获取需要挂载的位置元素，如果目标元素不存在于DOM中，则返回 null</span>
      <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token function">resolveTarget</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>props<span class="token punctuation">,</span> querySelector<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token comment">// 目标挂载节点的锚点</span>
      <span class="token keyword">const</span> targetAnchor <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>targetAnchor <span class="token operator">=</span> <span class="token function">createText</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token comment">// 如果存在目标元素</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将锚点插入到目标元素当中</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>targetAnchor<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
        isSVG <span class="token operator">=</span> isSVG <span class="token operator">||</span> <span class="token function">isTargetSVG</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      
      <span class="token keyword">const</span> <span class="token function-variable function">mount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">container</span><span class="token operator">:</span> RendererElement<span class="token punctuation">,</span> <span class="token literal-property property">anchor</span><span class="token operator">:</span> RendererNode</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// teleport 子节点需要是个数组</span>
        <span class="token comment">// 挂载子节点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">mountChildren</span><span class="token punctuation">(</span>
            children<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            anchor<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            isSVG<span class="token punctuation">,</span>
            slotScopeIds<span class="token punctuation">,</span>
            optimized
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 如果禁用 teleport 则直接挂载到当前渲染节点中</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>disabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">mount</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> mainAnchor<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 否则，以 targetAnchor 为参照物进行挂载</span>
        <span class="token function">mount</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> targetAnchor<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 进入更新逻辑</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们先不着急着看源码，我们先看看一个 <code>teleport</code> 节点在开发环境会被渲染成什么样子：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>body<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>modal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Hello from the modal!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Teleport</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的模版，的渲染结果如下：</p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085dc3ff6e4542e19324b723d9d51c5b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="80%"><p>可以看到，已经被渲染到 <code>body</code> 元素当中，除了这个变化外，之前的容器中，还多了两个额外的注释符：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--teleport start--&gt;</span>
<span class="token comment">&lt;!--teleport end--&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这下我们再来看看源码，或许就能更好的理解这些变化了。首先，在初始化中，会先创建两个占位符，分别是 <code>placeholder</code> 和 <code>mainAnchor</code> 然后再讲这两个占位符挂载到组件容器中，这两个占位符也就是上文中的注释节点。</p><p>接着又创建了一个目标节点的占位符 <code>targetAnchor</code> 这个则会被挂载到目标容器中，只不过这里是个文本节点，所以在 <code>DOM</code> 上没有体现出来，我们把这里稍微改一下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> targetAnchor <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>targetAnchor <span class="token operator">=</span> <span class="token function">createComment</span><span class="token punctuation">(</span><span class="token string">&#39;teleport target&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样再看一下 <code>DOM</code> 的渲染结果：</p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb70396b873b42deae16088c43b4a009~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" width="80%"><p>最后再根据 <code>disabled</code> 这个 <code>props</code> 属性来判断当前的节点需要采用哪种方式渲染，如果 <code>disabled = true</code> 则会以 <code>mainAnchor</code> 为参考节点进行挂载，也就是挂载到主容器中，否则会以 <code>targetAnchor</code> 为参考节点进行挂载，挂载到目标元素容器中。至此，完成节点的初始化挂载逻辑。</p><h2 id="teleport-的更新" tabindex="-1"><a class="header-anchor" href="#teleport-的更新" aria-hidden="true">#</a> Teleport 的更新</h2><p>如果 <code>Teleport</code> 组件需要进行更新，则会进入更新的逻辑：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> TeleportImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 组件标记</span>
  <span class="token literal-property property">__isTeleport</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  
  <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> isSVG<span class="token punctuation">,</span> slotScopeIds<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> internals</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 从内在对象上结构关键功能函数</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mc</span><span class="token operator">:</span> mountChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">pc</span><span class="token operator">:</span> patchChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">pbc</span><span class="token operator">:</span> patchBlockChildren<span class="token punctuation">,</span>
      <span class="token literal-property property">o</span><span class="token operator">:</span> <span class="token punctuation">{</span>insert<span class="token punctuation">,</span> querySelector<span class="token punctuation">,</span> createText<span class="token punctuation">,</span> createComment<span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token operator">=</span> internals
    
    <span class="token comment">// 是否禁用</span>
    <span class="token keyword">const</span> disabled <span class="token operator">=</span> <span class="token function">isTeleportDisabled</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>shapeFlag<span class="token punctuation">,</span> children<span class="token punctuation">,</span> dynamicChildren<span class="token punctuation">}</span> <span class="token operator">=</span> n2
    <span class="token comment">// 初始化的逻辑</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 从老节点上获取相关参照系等属性</span>
      n2<span class="token punctuation">.</span>el <span class="token operator">=</span> n1<span class="token punctuation">.</span>el
      <span class="token keyword">const</span> mainAnchor <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>anchor <span class="token operator">=</span> n1<span class="token punctuation">.</span>anchor<span class="token punctuation">)</span><span class="token operator">!</span>
      <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>target <span class="token operator">=</span> n1<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token operator">!</span>
      <span class="token keyword">const</span> targetAnchor <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>targetAnchor <span class="token operator">=</span> n1<span class="token punctuation">.</span>targetAnchor<span class="token punctuation">)</span><span class="token operator">!</span>
      <span class="token comment">// 之前是不是禁用态  </span>
      <span class="token keyword">const</span> wasDisabled <span class="token operator">=</span> <span class="token function">isTeleportDisabled</span><span class="token punctuation">(</span>n1<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
      <span class="token comment">// 当前的渲染容器</span>
      <span class="token keyword">const</span> currentContainer <span class="token operator">=</span> wasDisabled <span class="token operator">?</span> container <span class="token operator">:</span> target
      <span class="token comment">// 参照节点</span>
      <span class="token keyword">const</span> currentAnchor <span class="token operator">=</span> wasDisabled <span class="token operator">?</span> mainAnchor <span class="token operator">:</span> targetAnchor
      isSVG <span class="token operator">=</span> isSVG <span class="token operator">||</span> <span class="token function">isTargetSVG</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
      <span class="token comment">// 通过 dynamicChildren 更新节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dynamicChildren<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// fast path when the teleport happens to be a block root</span>
        <span class="token function">patchBlockChildren</span><span class="token punctuation">(</span>
          n1<span class="token punctuation">.</span>dynamicChildren<span class="token operator">!</span><span class="token punctuation">,</span>
          dynamicChildren<span class="token punctuation">,</span>
          currentContainer<span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          slotScopeIds
        <span class="token punctuation">)</span>
        <span class="token function">traverseStaticChildren</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>optimized<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 全量更新</span>
        <span class="token function">patchChildren</span><span class="token punctuation">(</span>
          n1<span class="token punctuation">,</span>
          n2<span class="token punctuation">,</span>
          currentContainer<span class="token punctuation">,</span>
          currentAnchor<span class="token punctuation">,</span>
          parentComponent<span class="token punctuation">,</span>
          parentSuspense<span class="token punctuation">,</span>
          isSVG<span class="token punctuation">,</span>
          slotScopeIds<span class="token punctuation">,</span>
          <span class="token boolean">false</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  
      <span class="token keyword">if</span> <span class="token punctuation">(</span>disabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>wasDisabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// enabled -&gt; disabled</span>
          <span class="token comment">// 移动回主容器</span>
          <span class="token function">moveTeleport</span><span class="token punctuation">(</span>
            n2<span class="token punctuation">,</span>
            container<span class="token punctuation">,</span>
            mainAnchor<span class="token punctuation">,</span>
            internals<span class="token punctuation">,</span>
            TeleportMoveTypes<span class="token punctuation">.</span><span class="token constant">TOGGLE</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 目标元素被改变</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>n2<span class="token punctuation">.</span>props <span class="token operator">&amp;&amp;</span> n2<span class="token punctuation">.</span>props<span class="token punctuation">.</span>to<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token punctuation">(</span>n1<span class="token punctuation">.</span>props <span class="token operator">&amp;&amp;</span> n1<span class="token punctuation">.</span>props<span class="token punctuation">.</span>to<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 获取新的目标元素</span>
          <span class="token keyword">const</span> nextTarget <span class="token operator">=</span> <span class="token punctuation">(</span>n2<span class="token punctuation">.</span>target <span class="token operator">=</span> <span class="token function">resolveTarget</span><span class="token punctuation">(</span>
            n2<span class="token punctuation">.</span>props<span class="token punctuation">,</span>
            querySelector
          <span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token comment">// 移动到新的元素当中</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>nextTarget<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">moveTeleport</span><span class="token punctuation">(</span>
              n2<span class="token punctuation">,</span>
              nextTarget<span class="token punctuation">,</span>
              <span class="token keyword">null</span><span class="token punctuation">,</span>
              internals<span class="token punctuation">,</span>
              TeleportMoveTypes<span class="token punctuation">.</span><span class="token constant">TARGET_CHANGE</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>wasDisabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// disabled -&gt; enabled</span>
          <span class="token comment">// 移动到目标元素中</span>
          <span class="token function">moveTeleport</span><span class="token punctuation">(</span>
            n2<span class="token punctuation">,</span>
            target<span class="token punctuation">,</span>
            targetAnchor<span class="token punctuation">,</span>
            internals<span class="token punctuation">,</span>
            TeleportMoveTypes<span class="token punctuation">.</span><span class="token constant">TOGGLE</span>
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码量虽然挺多的，但所做的事情是特别明确的，首先 <code>Teleprot</code> 组件的更新需要和普通节点更新一样进行子节点的 <code>diff</code>。然后会判断 <code>Teleport</code> 组件的 <code>props</code> 是否有变更，主要就是 <code>disabled</code> 和 <code>to</code> 这两个参数。</p><p>如果 <code>disabled</code> 变化，无非就是从 <code>可用 -&gt; 不可用</code> 或者从 <code>不可用 -&gt; 可用</code>。从 <code>可用 -&gt; 不可用</code> 就是将原来挂在在 <code>target</code> 容器中的节点重新移动到主容器中，而从 <code>不可用 -&gt; 可用</code> 就是将主容器中的节点再挂载到 <code>target</code> 中。</p><p>如果 <code>to</code> 这个参数变化了，那么就需要重新寻找目标节点，再进行挂载。</p><h2 id="teleport-的移除" tabindex="-1"><a class="header-anchor" href="#teleport-的移除" aria-hidden="true">#</a> Teleport 的移除</h2><p>当组件卸载时，我们需要移除 <code>Teleport</code> 组件，一起再看看卸载重对于 <code>Teleport</code> 组件的处理：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">unmount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> doRemove<span class="token punctuation">,</span> optiomized</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">TELEPORT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vnode<span class="token punctuation">.</span>type<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>
      vnode<span class="token punctuation">,</span>
      parentComponent<span class="token punctuation">,</span>
      parentSuspense<span class="token punctuation">,</span>
      optimized<span class="token punctuation">,</span>
      internals<span class="token punctuation">,</span>
      doRemove
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>unmount</code> 卸载函数对于 <code>Teleport</code> 组件的处理就是直接调用 <code>remove</code> 方法：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> TeleportImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 组件标记</span>
  <span class="token literal-property property">__isTeleport</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> parentComponent<span class="token punctuation">,</span> parentSuspense<span class="token punctuation">,</span> optimized<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">um</span><span class="token operator">:</span> unmount<span class="token punctuation">,</span> <span class="token literal-property property">o</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">remove</span><span class="token operator">:</span> hostRemove <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> doRemove</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> shapeFlag<span class="token punctuation">,</span> children<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> targetAnchor<span class="token punctuation">,</span> target<span class="token punctuation">,</span> props <span class="token punctuation">}</span> <span class="token operator">=</span> vnode
    <span class="token comment">// 如果存在 target，移除 targetAnchor</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">hostRemove</span><span class="token punctuation">(</span>targetAnchor<span class="token operator">!</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 在未禁用状态下，需要卸载 teleport 的子元素</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>doRemove <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">isTeleportDisabled</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">hostRemove</span><span class="token punctuation">(</span>anchor<span class="token operator">!</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>shapeFlag <span class="token operator">&amp;</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ARRAY_CHILDREN</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> child <span class="token operator">=</span> children<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
          <span class="token function">unmount</span><span class="token punctuation">(</span>
            child<span class="token punctuation">,</span>
            parentComponent<span class="token punctuation">,</span>
            parentSuspense<span class="token punctuation">,</span>
            <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token operator">!</span><span class="token operator">!</span>child<span class="token punctuation">.</span>dynamicChildren
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>remove</code> 方法的操作，看起来也比较好理解，首先先移除掉 <code>targetAnchor</code> 锚点内容，然后再调用 <code>unmount</code> 函数挨个卸载子组件，从而完成卸载功能。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本小节，我们分析了 <code>Teleport</code> 组件的核心实现原理，<code>Teleport</code> 相比于之前的那种挂载方式他的性能优势就在于 <code>Teleport</code> 节点的挂载是在 <code>patch</code> 阶段进行的，也就是在 <code>patch</code> 阶段就确定了需要挂载到哪里，而不会出现先挂在到主容器再迁移到目标容器的情况。</p>`,40),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","18 nazhizujian：Teleport shiruheshixianxuanzexingguazaide？.html.vue"]]);export{r as default};
