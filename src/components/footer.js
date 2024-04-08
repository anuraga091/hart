import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Footer = () => {

    const [activeIndex, setActiveIndex] = useState(1)
    const navigation = useNavigation();

    const handleHomePress = (index) => {
        setActiveIndex(index)
        navigation.navigate('Homepage');
        console.log('Home pressed')
    }

    const handleLikesPress = (index) => {
        setActiveIndex(index)
        navigation.navigate('Like');
        console.log('Favorites pressed')
    }

    const handleChatPress = (index) => {
        setActiveIndex(index)
        navigation.navigate('Chat');
        console.log('Messages pressed')
    }

    const handleAboutPress = (index) => {
        setActiveIndex(index)
        navigation.navigate('About-User');
        console.log('Profile pressed')
    }


  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handleHomePress(1)}>
        <Image source={activeIndex == 1 ? require('../../assets/home.png') : require('../../assets/inactive-home.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLikesPress(2)}>
        <Image source={activeIndex == 2 ? require('../../assets/likes.png') : require('../../assets/inactive-likes.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleChatPress(3)}>
        <Image source={ activeIndex == 3 ? require( '../../assets/chat.png') : require('../../assets/inactive-chat.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAboutPress(4)}>
        <Image source={activeIndex == 4 ? require( '../../assets/about.png') : require('../../assets/inactive-about.png' )} style={styles.icon} />
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
    right: 0
  },
  icon: {
    width: 30, // Replace with the size you want
    height: 30, // Replace with the size you want
    resizeMode: 'contain'
  }
});

export default Footer;
