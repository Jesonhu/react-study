# 入门教程 - 井字格游戏

## 背景

接下来，我们一起用 React 开发一个井字棋（tic-tac-toe）。

你可以提前预览我们要写的游戏的[最终效果](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)。如果你看不懂其中的代码，或不熟悉这些语法，别担心！接下来的教程会一步一步帮助你理解 React 及其语法。

在继续后面的教程之前，推荐你先玩一下这个井字棋。在游戏里，你会看到游戏面板的右边有一个标有序号的列表。这个列表记录了游戏中的每个步骤，并且会随着游戏的进行不断更新。

等你熟悉游戏功能，便可关掉它！我们会在一个简单的模板上开始写起。下一步就是帮做好准备工作，这样你就可以开始游戏开发了。


通过阅读代码，你可以看到我们有三个 React 组件：

+ Square: 单个棋格组件
+ Board: 棋牌组件，包含 `9个` 棋格，即 `Square` 组件
+ Game: 游戏总控组件

案例 [tic-tac-toe-game-01](https://codesandbox.io/s/react-tutorial-tic-tac-toe-game-01-wwc8v)

## 通过 props 传递数据

将数据从 Board 组件传递到 Square 组件中。

```js
renderSquare(i) {
  return <Square value={i} />;
}
```

`Board` 组件的 `renderSquare` 函数中使用 `Square` 组件，通过属性 `value` 传递值。值来源于

```js
render() {
  const status = "Next Player Is: X";

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
  );
}
```

通过 `this.renderSquare(*)` 分别传递了参数 `0-8` 给不通过的 `棋格`

案例 [tic-tac-toe-game-02](https://codesandbox.io/s/react-tutorial-tic-tac-toe-game-02-bwzgb)

刚刚成功地把一个 `prop` 从父组件 `Board` “传递” 给了子组件 `Square`。在 React 应用中，数据通过 `props` 的传递，从父组件流向子组件。

## 给组件添加交互功能

上面示例中只传递了数据，但是 `棋格` 并不能点击 `落子`。下面实现交互功能。试着让棋盘的每一个格子在点击之后能落下一颗 “X” 作为棋子
