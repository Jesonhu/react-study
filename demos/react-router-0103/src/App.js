import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles.css";

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </Router>
)

function Home() {
  return <h2>This is page Home</h2>
}

function About() {
  return <h2>This is page About</h2>
}

const Topics = ({ match, routes }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/topics',
    component: Topics,
    routes: [
      {
        path: '/topics/:topicId',
        component: Topic
      }
    ]
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);


export default BasicExample
