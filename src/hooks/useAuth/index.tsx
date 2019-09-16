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

/**
 * The state chart describes which states can transition to each other, and by
 * which event. This is used to prevent state updates from colliding an taking
 * precedence over each other.
 */
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
