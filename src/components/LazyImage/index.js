import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { filesGetThumbnail } from '../../api/dropbox';

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
      { threshold: [0] },
    );

    return observer;
  }

  return null;
}

const observer = createObserver();

export default class LazyImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    getRef: PropTypes.func,
    dropboxAccessToken: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    alt: '',
    dropboxAccessToken:
      'xoOqGJJGdQAAAAAAAAJxfsDKm6BJXnosGfgX8JPQw5Yc2_ZVs4YKhpUwpf4qgFPJ',
    onLoad: () => undefined,
    onError: () => undefined,
    getRef: () => undefined,
  };

  state = { inView: false, blobSrc: null };

  componentDidMount() {
    document.addEventListener('image-in-view', this.handleImageInView);
  }

  componentWillUnmount() {
    document.removeEventListener('image-in-view', this.handleImageInView);
    this.unobserveRef();
  }

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

  handleImageInView = e => {
    const { detail } = e;
    if (observer && this.ref && detail.target === this.ref) {
      this.setState(() => ({ inView: true }));
      this.fetchImage();
      this.unobserveRef();
    }
  };

  handleLoad = () => {
    if (this.props.getRef) this.props.getRef(this.ref);
  };

  fetchImage = async () => {
    const { width, height } = this.ref.getBoundingClientRect();
    const { src, dropboxAccessToken } = this.props;

    const { data, headers } = await filesGetThumbnail({
      path: src,
      dimensions: { width, height },
      accessToken: dropboxAccessToken,
    });

    const metaData = JSON.parse(headers['dropbox-api-result']);
    const blobSrc = URL.createObjectURL(data);
    this.setState(() => ({ blobSrc }));
    this.onLoad(metaData);
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
