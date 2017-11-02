import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../../utils/auth';

export default class SignOut extends Component {
  componentDidMount() {
    this.auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    this.auth.logout();
    Router.push('/auth/sign-in');
  }

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}
