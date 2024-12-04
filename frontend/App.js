import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebsocketManager from './websocket/WebsocketManager';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import DummyScreen from './screens/DummyScreen';
import WebSocketTestScreen from './screens/WebSocketTestScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        await WebsocketManager.connectWebSocket();
      } catch (error) {
        console.log("User is not logged in, websocket connection will NOT be started.");
      }
  
      const handleAppStateChange = async (nextAppState) => {
        if (nextAppState === 'inactive') {
          await WebsocketManager.closeWebSocket();
        } else if (nextAppState === 'active') {
          await WebsocketManager.connectWebSocket();
        }
      };
  
      const appStateListener = AppState.addEventListener('change', handleAppStateChange);
  
      return () => {
        WebsocketManager.closeWebSocket();
        appStateListener.remove();
      };
    })();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'KitapPaylaş' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
        <Stack.Screen name="Books" component={BooksScreen} options={{ title: 'Kitap Listesi' }} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Kitap Detayları' }} />
        <Stack.Screen name="Dummy" component={DummyScreen} options={{ title: 'Protected Route Test Ekranı' }} />
        <Stack.Screen name="WebSocketTest" component={WebSocketTestScreen} options={{ title: 'WebSocket Test Ekranı' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};