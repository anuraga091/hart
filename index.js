/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@react-native-firebase/app';
import {firebase} from '@react-native-firebase/app';
import { Platform } from 'react-native';

//import { PUBLIC_FIREBASE_API, PUBLIC_AUTH_DOMAIN, PUBLIC_PROJECT_ID, PUBLIC_STORAGE_BUCKET, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_APP_ID, PUBLIC_MEASUREMENT_ID } from '@env.local';

const firebaseConfig = {
    clientId: '179444331073-0our82t9hhv234kb40e1gb5j81c27f3l.apps.googleusercontent.com',
    appId: '1:179444331073:android:aeb7b8a714d274f99a0cc0',
    apiKey: 'AIzaSyA0qJk2sCvs406qG7A8kT8xKSiSmrE9i5k',
    databaseURL: 'https://hart-dating-app-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'hart-dating-app.appspot.com',
    messagingSenderId: '179444331073',
    projectId: 'hart-dating-app',
};

// const iosCredentials = {
//     clientId: '',
//     appId: '',
//     apiKey: '',
//     databaseURL: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     projectId: '',
// };

// const credentials = Platform.select({
//     android: androidCredentials,
//     ios: iosCredentials,
// });

// const config = {
//     name: appName,
// };

// const firebaseConfig = {
//     apiKey: `AIzaSyBG7vC9Y5xby8zHZA2j4Zxk6NGYi5E4rTQ`,
//     authDomain: `hart-dating-app.firebaseapp.com`,
//     projectId: `hart-dating-app`,
//     storageBucket: `hart-dating-app.appspot.com`,
//     messagingSenderId: `179444331073`,
//     appId: `1:179444331073:web:3cd957f26aa524b99a0cc0`,
//     measurementId: `G-R8J1H0EG2Z`,
//     //databaseURL: `https://hart-dating-app-default-rtdb.asia-southeast1.firebasedatabase.app`
// };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
//await firebase.initializeApp(credentials, config);
//const apps = firebase.apps;
//initializeApp(firebaseConfig);


AppRegistry.registerComponent(appName, () => App);
