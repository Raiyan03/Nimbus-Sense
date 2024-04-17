import { createContext, useState, useEffect } from 'react';
import * as loc from 'expo-location';
import { getCurrentWeather, getCity } from '../lib/actions';
import { fetchLocation } from '../lib/db';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState(null);
    const [Locations, setLocations] = useState(null);

    // useEffect(() => {
    //     (async () => {

    //     })();
    // }, []);
    

    
    useEffect(() => {
        (async () => {
            try {
                console.log('Fetching locations...');
                const dbLoc = await fetchLocation();
                setLocations(dbLoc);
                console.log('Locations:', dbLoc);
                // Handle further logic with the fetched locations
            } catch (error) {
                console.log('Error fetching locations:', error);
            }
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
            } catch (error) {
                alert('Failed to fetch weather data. Please try again later.');
            }
        })();
    }, [lat, lon]);

    useEffect(() => {
        ( async () => {

        })
    }, []);

    return (
        <WeatherContext.Provider value={{ weather, city, setCity, lat, setLat, lon, setLon, Locations, setLocations }}>
            {children}
        </WeatherContext.Provider>
    );
}

export { WeatherContext, WeatherProvider };