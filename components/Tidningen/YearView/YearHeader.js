// @flow
import React from 'react';
import StickyEvent from '../../StickyEvent';
import { H2 } from '../../Typography/headings';

type Props = { translateTitle: number, children: string };

function YearHeader({ translateTitle, children }: Props) {
  return (
    <StickyEvent
      style={{ zIndex: 2 }}
      render={({ stuck }) => (
        <H2 style={{ backgroundColor: 'white' }}>
          <span
            style={{
              display: 'inline-block',
              transform: `translateX(${stuck ? translateTitle : 0}px)`,
              transition: 'transform 0.3s ease-in-out',
              willChange: 'transform',
            }}
          >
            {children}
          </span>
        </H2>
      )}
    />
  );
}

export default YearHeader;
