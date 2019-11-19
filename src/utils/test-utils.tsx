import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import nock from 'nock';
import localforage from 'localforage';
import { theme } from '../styles/theme';
import { AuthProvider } from '../hooks/use-auth';
import { MenuManager } from '../hooks/use-menu';
import { LOCALSTORAGE_AUTH_KEY } from '../constants';
import { PersistedAuthSet } from '../types/bryggan';

const Providers: React.FC = ({ children }) => {
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MenuManager>{children}</MenuManager>
        </AuthProvider>
      </ThemeProvider>
    </React.Suspense>
  );
};

interface RouterOptions {
  initialEntries?: string[];
}

const customRender = (
  ui: React.ReactElement,
  options: RenderOptions & RouterOptions = {},
) => {
  const initialEntries = options.initialEntries || ['/'];
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>
        <Providers>{children}</Providers>
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
  scope.post('/2/check/user').reply(200, (_, body: Record<string, any>) => ({
    result: body.query,
  }));

  scope.post('/2/auth/token/revoke').reply(200, {});

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
