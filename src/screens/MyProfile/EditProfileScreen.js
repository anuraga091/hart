import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, Colors} from '../../utils/styles/colors';
import {FONT_SIZES, Fonts, height, width} from '../../utils/styles/fontsSizes';
import {useNavigation} from '@react-navigation/native';
import {
  BackButtonIcon,
  CrossCancelIcon,
  LessBackIcon,
  RightarrowIcon,
} from '../../utils/assetComp/IconComp';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import MyTest, {DraggableBox} from '../../components/DraggableBox';
import {BlurView} from '@react-native-community/blur';
import {
  AbsoluteView,
  AppButton,
  AppText,
  AppView,
} from 'react-native-quick-components';
import {useDispatch, useSelector} from 'react-redux';
import {
  onPromptTextAdd,
  onSelectedPrompt,
} from '../../redux/reducer/promptReducer';

export const EditProfileScreen = () => {
  const nav = useNavigation();
  const prompts = useSelector(state => state?.prompts);
  // console.log(prompts);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(true);
  const [question, setQuestion] = useState('');
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const disptach = useDispatch();

  useEffect(() => {
    if (prompts?.selectedPrompts?.text) {
      setQuestion(prompts.selectedPrompts?.text);
    }
  }, [prompts?.selectedPrompts]);

  return (
    <View style={styles.container}>
      <BackButtonIcon />

      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        scrollEnabled={isScrolling}>
        <DraggableBox
          onLongPress={i => {
            setIsScrolling(i);
          }}
        />

        {prompts?.prompts
          ?.filter(i => i.text)
          .map((i, k) => {
            return (
              <TouchableOpacity
                key={k}
                onPress={() => {
                  // nav.navigate('LikedScreen');
                  handleOpen();
                  disptach(onSelectedPrompt(k));
                }}
                style={styles.infoBox}>
                <Text style={styles.infoTitle}>{i?.prompt}</Text>

                <Text style={styles.infoText}>{i?.text}</Text>
              </TouchableOpacity>
            );
          })}
        <View style={styles.details}>
          <AppView RowSpacBtw>
            <View>
              <Text style={styles.detailTitle}>Gender</Text>
              <Text style={styles.detailText}>Male</Text>
            </View>
            <RightarrowIcon />
          </AppView>
        </View>
        <View style={{borderBottomColor: '#303030', borderBottomWidth: 1}} />

        <View style={styles.details}>
          <AppView RowSpacBtw>
            <View>
              <Text style={styles.detailTitle}>Height</Text>
              <Text style={styles.detailText}>5'7"</Text>
            </View>
            <RightarrowIcon />
          </AppView>
        </View>
        <View style={{borderBottomColor: '#303030', borderBottomWidth: 1}} />
      </ScrollView>
      {isOpen && (
        <BlurView
          intensity={100}
          blurReductionFactor={30}
          experimentalBlurMethod="dimezisBlurView"
          tint="systemUltraThinMaterialDark"
          style={styles.absolute}>
          <View style={styles.flexCenter}>
            <View style={styles.moreOptions}>
              <AbsoluteView onPress={handleClose} T={15} R={15}>
                <CrossCancelIcon size={18} />
              </AbsoluteView>
              <Text style={styles.optionText}>
                {prompts?.selectedPrompts?.prompt}
              </Text>
              <TextInput
                onChangeText={setQuestion}
                style={styles.optionText1}
                placeholderTextColor={Colors.textPrimary}
                placeholder="Write something ..."
                value={question}
              />
            </View>
            <AppView
              H={60}
              W={width * 0.9}
              BOR={12}
              BG={Colors.boxbg}
              center_me="center"
              FullRowCenter
              MY={24}
              BOW={1}
              onPress={() => {
                handleClose();
                disptach(onPromptTextAdd(question));
              }}
              BOC={Colors.dark}>
              <AppText
                F_SIZE={FONT_SIZES[16]}
                C={Colors.textPrimary}
                FONT={Fonts.RalewayBold}>
                Save
              </AppText>
            </AppView>
            <AppView
              H={60}
              W={width * 0.9}
              BOR={12}
              BG={Colors.textSecondary}
              onPress={() => {
                handleClose();
                setTimeout(() => {
                  nav.navigate('Prompts');
                }, 200);
              }}
              center_me="center"
              FullRowCenter
              BOW={1}
              BOC={Colors.dark}>
              <AppText
                F_SIZE={FONT_SIZES[16]}
                C={Colors.darkOpacity}
                FONT={Fonts.RalewayBold}>
                Change Prompt
              </AppText>
            </AppView>
          </View>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    padding: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'transparent',
  },

  moreOptions: {
    width: '90%',
    height: '25%',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderColor: Colors.dark,
    borderWidth: 1,
    alignSelf: 'center',
  },
  optionText: {
    color: colors.responseBackground,
    fontSize: FONT_SIZES[15],
    marginVertical: 10,
    fontFamily: Fonts.RalewayBold,
  },
  optionText1: {
    color: Colors.white,
    fontSize: FONT_SIZES[18],
    marginVertical: 20,
    fontFamily: Fonts.LibreBaskervilleBold,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 150,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    // padding: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  imageBox: {
    width: width * 0.38,
    height: height * 0.23,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // marginBottom: 8,
    margin: '3%',
  },
  imageText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: Fonts.RalewayRegular,
  },
  infoBox: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 30,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    marginHorizontal: width * 0.04,
  },
  infoTitle: {
    color: Colors.textSecondary,
    opacity: 1,
    fontFamily: Fonts.RalewayBold,
    textAlign: 'center',
    fontSize: FONT_SIZES[18],
  },
  infoText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    opacity: 0.7,
    fontSize: FONT_SIZES[15],
    fontFamily: Fonts.RalewayBold,
    paddingTop: 8,
  },
  details: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: '5%',
    backgroundColor: Colors.darkGray1,
    marginVertical: 2,
    paddingHorizontal: width * 0.04,
    marginTop: '3%',
  },
  detailTitle: {
    color: Colors.white,
    fontSize: FONT_SIZES[17],
    fontFamily: Fonts.primary,
  },
  detailText: {
    color: Colors.white,
    opacity: 0.6,
    fontSize: FONT_SIZES[14],
    fontFamily: Fonts.RalewayRegular,
    paddingTop: 4,
  },
});
