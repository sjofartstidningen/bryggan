// @flow
import { css } from 'styled-components';

export const transitionMixin = (...props: Array<string>) => css`
  transition: ${props.map(p => `${p} 0.2s ease`).join(', ')};
  will-change: ${props.map(p => p).join(', ')};
`;

const layers = {
  base: { boxShadow: 'none' },
  flat: { boxShadow: 'none' },
  raised: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.10)' },
  overlay: { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.10)' },
  stickyNav: { boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.10)' },
  temporaryNav: { boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.10)' },
  popOut: { boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.10)' },
};

export const layerMixin = (prop: $Keys<typeof layers>) => css`
  box-shadow: ${layers[prop].boxShadow};
`;

export const pseudoMixin = () => css`
  content: '';
  position: absolute;
`;
