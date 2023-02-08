import React from 'react';
import PropTypes from 'prop-types';
import { join } from 'path';
import axios from 'axios';
import Fetch from '.';
import { MinimalCache } from '../../utils/cache';
import pathRe, { page as pageRe } from '../../utils/regexp';
import { UserConsumer } from '../../contexts/User';
import { generateDownloadUrl, generatePreview } from '../../utils/dropbox';

const client = axios.create({
  baseURL: 'https://api.dropboxapi.com/2/',
  headers: { 'Content-Type': 'application/json' },
});

const cache = new MinimalCache({ serializer: conf => conf.data.path });

const responseReducer = ({ accessToken, rootFolder }) => res =>
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

function FilesListFolder({ path, children, ...rest }) {
  return (
    <UserConsumer>
      {({ data }) => (
        <Fetch
          {...rest}
          client={client}
          cache={cache}
          url="/files/list_folder"
          method="post"
          headers={{
            Authorization: `Bearer ${data.dropbox_token_v2}`,
            'Dropbox-API-Select-User': data.dropbox_member_id,
            'Dropbox-API-Path-Root': JSON.stringify({
              '.tag': 'root',
              root: data.dropbox_root_namespace_id,
            }),
          }}
          data={{ path: join(data.dropbox_root, path) }}
          responseReducer={responseReducer({
            accessToken: data.dropbox_token_v2,
            rootFolder: data.dropbox_root,
          })}
        >
          {children}
        </Fetch>
      )}
    </UserConsumer>
  );
}

FilesListFolder.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export { FilesListFolder };
