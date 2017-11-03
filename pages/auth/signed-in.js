import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../../utils/auth';
import standardPage from '../../hoc/standardPage';
import config from '../../config';

class SignedIn extends Component {
  componentDidMount() {
    this.setupAuthService();
  }

  setupAuthService = () => {
    this.auth = new AuthService(config.auth0id, config.auth0domain);
    this.auth.on('authenticated', () => Router.push('/'));
  };

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}

export default standardPage(SignedIn);
