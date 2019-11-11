import { Connection } from '../ts/types';
import { camelCaseKeys } from '../../utils/object';

export const createConnection = <T>(
  edges: T[],
  { hasMore, cursor }: { hasMore: boolean; cursor?: string },
): Connection<T> => {
  return {
    pageInfo: {
      hasNextPage: hasMore,
      cursor: hasMore ? cursor || null : null,
    },
    edges: edges.map(item => ({ node: camelCaseKeys(item) })),
  };
};
