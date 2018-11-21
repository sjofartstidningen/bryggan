import { css } from 'styled-components';

const colors = {
  brand01: '#3d70b2',
  brand02: '#5596e6',
  brand03: '#41d6c3',
  ui01: '#ffffff',
  ui02: '#f5f7fa',
  ui03: '#f0f3f6',
  ui04: '#dfe3e6',
  ui05: '#8c9ba5',
  text01: '#152934',
  text02: '#5a6872',
  text03: '#5a6872',
  inverse01: '#ffffff',
  field01: 'rgba(60, 112, 178, .1)',
  error: '#e71d32',
  success: '#5aa700',
  warning: '#efc100',
  info: '#5aaafa',
};

export const getColor = prop => colors[prop];

export const colorMixin = prop => css`
  color: ${colors[prop]};
`;

export const backgroundColorMixin = prop => css`
  background-color: ${colors[prop]};
`;
