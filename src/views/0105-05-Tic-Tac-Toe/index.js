import './index.css';
import React from 'react';

// 5. 判断胜者: 我们知道4中每个棋盘点击显示的内容是由每个 `Square` 自己维持的。这样就无法知道其他棋子的情况
// 为了判断出胜者我们需要将状态提前，放到一个可以处理全部棋盘的地方.

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
  onClickHandler() {
    this.props.clickHandler();
  }
  render() {
    return (
      <button 
        className="square"
        // 我们可以使用箭头函数将this绑定为当前的上下文, 并且注意箭头函数中这个是将这个函数执行力，上面只是绑定一个函数，并未指向.
        onClick={() => this.onClickHandler()}
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
  clickHandler(i) {
    // console.log('点击了', i, this);
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    console.log(i, squares);
    this.setState({
      squares: squares
    })
  }
  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}

      // error: 这样写虽然可以获取到 Square 点击时，执行这个属性的回调，参数虽然可以获取到，
      // 但是由于是 Square 执行的，this 执行 Square
      // clickHandler={this.clickHandler}

      // 采取箭头函数的方式绑定当前的this
      // error: (i) => {} 这里的 i, 需要省略，添加后会重写回调函数中的i,
      // 实际当这个回调函数执行的时候，我们就能判断当前点击的是哪个棋子了.
      // clickHandler={(i) => this.clickHandler(i)}

      clickHandler={() => this.clickHandler(i)}
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