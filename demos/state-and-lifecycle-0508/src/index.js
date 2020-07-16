import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class ShowLifecycle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
    console.log('01-constructor: 构造函数')
  }

  /** 组件将要挂载时候触发的生命周期函数 */
	componentWillMount(){
		console.log('02-componentWillMount: 组件将要挂载')
  }

  componentWillReceiveProps(nextProps, p2) {
    console.log('componentWillReceiveProps: 父组件属性改变', nextProps)
    // 设置了不同的延时时间
    if (nextProps.useDelayTime !== this.props.useDelayTime) {
      this.timerId && clearInterval(this.timerId)
      const useDelayTime = nextProps.useDelayTime
      const delayTime = typeof useDelayTime === 'string' ? parseInt(useDelayTime) : useDelayTime
      this.timerId = setInterval(() => {
        this.tick()
      }, delayTime)
    }
  }

	/** 组件挂载完成时候触发的生命周期函数 */
	componentDidMount() {
    const delayTime = this.props.useDelayTime || 1000
    this.timerId = setInterval(() => {
      this.tick()
    }, delayTime)
		console.log('04-componentDidMount: 组件完成挂载')
  }

  /**
   * 组件从 DOM 中被移除
   */
  componentWillUnmount() {
    this.timerId && clearInterval(this.timerId)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }
  
  render(){
    console.log('03-render-数据渲染')
		return(
			<div>
        <h2>生命周期函数演示</h2>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h5>刷新间隔 {this.props.useDelayTime} ms</h5>
			</div>
		)
	}
}

// ShowLifecycle.getDerivedStateFromProps = (props, currentProps) => {
//   console.log('getDerivedStateFromProps: 父组件 props 改变', props, currentProps)
// }

class InputDelayTime extends React.Component {

  onInputDelayTimeChange(e) {
    this.props.onInputDelayTimeChange({ delayTime: e.target.value })
  }

  render() {
    return (
      <input type="number"
        value={this.props.delayTime}
        placeholder="请输入刷新间隔时间"
        onChange={this.onInputDelayTimeChange.bind(this)}/>
    )
  }
}

/**
 * input 可以输入延时时间
 * 按钮点击后确认使用延时时间.
 * ShowLifecycleClock 显示根据延时时间持续显示当前时间.
 */
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputDelayTime: 1000,
      useDelayTime: 1000,
    }
  }

  handleConfirmButton() {
    this.setState({
      useDelayTime: this.state.inputDelayTime
    })
  }

  handleInputDelayTimeChange(data) {
    // console.log('当前输入的时间', data)
    const { delayTime } = data
    this.setState({
      inputDelayTime: delayTime
    })
  }

  render() {
    const useDelayTime = this.state.useDelayTime
    const inputDelayTime = this.state.inputDelayTime
    return (
      <div>
        <ShowLifecycle 
          delayTime={useDelayTime}
          useDelayTime={useDelayTime}
        />
        <InputDelayTime
          delayTime={inputDelayTime}
          onInputDelayTimeChange={this.handleInputDelayTimeChange.bind(this)} />
        <button onClick={this.handleConfirmButton.bind(this)}>使用</button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
