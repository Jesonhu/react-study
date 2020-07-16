import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Clock(props) {
  renturn (
    <div>
      <h1>Hello, word!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

const rootElement = document.getElementById("root");

function tick() {
  ReactDOM.render(
    <Clock  data={new Date()} />,
    rootElement
  )
}

setInterval(tick, 1000)
