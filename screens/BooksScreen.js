import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BACKEND_URL } from '@env'; // BACKEND_URL değişkenini .env dosyasından içe aktarıyoruz

const BooksScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log('url:' + BACKEND_URL)
                const response = await axios.get(BACKEND_URL + '/api/books'); // API'den tüm kitapları çek
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const renderBookCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
        >
            <Image source={{ uri: `${BACKEND_URL}${item.image}` }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookLocation}>{item.location}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderBookCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
        width: '90%', // Kart genişliğini ekranın %90'ına yay
        alignItems: 'center', // İçindeki elemanları yatayda ortalar
        justifyContent: 'center', // Dikeyde ortalar
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookImage: {
        width: 150, // Görüntüyü daha büyük yap
        height: 200,
        marginBottom: 12, // Alt boşluk ver
        borderRadius: 8,
        resizeMode: 'cover', // Görüntüyü çerçeveye sığacak şekilde ayarla
    },
    bookTitle: {
        fontSize: 20, // Başlık için daha büyük font
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
        textAlign: 'center',
    },
    bookLocation: {
        fontSize: 16, // Konum için daha büyük font
        color: '#666',
        textAlign: 'center',
    },
});


export default BooksScreen;
