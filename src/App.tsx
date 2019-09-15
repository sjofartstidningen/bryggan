import React, { Suspense, lazy, StrictMode, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';
import { Header } from 'components/Header';
import { Authenticated } from 'components/Authenticated';
import { LoaderOverlay } from 'components/Loader';
import {
  ErrorBoundary,
  ErrorBoundaryWithRefresh,
} from 'components/ErrorBoundary';
import { PATH_AUTH_HANDLER, PATH_SIGN_IN } from './constants';
import { AuthProvider, useAuth, AuthStage } from 'hooks/useAuth';
import { content, api } from 'api/dropbox';

const Landing = lazy(() => import('pages/Landing'));
const SignIn = lazy(() => import('pages/SignIn'));
const DropboxAuthHandler = lazy(() => import('pages/DropboxAuthHandler'));

const App: React.FC = () => {
  const auth = useAuth();

  useEffect(() => {
    switch (auth.stage) {
      case AuthStage.authorized:
        const token = `Bearer ${auth.accessToken}`;
        content.defaults.headers.common['Authorization'] = token;
        api.defaults.headers.common['Authorization'] = token;
        break;

      default:
        content.defaults.headers.common['Authorization'] = undefined;
        api.defaults.headers.common['Authorization'] = undefined;
    }
  }, [auth]);

  return (
    <StrictMode>
      <GlobalStyle />
      <ErrorBoundaryWithRefresh>
        <Header />
      </ErrorBoundaryWithRefresh>
      <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
        <Suspense fallback={<LoaderOverlay />}>
          <Router>
            <Authenticated path="/" fallback={<LoaderOverlay />}>
              <Landing path="/" />
            </Authenticated>
            <SignIn path={PATH_SIGN_IN} />
            <DropboxAuthHandler
              path={PATH_AUTH_HANDLER}
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
      <AuthProvider>
        <App {...props} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default withProviders(App);
