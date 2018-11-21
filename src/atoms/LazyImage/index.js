import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Img, HiddenImage, DefaultError } from './components';
import getObserver, { emitter, events } from './observer';
import ProgressBar from '../ProgressBar';

class LazyImage extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    ratio: PropTypes.number,
    className: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    renderPlaceholder: PropTypes.func,
    renderLoading: PropTypes.func,
    renderError: PropTypes.func,
  };

  static defaultProps = {
    ratio: null,
    renderPlaceholder: () => null,
    renderLoading: () => <ProgressBar delay={0} />,
    renderError: () => <DefaultError />,
  };

  ref;

  observer;

  state = {
    state: 'not-in-view',
  };

  observer = getObserver();

  componentDidUpdate(prevProps) {
    const { src } = this.props;
    const { state } = this.state;

    if (prevProps.src !== src && state !== 'not-in-view') {
      this.setState(() => ({ state: 'loading' })); // eslint-disable-line
    }
  }

  componentWillUnmount() {
    this.teardownListeners();
  }

  setupListeners = () => {
    if (this.ref) {
      this.observer.observe(this.ref);
      emitter.on(events.IN_VIEW, this.handleIntersect);
    }
  };

  teardownListeners = () => {
    if (this.ref) {
      this.observer.unobserve(this.ref);
      emitter.off(events.IN_VIEW, this.handleIntersect);
    }
  };

  handleRef = ref => {
    if (ref) {
      this.ref = ref;
      this.setupListeners();
    }
  };

  handleIntersect = entry => {
    if (entry.target === this.ref) {
      this.setState({ state: 'loading' });
      this.teardownListeners();
    }
  };

  handleError = event => {
    const { onError } = this.props;
    this.setState(() => ({ state: 'error' }));
    if (onError) onError(event);
  };

  handleLoad = () => {
    this.setState(() => ({ state: 'loaded' }));
  };

  renderNotInView = () => {
    const { renderPlaceholder } = this.props;
    return renderPlaceholder();
  };

  renderLoading = () => {
    const { renderLoading, src } = this.props;
    return (
      <Fragment>
        {renderLoading()}
        <HiddenImage
          src={src}
          alt=""
          onLoad={this.handleLoad}
          onError={this.handleError}
          hidden
          aria-hidden
        />
      </Fragment>
    );
  };

  renderLoaded() {
    const { src, alt, className, onLoad } = this.props;
    return <Img src={src} alt={alt} className={className} onLoad={onLoad} />;
  }

  renderError = () => {
    const { renderError } = this.props;
    return renderError();
  };

  render() {
    const { ratio } = this.props;
    const { state } = this.state;

    return (
      <Container ratio={ratio} ref={this.handleRef}>
        {state === 'not-in-view' && this.renderNotInView()}
        {state === 'loading' && this.renderLoading()}
        {state === 'loaded' && this.renderLoaded()}
        {state === 'error' && this.renderError()}
      </Container>
    );
  }
}

export { LazyImage as default };
