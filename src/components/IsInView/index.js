// @flow
import { PureComponent } from 'react';
import type { Node } from 'react';
import getObserver, { emitter, events } from '../../atoms/LazyImage/observer';

type RenderProps = {
  inView: boolean,
  getRef: (ref: ?HTMLElement) => void,
};

type Props = {
  onEnter?: () => void | Promise<void>,
  onLeave?: () => void | Promise<void>,
  children: RenderProps => Node,
};

type State = {
  inView: boolean,
};

class IsInView extends PureComponent<Props, State> {
  observer: IntersectionObserver;

  ref: ?HTMLElement;

  state = {
    inView: false,
  };

  listening = false;

  observer = getObserver();

  componentWillUnmount() {
    this.teardownListeners();
  }

  setupListeners = () => {
    if (this.ref && !this.listening) {
      this.observer.observe(this.ref);
      emitter.on(events.IN_VIEW, this.handleInView);
      emitter.on(events.OUT_OF_VIEW, this.handleOutOfView);
      this.listening = true;
    }
  };

  teardownListeners = () => {
    if (this.ref && this.listening) {
      this.observer.unobserve(this.ref);
      emitter.off(events.IN_VIEW, this.handleInView);
      emitter.off(events.OUT_OF_VIEW, this.handleOutOfView);
      this.listening = false;
    }
  };

  getRef = (ref: ?HTMLElement) => {
    if (ref != null) {
      this.ref = ref;
      this.setupListeners();
    }
  };

  handleInView = (entry: IntersectionObserverEntry) => {
    if (entry.target === this.ref) {
      this.setState({ inView: true });
      if (this.props.onEnter) this.props.onEnter();
    }
  };

  handleOutOfView = (entry: IntersectionObserverEntry) => {
    if (entry.target === this.ref) {
      this.setState({ inView: false });
      if (this.props.onLeave) this.props.onLeave();
    }
  };

  render() {
    return this.props.children({
      inView: this.state.inView,
      getRef: this.getRef,
    });
  }
}

export { IsInView as default };
