/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_currentAccount_name {
  __typename: 'Name';
  displayName: string;
}

export interface UserQuery_currentAccount {
  __typename: 'FullAccount';
  email: string;
  name: UserQuery_currentAccount_name;
  profilePhotoUrl: string | null;
}

export interface UserQuery {
  currentAccount: UserQuery_currentAccount;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_pageInfo {
  __typename: 'PageInfo';
  hasNextPage: boolean;
  cursor: string | null;
}

export interface Search_search_edges_node_FileMetadata_thumbnail {
  __typename: 'Thumbnail';
  url: string;
  size: ThumbnailSize;
}

export interface Search_search_edges_node_FileMetadata {
  __typename: 'FileMetadata';
  name: string;
  id: string;
  pathDisplay: string | null;
  clientModified: string;
  serverModified: string;
  thumbnail: Search_search_edges_node_FileMetadata_thumbnail | null;
}

export interface Search_search_edges_node_FolderMetadata {
  __typename: 'FolderMetadata';
  id: string;
}

export type Search_search_edges_node =
  | Search_search_edges_node_FileMetadata
  | Search_search_edges_node_FolderMetadata;

export interface Search_search_edges {
  __typename: 'MetadataEdge';
  node: Search_search_edges_node;
}

export interface Search_search {
  __typename: 'MetadataConnection';
  pageInfo: Search_search_pageInfo;
  edges: Search_search_edges[];
}

export interface Search {
  search: Search_search;
}

export interface SearchVariables {
  query: string;
  cursor?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Folders
// ====================================================

export interface Folders_folders_pageInfo {
  __typename: 'PageInfo';
  hasNextPage: boolean;
  cursor: string | null;
}

export interface Folders_folders_edges_node_thumbnail {
  __typename: 'Thumbnail';
  url: string;
}

export interface Folders_folders_edges_node {
  __typename: 'FolderMetadata';
  id: string;
  name: string;
  pathDisplay: string | null;
  thumbnail: Folders_folders_edges_node_thumbnail | null;
}

export interface Folders_folders_edges {
  __typename: 'FolderMetadataEdge';
  node: Folders_folders_edges_node;
}

export interface Folders_folders {
  __typename: 'FolderMetadataConnection';
  pageInfo: Folders_folders_pageInfo;
  edges: Folders_folders_edges[];
}

export interface Folders {
  folders: Folders_folders;
}

export interface FoldersVariables {
  path: GraphQL_PathLike;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FoldersQuery
// ====================================================

export interface FoldersQuery_folders_pageInfo {
  __typename: 'PageInfo';
  hasNextPage: boolean;
  cursor: string | null;
}

export interface FoldersQuery_folders_edges_node_thumbnail {
  __typename: 'Thumbnail';
  url: string;
}

export interface FoldersQuery_folders_edges_node {
  __typename: 'FolderMetadata';
  id: string;
  name: string;
  pathDisplay: string | null;
  thumbnail: FoldersQuery_folders_edges_node_thumbnail | null;
}

export interface FoldersQuery_folders_edges {
  __typename: 'FolderMetadataEdge';
  node: FoldersQuery_folders_edges_node;
}

export interface FoldersQuery_folders {
  __typename: 'FolderMetadataConnection';
  pageInfo: FoldersQuery_folders_pageInfo;
  edges: FoldersQuery_folders_edges[];
}

export interface FoldersQuery {
  folders: FoldersQuery_folders;
}

export interface FoldersQueryVariables {
  path: GraphQL_PathLike;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FileData
// ====================================================

export interface FileData_thumbnail {
  __typename: 'Thumbnail';
  url: string;
  size: ThumbnailSize;
}

export interface FileData {
  __typename: 'FileMetadata';
  name: string;
  id: string;
  pathDisplay: string | null;
  clientModified: string;
  serverModified: string;
  thumbnail: FileData_thumbnail | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FolderData
// ====================================================

export interface FolderData {
  __typename: 'FolderMetadata';
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ThumbnailSize {
  w1024h768 = 'w1024h768',
  w128h128 = 'w128h128',
  w2048h1536 = 'w2048h1536',
  w256h256 = 'w256h256',
  w32h32 = 'w32h32',
  w480h320 = 'w480h320',
  w640h480 = 'w640h480',
  w64h64 = 'w64h64',
  w960h640 = 'w960h640',
}

//==============================================================
// END Enums and Input Objects
//==============================================================
