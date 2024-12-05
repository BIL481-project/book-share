import {Button} from "react-native-paper";
import colors from "../../common/colors";
import {View} from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React, {useEffect, useState} from "react";
import { BACKEND_URL } from '@env';
import authApi from "../../axios_instances/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddBookScreen({navigation}){

    const [bookName, setBookName] = useState("");
    const [description, setDescription] = useState("");
   // const [imageUri, setImageUri] = useState("");
    const [location, setLocation] = useState("");
    const [genre, setGenre] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(() => {

        async function getUserData(){
            try {
                const res = await authApi.get(`${BACKEND_URL}/profiles/my`);
                console.log(res.data.user.id, "res");
                setUserId(res.data.user.id);
            } catch (err){
                console.log(err)
                const cvp = AsyncStorage.getItem("token");
                console.log(cvp)
            }
        }
        getUserData();

    }, []);

    async function handleAddBook(){

        console.log(bookName, userId, location, genre,description);

        if(userId !== undefined && bookName !== undefined){
            try{
                const response  = await authApi.post(`${BACKEND_URL}/books/`,
                    {name:bookName,ownerId:userId,description:description,location:location,genre:genre});

                console.log(response.status);

                navigation.navigate('ClientNavigationScreen');

            } catch(err){
                console.log(err);
            }
        }
    }




    return(<>
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
            style={landingStylesheet.background}
        />

        <View style={{flex:2, justifyContent:"center"}}>


        <CustomTextInput
            style={landingStylesheet.textInputs}
            mode="outlined"
            placeholder="Enter name"
            dense
            theme={{roundness: 25}}
            value={bookName}
            onChangeText={setBookName}/>

        <CustomTextInput
            style={landingStylesheet.textInputs}
            mode="outlined"
            placeholder="Enter description"
            dense
            theme={{roundness: 25}}
            value={description}
            onChangeText={setDescription}/>


        <CustomTextInput
            style={landingStylesheet.textInputs}
            mode="outlined"
            placeholder="Enter location"
            dense
            theme={{roundness: 25}}
            value={location}
            onChangeText={setLocation}/>

        <CustomTextInput
            style={landingStylesheet.textInputs}
            mode="outlined"
            placeholder="Enter genre"
            dense
            theme={{roundness: 25}}
            value={genre}
            onChangeText={setGenre}/>

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
    },


});


export default AddBookScreen;