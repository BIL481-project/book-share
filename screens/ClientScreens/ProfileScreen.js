
import {Button} from  "react-native-paper";
import {View,Text,StyleSheet} from "react-native";

function ProfileScreen() {



    return (<>


     <View style={{flex:2, justifyContent:"center", alignItems:"center", backgroundColor:"red"}}>
        <Text style={landingStyleSheet.textUsernameStyle}>
            David Wilden
        </Text>

        <Text style={landingStyleSheet.textIdStyle}>
            @David_123
        </Text>

         <Text style={[landingStyleSheet.textIdStyle,{marginVertical:25}]}>
             Nereye dönersen dön popon arkandadır
         </Text>
     </View>

    <View style={{flex:1, flexDirection:"column"}}>
        <Button style={{height:40, borderRadius:15, width:"90%"}} mode="contained">
            Follow
        </Button>

        <Button labelStyle={{fontSize:14, color:"white"}} style={[landingStyleSheet.signIn, {backgroundColor:"#A47551"}]} mode="outlined">
            Message
        </Button>
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
    signIn: {
        borderRadius: 20,
        height: 40,
        alignSelf: "center",
        width: "96%",
        textAlign: "center",
        fontSize: 16,
        color:"#FFFFFF",
    },

})



export default ProfileScreen;