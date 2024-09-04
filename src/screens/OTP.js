import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ContinueButton from '../components/ContinueButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import urls from '../utils/urls';
import {addBasicDetail} from '../redux/reducer/basicDetailsSlice';
import {setOnboardingCompletion} from '../redux/slice/userSlice';
import {useDispatch} from 'react-redux';
import {AppView} from 'react-native-quick-components';
import {width} from '../utils/styles/fontsSizes';

const OTP = ({number, verificationId}) => {
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const dispatch = useDispatch();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleOTP = (text, index) => {
    const newDigits = [...otpDigits];
    newDigits[index] = text;
    setOtpDigits(newDigits);

    // Move focus to the next input
    if (index < 5 && text.length === 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const signup = async () => {
    //console.log(otpDigits)
    setIsLoading(true);
    const confirmationCode = otpDigits.join('');
    //console.log(confirmationCode)

    const credential = auth.PhoneAuthProvider.credential(
      verificationId,
      confirmationCode,
    );
    await auth()
      .signInWithCredential(credential)
      .then(res => {
        console.log('Phone authentication successful', res.user.uid);
        axios
          .get(`${urls.PROD_URL}/user/${res.user?.uid}`, {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${idToken}`,
            },
          })
          .then(res => {
            // console.log(res.data);
            setIsLoading(false);

            const {hasCompletedOnboarding, ...restData} = res.data;
            dispatch(addBasicDetail(restData));
            dispatch(setOnboardingCompletion(res.data.hasCompletedOnboarding));
            navigation.navigate('Homepage');

            // dispatch(setOnboardingCompletion(true));
            // setLoading(false);
          })
          .catch(err => {
            console.log('No user Found', err);
            navigation.navigate('Details');

            // setLoading(false);
          });
      })
      .catch(error => {
        if (error.code == 'auth/invalid-verification-code') {
          setError('Incorrect OTP. Please try again.');
        }
        console.log(error);
        setOtpDigits(['', '', '', '', '', '']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View>
      <Text style={styles.welcometext}>We’ve sent a code to {number}</Text>
      <Text style={styles.phone}>{`Enter OTP`}</Text>

      <View style={styles.otpContainer}>
        {otpDigits.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            onChangeText={text => handleOTP(text, index)}
            value={digit}
            keyboardType="number-pad"
            maxLength={1}
            inputMode="numeric"
            placeholderTextColor="#fff"
          />
        ))}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
      <ContinueButton onPress={signup} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: 'rgba(0,0,0,0.9)',
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
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    color: '#fff',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 18,
    paddingLeft: 20,
    marginRight: 10,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  error: {
    color: '#E66767',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 14,
    marginTop: 10,
  },
});

export default OTP;
