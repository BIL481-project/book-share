import {Button, Dialog, Portal, Text} from "react-native-paper"
import {StyleSheet,View} from "react-native";
import {useState} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import CustomTextInput from "../../components/CustomTextInput";
import { BACKEND_URL } from '@env';



function SignUpScreen({navigation}) {

    const [modalVis,setModalVis] = useState(false);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");

    async function handleOnSignUp(){

        if(passwordRepeat === password){
            console.log(username, "username")
            const response = await axios.post(`${BACKEND_URL}/auth/signup`,{"userName":username,email,password})
                .then(()=> {
                    AsyncStorage.setItem('username',username);
                    console.log(response, "response ");
                    navigation.navigate('SignIn');
                }).catch((err) => {
                    console.log("error : ", err);
                });

        } else {
            setModalVis(true);
            console.log("Şifreler eşleşmiyor!");
        }
    }


    return (<>

        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
            style={landingStyleSheet.background}
        />


        <View style={{flex:1, justifyContent:"flex-end", flexDirection:"column", alignSelf:"flex-start", padding:"3%"}}>




        <Text variant="displaySmall" style={{fontFamily:'Inter_900Black',color:"white",fontWeight:400}} onPress={()=> navigation.navigate("SignIn")}>
            Sign Up
        </Text>
        </View>

        <View style={{flex:3}}>

            <CustomTextInput
                mode="outlined"
                dense
                placeholder="Enter Username"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={username}
                onChangeText={setUsername}
            />

            <CustomTextInput
                mode="outlined"
                dense
                placeholder="Enter Email"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={email}
                onChangeText={setEmail}
            />

            <CustomTextInput
                mode="outlined"
                dense
                placeholder="Enter Password"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={password}
                onChangeText={setPassword}
            />
            <CustomTextInput
                mode="outlined"
                dense
                placeholder="Repeat Password"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
            />


        </View>

        <View style={{flex:1}}>
            <Button style={{height:45, marginHorizontal:20}} onPress={handleOnSignUp}  mode="contained">
                Sign Up
            </Button>
        </View>


        <Portal>
            <Dialog visible={modalVis}>
                <Dialog.Title>
                    <Text>Kaydolurken bir hata oluştu!</Text>
                </Dialog.Title>

                <Dialog.Actions>
                    <Button onPress={()=> setModalVis(false)}>Tamam</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>


    </>);

}


const landingStyleSheet = StyleSheet.create({
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
})



export default SignUpScreen;