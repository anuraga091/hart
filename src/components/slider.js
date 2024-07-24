import React, {useRef} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
// import {AntDesign} from '@expo/vector-icons';
import {Colors, colors} from '../utils/styles/colors';
import {ImgSrc} from '../utils/styles/ImgSrc';
import {AppImage} from 'react-native-quick-components';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const lockWidth = width * 0.85;
const lockHeight = 70;
const smallgap = 4;
const finalPosition = lockWidth - lockHeight;

export default function SwipeUnlock() {
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
        console.log(g.dx);
        console.log(g.vx);
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
      navigation.navigate('Chat');
      // Alert.alert('Wohoo!!!', 'Profile matched 🙀💖😻', [
      //   {text: 'COOL', onPress: () => reset()},
      // ]);
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
          {'Sweep to match'}
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
    paddingBottom: '5%',
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
    borderColor: '#F1DEACCC',
  },
  txt: {
    color: '#F1DEAC',
    fontSize: 17,
    fontFamily: 'LibreBaskervilleBold',
  },
  bar: {
    position: 'absolute',
    height: lockHeight - smallgap * 2,
    width: lockHeight - smallgap * 2,
    // backgroundColor: '#F1DEAC',
    backgroundColor: Colors.transparent,
    borderRadius: lockHeight,
    left: smallgap,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
