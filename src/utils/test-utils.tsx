import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import nock from 'nock';
import localforage from 'localforage';
import {
  MockedProvider as ApolloProvider,
  MockedResponse,
} from '@apollo/react-testing';
import { theme } from '../styles/theme';
import { AuthProvider } from '../hooks/use-auth';
import { MenuManager } from '../hooks/use-menu';
import { LOCALSTORAGE_AUTH_KEY } from '../constants';
import { PersistedAuthSet } from '../types/bryggan';

interface ProviderProps {
  mocks?: ReadonlyArray<MockedResponse>;
}

const Providers: React.FC<ProviderProps> = ({ children, mocks }) => {
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <ApolloProvider mocks={mocks} addTypename={true}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <MenuManager>{children}</MenuManager>
          </AuthProvider>
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
    initialEntries = ['/'],
    ...options
  }: RenderOptions & CustomOptions & ProviderProps = {},
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <Providers mocks={mocks}>{children}</Providers>
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

const mockDropboxApi = (): nock.Scope => {
  return nock('https://api.dropboxapi.com', {
    reqheaders: { authorization: /^bearer .+/i },
  });
};

interface EnsureAuthArgs {
  token?: string;
  scope?: nock.Scope;
}

const ensureAuthenticated = async ({
  token = 'abc123',
  scope = mockDropboxApi(),
}: EnsureAuthArgs = {}) => {
  await localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
    accessToken: token,
  });

  return scope;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export {
  customRender as render,
  renderWithHistory,
  mockDropboxApi,
  ensureAuthenticated,
};
