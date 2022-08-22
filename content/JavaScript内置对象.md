---
title: "JavaScript内置对象"
tags: 
- JavaScript
---

- JS中的对象分为三种：自定义对象、内置对象、浏览器对象。
## `Math` 数学对象
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

### 猜数字游戏
```js
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大
}
var random = getRandom(1, 10);
while (true) {
	var num = prompt('猜1-10之间的一个数字')
	if (num > random) {
	alert('猜大了'); 
	} else if (num < random) {
	alert('猜小了')
	} else {
	alert('猜对了');
	break; //退出整个循环
	}
}
// 限制猜的次数，可以用for循环
```

## `Date`日期对象
`Date`是一个构造函数，因此需要用`new`来调用创建。若将它作为常规函数调用（即不加 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符），将返回一个字符串，而非 `Date` 对象。

```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```
