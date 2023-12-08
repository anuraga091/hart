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


const Stack = createNativeStackNavigator();


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
          {!user ? (
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
            ) : (
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
            </>
          )}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
