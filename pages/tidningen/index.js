// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { filesListFolder } from '../../utils/api/dropbox';
import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';
import YearView from '../../components/Tidningen/YearView';

import { initStore } from '../../store';
import { addYears, fetchError } from '../../store/tidningen/actions';

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

class Tidningen extends Component<Props, State> {
  static async getInitialProps({ store }) {
    if (!process.env.DROPBOX_ACCESS_TOKEN)
      return { error: { message: 'DROPBOX_ACCESS_TOKEN is not defined.' } };

    try {
      const sortBy = (a, b) => (a.name < b.name ? 1 : -1);
      const { data } = await filesListFolder({ path: '/Bryggan', sortBy });
      const years = data.entries
        .filter(entry => entry['.tag'] === 'folder')
        .map(entry => ({
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
        }));

      store.dispatch(addYears({ years }));

      return { entries: years };
    } catch (e) {
      if (e.response) {
        const { response } = e;
        store.dispatch(fetchError(response.message));
        return { error: { message: response.data, status: response.status } };
      }

      store.dispatch(fetchError(e.message));
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
    const { entries: years } = this.props;
    const { titleWidth } = this.state;

    return (
      <Layout title="Tidningen – Bryggan" activeLink="/tidningen">
        <H1 style={{ position: 'sticky', top: 0, zIndex: 3 }}>
          <span ref={this.getTitleWidth} style={{ backgroundColor: '#fff' }}>
            Tidningen
          </span>
        </H1>
        {years && <YearView years={years} translateTitle={titleWidth} />}
      </Layout>
    );
  }
}

export default withRedux(initStore)(Tidningen);
