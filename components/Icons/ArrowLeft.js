import React from 'react';
import { Svg, Line, Polyline } from './Base';

export default () => (
  <Svg>
    <Line x1="20" y1="12" x2="4" y2="12" />
    <Polyline points="10 18 4 12 10 6" />
  </Svg>
);
