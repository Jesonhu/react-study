import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  render() {
    renturn (
      <div>
        <h1>Hello, word!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");

function tick() {
  ReactDOM.render(
    <Clock />,
    rootElement
  )
}

setInterval(tick, 1000)
