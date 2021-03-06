import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import raf from 'raf-schd';
import { Wrapper, Bar, Progress } from './components';

const ease = (t: number): number => --t * t * t + 1; // eslint-disable-line

class ProgressBar extends PureComponent {
  static propTypes = {
    done: PropTypes.bool,
    trickleSpeed: PropTypes.number,
    delay: PropTypes.number,
    width: PropTypes.string,
    background: PropTypes.string,
  };

  static defaultProps = {
    trickleSpeed: 200,
    delay: 500,
    width: '75%',
  };

  interval;

  timeout;

  state = {
    state: 'await',
    progress: 0,
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.state;
    const { done } = this.props;
    const equalStates = state === prevState.state;

    if (!equalStates && state === 'run') this.start();
    if (!equalStates && state === 'pause') this.clear();

    if (done) {
      this.clear();
      this.finalize();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  clear = () => {
    this.trickle.cancel();
    window.clearInterval(this.interval);
    window.clearTimeout(this.timeout);
  };

  initialize = () => {
    this.timeout = window.setTimeout(() => {
      this.setState(() => ({ state: 'run' }));
    }, this.props.delay);
  };

  start = () => {
    this.interval = window.setInterval(this.trickle, this.props.trickleSpeed);
  };

  trickle = raf(() => {
    const { progress } = this.state;
    const nextProgress = progress + 0.01;

    if (nextProgress > 0.95) {
      this.setState(() => ({ state: 'pause' }));
    } else {
      this.setState(() => ({ progress: nextProgress }));
    }
  });

  finalize = () => this.setState(() => ({ progress: 1 }));

  render() {
    const { done, width, background } = this.props;
    const { state, progress } = this.state;
    const scale = ease(progress);

    return (
      <Wrapper done={done}>
        {state === 'await' ? null : (
          <Bar width={width} background={background}>
            <Progress style={{ transform: `scaleX(${scale})` }} />
          </Bar>
        )}
      </Wrapper>
    );
  }
}

export { ProgressBar as default };
