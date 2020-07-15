# 列表 & Key

https://react.docschina.org/docs/lists-and-keys.html

## 背景

首先，让我们看下在 Javascript 中如何转化列表。

如下代码，我们使用 `map()` 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 `doubled` 并打印出来：

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出 [2, 4, 6, 8, 10]。

在 React 中，把数组转化为元素列表的过程是相似的。

## 渲染多个组件

你可以通过使用 `{}` 在 JSX 内构建一个元素集合。

[](lists-and-keys-0801)

查看案例 [lists-and-keys-0801](https://github.com/Jesonhu/react-study/tree/master/demos/lists-and-keys-0801)

## 基础列表组件

通常你需要在一个[组件](https://react.docschina.org/docs/components-and-props.html)中渲染列表

我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。

查看案例 [lists-and-keys-0802](https://github.com/Jesonhu/react-study/tree/master/demos/lists-and-keys-0802)

将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 key 属性

## key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

```js
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

如果列表项目的顺序可能会变化，我们不建议使用 `索引` 来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

要是你有兴趣了解更多的话，这里有一篇文章[深入解析为什么 key 是必须的](https://react.docschina.org/docs/reconciliation.html#recursing-on-children)可以参考。

## 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义。

比方说，如果你提取出一个 `ListItem` 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 ListItem 组件中的 `<li>` 元素上。


总结: 怎么理解上面的话呢，`key` 的作用是帮助 React 识别哪些元素改变了，提高性能。所以在循环的时候就应该指定 `key`。即上面的案例中 `ListItem` 使用组件的地方指定 `key`。因为这里是循环的地方。而组件中的 `li` 元素上已经在渲染组件了。

查看案例 [lists-and-keys-0803](https://github.com/Jesonhu/react-study/tree/master/demos/lists-and-keys-0803)

一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

## key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

查看案例 [lists-and-keys-0804](https://github.com/Jesonhu/react-study/tree/master/demos/lists-and-keys-0804)
