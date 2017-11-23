import * as constants from './constants';
import * as firebase from '../../utils/firebase';

const authUnauthenticated = () => ({ type: constants.AUTH_UNAUTHENTICATED });

const authInProgress = () => ({ type: constants.AUTH_IN_PROGRESS });

const authSuccess = ({ user }) => ({
  type: constants.AUTH_SUCCESS,
  payload: { user },
});

const authError = ({ error }) => ({
  type: constants.AUTH_ERROR,
  payload: { error },
});

const authSignIn = ({ email, password, remember }) => async dispatch => {
  dispatch(authInProgress());

  try {
    const fbUser = await firebase.signIn({ email, password, remember });
    if (fbUser == null) throw new Error('Login failed. No user found.');

    const user = firebase.extractUserInfo(fbUser);
    dispatch(authSuccess({ user }));
  } catch (error) {
    dispatch(authError({ error }));
  }
};

export {
  authUnauthenticated,
  authInProgress,
  authSuccess,
  authError,
  authSignIn,
};
