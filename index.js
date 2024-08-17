/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

async function registerForegroundService() {
  await notifee.registerForegroundService(async notification => {
    return new Promise(resolve => {
      // Example task subscriber
      //   onTaskUpdate(async task => {
      //     if (task.update) {
      //       await notifee.displayNotification({
      //         id: notification.id,
      //         body: notification.body,
      //         android: {
      //           ...notification.android,
      //           progress: {
      //             max: task.update.total,
      //             current: task.update.current,
      //           },
      //         },
      //       });
      //     }
      //     if (task.complete) {
      //       await notifee.stopForegroundService();
      //       resolve(); // Resolve the promise to stop the service
      //     }
      //   });
    });
  });
}

// Call this function when you start your app
registerForegroundService();

AppRegistry.registerComponent(appName, () => App);
