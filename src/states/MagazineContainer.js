// @flow
import { join } from 'path';
import { Container } from 'unstated';
import { CancelToken } from 'axios';
import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
import { adjustWhere } from '../utils';
import dropbox from '../api/dropbox';
import * as re from '../utils/regexp';
import type {
  MagazineYear,
  MagazineIssue,
  MagazinePage,
} from '../types/magazine';

type MagazineState = {
  accessToken: ?string,
  rootFolder: ?string,
  years: Array<MagazineYear>,
  issues: Array<MagazineIssue>,
  pages: Array<MagazinePage>,
};

/**
 * Utility functions
 *
 * isYearFolder: Matches against a folder name, eg. '2017', '2018'
 * isIssueFolder: Matches against a folder name: eg. '01', '02', '02 Special'
 * isPageFile: Matches against a file name: eg. '2015-01-001.pdf'
 *
 * uniqById: Filters an array containing uniq entries (compared by id)
 */
const isYearFolder = entry => re.year().test(entry.name);
const isIssueFolder = entry => re.issue().test(entry.name);
const isPageFile = entry => re.page().test(entry.name);
const uniqById = <T>(list: Array<T>): Array<T> => uniqBy(list, 'id');

/**
 * appendEntries takes a list of ids and applies them to the correct part of
 * the state
 *
 * @param {Array<string>}  ids    An array of ids
 * @param {Array<entries>} state  A fragment of the state to apply ids to (year or issues)
 * @param {Array<string>}  match  Path parts to match correct issue/year
 *
 * @returns {Array<entries>} Returns the new state fragment
 */
const appendEntries = (ids, state, match: Array<string>) =>
  adjustWhere(
    x => ({ ...x, entries: uniq([...x.entries, ...ids]) }),
    x => match.every(y => x.path.includes(y)),
    state,
  );

/**
 * Extract information common to all entries
 *
 * @param {Object}  entry  A entry from Dropbox
 * @return {Object} An object containing common information
 */
const extractBasicInfo = (entry: {
  id: string,
  name: string,
  path_lower: string,
}) => ({
  id: entry.id,
  name: entry.name,
  path: entry.path_lower,
  preview: dropbox.generatePreviewsFromPath(entry.path_lower),
});

class MagazineContainer extends Container<MagazineState> {
  state = {
    accessToken: null,
    rootFolder: null,
    years: [],
    issues: [],
    pages: [],
  };

  cancelToken = CancelToken.source();

  cancelRequest = () => {
    this.cancelToken.cancel();
  };

  /**
   * Set the needed api environment variables for Dropbox api to function
   * correctly. Both accessToken and rootFolder are strings.
   */
  setApiEnvironment({
    accessToken,
    rootFolder = '/',
  }: {
    accessToken: string,
    rootFolder?: string,
  } = {}) {
    dropbox.updateAccessToken(accessToken);
    dropbox.updateRootFolder(rootFolder);
    this.setState({ accessToken, rootFolder });
  }

  /**
   * Lists the folder content of the specified folder and return only the entries
   *
   * @param {string}  opt.folder  A path string (relative to dropox root)
   * @returns {Array<entries>} Returns an array of Dropbox entries
   */
  listFolder = async ({ folder }: { folder: string }) => {
    const response = await dropbox.filesListFolder({
      folder,
      cancelToken: this.cancelToken.token,
    });
    return response.data.entries;
  };

  /**
   * Fetch folder content. This method is for internal use mainly since both
   * years and issues share a common structure, only difference is the that
   * years are four digits and issues begins with two digits, followed by an
   * optional extra name.
   */
  fetchFolderContent = async ({
    folder,
    validate,
  }: {
    folder: string,
    validate: (x: any) => boolean,
  }) => {
    const entries = await this.listFolder({ folder });
    const reduced = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'folder':
          if (!validate(entry)) return acc;
          return [...acc, { ...extractBasicInfo(entry), entries: [] }];
        default:
          return acc;
      }
    }, []);

    return reduced;
  };

  async fetchAllYears() {
    const years = await this.fetchFolderContent({
      folder: '/',
      validate: isYearFolder,
    });

    if (years.length > 0) {
      this.setState({ years: uniqById([...this.state.years, ...years]) });
    }
  }

  async fetchIssuesByYear({ year }: { year: string }) {
    const issues = await this.fetchFolderContent({
      folder: year,
      validate: isIssueFolder,
    });

    if (issues.length > 0) {
      const newIssues = uniqById([...this.state.issues, ...issues]);
      const ids = issues.map(i => i.id);

      this.setState({
        issues: newIssues,
        years: appendEntries(ids, this.state.years, [year]),
      });
    }
  }

  async fetchPagesByIssue({ year, issue }: { year: string, issue: string }) {
    const entries = await this.listFolder({ folder: join(year, issue) });
    const pages = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'file':
          if (!isPageFile(entry)) return acc;
          return [
            ...acc,
            {
              ...extractBasicInfo(entry),
              modified: entry.client_modified,
              src: dropbox.getFileDownloadLink({ path: entry.path_lower }),
            },
          ];
        default:
          return acc;
      }
    }, []);

    if (pages.length > 0) {
      const newPages = uniqById([...this.state.pages, ...pages]);
      const ids = pages.map(p => p.id);

      this.setState({
        pages: newPages,
        issues: appendEntries(ids, this.state.issues, [year, issue]),
      });
    }
  }
}

export { MagazineContainer as default };
