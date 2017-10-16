// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { filesListFolder } from '../../utils/api/dropbox';

type Entries = Array<FileMetaData | FolderMetaData>;

type Props = {
  path: string,
  recursive?: boolean,
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
  };

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = async () => {
    const { path, recursive } = this.props;
    const { data } = await filesListFolder({ path, recursive });
    const { entries } = data;
    this.setState(() => ({ entries }));
  };

  render() {
    const { render, loading } = this.props;
    const { entries } = this.state;

    return entries.length > 0 ? render({ entries }) : loading && loading();
  }
}
