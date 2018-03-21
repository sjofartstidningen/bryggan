/* eslint-disable react/require-default-props */
// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { ComponentType, Node } from 'react';
import type { ContextRouter } from 'react-router-dom';

type Props = {
  authenticated: boolean,
  redirect?: string,
  component?: ComponentType<*>,
  render?: (router: ContextRouter) => Node,
  children?: ComponentType<ContextRouter> | Node,
  path?: string,
  exact?: boolean,
  strict?: boolean,
};

function SecureRoute({ authenticated, redirect, path, ...rest }: Props) {
  return authenticated ? (
    <Route path={path} {...rest} />
  ) : (
    <Redirect to={{ pathname: redirect, state: { referrer: path } }} />
  );
}

SecureRoute.defaultProps = { redirect: '/sign-in' };

export { SecureRoute as default };
