/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AbsoluteView,
  AppButton,
  AppImage,
  AppText,
  AppView,
  FlexSafeView,
} from 'react-native-quick-components';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Vibration,
} from 'react-native';
import {
  FONT_SIZES,
  Fonts,
  height,
  isIOS,
  width,
} from '../../utils/styles/fontsSizes';
import {Colors, colors} from '../../utils/styles/colors';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {
  firstPostMessage,
  getMessageLevel,
  markLastMessages,
  onDelete,
  onUpdateMessage,
  renderComposer,
  renderSend,
} from '.';
import {
  ChatIcon,
  LessBackIcon,
  ReloadIcon,
  StopIcon,
  ThreeDotIcon,
} from '../../utils/assetComp/IconComp';

export const ChatScreen = ({route}) => {
  const {goBack} = useNavigation();
  const {user} = route.params;
  const currentUser = firebase.auth().currentUser;
  const ref = useRef(null);
  const chatId =
    currentUser.uid > user.id
      ? `${currentUser.uid}-${user.id}`
      : `${user.id}-${currentUser.uid}`;

  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isQuesLoading, setIsQuesLoading] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const inputWidth = useRef(new Animated.Value(width * 0.75)).current; // initial width
  const paddLeftX = useRef(new Animated.Value(0)).current; // initial opacity
  const iconTranslateX = useRef(new Animated.Value(0)).current; // initial position

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);

    return clearTimeout();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      // .limit(10)
      .onSnapshot(async querySnapshot => {
        const messagesFirestore = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            id: doc.id,
            text: '',
            createdAt: new Date(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });
        if (messagesFirestore.length === 0) {
          const data = {
            _id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            text: 'This is a first post',
            user: user,
            type: 'post',
            data: {
              prompt:
                'If you stood on Mars in normal clothes, your blood would start to boil and you would die. ',
              comments: '',
            },
          };

          firstPostMessage({data, chatId}).then(async d => {
            if (user && user?.message) {
              const modalData = {
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                text: '',
                user: user,
                type: 'question-modal',
              };

              firstPostMessage({data: modalData, chatId});
            }
            if (user && !user?.message) {
              setTimeout(async () => {
                randomQuestion();
              }, 2000);
            }
          });
        } else {
          const updatedMessages = markLastMessages(messagesFirestore).reverse();
          setMessages(updatedMessages);
        }
      });

    return () => unsubscribe();
  }, [user]);

  const onSend = useCallback((message = []) => {
    const {_id, text} = message[0];
    firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        _id,
        createdAt: new Date(),
        text,
        user: user,
        type: 'chat',
      });
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  const randomQuestion = async (isNewModal = true) => {
    setIsQuesLoading(true);
    const askedQuestionsIndex = await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('asked_questions')
      .where('level', '==', getMessageLevel(messages.length))
      .get()
      .then(querySnapshot => {
        // .onSnapshot(querySnapshot => {
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return usersList.map(i => i?.question_index);
        // console.log(usersList);
      });
    const level1Questions = await firebase
      .firestore()
      .collection('questions')
      .doc(getMessageLevel(messages.length))
      .collection(getMessageLevel(messages.length, false))
      .get()
      .then(querySnapshot => {
        // .onSnapshot(querySnapshot => {
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        return usersList;
        // console.log(usersList);
      });

    const availableQuestions = level1Questions.filter(
      question => !askedQuestionsIndex.includes(question.id),
    );

    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    await firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('asked_questions')
      .add({
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        question_index: availableQuestions[randomIndex].id,
        level: getMessageLevel(messages.length),
        user: user,
      });

    const data = {
      _id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      text: availableQuestions[randomIndex]?.text,
      user: user,
      type: 'question',
    };
    if (isNewModal) {
      await firstPostMessage({data, chatId});
    }
    setIsQuesLoading(false);

    return availableQuestions[randomIndex];
  };

  const handleTextChange = inputText => {
    setTextMessage(inputText);
    if (inputText) {
      Animated.parallel([
        Animated.timing(inputWidth, {
          toValue: width * 0.9, // expand to 90% of the screen width
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(iconTranslateX, {
          toValue: 100, // move the icon out of the screen
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(paddLeftX, {
          toValue: width * 0.02, // move the icon out of the screen
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset the input and move the icon back to its original position
      Animated.parallel([
        Animated.timing(inputWidth, {
          toValue: width * 0.75, // reset to 75% of the screen width
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(iconTranslateX, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(paddLeftX, {
          toValue: width * 0, // move the icon out of the screen
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  const renderInputToolbar = props => {
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 20,
          paddingTop: 5,
          paddingHorizontal: width * 0.03,
          transform: [{translateX: paddLeftX}],
        }}>
        <Animated.View style={[{flexDirection: 'row', width: inputWidth}]}>
          <InputToolbar
            {...props}
            containerStyle={[styles.input]}
            primaryStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: width * 0.1,
              flexDirection: 'row',
            }}
          />
        </Animated.View>
        <Animated.View style={{transform: [{translateX: iconTranslateX}]}}>
          <AppView
            disabled={isQuesLoading}
            onPress={async () => {
              Vibration.vibrate(90);
              if (messages[0]?.type === 'question') {
                const newQuestions = await randomQuestion(false);

                onUpdateMessage(messages[0]?.id, chatId, newQuestions);
              } else {
                randomQuestion();
              }

              if (
                messages.length === 2 &&
                messages[0].type === 'question-modal'
              ) {
                onDelete({messageId: messages[0].id, chatId});
              }
            }}
            W={58}
            H={52}
            BG={Colors.background}
            BOR={16}
            FullColumnCenter>
            {isQuesLoading ? (
              <ActivityIndicator color={Colors.textSecondary} />
            ) : (
              <ChatIcon size={30} />
            )}
          </AppView>
        </Animated.View>
      </Animated.View>
    );
  };

  const renderMessage = props => {
    const isLastMessage = props.currentMessage?.id === messages[0]?.id;

    return (
      <View style={{paddingBottom: isLastMessage ? 30 : 0}}>
        {props?.currentMessage?.type === 'post' && (
          <>
            <View style={[styles.messageBubble]}>
              <Text style={styles.messageText}>
                {props.currentMessage?.data?.prompt}
              </Text>
              <Text style={styles.promptText}>Liked your prompt</Text>
              {user?.message && (
                <View style={{marginBottom: 20, alignItems: 'flex-start'}}>
                  <View style={styles.responseBox}>
                    <Text style={[styles.response, {fontFamily: Fonts.bold}]}>
                      {user?.message}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.triangleRight,
                      {borderBottomColor: colors.responseBackground},
                    ]}
                  />
                </View>
              )}
            </View>
            <Text style={styles.matchText}>
              You matched with {user?.displayName}!
            </Text>
          </>
        )}

        {props?.currentMessage?.type === 'question' && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {props?.currentMessage?.text}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                const newQuestions = await randomQuestion(false);

                onUpdateMessage(props.currentMessage?.id, chatId, newQuestions);
              }}
              style={styles.changeButton}>
              <ReloadIcon size={18} />
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
            <AbsoluteView B={10} R={10}>
              <AppView
                onPress={() => {
                  onDelete({messageId: props?.currentMessage?.id, chatId});
                }}
                FullRowCenter>
                <StopIcon size={14} />
                <AppText MX={4} F_SIZE={13} C={Colors.background}>
                  End
                </AppText>
              </AppView>
            </AbsoluteView>
          </View>
        )}
        {props?.currentMessage?.type === 'question-modal' && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Start with a prompt? </Text>

            <AppView MT={20} FullRowCenter>
              <AppButton
                BG="transparent"
                BOW={1}
                C={Colors.background}
                title="Yes"
                F_SIZE={15}
                PY={5}
                PX={25}
                MX={10}
                onPress={() => {
                  onDelete({messageId: props?.currentMessage?.id, chatId});
                  randomQuestion();
                }}
              />

              <AppButton
                BG="transparent"
                BOW={1}
                F_SIZE={15}
                PY={5}
                PX={25}
                C={Colors.background}
                title="No"
                MX={10}
                onPress={() => {
                  onDelete({messageId: props?.currentMessage?.id, chatId});
                }}
              />
            </AppView>
          </View>
        )}
        {props?.currentMessage?.type === 'chat' &&
          currentUser.uid === props.currentMessage?.user?.id && (
            <View
              style={{
                maxWidth: '80%',
                overflow: 'visible',
                // marginVertical: height * 0.004,
                marginBottom: props.currentMessage?.isLast
                  ? height * 0.025
                  : height * 0.004,
                marginLeft: 20,
                alignSelf: 'flex-start',
              }}>
              <View
                style={[styles.responseBox, {backgroundColor: Colors.boxbg}]}>
                <Text style={[styles.response, {color: Colors.textPrimary}]}>
                  {props.currentMessage.text}
                </Text>
              </View>
              {props.currentMessage?.isLast && (
                <View style={styles.triangleRight} />
              )}
            </View>
          )}
        {props?.currentMessage?.type === 'chat' &&
          currentUser.uid !== props.currentMessage?.user?.id && (
            <View
              style={{
                maxWidth: '80%',
                // marginTop: height * 0.004,
                overflow: 'visible',
                marginRight: 20,
                alignSelf: 'flex-end',
                marginBottom: props.currentMessage?.isLast
                  ? height * 0.025
                  : height * 0.004,
              }}>
              <View style={[styles.responseBox]}>
                <Text style={[styles.response]}>
                  {props.currentMessage.text}
                </Text>
              </View>
              {props.currentMessage?.isLast && (
                <View style={[styles.triangleRight1]} />
              )}
            </View>
          )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator color={Colors.textSecondary} size={50} />
      </View>
    );
  }
  const handleLoadMore = () => {
    console.log('Loading more');
    // if (hasMore && !loading) {
    //   fetchMessages(lastVisible);
    // }
  };

  // console.log(messages);
  return (
    <FlexSafeView PT={isIOS ? 0 : 20} PB={height * 0.04}>
      <AppView activeOpacity={1} PX={20} BG="transparent" RowSpacBtw>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <LessBackIcon size={20} />
          </TouchableOpacity>
          <AppImage ML={30} source={{uri: user?.image}} SIZE={45} BOR={50} />
          <Text style={styles.username}>{user?.displayName}</Text>
        </View>
        <AppView PB={'4%'}>
          <ThreeDotIcon size={20} />
        </AppView>
      </AppView>
      <GiftedChat
        textInputRef={ref}
        onLoadEarlier={handleLoadMore}
        isLoadingEarlier
        messages={messages}
        onSend={text => {
          onSend(text);
        }}
        // renderChatFooter={renderChatFooter}
        renderInputToolbar={renderInputToolbar}
        renderMessage={renderMessage}
        onInputTextChanged={handleTextChange}
        renderSend={renderSend}
        renderComposer={renderComposer}
        // isLoadingEarlier
        // renderLoadEarlier={() => (
        //   <ActivityIndicator size={30} color={Colors.textPrimary} />
        // )}
        // loadEarlier={false}
      />
    </FlexSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1a1a1a',
    padding: 16,
  },
  chatFooter: {
    height: 80, // Adjust the height as needed to create space
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  username: {
    color: '#fff',
    fontSize: FONT_SIZES[22],
    marginLeft: 10,
    fontFamily: Fonts.primary,
  },
  messageContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    paddingHorizontal: 30,
    paddingRight: 48,
    alignSelf: 'center',
    width: '82%',
  },
  messageText: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: Fonts.secondary,
    fontSize: 17,
    paddingTop: 20,
    paddingBottom: 10,
  },
  promptText: {
    color: colors.textAccent,
    fontSize: 17,
    marginVertical: 20,
    fontFamily: Fonts.primary,
  },
  matchText: {
    color: Colors.textSecondary1,
    fontSize: FONT_SIZES[17],
    textAlign: 'center',
    marginVertical: 30,
    fontFamily: Fonts.secondary,
  },
  questionContainer: {
    backgroundColor: Colors.textSecondary,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 30,

    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
  },
  questionText: {
    color: '#1a1a1a',
    fontSize: 21,
    textAlign: 'center',
    fontFamily: Fonts.primary,
  },
  changeButton: {
    borderRadius: 100,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    alignSelf: 'center',
  },
  changeButtonText: {
    color: '#1a1a1a',
    fontSize: FONT_SIZES[15],
    marginLeft: 8,
    fontFamily: Fonts.secondary,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 60,
    // padding: 12,
    paddingHorizontal: 10,
    borderTopWidth: 0, // Hide the top border
    width: '100%',
    // marginTop: 16,
    fontFamily: Fonts.secondary,
    position: 'relative',
    height: width * 0.125,
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderWidth: 0,
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
    borderBottomColor: Colors.boxbg,

    transform: [{rotate: '110deg'}],
    position: 'absolute',
    bottom: -13,
    left: -10,
  },
  triangleRight1: {
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
    transform: [{rotate: '20deg'}],
    position: 'absolute',
    bottom: -6,
    right: -19,
  },
  responseBox: {
    backgroundColor: colors.responseBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: height * 0.016,
  },
  response: {
    color: colors.responseText,
    fontSize: FONT_SIZES[16] + 1,
    fontFamily: Fonts.secondary,
  },
});
