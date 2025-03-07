---
title: "📗 Quartz安装笔记"
tags: 
- Random Note
---

前段时间在象上刷到[Quartz](https://github.com/jackyzha0/quartz)，算是一个支持Obsidian双链玩法的博客？点了收藏之后今天适逢周六，刚好呢又到了晚上十一点（人家的一个不干正事又不打算睡觉的时间），虽然呢也没有什么笔记要整理，但是就是看到漂亮的东西想试一试。搭建并不算难，而且很漂亮！于是来写一下笔记记录过程。

*第一步：BGM - In Motion启动！Let the hacking begin！*

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

## 你需要有些什么
1. Github账号
2. [Go](https://golang.org/doc/install) 环境(>= 1.16) 。（这个东西我都不知道我为什么会有）
3. [Hugo](https://gohugo.io/getting-started/installing/)
4. Make工具。因为我也缺少这个所以后文有关于它的安装与配置。
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
3. 在Obsidian的`设置 > 文件与链接`中打开`始终更新内部链接`，内部链接类型：`基于仓库根目录的绝对路径`。

### 安装hugo-obsidian

> 需要确保你已经安装了 [Go](https://golang.org/doc/install) (>= 1.16) 。

```
go install github.com/jackyzha0/hugo-obsidian@latest
```
如果遇到报错：
```
go install: github.com/jackyzha0/hugo-obsidian@latest: module github.com/jackyzha0/hugo-obsidian: Get "https://proxy.golang.org/github.com/jackyzha0/hugo-obsidian/@v/list": dial tcp 142.251.42.241:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
```
解决办法：
执行命令`go env -w GOPROXY=https://goproxy.cn`

### 安装Hugo
1. [Install Hugo | Hugo](https://gohugo.io/getting-started/installing/)
2. 运行命令行：
```
cd <quartz文件夹地址>
make serve
```
3. 如果此时显示`'make'不是内部或外部命令，也不是可运行的程序 或批处理文件`，那么就需要安装工具make。
4. 参照[make不是内部或外部命令，也不是可运行的程序或批处理文件解决方案](https://blog.csdn.net/qq_49641239/article/details/121517925)，逐步安装完毕并配置好PATH环境变量。
	1. 假如对安装有疑惑的话可以参考：[MinGW下载和安装教程](http://c.biancheng.net/view/8077.html)的前六步。
	2. 关于环境变量的配置，请不要仅安装在当前的用户变量中，而是安装在**系统变量**中。
	3. 确认上述步骤无误，如果此时执行命令行`make serve`仍显示`不是内部或外部命令`的话，将`MinGW\bin`下的`mingw32-make.exe`重命名为 `make.exe`。
6. 执行命令行后，博客生成成功，访问`http://localhost:1313/`本地预览。

### 发布你的页面
全程按照[Deploying Quartz to the Web](https://quartz.jzhao.xyz/notes/hosting/)操作，完全不知道原理，我至今也没真正搞懂Github分支是什么，不知道为什么我本地所作的一些修改全都安静无缝地Push到了Hugo分支里。但它就是成功了（成功了）。

我就这样静静地操作到了最后一步绑定域名。

关于子域名我是这么干的：

1. 在仓库根目录`Add file`，写一个文件名为`CNAME`且没有后缀的文件。在里面写入你要绑定的域名：`c.gregueria.icu`。
2. 然后去DNS设置里，子域名记录，记录类型为`CNAME`，`  
IP地址/目标主机：`你的GitHub用户名.github.io`。
3. 然后去`Setting > Pages > Custom domain`把你的域名写好，保存。

大功告成！

在这一步中我发现我每次更新完文件重新部署后Github Page都会显示404，需要重新自定义域名。

搜索一圈发现hexo博客也会出现这个问题，这是因为每一次部署后`CNAME`文件都会被覆盖重写（尽管我在仓库中仍然能看到我完好无损的文件）。

检索一圈后找到的解决办法是将`CNAME`文件移动到`static`文件夹中。

> 参考文章：[Hexo - CNAME文件在每次部署后就没了](https://blog.csdn.net/weixin_30696427/article/details/99023640)

### 其余的配置

在`config.toml`和`/data/config.yaml`和`/data/graphConfig.yaml`中可以修改网站基本配置。

### 其他
1. 这个分支到底是怎么回事啊。
2. 目前网站证书无效，搜了一圈教程都没能解决，现在它还是一个很不安全的网站呢。并且虽然我什么也没动但是网站时常掉线，感觉是我绑定域名那一步有些问题。
3. 看到有人的网站装修（[jzhao.xyz](https://jzhao.xyz/)）很漂亮，这个也太炫了吧？！！
4. 人家哪有那么多笔记要放啊？！！！