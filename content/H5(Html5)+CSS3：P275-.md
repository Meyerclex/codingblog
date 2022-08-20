## HTML5 新特性
- 增加了一些新的表单、新的标签和新的表单属性。新特性都有兼容性问题，IE9+以上版本的浏览器才支持，不考虑兼容性可以大量使用这些新特性。
### 新增的语义化标签
- div队与搜索引擎来说，是没有语义的。HTML5新增的语义化标签有：
	- `<header>`
	- `<nav>`
	- `<article>`内容标签
	- `<section>`定义文档某个区域
	- `<aside>`侧边栏标签
	- `<footer>`
![|400](https://raw.githubusercontent.com/Meyerclex/image/main/20220816114117.png)

## CSS3新特性
### 属性选择器
可以跟据元素特定属性来选择元素。
![|400](https://raw.githubusercontent.com/Meyerclex/image/main/20220816121007.png)
类选择器、属性选择器、伪类选择器，权重为10。
### 结构伪类选择器
![|450](https://raw.githubusercontent.com/Meyerclex/image/main/20220816122303.png)
nth-child(n)选择某个父元素的一个或多个特定的子元素
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816124312.png)

- n可以是数字，关键字和公式
- n如果是数字，就是选择第n个子元素，里面数字从1开始
- n可以是关键字：even偶数，odd奇数
- n可以是公式：常见的公式如下（如果n是公式，则从0开始计算，但是第0个元素或者超出了元素的个数会被忽略）
	- ![|300](https://raw.githubusercontent.com/Meyerclex/image/main/20220816123354.png)
## 伪元素选择器（重点）
伪元素选择器可以帮助我们利用CSS创建新标签元素而不需要HTML标签，从而简化HTML结构。
- CSS3语法一般是双冒号写法
- CSS2过时语法是但冒号写法
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816125927.png)
反斜杠转义
![|450](https://raw.githubusercontent.com/Meyerclex/image/main/20220816135339.png)

## CSS3盒子模型
CSS3中可以通过`box-sizeing`来指定盒子模型。
1. box-sizing: content-box 盒子大小为width+padding+border
2. box-sizing: border-box 盒子大小为width
	1. 如果盒子模型我们该为了box-sizing: border-box，那么padding和border就不会撑大盒子了。前提padding和border不会超过width宽度

## CSS3其他特性
- 模糊特效 filter: blur();
	- ![|450](https://raw.githubusercontent.com/Meyerclex/image/main/20220816142439.png)
- calc 函数
	- ![|450](https://raw.githubusercontent.com/Meyerclex/image/main/20220816143730.png)
## CSS3 过渡
`transition: 要过渡的属性 花费时间 运动曲线 何时开始;`
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816144559.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816145633.png)
- 谁做过渡给谁加
- 写多个属性，利用逗号分隔
- 多个属性都变化，属性写all即可

## HTML5
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816151755.png)

## 品优购项目
### 模块化开发
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816154441.png)
### 网站TDK三大标签SEO优化
TDK：title、description、keyword
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816171539.png)
### 常见类名
![|450](https://raw.githubusercontent.com/Meyerclex/image/main/20220816171944.png)

## Shortcut
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816173941.png)
竖线的常用做法是一个1px的盒子。

## LOGO SEO优化
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816203130.png)
