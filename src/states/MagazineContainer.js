// @flow
import { join } from 'path';
import { Container } from 'unstated';
import { CancelToken } from 'axios';
import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
import { adjustWhere, sortByName } from '../utils';
import dropbox from '../api/dropbox';
import * as re from '../utils/regexp';
import type {
  MagazineYear,
  MagazineIssue,
  MagazinePage,
} from '../types/magazine';

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

type MagazineState = {
  fetching: number,
  years: Array<MagazineYear>,
  issues: Array<MagazineIssue>,
  pages: Array<MagazinePage>,
};

class MagazineContainer extends Container<MagazineState> {
  state = {
    fetching: 0,
    years: [],
    issues: [],
    pages: [],
  };

  cancelToken = CancelToken.source();

  isFetching = () => this.state.fetching > 0;

  cancelRequest() {
    this.cancelToken.cancel();
  }

  /**
   * Lists the folder content of the specified folder and return only the
   * entries
   *
   * @param {string}  opt.folder  A path string (relative to dropox root)
   * @returns {Array<entries>} Returns an array of Dropbox entries
   */
  async listFolder({ folder }: { folder: string }) {
    try {
      this.setState({ fetching: this.state.fetching + 1 });
      const response = await dropbox.filesListFolder({
        folder,
        cancelToken: this.cancelToken.token,
      });

      return response.data.entries;
    } catch (err) {
      throw err;
    } finally {
      this.setState({ fetching: this.state.fetching - 1 });
    }
  }

  /**
   * Fetch folder content. This method is for internal use mainly since both
   * years and issues share a common structure, only difference is the that
   * years are four digits and issues begins with two digits, followed by an
   * optional extra name.
   */
  async fetchFolderContent({
    folder,
    validate,
  }: {
    folder: string,
    validate: (x: any) => boolean,
  }) {
    const entries = await this.listFolder({ folder });
    const reduced = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'folder':
          if (!validate(entry)) return acc;
          return [
            ...acc,
            {
              ...extractBasicInfo(entry),
              url: join('/', folder, entry.name),
              entries: [],
            },
          ];
        default:
          return acc;
      }
    }, []);

    return reduced;
  }

  fetchAllYears = async () => {
    const years = await this.fetchFolderContent({
      folder: '/',
      validate: isYearFolder,
    });

    if (years.length > 0) {
      this.setState({ years: uniqById([...this.state.years, ...years]) });
    }
  };

  fetchIssuesByYear = async ({ year }: { year: string }) => {
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
  };

  fetchPagesByIssue = async ({
    year,
    issue,
  }: {
    year: string,
    issue: string,
  }) => {
    const folder = join(year, issue);
    const entries = await this.listFolder({ folder });
    const pages = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'file': // eslint-disable-line
          if (!isPageFile(entry)) return acc;

          const [, , , name] = re.page().exec(entry.name);
          return [
            ...acc,
            {
              ...extractBasicInfo(entry),
              name,
              url: join('/', folder, name),
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
  };

  getIssuesForYear = ({ year }: { year: string }): Array<MagazineIssue> => {
    const foundYear = this.state.years.find(y => y.name === year);

    if (foundYear) {
      const { entries } = foundYear;
      const issues = entries
        .map(issueId => this.state.issues.find(i => i.id === issueId))
        .filter(Boolean);

      return issues.sort((a, b) => -sortByName(a, b));
    }

    return [];
  };

  getPagesForIssue = ({
    year,
    issue,
  }: {
    year: string,
    issue: string,
  }): Array<MagazinePage> => {
    const foundIssue = this.state.issues.find(
      i => i.path.includes(year) && i.name === issue,
    );

    if (foundIssue) {
      const { entries } = foundIssue;
      const pages = entries
        .map(pageId => this.state.pages.find(i => i.id === pageId))
        .filter(Boolean);

      return pages.sort(sortByName);
    }

    return [];
  };
}

export { MagazineContainer as default };
