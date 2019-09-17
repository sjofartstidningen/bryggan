import React, { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import localforage from 'localforage';
import nock from 'nock';
import {
  Router,
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
} from '@reach/router';
import qs from 'qs';
import { LOCALSTORAGE_AUTH_KEY } from '../../../constants';
import mockUser from '__fixtures__/dropbox/users/get_current_account.json';
import { safeEnv } from 'env';
import {
  useAuth,
  AuthProvider,
  AuthStatus,
  useAuthSignIn,
  useAuthSignOut,
  useAuthReciever,
} from '../index';

const dropboxApi = nock('https://api.dropboxapi.com', {
  reqheaders: { authorization: /^bearer .+/i },
});

beforeEach(async () => {
  await localforage.clear();
});

it('should check for initial auth status (authorized)', async () => {
  await localforage.setItem(LOCALSTORAGE_AUTH_KEY, { accessToken: 'abc123' });
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  const Comp = () => {
    const auth = useAuth();

    switch (auth.status) {
      case AuthStatus.authorized:
        return <p>Authorized</p>;
      case AuthStatus.unauthorized:
        return <p>Unauthorized</p>;
      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <AuthProvider>
      <Comp />
    </AuthProvider>,
  );

  await findByText(/^authorized$/i);
});

it('should check for initial auth status (unauthorized)', async () => {
  const Comp = () => {
    const auth = useAuth();

    switch (auth.status) {
      case AuthStatus.authorized:
        return <p>Authorized</p>;
      case AuthStatus.unauthorized:
        return <p>Unauthorized</p>;
      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <AuthProvider>
      <Comp />
    </AuthProvider>,
  );

  await findByText(/^unauthorized$/i);
});

it('should be possible to provide access token directly to sign in', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  const Comp = () => {
    const auth = useAuth();
    const { handleDirectInput } = useAuthSignIn();

    switch (auth.status) {
      case AuthStatus.authorized:
        return <p>Authorized</p>;
      case AuthStatus.unauthorized:
        return (
          <button onClick={() => handleDirectInput('abc123')}>Sign in</button>
        );
      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <AuthProvider>
      <Comp />
    </AuthProvider>,
  );

  const btn = await findByText(/^sign in$/i);
  fireEvent.click(btn);

  await findByText(/^authorized$/i);
});

it('should redirect user to dropbox oauth when signing in with oauth method', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  const replaceMock = jest.fn();
  window.location.replace = replaceMock;

  const Comp = () => {
    const auth = useAuth();
    const { handleOauth } = useAuthSignIn();

    switch (auth.status) {
      case AuthStatus.authorized:
        return <p>Authorized</p>;
      case AuthStatus.unauthorized:
        return <button onClick={handleOauth}>Sign in</button>;
      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <AuthProvider>
      <Comp />
    </AuthProvider>,
  );

  const btn = await findByText(/sign in/i);
  fireEvent.click(btn);

  expect(replaceMock).toHaveBeenCalled();
  expect(replaceMock).toHaveBeenCalledWith(
    expect.stringContaining(safeEnv('REACT_APP_DROPBOX_CLIENT_ID')),
  );
  expect(replaceMock).toHaveBeenCalledWith(
    expect.stringContaining(
      encodeURIComponent(safeEnv('REACT_APP_REDIRECT_URL')),
    ),
  );
});

it('should be possible to sign out', async () => {
  await localforage.setItem(LOCALSTORAGE_AUTH_KEY, { accessToken: 'abc123' });
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);
  dropboxApi.post('/2/auth/token/revoke').reply(200, {});

  const Comp = () => {
    const auth = useAuth();
    const handleSignOut = useAuthSignOut();

    switch (auth.status) {
      case AuthStatus.authorized:
        return <button onClick={handleSignOut}>Sign out</button>;
      case AuthStatus.unauthorized:
        return <p>Unauthorized</p>;
      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <AuthProvider>
      <Comp />
    </AuthProvider>,
  );

  const btn = await findByText(/sign out/i);
  fireEvent.click(btn);

  await findByText(/^unauthorized$/i);
});

it('should handle recieving access token from server', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  const onAuthStageChange = jest.fn();

  const Comp: React.FC<RouteComponentProps> = ({ location }) => {
    const auth = useAuth();
    useAuthReciever(location);

    useEffect(onAuthStageChange, [auth.status]);

    switch (auth.status) {
      case AuthStatus.unauthorized:
        return <p>Unauthorized</p>;

      case AuthStatus.authorized:
        return <p>Authorized</p>;

      default:
        return <p>Waiting</p>;
    }
  };

  const memory = createMemorySource('/');
  memory.history.replaceState(
    null,
    '',
    '/auth-handler?' + qs.stringify({ access_token: 'abc123' }),
  );

  const { findByText } = renderWithLocationProvider(
    <AuthProvider>
      <Router>
        <Comp path="/auth-handler" />
      </Router>
    </AuthProvider>,
    { history: createHistory(memory) },
  );

  await findByText(/^authorized$/i);
  expect(onAuthStageChange).not.toHaveBeenCalledWith(AuthStatus.unauthorized);
});

function renderWithLocationProvider(
  ui: React.ReactElement,
  {
    route = '/',
    memory = createMemorySource(route),
    history = createHistory(memory),
  } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}
