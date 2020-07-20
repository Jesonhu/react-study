# 组件 & Props

## 背景


在 React `v16.0` 之前的版本中使用 `React.createClass()` 来创建一个 `class` 类型的组件.

目前组件分类：

+ 函数式组件

```js
function App() {
  return (
    <h1>React is awesome!</h1>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('example')
);
```

+ class 组件

```js
class App extends React.Components() {
  constructor(props) {
    super(this)
  }

  render() {
    return (
      <h1>React is awesome!</h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('example')
);
```

需要注意的是，如果不需要 `state` 和 `事件绑定this` 构造函数 `constructor` 部分是可以省略的。甚至某些情况下如果只使用 `props` 构造函数仍然是可以省略的。React 将会自己补充构造函数的代码。
如果需要在构造函数中使用 `this` 则必须先 `super()` 这一规定遵循 `JavaScript class extend` 语法。