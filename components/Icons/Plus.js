import React from 'react';
import { Svg, Line } from './Base';

export default props => (
  <Svg {...props}>
    <Line x1={12} y1={5} x2={12} y2={19} />
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);
