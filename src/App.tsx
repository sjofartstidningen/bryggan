import React, { Suspense, lazy, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from '@reach/router';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header';
import { Authenticated } from './components/Authenticated';
import { LoaderOverlay } from './components/Loader';
import {
  ErrorBoundary,
  ErrorBoundaryWithRefresh,
} from './components/ErrorBoundary';
import { PATH_AUTH_HANDLER, PATH_SIGN_IN } from './constants';
import { AuthProvider, AuthStatus, useAuthEffect } from './hooks/use-auth';
import { content, api } from './api/dropbox';
import { SettingsMenu } from './components/SettingsMenu';
import { MenuManager } from './hooks/use-menu';

const Landing = lazy(() => import('./pages/Landing'));
const SignIn = lazy(() => import('./pages/SignIn'));
const DropboxAuthHandler = lazy(() => import('./pages/DropboxAuthHandler'));

const App: React.FC = () => {
  useAuthEffect(auth => {
    switch (auth.status) {
      case AuthStatus.authorized:
        const token = `Bearer ${auth.accessToken}`;
        content.defaults.headers.common['Authorization'] = token;
        api.defaults.headers.common['Authorization'] = token;
        break;

      default:
        content.defaults.headers.common['Authorization'] = undefined;
        api.defaults.headers.common['Authorization'] = undefined;
    }
  });

  return (
    <StrictMode>
      <GlobalStyle />
      <ErrorBoundaryWithRefresh>
        <Header />
      </ErrorBoundaryWithRefresh>

      <ErrorBoundaryWithRefresh>
        <SettingsMenu />
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

export const withProviders = <P extends object>(
  App: React.ComponentType<P>,
): React.FC<P> => props => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MenuManager>
          <App {...props} />
        </MenuManager>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default withProviders(App);
