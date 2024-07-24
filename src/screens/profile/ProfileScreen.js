import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  AbsoluteView,
  AppButton,
  AppText,
  AppView,
  FlexView,
} from 'react-native-quick-components';
import {colors, Colors} from '../../utils/styles/colors';
import {
  Fonts,
  fontSizes,
  height,
  margin,
  padding,
  width,
} from '../../utils/styles/fontsSizes';
import {ImgSrc} from '../../utils/styles/ImgSrc';
import SwipeUnlock from '../../components/slider';

export const ProfileScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <FlexView>
      <ScrollView>
        <ImageBackground source={ImgSrc.background1} style={styles.container}>
          <View style={styles.profileCard}>
            <Text style={styles.name}>Eshan</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleOpen}>
              <Image source={ImgSrc.returnImg} />
            </TouchableOpacity>

            <Image source={ImgSrc.profile} style={styles.image} />
            <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
              <Image source={ImgSrc.likeButton} />
            </AbsoluteView>
          </View>

          <View style={styles.card}>
            <Text style={styles.likePrompt}>A random fact I love</Text>

            <Text style={styles.prompt}>
              If you stood on Mars in normal clothes, your blood would start to
              boil and you would die.
            </Text>
            <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
              <Image source={ImgSrc.likeButton} />
            </AbsoluteView>
          </View>
        </ImageBackground>
        <View style={styles.card1}>
          <AppText style={styles.text1}>19</AppText>
          <View style={styles.separator1} />
          <AppText style={styles.text1}>Male</AppText>
          <View style={styles.separator1} />
          <Image source={ImgSrc.locationPin} />
          <AppText style={styles.text1}>Hulimavu</AppText>
          <View style={styles.separator1} />
          <AppText style={styles.text1}>5'7</AppText>
        </View>

        <View style={styles.profileCard}>
          <Image source={ImgSrc.profile1} style={styles.image} />
          <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
            <Image source={ImgSrc.likeButton} />
          </AbsoluteView>
        </View>
        <View style={styles.card}>
          <Text style={styles.likePrompt}>A place I could live forever</Text>

          <Text style={styles.prompt}>
            This town called ‘Sardina’ in Italy!
          </Text>
          <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
            <Image source={ImgSrc.likeButton} />
          </AbsoluteView>
        </View>

        <View style={styles.profileCard}>
          <Image source={ImgSrc.profile3} style={styles.image} />

          <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
            <Image source={ImgSrc.likeButton} />
          </AbsoluteView>
        </View>
        <View style={styles.card}>
          <Text style={styles.likePrompt}>My biggest date fail</Text>

          <Text style={styles.prompt}>
            Going to a restuarant and catching the girl’s dad spying on us
          </Text>
          <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
            <Image source={ImgSrc.likeButton} />
          </AbsoluteView>
        </View>
        <View style={styles.profileCard}>
          <Image source={ImgSrc.profile2} style={styles.image} />

          <AbsoluteView B={10} R={10} BG={Colors.transparent} FullRowCenter>
            <Image source={ImgSrc.likeButton} />
          </AbsoluteView>
        </View>
        <AppButton
          title="Report"
          BG={Colors.textSecondary1}
          C={Colors.dark}
          center
          W={width * 0.4}
          FONT={Fonts.bold}
          H={50}
          MY={30}
        />
        <SwipeUnlock />
      </ScrollView>
    </FlexView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: padding.small,
    alignContent: 'center',
    alignItems: 'center',
  },
  card1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: '88%',
    borderColor: colors.border,
    borderWidth: 1,
  },
  text1: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
    fontFamily: Fonts.RalewayBold,
  },
  separator1: {
    width: 1,
    height: '100%',
    backgroundColor: '#555',
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: margin.medium,
    width: '90%',
    paddingVertical: padding.medium,
    paddingHorizontal: padding.medium,
    borderWidth: 1,
    borderColor: colors.border,
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
  profileCard: {
    marginVertical: 25,
    backgroundColor: colors.profileCardBackground,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 252, 252, 0.20)',
    shadowColor: 'rgba(255, 255, 255, 0.15)',
    shadowOffset: {width: 2.25, height: 2}, // horizontal and vertical shadow offset
    shadowOpacity: 1, // opacity of the shadow
    shadowRadius: 1, // blur radius
    elevation: 1, // for Android shadow (doesn't support rgba colors)

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
    backgroundColor: colors.moreOptionsBackground,
    borderRadius: 10,
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
