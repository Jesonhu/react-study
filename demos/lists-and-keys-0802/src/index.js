import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

const numbers = [1, 2, 3, 4, 5]

function NumberList(props) {
  const numbers = props.numbers
  const listItems = numbers.map((number, index) => (<li key={index}>{number}</li>))
  return (
    <ul>{listItems}</ul>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NumberList numbers={numbers} />, rootElement);
