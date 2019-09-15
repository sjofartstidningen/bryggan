export interface Oauth2TokenResponse {
  access_token: string;
  token_type: 'bearer';
  account_id?: string;
  team_id?: string;
}

export interface DropboxUser {
  account_id: string;
  name: {
    given_name: string;
    surname: string;
    familiar_name: string;
    display_name: string;
    abbreviated_name: string;
  };
  email: string;
  email_verified: boolean;
  disabled: boolean;
  locale: string;
  referral_link: string;
  is_paired: boolean;
  account_type: { '.tag': 'basic' | 'pro' | 'professional' };
  root_info:
    | { '.tag': 'user'; root_namespace_id: string; home_namespace_id: string }
    | {
        '.tag': 'team';
        root_namespace_id: string;
        home_namespace_id: string;
        home_path: string;
      };
  profile_photo_url?: string;
  country: string;
  team?: {
    id: string;
    name: string;
    sharing_policies: {
      shared_folder_member_policy: {
        '.tag': 'team' | 'anyone';
      };
      shared_folder_join_policy: {
        '.tag': 'from_team_only' | 'from_anyone';
      };
      shared_link_create_policy: {
        '.tag': 'default_public' | 'default_team_only' | 'team_only';
      };
    };
    office_addin_policy: {
      '.tag': 'disabled' | 'enabled';
    };
  };
  team_member_id?: string;
}

type FileCategory =
  | 'image'
  | 'document'
  | 'pdf'
  | 'spreadsheet'
  | 'presentation'
  | 'audio'
  | 'video'
  | 'folder'
  | 'paper'
  | 'others';

export interface SearchOptions {
  path?: string;
  max_results?: number;
  file_status: 'active' | 'deleted';
  filename_only?: boolean;
  file_extensions?: string[];
  file_category: FileCategory[];
}

export interface SearchV2Arg {
  query: string;
  options?: SearchOptions;
  include_highlights?: boolean;
}

export interface HighlighSpan {
  highlight_str: string;
  is_highlighted: boolean;
}

export interface PropertField {
  name: string;
  value: string;
}

export interface PropertyGroup {
  template_id: string;
  fields: PropertField[];
}

export interface VideoMetadata {
  '.tag': 'video';
  dimensions?: { width: number; height: number };
  location?: { longitude: number; latitude: number };
  time_taken?: string;
  duration: number;
}

export interface PhotoMetadata {
  '.tag': 'photo';
  dimensions?: { width: number; height: number };
  location?: { longitude: number; latitude: number };
  time_taken?: string;
}

export type MediaInfo = { '.tag': 'pending' } | VideoMetadata | PhotoMetadata;

export interface SymlinkInfo {
  target: string;
}

export interface SharingInfo {
  read_only: boolean;
  parent_shared_folder_id: string;
}

export interface FileSharingInfo extends SharingInfo {
  modified_by?: string;
}

export interface FolderSharingInfo extends SharingInfo {
  shared_folder_id?: string;
  traverse_only: boolean;
  no_access: boolean;
}

export interface ExportInfo {
  export_as?: string;
}

export interface Metadata {
  '.tag': string;
  name: string;
  id: string;
  path_lower: string;
  path_display: string;
  property_groups?: PropertyGroup[];
}

export interface FileMetadata extends Metadata {
  '.tag': 'file';
  client_modified: string;
  server_modified: string;
  rev: string;
  size: number;
  media_info?: MediaInfo;
  symlink_info?: SymlinkInfo;
  sharing_info?: FileSharingInfo;
  is_downloadable: boolean;
  export_info?: ExportInfo;
  has_explicit_shared_members?: boolean;
  content_hash?: string;
}

export interface FolderMetadata extends Metadata {
  '.tag': 'folder';
  sharing_info?: FolderSharingInfo;
}

export interface DeletedMetadata extends Metadata {
  '.tag': 'deleted';
}

export interface MetadataV2 {
  '.tag': 'metadata';
  metadata: FileMetadata | FolderMetadata | DeletedMetadata;
}

export interface SearchMatchV2 {
  metadata: MetadataV2;
  highlight_spans?: HighlighSpan[];
}

export interface SearchV2Result {
  matches: SearchMatchV2[];
  has_more: boolean;
  cursor?: string;
}

export interface ListFolderResult {
  entries: (FileMetadata | FolderMetadata | DeletedMetadata)[];
  cursor?: string;
  has_more: boolean;
}

export type ThumbnailFormat = 'jpeg' | 'png';

export type ThumbnailSize =
  | 'w32h32'
  | 'w64h64'
  | 'w128h128'
  | 'w256h256'
  | 'w480h320'
  | 'w640h480'
  | 'w960h640'
  | 'w1024h768'
  | 'w2048h1536';

export type ThumbnailMode = 'strict' | 'bestfit' | 'fitone_bestfit';

export interface GetThumbnailArgs {
  path: string;
  format: ThumbnailFormat;
  size: ThumbnailSize;
  mode: ThumbnailMode;
}
