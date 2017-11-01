import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import Layout from '../components/Layout';
import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/auth';

export default Page => {
  class Standard extends Component {
    static async getInitialProps(ctx) {
      const user = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(ctx.req);

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ user, ...ctx })
        : {};

      return { user, ...pageProps };
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
