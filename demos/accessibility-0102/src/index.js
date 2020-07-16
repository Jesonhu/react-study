import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

class CustomTextInput extends React.Component {

  render() {
    return (
      <div>
        <input 
          type="text"
          ref={this.props.inputRef}
          placeholder="请输入姓名"
        />
      </div>
    )
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.inputElement = React.createRef()
  }

  onButtonClickHandler() {
    // 设置焦点
    this.inputElement.current.focus()
  }

  render() {
    return (
      <div>
        <CustomTextInput inputRef={this.inputElement} />
        <input type="text"/>
        <button onClick={this.onButtonClickHandler.bind(this)}>将焦点设置到姓名输入框</button>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Parent />, rootElement);
