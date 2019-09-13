import React, { useRef, useEffect } from 'react';

interface IntersectProps extends React.HTMLAttributes<any> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  parentRef?: React.RefObject<Element>;
  fallback?: () => void;
  onEnter?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
  onLeave?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
}

export const Intersect: React.FC<IntersectProps> = ({
  as: As = 'div',
  fallback = () => {},
  onEnter = () => {},
  onLeave = () => {},
  parentRef,
  children,
  ...attrs
}) => {
  const ref = useRef<Element>(null);
  const fallbackRef = useRef(fallback);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);

  useEffect(() => {
    onEnterRef.current = onEnter;
    onLeaveRef.current = onLeave;
  }, [onEnter, onLeave]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return fallbackRef.current();

    const el = ref.current;
    const root = parentRef && parentRef.current;

    if (!el || !(el instanceof Element)) return;

    const callback: IntersectionObserverCallback = (entries, observer) => {
      const entry = entries.find(e => e.target === el);
      if (entry) {
        if (entry.isIntersecting) onEnterRef.current(entry, observer);
        if (!entry.isIntersecting) onLeaveRef.current(entry, observer);
      }
    };

    const observer = new IntersectionObserver(callback, { root });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, [parentRef]);

  return (
    <As ref={ref} {...attrs}>
      {children}
    </As>
  );
};
