import React, {useEffect} from 'react';

import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens and redux store imports
import IntroPage1 from './src/screens/IntroPage1';
import Login from './src/screens/Login';
import Details from './src/screens/Details';
import Prompts from './src/screens/Prompts';
import Interest from './src/screens/Interest';
import About1 from './src/screens/About1';
import About2 from './src/screens/About2';
import Homepage from './src/screens/Homepage';
import {store, persistor} from './src/redux/store';
import AboutUser from './src/screens/AboutUser';
import {ChatScreen} from './src/screens/ChatScreen/Chat';
import ViewUserScreen from './src/screens/ViewUserScreen';
import {ProfileScreen} from './src/screens/ProfileScreen/ProfileScreen';
import {init} from 'react-native-quick-components';
import {LikedScreen} from './src/screens/LikedScreen/LikedScreen';
import {ImageBackground, Platform} from 'react-native';
import {ImgSrc} from './src/utils/assetComp/ImgSrc';
import {colors} from './src/utils/styles/colors';
import {TimelineScreen} from './src/screens/Timeline/TimelineScreen';
import {EditProfileScreen} from './src/screens/MyProfile/EditProfileScreen';
import {enableLayoutAnimations} from 'react-native-reanimated';
import {CreditScreen} from './src/screens/CreditScreen/CreditScreen';
import {ComingSoon} from './src/screens/ComingSoon/ComingSoon';
import {ChatList} from './src/screens/ChatScreen/ChatList';
import {PreferenceFilter} from './src/screens/PreferenceFilter/PreferenceFilter';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

enableLayoutAnimations(true);
init({
  defaultBackgroundColor: 'transparent',
  defaultTextColor: 'rgba(255, 255, 255, 0.85)',
  defaultFontFamily: 'Raleway-SemiBold',
});

const Stack = createNativeStackNavigator();
const AppWrapper = () => {
  const {isAuthenticated, hasCompletedOnboarding, hasCompletedRegistration} =
    useSelector(state => state.user);

  const details = useSelector(state => state.basicDetails);
  // console.log(details);

  const initialRouteName = isAuthenticated
    ? hasCompletedOnboarding
      ? 'Homepage'
      : 'Details'
    : 'IntroPage1';

  // const a=loading? "IntroPage1":isAuthenticated? hasCompletedOnboarding? "Homepage":"Details"
  // console.log(initialRouteName);
  useEffect(() => {
    // Request notification permissions on iOS
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission not granted.');
      }
    };

    if (Platform.OS === 'ios') {
      requestPermission();
    }

    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async message => {
      console.log('foreground message received', message);
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH, // Ensure HIGH importance
        visibility: AndroidVisibility.PUBLIC,
      });

      //Display a notification
      notifee.displayNotification({
        title: `<p style="font-family: 'LibreBaskerville-Bold';"><b>${message.notification.title}"</span></p></b></p>`,
        body: message.notification?.body ?? '',
        android: {
          channelId,
          color: '#F1DEAC',
          sound: 'default',
          smallIcon: 'ic_notification',
        },
      });

      // Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body);
    });

    // Handle background messages when app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    // Handle messages when the app is opened from the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ImageBackground
      source={ImgSrc.background2}
      resizeMode="cover"
      style={{flex: 1, backgroundColor: colors.background}}>
      <NavigationContainer style={{backgroundColor: 'transparent'}}>
        <Stack.Navigator
          initialRouteName={'IntroPage1'}
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: 'transparent'},
          }}>
          <Stack.Screen name="IntroPage1" component={IntroPage1} />
          <Stack.Screen name="ComingSoon" component={ComingSoon} />
          <Stack.Screen name="TimelineScreen" component={TimelineScreen} />
          <Stack.Screen name="PreferenceFilter" component={PreferenceFilter} />

          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Prompts" component={Prompts} />
          <Stack.Screen name="Interest" component={Interest} />
          <Stack.Screen name="About-1" component={About1} />
          <Stack.Screen name="About-2" component={About2} />
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="LikedScreen" component={LikedScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="About-User" component={AboutUser} />
          <Stack.Screen name="ViewProfile" component={ViewUserScreen} />
          <Stack.Screen name="CreditScreen" component={CreditScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
};

export default App;
