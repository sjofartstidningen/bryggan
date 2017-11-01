import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import Layout from '../components/Layout';

export default Page => {
  class Standard extends Component {
    static async getInitialProps(ctx) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...ctx })
        : {};

      return { ...pageProps };
    }

    render() {
      return (
        <Layout title={this.props.title}>
          <Page {...this.props} />
        </Layout>
      );
    }
  }

  return withRedux(initStore)(Standard);
};
