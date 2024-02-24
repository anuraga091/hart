import { Image, StyleSheet, Text, View, Pressable, TextInput, ImageBackground ,ScrollView,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect} from 'react-redux';

const Homepage = ({data}) => {

  const navigation = useNavigation();
  const { isAuthenticated, hasCompletedOnboarding } = data.user

  useEffect(() => {
    if (isAuthenticated && !hasCompletedOnboarding) {
      navigation.navigate('Details');
    }
  }, [isAuthenticated, hasCompletedOnboarding, navigation]);


  const handleReport = () => {
    console.log('handle report clicked')
  }

  const handleRemove = () => {
    console.log('handle remove clicked')
  }

  return (
    <ScrollView style={styles.homepage}>
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
      <Image
        style={[
          styles.background3,
          styles.background11,
          ]}
        resizeMode="cover"
        source={require("../../assets/background1.png")}
      />
      <Image
        style={[
          styles.background4,
          styles.background11,
          ]}
        resizeMode="cover"
        source={require("../../assets/background1.png")}
      />
      <Image
      style={[
        styles.background5,
        styles.background11,
        ]}
        resizeMode="cover"
        source={require("../../assets/background1.png")}
      />
       <View style={styles.view1}>
          <View style={styles.header}>
            <Text style={styles.name}>Eshan</Text>
            <Image
              style={styles.returnImg}
              resizeMode="cover"
              source={require("../../assets/return.png")}
            />

          </View>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={require("../../assets/sample-photo.png")}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>A random fact I love</Text>
          <Text style={styles.replies}>If you stood on Mars in normal clothes, your blood would start to boil and you would die. </Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require("../../assets/like-button.png")}
          />
        </View>

        <View style={styles.basicDetailView}>
          <Text style={styles.basicDetailText}> 19 </Text>
          <Text style={styles.line}>|</Text>
          <Text style={styles.basicDetailText}> Male </Text>
          <Text style={styles.line}>|</Text>
          <View style={styles.location}>
            <Image
              style={styles.locationPin}
              resizeMode="cover"
              source={require("../../assets/location-pin.png")}
            />  
            <Text style={styles.locationText}> Hulimavu </Text>
          </View>
          
          <Text style={styles.line}>|</Text>
          <Text style={styles.basicDetailText}>5’7</Text>

        </View>

        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={require("../../assets/sample-photo.png")}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>A random fact I love</Text>
          <Text style={styles.replies}>If you stood on Mars in normal clothes, your blood would start to boil and you would die. </Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require("../../assets/like-button.png")}
          />
        </View>

        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={require("../../assets/sample-photo.png")}
          />
        </View>

        <View style={styles.view2}>
          <Text style={styles.yellowPromptText}>A random fact I love</Text>
          <Text style={styles.replies}>If you stood on Mars in normal clothes, your blood would start to boil and you would die. </Text>
          <Image
            style={styles.likebtn}
            resizeMode="cover"
            source={require("../../assets/like-button.png")}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleRemove}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.button} onPress={handleReport}>
            <Text style={styles.removeText}>Report</Text>
          </TouchableOpacity>
        </View>
      
      
       
     

        
        
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  homepage: {
    backgroundColor: "rgba(0,0,0,0.9)",
    flex: 1,
    width: "100%",
    height: '100%',
    overflow: "hidden",
    //paddingTop: 40
    position: 'relative'
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
  
  view1:{
    borderRadius: 12,
    backgroundColor: '#272727',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 60

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#272727',
    borderRadius: 12,
  },
  returnImg: {

  },
  name: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 23,

  },
  img: {
    width: '100%',
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
    fontFamily: "Raleway-SemiBold",
    fontSize: 17 ,
  },
  replies: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 22,
    marginTop: 20
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
    marginTop: 20
  },
  basicDetailText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: "Raleway-SemiBold",
    fontSize: 17 ,
    margin: 10
  },
  line: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 30
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  locationPin: {
    marginRight: 10,
    marginTop: 5
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: "Raleway-SemiBold",
    fontSize: 17 ,
  },
  imgView: {
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 35,
    marginTop: 20
  },
  
  button: {
    marginTop: 30,
    height: 50,
    width: 230,
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 1.5,
      height: 2,
    },
    borderRadius: 12,
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#f1deac',
  },
  removeText: {
    marginTop: 7,
    fontSize: 22,
    fontFamily: "Raleway-Bold",
    color: '#000',
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 80
    //justifyContent: 'center'
  },
  background12: {
    opacity: 1,
    height: 500,
    width: 200,
  }
 

  
  
  

  
  
  
  

});

const mapStateToProps = (state) => ({
  data: state,
});

const mapDispatchToProps = {
 //addBasicDetail,
 //updateBasicDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)