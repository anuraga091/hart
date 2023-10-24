/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@react-native-firebase/app';

//import { PUBLIC_FIREBASE_API, PUBLIC_AUTH_DOMAIN, PUBLIC_PROJECT_ID, PUBLIC_STORAGE_BUCKET, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_APP_ID, PUBLIC_MEASUREMENT_ID } from '@env.local';


const firebaseConfig = {
    apiKey: `AIzaSyBG7vC9Y5xby8zHZA2j4Zxk6NGYi5E4rTQ`,
    authDomain: `hart-dating-app.firebaseapp.com`,
    projectId: `hart-dating-app`,
    storageBucket: `hart-dating-app.appspot.com`,
    messagingSenderId: `179444331073`,
    appId: `1:179444331073:web:3cd957f26aa524b99a0cc0`,
    measurementId: `G-R8J1H0EG2Z`,
};

initializeApp(firebaseConfig);


AppRegistry.registerComponent(appName, () => App);
