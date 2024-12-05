import {Text,Button} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import axios from "axios";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from "expo-linear-gradient";
import CustomTextInput from "../../components/CustomTextInput";
import { BACKEND_URL } from '@env';


function  SignInScreen({navigation}) {

    const [username, _] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    async function handleSignIn(){

        console.log("Sign In Screen", email, password,username);
        console.log(BACKEND_URL)

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {"userName": username, email, password});
            console.log(response.data, "data");
            const {token} = response.data;
            await AsyncStorage.setItem('token', token);
            navigation.navigate('ClientNavigationScreen');
        } catch(err){
            console.log(err)
        }





    }

    return (
        <>

            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
                style={landingStylesheet.background}
            />

            <View style={{flex:2, justifyContent:"flex-end", flexDirection:"column", alignSelf:"flex-start", padding:"3%"}}>
            <Text style={{color:"white"}} variant="displaySmall">
                Sign In
            </Text>
            </View>

            <View style={{flex:3}}>

                <CustomTextInput
                    mode="outlined"
                    placeholder="Enter email"
                    dense
                    style={landingStylesheet.textInputs}
                    theme={{roundness: 25}}
                    value={email}
                    onChangeText={setEmail}/>


                <CustomTextInput
                    style={landingStylesheet.textInputs}
                    mode="outlined"
                    placeholder="Enter password"
                    dense
                    theme={{roundness: 25}}
                    value={password}
                    onChangeText={setPassword}/>


            </View>

            <View style={{flex:2}}>
            <Button style={{height:45,marginHorizontal:20}} onPress={handleSignIn}  mode="contained">
                Sign In
            </Button>
            </View>

        </>
    );


}


const  landingStylesheet = StyleSheet.create({
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




export default SignInScreen;