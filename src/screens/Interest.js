import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import ContinueButton from '../components/ContinueButton'
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import urls from '../utils/urls';
import { useNavigation } from '@react-navigation/native';
import { connect} from 'react-redux';
import { addBasicDetail } from '../redux/reducer/basicDetailsSlice';
import { setAuthentication, setOnboardingCompletion } from '../redux/slice/userSlice';

const Interest = ({onboarding_data, setAuthentication, setOnboardingCompletion, addBasicDetail}) => {


    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
        {label: "Non-binary", value: "Non-binary"},
        {label: "Bigender", value: "Bigender"},
        
    ]);
    //const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const data = onboarding_data.basicDetails

    console.log(value)


    const onContinue = async () => {
        const idToken = await auth().currentUser.getIdToken();

        await axios.post(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user`,
        {
            name: data.name,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            height: data.height,
            location: data.location,
            firebaseUid: data.firebaseUid,
            phone: data.phone,
            creationTime: data.creationTime,
            lastSignInTime: data.lastSignInTime,
            prompts: data.prompt,
            profilePictures: data.result,
            interestedIn: value,
            hasCompletedOnboarding: true
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}` 
            },
        }).then(res => {
            addBasicDetail({
                interestedIn: value
            });
            setOnboardingCompletion(true)
            navigation.navigate("About-1");

            setLoading(false)
        }).catch(err => {
            console.error("Unable to save detail now. Please try again later", err, err.code);
            setLoading(false)
        }
    )
        

    }

    


  return (
    <View style={styles.basicDetail}>
        
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
        {
            
            <View>
                <Text style={styles.text1}>
                    Tell us who you wanna see                
                </Text>
                <Text style={styles.text2}>{`Interested in`}</Text>

                <View style={styles.pickerDiv}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{
                            backgroundColor: '#2F2F2F',
                            width: 250,
                            height: 60,
                            marginTop: 20,
                            paddingLeft: 20,
                        }}
                        labelStyle={{
                            backgroundColor: '#2F2F2F', 
                        }}
                        textStyle={{
                            fontSize: 18,
                            fontFamily: 'LibreBaskerville-Bold',
                            color: '#fff',
                            backgroundColor: '#2F2F2F', 
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: '#2F2F2F', 
                            width: 250,
                            paddingBottom: 5,
                            marginBottom: 20,
                            marginTop: 20
                        }}
                        placeholder="Select"
                        iconContainerStyle={{
                            color: '#FFF'
                        }}
                        ArrowDownIconComponent={({style}) => <Image source={require("../../assets/dropdown-img.png")}  />}
                        ArrowUpIconComponent={({style}) => <Image source={require("../../assets/dropdownUp-img.png")}  />}
                    />
                </View>

                <ContinueButton onPress={onContinue}/>
            </View>
            
        }
        
    </View>
  )
}


const styles = StyleSheet.create({
    basicDetail: {
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
    text1: {
        marginTop: 80,
        color: '#F1DEAC', 
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 16
    },
    text2 : {
        color: '#FFF',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 28,
        marginTop: 30
    },
    input : {
        backgroundColor: '#2F2F2F',
        width: 300,
        height: 60,
        borderRadius: 10,
        marginTop: 30,
        color: '#fff',
        fontFamily: 'LibreBaskerville-Bold',
        fontSize: 18,
        paddingLeft: 20,
    },
    picker: {
        flexDirection: 'row',
        marginTop: 30,
    },
    pickerDiv: {
        flexDirection: 'column',

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
    

});

const mapStateToProps = (state) => ({
    onboarding_data: state,
});
 
const mapDispatchToProps = {
    addBasicDetail,
    setOnboardingCompletion,
    setAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps) (Interest)