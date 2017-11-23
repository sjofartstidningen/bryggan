import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const Auth = firebase.auth();

const signIn = async ({ email, password, remember }) => {
  try {
    const persistance = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;
    await Auth.setPersistence(persistance);
    await Auth.signInWithEmailAndPassword(email, password);
    const user = Auth.currentUser;

    if (user == null) throw new Error('Authentication failed');
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (err) {
    throw err;
  }
};

const defaultKeys = [
  'displayName',
  'email',
  'emailVerified',
  'phoneNumber',
  'photoUrl',
  'uid',
];
const extractUserInfo = (user, keys = defaultKeys) =>
  keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: user[key],
    }),
    {},
  );

export { signIn, signOut, extractUserInfo };
