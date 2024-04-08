import { Image, StyleSheet, Text, View,ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Footer from '../components/footer'
import { useNavigation } from '@react-navigation/native'; 

const Likes = () => {

  const navigation = useNavigation();


  const handleBack = () => {
    
    navigation.goBack()
    

  }


  const handleOptions = () => {
    console.log('handle Options get clicked')
  }


  return (
    <View style={styles.container}>
      <ScrollView>
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
        <View style={styles.promptCard}>
          <Text style={styles.promptText}>
            If you stood on Mars in normal clothes, your blood would start to boil and you would die.
          </Text>
          <Text style={styles.likedPromptText}>Liked your prompt</Text>
          <View style={styles.bubble}>
            <Text style={styles.responseText}>Whoa that's shjgd gjgjhhghghg hghjghj guhhy uyuiu uyuk yuuyu uyuyuyn  hjdjhj khdjhjdhhgjh dhhdkjhjko hghjhjk hghjhjh hghjjh hghjj hghjh hghhj hhj cool!</Text>
            <Image
              style={styles.bubbleImg}
              source={require("../../assets/yellow-polygon.png")}
            />
          </View>
        </View>
        <View style={styles.view1}>
          <View style={styles.header}>
            <Text style={styles.name}>Kendall</Text>
            <TouchableOpacity onPress={() => handleOptions()}>
              <Image
                style={styles.returnImg}
                resizeMode="cover"
                source={require("../../assets/three-dots.png")}
              />
            </TouchableOpacity>
            

          </View>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={require("../../assets/sample-photo.png")}
          />
        </View>
        <View style={styles.swipeContainer}>

        </View>
      </ScrollView>
      
      <Footer/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {      
    backgroundColor: "rgba(0,0,0,0.9)",
    flex: 1,
    width: "100%",
    height: '100%',
    overflow: "hidden",
    paddingLeft: 20,
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
  backButton: {
    paddingLeft: 20,
    marginTop: 50
  },
  promptCard: {
    backgroundColor: "#2C2C2C",
    minHeight: 300,
    borderRadius: 12,
    marginTop: 50,
    marginBottom: 30,
    marginRight: 30,
    marginLeft: 20,
    paddingTop: 30,

  },
  promptText: {
    color: 'rgba(255, 255, 255, 0.90)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 18,
    paddingHorizontal: 40,
    paddingVertical: 20

  },
  
  likedPromptText: {
    color: 'rgba(241, 222, 172, 0.90)',
    fontFamily: 'LibreBaskerville-Bold',
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40
  },
  bubble: {
    backgroundColor: '#F1DEAC',
    borderRadius: 12, 
    marginTop: 8,
    width: '70%',
    marginLeft: 40,
    minHeight: 50,
    position: 'relative',
    marginBottom: 30
    
  },
  bubbleImg: {
    position: 'absolute',
    bottom: -14,
    left: -8
  },
  responseText: {
    color: '#000',
    borderRadius: 12,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15,
    // Other text styling...
  },
  view1:{
    borderRadius: 12,
    backgroundColor: '#272727',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 100

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
    height: 300,
    borderRadius: 12,

  },
  swipeContainer: {

  }
})

export default Likes