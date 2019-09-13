const equalFn = <T>(a: T, b: T) => a === b;

export const keepFirst = <T>(
  arr: T[],
  compare: (a: T, b: T) => boolean = equalFn,
): T[] => {
  return arr.reduce<T[]>((acc, item) => {
    if (acc.findIndex(i => compare(item, i)) > -1) return acc;
    return [...acc, item];
  }, []);
};

export const nth = <T>(arr: T[], n: number): T | undefined => arr[n];

export const last = <T>(arr: T[]): T => nth(arr, arr.length - 1) as T;

export const first = <T>(arr: T[]): T => nth(arr, 0) as T;
