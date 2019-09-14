import React, {
  useReducer,
  useEffect,
  Dispatch,
  createContext,
  PropsWithChildren,
} from 'react';
import localforage from 'localforage';
import { DropboxUser } from 'types/dropbox';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import { useAsyncEffect } from 'hooks/useAsyncEffect';

enum AuthStage {
  unknown = 'unknown',
  checking = 'checking',
  authorized = 'authorized',
  unauthorized = 'unauthorized',
  signingIn = 'signing-in',
  signingOut = 'signing-out',
}

enum AuthActionType {
  checkAuth = 'checkAuth',
  signIn = 'sign-in',
  signOut = 'sign-out',
  authorize = 'authorize',
  unauthorize = 'unauthorize',
}

enum SignInMethod {
  oauth = 'oauth',
  paste = 'paste',
}

type AuthAction =
  | {
      type: AuthActionType.checkAuth;
    }
  | {
      type: AuthActionType.authorize;
      payload: { user: DropboxUser; accessToken: string };
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

type SigningInState =
  | { method: SignInMethod.oauth }
  | { method: SignInMethod.paste; accessToken: string };

type AuthState =
  | {
      stage: AuthStage.unknown;
    }
  | {
      stage: AuthStage.checking;
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

interface StateChartStates {
  on: {
    [key in AuthActionType]?: AuthStage;
  };
}

interface StateChart {
  initial: AuthStage;
  states: {
    [key in AuthStage]: StateChartStates;
  };
}

const stateChart: StateChart = {
  initial: AuthStage.unknown,
  states: {
    [AuthStage.unknown]: {
      on: {
        [AuthActionType.checkAuth]: AuthStage.checking,
      },
    },
    [AuthStage.checking]: {
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

  if (!nextStage || currentStage === nextStage) return state;

  switch (action.type) {
    case AuthActionType.checkAuth:
      return { stage: nextStage as AuthStage.checking };

    case AuthActionType.signIn:
      switch (action.payload.method) {
        case SignInMethod.oauth:
          return {
            stage: nextStage as AuthStage.signingIn,
            method: action.payload.method,
          };
        case SignInMethod.paste:
          return {
            stage: nextStage as AuthStage.signingIn,
            method: action.payload.method,
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

const AuthContext = createContext<AuthState>(null as any);
const AuthDispatchContext = createContext<Dispatch<AuthAction>>(null as any);

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
      const data = await localforage.getItem<
        { accessToken: string; user: DropboxUser } | undefined
      >(LOCALSTORAGE_AUTH_KEY);
      if (data) {
        safeDispatch({ type: AuthActionType.authorize, payload: data });
      } else {
        safeDispatch({ type: AuthActionType.unauthorize });
      }
    }

    async function handleAuthorized() {
      if (state.stage !== AuthStage.authorized) return;
      try {
        await localforage.setItem(LOCALSTORAGE_AUTH_KEY, {
          accessToken: state.accessToken,
          user: state.user,
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
      try {
        switch (state.method) {
          case SignInMethod.paste:
            const user: DropboxUser = await getUser(state.accessToken);
            return safeDispatch({
              type: AuthActionType.authorize,
              payload: { accessToken: state.accessToken, user },
            });
          case SignInMethod.oauth:
            if (!hasCancelled) return window.location.replace(loginUrl());
        }
      } catch (error) {
        safeDispatch({
          type: AuthActionType.unauthorize,
          payload: {
            reason: 'Failed to authorize you with provided access token',
          },
        });
      }
    }

    async function handleSigningOut() {
      if (state.stage !== AuthStage.signingOut) return;
      try {
        await revokeToken(state.accessToken);
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

async function revokeToken(accesToken: string): Promise<void> {}

async function getUser(accessToken: string): Promise<any> {
  return null;
}

function loginUrl() {
  return '';
}
