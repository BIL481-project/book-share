import {Button, Dialog, Portal, Text, TextInput} from "react-native-paper"
import {StyleSheet,View} from "react-native";
import {useEffect, useState} from "react";


function SignUpScreen({navigation}) {
    //const AuthService = require('../../backend/services/authService');

    const [modalVis,setModalVis] = useState(false);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");

    function handleOnSignUp(){

        if(passwordRepeat === password){
        //     AuthService.signupUser(email, password, username)
        //         .then(()  => navigation.navigate('Profile'))
        //         .catch((err) =>{
        //             setModalVis(true);
        //             console.log(err);
        //     });
        } else {
            setModalVis(true);
            console.log("Şifreler eşleşmiyor!");
        }





        navigation.navigate('SignIn');
    }


    // useEffect(() =>{
    //
    //     console.log(username, "username");
    //     console.log(email, "email");
    //     console.log(password, "password");
    //     console.log(passwordRepeat, "passwordRepeat");
    //
    // }, [username,email,password,passwordRepeat])



    return (<>

        <View style={{flex:1, justifyContent:"flex-end", flexDirection:"column", alignSelf:"flex-start", padding:"3%"}}>
        <Text variant="displaySmall">
            Sign Up
        </Text>
        </View>

        <View style={{flex:3}}>
        <TextInput
        mode="outlined"
        dense
        label="Username"
        placeholder="Enter Username"
        style={landingStyleSheet.textInputs}
        theme={{roundness:25}}
        value={username}
        onChangeText={setUsername}
        >
        </TextInput>

            <TextInput
                mode="outlined"
                dense
                label="Email"
                placeholder="Enter Email"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={email}
                onChangeText={setEmail}
            >
            </TextInput>

            <TextInput
                mode="outlined"
                dense
                label="Password"
                placeholder="Enter Password"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={password}
                onChangeText={setPassword}
            >
            </TextInput>

            <TextInput
                mode="outlined"
                dense
                label="Repeat Password"
                placeholder="Repeat Password"
                style={landingStyleSheet.textInputs}
                theme={{roundness:25}}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
            >
            </TextInput>

        </View>

        <View style={{flex:1}}>
            <Button style={{height:45}} onPress={handleOnSignUp}  mode="contained">
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
        borderColor:"white",
    },
})



export default SignUpScreen;