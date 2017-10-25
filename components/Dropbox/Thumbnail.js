import { Component } from 'react';
import PropTypes from 'prop-types';
import Queue from 'p-queue';
import { filesGetThumbnail } from '../../utils/api/dropbox';

const queue = new Queue({ concurrency: 3 });

export default class Thumbnail extends Component {
  state = { blobUrl: null, data: null };

  static propTypes = {
    path: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['jpeg', 'png']),
    size: PropTypes.oneOf([
      'w32h32',
      'w64h64',
      'w128h128',
      'w640h480',
      'w1024h768',
    ]),
    render: PropTypes.func.isRequired,
    loading: PropTypes.func,
  };

  static defaultProps = {
    format: 'jpeg',
    size: 'w64h64',
    loading: null,
  };

  componentDidMount() {
    this.fetchBlob();
  }

  componentWillUnmount() {
    if (this.state.blobUrl) {
      URL.revokeObjectURL(this.state.blobUrl);
      this.setState(() => ({ blobUrl: null }));
    }
  }

  fetchBlob = async () => {
    const { path, format, size } = this.props;
    const { data, headers } = await queue.add(() =>
      filesGetThumbnail({ path, format, size }),
    );
    const blobUrl = URL.createObjectURL(data);
    const resData = JSON.parse(headers['dropbox-api-result']);

    this.setState(() => ({ blobUrl, data: resData }));
  };

  render() {
    const { render, loading } = this.props;
    const { blobUrl, data } = this.state;

    return blobUrl ? render({ src: blobUrl, data }) : loading && loading();
  }
}
