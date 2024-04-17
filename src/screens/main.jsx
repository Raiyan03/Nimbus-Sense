// Home.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import MainLayout from '../layouts/mainLayout';

const Home = () => {
    // Calculate the height of the transparent header

    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <Text>Home Screen</Text>
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