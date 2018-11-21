import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import getObserver, { emitter, events } from '../../atoms/LazyImage/observer';

class IsInView extends PureComponent {
  static propTypes = {
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  observer;

  ref;

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

  getRef = ref => {
    if (ref != null) {
      this.ref = ref;
      this.setupListeners();
    }
  };

  handleInView = entry => {
    if (entry.target === this.ref) {
      this.setState({ inView: true });
      if (this.props.onEnter) this.props.onEnter();
    }
  };

  handleOutOfView = entry => {
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
