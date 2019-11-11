import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import qs from 'qs';
import {
  ListFolderArgs,
  Connection,
  GraphQLContext,
  ThumbnailOptions,
  ThumbnailFormat,
  ThumbnailSize,
  ThumbnailMode,
  SearchOptions,
} from '../ts/types';
import { ListFolderResult, DropboxUser, SearchV2Result } from '../ts/dropbox';
import {
  camelCaseKeys,
  snakeCaseKeys,
  snakeCaseValues,
} from '../../utils/object';
import { createConnection } from '../utils';

class DropboxAPI extends RESTDataSource<GraphQLContext> {
  contentURL: string;

  constructor() {
    super();
    this.baseURL = 'https://api.dropboxapi.com/2';
    this.contentURL = 'https://content.dropboxapi.com/2';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async listFolder(
    path: string,
    options: ListFolderArgs['options'] = {},
  ): Promise<Connection<any>> {
    let data: ListFolderResult;

    if (options.after) {
      data = await this.post<ListFolderResult>('/files/list_folder/continue', {
        cursor: options.after,
      });
    } else {
      data = await this.post('/files/list_folder', {
        path,
        limit: options.first || 500,
      });
    }

    return createConnection(data.entries, {
      hasMore: data.has_more,
      cursor: data.cursor,
    });
  }

  async search(query: string, options: SearchOptions) {
    const data = await this.post<SearchV2Result>('/files/search_v2', {
      query,
      options: {
        path: options.path,
        file_categories: options.fileCategories,
      },
    });

    const edges = data.matches.map(match => match.metadata.metadata);
    return createConnection(edges, {
      hasMore: data.has_more,
      cursor: data.cursor,
    });
  }

  async getCurrentAccount(): Promise<DropboxUser> {
    const user = await this.post<DropboxUser>('/users/get_current_account');
    return camelCaseKeys(user);
  }

  async getUser({ id }: { id: string }) {
    const user = await this.post<DropboxUser>('/users/get_account', {
      account_id: id,
    });
    return camelCaseKeys(user);
  }

  getThumbnailUrl(path: string, options: ThumbnailOptions = {}) {
    const mergedOptions = {
      format: ThumbnailFormat.jpeg,
      size: ThumbnailSize.w64h64,
      mode: ThumbnailMode.strict,
      ...options,
    };

    const args = snakeCaseKeys(snakeCaseValues(mergedOptions));

    const queryArgs = {
      arg: JSON.stringify({ path, ...args }),
      authorization: this.context.token,
    };

    return {
      url: `${this.contentURL}/files/get_thumbnail?${qs.stringify(queryArgs)}`,
      ...mergedOptions,
    };
  }
}

export { DropboxAPI };
