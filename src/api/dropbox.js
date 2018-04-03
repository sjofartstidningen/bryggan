// @flow
import { join } from 'path';
import qs from 'qs';
import axios from 'axios';
import type { CancelToken } from 'axios';
import * as re from '../utils/regexp';
import { MinimalCache } from '../utils/cache';

type Preview = {
  '32': string,
  '64': string,
  '128': string,
  '256': string,
  '480': string,
  '640': string,
  '960': string,
  '1024': string,
  '2048': string,
};

type Entry = {
  type: 'year' | 'issue' | 'page',
  tag: 'file' | 'folder',
  id: string,
  name: string,
  url: string,
  modified?: string,
  src?: string,
  preview: Preview,
};

type ListFolderReturn = Array<Entry>;

const getType = (name: string): ?('year' | 'issue' | 'page') => {
  if (re.year().test(name)) return 'year';
  if (re.issue().test(name)) return 'issue';
  if (re.page().test(name)) return 'page';
  return null;
};

class Dropbox {
  accessToken: ?string = null;
  rootFolder: ?string = null;
  cache: MinimalCache<string, string, ListFolderReturn> = new MinimalCache({
    serializer: x => x,
  });

  updateAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
  };

  updateRootFolder = (rootFolder: string) => {
    this.rootFolder = rootFolder;
  };

  async post(url: string, data: Object, cancelToken: CancelToken) {
    if (!this.accessToken) {
      throw new Error('Dropbox: accessToken and rootFolder must be defined');
    }

    try {
      const response = await axios.post(url, data, {
        baseURL: 'https://api.dropboxapi.com/2',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
        cancelToken,
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  generatePreview({
    year,
    issue = '01',
    page = '001',
  }: {
    year: string,
    issue?: string,
    page?: string,
  }): Preview {
    if (!this.rootFolder || !this.accessToken) {
      throw new Error('Dropbox: accessToken and rootFolder must be defined');
    }

    const baseURL = 'https://content.dropboxapi.com/2/files/get_thumbnail';
    const authorization = `Bearer ${this.accessToken}`;
    const generateUrl = (path: string, size: string) =>
      `${baseURL}?${qs.stringify({
        authorization,
        arg: JSON.stringify({
          path,
          size,
          format: 'jpeg',
          mode: 'fitone_bestfit',
        }),
      })}`;

    const path = join(
      this.rootFolder,
      year,
      issue,
      `${year}-${issue}-${page}.pdf`,
    );

    const previews = {
      '32': generateUrl(path, 'w32h32'),
      '64': generateUrl(path, 'w64h64'),
      '128': generateUrl(path, 'w128h128'),
      '256': generateUrl(path, 'w256h256'),
      '480': generateUrl(path, 'w480h320'),
      '640': generateUrl(path, 'w640h480'),
      '960': generateUrl(path, 'w960h640'),
      '1024': generateUrl(path, 'w1024h768'),
      '2048': generateUrl(path, 'w2048h1536'),
    };

    return previews;
  }

  generateSrc(path: string): string {
    if (!this.rootFolder || !this.accessToken) {
      throw new Error('Dropbox: accessToken and rootFolder must be defined');
    }

    const baseURL = 'https://content.dropboxapi.com/2/files/download';
    const authorization = `Bearer ${this.accessToken}`;
    const arg = JSON.stringify({ path });

    return `${baseURL}?${qs.stringify({ authorization, arg })}`;
  }

  mapToEntry = (entry: any): ?Entry => {
    const { id, name } = entry;
    const tag = entry['.tag'];
    const type = getType(entry.name);

    const [, year, issue, page] = re.default().exec(entry.path_display);

    switch (type) {
      case 'year':
        return {
          type,
          tag,
          id,
          name,
          url: join('/', year),
          preview: this.generatePreview({ year }),
        };

      case 'issue':
        return {
          type,
          tag,
          id,
          name,
          url: join('/', year, issue),
          preview: this.generatePreview({ year, issue }),
        };

      // eslint-disable-next-line
      case 'page':
        const [, , , pageName] = re.page().exec(`${page}.pdf`);
        return {
          type,
          tag,
          id,
          name: pageName,
          url: join('/', year, issue, pageName),
          modified: entry.client_modified,
          src: this.generateSrc(entry.path_lower),
          preview: this.generatePreview({ year, issue, page: pageName }),
        };

      default:
        return null;
    }
  };

  async metadata(
    path: string,
    {
      cancelToken = axios.CancelToken.source().token,
      ignoreCache = false,
    }: { cancelToken: CancelToken, ignoreCache: boolean } = {},
  ): Promise<ListFolderReturn> {
    if (!ignoreCache && this.cache.has(path)) {
      const fromCache = this.cache.get(path);
      if (fromCache) return fromCache;
    }

    if (!this.rootFolder || typeof this.rootFolder !== 'string') {
      throw new Error('Dropbox: rootFolder must be defined');
    }

    const config = { path: join(this.rootFolder, path) };
    const { data } = await this.post(
      '/files/get_metadata',
      config,
      cancelToken,
    );

    const file = [this.mapToEntry(data)].filter(Boolean);

    this.cache.set(path, file);
    return file;
  }

  async listFolder(
    path: string,
    {
      cancelToken = axios.CancelToken.source().token,
      ignoreCache = false,
    }: { cancelToken: CancelToken, ignoreCache: boolean } = {},
  ): Promise<ListFolderReturn> {
    if (!ignoreCache && this.cache.has(path)) {
      const fromCache = this.cache.get(path);
      if (fromCache) return fromCache;
    }

    if (!this.rootFolder || typeof this.rootFolder !== 'string') {
      throw new Error('Dropbox: rootFolder must be defined');
    }

    const config = { path: join(this.rootFolder, path) };
    const { data } = await this.post('/files/list_folder', config, cancelToken);
    const { entries } = data;

    const content = entries.map(this.mapToEntry).filter(Boolean);

    this.cache.set(path, content);
    return content;
  }
}

const dropbox = new Dropbox();

export { dropbox as default, Dropbox };
