import React, { Component } from 'react';
import Router from 'next/router';
import standardPage from './standardPage';
import AuthService from '../utils/auth';

export default Page => {
  class SecurePage extends Component {
    static async getInitialProps(ctx) {
      const auth = new AuthService(
        process.env.AUTH0_CLIENT_ID,
        process.env.AUTH0_CLIENT_DOMAIN,
      );

      const loggedIn = auth.loggedIn(ctx.req);

      if (!loggedIn) {
        if (ctx.res) {
          ctx.res.writeHead(302, { Location: '/auth/sign-in' });
          ctx.res.end();
          return {};
        }

        Router.push('/auth/sign-in');
        return {};
      }

      const user = auth.getUser(ctx.req);

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...ctx })
        : {};

      return { user, ...pageProps };
    }

    render() {
      return <Page {...this.props} />;
    }
  }

  return standardPage(SecurePage);
};
