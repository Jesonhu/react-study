import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

function Contacts() {
  return <div className="contacts">This is Contacts</div>;
}

function Chat() {
  return <div className="chat">This is Chat</div>;
}

function SplitPane(props) {
  return (
    <div className="splite-pane">
      <div className="splite-pane__left">
        {props.left}
      </div>
      <div className="splite-pane__right">
        {props.right}
      </div>
    </div>
  )
}

function App() {
  return (
    <SplitPane 
      left={<Contacts />}
      right={<Chat />}
    />
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
