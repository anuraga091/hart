import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppText, AppView} from 'react-native-quick-components';
import {
  BackButtonIcon,
  LogoutIcon,
  SelectedBoxIcon,
  UnselectedBoxIcon,
} from '../../utils/assetComp/IconComp';

import {Slider, RangeSlider} from '@react-native-assets/slider';
import {FONT_SIZES, Fonts} from '../../utils/styles/fontsSizes';
import {Colors, colors} from '../../utils/styles/colors';
import axios from 'axios';
import urls from '../../utils/urls';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {addBasicDetail} from '../../redux/reducer/basicDetailsSlice';
import {useNavigation} from '@react-navigation/native';
import {getLocation} from '../../utils/useLocation';

export const PreferenceFilter = ({route}) => {
  const {type} = route.params;
  const [age, setAge] = useState([18, 22]);
  const {goBack} = useNavigation();
  const [distance, setDistance] = useState(20);
  const [height, setHeight] = useState([5.0, 7.11]);
  const [Interested, setInterested] = useState('Female');
  const [Location, setLocation] = useState({});
  const userProfile = useSelector(state => state?.basicDetails);
  // console.log(userProfile.location?.coordinates);
  useEffect(() => {
    getLocation(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const altitude = position.coords.altitude;
        const accuracy = position.coords.accuracy;
        const location = {
          lat: lat,
          long: long,
        };
        setLocation(location);
        // console.log('location', location);
      },
      error => {
        // setError(error.message);
      },
    );
  }, []);

  const updateInterestPreference = async () => {
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: userProfile.firebaseUid,
          phone: userProfile.phone,
          interestedIn: Interested,
          location: Location,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        addBasicDetail({interestedIn: Interested});
        // setLoading(false);
        goBack();
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        // setLoading(false);
      });
  };

  const updateAgePreference = async () => {
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: userProfile.firebaseUid,
          phone: userProfile.phone,
          location: Location,

          preferences: {
            ageRange: {
              min: age[0],
              max: age[1],
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
              min: age[0],
              max: age[1],
            },
          },
        });
        // setLoading(false);
        goBack();
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        // setLoading(false);
      });
  };

  const updateDistancePreference = async () => {
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: userProfile.firebaseUid,
          phone: userProfile.phone,
          location: Location,

          preferences: {
            distance: distance,
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
            distance: distance,
          },
        });
        // setLoading(false);
        goBack();
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        // setLoading(false);
      });
  };
  const updateHeightPreference = async () => {
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: userProfile.firebaseUid,
          phone: userProfile.phone,
          location: Location,

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
        // setLoading(false);
        goBack();
      })
      .catch(err => {
        console.error(
          'Unable to save detail now. Please try again later',
          err,
          err.code,
        );
        // setLoading(false);
      });
  };
  const handleUpdate = () => {
    if (type === 'interest') {
      updateInterestPreference();
    }
    if (type === 'age') {
      updateAgePreference();
    }
    if (type === 'distance') {
      updateDistancePreference();
    }
    if (type === 'height') {
      updateHeightPreference();
    }
  };
  useEffect(() => {
    if (userProfile?.interestedIn) {
      setInterested(userProfile.interestedIn);
    }
    if (userProfile?.preferences?.height) {
      console.log(userProfile?.preferences?.height);
      const arr1 = userProfile?.preferences?.height?.min.split('');
      const arr = userProfile?.preferences?.height?.max.split('');
      const number1 = parseFloat(`${arr1[0]}.${arr1[2]}`);
      const number = parseFloat(`${arr[0]}.${arr[2]}`);
      console.log(number1.toFixed(1));
      // console.log(number1);
      // console.log(height[0] );
      console.log([number1.toFixed(1), number.toFixed(1)]);
      const heightList = [number1.toFixed(1), number.toFixed(1)];
      console.log('heightList: ' + heightList);
      setHeight(heightList);
      // setAge(userProfile.preferences.ageRange);
    }
    if (userProfile?.preferences?.ageRange) {
      setAge([
        userProfile.preferences.ageRange?.min,
        userProfile.preferences.ageRange?.max,
      ]);
    }
    if (userProfile?.preferences?.distance) {
      setDistance(userProfile?.preferences?.distance);
    }
  }, [userProfile]);

  return (
    <View style={{flex: 1}}>
      <BackButtonIcon />
      <View style={{paddingHorizontal: 25, paddingTop: 10}}>
        {type === 'interest' && (
          <>
            <AppText style={styles.heading}>Interested in</AppText>
            <View style={[styles.box, {borderBottomWidth: 1}]}>
              <AppText style={styles.range}>Male</AppText>
              <TouchableOpacity onPress={() => setInterested('Male')}>
                {Interested === 'Male' ? (
                  <SelectedBoxIcon />
                ) : (
                  <UnselectedBoxIcon />
                )}
              </TouchableOpacity>
            </View>
            <View style={[styles.box, {borderBottomWidth: 1}]}>
              <AppText style={styles.range}>Female</AppText>
              <TouchableOpacity onPress={() => setInterested('Female')}>
                {Interested === 'Female' ? (
                  <SelectedBoxIcon />
                ) : (
                  <UnselectedBoxIcon />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <AppText style={styles.range}>Non Binary</AppText>
              <TouchableOpacity onPress={() => setInterested('Non-Binary')}>
                {Interested === 'Non-Binary' ? (
                  <SelectedBoxIcon />
                ) : (
                  <UnselectedBoxIcon />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
        {type === 'age' && (
          <>
            <AppText style={styles.heading}>Age</AppText>
            <AppText style={styles.range}>
              {age[0]} - {age[1]}
            </AppText>

            <RangeSlider
              value={age} // set the current slider's value
              minimumValue={18} // Minimum value
              maximumValue={70} // Maximum value
              step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
              minimumTrackTintColor="#F1DEAC" // The track color before the current value
              maximumTrackTintColor="#F1DEAC" // The track color after the current value
              thumbTintColor="#F1DEAC" // The color of the slider's thumb
              thumbStyle={{width: 30, height: 30, borderRadius: 60}} // Override the thumb's style
              trackStyle={{backgroundColor: '#F1DEAC'}} // Override the tracks' style
              minTrackStyle={undefined} // Override the tracks' style for the minimum range
              maxTrackStyle={undefined} // Override the tracks' style for the maximum range
              vertical={false} // If true, the slider will be drawn vertically
              inverted={false} // If true, min value will be on the right, and max on the left
              enabled={true} // If false, the slider won't respond to touches anymore
              trackHeight={2.5} // The track's height in pixel
              thumbSize={15} // The thumb's size in pixel
              thumbImage={undefined} // An image that would represent the thumb
              slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
              onValueChange={e => {
                setAge(e);
              }} // Called each time the value changed. The type is (value: number) => void
              onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
              onSlidingComplete={undefined} // Called when the press is released. The type is (value: number) => void
              CustomThumb={undefined} // Provide your own component to render the thumb. The type is a component: ({ value: number }) => JSX.Element
              // CustomMark={() => <AppView W={40} H={40} BG="red"></AppView>} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
            />
          </>
        )}
        {type === 'distance' && (
          <>
            <AppText style={styles.heading}>Distance</AppText>
            <AppText style={styles.range}>{distance}</AppText>
            <Slider
              value={distance} // set the current slider's value
              minimumValue={1} // Minimum value
              maximumValue={25} // Maximum value
              step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
              minimumTrackTintColor="#F1DEAC" // The track color before the current value
              maximumTrackTintColor="#F1DEAC" // The track color after the current value
              thumbTintColor="#F1DEAC" // The color of the slider's thumb
              thumbStyle={{width: 30, height: 30, borderRadius: 60}} // Override the thumb's style
              trackStyle={undefined} // Override the tracks' style
              minTrackStyle={undefined} // Override the tracks' style for the minimum range
              maxTrackStyle={undefined} // Override the tracks' style for the maximum range
              vertical={false} // If true, the slider will be drawn vertically
              inverted={false} // If true, min value will be on the right, and max on the left
              enabled={true} // If false, the slider won't respond to touches anymore
              trackHeight={4} // The track's height in pixel
              thumbSize={15} // The thumb's size in pixel
              thumbImage={undefined} // An image that would represent the thumb
              slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
              onValueChange={setDistance} // Called each time the value changed. The type is (value: number) => void
              onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
              onSlidingComplete={undefined} // Called when the press is released. The type is (value: number) => void
              CustomThumb={undefined} // Provide your own component to render the thumb. The type is a component: ({ value: number }) => JSX.Element
              // CustomMark={() => <AppView W={40} H={40} BG="red"></AppView>} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
            />
          </>
        )}
        {type === 'height' && (
          <>
            <AppText style={styles.heading}>Height</AppText>
            <View style={{flexDirection: 'row'}}>
              <AppText style={styles.range}>
                {height[0].toString().slice(0, 1)}'{' '}
                {height[0].toString().slice(2, 3).length == 0
                  ? 0
                  : height.toString().slice(2, 3)}
              </AppText>
              <AppText> - </AppText>
              <AppText style={styles.range}>
                {height[1].toString().slice(0, 1)}'{' '}
                {height[1].toString().slice(2, 3).length === 0
                  ? 0
                  : height[1].toString().slice(2, 3)}
              </AppText>
            </View>

            <RangeSlider
              value={height} // set the current slider's value
              minimumValue={4.0} // Minimum value
              maximumValue={7.11} // Maximum value
              step={0.1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
              minimumTrackTintColor="#F1DEAC" // The track color before the current value
              maximumTrackTintColor="#F1DEAC" // The track color after the current value
              thumbTintColor="#F1DEAC" // The color of the slider's thumb
              thumbStyle={{width: 30, height: 30, borderRadius: 60}} // Override the thumb's style
              trackStyle={{backgroundColor: '#F1DEAC'}} // Override the tracks' style
              minTrackStyle={undefined} // Override the tracks' style for the minimum range
              maxTrackStyle={undefined} // Override the tracks' style for the maximum range
              vertical={false} // If true, the slider will be drawn vertically
              inverted={false} // If true, min value will be on the right, and max on the left
              enabled={true} // If false, the slider won't respond to touches anymore
              trackHeight={4} // The track's height in pixel
              thumbSize={15} // The thumb's size in pixel
              thumbImage={undefined} // An image that would represent the thumb
              slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
              onValueChange={setHeight} // Called each time the value changed. The type is (value: number) => void
              onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
              onSlidingComplete={undefined} // Called when the press is released. The type is (value: number) => void
              CustomThumb={undefined} // Provide your own component to render the thumb. The type is a component: ({ value: number }) => JSX.Element
              CustomMark={undefined} // Provide your own component to render the marks. The type is a component: ({ value: number; active: boolean }) => JSX.Element ; value indicates the value represented by the mark, while active indicates wether a thumb is currently standing on the mark
            />
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleUpdate} style={styles.logoutButton}>
        {/* <LogoutIcon size={23} /> */}
        <Text style={[styles.logoutButtonText, {color: Colors.dark}]}>
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: '#F1DEAC',
    fontSize: FONT_SIZES[24],
    fontFamily: Fonts.primary,
    marginVertical: 30,
  },
  range: {
    color: Colors.white,
    fontSize: FONT_SIZES[21],
    fontFamily: Fonts.primary,
    marginBottom: 20,
  },
  box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.darkGray1,
    borderBottomColor: Colors.darkGray,
    paddingVertical: 20,
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
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,

    // Style for the logout button
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: FONT_SIZES[18],
    fontFamily: Fonts.bold,
    marginLeft: 15,

    // Style for the logout button text
  },
});
