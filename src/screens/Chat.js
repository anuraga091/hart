import {View, Text} from 'react-native';
import React from 'react';
import Footer from '../components/footer';
import {FlexView} from 'react-native-quick-components';

const Chat = () => {
  return (
    <FlexView>
      <Text>Chat</Text>
      <Footer />
    </FlexView>
  );
};

export default Chat;
