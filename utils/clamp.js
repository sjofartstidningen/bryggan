export default function clamp(min, max, x) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}
