import React, { Component } from 'react';
import './App.css';

// eslint-disable-next-line
import HelloWord from './views/0101-helloWord'
import HelloWordFn from './views/0102-function-components'
import { HelloWordProps, HelloWordPropsFn } from './views/0103-props/index';

class App extends Component {
  render() {
    const expressProps = '我是表达式属性';
    return (
      <div>
        <HelloWordProps 
          hello="类组件方式"
          expressProps={expressProps}
        />
        <HelloWordPropsFn 
          hello="函数式组件方式"
          expressProps={expressProps}
        />
      </div>
    )
  }
}

export default App;
