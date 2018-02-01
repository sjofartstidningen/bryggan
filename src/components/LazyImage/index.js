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

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) emitter.emit('intersect', entry);
      else emitter.emit('non-intersect', entry);
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
    emitter.on('intersect', this.handleIntersect);
    emitter.on('non-intersect', this.handleNonIntersect);
  }

  componentWillUnmount() {
    this.eventsOff();
  }

  handleIntersect = entry => {
    if (entry.target === this.wrapper) this.fetchImage();
  };

  handleNonIntersect = entry => {
    if (entry.target === this.wrapper && this.cancelToken) {
      this.cancelToken.cancel('Component out of view');
    }
  };

  handleLoaded = (src, res) => {
    this.setState(() => ({ src, loaded: true }));
    this.eventsOff();

    if (this.props.onLoad != null) this.props.onLoad(res);
  };

  handleError = error => {
    this.setState(() => ({ error }));
    this.eventsOff();
    if (this.props.onError != null) this.props.onError(error);
  };

  eventsOff = () => {
    observer.unobserve(this.wrapper);
    emitter.off('intersect', this.handleIntersect);
    emitter.off('non-intersect', this.handleNonIntersect);
    if (this.cancelToken) {
      this.cancelToken.cancel('Stop listening for events');
    }
  };

  fetchImage = async () => {
    try {
      this.cancelToken = CancelToken.source();
      const res = await http({
        method: 'get',
        url: this.props.src,
        responseType: 'blob',
        cancelToken: this.cancelToken.token,
      });

      const src = URL.createObjectURL(res.data);
      this.handleLoaded(src, res);
    } catch (err) {
      if (!axios.isCancel(err)) this.handleError(err);
    }
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
        {render({ src, loaded, error })}
      </div>
    );
  }
}

export default LazyImage;
