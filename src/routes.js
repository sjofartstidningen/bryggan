// @flow
import React from 'react';
import Loadable from 'react-loadable';
import { Redirect } from 'react-router-dom';
import ProgressBar from './atoms/ProgressBar';
import type { GlobalRoute } from './types';

const createLoader = loader =>
  // $FlowFixMe
  Loadable({
    loader,
    loading: ({ isLoading }) => isLoading && <ProgressBar />,
  });

const Tidningen = createLoader(() =>
  import('./pages/Tidningen' /* webpackChunkName: "tidningen" */),
);
const Nyhetsbrevet = createLoader(() =>
  import('./pages/Nyhetsbrevet' /* webpackChunkName: "nyhetsbrevet" */),
);
const Installningar = createLoader(() =>
  import('./pages/Installningar' /* webpackChunkName: "installningar" */),
);

const routes: Array<GlobalRoute> = [
  {
    to: '/',
    exact: true,
    title: 'Hem',
    render: () => <Redirect to="/tidningen" />,
  },
  {
    to: '/tidningen',
    title: 'Tidningen',
    render: props => <Tidningen {...props} />,
  },
  {
    to: '/nyhetsbrevet',
    title: 'Nyhetsbrevet',
    render: props => <Nyhetsbrevet {...props} />,
  },
  {
    to: '/installningar',
    title: 'Inställningar',
    render: props => <Installningar {...props} />,
  },
];

export { routes as default };
