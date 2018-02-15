// @flow
import React, { Component } from 'react';
import axios, { CancelToken } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import mitt from 'mitt';
import type { Node } from 'react';
import type { $AxiosXHR, CancelTokenSource } from 'axios';

const http = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, true),
});

const emitter = mitt();
const events = {
  IN_VIEW: 'in-view',
  OUT_OF_VIEW: 'out-out-view',
};

const getObserver = (() => {
  let observer: ?IntersectionObserver;

  return (): IntersectionObserver => {
    if (observer != null) return observer;
    observer = new IntersectionObserver(
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

    return observer;
  };
})();

type RenderProps = {
  src: ?string,
  loaded: boolean,
  error: ?Error,
  revokeObjectURL: (SyntheticEvent<HTMLImageElement>) => void,
  reload: (SyntheticMouseEvent<HTMLButtonElement>) => void,
};

type Props = {
  src: string,
  render: (props: RenderProps) => Node,
  onLoad?: (event: $AxiosXHR<Blob>) => void,
  onError?: Error => void,
};

type State = {
  src: ?string,
  loaded: boolean,
  error: ?Error,
};

class LazyImage extends Component<Props, State> {
  wrapper: HTMLDivElement;
  cancelToken: CancelTokenSource;
  observer: IntersectionObserver = getObserver();

  state = {
    src: null,
    loaded: false,
    error: null,
  };

  componentDidMount() {
    this.observer.observe(this.wrapper);
    emitter.on(events.IN_VIEW, this.handleIntersect);
    emitter.on(events.OUT_OF_VIEW, this.handleNonIntersect);
  }

  componentWillUnmount() {
    this.unmountListeners();
  }

  getImage = async ({ cache = true }: { cache: boolean } = {}) => {
    try {
      this.cancelToken = CancelToken.source();
      const res: $AxiosXHR<Blob> = await http({
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
    this.observer.unobserve(this.wrapper);
    emitter.off(events.IN_VIEW, this.handleIntersect);
    emitter.off(events.OUT_OF_VIEW, this.handleNonIntersect);
    if (this.cancelToken) {
      this.cancelToken.cancel('Stop listening for events');
    }
  };

  revokeObjectURL = ({ currentTarget }: SyntheticEvent<HTMLImageElement>) =>
    URL.revokeObjectURL(currentTarget.src);

  handleIntersect = (entry: IntersectionObserverEntry) => {
    if (entry.target === this.wrapper) this.getImage();
  };

  handleNonIntersect = (entry: IntersectionObserverEntry) => {
    if (entry.target === this.wrapper && this.cancelToken) {
      this.cancelToken.cancel('Component out of view');
    }
  };

  handleError = (error: Error) => {
    this.setState(() => ({ error }));
    this.unmountListeners();
    if (this.props.onError != null) this.props.onError(error);
  };

  handleReload = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ loaded: false });
    this.getImage({ cache: false });
  };

  handleRef = (ref: ?HTMLDivElement) => {
    if (ref) this.wrapper = ref;
  };

  render() {
    const { render } = this.props;
    const { src, loaded, error } = this.state;

    return (
      <div ref={this.handleRef}>
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
