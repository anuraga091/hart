import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {selectBasicDetails} from '../redux/reducer/basicDetailsReducer';
import ContinueButton from '../components/ContinueButton';
//import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {FlatGrid} from 'react-native-super-grid';
import {
  addBasicDetail,
  updateBasicDetail,
} from '../redux/reducer/basicDetailsSlice';
import {RNS3} from 'react-native-aws3';
import urls from '../utils/urls';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const PhotoDetail = ({basic_detail, addBasicDetail, updateBasicDetail}) => {
  // console.log(basic_detail);
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState(['', '', '', '']);

  const [s3URLs, setS3URLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const openImagePicker = ind => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      maxFiles: 4,
    }).then(image => {
      const newSelectedImages = [...selectedImages];
      newSelectedImages[ind] = image[0].path;
      setSelectedImages(newSelectedImages);
      //console.log(image.path);
    });
  };

  const handleBack = () => {
    //handle back
    // console.log('clicked photos', navigation.canGoBack())
    // console.log(navigation.goBack())
    // console.log(navigation.getState());

    //navigation.pop()
    if (!navigation.canGoBack()) {
      navigation.navigate('Details');
    }
    //   navigation.navigate('Details')
    //navigation.goBack()
  };

  // const openImagePicker = (ind) => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('Image picker error: ', response.error);
  //     } else {
  //       //console.log(response)
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       //console.log(imageUri);
  //       if (ind === 1){
  //         setSelectedImage1(imageUri);
  //       } else if (ind === 2){
  //         setSelectedImage2(imageUri);
  //       } else if (ind === 3){
  //         setSelectedImage3(imageUri);
  //       } else if (ind === 4){
  //         setSelectedImage4(imageUri);
  //       }
  //     }
  //   });

  //   setImgUrls([selectedImage1, selectedImage2, selectedImage3, selectedImage4])

  // };

  // handleCameraLaunch = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 200,
  //     maxWidth: 200,
  //   };

  //   launchCamera(options, response => {
  //     console.log('Response = ', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled camera');
  //     } else if (response.error) {
  //       console.log('Camera Error: ', response.error);
  //     } else {
  //       // Process the captured image
  //       let imageUri = response.uri || response.assets?.[0]?.uri;
  //       if (ind === 1){
  //         setSelectedImage1(imageUri);
  //       } else if (ind === 2){
  //         setSelectedImage2(imageUri);
  //       } else if (ind === 3){
  //         setSelectedImage3(imageUri);
  //       } else if (ind === 4){
  //         setSelectedImage4(imageUri);
  //       }
  //       console.log(imageUri);
  //     }
  //   });
  // }

  const uploadS3URLs = async res => {
    const userId = auth().currentUser.uid;
    const lastSignInTime = auth().currentUser.metadata.lastSignInTime;
    const phoneNumber = auth().currentUser.phoneNumber;
    const idToken = await auth().currentUser.getIdToken();

    await axios
      .post(
        `${urls.PROD_URL}/user`,
        {
          firebaseUid: userId,
          phone: phoneNumber,
          lastSignInTime: lastSignInTime,
          profilePictures: res,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        },
      )
      .then(res => {
        setLoading(false);
        navigation.navigate('Prompts');
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

  const uploadImagesAndContinue = async () => {
    setLoading(true);

    const uniqueImages = Array.from(new Set(selectedImages));

    const imagesToUpload = uniqueImages.filter(image => image !== (null || ''));

    const data = new FormData();

    imagesToUpload.forEach((imageUri, index) => {
      data.append('images', {
        uri:
          Platform.OS === 'android'
            ? imageUri
            : imageUri.replace('file://', ''),
        type: 'image/jpeg',
        name: `Image-${new Date().getTime()}.jpg`,
      });
    });
    // Send to backend
    await axios
      .post(`${urls.PROD_URL}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const result = res.data.urls;
        console.log('result', res.data);
        //uploadS3URLs(result)
        addBasicDetail({profilePictures: result}); // Assuming result.urls is an array of S3 URLs
        //
        navigation.navigate('Prompts');
        setLoading(false);
      })
      .catch(error => {
        console.error('error t', error);
        setLoading(false);
        // Handle errors (e.g., show an alert)
      });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack}>
        <Image
          resizeMode="cover"
          style={styles.backImg}
          source={require('../../assets/back.png')}
        />
      </Pressable>
      <Text style={styles.text1}>Show us your world!</Text>
      <Text style={styles.text2}>{`Upload your pictures`}</Text>
      <View style={styles.itemContainer}>
        <>
          {selectedImages[0] !== '' && selectedImages[0] !== null ? (
            <Image
              source={{uri: selectedImages[0]}}
              style={styles.img}
              resizeMode="contain"
            />
          ) : (
            <Pressable onPress={() => openImagePicker(0)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')} />
              </View>
            </Pressable>
          )}
          {selectedImages[1] !== '' && selectedImages[1] !== null ? (
            <Image
              source={{uri: selectedImages[1]}}
              style={styles.img}
              resizeMode="contain"
            />
          ) : (
            <Pressable onPress={() => openImagePicker(1)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')} />
              </View>
            </Pressable>
          )}
        </>
      </View>
      <View style={styles.itemContainer}>
        <>
          {selectedImages[2] !== '' && selectedImages[2] !== null ? (
            <Image
              source={{uri: selectedImages[2]}}
              style={styles.img}
              resizeMode="contain"
            />
          ) : (
            <Pressable onPress={() => openImagePicker(2)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')} />
              </View>
            </Pressable>
          )}
          {selectedImages[3] !== '' && selectedImages[3] !== null ? (
            <Image
              source={{uri: selectedImages[3]}}
              style={styles.img}
              resizeMode="contain"
            />
          ) : (
            <Pressable onPress={() => openImagePicker(3)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')} />
              </View>
            </Pressable>
          )}
        </>
      </View>
      <View style={styles.button}>
        <ContinueButton onPress={uploadImagesAndContinue} />
      </View>

      <Text style={styles.page}>2 of 4</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // basicDetail: {
  //     backgroundColor: "rgba(0,0,0,0.9)",
  //     flex: 1,
  //     width: "100%",
  //     height: '100%',
  //     overflow: "hidden",
  //     paddingLeft: 20,
  //     position: 'relative'
  // },
  // background11: {
  //     opacity: 1,
  //     height: 500,
  //     width: '100%',
  //     position: "absolute",
  // },
  // background2: {
  //     top: 500,
  // },
  container: {},
  backImg: {
    marginTop: 50,
  },
  gridView: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  text1: {
    marginTop: 50,
    color: '#F1DEAC',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 16,
    marginLeft: 20,
  },
  text2: {
    color: '#FFF',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 28,
    marginTop: 30,
    marginLeft: 20,
  },
  img: {
    width: 140,
    height: 140,
    marginBottom: 15,
    marginRight: 30,
    borderRadius: 10,
  },
  imageDiv: {
    backgroundColor: '#2F2F2F',
    width: 140,
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 30,
  },
  button: {
    marginLeft: 10,
  },
  page: {
    color: '#F1DEAC',
    //font-variant-numeric: lining-nums proportional-nums;
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 12,
    fontStyle: 'normal',
    marginTop: 30,
    marginLeft: 5,
    //fontWeight: 700,
    //lineHeight: 'normal',
  },
});

const mapStateToProps = state => ({
  basic_detail: state,
});

const mapDispatchToProps = {
  addBasicDetail,
  updateBasicDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
