# 状态提升

https://zh-hans.reactjs.org/docs/lifting-state-up.html

## 背景

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

案例 [lifting-state-up-1001](https://github.com/Jesonhu/react-study/tree/master/demos/lifting-state-up-1001)

组件 `Calculator` 显示水温输入框和使用 `BoilingVerdict` 组件。`BoilingVerdict` 组件处理水温超过 `100` 度
时的提示文字。当 `Calculator` 中的 `input` 输入框输入温度值，`BoilingVerdict` 会显示对应的文字。

## 添加第二个输入框

我们的新需求是，在已有`摄氏温度输入框`的基础上，我们提供`华氏度的输入框`，并保持两个输入框的数据同步。

案例 [lifting-state-up-1002](https://github.com/Jesonhu/react-study/tree/master/demos/lifting-state-up-1002)

从 `Calculator` 中拆分出一个组件 `TemperatureInput` 温度输入组件。接收属性 `scale` 值可以为 `c` `f` 分别表示
`摄氏度` 与 `摄氏度`。在当前案例中发现两个温度输入框数据是独立的。这样并不满足需求。

另外，我们也不能通过 `Calculator` 组件展示 `BoilingVerdict` 组件的渲染结果。因为 `Calculator` 组件并不知道隐藏在 `TemperatureInput` 组件中的当前温度是多少。

## 编写转换函数

<details>

<summary>点击展开</summary>

```js
// ================================================================================
// 摄氏度与华氏度之间相互转换函数
// ================================================================================
/**
 * 将华氏温度转换为摄氏度.
 */
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}

/**
 * 将摄氏温度度转换为华氏度.
 */
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

/**
 * 处理输入框的值
 * 
 * @example
 * tryConvertTemperature('abc', toCelsius)
 * // => ''
 * 
 * @example
 * tryConvert('10.22', toFahrenheit)
 * // => '50.396'
 */
function tryConvertTemperature(temperature, covert) {
  const input = parseFloat(temperature)
  // temperature 的值无效时，函数返回空字符串
  if (Number.isNaN(input)) return ''

  const output = covert(input)
  // 保留三位小数并四舍五入
  const rounded = Math.round(output * 1000) / 1000
  // 返回数字字符串
  return rounded.toString()
}
```

</details>

`toCelsius` 与 `toFahrenheit` 为摄氏度与华氏度互相转换函数。`tryConvertTemperature` 温度转换函数。


## 状态提升

到目前为止, 两个 `TemperatureInput` 组件均在各自内部的 state 中相互独立地保存着各自的数据。

然而，我们希望两个输入框内的数值彼此能够同步。当我们更新摄氏度输入框内的数值时，华氏度输入框内应当显示转换后的华氏温度，反之亦然。

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。接下来，我们将 `TemperatureInput` 组件中的 `state` 移动至 `Calculator` 组件中去。

如果 `Calculator` 组件拥有了共享的 state，它将成为两个温度输入框中当前温度的“数据源”。它能够使得两个温度输入框的数值彼此保持一致。由于两个 `TemperatureInput` 组件的 props 均来自共同的父组件 Calculator，因此两个输入框中的内容将始终保持一致。

让我们看看这是如何一步一步实现的。

首先，我们将 `TemperatureInput` 组件中的 `this.state.temperature` 替换为 `this.props.temperature`。现在，我们先假定 `this.props.temperature` 已经存在，尽管将来我们需要通过 `Calculator` 组件将其传入：

```js
render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

我们知道 [props 是只读的](https://zh-hans.reactjs.org/docs/components-and-props.html#props-are-read-only)。当 `temperature` 存在于 `TemperatureInput` 组件的 `state` 中时，组件调用 `this.setState()` 便可修改它。然而，`temperature` 是由父组件传入的 `prop`，`TemperatureInput` 组件便失去了对它的控制权。

在 `React` 中，这个问题通常是通过使用 `“受控组件”` 来解决的。与 DOM 中的 `<input>` 接受 `value` 和 `onChange` 一样，自定义的 `TemperatureInput` 组件接受 `temperature` 和 `onTemperatureChange` 这两个来自父组件 `Calculator` 的 `props`。

现在，当 `TemperatureInput` 组件想更新温度时，需调用 `this.props.onTemperatureChange` 来更新它：

```js
handleTemperatureChange(e) {
  const target = e.target
  const data = {
    scale: this.props.scale,
    temperature: target.value
  }
  this.props.onTemperatureChange(data)
}
```

!> 注意：
自定义组件中的 `temperature` 和 `onTemperatureChange` 这两个 `prop` 的命名没有任何特殊含义。我们可以给它们取其它任意的名字，例如，把它们命名为 `value` 和 `onChange` 就是一种习惯。另外 `this.props.onTemperatureChange(data)` 传递了 `temperature` 和 `scale`。与文档案例是有区别的，文档案例只传递了 `temperature`。但是组件 `Calculator` 中属性 `onTemperatureChange` 的处理函数有两个 `handleCelsiusChange` `handleFahrenheitChange`。采用不同的处理函数也是可以判断出当前改变的是哪个 `input` 的值。

案例 [lifting-state-up-1003](https://github.com/Jesonhu/react-study/tree/master/demos/lifting-state-up-1003)

现在无论你编辑哪个输入框中的内容，`Calculator` 组件中的 `this.state.temperature` 和 `this.state.scale` 均会被更新。其中一个输入框保留用户的输入并取值，另一个输入框始终基于这个值显示转换后的结果。

让我们来重新梳理一下当你对输入框内容进行编辑时会发生些什么：

+ React 调用 DOM 中 `input` 的 `onChange` 方法。在本实例中，它是 `TemperatureInput` 组件的 `handleTemperatureChange` 方法。

+ `TemperatureInput` 组件的 `handleTemperatureChange` 方法执行会调用 `this.props.onTemperatureChange(data)`, 并可传入需要的参数。`this.props.onTemperatureChange` 来自于父组件 `Calculator` 中使用 `TemperatureInput` 传递的 `props`。`<TemperatureInput onTemperatureChange={this.handleTemperatureChange.bind(this)} />`

+ 初渲染时，组件 `TemperatureInput` 中的 `props` `onTemperatureChange` 方法都与 `Calculator` 组件中的 `handleTemperatureChange` 方法相同。所以，无论输入哪个编辑框输入温度。都会调用 `Calculator` 组件中的 `handleTemperatureChange` 方法。

+ 而在 `handleTemperatureChange` 方法中。获取输入的温度值，并 `this.setState()` 改变温度。然后由 `Calculator` 由上至下传递输入的温度值。使用温度值的组件根据新温度值重新渲染改变的内容。

+ `React` 调用 `Calculator` 组件的 `render` 方法得到组件的 UI 呈现。温度转换在这时进行。两个输入框中的数值通过当前输入温度和温度单位重新计算获得。

+ `React` 使用 `Calculator` 组件提供的新 `props` 分别调用两个 `TemperatureInput` 子组件的 `render` 方法来获取子组件的 UI 呈现。

+ `React` 调用 `BoilingVerdict` 组件的 `render`方法，并将摄氏温度值以组件 `props` 方式传入。

+ React DOM 根据输入值匹配水是否沸腾，并将结果更新至 DOM。我们刚刚编辑的输入框接收其当前值，另一个输入框内容更新为转换后的温度值。

得益于每次的更新都经历相同的步骤，两个输入框的内容才能始终保持同步。

## 学习小结

在 React 应用中，任何可变数据应当只有一个相对应的唯一 `“数据源”`。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state。

虽然提升 state 方式比双向绑定方式需要编写更多的“样板”代码，但带来的好处是，排查和隔离 bug 所需的工作量将会变少。由于“存在”于组件中的任何 state，仅有组件自己能够修改它，因此 bug 的排查范围被大大缩减了。此外，你也可以使用自定义逻辑来拒绝或转换用户的输入。

如果某些数据可以由 props 或 state 推导得出，那么它就不应该存在于 state 中。举个例子，本例中我们没有将 celsiusValue 和 fahrenheitValue 一起保存，而是仅保存了最后修改的 temperature 和它的 scale。这是因为另一个输入框的温度值始终可以通过这两个值以及组件的 render() 方法获得。这使得我们能够清除输入框内容，亦或是，在不损失用户操作的输入框内数值精度的前提下对另一个输入框内的转换数值做四舍五入的操作。

当你在 UI 中发现错误时，可以使用 React 开发者工具 来检查问题组件的 props，并且按照组件树结构逐级向上搜寻，直到定位到负责更新 state 的那个组件。这使得你能够追踪到产生 bug 的源头：

![](https://zh-hans.reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif ':class=preview_img')