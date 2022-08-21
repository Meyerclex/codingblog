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

## 匿名函数

```javascript
function () {}; 
```

使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

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