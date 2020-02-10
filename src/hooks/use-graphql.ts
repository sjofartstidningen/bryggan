import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Folders, FoldersVariables } from '../types/graphql';

const FOLDERS = gql`
  query Folders($path: PathLike!) {
    folders(path: $path) {
      pageInfo {
        hasNextPage
        cursor
      }
      edges {
        node {
          id
          name
          pathDisplay
          thumbnail {
            url
          }
        }
      }
    }
  }
`;

export const useFolders = (path: GraphQL_PathLike) => {
  const result = useQuery<Folders, FoldersVariables>(FOLDERS, {
    variables: { path },
  });
  return result;
};
