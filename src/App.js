import React, { Component } from 'react';
import './App.css';

// eslint-disable-next-line
import HelloWord from './views/0101-helloWord'
import HelloWordFn from './views/0102-function-components'

class App extends Component {
  render() {
    return (
      <HelloWordFn />
    )
  }
}

export default App;
