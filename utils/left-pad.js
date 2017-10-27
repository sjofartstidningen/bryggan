export default (str, len, ch = ' ') => {
  const string = `${str}`;
  let length = len - string.length;
  let char = `${ch}`;

  if (length <= 0) return string;
  let pad = '';

  // eslint-disable-next-line
  while (true) {
    if (length & 1) pad += char; // eslint-disable-line
    length >>= 1; // eslint-disable-line

    if (length) char += char;
    else break;
  }

  return pad + str;
};
