import ApolloClient from 'apollo-boost';
import localforage from 'localforage';
import { LOCALSTORAGE_AUTH_KEY } from './constants';

export const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
  request: async operation => {
    const { accessToken } = await localforage.getItem(LOCALSTORAGE_AUTH_KEY);
    operation.setContext({
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });
  },
});
