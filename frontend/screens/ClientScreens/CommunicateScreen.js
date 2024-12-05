import {Avatar, Icon, Text} from "react-native-paper";
import {View, Dimensions, ScrollView} from "react-native";
import React from "react";


function CommunicateScreen(){

    const windowWidth = Dimensions.get('window').width - 50;

    return(<>

        <ScrollView>

        <View style={{flexDirection:"row", padding:10}}>
            <Avatar.Image size={50} source={require('./../../common/images/profilPic.png')}/>

        <View style={{ justifyContent:"space-around"}}>

            <View style={{flexDirection:"row",width:windowWidth, justifyContent:"space-between",paddingHorizontal:15}}>
                <Text style={{justifyContent:"center",textAlign:"left"}}>Furkan Ekerel</Text>
                <View style={{justifyContent:"center"}}>
                <Icon size={20} source={require("../../../assets/3dots.png")}/>
                </View>

            </View>

            <View style={{flexDirection:"row", width:windowWidth,justifyContent:"space-between",paddingHorizontal:15}}>
                <Text>Hadi Teksos Dönere gidelim...</Text >
                <Text>16.29</Text>
            </View>

        </View>
        </View>



        </ScrollView>

    </> )
}

export default CommunicateScreen;