import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppImage, AppView, FlexView} from 'react-native-quick-components';
import {BackButtonIcon} from '../../utils/assetComp/IconComp';
import {useNavigation} from '@react-navigation/native';
import {FONT_SIZES, Fonts} from '../../utils/styles/fontsSizes';
import {firebase} from '@react-native-firebase/firestore';
import Footer from '../../components/footer';
import axios from 'axios';
import urls from '../../utils/urls';
export const ChatList = () => {
  const {reset, navigate} = useNavigation();
  const [users, setUsers] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const getLikedList = () => {
    axios
      .get(`${urls.PROD_URL}/user-action/match/${currentUser.uid}`)
      .then(response => {
        // console.log('response', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    getLikedList();
  }, []);
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.card,
        {borderBottomWidth: users.length === index + 1 ? 0 : 1},
      ]}
      onPress={() =>
        navigate('Chat', {
          isComments: item?.message ? true : false,
          user: item?.user,
        })
      }>
      <AppView disabled style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppImage
          source={{uri: item?.user?.profilePictures[0]}}
          BOR={50}
          SIZE={90}
        />
        <AppView disabled ML={20} ColumnCenterStart>
          <Text style={styles.name}>{item?.user?.name}</Text>
          {/* <Text style={styles.description}>{item?.message} hgg</Text> */}
        </AppView>
      </AppView>
    </TouchableOpacity>
  );

  return (
    <FlexView>
      <BackButtonIcon />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
        contentContainerStyle={styles.container}
      />
      <Footer index={3} />
    </FlexView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1a1a1a',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    // marginVertical: 12,
    borderBottomColor: '#303030',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    opacity: 0.87,
    fontFamily: Fonts.primary,
    fontSize: FONT_SIZES[18],
  },
  description: {
    color: '#cccccc',
    fontFamily: Fonts.RalewayRegular,
    fontSize: FONT_SIZES[14],
    paddingTop: 10,
    opacity: 0.6,
  },
});
