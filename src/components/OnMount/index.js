// @flow
import { PureComponent } from 'react';

type Props = {
  onMount: () => void | Promise<void>,
};

type State = {};

class OnMount extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return null;
  }
}

export { OnMount as default };
