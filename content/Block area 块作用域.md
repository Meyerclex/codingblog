- 通过`var`声明的变量或者非严格模式下 (non-strict mode) 创建的函数声明**没有**块级作用域。
- 相比之下，使用 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)和[`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)声明的变量是**有**块级作用域的。
- shi'li
```js
let x = 1;
{
  let x = 2;
}
console.log(x); // 输出 1
```
`x = 2`仅限在定义它的块中。