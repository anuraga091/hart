/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppImage,
  AppView,
  FlexSafeView,
  FlexView,
} from 'react-native-quick-components';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Fonts, height} from '../../utils/styles/fontsSizes';
import {LessBackIcon, TickIcon} from '../../utils/assetComp/IconComp';
import {sendNotification} from '../../notification/notify';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

export const TimelineScreen = () => {
  const {reset, navigate} = useNavigation();
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

  const handleUserPress = async user => {
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    //   importance: AndroidImportance.HIGH, // Ensure HIGH importance
    //   visibility: AndroidVisibility.PUBLIC,
    // });

    // //Display a notification
    // notifee.displayNotification({
    //   title: `<p style="font-family: 'LibreBaskerville-Bold';"><b>gvjhcjfc"</span></p></b></p>`,
    //   body: 'fcccyt',
    //   android: {
    //     channelId,
    //     color: '#F1DEAC',
    //     sound: 'default',
    //     smallIcon: 'ic_notification',
    //   },
    // });
    // sendNotification({
    //   title: 'Abhaya',
    //   fcmToken:
    //     'cGe24ktGSiCB2Z_eiUfhMf:APA91bHZO9QEc4rR5pT8UhBCGn18fkqsBeYh-Kp94nunf9Wcr0y9CZxFxdJjmk7t-7_IZ7XXCRz9mMSX_Njux2Zx9-joTChkamIDcdvwHY9YRmWLYayygHf4tXDpX25tUmnwpvh7sAfC',
    // });
    navigate('LikedScreen', {isComments: user?.message ? true : false, user});
  };

  async function fetchQuestions() {
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
        backgroundColor: '#9d46ff91',
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 8,
      }}
      onPress={() => handleUserPress(item)}>
      <AppView disabled style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppImage source={{uri: item?.image}} BOR={50} SIZE={60} />
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            marginLeft: 20,
            fontFamily: Fonts.bold,
          }}>
          {item?.displayName}
        </Text>
      </AppView>
      <Text style={{color: 'white', fontSize: 10, fontFamily: Fonts.bold}}>
        {item?.message}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlexSafeView>
      {/* <TickIcon />
      <LessBackIcon /> */}

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <AppButton
        title="Logout"
        W={'90%'}
        FONT={Fonts.bold}
        center
        H={60}
        onPress={() => {
          auth().signOut();
          reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }}
      />
    </FlexSafeView>
  );
};
