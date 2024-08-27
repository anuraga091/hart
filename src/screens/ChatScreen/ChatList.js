import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppImage, AppView, FlexView} from 'react-native-quick-components';
import {BackButtonIcon} from '../../utils/assetComp/IconComp';
import {useNavigation} from '@react-navigation/native';
import {FONT_SIZES, Fonts} from '../../utils/styles/fontsSizes';
import {firebase} from '@react-native-firebase/firestore';
import Footer from '../../components/footer';
export const ChatList = () => {
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
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.card,
        {borderBottomWidth: users.length === index + 1 ? 0 : 1},
      ]}
      onPress={() =>
        navigate('LikedScreen', {
          isComments: item?.message ? true : false,
          user: item,
        })
      }>
      <AppView disabled style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppImage source={{uri: item?.image}} BOR={50} SIZE={90} />
        <AppView ML={20} ColumnCenterStart>
          <Text style={styles.name}>{item?.displayName} Kendall</Text>
          <Text style={styles.description}>{item?.message} hgg</Text>
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
        keyExtractor={item => item.id}
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
