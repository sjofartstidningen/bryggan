/* eslint-disable no-use-before-define */
// @flow
import type { ComponentType } from 'react';

export type AppData = {
  dropbox_root: string,
  dropbox_token: string,
};

export type Year = {
  id: string,
  name: string,
  issues: Array<Issue>,
};

export type Issue = {
  id: string,
  name: string,
  path: string,
  coverSrc: string,
};

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

export type LinkItem = {
  to: string,
  title: string,
  icon?: ComponentType<*>,
  links?: Array<LinkItem>,
};

export type SignInCredentials = {
  email: string,
  password: string,
  remember: ?boolean,
};

export type Route = {
  path?: string,
  title: string | ((params: { [x: string]: ?string }) => string),
  exact?: boolean,
  strict?: boolean,
  sensitive?: boolean,
};

export type MagazineEntry = {
  id: string,
  name: string,
  url: string,
  cover: string,
  caption: string,
};

export type MagazineYear = {
  id: string,
  name: string,
  url: string,
  cover: string,
  caption: string,
};

export type MagazineIssue = {
  id: string,
  name: string,
  url: string,
  cover: string,
  caption: string,
};
