# JavaScript 数组应用 和 算法

在数据类型那一章节，我们知道 JS 中数据类型分为：**基本数据类型**和**引用数据类型**

- 基本数据类型有 7 种：Number、String、Boolean、null、undefined、Bigint、Symbol
- 引用数据类型（Object 对象类型）有：Array、Function、Date、Math、RegExp 等对象

本章节我们要学习的数组 Array 对象就是引用数据类型，接下来我们会从以下三个部分来展开讲解

- 数组的语法和基本用法
- 冒泡排序（基础版，中级版，最优版）
- 引用数据类型和基本数据类型

> 关于数组的**静态属性**、**静态方法**、**实例方法**，我们会在函数和对象讲完之后再讲。这样大家理解起来更容易，相对能讲解的案例和应用场景也更多，更丰富

## 一、数组的语法和基本用法

- 编程过程中，我们经常会遇见处理 "一组数值" 的情况
- 比如：全班 10 个学生的考试成绩如下

```js
99 、98、90、96、89、86、79、85、68、100
```

> 按我们之前的方式，我们只能定义 10 个变量来分别存储每个学生的成绩，如下

```js
// 不合理方式
var a0 = 99,
  a2 = 98,
  a3 = 90,
  a4 = 96,
  a5 = 89,
  a6 = 86,
  a7 = 79,
  a8 = 85,
  a9 = 68,
  a10 = 100
```

注：这样的方式显然是不合理的

- 因为我们是没法看出这些值之间有什么相互关系和作用
- 其次我们在定义和使用这些数据时也特别麻烦

> 假如 1 个班有 50 个学员，那要定义 50 个变量吗 ？ 如果要统计这 50 个学员的平均成绩呢 ？只能一个一个手动加起来，然后除 50 ？`(a0+a1+...+a49)/50`

所以我们需要有一种新的数据结构来存储这样一组**具有相关性**的数值，接下来要讲到的 Array 数组，就符合这一特点。

### 1、什么是数组

- 数组（Array），简单理解为是指一组数据的集合，用来存储一组相关的数据；
- 数据可以是任意的数据类型；
- 每种高级编程语言中都有数组，它是非常重要的一种数据结构。

```js
// 用数组来存储全班10个学生的考试成绩
var score = [99, 98, 90, 96, 89, 86, 79, 85, 68, 100]
```

### 2、创建数组

在 ES5 标准下，创建数组有以下 2 种形式：

数组字面量方式创建数组 和 `new Array()` 方式创建数组

#### 2.1、数组字面量方式创建数组

- 一个封闭在方括号对 `[]`中的包含有零个或多个数据
- 数组中的每个数据被称作**元素**，元素可以是任意的数据类型。

```js
// 使用数组字面量方式创建了一个空数组  arr 数组名
var arr = []

// 使用数组字面量方式创一个带初始值的数组
// A，B，C，D 称为数组元素（项），数组的长度为4
var arr = ['A', 'B', 'C', 'D']

// 使用数组字面量方式创一个带初始值的数组，数组长度为6
// 数组元素(项)可以是任意数据类型
var arr = [1, 'name', null, undefined, {}, function () {}] // 一般不会这样用，仅当前了解
```

注：

数据创建同时赋值，称为数组初始化

#### 2.2、new Array() 方式创建数组

- 在实际开发中，这种方式用的少，大家只要了解即可
- 建议大家掌握了数组字面量创建方式，再来了解这种方式

```js
// 创建一个数组，数组长度为5 ，每一项为空，打印出来为undefined
var arr = new Array(5)
console.log(arr.length) // 5
console.log(arr[0]) // undefined;

// 创建一个数组，数组长度为1，同时赋初始值为‘5’
var arr = new Array('5')
console.log(arr.length) // 1
console.log(arr[0]) // 5

// 创建一个数组，数组长度为3，同时赋初始值为 'A'、'B'、'C'
var arr = new Array('A', 'B', 'C')
console.log(arr.length) // 3
console.log(arr[0]) // A
```

### 3、访问数组元素（项）

数组的每一项都有**索引**（下标），素引是从 0 开始的正整数

```js
var arr = ['A', 'B', 'C', 'D']
// A,B,C,D 对应的下标分别为：0,1,2,3
```

> B 的下标为 1，我们可以称 "下标为 1 的项" 或 第二项

- 我们通过 **数组名`[`索引`]`** 的方式来访问数组中元素，如下

```js
var arr = ['A', 'B', 'C', 'D']
// 通过索引来访问数组中元素
console.log(arr[0]) // A
console.log(arr[1]) // B
console.log(arr[2]) // C
console.log(arr[3]) // D
```

### 4、数组的长度

- 数组的 length 属性，表示它的长度

```js
// 创建数组
var arr = ['A', 'B', 'C', 'D']
// arr.lenght 访问数组长度
console.log(arr.length) // 4
```

- 数组最后一项的下标`=` 数组长度`- 1`

```js
// 创建数组,数组长度为 4，最后一项下标为3
var arr = ['A', 'B', 'C', 'D']
console.log(arr[arr.length - 1]) // D  数组最后一项 arr[数组长度 -1]
```

### 5、修改数组项的值

- 如果修改项的索引在**0 到数组长度 -1** 内，正常修改值

```js
var arr = [1, 2, 3, 4, 5]
// 更改第二项值，也就是下标为1的项的值
arr[1] = 'A'
console.log(arr) // [1, 'A', 3, 4, 5]
```

- 如果修改项的索引不在**0 到数组长度 -1** 内，相当于创建这一项
- 即会修改数组的长度，同时在这个长度内没有值的项都是空，通过下标访问这些没有值的项时，结果是`undefined`;

```js
var arr = [1, 2, 3, 4, 5];
var arr[9]='B';
console.log(arr); // [1, 'A', 3, 4, 5, empty × 4, 'B']
console.log(arr.length); // 10 数据长度变为10
console.log(arr[5]); // undefined 下标为5的这一项，访问值为undefined
```

- 先创建一个空数组，然后再赋值

```js
var arr = []
arr[0] = 1
arr[2] = 2
arr[5] = 5
console.log(arr.length) // 6
console.log(arr) // [1, empty, 2, empty × 2, 5]
```

### 6、访问数组注意事项

- 访问数组中不存在的项，不会报错，回返回`undefined`

```js
var arr = ['A', 'B', 'C', 'D']
console.log(arr[5]) // undefined
```

- 数组项对应的值为空时，在访问时，返回`undefined`

```js
var arr = ['A', , 'B', 'C']
console.log(arr[1]) // undefined

// 这两种情况，要注意区分
var arr = ['A', undefined, 'B', 'C']
console.log(arr[1]) // undefined
```

- 注意区分以下写法

```js
// 创建数组，数组长度为2
var arr1 = ['A', 'B']
console.log(arr1.length) // 2

// 创建数组，数组长度为3
var arr2 = ['A', 'B', ,]
console.log(arr1.length) // 3
```

> 有空元素的数组，称为稀疏数组

经典面试题：

将数组的`length`设置为 0，取第一个元素会返回什么 ？

```js
var arr = [1, 2, 3, 4, 5]
arr.length = 0
console.log(arr)
console.log(arr[0])
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238);"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br></p></details>

### 7、数组的遍历

- 所谓数组遍历，就是把数组中的每一项都访问一遍。就好比蓝子里有 10 个苹果，一个一个拿 出来。
- 至于拿出来做什么，这就要看实际的需求了。比如可以拿出来放在桌子上，什么都不做，也可以拿出来一个一个洗一下。
- 这里我们利用 for 循环，把数组中的每一项拿出来，在控制台打印输出。
  - `for`循环中的`i`是从 0 开始的，是计数器，当索引使用
  - `arr[i]`就是访问数组中下标为`i`的那一项

```js
var arr = ['A', 'B', 'C', 'D', 'E']
// for循环遍历数组中的每一项
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]) // 在控制台打印输出
}
// 输出：A B C D E
var arr = ['A', 'B', 'C', , , , 'G', 'H', 'I', ,]
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
// 输出：A B C undefined undefined undefined G H I undefined
```

### 8、二维数组

- 以数组作为数组元素的数组，即："数组的数组"
- 二维数组，可以认为是数组中的元素也是一个数组

> 如下所示：

```js
// 创建二维数组
var arr = [
  [2, 5, 8],
  [11, 22, 33],
  [55, 88, 66],
  [23, 56, 89],
]
console.log('数组的长度：' + arr.length) // 4
```

- 循环遍历二维数组中的每一项

```js
var arr = [
  [2, 5, 8],
  [11, 22, 33],
  [55, 88, 66],
  [23, 56, 89],
]
// 循环输出二维数组中的每一个项
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr[i].length; j++) {
    console.log(arr[i][j])
  }
}
// 最终输出结果 2 5 8 11 22 33 55 88 66 23 56 89
```

> 二维数组的相关案例，放在后面的 DOM 再讲。

### 9、数组类型的检测

- 用`typeof`检测数组和对象，得到的是`object`

```js
typeof [1, 2, 3] // object
typeof { name: '清心老师', age: 18 } // object
```

- 如果要区分数组和对象，我们可以用`Array.isArray()`来检测是否是数组类型

> 如果`Array.isArray()`的返回值是`true`，就是数组类型，否则就不是

```js
Array.isArray([1, 2, 3]) // true
Array.isArray({ name: '清心老师', age: 18 }) // false
Array.isArray([]) // true
```

![image-20211220221905258](https://www.arryblog.com/assets/img/image-20211220221905258.8cc76100.png)

## 二、数组相关实践应用

将所学知识深入浅出实践应用起来

### 1、 翻转数组

将数组`[1, 43, 23, 8, 4, 6, 8, 22, 9]`翻转过来

```js
var arr = [1, 43, 23, 8, 4, 6, 8, 22, 9]
var newArr = []
for (var i = arr.length - 1; i >= 0; i--) {
  newArr[newArr.length] = arr[i]
}
console.log(newArr) // [9, 22, 8, 6, 4, 8, 23, 43, 1]
```

思考：

我们如何在不增加新数组的情况下，在原数组上对数组进行翻转 ？

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">点击查看正确答案</summary><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div></details>

### 2、找出数组 [1, 43, 23, 8, 4, 6, 8, 22, 9] 中的最大值

- 声明一个变量 max，用来保存数组中的最大值
- 刚开始默认数组中的第一项为最大值，存入变量 max
- 然后拿 max 与数组中每一项（除第一项）去做比较
- 如果数组中值大于 max，就把这个数存到 max 变量中去，否则就继续往下比

```js
var arr = [1, 43, 23, 8, 4, 6, 8, 22, 9]
var max = arr[0] // max用来保存最大值，刚开始默认取数组中第一项为最大值
for (var i = 0; i < arr.length; i++) {
  if (max < arr[i]) {
    max = arr[i]
  }
}
console.log('数组中的最大值为:' + max)
```

### 3、删除数组中指元素

要求删除数组`[1, 4, 12, 6, 33, 15, 30, 5, 8];`中的所有大于 10 的数

> 实现过程分析图：

![image-20220913180221831](https://www.arryblog.com/assets/img/image-20220913180221831.be944669.png)

开启两层循环

- 外层循环把数组中所有数遍历出来与 10 做比较，当判断当前项值`> 10` 时
- 开启内层循环，用来删除当前项（从当前项开始，把后面的每一项，赋值给前一项，达到删除当前项效果）
- 每次有删除项时，其数组的长度就会减 1，数组长度减 1，可以把最后一项干掉。
- 删除当前项后，下次外层循环开始位置，又要从当前删除项的下标开始查找

```js
var arr = [1, 4, 12, 6, 33, 15, 30, 5, 8]
// 外层循环，把数组中每个数拿出来与10做比较
for (var i = 0; i < arr.length; i++) {
  if (arr[i] > 10) {
    // 把当前项后面的每一项，都赋值给前一项，达到删除当前项效果
    for (var j = i; j < arr.length; j++) {
      arr[j] = arr[j + 1]
    }
    // 删除一项后，数组的总长度就要减1，这样就把数组中最后一项给干掉了
    arr.length = arr.length - 1
    // 保证删除项后，下次遍历从当前删除项的序号开始遍历
    i--
  }
}
console.log(arr)
```

重点学习：

- 如何删除数组中元素
- 删除数组中元素后，对后续元素和数组带的影响

> 后面数组有提供相关删除数组中元素的方法，这里就是让大家学习这种思维方式。

### 4、随机生成指定范围内的颜色

当我们在做烟花效果时，我们需要需要随机为 100 个小圆或正方形产生（指定范围内的）不同颜色。

```html
<style>
  .ball {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>
<body>
  <div class="ball" id="J_ball"></div>
  <script>
    // 获取id为ball的元素
    var ball = document.getElementById('J_ball')
    // 定义一组颜色，存入到数组中
    var bgColor = ['pink', 'khaki', 'skyblue', 'tomato', 'orange', 'orchid']
    // 数组长度
    var len = bgColor.length
    // Math.random() * (len) 产生 0- len-1之间的随机数
    // Math.random() * (len) >> 0  去掉小数，只留下整数部分
    ball.style.backgroundColor = bgColor[(Math.random() * len) >> 0]
  </script>
</body>
```

![GIF 2022-9-12 21-12-42](https://www.arryblog.com/assets/img/GIF-2022-9-12-21-12-42.28e14593.gif)

## 三、引用数据类型和基本数据类型的区别

我们知道在 JS 中数据分为：基本数据类型 和 引用数据类型两大类

- 基本类型：number、boolean、string、undefined、null
- 引用类型：array、object、function、regexp（正规表达式） ...

那这两类数据类型在内存中是如何存储的呢 ？这就是我们接下来要讨论的重点。

> 我们先来看下面两段代码

```js
// 代码片段一
var a = 10
var b = a
a = 20
console.log(a) // 20
console.log(b) // 10
// 代码片段二
var arr1 = [1, 2, 3, 4]
var arr2 = arr1
arr1[0] = 'A'
console.log(arr1[0]) // A
console.log(arr2[0]) // A
```

以上代码解读

- 通过代码片段一，我们发现，当 `b=a`，赋值完成后，后续对 a 的操作并不会对 b 产生影响。
- 而代码代码片段二中的数组就不一样，当 `arr2=arr1` 且，我们对 arr1 的操作，直接影响了 arr2，为什么会出现这个情况呢？
- 这就涉及到 Javascript 的基础数据类型和引用数据类型在内存中是如何存储的。

> 我们之前说过，当我们使用 var 声明一个变量时，就会在内存中开辟一块内存空间用来存放变量的值。

那不管是引用数据类型和基本数据类型，其值都是保存在内存中的，但是为什么在赋值时会出现上面这样不一致的情况呢？

> 这是因为，在内存中存在**栈**和**堆**这种不同的内存空间。

### 1、基本数据类型在内存中的存储

基本数据类型存储在栈空间中

> 基本数据类型赋值过程如下

```js
// 代码片段一
var a = 10
var b = a
a = 20
console.log(a) // 20
console.log(b) // 10
```

赋值过程

- 变量 a 是基本数据类型, 当代执行到 `var a = 10` 时，在栈内存中开辟一块空间，把值 10 存入进去
- 当执行到 `var b = a` 时，把 a 的值 10,复制一份保存在 b 对应的内存空间中
- 当执行 `a = 20` 时，其本质是修改了 a 对应内存中的值，并不会响影到 b

> 如下图：

![image-20220913205008218](https://www.arryblog.com/assets/img/2022zhan.871beb2b.png)

### 2、引用数据类型在内存中的存储

栈内存中存着引用数据类型的地址，堆内存中存着引用数据类型的最终数据内容。

> 引用数据类型赋值的整个过程如下：

```js
// 代码片段二
var arr1 = [1, 2, 3, 4]
var arr2 = arr1
arr1[0] = 'A'
console.log(arr1[0]) // A
console.log(arr2[0]) // A
```

赋值过程

- 变量`arr1`声明后，首先会在栈内存开辟一块内存空间，然后在赋值时，再在堆内存中开辟一块空间，堆内存存放引用数据类型的数据，然后在堆中就会有一个存放数据的地址，把这个地址存入变量对应的栈内存中。
- 栈内存中存着指向堆内存中数据的地址。
- 当代码执行到`arr2=arr1`时，这里是把`arr1`存入栈中的地址复制给了`arr2`，所以本质上`arr1`和`arr2`指向的是堆内存中的同一个值（数据）
- 所以当我们操作`arr1[0]='A'`时，`arr2[0`的值也是`'A'`

**结论：**

当我们把一个引用数据类型当做值来赋值时，是把它**存在栈中的地址复制一份来赋值**。

当我们访问引用数据类型时，是通过**栈中的引用地址来访问到堆中的数据**。

> 如下图：

![image-20220913212957704](https://www.arryblog.com/assets/img/202209zhan.8e2fbc37.png)

### 3、栈和堆的的介绍

到这里，你肯定会有一个疑问，为什么一定要分**堆**和 **栈**这两个存储空间呢？所有的数据都存放在栈中不就可以了吗？答案是不可以

因为 Javascript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间太大的话，所有数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到程个程序的执行效率。

> 什么是上下文，后面会讲，这里先留着。

> **接下我们再来了解下栈和堆之间还有一些什么样的区别 ？**

| 比较     | 栈                                           | 堆                                      |
| :------- | :------------------------------------------- | :-------------------------------------- |
| 大小固定 | 创建时，确定大小（值大小固定），故可能会溢出 | 大小不固定，可随时增加                  |
| 存储类型 | 存储基本数据类型及引用类型数据的堆地址       | 存储引用类型数据                        |
| 如何访问 | 按值（by value)访问                          | 按引用（by reference)（堆内存地址）访问 |
| 特点     | 空间小，运行效率高                           | 空间大，运行效率相对较低                |
| 存放规则 | 按顺序存放，先进后出                         | 无序存储，可根据引用（地址）直接获取    |

### 4、总结：基本数据类型和引用数据类型的区别

| 比较           | 基本数据类型                                                   | 引用数据类型                                                             |
| :------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------- |
| 数据存放位置   | 基本数据类型存放在**栈**中，数据大小确定，内存空间大小可以分配 | 引用数据类型存放在**堆**中，每个空间大小不一样，要根据情况进行特定的配置 |
| 变量存储内容   | 变量中存储的是**值本身**                                       | 变量存储的是**地址**                                                     |
| 变量用来赋值时 | 把变量的**值**复制一份去赋值                                   | 把变量的**内存地址**复制一份去赋值                                       |
| 存储内容大小   | 存储**值较小**                                                 | 存储**值较大**                                                           |

### 5、数组的深克隆和浅克隆

- 引用类型在赋值的过程中，指向的是同一个地址，所以本质上两个变量指向的是同一个东西。
- 那我们如何把一个引用类型（这里以数组为例），完全拷贝一份给到另一个变量，并且两者之间是完全独立的，没有任何的关联呢？
- 这就涉及到我们这里说的克隆问题。

**浅克隆**： 只克隆了数组的第一层，如果数组是多维数组，或数组中的项是其它的引用类型值，则不克隆其他层。

**深克隆**：克隆数组的所有层，要使用递归技术，在讲到递归的时候再介绍。

> 我们先来看一个**浅克隆**的案例

```js
var arr = [1, 2, 3, ['a', 'b', 'c']]
var arr2 = []
for (var i = 0; i < arr.length; i++) {
  arr2.push(arr[i])
}
console.log(arr) // [1,2,3,['更改','b','c']]
console.log(arr2) // [1,2,3,['更改','b','c']]
// arr 和 arr2是两个不同数组，其栈内存中指向堆内存的地址是不一样的
console.log(arr == arr2)
false
// arr[3] 和 arr2[3] 是全等的，即两者指向堆内存中的同一个地址
console.log(arr[3] === arr2[3]) // true
// 修改arr[3][0]的值，arr与arr2中的同时都更新了
arr[3][0] = '更改'
console.log(arr) // [1,2,3,['更改','b','c']]
console.log(arr) // [1,2,3,['更改','b','c']]
```

注：

- 上面两个数组在克隆时，本质上 arr 和 arr2 互相独立
- 但 arr 与 arr2 当中的第 3 项指向了同一个地址，并没有完全做到互不相关，这就是**浅拷贝**
- 如果能做到`arr[3] == arr2[3]`是 false，那就要用到深拷贝

> 关于深拷贝，讲完递归之后再来讲

## 四、冒泡排序 - 著名排序算法

- 冒泡排序的英文是`bubble sort` 的是一个著名的排序算法，也是在面试时，非常爱考察的算法
- 假设，我们现在要将这个无序数组`[1,5,3,2,6]`从小到大来排列

![image-20220913002518829](data:image/png;base64,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)

**按冒泡排序的思想：**

我们要把相邻的元素两两比较，当一个元素大于右侧相邻元素时，交换它们的位置；当一个元素小于或等于右侧相邻元素时，位置不变（啥也不做）

> 实现以上数组从小到大排序，用冒泡排序的整个实现过程如下图：

### 1、冒泡排序整个过程

第一轮：

交换过程

![image-20220913000544726](https://www.arryblog.com/assets/img/image-20220913000544726.472e7816.png)

第二轮：

交换过程

![image-20220913001324670](https://www.arryblog.com/assets/img/image-20220913001324670.f71ef8d6.png)

第三轮：

交换过程

![image-20220913002015023](https://www.arryblog.com/assets/img/image-20220913002015023.5d622cd9.png)

第四轮：

交换过程

![image-20220913002357093](https://www.arryblog.com/assets/img/image-20220913002357093.989605e5.png)

我们来分析下面的过程

> 我们来用表格来分析上面的执行过程，上面数组中有 5 个元素，数组长度为 5，经过了 4 轮交换。
> 具体如下：

| 轮数    | 对比次数 | 确认元素个数 | 有序区个数 |
| :------ | :------- | :----------- | :--------- |
| 第 1 轮 | 4        | 1            | 1          |
| 第 2 轮 | 3        | 1            | 2          |
| 第 3 轮 | 2        | 1            | 3          |
| 第 4 轮 | 1        | 1            | 5          |

其实我们可以得出结论：

- 元素交换轮数`=`数组长度`-1`
- 每一轮交换次数`=`数组长度`-`当前交换轮

**代码实现思路**

- 我们可以用 for 循环嵌套来实现，外部循环控制交换轮数
- 内部循环用来实现每一轮的交换处理。先进行元素比较，如果元素大于右侧相邻相元素，则两元素位交换，如果不大于，则啥也不做

```js
// 排序数组
var arr = [1, 5, 3, 2, 6]
// 数组长度
var len = arr.length
// 外层for控制交换轮数
for (var i = 0; i < len - 1; i++) {
  // 内层for控制每一轮，元素交换次数处理
  for (var j = 0; j < len - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      // 交换两元素位置
      var tmp // 用来交换两个变量的中间变量
      tmp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = tmp
    }
  }
}
console.log(arr) // [1, 2, 3, 5, 6]
```

注：

以上只是冒泡排序的原始实现，其还存在很大的优化空间。

> 接下来我们来看下有哪些可以优化的地方。

### 2、冒泡排序优化 1

优化思路

让我们来回顾下刚才上面那个冒泡排序的细节，当我们第过第二轮排序后。

> 结果如下：

![image-20220913001324670](https://www.arryblog.com/assets/img/image-20220913001324670.f71ef8d6.png)

我们发现

其实这个时候整个数组中的元素已经是有序的了，可是排序算法还是按部就班的执行第三，四轮的排序。

如果在第二轮完成后，我们就能判断出数列已经有序的，并做出标记，那么剩下的几轮排序就不必执行了，可以提前结束工作。这样是不是性能更高呢？

那如何判断出数列当前已经是有序的呢 ？

- 在第二轮结束后，数列才是有序的了，所以第二轮中我们是找不到数组有序的标记

> 我们来第三轮

![image-20220913002015023](https://www.arryblog.com/assets/img/image-20220913002015023.5d622cd9.png)

在第三轮中

整个过程都没有发生数据交换，也就是说，如果在这一轮中，数据如果没有经过任何的交换，那就说明，在这一轮当中，数据已经是有序的了。

所以我们在每一轮开始时，默认打上 `isSorted='有序'` 标记，如果在这一轮交换中，数据一旦发生交换，就把 `isSorted='无序'`，如果整轮交换中，都没有发生交换，那就表示数组是有序的了。我们就可以退出整个 for 循环的执行。

```js
// 排序数组
var arr = [1, 2, 3, 5, 6]
// 数组长度
var len = arr.length
// 外层for控制交换轮数
var isSorted
for (var i = 0; i < len - 1; i++) {
  // 内层for控制每一轮，元素交换次数处理
  isSorted = true // 有序标记，每轮开始默认为有序，如果一旦发生交换，就会变成flag=false,无序
  for (var j = 0; j < len - i - 1; j++) {
    if (arr[j] > arr[j + 1]) {
      // 交换两元素位置
      var tmp // 用来交换两个变量的中间变量
      tmp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = tmp
      isSorted = false
    }
  }
  // 这一轮多次交换下来，flag没有变为false,说明没有发生元素交换，此时数组已是有序的
  if (isSorted) {
    break // 退出最外层for循环
  }
}
console.log(arr) // [1, 2, 3, 5, 6]
```

注：

上面这种方式，是佳的冒泡排序方案了吗 ？

> 答案肯定不是，我们来看冒泡排序的最佳方案。

### 3、冒泡排序优化 2

优化思路

为了让大家更好的理解最优的解决方案带来的好处，我们重新拿一个数组`[2,3,4,1,5,6,7,8]`来做为案例讲解。

![image-20220913145818932](data:image/png;base64,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)

我们先来观察上面的数列，这个数列有一个明显的特点，就是前半部分`2,3,4,1`是无序的，后半部分`5,6,7,8`是有序的,并且后半部分是升序排列的，其最小值也比前面部分的最大值要大。

> 如果我们按冒泡排序的思路来排序，我们看下每一轮的交换细节

第一轮

交换过程

![image-20220913151804855](https://www.arryblog.com/assets/img/image-20220913151804855.c1133f09.png)

第一轮

交换过程

![image-20220913153055196](https://www.arryblog.com/assets/img/image-20220913153055196.f079bcc5.png)

从上面的两轮交换中，大家有没有发现什么问题呢 ？

其实右边的许多元素已经是有序的了，但是每一轮还是规规矩矩的把所有数都比一轮，让费了很多时间。

按正常的冒泡排序逻辑，第一轮排序过后，有序区长度为 1，第二轮排序过后，有序区长度为 2，.....

> 在实际的排序过程中，有序区的长度可能会大于这个有序区长度。比如上图，

- 第一轮后，有序区的长度为 4，1 之后就是有序区了。

![image-20220913154330606](data:image/png;base64,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)

- 第二轮后，有序区长度为 6 ，1 之后就是有序区了。

![image-20220913154209386](data:image/png;base64,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)

有没有什么办法可以确定，有序区的长度呢 ？每一轮比较时，比较到有序区的前一位就不再发生比较了呢 ？

- 我们可以记录每一轮最后一次交换元素的位置，该位置为无序列表的边界，再往右就是有序区了
- 每一轮比较，比较到上一轮元素最后一次交换的位置就不再比较了。

```js
// 排序数组
var arr = [98, 2, 3, 45, 4, 1, 5, 78, 6, 7, 8, 20]
// 数组长度
var len = arr.length
// 当前是否是有序的
var isSorted
// 有序的边界
var sortBorder = len - 1
// 记录每一轮最后一次交换的值，确定下一次循有序边界
var index

// 外层for控制交换轮数
for (var i = 0; i < len - 1; i++) {
  // 内层for控制每一轮，元素交换次数处理
  isSorted = true // 有序标记，每轮开始默认为有序，如果一旦发生交换，就会变成flag=false,无序

  for (var j = 0; j < sortBorder; j++) {
    if (arr[j] > arr[j + 1]) {
      // 交换两元素位置
      var tmp // 用来交换两个变量的中间变量
      tmp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = tmp
      isSorted = false
      // 把无序列表的边界，更新为最后一次交换元素的位置
      index = j
    }
  }
  // 如果无序，记录上一次最后一次交换的元素下标
  if (!isSorted) {
    sortBorder = index
  }
  // 这一轮多次交换下来，flag没有变为false,说明没有发生元素交换，此时数组已是有序的
  if (isSorted) {
    break // 退出最外层for循环
  }
}
console.log(arr)
```

## 五、测试题

自我测试：在不看答案的前提下，看看自己是否真正掌握了本节所学内容。

### 1、关于数组的描述，下列说法正确的是 ？

> 选择两项

- A、数组可以用来保存一组不同类型的数据
- B、数组的 length 属性可以获得数组的长度
- C、数组的索引是从 1 开始的正整数
- D、使用（）获取数组的索引

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"></p></details>

### 2、下面这段代码运行结果 ?

```js
var arr = [1, 2, 3, 4]
arr[7] = 'A'
console.log(arr.length)
console.log(arr[4])
```

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><br></p></details>

### 3、编码题

题目如下：

当用户进入页面时，不停的弹出输入框让用户输入班级学员的成绩，直到输出退出后，就不再弹出输入框，而是把全班同学的平均成绩以弹窗形式显示出来。

<details class="custom-block details" style="display: block; position: relative; border-radius: 2px; margin: 1.6em 0px; padding: 1.6em; background-color: rgb(238, 238, 238); color: rgb(44, 62, 80); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary style="outline: none; cursor: pointer; color: rgb(62, 175, 124);">自己先分析并完成代码实现，再点击查看正确答案</summary><p style="line-height: 1.7;"></p><ul style="padding-left: 1.2em; line-height: 1.7;"><li></li><li></li></ul><div class="language-js extra-class" style="position: relative; background-color: rgb(40, 44, 52); border-radius: 6px;"><pre class="language-js" style="color: rgb(204, 204, 204); background: transparent; font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; overflow-wrap: normal; line-height: 1.4; tab-size: 4; hyphens: none; padding: 1.25rem 1.5rem; margin: 0.85rem 0px; overflow: auto; border-radius: 6px; position: relative; z-index: 1;"><code style="font-family: source-code-pro, Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; color: rgb(255, 255, 255); padding: 0px; margin: 0px; font-size: 0.85em; background-color: transparent; border-radius: 0px;"><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token string" style="color: rgb(126, 198, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token keyword" style="color: rgb(204, 153, 205);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token number" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token comment" style="color: rgb(153, 153, 153);"></span><span class="token function" style="color: rgb(240, 141, 73);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token operator" style="color: rgb(103, 205, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span><span class="token punctuation" style="color: rgb(204, 204, 204);"></span></code></pre></div><blockquote style="font-size: 1rem; color: rgb(153, 153, 153); border-left: 0.2rem solid rgb(223, 226, 229); margin: 1rem 0px; padding: 0.25rem 0px 0.25rem 1rem;"><p style="line-height: 1.7; margin: 0px; padding-bottom: 0px;"></p></blockquote><p style="line-height: 1.7; margin-bottom: 0px; padding-bottom: 0px;"><img src="https://www.arryblog.com/assets/img/GIF-2022-9-13-22-41-15.041079a1.gif" alt="GIF 2022-9-13 22-41-15" class="medium-zoom-image" style="cursor: zoom-in; transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) 0s !important; max-width: 100%;"></p></details>

## 六、重点难点总结

总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 重点内容

- 定义数组的两种方式
- 如何检测数组的类型 ？
- 如何删除数组中指定项元素
- 数组的长度与下标的关系
- 访问数组中不存在的项，不会报错，会输出 undefined

### 难点知识

- 冒泡排序的机理和代码实现
- 引用数据类型和基本数据类型有哪些区别

## 七、作业

- 1、把课上讲到的相关案例，全部手写一遍
- 2、手写冒泡排序的最优实现方案
- 3、把你对引用数据类型和基本数据类型的理解，讲给你周围的朋友听
