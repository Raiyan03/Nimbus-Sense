import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import NavBar from './src/components/NavBar';
import TemperatureCircle from './src/components/TemperatureCircle';
import Humidity from './src/components/Humidity';
import WindSpeed from './src/components/WindSpeed';
import WeatherImage from './src/components/WeatherImage';
import BackgroundManager from './src/components/BackgroundColour';

export default function App() {
  return (
    <View style={styles.container}>
      <BackgroundManager>
        <NavBar title={'Test'} style={styles.navbar} />
        <ScrollView style={styles.scrollViewContent}>
          <StatusBar style="auto" />
          <View style={styles.header}>
            <View>
              <WeatherImage/>
            </View>
          </View>
          <View style={styles.mainContent}>
            <TemperatureCircle />
            <View style={styles.temperatureSection}>
              <Humidity/>
              <WindSpeed/>
            </View>
          </View>
        </ScrollView>
      </BackgroundManager>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // Other content styles go here
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  weatherCondition: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#424242'
  },
  mainContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  temperatureSection: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  info: {
    // Add your info text styles here
  },
  forecastSection: {
    // Add your forecast section styles here
  },
  detailsSection: {
    // Add your details section styles here
  },
  detailBox: {
  },
  detailText: {
  },
  detailValue: {
    // Style for the detail values
  },
  // Continue with styles for other components as required
});
