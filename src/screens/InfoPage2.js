import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import React from 'react'
import { Color, FontFamily } from '../GlobalStyles';import { NavigationContainer } from '@react-navigation/native';


const IntroPage2 = ({navigation}) => {

    const goToSignup = () => {
        navigation.navigate('login')
    }

  return (
    <View style={styles.introPage2}>
        <Image
            style={styles.info1}
            resizeMode="cover"
            source={require("../../assets/info2.png")}
        />
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


        <Text style={[styles.text2Container, styles.containerPosition]}>
            <Text style={styles.white1}>{`Like `}</Text>
            <Text style={styles.yellow1}>Something?</Text>
        </Text>
        <Text style={[styles.text2Container, styles.containerPosition]}>
            <Text style={styles.white1}>{`Say `}</Text>
            <Text style={styles.yellow1}>Something.</Text>
        </Text>

        <Text style={[styles.text1Container, styles.containerPosition]}>
            <Text style={styles.white}>{`No more idle swiping.
If you want to match with someone, 
send a `}</Text>
            <Text style={styles.yellow}>comment</Text>
            <Text style={styles.white}>{` instead!`}</Text>

        </Text>

        <View style={styles.nextlayout}>
            <View style={[styles.introPage1Child1, styles.rectangleViewLayout]} >
                <Pressable style={styles.button} onPress={() => {}}>
                </Pressable>
            </View>
            <View style={[styles.rectangleView, styles.rectangleViewLayout]}>
                <Pressable style={styles.button} onPress={() => {}}>
                </Pressable>
            </View>  
        </View>

        <Pressable style={[styles.buttonContainer, styles.button]} onPress={goToSignup}>
            <Text style={styles.next}>Get Started</Text>
        </Pressable>
     
      
    </View>
  )
}

const styles = StyleSheet.create({
    introPage2: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "100%",
        height: 800,
        overflow: "hidden",
        alignItems: "center",
    },
    info1: {
        top: 100,
        width: 332,
        height: 249,
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

    text1Container: {
        top: 140,
        width: 350,
        opacity: 0.6,
    },
    containerPosition: {
        textAlign: "center",
    },
    white: {
        color: Color.colorWhite,
        fontSize: 18,
        lineHeight: 21,
        fontFamily: "Raleway-SemiBold",
    },
    yellow: {
        color: Color.colorWheat,
        fontSize: 18,
        lineHeight: 21,
        fontFamily: "Raleway-SemiBold",
    },
    white1: {
        color: Color.colorWhite,
        fontSize: 28,
        fontFamily: 'LibreBaskerville-Bold',

    },
    yellow1: {
        color: Color.colorWheat,
        fontSize: 28,
        fontFamily: 'LibreBaskerville-Bold',
    },
    text2Container: {
        top: 120,
        
    },

    nextlayout: {
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 200
    }, 

    rectangleViewLayout: {
        height: 5,
        width: 33,
        borderRadius: 9,
        marginRight: 20
    },

    rectangleView: {
        backgroundColor: Color.colorWheat,
    },

    introPage1Child1: {
        backgroundColor: "#343434",
    },

    buttonContainer: {
        top: 250,
        height: 50,
        width: 265,
        alignItems: 'center',
        shadowColor: "rgba(0, 0, 0, 0.6)",
        shadowOffset: {
          width: 1.5,
          height: 2,
        },
        borderRadius: 12,
        shadowRadius: 1,
        elevation: 1,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderColor: Color.colorBlack,
        borderWidth: 1,
        backgroundColor: Color.colorWheat,
    },

    next: {
        marginTop: 8,
        fontSize: 22,
        fontFamily: "Raleway-Bold",
        color: Color.colorBlack,
        textAlign: "center",
    },
   



})


export default IntroPage2