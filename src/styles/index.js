// @flow
import './fonts.css';

const theme = {
  font: { sansSerif: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif' },
  fontWeight: { thin: 300, normal: 400, bold: 600 },
  fontSize: {
    body: '0.875rem',
    bodyPlus: '1rem',
  },
  lineHeight: {
    body: '1.5',
    header: '1.25',
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
