// @flow
import React from 'react';
import StickyEvent from '../../StickyEvent';
import Header2 from '../../Typography/Header2';

type Props = { translateTitle: number, children: string };

function YearHeader({ translateTitle, children }: Props) {
  return (
    <StickyEvent
      style={{ zIndex: 2 }}
      render={({ stuck }) => (
        <Header2 style={{ backgroundColor: 'white' }}>
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
        </Header2>
      )}
    />
  );
}

export default YearHeader;
