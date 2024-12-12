import {Button, Text} from "react-native-paper";
import {View,Image,StyleSheet} from "react-native";
import React from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {strings} from "../../common/strings/language.config";



const InitialScreen = ({navigation}) => {


    const navigateToHome = () => {
        navigation.navigate('SignUp');
    }


    return (<>

        <View>
            <SafeAreaProvider>
                <SafeAreaView style={{top:0}}>
                    <Image
                        source={require('./../../common/images/IntroductionPhoto.png')}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
        <View style={landingStyleSheet.introMessageStyle}>
            <Text style={{flex:2, color:"white", fontFamily:"Inter"}} variant="displayMedium">{strings.welcome}</Text>
            <Text style={{flex:2, color:"white"}} variant="headlineSmall">If you are book enthusiasts this is a great place to share!</Text>

            <Button style={{backgroundColor: "#635A8F", height:45}} labelStyle={{color:"white"}} onPress={navigateToHome} mode="outlined">
                Get Started
            </Button>
        </View>
    </>);


}


const landingStyleSheet = StyleSheet.create({

    introImageStyle: {

    },
    introMessageStyle:{
        display:"flex",
        top:"70%",
        paddingHorizontal:15,
        height:"30%",
        justifyContent:"flex-end",
        backgroundColor:"#CB98EB",
        borderStartStartRadius:25,
        borderEndStartRadius:25,
        padding:10,
    }


})


export default InitialScreen;