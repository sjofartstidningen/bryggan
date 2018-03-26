// @flow
import React from 'react';
import type { Node } from 'react';
import { join } from 'path';
import createFetch from '../Fetch/createFetch';
import type { RenderProps } from '../Fetch/createFetch';
import type {
  ListFolderRequest,
  ListFolderResponse,
} from '../../types/dropbox';

const cacheSerializer = ({ url, data }) => JSON.stringify({ url, data });

const Dropbox = createFetch({
  displayName: 'Dropbox',
  baseURL: 'https://api.dropboxapi.com/2/',
  cacheSerializer,
  headers: { 'Content-Type': 'application/json' },
});

type ListFolderProps<R> = {
  path: string,
  accessToken: ?string,
  baseFolder: ?string,
  responseReducer: (res: ListFolderResponse) => R,
  children: (RenderProps<*>) => Node,
};

function ListFolder<R>({
  path,
  accessToken,
  baseFolder,
  responseReducer,
  children,
}: ListFolderProps<R>) {
  if (!accessToken || !baseFolder) return null;

  return (
    <Dropbox
      url="/files/list_folder"
      method="post"
      data={({ path: join(baseFolder, path) }: ListFolderRequest)}
      headers={{ Authorization: `Bearer ${accessToken}` }}
      responseReducer={responseReducer}
    >
      {children}
    </Dropbox>
  );
}

export { ListFolder as default };
