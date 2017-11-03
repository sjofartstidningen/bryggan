import * as constants from './constants';

export const signIn = () => ({ type: constants.SIGN_IN });
export const signOut = () => ({ type: constants.SIGN_OUT });

export const addToken = ({ token, value }) => ({
  type: constants.ADD_TOKEN,
  payload: { token, value },
});

export const updateUser = user => ({
  type: constants.UPDATE_USER,
  payload: { user },
});
