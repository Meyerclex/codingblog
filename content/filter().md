---
title: "filter()"
tags: 
- JavaScript
---
filter也是一个常用的操作，它用于把`Array`的某些元素过滤掉，然后返回剩下的元素。

和`map()`类似，`Array`的`filter()`也接收一个函数。和`map()`不同的是，`filter()`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。

例如，在一个`Array`中，删掉偶数，只保留奇数，可以这么写：

```js
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;  // 奇数true，偶数false删除
});
r; // [1, 5, 9, 15]
```

[filter - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1024327002617536)

```js
<body>
    <div id="root">
        <input type="text" v-model="keyWord">
        <ul>
            <li v-for="(p,index) of filPersons" :key="index">
                {{p.name}}-{{p.age}}-{{p.gender}}
            </li>
        </ul>
    </div>
</body>
<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el: '#root',
        data: {
            keyWord: '',
            persons: [{
                id: '001',
                name: '马冬梅',
                age: 19,
                gender: '女'
            }, {
                id: '002',
                name: '周冬雨',
                age: 20,
                gender: '女'
            }, {
                id: '003',
                name: '周杰伦',
                age: 21,
                gender: '女'
            }, {
                id: '004',
                name: '温兆伦',
                age: 22,
                gender: '男'
            }, ],
            filPersons: []
        },
        watch: {
            keyWord: {
                immediate: true,
                handler(val) {
                    this.filPersons = this.persons.filter((p) => {
                        return p.name.indexOf(val) !== -1 // 'abc'.indexOf(xxx) abc不包含xxx就显示-1, 包含则返回它在第几位
                    })
                }
            }
        }
    })
</script>
```
