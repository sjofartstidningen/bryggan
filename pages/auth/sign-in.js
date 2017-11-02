import React, { Component } from 'react';
import Router from 'next/router';
import standardPage from '../../hoc/standardPage';
import AuthService from '../../utils/auth';

class SignIn extends Component {
  static async getInitialProps(ctx) {
    const auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    if (auth.loggedIn(ctx.req)) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
      }

      Router.push('/');
    }
  }

  componentDidMount() {
    this.setupAuthService();
  }

  setupAuthService = () => {
    const auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    const loggedIn = auth.loggedIn();

    if (!loggedIn) {
      auth.login();
    } else {
      Router.push('/');
    }
  };

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}

export default standardPage(SignIn);
