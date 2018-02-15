// @flow
import type { ComponentType } from 'react';

export type AppData = {
  dropbox_root: string,
  dropbox_token: string,
};

export type Issue = {
  id: string,
  name: string,
  coverSrc: string,
};

export type UserProfile = {
  displayName?: string,
  photoURL?: string,
};

export interface User {
  displayName: ?string;
  email: ?string;
  updateProfile(profile: UserProfile): Promise<void>;
}

export type LinkItem = {
  to: string,
  title: string,
  icon?: ComponentType<*>,
  links?: Array<LinkItem>,
};
