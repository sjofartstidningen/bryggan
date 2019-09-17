import React, { useLayoutEffect, useState, useRef } from 'react';
import { RectObserver, createObserver } from '../utils/observe-rect';

export const useRect = (
  ref: React.RefObject<Element>,
  observe = true,
): ClientRect | undefined => {
  const [rect, setRect] = useState<ClientRect>();
  const observerRef = useRef<RectObserver>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    if (!observerRef.current) {
      observerRef.current = createObserver(ref.current, setRect);
    }

    if (observe) observerRef.current.observe();

    const current = observerRef.current;
    return () => current.unobserve();
  }, [observe, ref]);

  return rect;
};
