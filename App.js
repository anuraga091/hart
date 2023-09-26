import React from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
import IntroPage1 from './src/screens/IntroPage1';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


function App() {
  

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="IntroPage1"
            component={IntroPage1}
            options={{headerShown: false}}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
