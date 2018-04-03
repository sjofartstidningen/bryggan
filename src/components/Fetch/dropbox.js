// @flow
import React from 'react';
import type { Node } from 'react';
import { join } from 'path';
import axios from 'axios';
import dropbox from '../../api/dropbox';
import Fetch from './';
import { MinimalCache } from '../../utils/cache';
import type {
  ListFolderResponse,
  MappedListFolderResponse,
} from '../../types/dropbox';
import pathRe, { page as pageRe } from '../../utils/regexp';

const client = axios.create({
  baseURL: 'https://api.dropboxapi.com/2/',
  headers: { 'Content-Type': 'application/json' },
});

const cache = new MinimalCache({ serializer: conf => conf.data.path });

const responseReducer = (res: ListFolderResponse): MappedListFolderResponse =>
  res.entries.map(entry => {
    const [, year, issue, page] = pathRe().exec(entry.path_display);
    const pageName = page && pageRe().exec(`${page}.pdf`)[3];

    const previews = dropbox.generatePreview({
      year,
      issue,
      page: pageName,
    });

    return {
      type: entry['.tag'],
      id: entry.id,
      name: pageName || entry.name,
      path: entry.path_display,
      url: join(year || '', issue || '', page || ''),
      previews,
      src: dropbox.generateSrc(entry.path_display),
    };
  });

type RenderProps = {
  state: 'idle' | 'fetching' | 'fetched' | 'error' | 'aborted',
  fromCache: boolean,
  response: ?MappedListFolderResponse,
  error: ?Error,
};

type Props = {
  path: string,
  children: RenderProps => Node,
};

function FilesListFolder({ path, children, ...rest }: Props) {
  return (
    <Fetch
      {...rest}
      client={client}
      cache={cache}
      url="/files/list_folder"
      method="post"
      headers={{ Authorization: `Bearer ${dropbox.accessToken || ''}` }}
      data={{ path: join(dropbox.rootFolder || '', path) }}
      responseReducer={responseReducer}
    >
      {children}
    </Fetch>
  );
}

export { FilesListFolder };
