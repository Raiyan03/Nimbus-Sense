// Settings.js
import React from 'react';
import { useContext } from 'react';
import { View,Text, StyleSheet, SafeAreaView, Platform, ToastAndroid } from 'react-native';
import MainLayout from '../layouts/mainLayout';
import SelectOption from '../components/settings/select-locations';
import { WeatherContext } from '../context/weather-context';

const Settings = () => {
    const { unit, setUnit } = useContext(WeatherContext);

    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <SelectOption unit={unit} setUnit={setUnit} />
            </SafeAreaView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Settings;