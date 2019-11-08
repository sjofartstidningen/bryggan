import { gql } from 'apollo-server-lambda';

export const Files = gql`
  #####
  # Base types
  #####

  type MetadataConnection {
    edges: [MetadataEdge]!
    pageInfo: PageInfo!
  }

  type MetadataEdge {
    node: Metadata!
  }

  union Metadata = FileMetadata | FolderMetadata

  type FileMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
    clientModified: String!
    serverModified: String!
    rev: String!
    size: Int!
    isDownloadable: Boolean!
    hasExplicitSharedMembers: Boolean
    contentHash: String
    url: String!
    thumbnail(options: ThumbnailOptions): Thumbnail
    # symlinkInfo: SymlinkInfo
    # sharingInfo: FileSharingInfo
    # exportInfo: ExportInfo
    # propertyGroups: [PropertyGroup]
  }

  type FolderMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
    # sharingInfo: FolderSharingInfo
    # propertyGroups: [PropertyGroup]
  }

  #####
  # Thumbnail
  #####

  type Thumbnail {
    url: String!
    format: ThumbnailFormat!
    size: ThumbnailSize!
    mode: ThumbnailMode!
  }

  enum ThumbnailFormat {
    jpeg
    png
  }

  enum ThumbnailSize {
    w32h32
    w64h64
    w128h128
    w256h256
    w480h320
    w640h480
    w960h640
    w1024h768
    w2048h1536
  }

  enum ThumbnailMode {
    strict
    bestfit
    fitoneBestfit
  }

  input ThumbnailOptions {
    format: ThumbnailFormat
    size: ThumbnailSize
    mode: ThumbnailMode
  }

  #####
  # Queries
  #####

  input ListFolderOptions {
    recursive: Boolean
    first: Int
    after: String
  }

  extend type Query {
    listFolder(path: PathLike!, options: ListFolderOptions): MetadataConnection!
    getThumbnail(path: PathLike!, options: ThumbnailOptions): Thumbnail!
  }
`;
