import React, {
  useReducer,
  useEffect,
  Dispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import localforage from 'localforage';
import qs from 'qs';
import nanoid from 'nanoid';
import Cookie from 'universal-cookie';
import { trailingSlash, unleadingSlash } from 'utils';
import { safeEnv } from 'env';
import { DropboxUser } from 'types/dropbox';
import { LOCALSTORAGE_AUTH_KEY, OAUTH_STATE_COOKIE } from '../../constants';
import * as dropbox from 'api/dropbox';

export enum AuthStage {
  unknown = 'unknown',
  checking = 'checking',
  checkingToken = 'checking-token',
  authorized = 'authorized',
  unauthorized = 'unauthorized',
  signingIn = 'signing-in',
  signingOut = 'signing-out',
}

export enum AuthActionType {
  checkAuth = 'check-auth',
  checkToken = 'check-token',
  signIn = 'sign-in',
  signOut = 'sign-out',
  authorize = 'authorize',
  unauthorize = 'unauthorize',
}

export enum SignInMethod {
  oauth = 'oauth',
  directInput = 'direct-input',
}

export type AuthAction =
  | {
      type: AuthActionType.checkAuth;
    }
  | {
      type: AuthActionType.checkToken;
      payload: { accessToken: string };
    }
  | {
      type: AuthActionType.authorize;
      payload: { accessToken: string; user: DropboxUser };
    }
  | {
      type: AuthActionType.unauthorize;
      payload?: { reason: string };
    }
  | {
      type: AuthActionType.signIn;
      payload: SigningInState;
    }
  | {
      type: AuthActionType.signOut;
      payload: { accessToken: string };
    };

export type SigningInState =
  | { method: SignInMethod.oauth; oauthState?: string }
  | { method: SignInMethod.directInput; accessToken: string };

export type AuthState =
  | {
      stage: AuthStage.unknown;
    }
  | {
      stage: AuthStage.checking;
    }
  | {
      stage: AuthStage.checkingToken;
      accessToken: string;
    }
  | {
      stage: AuthStage.authorized;
      accessToken: string;
      user: DropboxUser;
    }
  | {
      stage: AuthStage.unauthorized;
      error?: string;
    }
  | {
      stage: AuthStage.signingIn;
    } & SigningInState
  | {
      stage: AuthStage.signingOut;
      accessToken: string;
    };

export interface StateChart {
  initial: AuthStage;
  states: {
    [key in AuthStage]: {
      on: {
        [key in AuthActionType]?: AuthStage;
      };
    };
  };
}

const stateChart: StateChart = {
  initial: AuthStage.unknown,
  states: {
    [AuthStage.unknown]: {
      on: {
        [AuthActionType.checkAuth]: AuthStage.checking,
        [AuthActionType.checkToken]: AuthStage.checkingToken,
      },
    },
    [AuthStage.checking]: {
      on: {
        [AuthActionType.authorize]: AuthStage.authorized,
        [AuthActionType.unauthorize]: AuthStage.unauthorized,
        [AuthActionType.checkToken]: AuthStage.checkingToken,
      },
    },
    [AuthStage.checkingToken]: {
      on: {
        [AuthActionType.authorize]: AuthStage.authorized,
        [AuthActionType.unauthorize]: AuthStage.unauthorized,
      },
    },
    [AuthStage.signingIn]: {
      on: {
        [AuthActionType.authorize]: AuthStage.authorized,
        [AuthActionType.unauthorize]: AuthStage.unauthorized,
      },
    },
    [AuthStage.signingOut]: {
      on: {
        [AuthActionType.unauthorize]: AuthStage.unauthorized,
      },
    },
    [AuthStage.unauthorized]: {
      on: {
        [AuthActionType.signIn]: AuthStage.signingIn,
        [AuthActionType.checkToken]: AuthStage.checkingToken,
      },
    },
    [AuthStage.authorized]: {
      on: {
        [AuthActionType.signOut]: AuthStage.signingOut,
      },
    },
  },
};

export const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const currentStage = state.stage;
  const nextStage = stateChart.states[currentStage].on[action.type];

  if (nextStage == null || currentStage === nextStage) return state;

  switch (action.type) {
    case AuthActionType.checkAuth:
      return {
        stage: nextStage as AuthStage.checking,
      };

    case AuthActionType.checkToken:
      return {
        stage: nextStage as AuthStage.checkingToken,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.signIn:
      switch (action.payload.method) {
        case SignInMethod.oauth:
          return {
            stage: nextStage as AuthStage.signingIn,
            method: SignInMethod.oauth,
            oauthState: action.payload.oauthState,
          };
        case SignInMethod.directInput:
          return {
            stage: nextStage as AuthStage.signingIn,
            method: SignInMethod.directInput,
            accessToken: action.payload.accessToken,
          };
        default:
          return state;
      }

    case AuthActionType.signOut:
      return {
        stage: nextStage as AuthStage.signingOut,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.authorize:
      return {
        stage: nextStage as AuthStage.authorized,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case AuthActionType.unauthorize:
      return {
        stage: nextStage as AuthStage.unauthorized,
        error: action.payload && action.payload.reason,
      };
  }
};

const initialState: AuthState = {
  stage: AuthStage.unknown,
};

export const AuthContext = createContext<AuthState>(null as any);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  null as any,
);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let hasCancelled = false;

    const safeDispatch: Dispatch<AuthAction> = action => {
      if (!hasCancelled) dispatch(action);
    };

    switch (state.stage) {
      case AuthStage.unknown:
        safeDispatch({ type: AuthActionType.checkAuth });
        break;

      case AuthStage.checking:
        handleChecking();
        break;

      case AuthStage.checkingToken:
        handleCheckingToken();
        break;

      case AuthStage.authorized:
        handleAuthorized();
        break;

      case AuthStage.unauthorized:
        handleUnauthorized();
        break;

      case AuthStage.signingIn:
        handleSigningIn();
        break;

      case AuthStage.signingOut:
        handleSigningOut();
        break;
    }

    async function handleChecking() {
      if (state.stage !== AuthStage.checking) return;

      try {
        const data = await localforage.getItem<
          { accessToken: string } | undefined
        >(LOCALSTORAGE_AUTH_KEY);
        const accessToken = data ? data.accessToken : undefined;

        if (accessToken) {
          const user = await getCurrentAccount(accessToken);
          safeDispatch({
            type: AuthActionType.authorize,
            payload: { accessToken, user },
          });
        } else {
          safeDispatch({ type: AuthActionType.unauthorize });
        }
      } catch (error) {
        safeDispatch({ type: AuthActionType.unauthorize });
      }
    }

    async function handleCheckingToken() {
      if (state.stage !== AuthStage.checkingToken) return;

      try {
        const user = await getCurrentAccount(state.accessToken);
        safeDispatch({
          type: AuthActionType.authorize,
          payload: { accessToken: state.accessToken, user },
        });
      } catch {
        safeDispatch({
          type: AuthActionType.unauthorize,
          payload: { reason: 'Authorization failed' },
        });
      }
    }

    async function handleAuthorized() {
      if (state.stage !== AuthStage.authorized) return;

      try {
        await localforage.setItem(LOCALSTORAGE_AUTH_KEY, {
          accessToken: state.accessToken,
        });
      } catch {}
    }

    async function handleUnauthorized() {
      if (state.stage !== AuthStage.unauthorized) return;

      try {
        await localforage.removeItem(LOCALSTORAGE_AUTH_KEY);
      } catch {}
    }

    async function handleSigningIn() {
      if (state.stage !== AuthStage.signingIn) return;

      switch (state.method) {
        case SignInMethod.directInput:
          try {
            const user = await getCurrentAccount(state.accessToken);
            return safeDispatch({
              type: AuthActionType.authorize,
              payload: { accessToken: state.accessToken, user },
            });
          } catch {
            return safeDispatch({
              type: AuthActionType.unauthorize,
              payload: {
                reason: 'Failed to authorize you with provided access token',
              },
            });
          }

        case SignInMethod.oauth:
          if (!hasCancelled) {
            safeDispatch({ type: AuthActionType.unauthorize });
            return window.location.replace(loginUrl(state.oauthState));
          }
      }
    }

    async function handleSigningOut() {
      if (state.stage !== AuthStage.signingOut) return;

      try {
        await revokeToken(state.accessToken);
      } catch {
        // No need to act on this. Revoking the token is not critical.
      } finally {
        safeDispatch({ type: AuthActionType.unauthorize });
      }
    }

    return () => {
      hasCancelled = true;
    };
  }, [state]);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const useAuthorized = () => {
  const auth = useAuth();
  if (auth.stage !== AuthStage.authorized) {
    throw new Error('User not authorized');
  }

  return auth;
};

const cookie = new Cookie();
export const useAuthSignIn = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();

  const handleOauth = () => {
    if (auth.stage === AuthStage.unauthorized) {
      const uid = nanoid();
      cookie.set(OAUTH_STATE_COOKIE, uid, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });

      dispatch({
        type: AuthActionType.signIn,
        payload: { method: SignInMethod.oauth, oauthState: uid },
      });
    }
  };

  const handleDirectInput = (accessToken: string) => {
    if (auth.stage === AuthStage.unauthorized) {
      dispatch({
        type: AuthActionType.signIn,
        payload: { method: SignInMethod.directInput, accessToken },
      });
    }
  };

  return { handleOauth, handleDirectInput };
};

export const useAuthSignOut = () => {
  const dispatch = useAuthDispatch();
  const auth = useAuth();
  return () => {
    if (auth.stage === AuthStage.authorized) {
      dispatch({
        type: AuthActionType.signOut,
        payload: { accessToken: auth.accessToken },
      });
    }
  };
};

export const useAuthReciever = (location?: Location) => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const hasHandled = useRef(false);

  useEffect(() => {
    if (!location) return;
    if (hasHandled.current) return;

    const query = qs.parse(location.search.replace(/^\?/, ''));
    const { access_token } = query;
    dispatch({
      type: AuthActionType.checkToken,
      payload: { accessToken: access_token },
    });

    hasHandled.current = true;
  }, [auth.stage, location, dispatch]);
};

/**
 * =========== HELPER FUNCTIONS ===========
 */
async function revokeToken(accessToken: string): Promise<void> {
  await dropbox.api.post('/auth/token/revoke', undefined, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

async function getCurrentAccount(accessToken: string): Promise<DropboxUser> {
  const { data: user } = await dropbox.api.post(
    '/users/get_current_account',
    undefined,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  return user;
}

const REACT_APP_REDIRECT_URL = safeEnv('REACT_APP_REDIRECT_URL');
const REACT_APP_DROPBOX_CLIENT_ID = safeEnv('REACT_APP_DROPBOX_CLIENT_ID');

function loginUrl(state?: string) {
  const redirectUri =
    trailingSlash(window.location.origin) +
    unleadingSlash(REACT_APP_REDIRECT_URL);

  return `https://www.dropbox.com/oauth2/authorize?${qs.stringify({
    response_type: 'code',
    redirect_uri: redirectUri,
    client_id: REACT_APP_DROPBOX_CLIENT_ID,
    state,
  })}`;
}
