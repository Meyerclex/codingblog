---
title: "Object 对象"
tags: 
- JavaScript
---

键值对 `property:value`

## Key Point
- 和Array最大的差别在于，Object中属性顺序不重要，Array的顺序非常重要，因为它是我们访问元素的方式

## 用法
```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
xiaoming.name; // '小明'
xiaoming.birth; // 1990
```

## 特殊命名
访问属性是通过`.`操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用`''`括起来：

```js
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School'
};
```
`xiaohong`的属性名`middle-school`不是一个有效的变量，就需要用`''`括起来。访问这个属性也无法使用`.`操作符，必须用`['xxx']`来访问：
```js
xiaohong['middle-school']; // 'No.1 Middle School'
xiaohong['name']; // '小红'
xiaohong.name; // '小红'
```

由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性：

```js
var xiaoming = {
    name: '小明'
};
xiaoming.age; // undefined
xiaoming.age = 18; // 新增一个age属性
xiaoming.age; // 18
delete xiaoming.age; // 删除age属性
xiaoming.age; // undefined
delete xiaoming['name']; // 删除name属性
xiaoming.name; // undefined
delete xiaoming.school; // 删除一个不存在的school属性也不会报错
```

如果我们要检测`xiaoming`是否拥有某一属性，可以用`in`操作符：

```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
'name' in xiaoming; // true
'grade' in xiaoming; // false
```

不过要小心，如果`in`判断一个属性存在，这个属性不一定是`xiaoming`的，它可能是`xiaoming`继承得到的：

```js
'toString' in xiaoming; // true
```

因为`toString`定义在`object`对象中，而所有对象最终都会在原型链上指向`object`，所以`xiaoming`也拥有`toString`属性。

要判断一个属性是否是`xiaoming`自身拥有的，而不是继承得到的，可以用`hasOwnProperty()`方法：

```js
var xiaoming = {
    name: '小明'
};
xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false
```

## 构造函数
因为一次创建一个对昂，里面很多的属性和方法是大量相同的，因此可以利用函数的方法重复相同的代码，我们把这个函数成为构造函数。因为这个代码不一样，里面封装的不是普通的代码，而是对象。构造函数就是把对象里面一些相同的属性和方法抽象出来封装到函数中。

```js
function 构造函数名() {
	this.属性 = 值;
	this.方法 = function() {}
}
new 构造函数名();
// e.g
function Idol(yourname, yourage, yourgender) {
	this.name = 'yourname';
	this.age = age;
	this.gender = yourgender;
}
var star = new Idol('leslie', 28, 'male')
console.log(star.name) // 'leslie'
```
1. 构造函数首字母大写。
2. 构造函数不需要`return`就可以返回结果。
3. 调用构造函数必须使用`new`。
4. 调用一次`new Idol`就创造了一次对象。

### `new`关键字执行过程
1. `new`构建函数在内存中创建了一个空的对象。
2. `this`就会只想刚才创建的空对象。
3. 执行构造函数里面的代码，给这个空对象添加属性和方法。
4. 返回这个对象，因此不需要`return`。

## 遍历对象属性
`for...in`用于对数组或者对象的属性进行循环操作。
```js
var obj = {
	name: 'x',
	age: 18,
	gender: 'male',
	fn: function
《}
// for (变量 in 对象) {
//}
for (var k in obj) {
	console.log(k) // k输出得到的是属性名
	console.log(obj[k]) //obj[k]得到的是属性值
}
// 使用for in里面的变量，习惯写k或者key
```