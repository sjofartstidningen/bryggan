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
  email: ?string;
  displayName: ?string;
  photoURL: ?string;
  updateProfile(profile: UserProfile): Promise<void>;
}

export type LinkItem = {
  to: string,
  title: string,
  icon?: ComponentType<*>,
  links?: Array<LinkItem>,
};
