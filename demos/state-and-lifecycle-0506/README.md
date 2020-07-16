# State & 生命周期- 提取组件

## 背景

// @see https://react.docschina.org/docs/state-and-lifecycle.html

在元素渲染章节中，我们只了解了一种更新 UI 界面的方法。
通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素：

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

在本章节中，我们将学习如何封装真正可复用的 Clock 组件。
它将设置自己的计时器并每秒更新一次。

## 正确地使用 State

关于 setState() 你应该了解三件事：

### 不要直接修改 State

```js
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
```

`Wrong` 代码不会重新渲染组件, 应该使用 `setState()`。构造函数是唯一可以给 `this.state` 赋值的地方

### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

`wrong` 的代码可能会无法更新计数器。为什么可能，因为设计到 state 与 props 的更新顺序，如果先更新 props 就可以更新。要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 `state` 作为第一个参数，将此次更新被应用时的 `props` 做为第二个参数。上面使用了箭头函数，不过使用普通的函数也同样可以

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State 的更新会被合并

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state

例如，你的 state 包含几个独立的变量：

```js
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

然后你可以分别调用 `setState()` 来单独地更新它们：

```js
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

这里的合并是浅合并，所以 `this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`。只更新指定的属性。

## 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件会在其 `props` 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 `state`，或是 `Clock` 的 `props`，还是手动输入的：

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

<details>
<summary>点击展开</summary>

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
</details>

这里 `FormattedDate` 的 `prop` `date` 就来自于 `Clock` 的 `state` `date`


这通常会被叫做 `“自上而下”` 或是 `“单向”` 的数据流。任何的 `state` 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中 `“低于”` 它们的组件。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

为了证明每个组件都是真正独立的，我们可以创建一个渲染三个 Clock 的 App 组件：

## 生命周期函数

|生命周期方法|描述|
|--|--|
|`componentDidMount`|挂载(mount), 组件第一次被渲染到 DOM 中的时候执行|
|`componentWillUnmount`|卸载(unmount), 组件被删除的时候执行|

