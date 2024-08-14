---
title: 设计模式 - 迭代器模式和 Iterator 遍历器与 for...of 循环
date: 2023-10-30
sidebar: "auto"
categories:
  - ES6
tags:
  - ES6
  - 设计模式
publish: true
---

# 设计模式 - 迭代器模式和 Iterator 遍历器与 for...of 循环



在学习 Iterator 遍历器之前，我们先来学习下 JS 设计模式中的迭代器模式。

## 一、设计模式：迭代器模式



设计模式（Design pattern）代表了最佳的实践，通常被有经验的面向对象的开发人员所采用。

设计模式是开发人员在开发过程中面临的一般问题的解决方案。项目中合理地运用设计模式可以完美地解决很多问题，每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，这也是设计模式能被广泛应用的原因。

### 1、什么是迭代器模式



迭代器模式是指提供一种方法**顺序**访问一个聚合对象中的各个元素，而又**不需要暴露该对象的内部结构**。也就是说，即使不了解对象的内部结构，也可以按顺序访问其中的每个元素。

比如我们想要有序的访问数组中的每个成员，我们可以选择用`for`循环或`forEach`来实现。

> **注意：** for 循环并不遵顺迭代器模式，而 forEach 是符合迭代器模式的，为什么呢 ？

- for 循环遍历数组中的每个成员，需要知道数组的长度，同时还需要知道以什么形式访问数组中的成员
- forEach 遍历数组中的成员，并不需要知道数组的长度和访问数组中成员的形式（即不需要知道对象的内部结构）

```js
const arr = ["A", "B", "C"];
// 需要知道数组长度 arr.length
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 需要知道访问数组成员的形式
}

// 并不需要知道数组的内部结构，也可以按顺序访问其中的每个成员
arr.forEach((value) => {
  console.log(value);
});
```

迭代器模式必需要满足条件：

在不暴露对象的内部结构时，有序的访问对象中成员。所以 for 循环并遵顺迭代器模式，forEach 是符合的。

### 2、区分：迭代器模式和迭代器



- **迭代器模式**：可以理解为在不需要了解对象的内部结构情况下，解决有序访问对象中成员的一种**思想**。
- **迭代器**：可以理解为迭代器模式的一种具体方案的实现。 比如上面数组的`forEach`方法，可以看作是一个简易的迭代器。

### 3、迭代器的分类



迭代器可以分类内部迭代器和外部迭代器，它们分别有各自的适用场景

**内部迭代器：**

- 内部迭代器通常被定义成一个方法，他是被动的，我们不需要关心内部迭代器的规则，只需要调用这个方法，就能有序的访问对象中的所有成员。其灵活性相对较差。
- 上面的`forEach`函数就属于内部迭代器。

**外部迭代器：**

- 外部迭代器是主动的，我们必须知道他的内部实现，同时必须显示的请求迭代下一个元素。其灵活性相对较好，我们可以手动控制迭代的过程或顺序。
- 后面 ES6 中要学习到的数组的`[Symbol.iterator]`方法，就是一个外部迭代器

### 4、实现一个内部迭代器



数组的`forEach`方法可以看作是一个简易的迭代器，那我们来手动实现下数组的`forEach()`方法

```js
const arr = ["A", "B", "C"];
Array.prototype.forEach = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    callBack(this[i], i, this);
  }
};

arr.forEach((value, index, arr) => {
  console.log(value, index, arr);
});
```

注：

不过内部迭代器也有自己的问题，就是灵活性相对较差。

比如，我们想要同时迭代两个数组，然后比较两个数组是否完全相等。上面的`forEach()`方法就没有办法实现，只能人为的再定义一个方法，在这个方法内部结合`forEach()`方法来一起实现。

**比较两个数组中的元素是否完全相等**

```js
const arr = ["A", "B", "C"];
const arr2 = ["A", "B", "C"];
Array.prototype.compare = function (arr2) {
  if (this.length !== arr2.length) {
    throw new Error(`两个数组不相等`);
  }
  // 遍历来对比
  this.forEach((value, index) => {
    if (value !== arr2[index]) {
      throw new Error(`两个数组不相等`);
    }
  });
  // 上面没有抛错，说明下面则是相等的
  console.log("两个数组相等");
};

arr.compare(arr2);
```

> 上面不完美之处在于，我们必须知道 arr2 数组的内部结构，才能与数组 arr 作比较。

### 5、实现一个外部迭代器



外部迭代器是主动的，我们必须知道他的内部实现，同时必须显示的请求迭代下一个元素。其灵活性相对较好，我们可以手动控制迭代的过程或顺序。

**手动实现一个外部迭代器，按顺序显示迭代数组中的每一个元素**

**实现思路：**

在 Array 的原型上定义一个`getIterator`方法，当`数组.getIterator()`方法，返回一个对象（迭代器对象），`迭代器对象.next()`方法显示迭代数组的下一个元素。

> 当数组中元素全部迭代完成，返回值为`undefined`

```js
Array.prototype.getIterator = function () {
  let index = 0; // 相当于指针，最开始指向数组中的第一个元素的下标
  let self = this; // 保存this
  return {
    next() {
      return self[index++];
    },
  };
};
const arr = ["A", "B", "C"];
let it = arr.getIterator(); // 返回迭代器对象
// it.next() 显示请示迭代下一个元素
console.log(it.next()); // A
console.log(it.next()); // B
console.log(it.next()); // C
console.log(it.next()); // undefined
```

上面代码中

需要有序访问数组中的成员，只能先通过`数组.getIterator()`方法返回迭代器对象，然后通过`迭代器对象.next()`方法手动的迭代数组中的下一个元素。

**缺陷：**

上面的迭代器没有办法结合`while`循环一次性有序的遍历出数组的所有成员，因为没有办法判断对象中的成员是否迭代完成，所以我们需要对上面的代码做相关的修改。

### 5.1、优化一：添加 isDone 和改进 next 方法



- 给迭代器对象添加一个`isDone`方法，用来判断当前对象中的成员是否全部迭代完成
- 同时修改`next()`方法体中的代码

> 具体代码实现如下：

```js
Array.prototype.getIterator = function () {
  let index = 0; // 相当于指针，最开始指向数组中的第一个元素的下标
  let self = this; // 保存this
  return {
    isDone() {
      // 返回值为true，表示对象中成员全部迭代完成，false表示没有迭代完成
      return index > self.length - 1; // index >= self.length
    },
    next() {
      if (!this.isDone()) {
        return self[index++];
      }
    },
  };
};
const arr = ["A", "B", "C"];
const it = arr.getIterator();
console.log(it.next()); // A
console.log(it.next()); // B
console.log(it.next()); // C
console.log(it.next()); // undefined
```

利用 while 循环，一次性有序的迭代出数组中的所有成员

```js
const it = arr.getIterator();
while (!it.isDone()) {
  console.log(it.next());
}
```

缺陷：

如果我们想要在`while`循环中结合`break,continue,return`关键 **终止迭代器（退出循）** 时，以上迭代器没有办法实现。

> 如下代码

```js
const arr = ["A", "B", "C"];
const it = arr.getIterator();
while (!it.isDone()) {
  if (it.next() === "B") {
    break;
  }
  console.log(it.next());
}
// 输出结果 B undefined
```

以上代码

输出结果 :`B undefined`并不是我们所期望的，我们期望的结果是 A。

> 为什么呢 ？

while 循环第一次，`it.next()` 的结果为 A，肯定不等于 B，所以执行 `console.log(it.next())`，这里的`it.next()`相当迭代下一个元素，结果为 B。

> 所以并没有得到我们想要的 A 等。

### 5.2、优化二：next() 方法返回值为对象



把`next()`方法的返回结果改成如下结构的对象

```js
{
    value: "数组成员", // 值表示数组成员
}
```

具体代码实现如下：

```js
Array.prototype.getIterator = function () {
  let index = 0; // 相当于指针，最开始指向数组中的第一个元素的下标
  let self = this; // 保存this
  return {
    isDone() {
      // 返回值为true，表示对象中成员全部迭代完成，false表示全部元素没有迭代
      return index > self.length - 1; // index>=self.length
    },
    next() {
      if (!this.isDone()) {
        return {
          value: self[index++],
        };
      }
    },
  };
};
const arr = ["A", "B", "C"];
let it = arr.getIterator(); // 返回迭代器对象
console.log(it.next()); // {value: 'A'}
console.log(it.next()); // {value: 'B'}
console.log(it.next()); // {value: 'C'}
console.log(it.next()); // {value: undefined}
```

利用 while 循环，一次性有序的迭代出数组中的所有成员

```js
const arr = ["A", "B", "C"];
// while循环，实现一次性有序的遍历出数组的所有成员
let it = arr.getIterator();
while (!it.isDone()) {
  obj = it.next();
  console.log(obj.value);
}
// 输出结果： A  B  C
```

while 循环与`break、continue、return`结合终止迭代器或退出 while 循环

```js
const arr = ["A", "B", "C"];
// while循环，实现一次性有序的遍历出数组的所有成员
let it = arr.getIterator();
while (!it.isDone()) {
  obj = it.next();
  if (obj.value === "B") {
    //   break;
    continue;
  }
  console.log(obj.value);
}

// 使用break关键字执行结果： A
// 使用continue关键字执行结果： A C
```

缺陷：

如果我手动调用迭代器的`next()`方法来迭代下一个元素时，如果数据结构中的成员值为`undefined`，则我们没有办法区分返回的值`undefined`是数据结构本身的元素，还是表示没有下一个元素可以迭代了。所以还可以再优化。

### 5.3、优化三：修改 next 方法返回结果



把`next()`方法的返回结果修改为以下结构的对象

```js
{
    value: "数组成员", // 值表示数组成员，当done为true时，其值为undefined
    done: false, // false 表示没有遍历完，true表示遍历完成
}
```

具体代码实现如下：

```js
Array.prototype.getIterator = function () {
  let index = 0; // 相当于指针，最开始指向数组中的第一个元素的下标
  let self = this; // 保存this
  return {
    isDone() {
      // 返回值为true，表示对象中成员全部迭代完成，false表示没有
      return index > self.length - 1; // index>=self.length
    },
    next() {
      let that = this;
      if (!this.isDone()) {
        return {
          value: self[index++],
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
};

const arr = ["A", "B", "C"];
let it = arr.getIterator(); // 返回迭代器对象
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

![image-20230206162557283](https://www.arryblog.com/assets/img/image-20230206162557283.cd78b70e.png)

> while 循环与`break、continue、return`结合终止迭代器或退出 while 循环

```js
let it2 = arr.getIterator(); // 返回迭代器对象
while (!it2.isDone()) {
  let obj = it2.next();
  if (obj.value === "B") {
    //   break;
    continue;
  }
  console.log(obj.value);
}
//  输出结果为：A C
```

### 6、迭代器实际应用场景



通过上面的学习，我们知道迭代器模式是一种解决在不需要知道对象的内部结构情况下，有序遍历出对象中成员的一种解决思想。

> 而迭代器是实现这种思想的一种具体解决方案

**实现一个迭代器的基本思路：**

创建一个方法 ----> 这个方法返回一个对象（迭代器对象）----> 调用迭代器对象身上的方法（通常有 next 或 isDone）可以显示迭代下一个成员，或判断成员是否全部迭代完成。

**备注：**

如果迭代器对象还需要其它功能，可自己添加相关方法。

### 6.1、创建 Stack 类，添加一个外部迭代器



外部迭代器在`while`循环中可以与`break、continue、return`关键字配合使用，功能更强大

```js
class Stack {
  #length; // 私有属性
  #data = []; // 私有成员，存储入栈成员
  constructor(length) {
    this.#length = length;
  }
  // 返回#lenght属性，只能访问，不能修改
  get length() {
    return this.#length;
  }
  // 判断栈是否空
  isEmpty() {
    return this.#data === 0;
  }
  // 栈满
  isFull() {
    return this.#data.length === this.#length;
  }
  // 入栈
  push(value) {
    if (this.isFull()) throw new Error("栈满，不能再添加元素");
    this.#data.push(value);
    return this; // 支持链式调用
  }
  // 出栈
  pop() {
    if (this.isEmpty()) throw new Error("栈空，不能再添加元素");
    return this.#data.pop();
  }
  // 迭代器方法，用来生成迭代器对象
  getIterator() {
    let index = 0;
    let self = this;
    return {
      isDone() {
        return index >= self.#data.length;
      },
      next() {
        if (!this.isDone()) {
          return {
            value: self.#data[index++],
            done: false,
          };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

const stack = new Stack(5);
const stack2 = new Stack(3);
stack.push(1).push(2).push(3).push(4).push(5);
stack.pop();
stack.pop();
// 访问栈容器长度
stack.length = 999;
console.log(stack.length); //  5
// 生成迭代器对象 it
const it = stack.getIterator();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// while循环，一次性有序的迭代出对象的所有成员
const it2 = stack.getIterator();
let obj = it2.next();
while (!obj.done) {
  console.log(obj.value);
  obj = it2.next();
}
```

### 6.2、为 Stack 类添加内部迭代器 forEach 方法



外部迭代器相对于内部迭代器灵活性更高，但是使用起来相对麻烦。所以我们通常会暴露内部迭代器对外使用。

> 接下来我们给`Stack`类添加内部迭代器`forEach`方法。

```js
class Stack {
  #length; // 私有属性
  #data = []; // 私有成员，存储入栈成员
  constructor(length) {
    this.#length = length;
  }
  // 返回#lenght属性，只能访问，不能修改
  get length() {
    return this.#length;
  }
  // 判断栈是否空
  isEmpty() {
    return this.#data === 0;
  }
  // 栈满
  isFull() {
    return this.#data.length === this.#length;
  }
  // 入栈
  push(value) {
    if (this.isFull()) throw new Error("栈满，不能再添加元素");
    this.#data.push(value);
    return this; // 支持链式调用
  }
  // 出栈
  pop() {
    if (this.isEmpty()) throw new Error("栈空，不能再添加元素");
    return this.#data.pop();
  }
  // 迭代器方法，用来生成迭代器对象
  getIterator() {
    let index = 0;
    let self = this;
    return {
      isDone() {
        return index >= self.#data.length;
      },
      next() {
        if (!this.isDone()) {
          return {
            value: self.#data[index++],
            done: false,
          };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
  // 内部迭代器
  forEach(callBack) {
    for (var i = 0; i < this.#data.length; i++) {
      callBack(this.#data[i], i, this);
    }
  }
}

const stack = new Stack(5);
const stack2 = new Stack(3);
stack.push(1).push(2).push(3).push(4).push(5);
stack.forEach((v) => {
  console.log(v); // 1 2 3 4 5
});
```

### 7、将 class（数据类）与 迭代器类分离



我们很多时候会有这样的需求，我可能有 10 个类，每个类都有一个自己的外部迭代器，这些迭代器的内部实现都是相同的。

如果我们把迭代器与某个类绑定死，那就意味着这个迭代器没有办法供 10 个类重用，只能为每个类单独写一个。

> 所以我们可以将迭代器分类出去，单独定义成一个类，然后在其它类的内部来实用这个迭代器

```js
// 迭代器类  创建迭代器对象
class DataIterator {
  // 私有属性
  #data; // 接受传递过来用来遍历的数据对象
  #index = 0; // 下标
  constructor(data) {
    this.#data = data;
  }
  // 判断元素是否迭代完成
  isDone() {
    return this.#index >= this.#data.length;
  }
  // 返回下一个元素
  next() {
    return this.isDone()
      ? { value: undefined, done: true }
      : { value: this.#data[this.#index++], done: false };
  }
}

// 数据类
class DataContainer {
  #data; // 私有属性
  constructor(data = []) {
    if (Array.isArray(data)) {
      this.#data = data;
    } else {
      throw new Error("传入的参数只能是一个数组");
    }
  }
  // 生成迭代器对象的方法
  getIterator() {
    return new DataIterator(this.#data);
  }
  //..... 对象其它方法自行添加
}

// 创建实例对象
const obj = new DataContainer(["A", "B", "C"]);
// 生成一个迭代器对象
const it = obj.getIterator();
// 调用next方法，手动遍历下一个元素
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

const it2 = obj.getIterator();
// while循环
while (!it2.isDone()) {
  const obj = it2.next();
  console.log(obj.value);
}
```

![image-20230206165630961](https://www.arryblog.com/assets/img/image-20230206165630961.c8d621ac.png)

解读：DataIterator 类

`DataIterator`类用来创建迭代器对象，有`#data`和`#index`两个私有属性，同时有`isDone()` 和`next()`两个实例方法。

- `#data`用来接受需要迭代的数据对象
- `#index`用来控制访问元素的下标，相当于一个指针。
- `isDone()` 方法用来判断数据对象的成员是否迭代完成
- `next()`方法用来返回下一个数据对象的下一个成员

**解读： DataContainer 类**

`DataContainer`类用来模拟一个数据类，他有 `#data` 私有属性和`getIterator()`实例方法。

- `#data`属性，用来保存 DataContainer 类实例化对象的数据，其类型必需是一个数组。
- `getIterator()` 方法用来生成一个迭代器对象，它的返回值为`new DataIterator(this.#data);`其中的`this.#data`参数为需要迭代的数据对象。

## 二、总结：迭代器模式



总结迭代器模式重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习 ！

### 1、迭代器模式和迭代器



- 迭代器模式：是一种设计思想，一种解决**有序**访问一个聚合对象中的各个元素，而又**不需要暴露该对象的内部结构**的思想
- 迭代器：是迭代器模式的一种具体实现方案。比如数组的`forEach`方法，就是一种简单的迭代器。

### 2、迭代器分类

| 分类       | 说明                                                                                                                                                                                                                                                                                     |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 内部迭代器 | **定义：** 内部迭代器通常被定义成一个方法，他是被动的，我们不需要关心内部迭代器的规则，只需要调用这个方法，就能有序的访问对象中的所有成员 **优点：** 使用非常简单 **缺点：** 其灵活性相对较差，没有办法手动控制每一次迭代。其次不能与`break、continue、return`关键字配合使用，终止迭代器 |
| 外部迭代器 | **定义：** 外部迭代器是主动的，我们必须知道他的内部实现，同时必须显示的请求迭代下一个元素。 **优点：** 其灵活性相对较好，我们可以手动控制迭代的过程或顺序 可以与`break、continue、return`关键字配合使用，终止迭代器 **缺点：** 使用起来相对比较麻烦                                      |

注：

因为外部迭代器使用其来很麻烦，而且需要了解其内部的实现。所以在实际开发中，我们通常是暴露一个内部迭代器对外使用。

但由于内部迭代器不能与`break、continue、return`关键字配合使用。

> 所以在 ES6 中新增了`for...of`循环语句，`for...of`主要就是用来消费外部迭代器。（具体如何使用，后面学习）

### 4、手动实现外部迭代器



外部迭代器的基本实现思路如下：

创建一个方法`getIterator` ---> 调用该方法返回一个对象（称为迭代器对象）`it` ----> 迭代器对象有相关方法，通常会定义`isDone`和`next`方法。

- isDone 方法用来判断所有元素是否全部迭代完成。false 表示否，true 表示是
- next 方法返回值为`{value:xx，done:false}`这种结构的对象。value 迭代的下一个元素，done 表示所呢元素是否全部迭代完成。false 表示否，true 表示是

```js
function getIterator() {
  return {
    isDone() {
      return 布尔值;
    },
    next() {
      return {
        value: xxx,
        done: 布尔值,
      };
    },
  };
}
```

### 5、迭代器的应用



当我们创建一个类时，可以为这个类添加外部迭代器和内部迭代器，这样就可以在不暴露数据结构的内部结构情况下有序的访问其成员。

> 我们可以将数据容器类与外部迭代器类分离，这样就可以实现迭代器类的复用。

## 三、Iterator 是什么 ？



ES6 中的`Iterator` 遍历器（迭代器）其实就是参考了 JS 设计模式中的迭代器模式。

> 那 ES6 中的 Iterator 遍历器（迭代器）是什么 ？我们从以下三方面来展开讲解

- 寻找 Iterator
- 使用 Iterator
- Iterator 是什么 ？

### 1、寻找 Iterator

```js
// 查看是否存在 Iterator 的变量或常量
console.log(Iterator);
```

![image-20221027140404649](https://www.arryblog.com/assets/img/image-20221027140404649.4cb41028.png)

> 我们可以看到，并不存在 Iterator 这样的变量或常量，那需要到哪里寻找 Iterator 呢 ？

查看数组原型链上继承的方法

```js
console.log([1, 2, 3]);
```

![image-20221027141825129](https://www.arryblog.com/assets/img/image-20221027141825129.c5c2eddf.png)

注：

数组原型上的 `[Symbol.iterator]` 属性就是一个方法，也就是 JS 内置的一种外部迭代器，这个方法返回一个迭代器对象。

> 接下来我们看如何使用它。

### 2、使用 Itertaor



- 数据结构的`[Symbol.iterator]`属性是一个函数，用来返回一个迭代器对象
- 迭代器对象身上有一个`next`方法，调用迭代器对象的`next()`方法，返回一个对象

> 对象有两个属性，分别为`value`和`done`：

- `value`属性值为当前成员的值，
- `done`属性是一个布尔值，表示遍历是否结束，false 表示未结束，true 表示结束。

`Symbol.iterator`本身是一个表达式，返回`Symbol`对象的`iterator`属性，这里一个预定义好的特殊的`Symbol`类型的值。

> 所以作为对象的属性时，要写在`[]`方括号中

```js
// 数组
let arr = [1, 2, 3];
const iterator = arr[Symbol.iterator](); // 生成可遍历对象
// 调用可遍历对象的 next方法,迭代出下一个成员
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

![image-20230202235904321](https://www.arryblog.com/assets/img/image-20230202235904321.50516141.png)

> while 循环配合迭代器，一次性有序的迭代出数组中的所有成员

```js
const it = arr[Symbol.iterator]();
let obj = it.next();
while (!obj.done) {
  console.log(obj.value);
  obj = it.next(); // 1  2  3
}
```

### 3、Iterator 是什么 ？



Iterator 是一个遍历的过程，具体如下

调用数据的`Symbol.iterator`（可遍历对象的生成方法）----> 生成`iterator`（迭代器对象）----> 调用`iterator.next()` ---> `iterator.next()` ----> .... 直到 next 方法返回值对象的`done`属性值为`true`时，才停止遍历，这样的一个完整过程称之为`Iterator`

> 数组的`Symbol.iterator`方法，可以理解为可遍历对象的生成方法，生成迭代器对象

### 4、手动实现数组的`Symbol.iterator`方法



其内部实现原理与我们讲的设计模式中的迭代器模式完全相同。只是代码上稍微有一些差异，因为数组的`Symbol.iterator`方法，生成的迭代器对象只有`next`方法，**没有`isDone`方法。**

> 代码具体实现如下：

```js
Array.prototype[Symbol.iterator] = function () {
  let index = 0;
  let self = this;
  return {
    next() {
      return index < self.length
        ? {
            value: self[index++],
            done: false,
          }
        : { value: undefined, done: true };
    },
  };
};

const arr = ["a", "b", "c", "d"];
const it = arr[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// 一次性迭代出数组的所有成员
const it2 = arr[Symbol.iterator]();
let obj = it2.next();
while (!obj.done) {
  console.log(obj.value);
  obj = it2.next();
}
```

![image-20230206185633780](https://www.arryblog.com/assets/img/image-20230206185633780.be14068c.png)

> 与 continue 结合使用时，一定要注意，避免进入死循环

```js
const arr = ["a", "b", "c", "d"];
const it2 = arr[Symbol.iterator]();
let obj = it2.next();
while (!obj.done) {
  if (obj.value === "c") {
    obj = it2.next(); // 一定要写，否则进入死循环
    continue;
  }
  console.log(obj.value);
  obj = it2.next();
}
// 正确输出结果： a b d
```

## 三、for ... of



通过上面的学习，我们知道，`Iterator`的使用特别的麻烦，难道以后，我们都需要那样来使用 `Iterator` 吗 ？那肯定是不用的，如果这么麻烦，那估计早就没人用了。

官方也不推荐直接使用`Iterator`。所以 ES6 中提供了`for...of`循环来消费`Iterator`。

### 1、for ... of 用法



`for...of`用来遍历迭代器对象，比如数组的`[[Symbol.iterator]]`方法，调用这个方法，可以生成一个迭代器对象。

```js
const arr = ["a", "b", "c", "d"];
const it = arr[Symbol.iterator]();
for (let v of it) {
  console.log(v);
}
```

ES6 中的数组、Set、Map 都有`keys`、`values`、`entries`方法，这三个方法调用后，都返回一个迭代器对象，所以可以用`for...of`来遍历他们

| 方法        | 说明                                                     |
| :---------- | :------------------------------------------------------- |
| `keys()`    | 返回一个遍历器对象，用来遍历所有的键名                   |
| `values()`  | 返回一个遍历器对象，用来遍历所有的键值                   |
| `entries()` | 返回一个遍历器对象，用来遍历 **[键名，键值]** 成的数组。 |

```js
const s = new Set([1, 2, 3]);
for (let k of s.keys()) {
  console.log(k); // 1 2 3
}
for (let v of s.values()) {
  console.log(v); // 1 2 3
}
for (let [k, v] of s.entries()) {
  console.log(k, v); // 1 1  2 2  3 3
}
const m = new Map([
  ["数组", ["a", "b"]],
  ["对象", { a: 1, b: 2 }],
  ["函数", function () {}],
]);

for (let k of m.keys()) {
  console.log(k);
}
for (let v of m.values()) {
  console.log(v);
}
for (let [k, v] of m.entries()) {
  console.log(`${k}=>${v}`);
}
```

![image-20230204220204596](https://www.arryblog.com/assets/img/image-20230204220204596.0022715f.png)

注意：

迭代器对象遍历完，就不能再次使用了

```js
const arr = ["a", "b", "c", "d"];
const it = arr[Symbol.iterator]();
for (let v of it) {
  console.log(v); // a b c d
}

// 以下`for...of`啥也迭代不出来
for (let v of it) {
  console.log(v);
}
```

### 2、for ... of 遍历可迭代对象



- 只要一个对象身上有

  ```
  [Symbol.iterator]
  ```

  属性，则就可以用

  ```
  for...of
  ```

  来遍历对象，我们把带有

  ```
  [Symbol.iterator]
  ```

  属性的对象称为

  可遍历（迭代）对象

  > 也就是说，当用`for...of`来遍历某个对象时，内部会自动调用对象的`[Symbol.iterator]`方法来生成一个迭代器对象，然后按顺序迭代对象的成员。

- 数组原生自带`[Symbol.iterator]`属性，所以我们可以用`for...of`来遍历其成员

```js
const arr = [1, 2, 3];
for (let v of arr) {
  console.log(v); // 1 2 3
}
```

**`for...of` 遍历数组下标**

很多时候我们需要遍历数组的下标，则可以通过用`for...of`遍历数组的 `keys()` 方法得到。数组的`keys()`方法返回的是一个可遍历对象，用来遍历数组的下标

```js
const arr = ["a", "b", "c"];
console.log(arr.keys()); // 迭代器对象
for (let v of arr.keys()) {
  console.log(v); // 0 1 2
}
```

### 3、原生可遍历对象



原生可遍历对象，是指 JS 中原生自带`[Symbol.iterator]`属性的对象。

**JS 中具原生可遍历对象有：**

- Array 数组
- Set
- Map
- String 字符串
- arguments 、NodeList 等 类数组对象

> 因为这些数据结构原生自带`[Symbol.iterator]`属性，所以都可以利用`for...of`来遍历。

**Set**

Set 原生自还`[Symbol.iterator]`属性，所以可以用`for...of`来遍历

```js
// Set/
const set = [1, 2, 3];
const iterator = set[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

![image-20230202235853279](https://www.arryblog.com/assets/img/image-20230202235853279.50516141.png)

**Map**

```js
// Map
const map = new Map([
  [[1, 3, 3], "数组"],
  [{ a: 1, b: 2 }, "对象"],
]);
const iterator = map[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

![image-20230202235827434](https://www.arryblog.com/assets/img/image-20230202235827434.50b28d49.png)

**String**

```js
const str = "hello";
for (let v of str) {
  console.log(v);
}
// 结果 h e l l o
```

**类数组**

```js
function sum() {
  for (let v of arguments) {
    console.log(v);
  }
}
sum(1, 2, 3, 4);
// 结果 1 2 3 4
```

特别强调：

Object 对象，没有`[Symbol.iterator]`属性，则不能用`for...of`来遍历。

### 4、可迭代协议和迭代器协议



**可迭代协议**：可以理解为一个对象如果想要用`for...of`来遍历，那他身上必需要有`[Symbol.itrerator]`属性，否则是不能用`for...of`来遍历的。

**迭代器协议**： 是指迭代器对象必需要有`next()`方法，其方法的返回值必需为一个对象，对象有 value 和 done 两个属性，value 表示每次迭代的成员，done 用来标识成员是否迭代完成。

### 5、为对象添中迭代器接口



如果对象要能用`for...of`来遍历，则需要遵顺**可迭代协议**和**迭代器协议**。

> 即对象身上要有`[Symbol.iterator]`属性，其为一个函数，调用该函数会返回一个迭代器对象。

迭代器对象要遵顺迭代器协议，即迭代器对象有`next`方法，方法返回值为一个对象，对象有`value`和`done`两个属性等。

```js
const obj = {
  data: [1, 2, 3, 4],
  [Symbol.iterator]() {
    let index = 0;
    self = this;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// 当用 for...of 来遍历obj对象时，其内部会自动调用obj的 [Symbol.iterator]方法来生成一个迭代器对象，来对其data数据中的成员遍历。
for (let v of obj) {
  console.log(v);
}
```

![image-20230206190829371](https://www.arryblog.com/assets/img/image-20230206190829371.ec30e642.png)

注意：

自定义的`[Symbol.iterator]`方法，单独调用，其生成的迭代器对象，不能用`for...of`来遍历。

```js
let it = obj[Symbol.iterator]();
for (let v of it) {
  console.log(v);
}
```

![image-20230206191045598](https://www.arryblog.com/assets/img/image-20230206191045598.973611ef.png)

### 6、退出 for ... of 循环



在`for...of`循环语句中，可以使用

- `break`关键字退出整个循环
- `continue`关键字来跳过当次循环
- `throw`关键字抛出错误，同时退出循环

当在 `for ... of` 循环在一个函数体中时，可以在 `for ... of` 循环体中使用`return`关键字，返回函数的返回值

**break 关键字**

```js
const arr = [1, 2, 3, 4, 5];
for (let v of arr) {
  if (v === 3) {
    break;
  }
  console.log(v);
}
// 结果：  1  2
```

**continue 关键字**

```js
const arr = [1, 2, 3, 4, 5];
for (let v of arr) {
  if (v === 3) {
    continue;
  }
  console.log(v);
}
// 结果  1  2  4  5
```

**throw 关键字**

```js
const arr = [1, 2, 3, 4, 5];
for (let v of arr) {
  if (v === 3) {
    throw new Error("抛出错误，退出循环");
  }
  console.log(v);
}
// 结果  1  2  Uncaught Error: 抛出错误，退出循环
```

**return 关键字**

```js
function fn() {
  const arr = [1, 2, 3, 4, 5];
  for (let v of arr) {
    if (v === 3) {
      return "停止";
    }
    console.log(v);
  }
}
console.log(fn());
// 结果  1  2  停止
```

## 四、有哪些场景使用了 Iterator ？



在 JS 这门语方中，有很多地方用到了 Iterator，主要有

- `for...of` 循环
- 数组的展开运算符
- 数组解构赋值
- Set 和 Map 构造函数的参数
- `Array.from()`
- `Promise.all()`
- `Promise.race()`
- `yield*`操作符，在生成器中使用

### 1、验证方案



我们知道

- 数组的解构赋值，等号的右边只要是一个可迭代对象就可以
- 数组的扩展运算符后面只要是一个可迭代对象就可以

> 其本质都是调用了对象身上的`[Symbol.iterator]`方法，生成迭代器对象，然后遍历取出对象中的成员。

```js
let str = "hello";
const [a, b] = str; // 解构赋值
console.log(a, b); // h e
```

如果我们修改`String.prototype[Symbol.iterator]`方法，会有什么样的效果呢 ？

> 我们看下面代码

```js
// 接下来我们修改字符串原型上的[Symbol.iterator]方法
String.prototype[Symbol.iterator] = function () {
  index = 0;
  return {
    next() {
      if (index < 3) {
        return {
          value: index++,
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
};

let str = "hello";
const [x, y] = str; // 解构赋值
console.log(x, y); // 0 1

// 解构赋值内部相当于执行了以下代码
// const it = str[Symbol.iterator]();
// x = it.next().value;
// y = it.next().value;

// 展开运算符
console.log([...str]); // [0,1,2]
```

> 修改了`String.prototype[Symbol.iterator]`方法，所以在解构赋值时 其结果并不是输入 `h e`，而是输出了`0 1`。
> 说明解构赋值时，其内部就是自动调用了`String.prototype[Symbol.iterator]`方法，然后迭代内部的成员来完成解构赋值的。

关于以下使用场景

- Set 和 Map 构造函数的参数
- `Array.from()`
- `Promise.all()`
- `Promise.race()`
- `yield*`操作符，在生成器中使用

其原理和上面的数组的解构赋值原理是一样的，都是调用了对象身上的`[]`方法，生成了一个迭代器对象，然后迭代内部的成员来完成相关操作。

```js
const s = new Set([1, 2, 3]);
console.log(s); // Set(3) {1, 2, 3}
Array.prototype[Symbol.iterator] = function () {
  console.log("不符合要求的代码");
};
const s2 = new Set([1, 2, 3]); // 报错
```

> 其它的场景大家可以自行去验证。

### 2、面试题



编写相关代码，使下面代码成立，并且`a,b`成功赋值

```js
const [a, b] = { a: 1, b: 2 };
```

答案解析

数组的解构赋值 = 号右边只要是一个可迭代对象就可以，但`{a:1, b:2}`是一个 Object 类型的对象，他不是一个可迭代对象，也就是说他没有`[Symbol.iterator]`属性。

> 所以如果要使代码成立，并且 `a,b` 能成功赋值，则需要手动为`{a:1, b:2}`对象添加 iterator 接口。

```js
Object.prototype[Symbol.iterator] = function () {
  // 取出对象的所有键值
  let keys = Object.keys(this); // keys为this对象的键组成的数组
  // console.log(keys);
  let index = 0; // 访问的序号
  const self = this; // 保存this
  return {
    next() {
      if (index <= keys.length) {
        return {
          value: self[keys[index++]],
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
};

const [a, b] = { a: 1, b: 2 };
console.log(a, b); // 1 2
```

## 五、迭代器对象的 return 、throw 方法



迭代器对象除了具有`next()` 方法，还可以具有 return 方法和 throw 方法。

如果自己定义迭代器对象，则必需要有`next()`方法，但是 return 和 throw 方法则是可选的。

### 1、return 方法



如果迭代器提前关闭时，则会自动调用 return 方法。提前退出迭代器情况如下：

- 遇到`break，throw，return`关键字时，会提前退出循环时
- 解构赋值时，未能消费所有值时

**注：**

- return 方法的返回值，必需是一个对象，这是`Generator`规格决定的。
- return 应用场景：如果一个对象在完成遍历前做某些操作，则可以为迭代器对象添加 return 方法。

```js
class DataContainer {
  data = [1, 2, 3, 4];
  [Symbol.iterator]() {
    let index = 0;
    let data = this.data;
    return {
      next() {
        if (index < data.length) {
          return {
            value: data[index++],
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
      return() {
        console.log("提前提出for...of,return方法被调用");
        return { done: true };
      },
    };
  }
}

for (let v of new DataContainer()) {
  if (v === 2) {
    break;
  }
  console.log(v);
}

// 解构赋值时，未消费所有值
const [a, b] = new DataContainer();
console.log(a, b);
```

![image-20230204213945055](https://www.arryblog.com/assets/img/image-20230204213945055.d110bc6d.png)

### 2、不能关闭的迭代器



因为 return 方法是可选的，所以数组、Set、Map、String，类数组的迭代器对象上都没有 return 方法。

当`for...of`遍历时遇到`break、continue、return、throw`，都不会关闭迭代器。

> 如果一个迭代器没关闭，则还可以继承从上次离开的地方继承迭代。

```js
const arr = new Set(["a", "b", "c", "d"]);
const it = arr[Symbol.iterator]();
for (let v of it) {
  console.log(v); // a b
  if (v === "b") {
    break;
  }
}

// 上面的迭代器没有关闭，下面继承迭代
for (let v of it) {
  console.log(v); // c d
}
```

## 六、为什么需要迭代器和 for ... of



在 JS 中遍历的方法有 for、forEach、`for...in`，为什么还有要`for...of`呢 ？ 也就是说，为什么需要迭代器呢 ？

> 因为迭代器主要是供`for...of`来消费的。

### 1、对比不同的遍历方式



那接下来我们就通过对比来了解不同遍历方式之间的差异，从而就能知道为什么还需要迭代器和`for...of`

| 遍历方法   | 说明                                                                                                                                                                                                             |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| for        | for 循环可以用来遍历数组或类数组对象，但是都需要了解其 length 属性和访问元素的方式。也就是都需要了解其内部结构。写起来也比较麻烦                                                                                 |
| forEach    | forEach 可以用来遍历数组、Map、Set，其不需要暴露它们的内部结构，但是他只限于访问数组、Map、Set。 其次 forEach 没有办法和 break、continue、return 关键字使用退了循环。                                            |
| `for...in` | `for...in`主要是用来遍历 Object 类型的对象而用的，当然也可以用来遍历数组，但是其遍历得到的是数组的键名，而非数组的成员。 其次还会遍历手动添加到数组身上的键，也会遍历原型上的键。                                |
| `for...of` | 有`for...in`一样简洁的语法，但没有`for...in`的那些缺点 不同于 forEach 方法，可以与 break、continue、return 配合使用 不同于 for 循环，其遍历不需要暴露对象的内部结构 `for...of`提供了遍历所有数据的统一操作接口。 |

### 2、迭代器作用



迭代器主要作用有以下 3 点：

- 为各种不同的数扰结构（对象）提供了**统一**的，简便的访问接口。
- 数据结构的成员以一定的**顺序**遍历出来
- Iterator 接口，主要供`for...of`消费，一个对象只要有`iterator`接口，就可以利用`for...of`来遍历

> 以后我们如果不想暴露对象的内部结构，而有希望能用`for...of`这种统一的方式来遍历数据成员，就可以为对象添加 iterator 接口。

## 七、总结



总结本章重难点知识，理清思路，把握重难点。并能轻松回答以下问题，说明自己就真正的掌握了。

用于故而知新，快速复习。

### 1、Iterator 遍历器



了解 Iterator 遍历的过程，知道是怎么回事即可，一般我们也不会直接和 Iterator 打交道

> 比如：`for ... of` 循环就封装隐藏了 Iterator 遍历过程的细节，在使用中完全感受不到他背后是使用的 Iterator

- Iterator 是统一的遍历方式
- Iterator 的遍历过程：`Symbol.iterator`（可遍历对象的生成方法）-> `it`（可遍历对象）-> `it.next()` -> `it.next()` -> ...... （直到 done 为 true 停止遍历），这样的一个完整过程称之为 Iterator
- 一般不直接使用 Iterator，而是通过 `for ... of` 循环间接使用

### 2、for ... of 循环



- `for ... of` 循环内部使用了 Iterator

> `for ... of` 隐藏 Iterator 遍历过程的细节，可以让我们更便利的使用 Iterator 它所提供的遍历的功能

- `for ... of` 循环可以与 break、continue 一起使用
- 在 `for ... of` 中可以通过 `keys()` 或 `entries()` 取得数组的索引

### 3、for ... of 可以循环什么类型的数据



只要当前对象是一个可迭代对象，就可以用`for...of`来遍历。可遍历对象需要满足：可迭代协议和迭代器协议两条规则。

> 即：

- 只要有`Symbol.iterator`方法，并且这个方法可以生成可遍历对象，就是可遍历的
- 只要可遍历，就可以使用 `for ... of` 循环来统一遍历
- 数组、字符串、Set、Map、arguments、NodeList 是 **原生可遍历**
- 一般对象不是原生可遍历的，默认情况下不能使用 `for ... of` 循环。如果有需求，也可手动添加 `Symbol.iterator` 方法，变为可遍历

### 4、使用了 Iterator 的场景



- `for...of` 循环
- 数组的展开运算符
- 数组解构赋值
- Set 和 Map 构造函数的参数
- `Array.from()`
- `Promise.all()`
- `Promise.race()`
- `yield*`操作符，在生成器中使用
