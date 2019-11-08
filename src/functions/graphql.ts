import {
  ApolloServer,
  gql,
  IResolvers,
  AuthenticationError,
} from 'apollo-server-lambda';
import got from 'got';
import { mergeDeep } from 'apollo-utilities';

import { api } from '../api/dropbox';
import { User, GraphQLContext } from './ts/types';

import general from './resolvers/general';
import users from './resolvers/users';
import files from './resolvers/files';

import { Base } from './types/base';
import { Files } from './types/files';
import { Users } from './types/users';

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
  resolvers: resolvers,
  context: async ({
    event,
  }: {
    event: AWSLambda.APIGatewayProxyEvent;
  }): Promise<GraphQLContext> => {
    /**
     * If the current request is an IntrospectionQuery we don't need to
     * verify the token. We could just skip that part and move along.
     */
    if (event.body && event.body.includes('IntrospectionQuery')) {
      return {} as GraphQLContext;
    }

    try {
      const token = event.headers.authorization || '';

      /**
       * There seem to be an issue with axios and sending undefined bodies on post
       * requests in node. It works fine in the browser, but something breaks in
       * node. Therefore we use `got` here to be able to request the authorized
       * user.
       */
      const { body: user }: got.Response<User> = await got(
        '/users/get_current_account',
        {
          method: 'POST',
          baseUrl: 'https://api.dropboxapi.com/2',
          json: true,
          headers: { Authorization: token },
        },
      );

      api.defaults.headers.Authorization = token;

      return { user, token };
    } catch (error) {
      throw new AuthenticationError('User not authenticated');
    }
  },
});

export const handler = server.createHandler();
