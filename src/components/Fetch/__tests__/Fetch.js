import React from 'react';
import { render, wait } from 'react-testing-library';
import axiosMock from 'axios';
import Fetch, { Cache } from '../';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

beforeEach(() => {
  axiosMock.mockImplementation(() => Promise.resolve({ data: 'hello' }));
});

afterEach(() => {
  axiosMock.mockReset();
  jest.clearAllTimers();
  Cache.clear();
});

test('should fetch url on mount', async () => {
  const url = '/greet';
  render(<Fetch url={url} />);

  await delay(1);
  expect(axiosMock).toHaveBeenCalledTimes(1);
});

describe('render props', () => {
  test('should render children prop', async () => {
    const children = jest.fn(({ response }) => (
      <p data-testid="res">{response}</p>
    ));
    const { getByText } = render(<Fetch url="/">{children}</Fetch>);
    await wait(() => getByText('hello'));

    expect(getByText('hello').textContent).toBe('hello');
  });

  test('should render render prop', async () => {
    const renderProp = jest.fn(({ response }) => <p>{response}</p>);
    const { getByText } = render(<Fetch url="/" render={renderProp} />);
    await wait(() => getByText('hello'));

    expect(getByText('hello').textContent).toBe('hello');
  });

  test('should render component prop', async () => {
    const Comp = jest.fn(({ response }) => <p>{response}</p>);
    const { getByText } = render(<Fetch url="/" component={Comp} />);
    await wait(() => getByText('hello'));

    expect(getByText('hello').textContent).toBe('hello');
  });
});

test('should cache responses', async () => {
  const renderP = jest.fn(({ fromCache }) => <p>{fromCache.toString()}</p>);
  const url = '/from-cache';

  {
    const { getByText } = render(<Fetch url={url} render={renderP} />);
    await wait(() => getByText('false'));
    expect(getByText('false').textContent).toBe('false');
  }

  {
    const { getByText } = render(<Fetch url={url} render={renderP} />);
    await wait(() => getByText('true'));
    expect(getByText('true').textContent).toBe('true');
  }
});

test('should ignore cache if ignoreCache is present', async () => {
  const renderP = jest.fn(({ fromCache }) => <p>{fromCache.toString()}</p>);
  const url = '/from-cache';

  {
    const { getByText } = render(
      <Fetch url={url} render={renderP} ignoreCache />,
    );
    await wait(() => getByText('false'));
    expect(getByText('false').textContent).toBe('false');
  }

  {
    const { getByText } = render(
      <Fetch url={url} render={renderP} ignoreCache />,
    );
    await wait(() => getByText('false'));
    expect(getByText('false').textContent).toBe('false');
  }
});

test('should reduce over response with responseReducer prop', async () => {
  const renderP = jest.fn(({ response }) => <p>{response}</p>);
  const responseReducer = jest.fn(res =>
    res
      .split('')
      .reverse()
      .join(''),
  );

  const url = '/greet';

  const { getByText } = render(
    <Fetch url={url} responseReducer={responseReducer} render={renderP} />,
  );

  await wait(() => getByText('olleh'));
  expect(getByText('olleh').textContent).toBe('olleh');
});

describe('event handlers', () => {
  test('should call onRequest, onResponse event handlers', async () => {
    const url = '/event-handlers';
    const onRequest = jest.fn();
    const onResponse = jest.fn();

    render(<Fetch url={url} onRequest={onRequest} onResponse={onResponse} />);

    expect(onRequest).toHaveBeenCalledWith(expect.objectContaining({ url }));

    await delay(1);
    expect(onResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.any(Object),
        response: expect.any(String),
      }),
    );
  });

  test('should call onError event handlers', async () => {
    axiosMock.mockImplementationOnce(() => Promise.reject(new Error('Error')));
    const url = '/error-handlers';
    const onError = jest.fn();

    render(<Fetch url={url} onError={onError} />);

    await delay(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.any(Object),
        error: expect.any(Error),
      }),
    );
  });
});

test('should use provided axios client if defined', async () => {
  const client = axiosMock.create({ headers: { Foo: 'bar' } });
  const url = '/client';
  render(<Fetch url={url} client={client} />);

  await delay(1);
  expect(client).toHaveBeenCalledWith(expect.objectContaining({ url }));
  expect(axiosMock).toHaveBeenCalledWith(expect.objectContaining({ url }));
});
