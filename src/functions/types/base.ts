import { gql } from 'apollo-server-lambda';

export const Base = gql`
  scalar PathLike

  type PageInfo {
    hasNextPage: Boolean!
    cursor: String
  }
`;
