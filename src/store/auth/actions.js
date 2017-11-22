import localForage from 'localforage';
import * as constants from './constants';
import config from '../../config';

const isAuthenticated = () => ({ type: constants.AUTHENTICATED });
const isNotAuthenticated = () => ({ type: constants.UNAUTHENTICATED });

const signIn = () => ({ type: constants.SIGN_IN });
const signOut = () => ({ type: constants.SIGN_OUT });

const addToken = ({ token, value }) => ({
  type: constants.ADD_TOKEN,
  payload: { token, value },
});

const updateUser = ({ user }) => ({
  type: constants.UPDATE_USER,
  payload: { user },
});

const checkAuthentication = () => async dispatch => {
  const user = await localForage.getItem('user');

  if (user == null) {
    dispatch(isNotAuthenticated());
  } else {
    dispatch(isAuthenticated());
    dispatch(updateUser({ user }));
  }
};

const doAuthentication = () => async dispatch => {
  const { Lock } = await import('../../utils/lock');

  const lock = new Lock({
    clientId: config.auth0id,
    clientDomain: config.auth0domain,
  });

  const timeout = setTimeout(() => {
    dispatch(isNotAuthenticated());
  }, 5000);

  lock.on('authenticated', async result => {
    clearTimeout(timeout);
    dispatch(isAuthenticated());

    const user = await lock.getUser(result.idToken);

    localForage.setItem('id_token', result.idToken);
    localForage.setItem('user', user);

    dispatch(updateUser({ user }));
  });
};

const login = () => async () => {
  const { Lock } = await import('../../utils/lock');
  const lock = new Lock({
    clientId: config.auth0id,
    clientDomain: config.auth0domain,
  });
  lock.showLock();
};

const logout = () => async dispatch => {
  await localForage.removeItem('id_token');
  await localForage.removeItem('user');
  dispatch(signOut());
};

export {
  isAuthenticated,
  isNotAuthenticated,
  signIn,
  signOut,
  addToken,
  updateUser,
  checkAuthentication,
  doAuthentication,
  login,
  logout,
};
