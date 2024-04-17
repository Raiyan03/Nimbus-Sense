import { createContext, useState, useEffect } from 'react';
import * as loc from 'expo-location';
import { getCurrentWeather, getCity } from '../lib/actions';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await loc.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                console.log('Permission to access location was granted');
                const location = await loc.getCurrentPositionAsync({});
                setLat(location.coords.latitude);
                setLon(location.coords.longitude);
            } catch (error) {
                console.log('Error requesting location permission:', error);
            }
        })();
    }, []);

    useEffect(() => {
        if (!lat || !lon) {
            return;
        }
        console.log('Fetching weather data... for lat:', lat, 'lon:', lon);
        (async () => {
            try {
                const name = await getCity(lat, lon);
                setCity(c => name);
                const response = await getCurrentWeather(lat, lon);
                setWeather(w => response);
                console.log(response);
            } catch (error) {
                alert('Failed to fetch weather data. Please try again later.');
            }
        })();
    }, [lat, lon]);

    return (
        <WeatherContext.Provider value={{ weather, city, setCity, lat, setLat, lon, setLon }}>
            {children}
        </WeatherContext.Provider>
    );
}

export { WeatherContext, WeatherProvider };