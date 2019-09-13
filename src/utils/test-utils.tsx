import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { DropboxProvider } from '../hooks/useDropbox';

type Navigate = (path: string) => void;

const Providers: React.FC<{ navigate?: Navigate }> = ({
  navigate = jest.fn(),
  children,
}) => {
  return (
    <React.Suspense fallback={<p>Loading</p>}>
      <ThemeProvider theme={theme}>
        <DropboxProvider navigate={navigate}>{children}</DropboxProvider>
      </ThemeProvider>
    </React.Suspense>
  );
};

interface ExtendedRenderOptions extends RenderOptions {
  navigate?: Navigate;
}

const customRender = (
  ui: React.ReactElement,
  options?: ExtendedRenderOptions,
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Providers navigate={options && options.navigate}>{children}</Providers>
    ),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
