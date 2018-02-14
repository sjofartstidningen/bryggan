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

export { sortByName, getEnv };
