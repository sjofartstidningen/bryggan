class MinimalCache {
  ttl = null;

  serializer;

  cache = new Map();

  constructor({ serializer, ttl }) {
    this.serializer = serializer;
    if (ttl) this.ttl = ttl;
  }

  set(input, value, ttl) {
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

  get(input) {
    const key = this.serializer(input);
    return this.cache.get(key);
  }

  delete(input) {
    const key = this.serializer(input);
    return this.cache.delete(key);
  }

  has(input) {
    const key = this.serializer(input);
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }

  entries() {
    return this.cache.entries();
  }

  forEach(cb) {
    this.cache.forEach(cb);
  }
}

export { MinimalCache };
