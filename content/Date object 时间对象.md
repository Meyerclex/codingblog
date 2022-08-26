---
title: "Date object 时间对象"
tags: 
- JavaScript
---
- 在代码中发现了`new`关键字时，一般讲这个操作成为**实例化**
- 创建一个时间对象并获取时间：`let date = new Date()`

## `Date`日期对象
`Date`是一个构造函数，因此需要用`new`来调用创建。若将它作为常规函数调用（即不加`new`操作符），将返回一个字符串，而非 `Date` 对象。

```js
new Date();
new Date(value);
new Date(dateString); // new Date('2019-5-1')或new Date('2019/5/1')
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

如果不加参数则返回当前系统的当前时间。

- `getMonth()`获取当月，只能获取0-11，`date.getMonth() + 1`才是正确的月份。
- `getDay()`获取星期几，周日为0，周六为6

```js
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var dates = date.getDate();
var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
var day = arr[date.getDay()]
console.log(`今天是${year}年${month}月${dates}日，${day}。`) 
```

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220822175313.png)

### 要求封装一个返回当前时间的函数
```js
function getTimer() {
var h = time.getHours()
h = h < 10 ? '0' + h : h; // 如果h小于10，则在前面加一个占位的0
var m = time.getMinutes()
m = m < 10 ? '0' + m : m;
var s = time.getSeconds()
s = s < 10 ? '0' + s : s;
return h + ':' + m + ':' + s;
} 
console.log(getTimer());
```

### 获取日期的总的毫秒形式
`Date`对象是基于1970年1月1日（世界标准时间）起的毫秒数。经常利用总的毫秒数来计算时间，因为它更精确。是一种特殊的计量时间的方式，也称为时间戳。
- 三种方式获得时间戳
1. `getTime()`
```js
let date = new Date()
console.log(date.getTime())
```
2. 简写`+new Date()`
```js
console.log(+new Date())
```
3. `Date.now()`
	1. 无需实例化
	2. 但是只能获得当前的时间戳，而前面两种可以返回指定时间的时间戳