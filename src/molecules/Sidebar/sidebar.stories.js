/* eslint-disable import/no-extraneous-dependencies */
// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Sidebar from './index';
import pkg from '../../../package.json';

const links = [
  { to: '/home', title: 'Home' },
  { to: '/about', title: 'About' },
  { to: '/contact', title: 'Contact' },
  { to: '/hello', title: 'Say hello' },
];

const [
  email,
  // eslint-disable-next-line
] = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.exec(
  pkg.author,
);

storiesOf('molecules/Sidebar', module)
  .add('standard', () => (
    <Sidebar links={links} user={{ email }} onSignOut={action('sign out')} />
  ))
  .add('with fallback profile', () => (
    <Sidebar
      links={links}
      user={{ email: 'email@without.gravatar' }}
      onSignOut={action('sign out')}
    />
  ));
