const ensureEnv = (value: string | undefined, name: string) => {
  if (!value) throw new Error(`Environment variable ${name} must be defined`);
  return value;
};

export const REDIRECT_URL = ensureEnv(
  process.env.REACT_APP_REDIRECT_URL,
  'REACT_APP_REDIRECT_URL',
);

export const DROPBOX_CLIENT_ID = ensureEnv(
  process.env.REACT_APP_DROPBOX_CLIENT_ID,
  'REACT_APP_DROPBOX_CLIENT_ID',
);
