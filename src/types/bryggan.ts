export interface Page {
  id: string;
  link: string;
  page: string;
  year: string;
  issue: string;
  name: string;
  path: string;
  clientModified: string;
  serverModified: string;
}

export type PersistedAuthSet = { accessToken: string };
export type PersistedAuthGet = PersistedAuthSet | null;
