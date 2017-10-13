import React, { Component } from 'react';
import axios from 'axios';

export default class DropboxPreview extends Component {
  state = {
    blob: null,
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

      const { data } = await axios({
        method: 'get',
        url: 'https://content.dropboxapi.com/2/files/get_thumbnail',
        params: {
          authorization: `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
          arg: JSON.stringify(args),
        },
        responseType: 'blob',
      });

      const blob = URL.createObjectURL(data);
      this.setState(() => ({ blob }));
    } catch (e) {
      console.error(path);
      console.error(e);
    }
  };

  render() {
    const { blob } = this.state;
    return blob ? <img src={blob} alt="" /> : this.props.path;
  }
}
