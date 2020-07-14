import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map((number, index) => (<li key={index}>{number}</li>))

function App() {
  return (
    <ul>
      {listItems}
    </ul>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
