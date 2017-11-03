import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import AuthService from '../../utils/auth';
import standardPage from '../../hoc/standardPage';
import { signOut } from '../../store/auth/actions';
import config from '../../config';

class SignOut extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.auth = new AuthService(config.auth0id, config.auth0domain);

    this.auth.logout();
    this.props.dispatch(signOut());
    Router.push('/auth/sign-in');
  }

  // eslint-disable-next-line
  render() {
    return <div />;
  }
}

export default standardPage(SignOut);
