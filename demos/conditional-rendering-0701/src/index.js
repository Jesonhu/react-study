import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import App from "./App";

/**
 * 已有用户登录
 */
function UserGreeting(props) {
  return (
    <div>
      <h1>Welcome back!</h1>
      <button onClick={props.onClick}>Logout</button>
    </div>
  )
}

/**
 * 无用户登录
 */
function GuestGreeting(props) {
  return (
    <h1>Please sign up.</h1>
  )
}

/**
 * 欢迎组件.
 * 它会根据用户是否登录来决定显示上面的哪一个组件
 */
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting onClick={props.onClick}/>
  }
  return <GuestGreeting />
}

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true
    }
  }

  handleLogout() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render() {
    return (
      <div>
        <Greeting onClick={this.handleLogout.bind(this)} isLoggedIn={this.state.isLoggedIn}/>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NavBar />, rootElement);
