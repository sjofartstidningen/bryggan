import React from 'react';
import { render, flushPromises } from 'react-testing-library';
import axiosMock from 'axios';
import createFetch from '../createFetch';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

beforeEach(() => {
  axiosMock.mockImplementation(() => Promise.resolve({ data: 'hello' }));
});

afterEach(() => {
  axiosMock.mockReset();
  jest.clearAllTimers();
});

test('create a Fetch component with base config', async () => {
  const FetchGreet = createFetch({});

  const url = '/greet';
  render(<FetchGreet url={url} />);
  await flushPromises();

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith(expect.objectContaining({ url }));
});

test('should apply base url when provided in create call', async () => {
  const baseURL = 'https://hello.com';
  const url = '/greet';

  const FetchGreet = createFetch({ baseURL });
  render(<FetchGreet url={url} />);
  await flushPromises();

  expect(axiosMock).toHaveBeenCalledTimes(1);
  expect(axiosMock).toHaveBeenCalledWith(
    expect.objectContaining({ url, baseURL }),
  );
});

describe('render props', () => {
  const Fetch = createFetch({});

  test('should render children prop', async () => {
    const children = jest.fn(({ response }) => (
      <p data-testid="response">{response}</p>
    ));
    const { getByTestId } = render(<Fetch url="/">{children}</Fetch>);
    await flushPromises();

    expect(getByTestId('response').textContent).toBe('hello');
  });

  test('should render render prop', async () => {
    const renderProp = jest.fn(({ response }) => (
      <p data-testid="response">{response}</p>
    ));
    const { getByTestId } = render(<Fetch url="/" render={renderProp} />);
    await flushPromises();

    expect(getByTestId('response').textContent).toBe('hello');
  });

  test('should render component prop', async () => {
    const Comp = jest.fn(({ response }) => (
      <p data-testid="response">{response}</p>
    ));
    const { getByTestId } = render(<Fetch url="/" component={Comp} />);
    await flushPromises();

    expect(getByTestId('response').textContent).toBe('hello');
  });
});

test('should cache responses, and ignore if ignoreCache prop is present', async () => {
  const FetchGreet = createFetch({});

  const renderP = jest.fn(({ fromCache }) => (
    <p data-testid="cache">{fromCache.toString()}</p>
  ));
  const url = '/cache';

  {
    const { getByTestId } = render(<FetchGreet url={url} render={renderP} />);
    await flushPromises();
    expect(getByTestId('cache').textContent).toBe('false');
    expect(axiosMock).toHaveBeenCalledTimes(1);
  }

  {
    const { getByTestId } = render(<FetchGreet url={url} render={renderP} />);
    expect(getByTestId('cache').textContent).toBe('true');
    expect(axiosMock).toHaveBeenCalledTimes(1);
  }

  {
    const { getByTestId } = render(
      <FetchGreet url={url} render={renderP} ignoreCache />,
    );
    await flushPromises();
    expect(getByTestId('cache').textContent).toBe('false');
    expect(axiosMock).toHaveBeenCalledTimes(2);
  }
});

test('should timeout component if timeout is present', async () => {
  axiosMock.mockImplementationOnce(
    ({ cancelToken }) =>
      new Promise((resolve, reject) => {
        if (cancelToken) {
          cancelToken.on('cancel', reason => {
            const err = new Error(reason || 'Aborted');
            err.__CANCEL__ = true; // eslint-disable-line
            reject(err);
          });
        }

        setTimeout(() => {
          resolve({ data: 'hello world' });
        }, 100);
      }),
  );

  const FetchTimeout = createFetch({});
  const children = jest.fn(({ state }) => <p data-testid="state">{state}</p>);

  const url = '/timeout';
  const { getByTestId } = render(
    <FetchTimeout url={url} timeout={1}>
      {children}
    </FetchTimeout>,
  );

  await delay(0);
  expect(getByTestId('state').textContent).toBe('aborted');
});

describe('Event handlers', () => {
  const FetchEvents = createFetch({});

  test('should call handler on start and success', async () => {
    const handler = jest.fn(() => {});
    render(
      <FetchEvents url="/success" onStart={handler} onSuccess={handler} />,
    );

    expect(handler).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('should call handler on error', async () => {
    axiosMock.mockImplementationOnce(() => Promise.reject(new Error('error')));

    const handler = jest.fn(() => {});
    render(<FetchEvents url="/error" onStart={handler} onError={handler} />);

    expect(handler).toHaveBeenCalledTimes(1);
    await flushPromises();
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('should call handler on abort', async () => {
    axiosMock.mockImplementationOnce(() => {
      const err = new Error('abort');
      err.__CANCEL__ = true; // eslint-disable-line
      return Promise.reject(err);
    });

    const handler = jest.fn(() => {});
    render(<FetchEvents url="/error" onAbort={handler} />);

    await flushPromises();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

test('should apply headers', async () => {
  const FetchHeaders = createFetch({ headers: { Foo: 'bar' } });
  render(<FetchHeaders url="/" />);

  expect(axiosMock).toHaveBeenCalledWith(
    expect.objectContaining({ headers: { Foo: 'bar' } }),
  );
});

test('should reduce over response with responseReducer prop', async () => {
  axiosMock.mockImplementationOnce(() => Promise.resolve({ data: 'hello' }));

  const FetchReducer = createFetch({});
  const renderP = jest.fn(({ response }) => (
    <p data-testid="response">{response}</p>
  ));
  const responseReducer = jest.fn(response => response.toUpperCase());
  const { getByTestId } = render(
    <FetchReducer url="/" responseReducer={responseReducer} render={renderP} />,
  );
  await flushPromises();

  expect(getByTestId('response').textContent).toBe('HELLO');
});
