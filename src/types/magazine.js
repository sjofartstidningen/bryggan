// @flow
export type MagazinePagePreview = {
  [x: string]: string,
};

export type MagazineEntry = {
  id: string,
  name: string,
  path: string,
  preview: MagazinePagePreview,
};

type MagazineFolder = {
  entries: Array<string>,
};

export type MagazineYear = MagazineFolder & MagazineEntry;
export type MagazineIssue = MagazineFolder & MagazineEntry;

export type MagazinePage = {
  modified: string,
  src: string,
} & MagazineEntry;
