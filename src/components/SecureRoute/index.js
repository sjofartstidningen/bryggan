/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function SecureRoute({ authenticated, redirect, path, ...rest }) {
  return authenticated ? (
    <Route path={path} {...rest} />
  ) : (
    <Redirect to={{ pathname: redirect, state: { referrer: path } }} />
  );
}

SecureRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  component: PropTypes.element,
  render: PropTypes.func,
  children: PropTypes.node,
  path: PropTypes.string,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
};
SecureRoute.defaultProps = { redirect: '/sign-in' };

export { SecureRoute as default };
