import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

/** 
 * 温度显示组件
 */
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水沸腾了, 当前水温: {props.celsius}℃</p>
  }
  return <p>水未沸腾, 当前水温: {props.celsius}℃</p>
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: 98
    }
  }

  handleTemperatureChange(e) {
    const target = e.target
    this.setState({
      temperature: target.value
    })
  }

  render() {
    const temperature = this.state.temperature
    return (
      <fieldset>
        <legend>请输入水温</legend>
        <input 
          value={temperature} 
          type="number" 
          onChange={this.handleTemperatureChange.bind(this)} 
        />

        <BoilingVerdict celsius={this.state.temperature} />
      </fieldset>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);
