# JavaScript 核心基础，阶段测试题



汇总了部分 JavaScript 核心基础阶段的相关知识，作为同学们的 JS 基础阶段学习的自我检测使用，可先尝试再不查阅资料的情况下来完成。

> 待大家完成后，会更新答案

## 一、选择题



选择正确的答案，并给出答案解析

### 1、以下说法正确的是 ？（多选）

- A、`isNaN(1.23);`的返回结果为 false
- B、`isNaN(NaN)`的返回结果是 true
- C、`null === undefined` 返回结果为 true
- D、`Number('124a')` 返回结果为 124

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、 已知 `x=2、y=0、z=3` 以下选项中说法错误的是 ？（单选）

- A、`x||y||z`返回结果为 0
- B、`z&&y&&x` 返回结果为 0
- C、 `(y-z)%4` 返回结果为结果为 -3
- D、`(z++)+(--x)-y`返回结果为 4

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 3、以下代码运行后的最终结果是 ？（单选）

```js
var a = 2;
var b = a++;
console.log(++a);
console.log((b += ++a));
```

- A、3，6
- B、4，7
- C、4，6
- D、3，5

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 4、以下说法错误的是 ？（单选）

- A、二进制数`110011011` 转换为对应的 10 进制是一个偶数
- B、二进制数`110011011 >> 6`位，得到 10 进制 6
- C、`'5' == 5` 返回值为 true
- D、`null == undefined` 返回值为 true

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 5、以下代码的输出是 ？（单选）

```js
function fn(a, b, c) {
  console.log(a + b + c);
}
fn(1, 2);
```

- A、NaN
- B、 3
- C、`3+undefined`
- D、`1+2+undefined`

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 6、阅读下列代码，选择结论正确的有（多选）

```js
var str = "www.icodingedu.com";
console.log(str.substring(4, 13));
console.log(str.substring(-9, -4));
console.log(str.substring(-7, 4));
console.log(str.slice(-11, -4));
```

- A、第一个`console.log`打印出来 icodingedu
- B、第二个`console.log`打印出来是空
- C、第三个`console.log`打印现来的是 空
- D、第四个`console.log`打印出来的是 dingedu

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 7、以下代码的输出结果是 ？（单选）

```js
var person = {
  name: "xq",
  age: 18,
  address: "北京",
};
alert("toString" in person); // 结果是什么
alert("age" in person); // 结果是什么
```

- A、 true false
- B、 false false
- C、 true true
- D、 false true

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 8、以下代码输出的正确结果是 ？（单选）

```js
var myname = "清心";
function fn() {
  console.log(myname);
  var myname = "小红";
  function fn2() {
    myname = "小明";
  }
  fn2(myname);
  console.log(myname);
}
fn();
console.log(myname);
```

- A、清心、小红、清心
- B、清心、小明、清心
- C、undefined 、小红、清心
- D、undefined 、小明、清心

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 9、以下代码输出的正确结果是 ？（单选）

```js
function Fn() {
  getNum = function () {
    console.log(1);
  };
  this.getNum = function () {
    console.log(2);
  };
}
Fn.prototype.getNum = function () {
  console.log(3);
};
var getNum = function () {
  console.log(4);
};
function getNum() {
  console.log(5);
}
getNum();
var f = new Fn();
f.getNum();
```

- A、5，3
- B、5，2
- C、4，3
- D、4，2

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 10、以下代码的输出结果是 ？（单选）

```js
var a = 1;
var obj = {
  fn: function () {
    var a = 3;
    return this.fn2;
  },
  fn2: function () {
    var a = 4;
    console.log(this.a);
  },
  a: 2,
};
var obj1 = obj.fn();
obj1();
```

- A、1
- B、2
- C、3
- D、4

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 11、当点击 box1 时，控制台的输出结果是 ？（单选）

```html
<div class="box2">
  <div class="box1">box1</div>
</div>

<script>
  var box2 = document.querySelector(".box2");
  box2.addEventListener("click", function (e) {
    console.log(e.target.innerHTML);
  });

  box2.onclick = function (e) {
    console.log(e.currentTarget.innerHTML);
  };
</script>
```

- A、`<div class="box1">box1</div>`
- B、box1
- C、box1，`<div class="box1">box1</div>`
- D、`<div class="box1">box1</div>`，box1

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

## 二、简答题



根据所学知识和自己的理解，给出答案解析

### 1、JavaScript 有几种数据类型，分别是什么 ？

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7;"></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li></li><li></li><li></li></ul></details>

### 2、写出以下代码输出的结果 ？

```js
var obj1 = { num: 1 };
var obj2 = obj1;
obj1.num = 2;
console.log(obj2.num);

obj1 = { num: 4 };
console.log(obj2.num);

obj1.num = 5;
console.log(obj2.num);
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 3、写出以下代码输出的结果 ？

```js
function fun(a, b) {
  console.log(b);
  return {
    fun: function (m) {
      return fun(m, a);
    },
  };
}
var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 4、说说 break、continue、return 语句之间不同 ？并例举相应的代码来验证

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><table style="display: block; border-collapse: collapse; margin: 1rem 0px; overflow-x: auto; width: 814.806px;"><thead><tr style="border-top: 1px solid rgb(223, 226, 229);"><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th></tr></thead><tbody><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><strong style="font-weight: 600;"></strong></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><strong style="font-weight: 600;"></strong></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><br></td></tr></tbody></table><p style="line-height: 1.7;"><strong style="font-weight: 600;"></strong></p><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span></code></pre></div></details>

### 5、说说 new 调用构造函数的 5 步曲，并用代码写出每一步执行的过程

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li><li></li><li></li></ul><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token class-name" style="color: rgb(248, 197, 85);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span></code></pre></div></details>

### 6、补充以下表格，说说 8 种不同场景下的 this 指向 ？

| 函数的调用方式                                                 | this 指向 |
| :------------------------------------------------------------- | :-------- |
| `对象.函数()`                                                  |           |
| `函数()`                                                       |           |
| IIFE 立即执行函数                                              |           |
| `数组[下标]()`                                                 |           |
| `fn.call(thisArg,arg1,arg2)`                                   |           |
| `fn.apply(thisArg,arry)`                                       |           |
| `fn.bind(thisArg,arg1,arg2)`                                   |           |
| 定时器中的回调函数                                             |           |
| `element.onclick = function(){ // this指向 }` DOM 事件处理函数 |           |
| `var obj = new 函数()`                                         |           |

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><table style="display: block; border-collapse: collapse; margin: 1rem 0px; overflow-x: auto; width: 814.806px;"><thead><tr style="border-top: 1px solid rgb(223, 226, 229);"><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th></tr></thead><tbody><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr></tbody></table></details>

### 7、call、apply、bind 三者之间的区别和相同点

> 在表格空白处填写对应的答案

| 方法名 | 作用相同 | 传参方式不同 | 返回值不同 |
| :----- | :------- | :----------- | :--------- |
| call   |          |              |            |
| apply  |          |              |            |
| bind   |          |              |            |

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><table style="display: block; border-collapse: collapse; margin: 1rem 0px; overflow-x: auto; width: 814.806px;"><tbody><tr style="border-top: 1px solid rgb(223, 226, 229);"><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th><th style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></th></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td rowspan="3" style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td rowspan="2" style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr><tr style="border-top: 1px solid rgb(223, 226, 229); background-color: rgb(246, 248, 250);"><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td><td style="border: 1px solid rgb(223, 226, 229); padding: 0.6em 1em; text-align: left;"></td></tr></tbody></table><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><img src="https://www.arryblog.com/assets/img/image-20221231163551317.8562a7d4.png" alt="image-20221231163551317" class="medium-zoom-image" style="cursor: zoom-in; transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) 0s !important; max-width: 100%;"></p></details>

### 8、说说以下代码的输出结果 ？

```js
console.log(1);
setTimeout(function () {
  console.log(2);
}, 1000);

console.log(3);

setTimeout(function () {
  console.log(4);
}, 0);

console.log(5);
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 9、说说你对类数组的理解，常见的类数组对象有哪些，同时将类数组转换为数组有几种方法

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"><strong style="font-weight: 600;"></strong></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></li><li><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></p></li><li><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></p></li></ul><p style="line-height: 1.7;"><strong style="font-weight: 600;"></strong></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li></li><li></li><li></li></ul><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span></code></pre></div><p style="line-height: 1.7;"><strong style="font-weight: 600;"></strong></p><p style="line-height: 1.7;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></p><p style="line-height: 1.7;"></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li></li><li></li><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li><li><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></li></ul><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token class-name" style="color: rgb(248, 197, 85);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token class-name" style="color: rgb(248, 197, 85);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token class-name" style="color: rgb(248, 197, 85);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

## 三、笔试题



通过书写代码完成以下相关题目的要求

### 1、编程代码，实现以下效果

初始数组`var arr = [1,2,3,4,5];` 通过一系列数组方法改写成 `['a',1,2,'b','c',3,4];`

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，并写出对应要求的代码，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

### 2、 下面的代码最终结果是不是 `0,1,2,3,4` ？如果不是请改写此代码是最终结果是上述情况

```js
var arr = [];
for (var i = 0; i < 5; i++) {
  arr[i] = function () {
    console.log(i);
  };
}

arr[0]();
arr[1]();
arr[2]();
arr[3]();
arr[4]();
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，并写出对应要求的代码，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(71, 101, 130); padding: 0.25rem 0.5rem; margin: 0px; font-size: 0.85em; background-color: rgba(27, 31, 35, 0.05); border-radius: 3px;"></code></p></blockquote><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

### 3、筛选出以下数组中价格大于 4 元以上的蔬菜， 同时按降序排序 ？

提示：利用数组的 filter 和 sort 方法来实现

```js
var arr = [
  {
    name: "白菜",
    price: 3.2,
    type: "蔬菜",
  },
  {
    name: "萝卜",
    price: 5,
    type: "蔬菜",
  },
  {
    name: "西蓝花",
    price: 8,
    type: "蔬菜",
  },
  {
    name: "香蕉",
    price: 5.2,
    type: "水果",
  },
  {
    name: "芹菜",
    price: 4.5,
    type: "蔬菜",
  },
  {
    name: "苹果",
    price: 3.2,
    type: "水果",
  },
];
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，并写出对应要求的代码，再点击查看正确答案</summary><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token parameter"><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

## 四、面试题

注：

课程中每一个章节的面试题，是必需要掌握的，都需要自己能手动写出来

> 大家可以参考博客的重难点和面试题去复习