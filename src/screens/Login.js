import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React,{useState} from 'react'
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import ContinueButton from '../components/ContinueButton';
import OTP from './OTP';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
    const [number, setNumber] = useState('')
    const [optSent, setOtpSent] = useState(false)
    const [verificationId, setVerificationId] = useState(null);


    const onChangeNumber = (e) => {
        setNumber(e)
        console.log(e)
    }


    const sendOTP = async () => {
        setOtpSent(true)
        try {
            const formattedPhoneNumber = `+91${number}`
            const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
            console.log(confirmation)
            setVerificationId(confirmation.verificationId);
          } catch (error) {
            console.error(error);
          }
    }


  return (
    <View style={styles.loginPage}>
        <Image
            style={[
            styles.background1,
            styles.background11,
            ]}
            resizeMode="cover"
            source={require("../../assets/background1.png")}
        />
        <Image
            style={[
            styles.background2,
            styles.background11,
            ]}
            resizeMode="cover"
            source={require("../../assets/background1.png")}
        />
        { !optSent ?
            <View>
                <Text style={styles.welcometext}>
                    Welcome to our universe!
                </Text>
                <Text style={styles.phone}>{`Enter your
phone number`}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="+91"
                    inputMode="tel"
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholderTextColor='#fff'
                />

                <ContinueButton onPress={sendOTP}/>
            </View>
        :
        verificationId && (
            <OTP number={number} verificationId={verificationId} navigation={navigation}/>
        )
        
}

        
    </View>
  )
}

const styles = StyleSheet.create({
    loginPage: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "120%",
        height: '100%',
        overflow: "hidden",
        paddingLeft: 20,
        position: 'relative'
    },
    background11: {
        opacity: 1,
        height: 500,
        width: '100%',
        position: "absolute",
    },
    background2: {
        top: 500,
    },
    welcometext: {
        marginTop: 110,
        color: '#F1DEAC', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 16
    },
    phone : {
        color: '#FFF',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 28,
        marginTop: 30
    },
    input : {
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

export default Login