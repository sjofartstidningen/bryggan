// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';
import { getPages } from '../../store/tidningen/actions';

import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';

class Issue extends Component<*, *> {
  static async getInitialProps(props) {
    const { query, store } = props;
    const { year, issue } = query;
    await getPages(year, issue)(store.dispatch, store.getState);
    return {};
  }

  render() {
    const { year, issue } = this.props.url.query;
    return (
      <Layout title={`Nummer ${issue}-${year} – Bryggan`}>
        <H1 style={{ position: 'sticky', top: 0, zIndex: 3 }}>
          Nummer {issue}-{year}
        </H1>
      </Layout>
    );
  }
}

export default withRedux(initStore)(Issue);
