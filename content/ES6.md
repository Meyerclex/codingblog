---
title: "ES6"
tags: 
- JavaScript
---

## `let`和`const`

`let`
1. 具有块级作用域
```js
	for(var i = 0;i < 3;i++){
	}
	console.log(i);//3
	for(let j = 0;j < 3;j++){
	}
	console.log(j);//拨错：j is not defined
```
2. 没有变量提升
```js
console.log(a);//报错：a is not defined
let a = 1;
```
3. 具有暂时性死区
```js
var num = 10;
if(true){
	console.log(num);//num is not defined
	//let会把变量固定在块级作用域中，而不去上一级作用域是否有这个变量
	let num = 1;
}
```
4. 不能重复声明

下面这段代码的输出是什么？

```js
var arr = [];
for(var i = 0;i < 3;i++){
	arr[i] = function(){
		console.log(i);
	}
}
/* i在全局作用域中，for循环结束之后，i的值是2,共用
一个作用域下变量 */
arr[0]();//3
arr[1]();//3
```

```js
var arr = [];
for(let i = 0;i < 3;i++){
	arr[i] = function(){
		console.log(i);
	}
}

/* 每次循环都会产生一个块级作用域，每个块级作用域都对
应一个值，函数对应那个作用域的值。 */
arr[0]();//0
arr[1]();//1
```


`const`声明常量，常量就是值（内存地址）不能变化的量，也就是`const`锁定了内存地址的引用关系

1. 具有块级作用域
2. 声明常量必须赋值
3. 内存地址不能修改
4. 不能重复声明

```js
const a = 10;
a = 20;//报错：Assignment to constant variable.
/*arr 对应的是引用数据类型，修改这个数据内部的属性和值不会报错，当时给const定义的常量重新赋值一个新的值,就会报错 */
const arr = [1,2,3];
arr[1] = 2222; // 修改
console.log(arr);// [1,2222,3]
arr = [1,2,3,4,5];// 报错：Assignment to constant variable.
```
## 解构赋值
1. 数组模型解构
```js
//数组模型解构

//基本
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3

//嵌套
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3

//忽略
let [a, , b] = [1, 2, 3];
// a = 1
// b = 3

//不完全解构
let [a = 1, b] = []; // a = 1, b = undefined

//剩余运算符
let [a, ...b] = [1, 2, 3]; // 超级不可理喻
//a = 1
//b = [2, 3]

//字符串etc
let [a, b, c, d, e] = 'hello';
// a = 'h'
// b = 'e'
// c = 'l'
// d = 'l'
// e = 'o'

let [a = 2] = [undefined];
 // a = 2
```
2. 对象解构
```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'， baz is not defined

const obj = {name: 'tim', age: 18}
// obj.name , obj.age
const {uname, age} = {name: 'tim', age: 18}
//等价于 const uname = obj.name
console.log(uname) //tim
console.log(age)//18
//省略了obj.
```
对象解构的变量名可以重新改名：
```js
const obj = {uname: 'tim', age: 18}
const {uname: username, age} = obj 
console.log(username)
console.log(uname) // undefined

```
要点在于括号结构正确。
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907163832.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907165148.png)

## 模板字符串
```js
//创建模板字符串
//模板字符串可以解析变量
let name = 'tim';
let text = `${name}roy`;
console.log(text);//timroy
```

## 对象属性的简写
```js
let name = 'zhangsan';
let clog = function() {
    console.log('shuchu')
}

// 属性名和变量名相同
let obj = {
    name,
    clog,
    add(num1, num2) {
        return num1 + num2;
    }
}

// 效果相同的写法
let obj2 = {
    name: name,
    clog: clog,
    add: function(num1, num2) {
        return num1 + num2;
    }
}

obj.clog(); // shuchu
console.log(obj.name, obj.add(1, 2)); // zhangsan 3
obj2.clog(); // shuchu
console.log(obj2.name, obj2.add(1, 2)); // zhangsan 3

```

## 箭头函数
`() => {}`，箭头函数适用于那些本来要写**匿名函数**的地方。使用箭头函数的注意事项：
1. 返回一个对象怎么书写
```js
// 因为对象的{}会被解析成代码块的{},所以我们使用()包裹这个对象
const fn = () => ({a:1});
console.log(fn());
```
2. 箭头函数没有this
3. 箭头函数不能使用new实例化对象：箭头函数原型上没有`constructor`属性，不能用来实例化
4. 箭头函数不能使用arguments对象
5. call/apply/bind方法无法改变箭头函数中this的指向
6. 箭头函数没有原型对象
7. 不能使用new.target

```js
// 经典面试题，错误案例验证箭头函数没有this,用的是上下文的this,这个面试题的关键在于对象没有作用域。

var obj = {
	name: '刘德华',
	age: 18,
	say: () => console.log(this.age)
}

obj.say();
/* 对象没有作用域，而对象又定义在全局上，所以say箭头函数的this是
window,window对象没有age属性，所以输出undefined */
window.age = 20
obj.say();//20

```

## 函数参数的默认值
1. ES6允许函数给参数赋初始值
```js
function add(a,b,c=10) { // 给c赋初始值10
return a + b + c;
}
let result = add(1,2)
console.log(result); //13
```

2. 与解构赋值结合
## 动态参数 arguments
`arguments`是函数内部内置的伪数组变量，它包含了调用函数时传入的所有实参。
1. 是一个伪数组，只存在于函数中
2. 作用是动态获取函数的实参
3. 可以通过for循环依次得到传递过来的实参
## 剩余参数 rest
ES6引入`rest`参数，用于获取函数的实参，用来代替`arguments`
1. 两种获取实参的方式
```js
// ES5
function date(){
console.log(arguments);
}
date('a','b','c') //Arguments结果是一个对象而不是一个数组

// ES6

function fn(){
console.log(args);
}
fn('a','b','c') //结果是一个数组，可以使用一些数组的处理方法比如filter，some，every，map

// rest参数必须放在参数最后
```

```js
/* 剩余参数(...变量名)允许我们将不定量的参数表示为一个数组 */
function fn(first,...args){
	console.log(first);//1
	console.log(args);//[2,3,4]
}
fn(1,2,3,4);

/* 箭头函数中没有arguments对象，所以只能用剩余参数来存储多于的参数 */
const sum = (...args) => {
	let total = 0;
	args.forEach(item => total += item);
	return total;
}
sum(1,2,3);
sum(1,2,3,4);

// 剩余参数和解构赋值搭配使用
let arr = [1,2,3];
let [first,...last] = arr;
console.log(first);//1
console.log(last);//[2,3]

```

## 扩展/展开运算符
典型运用场景：求数组最大/小值、合并数组等
```js
let arr = [1,2,3,4,5];//...arr 就是1,2,3,4,5
console.log(...arr);//12345 log函数将逗号作为分隔符了
let obj1 = {
	name1: '刘德华',
	age1: 18
}

let obj2 = {
	name2: '张学友',
	age2: 19,
	...obj1,
}
console.log(obj2);//{name2: "张学友", age2: 19, name1: "刘德华", age1: 18}
```

```js
// 2、拓展运算符可以用来合并数组
let arr1 = [1,2,3,4,5];//...arr1 就是1,2,3,4,5
let arr2 = [6,7,8];
let arr3 = [...arr1,...arr2];
console.log(arr3);//[1,2,3,4,5,6,7,8]
let arr4 = [arr1,arr2]
console.log(arr4) //[Array(5), Array(3)]
```
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220906162906.png)

```js
// 3、遍历数组将伪数组变成真正的数组
<body>
<div></div><div></div><div></div><div></div><div></div><div></div>
<script>
​	var divs = document.getElementsByTagName('div');
​	var arr = [...divs];
​	console.log(arr);//[div, div, div, div, div, div]
</script>
</body>

// 4、克隆数组		
let arr1 = [1,2,3,4,5];
let arr2 = [...arr1];
console.log(arr2);

/* 合并对象时，出现同名的属性，书写在后面的属性值将替换
前面的同名属性的属性值,数组却不会，因为两个数组合并下标肯定
会冲突，因此js底层做了处理 */
let obj1 = {
    sex: "男"
}

let obj2 = {
    sex: "nan",
    ...obj1,
}

let obj3 = {
    ...obj1,
    sex: "nan",
}
console.log(obj2); // { sex: '男' }
console.log(obj3); // { sex: 'nan' }

let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [5, 6, 7, 8];
let arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4, 5, 6, 5, 6, 7, 8]

```

## Symbol

Symbol 值作为对象属性名时，不能用点运算符。在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

## 垃圾回收机制
1. 什么是垃圾回收机制
2. 内存的生命周期
3. 垃圾回收算法说明
	1. 引用计数：存在嵌套引用的问题。如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄漏。
		1. ![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907115046.png)
	2. 标记清除法

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907111454.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907111647.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907112250.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907115252.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907115432.png)
## 闭包 Closure
一个函数对周围状态的引用捆绑在一起，内层函数中方位到其外层函数的作用域。

简单理解：闭包 = 内层函数 + 外层函数的变量
```js
function outer() {
	const a = 1
	function f() { // 内层函数
	console.log(a) // 内层函数用到了外层函数的变量a
	}
	f()
}
outer()
```
闭包作用：封闭数据，提供操作，外部也可以访问函数内部的变量。

闭包基本格式：
```js
function outer() {
	let i = 1
	function fn() {
	console.log(i)
	}
	return fn
}
// outer() === fn() === function fn() {}
// const fun = function fn() { } 
const fun = outer()
fun() //1
//外层函数使用内部函数的变量
```

闭包应用：实现数据的私有。比如要做一个统计函数调用次数的函数：
```js
let count = 1
function fn() {
	count++
	console.log(`调用${count}次`)
}
fn() //2
fn() //3
count = 1000
fn() // 1001

// 闭包形式:

function count2() {
	let i = 0
	function fn() {
		i++
		console.log(i)
	}
	return fn
}
const fun = count2()
fun() // 1
i = 1000
fun() //2
```

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907144739.png)

## 变量提升
当代码执行之前先检测所有`var`声明的变量，然后提升到**当前作用域**的最前面。只提升声明，不提升赋值。
 
```js
console.log(num + '件')
var num 
// undefined件
``` 
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220907145448.png)

## 函数提升
1. 会把所有函数声明提升到当前作用域的最前面。
2. 只提升函数声明，不提升函数调用。函数表达式不存在提升现象。
```js
fn()
function fn() {
	console.log('函数提升')
} // 函数提升

fun()
var fun = function() {
console.log('函数表达式')
}//报错，因为不提升赋值。函数表达式不存在提升现象
```


