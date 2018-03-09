/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from './index';

class Wrapper extends Component<*, *> {
  static defaultProps = {
    delay: 200,
    duration: 3000,
  };

  state = { show: true };

  timeout: ?number;

  componentDidMount() {
    this.timeout = window.setTimeout(
      () => this.setState(() => ({ show: false })),
      this.props.duration + this.props.delay,
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    const { show } = this.state;
    return (
      <div
        style={{
          position: 'relative',
          width: '50vw',
          height: '50vw',
          margin: '2rem auto',
          border: '1px solid black',
        }}
      >
        <ProgressBar show={show} delay={this.props.delay} />
      </div>
    );
  }
}

storiesOf('molecules/ProgressBar', module)
  .add('standard', () => (
    <div
      style={{
        position: 'relative',
        width: '50vw',
        height: '50vw',
        margin: '2rem auto',
        border: '1px solid black',
      }}
    >
      <ProgressBar show />
    </div>
  ))
  .add('with finish', () => <Wrapper />)
  .add('with no delay', () => <Wrapper delay={0} />)
  .add('with long delay', () => <Wrapper delay={2000} />)
