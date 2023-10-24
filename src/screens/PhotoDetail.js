import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { connect} from 'react-redux';
import { selectBasicDetails } from '../redux/reducer/basicDetailsReducer';
import ContinueButton from '../components/ContinueButton';
import * as ImagePicker from 'react-native-image-picker';
import { FlatGrid } from 'react-native-super-grid';


const PhotoDetail = ({basic_detail}) => {

  console.log(basic_detail, basic_detail.dateOfBirth)
  const [selectedImage, setSelectedImage] = useState('');
  const [showImg, setShowImg] = useState(false)


  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  }

  const onPress = () => {

  }

  const onContinue = () => {
    
  }

  const items = [1,2, 3, 4];

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        Show us your world!
      </Text>
      <Text style={styles.text2}>{`Upload
your pictures`}</Text>

      <FlatGrid
        itemDimension={120}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {
              selectedImage !== '' ? 
                <Image
                  source={{ uri: selectedImage }}
                  style={{ flex: 1 }}
                  resizeMode="contain"
                />
              :
              <Pressable onPress={openImagePicker}>
                <View style={styles.imageDiv}>
                  <Image source={require('../../assets/add-img.png')} style={styles.img}/>
                </View>
            </Pressable>
            }
            
          </View>
        )}
      />

      
                
      <View style={styles.button}>
        <ContinueButton onPress={onContinue}/>
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
    
    borderRadius: 5,
    padding: 10,
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
      marginTop: 110,
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
  imgContainer: {

  },
  imageDiv: {
    backgroundColor: '#2F2F2F',
    width: 140,
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  button: {
    marginLeft: 20
  }
  

});

const mapStateToProps = (state) => ({
   basic_detail: state,
});

const mapDispatchToProps = {
  
};


export default connect(mapStateToProps, mapDispatchToProps) (PhotoDetail)