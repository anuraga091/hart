import { Image, StyleSheet, Text, View, Pressable, TextInput, ScrollView, Modal, Button } from 'react-native'
import React,{useState} from 'react'
import ContinueButton from './ContinueButton'
import { connect} from 'react-redux';
import { addBasicDetail, basic_detail, updateBasicDetail } from '../redux/reducer/basicDetailsSlice';
//import { BlurView } from "@react-native-community/blur";

const PromptModal = ({modalVisible, setModalVisible, promptText,setPromptText,  prompt, setPrompt, promptIndex, setPromptIndex, category, setCategory, promptData, setPromptData, addBasicDetail, updateBasicDetail, basic_detail}) => {
    //console.log(modalVisible, prompt, promptIndex, category, promptData)
    console.log(basic_detail)
    //const [promptText, setPromptText] = useState('')
    const [error, setError] = useState(false)
    console.log(promptText)


    const onContinue = () => {
        if (!promptText.trim()) {
            setError(true);
        } else {
            uploadAnswers(category, prompt, promptText, (updatedPromptData) => {
                addBasicDetail({ prompt: updatedPromptData });
                setModalVisible(false);
            });
            setModalVisible(false)
        }
    };

    const handleCancel = () => {
        setModalVisible(false)
    }


    const uploadAnswers = (category, prompt, value, callback) => {
        setPromptData(prevPrompts => {
            const updatedPrompts = {
                ...prevPrompts,
                [category]: {
                    ...prevPrompts[category],
                    [prompt]: value
                }
            };
    
            if (callback) {
                callback(updatedPrompts);
            }
    
            return updatedPrompts;
        });
    };

  return (
    
    <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={()=>{setModalVisible(!modalVisible)}}>
        <View style={styles.modalView}>
            <View style={styles.promptComponent}>
                <Pressable onPress={handleCancel}>
                    <View>
                        <Image
                            resizeMode="cover"
                            source={require("../../assets/Cross-Button.png")}
                            style={styles.crossButton}
                        />
                    </View>
                    
                </Pressable>
                
                <View style={styles.prompt}>
                    <Text style={styles.textHeading}>{prompt}</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={7}
                        onChangeText={setPromptText}
                        value={promptText}
                        placeholder={'Type here...'}
                        style={styles.inputText}
                        placeholderTextColor= {'#797979'}
                        textAlignVertical={'top'}
                    />
                    { error &&
                        <Text style={styles.error}>{`Please enter your message`}</Text>
                    }
                </View>
                <View style={styles.button}>
                    <ContinueButton onPress={onContinue}/>
                </View>
                
            </View>
            
        </View>
        
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
        width: "100%",
        height: '100%',
        overflow: "hidden",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promptComponent : {
        backgroundColor: "#3E3E3E",
        width: 300,
        height: 300,
        borderRadius: 12,
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1  
    },
    crossButton: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    prompt: {
        marginTop: 40,
        padding: 10
    },
    textHeading: {
        color: '#FFF', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 22, 
    },
    inputText: {
        color: '#FFF', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 18,  
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
        
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
    heading: {
        color: '#fff',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 18,
        marginBottom: 5
        
    },
    dobPicker: {
        flexDirection: 'row',
    },
    input3 : {
        backgroundColor: '#2F2F2F',
        width: 180,
        height: 60,
        borderRadius: 10,
        color: '#fff',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 18,
        paddingLeft: 20,
        marginRight: 20,
        paddingTop: 17
        
    },
    dropdown: {
        position: 'absolute',
        right: 35,
        marginTop: 22
    },
    input1 : {
        backgroundColor: '#2F2F2F',
        width: 150,
        height: 60,
        borderRadius: 10,
        color: '#fff',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 18,
        paddingLeft: 20,
        marginRight: 20
    },
    error: {
        color: '#E66767',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 14,
        marginTop: 30,
        textAlign: 'center'
    },
    
    

});

const mapStateToProps = (state) => ({
    basic_detail: state,
 });
 
 const mapDispatchToProps = {
   addBasicDetail,
   updateBasicDetail
 };

export default connect(mapStateToProps, mapDispatchToProps) (PromptModal)