import { MinimalCache } from '../cache';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

test('should cache anything passed in', () => {
  const cache = new MinimalCache({ serializer: x => x });
  cache.set('foo', 'bar');

  expect(cache.get('foo')).toBe('bar');
});

test('should accept a custom serializer to serialize keys before cache', () => {
  const cache = new MinimalCache({ serializer: x => x.toUpperCase() });
  cache.set('foo', 'bar');
  expect(cache.cache.get('FOO')).toBe('bar');
});

test('should be able to define TTL on construction', async () => {
  const cache = new MinimalCache({ serializer: x => x, ttl: 1 });
  cache.set('foo', 'bar');
  expect(cache.get('foo')).toBe('bar');

  await delay(2);
  expect(cache.get('foo')).toBe(undefined);
});

test('should accept ttl on cache.set', async () => {
  const cache = new MinimalCache({ serializer: x => x });
  cache.set('foo', 'bar', 1);
  expect(cache.get('foo')).toBe('bar');

  await delay(2);
  expect(cache.get('foo')).toBe(undefined);
});

test('cache.set shoul return a function to prevent deletion', async () => {
  const cache = new MinimalCache({ serializer: x => x, ttl: 1 });
  const preventDeletion = cache.set('foo', 'bar');
  expect(cache.get('foo')).toBe('bar');
  preventDeletion();

  await delay(2);
  expect(cache.get('foo')).toBe('bar');
});
