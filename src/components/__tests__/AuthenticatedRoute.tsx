import React from 'react';
import localforage from 'localforage';
import { Route, useLocation } from 'react-router-dom';
import nock from 'nock';
import { render, act, renderWithHistory } from '../../utils/test-utils';
import { LOCALSTORAGE_AUTH_KEY, PATH_SIGN_IN } from '../../constants';
import { AuthenticatedRoute } from '../AuthenticatedRoute';
import { PersistedAuthSet } from '../../types/bryggan';

const dropboxApi = nock('https://api.dropboxapi.com', {
  reqheaders: { authorization: /^bearer .+/i },
});

afterEach(async () => {
  await localforage.clear();
});

it('should render children if authenticated', async () => {
  await localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
    accessToken: 'abc123',
  });

  const Page = () => <p>Authenticated</p>;

  const { findByText } = render(
    <AuthenticatedRoute path="/">
      <Page />
    </AuthenticatedRoute>,
  );

  const text = await findByText(/^authenticated$/i);
  expect(text).toBeInTheDocument();
});

it('should redirect to signInUri if not authenticated', async () => {
  const ProtectedPage = () => <p>Authenticated</p>;
  const SignIn = () => <p>Sign In</p>;

  const { findByText, history } = renderWithHistory(
    <>
      <AuthenticatedRoute path="/">
        <ProtectedPage />
      </AuthenticatedRoute>
      <Route path={PATH_SIGN_IN}>
        <SignIn />
      </Route>
    </>,
  );

  await findByText(/sign in/i);
  expect(history.location.pathname).toContain(PATH_SIGN_IN);
});

it('should display loading state while auth state is unknown', async () => {
  jest.useFakeTimers();

  const { findByText } = render(
    <AuthenticatedRoute fallback={<p>Loading</p>}>
      <p>Authenticated</p>
    </AuthenticatedRoute>,
  );

  act(() => {
    jest.runAllTimers();
  });

  const text = await findByText(/loading/i);
  expect(text).toBeTruthy();
  jest.useRealTimers();
});

it('should redirect to signInUri with previous uri in state', async () => {
  const initialPath = '/initial';

  const ProtectedPage = () => <p>Authenticated</p>;
  const SignIn = () => {
    const location = useLocation<{ from?: string }>();
    return <p>From: {location.state.from}</p>;
  };

  const { findByText } = render(
    <>
      <AuthenticatedRoute path={initialPath}>
        <ProtectedPage />
      </AuthenticatedRoute>
      <Route path={PATH_SIGN_IN}>
        <SignIn />
      </Route>
    </>,
    { initialEntries: [initialPath] },
  );

  await findByText(`From: ${initialPath}`);
});
