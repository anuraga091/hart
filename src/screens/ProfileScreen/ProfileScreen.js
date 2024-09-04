import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {
  BackButtonIcon,
  LikeButtonIcon,
  PinIcon,
} from '../../utils/assetComp/IconComp';
import axios from 'axios';
import urls from '../../utils/urls';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';

export const ProfileScreen = ({route}) => {
  const currentUser = firebase.auth().currentUser;

  const {user} = route.params;
  const {goBack, navigate} = useNavigation();
  // console.log(user);
  function collectNonEmptyValues(obj) {
    const result = {};

    // Iterate over each category (e.g., "My Type", "Personal", etc.)
    for (const category in obj) {
      if (obj.hasOwnProperty(category)) {
        // Iterate over each key-value pair within the category
        for (const key in obj[category]) {
          if (obj[category].hasOwnProperty(key) && obj[category][key]) {
            // Add the key-value pair to the result if the value is non-empty
            result[key] = obj[category][key];
          }
        }
      }
    }

    return result;
  }
  function getCurrentAgeFromTimestamp(timestamp) {
    const birthDate = new Date(timestamp);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date hasn't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const prompts = collectNonEmptyValues(user?.prompts);
  const handleAction = async (action, targetFirebaseUid, prompts, reply) => {
    const idToken = await auth().currentUser.getIdToken();
    // const firebaseUid = data.basicDetails.firebaseUid;
    await axios
      .delete(`${urls.PROD_URL}/user-action/${currentUser.uid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then(res => {
        console.log(res.data);
        goBack();
        // if (currentIndex < matches.length - 1) {
        //   setCurrentIndex(currentIndex + 1);
        // }
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
      });
  };
  const handleMatch = useCallback(async () => {
    const idToken = await auth().currentUser.getIdToken();
    // console.log(LikedUser);
    await axios
      .post(
        `${urls.PROD_URL}/user-action/match`,
        {
          firebaseUid1: currentUser.uid,
          firebaseUid2: user?.firebaseUid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        // console.log(res.data);
        // getLikedList();

        navigate('Chat', {user: user});
        // if (currentIndex < matches.length - 1) {
        //   setCurrentIndex(currentIndex + 1);
        // }
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err?.response?.data,
          err.code,
        );
      });
  }, [user]);
  return (
    <FlexView>
      <BackButtonIcon />

      <ScrollView>
        <ImageBackground
          source={ImgSrc.background2}
          resizeMode="cover"
          style={styles.container}>
          <View style={styles.profileCard}>
            <View style={styles.shadow}>
              <Text style={styles.name}>{user?.name}</Text>

              <View style={styles.imageshadow}>
                <Image
                  source={{uri: user?.profilePictures[0]}}
                  style={styles.image}
                />
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
              <Text style={styles.likePrompt}>{Object.keys(prompts)[0]}</Text>

              <Text style={styles.prompt}>{Object.values(prompts)[0]}</Text>
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
            <AppText style={styles.text1}>
              {getCurrentAgeFromTimestamp(user?.dateOfBirth)}
            </AppText>
            <View style={styles.separator1} />
            <AppText style={styles.text1}>{user?.gender}</AppText>
            <View style={styles.separator1} />
            <PinIcon size={fontSizes.xsmall} />
            <AppText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[
                styles.text1,
                {
                  flexWrap: 'wrap', // Ensures the text wraps to the next line if it exceeds the width

                  width: 60,
                },
              ]}>
              {user.location?.locality}
            </AppText>
            <View style={styles.separator1} />
            <AppText style={styles.text1}>{user?.height}</AppText>
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
              source={{uri: user?.profilePictures[1]}}
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
              <Text style={styles.likePrompt}>{Object.keys(prompts)[1]}</Text>

              <Text style={styles.prompt}>{Object.values(prompts)[1]}</Text>
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
              source={{uri: user?.profilePictures[2]}}
            />
            {/* {user?.message && (
              <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
                <LikeButtonIcon size={width * 0.16} />
              </AbsoluteView>
            )} */}
          </View>

          <View style={styles.cardShadow}>
            <View style={styles.card}>
              <Text style={styles.likePrompt}>{Object.keys(prompts)[2]}</Text>

              <Text style={styles.prompt}>{Object.values(prompts)[2]}</Text>
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
              source={{uri: user?.profilePictures[3]}}
              style={[styles.image, {width: '100%', height: height * 0.4}]}
            />
            {/* {user?.message && (
              <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
                <LikeButtonIcon size={width * 0.16} />
              </AbsoluteView>
            )} */}
          </View>
        </ImageBackground>

        <SwipeUnlock user={user} onMatch={handleMatch} />
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
