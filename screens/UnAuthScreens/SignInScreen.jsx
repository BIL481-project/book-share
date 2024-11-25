import {TextInput,Text,Button} from "react-native-paper";
import {StyleSheet, View} from "react-native";


function  SignInScreen({navigation}) {


    function handleSignIn(){
        navigation.navigate('Profile');
    }

    return (
        <>
            <View style={{flex:2, justifyContent:"flex-end", flexDirection:"column", alignSelf:"flex-start", padding:"3%"}}>
            <Text variant="displaySmall">
                Sign In
            </Text>
            </View>

            <View style={{flex:3}}>

            <TextInput style={landingStylesheet.textInputs} mode="outlined"
                label="Email/phone number"
                placeholder="Enter email"
                dense
                theme={{roundness: 25}}>
            </TextInput>


            <TextInput
                style={landingStylesheet.textInputs}
                mode="outlined"
                label="Password"
                placeholder="Enter password"
                dense
                theme={{roundness: 25}}
            >
            </TextInput>
            </View>

            <View style={{flex:2}}>
            <Button style={{height:20}} onPress={handleSignIn}  mode="contained">
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
        borderColor:"white",
    },
});




export default SignInScreen;