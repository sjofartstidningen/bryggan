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

const getUser = () => auth.currentUser;

const signIn = async (email, password) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    }

    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const signOut = () => auth.signOut();

export { firebase as default, auth, getUser, signIn, signOut };
