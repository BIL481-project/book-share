import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { pickImage } from '../utils/imageUtils'; // Resim seçme fonksiyonu
import { addImageToFormData } from '../utils/imageUtils'; // FormData'ya resim ekleme fonksiyonu
import authApi from '../axios_instances/authApi'; // Axios instance
import { getSessionUserId } from '../utils/getSessionUserId'; // Kullanıcı ID'sini alma fonksiyonu
import { useNavigation } from '@react-navigation/native';

export default function AddBookScreen() {
    const [formData] = useState(new FormData()); // FormData nesnesini state olarak tanımlıyoruz
    const [bookData, setBookData] = useState({
        name: '',
        description: '',
        genre: '',
        location: '',
    });
    const [userId, setUserId] = useState(null); // Kullanıcı ID'sini tutan state
    const navigation = useNavigation();

    useEffect(() => {
        const checkUserSession = async () => {
            const sessionUserId = await getSessionUserId(); // Kullanıcı ID'sini al
            if (!sessionUserId) {
                Alert.alert('Unauthorized', 'You must log in to add a book.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } else {
                setUserId(sessionUserId); // Kullanıcı ID'sini state'e ata
            }
        };

        checkUserSession();
    }, []);

    const handlePickImage = async () => {
        try {
            const imageUri = await pickImage(); // Resim seç
            if (imageUri) {
                addImageToFormData(formData, imageUri, "image"); // Resmi FormData'ya ekle
                Alert.alert("Success", "Image added to form data!");
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleAddBookData = () => {
        // Kitap bilgilerini FormData'ya ekle
        Object.entries(bookData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    };

    const handleSubmit = async () => {
        try {
            handleAddBookData(); // Kitap bilgilerini ekle
            const response = await authApi.post('/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', `Book added successfully! ID: ${response.data.id}`);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to add book.');
        } finally {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Book Name"
                value={bookData.name}
                onChangeText={(text) => setBookData({ ...bookData, name: text || null })}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={bookData.description}
                onChangeText={(text) => setBookData({ ...bookData, description: text || null })}
            />
            <TextInput
                style={styles.input}
                placeholder="Genre"
                value={bookData.genre}
                onChangeText={(text) => setBookData({ ...bookData, genre: text || null })}
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={bookData.location}
                onChangeText={(text) => setBookData({ ...bookData, location: text || null })}
            />
            <Button title="Pick Image" onPress={handlePickImage} />
            <Button title="Submit Book" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
});
