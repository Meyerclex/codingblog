---
title: The complete JavaScript Course 2022
tags: 
- JavaScript
---
## 7 Primitive Data Types
1. Number
2. String 字符串
3. Boolean：`True`or`False`
4. Undefined：Value taken by a variable that is not yet defined('empty value')
5. Null: Also means 'empty value'
6. Symbol（ES2015）：Value that is unique and cannot be changed[Not useful for now]
7. BigInt（ES2020）：Larger integers than the Number type can hole
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220811211622.png)

## var let const

### let & var
使用 `var` 关键字声明变量的最大问题之一是你可以轻松覆盖变量声明：

```js
var camper = "James";
var camper = "David";
console.log(camper);
```

在上面的代码中，`camper` 变量最初声明为 `James`，然后被覆盖为 `David`。 
然后控制台显示字符串 `David`。

在小型应用程序中，你可能不会遇到此类问题。 但是随着你的代码库变大，你可能会意外地覆盖一个你不打算覆盖的变量。 由于此行为不会引发错误，因此搜索和修复错误变得更加困难。

ES6 中引入了一个名为 `let` 的关键字，这是对 JavaScript 的一次重大更新，以解决与 `var` 关键字有关的潜在问题。 你将在后面的挑战中了解其他 ES6 特性。

如果将上面代码中的 `var` 替换为 `let` ，则会导致错误：

```js
let camper = "James";
let camper = "David";
```

该错误可以在你的浏览器控制台中看到。
所以不像 `var`，当你使用 `let` 时，同名的变量只能声明一次。

- var是ES6之前的声明方法，尽量不要使用。
### 使用 const 关键字声明只读变量

关键字 `let` 并不是声明变量的唯一新方法。 在 ES6 中，你还可以使用 `const` 关键字声明变量。

`const` 具有 `let` 的所有出色功能，另外还有一个额外的好处，即使用 `const` 声明的变量是只读的。 它们是一个常量值，这意味着一旦一个变量被赋值为 `const`，它就不能被重新赋值：

```js
const FAV_PET = "Cats";
FAV_PET = "Dogs";
```

由于重新分配 `FAV_PET` 的值，控制台将显示错误。

- 你应该始终使用 `const` 关键字命名不想重新分配的变量。 这有助于避免给一个常量进行额外的再次赋值。
- `const`的特性也意味着我们不能声明空的`const`变量
- `const`声明的只有原始值primitive value不可更改，但是数组不是原始值，所以我们可以更改
```js
const friends = ['jay', 'alen', 'steven']
cosole.log(friends) //(3)['jay', 'alen', 'steven']

friend[2] = 'bob'
cosole.log(friends) //(3)['jay', 'alen', 'bob']
```

- 我们可以改变数组，即使他们是用const声明的。但我们不可以替换整个数组，比如：
```js
const friends = ['jay', 'alen', 'steven']
friends = ['bob', 'allen'] //会报错
```



**注意：** 通常，开发者会用大写字母作为常量标识符，用小写字母或者==驼峰命名==作为变量（对象或数组）标识符。 你将在后面的挑战中了解有关对象、数组以及不可变和可变值的更多信息。 同样在后面的挑战中，你将看到大写、小写或驼峰式变量标识符的示例。

### 声明多个变量

```js
var age = 18,
    address = 'where',
	gz = 2000;
```

### 声明变量的特殊情况
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220817171503.png)


## 数字递增

使用 `++`，我们可以很容易地对变量进行自增或者 +1 运算。

```js
i++;
```

等效于：

```js
i = i + 1;
```

**注意：**`i++;` 这种写法省去了书写等号的必要。

## 通过索引修改数组中的数据

与字符串不同，数组的条目是 可变的 并且可以自由更改，即使数组是用 `const` 声明的。

**示例**

```js
const ourArray = [50, 40, 30];
ourArray[0] = 15;
```

`ourArray` 值为 `[15, 40, 30]`。

**注意：** 数组名与方括号之间不应该有任何空格，比如 `array [0]` 。 尽管 JavaScript 能够正确处理这种情况，但是当其他程序员阅读你写的代码时，这可能让他们感到困惑。

## 运算符
最基本的运算符是相等运算符：`==`。  
值得注意的是相等运算符不同于赋值运算符（`=`），赋值运算符是把等号右边的值赋给左边的变量。
严格相等运算符（`===`）是相对相等操作符（`==`）的另一种比较操作符。 与相等操作符转换数据两类型不同，严格相等运算符不会做**类型转换**。
- 加减乘除。
- 平方`console.log(2 ** 3)`2的三次方。

## 类型转换

```js
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
```

- NaN：not a number实际上是invalid number

```js
console.log(typeof NaN) // number
```

只能转换String、Number、Booleans

右一个String和plus加号，再加Number数字，会显示为字符串
```js
let n = '1' + 1; // String'11'
n = n - 1; // '11' - 1;
console.log(n); // 10
```

## Truthy and Falsy Values
5个错误的值（falsy values）：`0, '', undefined, null, NaN`
他们不完全是错误的，单再转化为布尔值时会变为`false`
任何非零数字或任何非零字符串会被转化为true
```js
console.log(Boolean(0))
```

## Switch case break
如果省略break关键字，就会导致执行完当前case后，继续执行下一个case。

## 条件运算符 condition operator
变相的if/else，写在同一行上
```js
const age = 23;
age >= 18 ? console.log('Adult') : console.log('not adult')
```
三元运算符
```js
const age = 23;
const drink = age >= 18 ? 'Wine' : 'Water';
console.log('drink')
```


## P27/027 Statements and Expression
表达式与声明
```js
1 + 3 // E
const A = 13; // S
if (A>B) {
console.log('A>B')
} // S
```
js expects an expression, not a statement.

