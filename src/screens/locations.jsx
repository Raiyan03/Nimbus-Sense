import React from 'react';
import { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Text, TouchableOpacity, ScrollView } from 'react-native';
import Card from '../components/location/card'; // Assuming you have a Card component
import MainLayout from '../layouts/mainLayout';
import { WeatherContext } from '../context/weather-context';

const Location = ({ navigation }) => {
    const { setCity, setLat, setLon, Locations, unit } = useContext(WeatherContext);
    const [temp, setTemp] = useState(0);
    const handlePress = ({name, latitude, longitude}) => {
        setLat(l => latitude);
        setLon(l => longitude);
        setCity(c => name);
        navigation.navigate('Home');
    }
        
    return (
        <MainLayout>
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        Locations ? Locations.map(location => (
                            <TouchableOpacity key={location.id} onPress={() => handlePress(location)}>
                                <Card city={location.name} lat={location.latitude} lon={location.longitude} unit={unit} />
                            </TouchableOpacity>
                        ))
                            : <Text>No locations found</Text>
                    }
                </ScrollView>
            </SafeAreaView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Location;