/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  AbsoluteView,
  AppButton,
  AppImage,
  AppText,
  AppView,
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
} from 'react-native';
import {ImgSrc} from '../../utils/ImgSrc';
import {FONT_SIZES, Fonts} from '../../utils/styles/fontsSizes';
import {Colors, colors} from '../../utils/styles/colors';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';

export const ChatScreen = ({route}) => {
  // const {isComments} = route.params;
  const {goBack} = useNavigation();

  const [messages, setMessages] = useState([]);
  const {user} = route.params;
  const isComments = user?.messages;
  const currentUser = firebase.auth().currentUser;

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
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
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

        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    const chatId =
      currentUser.uid > user.id
        ? `${currentUser.uid}-${user.id}`
        : `${user.id}-${currentUser.uid}`;

    const {_id, createdAt, text, user: messageUser} = messages[0];
    firebase
      .firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        _id,
        createdAt,
        text,
        user: messageUser,
      });
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <FlexView PY={40}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser.uid,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        }}
      />

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
    </FlexView>
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
    padding: 12,
    paddingLeft: 18,
    color: '#fff',
    // marginTop: 16,
    width: '80%',
    fontFamily: Fonts.secondary,
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
