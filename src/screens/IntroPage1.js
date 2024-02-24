import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import React,{useEffect} from 'react'
import { Color, FontFamily } from '../GlobalStyles'
import { useSelector } from 'react-redux';


const IntroPage1 = ({navigation}) => {

    const { isAuthenticated, hasCompletedOnboarding } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuthenticated && !hasCompletedOnboarding) {
          navigation.navigate('Details');
        } else if (isAuthenticated && hasCompletedOnboarding) {
          navigation.navigate('Homepage');
        }
    }, [isAuthenticated, hasCompletedOnboarding, navigation]);
    

    const handleChange = () => {
        navigation.navigate('Login');
    }


  return (
    <View style={styles.introPage1}>
        <Image
            style={styles.info1}
            resizeMode="cover"
            source={require("../../assets/realate-icon.png")}
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
            <Text style={styles.yellow1}>Dating</Text>
            <Text style={styles.white1}>{` for the real ones. `}</Text>
            
        </Text>

        {/* <Text style={[styles.text1Container, styles.containerPosition]}>
            <Text style={styles.white}>{`Dating apps `}</Text>
            <Text style={styles.yellow}>suck</Text>
            <Text style={styles.white}>{`. People swipe mindlessly and put zero effort. On `}</Text>
            <Text style={styles.yellow}>Hart</Text>
            <Text style={styles.white}>{`, people actually `}</Text>
            <Text style={styles.yellow}>put in effort!</Text>
        </Text>

        <View style={styles.nextlayout}>
            <View style={[styles.rectangleView, styles.rectangleViewLayout]}>
                <Pressable style={styles.button} onPress={() => {}}>
                </Pressable>
            </View> 

            <View style={[styles.introPage1Child1, styles.rectangleViewLayout]} >
                <Pressable style={styles.button} onPress={() => {handleChange}}>
                </Pressable>
            </View> 
        </View> */}
        
        <Pressable style={[styles.buttonContainer, styles.button]} onPress={handleChange}>
            <Text style={styles.next}>Next</Text>
        </Pressable>
       
      
    </View>
  )
}

const styles = StyleSheet.create({
    introPage1: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "100%",
        height: 800,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: 'center',

    },
    // info1: {
    //     //top: 100,
    //     //width: 332,
    //     //height: 249,
    // },

    background11: {
        opacity: 1,
        height: 500,
        width: '100%',
        position: "absolute",
    },
    background2: {
        top: 500,
    },

    // text1Container: {
    //     top: 140,
    //     width: 280,
    //     opacity: 0.6,
    // },
    containerPosition: {
        textAlign: "center",
    },
    // white: {
    //     color: Color.colorWhite,
    //     fontSize: 18,
    //     lineHeight: 21,
    //     fontFamily: "Raleway-SemiBold",
    // },
    // yellow: {
    //     color: Color.colorWheat,
    //     fontSize: 18,
    //     lineHeight: 21,
    //     fontFamily: "Raleway-SemiBold",
    // },
    white1: {
        color: Color.colorWhite,
        fontSize: 16,
        fontFamily: 'LibreBaskerville-Bold',

    },
    yellow1: {
        color: Color.colorWheat,
        fontSize: 16,
        fontFamily: 'LibreBaskerville-Bold',
    },
    text2Container: {
        top: 20,
        
    },

    // nextlayout: {
    //     position: 'relative',
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    //     top: 200
    // }, 

    // rectangleViewLayout: {
    //     height: 5,
    //     width: 33,
    //     borderRadius: 9,
    //     marginLeft: 20
    // },

    // rectangleView: {
    //     backgroundColor: Color.colorWheat,
    // },

    // introPage1Child1: {
    //     backgroundColor: "#343434",
    // },

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


export default IntroPage1