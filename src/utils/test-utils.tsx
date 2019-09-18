import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
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

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
