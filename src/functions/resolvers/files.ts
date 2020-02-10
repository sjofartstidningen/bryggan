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

import * as re from '../../utils/regex';

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
  thumbnail: (file, args = {}, { dataSources }) => {
    return dataSources.dropbox.getThumbnailUrl(file.id, args.options);
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
  thumbnail: (
    parent: any,
    args: { options?: ThumbnailOptions },
    { dataSources },
  ) => {
    let path: string = parent.pathLower;
    const [, year, issue] = re.path().exec(path) ?? [];

    switch (true) {
      case !!year && !!issue:
        path = `${path}/${year}-${issue}-001.pdf`;
        break;
      case !!year:
        path = `${path}/01/${year}-01-001.pdf`;
        break;

      default:
        return null;
    }

    return dataSources.dropbox.getThumbnailUrl(path, args.options);
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

const createFilteredListFolder = (
  tag: 'folder' | 'file',
): IFieldResolver<any, GraphQLContext, ListFolderArgs> => async (
  _,
  { path, options = {} },
  { dataSources },
) => {
  const content = await dataSources.dropbox.listFolder(path, options);
  const edges = content.edges.filter(edge => edge.node['.tag'] === tag);
  return {
    ...content,
    edges,
  };
};

const search: IFieldResolver<
  any,
  GraphQLContext,
  { query: string; options?: SearchOptions }
> = async (_, args, { dataSources }) => {
  const cursor = args.options?.after;

  if (cursor) return dataSources.dropbox.searchContinue(cursor);
  return dataSources.dropbox.search(args.query, args.options);
};

const files: IResolvers<any, GraphQLContext> = {
  Metadata,
  FileMetadata,
  FolderMetadata,
  Query: {
    listFolder,
    folders: createFilteredListFolder('folder'),
    files: createFilteredListFolder('file'),
    fileThumbnail,
    search,
  },
};

export default files;
