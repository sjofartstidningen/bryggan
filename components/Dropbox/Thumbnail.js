// @flow
import { Component } from 'react';
import type { Node } from 'react';
import Queue from 'p-queue';
import { filesGetThumbnail } from '../../utils/api/dropbox';

const queue = new Queue({ concurrency: 3 });

type RenderProps = {
  src: string,
  data: ?FileMetaData,
};

type Props = {
  path: string,
  format?: 'jpeg' | 'png',
  size?: 'w32h32' | 'w64h64' | 'w128h128' | 'w640h480' | 'w1024h768',
  render: RenderProps => Node,
  loading?: ?() => Node,
};

type State = { blobUrl: ?string, data: ?FileMetaData };

export default class Thumbnail extends Component<Props, State> {
  state = { blobUrl: null, data: null };

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
