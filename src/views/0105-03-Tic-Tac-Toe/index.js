import './index.css';
import React from 'react';

// 3. 添加交互功能

/**
 * 棋子.
 *
 * @class Square
 * @extends {React.Component}
 */
class Square extends React.Component {
  render() {
    return (
      <button 
        className="square"
        onClick={() => alert('click')}
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