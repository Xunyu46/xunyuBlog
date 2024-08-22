# JavaScript 算法，大厂前端面试真题

在今天

面对严峻的求职环境，搞定算法是我们提高职场竞争力/迈过面试算法关的必备技能之一，不要因为做前端，就忽略算法的重要性。

数据结构和算法，是大厂前端面试的“拦路虎”，很多同学都望而生畏。其实如果了解常用数据结构，掌握基本的算法思维，就不难应对

**大厂为何要考察算法 ？**

如何在短时间之内快速判断一个工程师是否优秀 ？考察算法是最合理的方式，这是行业内多年的经验积累。

前端面试考算法真不是因为内卷 ！其实，算法一直在后端面试中都被考察，现在前端也考查，说明前端能做的工作越来越多了，也越来越重要了，这是好事。

> 接下来我们开始一步步的提升编程内功，补齐面试中的算法短板。

## 一、手写 flat 方法，实现数组的扁平化

`flat()`方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
flat()
flat(depth)
// 指定要提取嵌套数组的结构深度，depth 默认值为 1。
```

- 我们首先来看下 JS 中数组的 flat 方法

```js
var arr = [0, 1, 2, [3, [4, 5], 6], 7, 8, 9]
var arr1 = arr.flat() // 默认将数组展平1层
console.log(arr1) //  [0, 1, 2, 3, [4, 5], 6, 7, 8, 9]

var arr2 = arr.flat(2) // 将数组展平2层
console.log(arr2) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

**手写 flat 方法源码：**

```js
/**
 *  @param arr 需要扁平化的数组
 *  @param n 指定的扁平化的深度
 *  关于n的类型判断：
 *  - 如果 n 没有传(undefined)，默认值是1
 *  - 如果 n 为正的数字类型字符串，转成对应数字
 *  - 如果 n 为负数，则相当于0
 *  - 如果 n 为true，则表示1  其它都为非数字类型都表示0
 */
function flat(arr, n) {
  // 数据类型判断
  if (!arr.isArray) return
  if (n === undefined) n = 1
  var n = Number(n) >= 0 ? Number(n) : 0
  // 结果数组
  var result = []
  function fn(arr, n) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (Array.isArray(arr[i])) {
        // 如果小于等于0 ,递归次数用尽，则不递归，直接推入
        // 重点
        if (n <= 0) {
          result.push(item)
        } else {
          n-- // 递归次数用掉一次，减1
          fn(item, n) //递归
          n++ // 保持同一层级深度不被减掉
        }
      } else {
        result.push(item)
      }
    }
  }
  fn(arr, n)
  return result
}

var arr = [1, [2], 3, [4, [2, [3]]], [6], [[7], [8, [9]]]]
console.log(flat(arr, Infinity))
console.log(arr.flat(Infinity))
```

## 二、将一个数组旋转 k 步

将数组`[1, 3, 5, 7, 9, 11, 13]`旋转 K 步

### 1、审题：理解题目的意思

假设 k=4 ，即旋转 4 步

- 第一步，得到数组 `[ 13, 1, 3, 5, 7, 9, 11 ]`
- 第二步，得到数组 `[ 11, 13, 1, 3, 5, 7, 9 ]`
- 第三步，得到数组 `[ 9 , 11, 13, 1, 3, 5, 7]`
- 第四步，得到数组 `[ 7, 9, 11, 13，1, 3, 5]`

即数组旋转 4 步后，得到数组`[ 7, 9, 11, 13，1, 3, 5]`

### 2、解题思路

针对这个题，我们有以下两个思路

- **方法一**：把数组尾部的元素用 pop 方法一个一个删除，然后再用 unshift 方法插到数组的前面
- **方法二**：把数组拆分，最后用数组的 concat 方法拼接到一起

### 3、方法一：去尾插头

```js
/**
 * @description 旋转数组 k步 去尾插头
 * @author 清心老师
 * @param k 旋转次数
 * @param arr 旋转数组
 */
function rotateArr(arr, k) {
  // 获取数组的长度
  var length = arr.length
  // 判断如果数组长度为0，或k不存在，则直接返回原数组
  if (length === 0 || !k) return arr
  // k有可能是负数，如果是负数就取绝对值 如-3变 3
  // 如果k的长度大于数组长度时， k%lenght
  var step = Math.abs(k % length)
  // for循环，遍历数组中的每一个数
  for (var i = 0; i < step; i++) {
    var value = arr.pop()
    // 这里不用判断value的值，因为不可能出现删除空的情况
    // 如果要判断可以 if(value!=null){ } 过滤undefined，但0也能通过
    arr.unshift(value)
  }
}
var arr = [1, 3, 5, 7, 9, 11, 13]
rotateArr(arr, 4) //  [7, 9, 11, 13, 1, 3, 5]
console.log(arr)
rotateArr(arr, '4') //
console.log(arr)
// 考虑k的以下情况：
// k是赋值，k是字符串，k不存在，k为0
```

### 4、方法、拆分数组，然后拼接

```js
/**
 * @description 旋转数组 k 步   拆分数组再拼接
 * @author 清心老师
 * @param k 旋转次数
 * @param arr 旋转数组
 */
function rotateArr(arr, k) {
  // 获取数组的长度
  var length = arr.length
  // 判断如果数组长度为0，或k不存在，则直接返回原数组
  if (length === 0 || !k) return arr
  // k有可能是负数，如果是负数就取绝对值 如-3变 3
  // 如果k的长度大于数组长度时， k%lenght
  var step = Math.abs(k % length)
  // 数组的前半部分
  var arrPart1 = arr.slice(0, length - step)
  // 数组的后半部分 arr.slice(-3);从后往前取3个
  var arrPart2 = arr.slice(-step)
  return arrPart2.concat(arrPart1)
}
var arr = [1, 3, 5, 7, 9, 11, 13]
var arr2 = rotateArr(arr, 3)
console.log(arr2) //  [9, 11, 13, 1, 3, 5, 7]
```

### 5、两种方式的复杂度分析

- 思路 1：时间复杂度是 O(n2) 、空间复杂度 O(1)， 为什么呢？
- 思路 2：时间复杂度是 O(1)、空间复杂度是 O(n)

**提示：**

> 我们所前端是重时间，轻空间，思路 1 的时间复杂度 O(n2) ，这个是完全不能接受的。

### 6、性能测试

```js
// 性能测试
var arr = []
for (var i = 0; i < 100 * 1000; i++) {
  arr.push(i)
}
console.time('rotate')
rotateArr(arr, 4000)
console.timeEnd('rotate')
```

对比

- 当旋转次数相同，都是 4000 次时
  - 思路 1 耗时：`50.336181640625 ms`
  - 思路 2 耗时：`0.713134765625 ms`
- 当旋转次数为 40000 次时
  - 思路 1 耗时：`515.923095703125 ms`
  - 思路 2 耗时：`1.344970703125 ms`
- 随着数据规模量变大和旋转次数的增多，**思路 2**的耗时变化不大，但**思路 1**的耗时巨增。

> 在前端领域是重时间轻空间的，所以我们肯定首先**思路 1**

## 三、字符串中括号匹配是否正常

判断一个字符串中的括号`{} [] ()`是否匹配正常，这是一个非常经典的面试题。

> 我们先来审下题，看如何匹配才算是正常匹配的呢？

### 1、审题：理解题目的意思

- 字符串 1 :![image-20220923170359198](data:image/png;base64,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)匹配是正常的
- 字符串 2：![image-20220923170441782](data:image/png;base64,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) 匹配失败，如果`]`在`}`前，就是正常的

### 2、解题思路

这个问题本质是在考查什么呢 ？

他是在考你理不理解栈这种数据结构，如果你会，那这个题就很容易做了。

> 所以我们先来了解下，**栈**这种数据结构，然后再回过头来看，这道题如何解。

### 2.1、什么是栈

- **栈**是一种先进后出的数据结构，要弄明白什么是栈，我们先举一个生活中的例子来帮助大家理解
- 假如你现在有一个长长的圆筒，圆筒的一端是封闭的，另一端是开口，现在往圆筒底部放气球，那先放的是不是在圆筒的底部，后放的是不是在靠近圆筒的位置

> 如下图：

![stack](https://www.arryblog.com/assets/img/stack.b043979b.jpg)

注：

我们现在要从圆筒中取出气球，那我们是不是得先取离圆筒出口最近的一个，即取球时的顺序正好和放的时候的顺序是反的。

我们把圆筒比喻从**栈**，那放气球的过程叫**入栈**，拿气球的过程叫**出栈**；
圆筒的底部称为**栈底**，圆筒出口的第一个气球位置叫**栈顶**。

**总结：**

- 栈是什么：栈是一种先进后出的数据结构（逻辑层面）
- 入栈：进栈时，先进去的在底部，后进去的在栈顶
- 出栈：出栈时，先进去的后出，后进去的先出

### 2.2、数组演示入栈和出栈

- 如果我们把数组比像想成一个栈结构，那他的第一个元素位置就是栈底，最后一个元素位置就是栈顶
- 然后从后往前 push 元素时，就相当于入栈，从后 pop 删除数据时，就相当于出栈

![image-20220923173854225](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAACeCAIAAACuMqo5AAAWq0lEQVR4nO3dfVBTZ74H8F8kQKQQBO0q1Vhga22NXXdtfaFherdba2Xb7u2MWrXe7UzVsn/cnWoL2+vOHd/q7N65HRTa7v5Rq+zt7LVCC52d9ipW09uXgSpaUEehY+1FSlTUyltAEiAh94+HnnMSQsjLSc7zhO9n+OMkHJLnkJzfeZ7f83J0Ho+HAAB4NUnrAgAABIIgBQBcQ5ACAK4hSAEA1xCkAIBrCFIAwDUEKQDgGoIUAHANQQoAuIYgBQBcQ5ACAK4hSAEA1xCkAIBrCFIAwDW91gUIXXk5lZeT2Uxvv611UcLS2Ehnz1Jzs/yM0UgPP0zLlmlXpgiMPhwiysujlSs1KhDEHU94ioo8RP5/qqrCfM1xtbV5CgtH3sViida7RE9VlcdiGfP/ZjR6ioo8bW1alzI4bW2eoiKPyRTocAoLhTmcca1Z43V0QjCbx/x0Rv+ockJFJyyI09wrLyeLhfbt07ocYbHZqKCAVq2iurox97Hbac8esljIao1hycJitdL8+bRnD9lsY+5jt9O+fTR/vgCHMy6rlSortS5E6JqatC6BOkQIUtXVlJ9PGzcGOiV4xiLU0aPB7rxyJe8ndk8P2e1B7Wm3C3A449q5U+sSTGhq5KSqqqKVgCgro6qqQLUPIZw6JV/TjEYqKKDVq+X/mM1G1dW0f7+8j91OGzZQXR2ZTBqUNiQWC61aRStXykVlh7N3r3xFYYfT1qZVGSNVXS38N9BopAceGGcfs1mFNyopoZIS+WFxMe3Zo8LLqtD4VD0J1dDgWbPGYzRGvQkdG1VVI2VesyZQjsYn61FUFMMihqiqymM2B/rc29o8K1Z4HU5paQzLpyq/eTf+HT+u/cmiUpTgsrl3+TJVVvo2KAoLqahIowJFzGikAweooiJQ5aiigiwW+eH778egXGFavJguXAhUfTaZaN8+MhrlZz75JAblUl9xsahJhp4eeVuVWpJ2uAxSPsxmqqoSdcABEaWnU3U1bdgw/p7KfWw2fk+PYNqhJhMVFMgPuT2WABob6Z13RrZXrNC0KJFJS9O6BBHhO0hZLFRaOs5Fm3/LlgU7BsonkJ06FY3ixM6sWfK2iD1NL70kV+f/9CdNixI6ZU1KcFwO5kxPp8JCWr1a1PGNMJpwLY7ycjlfXlRECxdqWprQKYfXKq8WAuIySAVf9QBRTJmidQlCYbPRyy+PbJtMtHmzpqWJGP/dxAHx3dybaBobvR4uXqxROVSibOItX65dOUJXWCg39HbuFP0kFx2CFE++/FLeNpnEPjesVnn8qtFIL7ygaWlCUVYml3zFiqB6PDgkYhJwDAhSPNm7V95++GHtyhExq9Wrr6OoSJiA29hIO3aMbBuNok7DIqLeXnlb6H4nTnNSE9Nrr3n1069erV1RItDYSO+9R++8IzeX1qyh7ds1LVMolD16paXCxNbAdDqvhyYTmc2Ul0dPPSVEhwCCFB+sVvkCTkQWixhXv/x8r4fnz3sNwTWZaOdOkZpLxcVyj564DT2mu3vMX7EheEeP0o4dtGYNvfoq56EKQYoDPkM9jUZ6803tShOKsSa1sTl9W7bEtjSRqa6WJ5oJ3dBjgsxJVVZSTQ2VlvIckRGktFZWJvd2E5HRSNXVnF/ZxldXR+fP08mTXlOpeWazeZ2l5eXCN/SkKVZmszzi/ORJ6u72jV92O23cSOnp3H5SCFLasdnoD3/wWqiIRSiBxogpJxu2tXnl1Ox2qqykykqyWOjQId7P+XXr5IZqYSG3p2sIamvH/NXovCERbdhAixfz+TGhd08jVitZLGJHKCKqrZV/2trI46Hjx2nXLq/vel0dWSxcz9373e/kdqu4y1IHb+FCKimhzz7zmgZgt9Mbb2hXpkAQpLTw2mv0+ONe563FQhcuCBah/Fq2jLZvp7Y22rVLfpIt+8ensjI5/WQ0Uk2NpqWJoYULqabGa6UKXhfeQJCKLXa6KjvyjEbatYtqa/msaYdv+3YqLZUfNjVRWZl2pRmD1eqVEIyDVFRITCbfawmXa6giSMVQY6PvOsJmM1VXizSMKCRbtnglrXhbUspnxOmuXfGQigqVzyFzuXYCglSsWK306KNeHSuFhXHSxAtAOWXvq6+0K4c/O3d6ZY537CCdLtCPUoBficWn5sjlZBoEqZiw2WjLFvmUYAt1xn2Clsg3NQsQOgxBiIl167zuxSBcLx5MEFwu+4UgFX3K5dMmWoRS9mAqO5J4sGoVLV0awv7KG5+Iu9y+D59MeU6ORuUIBEEq+pRrG+zaNYEiFHkny3lb1yHUWTvKIKW8cZPQPvhA3jaZ+JzqgJxUlFmtXg09saaz+RX8sMzqaq+uzCeeiEZxIHxWq9cUxWef1a4ogSBIebPZ5C6b9HQVXlDZpTXuDRqjobxcPiJVRlS+8QYVFPguIjqa1eo1G85kUi1Az58vHxGX43pCo/pXjojKy6m6epx9fEZgGI3crpKM5p6348flbVVOaWWXVlsbFReH9ufPPRdpDby+Xt5Wqy5z9CgdPUpr1tCmTX5ar42N9PbbvqsIKAd2RsJmk2umJlM8tJ1V/8oRUXMz7dnj5/7STGMjvf6615QsIt/JTDxBkPKmPKVVWZb75El522YL+a7TeXmRBinlairqDlZk84cp4DRjprRUtbeOximtLdW/cpK6Oqqro5dfJrNZvhGG3w+oqIjnRASClDdl/ojjFXZCIB3RihXRulSOtaoUERmNKq9VpLxTk6CLl/qIwVcuwBBNNiuL4whFCFK+pPMtPq7SysSEWm09lrnwWehjNKORXnyRNm9WOTJKNdP4aOtRdL5y8+aR0Tj+6FkRluUkwYLUc89RXt7ItlopRiXlKa1WxXvnzojmQ0V4V6sTJ+RttRpcJhOVlFBJCVVX04kT1NTkteZ/WhqZzTRvXrQqBRpeRaqq1H/NaHzliGjDBtqwwf8HRERmM91/v59cFa+EClILF0Y36itP6ccfV+c1tb3aS/UOs1n9b+TKlbGekas8pZcsielbU3TuuRKNr5wk9h9QdGAIgkIM0jcxdv78yAavQ2BCg4zhhIQgpSCNaYqPYYdWq5yVeOopTYuiEqneER8ZQ4q7r1x0qNHc8+k74HWl5HEoT+m4qCTLJ4DZzH9yNCjSEYl10/axxN9XrrGRLl+WH165osqrqhGklOtMElFVlZBB6sKFkY24qXhLvfXx0dZrbBw5peOmrRd/X7n33gt5JGAQhEqcR9Ujj4x033A5ETwcmzaNjCSKsIuQE3feOfIBRaNjVxPx95WLjnCD1KxZXuOMlQT9DkW76zD24mMYkcRkipPqhiT+vnLRCQs6j8cT9h8DAEQbevcAgGtcBynPmTOeM2e0LgUAaInrIOX+85+Hy8u1LgUAaInfIOU5coSuXPF8/TUqUwATGa9BqrfX/dZbbBOVKYBIiJ424TRIDX/wAXV3s21UpgAiIXrahMsg1d4+7L22qdD/YgANxUHahMcg5f7b33zW6xL6XwygmbhIm/AXpC5d8hw5Mvppcf/FAFqJj7QJd0HK/dZb5HaPfl7cfzGANuIlbcJdkEp48039iRP6EycoMdHnV4L+iwE0ETdpEzFWQdArV1kFgHGNnTZJ+DFLJQrualJ+pKZqXQIAwcRT2kSAIKW77z6tiwAgmHhKm4jR3AOAyAmaNhGgJgUAKhA2bSJAkNLF2eqFAFoQN20iQJACgIkMQQoAuCZAkNJNn651EQDEh5xUFM2YoXUJAISnu/derYsQJhGCFABMYAhSAMA1AYIUhiAARE7c3K4AQQoAVCBsbhdBCgC4xn2QmjtX6xIAgJZ4D1K6tDStiwAQD3Rz5mhdhDDxHqQAQB3CXu+5D1LCDpMFAFXwHqTEHSYLAKrgPUgBgApE7oBCkAKIf0J3QPEepHQ//anWRQAALfEepJA4B5jguA9SABAxoSfA8h6kdFlZWhcBALTEe5AiBCmAiY37IAUAkRM5t4sgBRD/hO4l5zpI6R56SOsiAIDGuA5SAAAIUgDxT4ecVLSgaw9AFSJP1Oc6SGGQFABwHaQAAPgOUiI3pAF4IXiLhOsgJfTgDgBO6GbO1LoIEeE6SAEAIEgBANe4DlLi3oQHgB+in0f8BqmErVvFvQkPAEcEP4/4DVK6X/9a6yIAgPb4DVIAAIQgBRD3RB/KgyAFEO/GGBRdc7E/xgUJj17rAgBMdDUX+/+7sY+IDq77id8dth3rtF5y5GYmsh3KanscQ54/Pjol7HesONf3bkNvt2M4MyVhiSk57NeJDdSkADTW4xxu6Rxq6RwKZud620Dlub6Pmm+vP3Sz3jYQ3jsunW1gG/vq7eG9QiwhSAGIZIkpeXN++pTJk1o6h7Ye6dh/avwoM/p+VtkZ+ifuTSGi5huDFef6olJQ9ajW3It9lRVgYlq7IHXpbMMrH99q73UfPNO3abFx9D7Fhzva7W4iot/+Fx26GeDV3m3o/bg5UHLqXxamFsxNiazIEVEtSLEqa5A7syorEV24PvhSfnqoreKKc31NNwZD+hPz9KS1C7CmAsSJ7Az9h8/PKD7c8dg9k/3u0G53/3g+JlPAE7PbMdztGA6wQ48z0G9jQJvEOauyvtvQy6qs63+RqrwalNX2nA7Y2M6dqrdeckS/mADR0trlOtnmZNuXO11sQ2p55WQmKq/c5ulJfr/wJU9OrbnYX3Gu73qvO+9uw+iL/YMzk/NzDBEWVUpgaUWz3r0AVdaOfnfgStkiU3JuZqLyGcfQcHuvm4iy0hImJ/pJtE1NSVCp4AAqONnmfKO2x+dJ6ZllcyYrI07fwDARdTrc2451ElFLh4uIrtldTpdH2mdGmp9+uoyUSXHQgNByCMJYVdan7r/DPD1Jesg+ud/MuyMnc6S0o//vFef62G4fPj8juoUGUEO6YZJ0oe10uFmDS3pmakoCSyopI1G3Y9hvfcrngh2qetvA5R/rBNd73R39biK6Znc7hzy5U/W7l2dG8uKqiChIRanKyn6kHVj0ycnUB7gmsBRVhJ8WQMwUzE2RstHFhzvqWp3k3elUfLhjdHviwZnJGSmTUhIn5WTq0w2Tgs9ns34tqcERpGt2V/A7R09EQSo2VdZgXLO7iSh3Ksamgnj89gI9NCv5oVnJRLR0tuFGn3vLR7eI6C/PTAvvLcbt15LyJFnGhMmJOvakeXpSa5crO0Pj0yqit9eqylpvG/ifb24rn2Ehv6t/mEVAHzxUWQH8qrnYL3WuldX2SPlvZbtBChM1F/sjHA1Q9ptpPvWAvL9eJaJnF6Rym72KKEjFuMoqudw55DfSNVz13ye4e3mo7wAQI4e/kccoVZ7r+7LFESCv6nc0gJR1CSbK8D8JZjTVKnIxqLKOtmyO/0EiEoxUAJ61drmUJ05uZmJL51Dx4Y6SJ6f67GnQ65wuz+VOlzRIsKXDpcwx5WYmhlcVYq8c7hHEgjpBKsZVVsm47TjrpauqvBFANBw4bXe6PFlpCSzWvJSfvvVIR12rs+JcX05m4onvnR397q7+4a4fT66Pmm/7fZ2stPBH2Nxl1Ld0DkkdXxxSJ0jFuMrq1/pDN1s6h5bNmYwMFAihtctVe9lJRI/kTmYTMJaYkpffm/JR8+3jlxx5s4cr/c2qy81MNCTq7jImsISJTx962PqHNB5WHoAKQYqHKiuAcEq+6Ha6PPOmJ81Q1IP++OiU/qHh3cszay7252YmZkyelJEy6e4p+rPXBhuuDkhTX5VC6oBjafLRrJccYzU7TvyrxrftUyFI8VBlBRBLxbk+1s/z+Ki8KmsKKHuliKistqfh6oDPwKXWLtfuT7u6+t17n56m+UCB6In0wLiqsgKI4usrA0Q0b3rS2gWpwSyWMvfORCJyujxSSrfeNvCfn3WxmoH1Ur/PWgiOoWEiShk1RWx0tUiaraF5jWkskQYpTaqsAKJb/bPUhisDhUv8rLLiV8HclNc/73a6PGevDRbMTdl/yn7wTJ/T5THodT7z8xkWvKSZZAGsXZDKgpSKPVrqiigucFhlHX3pAODQElPyq7+cElIDwjw9qeHqwGmbc2PVD803BokoKy3hxSXG0ZGltWvkFEs3BHU6sDzyp985+AxSEZ3SyiprMPsrq6zsmXrbwCsf32q+Mdje67ZeimhZeBb7grl0APAg1Ijw87uSiKi9180ilCXbsPfpaexFNlb9sP7QTanZKM2oHfct2J/Mn5FE/oY6ltX2bDvWGfYixWqJKEit/lmqQa8Lqcpq0OuI6Oy1QSLaf8q+9UhHe6/boNdtXJTmd4HBINXbBtiAtBzMMYa409rl2nas8+AZOXW1OT+95MmpUsvjmt3V0jkkRZlg5ttXnOsrKG9/t6GXiNb9PNWg13U7hsu8p+J29Lutlxx/b+hV93BCFVG9I6pV1pD873cOIpoyeRIS8BBP9p+ys0yuz/Nsuj7T2uViQ6mlBY6arg8SUZbRf3d5xbm+j5v72Xw1VmnIztDn5xislxyffNv/jPkOKfaxVQAyUjROoUTaOAqjytpwdaC9180Se5Zsw+8fTmf/lI1VPziHPE/PSwljqNSXlx1E5BzybDvWicGcILTWLtc/mm5/d2uo6cagNGHFoNfl5xg2LjL++9HOls6hg2f6Zqbr2dnH8iQGvY6dOPW2AXZy3Xenn5oUG/PMttnZx7Y3LjLWXnZ2O4Z3f9p1YNWd7MlOh5uI7p4i8ioIIWntch04bWfjFZjN+enKeHTN7up2DAezePnS2QbKlx/+x2fd7EridHmslxxN169LVTNue1UBxnLgtF055zQ3M3GRKXlL/kg0YeMQnS7P6593X+1xLZuT8tn/OYkod+pISGILhBj0OmX+hKWPiYhFqAdnJv/2wbS/N/S+8vGtf3s0Y4kpOTtDv/4XqQdO9zbfGNxY9cO2xzK+uTnITqsHsjRuncQiSIVXZQ0gO0OfnTES3cpqe9jo0AdnJs9M1x/7tr+91/2ateur752oUoGIdi/P/PpKe+bkhPkzkn51z2SfDAbLsbDhCAdO9x44PZIwypudTET1tgFWD1Aubd7a5Wr4MUjlZiayxkprl+ua3dXe6956pOPVX04pmJuyabGxb9BTea6v+cbgC++P3GCGhxRKtIJUhFVW5esEeBd2mywiykpLKP6nKdkZ+l/dM5mNcGNVKnaViNIxAkRJzYasAL8tmJuSmZLwZm2P1HDLzUxk9abz7QNs8NTGRXI1iqWcai87l9+bIt1ELjtDv/fpaSVfdDdcHXjN2tXjHF67IHVLfnpqko6NwGK7rZx/R1SOMBTRClIRVlnXH7rJVghkqTsadcuKstqeT74dWXohKy1BGmO1xJT84fMzWPBiV4l/Nt8hvS8Ah5SLRwZpiSn54Lqf1Fzs/+p7Z0riJCn0bFps/OH2cP/QsM+Qw93LM+ttAz4X7OwM/V+emfb7f9wixcT+TYuNy+akHDrb913HUN7s5Ej63NWi83jUWUpm9OD6gvIxq6xEVHOxn1VZlU9KAxGU6T0ismQb2HTlmov9n37naLoxKK0Mo0y9+5Tn7ZN29vrzpidteywDI9oBRBTF8zbsKispVis3JOoemJEkVYXeqbcrl0wI0BW4dkFqTmYia/q1dAx9c3MQQQpARKrVpMa9zXqAP/Spsgbe+fXPu83Tk568PyWY0Q+tXa6SL7rzcwxYAQZAUKoFKQCAaMB0XADgGoIUAHANQQoAuIYgBQBcQ5ACAK4hSAEA1xCkAIBrCFIAwDUEKQDgGoIUAHANQQoAuIYgBQBc+38av/ZO7e9D4AAAAABJRU5ErkJggg==)

```js
// 声明一个空数组，用来当成栈
var arr = []

// 向数组中添加元素
for (var i = 0; i < 6; i++) {
  arr.push(i) // 入栈
  console.log(arr)
}

// 取出数组中的元素
for (var i = 0; i < 6; i++) {
  arr.pop() // 出栈
  console.log(arr)
}
```

### 2.3、栈和数组的关系

本质上栈和数组完全不是一个层面上的东西，是不能拿 来做比较的

- **栈**：是一种逻辑结构，是一种理论模型，他是抽像出来的一种结构。
- **数组**：数组是一种物理结构，是实实在在存在的，可能用来操作的和存储数据的，同时还提供了相关的 API，让我们来操作数组。

> 我们有很多种方式来实现栈这种结构来存储和取数据等，其中数组就可以实现栈这种结构来存储和操作数据。

### 3、利用栈结构思想来解题

- 我们可以用 for 循环来遍历字符串中的每一个字符串
- 遇到左括号 `{ ( [`就压栈
- 遇到右括号`] ) }` ，就判断栈顶是否与当前括号匹配，匹配就出栈
- 最后判断栈中数据的 length 长度是否为 0，如果不为 0，则不匹配，为 0 就匹配成功

字符串：![image-20220923170359198](data:image/png;base64,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)的整个入栈和出栈过程实现如下

![zhanguocehng](https://www.arryblog.com/assets/img/zhanguocehng.842d0f27.jpg)

**代码实现**

```js
// 判断字符串是否括号匹配
function matchBracket(str) {
  // 不管什么类型，进来先转成字符串
  str = str + ''
  // 获取字符串长度
  var len = str.length
  // 如果长度为0，则直接返回true
  if (len === 0) return true

  // 定义一个数组，来当栈，左括号入栈
  var stack = []
  // 定义一个变量用来放左括号的字符串
  var leftSymbols = '{[('
  // 定义一个变量用来放右括号的字符串
  var rightSymbols = ')]}'

  // for循环遍历每个字符串
  for (var i = 0; i < len; i++) {
    // 取出每一个字符
    var s = str[i]
    if (leftSymbols.includes(s)) {
      // 判断是左括号，就压栈
      stack.push(s)
    } else if (rightSymbols.includes(s)) {
      // 是右括号，取出栈顶的元素
      var stackTop = stack[stack.length - 1]
      // 判断右括号是否与栈顶匹配，匹配就出栈
      if (isMatch(stackTop, s)) {
        stack.pop()
      } else {
        // 如果不匹配，直接返回false，也就意示着整个字符串括号不匹配
        return false
      }
    }
  }
  // 如果为0，匹配成功，返回true，不匹配就返回false
  return stack.length === 0
}
// 检测栈顶元素与当前右括号元素是否匹配
function isMatch(left, right) {
  if (left === '{' && right === '}') return true
  if (left === '[' && right === ']') return true
  if (left === '(' && right === ')') return true
  return false
}

var str = 'a{(b{c[1,2,3]})}'
var bool = matchBracket(str)
console.log(bool)
```

### 4、算法复杂度分析

- 时间复杂度 O(n)

> 整个过程就一次 for 循环，其内部的 includes 判断，其遍历次数不受输入量的影响，一直是 3 次

- 空间复杂度 O(n)

> 主要是要用一个变量 stack 来存储入栈的数据，其大小不会完全受输入量的影响，但是输入量大，也是有一定影响的，所以定为 O(n)

没有其它方法与此对比，所以性能测试没有对比的可能性。

## 四、找出一个数组中和为 n 的两个数

给出一个有序的递增数组，找出数组中和为 n 的两个数的所有情况

### 1、审题

如：

- 找出数组`[1,3,5,7,10,13,15,20,22,25]`中和为 20 的两个数的所有情况
- 满足条件的有两组：5 和 15 是一组，7 和 13 是一组

### 2、解题思路

- **方法一**：嵌套循环，找到一个数，然后和数组中的其它数都加一遍，如果和为 20，则就保存这两个数
- **方法二**：利用单层 for 循环+双指针来实现。

### 3、方法一：两层 for 循环嵌套

for 循环嵌套查找，也不是说，一定要全部都遍历完，因为是有序的，所有只要找到一组满足要求的元素后，后面的查找范围其实是一直在缩小的。

> 如下

![image-20220927012422573](https://www.arryblog.com/assets/img/image-20220927012422573.a35ed05d.png)

```js
function findTowNumber(arr, n) {
  var result = [] // 用来存入符合要求的元素
  if (!Array.isArray(arr)) return result
  if (isNaN(n)) return result
  var len = arr.length - 1
  var maxLen = arr.length // 记录上一次找到的元素的下标，确定下次查找的范围
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < maxLen; j++) {
      var sum = arr[i] + arr[j]
      if (sum == 20) {
        var obj = {}
        obj.a = arr[i]
        obj.b = arr[j]
        result.push(obj)
        maxLen = j // 因为是升序，所以下次查找的范围，肯定要小于第一次找到的元素下标
        break // 找到就退出
      }
    }
  }
  return result
}

var arr = [1, 3, 5, 7, 10, 10, 10, 13, 15, 20, 22, 25]
```

### 4、方法二：for 循环+双指针

指针：

- 在汉语里，指钟表、仪器上面指示时间和度数的针
- 在程序中，指针就是一个变量，相当于保持了对某一数据的引用

> 比如，你定义了两个变量，分别保存数组中的两个不同的元素，就相当于定义了两个指针，分别用来指向数组中的不同元素。

**双指针解题思路**

我们以查找数组 `arr = [1,3,5,7,10,13,15,20,22,25]`中和为 20 的两个数的所有情况为例来讲解

这是一个递增的数组 arr，我们定义两个变量`i=0` `;j=数组长度-1`

- 如果`arr[i] + arr[j] > 20` 则 `j--`
- 如果`arr[i] + arr[j] < 20` 则`i++`
- 如果`arr[i] + arr[j] = 20`则找到了一组满足要求的数，保存`arr[i]`和`arr[j]`，同时`i++,j--`，继续查找

> 在这里，你可以把`i`和`j`理解为两个指针，因为我们是通过修改`i`和`j`的值，来更改`arr[i]`和`arr[j]`对数组中数据的引用

![image-20220927005653012](data:image/png;base64,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)

注：

当 `i = j` 时，两者重合，就没有查找的必要，所以当`i < j`时，一直查找

**代码实现**

```js
function findTowNumber(arr, n) {
  var result = [] // 用来存入符合要求的元素
  if (!Array.isArray(arr)) return result
  if (isNaN(n)) return result
  var len = arr.length - 1
  var i = 0
  var j = len - 1
  while (i < j) {
    var sum = arr[i] + arr[j]
    if (sum > n) {
      j--
    } else if (sum < n) {
      i++
    } else {
      // 用对象来保存每次符合要求的一组元素
      var obj = {}
      obj.a = arr[i]
      obj.b = arr[j]
      result.push(obj) // 把符合要求的一组数据push到数组中
      i++
      j--
    }
  }
  return result
}

var arr = [1, 3, 5, 7, 10, 10, 13, 15, 20, 22, 25]
console.log(findTowNumber(arr, 20))
```

### 5、算法复杂度分析

- **第一种方式**：时间复杂度介于 O(n) 与 O(n^2) 之间，如果查找的两数之后比较大，则每次要遍历到数且的最后面才能找到对应的数，如果查找的两数之后较小，则时间复杂度就低，因为很快就找到，并且后面的查找范围也会相应索小
- **第二种方式**：时间复杂度为 O(n)

两者的空间复杂度都为 O(1) ，其内存占用，并不因为 arr 增大而成倍成大。

### 6、性能测试

```js
var arr = [1, 3, 5, 7, 10, 10, 10, 13, 15, 20, 22, 25]
console.time('双层for循环')
for (var i = 0; i < 1000 * 100; i++) {
  findTowNumber(arr, 45)
}
console.timeEnd('双层for循环')
```

## 五、二分法找查数组的的某个元素

我们要查找有序数组 `[1,3,4,5,7,8,9,12,15,18,30,32,45]` 中元素值为 15 的元素的下标。

### 1、审题：理解题目的意思

- 比如，要找到数组中元素为 5 的下标，则 5 的下标是 3
- 比如，要找到数组中元素为 9 的下标，则 9 的下标是 6

### 2、解题思路

思路一：for 循环遍历查找

> 最简单的方式，就是通过一次 for 循环的遍历，拿当前值与数组中的每个值一个一个做比较，如果全等，则就返回当前数组中元素的下标

**思路二：二分查找**

> 每一次都从剩下元素的中间位置开始查找。

### 3、二分查找过程演示

如果我们要用二分法来查找到 15 在数组`[1,3,4,5,7,8,9,12,15,18,30,32,45]`中的下位置。

> 我们来看下，会始何查找

### 3.1、第一次查找

先从数组的最中间元素`9`开始找，把当前值`15`与数组中中间元素`9`比较

- 如果当前值`15`大于`9`，则往`15`的右边查找
- 如果当前值`15`小于`9`，则往`15`的左边查找
- 如果当前值`15`等于`9`，则找到该元素，直接返回元素下标

> 显然 15 大于 9，则下一轮要在 9 的右边查找
>
> 这一轮 `startIndex=0` `endindex=12` `midIndex=(0+12)/2=6`

![image-20220924170403723](https://www.arryblog.com/assets/img/image-20220924170403723.31a8bbf7.png)

### 3.2、第二次查找

把当前值`15`与`9`右边部分的中间位置元素`18`比较，即拿`15`与`18`比较

- 如果当前值`15`大于`18`，则往`18`的右边查找
- 如果当前值`15`小于`18`，则往`18`的左边查找
- 如果当前值`15`等于`18`，则找到该元素，直接返回元素下标

> 显然 15 小于 18，则下一轮要在 18 的左边查找
>
> 这一轮`startIndex=6+1=7` `endIndex=12` `midIndex=Math.floor((7+12)/2)=9`

![image-20220924170424502](https://www.arryblog.com/assets/img/image-20220924170424502.ef24c47a.png)

### 3.3、第三次查找

把当前值`15`与`18`左边部分的中间位置元素 15 比较，即拿`15`与`15`比较

- 如果当前值`15`大于`15`，则往`15`的右边查找
- 如果当前值`15`小于`15`，则往`15`的左边查找
- 如果当前值`1`5 等于`15`，则找到该元素，直接返回元素下标

> 显然 15 等于 15 找到了，就不查找了
>
> 这一轮`startIndex=7` `endIndex=midIndex-1=8` `midIndex=Math.floor((7+8)/2)=7`

![image-20220924172445186](https://www.arryblog.com/assets/img/image-20220924172445186.ca4e90da.png)

从上面我们发现

如果当 `midIndex === endIndex`时，如果还找不到，说明数组中不存在这个元素

### 3.4、总结二分查找规律

- 我们每一次都要从中间位置查找，所以我们需要有办法得到中间位置元素
- 我们定义三个变量 startIndex、endIndex、midIndex 分表来记录当前的起始、结束、中间下标
- 刚开始 startIndex 和 endIndex 的值是知道的，`startIndex = 0`, `endIndex = arr.length - 1`
- 通过公式 `midIndex = Math.floor((starIndex+endIndex/2))` ，得到中间元素下标，获取中间元素

**如果，当前值 > 中间值** ，则下一轮在中间值右边部分的中间查找，这时

- `startIndex = midIndex + 1;`
- `endIndex`值不变
- `midIndex = Math.floor((startIndex+midIndex)/2)`

**如果，当前值 < 中间** ，则下一轮在中间值的左边部分中间查找，这时

- startIndex 不变
- `endIndex = midIndex - 1;`
- `midIndex = Math.floor((startIndex+midIndex)/2)`

**如果，当前值 === 中间值** ，则找到，返回`midIndex` ，即元素下标

**如果，一轮找下来** ，当`midIndex === endIndex`时还找不到元素，则说明当前值不在数组中。

> 上面要重复循环做相同的事，但是我们并不能确定具体的循环次数，所以这里我们不用 for 循环，选用 while 循环，因为我们只要知道什么时结束，就可以一直循环下`startIndex <= endIndex`

### 4、二分法 + while 循环代码实现

```js
// 二分查找，查找number在数组arr中的下标,找不到返回-1
function binarySearch(arr, number) {
  // 不是数组，直接返回
  if (!Array.isArray(arr)) return -1
  var length = arr.length
  // 数组为空，直接返回
  if (length === 0) return -1

  var startIndex = 0 // 起始下标
  var endIndex = length - 1 // 结束下标

  while (startIndex <= endIndex) {
    // 中间下标
    var midIndex = Math.floor((startIndex + endIndex) / 2)
    // 中间值
    var midValue = arr[midIndex]

    if (number < midValue) {
      endIndex = midIndex - 1 // 当前值小于中间值，左边找
    } else if (number > midValue) {
      startIndex = midIndex + 1 // 当前值大于中间值，右边找
    } else {
      return midIndex // 当前值等于中间值，找到，返回下标
    }
  }
  return -1 // while中找不到时，才会执行这一句，即找不到元素
}

var arr = [1, 3, 4, 5, 7, 8, 9, 12, 15, 18, 30, 32, 45]
var i = binarySearch(arr, 15)
console.log(i)
```

### 5、二分 + 递归实现

```js
/**
 * binarySearch 二分查找
 * @param arr 要查找的数组
 * @param number 要查找的数
 * @param startIndex 数组查找的开始位置，如果不传默认为0
 * @param endIndex 数组查找的结束位置，如果不传默认为数组长度-1
 */
function binarySearch(arr, number, startIndex, endIndex) {
  // 判断 arr是不是数组  同时长度如果为0
  if (!Array.isArray(arr) || arr.length == 0) return -1
  // undefined==null是true
  if (endIndex == null) endIndex = arr.length - 1
  // 这里还要考虑传过来的参数 startIndex和endIndex的类型处理
  // 大家参考手写的slice方法来处理，(在面向对象原型和原型链那里），两者代码实现上一模一样

  // 递归的结束条件,当startIndex大于endIndex时，还没有找到，则返回-1
  if (startIndex > endIndex) return -1
  var midIndex = ((startIndex + endIndex) / 2) >> 0 //向下取整
  // 用当前值与中间值来做比较
  if (number > arr[midIndex]) {
    return binarySearch(arr, number, midIndex + 1, endIndex)
  } else if (number < arr[midIndex]) {
    return binarySearch(arr, number, startIndex, midIndex - 1)
  } else {
    // 相等，就找到，返回当前下标
    return midIndex
  }
}
var arr = [1, 3, 4, 5, 7, 8, 9, 12, 15, 18, 30, 32, 45]
console.log(binarySearch(arr, 15))
```

### 6、算法复杂度分析

- **二分法+while** 和 **二分+递归** 的时间复杂度是`O(logn)`空间复杂度都是`O(1)`级别
- 但循环要比递归在性能上更好，因为递归在内部会一直调用函数，所以会更消耗性能。
- 递归代码逻辑更清晰

### 7、性能测试

```js
// 执行1000 *1000次 查看两则的执行效率
console.time('递归')
for (var i = 0; i < 1000 * 100; i++) {
  binarySearch(arr, 15)
}
console.timeEnd('递归')

console.time('while')
for (var i = 0; i < 1000 * 100; i++) {
  binarySearch(arr, 15)
}
console.timeEnd('while')
```

![image-20221014153623868](https://www.arryblog.com/assets/img/image-20221014153623868.ade1b8c1.png)

总结:

- 只要是有序查找，则必定考虑必二分 ！
- 只要是二分查找，时间复杂度必包含 O(logn)

## 六、求字符串中连续最多的字符，以及次数

求以字符串`aaabbccddaaaaaffffdddd`中，连续出现最多的字符及字数 （以最先出现的为主）

### 1、审题

以下字符串中连续出现最多的字符是`a` ，及次数是`5`

![image-20220926185544721](data:image/png;base64,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)

### 2、解题思路

- 方法一：for 循环嵌套 + 跳步思想来解决
- 方法二：for 循环 + 双指针

### 3、方法一： for 循环嵌套+跳步

我们以下面这个字符串的查找为例，来讲下解 for 循环嵌套+跳步的方式是如何实现的

- 用两层 for 循环来遍历元素，取出每一个元素，与原字符串做比较，如下图
- count 用来临时存储连续相同字符出现的次数
- 定义变量 `var obj = {char:'',len=0}` 用来保存连续出现最多的字符及次数

### 3.1、第一次循环比较

![image-20220926191310251](https://www.arryblog.com/assets/img/image-20220926191310251.e612a348.png)

解析：

- 当`str[i]===str[j]`时，count++;
- 当`str[i]!==str[j]`时 ， 比较`obj.len`与`count`的值

> 如果 `obj.len < count` ，更新 `obj.len = count = 3` ， `obj.char = str[i] = 'a'` ，同时 `i = j - 1` ，然后退出 for 循环

### 3.2、第二次循环比较

![image-20220926191324959](https://www.arryblog.com/assets/img/image-20220926191324959.762db177.png)

解析：

首先要重置 count=0;

- 当`str[i] === str[j]`时 ，`count++`;
- 当`str[i] !== str[j]`时 ， 比较`obj.len`与`count`的值，如果`obj.len > count` ，不做任何更新 ，退出当前 for 循环

> ......中间省略很多步，比较方法和前两步一样

### 3.3、最后一次循环比较

![image-20220926203315048](https://www.arryblog.com/assets/img/image-20220926203315048.89e20abf.png)

注意：

最后一次比较，如果最后的字符是多个连续字符，那比较结果相等时，也是要更新数据的

```js
if (str[j] == str.length - 1) {
  // 也需要比较判断字符出现的次数与最大字符出现的次数
}
```

### 3.4、代码实现思路

- 我们这里要存两个值，一个是出现字符，一个是字符的次数，所以我们可以用一个对象来存。

```js
// 变量obj，用来保存出现次数最多的字符及次数
var obj = {char:'',len=0}
```

- 我们要统计每一次查找的元素临时出现的重复次数，则需要定义一个变量来存储

```js
var count = 0 // count用来临时存储每一次查找的元素出现的次数
```

然后利用 for 循环，遍历出每个字符，然后把每个字符与原字符串作比较

- 如果相等，则统计次数加 1，即 count++
- 如果不相等，则把当前统计的次数与`obj.len`作比较
- 如果`obj.len > count` ，则更新 count 的值，同时更新 i 和 j 的值，开始下一个字符的比较

> 具体代码实现如下：

```js
for (var i = 0; i < str.length; i++) {
  for (var j = i; j < str.length; j++) {
    // 判断两者是否相等
    if (str[i] === str[j]) {
      count++
    }
    if (str[i] !== str[j]) {
      // 比较两者大小，决定是否更新值
      if (obj.len < count) {
        obj.len = count
        obj.char = str[i]
        i = j - 1
      }
      break
    }
  }
}
```

要特别注意

- 最后一次比较，如果最后的字符是多个连续相同字符，那比较结果相等时，也是要更新数据的
- 如果字符串中只有一个字符时，其第一次比较也就是最后一次比较，两都也是相等，也要更新数据

**完整代码实现**

```js
/**
 * 统计连续出现重复字符次数最多的字符和次数，利for循环 +跳步方式实现
 * @param str 传入字符
 */
function findContinuousChar(str) {
  // 不管传入的是啥，统一转成字符串
  str = str + ''
  // obj用来存储连续出现字符最多的字符和次数
  var obj = {
    char: '',
    len: 0,
  }
  // 如果字符串长度为0
  if (str.length === 0) return obj
  // 临时记录当前连续字符的长度,最少出现1次
  var count = 0
  for (var i = 0; i < str.length; i++) {
    // 每一次循环，重置count的值为0
    count = 0
    for (var j = i; j < str.length; j++) {
      if (str[i] === str[j]) {
        count++
      }
      // 如果比较到数组的最后一个元素是相等的，也要更新数据
      if (str[i] !== str[j] || j === str.length - 1) {
        if (obj.len < count) {
          obj.char = str[i]
          obj.len = count
        }
        // 写在外面，否则会进入死循环
        if (j < str.length - 1) {
          i = j - 1
        }
        break // 不相等或最后一个元素，退出for循环
      }
    }
  }
  return obj
}

var str = 'aaabbccddaaaaaffffdddd'
var obj = findContinuousChar(str)
console.log(obj)
```

### 4、方法二：for 循环 + 双指针

- 我们可以利用 for 循环来遍历字符串，把每个字符串取出来
- 定义变量 count 统计临时出现的次数
- 定义变量 `obj = {char:'',len=0}` 来记录连续出现次数最多的字符及次数
- 我们定义两个变量，i 和 j，相当两个指针，最开始两个字符串指向同一个元素

### 4.1、第一轮比较

![image-20220926221057854](data:image/png;base64,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)

拿 i 对应的元素 与 j 对应的元素作比较

- 如果相等，则累加 i 中元素出现次数，同时 i 向右移动

- 如果不相等，或最后一个元素，则要判断 obj.len 与 count 的大小

  > 如果`obj.len < count`，则更新 obj 的值
  > 同时移动指针 j ，使 `j = i; i--;`

这一轮得到`obj = {char='a',len=3} j=3 , i=2`

### 4.2、第二轮比较

![image-20220926221010573](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoQAAAChCAIAAADRKzm0AAAZN0lEQVR4nO3df2wc5ZnA8ccVOlSh7Jqi9nSl63OCerpmjUhyEaFsEI4Up17+oXQD3v6QgBRs0UpNgl2JSlWTddVWqkhtKlWVIHZAKlJC7So90bOT3RbD2Umg2DhKzd21ELte6+CqhqwddBW0urk/Zj3zznp358fOeGzv9yP/sV7vvH723Zn3mffdmfdt0DRNAABAeD4SdgAAANQ7kjEAACEjGQMAEDKSMQAAISMZAwAQMpIxAAAhIxkDABAykjEAACEjGQMAEDKSMQAAISMZAwAQMpIxAAAhIxkDABAykjEAACEjGXv0rV+8/ZXjb37l+Jvf+sXb/pc+NSVNTdLQIA0N0tPjf/kbye7dxYravdv/wvkg6lY+L7295t6l72C9vU43n5qSri5paSluG41KMimDg043Hx6WdNrc95qaJJ2WXM7p5v39kkxKNFrcvKVFurokn3e6eXWDg8WSo1EX78i5nh7zXU9N+V/+Wm0xrvM/mvqQf++Dkgd+mp01j5wLF/wvfyOZmCh94CM+iPqUz0syKTMzlicnJmRiQuJxSaVsNs/lJJWSpSXzmaUlGR2V0VE5cMD+v/f3y+HDpfGcOiULC7J3r/3m6bScOmV5ZmZGZmZk0yZ58kn7zW29+WbxrS0tyZtv+lBgCeNAy+dldlZ27PC5/LXaYtAzBgCrlZnYcP68zbZTU6WZWDU8bLP54GBpJjY4SR5dXaWZ2MDZ5NpGzxgAFP39lkzc2Sn79omInD8vL7wg7e02m//wh2YmjkSku1vicVlclFdflZER+1710aPm43hcHnlEYjHJ5+XCBVlctNl2akqeftr8tb1d7r9folGZmZGzZ4vvAmsVyRgAFGfOmI8zGfnOd4qPUylHw7wjI+bj4WFzYNnJAHUuZw5yxmIyMiKxmIOIl734ovm4vd2MJJUy3wXWKoapAUBx7pz5+OGH3W2by5nd4njc0Ve8lf51MukuE4t1CP3++91ti7CRjAFAoWZTt+lQHUlOJLz/axHZtcv15teumY/b2lxvjlCRjAFgmXovTWOj683V24c2bXK9+cKC+Tgadb35/Lz52O1pBMJGMgaAZbOzNW2uZtPV39yvO4kRBpIxAAAhIxkDABAyT8k4n5f+fkmnLXPF6ZOupdPS3+89nFxOenpk925zRjF90rXdu6Wnx/vUaMEFbHVm5r0f/Nsfv/787/WZMr/+/O+P/uvs86/+j1/ll5nlLp22n0agulxOurosNdPUVJz5z1uFDw5KOm1OBKjHmUxKf7+XYTR9WsGVsxL6NSKnzztYMm2hL7vE1JT09koyaakKPf6urpo+tcHBYp0Ye4L+qSWTNdVMQEdfcAH7WMPJZHHb/fvNJycmLMVGoxVDNd7XsWPmk8eOlUZVVi5nvkad1mP/fsvmleZW7O01X6NSt21ocFcbejtTMhlnje2MwZhntGS2Tr9mvly/LYbmyuSk1t6uidj8xGJaNuuu5ExGi8XsS+7sXCMBf/mZGeNH07RLC+8/MfyW+qT688TwW+8UPnBR+tCQGVsiUXymSv24rRbd5KSWSPhZ4dWDFNEiEa2vz0WBnZ3VihoY0DTN8qQr8/PV3n48rmWzZT4Ih/UQj9vvdYmENj/vLuDOTi0SsSnWbSVrgR19wQXsew3bHgj6z9BQ+c2dbFtp/1T3servpazubkebd3c7qodsttqe0N6uzc9b/qPDYg19fdX2B7009bOoVOGVrNMWQ9M0TXMZjZPEZrzzyUmnxWazTosVly1CQAFbk/H4HwoHTvxHpUys/3ztZ//lIh+XfKJ9ffbxt7e7qBZN07JZ+1ZS/9H3YFtOgtR/HLaPHR32RZX8U+fm5+1b80hEy2S8HFoOK1Y/gJ1Tg/HrU9OCPPoCClgLoIYdJuNKTYSTbWOx8ts6TMYdHeU3d5iMnZzuOGkT4nFLwnOVjJ00ER0d3pPx+m0xNE3TNJczcKn3sbW3Szwun/1s8dd8Xs6ckdHR4q9LS/KNb8j4uKNi1ZvzYjFJJuUznzEvzT97VkZGzEGGp5+WffvsZ5ULNGCrwfF3Pvjb/4nI9dd9JH7zDfFP3iAif37/r5Nz1/507cPiW/zL3576df4HX7jFdemXLpmDV7GYPPKIxOMiIjMzcuyYeWPi6Kj09DidCD6fL50+t6ND9u0r3k0xMyPnz5s142Qu+OFhy4S6kYik0+b0e3ppxhSDr71mf99FT49lil31jeuzEur7Q6VZfG198YuWKQ8TCdm/X2Kx4rSFJ0/K0pIsLcmRI14KV2dDTCZl69Zi5CIyMyMvvGD+65kZF5+a+nnF49LeLlu3Fj+yxcXiYWK85vBhaWtzdH9LcEdfQAFLADX84x8Xr6OemTE/9HhcMhnzNdFoxUULstliNf785+Z+29FhmXlj8+by26ZSMjRUfHzkiBl5JmO+KRG5/fbymx88aLZp6hi7UabxX6qr0ibok3Hq70tfc8KDKk2EPlun3spVmljb1rpuMXSuUrfW0aHFYlpfX8XOTcl5h8O+5uRk8Zyo0lhxyVlJpZPEVQvY2jPWf77/q7mVfd/v/2pOfc3o7644Kr3syXImU/qykmqJRLx0OiOR8tVujPA76bKoQ1vxePkwjKFF2yD1/aHKx62Pf66sIodKPvSVnYayA/jOz3NjMS2RqFZvav1X6jCVDTsS0bq7K+6lJT0bh2O/wR19AQWsBVbDWrlviFypZQhXq22EVqthAFZz0CaU/RLK+Xu0bSIymTL9coeVsN5bDE3TXA9TO6GODHvYnypRB9M8HCRVeAq4JBP/7MK7lV55+OQfjJcd+eVlR6WXJONK+VLTtMlJyx68MmGX3cT57u7kq3R1T7U9IXBSoHrYVBlmXDnq5ZCaWqqMu5aMevm716mfmo/UUTIPyaCS4I6+gALWvNZwfSbj+XnLtpXOclYO1Tp8jwMDlibC4cmZ80rYEC1GALc2qUMrtsuNOafO8urvOpQ1B7znn2/88q6/r/TXu/7JnEnnrT/9xUP5lunmS+zYIem0+evZs/alqbPJd3TYjF85mVy3ZGL96iONTgpUp9p//PGKLzt0SPr67EsrMTVlGW769rcrvvLkSenocF2+Q7feaj726zpVse7MPi6ZtzpHn79r/AVUwxuSWj/xeMU1LfS1K9SPzCG1XUqnK472790rw8MSibguf0O0GAEkY+MLDN95mOvViZoD/uruf6jy1/u2f1z99czMe+5KTyRsEpi6MpqThlI9MHxZVc34dlkcfDVla2rK/IYyErFZ6+bQIdflv/KK+bi93ebUIbjZ9u+4I5Bia6//SgI6+oILOKAa3pDU06AHHqj2yljMfhHJldQFMKofU3v3Ws6inNgoLQaTfqyG2MeuNx7/+f2/+lx6SXNme7uemrBrn02+5Jy69hlx1fkI3R6WTqgzDno4xwc2nqAPCvUeX7crWdnaKC2G1/WM83kZHpYLF2RhQS5dslyDV6NcTkZH5cIFKRQ8XrZXVnABO3D9deZJz+L//s3/fxCJmO9odrbiKNBK/s4m72Fi/ZXUbwqC2PXVTsDWrf6Xr5qakhdflPPn5do1n0d3Bwfl1VdlZkbm5/2ckTigo08CCzi4Gq4ratVVumzbs5Lzdd9tlBbDfTLO5+Wb3/R+AXoVg4Ny9Kj/c50HF7Bjn9j0dx6/LXbo1ludtkR+TXNjCHRueg/r3rjiYWEch3I5OXo0kPTQ0yPPPOP/2WRAR58EFnBwNVznAl3uyZfz9SrWb4vhOhnncqX3ovklnQ4kXwYX8DpV46I0K9W4zsyG1N/v/XbGKvJ5SSZ97rDqAjr6ggs4oBoGwuPmO+N8Xg4csNxu39kpQ0MyPy+aZv6U3GzuRG+vpS1IJKSvT7JZS7Ga5voSkuACdsmY+iMoly45faXv18sEd72eWOdsCYI634VfcjlLnojFJJORoaHSnbm723XJnZ2WxNbRIQMDMjlZWrJbAR19wQUcXA1DAh7rKhQCLFzWZ4uxzE3P+MQJ83OKxeT0aRffTVanzq7e3e10QiJbwQXskj4/l+6WT3zU/3+gdv1dpdt83s9RKV+OtE99ynwcRKdKLd/J5GJuqTtze7s8/bQ/Nax/m2sYGvLtvCqgo291AvaxhutZLGY2lU4myHNFnXos6CN6PbYYy9z0jNVbYh5/3LfENjxs5pJYzLe2QAIL2KV3Fz/Mv/eB8evNjddXebEXg4PmYydHkfqabLbW/15ypNV+Wq2G57zH71zQh66agb73Pd/aNbVY27vDnQvu6AsoYAmshutZU5P52PeDoqThzeV8Ln+9txjLvN7aFNABoO4T/gryiK2+SOKv//Oq8Tj60etabr7BXemXLtnsvuo5x5132heovsZ2khD1Hr6yduyw1K3t7Aq2h6Laai8t2RTY22tT2krquPq5czbv7vhx1+WrAjr/U1sHHwV39AUUsARWw/VGvSe7epuQz8sLL7guX/2OQz2XWimXc31R3kZpMfy+zzifr7X9qmRwMJCzHj8CHrl0pVI+fnfxw3NvmV8zeBmjXlqSVKpiDsvlLF/4OZnEQ33NqVPVsuPgoOzZIydO2BSYTJqPf/SjajtrT4+0tdnnY3VWgSoz5vT3e5mWPZUyp/hZWpKnnqr4ynTapuHwrGQI10eVVr2tUUBHnwQWcHA1vCGpR9zERMV8pl+R52H0S21znnmmYgn69bYebIgWw00yVk9vyyawqSlJJl1Ho45zTkyUb6l7e+WrX3V9UXRAAZczcunKj7Kle9i7ix+emHhn8S/mjcX7tn7MS+l6Pl65fvXUlGVCmVjMZvYZ3YEDlr5s2Uyfz0tPT7HObau9q8uyYdnDVa9q/ds+24sgHnnEfDwxYZnv0/gv6bT362kffdR8fOxY+YptafF4gbFat2VPw4eHJZVyPd6l7szGEjQqvU7U71OdWJ2jz8eAJbAarmd791o6rwcOlNkThoelpcVjrT78sCWflW0ienulrc3jnS/rusVY5uYCrvvvN//Z6Kgkk9LdXZxORT8P9XY34Y4dkkiYQxOplGQykkoVrynIZmVw0OPdhAEFbHX9dR/Rr8+a+uO1rz//+/gnb9C7vwtXP5j64zU1E995S9T1GLUsT+ixtCSHD8vQkOzbV7yx/ezZ4rpdBufTrvb1mautLS1JW5t0dMgddxSbuZJV82zt2CHd3WarOjMjLS2STsuuXRKNllksz1YqZdklTp2ShYXigmWy4o3H464biIMHLR/94cNy4UJxtTg9WmO3iUSKS8g598ADZlUcOSJLS/KlLxVHU4eHLUvsuZJKFUuT5TOexx8vnntNTckrr9iMSVQS3NEXUMASWA3XucOHzQ9aP/s3ljjM52VoyPyrhyMuFpNHH7U0EYmEZTXY48fNncFD+eu6xTC4WlbC0erN8bi5xoXDNT0cLnSv/vdwA1ZWbfrJbxZ+8puFlSsqrlxg0WnMmnXpmIEBy7pSlX6cLz+nc7LQt4gWi3lZlrHKT3u7o9Lm5+13iUhEGxiwrJPjnJMV3eNxLZs1F9JxuAaLk0XIS3Zmh0vTOPnIIhFzb3EYcHBHX0ABB1fDWr2u2qRTg69y/KpLPLl6jysXGVz5091t+QicV8L6bTGWufzO+ORJ6eys9oLOThkZcT3Nir5YR5VrrGIxGRryMgd3QAFbfW3Pzal/+bg652WJO2+Jfuuef/RYejQqIyPVbpqMRGRgwPUE6IcOycCAzQIpHR0yMeH02reTJ23u7IxEpLvbsr5KFbGY/O531e5tTSTkpZccDcuXlUpJNlvtrek7hod5dPWVbapEHolIJiMnT7ouWV9zpspHpteJ2xkBgzv6Ago4uBquc08+We3z0mt1ZMT7xbDj49VaY30383w9//ptMQyuUndRNqt1dFhOThMJrbPTXKXSOCd11V2bn9f6+rREwjzBicW09nazEOMU3tVq4cEEbKxSbKxk/E7hg+P//t9PDL9l9IafGH7r2Nn5Swvvu4tWU1YpVlcynpzUOjvNdxGJaImElsk47bmWpdd5e7tl6W+92EprjtpGnslYPkS969PX5zHOkvD0XUI9Xza6X1XWMa1kfr402nhc6+iwvHdj36iyjmlZ+pCGEfnKz0v/U5XFqsuanNS6uy2dDD1mo06MClm5xHoVwR19AQWsBVPDk5NmgW4/cT0kowIrrQpchdFpq7LobxVGJXs4Fgx6O6N+XomE1t1tOX6NKvLwHoeGLK2x/qmpDa+xp3mrhHXbYjRoHmbAAQAA/mEJxQBMT0smE3YQAIB1g2QcgLExOXpU9uwJOw4AwPpAMg7AxYsiImNjsn172KEAANYBknEAxsaKD6anZft2mZsLNRoAwFrHBVx+KxTkxhstzzQ2yksvybZtIQUEAFjr6Bn7bXrafNzcLK2tUijInj1mdxkAACuSsd/0ZHzokDQ2ytycnDghDz1UzMfPPht2cACAtYhkXLOSLu/LL4uI3H23fP7zIiKnT8uJE8XpsR5+WE6fXvX4AABrHcm4NtPTct99lqFp/fG2bXLvvSJSXG+rr0/6+qS5ucZ5NwEAGxIXcNVG/zK4tVVeeklk+fLp5maZnZVCQTZvlkJBZmeluTnsQAEAaxc94xr09xfHqMfGiuPP+l1M+oXTjY3mSDUAAJWRjL2am7PMeakvW93aKq2t8uCDxSf1kernnlv14AAA6wnD1F7dd19pl1e/cFpl3HPMSDUAoDJ6xp6cPi2nT5sD0a2tIsudY1VjYzE9M1INAKiMZOxeoVDMu0eOFJ85eFCam6VQKHMnsT5S/ctfrmJ8AIB1hmTsXiYjc3PS2lq8e1jX1ydSrnOsd5rHxpihGgBQCcnYpbExefZZaWwsZt9CQWT5wult26RQKF3JmJFqAIAdkrF7hYIcOmRZ+EGfyuPECZFySffuu0WWZ+YCAGAFrqauzfbtMj0tb7xRzM2nT0tzc+kCTVxTDQCoip5xbYxhap0+WF2CkWoAQFUk41XBSDUAoDKGqWuzebPMzcnVqzYrQBgj1bavBADUH3rGtdGHqW0xTzUAoDKScW1KvjOugtk/AAAVMExdm4YGEREndaiPVDc2yuwsI9UAABU94xo47xbL8kh1ocBINQCgBMm4Bq6SsTBSDQAoj2S8ivRruMbGwo4DALC2kIxr4LZn3Ngora3lF3cCANQxkvHqevBBEUaqAQAWJOMauO0ZCyPVAIAySMarq7FRmpsZqQYAqEjGNfDQMxaRI0dEmKcaAGAiGdfAWzJmXkwAgBXJeNUxUg0AsCIZ18Bbz1hEDh4UYaQaAFBEMg7DQw+JMFINACgiGdfMQ8/YGKkmHwMASMY1WVz0vq3eOWb2DwAAybgm+nfG0aiXbfWvjekZAwBIxj7wtjixMVLNbFwAUPdIxjXQe8ae6TccP/ecL7EAANYvknHNvPWMZXkqLkaqAaDukYxrUGPPmJFqAICIkIx94LlnLIxUAwBESMY1qbFnLIxUAwBESMY18TwdpsEYqZ6b8ysoAMC6QzKuWS3JWJZHqjMZX2IBAKxHJOOwMfsHANS9Bk3Two6h7m3eLHNzMjsrzc1hhwIACAE94zVAH6l+6qmw4wAAhIOe8RowNyebN0tjo1y9GnYoAIAQ0DNeA5qbuaYaAOoZyXhtYPYPAKhjDFO7duXKlWw2Oz8/LyJNTU1tbW033XRTrYVOT8v27YxUA0B9Ihm7c+XKlU9/+tNXlZS5c+fO3/72tz4UzTXVAFCvGKZ2Z2ho6Kq18/r666+Pj4/7ULQ+Us0NxwBQf0jG7iwuLgZV9L33ioi8/HJQ5QMA1qrrwg5gnYlGo0EV3doqb7wh27YFVT4AYK3iO2N3Ll++vHPnzkC+MwYA1CuSsWuXL1/OZrP6eHVLS8uuXbt8uJoaAFDHSMYAAISMC7gAAAgZF3C5dvHixTNnzuiPo9FoW1vbli1bwg0JALCuMUztWkNDg/rr5z73udHR0bCCAQBsAAxTAwAQMoapw3T58uXXXntNn+aaC7MBoG6RjEPDLcsAAB3D1KEpO831xYsXw4oHABAWkvHacu3atbBDAACsNpLx2rJp06awQwAArDaScWj2799/4403qs/s3LnztttuCyseAEBYuIArNFu2bHn99dfVaa7vueeesIMCAISAZBymLVu2dHV1hR0FACBkDFMDABAyesZhYpprAICQjMO1bds29VemuQaA+sQwNQAAISMZAwAQMpIxAAAhIxkDABAykjEAACEjGQMAEDKSMQAAISMZAwAQMpIxAAAhYwYu16anp0vmsAw3HgDAekcydu22225j1WEAgI8YpgYAIGQkYwAAQkYyBgAgZCRjAABCRjIGACBkJGMAAEJGMgYAIGQkYwAAQkYyBgAgZCRjAABCRjIGACBkJGMAAEJGMg7N+Ph42CEAANYEknFozp07V/LMli1bQokEABAullBcVVeuXBkYGBCRubm5n/70pyV/ZWVGAKhPDZqmhR1DHRkfH7/rrrsq/fXtt9+mcwwAdYhh6rXiscceIxMDQH0iGa8JO3fu/O53vxt2FACAcJCMV9WmTZtWPvnYY4+Njo7edNNNqx8PAGAt4Dvj1Xb58uVsNru4uCgiTU1Nt99+O6PTAFDnSMYAAISMYWoAAEJGMgYAIGQkYwAAQvb/ke3yvN6an+kAAAAASUVORK5CYII=)

与第一轮一样

拿`i`对应的元素与`j`对应的元素作比较

- 如果相等，则累加`i`中元素出现次数，同时`i`向右移动

- 如果不相等，或最后一个元素，则要判断

  ```
  obj.len与count
  ```

  的大小

  > 如果`obj.len < count`，则更新 obj 的值
  > 同时移动指针 j ，使 `j=i;`

这一轮得到 `obj = {char='a',len=3} j=5 , i=4`

> ..... 重复以上步骤来比较

### 4.3、最后一轮比较

![image-20220926221351193](data:image/png;base64,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)

要特别注意

最后一次比较，如果最后的字符是多个连续相同字符，那比较结果相等时，也是要更新数据的

### 4.4、代码实现

```js
function findContinuousChar(str) {
  // 用来存储出现连续次数最多的字符及次数
  var obj = {
    char: '',
    len: 0,
  }
  str = str + '' // 不管输入的是否是字符串，统一转成字符串
  var len = str.length // 字符串长度
  if (len === 0) return obj

  // 定义两个变量，用来做为两个指针，指定元素

  var i = 0
  var j = 0
  var count = 0 // 临时记录当前连续字符出现的次数
  for (; i < len; i++) {
    if (str[i] === str[j]) {
      count++
    }
    // 这里移动的是i，所以要拿i来做判断
    if (str[i] !== str[j] || i === len - 1) {
      // 等于的情况没有处理，则不会进到这里面来
      if (obj.len < count) {
        obj.len = count
        obj.char = str[j] // 这里是str[j],不要写成str[i]了
      }
      count = 0 // 重置count的值
      j = i // 更新j的值，开始下一个字符统计

      if (i < len - 1) {
        i-- // 这里的i--不能放在上面的if中，否则某种情况下会死循环
      }
    }
  }
  return obj
}
var str = '12345566'
var obj = findContinuousChar(str)
console.log(obj)
```

总结：

双指针常用于解决嵌套循环

### 5、算法复杂度分析

方法一 和 方法二的时间复杂度都为 O(n)，空间复杂度也是 O(1)

### 6、性能测试

```js
var str = 'abcdeffaaabbeeccseesseffff'
console.time('性能测试')
for (var i = 0; i < 1000 * 100; i++) {
  findContinuousChar(str)
}
console.timeEnd('性能测试')
```

## 七、快速排序

采用快速排序的算法，将以下数组`[1,33,43,5,76,8,9,12,15,18,30,32,45]`按升序来进行排序

![image-20220925000133974](data:image/png;base64,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)

### 1、什么是快速排序？

- 快速排序是在每一轮排序时，会将数组的中间元素作为**基准元素**
- 并让其他比基准元素大的元素移到基准元素的一边
- 比基准元素小的元素移到基准元素的另一边

### 2、快速排序过程演示

快速排序主要采用二分的思想来实现，我们以下面这个数组为例，来分析速排序的整个的过程

![image-20220925000133974](data:image/png;base64,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)

### 2.1、第一次查找

- 先从找到数组中的中间元素 `9`，这个元素就是我们说的基准元素

- 然后遍历数组中的每个元素，每个元素都与

  ```
  9
  ```

  作比较

  > 所有小于`9`的元素，放在一个数组 leftArr
  > 所有大于`9`的元素，放在另一个数组 rightArr

- 然后将 从左到右，将 leftArr、[9]、rightArr 拼接到一起

![image-20220925004258912](https://www.arryblog.com/assets/img/image-20220925004258912.bbd2d95c.png)

### 2.2、第二次查找

- 找到 leftArr 数组中的中间元素

  ```
  5
  ```

  ，然后遍历 leftArr 中每个元素与

  ```
  5
  ```

  比较

  - 所有小于`5`的元素，放在新的数组 leftArr 中
  - 所有大于`5`的元素，放在新的数组 rightArr 中

- 找到 rightArr 数组的中间元素 15，然后遍历 rightArr 中每个元素与 15 比较

  - 所有小于`15`的元素，放在新的数组 leftArr 中
  - 所有大于`15`的元素，放在新的数组 rightArr 中

- 最后然后将 从左到右，将 leftArr、[5]、rightArr [9]、 leftArr 、rightArr 拼接到一起

![image-20220925005509015](https://www.arryblog.com/assets/img/image-20220925005509015.e4119924.png)

### 2.3、第三次查找

重复前面的找查找过程，第三步查找的结果如下

![image-20220925013400975](https://www.arryblog.com/assets/img/image-20220925013400975.a8676d00.png)

总结：

- 当 leftArr 和 rightArrr 长度为 1 时，不用再查找和判了
- 如果每找到`midValue`值为当前数组中的**最大值**或**最小值**时，本次排序相当于只排了一个元素，效率也是会很低。

> 以上图解中，还有一种情况没有考虑到，那就是如果 数组中出现重复的项时，则还需要加一个 midArr 来保存相等的值，以下代码是实现了。

### 3、解题思路

我们有两种方式来实现

- **方法一**：利用递归 + splice() 方法，这种情况会动原数组，返回的是一个新数组
- **方法二**：利用递归 + slice()方法，这种情况不会动原数组，返回的是一个新数组
- **方法三**：利用递归 + 双指针，这种情况不会动原数组，返回的也是原数组

### 4、方法一：二分+递归+splice()

```js
function quickSort(arr) {
  if (!Array.isArray(arr)) return
  // 如果长度为0或1，则不用排序
  if (arr.length === 0 || arr.length === 1) return arr
  var len = arr.length
  // 找到中间元素
  var midIndex = Math.floor(len / 2) // 中间元素下标
  var midValue = arr.splice(midIndex, 1)[0] // 中间元素值

  var leftArr = [] // 放小于中间数的元素
  var rightArr = [] // 大于中间数的元素
  var midArr = [] // 与中间项相等

  // splice方法会删除原数组中元素，所以arr.length长度会时时更新
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i] // 数组中的每一项
    if (item < midValue) {
      leftArr.push(item) // 小于midValue放leftArr
    } else if (item > midValue) {
      rightArr.push(item)
    } else {
      midArr.push(item)
    }
    // item == midValue 不需要处理
  }
  // 遍历，筛选完后，要开始重组
  return quickSort(leftArr).concat([midValue], midArr, quickSort(rightArr))
}

var arr = [1, 33, 5, 43, 5, 76, 76, 8, 9, 12, 15, 18, 30, 32, 45]
var arr = [1, 5, 33, 8, 9, 99]
var arr1 = quickSort(arr)
console.log(arr1)
```

### 5、方法二：快速排序 - 二分+递归+slice()

```js
function quickSort(arr) {
  if (!Array.isArray(arr)) return
  // 如果长度为0或1，则不用排序
  if (arr.length === 0 || arr.length === 1) return arr
  var len = arr.length
  // 找到中间元素
  var midIndex = Math.floor(len / 2) // 中间元素下标
  var midValue = arr.slice(midIndex, midIndex + 1)[0] // 中间元素值

  var leftArr = [] // 放小于中间数的元素
  var rightArr = [] // 大于中间数的元素
  var midArr = [] // 与中间项相等

  // splice方法会删除原数组中元素，所以arr.length长度会时时更新
  for (let i = 0; i < len; i++) {
    if (i == midIndex) continue // 如果当前下标和中间下标一样，不操作
    var item = arr[i] // 数组中的每一项
    if (item < midValue) {
      leftArr.push(item) // 小于midValue放leftArr
    } else if (item > midValue) {
      rightArr.push(item)
    } else {
      midArr.push(item)
    }
    // item==midValue 不需要处理
  }
  // 遍历，筛选完后，要开始重组
  return quickSort(leftArr).concat([midValue], midArr, quickSort(rightArr))
}

var arr = [1, 33, 5, 43, 5, 76, 76, 8, 9, 12, 15, 18, 30, 32, 45]
var arr = [1, 5, 33, 8, 9, 99]
var arr1 = quickSort(arr)
console.log(arr1)
```

### 6、方法三：利用递归+双指针

- 选定当前组组中的第一个元素作为**基准元素**（pivot）
- 定义两个变量 left 和 right，分别指向数组的第一个元素和最后一个元素
- 接下来进行第一次循环
  - right 指针开始，让指针所指向的元素与基准元素比较。如果大于或等于 pivot，则指针向左移动;如果小于 pivot，则 right 指针停止移动，切换到 left 指针
  - left 指针开始，让指针所指向的元素与基准元素做比较，如果小于等于 pivot，则指针向右移动;如果大于 pivot，则 left 指针停止移动。
  - 当 left 与 right 指针都停止后，让 left 指针和 right 指针所指向的元素进行交换。

> 循环条件：`left !== right` 时才循环，即 `left >= right`，则停止循环

- 接下来重第一次循环的动作，开始第二次循环。
- 一直到 left 与 right 指针重合时（相等时），则让 left 指针指向的元素与 pivot 中元素交换。
- 接下来 left 左边的元素按上面方式来排序，left 右边元素按上面方式来排序

> 我们以数组`[10,9,43,33,8,12,76]` 来演示整个循环过程

![image-20221015010453195](https://www.arryblog.com/assets/img/image-20221015010453195.8cb6d9ed.png)

代码解读

```
if(left !== right){ 才排序，相等就交换 pivot 基准元素与 left 中的元素 }
```

下一次左边的元素排序

```
left = stratIndex right = left-1
```

下一次右边的元素排序

```
left = left+1 right = endIndex
function quickSort(arr, startIndex, endIndex) {
  if (startIndex >= endIndex) {
    return;
  }

  // 第一轮排序，得到基准元素
  var pivotIndex = partition(arr, startIndex, endIndex);
  // 根据基准元素，排序左边
  quickSort(arr, startIndex, pivotIndex - 1);
  // 根据基准元素，排序右边
  quickSort(arr, pivotIndex + 1, endIndex);
}

function partition(arr, startIndex, endIndex) {
  // 获取基准元素
  var pivot = arr[startIndex];
  var left = startIndex;
  var right = endIndex;

  // 不相等时
  while (left != right) {
    // 右指针向左移动
    while (left < right && arr[right] > pivot) {
      right--;
    }

    // 左指针向右移
    while (left < right && arr[left] <= pivot) {
      left++;
    }

    // 交换两者的位置
    if (left < right) {
      var temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }
  }

  // 相等时
  arr[startIndex] = arr[left];
  arr[left] = pivot;

  return left;
}

var arr = [10, 33, 43, 5, 76, 8, 9, 12, 15, 18, 30, 32, 45];
quickSort(arr, 0, 12);
```

### 7、算法复杂度分析

- 方法一和方法二的时间复杂度是 O(nlogn) ，外层 for 循环是 O(n) ，for 循环里面是二分 O(logn)
- 方法一和方法二的空间复杂度是 O(n)

**在这里 splice 和 slice 区分不大**

- 第一：算法本身的复杂度 `O(n\*logn)` 已经很高，所以 splice 和 slice 对于他们来说虽然会增加复杂度，但相对而言影响就不算大
- 第二：splice 和 slice 两者都是二分之后，再执行，二分会快速消减数量级
