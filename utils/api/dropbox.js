import axios from 'axios';
import URL from 'url';

const dbUrl = prefix => `https://${prefix}.dropboxapi.com/2`;

const dropboxRPC = axios.create({
  baseURL: dbUrl('api'),
  headers: { 'Content-Type': 'application/json' },
});

const dropboxContent = axios.create({
  baseURL: dbUrl('content'),
  params: { reject_cors_preflight: true },
  headers: { 'Content-Type': 'text/plain; charset=dropbox-cors-hack' },
});

/**
 * filesListFolder
 */
export const filesListFolder = (
  { path, recursive = false, sortBy, accessToken } = {},
) =>
  dropboxRPC({
    method: 'post',
    url: '/files/list_folder',
    data: { path, recursive },
    headers: { Authorization: `Bearer ${accessToken}` },
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
const determineSize = ({ width, height }) => {
  const sizes = [
    { width: 32, height: 32, label: 'w32h32' },
    { width: 64, height: 64, label: 'w64h64' },
    { width: 128, height: 128, label: 'w128h128' },
    { width: 640, height: 480, label: 'w640h480' },
    { width: 1024, height: 768, label: 'w1024h768' },
  ];

  const bestMatch = sizes.find(dim => {
    const { width: w, height: h } = dim;
    return width < w && height < h;
  });

  return bestMatch.label || 'w1024h768';
};

export const filesGetThumbnail = (
  { path, format = 'jpeg', dimensions = {}, accessToken } = {},
) =>
  dropboxContent({
    method: 'get',
    url: '/files/get_thumbnail',
    params: {
      authorization: `Bearer ${accessToken}`,
      arg: JSON.stringify({ path, format, size: determineSize(dimensions) }),
    },
    responseType: 'blob',
  });

export const filesGetThumbnailSrc = (
  { path, format = 'jpeg', size = 'w64h64', accessToken } = {},
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

export const filesDownloadUrl = ({ path, accessToken } = {}) =>
  URL.format({
    protocol: 'https:',
    hostname: 'content.dropboxapi.com',
    pathname: '/2/files/download',
    query: {
      authorization: `Bearer ${accessToken}`,
      reject_cors_preflight: true,
      arg: JSON.stringify({ path }),
    },
  });
