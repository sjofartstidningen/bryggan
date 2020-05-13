import React, { useEffect } from 'react';
import localforage from 'localforage';
import { Location } from 'history';
import {
  render,
  fireEvent,
  waitFor,
  ensureAuthenticated,
} from '../../utils/test-utils';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import { useAuth } from '../use-auth';
import { DROPBOX_CLIENT_ID, REDIRECT_URL } from '../../env';
import { PersistedAuthGet } from '../../types/bryggan';
import { validateToken, revokeToken } from '../../utils/dropbox';

jest.mock('../../utils/dropbox.ts');

it('checks for initial auth state (localstorage)', async () => {
  const token = 'abc123';
  await ensureAuthenticated({ token: token });

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

  const tokenText = await findByText(token);
  expect(tokenText).toBeInTheDocument();
});

it('checks for access token available on window.location', async () => {
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
  await ensureAuthenticated();
  ((validateToken as unknown) as jest.Mock<any, any>).mockRejectedValueOnce(
    new Error('Invalid token'),
  );

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

it.skip('sends a user to Dropbox authorization page', async () => {
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
  await ensureAuthenticated();
  ((revokeToken as unknown) as jest.Mock).mockImplementationOnce(() =>
    localforage.removeItem(LOCALSTORAGE_AUTH_KEY),
  );

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
  await waitFor(async () => {
    const data = await localforage.getItem<PersistedAuthGet>(
      LOCALSTORAGE_AUTH_KEY,
    );
    if (data != null) throw new Error('Not empty yet');
  });
  await expect(
    localforage.getItem<PersistedAuthGet>(LOCALSTORAGE_AUTH_KEY),
  ).resolves.toEqual(null);
});

/**
 * This is an ugly trick to avoid xstate warning about sending early events...
 */
const warn = console.warn;
beforeAll(() => {
  console.warn = (...args: any[]) => {
    if (
      args.some(
        (value) =>
          typeof value === 'string' &&
          value.includes(
            'Warning: Event "CHECK" was sent to uninitialized service "auth" and is deferred.',
          ),
      )
    ) {
      return;
    }

    warn(...args);
  };
});

afterAll(() => {
  console.warn = warn;
});
