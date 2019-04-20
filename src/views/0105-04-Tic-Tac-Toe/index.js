import './index.css';
import React from 'react';

// 4. 点击的棋子填充 "X"

/**
 * 棋子.
 *
 * @class Square
 * @extends {React.Component}
 */
class Square extends React.Component {
  constructor() {
    super();

    // state
    this.state = {
      value: ''
    }
  }
  onClickHandler() {
    this.setState({
      value: 'X'
    })
  }
  render() {
    return (
      <button 
        className="square"
        // 这样写虽然满足事件处理函数为函数类型这一规则，但是回调中的this指向有问题.
        // onClick={this.onClickHandler}

        // 我们可以使用箭头函数将this绑定为当前的上下文, 并且注意箭头函数中这个是将这个函数执行力，上面只是绑定一个函数，并未指向.
        onClick={() => this.onClickHandler()}
      >
        {this.state.value}
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
  renderSquare(i) {
    return <Square value={i}/>;
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