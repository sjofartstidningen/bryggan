import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../../utils/auth';

export default class SignOut extends Component {
  static async getInitialProps(ctx) {
    const auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    auth.logout();

    if (ctx.isServer) {
      ctx.res.writeHead(302, { Location: '/auth/sign-in' });
      ctx.res.end();
      return {};
    }

    Router.push('/auth/sign-in');
    return {};
  }

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}
