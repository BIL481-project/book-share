import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

function GoBackButton({
                          navigation,
                          onPress,
                      }) {
    function goBack() {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    }

    return (
        <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
            <Icon size={32} color="black" source="arrow-left" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    goBackButton: {
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 1,
        borderRadius: 50,
        backgroundColor: "white",
        padding: 4,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: "#757575",
        shadowOpacity: 0.5,
    },
});

export default GoBackButton;
