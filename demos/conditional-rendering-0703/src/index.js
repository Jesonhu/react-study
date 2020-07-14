import React from "react";
import ReactDOM from "react-dom";

function Mailbox(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello !</h1>
      {unreadMessages.length > 0 && 
        <h2>
          你还有 {unreadMessages.length} 条信息未阅读.
        </h2>
      }
    </div>
  )
}

const messages = ['React', 'Re: React', 'Re:Re: React']

const rootElement = document.getElementById("root");
ReactDOM.render(<Mailbox unreadMessages={messages} />, rootElement);
