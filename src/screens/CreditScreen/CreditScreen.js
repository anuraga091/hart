import React from 'react';
import {AppView, FlexSafeView} from 'react-native-quick-components';
import {BackButtonIcon, HeartIcon} from '../../utils/assetComp/IconComp';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONT_SIZES, Fonts, width} from '../../utils/styles/fontsSizes';
import {Colors} from '../../utils/styles/colors';
import {useNavigation} from '@react-navigation/native';

export const CreditScreen = () => {
  const {goBack} = useNavigation();
  return (
    <FlexSafeView>
      <BackButtonIcon />
      <View style={styles.container}>
        <Text style={styles.title}>I’m grateful for</Text>
        <Text style={styles.message}>
          Parth, Juhi, Faraaz, Anurag, Anushka, Poojitha, Sakshi, Anant, Ronit,
          Dhruv, Narayani, Shagun, and the countless others who believed in me.
        </Text>
        <Text style={[styles.message, {marginTop: '6%'}]}>
          Realate would be just an idea without your support - through late
          nights and lazy afternoons.
        </Text>
        <AppView FullRowCenter>
          <Text style={styles.thankYou}>Thank you. I love you. </Text>
          <HeartIcon size={26} />
        </AppView>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text style={styles.buttonText}>Cool</Text>
        </TouchableOpacity>
      </View>
    </FlexSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'green',
    paddingHorizontal: '8%',
  },

  title: {
    marginTop: '15%',
    marginBottom: '12%',
    textAlign: 'center',
    color: Colors.textSecondary,
    fontFamily: Fonts.LibreBaskervilleBold,
    fontSize: FONT_SIZES[27],
  },

  message: {
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.white,
    opacity: 0.6,
    fontFamily: Fonts.RalewayRegular,
    fontSize: FONT_SIZES[16],
    // transform: [{scale: 1.04}],

    lineHeight: FONT_SIZES[23],
    letterSpacing: 1.1, // Adjust the value as needed
  },
  thankYou: {
    marginVertical: '12%',
    textAlign: 'center',
    color: Colors.textSecondary,
    fontFamily: Fonts.LibreBaskervilleBold,
    fontSize: FONT_SIZES[18],
    paddingRight: 8,
  },
  button: {
    backgroundColor: Colors.textSecondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.78,
    height: 48,
    marginTop: '18%',
  },
  buttonText: {
    color: Colors.dark,
    fontFamily: Fonts.RalewayBold,
    fontSize: FONT_SIZES[18],
  },
});
