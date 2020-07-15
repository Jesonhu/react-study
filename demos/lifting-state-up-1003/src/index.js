import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

// ================================================================================
// 摄氏度与华氏度之间相互转换函数
// ================================================================================
/**
 * 将华氏温度转换为摄氏度.
 */
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}

/**
 * 将摄氏温度度转换为华氏度.
 */
function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

/**
 * 处理输入框的值
 * 
 * @example
 * tryConvertTemperature('abc', toCelsius)
 * // => ''
 * 
 * @example
 * tryConvert('10.22', toFahrenheit)
 * // => '50.396'
 */
function tryConvertTemperature(temperature, covert) {
  const input = parseFloat(temperature)
  // temperature 的值无效时，函数返回空字符串
  if (Number.isNaN(input)) return ''

  const output = covert(input)
  // 保留三位小数并四舍五入
  const rounded = Math.round(output * 1000) / 1000
  // 返回数字字符串
  return rounded.toString()
}

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

  handleTemperatureChange(e) {
    const target = e.target
    const data = {
      scale: this.props.scale,
      temperature: target.value
    }
    this.props.onTemperatureChange(data)
  }

  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>请输入水温 (单位: {scaleNames[scale]})</legend>
        <input 
          value={temperature}
          onChange={this.handleTemperatureChange.bind(this)} />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '98',
      scale: 'c'
    }
  }

  handleTemperatureChange(data) {
    console.log('当前输入值', data)
    // const target = e.target
    this.setState(data)
  }

  render() {
    const temperature = this.state.temperature
    // 当前输入的温度类型: 'c': 摄氏度，'f': 华氏度
    const scale = this.state.scale
    const celsiusTemperature = scale === 'c' 
      ? temperature
      : tryConvertTemperature(temperature, toCelsius)
    const fahrenheitTemperature = scale === 'f'
      ? temperature
      : tryConvertTemperature(temperature, toFahrenheit)
    return (
      <div style={{padding: '16px'}}>
        <TemperatureInput 
          scale='c'
          temperature={celsiusTemperature}
          onTemperatureChange={this.handleTemperatureChange.bind(this)} />
        <br/>
        <TemperatureInput 
          scale='f'
          temperature={fahrenheitTemperature}
          onTemperatureChange={this.handleTemperatureChange.bind(this)} />
        <br/>
        <BoilingVerdict celsius={parseFloat(celsiusTemperature)} />
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);
