// @flow

import React from 'react';
import type { Node } from 'react';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Header from '../Header';

const Container = styled.div`
  width: 100vw;
  max-width: 44rem;
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
  <ThemeProvider theme={theme}>
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Header activeLink={activeLink} user={user} />

      <Container>{children}</Container>
    </div>
  </ThemeProvider>
);

Layout.defaultProps = {
  user: null,
  title: 'Bryggan - Sjöfartstidningen',
  children: null,
};

export default Layout;
