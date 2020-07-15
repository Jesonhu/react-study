import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

const rootElement = document.getElementById("root");

ReactDOM.render(<input value="hi" />, rootElement);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, rootElement);
}, 1000);
