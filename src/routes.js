import React from 'react';
import { connect } from 'react-redux';
import Year from './containers/Tidningen/Year';
import Issue from './containers/Tidningen/Issue';
import SignIn from './containers/SignIn';

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
];

export { routes as default };
