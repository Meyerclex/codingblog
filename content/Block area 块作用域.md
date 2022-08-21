---
title: "Block area 块作用域"
tags: 
- JavaScript
---

- 在 `ES5` 中规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。而在 `ES6` 中引入了块级作用域，允许函数可以在块级作用域中声明。块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。
- 通过`var`声明的变量或者非严格模式下 (non-strict mode) 创建的函数声明**没有**块级作用域。
- 相比之下，使用 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)和[`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)声明的变量是**有**块级作用域的。
- **示例：**
```js
let x = 1;
{
  let x = 2;
}
console.log(x); // 输出 1
```
`x = 2`仅限在定义它的块中，`const`的结果也是一样的。

- 一般考虑到兼容等问题，我们应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
- **示例：**
上述代码使用函数表达式来写：

```js
{
    if(true){
        let test = function (){
            console.log("你好！");
        };
    }
}
```
除此之外，还有一个地方我们需要注意一下， `ES6` 的块级作用域必须有大括号，如果没有大括号，`JavaScript` 引擎就认为不存在块级作用域。