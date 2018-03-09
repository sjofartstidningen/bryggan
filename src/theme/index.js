// @flow
import { hsl, hsla, rem } from 'polished';

const font = {
  family: '"Roboto", sans-serif',
};

const weight = {
  normal: 400,
  bold: 700,
};

const typeSize = {
  label: rem('12px'),
  body: rem('16px'),
  heading: rem('18px'),
};

const lineHeight = {
  label: rem('16px'),
  heading: rem('18px'),
  body: rem('24px'),
  double: rem('32px'),
};

const margin = {
  fourth: rem('4px'),
  half: rem('8px'),
  standard: rem('16px'),
  extra: rem('18px'),
  extended: rem('24px'),
  double: rem('32px'),
};

const padding = margin;

const color = {
  white: hsl(0, 0, 1),
  black: hsl(0, 0, 0.17),
  greyLight: hsl(0, 0, 0.95),
  grey: hsl(0, 0, 0.65),
  greyDark: hsl(0, 0, 0.4),
  brand: hsl(200, 0.96, 0.45),
  error: hsl(10, 0.78, 0.63),
};

const border = {
  greyOpaque: `1px solid ${hsla(0, 0, 0.4, 0.25)}`,
  brand: `1px solid ${color.brand}`,
};

const boxShadow = {
  greyOpaque: `0px 2px 6px ${hsla(0, 0, 0.4, 0.25)}`,
};

export {
  font,
  weight,
  typeSize,
  lineHeight,
  margin,
  padding,
  color,
  border,
  boxShadow,
};
