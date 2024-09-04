import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Color, FontFamily, FontSize} from '../GlobalStyles';
import {Colors} from '../utils/styles/colors';

const ContinueButton = ({onPress, isLoading = false, disabled = false}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.buttonContainer, {opacity: disabled ? 0.6 : 1}]}>
        <Text style={styles.next}>Continue</Text>
        {isLoading ? (
          <ActivityIndicator color={Colors.borderColor} size={20} />
        ) : (
          <Image
            resizeMode="cover"
            style={styles.arrowImg}
            source={require('../../assets/arrow.png')}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    height: 52,
    width: '48%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: '4%',
    shadowOffset: {
      width: 1.5,
      height: 2,
    },
    borderRadius: 12,
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderColor: Color.colorBlack,
    borderWidth: 1,
    backgroundColor: Color.colorWheat,
  },
  next: {
    marginTop: 7,
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: Color.colorBlack,
  },
  arrowImg: {
    marginTop: 18,
  },
});

export default ContinueButton;
