---
title: "Vue数据监测"
tags: 
- Vue
---

1. Vue会监视data中所有层次的数据
2. 如何检测对象中的数据？
	1. 通过setter实现监测，且要在new Vue时旧传入要监测的数据
		1. 对象中后追加的属性，Vue默认不做响应式处理
		2. 如需给后添加的属性做响应式，使用`Vue.set`或`vm.$set`
3. 如何检测数组中的数据？
	1. 通过包裹数组更新元素的方法实现，本质就是做了：
		1. 调用原生对应方法（`push`、`splice`等七个，不包括`filter`）对数组进行更新
		2. 重新解析模板，进而更新页面
4. 在Vue修改数组中的某个元素一定要用如下方法
	1. `push()`、`splice()`等API，使用filter时[替换数组](https://v2.cn.vuejs.org/v2/guide/list.html#%E6%9B%BF%E6%8D%A2%E6%95%B0%E7%BB%84)。
	2. `Vue.set`、`vm.$set`
`Vue.set`或`vm.$set`不能给`vm`或`vm`的根数据对象添加属性。