/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import ProgressBar from './index';

const Container = ({ children }: any) => (
  <div
    style={{
      position: 'relative',
      width: '50vw',
      height: '50vw',
      margin: '2rem auto',
      border: '1px solid black',
    }}
  >
    {children}
  </div>
);

class Wrapper extends Component<*, *> {
  static defaultProps = {
    delay: 500,
    duration: 3000,
  };

  state = { done: false };

  timeout: ?number;

  componentDidMount() {
    this.timeout = window.setTimeout(
      () => this.setState(() => ({ done: true })),
      this.props.duration + this.props.delay,
    );
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    const { done } = this.state;
    return (
      <Container>
        <ProgressBar done={done} delay={this.props.delay} />
      </Container>
    );
  }
}

storiesOf('molecules/ProgressBar', module)
  .add('standard', () => (
    <Container>
      <ProgressBar />
    </Container>
  ))
  .add('with finish', () => <Wrapper />)
  .add('with no delay', () => <Wrapper delay={0} />)
  .add('with long delay', () => <Wrapper delay={2000} />)
  .add('with adjusted trickleSpeed', () => (
    <Container>
      <ProgressBar trickleSpeed={1000} />
    </Container>
  ));
