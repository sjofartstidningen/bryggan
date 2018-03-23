// @flow
import { createElement, PureComponent } from 'react';
import type { ComponentType, Node } from 'react';
import axios, { CancelToken, isCancel } from 'axios';
import type {
  CancelTokenSource,
  AxiosXHRConfigBase,
  AxiosPromise,
  AxiosXHRConfig,
} from 'axios';
import { MinimalCache } from '../../utils/cache';

interface Config<D> extends AxiosXHRConfigBase<D> {
  cacheSerializer?: (AxiosXHRConfig<D>) => string;
  displayName?: string;
  cacheTTL?: number;
}

type States = 'initial' | 'fetching' | 'fetched' | 'error' | 'aborted';

interface RenderProps<R> {
  state: States;
  data: ?R;
  fromCache: boolean;
}

type VoidP = void | Promise<void>;

type Props<D, R, F = R> = AxiosXHRConfig<D> & {
  ignoreCache?: boolean,
  timeout?: number,
  dataReducer?: R => F,
  onStart?: () => VoidP,
  onSuccess?: ({ data: R, fromCache: boolean }) => VoidP,
  onError?: Error => VoidP,
  onAbort?: Error => VoidP,
  component?: ComponentType<RenderProps<F>>,
  render?: (RenderProps<F>) => Node,
  children?: (RenderProps<F>) => Node,
};

type State<F> = {
  state: States,
  data: ?F,
  fromCache: boolean,
};

function createFetch<D, R, F>({
  cacheSerializer = x => JSON.stringify(x),
  displayName = 'Fetch',
  cacheTTL = 60 * 60 * 1000,
  ...conf
}: Config<D>): ComponentType<Props<D, R, F>> {
  const selectAxiosConfigProps = (props: Props<D, R, F>): AxiosXHRConfig<D> => {
    const {
      ignoreCache,
      timeout,
      dataReducer,
      onStart,
      onSuccess,
      onError,
      onAbort,
      component,
      render,
      children,
      ...config
    } = props;
    return config;
  };

  const http = axios.create(conf);
  const cache: MinimalCache<AxiosXHRConfig<D>, string, R> = new MinimalCache({
    serializer: cacheSerializer,
  });

  class FetchComp extends PureComponent<Props<D, R, F>, State<F>> {
    static displayName = displayName;
    static cache = cache;
    static defaultProps = {
      method: 'get',
      ignoreCache: false,
      dataReducer: x => x,
    };

    state = {
      state: 'initial',
      data: null,
      fromCache: false,
    };

    controller: CancelTokenSource;
    timeout: ?TimeoutID;

    componentDidMount() {
      this.refetchData();
    }

    componentWillUnmount() {
      this.clearTimeout();
      this.abortController('unmount');
    }

    setupTimeout() {
      const { timeout } = this.props;
      if (timeout) {
        this.timeout = setTimeout(
          () => this.abortController('timeout'),
          timeout,
        );
      }
    }

    clearTimeout() {
      if (this.timeout) clearTimeout(this.timeout);
    }

    setupController() {
      this.controller = CancelToken.source();
    }

    abortController(reason?: string) {
      if (this.controller) this.controller.cancel(reason);
    }

    refetchData() {
      this.clearTimeout();
      this.abortController();
      this.setupTimeout();
      this.setupController();
      this.fetchData();
    }

    reduceData(data) {
      const { dataReducer } = this.props;
      // $FlowFixMe
      return dataReducer(data);
    }

    fetchData() {
      const { ignoreCache } = this.props;

      const requestConfig = {
        ...selectAxiosConfigProps(this.props),
        cancelToken: this.controller.token,
      };

      // $FlowFixMe
      if (!ignoreCache && cache.has(requestConfig)) {
        const data = cache.get(requestConfig);

        if (data) {
          this.setFetched({ data, fromCache: true });
          return;
        }
      }

      this.setState(() => ({ state: 'fetching' }));
      if (this.props.onStart) this.props.onStart();

      // $FlowFixMe
      (http(requestConfig): AxiosPromise<R>)
        .then(({ data }) => {
          this.setFetched({ data, fromCache: false });
          cache.set(requestConfig, data, cacheTTL);
        })
        .catch(err => this.handleError(err));
    }

    setFetched({ data, fromCache }) {
      this.setState(() => ({
        state: 'fetched',
        data: this.reduceData(data),
        fromCache,
      }));

      this.clearTimeout();
      if (this.props.onSuccess) {
        this.props.onSuccess({ data, fromCache: true });
      }
    }

    handleError(err: Error) {
      if (isCancel(err) && err.message !== 'unmount') {
        this.setState(() => ({ state: 'aborted' }));

        if (this.props.onAbort) {
          this.props.onAbort(err);
        }
      } else {
        this.setState(() => ({ state: 'error' }));

        if (this.props.onError) {
          this.props.onError(err);
        }
      }
    }

    render() {
      const { component, render, children } = this.props;
      const { state, fromCache, data } = this.state;
      const renderProps = { state, fromCache, data };

      if (component) return createElement(component, renderProps);
      if (render) return render(renderProps);
      if (children) return children(renderProps);
      return null;
    }
  }

  return FetchComp;
}

export { createFetch as default };
