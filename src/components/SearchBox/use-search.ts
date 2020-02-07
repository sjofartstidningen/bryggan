import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { ApolloError, gql } from 'apollo-boost';
import { useDebounce } from '@fransvilhelm/hooks';
import { Search, SearchVariables } from '../../types/graphql';
import { keepFirst } from '../../utils/array';

export const SEARCH_QUERY = gql`
  query Search($query: String!, $cursor: String) {
    search(
      query: $query
      options: {
        first: 10
        after: $cursor
        path: "/Bryggan"
        fileCategories: [pdf]
      }
    ) {
      pageInfo {
        hasNextPage
        cursor
      }

      edges {
        node {
          ...FileData
          ...FolderData
        }
      }
    }
  }

  fragment FileData on FileMetadata {
    name
    id
    pathDisplay
    clientModified
    serverModified
    thumbnail(options: { format: jpeg, mode: strict, size: w128h128 }) {
      url
      size
    }
  }

  fragment FolderData on FolderMetadata {
    id
  }
`;

type UseSearchResult = [
  Search | undefined,
  { loading: boolean; error: ApolloError | undefined; searchMore: () => void },
];

export const useSearch = (query: string): UseSearchResult => {
  const delayedQuery = useDebounce(query, 500);
  const [search, { data, loading, error, fetchMore }] = useLazyQuery<
    Search,
    SearchVariables
  >(SEARCH_QUERY);

  const searchMore = () => {
    if (!data?.search.pageInfo.hasNextPage) return;
    return fetchMore({
      variables: { cursor: data?.search.pageInfo.cursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevEdges = prev.search.edges;
        const nextEdges = fetchMoreResult.search.edges;

        return {
          search: {
            ...prev.search,
            ...fetchMoreResult.search,
            edges: keepFirst(
              [...prevEdges, ...nextEdges],
              (a, b) => a.node.id === b.node.id,
            ),
          },
        };
      },
    });
  };

  useEffect(() => {
    if (delayedQuery.length > 3) {
      search({ variables: { query: delayedQuery } });
    }
  }, [search, delayedQuery]);

  return [data, { loading, error, searchMore }];
};
