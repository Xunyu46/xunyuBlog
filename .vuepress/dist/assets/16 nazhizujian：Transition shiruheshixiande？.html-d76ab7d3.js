import{_ as e,r as t,o as p,c as o,b as n,d as c,e as i,a as s}from"./app-48690364.js";const l={},u=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p><code>Vue</code> 内置了 <code>Trasition</code> 组件可以帮助我们快速简单的实现基于状态变换的动画效果。该组件支持了 <code>CSS 过渡动画</code>、<code>CSS 动画</code>、<code>Javascript 钩子</code> 几种模式，接下来我们将逐步介绍这几种模式的实现原理。</p><h2 id="基于-css-的过渡效果" tabindex="-1"><a class="header-anchor" href="#基于-css-的过渡效果" aria-hidden="true">#</a> 基于 CSS 的过渡效果</h2><p>我们先来看官网上一个简单的关于 <code>CSS Transiton</code> 过渡动画的示例： 以下是最基本用法的示例：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show = !show<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Toggle<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Transition</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Transition</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
  <span class="token selector">.v-enter-active,
  .v-leave-active</span> <span class="token punctuation">{</span>
    <span class="token property">transition</span><span class="token punctuation">:</span> opacity 0.5s ease<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.v-enter-from,
  .v-leave-to</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再来看看官网上对于这些类名的实现定义：</p><ol><li><code>v-enter-from</code>：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。</li><li><code>v-enter-active</code>：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 <code>class</code> 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。</li><li><code>v-enter-to</code>：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 <code>v-enter-from</code> 被移除的同时)，在过渡或动画完成之后移除。</li><li><code>v-leave-from</code>：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。</li><li><code>v-leave-active</code>：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。</li><li><code>v-leave-to</code>：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 <code>v-leave-from</code> 被移除的同时)，在过渡或动画完成之后移除。</li></ol><p>抛开源码不谈，如果在一个普通的 <code>Vue</code> 组件中，我们如何实现一个上述功能的过渡状态的 <code>CSS</code> 动画效果呢？按照官网上的定义，我们一起来尝试一下：</p>`,8),r={href:"https://code.juejin.cn/pen/7167177061931417630",target:"_blank",rel:"noopener noreferrer"},d=s(`<p>可以看到，我们参考官网的描述，也可以简单的实现一个基于 <code>css</code> 的过渡动画，但这里存在了几个问题：</p><ol><li>硬编码了 <code>transiton</code> 动画，没有实现 <code>animate</code> 动画。</li><li>不够抽象，难以复用到后续组件。</li></ol><p>接下来我们一起来看看 <code>Vue</code> 源码是如何实现的，首先找到关于 <code>Transition</code> 组件的定义：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">Transition</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span> slots <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>BaseTransition<span class="token punctuation">,</span> <span class="token function">resolveTransitionProps</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">,</span> slots<span class="token punctuation">)</span>

Transition<span class="token punctuation">.</span>displayName <span class="token operator">=</span> <span class="token string">&#39;Transition&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码很简单，<code>Transition</code> 组件是一个函数式组件，本身就是一个渲染函数。还记得我们之前说过吗，<code>Vue</code> 组件分为了有状态组件和函数组件，有状态组件内部会存储组件的状态，而函数组件不会。</p><p>我们知道 <code>Vue</code> 对 <code>Transtion</code> 内置组件的功能定义就是只是一个<strong>容器</strong>，一个搬运工，需要渲染 <code>DOM</code>，那就不需要 <code>template</code>，本身不需要维护任何状态。所以这里直接通过一个函数式组件定义了 <code>Transition</code> 组件。</p><p>接着，我们看到了该组件核心功能就是一个渲染 <code>BaseTransition</code> 组件，并为期传入<strong>处理好的 <code>props</code></strong> 和内部挂载的 <code>slot</code>。先来看看 <code>BaseTransition</code> 组件，这里我们只关心与 <code>CSS</code> 动画相关的逻辑。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> BaseTransitionImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">BaseTransition</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>

  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span> slots <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前渲染的组价实例</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token function">getCurrentInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">!</span>
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useTransitionState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token doc-comment comment">/**
       * 这里都是进入状态需要定义的内容
       */</span>
      <span class="token comment">// 获取子节点</span>
      <span class="token keyword">const</span> children <span class="token operator">=</span>
        slots<span class="token punctuation">.</span>default <span class="token operator">&amp;&amp;</span> <span class="token function">getTransitionRawChildren</span><span class="token punctuation">(</span>slots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>children <span class="token operator">||</span> <span class="token operator">!</span>children<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">let</span> child <span class="token operator">=</span> children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
      
      <span class="token comment">// 这里 props 不需要响应式追踪，为了更好的性能，去除响应式</span>
      <span class="token keyword">const</span> rawProps <span class="token operator">=</span> <span class="token function">toRaw</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> mode <span class="token punctuation">}</span> <span class="token operator">=</span> rawProps
      
      <span class="token comment">// 获取当前的容器节点</span>
      <span class="token keyword">const</span> innerChild <span class="token operator">=</span> <span class="token function">getKeepAliveChild</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>innerChild<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">emptyPlaceholder</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 获取进入状态的调用函数</span>
      <span class="token keyword">const</span> enterHooks <span class="token operator">=</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span>
        innerChild<span class="token punctuation">,</span>
        rawProps<span class="token punctuation">,</span>
        state<span class="token punctuation">,</span>
        instance
      <span class="token punctuation">)</span>
      
      <span class="token comment">// 为子节点添加进入 hooks 属性</span>
      <span class="token function">setTransitionHooks</span><span class="token punctuation">(</span>innerChild<span class="token punctuation">,</span> enterHooks<span class="token punctuation">)</span>
  
      <span class="token doc-comment comment">/**
       * 下面都是离开状态需要定义的内容
       */</span>
      <span class="token comment">// 离开状态中，之前的节点就是旧节点了</span>
      <span class="token keyword">const</span> oldChild <span class="token operator">=</span> instance<span class="token punctuation">.</span>subTree
      <span class="token keyword">const</span> oldInnerChild <span class="token operator">=</span> oldChild <span class="token operator">&amp;&amp;</span> <span class="token function">getKeepAliveChild</span><span class="token punctuation">(</span>oldChild<span class="token punctuation">)</span>

      <span class="token keyword">let</span> transitionKeyChanged <span class="token operator">=</span> <span class="token boolean">false</span>
     
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        oldInnerChild <span class="token operator">&amp;&amp;</span>
        oldInnerChild<span class="token punctuation">.</span>type <span class="token operator">!==</span> Comment <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isSameVNodeType</span><span class="token punctuation">(</span>innerChild<span class="token punctuation">,</span> oldInnerChild<span class="token punctuation">)</span> <span class="token operator">||</span> transitionKeyChanged<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取离开状态的调用函数</span>
        <span class="token keyword">const</span> leavingHooks <span class="token operator">=</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span>
          oldInnerChild<span class="token punctuation">,</span>
          rawProps<span class="token punctuation">,</span>
          state<span class="token punctuation">,</span>
          instance
        <span class="token punctuation">)</span>
        <span class="token comment">// 为子节点添加离开 hooks 属性</span>
        <span class="token function">setTransitionHooks</span><span class="token punctuation">(</span>oldInnerChild<span class="token punctuation">,</span> leavingHooks<span class="token punctuation">)</span>
        <span class="token comment">// out-in 模式状态切换</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mode <span class="token operator">===</span> <span class="token string">&#39;out-in&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          state<span class="token punctuation">.</span>isLeaving <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token comment">// 返回空的占位符节点，当离开过渡结束后，重新渲染组件</span>
          leavingHooks<span class="token punctuation">.</span><span class="token function-variable function">afterLeave</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            state<span class="token punctuation">.</span>isLeaving <span class="token operator">=</span> <span class="token boolean">false</span>
            <span class="token comment">// 当 active = false 时，被卸载状态不需要更新</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span>update<span class="token punctuation">.</span>active <span class="token operator">!==</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              instance<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            instance<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span> <span class="token function">emptyPlaceholder</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>mode <span class="token operator">===</span> <span class="token string">&#39;in-out&#39;</span> <span class="token operator">&amp;&amp;</span> innerChild<span class="token punctuation">.</span>type <span class="token operator">!==</span> Comment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// in-out 模式状态切换，延迟移除</span>
          leavingHooks<span class="token punctuation">.</span><span class="token function-variable function">delayLeave</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> earlyRemove<span class="token punctuation">,</span> delayedLeave</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 先缓存需要移除的节点</span>
            <span class="token keyword">const</span> leavingVNodesCache <span class="token operator">=</span> <span class="token function">getLeavingNodesForType</span><span class="token punctuation">(</span>
              state<span class="token punctuation">,</span>
              oldInnerChild
            <span class="token punctuation">)</span>
            leavingVNodesCache<span class="token punctuation">[</span><span class="token function">String</span><span class="token punctuation">(</span>oldInnerChild<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> oldInnerChild
            el<span class="token punctuation">.</span><span class="token function-variable function">_leaveCb</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
              <span class="token function">earlyRemove</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              el<span class="token punctuation">.</span>_leaveCb <span class="token operator">=</span> <span class="token keyword">undefined</span>
              <span class="token keyword">delete</span> enterHooks<span class="token punctuation">.</span>delayedLeave
            <span class="token punctuation">}</span>
            enterHooks<span class="token punctuation">.</span>delayedLeave <span class="token operator">=</span> delayedLeave
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 返回子节点</span>
      <span class="token keyword">return</span> child
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code>BaseTransitionImpl</code> 的 <code>setup</code> 函数，核心就干了三件事儿：</p><p><strong>Step 1:</strong> 为 <code>Transition</code> 下的子节点添加 <code>enterHooks</code>。</p><p><strong>Step 2:</strong> 为 <code>Transition</code> 下的子节点添加 <code>leavingHooks</code>。</p><p><strong>Step 3:</strong> 处理完成后直接返回子节点作为渲染内容。</p><p>那么，这些 <code>hooks</code> 到底做了些什么？以及这些 <code>hooks</code> 是在什么时候被执行的呢？我们一个个来看。</p><h3 id="_1-hooks-到底做了些什么" tabindex="-1"><a class="header-anchor" href="#_1-hooks-到底做了些什么" aria-hidden="true">#</a> 1. <code>hooks</code> 到底做了些什么？</h3><p>要回答这些 <code>hooks</code> 到底做了什么？首先需要了解这些 <code>hooks</code> 是从哪里来的。再回到上述源码，我们知道 <code>hooks</code> 是通过：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> leavingHooks <span class="token operator">=</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span>
  oldInnerChild<span class="token punctuation">,</span>
  rawProps<span class="token punctuation">,</span>
  state<span class="token punctuation">,</span>
  instance
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的函数调用产生的，现在我们先不讨论这个函数的具体实现，先看看该函数的入参，有一个 <code>rawProps</code> 的参数，这个就是上文所说的 <code>Transition</code> 组件 <code>render</code> 函数中传入的 <code>props</code> 参数。</p><p>接下来就需要分析 <code>props</code> 中有些什么东西：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">resolveTransitionProps</span><span class="token punctuation">(</span><span class="token parameter">rawProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> baseProps <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> rawProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> DOMTransitionPropsValidators<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      baseProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> rawProps<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    name <span class="token operator">=</span> <span class="token string">&#39;v&#39;</span><span class="token punctuation">,</span>
    type<span class="token punctuation">,</span>
    duration<span class="token punctuation">,</span>
    enterFromClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-enter-from</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    enterActiveClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-enter-active</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    enterToClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-enter-to</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    appearFromClass <span class="token operator">=</span> enterFromClass<span class="token punctuation">,</span>
    appearActiveClass <span class="token operator">=</span> enterActiveClass<span class="token punctuation">,</span>
    appearToClass <span class="token operator">=</span> enterToClass<span class="token punctuation">,</span>
    leaveFromClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-leave-from</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    leaveActiveClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-leave-active</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    leaveToClass <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-leave-to</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span> <span class="token operator">=</span> rawProps
  <span class="token comment">// ...</span>
  <span class="token keyword">return</span> <span class="token function">extend</span><span class="token punctuation">(</span>baseProps<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">onEnter</span><span class="token operator">:</span> <span class="token function">makeEnterHook</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">onLeave</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// ....</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据我们前面了解到的，<code>Vue</code> 会在特定阶段为节点增加或删除特定 <code>class</code>。而这个 <code>props</code> 正式为了所谓的 <strong>特定的阶段</strong> 量身打造的 <strong>钩子</strong> 函数。举个例子，我们需要实现进入节点的 <code>v-enter-from、v-enter-active、v-enter-to</code> 类名的添加，我们只需要在 <code>onEnter</code> 进入钩子内实现逻辑：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const makeEnterHook = (isAppear) =&gt; {
  return (el, done) =&gt; {
    // 移除 v-enter-to、v-enter-active 类名
    const resolve = () =&gt; finishEnter(el, isAppear, done)
    // 下一帧渲染时
    nextFrame(() =&gt; {
      // 删除 v-enter-from 类名
      removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass)
      // 添加 v-enter-to 类名
      addTransitionClass(el, isAppear ? appearToClass : enterToClass)
      // 动画结束时，执行 resolve 函数，即删除 v-enter-to、v-enter-active 类名
      if (!hasExplicitCallback(hook)) {
        whenTransitionEnds(el, type, enterDuration, resolve)
      }
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的流程是不是跟上面的描述一毛一样！</p><h3 id="_2-hooks-何时执行" tabindex="-1"><a class="header-anchor" href="#_2-hooks-何时执行" aria-hidden="true">#</a> 2. hooks 何时执行？</h3><p>前面我们提到 <code>hooks</code> 将会在特定时间执行，用来对 <code>class</code> 进行增加或删除。比如 <code>enter-from</code> 至 <code>enter-to</code> 阶段的过渡或者动画效果的 <code>class</code> 被添加到<code>DOM</code> 元素上。考虑到 <code>Vue</code> 在 <code>patch</code> 阶段已经有生成对应的 <code>DOM</code> （只不过还没有被真实的挂载到页面上而已）。所以我们只需要在 <code>patch</code> 阶段做对应的 <code>class</code> 增删即可。</p><p>比如进入阶段的钩子函数，将会在 <code>mountElement</code> 中被调用：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 挂载元素节点</span>
<span class="token keyword">const</span> <span class="token function-variable function">mountElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> el<span class="token punctuation">;</span>
  <span class="token keyword">let</span> vnodeHook<span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> shapeFlag<span class="token punctuation">,</span> transition<span class="token punctuation">,</span> patchFlag<span class="token punctuation">,</span> dirs <span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>needCallTransitionHooks<span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 执行 beforeEnter 钩子</span>
    transition<span class="token punctuation">.</span><span class="token function">beforeEnter</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>vnodeHook <span class="token operator">=</span> props <span class="token operator">&amp;&amp;</span> props<span class="token punctuation">.</span>onVnodeMounted<span class="token punctuation">)</span> <span class="token operator">||</span> needCallTransitionHooks <span class="token operator">||</span> dirs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// post 各种钩子 至后置执行任务池</span>
      <span class="token function">queuePostRenderEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> 
        <span class="token comment">// 执行 enter 钩子</span>
        needCallTransitionHooks <span class="token operator">&amp;&amp;</span> transition<span class="token punctuation">.</span><span class="token function">enter</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token punctuation">}</span><span class="token punctuation">,</span> parentSuspense<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>离开阶段的钩子函数，在 <code>remove</code> 节点的时候被调用：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 移除 Vnode</span>
<span class="token keyword">const</span> <span class="token function-variable function">remove</span> <span class="token operator">=</span> <span class="token parameter">vnode</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> type<span class="token punctuation">,</span> el<span class="token punctuation">,</span> anchor<span class="token punctuation">,</span> transition <span class="token punctuation">}</span> <span class="token operator">=</span> vnode<span class="token punctuation">;</span>
  <span class="token comment">// ...</span>

  <span class="token keyword">const</span> <span class="token function-variable function">performRemove</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">hostRemove</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>transition <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>transition<span class="token punctuation">.</span>persisted <span class="token operator">&amp;&amp;</span> transition<span class="token punctuation">.</span>afterLeave<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 执行 afterLeave 钩子</span>
      transition<span class="token punctuation">.</span><span class="token function">afterLeave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>shapeFlag <span class="token operator">&amp;</span> <span class="token number">1</span> ShapeFlags<span class="token punctuation">.</span><span class="token constant">ELEMENT</span> <span class="token operator">&amp;&amp;</span> transition <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>transition<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> leave<span class="token punctuation">,</span> delayLeave <span class="token punctuation">}</span> <span class="token operator">=</span> transition<span class="token punctuation">;</span>
    <span class="token comment">// 执行 leave 钩子</span>
    <span class="token keyword">const</span> <span class="token function-variable function">performLeave</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">leave</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> performRemove<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>delayLeave<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// 执行 delayLeave 钩子</span>
      <span class="token function">delayLeave</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>el<span class="token punctuation">,</span> performRemove<span class="token punctuation">,</span> performLeave<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">performLeave</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更加清晰的看懂这个流程，我画了个状态流转图，可以简单看一下，方便理解：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e286d7a4e5294b2c995b164d9dc102e8~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="javascript-钩子" tabindex="-1"><a class="header-anchor" href="#javascript-钩子" aria-hidden="true">#</a> JavaScript 钩子</h2><p><code>&lt;Transition&gt;</code> 组件在动画过渡的各个阶段定义了很多钩子函数，我们可以通过在钩子函数内部自定义实现各种动画效果。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Transition</span>
  <span class="token attr-name">@before-enter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onBeforeEnter<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@enter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onEnter<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@after-enter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onAfterEnter<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@enter-cancelled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onEnterCancelled<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@before-leave</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onBeforeLeave<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@leave</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onLeave<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@after-leave</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onAfterLeave<span class="token punctuation">&quot;</span></span>
  <span class="token attr-name">@leave-cancelled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onLeaveCancelled<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- ... --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Transition</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面其实已经稍微提及到了部分钩子函数，比如 <code>onEnter</code>，这些钩子函数在源码中会被合并到 <code>Transiton</code> 下子节点的 <code>transition</code> 属性上。这块的实现主要是通过 <code>setTransitionHooks</code> 函数来实现的：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> BaseTransitionImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">BaseTransition</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>

  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> <span class="token punctuation">{</span> slots <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// 获取进入状态的调用函数</span>
      <span class="token keyword">const</span> enterHooks <span class="token operator">=</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span>
        innerChild<span class="token punctuation">,</span>
        rawProps<span class="token punctuation">,</span>
        state<span class="token punctuation">,</span>
        instance
      <span class="token punctuation">)</span>
      
      <span class="token comment">// 为子节点添加进入 hooks 属性</span>
      <span class="token function">setTransitionHooks</span><span class="token punctuation">(</span>innerChild<span class="token punctuation">,</span> enterHooks<span class="token punctuation">)</span>
  
      <span class="token comment">// ...</span>
      <span class="token comment">// 返回子节点</span>
      <span class="token keyword">return</span> child
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 为 vnode 添加 transition 属性</span>
<span class="token keyword">function</span> <span class="token function">setTransitionHooks</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> hooks</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  vnode<span class="token punctuation">.</span>transition <span class="token operator">=</span> hooks
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>hooks</code> 包含了哪些内容呢？<code>hooks</code> 其实是通过 <code>resolveTransitionHooks</code> 函数调用生成的：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> props<span class="token punctuation">,</span> state<span class="token punctuation">,</span> instance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 传入的各个钩子函数</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>
    appear<span class="token punctuation">,</span>
    mode<span class="token punctuation">,</span>
    persisted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    onBeforeEnter<span class="token punctuation">,</span>
    onEnter<span class="token punctuation">,</span>
    onAfterEnter<span class="token punctuation">,</span>
    onEnterCancelled<span class="token punctuation">,</span>
    onBeforeLeave<span class="token punctuation">,</span>
    onLeave<span class="token punctuation">,</span>
    onAfterLeave<span class="token punctuation">,</span>
    onLeaveCancelled<span class="token punctuation">,</span>
    onBeforeAppear<span class="token punctuation">,</span>
    onAppear<span class="token punctuation">,</span>
    onAfterAppear<span class="token punctuation">,</span>
    onAppearCancelled
  <span class="token punctuation">}</span> <span class="token operator">=</span> props
  
  <span class="token comment">// 定义调用钩子函数的方法</span>
  <span class="token keyword">const</span> <span class="token function-variable function">callHook</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">hook<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    hook <span class="token operator">&amp;&amp;</span>
      <span class="token function">callWithAsyncErrorHandling</span><span class="token punctuation">(</span>
        hook<span class="token punctuation">,</span>
        instance<span class="token punctuation">,</span>
        ErrorCodes<span class="token punctuation">.</span><span class="token constant">TRANSITION_HOOK</span><span class="token punctuation">,</span>
        args
      <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 钩子函数定义</span>
  <span class="token keyword">const</span> hooks <span class="token operator">=</span> <span class="token punctuation">{</span>
    mode<span class="token punctuation">,</span>
    persisted<span class="token punctuation">,</span>
    <span class="token function">beforeEnter</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> hook <span class="token operator">=</span> onBeforeEnter
      <span class="token comment">// ...</span>
      <span class="token comment">// 执行 onBeforeEnter</span>
      <span class="token function">callHook</span><span class="token punctuation">(</span>hook<span class="token punctuation">,</span> <span class="token punctuation">[</span>el<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function">enter</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> hook <span class="token operator">=</span> onEnter
      <span class="token comment">// ...</span>
      <span class="token comment">// 执行 onEnter</span>
      <span class="token function">callAsyncHook</span><span class="token punctuation">(</span>hook<span class="token punctuation">,</span> <span class="token punctuation">[</span>el<span class="token punctuation">,</span> done<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function">leave</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> remove</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      <span class="token comment">// 执行 onBeforeLeave</span>
      <span class="token function">callHook</span><span class="token punctuation">(</span>onBeforeLeave<span class="token punctuation">,</span> <span class="token punctuation">[</span>el<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> done <span class="token operator">=</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function-variable function">_leaveCb</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">cancelled<span class="token operator">?</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token comment">// 执行 onLeave</span>
        <span class="token function">callAsyncHook</span><span class="token punctuation">(</span>onLeave<span class="token punctuation">,</span> <span class="token punctuation">[</span>el<span class="token punctuation">,</span> done<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token function">clone</span><span class="token punctuation">(</span><span class="token parameter">vnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">resolveTransitionHooks</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> props<span class="token punctuation">,</span> state<span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> hooks
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个最基础的 <code>hooks</code> 主要包含 <code>beforeEnter</code>、<code>enter</code>、<code>leave</code> 这几个阶段，将会在 <code>patch</code> 的环节中被执行，执行的逻辑就是 <code>Vue</code> 官网上描述的逻辑。</p><p>另外，值得注意的是，除了这几个关键阶段之外，<code>Transiton</code> 还支持一个 <code>mode</code> 来指定动画的过渡时机，举个例子，如果 <code>mode === &#39;out-in&#39;</code>，先执行离开动画，然后在其完成<strong>之后</strong>再执行元素的进入动画。那么这个时候就需要<strong>延迟渲染进入动画</strong>，则会为 <code>leavingHooks</code> 额外添加一个新的钩子：<code>afterLeave</code>，该钩子将会在离开后执行，表示着离开后再更新 <code>DOM</code>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">const</span> BaseTransitionImpl <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mode <span class="token operator">===</span> <span class="token string">&#39;out-in&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>isLeaving <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 返回空的占位符节点，当离开过渡结束后，重新渲染组件</span>
      leavingHooks<span class="token punctuation">.</span><span class="token function-variable function">afterLeave</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>isLeaving <span class="token operator">=</span> <span class="token boolean">false</span>
        instance<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">emptyPlaceholder</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本小节我们核心介绍了 <code>Transition</code> 内置组件的实现原理：</p><ol><li><code>Transition</code> 组件本身是一个无状态组件，内部本身不渲染任何额外的 <code>DOM</code> 元素，<code>Transition</code> 渲染的是组件嵌套的第一个子元素节点。</li><li>如果子元素是应用了 <code>CSS</code> 过渡或动画，<code>Transition</code> 组件会在子元素节点渲染适当时机，动态为子元素节点增加或删除对应的 <code>class</code>。</li><li>如果有为 <code>Transition</code> 定义一些钩子函数，那么这些钩子函数会被合入到子节点的关键生命周期 <code>beforeEnter</code>、<code>enter</code>、<code>leave</code> 中调用执行，通过 <code>setTransitionHooks</code> 被设置到子节点的 <code>transition</code> 属性中。</li></ol>`,43);function k(v,m){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[n("a",r,[c("代码片段"),i(a)])]),d])}const g=e(l,[["render",k],["__file","16 nazhizujian：Transition shiruheshixiande？.html.vue"]]);export{g as default};
