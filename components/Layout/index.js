import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import Progress from 'nprogress';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Header from '../Header';

const Container = styled.div`
  position: relative;
  width: 100vw;
  max-width: 44rem;
  margin: 0 auto;
  font-size: 1rem;
`;

const Layout = ({ error, user, title, children }) => (
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

Layout.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
  }),
  title: PropTypes.string,
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),
  children: PropTypes.node,
};

Layout.defaultProps = {
  user: null,
  title: 'Bryggan - Sjöfartstidningen',
  error: null,
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
