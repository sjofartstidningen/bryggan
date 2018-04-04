// @flow
import React from 'react';
import Loadable from 'react-loadable';
import ProgressBar from './atoms/ProgressBar';
import type { GlobalRoute } from './types';

const createLoader = loader =>
  // $FlowFixMe
  Loadable({ loader, loading: () => <ProgressBar /> });

const Tidningen = createLoader(() => import('./pages/Tidningen'));
const Nyhetsbrevet = createLoader(() => import('./pages/Nyhetsbrevet'));
const Installningar = createLoader(() => import('./pages/Installningar'));

const routes: Array<GlobalRoute> = [
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
