---
title: "遍历数组forEach方法"
tags: 
- JavaScript
---
Related to：[[ES6]]

- `forEach()`方法用于调用数组的每个元素，并将元素传递给回调函数。只遍历不返回数组。
- 主要适用场景：遍历数组的每个元素
`被遍历的数组.forEach(function (当前数组元素, 当前元素索引号) {函数体})`
- 参数当前数组元素是必须要写的，索引号可选。
```js
    const arr = ['red', 'blue', 'pink']
    arr.forEach(function(item, index) {
        console.log(item)
        console.log(index)
    })
```
结果：
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907165956.png)
