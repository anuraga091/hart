import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import ContinueButton from '../components/ContinueButton';
import OTP from './OTP';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../utils/styles/colors';

const Login = () => {
  const [number, setNumber] = useState('');
  const [optSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const navigation = useNavigation();
  const onChangeNumber = e => {
    setNumber(e);
  };

  const sendOTP = async () => {
    if (number.trim().length === 0) {
      return;
    }
    setIsLoading(true);

    // auth().signOut()

    // const userCredential = await firebase
    //   .auth()
    //   .createUserWithEmailAndPassword('a@gmail.com', '123456');
    // const user = userCredential.user;

    // await firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(user.uid)
    //   .set({
    //     id: user.uid,
    //     displayName: user.email.split('@')[0], // You can modify this to include more user info
    //     email: user.email,
    //   })
    //   .then(data => {
    //     console.log('result', data);
    //   })
    //   .catch(err => {
    //     console.log('error', err);
    //   });

    auth()
      .signInWithEmailAndPassword(`${number}@gmail.com`, '123456')
      .then(() => {
        console.log('User account created & signed in!');
        navigation.reset({index: 0, routes: [{name: 'TimelineScreen'}]});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     console.log('User signed in anonymously');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/operation-not-allowed') {
    //       console.log('Enable anonymous in your firebase console.');
    //     }

    //     console.error(error);
    //   });

    // setOtpSent(true);
    // try {
    //   const formattedPhoneNumber = `+91${number}`;
    //   const confirmation = await auth().signInWithPhoneNumber(
    //     formattedPhoneNumber,
    //   );

    //   setVerificationId(confirmation.verificationId);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <View style={styles.loginPage}>
      {!isLoading ? (
        <View>
          <Text style={styles.welcometext}>Welcome to our universe!</Text>
          <Text style={styles.phone}>{`Enter your phone number`}</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="+91"
            // inputMode="tel"
            keyboardType="default"
            // maxLength={10}
            placeholderTextColor="#fff"
          />

          <ContinueButton isLoading={isLoading} onPress={sendOTP} />
        </View>
      ) : (
        verificationId && (
          <OTP
            number={number}
            verificationId={verificationId}
            navigation={navigation}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    // backgroundColor: 'rgba(0,0,0,0.9)',
    flex: 1,
    width: '120%',
    height: '100%',
    overflow: 'hidden',
    paddingLeft: 20,
    position: 'relative',
  },
  background11: {
    opacity: 1,
    height: 500,
    width: '100%',
    position: 'absolute',
  },
  background2: {
    top: 500,
  },
  welcometext: {
    marginTop: 110,
    color: '#F1DEAC',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 16,
  },
  phone: {
    color: '#FFF',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 28,
    marginTop: 30,
  },
  input: {
    backgroundColor: '#2F2F2F',
    width: 300,
    height: 60,
    borderRadius: 10,
    marginTop: 30,
    color: '#fff',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default Login;
