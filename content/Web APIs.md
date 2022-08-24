---
title: "Web APIs"
tags: 
- JavaScript
---

- **Web APIs**
	1. 作用：使用JS去操作html和浏览器
	2. 分类：DOM（文档对象模型）、BOM（浏览器对象模型）
- DOM：用来呈现以及与任意html或xml文档交互的API，用来开发网页内容特效和实现用户交互。
- DOM树：将HTML文档以树状结构直观表现出来，我们称之为文档树或DOM树，描述王爷关系内容的名字，直观地体现了标签与标签之间的关系。
- DOM对象：浏览器根据html标签生成的JS对象。所有标签属性都可以在这个对象上面找到，修改这个对象的属性会自动映射到标签身上。核心在于把网页内容当作对象来处理。
- document对象：是DOM里提供的一个对象，所以它提供的属性和方法都是用来访问和操作页面内容的（例如：`document.write()`）王爷所有内容都在document里。

## 获取DOM对象
1. 根据CSS先择起来获取DOM元素
	1. 选择匹配的第一个元素
		1. 语法：`document.querySelector('css选择器')`
		2. 参数：包含一个或多个有效的CSS选择器（**字符串**）
		3. 返回值：CSS选择器匹配的**第一个元素**，一个HTMLelement对象。如果没有匹配到则返回`null`。
	2. 选择匹配的多个元素
		1. 语法：`document.querySelectorAll('css选择器')`
		2. 参数：包含一个或多个有效的CSS选择器
		3. 返回值：CSS选择器匹配的NodeList（对象集合）
		4. 最终得到是一个伪数组：想得到里面的每一个对象，需要进行遍历（for）获得。具有length属性、按索引方式存储数据、不具有数组的push、pop等方法。
		5. 不管有几个标签，`querySelectorAll`得到的都是数组
	3. 其他获取DOM元素方法
		1. 根据id获取一个元素：`document.getElementById('')`
		2. 根据标签获取一雷元素，获取页面所有div：`document.getElementByTagName('')`
		3. 根据类名获取元素，获取页面所有类名为w的：`document.getElementByClassName('w')`
## 设置/修改DOM元素内容
1. `document.write()`：只能将文本内容追加到`</body>`前面的位置，文本中包含的标签会被解析。
2. 元素`innerText`属性：将文本内容添加/更新到任意标签位置，文本中包含的标签不会被解析。