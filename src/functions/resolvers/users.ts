import { IFieldResolver, IResolvers } from 'graphql-tools';
import { api } from '../../api/dropbox';
import { camelCaseKeys } from '../../utils/object';
import { GraphQLContext } from '../ts/types';

export const getCurrentAccount: IFieldResolver<{}, GraphQLContext> = (
  _,
  __,
  { user },
) => user;

export const getAccount: IFieldResolver<
  {},
  GraphQLContext,
  { id: string }
> = async (_, { id }) => {
  const { data: user } = await api.post('/users/get_account', {
    account_id: id,
  });

  return camelCaseKeys(user);
};

const users: IResolvers<any, GraphQLContext> = {
  Query: {
    getCurrentAccount,
    getAccount,
  },
};

export default users;
