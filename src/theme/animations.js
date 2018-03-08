import { css, keyframes } from 'styled-components';

const animationBase = () => css`
  animation-duration: 0.5s;
  animation-fill-mode: both;
`;

const slideInUpKeys = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const slideInUp = () => css`
  animation-name: ${slideInUpKeys};
  ${animationBase};
`;

const slideInLeftKeys = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const slideInLeft = () => css`
  animation-name: ${slideInLeftKeys};
  ${animationBase};
`;

export { slideInUp, slideInLeft };
