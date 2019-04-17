import React, { Component } from 'react';
import './App.css';

// eslint-disable-next-line
import HelloWord from './views/0101-helloWord'
import HelloWordFn from './views/0102-function-components'
import { HelloWordProps, HelloWordPropsFn } from './views/0103-props/index'
import SimpleData from './views/0104-state'

class App extends Component {
  render() {
    const expressProps = '我是表达式属性';
    return (
      <div>
        <SimpleData />
      </div>
    )
  }
}

export default App;
