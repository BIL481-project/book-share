import {Avatar, Icon, Text} from "react-native-paper";
import {View, Dimensions, ScrollView, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import authApi from "../../axios_instances/authApi";
import { getSessionUserId } from "../../utils/getSessionUserId";

function CommunicateScreen({ sessionType, navigation }) { // Navigation prop'u eklendi
    const [notificationData, setNotificationData] = useState([]);

    useEffect(() => {
        if (sessionType === 'guest') {
            Alert.alert(
                "Restricted Access",
                "You are currently logged in as a guest. Please sign in to access notifications.",
                [
                    {
                        text: "Home",
                        onPress: () => navigation.navigate("ClientNavigationScreen", { targetIndex: 0 }), // Home screen'e yönlendirme
                        style: "cancel",
                    },
                    {
                        text: "Login",
                        onPress: () => navigation.navigate("SignIn"), // SignIn screen'e yönlendirme
                    },
                ]
            );
            return; // Geri kalan kodun çalışmasını engellemek için return ekliyoruz
        }

        async function getNotification() {
            try {
                const response = await authApi.get(`/notifications/get`);
                console.log(response.data.notifications, "notification-get-result");
                setNotificationData(response.data.notifications);
            } catch (err) {
                console.error("Notificationlar çekilemedi: " + err);
            }
        }

        getNotification();
    }, [sessionType, navigation]); // sessionType ve navigation dependency olarak eklendi

    const windowWidth = Dimensions.get('window').width - 50;

    return (
        <>
            <ScrollView>
                {notificationData.map((item) => {
                    return (
                        <View key={item.id} style={{flexDirection: "row", padding: 10}}>
                            <Avatar.Image size={50} source={require('./../../common/images/profilPic.png')}/>

                            <View style={{justifyContent: "space-around"}}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: windowWidth,
                                        justifyContent: "space-between",
                                        paddingHorizontal: 15,
                                    }}>
                                    <Text style={{justifyContent: "center", textAlign: "left"}}>
                                        BorrowerID: {item.userId}
                                    </Text>
                                    <View style={{justifyContent: "center"}}>
                                        <Icon size={20} source={require("../../../assets/3dots.png")}/>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: windowWidth,
                                        justifyContent: "space-between",
                                        paddingHorizontal: 15,
                                    }}>
                                    <Text>{item?.content}</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </>
    );
}

export default CommunicateScreen;
