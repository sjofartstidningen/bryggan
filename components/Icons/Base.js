import React from 'react';
import styled, { css } from 'styled-components';

const IconContainer = styled.div`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
`;

const SvgContainer = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;

  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;

  ${props =>
    props.baseline &&
    css`
      position: absolute;
      bottom: -0.125em;
    `};
`;

// eslint-disable-next-line
export const Svg = ({ children, className, ...props }) => (
  <IconContainer className={className}>
    <SvgContainer viewBox="0 0 24 24" {...props}>
      {children}
    </SvgContainer>
  </IconContainer>
);

const LineEl = styled.line``;
export const Line = props => (
  <LineEl vectorEffect="non-scaling-stroke" {...props} />
);

const PolylineEl = styled.polyline``;
export const Polyline = props => (
  <PolylineEl vectorEffect="non-scaling-stroke" {...props} />
);
