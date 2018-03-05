import MagazineContainer from '../MagazineContainer';
import dropbox from '../../api/dropbox';

jest.mock('../../api/dropbox');

describe('state.MagazineContainer', () => {
  test('should fetch all years', async () => {
    const magazine = new MagazineContainer();

    dropbox.setRpcReturnData({
      entries: [
        { tag: 'folder', id: '1', name: '2015', path_lower: '/root/2015' },
        { tag: 'folder', id: '2', name: '2016', path_lower: '/root/2016' },
        { tag: 'folder', id: '3', name: '2017', path_lower: '/root/2017' },
        { tag: 'folder', id: '4', name: '2018', path_lower: '/root/2018' },
      ],
    });

    await magazine.fetchAllYears();
    expect(magazine.state.years).toHaveLength(4);

    dropbox.setRpcReturnData({
      entries: [
        { tag: 'folder', id: '5', name: '01', path_lower: '/root/2015/01' },
        { tag: 'folder', id: '6', name: '02', path_lower: '/root/2015/02' },
        { tag: 'folder', id: '7', name: '03', path_lower: '/root/2015/03' },
        { tag: 'folder', id: '8', name: '04', path_lower: '/root/2015/04' },
      ],
    });

    await magazine.fetchIssuesByYear({ year: '2015' });
    expect(magazine.state.issues).toHaveLength(4);

    const year = magazine.state.years.find(x => x.name === '2015');
    expect(year.entries).toHaveLength(4);

    dropbox.setRpcReturnData({
      entries: [1, 2, 3, 4].map(n => ({
        tag: 'file',
        id: `${8 + n}`,
        name: `2015-01-00${n}.pdf`,
        path_lower: `/root/2015/01/2015-01-00${n}.pdf`,
        client_modified: new Date().toString(),
      })),
    });

    await magazine.fetchPagesByIssue({ year: '2015', issue: '01' });
    expect(magazine.state.issues).toHaveLength(4);

    const issue = magazine.state.issues.find(x => x.name === '01');
    expect(issue.entries).toHaveLength(4);

    dropbox.setRpcReturnData({
      entries: [
        { tag: 'folder', id: '13', name: '01', path_lower: '/root/2016/01' },
        { tag: 'folder', id: '14', name: '02', path_lower: '/root/2016/02' },
        { tag: 'folder', id: '15', name: '03', path_lower: '/root/2016/03' },
        { tag: 'folder', id: '16', name: '04', path_lower: '/root/2016/04' },
      ],
    });

    await magazine.fetchIssuesByYear({ year: '2016' });
    expect(magazine.state.issues).toHaveLength(8);

    const year1 = magazine.state.years.find(x => x.name === '2016');
    const year2 = magazine.state.years.find(x => x.name === '2015');
    expect(year1.entries).toHaveLength(4);
    expect(year2.entries).toHaveLength(4);
  });
});
