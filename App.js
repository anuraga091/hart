import React, { useEffect, useState } from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
import IntroPage1 from './src/screens/IntroPage1';
import IntroPage2 from './src/screens/InfoPage2';
import Login from './src/screens/Login';
import OTP from './src/screens/OTP';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './src/screens/Details';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Prompts from './src/screens/Prompts';
import Interest from './src/screens/Interest';
import About1 from './src/screens/About1';
import About2 from './src/screens/About2';
import axios from 'axios'
import urls from './src/utils/urls';
import Homepage from './src/screens/Homepage';



const Stack = createNativeStackNavigator();


function App() {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [loading, setLoading] = useState(false)
  //const idToken = await auth().currentUser.getIdToken();

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true)
      if (user) {
        const idToken = await auth.currentUser.getIdToken();
        console.log(user.uid)
        //User is signed in, now check if they've completed onboarding
        await axios.get(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user/${user.uid}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}` 
                },
            }).then(res => {
                console.log(res.data)
                setHasCompletedOnboarding (res.data.hasCompletedOnboarding)
                setLoading(false)
            }).catch(err => {
                console.error("Failed to fetch user profile:", err);
                setLoading(false)
            }
        )
      }
      setUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <NavigationContainer >
          <Stack.Navigator>
          {!user ? 
            (
              <>
                <Stack.Screen
                  name="IntroPage1"
                  component={IntroPage1}
                  options={{headerShown: false}}

                />
                <Stack.Screen
                  name="IntroPage2"
                  component={IntroPage2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="login"
                  component={Login}
                  options={{ headerShown: false }}
                />
              </>
            ) 
          : !hasCompletedOnboarding ? 
            (
              <>
                <Stack.Screen
                  name="Details"
                  component={Details}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Prompts"
                  component={Prompts}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Interest"
                  component={Interest}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="About-1"
                  component={About1}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="About-2"
                  component={About2}
                  options={{ headerShown: false }}
                />
              </>
            ) 
          :
            (  
              <>
                <Stack.Screen
                  name="Homepage"
                  component={Homepage}
                  options={{ headerShown: false }}
                />
              </>
            )
        
        }
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
