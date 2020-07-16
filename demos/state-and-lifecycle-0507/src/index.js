import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

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
    const delayTime = this.props.delayTime || 1000
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
