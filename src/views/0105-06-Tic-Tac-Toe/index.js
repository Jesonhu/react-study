import './index.css';
import React from 'react';

// 6. 5中的代码方法命名规范化

/**
 * 棋子.
 *
 * @class Square
 * @extends {React.Component}
 */
class Square extends React.Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      value: ''
    }
  }
  handlerClick() {
    this.props.onClick();
  }
  render() {
    return (
      <button 
        className="square"
        // 我们可以使用箭头函数将this绑定为当前的上下文, 并且注意箭头函数中这个是将这个函数执行力，上面只是绑定一个函数，并未指向.
        onClick={() => this.handlerClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

/**
 * 棋盘.
 *
 * @class Board
 * @extends {React.Component}
 */
class Board extends React.Component {
  constructor() {
    super();

    // state
    this.state = {
      squares: new Array(9).fill(null)
    }
  }
  handleClick(i) {
    // console.log('点击了', i, this);
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({
      squares: squares
    })
  }
  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      // PS: 组件上的 onClick 并不是指点击事件，这和vue是有很大的区别的，vue可以在父组件中，给子组件绑定事件处理
      // 因为 DOM 元素 <button> 是一个内置组件，因此其 onClick 属性在 React 中有特殊的含义。
      // 而对于用户自定义的组件来说，命名就可以由用户自己来定义了。我们给 Square 的 onClick 和 Board 的 handleClick 赋予任意的名称，代码依旧有效。
      // 在 React 中，有一个命名规范，通常会将代表事件的的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: X';

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
}

/**
 * 游戏主入口.
 *
 * @export
 * @class Game
 * @extends {React.Component}
 */
export default class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}