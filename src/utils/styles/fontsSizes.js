import {PixelRatio, Platform} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const normalize = size => {
  const scale = PixelRatio.get();
  return size * scale;
};

// src/styles/fonts.js
export const Fonts = {
  primary: 'LibreBaskerville-Bold',
  secondary: 'Raleway-SemiBold',
  RalewayBold: 'Raleway-Bold',
  bold: 'Raleway-Bold',
};
export const isIOS = Platform.OS === 'ios';
import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const FontSizes = {
  small: 17,
  medium: getFontSize(22),
  large: 23,
  xLarge: 30,
};

export const fontSizes = {
  large: width * 0.06,
  medium: width * 0.05,
  // small: width * 0.04,
  small: width * 0.04,
  xsmall: width * 0.04,
  // large: isIOS ? 20 : 24,

  // medium: isIOS ? getFontSize(18) : getFontSize(22),
  // small: isIOS ? 16 : 18,
};

export const padding = {
  small: '2%',
  medium: '8%',
  large: '12%',
};

export const margin = {
  small: 8,
  medium: 16,
  large: 20,
};
