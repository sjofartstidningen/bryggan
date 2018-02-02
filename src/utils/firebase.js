/* eslint-disable no-nested-ternary */
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

const signIn = async ({ email, password, remember }) => {
  try {
    const persistance = remember
      ? 'LOCAL'
      : process.env.NODE_ENV === 'production' ? 'SESSION' : 'NONE';

    await auth.setPersistence(firebase.auth.Auth.Persistence[persistance]);

    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = () => auth.signOut();

const getUser = () => auth.currentUser;

const getAppData = async () => {
  const snapshot = await database.ref('data').once('value');
  const data = snapshot.val();
  return data;
};

const updateUserData = async data => {
  const user = getUser();
  await user.updateProfile(data);
  return getUser();
};

export {
  firebase as default,
  auth,
  database,
  signIn,
  signOut,
  getUser,
  getAppData,
  updateUserData,
};