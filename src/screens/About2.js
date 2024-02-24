import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import ContinueButton from '../components/ContinueButton';
import { Color, FontFamily } from '../GlobalStyles'

const About2 = () => {

    const navigation = useNavigation();

    const onContinue = () => {
        console.log(navigation.getState)
        navigation.navigate('Homepage')
    }

  return (
    <View style={styles.basicDetail}>

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
    <View>
            <Text style={styles.text1}>
            Okay, last
            </Text>
            <Text style={styles.text2}>{`You can receive
upto`}</Text>
            <Text style={styles.text3}>15 likes 
            <Text style={styles.text2}> a day.</Text>
            
            </Text>
    </View>

    <View style={styles.textView}>
        <Text style={styles.white}>{`No this isn’t a premium feature. `}
            <Text style={styles.white}>We believe everyone on Hart deserves your</Text>
            <Text style={styles.yellow}>{` fullest attention.  `}</Text>
        </Text>
        
       
        <Text style={styles.white1}>{`That includes matching 
selectively! `}</Text>
    </View>
        
        
   

    <ContinueButton onPress={onContinue}/>

</View>
  )
}


const styles = StyleSheet.create({
    basicDetail: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "100%",
        height: '100%',
        overflow: "hidden",
        paddingLeft: 20,
        position: 'relative'
    },
    background11: {
        opacity: 1,
        height: 500,
        width: 400,
        position: "absolute",
    },
    background2: {
        top: 500,
        //width: 10,
    },
    text1: {
        marginTop: 120,
        color: '#F1DEAC', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 16
    },
    text2 : {
        color: '#FFF',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 28,
        marginTop: 30
    },
    text3: {
        color: '#F1DEAC',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 28,
    },
    white: {
        color: '#FFF',
        opacity: 0.6,
        fontSize: 18,
        lineHeight: 21,
        fontFamily: "Raleway-SemiBold",
    },
    yellow: {
        color: '#F1DEAC',
        opacity: 0.6,
        fontSize: 18,
        lineHeight: 21,
        fontFamily: "Raleway-SemiBold",
    },
    text1Container: {
        top: 40,
        width: 280,
        opacity: 0.6,
    },
    white1: {
        color: '#FFF',
        opacity: 0.6,
        fontSize: 18,
        lineHeight: 21,
        fontFamily: "Raleway-SemiBold",
        marginTop: 30
    },
    textView: {
        marginTop: 60,
        width: 280,
        marginBottom: 40
    }
    
   
});

export default About2