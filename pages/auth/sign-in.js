import React, { Component } from 'react';
import Router from 'next/router';
import standardPage from '../../hoc/standardPage';
import AuthService from '../../utils/auth';
import config from '../../config';

const createAuth = () => new AuthService(config.auth0id, config.auth0domain);

class SignIn extends Component {
  static async getInitialProps(ctx) {
    const auth = createAuth();

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
    const auth = createAuth();
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
