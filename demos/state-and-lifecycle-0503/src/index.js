import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Clock extends React.Component {
  render() {
    renturn (
      <div>
        <h1>Hello, word!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");

function tick() {
  ReactDOM.render(
    <Clock data={new Date()} />,
    rootElement
  )
}

setInterval(tick, 1000)
