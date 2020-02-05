import {
  IFieldResolver,
  IResolverObject,
  IResolvers,
} from 'apollo-server-lambda';

import {
  GraphQLContext,
  ListFolderArgs,
  ThumbnailOptions,
  SearchOptions,
} from '../ts/types';
import {
  FileMetadata as FileMetadataType,
  FolderMetadata as FolderMetadataType,
} from '../ts/dropbox';

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
  FileMetadataType,
  GraphQLContext,
  { options?: ThumbnailOptions }
> = {
  thumbnail: (file, params = {}, { dataSources }) => {
    return dataSources.dropbox.getThumbnailUrl(file.id, params.options);
  },
};

const FolderMetadata: IResolverObject<
  FolderMetadataType,
  GraphQLContext,
  any
> = {
  content: (parent, args: Pick<ListFolderArgs, 'options'>, { dataSources }) => {
    const { id } = parent;
    return dataSources.dropbox.listFolder(id, args.options);
  },
};

const fileThumbnail: IFieldResolver<
  void,
  GraphQLContext,
  { path: string; options?: ThumbnailOptions }
> = (_, args, { dataSources }) => {
  return dataSources.dropbox.getThumbnailUrl(args.path, args.options);
};

const listFolder: IFieldResolver<any, GraphQLContext, ListFolderArgs> = async (
  _,
  { path, options = {} },
  { dataSources },
) => {
  return dataSources.dropbox.listFolder(path, options);
};

const search: IFieldResolver<
  any,
  GraphQLContext,
  { query: string; options?: SearchOptions }
> = async (_, args, { dataSources }) => {
  return dataSources.dropbox.search(args.query, args.options);
};

const files: IResolvers<any, GraphQLContext> = {
  Metadata,
  FileMetadata,
  FolderMetadata,
  Query: {
    listFolder,
    fileThumbnail,
    search,
  },
};

export default files;
