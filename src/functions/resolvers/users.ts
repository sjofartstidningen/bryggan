import { IFieldResolver, IResolvers } from 'apollo-server-lambda';
import { GraphQLContext } from '../ts/types';

export const currentAccount: IFieldResolver<{}, GraphQLContext> = (
  parent,
  args,
  { dataSources },
) => dataSources.dropbox.getCurrentAccount();

export const account: IFieldResolver<
  {},
  GraphQLContext,
  { id: string }
> = async (_, { id }, { dataSources }) => {
  return dataSources.dropbox.getUser({ id });
};

const users: IResolvers<any, GraphQLContext> = {
  Query: {
    currentAccount,
    account,
  },
};

export default users;
