import React, { Component } from 'react';

/**
 * 类组件方式传参.
 *
 * @export
 * @class HelloWordProps
 * @extends {React.Component}
 */
export class HelloWordProps extends React.Component {
  render() {
    return (
      <h1>Hello Word {this.props.hello}-{this.props.expressProps}</h1>
    )
  }
}

/**
 * 函数是组件方式传参.
 *
 * @export
 * @param {*} props
 * @returns
 */
export function HelloWordPropsFn(props) {
  return (
    <h1>Hello Word {props.hello}-{props.expressProps}</h1>
  )
}