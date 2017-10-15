// @flow
import React, { Component } from 'react';
import { filesGetThumbnail } from '../../utils/api/dropbox';

type Props = { path: string };
type State = { blobUrl: ?string };

export default class DropboxPreview extends Component<Props, State> {
  state = {
    blobUrl: null,
  };

  componentDidMount() {
    this.fetchBlob();
  }

  fetchBlob = async () => {
    const { path } = this.props;

    try {
      const args = {
        path,
        format: 'jpeg',
        size: 'w640h480',
      };

      const { data } = await filesGetThumbnail(args);

      const blobUrl = URL.createObjectURL(data);
      this.setState(() => ({ blobUrl }));
    } catch (e) {
      console.error(path);
      console.error(e);
    }
  };

  render() {
    const { blobUrl } = this.state;
    return blobUrl ? <img src={blobUrl} alt="" /> : this.props.path;
  }
}
