// @flow
import React from 'react';
import type { ContextRouter } from 'react-router-dom';
import Tidningen from './pages/Tidningen';
import PreProps from './components/PreProps';

const routes = [
  {
    to: '/tidningen',
    title: 'Tidningen',
    render: (props: ContextRouter) => <Tidningen {...props} />,
  },
  {
    to: '/nyhetsbrevet',
    title: 'Nyhetsbrevet',
    render: (props: ContextRouter) => <PreProps {...props} />,
  },
  {
    to: '/installningar',
    title: 'Inställningar',
    render: (props: ContextRouter) => <PreProps {...props} />,
  },
];

export { routes as default };
