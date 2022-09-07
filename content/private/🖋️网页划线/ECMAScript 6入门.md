---
doc_type: hypothesis-highlights
url: 'https://es6.ruanyifeng.com/'
---
# ECMAScript 6入门
## 📃Metadata
- Author: [es6.ruanyifeng.com]()
- Title: ECMAScript 6入门
- Reference: https://es6.ruanyifeng.com/
- Category: #source/article🗞
- Tags:
## 📒Highlights
- ES2019 提供了一个 Symbol 值的实例属性description，直接返回 Symbol 值的描述。 const sym = Symbol('foo'); sym.description // "foo"


- Tags:

- Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

- 由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

- Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。 

