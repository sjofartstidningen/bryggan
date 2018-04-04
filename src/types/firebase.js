// @flow

export type UserProfile = {
  displayName?: string,
  photoURL?: string,
};

export interface User {
  uid: string;
  email: ?string;
  displayName: ?string;
  photoURL: ?string;
  updateProfile(profile: UserProfile): Promise<void>;
  emailVerified: boolean;
}

export type AuthCodes =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password';

export interface AuthError {
  code?: AuthCodes;
  message: string;
}

export type AppData = {
  dropbox_root: string,
  dropbox_token: string,
};

export type SignInCredentials = {
  email: string,
  password: string,
  remember: ?boolean,
};

export type AuthCheckEventHandler = (user: ?User) => void;
