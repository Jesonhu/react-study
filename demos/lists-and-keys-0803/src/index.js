import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

const numbers = [1, 2, 3, 4, 5]

function ListeItem(props) {
  return (
    <li>{props.value}</li>
  )
}

function NumberList(props) {
  const numbers = props.numbers
  const listItems = numbers.map((number, index) => (<ListeItem key={index} value={number} />))
  return (
    <ul>{listItems}</ul>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NumberList numbers={numbers} />, rootElement);
