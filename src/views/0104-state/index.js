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

    // way1:
    // let oldData = this.state.seconds;
    // oldData++;
    // this.setState({
    //   seconds: oldData
    // })

    // way2:
    // this.setState(state => ({
    //   seconds: ++state.seconds
    // }));

    // way3:
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