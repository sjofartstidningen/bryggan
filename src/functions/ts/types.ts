import { DropboxAPI } from '../data-sources/Dropbox';

export interface GraphQLContext {
  token: string;
  dataSources: {
    dropbox: DropboxAPI;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  cursor: string | null;
}

export interface Connection<T> {
  pageInfo: PageInfo;
  edges: { node: T }[];
}

export interface ListFolderArgs {
  path: string;
  options?: {
    recursive?: boolean;
    first?: number;
    after?: string;
  };
}

enum FileCategory {
  image = 'image',
  document = 'document',
  pdf = 'pdf',
  spreadsheet = 'spreadsheet',
  presentation = 'presentation',
  audio = 'audio',
  video = 'video',
  folder = 'folder',
  paper = 'paper',
  others = 'others',
}

export interface SearchOptions {
  path?: string;
  fileCategories?: FileCategory[];
}

export enum ThumbnailFormat {
  jpeg = 'jpeg',
  png = 'png',
}

export enum ThumbnailSize {
  w32h32 = 'w32h32',
  w64h64 = 'w64h64',
  w128h128 = 'w128h128',
  w256h256 = 'w256h256',
  w480h320 = 'w480h320',
  w640h480 = 'w640h480',
  w960h640 = 'w960h640',
  w1024h768 = 'w1024h768',
  w2048h1536 = 'w2048h1536',
}

export enum ThumbnailMode {
  strict = 'strict',
  bestfit = 'bestfit',
  fitoneBestfit = 'fitoneBestfit',
}

export interface ThumbnailOptions {
  format?: ThumbnailFormat;
  size?: ThumbnailSize;
  mode?: ThumbnailMode;
}
