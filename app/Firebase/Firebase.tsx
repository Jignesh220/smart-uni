import firebase from "firebase/compat/app";
import { Firestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_TORAGE_BUCKET,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
