// @flow

const compareBy = (prop: string) => (a: Object, b: Object): number => {
  if (a[prop] > b[prop]) return 1;
  if (a[prop] < b[prop]) return -1;
  return 0;
};

const sortByName = compareBy('name');

const getEnv = (key: string): string => {
  const generatedKey = key.includes('REACT_APP') ? key : `REACT_APP_${key}`;
  const value = process.env[generatedKey];

  if (value) return value;
  throw new Error(
    `Env variable ${generatedKey} is note defined on process.env`,
  );
};

const adjust = <T>(i: number, fn: (x: T) => T, list: Array<T>): Array<T> => {
  const arrLength = list.length;
  if (i >= arrLength || i < -arrLength) return list;

  const arr = list.slice(0);

  const idx = i < 0 ? arrLength + i : i;
  const newArr = [...arr];
  newArr[idx] = fn(newArr[idx]);

  return newArr;
};

const adjustWhere = <T>(
  updateFn: (x: T) => T,
  predicateFn: (x: T) => boolean,
  list: Array<T>,
): Array<T> => {
  const index = list.findIndex(predicateFn);
  if (index < 0) return list;

  return adjust(index, updateFn, list);
};

export { compareBy, sortByName, getEnv, adjust, adjustWhere };
