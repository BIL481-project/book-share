import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env'; // BACKEND_URL değişkenini .env dosyasından içe aktarıyoruz
import { getSessionUserId } from '../utils/getSessionUserId'; // Oturum kontrolü için ekliyoruz
import { useNavigation } from '@react-navigation/native';
import authApi from '../axios_instances/authApi';

const BookDetailsScreen = ({ route }) => {
    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(BACKEND_URL + '/books/' + bookId);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        const checkSession = async () => {
            const sessionUserId = await getSessionUserId();
            setUserId(sessionUserId); // Oturum açan kullanıcının ID'sini alıyoruz
        };

        fetchBookDetails();
        checkSession();
    }, [bookId]);

    const handleLendBook = async () => {
        try {
            const response = await authApi.post(`/books/lend/${bookId}`);
            Alert.alert('Success', response.data.message);
    
            // Kitap state'ini güncelle
            setBook((prevBook) => ({
                ...prevBook,
                isAvailable: 0, // Artık ödünç alınamaz
                borrowerId: userId, // Kitabı alan kullanıcı
            }));
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to lend the book.');
        }
    };
    
    const handleReturnBook = async () => {
        try {
            const response = await authApi.post(`/books/return/${bookId}`);
            Alert.alert('Success', response.data.message);
    
            // Kitap state'ini güncelle
            setBook((prevBook) => ({
                ...prevBook,
                isAvailable: 1, // Artık ödünç alınabilir
                borrowerId: null, // Kitap artık kimseye ait değil
            }));
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to return the book.');
        }
    };
    

    const handleLogin = () => {
        navigation.navigate('Login'); // Login sayfasına yönlendirme
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!book) {
        return <Text>Book not found</Text>;
    }

    const isBorrowedByUser = userId && book.borrowerId === userId; // Kullanıcı kitabı ödünç aldı mı kontrol
    const isAvailable = book.isAvailable; // Kitap ödünç alınabilir durumda mı?
    const belongsToTheCurrentUser = userId && book.ownerId === userId;

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${book.image}` }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.name}</Text>
            <Text style={styles.bookLocation}>Location: {book.location}</Text>
            <Text style={styles.bookDescription}>{book.description}</Text>

            {!userId && (
                <Button title="Login to Borrow" onPress={handleLogin} color="#007BFF" />
            )}

            {userId && isAvailable && !belongsToTheCurrentUser && (
                <Button title="Borrow Book" onPress={handleLendBook} color="#28A745" />
            )}

            {userId && isBorrowedByUser && (
                <Button title="Return Book" onPress={handleReturnBook} color="#DC3545" />
            )}

            {userId && !isAvailable && !isBorrowedByUser && (
                <Text style={styles.disabledText}>This book is already borrowed by someone else.</Text>
            )}

            {belongsToTheCurrentUser && book.borrowerId && (
                <Text style={styles.infoText}>
                    Your book is currently borrowed by user with ID: {book.borrowerId}
                </Text>
            )}

            {belongsToTheCurrentUser && !book.borrowerId && (
                <Text style={styles.infoText}>
                    Your book is available to be borrowed.
                </Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    bookImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bookLocation: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    bookDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },
    disabledText: {
        color: '#DC3545',
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default BookDetailsScreen;