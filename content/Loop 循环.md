## for
```js
for (初始化变量; 条件表达式; 操作表达式) {
//循环体
}
```
1. 初始化变量就是用var生命的一个普通变量，通常用于作为计数器使用
2. 条件表达式就是用来决定每一次循环是否继续执行，就是终止的条件
3. 操作表达式 是每次循环最后执行的代码，经常用于我们计数器变量进行更新（递增或者递减）
```js
for (var i = 1; i <= 100; i++) {
 console.log('hello')
}
```
1. 首先执行里面的计数器变量 `var i = 1`但是这句话在for里面只执行一次，i是index的意思。
2. 去`i<=100`来判断是否满足条件，满足执行循环体，不满足结束
3. 最后去执行 `i++` 第一轮结束
4. 接着去执行`i<=100`

### 执行不同的代码
```js
for (var i = 1; i <= 100; i++) {
    if (i == 1) {
        console.log('1岁')
    } else if (i == 100) {
        console.log('100岁')
    } else {
        console.log('这个人今年' + i + '岁了')
    }
}
```

### 习题
1. 求1-100之间奇数之和、偶数之和
```js
var even = 0;
var odd = 0;
for (var i = 1; i <= 100; i++) {
 if (i % 2 == 0) {
 even = even + i;
}
} else {
 odd = odd + i;
}
```
2. 求1-100之间所有能被3整数的数字和
```js
var result = 0;
for (var i = 1; i <= 100; i++) {
	if (i % 3 == 0) {
	result = result + i;
	}
}
```
3. 计算班级平均分
```js
var num = prompt('请输入班级总人数')
var sum = 0;
var average = sum / num;
for (var i = 1; i <= num; i++) {
        var score = prompt('请输入第' + i + '个学生的成绩');
        sum += parseFloat(score) //string转换为number
    } 
    average = sum / num;
    alert(`共有${num}人，平均值是${average}`)
```
4. 一行打印五颗行星
```js
var str = ''
for (var i = 1; i  <= 5; i++) {
	str += '⭐'
}
console.log(str);
```

#### String转为Number
[Number( )、parseInt( )、parseFloat( )的用法及区别](https://segmentfault.com/a/1190000020008733)

### 双重for循环执行过程
![|500](https://raw.githubusercontent.com/Meyerclex/image/main/20220820134745.png)
![|500](https://raw.githubusercontent.com/Meyerclex/image/main/20220820135311.png)

1. 打印五行五列星星
```js
for (var i = 1; i <=5; i++) { //外部循环负责打印五行
	for (var j = 1; j <= 5; j++) {
	str += '⭐' 
	}
	// 如果一行打印完毕5个星星就要另起一行加\n
	str += '\n'
}
```
 2. 打印n行n列的星星
```js
var rows = prompt('行数')
var cols = prompt('列数')
var str = '';
for (var i = 1; i <= rows; i++) {
	for (var j = 1; j <= cols; j++) {
	str += '*';
	}
	str += '\n';
}
console.log(str)
```
3. 打印倒三角形
```js
var str = '';
for (var i = 1; i <= 10; i++) { //外层循环控制行数
	for (var j = i; j <=10; j++) { //内层循环控制个数
	str += '♥'
	}
	str += '\n';
}
// 当i=1的时候，内层循环j = i = 1，始终小于10，j++，反复打印星星，一直加到j=10，不再满足条件，换行，内部循环了十次，外部开始循环第二次，i=2，内部再次循环。
```
4. 打印九九乘法表
- 一共有九行，但是每行个数不一样，因此需要用到双重佛如循环
- 外层循环控制行数i，循环9次，打印9行
- 内层的for循环控制每行公式j
- 核心算法：每一行公式的个数正好和行数一致，j<=i
- 记得换行
```js
var str = '';
for (var i = 1; i <= 9; i++) { //i=行数
	for (var j = 1; j <= i; j++) { //j代表列数（一行的个数）
	str += j + 'x' + i + '=' + j * i + ' '
	}
	str += '\n'
}
console.log(str)
```
![|500](https://raw.githubusercontent.com/Meyerclex/image/main/20220820145040.png)

## While 循环
![|550](https://raw.githubusercontent.com/Meyerclex/image/main/20220820150049.png)

### While循环习题
1. 打印1-100岁
```js
var i = 1;
while (i<=100) {
console.log('今年'+ i +'岁')
i++
}
```
2. 计算1-100之间所有整数的和
```js
var j = 1;
var sum = 0;
while (j <= 100) {
sum += 1;
}
console.log(sum)
```
3. 暗号练习
```js
var message = prompt('暗号')
while (message !== 'die hard') {
	message = prompt('重新输入')
}
```

## do while
```js
do {
	//循环体
} while (条件表达式)
//代码验证
var i = 1
do {
	console.log('print')
	i++; //否则死循环
} while (i <= 10);
```
- 与while不同的地方先执行一次循环体，再判断条件。
- 如果条件表达式结果为真，则继续执行循环体，否则结束循环。
- 至少执行一次
#### do while 暗号练习
```js
do {
	var message = prompt('test')
} while (message !== 'die hard')
```

## continue关键字
只要遇见continue就立即退出当前次循环
e.g: 吃五个包子，吃到第三个发现continue，跳过第三个不吃，吃第四第五个。
```js
for (var i = 1; i <= 5; i++) {
	if (i == 3) {
	continue
	}
	console.log(''+ i +''次循环)
}
```
### 习题
1. 求1-100之间，除了能被7整除以外的整数和
```js
var sum = 0;
for (var i = 1; i <= 100; i++) {
	if (i % 7 == 0) { //双等号
	continue;
	}
	sum += i;
}
console.log(sum)
```
## break关键字
break关键字用于立即跳出整个循环（循环结束）。
e.g: 吃五个包子，吃到第三个发现break，剩下的也不吃了。