// @flow

const theme = {
  font: {
    sansSerif:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  fontWeight: {
    thin: 200,
    normal: 400,
    bold: 700,
  },
  color: {
    white: '#ffffff',
    black: '#1a1a1a',
    grey: '#c5c5c5',
    brand: '#0599e4',
    warning: '#ff0000',
  },
};

interface StyledProps {
  theme: typeof theme;
}

const ax = (path: string) => (props: StyledProps) => {
  const [initial, ...paths] = path.split('.');
  // $FlowFixMe
  const val = paths.reduce((acc, p) => acc[p], props.theme[initial]);
  return val;
};

export { theme, ax };
