import {
  DefaultTheme,
  StyledProps,
  css,
  SimpleInterpolation,
  CSSObject,
} from 'styled-components';
import useStyledTheme from './utils';

const createSelector = <
  R extends keyof DefaultTheme,
  K extends keyof DefaultTheme[R],
  P
>(
  rootKey: R,
) => (key: K) => (props: StyledProps<P>) => props.theme[rootKey][key];

export const color = createSelector('color');
export const font = createSelector('font');
export const size = createSelector('size');
export const spacing = createSelector('spacing');
export const tracking = createSelector('tracking');
export const screens = createSelector('screens');

const createHook = <
  R extends keyof DefaultTheme,
  K extends keyof DefaultTheme[R]
>(
  rootKey: R,
) => (key: K) => {
  const theme = useStyledTheme();
  return theme[rootKey][key];
};

export const useColor = createHook('color');
export const useFont = createHook('font');
export const useSize = createHook('size');
export const useSpacing = createHook('spacing');
export const useTracking = createHook('tracking');
export const useScreens = createHook('screens');

export const screen = (scr: keyof DefaultTheme['screens']) => {
  return (
    first: CSSObject | TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => css`
    @media (min-width: ${p => p.theme.screens[scr]}) {
      ${css(first, ...interpolations)};
    }
  `;
};

export const theme: DefaultTheme = {
  color: {
    white: '#ffffff',
    black: '#333333',
    shade: '#e6e6e6',
    highlight: '#0599e4',
    warning: '#d73a49',
  },
  font: {
    display: '"Montserrat", sans-serif',
    body:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.875rem',
    xl4: '2.25rem',
    xl5: '3rem',
    xl6: '4rem',
  },
  spacing: {
    '0': '0',
    px: '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  },
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};