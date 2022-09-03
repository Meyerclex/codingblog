---
title: "Window对象"
tags: 
- JavaScript
---
- BOM(Browser Object Model ) 是浏览器对象模型  
- window 是浏览器内置中的全局对象，我们所学习的所有 Web APIs 的知识内容都是基于 window 对象实现的  
- window 对象下包含了 navigator、location、document、history、screen 5个属性，即所谓的 BOM （浏览器对象模 型）  
- document 是实现 DOM 的基础，它其实是依附于 window 的属性。  
- 注：依附于 window 对象的所有属性和方法，使用时可以省略 window
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220903152235.png)
1. 定时器-延时函数
- JavaScript 内置的一个用来让代码延迟执行的函数，叫 setTimeout
- `setTimeout(回调函数, 等待的毫秒数)`
- setTimeout 仅仅只执行一次，所以可以理解为就是把一段代码延迟执行, 平时省略window
- 清除延时函数：
```js
let timer = setTimeout(回调函数, 等待的毫秒数)
clearTimeout(timer)
```
- 