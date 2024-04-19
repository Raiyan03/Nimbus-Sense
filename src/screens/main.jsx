// Home.js
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import MainLayout from '../layouts/mainLayout';
import { WeatherContext } from '../context/weather-context';
import { useNavigation } from '@react-navigation/native';
import Humidity from '../components/main-page/Humidity';
import WeatherImage from '../components/main-page/WeatherImage';
import TemperatureCircle from '../components/main-page/TemperatureCircle';
import WindSpeed from '../components/main-page/WindSpeed';
import Visibility from '../components/main-page/Visiblity';
import Pressure from '../components/main-page/Pressure';
import ForecastBar from '../components/main-page/ForecastBar';
import FeelsLike from '../components/main-page/FeelsLike';

const Home = () => {
    const { city, lat, lon, setCity, setLat, setLon, Locations, unit, forecast, weather } = useContext(WeatherContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: city ? city : 'Nimbus Sense'
        });
    }, [city]);
    /*
    Whenever you are displaying temperature make sure to pass the temperature value throng 
    the `intoTemp(temp, unit)` the params are the temperature value and the unit of measurement

    for unit just pass `unit` variable which is defined above from the context
    */

    return (
        <MainLayout>
            {/* <BackgroundManager weather={weather}> */}
                <SafeAreaView style={styles.container}>
                    <WeatherImage />
                    <View style={styles.row}>
                        <TemperatureCircle unit={unit} weather={weather} />
                        <View style={styles.column}>
                            <Humidity weather={weather} />
                            <WindSpeed weather={weather} />
                        </View>
                    </View>
                    <ForecastBar forecastData={forecast} unit={unit} />
                    <View style={styles.condBAr}>
                        <Visibility weather={weather} />
                        <Pressure weather={weather} />
                        <FeelsLike weather={weather} unit={unit} />
                    </View>
                </SafeAreaView>
            {/* </BackgroundManager> */}
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    condBAr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});

export default Home;