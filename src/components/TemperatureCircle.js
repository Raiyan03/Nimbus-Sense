'use client'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCurrentWeather } from '../lib/actions';
import { intoTemp } from '../lib/_utils'; // Assuming these utility functions are correctly implemented
import * as Location from 'expo-location';

const TemperatureCircle = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            fetchWeatherData(location.coords.latitude, location.coords.longitude);
        })();
    }, []);

    const fetchWeatherData = async (lat, lon) => {
        try {
            const data = await getCurrentWeather(lat, lon);
            setWeatherData(data);

            const now = new Date();
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);

            // Determine if it's day or night
            setIsDaytime(now >= sunrise && now <= sunset);
        } catch (error) {
            console.error(error);
            setErrorMsg('Failed to fetch weather data');
        }
    };

    if (errorMsg) {
        return (
            <View style={styles.circle}>
                <Text style={styles.error}>{errorMsg}</Text>
            </View>
        );
    }

    const temperature = weatherData ? intoTemp(weatherData.main.temp) : '...';
    const high = weatherData ? intoTemp(weatherData.main.temp_max) : '...';
    const low = weatherData ? intoTemp(weatherData.main.temp_min) : '...';

    const circleStyle = {
        ...styles.circle,
        backgroundColor: isDaytime ? '#29B6F6' : '#243B55', // Light blue for day, dark blue for night
    };

    const textStyle = {
        ...styles.temperature,
        color: isDaytime ? '#FFFFFF' : '#CCCCCC', // White for day, light gray for night
    };

    return (
        <View style={circleStyle}>
            <Text style={textStyle}>{`${temperature}°F`}</Text>
            <Text style={{ ...styles.highLow, color: textStyle.color }}>H: {`${high}°F`}   L: {`${low}°F`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
    },
    temperature: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    highLow: {
        fontSize: 12,
    },
    error: {
        color: 'red',
    },
});

export default TemperatureCircle;
