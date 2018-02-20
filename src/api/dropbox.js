// @flow
import { join } from 'path';
import axios from 'axios';
import qs from 'qs';
import { matchPath } from 'react-router-dom';
import type {
  FilesListFolderProps,
  FilesListFolderResponse,
  GetThumbUrlProps,
  FilesDownloadProps,
  ThumbnailSize,
  FilesDownloadResponse,
} from './types';

type RequestConfig = {
  url: string,
  headers?: { [x: string]: string },
  [x: string]: any,
};

class Dropbox {
  accessToken: ?string = null;
  rootFolder: string = '/';

  rpcEndpoint = axios.create({
    baseURL: 'https://api.dropboxapi.com/2',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  contentEndpoint = axios.create({
    baseURL: 'https://content.dropboxapi.com/2',
  });

  async rpc(config: RequestConfig) {
    try {
      const response = await this.rpcEndpoint({
        method: 'post',
        ...config,
        headers: {
          Authorization: this.getAuthBearer(),
          ...(config.headers || {}),
        },
      });

      return response;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async content(config: RequestConfig) {
    try {
      const response = await this.contentEndpoint({
        method: 'get',
        responseType: 'blob',
        ...config,
        params: {
          authorization: this.getAuthBearer(),
          ...(config.params || {}),
        },
      });

      return response;
    } catch (err) {
      return this.handleError(err);
    }
  }

  updateAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  updateRootFolder(rootFolder: string) {
    this.rootFolder = rootFolder;
  }

  getAuthBearer() {
    if (this.accessToken) return `Bearer ${this.accessToken}`;
    throw new Error('Access token is not provided');
  }

  getThumbnailSize = (
    width: number,
    dpi: number = window.devicePixelRatio || 1,
  ): ThumbnailSize => {
    const widths = {
      w32h32: { w: 32, h: 32 },
      w64h64: { w: 64, h: 64 },
      w128h128: { w: 128, h: 128 },
      w256h256: { w: 256, h: 256 },
      w480h320: { w: 480, h: 320 },
      w640h480: { w: 640, h: 480 },
      w960h640: { w: 960, h: 640 },
      w1024h768: { w: 1024, h: 768 },
      w2048h1536: { w: 2048, h: 1536 },
    };

    const actualWidth = width * dpi;

    const keys = Object.keys(widths);
    let i = 0;

    while (i < keys.length) {
      const key = keys[i];
      const { w } = widths[key];

      if (w >= actualWidth) return key;
      i += 1;
    }

    return keys[keys.length - 1];
  };

  getThumbUrl({
    file,
    size = 'w640h480',
    format = 'png',
    mode = 'fitone_bestfit',
  }: GetThumbUrlProps): string {
    const baseURL = 'https://content.dropboxapi.com/2/files/get_thumbnail';
    const params = {
      authorization: this.getAuthBearer(),
      arg: JSON.stringify({
        path: join(this.rootFolder, file),
        format,
        size,
        mode,
      }),
    };

    return `${baseURL}?${qs.stringify(params)}`;
  }

  getCoverUrl({
    year,
    issue = '01',
    page = '001',
    size,
  }: {
    year: string,
    issue?: string,
    page?: string,
    size: ThumbnailSize,
  } = {}): string {
    return this.getThumbUrl({
      file: `${year}/${issue}/${year}-${issue}-${page}.pdf`,
      size,
    });
  }

  getCoverUrlFromPath(path: string, size: ThumbnailSize) {
    const match = matchPath(path, {
      path: '/:any/:year?/:issue?/:page?',
    });

    const { params } = match || {};
    const year = (params && params.year) || '';
    const issue = (params && params.issue) || '01';
    const page = (params && params.page) || '001';

    return this.getCoverUrl({
      year,
      issue,
      page,
      size,
    });
  }

  async filesListFolder({
    folder,
    recursive = false,
    cancelToken,
  }: FilesListFolderProps): Promise<FilesListFolderResponse> {
    const path = join(this.rootFolder, folder);

    const response = await this.rpc({
      url: '/files/list_folder',
      data: {
        path: path === '/' ? '' : path,
        recursive,
      },
      cancelToken,
    });

    return response;
  }

  async filesDownload({
    file,
    cancelToken,
  }: FilesDownloadProps): Promise<FilesDownloadResponse> {
    const path = join(this.rootFolder, file);

    const response = await this.content({
      url: '/files/download',
      params: { arg: JSON.stringify({ path }) },
      cancelToken,
    });

    return response;
  }

  handleError = (error: Error) => {
    throw error;
  };
}

const dropbox = new Dropbox();

export { dropbox as default, Dropbox };
