# 条件渲染

https://react.docschina.org/docs/conditional-rendering.html

## 介绍

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

查看案例 [conditional-rendering-0701](https://github.com/Jesonhu/react-study/tree/master/demos/conditional-rendering-0701)

注意案例事件的绑定处理, `<Greeting onClick={this.handleLogout.bind(this)} isLoggedIn={this.state.isLoggedIn}/>`

## 元素变量

你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

查看案例 [conditional-rendering-0702](https://github.com/Jesonhu/react-study/tree/master/demos/conditional-rendering-0702)

声明一个变量并使用 if 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法。接下来，我们将介绍几种在 JSX 中内联条件渲染的方法。

## 与运算符 &&

通过花括号包裹代码，你可以[在 JSX 中嵌入任何表达式](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染。

查看案例 [conditional-rendering-0703](https://github.com/Jesonhu/react-study/tree/master/demos/conditional-rendering-0703)

之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。

因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

## 三目运算符

另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 `condition ? true : false`。

查看案例 [conditional-rendering-0704](https://github.com/Jesonhu/react-study/tree/master/demos/conditional-rendering-0704)

就像在 JavaScript 中一样，你可以根据团队的习惯来选择可读性更高的代码风格。需要注意的是，如果条件变得过于复杂，那你应该考虑如何提取组件。


## 阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。

查看案例 [conditional-rendering-0705](https://github.com/Jesonhu/react-study/tree/master/demos/conditional-rendering-0705)

在组件的 render 方法中返回 null 并不会影响组件的生命周期。例如，上面这个示例中，componentDidUpdate 依然会被调用。