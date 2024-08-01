import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PromptModal from '../components/Modal';
import ContinueButton from '../components/ContinueButton';
import {connect, useDispatch, useSelector} from 'react-redux';
import {addBasicDetail} from '../redux/reducer/basicDetailsSlice';
import {useNavigation} from '@react-navigation/native';
import {AbsoluteView, AppText, AppView} from 'react-native-quick-components';
import {BackButtonIcon, CrossCancelIcon} from '../utils/assetComp/IconComp';
import {FONT_SIZES, Fonts, height, width} from '../utils/styles/fontsSizes';
import {Colors} from '../utils/styles/colors';
import {BlurView} from '@react-native-community/blur';
import {
  incremented,
  onPromptTextAdd,
  onSelectedPrompt,
  updateText,
} from '../redux/reducer/promptReducer';
const promptList = [
  {prompt: 'I’m really passionate about', text: '', id: 0},
  {prompt: 'A movie I was influenced by', text: '', id: 1},
  {prompt: 'To me success is', text: '', id: 2},
  {prompt: 'A trait I admire in people', text: '', id: 3},
  {prompt: 'A social issue I care deeply about', text: '', id: 4},
  {prompt: 'A historical figure I want to meet', text: '', id: 5},
];
const Prompts = ({addBasicDetail, all_detail}) => {
  const navigation = useNavigation();
  const [prompt, setPrompt] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [Id, setId] = useState(null);
  const [promptIndex, setPromptIndex] = useState('');
  const [category, setCategory] = useState('Personal');
  const [modalVisible, setModalVisible] = useState(false);
  const [promptData, setPromptData] = useState({});
  const [promptText, setPromptText] = useState('');
  const [answersCount, setAnswersCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const prompts = useSelector(state => state?.prompts);
  const dispatch = useDispatch();
  // console.log('count', prompts?.selectedPrompts);
  // state => state.counter.value
  const [question, setQuestion] = useState('');
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleSelect = index => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(item => item !== index));
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, index]);
    }
  };

  // useEffect(() => {
  //   fetch(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/prompts`)
  //     .then(response => response.json())
  //     .then(data => setPromptData(data))
  //     .catch(error => console.error('Error fetching prompts', error));
  // }, []);

  // useEffect(() => {
  //   const count = Object.keys(promptData).reduce((total, cat) => {
  //     return (
  //       total +
  //       Object.values(promptData[cat]).filter(answer => answer.trim() !== '')
  //         .length
  //     );
  //   }, 0);
  //   setAnswersCount(count);
  // }, [promptData]);

  const showSelectedPrompts = key => {
    // setCategory(obj);
    setActiveIndex(key);
    //console.log(obj)
  };

  // const showPrompt = (prompt, key) => {
  //   if (answersCount >= 3) {
  //     alert('You can only answer three prompts.');
  //     return;
  //   }
  //   setModalVisible(true);
  //   setPrompt(prompt);
  //   setPromptIndex(key);
  //   const currentAnswer = promptData[category][prompt];
  //   setPromptText(currentAnswer || '');
  // };

  const handleBack = () => {
    //handle logout
    //console.log('clicked detail')
  };

  const onContinue = async () => {
    // dispatch(onPromptTextAdd(question));
    dispatch(updateText({id: Id, text: question}));

    setQuestion('');
    handleClose();
    // const userId = auth().currentUser.uid;
    // const idToken = await auth().currentUser.getIdToken();
    // console.log(promptData);
    // addBasicDetail({prompt: promptData});
    // navigation.navigate('Interest');
    // await axios.post(`${urls.PROD_URL}/prompts/${userId}`,
    // {
    //     "responses" : promptData
    // },
    // {
    //     headers: {
    //         "Authorization": `Bearer ${idToken}`,
    //         'Content-Type': 'application/json',
    //     }
    // }).then(res => {
    //     console.log(res.data)
    //     addBasicDetail({prompt: promptData})
    //     navigation.navigate("Interest");
    //     setLoading(false)
    // }).catch(err => {
    //     console.error("Unable to save detail now. Please try again later", err, err.code);
    //     setLoading(false)
    // })
  };
  // console.log(prompts?.prompts);
  useEffect(() => {
    if (prompts.prompts && Id) {
      setQuestion(prompts.prompts.find(i => i.id === Id).text);
    }
  }, [Id, prompts?.prompts]);
  return (
    <View style={styles.promptDiv}>
      <BackButtonIcon />
      <Text style={styles.text1}>Choose 3 prompts</Text>
      <View style={{height: 100}}>
        <View style={styles.categoryDiv}>
          {['Personal', 'World', 'My Type'].map((i, k) => {
            return (
              <Pressable key={k} onPress={() => showSelectedPrompts(k)}>
                <View
                  style={
                    activeIndex === k ? styles.activeCategory : styles.category
                  }>
                  <Text
                    style={
                      activeIndex === k ? styles.activeText2 : styles.text2
                    }>
                    {i}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        {prompts?.prompts?.map((i, k) => {
          return (
            <Pressable
              key={k}
              onPress={() => {
                dispatch(onSelectedPrompt(k));
                const objx = prompts?.selectedPromptsList.find(
                  obj => obj.id === i?.id,
                );
                if (!objx) {
                  //add prompt
                } else {
                }

                const textData = prompts?.prompts.filter(o => o.text);
                // console.log(obj);
                if (textData.length === 3) {
                  if (textData.find(h => h.id === i?.id)) {
                    console.log('Please');
                  }
                  // return;
                } else {
                }
                setId(i?.id);
                handleOpen();
                // if () {
                //
                // }

                // dispatch(onPromptTextAdd(question));

                // setPrompt(i);
              }}>
              <View
                style={[
                  styles.prompts,
                  i?.selected
                    ? {borderWidth: 1, borderColor: Colors.textSecondary}
                    : {},
                ]}>
                <Text style={styles.promptText}>{i.prompt}</Text>
                {i.selected && (
                  <Text style={styles.promptTextAnswer}>{i.text}</Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      {prompts?.prompts?.filter(i => i?.text).length === 3 && (
        <AbsoluteView
          B={0}
          style={{height: 100, justifyContent: 'center'}}
          FullRowCenter
          center_me="center">
          <AppView
            H={56}
            W={width * 0.75}
            BOR={13}
            BG={Colors.textSecondary}
            // onPress={() => nav.navigate('Prompts')}
            center_me="center"
            FullRowCenter
            // style={{borderWidth: 2, borderColor:"red"}}
            BOW={1}
            BOC={Colors.dark}>
            <AppText
              F_SIZE={FONT_SIZES[18]}
              C={Colors.darkOpacity}
              FONT={Fonts.RalewayBold}>
              Continue{' '}
            </AppText>
          </AppView>
        </AbsoluteView>
      )}
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
                placeholderTextColor={'#797979'}
                placeholder="Type here ..."
                value={question}
              />
            </View>
            <ContinueButton onPress={onContinue} />
          </View>
        </BlurView>
      )}

      {modalVisible && (
        <PromptModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          prompt={prompt}
          setPrompt={setPrompt}
          promptText={promptText}
          setPromptText={setPromptText}
          promptIndex={promptIndex}
          setPromptIndex={setPromptIndex}
          category={category}
          setCategory={setCategory}
          promptData={promptData}
          setPromptData={setPromptData}
        />
      )}
      {answersCount >= 3 && (
        <View style={styles.button}>
          <ContinueButton onPress={onContinue} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  promptDiv: {
    flex: 1,
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
    width: '85%',
    height: '35%',
    backgroundColor: Colors.boxbg1,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderColor: Colors.dark,
    borderWidth: 1,
    alignSelf: 'center',
  },
  optionText: {
    color: Colors.buttonBackground,
    fontSize: FONT_SIZES[24],
    // marginVertical: 10,
    fontFamily: Fonts.primary,
  },
  optionText1: {
    color: Colors.white,
    fontSize: FONT_SIZES[18],
    // marginVertical: 20,
    fontFamily: Fonts.LibreBaskervilleBold,
  },
  text1: {
    marginTop: 18,
    color: '#F1DEAC',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: FONT_SIZES[23],
    paddingLeft: 20,
  },
  categoryDiv: {
    flexDirection: 'row',
    marginTop: 38,
    justifyContent: 'space-around',
    // height: 40,
    paddingHorizontal: 5,
    width: '100%',
    //marginBottom: 20
  },
  activeCategory: {
    backgroundColor: '#2F2F2F',
    width: width * 0.29,

    height: 38,
    borderRadius: 30,
    // marginRight: 10,
    borderStyle: 'solid',
    borderColor: '#FFF',
    borderWidth: 1,
  },
  category: {
    backgroundColor: '#2F2F2F',
    width: width * 0.29,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark,
    // marginHorizontal: 5,
    // marginRight: 10,
  },
  activeText2: {
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    textAlign: 'center',
    paddingTop: 5,
  },

  text2: {
    color: '#B8B8B8',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    textAlign: 'center',
    paddingTop: 5,
  },
  prompts: {
    paddingVertical: 30,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  promptsView: {
    justifyContent: 'space-evenly',
  },
  promptText: {
    color: '#FFF',
    fontFamily: Fonts.secondary,
    fontSize: FONT_SIZES[17],
    textAlign: 'center',
    //paddingTop: 5,
  },
  promptTextAnswer: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Raleway-SemiBold',
    fontSize: FONT_SIZES[14],
    //paddingTop: 5,
    textAlign: 'center',
  },
  tickView: {
    justifyContent: 'space-evenly',
  },
  tick: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  page: {
    color: '#F1DEAC',
    //font-variant-numeric: lining-nums proportional-nums;
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 12,
    fontStyle: 'normal',
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 30,
    //fontWeight: 700,
    //lineHeight: 'normal',
  },
  backImg: {
    marginTop: 50,
    marginLeft: 25,
  },
});

const mapStateToProps = state => ({
  all_detail: state,
});

const mapDispatchToProps = {
  addBasicDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Prompts);
