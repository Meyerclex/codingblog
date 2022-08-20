---
title: "📗 Quartz安装笔记"
tags: 
- Random Note
---

前段时间在象上刷到[Quartz](https://github.com/jackyzha0/quartz)，算是一个支持Obsidian双链玩法的博客？点了收藏之后今天适逢周六，刚好呢又到了晚上十一点（人家的一个不干正事又不打算睡觉的时间），虽然呢也没有什么笔记要整理，但是就是看到漂亮的东西想试一试。搭建并不算难，而且很漂亮！于是来写一下笔记记录过程。

*第一步：BGM - In Motion启动！*

首先来讲一下我对Quartz的使用感受。它的框架也是基于Hugo啦，这直接降低了我的心理负担，因为算是一个很熟悉的东西。

它默认支持：
1. 搜索
2. 本地预览
3. 夜间模式
4. 文章目录（可以修改层级和目录序号的显示）
5. 支持Obsidian的双链玩法，直接打开Obsidian就写！无痛保存！
6. 最近的文章
7. 文章Tag
8. Front-Matter（这好像并不是必须的）

但是它的缺点是本身并不支持归档（Archive）的功能。于是作为归档功能的替代，在此隆重向大家介绍我用Obsidian时常用的MOC（Map of Content），算是一种整理思路。轻轻地推荐这篇最早让我了解到Map of Content的一篇文章：[Obsidian · 网课学习笔记整理 From Seviche.cc](https://seviche.cc/2022-03-07-obsidian-notes1)。

其实概括而谈MOC就是放弃用Obsidian本身的文件夹功能给笔记归类（并非必要，只是我很懒得整理），直接建立一个索引页，里面用双链功能创建文章，索引页就像归档或总目录一样，带你去任何一页笔记。

而Quartz的使用完全适配这种笔记管理思路，在Quartz中，`_index.md`文件就是博客主页，可以被任意编写，因此可以作为索引/文章目录页使用。


> 注意：我基本没有什么计算机基础，以下内容不保真！有疑问的话建议去原作者的仓库底下提Issue :D

## 那么就开始吧！
基本上只需要跟着作者的Setup一步步走下来。
1. Fork作者的仓库： [Quartz Repository](https://github.com/jackyzha0/quartz)
2. Clone仓库到本地，可以用Github Desktop也可以敲命令行：
```shell
git clone https://github.com/YOUR-USERNAME/quartz
```
于是此时你已经有了一个`quartz`文件夹了。

你所有的内容都可以在`quartz/content`中找到。里面默认有`notes`、`private`、`templates`三个文件夹，顾名思义分别存放笔记、隐私笔记（不显示）、模板文件夹。

但是你的笔记并不一定需要放在`/content/notes`中，完全可以放在`/content`下。

同时里面还有`_index.md`文件，它里面的内容直接展现为播客主页。

### Obsidian配置
1. （可选）新建一个笔记库，或者直接将你的笔记库移动到`/content`文件夹。
	1. 但假设这么做了，文件夹层级目录则为`/content/Vault`，你可以用Obsidian在里面新建、修改笔记。
	2. 那么此时就涉及一个问题，可是`_index.md`文件是放在`/content`目录中的，这意味着你在Obsidian中见不到它。
	3. 可是按照我的笔记使用逻辑，我希望博客主页(`index.md`)直接作为我的笔记索引页，放满我的笔记双链（幻想），如果它不能在Obsidian里修改，那就会很不方便。
2. 我希望一打开笔记就能修改所有东西。因此我是这么做的：直接将我的Obsidian笔记库位置放在了根目录`quartz`中，并将上述三个文件夹、一个`_index.md`剪切到了笔记库中，删掉`quartz/content`，并把笔记库重命名为`content`。
3. 此时你的`content`文件夹应该是这样的：
![](https://raw.githubusercontent.com/Meyerclex/image/main/20220821004743.png)
4. 在Obsidian的`设置 > 文件与链接`中打开`始终更新内部链接`，内部链接类型：`基于仓库根目录的绝对路径`。