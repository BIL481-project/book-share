import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env'; // BACKEND_URL yerine HTTP_SERVER_URL kullanıyoruz
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebsocketManager from '../websocket/WebsocketManager';

export default function HomeScreen({ navigation }) {
    const handleStart = async () => {
        try {
            // API isteği
            const response = await axios.get(BACKEND_URL + '/start'); // Ngrok URL'sini burada kullanabilirsiniz
            console.log(response.data);

            // API yanıtını başarılı olarak aldık, Books ekranına yönlendiriyoruz
            navigation.navigate('Books');
        } catch (error) {
            console.error('API isteğinde hata:', error);
            Alert.alert('Hata', 'API isteğinde bir sorun oluştu');
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const navigateToDummy = () => {
        navigation.navigate('Dummy');
    };

    const navigateToWebSocketTest = () => {
        navigation.navigate('WebSocketTest'); // WebSocketTestScreen'e yönlendirme
    };

    const navigateToAddBookScreen = () => navigation.navigate('AddBookFurki'); // Fotoğraf ekranına yönlendirme

    const handleRemoveToken = async () => {
        try {
            await WebsocketManager.closeWebSocket();
            await AsyncStorage.removeItem('token'); // Token'ı AsyncStorage'dan sil
            Alert.alert('Başarılı', 'Token başarıyla silindi');
        } catch (error) {
            console.error('Token silme sırasında hata:', error);
            Alert.alert('Hata', 'Token silinirken bir sorun oluştu');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>KitapPaylaş uygulamasına hoşgeldiniz!</Text>
            <Button title="Başla" onPress={handleStart} />
            <Button title="Giriş Yap" onPress={navigateToLogin} />
            <Button title="Protected Route Test" onPress={navigateToDummy} />
            <Button title="WebSocket Test Ekranı" onPress={navigateToWebSocketTest} />
            <Button title="Kitap Ekle" onPress={navigateToAddBookScreen} />
            <Button title="Logout" onPress={handleRemoveToken} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});