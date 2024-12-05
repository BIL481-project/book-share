import {BottomNavigation} from "react-native-paper";
import { useState} from "react";
import ProfileScreen from "./ClientScreens/ProfileScreen";
import HomeScreen from "./ClientScreens/HomeScreen";
import CommunicateScreen from "./ClientScreens/CommunicateScreen";
import CommunityScreen from "./ClientScreens/CommunityScreen";
//import authApi from "../axios_instances/authApi";
//import AsyncStorage from "@react-native-async-storage/async-storage";



function ClientNavigationScreen({navigation}){

    // useEffect(() => {
    //
    //     async function getData(){
    //
    //         try{
    //             const response = await authApi.get('/profiles/my');
    //             console.log(response.data);
    //             await AsyncStorage.setItem("userData",response.data)
    //             console.log("Depoya userData eklendi");
    //         } catch(err){
    //             console.log(err);
    //         }
    //     }
    //
    //     getData();
    // }, []);





    const [index,setIndex] = useState(0);
    const [routes] = useState([
        {key:"home", title:"Home", focusedIcon:'home', unfocusedIcon:'home-outline'},
        {key:"communication", title:"Communication", focusedIcon:'message-text', unfocusedIcon:'message-text-outline'},
        {key:"profile", title:"Profile", focusedIcon:'account', unfocusedIcon:'account-outline'},
        {key:"community", title:"Community", focusedIcon:'account-group', unfocusedIcon:'account-group-outline'}
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home:() => HomeScreen({navigation}),
        communication:()=>  CommunicateScreen({navigation}),
        profile: () => ProfileScreen({navigation}),
        community:CommunityScreen
    })

    return(<BottomNavigation navigationState={{index,routes}} onIndexChange={setIndex} renderScene={renderScene}/>)




}


export default ClientNavigationScreen