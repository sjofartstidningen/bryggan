import React from 'react';
import Header from '../components/Header';

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/tidningen', title: 'Tidningen', active: true },
  { href: '/nyhetsbrev', title: 'Nyhetsbrevet' },
];

export default () => (
  <div className="wrapper">
    <Header links={links} />
  </div>
);
