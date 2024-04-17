import React from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";

const Card = ({ location, temp, desc }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                My Location - 15
            </Text>
            <Text style={styles.desc}>Cloudy</Text>
            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    line: {
        height: 1,
        backgroundColor: '#C7AEAE',
        marginTop: 5, // Adjust as needed
    },
    desc: {
        fontSize: 16,
    },
});

export default Card;