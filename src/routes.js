// @flow
import React from 'react';
import type { ContextRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import ProgressBar from './atoms/ProgressBar';

const createLoader = loader =>
  // $FlowFixMe
  Loadable({ loader, loading: () => <ProgressBar /> });

const Tidningen = createLoader(() => import('./pages/Tidningen'));
const Nyhetsbrevet = createLoader(() => import('./pages/Nyhetsbrevet'));
const Installningar = createLoader(() => import('./pages/Installningar'));

const routes = [
  {
    to: '/tidningen',
    title: 'Tidningen',
    render: (props: ContextRouter) => <Tidningen {...props} />,
  },
  {
    to: '/nyhetsbrevet',
    title: 'Nyhetsbrevet',
    render: (props: ContextRouter) => <Nyhetsbrevet {...props} />,
  },
  {
    to: '/installningar',
    title: 'Inställningar',
    render: (props: ContextRouter) => <Installningar {...props} />,
  },
];

export { routes as default };
