'use client'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getCurrentWeather } from '../lib/actions';

const WindSpeed = () => {
  const [windSpeed, setWindSpeed] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);  // State to track day or night
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchData(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchData = async (lat, lon) => {
    try {
      const data = await getCurrentWeather(lat, lon);
      setWindSpeed(data?.wind?.speed);

      const now = new Date();
      const sunrise = new Date(data.sys.sunrise * 1000);
      const sunset = new Date(data.sys.sunset * 1000);
      setIsDaytime(now >= sunrise && now <= sunset);

    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to fetch weather data');
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  const windSpeedValue = windSpeed !== null ? `${windSpeed} KM/H` : 'Loading...';
  const boxStyle = isDaytime ? styles.infoBoxDay : styles.infoBoxNight; // Choose style based on time of day
  const textStyle = isDaytime ? styles.infoValueDay : styles.infoValueNight;

  return (
    <View style={boxStyle}>
      <Text style={styles.infoLabel}>Wind Speed</Text>
      <Text style={textStyle}>{windSpeedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBoxDay: {
    backgroundColor: '#29B6F6', // Lighter blue for day
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoBoxNight: {
    backgroundColor: '#243B55', // Darker blue for night
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 10,
  },
  infoValueDay: {
    color: '#000000', // Dark text for day
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoValueNight: {
    color: '#FFFFFF', // White text for night
    fontSize: 12,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default WindSpeed;
