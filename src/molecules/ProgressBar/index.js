// @flow
import React, { PureComponent } from 'react';
import raf from 'raf-schd';
import { Wrapper, Bar, Progress } from './components';
import { clamp } from '../../utils';

type Props = {
  show: boolean,
  trickleSpeed: number,
  delay: number,
  width: string,
};

type State = {
  awaitDelay: boolean,
  progress: number,
};

const getNextStep = (progress: number): number => {
  let add = 0;
  if (progress < 0.2) add = 0.1;
  else if (progress < 0.5) add = 0.03;
  else if (progress < 0.8) add = 0.01;
  else if (progress < 0.99) add = 0.005;

  return clamp(0, 0.995, progress + add);
};

class ProgressBar extends PureComponent<Props, State> {
  static defaultProps = {
    trickleSpeed: 200,
    delay: 200,
    width: '75%',
  };

  interval: ?number;
  timeout: ?number;

  state = {
    awaitDelay: true,
    progress: 0,
  };

  componentDidMount() {
    this.startAfterDelay();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.show !== prevProps.show) {
      this.startAfterDelay();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  clear = () => {
    if (this.interval) window.clearInterval(this.interval);
    if (this.timeout) window.clearTimeout(this.timeout);
  };

  startAfterDelay = () => {
    this.timeout = window.setTimeout(() => {
      this.setState(() => ({ awaitDelay: false, progress: 0 }));
      if (this.props.show) this.start();
      if (!this.props.show) this.clear();
    }, this.props.delay);
  };

  start = () => {
    const { trickleSpeed } = this.props;
    this.interval = window.setInterval(
      raf(() => {
        const { progress } = this.state;
        const nextProgress = getNextStep(progress);

        if (nextProgress === progress) {
          this.clear();
        } else {
          this.setState(() => ({ progress: nextProgress }));
        }
      }),
      trickleSpeed,
    );
  };

  render() {
    const { show, width } = this.props;
    const { progress, awaitDelay } = this.state;

    return (
      <Wrapper show={show && !awaitDelay}>
        <Bar width={width}>
          <Progress
            progress={progress}
            show={show}
            style={{ transform: `scaleX(${!show ? 1 : progress})` }}
          />
        </Bar>
      </Wrapper>
    );
  }
}

export { ProgressBar as default };
