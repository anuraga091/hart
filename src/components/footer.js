import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer = ({index}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const navigation = useNavigation();

  const handleHomePress = i => {
    setActiveIndex(i);
    navigation.navigate('Homepage');
    console.log('Home pressed');
  };

  const handleLikesPress = i => {
    setActiveIndex(i);
    navigation.navigate('LikedScreen');
    console.log('Favorites pressed');
  };

  const handleChatPress = i => {
    setActiveIndex(i);
    navigation.navigate('ChatList');
    console.log('Messages pressed');
  };

  const handleAboutPress = i => {
    setActiveIndex(i);
    navigation.navigate('About-User');
    console.log('Profile pressed');
  };
  // useEffect(() => {
  //   setActiveIndex(index);
  // }, [index]);

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handleHomePress(1)}>
        <Image
          source={
            index === 1
              ? require('../../assets/home.png')
              : require('../../assets/inactive-home.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLikesPress(2)}>
        <Image
          source={
            index === 2
              ? require('../../assets/likes.png')
              : require('../../assets/inactive-likes.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleChatPress(3)}>
        <Image
          source={
            index === 3
              ? require('../../assets/chat.png')
              : require('../../assets/inactive-chat.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAboutPress(4)}>
        <Image
          source={
            index === 4
              ? require('../../assets/about.png')
              : require('../../assets/inactive-about.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000', // Replace with your footer's background color
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#404040', // Replace with the color you want for the top border
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 30, // Replace with the size you want
    height: 30, // Replace with the size you want
    resizeMode: 'contain',
  },
});

export default Footer;
