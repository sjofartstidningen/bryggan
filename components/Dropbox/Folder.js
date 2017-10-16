// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { filesListFolder } from '../../utils/api/dropbox';

type Entry = FileMetaData | FolderMetaData;
type Entries = Array<Entry>;

type Props = {
  path: string,
  recursive?: boolean,
  sortBy?: string | ((a: Entry, b: Entry) => number),
  render: ({ entries: Entries }) => Node,
  loading?: ?() => Node,
};

type State = {
  entries: Entries,
};

export default class Folder extends Component<Props, State> {
  state = {
    entries: [],
  };

  static defaultProps = {
    loading: null,
    reursive: false,
    sortBy: 'name',
  };

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = async () => {
    const { path, recursive, sortBy } = this.props;
    const sortByFn = (a, b) => {
      if (typeof sortBy === 'string') return a[sortBy] < b[sortBy] ? 1 : -1;
      if (typeof sortBy === 'function') return sortBy(a, b);
      return 0;
    };

    const { data } = await filesListFolder({
      path,
      recursive,
      sortBy: sortByFn,
    });
    const { entries } = data;

    this.setState(() => ({ entries }));
  };

  render() {
    const { render, loading } = this.props;
    const { entries } = this.state;

    return entries.length > 0 ? render({ entries }) : loading && loading();
  }
}
