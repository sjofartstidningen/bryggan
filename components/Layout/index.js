// @flow

import React from 'react';
import type { Node } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../Header';

const Container = styled.div`
  width: 100vw;
  max-width: 70rem;
  margin: 0 auto;
  font-size: 1rem;
`;

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

    <Container>{children}</Container>
  </div>
);

Layout.defaultProps = {
  user: null,
  title: 'Bryggan - Sjöfartstidningen',
  children: null,
};

export default Layout;
