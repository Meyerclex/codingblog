
## Tips

1. crtl + / 注释
2. cellpadding="10"单元格边缘和文字之间的距离，cellspacing="0"单元格与单元格之间的空隙
3. <dl>自定义列表，与<dt>（定义项目/名字）、<dd>（描述每一个项目/名字）一起使用
4. CSS内容写在head标签里加一个style标签
5. 对body进行选择，background-color整体页面的颜色，color是文字部分的颜色
6. CSS基础选择器
   1. 标签选择器
   2. 类选择器 .class，类选择器：样式点定义，结构类调用，一个或多个，开发最常用。不能用标签名字比如.div作为类名
      1. 使用多个类名用空格隔开
   3. id选择器，用井号#来定义，结构id调用，**只能调用一次，别人切勿使用。**和Class的区别类似名字和身份证，可以重名但不会有重复的身份证。ID选择器一般用于JS，CSS一般使用类选择器。
   4. 通配符选择器，星号*，选择所有标签
7. 符合属性的写法，font: font-style font-weitgh font-size/line-height font-family; 不能换顺序
8. 开发中最常用的是十六进制颜色
9. em是一个相对单位，就是当前元素（font-size）1个文字的大小，如果当前元素没有设置大小，就会按照父元素的一个文字大小
10. CSS引入方式
      1. CSS三种样式表
         1. 行内样式表（行内式）
            1. 直接在标签内写一个style属性
         2. 内部样式表（嵌入式）
            1. 可以放在HTML文档中的任何地方，但一般写在<head><style></style></head>之中
            2. 通过这种方式可以方便控制整个页面中的元素样式设置
            3. 代码结构清晰，但是并没有实现结构与样式的完全分离
         3. 外部样式表（链接式）
            1. `<link rel="stylesheet" href="styles/style.css">`



```

    <table>
        <!-- 用colgroup定义每一列的样式 -->
        <colgroup>
          <col span="2">
          <col style="background-color:#97DB9A;">
          <col style="width:112px;">
          <col style="background-color:#97DB9A;">
          <col style="background-color:#DCC48E; border:4px solid #C1437A;">
          <col span="2" style="width:42px;">
        </colgroup>
        <tr>
          <td>&nbsp;</td>
          <th>Mon</th>
          <th>Tues</th>
          <th>Wed</th>
          <th>Thurs</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
        <tr>
          <th>1st period</th>
          <td>English</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>German</td>
          <td>Dutch</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th>2nd period</th>
          <td>English</td>
          <td>English</td>
          <td>&nbsp;</td>
          <td>German</td>
          <td>Dutch</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th>3rd period</th>
          <td>&nbsp;</td>
          <td>German</td>
          <td>&nbsp;</td>
          <td>German</td>
          <td>Dutch</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th>4th period</th>
          <td>&nbsp;</td>
          <td>English</td>
          <td>&nbsp;</td>
          <td>English</td>
          <td>Dutch</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
  
```

## CSS样式

- text-decoration: none; 取消下划线

## Emmet语法
  - 想生成多个标签，div*5 + Tab
  - 父子级，兄弟关系，用+号。ul>li，div+span + Tab
  - .demo + tab
  - Shift+Alt+F 对齐代码

## CSS的复合选择器
### 后代选择器

元素1 元素2 { }

```
ul li { } 
<!-- 选择ul里面*所有*的li标签 -->
```

### 子代选择器

```
div>p {

}
<!-- 只选择最近的那个标签 -->
```

### 并集选择器

```
div ,
p
.pig li {
  color: pink;
}
<!-- 语法规范是竖着写 -->
```

### 伪类选择器

用于向某些选择器添加特殊的效果，比如给链接增加特殊效果，或选择第1个，第n个元素。

书写最大特点是用（：）表示，比如:hover、:first-child

1. 链接伪类
- a:link 选择所有未被访问的链接
- a:visited 选择所有已被访问的链接
- a:hover 选择鼠标指针位于其上的链接
- a:active 选择活动链接，鼠标按住瞬间的样式
选择伪类需要按照上述顺序设置（口诀love hate）

2. focus伪类选择器
用于选取获得焦点的表单元素
焦点就是光标，一般情况<input>类表单才能获取，因此这个选择器业主要针对于表单元素来说。

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220802001413.png)


### 选择器权重

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220805123200.png)

!important 使用：

div {
  color: pink!important;
}

- 复合选择器会有权重叠加的问题

## 文字行高 text-height

a链接用line-height

如何实现文字垂直居中

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220804221046.png)

## 背景图片位置

![](https://raw.githubusercontent.com/Meyerclex/image/main/20220804223033.png)

小的图标一般都是用background-image实现的，默认平铺，用background-repeat: no-repeat取消平铺，background-position定位



