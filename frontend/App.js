import React, { useEffect } from 'react';
import { PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebsocketManager from './websocket/WebsocketManager';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LoginScreen from './screens/LoginScreen'
import DummyScreen from './screens/DummyScreen'
import InitialScreen from "./screens/UnAuthScreens/InitialScreen";
import SignInScreen from "./screens/UnAuthScreens/SignInScreen";
import SignUpScreen from "./screens/UnAuthScreens/SignUpScreen";
import ProfileScreen from "./screens/ClientScreens/ProfileScreen";
import WebSocketTestScreen from './screens/WebSocketTestScreen';
import AddBookScreen from "./screens/ClientScreens/AddBookScreen";
import MyLibraryScreen from "./screens/ClientScreens/MyLibraryScreen";
import ClientNavigationScreen from "./screens/ClientNavigationScreen";

const Stack = createStackNavigator();





export default function App() {
  useEffect(() => {
    // Uygulama başlatıldığında WebSocket bağlantısını başlatmayı dene
    const initializeWebSocket = async () => {
      try {
        console.log('Initializing WebSocket connection...');
        await WebsocketManager.connectWebSocket(); // Token varsa bağlantıyı başlatacak
      } catch (error) {
        console.error('Error initializing WebSocket:', error);
      }
    };

    initializeWebSocket(); // WebSocket bağlantısını başlat

    return () => {
      // Uygulama kapandığında WebSocket bağlantısını kapat
      console.log('Cleaning up WebSocket connection.');
      WebsocketManager.closeWebSocket();
    };
  }, []);




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
      <Stack.Navigator id="1" initialRouteName="ClientNavigationScreen">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'SignInScreen' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'ProfileScreen.js' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'SignUpScreen' }} />
        <Stack.Screen name="Initial" component={InitialScreen} options={{ title: 'InitialScreen' }} />
        <Stack.Screen name="MyLibrary" component={MyLibraryScreen} options={{ title: 'MyLibrary' }} />
        <Stack.Screen name="AddBookScreen" component={AddBookScreen} options={{ title: 'AddBookScreen' }} />
        <Stack.Screen name="ClientNavigationScreen" component={ClientNavigationScreen} options={{ title: 'ClientNavigationScreens' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'KitapPaylaş' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="Books" component={BooksScreen} options={{ title: 'Kitap Listesi' }} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Kitap Detayları' }} />
        <Stack.Screen name="Dummy" component={DummyScreen} options={{ title: 'Protected Route Test Ekranı' }} />
        <Stack.Screen name="WebSocketTest" component={WebSocketTestScreen} options={{ title: 'WebSocket Test Ekranı' }} />

      </Stack.Navigator>
    </NavigationContainer>
</PaperProvider>
    </>
  );
};