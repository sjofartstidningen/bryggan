import {
  ApolloError,
  IFieldResolver,
  IResolverObject,
  IResolvers,
} from 'apollo-server-lambda';
import qs from 'qs';
import { api, content } from '../../api/dropbox';
import {
  camelCaseKeys,
  snakeCaseKeys,
  snakeCaseValues,
} from '../../utils/object';

import {
  GraphQLContext,
  ListFolderArgs,
  ThumbnailOptions,
  ThumbnailFormat,
  ThumbnailSize,
  ThumbnailMode,
} from '../ts/types';
import {
  ListFolderResult,
  FileMetadata as FileMetadataType,
} from '../../types/dropbox';

const Metadata: IResolverObject<any, GraphQLContext> = {
  __resolveType: (obj: any) => {
    if (obj['.tag'] === 'file') {
      return 'FileMetadata';
    }

    if (obj['.tag'] === 'folder') {
      return 'FolderMetadata';
    }

    return null;
  },
};

const FileMetadata: IResolverObject<
  FileMetadataType | void,
  GraphQLContext,
  { path?: string; options?: ThumbnailOptions }
> = {
  thumbnail: (file, params = {}, context) => {
    const options = snakeCaseKeys(
      snakeCaseValues({
        format: ThumbnailFormat.jpeg,
        size: ThumbnailSize.w64h64,
        mode: ThumbnailMode.strict,
        ...params.options,
      }),
    );

    const buildThumbnailUrl = (p: string) => {
      const queryArgs = {
        arg: JSON.stringify({
          path: p,
          ...options,
        }),
        authorization: context.token,
      };

      return `${content.defaults.baseURL}files/get_thumbnail?${qs.stringify(
        queryArgs,
      )}`;
    };

    if (file) {
      return {
        ...options,
        url: buildThumbnailUrl(file.id),
      };
    }

    if (params.path) {
      return {
        ...options,
        url: buildThumbnailUrl(params.path),
      };
    }

    return null;
  },
};

const listFolder: IFieldResolver<any, GraphQLContext, ListFolderArgs> = async (
  _,
  { path, options = {} },
) => {
  try {
    let data: ListFolderResult;

    if (options.after) {
      const res = await api.post<ListFolderResult>(
        '/files/list_folder/continue',
        { cursor: options.after },
      );
      data = res.data;
    } else {
      const body = {
        path,
        recursive: options.recursive ? true : false,
        limit: options.first || 500,
      };

      const res = await api.post<ListFolderResult>('/files/list_folder', body);
      data = res.data;
    }

    return {
      pageInfo: {
        hasNextPage: data.has_more,
        cursor: data.has_more ? data.cursor : null,
      },
      edges: data.entries.map(entry => ({ node: camelCaseKeys(entry) })),
    };
  } catch (error) {
    if (error.response) {
      throw new ApolloError(error.response.data.error_summary, 'NOT_FOUND');
    }

    throw error;
  }
};

const files: IResolvers<any, GraphQLContext> = {
  Metadata,
  FileMetadata,
  Query: {
    listFolder,
  },
};

export default files;