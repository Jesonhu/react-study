import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function FancyBorder(props) {
  return (
    <div className={'fancyBorder fancyBorder--' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="dialog__title">
        {props.title}
      </h1>
      <p className="dialog__message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: ''
    }
  }

  handleChange(e) {
    this.setState({ login: e.target.value })
  }

  handleSignUp(e) {
    alert(`Welcome aboard, ${this.state.login}!`);
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
        message="How should we refer to you?">
        <input value={this.state.login} onChange={this.handleChange.bind(this)}  />
        <button onClick={this.handleSignUp.bind(this)}>点击登录</button>
      </Dialog>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SignUpDialog />, rootElement);
