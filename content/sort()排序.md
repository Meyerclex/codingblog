---
title: "sort()排序"
tags: 
- JavaScript
---
1. `sort()`函数比较的是ASCII码的大小，而且：Array的sort()方法默认把所有元素先转换为String再排序，所以就有以下问题：
```js
// baiDu排在了最后:
['Google', 'baiDu', 'Facebook'].sort(); // ['Facebook', 'Google", 'baiDu']

[10, 20, 1, 2].sort(); // [1, 10, 2, 20]
```

2. 正确写法：
```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// 也可以写成：
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]
```

思否上面有一个问题：[javascript中sort内部使用了什么算法 时间复杂度是多少](https://segmentfault.com/q/1010000022022918)。

答：ECMAScript 没定义具体算法，各个浏览器的实现方式会有不同。

在 Chrome 70 以前，`sort` 的算法比较特殊：

-   当元素个数小于 `10` 个的时候，使用插入排序；
-   当元素个数大于 `10` 个的时候，使用快速排序。

众所周知：插入排序是稳定的，快速排序是并不稳定的。

从 Chrome 70 开始，V8 团队更新了排序算法，使用了 Timsort 算法。