'use client'
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getCurrentWeather } from '../../lib/actions';

const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

const WeatherImage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [fontColor, setFontColor] = useState('#333')
    const [icon, setIcon] = useState(null);
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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
            setIcon(data.weather[0].icon);
            setDescription(capitalizeFirstLetter(data.weather[0].description));

            const now = new Date();
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);

            // Set font color based on whether it's day or night
            if (now >= sunrise && now <= sunset) {
                setFontColor('#333'); // Dark color for day
            } else {
                setFontColor('#FFF'); // Light color for night
            }

        } catch (error) {
            console.error(error);
            setErrorMsg('Failed to fetch weather data');
        }
    };
    const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text style={styles.error}>{errorMsg}</Text>
            ) : (
                <>
                    {iconUrl && (
                        <Image
                            source={{ uri: iconUrl }}
                            style={styles.weatherIcon}
                            resizeMode="contain"
                        />
                    )}
                    <Text style={styles.description}>{description}</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    description: {
        fontSize: 18,
        marginTop: 10,
    },
    error: {
        color: 'red',
    },
});

export default WeatherImage;
