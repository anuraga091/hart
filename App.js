import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import axios from 'axios';

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

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const { isAuthenticated, hasCompletedOnboarding } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const idToken = await user.getIdToken();
        await axios.get(`${urls.PROD_URL}/user/${user.uid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            dispatch(setOnboardingCompletion(res.data.hasCompletedOnboarding));
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch user profile:", err);
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
        <Stack.Screen name="IntroPage2" component={IntroPage2} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        <Stack.Screen name="Prompts" component={Prompts} options={{ headerShown: false }} />
        <Stack.Screen name="Interest" component={Interest} options={{ headerShown: false }} />
        <Stack.Screen name="About-1" component={About1} options={{ headerShown: false }} />
        <Stack.Screen name="About-2" component={About2} options={{ headerShown: false }} />
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
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
