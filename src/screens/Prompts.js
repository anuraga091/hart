import { Image, StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import prompts from '../utils/prompt_data'
import PromptModal from '../components/Modal'

const Prompts = () => {

    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const [promptIndex, setPromptIndex] = useState('')
    const [category, setCategory] = useState('Personal')
    const [modalVisible, setModalVisible] = useState(false);

    const showSelectedPrompts = (obj, key) => {
        setCategory(obj)
        setActiveIndex(key)
        //console.log(obj)
    }

    const showPrompt = (prompt, key) => {
        console.log('clicked')
        setModalVisible(true)
        setPrompt(prompt)
        setPromptIndex(key)
    }

  return (
    <ScrollView style={styles.promptDiv}>
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
      <Text style={styles.text1}>Choose 3 prompts</Text>
      <View style={{height: 100}}>
        <ScrollView horizontal style={styles.categoryDiv}>
            {
                Object.keys(prompts).map((obj, key) => (
                    <Pressable onPress={() => showSelectedPrompts(obj, key)} key={key}>
                        <View style={activeIndex !== key ? styles.category : styles.activeCategory}>
                            <Text style={activeIndex !== key ? styles.text2 : styles.activeText2} >{obj}</Text>
                        </View>
                        
                    </Pressable>
                ))
            }
        </ScrollView>
      </View>
      
      
      {
        prompts[category].map((prompt, key) => (
            <Pressable onPress={() => showPrompt(prompt, key)} key={key}>
                <View style={styles.prompts} >
                    <Text style={styles.promptText} >{prompt}</Text>
                </View>
            </Pressable>
        ))
      }

      {
        modalVisible ? 
            <PromptModal modalVisible={modalVisible} setModalVisible={setModalVisible} prompt={prompt} promptIndex={promptIndex}/>
        : 
        null
      }

       
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    promptDiv: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "100%",
        height: '100%',
        overflow: "hidden",
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
    text1: {
        marginTop: 110,
        color: '#F1DEAC', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 23,
        paddingLeft: 20,
    },
    categoryDiv: {
        flexDirection: 'row',
        marginTop: 40,
        height: 40,
        paddingLeft: 20,
        paddingRight: 50,
        width: '100%'
        //marginBottom: 20
       
    },
    activeCategory: {
        backgroundColor: '#2F2F2F',
        width: 110,
        height: 40,
        borderRadius: 30,
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: '#FFF',
        borderWidth: 1,
        
    },
    activeText2: {
        color: '#fff',
        fontFamily: "Raleway-SemiBold",
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 5,
    },
    category : {
        backgroundColor: '#2F2F2F',
        width: 110,
        height: 40,
        borderRadius: 30,
        marginRight: 10
    },
    text2 : {
        color: '#B8B8B8',
        fontFamily: "Raleway-SemiBold",
        fontSize: 17,
        textAlign: 'center',
        paddingTop: 5,
        
    },
    prompts: {
       height: 70,
       backgroundColor: '#2F2F2F',
       justifyContent: 'center',
       paddingLeft: 20,
       borderTopColor: '#000',
       borderTopWidth: 1,
       borderStyle: 'solid',
       borderBottomColor: '#000',
       borderBottomWidth: 1,
    },
    promptText: {
        color: '#FFF',
        fontFamily: "Raleway-SemiBold",
        fontSize: 17,
        paddingTop: 5,

    },
    
});

export default Prompts