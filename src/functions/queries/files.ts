import { gql } from 'apollo-server-lambda';

export const Files = gql`
  #####
  # Base types
  #####

  interface ItemMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
  }

  union Metadata = FileMetadata | FolderMetadata

  type FileMetadata implements ItemMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
    clientModified: String!
    serverModified: String!
    rev: String!
    size: Int!
    mediaInfo: MediaInfo!
    # symlinkInfo: SymlinkInfo
    # sharingInfo: FileSharingInfo
    isDownloadable: Boolean!
    # exportInfo: ExportInfo
    # propertyGroups: [PropertyGroup]
    hasExplicitSharedMembers: Boolean
    contentHash: String
    url: String!
    thumbnail(options: ThumbnailOptions): Thumbnail
  }

  type FolderMetadata implements ItemMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
    # sharingInfo: FolderSharingInfo
    # propertyGroups: [PropertyGroup]
  }

  #####
  # Media
  #####

  union MediaInfo = PhotoMetadata | VideoMetadata

  type PhotoMetadata {
    dimensions: Dimensions
    location: GpsCoordinates
    timeTaken: String
  }

  type VideoMetadata {
    dimensions: Dimensions
    location: GpsCoordinates
    timeTaken: String
    duration: Int
  }

  type Dimensions {
    height: Int!
    width: Int!
  }

  type GpsCoordinates {
    latitude: Float!
    longitude: Float!
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
    format: ThumbnailFormat!
    size: ThumbnailSize
    mode: ThumbnailMode
  }

  #####
  # Queries
  #####

  input ListFolderOptions {
    recursive: Boolean
  }

  extend type Query {
    listFolder(path: PathLike!, options: ListFolderOptions): [Metadata]!
    getThumbnail(path: PathLike!, options: ThumbnailOptions): Thumbnail
  }
`;
