import React from 'react';
import localforage from 'localforage';
import {
  Router,
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
} from '@reach/router';
import nock from 'nock';
import { render, act } from 'utils/test-utils';
import mockUser from '__fixtures__/dropbox/users/get_current_account.json';
import { LOCALSTORAGE_AUTH_KEY, PATH_SIGN_IN } from '../../constants';
import { Authenticated } from 'components/Authenticated';

const dropboxApi = nock('https://api.dropboxapi.com', {
  reqheaders: { authorization: /^bearer .+/i },
});

afterEach(async () => {
  await localforage.clear();
});

it('should render children if authenticated', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  await localforage.setItem(LOCALSTORAGE_AUTH_KEY, {
    accessToken: 'abc123',
    user: mockUser,
  });

  const Page = (_: RouteComponentProps) => <p>Authenticated</p>;

  const { findByText } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/">
        <Page path="/" />
      </Authenticated>
    </Router>,
  );

  const text = await findByText(/^authenticated$/i);
  expect(text).toBeInTheDocument();
});

it('should redirect to signInUri if not authenticated', async () => {
  const ProtectedPage = (_: RouteComponentProps) => <p>Authenticated</p>;
  const SignIn = (_: RouteComponentProps) => <p>Sign In</p>;

  const { findByText, history } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/">
        <ProtectedPage path="/" />
      </Authenticated>
      <SignIn path={PATH_SIGN_IN} />
    </Router>,
  );

  await findByText(/sign in/i);
  expect(history.location.pathname).toContain(PATH_SIGN_IN);
});

it('should display loading state while auth state is unknown', async () => {
  jest.useFakeTimers();

  const { findByText } = render(
    <Authenticated fallback={<p>Loading</p>}>
      <p>Authenticated</p>
    </Authenticated>,
  );

  act(() => {
    jest.runAllTimers();
  });

  const text = await findByText(/loading/i);
  expect(text).toBeTruthy();
  jest.useRealTimers();
});

it('should redirect to signInUri with previous uri in state', async () => {
  const initialPath = '/foo';

  const ProtectedPage = (_: RouteComponentProps) => <p>Authenticated</p>;
  const SignIn = ({ location }: RouteComponentProps) => (
    <p>From: {location && location.state && location.state.from}</p>
  );

  const { findByText } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/">
        <ProtectedPage path={initialPath} />
      </Authenticated>
      <SignIn path={PATH_SIGN_IN} />
    </Router>,
    { route: initialPath },
  );

  await findByText(`From: ${initialPath}`);
});

function renderWithLocationProvider(
  ui: React.ReactElement,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}
