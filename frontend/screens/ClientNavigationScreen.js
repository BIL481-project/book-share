import {BottomNavigation} from "react-native-paper";
import {useState} from "react";
import ProfileScreen from "./ClientScreens/ProfileScreen";
import HomeScreen from "./ClientScreens/HomeScreen";
import CommunicateScreen from "./ClientScreens/CommunicateScreen";
import CommunityScreen from "./ClientScreens/CommunityScreen";



function ClientNavigationScreen({navigation}){




    const [index,setIndex] = useState(2);
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
        community:() => CommunityScreen({navigation}),

    })

    return(<BottomNavigation navigationState={{index,routes}} onIndexChange={setIndex} renderScene={renderScene} lazy lazyPlaceholder={() => null}/>)




}


export default ClientNavigationScreen