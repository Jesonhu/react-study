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
    // Tips: 不能使用这种用法，因为 this 指向问题.
    // this.timerId = setInterval(this.tick, 1000)
    
    // const self = this;
    // this.timerId = setInterval(function() {
    //   self.tick()
    // }, 1000)
    // 上面这种方式可以保证 this 指向正确，但比较推荐下面箭头函数方式

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

const rootElement = document.getElementById("root");
ReactDOM.render(<Clock />, rootElement);
