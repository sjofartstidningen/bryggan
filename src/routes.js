import React from 'react';
import secureComponent from './hoc/secureComponent';
import Year from './containers/Tidningen/Year';
import Issue from './containers/Tidningen/Issue';
import SignedIn from './containers/SignedIn';
import SignIn from './containers/SignIn';

const ShowProps = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

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
    component: secureComponent(Year),
  },
  {
    path: '/tidningen/:year/:issue',
    exact: true,
    component: secureComponent(Issue),
  },
  {
    path: '/nyhetsbrevet',
    exact: true,
    component: ShowProps,
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn,
  },
  {
    path: '/signed-in',
    exact: true,
    component: SignedIn,
  },
];

export { routes as default };
