import { gql } from 'apollo-server-lambda';

export const Base = gql`
  scalar PathLike

  interface Connection {
    edges: [Edge]!
    pageInfo: PageInfo!
  }

  interface Edge {
    node: Node!
  }

  interface Node {
    id: ID!
  }

  interface PageInfo {
    hasNextPage: Boolean!
    cursor: String
  }
`;
