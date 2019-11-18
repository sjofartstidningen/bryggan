import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { Machine, assign, EventObject, State } from 'xstate';
import { useMachine } from '@xstate/react';
import qs from 'qs';
import localforage from 'localforage';
import axios from 'axios';
import nanoid from 'nanoid';
import { Location } from 'history';
import Cookie from 'universal-cookie';

import { trailingSlash, unleadingSlash } from '../utils';
import { REDIRECT_URL, DROPBOX_CLIENT_ID } from '../env';
import { LOCALSTORAGE_AUTH_KEY, OAUTH_STATE_COOKIE } from '../constants';

interface AuthContext {
  token: null | string;
  error: null | Error;
}

interface AuthSchema {
  states: {
    idle: {};
    initialCheck: {};
    authenticating: {};
    authenticated: {};
    unauthenticated: {};
  };
}

type AuthEvent =
  | { type: 'CHECK'; location: Location }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

const authMachine = Machine<AuthContext, AuthSchema, AuthEvent>(
  {
    id: 'auth',
    strict: true,
    initial: 'idle',
    context: {
      token: null,
      error: null,
    },
    states: {
      idle: {
        on: { CHECK: 'initialCheck' },
      },
      initialCheck: {
        invoke: {
          id: 'initial-check',
          src: 'checkInitialState',
          onDone: {
            target: 'authenticated',
            actions: assign({ token: (_, event) => event.data.token }),
          },
          onError: {
            target: 'unauthenticated',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
      },
      authenticating: {
        invoke: {
          id: 'initial-check',
          src: 'authenticate',
          onDone: {
            target: 'authenticated',
            actions: assign({ token: (_, event) => event.data.token }),
          },
          onError: {
            target: 'unauthenticated',
            actions: assign({ error: (_, event) => event.data }),
          },
        },
      },
      authenticated: {
        on: { SIGN_OUT: 'unauthenticated' },
      },
      unauthenticated: {
        on: { SIGN_IN: 'authenticating' },
        entry: [
          'revokeToken',
          assign({
            token: () => null as any,
            error: () => null as any,
          }),
        ],
      },
    },
  },
  {
    services: {
      checkInitialState: async (_, evt: EventObject) => {
        const event = evt as AuthEvent;
        if (event.type !== 'CHECK') return {};
        const { location } = event;
        let token: string | void;

        const params: { access_token?: string } = qs.parse(location.search, {
          ignoreQueryPrefix: true,
        });

        if (params.access_token) {
          token = params && params.access_token;
        } else {
          const data = await localforage.getItem<{ accessToken?: string }>(
            LOCALSTORAGE_AUTH_KEY,
          );
          token = data && data.accessToken;
        }

        if (!token) throw new Error('No token available');
        await validateToken(token);

        return { token };
      },
      authenticate: async (_: AuthContext, evt: EventObject) => {
        const event = evt as AuthEvent;

        if (event.type !== 'SIGN_IN') return {};
        const { token } = event;
        await validateToken(token);

        localforage
          .setItem(LOCALSTORAGE_AUTH_KEY, { accessToken: token })
          .catch(() => {});

        return { token };
      },
    },
    actions: {
      revokeToken: async ({ token }: AuthContext) => {
        if (token) {
          await Promise.all([
            localforage.removeItem(LOCALSTORAGE_AUTH_KEY),
            axios
              .post(
                'https://api.dropboxapi.com/2/auth/token/revoke',
                undefined,
                { headers: { Authorization: `Bearer ${token}` } },
              )
              .catch(() => {}),
          ]);
        }
      },
    },
  },
);

type AuthStateContextValue = State<AuthContext, AuthEvent>;
interface AuthMethodsContextValue {
  checkAuthState: (location: Location) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  authorize: () => void;
}

const AuthStateContext = createContext<AuthStateContextValue>(
  (null as unknown) as any,
);
const AuthMethodsContext = createContext<AuthMethodsContextValue>(
  (null as unknown) as any,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, send] = useMachine(authMachine);

  const methods = useMemo(
    () => ({
      checkAuthState: (location: Location) => send({ type: 'CHECK', location }),
      signIn: (token: string) => send({ type: 'SIGN_IN', token }),
      signOut: () => send({ type: 'SIGN_OUT' }),
      authorize: () => {
        const cookie = new Cookie();

        const uid = nanoid();
        cookie.set(OAUTH_STATE_COOKIE, uid, {
          path: '/',
          maxAge: 1000 * 60 * 60,
        });

        const redirectUri =
          trailingSlash(window.location.origin) + unleadingSlash(REDIRECT_URL);

        const url =
          'https://www.dropbox.com/oauth2/authorize?' +
          qs.stringify({
            response_type: 'code',
            redirect_uri: redirectUri,
            client_id: DROPBOX_CLIENT_ID,
            state: uid,
          });

        window.location.replace(url);
      },
    }),
    [send],
  );

  return (
    <AuthMethodsContext.Provider value={methods}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthMethodsContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthMethods = () => useContext(AuthMethodsContext);
export const useAuth = (): [AuthStateContextValue, AuthMethodsContextValue] => [
  useAuthState(),
  useAuthMethods(),
];

export const useAuthEffect = (
  effect: (state: AuthStateContextValue) => void | (() => void | undefined),
) => {
  const state = useAuthState();
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => effectRef.current(state), [state]);
};

async function validateToken(token: string) {
  const query = nanoid();
  const { data } = await axios.post(
    'https://api.dropboxapi.com/2/check/user',
    { query },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (data.result !== query) {
    throw new Error('Token response does not match th expected response');
  }
}
