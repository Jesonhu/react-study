import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import App from "./App";

// # State & 生命周期
// @see https://react.docschina.org/docs/state-and-lifecycle.html

// 在元素渲染章节中，我们只了解了一种更新 UI 界面的方法。
// 通过调用 ReactDOM.render() 来修改我们想要渲染的元素：

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

// 在本章节中，我们将学习如何封装真正可复用的 Clock 组件。
// 它将设置自己的计时器并每秒更新一次。
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  /**
   * 组件已经被渲染到 DOM 中后运行
   */
  componentDidMount() {
    // Tips: 不能使用这种用法，因为 this 指向问题.
    // this.timerId = setInterval(this.tick, 1000)
    
    // const self = this;
    // this.timerId = setInterval(function() {
    //   self.tick()
    // }, 1000)
    // 这种方式可以保证 this 指向正确，比较推荐先箭头函数方式

    const delayTime = this.props.delayTime
    this.timerId = setInterval(() => {
      this.tick()
    }, delayTime)
  }

  /**
   * 组件从 DOM 中被移除
   */
  componentWillUnmount() {
    this.timerId && clearInterval(this.timerId)
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <Clock/>
      <Clock delayTime={2000}/>
      <Clock delayTime={3000}/>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
