import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Footer from '../components/footer';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import urls from '../utils/urls';
import {calculateAge} from '../utils/constants';

const Homepage = ({data}) => {
  const [matches, setMatches] = useState([]); // State to store matches
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const {isAuthenticated, hasCompletedOnboarding} = data.user;

  useEffect(() => {
    if (isAuthenticated && !hasCompletedOnboarding) {
      navigation.navigate('Details');
    }
  }, [isAuthenticated, hasCompletedOnboarding, navigation]);

  useEffect(() => {
    const userId = data.basicDetails.firebaseUid;
    const idToken = auth().currentUser.getIdToken();

    axios
      .get(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/matches/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then(res => {
        console.log(res.data);
        console.log(res.data.matches);
        const matches = res.data.matches;
        setMatches(res.data.matches);
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        setLoading(false);
      });
  }, []);

  const handleAction = async (action, targetFirebaseUid, prompts, reply) => {
    console.log(action, targetFirebaseUid, prompts, reply);

    const idToken = await auth().currentUser.getIdToken();
    const firebaseUid = data.basicDetails.firebaseUid;
    await axios
      .post(
        `${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user-action`,
        {
          actionType: action,
          firebaseUid: firebaseUid,
          targetFirebaseUid: targetFirebaseUid,
          reply: reply || '',
          prompts: prompts || {},
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        if (currentIndex < matches.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        setLoading(false);
      });
  };

  const handleRemove = () => {
    console.log('handle remove clicked');
  };

  return (
    <View style={styles.homepage}>
      {matches.length > 0 &&
      matches[currentIndex]?.profilePictures.length > 0 ? (
        <ScrollView>
          <Image
            style={[styles.background1, styles.background11]}
            resizeMode="cover"
            source={require('../../assets/background1.png')}
          />
          <Image
            style={[styles.background2, styles.background11]}
            resizeMode="cover"
            source={require('../../assets/background1.png')}
          />
          <Image
            style={[styles.background3, styles.background11]}
            resizeMode="cover"
            source={require('../../assets/background1.png')}
          />
          <Image
            style={[styles.background4, styles.background11]}
            resizeMode="cover"
            source={require('../../assets/background1.png')}
          />
          <Image
            style={[styles.background5, styles.background11]}
            resizeMode="cover"
            source={require('../../assets/background1.png')}
          />
          <View style={styles.view1}>
            <View style={styles.header}>
              <Text style={styles.name}>{matches[currentIndex].name}</Text>
              <Image
                style={styles.returnImg}
                resizeMode="cover"
                source={require('../../assets/return.png')}
              />
            </View>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{uri: matches[currentIndex]?.profilePictures[0]}}
            />
          </View>

          <View style={styles.view2}>
            <Text style={styles.yellowPromptText}>
              {Object.keys(matches[currentIndex].prompts)[0]}
            </Text>
            <Text style={styles.replies}>
              {Object.values(matches[currentIndex].prompts)[0]}
            </Text>
            <TouchableOpacity
              onPress={() =>
                handleAction('like', matches[currentIndex].firebaseUid, {
                  [Object.keys(matches[currentIndex].prompts)[0]]:
                    Object.values(matches[currentIndex].prompts)[0],
                })
              }>
              <Image
                style={styles.likebtn}
                resizeMode="cover"
                source={require('../../assets/like-button.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.basicDetailView}>
            <Text style={styles.basicDetailText}>
              {' '}
              {calculateAge(matches[currentIndex].dateOfBirth)}{' '}
            </Text>
            <Text style={styles.line}>|</Text>
            <Text style={styles.basicDetailText}>
              {' '}
              {matches[currentIndex].gender}{' '}
            </Text>
            <Text style={styles.line}>|</Text>
            <View style={styles.location}>
              <Image
                style={styles.locationPin}
                resizeMode="cover"
                source={require('../../assets/location-pin.png')}
              />
              <Text style={styles.locationText}>
                {' '}
                {matches[currentIndex].location?.locality}
              </Text>
            </View>

            <Text style={styles.line}>|</Text>
            <Text style={styles.basicDetailText}>
              {matches[currentIndex].height}
            </Text>
          </View>

          <View style={styles.imgView}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{uri: `${matches[currentIndex]?.profilePictures[1]}`}}
            />
          </View>

          <View style={styles.view2}>
            <Text style={styles.yellowPromptText}>
              {Object.keys(matches[currentIndex].prompts)[1]}
            </Text>
            <Text style={styles.replies}>
              {Object.values(matches[currentIndex].prompts)[1]}
            </Text>
            <TouchableOpacity
              style={styles.likebtn}
              onPress={() =>
                handleAction('like', matches[currentIndex].firebaseUid, {
                  [Object.keys(matches[currentIndex].prompts)[1]]:
                    Object.values(matches[currentIndex].prompts)[1],
                })
              }>
              <Image
                resizeMode="cover"
                source={require('../../assets/like-button.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imgView}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{uri: `${matches[currentIndex]?.profilePictures[2]}`}}
            />
          </View>

          <View style={styles.view2}>
            <Text style={styles.yellowPromptText}>
              {Object.keys(matches[currentIndex].prompts)[2]}
            </Text>
            <Text style={styles.replies}>
              {Object.values(matches[currentIndex].prompts)[2]}
            </Text>
            <TouchableOpacity
              onPress={() =>
                handleAction('like', matches[currentIndex].firebaseUid, {
                  [Object.keys(matches[currentIndex].prompts)[2]]:
                    Object.values(matches[currentIndex].prompts)[2],
                })
              }>
              <Image
                style={styles.likebtn}
                resizeMode="cover"
                source={require('../../assets/like-button.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imgView}>
            <Image
              style={styles.img}
              resizeMode="cover"
              source={{uri: `${matches[currentIndex]?.profilePictures[3]}`}}
            />
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleAction('remove', matches[currentIndex].firebaseUid)
              }>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleAction('report', matches[currentIndex].firebaseUid)
              }>
              <Text style={styles.removeText}>Report</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text>No more matches available.</Text>
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  homepage: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    //paddingTop: 40
    position: 'relative',
  },
  background11: {
    opacity: 1,
    height: 500,
    width: 400,
    position: 'absolute',
  },
  background2: {
    top: 500,
    //width: 10,
  },
  background3: {
    top: 1000,
    //width: 10,
  },
  background4: {
    top: 1500,
    //width: 10,
  },
  background5: {
    top: 2000,
    //width: 10,
  },

  view1: {
    borderRadius: 12,
    backgroundColor: '#272727',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#272727',
    borderRadius: 12,
  },
  returnImg: {},
  name: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 23,
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  view2: {
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#272727',
  },
  yellowPromptText: {
    color: '#F1DEAC',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
  },
  replies: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 22,
    marginTop: 20,
  },
  likebtn: {
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  basicDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#272727',
    marginLeft: 20,
    marginRight: 35,
    padding: 10,
    marginTop: 20,
  },
  basicDetailText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    margin: 10,
  },
  line: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 30,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  locationPin: {
    marginRight: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'Raleway-SemiBold',
    fontSize: 17,
    marginRight: 5,
  },
  imgView: {
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20,
  },

  button: {
    marginTop: 30,
    height: 50,
    width: 230,
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 1.5,
      height: 2,
    },
    borderRadius: 12,
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#f1deac',
  },
  removeText: {
    marginTop: 7,
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 80,
    //justifyContent: 'center'
  },
  background12: {
    opacity: 1,
    height: 500,
    width: 200,
  },
});

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = {
  //addBasicDetail,
  //updateBasicDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
