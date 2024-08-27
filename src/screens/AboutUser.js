import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Footer from '../components/footer';
import {useNavigation} from '@react-navigation/native';
import {connect, useSelector} from 'react-redux';
import {addBasicDetail, logout} from '../redux/reducer/basicDetailsSlice';
import auth from '@react-native-firebase/auth';
import {
  setAuthentication,
  setOnboardingCompletion,
} from '../redux/slice/userSlice';
import {
  BackButtonIcon,
  DeleteIcon,
  EqualizerIcon,
  HeartIcon,
  LogoutIcon,
  RightarrowIcon,
  SettingIcon,
  StarIcon,
} from '../utils/assetComp/IconComp';
import {ImgSrc} from '../utils/assetComp/ImgSrc';
import {AppView} from 'react-native-quick-components';
import {FONT_SIZES, Fonts} from '../utils/styles/fontsSizes';
import {Colors} from '../utils/styles/colors';
import axios from 'axios';
import urls from '../utils/urls';

const AboutUser = ({
  data,
  addBasicDetail,
  logout,
  setOnboardingCompletion,
  setAuthentication,
}) => {
  const navigation = useNavigation();
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const profile = useSelector(state => state.basicDetails);
  // console.log('fff', profile);

  const [profilePicture, setProfilePicture] = useState(
    data?.basicDetails?.profilePictures?.length > 0
      ? data?.basicDetails?.profilePictures[0]
      : null,
  );
  const [genderPreference, setGenderPreference] = useState(
    data?.basicDetails?.interestedIn || null,
  );
  const [heightPreference, setHeightPreference] = useState('');
  const [agePreference, setAgePreference] = useState('');
  const [distancePreference, setDistancePreference] = useState('');

  const handleLogout = async () => {
    // Handle logout
    try {
      await auth().signOut();

      setOnboardingCompletion(false);
      setAuthentication(false);
      logout();
      console.log('User signed out!');

      navigation.navigate('IntroPage1');

      // Navigate to the login screen or update the state as needed
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };

  const onAuthStateChanged = user => {
    if (!user) {
      // User is logged out
      console.log('No user logged in');

      setOnboardingCompletion(false);
      setAuthentication(false);
      logout();
      navigation.navigate('IntroPage1');

      // Navigate to login or update state
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleOpenFilters = () => {
    setOpenFilter(true);
  };

  const handleBack = () => {
    if (openFilter) {
      setOpenFilter(false);
    } else {
      navigation.goBack();
    }
  };

  const updateInterestPreference = async () => {
    navigation.navigate('PreferenceFilter', {type: 'interest'});
    return;
    const idToken = await auth().currentUser.getIdToken();
    const updatedInterest = {
      interestedIn: genderPreference,
    };

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: data.basicDetails.firebaseUid,
          phone: data.basicDetails.phone,
          interestedIn: genderPreference,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        addBasicDetail({interestedIn: genderPreference});
        setLoading(false);
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

  const updateAgePreference = async () => {
    navigation.navigate('PreferenceFilter', {type: 'age'});
    return;
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: data.basicDetails.firebaseUid,
          phone: data.basicDetails.phone,
          preferences: {
            ageRange: {
              min: Number,
              max: Number,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        //navigation.navigate("About-1");
        //setOnboardingCompletion(true)
        //setOpenPhotoRoute(true)
        //setBasicDetail(basic_details)
        addBasicDetail({
          preferences: {
            ageRange: {
              min: Number,
              max: Number,
            },
          },
        });
        setLoading(false);
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

  const updateDistancePreference = async () => {
    navigation.navigate('PreferenceFilter', {type: 'distance'});
    return;
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: data.firebaseUid,
          phone: data.phone,
          preferences: {
            distance: distancePreference,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        addBasicDetail({
          preferences: {
            distance: distancePreference,
          },
        });
        setLoading(false);
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

  const updateHeightPreference = async () => {
    navigation.navigate('PreferenceFilter', {type: 'height'});
    return;
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: data.firebaseUid,
          phone: data.phone,
          preferences: {
            height: {
              min: String,
              max: String,
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        addBasicDetail({
          preferences: {
            height: {
              min: String,
              max: String,
            },
          },
        });
        setLoading(false);
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

  const viewProfile = () => {
    navigation.navigate('ViewProfile');
  };
  return (
    <View style={styles.container}>
      <BackButtonIcon
        onPress={() => {
          handleBack();
        }}
      />

      <ScrollView contentContainerStyle={{paddingBottom: 150}}>
        <View style={styles.profileSection}>
          <Image
            source={{uri: profilePicture}} // Replace with your image URI
            style={styles.profileImage}
          />
          <View style={styles.profileTexts}>
            <Text style={styles.profileName}>{data?.basicDetails?.name}</Text>
            <AppView
              FullRowCenter
              // nav.navigate('Prompts')
              onPress={() => navigation.navigate('EditProfileScreen')}>
              <Text style={styles.viewProfile}>Edit profile </Text>
              <RightarrowIcon size={20} />
            </AppView>
          </View>
        </View>
        {!openFilter ? (
          <>
            <View style={styles.settingsSection}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.setting}>
                  <Text style={styles.settingsTitle}>Settings</Text>
                  <Text style={styles.settingsTitleSecond}>
                    Next update, promise!
                  </Text>
                </View>
                <SettingIcon size={32} />
              </TouchableOpacity>
            </View>
            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.settingsSection}>
              <TouchableOpacity
                onPress={handleOpenFilters}
                style={styles.comingSoonItem}>
                <Text style={styles.comingSoonTitle}>Dating Filters</Text>

                {/* <View style={styles.filter}>
                                <Text style={styles.filterTitleSecond}>Next update, promise!</Text>
                            </View> */}
                <EqualizerIcon size={32} />
              </TouchableOpacity>
            </View>
            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.settingsSection}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ComingSoon')}
                style={styles.comingSoonItem}>
                <Text style={styles.comingSoonTitle}>Coming Soon</Text>
                <StarIcon size={38} />
              </TouchableOpacity>
            </View>

            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.settingsSection}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreditScreen')}
                style={styles.comingSoonItem}>
                <Text style={styles.comingSoonTitle}>Credits</Text>
                <HeartIcon size={32} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonDiv}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <LogoutIcon size={23} />
                <Text style={[styles.logoutButtonText, {color: Colors.dark}]}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.deleteButton}>
                <DeleteIcon size={20} />

                <Text style={styles.logoutButtonText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.datingPreferences}>
            <Text style={styles.datingPreferencesTitle}>
              Dating Preferences
            </Text>

            <View style={styles.filterSection}>
              <TouchableOpacity
                onPress={updateInterestPreference}
                style={styles.filterItem}>
                <View style={styles.filter}>
                  <Text style={styles.filterTitle}>Interested in</Text>
                  <Text style={styles.filterTitleSecond}>
                    {genderPreference}
                  </Text>
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.filterImg}
                  source={require('../../assets/yellow-arrow.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.filterSection}>
              <TouchableOpacity
                onPress={updateAgePreference}
                style={styles.filterItem}>
                <View style={styles.filter}>
                  <Text style={styles.filterTitle}>Age</Text>
                  <Text style={styles.filterTitleSecond}>
                    {profile?.preferences?.ageRange?.min} -
                    {' ' + profile?.preferences?.ageRange?.max}
                  </Text>
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.filterImg}
                  source={require('../../assets/yellow-arrow.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.filterSection}>
              <TouchableOpacity
                onPress={updateDistancePreference}
                style={styles.filterItem}>
                <View style={styles.filter}>
                  <Text style={styles.filterTitle}>Distance</Text>
                  <Text style={styles.filterTitleSecond}>
                    Within {profile?.preferences?.distance} kms
                  </Text>
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.filterImg}
                  source={require('../../assets/yellow-arrow.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{borderBottomColor: '#303030', borderBottomWidth: 1}}
            />

            <View style={styles.filterSection}>
              <TouchableOpacity
                onPress={updateHeightPreference}
                style={styles.filterItem}>
                <View style={styles.filter}>
                  <Text style={styles.filterTitle}>Height</Text>
                  <Text style={styles.filterTitleSecond}>
                    {profile?.preferences?.height?.min} or{' '}
                    {profile?.preferences?.height?.max}
                  </Text>
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.filterImg}
                  source={require('../../assets/yellow-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <Footer index={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: '8%',
    marginBottom: '12%',
  },
  profileTexts: {
    justifyContent: 'space-evenly',
    marginLeft: 20,
  },
  profileName: {
    color: Colors.white,
    fontSize: FONT_SIZES[27],
    fontFamily: 'LibreBaskerville-Bold',
  },
  viewProfile: {
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: FONT_SIZES[14],
    color: '#F1DEAC',
    paddingRight: 5,
    opacity: 0.8,
  },
  settingsSection: {
    backgroundColor: Colors.darkGray1,
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  settingItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  settingsTitle: {
    color: Colors.textPrimary,
    fontSize: FONT_SIZES[19],
    fontFamily: 'LibreBaskerville-Bold',
  },
  settingsTitleSecond: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: FONT_SIZES[14],
    fontFamily: Fonts.RalewayRegular,
  },
  filterSection: {
    backgroundColor: '#131313',
    width: '100%',
    //marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterTitle: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'LibreBaskerville-Bold',
  },
  filterTitleSecond: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },
  comingSoonSection: {
    backgroundColor: '#131313',
    width: '100%',
    //marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  comingSoonItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  comingSoonTitle: {
    color: Colors.textPrimary,
    fontSize: FONT_SIZES[18],
    fontFamily: 'LibreBaskerville-Bold',
    paddingTop: 5,
  },
  fcomingSoonSecond: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },

  buttonDiv: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  logoutButton: {
    width: '70%',
    backgroundColor: Colors.textSecondary,

    borderRadius: 12,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    // Style for the logout button
  },
  deleteButton: {
    width: '70%',
    backgroundColor: '#272727',

    borderRadius: 12,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    // Style for the logout button
  },

  logoutButtonText: {
    color: Colors.white,
    fontSize: FONT_SIZES[18],
    fontFamily: Fonts.bold,
    marginLeft: 15,

    // Style for the logout button text
  },
  logoutImage: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  filterImg: {
    marginTop: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  datingPreferencesTitle: {
    color: '#F1DEAC',
    fontSize: 21,
    fontFamily: 'LibreBaskerville-Bold',
    marginBottom: 20,
    marginHorizontal: 30,
  },
});

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = {
  addBasicDetail,
  setAuthentication,
  setOnboardingCompletion,
  logout,
  //updateBasicDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUser);
