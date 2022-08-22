---
title: "JavaScript内置对象"
tags: 
- JavaScript
---

- JS中的对象分为三种：自定义对象、内置对象、浏览器对象。
## Math 数学对象
`Math`不是一个构造函数，不需要用`new`来调用，而是直接使用里面的属性。具有数学常数和函数的属性和方法，跟数学有关的运算可以使用`Math`里的成员。

- 常用的`Math`
	- `Math.PI` 圆周率
	- `Math.floor()` 向下取整
	- `Math.ceil()` 向上取整
	- `Math.round()` 四舍五入版就近取正，但`-3.5`会取值`-3`
	- `Math.abs()` 绝对值
	- `Math.max()` / `Math.min()` 求最大和最小值

### 得到一个两数之间的随机整数，包括两个数在内
```js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
```
