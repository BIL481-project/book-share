import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

function CustomBookDetails({ item }) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.image }}
                style={styles.bookImage}
            />
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.detailText}>Genre: {item.genre}</Text>
            <Text style={styles.detailText}>Location: {item.location}</Text>
            <Text style={styles.detailText}>
                {item.isAvailable ? "Available" : "Borrowed"}
            </Text>
            {!item.isAvailable && (
                <Text style={styles.detailText}>
                    Borrowed by: User ID {item.borrowerId}
                </Text>
            )}
            <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    bookImage: {
        width: 150,
        height: 200,
        resizeMode: "cover",
        marginBottom: 10,
    },
    bookName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
    },
    detailText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: "#777",
        marginTop: 10,
        textAlign: "center",
    },
});

export default CustomBookDetails;
