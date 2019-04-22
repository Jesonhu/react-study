import './index.css';
import React from 'react';

// 10-1. 时间旅行(撤销). 再次提升状态，希望顶层 Game 组件展示出一个历史步骤的列表。所有再次提升状态

/**
 * 棋子.
 *
 * @class Square
 * @extends {React.Component}
 */
class Square extends React.Component {
  constructor(props) {
    super(props);
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
 * 胜利返回胜利的对象，失败返回false.
 *
 * @param {*} square
 * @returns
 */
function calculateTicTacToeWinner(squares) {
  // 胜利的情况
  const winnerResult = [
    // 横向
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // 竖向
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // 对角
    [0, 4, 8],
    [2, 4, 6]
  ]

  let isWinning = false;
  for (let i = 0; i < winnerResult.length; i++) {
    const [a, b, c] = winnerResult[i];

    // 三个索引匹配才会胜利
    // PS: a = b, a = c, 那么 b = c;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      isWinning = squares[a];
    }
  }
  return isWinning;
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
      squares: new Array(9).fill(null),
      isTurnX: true,
      historyList: []
    }
  }
  handleClick(i) {
    // console.log('点击了', i, this);
    const squares = this.props.squares.slice();

    const isTurnX = this.props.isTurnX;

    const winnerResult = calculateTicTacToeWinner(squares);

    // PS: 本来是考虑再给Square添加一个属性，当游戏介绍或者已被填充时，这个属性值为true。
    // 当为 true时，在 Square button onclick 的回调处理函数中直接 return;
    // 但是下面这个做法更简单。由于是否可以填充都是依赖 Board state squares的。
    // 所以当上面两个条件满足的时候,就不让数据发生改变，也是一种方案.
    if (winnerResult || squares[i]) {
      return;
    }

    if (isTurnX) {
      squares[i] = 'X';
    } else {
      squares[i] = 'O';
    }
    this.setState({
      squares: squares,
      isTurnX: !isTurnX
    })
  }
  renderSquare(i) {
    return <Square
      // 使用Game 组件中的数据.
      value={this.props.squares[i]}
      // 使用Game 组件中的数据.
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    const nowTurn = this.props.isTurnX ? 'X' : 'O';
    let status = `当前玩家: ${nowTurn}`;

    const squares = this.props.squares;
    console.log('squares', squares);
    const winnerResult = calculateTicTacToeWinner(squares);

    if (winnerResult) {
      // alert('胜利的是', winnerResult);
      status = `获胜者是: ${winnerResult}`
    }

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
  constructor(props) {
    super(props);

    // state
    this.state = {
      squares: new Array(9).fill(null),
      isTurnX: true,
      /** 历史记录列表 */
      historyList: [
        {
          squares: new Array(9).fill(null)
        }
      ]
    }
  }
  handlerClickBord(i) {
    const historyList = this.state.historyList;
    // 当前的历史记录
    const currentHistory = historyList[historyList.length - 1]

    // 拷贝一份
    const currentHistorySquares = currentHistory.squares.slice();

    const squares = this.state.squares.slice();

    const isTurnX = this.state.isTurnX;

    const winnerResult = calculateTicTacToeWinner(squares);

    // PS: 本来是考虑再给Square添加一个属性，当游戏介绍或者已被填充时，这个属性值为true。
    // 当为 true时，在 Square button onclick 的回调处理函数中直接 return;
    // 但是下面这个做法更简单。由于是否可以填充都是依赖 Board state squares的。
    // 所以当上面两个条件满足的时候,就不让数据发生改变，也是一种方案.
    if (winnerResult || squares[i]) {
      return;
    }

    if (isTurnX) {
      squares[i] = 'X';
    } else {
      squares[i] = 'O';
    }
    this.setState({
      squares: squares,
      isTurnX: !isTurnX
    })
  }
  renderBoard() {
    const historyList = this.state.historyList;
    const currentSquares = historyList[historyList.length - 1].squares;
    return <Board
      squares={currentSquares}
      onClick={(i) => this.handlerClickBord(i)} 
    />
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          {this.renderBoard()}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}