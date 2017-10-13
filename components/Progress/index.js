// @flow
import React, { Component } from 'react';
import Router from 'next/router';
import rafScheduler from 'raf-schd';
import { Container, Bar } from './components';

type State = {
  progress: number,
  inProgress: boolean,
};

const clamp = (n: number, min: number, max: number): number => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

export default class Progress extends Component<*, State> {
  state = {
    progress: 0,
    inProgress: false,
  };

  interval = null;

  componentDidMount() {
    this.onMount();
    Router.onRouteChangeStart = this.start.bind(this);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
    Router.onRouteChangeStart = null;
  }

  onMount = () => {
    this.setState(() => ({ progress: 1, inProgress: true }));
    window.setTimeout(() => this.setState(() => ({ inProgress: false })), 200);
  };

  start = () => {
    this.setState(() => ({ progress: 0 }));
    window.clearInterval(this.interval);

    const inc = rafScheduler(() => this.inc());
    this.interval = window.setInterval(() => inc(), 200);
  };

  inc = () => {
    let { progress } = this.state;
    let amount;

    if (progress > 1) {
      return;
    }

    if (progress >= 0 && progress < 0.2) amount = 0.05;
    else if (progress >= 0.2 && progress < 0.5) amount = 0.02;
    else if (progress >= 0.5 && progress < 0.8) amount = 0.01;
    else if (progress >= 0.8 && progress < 0.99) amount = 0.0025;
    else amount = 0;

    progress = clamp(progress + amount, 0, 0.994);
    this.setState(() => ({ progress, inProgress: true }));
  };

  render() {
    const { inProgress, progress } = this.state;

    return (
      <Container>
        <Bar
          style={{
            opacity: inProgress ? 1 : 0,
            transform: `scaleX(${progress})`,
          }}
        />
      </Container>
    );
  }
}
