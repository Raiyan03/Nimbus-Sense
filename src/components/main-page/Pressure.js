import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Pressure = ({ weather }) => {
    const [pressure, setPressure] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true); // State to track day or night
    const [errorMsg, setErrorMsg] = useState('');



    useEffect(() => {
        const pressure = weather ? weather.main.pressure : null;
        setPressure(pressure);
    }, [weather]);

    console.log(pressure)

    const pressureValue = pressure !== null ? `${pressure} hPa` : 'Loading...';
    const textStyle = isDaytime ? styles.infoValueDay : styles.infoValueNight;

    // Adjusted box color based on day or night
    const boxStyle = isDaytime ? styles.infoBoxDay : styles.infoBoxNight;

    return (
        <View style={boxStyle}>
            <Text style={styles.infoLabel}>Pressure</Text>
            <Text style={textStyle}>{pressureValue}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    infoBoxDay: {
        backgroundColor: '#29B6F6', // Lighter blue for day
        borderRadius: 25,
        paddingVertical: 50,
        paddingHorizontal: 30,
        marginVertical: 10,
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        flexDirection: 'column', // Stack the children vertically
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoBoxNight: {
        backgroundColor: '#243B55', // Darker blue for night
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        flexDirection: 'column', // Stack the children vertically
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    infoLabel: {
        color: '#FFFFFF',
        fontSize: 12,
        marginRight: 10,
        alignSelf: 'flex-start', // Align to the start of the container
    },
    infoValueDay: {
        color: '#000000', // Dark text for day
        fontSize: 24, // Increase font size
        fontWeight: 'bold',
        alignSelf: 'center', // Center the text
    },
    infoValueNight: {
        color: '#FFFFFF', // White text for night
        fontSize: 24, // Increase font size
        fontWeight: 'bold',
        alignSelf: 'center', // Center the text
    },
    error: {
        color: 'red',
        fontSize: 14,
    },
});


export default Pressure;
