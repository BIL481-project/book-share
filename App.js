import React from 'react';
import {View} from 'react-native';
import {Button, PaperProvider, Text} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LoginScreen from './screens/LoginScreen'
import DummyScreen from './screens/DummyScreen'
import InitialScreen from "./screens/UnAuthScreens/InitialScreen";
import SignInScreen from "./screens/UnAuthScreens/SignInScreen";
import SignUpScreen from "./screens/UnAuthScreens/SignUpScreen";
import ProfileScreen from "./screens/ClientScreens/ProfileScreen";

const Stack = createStackNavigator();





export default function App() {




  return (<>
        {/*<View style={{ display:"flex", top: 200, paddingHorizontal:15, height:"30%", justifyContent:"flex-end"}}>*/}

        {/*    <Text style={{flex:2}} variant="displayMedium">Welcome!</Text>*/}
        {/*    <Text style={{flex:1}} variant="headlineSmall">If you are book enthusiasts this is a great place to share!</Text>*/}

        {/*<Button  style={{marginBottom:"10", flex:1}} mode="contained">*/}
        {/*    Get Started*/}
        {/*</Button>*/}
        {/*</View>*/}
<PaperProvider>
    <NavigationContainer>
      <Stack.Navigator id="1" initialRouteName="Initial">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'SignInScreen' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'ProfileScreen.js' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'SignUpScreen' }} />
        <Stack.Screen name="Initial" component={InitialScreen} options={{ title: 'InitialScreen' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'KitapPaylaş' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="Books" component={BooksScreen} options={{ title: 'Kitap Listesi' }} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Kitap Detayları' }} />
        <Stack.Screen name="Dummy" component={DummyScreen} options={{ title: 'Protected Route Test Ekranı' }} />
      </Stack.Navigator>
    </NavigationContainer>
</PaperProvider>
  </>);
}
