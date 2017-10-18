// @flow
import { filesListFolder, filesGetThumbnailSrc } from '../../utils/api/dropbox';
import { ADD_YEARS, ADD_ISSUES, FETCH_ERROR } from './constants';

import type {
  Year,
  Issue,
  FetchError,
  ActionAddYears,
  ActionAddIssues,
  ActionFetchError,
  ThunkAction,
} from './types';

export const addYears = (payload: { years: Year[] }): ActionAddYears => ({
  type: ADD_YEARS,
  payload,
});

export const addIssues = (payload: {
  year: string,
  issues: Issue[],
}): ActionAddIssues => ({
  type: ADD_ISSUES,
  payload,
});

export const fetchError = (payload: FetchError): ActionFetchError => ({
  type: FETCH_ERROR,
  payload,
});

export function getYears(): ThunkAction {
  return async dispatch => {
    try {
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);
      const { data } = await filesListFolder({ path: '/Bryggan', sortBy });
      const years: Year[] = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));

      return dispatch(addYears({ years }));
    } catch (e) {
      if (e.response)
        return dispatch(fetchError({ message: e.response.message }));

      return dispatch(fetchError({ message: e.message }));
    }
  };
}

export function getIssues(year: string): ThunkAction {
  return async dispatch => {
    try {
      const path = `/Bryggan/${year}`;
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);

      const { data } = await filesListFolder({ path, sortBy });
      const issues: Issue[] = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
          coverSrc: filesGetThumbnailSrc({
            path: `${entry.path_lower}/${year}-${entry.name}-001.pdf`,
            size: 'w640h480',
          }),
        }));

      return dispatch(addIssues({ year, issues }));
    } catch (e) {
      if (e.response)
        return dispatch(fetchError({ message: e.response.message }));

      return dispatch(fetchError({ message: e.message }));
    }
  };
}
