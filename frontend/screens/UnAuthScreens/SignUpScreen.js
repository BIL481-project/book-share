import {Button, Text} from "react-native-paper"
import {Alert, StyleSheet, View} from "react-native";
import {useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import CustomTextInput from "../../components/CustomTextInput";
import { BACKEND_URL } from '@env';
import {strings} from "../../common/strings/language.config";



function SignUpScreen({navigation}) {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");

    async function handleOnSignUp(){

        try {

            if (passwordRepeat === password) {
                console.log(username, "username")
                const response = await axios.post(`${BACKEND_URL}/auth/signup`, {"userName": username, email, password})
                    .then(() => {
                        AsyncStorage.setItem('username', username);
                        console.log(response, "response ");
                        navigation.navigate('SignIn');
                    }).catch((err) => {
                        Alert.alert(err);
                    });

            } else {
                Alert.alert(`${strings.passwordsAreDifferent}`);
            }

        } catch(err){
            Alert.alert("Lütfen bilgilerinizi kontrol edin");
            console.log(err);
        }
    }


    return (<>

        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
            style={landingStyleSheet.background}
        />


        <View style={landingStyleSheet.signUpContainer}>


        <Text variant="displaySmall" style={landingStyleSheet.signUpText}>
            {strings.signUp}
        </Text>
        </View>

        <View style={{flex:5}}>

            <CustomTextInput
                mode="outlined"
                dense
                placeholder={strings.enterUsername}
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={username}
                onChangeText={setUsername}
            />

            <CustomTextInput
                mode="outlined"
                dense
                placeholder={strings.enterEmail}
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={email}
                onChangeText={setEmail}
            />

            <CustomTextInput
                mode="outlined"
                dense
                placeholder={strings.enterPassword}
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={password}
                onChangeText={setPassword}
            />
            <CustomTextInput
                mode="outlined"
                dense
                placeholder={strings.repeatPassword}
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
            />

            <Text onPress={()=> navigation.navigate("SignIn")} style={landingStyleSheet.signInText} >{strings.signInIfYouHaveAccount}</Text>

        </View>

        <View style={{flex:1}}>
            <Button style={landingStyleSheet.signUpButtonStyle} onPress={handleOnSignUp}  mode="contained">
                {strings.signUp}
            </Button>
        </View>



    </>);

}


const landingStyleSheet = StyleSheet.create({
    textInputs: {
        margin: 10,
        height: 56,
        borderColor:"red",
        backgroundColor:"transparent",
    },
    signUpContainer:{flex:1, justifyContent:"flex-end", flexDirection:"column", alignSelf:"flex-start", padding:"3%"},
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },
    signInText:{
        color:"blue",
        padding:15,
        textDecorationLine:"underline"
    },
    signUpText:{
        fontFamily:'Inter_900Black',
        color:"white",
        fontWeight:400
    },
    signUpButtonStyle:{
        height:45,
        marginHorizontal:20
    }
})



export default SignUpScreen;