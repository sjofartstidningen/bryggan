// @flow

export default function clamp(min: number, max: number, x: number): number {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}
