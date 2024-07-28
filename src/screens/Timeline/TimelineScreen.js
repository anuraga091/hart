/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppButton, FlexSafeView, FlexView} from 'react-native-quick-components';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';

export const TimelineScreen = () => {
  const {navigate} = useNavigation();
  const [users, setUsers] = useState([]);
  const currentUser = firebase.auth().currentUser;
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList.filter(user => user?.id !== currentUser.uid));
      });

    return () => unsubscribe();
  }, [currentUser.uid]);
  // Level 1 Questions
  const level1Questions = [
    {id: 0, text: "What's your ideal weekend?"},
    {id: 1, text: 'Do you have any pets?'},
    {id: 2, text: "What's your favourite movie or TV show?"},
    {id: 3, text: "What's your go-to comfort food?"},
    {id: 4, text: "Do you enjoy reading? If so, what's your favourite book?"},
    {id: 5, text: 'Have you travelled anywhere interesting recently?'},
    {id: 6, text: "What's your favourite season and why?"},
    {id: 7, text: "What's your favourite hobby?"},
    {id: 8, text: "What's your dream vacation destination?"},
    {id: 9, text: 'What kind of music do you listen to?'},
    {id: 10, text: 'Do you play any sports or enjoy watching them?'},
    {id: 11, text: "What's your favourite type of cuisine?"},
    {id: 12, text: 'Are you a beach or a mountain person?'},
    {id: 13, text: "What's the weirdest food you've ever tried?"},
    {
      id: 14,
      text: 'If you could be any character from a book or movie, who would you be?',
    },
    {
      id: 15,
      text: 'If you could time travel to any period in history, when would you go and why?',
    },
    {id: 16, text: 'What are your top 5 travel destinations?'},
    {
      id: 17,
      text: 'If you had to live in one place for the rest of your life, where would it be?',
    },
    {id: 18, text: 'As a kid, what was your dream job?'},
    {id: 19, text: 'What do you do on the weekends?'},
    {id: 20, text: "What's your biggest pet peeve?"},
    {id: 21, text: 'Are you into books more or movies?'},
    {id: 22, text: 'If you had $1 Million - what would you do?'},
    {id: 23, text: "What's your #1 goal this year?"},
    {
      id: 24,
      text: "You've deleted insta for a week - how you spending your time?",
    },
    {id: 25, text: "What's the nicest thing someone's said to you?"},
    {id: 26, text: "What's the weirdest thing someone's said to you?"},
    {id: 27, text: "What's a song that always gets you in a good mood?"},
  ];

  // Level 2 Questions
  const level2Questions = [
    {id: 0, text: 'What inspires you the most in life?'},
    {id: 1, text: 'Do you have a hidden talent or something unique about you?'},
    {id: 2, text: "What's a goal you're currently working towards?"},
    {id: 3, text: "What's a memorable moment from your childhood?"},
    {id: 4, text: 'Have you ever been to any concerts?'},
    {id: 5, text: "What's one thing you're really passionate about?"},
    {
      id: 6,
      text: 'If you could have dinner with any person, dead or alive, who would it be and why?',
    },
    {id: 7, text: "What's the best piece of advice you've ever received?"},
    {
      id: 8,
      text: 'If you could learn a new skill instantly, what would it be?',
    },
    {id: 9, text: "What's something you're really proud of?"},
    {
      id: 10,
      text: "What's something you've always wanted to try but haven't yet?",
    },
    {
      id: 11,
      text: "What's the most interesting thing you've learned recently?",
    },
    {
      id: 12,
      text: 'If you could swap lives with someone for a day, who would it be?',
    },
    {id: 13, text: 'What would be the most embarrassing moment of your life?'},
    {
      id: 14,
      text: 'If you could relive any day of your life, which day would you choose and why?',
    },
    {
      id: 15,
      text: 'If you could have a themed party, what theme would you choose?',
    },
    {id: 16, text: 'Do you have a favourite quote or saying?'},
    {id: 17, text: "What's one thing you couldn't live without?"},
    {id: 18, text: "What's your biggest date fail?"},
    {id: 19, text: "What's something your life would be incomplete without?"},
    {id: 20, text: 'Is there a social cause you care about?'},
    {id: 21, text: 'What’s something you know everything about?'},
    {id: 22, text: 'Have you dated anyone before?'},
  ];

  // Level 3 Questions
  const level3Questions = [
    {
      id: 0,
      text: "What's been the biggest challenge in your life and how did you overcome it?",
    },
    {
      id: 1,
      text: "What's the most significant change you've made in your life recently?",
    },
    {id: 2, text: 'How do you define success and happiness?'},
    {id: 3, text: "What's a passion project you've been wanting to start?"},
    {
      id: 4,
      text: 'If you could meet your younger self, what advice would you give?',
    },
    {id: 5, text: "What's your favorite coffee shop or cafe in town?"},
    {id: 6, text: 'What makes you the happiest in life?'},
    {id: 7, text: "What's your biggest fear in life?"},
    {id: 8, text: 'What drives you to work hard?'},
    {id: 9, text: 'Is there anything you want to change from your past?'},
    {id: 10, text: 'Do you have any regrets in life?'},
  ];

  const handleUserPress = async user => {
    navigate('LikedScreen', {isComments: user?.message ? true : false, user});

    // try {
    //   const questionsCollection = firebase
    //     .firestore()
    //     .collection('questions')
    //     .doc('level3')
    //     .collection('level3Questions');

    //   for (const question of level3Questions) {
    //     await questionsCollection.add(question);
    //   }

    //   console.log('Questions stored successfully!');
    // } catch (error) {
    //   console.error('Error storing questions: ', error);
    // }
  };

  async function fetchQuestions() {
    console.log('first');
    try {
      // const documentSnapshot = await firebase
      //   .firestore()
      //   .collection('questions')
      //   // .doc('level1')
      //   .get();

      const data = await firebase
        .firestore()
        .collection('questions')
        .doc('level1')
        .collection('level1Questions')
        .get()
        .then(querySnapshot => {
          // .onSnapshot(querySnapshot => {
          const usersList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          // console.log(usersList);
        });

      // console.log(documentSnapshot.docs[0].data());
      // if (documentSnapshot.exists) {
      //   const data = documentSnapshot.data();
      //   const questions = data.questions;

      //   console.log('Fetched questions:', questions);
      //   // You can now use the questions array as needed
      // } else {
      //   console.log('No such document!');
      // }
    } catch (error) {
      console.error('Error fetching questions: ', error);
    }
  }
  useEffect(() => {
    fetchQuestions();
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: '#9d4146ff',
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 8,
      }}
      onPress={() => handleUserPress(item)}>
      <Text style={{color: 'white', fontSize: 30}}>{item.displayName}</Text>
      <Text style={{color: 'white', fontSize: 10}}>{item?.message}</Text>
    </TouchableOpacity>
  );

  return (
    <FlexSafeView>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppButton
          title="With Comments"
          center
          onPress={() => {
            navigate('LikedScreen', {isComments: true});
          }}
        />
        <AppButton
          MY={40}
          onPress={() => {
            navigate('LikedScreen', {isComments: false});
          }}
          title="Without Comments"
        />
      </View> */}
    </FlexSafeView>
  );
};
