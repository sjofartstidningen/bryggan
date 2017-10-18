// @flow
import React, { Component } from 'react';

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
      { threshold: [0] },
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
  onLoad?: (e: SyntheticEvent<*>) => void,
  onError?: (e: SyntheticEvent<*>) => void,
};

type State = {
  inView: boolean,
};

export default class LazyImage extends Component<Props, State> {
  ref: HTMLElement;

  static defaultProps = {
    className: '',
    alt: '',
    onLoad: () => null,
    onError: () => null,
  };

  state = { inView: false };

  componentDidMount() {
    document.addEventListener('image-in-view', this.handleImageInView);
  }

  componentWillUnmount() {
    document.removeEventListener('image-in-view', this.handleImageInView);
    this.unobserveRef();
  }

  handleImageInView = (e: mixed) => {
    if (e instanceof CustomEvent) {
      const { detail } = e;
      if (observer && this.ref && detail.target === this.ref) {
        this.setState(() => ({ inView: true }));

        // $FlowFixMe
        observer.unobserve(this.ref);
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

  onLoad = (e: SyntheticEvent<*>) => {
    if (this.props.onLoad) this.props.onLoad(e);
  };

  onError = (e: SyntheticEvent<*>) => {
    const { inView } = this.state;
    if (this.props.onError && inView) this.props.onError(e);
  };

  render() {
    const { src, className, alt } = this.props;
    const { inView } = this.state;

    return (
      <img
        src={inView ? src : ''}
        className={className}
        alt={alt}
        onLoad={this.onLoad}
        onError={this.onError}
        ref={this.observeRef}
      />
    );
  }
}
