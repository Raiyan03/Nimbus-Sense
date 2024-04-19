import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { intoKM } from '../../lib/_utils';
import { MaterialIcons } from '@expo/vector-icons';

const Visibility = ({ weather }) => {
    const [visibility, setVisibility] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true); // State to track day or night
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const visibility = weather ? weather.visibility : null;
        setVisibility(visibility);
    }, [weather]);

    const visibilityValue = visibility !== null ? `${intoKM(visibility)}KM` : 'Loading...';

    // Adjusted box color based on day or night

    return (
        <View style={styles.boxStyle}>
            <Text style={styles.infoLabel}>Visibility</Text>
            <MaterialIcons style={styles.infoLabel} name="visibility" size={30} color="white" />
            <Text style={styles.textStyle}>{visibilityValue}</Text>
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
        padding: 5,
        justifyContent: 'center', // Center content vertically
        // paddingVertical: 20, // Add padding for spacing
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

export default Visibility;
