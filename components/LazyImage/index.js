import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filesGetThumbnail } from '../../utils/api/dropbox';

function createObserver() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      records => {
        records.forEach(record => {
          if (record.intersectionRatio <= 0) return;

          const event = new CustomEvent('image-in-view', {
            detail: { target: record.target },
          });
          document.dispatchEvent(event);
        });
      },
      { threshold: [0, 1] },
    );

    return observer;
  }

  return null;
}

const observer = createObserver();

export default class LazyImage extends Component {
  state = { inView: false, blobSrc: null };

  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    getRef: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    alt: '',
    onLoad: () => undefined,
    onError: () => undefined,
    getRef: () => undefined,
  };

  componentDidMount() {
    document.addEventListener('image-in-view', this.handleImageInView);
  }

  componentWillUnmount() {
    document.removeEventListener('image-in-view', this.handleImageInView);
    this.unobserveRef();
  }

  fetchImage = async () => {
    const { width, height } = this.ref.getBoundingClientRect();
    const { src } = this.props;
    const { data, headers } = await filesGetThumbnail({
      path: src,
      dimensions: { width, height },
    });

    const metaData = JSON.parse(headers['dropbox-api-result']);
    const blobSrc = URL.createObjectURL(data);
    this.setState(() => ({ blobSrc }));
    this.onLoad(metaData);
  };

  handleImageInView = e => {
    const { detail } = e;
    if (observer && this.ref && detail.target === this.ref) {
      this.setState(() => ({ inView: true }));
      this.fetchImage();
      this.unobserveRef();
    }
  };

  observeRef = ref => {
    if (ref && observer) {
      this.ref = ref;
      observer.observe(ref);
    }
  };

  unobserveRef = () => {
    if (observer && this.ref) {
      observer.unobserve(this.ref);
    }
  };

  onLoad = e => {
    if (this.props.onLoad) this.props.onLoad(e);
  };

  onError = e => {
    const { inView } = this.state;
    if (this.props.onError && inView) this.props.onError(e);
  };

  onRef = ref => {
    this.ref = ref;
    if (ref) this.observeRef(ref);
  };

  handleLoad = () => {
    if (this.props.getRef) this.props.getRef(this.ref);
  };

  render() {
    const { className, alt } = this.props;
    const { blobSrc } = this.state;

    return (
      <img
        src={blobSrc || ''}
        className={className}
        alt={alt}
        ref={this.onRef}
        onLoad={this.handleLoad}
      />
    );
  }
}
