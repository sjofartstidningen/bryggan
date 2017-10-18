// @flow
import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../../store';

import Layout from '../../components/Layout';
import { H1 } from '../../components/Typography/headings';

class Issue extends Component<*, *> {
  static async getInitialProps({ store }) {
    return { state: store.getState() };
  }

  render() {
    const { year, name } = this.props.url.query;
    return (
      <Layout>
        <H1 style={{ position: 'sticky', top: 0, zIndex: 3 }}>
          #{name}-{year}
        </H1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </Layout>
    );
  }
}

export default withRedux(initStore)(Issue);
