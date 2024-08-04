// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {
  PUBLIC_FIREBASE_API,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
  PUBLIC_MEASUREMENT_ID,
} from '@env.local';
//import 'dotenv/config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: `${PUBLIC_FIREBASE_API}`,
  authDomain: `${PUBLIC_AUTH_DOMAIN}`,
  projectId: `${PUBLIC_PROJECT_ID}`,
  storageBucket: `${PUBLIC_STORAGE_BUCKET}`,
  messagingSenderId: `${PUBLIC_MESSAGING_SENDER_ID}`,
  appId: `${PUBLIC_APP_ID}`,
  measurementId: `${PUBLIC_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
