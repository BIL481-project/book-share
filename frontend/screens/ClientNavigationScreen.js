import { BottomNavigation } from "react-native-paper";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./ClientScreens/ProfileScreen";
import HomeScreen from "./ClientScreens/HomeScreen";
import CommunicateScreen from "./ClientScreens/CommunicateScreen";
import CommunityScreen from "./ClientScreens/CommunityScreen";
import { Button } from "react-native-paper";

function ClientNavigationScreen({ navigation, route }) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "home", title: "Home", focusedIcon: "home", unfocusedIcon: "home-outline" },
        { key: "communication", title: "Communication", focusedIcon: "message-text", unfocusedIcon: "message-text-outline" },
        { key: "profile", title: "Profile", focusedIcon: "account", unfocusedIcon: "account-outline" },
        { key: "community", title: "Community", focusedIcon: "account-group", unfocusedIcon: "account-group-outline" }
    ]);

    const [sessionType, setSessionType] = useState(null);

    useEffect(() => {
        const fetchSessionType = async () => {
            try {
                const type = await AsyncStorage.getItem("sessionType");
                setSessionType(type); // sessionType bilgisini state'e kaydediyoruz
            } catch (err) {
                console.error("Error fetching sessionType:", err);
            }
        };

        fetchSessionType();

        if (route?.params?.targetIndex !== undefined) {
            setIndex(route.params.targetIndex);
        }
    }, [route?.params?.targetIndex]);

    useEffect(() => {
        // Header'a login butonunu ekle
        navigation.setOptions({
            headerRight: () =>
                sessionType === "guest" ? (
                    <Button
                        onPress={() => navigation.navigate("SignIn")}
                        mode="text"
                        color="blue"
                    >
                        Login
                    </Button>
                ) : null,
        });
    }, [navigation, sessionType]);

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={({ route }) => {
                switch (route.key) {
                    case "home":
                        return <HomeScreen key="home" navigation={navigation} sessionType={sessionType} />;
                    case "communication":
                        return <CommunicateScreen key="communication" navigation={navigation} sessionType={sessionType} />;
                    case "profile":
                        return <ProfileScreen key="profile" navigation={navigation} sessionType={sessionType} />;
                    case "community":
                        return <CommunityScreen key="community" navigation={navigation} sessionType={sessionType} />;
                    default:
                        return null;
                }
            }}
        />
    );
}

export default ClientNavigationScreen;
