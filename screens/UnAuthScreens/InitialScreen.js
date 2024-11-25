import {Button, Text} from "react-native-paper";
import {View} from "react-native";
import React from "react";
import colors from "./../../common/colors";




const InitialScreen = ({navigation}) => {


    const navigateToHome = () => {
        navigation.navigate('SignUp');
    }


    return (<>
        <View style={{ display:"flex", top: 200, paddingHorizontal:15, height:"30%", justifyContent:"flex-end"}}>

            <Text style={{flex:2}} variant="displayMedium">Welcome!</Text>
            <Text style={{flex:2}} variant="headlineSmall">If you are book enthusiasts this is a great place to share!</Text>

            <Button style={{backgroundColor: colors.primary, height:45}} labelStyle={{color:"white"}} onPress={navigateToHome} mode="outlined">

                Get Started
            </Button>
        </View>
    </>);


}


export default InitialScreen;