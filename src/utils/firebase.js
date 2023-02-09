/* eslint-disable no-nested-ternary */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const bryggan = firebase.initializeApp(config);
const Auth = firebase.auth();
const Database = firebase.database();

const awaitInitialAuthCheckEvent = cb => {
  const unsubscribe = Auth.onAuthStateChanged(cb);
  return unsubscribe;
};

const signIn = async ({ email, password, remember }) => {
  try {
    const persistence = remember
      ? 'LOCAL'
      : process.env.NODE_ENV === 'production'
      ? 'SESSION'
      : 'NONE';

    await Auth.setPersistence(firebase.auth.Auth.Persistence[persistence]);

    const user = await Auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = () => Auth.signOut();

const getUser = () => Auth.currentUser;

const getAppData = async () => {
  const snapshot = await Database.ref('data').once('value');
  const data = snapshot.val();
  return data;
};

const updateUserData = async data => {
  const user = getUser();
  if (user) {
    await user.updateProfile(data);
    return getUser();
  }

  return null;
};

const validateAuthError = err => {
  const { code } = err;
  const ret = {};

  switch (code) {
    case 'auth/invalid-email':
      ret.email = 'Emailadressen är felaktig';
      break;
    case 'auth/user-disabled':
      ret.email = 'Det här kontot har stängts ner';
      break;
    case 'auth/user-not-found':
      ret.email = 'Emailadressen finns inte registrerad';
      break;
    case 'auth/wrong-password':
      ret.password = 'Felaktigt lösenord';
      break;
    default:
  }

  return ret;
};

const sendValidationEmail = async () => {
  try {
    const user = getUser();
    if (user) await user.sendEmailVerification();
  } catch (err) {
    // void
  }
};

export {
  bryggan as default,
  Auth,
  Database,
  awaitInitialAuthCheckEvent,
  signIn,
  signOut,
  getUser,
  getAppData,
  updateUserData,
  validateAuthError,
  sendValidationEmail,
};
