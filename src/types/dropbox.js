// @flow

interface MetadataBase {
  name: string;
  id: string;
  path_lower: string;
  path_display: string;
}

interface FileMetadata extends MetadataBase {
  ['.tag']: 'file';
  client_modified: string;
  server_modified: string;
  ref: string;
  size: number;
  content_hash: string;
}

interface FolderMetadata extends MetadataBase {
  ['.tag']: 'folder';
}

type Metadata = FileMetadata | FolderMetadata;

export type ListFolderRequest = {
  path: string,
  recursive?: boolean,
  include_media_info?: boolean,
  include_deleted?: boolean,
  include_has_explicit_shared_members?: boolean,
  include_mounted_folders?: boolean,
  limit?: number,
  shared_link?: { url: string, password?: string },
  include_property_groups?: { filter_name: Array<string> },
};

export type ListFolderResponse = {
  entries: Array<Metadata>,
  has_more: boolean,
  cursor: string,
};

export type PreviewWidth =
  | '32'
  | '64'
  | '128'
  | '256'
  | '480'
  | '640'
  | '960'
  | '1024'
  | '2048';

export type Previews = { [x: PreviewWidth]: string };

export type Entry = {
  type: 'file' | 'folder',
  id: string,
  name: string,
  path: string,
  url: string,
  previews: Previews,
  src: string,
}

export type MappedListFolderResponse = Array<Entry>;
