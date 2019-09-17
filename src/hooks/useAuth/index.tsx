import React, {
  useReducer,
  useEffect,
  Dispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import qs from 'qs';
import nanoid from 'nanoid';
import Cookie from 'universal-cookie';
import { DropboxUser } from 'types/dropbox';
import { OAUTH_STATE_COOKIE } from '../../constants';
import { handleStateChange } from './state-handler';

export enum AuthStatus {
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

/**
 * A user can choose to authorize using either direct input, e.g. pasting in an
 * access token recieved, or by using standard oauth redirect method.
 */
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

/**
 * The Auth state can be in only n placec at a given point in time, and
 * different props are attached to it at that time.
 */
export type AuthState =
  | {
      status: AuthStatus.unknown;
    }
  | {
      status: AuthStatus.checking;
    }
  | {
      status: AuthStatus.checkingToken;
      accessToken: string;
    }
  | {
      status: AuthStatus.authorized;
      accessToken: string;
      user: DropboxUser;
    }
  | {
      status: AuthStatus.unauthorized;
      error?: string;
    }
  | {
      status: AuthStatus.signingIn;
    } & SigningInState
  | {
      status: AuthStatus.signingOut;
      accessToken: string;
    };

export interface StateChart {
  initial: AuthStatus;
  states: {
    [key in AuthStatus]: {
      on: {
        [key in AuthActionType]?: AuthStatus;
      };
    };
  };
}

/**
 * The state chart describes which states can transition to each other, and by
 * which event. This is used to prevent state updates from colliding an taking
 * precedence over each other.
 */
const stateChart: StateChart = {
  initial: AuthStatus.unknown,
  states: {
    [AuthStatus.unknown]: {
      on: {
        [AuthActionType.checkAuth]: AuthStatus.checking,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.checking]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.checkingToken]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.signingIn]: {
      on: {
        [AuthActionType.authorize]: AuthStatus.authorized,
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.signingOut]: {
      on: {
        [AuthActionType.unauthorize]: AuthStatus.unauthorized,
      },
    },
    [AuthStatus.unauthorized]: {
      on: {
        [AuthActionType.signIn]: AuthStatus.signingIn,
        [AuthActionType.checkToken]: AuthStatus.checkingToken,
      },
    },
    [AuthStatus.authorized]: {
      on: {
        [AuthActionType.signOut]: AuthStatus.signingOut,
      },
    },
  },
};

/**
 * The reudecer handles every finitely possible state transition. If an action
 * happening on the current state doesn't exists on that states chart on the
 * state chart the state transition will be prevented.
 *
 * This will prevent action overriding other actions and securing the use of
 * async updates.
 *
 * @param {AuthState} state
 * @param {AuthAction} action
 * @returns {AuthState}
 */
export const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const currentStatus = state.status;
  const nextStatus = stateChart.states[currentStatus].on[action.type];

  if (nextStatus == null || currentStatus === nextStatus) return state;

  switch (action.type) {
    case AuthActionType.checkAuth:
      return {
        status: nextStatus as AuthStatus.checking,
      };

    case AuthActionType.checkToken:
      return {
        status: nextStatus as AuthStatus.checkingToken,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.signIn:
      switch (action.payload.method) {
        case SignInMethod.oauth:
          return {
            status: nextStatus as AuthStatus.signingIn,
            method: SignInMethod.oauth,
            oauthState: action.payload.oauthState,
          };
        case SignInMethod.directInput:
          return {
            status: nextStatus as AuthStatus.signingIn,
            method: SignInMethod.directInput,
            accessToken: action.payload.accessToken,
          };
        default:
          return state;
      }

    case AuthActionType.signOut:
      return {
        status: nextStatus as AuthStatus.signingOut,
        accessToken: action.payload.accessToken,
      };

    case AuthActionType.authorize:
      return {
        status: nextStatus as AuthStatus.authorized,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };

    case AuthActionType.unauthorize:
      return {
        status: nextStatus as AuthStatus.unauthorized,
        error: action.payload && action.payload.reason,
      };
  }
};

const initialState: AuthState = {
  status: AuthStatus.unknown,
};

export const AuthContext = createContext<AuthState>(null as any);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  null as any,
);

/**
 * Provide the global auth context to all it's children.
 *
 * @param {PropsWithChildren<{}>} { children }
 * @returns {JSX.Element}
 */
export const AuthProvider = ({
  children,
}: PropsWithChildren<{}>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let hasCancelled = false;
    const safeDispatch: Dispatch<AuthAction> = action => {
      if (!hasCancelled) dispatch(action);
    };

    handleStateChange(state, safeDispatch);

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
  if (auth.status !== AuthStatus.authorized) {
    throw new Error('User not authorized');
  }

  return auth;
};

const cookie = new Cookie();
export const useAuthSignIn = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();

  const handleOauth = () => {
    if (auth.status === AuthStatus.unauthorized) {
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
    if (auth.status === AuthStatus.unauthorized) {
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
    if (auth.status === AuthStatus.authorized) {
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
  }, [auth.status, location, dispatch]);
};
