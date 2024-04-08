import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import Footer from '../components/footer'
import { useNavigation } from '@react-navigation/native'; 
import { connect} from 'react-redux';
import { addBasicDetail, logout } from '../redux/reducer/basicDetailsSlice';
import auth from '@react-native-firebase/auth';
import { setAuthentication, setOnboardingCompletion } from '../redux/slice/userSlice';



const AboutUser = ({data, addBasicDetail, logout, setOnboardingCompletion, setAuthentication}) => {
    const navigation = useNavigation();
    const [openFilter, setOpenFilter] = useState(false)
    const [profilePicture, setProfilePicture] = useState(data?.basicDetails?.profilePictures?.length > 0 ? data?.basicDetails?.profilePictures[0] : null)
    const [genderPreference, setGenderPreference] = useState(data?.basicDetails?.interestedIn || null)
    const [heightPreference, setHeightPreference] = useState('');
    const [agePreference, setAgePreference] = useState('');
    const [distancePreference, setDistancePreference] = useState('');

    const handleLogout = async () => {
        // Handle logout
        try {
            await auth().signOut();

            
            setOnboardingCompletion(false)
            setAuthentication(false)
            logout()
            console.log('User signed out!');

            navigation.navigate('IntroPage1');


            // Navigate to the login screen or update the state as needed
        } catch (error) {
        console.error(error);
        // Handle errors here
        }
    };

    const onAuthStateChanged = (user) => {
        if (!user) {
          // User is logged out
            console.log('No user logged in');
            
            setOnboardingCompletion(false)
            setAuthentication(false)
            logout()
            navigation.navigate('IntroPage1');

          // Navigate to login or update state
        }
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const handleOpenFilters = () => {
        setOpenFilter(true)
    }

    const handleBack = () => {
        if(openFilter){
            setOpenFilter(false)
        }else{
            navigation.goBack()
        }

    }

    const updateInterestPreference = async () => {
        const idToken = await auth().currentUser.getIdToken();
        const updatedInterest = {
            interestedIn: genderPreference
        }

        await axios.post(`${urls.PROD_URL}/user`,
        {
            
            firebaseUid: data.basicDetails.firebaseUid,
            phone: data.basicDetails.phone,
            interestedIn: genderPreference,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            
            addBasicDetail({interestedIn: genderPreference});
            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        })
    }

    const updateAgePreference = async () => {
        const idToken = await auth().currentUser.getIdToken();

        await axios.post(`${urls.PROD_URL}/user`,
        {
            
            firebaseUid: data.basicDetails.firebaseUid,
            phone: data.basicDetails.phone,
            preferences: {
                ageRange: {
                    min: Number,
                    max: Number
                },
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            //navigation.navigate("About-1");
            //setOnboardingCompletion(true)
            //setOpenPhotoRoute(true)
            //setBasicDetail(basic_details)
            addBasicDetail({
                preferences: {
                    ageRange: {
                        min: Number,
                        max: Number
                    },
                }
            });
            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        })
    }

    const updateDistancePreference = async () => {
        const idToken = await auth().currentUser.getIdToken();

        await axios.post(`${urls.PROD_URL}/user`,
        {
            
            firebaseUid: data.firebaseUid,
            phone: data.phone,
            preferences: {
                distance: distancePreference
            },
            
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            addBasicDetail({
                preferences: {
                    distance: distancePreference
                },
            });
            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        })
    }

    const updateHeightPreference = async () => {
        const idToken = await auth().currentUser.getIdToken();

        await axios.post(`${urls.PROD_URL}/user`,
        {
           
            firebaseUid: data.firebaseUid,
            phone: data.phone,
            preferences: {
                height: {
                    min: String,
                    max: String
                }
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            
            addBasicDetail({
                preferences: {
                    height: {
                        min: String,
                        max: String
                    }
                }
            });
            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        })
    }

    const viewProfile = () => {
        navigation.navigate('ViewProfile')
    }


  return (
    <View style={styles.container}>
        
        <ScrollView >
            <Image
                style={[
                styles.background1,
                styles.background11,
                ]}
                resizeMode="cover"
                source={require("../../assets/background1.png")}
            />
            <Image
                style={[
                styles.background2,
                styles.background11,
                ]}
                resizeMode="cover"
                source={require("../../assets/background1.png")}
            />
            <TouchableOpacity onPress={() => handleBack()} style={styles.backButton}>
                <Image
                    resizeMode="cover" 
                    style={styles.backImg}
                    source={require("../../assets/back.png")}
                />
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profilePicture }} // Replace with your image URI
                    style={styles.profileImage}

                />
                <View style={styles.profileTexts}>
                    <Text style={styles.profileName}>{data?.basicDetails?.name}</Text>
                    <TouchableOpacity onPress={() => viewProfile()}>
                        <Text style={styles.viewProfile}>View profile →</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            {
              !openFilter ?
            
                <>
                
                    <View style={styles.settingsSection}>
                        <TouchableOpacity /*onPress={handleVerifyAccount}*/ style={styles.settingItem}>
                            <View style={styles.setting}>
                                <Text style={styles.settingsTitle}>Settings</Text>
                                <Text style={styles.settingsTitleSecond}>Next update, promise!</Text>
                            </View>
                            <Image
                                resizeMode="cover" 
                                style={styles.settingImg}
                                source={require("../../assets/settings.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#303030', borderBottomWidth: 1 }} />

                    <View style={styles.comingSoonSection}>
                        <TouchableOpacity onPress={handleOpenFilters} style={styles.comingSoonItem}>
                            <Text style={styles.comingSoonTitle}>Dating Filters</Text>

                            {/* <View style={styles.filter}>
                                <Text style={styles.filterTitleSecond}>Next update, promise!</Text>
                            </View> */}
                            <Image
                                resizeMode="cover" 
                                style={styles.comingSoonImg}
                                source={require("../../assets/filters.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#303030', borderBottomWidth: 1}} />

                    <View style={styles.comingSoonSection}>
                        <TouchableOpacity /*onPress={handleVerifyAccount}*/ style={styles.comingSoonItem}>
                            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
                            <Image
                                resizeMode="cover" 
                                style={styles.comingSoonImg}
                                source={require("../../assets/coming-soon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonDiv}>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <Image
                                source={require('../../assets/logout.png')} // Replace with your image URI
                                style={styles.logoutImage}
                            /> 
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                </>
              :
              <View style={styles.datingPreferences}>
                    <Text style={styles.datingPreferencesTitle}>Dating Preferences</Text>

                    <View style={styles.filterSection}>
                        <TouchableOpacity onPress={updateInterestPreference} style={styles.filterItem}>
                            <View style={styles.filter}>
                                <Text style={styles.filterTitle}>Interested in</Text>
                                <Text style={styles.filterTitleSecond}>{genderPreference}</Text>
                            </View>
                            <Image
                                resizeMode="cover" 
                                style={styles.filterImg}
                                source={require("../../assets/yellow-arrow.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#303030', borderBottomWidth: 1}} />

                    <View style={styles.filterSection}>
                        <TouchableOpacity onPress={updateAgePreference} style={styles.filterItem}>
                            <View style={styles.filter}>
                                <Text style={styles.filterTitle}>Age</Text>
                                <Text style={styles.filterTitleSecond}>18-20</Text>
                            </View>
                            <Image
                                resizeMode="cover" 
                                style={styles.filterImg}
                                source={require("../../assets/yellow-arrow.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#303030', borderBottomWidth: 1}} />

                    <View style={styles.filterSection}>
                        <TouchableOpacity onPress={updateDistancePreference} style={styles.filterItem}>
                            <View style={styles.filter}>
                                <Text style={styles.filterTitle}>Distance</Text>
                                <Text style={styles.filterTitleSecond}>Within 15 kms</Text>
                            </View>
                            <Image
                                resizeMode="cover" 
                                style={styles.filterImg}
                                source={require("../../assets/yellow-arrow.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: '#303030', borderBottomWidth: 1}} />

                    <View style={styles.filterSection}>
                        <TouchableOpacity onPress={updateHeightPreference} style={styles.filterItem}>
                            <View style={styles.filter}>
                                <Text style={styles.filterTitle}>Height</Text>
                                <Text style={styles.filterTitleSecond}>5’1 to 5’4</Text>
                            </View>
                            <Image
                                resizeMode="cover" 
                                style={styles.filterImg}
                                source={require("../../assets/yellow-arrow.png")}
                            />
                            
                        </TouchableOpacity>
                    </View>

              </View>
            }
        </ScrollView>
        <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: "100%",
        height: '100%',
        overflow: "hidden",
        //paddingLeft: 20,
        //paddingTop: 40
        position: 'relative' // Assuming a black background as in the image
    },
    background11: {
        opacity: 1,
        height: 500,
        width: 400,
        position: "absolute",
    },
    background2: {
        top: 500,
        //width: 10,
    },
    backButton: {
        paddingLeft: 20,
        marginTop: 50
    },
    profileSection: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 40,
        marginBottom: 60
    },
    profileTexts: {
        justifyContent: 'space-evenly',
        marginLeft: 20
    },
    profileName: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'LibreBaskerville-Bold'
    },
    viewProfile: {
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 14,
        color: '#F1DEAC',
    },
    settingsSection: {
        backgroundColor: '#131313',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    settingItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    settingsTitle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'LibreBaskerville-Bold'
    },
    settingsTitleSecond: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontFamily: 'Raleway-SemiBold',
    },
    filterSection: {
        backgroundColor: '#131313',
        width: '100%',
        //marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    filterItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    filterTitle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'LibreBaskerville-Bold'
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
        paddingHorizontal: 30
    },
    comingSoonItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    comingSoonTitle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'LibreBaskerville-Bold'
    },
    fcomingSoonSecond: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontFamily: 'Raleway-SemiBold',
    },
    
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    logoutButton: {
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
        paddingVertical: 10,
      // Style for the logout button
    },
    logoutButtonText: {
        color: '#F1DEAC',
        fontSize: 21,
        fontFamily: 'Raleway-SemiBold',
        marginLeft: 5
      // Style for the logout button text
    },
    logoutImage: {
        width: 40,
        height: 40,
        marginRight: 5
    },
    filterImg: {
        marginTop: 15
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    datingPreferencesTitle: {
        color: '#F1DEAC',
        fontSize: 21, 
        fontFamily: 'LibreBaskerville-Bold',
        marginBottom: 20,
        marginHorizontal: 30
        
    }
    
  });

  const mapStateToProps = (state) => ({
    data: state,
  });
  
  const mapDispatchToProps = {
   addBasicDetail,
   setAuthentication,
   setOnboardingCompletion,
   logout
   //updateBasicDetail
  };

export default connect(mapStateToProps, mapDispatchToProps) (AboutUser)