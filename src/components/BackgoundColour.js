'use client'
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const BackgroundManager = ({ children, weather }) => {
    const [gradientColors, setGradientColors] = useState(['#FF9800', '#FFECB3']); // Default to day colors
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        setWeatherData(weather)
        const stamp = weatherData ? weatherData.sys.sunset : 0;
        const sunset = new Date(stamp * 1000);
        const now = new Date(weatherData ? weatherData.dt * 1000 : 0);

        console.log(now)
        console.log(sunset)

        if (now > sunset) {
            setGradientColors(['#263238', '#37474F']); // Darker gradient for night
        }
    }, [weather])

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
