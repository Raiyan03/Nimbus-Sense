import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import "./card.css";

const Card = ({ location, temp, desc }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                My Location - 15
            </Text>
            <Text style={styles.desc}>Cloudy</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    desc: {
        fontSize: 16,
    },
});

export default Card;