import React, { Suspense, lazy, StrictMode, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { ApolloProvider, useApolloClient } from '@apollo/react-hooks';
import { client } from './apollo';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { LoaderOverlay } from './components/Loader';
import { AppWrapper } from './components/AppWrapper';
import {
  ErrorBoundary,
  ErrorBoundaryWithRefresh,
} from './components/ErrorBoundary';
import { PATH_AUTH_HANDLER, PATH_SIGN_IN } from './constants';
import { AuthProvider, useAuthEffect, useAuthMethods } from './hooks/use-auth2';
import { content, api } from './api/dropbox';
import { SettingsMenu } from './components/SettingsMenu';
import { MenuManager } from './hooks/use-menu';

const Landing = lazy(() => import('./pages/Landing'));
const SignIn = lazy(() => import('./pages/SignIn'));
const DropboxAuthHandler = lazy(() => import('./pages/DropboxAuthHandler'));

const App: React.FC = () => {
  const auth = useAuthMethods();
  const apolloClient = useApolloClient();
  const location = useLocation();

  useEffect(() => {
    auth.checkAuthState(location);
  });

  useAuthEffect(state => {
    switch (state.value) {
      case 'authorized':
        const authHeader = `Bearer ${state.context.token}`;
        content.defaults.headers.common['Authorization'] = authHeader;
        api.defaults.headers.common['Authorization'] = authHeader;
        break;

      default:
        content.defaults.headers.common['Authorization'] = undefined;
        api.defaults.headers.common['Authorization'] = undefined;
        apolloClient.resetStore();
    }
  });

  const loader = <LoaderOverlay />;

  return (
    <React.Fragment>
      <GlobalStyle />
      <ErrorBoundaryWithRefresh>
        <Header />
      </ErrorBoundaryWithRefresh>

      <ErrorBoundaryWithRefresh>
        <SettingsMenu />
      </ErrorBoundaryWithRefresh>

      <AppWrapper>
        <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
          <Suspense fallback={loader}>
            <Switch>
              <Route path={PATH_SIGN_IN}>
                <SignIn />
              </Route>

              <Route path={PATH_AUTH_HANDLER}>
                <DropboxAuthHandler fallback={loader} />
              </Route>

              <AuthenticatedRoute exact path="/" fallback={loader}>
                <Landing />
              </AuthenticatedRoute>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </AppWrapper>
    </React.Fragment>
  );
};

export const withProviders = <P extends object>(
  App: React.ComponentType<P>,
): React.FC<P> => props => {
  return (
    <StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <MenuManager>
                <App {...props} />
              </MenuManager>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default withProviders(App);
