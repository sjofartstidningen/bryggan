import { createLRU, LRUEntry } from 'utils/lru';

enum AsyncState {
  pending,
  resolved,
  rejected,
}

const lru = createLRU<Result<any>>(500);

export function createResource<I, K extends Key, V = any>(
  fetch: Fetch<I, V>,
  hashInput: Hash<I, K> = identityHash,
): Resource<I, V> {
  const resource = {
    read: (input: I): V => {
      const key = hashInput(input);
      const result = accessResult(resource, fetch, input, key);

      switch (result.status) {
        case AsyncState.pending:
          const suspender = result.value;
          throw suspender;
        case AsyncState.rejected:
          const error = result.value;
          throw error;
        case AsyncState.resolved:
          const value = result.value;
          return value;
      }
    },
    preload: (input: I): void => {
      const key = hashInput(input);
      accessResult(resource, fetch, input, key);
    },
  };

  return resource;
}

const entries = new Map<Resource<any, any>, Map<Key, LRUEntry<Result<any>>>>();

function accessResult<I, K extends Key, V>(
  resource: Resource<I, V>,
  fetch: Fetch<I, V>,
  input: I,
  key: K,
): Result<V> {
  let entriesForResource = entries.get(resource);

  if (!entriesForResource) {
    entriesForResource = new Map<Key, LRUEntry<Result<V>>>();
    entries.set(resource, entriesForResource);
  }

  const entry = entriesForResource.get(key);

  if (!entry) {
    const thenable = fetch(input);

    let newResult = {
      status: AsyncState.pending,
      value: thenable,
    };

    thenable.then(
      value => {
        if (newResult.status === AsyncState.pending) {
          newResult.status = AsyncState.resolved;
          newResult.value = (value as unknown) as any;
        }
      },
      error => {
        if (newResult.status === AsyncState.pending) {
          newResult.status = AsyncState.rejected;
          newResult.value = error;
        }
      },
    );

    const newEntry: LRUEntry<Result<V>> = lru.add(newResult, () =>
      deleteEntry(resource, key),
    );
    entriesForResource.set(key, newEntry);

    return newResult as Result<V>;
  }

  return lru.access(entry) as Result<V>;
}

function deleteEntry(resource: Resource<any, any>, key: string | number) {
  const entriesForResource = entries.get(resource);
  if (entriesForResource !== undefined) {
    entriesForResource.delete(key);
    if (entriesForResource.size === 0) {
      entries.delete(resource);
    }
  }
}

function identityHash<I, K extends Key>(input: I) {
  const isValid =
    typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'boolean' ||
    input === undefined ||
    input === null;
  if (!isValid) {
    throw new Error(
      'Trying to access a resource with a non primitive input is not accepted without passing a hashInput function.',
    );
  }
  return (input as unknown) as K;
}

type Key = string | number;

interface Resource<I, V> {
  read(input: I): V;
  preload(input: I): void;
}

interface Fetch<I, V> {
  (input: I): Promise<V>;
}

interface Hash<I, K extends string | number> {
  (input: I): K;
}

type Result<V> =
  | { status: AsyncState.pending; value: Promise<V> }
  | { status: AsyncState.resolved; value: V }
  | { status: AsyncState.rejected; value: any };
