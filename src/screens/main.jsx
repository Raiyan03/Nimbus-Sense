// Home.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import MainLayout from '../layouts/mainLayout';
import { WeatherContext } from '../context/weather-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const { city, lat, lon, setCity, setLat, setLon, Locations, unit, forecast } = useContext(WeatherContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: city ? city : 'Nimbus Sense'
        });
    }, [city]);



    /*
    Whenever you are displaying temperature make sure to pass the temperature value throng 
    the `intoTemp(temp, unit)` the params are the temperature value and the unit of measurement

    for unit just pass `unit` variable which is defined above from the context
    */

    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>

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