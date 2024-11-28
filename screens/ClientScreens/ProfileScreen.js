import {Button,Avatar} from  "react-native-paper";
import {View, Text, StyleSheet, Image} from "react-native";
import colors from "../../common/colors";
import React, {useEffect} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";


const PROFILES_MY = "http://9f6a-88-240-91-56.ngrok-free.app/profiles/my";



function ProfileScreen({navigation}) {



   async function handleSendReq(){

        // const response = await axios.get(PROFILES_MY, {
        //     headers: {
        //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoieXVzdWZtcnoxMTFAZ21haWwuY29tIiwiaWF0IjoxNzMyODA2ODM1LCJleHAiOjE3MzI4MTA0MzV9.ByfIUBtiHvtMJv__j4wvSU5nMvAaWwTF6mXMZT4RKfQ`,
        //     }
        //
        // }).then(()=> {
        //     console.log(response, "bearer");
        // }).catch((err) => {
        //     console.log("Error Response Status:", err.response.status);
        //     console.log("Error Response Headers:", err.response.headers);
        //     console.log("Error Response Data:", err.response.data);
        //     console.log('Error: ', err);
        //     console.log("Response:", response.data);
        // });

       const response  =  axios({ method: 'get', url: PROFILES_MY, header: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoieXVzdWZtcnoxMTFAZ21haWwuY29tIiwiaWF0IjoxNzMyODA2ODM1LCJleHAiOjE3MzI4MTA0MzV9.ByfIUBtiHvtMJv__j4wvSU5nMvAaWwTF6mXMZT4RKfQ`}})
           .then(()=> {
               console.log(response, "bearer");
           }).catch((err) => {
           console.log("Error Response Status:", err.response.status);
           console.log("Error Response Headers:", err.response.headers);
           console.log("Error Response Data:", err.response.data);
           console.log('Error: ', err);
           console.log("Response:", response.data);
       });



    }


    useEffect(() => {

        console.log("useEffect çalıştı");



        async function getUserself(){

            const BEARER_TOKEN =await AsyncStorage.getItem('token');
            console.log(BEARER_TOKEN , "bearer token ");
            console.log(`Bearer ${BEARER_TOKEN}`);

            const response = await axios.get(PROFILES_MY, {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`
                }
            }).then(()=> {
                console.log(response, "bearer");
            }).catch((err) => {
                console.log('Error: ', err);
            });

        }
        getUserself();
    }, []);


    return (<>

        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
            style={landingStyleSheet.background}
        />

        <View style={{flex:2}}>
        <SafeAreaProvider>
            <SafeAreaView>
                <Image
                    source={require('./../../common/images/userFlama.png')}
                />
            </SafeAreaView>
        </SafeAreaProvider>

        <Avatar.Image size={100}  style={{alignSelf:"center" }} source={require('./../../common/images/profilPic.png')}/>
        </View>

     <View style={{flex:3, padding:"5%", justifyContent:"top", alignItems:"center"}}>
        <Text style={landingStyleSheet.textUsernameStyle}>
            David Wilden
        </Text>

        <Text style={landingStyleSheet.textIdStyle}>
            @David_123
        </Text>

         <Text style={[landingStyleSheet.textIdStyle,{marginVertical:25}]}>
             Nereye dönersen dön popon arkandadır
         </Text>

         <View style={{flexDirection:"row", margin:10}}>
             <Button style={{height:40, borderRadius:15, width:"45%", flex:1, margin:5}} onPress={() => navigation.navigate("SignIn")} mode="contained">
                 Follow
             </Button>

             <Button onPress={()=> {handleSendReq()}} labelStyle={{ color:"white"}} style={{borderRadius:15,backgroundColor:colors.primary,width:"45%", flex:1, margin:5}} mode="contained">
                 Message
             </Button>
         </View>
         </View>
    </>)


}

const landingStyleSheet = StyleSheet.create({

    textUsernameStyle: {
      fontSize:22,
    },
    textIdStyle: {
        fontSize:18,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },

})



export default ProfileScreen;