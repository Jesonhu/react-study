# react-router 使用

http://react-router.docschina.org/web/guides/philosophy

## Guides

### 简介

React Router 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。

为了向你说明 React Router 解决的问题，让我们先来创建一个不使用它的应用。所有文档中的示例代码都会使用 ES6/ES2015 语法和语言特性。

### 不使用 React Router

案例 [react-router-0101](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0101)

当 `URL` 的 `hash` 部分（指的是 `#` 后的部分）变化后，`<App>` 会根据 `this.state.route`来渲染不同的 `<Child>`。看起来很直接，但它很快就会变得复杂起来。

现在设想一下 `Inbox` 下面嵌套一些分别对应于不同 `URL` 的 `UI` 组件

为了让我们的 URL 解析变得更智能，我们需要编写很多代码来实现指定 URL 应该渲染哪一个嵌套的 UI 组件分支：`App -> About`, `App -> Inbox -> Messages -> Message`, `App -> Inbox -> Messages -> Stats` 等等。

### 安装

```cmd
npm install react-router-dom --save
```

http://react-router.docschina.org/web/guides/quick-start

## React 示例

### 基础用法

案例 [react-router-0102](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0102)

当前案例为 `react-router-dom` 的基础用法。全部放在 `App.js` 中使用

### Route Config

为什么先学习这种用法呢? 因为这种用法比较接近 `vue-router` 的使用了。但是又有一些区别。`Route Config` 的用法实际和基础用法差不多。只是将路由定义放在外部，然后仍然在父组件中定义( PS: vue 不是也有 `router-view` 吗?)

案例 [react-router-0103](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0103)


!!注意，当前案例有这样一个需求, 地址为 `/` 显示 `/home` 组件的内容。实现这个需求目前有两种方式

方案1:

```js
// 错误!
<Redirect to="/home" />

// 正确!
{window.location.href === '/' && <Redirect to="/home" />}
```

在根组件，当前案例是 `BasicExample` 组件中使用。这样使用后当地址为 `/` 时会定向到 `/home` 也就是输入 `/` 变成了 `/home`。注意上面有个错误写法。会导致在非 `/` 和 `/home` 刷新跳转到 `/home` 页面。目前采取了上面正确的方式解决这个问题。

方案2:

```js
<Route exact path="/" render={() => (<Home />)}/>
```

在根组件，当前案例是 `BasicExample` 组件中使用。当地址为 `/` 时会显示 `Home` 组件的内容。这里并未使用到定向路由功能。但是满足了当前需求。

## 传递参数

路由参数为路由即地址上附加的参数，路由参数大致分为两种 `params` 与 `query`.

+ params: `\user\:id` 此时 `:id` 就是 `params` 方式。例如 `\user\123` 对应的 `params.id` 为 `123`
+ query: `\user?id=123` 此时的路由参数就是 `query` 方式。`query.id` 为 `123`

`React-router` 是如何支持这两种方式的呢? 在此之前先让我们先来看看 `Vue` 路由组件是如何传参的:

### Vue 路由参数处理

方式1: 路由组件传参

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

当地址为 `/user/123` 是就可以获取到参数 `{id: 123}`。更多内容[查看 vue-router 文档](https://router.vuejs.org/zh/guide/essentials/passing-props.html#路由组件传参)


方式2: 编程式导航

```js
// 命名的路由方式，即使用 name
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /path?id=1
router.push({ path: '/path', query: { id: 1 } })
```

方式3： 声明式导航

```html
<router-link :to="{ name: 'user', params: { userId: '123' }}">
<router-link :to="{ path: '/path', query: { id: 1 } }">
```

### React-router 方式

案例 [react-router-0104](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0104)

当前案例是 `params` 方式传递参数。在路由定义位置

```js
routes: [
  {
    path: '/topics/:topicId',
    component: Topic
  }
]
```
当地址为 `/topics/*` 时例如 `/topics/123` 此时的 `match.params.topicId` 为 `123`。

另外上面采取了 `Route Config` 方式使用，等效组件方式为

```html
<Route
  path="/topics/:topicId"
  component={Topic}
/>
```

案例 [react-router-0105](https://github.com/Jesonhu/react-study/tree/master/demos/react-router-0105)

当前案例演示了 `query` 传递参数的几种方式

组件方式:

```js
<Link to="/about?id=123"> 方式1: 组件方式 </Link>
```

函数式方式:

`Home` 组件

```js
render() {
  return (
    // ... 省略一些代码
    <span
      style={{...homeClass.cursor}}
      onClick={this.onPageButtonClickHandler.bind(this, 123)}>方式2: 函数式方式
    </span>
  )
}
```

这里监听了 `span` 元素的点击事件，事件处理函数触发时传传递了参数。也可选择不传递参数，在函数内部获取并处理想要的参数。在事件处理回调中 `setData` 改变 `Home` 组件 `state` `pageAboutData` 对象的值。此时 `React` 会调用 `Home` 组件的 `render` 函数。在 `render`
函数中

```js
// 定向到 About 页面
if (this.state.pageAboutData.isGoToHome) {
  return <Redirect to={`/about?id=${this.state.pageAboutData.homeQueryId}`} />
}
```

会定向到 `About` 组件。这样就完成了跳转到 `About`组件的功能。
