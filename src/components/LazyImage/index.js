import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios, { CancelToken } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import mitt from 'mitt';

const emitter = mitt();

const http = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, true),
});

const events = {
  IN_VIEW: 'in-view',
  OUT_OF_VIEW: 'out-out-view',
};

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) emitter.emit(events.IN_VIEW, entry);
      else emitter.emit(events.OUT_OF_VIEW, entry);
    });
  },
  {
    root: null,
    rootMargin: '100px',
    thresholds: 0,
  },
);

class LazyImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
  };

  static defaultProps = {
    onLoad: null,
    onError: null,
  };

  state = {
    src: null,
    loaded: false,
    error: null,
  };

  componentDidMount() {
    observer.observe(this.wrapper);
    emitter.on(events.IN_VIEW, this.handleIntersect);
    emitter.on(events.OUT_OF_VIEW, this.handleNonIntersect);
  }

  componentWillUnmount() {
    this.unmountListeners();
  }

  getImage = async ({ cache = true } = {}) => {
    try {
      this.cancelToken = CancelToken.source();
      const res = await http({
        method: 'get',
        url: this.props.src,
        responseType: 'blob',
        cancelToken: this.cancelToken.token,
        cache,
      });

      const src = URL.createObjectURL(res.data);
      this.setState(() => ({ src, loaded: true }));
      this.unmountListeners();

      if (this.props.onLoad != null) this.props.onLoad(res);
    } catch (err) {
      if (!axios.isCancel(err)) this.handleError(err);
    }
  };

  unmountListeners = () => {
    observer.unobserve(this.wrapper);
    emitter.off(events.IN_VIEW, this.handleIntersect);
    emitter.off(events.OUT_OF_VIEW, this.handleNonIntersect);
    if (this.cancelToken) {
      this.cancelToken.cancel('Stop listening for events');
    }
  };

  revokeObjectURL = ({ target }) => URL.revokeObjectURL(target.src);

  handleIntersect = entry => {
    if (entry.target === this.wrapper) this.getImage();
  };

  handleNonIntersect = entry => {
    if (entry.target === this.wrapper && this.cancelToken) {
      this.cancelToken.cancel('Component out of view');
    }
  };

  handleError = error => {
    this.setState(() => ({ error }));
    this.unmountListeners();
    if (this.props.onError != null) this.props.onError(error);
  };

  handleReload = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ loaded: false });
    this.getImage({ cache: false });
  };

  render() {
    const { render } = this.props;
    const { src, loaded, error } = this.state;

    return (
      <div
        ref={ref => {
          this.wrapper = ref;
        }}
      >
        {render({
          src,
          loaded,
          error,
          revokeObjectURL: this.revokeObjectURL,
          reload: this.handleReload,
        })}
      </div>
    );
  }
}

export default LazyImage;
