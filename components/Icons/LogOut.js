import React from 'react';
import { Svg, Path, Polyline, Line } from './Base';

export default props => (
  <Svg {...props}>
    <Path d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5" />
    <Polyline points="17 16 21 12 17 8" />
    <Line x1="21" y1="12" x2="9" y2="12" />
  </Svg>
);
