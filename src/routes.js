// @flow
import React from 'react';
import type { ContextRouter } from 'react-router-dom';
import Tidningen from './pages/Tidningen';
import Nyhetsbrevet from './pages/Nyhetsbrevet';
import Installningar from './pages/Installningar';

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
