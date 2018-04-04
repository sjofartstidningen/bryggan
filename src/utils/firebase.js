/* eslint-disable no-nested-ternary */
// @flow
import { auth, database, initializeApp } from 'firebase';
import { getEnv } from '../utils';
import type {
  User,
  UserProfile,
  AppData,
  SignInCredentials,
  AuthError,
  AuthCheckEventHandler,
} from '../types/firebase';

const config = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseURL: getEnv('FIREBASE_DATABASE_URL'),
};

const bryggan = initializeApp(config);

const Auth = auth();
const Database = database();

const awaitInitialAuthCheckEvent = (cb: AuthCheckEventHandler) => {
  const unsubscribe = Auth.onAuthStateChanged(cb);
  return unsubscribe;
};

const signIn = async ({
  email,
  password,
  remember,
}: SignInCredentials): Promise<User> => {
  try {
    const persistence = remember
      ? 'LOCAL'
      : process.env.NODE_ENV === 'production' ? 'SESSION' : 'NONE';

    await Auth.setPersistence(auth.Auth.Persistence[persistence]);

    const user = await Auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = (): Promise<void> => Auth.signOut();

const getUser = (): User => Auth.currentUser;

const getAppData = async (): Promise<AppData> => {
  const snapshot = await Database.ref('data').once('value');
  const data: AppData = snapshot.val();
  return data;
};

const updateUserData = async (data: UserProfile) => {
  const user = getUser();
  await user.updateProfile(data);
  return getUser();
};

const validateAuthError = (
  err: AuthError,
): { email?: string, password?: string } => {
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
};
