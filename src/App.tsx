import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
import { AuthProvider, useAuthEffect } from './hooks/use-auth';

const Landing = React.lazy(() => import('./pages/Landing'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const DropboxAuthHandler = React.lazy(() => {
  return import('./pages/DropboxAuthHandler');
});

const App: React.FC = () => {
  const apolloClient = useApolloClient();

  useAuthEffect(state => {
    if (state.matches('authenticated')) return;
    apolloClient.resetStore();
  });

  const loader = <LoaderOverlay />;

  return (
    <React.Fragment>
      <GlobalStyle />
      <ErrorBoundaryWithRefresh>
        <Header />
      </ErrorBoundaryWithRefresh>

      <AppWrapper>
        <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
          <React.Suspense fallback={loader}>
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
          </React.Suspense>
        </ErrorBoundary>
      </AppWrapper>
    </React.Fragment>
  );
};

export const withProviders = <P extends object>(
  App: React.ComponentType<P>,
): React.FC<P> => props => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <App {...props} />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default withProviders(App);
