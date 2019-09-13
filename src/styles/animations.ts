import { css, keyframes, Keyframes } from 'styled-components';

interface AnimatedProps {
  duration?: number;
  delay?: number;
  infinite?: boolean;
  alternate?: boolean;
}

export const animated = (
  animation: Keyframes,
  {
    duration = 1,
    delay = 0,
    infinite = false,
    alternate = false,
  }: AnimatedProps = {},
) => css`
  animation-name: ${animation};
  animation-duration: ${duration}s;
  animation-fill-mode: both;
  animation-delay: ${delay}s;

  ${infinite &&
    css`
      animation-iteration-count: infinite;
    `}

  ${alternate &&
    css`
      animation-direction: alternate;
    `}

  @media (print), (prefers-reduced-motion: reduce) {
    & {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeOutUp = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
`;
