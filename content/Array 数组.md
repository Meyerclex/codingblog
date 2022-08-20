---
title: "Array 数组"
tags: 
- JavaScript
---

1. `Array.push('')` 
	1. 加一个元素在数组的末尾。同时它可以返回一些数值：它返回的数值是新数组的长度。
```js
const friends = ['tim', 'allen', 'bob']
const newLength = friends.push('kim')
console.log(newLength) // 4
```

2. `Array.unshift('')`
	1. 添加一个元素在数组的开头。同样返回新数组的长度。
3. `Array.pop('')` 
	1. 删除数组最后一个元素，返回被删除的值
4. `Array.shift('')` 
	1. 删除数组第一个元素，并返回被删除的值
5. `Array.indexOf('')`
	1. 返回元素在数组中的位置，如果元素不存在，返回值`-1`
6. `Array.includes('')`
	1. 检查元素是否包含在数组中，返回true/false
	2. string单引号，number不用加引号。存在类型强制
	3. ES6的新特性

## 遍历数组
- 遍历就是把数组中的每个元素从头到尾都访问一遍。
```js
var arr = ['a', 'b', 'c', 'd', 'e']
console.log(arr.length)
for (var i = 1; i <= arr.length; i++) {
    console.log(`这是数组中的第${i}个，是${arr[i-1]}`)
}
```
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220820170432.png)

### 习题
1. 求数组和
```js
// 求数组和

var arr = [1, 34, 0, 3, 7, 9]
var sum = 0;
var average = 0;
for (var i = 0; i < arr.length; i++) {
    sum = sum + arr[i]
}
console.log(sum);
average = sum / arr.length
console.log(average);
```
2. 求数组中的最大值/最小值
```js
// 数组最大值
var max = arr[0]
for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i]
    }
}
console.log(max)
```
思路：
1. 声明一个保存最大元素的变量max
2. 默认最大值可以先取数组中的第一个元素
3. 遍历这个数组，把里面每个数组元素和max相比较
4. 如果这个数组元素大于max，就把数组元素存在max里面，否则直接进行下一轮。最后输出max。

## 新增数组元素
1. 修改数组元素，修改length长度
```js
var arr = ['a', 'b', 'c', 'd', 'e']
arr.length = 8;
console.log(arr); 
// 多出来的后三个元素将显示为empty，访问会显示undefined
```
2. 新增数组元素，修改索引号
```js
var arr = ['a', 'b', 'c', 'd', 'e']
arr[5] = 'f';
console.log(arr)
// 原先没有则追加
arr[0] = 'yellow';
console.log(arr)
// 原先存在则替换
// 不要直接给数组名负值，否则数组元素都会消失
```

- 但这么干也太离谱了吧！

## 习题
1. 将0-10的整数存放在数组中
```js
const arr = [] // 空数组
for (var i = 1; i <= 10; i++) {
    arr.push(`${i}`)
}
console.log(arr) 
// ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] 
// 存放的是字符串！

const arr = [] // 空数组
for (var i = 1; i <= 10; i++) {
    arr.push(i)
}
console.log(arr) 
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// 存放的是数字
```


2. 将数组中大于十的数字存放到新数组中
```js
const arr = [1, 34, 0, 3, 7, 9, 23, 88, 21]
const arrBiggerThanTen = []
for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= 10) {
        arrBiggerThanTen.push(arr[i])
    }
}
console.log(arrBiggerThanTen)
```

3. 翻转数组
```js
var arr = ['a', 'b', 'c', 'd', 'e']
var arrmirror = []
for (var i = 0; i < arr.length; i++) {
    arrmirror.push(arr[arr.length - 1 - i])
}
console.log(arrmirror)
```

## 冒泡排序
一种算法，把一系列的数据按照一定的顺序进行排列显示（从大到小或从小到大）。它重复走访过要排序的数列，不断进行两两比较，顺序错误则交换。重复交换到不再需要交换。
这个算法的名字由来是越小的元素会经由交换慢慢浮到数列顶端。

1. 如何交换两个变量
```js
var num1 = 10;
var num2 = 20;
var temp;
temp = num1;
num2 - temp;
console.log(num1, num2)
```

原理：
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220820190616.png)

实现：
```js
var arr = [1, 34, 0, 3, 7, 9, 23, 88, 21]
for (var i = 0; i < arr.length; i++) { //外层循环管趟数
    // 每一趟交换几次，外层循环完成i躺，说明有i个元素已被整理好，因此内层循环只需要整理到倒数arr.length - i个元素前即可
    for (var j = 0; j < arr.length - i; j++) {
        //内部交换2个变量的值
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
console.log(arr)
```