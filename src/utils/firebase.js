/* eslint-disable no-nested-ternary */
// @flow
import { auth, database, initializeApp } from 'firebase';
import { getEnv } from '../utils';
import type { User, UserProfile, AppData, SignInCredentials } from '../types';

const config = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseURL: getEnv('FIREBASE_DATABASE_URL'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
};

const bryggan = initializeApp(config);

const Auth = auth();
const Database = database();

type AuthCheckEventHandler = (user: ?User) => void;
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
};
