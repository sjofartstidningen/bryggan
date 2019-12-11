import {
  ApolloServer,
  gql,
  IResolvers,
  AuthenticationError,
} from 'apollo-server-lambda';
import { mergeDeep } from 'apollo-utilities';

import { DropboxAPI } from './data-sources/Dropbox';

import general from './resolvers/general';
import users from './resolvers/users';
import files from './resolvers/files';

import { Base } from './types/base';
import { Files } from './types/files';
import { Users } from './types/users';

import { GraphQLContext } from './ts/types';

const rootType = gql`
  type Query {
    _dummy: String
  }
`;

const typeDefs = [rootType, Base, Users, Files];

const rootResolver = {
  Query: {
    _dummy: () => null,
  },
};

const resolvers: IResolvers<any, GraphQLContext> = mergeDeep(
  rootResolver,
  general,
  files,
  users,
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    dropbox: new DropboxAPI(),
  }),
  context: async ({
    event,
  }: {
    event: AWSLambda.APIGatewayProxyEvent;
  }): Promise<Pick<GraphQLContext, 'token'>> => {
    /**
     * If the current request is an IntrospectionQuery we don't need to
     * verify the token. We could just skip that part and move along.
     */
    if (event.body && event.body.includes('IntrospectionQuery')) {
      return {} as GraphQLContext;
    }

    const token = event.headers.authorization;
    if (!token || !token.includes('Bearer')) {
      throw new AuthenticationError(
        'A Dropbox access token must be provided in the form of "Bearer <token>"',
      );
    }

    return { token };
  },
});

export const handler = server.createHandler();
