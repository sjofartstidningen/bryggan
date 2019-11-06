import { ApolloServer, gql } from 'apollo-server-lambda';
import { Users } from './queries/users';
import { Files } from './queries/files';

const rootType = gql`
  type Query {
    _dummy: String
  }
`;

const resolvers = {
  Query: {
    _dummy: () => 'Dummy',
  },
};

const typeDefs = [rootType, Users, Files];

const server = new ApolloServer({ typeDefs, resolvers });

export const handler = server.createHandler();
