import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      white: string;
      black: string;
      shade: string;
      highlight: string;
      warning: string;
    };
    font: {
      display: string;
      body: string;
    };
    size: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      xl2: string;
      xl3: string;
      xl4: string;
      xl5: string;
      xl6: string;
    };
    maxWidth: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xl2: string;
      xl3: string;
      xl4: string;
      xl5: string;
      xl6: string;
      full: string;
    };
    spacing: {
      '0': string;
      px: string;
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '8': string;
      '10': string;
      '12': string;
      '16': string;
      '20': string;
      '24': string;
      '32': string;
      '40': string;
      '48': string;
      '56': string;
      '64': string;
    };
    tracking: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadow: {
      default: string;
      md: string;
      lg: string;
      xl: string;
      xl2: string;
      inner: string;
      outline: string;
      none: string;
    };
    layer: {
      base: number;
      header: number;
      popup: number;
    };
  }
}
