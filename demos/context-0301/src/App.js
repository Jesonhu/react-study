import React from "react";
import "./styles.css";

// 需要使用属性 theme 的组件.
function ThemeButton(props) {
  return (
    <button theme={props.theme}>{props.theme}</button>
  )
}

function Toobar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemeButton theme={props.theme} />
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isDarkTheme: true,
      theme: 'dark'
    }
  }

  onButtonClickHandler() {
    const isDarkTheme = this.state.isDarkTheme
    const nowTheme = isDarkTheme ? 'light' : 'dark'
    this.setState({
      isDarkTheme: !this.state.isDarkTheme,
      theme: nowTheme
    })
  }

  render() {
    return (
      <div>
        <Toobar theme={this.state.theme} />
        <p>改变主题: </p>
        <button onClick={this.onButtonClickHandler.bind(this)}>点击</button>
      </div>
    )
  }
}

export default App
