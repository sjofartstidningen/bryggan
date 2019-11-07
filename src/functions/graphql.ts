import { ApolloServer, gql } from 'apollo-server-lambda';
import * as scalars from './resolvers/scalars';
import { Base } from './types/base';
import { Files } from './types/files';
import { Users } from './types/users';

const rootType = gql`
  type Query {
    _dummy: String
  }
`;

const typeDefs = [rootType, Base, Users, Files];

const resolvers = {
  ...scalars,
  Query: {
    _dummy: () => 'Dummy',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const handler = server.createHandler();
