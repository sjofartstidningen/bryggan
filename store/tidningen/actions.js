// @flow
import { filesListFolder } from '../../utils/api/dropbox';
import type {
  Year,
  // Issue,
  FetchError,
  ActionAddYears,
  // ActionAddIssues,
  ActionFetchError,
  ThunkAction,
} from './types';

export const ADD_YEARS = 'ADD_YEARS';
export const ADD_ISSUES = 'ADD_ISSUES';
export const FETCH_ERROR = 'FETCH_ERROR';

export const addYears = (payload: { years: Year[] }): ActionAddYears => ({
  type: ADD_YEARS,
  payload,
});

export const fetchError = (payload: FetchError): ActionFetchError => ({
  type: FETCH_ERROR,
  payload,
});

export function getYears(): ThunkAction {
  return async dispatch => {
    try {
      const { data } = await filesListFolder({ path: '/Bryggan' });
      const entries: Year[] = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));

      return dispatch(addYears({ years: entries }));
    } catch (e) {
      return dispatch(fetchError({ message: e.message }));
    }
  };
}
