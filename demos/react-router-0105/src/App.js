import React from "react";
import { 
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import "./styles.css";

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      {window.location.href === '/' && <Redirect to="/home" />}
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </Router>
)
const homeClass = {}
homeClass.cursor = {
  curspor: 'pointer'
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pageAboutData: {
        isGoToHome: false,
        homeQueryId: 0,
      }
    }
  }

  onPageButtonClickHandler(userId) {
    this.setState({
      pageAboutData: {
        isGoToHome: true,
        homeQueryId: userId
      }
    })
  }

  render() {
    // 定向到 About 页面
    if (this.state.pageAboutData.isGoToHome) {
      return <Redirect to={`/about?id=${this.state.pageAboutData.homeQueryId}`} />
    }

    return (
      <div>
        <h2>This is page Home</h2>
        <h2>去 About 页面:</h2>
        <Link to="/about?id=123"> 方式1: 组件方式 </Link>
        <div>
         <span
          style={{...homeClass.cursor}}
          onClick={this.onPageButtonClickHandler.bind(this, 123)}>方式2: 函数式方式
          </span>
        </div>
      </div>
    )
  }
}

/**
 * 获取地址参数.
 * 
 * @params {String} url 地址
 * @example
 * const url = '#/list?pageNo=1&pageSize=10'
 * getQueryParameters(url);
 * // => { pageNo: '1', pageSize: '10' }
 */
const getQueryParameters = (url) => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

/** 获取当前地址的的query参数 */
function getNowUrlParams () {
  const url = window.location.href
  return getQueryParameters(url)
}

function About() {
  let queryId = ''
  let queryElements = ''
  const query = getNowUrlParams()
  if (query && query.id !== undefined) {
    queryId = query.id
    queryElements = <span>queryId: {queryId}</span>
  }
  return (
    <div>
      <h2>This is page About</h2>
      {queryElements}
    </div>
  )
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
    <h3>Params Id: {match.params.topicId}</h3>
  </div>
);

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/home",
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
    exact={route.exact}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);


export default BasicExample
