import { gql } from 'apollo-server-lambda';

export const Files = gql`
  #####
  # Base types
  #####

  type MetadataConnection {
    edges: [MetadataEdge!]!
    pageInfo: PageInfo!
  }

  type MetadataEdge {
    node: Metadata!
  }

  union Metadata = FileMetadata | FolderMetadata

  type FileMetadataConnection {
    edges: [FileMetadataEdge!]!
    pageInfo: PageInfo!
  }

  type FileMetadataEdge {
    node: FileMetadata!
  }

  type FolderMetadataConnection {
    edges: [FolderMetadataEdge!]!
    pageInfo: PageInfo!
  }

  type FolderMetadataEdge {
    node: FolderMetadata!
  }

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
    content(options: ListFolderOptions): MetadataConnection!
    thumbnail(options: ThumbnailOptions): Thumbnail
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

  enum FileCategory {
    image
    document
    pdf
    spreadsheet
    presentation
    audio
    video
    folder
    paper
    others
  }

  #####
  # Queries
  #####

  input ListFolderOptions {
    first: Int
    after: String
  }

  input ThumbnailOptions {
    format: ThumbnailFormat
    size: ThumbnailSize
    mode: ThumbnailMode
  }

  input SearchOptions {
    first: Int
    after: String
    path: PathLike
    fileCategories: [FileCategory!]
  }

  extend type Query {
    listFolder(path: PathLike!, options: ListFolderOptions): MetadataConnection!
    folders(
      path: PathLike!
      options: ListFolderOptions
    ): FolderMetadataConnection!
    files(path: PathLike!, options: ListFolderOptions): FileMetadataConnection!
    fileThumbnail(path: PathLike!, options: ThumbnailOptions): Thumbnail!
    search(query: String!, options: SearchOptions): MetadataConnection!
  }
`;
