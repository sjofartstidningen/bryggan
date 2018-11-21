import React from 'react';
import Loadable from 'react-loadable';
import ProgressBar from './atoms/ProgressBar';

const createLoader = loader =>
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

const routes = [
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
