import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import App from "./App";

function ActionLink(props) {
  const handleClick = function(e) {
    e.preventDefault();
    console.log('props', props)
  }

  return (
    <a href="#1" onClick={handleClick}>
      Click Me
    </a>
  )
}

class Toggle extends React.Component {

  constructor() {
    super()
    this.state = {
      isToggleOn: true
    }
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    })
  }

  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick2 = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <br/>
        <button onClick={this.handleClick2}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <br/>
        <button onClick={() => this.handleClick()}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <ActionLink url="//www.baidu.com"/>
      <Toggle/>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
