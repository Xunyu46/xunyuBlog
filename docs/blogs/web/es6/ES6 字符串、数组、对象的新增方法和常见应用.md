---
title: ES6 字符串、数组、对象的新增方法和常见应用
date: 2023-10-30
sidebar: 'auto'
categories:
  - ES6
tags:
  - ES6
publish: true
---

# ES6 字符串、数组、对象的新增方法和常见应用

本章我们来学习 ES6 中为字符串、数组、对象新增的一些方法和应用

## 一、字符串的新增方法

| 方法       | 说明                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------- |
| padEnd     | 用一个字符串从当前字符串的末尾来填充当前字符串，使字符串达到指定长度。返回结果为填充后的新字符串。 |
| padStart   | 用一个字符串从当前字符串的左侧来填充当前字符串，使字符串达到指定长度。                             |
| trimStart  | 方法会删除字符串开头的空白字符                                                                     |
| trimEnd    | 方法会删除字符串末尾的空白字符                                                                     |
| trim       | 方法从字符串的两端清除空格                                                                         |
| startsWith | 方法用来判断当前字符串是否以另外一个给定的子字符串开头                                             |
| endsWith   | 方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的                                       |
| repeat     | 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本                           |

### 1、padStart

用一个字符串从当前字符串的左侧来填充当前字符串，使字符串达到指定长度。

> 返回结果为填充后的新字符串

**语法**

```js
padEnd(targetLength[, padString])
```

- targetLength 当前字符串需要填充到的目标长度
- padString 填充字符串，如果需要的话，会复复多次来填充

**基本用法**

```js
console.log('abcd'.padStart(7, '*')) // ***abcd
console.log('abcd'.padStart(7, '@#')) // @#@abcd
```

**注意事项**

- 如果`targetLength`的值 `<=` 当前字符串的长度，则返回当前字符串本身

```js
console.log('abcd'.padStart(4, '*')) // abcd
```

- 如果 padString 长度过长，只会保留最左侧部分，其他部分会被截断

```js
console.log('abcd'.padStart(8, '01234')) // 0123abcd
```

### 2、padEnd

用一个字符串从当前字符串的末尾来填充当前字符串，使字符串达到指定长度。

> 返回结果为填充后的新字符串

**语法**

```js
padEnd(targetLength[, padString])
```

- targetLength 当前字符串需要填充到的目标长度
- padString 填充字符串，如果需要的话，会复复多次来填充

**基本用法**

```js
let str = '清心'.padEnd(6, '爱你')
console.log(str) // 清心爱你爱你

let str2 = '清心'.padEnd(5, '52')
console.log(str2) // 清心525
```

**注意事项**

- 如果 targetLength 的值 `<=` 当前字符串的长度，则返回当前字符串本身

```js
let str = '清心'.padEnd(2, '爱你')
console.log(str) // 清心
```

- 如果 padString 长度过长，只会保留最左侧部分，其他部分会被截断

```js
str = '清心'.padEnd(5, '520def')
console.log(str) // 清心520
```

**案例应用**

将以下 map 数据，在控制台以以下图形式显示出来

```js
const map = new Map([
  ['luobo', 5],
  ['baicai', 2.5],
  ['doujiao', 3],
  ['huacai', 5],
])
```

![image-20230208170954825](data:image/png;base64,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)

```js
map.forEach((v, k) => {
  console.log(`${k.padEnd(20, '-')}${v}`)
})
```

### 3、trimStart

**`trimStart()`** 方法会删除字符串开头的空白字符。`trimLeft()` 是此方法的别名

```js
let str = '   love   '
console.log(str.length) // 10
str = str.trimStart() // 去掉前面的空白字符
console.log(str) // "love   "
console.log(str.length) // 7
```

### 4、trimEnd

**`trimEnd()`** 方法会删除字符串末尾的空白字符。`trimRight()` 是这个方法的别名。

```js
let str = '   love   '
console.log(str.length) // 10
str = str.trimEnd() // 去掉字符串后面的空白字符
console.log(str) // "   love"
console.log(str.length) // 7
```

### 5、trim

**`trim()`** 方法从字符串的两端清除空格，返回一个新的字符串，而不修改原始字符串

```js
let str = '   love   '
console.log(str.length) // 10
str = str.trim()
console.log(str) // "love"
console.log(str.length) // 4
```

### 6、startsWith

**`startsWith()`** 方法用来判断当前字符串是否以另外一个给定的子字符串开头。如果是返回 `true`，否则返回`false`。

> **注意**：此方法，严格区分大小写

**语法**

```js
str.startsWith(searchString[, position])
```

- searchString 要搜索的子字符串
- position 可选参数 在 `str` 中搜索 `searchString` 的开始位置，默认值为 0

**基本用法**

```js
console.log('data_iconfont'.startsWith('data_')) // true
console.log('data_iconfont'.startsWith('data-')) // false
console.log('data_iconfont'.startsWith('icon', 4)) // false
console.log('data_iconfont'.startsWith('icon', 5)) // true
```

### 8、endsWith

**`endsWith()`** 方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的。

如果是，返回结果为`true`，否则为 `false`。

> **注意**：此方法，严格区分大小写

**语法**

```js
str.endsWith(searchString[, length])
```

- searchString : 要搜索的子字符串
- length ： 作为 `str` 的长度。默认值为 `str.length`

**基本用法**

```js
console.log('data_iconfont'.endsWith('font')) // true
console.log('data_iconfont'.endsWith('t')) // true
console.log('data_iconfont'.endsWith('con', 9)) // true
console.log('data_iconfont'.startsWith('con', 10)) // false
```

### 9、repeat 方法

构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

**语法**

```js
str.repeat(count)
```

介于 `0` 和 `+Infinity`之间的整数。表示在新构造的字符串中重复了多少遍原字符串。

```js
// "abc".repeat(-1); // 报错
console.log('abc'.repeat()) // ""
console.log('abc'.repeat(0)) // ""
console.log('abc'.repeat(1)) // abc
console.log('abc'.repeat(2)) // abcabc
console.log('abc'.repeat(3)) // abcabcabc
```

## 二、数组新增方法

数组相关的实例方法

| 实例方法    | 说明                                                                                                                | 是否更改原数组 |
| :---------- | :------------------------------------------------------------------------------------------------------------------ | :------------- |
| map         | 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。                                  | 否             |
| some        | 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试                                                           | 否             |
| every       | 测试一个数组内的所有元素是否都能通过某个指定函数的测试                                                              | 否             |
| reduce      | **reducer** 逐个遍历数组元素，每一步都将当前元素的值与上一步的计算结果做相关操作，一下到没有更多元素相加            | 否             |
| reduceRight | 与 reduce 一样，只是他默认的从数组的尾元素开始，即从右向左                                                          |                |
| keys        | 返回一个遍历器对象，用来遍历所有的键名                                                                              | 否             |
| values      | 返回一个遍历器对象，用来遍历所有的键值                                                                              | 否             |
| entries     | 返回一个遍历器对象，用来遍历**[键名，键值]**组成的数组                                                              | 否             |
| fill        | 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。                                    | 是             |
| copyWithin  | 访方法浅复制数组的一部分到同一数组中的另一个位置，会覆盖原数组成员，但不会改变原数组的**长度**。 返回改变后的原数组 | 是             |
| flat        | flat 方法用于将数组按指定层级来扁平化（展开）。返回值为一个新的数组                                                 | 否             |
| flatMap     | flatMap 方法相当于数组的 map 方法和 flat 方法的合并用法                                                             | 否             |
| at          | 返回数组指定索引的元素。索引值允许正数和负数。                                                                      | 否             |

> 关于数组的：includes、find、findIndex 方法，之前讲完，这里就不再重复

数组的静态方法

| 静态方法     | 说明                                                       |
| :----------- | :--------------------------------------------------------- |
| `Array.from` | 对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。 |
| `Array.of`   | 通过可变数量的参数创建一个新的 `Array` 实例                |

### 1、map 方法

`map()` 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

**语法**

```js
map(function (element, index, array) {
  /* … */
}, thisArg)
// 或
map((element, index, array) => {})
```

- 回调函数中的三个参数
  - element 表示数组中正在处理的当前元素
  - index 数组中正在处理的当前元素的索引
  - array 调用 map 方法的数组
- thisArg 可选参数，用来更改回调函数中的 this 指向，如果回调函数为箭头函数，则 this 更改无效

**基础应用**

- 将数组中每个元素乘以 2

```js
const arr = [1, 2, 3]
const newArr = arr.map((value) => value * 2)
console.log(newArr) // [2, 4, 6]
```

- 求数组中每个元素的平方

```js
const arr = [1, 2, 3]
const newArr = arr.map((value) => Math.pow(value, 2))
console.log(newArr) // [1, 4, 9]
```

- 获取字符串中每个字符对应的 ASCII 码的映射关系

```js
const str = 'hello'
const charCods = Array.prototype.map.call(str, (value) => {
  return {
    [value]: value.charCodeAt(0),
  }
})
console.log(charCods)
```

![image-20230207201829381](https://www.arryblog.com/assets/img/image-20230207201829381.ad758473.png)

**回调函数中 this 指向**

```js
const arr = ['a', 'b', 'c']
const obj = { a: 1, b: 2 }
arr.map(() => {
  console.log(this) // window
}, obj)

arr.map(function () {
  console.log(this) // { a: 1, b: 2 }
}, obj)
```

### 2、some 方法

**`some()`** 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。

> 即：只要有一个通过测试，返回值就为 true，否则为 false

**语法**

```js
some(function (element, index, array) {
  /* … */
}, thisArg)
// 或
some((element, index, array) => {
  /* … */
})
```

- 回调函数中的三个参数
  - element 表示数组中正在处理的当前元素
  - index 数组中正在处理的当前元素的索引
  - array 调用 map 方法的数组
- thisArg 可选参数，用来更改回调函数中的 this 指向，如果回调函数为箭头函数，则 this 更改无效

**基本用法**

- 测试数组中是否存在偶数

```js
const result = [1, 3, 5, 7, 9].some((value) => value % 2 === 0)
console.log(result) // false

const result2 = [1, 4, 5, 7, 9].some((value) => value % 2 === 0)
console.log(result2) // true
```

- 检测以下数组中，蔬菜价格是否有大于 10 元的

```js
const arr = [
  { name: '白菜', price: 7 },
  { name: '西蓝花', price: 11 },
  { name: '豆角', price: 9 },
]

const result = arr.some((v) => v.price >= 10)
console.log(result) //true
```

### 3、every 方法

**`every()`** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试

> 即：只有数组中所有元素通过测试，返回值才为 true，否则为 false

**语法**

```js
every(function (element, index, array) {
  /* … */
}, thisArg)
// 或
every((element, index, array) => {
  /* … */
})
```

- 回调函数中的三个参数
  - element 表示数组中正在处理的当前元素
  - index 数组中正在处理的当前元素的索引
  - array 调用 map 方法的数组
- thisArg 可选参数，用来更改回调函数中的 this 指向，如果回调函数为箭头函数，则 this 更改无效

**基本用法**

- 检测数组中是否所有元素都小于 100

```js
const result1 = [20, 30, 40, 50, 120].every((v) => v < 100)
console.log(result1) // false

const result2 = [20, 30, 40, 50, 10].every((v) => v < 100)
console.log(result2) // true
```

### 4、reduce 方法

**`reduce()`** 方法对数组中的每个元素按序执行一个由您提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。

> 否则，数组索引为 0 的元素将被作为初始值 `initialValue`，迭代器将从第二个元素开始执行（索引为 1 而不是 0）

**语法**

```js
reduce(function (previousValue, currentValue, currentIndex, array) {
  /* … */
}, initialValue)
```

- initialValue 可选参数，作为第一次调用 `callback` 函数时参数 `previousValue` 的值

> 回调函数中的 4 个参数，分别表示：

| 参数          | 说明                                                                                                                                             |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| previousValue | 上一次调用 `callbackFn` 时的返回值。在第一次调用时，若指定了初始值 `initialValue`，其值则为 `initialValue`，否则为数组索引为 0 的元素 `array[0]` |
| currentValue  | 数组中正在处理的元素。在第一次调用时，若指定了初始值 `initialValue`，其值则为数组索引为 0 的元素 `array[0]`，否则为 `array[1]`                   |
| currentIndex  | 数组中正在处理的元素的索引。若指定了初始值 `initialValue`，则起始索引号为 0，否则从索引 1 起始                                                   |
| `array`       | 用于遍历的数组                                                                                                                                   |

**基本用法**

- 没有传入 initialValue 参数时，第一次调用 callBackFn，即`previousValue = array[0]`、`currentValue = array[1]`

```js
const result = [1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
  console.log(previousValue, currentValue, currentIndex, array)
  return previousValue
})
```

| 回调函数调用 | previousValue | currentValue | currentIndex | array        | 返回值 |
| :----------- | :------------ | :----------- | :----------- | :----------- | :----- |
| 第一次       | 1             | 2            | 1            | [1, 2, 3, 4] | 1      |
| 第二次       | 1             | 3            | 2            | [1, 2, 3, 4] | 1      |
| 第三次       | 1             | 4            | 3            | [1, 2, 3, 4] | 1      |

> 最终返回值为最后一次回调函数的返回值： 1

- 传入 initialValue 参数时，即`previousValue = initialValue`、`currentValue = array[0]`

```js
const result = [1, 2, 3, 4].reduce((previousValue, currentValue, currentIndex, array) => {
  console.log(previousValue, currentValue, currentIndex, array)
  return previousValue
}, 10)
console.log(result)
```

| 回调函数调用 | previousValue | currentValue | currentIndex | array        | 返回值 |
| :----------- | :------------ | :----------- | :----------- | :----------- | :----- |
| 第一次       | 10            | 1            | 0            | [1, 2, 3, 4] | 10     |
| 第二次       | 10            | 2            | 1            | [1, 2, 3, 4] | 10     |
| 第三次       | 10            | 3            | 2            | [1, 2, 3, 4] | 10     |
| 第四次       | 10            | 4            | 3            | [1, 2, 3, 4] | 10     |

> 最终返回值为最后一次回调函数的返回值： 10

**案例应用**

- 求数组中所有元素之和

```js
const result = [10, 20, 30, 40].reduce((previousValue, currentValue) => {
  return previousValue + currentValue
})
console.log(result)
```

| 回调函数调用 | previousValue | currentValue | currentIndex | array        | 返回值 |
| :----------- | :------------ | :----------- | :----------- | :----------- | :----- |
| 第一次       | 10            | 20           | 1            | [1, 2, 3, 4] | 30     |
| 第二次       | 30            | 30           | 2            | [1, 2, 3, 4] | 60     |
| 第三次       | 60            | 40           | 3            | [1, 2, 3, 4] | 100    |

> 最终返回值为：100

- 数组去重

```js
const result = [1, 2, 2, 3, 3, 4, 5].reduce((prev, current) => {
  if (!prev.includes(current)) {
    prev.push(current)
  }
  return prev
}, [])
console.log(result) // [1, 2, 3, 4, 5]
```

- 求数组中最大值

```js
const result = [1, 2, 10, 4, 5, 40].reduce((prev, current) => {
  return Math.max(prev, current)
})
console.log(result) // 40
```

- 计算数组中每个元素出现的次数

```js
const result = ['a', 'b', 'a', 'c', 'b', 'd'].reduce((prev, current) => {
  prev.set(current, (prev.get(current) || 0) + 1)
  return prev
}, new Map())
console.log(result) // Map(4) {'a' => 2, 'b' => 2, 'c' => 1, 'd' => 1}
```

> 更多用法 [参考 MDN 官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### 5、keys、values、entries 方法

| 方法        | 说明                                                       |
| :---------- | :--------------------------------------------------------- |
| `keys()`    | 返回一个遍历器对象，用来遍历所有的键名                     |
| `values()`  | 返回一个遍历器对象，用来遍历所有的键值                     |
| `entries()` | 返回一个遍历器对象，用来遍历 **[键名，键值]** 组成的数组。 |

```js
const arr = ['a', 'b', 'a']

// 遍历数组的所有键名
for (let k of arr.keys()) {
  console.log(k) // 0 1 2
}
// 遍历数组的所有键值
for (let v of arr.values()) {
  console.log(v) // a b a
}
// 遍历由数组的 [键名，键值] 组成的数组，然后参于数组的解构赋值
for (let [k, v] of arr.entries()) {
  console.log(`${k} => ${v}`)
  // 结果
  // 0 => a    1 => b   2 => a
}
```

### 6、fill 方法

`fill()`方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

> 返回结果：修改后的数组。

**语法**：

```js
fill(value, start, end) // 参数 start 和 end为可选参数
```

- **value**：用来填充数组元素的值
- **start**：可选参数，起始索引，默认值为 0 ， 如果值为负数，则索引值会被自动计算为数组`length+start`
- **end**: 可选参数，终止索引，默认值为 `arr.length`, 如果值为负数，则索引值会被自动计算为数组`length+start`

**基本用法**

```js
console.log([1, 2, 3].fill('a')) //  ['a', 'a', 'a']
console.log([1, 2, 3].fill('a', 1)) // [1, 'a', 'a']
console.log([1, 2, 3, 4, 5].fill('a', 1, 4)) //  [1, 'a', 'a', 'a', 5]
console.log([1, 2, 3, 4, 5].fill('a', -4, -1)) // [1, 'a', 'a', 'a', 5]
console.log([1, 2, 3, 4, 5].fill('a', -1, -4)) //  [1, 2, 3, 4, 5]
```

**注意事项**

- `fill()`方法被设计为一个通用方法，其方法内部的 this 不一定非要是数组，可以利用 call 来修改，也就是说，`fill()`方法，可以用来操作类数组对象

```js
console.log([].fill.call({ a: 1, b: 2, c: 3 }))
console.log([].fill.call({ a: 1, b: 2, c: 3 }, 8))
console.log([].fill.call({ a: 1, b: 2, c: 3, length: 3 }, 8))
console.log([].fill.call({ length: 3 }, 8))
```

![image-20230208150627405](https://www.arryblog.com/assets/img/image-20230208150627405.037af0d0.png)

- `fill()` 中用来填充的数据，如果是一个引用类型，会导致执行同一个引用

```js
const arr = [1, 2, 3, 4]
arr.fill({}, 1)
console.log(arr) // [1,{},{},{}]

arr[1].a = 1
console.log(arr) // [1,{a:1},{a:1},{a:1}]
```

### 7、copyWithin

**`copyWithin()`** 方法浅复制数组的一部分到同一数组中的另一个位置，会覆盖原有成员。不会改变原数组的长度。

> 返回结果为改变后的原数组

**语法**

```js
copyWithin(target, start, end)
```

- target 目标索引，从该位置开始替换数据
  - 如果为负数，其值相当于等于 `arr.length + start`
  - 如果大于 arr.length，将不发生拷贝。
  - 如果在 start 和 end 之后，复制的序列将被修改以符合 `arr.length`
- start 可选，从该位置开始读取数据。默认值为 0 ， 如果为负数，其值等于`arr.length + start`
- end 可选，到该 位置停止读取数据。默认值为`arr.length`， 如果为负数，其值等于 `arr.length + end`

**基本用法**

```js
;[1, 2, 3, 4, 5].copyWithin(0, 2) //  [3, 4, 5, 4, 5]
;[1, 2, 3, 4, 5, 6].copyWithin(2, 3, 5) // [1, 2, 4, 5, 5, 6]
;[1, 2, 3, 4, 5, 6].copyWithin(4, 2, 5) // [1, 2, 3, 4, 3, 4];
;[1, 2, 3, 4, 5, 6].copyWithin(1, -4, -2) // [1, 3, 4,4, 5, 6];
;[1, 2, 3, 4, 5, 6].copyWithin(1, -2, -4) //  不变 [1, 2, 3, 4, 5, 6]
```

- `copyWithin`方法，利用 call 方法改变内部 this，也可以用来操作类数组对象

```js
let obj = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', length: 5 }
obj = [].copyWithin.call(obj, 0, 1, 3)
console.log(obj) // {0: 'b', 1: 'c', 2: 'c', 3: 'd', 4: 'e', length: 5}
```

### 8、flat 方法

flat 方法用于将数组按指定层级来扁平化（展开）。

> 返回值为一个新的数组

**语法**

```js
flat(depth)
```

- depth 可选参数，默认值为 1 ，用来指定数组的展开层级。 如果值 `<= 0`，表示不展开

**基本应用**

- 扁平化嵌套数组

```js
const arr1 = [1, [2, [3, 4]], 5]
const arr2 = arr1.flat()
console.log(arr2)
console.log(arr1 === arr2) // false

console.log([1, [2, [3, 4]], 5].flat(2)) //  [1, 2, 3, 4, 5]

// 使用 Infinity，可以展开任意深度的嵌套
const arr = [1, [2, [3, 4, [5, [6], 7], 8], 9]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- 移除数组中的空项

```js
const arr = [1, , , [, 2, 3, ,], 4]
console.log(arr.flat(0)) // [1,[, 2, 3, ,], 4]
console.log(arr.flat()) // [1, 2, 3, 4]
```

### 9、flatMap 方法

flatMap 方法相当于数组的 map 方法和 flat 方法的合并用法。

数组调用`flatMap`方法，相当于先调用数组的`map`，然后再将返回的结果数组再调用 `flat()` 方法展开，展开深度为 1。

> 返回值为一个新的数组。

**语法**

```js
flatMap(function (currentValue, index, array) {
  /* … */
}, thisArg)
```

- callBack 回调函数的三个参数
  - currentValue： 当前正在数组中处理的元素
  - index：可选的。数组中正在处理的当前元素的索引
  - array：可选的。被调用的 `map` 数组
- thisArg 可选的，用来更改 callBack 回调函数中的 this 指向

**基本用法：**

```js
const arr = [1, 2, 3, 4]
const res = arr.flatMap((x) => [x * 2])
console.log(res)

// 上面代码 arr.flatMap((x) => [x * 2]) 的内部相当于执行了以下两步
const arr2 = arr.map((x) => [x * 2])
const res2 = arr2.flat()
console.log(res2)
```

- 将几句话的数组拆份成单个词组成的新数组

```js
const arr = ['Happy New Year', 'May you be happy and prosperous']
const word = arr.flatMap((v) => v.split(' '))
console.log(word) // ['Happy', 'New', 'Year', 'May', 'you', 'be', 'happy', 'and', 'prosperous']
```

### 10、at 方法

返回数组指定索引的元素。索引值允许正数和负数。 负数表示从末尾开始。

**语法**

```js
at(index) // index为整数，正数负数都可以
```

**基本用法**

```js
;[1, 2, 3].at(1) // 2
;[1, 2, 3].at(-1) // 3
```

### 11、Array.from 方法

`Array.form()`方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

> 返回值：一个新的数组实例

**语法**

```js
Array.from(
  arrayLike,
  function mapFn(element, index) {
    /* … */
  },
  thisArg,
)
```

**参数**

- arrayLike： 想要转换成数组的伪数组对象或可迭代对象
- mapFn： 如果指定了该参数，新数组中的每个元素会执行该回调函数。 相当新生成的数组实例，再调用 map 方法
- thisArg：可选参数，执行回调函数 `mapFn` 时 `this` 对象。 默认 this 指向`window`

**基本应用**

- string 类型生成数组

```js
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']
```

- Set 生成数组

```js
const set = new Set(['a', 'b', 'c', 'd'])
console.log(Array.from(set)) // ['a', 'b', 'c', 'd']
```

- Map 生成二维数组

```js
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
console.log(Array.from(map)) // [["a", 1],["b", 2],["c", 3]]

// 传入第二个参数
let res = Array.from(map, (v) => v[1])
console.log(res) // [1, 2, 3]

// 传入第三个参数，修改this指向
let res = Array.from(map, (v, i) => this[i], ['foo', 'bar', 'zoo'])
console.log(res) // [undefined, undefined, undefined]

// 修改this只能是普通函数
let res2 = Array.from(
  map,
  function (v, i) {
    return this[i]
  },
  ['foo', 'bar', 'zoo'],
)
console.log(res2)
```

### 12、Array.of 方法

**`Array.of()`** 方法通过可变数量的参数创建一个新的 `Array` 实例，而不考虑参数的数量或类型。

**语法**

```js
Array.of(element0, element1, /* … ,*/ elementN)
```

**基本用法**

```js
Array.of() // []
Array.of(1) // [1]
Array.of(1, 2, 3) // [1, 2, 3]
```

此方法主要目的是：

> 弥补数组构造函数 `Array()` 的不足

`Array.of()` 和 `Array()` 构造函数之间的区别在于对单个参数的处理：`Array.of(7)` 创建一个具有单个元素 `7` 的数组，而 `Array(7)` 创建一个 `length` 为 `7` 的空数组

> 这意味着一个由 7 个空槽组成的数组，而不是具有实际 `undefined` 值的槽

```js
Array.of(7) // [7]
new Array(7) //  [empty × 7]
```

**模拟 ArrayOf 方法**

```js
Array.of = function () {
  return [].slice.call(arguments)
}
```

## 三、对象新增方法

对象的静态方法

| 静态方法                             | 说明                                                                                                   |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `Object.is()`                        | 方法判断两个值是否为同一个值                                                                           |
| `Object.assign()`                    | 方法用于将源（source)对象的所有可枚举的自有属性复制到目标 target 对象                                  |
| `Object.freeze`                      | 方法可以**冻结**一个对象                                                                               |
| `Object.keys()`                      | 返回一个由一个给定对象的自身可枚举属性组成的数组                                                       |
| `Object.values()`                    | 返回一个给定对象自身的所有可枚举属性值的数组                                                           |
| `Object.entrie()`                    | 返回一个给定对象自身可枚举属性的键值对数组                                                             |
| `Object.getOwnPropertyDescriptor()`  | 方法返回指定对象上一个自有属性对应的属性描述符                                                         |
| `Object.getOwnPropertyDescriptors()` | 方法用来获取一个对象的所有自身属性的描述符                                                             |
| `Object.getOwnPropertyNames()`       | 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组 |
| `Object.getOwnPropertySymbols()`     | 方法返回一个给定对象自身的所有 Symbol 属性的数组                                                       |
| `Object.fromEntries()`               | 方法把键值对列表转换为一个对象                                                                         |
| `Object.setPrototypeOf()`            | 设置一个指定的对象的原型（即，内部 `[[Prototype]]` 属性）到另一个对象或 `null`                         |
| `Object.getPrototypeOf()`            | 方法返回指定对象的原型                                                                                 |

### 1、Object.is 方法

**`Object.is()`** 方法判断两个值是否为同一个值。如果是同一个值，返回 true,否则返回 false。

其判断标准与`===`相似，唯一的差别在于他两对零值 和 NaN 的判断不同

- `===`中认为`0,-0,+0`是同一个值，NaN 和 NaN 是不同的值
- `Object.is()`中认为`0,-0,+0` 三者中只有`0、+0`是同值

```js
console.log(Object.is(1, 1)) // true
console.log(Object.is(true, 1)) // false
console.log(Object.is([], [])) // false

console.log(NaN === NaN) // false
console.log(0 === -0) // true
console.log(0 === +0) // true
console.log(-0 === +0) // true

console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(0, -0)) // false
console.log(Object.is(0, +0)) // true
console.log(Object.is(-0, +0)) // false
```

### 2、Objec.assign 方法

`Object.assign()`方法用于将源（source）对象的所有**可枚举**的**自有**属性复制到目标 target 对象。

> 返回值：为 target 目标对象

**语法**

```js
Object.assign(target, sources1, sources1,...)
```

- `target`：目标对象，接收源对象属性的对象，也是修改后的返回值
- `sources1, sources1,...`： 为源对象

**基本用法**

```js
const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
Object.assign(obj1, obj2)
console.log(obj1) // {a: 1, b: 2, c: 3, d: 4}

// 注意区分以下写法的不同
Object.assign(obj1, obj2) // 将obj2合并到obj1
const obj = { ...obj1, ...obj2 } // 将obj1和obj2合并到一个新对象，然后赋值给obj

// 用Object.assign实现 const obj= {...obj1,...obj2} 写法如下
const obj = Object.assign({}, obj1, obj2)
```

- 如果

  ```
  Object.assign
  ```

  方法只有一个参数

  - 该参数为一个对象，直接将该对象作为返回值返回。
  - 如果该参数不是一个对象类型，会先转换为对象类型，然后将其作为返回值返回。
  - 如果该参数是`null`或`undefined`，因为`null`和`undefined`不能转换为对象，所以会报错。

```js
// 只有一个参数，且为对象类型，直接将该对象作为返回值返回
const obj1 = Object.assign({ a: 1, b: 2 })
console.log(obj1) // {a: 1, b: 2}

//只有一个参数，且为基本数据类型，将基转换为对象然后作为返回值返回
const obj2 = Object.assign(2)
console.log(obj2) // Number {2}

// 由于null和undefined不能转换为对象，者报错
const obj3 = Object.assign(null) // 报错
const obj4 = Object.assign(undefined) // 报错
```

- ```
  Object.assign
  ```

  方法的源对象位置的参数

  - 如果是非对象类型的参数，则会将其自动转换为对象
  - 如果是`null`和`undefined`，则会直接忽略，并不会报错

```js
const obj1 = { a: 1, b: 2 }
Object.assign(obj1, 1, 'hello', null, undefined, true)
console.log(obj1) // {0: 'h', 1: 'e', 2: 'l', 3: 'l', 4: 'o', a: 1, b: 2}
```

### 3、Object.assign 的注意事项

如果目标对象与源对象具有相同的属性，则目标对象中的属性将被源对象属性覆盖。

```js
const obj1 = {
  color: ['红色', '黑色'],
  a: 1,
  b: 2,
}
const obj2 = {
  color: ['白色', '蓝色'],
  b: 3,
  c: 4,
}

Object.assign(obj1, obj2)
console.log(obj1)
```

![image-20230208191020024](https://www.arryblog.com/assets/img/image-20230208191020024.799cb42a.png)

- 将源对象中的属性复制到目标对象，其本质是浅拷贝

```js
const obj1 = {}
const obj2 = {
  arr: [1, 2],
}
Object.assign(obj1, obj2)
obj2.arr.push(3) // 修改obj2的arr属性，其相当于修我以为了obj1的arr属性
console.log(obj1.arr) //  [1, 2, 3]
```

- `Ojbect.assign`方法将只能将源对象上的自身可枚举属性复制到目标对象，只要是自身的可枚举属性，其属性名为 Symbol 类型也会被复制

```js
const obj = { a: 1, b: 2 }
const obj2 = { c: 3, [Symbol()]: 'Symbol' }
// 为obj2添加两个自身属性
Object.defineProperties(obj2, {
  name: {
    value: '清心', // 属性值
    writable: true, // 可写
    configurable: false, // 不可重匹配
    enumerable: true, // 可枚举
  },
  age: {
    value: 33,
    writable: true,
    configurable: false,
    enumerable: false, // 不可格举
  },
})

console.log(obj2) // {c: 3, name: '清心', age: 33, Symbol(): 'Symbol'}
Object.assign(obj, obj2)
console.log(obj) // {a: 1, b: 2, c: 3, name: '清心', Symbol(): 'Symbol'}
```

- 如果源对象上有 get 和 set 函数，其相当于新增一个属性合并到原型中，但没有 get 和 set 函数

```js
const obj1 = {
  a: 1,
  b: 2,
}
const obj2 = {
  _x: 'a',
  get x() {
    return this._x
  },
  set x(value) {
    if (x === 3) {
      throw new Error('值不能为3')
    } else {
      this._x = value
    }
  },
}

Object.assign(obj1, obj2)
console.log(obj1) // {a: 1, b: 2, _x: 'a', x: 'a'}
obj1.x = 3
console.log(obj1.x)
```

### 4、Object.assign 的常见应用

常用合并默认参数和用户参数

```js
// userOptions为用户参数
const userInfo = (userOptions) => {
  // 默认参数
  const DEFAULTS = {
    username: 'icoding',
    age: 0,
    sex: 'male',
  }

  // 合并默认参数和用户参数
  const options = Object.assign({}, DEFAULTS, userOptions)
  console.log(options)
}

userInfo() // {username: 'icoding', age: 0, sex: 'male'}
userInfo({}) // {username: 'icoding', age: 0, sex: 'male'}
userInfo({ username: 'arry' }) // {username: 'arry', age: 0, sex: 'male'}
userInfo({ username: '清心', age: 18, sex: 'female' }) // {username: '清心', age: 18, sex: 'female'}
```

### 6、keys、values、entries

| 方法    | 说明                                                                                                                                               |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| keys    | 返回一个由一个给定对象的**自身可枚举**属性（不包括 Symbol 类型）组成的**数组**，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致         |
| values  | 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 `for...in` 循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性）。             |
| entries | 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性 |

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
}
// 定义自身属性
Object.defineProperties(obj, {
  name: {
    value: '清心',
    enumerable: true,
  },
  age: {
    value: 33,
  },
})

const keys = Object.keys(obj)
console.log(keys) // ['a', 'b', 'c', 'name']

const values = Object.values(obj)
console.log(values) // [1, 2, 3, '清心']

const entries = Object.entries(obj)
console.log(entries) // [Array(2), Array(2), Array(2), Array(2)]
```

与 `for...of` 的结合应用

```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
}
// 遍历对象的所有自身可枚举属性名
for (let key of Object.keys(obj)) {
  console.log(key)
}
// 遍历对象的所有自身可枚举属性值
for (let values of Object.values(obj)) {
  console.log(values)
}
// 遍历对象的属性名与对应的属性值
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key} => ${value}`)
}
```

注意和数组、Set、Map 的 keys、values、entries 方法对比

调用方式的不同

- 对象是构造函数的方法，将对象传入的方式 `Object.keys(obj)`
- 数组是实例的方法，通过实例对象就可以调用方法 `[1, 2, 3].keys()` ，而对象是没有的

返回值的不同

- 对象的`Object.keys()`、`Object.values()`、`Object.entries()` 等方法是构造函数方法，返回的都是数组
- 数组的`keys()`、`values()`、`entries()` 等方法是实例方法，返回的统一都是数组的遍历对象 Iterator

```js
console.log([1, 2, 3].keys()) // Array Iterator {}
console.log([1, 2, 3].values()) // Array Iterator {}
console.log([1, 2, 3].entries()) // Array Iterator {}
```

### 7、Object.getOwnPropertyDescriptor

方法返回指定对象上一个自有属性对应的属性描述符，如果对象身上有这个属性，返回其属性描述符对象，否则返回`undefined`

**语法**

```js
Object.getOwnPropertyDescriptor(obj, prop)
// obj 需要查找的目标对象
// prop 目标对象内属性名称
const obj = {
  name: '清心',
  get sex() {
    return this._sex
  },
  set sex(value) {
    this._sex = value
  },
}
Object.defineProperty(obj, 'age', {
  value: 33,
  configurable: false,
  enumerable: true,
  writable: false,
})

let desc1 = Object.getOwnPropertyDescriptor(obj, 'name')
console.log(desc1)
let desc2 = Object.getOwnPropertyDescriptor(obj, 'sex')
console.log(desc2)
let desc3 = Object.getOwnPropertyDescriptor(obj, 'age')
console.log(desc3)
```

![image-20230210172810537](https://www.arryblog.com/assets/img/image-20230210172810537.1a6f9bda.png)

### 8、Object.getOwnPropertyDescriptors

获取一个对象的所有自身属性的描述符。如果没有属性，则返回空对象

**语法**

```js
const obj = {
  name: '清心',
  get sex() {
    return this._sex
  },
  set sex(value) {
    this._sex = value
  },
}
Object.defineProperty(obj, 'age', {
  value: 33,
  configurable: false,
  enumerable: true,
  writable: false,
})

let descAll = Object.getOwnPropertyDescriptors(obj)
console.log(descAll)
```

![image-20230210171959839](https://www.arryblog.com/assets/img/image-20230210171959839.2925a3f3.png)

浅拷贝一个对象

`Object.assign()`方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型。

而 `Object.getOwnPropertyDescriptors` 方法配合 `Object.create()` 方法可以实现上面说的这些。

```js
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
const obj = {
  name: '清心',
  get sex() {
    return this._sex
  },
  set sex(value) {
    if (value < 33) {
      throw new Error('年龄不符')
    } else {
      this._sex = value
    }
  },
}
Object.defineProperty(obj, 'age', {
  value: 33,
  configurable: false,
  enumerable: true,
  writable: false,
})

const obj2 = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
console.log(obj2)
obj2.sex = 22
```

![image-20230210172539691](https://www.arryblog.com/assets/img/image-20230210172539691.80a64d1e.png)

### 9、Object.getOwnPropertyNames

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

| 方法                         | 原型 | 自身 | 自身 Symbol | 可枚举 | 不可枚举 |
| :--------------------------- | :--- | :--- | :---------- | :----- | :------- |
| `Object.getOwnPropertyNames` |      | ✔    |             | ✔      | ✔        |

**语法**

```js
Object.getOwnPropertyNames(obj)
// 在 ES2015 中，非对象参数被强制转换为对象
const obj = {
  [Symbol()]: 'Symbol',
  name: '清心',
}
Object.defineProperty(obj, 'sex', {
  value: '女',
})

const desc = Object.getOwnPropertyNames(obj)
console.log(desc) // ['name', 'sex']
```

> 如果只想获取对象的自身可枚举属性，可以使用 `Object.keys` 方法。

- 在 ES2015 中，非对象参数被强制转换为对象

```js
Object.getOwnPropertyNames(1) // []
Object.getOwnPropertyNames('hello') //  ['0', '1', '2', '3', '4', 'length']
```

### 10、Object.getOwnPropertySymbols

返回一个给定对象自身的所有 Symbol 属性的数组

| 方法                           | 原型 | 自身 | 自身 Symbol | 可枚举 | 不可枚举 |
| :----------------------------- | :--- | :--- | :---------- | :----- | :------- |
| `Object.getOwnPropertySymbols` |      |      | ✔           | ✔      | ✔        |

**语法**

```js
Object.getOwnPropertySymbols(obj)
const obj = {
  [Symbol()]: 'Symbol',
  name: '清心',
}
Object.defineProperty(obj, 'sex', {
  value: '女',
})

const desc = Object.getOwnPropertySymbols(obj)
console.log(desc) // [Symbol()]
```

### 11、四种获取对象属性方法的对比

| 方法                           | 原型 | 自身 | 自身 Symbol | 可枚举 | 不可枚举 |
| :----------------------------- | :--- | :--- | :---------- | :----- | :------- |
| `Object.keys()`                |      | ✔    |             | ✔      |          |
| `for...in`                     | ✔    | ✔    |             | ✔      |          |
| `Object.getOwnPropertyNames`   |      | ✔    |             | ✔      | ✔        |
| `Object.getOwnPropertySymbols` |      |      | ✔           | ✔      | ✔        |

### 12、Object.freeze

- `Object.freeze()` 方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改。

```js
const obj = {
  a: 1,
  b: 2,
  arr: [1, 2, 3],
}
Object.freeze(obj) // 冻结对象
obj.a = 3 // 修改属性值无效
delete obj.b // 不能删除属 性
obj.c = 4 // 不能添加属性
console.log(obj) // {a: 1, b: 2, arr: [1, 2, 3]}
```

- `Object.freeze()` 冻结对象，属于浅冻结。如果对象的属性是一个引用类型，修改属性值指向的对象的属性是可以。

```js
const obj = {
  a: 1,
  b: 2,
  arr: [1, 2, 3],
}
Object.freeze(obj) // 冻结对象
obj.arr.push('abc')
console.log(obj.arr) // [1, 2, 3, 'abc']
```

**深度冻结**

> 以下代码来自 [MDN 官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

```js
// 深冻结函数。
function deepFreeze(obj) {
  // 取回定义在 obj 上的属性名
  var propNames = Object.getOwnPropertyNames(obj)

  // 在冻结自身之前冻结属性
  propNames.forEach(function (name) {
    var prop = obj[name]

    // 如果 prop 是个对象，冻结它
    if (typeof prop == 'object' && prop !== null) deepFreeze(prop)
  })

  // 冻结自身 (no-op if already frozen)
  return Object.freeze(obj)
}

obj2 = {
  internal: {},
}

deepFreeze(obj2)
obj2.internal.a = 'anotherValue'
obj2.internal.a // undefined
```

### 13、Object.fromEntries

**`Object.fromEntries()`** 方法把键值对列表转换为一个对象。其返回值为一个新的对象。

**语法**

```js
Object.fromEntries(iterable)
// iterable可以理解为一个可迭代对象或一个迭代器对象。可迭代对象或迭代器对象的返回值必须是一个双元素数组。如:二维数组，Map，Object.entries()的返回值等
```

**基本用法**

- 二维数组转对象

```js
const arr = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
]
const obj = Object.fromEntries(arr)
console.log(obj) // {a: 1, b: 2, c: 3}
```

- Map 转 Object

```js
let map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
const obj = Object.fromEntries(map)
console.log(obj) // {a: 1, b: 2, c: 3}
```

- 迭代器对象转对象

```js
function* gen() {
  yield ['a', 1]
  yield ['b', 2]
  yield ['c', 3]
}
const obj = Object.fromEntries(gen())
console.log(obj)
```

总结：

`Object.fromEntries()` 与 `Object.entries` 是互逆的操作
