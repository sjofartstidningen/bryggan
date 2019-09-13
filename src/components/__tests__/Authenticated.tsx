import React from 'react';
import localforage from 'localforage';
import {
  Router,
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
} from '@reach/router';
import { render, act } from 'utils/test-utils';
import { Authenticated } from 'components/Authenticated';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import mockUser from '__fixtures__/dropbox/users/get_current_account.json';

afterEach(async () => {
  await localforage.clear();
});

it('should render children if authenticated', async () => {
  await localforage.setItem(LOCALSTORAGE_AUTH_KEY, {
    accessToken: 'abc123',
    user: mockUser,
  });

  const Page = (_: RouteComponentProps) => <p>Authenticated</p>;

  const { findByText } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/" signInUri="/sign-in">
        <Page path="/" />
      </Authenticated>
    </Router>,
  );

  const text = await findByText(/authenticated/i);
  expect(text).toBeInTheDocument();
});

it('should redirect to signInUri if not authenticated', async () => {
  const signInUri = '/sign-in';

  const ProtectedPage = (_: RouteComponentProps) => <p>Authenticated</p>;
  const SignIn = (_: RouteComponentProps) => <p>Sign In</p>;

  const { findByText, history } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/" signInUri={signInUri}>
        <ProtectedPage path="/" />
      </Authenticated>
      <SignIn path={signInUri} />
    </Router>,
  );

  await findByText(/sign in/i);
  expect(history.location.pathname).toEqual(signInUri);
});

it('should display loading state while auth state is unknown', async () => {
  jest.useFakeTimers();

  const { findByText } = render(
    <Authenticated signInUri="/sign-in" fallback={<p>Loading</p>}>
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
  const signInUri = '/sign-in';
  const initialPath = '/foo';

  const ProtectedPage = (_: RouteComponentProps) => <p>Authenticated</p>;
  const SignIn = ({ location }: RouteComponentProps) => (
    <p>From: {location && location.state && location.state.from}</p>
  );

  const { findByText } = renderWithLocationProvider(
    <Router>
      <Authenticated path="/" signInUri={signInUri}>
        <ProtectedPage path={initialPath} />
      </Authenticated>
      <SignIn path={signInUri} />
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
