import { join } from 'path';
import axios from 'axios';
import qs from 'qs';

class DropboxError extends Error {
  constructor({ message, status, originalError, cancelled = false }) {
    super(message);
    this.status = status;
    this.originalError = originalError;
    this.cancelled = cancelled;
  }
}

class Dropbox {
  accessToken = null;
  rootFolder = '/';

  rpcEndpoint = axios.create({
    baseURL: 'https://api.dropboxapi.com/2',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  contentEndpoint = axios.create({
    baseURL: 'https://content.dropboxapi.com/2',
  });

  async rpc(config) {
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

  async content(config) {
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

  updateAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  updateRootFolder(rootFolder) {
    this.rootFolder = rootFolder;
  }

  getAuthBearer() {
    return `Bearer ${this.accessToken}`;
  }

  getThumbnailSize = (width, dpi = window.devicePixelRatio || 1) => {
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

  getThumbUrl({ file, size = 'w640h480', format = 'png', mode = 'bestfit' }) {
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

  async filesListFolder({ folder, recursive, cancelToken }) {
    try {
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
    } catch (err) {
      return this.handleError(err);
    }
  }

  async filesDownload({ file, cancelToken }) {
    try {
      const path = join(this.rootFolder, file);

      const response = await this.content({
        url: '/files/download',
        params: { arg: JSON.stringify({ path }) },
        cancelToken,
      });

      return response;
    } catch (err) {
      return this.handleError(err);
    }
  }

  handleError = error => {
    const newError = { originalError: error, cancelled: false };

    if (axios.isCancel(error)) {
      newError.message = error.message || 'Request canceled';
      newError.cancelled = true;
    } else if (error.response) {
      const { status } = error.response;
      newError.status = status;

      switch (status) {
        case 400:
          newError.message = error.response.data;
          break;
        case 401:
          newError.message = error.response.data.error_summary;
          break;
        case 403:
          newError.message = 'Current account type cannot access the resource.';
          break;
        case 409:
          newError.message = error.response.data.error_summary;
          break;
        case 429:
          newError.message = 'Too many requests';
          break;
        default:
          if (status > 499 && status < 600) {
            newError.message = 'Error on Dropbox servers';
          } else {
            newError.message = error.message;
          }
      }
    } else if (error.request) {
      newError.message =
        error.message ||
        "Request could't be sent probably due to internet connection";
    } else {
      newError.message =
        error.message || 'Something happend while setting up request';
    }

    throw new DropboxError(newError);
  };
}

const dropbox = new Dropbox();

export { dropbox as default, Dropbox };
