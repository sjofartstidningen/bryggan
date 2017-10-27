import React from 'react';
import styled from 'styled-components';

const SvgContainer = styled.svg`
  display: inline-block;
  width: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

// eslint-disable-next-line
export const Svg = ({ children, ...props }) => (
  <SvgContainer viewBox="0 0 24 24" {...props}>
    {children}
  </SvgContainer>
);

const LineEl = styled.line``;
export const Line = props => (
  <LineEl vectorEffect="non-scaling-stroke" {...props} />
);

const PolylineEl = styled.polyline``;
export const Polyline = props => (
  <PolylineEl vectorEffect="non-scaling-stroke" {...props} />
);
