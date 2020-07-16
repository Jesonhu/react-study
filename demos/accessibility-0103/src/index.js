import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleContainer = React.createRef()
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

  onOptionItemClickHandler(index, b, c, d, e) {
    this.onButtonClickHandler()
    console.log('click item index: '+ index)
  }

  // ========================================
  // 生命周期函数
  // ========================================
  /** 组件完成挂载 */
  componentDidMount() {
    window.addEventListener('click', this.onOutsideClickHandler.bind(this))
  }

  /** 组件开始销毁 */
  componentWillUnmount() {
    window.removeEventListener('click', this.onOutsideClickHandler.bind(this))
  }

  renderOptionItem() {
    const LEN = 3
    const arr = new Array(LEN).fill('');
    let items = arr.map((item, index) => {
      return (
        <li 
          className="outer-click-example__option-item" 
          key={index}
          onClick={this.onOptionItemClickHandler.bind(this, index)}
        >操作{index+1}</li>
      )
    })

    return items
  }

  render() {
    return (
      <div ref={this.toggleContainer} className="outer-click-example">
        <button
          className="outer-click-example__option-toggle-button"
          onClick={this.onButtonClickHandler.bind(this)}>选择一项操作</button>
        {this.state.isOpen && <ul className="outer-click-example__option-list">
          {this.renderOptionItem()}
        </ul>}
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<OuterClickExample />, rootElement);
