import { useRef, useEffect } from 'react';

export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay != null) {
      const tick = () => savedCallback.current();
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
