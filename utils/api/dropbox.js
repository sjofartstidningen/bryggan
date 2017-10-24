import axios from 'axios';
import URL from 'url';

const accessToken = process.env.DROPBOX_ACCESS_TOKEN || '';

const dbUrl = prefix => `https://${prefix}.dropboxapi.com/2`;

const dropboxRPC = axios.create({
  baseURL: dbUrl('api'),
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

const dropboxContent = axios.create({
  baseURL: dbUrl('content'),
  params: {
    authorization: `Bearer ${accessToken}`,
    reject_cors_preflight: true,
  },
  headers: { 'Content-Type': 'text/plain; charset=dropbox-cors-hack' },
});

/**
 * filesListFolder
 */
export const filesListFolder = ({ path, recursive = false, sortBy } = {}) =>
  dropboxRPC({
    method: 'post',
    url: '/files/list_folder',
    data: { path, recursive },
  }).then(res => {
    if (!sortBy) return res;

    const { entries } = res.data;
    const sorted = entries.sort(sortBy);
    return {
      ...res,
      data: {
        ...res.data,
        entries: sorted,
      },
    };
  });

/**
 * filesGetThumbnail
 */
export const filesGetThumbnail = (
  { path, format = 'jpeg', size = 'w64h64' } = {},
) =>
  dropboxContent({
    method: 'get',
    url: '/files/get_thumbnail',
    params: { arg: JSON.stringify({ path, format, size }) },
    responseType: 'blob',
  });

export const filesGetThumbnailSrc = (
  { path, format = 'jpeg', size = 'w64h64' } = {},
) =>
  URL.format({
    protocol: 'https:',
    hostname: 'content.dropboxapi.com',
    pathname: '/2/files/get_thumbnail',
    query: {
      authorization: `Bearer ${accessToken}`,
      reject_cors_preflight: true,
      arg: JSON.stringify({ path, format, size }),
    },
  });
