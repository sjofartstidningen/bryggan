// @flow
import { join } from 'path';
import { Container } from 'unstated';
import { uniq, uniqBy } from 'lodash-es';
import { adjustWhere } from '../utils';
import dropbox from '../api/dropbox';
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

const isYearFolder = entry => /^\d{4}$/.test(entry.name);
const isIssueFolder = entry => /^\d{2}.*$/.test(entry.name);
const isPageFile = entry => /^\d{4}-\d{2}-\d{3}\.pdf$/.test(entry.name);

const uniqById = <T>(list: Array<T>): Array<T> => uniqBy(list, 'id');

class MagazineContainer extends Container<MagazineState> {
  state = {
    accessToken: null,
    rootFolder: null,
    years: [],
    issues: [],
    pages: [],
  };

  setApiEnvironment({
    accessToken,
    rootFolder,
  }: {
    accessToken: string,
    rootFolder: string,
  }) {
    dropbox.updateAccessToken(accessToken);
    dropbox.updateRootFolder(rootFolder);
    this.setState({ accessToken, rootFolder });
  }

  listFolder = async ({ folder }: { folder: string }) => {
    const response = await dropbox.filesListFolder({ folder });
    return response.data.entries;
  };

  extractBasicInfo = (entry: {
    id: string,
    name: string,
    path_lower: string,
  }) => ({
    id: entry.id,
    name: entry.name,
    path: entry.path_lower,
    preview: dropbox.generatePreviewsFromPath(entry.path_lower),
  });

  async fetchAllYears() {
    const entries = await this.listFolder({ folder: '/' });
    const years = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'folder':
          if (!isYearFolder(entry)) return acc;
          return [...acc, { ...this.extractBasicInfo(entry), issues: [] }];
        default:
          return acc;
      }
    }, []);

    if (years.length > 0) {
      this.setState({
        years: uniqById([...this.state.years, ...years]),
      });
    }
  }

  async fetchIssuesByYear({ year }: { year: string }) {
    const entries = await this.listFolder({ folder: year });
    const issues = entries.reduce((acc, entry) => {
      switch (entry.tag) {
        case 'folder':
          if (!isIssueFolder(entry)) return acc;
          return [...acc, { ...this.extractBasicInfo(entry), pages: [] }];
        default:
          return acc;
      }
    }, []);

    if (issues.length > 0) {
      const newIssues = uniqById([...this.state.issues, ...issues]);
      const ids = issues.map(i => i.id);

      this.setState({
        issues: newIssues,
        years: adjustWhere(
          y => ({ ...y, issues: uniq([...y.issues, ...ids]) }),
          y => y.name === year,
          this.state.years,
        ),
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
              ...this.extractBasicInfo(entry),
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
        issues: adjustWhere(
          i => ({ ...i, pages: [...i.pages, ...ids] }),
          i => i.name === issue,
          this.state.issues,
        ),
      });
    }
  }
}

export { MagazineContainer as default };
