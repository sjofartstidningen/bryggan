// @flow
import { css } from 'styled-components';

const typeFamily = '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif';

const typeSize = {
  giga: { fontSize: 4.75, fontWeight: 300, lineHeight: 1.25, maxWidth: 106.5 },
  mega: { fontSize: 3.375, fontWeight: 300, lineHeight: 1.25, maxWidth: 76 },

  alpha: { fontSize: 2.25, fontWeight: 300, lineHeight: 1.25, maxWidth: 50.5 },
  beta: { fontSize: 1.75, fontWeight: 300, lineHeight: 1.25, maxWidth: 39.5 },
  gamma: { fontSize: 1.25, fontWeight: 300, lineHeight: 1.25, maxWidth: 43 },
  delta: { fontSize: 1.125, fontWeight: 600, lineHeight: 1.25, maxWidth: 37.5 },
  epsilon: { fontSize: 1, fontWeight: 600, lineHeight: 1.25, maxWidth: 35 },
  zeta: { fontSize: 0.875, fontWeight: 600, lineHeight: 1.25, maxWidth: 30 },
  omega: { fontSize: 0.75, fontWeight: 600, lineHeight: 1.25, maxWidth: 26.5 },

  p: { fontSize: 1, fontWeight: 400, lineHeight: 1.5, maxWidth: 35 },
  ui: { fontSize: 0.875, fontWeight: 400, lineHeight: 1.5, maxWidth: 30.5 },
  caption: { fontSize: 0.75, fontWeight: 400, lineHeight: 1.5, maxWidth: 26.5 },
  legal: { fontSize: 0.6875, fontWeight: 400, lineHeight: 1.5, maxWidth: 24 },
};

export const typeMixin = (prop: $Keys<typeof typeSize>) => {
  const mixin = typeSize[prop];
  return css`
    max-width: ${mixin.maxWidth}rem;
    font-family: ${typeFamily};
    font-size: ${mixin.fontSize}rem;
    font-weight: ${mixin.fontWeight};
    line-height: ${mixin.lineHeight};
  `;
}
