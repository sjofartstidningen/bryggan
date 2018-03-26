// @flow

interface MetadataBase {
  name: string;
  id: string;
  path_lower: string;
  path_display: string;
}

interface FileMetadata extends MetadataBase {
  tag: 'file';
  client_modified: string;
  server_modified: string;
  ref: string;
  size: number;
  content_hash: string;
}

interface FolderMetadata extends MetadataBase {
  tag: 'folder';
}

type Metadata = FileMetadata | FolderMetadata;

export interface ListFolderRequest {
  path: string;
  recursive?: boolean;
  include_media_info?: boolean;
  include_deleted?: boolean;
  include_has_explicit_shared_members?: boolean;
  include_mounted_folders?: boolean;
  limit?: number;
  shared_link?: { url: string, password?: string };
  include_property_groups?: { filter_name: Array<string> };
}

export interface ListFolderResponse {
  entries: Array<Metadata>;
  has_more: boolean;
  cursor: string;
}
