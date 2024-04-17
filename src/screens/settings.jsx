// Settings.js
import React from 'react';
import { View,Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Card from '../components/location/card'; // Assuming you have a Card component
import MainLayout from '../layouts/mainLayout';

const Settings = () => {
    // Calculate the height of the transparent header
    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <Text>
                    This is setting screen
                </Text>
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
