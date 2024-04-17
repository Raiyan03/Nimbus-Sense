// Settings.js
import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Card from '../components/location/card'; // Assuming you have a Card component
import MainLayout from '../layouts/mainLayout';
import { WeatherContext } from '../../App';

const Locations = () => {

    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <Card />
            </SafeAreaView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Locations;