const identityHash = <I, K extends number | string>(input: I) =>
  (input as unknown) as K;

enum AsyncState {
  pending,
  resolved,
  rejected,
}

export function createResource<I, K extends number | string, V>(
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
    preload: () => {},
  };
}

const entries = new Map<
  Resource<any, any>,
  Map<string | number, Result<any>>
>();

function accessResult<I, K extends number | string, V>(
  resource: Resource<I, V>,
  fetch: Fetch<I, V>,
  input: I,
  key: K,
): Result<V> {
  let entriesForResource = entries.get(resource);
  if (!entriesForResource) {
    entriesForResource = new Map();
    entries.set(resource, entriesForResource);
  }

  const entry: Result<V> | undefined = entriesForResource.get(key);

  if (!entry) {
    const thenable = fetch(input);

    const newEntry = {
      status: AsyncState.pending,
      value: thenable,
    };

    thenable.then(
      value => {
        if (newEntry.status === AsyncState.pending) {
          newEntry.status = AsyncState.resolved;
          newEntry.value = (value as unknown) as any;
        }
      },
      error => {
        if (newEntry.status === AsyncState.pending) {
          newEntry.status = AsyncState.rejected;
          newEntry.value = error;
        }
      },
    );

    entriesForResource.set(key, newEntry);

    return newEntry as Result<V>;
  }

  return entry;
}

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
