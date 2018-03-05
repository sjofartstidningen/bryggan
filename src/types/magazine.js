// @flow
export type MagazinePagePreview = {
  '32': string,
  '64': string,
  '128': string,
  '256': string,
  '480': string,
  '640': string,
  '960': string,
  '1024': string,
  '2048': string,
};

export type MagazineEntry = {
  id: string,
  name: string,
  path: string,
  preview: MagazinePagePreview,
};

export type MagazineYear = {
  issues: Array<string>,
} & MagazineEntry;

export type MagazineIssue = {
  pages: Array<string>,
} & MagazineEntry;

export type MagazinePage = {
  modified: string,
  src: string,
} & MagazineEntry;
