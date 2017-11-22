const capFirst = str => {
  const arr = str.split('').slice(1);
  return [str[0].toUpperCase(), ...arr].join('');
};

export { capFirst as default };
