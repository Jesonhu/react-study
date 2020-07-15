import React from "react";
import ReactDOM from "react-dom";
import './styles.css'

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];


function Blog(props) {
  const posts = props.posts

  const sidebar = (
    <ul>
      {posts.map((post) => 
        <li key={post.id}>{post.title}</li>  
      )}
    </ul>
  )

  const content = posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  )

  return(
    <div className="blog">
      <div className="blog__sidebar">{sidebar}</div>
      <div className="blog__content">{content}</div>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Blog posts={posts} />, rootElement);
