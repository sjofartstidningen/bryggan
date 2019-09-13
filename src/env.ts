export const REACT_APP_REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
export const REACT_APP_DROPBOX_CLIENT_ID =
  process.env.REACT_APP_DROPBOX_CLIENT_ID;
export const DROPBOX_CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET;
export const CONTEXT = process.env.CONTEXT;
export const URL = process.env.URL;
export const DEPLOY_PRIME_URL = process.env.DEPLOY_PRIME_URL;

const env = {
  REACT_APP_REDIRECT_URL,
  REACT_APP_DROPBOX_CLIENT_ID,
  DROPBOX_CLIENT_SECRET,
  CONTEXT,
  URL,
  DEPLOY_PRIME_URL,
};

export const safeEnv = (variable: keyof typeof env, fallback?: string) => {
  const value = env[variable] || fallback;
  if (value === undefined) {
    throw new Error(
      `Envrionment variable ${variable} must be defined or a fallback must be provided.`,
    );
  }

  return value;
};
