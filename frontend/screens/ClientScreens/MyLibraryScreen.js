import {Image, StyleSheet, View,  ScrollView} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React from "react";
import {Text,Icon} from "react-native-paper";



function MyLibraryScreen(){



return (<>
    <LinearGradient
        // Background Linear Gradient
        colors={['rgba(59,33,183,0.85)', '#8B64DA','#6ce8a0','#e0d5ed']}
        style={landingStylesheet.background}
    />

   <ScrollView>
    <View style={{borderRadius:20,alignItems:"center"}}>
    <View style={{borderRadius:30,borderColor:"white",backgroundColor:"#6D4ACD", width:"90%",paddingVertical:15,margin:"2%"}}>

        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>1</Text>
            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>Atomic Habits</Text>
            <View style={{flex:1, alignItems:"center"}}>
            <Icon size={20} style={{flex:1}} source={require("../../../assets/cham (1).png")}/>
            </View>
        </View>

        <View style={{padding:5}}>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>James Clear</Text>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>2020-Cornerstone Press</Text>
        </View>

        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
            <Image source={require("../../../assets/book1.jpg")} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
        </View>

    </View>

    </View>



   </ScrollView>


</>)


}


const landingStylesheet = StyleSheet.create({

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },


});



export default MyLibraryScreen;