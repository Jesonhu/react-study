# JSX 简介

## 背景

在 React 中的模板语法叫做 `JSX`。 该语法允许将 `HTML` 标签放在 `JavaScript` 代码中.
`ReactDOM.render()` 方法将 JSX 转换为 `HTML` 并且渲染到 DOM 元素中。

如果需要在浏览器中直接写 `React` 代码需要使用 `<script type="text/babel">` 包裹 `JSX` 代码。 并且包含浏览器版本的 babel 代码 `babel.min.js`。在 `babel-core@6` 版本中也是包含浏览器版本的.

在 `v0.14` 之前的版本。React 使用 `JSTransform.js` 处理 `<script type="text/jsx">` 的代码。但现在这种方式已被废弃。[点击可了解详情](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)

## 在 JSX 中使用 JavaScript.

在 `JSX` 语法中 `<` 包裹 `HTML` 语法部分。`{` 作为 JS 语法的开始。

## 在 JSX 中使用 JS 数组.

如果 JS 变量是一个数组类型。JSX 将自己合并数组中的每一项。注意在 `JS` 语法中下面 `arr` 的数组每项是语法是错误的。但是 `JSX` 支持这种用法。

```js
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

