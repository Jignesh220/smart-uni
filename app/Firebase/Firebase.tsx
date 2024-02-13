import firebase from "firebase/compat/app";
import { Firestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// firebase.initializeApp(config);
firebase.initializeApp(config);
// var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
// const analytics = getAnalytics(app);
const analytics = isSupported().then((yes) =>
  yes ? getAnalytics(firebaseApp) : null
);
const storage = getStorage();
export { auth, provider, db, firebaseApp, analytics, storage };
