import { css } from 'styled-components';
import { transitions, timingFunctions } from 'polished';

const standard = (...props) => css`
  ${transitions(
    ...props.map(p => `${p} 0.3s ${timingFunctions('easeInOutSine')}`),
  )};
  will-change: ${props.join(', ')};
`;

export { standard as default };
