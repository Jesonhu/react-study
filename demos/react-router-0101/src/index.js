import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function About() {
  return <h2>This is page About</h2>
}

function Inbox() {
  return <h2>This is page Inbox</h2>
}

function Home() {
  return <h2>This is page Home</h2>
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      route: window.location.hash.substr(1)
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }

  render() {
    let Child
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/inbox': Child = Inbox; break;
      default:      Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
