import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { theme } from '../styles/theme';
import { AuthProvider } from '../hooks/use-auth';
import { MenuManager } from '../hooks/use-menu';

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

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, renderWithHistory };
