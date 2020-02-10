import localforage from 'localforage';
import { USER_CHECK_QUERY, LOCALSTORAGE_AUTH_KEY } from '../constants';
import { PersistedAuthGet } from '../types/bryggan';

export const validateToken = async (token: string) => {
  const response = await fetch('https://api.dropboxapi.com/2/check/user', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query: USER_CHECK_QUERY }),
  });
  const data = await response.json();

  if (data.result !== USER_CHECK_QUERY) {
    throw new Error('Token response does not match the expected response');
  }

  return true;
};

export const revokeToken = async () => {
  try {
    const data = await localforage.getItem<PersistedAuthGet>(
      LOCALSTORAGE_AUTH_KEY,
    );

    if (data) {
      await Promise.all([
        localforage.removeItem(LOCALSTORAGE_AUTH_KEY),
        fetch('https://api.dropboxapi.com/2/auth/token/revoke', {
          method: 'POST',
          headers: { Authorization: `Bearer ${data.accessToken}` },
        }).catch(() => null),
      ]);
    }
  } catch (error) {}
};
