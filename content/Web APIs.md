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
2. 元素`.innerText`属性：将文本内容添加/更新到任意标签位置，文本中包含的标签不会被解析（在里面写标签不会被识别）。
3. 元素`.innerHTML`属性：文本中包含的标签会被解析。
```js
    <h3>随机点名</h3>
    <div>
        抽中的选手：<span></span>
    </div>
    <script>
        let box = document.querySelector('span') // box是对象，innerText是属性
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        // 声明一个数组
        let arr = ['tim', 'rob', 'bob', 'allen', 'emily', 'joy', 'muse', 'casio', 'may']
            // 生成一个随机数，作为数组索引号
        let random = getRandom(0, arr.length - 1);
        // console.log(random)
        // document.write(arr[random])
        box.innerHTML = arr[random]
        // 为了不重复，删除名字
        // arr.splice(从哪里开始删，删几个)
        arr.splice(random, 1)
            // console.log(arr)
    </script>
```
### 设置修改元素常用属性
- 还可以通过JS设置/修改元素属性，比如通过`src`更换图片
- 最常见的属性比如：`href`、`title`、`src`等
- 语法：`对象.属性 = 值`
```js
let pic = document.querySelector('img') // 获取
pic.src = './images/1.jpg' // 修改
pic.title = 'picture'
```

### 设置修改元素样式属性
1. 通过style属性操作CSS
	1. 语法：`对象.style.样式属性 = 值`，如果属性有-连接符，需要转化为小驼峰命名法
```js
let box = document.querySelector('.box')
box.style.backgroundColor = 'red';
box.style.width = '300px'
box.style.marginTop = '50px'
```
2. 操作类名（className）操作CSS
如果修改的样式比较多，直接通过style属性修改比较繁琐，我们可以通过借助css类名的形式。
	1. 语法：`元素.className = 'active'`
	2. 由于class是关键字，所以使用className去代替
	3. className时使用新值替换旧值，如果需要添加一个类，需要保留之前的类名（`'one' → 'one active'`）
```js
<div class="one" id="two"></div>
let box = document.querySelector('.one')
box.className = 'one active'
```
3. 通过classList操作类控制CSS
为了解决className容易覆盖以前的类名，我们可以通过classList方式追加和删除类名。
```js
元素.classList.add('类名') // 在原类后面追加一个类
元素.classList.remove('类名') // 删除一个类
元素.classList.toggle('类名') // 切换一个类，如果这个类存在则删除，如果类不存在则追加
```
4. 设置修改表单元素属性
表单很多情况也需要修改属性，比如点击眼睛可以看到密码，本质是吧表单类型转换为文本框。正常的有属性有取值的跟其他的标签属性没有任何区别。
	1. 获取：DOM对象.属性名
	2. 设置：DOM对象.属性名 = 新值
```js
表单.value = 'username'
表单.type = 'password'
```
表单属性中添加就有效果、一出就没有效果，一律使用布尔值表示，如果位`true`代表添加了该属性，如果为`false`代表移除了该属性，比如：disabled、checked、selected。

```js
    <button disabled>button</button>
    <input type="checkbox" name="" id="" class="cbox" checked>
    <script>
        let btn = document.querySelector('button')
        btn.disabled = false // 让按钮启用
        //复选框
        let cbox = querySelector('.cbox')
		checkbox.checked = false
		</script>
```

## 定时器-间歇函数
- 网页中经常会需要每隔一段时间需要自动执行一段代码，不需要手动触发，例如：倒计时。要实现这种需求需要定时器函数。
- 定时器函数可以开启和关闭定时器。
- 开启定时器：`setInterval(函数, 间隔时间)`，作用是每隔一段时间调用一次函数，间隔时间单位是毫秒。
```js
function show() {
console.log('type')
}
setInterval(show, 1000) // show未加括号，加了就会立即执行，不加则谨代表这个函数
let timer1 = setInterval(show, 1000)
let timer2 = setInterval(show, 1000)
// 打印出来的结果分别为1和2，显示返回值是第几个计时器
```

返回值`intervalID`是一个非零数值，用来标识通过`setInterval()`创建的计时器，这个值可以用来作为`clearInterval()`的参数来清除对应的计时器。

```js
let 变量名 = setInterval(函数, 间隔时间)
clearInterval(变量名) // 清除定时器
```

### 倒计时效果
Task：按钮60秒后才可以使用
分析：
1. 开始先把按钮禁用disabled
2. 获取元素
3. 函数内处理逻辑
	1. 秒数开始倒减
	2. 按钮里的文字跟着一起变化
	3. 秒数为0停止计时器，里面的文字变为“同意”，最后按钮可以点击
```js
<body>
    <textarea name="" id="" cols="30" rows="10">
        用户注册协议
    </textarea>
    <br>
    <button class="btn" disabled>我已阅读用户协议(6)</button>

    <script>
        let btn = document.querySelector('.btn')
        let i = 6;
        let timer = setInterval(function clocks() {
            i--
            btn.innerHTML = `我已阅读用户协议(${i})`
            if (i === 0) {
                // 归零后清除定时器
                clearInterval(timer)
                    //开启按钮
                btn.disabled = false;
                //更改文字
                btn.innerHTML = '同意'
            }
        }, 1000)
    </script>
</body>
```

### 网页轮播图效果
Task：每隔一秒钟切换一次图片
分析：
1. 获取元素
2. 设置定时器函数
	1. 设置一个变量++
	2. 更改图片张数
	3. 更改文字信息
4. 处理图片自动复原从头播放
	1. 如果图片播放到最后一张就是第9张
	2. 则把变量重置为0
```js
    <div class="img-box">
        <img src="images/1.png" alt="" class="pic">
        <div class="tip">
            <h3 class="text">title1</h3>
        </div>
    </div>
    <script>
        let data = [{ // 数组，内容是轮播图数据
            title: 'title1',
            imgSrc: "images/1.png"
        }, {
            title: 'title2',
            imgSrc: "images/2.png"
        }]
        let pic = document.querySelector('.pic')
        let text = document.querySelector('.text')
        let i = 0 // 记录图片的张数
        setInterval(function() {
            i++
            // 修改图片的src属性和title
            pic.src = data[i].imgSrc
            text.innerHTML = data[i].title
            if (i === data.length) {
                i == -1;
                // 从第-1张开始。若从0开始，回到i++则为1，pic.src = data[1].title，将跳过第0张图
                // 三元表达式：i === data.length ? i == -1 : i
            }
        }, 1000)
    </script>
```

## 事件
- 事件是在编程时系统内发生的动作或者发生的事情，比如用户在网页上点击一个按钮。
- 事件监听：让程序检测是否有事件发生，一旦有事件触发，就立即调用一个函数做出响应，也成为注册事件。
- 语法：`addEventListener('事件', 要执行的函数)`
- 事件监听三要素：
	- 事件源：哪个DOM元素被事件触发了，要获取DOM元素
	- 事件：用什么方式触发，比如鼠标单击Click、鼠标经过mouseover等
	- 事件调用的函数：要做什么
```js
// 获取元素
let btn = document.querySelector('button');
// 事件监听（注册事件）
btn.addEventListener('click', function() {
alert('被点击了')
})
```
1. 事件类型要加引号
2. 函数时点击之后再去执行，每次点击都会执行一次

```js
    <button>Click me</button>
    <script>
        let btn = document.querySelector('button')
        btn.addEventListener('click', function() {
            alert('test')
        })
    </script>
```

### 点击关闭
Task：点击小方块后，大小方块都关闭
分析：
1. 点击的是关闭按钮
2. 关闭的是父盒子
3. 核心：利用样式的显示和隐藏完成，`display: none; / display: block;`
```js
<head>
    <style>
        div {
            position: relative;
            width: 200px;
            height: 200px;
            display: inline-block;
            background-color: aquamarine;
            margin: 40px;
        }
        
        i {
            position: absolute;
            right: -13px;
            border: 1px solid black;
            background-color: black;
            width: 10px;
            height: 10px;
        }
    </style>
</head>

<body>
    <div class="qrcode">
        <img src="" alt="">
        <i class="closebtn"></i>
    </div>
    <script>
        let closebtn = document.querySelector('.closebtn') // 事件源
        let qrcode = document.querySelector('.qrcode')
            // 事件监听
        closebtn.addEventListener('click', function() {
            qrcode.style.display = 'none';
        })
    </script>
</body>
```

### 随机点名
Task：点击按钮后随机显示一个名字，如果没有则显示禁用按钮

分析：
1. 点击的是按钮
2. 随机抽取一个名字
3. 当名字抽取完毕，则利用disabled设置为true
```js
    <div></div>
    <button>click</button>
    <script>
        let box = document.querySelector('div')
        let btn = document.querySelector('button')
            // 随机函数
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        let arr = ['tim', 'rob', 'bob', 'allen', 'emily', 'joy', 'muse', 'casio', 'may']
        btn.addEventListener('click', function() {
            let random = getRandom(0, arr.length - 1);
            box.innerHTML = arr[random] // 盒子里面的文字为数组里的名字
            arr.splice(random, 1)
                // 如果数组里面剩下最后一个，则禁用按钮
            if (arr.length === 0) {
                btn.disabled = true;
                btn.innerHTML = '已经抽完'
            }
        })
    </script>
```

### 定时器随机点名
Task：点击开始随机抽取，点击结束输出结果

分析：
1. 点击开始按钮抽取数组的一个数据放到页面中
2. 点击结束按钮删除数组当前抽取的一个数据
3. 当抽取到最后一个数据的时候两个按钮同时禁用
4. 利用定时器快速展示，停止计时器结束展示

```js
<body>
    <h3>定时器随机点名</h3>
    <div></div>
    <button class="start">Start</button>
    <button class="over">Over</button>
    <script>
        let box = document.querySelector('div')
        let btn = document.querySelectorAll('button')
        let btnstart = document.querySelector('.start')
        let btnover = document.querySelector('.over')
            // 随机函数
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        let arr = ['tim', 'rob', 'bob']
            // let声明块级作用域，想在两个块级作用域引用需要在开始声明
        let timer = 0;
        let random = 0;
        // 给开始按钮注册时间
        btnstart.addEventListener('click', function() {
                timer = setInterval(function() { // let是局部变量，外部无法使用，需要事先声明
                    random = getRandom(0, arr.length - 1) // 放在定时器内部，才能产生不同的random，random的声明要放在全局
                    box.innerHTML = arr[random]
                    if (arr.length === 1) {
                        btnstart.disabled = btnover.disabled = true;
                        btnstart.innerHTML = '抽完了'
                            // 点开始后，如果是数组最后一个人显示，则两个按钮禁用
                    }
                }, 50)
            })
            // 给结束按钮注册时间，停止计时器要放在
        btnover.addEventListener('click', function() {
            clearInterval(timer)
            arr.splice(random, 1)
        })
    </script>
</body>
```

### 事件监听版本
- DOM L0
	- `事件源.on事件 = function() {}`
- DOM L2
	- `事件源.addEventListener(事件，事件处理函数)`
- 发展史
	- DOM L0：是DOM发展的第一个版本
	- DOM L1：DOM级别1于1998年成为W3C推荐标准
	- DOM L2：使用addEventListener注册事件
	- DOM L3：DOM3级时间模块在DOM2级事件的基础上重新定义了这些事件，也添加了一些新的事件类型
### 事件类型
1. 鼠标事件
	1. `click`
	2. `mouseenter` 鼠标经过
	3. `mouseleave` 鼠标离开
2. 焦点事件：表单获得光标
	1. `focus`
	2. `blur`
	3. [[搜索框聚焦、下拉菜单案例]]
3. 键盘事件：键盘触发
	1. `keydown`键盘按下触发
	2. `keyup`键盘抬起触发
3. 文本事件：表单输入触发
	1. `input`用户输入事件
	2. [[文本域字数统计]]
	3. [[全选和取消全选]]
	4. [[加减操作]]




## DOM节点
1. DOM树里每一个内容都成为节点
	1. **元素节点**：所有的标签。（html是根节点）
	2. 属性节点：所有的属性比如`href`
	3. 文本节点：所有的文本
	4. 其他
### 节点操作
- **查找节点**
	- 父节点查找：`子元素.parentNode`，返回最近一级的节点，找不到返回为`null`
	- 子节点查找
		- `childNodes`，获得所有子节点，包括文本节点、注释节点等
		- `父元素.children`，仅获得所有元素节点，返回的还是一个伪数组
	- 兄弟关系查找:`nextElementSibling`下一个节点、`previousElementSibling`前一个节点
```js
<div clas="parent">
	<div class="son">son</div>
</div>
<script>
	let son = document.querySelector('.son')
	son.parentNode.style.display = 'none'
</script>
```
- **增加节点**
	1. 创建节点：创造出一个新的网页元素，在添加到网页内，一般先创建节点，然后插入节点
	- `document.createElement('标签名')`
	2. 追加节点
	- 要想在界面看到，还得插入到某个父元素中，插入到父元素的最后一个子元素：`父元素.appendChild(要插入的元素)`
	- 插入到父元素中某个子元素的前面：`父元素.insertBefore(要插入的元素, 在那个元素前面)`
	- 