import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import Progress from 'nprogress';
import styled, { ThemeProvider } from 'styled-components';
import { modularScale } from 'polished';
import theme from '../../styles/theme';
import Header from '../Header';

const Wrapper = styled.div`
  position: relative;
  z-index: ${props => props.theme.zIndex.zero};
`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  max-width: 44rem;
  margin: 0 auto;
  padding: ${modularScale(0)};
  font-size: ${modularScale(0)};
`;

const Layout = ({ error, user, title, children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="error">{error && error.message}</div>

      <Header user={user} />

      <Container className="container">{children}</Container>
    </Wrapper>
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

const mapStateToProps = ({ tidningen, auth }) => ({
  error: tidningen.error,
  user: auth.user,
});

export default connect(mapStateToProps)(Layout);

/**
 * Progress bar
 */
Router.onRouteChangeStart = () => Progress.start();
Router.onRouteChangeComplete = () => Progress.done();
Router.onRouteChangeError = () => Progress.done();
