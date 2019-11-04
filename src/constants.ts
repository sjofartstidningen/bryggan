export const LOCALSTORAGE_AUTH_KEY = 'auth-storage';
export const LOCALSTORAGE_POST_SIGN_IN_KEY = 'post-sign-in';
export const OAUTH_STATE_COOKIE = 'oauth_state';

export const PATH_SIGN_IN = '/sign-in';
export const PATH_AUTH_HANDLER = '/dropbox-auth-handler';

export const MENU_PROFILE = 'profile';

export const REDIRECT_URL = ensureEnv(
  process.env.REACT_APP_REDIRECT_URL,
  'REACT_APP_REDIRECT_URL',
);

export const DROPBOX_CLIENT_ID = ensureEnv(
  process.env.REACT_APP_DROPBOX_CLIENT_ID,
  'REACT_APP_DROPBOX_CLIENT_ID',
);

function ensureEnv(envValue: string | undefined, name: string) {
  if (!envValue)
    throw new Error(`Environment variable ${name} must be defined`);
  return envValue;
}
