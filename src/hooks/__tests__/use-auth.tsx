import React, { useEffect } from 'react';
import nock from 'nock';
import localforage from 'localforage';
import { Location } from 'history';
import {
  render,
  fireEvent,
  wait,
  mockDropboxApi,
  ensureAuthenticated,
} from '../../utils/test-utils';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import { useAuth } from '../use-auth';
import { DROPBOX_CLIENT_ID, REDIRECT_URL } from '../../env';
import { PersistedAuthSet, PersistedAuthGet } from '../../types/bryggan';

const dropboxApi = mockDropboxApi();

it('checks for initial auth state (localstorage)', async () => {
  const accessToken = 'abc123';
  await ensureAuthenticated({ scope: dropboxApi, token: accessToken });

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as Location);
    });

    return (
      <div>
        {state.matches('authenticated') && <p>{state.context.token}</p>}
      </div>
    );
  };

  const { findByText } = render(<Comp />);

  const token = await findByText(accessToken);
  expect(token).toBeInTheDocument();
});

it('checks for access token available on window.location', async () => {
  await ensureAuthenticated({ scope: dropboxApi });
  await localforage.clear();

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({
        search: '?access_token=abc123',
      } as unknown) as Location);
    });

    return <div>{state.matches('authenticated') && <p>Welcome!</p>}</div>;
  };

  const { findByText } = render(<Comp />);

  const welcome = await findByText(/welcome/i);
  expect(welcome).toBeInTheDocument();
});

it('will set as unauthenticated if no tokens are found', async () => {
  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as Location);
    });

    return <div>{state.matches('unauthenticated') && <p>Sign in</p>}</div>;
  };

  const { findByText } = render(<Comp />);

  const signIn = await findByText(/sign in/i);
  expect(signIn).toBeInTheDocument();
});

it('will set as unauthenticated if user check does not pass', async () => {
  dropboxApi.post('/2/check/user').reply(400, {});
  await localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
    accessToken: 'old_token',
  });

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as Location);
    });

    return <div>{state.matches('unauthenticated') && <p>Sign in</p>}</div>;
  };

  const { findByText } = render(<Comp />);

  const signIn = await findByText(/sign in/i);
  expect(signIn).toBeInTheDocument();
});

it('sends a user to Dropbox authorization page', async () => {
  window.location.replace = jest.fn();

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as Location);
    });

    return (
      <div>
        {state.matches('unauthenticated') && (
          <button onClick={() => auth.authorize()}>Sign in</button>
        )}
      </div>
    );
  };

  const { findByText } = render(<Comp />);

  const signIn = await findByText(/sign in/i);
  fireEvent.click(signIn);

  expect(window.location.replace).toHaveBeenCalled();
  expect(window.location.replace).toHaveBeenCalledWith(
    expect.stringContaining(DROPBOX_CLIENT_ID),
  );
  expect(window.location.replace).toHaveBeenCalledWith(
    expect.stringContaining(encodeURIComponent(REDIRECT_URL)),
  );
  expect(window.location.replace).toHaveBeenCalledWith(
    expect.stringContaining('https://www.dropbox.com/oauth2/authorize'),
  );
});

it('signs a user out', async () => {
  await ensureAuthenticated({ scope: dropboxApi });

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as Location);
    });

    return (
      <div>
        {state.matches('unauthenticated') && <p>Bye bye!</p>}
        {state.matches('authenticated') && (
          <button onClick={() => auth.signOut()}>Sign out</button>
        )}
      </div>
    );
  };

  const { findByText } = render(<Comp />);

  const signOut = await findByText(/sign out/i);
  fireEvent.click(signOut);

  await findByText(/bye bye/i);

  /**
   * When entering an the unauthenticated state a `revokeToke` action is being
   * executed. But this happens async and we therefore have to wait for
   * localStorage to be empty.
   */
  await wait(async () => {
    const data = await localforage.getItem<PersistedAuthGet>(
      LOCALSTORAGE_AUTH_KEY,
    );
    if (data != null) throw new Error('Not empty yet');
  });
  await expect(
    localforage.getItem<PersistedAuthGet>(LOCALSTORAGE_AUTH_KEY),
  ).resolves.toEqual(null);
});
