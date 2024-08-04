import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

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
import {setAuthentication} from './src/redux/slice/userSlice';
import AboutUser from './src/screens/AboutUser';
import {ChatScreen} from './src/screens/ChatScreen/Chat';
import ViewUserScreen from './src/screens/ViewUserScreen';
import {ProfileScreen} from './src/screens/ProfileScreen/ProfileScreen';
import {init} from 'react-native-quick-components';
import {LikedScreen} from './src/screens/LikedScreen/LikedScreen';
import {ActivityIndicator, ImageBackground, View} from 'react-native';
import {ImgSrc} from './src/utils/assetComp/ImgSrc';
import {Colors, colors} from './src/utils/styles/colors';
import {TimelineScreen} from './src/screens/Timeline/TimelineScreen';
import auth from '@react-native-firebase/auth';
import {EditProfileScreen} from './src/screens/MyProfile/EditProfileScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableLayoutAnimations} from 'react-native-reanimated';
import {CreditScreen} from './src/screens/CreditScreen/CreditScreen';
import {ComingSoon} from './src/screens/ComingSoon/ComingSoon';

enableLayoutAnimations(true);
init({
  defaultBackgroundColor: 'transparent',
  defaultTextColor: 'rgba(255, 255, 255, 0.85)',
  defaultFontFamily: 'Raleway-SemiBold',
});

const Stack = createNativeStackNavigator();

const AppWrapper = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;
  // console.log(user);
  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={50} color={Colors.textSecondary} />
      </View>
    );
  }

  const initialRouteName = user ? 'TimelineScreen' : 'Login';

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
