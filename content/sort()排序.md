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