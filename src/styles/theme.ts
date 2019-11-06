import {
  DefaultTheme,
  StyledProps,
  css,
  SimpleInterpolation,
  CSSObject,
} from 'styled-components';
import { transparentize } from 'polished';

const createSelector = <
  R extends keyof DefaultTheme,
  K extends keyof DefaultTheme[R],
  P
>(
  rootKey: R,
) => (key: K) => (props: StyledProps<P>) => {
  return props.theme[rootKey][key];
};

export const color = createSelector('color');
export const font = createSelector('font');
export const size = createSelector('size');
export const maxWidth = createSelector('maxWidth');
export const spacing = createSelector('spacing');
export const tracking = createSelector('tracking');
export const screens = createSelector('screens');
export const shadow = createSelector('shadow');
export const layer = createSelector('layer');

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

const colors = {
  white: '#ffffff',
  black: '#333333',
  shade: '#e6e6e6',
  highlight: '#0599e4',
  warning: '#d73a49',
};

export const theme: DefaultTheme = {
  color: colors,
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
  maxWidth: {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    xl2: '42rem',
    xl3: '48rem',
    xl4: '56rem',
    xl5: '64rem',
    xl6: '72rem',
    full: '100%',
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
  shadow: {
    default: `
      0 1px 3px 0 ${transparentize(0.9, colors.black)},
      0 1px 2px 0 ${transparentize(0.06, colors.black)}`,
    md: `
      0 4px 6px -1px ${transparentize(0.9, colors.black)},
      0 2px 4px -1px ${transparentize(0.94, colors.black)}`,
    lg: `
      0 10px 15px -3px ${transparentize(0.1, colors.black)},
      0 4px 6px -2px ${transparentize(0.05, colors.black)}`,
    xl: `
      0 20px 25px -5px ${transparentize(0.1, colors.black)},
      0 10px 10px -5px ${transparentize(0.04, colors.black)}`,
    xl2: `0 25px 50px -12px ${transparentize(0.25, colors.black)}`,
    inner: `inset 0 2px 4px 0 ${transparentize(0.06, colors.black)}`,
    outline: `0 0 0 2px ${transparentize(0.5, colors.highlight)}`,
    none: 'none',
  },
  layer: {
    base: 1,
    header: 10,
    popup: 20,
  },
};
