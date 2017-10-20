// @flow
import { filesListFolder, filesGetThumbnailSrc } from '../../utils/api/dropbox';
import * as constants from './constants';

import * as types from './types';

export const addYears = (payload: {
  years: types.Year[],
}): types.ActionAddYears => ({
  type: constants.ADD_YEARS,
  payload,
});

export const addIssues = (payload: {
  year: string,
  issues: types.Issue[],
}): types.ActionAddIssues => ({
  type: constants.ADD_ISSUES,
  payload,
});

export const addPages = (payload: {
  year: string,
  issue: string,
  pages: types.Page[],
}): types.ActionAddPages => ({
  type: constants.ADD_PAGES,
  payload,
});

export const fetchError = (
  payload: types.FetchError,
): types.ActionFetchError => ({
  type: constants.FETCH_ERROR,
  payload,
});

export function getYears(): types.ThunkAction {
  return async dispatch => {
    try {
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);
      const { data } = await filesListFolder({ path: '/Bryggan', sortBy });
      const years: types.Year[] = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));

      return dispatch(addYears({ years }));
    } catch (e) {
      const message = e.response ? e.response.message : e.message;
      return dispatch(fetchError({ message }));
    }
  };
}

export function getIssues(year: string): types.ThunkAction {
  return async dispatch => {
    try {
      const path = `/Bryggan/${year}`;
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);

      const { data } = await filesListFolder({ path, sortBy });
      const issues: types.Issue[] = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          year,
          path: entry.path_lower,
          coverSrc: filesGetThumbnailSrc({
            path: `${entry.path_lower}/${year}-${entry.name}-001.pdf`,
            size: 'w640h480',
          }),
        }));

      return dispatch(addIssues({ year, issues }));
    } catch (e) {
      const message = e.response ? e.response.message : e.message;
      return dispatch(fetchError({ message }));
    }
  };
}

export function getPages(year: string, issue: string): types.ThunkAction {
  return async dispatch => {
    try {
      const path = `/Bryggan/${year}/${issue}`;
      const sortBy = (a, b) => (a.name > b.name ? 1 : -1);

      // $FlowFixMe
      const { data } = await filesListFolder({ path, sortBy });
      const pages: types.Page[] = data.entries
        .filter(entry => entry['.tag'] === 'file')
        .map(entry => {
          const updatedAt: string = entry.client_modified || '';
          const updatedBy: string = entry.sharing_info
            ? entry.sharing_info.modified_by || ''
            : '';

          return {
            id: entry.id,
            name: entry.name,
            path: entry.path_lower,
            updated_at: updatedAt,
            updated_by: updatedBy,
            coverSrc: filesGetThumbnailSrc({
              path: entry.path_lower,
              size: 'w640h480',
            }),
          };
        });

      return dispatch(addPages({ year, issue, pages }));
    } catch (e) {
      const message = e.response ? e.response.message : e.message;
      return dispatch(fetchError({ message }));
    }
  };
}
