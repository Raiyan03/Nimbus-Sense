import { createContext, useState, useEffect } from 'react';
import * as loc from 'expo-location';
import { getCurrentWeather, getCity, getForecast } from '../lib/actions';
import { createDatabase, dropTables, fetchLocation } from '../lib/db';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {

    const [weather, setWeather] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [city, setCity] = useState(null);
    const [Locations, setLocations] = useState(null);
    const [unit, setUnit] = useState('celsius');
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await dropTables();
            }
            catch {
                console.log("Failed to create Database");
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                console.log('Fetching locations...');
                const dbLoc = await fetchLocation();
                setLocations(dbLoc);
                console.log('Locations fetched successfully', dbLoc);
            } catch (error) {
                console.log('Error fetching locations:', error);
            }
        })();
    }, [weather]);



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
                if (response) {
                    console.log('Current weather data: fetched successfully');
                }
            } catch (error) {
                alert('Failed to fetch weather data. Please try again later.');
            }
        })();
        console.log('Fetching forecast data... for lat:', lat, 'lon:', lon);
        (async () => {
            try {
                const response = await getForecast(lat, lon, unit);
                setForecast(f => response);
                if (response) {
                    console.log('Forecast data: fetched successfully');
                }
            } catch (error) {
                alert('Failed to fetch forecast data. Please try again later.');
            }
        })();
    }, [lat, lon]);


    return (
        <WeatherContext.Provider value={{ weather, city, setCity, lat, setLat, lon, setLon, Locations, setLocations, setUnit, unit, forecast }}>
            {children}
        </WeatherContext.Provider>
    );
}

export { WeatherContext, WeatherProvider };