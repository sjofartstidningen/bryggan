import React from 'react';
import { Svg, Path, Circle } from './Base';

export default props => (
  <Svg {...props}>
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);
