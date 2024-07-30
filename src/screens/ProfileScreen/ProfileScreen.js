import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AbsoluteView, AppText, FlexView} from 'react-native-quick-components';
import {colors, Colors} from '../../utils/styles/colors';
import {
  Fonts,
  fontSizes,
  height,
  margin,
  padding,
  width,
} from '../../utils/styles/fontsSizes';
import {ImgSrc} from '../../utils/assetComp/ImgSrc';
import SwipeUnlock from '../../components/slider';
import {LikeButtonIcon, PinIcon} from '../../utils/assetComp/IconComp';

export const ProfileScreen = ({route}) => {
  const {user} = route.params;
  // console.log(user?.message);
  return (
    <FlexView>
      <ScrollView>
        <ImageBackground
          source={ImgSrc.background2}
          resizeMode="cover"
          style={styles.container}>
          <View style={styles.profileCard}>
            <View style={styles.shadow}>
              <Text style={styles.name}>{user?.displayName}</Text>

              <View style={styles.imageshadow}>
                <Image source={{uri: user?.image}} style={styles.image} />
              </View>
              {/* {user?.message && (
                <AbsoluteView
                  B={10}
                  R={10}
                  BG={Colors.transparent}
                  FullRowCenter>
                  <LikeButtonIcon size={width * 0.16} />
                </AbsoluteView>
              )} */}
            </View>
          </View>

          <View style={styles.cardShadow}>
            <View style={styles.card}>
              <Text style={styles.likePrompt}>A random fact I love</Text>

              <Text style={styles.prompt}>
                If you stood on Mars in normal clothes, your blood would start
                to boil and you would die.
              </Text>
              {/* {user?.message && (
                <AbsoluteView
                  B={10}
                  R={10}
                  BG={Colors.transparent}
                  FullRowCenter>
                  <LikeButtonIcon size={width * 0.16} />
                </AbsoluteView>
              )} */}
            </View>
          </View>

          <View style={styles.stripe}>
            <AppText style={styles.text1}>19</AppText>
            <View style={styles.separator1} />
            <AppText style={styles.text1}>Male</AppText>
            <View style={styles.separator1} />
            <PinIcon size={fontSizes.xsmall} />
            <AppText style={styles.text1}>Hulimavu</AppText>
            <View style={styles.separator1} />
            <AppText style={styles.text1}>5'7</AppText>
          </View>

          <View
            style={[
              styles.profileCard,
              {
                borderTopRightRadius: 22,
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 20,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                marginBottom: 10,
                marginTop: 14,
              },
            ]}>
            <Image
              source={ImgSrc.profile1}
              style={[styles.image, {width: '100%', height: height * 0.4}]}
            />
            {/* {user?.message && (
              <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
                <LikeButtonIcon size={width * 0.16} />
              </AbsoluteView>
            )} */}
          </View>

          <View style={[styles.cardShadow]}>
            <View style={styles.card}>
              <Text style={styles.likePrompt}>
                A place I could live forever
              </Text>

              <Text style={styles.prompt}>
                This town called ‘Sardina’ in Italy!
              </Text>
              {/* {user?.message && (
                <AbsoluteView
                  B={10}
                  R={10}
                  BG={Colors.transparent}
                  FullRowCenter>
                  <LikeButtonIcon size={width * 0.16} />
                </AbsoluteView>
              )} */}
            </View>
          </View>

          <View
            style={[
              styles.profileCard,
              {
                borderTopRightRadius: 22,
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 20,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                // paddingRight: 5,
              },
            ]}>
            <Image
              style={[styles.image, {width: '100%', height: height * 0.4}]}
              source={ImgSrc.profile3}
            />
            {/* {user?.message && (
              <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
                <LikeButtonIcon size={width * 0.16} />
              </AbsoluteView>
            )} */}
          </View>

          <View style={styles.cardShadow}>
            <View style={styles.card}>
              <Text style={styles.likePrompt}>My biggest date fail</Text>

              <Text style={styles.prompt}>
                Going to a restuarant and catching the girl’s dad spying on us
              </Text>
              {/* {user?.message && (
                <AbsoluteView
                  B={10}
                  R={10}
                  BG={Colors.transparent}
                  FullRowCenter>
                  <LikeButtonIcon size={width * 0.16} />
                </AbsoluteView>
              )} */}
            </View>
          </View>

          <View
            style={[
              styles.profileCard,
              {
                borderTopRightRadius: 22,
                borderBottomLeftRadius: 23,
                borderBottomRightRadius: 20,
                borderRightWidth: 5,
                borderBottomWidth: 5,
              },
            ]}>
            <Image
              source={ImgSrc.profile2}
              style={[styles.image, {width: '100%', height: height * 0.4}]}
            />
            {/* {user?.message && (
              <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
                <LikeButtonIcon size={width * 0.16} />
              </AbsoluteView>
            )} */}
          </View>
        </ImageBackground>

        <SwipeUnlock user={user} />
      </ScrollView>
    </FlexView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',

    marginVertical: 30,
  },
  likeIcon: {
    width: width * 0.158,
    height: width * 0.158,
  },
  shadow: {
    width: '100%',
    alignSelf: 'center',
    borderRightWidth: 0,
    borderLeftWidth: 2,
    borderRadius: 20,
  },

  profileCard: {
    backgroundColor: colors.profileCardBackground,
    borderRadius: 20,
    borderBottomRightRadius: 25,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,

    borderRightWidth: 6,
    borderTopWidth: 1.5,
    borderBottomWidth: 6,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 252, 252, 0.20)',
    shadowColor: 'rgba(255, 255, 255, 0.15)',
  },
  stripe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 15,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '90%',
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 18,
    marginBottom: 6,
  },

  text1: {
    color: '#fff',
    fontSize: fontSizes.xsmall,
    marginHorizontal: 10,
    fontFamily: Fonts.RalewayBold,
  },
  separator1: {
    width: 1,
    height: '108%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    width: '100%',
    paddingVertical: padding.medium,
    paddingHorizontal: padding.medium,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'center',
  },
  cardShadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingRight: 3,
    paddingBottom: 3,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    width: '90%',
    alignSelf: 'center',
  },
  prompt: {
    color: colors.textWhite,
    fontSize: fontSizes.large,
    marginBottom: margin.small,
    fontFamily: Fonts.primary,
    paddingBottom: 25,
  },
  likePrompt: {
    color: colors.textAccent,
    fontSize: fontSizes.small,
    marginBottom: 15,
    fontFamily: Fonts.RalewayBold,
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
    fontFamily: 'LibreBaskervilleBold',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  imageshadow: {
    width: '101%',
    height: height * 0.4,
    borderTopWidth: 1,
    backgroundColor: colors.border,
    borderRadius: 15,
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
    backgroundColor: colors.moreOptionsBackground,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 25,
    borderColor: colors.border,
    borderWidth: 1,
  },
  optionText: {
    color: colors.responseBackground,
    fontSize: fontSizes.medium,
    marginVertical: 10,
    fontFamily: Fonts.bold,
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
