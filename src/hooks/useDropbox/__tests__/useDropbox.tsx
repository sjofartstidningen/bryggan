import React, { useEffect } from 'react';
import { render, waitForElement, fireEvent } from 'utils/test-utils';
import localforage from 'localforage';
import qs from 'qs';
import nock from 'nock';
import { useDropboxAuth } from '../index';
import { DropboxAuthStage } from '../authReducer';
import mockUser from '__fixtures__/dropbox/users/get_current_account.json';
import { safeEnv } from 'env';

const LOCALSTORAGE_KEY = 'auth-storage';

const dropboxApi = nock('https://api.dropboxapi.com', {
  reqheaders: { authorization: /^bearer .+/i },
});

afterEach(async () => {
  await localforage.clear();
});

it('should check for initial auth status (authenticated)', async () => {
  await localforage.setItem(LOCALSTORAGE_KEY, {
    accessToken: '123abc',
    user: mockUser,
  });

  const Comp = () => {
    const auth = useDropboxAuth();

    if (auth.stage === DropboxAuthStage.authorized) {
      return <p>{auth.user.name.display_name}</p>;
    } else if (auth.stage === DropboxAuthStage.unauthorized) {
      return <p>Signed out</p>;
    } else {
      return <p>Loading...</p>;
    }
  };

  const { getByText } = render(<Comp />);

  const user = await waitForElement(() =>
    getByText(mockUser.name.display_name),
  );
  expect(user).toBeInTheDocument();
});

it('should check for initial auth status (unauthenticated)', async () => {
  const Comp = () => {
    const auth = useDropboxAuth();

    if (auth.stage === DropboxAuthStage.authorized) {
      return <p>{auth.user.name.display_name}</p>;
    } else if (auth.stage === DropboxAuthStage.unauthorized) {
      return <p>Signed out</p>;
    } else {
      return <p>Loading...</p>;
    }
  };

  const { getByText } = render(<Comp />);

  const signedOut = await waitForElement(() => getByText(/signed out/i));
  expect(signedOut).toBeInTheDocument();
});

it('should provide a proper loginUrl', async () => {
  const Comp = () => {
    const auth = useDropboxAuth();
    if (auth.stage === DropboxAuthStage.unauthorized) {
      return <a href={auth.loginUrl()}>Login</a>;
    }

    return null;
  };

  const { getByText } = render(<Comp />);
  const link = await waitForElement(() => getByText(/login/i));
  expect(link).toHaveAttribute('href');
  expect(link.getAttribute('href')).toContain(
    encodeURIComponent(safeEnv('REACT_APP_DROPBOX_CLIENT_ID')),
  );
  expect(link.getAttribute('href')).toContain(
    encodeURIComponent(safeEnv('REACT_APP_REDIRECT_URL')),
  );
});

it('should revoke token on logout', async () => {
  await localforage.setItem(LOCALSTORAGE_KEY, {
    accessToken: '123abc',
    user: mockUser,
  });
  const scope = dropboxApi.post('/2/auth/token/revoke').reply(200);

  const Comp = () => {
    const auth = useDropboxAuth();
    if (auth.stage === DropboxAuthStage.authorized) {
      return <button onClick={auth.logout}>Sign out</button>;
    }

    if (auth.stage === DropboxAuthStage.unauthorized) {
      return <p>Signed out</p>;
    }

    return <p>Checking auth</p>;
  };

  const { getByText } = render(<Comp />);

  const btn = await waitForElement(() => getByText(/sign out/i));
  fireEvent.click(btn);

  await waitForElement(() => getByText(/signed out/i));
  expect(() => scope.done()).not.toThrow();
});

it('should handle verifying access_token', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(200, mockUser);

  window.history.pushState(
    {},
    '',
    `?${qs.stringify({
      access_token: 'abc123',
      token_type: 'bearer',
      account_id: 'dbid:abc123',
    })}`,
  );

  const Comp = () => {
    const auth = useDropboxAuth();

    useEffect(() => auth.handleAuthentication(), [auth]);

    if (auth.stage === DropboxAuthStage.authorized) {
      return (
        <p>
          <span>{auth.user.name.display_name}</span>
          <span>{auth.accessToken}</span>
        </p>
      );
    } else if (auth.stage === DropboxAuthStage.unauthorized) {
      return <p>{auth.error ? auth.error : 'Signed out'}</p>;
    } else {
      return <p>Loading...</p>;
    }
  };

  const navigate = jest.fn();
  const { getByText } = render(<Comp />, { navigate });
  await waitForElement(() => getByText(mockUser.name.display_name));

  expect(getByText('abc123')).toBeInTheDocument();
  expect(navigate).toHaveBeenCalledTimes(1);
  expect(navigate).toHaveBeenCalledWith('/', { replace: true });
});

it('should handle revoked authorization', async () => {
  dropboxApi.post('/2/users/get_current_account').reply(404, mockUser);

  const err = {
    error: 'denied_access',
    error_description: 'The user refused access to their account',
  };
  window.history.pushState({}, '', `?${qs.stringify(err)}`);

  const Comp = () => {
    const auth = useDropboxAuth();

    useEffect(() => {
      auth.handleAuthentication();
    }, [auth]);

    if (auth.stage === DropboxAuthStage.authorized) {
      return <p>{auth.user.name.display_name}</p>;
    } else if (auth.stage === DropboxAuthStage.unauthorized) {
      return <p>{auth.error ? auth.error : 'Signed out'}</p>;
    } else {
      return <p>Loading...</p>;
    }
  };

  const { getByText } = render(<Comp />);
  await waitForElement(() =>
    getByText(`${err.error}: ${err.error_description}`),
  );
});
