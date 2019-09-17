import React from 'react';
import { Icon } from './Icons';
import styled, { keyframes } from 'styled-components';
import { animated } from '../styles/animations';

const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

interface LineProps {
  index: number;
  total: number;
  speed: number;
}

const Line = styled.line<LineProps>`
  ${p => animated(fade, { infinite: true, alternate: true })};
  animation-duration: ${p => p.total * (p.speed / 1.5)}s;
  animation-delay: ${p => p.index * p.speed}s;
`;

const lines = [
  { x1: '12', y1: '2', x2: '12', y2: '6' },
  { x1: '16.24', y1: '7.76', x2: '19.07', y2: '4.93' },
  { x1: '18', y1: '12', x2: '22', y2: '12' },
  { x1: '16.24', y1: '16.24', x2: '19.07', y2: '19.07' },
  { x1: '12', y1: '18', x2: '12', y2: '22' },
  { x1: '4.93', y1: '19.07', x2: '7.76', y2: '16.24' },
  { x1: '2', y1: '12', x2: '6', y2: '12' },
  { x1: '4.93', y1: '4.93', x2: '7.76', y2: '7.76' },
];

export const Spinner: React.FC = () => {
  return (
    <Icon baseline>
      {lines.map((line, idx) => (
        <Line
          key={idx}
          index={idx}
          total={lines.length}
          speed={0.075}
          {...line}
        />
      ))}
    </Icon>
  );
};
