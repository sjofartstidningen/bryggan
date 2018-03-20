// @flow
export type MagazinePagePreview = {
  [x: string]: string,
};

export type MagazineEntry = {
  id: string,
  name: string,
  path: string,
  url: string,
  preview: MagazinePagePreview,
};

export type MagazineFolder = {
  entries: Array<string>,
};

export type MagazineYear = {
  id: string,
  name: string,
  path: string,
  url: string,
  preview: MagazinePagePreview,
  entries: Array<string>,
};
export type MagazineIssue = {
  id: string,
  name: string,
  path: string,
  url: string,
  preview: MagazinePagePreview,
  entries: Array<string>,
};

export type MagazinePage = {
  id: string,
  name: string,
  path: string,
  url: string,
  preview: MagazinePagePreview,
  modified: string,
  src: string,
};
