import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import axios from 'axios';
import { getLocation } from './src/utils/useLocation';

// Screens and redux store imports
import IntroPage1 from './src/screens/IntroPage1';
import IntroPage2 from './src/screens/InfoPage2'; // Ensure correct import path
import Login from './src/screens/Login';
import Details from './src/screens/Details';
import Prompts from './src/screens/Prompts';
import Interest from './src/screens/Interest';
import About1 from './src/screens/About1';
import About2 from './src/screens/About2';
import Homepage from './src/screens/Homepage';
import { store, persistor } from './src/redux/store';
import { setAuthentication, setOnboardingCompletion } from './src/redux/slice/userSlice';
import urls from './src/utils/urls';
import AboutUser from './src/screens/AboutUser';
import Chat from './src/screens/Chat';
import Likes from './src/screens/Likes';
import ViewUserScreen from './src/screens/ViewUserScreen';
import { addBasicDetail } from './src/redux/reducer/basicDetailsSlice';

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useSelector((state) => state.user);
  const details = useSelector((state) => state.basicDetails);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const idToken = await user.getIdToken();

          getLocation(
            (position) => {
              const lat = position.coords.latitude
              const long = position.coords.longitude
              const altitude = position.coords.altitude
              const accuracy = position.coords.accuracy
              const location = {
                lat: lat,
                long: long,
                altitude: altitude,
                accuracy: accuracy 
              }
              axios.post(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user/location`, {
                firebaseUid: user.uid,
                location: location
                // Add any other relevant information
              }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}` 
                },
              }).then(res => {
                // Handle response
                console.log('Location updated', res.data);
              }).catch(err => {
                console.log('Failed to update location', err);
              });
            },
            (error) => {
              setError(error.message);
            }
          )
          await axios.get(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user/${user.uid}`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${idToken}` 
              },
          }).then(res => {
              const {hasCompletedOnboarding, ...restData} =  res.data;
              dispatch(addBasicDetail(restData));
              dispatch(setOnboardingCompletion(res.data.hasCompletedOnboarding));
              setLoading(false);
          }).catch(err => {
              console.log('No user Found', err)
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
      ? "Homepage"
      : "Details"
    : "IntroPage1";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="IntroPage1" component={IntroPage1} options={{ headerShown: false }} />
        {/*<Stack.Screen name="IntroPage2" component={IntroPage2} options={{ headerShown: false }} />*/}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        <Stack.Screen name="Prompts" component={Prompts} options={{ headerShown: false }} />
        <Stack.Screen name="Interest" component={Interest} options={{ headerShown: false }} />
        <Stack.Screen name="About-1" component={About1} options={{ headerShown: false }} />
        <Stack.Screen name="About-2" component={About2} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Like" component={Likes} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="About-User" component={AboutUser} options={{ headerShown: false }} />
        <Stack.Screen name="ViewProfile" component={ViewUserScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <AppWrapper/>
      </PersistGate>
    </Provider>
  );
};

export default App;
