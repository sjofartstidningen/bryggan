import { createResource } from './create-resource';
import { api } from 'api/dropbox';
import { ListFolderResult } from 'types/dropbox';

export const directoryContent = createResource(async (path: string) => {
  const { data } = await api.post<ListFolderResult>('/files/list_folder', {
    path,
  });
  return data;
});
