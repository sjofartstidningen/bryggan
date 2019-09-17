import { Dispatch } from 'react';
import localforage from 'localforage';
import qs from 'qs';
import { trailingSlash, unleadingSlash } from 'utils';
import { safeEnv } from 'env';
import { DropboxUser } from 'types/dropbox';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import {
  AuthState,
  AuthAction,
  AuthStatus,
  AuthActionType,
  SignInMethod,
} from '.';
import * as dropbox from 'api/dropbox';

/**
 * The auth reducer will produce lots of different states and all of them must
 * be acted upon. `handleStateChange` will act upon them and perform the actions
 * neccessary.
 *
 * @export
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} dispatch
 */
export function handleStateChange(
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
): void {
  switch (state.status) {
    case AuthStatus.unknown:
      dispatch({ type: AuthActionType.checkAuth });
      break;

    case AuthStatus.checking:
      handleChecking(state, dispatch);
      break;

    case AuthStatus.checkingToken:
      handleCheckingToken(state, dispatch);
      break;

    case AuthStatus.authorized:
      handleAuthorized(state, dispatch);
      break;

    case AuthStatus.unauthorized:
      handleUnauthorized(state, dispatch);
      break;

    case AuthStatus.signingIn:
      handleSigningIn(state, dispatch);
      break;

    case AuthStatus.signingOut:
      handleSigningOut(state, dispatch);
      break;
  }
}

/**
 * Checking is probably the first state change that occurs after initial mount.
 * And it will check for an existing access token in local storage, verify that
 * it is still valid and then dispatching with an authorize or unauthorize
 * action.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} dispatch
 */
async function handleChecking(
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
) {
  if (state.status !== AuthStatus.checking) return;

  try {
    const data = await localforage.getItem<{ accessToken: string } | undefined>(
      LOCALSTORAGE_AUTH_KEY,
    );
    const accessToken = data ? data.accessToken : undefined;

    if (accessToken) {
      const user = await getCurrentAccount(accessToken);
      dispatch({
        type: AuthActionType.authorize,
        payload: { accessToken, user },
      });
    } else {
      dispatch({ type: AuthActionType.unauthorize });
    }
  } catch (error) {
    dispatch({ type: AuthActionType.unauthorize });
  }
}

/**
 * The checking token state can override the ”normal” checking state. It should
 * happen on an auth handler route. It will check for an access token on
 * `window.location.search`, verify it and dispatch the correct event.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} dispatch
 */
async function handleCheckingToken(
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
) {
  if (state.status !== AuthStatus.checkingToken) return;

  try {
    const user = await getCurrentAccount(state.accessToken);
    dispatch({
      type: AuthActionType.authorize,
      payload: { accessToken: state.accessToken, user },
    });
  } catch (err) {
    dispatch({
      type: AuthActionType.unauthorize,
      payload: { reason: 'Authorization failed' },
    });
  }
}

/**
 * Once the user is authorized the only thing that will happen is that the
 * access token is stored in localstorage.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} _
 */
async function handleAuthorized(state: AuthState, _: Dispatch<AuthAction>) {
  if (state.status !== AuthStatus.authorized) return;

  try {
    await localforage.setItem(LOCALSTORAGE_AUTH_KEY, {
      accessToken: state.accessToken,
    });
  } catch (err) {}
}

/**
 * Once unauthorized the only thing that needs to happen is that we should
 * remove the token from local storage so that it is not used again.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} _
 */
async function handleUnauthorized(state: AuthState, _: Dispatch<AuthAction>) {
  if (state.status !== AuthStatus.unauthorized) return;

  try {
    await localforage.removeItem(LOCALSTORAGE_AUTH_KEY);
  } catch (err) {}
}

/**
 * Sign in can happen in two ways – either the user wants to use the standard
 * oauth sign in flow and she/he will be redirected to the Oauth provider which
 * will later give back an access token.
 * Or the user can paste in an already existing access token and sign in
 * directly.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} dispatch
 */
async function handleSigningIn(
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
) {
  if (state.status !== AuthStatus.signingIn) return;

  switch (state.method) {
    case SignInMethod.directInput:
      try {
        const user = await getCurrentAccount(state.accessToken);
        return dispatch({
          type: AuthActionType.authorize,
          payload: { accessToken: state.accessToken, user },
        });
      } catch (err) {
        return dispatch({
          type: AuthActionType.unauthorize,
          payload: {
            reason: 'Failed to authorize you with provided access token',
          },
        });
      }

    case SignInMethod.oauth:
      dispatch({ type: AuthActionType.unauthorize });
      return window.location.replace(loginUrl(state.oauthState));
  }
}

/**
 * When signing out the only thing that should happen before fireing the
 * unauthorized event is to revoke the token from the oauth provider.
 *
 * @param {AuthState} state
 * @param {Dispatch<AuthAction>} dispatch
 */
async function handleSigningOut(
  state: AuthState,
  dispatch: Dispatch<AuthAction>,
) {
  if (state.status !== AuthStatus.signingOut) return;

  try {
    await revokeToken(state.accessToken);
  } catch (err) {
    // No need to act on this. Revoking the token is not critical.
  } finally {
    dispatch({ type: AuthActionType.unauthorize });
  }
}

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
