export default str => {
  const arr = str.split('');
  return [arr[0].toUpperCase(), ...arr.slice(1)].join('');
};
