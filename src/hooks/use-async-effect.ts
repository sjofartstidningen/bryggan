import { useEffect, useLayoutEffect } from 'react';

interface AsyncFn {
  (hasCancelled: () => boolean): Promise<void>;
  cancel?: () => void;
}

export const useAsyncEffect = (asyncFn: AsyncFn, deps?: any[]) => {
  useEffect(() => {
    const has = { cancelled: false };
    const hasCancelled = () => has.cancelled;
    asyncFn(hasCancelled);

    return () => {
      has.cancelled = true;
      if (asyncFn.cancel) asyncFn.cancel();
    };
  }, deps); // eslint-disable-line
};

export const useAsyncLayoutEffect = (asyncFn: AsyncFn, deps?: any[]) => {
  useLayoutEffect(() => {
    const has = { cancelled: false };
    const hasCancelled = () => has.cancelled;
    asyncFn(hasCancelled);

    return () => {
      has.cancelled = true;
      if (asyncFn.cancel) asyncFn.cancel();
    };
  }, deps); // eslint-disable-line
};
