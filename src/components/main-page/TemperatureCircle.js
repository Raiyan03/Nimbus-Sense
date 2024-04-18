'use client'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getCurrentWeather } from '../../lib/actions';
import { intoTemp } from '../../lib/_utils';
import * as Location from 'expo-location';

const TemperatureCircle = ({ weather, unit }) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [weatherData, setWeatherData] = useState();
    const [errorMsg, setErrorMsg] = useState(null);
    const [isDaytime, setIsDaytime] = useState(true);
    const [showFeelsLike, setShowFeelsLike] = useState(false);

    useEffect(() => {
        setWeatherData(weather)
    }, [weather])

    useEffect(() => {
        (async () => {
            fadeIn();
            const intervalId = setInterval(() => {
                fadeOut();
                setTimeout(() => {
                    setShowFeelsLike(prev => !prev);
                    fadeIn();
                }, 8000);
            }, 8000);

            return () => clearInterval(intervalId);
        })();
    }, []);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };




    const temperature = weatherData ? intoTemp(showFeelsLike ? weatherData.main.feels_like : weatherData.main.temp, unit) : '...';
    const high = weatherData ? intoTemp(weatherData.main.temp_max, unit) : '...';
    const low = weatherData ? intoTemp(weatherData.main.temp_min, unit) : '...';


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
            <View style={styles.tempContainer}>
                {showFeelsLike && (
                    <Animated.Text style={[styles.feelsLikeText, { opacity: fadeAnim }]}>
                        Feels like
                    </Animated.Text>
                )}
            <Animated.Text style={[textStyle, { opacity: fadeAnim }]}>
                {`${temperature}`}
            </Animated.Text>
        </View>
        <Text style={{ ...styles.highLow, color: textStyle.color, }}>H: {`${high}`}   L: {`${low}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        position: 'relative',
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
    tempContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    temperature: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    feelsLikeText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#FFFFFF',
    },
    highLow: {
        fontSize: 12,
        position: 'absolute',
        bottom: 30,
        textAlign: 'center'
    },
    error: {
        color: 'red',
    },
});


export default TemperatureCircle;
