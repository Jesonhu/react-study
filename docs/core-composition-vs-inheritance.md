# 组合 vs 继承

## 背景

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

在这篇文档中，我们将考虑初学 React 的开发人员使用继承时经常会遇到的一些问题，并展示如何通过组合思想来解决这些问题。

## 包含关系

有些组件无法提前知晓它们子组件的具体内容。在 `Sidebar`（侧边栏）和 `Dialog`（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。

我们建议这些组件使用一个特殊的 `children prop` 来将他们的子组件传递到渲染结果中：

```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。

```js
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

嗯...和 `Vue` `slot` 插槽使用场景一致。

![](https://jesonhu.github.io/react-study/assets/imgs/20200715163449.jpg ':class=preview_img')

报错代码
```js
function WelcomeSidebar() {
  return (
    <FancyBorder color="blue">
      <h1 className="sidebar-title">
        Welcome Sidebar
      </h1>
      <p className="sidebar-content">
        <ul>
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
        </ul>
      </p>
    </FancyBorder>
  )
}
```

修改后代码
```js
function WelcomeSidebar() {
  return (
    <FancyBorder color="blue">
      <h1 className="sidebar-title">
        Welcome Sidebar
      </h1>
      <div className="sidebar-content">
        <ul>
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
        </ul>
      </div>
    </FancyBorder>
  )
}
```

`p` 标签里嵌套 `ul` 语义确实不通。但是 dom 可以容忍这种问题。react 中就报错了，为什么一定要报错呢?

案例 [form-1101](https://github.com/Jesonhu/react-study/tree/master/demos/form-1101)

`<FancyBorder>` JSX 标签中的所有内容都会作为一个 `children prop` 传递给 FancyBorder 组件。因为 `FancyBorder` 将 `{props.children}` 渲染在一个 `<div>` 中，被传递的这些子组件最终都会出现在输出结果中。


少数情况下，你可能需要在一个组件中预留出几个 “空间”。这种情况下，我们可以不使用 `children`，而是自行约定：将所需内容传入 props，并使用相应的 prop。

案例 [form-1102](https://github.com/Jesonhu/react-study/tree/master/demos/form-1102)

`<Contacts />` 和 `<Chat />` 之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递。这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。

## 特例关系

有些时候，我们会把一些组件看作是其他组件的特殊实例，比如 `WelcomeDialog` 可以说是 `Dialog` 的特殊实例。

在 React 中，我们也可以通过组合来实现这一点。“特殊” 组件可以通过 props 定制并渲染 “一般” 组件：

案例 [form-1103](https://github.com/Jesonhu/react-study/tree/master/demos/form-1103)

组合也同样适用于以 class 形式定义的组件。

案例 [form-1104](https://github.com/Jesonhu/react-study/tree/master/demos/form-1104)

## 那么继承呢？

在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。

Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。