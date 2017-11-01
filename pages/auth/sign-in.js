import React, { Component } from 'react';
import Router from 'next/router';
import standard from '../../containers/standard';
import AuthService from '../../utils/auth';

class SignIn extends Component {
  state = {
    containerId: 'put-lock-here',
    loggedIn: false,
  };

  componentDidMount() {
    this.setupAuthService();
  }

  setupAuthService = () => {
    this.auth = new AuthService(
      process.env.AUTH0_CLIENT_ID,
      process.env.AUTH0_CLIENT_DOMAIN,
    );

    const loggedIn = this.auth.loggedIn();
    this.setState(() => ({ loggedIn }));

    if (!loggedIn) this.auth.login();

    this.auth.lock.on('authenticated', result => {
      this.auth.lock.hide();
      console.log(result);
      console.log(this.props.url.asPath);
      Router.push('/');
    });
  };

  render() {
    return <div id={this.state.containerId} />;
  }
}

export default standard(SignIn);
