## 创建实线
⏰Created Time：2022年8月5日
✅Origin：[使用 CSS 渐变 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Images/Using_CSS_gradients)

要在两种颜色之间创建一条硬线，即创建一个条纹而不是逐渐过渡，可以将相邻的颜色停止设置为相同的位置。在此示例中，两种颜色在 50% 标记处共享一个颜色停止点，即渐变的一半：

```css
.striped {
   background: linear-gradient(to bottom left, cyan 50%, palegoldenrod 50%);
}
```

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220805135435.png)
显示效果

用这个修改了Obsidian的各级Header背景色，比如：
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220805135533.png)

```
background: linear-gradient(to bottom, transparent 50%, pink 50%);
```

## boarder-collapse
合并表格边缘线

# 外边距Margin

## 块级盒子水平居中
1. 盒子必须指定了宽度width
2. 盒子左右外边距都设置为auto
```
width: 960px;
margin: 0 auto; 
最常见的写法，上下外边距为0，左右为auto
```
以上方法是让块级元素水平居中，行内元素或者行内块元素居中给其父级元素添加`text-align: center;`即可。这个不止让文本居中，也可以让图片等其他元素居中。

## 嵌套块元素垂直外边距的塌陷
对于两个嵌套关系（父子关系）的块元素，父元素有上外边距同时子元素也有上外边距，此时父元素会塌陷较大的外边距值。

![|500](https://raw.githubusercontent.com/Meyerclex/image/main/20220805234733.png)
- 解决方案（三选一）：
1. 为父元素定义上边框`border: 1px solid transparent;`
2. 为父元素定义上内边距`padding: 1px;`
3. 为父元素添加`overflow: hidden;`，常用方案

**浮动的盒子不会有外边距的问题**

## 清除内外边距和多余样式
网页元素很多都带有默认的内外编剧，而且不同浏览器默认的也不一致。因此布局前首先要清楚下网页元素的内外边距。
```HTML
* {
	padding: 0;
	margin: 0;
}
li {
	list-style: none;
}
```
行内元素（比如`span`）为了照顾兼容性，尽量只设置左右内外边距，不要设置上下内外边距，但是转换为块级和行内块元素就可以了。

## CSS实现图片裁剪居中（图片不变形）
为了避免变形，我们可以使用css中object-fit属性
> **`object-fit`** [CSS](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS) 属性指定[可替换元素](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FReplaced_element)的内容应该如何适应到其使用的高度和宽度确定的框。
```html
<div class="test_img">
	<img src="../assets/images/img1.jpg" alt="">
</div>
<div class="test_img">
    <img src="../assets/images/img2.jpg" alt="">
</div>
<div class="test_img">
    <img src="../assets/images/img3.jpg" alt="">
</div>
```
```css
.test_img{
  width: 200px;
  height: 100px;
  border: 1px solid #000;
  margin-top: 5px;
  img{
    width:100%;
    height: 100%;
    object-fit:cover;
  }
}
```

## 圆形
```css
.div {
	width: 200px;
	height: 200px;
	border-radius: 50%;
}
```

## 盒子阴影
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220807091038.png)
- 盒子阴影不占用空间，不影响其他盒子的排列
- 默认的是外阴影outset，但是不可以写这个单词，否则导致阴影无效

## 浮动 float
float属性用于创建浮动框，将其移动到一边，直至左边缘或右边缘触及包含块或另一个浮动框的边缘。
![效果|200](https://raw.githubusercontent.com/Meyerclex/image/main/20220807094917.png)
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220807093909.png)

- 浮动的盒子不再保留原先的位置。效果：
```css
        .float {
            float: left;
            background-color: pink;
            width: 300px;
            height: 500px;
        }

        .fix {
            background-color: cyan;
            width: 500px;
            height: 600px;
        }
```
```html
    <div class="float"></div>
    <div class="fix"></div>
```

- 浮动元素会具有行内块元素特性
	- 任何元素都可以浮动，不管原先是什么模式的元素，添加浮动之后具有行内块元素相似的特性
	- 如果块级盒子没有设置宽度，默认宽度和父级一样宽，但是添加浮动后，它的大小根据内容来决定。（p标签：**块级元素**，默认宽度占满一行。）
	- 浮动的盒子中间没有缝隙，是紧挨在一起的。
- 浮动元素经常和标准流父级搭配使用
	- 为了约束元素位置，我们网页布局一般采取的策略是：先用标准流的父元素排列上下位置，之后内部子元素采取浮动排列左右位置，符合网页布局第一准则。
- 网页布局第二准则：先设置盒子大小，之后设置盒子的位置。

## 清除浮动
父级盒子在很多情况下不方便给高度（例如卡片商品可能需要不断上新），但是子盒子浮动又不占有位置，最后父级盒子高度为0时，就会影响下面的标准流盒子。
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220809215521.png)
### 为什么要清除浮动
通常我们在写html+css的时候，如果一个父级元素内部的子元素是浮动的（float），那么常会发生父元素不能被子元素正常撑开的情况，可以看到，content这个父元素完全没有被子元素撑开（我定义content元素背景为黑色，有边框，现在只显示了一条线）；
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220811154452.png)


### 解决办法 清除浮动
1. 额外标签法
	1. 再浮动元素末尾添加一个空的标签例如`<div style="clear: both"></div>`
	2. 新增的标签必须是块级元素而不是行内元素
	3. 添加许多无意义的标签，结构化较差
2. 将其属性值设为hidden、auto或scroll
	1. 代码简洁
	2. 无法显示溢出的部分
3. `:after`伪元素法
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220809220557.png)

4. 双伪元素清除浮动

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220809220844.png)

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220811154147.png)


## CSS属性书写顺序
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220810002953.png)
