import { useEffect, useLayoutEffect } from 'react';

interface AsyncFn {
  (): Promise<void>;
  cancel?: () => void;
}

export const useAsyncEffect = (asyncFn: AsyncFn, deps?: any[]) => {
  useEffect(() => {
    asyncFn();

    return () => {
      if (asyncFn.cancel) asyncFn.cancel();
    };
  }, deps); // eslint-disable-line
};

export const useAsyncLayoutEffect = (asyncFn: AsyncFn, deps?: any[]) => {
  useLayoutEffect(() => {
    asyncFn();

    return () => {
      if (asyncFn.cancel) asyncFn.cancel();
    };
  }, deps); // eslint-disable-line
};
