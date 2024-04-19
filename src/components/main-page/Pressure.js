import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const Pressure = ({ weather }) => {
    const [pressure, setPressure] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true); // State to track day or night
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const pressure = weather ? weather.main.pressure : null;
        setPressure(pressure);
    }, [weather]);

    const pressureValue = pressure !== null ? `${pressure} hPa` : 'Loading...';

    // Adjusted box color based on day or night
    const boxStyle = isDaytime ? styles.infoBoxDay : styles.infoBoxNight;

    return (
        <View style={styles.boxStyle}>
            <Text style={styles.infoLabel}>Pressure</Text>
            <Ionicons name="speedometer" size={30} color="white" />
            <Text style={styles.textStyle}>{pressureValue}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: '#29B6F6', // Lighter blue for day
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center', // Center content vertically
    },
    infoLabel: {
        color: 'white',
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        marginTop: 10,
    },
    error: {
        color: 'red'
    },
});


export default Pressure;
