import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder__'+ props.color}>
      {props.children}
    </div>
  )
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome Dialog
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}

function WelcomeSidebar() {
  return (
    <FancyBorder color="blue">
      <h1 className="sidebar-title">
        Welcome Sidebar
      </h1>
      <div className="sidebar-content">
        <ul>
          <li>menu1</li>
          <li>menu2</li>
          <li>menu3</li>
        </ul>
      </div>
    </FancyBorder>
  )
}

function App() {
  return (
    <div>
      <WelcomeSidebar />
      <WelcomeDialog />
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
