import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ImgSrc} from '../../utils/assetComp/ImgSrc';
import SwipeUnlock from '../../components/slider';
import {BlurView} from '@react-native-community/blur';
import {colors} from '../../utils/styles/colors';
import {
  Fonts,
  fontSizes,
  height,
  margin,
  padding,
  width,
} from '../../utils/styles/fontsSizes';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {ThreeDotIcon} from '../../utils/assetComp/IconComp';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AppButton} from 'react-native-quick-components';

export const LikedScreen = ({route}) => {
  const {user} = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent={false}
        style="light"
        backgroundColor={colors.background}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.prompt}>
              If you stood on Mars in normal clothes, your blood would start to
              boil and you would die.
            </Text>
            <Text style={[styles.likePrompt, {paddingBottom: 30}]}>
              Liked your prompt
            </Text>
            {user?.message && (
              <View
                style={{
                  width: '90%',
                  marginBottom: padding.large,
                  marginTop: -10,
                  alignItems: 'flex-start',
                }}>
                <View style={styles.responseBox}>
                  <Text style={styles.response}>{user?.message}</Text>
                </View>

                <View style={styles.triangleRight} />
              </View>
            )}
          </View>
          <View style={styles.profileCard}>
            <Text style={styles.name}>{user?.displayName}</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleOpen}>
              <ThreeDotIcon size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // Vibration.vibrate(100);
                // ReactNativeHapticFeedback.trigger('impactHeavy', {
                //   enableVibrateFallback: false,
                //   ignoreAndroidSystemSettings: false,
                // });
                navigation.navigate('ProfileScreen', {user});
              }}>
              <Image
                source={{
                  uri: user?.image,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <AppButton
        title="Native"
        onPress={() => {
          Vibration.vibrate(90);
        }}
      />
      <AppButton
        title="NON"
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactHeavy', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: true,
          });
        }}
      /> */}
      <SwipeUnlock user={user} />
      {isOpen && (
        <BlurView
          intensity={100}
          blurReductionFactor={30}
          experimentalBlurMethod="dimezisBlurView"
          tint="systemUltraThinMaterialDark"
          style={styles.absolute}>
          <View style={styles.flexCenter}>
            <View style={styles.moreOptions}>
              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.optionText}>Remove</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#FFFFFF',
                  opacity: 0.3,
                  marginVertical: 10,
                }}
              />
              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.optionText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // padding: padding.small,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: margin.medium,
    width: '90%',
    paddingTop: padding.large,
    paddingHorizontal: padding.medium,
  },
  prompt: {
    color: colors.textWhite,
    // fontSize: fontSizes.medium,
    fontSize: RFPercentage(2.35),

    marginBottom: margin.small,
    fontFamily: Fonts.primary,
  },
  likePrompt: {
    color: colors.textAccent,
    fontSize: fontSizes.small,
    marginTop: margin.large,
    // marginBottom: 15,
    fontFamily: Fonts.primary,
  },
  responseBox: {
    backgroundColor: colors.responseBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  response: {
    color: colors.responseText,
    fontSize: fontSizes.medium,
    fontFamily: Fonts.bold,
  },
  profileCard: {
    backgroundColor: colors.profileCardBackground,
    borderRadius: 10,
    width: '90%',

    // overflow: "hidden",
  },
  image: {
    width: '100%',
    height: height * 0.4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  name: {
    color: colors.textWhite,
    fontSize: fontSizes.large,
    padding: 16,
    paddingLeft: 20,
    fontFamily: Fonts.primary,
  },
  moreButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  moreButtonText: {
    color: colors.textWhite,
    fontSize: fontSizes.large,
  },
  moreOptions: {
    width: '60%',
    height: 140,
    backgroundColor: colors.moreOptionsBackground,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderColor: colors.border,
    borderWidth: 1,
    alignSelf: 'center',
  },
  optionText: {
    color: colors.responseBackground,
    fontSize: fontSizes.medium,
    marginVertical: 10,
    fontFamily: Fonts.primary,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.responseBackground,
    transform: [{rotate: '110deg'}],
    position: 'absolute',
    bottom: -13,
    left: -10,
  },
});
