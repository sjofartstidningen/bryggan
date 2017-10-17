/* eslint-disable no-undef */
// @flow

type PhotoMetaData = {
  '.tag': 'photo',
  dimensions: { height: number, width: number },
  location: ?string,
  time_taken: ?string,
};

type VideoMetaData = {
  '.tag': 'video',
  dimensions: { height: number, width: number },
  location: ?string,
  time_taken: ?string,
  duration: ?number,
};

type MediaInfo = {
  '.tag': 'metadata',
  metadata: PhotoMetaData | VideoMetaData,
};

type FolderSharingInfo = {
  read_only: boolean,
  parent_shared_folder_id: ?string,
  shared_folder_id: ?string,
  traverse_only: boolean,
  no_access: boolean,
};

type PropertyGroup = {
  template_id: string,
  fields: { name: string, value: string }[],
};

declare type FileMetaData = {
  '.tag': 'file',
  name: string,
  id: string,
  client_modified: string,
  server_modified: string,
  rev: string,
  size: number,
  path_lower: string,
  path_display: string,
  media_info?: MediaInfo,
  sharing_info: ?FolderSharingInfo,
  property_groups: PropertyGroup[],
  has_explicit_shared_members?: boolean,
  content_hash: string,
};

declare type FolderMetaData = {
  '.tag': 'folder',
  name: string,
  id: string,
  path_lower: string,
  path_display: string,
  sharing_info: ?FolderSharingInfo,
  property_groups?: PropertyGroup[],
};
