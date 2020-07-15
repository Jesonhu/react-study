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

const scaleNames = {
  /** 摄氏度标识 */
  c: 'Celsius-摄氏度',
  /** 华氏度 */
  f: 'Fahrenheit-华氏度'
};

/** 温度输入组件 */
class TemperatureInput extends React.Component {
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
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>请输入水温 (单位: {scaleNames[scale]})</legend>
        <input 
          value={temperature} 
          type="number" 
          onChange={this.handleTemperatureChange.bind(this)} />

        <BoilingVerdict celsius={this.state.temperature} />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div style={{padding: '16px'}}>
        <TemperatureInput scale='c' />
        <br/>
        <TemperatureInput scale='f' />
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);
