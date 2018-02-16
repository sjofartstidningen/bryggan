// @flow
import { css } from 'styled-components';

export const transitionMixin = (...props: Array<string>) => css`
  transition: ${props.map(p => `${p} 0.2s ease`).join(', ')};
  will-change: ${props.map(p => p).join(', ')};
`;

const layers = {
  base: { boxShadow: 'none', zIndex: 0 },
  flat: { boxShadow: 'none', zIndex: 1 },
  raised: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.10)', zIndex: 2 },
  overlay: { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.10)', zIndex: 3 },
  stickyNav: { boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.10)', zIndex: 4 },
  temporaryNav: { boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.10)', zIndex: 5 },
  popOut: { boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.10)', zIndex: 6 },
};

export const layerMixin = (prop: $Keys<typeof layers>) => {
  const mixin = layers[prop];

  return css`
    box-shadow: ${mixin.boxShadow};
    z-index: ${mixin.zIndex};
  `;
};

export const pseudoMixin = () => css`
  content: '';
  position: absolute;
`;
