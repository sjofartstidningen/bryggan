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
  emailVerified: boolean;
  updateProfile(profile: UserProfile): Promise<void>;
  sendEmailVerification(): Promise<void>;
}

export type AuthErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password';

export interface AuthError extends Error {
  code?: AuthErrorCode;
}

export type AppData = {
  dropbox_root: string,
  dropbox_token: string,
  dropbox_token_v2: string,
  dropbox_member_id: string,
  dropbox_root_namespace_id: string,
};

export type SignInCredentials = {
  email: string,
  password: string,
  remember: ?boolean,
};

export type AuthCheckEventHandler = (user: ?User) => void;
