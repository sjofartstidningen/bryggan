import { IFieldResolver, IResolvers } from 'apollo-server-lambda';
import { GraphQLContext } from '../ts/types';

export const getCurrentAccount: IFieldResolver<{}, GraphQLContext> = (
  parent,
  args,
  { dataSources },
) => dataSources.dropbox.getCurrentAccount();

export const getAccount: IFieldResolver<
  {},
  GraphQLContext,
  { id: string }
> = async (_, { id }, { dataSources }) => {
  return dataSources.dropbox.getUser({ id });
};

const users: IResolvers<any, GraphQLContext> = {
  Query: {
    getCurrentAccount,
    getAccount,
  },
};

export default users;
