import { FileMetadata, Metadata, FolderMetadata } from '../types/dropbox';
import { Page } from '../types/bryggan';
import * as re from './regex';

const getDataFromName = (
  fileName: string,
): { page: string; issue: string; year: string } => {
  const result = fileName.match(re.page());

  if (result && result[1] && result[2] && result[3]) {
    return { page: result[3], issue: result[2], year: result[1] };
  }

  throw new Error(`Could not extract data from filename ${fileName}`);
};

export const mapMetadata = (meta: FileMetadata): Page => {
  const { page, issue, year } = getDataFromName(meta.name);
  return {
    page,
    year,
    issue,
    id: meta.id,
    link: `/${year}/${issue}/${page}`,
    name: meta.name,
    path: meta.path_display,
    clientModified: meta.client_modified,
    serverModified: meta.server_modified,
  };
};

export const filterFileMetadata = (data: Metadata): data is FileMetadata => {
  return data['.tag'] === 'file';
};

export const filterFolder = (data: Metadata): data is FolderMetadata => {
  return data['.tag'] === 'folder';
};
