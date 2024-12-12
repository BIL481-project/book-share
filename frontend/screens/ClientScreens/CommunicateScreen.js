import {Avatar, Icon, Text} from "react-native-paper";
import {View, Dimensions, ScrollView, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import authApi from "../../axios_instances/authApi";


function CommunicateScreen(){

    const [notificationData, setNotificationData] = useState([]);

    useEffect(()=> {

        async function getNotification(){



        try{
            const response = await authApi.get(`/notifications/get`);
            console.log(response.data.notifications, "notification-get-result");
            setNotificationData(response.data.notifications);
        } catch(err){
            Alert.alert("Notificationlar çekilemedi");
        }
        }

        getNotification();

    },[]);





    const windowWidth = Dimensions.get('window').width - 50;

    return(<>

        <ScrollView>

            {notificationData.map((item,index,_) => {

                return (

                <View style={{flexDirection:"row", padding:10}}>
                    <Avatar.Image size={50} source={require('./../../common/images/profilPic.png')}/>

                    <View style={{ justifyContent:"space-around"}}>

                        <View style={{flexDirection:"row",width:windowWidth, justifyContent:"space-between",paddingHorizontal:15}}>
                            <Text style={{justifyContent:"center",textAlign:"left"}}>BorrowerID: {item.userId}</Text>
                            <View style={{justifyContent:"center"}}>
                                <Icon size={20} source={require("../../../assets/3dots.png")}/>
                            </View>

                        </View>

                        <View style={{flexDirection:"row", width:windowWidth,justifyContent:"space-between",paddingHorizontal:15}}>
                            <Text>{item?.content}</Text >
                            {/*<Text>16.29</Text>*/}
                        </View>

                    </View>
                </View>
            )})}


        </ScrollView>

    </> )
}

export default CommunicateScreen;