import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import localforage from 'localforage';
import {
  MockedProvider as ApolloProvider,
  MockedResponse,
} from '@apollo/react-testing';
import { theme } from '../styles/theme';
import { AuthProvider } from '../hooks/use-auth';
import { LOCALSTORAGE_AUTH_KEY } from '../constants';
import { PersistedAuthSet } from '../types/bryggan';
import { createCache } from './apollo';

interface ProviderProps {
  mocks?: ReadonlyArray<MockedResponse>;
  skipAuth?: boolean;
}

const Providers: React.FC<ProviderProps> = ({ children, mocks, skipAuth }) => {
  const Auth = skipAuth ? 'div' : AuthProvider;

  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <ApolloProvider mocks={mocks} addTypename={true} cache={createCache()}>
        <ThemeProvider theme={theme}>
          <Auth>{children}</Auth>
        </ThemeProvider>
      </ApolloProvider>
    </React.Suspense>
  );
};

interface CustomOptions {
  initialEntries?: string[];
}

const customRender = (
  ui: React.ReactElement,
  {
    mocks,
    skipAuth,
    initialEntries = ['/'],
    ...options
  }: RenderOptions & CustomOptions & ProviderProps = {},
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <Providers mocks={mocks} skipAuth={skipAuth}>
          {children}
        </Providers>
      </MemoryRouter>
    ),
    ...options,
  });
};

interface WithHistoryOptions {
  history?: History;
}

const renderWithHistory = (
  ui: React.ReactElement,
  { history, ...options }: RenderOptions & WithHistoryOptions = {},
) => {
  const memoryHistory = history || createMemoryHistory();
  const res = render(ui, {
    wrapper: ({ children }) => (
      <Router history={memoryHistory}>
        <Providers>{children}</Providers>
      </Router>
    ),
    ...options,
  });

  return { ...res, history: memoryHistory };
};

interface EnsureAuthArgs {
  token?: string;
}

const ensureAuthenticated = async ({
  token = 'abc123',
}: EnsureAuthArgs = {}) => {
  await localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
    accessToken: token,
  });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, renderWithHistory, ensureAuthenticated };
