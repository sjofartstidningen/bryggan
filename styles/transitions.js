import { css } from 'styled-components';
import { transitions, timingFunctions } from 'polished';

export default (...props) => css`
  ${transitions(
    ...props.map(p => `${p} 0.3s ${timingFunctions('easeInOutSine')}`),
  )};
  will-change: ${props.join(', ')};
`;
