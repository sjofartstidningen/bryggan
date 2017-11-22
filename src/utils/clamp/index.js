const clamp = (min, max, n) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

export { clamp as default };
