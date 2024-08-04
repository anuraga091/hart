import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {BackButtonIcon} from '../../utils/assetComp/IconComp';
import {Colors} from '../../utils/styles/colors';
import {FONT_SIZES, Fonts} from '../../utils/styles/fontsSizes';
import {useNavigation} from '@react-navigation/native';
export const data = [
  {
    id: 1,
    title: 'Safety Scores',
    text1: 'We care about your safety and show it through our actions. ',
    text2: 'Each person gets a safety score. And yes, it’s publicly visible.',
    image: 'content1',
  },
  {
    id: 2,
    title: 'Block Contacts',
    text1: 'Privacy is important.  ',
    text2:
      'So if you don’t want your relatives to find you on this app,you can just block them!',
    image: 'content2',
  },
  {
    id: 3,
    title: 'Personality Matches',
    text1: 'Forget lame matching based on superficial interests. ',
    text2: 'Give a personality test & get tailored suggestions.',
    image: 'content3',
  },
  {
    id: 4,
    title: 'Incognito Mode',
    text1: 'If you’re into spy movies, this one’s for you. ',
    text2:
      'Be visible only to the people you like. Nobody else knows you’re on the app!',
    image: 'content4',
  },
];
export const images = [
  require('../../assets/images/content1.png'),
  require('../../assets/images/content2.png'),
  require('../../assets/images/content3.png'),
  require('../../assets/images/content4.png'),
  // Add more images as needed
];

export const ComingSoon = () => {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(data[count]);
  const {goBack} = useNavigation();
  const handlePress = () => {
    if (count < data.length - 1 && count >= 0) {
      setCurrent(data[count + 1]);
      setCount(count + 1);
    }
    if (count === 3) {
      goBack();
    }
  };

  const handleBack = () => {
    if (count > 0) {
      setCurrent(data[count - 1]);
      setCount(count - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonIcon />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View
            style={[
              styles.imageContainer,
              {transform: [{rotate: count === 0 ? '12deg' : '0deg'}]},
            ]}>
            <Image source={images[count]} style={styles.image} />
          </View>
          <Text style={[styles.title]}>{current.title}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{current.text1}</Text>
            <Text style={styles.text}>{current.text2}</Text>
          </View>
          <View style={styles.progressBar}>
            {data.map((i, k) => {
              return (
                <View
                  key={k}
                  style={[
                    styles.progressBarItem,
                    {
                      backgroundColor:
                        count === k ? Colors.textSecondary : '#343434',
                    },
                  ]}
                />
              );
            })}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>
                {count < data.length - 1 ? 'Next' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    gap: 20,
    marginTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    height: 240,
    width: 128,
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  title: {
    color: Colors.textSecondary, // Adjust to your preferred color
    fontSize: FONT_SIZES[24],
    fontFamily: Fonts.primary,
    marginTop: '5%',
  },
  textContainer: {
    alignItems: 'center',
    width: '70%',
    marginVertical: '4%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    opacity: 0.6,
    fontSize: FONT_SIZES[15],
    transform: [{scale: 0.99}],
    fontFamily: Fonts.RalewayRegular,
    // marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    marginVertical: '8%',
  },
  progressBarItem: {
    width: '23%',
    height: 4,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '70%',
    marginBottom: 40,
    paddingTop: 30,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: '5%',
    alignItems: 'center',
    backgroundColor: Colors.textSecondary, // Adjust to your preferred color
    borderRadius: 8,
  },
  buttonText: {
    fontSize: FONT_SIZES[18],
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 40,
    color: Colors.textSecondary, // Adjust to your preferred color
  },
});
