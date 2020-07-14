import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import App from "./App";

// # 提取组件
// @see https://react.docschina.org/docs/components-and-props.html

// 将组件拆分为更小的组件。

// 例如，参考如下 Comment 组件：

// function Comment(props) {
//   return (
//     <div className="Comment">
//       <div className="UserInfo">
//         <img className="Avatar"
//           src={props.author.avatarUrl}
//           alt={props.author.name}
//         />
//         <div className="UserInfo-name">
//           {props.author.name}
//         </div>
//       </div>
//       <div className="Comment-text">
//         {props.text}
//       </div>
//       <div className="Comment-date">
//         {formatDate(props.date)}
//       </div>
//     </div>
//   );
// }

// 分析: 这是一个评论组件，根据代码可以看出主要分为以下部分:
// 1. userInfo
// 2. comment-text
// 3. comment-data

/** 评论数据 */
const commentData = {
  author: {
    avatarUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    name: "张三"
  },
  text: "这是评论内容",
  date: new Date()
};

function Avatar(props) {
  return (
    <img
      className="comment__avatar"
      src={props.author.avatarUrl}
      alt={props.author.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="comment__userinfo">
      <Avatar author={props.author} />
      <div className="comment__user-name">{props.author.name}</div>
    </div>
  );
}

function CommentText(props) {
  return <div className="comment__text">{props.text}</div>;
}

function CommentDate(props) {
  return <div className="comment__date">{formatDate(props.date)}</div>;
}

function Comment(props) {
  return (
    <div className="comment">
      <UserInfo author={props.author} />
      <CommentText text={props.text} />
      <CommentDate date={props.date} />
    </div>
  );
}

// utils
function formatDate(date) {
  return date.toLocalDateString();
}

function App() {
  return (
    <div>
      <Comment
        author={commentData.author}
        text={commentData.text}
        date={commentData.date}
      />
    </div>
  );
}

// Tips:
// 函数式组件不仅可以使用 <首字母大写 /> 方式，还可以使用 {函数名()} 方式
// 类组件只能使用 <首字母大写的方式 /> 方式
// so 函数式组件应该用哪种方式使用呢? 除非特殊情况，否则一直采取 <首字母大写 /> 方式.

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
