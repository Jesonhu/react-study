import React, { Component } from 'react';

/**
 * 简单的带有状态的组件.
 */
export default class SimpleData extends React.Component {
  constructor(props) {
    super(props);

    // data
    this.state = {
      seconds: 0
    }
  }
  tick() {
    // fail: oldData and oldData++ always be 0
    // let oldData = this.state.seconds;
    // console.log(oldData++);
    // this.setState({
    //   seconds: oldData++
    // })

    // good
    // let oldData = this.state.seconds;
    // this.setState({
    //   seconds: oldData + 1
    // });

    // fail: should be state => (...)
    // this.setState(state => {
    //   seconds: state.seconds++
    // });

    // fail: should be `state.seconds + 1`
    this.setState(state => ({
      seconds: state.seconds++
    }));

    // this.setState(state => ({
    //   seconds: ++state.seconds
    // }));

    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.tick();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <h1>seconds: {this.state.seconds}</h1>
    )
  }
}