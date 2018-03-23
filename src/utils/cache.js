// @flow

type Serializer<I, K> = I => K;

class MinimalCache<I, K, V> {
  serializer: Serializer<I, K>;
  cache: Map<K, V> = new Map();

  constructor({ serializer }: { serializer: Serializer<I, K> }) {
    this.serializer = serializer;
  }

  set(input: I, value: V, ttl?: number) {
    const key = this.serializer(input);
    this.cache.set(key, value);

    if (ttl) setTimeout(() => this.cache.delete(key), ttl);
  }

  get(input: I): ?V {
    const key = this.serializer(input);
    return this.cache.get(key);
  }

  delete(input: I): boolean {
    const key = this.serializer(input);
    return this.cache.delete(key);
  }

  has(input: I): boolean {
    const key = this.serializer(input);
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  entries(): Iterator<[K, V]> {
    return this.cache.entries();
  }

  forEach(cb: (V, K) => void) {
    this.cache.forEach(cb);
  }
}

export { MinimalCache };
