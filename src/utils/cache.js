// @flow

type OnClearMethod<K, V> = (key: K, value: V) => void;

export type Cache<I, K, V> = {
  set: (key: I, value: V) => void,
  get: (key: I) => ?V,
  has: (key: I) => boolean,
  clear: (onClear?: OnClearMethod<K, V>) => void,
};

function create<I, K, V>(serializer: I => K): Cache<I, K, V> {
  const cache: Map<K, V> = new Map();

  return {
    set(key, value) {
      const k = serializer(key);
      cache.set(k, value);
    },
    get(key) {
      const k = serializer(key);
      return cache.get(k);
    },
    has(key) {
      const k = serializer(key);
      return cache.has(k);
    },
    clear(onClear) {
      cache.forEach((value, key) => {
        if (onClear) onClear(key, value);
        cache.delete(key);
      });
    },
  };
}

export { create };
