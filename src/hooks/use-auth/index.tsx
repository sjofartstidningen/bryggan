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
import { OAUTH_STATE_COOKIE } from '../../constants';
import { handleStateChange } from './state-handler';
import {
  AuthStatus,
  AuthActionType,
  SignInMethod,
  AuthAction,
  AuthState,
} from './types';
import { reducer, initialState } from './reducer';

export * from './types';

export const AuthContext = createContext<AuthState>(null as any);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  null as any,
);

/**
 * Provide the global auth context to all it's children together with the
 * dispatch context.
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

/**
 * Use the global auth state read from AuthContext
 *
 * @returns {AuthState}
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Use global auth dispatch function read from AuthDispatchContext
 *
 * @returns {Dispatch<AuthAction>}
 */
export const useAuthDispatch = () => useContext(AuthDispatchContext);

/**
 * Use auth state ensured to be authorized. If used when auth state may not be
 * authorized it will throw an error.
 *
 * @returns {{ status: AuthStatus.authorized, accessToken: string, user: DropboxUser }}
 */
export const useAuthorized = () => {
  const auth = useAuth();
  if (auth.status !== AuthStatus.authorized) {
    throw new Error('User not authorized');
  }

  return auth;
};

/**
 * Hook returning two event handlers. One to use on a button when the user wants
 * to authorize using standard oauth flow. And the other one which accepts an
 * access token string as input for when the user wants to provide an access
 * token directly instead of going thru the oauth flow.
 *
 * @returns {{ handleOauth: () => void; handleDirectInput: (accessToken: string) => void }}
 */
export const useAuthSignIn = () => {
  const auth = useAuth();
  const dispatch = useAuthDispatch();

  const handleOauth = () => {
    if (auth.status === AuthStatus.unauthorized) {
      const cookie = new Cookie();

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

/**
 * This hook provides an onClick handler which will sign out the current user.
 *
 * @returns {() => void}
 */
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

/**
 * This hook should be called on an auth handler route. It will try to read the
 * provided access token from the url and validate it before determine if the
 * user is authorized or not.
 *
 * @param {Location | undefined} location
 */
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

export const useAuthEffect = (
  effect: (state: AuthState) => void | (() => void | undefined),
) => {
  const auth = useAuth();
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => effectRef.current(auth), [auth]);
};
