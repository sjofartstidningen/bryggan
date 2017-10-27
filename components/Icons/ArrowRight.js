import React from 'react';
import { Svg, Line, Polyline } from './Base';

export default () => (
  <Svg>
    <Line x1="4" y1="12" x2="20" y2="12" />
    <Polyline points="14 6 20 12 14 18" />
  </Svg>
);
