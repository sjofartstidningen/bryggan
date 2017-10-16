// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { filesGetThumbnail } from '../../utils/api/dropbox';

type Props = {
  path: string,
  format?: 'jpeg' | 'png',
  size?: 'w32h32' | 'w64h64' | 'w128h128' | 'w640h480' | 'w1024h768',
  render: ({ src: string }) => Node,
  loading?: ?() => Node,
};

type State = { blobUrl: ?string };

export default class Thumbnail extends Component<Props, State> {
  state = { blobUrl: null };

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
    const { data } = await filesGetThumbnail({ path, format, size });
    const blobUrl = URL.createObjectURL(data);
    this.setState(() => ({ blobUrl }));
  };

  render() {
    const { render, loading } = this.props;
    const { blobUrl } = this.state;

    return blobUrl ? render({ src: blobUrl }) : loading && loading();
  }
}
