import md5 from 'md5';

const compareBy = prop => (a, b) => {
  if (a[prop] > b[prop]) return 1;
  if (a[prop] < b[prop]) return -1;
  return 0;
};

const compareByDesc = prop => (a, b) => -compareBy(prop)(a, b);

const sortByName = compareBy('name');

const getEnv = (key, defaultRet = null) => {
  const generatedKey = key.includes('REACT_APP') ? key : `REACT_APP_${key}`;
  const value = process.env[generatedKey] || defaultRet;

  if (value != null) return value;
  throw new Error(`Env variable ${generatedKey} is not defined on process.env`);
};

const adjust = (i, fn, list) => {
  const arrLength = list.length;
  if (i >= arrLength || i < -arrLength) return list;

  const arr = list.slice(0);

  const idx = i < 0 ? arrLength + i : i;
  const newArr = [...arr];
  newArr[idx] = fn(newArr[idx]);

  return newArr;
};

const adjustWhere = (updateFn, predicateFn, list) => {
  const index = list.findIndex(predicateFn);
  if (index < 0) return list;

  return adjust(index, updateFn, list);
};

const clamp = (min, max, n) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

const unique = list => list.filter((x, idx, self) => self.indexOf(x) === idx);

const gravatarUrl = (email, fallback = '404') =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=${fallback}`;

export {
  compareBy,
  compareByDesc,
  sortByName,
  getEnv,
  adjust,
  adjustWhere,
  clamp,
  unique,
  gravatarUrl,
};
