import React from "react";
import "./styles.css";

const ThemeContext = React.createContext('dark')

// 需要使用属性 theme 的组件.
class ThemeButton extends React.Component {

  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  // 挂载在 class 上的 contextType 属性会被重赋值为一个由 
  // React.createContext() 创建的 Context 对象。
  // 这能让你使用 this.context 来消费最近 Context 上的那个值。
  // 你可以在任何生命周期中访问到它，包括 render 函数中。
  static contextType = ThemeContext

  render() {
    return (
      <button theme={this.context}>{this.context}</button>
    )
  }
}

function Toobar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemeButton />
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
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 this.state.theme 作为当前的值传递下去。
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toobar />
        </ThemeContext.Provider>
        <p>改变主题: </p>
        <button onClick={this.onButtonClickHandler.bind(this)}>点击</button>
      </div>
    )
  }
}

export default App
