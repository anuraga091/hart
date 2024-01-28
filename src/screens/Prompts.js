import { Image, StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import prompts from '../utils/prompt_data'
import PromptModal from '../components/Modal'
import ContinueButton from '../components/ContinueButton'
import { connect} from 'react-redux';
import { addBasicDetail } from '../redux/reducer/basicDetailsSlice'
import urls from '../utils/urls'
import axios from 'axios'
import auth from '@react-native-firebase/auth';


const Prompts = ({addBasicDetail, all_detail}) => {

    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const [promptIndex, setPromptIndex] = useState('')
    const [category, setCategory] = useState('Personal')
    const [modalVisible, setModalVisible] = useState(false);
    const [promptData, setPromptData] = useState({})
    const [promptText, setPromptText] = useState('')
    const [answersCount, setAnswersCount] = useState(0);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/prompts`)
        .then(response => response.json())
        .then(data => setPromptData(data))
        .catch(error => console.error('Error fetching prompts', error));
    }, []);

    useEffect(() => {
        const count = Object.keys(promptData).reduce((total, cat) => {
          return total + Object.values(promptData[cat]).filter(answer => answer.trim() !== '').length;
        }, 0);
        setAnswersCount(count);
    }, [promptData]);

    const showSelectedPrompts = (obj, key) => {
        setCategory(obj)
        setActiveIndex(key)
        //console.log(obj)
    }

    const showPrompt = (prompt, key) => {
        if (answersCount >= 3) {
            alert("You can only answer three prompts.");
            return;
        }
        setModalVisible(true)
        setPrompt(prompt)
        setPromptIndex(key)
        const currentAnswer = promptData[category][prompt];
        setPromptText(currentAnswer || '');
    }

    const onContinue = async () => {
        const userId = auth().currentUser.uid;
        const idToken = await auth().currentUser.getIdToken();

        await axios.post(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/prompts/${userId}`, 
        {
            "responses" : promptData
        },
        { 
            headers: {
                "Authorization": `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log(res.data)
            addBasicDetail(all_detail) 
            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        })
          
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
            { Object.keys(promptData).length > 0 &&
                Object.keys(promptData).map((obj, key) => (
                    <Pressable onPress={() => showSelectedPrompts(obj, key)} key={key}>
                        <View style={activeIndex !== key ? styles.category : styles.activeCategory}>
                            <Text style={activeIndex !== key ? styles.text2 : styles.activeText2} >{obj}</Text>
                        </View>
                        
                    </Pressable>
                ))
            }
        </ScrollView>
      </View>
      
      
      { Object.keys(promptData).length > 0 &&
        Object.keys(promptData[category]).map((prompt, key) => (
            <Pressable onPress={() => showPrompt(prompt, key)} key={key}>
                <View style={styles.prompts} >
                    <View style={styles.promptsView}>
                        <Text style={styles.promptText} >{prompt}</Text>
                        {
                           promptData[category][prompt]  ?
                           <Text style={styles.promptTextAnswer} >{promptData[category][prompt]}</Text>
                           : ''
                        }
                    </View>
                    <View style={styles.tickView}>
                        {promptData[category][prompt] ?
                            <Image
                                resizeMode="cover"
                                source={require("../../assets/tick.png")}
                                style={styles.tick}
                            />
                            : null
                        }
                    </View>
                </View>
            </Pressable>
        ))
      }

      {
        modalVisible ? 
            <PromptModal modalVisible={modalVisible} setModalVisible={setModalVisible} prompt={prompt} setPrompt={setPrompt} promptText={promptText} setPromptText={setPromptText}
            promptIndex={promptIndex} setPromptIndex={setPromptIndex} category={category} setCategory={setCategory} promptData={promptData} setPromptData={setPromptData}/>
        : 
        null
      }
        {
            answersCount >= 3 ?
                <View style={styles.button}>
                    <ContinueButton onPress={onContinue}/>
                </View>
            : 
                <View/>
            
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
        marginTop: 80,
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
        fontSize: 17 ,
        textAlign: 'center',
        paddingTop: 5,
        
    },
    prompts: {
       height: 70,
       backgroundColor: '#2F2F2F',
       justifyContent: 'space-between',
       paddingLeft: 20,
       borderTopColor: '#000',
       borderTopWidth: 1,
       borderStyle: 'solid',
       borderBottomColor: '#000',
       borderBottomWidth: 1,
       flexDirection: 'row'
    },
    promptsView: {
        justifyContent: 'space-evenly',
        

    },
    promptText: {
        color: '#FFF',
        fontFamily: "Raleway-SemiBold",
        fontSize: 17,
        //paddingTop: 5,

    },
    promptTextAnswer: {
        color: 'rgba(255,255,255,0.6)',
        fontFamily: "Raleway-SemiBold",
        fontSize: 14,
        //paddingTop: 5,
    },
    tickView: {
        justifyContent: 'space-evenly',

    },
    tick : {
        position: 'absolute',
        right: 20,
        top: 30
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
        
    },
    
});

const mapStateToProps = (state) => ({
    all_detail: state,
 });
 
 const mapDispatchToProps = {
   addBasicDetail,
 };

export default connect(mapStateToProps, mapDispatchToProps) (Prompts)