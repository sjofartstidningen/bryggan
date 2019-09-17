import { createResource } from './create-resource';
import { api } from 'api/dropbox';
import { ListFolderResult, SpaceUsage } from 'types/dropbox';

export const directoryContent = createResource(async (path: string) => {
  const { data } = await api.post<ListFolderResult>('/files/list_folder', {
    path,
  });
  return data;
});

export const spaceUsage = createResource(async (_: string) => {
  const { data } = await api.post<SpaceUsage>('users/get_space_usage');
  return data;
});
