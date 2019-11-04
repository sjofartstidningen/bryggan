import LRU from 'lru-cache';

interface Loader<R> {
  (): Promise<R>;
}

enum LoaderState {
  idle,
  pending,
  resolved,
  rejected,
}

type ResourceState<R> =
  | { loaderState: LoaderState.idle }
  | { loaderState: LoaderState.pending }
  | { loaderState: LoaderState.rejected; error: Error }
  | { loaderState: LoaderState.resolved; result: R };

export class Resource<R> {
  private state: ResourceState<R> = { loaderState: LoaderState.idle };
  private promise?: Promise<R>;
  private loader: Loader<R>;

  constructor(loader: Loader<R>) {
    this.loader = loader;
  }

  async load(): Promise<void> {
    try {
      if (!this.promise) {
        this.promise = this.loader();

        this.state = { loaderState: LoaderState.pending };
        const result = await this.promise;
        this.state = { loaderState: LoaderState.resolved, result };
      }
    } catch (error) {
      this.state = { loaderState: LoaderState.rejected, error };
    }
  }

  get() {
    if (this.state.loaderState === LoaderState.resolved) {
      return this.state.result;
    }
  }

  read() {
    switch (this.state.loaderState) {
      case LoaderState.idle:
        const promise = this.load();
        throw promise;

      case LoaderState.pending:
        throw this.promise;

      case LoaderState.rejected:
        throw this.state.error;

      case LoaderState.resolved:
        return this.state.result;
    }
  }

  retry() {
    this.promise = undefined;
    this.state = { loaderState: LoaderState.idle };
    this.load();
  }
}

const cache = new LRU<string, Resource<any>>({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

export const createResource = <R>(id: string, loader: Loader<R>) => {
  let resource: Resource<R> | undefined = cache.get(id);
  if (!resource) {
    resource = new Resource(loader);
    cache.set(id, resource);
  }

  return resource;
};
