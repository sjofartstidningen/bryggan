/* eslint-disable no-nested-ternary */
// @flow
import firebase from 'firebase';
import { getEnv } from '../utils';

const config = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  databaseURL: getEnv('FIREBASE_DATABASE_URL'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
};

const bryggan = firebase.initializeApp(config, config.projectId);

const auth = bryggan.auth();
const database = bryggan.database();

type AuthCheckEventHandler = (user: ?User) => void;
const awaitInitialAuthCheckEvent = (cb: AuthCheckEventHandler) => {
  const unsubscribe = auth.onAuthStateChanged(cb);
  return unsubscribe;
};

type SignInProps = { email: string, password: string, remember?: boolean };
const signIn = async ({
  email,
  password,
  remember,
}: SignInProps): Promise<User> => {
  try {
    const persistence = remember
      ? 'LOCAL'
      : process.env.NODE_ENV === 'production' ? 'SESSION' : 'NONE';

    // $FlowFixMe
    await auth.setPersistence(bryggan.auth.Auth.Persistence[persistence]);

    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = (): Promise<void> => auth.signOut();

const getUser = (): User => auth.currentUser;

const getAppData = async () => {
  const snapshot = await database.ref('data').once('value');
  const data = snapshot.val();
  return data;
};

const updateUserData = async (data: UserProfile) => {
  const user = getUser();
  await user.updateProfile(data);
  return getUser();
};

export {
  bryggan as default,
  auth,
  database,
  awaitInitialAuthCheckEvent,
  signIn,
  signOut,
  getUser,
  getAppData,
  updateUserData,
};
