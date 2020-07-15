import React from "react";
import ReactDOM from "react-dom";

// ========================================
// Greeting
// ========================================
/**
 * 已有用户登录
 */
function UserGreeting(props) {
  return (
    <h1>Welcome back!</h1>
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
    return <UserGreeting />
  }
  return <GuestGreeting />
}

// ========================================
// 登录、登出
// ========================================
/**
 * 登录按钮
 */
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      登录
    </button>
  )
}

/**
 * 退出按钮
 */
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      退出
    </button>
  )
}

/**
 * 
 * @desc 上面类是在构造函数中进行 bind, 当前案例不在构造函数总绑定，但是在组件使用进行 bind
 */
class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      /** 是否登录标记 */
      isLoggedIn: false 
    }
  }

  handleLoginClick() {
    console.log('去登录')
    this.setState({isLoggedIn: true})
  }

  handleLogoutClick() {
    console.log('登出')
    this.setState({isLoggedIn: false})
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    // let button
    // if (isLoggedIn) {
    //   button = <LogoutButton onClick={this.handleLogoutClick.bind(this)} />
    // } else {
    //   button = <LoginButton  onClick={this.handleLoginClick.bind(this)} />
    // }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick.bind(this)} />
          : <LoginButton  onClick={this.handleLoginClick.bind(this)} />
        }
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
// ReactDOM.render(<Mailbox unreadMessages={messages} />, rootElement);
ReactDOM.render(<LoginControl />, rootElement);
