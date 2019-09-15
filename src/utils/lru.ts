import rafSchd from 'raf-schd';

export function createLRU<T>(limit: number) {
  let LIMIT = limit;

  // Circular, doubly-linked list
  let first: LRUEntry<T> | null = null;
  let size: number = 0;

  let cleanUpIsScheduled: boolean = false;

  const cleanUp = rafSchd(() => {
    cleanUpIsScheduled = false;
    deleteLeastRecentlyUsedEntries(LIMIT);
  });

  function scheduleCleanUp() {
    if (cleanUpIsScheduled === false && size > LIMIT) {
      // The cache size exceeds the limit. Schedule a callback to delete the
      // least recently used entries.
      cleanUpIsScheduled = true;
      cleanUp();
    }
  }

  function deleteLeastRecentlyUsedEntries(targetSize: number) {
    // Delete entries from the cache, starting from the end of the list.
    if (first != null) {
      const resolvedFirst: LRUEntry<T> = first;
      let last = resolvedFirst.previous;
      while (size > targetSize && last != null) {
        if (last) {
          const onDelete = last.onDelete;
          const previous = last.previous;
          last.onDelete = null;

          // Remove from the list
          last.previous = last.next = null;
          if (last === first) {
            // Reached the head of the list.
            first = last = null;
          } else {
            if (first) first.previous = previous;
            if (previous) previous.next = first;
            last = previous;
          }

          size -= 1;

          // Call the destroy method after removing the entry from the list. If it
          // throws, the rest of cache will not be deleted, but it will be in a
          // valid state.
          onDelete && onDelete();
        }
      }
    }
  }

  function add(value: T, onDelete: () => void): LRUEntry<T> {
    const entry: LRUEntry<T> = {
      value,
      onDelete,
      next: null,
      previous: null,
    };

    if (first == null) {
      entry.previous = entry.next = entry;
      first = entry;
    } else {
      // Append to head
      const last = first.previous;
      if (last) last.next = entry;
      entry.previous = last;

      first.previous = entry;
      entry.next = first;

      first = entry;
    }

    size += 1;
    return entry;
  }

  function update(entry: LRUEntry<T>, newValue: T): void {
    entry.value = newValue;
  }

  function access(entry: LRUEntry<T>): T {
    const next = entry.next;
    if (next !== null) {
      const resolvedFirst: LRUEntry<T> = (first as unknown) as LRUEntry<T>;
      if (first !== entry) {
        // Remove from current position
        const previous = entry.previous;
        if (previous) previous.next = next;
        next.previous = previous;

        // Append to head
        const last = resolvedFirst.previous;
        if (last) last.next = entry;
        entry.previous = last;

        resolvedFirst.previous = entry;
        entry.next = resolvedFirst;

        first = entry;
      }
    }

    scheduleCleanUp();
    return entry.value;
  }

  function setLimit(newLimit: number) {
    LIMIT = newLimit;
    scheduleCleanUp();
  }

  return {
    add,
    update,
    access,
    setLimit,
  };
}

export interface LRUEntry<T> {
  value: T;
  onDelete: (() => void) | null;
  previous: LRUEntry<T> | null;
  next: LRUEntry<T> | null;
}
