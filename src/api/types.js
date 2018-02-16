// @flow
import type { CancelToken, $AxiosXHR } from 'axios';

type FileMetadata = {
  '.tag': 'file',
  name: string,
  id: string,
  client_modified: string,
  server_modified: string,
  rev: string,
  size: number,
  path_lower: string,
  path_display: string,
};

type FolderMetadata = {
  '.tag': 'folder',
  name: string,
  id: string,
  path_lower: string,
  path_display: string,
};

type MetaData = FileMetadata | FolderMetadata;

export type FilesListFolderProps = {
  folder: string,
  recursive?: boolean,
  cancelToken?: CancelToken,
};

export type FilesListFolderResponse = $AxiosXHR<{
  entries: Array<MetaData>,
  cursor: string,
  has_more: boolean,
}>;

export type FilesDownloadResponse = $AxiosXHR<Blob>

export type ThumbnailSize =
  | 'w32h32'
  | 'w64h64'
  | 'w128h128'
  | 'w256h256'
  | 'w480h320'
  | 'w640h480'
  | 'w960h640'
  | 'w1024h768'
  | 'w2048h1536';

export type GetThumbUrlProps = {
  file: string,
  format?: 'jpeg' | 'png',
  size?: ThumbnailSize,
  mode?: 'strict' | 'bestfit' | 'fitone_bestfit',
};

export type FilesDownloadProps = {
  file: string,
  cancelToken?: CancelToken,
};
