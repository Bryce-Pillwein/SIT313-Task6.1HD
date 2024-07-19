// Firebase Config ts
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from "firebase/firestore";

import { clientConfig } from './config';

/**
 * Initialize Firebase
 * Intialises firebase, auth and db by checking first if the app is already intialised
 * @returns Firebase App, Auth, Firestore Database
 */
const initializeFirebase = (): { firebaseApp: FirebaseApp, auth: Auth, db: Firestore } => {
  let app;
  if (!getApps().length) {
    app = initializeApp(clientConfig);
  } else {
    app = getApp();
  }
  const firestore = getFirestore(app);
  const authentication = getAuth(app);

  return { firebaseApp: app, auth: authentication, db: firestore };
};

const { firebaseApp, auth, db } = initializeFirebase();
export { firebaseApp, auth, db };


// Firebase Configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };