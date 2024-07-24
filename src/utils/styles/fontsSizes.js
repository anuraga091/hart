import {Platform} from 'react-native';

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
  medium: 22,
  large: 23,
  xLarge: 30,
};

export const fontSizes = {
  large: isIOS ? 20 : 24,
  medium: isIOS ? 18 : 20,
  small: isIOS ? 16 : 18,
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
