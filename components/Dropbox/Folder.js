import { Component } from 'react';
import PropTypes from 'prop-types';
import Queue from 'p-queue';
import { filesListFolder } from '../../utils/api/dropbox';

const queue = new Queue({ concurrency: 3 });

export default class Folder extends Component {
  state = {
    entries: [],
  };

  static propTypes = {
    path: PropTypes.string.isRequired,
    recursive: PropTypes.bool,
    loading: PropTypes.func,
    sortBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: null,
    recursive: false,
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

    const { data } = await queue.add(() =>
      filesListFolder({
        path,
        recursive,
        sortBy: sortByFn,
      }),
    );
    const { entries } = data;

    this.setState(() => ({ entries }));
  };

  render() {
    const { render, loading } = this.props;
    const { entries } = this.state;

    return entries.length > 0 ? render({ entries }) : loading && loading();
  }
}
