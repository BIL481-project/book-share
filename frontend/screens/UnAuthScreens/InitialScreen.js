import {Button, Text} from "react-native-paper";
import {View,Image,StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {strings} from "../../common/strings/language.config";
import {getSessionUserId} from "../../utils/getSessionUserId";



const InitialScreen = ({navigation}) => {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getSessionUserId();

                if (user !== null) {
                    navigation.navigate('ClientNavigationScreen');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    },[]);

    const navigateToSign = () => {
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
            <Text style={landingStyleSheet.introTextStyle} variant="displayMedium">{strings.welcome}</Text>
            <Text style={landingStyleSheet.introTextStyle} variant="headlineSmall">{strings.greeting}</Text>

            <Button style={landingStyleSheet.introButtonStyle} labelStyle={{color:"white"}} onPress={navigateToSign} mode="outlined">
                Get Started
            </Button>
        </View>
    </>);


}


const landingStyleSheet = StyleSheet.create({

    introImageStyle: {

    },
    introButtonStyle:{backgroundColor: "#635A8F", height:45},
    introTextStyle:{flex:2, color:"white"},
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