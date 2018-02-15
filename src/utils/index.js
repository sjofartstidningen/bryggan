// @flow

interface SortByNameObj {
  name: string;
}

const sortByName = (a: SortByNameObj, b: SortByNameObj): number => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

const getEnv = (key: string): string => {
  const generatedKey = key.includes('REACT_APP') ? key : `REACT_APP_${key}`;
  const value = process.env[generatedKey];

  if (value) return value;
  throw new Error(`Env variable`);
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

export { sortByName, getEnv, adjust, adjustWhere };
