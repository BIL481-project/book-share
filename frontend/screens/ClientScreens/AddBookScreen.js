import {Button} from "react-native-paper";
import colors from "../../common/colors";
import {TouchableOpacity, View, Image, Alert} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React, {useEffect, useState} from "react";
import { BACKEND_URL } from '@env';
import authApi from "../../axios_instances/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addImageToFormData, pickImage} from "../../utils/imageUtils";

function AddBookScreen({navigation}){


    const [formData] = useState(new FormData());
    const [image, setImage] = useState("");

    const [bookData,setBookData] = useState({
        name:'',
        description:'',
        genre:'',
        location:''
    });





    useEffect(() => {

        async function getUserData(){
            try {
                const res = await authApi.get(`${BACKEND_URL}/profiles/my`);
            } catch (err){
                const cvp = AsyncStorage.getItem("token");
            }
        }
        getUserData();

    }, []);

    const handlePickImage = async () => {
        try {
            const imageUri = await pickImage(); // Resim seç
            if (imageUri) {
                setImage(imageUri);
                addImageToFormData(formData, imageUri, "image"); // Resmi FormData'ya ekle
                Alert.alert("Success", "Image added to form data!");
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };


    const handleAddBookData = () => {
        // Kitap bilgilerini FormData'ya ekle
        Object.entries(bookData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    };


    const handleAddBook = async () => {
        try {
            handleAddBookData(); // Kitap bilgilerini ekle
            const response = await authApi.post('/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', `Book added successfully! ID: ${response.data.id}`);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to add book.');
        } finally {
            navigation.navigate('Profile');
        }
    };




    return(<>
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
            style={landingStylesheet.background}
        />

        <View style={{flex:3, justifyContent:"center"}}>


            <CustomTextInput
                style={landingStylesheet.textInputs}
                mode="outlined"
                placeholder="Enter name"
                dense
                theme={{roundness: 25}}
                value={bookData.name}
                onChangeText={(text) => setBookData({ ...bookData, name: text || null })}/>

            <CustomTextInput
                style={landingStylesheet.textInputs}
                mode="outlined"
                placeholder="Enter description"
                dense
                theme={{roundness: 25}}
                value={bookData.description}
                onChangeText={(text) => setBookData({ ...bookData, description: text || null })}/>


            <CustomTextInput
                style={landingStylesheet.textInputs}
                mode="outlined"
                placeholder="Enter location"
                dense
                theme={{roundness: 25}}
                value={bookData.location}
                onChangeText={(text) => setBookData({ ...bookData, location: text || null })}/>

            <CustomTextInput
                style={landingStylesheet.textInputs}
                mode="outlined"
                placeholder="Enter genre"
                dense
                theme={{roundness: 25}}
                value={bookData.genre}
                onChangeText={(text) => setBookData({ ...bookData, genre: text || null })}
            />


            <TouchableOpacity
                style={landingStylesheet.imageContainer}
                onPress={() => handlePickImage()}
            >
                {image ? (
                    <>
                        <Image
                            source={require("./../../../assets/edit_pencil.png")}
                            style={landingStylesheet.iconWithImage}
                        />
                        <Image source={{uri:image}} style={landingStylesheet.image} />
                    </>
                ) : (
                    <View style={landingStylesheet.placeholder}>
                        <Image
                            source={require("./../../../assets/edit_pencil.png")}
                            style={landingStylesheet.icon}
                        />
                    </View>
                )}
            </TouchableOpacity>



        </View>



        <View style={{flex:1, alignItems:"center", justifyContent:"flex-end"}}>
            <Button onPress={()=>{handleAddBook()}} labelStyle={{ color:"white"}} style={{borderRadius:15,backgroundColor:colors.alternativePrimary,width:"90%",marginHorizontal:5,marginVertical:20}} mode="contained">
                Add Book
            </Button>
        </View>

    </>)

}


const landingStylesheet = StyleSheet.create({

    textInputs: {
        margin: 10,
        height: 56,
        borderColor:"red",
        backgroundColor:"transparent",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },imageContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        borderRadius: 10,
        overflow: "hidden",
    },  placeholder: {
        justifyContent: "center",
        alignItems: "center",
    }, icon: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    }, image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    }, iconWithImage: {
        width: 50,
        top: 0,
        right: 0,
        zIndex: 1,
        position: "absolute",
        height: 50,
        resizeMode: "contain",
    },


});


export default AddBookScreen;