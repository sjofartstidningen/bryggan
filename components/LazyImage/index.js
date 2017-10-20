// @flow
import React, { Component } from 'react';
import axios from 'axios';

function createObserver(): ?IntersectionObserver {
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

const observer: ?IntersectionObserver = createObserver();

type Props = {
  className?: string,
  alt?: string,
  src: string,
  onLoad?: (e: FileMetaData) => void,
  onError?: (e: SyntheticEvent<*>) => void,
  getRef?: (ref: HTMLElement) => void,
};

type State = {
  inView: boolean,
  blobSrc: ?string,
};

export default class LazyImage extends Component<Props, State> {
  ref: HTMLElement;

  static defaultProps = {
    className: '',
    alt: '',
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

  fetchImage = async () => {
    const { src } = this.props;
    const { data, headers } = await axios({
      method: 'get',
      url: src,
      responseType: 'blob',
    });

    const metaData: FileMetaData = JSON.parse(headers['dropbox-api-result']);

    const blobSrc = URL.createObjectURL(data);
    this.setState(() => ({ blobSrc }));
    this.onLoad(metaData);
  };

  handleImageInView = (e: mixed) => {
    if (e instanceof CustomEvent) {
      const { detail } = e;
      if (observer && this.ref && detail.target === this.ref) {
        this.setState(() => ({ inView: true }));
        this.fetchImage();
        this.unobserveRef();
      }
    }
  };

  observeRef = (ref: ?HTMLElement) => {
    if (ref && observer) {
      this.ref = ref;
      observer.observe(ref);
    }
  };

  unobserveRef = () => {
    if (observer && this.ref) {
      // $FlowFixMe
      observer.unobserve(this.ref);
    }
  };

  onLoad = (e: FileMetaData) => {
    if (this.props.onLoad) this.props.onLoad(e);
  };

  onError = (e: SyntheticEvent<*>) => {
    const { inView } = this.state;
    if (this.props.onError && inView) this.props.onError(e);
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
        ref={this.observeRef}
        onLoad={this.handleLoad}
      />
    );
  }
}
