---
title: "Function 函数"
tags: 
- JavaScript
---

## 什么是函数
- 函数：封装了一段可被重复调用执行的代码块。通过此代码块可以实现大量代码的重复使用。
- 封装：吧一个或多个功能通过函数的方式封装起来，对外只提供一个简单的函数接口。
```js
//声明函数
function 函数名(参数1, 参数2) {
//函数体
}
//调用函数
函数名(参数1, 参数2) 
```

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220818153408.png)
age is the variable to save returned value(function output)

## 函数声明
```js
function fnName () {…};
```

使用function关键字声明一个函数，再**指定一个函数名**，叫函数声明。

## 函数表达式

```javascript
const fnName = function () {…};
```

使用function关键字声明一个函数，但未给函数命名，最后**将匿名函数赋予一个变量**，叫函数[表达式](https://so.csdn.net/so/search?q=%E8%A1%A8%E8%BE%BE%E5%BC%8F&spm=1001.2101.3001.7020)，这是最常见的函数表达式语法形式。

如果实参的个数多余形参，会取到形参的个数。如果实参的个数小于形参，形参可以看作是不用声明的变量，未被实参取到的参数是一个变量但没有接受值，多于的形参定义为undefined，最终的结果就是NaN。

## return
1. return后面的代码不会被执行，return有终止函数的功能
```js
function sum(x, y) {
return x + y //return后面的代码不会被执行
alert('alert')
}
```
2. return只能返回一个值。可以返回数组。
```js
function fn(x, y) {
return x, y;
}
console.log(fn(1, 2)) //return返回的结果是最后一个值

```
3. 如果函数有return则返回return的值，无return则返回undefined。
- break：结束当前的循坏体（如for、while）
- continue：跳出本次循环，继续执行下次循环
- return：不仅可以退出循环，还能够返回return语句中的值，同时还可以结束当前函数体内的代码
## arguments的使用
当我们不确定有多少个参数传递的时候可以用arguments来或许，在JS中arguments世界上是当前函数的一个内置对象。所有函数都内置了一个arguments对象，其储存了传递的所有实参。

arguments展示形式是一个伪数组，因此可以进行遍历。伪数组具有以下特点：
- 具有length属性
- 按索引方式存储数据
- 不具有数组的push、pop等方法
## 匿名函数

```javascript
function () {}; 
```

使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

匿名函数可以直接传递`返回值`做为函数的实参，普通函数作为实参传递的是`一整个函数`而不是返回值

## 箭头函数
ES6标准新增了一种新的函数：Arrow Function（箭头函数）。

为什么叫Arrow Function？因为它的定义用的就是一个箭头：

```js
x => x * x
```

上面的箭头函数相当于：

```js
function (x) {
    return x * x;
}
```

箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连`{ ... }`和`return`都省略掉了。还有一种可以包含多条语句，这时候就不能省略`{ ... }`和`return`：

```js
x => {
    if (x > 0) {
        return x * x;
    }
    else {
        return - x * x;
    }
}
```

如果参数不是一个，就需要用括号`()`括起来：

```js
// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
```

## 回调函数
- 如果将函数A作为参数传递给函数B时，我们称函数A为回调函数。
- 常见使用场景：
```js
function fn() {
console.log('test')
} // fn为回调函数，不被立即执行，之后被调用
setInterval(fn, 1000)
```