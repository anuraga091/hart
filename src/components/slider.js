import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
// import {AntDesign} from '@expo/vector-icons';
import {colors, Colors} from '../utils/styles/colors';
import {ImgSrc} from '../utils/ImgSrc';
import {AppImage} from 'react-native-quick-components';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/styles/fontsSizes';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const {width} = Dimensions.get('window');
const lockWidth = width * 0.9;
const lockHeight = 70;
const smallgap = 6;
const finalPosition = lockWidth - lockHeight;

export default function SwipeUnlock({user}) {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const navigation = useNavigation();
  const translateBtn = pan.x.interpolate({
    inputRange: [0, finalPosition],
    outputRange: [0, finalPosition],
    extrapolate: 'clamp',
  });
  const textOpacity = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [0.7, 0],
    extrapolate: 'clamp',
  });
  const translateText = pan.x.interpolate({
    inputRange: [0, lockWidth / 2],
    outputRange: [0, lockWidth / 4],
    extrapolate: 'clamp',
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (g.vx > 2 || g.dx > lockWidth / 2) {
          unlock();
        } else {
          reset();
        }
      },
      onPanResponderTerminate: () => reset(),
    }),
  ).current;
  const reset = () => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  const unlock = () => {
    Animated.spring(pan, {
      toValue: {x: finalPosition, y: 0},
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    setTimeout(() => {
      reset();
      ReactNativeHapticFeedback.trigger('impactHeavy', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      });
      navigation.navigate('Chat', {user});
    }, 300);
  };
  return (
    <View style={styles.container}>
      <View style={styles.lockContainer}>
        <Animated.Text
          style={[
            styles.txt,
            {
              opacity: textOpacity,
              transform: [{translateX: translateText}],
            },
          ]}>
          {'Slide to match'}
        </Animated.Text>
        <Animated.View
          style={[styles.bar, {transform: [{translateX: translateBtn}]}]}
          {...panResponder.panHandlers}>
          {/* <AntDesign name="right" size={24} color="black" /> */}
          <AppImage source={ImgSrc.proccedarrowe} BG="transparent" SIZE={60} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    width: '100%',
    backgroundColor: colors.background,
  },
  lockContainer: {
    height: lockHeight,
    width: lockWidth,
    borderRadius: lockHeight,
    backgroundColor: '#272727',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#f1ddace9',
  },
  txt: {
    color: '#F1DEAC',
    fontSize: 19,
    fontFamily: Fonts.bold,
    opacity: 0.7,
  },
  bar: {
    position: 'absolute',
    height: lockHeight - smallgap * 2,
    width: lockHeight - smallgap * 2,
    backgroundColor: Colors.transparent,
    borderRadius: lockHeight,
    left: smallgap,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
