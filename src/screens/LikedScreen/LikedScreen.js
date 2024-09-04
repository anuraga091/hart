import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import Footer from '../../components/footer';
import axios from 'axios';
import urls from '../../utils/urls';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AppText, AppView} from 'react-native-quick-components';

export const LikedScreen = ({route}) => {
  const U = route?.params;
  const [isOpen, setIsOpen] = useState(false);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [LikedUser, setLikedUser] = useState(null);
  const [LikedUserList, setLikedUserList] = useState([]);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const navigation = useNavigation();
  const currentUser = firebase.auth().currentUser;

  const getLikedList = () => {
    axios
      .get(`${urls.PROD_URL}/user-action/${currentUser.uid}`)
      .then(response => {
        // console.log('response', response.data.length);
        setLikedUserList(response.data);
        if (response.data && response.data?.length > 0) {
          setLikedUser(response.data[0]);
        } else {
          setLikedUser(null);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    getLikedList();
  }, []);

  // useEffect(() => {
  //   if (LikedUserList.length > 0) {
  //     setLikedUser(LikedUserList[CurrentIndex]);
  //   }
  // }, [LikedUserList, CurrentIndex]);

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
        handleClose();
        console.log(res.data);
        getLikedList();

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
          firebaseUid2: LikedUser?.user?.firebaseUid,
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
        getLikedList();

        navigation.navigate('Chat', {user: LikedUser?.user});
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
  }, [LikedUser?.user, currentUser.uid, getLikedList, navigation]);
  // console.log('LikedUser', LikedUser);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent={false}
        style="light"
        backgroundColor={colors.background}
      />
      {LikedUser ? (
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.prompt}>
                {Object.keys(LikedUser?.action?.prompts)[0]}
              </Text>
              <Text style={[styles.likePrompt, {paddingBottom: 30}]}>
                Liked your prompt
              </Text>
              {false && (
                <View
                  style={{
                    width: '90%',
                    marginBottom: padding.large,
                    marginTop: -10,
                    alignItems: 'flex-start',
                  }}>
                  <View style={styles.responseBox}>
                    <Text style={styles.response}>Abhaya</Text>
                  </View>

                  <View style={styles.triangleRight} />
                </View>
              )}
            </View>
            <View style={styles.profileCard}>
              <Text style={styles.name}>{LikedUser?.user?.name}</Text>
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
                  navigation.navigate('ProfileScreen', {user: LikedUser?.user});
                }}>
                <Image
                  source={{
                    uri: LikedUser?.user?.profilePictures[0],
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </View>
          <SwipeUnlock user={LikedUser?.user} onMatch={handleMatch} />
        </ScrollView>
      ) : (
        <AppView FullRowCenter H={height}>
          <Text style={{textAlign: 'center', color: '#a1a0a0'}}>
            No liked profile available.
          </Text>
        </AppView>
      )}
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
      {isOpen && (
        <BlurView
          intensity={100}
          blurReductionFactor={30}
          experimentalBlurMethod="dimezisBlurView"
          tint="systemUltraThinMaterialDark"
          style={styles.absolute}>
          <View style={styles.flexCenter}>
            <View style={styles.moreOptions}>
              <TouchableOpacity
                onPress={() => {
                  // handleAction();
                  handleAction('remove', LikedUser?.user?.firebaseUid);
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  handleAction('report', LikedUser?.user?.firebaseUid);
                }}>
                <Text style={styles.optionText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      )}
      <Footer index={2} />
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
