/* eslint-disable react/require-default-props */
import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import axios, { CancelToken, isCancel } from 'axios';
import { MinimalCache } from '../../utils/cache';

const initialState = {
  state: 'idle',
  response: null,
  fromCache: false,
  error: null,
};

const cancelReasons = {
  UNMOUNT: 'Component unmounted',
  TIMEOUT: 'Request timed out',
  UNKNOWN: 'Request cancelled without reason',
};

const Cache = new MinimalCache({ serializer: x => JSON.stringify(x) });

class Fetch extends PureComponent {
  static propTypes = {
    client: PropTypes.func,
    cache: PropTypes.shape({
      get: PropTypes.func.isRequired,
      set: PropTypes.func.isRequired,
      clear: PropTypes.func.isRequired,
    }),
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['get', 'post']),
    headers: PropTypes.objectOf(PropTypes.string),
    data: PropTypes.object, // eslint-disable-line
    params: PropTypes.object, // eslint-disable-line
    shouldFetch: PropTypes.bool,
    ignoreCache: PropTypes.bool,
    timeout: PropTypes.number,
    responseReducer: PropTypes.func,
    onRequest: PropTypes.func,
    onResponse: PropTypes.func,
    onError: PropTypes.func,
    component: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.func,
  };

  static defaultProps = {
    client: axios,
    cache: Cache,
    method: 'get',
    shouldFetch: true,
    ignoreCache: false,
    timeout: 0,
  };

  state = { ...initialState };

  controller = null;
  timeout = null;

  componentDidMount() {
    const { shouldFetch } = this.props;
    if (shouldFetch) this.refetch();
  }

  componentDidUpdate(prevProps) {
    const { shouldFetch } = this.props;
    if (shouldFetch && shouldFetch !== prevProps.shouldFetch) this.refetch();
  }

  componentWillUnmount() {
    this.clearTimeout();
    this.abortController(cancelReasons.UNMOUNT);
  }

  setupTimeout() {
    const { timeout } = this.props;
    if (timeout > 0) {
      this.timeout = setTimeout(
        () => this.abortController(cancelReasons.TIMEOUT),
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

  abortController(reason = cancelReasons.UNKNOWN) {
    if (this.controller) this.controller.cancel(reason);
  }

  refetch() {
    this.clearTimeout();

    const fetchedFromCache = this.fetchFromCache();
    if (!fetchedFromCache) {
      this.setupController();
      this.setupTimeout();
      this.fetch();
    }
  }

  getRequestConfig() {
    const { url, method, headers, data, params } = this.props;
    return { url, method, headers, data, params };
  }

  fetchFromCache() {
    const { cache, ignoreCache } = this.props;
    if (ignoreCache) return false;

    const config = this.getRequestConfig();

    const fromCache = cache.get(config);
    if (!fromCache) return false;

    this.handleResponse({ response: fromCache, config }, true);
    return true;
  }

  fetch() {
    const { client, onRequest } = this.props;
    const config = this.getRequestConfig();

    const request = client({
      ...config,
      cancelToken: this.controller && this.controller.token,
    });
    this.setState(() => ({ ...initialState, state: 'fetching' }));
    if (onRequest) onRequest(config);

    request
      .then(res => res.data)
      .then(response => {
        this.handleResponse({ response, config }, false);
        this.cacheResponse({ response, config });
      })
      .catch(error => this.handleError({ error, config }));
  }

  handleResponse({ response, config }, fromCache = false) {
    const { responseReducer, onResponse } = this.props;
    this.setState(() => ({
      ...initialState,
      state: 'fetched',
      response: responseReducer ? responseReducer(response) : response,
      fromCache,
    }));

    if (onResponse) onResponse({ response, config });
  }

  handleError({ error, config }) {
    const { onError } = this.props;

    if (!isCancel(error)) {
      this.setState(() => ({
        ...initialState,
        state: 'error',
        error,
      }));

      if (onError) onError({ error, config });
    } else if (error.message !== cancelReasons.UNMOUNT) {
      console.log(error);
      this.setState(() => ({
        ...initialState,
        state: 'aborted',
        error,
      }));
    }
  }

  cacheResponse({ response, config }) {
    const { cache, ignoreCache } = this.props;
    if (!ignoreCache) cache.set(config, response);
  }

  getRenderProps = () => ({ ...this.state });

  render() {
    const { component, render, children } = this.props;
    const props = this.getRenderProps();

    if (component) return createElement(component, props);
    if (render) return render(props);
    if (children) return children(props);
    return null;
  }
}

export { Fetch as default, Cache };
