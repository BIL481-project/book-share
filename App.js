import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BooksScreen from './screens/BooksScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import DummyScreen from './screens/DummyScreen';
import WebSocketTestScreen from './screens/WebSocketTestScreen';
import WebSocketManager from './WebSocketManager';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    WebSocketManager.initialize();

    // AppState değişikliklerini dinliyoruz
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        WebSocketManager.close();
      }
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      WebSocketManager.close(); // Uygulama unmount olduğunda
      appStateListener.remove(); // AppState listener'ını temizle
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
};