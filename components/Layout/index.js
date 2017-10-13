// @flow

import React from 'react';
import type { Node } from 'react';
import Head from 'next/head';
import Header from '../Header';

type Props = {
  activeLink: string,
  user: ?User,
  title?: string,
  children?: Node,
};

const Layout = ({ activeLink, user, title, children }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <Header activeLink={activeLink} user={user} />

    {children}
  </div>
);

Layout.defaultProps = {
  user: null,
  title: 'Bryggan - Sjöfartstidningen',
  children: null,
};

export default Layout;
