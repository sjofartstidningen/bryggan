import { css } from 'styled-components';
import {
  getLuminance,
  transitions as _transitions,
  timingFunctions,
} from 'polished';
import { color } from './index';

const readableColor = c => (getLuminance(c) > 0.3 ? color.black : color.white);

const fontSmoothing = () => css`
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const transitions = {
  short: (...props) => css`
    ${_transitions(
      ...props.map(p => `${p} 0.2s ${timingFunctions('easeInOutCubic')}`),
    )};
  `,
};

export { readableColor, fontSmoothing, transitions };
