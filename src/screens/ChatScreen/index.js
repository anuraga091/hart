/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {Composer, Send} from 'react-native-gifted-chat';
import {AppText} from 'react-native-quick-components';
import {Colors} from '../../utils/styles/colors';
import {FONT_SIZES, Fonts, width} from '../../utils/styles/fontsSizes';

export const getMessageLevel = (messageCount, isDoc = true) => {
  if (messageCount <= 80) {
    return isDoc ? 'level1' : 'level1Questions';
  } else if (messageCount > 80 && messageCount <= 250) {
    return isDoc ? 'level2' : 'level2Questions';
  } else {
    return isDoc ? 'level3' : 'level3Questions';
  }
};

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
};
export const firstPostMessage = async ({data, chatId}) => {
  await firebase
    .firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(data);

  // setMessages(previousMessages => GiftedChat.append(previousMessages, data));
};
export const onDelete = async ({messageId, chatId}) => {
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

export const onUpdateMessage = async (messageId, chatId, newQuestions) => {
  try {
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

export const renderSend = props => {
  return (
    <Send
      sendButtonProps={{
        style: {marginHorizontal: 8, marginBottom: -width * 0.0},
      }}
      {...props}>
      <AppText F_SIZE={FONT_SIZES[16]} FONT={Fonts.bold}>
        Send
      </AppText>
    </Send>
  );
};
export const renderComposer = props => {
  return (
    <Composer
      {...props}
      multiline={false}
      composerHeight={width * 0.1}
      textInputStyle={{
        color: Colors.textPrimary, // Change this to your desired text color
        textAlignVertical: 'center',
        fontFamily: Fonts.secondary,
        marginTop: width * 0.02,
      }}
    />
  );
};

export const markLastMessages = messages => {
  // Default all messages to isLast: false
  messages.forEach(msg => (msg.isLast = false));

  // Sort messages by createdAt to ensure they are in chronological order
  messages.sort((a, b) => a.createdAt - b.createdAt);

  let currentUser = null;
  let lastMessageIndex = -1;

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];

    if (message.user.id === currentUser) {
      // If userId is the same as currentUser, update lastMessageIndex
      lastMessageIndex = i;
    } else {
      // Mark the last message of the previous sequence as isLast
      if (currentUser !== null && lastMessageIndex !== -1) {
        messages[lastMessageIndex].isLast = true;
      }
      // Update current user and reset lastMessageIndex
      currentUser = message.user.id;
      lastMessageIndex = i;
    }
  }

  // Mark the last message of the last sequence as isLast
  if (lastMessageIndex !== -1) {
    messages[lastMessageIndex].isLast = true;
  }

  return messages;
};

// Update messages
