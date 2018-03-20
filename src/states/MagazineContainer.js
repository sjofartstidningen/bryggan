// @flow
import { join } from 'path';
import { Container } from 'unstated';
import uniqBy from 'lodash.uniqby';
import dropbox from '../api/dropbox';
import { sortByName } from '../utils';

type Preview = {
  '32': string,
  '64': string,
  '128': string,
  '256': string,
  '480': string,
  '640': string,
  '960': string,
  '1024': string,
  '2048': string,
};

type Entry = {
  type: 'year' | 'issue' | 'page',
  tag: 'file' | 'folder',
  id: string,
  name: string,
  url: string,
  modified?: string,
  src?: string,
  preview: Preview,
};

type State = {
  years: Array<Entry>,
  issues: Array<Entry>,
  pages: Array<Entry>,
  error: ?string,
};

class MagazineContainer extends Container<State> {
  state = {
    years: [],
    issues: [],
    pages: [],
    error: null,
  };

  fetch = async (path: string) => {
    try {
      const response = await dropbox.listFolder(path);
      return response;
    } catch (err) {
      this.setState({ error: 'An error occured' });
      return [];
    }
  };

  fetchYears = async () => {
    const path = '/';
    const entries = await this.fetch(path);

    const years = uniqBy([...this.state.years, ...entries], 'id');
    this.setState({ years });
  };

  fetchIssues = async ({ year }: { year: string }) => {
    const path = join('/', year);
    const entries = await this.fetch(path);

    const issues = uniqBy([...this.state.issues, ...entries], 'id');
    this.setState({ issues });
  };

  fetchPages = async ({ year, issue }: { year: string, issue: string }) => {
    const path = join('/', year, issue);
    const entries = await this.fetch(path);

    const pages = uniqBy([...this.state.pages, ...entries], 'id');
    this.setState({ pages });
  };

  fetchPage = async ({
    year,
    issue,
    page,
  }: {
    year: string,
    issue: string,
    page: string,
  }) => {
    const path = join('/', year, issue, `${year}-${issue}-${page}.pdf`);
    const entries = await dropbox.metadata(path);

    const pages = uniqBy([...this.state.pages, ...entries], 'id');
    this.setState({ pages });
  };

  getYears = () => this.state.years.sort((a, b) => -sortByName(a, b));

  getIssues = ({ year }: { year: string }) =>
    this.state.issues
      .filter(issue => issue.url.includes(year))
      .sort((a, b) => -sortByName(a, b));

  getPages = ({ year, issue }: { year: string, issue: string }) =>
    this.state.pages
      .filter(page => page.url.includes(year) && page.url.includes(issue))
      .sort(sortByName);

  getPage = ({
    year,
    issue,
    page,
  }: {
    year: string,
    issue: string,
    page: string,
  }) =>
    this.state.pages.find(
      p => p.url.includes(year) && p.url.includes(issue) && p.name === page,
    );
}

export { MagazineContainer as default };
