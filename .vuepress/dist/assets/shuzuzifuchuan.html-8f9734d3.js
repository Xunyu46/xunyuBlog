import{_ as p,r as t,o,c,b as n,d as s,e as i,a}from"./app-48690364.js";const l="/assets/image-20231125210912028-8723e616.png",u="/assets/image-20231129121824407-d51e56e4.png",r="/assets/image-20231201211357013-9a8b76b4.png",d={},k=a('<h1 id="数组-字符串" tabindex="-1"><a class="header-anchor" href="#数组-字符串" aria-hidden="true">#</a> 数组/字符串</h1><h2 id="_1-88-合并两个有序数组" tabindex="-1"><a class="header-anchor" href="#_1-88-合并两个有序数组" aria-hidden="true">#</a> 1. 88. 合并两个有序数组</h2><p><img src="'+l+`" alt="image-20231125210912028"></p><h3 id="思路1" tabindex="-1"><a class="header-anchor" href="#思路1" aria-hidden="true">#</a> 思路1</h3><ul><li>最简单的方法就是将数组nums2放进数组nums1的尾部，然后直接对整个数组进行排序</li></ul><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums1</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">m</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums2</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">n</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span> Do not return anything, modify nums1 in-place instead.
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将nums2放到nums1的尾部，使用数组的splice函数</span>
    <span class="token comment">// Array.splice()的语法 splice(start, deleteCount, item1, item2, itemN)</span>
    nums1<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span>nums1<span class="token punctuation">.</span>length<span class="token operator">-</span>m<span class="token punctuation">,</span><span class="token operator">...</span>nums2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    nums1<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>a<span class="token operator">-</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="思路2" tabindex="-1"><a class="header-anchor" href="#思路2" aria-hidden="true">#</a> 思路2</h3><ul><li>使用双指针，将两个数组看作队列，每次从两个数组头部取出比较小的数字放到结果中</li><li>我们为两个数组分别设置一个指针p1与p2来作为队列的头部指针</li></ul><h3 id="代码-1" tabindex="-1"><a class="header-anchor" href="#代码-1" aria-hidden="true">#</a> 代码</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums1</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">m</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums2</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">n</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span> Do not return anything, modify nums1 in-place instead.
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> p1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> p2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 初始化一个新的数组，填充为0</span>
    <span class="token keyword">const</span> sorted <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>m <span class="token operator">+</span> n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> cur<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>p1 <span class="token operator">&lt;</span> m <span class="token operator">||</span> p2 <span class="token operator">&lt;</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>p1 <span class="token operator">===</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cur <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p2 <span class="token operator">===</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cur <span class="token operator">=</span> nums1<span class="token punctuation">[</span>p1<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nums1<span class="token punctuation">[</span>p1<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums2<span class="token punctuation">[</span>p2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cur <span class="token operator">=</span> nums1<span class="token punctuation">[</span>p1<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            cur <span class="token operator">=</span> nums2<span class="token punctuation">[</span>p2<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        sorted<span class="token punctuation">[</span>p1 <span class="token operator">+</span> p2 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> cur<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> m <span class="token operator">+</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> sorted<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="思路3" tabindex="-1"><a class="header-anchor" href="#思路3" aria-hidden="true">#</a> 思路3</h3><ul><li>我们在思路2中之所以要使用临时变量，是因为如果直接合并到数组nums1中，nums1中的元素可能会在取出之前被覆盖。那么如何直接避免覆盖nums1中的元素呢？，观察可知，nums1的后半部分是空的，可以直接覆盖而不会影响结果。因此可以指针设置为从后向前遍历，每次取两者中的较大者放进nums1的后面</li></ul><h3 id="代码-2" tabindex="-1"><a class="header-anchor" href="#代码-2" aria-hidden="true">#</a> 代码</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums1</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">m</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">nums2</span>
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">n</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">void</span><span class="token punctuation">}</span></span> Do not return anything, modify nums1 in-place instead.
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">merge</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums1<span class="token punctuation">,</span> m<span class="token punctuation">,</span> nums2<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> p <span class="token operator">=</span> m<span class="token operator">+</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>n<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>m<span class="token operator">&gt;</span><span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums1<span class="token punctuation">[</span>m<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>nums2<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            nums1<span class="token punctuation">[</span>p<span class="token operator">--</span><span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>m<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            m<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            nums1<span class="token punctuation">[</span>p<span class="token operator">--</span><span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            n<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),m={id:"_2-27-移除元素",tabindex:"-1"},v=n("a",{class:"header-anchor",href:"#_2-27-移除元素","aria-hidden":"true"},"#",-1),b={href:"https://leetcode.cn/problems/remove-element/",target:"_blank",rel:"noopener noreferrer"},h=a('<p><img src="'+u+`" alt="image-20231129121824407"></p><h3 id="思路1-1" tabindex="-1"><a class="header-anchor" href="#思路1-1" aria-hidden="true">#</a> 思路1</h3><ul><li>使用双指针中的快慢指针</li><li>如果 <code>fast</code> 遇到需要去除的元素，则直接跳过，否则就告诉 <code>slow</code> 指针，并让 <code>slow</code> 前进一步。</li></ul><h3 id="代码-3" tabindex="-1"><a class="header-anchor" href="#代码-3" aria-hidden="true">#</a> 代码</h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let fast = 0, slow = 0;
    while (fast &lt; nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="思路2-1" tabindex="-1"><a class="header-anchor" href="#思路2-1" aria-hidden="true">#</a> 思路2</h3><ul><li>使用数组的indexOf函数和spilce函数</li><li>先使用indexOf找出数组中val项，然后利用spilces函数将val项删除</li></ul><h3 id="代码-4" tabindex="-1"><a class="header-anchor" href="#代码-4" aria-hidden="true">#</a> 代码</h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    while(nums.indexOf(val) !== -1){
        nums.splice(nums.indexOf(val),1);
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-26-删除有序数组中的重复项" tabindex="-1"><a class="header-anchor" href="#_3-26-删除有序数组中的重复项" aria-hidden="true">#</a> 3.26. 删除有序数组中的重复项</h2><p><img src="`+r+`" alt="image-20231201211357013"></p><h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h3><ul><li>有序序列去重的通用解法就是我们双指针技巧中的快慢指针技巧。</li><li>我们让慢指针 <code>slow</code> 走在后面，快指针 <code>fast</code> 走在前面探路，找到一个不重复的元素就告诉 <code>slow</code> 并让 <code>slow</code> 前进一步。这样当 <code>fast</code> 指针遍历完整个数组 <code>nums</code> 后，<strong><code>nums[0..slow]</code> 就是不重复元素</strong>。</li></ul><h3 id="代码-5" tabindex="-1"><a class="header-anchor" href="#代码-5" aria-hidden="true">#</a> 代码</h3><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
   if(nums.lengh === 0){
       return 0;
   }
   let fast = 0,slow = 0;
   while(fast &lt; nums.length){
       if(nums[fast] !== nums[slow]){
           slow++
           nums[slow] = nums[fast]
       }
       fast++
   }
   return slow+1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function f(w,g){const e=t("ExternalLinkIcon");return o(),c("div",null,[k,n("h2",m,[v,s(" 2. "),n("a",b,[s("27. 移除元素"),i(e)])]),h])}const _=p(d,[["render",f],["__file","shuzuzifuchuan.html.vue"]]);export{_ as default};