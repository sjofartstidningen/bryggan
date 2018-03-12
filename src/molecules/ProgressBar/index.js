// @flow
import React, { PureComponent } from 'react';
import raf from 'raf-schd';
import { Wrapper, Bar, Progress } from './components';
import { clamp } from '../../utils';

type Props = {
  done?: boolean,
  trickleSpeed: number,
  delay: number,
  width: string,
};

type State = {
  state: 'await' | 'run' | 'pause' | 'finish',
  progress: number,
};

const getNextStep = (progress: number): number => {
  let add = 0;
  if (progress < 0.2) add = 0.1;
  else if (progress < 0.3) add = 0.03;
  else if (progress < 0.5) add = 0.01;
  else if (progress < 0.8) add = 0.005;

  return clamp(0, 0.995, progress + add);
};

class ProgressBar extends PureComponent<Props, State> {
  static defaultProps = {
    trickleSpeed: 200,
    delay: 500,
    width: '75%',
  };

  interval: ?number;
  timeout: ?number;

  state = {
    state: 'await',
    progress: 0,
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { done } = this.props;
    const { state } = this.state;
    const equalStates = state === prevState.state;

    if (!equalStates && state === 'run') {
      this.start();
    }

    if (!equalStates && state === 'pause') {
      this.clear();
    }

    if (done) {
      this.finalize();
      this.clear();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  clear = () => {
    if (this.interval) window.clearInterval(this.interval);
    if (this.timeout) window.clearTimeout(this.timeout);
  };

  initialize = () => {
    this.timeout = window.setTimeout(() => {
      this.setState(() => ({ state: 'run', progress: 0 }));
    }, this.props.delay);
  };

  start = () => {
    const { trickleSpeed } = this.props;
    this.interval = window.setInterval(
      raf(() => {
        const { progress } = this.state;
        const nextProgress = getNextStep(progress);

        if (nextProgress === progress) {
          this.setState(() => ({ state: 'pause' }));
        } else {
          this.setState(() => ({ progress: nextProgress }));
        }
      }),
      trickleSpeed,
    );
  };

  finalize = () => {
    this.setState(() => ({ state: 'finish' }));
  };

  render() {
    const { width } = this.props;
    const { state, progress } = this.state;
    const finalize = state === 'finish';

    return (
      <Wrapper show={!finalize}>
        {state === 'await' ? null : (
          <Bar width={width}>
            <Progress
              progress={progress}
              style={{
                transform: `scaleX(${finalize ? 1 : progress})`,
              }}
              show={!finalize}
            />
          </Bar>
        )}
      </Wrapper>
    );
  }
}

export { ProgressBar as default };
