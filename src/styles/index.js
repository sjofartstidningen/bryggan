// @flow
import { css } from 'styled-components';
import './fonts.css';

type ScaleStep = {
  fontSize: number,
  letterSpacing: number,
  lineHeight: number,
  maxWidth: number,
};

const typeScales: Array<ScaleStep> = [
  { fontSize: 0.75, letterSpacing: 0.02, lineHeight: 1, maxWidth: 26.5 },
  { fontSize: 0.875, letterSpacing: 0.01, lineHeight: 1.25, maxWidth: 30 },
  { fontSize: 1, letterSpacing: 0, lineHeight: 1.375, maxWidth: 35 },
  { fontSize: 1.125, letterSpacing: 0, lineHeight: 1.5, maxWidth: 37.5 },
  { fontSize: 1.25, letterSpacing: 0, lineHeight: 1.625, maxWidth: 43 },
  { fontSize: 1.5, letterSpacing: 0, lineHeight: 1.875, maxWidth: 34 },
  { fontSize: 1.75, letterSpacing: 0, lineHeight: 2.25, maxWidth: 39.5 },
  { fontSize: 2, letterSpacing: 0, lineHeight: 2.5, maxWidth: 45 },
  { fontSize: 2.25, letterSpacing: 0, lineHeight: 2.75, maxWidth: 50.5 },
  { fontSize: 2.625, letterSpacing: 0, lineHeight: 3.125, maxWidth: 59 },
  { fontSize: 3, letterSpacing: 0, lineHeight: 3.5, maxWidth: 67.5 },
  { fontSize: 3.375, letterSpacing: 0, lineHeight: 4, maxWidth: 76 },
  { fontSize: 3.75, letterSpacing: 0, lineHeight: 4.375, maxWidth: 84 },
  { fontSize: 4.25, letterSpacing: 0, lineHeight: 4.875, maxWidth: 95.5 },
  { fontSize: 4.75, letterSpacing: 0, lineHeight: 5.375, maxWidth: 106.5 },
  { fontSize: 5.25, letterSpacing: 0, lineHeight: 5.875, maxWidth: 118 },
  { fontSize: 5.75, letterSpacing: -0.04, lineHeight: 6.375, maxWidth: 127 },
  { fontSize: 6.375, letterSpacing: -0.04, lineHeight: 7, maxWidth: 141 },
  { fontSize: 7, letterSpacing: -0.04, lineHeight: 7.625, maxWidth: 155 },
  { fontSize: 7.25, letterSpacing: -0.04, lineHeight: 8.125, maxWidth: 160.5 },
  { fontSize: 7.625, letterSpacing: -0.04, lineHeight: 8.75, maxWidth: 169 },
  { fontSize: 9, letterSpacing: -0.06, lineHeight: 9.5, maxWidth: 199 },
  { fontSize: 9.75, letterSpacing: -0.06, lineHeight: 10.25, maxWidth: 215.5 },
  { fontSize: 10.5, letterSpacing: -0.06, lineHeight: 10.875, maxWidth: 232.5 },
  { fontSize: 11.25, letterSpacing: -0.06, lineHeight: 11.75, maxWidth: 249 },
];

const getTypeScale = (step: number) => {
  const scale = typeScales[step];
  return css`
    font-size: ${scale.fontSize}rem;
    letter-spacing: ${scale.letterSpacing}rem;
    line-height: ${scale.lineHeight}rem;
    max-width: ${scale.maxWidth}rem;
  `;
};

type Layer = { boxShadow: string };
const layers: Array<Layer> = [
  { boxShadow: 'none' },
  { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.10)' },
  { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.10)' },
  { boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.10)' },
  { boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.10)' },
  { boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.10)' },
];

const getLayer = (step: number) => {
  const layer = layers[step];
  return css`
    box-shadow: ${layer.boxShadow};
  `;
};

type Color = {
  value: string,
  roles: Array<string>,
};

const colors: { [x: string]: Color } = {
  brand01: {
    value: '#3d70b2',
    roles: [
      'primary brand',
      'interactive text',
      'primary icon color',
      'border highlight',
      'emphasis background',
    ],
  },
  brand02: { value: '#5596e6', roles: ['supporting brand', 'brand01 hover'] },
  brand03: { value: '#41d6c3', roles: ['secondary brand', 'loading'] },
  ui01: {
    value: '#ffffff',
    roles: ['primary background', 'layer1-background'],
  },
  ui02: {
    value: '#f5f7fa',
    roles: ['default background', 'layer0 background', 'secondary background'],
  },
  ui03: { value: '#f0f3f6', roles: ['tertiary background'] },
  ui04: { value: '#dfe3e6', roles: ['subtle border'] },
  ui05: { value: '#8c9ba5', roles: ['emphasis border', 'secondary icons'] },
  text01: { value: '#152934', roles: ['primary text', 'body copy'] },
  text02: { value: '#5a6782', roles: ['secondary text', 'subtle copy'] },
  text03: { value: '#5a6782', roles: ['hint text'] },
  inverse01: {
    value: '#ffffff',
    roles: ['inverse text color', 'inverse icon color'],
  },
  field01: { value: 'rgba(60, 112, 178, .1)', roles: ['field background'] },
  support01: { value: '#e71d32', roles: ['error'] },
  support02: { value: '#5aa700', roles: ['success'] },
  support03: { value: '#efc100', roles: ['warning'] },
  support04: { value: '#5aaafa', roles: ['information'] },
};

const getColor = (role: string): string => {
  const color = Object.keys(colors).find(x => colors[x].roles.includes(role));
  if (color) return colors[color].value;
  return '';
};

const theme = {
  font: { sansSerif: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif' },
  fontWeight: { thin: 300, normal: 400, bold: 600 },
  fontSize: {
    body: '0.875rem',
    bodyPlus: '1rem',
  },
  lineHeight: {
    body: '1.5',
    header: '1.25',
  },
  color: {
    white: '#ffffff',
    black: '#1a1a1a',
    grey: '#c5c5c5',
    brand: '#0599e4',
    warning: '#ff0000',
  },
};

interface StyledProps {
  theme: typeof theme;
}

const ax = (path: string) => (props: StyledProps) => {
  const [initial, ...paths] = path.split('.');
  // $FlowFixMe
  const val = paths.reduce((acc, p) => acc[p], props.theme[initial]);
  return val;
};

const transition = (...props: Array<string>) => css`
  transition: ${props.map(prop => `${prop} 0.2s ease`).join(', ')};
`;

export { theme, ax, getTypeScale, getLayer, getColor, transition };
