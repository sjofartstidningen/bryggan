import { useState } from 'react';
import { useEventListener } from '@fransvilhelm/hooks';

interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): WindowDimensions => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useWindowDimensions = (): WindowDimensions => {
  const [dimensions, setDimensions] = useState(getWindowDimensions());

  useEventListener('resize', () => {
    setDimensions(getWindowDimensions());
  });

  return dimensions;
};
