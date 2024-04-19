'use client'
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getCurrentWeather } from '../../lib/actions';

const WindSpeed = ({weather}) => {
  const [windSpeed, setWindSpeed] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);  // State to track day or night
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const speed = weather ? weather.wind.speed : null;
    setWindSpeed(speed);
  }, [weather]);


  const windSpeedValue = windSpeed !== null ? `${windSpeed} KM/H` : 'Loading...';
  const boxStyle = isDaytime ? styles.infoBoxDay : styles.infoBoxNight; 
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
    paddingVertical: 20,
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