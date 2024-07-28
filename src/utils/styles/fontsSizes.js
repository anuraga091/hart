import {PixelRatio, Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

// src/styles/fonts.js
export const Fonts = {
  primary: 'LibreBaskerville-Bold',
  secondary: 'Raleway-SemiBold',
  RalewayBold: 'Raleway-Bold',
  RalewayRegular: 'Raleway-Medium',
  bold: 'Raleway-Bold',
};
export const isIOS = Platform.OS === 'ios';
import {Dimensions} from 'react-native';

export const FontSizes = {
  small: 17,
  medium: 22,
  large: 23,
  xLarge: 30,
};
export const FONT_SIZES = {};
for (let i = 1; i <= 60; i++) {
  FONT_SIZES[i] = moderateScale(i - 1);
  // FONT_SIZES[i] = i;
}

export const fontSizes = {
  large: width * 0.06,
  medium: width * 0.05,
  small: width * 0.04,
  xsmall: width * 0.04,
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
