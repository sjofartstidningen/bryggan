import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { ApolloError, gql } from 'apollo-boost';
import { useDebounce } from '@fransvilhelm/hooks';
import { Search, SearchVariables } from '../../types/graphql';

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
          ... on FileMetadata {
            name
            id
            pathDisplay
            clientModified
            serverModified
          }
        }
      }
    }
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
            edges: [...prevEdges, ...nextEdges],
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
