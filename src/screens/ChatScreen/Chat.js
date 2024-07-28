/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  AbsoluteView,
  AppButton,
  AppImage,
  AppText,
  AppView,
  FlexSafeView,
  FlexView,
} from 'react-native-quick-components';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ImgSrc} from '../../utils/ImgSrc';
import {FONT_SIZES, Fonts, height, width} from '../../utils/styles/fontsSizes';
import {Colors, colors} from '../../utils/styles/colors';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {generateUUID, getMessageLevel} from '.';

export const ChatScreen = ({route}) => {
  // const {isComments} = route.params;
  const {goBack} = useNavigation();

  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const {user} = route.params;
  const currentUser = firebase.auth().currentUser;

  const firstPostMessage = data => {
    firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(data);

    setMessages(previousMessages => GiftedChat.append(previousMessages, data));
  };
  useEffect(() => {
    const chatId =
      currentUser.uid > user.id
        ? `${currentUser.uid}-${user.id}`
        : `${user.id}-${currentUser.uid}`;

    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
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
          const modalData = {
            _id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            text: '',
            user: user,
            type: 'question-modal',
          };

          firstPostMessage(data);
          if (user?.message) {
            randomQuestion();
          } else {
            firstPostMessage(modalData);
          }
        } else {
          setMessages(messagesFirestore);
        }
      });

    return () => unsubscribe();
  }, []);
  const chatId =
    currentUser.uid > user.id
      ? `${currentUser.uid}-${user.id}`
      : `${user.id}-${currentUser.uid}`;
  const onSend = useCallback((message = []) => {
    const {_id, createdAt, text} = message[0];
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

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  const randomQuestion = async (isNewModal = true) => {
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
      firstPostMessage(data);
    }
    return availableQuestions[randomIndex];
  };

  const onDelete = async messageId => {
    try {
      await firebase
        .firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .doc(messageId)
        .delete();
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };

  const onUpdateMessage = async messageId => {
    try {
      const newQuestions = await randomQuestion(false);
      if (newQuestions) {
        await firebase
          .firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .doc(messageId)
          .update({text: newQuestions?.text});
      }
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };
  const renderSend = props => {
    return (
      <Send sendButtonProps={{style: {marginHorizontal: 8}}} {...props}>
        <AppText F_SIZE={FONT_SIZES[16]} FONT={Fonts.bold}>
          Send
        </AppText>
      </Send>
    );
  };
  const renderComposer = props => {
    return (
      <Composer
        {...props}
        multiline={false}
        textInputStyle={{
          color: Colors.textPrimary, // Change this to your desired text color
          textAlignVertical: 'center',
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 20,
          paddingTop: 5,
          paddingHorizontal: width * 0.05,
        }}>
        <View style={[{flexDirection: 'row'}]}>
          <InputToolbar
            {...props}
            containerStyle={styles.input}
            primaryStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: height * 0.05,
            }}
          />
        </View>

        <AppView
          onPress={() => {
            randomQuestion();
            if (messages.length === 2) {
              onDelete(messages[0].id);
            }
          }}
          W={58}
          H={52}
          BG={Colors.background}
          BOR={16}
          FullColumnCenter>
          <AppImage SIZE={30} source={ImgSrc.message} />
        </AppView>
      </View>
    );
  };
  const renderMessage = props => {
    // console.log(currentUser.uid);
    // console.log(props.currentMessage?.user);
    return (
      <>
        {props?.currentMessage?.type === 'post' && (
          <>
            <Text style={styles.matchText}>
              You matched with {user?.displayName} !
            </Text>
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>
                {props.currentMessage?.data?.prompt}
              </Text>
              <Text style={styles.promptText}>Liked your prompt</Text>

              {user?.message && (
                <View style={{width: '80%', marginBottom: 20}}>
                  <View style={styles.responseBox}>
                    <Text style={styles.response}>{user?.message}</Text>
                  </View>
                  <View style={styles.triangleRight} />
                </View>
              )}
            </View>
          </>
        )}

        {props?.currentMessage?.type === 'question' && (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {props?.currentMessage?.text}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onUpdateMessage(props.currentMessage?.id);
              }}
              style={styles.changeButton}>
              <AppImage source={ImgSrc.reload} />
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
            <AbsoluteView B={10} R={10}>
              <AppView
                onPress={() => {
                  onDelete(props?.currentMessage?.id);
                }}
                FullRowCenter>
                <AppImage SIZE={14} MX={5} source={ImgSrc.stop} />
                <AppText F_SIZE={13} C={Colors.background}>
                  End
                </AppText>
              </AppView>
            </AbsoluteView>
          </View>
        )}
        {props?.currentMessage?.type === 'question-modal' && !user?.message && (
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
                  onDelete(props?.currentMessage?.id);
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
                  onDelete(props?.currentMessage?.id);
                }}
              />
            </AppView>
          </View>
        )}
        {props?.currentMessage?.type === 'chat' &&
          currentUser.uid === props.currentMessage?.user?.id && (
            <View
              style={{
                maxWidth: '60%',
                overflow: 'visible',
                marginVertical: 20,
                marginLeft: 20,
                alignSelf: 'flex-start',
              }}>
              <View style={styles.responseBox}>
                <Text style={styles.response}>
                  {' '}
                  {props.currentMessage.text}
                </Text>
              </View>

              <View style={styles.triangleRight} />
            </View>
          )}
        {props?.currentMessage?.type === 'chat' &&
          currentUser.uid !== props.currentMessage?.user?.id && (
            <View
              style={{
                maxWidth: '60%',
                marginVertical: 20,
                overflow: 'visible',
                marginRight: 20,
                alignSelf: 'flex-end',
              }}>
              <View
                style={[styles.responseBox, {backgroundColor: Colors.boxbg}]}>
                <Text style={[styles.response, {color: Colors.textPrimary}]}>
                  {props.currentMessage.text}
                </Text>
              </View>

              <View style={[styles.triangleRight1]} />
            </View>
          )}
      </>
    );
  };
  if (isLoading) {
    return (
      <AppView FullRowCenter>
        <ActivityIndicator />
      </AppView>
    );
  }
  return (
    <FlexSafeView>
      <AppView activeOpacity={1} PX={20} BG="transparent" RowSpacBtw>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <AppImage source={ImgSrc.backicon} SIZE={20} BG="transparent" />
          </TouchableOpacity>
          <AppImage ML={30} source={{uri: user?.image}} SIZE={45} BOR={50} />
          <Text style={styles.username}>{user?.displayName}</Text>
        </View>
        <Image source={ImgSrc.threeDots} style={{width: 3}} />
      </AppView>
      <GiftedChat
        messages={messages}
        onSend={text => {
          onSend(text);
        }}
        // renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderMessage={renderMessage}
        renderSend={renderSend}
        renderComposer={renderComposer}
      />

      {/* <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderCustomView={i => {
          console.log(i.currentMessage.text);
        }}
        user={{
          _id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        }}
      /> */}

      {/* <AppView activeOpacity={1} PX={20} PT={15} BG="transparent" RowSpacBtw>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <AppImage source={ImgSrc.backicon} SIZE={20} BG="transparent" />
          </TouchableOpacity>
          <AppImage ML={30} source={{uri: ImgSrc.girl}} SIZE={45} BOR={50} />
          <Text style={styles.username}>Kendall</Text>
        </View>
        <Image source={ImgSrc.threeDots} style={{width: 3}} />
      </AppView>

      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        style={styles.container}>
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              If you stood on Mars in normal clothes, your blood would start to
              boil and you would die.
            </Text>
            <Text style={styles.promptText}>Liked your prompt</Text>

            {isComments && (
              <View style={{width: '80%', marginBottom: 20}}>
                <View style={styles.responseBox}>
                  <Text style={styles.response}>Whoa that's so cool!</Text>
                </View>

                <View style={styles.triangleRight} />
              </View>
            )}
          </View>
          <Text style={styles.matchText}>You matched with Kendall!</Text>
          {isComments ? (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                What are your top 5 travel destinations?
              </Text>
              <TouchableOpacity style={styles.changeButton}>
                <AppImage source={ImgSrc.reload} />
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
              <AbsoluteView B={10} R={10}>
                <AppView FullRowCenter>
                  <AppImage SIZE={14} MX={5} source={ImgSrc.stop} />
                  <AppText F_SIZE={13} C={Colors.background}>
                    End{' '}
                  </AppText>
                </AppView>
              </AbsoluteView>
            </View>
          ) : (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Start with a question? </Text>

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
                />
              </AppView>
            </View>
          )}
          <View
            style={{
              width: '60%',
              overflow: 'visible',
              marginLeft: 20,
            }}>
            <View style={styles.responseBox}>
              <Text style={styles.response}>I know right. So random</Text>
            </View>

            <View style={styles.triangleRight} />
          </View>
          <View
            style={{
              width: '60%',
              marginVertical: 20,
              overflow: 'visible',
              marginRight: 20,
              alignSelf: 'flex-end',
            }}>
            <View style={[styles.responseBox, {backgroundColor: Colors.boxbg}]}>
              <Text style={[styles.response, {color: Colors.textPrimary}]}>
                Haha which college are you in?
              </Text>
            </View>

            <View style={[styles.triangleRight1]} />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor="#888"
        />
        <AppView W={58} H={52} BG={Colors.background} BOR={16} FullColumnCenter>
          <AppImage SIZE={30} source={ImgSrc.message} />
        </AppView>
      </View> */}
    </FlexSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1a1a1a',
    padding: 16,
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
    fontWeight: '700',
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
  },
  questionContainer: {
    backgroundColor: Colors.textSecondary,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 30,

    marginBottom: 20,
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

    color: '#fff',
    // marginTop: 16,
    width: '90%',
    fontFamily: Fonts.secondary,
    position: 'relative',
    height: height * 0.06,
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
    borderBottomColor: colors.responseBackground,
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
    borderBottomColor: Colors.boxbg,
    transform: [{rotate: '20deg'}],
    position: 'absolute',
    bottom: -6,
    right: -19,
  },
  responseBox: {
    backgroundColor: colors.responseBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  response: {
    color: colors.responseText,
    fontSize: FONT_SIZES[16],
    fontFamily: Fonts.secondary,
  },
});
