import React, { useEffect } from 'react';
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
}
