import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function FancyBorder(props) {
  return (
    <div className={'fancyBorder fancyBorder--' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="dialog__title">
        {props.title}
      </h1>
      <p className="dialog__message">
        {props.message}
      </p>
    </FancyBorder>
  )
}

function WelcomeDialog() {
  return (
    <Dialog 
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
    />
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<WelcomeDialog />, rootElement);
