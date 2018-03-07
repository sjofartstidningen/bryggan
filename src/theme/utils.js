// @flow
import { css } from 'styled-components';
import { getLuminance } from 'polished';
import { color } from './index';

const readableColor = (c: string): string =>
  getLuminance(c) > 0.3 ? color.black : color.white;

const fontSmoothing = () => css`
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export { readableColor, fontSmoothing };
