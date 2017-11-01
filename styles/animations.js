import { css, keyframes } from 'styled-components';

export default function base(animationName, dur = 0.5) {
  return () => css`
    animation-name: ${animationName};
    animation-duration: ${dur}s;
    animation-fill-mode: both;

    ${props =>
      props.infinite &&
      css`
        animation-iteration-count: infinite;
      `};
  `;
}

/**
 * Fade in
 */
const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeIn = base(fadeInKeyframes);

/**
 * Fade out
 */
const fadeOutKeyframes = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const fadeOut = base(fadeOutKeyframes);

/**
 * Slide in down
 */
const slideInDownKeyframes = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

export const slideInDown = base(slideInDownKeyframes);

/**
 * Slide out up
 */
const slideOutUpKeyframes = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }
`;

export const slideOutUp = base(slideOutUpKeyframes);
