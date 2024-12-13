import { Image, View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import authApi from "../axios_instances/authApi";
import { BACKEND_URL } from "@env";

function CustomBookComponent({ item, userId }) {
    const [bookDetails, setBookDetails] = useState(item); // Kitap detaylarını kontrol için state

    useEffect(() => {
        async function compareUserIdAndBorrower() {
            console.log('user id\'si: ' + userId);
            console.log('borrower id\'si: ' + bookDetails.borrowerId);
        }

        compareUserIdAndBorrower();
        
    }, [])

    async function handleBorrowFunction(bookId) {
        try {
            await authApi.post(`${BACKEND_URL}/books/lend/${bookId}`);
            alert("Book borrowed successfully!");
            // Kitap detaylarını güncelle
            setBookDetails((prevDetails) => ({
                ...prevDetails,
                isAvailable: false,
                borrowerId: userId,
            }));
        } catch (err) {
            console.error(err);
        }
    }

    async function handleReturnFunction(bookId) {
        try {
            await authApi.post(`${BACKEND_URL}/books/return/${bookId}`);
            alert("Book returned successfully!");
            // Kitap detaylarını güncelle
            setBookDetails((prevDetails) => ({
                ...prevDetails,
                isAvailable: true,
                borrowerId: null,
            }));
        } catch (err) {
            console.error(err);
        }
    }

    const isBorrowedByTheCurrentUser = userId && bookDetails.borrowerId === userId; // Kullanıcı kitabı ödünç aldı mı?
    const isAvailable = bookDetails.isAvailable; // Kitap ödünç alınabilir mi?
    const belongsToTheCurrentUser = userId && bookDetails.ownerId === userId; // Kullanıcının kendi kitabı mı?

    return (
        <View style={styles.container}>
            {/* Kitap Detayları */}
            <View style={styles.bookDetails}>
                <Text style={styles.bookName}>{bookDetails.name}</Text>
                <Text style={styles.bookGenre}>Genre: {bookDetails.genre}</Text>
                <Text style={styles.bookLocation}>Location: {bookDetails.location}</Text>
                <Text style={styles.bookDescription}>{bookDetails.description}</Text>

                {!isAvailable && !isBorrowedByTheCurrentUser && !belongsToTheCurrentUser && (
                    <Text style={styles.unavailableText}>Currently borrowed by someone else</Text>
                )}
                {!isAvailable && belongsToTheCurrentUser && (
                    <Text style={styles.borrowedByText}>
                        Borrowed by User ID: {bookDetails.borrowerId}
                    </Text>
                )}
            </View>

            {/* Kitabın Görseli */}
            <Image source={{ uri: bookDetails.image }} style={styles.bookImage} />

            {/* Borrow ve Return Butonları */}
            {!belongsToTheCurrentUser && isAvailable && !isBorrowedByTheCurrentUser && (
                <Button
                    onPress={() => handleBorrowFunction(bookDetails.id)}
                    mode="contained"
                    style={styles.actionButton}
                >
                    Borrow
                </Button>
            )}

            {isBorrowedByTheCurrentUser && (
                <Button
                    onPress={() => handleReturnFunction(bookDetails.id)}
                    mode="contained"
                    style={styles.actionButton}
                >
                    Return
                </Button>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: "#f9f9f9",
    },
    bookDetails: {
        marginBottom: 10,
        alignItems: "center",
    },
    bookName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    bookGenre: {
        fontSize: 16,
        color: "#555",
    },
    bookLocation: {
        fontSize: 14,
        color: "#777",
    },
    bookDescription: {
        fontSize: 14,
        color: "#444",
    },
    unavailableText: {
        fontSize: 14,
        color: "red",
        marginTop: 5,
    },
    borrowedByText: {
        fontSize: 14,
        color: "orange",
        marginTop: 5,
    },
    bookImage: {
        width: 120,
        height: 160,
        resizeMode: "cover",
        marginTop: 10,
    },
    actionButton: {
        marginTop: 10,
        width: "80%",
    },
});

export default CustomBookComponent;
