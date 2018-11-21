import { css, keyframes } from 'styled-components';

const animationBase = anim => () => css`
  animation-name: ${anim};
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

const slideInUp = animationBase(slideInUpKeys);

const slideInDownKeys = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const slideInDown = animationBase(slideInDownKeys);

const slideInDownShortKeys = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
    visibility: visible;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const slideInDownShort = animationBase(slideInDownShortKeys);

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

const slideInLeft = animationBase(slideInLeftKeys);

const slideOutUpKeys = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
`;

const slideOutUp = animationBase(slideOutUpKeys);

const slideOutDownKeys = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
`;

const slideOutDown = animationBase(slideOutDownKeys);

const fadeInKeys = keyframes`
  from {
    opacity: 0;
    visibility: hidden;
  }

  to {
    opacity: 1;
    visibility: visible;
  }
`;

const fadeIn = animationBase(fadeInKeys);

export {
  slideInUp,
  slideInDown,
  slideInDownShort,
  slideInLeft,
  slideOutUp,
  slideOutDown,
  fadeIn,
};
