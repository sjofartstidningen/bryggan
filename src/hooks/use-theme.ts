import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';

export function useTheme(): DefaultTheme {
  const theme = useContext(ThemeContext);
  return theme || {};
}

const createHook = <R extends keyof DefaultTheme>(key: R) => () => {
  const theme = useTheme();
  return theme[key];
};

export const useColor = createHook('color');
export const useFont = createHook('font');
export const useSize = createHook('size');
export const useSpacing = createHook('spacing');
export const useTracking = createHook('tracking');
export const useScreens = createHook('screens');
