import React from 'react';
import { Svg, Line } from './Base';

export default props => (
  <Svg {...props}>
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);
