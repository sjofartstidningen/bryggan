import React, { Component } from 'react';
import Router from 'next/router';
import standardPage from './standardPage';
import AuthService from '../utils/auth';
import { signIn, addToken, updateUser } from '../store/auth/actions';
import callInitialProps from '../utils/call-initial-props';
import config from '../config';

export default Page => {
  class SecurePage extends Component {
    static async getInitialProps(ctx) {
      const auth = new AuthService(config.auth0id, config.auth0domain);
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
      const userObj = {
        name: user.user_metadata.name,
        email: user.email,
        img: user.picture,
      };

      ctx.store.dispatch(signIn());
      ctx.store.dispatch(updateUser(userObj));

      const metadata = user.client_metadata;
      Object.keys(metadata).forEach(token => {
        const payload = {
          token,
          value: metadata[token],
        };
        ctx.store.dispatch(addToken(payload));
      });

      const pageProps = await callInitialProps(Page, ctx);
      return { ...pageProps };
    }

    render() {
      return <Page {...this.props} />;
    }
  }

  return standardPage(SecurePage);
};
