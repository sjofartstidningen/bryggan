// @flow

type Serializer<I, K> = I => K;

class MinimalCache<I, K, V> {
  ttl: ?number = null;
  serializer: Serializer<I, K>;
  cache: Map<K, V> = new Map();

  constructor({
    serializer,
    ttl,
  }: {
    serializer: Serializer<I, K>,
    ttl?: number,
  }) {
    this.serializer = serializer;
    if (ttl) this.ttl = ttl;
  }

  set(input: I, value: V, ttl?: number): () => void {
    const key = this.serializer(input);
    this.cache.set(key, value);

    const TTL = ttl || this.ttl;
    let timeout;
    if (TTL && Number.isFinite(TTL)) {
      timeout = setTimeout(() => this.cache.delete(key), ttl);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
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
