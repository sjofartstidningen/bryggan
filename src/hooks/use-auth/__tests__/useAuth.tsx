import React, { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import localforage from 'localforage';
import { BrowserRouter } from 'react-router-dom';
import nock from 'nock';
import { LOCALSTORAGE_AUTH_KEY } from '../../../constants';
import { DROPBOX_CLIENT_ID, REDIRECT_URL } from '../../../env';
import mockUser from '../../../__fixtures__/dropbox/users/get_current_account.json';
import {
  useAuth,
  AuthProvider,
  AuthStatus,
  useAuthSignIn,
  useAuthSignOut,
  useAuthReciever,
} from '../index';
import { Route } from 'react-router';

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
    expect.stringContaining(DROPBOX_CLIENT_ID),
  );
  expect(replaceMock).toHaveBeenCalledWith(
    expect.stringContaining(encodeURIComponent(REDIRECT_URL)),
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

  const Comp: React.FC = () => {
    const auth = useAuth();
    useAuthReciever();

    useEffect(() => onAuthStageChange(auth.status), [auth.status]);

    switch (auth.status) {
      case AuthStatus.unauthorized:
        return <p>Unauthorized</p>;

      case AuthStatus.authorized:
        return <p>Authorized</p>;

      default:
        return <p>Waiting</p>;
    }
  };

  const { findByText } = render(
    <BrowserRouter>
      <AuthProvider>
        <Route path="/">
          <Comp />
        </Route>
      </AuthProvider>
    </BrowserRouter>,
  );

  await findByText(/^authorized$/i);
  expect(onAuthStageChange).toHaveBeenCalledWith(AuthStatus.authorized);
  expect(onAuthStageChange).not.toHaveBeenCalledWith(AuthStatus.unauthorized);
});
