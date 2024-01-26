import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { connect} from 'react-redux';
import { selectBasicDetails } from '../redux/reducer/basicDetailsReducer';
import ContinueButton from '../components/ContinueButton';
//import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { FlatGrid } from 'react-native-super-grid';
import { addBasicDetail, updateBasicDetail } from '../redux/reducer/basicDetailsSlice';
import { RNS3 } from 'react-native-aws3';


const PhotoDetail = ({basic_detail, addBasicDetail, updateBasicDetail}) => {
  const navigation = useNavigation();

  //console.log(basic_detail, basic_detail.dateOfBirth)
  const [selectedImage1, setSelectedImage1] = useState('');
  const [selectedImage2, setSelectedImage2] = useState('');
  const [selectedImage3, setSelectedImage3] = useState('');
  const [selectedImage4, setSelectedImage4] = useState('');
  const [s3URLs, setS3URLs] = useState([])
  const [loading, setLoading] = useState(false)
 
  const openImagePicker = (ind) => {
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      if (ind === 1){
        setSelectedImage1(image.path);
      } else if (ind === 2){
        setSelectedImage2(image.path);
      } else if (ind === 3){
        setSelectedImage3(image.path);
      } else if (ind === 4){
        setSelectedImage4(image.path);
      }
      //console.log(image.path);
    });
  }


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

  


  const uploadImage = async (image) => {
    const file = {
        uri: image,
        name: `${new Date().getTime()}.jpg`,
        type: 'image/jpeg',
    };

    const options = {
      keyPrefix: 'uploads/',
      bucket: 'hart-user-photos',
      region: 'ap-south-1',
      accessKey: 'AKIA3UALKTAA73RKXITB',
      secretKey: '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',
      successActionStatus: 201
    };

    await RNS3.put(file, options).then((res) => {
      console.log('started uploading')
      if (res.status !== 201){
        throw new Error("Failed to upload image to S3");
      } else {
        console.log('uploaded successfully 1')
        setS3URLs(prevUrls => [...prevUrls, res.body.postResponse.location]);
        console.log(s3URLs)
      }
      addBasicDetail({urls: s3URLs})
      console.log({...basic_detail, urls: s3URLs })
      if (s3URLs.length === 4){
        setLoading(false)
        navigation.navigate("Prompts")
        console.log('uploaded successfully')
      }
    }).catch((err) => {
      setLoading(false)
      console.error(err);
    })
    
  };

  const uploadImagesAndContinue = () => {
    setLoading(true)
    const imgUrls = [selectedImage1, selectedImage2, selectedImage3, selectedImage4]
    console.log(imgUrls)
    imgUrls.forEach(image => {
      uploadImage(image);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        Show us your world!
      </Text>
      <Text style={styles.text2}>{`Upload
your pictures`}</Text>
      <View style={styles.itemContainer}>
        <>
          {
            selectedImage1 !== '' ? 
              <Image
                source={{ uri: selectedImage1 }}
                style={styles.img}
                resizeMode="contain"
              />
            :
            <Pressable onPress={() => openImagePicker(1)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')}/>
              </View>
            </Pressable>
          }
          {
            selectedImage2 !== '' ? 
              <Image
                source={{ uri: selectedImage2 }}
                style={styles.img}
                resizeMode="contain"
              />
            :
            <Pressable onPress={() => openImagePicker(2)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')}/>
              </View>
            </Pressable>
          }
        </>
        
      </View>
      <View style={styles.itemContainer}>
        <>
          {
            selectedImage3 !== '' ? 
              <Image
                source={{ uri: selectedImage3 }}
                style={styles.img}
                resizeMode="contain"
              />
            :
            <Pressable onPress={() => openImagePicker(3)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')}/>
              </View>
            </Pressable>
        
          }
          {
            selectedImage4 !== '' ? 
              <Image
                source={{ uri: selectedImage4 }}
                style={styles.img}
                resizeMode="contain"
              />
            :
            <Pressable onPress={() => openImagePicker(4)}>
              <View style={styles.imageDiv}>
                <Image source={require('../../assets/add-img.png')} />
              </View>
          </Pressable>
          }
        </>
        
      </View>         
      <View style={styles.button}>
        <ContinueButton onPress={uploadImagesAndContinue}/>
      </View>
    </View>
  )
}


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
  container: {
    
  },
  gridView: {
    marginTop: 20,
    
  },
  itemContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
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
      marginTop: 80,
      color: '#F1DEAC', 
      fontFamily: 'LibreBaskerville-Bold',
      fontSize: 16,
      marginLeft: 20
  },
  text2 : {
      color: '#FFF',
      fontFamily: 'LibreBaskerville-Bold',
      fontSize: 28,
      marginTop: 30,
      marginLeft: 20
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
    marginRight: 30
  },
  button: {
    marginLeft: 10
  }
  

});

const mapStateToProps = (state) => ({
   basic_detail: state,
});

const mapDispatchToProps = {
  addBasicDetail,
  updateBasicDetail
};


export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)