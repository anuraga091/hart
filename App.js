import React, {useEffect, useState} from 'react';

import {Provider, useDispatch, useSelector} from 'react-redux';
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
import {ActivityIndicator, Alert, ImageBackground, View} from 'react-native';
import {ImgSrc} from './src/utils/assetComp/ImgSrc';
import {Colors, colors} from './src/utils/styles/colors';
import {TimelineScreen} from './src/screens/Timeline/TimelineScreen';
import auth from '@react-native-firebase/auth';
import {EditProfileScreen} from './src/screens/MyProfile/EditProfileScreen';
import {enableLayoutAnimations} from 'react-native-reanimated';
import {CreditScreen} from './src/screens/CreditScreen/CreditScreen';
import {ComingSoon} from './src/screens/ComingSoon/ComingSoon';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {addBasicDetail} from './src/redux/reducer/basicDetailsSlice';
import {
  setAuthentication,
  setOnboardingCompletion,
} from './src/redux/slice/userSlice';
import {getLocation} from './src/utils/useLocation';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';
import axios from 'axios';
import urls from './src/utils/urls';

enableLayoutAnimations(true);
init({
  defaultBackgroundColor: 'transparent',
  defaultTextColor: 'rgba(255, 255, 255, 0.85)',
  defaultFontFamily: 'Raleway-SemiBold',
});

const Stack = createNativeStackNavigator();
// eibAfnWGSGOlqI-U8pcTIi:APA91bHVXh0aKbWTS5wYfQEpUh844vjpOjzJccrV1HMcE7_Eg6ObNoqe_fVtAuHSXCMTa0lFIic18vjsIVf7iqzbwZkJ43g7c_azQmdkpNwpdA1Sf10gbc3rT2a4ZcdZJNOiSFYWA_fL
const AppWrapper = () => {
  const {isAuthenticated, hasCompletedOnboarding} = useSelector(
    state => state.user,
  );
  const details = useSelector(state => state.basicDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async user => {
      setLoading(true);
      if (user) {
        const idToken = await user.getIdToken();

        getLocation(
          position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const altitude = position.coords.altitude;
            const accuracy = position.coords.accuracy;
            const location = {
              lat: lat,
              long: long,
              altitude: altitude,
              accuracy: accuracy,
            };
            axios
              .post(
                `${urls.PROD_URL}/user/location`,
                {
                  firebaseUid: user.uid,
                  location: location,
                  // Add any other relevant information
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                  },
                },
              )
              .then(res => {
                // Handle response
                console.log('Location updated', res.data);
              })
              .catch(err => {
                console.log('Failed to update location', err);
              });
          },
          error => {
            setError(error.message);
          },
        );
        await axios
          .get(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user/${user.uid}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
          })
          .then(res => {
            const {hasCompletedOnboarding, ...restData} = res.data;
            dispatch(addBasicDetail(restData));
            dispatch(setOnboardingCompletion(res.data.hasCompletedOnboarding));
            setLoading(false);
          })
          .catch(err => {
            console.log('No user Found', err);
            setLoading(false);
          });
        dispatch(setAuthentication(true));
      } else {
        dispatch(setAuthentication(false));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const initialRouteName = isAuthenticated
    ? hasCompletedOnboarding
      ? 'Homepage'
      : 'Details'
    : 'IntroPage1';
  return (
    <ImageBackground
      source={ImgSrc.background2}
      resizeMode="cover"
      style={{flex: 1, backgroundColor: colors.background}}>
      <NavigationContainer style={{backgroundColor: 'transparent'}}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
            contentStyle: {backgroundColor: 'transparent'},
          }}>
          <Stack.Screen name="IntroPage1" component={IntroPage1} />
          <Stack.Screen name="ComingSoon" component={ComingSoon} />
          <Stack.Screen name="TimelineScreen" component={TimelineScreen} />
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
