import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../../utils/auth';
import standardPage from '../../hoc/standardPage';

class SignedIn extends Component {
  componentDidMount() {
    this.setupAuthService();
  }

  setupAuthService = () => {
    this.auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    this.auth.on('authenticated', () => Router.push('/'));
  };

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}

export default standardPage(SignedIn);
