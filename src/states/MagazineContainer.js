// @flow
import { join } from 'path';
import { Container } from 'unstated';
import uniqBy from 'lodash.uniqby';
import uniq from 'lodash.uniq';
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
const appendEntries = (ids, state, match: Array<string>) =>
  adjustWhere(
    x => ({ ...x, entries: uniq([...x.entries, ...ids]) }),
    x => match.every(y => x.path.includes(y)),
    state,
  );

const listFolder = async ({ folder }: { folder: string }) => {
  const response = await dropbox.filesListFolder({ folder });
  return response.data.entries;
};

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

  fetchFolderContent = async ({
    folder,
    validate,
  }: {
    folder: string,
    validate: (x: any) => boolean,
  }) => {
    const entries = await listFolder({ folder });
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
      this.setState({
        years: uniqById([...this.state.years, ...years]),
      });
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
    const entries = await listFolder({ folder: join(year, issue) });
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
