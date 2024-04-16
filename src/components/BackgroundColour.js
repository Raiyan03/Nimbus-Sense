'use client'
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { getCurrentWeather } from '../lib/actions'; // Make sure the path is correct

const BackgroundManager = ({ children }) => {
    const [gradientColors, setGradientColors] = useState(['#FF9800', '#FFECB3']); // Default to day colors

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const weatherData = await getCurrentWeather(location.coords.latitude, location.coords.longitude);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            const now = new Date();

            if (now > sunset) {
                setGradientColors(['#263238', '#37474F']); // Darker gradient for night
            }
        })();
    }, []);

    return (
        <LinearGradient
            colors={gradientColors}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BackgroundManager;
