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
import Footer from '../components/footer';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import urls from '../utils/urls';
import {useNavigation} from '@react-navigation/native';
import {calculateAge} from '../utils/constants';

const ViewUserScreen = () => {
  const [userData, setUserData] = useState([]);
  const [img1, setImg1] = useState(undefined);
  const [img2, setImg2] = useState(undefined);
  const [img3, setImg3] = useState(undefined);
  const [img4, setImg4] = useState(undefined);
  const [prompts, setPrompts] = useState({});
  const [age, setAge] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const userId = auth().currentUser.uid;
    const idToken = auth().currentUser.getIdToken();

    axios
      .get(`${urls.PROD_URL}/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data.profilePictures.length > 0) {
          setImg1(res.data.profilePictures[0]);
          setImg2(res.data.profilePictures[1]);
          setImg3(res.data.profilePictures[2]);
          setImg4(res.data.profilePictures[3]);
        }
        const filteredPrompt = filterNonEmptyValues(res.data.prompts);
        setPrompts(filteredPrompt);
        const age = calculateAge(res.data.dateOfBirth);
        setAge(age);

        setUserData(res.data);
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

  const handleClose = () => {
    navigation.navigate('About-User');
  };

  function filterNonEmptyValues(obj) {
    let result = {};

    Object.entries(obj).forEach(([category, prompts]) => {
      if (typeof prompts === 'object') {
        Object.entries(prompts).forEach(([key, value]) => {
          if (value !== '') {
            result[key] = value; // Directly use key without prefix
          }
        });
      }
    });

    return result;
  }

  return (
    <View style={styles.homepage}>
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
            <Text style={styles.name}>{userData.name}</Text>
            <Image
              style={styles.returnImg}
              resizeMode="cover"
              source={require('../../assets/return.png')}
            />
          </View>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{uri: `${img1}`}}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>{Object.keys(prompts)[0]}</Text>
          <Text style={styles.replies}>{Object.values(prompts)[0]}</Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require('../../assets/like-button.png')}
          />
        </View>

        <View style={styles.basicDetailView}>
          <Text style={styles.basicDetailText}> {age} </Text>
          <Text style={styles.line}>|</Text>
          <Text style={styles.basicDetailText}> {userData.gender}</Text>
          <Text style={styles.line}>|</Text>
          <View style={styles.location}>
            <Image
              style={styles.locationPin}
              resizeMode="cover"
              source={require('../../assets/location-pin.png')}
            />
            <Text style={styles.locationText}>
              {' '}
              {userData.location?.locality}{' '}
            </Text>
          </View>

          <Text style={styles.line}>|</Text>
          <Text style={styles.basicDetailText}>{userData.height}</Text>
        </View>

        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{uri: `${img2}`}}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>{Object.keys(prompts)[1]}</Text>
          <Text style={styles.replies}>{Object.values(prompts)[1]}</Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require('../../assets/like-button.png')}
          />
        </View>

        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{uri: `${img3}`}}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>{Object.keys(prompts)[2]}</Text>
          <Text style={styles.replies}>{Object.values(prompts)[2]}</Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require('../../assets/like-button.png')}
          />
        </View>

        <View style={styles.imgView4}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{uri: `${img4}`}}
          />
        </View>

        {/* <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button} onPress={handleRemove}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={handleReport}>
                    <Text style={styles.removeText}>Report</Text>
                </TouchableOpacity>
            </View>
         */}
      </ScrollView>
      <TouchableOpacity style={styles.crossButton} onPress={handleClose}>
        <Image
          source={require('../../assets/remove-button.png')} // Replace with your cross icon image path
          style={styles.crossIcon}
        />
      </TouchableOpacity>
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
  },
  imgView: {
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20,
  },
  imgView4: {
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 100,
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
  view3: {
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'solid',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#272727',
    marginBottom: 100,
  },
  crossButton: {
    position: 'absolute',
    bottom: 80, // Position from the bottom of the container
    left: 10, // Position from the left of the container
    width: 70, // Width of the cross button
    height: 70, // Height of the cross button
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure the button is above the ScrollView content
  },
  crossIcon: {
    width: '100%', // You can adjust as per your icon's aspect ratio
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ViewUserScreen;
