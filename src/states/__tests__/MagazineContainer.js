import MagazineContainer from '../MagazineContainer';
import dropbox from '../../api/dropbox';

jest.mock('../../api/dropbox');

const FolderObject = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  path: expect.any(String),
  preview: expect.any(Object),
  entries: expect.any(Array),
});

const PageObject = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  path: expect.any(String),
  modified: expect.any(String),
  src: expect.any(String),
  preview: expect.any(Object),
});

describe('state.MagazineContainer', () => {
  const magazine = new MagazineContainer();
  magazine.setApiEnvironment({ accessToken: 'abc123', rootFolder: '/root' });

  test('should be able to fetch all years', async () => {
    dropbox.setRpcReturnData({
      entries: [
        { '.tag': 'folder', id: '1', name: '2015', path_lower: '/root/2015' },
        { '.tag': 'folder', id: '2', name: '2016', path_lower: '/root/2016' },
        { '.tag': 'folder', id: '3', name: '2017', path_lower: '/root/2017' },
        { '.tag': 'folder', id: '4', name: '2018', path_lower: '/root/2018' },
      ],
    });

    await magazine.fetchAllYears();
    expect(magazine.state.years).toHaveLength(4);
    expect(magazine.state.years).toEqual(
      expect.arrayContaining([FolderObject]),
    );
  });

  test('should fetch all issues, by year', async () => {
    dropbox.setRpcReturnData({
      entries: [
        { '.tag': 'folder', id: '5', name: '01', path_lower: '/root/2015/01' },
        { '.tag': 'folder', id: '6', name: '02', path_lower: '/root/2015/02' },
        { '.tag': 'folder', id: '7', name: '03', path_lower: '/root/2015/03' },
        { '.tag': 'folder', id: '8', name: '04', path_lower: '/root/2015/04' },
      ],
    });

    await magazine.fetchIssuesByYear({ year: '2015' });
    expect(magazine.state.issues).toHaveLength(4);
    expect(magazine.state.issues).toEqual(
      expect.arrayContaining([FolderObject]),
    );
  });

  test('should fetch pages, by issue/year', async () => {
    dropbox.setRpcReturnData({
      entries: [1, 2, 3, 4].map(n => ({
        '.tag': 'file',
        id: `${8 + n}`,
        name: `2015-01-00${n}.pdf`,
        path_lower: `/root/2015/01/2015-01-00${n}.pdf`,
        client_modified: new Date().toString(),
      })),
    });

    await magazine.fetchPagesByIssue({ year: '2015', issue: '01' });
    expect(magazine.state.pages).toHaveLength(4);
    expect(magazine.state.pages).toEqual(expect.arrayContaining([PageObject]));
  });
});

describe('state.MagazineContainer', () => {
  const magazine = new MagazineContainer();
  magazine.setApiEnvironment({ accessToken: 'abc123', rootFolder: '/root' });

  test('should add ids from pages to corresponding issue', async () => {
    magazine.setState({
      issues: [
        { id: '1', name: '01', path: '/root/2015/01', entries: [] },
        { id: '2', name: '01', path: '/root/2016/01', entries: [] },
        { id: '3', name: '01', path: '/root/2017/01', entries: [] },
      ],
    });

    dropbox.setRpcReturnData({
      entries: [1, 2, 3, 4].map(n => ({
        '.tag': 'file',
        id: `${3 + n}`,
        name: `2015-01-00${n}.pdf`,
        path_lower: `/root/2015/01/2015-01-00${n}.pdf`,
        client_modified: new Date().toString(),
      })),
    });

    await magazine.fetchPagesByIssue({ year: '2016', issue: '01' });

    const issue2015 = magazine.state.issues.find(x => x.id === '1');
    const issue2016 = magazine.state.issues.find(x => x.id === '2');
    const issue2017 = magazine.state.issues.find(x => x.id === '3');

    expect(issue2015.entries).toHaveLength(0);
    expect(issue2016.entries).toHaveLength(4);
    expect(issue2017.entries).toHaveLength(0);

    expect(issue2016.entries).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });

  test('should add ids from issues to corresponding year', async () => {
    magazine.setState({
      years: [
        { id: '1', name: '2017', path: '/root/2017', entries: [] },
        { id: '2', name: '2018', path: '/root/2018', entries: [] },
      ],
    });

    dropbox.setRpcReturnData({
      entries: [
        { '.tag': 'folder', id: '3', name: '01', path_lower: '/root/2018/01' },
        { '.tag': 'folder', id: '4', name: '02', path_lower: '/root/2018/02' },
        { '.tag': 'folder', id: '5', name: '03', path_lower: '/root/2018/03' },
        { '.tag': 'folder', id: '6', name: '04', path_lower: '/root/2018/04' },
      ],
    });

    await magazine.fetchIssuesByYear({ year: '2018' });

    const year2017 = magazine.state.years.find(x => x.id === '1');
    const year2018 = magazine.state.years.find(x => x.id === '2');

    expect(year2017.entries).toHaveLength(0);
    expect(year2018.entries).toHaveLength(4);

    expect(year2018.entries).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });
});

describe('state.MagazineContainer', () => {
  test('should also handle odd named issues', async () => {
    const magazine = new MagazineContainer();
    magazine.setApiEnvironment({ accessToken: 'abc123', rootFolder: '/root' });
    magazine.setState({
      years: [{ id: '1', name: '2018', path: '/root/2018', entries: [] }],
    });

    dropbox.setRpcReturnData({
      entries: [
        { '.tag': 'folder', id: '2', name: '01', path_lower: '/root/2018/01' },
        {
          '.tag': 'folder',
          id: '3',
          name: '01 Spec',
          path_lower: '/root/2018/01 Spec Edition',
        },
      ],
    });

    await magazine.fetchIssuesByYear({ year: '2018' });
    expect(magazine.state.issues).toHaveLength(2);

    const year2018 = magazine.state.years.find(x => x.id === '1');
    expect(year2018.entries).toHaveLength(2);
    expect(year2018.entries).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });

  test('should also handle odd named issues', async () => {
    const magazine = new MagazineContainer();
    magazine.setApiEnvironment({ accessToken: 'abc123', rootFolder: '/root' });
    magazine.setState({
      issues: [
        { id: '1', name: '01', path: '/root/2018/01', entries: [] },
        { id: '2', name: '01 Spec', path: '/root/2018/01 Spec', entries: [] },
      ],
    });

    dropbox.setRpcReturnData({
      entries: [1, 2].map(n => ({
        '.tag': 'file',
        id: `${1 + n}`,
        name: `2018-01 Spec-00${n}.pdf`,
        path_lower: `/root/2018/01 Spec/2018-01 Spec-00${n}.pdf`,
        client_modified: new Date().toString(),
      })),
    });

    await magazine.fetchPagesByIssue({ year: '2018', issue: '01 Spec' });
    expect(magazine.state.pages).toHaveLength(2);

    const issue = magazine.state.issues.find(x => x.id === '2');
    expect(issue.entries).toHaveLength(2);
    expect(issue.entries).toEqual(expect.arrayContaining([expect.any(String)]));
  });
});
