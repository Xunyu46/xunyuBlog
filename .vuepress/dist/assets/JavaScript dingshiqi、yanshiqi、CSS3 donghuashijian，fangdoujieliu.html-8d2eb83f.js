const l=JSON.parse('{"key":"v-14224082","path":"/blogs/web/javascript/JavaScript dingshiqi、yanshiqi、CSS3 donghuashijian，fangdoujieliu.html","title":"JavaScript 定时器、延时器、CSS3 动画事件，防抖节流","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、定时器与延时器","slug":"一、定时器与延时器","link":"#一、定时器与延时器","children":[{"level":3,"title":"1、setInterval() 与 clearInterval()","slug":"_1、setinterval-与-clearinterval","link":"#_1、setinterval-与-clearinterval","children":[]},{"level":3,"title":"2、setTimeout() 与 clearTimeout()","slug":"_2、settimeout-与-cleartimeout","link":"#_2、settimeout-与-cleartimeout","children":[]},{"level":3,"title":"3、定时器中 this 问题","slug":"_3、定时器中-this-问题","link":"#_3、定时器中-this-问题","children":[]},{"level":3,"title":"4、队列","slug":"_4、队列","link":"#_4、队列","children":[]},{"level":3,"title":"4.1、用 JS 来实现一个队列","slug":"_4-1、用-js-来实现一个队列","link":"#_4-1、用-js-来实现一个队列","children":[]},{"level":3,"title":"4.2、优化版本","slug":"_4-2、优化版本","link":"#_4-2、优化版本","children":[]},{"level":3,"title":"5、单线程、同步与异步","slug":"_5、单线程、同步与异步","link":"#_5、单线程、同步与异步","children":[]},{"level":3,"title":"5.1、第一种情况：同步执行任务","slug":"_5-1、第一种情况-同步执行任务","link":"#_5-1、第一种情况-同步执行任务","children":[]},{"level":3,"title":"5.2、第二种情况：同步与异步结合执行任务","slug":"_5-2、第二种情况-同步与异步结合执行任务","link":"#_5-2、第二种情况-同步与异步结合执行任务","children":[]},{"level":3,"title":"5.3、JS 执行中遇到异步任务如何处理","slug":"_5-3、js-执行中遇到异步任务如何处理","link":"#_5-3、js-执行中遇到异步任务如何处理","children":[]},{"level":3,"title":"5.4、setInterval 和 setTimeout 是两个异步语句","slug":"_5-4、setinterval-和-settimeout-是两个异步语句","link":"#_5-4、setinterval-和-settimeout-是两个异步语句","children":[]},{"level":3,"title":"5.5、异步的应用场景","slug":"_5-5、异步的应用场景","link":"#_5-5、异步的应用场景","children":[]},{"level":3,"title":"6、定时器实现动画","slug":"_6、定时器实现动画","link":"#_6、定时器实现动画","children":[]},{"level":3,"title":"6.1、案例 1：实现变色小球","slug":"_6-1、案例-1-实现变色小球","link":"#_6-1、案例-1-实现变色小球","children":[]},{"level":3,"title":"6.2、案例 2：匀速运动 - 向右","slug":"_6-2、案例-2-匀速运动-向右","link":"#_6-2、案例-2-匀速运动-向右","children":[]},{"level":3,"title":"6.3、案例 3：匀速水平（向左或向右）","slug":"_6-3、案例-3-匀速水平-向左或向右","link":"#_6-3、案例-3-匀速水平-向左或向右","children":[]},{"level":3,"title":"6.4、案例 3：减速运动 - 向右","slug":"_6-4、案例-3-减速运动-向右","link":"#_6-4、案例-3-减速运动-向右","children":[]},{"level":3,"title":"6.5、案例 4：减速运动 - 水平（向左或向右）","slug":"_6-5、案例-4-减速运动-水平-向左或向右","link":"#_6-5、案例-4-减速运动-水平-向左或向右","children":[]},{"level":3,"title":"6.6、案例 6：动画函数添加回调函数","slug":"_6-6、案例-6-动画函数添加回调函数","link":"#_6-6、案例-6-动画函数添加回调函数","children":[]},{"level":3,"title":"6.7、案例 7：多属性减速运动","slug":"_6-7、案例-7-多属性减速运动","link":"#_6-7、案例-7-多属性减速运动","children":[]},{"level":3,"title":"6.8、案例 8：限定时间动画","slug":"_6-8、案例-8-限定时间动画","link":"#_6-8、案例-8-限定时间动画","children":[]},{"level":3,"title":"6.9、案例 9：多属性限定时间动画","slug":"_6-9、案例-9-多属性限定时间动画","link":"#_6-9、案例-9-多属性限定时间动画","children":[]},{"level":3,"title":"7、带左右按扭的自动切换轮播效果","slug":"_7、带左右按扭的自动切换轮播效果","link":"#_7、带左右按扭的自动切换轮播效果","children":[]}]},{"level":2,"title":"二、定时器延迟执行与丢帧问题","slug":"二、定时器延迟执行与丢帧问题","link":"#二、定时器延迟执行与丢帧问题","children":[{"level":3,"title":"1、屏幕刷新频率","slug":"_1、屏幕刷新频率","link":"#_1、屏幕刷新频率","children":[]},{"level":3,"title":"2、动画实现原理","slug":"_2、动画实现原理","link":"#_2、动画实现原理","children":[]},{"level":3,"title":"3、setInterval 实现动画原理","slug":"_3、setinterval-实现动画原理","link":"#_3、setinterval-实现动画原理","children":[]},{"level":3,"title":"4、setTimeout 实现动画原理","slug":"_4、settimeout-实现动画原理","link":"#_4、settimeout-实现动画原理","children":[]},{"level":3,"title":"5、动画动画卡顿、抖动现象","slug":"_5、动画动画卡顿、抖动现象","link":"#_5、动画动画卡顿、抖动现象","children":[]},{"level":3,"title":"6、总结：定时器执行动画卡顿、抖动原理","slug":"_6、总结-定时器执行动画卡顿、抖动原理","link":"#_6、总结-定时器执行动画卡顿、抖动原理","children":[]}]},{"level":2,"title":"三、requestAnimationFrame","slug":"三、requestanimationframe","link":"#三、requestanimationframe","children":[{"level":3,"title":"1、requestAnimationFrame 用法","slug":"_1、requestanimationframe-用法","link":"#_1、requestanimationframe-用法","children":[]},{"level":3,"title":"2、requestAnimationFrame 实现动画原理","slug":"_2、requestanimationframe-实现动画原理","link":"#_2、requestanimationframe-实现动画原理","children":[]},{"level":3,"title":"3、cancelAnimationFrame","slug":"_3、cancelanimationframe","link":"#_3、cancelanimationframe","children":[]},{"level":3,"title":"4、requestAnimationFrame 注意事项","slug":"_4、requestanimationframe-注意事项","link":"#_4、requestanimationframe-注意事项","children":[]},{"level":3,"title":"5、requestAnimationFrame 方法实现动画","slug":"_5、requestanimationframe-方法实现动画","link":"#_5、requestanimationframe-方法实现动画","children":[]},{"level":3,"title":"6、优雅降级 - 处理兼容问题","slug":"_6、优雅降级-处理兼容问题","link":"#_6、优雅降级-处理兼容问题","children":[]}]},{"level":2,"title":"四、函数节流（经典面试题）","slug":"四、函数节流-经典面试题","link":"#四、函数节流-经典面试题","children":[{"level":3,"title":"1、未节流前，mousemove 事件处理函数的执行次数","slug":"_1、未节流前-mousemove-事件处理函数的执行次数","link":"#_1、未节流前-mousemove-事件处理函数的执行次数","children":[]},{"level":3,"title":"2、对 mousemove 事件处理函数执行节流操作后，其执行次数","slug":"_2、对-mousemove-事件处理函数执行节流操作后-其执行次数","link":"#_2、对-mousemove-事件处理函数执行节流操作后-其执行次数","children":[]},{"level":3,"title":"3、抽离节流相关代码，封装成节流函数","slug":"_3、抽离节流相关代码-封装成节流函数","link":"#_3、抽离节流相关代码-封装成节流函数","children":[]},{"level":3,"title":"4、ES5 版本 - 节流函数","slug":"_4、es5-版本-节流函数","link":"#_4、es5-版本-节流函数","children":[]},{"level":3,"title":"5、ES6 版本 - 节流函数","slug":"_5、es6-版本-节流函数","link":"#_5、es6-版本-节流函数","children":[]},{"level":3,"title":"6、案例：规定时间内只能操作一次","slug":"_6、案例-规定时间内只能操作一次","link":"#_6、案例-规定时间内只能操作一次","children":[]}]},{"level":2,"title":"五、CSS3 动画效果开发","slug":"五、css3-动画效果开发","link":"#五、css3-动画效果开发","children":[{"level":3,"title":"1、JS 结合 CSS3 的 transition 实现动画","slug":"_1、js-结合-css3-的-transition-实现动画","link":"#_1、js-结合-css3-的-transition-实现动画","children":[]},{"level":3,"title":"2、动画的优化","slug":"_2、动画的优化","link":"#_2、动画的优化","children":[]},{"level":3,"title":"3、过渡事件","slug":"_3、过渡事件","link":"#_3、过渡事件","children":[]},{"level":3,"title":"4、利用 transitionend 事件，优化最开始的双向切换动画","slug":"_4、利用-transitionend-事件-优化最开始的双向切换动画","link":"#_4、利用-transitionend-事件-优化最开始的双向切换动画","children":[]},{"level":3,"title":"5、二级伸缩菜单","slug":"_5、二级伸缩菜单","link":"#_5、二级伸缩菜单","children":[]},{"level":3,"title":"6、动画事件","slug":"_6、动画事件","link":"#_6、动画事件","children":[]},{"level":3,"title":"7、案例 1：JS 结合 CSS3 实现转盘抽奖","slug":"_7、案例-1-js-结合-css3-实现转盘抽奖","link":"#_7、案例-1-js-结合-css3-实现转盘抽奖","children":[]},{"level":3,"title":"8、案例 2：JS 结合 CSS3 实现红包雨","slug":"_8、案例-2-js-结合-css3-实现红包雨","link":"#_8、案例-2-js-结合-css3-实现红包雨","children":[]},{"level":3,"title":"8.1、布局实现思路","slug":"_8-1、布局实现思路","link":"#_8-1、布局实现思路","children":[]},{"level":3,"title":"8.2、JS 实现思路","slug":"_8-2、js-实现思路","link":"#_8-2、js-实现思路","children":[]},{"level":3,"title":"8.3、完整源代码","slug":"_8-3、完整源代码","link":"#_8-3、完整源代码","children":[]}]},{"level":2,"title":"六、JS 实现拖拽动画","slug":"六、js-实现拖拽动画","link":"#六、js-实现拖拽动画","children":[{"level":3,"title":"1、案例 1：拖拽动画","slug":"_1、案例-1-拖拽动画","link":"#_1、案例-1-拖拽动画","children":[]},{"level":3,"title":"1.1、封装 drag 方法 一","slug":"_1-1、封装-drag-方法-一","link":"#_1-1、封装-drag-方法-一","children":[]},{"level":3,"title":"1.2、封装 drag 方法 二","slug":"_1-2、封装-drag-方法-二","link":"#_1-2、封装-drag-方法-二","children":[]},{"level":3,"title":"2、案例 2：拖拽交换两元素位置","slug":"_2、案例-2-拖拽交换两元素位置","link":"#_2、案例-2-拖拽交换两元素位置","children":[]},{"level":3,"title":"2.1、布局实现","slug":"_2-1、布局实现","link":"#_2-1、布局实现","children":[]},{"level":3,"title":"2.2、布局转换","slug":"_2-2、布局转换","link":"#_2-2、布局转换","children":[]},{"level":3,"title":"2.3、JS 实现：拖拽效果","slug":"_2-3、js-实现-拖拽效果","link":"#_2-3、js-实现-拖拽效果","children":[]},{"level":3,"title":"2.4、JS 实现：碰撞检测，同时找出碰撞元素中离自己最近的元素","slug":"_2-4、js-实现-碰撞检测-同时找出碰撞元素中离自己最近的元素","link":"#_2-4、js-实现-碰撞检测-同时找出碰撞元素中离自己最近的元素","children":[]},{"level":3,"title":"2.5、JS 实现：在碰上时，松开鼠标，交换两元素位置","slug":"_2-5、js-实现-在碰上时-松开鼠标-交换两元素位置","link":"#_2-5、js-实现-在碰上时-松开鼠标-交换两元素位置","children":[]},{"level":3,"title":"2.6、JS 实现：元素过渡动画结束后要处理的事","slug":"_2-6、js-实现-元素过渡动画结束后要处理的事","link":"#_2-6、js-实现-元素过渡动画结束后要处理的事","children":[]},{"level":3,"title":"2.7、完整版代码","slug":"_2-7、完整版代码","link":"#_2-7、完整版代码","children":[]}]},{"level":2,"title":"七、综合应用实践案例","slug":"七、综合应用实践案例","link":"#七、综合应用实践案例","children":[{"level":3,"title":"1、案例 3：键盘控制元素运动","slug":"_1、案例-3-键盘控制元素运动","link":"#_1、案例-3-键盘控制元素运动","children":[]},{"level":3,"title":"2、案例 4：表单全选和取消","slug":"_2、案例-4-表单全选和取消","link":"#_2、案例-4-表单全选和取消","children":[]},{"level":3,"title":"2.1、布局实现源码","slug":"_2-1、布局实现源码","link":"#_2-1、布局实现源码","children":[]},{"level":3,"title":"2.2、JS 实现思路","slug":"_2-2、js-实现思路","link":"#_2-2、js-实现思路","children":[]},{"level":3,"title":"3、案例 5：表单验证提示效果","slug":"_3、案例-5-表单验证提示效果","link":"#_3、案例-5-表单验证提示效果","children":[]},{"level":3,"title":"3.1、布局实现源码","slug":"_3-1、布局实现源码","link":"#_3-1、布局实现源码","children":[]},{"level":3,"title":"3.2、JS 实现思路","slug":"_3-2、js-实现思路","link":"#_3-2、js-实现思路","children":[]},{"level":3,"title":"4、案例 6：放大镜效果","slug":"_4、案例-6-放大镜效果","link":"#_4、案例-6-放大镜效果","children":[]},{"level":3,"title":"4.1、CSS 布局","slug":"_4-1、css-布局","link":"#_4-1、css-布局","children":[]},{"level":3,"title":"4.2、JS 实现思路","slug":"_4-2、js-实现思路","link":"#_4-2、js-实现思路","children":[]},{"level":3,"title":"4.3、完整版代码实现","slug":"_4-3、完整版代码实现","link":"#_4-3、完整版代码实现","children":[]},{"level":3,"title":"4.4、性能优化版","slug":"_4-4、性能优化版","link":"#_4-4、性能优化版","children":[]}]},{"level":2,"title":"八、手写防抖函数（经典面试题）","slug":"八、手写防抖函数-经典面试题","link":"#八、手写防抖函数-经典面试题","children":[{"level":3,"title":"1、什么是防抖 ？","slug":"_1、什么是防抖","link":"#_1、什么是防抖","children":[]},{"level":3,"title":"2、搜索查询 - 未实现防抖前效果","slug":"_2、搜索查询-未实现防抖前效果","link":"#_2、搜索查询-未实现防抖前效果","children":[]},{"level":3,"title":"3、搜索查询 - 实现防抖后效果","slug":"_3、搜索查询-实现防抖后效果","link":"#_3、搜索查询-实现防抖后效果","children":[]},{"level":3,"title":"4、抽离防抖相关代码，封装成防抖函数","slug":"_4、抽离防抖相关代码-封装成防抖函数","link":"#_4、抽离防抖相关代码-封装成防抖函数","children":[]},{"level":3,"title":"5、ES5 版本 - 防抖函数","slug":"_5、es5-版本-防抖函数","link":"#_5、es5-版本-防抖函数","children":[]},{"level":3,"title":"6、ES6 版本 - 防抖函数","slug":"_6、es6-版本-防抖函数","link":"#_6、es6-版本-防抖函数","children":[]},{"level":3,"title":"7、区分防抖与节流","slug":"_7、区分防抖与节流","link":"#_7、区分防抖与节流","children":[]}]},{"level":2,"title":"九、重难点总结","slug":"九、重难点总结","link":"#九、重难点总结","children":[{"level":3,"title":"1、重点","slug":"_1、重点","link":"#_1、重点","children":[]},{"level":3,"title":"2、难点","slug":"_2、难点","link":"#_2、难点","children":[]}]}],"git":{"createdTime":1705051907000,"updatedTime":1705051907000,"contributors":[{"name":"xunyu","email":"2548126293@qq.com","commits":1}]},"filePathRelative":"blogs/web/javascript/JavaScript 定时器、延时器、CSS3 动画事件，防抖节流.md"}');export{l as data};
