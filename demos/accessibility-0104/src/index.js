import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class OuterBlurExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.timeoutId = null
  }

  onOutsideClickHandler(e) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(e.target)) {
      this.setState({ isOpen: false })
    }
  }

  onButtonClickHandler() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onOptionItemFocusHandler(index, b, c, d, e) {
    this.onButtonClickHandler()
    console.log('click item index: '+ index)
  }

  // 我们在下一个时间点使用 setTimeout 关闭弹窗。
  // 这是必要的，因为失去焦点事件会在新的焦点事件前被触发，
  // 我们需要通过这个步骤确认这个元素的一个子节点
  // 是否得到了焦点
  onContainerBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // // 如果一个子节点获得了焦点，不要关闭弹窗。
  onContainerFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  // ========================================
  // 生命周期函数
  // ========================================
  /** 组件完成挂载 */
  // componentDidMount() {
  //   window.addEventListener('click', this.onOutsideClickHandler.bind(this))
  // }

  /** 组件开始销毁 */
  // componentWillUnmount() {
  //   window.removeEventListener('click', this.onOutsideClickHandler.bind(this))
  // }

  renderOptionItem() {
    const LEN = 3
    const arr = new Array(LEN).fill('');
    let items = arr.map((item, index) => {
      return (
        <li 
          className="outer-click-example__option-item" 
          key={index}
          // onFocus={this.onOptionItemFocusHandler.bind(this, index)}
        >操作{index+1}</li>
      )
    })

    return items
  }

  render() {
    return (
      <div
        className="outer-click-example"
        onBlur={this.onContainerBlurHandler.bind(this)}
        onFocus={this.onContainerFocusHandler.bind(this)}
      >
        <button
          className="outer-click-example__option-toggle-button"
          onClick={this.onButtonClickHandler.bind(this)}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >选择一项操作</button>
        {this.state.isOpen && <ul className="outer-click-example__option-list">
          {this.renderOptionItem()}
        </ul>}
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<OuterBlurExample />, rootElement);
