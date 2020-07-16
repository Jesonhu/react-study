# 无障碍

## 背景

为什么我们需要无障碍辅助功能？

网络无障碍辅助功能（Accessibility，也被称为 a11y，因为以 A 开头，以 Y 结尾，中间一共 11 个字母）是一种可以帮助所有人获得服务的设计和创造。无障碍辅助功能是使得辅助技术正确解读网页的必要条件。

React 对于创建可访问网站有着全面的支持，而这通常是通过标准 HTML 技术实现的。


## 标准和指南

## WCAG

[网络内容无障碍指南（Web Content Accessibility Guidelines，WCAG）](https://www.w3.org/WAI/intro/wcag) 为开发无障碍网站提供了指南。

下面的 WCAG 检查表提供了一些概览：

+ [Wuhcag 提供的 WCAG 检查表（WCAG checklist from Wuhcag）](https://www.wuhcag.com/wcag-checklist/)
+ [WebAIM 提供的 WCAG 检查表（WCAG checklist from WebAIM）](https://webaim.org/standards/wcag/checklist)
+ [A11Y Project 提供的检查表（Checklist from The A11Y Project）](https://a11yproject.com/checklist.html)

## WAI-ARIA

[网络无障碍倡议 - 无障碍互联网应用（Web Accessibility Initiative - Accessible Rich Internet Applications）](https://www.w3.org/WAI/intro/aria) 文件包含了创建完全无障碍 JavaScript 部件所需要的技术。

注意：JSX 支持所有 `aria-*` HTML 属性。虽然大多数 React 的 DOM 变量和属性命名都使用 `驼峰命名`（camelCased），但 `aria-*` 应该像其在 HTML 中一样使用带连字符的命名法（也叫诸如 `hyphen-cased，kebab-case，lisp-case`)。


```js
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```


## 语义化 HTML

语义化的 HTML 是无障碍辅助功能网络应用的基础。 利用多种 HTML 元素来强化您网站中的信息通常可以使您直接获得无障碍辅助功能。

+ [MDN 的 HTML 元素参照（MDN HTML elements reference）](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

有时，语义化的 HTML 会被破坏。比如当在 JSX 中使用 `<div>` 元素来实现 React 代码功能的时候，又或是在使用列表（`<ol>， <ul>` 和 `<dl>`）和 HTML `<table>` 时。 在这种情况下，我们应该使用 [React Fragments](https://react.docschina.org/docs/fragments.html) 来组合各个组件。

举个例子

```js
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

我们知道按照 HTML 语义的标准 `dl` 直接子元素为 `dt` `dd` ，我们不能 `dl > div > dt` 中间嵌套一个元素例如 `div` 等。这时我们就需要一个不需要渲染出来的标签，但是又可以作为一个包裹元素，如果可以接收和处理 `props` 那更好了，这时 `Fragment` 组件出现了。当遇到上述的问题时，你可能就需要使用 `Fragment`。

和其他的元素一样，你可以把一系列的对象映射到一个 fragment 的数组中。

```js
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

当你不需要在 `fragment` 标签中添加任何 `prop` 且你的工具支持的时候，你可以使用 [短语法](https://react.docschina.org/docs/fragments.html#short-syntax)：

```js
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

更多信息请参见 [Fragments 文档](https://react.docschina.org/docs/fragments.html)。

## 无障碍表单

## 标记

所有的 HTML 表单控制，例如 `<input>` 和 `<textarea>` ，都需要被标注来实现无障碍辅助功能。我们需要提供屏幕朗读器以解释性标注。

以下资源向我们展示了如何写标注：

+ [W3C 向我们展示如何标注元素](https://www.w3.org/WAI/tutorials/forms/labels/)
+ [WebAIM 向我们展示如何标注元素](https://webaim.org/techniques/forms/controls)
+ [Paciello Group 解释什么是无障碍名称](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

尽管这些标准 HTML 实践可以被直接用在 React 中，例如 [label 标签](https://www.w3school.com.cn/tags/tag_label.asp) 请注意 `for` 在 `JSX` 中应该被写作 `htmlFor`：

```js
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

## 控制焦点

### 使用程序管理焦点

我们的 React 应用在运行时会持续更改 HTML DOM，有时这将会导致键盘焦点的丢失或者是被设置到了意料之外的元素上。为了修复这类问题，我们需要以编程的方式让键盘聚焦到正确的方向上。比方说，在一个弹窗被关闭的时候，重新设置键盘焦点到弹窗的打开按钮上。

MDN Web 文档关注了这个问题并向我们解释了可以如何搭建[可用键盘导航的 JavaScript 部件](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)。

我们可以用 [DOM 元素的 Refs](https://react.docschina.org/docs/refs-and-the-dom.html) 在 React 中设置焦点。

用以上技术，我们就可以在需要时于其他地方把焦点设置在这个组件上

案例 [accessibility-0101](https://github.com/Jesonhu/react-study/tree/master/demos/accessibility-0101)

有时，父组件需要把焦点设置在其子组件的一个元素上。我们可以通过在子组件上设置一个特殊的 prop 来[对父组件暴露 DOM refs](https://react.docschina.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) 从而把父组件的 ref 传向子节点的 DOM 节点。

案例 [accessibility-0102](https://github.com/Jesonhu/react-study/tree/master/demos/accessibility-0102)

当使用 `HOC` 来扩展组件时，我们建议使用 React 的 `forwardRef` 函数来向被包裹的组件[转发 ref](https://react.docschina.org/docs/forwarding-refs.html)。如果第三方的 HOC 不支持转发 ref，上面的方法仍可以作为一种备选方案。

[react-aria-modal](https://github.com/davidtheclark/react-aria-modal) 提供了一个很好的焦点管理的例子。 这是一个少有的完全无障碍的模态窗口的例子。它不仅仅把初始焦点设置在了取消按钮上（防止键盘用户意外激活成功操作）和把键盘焦点固定在了窗口之内， 关闭窗口时它也会把键盘焦点重置到打开窗口的那一个元素上。


!> **注意:**
虽然这是一个非常重要的无障碍辅助功能，但它也是一种应该谨慎使用的技术。 我们应该在受到干扰时使用它来修复键盘焦点，而不是试图预测用户想要如何使用应用程序。

## 鼠标和指针事件

确保任何可以使用鼠标和指针完成的功能也可以只通过键盘完成。只依靠指针会产生很多使键盘用户无法使用你的应用的情况。

为了说明这一点，让我们看一下由点击事件引起的破坏无障碍访问的典型示例：外部点击模式，用户可以通过点击元素以外的地方来关闭已打开的弹出框。

![](https://react.docschina.org/5523b05b22210c5a2fa0bd1f01339cb3/outerclick-with-mouse.gif)

通常实现这个功能的方法是在 window 对象中附上一个 click 事件以关闭弹窗

案例 [accessibility-0103](https://github.com/Jesonhu/react-study/tree/master/demos/accessibility-0103)

当前案例实现了点击菜单区域才进行操作，菜单以外的区域都关闭菜单的功能。另外可以参考 `事件属性` 是如何传参数的。

当用户使用指针设备，比如鼠标时，这样做没有问题。但是当只使用键盘时，因为 `window` 对象不会接收到 `click` 事件，用户将无法使用 `tab` 切换到下一个元素。这样会导致用户无法使用你应用中的一些内容，导致不完整的用户体验。

![](https://react.docschina.org/eca0ca825c8c5e2aa609cee72ef47e27/outerclick-with-keyboard.gif)

使用正确的事件触发器，比如 onBlur 和 onFocus，同样可以达成这项功能：

案例 [accessibility-0104](https://github.com/Jesonhu/react-study/tree/master/demos/accessibility-0104)


未完待续...
