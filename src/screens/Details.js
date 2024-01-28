import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import ContinueButton from '../components/ContinueButton'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addBasicDetail, updateBasicDetail, deleteBasicDetail } from '../redux/reducer/basicDetailsSlice';
import PhotoDetail from './PhotoDetail';
import { connect} from 'react-redux';
import { getLocation } from '../utils/useLocation';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import urls from '../utils/urls';



const Details = ({navigation, addBasicDetail}) => {

    const [name, setName] = useState('')
    const [selectedGender, setSelectedGender] = useState('Gender');
    const [date, setDate] = useState(new Date())
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [basicDetail, setBasicDetail] = useState({});
    const [show, setShow] = useState(false);
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [items1, setItems1] = useState([
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'},
        {label: "Non-binary", value: "Non-binary"},
        {label: "Genderqueer", value: "Genderqueer"},
        {label: "Genderfluid", value: "Genderfluid"},
        {label: "Agender", value: "Agender"},
        {label: "Bigender", value: "Bigender"},
        {label: "Two-Spirit", value: "Two-Spirit"},
        {label: "Androgynous", value: "Androgynous"},
        {label: "Demiboy", value: "Demiboy"},
        {label: "Demigirl", value: "Demigirl"},
        {label: "Genderflux", value: "Genderflux"},
        {label: "Neutrois", value: "Neutrois"},
        {label: "Pangender", value: "Pangender"},
        {label: "Third Gender", value: "Third Gender"},
        {label: "Transgender", value:"Transgender"},
        {label: "Cisgender", value: "Cisgender"},
        {label: "Gender Nonconforming", value: "Gender Nonconforming"},
        
    ]);
    const [items2, setItems2] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openPhotoRoute, setOpenPhotoRoute] = useState(false)
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    
    //const gender = ['Male' , "Female", "Non-binary", "Genderqueer", "Genderfluid", "Agender", "Bigender", "Two-Spirit", "Androgynous", "Demiboy", "Demigirl", "Genderflux", "Neutrois", "Pangender", "Third Gender", "Transgender", "Cisgender", "Gender Nonconforming"]
    var heightArray = [];
    for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
          heightArray.push({label: `${feet}'${inches}"`, value: `${feet}'${inches}"`});
        }
        
    }

    useEffect(() => {
        getLocation(
          (position) => {
            console.log(position)
            const lat = position.coords.latitude
            const long = position.coords.longitude
            setLocation({
                lat: lat,
                long: long
            });
          },
          (error) => {
            setError(error.message);
          }
        );
    }, []);


    const onChangeName = (e) => {
        setName(e)
    }


    const onContinue = async () => {
        setLoading(true)
        const userId = auth().currentUser.uid;
        const lastSignInTime = auth().currentUser.metadata.lastSignInTime;
        const creationTime = auth().currentUser.metadata.creationTime;
        const phoneNumber = auth().currentUser.phoneNumber;
        const idToken = await auth().currentUser.getIdToken();

        const basic_details = {
            name: name,
            gender: value1,
            dateOfBirth: date.getTime(),
            height: value2,
            location: location,
            firebaseUid: userId,
            phone: phoneNumber,
            creationTime: creationTime,
            lastSignInTime: lastSignInTime
        }

                

        await axios.post(`${urls.LOCAL_URL_FOR_PHYSICAL_DEVICE}/user`,
            {
                name: name,
                gender: value1,
                dateOfBirth: date.getTime(),
                height: value2,
                location: location,
                firebaseUid: userId,
                phone: phoneNumber,
                creationTime: creationTime,
                lastSignInTime: lastSignInTime
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}` 
                },
            }).then(res => {
                setOpenPhotoRoute(true)
                setBasicDetail(basic_details)
                addBasicDetail(basic_details);
                setLoading(false)
            }).catch(err => {
                console.error("Unable to save detail now. Please try again later", err, err.code);
                setLoading(false)
            }
        )
        
        
        
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }
    

    const onPress = () => {
        setShow(true)
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
            !openPhotoRoute ?
            <View>
                <Text style={styles.text1}>
                    A few more things
                </Text>
                <Text style={styles.text2}>{`Introduce 
yourself to us`}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Your name"
                    inputMode="text"
                    maxLength={20}
                    placeholderTextColor='#fff'
                />
                
                
                <View style={styles.picker}>
                    <View style={styles.pickerDiv}>
                        {/* <Text style={styles.heading}>DOB</Text> */}
                        <Pressable onPress={onPress}>
                            <View style={styles.dobPicker}>
                                <Text style={styles.input3}>{moment(date).format('DD MMM YYYY')}</Text>
                                <Image source={require("../../assets/dropdown-img.png")} style={styles.dropdown}/>
                            </View>
                        </Pressable>
                        {show && (
                            <DateTimePicker
                                style={styles.datePickerStyle}
                                value={date} // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                //placeholder="select date"
                                format="DD-MM-YYYY"
                                testID="dateTimePicker"                    
                                onChange={onChangeDate}
                            />  
                        )}
                    </View>
                    <View style={styles.pickerDiv}>
                        <DropDownPicker
                            open={open1}
                            value={value1}
                            items={items1}
                            setOpen={setOpen1}
                            setValue={setValue1}
                            setItems={setItems1}
                            style={{
                                backgroundColor: '#2F2F2F',
                                width: 160,
                                height: 60,
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
                                width: 180,
                                paddingBottom: 5,
                                marginBottom: 20
                            }}
                            placeholder="Gender"
                            iconContainerStyle={{
                                color: '#FFF'
                            }}
                            ArrowDownIconComponent={({style}) => <Image source={require("../../assets/dropdown-img.png")}  />}
                            ArrowUpIconComponent={({style}) => <Image source={require("../../assets/dropdownUp-img.png")}  />}

                        />
                    </View>
                    
                   
                </View>
                <View style={styles.pickerDiv}>
                        <DropDownPicker
                            open={open2}
                            value={value2}
                            items={heightArray}
                            setOpen={setOpen2}
                            setValue={setValue2}
                            setItems={setItems2}
                            style={{
                                backgroundColor: '#2F2F2F',
                                width: 180,
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
                                width: 180,
                                paddingBottom: 5,
                                marginBottom: 20
                            }}
                            placeholder="Height"
                            iconContainerStyle={{
                                color: '#FFF'
                            }}
                            ArrowDownIconComponent={({style}) => <Image source={require("../../assets/dropdown-img.png")}  />}
                            ArrowUpIconComponent={({style}) => <Image source={require("../../assets/dropdownUp-img.png")}  />}

                        />
                    </View>

                <ContinueButton onPress={onContinue}/>
            </View>
            :
            <PhotoDetail/>
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

// const mapStateToProps = (state) => ({
    
// });

const mapDispatchToProps = {
    addBasicDetail
};


export default connect(null, mapDispatchToProps) (Details)