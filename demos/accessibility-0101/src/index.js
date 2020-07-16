import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)

    // 创造一个 textInput DOM 元素的 ref
    this.textInut = React.createRef()
  }

  onButtonClickHandler() {
    // 使用原始的 DOM API 显式地聚焦在 text input 上
    // 注意：我们通过访问 “current” 来获得 DOM 节点
    this.textInut.current.focus()
  }

  render() {
    return (
      <div>
        <input 
          type="text"
          ref={this.textInut}
          placeholder="请输入姓名"
        />
        <input type="number" placeholder="请输入年龄" />
        <button onClick={this.onButtonClickHandler.bind(this)}>焦点设置到姓名</button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CustomTextInput />, rootElement);
