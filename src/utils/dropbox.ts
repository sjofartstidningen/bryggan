import axios from 'axios';
import localforage from 'localforage';
import { USER_CHECK_QUERY, LOCALSTORAGE_AUTH_KEY } from '../constants';
import { PersistedAuthGet } from '../types/bryggan';

export const validateToken = async (token: string) => {
  console.log(token);
  const { data } = await axios.post(
    'https://api.dropboxapi.com/2/check/user',
    { query: USER_CHECK_QUERY },
    { headers: { Authorization: `Bearer ${token}` } },
  );

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
        axios
          .post('https://api.dropboxapi.com/2/auth/token/revoke', undefined, {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          })
          .catch(() => {}),
      ]);
    }
  } catch (error) {}
};
