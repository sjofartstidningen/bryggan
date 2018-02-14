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

function SecureRoute({
  authenticated,
  redirect = '/sign-in',
  ...rest
}: Props = {}) {
  return authenticated ? <Route {...rest} /> : <Redirect to={redirect} />;
}

export default SecureRoute;
