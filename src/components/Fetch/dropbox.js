// @flow
import React from 'react';
import type { Node } from 'react';
import { join } from 'path';
import axios from 'axios';
import Fetch from '.';
import { MinimalCache } from '../../utils/cache';
import type {
  ListFolderResponse,
  MappedListFolderResponse,
} from '../../types/dropbox';
import pathRe, { page as pageRe } from '../../utils/regexp';
import { UserConsumer } from '../../contexts/User';
import { generateDownloadUrl, generatePreview } from '../../utils/dropbox';

const client = axios.create({
  baseURL: 'https://api.dropboxapi.com/2/',
  headers: { 'Content-Type': 'application/json' },
});

const cache = new MinimalCache({ serializer: conf => conf.data.path });

const responseReducer = ({ accessToken, rootFolder }) => (
  res: ListFolderResponse,
): MappedListFolderResponse =>
  res.entries.map(entry => {
    const [, year, issue, page] = pathRe().exec(entry.path_display);
    const pageName = page && pageRe().exec(`${page}.pdf`)[3];

    const previews = generatePreview({
      year,
      issue,
      page: pageName,
      accessToken,
      rootFolder,
    });

    return {
      type: entry['.tag'],
      id: entry.id,
      name: pageName || entry.name,
      path: entry.path_display,
      url: join(year || '', issue || '', page || ''),
      previews,
      src: generateDownloadUrl({
        path: entry.path_display,
        accessToken,
        rootFolder,
      }),
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
    <UserConsumer>
      {({ data }) => (
        <Fetch
          {...rest}
          client={client}
          cache={cache}
          url="/files/list_folder"
          method="post"
          headers={{ Authorization: `Bearer ${data.dropbox_token}` }}
          data={{ path: join(data.dropbox_root, path) }}
          responseReducer={responseReducer({
            accessToken: data.dropbox_token,
            rootFolder: data.dropbox_root,
          })}
        >
          {children}
        </Fetch>
      )}
    </UserConsumer>
  );
}

export { FilesListFolder };
