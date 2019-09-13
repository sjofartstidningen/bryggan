import React, {
  createContext,
  useState,
  useMemo,
  useReducer,
  Dispatch,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import localforage from 'localforage';
import qs from 'qs';
import {
  dropboxAuthReducer,
  initialState,
  DropboxAuthAction,
  DropboxAuthState,
  DropboxAuthActionType,
  DropboxAuthStage,
  DropboxErrorType,
} from './authReducer';
import { NavigateFn } from '@reach/router';
import axios, { AxiosInstance } from 'axios';
import { DropboxUser } from 'types/dropbox';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import { safeEnv } from '../../env';
import { trailingSlash, unleadingSlash } from 'utils';

interface LocalStorageProps {
  accessToken?: string;
  user?: DropboxUser;
}

type DropboxAuthContextProps = DropboxAuthState & {
  navigate: NavigateFn;
  skipInitialCheck(skip: boolean): void;
};

interface DropboxApiContextProps {
  api: AxiosInstance;
  content: AxiosInstance;
}

const DropboxAuthContext = createContext(
  (null as unknown) as DropboxAuthContextProps,
);
const DropboxAuthDispatchContext = createContext((null as unknown) as Dispatch<
  DropboxAuthAction
>);

const DropboxApiContext = createContext(
  (null as unknown) as DropboxApiContextProps,
);

interface DropboxAuthProviderProps {
  navigate: NavigateFn;
}

export const DropboxProvider: React.FC<DropboxAuthProviderProps> = ({
  navigate,
  children,
}) => {
  const [state, dispatch] = useReducer(dropboxAuthReducer, initialState);
  const skipInitial = useRef(false);

  const endpoints: DropboxApiContextProps = useMemo(() => {
    let headers: { [key: string]: string } = {};
    if (state.stage === DropboxAuthStage.authorized) {
      headers.Authorization = `Bearer ${state.accessToken}`;
    }

    return {
      api: axios.create({ baseURL: 'https://api.dropboxapi.com/2/', headers }),
      content: axios.create({
        baseURL: 'https://content.dropboxapi.com/2/',
        headers,
      }),
    };
  }, [state]);

  useEffect(() => {
    let postCleanup = false;

    const init = async () => {
      try {
        const storage = await localforage.getItem<LocalStorageProps>(
          LOCALSTORAGE_AUTH_KEY,
        );

        if (!postCleanup && !skipInitial.current) {
          if (storage.accessToken && storage.user) {
            dispatch({
              type: DropboxAuthActionType.setAuthorized,
              payload: { user: storage.user, accessToken: storage.accessToken },
            });
          } else {
            dispatch({ type: DropboxAuthActionType.setUnauthorized });
          }
        }
      } catch (error) {
        if (!postCleanup && !skipInitial.current) {
          dispatch({ type: DropboxAuthActionType.setUnauthorized });
        }
      }
    };

    init();
    return () => {
      postCleanup = true;
    };
  }, []);

  useEffect(() => {
    switch (state.stage) {
      case DropboxAuthStage.authorized:
        localforage.setItem<LocalStorageProps>(LOCALSTORAGE_AUTH_KEY, {
          accessToken: state.accessToken,
          user: state.user,
        });
        break;
      case DropboxAuthStage.unauthorized:
        localforage.removeItem(LOCALSTORAGE_AUTH_KEY);
        break;
    }
  });

  const skipInitialCheck = useCallback((skip: boolean) => {
    skipInitial.current = skip;
  }, []);

  const context: DropboxAuthContextProps = useMemo(
    () => ({
      ...state,
      skipInitialCheck,
      navigate,
    }),
    [state, navigate, skipInitialCheck],
  );

  return (
    <DropboxApiContext.Provider value={endpoints}>
      <DropboxAuthDispatchContext.Provider value={dispatch}>
        <DropboxAuthContext.Provider value={context}>
          {children}
        </DropboxAuthContext.Provider>
      </DropboxAuthDispatchContext.Provider>
    </DropboxApiContext.Provider>
  );
};

interface UseDropboxAuthMethods {
  isAuthenticated(): boolean;
  loginUrl(query?: { [key: string]: string }): string;
  logout(): Promise<void>;
  handleAuthentication(postLoginLink?: string): void;
}

export const useDropboxApi = () => useContext(DropboxApiContext);

export const useDropboxAuth = (): UseDropboxAuthMethods & DropboxAuthState => {
  const { navigate, skipInitialCheck, ...state } = useContext(
    DropboxAuthContext,
  );
  const dispatch = useContext(DropboxAuthDispatchContext);
  const { api } = useDropboxApi();

  const isAuthenticated = () => {
    return state.stage === DropboxAuthStage.authorized;
  };

  const loginUrl = (query: { [key: string]: string } = {}) => {
    const redirectUri =
      trailingSlash(window.location.origin) +
      unleadingSlash(safeEnv('REACT_APP_REDIRECT_URL'));

    return `https://www.dropbox.com/oauth2/authorize?${qs.stringify({
      ...query,
      response_type: 'code',
      redirect_uri: redirectUri,
      client_id: safeEnv('REACT_APP_DROPBOX_CLIENT_ID'),
    })}`;
  };

  const logout = async (): Promise<void> => {
    if (state.stage === DropboxAuthStage.authorized) {
      try {
        await api.post('/auth/token/revoke');
      } finally {
        dispatch({ type: DropboxAuthActionType.setUnauthorized });
      }
    }
  };

  const [hasHandled, setHasHandled] = useState(false);

  const handleAuthentication = useCallback(
    (postLoginRoute: string = '/') => {
      const handle = async () => {
        if (hasHandled) return;
        if (state.stage === DropboxAuthStage.authorized) return;

        dispatch({ type: DropboxAuthActionType.setUnknown });
        setHasHandled(true);
        skipInitialCheck(true);

        type QueryParams = {
          access_token?: string;
          error?: string;
          error_description?: string;
        };

        const query: QueryParams = qs.parse(
          window.location.search.replace(/^\?/, ''),
        );

        if (query.access_token != null) {
          try {
            const { data: user } = await api.post<DropboxUser>(
              '/users/get_current_account',
              undefined,
              { headers: { Authorization: `Bearer ${query.access_token}` } },
            );

            dispatch({
              type: DropboxAuthActionType.setAuthorized,
              payload: {
                accessToken: query.access_token,
                user,
              },
            });

            return navigate(postLoginRoute, { replace: true });
          } catch (error) {
            if (axios.isCancel(error)) return;
            return dispatch({
              type: DropboxAuthActionType.setAuthError,
              payload: {
                error: 'Failed to fetch user data',
                errorType: DropboxErrorType.userInfo,
              },
            });
          }
        }

        if (query.error != null) {
          return dispatch({
            type: DropboxAuthActionType.setAuthError,
            payload: {
              error: `${query.error}: ${query.error_description ||
                'Unspecified reason'}`,
              errorType: DropboxErrorType.authResult,
            },
          });
        }

        return dispatch({
          type: DropboxAuthActionType.setAuthError,
          payload: {
            error: 'No access token provided',
            errorType: DropboxErrorType.authResult,
          },
        });
      };

      handle();
    },
    [state.stage, hasHandled, api, dispatch, navigate, skipInitialCheck],
  );

  return {
    isAuthenticated,
    loginUrl,
    logout,
    handleAuthentication,
    ...state,
  };
};
