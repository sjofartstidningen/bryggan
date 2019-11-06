import { gql } from 'apollo-server-lambda';

export const Files = gql`
  union Metadata = FileMetadata | FolderMetadata

  type FileMetadata {
    id: ID!
    name: String!
    clientModified: String!
    serverModified: String!
    rev: String!
    size: Int!
    pathLower: String
    pathDisplay: String
    mediaInfo: MediaInfo!
    # symlinkInfo: SymlinkInfo
    # sharingInfo: FileSharingInfo
    isDownloadable: Boolean!
    # exportInfo: ExportInfo
    # propertyGroups: [PropertyGroup]
    hasExplicitSharedMembers: Boolean
    contentHash: String
  }

  type FolderMetadata {
    id: ID!
    name: String!
    pathLower: String
    pathDisplay: String
    # sharingInfo: FolderSharingInfo
    # propertyGroups: [PropertyGroup]
  }

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

  input ListFolderInput {
    path: String!
    recursive: Boolean
  }

  extend type Query {
    listFolder(arg: ListFolderInput!): [Metadata]!
  }
`;
