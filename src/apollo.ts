import ApolloClient from 'apollo-boost';
import localforage from 'localforage';
import { LOCALSTORAGE_AUTH_KEY } from './constants';
import { PersistedAuthGet } from './types/bryggan';

export const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
  request: async operation => {
    const data = await localforage.getItem<PersistedAuthGet>(
      LOCALSTORAGE_AUTH_KEY,
    );

    if (data) {
      operation.setContext({
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
    }
  },
});
