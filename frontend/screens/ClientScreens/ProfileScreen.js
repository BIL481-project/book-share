import {Button,Avatar} from  "react-native-paper";
import {View, Text, StyleSheet, Image} from "react-native";
import colors from "../../common/colors";
import React, {useEffect, useState} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import authApi from "../../axios_instances/authApi";


//const PROFILES_MY = "https://b0b8-176-216-173-48.ngrok-free.app/profiles/my";



function ProfileScreen({navigation}) {

    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");


    useEffect(() => {

        console.log("useEffect çalıştı");


        async function getUserself(){
            try {
                const response = await authApi.get('/profiles/my');
                console.log(response.data);
                setUserName(response.data.user.userName);
                setEmail(response.data.user.email);
            } catch (err){
                console.error(err);
            }
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
            {userName}
        </Text>

        <Text style={landingStyleSheet.textIdStyle}>
            {email}
        </Text>

         <Text style={[landingStyleSheet.textIdStyle,{marginVertical:25}]}>
             Nereye dönersen dön popon arkandadır
         </Text>

         <View style={{flexDirection:"row", margin:10}}>
             <Button style={{height:40, borderRadius:15, width:"45%", flex:1, margin:5}} onPress={() => navigation.navigate("SignIn")} mode="contained">
                 Follow
             </Button>

             <Button onPress={()=> {}} labelStyle={{ color:"white"}} style={{borderRadius:15,backgroundColor:colors.primary,width:"45%", flex:1, margin:5}} mode="contained">
                 My Library
             </Button>

         </View>

         <View style={{ height:50, width:"100%",alignItems:"center"}}>
            <Button onPress={()=> {navigation.navigate("AddBookScreen")}} labelStyle={{ color:"white"}} style={{height:40,borderRadius:15,backgroundColor:colors.primary,width:"55%"}}>
                AddBooks
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