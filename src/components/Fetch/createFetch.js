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

interface Config<RequestData> extends AxiosXHRConfigBase<RequestData> {
  cacheSerializer?: (AxiosXHRConfig<RequestData>) => string;
  displayName?: string;
  cacheTTL?: number;
}

type States = 'initial' | 'fetching' | 'fetched' | 'error' | 'aborted';

type VoidP = void | Promise<void>;

type RenderProps<Response> = {
  state: States,
  response: ?Response,
  fromCache: boolean,
  error: ?Error,
};

type Props<RequestData, ResponseBody, ReducedResponse> = AxiosXHRConfig<
  RequestData,
> & {
  ignoreCache?: boolean,
  timeout?: number,
  responseReducer: ResponseBody => ReducedResponse,
  onStart?: () => VoidP,
  onSuccess?: ({ response: ResponseBody, fromCache: boolean }) => VoidP,
  onError?: Error => VoidP,
  onAbort?: Error => VoidP,
  component?: ComponentType<RenderProps<ReducedResponse>>,
  render?: (RenderProps<ReducedResponse>) => Node,
  children?: (RenderProps<ReducedResponse>) => Node,
};

type State<Response> = {
  state: States,
  response: ?Response,
  fromCache: boolean,
  error: ?Error,
};

function createFetch<RequestData, ResponseBody, ReducedResponse>({
  cacheSerializer = x => JSON.stringify(x),
  displayName = 'Fetch',
  cacheTTL = 60 * 60 * 1000,
  ...conf
}: Config<RequestData>): ComponentType<
  Props<RequestData, ResponseBody, ReducedResponse>,
> {
  const selectAxiosConfigProps = (props): AxiosXHRConfig<RequestData> => {
    const {
      ignoreCache,
      timeout,
      responseReducer,
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
  const cache: MinimalCache<
    AxiosXHRConfig<RequestData>,
    string,
    ResponseBody,
  > = new MinimalCache({
    serializer: cacheSerializer,
  });

  class Fetch extends PureComponent<
    Props<RequestData, ResponseBody, ReducedResponse>,
    State<ReducedResponse>,
  > {
    static displayName = displayName;
    static cache = cache;
    static defaultProps = {
      ignoreCache: false,
      responseReducer: x => x,
    };

    state = {
      state: 'initial',
      response: null,
      fromCache: false,
      error: null,
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

    fetchData() {
      const { ignoreCache } = this.props;

      const requestConfig = {
        ...selectAxiosConfigProps(this.props),
        cancelToken: this.controller.token,
      };

      // $FlowFixMe
      if (!ignoreCache && cache.has(requestConfig)) {
        const response = cache.get(requestConfig);

        if (response) {
          this.setFetched({ response, fromCache: true });
          return;
        }
      }

      this.setState(() => ({ state: 'fetching' }));
      if (this.props.onStart) this.props.onStart();

      // $FlowFixMe
      (http(requestConfig): AxiosPromise<ResponseBody>)
        .then(({ data: response }) => {
          this.setFetched({ response, fromCache: false });
          cache.set(requestConfig, response, cacheTTL);
        })
        .catch(err => this.handleError(err));
    }

    setFetched({ response, fromCache }) {
      const { responseReducer } = this.props;
      this.setState(() => ({
        state: 'fetched',
        response: responseReducer(response),
        fromCache,
        error: null,
      }));

      this.clearTimeout();
      if (this.props.onSuccess) {
        this.props.onSuccess({ response, fromCache: true });
      }
    }

    handleError(error: Error) {
      if (isCancel(error) && error.message !== 'unmount') {
        this.setState(() => ({ state: 'aborted', error }));
        if (this.props.onAbort) this.props.onAbort(error);
      } else {
        this.setState(() => ({ state: 'error', error }));
        if (this.props.onError) this.props.onError(error);
      }
    }

    render() {
      const { component, render, children } = this.props;

      if (component) return createElement(component, this.state);
      if (render) return render(this.state);
      if (children) return children(this.state);
      return null;
    }
  }

  return Fetch;
}

export { createFetch as default };
export type { RenderProps };
