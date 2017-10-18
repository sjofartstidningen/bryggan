// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import Progress from 'nprogress';
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
  error: ?{ message: string },
  user: ?User,
  title?: string,
  children?: Node,
};

const Layout = ({ error, user, title, children }: Props) => (
  <ThemeProvider theme={theme}>
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="error">{error && error.message}</div>

      <Header user={user} />

      <Container>{children}</Container>
    </div>
  </ThemeProvider>
);

Layout.defaultProps = {
  user: null,
  title: 'Bryggan - Sjöfartstidningen',
  children: null,
};

const mapStateToProps = ({ tidningen }) => ({ error: tidningen.error });

// $FlowFixMe
export default connect(mapStateToProps)(Layout);

/**
 * Progress bar
 */
Router.onRouteChangeStart = () => Progress.start();
Router.onRouteChangeComplete = () => Progress.done();
Router.onRouteChangeError = () => Progress.done();
