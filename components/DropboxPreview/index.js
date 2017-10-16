// @flow
import React from 'react';
import { format } from 'url';

type Props = { path: string };

export default function DropboxPreview({ path }: Props = {}) {
  const url = format({
    protocol: 'https:',
    hostname: 'content.dropboxapi.com',
    pathname: '/2/files/get_thumbnail',
    query: {
      authorization: `Bearer ${process.env.DROPBOX_ACCESS_TOKEN || ''}`,
      reject_cors_preflight: true,
      arg: JSON.stringify({ path }),
    },
  });

  return <img src={url} alt="" />;
}
