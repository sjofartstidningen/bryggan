import { join } from 'path';
import Queue from '../../utils/p-queue';
import { filesListFolder } from '../../utils/api/dropbox';
import * as constants from './constants';
import config from '../../config';

export const addYears = payload => ({
  type: constants.ADD_YEARS,
  payload,
});

export const addIssues = payload => ({
  type: constants.ADD_ISSUES,
  payload,
});

export const addPages = payload => ({
  type: constants.ADD_PAGES,
  payload,
});

export const increaseZoom = () => ({
  type: constants.INC_ZOOM,
});

export const decreaseZoom = () => ({
  type: constants.DEC_ZOOM,
});

export const fetchError = payload => ({
  type: constants.FETCH_ERROR,
  payload,
});

const queue = new Queue({ concurrency: 5 });

export function getYears(accessToken) {
  return async dispatch => {
    try {
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);
      const { data } = await queue.add(() =>
        filesListFolder({ path: config.dropboxRoot, sortBy, accessToken }),
      );
      const years = data.entries
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

export function getIssues(year, accessToken) {
  return async dispatch => {
    try {
      const path = join(config.dropboxRoot, year);
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);

      const { data } = await queue.add(() =>
        filesListFolder({ path, sortBy, accessToken }),
      );
      const issues = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          year,
          path: entry.path_lower,
          coverSrc: join(entry.path_lower, `${year}-${entry.name}-001.pdf`),
        }));

      return dispatch(addIssues({ year, issues }));
    } catch (e) {
      const message = e.response ? e.response.message : e.message;
      return dispatch(fetchError({ message }));
    }
  };
}

export function getPages(year, issue, accessToken) {
  return async dispatch => {
    try {
      const path = join(config.dropboxRoot, year, issue);
      const sortBy = (a, b) => (a.name > b.name ? 1 : -1);

      const { data } = await queue.add(() =>
        filesListFolder({ path, sortBy, accessToken }),
      );
      const pages = data.entries
        .filter(entry => entry['.tag'] === 'file')
        .map(entry => {
          const updatedAt = entry.client_modified || '';
          const updatedBy = entry.sharing_info
            ? entry.sharing_info.modified_by || ''
            : '';

          return {
            id: entry.id,
            name: entry.name,
            path: entry.path_lower,
            updated_at: updatedAt,
            updated_by: updatedBy,
            coverSrc: entry.path_lower,
          };
        });

      return dispatch(addPages({ year, issue, pages }));
    } catch (e) {
      const message = e.response ? e.response.message : e.message;
      return dispatch(fetchError({ message }));
    }
  };
}
