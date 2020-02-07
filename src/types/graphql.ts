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

export interface Search_search_edges_node_FileMetadata {
  __typename: 'FileMetadata';
  name: string;
  id: string;
  pathDisplay: string | null;
  clientModified: string;
  serverModified: string;
}

export interface Search_search_edges_node_FolderMetadata {
  __typename: 'FolderMetadata';
  name: string;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
