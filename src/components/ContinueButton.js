import { Image, StyleSheet, Text, View, Pressable} from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const ContinueButton = ({onPress }) => {

  return (
    <Pressable onPress={onPress}>
        <View style={styles.buttonContainer}>
            <Text style={styles.next}>Continue</Text>
            <Image
                resizeMode="cover" 
                style={styles.arrowImg}
                source={require("../../assets/arrow.png")}
            />
        </View>
        
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 30,
        height: 50,
        width: 170,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
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
        marginTop: 7,
        fontSize: 22,
        fontFamily: "Raleway-Bold",
        color: Color.colorBlack,

    },
    arrowImg: {
        marginTop: 18,
    },
})

export default ContinueButton