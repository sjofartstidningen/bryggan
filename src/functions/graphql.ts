import { ApolloServer, gql } from 'apollo-server-lambda';
import { GraphQLScalarType } from 'graphql';
import { Users } from './queries/users';
import { Files } from './queries/files';

const validatePathLike = (value: string) => {
  console.log(value);
  return /^(\/(.|[\r\n])*|id:.*)|(rev:[0-9a-f]{9,})|(ns:[0-9]+(\/.*)?)$/.test(
    value,
  )
    ? value
    : null;
};

const PathLikeScalar = new GraphQLScalarType({
  name: 'PathLike',
  description: 'A scalar indicating a path like input string',
  serialize: validatePathLike,
  parseValue: validatePathLike,
  parseLiteral: value => value,
});

const rootType = gql`
  scalar PathLike

  type Query {
    _dummy: String
  }
`;

const resolvers = {
  PathLike: PathLikeScalar,
  Query: {
    _dummy: () => 'Dummy',
  },
};

const typeDefs = [rootType, Users, Files];

const server = new ApolloServer({ typeDefs, resolvers });

export const handler = server.createHandler();
