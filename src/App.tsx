import React, { Suspense, lazy, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, navigate } from '@reach/router';
import { DropboxProvider } from 'hooks/useDropbox';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';
import { Header } from 'components/Header';
import { Authenticated } from 'components/Authenticated';
import { LoaderOverlay } from 'components/Loader';
import {
  ErrorBoundary,
  ErrorBoundaryWithRefresh,
} from 'components/ErrorBoundary';
import { AUTH_HANDLER_PATH } from './constants';

const Landing = lazy(() => import('pages/Landing'));
const SignIn = lazy(() => import('pages/SignIn'));
const DropboxAuthHandler = lazy(() => import('pages/DropboxAuthHandler'));

const App: React.FC = () => {
  return (
    <StrictMode>
      <GlobalStyle />
      <ErrorBoundaryWithRefresh>
        <Header />
      </ErrorBoundaryWithRefresh>
      <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
        <Suspense fallback={<LoaderOverlay />}>
          <Router>
            <Authenticated
              path="/"
              signInUri="/sign-in"
              fallback={<LoaderOverlay />}
            >
              <Landing path="/" />
            </Authenticated>
            <SignIn path="sign-in" />
            <DropboxAuthHandler
              path={AUTH_HANDLER_PATH}
              fallback={<LoaderOverlay />}
            />
          </Router>
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  );
};

const withProviders = <P extends object>(
  App: React.ComponentType<P>,
): React.FC<P> => props => {
  return (
    <ThemeProvider theme={theme}>
      <DropboxProvider navigate={navigate}>
        <App {...props} />
      </DropboxProvider>
    </ThemeProvider>
  );
};

export default withProviders(App);
