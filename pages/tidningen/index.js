// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { filesListFolder } from '../../utils/api/dropbox';
import Layout from '../../components/Layout';
import StickyEvent from '../../components/StickyEvent';
import Header1 from '../../components/Typography/Header1';
import Header2 from '../../components/Typography/Header2';
import YearView from '../../components/Tidningen/YearView';
import Folder from '../../components/Dropbox/Folder';
import Thumbnail from '../../components/Dropbox/Thumbnail';

type Entries = Array<FileMetaData | FolderMetaData>;

type Props = {
  entries?: Entries,
  error?: ?{
    message: string,
    status?: number,
  },
};

type State = {
  titleWidth: number,
};

export default class Tidningen extends Component<Props, State> {
  static async getInitialProps() {
    if (!process.env.DROPBOX_ACCESS_TOKEN)
      return { error: { message: 'DROPBOX_ACCESS_TOKEN is not defined.' } };

    try {
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);
      const { data } = await filesListFolder({ path: '/Bryggan', sortBy });

      return { entries: data.entries };
    } catch (e) {
      if (e.response) {
        const { response } = e;
        return { error: { message: response.data, status: response.status } };
      }

      return { error: { message: e.message } };
    }
  }

  static defaultProps = {
    entries: [],
    error: null,
  };

  state = {
    titleWidth: 0,
  };

  getTitleWidth = (ref: ?HTMLElement): void => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ titleWidth: width }));
    }
  };

  render() {
    const { entries: years, error } = this.props;
    const { titleWidth } = this.state;

    return (
      <Layout title="Tidningen – Bryggan" activeLink="/tidningen">
        <Header1 style={{ position: 'sticky', top: 0 }}>
          <span ref={this.getTitleWidth}>Tidningen</span>
        </Header1>
        <div className="error">{error && error.message}</div>
        <YearView years={years} translateTitle={titleWidth} />
      </Layout>
    );
  }
}
