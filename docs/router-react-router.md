# react-router 使用

http://react-router.docschina.org/web/example/basic

## 安装

```cmd
npm install react-router --save
```

## 简介

React Router 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。

为了向你说明 React Router 解决的问题，让我们先来创建一个不使用它的应用。所有文档中的示例代码都会使用 ES6/ES2015 语法和语言特性。

### 不使用 React Router

案例 [react-router-0101](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0101)

当 `URL` 的 `hash` 部分（指的是 `#` 后的部分）变化后，`<App>` 会根据 `this.state.route`来渲染不同的 `<Child>`。看起来很直接，但它很快就会变得复杂起来。

现在设想一下 `Inbox` 下面嵌套一些分别对应于不同 `URL` 的 `UI` 组件

为了让我们的 URL 解析变得更智能，我们需要编写很多代码来实现指定 URL 应该渲染哪一个嵌套的 UI 组件分支：`App -> About`, `App -> Inbox -> Messages -> Message`, `App -> Inbox -> Messages -> Stats` 等等。

## React 示例

### 基础用法

案例 [react-router-0102](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0102)

当前案例为 `react-router-dom` 的基础用法。全部放在 `App.js` 中使用

### Route Config

为什么先学习这种用法呢? 因为这种用法比较接近 `vue-router` 的使用了。但是又有一些区别。`Route Config` 的用法实际和基础用法差不多。只是将路由定义放在外部，然后仍然在父组件中定义( PS: vue 不是也有 `router-view` 吗?)

案例 [react-router-0103](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0103)