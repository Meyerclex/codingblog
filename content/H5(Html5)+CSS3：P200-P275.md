## 学成在线案例
### 导航栏
1. 实际开发中我们不会直接使用链接a，而是使用li包含链接（li+a）的做法。
	1. li+a语义更加清晰，一看就是有条理的列表型内容
	2. 如果直接使用a，搜索引擎容易识别为有堆砌关键字嫌疑，从而影响网站排名
	3. B站的导航栏就是用li+a实现的![](https://raw.githubusercontent.com/Meyerclex/image/main/20220810131838.png)
2. 让nav中的连接横向显示
	1. 让nav中的li向左浮动
	2. 让inline的a显示为block/inline-block，成为一个盒子
	3. a链接字数不一样多所以不方便给宽，所以可以用padding

### Banner
**只有当`li`设定了宽度，设定padding值时才会撑开盒子**

## 图片垂直居中
```
.user img {
    vertical-align:middle;
    margin-right: 10px;
}
```

## 定位
1. Static 静态定位 默认
2. 相对定位relative
   1. `{position: relative;}`
   2. 相对定位是元素在移动位置的时候，相对于它原来的位置
   3. 原来在标准流占有的位置继续占有，后面的盒子仍然以标准流方式来对待它。不脱标，继续保留原来位置。
3. 绝对定位 absolute
   1. `position: absolute;`
   2. 相对于它的祖先元素而言的。
   3. 如果没有祖先元素或者祖先元素没有定位，则以浏览器为准定位（Document文档）。
   4. 只要祖先元素有定位（绝对、相对、固定）则以**最近一级的**有定位的祖先元素为参考点移动位置。
   5. 脱标，不再占有原来的位置。
4. fixed 固定定位
	1. 它是一种特殊的绝对（`absolute`）定位，将元素相对于浏览器窗口定位。 类似于绝对位置，它与 CSS 偏移属性一起使用，并且也会将元素从当前的文档流里面移除。 其它元素会忽略它的存在，这样也许需要调整其他位置的布局。
	2. 但 `fixed` 和 `absolute` 的最明显的区别在于，前者定位的元素不会随着屏幕滚动而移动。
	3. 不会占有位置。
	4. 还可以跟版心右侧位置。
		1. 让固定盒子`left: 50%;`走到中间位置，让`margin-left: 版心宽度的一半距离`。
5. sticky 粘性定位
	1. 以浏览器的可视窗口为参照点移动元素
	2. 占有原先位置
	3. 必须添加top left right bottom任意一个才能起效果，如果top为0.则意味着页面滚动到定位`top: 0;`时停止
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220814205928.png)

### 子绝父相的由来
子级是绝对定位的话，父级要用相对定位。
1. 子级绝对定位，不会占有位置，可以放到父盒子重任何一个地方，不会影响其他的兄弟盒子。（浮动只会影响后面的盒子）
2. 父盒子一定要加定位，限制子盒子。

## 定位叠放次序 z-index
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220815140427.png)
只有定位的盒子才有z-index属性
### 定位的拓展
1. 绝对定位的盒子居中
	1. 加了绝对定位的盒子不能通过`margin: auto;`来水平居中，但可以通过一下计算方法实现水平和垂直居中。
		1. 父容器的50%。此时会偏一个宽度。
		2. margin负值往左边走，自己盒子的一半。
2. 行内元素添加绝对或固定定位，可以直接设置高度和宽度
3. 块级元素添加绝对或者固定定位，如果不给宽度或者高度，默认大小是内容的大小
4. 脱标的盒子不会触发外边距塌陷

#### 绝对定位（固定定位）会完全压住盒子
- 浮动float脱标会压住下方标准流的盒子，但不会压住文字，因为是用来做环绕文字的。
- 绝对定位会压住标准流的所有内容

## 元素的显示与隐藏
让一个元素在页面中隐藏或者显示出来
1. display 显示隐藏
2. visibility 显示隐藏
3. overflow 溢出显示隐藏
### display属性（重要）
1. `display: none;`隐藏对象，==隐藏之后位置不保留==
2. `display: block;`除了转换为块级元素以外，同时还有显示元素的意思
### visibility 可见性
1. `visibility: visible;`元素可视
2. `visibility: hidden;`元素隐藏，隐藏后==继续占有原来的位置==
### overflow 溢出
overflow属性指定了如果内容溢出一个元素的框（超过其指定高度及宽度）时会发生什么
1. visible 不见且内容也不添加滚动条，默认值。
2. hidden 不显示超过对象尺寸的内容。把多出来的部分隐藏。
3. scroll 溢出的部分显示滚动条（不超出也增加滚动条，且是上下滚动和左右滚动条）
4. auto 在需要的时候增加滚动条
有定位的盒子慎用`overflow: hidden;`会隐藏掉多余的部分，例如卡片上的hot/new标签

## 精灵图
主要借助`background-position`、`background-image`实现，一般精灵图都是负值。
使用同一张精灵图的多个图片，可以简化代码将所引用的bgi放到同一个class里，然后只设定`background-position`。
## iconfont字体图标
展示的是图标，本质上是字体。
### 字体图标的优点：
1. 轻量级：一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了服务器的请求。
2. 灵活性：本质上是文字，可以随意改变颜色、产生阴影、透明效果、旋转etc
3. 兼容性：几乎支持所有的浏览器。
结构简单：字体图标
结构复杂的小图片：精灵图
### 字体图标的下载
[iconmoon](http://iconmoon.io)
[阿里 iconfont字体库](http://iconfont.cn)
### 字体图标的引入
把fonts文件夹放在网站根目录
```css
@font-face {
font-family: 'icomoon';
src: url('');
src: url('') format('');
font-weight: normal;
font-style: normal;
font-display: block;
}
```
下载下来的字体图标安装包会有css？
把方框复制过来之后，去把font-family设置为下载下来的。

## 三角的做法
![|300](https://raw.githubusercontent.com/Meyerclex/image/main/20220815225604.png) ![](https://raw.githubusercontent.com/Meyerclex/image/main/20220815225635.png)
给一个没有大小的盒子指定边框，每一个边框本质都是三角形。将其他边框设置为透明。
![|300](https://raw.githubusercontent.com/Meyerclex/image/main/20220815225810.png)
![|300](https://raw.githubusercontent.com/Meyerclex/image/main/20220815225914.png)
绝对定位把三角固定在盒子上，子绝父相。
（行高和font-size是为了兼容不同浏览器）

## 鼠标样式 cursor
`li {cursor: pointer;}`
default: 小白默认
pointer: 小手
move: 移动
text: 文本
not-allowed: 禁止

## 表单轮廓线 outline
给表单添加`outline: 0;/outline: none;`可以去掉默认的蓝色边框。

## 防止拖拽文本域 resize
`resize: none;` 取消显示文本域`<textarea></textarea>`的右下角拖动调整大小的边角。
## vertical-align 属性应用
- CSS的`vertical-align`属性使用场景：经常用于设置图片或者表单（行内块元素）和文字垂直对齐。
- 官方介绍：用于设置一个元素的垂直对齐方式，但是它只针对于==行内元素或者行内块元素==有效。
![|500](https://raw.githubusercontent.com/Meyerclex/image/main/20220815234141.png)
 ![|250](https://raw.githubusercontent.com/Meyerclex/image/main/20220815234740.png)
 图片img加了vertical-align: middle的居中效果
如果图片是background-image，要先转为display: inline-block;在加上垂直居中。
### 解决图片底部默认空白缝隙问题
出现原因：行内块元素默认是和文字基线对齐的
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220815235414.png)
解决方案：
1. 给图片添加`vertical-align: top/middle/bottom;`等（提倡使用的）。
2. 把图片转换为块级元素：`display: block;`
### 溢出的文字省略号显示
1. 单行文本
![|400](https://raw.githubusercontent.com/Meyerclex/image/main/20220816000241.png)
2. 多行文本
有较大的兼容性问题，适合于webKit浏览器或者移动端（移动端大部分是webKit内核）
![|400](https://raw.githubusercontent.com/Meyerclex/image/main/20220816000723.png)
然后设置宽高遮住多出的行数？
更推荐让后台人员来做这个效果。

## margin的负值运用
两个盒子都有边框，相邻的边框会变成2px
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816001305.png)
- 可以把右边的盒子设置为margin: -1px; 让右边盒子往左移动1像素，压住左边的盒子
- 如果想要hover边框变色的效果，提高当前盒子的层级，加relative定位，相对定位会压住其他的标准流（保留原来的位置），使得被压住的那一边上来。
	- 如果已经有定位了，则使用z-index提高层级
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816002349.png)

## 常见的布局技巧
1. 文字围绕浮动元素
文字不会压住浮动元素
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816003030.png)

3. 三角强化
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816003902.png)
蓝色三角如何画出？
同样是没有宽高，设置四边边框，底部边框为0，加高上边框。transparent隐藏上边框。
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816004138.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816004157.png)
代码简化：
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816004506.png)
三角可以用i标签

## CSS初始化
不同浏览器对有些标签的默认值不同，为消除不同浏览器对HTML文本呈现的差异，照顾浏览器的兼容，我们需要对CSS初始化。
简单理解：CSS初始化是指重设浏览器的样式。也成为CSS reset
每个网页都必须首先进行CSS初始化

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816011154.png)
### unicode编码字体
把中文字体的名称用相应的unicode编码来代替，这样就可以有效地避免浏览器解释css代码时出现乱码的问题。
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220816011638.png)
