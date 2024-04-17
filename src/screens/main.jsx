// Home.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import MainLayout from '../layouts/mainLayout';
import { WeatherContext } from '../context/weather-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const { city, lat, lon } = useContext(WeatherContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: city ? city : 'Nimbus Sense'
        });
    }, [city]);

    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <Text>Home Screen</Text>
                <Text>City: {city}</Text>
                <Text>Latitude: {lat}</Text>
                <Text>Longitude: {lon}</Text>
            </SafeAreaView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;