import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env'; // BACKEND_URL değişkenini .env dosyasından içe aktarıyoruz

const BookDetailsScreen = ({ route }) => {
    const { bookId } = route.params;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(BACKEND_URL + '/api/books/' + bookId);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!book) {
        return <Text>Book not found</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${BACKEND_URL}${book.image}` }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookLocation}>Location: {book.location}</Text>
            <Text style={styles.bookDescription}>{book.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    // Stil ayarları
});

export default BookDetailsScreen;
