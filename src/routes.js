import React from 'react';
import { connect } from 'react-redux';
import Year from './containers/Tidningen/Year';
import Issue from './containers/Tidningen/Issue';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import Settings from './containers/Settings';

const ShowProps = connect(state => state)(props => (
  <pre>{JSON.stringify(props, null, 2)}</pre>
));

const routes = [
  {
    path: '/',
    exact: true,
    component: ShowProps,
  },
  {
    path: '/dashboard',
    exact: true,
    component: ShowProps,
  },
  {
    path: '/tidningen',
    exact: true,
    component: Year,
  },
  {
    path: '/tidningen/:year/:issue',
    exact: true,
    component: Issue,
  },
  {
    path: '/nyhetsbrevet',
    exact: true,
    component: ShowProps,
  },
  {
    path: '/auth/sign-in',
    exact: true,
    component: SignIn,
  },
  {
    path: '/auth/sign-out',
    exact: true,
    component: SignOut,
  },
  {
    path: '/auth/settings',
    exact: true,
    component: Settings,
  },
];

export { routes as default };
