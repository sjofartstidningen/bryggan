// @flow
import axios from 'axios';

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
type Entry = FileMetaData | FolderMetaData;
type FilesListFolderArgs = {
  path: string,
  recursive?: boolean,
  sortBy?: (a: Entry, b: Entry) => number,
};
type FilesListFolder = AxiosResponse<
  {
    entries: Array<Entry>,
    cursor: string,
    has_more: boolean,
  },
  *,
>;

export const filesListFolder = (
  { path, recursive = false, sortBy }: FilesListFolderArgs = {},
): FilesListFolder =>
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
type FilesGetThumbnailArgs = {
  path: string,
  format?: 'jpeg' | 'png',
  size?: 'w32h32' | 'w64h64' | 'w128h128' | 'w640h480' | 'w1024h768',
};
type FilesGetThumbnail = AxiosResponse<Blob, { 'dropbox-api-result': string }>;

export const filesGetThumbnail = (
  { path, format = 'jpeg', size = 'w64h64' }: FilesGetThumbnailArgs = {},
): FilesGetThumbnail =>
  dropboxContent({
    method: 'get',
    url: '/files/get_thumbnail',
    params: { arg: JSON.stringify({ path, format, size }) },
    responseType: 'blob',
  });
