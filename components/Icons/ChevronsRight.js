import React from 'react';
import { Svg, Polyline } from './Base';

export default props => (
  <Svg {...props}>
    <Polyline points="13 17 18 12 13 7" />
    <Polyline points="6 17 11 12 6 7" />
  </Svg>
);
