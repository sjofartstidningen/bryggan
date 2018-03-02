// @flow
import { hsl, opacify } from 'polished';

type Font = { family: string };
const font: Font = {
  family: '"Roboto", sans-serif',
};

type Weight = { normal: number, bold: number };
const weight: Weight = {
  normal: 400,
  bold: 700,
};

type TypeSize = { label: string, body: string, heading: string };
const typeSize: TypeSize = {
  label: '12px',
  body: '16px',
  heading: '18px',
};

type LineHeight = { label: number, body: number, heading: number };
const lineHeight: LineHeight = {
  label: 1,
  body: 1.5,
  heading: 1.2,
};

type Color = {
  black: string,
  greyDark: string,
  grey: string,
  greyLight: string,
  brand: string,
  error: string,
};
const color: Color = {
  black: hsl(0, 0, 0.17),
  greyDark: hsl(0, 0, 0.4),
  grey: hsl(0, 0, 0.65),
  greyLight: hsl(0, 0, 0.95),
  brand: hsl(200, 98, 89),
  error: hsl(10, 63, 92),
};

type Border = { lightGrey: string, brand: string };
const border: Border = {
  lightGrey: `1px solid ${opacify(0.25, color.grey)}`,
  brand: `1px solid ${color.brand}`,
};

export { font, weight, typeSize, lineHeight, color, border };
